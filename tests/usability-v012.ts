import assert from 'node:assert/strict';
import { createStdlib } from '../src/runtime/stdlib.js';
import { createDiscordHelpers } from '../src/runtime/discord-helpers.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { resolvePermissionName } from '../src/discord/permissions.js';

let passed=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>):Promise<void>{await fn();passed++;console.log(`✓ v0.12 ${name}`);}
const ID={u:'123456789012345670',other:'123456789012345671',guild:'123456789012345672',channel:'123456789012345673',bot:'123456789012345674'};

await test('BOOLEANO interpreta FALSO en lugar de verdadero',()=>{
  const f=createStdlib();
  for(const v of ['false','FALSO','no','0','off',''])assert.equal(f.booleano(v),false);
  for(const v of ['true','VERDADERO','sí','1','on'])assert.equal(f.booleano(v),true);
  assert.equal(f.booleano(0),false);assert.equal(f.booleano(1),true);
});
await test('BOOLEANO rechaza textos desconocidos para evitar errores silenciosos',()=>{
  const f=createStdlib();assert.throws(()=>f.booleano('quizás'),/BOOLEANO/);
});
await test('NUMERO no acepta cadenas vacías ni Infinity',()=>{
  const f=createStdlib();assert.throws(()=>f.numero(''),/NUMERO/);assert.throws(()=>f.numero('  '),/NUMERO/);
  assert.throws(()=>f.numero('Infinity'),/NUMERO/);assert.equal(f.numero(' 1.5 '),1.5);
});
await test('ENTERO no trunca silenciosamente un texto malformado',()=>{
  const f=createStdlib();assert.equal(f.entero('42'),42);
  assert.throws(()=>f.entero('42años'),/ENTERO/);assert.throws(()=>f.entero('3.14'),/ENTERO/);
});
await test('ENTERO valida la base y el rango seguro',()=>{
  const f=createStdlib();assert.equal(f.entero('ff',16),255);
  assert.throws(()=>f.entero('ff',10),/ENTERO/);
  assert.throws(()=>f.entero('12',1),/base/);
  assert.throws(()=>f.entero('9007199254740993'),/seguro/);
});
await test('DECIMAL exige una cadena completa, pero admite exponente',()=>{
  const f=createStdlib();assert.equal(f.decimal('1.25e2'),125);
  assert.throws(()=>f.decimal('1.25texto'),/DECIMAL/);
  assert.throws(()=>f.decimal(''),/DECIMAL/);
});
await test('ENTERO_ALEATORIO y ALEATORIO_ENTERO usan la misma validación',()=>{
  const f=createStdlib();
  for(const name of ['enteroAleatorio','aleatorioEntero']){
    assert.equal(f[name](10,10),10);
    assert.throws(()=>f[name]('abc',4),/ALEATORIO_ENTERO/);
    assert.throws(()=>f[name](5,4),/ALEATORIO_ENTERO/);
    assert.throws(()=>f[name](0.5,2),/ALEATORIO_ENTERO/);
  }
});
await test('ES_ID_DISCORD reconoce snowflakes y menciones, no texto suelto',()=>{
  const f=createDiscordHelpers();assert.equal(f.ES_ID_DISCORD(ID.u),true);
  assert.equal(f.ES_ID_DISCORD(`<@!${ID.u}>`),true);
  assert.equal(f.ES_ID_DISCORD(`<@&${ID.u}>`),true);
  assert.equal(f.ES_ID_DISCORD('Pedro'),false);assert.equal(f.ES_ID_DISCORD(null),false);
});
await test('BUSCAR_MENSAJES consulta los 10 recientes por defecto',async()=>{
  let options:any;const messages={fetch:async(o:any)=>{options=o;return new Map([['a',{id:'a'}],['b',{id:'b'}]])}};
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages}}));
  assert.deepEqual((await f.BUSCAR_MENSAJES()).map((x:any)=>x.id),['a','b']);assert.deepEqual(options,{limit:10});
});
await test('BUSCAR_MENSAJES permite cantidad fácil y explícita',async()=>{
  let options:any;const messages={fetch:async(o:any)=>{options=o;return new Map()}};
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages}}));
  await f.BUSCAR_MENSAJES(25);assert.equal(options.limit,25);
  await f.BUSCAR_MENSAJES('15');assert.equal(options.limit,15);
});
await test('BUSCAR_MENSAJES acepta ID de canal de 18 dígitos, sin confundirlo con cantidad',async()=>{
  let seen='';const channel={messages:{fetch:async(o:any)=>{seen=o.limit;return new Map()}}};
  const f=createDiscordHelpers({},()=>({channels:{cache:new Map([[ID.channel,channel]] )}}),()=>({}));
  await f.BUSCAR_MENSAJES(ID.channel);assert.equal(seen,10);
  await f.BUSCAR_MENSAJES(ID.channel,5);assert.equal(seen,5);
});
await test('BUSCAR_MENSAJES limita a 100 mensajes',async()=>{
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages:{fetch:async()=>new Map()}}}));
  await assert.rejects(()=>f.BUSCAR_MENSAJES(101),/1–100/);
  await assert.rejects(()=>f.BUSCAR_MENSAJES(-1),/1–100/);
});
await test('MENSAJES_FIJADOS utiliza el canal actual y devuelve lista',async()=>{
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages:{fetchPinned:async()=>new Map([['p',{id:'p'}]])}}}));
  assert.deepEqual((await f.MENSAJES_FIJADOS()).map((x:any)=>x.id),['p']);
});
await test('MENSAJES_FIJADOS prefiere fetchPins moderno de discord.js 14.28',async()=>{
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages:{fetchPins:async()=>({items:[{message:{id:'A'},pinnedAt:new Date()}],hasMore:false}),fetchPinned:async()=>{throw new Error('deprecated')}}}}));
  assert.deepEqual((await f.MENSAJES_FIJADOS()).map((m:any)=>m.id),['A']);
});
await test('MENSAJES_FIJADOS rechaza un canal incompatible',async()=>{
  const f=createDiscordHelpers({},()=>undefined,()=>({canal:{messages:{}}}));
  await assert.rejects(()=>f.MENSAJES_FIJADOS(),/no compatible/);
});
await test('INVITACIONES_DE recupera invitaciones desde servidor actual',async()=>{
  const guild={members:{fetch:async()=>null},invites:{fetch:async()=>new Map([['x',{code:'abc'}]])}};
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild}));
  assert.deepEqual((await f.INVITACIONES_DE()).map((x:any)=>x.code),['abc']);
});
await test('AUDITORIA_SERVIDOR obtiene entradas con límite',async()=>{
  let options:any;const guild={members:{fetch:async()=>null},fetchAuditLogs:async(o:any)=>{options=o;return {entries:new Map([['x',{action:'test'}]])}}};
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild}));
  assert.equal((await f.AUDITORIA_SERVIDOR(20))[0].action,'test');assert.deepEqual(options,{limit:20});
});
await test('AUDITORIA_SERVIDOR rechaza cantidades inválidas',async()=>{
  const f=createDiscordHelpers();await assert.rejects(()=>f.AUDITORIA_SERVIDOR(999),/1–100/);
});
await test('consultas no ocultan fallos de permisos del API de Discord',async()=>{
  const guild={members:{fetch:async()=>null},invites:{fetch:async()=>{throw new Error('Missing Permissions')}}};
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild}));
  await assert.rejects(()=>f.INVITACIONES_DE(),/Missing Permissions/);
});
await test('PUEDE_EXPULSAR resuelve servidor de contexto si recibió dos usuarios sin guild',async()=>{
  const guild:any={id:ID.guild,ownerId:'999999999999999999',members:{cache:new Map()}};
  const actor={id:ID.u,guild,roles:{highest:{position:50}},permissions:{has:(p:string)=>p==='KickMembers'}};
  const target={id:ID.other,guild,roles:{highest:{position:1}},kickable:true};
  guild.members.cache.set(ID.u,actor);guild.members.cache.set(ID.other,target);
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild}));
  assert.equal(await f.PUEDE_EXPULSAR({id:ID.u},{id:ID.other}),true);
});
await test('PUEDE_EXPULSAR no permite jerarquía insuficiente',async()=>{
  const guild:any={id:ID.guild,ownerId:'999999999999999999',members:{cache:new Map()}};
  const actor={id:ID.u,guild,roles:{highest:{position:1}},permissions:{has:(p:string)=>p==='KickMembers'}};
  const target={id:ID.other,guild,roles:{highest:{position:50}},kickable:true};
  guild.members.cache.set(ID.u,actor);guild.members.cache.set(ID.other,target);
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild}));
  assert.equal(await f.PUEDE_EXPULSAR({id:ID.u},{id:ID.other}),false);
});
await test('ES_MIEMBRO sin parámetros usa el autor del contexto',async()=>{
  const guild:any={id:ID.guild,members:{cache:new Map(),fetch:async()=>undefined}};
  guild.members.cache.set(ID.u,{id:ID.u,guild});
  const f=createDiscordHelpers({},()=>undefined,()=>({autor:{id:ID.u},servidor:guild}));
  assert.equal(await f.ES_MIEMBRO(),true);
});
await test('ESPERAR_MENSAJE admite un solo parámetro con duración',async()=>{
  let opts:any;const f=createDiscordHelpers({},()=>undefined,()=>({autor:{id:ID.u},canal:{awaitMessages:async(o:any)=>{opts=o;return {first:()=>undefined}}}}));
  assert.equal(await f.ESPERAR_MENSAJE('5s'),undefined);
  assert.equal(opts.time,5000);assert.equal(opts.filter({author:{id:ID.u,bot:false}}),true);
});
await test('catálogo incluye todas las funciones nuevas y mantiene una sola grafía oficial',()=>{
  const f=createStdlib();const list=PSEUDODISCORD_STDLIB.discord_facil;
  for(const name of ['ES_ID_DISCORD','BUSCAR_MENSAJES','MENSAJES_FIJADOS','INVITACIONES_DE','AUDITORIA_SERVIDOR']){
    assert.equal(typeof f[name],'function');assert.equal(list.filter(x=>x===name).length,1);
  }
});
await test('parser y validador admiten consultas nuevas en un comando',()=>{
  const program=parse('COMANDO "canal"\n    VARIABLE datos = BUSCAR_MENSAJES(10)\n    RESPONDER LONGITUD(datos)\nFIN');
  assert.equal(validate(program,{strictNames:true}).ok,true,JSON.stringify(validate(program,{strictNames:true}).diagnostics));
});
await test('permiso VER_AUDITORIA resuelve flag oficial de Discord',()=>{
  assert.equal(resolvePermissionName('VER_AUDITORIA'),'ViewAuditLog');
});
console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.12 superadas.`);
