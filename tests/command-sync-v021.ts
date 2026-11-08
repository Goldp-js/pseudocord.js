import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from '../src/language/parser.js';
import { PseudoClient } from '../src/runtime/pseudo-client.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';
import { canonicalCommand, fingerprint, sameCommand, synchronizeApplicationCommands } from '../src/runtime/command-sync.js';

let passed=0;
async function test(name:string, fn:()=>Promise<void>|void) {
  try {await fn();passed++;console.log('✓',name);}
  catch(e) {console.error('✗',name);throw e;}
}
const app='123456789012345678';const guild='987654321098765432';
function managerFactory(initial:any[] = [], opts:{failEdit?:boolean;delay?:number}={}) {
  const remote = new Map(initial.map(x=>[`${x.type??1}:${x.name}`, {...x}]));
  const calls={fetch:0,create:0,edit:0,delete:0,set:0};
  let next=10;
  const manager={
    async fetch(){calls.fetch++;return {values:()=>remote.values()};},
    async create(cmd:any){calls.create++;if(opts.delay)await new Promise(r=>setTimeout(r,opts.delay));const created={...cmd,id:`123456789012345${next++}`};remote.set(`${cmd.type??1}:${cmd.name}`,created);return created;},
    async edit(id:string,cmd:any){calls.edit++;if(opts.failEdit)throw Error('failed edit');const old=[...remote.values()].find(x=>x.id===id);if(!old)throw Error('unknown ID');const updated={...old,...cmd};remote.set(`${cmd.type??1}:${cmd.name}`,updated);return updated;},
    async delete(id:string){calls.delete++;const entry=[...remote].find(([,v])=>v.id===id);if(entry)remote.delete(entry[0]);},
    async set(cmds:any[]){calls.set++;remote.clear();for(const c of cmds)remote.set(`${c.type??1}:${c.name}`,{...c,id:`123456789012345${next++}`});return {values:()=>remote.values()};}
  };
  return {manager,calls,remote};
}
const ping = {name:'ping',description:'ping',type:1,options:[]};
const userOption={name:'usuario',type:6,description:'El usuario',required:true};
await test('huella estable ignora el cuerpo y orden de claves de los comandos',()=>{
  const a={...ping,body:[{kind:'Reply',text:'a'}]};
  const b={options:[],body:[{kind:'Reply',text:'b'}],description:'ping',name:'ping',type:1};
  assert.equal(fingerprint([a]),fingerprint([b]));
});
await test('opciones eliminadas provocan una modificación',async()=>{
  const x=managerFactory([{...ping,id:'123456789012345999',options:[userOption]}]);
  const s=await synchronizeApplicationCommands(x.manager,[ping]);
  assert.equal(s.updated,1);assert.equal(x.calls.edit,1);assert.deepEqual(x.remote.get('1:ping').options,[]);
});
await test('permisos PermissionBitField equivalentes no generan PATCH',async()=>{
  const x=managerFactory([{...ping,id:'123456789012345999',defaultMemberPermissions:{bitfield:8n}}]);
  const s=await synchronizeApplicationCommands(x.manager,[{...ping,default_member_permissions:'8'}]);
  assert.equal(s.unchanged,1);assert.equal(x.calls.edit,0);
});
await test('permisos omitidos o borrados se comparan con null',async()=>{
  const x=managerFactory([{...ping,id:'123456789012345999',defaultMemberPermissions:{bitfield:8n}}]);
  const s=await synchronizeApplicationCommands(x.manager,[{...ping,default_member_permissions:null}]);
  assert.equal(s.updated,1);assert.equal(x.calls.edit,1);
});
await test('propiedades reordenadas no ocasionan actualizaciones',async()=>{
  const x=managerFactory([{id:'123456789012345999',options:[],name:'ping',type:1,description:'ping'}]);
  assert.equal((await synchronizeApplicationCommands(x.manager,[{description:'ping',name:'ping',options:[],type:1}])).unchanged,1);
  assert.equal(x.calls.edit,0);
});
await test('campos no controlados por DSL no disparan falsos PATCH',()=>{
  assert.ok(sameCommand({...ping,contexts:[0,1],integrationTypes:[0,1]},ping));
  assert.ok(sameCommand({...ping,dmPermission:false,defaultMemberPermissions:{bitfield:8n}}, ping));
  assert.equal(sameCommand({...ping,contexts:[0,1]}, {...ping,contexts:[0]}),false);
});
await test('cambios de descripción, permisos NSFW, contexto y subcomandos son visibles',()=>{
  assert.equal(sameCommand(ping,{...ping,description:'nuevo'}),false);
  assert.equal(sameCommand(ping,{...ping,nsfw:true}),false);
  assert.equal(sameCommand(ping,{...ping,dm_permission:false}),false);
  assert.equal(sameCommand(ping,{...ping,options:[{name:'a',description:'a',type:1,options:[userOption]}]}),false);
  assert.equal(sameCommand({...ping,nameLocalizations:{en:'ping'}}, {...ping,name_localizations:null}),false);
  assert.equal(sameCommand({...ping,nameLocalizations:{en:'ping'}},ping),true);
});
await test('localizaciones vacías de Discord equivalen a sin localizaciones',()=>{
  assert.ok(sameCommand({...ping,nameLocalizations:{}},{...ping,name_localizations:null}));
});
await test('arrays de tipos de canal sin orden significativo no provocan PATCH',()=>{
  const opt={...userOption,type:7,channel_types:[0,2]};
  const opt2={...userOption,type:7,channelTypes:[2,0]};
  assert.ok(sameCommand({...ping,options:[opt]},{...ping,options:[opt2]}));
});
await test('duplicados y tipos inválidos se rechazan antes de cualquier REST',async()=>{
  const x=managerFactory();
  await assert.rejects(()=>synchronizeApplicationCommands(x.manager,[ping,{...ping}]),/nombre y tipo de comando duplicados/);
  await assert.rejects(()=>synchronizeApplicationCommands(x.manager,[{name:'z',type:14}]),/CommandSync-ComandoInvalido-Error/);
  assert.deepEqual(x.calls,{fetch:0,create:0,edit:0,delete:0,set:0});
});
await test('replace no hace PUT si ya coinciden comandos',async()=>{
  const x=managerFactory([{...ping,id:'123456789012345999'}]);
  assert.deepEqual(await synchronizeApplicationCommands(x.manager,[ping],'replace'),{created:0,updated:0,unchanged:1,deleted:0});
  assert.equal(x.calls.set,0);assert.equal(x.calls.fetch,1);
});
await test('replace registra altas, bajas y actualizaciones reales',async()=>{
  const x=managerFactory([{...ping,id:'123456789012345999'},{...ping,name:'extra',id:'123456789012345998'}]);
  assert.deepEqual(await synchronizeApplicationCommands(x.manager,[{...ping,description:'new'},{...ping,name:'otro'}],'replace'),{created:1,updated:1,unchanged:0,deleted:1});
  assert.equal(x.calls.set,1);
});
const root = await mkdtemp(join(tmpdir(),'pdiscord-sync21-'));
try {
  const config={projectRoot:root,applicationId:app,ttlMs:900_000};
  await test('caché evita GET y todas las escrituras en segunda sincronización',async()=>{
    const x=managerFactory();
    const first=await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:config});
    let hit=0;
    const second=await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:config,onCacheHit:()=>hit++});
    assert.equal(first.created,1);assert.equal(second.unchanged,1);
    assert.equal(hit,1);assert.deepEqual(x.calls,{fetch:1,create:1,edit:0,delete:0,set:0});
  });
  await test('renombrado solo elimina comandos propios con autorización explícita',async()=>{
    const x=managerFactory([{...ping,name:'ajeno',id:'123456789012345123'}]);
    const opt={cache:{...config,applicationId:'123456789012345679'},pruneManaged:true};
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',opt);
    const outcome=await synchronizeApplicationCommands(x.manager,[{...ping,name:'nuevo'}],'upsert',opt);
    assert.equal(outcome.deleted,1);assert.equal(x.remote.has('1:ping'),false);assert.equal(x.remote.has('1:ajeno'),true);
    assert.equal(x.calls.delete,1);
  });
  await test('comandos reemplazados externamente no se eliminan por un ID viejo',async()=>{
    const x=managerFactory();
    const opt={cache:{...config,applicationId:'123456789012345680'},pruneManaged:true};
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',opt);
    x.remote.set('1:ping',{...ping,id:'123456789012345222'});
    const s=await synchronizeApplicationCommands(x.manager,[],'upsert',opt);
    assert.equal(s.deleted,0);assert.equal(x.remote.has('1:ping'),true);
  });
  await test('cache separada por scope global/servidor',async()=>{
    const x=managerFactory();
    const different={...config,applicationId:'123456789012345681'};
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:different});
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:{...different,guildId:guild}});
    assert.equal(x.calls.fetch,2);
  });
  await test('forzar reconciliación evita shortcut de caché',async()=>{
    const x=managerFactory();
    const opt={cache:{...config,applicationId:'123456789012345682'}};
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',opt);
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:{...opt.cache,force:true}});
    assert.equal(x.calls.fetch,2);
  });
  await test('caché corrupta nunca suprime una consulta necesaria',async()=>{
    const x=managerFactory();
    const cfg={...config,applicationId:'123456789012345689'};
    const {cacheFile}=await import('../src/runtime/command-sync/cache.js');
    await mkdir(join(root,'.pdiscord','command-sync'),{recursive:true});
    await writeFile(cacheFile(cfg),'{datos rotos');
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',{cache:cfg});
    assert.equal(x.calls.fetch,1);
  });
  await test('TTL cero consulta Discord en cada ejecución',async()=>{
    const x=managerFactory();
    const opt={cache:{...config,applicationId:'123456789012345683',ttlMs:0}};
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',opt);
    await synchronizeApplicationCommands(x.manager,[ping],'upsert',opt);
    assert.equal(x.calls.fetch,2);
  });
  await test('errores en API no escriben caché de nuevo estado',async()=>{
    const x=managerFactory([{...ping,description:'old',id:'123456789012345345'}],{failEdit:true});
    const opt={cache:{...config,applicationId:'123456789012345684'}};
    await assert.rejects(()=>synchronizeApplicationCommands(x.manager,[ping],'upsert',opt),/failed edit/);
    await assert.rejects(()=>synchronizeApplicationCommands(x.manager,[ping],'upsert',opt),/failed edit/);
    assert.equal(x.calls.fetch,2);
  });
  await test('sincronizaciones concurrentes de una misma aplicación se serializan',async()=>{
    const x=managerFactory([],{delay:20});
    const opt={cache:{...config,applicationId:'123456789012345685'}};
    await Promise.all([synchronizeApplicationCommands(x.manager,[ping],'upsert',opt),synchronizeApplicationCommands(x.manager,[ping],'upsert',opt)]);
    assert.equal(x.calls.create,1);assert.equal(x.calls.fetch,1);
  });
  await test('prune requiere cache válida y capacidad de borrar',async()=>{
    const x=managerFactory();
    await assert.rejects(()=>synchronizeApplicationCommands(x.manager,[],'upsert',{pruneManaged:true}),/requiere una caché/);
    assert.equal(x.calls.fetch,0);
  });
  await test('sin comandos locales también se sincroniza si no hay router de interacciones',async()=>{
    const x=managerFactory();
    const bot = new PseudoDiscordBot({kind:'Program',body:[]} as any,{projectRoot:root,commandSyncCacheSeconds:0});
    const client=new EventEmitter() as any;
    client.user={id:'123456789012345686'};
    client.application={id:'123456789012345686',commands:x.manager};
    bot.client=client;
    (bot as any).attachInteractionRouter();
    assert.equal(client.listenerCount('clientReady'),1);
    client.emit('clientReady');
    await Promise.all([...(bot as any).activeCommandSyncTasks]);
    assert.equal(x.calls.fetch,1);
  });
  await test('PseudoClient controla caché y limpieza administrada sin configuración JSON',()=>{
    assert.doesNotThrow(()=>new PseudoClient({token:'x',commands:{sync:'manual',cacheSeconds:0,pruneManaged:true}}));
    assert.throws(()=>new PseudoClient({token:'x',commands:{cacheSeconds:-1}}),/PseudoClient-Cache-Error/);
  });
  await test('comandos chat enviados al API incluyen limpieza explícita de permisos',()=>{
    const cmd=parse('COMANDO BARRA "ping" DESCRIPCION "Ping"\n RESPONDER "pong"\nFIN COMANDO').body[0];
    const bot=new PseudoDiscordBot({kind:'Program',body:[]} as any);
    bot.discord={ApplicationCommandOptionType:{},PermissionFlagsBits:{}};
    const data=(bot as any).commandData(cmd);
    assert.equal(data.default_member_permissions,null);
    assert.equal(data.dm_permission,true);assert.equal(data.nsfw,false);
  });
  await test('estado persistente válido nunca almacena cuerpos ni credenciales',async()=>{
    const x=managerFactory();
    const opt={cache:{...config,applicationId:'123456789012345687'}};
    await synchronizeApplicationCommands(x.manager,[{...ping,body:[{token:'SECRET',value:'RESPONDER'}]}],'upsert',opt);
    const {cacheFile}=await import('../src/runtime/command-sync/cache.js');
    const saved=await readFile(cacheFile(opt.cache),'utf8');
    assert.equal(saved.includes('SECRET'),false); assert.equal(saved.includes('RESPONDER'),false);
  });
} finally { await rm(root,{recursive:true,force:true}); }
console.log(`CommandSync v0.21: ${passed} pruebas superadas`);
