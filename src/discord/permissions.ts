/** Alias de permisos en español; normalización a PermissionFlagsBits. */
export const DISCORD_PERMISSION_NAMES = [
  'CreateInstantInvite','KickMembers','BanMembers','Administrator','ManageChannels','ManageGuild',
  'AddReactions','ViewAuditLog','PrioritySpeaker','Stream','ViewChannel','SendMessages',
  'SendTTSMessages','ManageMessages','EmbedLinks','AttachFiles','ReadMessageHistory',
  'MentionEveryone','UseExternalEmojis','ViewGuildInsights','Connect','Speak','MuteMembers',
  'DeafenMembers','MoveMembers','UseVAD','ChangeNickname','ManageNicknames','ManageRoles',
  'ManageWebhooks','ManageEmojisAndStickers','ManageGuildExpressions','UseApplicationCommands',
  'RequestToSpeak','ManageEvents','ManageThreads','CreatePublicThreads','CreatePrivateThreads',
  'UseExternalStickers','SendMessagesInThreads','UseEmbeddedActivities','ModerateMembers',
  'ViewCreatorMonetizationAnalytics','UseSoundboard','CreateGuildExpressions','CreateEvents',
  'UseExternalSounds','SendVoiceMessages','SetVoiceChannelStatus','SendPolls',
  'UseExternalApps','PinMessages','BypassSlowmode'
] as const;

const synonyms:Readonly<Record<string,string>> = {
  ADMINISTRADOR:'Administrator',ADMIN:'Administrator',
  EXPULSAR_MIEMBROS:'KickMembers',BANEAR_MIEMBROS:'BanMembers',
  GESTIONAR_CANAL:'ManageChannels',GESTIONAR_CANALES:'ManageChannels',
  GESTIONAR_SERVIDOR:'ManageGuild',ENVIAR_MENSAJES:'SendMessages',
  GESTIONAR_MENSAJES:'ManageMessages',VER_CANAL:'ViewChannel',VER_AUDITORIA:'ViewAuditLog',
  HISTORIAL_MENSAJES:'ReadMessageHistory',ADJUNTAR_ARCHIVOS:'AttachFiles',
  GESTIONAR_ROLES:'ManageRoles',GESTIONAR_WEBHOOKS:'ManageWebhooks',
  MODERAR_MIEMBROS:'ModerateMembers',USAR_COMANDOS:'UseApplicationCommands',
  MENCIONAR_TODOS:'MentionEveryone',ENLACES_EMBEBIDOS:'EmbedLinks',
};
const key = (s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
const index = new Map<string,string>();
for(const name of DISCORD_PERMISSION_NAMES)index.set(key(name),name);
for(const [alias,name] of Object.entries(synonyms))index.set(key(alias),name);
/** Devuelve undefined ante un permiso desconocido, nunca un permiso vacío. */
export function resolvePermissionName(input:string):string|undefined{return index.get(key(String(input)));}
