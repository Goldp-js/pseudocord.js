import type { ASTNode, SourceSpan } from './base.js';
import type { Expression } from './expressions.js';
import type { Statement } from './statements.js';
import type { TypeNode } from './types.js';

export interface Program extends ASTNode<'Program'> {
  readonly version: '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9' | '0.10' | '0.11';
  /** Metadatos del cargador de módulos; excluidos del AST ejecutable. */
  readonly entryFile?: string;
  readonly sourceFiles?: readonly string[];
  readonly body: readonly TopLevelDeclaration[];
}

export type TopLevelDeclaration =
  | ImportDeclaration
  | ModuleDeclaration
  | RecordDeclaration
  | EnumDeclaration
  | VariableTopLevelDeclaration
  | FunctionDeclaration
  | EventDeclaration
  | DiscordEventDeclaration
  | DiscordCommandDeclaration
  | DiscordContextCommandDeclaration
  | DiscordComponentHandlerDeclaration
  | SchedulerDeclaration
  | StartupDeclaration;

/** Inicialización anterior al registro de comandos y a la conexión con Discord. */
export interface StartupDeclaration extends ASTNode<'StartupDeclaration'> {
  readonly body: readonly Statement[];
}

export interface ImportDeclaration extends ASTNode<'ImportDeclaration'> {
  readonly source: string;
  readonly names?: readonly string[];
  readonly alias?: string;
}

export interface ModuleDeclaration extends ASTNode<'ModuleDeclaration'> {
  readonly name: string;
  readonly body: readonly TopLevelDeclaration[];
}

export interface RecordFieldDeclaration {
  readonly name: string;
  readonly type: TypeNode;
  readonly defaultValue?: Expression;
  readonly optional?: boolean;
  readonly readonly?: boolean;
}

export interface RecordDeclaration extends ASTNode<'RecordDeclaration'> {
  readonly name: string;
  readonly exported?: boolean;
  readonly fields: readonly RecordFieldDeclaration[];
}

export interface EnumMemberDeclaration {
  readonly name: string;
  readonly value?: string | number;
}

export interface EnumDeclaration extends ASTNode<'EnumDeclaration'> {
  readonly name: string;
  readonly exported?: boolean;
  readonly members: readonly EnumMemberDeclaration[];
}

export interface VariableTopLevelDeclaration extends ASTNode<'VariableTopLevelDeclaration'> {
  readonly name: string;
  readonly declaration: 'VARIABLE' | 'CONSTANTE';
  readonly value?: Expression;
  readonly typeAnnotation?: TypeNode;
  readonly persistent?: boolean;
  readonly exported?: boolean;
}

export interface FunctionParameterDeclaration {
  readonly name: string;
  readonly type?: TypeNode;
  readonly defaultValue?: Expression;
  readonly optional?: boolean;
  readonly rest?: boolean;
  /** Un alias a la variable del llamador; exige argumento identificador modificable. */
  readonly byReference?: boolean;
}

export interface FunctionDeclaration extends ASTNode<'FunctionDeclaration'> {
  readonly name: string;
  readonly parameters: readonly FunctionParameterDeclaration[];
  readonly returnType?: TypeNode;
  readonly body: readonly Statement[];
  readonly async?: boolean;
  readonly pure?: boolean;
  readonly exported?: boolean;
}

/** Evento interno del DSL, independiente de ClientEvents. */
export interface EventDeclaration extends ASTNode<'EventDeclaration'> {
  readonly name: string;
  readonly parameters: readonly FunctionParameterDeclaration[];
  readonly body: readonly Statement[];
}

/** Evento público de ClientEvents de discord.js. */
export interface DiscordEventDeclaration extends ASTNode<'DiscordEventDeclaration'> {
  readonly event: string;
  readonly parameters: readonly string[];
  readonly body: readonly Statement[];
}

export type DiscordCommandKind = 'chat-input' | 'message-prefix';

export type DiscordCommandOptionKind =
  | 'texto'
  | 'entero'
  | 'numero'
  | 'booleano'
  | 'usuario'
  | 'canal'
  | 'rol'
  | 'mencionable'
  | 'adjunto';

export interface DiscordCommandChoice {
  readonly name: string;
  readonly value: string | number;
}

export interface DiscordCommandOptionDeclaration {
  /** Posición del identificador de opción para diagnósticos. */
  readonly span?: SourceSpan;
  readonly name: string;
  readonly description: string;
  readonly kind: DiscordCommandOptionKind;
  readonly required?: boolean;
  readonly autocomplete?: boolean;
  readonly choices?: readonly DiscordCommandChoice[];
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly channelTypes?: readonly string[];
  /** Mensajes personalizados; la validación de entrada permanece habilitada. */
  readonly errors?: Readonly<Partial<Record<'faltante'|'invalido'|'minimo'|'maximo'|'eleccion',string>>>;
  /** Solo comandos de prefijo: true consume el resto de la entrada. */
  readonly consumeRest?: boolean;
}

export interface DiscordSubcommandDeclaration {
  readonly name: string;
  readonly description: string;
  readonly options: readonly DiscordCommandOptionDeclaration[];
  readonly body: readonly Statement[];
}

export interface DiscordSubcommandGroupDeclaration {
  readonly name: string;
  readonly description: string;
  readonly subcommands: readonly DiscordSubcommandDeclaration[];
}

/** Intervalo de reutilización de comandos. */
export interface CommandCooldown {
  readonly durationMs: number;
  readonly scope: 'usuario' | 'servidor' | 'canal' | 'global';
  readonly error?: string;
}

export interface DiscordCommandDeclaration extends ASTNode<'DiscordCommandDeclaration'> {
  readonly commandKind: DiscordCommandKind;
  readonly name: string;
  readonly description: string;
  readonly options: readonly DiscordCommandOptionDeclaration[];
  readonly subcommands?: readonly DiscordSubcommandDeclaration[];
  readonly groups?: readonly DiscordSubcommandGroupDeclaration[];
  readonly body: readonly Statement[];
  readonly prefix?: string;
  /** If false, the JavaScript PseudoClient.prefix overrides the DSL default. */
  readonly prefixExplicit?: boolean;
  readonly aliases?: readonly string[];
  readonly caseSensitive?: boolean;
  readonly dmPermission?: boolean;
  readonly nsfw?: boolean;
  readonly defaultMemberPermissions?: readonly string[];
  readonly permissionError?: string;
  readonly cooldown?: CommandCooldown;
  readonly contexts?: readonly string[];
  readonly integrationTypes?: readonly string[];
}

export interface DiscordContextCommandDeclaration extends ASTNode<'DiscordContextCommandDeclaration'> {
  readonly contextKind: 'usuario' | 'mensaje';
  readonly name: string;
  readonly body: readonly Statement[];
  readonly defaultMemberPermissions?: readonly string[];
}

export interface DiscordComponentHandlerDeclaration extends ASTNode<'DiscordComponentHandlerDeclaration'> {
  readonly componentKind: 'boton' | 'menu' | 'modal' | 'autocomplete';
  readonly customId?: string;
  readonly commandName?: string;
  readonly optionName?: string;
  readonly body: readonly Statement[];
}

export interface SchedulerDeclaration extends ASTNode<'SchedulerDeclaration'> {
  readonly name?: string;
  readonly every?: Expression;
  readonly at?: Expression;
  readonly cron?: string;
  readonly body: readonly Statement[];
}
