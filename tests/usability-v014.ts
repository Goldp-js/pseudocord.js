import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { createHmac } from 'node:crypto';
import { createStdlib } from '../src/runtime/stdlib.js';
import { CommandCooldowns } from '../src/runtime/cooldowns.js';
import { createDiscordExtras } from '../src/runtime/discord-extras.js';
import { solicitarHttp, isPublicAddress, verificarFirma, urlParametros, jsonCamino } from '../src/runtime/http-safe.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';

let passed=0;
async function test(name:string,fn:()=>any):Promise<void>{
  try{await fn();passed++;console.log('✓',name);}catch(error){console.error('✗',name);throw error;}
}
const id=(number:number)=>String(number).padStart(18,'1');
const C=createStdlib();
await test('catálogo exacto de 63 nuevas funciones sin alias redundantes',()=>{
  assert.equal(PSEUDODISCORD_STDLIB.http_seguro_v014.length,9);
  assert.equal(PSEUDODISCORD_STDLIB.discord_extendido_v014.length,54);
  for(const name of [...PSEUDODISCORD_STDLIB.http_seguro_v014,...PSEUDODISCORD_STDLIB.discord_extendido_v014])assert.equal(typeof C[name],'function',name);
  assert.deepEqual(new Set(Object.values(PSEUDODISCORD_STDLIB).flat()),new Set(Object.keys(C)));
});
await test('URL solo HTTPS y prohíbe localhost, secretos y puertos arbitrarios',()=>{
  for(const url of ['http://example.com','https://localhost/','https://api.internal/data','https://a:secret@example.com','https://example.com:8443/','file:///etc/passwd','https://example.com/#fragment'])assert.equal(C.VALIDAR_URL(url),false,url);
  assert.equal(C.VALIDAR_URL('https://api.github.com/users'),true);
});
for(const [name,address,allowed] of [
  ['IPv4 público','8.8.8.8',true],['IPv4 público adicional','1.1.1.1',true],
  ['localhost','127.0.0.1',false],['privada','10.2.3.4',false],['red privada','192.168.3.1',false],
  ['link-local y metadata','169.254.169.254',false],['CGNAT','100.64.0.1',false],
  ['benchmark','198.19.1.1',false],['documentacion','203.0.113.4',false],
  ['IPv6 loopback','::1',false],['IPv6 local','fd12::8',false],
  ['IPv6 publica','2606:4700:4700::1111',true],['IPv6 documentación','2001:db8::1',false],
  ['IPv6 tunel','2002:0a00:0001::1',false]
] as const){await test(`filtro SSRF ${name}`,()=>assert.equal(isPublicAddress(address),allowed));}
await test('HTML, parámetros URL y JSON anidado',()=>{
  assert.equal(C.CODIFICAR_HTML('<b onclick="x">&</b>'),'&lt;b onclick=&quot;x&quot;&gt;&amp;&lt;/b&gt;');
  assert.equal(urlParametros({nombre:'A B',grupo:[1,2]}),'nombre=A+B&grupo=1&grupo=2');
  assert.equal(jsonCamino({a:{b:[{x:3}]}},'a.b.0.x'),3);
  assert.equal(jsonCamino({},'missing',77),77);
  assert.throws(()=>jsonCamino({},'constructor.prototype'),/no válida/);
});
await test('HMAC verifica en tiempo constante y rechaza firma incorrecta',()=>{
  const key='clave',body='mensaje',digest=createHmac('sha256',key).update(body).digest('hex');
  assert.equal(verificarFirma(key,body,digest),true);
  assert.equal(verificarFirma(key,body,'sha256='+digest),true);
  assert.equal(verificarFirma(key,body,digest.replace(/^./,'0')),false);
});
await test('HTTP bloquea dirección privada antes de abrir socket',async()=>{
  let invoked=0;
  await assert.rejects(()=>solicitarHttp('https://127.0.0.1/privado',{}, {request:(()=>{invoked++;}) as any}),/política SSRF/);
  assert.equal(invoked,0);
});
await test('HTTP detecta DNS rebinding que mezcla privada y pública',async()=>{
  let invoked=0;
  await assert.rejects(()=>solicitarHttp('https://example.com/',{}, {
    lookup:(async()=>[{address:'8.8.8.8',family:4},{address:'127.0.0.1',family:4}]) as any,
    request:(()=>{invoked++;}) as any
  }),/política SSRF/);
  assert.equal(invoked,0);
});
function fakeRequest(responseText:string, headers:Record<string,string>={'content-type':'application/json'},status=200){
  let captured:any;let requests=0;
  const request=(opts:any,callback:any)=>{
    captured=opts;requests++;
    const req:any=new EventEmitter();req.setTimeout=()=>{};req.destroy=(err:Error)=>req.emit('error',err);
    req.end=()=>{queueMicrotask(()=>{
      const res:any=new EventEmitter();res.headers=headers;res.statusCode=status;
      callback(res);res.emit('data',Buffer.from(responseText));res.emit('end');
    });};
    return req;
  };
  return {request:request as any,getCaptured:()=>captured,getCount:()=>requests};
}
await test('HTTP válido obtiene JSON, limita método y fija DNS en la conexión',async()=>{
  const mock=fakeRequest('{"ok":true}');
  const result=await solicitarHttp('https://example.com/api',{metodo:'GET'}, {lookup:(async()=>[{address:'8.8.8.8',family:4}]) as any,request:mock.request});
  assert.equal(result.correcto,true);assert.deepEqual(result.json,{ok:true});assert.equal(result.estado,200);
  assert.equal(mock.getCount(),1);assert.equal(mock.getCaptured().hostname,'example.com');
  await new Promise<void>((resolve,reject)=>mock.getCaptured().lookup('example.com',{},(err:any,address:any)=>err?reject(err):(assert.equal(address,'8.8.8.8'),resolve())));
});
await test('HTTP rechaza JSON inválido sin lanzar excepción no capturada',async()=>{
  const mock=fakeRequest('{fallo');
  await assert.rejects(()=>solicitarHttp('https://example.com/api',{}, {lookup:(async()=>[{address:'8.8.8.8',family:4}]) as any,request:mock.request}),/JSON declarado/);
});
await test('HTTP limita tamaño de respuesta y bloquea cabeceras prohibidas',async()=>{
  const mock=fakeRequest('x'.repeat(200),{'content-type':'text/plain'});
  await assert.rejects(()=>solicitarHttp('https://example.com/api',{maxBytes:10}, {lookup:(async()=>[{address:'8.8.8.8',family:4}]) as any,request:mock.request}),/tamaño/);
  await assert.rejects(()=>solicitarHttp('https://example.com',{cabeceras:{Host:'evil.com'}}),/reservada/);
});
await test('HTTP no sigue redirección privada',async()=>{
  const mock=fakeRequest('',{location:'https://127.0.0.1/internal'},302);
  await assert.rejects(()=>solicitarHttp('https://example.com',{redirecciones:1},{lookup:(async()=>[{address:'8.8.8.8',family:4}]) as any,request:mock.request}),/política SSRF/);
  assert.equal(mock.getCount(),1);
});
const guild:any={id:id(100),name:'Pruebas',ownerId:id(999),roles:{everyone:{id:id(100)},cache:new Map()},channels:{cache:new Map()},members:{cache:new Map()},memberCount:20};
const actor:any={id:id(1),guild,roles:{cache:new Map()},permissions:{has:()=>false},user:{username:'Pedro'}};
const bot:any={id:id(2),guild,permissions:{has:(permission:string)=>['ManageChannels','ManageRoles'].includes(permission)}};
guild.members.me=bot;guild.members.cache.set(actor.id,actor);guild.members.cache.set(bot.id,bot);
const client:any={user:{id:id(2)},guilds:{cache:new Map([[guild.id,guild]])},ws:{status:0,ping:45},uptime:1234,users:{cache:new Map()},channels:{cache:new Map()},isReady:()=>true};
let context:any={autor:actor,miembro:actor,servidor:guild};
const f=createDiscordExtras(()=>client,()=>context);
await test('consulta cuentas: fecha snowflake, perfil y estado de bot',()=>{
  assert.equal(f.CREACION_USUARIO(actor) instanceof Date,true);
  assert.equal(f.PERFIL_MIEMBRO().id,actor.id);
  assert.equal(f.ESTADO_BOT(),'listo');
  assert.equal(f.ESTADISTICAS_BOT().latencia,45);
  assert.equal(f.ESTADISTICAS_SERVIDOR().miembros,20);
});
await test('ticket crea canal privado con acceso solo a solicitante y bot',async()=>{
  let creations=0;
  guild.channels.fetch=async()=>guild.channels.cache;
  guild.channels.create=async(options:any)=>{
    creations++;
    const ch:any={...options,id:id(200+creations),guild,guildId:guild.id,delete:async()=>{guild.channels.cache.delete(ch.id)}};
    guild.channels.cache.set(ch.id,ch);return ch;
  };
  const ticket=await f.CREAR_TICKET('Ayuda ahora');
  assert.ok(ticket.name.startsWith('ticket-ayuda-ahora-'));
  assert.equal(ticket.permissionOverwrites[0].id,guild.id);
  assert.deepEqual(ticket.permissionOverwrites[0].deny,['ViewChannel']);
  assert.equal(ticket.permissionOverwrites[1].id,actor.id);
  assert.equal(ticket.permissionOverwrites[2].id,client.user.id);
  assert.equal((await f.TICKETS_ABIERTOS()).length,1);
  assert.equal((await f.CREAR_TICKET('duplicado')).id,ticket.id);
  assert.equal(creations,1);
});
await test('ticket concurrente sólo se crea una vez',async()=>{
  const tickets=await Promise.all([f.CREAR_TICKET('uno'),f.CREAR_TICKET('dos')]);
  assert.equal(tickets[0].id,tickets[1].id);
});
await test('ticket no permite abrir en nombre de otros sin permisos',async()=>{
  await assert.rejects(()=>f.CREAR_TICKET('otro',{id:id(40)}),/suplantación no autorizada/);
});
await test('ticket ajeno no puede cerrarse y el dueño sí',async()=>{
  const ch=[...guild.channels.cache.values()][0];
  const another:any={id:id(3),guild,permissions:{has:()=>false},roles:{cache:new Map()}};
  guild.members.cache.set(another.id,another);
  context={...context,autor:another,miembro:another,canal:ch};
  assert.equal((await f.TICKETS_ABIERTOS()).length,0);
  await assert.rejects(()=>f.CERRAR_TICKET(),/solicitante original/);
  context={...context,autor:actor,miembro:actor};
  assert.equal(await f.CERRAR_TICKET(),true);
  assert.equal(guild.channels.cache.size,0);
});
await test('bot sin ManageChannels no crea ni cierra tickets',async()=>{
  bot.permissions.has=()=>false;
  await assert.rejects(()=>f.CREAR_TICKET('no'),/Permisos del bot insuficientes/);
  bot.permissions.has=()=>true;
});
await test('no se puede cerrar un canal ordinario o de otro servidor',async()=>{
  const ordinary:any={id:id(701),guild,guildId:guild.id,topic:'normal',delete:async()=>{}};
  await assert.rejects(()=>f.CERRAR_TICKET(ordinary),/no contiene metadatos de ticket/);
  const foreign:any={...ordinary,topic:`pseudodiscord-ticket:v1:${actor.id}`,guildId:id(333),guild:undefined};
  await assert.rejects(()=>f.CERRAR_TICKET(foreign),/servidor propietario distinto/);
});
await test('consultas de rol, presencia, voz y canales con contexto',async()=>{
  assert.equal(f.ESTA_EN_VOZ(),false);
  assert.equal(f.ESTADO_PRESENCIA(),undefined);
  assert.deepEqual(f.ACTIVIDAD_USUARIO(),[]);
  assert.deepEqual(f.ROLES_MUTUOS(actor,actor),[]);
  const ch={type:0,nsfw:false,rateLimitPerUser:5};
  assert.equal(f.CANAL_DE_TIPO(ch,0),true);
  assert.equal(f.CANAL_LENTO(ch),5);
  assert.equal(f.CANAL_NSFW(ch),false);
});
await test('consultas de baneo distinguen no encontrado de error de API',async()=>{
  guild.bans={fetch:async()=>{throw Object.assign(Error('Unknown ban'),{code:10026})}};
  assert.equal(await f.BANEO_ACTIVO(actor),false);
  guild.bans={fetch:async()=>({user:actor,reason:'spam'})};
  assert.equal(await f.BANEO_ACTIVO(actor),true);
  assert.equal((await f.DETALLE_BANEO(actor)).reason,'spam');
});
await test('permisos de nickname respetan jerarquía, dueño y bot',async()=>{
  const target:any={id:id(80),guild,roles:{highest:{position:1}},manageable:true};
  actor.roles.highest={position:30};
  actor.permissions.has=(p:string)=>p==='ManageNicknames';
  bot.permissions.has=(p:string)=>p==='ManageNicknames';
  guild.members.cache.set(target.id,target);
  assert.equal(await f.PUEDE_CAMBIAR_APODO(target),true);
  target.manageable=false;assert.equal(await f.PUEDE_CAMBIAR_APODO(target),false);
  target.manageable=true;target.roles.highest.position=50;
  assert.equal(await f.PUEDE_CAMBIAR_APODO(target),false);
});
await test('permisos de borrar mensaje exigen capacidad del bot y ejecutor',async()=>{
  const ch:any={guild,guildId:guild.id,permissionsFor:(m:any)=>({has:(p:string)=>p==='ManageMessages'&&(m===actor||m===bot)})};
  const msg:any={id:id(71),guild,author:{id:id(99)},channel:ch};
  assert.equal(await f.PUEDE_BORRAR_MENSAJE(msg),true);
  ch.permissionsFor=(m:any)=>({has:(p:string)=>p==='ManageMessages'&&m===actor});
  assert.equal(await f.PUEDE_BORRAR_MENSAJE(msg),false);
});
await test('permisos editar canal exigen permiso por canal para ambos',async()=>{
  const ch:any={id:id(73),guild,guildId:guild.id,permissionsFor:(m:any)=>({has:(p:string)=>p==='ManageChannels'&&(m===actor||m===bot)})};
  assert.equal(await f.PUEDE_EDITAR_CANAL(ch),true);
  ch.permissionsFor=(m:any)=>({has:(p:string)=>p==='ManageChannels'&&m===actor});
  assert.equal(await f.PUEDE_EDITAR_CANAL(ch),false);
});
await test('interacciones no permiten doble respuesta y evitan menciones masivas',async()=>{
  const args:any[]=[];const i:any={id:id(50),replied:false,deferred:false,isRepliable:()=>true,reply:async(payload:any)=>args.push(payload)};
  await f.RESPONDER_INTERACCION({content:'@everyone',allowedMentions:{parse:['everyone']}},i);
  assert.deepEqual(args[0].allowedMentions,{parse:[],repliedUser:false});
  i.replied=true;
  await assert.rejects(()=>f.RESPONDER_INTERACCION('otro',i),/respuesta inicial ya enviada o diferida/);
});
await test('COOLDOWN_RESTANTE consulta sin consumir el tiempo',async()=>{
  const command:any=parse('COMANDO MENSAJE "x" PREFIJO "!"\n COOLDOWN "10s" POR USUARIO\n RESPONDER "ok"\nFIN COMANDO').body[0];
  const cooldowns=new CommandCooldowns();const context={infoComando:{declaracion:command},autor:{id:id(1)}};
  const std=createStdlib({cooldowns,context:()=>context});
  assert.equal(await std.COOLDOWN_RESTANTE(),0);
  const now=Date.now();await cooldowns.claim(command,context,now);
  const rem=await std.COOLDOWN_RESTANTE();
  assert.ok(rem>0&&rem<=10000,`remaining=${rem}`);
  await assert.rejects(async()=>cooldowns.claim(command,context,now+1),/Reintento/);
});
await test('COOLDOWN_RESTANTE distingue los contextos y requiere comando',async()=>{
  const cooldowns=new CommandCooldowns();const context={autor:{id:id(1)}};
  const std=createStdlib({cooldowns,context:()=>context});
  await assert.rejects(async()=>std.COOLDOWN_RESTANTE(),/contexto de comando requerido/);
});
await test('nueva API funciona en el parser y el validador estricto',()=>{
  const src=`COMANDO "perfil"\n    VARIABLE datos = PERFIL_MIEMBRO()\n    VARIABLE salud = ESTADO_BOT()\n    RESPONDER "Estado: " + salud\nFIN\nCOMANDO "http"\n    VARIABLE url = VALIDAR_URL("https://example.com")\n    RESPONDER TEXTO(url)\nFIN`;
  const program=parse(src),result=validate(program,{strictNames:true});
  assert.equal(result.ok,true,JSON.stringify(result.diagnostics));
});
console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.14 superadas.`);
