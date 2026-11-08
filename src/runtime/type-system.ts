import type { TypeNode } from '../ast/types.js';

export function runtimeTypeOf(value: unknown): string {
  if (value === null) return 'nulo';
  if (value === undefined) return 'vacio';
  if (Array.isArray(value)) return 'lista';
  if (value instanceof Map) return 'mapa';
  if (value instanceof Set) return 'conjunto';
  if (value instanceof Date) return 'fecha';
  if (value instanceof RegExp) return 'regex';
  if (Buffer.isBuffer(value)) return 'bytes';
  if (typeof value === 'number') return Number.isInteger(value) ? 'entero' : 'numero';
  return typeof value === 'string' ? 'texto' : typeof value === 'boolean' ? 'booleano' : typeof value;
}

export function typeName(type: TypeNode): string {
  switch (type.kind) {
    case 'PrimitiveType': case 'NamedType': return type.name;
    case 'OptionalType': return `${typeName(type.inner)}?`;
    case 'ArrayType': return `LISTA<${typeName(type.element)}>`;
    case 'SetType': return `CONJUNTO<${typeName(type.element)}>`;
    case 'MapType': return `MAPA<${typeName(type.key)}, ${typeName(type.value)}>`;
    case 'UnionType': return type.types.map(typeName).join(' | ');
    case 'IntersectionType': return type.types.map(typeName).join(' & ');
    default: return type.kind;
  }
}

function isJson(value: unknown, seen = new WeakSet<object>()): boolean {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'object') return false;
  if (seen.has(value)) return false;
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) return false;
  seen.add(value);
  const valid = Object.values(value).every(item => isJson(item, seen));
  seen.delete(value);
  return valid;
}

export function matchesType(value: unknown, type: TypeNode): boolean {
  switch (type.kind) {
    case 'PrimitiveType':
      switch (type.name) {
        case 'cualquiera': case 'desconocido': return true;
        case 'nulo': return value === null;
        case 'vacio': return value === undefined;
        case 'nunca': return false;
        case 'booleano': return typeof value === 'boolean';
        case 'entero': return typeof value === 'number' && Number.isSafeInteger(value);
        case 'numero': case 'duracion': return typeof value === 'number' && Number.isFinite(value);
        case 'bigint': return typeof value === 'bigint';
        case 'texto': return typeof value === 'string';
        case 'fecha': return value instanceof Date && !Number.isNaN(value.getTime());
        case 'regex': return value instanceof RegExp;
        case 'bytes': return Buffer.isBuffer(value) || value instanceof Uint8Array;
        case 'json': return isJson(value);
      }
      return false;
    case 'OptionalType': return value === null || value === undefined || matchesType(value, type.inner);
    case 'UnionType': return type.types.some(t => matchesType(value, t));
    case 'IntersectionType': return type.types.every(t => matchesType(value, t));
    case 'ArrayType': return Array.isArray(value) && value.every(v => matchesType(v, type.element));
    case 'TupleType': return Array.isArray(value) && value.length === type.elements.length && type.elements.every((t, i) => matchesType(value[i], t));
    case 'SetType': return value instanceof Set && [...value].every(v => matchesType(v, type.element));
    case 'MapType': return value instanceof Map && [...value].every(([k, v]) => matchesType(k, type.key) && matchesType(v, type.value));
    case 'RecordType': {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
      const obj = value as Record<string, unknown>;
      return type.fields.every(f => (f.optional && obj[f.name] === undefined) || matchesType(obj[f.name], f.type));
    }
    case 'FunctionType': return typeof value === 'function' || !!(value && typeof value === 'object' && (value as any).__pseudoFunction);
    case 'LiteralType': return Object.is(value, type.value);
    case 'NamedType': {
      const name = type.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      switch (name) {
        case 'usuario': return !!value && typeof (value as any).id === 'string' && typeof (value as any).username === 'string';
        case 'miembro': return !!(value as any)?.user && !!(value as any)?.roles;
        case 'mensaje': return !!(value as any)?.author && !!(value as any)?.channel;
        case 'canal': return !!(value as any)?.id && typeof (value as any)?.send === 'function';
        case 'rol': return !!(value as any)?.id && (value as any)?.permissions !== undefined;
        case 'servidor': case 'guild': return !!(value as any)?.members && !!(value as any)?.channels;
        case 'interaccion': return !!(value as any)?.id && typeof (value as any)?.reply === 'function';
        case 'objeto': return value !== null && typeof value === 'object' && !Array.isArray(value);
        case 'lista': return Array.isArray(value);
        case 'conjunto': case 'set': return value instanceof Set;
        case 'mapa': case 'map': return value instanceof Map;
        case 'funcion': return typeof value === 'function' || !!(value as any)?.__pseudoFunction;
        case 'decimal': return typeof value === 'number' && Number.isFinite(value);
        default: throw new Error(`Sistema de tipos: identificador de tipo no resuelto '${type.name}'.`);
      }
    }
  }
}

export function assertRuntimeType(value: unknown, type: TypeNode | undefined, location: string): void {
  if (type && !matchesType(value, type)) throw new TypeError(`Tipo incompatible en ${location}: esperado '${typeName(type)}'; recibido '${runtimeTypeOf(value)}'.`);
}

export function castValue(value: unknown, target: TypeNode): unknown {
  if (target.kind === 'OptionalType' && value == null) return value;
  if (target.kind !== 'PrimitiveType' && target.kind !== 'NamedType') {
    assertRuntimeType(value, target, 'conversión');
    return value;
  }
  const name = target.name.toLowerCase();
  let result: unknown;
  switch (name) {
    case 'cualquiera': case 'desconocido': return value;
    case 'texto': result = String(value); break;
    case 'numero': case 'decimal': case 'duracion': {
      if (value === null || value === undefined || String(value).trim() === '') throw new TypeError(`Conversión a ${name}: valor incompatible '${String(value)}'.`);
      result = Number(value); break;
    }
    case 'entero': {
      if (value === null || value === undefined || String(value).trim() === '') throw new TypeError('Conversión a ENTERO: valor de entrada vacío.');
      result = Number(value); break;
    }
    case 'booleano': {
      if (typeof value === 'boolean') result = value;
      else if (value === 1 || (typeof value === 'string' && ['true','verdadero','si','sí','1'].includes(value.toLowerCase().trim()))) result = true;
      else if (value === 0 || (typeof value === 'string' && ['false','falso','no','0'].includes(value.toLowerCase().trim()))) result = false;
      else throw new TypeError(`Conversión a BOOLEANO: literal no reconocido '${String(value)}'.`);
      break;
    }
    case 'bigint': try { result = BigInt(value as any); } catch { throw new TypeError(`Conversión a BIGINT: literal no reconocido '${String(value)}'.`); } break;
    case 'fecha': result = new Date(value as any); break;
    case 'json': if (typeof value === 'string') { try { result = JSON.parse(value); } catch { throw new TypeError('JSON: error de análisis sintáctico.'); } } else result = value; break;
    case 'nulo': result = null; break;
    default: result = value;
  }
  assertRuntimeType(result, target, 'conversión');
  return result;
}
