import { createHash } from 'node:crypto';

/** Compare only Discord's registered command shape; never compare executable DSL bodies. */
type Data = Record<string, any>;
const own = (object: Data, key: string): boolean => Object.prototype.hasOwnProperty.call(object, key);
function field(data: Data, snake: string): any {
  if (own(data, snake)) return data[snake];
  const camel = snake.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
  return data[camel];
}
function order(value: any): any {
  if (Array.isArray(value)) return value.map(order);
  if (value === undefined || value === null) return null;
  if (typeof value === 'bigint') return value.toString();
  if (value && typeof value === 'object') {
    if (typeof value.toJSON === 'function' && !Array.isArray(value)) return order(value.toJSON());
    return Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => [key, order(value[key])]));
  }
  return value;
}
function bitfield(value: any): string | null {
  if (value === undefined || value === null) return null;
  const raw = typeof value === 'object' && 'bitfield' in value ? value.bitfield : value;
  try { return BigInt(raw).toString(); }
  catch { throw new Error('CommandSync-PermisosInvalidos-Error: valor default_member_permissions no válido.'); }
}
function localization(value: any): Data | null {
  if (value === undefined || value === null) return null;
  const normalized = order(value);
  return normalized && typeof normalized === 'object' && !Array.isArray(normalized) && Object.keys(normalized).length === 0 ? null : normalized;
}
function choices(value: any): any[] {
  if (!Array.isArray(value)) return [];
  return value.map((c: Data) => ({
    name: c.name,
    name_localizations: localization(field(c, 'name_localizations')),
    value: c.value
  }));
}
function option(value: Data, desired: Data = value): Data {
  const result: Data = {
    type: Number(value.type),
    name: value.name,
    description: value.description ?? '',
    required: value.required === true,
    autocomplete: value.autocomplete === true,
    options: Array.isArray(value.options) ? value.options.map((v: Data,i: number) => option(v,desired.options?.[i]??{})) : [],
    choices: choices(value.choices),
    channel_types: [...(field(value, 'channel_types') ?? [])].map(Number).sort((a,b)=>a-b),
    min_value: field(value, 'min_value') ?? null,
    max_value: field(value, 'max_value') ?? null,
    min_length: field(value, 'min_length') ?? null,
    max_length: field(value, 'max_length') ?? null
  };
  for (const key of ['name_localizations','description_localizations']) {
    if (field(desired, key) !== undefined) result[key] = localization(field(value,key));
  }
  return result;
}
/** Forma canónica del payload usada para comparar comandos remotos. */
export function canonicalCommand(value: Data, desired?: Data): Data {
  const base: Data = {
    type: Number(value.type ?? 1),
    name: value.name,
    description: value.description ?? '',
    options: Array.isArray(value.options) ? value.options.map((v:Data,i:number)=> option(v,desired?.options?.[i]??{})) : []
  };
  for (const key of ['name_localizations','description_localizations']) {
    if (!desired || field(desired,key) !== undefined) base[key] = localization(field(value,key));
  }
  if (!desired || field(desired,'default_member_permissions') !== undefined)
    base.default_member_permissions = bitfield(field(value,'default_member_permissions'));
  if (!desired || field(desired,'dm_permission') !== undefined) base.dm_permission=field(value,'dm_permission')??true;
  if (!desired || field(desired,'nsfw') !== undefined) base.nsfw=value.nsfw??false;
  // Discord API may fill integration types/contexts with defaults that are not
  // controlled by older PseudoDiscord DSL projects. Check these only if supplied.
  for (const key of ['contexts', 'integration_types']) {
    if (desired && field(desired, key) !== undefined) {
      const next = field(value, key);
      base[key] = Array.isArray(next) ? [...next].map(Number).sort((a,b)=>a-b) : [];
    }
  }
  return base;
}
export function sameCommand(existing: Data, desired: Data): boolean {
  return JSON.stringify(order(canonicalCommand(existing, desired))) === JSON.stringify(order(canonicalCommand(desired, desired)));
}
export function commandKey(value: Data): string {
  return `${Number(value.type ?? 1)}:${value.name}`;
}
/** Stable across object-key ordering and independent of instruction bodies. */
export function fingerprint(commands: readonly Data[]): string {
  const sorted = commands.map(cmd => canonicalCommand(cmd, cmd)).sort((a,b) => commandKey(a).localeCompare(commandKey(b)));
  return createHash('sha256').update(JSON.stringify(order(sorted))).digest('hex');
}
