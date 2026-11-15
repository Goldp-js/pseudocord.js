import { createHash } from 'node:crypto';

/** Compare only Discord's registered command shape; never compare executable DSL bodies. */
type Data = Record<string, any>;
const hasOwnProperty = (object: Data, key: string): boolean => Object.prototype.hasOwnProperty.call(object, key);
function readCanonicalField(data: Data, snake: string): any {
  if (hasOwnProperty(data, snake)) return data[snake];
  const camel = snake.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
  return data[camel];
}
function normalizeCanonicalStructure(value: any): any {
  if (Array.isArray(value)) return value.map(normalizeCanonicalStructure);
  if (value === undefined || value === null) return null;
  if (typeof value === 'bigint') return value.toString();
  if (value && typeof value === 'object') {
    if (typeof value.toJSON === 'function' && !Array.isArray(value)) return normalizeCanonicalStructure(value.toJSON());
    return Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => [key, normalizeCanonicalStructure(value[key])]));
  }
  return value;
}
function serializePermissionBitfield(value: any): string | null {
  if (value === undefined || value === null) return null;
  const raw = typeof value === 'object' && 'bitfield' in value ? value.bitfield : value;
  try { return BigInt(raw).toString(); }
  catch { throw new Error('CommandSync-PermisosInvalidos-Error: valor default_member_permissions no válido.'); }
}
function normalizeLocalizations(value: any): Data | null {
  if (value === undefined || value === null) return null;
  const normalized = normalizeCanonicalStructure(value);
  return normalized && typeof normalized === 'object' && !Array.isArray(normalized) && Object.keys(normalized).length === 0 ? null : normalized;
}
function normalizeCommandChoices(value: any): any[] {
  if (!Array.isArray(value)) return [];
  return value.map((c: Data) => ({
    name: c.name,
    name_localizations: normalizeLocalizations(readCanonicalField(c, 'name_localizations')),
    value: c.value
  }));
}
function normalizeCommandOption(value: Data, desired: Data = value): Data {
  const result: Data = {
    type: Number(value.type),
    name: value.name,
    description: value.description ?? '',
    required: value.required === true,
    autocomplete: value.autocomplete === true,
    options: Array.isArray(value.options) ? value.options.map((v: Data,i: number) => normalizeCommandOption(v,desired.options?.[i]??{})) : [],
    choices: normalizeCommandChoices(value.choices),
    channel_types: [...(readCanonicalField(value, 'channel_types') ?? [])].map(Number).sort((a,b)=>a-b),
    min_value: readCanonicalField(value, 'min_value') ?? null,
    max_value: readCanonicalField(value, 'max_value') ?? null,
    min_length: readCanonicalField(value, 'min_length') ?? null,
    max_length: readCanonicalField(value, 'max_length') ?? null
  };
  for (const key of ['name_localizations','description_localizations']) {
    if (readCanonicalField(desired, key) !== undefined) result[key] = normalizeLocalizations(readCanonicalField(value,key));
  }
  return result;
}
/** Forma canónica del payload usada para comparar comandos remotos. */
export function canonicalCommand(value: Data, desired?: Data): Data {
  const base: Data = {
    type: Number(value.type ?? 1),
    name: value.name,
    description: value.description ?? '',
    options: Array.isArray(value.options) ? value.options.map((v:Data,i:number)=> normalizeCommandOption(v,desired?.options?.[i]??{})) : []
  };
  for (const key of ['name_localizations','description_localizations']) {
    if (!desired || readCanonicalField(desired,key) !== undefined) base[key] = normalizeLocalizations(readCanonicalField(value,key));
  }
  if (!desired || readCanonicalField(desired,'default_member_permissions') !== undefined)
    base.default_member_permissions = serializePermissionBitfield(readCanonicalField(value,'default_member_permissions'));
  if (!desired || readCanonicalField(desired,'dm_permission') !== undefined) base.dm_permission=readCanonicalField(value,'dm_permission')??true;
  if (!desired || readCanonicalField(desired,'nsfw') !== undefined) base.nsfw=value.nsfw??false;
  // Discord API may fill integration types/contexts with defaults that are not
  // controlled by older PseudoDiscord DSL projects. Check these only if supplied.
  for (const key of ['contexts', 'integration_types']) {
    if (desired && readCanonicalField(desired, key) !== undefined) {
      const next = readCanonicalField(value, key);
      base[key] = Array.isArray(next) ? [...next].map(Number).sort((a,b)=>a-b) : [];
    }
  }
  return base;
}
export function sameCommand(existing: Data, desired: Data): boolean {
  return JSON.stringify(normalizeCanonicalStructure(canonicalCommand(existing, desired))) === JSON.stringify(normalizeCanonicalStructure(canonicalCommand(desired, desired)));
}
export function commandKey(value: Data): string {
  return `${Number(value.type ?? 1)}:${value.name}`;
}
/** Stable across object-key ordering and independent of instruction bodies. */
export function fingerprint(commands: readonly Data[]): string {
  const sorted = commands.map(cmd => canonicalCommand(cmd, cmd)).sort((a,b) => commandKey(a).localeCompare(commandKey(b)));
  return createHash('sha256').update(JSON.stringify(normalizeCanonicalStructure(sorted))).digest('hex');
}
