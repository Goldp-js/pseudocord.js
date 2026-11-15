import assert from 'node:assert/strict';
import { parse, parseExpressionText } from '../src/language/parser.js';
import { validate } from '../src/language/validator.js';
import { PseudoClient } from '../src/index.js';
import { matchesCronExpression } from '../src/runtime/cron.js';

const cases: Array<[string, () => void]> = [
  ['empty-program', () => {
    const program = parse('');
    assert.equal(program.kind, 'Program');
    assert.equal(program.body.length, 0);
    assert.equal(validate(program).ok, true);
  }],
  ['expression-parser', () => {
    assert.ok(parseExpressionText('1 + 2 * 3'));
    assert.throws(() => parseExpressionText('1 +'));
  }],
  ['invalid-syntax', () => {
    assert.throws(() => parse('COMANDO BARRA'));
  }],
  ['cron-wildcard-step-day-restriction', () => {
    const tuesday = new Date('2026-11-17T09:00:00.000Z');
    const monday = new Date('2026-11-16T09:00:00.000Z');
    assert.equal(matchesCronExpression('0 9 * * 1', tuesday, 'UTC'), false);
    assert.equal(matchesCronExpression('0 9 */1 * 1', tuesday, 'UTC'), false);
    assert.equal(matchesCronExpression('0 9 */1 * 1', monday, 'UTC'), true);
  }],
  ['public-client', () => {
    const client = new PseudoClient({ commands: { sync: 'manual' } });
    assert.ok(client instanceof PseudoClient);
    assert.throws(() => new PseudoClient({ token: 123 as unknown as string }));
  }],
];

let failures = 0;
for (const [name, run] of cases) {
  try {
    run();
    process.stdout.write(`PASS ${name}\n`);
  } catch (error) {
    failures++;
    process.stderr.write(`FAIL ${name}\n${String(error)}\n`);
  }
}
assert.equal(failures, 0, `${failures} test cases failed`);
