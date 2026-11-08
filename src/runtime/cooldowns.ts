import type { DiscordCommandDeclaration } from '../ast/declarations.js';
import { UserInputError } from './user-input.js';
import type { PersistentStore } from './storage/index.js';

/** Registro en memoria por proceso. Reclamación sincrónica para evitar carreras entre comandos simultáneos. */
export class CommandCooldowns {
  constructor(private readonly store?:PersistentStore){}
  private readonly expirations=new Map<string,number>();
  claim(command:DiscordCommandDeclaration,ctx:Record<string,any>,now=Date.now()):void|Promise<void> {
    const rule=command.cooldown;
    if(!rule)return;
    const getId=(entity:any):string|undefined=>entity?.id?String(entity.id):undefined;
    const scopeId=rule.scope==='global'?'todos':rule.scope==='usuario'?getId(ctx.autor??ctx.usuario):rule.scope==='servidor'?getId(ctx.servidor):getId(ctx.canal);
    if(!scopeId)throw new UserInputError(`COOLDOWN POR ${rule.scope.toUpperCase()}: ${rule.scope==='usuario'?'usuario':rule.scope==='servidor'?'servidor':'canal'} no disponible en el contexto.`);
    const key=`${command.commandKind}:${command.prefix??''}:${command.name}:${rule.scope}:${scopeId}`;
    if(this.store){
      return this.store.claimCooldown(key,now,now+rule.durationMs).then(remaining=>{
        if(remaining>0){
          const seconds=Math.ceil(remaining/1000);
          throw new UserInputError(rule.error??`COOLDOWN: límite de uso activo. Reintento en ${seconds} segundo${seconds===1?'':'s'}.`);
        }
      });
    }
    const end=this.expirations.get(key)??0;
    if(end>now){
      const remaining=Math.ceil((end-now)/1000);
      throw new UserInputError(rule.error??`COOLDOWN: límite de uso activo. Reintento en ${remaining} segundo${remaining===1?'':'s'}.`);
    }
    // Limpieza incremental: no almacenar claves vencidas indefinidamente.
    if(this.expirations.size>=5000){for(const [k,v] of this.expirations)if(v<=now)this.expirations.delete(k);}
    if(this.expirations.size>=50000)throw new UserInputError('COOLDOWN: capacidad máxima de registros alcanzada; nueva reserva rechazada.');
    this.expirations.set(key,now+rule.durationMs);
  }
  /** Consulta milisegundos restantes sin consumir ni renovar el cooldown. */
  remaining(command:DiscordCommandDeclaration,ctx:Record<string,any>,now=Date.now()):number|Promise<number>{
    const rule=command?.cooldown;
    if(!rule)return 0;
    const scope=rule.scope;
    const getId=(v:any):string|undefined=>v?.id?String(v.id):undefined;
    const sid=scope==='global'?'todos':scope==='usuario'?getId(ctx.autor??ctx.usuario):scope==='servidor'?getId(ctx.servidor):getId(ctx.canal);
    if(!sid)throw new UserInputError(`COOLDOWN POR ${scope.toUpperCase()}: identificador de ámbito no disponible.`);
    const key=`${command.commandKind}:${command.prefix??''}:${command.name}:${scope}:${sid}`;
    if(this.store)return this.store.cooldownRemaining(key,now);
    return Math.max(0,(this.expirations.get(key)??0)-now);
  }
  clear():void{this.expirations.clear();}
}
