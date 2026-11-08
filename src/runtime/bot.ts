import type {
  Program, DiscordCommandDeclaration, DiscordEventDeclaration, DiscordContextCommandDeclaration,
  DiscordComponentHandlerDeclaration, DiscordSubcommandDeclaration, SchedulerDeclaration
} from '../ast/declarations.js';
import { Interpreter } from './interpreter.js';
import type { PseudoDiscordConfig } from './config.js';
import { inferIntentNames } from '../discord/intents.js';
import { NonOverlappingTask } from './scheduler.js';
import { openPersistentStore, type PersistentStore } from './storage/index.js';
import { resolvePermissionName } from '../discord/permissions.js';
import { ProjectModules } from './project-modules.js';
import { createDiscordHelpers } from './discord-helpers.js';
import { UserInputError } from './user-input.js';
import { COMMAND_INVOCATION } from './command-context.js';
import { CommandCooldowns } from './cooldowns.js';
import { synchronizeApplicationCommands, type CommandSyncStats } from './command-sync.js';
import { PluginManager } from '../plugins/manager.js';
import { verifyCommandArgument, convertMessageArgument, splitMessageArguments, matchesCustomId } from './commands/arguments.js';
import { isProtectedCommandOptionName } from '../language/command-context.js';
import { parseDuration } from './duration.js';
import { matchesCronExpression } from './cron.js';

export class PseudoDiscordBot {
  public client:any;
  public discord:any;
  public interpreter!:Interpreter;
  private stopped=false;
  private cooldowns=new CommandCooldowns();
  private storage?:PersistentStore;
  private plugins?:PluginManager;
  private timers:any[]=[];
  private scheduledTasks:NonOverlappingTask[]=[];
  private readonly activeCommandSyncTasks=new Set<Promise<unknown>>();
  constructor(public readonly program:Program,public readonly config:PseudoDiscordConfig={}){}

  async start(beforeLogin?: (client:any)=>void):Promise<any>{
    if(this.client)throw new Error('Ciclo de vida: instancia del bot iniciada previamente; segunda llamada a start() rechazada.');
    const pkg='discord.js';
    try{this.discord=await import(pkg);}catch(e){throw new Error(`Dependencia no disponible: discord.js. Causa: ${(e as Error).message}`);}
    const names=this.config.intents?.length?this.config.intents:[...inferIntentNames(this.program)];
    for(const name of names)if(this.discord.GatewayIntentBits?.[name]===undefined)throw new Error(`Configuración Bot.Intents: intent no reconocido '${name}'.`);
    const intents=names.map(n=>this.discord.GatewayIntentBits[n]);
    const partialNames=this.config.partials??['Channel','Message','Reaction','User','GuildMember','ThreadMember'];
    for(const name of partialNames)if(this.discord.Partials?.[name]===undefined)throw new Error(`Configuración Bot.Partials: partial no reconocido '${name}'.`);
    const partials=partialNames.map(n=>this.discord.Partials[n]);
    this.client=new this.discord.Client({intents:[...new Set(intents)],partials:[...new Set(partials)],allowedMentions:{parse:['users'],repliedUser:false}});
    try {
      if(this.config.database)this.storage=await openPersistentStore(this.config.database);
       if(this.config.cooldownStorage==='database'){
         if(!this.storage)throw new Error('Cooldown persistente: Database.Provider no configurado o conexión no inicializada.');
         this.cooldowns=new CommandCooldowns(this.storage);
       }
      const modules=new ProjectModules(this.program,this.config.projectRoot);
      if(this.config.plugins?.length){
        console.warn('[plugins] Los plugins JavaScript tienen acceso al proceso Node.js; instala únicamente plugins confiables.');
        this.plugins=new PluginManager();
        await this.plugins.loadFromSpecifiers(this.config.plugins,this.config.projectRoot??process.cwd());
      }
      this.interpreter=new Interpreter(this.program,this.discord,{
        maxIterations:this.config.maxIterations,maxExecutionMs:this.config.maxExecutionMs,
        storage:this.storage,
        moduleFunctions:{...modules.api,...this.plugins?.functions},client:()=>this.client,cooldowns:this.cooldowns
      });
      await this.interpreter.initialize();
      const loaded=await modules.finish(this.interpreter);
      if(loaded)console.log(`[cargador] Módulos inicializados durante AL PREPARAR: ${loaded}.`);
      const finalNames=this.config.intents?.length?this.config.intents:[...inferIntentNames(this.program)];
      for(const name of finalNames)if(this.discord.GatewayIntentBits?.[name]===undefined)throw new Error(`Módulo dinámico: intent no reconocido '${name}'.`);
      if(finalNames.some(name=>!names.includes(name))){
        await this.client.destroy();
        this.client=new this.discord.Client({intents:[...new Set(finalNames.map(n=>this.discord.GatewayIntentBits[n]))],partials:[...new Set(partials)],allowedMentions:{parse:['users'],repliedUser:false}});
      }
      this.attachEvents(); this.attachInteractionRouter(); this.attachMessageCommands(); this.attachSchedulers();
      beforeLogin?.(this.client);
      if(this.config.presence)this.client.once('clientReady',()=>{void this.client.user?.setPresence?.(this.config.presence).catch?.((e:Error)=>console.error('[discord/presencia] Actualización rechazada:',e));});
      const token = this.config.token;
      if(!token)throw new Error('PseudoClient-TokenRequerido-Error: falta el token de Discord.');
      await this.client.login(token);return this.client;
    }catch(e){await this.stop();throw e;}
  }

  async stop():Promise<void>{this.stopped=true;this.cooldowns.clear();for(const t of this.timers)clearInterval(t);this.timers=[];for(const task of this.scheduledTasks)task.stop();await Promise.all(this.scheduledTasks.map(task=>task.drain(2000)));this.scheduledTasks=[];await Promise.allSettled([...this.activeCommandSyncTasks]);await this.plugins?.dispose();this.plugins=undefined;await this.client?.destroy?.();if(this.storage){await this.storage.close();this.storage=undefined;}}

  private attachEvents():void{
    for(const d of this.program.body){if(d.kind!=='DiscordEventDeclaration')continue;const ev=d as DiscordEventDeclaration;
      this.client.on(ev.event,async(...args:any[])=>{try{const context=this.makeEventContext(ev,args);await this.interpreter.execute(ev.body,context);}catch(e){console.error(`[discord/evento] Fallo en '${ev.event}':`,e);}});
    }
  }

  private attachInteractionRouter():void{
    const slash=this.program.body.filter((d):d is DiscordCommandDeclaration=>d.kind==='DiscordCommandDeclaration'&&d.commandKind==='chat-input');
    const contexts=this.program.body.filter((d):d is DiscordContextCommandDeclaration=>d.kind==='DiscordContextCommandDeclaration');
    const handlers=this.program.body.filter((d):d is DiscordComponentHandlerDeclaration=>d.kind==='DiscordComponentHandlerDeclaration');
    if(slash.length||contexts.length||handlers.length) this.client.on('interactionCreate',async(interaction:any)=>{
      try{
        if(interaction.isChatInputCommand?.()){
          const cmd=slash.find(c=>c.name===interaction.commandName);if(!cmd)return;
          const selected=this.selectSlashBody(cmd,interaction);const context=this.makeCommandContext(interaction,cmd,selected?.decl);
          this.checkCommandPermissions(cmd,context.miembro,context.servidor);
          const selectedOptions=selected?.decl?.options??cmd.options;
          for(const option of selectedOptions)verifyCommandArgument(option,context.argumentos[option.name]);
          await this.cooldowns.claim(cmd,context);
          await this.interpreter.execute(selected?.body??cmd.body,context);return;
        }
        if(interaction.isUserContextMenuCommand?.()||interaction.isMessageContextMenuCommand?.()){
          const kind=interaction.isUserContextMenuCommand?.()?'usuario':'mensaje';const cmd=contexts.find(c=>c.contextKind===kind&&c.name===interaction.commandName);if(!cmd)return;
          const ctx=this.makeBaseInteractionContext(interaction);ctx.objetivo=interaction.targetMember??interaction.targetUser??interaction.targetMessage;ctx.usuarioObjetivo=interaction.targetUser;ctx.mensajeObjetivo=interaction.targetMessage;await this.interpreter.execute(cmd.body,this.addFriendlyContext(ctx));return;
        }
        if(interaction.isAutocomplete?.()){
          const focused=interaction.options.getFocused?.(true);const h=handlers.find(x=>x.componentKind==='autocomplete'&&x.commandName===interaction.commandName&&(!x.optionName||x.optionName===focused?.name));if(!h)return;
          const ctx=this.makeBaseInteractionContext(interaction);ctx.valor=focused?.value;ctx.opcion=focused?.name;await this.interpreter.execute(h.body,ctx);return;
        }
        let k:DiscordComponentHandlerDeclaration['componentKind']|undefined;
        if(interaction.isButton?.())k='boton';else if(interaction.isModalSubmit?.())k='modal';else if(interaction.isAnySelectMenu?.()||interaction.isStringSelectMenu?.()||interaction.isUserSelectMenu?.()||interaction.isRoleSelectMenu?.()||interaction.isChannelSelectMenu?.()||interaction.isMentionableSelectMenu?.())k='menu';
        if(k){const h=handlers.find(x=>x.componentKind===k&&matchesCustomId(x.customId,interaction.customId));if(!h)return;const ctx=this.makeBaseInteractionContext(interaction);ctx.id=interaction.customId;ctx.valores=interaction.values;ctx.campos=interaction.fields;ctx.modal=interaction;ctx.boton=interaction;ctx.menu=interaction;await this.interpreter.execute(h.body,ctx);}
      }catch(e){console.error('[discord/interacción] Fallo de ejecución:',e);await this.replyInteractionError(interaction,e);}
    });

    if(this.config.syncCommands!==false&&this.config.commandSyncMode!=='off')this.client.once('clientReady',()=>{
      if(this.stopped)return;
      void this.synchronizeCommands().catch(e=>console.error('[discord/comandos] Error de sincronización:',e));
    });
  }

  /** Sincroniza manualmente las definiciones Discord del programa cargado. */
  async synchronizeCommands(force=false):Promise<CommandSyncStats>{
    const task=this.performCommandSync(force);
    this.activeCommandSyncTasks.add(task);
    try{return await task;}finally{this.activeCommandSyncTasks.delete(task);}
  }

  private async performCommandSync(force=false):Promise<CommandSyncStats>{
    if(this.stopped||!this.client)throw new Error('PseudoClient-SyncNoIniciado-Error: inicia el cliente antes de sincronizar comandos.');
    if(this.config.commandSyncMode==='off')throw new Error('PseudoClient-SyncDeshabilitado-Error: sincronización desactivada.');
    if(typeof this.client.isReady==='function'&&!this.client.isReady()) {
      await new Promise<void>((resolve,reject)=>{
        const timer=setTimeout(()=>{this.client.off?.('clientReady',ready);reject(new Error('PseudoClient-SyncSinConexion-Error: Discord no confirmó que el cliente esté listo.'));},30000);
        const ready=()=>{clearTimeout(timer);resolve();};
        this.client.once('clientReady',ready);
      });
    }
    const slash=this.program.body.filter((d):d is DiscordCommandDeclaration=>d.kind==='DiscordCommandDeclaration'&&d.commandKind==='chat-input');
    const contexts=this.program.body.filter((d):d is DiscordContextCommandDeclaration=>d.kind==='DiscordContextCommandDeclaration');
    const data=[...slash.map(c=>this.commandData(c)),...contexts.map(c=>this.contextCommandData(c))];
    const applicationId=String(this.client.application?.id??this.client.user?.id??'');
    const guild=this.config.guildId
      ? (this.client.guilds.cache?.get(this.config.guildId)??await this.client.guilds.fetch(this.config.guildId))
      : undefined;
    const manager=guild?.commands??this.client.application.commands;
    let fromCache=false;
    const mode=this.config.commandSyncMode??'upsert';
    const stats=await synchronizeApplicationCommands(manager,data,mode,{
      cache:{projectRoot:this.config.projectRoot??process.cwd(),applicationId,guildId:this.config.guildId,
        ttlMs:(this.config.commandSyncCacheSeconds??900)*1000,force},
      pruneManaged:this.config.pruneManagedCommands===true,
      onCacheHit:()=>{fromCache=true;}
    });
    console.log(`[PseudoDiscord] Comandos: ${stats.created} nuevos, ${stats.updated} actualizados, ${stats.unchanged} sin cambios, ${stats.deleted} eliminados. Modo: ${mode}. ${fromCache?'Caché válida: cero solicitudes REST de sincronización.':'Estado contrastado con Discord.'}`);
    return stats;
  }

  private attachMessageCommands():void{
    const commands=this.program.body.filter((d):d is DiscordCommandDeclaration=>d.kind==='DiscordCommandDeclaration'&&d.commandKind==='message-prefix');if(!commands.length)return;
    this.client.on('messageCreate',async(message:any)=>{if(!message?.content||message.author?.bot)return;
      for(const cmd of commands){const prefix=cmd.prefix??this.config.defaultPrefix??'!';if(!message.content.startsWith(prefix))continue;const rest=message.content.slice(prefix.length).trim();const parts=splitMessageArguments(rest);if(!parts.length)continue;const typed=cmd.caseSensitive?parts[0]:parts[0].toLowerCase();const names=[cmd.name,...(cmd.aliases??[])].map(x=>cmd.caseSensitive?x:x.toLowerCase());if(!names.includes(typed))continue;
        try{const rawArgs=parts.slice(1);
          const invokingMember=message.member??(message.guild?.members?.fetch?await message.guild.members.fetch(message.author.id):undefined);
          const ctx:any=this.addFriendlyContext({cliente:this.client,client:this.client,mensaje:message,message,usuario:message.author,autor:message.author,ejecutor:message.author,miembro:invokingMember,canal:message.channel,servidor:message.guild,guild:message.guild,textoArgumentos:rawArgs.join(' '),partes:rawArgs,argumentos:Object.create(null)});
          ctx[COMMAND_INVOCATION]=true;ctx.infoComando=Object.freeze({nombre:cmd.name,prefijo:prefix,tipo:'mensaje',opciones:cmd.options,declaracion:cmd});
          // Atajos optativos, sin impedir las declaraciones de argumentos tipados.
          // Los índices empiezan en 1; una posición ausente vale INDEFINIDO.
          for(let i=0;i<Math.max(rawArgs.length,25);i++)ctx[`argumento${i+1}`]=rawArgs[i];
          this.checkCommandPermissions(cmd,invokingMember,message.guild);
          for(let i=0;i<cmd.options.length;i++){
            const o=cmd.options[i]!;
            const consumeRest=o.kind==='texto'&&(o.consumeRest===true||(o.consumeRest!==false&&i===cmd.options.length-1));
            const raw=consumeRest?rawArgs.slice(i).join(' ')||undefined:rawArgs[i];
            let v:any;
            try {v=await convertMessageArgument(raw,o.kind,message,i);}catch(e){
              if(e instanceof UserInputError)throw new UserInputError(o.errors?.invalido??e.message);
              throw e;
            }
            // Si la mención era sintácticamente válida pero no se resolvió, es inválida (no faltante).
            if(raw!==undefined&&v===undefined&&['usuario','canal','rol','mencionable'].includes(o.kind))
              throw new UserInputError(o.errors?.invalido??`Argumento '${o.name}': referencia no encontrada en el servidor.`);
            verifyCommandArgument(o,v);
            ctx.argumentos[o.name]=v;
            if(!isProtectedCommandOptionName(o.name))ctx[o.name]=v;
          }
          await this.cooldowns.claim(cmd,ctx);
          await this.interpreter.execute(cmd.body,ctx);}
        catch(e){if(!(e instanceof UserInputError))console.error(`[discord/comando] Fallo en '${prefix}${cmd.name}':`,e);try{await message.reply({content:e instanceof UserInputError?`${e.message}`:'Error interno durante la ejecución del comando (Discord-ComandoInterno-Error).',allowedMentions:{parse:[],repliedUser:false}});}catch{}}return;
      }
    });
  }

  private attachSchedulers():void{
    const tasks=this.program.body.filter((d):d is SchedulerDeclaration=>d.kind==='SchedulerDeclaration');if(!tasks.length)return;
    this.client.once('clientReady',async()=>{for(const t of tasks){
      if(this.stopped)return;
      const task=new NonOverlappingTask(signal=>this.interpreter.execute(t.body,{cliente:this.client,client:this.client},undefined,signal));
      this.scheduledTasks.push(task);
      const run=()=>{if(!this.stopped)void task.run().catch(e=>{if(!this.stopped)console.error(`[programador] Error de tarea '${t.name??'programada'}':`,e);});};
      if(t.every){
        try{const raw=await this.interpreter.eval(t.every,this.interpreter.globals,{cliente:this.client,client:this.client});const ms=parseDuration(raw);
          if(!Number.isFinite(ms)||ms<10||ms>2_147_483_647)throw new Error('Programador CADA: intervalo no válido (rango 10–2147483647 ms).');
          if(!this.stopped)this.timers.push(setInterval(run,ms));
        }catch(e){console.error('[programador] Registro de CADA fallido:',e);}
      }else if(t.at){
        let last='';const timer=setInterval(async()=>{if(this.stopped)return;try{
          const val=String(await this.interpreter.eval(t.at!,this.interpreter.globals,{}));const now=new Date();
          const hh=`${now.getHours()}`.padStart(2,'0'),mm=`${now.getMinutes()}`.padStart(2,'0'),key=`${now.toDateString()} ${hh}:${mm}`;
          if(val===`${hh}:${mm}`&&last!==key){last=key;run();}
        }catch(e){console.error('[programador] Fallo en TAREA A LAS:',e);}},1000);this.timers.push(timer);
      }else if(t.cron){
        let last='';const timer=setInterval(()=>{if(this.stopped)return;const now=new Date();const key=`${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
          if(key!==last&&matchesCronExpression(t.cron!,now)){last=key;run();}
        },1000);this.timers.push(timer);
      }
    }});
  }

  private selectSlashBody(c:DiscordCommandDeclaration,i:any):{body:readonly any[];decl?:DiscordSubcommandDeclaration}|undefined{
    let sub:string|undefined,group:string|undefined;try{sub=i.options.getSubcommand?.(false);group=i.options.getSubcommandGroup?.(false);}catch{}
    if(group){const g=c.groups?.find(x=>x.name===group);const d=g?.subcommands.find(x=>x.name===sub);if(d)return {body:d.body,decl:d};}
    if(sub){const d=c.subcommands?.find(x=>x.name===sub);if(d)return {body:d.body,decl:d};}return undefined;
  }

  private commandData(c:DiscordCommandDeclaration):any{
    const T=this.discord.ApplicationCommandOptionType??{};
    const options:any[]=[];
    for(const g of c.groups??[])options.push({type:T.SubcommandGroup??2,name:g.name,description:g.description,options:g.subcommands.map(s=>({type:T.Subcommand??1,name:s.name,description:s.description,options:s.options.map(o=>this.optionData(o))}))});
    for(const s of c.subcommands??[])options.push({type:T.Subcommand??1,name:s.name,description:s.description,options:s.options.map(o=>this.optionData(o))});
    if(!options.length)options.push(...c.options.map(o=>this.optionData(o)));
    let perms:any=undefined;if(c.defaultMemberPermissions?.length){let bits=0n;for(const p of c.defaultMemberPermissions){const canonical=resolvePermissionName(p);if(!canonical)throw new Error(`Permiso Discord desconocido: ${p}`);const v=this.discord.PermissionFlagsBits?.[canonical];if(v===undefined)throw new Error(`discord.js no reconoce el permiso ${canonical}`);bits|=BigInt(v);}perms=bits.toString();}
    return {name:c.name,description:c.description,dm_permission:c.dmPermission??true,nsfw:c.nsfw??false,default_member_permissions:perms??null,options};
  }
  private optionData(o:any):any{const T=this.discord.ApplicationCommandOptionType??{};const map:Record<string,any>={texto:T.String??3,entero:T.Integer??4,numero:T.Number??10,booleano:T.Boolean??5,usuario:T.User??6,canal:T.Channel??7,rol:T.Role??8,mencionable:T.Mentionable??9,adjunto:T.Attachment??11};const channelTypes=o.channelTypes?.map((x:string)=>{const ck=this.findCaseInsensitive(this.discord.ChannelType,x);return this.discord.ChannelType?.[x]??(ck?this.discord.ChannelType?.[ck]:undefined);}).filter((x:any)=>x!==undefined);return {name:o.name,description:o.description,type:map[o.kind]??3,required:o.required,autocomplete:o.autocomplete,choices:o.choices?.length?o.choices:undefined,min_value:o.minValue,max_value:o.maxValue,min_length:o.minLength,max_length:o.maxLength,channel_types:channelTypes?.length?channelTypes:undefined};}
  private contextCommandData(c:DiscordContextCommandDeclaration):any{return {name:c.name,type:c.contextKind==='usuario'?(this.discord.ApplicationCommandType?.User??2):(this.discord.ApplicationCommandType?.Message??3)};}

  /**
   * Contexto canónico: conserva al usuario que originó la ejecución incluso cuando
   * una OPCION homónima sustituye el alias corto (p. ej., OPCION usuario).
   * Las referencias a argumentos/objetivos son accesores para incorporar los valores
   * que el router resuelve después de crear el contexto de interacción.
   */
  private addFriendlyContext(ctx:Record<string,any>):Record<string,any>{
    if(!ctx.contexto){
      const userOf=(value:any)=>value?.user??value?.author??value;
      const stable=Object.assign(Object.create(null),{
        usuario:userOf(ctx.usuario),autor:userOf(ctx.autor),ejecutor:userOf(ctx.ejecutor),
        miembro:ctx.miembro,canal:ctx.canal,servidor:ctx.servidor,
        mensaje:ctx.mensaje,interaccion:ctx.interaccion,
        cliente:ctx.cliente,cuenta:ctx.cuenta,reaccion:ctx.reaccion,voz:ctx.voz
      });
      // No exponer el alias corto de una opción como identidad del ejecutor.
      for(const name of ['argumentos','infoComando','objetivo','usuarioObjetivo','mensajeObjetivo'] as const){
        Object.defineProperty(stable,name,{enumerable:true,get:()=>ctx[name]});
      }
      ctx.contexto=Object.freeze(stable);
    }
    const usuario=ctx.contexto.usuario;
    ctx.autorId=usuario?.id; ctx.autorNombre=usuario?.username;
    ctx.canalId=ctx.canal?.id;ctx.nombreCanal=ctx.canal?.name;
    ctx.servidorId=ctx.servidor?.id;ctx.nombreServidor=ctx.servidor?.name;
    ctx.botId=this.client?.user?.id;
    Object.assign(ctx,{
      AUTOR_ID:ctx.autorId,AUTOR_NOMBRE:ctx.autorNombre,
      CANAL_ID:ctx.canalId,NOMBRE_CANAL:ctx.nombreCanal,
      SERVIDOR_ID:ctx.servidorId,NOMBRE_SERVIDOR:ctx.nombreServidor,BOT_ID:ctx.botId
    });
    return ctx;
  }

  private makeCommandContext(i:any,c:DiscordCommandDeclaration,sub?:DiscordSubcommandDeclaration):Record<string,any>{const ctx=this.makeBaseInteractionContext(i);const opts=sub?.options??c.options;ctx.infoComando=Object.freeze({nombre:c.name,prefijo:'/',tipo:'barra',opciones:opts,declaracion:c});ctx.argumentos=Object.create(null);for(let index=0;index<opts.length;index++){const o=opts[index]!;const r=i.options?.get?.(o.name);const v=r?.member??r?.user??r?.channel??r?.role??r?.attachment??r?.value;ctx.argumentos[o.name]=v;ctx[`argumento${index+1}`]=v;if(!isProtectedCommandOptionName(o.name))ctx[o.name]=v;}return ctx;}
  private makeBaseInteractionContext(i:any):Record<string,any>{
    const ctx=this.addFriendlyContext({cliente:this.client,client:this.client,interaccion:i,interaction:i,usuario:i.user,autor:i.user,ejecutor:i.user,argumentos:Object.create(null),miembro:i.member??(i.memberPermissions?{memberPermissions:i.memberPermissions,user:i.user}:undefined),canal:i.channel,servidor:i.guild,guild:i.guild});
    (ctx as any)[COMMAND_INVOCATION]=true;
    return ctx;
  }
  private makeEventContext(ev:DiscordEventDeclaration,args:any[]):Record<string,any>{
    const ctx:Record<string,any>={cliente:this.client,client:this.client}; ev.parameters.forEach((n,i)=>ctx[n]=args[i]); const e=ev.event;
    if(e.startsWith('message')){const m=e==='messageUpdate'?args[1]:args[0];ctx.mensaje=m;ctx.message=m;ctx.usuario=m?.author;ctx.autor=m?.author;ctx.miembro=m?.member;ctx.canal=m?.channel;ctx.servidor=m?.guild;ctx.guild=m?.guild;}
    else if(e.startsWith('guildMember')){const m=e==='guildMemberUpdate'?args[1]:args[0];ctx.miembro=m;ctx.usuario=m;ctx.cuenta=m?.user;ctx.servidor=m?.guild;ctx.guild=m?.guild;}
    else if(e==='interactionCreate'){Object.assign(ctx,this.makeBaseInteractionContext(args[0]));}
    else if(e==='voiceStateUpdate'){const v=args[1];ctx.voz=v;ctx.miembro=v?.member;ctx.usuario=v?.member;ctx.canal=v?.channel;ctx.servidor=v?.guild;ctx.guild=v?.guild;}
    else if(e.startsWith('messageReaction')){ctx.reaccion=args[0];ctx.usuario=args[1];ctx.mensaje=args[0]?.message;ctx.canal=args[0]?.message?.channel;ctx.servidor=args[0]?.message?.guild;ctx.guild=ctx.servidor;}
    else if(e==='clientReady'){ctx.cliente=args[0]??this.client;ctx.client=ctx.cliente;}
    return this.addFriendlyContext(ctx);
  }

  // Métodos anteriores preservados para integraciones de pruebas que acceden al runtime.
  // La implementación real vive en commands/arguments.ts.
  private verifyArgument(option:any,value:any):void { verifyCommandArgument(option,value); }
  private convertMessageArg(raw:string|undefined,kind:string,message:any,index:number):Promise<any> {
    return convertMessageArgument(raw,kind,message,index);
  }

  /** PERMISOS también se aplica en tiempo de ejecución a los comandos con prefijo. */
  private checkCommandPermissions(cmd:DiscordCommandDeclaration,member:any,guild:any):void{
    if(!cmd.defaultMemberPermissions?.length)return;
    if(!member||!guild)throw new UserInputError(cmd.permissionError??'Permisos del comando: operación exclusiva de servidor; contexto no disponible.');
    const api=createDiscordHelpers(this.discord,()=>this.client);
    for(const permission of cmd.defaultMemberPermissions){
      if(!api.TIENE_PERMISO(member,permission))throw new UserInputError(cmd.permissionError??`Permisos insuficientes para ejecutar el comando: '${permission}'.`);
    }
  }

  private async replyInteractionError(i:any,e:any){try{const payload={content:e instanceof UserInputError?`${e.message}`:'Error interno durante la ejecución del comando (Discord-ComandoInterno-Error).',flags:this.discord?.MessageFlags?.Ephemeral??64};if(i.replied||i.deferred)await i.followUp(payload);else if(i.isRepliable?.())await i.reply(payload);}catch{}}
  private findCaseInsensitive(o:any,k:string):string|undefined{return Object.keys(o??{}).find(x=>x.toLowerCase()===String(k).toLowerCase());}

}
