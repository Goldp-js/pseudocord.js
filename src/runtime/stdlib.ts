import { createHash, createHmac, randomInt, randomUUID } from 'node:crypto';
import { sleepCancelable, executionGuard } from './execution.js';
import { createDiscordHelpers } from './discord-helpers.js';
import { createHttpHelpers } from './http-safe.js';
import { createDiscordExtras } from './discord-extras.js';
import { createExpandedApi } from './expanded-api.js';
import { createBotToolkit } from './bot-toolkit.js';
import { UserInputError } from './user-input.js';
import { checkedRegex, safeMatch, safeMatches } from './safe-regex.js';
import type { CommandCooldowns } from './cooldowns.js';

const norm=(s:any)=>String(s);
const arr=(x:any)=>Array.isArray(x)?x:x==null?[]:[...x];
const num=(x:any)=>Number(x);
const cmp=(a:any,b:any)=>a<b?-1:a>b?1:0;
const padSize=(n:any):number=>{const size=Number(n);if(!Number.isSafeInteger(size)||size<0||size>1_000_000)throw new RangeError('RELLENO: longitud fuera de rango (0–1000000).');return size;};
const pad=(x:any,n=2,c='0')=>String(x).padStart(padSize(n),String(c));
const finiteList=(value:any,operation:string):number[]=>{
  const a=arr(value).map((x:any)=>strictNumber(x,operation));
  if(a.length>100_000)throw new RangeError(`${operation}: máximo 100000 elementos.`);
  return a;
};
const numericResult=(value:number,operation:string)=>{if(!Number.isFinite(value))throw new RangeError(`${operation}: resultado no finito.`);return value;};
const safeKey=(key:any):PropertyKey=>{
  if(typeof key==='symbol')return key;
  const s=String(key);
  if(['__proto__','constructor','prototype'].includes(s))throw new Error(`Objeto: clave reservada '${s}'.`);
  return s;
};
// Conversiones estrictas para evitar errores silenciosos en comandos de usuarios.
const strictNumber=(value:any,kind='NUMERO'):number=>{
  if(typeof value==='string'&&!value.trim())throw new Error(`${kind}: entrada numérica vacía.`);
  if(value===null||value===undefined)throw new Error(`${kind}: tipo incompatible; se esperaba número o cadena numérica.`);
  const n=Number(value);if(!Number.isFinite(n))throw new Error(`${kind}: conversión fallida; valor no numérico o no finito.`);return n;
};
const strictInteger=(value:any,base:any=10):number=>{
  const radix=Number(base);
  if(!Number.isSafeInteger(radix)||radix<2||radix>36)throw new Error('ENTERO: base numérica fuera de rango (2–36).');
  const text=String(value??'').trim();
  if(!text)throw new Error('ENTERO: cadena de entrada vacía.');
  const body=text.replace(/^[+-]/,'').toLowerCase();
  if(!body||![...body].every(ch=>{const code=ch.charCodeAt(0);const d=code>=48&&code<=57?code-48:code>=97&&code<=122?code-87:36;return d<radix;}))throw new Error(`ENTERO: dígitos incompatibles con la base ${radix}.`);
  const result=parseInt(text,radix);
  if(!Number.isSafeInteger(result))throw new Error('ENTERO: valor fuera del rango de enteros seguros de JavaScript.');
  return result;
};
const validDate=(value:any,operation:string):Date=>{
  const date=value instanceof Date?new Date(value.getTime()):new Date(value);
  if(!Number.isFinite(date.getTime()))throw new Error(`${operation}: fecha no válida.`);
  return date;
};
const strictBase64=(value:any):Buffer=>{
  const s=String(value);
  if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2,3})?$/.test(s)||s.length>8_000_000)throw new Error('BASE64_DECODIFICAR: formato Base64 no válido.');
  const decoded=Buffer.from(s,'base64');
  if(decoded.toString('base64').replace(/=+$/,'')!==s.replace(/=+$/,''))throw new Error('BASE64_DECODIFICAR: Base64 no canónico.');
  return decoded;
};
const strictHex=(value:any):Buffer=>{
  const s=String(value);
  if(s.length%2!==0||s.length>8_000_000||!/^(?:[a-fA-F0-9]{2})*$/.test(s))throw new Error('HEX_DECODIFICAR: secuencia hexadecimal no válida.');
  return Buffer.from(s,'hex');
};
const strictDecimal=(value:any):number=>{
  const text=String(value??'').trim();
  if(!/^[+-]?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)$/i.test(text))throw new Error('DECIMAL: representación numérica no válida (se detectaron caracteres adicionales).');
  return strictNumber(text,'DECIMAL');
};
const strictBoolean=(value:any):boolean=>{
  if(typeof value==='string'){
    const v=value.trim().toLowerCase();
    if(['verdadero','true','1','si','sí','on'].includes(v))return true;
    if(['falso','false','0','no','off',''].includes(v))return false;
    throw new Error('BOOLEANO: valor no reconocido; admitidos: VERDADERO/FALSO, sí/no, true/false, 1/0.');
  }
  return Boolean(value);
};
const safeRandomInteger=(left:any,right:any):number=>{
  const a=Number(left),b=Number(right);
  if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a>b||(a!==b&&(b===Number.MAX_SAFE_INTEGER||b-a>=2**48-1)))
    throw new RangeError('ALEATORIO_ENTERO: límites inválidos; se requieren enteros seguros, mínimo <= máximo e intervalo inferior a 2^48.');
  return a===b?a:randomInt(a,b+1);
};

export function createStdlib(options:{discord?:any;client?:any;context?:()=>Record<string,any>|undefined;cooldowns?:CommandCooldowns;invokeCallback?:(fn:unknown,args:unknown[])=>Promise<unknown>}={}):Record<string,any>{
  const invoke = async (fn:unknown, ...args:any[]):Promise<any> => {
    executionGuard(true);
    if(options.invokeCallback) return options.invokeCallback(fn,args);
    if(typeof fn!=='function')throw new TypeError('Colección: se requiere una función como callback.');
    return fn(...args);
  };
  const asyncMap = async (xs:any, fn:any) => {const a=arr(xs),out=[];for(let i=0;i<a.length;i++)out.push(await invoke(fn,a[i],i,a));return out;};
  const asyncFilter = async (xs:any,fn:any) => {const a=arr(xs),out=[];for(let i=0;i<a.length;i++)if(await invoke(fn,a[i],i,a))out.push(a[i]);return out;};
  const asyncReduce = async (xs:any,fn:any,initial:any,hasInitial:boolean) => {
    const a=arr(xs);if(!hasInitial&&!a.length)throw new TypeError('REDUCIR: colección vacía sin valor inicial.');
    let acc=hasInitial?initial:a[0];for(let i=hasInitial?0:1;i<a.length;i++)acc=await invoke(fn,acc,a[i],i,a);return acc;
  };
  const asyncFind = async (xs:any,fn:any,mode:'value'|'index'|'some'|'every'|'count')=>{
    const a=arr(xs);let count=0;
    for(let i=0;i<a.length;i++){
      const matched=!!(await invoke(fn,a[i],i,a));
      if(matched){count++;if(mode==='value')return a[i];if(mode==='index')return i;if(mode==='some')return true;}
      else if(mode==='every')return false;
    }
    if(mode==='index')return -1;if(mode==='some')return false;if(mode==='every')return true;if(mode==='count')return count;return undefined;
  };
  // Merge sort estable, con comparación asincrónica y O(n log n) comparaciones.
  const asyncSort = async (xs:any,fn:any):Promise<any[]>=>{
    const merge=async(a:any[]):Promise<any[]>=>{
      if(a.length<2)return a;
      const middle=Math.floor(a.length/2),l=await merge(a.slice(0,middle)),r=await merge(a.slice(middle));
      const out:any[]=[];let i=0,j=0;
      while(i<l.length&&j<r.length){const comparison=Number(await invoke(fn,l[i],r[j]));if(!Number.isFinite(comparison))throw new TypeError('ORDENAR: el comparador debe devolver un número finito.');out.push(comparison<=0?l[i++]:r[j++]);}
      return out.concat(l.slice(i),r.slice(j));
    };
    return merge([...arr(xs)]);
  };

  const context=()=>options.context?.()??{};
  const args=()=>{const c=context();return Array.isArray(c.partes)?c.partes:Object.values(c.argumentos??{});};
  const positiveIndex=(n:any)=>{const i=Number(n);if(!Number.isSafeInteger(i)||i<1||i>25)throw new UserInputError('ARGUMENTO: posición fuera de rango (1–25).');return i;};
  const f:Record<string,any>={
    // Atajos para comandos. Los índices de argumento comienzan en 1.
    ARGUMENTO:(n:any=1,valorSiFalta?:any)=>args()[positiveIndex(n)-1]??valorSiFalta,
    RESTO_ARGUMENTOS:(desde:any=1)=>args().slice(positiveIndex(desde)-1).join(' '),
    USO_COMANDO:()=>{const info=context().infoComando;if(!info)throw new UserInputError('USO_COMANDO: contexto de comando requerido.');
      return `${info.prefijo}${info.nombre}${(info.opciones??[]).map((o:any)=>o.required?` <${o.name}>`:` [${o.name}]`).join('')}`;
    },
    RESPONDER_ERROR:(mensaje:any)=>{if(!context().infoComando)throw new UserInputError('RESPONDER_ERROR: contexto de comando requerido.');throw new UserInputError(String(mensaje));},
    COOLDOWN_RESTANTE:()=>{const info=context().infoComando;
      if(!info)throw new UserInputError('COOLDOWN_RESTANTE: contexto de comando requerido.');
      return options.cooldowns?.remaining(info.declaracion,context())??0;
    },
    LATENCIA_BOT:()=>{const client=options.client?.();const ping=client?.ws?.ping;if(!Number.isFinite(ping))return undefined;return ping;},
    TIEMPO_ACTIVO:()=>{const client=options.client?.();const uptime=client?.uptime;return typeof uptime==='number'&&Number.isFinite(uptime)?uptime:undefined;},
    // Texto
    longitud:(x:any)=>x?.length??x?.size??Object.keys(x??{}).length,
    mayusculas:(x:any)=>norm(x).toUpperCase(), minusculas:(x:any)=>norm(x).toLowerCase(),
    capitalizar:(x:any)=>norm(x).replace(/\b\p{L}/gu,m=>m.toUpperCase()), titulo:(x:any)=>norm(x).toLowerCase().replace(/\b\p{L}/gu,m=>m.toUpperCase()),
    recortar:(x:any)=>norm(x).trim(), recortarInicio:(x:any)=>norm(x).trimStart(), recortarFin:(x:any)=>norm(x).trimEnd(),
    contiene:(a:any,b:any)=>typeof a==='string'?a.includes(norm(b)):a?.includes?.(b)??a?.has?.(b)??false,
    empiezaCon:(a:any,b:any)=>norm(a).startsWith(norm(b)), terminaCon:(a:any,b:any)=>norm(a).endsWith(norm(b)),
    reemplazar:(a:any,b:any,c:any)=>norm(a).replace(b instanceof RegExp?b:norm(b),norm(c)), reemplazarTodo:(a:any,b:any,c:any)=>norm(a).replaceAll(norm(b),norm(c)),
    dividir:(a:any,b:any)=>norm(a).split(b), unir:(a:any,b='')=>arr(a).join(b),
    subtexto:(a:any,i:any,n?:any)=>n===undefined?norm(a).slice(num(i)):norm(a).slice(num(i),num(i)+num(n)),
    caracter:(a:any,i:any)=>norm(a).at(num(i)), repetirTexto:(a:any,n:any)=>{const t=norm(a),count=num(n);if(!Number.isInteger(count)||count<0||t.length*count>8_000_000)throw new Error('REPETIR_TEXTO: longitud máxima excedida (8 000 000 caracteres).');return t.repeat(count);}, invertirTexto:(a:any)=>[...norm(a)].reverse().join(''),
    indiceDe:(a:any,b:any,desde=0)=>norm(a).indexOf(norm(b),num(desde)), ultimoIndiceDe:(a:any,b:any)=>norm(a).lastIndexOf(norm(b)),
    rellenoInicio:pad, rellenoFin:(x:any,n=2,c='0')=>String(x).padEnd(padSize(n),String(c)),
    ascii:(x:any)=>norm(x).codePointAt(0), caracterUnicode:(n:any)=>String.fromCodePoint(num(n)), normalizarUnicode:(x:any,form='NFC')=>norm(x).normalize(form as any),

    // Matemática
    abs:Math.abs,min:Math.min,max:Math.max,redondear:Math.round,piso:Math.floor,techo:Math.ceil,truncar:Math.trunc,signo:Math.sign,sqrt:Math.sqrt,cbrt:Math.cbrt,potencia:Math.pow,
    exp:Math.exp,ln:Math.log,log:Math.log,log10:Math.log10,log2:Math.log2,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,hipot:Math.hypot,
    grados:(r:any)=>num(r)*180/Math.PI,radianes:(d:any)=>num(d)*Math.PI/180,
    limitar:(x:any,a:any,b:any)=>{const [v,min,max]=[x,a,b].map(y=>strictNumber(y,'LIMITAR'));if(min>max)throw new RangeError('LIMITAR: mínimo mayor que máximo.');return Math.min(max,Math.max(min,v));},interpolar:(a:any,b:any,t:any)=>{const [left,right,ratio]=[a,b,t].map(y=>strictNumber(y,'INTERPOLAR'));return numericResult(left+(right-left)*ratio,'INTERPOLAR');},
    esFinito:Number.isFinite,esNaN:Number.isNaN,esEntero:Number.isInteger,
    suma:(x:any)=>numericResult(finiteList(x,'SUMA').reduce((a,b)=>a+b,0),'SUMA'), producto:(x:any)=>numericResult(finiteList(x,'PRODUCTO').reduce((a,b)=>a*b,1),'PRODUCTO'),
    promedio:(x:any)=>{const a=finiteList(x,'PROMEDIO');return a.length?numericResult(a.reduce((p,v)=>p+v,0)/a.length,'PROMEDIO'):undefined;},
    mediana:(x:any)=>{const a=finiteList(x,'MEDIANA').sort((a,b)=>a-b);const n=a.length;if(!n)return undefined;return numericResult(n%2?a[(n-1)/2]!:(a[n/2-1]!/2+a[n/2]!/2),'MEDIANA');},

    // Aleatoriedad
    aleatorio:(a=0,b=1)=>{const min=strictNumber(a,'ALEATORIO'),max=strictNumber(b,'ALEATORIO');if(min>max)throw new RangeError('ALEATORIO: mínimo mayor que máximo.');return numericResult(min+Math.random()*(max-min),'ALEATORIO');}, enteroAleatorio:safeRandomInteger,
    azar:(limite:any)=>{const n=Number(limite);if(!Number.isSafeInteger(n)||n<=0||n>2_147_483_647)throw new RangeError('AZAR: límite superior fuera de rango (1–2147483647).');return randomInt(n);},
    aleatorioEntero:safeRandomInteger,
    elegir:(x:any)=>{const a=arr(x);return a.length?a[Math.floor(Math.random()*a.length)]:undefined;},
    barajar:(x:any)=>{const a=[...arr(x)];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;},uuid:()=>randomUUID(),

    // Listas / colecciones
    agregar:(a:any,...x:any[])=>{a.push(...x);return a;}, agregarInicio:(a:any,...x:any[])=>{a.unshift(...x);return a;},
    extraerUltimo:(a:any)=>a.pop(),extraerPrimero:(a:any)=>a.shift(), insertar:(a:any,i:any,...xs:any[])=>{a.splice(num(i),0,...xs);return a;}, eliminarIndice:(a:any,i:any,n=1)=>a.splice(num(i),num(n)),
    eliminarValor:(a:any,v:any)=>{const i=a.indexOf(v);if(i>=0)a.splice(i,1);return a;},
    claves:(o:any)=>o instanceof Map?[...o.keys()]:Object.keys(o??{}), valores:(o:any)=>o instanceof Map?[...o.values()]:Object.values(o??{}), entradas:(o:any)=>o instanceof Map?[...o.entries()]:Object.entries(o??{}),
    unicos:(a:any)=>[...new Set(arr(a))], aplanar:(a:any,n=1)=>arr(a).flat(num(n)), invertir:(a:any)=>[...arr(a)].reverse(),
    ordenar:(a:any,fn?:any)=>fn!==undefined&&options.invokeCallback?asyncSort(a,fn):[...arr(a)].sort(fn??cmp), ordenarNumerico:(a:any)=>finiteList(a,'ORDENAR_NUMERICO').sort((x,y)=>x-y),
    cortar:(a:any,inicio:any,fin?:any)=>arr(a).slice(num(inicio),fin===undefined?undefined:num(fin)),
    // Texto si todos los argumentos son cadenas; listas en cualquier otro caso.
    concatenar:(...xs:any[])=>xs.every(x=>typeof x==='string')?xs.join(''):xs.flatMap(arr),
    concatenarTexto:(...xs:any[])=>xs.map(norm).join(''),
    // Índices 0-based, extremo final incluido, como la forma usual de SUBCADENA de PSeInt.
    subcadena:(x:any,inicio:any,fin:any)=>{
      const a=Number(inicio),b=Number(fin),str=norm(x);
      if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<0||b<a)throw new RangeError('SUBCADENA: índices inválidos; se requieren enteros seguros desde 0 (fin inclusivo).');
      return str.slice(a,b+1);
    },
    mapear:(a:any,fn:any)=>options.invokeCallback?asyncMap(a,fn):arr(a).map(fn),
    filtrar:(a:any,fn:any)=>options.invokeCallback?asyncFilter(a,fn):arr(a).filter(fn),
    reducir:(...args:any[])=>{const [a,fn,init]=args;return options.invokeCallback?asyncReduce(a,fn,init,args.length>=3):args.length<3?arr(a).reduce(fn):arr(a).reduce(fn,init);},
    buscar:(a:any,fn:any)=>options.invokeCallback?asyncFind(a,fn,'value'):arr(a).find(fn),
    buscarIndice:(a:any,fn:any)=>options.invokeCallback?asyncFind(a,fn,'index'):arr(a).findIndex(fn),
    alguno:(a:any,fn:any)=>options.invokeCallback?asyncFind(a,fn,'some'):arr(a).some(fn),
    todos:(a:any,fn:any)=>options.invokeCallback?asyncFind(a,fn,'every'):arr(a).every(fn),
    contar:(a:any,fn?:any)=>fn?(options.invokeCallback?asyncFind(a,fn,'count'):arr(a).filter(fn).length):arr(a).length,
    incluir:(a:any,v:any)=>{if(a instanceof Set){a.add(v);return a;}if(a instanceof Map)throw new Error('INCLUIR MAPA: faltan los argumentos clave y/o valor.');a.push(v);return a;},
    conjunto:(x:any=[])=>new Set(arr(x)), mapa:(x:any=[])=>new Map(x), tiene:(x:any,k:any)=>x instanceof Map||x instanceof Set?x.has(k):Object.prototype.hasOwnProperty.call(x??{},k),
    obtener:(x:any,k:any,def?:any)=>x instanceof Map?(x.has(k)?x.get(k):def):(x?.[k]??def),
    poner:(x:any,k:any,v:any)=>{if(x instanceof Map){x.set(k,v);return x;}if(x===null||typeof x!=='object'&&typeof x!=='function')throw new TypeError('PONER: se esperaba mapa u objeto.');x[safeKey(k)]=v;return x;},
    borrar:(x:any,k:any)=>{if(x instanceof Map||x instanceof Set)return x.delete(k);if(x===null||typeof x!=='object'&&typeof x!=='function')throw new TypeError('BORRAR: se esperaba mapa u objeto.');return delete x[safeKey(k)];},
    rango:(a:any,b?:any,paso?:any)=>{const start=b===undefined?0:num(a),end=b===undefined?num(a):num(b),step=paso===undefined?(start<=end?1:-1):num(paso);if(![start,end,step].every(Number.isFinite)||step===0||(start!==end&&(end>start?step<0:step>0)))throw new Error('RANGO: extremos/paso no finitos, paso igual a cero o dirección incompatible.');const out:number[]=[];for(let i=start;step>0?i<end:i>end;){if(out.length>=1_000_000)throw new Error('RANGO: límite excedido (1 000 000 elementos).');out.push(i);const next=i+step;if(next===i)throw new Error('RANGO: paso insuficiente para modificar el valor por precisión de punto flotante.');i=next;}return out;},

    // Conversión / inspección
    texto:(x:any)=>String(x), numero:(x:any)=>strictNumber(x), entero:strictInteger, decimal:strictDecimal, bigint:(x:any)=>BigInt(x), booleano:strictBoolean,
    tipoDe:(x:any)=>Array.isArray(x)?'lista':x===null?'nulo':x instanceof Map?'mapa':x instanceof Set?'conjunto':x instanceof Date?'fecha':typeof x,
    esNulo:(x:any)=>x==null, definido:(x:any)=>x!==undefined, coalescer:(...xs:any[])=>xs.find(x=>x!==null&&x!==undefined),

    // JSON, expresiones regulares y codificación
    ahora:()=>new Date(), fecha:(x?:any)=>{const d=x===undefined?new Date():new Date(x);if(!Number.isFinite(d.getTime()))throw new Error('FECHA: fecha no válida.');return d;}, timestamp:()=>Date.now(),
    iso:(x:any=new Date())=>validDate(x,'ISO').toISOString(), fechaLocal:(x:any=new Date(),locale='es-PY',opts?:any)=>validDate(x,'FECHA_LOCAL').toLocaleString(locale,opts),
    sumarTiempo:(x:any,ms:any)=>validDate(validDate(x,'SUMAR_TIEMPO').getTime()+strictNumber(ms,'SUMAR_TIEMPO'),'SUMAR_TIEMPO'), diferenciaTiempo:(a:any,b:any)=>validDate(a,'DIFERENCIA_TIEMPO').getTime()-validDate(b,'DIFERENCIA_TIEMPO').getTime(),
    segundo:(x:any)=>validDate(x,'SEGUNDO').getSeconds(), minuto:(x:any)=>validDate(x,'MINUTO').getMinutes(), hora:(x:any)=>validDate(x,'HORA').getHours(), dia:(x:any)=>validDate(x,'DIA').getDate(), mes:(x:any)=>validDate(x,'MES').getMonth()+1, anio:(x:any)=>validDate(x,'ANIO').getFullYear(),

    // JSON, regex y codificación
    parsearJSON:(x:any)=>JSON.parse(String(x)), crearJSON:(x:any,espacios=0)=>JSON.stringify(x,null,num(espacios)), clonarJSON:(x:any)=>JSON.parse(JSON.stringify(x)),
    regex:(p:any,f='')=>new RegExp(String(p),String(f)), coincide:(p:any,s:any)=>(p instanceof RegExp?p:new RegExp(String(p))).test(String(s)), coincidencias:(p:any,s:any)=>[...String(s).matchAll(p instanceof RegExp?p:new RegExp(String(p),'g'))],
    regexSegura:(p:any,f='')=>checkedRegex(p,String(f)), coincideSeguro:(p:any,s:any)=>safeMatch(p,s), coincidenciasSeguras:(p:any,s:any)=>safeMatches(p,s),
    base64Codificar:(x:any)=>Buffer.from(String(x)).toString('base64'),base64Decodificar:(x:any)=>strictBase64(x).toString(),
    hexCodificar:(x:any)=>Buffer.from(String(x)).toString('hex'),hexDecodificar:(x:any)=>strictHex(x).toString(),
    urlCodificar:(x:any)=>encodeURIComponent(String(x)),urlDecodificar:(x:any)=>decodeURIComponent(String(x)),
    hash:(alg:any,x:any)=>createHash(String(alg)).update(String(x)).digest('hex'), hmac:(alg:any,key:any,x:any)=>createHmac(String(alg),String(key)).update(String(x)).digest('hex'),

    // Utilidades
    imprimir:(...x:any[])=>console.log(...x), depurar:(...x:any[])=>console.debug(...x), advertir:(...x:any[])=>console.warn(...x), error:(...x:any[])=>console.error(...x),
    dormir:(ms:any)=>sleepCancelable(num(ms)),
  };

  Object.assign(f,createDiscordHelpers(options.discord,typeof options.client==='function'?options.client:()=>options.client,options.context));
  Object.assign(f,createExpandedApi(typeof options.client==='function'?options.client:()=>options.client, options.context));
  Object.assign(f,createBotToolkit(options.context));
  Object.assign(f,createHttpHelpers());
  Object.assign(f,createDiscordExtras(typeof options.client==='function'?options.client:()=>options.client, options.context));

  const aliases:Record<string,string>={
    ALEATORIO:'aleatorio',ENTERO_ALEATORIO:'enteroAleatorio',LONGITUD:'longitud',MAYUSCULAS:'mayusculas',MINUSCULAS:'minusculas',CAPITALIZAR:'capitalizar',
    ELEGIR:'elegir',BARAJAR:'barajar',UUID:'uuid',AHORA:'ahora',FECHA:'fecha',TIMESTAMP:'timestamp',TEXTO:'texto',NUMERO:'numero',ENTERO:'entero',DECIMAL:'decimal',BOOLEANO:'booleano',
    TIPO_DE:'tipoDe',PARSEAR_JSON:'parsearJSON',CREAR_JSON:'crearJSON',RANGO:'rango',SUMA:'suma',PROMEDIO:'promedio',MEDIANA:'mediana',ORDENAR:'ordenar',UNIR:'unir',DIVIDIR:'dividir',
    AGREGAR:'agregar',ELIMINAR_VALOR:'eliminarValor',CLAVES:'claves',VALORES:'valores',ENTRADAS:'entradas',CONJUNTO:'conjunto',MAPA:'mapa',TIENE:'tiene',OBTENER:'obtener',PONER:'poner',BORRAR:'borrar',
    HASH:'hash',HMAC:'hmac',DORMIR:'dormir',ISO:'iso',FECHA_LOCAL:'fechaLocal'
  };
  Object.assign(aliases,{
    RC:'sqrt',RAIZ:'sqrt',SEN:'sin',ASEN:'asin',TRUNC:'truncar',REDON:'redondear',AZAR:'azar',
    ALEATORIO_ENTERO:'aleatorioEntero',CONVERTIRANUMERO:'numero',CONVERTIRATEXTO:'texto',
    SUBCADENA:'subcadena',CONCATENAR_TEXTO:'concatenarTexto',CONCATENAR_CADENA:'concatenarTexto',
    LOG_DECIMAL:'log10'
  });
  for(const [a,b] of Object.entries(aliases))f[a]=f[b];
  return f;
}
