/**
 * Operadores del lenguaje.
 * La coerción y las reglas de comparación son intencionales por compatibilidad.
 * Las expresiones regulares utilizan la implementación nativa de JavaScript.
 */
export function evaluateBinary(op:string,a:any,b:any):any {
  switch (op) {
    case '+': return a+b;
    case '-': return a-b;
    case '*': return a*b;
    case '/': return a/b;
    case '%': return a%b;
    case '**': return a**b;

    case '=':
    case '==': return a==b;
    case '===': return a===b;
    case '!=': return a!=b;
    case '!==': return a!==b;
    case '<': return a<b;
    case '<=': return a<=b;
    case '>': return a>b;
    case '>=': return a>=b;

    case 'BIT_Y': return a&b;
    case 'BIT_O': return a|b;
    case 'BIT_XOR': return a^b;
    case '<<': return a<<b;
    case '>>': return a>>b;
    case '>>>': return a>>>b;

    case 'CONTIENE':
      return typeof a==='string'?a.includes(String(b)):a?.includes?.(b)??a?.has?.(b)??false;
    case 'NO_CONTIENE':
      return !(typeof a==='string'?a.includes(String(b)):a?.includes?.(b)??a?.has?.(b)??false);
    case 'EMPIEZA_CON': return String(a).startsWith(String(b));
    case 'TERMINA_CON': return String(a).endsWith(String(b));
    case 'EN': return b?.includes?.(a)??b?.has?.(a)??(b!=null&&typeof b==='object'&&Object.prototype.hasOwnProperty.call(b,a));
    case 'NO_EN': return !(b?.includes?.(a)??b?.has?.(a)??(b!=null&&typeof b==='object'&&Object.prototype.hasOwnProperty.call(b,a)));

    case 'COINCIDE':
      return (b instanceof RegExp?b:new RegExp(String(b))).test(String(a));
    case 'NO_COINCIDE':
      return !(b instanceof RegExp?b:new RegExp(String(b))).test(String(a));
    default:
      throw new Error(`Intérprete: operador no admitido '${op}'.`);
  }
}
