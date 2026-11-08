import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { PseudoClient } from '../src/runtime/pseudo-client.js';

let passed=0;
async function test(name:string,cb:()=>Promise<void>|void){
  await cb();passed++;console.log(`  ✓ v0.23 ${name}`);
}
async function run(source:string,context:Record<string,unknown>={},discord:Record<string,unknown>={}){
  const program=parse(source);
  assert.equal(validate(program,{strictNames:false}).ok,true);
  const interpreter=new Interpreter(program,discord);
  await interpreter.initialize();
  const ev=program.body.find(decl=>decl.kind==='DiscordEventDeclaration') as any;
  if (!ev) throw new Error('No se encontró el evento de prueba.');
  await interpreter.execute(ev.body,context);
  return interpreter;
}
await test('sin permisos configurables en Interpreter ni PseudoClient',()=>{
  const program=parse('EVENTO "test" salida\n salida.valor = 2\nFIN');
  const interpreter=new Interpreter(program,{});
  assert.equal('nativeAccess' in interpreter.options,false);
  assert.equal(interpreter.globals.has('IMPORTAR_JS'),true);
  assert.equal(interpreter.globals.has('discord'),true);
  assert.doesNotThrow(()=>new PseudoClient({token:'test-token',nativeAccess:false} as any));
});
await test('IMPORTAR_JS accede a los módulos estándar de Node.js',async()=>{
  const salida:Record<string,unknown>={};
  await run(`EVENTO "test" salida
    VARIABLE os = IMPORTAR_JS("node:os")
    salida.resultado = os.platform()
FIN`,{salida});
  assert.equal(typeof salida.resultado,'string');
});
await test('JAVASCRIPT puede importar módulos y modificar el contexto',async()=>{
  const salida:Record<string,unknown>={};
  await run(`EVENTO "test" salida
    JAVASCRIPT """
      const crypto = await import('node:crypto');
      pseudo.set('resultado', crypto.randomUUID());
    """
    salida.uuid = resultado
FIN`,{salida});
  assert.match(String(salida.uuid),/^[0-9a-f-]{36}$/i);
});
await test('NUEVO, llamadas nativas, callbacks y mutación de objetos externos',async()=>{
  class External { value=0;setValue(n:number){this.value=n;return this;} }
  const salida={instancia:new External(),resultado:[] as number[], callback:(value:number)=>value*4};
  await run(`EVENTO "test" salida
    VARIABLE objeto = NUEVO discord.External()
    objeto.setValue(12)
    salida.instancia.value = objeto.value
    salida.resultado = mapear([1,2,3], salida.callback)
FIN`,{salida},{External});
  assert.equal(salida.instancia.value,12);
  assert.deepEqual(salida.resultado,[4,8,12]);
});
console.log(`NativeAccess v0.23: ${passed} pruebas superadas.`);
