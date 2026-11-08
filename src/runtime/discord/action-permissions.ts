import { UserInputError } from '../user-input.js';
import { createDiscordHelpers } from '../discord-helpers.js';
import { COMMAND_INVOCATION } from '../command-context.js';

export type DiscordActionContext = Record<string,any> & { [COMMAND_INVOCATION]?:boolean };

/** Regla de autorización compartida para operaciones administrativas de Discord. */
export function assertDiscordActionPermission(action:string,ctx:DiscordActionContext,guild:any,discord:any):void{
    if(ctx[COMMAND_INVOCATION]!==true&&ctx.argumentos===undefined)return;
    const permissions:Record<string,string>={
      unban:'BANEAR_MIEMBROS',
      addRole:'GESTIONAR_ROLES',removeRole:'GESTIONAR_ROLES',createRole:'GESTIONAR_ROLES',editRole:'GESTIONAR_ROLES',deleteRole:'GESTIONAR_ROLES',
      nickname:'ManageNicknames',
      createChannel:'GESTIONAR_CANALES',editChannel:'GESTIONAR_CANALES',deleteChannel:'GESTIONAR_CANALES',slowmode:'GESTIONAR_CANALES',syncPermissions:'GESTIONAR_CANALES',
      allowPermission:'GESTIONAR_ROLES',denyPermission:'GESTIONAR_ROLES',
      deleteMessage:'GESTIONAR_MENSAJES',bulkDelete:'GESTIONAR_MENSAJES',pin:'GESTIONAR_MENSAJES',unpin:'GESTIONAR_MENSAJES',crosspost:'GESTIONAR_MENSAJES',
      createWebhook:'GESTIONAR_WEBHOOKS',createInvite:'CreateInstantInvite',
      createEmoji:'ManageGuildExpressions',editEmoji:'ManageGuildExpressions',deleteEmoji:'ManageGuildExpressions',
      createSticker:'ManageGuildExpressions',editSticker:'ManageGuildExpressions',deleteSticker:'ManageGuildExpressions',
      createScheduledEvent:'ManageEvents',editScheduledEvent:'ManageEvents',deleteScheduledEvent:'ManageEvents',
      createAutoMod:'GESTIONAR_SERVIDOR',editAutoMod:'GESTIONAR_SERVIDOR',deleteAutoMod:'GESTIONAR_SERVIDOR',
      createSoundboard:'ManageGuildExpressions',editSoundboard:'ManageGuildExpressions',deleteSoundboard:'ManageGuildExpressions',
      createThread:'CreatePublicThreads',archiveThread:'ManageThreads',unarchiveThread:'ManageThreads',lockThread:'ManageThreads',unlockThread:'ManageThreads',
      addThreadMember:'ManageThreads',removeThreadMember:'ManageThreads',
      moveVoice:'MoveMembers',disconnectVoice:'MoveMembers',presence:'ADMINISTRADOR'
    };
    const permission=permissions[action];if(!permission)return;
    const helpers=createDiscordHelpers(discord,()=>ctx.cliente??ctx.client);
    if(!guild&&action!=='presence')throw new UserInputError('Operación Discord: contexto de servidor requerido.');
    if(guild&&helpers.ES_DUENO(ctx.miembro??ctx.ejecutor,guild))return;
    if(!ctx.miembro||!helpers.TIENE_PERMISO(ctx.miembro,permission))
      throw new UserInputError(`Operación Discord: permiso requerido '${permission}' no concedido al ejecutor.`);
  }

