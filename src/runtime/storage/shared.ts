import type { StorageScope } from './index.js';

export function checkIdentity(scope:StorageScope,owner:string,key:string):void {
  if(!['usuario','servidor','global'].includes(scope))throw new Error('Persistencia: ámbito de clave no reconocido.');
  if(!owner||owner.length>256)throw new Error('Persistencia: identificador de propietario ausente o incompatible.');
  if(!key||key.length>512)throw new Error('Persistencia: clave vacía, reservada o fuera de rango.');
}
export function serialize(value:unknown):string {
  const json=JSON.stringify(value);
  if(json===undefined)throw new Error('Persistencia: tipo no serializable (undefined, función o referencia circular).');
  if(Buffer.byteLength(json,'utf8')>1_048_576)throw new Error('Persistencia: tamaño de valor excedido (1 MiB).');
  return json;
}
export function deserialize(value:unknown):unknown {return value===null||value===undefined?undefined:JSON.parse(String(value));}
export function checkIncrement(amount:number):void {
  if(typeof amount!=='number'||!Number.isFinite(amount)||Math.abs(amount)>Number.MAX_SAFE_INTEGER)
    throw new Error('INCREMENTAR: incremento no finito o fuera del rango numérico seguro.');
}

