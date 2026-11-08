import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { Interpreter } from '../src/runtime/interpreter.js';
import { PseudoDiscordBot } from '../src/runtime/bot.js';
import { createStdlib } from '../src/runtime/stdlib.js';

let passed=0;
async function test(name:string,fn:()=>unknown|Promise<unknown>){await fn();console.log(`✓ v0.10 ${name}`);passed++;}
const ids={guild:'123456789012345670',owner:'123456789012345671',actor:'123456789012345672',victim:'123456789012345673',bot:'123456789012345674',channel:'123456789012345675'};
const flags={Administrator:8n,KickMembers:2n,BanMembers:4n,ModerateMembers:1n<<40n};

function mockPrefix(source:string){
  const p=parse(source);const validation=validate(p,{strictNames:true});
  assert.equal(validation.ok,true,JSON.stringify(validation.diagnostics.filter(d=>d.severity==='error')));
  const bot=new PseudoDiscordBot(p);bot.discord={PermissionFlagsBits:flags};
  let handler:(message:any)=>Promise<void>=async()=>{throw new Error('handler ausente');};
  const client={user:{id:ids.bot},on:(event:string,fn:(message:any)=>Promise<void>)=>{if(event==='messageCreate')handler=fn;}};
  (bot as any).client=client;
  const role=(pos:number)=>({position:pos,comparePositionTo:(other:any)=>pos-other.position});
  const guild:any={id:ids.guild,ownerId:ids.owner,client,members:{cache:new Map(),fetch:async(id:string)=>{
    const member=guild.members.cache.get(id);if(member)return member;
    throw Object.assign(new Error('Unknown Member'),{code:10007});
  }}};
  let kicked=0,banned=0;
  const member=(id:string,pos:number,perms:string[])=>({id,user:{id},guild,roles:{highest:role(pos),add:async()=>{},cache:new Map()},permissions:{has:(p:string)=>perms.includes(p)},kickable:true,bannable:true,moderatable:true,kick:async()=>{kicked++;},ban:async()=>{banned++;}});
  const actor=member(ids.actor,50,['KickMembers','BanMembers']);const victim=member(ids.victim,10,[]);
  guild.members.cache.set(actor.id,actor);guild.members.cache.set(victim.id,victim);
  const messages:any[]=[];
  (bot as any).interpreter=new Interpreter(p,bot.discord,{client:()=>client});
  (bot as any).attachMessageCommands();
  return {bot,guild,actor,victim,messages,send:async(content:string)=>{
    const message={content,author:{id:ids.actor,bot:false,username:'Moderador'},guild,member:actor,
      mentions:{members:new Map(),users:new Map(),channels:new Map(),roles:new Map()},
      channel:{id:ids.channel,name:'general'},
      reply:async(payload:any)=>{messages.push(payload);}};
    await handler(message);return messages.at(-1);
  },get kicked(){return kicked;},get banned(){return banned;}};
}
const checkParser=(code:string)=>{const p=parse(code);assert.equal(validate(p,{strictNames:true}).ok,true);return p;};

await test('error personalizado FALTANTE en línea aparte',()=>{
  const p=parse('COMANDO MENSAJE "ban" PREFIJO "!"\n ARGUMENTO objetivo TIPO usuario REQUERIDO\n ERROR FALTANTE "Menciona a alguien"\n RESPONDER "ok"\nFIN\n');
  assert.equal((p.body[0] as any).options[0].errors.faltante,'Menciona a alguien');
});
await test('errores INVALIDO/MINIMO/MAXIMO/ELECCION en la misma línea',()=>{
  const p=parse('COMANDO MENSAJE "uno"\n ARGUMENTO motivo TIPO texto REQUERIDO ERROR FALTANTE "Falta" ERROR MINIMO "Corto" ERROR MAXIMO "Largo" ERROR INVALIDO "Tipo" ERROR ELECCION "Elección"\n RESPONDER "ok"\nFIN\n');
  assert.equal((p.body[0] as any).options[0].errors.minimo,'Corto');
  assert.equal((p.body[0] as any).options[0].errors.maximo,'Largo');
});
await test('ERROR sin calificador sigue siendo instrucción LOG, no configuración',()=>{
  const p=parse('COMANDO MENSAJE "uno"\n ARGUMENTO motivo TIPO texto\n ERROR "Información"\nFIN\n');
  assert.equal((p.body[0] as any).body[0].kind,'LogStatement');
});
await test('errores duplicados se rechazan',()=>{
  assert.throws(()=>parse('COMANDO MENSAJE "uno"\n ARGUMENTO motivo TIPO texto ERROR FALTANTE "a" ERROR FALTANTE "b"\nFIN\n'),/duplicado/);
});
await test('arg __proto__ se rechaza antes de ejecutar incluso sin validar',()=>{
  assert.throws(()=>parse('COMANDO MENSAJE "uno"\n ARGUMENTO __proto__\nFIN\n'),/reservado/);
});
await test('validador bloquea RESTO en argumento no final',()=>{
  const p=parse('COMANDO MENSAJE "x"\n ARGUMENTO motivo TIPO texto RESTO\n ARGUMENTO usuario TIPO usuario\nFIN\n');
  assert.equal(validate(p).ok,false);
});
await test('atajo argumento1 reconocible en modo estricto',()=>{
  checkParser('COMANDO MENSAJE "kick" PREFIJO "!"\n EXPULSAR argumento1\nFIN\n');
});
await test('ENVIAR sin EN usa el canal actual',async()=>{
  const p=checkParser('EVENTO "test"\n ENVIAR "Hola"\nFIN\n');const i=new Interpreter(p);
  const sent:any[]=[];await i.execute((p.body[0] as any).body,{canal:{send:async(v:any)=>sent.push(v)}});
  assert.deepEqual(sent,['Hola']);
});
await test('ENVIAR ... EN canal sigue funcionando',async()=>{
  const p=checkParser('EVENTO "test" destino\n ENVIAR "Hola" EN destino\nFIN\n');const i=new Interpreter(p);
  const sent:any[]=[];await i.execute((p.body[0] as any).body,{destino:{send:async(v:any)=>sent.push(v)}});
  assert.deepEqual(sent,['Hola']);
});
await test('REACCIONAR sin A usa el mensaje actual',async()=>{
  const p=checkParser('EVENTO "test"\n REACCIONAR "👍"\nFIN\n');const i=new Interpreter(p);
  let value:any;await i.execute((p.body[0] as any).body,{mensaje:{react:async(x:any)=>{value=x;}}});assert.equal(value,'👍');
});
await test('ELIMINAR MENSAJE, FIJAR, DESFIJAR sin objeto usan mensaje',async()=>{
  const p=checkParser('EVENTO "test"\n FIJAR\n DESFIJAR\n ELIMINAR MENSAJE\nFIN\n');const i=new Interpreter(p);
  const calls:string[]=[];await i.execute((p.body[0] as any).body,{mensaje:{pin:()=>calls.push('pin'),unpin:()=>calls.push('unpin'),delete:()=>calls.push('delete')}});
  assert.deepEqual(calls,['pin','unpin','delete']);
});
await test('ENVIAR sin canal produce error legible',async()=>{
  const p=parse('EVENTO "test"\n ENVIAR "Hola"\nFIN\n');const i=new Interpreter(p);
  await assert.rejects(()=>i.execute((p.body[0] as any).body,{}),/capacidad de envío/);
});
await test('FECHA_DISCORD sin fecha y EMBED_SIMPLE con una descripción',()=>{
  const api=createStdlib();assert.match(api.FECHA_DISCORD(),/^<t:\d+:f>$/);
  assert.deepEqual(api.EMBED_SIMPLE('Hola').embeds[0],{description:'Hola',color:0x5865f2});
  assert.equal(api.EMBED_SIMPLE('Título','Texto').embeds[0].title,'Título');
});
await test('ID_DE y MENCIONAR aceptan una mención como entrada',()=>{
  const api=createStdlib();assert.equal(api.ID_DE(`<@!${ids.victim}>`),ids.victim);
  assert.equal(api.MENCIONAR(`<@${ids.victim}>`),`<@${ids.victim}>`);
  assert.equal(api.MENCIONAR_ROL(`<@&${ids.victim}>`),`<@&${ids.victim}>`);
});
await test('los validadores de moderación admiten una mención como destino',async()=>{
  const instance=mockPrefix('COMANDO MENSAJE "kick"\n EXPULSAR argumento1\nFIN\n');
  const api=createStdlib({discord:{PermissionFlagsBits:flags}});
  assert.equal(await api.PUEDE_EXPULSAR(instance.actor,`<@${ids.victim}>`),true);
});
await test('comando !kick simple ejecuta con mención sin ARGUMENTO',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "kick" PREFIJO "!"\n EXPULSAR argumento1 POR "Normas"\n RESPONDER "Ok"\nFIN\n');
  const result=await fixture.send(`!kick <@${ids.victim}>`);
  assert.equal(fixture.kicked,1);assert.equal(result,'Ok');
});
await test('comando !kick sin usuario responde error, no falla internamente',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "kick" PREFIJO "!"\n EXPULSAR argumento1\nFIN\n');
  const result=await fixture.send('!kick');assert.equal(fixture.kicked,0);
  assert.match(result.content,/objetivo ausente/);
  assert.deepEqual(result.allowedMentions,{parse:[],repliedUser:false});
});
await test('argumento obligatorio personalizado se muestra sin ejecutar comando',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "ban"\n ARGUMENTO objetivo TIPO usuario REQUERIDO\n ERROR FALTANTE "Menciona un usuario por favor"\n BANEAR objetivo\nFIN\n');
  const result=await fixture.send('!ban');assert.equal(fixture.banned,0);
  assert.match(result.content,/Menciona un usuario por favor/);
});
await test('argumento inválido personalizado no expone errores internos',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "ban"\n ARGUMENTO objetivo TIPO usuario REQUERIDO ERROR INVALIDO "El usuario no existe"\n BANEAR objetivo\nFIN\n');
  const result=await fixture.send('!ban cualquiera');assert.equal(fixture.banned,0);
  assert.match(result.content,/El usuario no existe/);
});
await test('último texto consume un motivo con espacios sin comillas',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "eco"\n ARGUMENTO quien TIPO texto REQUERIDO PALABRA\n ARGUMENTO motivo TIPO texto REQUERIDO\n RESPONDER motivo\nFIN\n');
  const result=await fixture.send('!eco Juan insultos reiterados en el chat');assert.equal(result,'insultos reiterados en el chat');
});
await test('PALABRA evita consumir el resto si se solicita',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "eco"\n ARGUMENTO motivo TIPO texto REQUERIDO PALABRA\n RESPONDER motivo\nFIN\n');
  const result=await fixture.send('!eco una dos tres');assert.equal(result,'una');
});
await test('ERRORES MINIMO/MAXIMO personalizados',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "eco"\n ARGUMENTO motivo TIPO texto REQUERIDO MINIMO 3 MAXIMO 9 ERROR MINIMO "Demasiado corto" ERROR MAXIMO "Demasiado largo"\n RESPONDER motivo\nFIN\n');
  assert.match((await fixture.send('!eco no')).content,/Demasiado corto/);
  assert.match((await fixture.send('!eco demasiadolargo')).content,/Demasiado largo/);
});
await test('PERMISOS sigue bloqueando una expulsión con atajo sin declaración',async()=>{
  const f=mockPrefix('COMANDO MENSAJE "kick"\n PERMISOS EXPULSAR_MIEMBROS\n EXPULSAR argumento1\nFIN\n');
  f.actor.permissions.has=()=>false;
  const result=await f.send(`!kick <@${ids.victim}>`);
  assert.equal(f.kicked,0);assert.match(result.content,/Permisos insuficientes/);
});
await test('el rol superior protege contra kick simple aunque el comando omita PERMISOS',async()=>{
  const f=mockPrefix('COMANDO MENSAJE "kick"\n EXPULSAR argumento1\nFIN\n');
  f.victim.roles.highest.position=100;
  f.victim.roles.highest.comparePositionTo=(other:any)=>100-other.position;
  const result=await f.send(`!kick <@${ids.victim}>`);
  assert.equal(f.kicked,0);assert.match(result.content,/jerarquía/);
});
await test('argumento llamado client no puede reemplazar el cliente interno',async()=>{
  const f=mockPrefix('COMANDO MENSAJE "eco"\n ARGUMENTO client TIPO texto REQUERIDO\n RESPONDER BOT_ID\nFIN\n');
  const result=await f.send('!eco hola');assert.equal(result,ids.bot);
});
await test('ENVIAR_PRIVADO acepta ID de usuario usando cliente de contexto aunque no haya guild',async()=>{
  const p=checkParser('EVENTO "test" destino\n ENVIAR PRIVADO "Hola" A destino\nFIN\n');
  const i=new Interpreter(p);const sent:any[]=[];
  await i.execute((p.body[0] as any).body,{destino:ids.victim,client:{users:{fetch:async()=>({send:async(x:any)=>sent.push(x)})}}});
  assert.deepEqual(sent,['Hola']);
});

await test('funciones de usuario sin parámetro usan el autor actual',async()=>{
  const p=checkParser('EVENTO "test" salida\n salida.id = ID_DE()\n salida.nombre = NOMBRE_DE()\n salida.mencion = MENCIONAR()\n SALIDA = salida\nFIN\n'.replace(' SALIDA = salida\n',''));
  const i=new Interpreter(p);const salida:any={};
  await i.execute((p.body[0] as any).body,{salida,autor:{id:ids.actor,username:'Ana'}});
  assert.equal(salida.id,ids.actor);assert.equal(salida.nombre,'Ana');assert.equal(salida.mencion,`<@${ids.actor}>`);
});
await test('funciones de permisos y roles admiten forma corta y completa',async()=>{
  const p=parse('EVENTO "test" salida\n salida.corto = TIENE_PERMISO("EXPULSAR_MIEMBROS")\n salida.largo = TIENE_PERMISO(miembro, "EXPULSAR_MIEMBROS")\n salida.roles = ROLES_DE()\nFIN\n');
  const i=new Interpreter(p,{PermissionFlagsBits:flags});const salida:any={};
  const miembro={permissions:{has:(s:string)=>s==='KickMembers'},roles:{cache:new Map([['1',{id:'1',name:'Staff'}]])}};
  await i.execute((p.body[0] as any).body,{salida,miembro});
  assert.equal(salida.corto,true);assert.equal(salida.largo,true);assert.deepEqual(salida.roles,['Staff']);
});
await test('PUEDE_EXPULSAR(objetivo) usa actor del contexto sin perder el modo avanzado',async()=>{
  const fixture=mockPrefix('COMANDO MENSAJE "kick"\n EXPULSAR argumento1\nFIN\n');
  const p=checkParser('EVENTO "test" salida, objetivo\n salida.corto = PUEDE_EXPULSAR(objetivo)\n salida.largo = PUEDE_EXPULSAR(miembro, objetivo)\nFIN\n');
  const i=new Interpreter(p,{PermissionFlagsBits:flags});const salida:any={};
  await i.execute((p.body[0] as any).body,{miembro:fixture.actor,objetivo:fixture.victim,salida});
  assert.equal(salida.corto,true);assert.equal(salida.largo,true);
});
await test('ENVIAR_CANAL y ENVIAR_PRIVADO admiten solo contenido en un handler',async()=>{
  const p=checkParser('EVENTO "test"\n ENVIAR_CANAL("Hola canal")\n ENVIAR_PRIVADO("Hola DM")\nFIN\n');
  const i=new Interpreter(p);const sentChannel:any[]=[],sentDM:any[]=[];
  await i.execute((p.body[0] as any).body,{canal:{send:async(x:any)=>sentChannel.push(x)},autor:{send:async(x:any)=>sentDM.push(x)}});
  assert.equal(sentChannel[0].content,'Hola canal');assert.equal(sentDM[0].content,'Hola DM');
});
await test('ENVIAR_CANAL conserva forma avanzada y permite EmbedBuilder',async()=>{
  class EmbedBuilder {}
  const api=createStdlib();const sent:any[]=[];
  await api.ENVIAR_CANAL({send:async(x:any)=>sent.push(x)},new EmbedBuilder());
  assert.deepEqual(sent[0].embeds?.length,1);
  assert.equal(sent[0].embeds[0] instanceof EmbedBuilder,true);
});
await test('OBTENER_MENSAJE usa canal del contexto si recibe solo un ID',async()=>{
  const p=checkParser('EVENTO "test" salida\n salida.respuesta = OBTENER_MENSAJE("123456789012345670")\nFIN\n');
  const i=new Interpreter(p);const salida:any={};const m={id:ids.guild};
  const canal={messages:{cache:new Map([[ids.guild,m]]),fetch:async()=>m}};
  await i.execute((p.body[0] as any).body,{salida,canal});
  assert.equal(salida.respuesta,m);
});
await test('el contexto implícito queda aislado entre ejecuciones simultáneas',async()=>{
  const p=checkParser('EVENTO "test" salida\n ESPERAR 1\n salida.mencion = MENCIONAR()\nFIN\n');
  const i=new Interpreter(p);const a:any={},b:any={};
  await Promise.all([
    i.execute((p.body[0] as any).body,{salida:a,autor:{id:ids.actor}}),
    i.execute((p.body[0] as any).body,{salida:b,autor:{id:ids.victim}})
  ]);
  assert.equal(a.mencion,`<@${ids.actor}>`);assert.equal(b.mencion,`<@${ids.victim}>`);
});
await test('sin contexto las funciones sensibles siguen fallando cerradas',async()=>{
  const api=createStdlib();
  assert.throws(()=>api.ID_DE(),/Referencia Discord no válida/);
  assert.equal(await api.PUEDE_EXPULSAR({id:ids.victim}),false);
  await assert.rejects(()=>api.ENVIAR_CANAL('Hola'),/Cliente Discord no disponible/);
});


await test('DESBANEAR en comando sin PERMISOS no puede ser usado por cualquiera',async()=>{
  const f=mockPrefix('COMANDO MENSAJE "desban"\n DESBANEAR argumento1\nFIN\n');
  f.actor.permissions.has=()=>false;
  const payload=await f.send(`!desban ${ids.victim}`);
  assert.match(payload.content,/Permiso requerido|permisos insuficientes/i);
});
await test('DAR ROL requiere permiso del ejecutor incluso sin PERMISOS',async()=>{
  const f=mockPrefix('COMANDO MENSAJE "dar"\n DAR ROL "Miembro" A argumento1\nFIN\n');
  const payload=await f.send(`!dar <@${ids.victim}>`);
  assert.match(payload.content,/GESTIONAR_ROLES/);
});
await test('acciones privilegiadas también se protegen en menús y componentes',async()=>{
  const p=parse('COMANDO BARRA "test"\n CREAR CANAL "admin"\nFIN\n');
  const b=new PseudoDiscordBot(p);b.discord={PermissionFlagsBits:flags};
  (b as any).client={user:{id:ids.bot}};
  const f=mockPrefix('COMANDO MENSAJE "kick"\n RESPONDER "ok"\nFIN\n');
  const ctx=(b as any).makeBaseInteractionContext({user:{id:ids.actor},member:f.actor,guild:f.guild});
  const i=new Interpreter(p,b.discord);await i.initialize();
  await assert.rejects(()=>i.execute((p.body[0] as any).body,ctx),/GESTIONAR_CANALES/);
});
await test('los eventos automáticos conservan operaciones administrativas sin ejecutor humano',async()=>{
  const p=parse('EVENTO "test"\n CREAR CANAL "informes"\nFIN\n');
  const created:any[]=[];const guild:any={channels:{create:async(opts:any)=>{created.push(opts);}}};
  const i=new Interpreter(p);await i.initialize();
  await i.execute((p.body[0] as any).body,{servidor:guild});
  assert.equal(created[0].name,'informes');
});
await test('no se puede saltar protección administrativa modificando argumentos',async()=>{
  const p=parse('COMANDO BARRA "rol"\n ARGUMENTO objetivo TIPO texto\n argumentos = NULO\n DAR ROL "Staff" A objetivo\nFIN\n');
  const b=new PseudoDiscordBot(p);b.discord={PermissionFlagsBits:flags};
  const f=mockPrefix('COMANDO MENSAJE "kick"\n RESPONDER "ok"\nFIN\n');
  const ctx=(b as any).makeBaseInteractionContext({user:{id:ids.actor},member:f.actor,guild:f.guild});
  ctx.argumentos={objetivo:ids.victim};ctx.objetivo=ids.victim;
  const i=new Interpreter(p,b.discord);await i.initialize();
  await assert.rejects(()=>i.execute((p.body[0] as any).body,ctx),/GESTIONAR_ROLES/);
});

await test('DESBANEAR acepta menciones y rechaza destinos inválidos de forma legible',async()=>{
  const p=parse('EVENTO "test" destino\n DESBANEAR destino\nFIN\n');
  const i=new Interpreter(p);let id:any;
  const servidor={members:{unban:async(target:string)=>{id=target;}}};
  await i.execute((p.body[0] as any).body,{destino:`<@${ids.victim}>`,servidor});
  assert.equal(id,ids.victim);
  await assert.rejects(()=>i.execute((p.body[0] as any).body,{destino:'un ID inválido',servidor}),/identificador de usuario no válido/);
});

console.log(`\n${passed} pruebas nuevas de facilidad/estabilidad v0.10 superadas.`);
