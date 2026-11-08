import assert from 'node:assert/strict';
import { parse } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { createDiagnostic, diagnosticFromError } from '../src/language/diagnostics.js';
import { formatDiagnostic, formatValidationDiagnostic, PseudoDiscordError } from '../src/language/errors.js';
import { moderationBotDenial } from '../src/runtime/moderation-diagnostics.js';

let total = 0;
function test(label: string, run: () => void): void {
  run(); total++;
  console.log(`  ✓ named-diagnostics ${label}`);
}

const named = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-Error$/;

test('errores de lexer, parser y semantic usan nombres', () => {
  assert.equal(diagnosticFromError((() => {try {parse('MOSTRAR "sin cerrar\n')} catch(e) {return e}})()).code, 'Lexer-CadenaSinCerrar-Error');
  const error = (() => {try {parse('EVENTO "x"\n MOSTRAR ???\nFIN')} catch(e) {return e}})();
  assert.ok(error instanceof Error);
  assert.match(diagnosticFromError(error).code, named);
  const results = validate(parse('EVENTO "x"\n ESCRIBIR inexistente\nFIN')).diagnostics;
  assert.ok(results.some(item => item.code === 'Semantic-IdentificadorNoResuelto-Error'));
});

test('avisos conservan severidad y nuevo identificador', () => {
  const result = validate(parse('COMANDO BARRA "test" DESCRIPCION "prueba"\n OPCION usuario TIPO usuario DESCRIPCION "miembro" REQUERIDO\n RESPONDER "{usuario}"\nFIN COMANDO')).diagnostics;
  const diagnostic = result.find(item => item.code === 'Validator-OpcionContexto-Error');
  assert.equal(diagnostic?.severity, 'warning');
  assert.match(formatValidationDiagnostic(diagnostic!), /advertencia Validator-OpcionContexto-Error/);
});

test('JSON conserva identificador y fallback descriptivo', () => {
  assert.equal(diagnosticFromError(new Error('fallo')).code, 'General-Error');
  assert.equal(diagnosticFromError(new PseudoDiscordError('fallo', undefined, 'Parser-Expresion-Error')).code, 'Parser-Expresion-Error');
  assert.equal(diagnosticFromError({code:'ANY_CODE',message:'fallo'}).code, 'General-Error');
  const value = createDiagnostic('error', 'Validator-OpcionDuplicada-Error','Duplicada');
  assert.match(formatValidationDiagnostic(value), /error Validator-OpcionDuplicada-Error/);
  assert.match(formatDiagnostic(new PseudoDiscordError('fallo')), /General-Error/);
});

test('moderación utiliza identificador específico', () => {
  const target = {id:'target',permissions:{has:()=>true}};
  const guild = {ownerId:'other',members:{cache:new Map()},client:{user:{id:'bot'}}};
  assert.match(moderationBotDenial('timeout', target,guild), /Moderacion-TimeoutAdministrador-Error/);
});

console.log(`v0.19: ${total} pruebas de códigos descriptivos superadas`);
