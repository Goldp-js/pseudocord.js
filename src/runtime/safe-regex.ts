import { executionGuard } from './execution.js';
import { runInNewContext } from 'node:vm';

/** Rechaza patrones regex potencialmente vulnerables a ReDoS. No garantiza un tiempo de ejecución acotado; usar RE2 o aislamiento para expresiones no confiables. */
export function checkedRegex(pattern: string | RegExp, flags = ''): RegExp {
  const source = pattern instanceof RegExp ? pattern.source : String(pattern);
  const usedFlags = pattern instanceof RegExp ? pattern.flags : flags;
  if (source.length > 512) throw new RangeError('REGEX: patrón demasiado largo (máximo 512 caracteres).');
  if (/[^dgimsuvy]/.test(usedFlags)) throw new Error('REGEX: indicadores no admitidos.');
  if (/\\[1-9]|\\k<|\(\?(?:[=!]|<[=!])/.test(source))
    throw new Error('REGEX: referencias inversas y aserciones no admitidas por la política de seguridad.');
  // Grupos cuantificados con cuantificadores internos son propensos a ReDoS.
  if (/\((?:[^()\\]|\\.)*(?:\*|\+|\{\d+,?\d*\})(?:[^()\\]|\\.)*\)(?:[+*]|\{\d+,?\d*\})/.test(source))
    throw new Error('REGEX: cuantificadores anidados no admitidos por la política de seguridad.');
  if (/\((?:[^()\\]|\\.)*\|(?:[^()\\]|\\.)*\)(?:[+*]|\{\d+,?\d*\})/.test(source))
    throw new Error('REGEX: alternativas cuantificadas no admitidas por la política de seguridad.');
  return new RegExp(source, usedFlags);
}
export function checkedRegexInput(value: unknown): string {
  const text = String(value);
  if (text.length > 65_536) throw new RangeError('REGEX: texto demasiado largo (máximo 65536 caracteres).');
  executionGuard();
  return text;
}
export function safeMatch(pattern: string | RegExp, value: unknown): boolean {
  const regex = checkedRegex(pattern);
  regex.lastIndex = 0;
  return Boolean(runInNewContext('regex.test(text)',{regex,text:checkedRegexInput(value)},{timeout:50}));
}
export function safeMatches(pattern: string | RegExp, value: unknown): RegExpMatchArray[] {
  const source = checkedRegexInput(value);
  const base = checkedRegex(pattern);
  const regex = checkedRegex(base.source, base.flags.includes('g') ? base.flags : `${base.flags.replace('y','')}g`);
  const results=runInNewContext(`
    const matches=[];
    for(const match of text.matchAll(regex)){
      if(matches.length >= 10000) throw new RangeError('REGEX: demasiadas coincidencias (máximo 10000).');
      matches.push(match);
    }
    matches;
  `,{regex,text:source},{timeout:100}) as RegExpMatchArray[];
  executionGuard(true);
  return results;
}
