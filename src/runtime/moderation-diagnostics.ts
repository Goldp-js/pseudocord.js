/** Diagnósticos informativos sin efecto sobre la autorización. */
export type ModerationAction = 'kick' | 'ban' | 'timeout';

const actions: Record<ModerationAction, { label: string; permission: string; property: string }> = {
  kick: { label: 'expulsar', permission: 'KickMembers', property: 'kickable' },
  ban: { label: 'banear', permission: 'BanMembers', property: 'bannable' },
  timeout: { label: 'silenciar', permission: 'ModerateMembers', property: 'moderatable' }
};

function sameId(a: any, b: any): boolean {
  const aId = a?.id ?? a?.user?.id;
  const bId = b?.id ?? b?.user?.id;
  return Boolean(aId && bId && String(aId) === String(bId));
}

function permission(member: any, name: string): boolean | undefined {
  try {
    return typeof member?.permissions?.has === 'function'
      ? Boolean(member.permissions.has(name)) : undefined;
  } catch {
    return undefined;
  }
}

/** True si el primer rol es igual o inferior al segundo; undefined si faltan datos. */
function insufficientRole(first: any, second: any): boolean | undefined {
  const a = first?.roles?.highest, b = second?.roles?.highest;
  if (!a || !b) return undefined;
  try {
    if (typeof a.comparePositionTo === 'function') {
      const result = Number(a.comparePositionTo(b));
      return Number.isFinite(result) ? result <= 0 : undefined;
    }
    if (Number.isFinite(a.position) && Number.isFinite(b.position)) return a.position <= b.position;
  } catch { /* La falta de datos impide afirmar la relación jerárquica. */ }
  return undefined;
}

function botMember(guild: any): any {
  const botId = guild?.client?.user?.id;
  return guild?.members?.me ?? (botId && guild?.members?.cache?.get?.(botId));
}

/** Emite causas verificables a partir de datos de permisos y jerarquía. */
export function moderationBotDenial(action: ModerationAction, target: any, guild: any): string {
  const data = actions[action];
  const preface = `Moderación: acción denegada por permisos o jerarquía del bot (${data.property}=false).`;
  const bot = botMember(guild);
  if (guild?.ownerId && String(target?.id) === String(guild.ownerId))
    return `${preface} [Moderacion-ObjetivoPropietario-Error] El miembro objetivo es propietario del servidor.`;
  if (bot && sameId(bot, target))
    return `${preface} [Moderacion-BotAutoModeracion-Error] El bot no puede moderarse a sí mismo.`;
  if (action === 'timeout' && permission(target, 'Administrator') === true)
    return `${preface} [Moderacion-TimeoutAdministrador-Error] No se puede silenciar a un miembro con permiso Administrador.`;
  if (bot && permission(bot, data.permission) === false)
    return `${preface} [Moderacion-PermisoBot-Error] El bot no tiene el permiso ${data.permission}.`;
  if (bot && insufficientRole(bot, target) === true)
    return `${preface} [Moderacion-JerarquiaBot-Error] El rol más alto del bot debe superar al del objetivo.`;
  return `${preface} [Moderacion-CapacidadBot-Error] Discord rechazó la capacidad de ${data.label}; permisos o jerarquía del bot insuficientes.`;
}

export function moderationExecutorDenial(action: ModerationAction, actor: any, target: any, guild: any): string {
  const data = actions[action];
  const preface = 'Moderación: permisos o jerarquía insuficientes para el ejecutor.';
  if (!actor?.id) return `${preface} [Moderacion-EjecutorDesconocido-Error] No se pudo identificar al miembro ejecutor en el servidor.`;
  if (sameId(actor, target)) return `${preface} [Moderacion-EjecutorAutoModeracion-Error] No se permite moderarse a sí mismo.`;
  if (guild?.ownerId && String(target?.id) === String(guild.ownerId))
    return `${preface} [Moderacion-EjecutorObjetivoPropietario-Error] El objetivo es propietario del servidor.`;
  const actorIsOwner = guild?.ownerId && String(actor.id) === String(guild.ownerId);
  if (!actorIsOwner && permission(actor, data.permission) === false)
    return `${preface} [Moderacion-PermisoEjecutor-Error] Falta el permiso ${data.permission} en el ejecutor.`;
  if (!actorIsOwner && insufficientRole(actor, target) === true)
    return `${preface} [Moderacion-JerarquiaEjecutor-Error] El rol más alto del ejecutor no supera al del objetivo.`;
  return `${preface} [Moderacion-AutorizacionEjecutor-Error] No se cumplen las condiciones de autorización del comando.`;
}
