import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {parse} from '../src/language/parser.js';
import {validate} from '../src/language/validator.js';
import {Interpreter} from '../src/runtime/interpreter.js';
import {createStdlib} from '../src/runtime/stdlib.js';
import {openPersistentStore} from '../src/runtime/storage/index.js';
import {NonOverlappingTask} from '../src/runtime/scheduler.js';
import {definePlugin, PluginManager} from '../src/plugins/manager.js';
import {satisfiesVersion} from '../src/plugins/versions.js';

let passed=0;
async function test(name:string,run:()=>void|Promise<void>){await run();passed++;console.log('  ✓',name);}
async function value(code:string,name='salida',settings:Record<string,unknown>={}):Promise<any>{
  const program=parse(code);
  const rt=new Interpreter(program,{},settings);
  await rt.initialize();return rt.globals.get(name);
}
await test('nombre acentuado duplicado es detectado estáticamente',()=>{
  const diagnostics=validate(parse('VARIABLE café = 1\nVARIABLE cafe = 2')).diagnostics;
  assert.ok(diagnostics.some(d=>d.code==='Validator-DeclaracionDuplicada-Error'&&d.severity==='error'));
});
await test('nombres locales normalizados',()=>{
  const diagnostics=validate(parse('FUNCION f()\n VARIABLE café = 1\n VARIABLE cafe = 2\nFIN FUNCION')).diagnostics;
  assert.ok(diagnostics.some(d=>d.code==='Semantic-DeclaracionDuplicada-Error'));
});
await test('mapear acepta función Pseudo',async()=>{
  assert.deepEqual(await value('FUNCION doble(x)\n RETORNAR x*2\nFIN FUNCION\nVARIABLE salida = mapear([1,2,3], doble)'),[2,4,6]);
});
await test('mapear acepta lambda con índice',async()=>{
  assert.deepEqual(await value('VARIABLE salida = mapear([1,2,3], (x, indice) => x + indice)'),[1,3,5]);
});
await test('filtrar acepta funciones Pseudo',async()=>{
  assert.deepEqual(await value('FUNCION par(x)\n RETORNAR x % 2 == 0\nFIN FUNCION\nVARIABLE salida = filtrar([1,2,3,4], par)'),[2,4]);
});
await test('reducir distingue inicial explícito de ausente',async()=>{
  assert.equal(await value('VARIABLE salida = reducir([1,2,3], (a,b) => a+b, 10)'),16);
  assert.equal(await value('VARIABLE salida = reducir([1,2,3], (a,b) => a+b)'),6);
});
await test('buscar, índice, alguno, todos y contar aceptan callbacks Pseudo',async()=>{
  const source=`FUNCION mayorDos(x)\n RETORNAR x > 2\nFIN FUNCION\nVARIABLE salida = [buscar([1,2,3], mayorDos), buscarIndice([1,2,3], mayorDos), alguno([1,2,3], mayorDos), todos([3,4], mayorDos), contar([1,2,3,4], mayorDos)]`;
  assert.deepEqual(await value(source),[3,2,true,true,2]);
});
await test('ordenar comparador lambda asíncrono mantiene orden',async()=>{
  assert.deepEqual(await value('VARIABLE salida = ordenar([4,1,2,3], (a,b) => a-b)'),[1,2,3,4]);
});
await test('callbacks externos del contexto se ejecutan desde funciones de colección',async()=>{
 const program=parse('EVENTO "test" salida\n salida.resultado = mapear([1,2], salida.fn)\nFIN');
 const rt=new Interpreter(program,{});await rt.initialize();
 const salida:any={fn:(value:number)=>value*2};
 await rt.execute((program.body[0] as any).body,{salida});
 assert.deepEqual(salida.resultado,[2,4]);
});
await test('lambda y paréntesis de precedencia se distinguen',async()=>{
  assert.equal(await value('VARIABLE salida = (1 + 2) * 3'),9);
  assert.deepEqual(await value('VARIABLE salida = mapear([2,3], x => x * x)'),[4,9]);
});
await test('REGEX y COINCIDE aceptan regex ordinarias',()=>{
  const lib=createStdlib({});assert.equal(lib.coincide('^ab+$','abbb'),true);
  assert.equal(lib.coincidencias('a','banana').length,3);
});
await test('regex admite patrones complejos nativos sin política NativeAccess',()=>{
 const lib=createStdlib();
 assert.equal(lib.regex('^(a+)+$').source,'^(a+)+$');
 assert.equal(lib.coincide('(a|aa)+$','aaaa'),true);
});
await test('regex acepta cadenas extensas como RegExp nativo',()=>{
 const lib=createStdlib();assert.equal(lib.coincide('a','a'.repeat(70_000)),true);
});
await test('regex devuelve coincidencias mediante matchAll nativo',()=>{
 const lib=createStdlib();assert.equal(lib.coincidencias('a','a'.repeat(11_000)).length,11_000);
});
await test('SQLite incrementos enteros no cambian a REAL innecesariamente',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pdiscord-sqlite-'));
  try{
    const db=await openPersistentStore({provider:'sqlite',namespace:'test',sqliteFile:join(dir,'test.sqlite')});
    try{
      await db.set('global','_','contador',9_000_000_000_000);
      assert.equal(await db.increment('global','_','contador',1),9_000_000_000_001);
      await assert.rejects(()=>db.increment('global','_','contador',Number.MAX_SAFE_INTEGER),/rango seguro/);
      assert.equal(await db.get('global','_','contador'),9_000_000_000_001);
      assert.equal(await db.increment('global','_','contador',0.5),9_000_000_000_001.5);
    }finally{await db.close();}
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('tarea programada permite cancelar y drenar',async()=>{
  let stopped=false;
  const work=new NonOverlappingTask(async(signal)=>new Promise<void>((resolve)=>{
    if(signal.aborted){stopped=true;resolve();return;}
    signal.addEventListener('abort',()=>{stopped=true;resolve();},{once:true});
  }));
  const pending=work.run();await Promise.resolve();work.stop();assert.equal(await work.drain(100),true);
  assert.equal(await pending,true);assert.equal(stopped,true);assert.equal(work.isRunning,false);
});
await test('scheduler limpia estado incluso tras error síncrono',async()=>{
  const work=new NonOverlappingTask((()=>{throw new Error('sync-fail');}) as any);
  await assert.rejects(()=>work.run(),/sync-fail/);
  assert.equal(work.isRunning,false);
});
await test('SemVer rangos ^, ~, prerelease y comparadores',()=>{
  assert.equal(satisfiesVersion('0.17.5','^0.17.0'),true);
  assert.equal(satisfiesVersion('0.18.0','^0.17.0'),false);
  assert.equal(satisfiesVersion('1.3.0','~1.2.0'),false);
  assert.equal(satisfiesVersion('1.2.9','>=1.2.0 <2.0.0'),true);
  assert.equal(satisfiesVersion('1.3.0-beta.1','>=1.2.0 <2.0.0'),false);
  assert.equal(satisfiesVersion('1.3.0-beta.1','1.3.0-beta.1'),true);
});
await test('plugins declaran dependencias y comparten servicios',async()=>{
  const manager=new PluginManager();const calls:string[]=[];
  const music=definePlugin({name:'music',version:'1.0.0',setup(api){calls.push('music');api.services.register('music','1.0.0',{add:(x:string)=>`track:${x}`});},dispose(){calls.push('dispose-music');}});
  const spotify=definePlugin({name:'spotify',version:'1.0.0',dependencies:{plugins:{music:'^1.0.0'}},setup(api){calls.push('spotify');const svc=api.services.get<{add:(x:string)=>string}>('music','^1.0.0');api.functions.register('SPOTIFY_TRACK',(x:string)=>svc.add(x));},dispose(){calls.push('dispose-spotify');}});
  await manager.load([spotify,music]);assert.deepEqual(calls,['music','spotify']);
  assert.equal(manager.functions.SPOTIFY_TRACK?.('url'),'track:url');
  await manager.dispose();assert.deepEqual(calls,['music','spotify','dispose-spotify','dispose-music']);
  assert.equal(Object.keys(manager.functions).length,0);
});
await test('plugin incompatible o dependencia circular rechazada',async()=>{
  const mgr=new PluginManager();
  await assert.rejects(()=>mgr.load([definePlugin({name:'a',version:'1.0.0',compatibility:{core:'^2.0.0'},setup(){}})]),/núcleo/);
  await assert.rejects(()=>mgr.load([definePlugin({name:'a',version:'1.0.0',dependencies:{plugins:{b:'^1.0.0'}},setup(){}}),definePlugin({name:'b',version:'1.0.0',dependencies:{plugins:{a:'^1.0.0'}},setup(){}})]),/circular/);
});
await test('carga real de plugins locales fuera de orden',async()=>{
  const root=resolve('tests/fixtures/local-plugins');
  const plugins=['./plugins/saludos.js','./plugins/texto.js'];
  const manager=new PluginManager();
  try{
    await manager.loadFromSpecifiers(plugins,root);
    const rt=new Interpreter(parse('VARIABLE salida = SALUDAR_EXTERNO("Lucía")'),{},{moduleFunctions:manager.functions});
    await rt.initialize();assert.equal(rt.globals.get('salida'),'Hola, Lucía');
  }finally{await manager.dispose();}
});
await test('motor de diagnósticos de VS Code devuelve JSON con nombres descriptivos desde stdin',()=>{
  const child=spawnSync(process.execPath,['vscode-extension/diagnose.mjs','dist/src/index.js','ejemplo.pdiscord'],{
    input:'VARIABLE café = 1\nVARIABLE cafe = 2\n',encoding:'utf8',cwd:process.cwd()
  });
  assert.equal(child.status,0,child.stderr);
  const result=JSON.parse(child.stdout);
  assert.ok(result.diagnostics.some((d:any)=>d.code==='Validator-DeclaracionDuplicada-Error'&&d.line===2));
});
console.log(`Auditoría v0.17: ${passed} pruebas de regresión superadas`);
