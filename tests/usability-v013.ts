import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { synchronizeApplicationCommands } from '../src/runtime/command-sync.js';
import { CommandCooldowns } from '../src/runtime/cooldowns.js';
import { openPersistentStore } from '../src/runtime/storage/index.js';
import { createDiscordHelpers } from '../src/runtime/discord-helpers.js';
import { parse } from '../src/language/parser.js';
import { PseudoClient } from '../src/runtime/pseudo-client.js';
import { createStdlib } from '../src/runtime/stdlib.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';

let passed=0;
async function test(name:string,fn:()=>any):Promise<void>{
  try{await fn();passed++;console.log('✓',name);}
  catch(err){console.error('✗',name);throw err;}
}
const id=(n:number)=>String(n).padStart(18,'1');
const cmd:any=parse('COMANDO MENSAJE "diario" PREFIJO "!"\n  COOLDOWN "10s" POR USUARIO\n  RESPONDER "ok"\nFIN COMANDO').body.find((x:any)=>x.kind==='DiscordCommandDeclaration');
const ctx:any={autor:{id:id(1)},servidor:{id:id(3)},canal:{id:id(4)}};

function mockManager(initial:any[]=[]){
  const stored=new Map(initial.map(x=>[`${x.type??1}:${x.name}`,{...x}]));
  const calls={set:0,create:0,edit:0,delete:0};
  const manager={
    async fetch(){return {values:()=>stored.values()};},
    async create(x:any){calls.create++;stored.set(`${x.type??1}:${x.name}`,{id:`new${calls.create}`,...x});},
    async edit(name:string,x:any){calls.edit++;const old=[...stored.values()].find(y=>y.id===name);if(!old)throw Error('unknown');stored.set(`${x.type??1}:${x.name}`,{...old,...x});},
    async set(xs:any[]){calls.set++;stored.clear();for(const x of xs)stored.set(`${x.type??1}:${x.name}`,x);},
    async delete(){calls.delete++;}
  };
  return {manager,calls,stored};
}
await test('sync incremental no elimina comandos de otras fuentes',async()=>{
  const {manager,calls,stored}=mockManager([{name:'otro',id:'X',description:'existe',type:1}]);
  const r=await synchronizeApplicationCommands(manager,[{name:'ping',description:'Ping'}]);
  assert.deepEqual(r,{created:1,updated:0,unchanged:0,deleted:0});
  assert.ok(stored.has('1:otro'));assert.ok(stored.has('1:ping'));assert.equal(calls.set,0);
});
await test('sync incremental detecta comando sin cambios',async()=>{
  const {manager,calls}=mockManager([{name:'ping',id:'X',description:'Ping',type:1}]);
  const r=await synchronizeApplicationCommands(manager,[{name:'ping',description:'Ping'}]);
  assert.equal(r.unchanged,1);assert.equal(calls.edit,0);
});
await test('sync incremental actualiza comando distinto sin borrar otros',async()=>{
  const {manager,calls,stored}=mockManager([{name:'ping',id:'X',description:'Old',type:1},{name:'otro',id:'Y',type:1}]);
  const r=await synchronizeApplicationCommands(manager,[{name:'ping',description:'Nuevo'}]);
  assert.equal(r.updated,1);assert.equal(calls.edit,1);assert.equal(stored.get('1:otro').id,'Y');
});
await test('sync distingue comando de contexto y chat con mismo nombre',async()=>{
  const {manager,calls}=mockManager([{name:'ver',id:'CTX',type:2}]);
  const r=await synchronizeApplicationCommands(manager,[{name:'ver',description:'ver comando',type:1}]);
  assert.equal(r.created,1);assert.equal(calls.create,1);
});
await test('replace debe ser explícito',async()=>{
  const {manager,calls,stored}=mockManager([{name:'extra',id:'X',type:1}]);
  await synchronizeApplicationCommands(manager,[{name:'ping',description:'Ping'}],'replace');
  assert.equal(calls.set,1);assert.equal(stored.has('1:extra'),false);
});
await test('sync off y duplicados',async()=>{
  const {manager,calls}=mockManager();
  await synchronizeApplicationCommands(manager,[{name:'ping'}],'off');assert.equal(calls.create,0);
  await assert.rejects(()=>synchronizeApplicationCommands(manager,[{name:'ping'},{name:'ping'}]),/nombre y tipo de comando duplicados/);
});
await test('cooldowns en memoria bloquean el segundo intento',async()=>{
  const cd=new CommandCooldowns();
  await cd.claim(cmd,ctx,50000);
  await assert.rejects(async()=>{await cd.claim(cmd,ctx,50001);},/Reintento en 10 segundos/);
  await cd.claim(cmd,ctx,60000);
});
await test('SQLite preserva cooldown entre reinicios',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd013-'));
  const file=join(dir,'store.sqlite');
  try{
    let store=await openPersistentStore({provider:'sqlite',namespace:'test',sqliteFile:file});
    let cd=new CommandCooldowns(store);
    await cd.claim(cmd,ctx,50000);
    await store.close();
    store=await openPersistentStore({provider:'sqlite',namespace:'test',sqliteFile:file});
    cd=new CommandCooldowns(store);
    await assert.rejects(async()=>{await cd.claim(cmd,ctx,50001);},/Reintento en 10 segundos/);
    await cd.claim(cmd,ctx,60000);
    await store.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('SQLite permite una sola reclamación con concurrencia',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd013-'));
  const file=join(dir,'store.sqlite');
  const a=await openPersistentStore({provider:'sqlite',namespace:'bot',sqliteFile:file});
  const b=await openPersistentStore({provider:'sqlite',namespace:'bot',sqliteFile:file});
  try{
    const success=await Promise.allSettled([new CommandCooldowns(a).claim(cmd,ctx,1000),new CommandCooldowns(b).claim(cmd,ctx,1000)]);
    assert.equal(success.filter(x=>x.status==='fulfilled').length,1);
    assert.equal(success.filter(x=>x.status==='rejected').length,1);
  }finally{await a.close();await b.close();await rm(dir,{recursive:true,force:true});}
});
await test('namespace aísla cooldowns persistentes',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd013-'));
  const file=join(dir,'store.sqlite');
  const a=await openPersistentStore({provider:'sqlite',namespace:'A',sqliteFile:file});
  const b=await openPersistentStore({provider:'sqlite',namespace:'B',sqliteFile:file});
  try{
    await new CommandCooldowns(a).claim(cmd,ctx,1000);
    await new CommandCooldowns(b).claim(cmd,ctx,1000);
  }finally{await a.close();await b.close();await rm(dir,{recursive:true,force:true});}
});

function fakeComponents(){
  const collector=new EventEmitter() as any;
  collector.stop=()=>collector.emit('end');
  let opts:any;
  const msg={id:id(55),createMessageComponentCollector:(o:any)=>{opts=o;return collector;}};
  return {msg,collector,getOpts:()=>opts};
}
await test('espera botón filtra usuario, ID y tipo',async()=>{
  const {msg,collector,getOpts}=fakeComponents();
  const f=createDiscordHelpers({},()=>undefined,()=>({autor:{id:id(1)}}));
  const pending=f.ESPERAR_BOTON(msg,'confirmar','2s');
  const filter=getOpts().filter;
  assert.equal(filter({user:{id:id(2)},customId:'confirmar',isButton:()=>true}),false);
  assert.equal(filter({user:{id:id(1)},customId:'otro',isButton:()=>true}),false);
  assert.equal(filter({user:{id:id(1)},customId:'confirmar',isButton:()=>false}),false);
  let acknowledgements=0;
  const click={user:{id:id(1)},customId:'confirmar',isButton:()=>true,deferUpdate:async()=>{acknowledgements++;}};
  assert.equal(filter(click),true);
  collector.emit('collect',click);
  assert.equal(await pending,click);assert.equal(acknowledgements,1);
});
await test('espera menú reconoce interacciones select',async()=>{
  const {msg,collector,getOpts}=fakeComponents();
  const f=createDiscordHelpers({},()=>undefined,()=>({autor:{id:id(1)}}));
  const waiting=f.ESPERAR_MENU(msg,'roles','2s');
  assert.equal(getOpts().filter({user:{id:id(1)},customId:'roles',isStringSelectMenu:()=>true}),true);
  collector.emit('end');
  assert.equal(await waiting,undefined);
});
await test('espera componente exige mensaje y tiempo válidos',async()=>{
  const f=createDiscordHelpers({},()=>undefined,()=>({autor:{id:id(1)}}));
  await assert.rejects(()=>f.ESPERAR_COMPONENTE({id:id(4)},'confirmar','3s'),/mensaje enviado/);
  const {msg}=fakeComponents();
  await assert.rejects(()=>f.ESPERAR_COMPONENTE(msg,'confirmar','0s'),/1–120 segundos/);
  assert.throws(()=>f.ESPERAR_COMPONENTE(msg,'confirmar','3s','otro'),/tipo no reconocido/);
});
await test('catálogo incluye las cuatro nuevas funciones',()=>{
  const f=createStdlib();
  for(const n of ['ESPERAR_COMPONENTE','ESPERAR_BOTON','ESPERAR_MENU','PUEDE_GESTIONAR_ROL']){
    assert.equal(typeof f[n],'function');
    assert.equal(PSEUDODISCORD_STDLIB.discord_facil.filter(x=>x===n).length,1);
  }
});
await test('PUEDE_GESTIONAR_ROL comprueba jerarquía y permisos',async()=>{
  const guild:any={id:id(9),ownerId:id(99),members:{cache:new Map()},roles:{cache:new Map()}};
  const actor={id:id(1),guild,permissions:{has:(p:string)=>p==='ManageRoles'},roles:{highest:{position:20}}};
  const rol={id:id(2),guild,position:10,editable:true,managed:false};
  guild.members.cache.set(actor.id,actor);guild.roles.cache.set(rol.id,rol);
  const f=createDiscordHelpers({},()=>undefined,()=>({servidor:guild,miembro:actor}));
  assert.equal(await f.PUEDE_GESTIONAR_ROL(rol),true);
  assert.equal(await f.PUEDE_GESTIONAR_ROL({...rol,position:30}),false);
  assert.equal(await f.PUEDE_GESTIONAR_ROL({...rol,managed:true}),false);
  assert.equal(await f.PUEDE_GESTIONAR_ROL({...rol,editable:false}),false);
  assert.equal(await f.PUEDE_GESTIONAR_ROL('nombre-no-es-ID'),false);
});

await test('constructor acepta opciones de sincronización y cooldown persistente',()=>{
  assert.doesNotThrow(()=>new PseudoClient({token:'x',commands:{sync:'manual',mode:'upsert'},cooldownStorage:'database',database:{provider:'sqlite',namespace:'demo',sqliteFile:'test.sqlite'}}));
});
await test('constructor rechaza cooldown persistente sin base de datos y sync inválido',()=>{
  assert.throws(()=>new PseudoClient({token:'x',cooldownStorage:'database'}),/PseudoClient-BaseDeDatos-Error/);
  assert.throws(()=>new PseudoClient({token:'x',commands:{mode:'desconocido' as any}}),/PseudoClient-ModoSync-Error/);
});
console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.13 superadas.`);
