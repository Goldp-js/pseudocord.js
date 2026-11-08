import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { createStdlib } from '../src/runtime/stdlib.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';

let passed=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>){await fn();console.log(`✓ v0.9 ${name}`);passed++;}
const ids={guild:'123456789012345670',owner:'123456789012345671',actor:'123456789012345672',victim:'123456789012345673',bot:'123456789012345674',channel:'123456789012345675'};
const flags={Administrator:8n,KickMembers:2n,BanMembers:4n,ModerateMembers:1n<<40n,SendMessages:1n<<11n};

function fixture(){
  const guild:any={id:ids.guild,ownerId:ids.owner,members:{cache:new Map(),fetch:async(id:string)=>{
    const member=guild.members.cache.get(id);
    if(!member)throw Object.assign(new Error('Unknown Member'),{code:10007});
    return member;
  }}};
  const role=(position:number)=>({position,comparePositionTo(other:any){return position-other.position;}});
  const member=(id:string,pos:number,perms:string[],capabilities:any={})=>({
    id,guild,user:{id,username:id},roles:{highest:role(pos),cache:new Map([[`role${pos}`,{id:`role${pos}`,name:`Rol ${pos}`,position:pos}]])},
    permissions:{has:(p:string)=>perms.includes(p)||perms.includes('Administrator')},
    kickable:capabilities.kickable??true,bannable:capabilities.bannable??true,moderatable:capabilities.moderatable??true,
    kick:async()=>({kicked:true}),ban:async()=>({banned:true}),timeout:async()=>({timedout:true})
  });
  const actor=member(ids.actor,50,['KickMembers','BanMembers','ModerateMembers']);
  const victim=member(ids.victim,10,[]);
  guild.members.cache.set(actor.id,actor);guild.members.cache.set(victim.id,victim);
  const api=createStdlib({discord:{PermissionFlagsBits:flags}});
  return {guild,actor,victim,api,member};
}

await test('API Discord no duplica funciones por camelCase ni MENCIONAR_USUARIO',()=>{
  const api=createStdlib();
  assert.equal(api.MENCIONAR_USUARIO,undefined);
  assert.equal(api.mencionarRol,undefined);
  assert.equal(api.esDueno,undefined);
  assert.equal(typeof api.MENCIONAR,'function');
  assert.equal(typeof api.MENCIONAR_ROL,'function');
  assert.equal(new Set(PSEUDODISCORD_STDLIB.discord_facil).size,PSEUDODISCORD_STDLIB.discord_facil.length);
  for(const name of PSEUDODISCORD_STDLIB.discord_facil)assert.equal(typeof api[name],'function',name);
});
await test('La escritura mencionar(...) sigue siendo válida: el lenguaje ignora mayúsculas',async()=>{
  const p=parse('EVENTO "test" usuario, salida\n salida.texto = mencionar(usuario)\nFIN\n');
  const i=new Interpreter(p);await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{usuario:{id:ids.actor},salida});
  assert.equal(salida.texto,`<@${ids.actor}>`);
});
await test('ES_DUENO compara correctamente el identificador anidado del miembro',()=>{
  const {guild,api}=fixture();
  assert.equal(api.ES_DUENO({user:{id:ids.owner}},guild),true);
  assert.equal(api.ES_DUENO({id:ids.actor},guild),false);
  assert.equal(api.ES_DUENO(null,guild),false);
});
await test('ROLES_OBJETO conserva roles completos y ROLES_DE entrega nombres',()=>{
  const {actor,api}=fixture();
  assert.equal(api.ROLES_OBJETO(actor)[0].name,'Rol 50');
  assert.deepEqual(api.ROLES_DE(actor),['Rol 50']);
  assert.equal(api.ROL_MAS_ALTO(actor).position,50);
  assert.equal(api.JERARQUIA_ROL(actor),50);
});
await test('PERMISOS_DE retorna nombres canónicos y ES_ADMINISTRADOR especializa TIENE_PERMISO',()=>{
  const {actor,api}=fixture();
  assert.equal(api.PERMISOS_DE(actor).includes('KickMembers'),true);
  assert.equal(api.PERMISOS_DE(actor).includes('BanMembers'),true);
  assert.equal(api.ES_ADMINISTRADOR(actor),false);
});
await test('ES_EXPULSABLE/ES_BANEABLE/ES_MODERABLE reflejan capacidad del propio bot',()=>{
  const {victim,api}=fixture();
  assert.equal(api.ES_EXPULSABLE(victim),true);
  assert.equal(api.ES_BANEABLE(victim),true);
  assert.equal(api.ES_MODERABLE({...victim,moderatable:false}),false);
  assert.equal(api.ES_EXPULSABLE({id:ids.victim}),false);
});
await test('PUEDE_EXPULSAR valida permiso, roles, identidad y capacidad del bot',async()=>{
  const {guild,actor,victim,api,member}=fixture();
  assert.equal(await api.PUEDE_EXPULSAR(actor,victim),true);
  assert.equal(await api.PUEDE_EXPULSAR(actor,actor),false);
  assert.equal(await api.PUEDE_EXPULSAR({...actor,permissions:{has:()=>false}},victim),false);
  assert.equal(await api.PUEDE_EXPULSAR(actor,{...victim,kickable:false}),false);
  assert.equal(await api.PUEDE_EXPULSAR(member(ids.owner,100,[],{}),victim),true);
  const owner=member(ids.owner,100,[],{});guild.members.cache.set(ids.owner,owner);
  assert.equal(await api.PUEDE_EXPULSAR(actor,owner),false);
});
await test('PUEDE_EXPULSAR rechaza igual/superior jerarquía, incluso con permiso',async()=>{
  const {actor,victim,api}=fixture();
  victim.roles.highest.position=80;
  victim.roles.highest.comparePositionTo=(other:any)=>80-other.position;
  assert.equal(await api.PUEDE_EXPULSAR(actor,victim),false);
});
await test('PUEDE_BANEAR y PUEDE_SILENCIAR requieren permisos y capacidad específica',async()=>{
  const {actor,victim,api}=fixture();
  assert.equal(await api.PUEDE_BANEAR(actor,victim),true);
  assert.equal(await api.PUEDE_SILENCIAR(actor,victim),true);
  victim.bannable=false;assert.equal(await api.PUEDE_BANEAR(actor,victim),false);
  victim.moderatable=false;assert.equal(await api.PUEDE_SILENCIAR(actor,victim),false);
});
await test('PUEDE_EXPULSAR admite usuarios objetivo y los resuelve desde el servidor',async()=>{
  const {actor,api}=fixture();
  assert.equal(await api.PUEDE_EXPULSAR(actor,{id:ids.victim}),true);
  assert.equal(await api.PUEDE_EXPULSAR(actor,{id:ids.bot}),false);
});
await test('PUEDE_EXPULSAR no oculta fallos de red distintos de Unknown Member',async()=>{
  const {actor,api,guild}=fixture();
  guild.members.fetch=async()=>{throw new Error('Gateway sin conexión');};
  await assert.rejects(()=>api.PUEDE_EXPULSAR(actor,{id:ids.bot}),/Gateway sin conexión/);
});
await test('ES_MIEMBRO distingue miembros presentes y ausentes',async()=>{
  const {guild,api}=fixture();
  assert.equal(await api.ES_MIEMBRO(ids.actor,guild),true);
  assert.equal(await api.ES_MIEMBRO(ids.bot,guild),false);
});
await test('BUSCAR_SERVIDOR_DISCORD evita el conflicto con almacenamiento OBTENER_SERVIDOR',async()=>{
  const {guild}=fixture();
  const api=createStdlib({client:{guilds:{cache:new Map([[ids.guild,guild]])}}});
  assert.equal(await api.BUSCAR_SERVIDOR_DISCORD(ids.guild),guild);
  const i=new Interpreter(parse(''));
  assert.equal(i.globals.has('OBTENER_SERVIDOR'),true);
  assert.equal(i.globals.has('BUSCAR_SERVIDOR_DISCORD'),true);
});
await test('OBTENER_MENSAJE recupera mensajes sin exponer el cliente directamente',async()=>{
  const message={id:ids.actor,content:'hola'};
  const channel={id:ids.channel,messages:{cache:new Map([[ids.actor,message]]),fetch:async()=>message}};
  const api=createStdlib();
  assert.equal(await api.OBTENER_MENSAJE(channel,ids.actor),message);
  await assert.rejects(()=>api.OBTENER_MENSAJE({id:ids.channel},ids.actor),/Cliente Discord no disponible/);
});
await test('Argumentos por prefijo rechazan valores fuera de los límites',()=>{
  const bot=new PseudoDiscordBot(parse(''));
  const check=(bot as any).verifyArgument.bind(bot);
  const text={name:'motivo',kind:'texto',required:true,minLength:3,maxLength:50};
  assert.throws(()=>check(text,'ab'),/mínimo 3/);
  assert.throws(()=>check(text,'x'.repeat(51)),/máximo 50/);
  assert.throws(()=>check(text,undefined),/valor requerido ausente/);
  assert.doesNotThrow(()=>check(text,'Motivo correcto'));
  const number={name:'dias',kind:'entero',required:true,minValue:1,maxValue:28};
  assert.throws(()=>check(number,0),/inferior al mínimo/);
  assert.throws(()=>check(number,29),/superior al máximo/);
  assert.throws(()=>check(number,1.5),/entero seguro/);
});
await test('Los argumentos con ELECCION se verifican antes de ejecutar',()=>{
  const bot=new PseudoDiscordBot(parse(''));
  const check=(bot as any).verifyArgument.bind(bot);
  const o={name:'accion',kind:'texto',choices:[{name:'Uno',value:'uno'},{name:'Dos',value:'dos'}]};
  assert.throws(()=>check(o,'tres'),/conjunto de elecciones/);
  assert.doesNotThrow(()=>check(o,'uno'));
});
await test('Argumentos de mención rechazan entradas malformadas',async()=>{
  const bot=new PseudoDiscordBot(parse(''));
  const convert=(bot as any).convertMessageArg.bind(bot);
  await assert.rejects(()=>convert('123spam','usuario',{},0),/identificador Snowflake/);
  assert.equal(await convert(`<@${ids.actor}>`,'usuario',{mentions:{users:new Map([[ids.actor,{id:ids.actor}]])}},0).then((x:any)=>x.id),ids.actor);
});
await test('PERMISOS de comando por prefijo se comprueba en tiempo de ejecución',()=>{
  const bot=new PseudoDiscordBot(parse('COMANDO MENSAJE "kick" PREFIJO "!"\n PERMISOS EXPULSAR_MIEMBROS\n RESPONDER "OK"\nFIN\n'));
  bot.discord={PermissionFlagsBits:flags};
  const member={permissions:{has:(p:string)=>p==='KickMembers'}};
  const check=(bot as any).checkCommandPermissions.bind(bot);
  assert.doesNotThrow(()=>check((bot.program.body[0] as any),member,{}));
  assert.throws(()=>check((bot.program.body[0] as any),{permissions:{has:()=>false}},{}),/Permisos insuficientes/);
  assert.throws(()=>check((bot.program.body[0] as any),undefined,undefined),/contexto no disponible/);
});
await test('La interacción slash recibe miembro objetivo antes que usuario simple',()=>{
  const bot=new PseudoDiscordBot(parse('COMANDO BARRA "kick" DESCRIPCION "Expulsar"\n OPCION objetivo TIPO usuario DESCRIPCION "Miembro" REQUERIDO\n RESPONDER "OK"\nFIN\n'));
  const targetMember={id:ids.victim,roles:{cache:new Map()}};
  const interaction={user:{id:ids.actor},options:{get:()=>({member:targetMember,user:{id:ids.victim}})}};
  const ctx=(bot as any).makeCommandContext(interaction,bot.program.body[0]);
  assert.equal(ctx.argumentos.objetivo,targetMember);
});
await test('BANEAR y EXPULSAR protegen contra jerarquía insuficiente del bot',async()=>{
  const p=parse('EVENTO "test" objetivo\n EXPULSAR objetivo POR "Prueba"\nFIN\n');
  assert.equal(validate(p).ok,true);
  const {guild,victim}=fixture();const i=new Interpreter(p);
  await i.initialize();
  victim.kickable=false;
  await assert.rejects(()=>i.execute((p.body[0] as any).body,{objetivo:victim,servidor:guild}),/kickable=false/);
  victim.kickable=true;
  await assert.doesNotReject(()=>i.execute((p.body[0] as any).body,{objetivo:victim,servidor:guild}));
});
await test('Los moderadores de comandos también deben cumplir permisos y jerarquía',async()=>{
  const p=parse('COMANDO BARRA "kick" DESCRIPCION "Prueba"\n OPCION objetivo TIPO usuario DESCRIPCION "Usuario" REQUERIDO\n EXPULSAR objetivo POR "Motivo"\nFIN\n');
  const {guild,actor,victim}=fixture();const i=new Interpreter(p,{PermissionFlagsBits:flags});await i.initialize();
  await assert.doesNotReject(()=>i.execute((p.body[0] as any).body,{objetivo:victim,miembro:actor,servidor:guild,argumentos:{objetivo:victim}}));
  const denied={...actor,permissions:{has:()=>false}};
  await assert.rejects(()=>i.execute((p.body[0] as any).body,{objetivo:victim,miembro:denied,servidor:guild,argumentos:{objetivo:victim}}),/permisos o jerarquía insuficientes/);
});

console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.9 superadas.`);
