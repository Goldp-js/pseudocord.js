import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {parse} from '../src/language/parser.js';
import {validate} from '../src/language/validator.js';
import {PseudoDiscordBot} from '../src/runtime/bot.js';
import {Interpreter} from '../src/runtime/interpreter.js';

let count=0;
const test=async(name:string,run:()=>Promise<void>|void)=>{await run();count++;console.log(`✓ v0.30 ${name}`);};
const initiator={id:'123456789012345678',username:'Ejecutor'};
const target={id:'123456789012345679',username:'Objetivo'};
const guild={id:'123456789012345680',name:'Servidor'};

await test('OPCION usuario conserva contexto.usuario y expone contexto.argumentos',async()=>{
  const p=parse('COMANDO BARRA "avatar" DESCRIPCION "Avatar"\n OPCION usuario TIPO usuario DESCRIPCION "Objetivo"\n RESPONDER "{NOMBRE_DE(contexto.usuario)}|{NOMBRE_DE(argumentos.usuario)}|{NOMBRE_DE(contexto.argumentos.usuario)}"\nFIN COMANDO\n');
  const bot=new PseudoDiscordBot(p);bot.client={user:{id:'123456789012345681'}};
  const command=p.body[0] as any;
  const ctx=(bot as any).makeCommandContext({user:initiator,guild,options:{get:()=>({user:target})}},command);
  assert.equal(ctx.usuario,target);
  assert.equal(ctx.contexto.usuario,initiator);
  assert.equal(ctx.contexto.autor,initiator);
  assert.equal(ctx.contexto.ejecutor,initiator);
  assert.strictEqual(ctx.contexto.argumentos,ctx.argumentos);
  assert.equal(ctx.contexto.argumentos.usuario,target);
  assert.equal(ctx.contexto.infoComando.nombre,'avatar');
  const out:any[]=[];ctx.interaccion={reply:async (x:any)=>{out.push(x);return x;}};
  const interp=new Interpreter(p);await interp.initialize();await interp.execute(command.body,ctx);
  assert.deepEqual(out,['Ejecutor|Objetivo|Objetivo']);
  assert.equal(Object.getPrototypeOf(ctx.contexto),null);
  assert.equal(Object.isFrozen(ctx.contexto),true);
});

await test('OPCION autor no sustituye contexto.autor ni contexto.usuario',()=>{
  const p=parse('COMANDO BARRA "actor" DESCRIPCION "Prueba"\n OPCION autor TIPO usuario DESCRIPCION "Objetivo"\n RESPONDER "ok"\nFIN COMANDO');
  const bot=new PseudoDiscordBot(p);
  const ctx=(bot as any).makeCommandContext({user:initiator,options:{get:()=>({user:target})}},p.body[0]);
  assert.equal(ctx.contexto.autor,initiator);
  assert.equal(ctx.autor,initiator);
  assert.equal(ctx.argumentos.autor,target);
  assert.equal(ctx.contexto.argumentos.autor,target);
  assert.equal(validate(p).diagnostics.some(x=>x.code==='Validator-OpcionContexto-Error'),false); // Solo la declaración no es ambigua.
});

await test('opciones opcionales mantienen valor INDEFINIDO sin sustituir al ejecutor del contexto',()=>{
  const p=parse('COMANDO BARRA "optional" DESCRIPCION "Prueba"\n OPCION usuario TIPO usuario DESCRIPCION "Objetivo" OPCIONAL\n RESPONDER "ok"\nFIN COMANDO');
  const bot=new PseudoDiscordBot(p);
  const ctx=(bot as any).makeCommandContext({user:initiator,options:{get:()=>undefined}},p.body[0]);
  assert.equal(ctx.usuario,undefined); // Alias corto compatible con v0.25
  assert.equal(ctx.contexto.usuario,initiator);
  assert.equal(ctx.contexto.argumentos.usuario,undefined);
});

await test('comandos de menú contextual exponen objetivo y autor por rutas independientes',()=>{
  const bot=new PseudoDiscordBot(parse(''));
  const ctx=(bot as any).makeBaseInteractionContext({user:initiator,guild});
  ctx.objetivo=target;ctx.usuarioObjetivo=target;
  assert.equal(ctx.contexto.usuario,initiator);
  assert.equal(ctx.contexto.autor,initiator);
  assert.equal(ctx.contexto.objetivo,target);
  assert.equal(ctx.contexto.usuarioObjetivo,target);
  assert.equal(ctx.contexto.mensajeObjetivo,undefined);
  assert.strictEqual(ctx.contexto.argumentos,ctx.argumentos);
  const msg={id:'123456789012345682',author:target};
  ctx.objetivo=msg;ctx.mensajeObjetivo=msg;
  assert.strictEqual(ctx.contexto.mensajeObjetivo,msg);
});

await test('eventos GuildMember y voz mantienen alias miembro; contexto.usuario es User',()=>{
  const bot=new PseudoDiscordBot(parse(''));
  const member={id:initiator.id,user:initiator,guild,roles:{cache:new Map()}};
  const ev=(bot as any).makeEventContext({event:'guildMemberAdd',parameters:[]},[member]);
  assert.equal(ev.usuario,member); // Compatibilidad del alias histórico
  assert.equal(ev.miembro,member);
  assert.equal(ev.contexto.usuario,initiator);
  assert.equal(ev.autorId,initiator.id);
  assert.equal(ev.contexto.autor,undefined); // No inventar un autor para eventos automáticos.
  const voice=(bot as any).makeEventContext({event:'voiceStateUpdate',parameters:[]},[{}, {member,guild,channel:{id:'123456789012345683'}}]);
  assert.equal(voice.usuario,member);
  assert.equal(voice.contexto.usuario,initiator);
  assert.equal(voice.contexto.miembro,member);
});

await test('comandos con prefijo preservan identidad y rellenan contexto.argumentos',async()=>{
  const p=parse('COMANDO MENSAJE "avatar" PREFIJO "!"\n ARGUMENTO usuario TIPO usuario DESCRIPCION "Objetivo"\n RESPONDER "OK"\nFIN COMANDO');
  const bot=new PseudoDiscordBot(p);
  const client=new EventEmitter() as EventEmitter & {user?:any};client.user={id:'123456789012345684'};
  bot.client=client;
  let capture:any;let finish!:()=>void;
  const done=new Promise<void>(r=>{finish=r;});
  (bot as any).interpreter={execute:async(_body:any,ctx:any)=>{capture=ctx;finish();}};
  (bot as any).attachMessageCommands();
  client.emit('messageCreate',{
    content:`!avatar <@${target.id}>`,author:initiator,guild,channel:{id:'123456789012345685'},
    mentions:{users:new Map([[target.id,target]])},reply:async()=>undefined
  });
  await done;
  assert.equal(capture.usuario,target);
  assert.equal(capture.contexto.usuario,initiator);
  assert.equal(capture.contexto.autor,initiator);
  assert.equal(capture.argumentos.usuario,target);
  assert.strictEqual(capture.contexto.argumentos,capture.argumentos);
});

await test('solo el uso corto de usuario produce advertencia; las rutas explícitas no',()=>{
  const prefix='COMANDO BARRA "perfil" DESCRIPCION "Perfil"\n OPCION usuario TIPO usuario DESCRIPCION "Persona"\n';
  const suffix='\nFIN COMANDO';
  const warnings=(body:string)=>validate(parse(prefix+body+suffix)).diagnostics.filter(x=>x.code==='Validator-OpcionContexto-Error');
  assert.equal(warnings(' RESPONDER "{NOMBRE_DE(contexto.usuario)} | {NOMBRE_DE(argumentos.usuario)}"').length,0);
  assert.equal(warnings(' RESPONDER "{NOMBRE_DE(contexto.argumentos.usuario)}"').length,0);
  assert.equal(warnings(' RESPONDER "sin variables"').length,0);
  const bare=warnings(' RESPONDER "{NOMBRE_DE(usuario)}"');
  assert.equal(bare.length,1);
  assert.equal(bare[0]?.severity,'warning');
  assert.match(bare[0]!.message,/argumentos\.usuario/);
  assert.match(bare[0]!.message,/contexto\.usuario/);
  assert.equal(bare[0]?.line,3);
  assert.equal(warnings(' RESPONDER "{usuario.username}"').length,1);
  assert.equal(warnings(' VARIABLE copia = usuario\n RESPONDER "ok"').length,1);
  assert.equal(warnings(' VARIABLE usuario = "local"\n RESPONDER "{usuario}"').length,0);
});

await test('separa advertencias por subcomando y funciona con argumento autor protegido',()=>{
  const program=parse(`COMANDO BARRA "admin" DESCRIPCION "Admin"
 SUBCOMANDO "ver" DESCRIPCION "Ver"
  OPCION usuario TIPO usuario DESCRIPCION "Persona"
  RESPONDER "{contexto.usuario.username} {argumentos.usuario.username}"
 FIN SUBCOMANDO
 SUBCOMANDO "otro" DESCRIPCION "Otro"
  OPCION autor TIPO usuario DESCRIPCION "Persona"
  RESPONDER "{autor.username}"
 FIN SUBCOMANDO
FIN COMANDO`);
  const warnings=validate(program).diagnostics.filter(x=>x.code==='Validator-OpcionContexto-Error');
  assert.equal(warnings.length,1);
  assert.match(warnings[0]!.message,/Identificador ambiguo 'autor'/);
  assert.match(warnings[0]!.message,/contexto\.autor/);
  assert.match(warnings[0]!.message,/argumentos\.autor/);
});

await test('rutas explícitas funcionan durante la ejecución aun con nombres colisionados',async()=>{
  const program=parse(`COMANDO BARRA "comparar" DESCRIPCION "Compara"
 OPCION usuario TIPO usuario DESCRIPCION "Persona"
 RESPONDER "{contexto.usuario.username} / {argumentos.usuario.username}"
FIN COMANDO`);
  const bot=new PseudoDiscordBot(program);
  const ctx=(bot as any).makeCommandContext({user:initiator,options:{get:()=>({user:target})}},program.body[0]);
  const replies:string[]=[];
  ctx.interaccion={reply:async (v:string)=>{replies.push(v);return v;}};
  const interpreter=new Interpreter(program);await interpreter.initialize();await interpreter.execute((program.body[0] as any).body,ctx);
  assert.deepEqual(replies,['Ejecutor / Objetivo']);
});

await test('OPCION objetivo siempre crea binding corto cuando está declarada',async()=>{
  const program=parse(`COMANDO BARRA "avatar" DESCRIPCION "Avatar"
 OPCION objetivo TIPO usuario DESCRIPCION "Persona" OPCIONAL
 RESPONDER "{NOMBRE_DE(objetivo)}"
FIN COMANDO`);
  const bot=new PseudoDiscordBot(program);
  const command=program.body[0];
  const provided=(bot as any).makeCommandContext({user:initiator,options:{get:()=>({user:target})}},command);
  assert.equal(provided.objetivo,target);
  assert.equal(provided.argumentos.objetivo,target);
  assert.equal(provided.contexto.usuario,initiator);
  const omitted=(bot as any).makeCommandContext({user:initiator,options:{get:()=>undefined}},command);
  assert.equal(Object.hasOwn(omitted,'objetivo'),true);
  assert.equal(Object.hasOwn(omitted.argumentos,'objetivo'),true);
  assert.equal(omitted.objetivo,undefined);
  assert.equal(validate(program).diagnostics.some(d=>d.code==='Validator-OpcionContexto-Error'),false);
});

console.log(`\nv0.30: ${count} pruebas de contexto superadas.`);
