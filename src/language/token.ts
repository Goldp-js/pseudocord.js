import type { SourceSpan } from '../ast/base.js';

export type TokenKind =
  | 'word' | 'number' | 'string' | 'operator' | 'punctuation'
  | 'newline' | 'eof';

export interface Token {
  readonly kind: TokenKind;
  readonly value: string;
  readonly span: SourceSpan;
}

export const upper = (value: string): string => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
