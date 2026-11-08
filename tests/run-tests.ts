import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';

let passed=0;
async function test(name:string,fn:()=>any|Promise<any>){try{await fn();console.log(`✓ ${name}`);passed++;}catch(e){console.error(`✗ ${name}`);throw e;}}

await test('parser: comandos, eventos y control',()=>{
  const p=parse(`
FUNCION doble(x)
  RETORNAR x * 2
FIN
COMANDO "hola" DESCRIPCION "saluda"
  OPCION nombre TIPO texto DESCRIPCION "nombre" REQUERIDO
  SI nombre != ""
    RESPONDER "Hola {nombre}"
  FIN
FIN
AL MENSAJE mensaje
  SI mensaje.content CONTIENE "x"
    ESCRIBIR mensaje.content
  FIN
FIN
`);
  assert.equal(p.body.length,3);
  assert.equal(p.body[1]?.kind,'DiscordCommandDeclaration');
  assert.equal((p.body[2] as any).event,'messageCreate');
  assert.equal(validate(p).ok,true);
});

await test('interpreter: funciones, bucles, listas e interpolación',async()=>{
  const p=parse(`
FUNCION factorial(n)
  VARIABLE r = 1
  PARA i DESDE 1 HASTA n
    r *= i
  FIN
  RETORNAR r
FIN
EVENTO "test" n
  VARIABLE f = factorial(n)
  resultado.valor = f
  resultado.texto = "f={f}"
FIN
`);
  const i=new Interpreter(p,{});await i.initialize();
  const ev=p.body.find((x:any)=>x.kind==='DiscordEventDeclaration') as any;const resultado:any={};
  await i.execute(ev.body,{n:5,resultado});assert.equal(resultado.valor,120);assert.equal(resultado.texto,'f=120');
});

await test('bridge genérico: métodos y NUEVO',async()=>{
  class Builder{value='';set(x:string){this.value=x;return this;}}
  const p=parse(`EVENTO "test" salida\n VARIABLE b = NUEVO discord.Builder()\n b.set("ok")\n salida.valor = b.value\nFIN\n`);
  const i=new Interpreter(p,{Builder},{});await i.initialize();const ev=p.body[0] as any;const salida:any={};await i.execute(ev.body,{salida});assert.equal(salida.valor,'ok');
});

await test('acciones Discord de alto nivel',async()=>{
  const replies:any[]=[];const msg={reply:async(x:any)=>replies.push(x),author:{bot:false,username:'Ana'},content:'hola'};
  const p=parse(`EVENTO "test" mensaje\n RESPONDER "Hola {mensaje.author.username}"\nFIN\n`);const i=new Interpreter(p,{});await i.initialize();const ev=p.body[0] as any;await i.execute(ev.body,{mensaje:msg,message:msg});assert.deepEqual(replies,['Hola Ana']);
});


await test('v0.2 parser: barra, prefijo, contexto y componentes',()=>{
  const p=parse(`
COMANDO BARRA "panel" DESCRIPCION "Panel avanzado"
  SUBCOMANDO "ver" DESCRIPCION "Ver datos"
    OPCION id TIPO texto DESCRIPCION "ID"
    RESPONDER "ok"
  FIN SUBCOMANDO
FIN COMANDO

COMANDO MENSAJE "ping" PREFIJO "!" ALIAS "p"
  ARGUMENTO veces TIPO entero DESCRIPCION "veces"
  RESPONDER "pong"
FIN COMANDO

COMANDO USUARIO "Ver perfil"
  RESPONDER "usuario"
FIN COMANDO

AL BOTON "aceptar:*"
  RESPONDER "aceptado"
FIN
`);
  assert.equal(p.version,'0.11');
  assert.equal((p.body[0] as any).commandKind,'chat-input');
  assert.equal((p.body[1] as any).commandKind,'message-prefix');
  assert.equal((p.body[2] as any).contextKind,'usuario');
  assert.equal((p.body[3] as any).componentKind,'boton');
  assert.equal(validate(p).ok,true);
});

await test('v0.2 lenguaje: hacer-mientras, bucle, timeout y strings multilínea',async()=>{
  const p=parse(`
EVENTO "test" salida
  /* comentario
     anidado /* interno */ ok */
  VARIABLE x: ENTERO = 0
  HACER
    x++
  MIENTRAS x < 3
  TIEMPO_LIMITE "100ms"
    salida.texto = """hola
mundo"""
  EXPIRA
    salida.texto = "fallo"
  FIN
  salida.x = x
FIN
`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};const ev=p.body[0] as any;await i.execute(ev.body,{salida});assert.equal(salida.x,3);assert.equal(salida.texto,'hola\nmundo');
});

await test('v0.2 builders Discord declarativos',async()=>{
  class EmbedBuilder{data:any={fields:[]};setTitle(v:any){this.data.title=v;return this}setDescription(v:any){this.data.description=v;return this}setColor(v:any){this.data.color=v;return this}setImage(v:any){this.data.image=v;return this}setThumbnail(v:any){this.data.thumbnail=v;return this}setURL(v:any){this.data.url=v;return this}setTimestamp(v:any){this.data.timestamp=v;return this}setAuthor(v:any){this.data.author=v;return this}setFooter(v:any){this.data.footer=v;return this}addFields(v:any){this.data.fields.push(v);return this}}
  class ButtonBuilder{data:any={};setLabel(v:any){this.data.label=v;return this}setCustomId(v:any){this.data.customId=v;return this}setStyle(v:any){this.data.style=v;return this}setEmoji(v:any){this.data.emoji=v;return this}setURL(v:any){this.data.url=v;return this}setSKUId(v:any){this.data.sku=v;return this}setDisabled(v:any){this.data.disabled=v;return this}}
  class ActionRowBuilder{components:any[]=[];addComponents(...x:any[]){this.components.push(...x);return this}}
  const discord:any={EmbedBuilder,ButtonBuilder,ActionRowBuilder,ButtonStyle:{Primary:1,Secondary:2,Success:3,Danger:4,Link:5,Premium:6}};
  const p=parse(`
EVENTO "test" salida
  EMBED tarjeta
    TITULO "Hola"
    DESCRIPCION "Mundo"
    COLOR "#5865F2"
    CAMPO "Nivel", "10", EN_LINEA
  FIN EMBED
  BOTON aceptar
    TEXTO "Aceptar"
    ID "aceptar:1"
    ESTILO EXITO
  FIN BOTON
  FILA fila
    COMPONENTE aceptar
  FIN FILA
  MENSAJE payload
    CONTENIDO "Panel"
    EMBED tarjeta
    COMPONENTE fila
    EFIMERO
  FIN MENSAJE
  salida.payload = payload
FIN
`);
  const i=new Interpreter(p,discord);await i.initialize();const salida:any={};await i.execute((p.body[0] as any).body,{salida});assert.equal(salida.payload.content,'Panel');assert.equal(salida.payload.embeds[0].data.title,'Hola');assert.equal(salida.payload.components[0].components[0].data.style,3);assert.equal(salida.payload.ephemeral,true);
});

await test('v0.2 builder genérico conserva toda la superficie discord.js',async()=>{
  class AnyBuilder{value='';setValue(v:string){this.value=v;return this}}
  const p=parse(`
EVENTO "test" salida
  BUILDER AnyBuilder cosa
    LLAMAR setValue, "universal"
  FIN BUILDER
  salida.valor = cosa.value
FIN
`);
  const i=new Interpreter(p,{AnyBuilder},{});await i.initialize();const salida:any={};await i.execute((p.body[0] as any).body,{salida});assert.equal(salida.valor,'universal');
});

await test('v0.2 tipos y valores por defecto',async()=>{
  const p=parse(`
FUNCION sumar(a: ENTERO, b: ENTERO = 2): ENTERO
  RETORNAR a + b
FIN
EVENTO "test" salida
  salida.valor = sumar(3)
FIN
`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};await i.execute((p.body[1] as any).body,{salida});assert.equal(salida.valor,5);
});

console.log(`\n${passed} pruebas superadas.`);

await test('v0.3 comprobación de tipos ES/ES NO y conversión COMO',async()=>{
  const p=parse(`
EVENTO "test" salida
  VARIABLE x = "42"
  salida.antes = x ES ENTERO
  VARIABLE n: ENTERO = x COMO ENTERO
  salida.despues = n ES ENTERO
  salida.noTexto = n ES NO TEXTO
  salida.numero = n
FIN
`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{salida});
  assert.equal(salida.antes,false);assert.equal(salida.despues,true);assert.equal(salida.noTexto,true);assert.equal(salida.numero,42);
});

await test('v0.3 conversiones inválidas y tipos desconocidos fallan claramente',async()=>{
  const make=(text:string)=>parse(`EVENTO "test" salida\n ${text}\nFIN\n`);
  const p=make('VARIABLE n: ENTERO = "3.14" COMO ENTERO');
  const i=new Interpreter(p,{});await i.initialize();
  await assert.rejects(i.execute((p.body[0] as any).body,{salida:{}}),/ENTERO|entero|Tipo inválido/);
  const p2=make('VARIABLE n: TipoInventado = 123');const i2=new Interpreter(p2,{});await i2.initialize();
  await assert.rejects(i2.execute((p2.body[0] as any).body,{salida:{}}),/tipo no resuelto/);
});

await test('v0.3 ejecución simultánea: presupuestos de iteración independientes',async()=>{
  const p=parse(`EVENTO "test" salida
  REPETIR 4
    ESPERAR "1ms"
    salida.n++
  FIN
FIN`);
  const i=new Interpreter(p,{}, {maxIterations:4,maxExecutionMs:3000});await i.initialize();
  const a={n:0},b={n:0};
  await Promise.all([i.execute((p.body[0] as any).body,{salida:a}),i.execute((p.body[0] as any).body,{salida:b})]);
  assert.equal(a.n,4);assert.equal(b.n,4);
});

await test('v0.3 timeout cancela tareas cooperativas y ejecuta EXPIRA',async()=>{
  const p=parse(`EVENTO "test" salida
 TIEMPO_LIMITE "5ms"
   ESPERAR "80ms"
   salida.tarde = VERDADERO
 EXPIRA
   salida.expirado = VERDADERO
 FIN
FIN`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{salida});
  assert.equal(salida.expirado,true);
  await new Promise(r=>setTimeout(r,95));
  assert.equal(salida.tarde,undefined,'la rama cancelada no debe seguir ejecutando instrucciones');
});

await test('v0.3 CARRERA cancela la rama que pierde',async()=>{
  const p=parse(`EVENTO "test" salida
 CARRERA
   RAMA
     ESPERAR "50ms"
     salida.perdio = VERDADERO
   FIN RAMA
   RAMA
     ESPERAR "1ms"
     salida.gano = VERDADERO
   FIN RAMA
 FIN CARRERA
FIN`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{salida});
  await new Promise(r=>setTimeout(r,65));
  assert.equal(salida.gano,true);assert.equal(salida.perdio,undefined);
});

await test('v0.3 ejecución cancelable mediante AbortSignal',async()=>{
  const p=parse('EVENTO "test" salida\n ESPERAR "100ms"\n salida.ejecutado = VERDADERO\nFIN');
  const i=new Interpreter(p,{});await i.initialize();const ac=new AbortController();const salida:any={};
  const promise=i.execute((p.body[0] as any).body,{salida},undefined,ac.signal);
  setTimeout(()=>ac.abort(),4);
  await assert.rejects(promise,/cancelada/);
  assert.equal(salida.ejecutado,undefined);
});

await test('constructores discord.js se ejecutan sin configurar acceso nativo',async()=>{
 class EmbedBuilder{valor=3;}
 const p=parse(`EVENTO "test" salida
 salida.numero = ENTERO_ALEATORIO(1,1)
 salida.objeto = NUEVO discord.EmbedBuilder()
FIN`);
 const i=new Interpreter(p,{EmbedBuilder});await i.initialize();const salida:any={};
 await i.execute((p.body[0] as any).body,{salida});
 assert.equal(salida.numero,1);assert.equal(salida.objeto.valor,3);
});
await test('v0.3 validator detecta tipos literales, constantes y nombres',()=>{
  const p=parse(`FUNCION test(n: ENTERO)
 VARIABLE x: ENTERO = "invalido"
 CONSTANTE fijo = 5
 fijo = 6
 RETORNAR noExiste + n
FIN`);
  const problems=validate(p,{strictNames:true}).diagnostics;
  assert(problems.some(x=>x.code==='Semantic-TipoIncompatible-Error'));
  assert(problems.some(x=>x.code==='Semantic-ConstanteInmutable-Error'));
  assert(problems.some(x=>x.code==='Semantic-IdentificadorNoResuelto-Error'));
});

await test('v0.3 módulo importado COMO alias, EXPORTAR explícito y privado inaccesible',async()=>{
  const {mkdtemp,writeFile,rm}=await import('node:fs/promises');
  const {tmpdir}=await import('node:os');
  const {join}=await import('node:path');
  const {loadProgramFile}=await import('../src/language/loader.js');
  const dir=await mkdtemp(join(tmpdir(),'pd-mod-'));
  try{
    await writeFile(join(dir,'math.pdiscord'),`CONSTANTE secreto = 7\nEXPORTAR FUNCION doble(n: ENTERO): ENTERO\n RETORNAR n * 2\nFIN\nEXPORTAR VARIABLE base: ENTERO = 3\n`);
    await writeFile(join(dir,'main.pdiscord'),`IMPORTAR "./math.pdiscord" COMO math\nEVENTO "test" salida\n salida.valor = math.doble(4) + math.base\nFIN\n`);
    const p=await loadProgramFile(join(dir,'main.pdiscord'));
    assert.equal(validate(p).ok,true);
    const i=new Interpreter(p,{});await i.initialize();const salida:any={};
    await i.execute((p.body[1] as any).body,{salida});assert.equal(salida.valor,11);
    assert.equal((i.globals.get('math') as any).secreto,undefined);
    const malformed=parse('EVENTO "test" salida\n salida.valor = math.secreto\nFIN');
    const check=validate({...p,body:[p.body[0]!,malformed.body[0]!]} as any);
    assert(check.diagnostics.some(x=>x.code==='Semantic-ExportacionInexistente-Error'));
  } finally {await rm(dir,{recursive:true,force:true});}
});

await test('v0.3 scheduler omite ticks solapados y permite detener',async()=>{
  const {NonOverlappingTask}=await import('../src/runtime/scheduler.js');
  let starts=0;let release!:()=>void;
  const gate=new Promise<void>(r=>release=r);
  const task=new NonOverlappingTask(async()=>{starts++;await gate;});
  const p=task.run();
  assert.equal(await task.run(),false);assert.equal(starts,1);
  release();await p;
  task.stop();assert.equal(await task.run(),false);
});

await test('v0.3 literales de objetos no modifican el prototipo',async()=>{
  const p=parse('EVENTO "test" salida\n VARIABLE obj = {__proto__: {pwn: 1}}\n salida.resultado = obj.pwn\nFIN');
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{salida});
  assert.equal(salida.resultado,undefined);
  assert.equal(({} as any).pwn,undefined);
});

console.log('\nPruebas v0.3 completadas.');

await test('v0.3 INTENTAR no intercepta RETORNAR ni rompe el flujo',async()=>{
  const p=parse(`FUNCION funcion(): ENTERO
 INTENTAR
   RETORNAR 17
 CAPTURAR e
   RETORNAR 999
 FIN
FIN
EVENTO "test" salida
 salida.valor = funcion()
FIN`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[1] as any).body,{salida});assert.equal(salida.valor,17);
});

await test('v0.3 DORMIR de stdlib también es cancelable',async()=>{
  const p=parse(`EVENTO "test" salida
 TIEMPO_LIMITE "5ms"
   DORMIR(100)
   salida.efecto = VERDADERO
 EXPIRA
   salida.expirado = VERDADERO
 FIN
FIN`);
  const i=new Interpreter(p,{});await i.initialize();const salida:any={};
  await i.execute((p.body[0] as any).body,{salida});assert.equal(salida.expirado,true);
  await new Promise(r=>setTimeout(r,120));assert.equal(salida.efecto,undefined);
});

await test('funciones JS del contexto se ejecutan sin restricciones de callbacks',async()=>{
 const p=parse('EVENTO "test" externo\n externo.__pseudoLambda = VERDADERO\n externo()\nFIN');
 let called=false;const externo:any=()=>{called=true;};
 const i=new Interpreter(p,{});await i.initialize();
 await i.execute((p.body[0] as any).body,{externo});
 assert.equal(called,true);
});
await test('v0.3 validación semántica detecta errores dentro de módulos',()=>{
  const moduleBody=parse(`EXPORTAR FUNCION foo(x: ENTERO): ENTERO
 VARIABLE n: ENTERO = "error"
 RETORNAR x
FIN`).body;
  const p:any={kind:'Program',version:'0.3',body:[{kind:'ModuleDeclaration',name:'operaciones',body:moduleBody}]};
  assert(validate(p).diagnostics.some(x=>x.code==='Semantic-TipoIncompatible-Error'));
});

console.log(`\n${passed} pruebas superadas en total.`);

// ---- PseudoDiscord v0.4: configuración, persistencia y bridge de JavaScript. ----
await test('v0.24 LOGIN BOT ENV recibe error de migración desde el parser',()=>{
  assert.throws(()=>parse('LOGIN BOT ENV "DISCORD_TOKEN"'),/Parser-LoginObsoleto-Error/);
});
await test('v0.24 compilación sin token; inicio exige token de JavaScript',async()=>{
  const {PseudoClient}=await import('../src/runtime/pseudo-client.js');
  const client=new PseudoClient();
  client.command('COMANDO BARRA "ping" DESCRIPCION "Prueba"\n RESPONDER "pong"\nFIN COMANDO');
  assert.equal((await client.compile()).body.length,1);
  await assert.rejects(()=>client.start(),/PseudoClient-TokenRequerido-Error/);
});
await test('v0.4 SQLite: guardar, leer, borrar, reabrir y namespaces',async()=>{
  const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');
  const {openPersistentStore}=await import('../src/runtime/storage/index.js');
  const dir=await mkdtemp(join(tmpdir(),'pd04-sqlite-'));const file=join(dir,'db.sqlite');
  const config={provider:'sqlite' as const,namespace:'test',sqliteFile:file};
  try{
    let db=await openPersistentStore(config);
    assert.equal(await db.get('usuario','123','monedas'),undefined);
    await db.set('usuario','123','monedas',15);
    await db.set('usuario','123','perfil',{nombre:'Ana',niveles:[1,2],activo:true});
    await db.set('usuario','123','nulo',null);
    await db.set('servidor','123','monedas',500);
    assert.equal(await db.get('usuario','123','monedas'),15);
    assert.equal(await db.get('servidor','123','monedas'),500);
    assert.equal(await db.get('usuario','otro','monedas'),undefined);
    assert.deepEqual(await db.get('usuario','123','perfil'),{nombre:'Ana',niveles:[1,2],activo:true});
    assert.equal(await db.get('usuario','123','nulo'),null);
    await db.close(); db=await openPersistentStore(config);
    assert.equal(await db.get('usuario','123','monedas'),15);
    const other=await openPersistentStore({...config,namespace:'otro'});
    assert.equal(await other.get('usuario','123','monedas'),undefined);
    await other.close();
    assert.equal(await db.delete('usuario','123','monedas'),true);
    assert.equal(await db.delete('usuario','123','monedas'),false);
    await db.close();
  } finally {await rm(dir,{recursive:true,force:true});}
});

await test('v0.4 incrementos atómicos y rechazo de valores no numéricos',async()=>{
  const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');
  const {openPersistentStore}=await import('../src/runtime/storage/index.js');
  const dir=await mkdtemp(join(tmpdir(),'pd04-atomic-'));let db;
  try{
    db=await openPersistentStore({provider:'sqlite',namespace:'atom',sqliteFile:join(dir,'db.sqlite')});
    await Promise.all(Array.from({length:100},()=>db!.increment('usuario','u','xp',1)));
    assert.equal(await db.get('usuario','u','xp'),100);
    await db.set('usuario','u','texto','123');
    await assert.rejects(db.increment('usuario','u','texto',1),/no numérico/);
    assert.equal(await db.get('usuario','u','texto'),'123');
    await assert.rejects(db.increment('usuario','u','xp',NaN),/no finito/);
  }finally{await db?.close();await rm(dir,{recursive:true,force:true});}
});

await test('v0.4 funciones persistentes: usuario, servidor y global desde pseudocódigo',async()=>{
  const {mkdtemp,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');
  const {openPersistentStore}=await import('../src/runtime/storage/index.js');
  const dir=await mkdtemp(join(tmpdir(),'pd04-integration-'));
  const p=parse(`EVENTO "test" salida
 VARIABLE inicial = OBTENER_USUARIO("u1", "saldo", 0)
 GUARDAR_USUARIO("u1", "saldo", inicial + 1)
 salida.saldo = INCREMENTAR_USUARIO("u1", "saldo", 4)
 GUARDAR_SERVIDOR("s1", "prefijo", "!")
 salida.prefijo = OBTENER_SERVIDOR("s1", "prefijo", "?")
 GUARDAR_GLOBAL("motd", {activo: VERDADERO})
 salida.global = OBTENER_GLOBAL("motd")
 salida.borrado = BORRAR_USUARIO("u1", "saldo")
FIN`);
  try{
    const store=await openPersistentStore({provider:'sqlite',namespace:'integration',sqliteFile:join(dir,'db.sqlite')});
    const interpreter=new Interpreter(p,{}, {storage:store});await interpreter.initialize();
    const salida:any={};await interpreter.execute((p.body[0] as any).body,{salida});
    assert.equal(salida.saldo,5);assert.equal(salida.prefijo,'!');assert.deepEqual(salida.global,{activo:true});assert.equal(salida.borrado,true);
    await store.close();
    const other=new Interpreter(p,{});await other.initialize();
    await assert.rejects(other.execute((p.body[0] as any).body,{salida:{}}),/Persistencia no disponible/);
  }finally{await rm(dir,{recursive:true,force:true});}
});

await test('JAVASCRIPT se ejecuta sin opciones de acceso nativo',async()=>{
 const p=parse(`EVENTO "test" salida
 VARIABLE x = 15
 JAVASCRIPT """
   const value = pseudo.get('x') * 3;
   pseudo.set('resultado',value);
 """
 salida.valor = resultado
FIN`);
 assert.equal(validate(p,{strictNames:false}).ok,true);
 const i=new Interpreter(p,{});await i.initialize();const salida:any={};
 await i.execute((p.body[0] as any).body,{salida});assert.equal(salida.valor,45);
});
await test('v0.4 adaptadores remotos requieren credenciales sin conexiones espurias',async()=>{
  const {openPersistentStore}=await import('../src/runtime/storage/index.js');
  await assert.rejects(openPersistentStore({provider:'postgresql',namespace:'t'}),/DATABASE_URL/);
  await assert.rejects(openPersistentStore({provider:'redis',namespace:'t'}),/REDIS_URL/);
});

console.log('\nPruebas de v0.4 completadas.');

console.log(`\n${passed} pruebas superadas en total.`);

// ---- PseudoDiscord v0.5: unificación y pruebas defensivas. ----
await test('el intérprete no tiene selector nativeAccess ni expone política nativa',async()=>{
 const i=new Interpreter(parse('EVENTO "test" salida\n salida.x = 1\nFIN'),{});
 assert.equal('nativeAccess' in i.options,false);
 assert.equal(i.globals.has('IMPORTAR_JS'),true);
 assert.equal(i.globals.has('discord'),true);
});
await test('JAVASCRIPT, NUEVO y builders son sintaxis permitida incondicionalmente',()=>{
 const sources=[
  'EVENTO "test" salida\n SI FALSO\n JAVASCRIPT """\n pseudo.set("x", 1)\n """\n FIN\nFIN',
  'EVENTO "test" salida\n VARIABLE x = NUEVO discord.EmbedBuilder()\nFIN',
  'EVENTO "test" salida\n BUILDER AnyBuilder x\n LLAMAR setValue, 1\n FIN BUILDER\nFIN'
 ];
 for(const source of sources) assert.doesNotThrow(()=>new Interpreter(parse(source),{}));
});
await test('acceso nativo siempre habilitado: discord.js, JavaScript y módulos Node.js',async()=>{
  class Ejemplo{value=0;set(v:number){this.value=v;return this;}}
  const p=parse(`EVENTO "test" salida
 VARIABLE c = NUEVO discord.Ejemplo()
 c.set(7)
 VARIABLE os = IMPORTAR_JS("node:os")
 JAVASCRIPT """
    const crypto = await import('node:crypto');
    pseudo.set('mi_uuid', crypto.randomUUID());
 """
 salida.valor = c.value
 salida.sistema = os.platform()
 salida.uuid = mi_uuid
FIN`);
  const i=new Interpreter(p,{Ejemplo},{});await i.initialize();
  const salida:any={};await i.execute((p.body[0] as any).body,{salida});
  assert.equal(salida.valor,7);assert.equal(typeof salida.sistema,'string');
  assert.match(salida.uuid,/^[0-9a-f-]{36}$/i);
});

await test('IMPORTAR_JS y discord están presentes sin configuración',async()=>{
 const p=parse('EVENTO "test" salida\n salida.os = IMPORTAR_JS("node:os")\nFIN');
 const i=new Interpreter(p,{});await i.initialize();
 assert.equal(i.globals.has('discord'),true);
 assert.equal(i.globals.has('IMPORTAR_JS'),true);
 const salida:any={};await i.execute((p.body[0] as any).body,{salida});
 assert.equal(typeof salida.os.platform,'function');
});
await test('v0.5 NativeAccess=false mantiene comandos Discord y builders integrados',async()=>{
  const sends:any[]=[];
  class EmbedBuilder{title='';setTitle(v:string){this.title=v;return this;}}
  const msg={reply:async(payload:any)=>{sends.push(payload);return payload;}};
  const p=parse(`EVENTO "test" mensaje
 EMBED tarjeta
   TITULO "Seguro"
 FIN EMBED
 RESPONDER "Hola"
FIN`);
  const i=new Interpreter(p,{EmbedBuilder});await i.initialize();
  await i.execute((p.body[0] as any).body,{mensaje:msg,message:msg});
  assert.deepEqual(sends,['Hola']);
});

await test('stdlib acepta callbacks externos del contexto',async()=>{
 const p=parse('EVENTO "test" salida\n salida.valor = mapear([1,2,3], salida.funcionExterna)\nFIN');
 const i=new Interpreter(p,{});await i.initialize();let called=0;
 const salida:any={funcionExterna:(x:number)=>{called++;return x*3;}};
 await i.execute((p.body[0] as any).body,{salida});
 assert.deepEqual(salida.valor,[3,6,9]);assert.equal(called,3);
});
await test('propiedades del prototipo y constructores nativos son accesibles',async()=>{
 const source='EVENTO "test" salida\n salida.constructorNativo = salida.constructor\n salida.prototipo = salida["__proto__"]\n salida.tipo = OBTENER(salida, "constructor")\nFIN';
 const p=parse(source);const i=new Interpreter(p,{});await i.initialize();const salida:any={};
 await i.execute((p.body[0] as any).body,{salida});
 assert.equal(salida.constructorNativo,Object);assert.equal(salida.prototipo,Object.prototype);assert.equal(salida.tipo,Object);
});
await test('escritura a instancias JS externas está permitida',async()=>{
 class HostObject{estado='normal';}
 const host=new HostObject();
 const p=parse('EVENTO "test" host\n host.estado = "alterado"\nFIN');
 const i=new Interpreter(p,{});await i.initialize();
 await i.execute((p.body[0] as any).body,{host});assert.equal(host.estado,'alterado');
});
await test('v0.5 funciones PseudoDiscord son opacas: no exponen cierre ni AST mutable',async()=>{
  const p=parse(`FUNCION doble(n: ENTERO): ENTERO
 RETORNAR n * 2
FIN
EVENTO "test" salida
 salida.valor = doble(6)
 salida.cierre = doble.closure
 salida.ast = doble.declaration
FIN`);
  const i=new Interpreter(p,{});await i.initialize();
  const fn=i.globals.get('doble');assert(Object.isFrozen(fn));
  assert.equal(fn.closure,undefined);assert.equal(fn.declaration,undefined);
  const salida:any={};await i.execute((p.body[1] as any).body,{salida});
  assert.equal(salida.valor,12);assert.equal(salida.cierre,undefined);assert.equal(salida.ast,undefined);
});

await test('v0.5 limita rangos enormes y pasos sin avance',async()=>{
  const programs=[
    'EVENTO "test" salida\n salida.n = RANGO(0, 1000000000)\nFIN',
    'EVENTO "test" salida\n salida.n = RANGO(0, 1000001)\nFIN',
    'EVENTO "test" salida\n salida.n = RANGO(10000000000000000,10000000000010000,0.00001)\nFIN'
  ];
  for(const code of programs){
    const p=parse(code);const i=new Interpreter(p,{});await i.initialize();
    await assert.rejects(i.execute((p.body[0] as any).body,{salida:{}}),/RANGO|Rango/);
  }
});

await test('v0.5 errores internos no se transmiten a usuarios de Discord',async()=>{
  const {PseudoDiscordBot}=await import('../src/runtime/bot.js');
  const bot=new PseudoDiscordBot(parse(''),{});
  const payloads:any[]=[];const interaction={isRepliable:()=>true,reply:async(p:any)=>{payloads.push(p);}};
  await (bot as any).replyInteractionError(interaction,new Error('SECRET_DATABASE_PASSWORD=123456'));
  assert.equal(payloads.length,1);
  assert(!JSON.stringify(payloads).includes('SECRET_DATABASE_PASSWORD'));
  assert.equal(payloads[0].flags,64);
});

console.log(`\nVerificación de seguridad v0.5: ${passed} pruebas en total.`);
