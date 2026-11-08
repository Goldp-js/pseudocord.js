/** API de funciones extendidas. IMPORTAR_JS y JAVASCRIPT habilitan ejecución JavaScript. Las consultas remotas propagan errores HTTP y de permisos. */
import { memoryUsage, cpuUsage, uptime, versions, platform, arch } from 'node:process';
import { randomInt, randomUUID } from 'node:crypto';

const SNOW=/^\d{15,22}$/;
const id=(v:any):string=>{
  const raw=String(v?.id??v?.user?.id??v?.author?.id??v??'');
  const match=raw.match(/^<@!?([0-9]{15,22})>$/)||raw.match(/^<@&([0-9]{15,22})>$/)||raw.match(/^<#([0-9]{15,22})>$/);
  const normalized=match?.[1]??raw;
  if(!SNOW.test(normalized))throw new Error('Identificador Discord no válido (Snowflake requerido).');
  return normalized;
};
const list=(v:any):any[]=>Array.isArray(v)?v:Array.isArray(v?.values)?v.values:typeof v?.values==='function'?[...v.values()]:[];
const bounded=(v:any,name:string,max=100,min=1)=>{
  const n=Number(v);if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(`Argumento '${name}': entero fuera de rango (${min}–${max}).`);return n;
};
const text=(v:any,name:string,max=2000)=>{const s=String(v??'').trim();if(!s||s.length>max)throw new Error(`Argumento '${name}': se esperaba texto no vacío, longitud máxima ${max}.`);return s;};
const own=(obj:any,key:string)=>obj!==null&&typeof obj==='object'&&Object.prototype.hasOwnProperty.call(obj,key);
const who=(ctx:any)=>ctx.miembro??ctx.autor??ctx.usuario;
const validateCollection=(x:any)=>list(x?.cache??x);
const parseDate=(x:any)=>{const d=x instanceof Date?x:new Date(x);if(!Number.isFinite(d.getTime()))throw new Error('Fecha: valor no válido o no interpretable.');return d;};
const safeField=(v:any)=>String(v??'').replace(/[\u0000-\u001f]/g,'').slice(0,300);
const parseSize=(v:any,max:number)=>bounded(v,'cantidad',max);

export function createExpandedApi(clientGetter:()=>any=()=>undefined, contextGetter:()=>any=()=>undefined):Record<string,(...args:any[])=>any>{
  const ctx=()=>contextGetter()??{};
  const client=()=>{const c=clientGetter();if(!c)throw new Error('API Discord: cliente no conectado.');return c;};
  const guild=()=>ctx().servidor??ctx().guild;
  const ch=()=>ctx().canal;
  const msg=()=>ctx().mensaje;
  const interaction=()=>ctx().interaccion;
  const actor=()=>who(ctx());
  const needGuild=()=>{const g=guild();if(!g?.id)throw new Error('API Discord: contexto de servidor requerido.');return g;};
  const channel=()=>{const c=ch();if(!c?.id)throw new Error('API Discord: contexto de canal requerido.');return c;};
  const getMember=async(input:any=actor())=>{
    const g=needGuild(),key=id(input);
    if(input?.guild?.id===g.id&&input.roles)return input;
    return g.members?.cache?.get?.(key)??await g.members?.fetch?.(key);
  };
  const permissions=(member:any,permission:string)=>{
    const p=member?.permissions;
    const names:{[key:string]:string}={GESTIONAR_MENSAJES:'ManageMessages',GESTIONAR_CANALES:'ManageChannels',GESTIONAR_ROLES:'ManageRoles',MODERAR_MIEMBROS:'ModerateMembers',BANEAR_MIEMBROS:'BanMembers',EXPULSAR_MIEMBROS:'KickMembers',VER_REGISTRO_AUDITORIA:'ViewAuditLog'};
    const n=names[permission]??permission;
    return p?.has?.(n)===true||p?.has?.('Administrator')===true;
  };
  const verifyBot=async(permission:string,g:any=needGuild())=>{
    const botId=id(client().user);const me=g.members?.me??g.members?.cache?.get?.(botId)??await g.members?.fetch?.(botId);
    if(!me||!permissions(me,permission))throw new Error(`Permisos del bot insuficientes: falta '${permission}'.`);
  };
  const verifyActor=async(permission:string)=>{
    const g=needGuild();const m=await getMember();if(!m||(!permissions(m,permission)&&id(m)!==String(g.ownerId)))throw new Error(`Permisos del ejecutor insuficientes: falta '${permission}'.`);
  };
  const getMsg=async(v:any=msg(),c:any=ch())=>{
    if(v?.id&&(v?.channelId||v?.channel))return v;
    if(!c?.messages?.fetch)throw new Error('API Discord: canal sin interfaz de historial de mensajes.');
    return c.messages.fetch(id(v));
  };
  const getEvent=async(v:any)=>{const g=needGuild();return v?.guild?.id===g.id?v:await g.scheduledEvents?.fetch?.(id(v));};
  const toArraySafe=(a:any,max=1000):any[]=>{const v=list(a);if(v.length>max)throw new Error(`Colección: límite de ${max} elementos excedido.`);return v;};
  const f:Record<string,(...args:any[])=>any>={
    // Datos y comandos — consultas contextuales; no se inventan métricas históricas.
    COMANDO_ACTUAL:()=>{const c=ctx().infoComando;return c?{nombre:c.nombre,tipo:c.tipo??'mensaje',prefijo:c.prefijo,opciones:c.opciones??[],permisos:c.permisos??[]}:undefined;},
    COMANDOS_REGISTRADOS:()=>{const c=client();const cache=c.application?.commands?.cache;return list(cache).slice(0,200).map(x=>({id:x.id,nombre:x.name,descripcion:x.description??''}));},
    EXISTE_COMANDO:(nombre:any)=>{const target=text(nombre,'nombre de comando',100);return list(client().application?.commands?.cache).some(x=>x.name===target);},
    PERMISOS_COMANDO:(c:any=ctx().infoComando)=>c?.permisos??[],
    USO_COMANDO_DE:(c:any=ctx().infoComando)=>{
      if(!c?.nombre)throw new Error('USO_COMANDO_DE: metadatos de comando ausentes en el contexto.');
      return `${c.prefijo??'/'}${c.nombre}${(c.opciones??[]).map((o:any)=>o.required?` <${o.name}>`:` [${o.name}]`).join('')}`;
    },
    PARAMETRO_VALIDO:(valor:any,tipo:any)=>{
      const t=String(tipo).toLowerCase();
      if(t==='texto')return typeof valor==='string';
      if(t==='entero')return Number.isSafeInteger(Number(valor))&&String(valor??'').trim()!=='';
      if(t==='numero'||t==='decimal')return Number.isFinite(Number(valor))&&String(valor??'').trim()!=='';
      if(t==='booleano')return typeof valor==='boolean'||/^(true|false|verdadero|falso|si|sí|no|0|1)$/i.test(String(valor));
      if(t==='usuario'||t==='canal'||t==='rol'){try{id(valor);return true;}catch{return false;}}
      throw new Error('PARAMETRO_VALIDO: tipo de argumento no reconocido.');
    },
    SUGERIR_ARGUMENTOS:(valores:any,busqueda:any='',cantidad:any=25)=>{
      const q=String(busqueda).toLocaleLowerCase('es'),max=bounded(cantidad,'cantidad',25);
      return toArraySafe(valores,500).filter(x=>String(x?.name??x?.nombre??x).toLocaleLowerCase('es').includes(q))
        .slice(0,max).map(x=>({name:safeField(x?.name??x?.nombre??x).slice(0,100),value:x?.value??String(x?.name??x)}));
    },
    // Evitar el envío duplicado de ACK a Discord.
    RESPUESTA_ORIGINAL:async(i:any=interaction())=>{
      if(!i?.fetchReply)throw new Error('RESPUESTA_ORIGINAL: interacción sin respuesta accesible.');return i.fetchReply();
    },
    ACTUALIZAR_COMPONENTE:async(contenido:any,i:any=interaction())=>{
      if(!i)throw new Error('Interacción: contexto no disponible.');
      const payload=typeof contenido==='string'?{content:contenido,allowedMentions:{parse:[]}}:contenido;
      if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new Error('Interacción: contenido no válido (esperado texto u objeto de mensaje).');
      const safe={...payload,allowedMentions:{parse:[],repliedUser:false}};
      if(i.deferred||i.replied){if(!i.editReply)throw new Error('Interacción: edición de respuesta no disponible.');return i.editReply(safe);}
      if(typeof i.update!=='function')throw new Error('Interacción: método update() no disponible para este tipo.');return i.update(safe);
    },
    DESHABILITAR_COMPONENTES:async(m:any=msg())=>{
      const message=await getMsg(m);
      if(!Array.isArray(message.components)||!message.edit)throw new Error('DESHABILITAR_COMPONENTES: mensaje sin componentes editables.');
      if(message.author?.id!==client().user?.id)throw new Error('DESHABILITAR_COMPONENTES: mensaje no emitido por el bot actual.');
      const components=message.components.map((r:any)=>({type:r.type,components:list(r.components).map((c:any)=>({...c.toJSON?.()??c,disabled:true}))}));
      return message.edit({components,allowedMentions:{parse:[]}});
    },
    FORMULARIO_SIMPLE:(titulo:any,campos:any,identificador:any=randomUUID())=>{
      const name=text(titulo,'título',45),customId=text(identificador,'identificador',100),arr=toArraySafe(campos,5);
      if(!arr.length)throw new Error('FORMULARIO_SIMPLE: lista de campos vacía.');
      const ids=new Set<string>();
      return {custom_id:customId,title:name,components:arr.map((field:any,i:number)=>{
        const name=text(field?.id??`campo_${i+1}`,'id de campo',100);if(ids.has(name))throw new Error('FORMULARIO_SIMPLE: identificador de campo duplicado.');ids.add(name);
        return {type:1,components:[{type:4,custom_id:name,label:text(field?.etiqueta??name,'etiqueta',45),style:field?.largo?2:1,
          required:field?.requerido!==false,min_length:field?.minimo,max_length:field?.maximo,placeholder:field?.ayuda}]};
      })};
    },
    VALIDAR_MODAL:(i:any=interaction(),reglas:any=[])=>{
      if(!i?.fields?.getTextInputValue)throw new Error('VALIDAR_MODAL: contexto sin campos de formulario.');
      const rules=toArraySafe(reglas,5),errors:any[]=[];
      for(const rule of rules){const name=text(rule?.id,'campo',100);let value='';try{value=String(i.fields.getTextInputValue(name)??'');}catch{errors.push({campo:name,error:'faltante'});continue;}
        if(rule.requerido!==false&&!value.trim())errors.push({campo:name,error:'faltante'});
        else if(rule.minimo!==undefined&&value.length<bounded(rule.minimo,'mínimo',4000,0))errors.push({campo:name,error:'minimo'});
        else if(rule.maximo!==undefined&&value.length>bounded(rule.maximo,'máximo',4000,0))errors.push({campo:name,error:'maximo'});
      }return {valido:errors.length===0,errores:errors};
    },
    CREAR_CONFIRMACION:(pregunta:any,si='Confirmar',no='Cancelar')=>({content:text(pregunta,'pregunta',2000),components:[{type:1,components:[
      {type:2,style:3,label:text(si,'confirmar',80),custom_id:'pd_confirm_yes'},
      {type:2,style:4,label:text(no,'cancelar',80),custom_id:'pd_confirm_no'}]}],allowedMentions:{parse:[]}}),
    // Moderación. Esta familia consulta posibilidades; las acciones siguen en el intérprete.
    PUEDE_DAR_ROL:async(rol:any)=>{
      const g=needGuild(),r=rol?.id?rol:g.roles?.cache?.get?.(id(rol));
      const me=await getMember();if(!r||!me)return false;
      if(id(me)!==String(g.ownerId)&&!permissions(me,'GESTIONAR_ROLES'))return false;
      if(r.managed||r.id===g.id||(r.guild?.id&&r.guild.id!==g.id)||r.editable!==true)return false;
      return id(me)===String(g.ownerId)||(Number(me.roles?.highest?.position)>Number(r.position));
    },
    PUEDE_QUITAR_ROL:async(rol:any,objetivo:any=actor())=>{
      const g=needGuild(),r=rol?.id?rol:g.roles?.cache?.get?.(id(rol));
      if(!r||!(await f.PUEDE_DAR_ROL(r)))return false;
      const m=await getMember(objetivo);if(!m||m.guild?.id!==g.id)return false;
      return m.roles?.cache?.has?.(r.id)===true;
    },
    LIMITAR_MENCIONES:(usuarios:any=[],roles:any=[])=>({allowedMentions:{parse:[],users:toArraySafe(usuarios,100).map(id),roles:toArraySafe(roles,100).map(id),repliedUser:false}}),
    DETECTAR_SPAM:(mensajes:any,umbral:any=5,ventana:any=10000)=>{
      const min=bounded(umbral,'umbral',1000),ms=bounded(ventana,'ventana',86400000);
      const now=Date.now();const items=toArraySafe(mensajes,5000).filter(x=>{
        const t=Number(x?.createdTimestamp??x?.timestamp??x);return Number.isFinite(t)&&t<=now&&t>=now-ms;
      });return items.length>=min;
    },
    ESTADO_AUTOMOD:async()=>{
      const g=needGuild();await verifyActor('ManageGuild');await verifyBot('ManageGuild');
      if(!g.autoModerationRules?.fetch)throw new Error('ESTADO_AUTOMOD: administrador de reglas no disponible.');
      return list(await g.autoModerationRules.fetch()).map(r=>({id:r.id,nombre:r.name,activo:r.enabled}));
    },
    // Usuarios y miembros.
    BUSCAR_MIEMBROS:async(busqueda:any,cantidad:any=25)=>{
      const g=needGuild(),q=text(busqueda,'búsqueda',100),max=bounded(cantidad,'cantidad',100);
      if(!g.members?.search)throw new Error('BUSCAR_MIEMBROS: método de búsqueda no disponible.');
      return list(await g.members.search({query:q,limit:max})).slice(0,max);
    },
    POSICION_MIEMBRO:(m:any=actor())=>Number.isFinite(m?.roles?.highest?.position)?m.roles.highest.position:undefined,
    ESTA_MENCIONADO:(u:any=actor(),m:any=msg())=>Boolean(m?.mentions?.users?.has?.(id(u))||m?.mentions?.members?.has?.(id(u))),
    ANTIGUEDAD_CUENTA:(u:any=actor())=>Math.max(0,Date.now()-(Number((BigInt(id(u))>>22n)+1420070400000n))),
    ANTIGUEDAD_MIEMBRO:(m:any=actor())=>m?.joinedTimestamp?Math.max(0,Date.now()-m.joinedTimestamp):undefined,
    // Mensajes, encuestas, foros, hilos.
    ULTIMO_MENSAJE_BOT:async(c:any=channel())=>{
      if(!c.messages?.fetch)throw new Error('API Discord: historial de mensajes no disponible para el canal.');
      const arr=list(await c.messages.fetch({limit:50}));return arr.find(x=>x.author?.id===client().user?.id);
    },
    ENCUESTA_DE:async(m:any=msg())=>(await getMsg(m))?.poll,
    VOTOS_ENCUESTA:async(m:any=msg())=>{
      const poll=(await getMsg(m))?.poll;if(!poll)return [];
      return list(poll.answers).map(a=>({id:a.id,texto:a.text??a.pollMedia?.text,votos:a.voteCount??a.count??0}));
    },
    CREAR_PUBLICACION_FORO:async(titulo:any,contenido:any,foro:any=channel())=>{
      const g=needGuild(),c=foro;await verifyActor('CreatePublicThreads');await verifyBot('CreatePublicThreads',g);
      if(c.guildId!==g.id&&c.guild?.id!==g.id)throw new Error('CREAR_PUBLICACION_FORO: el canal de foro pertenece a un servidor diferente.');
      if(!c.threads?.create)throw new Error('CREAR_PUBLICACION_FORO: canal sin capacidad para crear publicaciones.');
      return c.threads.create({name:text(titulo,'título',100),message:{content:text(contenido,'contenido',2000),allowedMentions:{parse:[]}}});
    },
    BUSCAR_PUBLICACIONES:async(consulta:any,foro:any=channel(),cantidad:any=25)=>{
      const q=text(consulta,'búsqueda',100).toLocaleLowerCase('es'),max=bounded(cantidad,'cantidad',100);
      if(!foro.threads?.fetchActive)throw new Error('BUSCAR_PUBLICACIONES: canal sin administrador de hilos.');
      const active=await foro.threads.fetchActive();return list(active.threads).filter(x=>String(x.name).toLocaleLowerCase('es').includes(q)).slice(0,max);
    },
    PERMISOS_CANAL:(usuario:any=actor(),canal:any=channel())=>{
      const p=canal.permissionsFor?.(usuario);if(!p)throw new Error('PERMISOS_CANAL: permisos efectivos no disponibles para el destinatario.');return p.toArray?.()??[];
    },
    RESPUESTA_MENSAJE:(m:any=msg())=>m?.reference?.messageId,
    ADJUNTOS_MENSAJE:(m:any=msg())=>list(m?.attachments),
    IMAGENES_MENSAJE:(m:any=msg())=>list(m?.attachments).filter(a=>String(a.contentType??'').startsWith('image/')),
    MENCIONES_MENSAJE:(m:any=msg())=>list(m?.mentions?.users),
    LINK_CANAL:(c:any=channel())=>`https://discord.com/channels/${id(c.guildId??guild())}/${id(c)}`,
    // Consultas de servidores, eventos y audio.
    PARTICIPANTES_EVENTO:async(evento:any,cantidad:any=100)=>{
      const e=await getEvent(evento),max=bounded(cantidad,'cantidad',100);
      if(!e?.fetchSubscribers)throw new Error('PARTICIPANTES_EVENTO: API de suscriptores no disponible.');return list(await e.fetchSubscribers({limit:max}));
    },
    SONIDOS_DE:async()=>{
      const g=needGuild();if(!g.soundboardSounds?.fetch)throw new Error('SONIDOS_DE: Soundboard no disponible en el servidor.');return list(await g.soundboardSounds.fetch());
    },
    CONFIGURACION_BIENVENIDA:async()=>{
      const g=needGuild();if(!g.fetchOnboarding)throw new Error('CONFIGURACION_BIENVENIDA: API Onboarding no disponible.');return g.fetchOnboarding();
    },
    PLANTILLAS_SERVIDOR:async()=>{const g=needGuild();if(!g.fetchTemplates)throw new Error('PLANTILLAS_SERVIDOR: API de plantillas no disponible.');return g.fetchTemplates();},
    CANALES_SERVIDOR:(g:any=needGuild())=>validateCollection(g.channels),
    ROLES_SERVIDOR:(g:any=needGuild())=>validateCollection(g.roles),
    NOMBRE_SERVIDOR_DE:(g:any=needGuild())=>String(g.name??''),
    DESCRIPCION_SERVIDOR:(g:any=needGuild())=>g.description??'',
    ID_DUENO_SERVIDOR:(g:any=needGuild())=>String(g.ownerId??''),
    // Métricas del proceso sin credenciales.
    MEMORIA_BOT:()=>{const m=memoryUsage();return {rss:m.rss,heapUsado:m.heapUsed,heapTotal:m.heapTotal,externa:m.external};},
    USO_CPU_BOT:()=>cpuUsage(),
    ENTORNO_BOT:()=>({node:versions.node,plataforma:platform,arquitectura:arch}),
    ESTADO_SHARD:()=>({id:client().shard?.ids?.[0],total:client().shard?.count??1,ping:client().ws?.ping??undefined}),
    LATENCIA_HTTP:async()=>{const c=client();if(!c.rest?.get)throw new Error('LATENCIA_HTTP: cliente REST no disponible.');
      const start=performance.now();await c.rest.get('/gateway');return Math.round(performance.now()-start);
    },
    DIAGNOSTICO_BOT:()=>({listo:client().isReady?.()??false,tiempoActivo:client().uptime??0,memoria:memoryUsage().rss,servidores:client().guilds?.cache?.size??0}),
    // Metadatos de adjuntos sin descargar el contenido.
    ARCHIVO_INFO:(a:any)=>({nombre:String(a?.name??'').slice(0,255),tamano:Number(a?.size??0),mime:String(a?.contentType??''),url:a?.url}),
    VALIDAR_ADJUNTO:(a:any,tamanoMaximo:any=8_000_000,tipos:any=[])=>{
      const max=bounded(tamanoMaximo,'tamaño máximo',100_000_000),size=Number(a?.size);
      if(!Number.isSafeInteger(size)||size<0||size>max)return false;
      const allowed=toArraySafe(tipos,100).map(String);return !allowed.length||allowed.includes(String(a?.contentType??''));
    },
    IMAGEN_INFO:(a:any)=>({ancho:a?.width,alto:a?.height,tamano:a?.size,mime:a?.contentType}),
    EXTENSION_ARCHIVO:(a:any)=>String(a?.name??a??'').split(/[\\/]/).pop()?.match(/\.([A-Za-z0-9]{1,12})$/)?.[1]?.toLowerCase(),
    ES_IMAGEN:(a:any)=>String(a?.contentType??'').startsWith('image/'),
    ES_VIDEO:(a:any)=>String(a?.contentType??'').startsWith('video/'),
    ES_AUDIO:(a:any)=>String(a?.contentType??'').startsWith('audio/'),
    // Operaciones de formato, transformación y colección.
    DURACION_FORMATO:(milisegundos:any)=>{
      const n=Number(milisegundos);if(!Number.isSafeInteger(n)||n<0)throw new Error('DURACION_FORMATO: milisegundos no válidos (entero no negativo requerido).');
      const s=Math.floor(n/1000);return `${Math.floor(s/86400)}d ${Math.floor(s%86400/3600)}h ${Math.floor(s%3600/60)}m ${s%60}s`;
    },
    PORCENTAJE:(parte:any,total:any)=>{const p=Number(parte),t=Number(total);if(!Number.isFinite(p)||!Number.isFinite(t)||t===0)throw new Error('PORCENTAJE: argumentos no finitos o denominador igual a cero.');return p/t*100;},
    EN_RANGO:(valor:any,min:any,max:any)=>{const [v,a,b]=[valor,min,max].map(Number);if(![v,a,b].every(Number.isFinite)||a>b)throw new Error('EN_RANGO: extremos no finitos o mínimo superior al máximo.');return v>=a&&v<=b;},
    FRECUENCIA:(datos:any)=>{const out:Record<string,number>=Object.create(null);for(const v of toArraySafe(datos,5000)){const k=String(v);if(k.length>200)throw new Error('FRECUENCIA: clave superior a 200 caracteres.');out[k]=(out[k]??0)+1;}return out;},
    AGRUPAR_POR:(datos:any,campo:any)=>{const field=text(campo,'campo',100);if(['__proto__','constructor','prototype'].includes(field))throw new Error('AGRUPAR_POR: propiedad reservada del prototipo de objeto.');
      const result:Record<string,any[]>=Object.create(null);for(const x of toArraySafe(datos,5000)){const k=String(x?.[field]??'');if(k.length>200)throw new Error('AGRUPAR_POR: clave de agrupación superior a 200 caracteres.');(result[k]??=[]).push(x);}return result;
    },
    DIVIDIR_LISTA:(datos:any,tamano:any)=>{const size=bounded(tamano,'tamaño',1000),arr=toArraySafe(datos,10000);const result:any[][]=[];
      for(let i=0;i<arr.length;i+=size)result.push(arr.slice(i,i+size));return result;
    },
    PAGINAR_LISTA:(datos:any,pagina:any=1,tamano:any=10)=>{
      const arr=toArraySafe(datos,10000),p=bounded(pagina,'página',1000000),size=bounded(tamano,'tamaño',100);
      return {pagina:p,total:arr.length,paginas:Math.ceil(arr.length/size),elementos:arr.slice((p-1)*size,p*size)};
    },
    INTERVALO_FECHAS:(inicio:any,fin:any)=>{const a=parseDate(inicio).getTime(),b=parseDate(fin).getTime();return b-a;},
    FORMATO_NUMERO:(n:any,idioma='es-PY',decimales:any=2)=>{
      const v=Number(n),d=bounded(decimales,'decimales',10,0);if(!Number.isFinite(v))throw new Error('FORMATO_NUMERO: entrada no numérica o no finita.');
      return new Intl.NumberFormat(String(idioma),{minimumFractionDigits:d,maximumFractionDigits:d}).format(v);
    },
    FORMATO_MONEDA:(n:any,moneda:any='PYG',idioma='es-PY')=>{
      const v=Number(n);if(!Number.isFinite(v))throw new Error('FORMATO_MONEDA: cantidad no numérica o no finita.');return new Intl.NumberFormat(String(idioma),{style:'currency',currency:text(moneda,'moneda',3)}).format(v);
    },
    LIMPIAR_TEXTO:(v:any)=>String(v??'').normalize('NFKC').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim(),
    SLUG:(v:any)=>String(v??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,100),
    TRUNCAR_TEXTO:(v:any,maximo:any=200,sufijo:any='…')=>{const x=String(v??''),n=bounded(maximo,'longitud',10000,0),s=String(sufijo);return x.length<=n?x:x.slice(0,Math.max(0,n-s.length))+s.slice(0,n);},
    ESCAPAR_MARKDOWN:(v:any)=>String(v??'').replace(/([\\`*_{}\[\]()#+\-.!|>~])/g,'\\$1'),
    COPIAR_OBJETO:(v:any)=>structuredClone(v),
    OBJETO_SEGURO:(v:any)=>{if(v===null||typeof v!=='object'||Array.isArray(v))throw new Error('OBJETO_SEGURO: se esperaba objeto JSON no nulo.');
      const o=Object.create(null);for(const [k,val] of Object.entries(v)){if(['__proto__','prototype','constructor'].includes(k))continue;o[k]=val;}return o;
    },
    COMPARAR_FECHAS:(a:any,b:any)=>Math.sign(parseDate(a).getTime()-parseDate(b).getTime()),
    SORTEAR_UNICOS:(datos:any,cantidad:any=1)=>{
      const arr=toArraySafe(datos,5000),n=bounded(cantidad,'cantidad',arr.length||1,0);
      if(n>arr.length)throw new Error('SORTEAR_UNICOS: cantidad solicitada superior al tamaño de la colección.');const pool=[...arr];
      for(let i=0;i<n;i++){const j=i+randomInt(pool.length-i);[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,n);
    },
    ESTADISTICAS_LISTA:(datos:any)=>{
      const a=toArraySafe(datos,10000).map(Number);if(a.some(x=>!Number.isFinite(x)))throw new Error('ESTADISTICAS_LISTA: colección con valores no numéricos o no finitos.');
      const s=a.reduce((x,y)=>x+y,0);return {cantidad:a.length,suma:s,promedio:a.length?s/a.length:undefined,minimo:a.length?Math.min(...a):undefined,maximo:a.length?Math.max(...a):undefined};
    },
  };
  return f;
}
