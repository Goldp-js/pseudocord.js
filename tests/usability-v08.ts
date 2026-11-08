import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from '../src/language/parser.js';
import { loadProgramFile } from '../src/language/loader.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { ProjectModules } from '../src/runtime/project-modules.js';
import { createStdlib } from '../src/runtime/stdlib.js';

let passed=0;
async function test(name:string,fn:()=>Promise<unknown>|unknown){await fn();console.log(`✓ v0.8 ${name}`);passed++;}
const sid='123456789012345678',rid='123456789012345679',cid='123456789012345680';

await test('AL PREPARAR se analiza semánticamente y tiene su propio AST',()=>{
  const p=parse('AL PREPARAR\n PARA CADA f EN LISTAR_MODULOS("./commands", VERDADERO)\n CARGAR_MODULO(f)\n FIN PARA\nFIN PREPARAR\n');
  assert.equal(p.version,'0.11');assert.equal(p.body[0]?.kind,'StartupDeclaration');
  const result=validate(p,{strictNames:true});assert.equal(result.ok,true,JSON.stringify(result.diagnostics));
});
await test('Handler escrito en PseudoDiscord descubre y registra comandos recursivamente',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-handler-'));
  try {
    await mkdir(join(dir,'commands','admin'),{recursive:true});
    await writeFile(join(dir,'main.pdiscord'),`AL PREPARAR\n PARA CADA archivo EN LISTAR_MODULOS("./commands", VERDADERO)\n  CARGAR_MODULO(archivo)\n FIN PARA\nFIN PREPARAR\n`);
    await writeFile(join(dir,'commands','ping.pdiscord'),'COMANDO BARRA "ping" DESCRIPCION "Prueba"\n RESPONDER "Pong"\nFIN COMANDO\n');
    await writeFile(join(dir,'commands','admin','ban.pdiscord'),'COMANDO BARRA "ban" DESCRIPCION "Prueba"\n RESPONDER "Ban"\nFIN COMANDO\n');
    const program=await loadProgramFile(join(dir,'main.pdiscord'));
    const manager=new ProjectModules(program,dir);
    const interpreter=new Interpreter(program,{},{moduleFunctions:manager.api});
    await interpreter.initialize();assert.equal(await manager.finish(interpreter),2);
    assert.deepEqual(program.body.filter(x=>x.kind==='DiscordCommandDeclaration').map(x=>(x as any).name),['ban','ping']);
    assert.equal(validate(program,{strictNames:true}).ok,true);
    await assert.rejects(()=>manager.queue('./commands/ping.pdiscord'),/fuera de la fase AL PREPARAR/);
  } finally {await rm(dir,{recursive:true,force:true});}
});
await test('Un handler puede encapsular la lógica en una FUNCION propia',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-handler-function-'));
  try{
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),`FUNCION cargarTodo(ruta)\n PARA CADA archivo EN LISTAR_MODULOS(ruta, VERDADERO)\n  CARGAR_MODULO(archivo)\n FIN PARA\nFIN FUNCION\nAL PREPARAR\n cargarTodo("./commands")\nFIN PREPARAR\n`);
    await writeFile(join(dir,'commands','ok.pdiscord'),'COMANDO BARRA "ok"\n RESPONDER "ok"\nFIN COMANDO\n');
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    const i=new Interpreter(p,{},{moduleFunctions:m.api});await i.initialize();assert.equal(await m.finish(i),1);
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('Módulos dinámicos pueden definir nuevas funciones disponibles para comandos',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-handler-func-'));
  try{
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),'AL PREPARAR\n CARGAR_MODULO("./commands/util.pdiscord")\nFIN PREPARAR\n');
    await writeFile(join(dir,'commands','util.pdiscord'),'FUNCION doblar(x: ENTERO): ENTERO\n RETORNAR x * 2\nFIN FUNCION\nCOMANDO BARRA "doble"\n RESPONDER "{doblar(3)}"\nFIN COMANDO\n');
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    const i=new Interpreter(p,{},{moduleFunctions:m.api});await i.initialize();await m.finish(i);
    const cmd=p.body.find(x=>x.kind==='DiscordCommandDeclaration') as any;
    const result:any[]=[];await i.execute(cmd.body,{mensaje:{reply:async (x:any)=>result.push(x)}});
    assert.deepEqual(result,['6']);
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('Rutas fuera del proyecto y lectura de .env están prohibidas',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-protect-'));
  try{
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),'AL PREPARAR\nFIN PREPARAR\n');
    await writeFile(join(dir,'.env'),'KEY=secret');
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    await assert.rejects(()=>m.list('../'),/acceso externo al directorio del proyecto bloqueado/);
    await assert.rejects(()=>m.queue('./.env'),/extensión no admitida/);
    await assert.rejects(()=>m.queue('/etc/passwd'),/acceso externo al directorio del proyecto bloqueado/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('El listado no sigue enlaces simbólicos',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-symlinks-'));
  try{
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),'AL PREPARAR\nFIN PREPARAR\n');
    await writeFile(join(dir,'commands','a.pdiscord'),'COMANDO BARRA "a"\n RESPONDER "a"\nFIN\n');
    await symlink(join(dir,'commands','a.pdiscord'),join(dir,'commands','shadow.pdiscord'));
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    assert.deepEqual(await m.list('./commands',true),['./commands/a.pdiscord']);
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('Comandos duplicados cargados dinámicamente se rechazan antes de Discord',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-duplicates-'));
  try{
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),'COMANDO BARRA "repetido"\n RESPONDER "uno"\nFIN\nAL PREPARAR\n CARGAR_MODULO("./commands/duplicado.pdiscord")\nFIN\n');
    await writeFile(join(dir,'commands','duplicado.pdiscord'),'COMANDO BARRA "repetido"\n RESPONDER "dos"\nFIN\n');
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    const i=new Interpreter(p,{},{moduleFunctions:m.api});await i.initialize();await assert.rejects(()=>m.finish(i),/Validator-ComandoDuplicado-Error/);
  }finally{await rm(dir,{recursive:true,force:true});}
});
await test('ES_ADMINISTRADOR, ES_DUENO, COLOR_ROL, CANTIDAD_MIEMBROS',()=>{
  const f=createStdlib();const member={permissions:{has:(p:string)=>p==='Administrator'}};
  assert.equal(f.ES_ADMINISTRADOR(member),true);assert.equal(f.ES_DUENO({id:sid},{ownerId:sid}),true);
  assert.equal(f.CANTIDAD_MIEMBROS({memberCount:35}),35);assert.equal(f.COLOR_ROL({color:0xff2200}),'#ff2200');
});
await test('ESCAPAR_MENCIONES y CODIGO_DISCORD bloquean ping accidental',()=>{
  const f=createStdlib();assert.ok(f.ESCAPAR_MENCIONES('@everyone <@1234>').includes('@\u200beveryone'));
  assert.ok(f.CODIGO_DISCORD('```escape','js').includes('`\u200b``'));
});
await test('EMBED_SIMPLE valida límites y devuelve un objeto para mensajes',()=>{
  const f=createStdlib();assert.deepEqual(f.EMBED_SIMPLE('Título','Descripción','#ff0000'),{embeds:[{title:'Título',description:'Descripción',color:0xff0000}]});
  assert.throws(()=>f.EMBED_SIMPLE('x'.repeat(257),'desc'),/límite|máximo/);
  assert.throws(()=>f.EMBED_SIMPLE('x','desc','xyz'),/no válido/);
});
await test('OBTENER_USUARIO_DISCORD y ENVIAR_PRIVADO permiten resolver IDs mediante cliente',async()=>{
  const sent:any[]=[];const user={id:sid,send:async(p:any)=>{sent.push(p);return {id:cid};}};
  const client={users:{cache:new Map([[sid,user]]),fetch:async()=>user},channels:{cache:new Map(),fetch:async()=>undefined}};
  const f=createStdlib({client});assert.equal(await f.OBTENER_USUARIO_DISCORD(sid),user);
  assert.deepEqual(await f.ENVIAR_PRIVADO(sid,'hola'),{id:cid});
  assert.deepEqual(sent,[{content:'hola',allowedMentions:{parse:['users'],repliedUser:false}}]);
});
await test('ENVIAR_CANAL usa ID o canal; bloquea roles/everyone por defecto',async()=>{
  const sent:any[]=[];const channel={id:cid,send:async(x:any)=>{sent.push(x);return {id:sid};}};
  const f=createStdlib({client:{channels:{cache:new Map([[cid,channel]])}}});
  assert.deepEqual(await f.ENVIAR_CANAL(cid,'Hola @everyone'),{id:sid});
  assert.equal(sent[0].allowedMentions.parse.includes('everyone'),false);
});

await test('Detecta interpolaciones con variables no declaradas antes de ejecutar',()=>{
  const p=parse('COMANDO BARRA "saludar"\n RESPONDER "Hola {nombreNoExiste}"\nFIN\n');
  const result=validate(p,{strictNames:true});
  assert.ok(result.diagnostics.some(x=>x.code==='Semantic-InterpolacionSinResolver-Error'&&x.severity==='error'));
  assert.equal(validate(parse('COMANDO BARRA "saludar"\n RESPONDER "Hola {usuario}"\nFIN\n'),{strictNames:true}).ok,true);
});
await test('CARGAR_MODULO rechaza importaciones que escapan de la carpeta del proyecto',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'pd08-traversal-'));
  const outside=await mkdtemp(join(tmpdir(),'pd08-secret-'));
  try {
    await mkdir(join(dir,'commands'));
    await writeFile(join(dir,'main.pdiscord'),'AL PREPARAR\n CARGAR_MODULO("./commands/mal.pdiscord")\nFIN PREPARAR\n');
    // Pasamos una ruta absoluta al import estático anidado: el handler debe impedirla.
    await writeFile(join(dir,'commands','mal.pdiscord'),`IMPORTAR "${join(outside,'sensible.pdiscord')}"\n`);
    await writeFile(join(outside,'sensible.pdiscord'),'COMANDO BARRA "filtracion"\n RESPONDER "bad"\nFIN\n');
    const p=await loadProgramFile(join(dir,'main.pdiscord'));const m=new ProjectModules(p,dir);
    const i=new Interpreter(p,{},{moduleFunctions:m.api});await i.initialize();
    await assert.rejects(()=>m.finish(i),/ruta externa al proyecto bloqueada/);
  }finally{await rm(dir,{recursive:true,force:true});await rm(outside,{recursive:true,force:true});}
});


await test('El intérprete sugiere funciones con nombres parecidos',async()=>{
  const p=parse('EVENTO "test"\n VARIABLE valor = MENCIONR("123456789012345678")\nFIN\n');
  const i=new Interpreter(p,{});await i.initialize();
  await assert.rejects(()=>i.execute((p.body[0] as any).body,{}),/Coincidencia próxima: 'MENCIONAR'/);
});
await test('Argumentos usuario/autor no ocultan el contexto original',()=>{
  const p=parse('COMANDO BARRA "contexto"\n OPCION usuario TIPO usuario DESCRIPCION "Objetivo"\n RESPONDER "{usuario}"\nFIN\n');
  const diagnostics=validate(p).diagnostics;
  assert.ok(diagnostics.some(x=>x.code==='Validator-OpcionContexto-Error'));
});
await test('Nombre de opción reservado __proto__ se rechaza',()=>{
  assert.throws(()=>parse('COMANDO BARRA "bad"\n OPCION __proto__ TIPO texto\n RESPONDER "x"\nFIN\n'),/reservado/);
});


await test('El contexto estable conserva al autor si OPCION usuario reemplaza la variable corta',async()=>{
  const {PseudoDiscordBot}=await import('../src/runtime/bot.js');
  const p=parse('COMANDO BARRA "probar"\n OPCION usuario TIPO usuario DESCRIPCION "Destinatario"\n RESPONDER "ok"\nFIN\n');
  const bot=new PseudoDiscordBot(p);(bot as any).client={user:{id:cid}};
  const author={id:sid,username:'Autor'},selected={id:rid,username:'Objetivo'};
  const ctx=(bot as any).makeCommandContext({user:author,channel:{id:cid},guild:{id:cid},options:{get:()=>({user:selected})}},p.body[0]);
  assert.equal(ctx.usuario,selected);assert.equal(ctx.argumentos.usuario,selected);
  assert.equal(ctx.contexto.usuario,author);assert.equal(ctx.contexto.autor,author);
  assert.equal(ctx.AUTOR_ID,sid);
});
await test('EMBED_SIMPLE puede responder a una interacción con un payload válido',async()=>{
  const p=parse('COMANDO BARRA "panel"\n RESPONDER EMBED_SIMPLE("Hola", "Descripción")\nFIN\n');
  const replies:any[]=[];const i=new Interpreter(p,{});await i.initialize();
  await i.execute((p.body[0] as any).body,{interaccion:{reply:async(value:any)=>{replies.push(value);}}});
  assert.deepEqual(replies,[{embeds:[{title:'Hola',description:'Descripción',color:0x5865f2}]}]);
});
await test('Los módulos dinámicos pueden incorporar bloques JAVASCRIPT',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pd08-native-'));
 try{
   await mkdir(join(dir,'commands'));
   await writeFile(join(dir,'main.pdiscord'),'AL PREPARAR\n CARGAR_MODULO("./commands/modulo.pdiscord")\nFIN\n');
   await writeFile(join(dir,'commands','modulo.pdiscord'),'COMANDO BARRA "modulo"\n JAVASCRIPT """ console.log(1) """\nFIN COMANDO\n');
   const program=await loadProgramFile(join(dir,'main.pdiscord'));
   const modules=new ProjectModules(program,dir);
   const interpreter=new Interpreter(program,{},{moduleFunctions:modules.api});
   await interpreter.initialize();assert.equal(await modules.finish(interpreter),1);
   assert(program.body.some(d=>d.kind==='DiscordCommandDeclaration'));
 }finally{await rm(dir,{recursive:true,force:true});}
});
console.log(`\n${passed} pruebas nuevas de PseudoDiscord v0.8 superadas.`);
