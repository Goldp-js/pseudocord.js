import type { SourceSpan } from '../ast/base.js';

/** Contrato de diagnóstico compartido por parser, análisis semántico, CLI y editores. */
export interface Diagnostic {
  severity: 'error' | 'warning';
  code: string;
  message: string;
  source?: string;
  line?: number;
  column?: number;
  endLine?: number;
  endColumn?: number;
  /** Información complementaria, independiente del texto estable del error. */
  hint?: string;
}

type Located = { span?: SourceSpan } | SourceSpan | undefined;

function spanOf(location: Located): SourceSpan | undefined {
  if (!location) return undefined;
  return 'start' in location && 'end' in location ? location : location.span;
}

export function createDiagnostic(
  severity: Diagnostic['severity'],
  code: string,
  message: string,
  location?: Located,
  hint?: string
): Diagnostic {
  const span = spanOf(location);
  const help = hint ?? diagnosticHint(code);
  return {
    severity,
    code,
    message,
    ...(span?.source !== undefined && { source: span.source }),
    ...(span?.start && { line: span.start.line, column: span.start.column }),
    ...(span?.end && { endLine: span.end.line, endColumn: span.end.column }),
    ...(help && { hint: help })
  };
}

/** Excluye trazas de pila de los diagnósticos JSON. */
export function diagnosticFromError(error: unknown, fallbackSource = '<entrada>'): Diagnostic {
  const value = error && typeof error === 'object' ? error as {
    span?: SourceSpan;
    code?: string;
    message?: string;
  } : undefined;
  const diagnostic = createDiagnostic(
    'error',
    typeof value?.code === 'string' && /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*-Error$/.test(value.code) ? value.code : 'General-Error',
    value?.message ?? String(error),
    value?.span
  );
  return { ...diagnostic, source: diagnostic.source ?? fallbackSource, line: diagnostic.line ?? 1, column: diagnostic.column ?? 1 };
}

/** Mensajes complementarios asociados a códigos de diagnóstico. */
function diagnosticHint(code: string): string | undefined {
  switch (code) {
    case 'Validator-DeclaracionDuplicada-Error': case 'Semantic-DeclaracionDuplicada-Error':
      return 'Identificador duplicado. Comparación insensible a mayúsculas y acentos.';
    case 'Validator-OpcionDuplicada-Error':
      return 'Nombre de opción duplicado en el comando.';
    case 'Validator-OrdenOpciones-Error':
      return 'Orden de opciones inválido: las requeridas preceden a las opcionales.';
    case 'Validator-ControlBucle-Error':
      return 'Instrucción de control fuera de un bucle.';
    case 'Semantic-IdentificadorNoResuelto-Error':
      return 'Identificador no declarado en el ámbito actual.';
    case 'Semantic-InterpolacionSinResolver-Error':
      return 'Referencia de interpolación no resuelta.';
    default:
      return undefined;
  }
}
