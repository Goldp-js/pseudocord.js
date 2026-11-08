import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from '../src/language/parser.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { evaluateBinary } from '../src/runtime/operators.js';
import { createStorageBindings } from '../src/runtime/storage/bindings.js';
import { openPersistentStore, type PersistentStore, type StorageScope } from '../src/runtime/storage/index.js';
import { verifyCommandArgument, convertMessageArgument, splitMessageArguments, matchesCustomId } from '../src/runtime/commands/arguments.js';
import { parseDuration } from '../src/runtime/duration.js';
import { matchesCronExpression } from '../src/runtime/cron.js';
import { normalizeMessagePayload } from '../src/runtime/discord/payload.js';
import { constructDiscordBuilder } from '../src/runtime/discord/builders.js';
import { assertDiscordActionPermission } from '../src/runtime/discord/action-permissions.js';
import { COMMAND_INVOCATION } from '../src/runtime/command-context.js';

let passed=0;
async function test(name:string,run:()=>void|Promise<void>):Promise<void>{
  await run(); passed++; console.log(`  ✓ v0.20 ${name}`);
}
async function evaluate(source:string,name='salida',settings:Record<string,unknown>={}):Promise<any>{
  const interpreter=new Interpreter(parse(source),{},settings);
  await interpreter.initialize();
  return interpreter.globals.get(name);
}

await test('las tablas del parser conservan precedencia y alias de eventos',async()=>{
  assert.equal(await evaluate('VARIABLE salida = 2 + 3 * 4'),14);
  assert.equal(await evaluate('VARIABLE salida = 2 ** 3 ** 2'),512);
  const event=parse('AL INICIAR\nFIN AL').body[0];
  assert.equal(event?.kind,'DiscordEventDeclaration');
  if(event?.kind==='DiscordEventDeclaration') assert.equal(event.event,'clientReady');
});
await test('operadores numéricos extraídos mantienen coacciones del lenguaje',()=>{
  assert.equal(evaluateBinary('+',2,3),5);
  assert.equal(evaluateBinary('<<',3,2),12);
  assert.equal(evaluateBinary('CONTIENE',[1,2,3],2),true);
  assert.equal(evaluateBinary('NO_EN','x',new Set(['x'])),false);
});
await test('operadores regex usan RegExp nativo',()=>{
  assert.equal(evaluateBinary('COINCIDE','abc','^a'),true);
  assert.equal(evaluateBinary('COINCIDE','aaa','(a+)+$'),true);
  assert.equal(evaluateBinary('NO_COINCIDE','abc',/z/),true);
});
await test('los nombres de operadores desconocidos conservan el error',()=>{
  assert.throws(()=>evaluateBinary('??invalid',1,2),/operador no admitido/);
});
await test('duraciones tienen el mismo resultado en bot e intérprete',()=>{
  assert.equal(parseDuration(450),450);
  assert.equal(parseDuration('5s'),5000);
  assert.equal(parseDuration('2 m'),120000);
  assert.equal(parseDuration('1H'),3600000);
  assert.equal(parseDuration('1d'),86400000);
  assert.equal(Number.isNaN(parseDuration('imposible')),true);
});
await test('cron se puede comprobar sin instanciar un bot',()=>{
  const date=new Date(2026,10,8,12,15);
  assert.equal(matchesCronExpression('15 12 * * *',date),true);
  assert.equal(matchesCronExpression('*/5 * * * *',date),true);
  assert.equal(matchesCronExpression('16 12 * * *',date),false);
  assert.equal(matchesCronExpression('not-cron',date),false);
});
await test('separador de argumentos respeta comillas y escapes',()=>{
  assert.deepEqual(splitMessageArguments('avisar "hola mundo" 42'),['avisar','hola mundo','42']);
  assert.deepEqual(splitMessageArguments('mensaje "hola \\"Ana\\""'),['mensaje','hola "Ana"']);
});
await test('validación de argumentos mantiene reglas de tipo y tamaño',()=>{
  verifyCommandArgument({name:'edad',kind:'entero',required:true,minValue:1,maxValue:120},18);
  assert.throws(()=>verifyCommandArgument({name:'edad',kind:'entero',required:true},undefined),/requerido/);
  assert.throws(()=>verifyCommandArgument({name:'edad',kind:'entero',minValue:1},0),/mínimo/);
  assert.throws(()=>verifyCommandArgument({name:'mensaje',kind:'texto',maxLength:3},'cuatro'),/máximo/);
  assert.throws(()=>verifyCommandArgument({name:'plan',kind:'texto',choices:[{value:'A'}]},'B'),/elecciones/);
});
await test('conversión de comandos de prefijo mantiene booleanos y números',async()=>{
  assert.equal(await convertMessageArgument('42','entero',{},0),42);
  assert.equal(await convertMessageArgument('sí','booleano',{},0),true);
  assert.equal(await convertMessageArgument('OFF','booleano',{},0),false);
  assert.equal(await convertMessageArgument('1.25','numero',{},0),1.25);
  await assert.rejects(()=>convertMessageArgument('2.1','entero',{},0),/entero seguro/);
});
await test('IDs personalizados respetan patrón exacto o prefijo',()=>{
  assert.equal(matchesCustomId('ayuda:*','ayuda:7'),true);
  assert.equal(matchesCustomId('ayuda:*','otra:7'),false);
  assert.equal(matchesCustomId('ayuda','ayuda:7'),false);
  assert.equal(matchesCustomId(undefined,'libre'),true);
});
await test('el payload de mensaje no filtra metadatos internos',()=>{
  assert.deepEqual(normalizeMessagePayload({__pdKind:'message',content:'Hola'}),{content:'Hola'});
  assert.deepEqual(normalizeMessagePayload({__pdKind:'poll',question:{text:'¿?'}}),{poll:{question:{text:'¿?'}}});
  assert.equal(normalizeMessagePayload('simple'),'simple');
});
await test('el constructor de mensajes usa propiedades evaluadas',async()=>{
  const result=await constructDiscordBuilder({builderKind:'message'},[
    {key:'CONTENIDO',args:['Hola'],flags:[]},
    {key:'EFIMERO',args:[],flags:[]},
    {key:'ARCHIVO',args:[{name:'reporte.txt'}],flags:[]}
  ],{});
  assert.equal(result.content,'Hola');
  assert.equal(result.ephemeral,true);
  assert.deepEqual(result.files,[{name:'reporte.txt'}]);
  assert.equal(result.__pdKind,'message');
});
await test('la encuesta y el mensaje mantienen el formato previo',async()=>{
  const poll=await constructDiscordBuilder({builderKind:'poll'},[
    {key:'PREGUNTA',args:['¿Sí?'],flags:[]},
    {key:'OPCION',args:['Sí'],flags:[]},
    {key:'OPCION',args:['No'],flags:[]},
    {key:'MULTIPLE',args:[],flags:[]}
  ],{});
  assert.equal(poll.answers.length,2);
  const msg=await constructDiscordBuilder({builderKind:'message'},[{key:'ENCUESTA',args:[poll],flags:[]}],{});
  assert.equal(msg.poll.__pdKind,undefined);
  assert.equal(msg.poll.question.text,'¿Sí?');
});
await test('acciones Discord conservan RESPONDER con contexto simulado',async()=>{
  const replies:unknown[]=[];
  const interpreter=new Interpreter(parse('VARIABLE salida = 1'),{});
  await interpreter.initialize();
  await interpreter.execute([{kind:'DiscordActionStatement',action:'reply',arguments:[{kind:'LiteralExpression',value:'Hola',literalType:'texto'}]} as any],{
    mensaje:{reply:async(value:unknown)=>{replies.push(value);return value;}}
  });
  assert.deepEqual(replies,['Hola']);
});
await test('autorización administrativa conserva tratamiento de eventos',()=>{
  assert.doesNotThrow(()=>assertDiscordActionPermission('deleteMessage',{},undefined,{}));
  assert.throws(()=>assertDiscordActionPermission('deleteMessage',{[COMMAND_INVOCATION]:true},undefined,{}),/contexto de servidor/);
  assert.doesNotThrow(()=>assertDiscordActionPermission('send',{[COMMAND_INVOCATION]:true},undefined,{}));
});
await test('bindings de persistencia son independientes del intérprete',async()=>{
  const values=new Map<string,unknown>();
  const key=(s:StorageScope,o:string,k:string)=>`${s}:${o}:${k}`;
  const store:PersistentStore={
    get:async(s,o,k)=>values.get(key(s,o,k)),
    set:async(s,o,k,v)=>{values.set(key(s,o,k),v);},
    delete:async(s,o,k)=>values.delete(key(s,o,k)),
    increment:async(s,o,k,n)=>{const v=Number(values.get(key(s,o,k))??0)+n;values.set(key(s,o,k),v);return v;},
    claimCooldown:async()=>0,cooldownRemaining:async()=>0,close:async()=>{}
  };
  const fn=createStorageBindings(()=>store);
  assert.equal(Object.keys(fn).length,12);
  await fn.GUARDAR_GLOBAL!('contador',10);
  assert.equal(await fn.OBTENER_GLOBAL!('contador',0),10);
  assert.equal(await fn.INCREMENTAR_GLOBAL!('contador',5),15);
  assert.equal(await fn.BORRAR_GLOBAL!('contador'),true);
  assert.equal(await fn.OBTENER_GLOBAL!('contador',-1),-1);
  await fn.GUARDAR_USUARIO!({id:'123'},'puntos',8);
  assert.equal(await fn.OBTENER_USUARIO!({id:'123'},'puntos'),8);
});
await test('bindings sin proveedor conservan diagnóstico de configuración',async()=>{
  const fn=createStorageBindings(()=>undefined);
  await assert.rejects(()=>fn.OBTENER_GLOBAL!('dato',null),/Persistencia no disponible/);
});
await test('SQLite conserva contrato público tras separar proveedores',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd-refactor20-'));
  try{
    const store=await openPersistentStore({provider:'sqlite',namespace:'refactor',sqliteFile:join(dir,'db.sqlite')});
    try{
      await store.set('usuario','1','puntos',{total:3});
      assert.deepEqual(await store.get('usuario','1','puntos'),{total:3});
      assert.equal(await store.increment('global','_','contador',2),2);
      assert.equal(await store.increment('global','_','contador',3),5);
      assert.equal(await store.claimCooldown('f',1000,5000),0);
      assert.equal(await store.cooldownRemaining('f',2000),3000);
      assert.equal(await store.delete('usuario','1','puntos'),true);
    }finally{await store.close();}
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('se mantienen nombres de diagnósticos tras refactorizar',()=>{
  const program=parse('VARIABLE café = 1\nVARIABLE cafe = 2');
  assert.equal(program.kind,'Program');
});

console.log(`v0.20: ${passed} pruebas nuevas de módulos y compatibilidad superadas`);
