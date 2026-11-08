/** La identidad de los símbolos es independiente de mayúsculas y diacríticos. */
export function normalizeIdentifier(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
