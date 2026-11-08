import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PseudoClient } from '../src/index.js';
import { parse } from '../src/language/parser.js';
import { ProjectModules } from '../src/runtime/project-modules.js';
import { Interpreter } from '../src/runtime/interpreter.js';

let passed = 0;
async function test(label:string,fn:()=>void|Promise<void>):Promise<void>{
  await fn(); passed++; console.log(`✓ v0.24 ${label}`);
}
const root=await mkdtemp(join(tmpdir(),'pd024-'));
try {
  await mkdir(join(root,'commands','nested'),{recursive:true});
  await writeFile(join(root,'commands','a.pd'),'COMANDO BARRA "alpha" DESCRIPCION "A"\n RESPONDER "a"\nFIN COMANDO\n');
  await writeFile(join(root,'commands','nested','b.pdiscord'),'COMANDO BARRA "beta" DESCRIPCION "B"\n RESPONDER "b"\nFIN COMANDO\n');
  await writeFile(join(root,'commands','notes.txt'),'not code');
  await writeFile(join(root,'project.config.json'),'{ NO ES JSON VALIDO');

  await test('compilar sin token ni leer proyecto JSON, incluso si el JSON es inválido',async()=>{
    const client=new PseudoClient({projectRoot:root});
    client.loadCommands('./commands');
    const p=await client.compile();
    assert.deepEqual(p.body.filter(x=>x.kind==='DiscordCommandDeclaration').map((x:any)=>x.name),['alpha','beta']);
    await assert.rejects(()=>client.start(),/PseudoClient-TokenRequerido-Error/);
  });
  await test('LOGIN BOT ENV no se incluye en AST y ofrece migración clara',()=>{
    assert.throws(()=>parse('LOGIN BOT ENV "DISCORD_TOKEN"'),/Parser-LoginObsoleto-Error/);
  });
  await test('listado de módulos y loadCommands comparten exclusión de TXT y orden estable',async()=>{
    const program=parse('AL PREPARAR\nFIN PREPARAR\n');
    (program as any).entryFile=join(root,'main.pdiscord');
    const mods=new ProjectModules(program,root);
    assert.deepEqual(await mods.list('./commands',true),['./commands/a.pd','./commands/nested/b.pdiscord']);
    assert.deepEqual(await mods.list('./commands',false),['./commands/a.pd']);
  });
  await test('CARGAR_MODULO sigue funcionando desde AL PREPARAR',async()=>{
    const program=parse('AL PREPARAR\n CARGAR_MODULO("./commands/a.pd")\nFIN PREPARAR\n');
    (program as any).entryFile=join(root,'main.pdiscord');
    const mods=new ProjectModules(program,root);
    const interpreter=new Interpreter(program,{},{moduleFunctions:mods.api});
    await interpreter.initialize();
    assert.equal(await mods.finish(interpreter),1);
    assert.equal(program.body.filter(x=>x.kind==='DiscordCommandDeclaration').length,1);
  });
  await test('módulos usan projectRoot aunque el primer comando esté anidado',async()=>{
    await mkdir(join(root,'shared'),{recursive:true});
    await writeFile(join(root,'shared','util.pd'),'FUNCION UTIL24()\n RETORNAR 24\nFIN FUNCION\n');
    const program=parse('AL PREPARAR\n CARGAR_MODULO("./shared/util.pd")\nFIN PREPARAR\n');
    (program as any).entryFile=join(root,'commands','nested','b.pdiscord');
    const mods=new ProjectModules(program,root);
    const interpreter=new Interpreter(program,{},{moduleFunctions:mods.api});
    await interpreter.initialize();
    assert.equal(await mods.finish(interpreter),1);
    assert.equal(program.body.some(x=>x.kind==='FunctionDeclaration'),true);
  });
  await test('archivos externos o extensiones incorrectas siguen bloqueados',async()=>{
    const client=new PseudoClient({projectRoot:root});
    client.loadCommands('./commands/notes.txt');
    await assert.rejects(()=>client.compile(),/PseudoClient-Extension-Error/);
    const outside=new PseudoClient({projectRoot:root});outside.loadCommands('../');
    await assert.rejects(()=>outside.compile(),/PseudoClient-RutaExterna-Error/);
  });
  await test('listado recursivo ignora enlaces simbólicos',async()=>{
    const source=join(root,'commands','nested','b.pdiscord');
    try{await symlink(source,join(root,'commands','shadow.pdiscord'));}catch{return;}
    const program=parse('AL PREPARAR\nFIN PREPARAR\n');
    (program as any).entryFile=join(root,'main.pdiscord');
    const mods=new ProjectModules(program,root);
    assert.equal((await mods.list('./commands',true)).length,2);
  });
  await test('se acepta base de datos persistente y se rechaza si falta',()=>{
    assert.throws(()=>new PseudoClient({cooldownStorage:'database'}),/PseudoClient-BaseDeDatos-Error/);
    assert.doesNotThrow(()=>new PseudoClient({cooldownStorage:'database',database:{provider:'sqlite',namespace:'demo',sqliteFile:':memory:'}}));
  });
  await test('se valida duración e iteraciones en la API JS',()=>{
    assert.throws(()=>new PseudoClient({maxIterations:0}),/PseudoClient-Limite-Error/);
    assert.throws(()=>new PseudoClient({maxExecutionMs:-1}),/PseudoClient-Limite-Error/);
  });
  await test('la API pública elimina alias discordClient y conserva discord',()=>{
    const client=new PseudoClient();
    assert.equal('discordClient' in client,false);
    assert.equal(client.discord,undefined);
  });
}finally{await rm(root,{recursive:true,force:true});}
console.log(`Arquitectura v0.24: ${passed} pruebas superadas.`);
