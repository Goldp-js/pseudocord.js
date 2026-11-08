import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse, parseExpressionText } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { loadProgramFile } from '../src/language/loader.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { createStdlib } from '../src/runtime/stdlib.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';
let passes=0;
async function test(title:string, fn:()=>unknown|Promise<unknown>){
 try{await fn();passes++;console.log('✓ v0.6 '+title);}catch(e){console.error('✗ v0.6 '+title);throw e;}
}
async function execute(source:string,variables:Record<string,unknown>={}){
 const p=parse(`EVENTO "test" salida\n${source}\nFIN\n`);
 const i=new Interpreter(p,{});await i.initialize();
 const event=p.body[0] as any;const salida:any={};
 await i.execute(event.body,{salida,...variables});return salida;
}
await test('alias matemáticos y de conversión, sin cambiar nombres existentes',()=>{
 const f=createStdlib();assert.equal(f.RC(81),9);assert.equal(f.RAIZ(16),4);
 assert.equal(f.SEN(Math.PI/2),1);assert.equal(f.ASEN(1),Math.PI/2);
 assert.equal(f.TRUNC(-3.8),-3);assert.equal(f.REDON(2.7),3);
 assert.equal(f.CONVERTIRANUMERO('123'),123);assert.equal(f.CONVERTIRATEXTO(123),'123');
 assert.equal(f.LOG_DECIMAL(100),2);
});
await test('AZAR entero dentro de [0,n); ALEATORIO_ENTERO inclusivo',()=>{
 const f=createStdlib();for(let i=0;i<200;i++){const x=f.AZAR(7);assert.equal(Number.isInteger(x),true);assert.ok(x>=0&&x<7);const y=f.ALEATORIO_ENTERO(-2,4);assert.ok(Number.isInteger(y)&&y>=-2&&y<=4);}
 assert.throws(()=>f.AZAR(0),/AZAR/);assert.throws(()=>f.AZAR(2.5),/AZAR/);
 assert.throws(()=>f.ALEATORIO_ENTERO(4,2),/ALEATORIO_ENTERO/);
 assert.equal(f.aleatorio(0,1)>=0,true);
});
await test('SUBCADENA fin inclusivo base cero y CONCATENAR polimórfico',()=>{
 const f=createStdlib();assert.equal(f.SUBCADENA('abcdef',1,3),'bcd');assert.equal(f.subtexto('abcdef',1,3),'bcd');
 assert.equal(f.SUBCADENA('abc',0,0),'a');assert.throws(()=>f.SUBCADENA('abc',-1,2),/SUBCADENA/);
 assert.equal(f.concatenar('Hola ','mundo'),'Hola mundo');assert.deepEqual(f.concatenar([1,2],[3]),[1,2,3]);
 assert.equal(f.CONCATENAR_TEXTO('A',3),'A3');
});
await test('MOD y <- se convierten en operaciones AST correctas',async()=>{
 const expr=parseExpressionText('14 MOD 5');assert.equal((expr as any).operator,'%');
 const result=await execute('  VARIABLE n <- 14 MOD 5\n  n <- n + 3\n  salida.resultado = n');
 assert.equal(result.resultado,7);
});
await test('^ sigue siendo XOR; ** es potencia',async()=>{
 const a=parseExpressionText('2 ^ 3');const b=parseExpressionText('2 ** 3');
 assert.equal((a as any).operator,'BIT_XOR');assert.equal((b as any).operator,'**');
 const result=await execute('  salida.xor = 2 ^ 3\n  salida.potencia = 2 ** 3');
 assert.equal(result.xor,1);assert.equal(result.potencia,8);
});
await test('DIMENSION bidimensional: lectura, escritura y límites',async()=>{
 const result=await execute('  DIMENSION matriz[2,3]\n  matriz[1][2] = 42\n  salida.valor = matriz[1][2]\n  salida.ancho = longitud(matriz[0])\n  salida.alto = longitud(matriz)');
 assert.deepEqual(result,{valor:42,ancho:3,alto:2});
 await assert.rejects(()=>execute('  DIMENSION m[2,3]\n  salida.x = m[2][0]'),/fuera de rango/);
 await assert.rejects(()=>execute('  DIMENSION m[2,3]\n  m[0][3] = 4'),/fuera de rango/);
});
await test('DIMENSION rechaza decimales, negativos y tamaños enormes',async()=>{
 await assert.rejects(()=>execute('  DIMENSION m[-1]'),/no negativo/);
 await assert.rejects(()=>execute('  DIMENSION m[3.5]'),/no negativo/);
 await assert.rejects(()=>execute('  DIMENSION m[5000,5000]'),/excede/);
 await assert.rejects(()=>execute('  DIMENSION m[1000000,0]'),/excede/);
});
await test('DIMENSION es una declaración visible al analizador estricto',()=>{
 const p=parse('FUNCION f()\n  DIMENSION m[2,3]\n  m[0][0] = 1\n  RETORNAR m[0][0]\nFIN\n');
 const d=validate(p,{strictNames:true}).diagnostics.filter(x=>x.severity==='error');assert.deepEqual(d,[]);
});
await test('REPETIR...HASTA QUE ejecuta al menos una vez',async()=>{
 const result=await execute('  VARIABLE n = 0\n  REPETIR\n    n++\n  HASTA QUE n >= 3\n  salida.valor = n');
 assert.equal(result.valor,3);
 const once=await execute('  VARIABLE n = 0\n  REPETIR\n    n++\n  HASTA QUE VERDADERO\n  salida.valor = n');assert.equal(once.valor,1);
});
await test('REPETIR...HASTA QUE admite CONTINUAR y ROMPER',async()=>{
 const result=await execute('  VARIABLE n = 0\n  VARIABLE total = 0\n  REPETIR\n    n++\n    SI n < 3\n      CONTINUAR\n    FIN\n    total += n\n    SI n = 4\n      ROMPER\n    FIN\n  HASTA QUE n > 10\n  salida.total = total');
 assert.equal(result.total,7);
});
await test('REPETIR N VECES anterior sigue funcionando',async()=>{
 const result=await execute('  VARIABLE n = 0\n  REPETIR 4 VECES\n    n++\n  FIN REPETIR\n  salida.valor = n');assert.equal(result.valor,4);
});
await test('SUBPROCESO POR REFERENCIA modifica la variable original',async()=>{
 const p=parse('SUBPROCESO sumarUno(POR REFERENCIA n: ENTERO)\n  n++\nFIN SUBPROCESO\nEVENTO "test" salida\n  VARIABLE x: ENTERO = 12\n  sumarUno(x)\n  salida.valor = x\nFIN\n');
 assert.equal(validate(p,{strictNames:true}).ok,true);
 const i=new Interpreter(p);await i.initialize();const result:any={};await i.execute((p.body[1] as any).body,{salida:result});assert.equal(result.valor,13);
});
await test('POR REFERENCIA pospuesto y llamada recursiva',async()=>{
 const p=parse('FUNCION inc(n POR REFERENCIA: ENTERO)\n  n = n + 1\nFIN\nEVENTO "test" salida\n  VARIABLE v: ENTERO = 7\n  inc(v)\n  salida.valor = v\nFIN\n');
 const i=new Interpreter(p);await i.initialize();const result:any={};await i.execute((p.body[1] as any).body,{salida:result});assert.equal(result.valor,8);
});
await test('POR REFERENCIA rechaza constantes y expresiones',async()=>{
 const p=parse('FUNCION inc(POR REFERENCIA x)\n  x++\nFIN\nEVENTO "test" salida\n  CONSTANTE x = 2\n  inc(x)\nFIN\n');
 const i=new Interpreter(p);await i.initialize();await assert.rejects(()=>i.execute((p.body[1] as any).body,{}),/asignable/);
 const p2=parse('FUNCION inc(POR REFERENCIA x)\n  x++\nFIN\nEVENTO "test" salida\n  inc(4)\nFIN\n');
 const j=new Interpreter(p2);await j.initialize();await assert.rejects(()=>j.execute((p2.body[1] as any).body,{}),/identificador/);
});
await test('POR REFERENCIA respeta tipos de parámetro',async()=>{
 const p=parse('FUNCION setTexto(POR REFERENCIA x: ENTERO)\n  x = "no es entero"\nFIN\nEVENTO "test" salida\n  VARIABLE n: ENTERO = 1\n  setTexto(n)\nFIN\n');
 const i=new Interpreter(p);await i.initialize();await assert.rejects(()=>i.execute((p.body[1] as any).body,{}),/Tipo incompatible/);
});
await test('ENUM tiene valores numéricos y de texto, inmutables',async()=>{
 const p=parse('ENUM Estado\n  CREADO\n  ACTIVO = 4\n  CERRADO\n  TEXTO = "texto"\nFIN ENUM\nEVENTO "test" salida\n  salida.a = Estado.CREADO\n  salida.b = Estado.CERRADO\n  salida.c = Estado.TEXTO\nFIN\n');
 assert.equal((p.body[0] as any).kind,'EnumDeclaration');assert.equal(validate(p,{strictNames:true}).ok,true);
 const i=new Interpreter(p);await i.initialize();const x:any={};await i.execute((p.body[1] as any).body,{salida:x});assert.deepEqual(x,{a:0,b:5,c:'texto'});
 assert.equal(Object.isFrozen(i.globals.get('Estado')),true);
});
await test('REGISTRO valida campos y defaults y crea objetos sin prototipo',async()=>{
 const p=parse('REGISTRO Perfil\n  nombre: TEXTO\n  puntos: ENTERO = 0\nFIN REGISTRO\nEVENTO "test" salida\n  VARIABLE p = Perfil({nombre: "Ana"})\n  salida.nombre = p.nombre\n  salida.puntos = p.puntos\nFIN\n');
 assert.equal((p.body[0] as any).kind,'RecordDeclaration');assert.equal(validate(p,{strictNames:true}).ok,true);
 const i=new Interpreter(p);await i.initialize();const x:any={};await i.execute((p.body[1] as any).body,{salida:x});assert.deepEqual(x,{nombre:'Ana',puntos:0});
 assert.equal(Object.getPrototypeOf(await (i.globals.get('Perfil') as Function)({nombre:'Ana'})),null);
 await assert.rejects(()=>(i.globals.get('Perfil') as Function)({nombre:1}),/Tipo incompatible/);
 await assert.rejects(()=>(i.globals.get('Perfil') as Function)({nombre:'Ana',secret:1}),/no declarado/);
});
await test('REGISTRO y ENUM rechazan duplicados en el parser',()=>{
 assert.throws(()=>parse('ENUM X\n  A\n  A\nFIN\n'),/duplicado/);
 assert.throws(()=>parse('REGISTRO X\n  v: ENTERO\n  v: TEXTO\nFIN\n'),/duplicado/);
});
await test('REGISTRO, ENUM y JAVASCRIPT se admiten sin interruptor nativo',async()=>{
 const p=parse('REGISTRO Datos\n  cantidad: ENTERO\nFIN\nENUM Estado\n  OK\nFIN\nEVENTO "test" salida\n  VARIABLE r = Datos(5)\n  salida.valor = r.cantidad\n  salida.estado = Estado.OK\nFIN\n');
 const i=new Interpreter(p,{});await i.initialize();const out:any={};await i.execute((p.body[2] as any).body,{salida:out});assert.deepEqual(out,{valor:5,estado:0});
 const js=parse('EVENTO "test" salida\n JAVASCRIPT """\n pseudo.set("mensaje", "libre");\n """\n salida.valor = mensaje\nFIN');
 const other=new Interpreter(js,{});await other.initialize();const result:any={};await other.execute((js.body[0] as any).body,{salida:result});assert.equal(result.valor,'libre');
});
await test('IMPORTAR ... COMO contiene REGISTRO/ENUM y funciones',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pd06-import-'));
 try{
  await writeFile(join(dir,'types.pdiscord'),'EXPORTAR REGISTRO Perfil\n  edad: ENTERO\nFIN REGISTRO\nEXPORTAR ENUM Rol\n  ADMIN = "admin"\nFIN ENUM\n');
  await writeFile(join(dir,'main.pdiscord'),'IMPORTAR "types.pdiscord" COMO tip\nEVENTO "test" salida\n  VARIABLE perfil = tip.Perfil(18)\n  salida.edad = perfil.edad\n  salida.rol = tip.Rol.ADMIN\nFIN\n');
  const p=await loadProgramFile(join(dir,'main.pdiscord'));
  const i=new Interpreter(p);await i.initialize();const out:any={};await i.execute((p.body[1] as any).body,{salida:out});assert.deepEqual(out,{edad:18,rol:'admin'});
 }finally{await rm(dir,{recursive:true,force:true});}
});

await test('DEFINIR ... COMO admite variable tipada sin inicializar',async()=>{
 const p=parse('DEFINIR x COMO ENTERO\nEVENTO "test" salida\n  DEFINIR y COMO TEXTO\n  y = "hola"\n  x = 9\n  salida.dato = y\n  salida.x = x\nFIN\n');
 assert.equal(validate(p,{strictNames:true}).ok,true);
 const i=new Interpreter(p);await i.initialize();const out:any={};await i.execute((p.body[1] as any).body,{salida:out});assert.deepEqual(out,{dato:'hola',x:9});
});

await test('catálogo AST de stdlib anuncia solamente funciones reales y todas ellas',()=>{
 const f=createStdlib();
 const catalog=Object.values(PSEUDODISCORD_STDLIB).flat();
 assert.deepEqual(new Set(catalog),new Set(Object.keys(f)));
});
console.log(`\n${passes} pruebas nuevas de v0.6 superadas.`);
