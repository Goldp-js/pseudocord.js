import type { ASTNode } from './base.js';
import type { TypeNode } from './types.js';

export type LiteralValue = string | number | bigint | boolean | null;

export type Expression =
  | LiteralExpression
  | IdentifierExpression
  | TemplateExpression
  | ArrayExpression
  | TupleExpression
  | ObjectExpression
  | SetExpression
  | MapExpression
  | RangeExpression
  | UnaryExpression
  | BinaryExpression
  | LogicalExpression
  | NullishExpression
  | ConditionalExpression
  | MemberExpression
  | IndexExpression
  | CallExpression
  | LambdaExpression
  | AwaitExpression
  | TypeOfExpression
  | TypeCheckExpression
  | CastExpression
  | RegexExpression
  | DiscordReferenceExpression
  | DiscordInvokeExpression
  | DiscordConstructExpression
  | NewExpression;

export interface LiteralExpression extends ASTNode<'LiteralExpression'> {
  readonly value: LiteralValue;
  readonly literalType: 'texto' | 'numero' | 'entero' | 'bigint' | 'booleano' | 'nulo';
}

export interface IdentifierExpression extends ASTNode<'IdentifierExpression'> {
  readonly name: string;
}

export interface TemplatePartText {
  readonly kind: 'text';
  readonly value: string;
}

export interface TemplatePartExpression {
  readonly kind: 'expression';
  readonly value: Expression;
}

export interface TemplateExpression extends ASTNode<'TemplateExpression'> {
  readonly parts: readonly (TemplatePartText | TemplatePartExpression)[];
}

export interface ArrayExpression extends ASTNode<'ArrayExpression'> {
  readonly elements: readonly Expression[];
}

export interface TupleExpression extends ASTNode<'TupleExpression'> {
  readonly elements: readonly Expression[];
}

export interface ObjectProperty {
  readonly key: string | Expression;
  readonly value: Expression;
  readonly computed?: boolean;
  readonly shorthand?: boolean;
}

export interface ObjectExpression extends ASTNode<'ObjectExpression'> {
  readonly properties: readonly ObjectProperty[];
}

export interface SetExpression extends ASTNode<'SetExpression'> {
  readonly elements: readonly Expression[];
}

export interface MapEntry {
  readonly key: Expression;
  readonly value: Expression;
}

export interface MapExpression extends ASTNode<'MapExpression'> {
  readonly entries: readonly MapEntry[];
}

export interface RangeExpression extends ASTNode<'RangeExpression'> {
  readonly start: Expression;
  readonly end: Expression;
  readonly step?: Expression;
  readonly inclusive?: boolean;
}

export type UnaryOperator = 'NO' | '+' | '-' | 'BIT_NO';

export interface UnaryExpression extends ASTNode<'UnaryExpression'> {
  readonly operator: UnaryOperator;
  readonly argument: Expression;
}

export type BinaryOperator =
  | '+' | '-' | '*' | '/' | '%' | '**'
  | '=' | '==' | '!=' | '===' | '!=='
  | '<' | '<=' | '>' | '>='
  | 'BIT_Y' | 'BIT_O' | 'BIT_XOR' | '<<' | '>>' | '>>>'
  | 'CONTIENE' | 'NO_CONTIENE'
  | 'EMPIEZA_CON' | 'TERMINA_CON'
  | 'COINCIDE' | 'NO_COINCIDE'
  | 'EN' | 'NO_EN';

export interface BinaryExpression extends ASTNode<'BinaryExpression'> {
  readonly operator: BinaryOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export type LogicalOperator = 'Y' | 'O';

export interface LogicalExpression extends ASTNode<'LogicalExpression'> {
  readonly operator: LogicalOperator;
  readonly left: Expression;
  readonly right: Expression;
}

export interface NullishExpression extends ASTNode<'NullishExpression'> {
  readonly left: Expression;
  readonly right: Expression;
}

export interface ConditionalExpression extends ASTNode<'ConditionalExpression'> {
  readonly condition: Expression;
  readonly whenTrue: Expression;
  readonly whenFalse: Expression;
}

export interface MemberExpression extends ASTNode<'MemberExpression'> {
  readonly object: Expression;
  readonly property: string;
  readonly optional?: boolean;
}

export interface IndexExpression extends ASTNode<'IndexExpression'> {
  readonly object: Expression;
  readonly index: Expression;
  readonly optional?: boolean;
}

export interface CallArgument {
  readonly name?: string;
  readonly value: Expression;
  readonly spread?: boolean;
}

export interface CallExpression extends ASTNode<'CallExpression'> {
  readonly callee: Expression;
  readonly arguments: readonly CallArgument[];
  readonly optional?: boolean;
}

export interface LambdaParameter {
  readonly name: string;
  readonly type?: TypeNode;
  readonly optional?: boolean;
  readonly rest?: boolean;
}

export interface LambdaExpression extends ASTNode<'LambdaExpression'> {
  readonly parameters: readonly LambdaParameter[];
  readonly body: Expression | readonly import('./statements.js').Statement[];
  readonly async?: boolean;
}

export interface AwaitExpression extends ASTNode<'AwaitExpression'> {
  readonly expression: Expression;
}

export interface TypeOfExpression extends ASTNode<'TypeOfExpression'> {
  readonly expression: Expression;
}

export interface TypeCheckExpression extends ASTNode<'TypeCheckExpression'> {
  readonly expression: Expression;
  readonly expected: TypeNode;
}

export interface CastExpression extends ASTNode<'CastExpression'> {
  readonly expression: Expression;
  readonly target: TypeNode;
}

export interface RegexExpression extends ASTNode<'RegexExpression'> {
  readonly pattern: string;
  readonly flags?: string;
}

/** Referencia AST a miembros públicos de discord.js. */
export interface DiscordReferenceExpression extends ASTNode<'DiscordReferenceExpression'> {
  readonly owner: string;
  readonly path?: readonly string[];
}

/** Invocación de métodos públicos de discord.js. `owner` y `member` admiten validación contra el catálogo generado. */
export interface DiscordInvokeExpression extends ASTNode<'DiscordInvokeExpression'> {
  readonly owner: string;
  readonly target?: Expression;
  readonly member: string;
  readonly arguments: readonly CallArgument[];
  readonly static?: boolean;
  readonly await?: boolean;
}

/** Construcción de instancias públicas de discord.js. */
export interface DiscordConstructExpression extends ASTNode<'DiscordConstructExpression'> {
  readonly owner: string;
  readonly arguments: readonly CallArgument[];
}


/** Construcción de clases disponibles en el entorno de ejecución. */
export interface NewExpression extends ASTNode<'NewExpression'> {
  readonly callee: Expression;
  readonly arguments: readonly CallArgument[];
}
