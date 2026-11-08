import { UserInputError } from '../user-input.js';

/** Validación común de opciones para comandos de barra y prefijo. */
export function verifyCommandArgument(option:any,value:any):void{
    const name=String(option.name),err=option.errors??{};
    if(value===undefined||value===null||value===''){
      if(option.required)throw new UserInputError(err.faltante??`Argumento '${name}': valor requerido ausente.`);
      return;
    }
    if(option.kind==='texto'){
      if(typeof value!=='string')throw new UserInputError(err.invalido??`Argumento '${name}': tipo incompatible (esperado texto).`);
      if(option.minLength!==undefined&&value.length<option.minLength)throw new UserInputError(err.minimo??`Argumento '${name}': longitud inferior al mínimo ${option.minLength}.`);
      if(option.maxLength!==undefined&&value.length>option.maxLength)throw new UserInputError(err.maximo??`Argumento '${name}': longitud superior al máximo ${option.maxLength}.`);
    }else if(option.kind==='numero'||option.kind==='entero'){
      if(typeof value!=='number'||!Number.isFinite(value)||(option.kind==='entero'&&!Number.isSafeInteger(value)))throw new UserInputError(err.invalido??`Argumento '${name}': tipo incompatible (esperado ${option.kind==='entero'?'entero seguro':'número finito'}).`);
      if(option.minValue!==undefined&&value<option.minValue)throw new UserInputError(err.minimo??`Argumento '${name}': valor inferior al mínimo ${option.minValue}.`);
      if(option.maxValue!==undefined&&value>option.maxValue)throw new UserInputError(err.maximo??`Argumento '${name}': valor superior al máximo ${option.maxValue}.`);
    }else if(option.kind==='booleano'&&typeof value!=='boolean')throw new UserInputError(err.invalido??`Argumento '${name}': tipo incompatible (esperado booleano).`);
    if(option.choices?.length&&!option.choices.some((x:any)=>x.value===value))throw new UserInputError(err.eleccion??`Argumento '${name}': valor fuera del conjunto de elecciones declaradas.`);
  }

/** Conversión y tokenización de argumentos para comandos de mensaje. */
export async function convertMessageArgument(raw:string|undefined,kind:string,message:any,index:number):Promise<any>{if(raw===undefined){if(kind==='adjunto')return [...(message.attachments?.values?.()??[])][index];return undefined;}if(kind==='texto')return raw;if(kind==='entero'){if(!/^[+-]?\d+$/.test(raw)||!Number.isSafeInteger(Number(raw)))throw new UserInputError(`Argumento ${index+1}: esperado entero seguro.`);return Number(raw);}
    if(kind==='numero'){const n=Number(raw);if(!raw.trim()||!Number.isFinite(n))throw new UserInputError(`Argumento ${index+1}: esperado número finito.`);return n;}
    if(kind==='booleano'){const s=raw.toLowerCase();if(['1','true','si','sí','verdadero','on'].includes(s))return true;if(['0','false','no','falso','off'].includes(s))return false;throw new UserInputError(`Argumento ${index+1}: esperado booleano (VERDADERO/FALSO).`);}const id=/^\d{15,22}$/.test(raw)?raw:(raw.match(/^<@!?([0-9]{15,22})>$/)?.[1]??raw.match(/^<@&([0-9]{15,22})>$/)?.[1]??raw.match(/^<#([0-9]{15,22})>$/)?.[1]??'');
    if(['usuario','canal','rol','mencionable'].includes(kind)&&!id)throw new UserInputError(`Argumento ${index+1}: se esperaba mención o identificador Snowflake de Discord.`);
    if(kind==='usuario')return message.mentions?.members?.get(id)??message.mentions?.users?.get(id)??message.guild?.members?.cache?.get(id)??await message.guild?.members?.fetch?.(id).catch(()=>undefined);if(kind==='canal')return message.mentions?.channels?.get(id)??message.guild?.channels?.cache?.get(id);if(kind==='rol')return message.mentions?.roles?.get(id)??message.guild?.roles?.cache?.get(id);if(kind==='mencionable')return message.mentions?.members?.get(id)??message.mentions?.roles?.get(id)??message.mentions?.users?.get(id);if(kind==='adjunto')return [...(message.attachments?.values?.()??[])][index];return raw;}
export function splitMessageArguments(s:string):string[]{const out:string[]=[];const re=/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^\s]+)/g;let m;while((m=re.exec(s)))out.push((m[1]??m[2]??m[3]).replace(/\\([\\"'])/g,'$1'));return out;}
export function matchesCustomId(pattern:string|undefined,id:string):boolean{if(!pattern)return true;if(pattern.endsWith('*'))return id.startsWith(pattern.slice(0,-1));return pattern===id;}
