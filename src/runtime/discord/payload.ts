/** Conversión de los constructores DSL a los formatos esperados por discord.js. */
export function normalizeMessagePayload(value:any):any {
  if(value==null||typeof value==='string')return value;
  if(value?.__pdKind==='message')return stripPd(value);
  if(value?.__pdKind==='poll')return {poll:stripPd(value)};
  const name=value?.constructor?.name??'';
  if(name==='EmbedBuilder')return {embeds:[value]};
  if(name==='ActionRowBuilder')return {components:[value]};
  if(name==='AttachmentBuilder')return {files:[value]};
  return value;
}

export function stripPd(value:any):any {
  const result={...value};
  delete result.__pdKind;
  return result;
}

export function parseColor(value:any):any {
  if(typeof value==='number')return value;
  const text=String(value).trim();
  if(/^#?[0-9a-f]{6}$/i.test(text))return parseInt(text.replace('#',''),16);
  return value;
}
