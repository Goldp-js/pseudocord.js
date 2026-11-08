import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';
import { CommandCooldowns } from '../src/runtime/cooldowns.js';
import { createStdlib } from '../src/runtime/stdlib.js';
import { createDiscordHelpers } from '../src/runtime/discord-helpers.js';
import { UserInputError } from '../src/runtime/user-input.js';
import { runExecution, ExecutionCancelledError } from '../src/runtime/execution.js';
import { EventEmitter } from 'node:events';

let passed=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>){await fn();console.log(`✓ v0.11 ${name}`);passed++;}
const IDs={u1:'123456789012345670',u2:'123456789012345671',guild:'123456789012345672',channel:'123456789012345673',bot:'123456789012345674'};
const source=(body:string)=>parse(`COMANDO MENSAJE "demo" PREFIJO "!"\n${body}\nFIN\n`);
function fixture(code:string){
  const program=parse(code);assert.equal(validate(program,{strictNames:true}).ok,true,JSON.stringify(validate(program,{strictNames:true}).diagnostics));
  const bot=new PseudoDiscordBot(program);
  bot.discord={PermissionFlagsBits:{Administrator:8n,BanMembers:4n,KickMembers:2n}};
  const handlers=new Map<string,(arg:any)=>Promise<void>>();
  const client={user:{id:IDs.bot},ws:{ping:25},uptime:3456,
    on:(event:string,cb:(arg:any)=>Promise<void>)=>{handlers.set(event,cb);},once:()=>{}};
  (bot as any).client=client;
  (bot as any).interpreter=new Interpreter(program,bot.discord,{client:()=>client});
  (bot as any).attachMessageCommands();
  (bot as any).attachInteractionRouter();
  let runs=0;
  const messages:any[]=[];
  const guild={id:IDs.guild,name:'Test',members:{fetch:async(id:string)=>({user:{id},id,guild,permissions:{has:()=>true}})}};
  const send=async(content:string,opts:{author?:string;guild?:any;channel?:string}={})=>{
    const id=opts.author??IDs.u1;
    const channel={id:opts.channel??IDs.channel,name:'general'};
    const author={id,username:id,bot:false};
    const member={id,user:author,guild,permissions:{has:()=>true},roles:{highest:{position:50}}};
    const reply=async(payload:any)=>{runs++;messages.push(payload);return payload;};
    const message={content,guild:opts.guild===null?null:guild,member:opts.guild===null?null:member,channel,author,reply,mentions:{users:new Map(),members:new Map(),channels:new Map(),roles:new Map()}};
    const before=messages.length;
    await handlers.get('messageCreate')?.(message);
    return messages.slice(before);
  };
  return {bot,handlers,send,messages,get runs(){return runs}};
}

await test('parser admite COOLDOWN por usuario y error propio',()=>{
  const d=source('COOLDOWN "10s" POR USUARIO ERROR "Calma"\n RESPONDER "ok"').body[0] as any;
  assert.deepEqual(d.cooldown,{durationMs:10000,scope:'usuario',error:'Calma'});
});
await test('parser admite COOLDOWN por servidor, canal y global',()=>{
  for(const scope of ['SERVIDOR','CANAL','GLOBAL']){
    const d=source(`COOLDOWN "2m" POR ${scope}\n RESPONDER "ok"`).body[0] as any;
    assert.equal(d.cooldown.durationMs,120000);assert.equal(d.cooldown.scope,scope.toLowerCase());
  }
});
await test('COOLDOWN por defecto es por usuario',()=>{
  const d=source('COOLDOWN "1h"\n RESPONDER "ok"').body[0] as any;
  assert.equal(d.cooldown.scope,'usuario');
});
await test('COOLDOWN rechaza tiempo inválido, demasiado corto o exagerado',()=>{
  for(const duration of ['"0s"','"500ms"','"31d"','"mil"','"1.5ms"'])
    assert.throws(()=>source(`COOLDOWN ${duration}\n RESPONDER "ok"`),/COOLDOWN/);
});
await test('COOLDOWN rechazado si se declara dos veces',()=>{
  assert.throws(()=>source('COOLDOWN "1s"\n COOLDOWN "2s"'),/duplicada/);
});
await test('COOLDOWN rechaza ámbito desconocido',()=>{
  assert.throws(()=>source('COOLDOWN "1s" POR ROBOT'),/COOLDOWN POR/);
});
await test('PERMISOS permite ERROR personalizado en línea o aparte',()=>{
  const a=source('PERMISOS BANEAR_MIEMBROS ERROR "Denegado"\n RESPONDER "ok"').body[0] as any;
  const b=source('PERMISOS BANEAR_MIEMBROS\n ERROR PERMISOS "Denegado"\n RESPONDER "ok"').body[0] as any;
  assert.equal(a.permissionError,'Denegado');assert.equal(b.permissionError,'Denegado');
});
await test('ERROR sin PERMISOS sigue siendo instrucción existente',()=>{
  const d=source('ERROR "mensaje"').body[0] as any;
  assert.equal(d.body[0].kind,'LogStatement');
});
await test('slash admite cooldown, permisos personalizados y opciones',()=>{
  const p=parse('COMANDO BARRA "voto" DESCRIPCION "Votar"\n PERMISOS ADMINISTRADOR\n ERROR PERMISOS "Solo admins"\n COOLDOWN "5s" POR CANAL\n OPCION nombre TIPO texto REQUERIDO\n RESPONDER nombre\nFIN\n');
  assert.equal(validate(p,{strictNames:true}).ok,true,JSON.stringify(validate(p,{strictNames:true}).diagnostics));
  const d=p.body[0] as any;assert.equal(d.cooldown.scope,'canal');assert.equal(d.permissionError,'Solo admins');
});
await test('COOLDOWN bloquea segunda ejecución en mismo usuario',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "20s"\n RESPONDER "ok"\nFIN');
  assert.deepEqual(await f.send('!demo'),['ok']);
  assert.match((await f.send('!demo'))[0].content,/Reintento en 20 segundos/);
});
await test('COOLDOWN por usuario permite otro autor',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "20s"\n RESPONDER "ok"\nFIN');
  assert.deepEqual(await f.send('!demo'),['ok']);
  assert.deepEqual(await f.send('!demo',{author:IDs.u2}),['ok']);
});
await test('COOLDOWN por canal comparte límite entre usuarios del canal',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "20s" POR CANAL\n RESPONDER "ok"\nFIN');
  assert.deepEqual(await f.send('!demo'),['ok']);
  assert.match((await f.send('!demo',{author:IDs.u2}))[0].content,/Reintento/);
  assert.deepEqual(await f.send('!demo',{author:IDs.u2,channel:'123456789012345676'}),['ok']);
});
await test('COOLDOWN personalizado se muestra sin mencionar al usuario',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "2s" ERROR "⛔ Regresa después"\n RESPONDER "ok"\nFIN');
  await f.send('!demo');const second=(await f.send('!demo'))[0];
  assert.match(second.content,/Regresa después/);assert.deepEqual(second.allowedMentions,{parse:[],repliedUser:false});
});
await test('COOLDOWN no se consume si falta argumento obligatorio',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "2s"\n ARGUMENTO texto TIPO texto REQUERIDO\n RESPONDER texto\nFIN');
  assert.match((await f.send('!demo'))[0].content,/valor requerido ausente/);
  assert.deepEqual(await f.send('!demo Hola'),['Hola']);
});
await test('COOLDOWN no se consume si faltan permisos',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n PERMISOS BANEAR_MIEMBROS ERROR "Sin permiso"\n COOLDOWN "2s"\n RESPONDER "ok"\nFIN');
  const cmd=(f.bot.program.body[0] as any);
  (f.bot as any).checkCommandPermissions=(cmd:any)=>{if(cmd.defaultMemberPermissions.length)throw new UserInputError(cmd.permissionError);};
  assert.match((await f.send('!demo'))[0].content,/Sin permiso/);
  assert.match((await f.send('!demo'))[0].content,/Sin permiso/);
});
await test('COOLDOWN con reclamaciones simultáneas ejecuta una sola acción',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "10s"\n RESPONDER "ok"\nFIN');
  await Promise.all([f.send('!demo'),f.send('!demo'),f.send('!demo')]);
  assert.equal(f.messages.filter(x=>x==='ok').length,1);
  assert.equal(f.messages.filter(x=>x?.content?.includes('Reintento')).length,2);
});
await test('gestor cooldown se libera tras expiración',()=>{
  const c=new CommandCooldowns();const d=source('COOLDOWN "1s"\n RESPONDER "ok"').body[0] as any;
  const ctx={autor:{id:IDs.u1}};
  c.claim(d,ctx,1000);assert.throws(()=>c.claim(d,ctx,1500),/Reintento en 1 segundo/);c.claim(d,ctx,2000);
});
await test('COOLDOWN POR SERVIDOR falla cerrado en mensaje privado',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n COOLDOWN "1s" POR SERVIDOR\n RESPONDER "ok"\nFIN');
  const data=(await f.send('!demo',{guild:null}))[0];assert.match(data.content,/servidor no disponible/);
});
await test('ARGUMENTO y RESTO_ARGUMENTOS leen mensajes sin declaraciones',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n RESPONDER ARGUMENTO(1) + ":" + RESTO_ARGUMENTOS(2)\nFIN');
  assert.deepEqual(await f.send('!demo Pedro motivo con espacios'),['Pedro:motivo con espacios']);
});
await test('ARGUMENTO respeta valor por defecto y valida índices',()=>{
  const f=createStdlib({context:()=>({partes:['Hola']})});
  assert.equal(f.ARGUMENTO(1),'Hola');assert.equal(f.ARGUMENTO(2,'Nada'),'Nada');
  assert.equal(f.RESTO_ARGUMENTOS(1),'Hola');assert.throws(()=>f.ARGUMENTO(0),/posición fuera de rango/);
});
await test('USO_COMANDO genera el mensaje a partir de las opciones',async()=>{
  const f=fixture('COMANDO MENSAJE "demo" PREFIJO "!"\n ARGUMENTO objetivo TIPO texto REQUERIDO PALABRA\n ARGUMENTO motivo TIPO texto OPCIONAL RESTO\n RESPONDER USO_COMANDO()\nFIN');
  assert.deepEqual(await f.send('!demo hola'),['!demo <objetivo> [motivo]']);
});
await test('RESPONDER_ERROR detiene la ejecución y muestra mensaje propio',async()=>{
  const f=fixture('COMANDO MENSAJE "demo"\n RESPONDER_ERROR("Falta algo")\n RESPONDER "Nunca"\nFIN');
  const result=(await f.send('!demo'))[0];assert.match(result.content,/Falta algo/);assert.equal(f.runs,1);
});
await test('USO_COMANDO fuera de comando produce error claro',()=>{
  const f=createStdlib();assert.throws(()=>f.USO_COMANDO(),/contexto de comando requerido/);
});
await test('TIENE_PERMISO_BOT consulta permiso del bot real',async()=>{
  const g={members:{me:{permissions:{has:(name:string)=>name==='KickMembers'}}}};
  const f=createDiscordHelpers({PermissionFlagsBits:{KickMembers:2n}},()=>({user:{id:IDs.bot}}),()=>({servidor:g}));
  assert.equal(await f.TIENE_PERMISO_BOT('EXPULSAR_MIEMBROS'),true);
  assert.equal(await f.TIENE_PERMISO_BOT('BANEAR_MIEMBROS'),false);
});
await test('TIENE_PERMISO_BOT no presupone permiso fuera de servidor',async()=>{
  const f=createDiscordHelpers({},()=>({user:{id:IDs.bot}}),()=>({}));
  await assert.rejects(()=>f.TIENE_PERMISO_BOT('BANEAR_MIEMBROS'),/contexto de servidor requerido/);
});
await test('ESPERAR_MENSAJE filtra por autor y bots en el canal actual',async()=>{
  let opts:any;
  const awaited={author:{id:IDs.u1},content:'respondi'};
  const channel={awaitMessages:async(o:any)=>{opts=o;return {first:()=>awaited};}};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:channel}));
  assert.equal(await f.ESPERAR_MENSAJE(undefined,'15s'),awaited);
  assert.equal(opts.time,15000);assert.equal(opts.max,1);
  assert.equal(opts.filter({author:{id:IDs.u1,bot:false}}),true);
  assert.equal(opts.filter({author:{id:IDs.u2,bot:false}}),false);
  assert.equal(opts.filter({author:{id:IDs.u1,bot:true}}),false);
});
await test('ESPERAR_MENSAJE devuelve undefined si vence el tiempo',async()=>{
  const channel={awaitMessages:async()=>({first:()=>undefined})};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:channel}));
  assert.equal(await f.ESPERAR_MENSAJE(undefined,'1s'),undefined);
});
await test('ESPERAR_MENSAJE rechaza tiempos inválidos y no crea collectors',async()=>{
  let called=0;const channel={awaitMessages:async()=>{called++;return {first:()=>undefined}}};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:channel}));
  for(const time of ['0s','500ms','3m','cualquier'])await assert.rejects(()=>f.ESPERAR_MENSAJE(undefined,time));
  assert.equal(called,0);
});
await test('ESPERAR_MENSAJE usa collector y lo cierra tras la respuesta',async()=>{
  const collector=new EventEmitter() as EventEmitter&{stop:(reason?:string)=>void};
  let reason:string|undefined,options:any;
  collector.stop=(r?:string)=>{reason=r;collector.emit('end');};
  const ch={createMessageCollector:(opts:any)=>{options=opts;return collector;}};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:ch}));
  const pending=f.ESPERAR_MENSAJE(undefined,'5s');
  const received={author:{id:IDs.u1},content:'hola'};
  assert.equal(options.filter(received),true);
  collector.emit('collect',received);
  assert.equal(await pending,received);assert.equal(reason,'pseudodiscord');
  assert.equal(collector.listenerCount('collect'),0);assert.equal(collector.listenerCount('end'),0);
});
await test('ESPERAR_MENSAJE respeta la cancelación del comando',async()=>{
  const ac=new AbortController();
  const collector=new EventEmitter() as EventEmitter&{stop:(reason?:string)=>void};
  let stopped='';collector.stop=(r?:string)=>{stopped=r??'';collector.emit('end');};
  const ch={createMessageCollector:()=>collector};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:ch}));
  await runExecution({maxExecutionMs:30000,maxIterations:500},ac.signal,async()=>{
    const pending=f.ESPERAR_MENSAJE(undefined,'2s');
    ac.abort();await assert.rejects(()=>pending,ExecutionCancelledError);
  });
  assert.equal(stopped,'cancelado');
});
await test('ESPERAR_MENSAJE rechaza espera mayor que el presupuesto disponible',async()=>{
  const ch={awaitMessages:async()=>{throw new Error('No debió iniciar collector');}};
  const f=createDiscordHelpers({},()=>({}),()=>({autor:{id:IDs.u1},canal:ch}));
  await runExecution({maxExecutionMs:2000,maxIterations:500},undefined,async()=>{
    await assert.rejects(()=>f.ESPERAR_MENSAJE(undefined,'3s'),/MaxExecutionMs/);
  });
});
await test('LATENCIA_BOT y TIEMPO_ACTIVO con y sin cliente',()=>{
  const f=createStdlib({client:()=>({ws:{ping:42},uptime:5100})});
  assert.equal(f.LATENCIA_BOT(),42);assert.equal(f.TIEMPO_ACTIVO(),5100);
  const empty=createStdlib();assert.equal(empty.LATENCIA_BOT(),undefined);assert.equal(empty.TIEMPO_ACTIVO(),undefined);
});
console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.11 superadas.`);
