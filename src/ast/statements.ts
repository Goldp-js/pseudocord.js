import type { ASTNode } from './base.js';
import type { Expression } from './expressions.js';
import type { TypeNode } from './types.js';

export type Statement =
  | BlockStatement
  | JavaScriptStatement
  | EmptyStatement
  | ExpressionStatement
  | VariableDeclarationStatement
  | AssignmentStatement
  | CompoundAssignmentStatement
  | IncrementStatement
  | IfStatement
  | SwitchStatement
  | WhileStatement
  | DoWhileStatement
  | ForRangeStatement
  | ForEachStatement
  | RepeatStatement
  | RepeatUntilStatement
  | DimensionStatement
  | InfiniteLoopStatement
  | BreakStatement
  | ContinueStatement
  | ReturnStatement
  | ThrowStatement
  | TryStatement
  | AssertStatement
  | WaitStatement
  | ParallelStatement
  | RaceStatement
  | TimeoutStatement
  | EmitStatement
  | LogStatement
  | DiscordBuilderDeclarationStatement
  | DiscordActionStatement;

/** Bloque JS explícito; se ejecuta con los permisos del proceso Node.js. */
export interface JavaScriptStatement extends ASTNode<'JavaScriptStatement'> {
  readonly code: string;
}

export interface BlockStatement extends ASTNode<'BlockStatement'> {
  readonly body: readonly Statement[];
}

export interface EmptyStatement extends ASTNode<'EmptyStatement'> {}

export interface ExpressionStatement extends ASTNode<'ExpressionStatement'> {
  readonly expression: Expression;
}

export interface VariableDeclarationStatement extends ASTNode<'VariableDeclarationStatement'> {
  readonly name: string;
  readonly declaration: 'VARIABLE' | 'CONSTANTE';
  readonly value?: Expression;
  readonly typeAnnotation?: TypeNode;
  readonly persistent?: boolean;
  readonly scope?: 'local' | 'evento' | 'bot' | 'servidor' | 'usuario' | 'global';
}

export interface AssignmentStatement extends ASTNode<'AssignmentStatement'> {
  readonly target: Expression;
  readonly value: Expression;
}

export type CompoundAssignmentOperator = '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | 'Y=' | 'O=';

export interface CompoundAssignmentStatement extends ASTNode<'CompoundAssignmentStatement'> {
  readonly operator: CompoundAssignmentOperator;
  readonly target: Expression;
  readonly value: Expression;
}

export interface IncrementStatement extends ASTNode<'IncrementStatement'> {
  readonly target: Expression;
  readonly amount: 1 | -1;
}

export interface IfBranch {
  readonly condition: Expression;
  readonly body: readonly Statement[];
}

export interface IfStatement extends ASTNode<'IfStatement'> {
  readonly branches: readonly IfBranch[];
  readonly otherwise?: readonly Statement[];
}

export interface SwitchCase {
  readonly tests: readonly Expression[];
  readonly body: readonly Statement[];
}

export interface SwitchStatement extends ASTNode<'SwitchStatement'> {
  readonly discriminant: Expression;
  readonly cases: readonly SwitchCase[];
  readonly defaultCase?: readonly Statement[];
}

export interface WhileStatement extends ASTNode<'WhileStatement'> {
  readonly condition: Expression;
  readonly body: readonly Statement[];
  readonly maxIterations?: number;
}

export interface DoWhileStatement extends ASTNode<'DoWhileStatement'> {
  readonly body: readonly Statement[];
  readonly condition: Expression;
  readonly maxIterations?: number;
}

export interface ForRangeStatement extends ASTNode<'ForRangeStatement'> {
  readonly variable: string;
  readonly start: Expression;
  readonly end: Expression;
  readonly step?: Expression;
  readonly inclusive?: boolean;
  readonly body: readonly Statement[];
  readonly maxIterations?: number;
}

export interface ForEachStatement extends ASTNode<'ForEachStatement'> {
  readonly valueVariable: string;
  readonly keyVariable?: string;
  readonly iterable: Expression;
  readonly body: readonly Statement[];
  readonly maxIterations?: number;
}

export interface RepeatStatement extends ASTNode<'RepeatStatement'> {
  readonly count: Expression;
  readonly indexVariable?: string;
  readonly body: readonly Statement[];
  readonly maxIterations?: number;
}

/** REPETIR ... HASTA QUE cond: se ejecuta al menos una vez. */
export interface RepeatUntilStatement extends ASTNode<'RepeatUntilStatement'> {
  readonly condition: Expression;
  readonly body: readonly Statement[];
}

/** Dimensiones explícitas; índices basados en cero. */
export interface DimensionStatement extends ASTNode<'DimensionStatement'> {
  readonly name: string;
  readonly dimensions: readonly Expression[];
}

export interface InfiniteLoopStatement extends ASTNode<'InfiniteLoopStatement'> {
  readonly body: readonly Statement[];
  /** El validador/runtime debe exigir un límite, break alcanzable o política de ejecución. */
  readonly executionBudget?: number;
}

export interface BreakStatement extends ASTNode<'BreakStatement'> {
  readonly label?: string;
}

export interface ContinueStatement extends ASTNode<'ContinueStatement'> {
  readonly label?: string;
}

export interface ReturnStatement extends ASTNode<'ReturnStatement'> {
  readonly value?: Expression;
}

export interface ThrowStatement extends ASTNode<'ThrowStatement'> {
  readonly value: Expression;
}

export interface CatchClause {
  readonly variable?: string;
  readonly type?: TypeNode;
  readonly body: readonly Statement[];
}

export interface TryStatement extends ASTNode<'TryStatement'> {
  readonly body: readonly Statement[];
  readonly catches?: readonly CatchClause[];
  readonly finallyBody?: readonly Statement[];
}

export interface AssertStatement extends ASTNode<'AssertStatement'> {
  readonly condition: Expression;
  readonly message?: Expression;
}

export interface WaitStatement extends ASTNode<'WaitStatement'> {
  readonly duration: Expression;
}

export interface ParallelStatement extends ASTNode<'ParallelStatement'> {
  readonly branches: readonly (readonly Statement[])[];
  readonly concurrencyLimit?: number;
}

export interface RaceStatement extends ASTNode<'RaceStatement'> {
  readonly branches: readonly (readonly Statement[])[];
}

export interface TimeoutStatement extends ASTNode<'TimeoutStatement'> {
  readonly duration: Expression;
  readonly body: readonly Statement[];
  readonly onTimeout?: readonly Statement[];
}

export interface EmitStatement extends ASTNode<'EmitStatement'> {
  readonly event: string;
  readonly arguments: readonly Expression[];
}

export interface LogStatement extends ASTNode<'LogStatement'> {
  readonly level: 'depurar' | 'info' | 'aviso' | 'error';
  readonly values: readonly Expression[];
}

/** Acción DSL traducida a llamadas de discord.js por el adaptador. */

export interface DiscordBuilderEntry {
  readonly key: string;
  readonly arguments: readonly Expression[];
  readonly flags?: readonly string[];
}

export type DiscordBuilderKind =
  | 'embed' | 'button' | 'select' | 'textInput' | 'modal' | 'row'
  | 'attachment' | 'image' | 'poll' | 'message' | 'generic';

/** Declaración DSL de builders y payloads de Discord. */
export interface DiscordBuilderDeclarationStatement extends ASTNode<'DiscordBuilderDeclarationStatement'> {
  readonly builderKind: DiscordBuilderKind;
  readonly name: string;
  readonly subtype?: string;
  readonly entries: readonly DiscordBuilderEntry[];
}

export interface DiscordActionStatement extends ASTNode<'DiscordActionStatement'> {
  readonly action: string;
  readonly target?: Expression;
  readonly arguments: readonly Expression[];
  readonly options?: Readonly<Record<string, Expression>>;
  readonly await?: boolean;
}
