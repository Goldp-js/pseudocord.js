import type { SourceSpan } from '../ast/base.js';
import type { Diagnostic } from './diagnostics.js';

export class PseudoDiscordError extends Error {
  constructor(message: string, public readonly span?: SourceSpan, public readonly code = 'General-Error') {
    super(message);
    this.name = 'PseudoDiscordError';
  }
}

/** Fragmento con marcador de posición compatible con tabuladores. */
function sourceFrame(source: string, line: number, column: number, endLine?: number, endColumn?: number): string {
  if (!Number.isSafeInteger(line) || line < 1 || !Number.isSafeInteger(column) || column < 1) return '';
  const original = source.split(/\r?\n/)[line - 1];
  if (original === undefined) return '';
  const expanded = original.replace(/\t/g, '    ');
  const prefix = original.slice(0, column - 1).replace(/\t/g, '    ');
  const sameLine = endLine === line && Number.isSafeInteger(endColumn) && endColumn! > column;
  const rawEnd = sameLine ? original.slice(0, endColumn! - 1).replace(/\t/g, '    ').length : prefix.length + 1;
  const width = Math.min(80, Math.max(1, rawEnd - prefix.length));
  const gutter = String(line).padStart(4);
  return `\n\n${gutter} | ${expanded}\n     | ${' '.repeat(prefix.length)}${'^'.repeat(width)}`;
}

/** Formato estable de diagnósticos. La información adicional queda en una línea separada. */
export function formatValidationDiagnostic(diagnostic: Diagnostic, fallbackSource = '<entrada>', source?: string): string {
  const filename = diagnostic.source ?? fallbackSource;
  const line = diagnostic.line ?? 1;
  const column = diagnostic.column ?? 1;
  const level = diagnostic.severity === 'error' ? 'error' : 'advertencia';
  let output = `${filename}:${line}:${column}: ${level} ${diagnostic.code}: ${diagnostic.message}`;
  if (source !== undefined) output += sourceFrame(source, line, column, diagnostic.endLine, diagnostic.endColumn);
  if (diagnostic.hint) output += `\n  Ayuda: ${diagnostic.hint}`;
  return output;
}

export function formatDiagnostic(error: unknown, source?: string): string {
  if (!(error instanceof PseudoDiscordError)) return error instanceof Error ? error.stack ?? `error: ${error.message}` : `error: ${String(error)}`;
  const pos = error.span?.start;
  let output = pos
    ? `${error.span?.source ?? '<entrada>'}:${pos.line}:${pos.column}: error ${error.code}: ${error.message}`
    : `error ${error.code}: ${error.message}`;
  if (source !== undefined && pos) {
    output += sourceFrame(source, pos.line, pos.column, error.span?.end.line, error.span?.end.column);
  }
  return output;
}
