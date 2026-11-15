import type { SourcePosition, SourceSpan } from '../ast/base.js';
import type { Token } from './token.js';
import { PseudocordError } from './errors.js';

const TWO = new Set(['==','!=','>=','<=','<-','+=','-=','*=','/=','%=','**','&&','||','??','?.','<<','>>','=>','++','--']);
const THREE = new Set(['===','!==','>>>','**=']);
const PUNCT = new Set(['(',')','[',']','{','}',',',':','.',';','?']);
const OPER = new Set(['+','-','*','/','%','=','>','<','!','&','|','^','~']);

export class Lexer {
  private i = 0;
  private line = 1;
  private column = 1;
  constructor(private readonly source: string, private readonly sourceName = '<memoria>') {}

  tokenize(): Token[] {
    const out: Token[] = [];
    while (!this.eof()) {
      const c = this.peek();
      if (c === ' ' || c === '\t' || c === '\r') { this.advance(); continue; }
      if (c === '\n') { const s=this.currentPosition(); this.advance(); out.push(this.createToken('newline','\n',s)); continue; }
      if (c === '#' || (c === '/' && this.peek(1) === '/')) { this.skipLineComment(); continue; }
      if (c === '/' && this.peek(1) === '*') { this.skipBlockComment(); continue; }
      if ((c === '"' || c === "'") && this.peek(1)===c && this.peek(2)===c) { out.push(this.readTripleString()); continue; }
      if (c === '"' || c === "'") { out.push(this.readString()); continue; }
      if (/\d/.test(c)) { out.push(this.readNumber()); continue; }
      if (/[A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]/.test(c)) { out.push(this.readWord()); continue; }
      const s=this.currentPosition(); const three=this.source.slice(this.i,this.i+3); const two=this.source.slice(this.i,this.i+2);
      if (THREE.has(three)) { this.advanceN(3); out.push(this.createToken('operator',three,s)); continue; }
      if (TWO.has(two)) { this.advanceN(2); out.push(this.createToken('operator',two,s)); continue; }
      if (PUNCT.has(c)) { this.advance(); out.push(this.createToken('punctuation',c,s)); continue; }
      if (OPER.has(c)) { this.advance(); out.push(this.createToken('operator',c,s)); continue; }
      throw new PseudocordError(`Token no válido: carácter ${JSON.stringify(c)}.`, this.createSourceSpan(s,this.currentPosition()), 'Lexer-TokenInvalido-Error');
    }
    const p=this.currentPosition(); out.push(this.createToken('eof','',p)); return out;
  }

  private readWord(): Token {
    const s=this.currentPosition(); let v=''; while (!this.eof() && /[A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]/.test(this.peek())) v += this.advance(); return this.createToken('word',v,s);
  }
  private readNumber(): Token {
    const s=this.currentPosition(); let v='';
    if (this.peek()==='0' && /[xXbBoO]/.test(this.peek(1))) {v+=this.advance();v+=this.advance();while (!this.eof() && /[0-9A-Fa-f_]/.test(this.peek())) v+=this.advance();return this.createToken('number',v,s);}
    while (!this.eof() && /[0-9_]/.test(this.peek())) v+=this.advance();
    if (this.peek()==='.' && /\d/.test(this.peek(1))) {v+=this.advance();while (!this.eof() && /[0-9_]/.test(this.peek())) v+=this.advance();}
    if (/[eE]/.test(this.peek()) && /[+\-0-9]/.test(this.peek(1))) {v+=this.advance();if(/[+\-]/.test(this.peek()))v+=this.advance();while(/\d/.test(this.peek()))v+=this.advance();}
    if (this.peek()==='n') v+=this.advance(); return this.createToken('number',v,s);
  }
  private readString(): Token {
    const s=this.currentPosition(); const q=this.advance(); let v='';
    while (!this.eof() && this.peek()!==q) {
      if (this.peek()==='\n') throw new PseudocordError('Cadena sin terminador antes del salto de línea.', this.createSourceSpan(s,this.currentPosition()), 'Lexer-CadenaSinCerrar-Error');
      if (this.peek()==='\\') v+=this.readEscape(s); else v += this.advance();
    }
    if (this.eof()) throw new PseudocordError('Cadena sin delimitador de cierre.', this.createSourceSpan(s,this.currentPosition()), 'Lexer-CadenaSinCerrar-Error'); this.advance(); return this.createToken('string',v,s);
  }
  private readTripleString():Token {
    const s=this.currentPosition();const q=this.peek();this.advanceN(3);let v='';
    while(!this.eof() && !(this.peek()===q&&this.peek(1)===q&&this.peek(2)===q)){if(this.peek()==='\\')v+=this.readEscape(s);else v+=this.advance();}
    if(this.eof())throw new PseudocordError('Cadena multilínea sin delimitador de cierre.',this.createSourceSpan(s,this.currentPosition()),'Lexer-CadenaMultilinea-Error');this.advanceN(3);return this.createToken('string',v,s);
  }
  private readEscape(start:SourcePosition):string {
    this.advance(); const e=this.advance(); const map: Record<string,string>={n:'\n',r:'\r',t:'\t','\\':'\\','"':'"',"'":"'",b:'\b',f:'\f',v:'\v','0':'\0'};
    if (e==='u') { const h=this.source.slice(this.i,this.i+4); if(!/^[0-9a-fA-F]{4}$/.test(h)) throw new PseudocordError('Secuencia Unicode no válida: formato esperado \\uXXXX.', this.createSourceSpan(start,this.currentPosition()), 'Lexer-EscapeInvalido-Error'); this.advanceN(4); return String.fromCharCode(parseInt(h,16)); }
    if(e==='x'){const h=this.source.slice(this.i,this.i+2);if(!/^[0-9a-fA-F]{2}$/.test(h))throw new PseudocordError('Secuencia hexadecimal no válida: formato esperado \\xXX.',this.createSourceSpan(start,this.currentPosition()),'Lexer-EscapeInvalido-Error');this.advanceN(2);return String.fromCharCode(parseInt(h,16));}
    return map[e] ?? e;
  }
  private skipLineComment(): void { while(!this.eof() && this.peek()!=='\n') this.advance(); }
  private skipBlockComment():void {const s=this.currentPosition();this.advanceN(2);let depth=1;while(!this.eof()&&depth>0){if(this.peek()==='/'&&this.peek(1)==='*'){depth++;if(depth>128)throw new PseudocordError('Comentario anidado: profundidad máxima de 128 excedida.',this.createSourceSpan(s,this.currentPosition()),'Lexer-ComentarioBloque-Error');this.advanceN(2);}else if(this.peek()==='*'&&this.peek(1)==='/'){depth--;this.advanceN(2);}else this.advance();}if(depth)throw new PseudocordError('Comentario de bloque sin delimitador de cierre (*/).',this.createSourceSpan(s,this.currentPosition()),'Lexer-ComentarioBloque-Error');}
  private createToken(kind: Token['kind'], value: string, start: SourcePosition): Token { return {kind,value,span:this.createSourceSpan(start,this.currentPosition())}; }
  private createSourceSpan(start:SourcePosition,end:SourcePosition): SourceSpan { return {start,end,source:this.sourceName}; }
  private currentPosition(): SourcePosition { return {line:this.line,column:this.column,offset:this.i}; }
  private peek(n=0): string { return this.source[this.i+n] ?? ''; }
  private eof(): boolean { return this.i>=this.source.length; }
  private advance(): string { const c=this.source[this.i++] ?? ''; if(c==='\n'){this.line++;this.column=1}else this.column++; return c; }
  private advanceN(n:number): void { for(let j=0;j<n;j++) this.advance(); }
}

export function lex(source:string, sourceName?:string): Token[] { return new Lexer(source,sourceName).tokenize(); }
