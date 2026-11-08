import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PseudoClient } from '../src/index.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';

let passed=0;
async function test(name:string,fn:()=>void|Promise<void>):Promise<void>{
  await fn(); passed++; console.log(`  ✓ v0.22 ${name}`);
}
const dir=await mkdtemp(join(tmpdir(),'pdiscord-client22-'));
try {
  const commands=join(dir,'commands');
  await mkdir(join(commands,'nested'),{recursive:true});
  await writeFile(join(commands,'ping.pdiscord'),`COMANDO BARRA "ping" DESCRIPCION "Comprueba"
    RESPONDER "Pong"
FIN COMANDO
`);
  await writeFile(join(commands,'nested','hello.pd'),`COMANDO BARRA "hola" DESCRIPCION "Saluda"
    RESPONDER "Hola"
FIN COMANDO
`);
  await writeFile(join(dir,'common.pd'),`EXPORTAR FUNCION suma(a,b)
    RETORNAR a + b
FIN FUNCION
`);
  await test('PseudoClient carga recursivamente archivos .pd y .pdiscord desde una carpeta',async()=>{
    const c=new PseudoClient({token:'test-token',projectRoot:dir});
    c.loadCommands('./commands');
    const p=await c.compile();
    assert.deepEqual(p.body.filter(d=>d.kind==='DiscordCommandDeclaration').map((d:any)=>d.name).sort(),['hola','ping']);
    assert.equal(c.diagnostics.length,0);
  });
  await test('registra comandos inline y permite únicamente Node API',async()=>{
    const c=new PseudoClient({token:'test-token',projectRoot:dir});
    c.command({code:'COMANDO BARRA "test" DESCRIPCION "Prueba"\n RESPONDER "OK"\nFIN COMANDO',sourceName:'inline-test'});
    const p=await c.compile();
    assert.equal((p.body[0] as any).name,'test');
  });
  await test('combina fuentes y rechaza comandos de aplicación duplicados antes de conectar',async()=>{
    const c=new PseudoClient({token:'test-token',projectRoot:dir});
    c.loadCommands('./commands');
    c.command('COMANDO BARRA "ping" DESCRIPCION "Duplicado"\n RESPONDER "OK"\nFIN COMANDO');
    await assert.rejects(()=>c.compile(),/Validator-ComandoDuplicado-Error/);
  });
  await test('declara LOGIN BOT obsoleto y ofrece mensaje de migración',async()=>{
    const c=new PseudoClient({token:'token',projectRoot:dir});
    c.command('LOGIN BOT ENV "DISCORD_TOKEN"');
    await assert.rejects(()=>c.compile(),/Parser-LoginObsoleto-Error/);
  });
  await test('rechaza configuración insegura y modos desconocidos',()=>{
    assert.throws(()=>new PseudoClient({token:''}),/PseudoClient-TokenInvalido-Error/);
    assert.throws(()=>new PseudoClient({token:'a',commands:{sync:'bad' as any}}),/PseudoClient-ModoSync-Error/);
    assert.throws(()=>new PseudoClient({token:'a',commands:{cacheSeconds:-1}}),/PseudoClient-Cache-Error/);
    assert.throws(()=>new PseudoClient({token:'a',prefix:''}),/PseudoClient-Prefijo-Error/);
  });
  await test('no acepta escapar de la raíz del proyecto ni enlazar fuera de ella',async()=>{
    const c=new PseudoClient({token:'a',projectRoot:dir});c.loadCommands('../');
    await assert.rejects(()=>c.compile(),/PseudoClient-RutaExterna-Error/);
    const link=join(dir,'external');
    try{await symlink(tmpdir(),link,'dir');}catch{return;}
    const c2=new PseudoClient({token:'a',projectRoot:dir});c2.loadCommands('./external');
    await assert.rejects(()=>c2.compile(),/PseudoClient-RutaExterna-Error/);
  });
  await test('archivos importados no se registran dos veces',async()=>{
    await writeFile(join(dir,'with-import.pdiscord'),`IMPORTAR "./common.pd"\nCOMANDO BARRA "calc" DESCRIPCION "Calcular"\n RESPONDER "OK"\nFIN COMANDO\n`);
    const c=new PseudoClient({token:'a',projectRoot:dir});c.loadCommands('./with-import.pdiscord');c.loadCommands('./common.pd');
    const p=await c.compile();
    assert.equal(p.body.filter(d=>d.kind==='FunctionDeclaration').length,1);
  });
  await test('permite cliente sin comandos DSL para manejar eventos JavaScript',async()=>{
    const c=new PseudoClient({token:'a',projectRoot:dir});
    assert.equal((await c.compile()).body.length,0);
  });
  await test('no sincroniza ni publica antes de start()',async()=>{
    const c=new PseudoClient({token:'a',projectRoot:dir});
    await assert.rejects(()=>c.syncCommands(),/PseudoClient-SyncNoIniciado-Error/);
  });
  await test('start crea runtime, aplica config, registra eventos antes de login y delega sync/stop',async()=>{
    const originalStart=PseudoDiscordBot.prototype.start;
    const originalSync=PseudoDiscordBot.prototype.synchronizeCommands;
    const originalStop=PseudoDiscordBot.prototype.stop;
    let captured:any;let syncCalls=0;let stopCalls=0;
    try{
      (PseudoDiscordBot.prototype as any).start=async function(beforeLogin:any){
        captured=this.config;
        this.client=new EventEmitter();
        this.client.user={id:'123',tag:'test#0001'};
        this.client.isReady=()=>true;
        beforeLogin?.(this.client);
        return this.client;
      };
      (PseudoDiscordBot.prototype as any).synchronizeCommands=async function(force:boolean){
        syncCalls++;assert.equal(force,true);return {created:0,updated:0,unchanged:1,deleted:0};
      };
      (PseudoDiscordBot.prototype as any).stop=async function(){stopCalls++;};
      const c=new PseudoClient({token:'test-token',projectRoot:dir,prefix:'$',commands:{sync:'manual',mode:'upsert'}});
      let ready=0;
      const listener=()=>ready++;
      c.on('clientReady',listener);
      c.command('COMANDO BARRA "test" DESCRIPCION "Prueba"\n RESPONDER "OK"\nFIN COMANDO');
      const native=await c.start();
      assert.equal(c.discord,native);assert.equal(c.user.tag,'test#0001');
      assert.equal(c.isRunning,true);assert.equal(captured.syncCommands,false);assert.equal(captured.defaultPrefix,'$');
      native.emit('clientReady');assert.equal(ready,1);
      await c.syncCommands({force:true});assert.equal(syncCalls,1);
      c.off('clientReady',listener);native.emit('clientReady');assert.equal(ready,1);
      assert.throws(()=>c.loadCommands('./commands'),/PseudoClient-ComandosBloqueados-Error/);
      await assert.rejects(()=>c.start(),/PseudoClient-InicioDuplicado-Error/);
      await c.stop();assert.equal(stopCalls,1);assert.equal(c.isRunning,false);
    } finally {
      PseudoDiscordBot.prototype.start=originalStart;
      PseudoDiscordBot.prototype.synchronizeCommands=originalSync;
      PseudoDiscordBot.prototype.stop=originalStop;
    }
  });
  await test('prefijo por defecto de JavaScript se aplica antes de validar colisiones',async()=>{
    const c=new PseudoClient({token:'token',projectRoot:dir,prefix:'$'});
    c.command('COMANDO MENSAJE "hola"\n RESPONDER "OK"\nFIN COMANDO');
    c.command('COMANDO MENSAJE "hola" PREFIJO "$"\n RESPONDER "Otro"\nFIN COMANDO');
    await assert.rejects(()=>c.compile(),/Validator-PrefijoDuplicado-Error/);
  });
  await test('stop espera las solicitudes manuales pendientes antes de destruir el cliente',async()=>{
    const p={kind:'Program',version:'0.11',body:[]} as any;
    const bot=new PseudoDiscordBot(p,{projectRoot:dir,commandSyncMode:'upsert',commandSyncCacheSeconds:0});
    let release!:()=>void;
    const gate=new Promise<void>(r=>{release=r;});
    let entered!:()=>void;
    const started=new Promise<void>(r=>{entered=r;});
    let destroyed=false;
    const manager={fetch:async()=>{entered();await gate;return new Map();},create:async()=>{},edit:async()=>{}};
    bot.client={isReady:()=>true,user:{id:'123456789012345678'},application:{id:'123456789012345678',commands:manager},destroy:async()=>{destroyed=true;}};
    const sync=bot.synchronizeCommands();
    await started;
    const stopping=bot.stop();
    await new Promise(r=>setTimeout(r,10));
    assert.equal(destroyed,false);
    release();
    await sync;await stopping;
    assert.equal(destroyed,true);
  });
  await test('puede recuperarse tras un error de compilación antes del inicio',async()=>{
    const c=new PseudoClient({token:'token',projectRoot:dir});
    c.command('IMPORTAR "./foo.pd"');
    await assert.rejects(()=>c.start(),/PseudoClient-ImportInline-Error/);
    assert.equal(c.isRunning,false);
  });
} finally{await rm(dir,{recursive:true,force:true});}
console.log(`PseudoClient v0.22: ${passed} pruebas superadas.`);
