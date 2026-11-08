/** Construcción de payloads Discord sin invocar operaciones del cliente. */
import { randomUUID } from 'node:crypto';

const str=(value:any,name:string,max:number)=>{const s=String(value??'').trim();if(!s||s.length>max)throw new Error(`Argumento '${name}': texto vacío o longitud superior a ${max} caracteres.`);return s;};
const int=(value:any,name:string,min:number,max:number)=>{const n=Number(value);if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(`Argumento '${name}': entero fuera de rango (${min}–${max}).`);return n;};
const array=(value:any,max:number)=>{if(!Array.isArray(value)||value.length>max)throw new Error(`Colección no válida: se esperaba arreglo con hasta ${max} elementos.`);return value;};
const menuOptions=(value:any):any[]=>{
  const options=array(value,25);
  if(options.length===0)throw new Error('MENÚ: se requiere al menos una opción.');
  const seen=new Set<string>();
  for(const option of options){
    if(!option||typeof option!=='object')throw new Error('MENÚ: opción inválida; se requiere objeto.');
    for(const key of ['label','value'] as const){
      if(typeof option[key]!=='string'||!option[key].length||option[key].length>100)throw new Error(`MENÚ: '${key}' fuera de rango (1–100 caracteres).`);
    }
    if(option.description!==undefined&&(typeof option.description!=='string'||option.description.length>100))throw new Error('MENÚ: descripción superior a 100 caracteres.');
    if(seen.has(option.value))throw new Error('MENÚ: valores de opción duplicados.');
    seen.add(option.value);
  }
  return options;
};
const snowflake=(x:any)=>{const raw=String(x?.id??x??'');const found=raw.match(/^<@!?([0-9]{15,22})>$/)?.[1]??raw.match(/^<#([0-9]{15,22})>$/)?.[1]??raw.match(/^<@&([0-9]{15,22})>$/)?.[1]??raw;if(!/^\d{15,22}$/.test(found))throw new Error('Identificador Discord no válido: se esperaba Snowflake o mención.');return found;};
const color=(x:any)=>{const n=typeof x==='number'?x:/^#?[0-9a-f]{6}$/i.test(String(x))?Number.parseInt(String(x).replace('#',''),16):NaN;
  if(!Number.isSafeInteger(n)||n<0||n>0xffffff)throw new Error('Color RGB no válido: esperado valor hexadecimal de 24 bits.');return n;};
const snowEpoch=1420070400000n;
const snowDate=(v:any)=>new Date(Number((BigInt(snowflake(v))>>22n)+snowEpoch));
const durationMillis=(value:any):number=>{
  const text=String(value??'');
  const match=text.match(/^(\d{1,20})(ms|s|m|h|d)$/i);
  if(!match)throw new Error('DURACION_MS: formato no válido; usa 500ms, 10s, 2m, 3h o 1d.');
  const factors:Record<string,bigint>={ms:1n,s:1000n,m:60000n,h:3600000n,d:86400000n};
  const ms=BigInt(match[1]!)*factors[match[2]!.toLowerCase()]!;
  if(ms>31_536_000_000n)throw new Error('DURACION_MS: límite máximo excedido (365 días).');
  return Number(ms);
};
const messagePayload=(v:any)=>typeof v==='string'?{content:v}:v;
const safePayload=(v:any)=>{const x=messagePayload(v);if(!x||typeof x!=='object'||Array.isArray(x))throw new Error('Mensaje: estructura no válida; esperado texto u objeto de mensaje.');return {...x,allowedMentions:{parse:[],repliedUser:false}};};
export function createBotToolkit(contextGetter:()=>any=()=>undefined):Record<string,(...args:any[])=>any>{
  const state=new Map<string,{hits:number[];lastAccess:number}>();
  let lastCleanup=0;
  const cleanup=(now:number)=>{if(now-lastCleanup<60000)return;lastCleanup=now;for(const [k,v] of state)if(now-v.lastAccess>120000)state.delete(k);};
  const ctx=()=>contextGetter()??{};
  const contextMessage=()=>ctx().mensaje;
  const contextMember=()=>ctx().miembro??ctx().autor??ctx().usuario;
  return {
    // Botones, menús, embeds y payloads — modelos crudos compatibles con la API Discord.
    BOTON_SIMPLE:(etiqueta:any,id:any,estilo:any=1)=>{
      const style=int(estilo,'estilo del botón',1,4);return {type:2,style,label:str(etiqueta,'etiqueta',80),custom_id:str(id,'id',100)};
    },
    BOTON_ENLACE:(etiqueta:any,url:any)=>{
      const u=new URL(str(url,'URL',2048));if(u.protocol!=='https:')throw new Error('BOTON_ENLACE: esquema URL no admitido (HTTPS requerido).');
      return {type:2,style:5,label:str(etiqueta,'etiqueta',80),url:u.toString()};
    },
    BOTON_DESHABILITADO:(boton:any)=>{
      if(boton?.type!==2)throw new Error('BOTON_DESHABILITADO: componente incompatible; esperado botón.');return {...boton,disabled:true};
    },
    FILA_BOTONES:(botones:any)=>{
      const a=array(botones,5);if(!a.length||a.some((b:any)=>b?.type!==2))throw new Error('FILA_BOTONES: cantidad o tipo de componente no válido (1–5 botones).');return {type:1,components:a};
    },
    OPCION_MENU:(etiqueta:any,valor:any,descripcion:any='')=>{
      const label=str(etiqueta,'etiqueta',100),value=str(valor,'valor',100),description=String(descripcion??'');
      if(description.length>100)throw new Error('OPCION_MENU: descripción superior al límite de 100 caracteres.');return {label,value,...description?{description}:{}};
    },
    MENU_SIMPLE:(id:any,opciones:any,ayuda:any='Selecciona una opción')=>{
      const opts=menuOptions(opciones);
      return {type:1,components:[{type:3,custom_id:str(id,'id',100),options:opts,placeholder:str(ayuda,'ayuda',150),min_values:1,max_values:1}]};
    },
    MENU_MULTIPLE:(id:any,opciones:any,maximo:any=2)=>{
      const opts=menuOptions(opciones),count=int(maximo,'máximo',1,25);if(count>opts.length)throw new Error('MENU_MULTIPLE: máximo de selección superior a las opciones disponibles.');
      return {type:1,components:[{type:3,custom_id:str(id,'id',100),options:opts,min_values:1,max_values:count}]};
    },
    MENSAJE_CON_BOTONES:(contenido:any,botones:any)=>{const bs=array(botones,5);if(!bs.length||bs.some(x=>x?.type!==2))throw new Error('MENSAJE_CON_BOTONES: cantidad o tipo no válido (1–5 botones).');return {content:str(contenido,'mensaje',2000),components:[{type:1,components:bs}],allowedMentions:{parse:[]}};},
    EMBED_CAMPOS:(titulo:any,descripcion:any,campos:any,colorHex:any='#5865F2')=>{
      const fields=array(campos,25).map((x:any)=>({name:str(x?.nombre??x?.name,'nombre del campo',256),value:str(x?.valor??x?.value,'valor del campo',1024),inline:x?.linea===true}));
      if(fields.reduce((a,x)=>a+x.name.length+x.value.length,0)+String(titulo).length+String(descripcion).length>6000)throw new Error('EMBED_CAMPOS: límite total excedido (6000 caracteres).');
      if(String(descripcion??'').length>4096)throw new Error('EMBED_CAMPOS: descripción superior a 4096 caracteres.');
      return {embeds:[{title:str(titulo,'título',256),description:String(descripcion??''),fields,color:color(colorHex)}]};
    },
    EMBED_AUTOR:(nombre:any,url:any,avatar?:any)=>{
      const output:any={name:str(nombre,'autor',256)};if(url!==undefined){const u=new URL(str(url,'URL',2048));if(u.protocol!=='https:')throw new Error('EMBED_AUTOR: esquema URL no admitido (HTTPS requerido).');output.url=u.toString();}
      if(avatar!==undefined){const u=new URL(str(avatar,'avatar',2048));if(u.protocol!=='https:')throw new Error('EMBED_AUTOR: URL de avatar no admitida (HTTPS requerido).');output.icon_url=u.toString();}return output;
    },
    EMBED_PIE:(texto:any,icono?:any)=>{
      const result:any={text:str(texto,'pie',2048)};if(icono){const u=new URL(str(icono,'icono',2048));if(u.protocol!=='https:')throw new Error('EMBED_PIE: URL de icono no admitida (HTTPS requerido).');result.icon_url=u.toString();}return result;
    },
    RESPUESTA_SEGURA:(contenido:any)=>safePayload(contenido),
    RESPUESTA_EFIMERA:(contenido:any)=>({...safePayload(contenido),flags:64}),
    RESPUESTA_CON_EMBED:(contenido:any,embed:any)=>{const embeds=Array.isArray(embed)?embed:Array.isArray(embed?.embeds)?embed.embeds:[embed];if(!embeds.length||embeds.length>10||embeds.some((x:any)=>!x||typeof x!=='object'||Array.isArray(x)))throw new Error('RESPUESTA_CON_EMBED: embeds no válidos (1–10 objetos).');return {...safePayload(contenido),embeds};},
    COLORES_DISCORD:()=>({azul:0x5865F2,verde:0x57F287,rojo:0xED4245,amarillo:0xFEE75C,gris:0x99AAB5}),
    ID_COMPONENTE_UNICO:(prefijo:any='pd')=>`${str(prefijo,'prefijo',55)}_${randomUUID()}`,
    // Lectura de objetos y IDs sin llamadas a API ni dependencias ocultas.
    ID_MENSAJE:(m:any=contextMessage())=>snowflake(m),
    ID_CANAL_ACTUAL:()=>snowflake(ctx().canal),
    ID_USUARIO_ACTUAL:()=>snowflake(contextMember()),
    ID_SERVIDOR_ACTUAL:()=>snowflake(ctx().servidor??ctx().guild),
    ES_MENSAJE_BOT:(m:any=contextMessage())=>m?.author?.bot===true,
    ES_RESPUESTA:(m:any=contextMessage())=>Boolean(m?.reference?.messageId),
    TIENE_ADJUNTOS:(m:any=contextMessage())=>Number(m?.attachments?.size??m?.attachments?.length??0)>0,
    CUENTA_ADJUNTOS:(m:any=contextMessage())=>Number(m?.attachments?.size??m?.attachments?.length??0),
    CUENTA_EMBEDS:(m:any=contextMessage())=>Array.isArray(m?.embeds)?m.embeds.length:0,
    CUENTA_REACCIONES:(m:any=contextMessage())=>m?.reactions?.cache?.size??0,
    ID_USUARIO_MENSAJE:(m:any=contextMessage())=>snowflake(m?.author),
    TEXTO_MENSAJE:(m:any=contextMessage())=>String(m?.content??''),
    MENSAJE_FIJADO:(m:any=contextMessage())=>m?.pinned===true,
    MENSAJE_EDITADO:(m:any=contextMessage())=>Boolean(m?.editedTimestamp),
    MENSAJE_FECHA:(m:any=contextMessage())=>m?.createdAt??snowDate(m),
    LIMITE_MENSAJE:(contenido:any)=>String(contenido??'').length<=2000,
    DIVIDIR_MENSAJE:(contenido:any,longitud:any=1900)=>{
      const s=String(contenido??''),n=int(longitud,'longitud',1,2000),arr:string[]=[];
      for(let i=0;i<s.length;i+=n){arr.push(s.slice(i,i+n));if(arr.length>100)throw new Error('DIVIDIR_MENSAJE: cantidad máxima de fragmentos excedida (100).');}return arr;
    },
    LIMPIAR_NOMBRE_CANAL:(name:any)=>{
      const result=String(name??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,100);
      if(!result)throw new Error('LIMPIAR_NOMBRE_CANAL: el resultado no contiene caracteres permitidos.');return result;
    },
    ES_ENLACE_DISCORD:(v:any)=>{
      try{const u=new URL(String(v));return u.protocol==='https:'&&['discord.com','discord.gg','www.discord.com'].includes(u.hostname);}catch{return false;}
    },
    EXTRAER_ID_MENCION:(v:any)=>snowflake(v),
    // Validación de comandos: no realizan operaciones sobre servidor.
    VALIDAR_MOTIVO:(motivo:any,minimo:any=3,maximo:any=200)=>{
      const s=String(motivo??'').trim(),min=int(minimo,'mínimo',0,2000),max=int(maximo,'máximo',min,2000);return s.length>=min&&s.length<=max;
    },
    VALIDAR_CANTIDAD:(cantidad:any,minimo:any=1,maximo:any=100)=>{
      const n=Number(cantidad),min=int(minimo,'mínimo',-1000000,1000000),max=int(maximo,'máximo',min,1000000);return Number.isSafeInteger(n)&&String(cantidad??'').trim()!==''&&n>=min&&n<=max;
    },
    VALIDAR_DURACION:(valor:any)=>{try{durationMillis(valor);return true;}catch{return false;}},
    DURACION_MS:durationMillis,
    TIEMPO_TIMEOUT_VALIDO:(v:any)=>{const n=Number(v);return Number.isSafeInteger(n)&&n>0&&n<=2419200000;},
    MAXIMO_TIMEOUT:()=>2419200000,
    LIMITE_EMBED:(valor:any)=>{
      const e=valor?.embeds?.[0]??valor;if(!e||typeof e!=='object')return false;
      const fields=Array.isArray(e.fields)?e.fields:[];
      if(fields.length>25||String(e.title??'').length>256||String(e.description??'').length>4096||String(e.footer?.text??'').length>2048||String(e.author?.name??'').length>256||fields.some((x:any)=>!x||typeof x.name!=='string'||typeof x.value!=='string'||!x.name.length||!x.value.length||x.name.length>256||x.value.length>1024))return false;
      return [e.title,e.description,e.footer?.text,e.author?.name,...fields.flatMap((x:any)=>[x.name,x.value])].reduce((n:any,x:any)=>n+String(x??'').length,0)<=6000;
    },
    // Antiabuso temporal, explícitamente local a proceso.
    REGISTRAR_FRECUENCIA:(clave:any,ventana:any=10000)=>{
      const key=str(clave,'clave',200),ms=int(ventana,'ventana',1,120000),now=Date.now();cleanup(now);
      if(!state.has(key)&&state.size>=10000)throw new Error('REGISTRAR_FRECUENCIA: capacidad de claves excedida (10000).');
      const prior=state.get(key)?.hits??[],hits=prior.filter(t=>t>now-ms);hits.push(now);state.set(key,{hits,lastAccess:now});return hits.length;
    },
    CONSULTAR_FRECUENCIA:(clave:any,ventana:any=10000)=>{
      const key=str(clave,'clave',200),ms=int(ventana,'ventana',1,120000),now=Date.now();cleanup(now);
      return (state.get(key)?.hits??[]).filter(t=>t>now-ms).length;
    },
    REINICIAR_FRECUENCIA:(clave:any)=>state.delete(str(clave,'clave',200)),
    // Estadística simple y segura.
    EXTRAER_DOMINIO:(valor:any)=>{const u=new URL(str(valor,'URL',2048));return u.hostname.toLowerCase();},
    URL_DISCORD_MENSAJE:(servidor:any,canal:any,mensaje:any)=>`https://discord.com/channels/${servidor==='@me'?'@me':snowflake(servidor)}/${snowflake(canal)}/${snowflake(mensaje)}`,
    TAMAÑO_TEXTO_UTF8:(valor:any)=>Buffer.byteLength(String(valor??''),'utf8'),
    NUMERO_A_ROMANO:(n:any)=>{
      let x=int(n,'número',1,3999),result='';const pairs:[number,string][]=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
      for(const [v,s] of pairs)while(x>=v){result+=s;x-=v;}return result;
    },
    ENMASCARAR_ID:(v:any)=>{const i=snowflake(v);return '*'.repeat(Math.max(0,i.length-4))+i.slice(-4);},
  };
}
