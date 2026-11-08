import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { PseudoClient } from '../src/index.js';

const require = createRequire(import.meta.url);
const forbidden = ['runtime','language','storage','ast','discord','plugins','plugin',
  'dist/src/runtime/interpreter.js','dist/src/runtime/bot.js','dist/src/language/parser.js'];

let passed = 0;
async function test(name: string, fn: () => void | Promise<void>) {
  await fn(); passed++;
  console.log(`✓ v0.25 ${name}`);
}

await test('la raíz expone únicamente PseudoClient con require()', () => {
  const api = require('pseudodiscord');
  assert.deepEqual(Object.keys(api).sort(), ['PseudoClient']);
  assert.equal(api.PseudoClient, PseudoClient);
});

await test('la raíz expone únicamente PseudoClient con import()', async () => {
  const api = await import('pseudodiscord');
  assert.deepEqual(Object.keys(api).sort(), ['PseudoClient']);
  assert.equal(api.PseudoClient, PseudoClient);
});

await test('las subrutas internas están cerradas tanto en ESM como en CommonJS', async () => {
  for (const spec of forbidden) {
    assert.throws(() => require(`pseudodiscord/${spec}`),
      (error: unknown) => (error as {code?: string})?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED', spec);
    await assert.rejects(() => import(`pseudodiscord/${spec}`),
      (error: unknown) => (error as {code?: string})?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED', spec);
  }
});

await test('PseudoClient continúa disponible y los analizadores no son exports de la raíz', () => {
  const client = new PseudoClient();
  assert.equal(typeof client.loadCommands, 'function');
  assert.equal(typeof client.command, 'function');
  assert.equal(typeof client.compile, 'function');
  assert.equal(typeof client.start, 'function');
  assert.equal(typeof client.syncCommands, 'function');
  assert.equal(typeof client.stop, 'function');
  assert.equal(require('pseudodiscord').parse, undefined);
  assert.equal(require('pseudodiscord').validate, undefined);
  assert.equal(require('pseudodiscord').diagnosticFromError, undefined);
});

console.log(`API pública v0.25: ${passed} pruebas superadas.`);
