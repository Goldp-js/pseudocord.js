/** Interpreta las unidades de duración del DSL en milisegundos. */
export function parseDuration(value:unknown):number {
  if (typeof value === 'number') return value;
  const match = String(value).trim().match(/^([\d.]+)\s*(ms|s|m|h|d)?$/i);
  if (!match) return Number(value);
  const amount = Number(match[1]);
  const units:Record<string,number> = {ms:1,s:1000,m:60000,h:3600000,d:86400000};
  return amount * units[match[2]?.toLowerCase() ?? 'ms']!;
}
