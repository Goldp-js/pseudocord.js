export interface SourcePosition {
  readonly line: number;
  readonly column: number;
  readonly offset: number;
}

export interface SourceSpan {
  readonly start: SourcePosition;
  readonly end: SourcePosition;
  readonly source?: string;
}

export interface NodeMetadata {
  readonly doc?: string;
  readonly tags?: readonly string[];
  readonly synthetic?: boolean;
}

export interface ASTNode<K extends string = string> {
  readonly kind: K;
  readonly span?: SourceSpan;
  readonly meta?: NodeMetadata;
}

export interface NamedNode<K extends string = string> extends ASTNode<K> {
  readonly name: string;
}

export interface BlockNode<T extends ASTNode = ASTNode> extends ASTNode<'Block'> {
  readonly body: readonly T[];
}

export const node = <T extends ASTNode>(value: T): T => value;
