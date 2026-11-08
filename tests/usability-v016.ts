import assert from 'node:assert/strict';
import {parse} from '../src/language/parser.js';
import {validate} from '../src/language/validator.js';
import {PseudoDiscordError,formatDiagnostic,formatValidationDiagnostic} from '../src/language/errors.js';
import {CommandCooldowns} from '../src/runtime/cooldowns.js';
import {createStdlib} from '../src/runtime/stdlib.js';

let count=0;
const test=async(name:string,fn:()=>void|Promise<void>)=>{await fn();count++;console.log('  ✓',name);};
const source=`COMANDO BARRA "admin" DESCRIPCION "Administración"
    SUBCOMANDO "silenciar" DESCRIPCION "Silenciar miembro"
        OPCION usuario TIPO usuario DESCRIPCION "Miembro" REQUERIDO
        OPCION tiempo TIPO texto DESCRIPCION "Duración" REQUERIDO
        RESPONDER "{usuario}"
    FIN SUBCOMANDO
FIN COMANDO
`;
const filename='bot_avanzado.pdiscord';
const parsed=parse(source,filename);
const problems=validate(parsed).diagnostics;
const pd369=problems.find(x=>x.code==='Validator-OpcionContexto-Error');
await test('Validator-OpcionContexto-Error identifica el uso ambiguo y no la declaración',()=>{
  assert.ok(pd369);
  assert.equal(pd369.line,5);
  assert.equal(pd369.column,source.split('\n')[4]!.indexOf('\"')+1);
  assert.equal(pd369.source,filename);
});
await test('Validator-OpcionContexto-Error incluye las rutas inequívocas de argumento y contexto',()=>{
  assert.match(pd369!.message, /Identificador ambiguo 'usuario'/);
  assert.match(pd369!.message, /argumentos\.usuario/);
  assert.match(pd369!.message, /contexto\.usuario/);
});
await test('formato estable de ubicación, nivel y código',()=>{
  assert.match(formatValidationDiagnostic(pd369!),/^bot_avanzado\.pdiscord:5:19: advertencia Validator-OpcionContexto-Error:/);
});
await test('formateador acepta diagnóstico sin origen',()=>{
  const text=formatValidationDiagnostic({severity:'error',code:'Pruebas-TipoIncompatible-Error',message:'Tipo incompatible.'},'entrada.pdiscord');
  assert.equal(text,'entrada.pdiscord:1:1: error Pruebas-TipoIncompatible-Error: Tipo incompatible.');
});
await test('error de sintaxis incluye ubicación y línea de código',()=>{
  const span={source:'bot.pdiscord',start:{line:2,column:5,offset:15},end:{line:2,column:8,offset:18}};
  const err=new PseudoDiscordError('Token inesperado: FIN.',span,'Lexer-TokenInvalido-Error');
  const output=formatDiagnostic(err,'LINEA\n    FIN\n');
  assert.match(output,/bot\.pdiscord:2:5: error Lexer-TokenInvalido-Error:/);
  assert.match(output,/\^/);
});
await test('errores no asociados a ubicación conservan código',()=>{
  assert.equal(formatDiagnostic(new PseudoDiscordError('Entrada no válida.',undefined,'Lexer-TokenInvalido-Error')),'error Lexer-TokenInvalido-Error: Entrada no válida.');
});
await test('mensajes predeterminados de cooldown son concisos y técnicos',async()=>{
  const command:any=parse('COMANDO MENSAJE "demo"\n COOLDOWN "10s" POR USUARIO\n RESPONDER "ok"\nFIN');
  const declaration=command.body[0];
  const ctx={autor:{id:'123456789012345678'}};
  const cd=new CommandCooldowns();
  await cd.claim(declaration,ctx,50000);
  await assert.rejects(async()=>{await cd.claim(declaration,ctx,50001);},/COOLDOWN: límite de uso activo\. Reintento en 10 segundos\./);
});
await test('errores personalizados del usuario no se reescriben',async()=>{
  const custom='Límite personalizado: 10 s.';
  const command:any=parse(`COMANDO MENSAJE "demo"\n COOLDOWN "10s" POR USUARIO ERROR "${custom}"\n RESPONDER "ok"\nFIN`);
  const cd=new CommandCooldowns();const ctx={autor:{id:'123456789012345678'}};
  await cd.claim(command.body[0],ctx,1000);
  await assert.rejects(async()=>{await cd.claim(command.body[0],ctx,1001);},(err:any)=>err.message===custom);
});
await test('funciones de biblioteca emiten errores de validación técnica',()=>{
  const lib=createStdlib();
  assert.throws(()=>lib.ENTERO('texto'),/ENTERO:/);
});
await test('mensaje Validator-OpcionContexto-Error no contiene lenguaje conversacional',()=>{
  assert.doesNotMatch(pd369!.message,/por favor|te recomiendo|inténtalo|debes|quisiste escribir/i);
});
console.log(`v0.16: ${count} pruebas nuevas superadas`);
