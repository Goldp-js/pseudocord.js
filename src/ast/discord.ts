import type { ASTNode } from './base.js';
import type { Expression } from './expressions.js';

/** Tipos AST de componentes y estructuras de Discord. */
export type DiscordValueExpression =
  | DiscordMessageExpression
  | DiscordEmbedExpression
  | DiscordButtonExpression
  | DiscordSelectExpression
  | DiscordModalExpression
  | DiscordTextInputExpression
  | DiscordPollExpression
  | DiscordAttachmentExpression
  | DiscordPermissionOverwriteExpression;

export interface DiscordMessageExpression extends ASTNode<'DiscordMessageExpression'> {
  readonly content?: Expression;
  readonly embeds?: readonly DiscordEmbedExpression[];
  readonly components?: readonly DiscordComponentExpression[];
  readonly files?: readonly DiscordAttachmentExpression[];
  readonly poll?: DiscordPollExpression;
  readonly allowedMentions?: DiscordAllowedMentions;
  readonly ephemeral?: boolean;
  readonly suppressEmbeds?: boolean;
}

export interface DiscordAllowedMentions {
  readonly parse?: readonly ('users' | 'roles' | 'everyone')[];
  readonly users?: readonly Expression[];
  readonly roles?: readonly Expression[];
  readonly repliedUser?: boolean;
}

export interface DiscordEmbedField {
  readonly name: Expression;
  readonly value: Expression;
  readonly inline?: boolean;
}

export interface DiscordEmbedExpression extends ASTNode<'DiscordEmbedExpression'> {
  readonly title?: Expression;
  readonly description?: Expression;
  readonly url?: Expression;
  readonly color?: Expression;
  readonly timestamp?: Expression;
  readonly author?: { readonly name: Expression; readonly url?: Expression; readonly iconUrl?: Expression };
  readonly footer?: { readonly text: Expression; readonly iconUrl?: Expression };
  readonly image?: Expression;
  readonly thumbnail?: Expression;
  readonly fields?: readonly DiscordEmbedField[];
}

export type DiscordComponentExpression =
  | DiscordButtonExpression
  | DiscordSelectExpression
  | DiscordTextInputExpression;

export interface DiscordButtonExpression extends ASTNode<'DiscordButtonExpression'> {
  readonly label?: Expression;
  readonly customId?: Expression;
  readonly style: 'primario' | 'secundario' | 'exito' | 'peligro' | 'enlace' | 'premium';
  readonly emoji?: Expression;
  readonly url?: Expression;
  readonly skuId?: Expression;
  readonly disabled?: Expression;
}

export interface DiscordSelectOption {
  readonly label: Expression;
  readonly value: Expression;
  readonly description?: Expression;
  readonly emoji?: Expression;
  readonly default?: Expression;
}

export interface DiscordSelectExpression extends ASTNode<'DiscordSelectExpression'> {
  readonly selectKind: 'texto' | 'usuario' | 'rol' | 'mencionable' | 'canal';
  readonly customId: Expression;
  readonly placeholder?: Expression;
  readonly minValues?: Expression;
  readonly maxValues?: Expression;
  readonly disabled?: Expression;
  readonly options?: readonly DiscordSelectOption[];
  readonly channelTypes?: readonly string[];
  readonly defaultValues?: readonly Expression[];
}

export interface DiscordModalExpression extends ASTNode<'DiscordModalExpression'> {
  readonly customId: Expression;
  readonly title: Expression;
  readonly components: readonly DiscordTextInputExpression[];
}

export interface DiscordTextInputExpression extends ASTNode<'DiscordTextInputExpression'> {
  readonly customId: Expression;
  readonly label: Expression;
  readonly style: 'corto' | 'parrafo';
  readonly placeholder?: Expression;
  readonly value?: Expression;
  readonly required?: Expression;
  readonly minLength?: Expression;
  readonly maxLength?: Expression;
}

export interface DiscordPollAnswer {
  readonly text: Expression;
  readonly emoji?: Expression;
}

export interface DiscordPollExpression extends ASTNode<'DiscordPollExpression'> {
  readonly question: Expression;
  readonly answers: readonly DiscordPollAnswer[];
  readonly durationHours?: Expression;
  readonly allowMultiselect?: Expression;
  readonly layoutType?: string;
}

export interface DiscordAttachmentExpression extends ASTNode<'DiscordAttachmentExpression'> {
  readonly source: Expression;
  readonly name?: Expression;
  readonly description?: Expression;
  readonly spoiler?: Expression;
}

export interface DiscordPermissionOverwriteExpression extends ASTNode<'DiscordPermissionOverwriteExpression'> {
  readonly target: Expression;
  readonly allow?: readonly string[];
  readonly deny?: readonly string[];
}

/** Referencia a recurso Discord resuelta por ID, nombre o contexto. */
export interface DiscordEntityReference extends ASTNode<'DiscordEntityReference'> {
  readonly entityType:
    | 'usuario' | 'miembro' | 'servidor' | 'canal' | 'rol' | 'mensaje' | 'emoji' | 'sticker'
    | 'hilo' | 'webhook' | 'invitacion' | 'evento' | 'sonido' | 'encuesta' | 'interaccion'
    | 'comando' | 'automod' | 'suscripcion' | 'entitlement';
  readonly by: 'id' | 'nombre' | 'mencion' | 'actual';
  readonly value?: Expression;
}
