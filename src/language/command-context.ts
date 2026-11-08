/** Reglas compartidas entre validador y runtime de comandos Discord. */
import { normalizeIdentifier } from './identifiers.js';

/** Los argumentos con estos nombres no pueden sustituir los alias del contexto. */
const protectedNames = new Set([
  'argumentos','contexto','cliente','client','interaccion','interaction',
  'guild','autor','ejecutor','miembro','mensaje','message','canal','servidor'
]);

export function isProtectedCommandOptionName(name:string):boolean {
  const key=normalizeIdentifier(name);
  return protectedNames.has(key)||/^argumento\d+$/.test(key)||['__proto__','prototype','constructor'].includes(key);
}

/** `usuario` es el único alias de identidad que una opción puede sustituir. */
export function hasCommandOptionContextCollision(name:string):boolean {
  const key=normalizeIdentifier(name);
  return key==='usuario'||isProtectedCommandOptionName(key);
}

/** Rutas canónicas que tienen significado propio, incluso ante opciones homónimas. */
export function contextOptionRoute(name:string):string {
  const key=normalizeIdentifier(name);
  if(key==='contexto')return 'contexto';
  if(key==='argumentos')return 'contexto.argumentos';
  if(/^argumento\d+$/.test(key))return name;
  const alias:Record<string,string>={client:'cliente',interaction:'interaccion',guild:'servidor',message:'mensaje'};
  return `contexto.${alias[key]??name}`;
}
