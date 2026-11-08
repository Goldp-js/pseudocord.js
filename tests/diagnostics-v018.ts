import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { createDiagnostic, diagnosticFromError } from '../src/language/diagnostics.js';
import { formatValidationDiagnostic, formatDiagnostic, PseudoDiscordError } from '../src/language/errors.js';
import { moderationBotDenial, moderationExecutorDenial } from '../src/runtime/moderation-diagnostics.js';
import { Interpreter } from '../src/runtime/interpreter.js';

let passed = 0;
async function test(name: string, fn: () => unknown | Promise<unknown>) {
  await fn();
  passed++;
  console.log(`  ✓ v0.18 ${name}`);
}

await test('span completo y sugerencia en diagnóstico semántico', () => {
  const code = 'EVENTO "x"\n ESCRIBIR variableDesconocida\nFIN\n';
  const diagnostics = validate(parse(code, 'diagnosticos.pdiscord')).diagnostics;
  const entry = diagnostics.find(d => d.code === 'Semantic-IdentificadorNoResuelto-Error');
  assert.ok(entry);
  assert.equal(entry.source, 'diagnosticos.pdiscord');
  assert.equal(entry.line, 2);
  assert.equal(entry.endLine, 2);
  assert.ok(entry.endColumn! > entry.column!);
  assert.match(entry.hint!, /identificador/i);
  assert.match(formatValidationDiagnostic(entry, '', code), /\^\^/);
});

await test('ubicación de error léxico se conserva en JSON', () => {
  let failure: unknown;
  try { parse('MOSTRAR "sin cerrar\n', 'fuente.pd'); } catch (error) { failure = error; }
  const diagnostic = diagnosticFromError(failure, 'otro.pd');
  assert.equal(diagnostic.code, 'Lexer-CadenaSinCerrar-Error');
  assert.equal(diagnostic.source, 'fuente.pd');
  assert.equal(diagnostic.line, 1);
  assert.equal(diagnostic.severity, 'error');
});

await test('diagnósticos sin span conservan contrato anterior', () => {
  const result = diagnosticFromError(new Error('Error genérico'), 'entrada.pd');
  assert.equal(result.code, 'General-Error');
  assert.equal(result.line, 1);
  assert.equal(result.column, 1);
  assert.equal(result.source, 'entrada.pd');
  assert.equal(formatValidationDiagnostic(result), 'entrada.pd:1:1: error General-Error: Error genérico');
});

await test('los tabuladores se reflejan en el subrayado', () => {
  const diagnostic = createDiagnostic('error','Pruebas-Subrayado-Error','prueba',{
    start:{line:1,column:2,offset:1},end:{line:1,column:6,offset:5},source:'demo.pd'
  });
  const formatted = formatValidationDiagnostic(diagnostic,'demo.pd','\tABCD');
  assert.match(formatted,/\n     \|     \^\^\^\^/);
});

await test('parser muestra error con contexto multilínea', () => {
  const failure = new PseudoDiscordError('Prueba',{
    source:'demo.pd',start:{line:2,column:2,offset:6},end:{line:2,column:4,offset:8}
  },'Parser-EventoAbreviado-Error');
  assert.match(formatDiagnostic(failure,'primera\n\tXYZ'),/demo\.pd:2:2: error Parser-EventoAbreviado-Error: Prueba/);
});

function mockGuild(options: { owner?: boolean; admin?: boolean; botPermission?: boolean; botPosition?: number; targetPosition?: number } = {}) {
  const guild: any = { id: 'servidor', ownerId: options.owner ? 'target' : 'owner', members: { cache: new Map() }, client:{user:{id:'bot'}} };
  const bot = {id:'bot', guild, permissions: {has:(p:string) => p === 'ModerateMembers' ? options.botPermission !== false : true},roles:{highest:{position:options.botPosition??50}}};
  const target = {id:'target',guild,permissions:{has:(p:string)=>p==='Administrator'&&options.admin === true},roles:{highest:{position:options.targetPosition??10},add:async()=>{}},moderatable:false};
  guild.members.cache.set('bot',bot);
  return {guild,bot,target};
}

await test('diagnóstico moderación: propietario tiene prioridad',()=>{
  const {guild,target}=mockGuild({owner:true,admin:true});
  assert.match(moderationBotDenial('timeout',target,guild),/Moderacion-ObjetivoPropietario-Error.*propietario/);
});
await test('diagnóstico moderación: administrador no admite timeout',()=>{
  const {guild,target}=mockGuild({admin:true});
  assert.match(moderationBotDenial('timeout',target,guild),/Moderacion-TimeoutAdministrador-Error.*Administrador/);
});
await test('diagnóstico moderación: falta el permiso del bot',()=>{
  const {guild,target}=mockGuild({botPermission:false});
  assert.match(moderationBotDenial('timeout',target,guild),/Moderacion-PermisoBot-Error.*ModerateMembers/);
});
await test('diagnóstico moderación: jerarquía inferior',()=>{
  const {guild,target}=mockGuild({botPosition:10,targetPosition:50});
  assert.match(moderationBotDenial('timeout',target,guild),/Moderacion-JerarquiaBot-Error.*rol más alto/);
});
await test('diagnóstico moderación: causa no verificable no se inventa',()=>{
  const {guild,target}=mockGuild();
  guild.members.cache.clear();
  assert.match(moderationBotDenial('timeout',target,guild),/Moderacion-CapacidadBot-Error/);
});
await test('diagnóstico moderación: ejecutor carece de permisos',()=>{
  const {guild,target}=mockGuild();
  const actor={id:'actor',roles:{highest:{position:40}},permissions:{has:()=>false}};
  assert.match(moderationExecutorDenial('timeout',actor,target,guild),/Moderacion-PermisoEjecutor-Error.*ModerateMembers/);
});
await test('diagnóstico moderación: ejecutor tiene jerarquía insuficiente',()=>{
  const {guild,target}=mockGuild({targetPosition:50});
  const actor={id:'actor',roles:{highest:{position:40}},permissions:{has:()=>true}};
  assert.match(moderationExecutorDenial('timeout',actor,target,guild),/Moderacion-JerarquiaEjecutor-Error.*rol más alto/);
});
await test('integración: denegación del intérprete incluye causa comprobada',async()=>{
  const program = parse('EVENTO "test" objetivo\n SILENCIAR objetivo POR "10m"\nFIN');
  const interpreter=new Interpreter(program); await interpreter.initialize();
  const {guild,target}=mockGuild({admin:true});
  await assert.rejects(()=>interpreter.execute((program.body[0] as any).body,{objetivo:target,servidor:guild}),/Moderacion-TimeoutAdministrador-Error/);
});

console.log(`v0.18: ${passed} pruebas de diagnóstico superadas`);
