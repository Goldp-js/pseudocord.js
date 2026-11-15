import { normalizeIdentifier } from './identifiers.js';
import { FUNCTION_ALIASES } from '../runtime/function-names.js';

/** Nombres públicos cuya retirada está prevista. La función sigue siendo ejecutable. */
const DEPRECATED_FUNCTION_NAMES = [
  'RC',
  'REDON',
  'CONVERTIRANUMERO',
  'CONVERTIRATEXTO',
  'CONCATENAR_CADENA'
] as const;

const deprecated = new Set<string>([...DEPRECATED_FUNCTION_NAMES, ...Object.keys(FUNCTION_ALIASES)].map(normalizeIdentifier));

/** Marca o desmarca una función incorporada como obsoleta. */
export function markFunctionDeprecated(name: string, value = true): void {
  const key = normalizeIdentifier(name);
  if (value) deprecated.add(key);
  else deprecated.delete(key);
}

export function isFunctionDeprecated(name: string): boolean {
  return deprecated.has(normalizeIdentifier(name));
}
