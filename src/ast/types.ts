import type { ASTNode } from './base.js';

export type PrimitiveTypeName =
  | 'nulo'
  | 'booleano'
  | 'entero'
  | 'numero'
  | 'bigint'
  | 'texto'
  | 'fecha'
  | 'duracion'
  | 'regex'
  | 'bytes'
  | 'json'
  | 'cualquiera'
  | 'desconocido'
  | 'nunca'
  | 'vacio';

export type TypeNode =
  | PrimitiveTypeNode
  | NamedTypeNode
  | OptionalTypeNode
  | UnionTypeNode
  | IntersectionTypeNode
  | ArrayTypeNode
  | TupleTypeNode
  | SetTypeNode
  | MapTypeNode
  | RecordTypeNode
  | FunctionTypeNode
  | LiteralTypeNode;

export interface PrimitiveTypeNode extends ASTNode<'PrimitiveType'> {
  readonly name: PrimitiveTypeName;
}

export interface NamedTypeNode extends ASTNode<'NamedType'> {
  readonly name: string;
  readonly typeArguments?: readonly TypeNode[];
}

export interface OptionalTypeNode extends ASTNode<'OptionalType'> {
  readonly inner: TypeNode;
}

export interface UnionTypeNode extends ASTNode<'UnionType'> {
  readonly types: readonly TypeNode[];
}

export interface IntersectionTypeNode extends ASTNode<'IntersectionType'> {
  readonly types: readonly TypeNode[];
}

export interface ArrayTypeNode extends ASTNode<'ArrayType'> {
  readonly element: TypeNode;
  readonly readonly?: boolean;
}

export interface TupleTypeNode extends ASTNode<'TupleType'> {
  readonly elements: readonly TypeNode[];
}

export interface SetTypeNode extends ASTNode<'SetType'> {
  readonly element: TypeNode;
}

export interface MapTypeNode extends ASTNode<'MapType'> {
  readonly key: TypeNode;
  readonly value: TypeNode;
}

export interface RecordTypeField {
  readonly name: string;
  readonly type: TypeNode;
  readonly optional?: boolean;
  readonly readonly?: boolean;
}

export interface RecordTypeNode extends ASTNode<'RecordType'> {
  readonly fields: readonly RecordTypeField[];
}

export interface FunctionTypeParameter {
  readonly name: string;
  readonly type: TypeNode;
  readonly optional?: boolean;
  readonly rest?: boolean;
}

export interface FunctionTypeNode extends ASTNode<'FunctionType'> {
  readonly parameters: readonly FunctionTypeParameter[];
  readonly returns: TypeNode;
  readonly async?: boolean;
}

export interface LiteralTypeNode extends ASTNode<'LiteralType'> {
  readonly value: string | number | boolean | null;
}
