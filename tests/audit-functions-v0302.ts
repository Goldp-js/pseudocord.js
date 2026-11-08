/** Pruebas de contratos de funciones, sin Gateway ni credenciales. */
import assert from 'node:assert/strict';
import {createStdlib} from '../src/runtime/stdlib.js';
import {createDiscordHelpers} from '../src/runtime/discord-helpers.js';
import {createDiscordExtras} from '../src/runtime/discord-extras.js';
import {createBotToolkit} from '../src/runtime/bot-toolkit.js';
import {createExpandedApi} from '../src/runtime/expanded-api.js';
import {createHttpHelpers} from '../src/runtime/http-safe.js';
import {Interpreter} from '../src/runtime/interpreter.js';
import {parse} from '../src/language/parser.js';
import {PSEUDODISCORD_STDLIB} from '../src/ast/stdlib.js';

let total=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>){try{await fn();total++;console.log(`✓ v0.30.2 ${name}`);}catch(e){console.error(`✗ v0.30.2 ${name}`);throw e;}}
const uid='123456789012345678', other='123456789012345679', gid='123456789012345680';
const user={id:uid,username:'Ejecutor',bot:false,displayAvatarURL:({size}:any)=>`https://cdn.discordapp.com/${uid}/${size}`,bannerURL:({size}:any)=>`https://cdn.discordapp.com/b/${size}`};
const selected={id:other,username:'Destino',bot:true,displayAvatarURL:({size}:any)=>`https://cdn.discordapp.com/${other}/${size}`};
const guild={id:gid,ownerId:uid,memberCount:26};
const f=createStdlib();
const d=createDiscordHelpers({},()=>({users:{cache:new Map(),fetch:async()=>selected}}),()=>({autor:user,usuario:user,servidor:guild,canal:{id:gid}}));
const t=createBotToolkit(()=>({autor:user,canal:{id:gid},servidor:guild}));
const h=createHttpHelpers();

await test('catálogo de 450+ funciones coincide con el registro real',()=>{
  const keys=Object.keys(f);
  assert.ok(keys.length>=450,`Solo ${keys.length}`);
  const catalog=new Set(Object.values(PSEUDODISCORD_STDLIB).flat());
  assert.deepEqual(new Set(keys),catalog);
  assert.ok(keys.every(x=>typeof f[x]==='function'));
});
// Identidad y defaults del contexto.
await test('AVATAR_DE sin argumentos utiliza ejecutor',()=>assert.equal(d.AVATAR_DE(),`https://cdn.discordapp.com/${uid}/256`));
await test('AVATAR_DE opción omitida explícita no usa ejecutor',()=>assert.throws(()=>d.AVATAR_DE(undefined),/usuario no especificado/));
await test('AVATAR_DE NULO explícito no usa ejecutor',()=>assert.throws(()=>d.AVATAR_DE(null),/usuario no especificado/));
await test('AVATAR_DE usa User dentro de GuildMember',()=>assert.equal(d.AVATAR_DE({user:selected},512),`https://cdn.discordapp.com/${other}/512`));
await test('AVATAR_DE rechaza tamaños incompatibles',()=>assert.throws(()=>d.AVATAR_DE(selected,17),/tamaño/));
await test('BANNER_DE se resuelve por contexto',()=>assert.equal(d.BANNER_DE(),`https://cdn.discordapp.com/b/1024`));
await test('BANNER_DE no acepta opción omitida como ejecutor',()=>assert.throws(()=>d.BANNER_DE(undefined),/usuario no especificado/));
await test('BANNER_DE rechaza objeto sin proveedor de banner',()=>assert.throws(()=>d.BANNER_DE(selected),/sin proveedor/));
await test('NOMBRE_DE no cambia un objetivo omitido por el autor',()=>assert.throws(()=>d.NOMBRE_DE(undefined),/usuario no especificado/));
await test('NOMBRE_DE selecciona usuario explícito',()=>assert.equal(d.NOMBRE_DE(selected),'Destino'));
await test('NOMBRE_VISIBLE usa el usuario del contexto cuando se omite',()=>assert.equal(d.NOMBRE_VISIBLE(),'Ejecutor'));
await test('MENCIONAR ausente explícito es error',()=>assert.throws(()=>d.MENCIONAR(undefined),/usuario no especificado/));
await test('ID_DE sin argumentos identifica al ejecutor',()=>assert.equal(d.ID_DE(),uid));
await test('ID_DE no sustituye INDEFINIDO pasado expresamente',()=>assert.throws(()=>d.ID_DE(undefined),/Referencia Discord/));
await test('ES_BOT maneja nulo sin suplantar contexto',()=>assert.equal(d.ES_BOT(null),false));
await test('ES_BOT distingue ejecutor de destino',()=>{assert.equal(d.ES_BOT(),false);assert.equal(d.ES_BOT(selected),true);});
await test('ES_DUENO mantiene consulta booleana para null',()=>assert.equal(d.ES_DUENO(null,guild),false));
await test('OBTENER_USUARIO_DISCORD con objetivo omitido falla sin buscar autor',()=>assert.rejects(()=>d.OBTENER_USUARIO_DISCORD(undefined),/usuario no especificado/));
await test('OBTENER_USUARIO_DISCORD acepta GuildMember',async()=>assert.equal(await d.OBTENER_USUARIO_DISCORD({user:selected}),selected));
await test('ENLACE_MENSAJE no devuelve enlaces ficticios',()=>assert.throws(()=>d.ENLACE_MENSAJE(undefined),/mensaje ausente/));
await test('ENLACE_MENSAJE en canal privado usa @me',()=>assert.equal(d.ENLACE_MENSAJE({id:other,channelId:uid}),`https://discord.com/channels/@me/${uid}/${other}`));
await test('ENLACE_MENSAJE rechaza servidor inválido',()=>assert.throws(()=>d.ENLACE_MENSAJE({id:uid,channelId:gid,guildId:'no-id'}),/Referencia Discord/));
await test('EMBED_SIMPLE valida 24 bits',()=>assert.deepEqual(d.EMBED_SIMPLE('Texto','#desc','#ffffff').embeds[0],{title:'Texto',description:'#desc',color:0xffffff}));
await test('FECHA_DISCORD rechaza fecha inválida',()=>assert.throws(()=>d.FECHA_DISCORD('fecha-no-valida'),/fecha no válida/));
await test('FECHA_DISCORD rechaza estilo desconocido',()=>assert.throws(()=>d.FECHA_DISCORD(new Date(),'q'),/estilo/));
await test('BUSCAR_MENSAJES: número representa cantidad, no canal',async()=>{
  let fetchArg:any;const channel={messages:{fetch:async (opts:any)=>{fetchArg=opts;return new Map([[uid,{id:uid}]])}}};
  const api=createDiscordHelpers({},()=>undefined,()=>({canal:channel}));const result=await api.BUSCAR_MENSAJES(7);
  assert.equal(fetchArg.limit,7);assert.equal(result[0].id,uid);
});
await test('BUSCAR_MENSAJES: canal explícito + cantidad',async()=>{
  let fetchArg:any;const channel={messages:{fetch:async (opts:any)=>{fetchArg=opts;return new Map()}}};
  await d.BUSCAR_MENSAJES(channel,15);assert.equal(fetchArg.limit,15);
});
await test('BUSCAR_MENSAJES impide consultas de más de 100',()=>assert.rejects(()=>d.BUSCAR_MENSAJES(101),/fuera de rango/));
// Texto, matemáticas, estadística, aleatoriedad.
await test('SUMA suma números finitos',()=>assert.equal(f.suma([1,2,3]),6));
await test('SUMA rechaza dato no numérico',()=>assert.throws(()=>f.suma([1,'nada']),/SUMA/));
await test('PRODUCTO rechaza desbordamiento',()=>assert.throws(()=>f.producto([1e300,1e300]),/no finito/));
await test('PROMEDIO vacío devuelve INDEFINIDO, no NaN',()=>assert.equal(f.promedio([]),undefined));
await test('PROMEDIO rechaza dato no finito',()=>assert.throws(()=>f.promedio([1,Infinity]),/PROMEDIO/));
await test('MEDIANA vacío devuelve INDEFINIDO',()=>assert.equal(f.mediana([]),undefined));
await test('MEDIANA impar ordena numéricamente',()=>assert.equal(f.mediana([30,2,10]),10));
await test('MEDIANA par no desborda al sumar números grandes',()=>assert.equal(f.mediana([1e308,1e308]),1e308));
await test('ORDENAR_NUMERICO rechaza texto no numérico',()=>assert.throws(()=>f.ordenarNumerico([1,'dos']),/ORDENAR_NUMERICO/));
await test('ALEATORIO rechaza límites invertidos',()=>assert.throws(()=>f.aleatorio(10,1),/mínimo/));
await test('ALEATORIO rechaza NaN',()=>assert.throws(()=>f.aleatorio(NaN),/ALEATORIO/));
await test('ALEATORIO devuelve valor en intervalo',()=>{const x=f.aleatorio(1,2);assert.ok(x>=1&&x<2);});
await test('LIMITAR rechaza límites invertidos',()=>assert.throws(()=>f.limitar(5,10,0),/mínimo/));
await test('LIMITAR respeta cotas válidas',()=>assert.equal(f.limitar(100,1,10),10));
await test('INTERPOLAR rechaza entrada no numérica',()=>assert.throws(()=>f.interpolar('a',3,.5),/INTERPOLAR/));
await test('RELLENO_INICIO controla longitudes enormes',()=>assert.throws(()=>f.rellenoInicio('x',1e12),/longitud/));
await test('RELLENO_FIN rechaza longitudes negativas',()=>assert.throws(()=>f.rellenoFin('x',-1),/longitud/));
await test('RANGO rechaza sentido incompatible',()=>assert.throws(()=>f.rango(1,10,-1),/dirección/));
await test('RANGO descendente continúa admitido',()=>assert.deepEqual(f.rango(4,1),[4,3,2]));
await test('OBTENER mantiene compatibilidad con acceso a constructores nativos',()=>assert.strictEqual(f.obtener({a:1},'constructor'),Object));
await test('PONER impide prototipo contaminado en objetos',()=>assert.throws(()=>f.poner({},'__proto__',{evil:true}),/reservada/));
await test('BORRAR impide clave de prototipo',()=>assert.throws(()=>f.borrar({},'constructor'),/reservada/));
await test('PONER y BORRAR siguen admitiendo Map',()=>{const m=new Map();f.poner(m,'constructor',10);assert.equal(f.obtener(m,'constructor'),10);assert.equal(f.borrar(m,'constructor'),true);});
await test('PONER rechaza valor primitivo como objeto',()=>assert.throws(()=>f.poner(1,'clave','valor'),/mapa u objeto/));
await test('BORRAR rechaza NULO como objeto',()=>assert.throws(()=>f.borrar(null,'clave'),/mapa u objeto/));
await test('SUMA rechaza entradas vacías engañosas',()=>assert.throws(()=>f.suma([1,null]),/SUMA/));
await test('RANGO no acepta un paso que nunca progresa',()=>assert.throws(()=>f.rango(1e15,1e15+10,1e-6),/paso insuficiente/));
await test('CONTAR los elementos sin predicado',()=>assert.equal(f.contar([1,2,3]),3));
await test('COALESCER elige primer valor presente',()=>assert.equal(f.coalescer(undefined,null,selected),selected));
await test('TIPO_DE distingue NULO e INDEFINIDO',()=>{assert.equal(f.tipoDe(null),'nulo');assert.equal(f.tipoDe(undefined),'undefined');});
await test('NUMERO rechaza cadena vacía',()=>assert.throws(()=>f.numero(' '),/vacía/));
await test('DECIMAL no acepta sufijos extra',()=>assert.throws(()=>f.decimal('10usd'),/DECIMAL/));
await test('BOOLEANO no confunde falso escrito con true',()=>assert.equal(f.booleano('falso'),false));
// Fechas, códigos, JSON y regex.
await test('FECHA rechaza valor inválido',()=>assert.throws(()=>f.fecha('no'),/FECHA/));
await test('ISO rechaza fecha inválida con error descriptivo',()=>assert.throws(()=>f.iso('no'),/ISO/));
await test('FECHA_LOCAL rechaza fecha inválida',()=>assert.throws(()=>f.fechaLocal('no'),/FECHA_LOCAL/));
await test('SUMAR_TIEMPO rechaza fecha inválida',()=>assert.throws(()=>f.sumarTiempo('no',1000),/SUMAR_TIEMPO/));
await test('DIFERENCIA_TIEMPO rechaza fechas inválidas',()=>assert.throws(()=>f.diferenciaTiempo('no',new Date()),/DIFERENCIA_TIEMPO/));
await test('ANIO rechaza fecha inválida',()=>assert.throws(()=>f.anio('no'),/ANIO/));
await test('HEX_DECODIFICAR detecta carácter incompleto',()=>assert.throws(()=>f.hexDecodificar('a'),/HEX_DECODIFICAR/));
await test('HEX_DECODIFICAR rechaza basura en lugar de ignorarla',()=>assert.throws(()=>f.hexDecodificar('zz'),/HEX_DECODIFICAR/));
await test('HEX_DECODIFICAR valida secuencia correcta',()=>assert.equal(f.hexDecodificar('486f6c61'),'Hola'));
await test('BASE64_DECODIFICAR rechaza datos extraños',()=>assert.throws(()=>f.base64Decodificar('%%%'),/BASE64_DECODIFICAR/));
await test('BASE64_DECODIFICAR decodifica texto UTF8',()=>assert.equal(f.base64Decodificar('SG9sYQ=='),'Hola'));
await test('REGEX nativa conserva compatibilidad de expresiones complejas',()=>assert.equal(f.regex('^(a+)+$').source,'^(a+)+$'));
await test('REGEX_SEGURA rechaza cuantificadores anidados',()=>assert.throws(()=>f.regexSegura('^(a+)+$'),/REGEX/));
await test('COINCIDE_SEGURO evalúa entradas normales',()=>assert.equal(f.coincideSeguro('^ab+$','abbb'),true));
await test('COINCIDENCIAS_SEGURAS devuelve coincidencias',()=>assert.equal(f.coincidenciasSeguras('a','banana').length,3));
await test('COINCIDE_SEGURO rechaza texto demasiado largo',()=>assert.throws(()=>f.coincideSeguro('a','a'.repeat(70000)),/65536/));
// Componentes y construcción de mensajes.
await test('BOTON_SIMPLE crea un componente compatible',()=>assert.deepEqual(t.BOTON_SIMPLE('Sí','yes'),{type:2,style:1,label:'Sí',custom_id:'yes'}));
await test('BOTON_ENLACE solo admite HTTPS',()=>assert.throws(()=>t.BOTON_ENLACE('Ver','http://example.org'),/HTTPS/));
await test('FILA_BOTONES rechaza listas vacías',()=>assert.throws(()=>t.FILA_BOTONES([]),/1–5/));
await test('OPCION_MENU valida la longitud de descripción',()=>assert.throws(()=>t.OPCION_MENU('a','b','x'.repeat(101)),/100/));
await test('MENU_SIMPLE rechaza valores duplicados',()=>assert.throws(()=>t.MENU_SIMPLE('id',[{label:'A',value:'a'},{label:'B',value:'a'}]),/duplicados/));
await test('MENU_MULTIPLE controla cardinalidad',()=>assert.throws(()=>t.MENU_MULTIPLE('id',[{label:'A',value:'a'}],2),/máximo/));
await test('MENU_SIMPLE rechaza etiquetas ausentes',()=>assert.throws(()=>t.MENU_SIMPLE('id',[{value:'v'}]),/label/));
await test('MENU_SIMPLE rechaza valores vacíos',()=>assert.throws(()=>t.MENU_SIMPLE('id',[{label:'Opción',value:''}]),/value/));
await test('MENU_SIMPLE limita etiquetas a 100 caracteres',()=>assert.throws(()=>t.MENU_SIMPLE('id',[{label:'a'.repeat(101),value:'x'}]),/label/));
await test('MENU_MULTIPLE rechaza descripción fuera de rango',()=>assert.throws(()=>t.MENU_MULTIPLE('id',[{label:'A',value:'a',description:'x'.repeat(101)}]),/descripción/));
await test('MENU_SIMPLE conserva opciones válidas',()=>assert.equal(t.MENU_SIMPLE('id',[{label:'A',value:'a'}]).components[0].options[0].value,'a'));
await test('RESPUESTA_CON_EMBED rechaza más de diez embeds',()=>assert.throws(()=>t.RESPUESTA_CON_EMBED('mensaje',Array.from({length:11},()=>({title:'A'}))),/1–10/));
await test('RESPUESTA_CON_EMBED mantiene varios embeds válidos',()=>assert.equal(t.RESPUESTA_CON_EMBED('mensaje',[{title:'A'},{title:'B'}]).embeds.length,2));
await test('DURACION_MS interpreta unidades coherentes',()=>assert.equal(t.DURACION_MS('2h'),7200000));
await test('VALIDAR_DURACION coincide con DURACION_MS',()=>{for(const v of ['500ms','0s','2h','365d','366d','999999999999d','4x'])assert.equal(t.VALIDAR_DURACION(v),!assertThrows(()=>t.DURACION_MS(v)),v);});
await test('LIMITE_EMBED bloquea pie demasiado largo',()=>assert.equal(t.LIMITE_EMBED({title:'Hola',footer:{text:'x'.repeat(2050)}}),false));
await test('LIMITE_EMBED bloquea campos de más de 1024',()=>assert.equal(t.LIMITE_EMBED({title:'Hola',fields:[{name:'A',value:'x'.repeat(1025)}]}),false));
await test('RESPUESTA_CON_EMBED no admite null',()=>assert.throws(()=>t.RESPUESTA_CON_EMBED('hola',null),/embeds/));
await test('RESPUESTA_CON_EMBED añade embed válido',()=>assert.equal(t.RESPUESTA_CON_EMBED('hola',{title:'A'}).embeds[0].title,'A'));
await test('RESPUESTA_SEGURA no permite menciones masivas',()=>assert.deepEqual(t.RESPUESTA_SEGURA({content:'@everyone',allowedMentions:{parse:['everyone']}}).allowedMentions,{parse:[],repliedUser:false}));
// Discord extras, expandida e HTTP.
await test('HILOS_ACTIVOS reporta API faltante',()=>{const api=createDiscordExtras(()=>undefined,()=>({canal:{id:gid,messages:{}}}));return assert.rejects(()=>api.HILOS_ACTIVOS(),/API de hilos/);});
await test('HILOS_ARCHIVADOS reporta API faltante',()=>{const api=createDiscordExtras(()=>undefined,()=>({canal:{id:gid,messages:{}}}));return assert.rejects(()=>api.HILOS_ARCHIVADOS(),/API de hilos/);});
await test('MENSAJE_EXISTE reporta API faltante',()=>{const api=createDiscordExtras(()=>undefined,()=>({canal:{id:gid,send:()=>undefined}}));return assert.rejects(()=>api.MENSAJE_EXISTE(uid),/no admite consultar/);});
await test('MENSAJE_EXISTE Unknown Message devuelve false',async()=>{const api=createDiscordExtras(()=>undefined,()=>({canal:{id:gid,messages:{fetch:async()=>{throw Object.assign(new Error('Unknown'),{code:10008});}}}}));assert.equal(await api.MENSAJE_EXISTE(uid),false);});
await test('MENSAJE_EXISTE no confía en el ID de mensajes eliminados',async()=>{
  let consulted=false;const channel={messages:{fetch:async(id:string)=>{consulted=id===uid;throw Object.assign(new Error('Unknown Message'),{code:10008});}}};
  const api=createDiscordExtras(()=>undefined,()=>({canal:channel}));
  assert.equal(await api.MENSAJE_EXISTE({id:uid,channel}),false);assert.ok(consulted);
});
await test('MENSAJE_EXISTE confirma mensajes recuperados de Discord',async()=>{
  let consulted='';const channel={id:gid,messages:{fetch:async(id:string)=>{consulted=id;return {id};}}};
  const api=createDiscordExtras(()=>undefined,()=>({canal:channel}));
  assert.equal(await api.MENSAJE_EXISTE(uid),true);assert.equal(consulted,uid);
});
await test('MENSAJE_EXISTE no disfraza errores de permisos',async()=>{
  const channel={id:gid,messages:{fetch:async()=>{throw Object.assign(new Error('Missing Access'),{code:50001});}}};
  const api=createDiscordExtras(()=>undefined,()=>({canal:channel}));
  await assert.rejects(()=>api.MENSAJE_EXISTE(uid),/Missing Access/);
});
await test('CREACION_USUARIO se calcula con Snowflake',()=>{const api=createDiscordExtras(()=>undefined,()=>({autor:user}));assert.ok(api.CREACION_USUARIO() instanceof Date);});
await test('ACTUALIZAR_COMPONENTE no permite allowedMentions arbitrario',async()=>{
  let sent:any;const i={update:async(x:any)=>{sent=x;return x;}};
  const api=createExpandedApi(()=>undefined,()=>({interaccion:i}));await api.ACTUALIZAR_COMPONENTE({content:'@everyone',allowedMentions:{parse:['everyone']}});
  assert.deepEqual(sent.allowedMentions,{parse:[],repliedUser:false});
});
await test('ACTUALIZAR_COMPONENTE rechaza arrays como payload',()=>{
  const api=createExpandedApi(()=>undefined,()=>({interaccion:{update:async()=>undefined}}));return assert.rejects(()=>api.ACTUALIZAR_COMPONENTE([]),/contenido no válido/);
});
await test('ACTUALIZAR_COMPONENTE edita solo si ya se respondió',async()=>{
  const i={replied:true,editReply:async(v:any)=>v};const api=createExpandedApi(()=>undefined,()=>({interaccion:i}));
  assert.deepEqual((await api.ACTUALIZAR_COMPONENTE('hola')).allowedMentions,{parse:[],repliedUser:false});
});
await test('FORMULARIO_SIMPLE rechaza IDs duplicados',()=>{
  const api=createExpandedApi();assert.throws(()=>api.FORMULARIO_SIMPLE('Demo',[{id:'x'},{id:'x'}]),/duplicado/);
});
await test('VALIDAR_URL bloquea localhost y credenciales',()=>{assert.equal(h.VALIDAR_URL('https://localhost'),false);assert.equal(h.VALIDAR_URL('https://user:pwd@example.com'),false);});
await test('HTTP_CABECERA no devuelve prototipos',()=>assert.equal(h.HTTP_CABECERA({cabeceras:{'content-type':'application/json'}} as any,'__proto__'),undefined));
await test('HTTP_CABECERA ignora capitalización',()=>assert.equal(h.HTTP_CABECERA({cabeceras:{'content-type':'application/json'}} as any,'CONTENT-TYPE'),'application/json'));
await test('URL_PARAMETROS no serializa null/undefined en listas',()=>assert.equal(h.URL_PARAMETROS({a:[null,'x',undefined,'y']}),'a=x&a=y'));
await test('JSON_CAMINO bloquea prototipos',()=>assert.throws(()=>h.JSON_CAMINO({},'__proto__'),/ruta no válida/));
await test('CODIFICAR_HTML escapa HTML sin ejecutarlo',()=>assert.equal(h.CODIFICAR_HTML('<a>'),'&lt;a&gt;'));
// Intérprete: errores de interpolación y límites de bucles.
async function execute(source:string,context:any={}){const p=parse(`EVENTO "prueba" salida\n${source}\nFIN`),i=new Interpreter(p);await i.initialize();return i.execute((p.body[0] as any).body,context);}
await test('interpolación de opción no definida informa fallo, no muestra placeholder',()=>assert.rejects(()=>execute(' salida.valor = "Hola {objetivo}"',{salida:{}}),/Interpolación.*objetivo.*Identificador no resuelto/));
await test('interpolación válida conserva el valor',async()=>{const out:any={};await execute(' salida.valor = "Hola {NOMBRE_DE(usuario)}"',{salida:out,usuario:selected});assert.equal(out.valor,'Hola Destino');});
await test('AVATAR_DE objetivo opcional omitido da diagnóstico en el DSL',()=>{
  const out:any={};return assert.rejects(()=>execute(' salida.valor = "{AVATAR_DE(argumentos.objetivo)}"',{salida:out,autor:user,contexto:{usuario:user},argumentos:{objetivo:undefined}}),/Interpolación.*AVATAR_DE.*usuario no especificado/);
});
await test('COALESCER permite avatar propio por defecto de forma explícita',async()=>{
  const out:any={};await execute(' salida.valor = "{AVATAR_DE(COALESCER(argumentos.objetivo, contexto.usuario))}"',{salida:out,autor:user,contexto:{usuario:user},argumentos:{objetivo:undefined}});
  assert.equal(out.valor,`https://cdn.discordapp.com/${uid}/256`);
});
await test('COALESCER respeta el destinatario seleccionado',async()=>{
  const out:any={};await execute(' salida.valor = "{AVATAR_DE(COALESCER(argumentos.objetivo, contexto.usuario))}"',{salida:out,autor:user,contexto:{usuario:user},argumentos:{objetivo:selected}});
  assert.equal(out.valor,`https://cdn.discordapp.com/${other}/256`);
});
await test('interpolación conserva texto con llaves no interpretables',async()=>{const out:any={};await execute(' salida.valor = "JSON {{no valido}} texto"',{salida:out});assert.equal(out.valor,'JSON {no valido} texto');});
await test('REPETIR rechaza cantidad negativa',()=>assert.rejects(()=>execute(' REPETIR -2 VECES\n  salida.x = 1\n FIN REPETIR',{salida:{}}),/REPETIR.*cantidad/));
await test('REPETIR rechaza cantidad fraccionaria',()=>assert.rejects(()=>execute(' REPETIR 2.5 VECES\n  salida.x = 1\n FIN REPETIR',{salida:{}}),/REPETIR.*cantidad/));
await test('PARA rechaza paso inverso',()=>assert.rejects(()=>execute(' PARA i DESDE 1 HASTA 10 PASO -1\n  salida.x = i\n FIN PARA',{salida:{}}),/PARA.*dirección/));
await test('PARA rechaza incrementos subnormales sin avance',()=>assert.rejects(()=>execute(' PARA i DESDE 10000000000000000 HASTA 10000000000001000 PASO 0.00001\n  salida.x = i\n FIN PARA',{salida:{}}),/PARA.*paso/));

function assertThrows(fn:()=>unknown){try{fn();return false;}catch{return true;}}
console.log(`Auditoría de funciones v0.30.2: ${total} pruebas nuevas superadas.`);
