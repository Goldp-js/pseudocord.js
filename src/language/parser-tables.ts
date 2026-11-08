/** Tablas declarativas de la gramática del parser. */
export const EVENT_ALIASES: Record<string, {event:string; params:string[]}> = {
  INICIAR:{event:'clientReady',params:['cliente']}, LISTO:{event:'clientReady',params:['cliente']},
  MENSAJE:{event:'messageCreate',params:['mensaje']}, MENSAJE_CREADO:{event:'messageCreate',params:['mensaje']},
  MENSAJE_ELIMINADO:{event:'messageDelete',params:['mensaje']}, MENSAJE_EDITADO:{event:'messageUpdate',params:['anterior','mensaje']},
  ENTRAR:{event:'guildMemberAdd',params:['usuario']}, MIEMBRO_ENTRA:{event:'guildMemberAdd',params:['usuario']},
  SALIR:{event:'guildMemberRemove',params:['usuario']}, MIEMBRO_SALE:{event:'guildMemberRemove',params:['usuario']},
  INTERACCION:{event:'interactionCreate',params:['interaccion']}, REACCION:{event:'messageReactionAdd',params:['reaccion','usuario']},
  REACCION_QUITADA:{event:'messageReactionRemove',params:['reaccion','usuario']}, VOZ:{event:'voiceStateUpdate',params:['vozAnterior','vozNueva']},
  CANAL_CREADO:{event:'channelCreate',params:['canal']}, CANAL_ELIMINADO:{event:'channelDelete',params:['canal']}, CANAL_EDITADO:{event:'channelUpdate',params:['anterior','canal']},
  ROL_CREADO:{event:'roleCreate',params:['rol']}, ROL_ELIMINADO:{event:'roleDelete',params:['rol']}, ROL_EDITADO:{event:'roleUpdate',params:['anterior','rol']},
  HILO_CREADO:{event:'threadCreate',params:['hilo','nuevo']}, HILO_ELIMINADO:{event:'threadDelete',params:['hilo']}, HILO_EDITADO:{event:'threadUpdate',params:['anterior','hilo']},
  HILO_MIEMBRO:{event:'threadMembersUpdate',params:['anteriores','actuales']},
  PRESENCIA:{event:'presenceUpdate',params:['anterior','presencia']}, USUARIO_EDITADO:{event:'userUpdate',params:['anterior','usuario']},
  BAN:{event:'guildBanAdd',params:['ban']}, DESBAN:{event:'guildBanRemove',params:['ban']},
  INVITACION_CREADA:{event:'inviteCreate',params:['invitacion']}, INVITACION_ELIMINADA:{event:'inviteDelete',params:['invitacion']},
  ENCUESTA_VOTO:{event:'messagePollVoteAdd',params:['respuesta','usuarioId']}, ENCUESTA_QUITA_VOTO:{event:'messagePollVoteRemove',params:['respuesta','usuarioId']},
  ESCRIBIENDO:{event:'typingStart',params:['escritura']},
  EMOJI_CREADO:{event:'emojiCreate',params:['emoji']}, EMOJI_ELIMINADO:{event:'emojiDelete',params:['emoji']}, EMOJI_EDITADO:{event:'emojiUpdate',params:['anterior','emoji']},
  STICKER_CREADO:{event:'stickerCreate',params:['sticker']}, STICKER_ELIMINADO:{event:'stickerDelete',params:['sticker']}, STICKER_EDITADO:{event:'stickerUpdate',params:['anterior','sticker']},
  SERVIDOR_ENTRA:{event:'guildCreate',params:['servidor']}, SERVIDOR_SALE:{event:'guildDelete',params:['servidor']}, SERVIDOR_EDITADO:{event:'guildUpdate',params:['anterior','servidor']},
  EVENTO_CREADO:{event:'guildScheduledEventCreate',params:['evento']}, EVENTO_ELIMINADO:{event:'guildScheduledEventDelete',params:['evento']}, EVENTO_EDITADO:{event:'guildScheduledEventUpdate',params:['anterior','evento']},
  AUTOMOD_REGLA_CREADA:{event:'autoModerationRuleCreate',params:['regla']}, AUTOMOD_REGLA_ELIMINADA:{event:'autoModerationRuleDelete',params:['regla']}, AUTOMOD_REGLA_EDITADA:{event:'autoModerationRuleUpdate',params:['anterior','regla']}, AUTOMOD_ACCION:{event:'autoModerationActionExecution',params:['accion']},
  WEBHOOKS:{event:'webhooksUpdate',params:['canal']},
  ENTITLEMENT_CREADO:{event:'entitlementCreate',params:['entitlement']}, ENTITLEMENT_EDITADO:{event:'entitlementUpdate',params:['anterior','entitlement']}, ENTITLEMENT_ELIMINADO:{event:'entitlementDelete',params:['entitlement']},
  SONIDO_CREADO:{event:'guildSoundboardSoundCreate',params:['sonido']}, SONIDO_ELIMINADO:{event:'guildSoundboardSoundDelete',params:['sonido']}, SONIDO_EDITADO:{event:'guildSoundboardSoundUpdate',params:['anterior','sonido']},
};

export const PRECEDENCE: Record<string, number> = {
  'O':1,'||':1,'??':1, 'Y':2,'&&':2,
  '=':3,'==':3,'!=':3,'===':3,'!==':3,'<':3,'<=':3,'>':3,'>=':3,'CONTIENE':3,'NO_CONTIENE':3,'EMPIEZA_CON':3,'TERMINA_CON':3,'EN':3,'NO_EN':3,'COINCIDE':3,'NO_COINCIDE':3,
  '|':4,'^':5,'&':6,'<<':7,'>>':7,'>>>':7,
  '+':8,'-':8,'*':9,'/':9,'%':9,'MOD':9,'**':10,
};

export const BUILDER_WORDS = new Set(['BUILDER','EMBED','BOTON','MENU','SELECT','CAMPO_TEXTO','ENTRADA_TEXTO','MODAL','FILA','ARCHIVO','IMAGEN','ENCUESTA','MENSAJE']);
export const BUILDER_FLAGS = new Set(['EN_LINEA','REQUERIDO','PREDETERMINADO','DESHABILITADO','EFIMERO','SPOILER','MULTIPLE','TTS','SUPRIMIR_EMBEDS']);
export const BUILDER_ENUMS = new Set(['PRIMARIO','SECUNDARIO','EXITO','PELIGRO','ENLACE','PREMIUM','CORTO','PARRAFO','TEXTO','USUARIO','ROL','MENCIONABLE','CANAL']);

