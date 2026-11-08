import { createDiscordHelpers } from '../discord-helpers.js';
import { UserInputError } from '../user-input.js';
import { moderationBotDenial, moderationExecutorDenial } from '../moderation-diagnostics.js';
import { COMMAND_INVOCATION } from '../command-context.js';
import { normalizeMessagePayload } from './payload.js';
import type { Environment } from '../environment.js';
import type { Expression } from '../../ast/expressions.js';

/** Operaciones Discord independientes del estado del intérprete. */
type DiscordActionContext = Record<string,any> & { [COMMAND_INVOCATION]?: boolean };

export interface DiscordActionServices {
  discord:any;
  eval(expr:Expression,env:Environment,ctx:DiscordActionContext):Promise<any>;
  assertActionPermission(action:string,ctx:DiscordActionContext,guild:any):void;
  resolveChannel(value:any,guild:any,fallback:any):Promise<any>;
  resolveUserOrMember(value:any,guild:any,client?:any):Promise<any>;
  resolveMember(value:any,guild:any):Promise<any>;
  resolveRole(value:any,guild:any):Promise<any>;
  mentionId(value:any):string|undefined;
  duration(value:any):number;
}

export async function dispatchDiscordAction(s:any,env:Environment,ctx:DiscordActionContext,services:DiscordActionServices):Promise<any>{
    const args=[];for(const a of s.arguments)args.push(await services.eval(a,env,ctx));let target=s.target?await services.eval(s.target,env,ctx):undefined;
    const guild=ctx.servidor??ctx.guild??ctx.mensaje?.guild??ctx.interaccion?.guild; const channel=ctx.canal??ctx.channel??ctx.mensaje?.channel??ctx.interaccion?.channel; const message=ctx.mensaje??ctx.message; const interaction=ctx.interaccion??ctx.interaction;
    services.assertActionPermission(s.action,ctx,guild);
    if(s.action==='reply'){
      const obj=target??interaction??message;
      if(!obj)throw new Error('RESPONDER: falta el contexto de mensaje/interacción o un destino explícito.');
      const efimero=s.options?.efimero?Boolean(await services.eval(s.options.efimero,env,ctx)):false;
      const sinMenciones=s.options?.sinMenciones?Boolean(await services.eval(s.options.sinMenciones,env,ctx)):false;
      let payload=normalizeMessagePayload(args[0]);
      if(efimero||sinMenciones){
        if(typeof payload==='string')payload={content:payload};
        else if(!payload||typeof payload!=='object')payload={content:String(payload??'')};
        else payload={...payload};
        if(efimero){
          if(!interaction||obj!==interaction)throw new Error('RESPONDER EFIMERO: únicamente disponible en interacciones de aplicación.');
          payload.flags=(payload.flags??0)|(services.discord.MessageFlags?.Ephemeral??64);
        }
        if(sinMenciones)payload.allowedMentions={parse:[],repliedUser:false};
      }
      if(interaction&&obj===interaction){if(interaction.replied||interaction.deferred)return interaction.followUp(payload);return interaction.reply(payload);}
      return obj.reply(payload);
    }
    if(s.action==='send'){
      target=await services.resolveChannel(target,guild,channel);
      if(typeof target?.send!=='function')throw new UserInputError('ENVIAR: destino incompatible; se requiere canal con capacidad de envío.');
      return target.send(normalizeMessagePayload(args[0]));
    }
    if(s.action==='dm'){
      const recipient=await services.resolveUserOrMember(target,guild,ctx.cliente??ctx.client);
      if(typeof recipient?.send!=='function')throw new UserInputError('ENVIAR PRIVADO: destinatario no resuelto o sin capacidad de mensajería.');
      return recipient.send(normalizeMessagePayload(args[0]));
    }
    if(s.action==='addRole'||s.action==='removeRole'){const member=await services.resolveMember(target,guild);const role=await services.resolveRole(args[0],guild);return s.action==='addRole'?member.roles.add(role):member.roles.remove(role);}
    if(['kick','ban','timeout'].includes(s.action)){
      if(!guild)throw new UserInputError('Moderación: operación no disponible fuera de un servidor.');
      if(target===undefined||target===null||target==='')throw new UserInputError('Moderación: argumento objetivo ausente.');
      const member=await services.resolveMember(target,guild);
      if(!member)throw new UserInputError('Moderación: miembro objetivo no encontrado en el servidor.');
      const property=s.action==='kick'?'kickable':s.action==='ban'?'bannable':'moderatable';
      if(member[property]!==true)throw new UserInputError(moderationBotDenial(s.action as 'kick'|'ban'|'timeout',member,guild));
      // En comandos de usuarios, también comprobar la jerarquía y permisos del ejecutor.
      // Los eventos y tareas automatizadas pueden seguir usando las acciones controladas por el bot.
      if(ctx[COMMAND_INVOCATION]===true||ctx.argumentos!==undefined){
        const fn=s.action==='kick'?'PUEDE_EXPULSAR':s.action==='ban'?'PUEDE_BANEAR':'PUEDE_SILENCIAR';
        const helpers=createDiscordHelpers(services.discord,()=>ctx.cliente??ctx.client);
        if(!await helpers[fn]!(ctx.miembro,member))throw new UserInputError(moderationExecutorDenial(s.action as 'kick'|'ban'|'timeout',ctx.miembro,member,guild));
      }
      if(s.action==='kick')return member.kick(args[0]?String(args[0]):undefined);
      if(s.action==='ban')return member.ban(args[0]?{reason:String(args[0])}:undefined);
      const duration=services.duration(args[0]);
      if(!Number.isFinite(duration)||duration<0||duration>28*24*60*60*1000)throw new Error('SILENCIAR: duración fuera de rango (0–28 días).');
      return member.timeout(duration,args[1]?String(args[1]):undefined);
    }
    if(s.action==='unban'){
      if(!guild?.members?.unban)throw new UserInputError('DESBANEAR: contexto de servidor requerido.');
      const id=services.mentionId(target);
      if(!id)throw new UserInputError('DESBANEAR: identificador de usuario no válido (Snowflake o mención).');
      return guild.members.unban(id,args[0]);
    }
    if(s.action==='deleteMessage'){const m=target??message;if(typeof m?.delete!=='function')throw new UserInputError('ELIMINAR MENSAJE: referencia al mensaje ausente.');return m.delete();}
    if(s.action==='editMessage')return target.edit(normalizeMessagePayload(args[0]));
    if(s.action==='react'){
      const m=target??message;if(typeof m?.react!=='function')throw new UserInputError('REACCIONAR: referencia al mensaje ausente.');
      return m.react(args[0]);
    }
    if(s.action==='nickname')return (await services.resolveMember(target,guild)).setNickname(args[0]);
    if(s.action==='createChannel'){const opts=args[1]&&typeof args[1]==='object'?{...args[1],name:String(args[0])}:{name:String(args[0])};return guild.channels.create(opts);}
    if(s.action==='deleteChannel')return (await services.resolveChannel(target,guild,channel)).delete();
    if(s.action==='editChannel')return (await services.resolveChannel(target,guild,channel)).edit(args[0]);
    if(s.action==='createThread'){const ch=await services.resolveChannel(target,guild,channel);return ch.threads.create(typeof args[0]==='object'?args[0]:{name:String(args[0])});}
    if(s.action==='createRole'){const opts=args[1]&&typeof args[1]==='object'?{...args[1],name:String(args[0])}:{name:String(args[0])};return guild.roles.create(opts);}
    if(s.action==='deleteRole')return (await services.resolveRole(target,guild)).delete();
    if(s.action==='editRole')return (await services.resolveRole(target,guild)).edit(args[0]);
    if(s.action==='createWebhook'){const ch=await services.resolveChannel(target,guild,channel);return ch.createWebhook({name:String(args[0])});}
    if(s.action==='createInvite'){const ch=await services.resolveChannel(target,guild,channel);return ch.createInvite(args[0]&&typeof args[0]==='object'?args[0]:undefined);}
    if(s.action==='pin'){const m=target??message;if(typeof m?.pin!=='function')throw new UserInputError('FIJAR: referencia al mensaje ausente.');return m.pin();}
    if(s.action==='unpin'){const m=target??message;if(typeof m?.unpin!=='function')throw new UserInputError('DESFIJAR: referencia al mensaje ausente.');return m.unpin();}
    if(s.action==='bulkDelete'){const ch=await services.resolveChannel(target,guild,channel);return ch.bulkDelete(Number(args[0]),true);}
    if(s.action==='deferReply'){if(!interaction)throw new Error('DIFERIR: operación exclusiva de una interacción de aplicación.');return interaction.deferReply(args[0]?{ephemeral:true}:undefined);}
    if(s.action==='followUp'){if(!interaction)throw new Error('SEGUIR: operación exclusiva de una interacción de aplicación.');return interaction.followUp(normalizeMessagePayload(args[0]));}
    if(s.action==='editReply'){if(!interaction)throw new Error('EDITAR RESPUESTA: interacción activa requerida.');return interaction.editReply(normalizeMessagePayload(args[0]));}
    if(s.action==='deleteReply'){if(!interaction)throw new Error('ELIMINAR RESPUESTA: interacción activa requerida.');return interaction.deleteReply();}
    if(s.action==='showModal'){if(!interaction)throw new Error('MOSTRAR MODAL: interacción activa requerida.');return interaction.showModal(args[0]);}
    if(s.action==='moveVoice'){const member=await services.resolveMember(target,guild);const ch=await services.resolveChannel(args[0],guild,channel);return member.voice.setChannel(ch);}
    if(s.action==='disconnectVoice'){return (await services.resolveMember(target,guild)).voice.disconnect();}
    if(s.action==='presence'){return ctx.client?.user?.setPresence?.(args[0]);}
    if(s.action==='autocompleteRespond'){if(!interaction?.isAutocomplete?.())throw new Error('SUGERIR: operación exclusiva del controlador AUTOCOMPLETAR.');const values=Array.isArray(args[0])?args[0]:args;const choices=values.map((x:any)=>typeof x==='object'&&x?.name!==undefined?x:{name:String(x),value:x});return interaction.respond(choices.slice(0,25));}
    if(['archiveThread','unarchiveThread','lockThread','unlockThread'].includes(s.action)){const th=await services.resolveChannel(target,guild,channel);if(s.action==='archiveThread')return th.setArchived(true);if(s.action==='unarchiveThread')return th.setArchived(false);if(s.action==='lockThread')return th.setLocked(true);return th.setLocked(false);}
    if(s.action==='slowmode'){const ch=await services.resolveChannel(target,guild,channel);const sec=Math.max(0,Math.floor(services.duration(args[0])/1000));return ch.setRateLimitPerUser(sec);}
    if(s.action==='createEmoji')return guild.emojis.create(args[0]);
    if(s.action==='editEmoji')return guild.emojis.edit(target,args[0]);
    if(s.action==='deleteEmoji')return guild.emojis.delete(target);
    if(s.action==='createSticker')return guild.stickers.create(args[0]);
    if(s.action==='editSticker')return guild.stickers.edit(target,args[0]);
    if(s.action==='deleteSticker')return guild.stickers.delete(target);
    if(s.action==='createScheduledEvent')return guild.scheduledEvents.create(args[0]);
    if(s.action==='editScheduledEvent')return guild.scheduledEvents.edit(target,args[0]);
    if(s.action==='deleteScheduledEvent')return guild.scheduledEvents.delete(target);
    if(s.action==='createAutoMod')return guild.autoModerationRules.create(args[0]);
    if(s.action==='editAutoMod')return guild.autoModerationRules.edit(target,args[0]);
    if(s.action==='deleteAutoMod')return guild.autoModerationRules.delete(target);
    if(s.action==='createSoundboard')return guild.soundboardSounds.create(args[0]);
    if(s.action==='editSoundboard')return guild.soundboardSounds.edit(target,args[0]);
    if(s.action==='deleteSoundboard')return guild.soundboardSounds.delete(target);
    if(s.action==='crosspost')return (target??message).crosspost();
    if(s.action==='allowPermission'||s.action==='denyPermission'){const ch=await services.resolveChannel(target,guild,channel);const subject=args[1];const perm=String(args[0]);return ch.permissionOverwrites.edit(subject,{[perm]:s.action==='allowPermission'});}
    if(s.action==='syncPermissions'){const ch=await services.resolveChannel(target,guild,channel);return ch.lockPermissions();}
    if(s.action==='addThreadMember'||s.action==='removeThreadMember'){const th=await services.resolveChannel(args[0],guild,channel);const member=await services.resolveMember(target,guild);return s.action==='addThreadMember'?th.members.add(member):th.members.remove(member);}
    if(s.action==='joinThread'||s.action==='leaveThread'){const th=await services.resolveChannel(target,guild,channel);return s.action==='joinThread'?th.join():th.leave();}
    throw new Error(`Intérprete Discord: acción no registrada '${s.action}'.`);
}
