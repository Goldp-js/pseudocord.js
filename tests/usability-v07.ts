import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { createStdlib } from '../src/runtime/stdlib.js';
import { PSEUDODISCORD_STDLIB } from '../src/ast/stdlib.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';
import { loadProgramFile } from '../src/language/loader.js';
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let passes=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>){try{await fn();console.log(`✓ v0.7 ${name}`);passes++;}catch(e){console.error(`✗ v0.7 ${name}`);throw e;}}
const sampleId='123456789012345678';
const sampleRole='123456789012345679';
const sampleChan='123456789012345680';

await test('MENCIONAR, MENCIONAR_ROL y MENCIONAR_CANAL usan IDs correctos',()=>{
 const f=createStdlib();
 assert.equal(f.MENCIONAR({id:sampleId}),`<@${sampleId}>`);
 assert.equal(f.MENCIONAR_ROL(sampleRole),`<@&${sampleRole}>`);
 assert.equal(f.MENCIONAR_CANAL({id:sampleChan}),`<#${sampleChan}>`);
 assert.throws(()=>f.MENCIONAR('mal'),/Referencia Discord no válida/);
});
await test('NOMBRE_DE, NOMBRE_VISIBLE, ES_BOT, AVATAR_DE',()=>{
 const f=createStdlib();
 const user={id:sampleId,username:'ana',globalName:'Anita',bot:true,displayAvatarURL:({size}:any)=>`https://cdn.discordapp.com/${size}.png`};
 assert.equal(f.NOMBRE_DE(user),'ana');assert.equal(f.NOMBRE_VISIBLE(user),'Anita');
 assert.equal(f.NOMBRE_VISIBLE({nickname:'Jefa',user}),'Jefa');
 assert.equal(f.ES_BOT({user}),true);assert.equal(f.AVATAR_DE(user,512),'https://cdn.discordapp.com/512.png');
 assert.throws(()=>f.AVATAR_DE(user,33),/tamaño no admitido/);
});
await test('ROLES_DE, TIENE_ROL y TIENE_PERMISO reconocen alias español',()=>{
 const f=createStdlib();
 const member={roles:{cache:new Map([[sampleRole,{id:sampleRole,name:'Moderadores'}]])},permissions:{has:(x:string)=>x==='ManageMessages'}};
 assert.deepEqual(f.ROLES_DE(member),['Moderadores']);
 assert.equal(f.TIENE_ROL(member,sampleRole),true);assert.equal(f.TIENE_ROL(member,'moderadores'),true);
 assert.equal(f.TIENE_ROL(member,'VIP'),false);
 assert.equal(f.TIENE_PERMISO(member,'GESTIONAR_MENSAJES'),true);
 assert.equal(f.TIENE_PERMISO(member,'KickMembers'),false);
 assert.throws(()=>f.TIENE_PERMISO(member,'ABSURDO'),/no reconocido/);
});
await test('TIENE_PERMISO soporta máscaras API de interacción (BigInt/string)',()=>{
 const f=createStdlib({discord:{PermissionFlagsBits:{Administrator:8n,ManageMessages:8192n}}});
 assert.equal(f.TIENE_PERMISO({permissions:'8192'},'GESTIONAR_MENSAJES'),true);
 assert.equal(f.TIENE_PERMISO({permissions:'0'},'ManageMessages'),false);
 assert.equal(f.TIENE_PERMISO({permissions:'8'},'ManageMessages'),true);
});
await test('PRIMER_MENCIONADO, ENLACE_MENSAJE, FECHA_DISCORD',()=>{
 const f=createStdlib();const user={id:sampleId};
 assert.deepEqual(f.PRIMER_MENCIONADO({author:user,mentions:{users:new Map([[sampleId,user]])}}),user);
 assert.deepEqual(f.PRIMER_MENCIONADO({author:user},true),user);
 assert.equal(f.ENLACE_MENSAJE({id:sampleId,channelId:sampleChan,guildId:sampleRole}),`https://discord.com/channels/${sampleRole}/${sampleChan}/${sampleId}`);
 assert.equal(f.FECHA_DISCORD(new Date('2026-01-01T00:00:00.000Z'),'R'),'<t:1767225600:R>');
});
await test('Interpolación ejecuta funciones simples de Discord con NativeAccess=false',async()=>{
 const source=`EVENTO "test" usuario, salida\n salida.resultado = "Hola {MENCIONAR(usuario)} / {NOMBRE_DE(usuario)}"\nFIN\n`;
 const p=parse(source);assert.equal(validate(p,{strictNames:true}).ok,true);
 const i=new Interpreter(p,{}, {});await i.initialize();
 const salida:any={};await i.execute((p.body[0] as any).body,{usuario:{id:sampleId,username:'Ana'},salida});
 assert.equal(salida.resultado,`Hola <@${sampleId}> / Ana`);
});
await test('RESPONDER EFIMERO y SIN MENCIONES son opciones ejecutables en slash',async()=>{
 const p=parse('COMANDO BARRA "hola" DESCRIPCION "Saluda"\n RESPONDER "Hola" EFIMERO SIN MENCIONES\nFIN COMANDO\n');
 const result=validate(p,{strictNames:true});assert.equal(result.ok,true,JSON.stringify(result.diagnostics));
 const responses:any[]=[];const interaction={reply:async(x:any)=>responses.push(x),user:{id:sampleId,username:'ana'}};
 const i=new Interpreter(p,{MessageFlags:{Ephemeral:64}},{});await i.initialize();
 await i.execute((p.body[0] as any).body,{interaccion:interaction,interaction});
 assert.deepEqual(responses,[{content:'Hola',flags:64,allowedMentions:{parse:[],repliedUser:false}}]);
});
await test('RESPONDER EFIMERO rechaza uso fuera de interacciones',async()=>{
 const p=parse('EVENTO "test" mensaje\n RESPONDER "Hola" EFIMERO\nFIN\n');
 const i=new Interpreter(p,{}, {});await i.initialize();
 await assert.rejects(()=>i.execute((p.body[0] as any).body,{mensaje:{reply:async()=>{}}}),/únicamente disponible/);
});
await test('RESPONDER SIN MENCIONES funciona también en mensajes por prefijo',async()=>{
 const p=parse('EVENTO "test" mensaje\n RESPONDER "Hola" SIN_MENCIONES\nFIN\n');
 const i=new Interpreter(p,{}, {});await i.initialize();
 const responses:any[]=[];await i.execute((p.body[0] as any).body,{mensaje:{reply:async(x:any)=>responses.push(x)}});
 assert.deepEqual(responses,[{content:'Hola',allowedMentions:{parse:[],repliedUser:false}}]);
});
await test('Los argumentos prefijo inválidos generan errores concretos',async()=>{
 const bot=new PseudoDiscordBot(parse('COMANDO MENSAJE "x"\n RESPONDER "ok"\nFIN\n'));
 const convert=(bot as any).convertMessageArg.bind(bot);
 await assert.rejects(()=>convert('3.5','entero',{},0),/entero seguro/);
 await assert.rejects(()=>convert('hola','numero',{},0),/número finito/);
 await assert.rejects(()=>convert('talvez','booleano',{},0),/VERDADERO\/FALSO/);
 assert.equal(await convert('sí','booleano',{},0),true);
 assert.equal(await convert('no','booleano',{},0),false);
 assert.equal(await convert('-5','entero',{},0),-5);
});
await test('OPCION con MINIMO antes de TIPO mantiene el mismo sentido',()=>{
 const p=parse('COMANDO BARRA "prueba"\n OPCION edad MINIMO 1 MAXIMO 50 TIPO entero\n RESPONDER "bien"\nFIN\n');
 const o=(p.body[0] as any).options[0];assert.equal(o.minValue,1);assert.equal(o.maxValue,50);assert.equal(o.minLength,undefined);
 assert.equal(validate(p).ok,true);
});
await test('Los permisos se validan; alias español reconocido',()=>{
 const ok=parse('COMANDO BARRA "moderacion"\n PERMISOS ADMINISTRADOR, GESTIONAR_MENSAJES\n RESPONDER "ok"\nFIN\n');
 assert.equal(validate(ok).ok,true);
 const no=parse('COMANDO BARRA "moderacion"\n PERMISOS NO_EXISTE\n RESPONDER "ok"\nFIN\n');
 assert.ok(validate(no).diagnostics.some(d=>d.code==='Validator-PermisoDiscord-Error'&&d.severity==='error'));
});
await test('Errores claros para TIPO desconocido, límites y opciones requeridas',()=>{
 const bad=parse('COMANDO BARRA "bad"\n OPCION a TIPO fruta MINIMO 10 MAXIMO 1\n OPCION b TIPO texto\n OPCION c TIPO texto REQUERIDO\n RESPONDER "ok"\nFIN\n');
 const codes=validate(bad).diagnostics.map(d=>d.code);
 for(const c of ['Validator-TipoOpcion-Error','Validator-LimitesOpcion-Error','Validator-OrdenOpciones-Error'])assert.ok(codes.includes(c),`${c} faltante: ${codes.join()}`);
});
await test('Detecta colisiones de alias de comandos por prefijo',()=>{
 const p=parse('COMANDO MENSAJE "hola" PREFIJO "!" ALIAS "h"\n RESPONDER "hola"\nFIN\nCOMANDO MENSAJE "otro" PREFIJO "!" ALIAS "h"\n RESPONDER "otro"\nFIN\n');
 assert.ok(validate(p).diagnostics.some(d=>d.code==='Validator-PrefijoDuplicado-Error'));
});
await test('Variables de contexto amigables son inyectadas por el adaptador',()=>{
 const p=parse('COMANDO BARRA "test" DESCRIPCION "Prueba"\n RESPONDER "Hola {autorNombre}, estás en {nombreServidor}"\nFIN\n');
 const bot=new PseudoDiscordBot(p);(bot as any).client={user:{id:'112233445566778899'}};
 const c=(bot as any).makeBaseInteractionContext({user:{id:sampleId,username:'Lucía'},channel:{id:sampleChan,name:'general'},guild:{id:sampleRole,name:'Mi servidor'}});
 assert.equal(c.autorId,sampleId);assert.equal(c.autorNombre,'Lucía');assert.equal(c.canalId,sampleChan);
 assert.equal(c.servidorId,sampleRole);assert.equal(c.nombreServidor,'Mi servidor');
 assert.equal(c.botId,'112233445566778899');assert.equal(c.AUTOR_ID,sampleId);assert.equal(c.NOMBRE_SERVIDOR,'Mi servidor');
 assert.equal(validate(p,{strictNames:true}).ok,true);
});
await test('Catálogo stdlib está sincronizado con la implementación',()=>{
 assert.deepEqual(new Set(Object.values(PSEUDODISCORD_STDLIB).flat()),new Set(Object.keys(createStdlib())));
});
await test('IMPORTAR carpeta * carga archivos hermanos en orden',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pd07-glob-'));
 try {
  await mkdir(join(dir,'commands'));
  await writeFile(join(dir,'main.pdiscord'),'IMPORTAR "./commands/*"\n');
  await writeFile(join(dir,'commands','b.pdiscord'),'COMANDO BARRA "beta"\n RESPONDER "b"\nFIN\n');
  await writeFile(join(dir,'commands','a.pdiscord'),'COMANDO BARRA "alfa"\n RESPONDER "a"\nFIN\n');
  const p=await loadProgramFile(join(dir,'main.pdiscord'));
  assert.deepEqual(p.body.map(x=>(x as any).name),['alfa','beta']);
  assert.equal(validate(p).ok,true);
 } finally { await rm(dir,{recursive:true,force:true}); }
});
await test('IMPORTAR carpeta ** carga subcarpetas, deduplica archivos y omite symlinks',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pd07-glob-rec-'));
 try {
  await mkdir(join(dir,'commands','admin'),{recursive:true});
  await writeFile(join(dir,'main.pdiscord'),'IMPORTAR "./commands/**"\nIMPORTAR "./commands/admin/ban.pdiscord"\n');
  await writeFile(join(dir,'commands','ping.pdiscord'),'COMANDO BARRA "ping"\n RESPONDER "pong"\nFIN\n');
  await writeFile(join(dir,'commands','admin','ban.pdiscord'),'COMANDO BARRA "ban"\n RESPONDER "ban"\nFIN\n');
  await symlink(join(dir,'commands','admin','ban.pdiscord'),join(dir,'commands','copia.pdiscord'));
  const p=await loadProgramFile(join(dir,'main.pdiscord'));
  assert.equal(p.body.length,2);assert.equal(validate(p).ok,true);
 } finally { await rm(dir,{recursive:true,force:true}); }
});
await test('IMPORTAR carpeta fallida informa si no existen comandos',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pd07-glob-none-'));
 try {
  await mkdir(join(dir,'commands'));
  await writeFile(join(dir,'main.pdiscord'),'IMPORTAR "./commands/**"\n');
  await assert.rejects(()=>loadProgramFile(join(dir,'main.pdiscord')),/sin archivos/);
 } finally { await rm(dir,{recursive:true,force:true}); }
});
console.log(`\n${passes} pruebas nuevas de usabilidad v0.7 superadas.`);
