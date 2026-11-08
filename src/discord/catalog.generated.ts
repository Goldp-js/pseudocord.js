/**
 * AUTO-GENERADO desde discord.js 14.28.0 typings/index.d.ts.
 * No editar manualmente. Regenerar con scripts/generate-discord-catalog.cjs.
 */

export const DISCORD_API_STATS = {
  "discordJsVersion": "14.28.0",
  "generatedFrom": "index.d.ts",
  "classes": 219,
  "interfaces": 348,
  "declaredMethods": 951,
  "declaredProperties": 2546,
  "topLevelFunctions": 19,
  "clientEvents": 90
} as const;

export const DISCORD_API_ENTITIES = {
  "Activity": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(activity: Activity): boolean;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "presence",
        "kind": "property",
        "static": false,
        "signature": "public readonly presence: Presence;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake | null;"
      },
      {
        "name": "assets",
        "kind": "property",
        "static": false,
        "signature": "public assets: RichPresenceAssets | null;"
      },
      {
        "name": "buttons",
        "kind": "property",
        "static": false,
        "signature": "public buttons: string[];"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public createdTimestamp: number;"
      },
      {
        "name": "details",
        "kind": "property",
        "static": false,
        "signature": "public details: string | null;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "public emoji: Emoji | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ActivityFlagsBitField>;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "party",
        "kind": "property",
        "static": false,
        "signature": "public party: { id: string | null; size: [number, number]; } | null;"
      },
      {
        "name": "state",
        "kind": "property",
        "static": false,
        "signature": "public state: string | null;"
      },
      {
        "name": "syncId",
        "kind": "property",
        "static": false,
        "signature": "public syncId: string | null;"
      },
      {
        "name": "timestamps",
        "kind": "property",
        "static": false,
        "signature": "public timestamps: { start: Date | null; end: Date | null; } | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ActivityType;"
      },
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "public url: string | null;"
      }
    ]
  },
  "ActivityInstance": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake;"
      },
      {
        "name": "instanceId",
        "kind": "property",
        "static": false,
        "signature": "public instanceId: string;"
      },
      {
        "name": "launchId",
        "kind": "property",
        "static": false,
        "signature": "public launchId: Snowflake;"
      },
      {
        "name": "location",
        "kind": "property",
        "static": false,
        "signature": "public location: ActivityLocation;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Snowflake[];"
      }
    ]
  },
  "ActivityLocation": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: string;"
      },
      {
        "name": "kind",
        "kind": "property",
        "static": false,
        "signature": "public kind: ActivityLocationKind;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): Channel | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      }
    ]
  },
  "BaseComponentData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id?: number;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType;"
      }
    ]
  },
  "ActionRowData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components: readonly ComponentType[];"
      }
    ]
  },
  "ActionRowBuilder": {
    "kind": "class",
    "extends": [
      "BuilderActionRow<ComponentType>"
    ],
    "implements": [],
    "constructors": [
      "public constructor( data?: Partial< | ActionRowData<ActionRowComponentData | JSONEncodable<APIComponentInActionRow>> | APIActionRowComponent<APIComponentInMessageActionRow | APIComponentInModalActionRow> >, );"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from<ComponentType extends AnyComponentBuilder = AnyComponentBuilder>( other: | JSONEncodable<APIActionRowComponent<ReturnType<ComponentType['toJSON']>>> | APIActionRowComponent<ReturnType<ComponentType['toJSON']>>, ): ActionRowBuilder<ComponentType>;"
      }
    ],
    "properties": []
  },
  "LabelComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.Label;"
      },
      {
        "name": "component",
        "kind": "property",
        "static": false,
        "signature": "component: ComponentInLabelData;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      }
    ]
  },
  "ActionRow": {
    "kind": "class",
    "extends": [
      "Component< APIActionRowComponent<APIComponentInMessageActionRow | APIComponentInModalActionRow> >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): APIActionRowComponent<ReturnType<ComponentType['toJSON']>>;"
      }
    ],
    "properties": [
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public readonly components: ComponentType[];"
      }
    ]
  },
  "ActivityFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<ActivityFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<ActivityFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof ActivityFlags;"
      }
    ]
  },
  "AnonymousGuild": {
    "kind": "class",
    "extends": [
      "BaseGuild"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "bannerURL",
        "static": false,
        "signature": "public bannerURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "splashURL",
        "static": false,
        "signature": "public splashURL(options?: ImageURLOptions): string | null;"
      }
    ],
    "properties": [
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "public banner: string | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "nsfwLevel",
        "kind": "property",
        "static": false,
        "signature": "public nsfwLevel: GuildNSFWLevel;"
      },
      {
        "name": "premiumSubscriptionCount",
        "kind": "property",
        "static": false,
        "signature": "public premiumSubscriptionCount: number | null;"
      },
      {
        "name": "splash",
        "kind": "property",
        "static": false,
        "signature": "public splash: string | null;"
      },
      {
        "name": "vanityURLCode",
        "kind": "property",
        "static": false,
        "signature": "public vanityURLCode: string | null;"
      },
      {
        "name": "verificationLevel",
        "kind": "property",
        "static": false,
        "signature": "public verificationLevel: GuildVerificationLevel;"
      }
    ]
  },
  "AutoModerationActionExecution": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "action",
        "kind": "property",
        "static": false,
        "signature": "public action: AutoModerationAction;"
      },
      {
        "name": "ruleId",
        "kind": "property",
        "static": false,
        "signature": "public ruleId: Snowflake;"
      },
      {
        "name": "ruleTriggerType",
        "kind": "property",
        "static": false,
        "signature": "public ruleTriggerType: AutoModerationRuleTriggerType;"
      },
      {
        "name": "user",
        "kind": "getter",
        "static": false,
        "signature": "public get user(): User | null;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public userId: Snowflake;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): GuildTextBasedChannel | ForumChannel | MediaChannel | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "member",
        "kind": "getter",
        "static": false,
        "signature": "public get member(): GuildMember | null;"
      },
      {
        "name": "messageId",
        "kind": "property",
        "static": false,
        "signature": "public messageId: Snowflake | null;"
      },
      {
        "name": "alertSystemMessageId",
        "kind": "property",
        "static": false,
        "signature": "public alertSystemMessageId: Snowflake | null;"
      },
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "public content: string;"
      },
      {
        "name": "matchedKeyword",
        "kind": "property",
        "static": false,
        "signature": "public matchedKeyword: string | null;"
      },
      {
        "name": "matchedContent",
        "kind": "property",
        "static": false,
        "signature": "public matchedContent: string | null;"
      },
      {
        "name": "autoModerationRule",
        "kind": "getter",
        "static": false,
        "signature": "public get autoModerationRule(): AutoModerationRule | null;"
      }
    ]
  },
  "AutoModerationRule": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: AutoModerationRuleEditOptions): Promise<AutoModerationRule>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<void>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setEventType",
        "static": false,
        "signature": "public setEventType(eventType: AutoModerationRuleEventType, reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setKeywordFilter",
        "static": false,
        "signature": "public setKeywordFilter(keywordFilter: readonly string[], reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setRegexPatterns",
        "static": false,
        "signature": "public setRegexPatterns(regexPatterns: readonly string[], reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setPresets",
        "static": false,
        "signature": "public setPresets( presets: readonly AutoModerationRuleKeywordPresetType[], reason?: string, ): Promise<AutoModerationRule>;"
      },
      {
        "name": "setAllowList",
        "static": false,
        "signature": "public setAllowList(allowList: readonly string[], reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setMentionTotalLimit",
        "static": false,
        "signature": "public setMentionTotalLimit(mentionTotalLimit: number, reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setMentionRaidProtectionEnabled",
        "static": false,
        "signature": "public setMentionRaidProtectionEnabled( mentionRaidProtectionEnabled: boolean, reason?: string, ): Promise<AutoModerationRule>;"
      },
      {
        "name": "setActions",
        "static": false,
        "signature": "public setActions(actions: readonly AutoModerationActionOptions[], reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setEnabled",
        "static": false,
        "signature": "public setEnabled(enabled?: boolean, reason?: string): Promise<AutoModerationRule>;"
      },
      {
        "name": "setExemptRoles",
        "static": false,
        "signature": "public setExemptRoles( roles: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[], reason?: string, ): Promise<AutoModerationRule>;"
      },
      {
        "name": "setExemptChannels",
        "static": false,
        "signature": "public setExemptChannels( channels: ReadonlyCollection<Snowflake, GuildBasedChannel> | readonly GuildChannelResolvable[], reason?: string, ): Promise<AutoModerationRule>;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "creatorId",
        "kind": "property",
        "static": false,
        "signature": "public creatorId: Snowflake;"
      },
      {
        "name": "eventType",
        "kind": "property",
        "static": false,
        "signature": "public eventType: AutoModerationRuleEventType;"
      },
      {
        "name": "triggerType",
        "kind": "property",
        "static": false,
        "signature": "public triggerType: AutoModerationRuleTriggerType;"
      },
      {
        "name": "triggerMetadata",
        "kind": "property",
        "static": false,
        "signature": "public triggerMetadata: AutoModerationTriggerMetadata;"
      },
      {
        "name": "actions",
        "kind": "property",
        "static": false,
        "signature": "public actions: AutoModerationAction[];"
      },
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "public enabled: boolean;"
      },
      {
        "name": "exemptRoles",
        "kind": "property",
        "static": false,
        "signature": "public exemptRoles: Collection<Snowflake, Role>;"
      },
      {
        "name": "exemptChannels",
        "kind": "property",
        "static": false,
        "signature": "public exemptChannels: Collection<Snowflake, GuildBasedChannel>;"
      }
    ]
  },
  "Application": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "coverURL",
        "static": false,
        "signature": "public coverURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string | null;"
      }
    ],
    "properties": [
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string | null;"
      },
      {
        "name": "termsOfServiceURL",
        "kind": "property",
        "static": false,
        "signature": "public termsOfServiceURL: string | null;"
      },
      {
        "name": "privacyPolicyURL",
        "kind": "property",
        "static": false,
        "signature": "public privacyPolicyURL: string | null;"
      },
      {
        "name": "rpcOrigins",
        "kind": "property",
        "static": false,
        "signature": "public rpcOrigins: string[];"
      },
      {
        "name": "cover",
        "kind": "property",
        "static": false,
        "signature": "public cover: string | null;"
      },
      {
        "name": "verifyKey",
        "kind": "property",
        "static": false,
        "signature": "public verifyKey: string | null;"
      }
    ]
  },
  "ApplicationCommand": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(data: Partial<ApplicationCommandData>): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setNameLocalizations",
        "static": false,
        "signature": "public setNameLocalizations(nameLocalizations: LocalizationMap): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setDescription",
        "static": false,
        "signature": "public setDescription(description: string): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setDescriptionLocalizations",
        "static": false,
        "signature": "public setDescriptionLocalizations( descriptionLocalizations: LocalizationMap, ): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setDefaultMemberPermissions",
        "static": false,
        "signature": "public setDefaultMemberPermissions( defaultMemberPermissions: PermissionResolvable | null, ): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setDMPermission",
        "static": false,
        "signature": "public setDMPermission(dmPermission?: boolean): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "setOptions",
        "static": false,
        "signature": "public setOptions( options: readonly ApplicationCommandOptionData[], ): Promise<ApplicationCommand<PermissionsFetchType>>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals( command: ApplicationCommand | ApplicationCommandData | RawApplicationCommandData, enforceOptionOrder?: boolean, ): boolean;"
      },
      {
        "name": "optionsEqual",
        "static": true,
        "signature": "public static optionsEqual( existing: readonly ApplicationCommandOption[], options: | readonly ApplicationCommandOption[] | readonly ApplicationCommandOptionData[] | readonly APIApplicationCommandOption[], enforceOptionOrder?: boolean, ): boolean;"
      }
    ],
    "properties": [
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake;"
      },
      {
        "name": "contexts",
        "kind": "property",
        "static": false,
        "signature": "public contexts: InteractionContextType[] | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "defaultMemberPermissions",
        "kind": "property",
        "static": false,
        "signature": "public defaultMemberPermissions: Readonly<PermissionsBitField> | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "public descriptionLocalizations: LocalizationMap | null;"
      },
      {
        "name": "descriptionLocalized",
        "kind": "property",
        "static": false,
        "signature": "public descriptionLocalized: string | null;"
      },
      {
        "name": "dmPermission",
        "kind": "property",
        "static": false,
        "signature": "public dmPermission: boolean | null;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "manager",
        "kind": "getter",
        "static": false,
        "signature": "public get manager(): ApplicationCommandManager;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "integrationTypes",
        "kind": "property",
        "static": false,
        "signature": "public integrationTypes: ApplicationIntegrationType[] | null;"
      },
      {
        "name": "handler",
        "kind": "property",
        "static": false,
        "signature": "public handler: EntryPointCommandHandlerType | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "public nameLocalizations: LocalizationMap | null;"
      },
      {
        "name": "nameLocalized",
        "kind": "property",
        "static": false,
        "signature": "public nameLocalized: string | null;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: (ApplicationCommandOption & { nameLocalized?: string; descriptionLocalized?: string })[];"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: ApplicationCommandPermissionsManager< PermissionsFetchType, PermissionsFetchType, Guild | null, Snowflake >;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ApplicationCommandType;"
      },
      {
        "name": "version",
        "kind": "property",
        "static": false,
        "signature": "public version: Snowflake;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "public nsfw: boolean;"
      }
    ]
  },
  "ApplicationRoleConnectionMetadata": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "public nameLocalizations: LocalizationMap | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "public descriptionLocalizations: LocalizationMap | null;"
      },
      {
        "name": "key",
        "kind": "property",
        "static": false,
        "signature": "public key: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ApplicationRoleConnectionMetadataType;"
      }
    ]
  },
  "ApplicationFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<ApplicationFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<ApplicationFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof ApplicationFlags;"
      }
    ]
  },
  "Base": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>);"
    ],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(...props: Record<string, boolean | string>[]): unknown;"
      },
      {
        "name": "valueOf",
        "static": false,
        "signature": "public valueOf(): string;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client<true>;"
      }
    ]
  },
  "BaseClient": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [
      "AsyncDisposable"
    ],
    "constructors": [
      "public constructor(options?: ClientOptions | WebhookClientOptions);"
    ],
    "methods": [
      {
        "name": "destroy",
        "static": false,
        "signature": "public destroy(): void;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(...props: Record<string, boolean | string>[]): unknown;"
      },
      {
        "name": "[Symbol.asyncDispose]",
        "static": false,
        "signature": "public [Symbol.asyncDispose](): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: ClientOptions | WebhookClientOptions;"
      },
      {
        "name": "rest",
        "kind": "property",
        "static": false,
        "signature": "public rest: REST;"
      }
    ]
  },
  "CommandInteraction": {
    "kind": "class",
    "extends": [
      "BaseInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is CommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is CommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is CommandInteraction<'raw'>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { fetchReply: true }, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply(options?: InteractionDeferReplyOptions): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deleteReply",
        "static": false,
        "signature": "public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;"
      },
      {
        "name": "editReply",
        "static": false,
        "signature": "public editReply( options: string | MessagePayload | InteractionEditReplyOptions, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "fetchReply",
        "static": false,
        "signature": "public fetchReply(message?: Snowflake | '@original'): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "followUp",
        "static": false,
        "signature": "public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: InteractionReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: string | MessagePayload | InteractionReplyOptions, ): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options: LaunchActivityOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity(options?: LaunchActivityOptions & { withResponse?: false }): Promise<undefined>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options?: LaunchActivityOptions, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>> | undefined>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options: ShowModalOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options?: ShowModalOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options?: ShowModalOptions, ): Promise<undefined>;"
      },
      {
        "name": "sendPremiumRequired",
        "static": false,
        "signature": "public sendPremiumRequired(): Promise<void>;"
      },
      {
        "name": "awaitModalSubmit",
        "static": false,
        "signature": "public awaitModalSubmit( options: AwaitModalSubmitOptions<ModalSubmitInteraction>, ): Promise<ModalSubmitInteraction<Cached>>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType.ApplicationCommand;"
      },
      {
        "name": "command",
        "kind": "getter",
        "static": false,
        "signature": "public get command(): ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "commandId",
        "kind": "property",
        "static": false,
        "signature": "public commandId: Snowflake;"
      },
      {
        "name": "commandName",
        "kind": "property",
        "static": false,
        "signature": "public commandName: string;"
      },
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType;"
      },
      {
        "name": "commandGuildId",
        "kind": "property",
        "static": false,
        "signature": "public commandGuildId: Snowflake | null;"
      },
      {
        "name": "deferred",
        "kind": "property",
        "static": false,
        "signature": "public deferred: boolean;"
      },
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "public ephemeral: boolean | null;"
      },
      {
        "name": "replied",
        "kind": "property",
        "static": false,
        "signature": "public replied: boolean;"
      },
      {
        "name": "webhook",
        "kind": "property",
        "static": false,
        "signature": "public webhook: InteractionWebhook;"
      }
    ]
  },
  "InteractionResponse": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "awaitMessageComponent",
        "static": false,
        "signature": "public awaitMessageComponent<ComponentType extends MessageComponentType>( options?: AwaitMessageCollectorOptionsParams<ComponentType, Cached>, ): Promise<MappedInteractionTypes<Cached>[ComponentType]>;"
      },
      {
        "name": "createMessageComponentCollector",
        "static": false,
        "signature": "public createMessageComponentCollector<ComponentType extends MessageComponentType>( options?: MessageCollectorOptionsParams<ComponentType, Cached>, ): InteractionCollector<MappedInteractionTypes<Cached>[ComponentType]>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<void>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: string | MessagePayload | WebhookMessageEditOptions): Promise<Message>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<Message>;"
      }
    ],
    "properties": [
      {
        "name": "interaction",
        "kind": "property",
        "static": false,
        "signature": "public interaction: Interaction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public client: Client;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      }
    ]
  },
  "BaseGuild": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<Guild>;"
      },
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "features",
        "kind": "property",
        "static": false,
        "signature": "public features: `${GuildFeature}`[];"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "nameAcronym",
        "kind": "getter",
        "static": false,
        "signature": "public get nameAcronym(): string;"
      },
      {
        "name": "partnered",
        "kind": "getter",
        "static": false,
        "signature": "public get partnered(): boolean;"
      },
      {
        "name": "verified",
        "kind": "getter",
        "static": false,
        "signature": "public get verified(): boolean;"
      }
    ]
  },
  "BaseGuildEmoji": {
    "kind": "class",
    "extends": [
      "Emoji"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "imageURL",
        "static": false,
        "signature": "public imageURL(options?: EmojiURLOptions): string;"
      }
    ],
    "properties": [
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      },
      {
        "name": "available",
        "kind": "property",
        "static": false,
        "signature": "public available: boolean | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild | GuildPreview;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "animated",
        "kind": "property",
        "static": false,
        "signature": "public animated: boolean;"
      },
      {
        "name": "managed",
        "kind": "property",
        "static": false,
        "signature": "public managed: boolean;"
      },
      {
        "name": "requiresColons",
        "kind": "property",
        "static": false,
        "signature": "public requiresColons: boolean | null;"
      }
    ]
  },
  "BaseGuildTextChannel": {
    "kind": "class",
    "extends": [
      "GuildChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createInvite",
        "static": false,
        "signature": "public createInvite(options?: InviteCreateOptions): Promise<Invite>;"
      },
      {
        "name": "fetchInvites",
        "static": false,
        "signature": "public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;"
      },
      {
        "name": "setDefaultAutoArchiveDuration",
        "static": false,
        "signature": "public setDefaultAutoArchiveDuration( defaultAutoArchiveDuration: ThreadAutoArchiveDuration, reason?: string, ): Promise<this>;"
      },
      {
        "name": "setTopic",
        "static": false,
        "signature": "public setTopic(topic: string | null, reason?: string): Promise<this>;"
      },
      {
        "name": "setType",
        "static": false,
        "signature": "public setType(type: ChannelType.GuildText, reason?: string): Promise<TextChannel>;"
      },
      {
        "name": "setType",
        "static": false,
        "signature": "public setType(type: ChannelType.GuildAnnouncement, reason?: string): Promise<NewsChannel>;"
      }
    ],
    "properties": [
      {
        "name": "defaultAutoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "public defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;"
      },
      {
        "name": "defaultThreadRateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public defaultThreadRateLimitPerUser: number | null;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public rateLimitPerUser: number | null;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "public nsfw: boolean;"
      },
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "public threads: GuildTextThreadManager<AllowedThreadTypeForTextChannel | AllowedThreadTypeForNewsChannel>;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "public topic: string | null;"
      }
    ]
  },
  "BaseGuildVoiceChannel": {
    "kind": "class",
    "extends": [
      "GuildChannel"
    ],
    "implements": [],
    "constructors": [
      "public constructor(guild: Guild, data?: RawGuildChannelData);"
    ],
    "methods": [
      {
        "name": "createInvite",
        "static": false,
        "signature": "public createInvite(options?: InviteCreateOptions): Promise<Invite>;"
      },
      {
        "name": "fetchInvites",
        "static": false,
        "signature": "public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;"
      },
      {
        "name": "setBitrate",
        "static": false,
        "signature": "public setBitrate(bitrate: number, reason?: string): Promise<this>;"
      },
      {
        "name": "setRTCRegion",
        "static": false,
        "signature": "public setRTCRegion(rtcRegion: string | null, reason?: string): Promise<this>;"
      },
      {
        "name": "setUserLimit",
        "static": false,
        "signature": "public setUserLimit(userLimit: number, reason?: string): Promise<this>;"
      },
      {
        "name": "setVideoQualityMode",
        "static": false,
        "signature": "public setVideoQualityMode(videoQualityMode: VideoQualityMode, reason?: string): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "bitrate",
        "kind": "property",
        "static": false,
        "signature": "public bitrate: number;"
      },
      {
        "name": "full",
        "kind": "getter",
        "static": false,
        "signature": "public get full(): boolean;"
      },
      {
        "name": "joinable",
        "kind": "getter",
        "static": false,
        "signature": "public get joinable(): boolean;"
      },
      {
        "name": "members",
        "kind": "getter",
        "static": false,
        "signature": "public get members(): Collection<Snowflake, GuildMember>;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "public nsfw: boolean;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public rateLimitPerUser: number | null;"
      },
      {
        "name": "rtcRegion",
        "kind": "property",
        "static": false,
        "signature": "public rtcRegion: string | null;"
      },
      {
        "name": "userLimit",
        "kind": "property",
        "static": false,
        "signature": "public userLimit: number;"
      },
      {
        "name": "videoQualityMode",
        "kind": "property",
        "static": false,
        "signature": "public videoQualityMode: VideoQualityMode | null;"
      }
    ]
  },
  "BitField": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(bits?: BitFieldResolvable<Flags, Type>);"
    ],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add(...bits: BitFieldResolvable<Flags, Type>[]): BitField<Flags, Type>;"
      },
      {
        "name": "any",
        "static": false,
        "signature": "public any(bit: BitFieldResolvable<Flags, Type>): boolean;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(bit: BitFieldResolvable<Flags, Type>): boolean;"
      },
      {
        "name": "freeze",
        "static": false,
        "signature": "public freeze(): Readonly<BitField<Flags, Type>>;"
      },
      {
        "name": "has",
        "static": false,
        "signature": "public has(bit: BitFieldResolvable<Flags, Type>): boolean;"
      },
      {
        "name": "missing",
        "static": false,
        "signature": "public missing(bits: BitFieldResolvable<Flags, Type>, ...hasParams: readonly unknown[]): Flags[];"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(...bits: BitFieldResolvable<Flags, Type>[]): BitField<Flags, Type>;"
      },
      {
        "name": "serialize",
        "static": false,
        "signature": "public serialize(...hasParams: readonly unknown[]): Record<Flags, boolean>;"
      },
      {
        "name": "toArray",
        "static": false,
        "signature": "public toArray(...hasParams: readonly unknown[]): Flags[];"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): Type extends number ? number : string;"
      },
      {
        "name": "valueOf",
        "static": false,
        "signature": "public valueOf(): Type;"
      },
      {
        "name": "[Symbol.iterator]",
        "static": false,
        "signature": "public [Symbol.iterator](): IterableIterator<Flags>;"
      },
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint;"
      }
    ],
    "properties": [
      {
        "name": "bitfield",
        "kind": "property",
        "static": false,
        "signature": "public bitfield: Type;"
      },
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: EnumLike<unknown, number | bigint>;"
      }
    ]
  },
  "ButtonInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is ButtonInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is ButtonInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is ButtonInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.Button;"
      },
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, ButtonComponent, APIButtonComponent, ButtonComponent | APIButtonComponent, ButtonComponent | APIButtonComponent >;"
      }
    ]
  },
  "Component": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): RawComponentData;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: this | RawComponentData): boolean;"
      }
    ],
    "properties": [
      {
        "name": "data",
        "kind": "property",
        "static": false,
        "signature": "public readonly data: Readonly<RawComponentData>;"
      },
      {
        "name": "id",
        "kind": "getter",
        "static": false,
        "signature": "public get id(): RawComponentData['id'];"
      },
      {
        "name": "type",
        "kind": "getter",
        "static": false,
        "signature": "public get type(): RawComponentData['type'];"
      }
    ]
  },
  "ButtonComponent": {
    "kind": "class",
    "extends": [
      "Component<APIButtonComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "style",
        "kind": "getter",
        "static": false,
        "signature": "public get style(): ButtonStyle;"
      },
      {
        "name": "label",
        "kind": "getter",
        "static": false,
        "signature": "public get label(): string | null;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): APIMessageComponentEmoji | null;"
      },
      {
        "name": "disabled",
        "kind": "getter",
        "static": false,
        "signature": "public get disabled(): boolean;"
      },
      {
        "name": "customId",
        "kind": "getter",
        "static": false,
        "signature": "public get customId(): string | null;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string | null;"
      }
    ]
  },
  "ButtonBuilder": {
    "kind": "class",
    "extends": [
      "BuilderButtonComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<ButtonComponentData> | Partial<APIButtonComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APIButtonComponent> | APIButtonComponent): ButtonBuilder;"
      },
      {
        "name": "setEmoji",
        "static": false,
        "signature": "public override setEmoji(emoji: ComponentEmojiResolvable): this;"
      }
    ],
    "properties": []
  },
  "StringSelectMenuBuilder": {
    "kind": "class",
    "extends": [
      "BuilderStringSelectMenuComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<StringSelectMenuComponentData | APIStringSelectComponent>);"
    ],
    "methods": [
      {
        "name": "addOptions",
        "static": false,
        "signature": "public override addOptions( ...options: RestOrArray<BuildersSelectMenuOption | SelectMenuComponentOptionData | APISelectMenuOption> ): this;"
      },
      {
        "name": "setOptions",
        "static": false,
        "signature": "public override setOptions( ...options: RestOrArray<BuildersSelectMenuOption | SelectMenuComponentOptionData | APISelectMenuOption> ): this;"
      },
      {
        "name": "from",
        "static": true,
        "signature": "public static from( other: JSONEncodable<APIStringSelectComponent> | APIStringSelectComponent, ): StringSelectMenuBuilder;"
      }
    ],
    "properties": []
  },
  "UserSelectMenuBuilder": {
    "kind": "class",
    "extends": [
      "BuilderUserSelectMenuComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<UserSelectMenuComponentData | APIUserSelectComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APIUserSelectComponent> | APIUserSelectComponent): UserSelectMenuBuilder;"
      }
    ],
    "properties": []
  },
  "RoleSelectMenuBuilder": {
    "kind": "class",
    "extends": [
      "BuilderRoleSelectMenuComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<RoleSelectMenuComponentData | APIRoleSelectComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APIRoleSelectComponent> | APIRoleSelectComponent): RoleSelectMenuBuilder;"
      }
    ],
    "properties": []
  },
  "MentionableSelectMenuBuilder": {
    "kind": "class",
    "extends": [
      "BuilderMentionableSelectMenuComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<MentionableSelectMenuComponentData | APIMentionableSelectComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from( other: JSONEncodable<APIMentionableSelectComponent> | APIMentionableSelectComponent, ): MentionableSelectMenuBuilder;"
      }
    ],
    "properties": []
  },
  "ChannelSelectMenuBuilder": {
    "kind": "class",
    "extends": [
      "BuilderChannelSelectMenuComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<ChannelSelectMenuComponentData | APIChannelSelectComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from( other: JSONEncodable<APIChannelSelectComponent> | APIChannelSelectComponent, ): ChannelSelectMenuBuilder;"
      }
    ],
    "properties": []
  },
  "StringSelectMenuOptionBuilder": {
    "kind": "class",
    "extends": [
      "BuildersSelectMenuOption"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: SelectMenuComponentOptionData | APISelectMenuOption);"
    ],
    "methods": [
      {
        "name": "setEmoji",
        "static": false,
        "signature": "public override setEmoji(emoji: ComponentEmojiResolvable): this;"
      },
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APISelectMenuOption> | APISelectMenuOption): StringSelectMenuOptionBuilder;"
      }
    ],
    "properties": []
  },
  "ModalBuilder": {
    "kind": "class",
    "extends": [
      "BuildersModal"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<ModalComponentData> | Partial<APIModalInteractionResponseCallbackData>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from( other: JSONEncodable<APIModalInteractionResponseCallbackData> | APIModalInteractionResponseCallbackData, ): ModalBuilder;"
      }
    ],
    "properties": []
  },
  "TextInputBuilder": {
    "kind": "class",
    "extends": [
      "BuilderTextInputComponent"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: Partial<TextInputComponentData | APITextInputComponent>);"
    ],
    "methods": [
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APITextInputComponent> | APITextInputComponent): TextInputBuilder;"
      }
    ],
    "properties": []
  },
  "TextInputComponent": {
    "kind": "class",
    "extends": [
      "Component<APITextInputComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "getter",
        "static": false,
        "signature": "public get customId(): string;"
      },
      {
        "name": "value",
        "kind": "getter",
        "static": false,
        "signature": "public get value(): string;"
      }
    ]
  },
  "LabelComponent": {
    "kind": "class",
    "extends": [
      "Component<APILabelComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "component",
        "kind": "property",
        "static": false,
        "signature": "public component: StringSelectMenuComponent | TextInputComponent;"
      },
      {
        "name": "label",
        "kind": "getter",
        "static": false,
        "signature": "public get label(): string;"
      },
      {
        "name": "description",
        "kind": "getter",
        "static": false,
        "signature": "public get description(): string | null;"
      }
    ]
  },
  "BaseSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "Component<Data>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "placeholder",
        "kind": "getter",
        "static": false,
        "signature": "public get placeholder(): string | null;"
      },
      {
        "name": "maxValues",
        "kind": "getter",
        "static": false,
        "signature": "public get maxValues(): number | null;"
      },
      {
        "name": "minValues",
        "kind": "getter",
        "static": false,
        "signature": "public get minValues(): number | null;"
      },
      {
        "name": "customId",
        "kind": "getter",
        "static": false,
        "signature": "public get customId(): string;"
      },
      {
        "name": "disabled",
        "kind": "getter",
        "static": false,
        "signature": "public get disabled(): boolean;"
      }
    ]
  },
  "StringSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "BaseSelectMenuComponent<APIStringSelectComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "options",
        "kind": "getter",
        "static": false,
        "signature": "public get options(): APISelectMenuOption[];"
      }
    ]
  },
  "UserSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "BaseSelectMenuComponent<APIUserSelectComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "RoleSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "BaseSelectMenuComponent<APIRoleSelectComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "MentionableSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "BaseSelectMenuComponent<APIMentionableSelectComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ChannelSelectMenuComponent": {
    "kind": "class",
    "extends": [
      "BaseSelectMenuComponent<APIChannelSelectComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "getChannelTypes",
        "static": false,
        "signature": "public getChannelTypes(): ChannelType[] | null;"
      }
    ],
    "properties": []
  },
  "EmbedData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: EmbedType;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "url?: string;"
      },
      {
        "name": "timestamp",
        "kind": "property",
        "static": false,
        "signature": "timestamp?: string | number | Date;"
      },
      {
        "name": "color",
        "kind": "property",
        "static": false,
        "signature": "color?: number;"
      },
      {
        "name": "footer",
        "kind": "property",
        "static": false,
        "signature": "footer?: EmbedFooterData;"
      },
      {
        "name": "image",
        "kind": "property",
        "static": false,
        "signature": "image?: EmbedAssetData;"
      },
      {
        "name": "thumbnail",
        "kind": "property",
        "static": false,
        "signature": "thumbnail?: EmbedAssetData;"
      },
      {
        "name": "provider",
        "kind": "property",
        "static": false,
        "signature": "provider?: APIEmbedProvider;"
      },
      {
        "name": "author",
        "kind": "property",
        "static": false,
        "signature": "author?: EmbedAuthorData;"
      },
      {
        "name": "fields",
        "kind": "property",
        "static": false,
        "signature": "fields?: readonly APIEmbedField[];"
      },
      {
        "name": "video",
        "kind": "property",
        "static": false,
        "signature": "video?: EmbedAssetData;"
      }
    ]
  },
  "IconData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "iconURL",
        "kind": "property",
        "static": false,
        "signature": "iconURL?: string;"
      },
      {
        "name": "proxyIconURL",
        "kind": "property",
        "static": false,
        "signature": "proxyIconURL?: string;"
      }
    ]
  },
  "EmbedAuthorData": {
    "kind": "interface",
    "extends": [
      "Omit<APIEmbedAuthor, 'icon_url' | 'proxy_icon_url'>",
      "IconData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "EmbedFooterData": {
    "kind": "interface",
    "extends": [
      "Omit<APIEmbedFooter, 'icon_url' | 'proxy_icon_url'>",
      "IconData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "EmbedAssetData": {
    "kind": "interface",
    "extends": [
      "Omit<APIEmbedImage, 'proxy_url'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "proxyURL",
        "kind": "property",
        "static": false,
        "signature": "proxyURL?: string;"
      }
    ]
  },
  "EmbedBuilder": {
    "kind": "class",
    "extends": [
      "BuildersEmbed"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data?: EmbedData | APIEmbed);"
    ],
    "methods": [
      {
        "name": "setColor",
        "static": false,
        "signature": "public override setColor(color: ColorResolvable | null): this;"
      },
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<APIEmbed> | APIEmbed): EmbedBuilder;"
      }
    ],
    "properties": [
      {
        "name": "length",
        "kind": "getter",
        "static": false,
        "signature": "public get length(): number;"
      }
    ]
  },
  "Embed": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: Embed | APIEmbed): boolean;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): APIEmbed;"
      }
    ],
    "properties": [
      {
        "name": "data",
        "kind": "property",
        "static": false,
        "signature": "public readonly data: Readonly<APIEmbed>;"
      },
      {
        "name": "fields",
        "kind": "getter",
        "static": false,
        "signature": "public get fields(): APIEmbedField[];"
      },
      {
        "name": "footer",
        "kind": "getter",
        "static": false,
        "signature": "public get footer(): EmbedFooterData | null;"
      },
      {
        "name": "title",
        "kind": "getter",
        "static": false,
        "signature": "public get title(): string | null;"
      },
      {
        "name": "description",
        "kind": "getter",
        "static": false,
        "signature": "public get description(): string | null;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string | null;"
      },
      {
        "name": "color",
        "kind": "getter",
        "static": false,
        "signature": "public get color(): number | null;"
      },
      {
        "name": "hexColor",
        "kind": "getter",
        "static": false,
        "signature": "public get hexColor(): string | null;"
      },
      {
        "name": "timestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get timestamp(): string | null;"
      },
      {
        "name": "thumbnail",
        "kind": "getter",
        "static": false,
        "signature": "public get thumbnail(): EmbedAssetData | null;"
      },
      {
        "name": "image",
        "kind": "getter",
        "static": false,
        "signature": "public get image(): EmbedAssetData | null;"
      },
      {
        "name": "author",
        "kind": "getter",
        "static": false,
        "signature": "public get author(): EmbedAuthorData | null;"
      },
      {
        "name": "provider",
        "kind": "getter",
        "static": false,
        "signature": "public get provider(): APIEmbedProvider | null;"
      },
      {
        "name": "video",
        "kind": "getter",
        "static": false,
        "signature": "public get video(): EmbedAssetData | null;"
      },
      {
        "name": "length",
        "kind": "getter",
        "static": false,
        "signature": "public get length(): number;"
      }
    ]
  },
  "MappedChannelCategoryTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "[ChannelType.GuildAnnouncement]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildAnnouncement]: NewsChannel;"
      },
      {
        "name": "[ChannelType.GuildVoice]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildVoice]: VoiceChannel;"
      },
      {
        "name": "[ChannelType.GuildText]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildText]: TextChannel;"
      },
      {
        "name": "[ChannelType.GuildStageVoice]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildStageVoice]: StageChannel;"
      },
      {
        "name": "[ChannelType.GuildForum]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildForum]: ForumChannel;"
      },
      {
        "name": "[ChannelType.GuildMedia]",
        "kind": "property",
        "static": false,
        "signature": "[ChannelType.GuildMedia]: MediaChannel;"
      }
    ]
  },
  "CategoryChannel": {
    "kind": "class",
    "extends": [
      "GuildChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "children",
        "kind": "getter",
        "static": false,
        "signature": "public get children(): CategoryChannelChildManager;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildCategory;"
      },
      {
        "name": "parent",
        "kind": "getter",
        "static": false,
        "signature": "public get parent(): null;"
      },
      {
        "name": "parentId",
        "kind": "property",
        "static": false,
        "signature": "public parentId: null;"
      }
    ]
  },
  "ChannelFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<ChannelFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<ChannelFlagsString, ChannelFlags>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof ChannelFlags;"
      }
    ]
  },
  "BaseChannel": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data?: RawChannelData, immediatePatch?: boolean);"
    ],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<this>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<this>;"
      },
      {
        "name": "isThread",
        "static": false,
        "signature": "public isThread(): this is AnyThreadChannel;"
      },
      {
        "name": "isTextBased",
        "static": false,
        "signature": "public isTextBased(): this is TextBasedChannel;"
      },
      {
        "name": "isDMBased",
        "static": false,
        "signature": "public isDMBased(): this is PartialGroupDMChannel | DMChannel | PartialDMChannel;"
      },
      {
        "name": "isVoiceBased",
        "static": false,
        "signature": "public isVoiceBased(): this is VoiceBasedChannel;"
      },
      {
        "name": "isThreadOnly",
        "static": false,
        "signature": "public isThreadOnly(): this is ThreadOnlyChannel;"
      },
      {
        "name": "isSendable",
        "static": false,
        "signature": "public isSendable(): this is SendableChannels;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): ChannelMention | UserMention;"
      }
    ],
    "properties": [
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ChannelFlagsBitField> | null;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: Readonly<PermissionsBitField> | null;"
      },
      {
        "name": "appPermissions",
        "kind": "property",
        "static": false,
        "signature": "public appPermissions: Readonly<PermissionsBitField> | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      }
    ]
  },
  "AsyncEventIterator": {
    "kind": "interface",
    "extends": [
      "AsyncIterableIterator<Params>",
      "AsyncEventIteratorDisposability"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "[Symbol.asyncIterator]",
        "static": false,
        "signature": "[Symbol.asyncIterator](): AsyncEventIterator<Params>;"
      }
    ],
    "properties": []
  },
  "Client": {
    "kind": "class",
    "extends": [
      "BaseClient"
    ],
    "implements": [],
    "constructors": [
      "public constructor(options: ClientOptions);"
    ],
    "methods": [
      {
        "name": "once",
        "static": true,
        "signature": "public static once<Emitter extends EventEmitter, Event extends keyof ClientEvents>( eventEmitter: Emitter, eventName: Emitter extends Client ? Event : string | symbol, options?: { signal?: AbortSignal | undefined }, ): Promise<Emitter extends Client ? ClientEvents[Event] : any[]>;"
      },
      {
        "name": "on",
        "static": true,
        "signature": "public static on<Emitter extends EventEmitter, Event extends keyof ClientEvents>( eventEmitter: Emitter, eventName: Emitter extends Client ? Event : string | symbol, options?: { signal?: AbortSignal | undefined }, ): AsyncEventIterator<Emitter extends Client ? ClientEvents[Event] : any[]>;"
      },
      {
        "name": "destroy",
        "static": false,
        "signature": "public destroy(): Promise<void>;"
      },
      {
        "name": "deleteWebhook",
        "static": false,
        "signature": "public deleteWebhook(id: Snowflake, options?: WebhookDeleteOptions): Promise<void>;"
      },
      {
        "name": "fetchGuildPreview",
        "static": false,
        "signature": "public fetchGuildPreview(guild: GuildResolvable): Promise<GuildPreview>;"
      },
      {
        "name": "fetchInvite",
        "static": false,
        "signature": "public fetchInvite(invite: InviteResolvable, options?: ClientFetchInviteOptions): Promise<Invite>;"
      },
      {
        "name": "fetchGuildTemplate",
        "static": false,
        "signature": "public fetchGuildTemplate(template: GuildTemplateResolvable): Promise<GuildTemplate>;"
      },
      {
        "name": "fetchVoiceRegions",
        "static": false,
        "signature": "public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;"
      },
      {
        "name": "fetchSticker",
        "static": false,
        "signature": "public fetchSticker(id: Snowflake): Promise<Sticker>;"
      },
      {
        "name": "fetchStickerPacks",
        "static": false,
        "signature": "public fetchStickerPacks(options: { packId: Snowflake }): Promise<StickerPack>;"
      },
      {
        "name": "fetchStickerPacks",
        "static": false,
        "signature": "public fetchStickerPacks(options?: StickerPackFetchOptions): Promise<Collection<Snowflake, StickerPack>>;"
      },
      {
        "name": "fetchPremiumStickerPacks",
        "static": false,
        "signature": "public fetchPremiumStickerPacks(): ReturnType<Client['fetchStickerPacks']>;"
      },
      {
        "name": "fetchWebhook",
        "static": false,
        "signature": "public fetchWebhook(id: Snowflake, token?: string): Promise<Webhook>;"
      },
      {
        "name": "fetchGuildWidget",
        "static": false,
        "signature": "public fetchGuildWidget(guild: GuildResolvable): Promise<Widget>;"
      },
      {
        "name": "generateInvite",
        "static": false,
        "signature": "public generateInvite(options?: InviteGenerationOptions): string;"
      },
      {
        "name": "login",
        "static": false,
        "signature": "public login(token?: string): Promise<string>;"
      },
      {
        "name": "isReady",
        "static": false,
        "signature": "public isReady(): this is Client<true>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => void): this;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on<Event extends string | symbol>( event: Exclude<Event, keyof ClientEvents>, listener: (...args: any[]) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once<Event extends string | symbol>( event: Exclude<Event, keyof ClientEvents>, listener: (...args: any[]) => void, ): this;"
      },
      {
        "name": "emit",
        "static": false,
        "signature": "public emit<Event extends keyof ClientEvents>(event: Event, ...args: ClientEvents[Event]): boolean;"
      },
      {
        "name": "emit",
        "static": false,
        "signature": "public emit<Event extends string | symbol>(event: Exclude<Event, keyof ClientEvents>, ...args: unknown[]): boolean;"
      },
      {
        "name": "off",
        "static": false,
        "signature": "public off<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => void): this;"
      },
      {
        "name": "off",
        "static": false,
        "signature": "public off<Event extends string | symbol>( event: Exclude<Event, keyof ClientEvents>, listener: (...args: any[]) => void, ): this;"
      },
      {
        "name": "removeAllListeners",
        "static": false,
        "signature": "public removeAllListeners<Event extends keyof ClientEvents>(event?: Event): this;"
      },
      {
        "name": "removeAllListeners",
        "static": false,
        "signature": "public removeAllListeners<Event extends string | symbol>(event?: Exclude<Event, keyof ClientEvents>): this;"
      }
    ],
    "properties": [
      {
        "name": "application",
        "kind": "property",
        "static": false,
        "signature": "public application: If<Ready, ClientApplication>;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "public channels: ChannelManager;"
      },
      {
        "name": "emojis",
        "kind": "getter",
        "static": false,
        "signature": "public get emojis(): BaseGuildEmojiManager;"
      },
      {
        "name": "guilds",
        "kind": "property",
        "static": false,
        "signature": "public guilds: GuildManager;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit<ClientOptions, 'intents'> & { intents: IntentsBitField };"
      },
      {
        "name": "readyAt",
        "kind": "getter",
        "static": false,
        "signature": "public get readyAt(): If<Ready, Date>;"
      },
      {
        "name": "readyTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public readyTimestamp: If<Ready, number>;"
      },
      {
        "name": "sweepers",
        "kind": "property",
        "static": false,
        "signature": "public sweepers: Sweepers;"
      },
      {
        "name": "shard",
        "kind": "property",
        "static": false,
        "signature": "public shard: ShardClientUtil | null;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public token: If<Ready, string, string | null>;"
      },
      {
        "name": "uptime",
        "kind": "getter",
        "static": false,
        "signature": "public get uptime(): If<Ready, number>;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: If<Ready, ClientUser>;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: UserManager;"
      },
      {
        "name": "voice",
        "kind": "property",
        "static": false,
        "signature": "public voice: ClientVoiceManager;"
      },
      {
        "name": "ws",
        "kind": "property",
        "static": false,
        "signature": "public ws: WebSocketManager;"
      }
    ]
  },
  "StickerPackFetchOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "packId",
        "kind": "property",
        "static": false,
        "signature": "packId?: Snowflake;"
      }
    ]
  },
  "ClientApplication": {
    "kind": "class",
    "extends": [
      "Application"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: ClientApplicationEditOptions): Promise<ClientApplication>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<ClientApplication>;"
      },
      {
        "name": "fetchActivityInstance",
        "static": false,
        "signature": "public fetchActivityInstance(instanceId: string): Promise<ActivityInstance>;"
      },
      {
        "name": "fetchRoleConnectionMetadataRecords",
        "static": false,
        "signature": "public fetchRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnectionMetadata[]>;"
      },
      {
        "name": "fetchSKUs",
        "static": false,
        "signature": "public fetchSKUs(): Promise<Collection<Snowflake, SKU>>;"
      },
      {
        "name": "editRoleConnectionMetadataRecords",
        "static": false,
        "signature": "public editRoleConnectionMetadataRecords( records: readonly ApplicationRoleConnectionMetadataEditOptions[], ): Promise<ApplicationRoleConnectionMetadata[]>;"
      }
    ],
    "properties": [
      {
        "name": "botPublic",
        "kind": "property",
        "static": false,
        "signature": "public botPublic: boolean | null;"
      },
      {
        "name": "botRequireCodeGrant",
        "kind": "property",
        "static": false,
        "signature": "public botRequireCodeGrant: boolean | null;"
      },
      {
        "name": "bot",
        "kind": "property",
        "static": false,
        "signature": "public bot: User | null;"
      },
      {
        "name": "commands",
        "kind": "property",
        "static": false,
        "signature": "public commands: ApplicationCommandManager;"
      },
      {
        "name": "emojis",
        "kind": "property",
        "static": false,
        "signature": "public emojis: ApplicationEmojiManager;"
      },
      {
        "name": "entitlements",
        "kind": "property",
        "static": false,
        "signature": "public entitlements: EntitlementManager;"
      },
      {
        "name": "subscriptions",
        "kind": "property",
        "static": false,
        "signature": "public subscriptions: SubscriptionManager;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ApplicationFlagsBitField>;"
      },
      {
        "name": "approximateGuildCount",
        "kind": "property",
        "static": false,
        "signature": "public approximateGuildCount: number | null;"
      },
      {
        "name": "approximateUserInstallCount",
        "kind": "property",
        "static": false,
        "signature": "public approximateUserInstallCount: number | null;"
      },
      {
        "name": "approximateUserAuthorizationCount",
        "kind": "property",
        "static": false,
        "signature": "public approximateUserAuthorizationCount: number | null;"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "public tags: string[];"
      },
      {
        "name": "installParams",
        "kind": "property",
        "static": false,
        "signature": "public installParams: ClientApplicationInstallParams | null;"
      },
      {
        "name": "integrationTypesConfig",
        "kind": "property",
        "static": false,
        "signature": "public integrationTypesConfig: IntegrationTypesConfiguration | null;"
      },
      {
        "name": "customInstallURL",
        "kind": "property",
        "static": false,
        "signature": "public customInstallURL: string | null;"
      },
      {
        "name": "owner",
        "kind": "property",
        "static": false,
        "signature": "public owner: User | Team | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): boolean;"
      },
      {
        "name": "interactionsEndpointURL",
        "kind": "property",
        "static": false,
        "signature": "public interactionsEndpointURL: string | null;"
      },
      {
        "name": "eventWebhooksURL",
        "kind": "property",
        "static": false,
        "signature": "public eventWebhooksURL: string | null;"
      },
      {
        "name": "eventWebhooksStatus",
        "kind": "property",
        "static": false,
        "signature": "public eventWebhooksStatus: ApplicationWebhookEventStatus | null;"
      },
      {
        "name": "eventWebhooksTypes",
        "kind": "property",
        "static": false,
        "signature": "public eventWebhooksTypes: ApplicationWebhookEventType[] | null;"
      },
      {
        "name": "roleConnectionsVerificationURL",
        "kind": "property",
        "static": false,
        "signature": "public roleConnectionsVerificationURL: string | null;"
      }
    ]
  },
  "ClientPresence": {
    "kind": "class",
    "extends": [
      "Presence"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "set",
        "static": false,
        "signature": "public set(presence: PresenceData): ClientPresence;"
      }
    ],
    "properties": []
  },
  "ClientUser": {
    "kind": "class",
    "extends": [
      "User"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: ClientUserEditOptions): Promise<this>;"
      },
      {
        "name": "setActivity",
        "static": false,
        "signature": "public setActivity(options?: ActivityOptions): ClientPresence;"
      },
      {
        "name": "setActivity",
        "static": false,
        "signature": "public setActivity(name: string, options?: Omit<ActivityOptions, 'name'>): ClientPresence;"
      },
      {
        "name": "setAFK",
        "static": false,
        "signature": "public setAFK(afk?: boolean, shardId?: number | readonly number[]): ClientPresence;"
      },
      {
        "name": "setAvatar",
        "static": false,
        "signature": "public setAvatar(avatar: BufferResolvable | Base64Resolvable | null): Promise<this>;"
      },
      {
        "name": "setBanner",
        "static": false,
        "signature": "public setBanner(banner: BufferResolvable | Base64Resolvable | null): Promise<this>;"
      },
      {
        "name": "setPresence",
        "static": false,
        "signature": "public setPresence(data: PresenceData): ClientPresence;"
      },
      {
        "name": "setStatus",
        "static": false,
        "signature": "public setStatus(status: PresenceStatusData, shardId?: number | readonly number[]): ClientPresence;"
      },
      {
        "name": "setUsername",
        "static": false,
        "signature": "public setUsername(username: string): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "mfaEnabled",
        "kind": "property",
        "static": false,
        "signature": "public mfaEnabled: boolean;"
      },
      {
        "name": "presence",
        "kind": "getter",
        "static": false,
        "signature": "public get presence(): ClientPresence;"
      },
      {
        "name": "verified",
        "kind": "property",
        "static": false,
        "signature": "public verified: boolean;"
      }
    ]
  },
  "Options": {
    "kind": "class",
    "extends": [
      "null"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createDefault",
        "static": true,
        "signature": "public static createDefault(): ClientOptions;"
      },
      {
        "name": "cacheWithLimits",
        "static": true,
        "signature": "public static cacheWithLimits(settings?: CacheWithLimitsOptions): CacheFactory;"
      },
      {
        "name": "cacheEverything",
        "static": true,
        "signature": "public static cacheEverything(): CacheFactory;"
      }
    ],
    "properties": [
      {
        "name": "DefaultMakeCacheSettings",
        "kind": "getter",
        "static": true,
        "signature": "public static get DefaultMakeCacheSettings(): CacheWithLimitsOptions;"
      },
      {
        "name": "DefaultSweeperSettings",
        "kind": "getter",
        "static": true,
        "signature": "public static get DefaultSweeperSettings(): SweeperOptions;"
      }
    ]
  },
  "ClientVoiceManager": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "adapters",
        "kind": "property",
        "static": false,
        "signature": "public adapters: Map<Snowflake, InternalDiscordGatewayAdapterLibraryMethods>;"
      }
    ]
  },
  "ContainerComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components: readonly ComponentType[];"
      },
      {
        "name": "accentColor",
        "kind": "property",
        "static": false,
        "signature": "accentColor?: number;"
      },
      {
        "name": "spoiler",
        "kind": "property",
        "static": false,
        "signature": "spoiler?: boolean;"
      }
    ]
  },
  "ContainerComponent": {
    "kind": "class",
    "extends": [
      "Component<APIContainerComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "accentColor",
        "kind": "getter",
        "static": false,
        "signature": "public get accentColor(): number;"
      },
      {
        "name": "hexAccentColor",
        "kind": "getter",
        "static": false,
        "signature": "public get hexAccentColor(): HexColorString;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public readonly components: ComponentInContainer[];"
      }
    ]
  },
  "CollectorEventTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "collect",
        "kind": "property",
        "static": false,
        "signature": "collect: [Value, ...Extras];"
      },
      {
        "name": "ignore",
        "kind": "property",
        "static": false,
        "signature": "ignore: [Value, ...Extras];"
      },
      {
        "name": "dispose",
        "kind": "property",
        "static": false,
        "signature": "dispose: [Value, ...Extras];"
      },
      {
        "name": "end",
        "kind": "property",
        "static": false,
        "signature": "end: [collected: ReadonlyCollection<Key, Value>, reason: string];"
      }
    ]
  },
  "Collector": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "checkEnd",
        "static": false,
        "signature": "public checkEnd(): boolean;"
      },
      {
        "name": "handleCollect",
        "static": false,
        "signature": "public handleCollect(...args: unknown[]): Promise<void>;"
      },
      {
        "name": "handleDispose",
        "static": false,
        "signature": "public handleDispose(...args: unknown[]): Promise<void>;"
      },
      {
        "name": "stop",
        "static": false,
        "signature": "public stop(reason?: string): void;"
      },
      {
        "name": "resetTimer",
        "static": false,
        "signature": "public resetTimer(options?: CollectorResetTimerOptions): void;"
      },
      {
        "name": "[Symbol.asyncIterator]",
        "static": false,
        "signature": "public [Symbol.asyncIterator](): AsyncIterableIterator<[Value, ...Extras]>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "collect",
        "static": false,
        "signature": "public abstract collect(...args: unknown[]): Awaitable<Key | null>;"
      },
      {
        "name": "dispose",
        "static": false,
        "signature": "public abstract dispose(...args: unknown[]): Key | null;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on<EventKey extends keyof CollectorEventTypes<Key, Value, Extras>>( event: EventKey, listener: (...args: CollectorEventTypes<Key, Value, Extras>[EventKey]) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once<EventKey extends keyof CollectorEventTypes<Key, Value, Extras>>( event: EventKey, listener: (...args: CollectorEventTypes<Key, Value, Extras>[EventKey]) => void, ): this;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "collected",
        "kind": "property",
        "static": false,
        "signature": "public collected: Collection<Key, Value>;"
      },
      {
        "name": "lastCollectedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public lastCollectedTimestamp: number | null;"
      },
      {
        "name": "lastCollectedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get lastCollectedAt(): Date | null;"
      },
      {
        "name": "ended",
        "kind": "property",
        "static": false,
        "signature": "public ended: boolean;"
      },
      {
        "name": "endReason",
        "kind": "getter",
        "static": false,
        "signature": "public get endReason(): string | null;"
      },
      {
        "name": "filter",
        "kind": "property",
        "static": false,
        "signature": "public filter: CollectorFilter<[Value, ...Extras]>;"
      },
      {
        "name": "next",
        "kind": "getter",
        "static": false,
        "signature": "public get next(): Promise<Value>;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: CollectorOptions<[Value, ...Extras]>;"
      }
    ]
  },
  "ChatInputCommandInteraction": {
    "kind": "class",
    "extends": [
      "CommandInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is ChatInputCommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is ChatInputCommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is ChatInputCommandInteraction<'raw'>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.ChatInput;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit<CommandInteractionOptionResolver<Cached>, 'getMessage' | 'getFocused'>;"
      }
    ]
  },
  "AutocompleteInteraction": {
    "kind": "class",
    "extends": [
      "BaseInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is AutocompleteInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is AutocompleteInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is AutocompleteInteraction<'raw'>;"
      },
      {
        "name": "respond",
        "static": false,
        "signature": "public respond(options: readonly ApplicationCommandOptionChoiceData[]): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType.ApplicationCommandAutocomplete;"
      },
      {
        "name": "command",
        "kind": "getter",
        "static": false,
        "signature": "public get command(): ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "commandId",
        "kind": "property",
        "static": false,
        "signature": "public commandId: Snowflake;"
      },
      {
        "name": "commandName",
        "kind": "property",
        "static": false,
        "signature": "public commandName: string;"
      },
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.ChatInput;"
      },
      {
        "name": "commandGuildId",
        "kind": "property",
        "static": false,
        "signature": "public commandGuildId: Snowflake | null;"
      },
      {
        "name": "responded",
        "kind": "property",
        "static": false,
        "signature": "public responded: boolean;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit< CommandInteractionOptionResolver<Cached>, 'getMessage' | 'getUser' | 'getAttachment' | 'getChannel' | 'getMember' | 'getMentionable' | 'getRole' >;"
      }
    ]
  },
  "CommandInteractionOptionResolver": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "get",
        "static": false,
        "signature": "public get(name: string, required: true): CommandInteractionOption<Cached>;"
      },
      {
        "name": "get",
        "static": false,
        "signature": "public get(name: string, required?: boolean): CommandInteractionOption<Cached> | null;"
      },
      {
        "name": "getSubcommand",
        "static": false,
        "signature": "public getSubcommand(required?: true): string;"
      },
      {
        "name": "getSubcommand",
        "static": false,
        "signature": "public getSubcommand(required: boolean): string | null;"
      },
      {
        "name": "getSubcommandGroup",
        "static": false,
        "signature": "public getSubcommandGroup(required: true): string;"
      },
      {
        "name": "getSubcommandGroup",
        "static": false,
        "signature": "public getSubcommandGroup(required?: boolean): string | null;"
      },
      {
        "name": "getBoolean",
        "static": false,
        "signature": "public getBoolean(name: string, required: true): boolean;"
      },
      {
        "name": "getBoolean",
        "static": false,
        "signature": "public getBoolean(name: string, required?: boolean): boolean | null;"
      },
      {
        "name": "getChannel",
        "static": false,
        "signature": "public getChannel<const Type extends ChannelType = ChannelType>( name: string, required: true, channelTypes?: readonly Type[], ): Extract< NonNullable<CommandInteractionOption<Cached>['channel']>, { type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread ? ChannelType.PublicThread | ChannelType.AnnouncementThread : Type; } >;"
      },
      {
        "name": "getChannel",
        "static": false,
        "signature": "public getChannel<const Type extends ChannelType = ChannelType>( name: string, required?: boolean, channelTypes?: readonly Type[], ): Extract< NonNullable<CommandInteractionOption<Cached>['channel']>, { type: Type extends ChannelType.PublicThread | ChannelType.AnnouncementThread ? ChannelType.PublicThread | ChannelType.AnnouncementThread : Type; } > | null;"
      },
      {
        "name": "getString",
        "static": false,
        "signature": "public getString(name: string, required: true): string;"
      },
      {
        "name": "getString",
        "static": false,
        "signature": "public getString(name: string, required?: boolean): string | null;"
      },
      {
        "name": "getInteger",
        "static": false,
        "signature": "public getInteger(name: string, required: true): number;"
      },
      {
        "name": "getInteger",
        "static": false,
        "signature": "public getInteger(name: string, required?: boolean): number | null;"
      },
      {
        "name": "getNumber",
        "static": false,
        "signature": "public getNumber(name: string, required: true): number;"
      },
      {
        "name": "getNumber",
        "static": false,
        "signature": "public getNumber(name: string, required?: boolean): number | null;"
      },
      {
        "name": "getUser",
        "static": false,
        "signature": "public getUser(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['user']>;"
      },
      {
        "name": "getUser",
        "static": false,
        "signature": "public getUser(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['user']> | null;"
      },
      {
        "name": "getMember",
        "static": false,
        "signature": "public getMember(name: string): NonNullable<CommandInteractionOption<Cached>['member']> | null;"
      },
      {
        "name": "getRole",
        "static": false,
        "signature": "public getRole(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['role']>;"
      },
      {
        "name": "getRole",
        "static": false,
        "signature": "public getRole(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['role']> | null;"
      },
      {
        "name": "getAttachment",
        "static": false,
        "signature": "public getAttachment(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['attachment']>;"
      },
      {
        "name": "getAttachment",
        "static": false,
        "signature": "public getAttachment( name: string, required?: boolean, ): NonNullable<CommandInteractionOption<Cached>['attachment']> | null;"
      },
      {
        "name": "getMentionable",
        "static": false,
        "signature": "public getMentionable( name: string, required: true, ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']>;"
      },
      {
        "name": "getMentionable",
        "static": false,
        "signature": "public getMentionable( name: string, required?: boolean, ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']> | null;"
      },
      {
        "name": "getMessage",
        "static": false,
        "signature": "public getMessage(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['message']>;"
      },
      {
        "name": "getMessage",
        "static": false,
        "signature": "public getMessage(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['message']> | null;"
      },
      {
        "name": "getFocused",
        "static": false,
        "signature": "public getFocused(getFull: true): AutocompleteFocusedOption;"
      },
      {
        "name": "getFocused",
        "static": false,
        "signature": "public getFocused(getFull?: boolean): string;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "data",
        "kind": "property",
        "static": false,
        "signature": "public readonly data: readonly CommandInteractionOption<Cached>[];"
      },
      {
        "name": "resolved",
        "kind": "property",
        "static": false,
        "signature": "public readonly resolved: Readonly<CommandInteractionResolvedData<Cached>> | null;"
      }
    ]
  },
  "ContextMenuCommandInteraction": {
    "kind": "class",
    "extends": [
      "CommandInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is ContextMenuCommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is ContextMenuCommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is ContextMenuCommandInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit< CommandInteractionOptionResolver<Cached>, | 'getMessage' | 'getFocused' | 'getMentionable' | 'getRole' | 'getUser' | 'getMember' | 'getAttachment' | 'getNumber' | 'getInteger' | 'getString' | 'getChannel' | 'getBoolean' | 'getSubcommandGroup' | 'getSubcommand' >;"
      },
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.Message | ApplicationCommandType.User;"
      },
      {
        "name": "targetId",
        "kind": "property",
        "static": false,
        "signature": "public targetId: Snowflake;"
      }
    ]
  },
  "PrimaryEntryPointCommandInteraction": {
    "kind": "class",
    "extends": [
      "CommandInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is PrimaryEntryPointCommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is PrimaryEntryPointCommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is PrimaryEntryPointCommandInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.PrimaryEntryPoint;"
      }
    ]
  },
  "DMChannel": {
    "kind": "class",
    "extends": [
      "BaseChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<this>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): UserMention;"
      }
    ],
    "properties": [
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ChannelFlagsBitField>;"
      },
      {
        "name": "recipientId",
        "kind": "getter",
        "static": false,
        "signature": "public get recipientId(): Snowflake;"
      },
      {
        "name": "recipientIds",
        "kind": "property",
        "static": false,
        "signature": "public recipientIds: Snowflake[];"
      },
      {
        "name": "recipient",
        "kind": "getter",
        "static": false,
        "signature": "public get recipient(): User | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.DM;"
      }
    ]
  },
  "Emoji": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "imageURL",
        "static": false,
        "signature": "public imageURL(options?: EmojiURLOptions): string | null;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "animated",
        "kind": "property",
        "static": false,
        "signature": "public animated: boolean | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string | null;"
      },
      {
        "name": "identifier",
        "kind": "getter",
        "static": false,
        "signature": "public get identifier(): string;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string | null;"
      }
    ]
  },
  "ApplicationEmojiCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "attachment",
        "kind": "property",
        "static": false,
        "signature": "attachment: BufferResolvable | Base64Resolvable;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "ApplicationEmojiEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      }
    ]
  },
  "ApplicationEmoji": {
    "kind": "class",
    "extends": [
      "Emoji"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "imageURL",
        "static": false,
        "signature": "public imageURL(options?: EmojiURLOptions): string;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<ApplicationEmoji>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: ApplicationEmojiEditOptions): Promise<ApplicationEmoji>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: ApplicationEmoji | unknown): boolean;"
      },
      {
        "name": "fetchAuthor",
        "static": false,
        "signature": "public fetchAuthor(): Promise<User>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string): Promise<ApplicationEmoji>;"
      }
    ],
    "properties": [
      {
        "name": "application",
        "kind": "property",
        "static": false,
        "signature": "public application: ClientApplication;"
      },
      {
        "name": "author",
        "kind": "property",
        "static": false,
        "signature": "public author: User;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "managed",
        "kind": "property",
        "static": false,
        "signature": "public managed: false;"
      },
      {
        "name": "requiresColons",
        "kind": "property",
        "static": false,
        "signature": "public requiresColons: true;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "animated",
        "kind": "property",
        "static": false,
        "signature": "public animated: boolean;"
      },
      {
        "name": "available",
        "kind": "property",
        "static": false,
        "signature": "public available: true;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      }
    ]
  },
  "ApplicationEmojiManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, ApplicationEmoji, EmojiResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: ApplicationEmojiCreateOptions): Promise<ApplicationEmoji>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<ApplicationEmoji>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, ApplicationEmoji>>;"
      },
      {
        "name": "fetchAuthor",
        "static": false,
        "signature": "public fetchAuthor(emoji: EmojiResolvable): Promise<User>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(emoji: EmojiResolvable): Promise<void>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(emoji: EmojiResolvable, options: ApplicationEmojiEditOptions): Promise<ApplicationEmoji>;"
      }
    ],
    "properties": [
      {
        "name": "application",
        "kind": "property",
        "static": false,
        "signature": "public application: ClientApplication;"
      }
    ]
  },
  "Entitlement": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "consume",
        "static": false,
        "signature": "public consume(): Promise<void>;"
      },
      {
        "name": "fetchUser",
        "static": false,
        "signature": "public fetchUser(): Promise<User>;"
      },
      {
        "name": "isActive",
        "static": false,
        "signature": "public isActive(): boolean;"
      },
      {
        "name": "isTest",
        "static": false,
        "signature": "public isTest(): this is this & { startsTimestamp: null; endsTimestamp: null; get startsAt(): null; get endsAt(): null; };"
      },
      {
        "name": "isUserSubscription",
        "static": false,
        "signature": "public isUserSubscription(): this is this & { guildId: null; get guild(): null };"
      },
      {
        "name": "isGuildSubscription",
        "static": false,
        "signature": "public isGuildSubscription(): this is this & { guildId: Snowflake; guild: Guild };"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "skuId",
        "kind": "property",
        "static": false,
        "signature": "public skuId: Snowflake;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public userId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: EntitlementType;"
      },
      {
        "name": "consumed",
        "kind": "property",
        "static": false,
        "signature": "public consumed: boolean;"
      },
      {
        "name": "deleted",
        "kind": "property",
        "static": false,
        "signature": "public deleted: boolean;"
      },
      {
        "name": "startsTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public startsTimestamp: number | null;"
      },
      {
        "name": "endsTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public endsTimestamp: number | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "startsAt",
        "kind": "getter",
        "static": false,
        "signature": "public get startsAt(): Date | null;"
      },
      {
        "name": "endsAt",
        "kind": "getter",
        "static": false,
        "signature": "public get endsAt(): Date | null;"
      }
    ]
  },
  "Guild": {
    "kind": "class",
    "extends": [
      "AnonymousGuild"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createTemplate",
        "static": false,
        "signature": "public createTemplate(name: string, description?: string): Promise<GuildTemplate>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<Guild>;"
      },
      {
        "name": "discoverySplashURL",
        "static": false,
        "signature": "public discoverySplashURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: GuildEditOptions): Promise<Guild>;"
      },
      {
        "name": "editOnboarding",
        "static": false,
        "signature": "public editOnboarding(options: GuildOnboardingEditOptions): Promise<GuildOnboarding>;"
      },
      {
        "name": "editWelcomeScreen",
        "static": false,
        "signature": "public editWelcomeScreen(options: WelcomeScreenEditOptions): Promise<WelcomeScreen>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(guild: Guild): boolean;"
      },
      {
        "name": "fetchAuditLogs",
        "static": false,
        "signature": "public fetchAuditLogs<Event extends GuildAuditLogsResolvable = AuditLogEvent>( options?: GuildAuditLogsFetchOptions<Event>, ): Promise<GuildAuditLogs<Event extends null ? AuditLogEvent : Event>>;"
      },
      {
        "name": "fetchIntegrations",
        "static": false,
        "signature": "public fetchIntegrations(): Promise<Collection<Snowflake | string, Integration>>;"
      },
      {
        "name": "fetchOnboarding",
        "static": false,
        "signature": "public fetchOnboarding(): Promise<GuildOnboarding>;"
      },
      {
        "name": "fetchOwner",
        "static": false,
        "signature": "public fetchOwner(options?: BaseFetchOptions): Promise<GuildMember>;"
      },
      {
        "name": "fetchPreview",
        "static": false,
        "signature": "public fetchPreview(): Promise<GuildPreview>;"
      },
      {
        "name": "fetchTemplates",
        "static": false,
        "signature": "public fetchTemplates(): Promise<Collection<GuildTemplate['code'], GuildTemplate>>;"
      },
      {
        "name": "fetchVanityData",
        "static": false,
        "signature": "public fetchVanityData(): Promise<Vanity>;"
      },
      {
        "name": "fetchWebhooks",
        "static": false,
        "signature": "public fetchWebhooks(): Promise<Collection<Snowflake, Webhook<WebhookType.ChannelFollower | WebhookType.Incoming>>>;"
      },
      {
        "name": "fetchWelcomeScreen",
        "static": false,
        "signature": "public fetchWelcomeScreen(): Promise<WelcomeScreen>;"
      },
      {
        "name": "fetchWidget",
        "static": false,
        "signature": "public fetchWidget(): Promise<Widget>;"
      },
      {
        "name": "fetchWidgetSettings",
        "static": false,
        "signature": "public fetchWidgetSettings(): Promise<GuildWidgetSettings>;"
      },
      {
        "name": "widgetImageURL",
        "static": false,
        "signature": "public widgetImageURL(style?: GuildWidgetStyle): string;"
      },
      {
        "name": "leave",
        "static": false,
        "signature": "public leave(): Promise<Guild>;"
      },
      {
        "name": "disableInvites",
        "static": false,
        "signature": "public disableInvites(disabled?: boolean): Promise<Guild>;"
      },
      {
        "name": "setIncidentActions",
        "static": false,
        "signature": "public setIncidentActions(incidentActions: IncidentActionsEditOptions): Promise<IncidentActions>;"
      },
      {
        "name": "setAFKChannel",
        "static": false,
        "signature": "public setAFKChannel(afkChannel: VoiceChannelResolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setAFKTimeout",
        "static": false,
        "signature": "public setAFKTimeout(afkTimeout: number, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setBanner",
        "static": false,
        "signature": "public setBanner(banner: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setDefaultMessageNotifications",
        "static": false,
        "signature": "public setDefaultMessageNotifications( defaultMessageNotifications: GuildDefaultMessageNotifications | null, reason?: string, ): Promise<Guild>;"
      },
      {
        "name": "setDiscoverySplash",
        "static": false,
        "signature": "public setDiscoverySplash( discoverySplash: BufferResolvable | Base64Resolvable | null, reason?: string, ): Promise<Guild>;"
      },
      {
        "name": "setExplicitContentFilter",
        "static": false,
        "signature": "public setExplicitContentFilter( explicitContentFilter: GuildExplicitContentFilter | null, reason?: string, ): Promise<Guild>;"
      },
      {
        "name": "setIcon",
        "static": false,
        "signature": "public setIcon(icon: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setOwner",
        "static": false,
        "signature": "public setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setPreferredLocale",
        "static": false,
        "signature": "public setPreferredLocale(preferredLocale: Locale | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setPublicUpdatesChannel",
        "static": false,
        "signature": "public setPublicUpdatesChannel(publicUpdatesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setRulesChannel",
        "static": false,
        "signature": "public setRulesChannel(rulesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setSafetyAlertsChannel",
        "static": false,
        "signature": "public setSafetyAlertsChannel(safetyAlertsChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setSplash",
        "static": false,
        "signature": "public setSplash(splash: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setSystemChannel",
        "static": false,
        "signature": "public setSystemChannel(systemChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setSystemChannelFlags",
        "static": false,
        "signature": "public setSystemChannelFlags(systemChannelFlags: SystemChannelFlagsResolvable, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setVerificationLevel",
        "static": false,
        "signature": "public setVerificationLevel(verificationLevel: GuildVerificationLevel | null, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setPremiumProgressBarEnabled",
        "static": false,
        "signature": "public setPremiumProgressBarEnabled(enabled?: boolean, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setWidgetSettings",
        "static": false,
        "signature": "public setWidgetSettings(settings: GuildWidgetSettingsData, reason?: string): Promise<Guild>;"
      },
      {
        "name": "setMFALevel",
        "static": false,
        "signature": "public setMFALevel(level: GuildMFALevel, reason?: string): Promise<Guild>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "afkChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get afkChannel(): VoiceChannel | null;"
      },
      {
        "name": "afkChannelId",
        "kind": "property",
        "static": false,
        "signature": "public afkChannelId: Snowflake | null;"
      },
      {
        "name": "afkTimeout",
        "kind": "property",
        "static": false,
        "signature": "public afkTimeout: number;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake | null;"
      },
      {
        "name": "maxVideoChannelUsers",
        "kind": "property",
        "static": false,
        "signature": "public maxVideoChannelUsers: number | null;"
      },
      {
        "name": "approximateMemberCount",
        "kind": "property",
        "static": false,
        "signature": "public approximateMemberCount: number | null;"
      },
      {
        "name": "approximatePresenceCount",
        "kind": "property",
        "static": false,
        "signature": "public approximatePresenceCount: number | null;"
      },
      {
        "name": "autoModerationRules",
        "kind": "property",
        "static": false,
        "signature": "public autoModerationRules: AutoModerationRuleManager;"
      },
      {
        "name": "available",
        "kind": "property",
        "static": false,
        "signature": "public available: boolean;"
      },
      {
        "name": "bans",
        "kind": "property",
        "static": false,
        "signature": "public bans: GuildBanManager;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "public channels: GuildChannelManager;"
      },
      {
        "name": "commands",
        "kind": "property",
        "static": false,
        "signature": "public commands: GuildApplicationCommandManager;"
      },
      {
        "name": "defaultMessageNotifications",
        "kind": "property",
        "static": false,
        "signature": "public defaultMessageNotifications: GuildDefaultMessageNotifications;"
      },
      {
        "name": "discoverySplash",
        "kind": "property",
        "static": false,
        "signature": "public discoverySplash: string | null;"
      },
      {
        "name": "emojis",
        "kind": "property",
        "static": false,
        "signature": "public emojis: GuildEmojiManager;"
      },
      {
        "name": "explicitContentFilter",
        "kind": "property",
        "static": false,
        "signature": "public explicitContentFilter: GuildExplicitContentFilter;"
      },
      {
        "name": "invites",
        "kind": "property",
        "static": false,
        "signature": "public invites: GuildInviteManager;"
      },
      {
        "name": "joinedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get joinedAt(): Date;"
      },
      {
        "name": "joinedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public joinedTimestamp: number;"
      },
      {
        "name": "large",
        "kind": "property",
        "static": false,
        "signature": "public large: boolean;"
      },
      {
        "name": "maximumMembers",
        "kind": "property",
        "static": false,
        "signature": "public maximumMembers: number | null;"
      },
      {
        "name": "maximumPresences",
        "kind": "property",
        "static": false,
        "signature": "public maximumPresences: number | null;"
      },
      {
        "name": "maxStageVideoChannelUsers",
        "kind": "property",
        "static": false,
        "signature": "public maxStageVideoChannelUsers: number | null;"
      },
      {
        "name": "memberCount",
        "kind": "property",
        "static": false,
        "signature": "public memberCount: number;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: GuildMemberManager;"
      },
      {
        "name": "mfaLevel",
        "kind": "property",
        "static": false,
        "signature": "public mfaLevel: GuildMFALevel;"
      },
      {
        "name": "ownerId",
        "kind": "property",
        "static": false,
        "signature": "public ownerId: Snowflake;"
      },
      {
        "name": "preferredLocale",
        "kind": "property",
        "static": false,
        "signature": "public preferredLocale: Locale;"
      },
      {
        "name": "premiumProgressBarEnabled",
        "kind": "property",
        "static": false,
        "signature": "public premiumProgressBarEnabled: boolean;"
      },
      {
        "name": "premiumTier",
        "kind": "property",
        "static": false,
        "signature": "public premiumTier: GuildPremiumTier;"
      },
      {
        "name": "presences",
        "kind": "property",
        "static": false,
        "signature": "public presences: PresenceManager;"
      },
      {
        "name": "publicUpdatesChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get publicUpdatesChannel(): TextChannel | null;"
      },
      {
        "name": "publicUpdatesChannelId",
        "kind": "property",
        "static": false,
        "signature": "public publicUpdatesChannelId: Snowflake | null;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: RoleManager;"
      },
      {
        "name": "rulesChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get rulesChannel(): TextChannel | null;"
      },
      {
        "name": "rulesChannelId",
        "kind": "property",
        "static": false,
        "signature": "public rulesChannelId: Snowflake | null;"
      },
      {
        "name": "safetyAlertsChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get safetyAlertsChannel(): TextChannel | null;"
      },
      {
        "name": "safetyAlertsChannelId",
        "kind": "property",
        "static": false,
        "signature": "public safetyAlertsChannelId: Snowflake | null;"
      },
      {
        "name": "scheduledEvents",
        "kind": "property",
        "static": false,
        "signature": "public scheduledEvents: GuildScheduledEventManager;"
      },
      {
        "name": "shard",
        "kind": "getter",
        "static": false,
        "signature": "public get shard(): WebSocketShard;"
      },
      {
        "name": "shardId",
        "kind": "property",
        "static": false,
        "signature": "public shardId: number;"
      },
      {
        "name": "soundboardSounds",
        "kind": "property",
        "static": false,
        "signature": "public soundboardSounds: GuildSoundboardSoundManager;"
      },
      {
        "name": "stageInstances",
        "kind": "property",
        "static": false,
        "signature": "public stageInstances: StageInstanceManager;"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "public stickers: GuildStickerManager;"
      },
      {
        "name": "incidentsData",
        "kind": "property",
        "static": false,
        "signature": "public incidentsData: IncidentActions | null;"
      },
      {
        "name": "systemChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get systemChannel(): TextChannel | null;"
      },
      {
        "name": "systemChannelFlags",
        "kind": "property",
        "static": false,
        "signature": "public systemChannelFlags: Readonly<SystemChannelFlagsBitField>;"
      },
      {
        "name": "systemChannelId",
        "kind": "property",
        "static": false,
        "signature": "public systemChannelId: Snowflake | null;"
      },
      {
        "name": "vanityURLUses",
        "kind": "property",
        "static": false,
        "signature": "public vanityURLUses: number | null;"
      },
      {
        "name": "voiceAdapterCreator",
        "kind": "getter",
        "static": false,
        "signature": "public get voiceAdapterCreator(): InternalDiscordGatewayAdapterCreator;"
      },
      {
        "name": "voiceStates",
        "kind": "property",
        "static": false,
        "signature": "public voiceStates: VoiceStateManager;"
      },
      {
        "name": "widgetChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get widgetChannel(): TextChannel | NewsChannel | VoiceBasedChannel | ForumChannel | MediaChannel | null;"
      },
      {
        "name": "widgetChannelId",
        "kind": "property",
        "static": false,
        "signature": "public widgetChannelId: Snowflake | null;"
      },
      {
        "name": "widgetEnabled",
        "kind": "property",
        "static": false,
        "signature": "public widgetEnabled: boolean | null;"
      },
      {
        "name": "maximumBitrate",
        "kind": "getter",
        "static": false,
        "signature": "public get maximumBitrate(): number;"
      },
      {
        "name": "maximumStageBitrate",
        "kind": "getter",
        "static": false,
        "signature": "public get maximumStageBitrate(): number;"
      }
    ]
  },
  "FileComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "file",
        "kind": "property",
        "static": false,
        "signature": "file: UnfurledMediaItemData;"
      },
      {
        "name": "spoiler",
        "kind": "property",
        "static": false,
        "signature": "spoiler?: boolean;"
      }
    ]
  },
  "FileComponent": {
    "kind": "class",
    "extends": [
      "Component<APIFileComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "file",
        "kind": "property",
        "static": false,
        "signature": "public readonly file: UnfurledMediaItem;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      }
    ]
  },
  "GuildAuditLogs": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "entries",
        "kind": "property",
        "static": false,
        "signature": "public entries: Collection<Snowflake, GuildAuditLogsEntry<Event>>;"
      }
    ]
  },
  "GuildAuditLogsEntry": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "actionType",
        "static": true,
        "signature": "public static actionType(action: AuditLogEvent): GuildAuditLogsActionType;"
      },
      {
        "name": "targetType",
        "static": true,
        "signature": "public static targetType(target: AuditLogEvent): GuildAuditLogsTargetType;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "Targets",
        "kind": "property",
        "static": true,
        "signature": "public static Targets: GuildAuditLogsTargets;"
      },
      {
        "name": "action",
        "kind": "property",
        "static": false,
        "signature": "public action: TAction;"
      },
      {
        "name": "actionType",
        "kind": "property",
        "static": false,
        "signature": "public actionType: TActionType;"
      },
      {
        "name": "changes",
        "kind": "property",
        "static": false,
        "signature": "public changes: AuditLogChange[];"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "executorId",
        "kind": "property",
        "static": false,
        "signature": "public executorId: Snowflake | null;"
      },
      {
        "name": "executor",
        "kind": "property",
        "static": false,
        "signature": "public executor: User | PartialUser | null;"
      },
      {
        "name": "extra",
        "kind": "property",
        "static": false,
        "signature": "public extra: TAction extends keyof GuildAuditLogsEntryExtraField ? GuildAuditLogsEntryExtraField[TAction] : null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "public reason: string | null;"
      },
      {
        "name": "targetId",
        "kind": "property",
        "static": false,
        "signature": "public targetId: Snowflake | null;"
      },
      {
        "name": "target",
        "kind": "property",
        "static": false,
        "signature": "public target: TTargetType extends keyof GuildAuditLogsEntryTargetField<TAction> ? GuildAuditLogsEntryTargetField<TAction>[TTargetType] : { id: Snowflake | undefined; [x: string]: unknown } | null;"
      },
      {
        "name": "targetType",
        "kind": "property",
        "static": false,
        "signature": "public targetType: TTargetType;"
      }
    ]
  },
  "GuildBan": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<GuildBan>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "public reason?: string | null;"
      }
    ]
  },
  "GuildChannel": {
    "kind": "class",
    "extends": [
      "BaseChannel"
    ],
    "implements": [],
    "constructors": [
      "public constructor(guild: Guild, data?: RawGuildChannelData, client?: Client<true>, immediatePatch?: boolean);"
    ],
    "methods": [
      {
        "name": "clone",
        "static": false,
        "signature": "public clone(options?: GuildChannelCloneOptions): Promise<this>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<this>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: GuildChannelEditOptions): Promise<this>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(channel: GuildChannel): boolean;"
      },
      {
        "name": "lockPermissions",
        "static": false,
        "signature": "public lockPermissions(): Promise<this>;"
      },
      {
        "name": "permissionsFor",
        "static": false,
        "signature": "public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<PermissionsBitField>;"
      },
      {
        "name": "permissionsFor",
        "static": false,
        "signature": "public permissionsFor( memberOrRole: GuildMemberResolvable | RoleResolvable, checkAdmin?: boolean, ): Readonly<PermissionsBitField> | null;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<this>;"
      },
      {
        "name": "setParent",
        "static": false,
        "signature": "public setParent(channel: CategoryChannelResolvable | null, options?: SetParentOptions): Promise<this>;"
      },
      {
        "name": "setPosition",
        "static": false,
        "signature": "public setPosition(position: number, options?: SetChannelPositionOptions): Promise<this>;"
      },
      {
        "name": "isTextBased",
        "static": false,
        "signature": "public isTextBased(): this is GuildBasedChannel & TextBasedChannel;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): ChannelMention;"
      }
    ],
    "properties": [
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "deletable",
        "kind": "getter",
        "static": false,
        "signature": "public get deletable(): boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ChannelFlagsBitField>;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "manageable",
        "kind": "getter",
        "static": false,
        "signature": "public get manageable(): boolean;"
      },
      {
        "name": "members",
        "kind": "getter",
        "static": false,
        "signature": "public get members(): Collection<Snowflake, GuildMember>;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "parent",
        "kind": "getter",
        "static": false,
        "signature": "public get parent(): CategoryChannel | null;"
      },
      {
        "name": "parentId",
        "kind": "property",
        "static": false,
        "signature": "public parentId: Snowflake | null;"
      },
      {
        "name": "permissionOverwrites",
        "kind": "property",
        "static": false,
        "signature": "public permissionOverwrites: PermissionOverwriteManager;"
      },
      {
        "name": "permissionsLocked",
        "kind": "getter",
        "static": false,
        "signature": "public get permissionsLocked(): boolean | null;"
      },
      {
        "name": "position",
        "kind": "getter",
        "static": false,
        "signature": "public get position(): number;"
      },
      {
        "name": "rawPosition",
        "kind": "property",
        "static": false,
        "signature": "public rawPosition: number;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: GuildChannelTypes;"
      },
      {
        "name": "viewable",
        "kind": "getter",
        "static": false,
        "signature": "public get viewable(): boolean;"
      }
    ]
  },
  "GuildEmoji": {
    "kind": "class",
    "extends": [
      "BaseGuildEmoji"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<GuildEmoji>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: GuildEmojiEditOptions): Promise<GuildEmoji>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: GuildEmoji | unknown): boolean;"
      },
      {
        "name": "fetchAuthor",
        "static": false,
        "signature": "public fetchAuthor(): Promise<User>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<GuildEmoji>;"
      }
    ],
    "properties": [
      {
        "name": "deletable",
        "kind": "getter",
        "static": false,
        "signature": "public get deletable(): boolean;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "author",
        "kind": "property",
        "static": false,
        "signature": "public author: User | null;"
      },
      {
        "name": "roles",
        "kind": "getter",
        "static": false,
        "signature": "public get roles(): GuildEmojiRoleManager;"
      }
    ]
  },
  "GuildMemberFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<GuildMemberFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<GuildMemberFlagsString, GuildMemberFlags>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: GuildMemberFlags;"
      }
    ]
  },
  "GuildMember": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "avatarURL",
        "static": false,
        "signature": "public avatarURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "avatarDecorationURL",
        "static": false,
        "signature": "public avatarDecorationURL(): string | null;"
      },
      {
        "name": "bannerURL",
        "static": false,
        "signature": "public bannerURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "ban",
        "static": false,
        "signature": "public ban(options?: BanOptions): Promise<GuildMember>;"
      },
      {
        "name": "disableCommunicationUntil",
        "static": false,
        "signature": "public disableCommunicationUntil(timeout: DateResolvable | null, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "timeout",
        "static": false,
        "signature": "public timeout(timeout: number | null, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<GuildMember>;"
      },
      {
        "name": "createDM",
        "static": false,
        "signature": "public createDM(force?: boolean): Promise<DMChannel>;"
      },
      {
        "name": "deleteDM",
        "static": false,
        "signature": "public deleteDM(): Promise<DMChannel>;"
      },
      {
        "name": "displayAvatarURL",
        "static": false,
        "signature": "public displayAvatarURL(options?: ImageURLOptions): string;"
      },
      {
        "name": "displayBannerURL",
        "static": false,
        "signature": "public displayBannerURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "displayAvatarDecorationURL",
        "static": false,
        "signature": "public displayAvatarDecorationURL(): string | null;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: GuildMemberEditOptions): Promise<GuildMember>;"
      },
      {
        "name": "isCommunicationDisabled",
        "static": false,
        "signature": "public isCommunicationDisabled(): this is GuildMember & { communicationDisabledUntilTimestamp: number; readonly communicationDisabledUntil: Date; };"
      },
      {
        "name": "kick",
        "static": false,
        "signature": "public kick(reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "permissionsIn",
        "static": false,
        "signature": "public permissionsIn(channel: GuildChannelResolvable): Readonly<PermissionsBitField>;"
      },
      {
        "name": "setFlags",
        "static": false,
        "signature": "public setFlags(flags: GuildMemberFlagsResolvable, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "setNickname",
        "static": false,
        "signature": "public setNickname(nickname: string | null, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): UserMention;"
      },
      {
        "name": "valueOf",
        "static": false,
        "signature": "public valueOf(): string;"
      }
    ],
    "properties": [
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "public avatar: string | null;"
      },
      {
        "name": "avatarDecorationData",
        "kind": "property",
        "static": false,
        "signature": "public avatarDecorationData: AvatarDecorationData | null;"
      },
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "public banner: string | null;"
      },
      {
        "name": "bannable",
        "kind": "getter",
        "static": false,
        "signature": "public get bannable(): boolean;"
      },
      {
        "name": "collectibles",
        "kind": "property",
        "static": false,
        "signature": "public collectibles: Collectibles | null;"
      },
      {
        "name": "dmChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get dmChannel(): DMChannel | null;"
      },
      {
        "name": "displayColor",
        "kind": "getter",
        "static": false,
        "signature": "public get displayColor(): number;"
      },
      {
        "name": "displayHexColor",
        "kind": "getter",
        "static": false,
        "signature": "public get displayHexColor(): HexColorString;"
      },
      {
        "name": "displayName",
        "kind": "getter",
        "static": false,
        "signature": "public get displayName(): string;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "id",
        "kind": "getter",
        "static": false,
        "signature": "public get id(): Snowflake;"
      },
      {
        "name": "pending",
        "kind": "property",
        "static": false,
        "signature": "public pending: boolean;"
      },
      {
        "name": "communicationDisabledUntil",
        "kind": "getter",
        "static": false,
        "signature": "public get communicationDisabledUntil(): Date | null;"
      },
      {
        "name": "communicationDisabledUntilTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public communicationDisabledUntilTimestamp: number | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<GuildMemberFlagsBitField>;"
      },
      {
        "name": "joinedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get joinedAt(): Date | null;"
      },
      {
        "name": "joinedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public joinedTimestamp: number | null;"
      },
      {
        "name": "kickable",
        "kind": "getter",
        "static": false,
        "signature": "public get kickable(): boolean;"
      },
      {
        "name": "manageable",
        "kind": "getter",
        "static": false,
        "signature": "public get manageable(): boolean;"
      },
      {
        "name": "moderatable",
        "kind": "getter",
        "static": false,
        "signature": "public get moderatable(): boolean;"
      },
      {
        "name": "nickname",
        "kind": "property",
        "static": false,
        "signature": "public nickname: string | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      },
      {
        "name": "permissions",
        "kind": "getter",
        "static": false,
        "signature": "public get permissions(): Readonly<PermissionsBitField>;"
      },
      {
        "name": "premiumSince",
        "kind": "getter",
        "static": false,
        "signature": "public get premiumSince(): Date | null;"
      },
      {
        "name": "premiumSinceTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public premiumSinceTimestamp: number | null;"
      },
      {
        "name": "presence",
        "kind": "getter",
        "static": false,
        "signature": "public get presence(): Presence | null;"
      },
      {
        "name": "roles",
        "kind": "getter",
        "static": false,
        "signature": "public get roles(): GuildMemberRoleManager;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User;"
      },
      {
        "name": "voice",
        "kind": "getter",
        "static": false,
        "signature": "public get voice(): VoiceState;"
      }
    ]
  },
  "GuildOnboarding": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "prompts",
        "kind": "property",
        "static": false,
        "signature": "public prompts: Collection<Snowflake, GuildOnboardingPrompt>;"
      },
      {
        "name": "defaultChannels",
        "kind": "property",
        "static": false,
        "signature": "public defaultChannels: Collection<Snowflake, GuildChannel>;"
      },
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "public enabled: boolean;"
      },
      {
        "name": "mode",
        "kind": "property",
        "static": false,
        "signature": "public mode: GuildOnboardingMode;"
      }
    ]
  },
  "GuildOnboardingPrompt": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Collection<Snowflake, GuildOnboardingPromptOption>;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "public title: string;"
      },
      {
        "name": "singleSelect",
        "kind": "property",
        "static": false,
        "signature": "public singleSelect: boolean;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "public required: boolean;"
      },
      {
        "name": "inOnboarding",
        "kind": "property",
        "static": false,
        "signature": "public inOnboarding: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: GuildOnboardingPromptType;"
      }
    ]
  },
  "GuildOnboardingPromptOption": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): Emoji | GuildEmoji | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "public channels: Collection<Snowflake, GuildChannel>;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Collection<Snowflake, Role>;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "public title: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      }
    ]
  },
  "GuildPreview": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "discoverySplashURL",
        "static": false,
        "signature": "public discoverySplashURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "splashURL",
        "static": false,
        "signature": "public splashURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<GuildPreview>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "approximateMemberCount",
        "kind": "property",
        "static": false,
        "signature": "public approximateMemberCount: number;"
      },
      {
        "name": "approximatePresenceCount",
        "kind": "property",
        "static": false,
        "signature": "public approximatePresenceCount: number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "discoverySplash",
        "kind": "property",
        "static": false,
        "signature": "public discoverySplash: string | null;"
      },
      {
        "name": "emojis",
        "kind": "property",
        "static": false,
        "signature": "public emojis: Collection<Snowflake, GuildPreviewEmoji>;"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "public stickers: Collection<Snowflake, Sticker>;"
      },
      {
        "name": "features",
        "kind": "property",
        "static": false,
        "signature": "public features: `${GuildFeature}`[];"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "splash",
        "kind": "property",
        "static": false,
        "signature": "public splash: string | null;"
      }
    ]
  },
  "GuildScheduledEvent": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "coverImageURL",
        "static": false,
        "signature": "public coverImageURL(options?: Readonly<BaseImageURLOptions>): string | null;"
      },
      {
        "name": "createInviteURL",
        "static": false,
        "signature": "public createInviteURL(options?: GuildScheduledEventInviteURLCreateOptions): Promise<string>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit<AcceptableStatus extends GuildScheduledEventSetStatusArg<Status>>( options: GuildScheduledEventEditOptions<Status, AcceptableStatus>, ): Promise<GuildScheduledEvent<AcceptableStatus>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "setScheduledStartTime",
        "static": false,
        "signature": "public setScheduledStartTime( scheduledStartTime: DateResolvable, reason?: string, ): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "setScheduledEndTime",
        "static": false,
        "signature": "public setScheduledEndTime(scheduledEndTime: DateResolvable, reason?: string): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "setDescription",
        "static": false,
        "signature": "public setDescription(description: string, reason?: string): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "setStatus",
        "static": false,
        "signature": "public setStatus<AcceptableStatus extends GuildScheduledEventSetStatusArg<Status>>( status: AcceptableStatus, reason?: string, ): Promise<GuildScheduledEvent<AcceptableStatus>>;"
      },
      {
        "name": "setLocation",
        "static": false,
        "signature": "public setLocation(location: string, reason?: string): Promise<GuildScheduledEvent<Status>>;"
      },
      {
        "name": "fetchSubscribers",
        "static": false,
        "signature": "public fetchSubscribers<Options extends FetchGuildScheduledEventSubscribersOptions>( options?: Options, ): Promise<GuildScheduledEventManagerFetchSubscribersResult<Options>>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      },
      {
        "name": "isActive",
        "static": false,
        "signature": "public isActive(): this is GuildScheduledEvent<GuildScheduledEventStatus.Active>;"
      },
      {
        "name": "isCanceled",
        "static": false,
        "signature": "public isCanceled(): this is GuildScheduledEvent<GuildScheduledEventStatus.Canceled>;"
      },
      {
        "name": "isCompleted",
        "static": false,
        "signature": "public isCompleted(): this is GuildScheduledEvent<GuildScheduledEventStatus.Completed>;"
      },
      {
        "name": "isScheduled",
        "static": false,
        "signature": "public isScheduled(): this is GuildScheduledEvent<GuildScheduledEventStatus.Scheduled>;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "creatorId",
        "kind": "property",
        "static": false,
        "signature": "public creatorId: Snowflake | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "scheduledStartTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public scheduledStartTimestamp: number | null;"
      },
      {
        "name": "scheduledEndTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public scheduledEndTimestamp: number | null;"
      },
      {
        "name": "privacyLevel",
        "kind": "property",
        "static": false,
        "signature": "public privacyLevel: GuildScheduledEventPrivacyLevel;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: Status;"
      },
      {
        "name": "entityType",
        "kind": "property",
        "static": false,
        "signature": "public entityType: GuildScheduledEventEntityType;"
      },
      {
        "name": "entityId",
        "kind": "property",
        "static": false,
        "signature": "public entityId: Snowflake | null;"
      },
      {
        "name": "entityMetadata",
        "kind": "property",
        "static": false,
        "signature": "public entityMetadata: GuildScheduledEventEntityMetadata | null;"
      },
      {
        "name": "userCount",
        "kind": "property",
        "static": false,
        "signature": "public userCount: number | null;"
      },
      {
        "name": "creator",
        "kind": "property",
        "static": false,
        "signature": "public creator: User | null;"
      },
      {
        "name": "recurrenceRule",
        "kind": "property",
        "static": false,
        "signature": "public recurrenceRule: GuildScheduledEventRecurrenceRule | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "scheduledStartAt",
        "kind": "getter",
        "static": false,
        "signature": "public get scheduledStartAt(): Date | null;"
      },
      {
        "name": "scheduledEndAt",
        "kind": "getter",
        "static": false,
        "signature": "public get scheduledEndAt(): Date | null;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): VoiceChannel | StageChannel | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      },
      {
        "name": "image",
        "kind": "property",
        "static": false,
        "signature": "public image: string | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      }
    ]
  },
  "GuildScheduledEventRecurrenceRule": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "startTimestamp",
        "kind": "property",
        "static": false,
        "signature": "startTimestamp: number;"
      },
      {
        "name": "startAt",
        "kind": "getter",
        "static": false,
        "signature": "get startAt(): Date;"
      },
      {
        "name": "endTimestamp",
        "kind": "property",
        "static": false,
        "signature": "endTimestamp: number | null;"
      },
      {
        "name": "endAt",
        "kind": "getter",
        "static": false,
        "signature": "get endAt(): Date | null;"
      },
      {
        "name": "frequency",
        "kind": "property",
        "static": false,
        "signature": "frequency: GuildScheduledEventRecurrenceRuleFrequency;"
      },
      {
        "name": "interval",
        "kind": "property",
        "static": false,
        "signature": "interval: number;"
      },
      {
        "name": "byWeekday",
        "kind": "property",
        "static": false,
        "signature": "byWeekday: readonly GuildScheduledEventRecurrenceRuleWeekday[] | null;"
      },
      {
        "name": "byNWeekday",
        "kind": "property",
        "static": false,
        "signature": "byNWeekday: readonly GuildScheduledEventRecurrenceRuleNWeekday[] | null;"
      },
      {
        "name": "byMonth",
        "kind": "property",
        "static": false,
        "signature": "byMonth: readonly GuildScheduledEventRecurrenceRuleMonth[] | null;"
      },
      {
        "name": "byMonthDay",
        "kind": "property",
        "static": false,
        "signature": "byMonthDay: readonly number[] | null;"
      },
      {
        "name": "byYearDay",
        "kind": "property",
        "static": false,
        "signature": "byYearDay: readonly number[] | null;"
      },
      {
        "name": "count",
        "kind": "property",
        "static": false,
        "signature": "count: number | null;"
      }
    ]
  },
  "GuildScheduledEventRecurrenceRuleNWeekday": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "n",
        "kind": "property",
        "static": false,
        "signature": "n: number;"
      },
      {
        "name": "day",
        "kind": "property",
        "static": false,
        "signature": "day: GuildScheduledEventRecurrenceRuleWeekday;"
      }
    ]
  },
  "GuildTemplate": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createGuild",
        "static": false,
        "signature": "public createGuild(name: string, icon?: BufferResolvable | Base64Resolvable): Promise<Guild>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<GuildTemplate>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options?: GuildTemplateEditOptions): Promise<GuildTemplate>;"
      },
      {
        "name": "sync",
        "static": false,
        "signature": "public sync(): Promise<GuildTemplate>;"
      }
    ],
    "properties": [
      {
        "name": "createdTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public createdTimestamp: number;"
      },
      {
        "name": "updatedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public updatedTimestamp: number;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      },
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "public code: string;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "usageCount",
        "kind": "property",
        "static": false,
        "signature": "public usageCount: number;"
      },
      {
        "name": "creator",
        "kind": "property",
        "static": false,
        "signature": "public creator: User;"
      },
      {
        "name": "creatorId",
        "kind": "property",
        "static": false,
        "signature": "public creatorId: Snowflake;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "updatedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get updatedAt(): Date;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "serializedGuild",
        "kind": "property",
        "static": false,
        "signature": "public serializedGuild: APITemplateSerializedSourceGuild;"
      },
      {
        "name": "unSynced",
        "kind": "property",
        "static": false,
        "signature": "public unSynced: boolean | null;"
      },
      {
        "name": "GuildTemplatesPattern",
        "kind": "property",
        "static": true,
        "signature": "public static GuildTemplatesPattern: RegExp;"
      }
    ]
  },
  "GuildPreviewEmoji": {
    "kind": "class",
    "extends": [
      "BaseGuildEmoji"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: GuildPreview;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Snowflake[];"
      }
    ]
  },
  "Integration": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<Integration>;"
      }
    ],
    "properties": [
      {
        "name": "account",
        "kind": "property",
        "static": false,
        "signature": "public account: IntegrationAccount;"
      },
      {
        "name": "application",
        "kind": "property",
        "static": false,
        "signature": "public application: IntegrationApplication | null;"
      },
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "public enabled: boolean | null;"
      },
      {
        "name": "expireBehavior",
        "kind": "property",
        "static": false,
        "signature": "public expireBehavior: IntegrationExpireBehavior | null;"
      },
      {
        "name": "expireGracePeriod",
        "kind": "property",
        "static": false,
        "signature": "public expireGracePeriod: number | null;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake | string;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "role",
        "kind": "property",
        "static": false,
        "signature": "public role: Role | null;"
      },
      {
        "name": "enableEmoticons",
        "kind": "property",
        "static": false,
        "signature": "public enableEmoticons: boolean | null;"
      },
      {
        "name": "roles",
        "kind": "getter",
        "static": false,
        "signature": "public get roles(): Collection<Snowflake, Role>;"
      },
      {
        "name": "scopes",
        "kind": "property",
        "static": false,
        "signature": "public scopes: OAuth2Scopes[];"
      },
      {
        "name": "syncedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get syncedAt(): Date | null;"
      },
      {
        "name": "syncedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public syncedTimestamp: number | null;"
      },
      {
        "name": "syncing",
        "kind": "property",
        "static": false,
        "signature": "public syncing: boolean | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: IntegrationType;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User | null;"
      },
      {
        "name": "subscriberCount",
        "kind": "property",
        "static": false,
        "signature": "public subscriberCount: number | null;"
      },
      {
        "name": "revoked",
        "kind": "property",
        "static": false,
        "signature": "public revoked: boolean | null;"
      }
    ]
  },
  "IntegrationApplication": {
    "kind": "class",
    "extends": [
      "Application"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "bot",
        "kind": "property",
        "static": false,
        "signature": "public bot: User | null;"
      },
      {
        "name": "termsOfServiceURL",
        "kind": "property",
        "static": false,
        "signature": "public termsOfServiceURL: string | null;"
      },
      {
        "name": "privacyPolicyURL",
        "kind": "property",
        "static": false,
        "signature": "public privacyPolicyURL: string | null;"
      },
      {
        "name": "rpcOrigins",
        "kind": "property",
        "static": false,
        "signature": "public rpcOrigins: string[];"
      },
      {
        "name": "hook",
        "kind": "property",
        "static": false,
        "signature": "public hook: boolean | null;"
      },
      {
        "name": "cover",
        "kind": "property",
        "static": false,
        "signature": "public cover: string | null;"
      },
      {
        "name": "verifyKey",
        "kind": "property",
        "static": false,
        "signature": "public verifyKey: string | null;"
      }
    ]
  },
  "IntentsBitField": {
    "kind": "class",
    "extends": [
      "BitField<GatewayIntentsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<GatewayIntentsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof GatewayIntentBits;"
      }
    ]
  },
  "BaseInteraction": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is BaseInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is BaseInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is BaseInteraction<'raw'>;"
      },
      {
        "name": "isButton",
        "static": false,
        "signature": "public isButton(): this is ButtonInteraction<Cached>;"
      },
      {
        "name": "isAutocomplete",
        "static": false,
        "signature": "public isAutocomplete(): this is AutocompleteInteraction<Cached>;"
      },
      {
        "name": "isChatInputCommand",
        "static": false,
        "signature": "public isChatInputCommand(): this is ChatInputCommandInteraction<Cached>;"
      },
      {
        "name": "isCommand",
        "static": false,
        "signature": "public isCommand(): this is CommandInteraction<Cached>;"
      },
      {
        "name": "isContextMenuCommand",
        "static": false,
        "signature": "public isContextMenuCommand(): this is ContextMenuCommandInteraction<Cached>;"
      },
      {
        "name": "isPrimaryEntryPointCommand",
        "static": false,
        "signature": "public isPrimaryEntryPointCommand(): this is PrimaryEntryPointCommandInteraction<Cached>;"
      },
      {
        "name": "isMessageComponent",
        "static": false,
        "signature": "public isMessageComponent(): this is MessageComponentInteraction<Cached>;"
      },
      {
        "name": "isMessageContextMenuCommand",
        "static": false,
        "signature": "public isMessageContextMenuCommand(): this is MessageContextMenuCommandInteraction<Cached>;"
      },
      {
        "name": "isModalSubmit",
        "static": false,
        "signature": "public isModalSubmit(): this is ModalSubmitInteraction<Cached>;"
      },
      {
        "name": "isUserContextMenuCommand",
        "static": false,
        "signature": "public isUserContextMenuCommand(): this is UserContextMenuCommandInteraction<Cached>;"
      },
      {
        "name": "isSelectMenu",
        "static": false,
        "signature": "public isSelectMenu(): this is StringSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isAnySelectMenu",
        "static": false,
        "signature": "public isAnySelectMenu(): this is AnySelectMenuInteraction<Cached>;"
      },
      {
        "name": "isStringSelectMenu",
        "static": false,
        "signature": "public isStringSelectMenu(): this is StringSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isUserSelectMenu",
        "static": false,
        "signature": "public isUserSelectMenu(): this is UserSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isRoleSelectMenu",
        "static": false,
        "signature": "public isRoleSelectMenu(): this is RoleSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isMentionableSelectMenu",
        "static": false,
        "signature": "public isMentionableSelectMenu(): this is MentionableSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isChannelSelectMenu",
        "static": false,
        "signature": "public isChannelSelectMenu(): this is ChannelSelectMenuInteraction<Cached>;"
      },
      {
        "name": "isRepliable",
        "static": false,
        "signature": "public isRepliable(): this is RepliableInteraction<Cached>;"
      }
    ],
    "properties": [
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake;"
      },
      {
        "name": "authorizingIntegrationOwners",
        "kind": "property",
        "static": false,
        "signature": "public authorizingIntegrationOwners: AuthorizingIntegrationOwners;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): CacheTypeReducer< Cached, GuildTextBasedChannel | null, GuildTextBasedChannel | null, GuildTextBasedChannel | null, TextBasedChannel | null >;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "context",
        "kind": "property",
        "static": false,
        "signature": "public context: InteractionContextType | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): CacheTypeReducer<Cached, Guild, null>;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: CacheTypeReducer<Cached, Snowflake>;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "member",
        "kind": "property",
        "static": false,
        "signature": "public member: CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember>;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public readonly token: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User;"
      },
      {
        "name": "version",
        "kind": "property",
        "static": false,
        "signature": "public version: number;"
      },
      {
        "name": "appPermissions",
        "kind": "property",
        "static": false,
        "signature": "public appPermissions: Readonly<PermissionsBitField>;"
      },
      {
        "name": "memberPermissions",
        "kind": "property",
        "static": false,
        "signature": "public memberPermissions: CacheTypeReducer<Cached, Readonly<PermissionsBitField>>;"
      },
      {
        "name": "locale",
        "kind": "property",
        "static": false,
        "signature": "public locale: Locale;"
      },
      {
        "name": "guildLocale",
        "kind": "property",
        "static": false,
        "signature": "public guildLocale: CacheTypeReducer<Cached, Locale>;"
      },
      {
        "name": "entitlements",
        "kind": "property",
        "static": false,
        "signature": "public entitlements: Collection<Snowflake, Entitlement>;"
      },
      {
        "name": "attachmentSizeLimit",
        "kind": "property",
        "static": false,
        "signature": "public attachmentSizeLimit: number;"
      }
    ]
  },
  "InteractionCallback": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "activityInstanceId",
        "kind": "property",
        "static": false,
        "signature": "public activityInstanceId: string | null;"
      },
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client<true>;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "responseMessageEphemeral",
        "kind": "property",
        "static": false,
        "signature": "public responseMessageEphemeral: boolean | null;"
      },
      {
        "name": "responseMessageId",
        "kind": "property",
        "static": false,
        "signature": "public responseMessageId: Snowflake | null;"
      },
      {
        "name": "responseMessageLoading",
        "kind": "property",
        "static": false,
        "signature": "public responseMessageLoading: boolean | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType;"
      }
    ]
  },
  "InteractionCallbackResponse": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client<true>;"
      },
      {
        "name": "interaction",
        "kind": "property",
        "static": false,
        "signature": "public interaction: InteractionCallback;"
      },
      {
        "name": "resource",
        "kind": "property",
        "static": false,
        "signature": "public resource: InteractionCallbackResource<InGuild> | null;"
      }
    ]
  },
  "InteractionCallbackResource": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "activityInstance",
        "kind": "property",
        "static": false,
        "signature": "public activityInstance: RESTAPIInteractionCallbackActivityInstanceResource | null;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message<InGuild> | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionResponseType;"
      }
    ]
  },
  "InteractionCollector": {
    "kind": "class",
    "extends": [
      "Collector< Snowflake, Interaction, [Collection<Snowflake, Interaction>] >"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, options?: InteractionCollectorOptions<Interaction>);"
    ],
    "methods": [
      {
        "name": "collect",
        "static": false,
        "signature": "public collect(interaction: Interaction): Snowflake;"
      },
      {
        "name": "empty",
        "static": false,
        "signature": "public empty(): void;"
      },
      {
        "name": "dispose",
        "static": false,
        "signature": "public dispose(interaction: Interaction): Snowflake;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on(event: 'collect' | 'dispose' | 'ignore', listener: (interaction: Interaction) => void): this;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on( event: 'end', listener: (collected: ReadonlyCollection<Snowflake, Interaction>, reason: string) => void, ): this;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on(event: string, listener: (...args: any[]) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once(event: 'collect' | 'dispose' | 'ignore', listener: (interaction: Interaction) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once( event: 'end', listener: (collected: ReadonlyCollection<Snowflake, Interaction>, reason: string) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once(event: string, listener: (...args: any[]) => void): this;"
      }
    ],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "messageInteractionId",
        "kind": "property",
        "static": false,
        "signature": "public messageInteractionId: Snowflake | null;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "interactionType",
        "kind": "property",
        "static": false,
        "signature": "public interactionType: InteractionType | null;"
      },
      {
        "name": "messageId",
        "kind": "property",
        "static": false,
        "signature": "public messageId: Snowflake | null;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: InteractionCollectorOptions<Interaction>;"
      },
      {
        "name": "total",
        "kind": "property",
        "static": false,
        "signature": "public total: number;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Collection<Snowflake, User>;"
      }
    ]
  },
  "InteractionWebhook": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, id: Snowflake, token: string);"
    ],
    "methods": [
      {
        "name": "send",
        "static": false,
        "signature": "public send(options: string | MessagePayload | InteractionReplyOptions): Promise<Message>;"
      },
      {
        "name": "editMessage",
        "static": false,
        "signature": "public editMessage( message: MessageResolvable | '@original', options: string | MessagePayload | WebhookMessageEditOptions, ): Promise<Message>;"
      },
      {
        "name": "fetchMessage",
        "static": false,
        "signature": "public fetchMessage(message: Snowflake | '@original'): Promise<Message>;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client<true>;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public token: string;"
      }
    ]
  },
  "Invite": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<Invite>;"
      },
      {
        "name": "updateTargetUsers",
        "static": false,
        "signature": "public updateTargetUsers(targetUsersFile: BufferResolvable | readonly UserResolvable[]): Promise<void>;"
      },
      {
        "name": "fetchTargetUsersJobStatus",
        "static": false,
        "signature": "public fetchTargetUsersJobStatus(): Promise<TargetUsersJobStatusForInvite>;"
      },
      {
        "name": "fetchTargetUsers",
        "static": false,
        "signature": "public fetchTargetUsers(): Promise<Buffer>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: NonThreadGuildBasedChannel | PartialGroupDMChannel | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Collection<Snowflake, InviteRole | Role> | null;"
      },
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "public code: string;"
      },
      {
        "name": "deletable",
        "kind": "getter",
        "static": false,
        "signature": "public get deletable(): boolean;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public createdTimestamp: number | null;"
      },
      {
        "name": "expiresAt",
        "kind": "getter",
        "static": false,
        "signature": "public get expiresAt(): Date | null;"
      },
      {
        "name": "expiresTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get expiresTimestamp(): number | null;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: InviteGuild | Guild | null;"
      },
      {
        "name": "inviter",
        "kind": "getter",
        "static": false,
        "signature": "public get inviter(): User | null;"
      },
      {
        "name": "inviterId",
        "kind": "property",
        "static": false,
        "signature": "public inviterId: Snowflake | null;"
      },
      {
        "name": "maxAge",
        "kind": "property",
        "static": false,
        "signature": "public maxAge: number | null;"
      },
      {
        "name": "maxUses",
        "kind": "property",
        "static": false,
        "signature": "public maxUses: number | null;"
      },
      {
        "name": "memberCount",
        "kind": "property",
        "static": false,
        "signature": "public memberCount: number | null;"
      },
      {
        "name": "presenceCount",
        "kind": "property",
        "static": false,
        "signature": "public presenceCount: number | null;"
      },
      {
        "name": "targetApplication",
        "kind": "property",
        "static": false,
        "signature": "public targetApplication: IntegrationApplication | null;"
      },
      {
        "name": "targetUser",
        "kind": "property",
        "static": false,
        "signature": "public targetUser: User | null;"
      },
      {
        "name": "targetType",
        "kind": "property",
        "static": false,
        "signature": "public targetType: InviteTargetType | null;"
      },
      {
        "name": "temporary",
        "kind": "property",
        "static": false,
        "signature": "public temporary: boolean | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InviteType;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      },
      {
        "name": "uses",
        "kind": "property",
        "static": false,
        "signature": "public uses: number | null;"
      },
      {
        "name": "InvitesPattern",
        "kind": "property",
        "static": true,
        "signature": "public static InvitesPattern: RegExp;"
      },
      {
        "name": "stageInstance",
        "kind": "property",
        "static": false,
        "signature": "public stageInstance: InviteStageInstance | null;"
      },
      {
        "name": "guildScheduledEvent",
        "kind": "property",
        "static": false,
        "signature": "public guildScheduledEvent: GuildScheduledEvent | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<InviteFlagsBitField>;"
      }
    ]
  },
  "InviteStageInstance": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: Collection<Snowflake, GuildMember>;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "public topic: string;"
      },
      {
        "name": "participantCount",
        "kind": "property",
        "static": false,
        "signature": "public participantCount: number;"
      },
      {
        "name": "speakerCount",
        "kind": "property",
        "static": false,
        "signature": "public speakerCount: number;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): StageChannel | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      }
    ]
  },
  "InviteGuild": {
    "kind": "class",
    "extends": [
      "AnonymousGuild"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "welcomeScreen",
        "kind": "property",
        "static": false,
        "signature": "public welcomeScreen: WelcomeScreen | null;"
      }
    ]
  },
  "InviteFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<InviteFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<InviteFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof InviteFlags;"
      }
    ]
  },
  "LimitedCollection": {
    "kind": "class",
    "extends": [
      "Collection<Key, Value>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(options?: LimitedCollectionOptions<Key, Value>, iterable?: Iterable<readonly [Key, Value]>);"
    ],
    "methods": [],
    "properties": [
      {
        "name": "maxSize",
        "kind": "property",
        "static": false,
        "signature": "public maxSize: number;"
      },
      {
        "name": "keepOverLimit",
        "kind": "property",
        "static": false,
        "signature": "public keepOverLimit: ((value: Value, key: Key, collection: this) => boolean) | null;"
      }
    ]
  },
  "MediaGalleryComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "items",
        "kind": "property",
        "static": false,
        "signature": "items: readonly MediaGalleryItemData[];"
      }
    ]
  },
  "MediaGalleryComponent": {
    "kind": "class",
    "extends": [
      "Component<APIMediaGalleryComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "items",
        "kind": "property",
        "static": false,
        "signature": "public readonly items: MediaGalleryItem[];"
      }
    ]
  },
  "MediaGalleryItemData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "media",
        "kind": "property",
        "static": false,
        "signature": "media: UnfurledMediaItemData;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "spoiler",
        "kind": "property",
        "static": false,
        "signature": "spoiler?: boolean;"
      }
    ]
  },
  "MediaGalleryItem": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "data",
        "kind": "property",
        "static": false,
        "signature": "public readonly data: APIMediaGalleryItem;"
      },
      {
        "name": "media",
        "kind": "property",
        "static": false,
        "signature": "public readonly media: UnfurledMediaItem;"
      },
      {
        "name": "description",
        "kind": "getter",
        "static": false,
        "signature": "public get description(): string | null;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      }
    ]
  },
  "MessageCall": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "endedAt",
        "kind": "getter",
        "static": false,
        "signature": "get endedAt(): Date | null;"
      },
      {
        "name": "endedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "endedTimestamp: number | null;"
      },
      {
        "name": "participants",
        "kind": "property",
        "static": false,
        "signature": "participants: readonly Snowflake[];"
      }
    ]
  },
  "SharedClientTheme": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "baseMix",
        "kind": "property",
        "static": false,
        "signature": "baseMix: number;"
      },
      {
        "name": "baseTheme",
        "kind": "property",
        "static": false,
        "signature": "baseTheme?: BaseThemeType | null;"
      },
      {
        "name": "colors",
        "kind": "property",
        "static": false,
        "signature": "colors: readonly string[];"
      },
      {
        "name": "gradientAngle",
        "kind": "property",
        "static": false,
        "signature": "gradientAngle: number;"
      }
    ]
  },
  "MessageCollectorOptionsParams": {
    "kind": "interface",
    "extends": [
      "MessageComponentCollectorOptions<MappedInteractionTypes<Cached>[ComponentType]>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "componentType?: ComponentType;"
      }
    ]
  },
  "MessageChannelCollectorOptionsParams": {
    "kind": "interface",
    "extends": [
      "MessageChannelComponentCollectorOptions<MappedInteractionTypes<Cached>[ComponentType]>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "componentType?: ComponentType;"
      }
    ]
  },
  "AwaitMessageCollectorOptionsParams": {
    "kind": "interface",
    "extends": [
      "Pick< InteractionCollectorOptions<MappedInteractionTypes<Cached>[ComponentType]>, keyof AwaitMessageComponentOptions<any> >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "componentType?: ComponentType;"
      }
    ]
  },
  "StringMappedInteractionTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "Button",
        "kind": "property",
        "static": false,
        "signature": "Button: ButtonInteraction<Cached>;"
      },
      {
        "name": "StringSelectMenu",
        "kind": "property",
        "static": false,
        "signature": "StringSelectMenu: StringSelectMenuInteraction<Cached>;"
      },
      {
        "name": "UserSelectMenu",
        "kind": "property",
        "static": false,
        "signature": "UserSelectMenu: UserSelectMenuInteraction<Cached>;"
      },
      {
        "name": "RoleSelectMenu",
        "kind": "property",
        "static": false,
        "signature": "RoleSelectMenu: RoleSelectMenuInteraction<Cached>;"
      },
      {
        "name": "MentionableSelectMenu",
        "kind": "property",
        "static": false,
        "signature": "MentionableSelectMenu: MentionableSelectMenuInteraction<Cached>;"
      },
      {
        "name": "ChannelSelectMenu",
        "kind": "property",
        "static": false,
        "signature": "ChannelSelectMenu: ChannelSelectMenuInteraction<Cached>;"
      },
      {
        "name": "ActionRow",
        "kind": "property",
        "static": false,
        "signature": "ActionRow: MessageComponentInteraction<Cached>;"
      }
    ]
  },
  "MappedInteractionTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "[ComponentType.Button]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.Button]: ButtonInteraction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "[ComponentType.StringSelect]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.StringSelect]: StringSelectMenuInteraction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "[ComponentType.UserSelect]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.UserSelect]: UserSelectMenuInteraction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "[ComponentType.RoleSelect]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.RoleSelect]: RoleSelectMenuInteraction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "[ComponentType.MentionableSelect]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.MentionableSelect]: MentionableSelectMenuInteraction<WrapBooleanCache<Cached>>;"
      },
      {
        "name": "[ComponentType.ChannelSelect]",
        "kind": "property",
        "static": false,
        "signature": "[ComponentType.ChannelSelect]: ChannelSelectMenuInteraction<WrapBooleanCache<Cached>>;"
      }
    ]
  },
  "Message": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "awaitMessageComponent",
        "static": false,
        "signature": "public awaitMessageComponent<ComponentType extends MessageComponentType>( options?: AwaitMessageCollectorOptionsParams<ComponentType, InGuild>, ): Promise<MappedInteractionTypes<InGuild>[ComponentType]>;"
      },
      {
        "name": "awaitReactions",
        "static": false,
        "signature": "public awaitReactions(options?: AwaitReactionsOptions): Promise<Collection<Snowflake | string, MessageReaction>>;"
      },
      {
        "name": "createReactionCollector",
        "static": false,
        "signature": "public createReactionCollector(options?: ReactionCollectorOptions): ReactionCollector;"
      },
      {
        "name": "createMessageComponentCollector",
        "static": false,
        "signature": "public createMessageComponentCollector<ComponentType extends MessageComponentType>( options?: MessageCollectorOptionsParams<ComponentType, InGuild>, ): InteractionCollector<MappedInteractionTypes<InGuild>[ComponentType]>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( content: string | MessageEditOptions | MessagePayload, ): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(message: Message, rawData?: APIMessage): boolean;"
      },
      {
        "name": "fetchReference",
        "static": false,
        "signature": "public fetchReference(): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "fetchWebhook",
        "static": false,
        "signature": "public fetchWebhook(): Promise<Webhook>;"
      },
      {
        "name": "crosspost",
        "static": false,
        "signature": "public crosspost(): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "pin",
        "static": false,
        "signature": "public pin(reason?: string): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "react",
        "static": false,
        "signature": "public react(emoji: EmojiIdentifierResolvable): Promise<MessageReaction>;"
      },
      {
        "name": "removeAttachments",
        "static": false,
        "signature": "public removeAttachments(): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: string | MessagePayload | MessageReplyOptions, ): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "forward",
        "static": false,
        "signature": "public forward(channel: Exclude<TextBasedChannelResolvable, PartialGroupDMChannel>): Promise<Message>;"
      },
      {
        "name": "resolveComponent",
        "static": false,
        "signature": "public resolveComponent(customId: string): MessageActionRowComponent | null;"
      },
      {
        "name": "startThread",
        "static": false,
        "signature": "public startThread(options: StartThreadOptions): Promise<PublicThreadChannel<false>>;"
      },
      {
        "name": "suppressEmbeds",
        "static": false,
        "signature": "public suppressEmbeds(suppress?: boolean): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      },
      {
        "name": "unpin",
        "static": false,
        "signature": "public unpin(reason?: string): Promise<OmitPartialGroupDMChannel<Message<InGuild>>>;"
      },
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is Message<true>;"
      }
    ],
    "properties": [
      {
        "name": "activity",
        "kind": "property",
        "static": false,
        "signature": "public activity: MessageActivity | null;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake | null;"
      },
      {
        "name": "attachments",
        "kind": "property",
        "static": false,
        "signature": "public attachments: Collection<Snowflake, Attachment>;"
      },
      {
        "name": "author",
        "kind": "property",
        "static": false,
        "signature": "public author: User;"
      },
      {
        "name": "bulkDeletable",
        "kind": "getter",
        "static": false,
        "signature": "public get bulkDeletable(): boolean;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): If<InGuild, GuildTextBasedChannel, TextBasedChannel>;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "cleanContent",
        "kind": "getter",
        "static": false,
        "signature": "public get cleanContent(): string;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public components: TopLevelComponent[];"
      },
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "public content: string;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public createdTimestamp: number;"
      },
      {
        "name": "crosspostable",
        "kind": "getter",
        "static": false,
        "signature": "public get crosspostable(): boolean;"
      },
      {
        "name": "deletable",
        "kind": "getter",
        "static": false,
        "signature": "public get deletable(): boolean;"
      },
      {
        "name": "editable",
        "kind": "getter",
        "static": false,
        "signature": "public get editable(): boolean;"
      },
      {
        "name": "editedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get editedAt(): Date | null;"
      },
      {
        "name": "editedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public editedTimestamp: number | null;"
      },
      {
        "name": "embeds",
        "kind": "property",
        "static": false,
        "signature": "public embeds: Embed[];"
      },
      {
        "name": "groupActivityApplication",
        "kind": "property",
        "static": false,
        "signature": "public groupActivityApplication: ClientApplication | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: If<InGuild, Snowflake>;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): If<InGuild, Guild>;"
      },
      {
        "name": "hasThread",
        "kind": "getter",
        "static": false,
        "signature": "public get hasThread(): boolean;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "interaction",
        "kind": "property",
        "static": false,
        "signature": "public interaction: MessageInteraction | null;"
      },
      {
        "name": "interactionMetadata",
        "kind": "property",
        "static": false,
        "signature": "public interactionMetadata: MessageInteractionMetadata | null;"
      },
      {
        "name": "member",
        "kind": "getter",
        "static": false,
        "signature": "public get member(): GuildMember | null;"
      },
      {
        "name": "mentions",
        "kind": "property",
        "static": false,
        "signature": "public mentions: MessageMentions<InGuild>;"
      },
      {
        "name": "nonce",
        "kind": "property",
        "static": false,
        "signature": "public nonce: string | number | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      },
      {
        "name": "pinnable",
        "kind": "getter",
        "static": false,
        "signature": "public get pinnable(): boolean;"
      },
      {
        "name": "pinned",
        "kind": "property",
        "static": false,
        "signature": "public pinned: boolean;"
      },
      {
        "name": "reactions",
        "kind": "property",
        "static": false,
        "signature": "public reactions: ReactionManager;"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "public stickers: Collection<Snowflake, Sticker>;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "public position: number | null;"
      },
      {
        "name": "roleSubscriptionData",
        "kind": "property",
        "static": false,
        "signature": "public roleSubscriptionData: RoleSubscriptionData | null;"
      },
      {
        "name": "resolved",
        "kind": "property",
        "static": false,
        "signature": "public resolved: CommandInteractionResolvedData | null;"
      },
      {
        "name": "system",
        "kind": "property",
        "static": false,
        "signature": "public system: boolean;"
      },
      {
        "name": "thread",
        "kind": "getter",
        "static": false,
        "signature": "public get thread(): AnyThreadChannel | null;"
      },
      {
        "name": "tts",
        "kind": "property",
        "static": false,
        "signature": "public tts: boolean;"
      },
      {
        "name": "poll",
        "kind": "property",
        "static": false,
        "signature": "public poll: Poll | null;"
      },
      {
        "name": "call",
        "kind": "property",
        "static": false,
        "signature": "public call: MessageCall | null;"
      },
      {
        "name": "sharedClientTheme",
        "kind": "property",
        "static": false,
        "signature": "public sharedClientTheme: SharedClientTheme | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: MessageType;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      },
      {
        "name": "webhookId",
        "kind": "property",
        "static": false,
        "signature": "public webhookId: Snowflake | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<MessageFlagsBitField>;"
      },
      {
        "name": "reference",
        "kind": "property",
        "static": false,
        "signature": "public reference: MessageReference | null;"
      },
      {
        "name": "messageSnapshots",
        "kind": "property",
        "static": false,
        "signature": "public messageSnapshots: Collection<Snowflake, MessageSnapshot>;"
      }
    ]
  },
  "AuthorizingIntegrationOwners": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): APIAuthorizingIntegrationOwnersMap;"
      }
    ],
    "properties": [
      {
        "name": "[ApplicationIntegrationType.GuildInstall]",
        "kind": "property",
        "static": false,
        "signature": "public readonly [ApplicationIntegrationType.GuildInstall]?: Snowflake;"
      },
      {
        "name": "[ApplicationIntegrationType.UserInstall]",
        "kind": "property",
        "static": false,
        "signature": "public readonly [ApplicationIntegrationType.UserInstall]?: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public readonly guildId: Snowflake | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public readonly userId: Snowflake | null;"
      },
      {
        "name": "user",
        "kind": "getter",
        "static": false,
        "signature": "public get user(): User | null;"
      }
    ]
  },
  "AttachmentBuilder": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(attachment: BufferResolvable | Stream, data?: AttachmentData);"
    ],
    "methods": [
      {
        "name": "setDescription",
        "static": false,
        "signature": "public setDescription(description: string): this;"
      },
      {
        "name": "setFile",
        "static": false,
        "signature": "public setFile(attachment: BufferResolvable | Stream, name?: string): this;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string): this;"
      },
      {
        "name": "setTitle",
        "static": false,
        "signature": "public setTitle(title: string): this;"
      },
      {
        "name": "setWaveform",
        "static": false,
        "signature": "public setWaveform(waveform: string): this;"
      },
      {
        "name": "setDuration",
        "static": false,
        "signature": "public setDuration(duration: number): this;"
      },
      {
        "name": "setSpoiler",
        "static": false,
        "signature": "public setSpoiler(spoiler?: boolean): this;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "from",
        "static": true,
        "signature": "public static from(other: JSONEncodable<AttachmentPayload>): AttachmentBuilder;"
      }
    ],
    "properties": [
      {
        "name": "attachment",
        "kind": "property",
        "static": false,
        "signature": "public attachment: BufferResolvable | Stream;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string | null;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "public title: string | null;"
      },
      {
        "name": "waveform",
        "kind": "property",
        "static": false,
        "signature": "public waveform: string | null;"
      },
      {
        "name": "duration",
        "kind": "property",
        "static": false,
        "signature": "public duration: number | null;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      }
    ]
  },
  "Attachment": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "contentType",
        "kind": "property",
        "static": false,
        "signature": "public contentType: string | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "duration",
        "kind": "property",
        "static": false,
        "signature": "public duration: number | null;"
      },
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "public ephemeral: boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: AttachmentFlagsBitField;"
      },
      {
        "name": "height",
        "kind": "property",
        "static": false,
        "signature": "public height: number | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "proxyURL",
        "kind": "property",
        "static": false,
        "signature": "public proxyURL: string;"
      },
      {
        "name": "size",
        "kind": "property",
        "static": false,
        "signature": "public size: number;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "public title: string | null;"
      },
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "public url: string;"
      },
      {
        "name": "waveform",
        "kind": "property",
        "static": false,
        "signature": "public waveform: string | null;"
      },
      {
        "name": "width",
        "kind": "property",
        "static": false,
        "signature": "public width: number | null;"
      }
    ]
  },
  "AttachmentFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<AttachmentFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<AttachmentFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: Record<AttachmentFlagsString, number>;"
      }
    ]
  },
  "MessageCollector": {
    "kind": "class",
    "extends": [
      "Collector<Snowflake, Message, [Collection<Snowflake, Message>]>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(channel: TextBasedChannel, options?: MessageCollectorOptions);"
    ],
    "methods": [
      {
        "name": "collect",
        "static": false,
        "signature": "public collect(message: Message): Snowflake | null;"
      },
      {
        "name": "dispose",
        "static": false,
        "signature": "public dispose(message: Message): Snowflake | null;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: TextBasedChannel;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: MessageCollectorOptions;"
      },
      {
        "name": "received",
        "kind": "property",
        "static": false,
        "signature": "public received: number;"
      }
    ]
  },
  "MessageComponentInteraction": {
    "kind": "class",
    "extends": [
      "BaseInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is MessageComponentInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is MessageComponentInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is MessageComponentInteraction<'raw'>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { fetchReply: true }, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply(options?: InteractionDeferReplyOptions): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate( options: InteractionDeferUpdateOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate( options: InteractionDeferUpdateOptions & { fetchReply: true }, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate(options?: InteractionDeferUpdateOptions): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deleteReply",
        "static": false,
        "signature": "public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;"
      },
      {
        "name": "editReply",
        "static": false,
        "signature": "public editReply( options: string | MessagePayload | InteractionEditReplyOptions, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "fetchReply",
        "static": false,
        "signature": "public fetchReply(message?: Snowflake | '@original'): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "followUp",
        "static": false,
        "signature": "public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: InteractionReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: string | MessagePayload | InteractionReplyOptions, ): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "update",
        "static": false,
        "signature": "public update( options: InteractionUpdateOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "update",
        "static": false,
        "signature": "public update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "update",
        "static": false,
        "signature": "public update( options?: string | MessagePayload | InteractionUpdateOptions, ): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options: LaunchActivityOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity(options?: LaunchActivityOptions & { withResponse?: false }): Promise<undefined>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options?: LaunchActivityOptions, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>> | undefined>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options: ShowModalOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options?: ShowModalOptions, ): Promise<undefined>;"
      },
      {
        "name": "showModal",
        "static": false,
        "signature": "public showModal( modal: | JSONEncodable<APIModalInteractionResponseCallbackData> | ModalComponentData | APIModalInteractionResponseCallbackData, options?: ShowModalOptions, ): Promise<undefined>;"
      },
      {
        "name": "sendPremiumRequired",
        "static": false,
        "signature": "public sendPremiumRequired(): Promise<void>;"
      },
      {
        "name": "awaitModalSubmit",
        "static": false,
        "signature": "public awaitModalSubmit( options: AwaitModalSubmitOptions<ModalSubmitInteraction>, ): Promise<ModalSubmitInteraction<Cached>>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType.MessageComponent;"
      },
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, MessageActionRowComponent, APIComponentInMessageActionRow, MessageActionRowComponent | APIComponentInMessageActionRow, MessageActionRowComponent | APIComponentInMessageActionRow >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: MessageComponentType;"
      },
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "public customId: string;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "deferred",
        "kind": "property",
        "static": false,
        "signature": "public deferred: boolean;"
      },
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "public ephemeral: boolean | null;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message<BooleanCache<Cached>>;"
      },
      {
        "name": "replied",
        "kind": "property",
        "static": false,
        "signature": "public replied: boolean;"
      },
      {
        "name": "webhook",
        "kind": "property",
        "static": false,
        "signature": "public webhook: InteractionWebhook;"
      }
    ]
  },
  "MessageContextMenuCommandInteraction": {
    "kind": "class",
    "extends": [
      "ContextMenuCommandInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is MessageContextMenuCommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is MessageContextMenuCommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is MessageContextMenuCommandInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.Message;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit< CommandInteractionOptionResolver<Cached>, | 'getFocused' | 'getMentionable' | 'getRole' | 'getUser' | 'getNumber' | 'getAttachment' | 'getInteger' | 'getString' | 'getChannel' | 'getBoolean' | 'getSubcommandGroup' | 'getSubcommand' >;"
      },
      {
        "name": "targetMessage",
        "kind": "getter",
        "static": false,
        "signature": "public get targetMessage(): NonNullable<CommandInteractionOption<Cached>['message']>;"
      }
    ]
  },
  "MessageFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<MessageFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: MessageFlagsResolvable): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof MessageFlags;"
      }
    ]
  },
  "MessageMentions": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "has",
        "static": false,
        "signature": "public has(data: UserResolvable | RoleResolvable | ChannelResolvable, options?: MessageMentionsHasOptions): boolean;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "channels",
        "kind": "getter",
        "static": false,
        "signature": "public get channels(): Collection<Snowflake, Channel>;"
      },
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "everyone",
        "kind": "property",
        "static": false,
        "signature": "public everyone: boolean;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public readonly guild: If<InGuild, Guild>;"
      },
      {
        "name": "members",
        "kind": "getter",
        "static": false,
        "signature": "public get members(): If<InGuild, Collection<Snowflake, GuildMember>>;"
      },
      {
        "name": "parsedUsers",
        "kind": "getter",
        "static": false,
        "signature": "public get parsedUsers(): Collection<Snowflake, User>;"
      },
      {
        "name": "repliedUser",
        "kind": "property",
        "static": false,
        "signature": "public repliedUser: User | null;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Collection<Snowflake, Role>;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Collection<Snowflake, User>;"
      },
      {
        "name": "crosspostedChannels",
        "kind": "property",
        "static": false,
        "signature": "public crosspostedChannels: Collection<Snowflake, CrosspostedChannel>;"
      },
      {
        "name": "ChannelsPattern",
        "kind": "property",
        "static": true,
        "signature": "public static ChannelsPattern: typeof FormattingPatterns.Channel;"
      },
      {
        "name": "EveryonePattern",
        "kind": "property",
        "static": true,
        "signature": "public static EveryonePattern: RegExp;"
      },
      {
        "name": "RolesPattern",
        "kind": "property",
        "static": true,
        "signature": "public static RolesPattern: typeof FormattingPatterns.Role;"
      },
      {
        "name": "UsersPattern",
        "kind": "property",
        "static": true,
        "signature": "public static UsersPattern: typeof FormattingPatterns.User;"
      }
    ]
  },
  "MessagePayload": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(target: MessageTarget, options: MessagePayloadOption);"
    ],
    "methods": [
      {
        "name": "create",
        "static": true,
        "signature": "public static create( target: MessageTarget, options: string | MessagePayloadOption, extra?: MessagePayloadOption, ): MessagePayload;"
      },
      {
        "name": "resolveFile",
        "static": true,
        "signature": "public static resolveFile( fileLike: BufferResolvable | Stream | AttachmentPayload | JSONEncodable<AttachmentPayload>, ): Promise<RawFile>;"
      },
      {
        "name": "makeContent",
        "static": false,
        "signature": "public makeContent(): string | undefined;"
      },
      {
        "name": "resolveBody",
        "static": false,
        "signature": "public resolveBody(): this;"
      },
      {
        "name": "resolveFiles",
        "static": false,
        "signature": "public resolveFiles(): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "body",
        "kind": "property",
        "static": false,
        "signature": "public body: RawMessagePayloadData | null;"
      },
      {
        "name": "isUser",
        "kind": "getter",
        "static": false,
        "signature": "public get isUser(): boolean;"
      },
      {
        "name": "isWebhook",
        "kind": "getter",
        "static": false,
        "signature": "public get isWebhook(): boolean;"
      },
      {
        "name": "isMessage",
        "kind": "getter",
        "static": false,
        "signature": "public get isMessage(): boolean;"
      },
      {
        "name": "isMessageManager",
        "kind": "getter",
        "static": false,
        "signature": "public get isMessageManager(): boolean;"
      },
      {
        "name": "isInteraction",
        "kind": "getter",
        "static": false,
        "signature": "public get isInteraction(): boolean;"
      },
      {
        "name": "files",
        "kind": "property",
        "static": false,
        "signature": "public files: RawFile[] | null;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: MessagePayloadOption;"
      },
      {
        "name": "target",
        "kind": "property",
        "static": false,
        "signature": "public target: MessageTarget;"
      }
    ]
  },
  "MessageReaction": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "react",
        "static": false,
        "signature": "public react(): Promise<MessageReaction>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(): Promise<MessageReaction>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<MessageReaction>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "valueOf",
        "static": false,
        "signature": "public valueOf(): Snowflake | string;"
      }
    ],
    "properties": [
      {
        "name": "burstColors",
        "kind": "property",
        "static": false,
        "signature": "public burstColors: string[] | null;"
      },
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client<true>;"
      },
      {
        "name": "count",
        "kind": "property",
        "static": false,
        "signature": "public count: number;"
      },
      {
        "name": "countDetails",
        "kind": "property",
        "static": false,
        "signature": "public countDetails: ReactionCountDetailsData;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): GuildEmoji | ReactionEmoji | ApplicationEmoji;"
      },
      {
        "name": "me",
        "kind": "property",
        "static": false,
        "signature": "public me: boolean;"
      },
      {
        "name": "meBurst",
        "kind": "property",
        "static": false,
        "signature": "public meBurst: boolean;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message | PartialMessage;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: ReactionUserManager;"
      }
    ]
  },
  "MessageReactionEventDetails": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ReactionType;"
      },
      {
        "name": "burst",
        "kind": "property",
        "static": false,
        "signature": "burst: boolean;"
      }
    ]
  },
  "ModalComponentData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title: string;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components: readonly ( | JSONEncodable<APIActionRowComponent<APIComponentInModalActionRow> | APILabelComponent> | ActionRowData<ModalActionRowComponentData> | LabelComponentData | TextDisplayComponentData )[];"
      }
    ]
  },
  "BaseModalData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: number;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: Type;"
      }
    ]
  },
  "TextInputModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.TextInput>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "SelectMenuModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData< | ComponentType.ChannelSelect | ComponentType.MentionableSelect | ComponentType.RoleSelect | ComponentType.StringSelect | ComponentType.UserSelect >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "channels?: ReadonlyCollection< Snowflake, CacheTypeReducer<Cached, GuildBasedChannel, APIInteractionDataResolvedChannel> >;"
      },
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "members?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, GuildMember, APIInteractionDataResolvedGuildMember>>;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, Role, APIRole>>;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "users?: ReadonlyCollection<Snowflake, User>;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "values: readonly string[];"
      }
    ]
  },
  "FileUploadModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.FileUpload>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "values: readonly Snowflake[];"
      },
      {
        "name": "attachments",
        "kind": "property",
        "static": false,
        "signature": "attachments: ReadonlyCollection<Snowflake, Attachment>;"
      }
    ]
  },
  "RadioGroupModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.RadioGroup>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string | null;"
      }
    ]
  },
  "CheckboxGroupModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.CheckboxGroup>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "values: readonly string[];"
      }
    ]
  },
  "CheckboxModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.Checkbox>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: boolean;"
      }
    ]
  },
  "LabelModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.Label>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "component",
        "kind": "property",
        "static": false,
        "signature": "component: ModalData;"
      }
    ]
  },
  "ActionRowModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.ActionRow>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components: readonly TextInputModalData[];"
      }
    ]
  },
  "TextDisplayModalData": {
    "kind": "interface",
    "extends": [
      "BaseModalData<ComponentType.TextDisplay>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ModalSelectedMentionables": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "members: NonNullable<SelectMenuModalData<Cached>['members']>;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles: NonNullable<SelectMenuModalData<Cached>['roles']>;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "users: NonNullable<SelectMenuModalData<Cached>['users']>;"
      }
    ]
  },
  "ModalSubmitFields": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "getField",
        "static": false,
        "signature": "public getField<Type extends ComponentType>(customId: string, type: Type): Extract<ModalData, { type: Type }>;"
      },
      {
        "name": "getField",
        "static": false,
        "signature": "public getField(customId: string, type?: ComponentType): ModalData;"
      },
      {
        "name": "getTextInputValue",
        "static": false,
        "signature": "public getTextInputValue(customId: string): string;"
      },
      {
        "name": "getStringSelectValues",
        "static": false,
        "signature": "public getStringSelectValues(customId: string): readonly string[];"
      },
      {
        "name": "getSelectedUsers",
        "static": false,
        "signature": "public getSelectedUsers(customId: string, required: true): ReadonlyCollection<Snowflake, User>;"
      },
      {
        "name": "getSelectedUsers",
        "static": false,
        "signature": "public getSelectedUsers(customId: string, required?: boolean): ReadonlyCollection<Snowflake, User> | null;"
      },
      {
        "name": "getSelectedMembers",
        "static": false,
        "signature": "public getSelectedMembers(customId: string): NonNullable<SelectMenuModalData<Cached>['members']> | null;"
      },
      {
        "name": "getSelectedChannels",
        "static": false,
        "signature": "public getSelectedChannels<const Type extends ChannelType = ChannelType>( customId: string, required: true, channelTypes?: readonly Type[], ): ReadonlyCollection< Snowflake, Extract< NonNullable<CommandInteractionOption<Cached>['channel']>, { type: Type extends ChannelType.AnnouncementThread | ChannelType.PublicThread ? ChannelType.AnnouncementThread | ChannelType.PublicThread : Type; } > >;"
      },
      {
        "name": "getSelectedChannels",
        "static": false,
        "signature": "public getSelectedChannels<const Type extends ChannelType = ChannelType>( customId: string, required?: boolean, channelTypes?: readonly Type[], ): ReadonlyCollection< Snowflake, Extract< NonNullable<CommandInteractionOption<Cached>['channel']>, { type: Type extends ChannelType.AnnouncementThread | ChannelType.PublicThread ? ChannelType.AnnouncementThread | ChannelType.PublicThread : Type; } > > | null;"
      },
      {
        "name": "getSelectedRoles",
        "static": false,
        "signature": "public getSelectedRoles(customId: string, required: true): NonNullable<SelectMenuModalData<Cached>['roles']>;"
      },
      {
        "name": "getSelectedRoles",
        "static": false,
        "signature": "public getSelectedRoles( customId: string, required?: boolean, ): NonNullable<SelectMenuModalData<Cached>['roles']> | null;"
      },
      {
        "name": "getSelectedMentionables",
        "static": false,
        "signature": "public getSelectedMentionables(customId: string, required: true): ModalSelectedMentionables<Cached>;"
      },
      {
        "name": "getSelectedMentionables",
        "static": false,
        "signature": "public getSelectedMentionables(customId: string, required?: boolean): ModalSelectedMentionables<Cached> | null;"
      },
      {
        "name": "getUploadedFiles",
        "static": false,
        "signature": "public getUploadedFiles(customId: string, required: true): ReadonlyCollection<Snowflake, Attachment>;"
      },
      {
        "name": "getUploadedFiles",
        "static": false,
        "signature": "public getUploadedFiles(customId: string, required?: boolean): ReadonlyCollection<Snowflake, Attachment> | null;"
      },
      {
        "name": "getRadioGroup",
        "static": false,
        "signature": "public getRadioGroup(customId: string, required: true): string;"
      },
      {
        "name": "getRadioGroup",
        "static": false,
        "signature": "public getRadioGroup(customId: string, required?: boolean): string | null;"
      },
      {
        "name": "getCheckboxGroup",
        "static": false,
        "signature": "public getCheckboxGroup(customId: string): readonly string[];"
      },
      {
        "name": "getCheckbox",
        "static": false,
        "signature": "public getCheckbox(customId: string): boolean;"
      }
    ],
    "properties": [
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public components: (ActionRowModalData | LabelModalData | TextDisplayModalData)[];"
      },
      {
        "name": "resolved",
        "kind": "property",
        "static": false,
        "signature": "public resolved: Readonly<BaseInteractionResolvedData<Cached>> | null;"
      },
      {
        "name": "fields",
        "kind": "property",
        "static": false,
        "signature": "public fields: Collection<string, ModalData>;"
      }
    ]
  },
  "ModalMessageModalSubmitInteraction": {
    "kind": "interface",
    "extends": [
      "ModalSubmitInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "update",
        "static": false,
        "signature": "update( options: InteractionUpdateOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "update",
        "static": false,
        "signature": "update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<Message>;"
      },
      {
        "name": "update",
        "static": false,
        "signature": "update( options: string | MessagePayload | InteractionUpdateOptions, ): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "inGuild",
        "static": false,
        "signature": "inGuild(): this is ModalMessageModalSubmitInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "inCachedGuild(): this is ModalMessageModalSubmitInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "inRawGuild(): this is ModalMessageModalSubmitInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: Message<BooleanCache<Cached>>;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "channelId: Snowflake;"
      }
    ]
  },
  "ModalSubmitInteraction": {
    "kind": "class",
    "extends": [
      "BaseInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: InteractionReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "reply",
        "static": false,
        "signature": "public reply( options: string | MessagePayload | InteractionReplyOptions, ): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deleteReply",
        "static": false,
        "signature": "public deleteReply(message?: MessageResolvable | '@original'): Promise<void>;"
      },
      {
        "name": "editReply",
        "static": false,
        "signature": "public editReply( options: string | MessagePayload | InteractionEditReplyOptions, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply( options: InteractionDeferReplyOptions & { fetchReply: true }, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferReply",
        "static": false,
        "signature": "public deferReply(options?: InteractionDeferReplyOptions): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "fetchReply",
        "static": false,
        "signature": "public fetchReply(message?: Snowflake | '@original'): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "followUp",
        "static": false,
        "signature": "public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate( options: InteractionDeferUpdateOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate( options: InteractionDeferUpdateOptions & { fetchReply: true }, ): Promise<Message<BooleanCache<Cached>>>;"
      },
      {
        "name": "deferUpdate",
        "static": false,
        "signature": "public deferUpdate(options?: InteractionDeferUpdateOptions): Promise<InteractionResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "sendPremiumRequired",
        "static": false,
        "signature": "public sendPremiumRequired(): Promise<void>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options: LaunchActivityOptions & { withResponse: true }, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>>>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity(options?: LaunchActivityOptions & { withResponse?: false }): Promise<undefined>;"
      },
      {
        "name": "launchActivity",
        "static": false,
        "signature": "public launchActivity( options?: LaunchActivityOptions, ): Promise<InteractionCallbackResponse<BooleanCache<Cached>> | undefined>;"
      },
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is ModalSubmitInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is ModalSubmitInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is ModalSubmitInteraction<'raw'>;"
      },
      {
        "name": "isFromMessage",
        "static": false,
        "signature": "public isFromMessage(): this is ModalMessageModalSubmitInteraction<Cached>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: InteractionType.ModalSubmit;"
      },
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "public readonly customId: string;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public readonly components: (ActionRowModalData | LabelModalData)[];"
      },
      {
        "name": "fields",
        "kind": "property",
        "static": false,
        "signature": "public readonly fields: ModalSubmitFields<Cached>;"
      },
      {
        "name": "deferred",
        "kind": "property",
        "static": false,
        "signature": "public deferred: boolean;"
      },
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "public ephemeral: boolean | null;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message<BooleanCache<Cached>> | null;"
      },
      {
        "name": "replied",
        "kind": "property",
        "static": false,
        "signature": "public replied: boolean;"
      },
      {
        "name": "webhook",
        "kind": "property",
        "static": false,
        "signature": "public readonly webhook: InteractionWebhook;"
      }
    ]
  },
  "NewsChannel": {
    "kind": "class",
    "extends": [
      "BaseGuildTextChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "addFollower",
        "static": false,
        "signature": "public addFollower(channel: TextChannelResolvable, reason?: string): Promise<NewsChannel>;"
      }
    ],
    "properties": [
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "public threads: GuildTextThreadManager<AllowedThreadTypeForNewsChannel>;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildAnnouncement;"
      }
    ]
  },
  "OAuth2Guild": {
    "kind": "class",
    "extends": [
      "BaseGuild"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "owner",
        "kind": "property",
        "static": false,
        "signature": "public owner: boolean;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: Readonly<PermissionsBitField>;"
      }
    ]
  },
  "PartialGroupDMChannel": {
    "kind": "class",
    "extends": [
      "BaseChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "fetchOwner",
        "static": false,
        "signature": "public fetchOwner(options?: BaseFetchOptions): Promise<User>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): ChannelMention;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GroupDM;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string | null;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "recipients",
        "kind": "property",
        "static": false,
        "signature": "public recipients: PartialRecipient[];"
      },
      {
        "name": "ownerId",
        "kind": "property",
        "static": false,
        "signature": "public ownerId: Snowflake | null;"
      }
    ]
  },
  "GuildForumTagEmoji": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string | null;"
      }
    ]
  },
  "GuildForumTag": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "moderated",
        "kind": "property",
        "static": false,
        "signature": "moderated: boolean;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji: GuildForumTagEmoji | null;"
      }
    ]
  },
  "GuildForumTagData": {
    "kind": "interface",
    "extends": [
      "Partial<GuildForumTag>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "DefaultReactionEmoji": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake | null;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string | null;"
      }
    ]
  },
  "ThreadOnlyChannel": {
    "kind": "class",
    "extends": [
      "GuildChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "setAvailableTags",
        "static": false,
        "signature": "public setAvailableTags(tags: readonly GuildForumTagData[], reason?: string): Promise<this>;"
      },
      {
        "name": "setDefaultReactionEmoji",
        "static": false,
        "signature": "public setDefaultReactionEmoji(emojiId: DefaultReactionEmoji | null, reason?: string): Promise<this>;"
      },
      {
        "name": "setDefaultThreadRateLimitPerUser",
        "static": false,
        "signature": "public setDefaultThreadRateLimitPerUser(rateLimit: number, reason?: string): Promise<this>;"
      },
      {
        "name": "createInvite",
        "static": false,
        "signature": "public createInvite(options?: InviteCreateOptions): Promise<Invite>;"
      },
      {
        "name": "fetchInvites",
        "static": false,
        "signature": "public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;"
      },
      {
        "name": "setDefaultAutoArchiveDuration",
        "static": false,
        "signature": "public setDefaultAutoArchiveDuration( defaultAutoArchiveDuration: ThreadAutoArchiveDuration, reason?: string, ): Promise<this>;"
      },
      {
        "name": "setTopic",
        "static": false,
        "signature": "public setTopic(topic: string | null, reason?: string): Promise<this>;"
      },
      {
        "name": "setDefaultSortOrder",
        "static": false,
        "signature": "public setDefaultSortOrder(defaultSortOrder: SortOrderType | null, reason?: string): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildForum | ChannelType.GuildMedia;"
      },
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "public threads: GuildForumThreadManager;"
      },
      {
        "name": "availableTags",
        "kind": "property",
        "static": false,
        "signature": "public availableTags: GuildForumTag[];"
      },
      {
        "name": "defaultReactionEmoji",
        "kind": "property",
        "static": false,
        "signature": "public defaultReactionEmoji: DefaultReactionEmoji | null;"
      },
      {
        "name": "defaultThreadRateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public defaultThreadRateLimitPerUser: number | null;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public rateLimitPerUser: number | null;"
      },
      {
        "name": "defaultAutoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "public defaultAutoArchiveDuration: ThreadAutoArchiveDuration | null;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "public nsfw: boolean;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "public topic: string | null;"
      },
      {
        "name": "defaultSortOrder",
        "kind": "property",
        "static": false,
        "signature": "public defaultSortOrder: SortOrderType | null;"
      }
    ]
  },
  "ForumChannel": {
    "kind": "class",
    "extends": [
      "ThreadOnlyChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "setDefaultForumLayout",
        "static": false,
        "signature": "public setDefaultForumLayout(defaultForumLayout: ForumLayoutType, reason?: string): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildForum;"
      },
      {
        "name": "defaultForumLayout",
        "kind": "property",
        "static": false,
        "signature": "public defaultForumLayout: ForumLayoutType;"
      }
    ]
  },
  "MediaChannel": {
    "kind": "class",
    "extends": [
      "ThreadOnlyChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildMedia;"
      }
    ]
  },
  "PermissionOverwrites": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: PermissionOverwriteOptions, reason?: string): Promise<PermissionOverwrites>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<PermissionOverwrites>;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "resolveOverwriteOptions",
        "static": true,
        "signature": "public static resolveOverwriteOptions( options: PermissionOverwriteOptions, initialPermissions: { allow?: PermissionResolvable; deny?: PermissionResolvable }, ): ResolvedOverwriteOptions;"
      },
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(overwrite: OverwriteResolvable, guild: Guild): APIOverwrite;"
      }
    ],
    "properties": [
      {
        "name": "allow",
        "kind": "property",
        "static": false,
        "signature": "public allow: Readonly<PermissionsBitField>;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public readonly channel: NonThreadGuildBasedChannel;"
      },
      {
        "name": "deny",
        "kind": "property",
        "static": false,
        "signature": "public deny: Readonly<PermissionsBitField>;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: OverwriteType;"
      }
    ]
  },
  "PermissionsBitField": {
    "kind": "class",
    "extends": [
      "BitField<PermissionsString, bigint>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "any",
        "static": false,
        "signature": "public any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;"
      },
      {
        "name": "has",
        "static": false,
        "signature": "public has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;"
      },
      {
        "name": "missing",
        "static": false,
        "signature": "public missing(bits: BitFieldResolvable<PermissionsString, bigint>, checkAdmin?: boolean): PermissionsString[];"
      },
      {
        "name": "serialize",
        "static": false,
        "signature": "public serialize(checkAdmin?: boolean): Record<PermissionsString, boolean>;"
      },
      {
        "name": "toArray",
        "static": false,
        "signature": "public toArray(): PermissionsString[];"
      },
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(permission?: PermissionResolvable): bigint;"
      }
    ],
    "properties": [
      {
        "name": "All",
        "kind": "property",
        "static": true,
        "signature": "public static All: bigint;"
      },
      {
        "name": "Default",
        "kind": "property",
        "static": true,
        "signature": "public static Default: bigint;"
      },
      {
        "name": "StageModerator",
        "kind": "property",
        "static": true,
        "signature": "public static StageModerator: bigint;"
      },
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof PermissionFlagsBits;"
      }
    ]
  },
  "Presence": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(presence: Presence): boolean;"
      }
    ],
    "properties": [
      {
        "name": "activities",
        "kind": "property",
        "static": false,
        "signature": "public activities: Activity[];"
      },
      {
        "name": "clientStatus",
        "kind": "property",
        "static": false,
        "signature": "public clientStatus: ClientPresenceStatusData | null;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild | null;"
      },
      {
        "name": "member",
        "kind": "getter",
        "static": false,
        "signature": "public get member(): GuildMember | null;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: PresenceStatus;"
      },
      {
        "name": "user",
        "kind": "getter",
        "static": false,
        "signature": "public get user(): User | null;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public userId: Snowflake;"
      }
    ]
  },
  "PollQuestionMedia": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "text",
        "kind": "property",
        "static": false,
        "signature": "text: string | null;"
      }
    ]
  },
  "PollAnswerVoterManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, User, UserResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: BaseFetchPollAnswerVotersOptions): Promise<Collection<Snowflake, User>>;"
      }
    ],
    "properties": [
      {
        "name": "answer",
        "kind": "property",
        "static": false,
        "signature": "public answer: PollAnswer;"
      }
    ]
  },
  "Poll": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<this>;"
      },
      {
        "name": "end",
        "static": false,
        "signature": "public end(): Promise<Message>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public readonly channel: TextBasedChannel;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public readonly message: Message;"
      },
      {
        "name": "messageId",
        "kind": "property",
        "static": false,
        "signature": "public messageId: Snowflake;"
      },
      {
        "name": "question",
        "kind": "property",
        "static": false,
        "signature": "public question: PollQuestionMedia;"
      },
      {
        "name": "answers",
        "kind": "property",
        "static": false,
        "signature": "public answers: Collection<number, PollAnswer | PartialPollAnswer>;"
      },
      {
        "name": "expiresTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public expiresTimestamp: number | null;"
      },
      {
        "name": "expiresAt",
        "kind": "getter",
        "static": false,
        "signature": "public get expiresAt(): Date | null;"
      },
      {
        "name": "allowMultiselect",
        "kind": "property",
        "static": false,
        "signature": "public allowMultiselect: boolean;"
      },
      {
        "name": "layoutType",
        "kind": "property",
        "static": false,
        "signature": "public layoutType: PollLayoutType;"
      },
      {
        "name": "resultsFinalized",
        "kind": "property",
        "static": false,
        "signature": "public resultsFinalized: boolean;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      }
    ]
  },
  "BaseFetchPollAnswerVotersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      }
    ]
  },
  "PollAnswer": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetchVoters",
        "static": false,
        "signature": "public fetchVoters(options?: BaseFetchPollAnswerVotersOptions): Promise<Collection<Snowflake, User>>;"
      }
    ],
    "properties": [
      {
        "name": "poll",
        "kind": "property",
        "static": false,
        "signature": "public readonly poll: Poll | PartialPoll;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: number;"
      },
      {
        "name": "text",
        "kind": "property",
        "static": false,
        "signature": "public text: string | null;"
      },
      {
        "name": "voteCount",
        "kind": "property",
        "static": false,
        "signature": "public voteCount: number;"
      },
      {
        "name": "voters",
        "kind": "property",
        "static": false,
        "signature": "public voters: PollAnswerVoterManager;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): GuildEmoji | Emoji | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      }
    ]
  },
  "ReactionCollector": {
    "kind": "class",
    "extends": [
      "Collector<Snowflake | string, MessageReaction, [User]>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(message: Message, options?: ReactionCollectorOptions);"
    ],
    "methods": [
      {
        "name": "key",
        "static": true,
        "signature": "public static key(reaction: MessageReaction): Snowflake | string;"
      },
      {
        "name": "collect",
        "static": false,
        "signature": "public collect(reaction: MessageReaction, user: User): Snowflake | string | null;"
      },
      {
        "name": "dispose",
        "static": false,
        "signature": "public dispose(reaction: MessageReaction, user: User): Snowflake | string | null;"
      },
      {
        "name": "empty",
        "static": false,
        "signature": "public empty(): void;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on( event: 'collect' | 'dispose' | 'remove' | 'ignore', listener: (reaction: MessageReaction, user: User) => void, ): this;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on( event: 'end', listener: (collected: ReadonlyCollection<Snowflake, MessageReaction>, reason: string) => void, ): this;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on(event: string, listener: (...args: any[]) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once( event: 'collect' | 'dispose' | 'remove' | 'ignore', listener: (reaction: MessageReaction, user: User) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once( event: 'end', listener: (collected: ReadonlyCollection<Snowflake, MessageReaction>, reason: string) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once(event: string, listener: (...args: any[]) => void): this;"
      }
    ],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: ReactionCollectorOptions;"
      },
      {
        "name": "total",
        "kind": "property",
        "static": false,
        "signature": "public total: number;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Collection<Snowflake, User>;"
      }
    ]
  },
  "ReactionEmoji": {
    "kind": "class",
    "extends": [
      "Emoji"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "reaction",
        "kind": "property",
        "static": false,
        "signature": "public reaction: MessageReaction;"
      }
    ]
  },
  "RichPresenceAssets": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "largeImageURL",
        "static": false,
        "signature": "public largeImageURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "smallImageURL",
        "static": false,
        "signature": "public smallImageURL(options?: ImageURLOptions): string | null;"
      }
    ],
    "properties": [
      {
        "name": "activity",
        "kind": "property",
        "static": false,
        "signature": "public readonly activity: Activity;"
      },
      {
        "name": "largeImage",
        "kind": "property",
        "static": false,
        "signature": "public largeImage: Snowflake | null;"
      },
      {
        "name": "largeText",
        "kind": "property",
        "static": false,
        "signature": "public largeText: string | null;"
      },
      {
        "name": "smallImage",
        "kind": "property",
        "static": false,
        "signature": "public smallImage: Snowflake | null;"
      },
      {
        "name": "smallText",
        "kind": "property",
        "static": false,
        "signature": "public smallText: string | null;"
      }
    ]
  },
  "RoleColors": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "primaryColor",
        "kind": "property",
        "static": false,
        "signature": "primaryColor: number;"
      },
      {
        "name": "secondaryColor",
        "kind": "property",
        "static": false,
        "signature": "secondaryColor: number | null;"
      },
      {
        "name": "tertiaryColor",
        "kind": "property",
        "static": false,
        "signature": "tertiaryColor: number | null;"
      }
    ]
  },
  "RoleColorsResolvable": {
    "kind": "interface",
    "extends": [
      "RoleColorsEditResolvable"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "primaryColor",
        "kind": "property",
        "static": false,
        "signature": "primaryColor: ColorResolvable;"
      },
      {
        "name": "secondaryColor",
        "kind": "property",
        "static": false,
        "signature": "secondaryColor?: ColorResolvable;"
      },
      {
        "name": "tertiaryColor",
        "kind": "property",
        "static": false,
        "signature": "tertiaryColor?: ColorResolvable;"
      }
    ]
  },
  "RoleColorsEditResolvable": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "primaryColor",
        "kind": "property",
        "static": false,
        "signature": "primaryColor: ColorResolvable;"
      },
      {
        "name": "secondaryColor",
        "kind": "property",
        "static": false,
        "signature": "secondaryColor?: ColorResolvable | null;"
      },
      {
        "name": "tertiaryColor",
        "kind": "property",
        "static": false,
        "signature": "tertiaryColor?: ColorResolvable | null;"
      }
    ]
  },
  "BaseRole": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): RoleMention;"
      }
    ],
    "properties": [
      {
        "name": "color",
        "kind": "property",
        "static": false,
        "signature": "public color: number;"
      },
      {
        "name": "colors",
        "kind": "property",
        "static": false,
        "signature": "public colors: RoleColors;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "hexColor",
        "kind": "getter",
        "static": false,
        "signature": "public get hexColor(): HexColorString;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "rawPosition",
        "kind": "property",
        "static": false,
        "signature": "public rawPosition: number;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "unicodeEmoji",
        "kind": "property",
        "static": false,
        "signature": "public unicodeEmoji: string | null;"
      }
    ]
  },
  "InviteRole": {
    "kind": "class",
    "extends": [
      "BaseRole"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "Role": {
    "kind": "class",
    "extends": [
      "BaseRole"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "comparePositionTo",
        "static": false,
        "signature": "public comparePositionTo(role: RoleResolvable): number;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<Role>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: RoleEditOptions): Promise<Role>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(role: Role): boolean;"
      },
      {
        "name": "permissionsIn",
        "static": false,
        "signature": "public permissionsIn( channel: NonThreadGuildBasedChannel | Snowflake, checkAdmin?: boolean, ): Readonly<PermissionsBitField>;"
      },
      {
        "name": "setColor",
        "static": false,
        "signature": "public setColor(color: ColorResolvable, reason?: string): Promise<Role>;"
      },
      {
        "name": "setColors",
        "static": false,
        "signature": "public setColors(colors: RoleColorsResolvable, reason?: string): Promise<Role>;"
      },
      {
        "name": "setHoist",
        "static": false,
        "signature": "public setHoist(hoist?: boolean, reason?: string): Promise<Role>;"
      },
      {
        "name": "setMentionable",
        "static": false,
        "signature": "public setMentionable(mentionable?: boolean, reason?: string): Promise<Role>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<Role>;"
      },
      {
        "name": "setPermissions",
        "static": false,
        "signature": "public setPermissions(permissions: PermissionResolvable, reason?: string): Promise<Role>;"
      },
      {
        "name": "setIcon",
        "static": false,
        "signature": "public setIcon(icon: BufferResolvable | Base64Resolvable | EmojiResolvable | null, reason?: string): Promise<Role>;"
      },
      {
        "name": "setPosition",
        "static": false,
        "signature": "public setPosition(position: number, options?: SetRolePositionOptions): Promise<Role>;"
      },
      {
        "name": "setUnicodeEmoji",
        "static": false,
        "signature": "public setUnicodeEmoji(unicodeEmoji: string | null, reason?: string): Promise<Role>;"
      }
    ],
    "properties": [
      {
        "name": "editable",
        "kind": "getter",
        "static": false,
        "signature": "public get editable(): boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: RoleFlagsBitField;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "hoist",
        "kind": "property",
        "static": false,
        "signature": "public hoist: boolean;"
      },
      {
        "name": "managed",
        "kind": "property",
        "static": false,
        "signature": "public managed: boolean;"
      },
      {
        "name": "members",
        "kind": "getter",
        "static": false,
        "signature": "public get members(): Collection<Snowflake, GuildMember>;"
      },
      {
        "name": "mentionable",
        "kind": "property",
        "static": false,
        "signature": "public mentionable: boolean;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: Readonly<PermissionsBitField>;"
      },
      {
        "name": "position",
        "kind": "getter",
        "static": false,
        "signature": "public get position(): number;"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "public tags: RoleTagData | null;"
      }
    ]
  },
  "RoleFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<RoleFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<RoleFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof RoleFlags;"
      }
    ]
  },
  "SectionComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "accessory",
        "kind": "property",
        "static": false,
        "signature": "accessory: ButtonComponentData | ThumbnailComponentData;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components: readonly TextDisplayComponentData[];"
      }
    ]
  },
  "SectionComponent": {
    "kind": "class",
    "extends": [
      "Component<APISectionComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): APISectionComponent;"
      }
    ],
    "properties": [
      {
        "name": "accessory",
        "kind": "property",
        "static": false,
        "signature": "public readonly accessory: AccessoryType;"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "public readonly components: TextDisplayComponent[];"
      }
    ]
  },
  "StringSelectMenuInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data: APIMessageStringSelectInteractionData);"
    ],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is StringSelectMenuInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is StringSelectMenuInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is StringSelectMenuInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, StringSelectMenuComponent, APIStringSelectComponent, StringSelectMenuComponent | APIStringSelectComponent, StringSelectMenuComponent | APIStringSelectComponent >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.StringSelect;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "public values: string[];"
      }
    ]
  },
  "UserSelectMenuInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data: APIMessageUserSelectInteractionData);"
    ],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is UserSelectMenuInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is UserSelectMenuInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is UserSelectMenuInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, UserSelectMenuComponent, APIUserSelectComponent, UserSelectMenuComponent | APIUserSelectComponent, UserSelectMenuComponent | APIUserSelectComponent >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.UserSelect;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "public values: Snowflake[];"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Collection<Snowflake, User>;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: Collection< Snowflake, CacheTypeReducer<Cached, GuildMember, APIGuildMember, GuildMember | APIGuildMember, GuildMember | APIGuildMember> >;"
      }
    ]
  },
  "RoleSelectMenuInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data: APIMessageRoleSelectInteractionData);"
    ],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is RoleSelectMenuInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is RoleSelectMenuInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is RoleSelectMenuInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, RoleSelectMenuComponent, APIRoleSelectComponent, RoleSelectMenuComponent | APIRoleSelectComponent, RoleSelectMenuComponent | APIRoleSelectComponent >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.RoleSelect;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "public values: Snowflake[];"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole, Role | APIRole, Role | APIRole>>;"
      }
    ]
  },
  "MentionableSelectMenuInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data: APIMessageMentionableSelectInteractionData);"
    ],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is MentionableSelectMenuInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is MentionableSelectMenuInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is MentionableSelectMenuInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, MentionableSelectMenuComponent, APIMentionableSelectComponent, MentionableSelectMenuComponent | APIMentionableSelectComponent, MentionableSelectMenuComponent | APIMentionableSelectComponent >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.MentionableSelect;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "public values: Snowflake[];"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "public users: Collection<Snowflake, User>;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: Collection< Snowflake, CacheTypeReducer<Cached, GuildMember, APIGuildMember, GuildMember | APIGuildMember, GuildMember | APIGuildMember> >;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "public roles: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole, Role | APIRole, Role | APIRole>>;"
      }
    ]
  },
  "ChannelSelectMenuInteraction": {
    "kind": "class",
    "extends": [
      "MessageComponentInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, data: APIMessageChannelSelectInteractionData);"
    ],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is ChannelSelectMenuInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is ChannelSelectMenuInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is ChannelSelectMenuInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "component",
        "kind": "getter",
        "static": false,
        "signature": "public get component(): CacheTypeReducer< Cached, ChannelSelectMenuComponent, APIChannelSelectComponent, ChannelSelectMenuComponent | APIChannelSelectComponent, ChannelSelectMenuComponent | APIChannelSelectComponent >;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "public componentType: ComponentType.ChannelSelect;"
      },
      {
        "name": "values",
        "kind": "property",
        "static": false,
        "signature": "public values: Snowflake[];"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "public channels: Collection< Snowflake, CacheTypeReducer<Cached, Channel, APIChannel, Channel | APIChannel, Channel | APIChannel> >;"
      }
    ]
  },
  "SeparatorComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "spacing",
        "kind": "property",
        "static": false,
        "signature": "spacing?: SeparatorSpacingSize;"
      },
      {
        "name": "divider",
        "kind": "property",
        "static": false,
        "signature": "divider?: boolean;"
      }
    ]
  },
  "SeparatorComponent": {
    "kind": "class",
    "extends": [
      "Component<APISeparatorComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "spacing",
        "kind": "getter",
        "static": false,
        "signature": "public get spacing(): SeparatorSpacingSize;"
      },
      {
        "name": "divider",
        "kind": "getter",
        "static": false,
        "signature": "public get divider(): boolean;"
      }
    ]
  },
  "ShardEventTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "death",
        "kind": "property",
        "static": false,
        "signature": "death: [process: ChildProcess | Worker];"
      },
      {
        "name": "disconnect",
        "kind": "property",
        "static": false,
        "signature": "disconnect: [];"
      },
      {
        "name": "error",
        "kind": "property",
        "static": false,
        "signature": "error: [error: Error];"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: [message: any];"
      },
      {
        "name": "ready",
        "kind": "property",
        "static": false,
        "signature": "ready: [];"
      },
      {
        "name": "reconnecting",
        "kind": "property",
        "static": false,
        "signature": "reconnecting: [];"
      },
      {
        "name": "resume",
        "kind": "property",
        "static": false,
        "signature": "resume: [];"
      },
      {
        "name": "spawn",
        "kind": "property",
        "static": false,
        "signature": "spawn: [process: ChildProcess | Worker];"
      }
    ]
  },
  "Shard": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "eval",
        "static": false,
        "signature": "public eval(script: string): Promise<unknown>;"
      },
      {
        "name": "eval",
        "static": false,
        "signature": "public eval<Result>(fn: (client: Client) => Result): Promise<Result>;"
      },
      {
        "name": "eval",
        "static": false,
        "signature": "public eval<Result, Context>( fn: (client: Client<true>, context: Serialized<Context>) => Result, context: Context, ): Promise<Result>;"
      },
      {
        "name": "fetchClientValue",
        "static": false,
        "signature": "public fetchClientValue(prop: string): Promise<unknown>;"
      },
      {
        "name": "kill",
        "static": false,
        "signature": "public kill(): void;"
      },
      {
        "name": "respawn",
        "static": false,
        "signature": "public respawn(options?: { delay?: number; timeout?: number }): Promise<ChildProcess>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "public send(message: unknown): Promise<Shard>;"
      },
      {
        "name": "spawn",
        "static": false,
        "signature": "public spawn(timeout?: number): Promise<ChildProcess>;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on<Event extends keyof ShardEventTypes>( event: Event, listener: (...args: ShardEventTypes[Event]) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once<Event extends keyof ShardEventTypes>( event: Event, listener: (...args: ShardEventTypes[Event]) => void, ): this;"
      }
    ],
    "properties": [
      {
        "name": "args",
        "kind": "property",
        "static": false,
        "signature": "public args: string[];"
      },
      {
        "name": "execArgv",
        "kind": "property",
        "static": false,
        "signature": "public execArgv: string[];"
      },
      {
        "name": "env",
        "kind": "property",
        "static": false,
        "signature": "public env: unknown;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: number;"
      },
      {
        "name": "manager",
        "kind": "property",
        "static": false,
        "signature": "public manager: ShardingManager;"
      },
      {
        "name": "process",
        "kind": "property",
        "static": false,
        "signature": "public process: ChildProcess | null;"
      },
      {
        "name": "ready",
        "kind": "property",
        "static": false,
        "signature": "public ready: boolean;"
      },
      {
        "name": "silent",
        "kind": "property",
        "static": false,
        "signature": "public silent: boolean;"
      },
      {
        "name": "worker",
        "kind": "property",
        "static": false,
        "signature": "public worker: Worker | null;"
      }
    ]
  },
  "ShardClientUtil": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result>(fn: (client: Client) => Awaitable<Result>): Promise<Serialized<Result>[]>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result, Context>( fn: (client: Client<true>, context: Serialized<Context>) => Awaitable<Result>, options: { context: Context; shard: number }, ): Promise<Serialized<Result>>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result, Context>( fn: (client: Client<true>, context: Serialized<Context>) => Awaitable<Result>, options: { context: Context }, ): Promise<Serialized<Result>[]>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result>( fn: (client: Client) => Awaitable<Result>, options: { shard: number }, ): Promise<Serialized<Result>>;"
      },
      {
        "name": "fetchClientValues",
        "static": false,
        "signature": "public fetchClientValues(prop: string): Promise<unknown[]>;"
      },
      {
        "name": "fetchClientValues",
        "static": false,
        "signature": "public fetchClientValues(prop: string, shard: number): Promise<unknown>;"
      },
      {
        "name": "respawnAll",
        "static": false,
        "signature": "public respawnAll(options?: MultipleShardRespawnOptions): Promise<void>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "public send(message: unknown): Promise<void>;"
      },
      {
        "name": "singleton",
        "static": true,
        "signature": "public static singleton(client: Client<true>, mode: ShardingManagerMode): ShardClientUtil;"
      },
      {
        "name": "shardIdForGuildId",
        "static": true,
        "signature": "public static shardIdForGuildId(guildId: Snowflake, shardCount: number): number;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public client: Client;"
      },
      {
        "name": "count",
        "kind": "getter",
        "static": false,
        "signature": "public get count(): number;"
      },
      {
        "name": "ids",
        "kind": "getter",
        "static": false,
        "signature": "public get ids(): number[];"
      },
      {
        "name": "mode",
        "kind": "property",
        "static": false,
        "signature": "public mode: ShardingManagerMode;"
      },
      {
        "name": "parentPort",
        "kind": "property",
        "static": false,
        "signature": "public parentPort: MessagePort | null;"
      }
    ]
  },
  "ShardingManager": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [],
    "constructors": [
      "public constructor(file: string, options?: ShardingManagerOptions);"
    ],
    "methods": [
      {
        "name": "broadcast",
        "static": false,
        "signature": "public broadcast(message: unknown): Promise<Shard[]>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result>(fn: (client: Client) => Awaitable<Result>): Promise<Serialized<Result>[]>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result, Context>( fn: (client: Client<true>, context: Serialized<Context>) => Awaitable<Result>, options: { context: Context; shard: number }, ): Promise<Serialized<Result>>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result, Context>( fn: (client: Client<true>, context: Serialized<Context>) => Awaitable<Result>, options: { context: Context }, ): Promise<Serialized<Result>[]>;"
      },
      {
        "name": "broadcastEval",
        "static": false,
        "signature": "public broadcastEval<Result>( fn: (client: Client) => Awaitable<Result>, options: { shard: number }, ): Promise<Serialized<Result>>;"
      },
      {
        "name": "createShard",
        "static": false,
        "signature": "public createShard(id: number): Shard;"
      },
      {
        "name": "fetchClientValues",
        "static": false,
        "signature": "public fetchClientValues(prop: string): Promise<unknown[]>;"
      },
      {
        "name": "fetchClientValues",
        "static": false,
        "signature": "public fetchClientValues(prop: string, shard: number): Promise<unknown>;"
      },
      {
        "name": "respawnAll",
        "static": false,
        "signature": "public respawnAll(options?: MultipleShardRespawnOptions): Promise<Collection<number, Shard>>;"
      },
      {
        "name": "spawn",
        "static": false,
        "signature": "public spawn(options?: MultipleShardSpawnOptions): Promise<Collection<number, Shard>>;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on(event: 'shardCreate', listener: (shard: Shard) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once(event: 'shardCreate', listener: (shard: Shard) => void): this;"
      }
    ],
    "properties": [
      {
        "name": "file",
        "kind": "property",
        "static": false,
        "signature": "public file: string;"
      },
      {
        "name": "respawn",
        "kind": "property",
        "static": false,
        "signature": "public respawn: boolean;"
      },
      {
        "name": "silent",
        "kind": "property",
        "static": false,
        "signature": "public silent: boolean;"
      },
      {
        "name": "shardArgs",
        "kind": "property",
        "static": false,
        "signature": "public shardArgs: string[];"
      },
      {
        "name": "shards",
        "kind": "property",
        "static": false,
        "signature": "public shards: Collection<number, Shard>;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public token: string | null;"
      },
      {
        "name": "totalShards",
        "kind": "property",
        "static": false,
        "signature": "public totalShards: number | 'auto';"
      },
      {
        "name": "shardList",
        "kind": "property",
        "static": false,
        "signature": "public shardList: number[] | 'auto';"
      }
    ]
  },
  "FetchRecommendedShardCountOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildsPerShard",
        "kind": "property",
        "static": false,
        "signature": "guildsPerShard?: number;"
      },
      {
        "name": "multipleOf",
        "kind": "property",
        "static": false,
        "signature": "multipleOf?: number;"
      }
    ]
  },
  "SKU": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: SKUType;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "slug",
        "kind": "property",
        "static": false,
        "signature": "public slug: string;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<SKUFlagsBitField>;"
      }
    ]
  },
  "SKUFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<SKUFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<SKUFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "FLAGS",
        "kind": "property",
        "static": true,
        "signature": "public static FLAGS: typeof SKUFlags;"
      }
    ]
  },
  "Subscription": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public userId: Snowflake;"
      },
      {
        "name": "skuIds",
        "kind": "property",
        "static": false,
        "signature": "public skuIds: Snowflake[];"
      },
      {
        "name": "entitlementIds",
        "kind": "property",
        "static": false,
        "signature": "public entitlementIds: Snowflake[];"
      },
      {
        "name": "renewalSkuIds",
        "kind": "property",
        "static": false,
        "signature": "public renewalSkuIds: Snowflake[] | null;"
      },
      {
        "name": "currentPeriodStartTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public currentPeriodStartTimestamp: number;"
      },
      {
        "name": "currentPeriodEndTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public currentPeriodEndTimestamp: number;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: SubscriptionStatus;"
      },
      {
        "name": "canceledTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public canceledTimestamp: number | null;"
      },
      {
        "name": "country",
        "kind": "property",
        "static": false,
        "signature": "public country: string | null;"
      },
      {
        "name": "canceledAt",
        "kind": "getter",
        "static": false,
        "signature": "public get canceledAt(): Date | null;"
      },
      {
        "name": "currentPeriodStartAt",
        "kind": "getter",
        "static": false,
        "signature": "public get currentPeriodStartAt(): Date;"
      },
      {
        "name": "currentPeriodEndAt",
        "kind": "getter",
        "static": false,
        "signature": "public get currentPeriodEndAt(): Date;"
      }
    ]
  },
  "StageChannel": {
    "kind": "class",
    "extends": [
      "BaseGuildVoiceChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createStageInstance",
        "static": false,
        "signature": "public createStageInstance(options: StageInstanceCreateOptions): Promise<StageInstance>;"
      },
      {
        "name": "setTopic",
        "static": false,
        "signature": "public setTopic(topic: string): Promise<StageChannel>;"
      }
    ],
    "properties": [
      {
        "name": "stageInstance",
        "kind": "getter",
        "static": false,
        "signature": "public get stageInstance(): StageInstance | null;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "public topic: string | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildStageVoice;"
      }
    ]
  },
  "DirectoryChannel": {
    "kind": "class",
    "extends": [
      "BaseChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): ChannelMention;"
      }
    ],
    "properties": [
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ChannelFlagsBitField>;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: InviteGuild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      }
    ]
  },
  "StageInstance": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: StageInstanceEditOptions): Promise<StageInstance>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(): Promise<StageInstance>;"
      },
      {
        "name": "setTopic",
        "static": false,
        "signature": "public setTopic(topic: string): Promise<StageInstance>;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "public topic: string;"
      },
      {
        "name": "privacyLevel",
        "kind": "property",
        "static": false,
        "signature": "public privacyLevel: StageInstancePrivacyLevel;"
      },
      {
        "name": "discoverableDisabled",
        "kind": "property",
        "static": false,
        "signature": "public discoverableDisabled: boolean | null;"
      },
      {
        "name": "guildScheduledEventId",
        "kind": "property",
        "static": false,
        "signature": "public guildScheduledEventId?: Snowflake;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): StageChannel | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "guildScheduledEvent",
        "kind": "getter",
        "static": false,
        "signature": "public get guildScheduledEvent(): GuildScheduledEvent | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      }
    ]
  },
  "Sticker": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<Sticker>;"
      },
      {
        "name": "fetchPack",
        "static": false,
        "signature": "public fetchPack(): Promise<StickerPack | null>;"
      },
      {
        "name": "fetchUser",
        "static": false,
        "signature": "public fetchUser(): Promise<User | null>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options?: GuildStickerEditOptions): Promise<Sticker>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<Sticker>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: Sticker | unknown): boolean;"
      }
    ],
    "properties": [
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "available",
        "kind": "property",
        "static": false,
        "signature": "public available: boolean | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "format",
        "kind": "property",
        "static": false,
        "signature": "public format: StickerFormatType;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "packId",
        "kind": "property",
        "static": false,
        "signature": "public packId: Snowflake | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): boolean;"
      },
      {
        "name": "sortValue",
        "kind": "property",
        "static": false,
        "signature": "public sortValue: number | null;"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "public tags: string | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: StickerType | null;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User | null;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      }
    ]
  },
  "StickerPack": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "bannerURL",
        "static": false,
        "signature": "public bannerURL(options?: ImageURLOptions): string | null;"
      }
    ],
    "properties": [
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "bannerId",
        "kind": "property",
        "static": false,
        "signature": "public bannerId: Snowflake | null;"
      },
      {
        "name": "coverSticker",
        "kind": "getter",
        "static": false,
        "signature": "public get coverSticker(): Sticker | null;"
      },
      {
        "name": "coverStickerId",
        "kind": "property",
        "static": false,
        "signature": "public coverStickerId: Snowflake | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "skuId",
        "kind": "property",
        "static": false,
        "signature": "public skuId: Snowflake;"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "public stickers: Collection<Snowflake, Sticker>;"
      }
    ]
  },
  "Sweepers": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [
      "public constructor(client: Client<true>, options: SweeperOptions);"
    ],
    "methods": [
      {
        "name": "sweepApplicationCommands",
        "static": false,
        "signature": "public sweepApplicationCommands( filter: CollectionSweepFilter< SweeperDefinitions['applicationCommands'][0], SweeperDefinitions['applicationCommands'][1] >, ): number;"
      },
      {
        "name": "sweepAutoModerationRules",
        "static": false,
        "signature": "public sweepAutoModerationRules( filter: CollectionSweepFilter< SweeperDefinitions['autoModerationRules'][0], SweeperDefinitions['autoModerationRules'][1] >, ): number;"
      },
      {
        "name": "sweepBans",
        "static": false,
        "signature": "public sweepBans(filter: CollectionSweepFilter<SweeperDefinitions['bans'][0], SweeperDefinitions['bans'][1]>): number;"
      },
      {
        "name": "sweepEmojis",
        "static": false,
        "signature": "public sweepEmojis( filter: CollectionSweepFilter<SweeperDefinitions['emojis'][0], SweeperDefinitions['emojis'][1]>, ): number;"
      },
      {
        "name": "sweepEntitlements",
        "static": false,
        "signature": "public sweepEntitlements( filter: CollectionSweepFilter<SweeperDefinitions['entitlements'][0], SweeperDefinitions['entitlements'][1]>, ): number;"
      },
      {
        "name": "sweepInvites",
        "static": false,
        "signature": "public sweepInvites( filter: CollectionSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>, ): number;"
      },
      {
        "name": "sweepGuildMembers",
        "static": false,
        "signature": "public sweepGuildMembers( filter: CollectionSweepFilter<SweeperDefinitions['guildMembers'][0], SweeperDefinitions['guildMembers'][1]>, ): number;"
      },
      {
        "name": "sweepMessages",
        "static": false,
        "signature": "public sweepMessages( filter: CollectionSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>, ): number;"
      },
      {
        "name": "sweepPresences",
        "static": false,
        "signature": "public sweepPresences( filter: CollectionSweepFilter<SweeperDefinitions['presences'][0], SweeperDefinitions['presences'][1]>, ): number;"
      },
      {
        "name": "sweepReactions",
        "static": false,
        "signature": "public sweepReactions( filter: CollectionSweepFilter<SweeperDefinitions['reactions'][0], SweeperDefinitions['reactions'][1]>, ): number;"
      },
      {
        "name": "sweepStageInstances",
        "static": false,
        "signature": "public sweepStageInstances( filter: CollectionSweepFilter<SweeperDefinitions['stageInstances'][0], SweeperDefinitions['stageInstances'][1]>, ): number;"
      },
      {
        "name": "sweepStickers",
        "static": false,
        "signature": "public sweepStickers( filter: CollectionSweepFilter<SweeperDefinitions['stickers'][0], SweeperDefinitions['stickers'][1]>, ): number;"
      },
      {
        "name": "sweepThreadMembers",
        "static": false,
        "signature": "public sweepThreadMembers( filter: CollectionSweepFilter<SweeperDefinitions['threadMembers'][0], SweeperDefinitions['threadMembers'][1]>, ): number;"
      },
      {
        "name": "sweepThreads",
        "static": false,
        "signature": "public sweepThreads( filter: CollectionSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>, ): number;"
      },
      {
        "name": "sweepUsers",
        "static": false,
        "signature": "public sweepUsers( filter: CollectionSweepFilter<SweeperDefinitions['users'][0], SweeperDefinitions['users'][1]>, ): number;"
      },
      {
        "name": "sweepVoiceStates",
        "static": false,
        "signature": "public sweepVoiceStates( filter: CollectionSweepFilter<SweeperDefinitions['voiceStates'][0], SweeperDefinitions['voiceStates'][1]>, ): number;"
      },
      {
        "name": "archivedThreadSweepFilter",
        "static": true,
        "signature": "public static archivedThreadSweepFilter( lifetime?: number, ): GlobalSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>;"
      },
      {
        "name": "expiredInviteSweepFilter",
        "static": true,
        "signature": "public static expiredInviteSweepFilter( lifetime?: number, ): GlobalSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>;"
      },
      {
        "name": "filterByLifetime",
        "static": true,
        "signature": "public static filterByLifetime<Key, Value>( options?: LifetimeFilterOptions<Key, Value>, ): GlobalSweepFilter<Key, Value>;"
      },
      {
        "name": "outdatedMessageSweepFilter",
        "static": true,
        "signature": "public static outdatedMessageSweepFilter( lifetime?: number, ): GlobalSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "intervals",
        "kind": "property",
        "static": false,
        "signature": "public intervals: Record<SweeperKey, NodeJS.Timeout | null>;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: SweeperOptions;"
      }
    ]
  },
  "SystemChannelFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<SystemChannelFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<SystemChannelFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof GuildSystemChannelFlags;"
      }
    ]
  },
  "Team": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "iconURL",
        "static": false,
        "signature": "public iconURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): string;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "public icon: string | null;"
      },
      {
        "name": "ownerId",
        "kind": "property",
        "static": false,
        "signature": "public ownerId: Snowflake | null;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: Collection<Snowflake, TeamMember>;"
      },
      {
        "name": "owner",
        "kind": "getter",
        "static": false,
        "signature": "public get owner(): TeamMember | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      }
    ]
  },
  "TeamMember": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): UserMention;"
      }
    ],
    "properties": [
      {
        "name": "team",
        "kind": "property",
        "static": false,
        "signature": "public team: Team;"
      },
      {
        "name": "id",
        "kind": "getter",
        "static": false,
        "signature": "public get id(): Snowflake;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: string[];"
      },
      {
        "name": "membershipState",
        "kind": "property",
        "static": false,
        "signature": "public membershipState: TeamMemberMembershipState;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User;"
      },
      {
        "name": "role",
        "kind": "property",
        "static": false,
        "signature": "public role: TeamMemberRole;"
      }
    ]
  },
  "TextChannel": {
    "kind": "class",
    "extends": [
      "BaseGuildTextChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public rateLimitPerUser: number;"
      },
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "public threads: GuildTextThreadManager<AllowedThreadTypeForTextChannel>;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildText;"
      }
    ]
  },
  "TextDisplayComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "content: string;"
      }
    ]
  },
  "TextDisplayComponent": {
    "kind": "class",
    "extends": [
      "Component<APITextDisplayComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "public readonly content: string;"
      }
    ]
  },
  "PublicThreadChannel": {
    "kind": "interface",
    "extends": [
      "ThreadChannel<Forum>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ChannelType.PublicThread | ChannelType.AnnouncementThread;"
      }
    ]
  },
  "PrivateThreadChannel": {
    "kind": "interface",
    "extends": [
      "ThreadChannel<false>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "get createdTimestamp(): number;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "get createdAt(): Date;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ChannelType.PrivateThread;"
      }
    ]
  },
  "ThreadChannel": {
    "kind": "class",
    "extends": [
      "BaseChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<this>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: ThreadEditOptions): Promise<this>;"
      },
      {
        "name": "join",
        "static": false,
        "signature": "public join(): Promise<this>;"
      },
      {
        "name": "leave",
        "static": false,
        "signature": "public leave(): Promise<this>;"
      },
      {
        "name": "permissionsFor",
        "static": false,
        "signature": "public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<PermissionsBitField>;"
      },
      {
        "name": "permissionsFor",
        "static": false,
        "signature": "public permissionsFor( memberOrRole: GuildMemberResolvable | RoleResolvable, checkAdmin?: boolean, ): Readonly<PermissionsBitField> | null;"
      },
      {
        "name": "fetchOwner",
        "static": false,
        "signature": "public fetchOwner(options?: FetchThreadOwnerOptions): Promise<ThreadMember | null>;"
      },
      {
        "name": "fetchStarterMessage",
        "static": false,
        "signature": "public fetchStarterMessage(options?: BaseFetchOptions): Promise<Message<true> | null>;"
      },
      {
        "name": "setArchived",
        "static": false,
        "signature": "public setArchived(archived?: boolean, reason?: string): Promise<this>;"
      },
      {
        "name": "setAutoArchiveDuration",
        "static": false,
        "signature": "public setAutoArchiveDuration(autoArchiveDuration: ThreadAutoArchiveDuration, reason?: string): Promise<this>;"
      },
      {
        "name": "setInvitable",
        "static": false,
        "signature": "public setInvitable(invitable?: boolean, reason?: string): Promise<this>;"
      },
      {
        "name": "setLocked",
        "static": false,
        "signature": "public setLocked(locked?: boolean, reason?: string): Promise<this>;"
      },
      {
        "name": "setName",
        "static": false,
        "signature": "public setName(name: string, reason?: string): Promise<this>;"
      },
      {
        "name": "setAppliedTags",
        "static": false,
        "signature": "public setAppliedTags(appliedTags: readonly Snowflake[], reason?: string): Promise<If<ThreadOnly, this, never>>;"
      },
      {
        "name": "pin",
        "static": false,
        "signature": "public pin(reason?: string): Promise<If<ThreadOnly, this, never>>;"
      },
      {
        "name": "unpin",
        "static": false,
        "signature": "public unpin(reason?: string): Promise<If<ThreadOnly, this, never>>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): ChannelMention;"
      }
    ],
    "properties": [
      {
        "name": "archived",
        "kind": "property",
        "static": false,
        "signature": "public archived: boolean | null;"
      },
      {
        "name": "archivedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get archivedAt(): Date | null;"
      },
      {
        "name": "archiveTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public archiveTimestamp: number | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date | null;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number | null;"
      },
      {
        "name": "autoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "public autoArchiveDuration: ThreadAutoArchiveDuration | null;"
      },
      {
        "name": "editable",
        "kind": "getter",
        "static": false,
        "signature": "public get editable(): boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<ChannelFlagsBitField>;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "guildMembers",
        "kind": "getter",
        "static": false,
        "signature": "public get guildMembers(): Collection<Snowflake, GuildMember>;"
      },
      {
        "name": "invitable",
        "kind": "property",
        "static": false,
        "signature": "public invitable: boolean | null;"
      },
      {
        "name": "joinable",
        "kind": "getter",
        "static": false,
        "signature": "public get joinable(): boolean;"
      },
      {
        "name": "joined",
        "kind": "getter",
        "static": false,
        "signature": "public get joined(): boolean;"
      },
      {
        "name": "locked",
        "kind": "property",
        "static": false,
        "signature": "public locked: boolean | null;"
      },
      {
        "name": "manageable",
        "kind": "getter",
        "static": false,
        "signature": "public get manageable(): boolean;"
      },
      {
        "name": "viewable",
        "kind": "getter",
        "static": false,
        "signature": "public get viewable(): boolean;"
      },
      {
        "name": "sendable",
        "kind": "getter",
        "static": false,
        "signature": "public get sendable(): boolean;"
      },
      {
        "name": "memberCount",
        "kind": "property",
        "static": false,
        "signature": "public memberCount: number | null;"
      },
      {
        "name": "messageCount",
        "kind": "property",
        "static": false,
        "signature": "public messageCount: number | null;"
      },
      {
        "name": "appliedTags",
        "kind": "property",
        "static": false,
        "signature": "public appliedTags: Snowflake[];"
      },
      {
        "name": "totalMessageSent",
        "kind": "property",
        "static": false,
        "signature": "public totalMessageSent: number | null;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: ThreadMemberManager;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "ownerId",
        "kind": "property",
        "static": false,
        "signature": "public ownerId: Snowflake;"
      },
      {
        "name": "parent",
        "kind": "getter",
        "static": false,
        "signature": "public get parent(): If<ThreadOnly, ForumChannel | MediaChannel, TextChannel | NewsChannel> | null;"
      },
      {
        "name": "parentId",
        "kind": "property",
        "static": false,
        "signature": "public parentId: Snowflake | null;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "public rateLimitPerUser: number | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ThreadChannelType;"
      },
      {
        "name": "unarchivable",
        "kind": "getter",
        "static": false,
        "signature": "public get unarchivable(): boolean;"
      }
    ]
  },
  "ThreadMember": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(): Promise<ThreadMember>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(reason?: string): Promise<ThreadMember>;"
      }
    ],
    "properties": [
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: ThreadMemberFlagsBitField;"
      },
      {
        "name": "guildMember",
        "kind": "getter",
        "static": false,
        "signature": "public get guildMember(): HasMemberData extends true ? GuildMember : GuildMember | null;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "joinedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get joinedAt(): Date | null;"
      },
      {
        "name": "joinedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public joinedTimestamp: number | null;"
      },
      {
        "name": "manageable",
        "kind": "getter",
        "static": false,
        "signature": "public get manageable(): boolean;"
      },
      {
        "name": "thread",
        "kind": "property",
        "static": false,
        "signature": "public thread: AnyThreadChannel;"
      },
      {
        "name": "user",
        "kind": "getter",
        "static": false,
        "signature": "public get user(): User | null;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      }
    ]
  },
  "ThreadMemberFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<ThreadMemberFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<ThreadMemberFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof ThreadMemberFlags;"
      }
    ]
  },
  "ThumbnailComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "media",
        "kind": "property",
        "static": false,
        "signature": "media: UnfurledMediaItemData;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "spoiler",
        "kind": "property",
        "static": false,
        "signature": "spoiler?: boolean;"
      }
    ]
  },
  "ThumbnailComponent": {
    "kind": "class",
    "extends": [
      "Component<APIThumbnailComponent>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "media",
        "kind": "property",
        "static": false,
        "signature": "public readonly media: UnfurledMediaItem;"
      },
      {
        "name": "description",
        "kind": "getter",
        "static": false,
        "signature": "public get description(): string | null;"
      },
      {
        "name": "spoiler",
        "kind": "getter",
        "static": false,
        "signature": "public get spoiler(): boolean;"
      }
    ]
  },
  "Typing": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is this & { channel: TextChannel | NewsChannel | ThreadChannel; get guild(): Guild; };"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: TextBasedChannel;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User | PartialUser;"
      },
      {
        "name": "startedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public startedTimestamp: number;"
      },
      {
        "name": "startedAt",
        "kind": "getter",
        "static": false,
        "signature": "public get startedAt(): Date;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "member",
        "kind": "getter",
        "static": false,
        "signature": "public get member(): GuildMember | null;"
      }
    ]
  },
  "AvatarDecorationData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "asset",
        "kind": "property",
        "static": false,
        "signature": "asset: string;"
      },
      {
        "name": "skuId",
        "kind": "property",
        "static": false,
        "signature": "skuId: Snowflake;"
      }
    ]
  },
  "Collectibles": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "nameplate",
        "kind": "property",
        "static": false,
        "signature": "nameplate: NameplateData | null;"
      }
    ]
  },
  "UserPrimaryGuild": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "badge",
        "kind": "property",
        "static": false,
        "signature": "badge: string | null;"
      },
      {
        "name": "identityEnabled",
        "kind": "property",
        "static": false,
        "signature": "identityEnabled: boolean | null;"
      },
      {
        "name": "identityGuildId",
        "kind": "property",
        "static": false,
        "signature": "identityGuildId: Snowflake | null;"
      },
      {
        "name": "tag",
        "kind": "property",
        "static": false,
        "signature": "tag: string | null;"
      }
    ]
  },
  "NameplateData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "asset",
        "kind": "property",
        "static": false,
        "signature": "asset: string;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "palette",
        "kind": "property",
        "static": false,
        "signature": "palette: NameplatePalette;"
      },
      {
        "name": "skuId",
        "kind": "property",
        "static": false,
        "signature": "skuId: Snowflake;"
      }
    ]
  },
  "UnfurledMediaItemData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "url: string;"
      }
    ]
  },
  "UnfurledMediaItem": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "data",
        "kind": "property",
        "static": false,
        "signature": "public readonly data: APIUnfurledMediaItem;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      }
    ]
  },
  "User": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "avatarURL",
        "static": false,
        "signature": "public avatarURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "avatarDecorationURL",
        "static": false,
        "signature": "public avatarDecorationURL(options?: BaseImageURLOptions): string | null;"
      },
      {
        "name": "bannerURL",
        "static": false,
        "signature": "public bannerURL(options?: ImageURLOptions): string | null | undefined;"
      },
      {
        "name": "guildTagBadgeURL",
        "static": false,
        "signature": "public guildTagBadgeURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "createDM",
        "static": false,
        "signature": "public createDM(force?: boolean): Promise<DMChannel>;"
      },
      {
        "name": "deleteDM",
        "static": false,
        "signature": "public deleteDM(): Promise<DMChannel>;"
      },
      {
        "name": "displayAvatarURL",
        "static": false,
        "signature": "public displayAvatarURL(options?: ImageURLOptions): string;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(user: User): boolean;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<User>;"
      },
      {
        "name": "fetchFlags",
        "static": false,
        "signature": "public fetchFlags(force?: boolean): Promise<UserFlagsBitField>;"
      },
      {
        "name": "toString",
        "static": false,
        "signature": "public toString(): UserMention;"
      }
    ],
    "properties": [
      {
        "name": "accentColor",
        "kind": "property",
        "static": false,
        "signature": "public accentColor: number | null | undefined;"
      },
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "public avatar: string | null;"
      },
      {
        "name": "avatarDecoration",
        "kind": "property",
        "static": false,
        "signature": "public avatarDecoration: string | null;"
      },
      {
        "name": "avatarDecorationData",
        "kind": "property",
        "static": false,
        "signature": "public avatarDecorationData: AvatarDecorationData | null;"
      },
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "public banner: string | null | undefined;"
      },
      {
        "name": "bot",
        "kind": "property",
        "static": false,
        "signature": "public bot: boolean;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "collectibles",
        "kind": "property",
        "static": false,
        "signature": "public collectibles: Collectibles | null;"
      },
      {
        "name": "discriminator",
        "kind": "property",
        "static": false,
        "signature": "public discriminator: string;"
      },
      {
        "name": "displayName",
        "kind": "getter",
        "static": false,
        "signature": "public get displayName(): string;"
      },
      {
        "name": "defaultAvatarURL",
        "kind": "getter",
        "static": false,
        "signature": "public get defaultAvatarURL(): string;"
      },
      {
        "name": "dmChannel",
        "kind": "getter",
        "static": false,
        "signature": "public get dmChannel(): DMChannel | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "public flags: Readonly<UserFlagsBitField> | null;"
      },
      {
        "name": "globalName",
        "kind": "property",
        "static": false,
        "signature": "public globalName: string | null;"
      },
      {
        "name": "hexAccentColor",
        "kind": "getter",
        "static": false,
        "signature": "public get hexAccentColor(): HexColorString | null | undefined;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "partial",
        "kind": "getter",
        "static": false,
        "signature": "public get partial(): false;"
      },
      {
        "name": "primaryGuild",
        "kind": "property",
        "static": false,
        "signature": "public primaryGuild: UserPrimaryGuild | null;"
      },
      {
        "name": "system",
        "kind": "property",
        "static": false,
        "signature": "public system: boolean;"
      },
      {
        "name": "tag",
        "kind": "getter",
        "static": false,
        "signature": "public get tag(): string;"
      },
      {
        "name": "username",
        "kind": "property",
        "static": false,
        "signature": "public username: string;"
      }
    ]
  },
  "UserContextMenuCommandInteraction": {
    "kind": "class",
    "extends": [
      "ContextMenuCommandInteraction<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "inGuild",
        "static": false,
        "signature": "public inGuild(): this is UserContextMenuCommandInteraction<'raw' | 'cached'>;"
      },
      {
        "name": "inCachedGuild",
        "static": false,
        "signature": "public inCachedGuild(): this is UserContextMenuCommandInteraction<'cached'>;"
      },
      {
        "name": "inRawGuild",
        "static": false,
        "signature": "public inRawGuild(): this is UserContextMenuCommandInteraction<'raw'>;"
      }
    ],
    "properties": [
      {
        "name": "commandType",
        "kind": "property",
        "static": false,
        "signature": "public commandType: ApplicationCommandType.User;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: Omit< CommandInteractionOptionResolver<Cached>, | 'getMessage' | 'getFocused' | 'getMentionable' | 'getRole' | 'getNumber' | 'getAttachment' | 'getInteger' | 'getString' | 'getChannel' | 'getBoolean' | 'getSubcommandGroup' | 'getSubcommand' >;"
      },
      {
        "name": "targetUser",
        "kind": "getter",
        "static": false,
        "signature": "public get targetUser(): User;"
      },
      {
        "name": "targetMember",
        "kind": "getter",
        "static": false,
        "signature": "public get targetMember(): CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember> | null;"
      }
    ]
  },
  "UserFlagsBitField": {
    "kind": "class",
    "extends": [
      "BitField<UserFlagsString>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": true,
        "signature": "public static resolve(bit?: BitFieldResolvable<UserFlagsString, number>): number;"
      }
    ],
    "properties": [
      {
        "name": "Flags",
        "kind": "property",
        "static": true,
        "signature": "public static Flags: typeof UserFlags;"
      }
    ]
  },
  "CreateChannelOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "allowFromUnknownGuild",
        "kind": "property",
        "static": false,
        "signature": "allowFromUnknownGuild?: boolean;"
      }
    ]
  },
  "Formatters": {
    "kind": "class",
    "extends": [
      "null"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "blockQuote",
        "kind": "property",
        "static": true,
        "signature": "public static blockQuote: typeof blockQuote;"
      },
      {
        "name": "bold",
        "kind": "property",
        "static": true,
        "signature": "public static bold: typeof bold;"
      },
      {
        "name": "channelMention",
        "kind": "property",
        "static": true,
        "signature": "public static channelMention: typeof channelMention;"
      },
      {
        "name": "codeBlock",
        "kind": "property",
        "static": true,
        "signature": "public static codeBlock: typeof codeBlock;"
      },
      {
        "name": "formatEmoji",
        "kind": "property",
        "static": true,
        "signature": "public static formatEmoji: typeof formatEmoji;"
      },
      {
        "name": "hideLinkEmbed",
        "kind": "property",
        "static": true,
        "signature": "public static hideLinkEmbed: typeof hideLinkEmbed;"
      },
      {
        "name": "hyperlink",
        "kind": "property",
        "static": true,
        "signature": "public static hyperlink: typeof hyperlink;"
      },
      {
        "name": "inlineCode",
        "kind": "property",
        "static": true,
        "signature": "public static inlineCode: typeof inlineCode;"
      },
      {
        "name": "italic",
        "kind": "property",
        "static": true,
        "signature": "public static italic: typeof italic;"
      },
      {
        "name": "quote",
        "kind": "property",
        "static": true,
        "signature": "public static quote: typeof quote;"
      },
      {
        "name": "roleMention",
        "kind": "property",
        "static": true,
        "signature": "public static roleMention: typeof roleMention;"
      },
      {
        "name": "spoiler",
        "kind": "property",
        "static": true,
        "signature": "public static spoiler: typeof spoiler;"
      },
      {
        "name": "strikethrough",
        "kind": "property",
        "static": true,
        "signature": "public static strikethrough: typeof strikethrough;"
      },
      {
        "name": "time",
        "kind": "property",
        "static": true,
        "signature": "public static time: typeof time;"
      },
      {
        "name": "TimestampStyles",
        "kind": "property",
        "static": true,
        "signature": "public static TimestampStyles: typeof TimestampStyles;"
      },
      {
        "name": "underscore",
        "kind": "property",
        "static": true,
        "signature": "public static underscore: typeof underscore;"
      },
      {
        "name": "userMention",
        "kind": "property",
        "static": true,
        "signature": "public static userMention: typeof userMention;"
      }
    ]
  },
  "SendSoundboardSoundOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "soundId",
        "kind": "property",
        "static": false,
        "signature": "soundId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId?: Snowflake;"
      }
    ]
  },
  "VoiceChannel": {
    "kind": "class",
    "extends": [
      "BaseGuildVoiceChannel"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "sendSoundboardSound",
        "static": false,
        "signature": "public sendSoundboardSound(sound: SoundboardSound | SendSoundboardSoundOptions): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "speakable",
        "kind": "getter",
        "static": false,
        "signature": "public get speakable(): boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: ChannelType.GuildVoice;"
      }
    ]
  },
  "VoiceChannelEffect": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "userId",
        "kind": "property",
        "static": false,
        "signature": "public userId: Snowflake;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "public emoji: Emoji | null;"
      },
      {
        "name": "animationType",
        "kind": "property",
        "static": false,
        "signature": "public animationType: VoiceChannelEffectSendAnimationType | null;"
      },
      {
        "name": "animationId",
        "kind": "property",
        "static": false,
        "signature": "public animationId: number | null;"
      },
      {
        "name": "soundId",
        "kind": "property",
        "static": false,
        "signature": "public soundId: Snowflake | number | null;"
      },
      {
        "name": "soundVolume",
        "kind": "property",
        "static": false,
        "signature": "public soundVolume: number | null;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): VoiceChannel | null;"
      },
      {
        "name": "soundboardSound",
        "kind": "getter",
        "static": false,
        "signature": "public get soundboardSound(): GuildSoundboardSound | null;"
      }
    ]
  },
  "VoiceRegion": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "toJSON",
        "static": false,
        "signature": "public toJSON(): unknown;"
      }
    ],
    "properties": [
      {
        "name": "custom",
        "kind": "property",
        "static": false,
        "signature": "public custom: boolean;"
      },
      {
        "name": "deprecated",
        "kind": "property",
        "static": false,
        "signature": "public deprecated: boolean;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: string;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "optimal",
        "kind": "property",
        "static": false,
        "signature": "public optimal: boolean;"
      }
    ]
  },
  "VoiceState": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "setDeaf",
        "static": false,
        "signature": "public setDeaf(deaf?: boolean, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "setMute",
        "static": false,
        "signature": "public setMute(mute?: boolean, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "disconnect",
        "static": false,
        "signature": "public disconnect(reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "setChannel",
        "static": false,
        "signature": "public setChannel(channel: GuildVoiceChannelResolvable | null, reason?: string): Promise<GuildMember>;"
      },
      {
        "name": "setRequestToSpeak",
        "static": false,
        "signature": "public setRequestToSpeak(request?: boolean): Promise<this>;"
      },
      {
        "name": "setSuppressed",
        "static": false,
        "signature": "public setSuppressed(suppressed?: boolean): Promise<this>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options: VoiceStateEditOptions): Promise<this>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(force?: boolean): Promise<VoiceState>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): VoiceBasedChannel | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "deaf",
        "kind": "getter",
        "static": false,
        "signature": "public get deaf(): boolean | null;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "member",
        "kind": "getter",
        "static": false,
        "signature": "public get member(): GuildMember | null;"
      },
      {
        "name": "mute",
        "kind": "getter",
        "static": false,
        "signature": "public get mute(): boolean | null;"
      },
      {
        "name": "selfDeaf",
        "kind": "property",
        "static": false,
        "signature": "public selfDeaf: boolean | null;"
      },
      {
        "name": "selfMute",
        "kind": "property",
        "static": false,
        "signature": "public selfMute: boolean | null;"
      },
      {
        "name": "serverDeaf",
        "kind": "property",
        "static": false,
        "signature": "public serverDeaf: boolean | null;"
      },
      {
        "name": "serverMute",
        "kind": "property",
        "static": false,
        "signature": "public serverMute: boolean | null;"
      },
      {
        "name": "sessionId",
        "kind": "property",
        "static": false,
        "signature": "public sessionId: string | null;"
      },
      {
        "name": "streaming",
        "kind": "property",
        "static": false,
        "signature": "public streaming: boolean | null;"
      },
      {
        "name": "selfVideo",
        "kind": "property",
        "static": false,
        "signature": "public selfVideo: boolean | null;"
      },
      {
        "name": "suppress",
        "kind": "property",
        "static": false,
        "signature": "public suppress: boolean | null;"
      },
      {
        "name": "requestToSpeakTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public requestToSpeakTimestamp: number | null;"
      }
    ]
  },
  "Webhook": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "avatarURL",
        "static": false,
        "signature": "public avatarURL(options?: ImageURLOptions): string | null;"
      },
      {
        "name": "isUserCreated",
        "static": false,
        "signature": "public isUserCreated(): this is Webhook<WebhookType.Incoming> & { owner: User | APIUser; };"
      },
      {
        "name": "isApplicationCreated",
        "static": false,
        "signature": "public isApplicationCreated(): this is Webhook<WebhookType.Application>;"
      },
      {
        "name": "isIncoming",
        "static": false,
        "signature": "public isIncoming(): this is Webhook<WebhookType.Incoming>;"
      },
      {
        "name": "isChannelFollower",
        "static": false,
        "signature": "public isChannelFollower(): this is Webhook<WebhookType.ChannelFollower>;"
      },
      {
        "name": "editMessage",
        "static": false,
        "signature": "public editMessage( message: MessageResolvable, options: string | MessagePayload | WebhookMessageEditOptions, ): Promise<Message<true>>;"
      },
      {
        "name": "fetchMessage",
        "static": false,
        "signature": "public fetchMessage(message: Snowflake, options?: WebhookFetchMessageOptions): Promise<Message<true>>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "public send(options: string | MessagePayload | WebhookMessageCreateOptions): Promise<Message<true>>;"
      }
    ],
    "properties": [
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "public avatar: string | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "owner",
        "kind": "property",
        "static": false,
        "signature": "public owner: Type extends WebhookType.Incoming ? User | APIUser | null : User | APIUser;"
      },
      {
        "name": "sourceGuild",
        "kind": "property",
        "static": false,
        "signature": "public sourceGuild: Type extends WebhookType.ChannelFollower ? Guild | APIPartialGuild : null;"
      },
      {
        "name": "sourceChannel",
        "kind": "property",
        "static": false,
        "signature": "public sourceChannel: Type extends WebhookType.ChannelFollower ? NewsChannel | APIPartialChannel : null;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public token: Type extends WebhookType.Incoming ? string : Type extends WebhookType.ChannelFollower ? null : string | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "public type: Type;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "public applicationId: Type extends WebhookType.Application ? Snowflake : null;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): TextChannel | VoiceChannel | NewsChannel | StageChannel | ForumChannel | MediaChannel | null;"
      }
    ]
  },
  "WebhookClient": {
    "kind": "class",
    "extends": [
      "BaseClient"
    ],
    "implements": [],
    "constructors": [
      "public constructor(data: WebhookClientData, options?: WebhookClientOptions);"
    ],
    "methods": [
      {
        "name": "editMessage",
        "static": false,
        "signature": "public editMessage( message: MessageResolvable, options: string | MessagePayload | WebhookMessageEditOptions, ): Promise<APIMessage>;"
      },
      {
        "name": "fetchMessage",
        "static": false,
        "signature": "public fetchMessage(message: Snowflake, options?: WebhookFetchMessageOptions): Promise<APIMessage>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "public send(options: string | MessagePayload | WebhookMessageCreateOptions): Promise<APIMessage>;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: this;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "public options: WebhookClientOptions;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "public token: string;"
      }
    ]
  },
  "WebSocketManager": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "on",
        "static": false,
        "signature": "public on(event: GatewayDispatchEvents, listener: (data: any, shardId: number) => void): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once(event: GatewayDispatchEvents, listener: (data: any, shardId: number) => void): this;"
      }
    ],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      },
      {
        "name": "gateway",
        "kind": "property",
        "static": false,
        "signature": "public gateway: string | null;"
      },
      {
        "name": "shards",
        "kind": "property",
        "static": false,
        "signature": "public shards: Collection<number, WebSocketShard>;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: Status;"
      },
      {
        "name": "ping",
        "kind": "getter",
        "static": false,
        "signature": "public get ping(): number;"
      }
    ]
  },
  "WebSocketShardEventTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "ready",
        "kind": "property",
        "static": false,
        "signature": "ready: [];"
      },
      {
        "name": "resumed",
        "kind": "property",
        "static": false,
        "signature": "resumed: [];"
      },
      {
        "name": "invalidSession",
        "kind": "property",
        "static": false,
        "signature": "invalidSession: [];"
      },
      {
        "name": "destroyed",
        "kind": "property",
        "static": false,
        "signature": "destroyed: [];"
      },
      {
        "name": "close",
        "kind": "property",
        "static": false,
        "signature": "close: [event: CloseEvent];"
      },
      {
        "name": "allReady",
        "kind": "property",
        "static": false,
        "signature": "allReady: [unavailableGuilds?: Set<Snowflake>];"
      }
    ]
  },
  "WebSocketShard": {
    "kind": "class",
    "extends": [
      "EventEmitter"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "send",
        "static": false,
        "signature": "public send(data: unknown, important?: boolean): void;"
      },
      {
        "name": "on",
        "static": false,
        "signature": "public on<Event extends keyof WebSocketShardEventTypes>( event: Event, listener: (...args: WebSocketShardEventTypes[Event]) => void, ): this;"
      },
      {
        "name": "once",
        "static": false,
        "signature": "public once<Event extends keyof WebSocketShardEventTypes>( event: Event, listener: (...args: WebSocketShardEventTypes[Event]) => void, ): this;"
      }
    ],
    "properties": [
      {
        "name": "lastPingTimestamp",
        "kind": "property",
        "static": false,
        "signature": "public lastPingTimestamp: number;"
      },
      {
        "name": "manager",
        "kind": "property",
        "static": false,
        "signature": "public manager: WebSocketManager;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: number;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: Status;"
      },
      {
        "name": "ping",
        "kind": "property",
        "static": false,
        "signature": "public ping: number;"
      }
    ]
  },
  "Widget": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<Widget>;"
      },
      {
        "name": "imageURL",
        "static": false,
        "signature": "public imageURL(style?: GuildWidgetStyle): string;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "instantInvite",
        "kind": "property",
        "static": false,
        "signature": "public instantInvite?: string;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "public channels: Collection<Snowflake, WidgetChannel>;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "public members: Collection<string, WidgetMember>;"
      },
      {
        "name": "presenceCount",
        "kind": "property",
        "static": false,
        "signature": "public presenceCount: number;"
      }
    ]
  },
  "WidgetMember": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "public id: string;"
      },
      {
        "name": "username",
        "kind": "property",
        "static": false,
        "signature": "public username: string;"
      },
      {
        "name": "discriminator",
        "kind": "property",
        "static": false,
        "signature": "public discriminator: string;"
      },
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "public avatar: string | null;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "public status: PresenceStatus;"
      },
      {
        "name": "deaf",
        "kind": "property",
        "static": false,
        "signature": "public deaf: boolean | null;"
      },
      {
        "name": "mute",
        "kind": "property",
        "static": false,
        "signature": "public mute: boolean | null;"
      },
      {
        "name": "selfDeaf",
        "kind": "property",
        "static": false,
        "signature": "public selfDeaf: boolean | null;"
      },
      {
        "name": "selfMute",
        "kind": "property",
        "static": false,
        "signature": "public selfMute: boolean | null;"
      },
      {
        "name": "suppress",
        "kind": "property",
        "static": false,
        "signature": "public suppress: boolean | null;"
      },
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake | null;"
      },
      {
        "name": "avatarURL",
        "kind": "property",
        "static": false,
        "signature": "public avatarURL: string;"
      },
      {
        "name": "activity",
        "kind": "property",
        "static": false,
        "signature": "public activity: WidgetActivity | null;"
      }
    ]
  },
  "SoundboardSound": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(options?: GuildSoundboardSoundEditOptions): Promise<GuildSoundboardSound>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(reason?: string): Promise<GuildSoundboardSound>;"
      },
      {
        "name": "equals",
        "static": false,
        "signature": "public equals(other: SoundboardSound | APISoundboardSound): boolean;"
      }
    ],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "public name: string;"
      },
      {
        "name": "soundId",
        "kind": "property",
        "static": false,
        "signature": "public soundId: Snowflake | string;"
      },
      {
        "name": "volume",
        "kind": "property",
        "static": false,
        "signature": "public volume: number;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      },
      {
        "name": "available",
        "kind": "property",
        "static": false,
        "signature": "public available: boolean;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "public user: User | null;"
      },
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "public get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "public get createdTimestamp(): number;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): Emoji | null;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild | null;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "public get url(): string;"
      }
    ]
  },
  "WelcomeChannel": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "public channelId: Snowflake;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild | InviteGuild;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string;"
      },
      {
        "name": "channel",
        "kind": "getter",
        "static": false,
        "signature": "public get channel(): TextChannel | NewsChannel | ForumChannel | MediaChannel | null;"
      },
      {
        "name": "emoji",
        "kind": "getter",
        "static": false,
        "signature": "public get emoji(): GuildEmoji | Emoji;"
      }
    ]
  },
  "WelcomeScreen": {
    "kind": "class",
    "extends": [
      "Base"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "enabled",
        "kind": "getter",
        "static": false,
        "signature": "public get enabled(): boolean;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild | InviteGuild;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "public description: string | null;"
      },
      {
        "name": "welcomeChannels",
        "kind": "property",
        "static": false,
        "signature": "public welcomeChannels: Collection<Snowflake, WelcomeChannel>;"
      }
    ]
  },
  "DiscordjsError": {
    "kind": "class",
    "extends": [
      "Error"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "public readonly code: DiscordjsErrorCodes;"
      },
      {
        "name": "name",
        "kind": "getter",
        "static": false,
        "signature": "public get name(): `Error [${DiscordjsErrorCodes}]`;"
      }
    ]
  },
  "DiscordjsTypeError": {
    "kind": "class",
    "extends": [
      "TypeError"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "public readonly code: DiscordjsErrorCodes;"
      },
      {
        "name": "name",
        "kind": "getter",
        "static": false,
        "signature": "public get name(): `TypeError [${DiscordjsErrorCodes}]`;"
      }
    ]
  },
  "DiscordjsRangeError": {
    "kind": "class",
    "extends": [
      "RangeError"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "public readonly code: DiscordjsErrorCodes;"
      },
      {
        "name": "name",
        "kind": "getter",
        "static": false,
        "signature": "public get name(): `RangeError [${DiscordjsErrorCodes}]`;"
      }
    ]
  },
  "BaseManager": {
    "kind": "class",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "public readonly client: Client;"
      }
    ]
  },
  "DataManager": {
    "kind": "class",
    "extends": [
      "BaseManager"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolve",
        "static": false,
        "signature": "public resolve(resolvable: Holds): Holds;"
      },
      {
        "name": "resolve",
        "static": false,
        "signature": "public resolve(resolvable: Resolvable): Holds | null;"
      },
      {
        "name": "resolveId",
        "static": false,
        "signature": "public resolveId(resolvable: Key | Holds): Key;"
      },
      {
        "name": "resolveId",
        "static": false,
        "signature": "public resolveId(resolvable: Resolvable): Key | null;"
      },
      {
        "name": "valueOf",
        "static": false,
        "signature": "public valueOf(): Collection<Key, Holds>;"
      }
    ],
    "properties": [
      {
        "name": "holds",
        "kind": "property",
        "static": false,
        "signature": "public readonly holds: Constructable<Holds>;"
      },
      {
        "name": "cache",
        "kind": "getter",
        "static": false,
        "signature": "public get cache(): Collection<Key, Holds>;"
      }
    ]
  },
  "CachedManager": {
    "kind": "class",
    "extends": [
      "DataManager<Key, Holds, Resolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ApplicationCommandManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, ApplicationCommandScope, ApplicationCommandResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(command: ApplicationCommandDataResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope | null>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( command: ApplicationCommandResolvable, data: Partial<ApplicationCommandDataResolvable>, ): Promise<ApplicationCommandScope>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( command: ApplicationCommandResolvable, data: Partial<ApplicationCommandDataResolvable>, guildId: Snowflake, ): Promise<ApplicationCommand>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( id: Snowflake, options: FetchApplicationCommandOptions & { guildId: Snowflake }, ): Promise<ApplicationCommand>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: FetchApplicationCommandOptions): Promise<Collection<Snowflake, ApplicationCommandScope>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: FetchApplicationCommandOptions): Promise<ApplicationCommandScope>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( id?: Snowflake, options?: FetchApplicationCommandOptions, ): Promise<Collection<Snowflake, ApplicationCommandScope>>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set( commands: readonly ApplicationCommandDataResolvable[], ): Promise<Collection<Snowflake, ApplicationCommandScope>>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set( commands: readonly ApplicationCommandDataResolvable[], guildId: Snowflake, ): Promise<Collection<Snowflake, ApplicationCommand>>;"
      }
    ],
    "properties": [
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "public permissions: ApplicationCommandPermissionsManager< { command?: ApplicationCommandResolvable } & PermissionsOptionsExtras, { command: ApplicationCommandResolvable } & PermissionsOptionsExtras, PermissionsGuildType, null >;"
      }
    ]
  },
  "ApplicationCommandPermissionsManager": {
    "kind": "class",
    "extends": [
      "BaseManager"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add( options: FetchSingleOptions & EditApplicationCommandPermissionsMixin, ): Promise<ApplicationCommandPermissions[]>;"
      },
      {
        "name": "has",
        "static": false,
        "signature": "public has( options: FetchSingleOptions & { permissionId: ApplicationCommandPermissionIdResolvable; permissionType?: ApplicationCommandPermissionType; }, ): Promise<boolean>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: FetchSingleOptions): Promise<ApplicationCommandPermissions[]>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: BaseOptions): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove( options: | (FetchSingleOptions & { token: string; channels?: readonly (GuildChannelResolvable | ChannelPermissionConstant)[]; roles?: readonly (RoleResolvable | RolePermissionConstant)[]; users: readonly UserResolvable[]; }) | (FetchSingleOptions & { token: string; channels?: readonly (GuildChannelResolvable | ChannelPermissionConstant)[]; roles: readonly (RoleResolvable | RolePermissionConstant)[]; users?: readonly UserResolvable[]; }) | (FetchSingleOptions & { token: string; channels: readonly (GuildChannelResolvable | ChannelPermissionConstant)[]; roles?: readonly (RoleResolvable | RolePermissionConstant)[]; users?: readonly UserResolvable[]; }), ): Promise<ApplicationCommandPermissions[]>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set( options: FetchSingleOptions & EditApplicationCommandPermissionsMixin, ): Promise<ApplicationCommandPermissions[]>;"
      }
    ],
    "properties": [
      {
        "name": "commandId",
        "kind": "property",
        "static": false,
        "signature": "public commandId: CommandIdType;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: GuildType;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "public guildId: Snowflake | null;"
      }
    ]
  },
  "AutoModerationRuleManager": {
    "kind": "class",
    "extends": [
      "CachedManager< Snowflake, AutoModerationRule, AutoModerationRuleResolvable >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: AutoModerationRuleCreateOptions): Promise<AutoModerationRule>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( autoModerationRule: AutoModerationRuleResolvable, options: AutoModerationRuleEditOptions, ): Promise<AutoModerationRule>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: AutoModerationRuleResolvable | FetchAutoModerationRuleOptions): Promise<AutoModerationRule>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchAutoModerationRulesOptions): Promise<Collection<Snowflake, AutoModerationRule>>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(autoModerationRule: AutoModerationRuleResolvable, reason?: string): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "BaseGuildEmojiManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, GuildEmoji, EmojiResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "resolveIdentifier",
        "static": false,
        "signature": "public resolveIdentifier(emoji: EmojiIdentifierResolvable): string | null;"
      }
    ],
    "properties": []
  },
  "CategoryChannelChildManager": {
    "kind": "class",
    "extends": [
      "DataManager<Snowflake, CategoryChildChannel, GuildChannelResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create<Type extends CategoryChannelType>( options: CategoryCreateChannelOptions & { type: Type }, ): Promise<MappedChannelCategoryTypes[Type]>;"
      },
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: CategoryCreateChannelOptions): Promise<TextChannel>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: CategoryChannel;"
      },
      {
        "name": "guild",
        "kind": "getter",
        "static": false,
        "signature": "public get guild(): Guild;"
      }
    ]
  },
  "ChannelManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Channel, ChannelResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: FetchChannelOptions): Promise<Channel | null>;"
      }
    ],
    "properties": []
  },
  "GuildEntitlementCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "sku",
        "kind": "property",
        "static": false,
        "signature": "sku: SKUResolvable;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild: GuildResolvable;"
      }
    ]
  },
  "UserEntitlementCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "sku",
        "kind": "property",
        "static": false,
        "signature": "sku: SKUResolvable;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: UserResolvable;"
      }
    ]
  },
  "FetchEntitlementOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "entitlement",
        "kind": "property",
        "static": false,
        "signature": "entitlement: EntitlementResolvable;"
      }
    ]
  },
  "FetchEntitlementsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild?: GuildResolvable;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user?: UserResolvable;"
      },
      {
        "name": "skus",
        "kind": "property",
        "static": false,
        "signature": "skus?: readonly SKUResolvable[];"
      },
      {
        "name": "excludeEnded",
        "kind": "property",
        "static": false,
        "signature": "excludeEnded?: boolean;"
      },
      {
        "name": "excludeDeleted",
        "kind": "property",
        "static": false,
        "signature": "excludeDeleted?: boolean;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      },
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      }
    ]
  },
  "EntitlementManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Entitlement, EntitlementResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: EntitlementResolvable | FetchEntitlementOptions): Promise<Entitlement>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchEntitlementsOptions): Promise<Collection<Snowflake, Entitlement>>;"
      },
      {
        "name": "createTest",
        "static": false,
        "signature": "public createTest(options: GuildEntitlementCreateOptions | UserEntitlementCreateOptions): Promise<Entitlement>;"
      },
      {
        "name": "deleteTest",
        "static": false,
        "signature": "public deleteTest(entitlement: EntitlementResolvable): Promise<void>;"
      },
      {
        "name": "consume",
        "static": false,
        "signature": "public consume(entitlementId: Snowflake): Promise<void>;"
      }
    ],
    "properties": []
  },
  "FetchSubscriptionOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "sku",
        "kind": "property",
        "static": false,
        "signature": "sku: SKUResolvable;"
      },
      {
        "name": "subscriptionId",
        "kind": "property",
        "static": false,
        "signature": "subscriptionId: Snowflake;"
      }
    ]
  },
  "FetchSubscriptionsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "sku",
        "kind": "property",
        "static": false,
        "signature": "sku: SKUResolvable;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: UserResolvable;"
      }
    ]
  },
  "SubscriptionManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Subscription, SubscriptionResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: FetchSubscriptionOptions): Promise<Subscription>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: FetchSubscriptionsOptions): Promise<Collection<Snowflake, Subscription>>;"
      }
    ],
    "properties": []
  },
  "FetchGuildApplicationCommandFetchOptions": {
    "kind": "interface",
    "extends": [
      "Omit<FetchApplicationCommandOptions, 'guildId'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "GuildApplicationCommandManager": {
    "kind": "class",
    "extends": [
      "ApplicationCommandManager<ApplicationCommand, {}, Guild>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(command: ApplicationCommandDataResolvable): Promise<ApplicationCommand>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(command: ApplicationCommandResolvable): Promise<ApplicationCommand | null>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( command: ApplicationCommandResolvable, data: Partial<ApplicationCommandDataResolvable>, ): Promise<ApplicationCommand>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: FetchGuildApplicationCommandFetchOptions): Promise<ApplicationCommand>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: FetchGuildApplicationCommandFetchOptions): Promise<Collection<Snowflake, ApplicationCommand>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( id?: undefined, options?: FetchGuildApplicationCommandFetchOptions, ): Promise<Collection<Snowflake, ApplicationCommand>>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set(commands: readonly ApplicationCommandDataResolvable[]): Promise<Collection<Snowflake, ApplicationCommand>>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildChannelManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, GuildBasedChannel, GuildChannelResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "addFollower",
        "static": false,
        "signature": "public addFollower( channel: NewsChannelResolvable, targetChannel: TextChannelResolvable, reason?: string, ): Promise<Snowflake>;"
      },
      {
        "name": "create",
        "static": false,
        "signature": "public create<Type extends GuildChannelTypes>( options: GuildChannelCreateOptions & { type: Type }, ): Promise<MappedGuildChannelTypes[Type]>;"
      },
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildChannelCreateOptions): Promise<TextChannel>;"
      },
      {
        "name": "createWebhook",
        "static": false,
        "signature": "public createWebhook(options: WebhookCreateOptions): Promise<Webhook<WebhookType.Incoming>>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(channel: GuildChannelResolvable, data: GuildChannelEditOptions): Promise<GuildChannel>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildBasedChannel | null>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( id?: undefined, options?: BaseFetchOptions, ): Promise<Collection<Snowflake, NonThreadGuildBasedChannel | null>>;"
      },
      {
        "name": "fetchWebhooks",
        "static": false,
        "signature": "public fetchWebhooks( channel: GuildChannelResolvable, ): Promise<Collection<Snowflake, Webhook<WebhookType.ChannelFollower | WebhookType.Incoming>>>;"
      },
      {
        "name": "setPosition",
        "static": false,
        "signature": "public setPosition( channel: GuildChannelResolvable, position: number, options?: SetChannelPositionOptions, ): Promise<GuildChannel>;"
      },
      {
        "name": "setPositions",
        "static": false,
        "signature": "public setPositions(channelPositions: readonly ChannelPosition[]): Promise<Guild>;"
      },
      {
        "name": "fetchActiveThreads",
        "static": false,
        "signature": "public fetchActiveThreads(cache?: boolean): Promise<FetchedThreads>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(channel: GuildChannelResolvable, reason?: string): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "channelCountWithoutThreads",
        "kind": "getter",
        "static": false,
        "signature": "public get channelCountWithoutThreads(): number;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildEmojiManager": {
    "kind": "class",
    "extends": [
      "BaseGuildEmojiManager"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildEmojiCreateOptions): Promise<GuildEmoji>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildEmoji>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, GuildEmoji>>;"
      },
      {
        "name": "fetchAuthor",
        "static": false,
        "signature": "public fetchAuthor(emoji: EmojiResolvable): Promise<User>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(emoji: EmojiResolvable, reason?: string): Promise<void>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(emoji: EmojiResolvable, options: GuildEmojiEditOptions): Promise<GuildEmoji>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildEmojiRoleManager": {
    "kind": "class",
    "extends": [
      "DataManager<Snowflake, Role, RoleResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add( roleOrRoles: RoleResolvable | readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>, ): Promise<GuildEmoji>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set(roles: readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>): Promise<GuildEmoji>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove( roleOrRoles: RoleResolvable | readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>, ): Promise<GuildEmoji>;"
      }
    ],
    "properties": [
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "public emoji: GuildEmoji;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "FetchSoundboardSoundsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildIds",
        "kind": "property",
        "static": false,
        "signature": "guildIds: readonly Snowflake[];"
      },
      {
        "name": "time",
        "kind": "property",
        "static": false,
        "signature": "time?: number;"
      }
    ]
  },
  "GuildManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Guild, GuildResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildCreateOptions): Promise<Guild>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: Snowflake | FetchGuildOptions): Promise<Guild>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchGuildsOptions): Promise<Collection<Snowflake, OAuth2Guild>>;"
      },
      {
        "name": "fetchSoundboardSounds",
        "static": false,
        "signature": "public fetchSoundboardSounds( options: FetchSoundboardSoundsOptions, ): Promise<Collection<Snowflake, Collection<Snowflake, GuildSoundboardSound>>>;"
      },
      {
        "name": "setIncidentActions",
        "static": false,
        "signature": "public setIncidentActions( guild: GuildResolvable, incidentActions: IncidentActionsEditOptions, ): Promise<IncidentActions>;"
      },
      {
        "name": "widgetImageURL",
        "static": false,
        "signature": "public widgetImageURL(guild: GuildResolvable, style?: GuildWidgetStyle): string;"
      }
    ],
    "properties": []
  },
  "AddOrRemoveGuildMemberRoleOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: GuildMemberResolvable;"
      },
      {
        "name": "role",
        "kind": "property",
        "static": false,
        "signature": "role: RoleResolvable;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildMemberManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, GuildMember, GuildMemberResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add( user: UserResolvable, options: AddGuildMemberOptions & { fetchWhenExisting: false }, ): Promise<GuildMember | null>;"
      },
      {
        "name": "add",
        "static": false,
        "signature": "public add(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember>;"
      },
      {
        "name": "ban",
        "static": false,
        "signature": "public ban(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;"
      },
      {
        "name": "bulkBan",
        "static": false,
        "signature": "public bulkBan( users: ReadonlyCollection<Snowflake, UserResolvable> | readonly UserResolvable[], options?: BulkBanOptions, ): Promise<BulkBanResult>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(user: UserResolvable, options: GuildMemberEditOptions): Promise<GuildMember>;"
      },
      {
        "name": "editMe",
        "static": false,
        "signature": "public editMe(options: GuildMemberEditMeOptions): Promise<GuildMember>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( options: UserResolvable | FetchMemberOptions | (FetchMembersOptions & { user: UserResolvable }), ): Promise<GuildMember>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;"
      },
      {
        "name": "fetchMe",
        "static": false,
        "signature": "public fetchMe(options?: BaseFetchOptions): Promise<GuildMember>;"
      },
      {
        "name": "kick",
        "static": false,
        "signature": "public kick(user: UserResolvable, reason?: string): Promise<GuildMember | User | Snowflake>;"
      },
      {
        "name": "list",
        "static": false,
        "signature": "public list(options?: GuildListMembersOptions): Promise<Collection<Snowflake, GuildMember>>;"
      },
      {
        "name": "prune",
        "static": false,
        "signature": "public prune(options: GuildPruneMembersOptions & { dry?: false; count: false }): Promise<null>;"
      },
      {
        "name": "prune",
        "static": false,
        "signature": "public prune(options?: GuildPruneMembersOptions): Promise<number>;"
      },
      {
        "name": "search",
        "static": false,
        "signature": "public search(options: GuildSearchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;"
      },
      {
        "name": "unban",
        "static": false,
        "signature": "public unban(user: UserResolvable, reason?: string): Promise<User | null>;"
      },
      {
        "name": "addRole",
        "static": false,
        "signature": "public addRole(options: AddOrRemoveGuildMemberRoleOptions): Promise<GuildMember | User | Snowflake>;"
      },
      {
        "name": "removeRole",
        "static": false,
        "signature": "public removeRole(options: AddOrRemoveGuildMemberRoleOptions): Promise<GuildMember | User | Snowflake>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "me",
        "kind": "getter",
        "static": false,
        "signature": "public get me(): GuildMember | null;"
      }
    ]
  },
  "GuildBanManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, GuildBan, GuildBanResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: UserResolvable | FetchBanOptions): Promise<GuildBan>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchBansOptions): Promise<Collection<Snowflake, GuildBan>>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(user: UserResolvable, reason?: string): Promise<User | null>;"
      },
      {
        "name": "bulkCreate",
        "static": false,
        "signature": "public bulkCreate( users: ReadonlyCollection<Snowflake, UserResolvable> | readonly UserResolvable[], options?: BulkBanOptions, ): Promise<BulkBanResult>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "TargetUsersJobStatusForInvite": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "completedAt",
        "kind": "property",
        "static": false,
        "signature": "completedAt: Date | null;"
      },
      {
        "name": "createdAt",
        "kind": "property",
        "static": false,
        "signature": "createdAt: Date | null;"
      },
      {
        "name": "errorMessage",
        "kind": "property",
        "static": false,
        "signature": "errorMessage: string | null;"
      },
      {
        "name": "processedUsers",
        "kind": "property",
        "static": false,
        "signature": "processedUsers: number;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "status: InviteTargetUsersJobStatus;"
      },
      {
        "name": "totalUsers",
        "kind": "property",
        "static": false,
        "signature": "totalUsers: number;"
      }
    ]
  },
  "GuildInviteManager": {
    "kind": "class",
    "extends": [
      "DataManager<string, Invite, InviteResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(channel: GuildInvitableChannelResolvable, options?: InviteCreateOptions): Promise<Invite>;"
      },
      {
        "name": "updateTargetUsers",
        "static": false,
        "signature": "public updateTargetUsers( invite: InviteResolvable, targetUsersFile: BufferResolvable | readonly UserResolvable[], ): Promise<void>;"
      },
      {
        "name": "fetchTargetUsers",
        "static": false,
        "signature": "public fetchTargetUsers(invite: InviteResolvable): Promise<Buffer>;"
      },
      {
        "name": "fetchTargetUsersJobStatus",
        "static": false,
        "signature": "public fetchTargetUsersJobStatus(invite: InviteResolvable): Promise<TargetUsersJobStatusForInvite>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: InviteResolvable | FetchInviteOptions): Promise<Invite>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchInvitesOptions): Promise<Collection<string, Invite>>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(invite: InviteResolvable, reason?: string): Promise<Invite>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildScheduledEventManager": {
    "kind": "class",
    "extends": [
      "CachedManager< Snowflake, GuildScheduledEvent, GuildScheduledEventResolvable >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildScheduledEventCreateOptions): Promise<GuildScheduledEvent>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(): Promise<Collection<Snowflake, GuildScheduledEvent>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch< Options extends GuildScheduledEventResolvable | FetchGuildScheduledEventOptions | FetchGuildScheduledEventsOptions, >(options?: Options): Promise<GuildScheduledEventManagerFetchResult<Options>>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit< Status extends GuildScheduledEventStatus, AcceptableStatus extends GuildScheduledEventSetStatusArg<Status>, >( guildScheduledEvent: GuildScheduledEventResolvable, options: GuildScheduledEventEditOptions<Status, AcceptableStatus>, ): Promise<GuildScheduledEvent<AcceptableStatus>>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(guildScheduledEvent: GuildScheduledEventResolvable): Promise<void>;"
      },
      {
        "name": "fetchSubscribers",
        "static": false,
        "signature": "public fetchSubscribers<Options extends FetchGuildScheduledEventSubscribersOptions>( guildScheduledEvent: GuildScheduledEventResolvable, options?: Options, ): Promise<GuildScheduledEventManagerFetchSubscribersResult<Options>>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildSoundboardSoundCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "file",
        "kind": "property",
        "static": false,
        "signature": "file: BufferResolvable | Stream;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "contentType",
        "kind": "property",
        "static": false,
        "signature": "contentType?: string;"
      },
      {
        "name": "volume",
        "kind": "property",
        "static": false,
        "signature": "volume?: number;"
      },
      {
        "name": "emojiId",
        "kind": "property",
        "static": false,
        "signature": "emojiId?: Snowflake;"
      },
      {
        "name": "emojiName",
        "kind": "property",
        "static": false,
        "signature": "emojiName?: string;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildSoundboardSoundEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "volume",
        "kind": "property",
        "static": false,
        "signature": "volume?: number | null;"
      },
      {
        "name": "emojiId",
        "kind": "property",
        "static": false,
        "signature": "emojiId?: Snowflake | null;"
      },
      {
        "name": "emojiName",
        "kind": "property",
        "static": false,
        "signature": "emojiName?: string | null;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "FetchGuildSoundboardSoundOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "soundboardSound",
        "kind": "property",
        "static": false,
        "signature": "soundboardSound: SoundboardSoundResolvable;"
      }
    ]
  },
  "FetchGuildSoundboardSoundsOptions": {
    "kind": "interface",
    "extends": [
      "Pick<BaseFetchOptions, 'cache'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "GuildSoundboardSoundManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, SoundboardSound, SoundboardSoundResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildSoundboardSoundCreateOptions): Promise<GuildSoundboardSound>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( soundboardSound: SoundboardSoundResolvable, options: GuildSoundboardSoundEditOptions, ): Promise<GuildSoundboardSound>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(soundboardSound: SoundboardSoundResolvable): Promise<void>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: SoundboardSoundResolvable | FetchGuildSoundboardSoundOptions): Promise<GuildSoundboardSound>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchGuildSoundboardSoundsOptions): Promise<Collection<Snowflake, GuildSoundboardSound>>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildStickerManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Sticker, StickerResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildStickerCreateOptions): Promise<Sticker>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(sticker: StickerResolvable, data?: GuildStickerEditOptions): Promise<Sticker>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(sticker: StickerResolvable, reason?: string): Promise<void>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Sticker>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id?: Snowflake, options?: BaseFetchOptions): Promise<Collection<Snowflake, Sticker>>;"
      },
      {
        "name": "fetchUser",
        "static": false,
        "signature": "public fetchUser(sticker: StickerResolvable): Promise<User | null>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "GuildMemberRoleManager": {
    "kind": "class",
    "extends": [
      "DataManager<Snowflake, Role, RoleResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add( roleOrRoles: RoleResolvable | readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>, reason?: string, ): Promise<GuildMember>;"
      },
      {
        "name": "set",
        "static": false,
        "signature": "public set( roles: readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>, reason?: string, ): Promise<GuildMember>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove( roleOrRoles: RoleResolvable | readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>, reason?: string, ): Promise<GuildMember>;"
      }
    ],
    "properties": [
      {
        "name": "hoist",
        "kind": "getter",
        "static": false,
        "signature": "public get hoist(): Role | null;"
      },
      {
        "name": "icon",
        "kind": "getter",
        "static": false,
        "signature": "public get icon(): Role | null;"
      },
      {
        "name": "color",
        "kind": "getter",
        "static": false,
        "signature": "public get color(): Role | null;"
      },
      {
        "name": "highest",
        "kind": "getter",
        "static": false,
        "signature": "public get highest(): Role;"
      },
      {
        "name": "premiumSubscriberRole",
        "kind": "getter",
        "static": false,
        "signature": "public get premiumSubscriberRole(): Role | null;"
      },
      {
        "name": "botRole",
        "kind": "getter",
        "static": false,
        "signature": "public get botRole(): Role | null;"
      },
      {
        "name": "member",
        "kind": "property",
        "static": false,
        "signature": "public member: GuildMember;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "FetchPollAnswerVotersOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchPollAnswerVotersOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "messageId",
        "kind": "property",
        "static": false,
        "signature": "messageId: Snowflake;"
      },
      {
        "name": "answerId",
        "kind": "property",
        "static": false,
        "signature": "answerId: number;"
      }
    ]
  },
  "MessageManager": {
    "kind": "class",
    "extends": [
      "CachedManager< Snowflake, Message<InGuild>, MessageResolvable >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(message: MessageResolvable): Promise<void>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( message: MessageResolvable, options: string | MessagePayload | MessageEditOptions, ): Promise<Message<InGuild>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: MessageResolvable | FetchMessageOptions): Promise<Message<InGuild>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchMessagesOptions): Promise<Collection<Snowflake, Message<InGuild>>>;"
      },
      {
        "name": "fetchPinned",
        "static": false,
        "signature": "public fetchPinned(cache?: boolean): Promise<Collection<Snowflake, Message<InGuild>>>;"
      },
      {
        "name": "fetchPins",
        "static": false,
        "signature": "public fetchPins(options?: FetchPinnedMessagesOptions): Promise<FetchPinnedMessagesResponse<InGuild>>;"
      },
      {
        "name": "react",
        "static": false,
        "signature": "public react(message: MessageResolvable, emoji: EmojiIdentifierResolvable): Promise<void>;"
      },
      {
        "name": "pin",
        "static": false,
        "signature": "public pin(message: MessageResolvable, reason?: string): Promise<void>;"
      },
      {
        "name": "unpin",
        "static": false,
        "signature": "public unpin(message: MessageResolvable, reason?: string): Promise<void>;"
      },
      {
        "name": "endPoll",
        "static": false,
        "signature": "public endPoll(messageId: Snowflake): Promise<Message>;"
      },
      {
        "name": "fetchPollAnswerVoters",
        "static": false,
        "signature": "public fetchPollAnswerVoters(options: FetchPollAnswerVotersOptions): Promise<Collection<Snowflake, User>>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: TextBasedChannel;"
      }
    ]
  },
  "DMMessageManager": {
    "kind": "class",
    "extends": [
      "MessageManager"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: DMChannel;"
      }
    ]
  },
  "PartialGroupDMMessageManager": {
    "kind": "class",
    "extends": [
      "MessageManager"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: PartialGroupDMChannel;"
      }
    ]
  },
  "GuildMessageManager": {
    "kind": "class",
    "extends": [
      "MessageManager<true>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "crosspost",
        "static": false,
        "signature": "public crosspost(message: MessageResolvable): Promise<Message<true>>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: GuildTextBasedChannel;"
      }
    ]
  },
  "PermissionOverwriteManager": {
    "kind": "class",
    "extends": [
      "CachedManager< Snowflake, PermissionOverwrites, PermissionOverwriteResolvable >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "set",
        "static": false,
        "signature": "public set( overwrites: readonly OverwriteResolvable[] | ReadonlyCollection<Snowflake, OverwriteResolvable>, reason?: string, ): Promise<NonThreadGuildBasedChannel>;"
      },
      {
        "name": "create",
        "static": false,
        "signature": "public create( userOrRole: RoleResolvable | UserResolvable, options: PermissionOverwriteOptions, overwriteOptions?: GuildChannelOverwriteOptions, ): Promise<NonThreadGuildBasedChannel>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit( userOrRole: RoleResolvable | UserResolvable, options: PermissionOverwriteOptions, overwriteOptions?: GuildChannelOverwriteOptions, ): Promise<NonThreadGuildBasedChannel>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(userOrRole: RoleResolvable | UserResolvable, reason?: string): Promise<NonThreadGuildBasedChannel>;"
      }
    ],
    "properties": []
  },
  "PresenceManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Presence, PresenceResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ReactionManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake | string, MessageReaction, MessageReactionResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "removeAll",
        "static": false,
        "signature": "public removeAll(): Promise<Message>;"
      }
    ],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "public message: Message;"
      }
    ]
  },
  "ReactionUserManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, User, UserResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchReactionUsersOptions): Promise<Collection<Snowflake, User>>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(user?: UserResolvable): Promise<MessageReaction>;"
      }
    ],
    "properties": [
      {
        "name": "reaction",
        "kind": "property",
        "static": false,
        "signature": "public reaction: MessageReaction;"
      }
    ]
  },
  "RoleManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, Role, RoleResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "botRoleFor",
        "static": false,
        "signature": "public botRoleFor(user: UserResolvable): Role | null;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Role | null>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, Role>>;"
      },
      {
        "name": "fetchMemberCounts",
        "static": false,
        "signature": "public fetchMemberCounts(): Promise<Collection<Snowflake, number>>;"
      },
      {
        "name": "create",
        "static": false,
        "signature": "public create(options?: RoleCreateOptions): Promise<Role>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(role: RoleResolvable, options: RoleEditOptions): Promise<Role>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(role: RoleResolvable, reason?: string): Promise<void>;"
      },
      {
        "name": "setPosition",
        "static": false,
        "signature": "public setPosition(role: RoleResolvable, position: number, options?: SetRolePositionOptions): Promise<Role>;"
      },
      {
        "name": "setPositions",
        "static": false,
        "signature": "public setPositions(rolePositions: readonly RolePosition[]): Promise<Guild>;"
      },
      {
        "name": "comparePositions",
        "static": false,
        "signature": "public comparePositions(role1: RoleResolvable, role2: RoleResolvable): number;"
      }
    ],
    "properties": [
      {
        "name": "everyone",
        "kind": "getter",
        "static": false,
        "signature": "public get everyone(): Role;"
      },
      {
        "name": "highest",
        "kind": "getter",
        "static": false,
        "signature": "public get highest(): Role;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      },
      {
        "name": "premiumSubscriberRole",
        "kind": "getter",
        "static": false,
        "signature": "public get premiumSubscriberRole(): Role | null;"
      }
    ]
  },
  "StageInstanceManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, StageInstance, StageInstanceResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(channel: StageChannelResolvable, options: StageInstanceCreateOptions): Promise<StageInstance>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(channel: StageChannelResolvable, options?: BaseFetchOptions): Promise<StageInstance>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "public edit(channel: StageChannelResolvable, options: StageInstanceEditOptions): Promise<StageInstance>;"
      },
      {
        "name": "delete",
        "static": false,
        "signature": "public delete(channel: StageChannelResolvable): Promise<void>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "ThreadManager": {
    "kind": "class",
    "extends": [
      "CachedManager< Snowflake, If<ThreadOnly, ForumThreadChannel, TextThreadChannel>, ThreadChannelResolvable >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( options: ThreadChannelResolvable, cacheOptions?: BaseFetchOptions, ): Promise<If<ThreadOnly, ForumThreadChannel, TextThreadChannel> | null>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( options: FetchThreadsOptions & { archived: FetchArchivedThreadOptions }, cacheOptions?: { cache?: boolean }, ): Promise<FetchedThreadsMore>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchThreadsOptions, cacheOptions?: { cache?: boolean }): Promise<FetchedThreads>;"
      },
      {
        "name": "fetchArchived",
        "static": false,
        "signature": "public fetchArchived(options?: FetchArchivedThreadOptions, cache?: boolean): Promise<FetchedThreadsMore>;"
      },
      {
        "name": "fetchActive",
        "static": false,
        "signature": "public fetchActive(cache?: boolean): Promise<FetchedThreads>;"
      }
    ],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "public channel: If<ThreadOnly, ForumChannel | MediaChannel, TextChannel | NewsChannel>;"
      }
    ]
  },
  "GuildTextThreadManager": {
    "kind": "class",
    "extends": [
      "ThreadManager<false>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create( options: GuildTextThreadCreateOptions<AllowedThreadType>, ): Promise<AllowedThreadType extends ChannelType.PrivateThread ? PrivateThreadChannel : PublicThreadChannel<false>>;"
      }
    ],
    "properties": []
  },
  "GuildForumThreadManager": {
    "kind": "class",
    "extends": [
      "ThreadManager<true>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "create",
        "static": false,
        "signature": "public create(options: GuildForumThreadCreateOptions): Promise<ForumThreadChannel>;"
      }
    ],
    "properties": []
  },
  "ThreadMemberManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, ThreadMember, ThreadMemberResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "add",
        "static": false,
        "signature": "public add(member: UserResolvable | '@me'): Promise<Snowflake>;"
      },
      {
        "name": "add",
        "static": false,
        "signature": "public add(member: UserResolvable | '@me', reason?: string): Promise<Snowflake>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( options: ThreadMember<true> | ((FetchThreadMemberOptions & { withMember: true }) | { member: ThreadMember<true> }), ): Promise<ThreadMember<true>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options: ThreadMemberResolvable | FetchThreadMemberOptions): Promise<ThreadMember>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch( options: FetchThreadMembersWithGuildMemberDataOptions, ): Promise<Collection<Snowflake, ThreadMember<true>>>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(options?: FetchThreadMembersWithoutGuildMemberDataOptions): Promise<Collection<Snowflake, ThreadMember>>;"
      },
      {
        "name": "fetchMe",
        "static": false,
        "signature": "public fetchMe(options?: BaseFetchOptions): Promise<ThreadMember>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(member: UserResolvable | '@me'): Promise<Snowflake>;"
      },
      {
        "name": "remove",
        "static": false,
        "signature": "public remove(member: UserResolvable | '@me', reason?: string): Promise<Snowflake>;"
      }
    ],
    "properties": [
      {
        "name": "thread",
        "kind": "property",
        "static": false,
        "signature": "public thread: AnyThreadChannel;"
      },
      {
        "name": "me",
        "kind": "getter",
        "static": false,
        "signature": "public get me(): ThreadMember | null;"
      }
    ]
  },
  "UserManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, User, UserResolvable>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "createDM",
        "static": false,
        "signature": "public createDM(user: UserResolvable, options?: BaseFetchOptions): Promise<DMChannel>;"
      },
      {
        "name": "deleteDM",
        "static": false,
        "signature": "public deleteDM(user: UserResolvable): Promise<DMChannel>;"
      },
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<User>;"
      },
      {
        "name": "fetchFlags",
        "static": false,
        "signature": "public fetchFlags(user: UserResolvable, options?: BaseFetchOptions): Promise<UserFlagsBitField>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "public send(user: UserResolvable, options: string | MessagePayload | MessageCreateOptions): Promise<Message<false>>;"
      }
    ],
    "properties": []
  },
  "VoiceStateManager": {
    "kind": "class",
    "extends": [
      "CachedManager<Snowflake, VoiceState, typeof VoiceState>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "fetch",
        "static": false,
        "signature": "public fetch(member: GuildMemberResolvable | '@me', options?: BaseFetchOptions): Promise<VoiceState>;"
      }
    ],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "public guild: Guild;"
      }
    ]
  },
  "PartialTextBasedChannelFields": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "send",
        "static": false,
        "signature": "send(options: string | MessagePayload | MessageCreateOptions): Promise<Message<InGuild>>;"
      }
    ],
    "properties": []
  },
  "TextBasedChannelFields": {
    "kind": "interface",
    "extends": [
      "PartialTextBasedChannelFields<InGuild>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "awaitMessageComponent",
        "static": false,
        "signature": "awaitMessageComponent<ComponentType extends MessageComponentType>( options?: AwaitMessageCollectorOptionsParams<ComponentType, true>, ): Promise<MappedInteractionTypes[ComponentType]>;"
      },
      {
        "name": "awaitMessages",
        "static": false,
        "signature": "awaitMessages(options?: AwaitMessagesOptions): Promise<Collection<Snowflake, Message>>;"
      },
      {
        "name": "bulkDelete",
        "static": false,
        "signature": "bulkDelete( messages: Collection<Snowflake, Message> | readonly MessageResolvable[] | number, filterOld?: boolean, ): Promise<Collection<Snowflake, Message | PartialMessage | undefined>>;"
      },
      {
        "name": "createMessageComponentCollector",
        "static": false,
        "signature": "createMessageComponentCollector<ComponentType extends MessageComponentType>( options?: MessageChannelCollectorOptionsParams<ComponentType, true>, ): InteractionCollector<MappedInteractionTypes[ComponentType]>;"
      },
      {
        "name": "createMessageCollector",
        "static": false,
        "signature": "createMessageCollector(options?: MessageCollectorOptions): MessageCollector;"
      },
      {
        "name": "createWebhook",
        "static": false,
        "signature": "createWebhook(options: ChannelWebhookCreateOptions): Promise<Webhook<WebhookType.Incoming>>;"
      },
      {
        "name": "fetchWebhooks",
        "static": false,
        "signature": "fetchWebhooks(): Promise<Collection<Snowflake, Webhook<WebhookType.ChannelFollower | WebhookType.Incoming>>>;"
      },
      {
        "name": "sendTyping",
        "static": false,
        "signature": "sendTyping(): Promise<void>;"
      },
      {
        "name": "setRateLimitPerUser",
        "static": false,
        "signature": "setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<this>;"
      },
      {
        "name": "setNSFW",
        "static": false,
        "signature": "setNSFW(nsfw?: boolean, reason?: string): Promise<this>;"
      }
    ],
    "properties": [
      {
        "name": "lastMessageId",
        "kind": "property",
        "static": false,
        "signature": "lastMessageId: Snowflake | null;"
      },
      {
        "name": "lastMessage",
        "kind": "getter",
        "static": false,
        "signature": "get lastMessage(): Message | null;"
      },
      {
        "name": "lastPinTimestamp",
        "kind": "property",
        "static": false,
        "signature": "lastPinTimestamp: number | null;"
      },
      {
        "name": "lastPinAt",
        "kind": "getter",
        "static": false,
        "signature": "get lastPinAt(): Date | null;"
      },
      {
        "name": "messages",
        "kind": "property",
        "static": false,
        "signature": "messages: If<InGuild, GuildMessageManager, If<InDM, DMMessageManager, PartialGroupDMMessageManager>>;"
      }
    ]
  },
  "PartialWebhookFields": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "deleteMessage",
        "static": false,
        "signature": "deleteMessage(message: MessageResolvable | APIMessage | '@original', threadId?: Snowflake): Promise<void>;"
      },
      {
        "name": "editMessage",
        "static": false,
        "signature": "editMessage( message: MessageResolvable | '@original', options: string | MessagePayload | WebhookMessageEditOptions, ): Promise<APIMessage | Message>;"
      },
      {
        "name": "fetchMessage",
        "static": false,
        "signature": "fetchMessage(message: Snowflake | '@original', options?: WebhookFetchMessageOptions): Promise<APIMessage | Message>;"
      },
      {
        "name": "send",
        "static": false,
        "signature": "send( options: string | MessagePayload | InteractionReplyOptions | WebhookMessageCreateOptions, ): Promise<APIMessage | Message>;"
      }
    ],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "url",
        "kind": "getter",
        "static": false,
        "signature": "get url(): string;"
      }
    ]
  },
  "WebhookFields": {
    "kind": "interface",
    "extends": [
      "PartialWebhookFields"
    ],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "delete",
        "static": false,
        "signature": "delete(reason?: string): Promise<void>;"
      },
      {
        "name": "edit",
        "static": false,
        "signature": "edit(options: WebhookEditOptions): Promise<this>;"
      },
      {
        "name": "sendSlackMessage",
        "static": false,
        "signature": "sendSlackMessage(body: unknown): Promise<boolean>;"
      }
    ],
    "properties": [
      {
        "name": "createdAt",
        "kind": "getter",
        "static": false,
        "signature": "get createdAt(): Date;"
      },
      {
        "name": "createdTimestamp",
        "kind": "getter",
        "static": false,
        "signature": "get createdTimestamp(): number;"
      }
    ]
  },
  "ActivitiesOptions": {
    "kind": "interface",
    "extends": [
      "Omit<ActivityOptions, 'shardId'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ActivityOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "state",
        "kind": "property",
        "static": false,
        "signature": "state?: string;"
      },
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "url?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: ActivityType;"
      },
      {
        "name": "shardId",
        "kind": "property",
        "static": false,
        "signature": "shardId?: number | readonly number[];"
      }
    ]
  },
  "AddGuildMemberOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "accessToken",
        "kind": "property",
        "static": false,
        "signature": "accessToken: string;"
      },
      {
        "name": "nick",
        "kind": "property",
        "static": false,
        "signature": "nick?: string;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[];"
      },
      {
        "name": "mute",
        "kind": "property",
        "static": false,
        "signature": "mute?: boolean;"
      },
      {
        "name": "deaf",
        "kind": "property",
        "static": false,
        "signature": "deaf?: boolean;"
      },
      {
        "name": "force",
        "kind": "property",
        "static": false,
        "signature": "force?: boolean;"
      },
      {
        "name": "fetchWhenExisting",
        "kind": "property",
        "static": false,
        "signature": "fetchWhenExisting?: boolean;"
      }
    ]
  },
  "BaseApplicationCommandData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "nameLocalizations?: LocalizationMap;"
      },
      {
        "name": "dmPermission",
        "kind": "property",
        "static": false,
        "signature": "dmPermission?: boolean;"
      },
      {
        "name": "defaultMemberPermissions",
        "kind": "property",
        "static": false,
        "signature": "defaultMemberPermissions?: PermissionResolvable | null;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "nsfw?: boolean;"
      },
      {
        "name": "contexts",
        "kind": "property",
        "static": false,
        "signature": "contexts?: readonly InteractionContextType[];"
      },
      {
        "name": "integrationTypes",
        "kind": "property",
        "static": false,
        "signature": "integrationTypes?: readonly ApplicationIntegrationType[];"
      }
    ]
  },
  "AttachmentData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "duration",
        "kind": "property",
        "static": false,
        "signature": "duration?: number;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title?: string;"
      },
      {
        "name": "waveform",
        "kind": "property",
        "static": false,
        "signature": "waveform?: string;"
      }
    ]
  },
  "BaseApplicationCommandOptionsData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "nameLocalizations?: LocalizationMap;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "descriptionLocalizations?: LocalizationMap;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete?: never;"
      }
    ]
  },
  "UserApplicationCommandData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandType.User;"
      }
    ]
  },
  "MessageApplicationCommandData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandType.Message;"
      }
    ]
  },
  "ChatInputApplicationCommandData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "descriptionLocalizations?: LocalizationMap;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: ApplicationCommandType.ChatInput;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options?: readonly ApplicationCommandOptionData[];"
      }
    ]
  },
  "PrimaryEntryPointCommandData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "descriptionLocalizations?: LocalizationMap;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandType.PrimaryEntryPoint;"
      },
      {
        "name": "handler",
        "kind": "property",
        "static": false,
        "signature": "handler?: EntryPointCommandHandlerType;"
      }
    ]
  },
  "ApplicationCommandChannelOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionChannelResolvableType;"
      },
      {
        "name": "channelTypes",
        "kind": "property",
        "static": false,
        "signature": "channelTypes?: readonly ApplicationCommandOptionAllowedChannelTypes[];"
      },
      {
        "name": "channel_types",
        "kind": "property",
        "static": false,
        "signature": "channel_types?: readonly ApplicationCommandOptionAllowedChannelTypes[];"
      }
    ]
  },
  "ApplicationCommandChannelOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Channel;"
      },
      {
        "name": "channelTypes",
        "kind": "property",
        "static": false,
        "signature": "channelTypes?: readonly ApplicationCommandOptionAllowedChannelTypes[];"
      }
    ]
  },
  "ApplicationCommandRoleOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Role;"
      }
    ]
  },
  "ApplicationCommandRoleOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Role;"
      }
    ]
  },
  "ApplicationCommandUserOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.User;"
      }
    ]
  },
  "ApplicationCommandUserOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.User;"
      }
    ]
  },
  "ApplicationCommandMentionableOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Mentionable;"
      }
    ]
  },
  "ApplicationCommandMentionableOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Mentionable;"
      }
    ]
  },
  "ApplicationCommandAttachmentOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "fileTypes",
        "kind": "property",
        "static": false,
        "signature": "fileTypes?: readonly FileUploadType[];"
      },
      {
        "name": "file_types",
        "kind": "property",
        "static": false,
        "signature": "file_types?: readonly FileUploadType[];"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Attachment;"
      }
    ]
  },
  "ApplicationCommandAttachmentOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "fileTypes",
        "kind": "property",
        "static": false,
        "signature": "fileTypes?: readonly FileUploadType[];"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Attachment;"
      }
    ]
  },
  "ApplicationCommandAutocompleteNumericOption": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionNumericResolvableType;"
      },
      {
        "name": "minValue",
        "kind": "property",
        "static": false,
        "signature": "minValue?: number;"
      },
      {
        "name": "maxValue",
        "kind": "property",
        "static": false,
        "signature": "maxValue?: number;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete: true;"
      }
    ]
  },
  "ApplicationCommandAutocompleteStringOption": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.String;"
      },
      {
        "name": "minLength",
        "kind": "property",
        "static": false,
        "signature": "minLength?: number;"
      },
      {
        "name": "maxLength",
        "kind": "property",
        "static": false,
        "signature": "maxLength?: number;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete: true;"
      }
    ]
  },
  "ApplicationCommandAutocompleteNumericOptionData": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionNumericResolvableType;"
      },
      {
        "name": "minValue",
        "kind": "property",
        "static": false,
        "signature": "minValue?: number;"
      },
      {
        "name": "min_value",
        "kind": "property",
        "static": false,
        "signature": "min_value?: number;"
      },
      {
        "name": "maxValue",
        "kind": "property",
        "static": false,
        "signature": "maxValue?: number;"
      },
      {
        "name": "max_value",
        "kind": "property",
        "static": false,
        "signature": "max_value?: number;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete: true;"
      }
    ]
  },
  "ApplicationCommandAutocompleteStringOptionData": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.String;"
      },
      {
        "name": "minLength",
        "kind": "property",
        "static": false,
        "signature": "minLength?: number;"
      },
      {
        "name": "min_length",
        "kind": "property",
        "static": false,
        "signature": "min_length?: number;"
      },
      {
        "name": "maxLength",
        "kind": "property",
        "static": false,
        "signature": "maxLength?: number;"
      },
      {
        "name": "max_length",
        "kind": "property",
        "static": false,
        "signature": "max_length?: number;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete: true;"
      }
    ]
  },
  "ApplicationCommandChoicesData": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionChoiceResolvableType;"
      },
      {
        "name": "choices",
        "kind": "property",
        "static": false,
        "signature": "choices?: readonly ApplicationCommandOptionChoiceData<Type>[];"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete?: false;"
      }
    ]
  },
  "ApplicationCommandChoicesOption": {
    "kind": "interface",
    "extends": [
      "Omit< BaseApplicationCommandOptionsData, 'autocomplete' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionChoiceResolvableType;"
      },
      {
        "name": "choices",
        "kind": "property",
        "static": false,
        "signature": "choices?: readonly ApplicationCommandOptionChoiceData<Type>[];"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete?: false;"
      }
    ]
  },
  "ApplicationCommandNumericOptionData": {
    "kind": "interface",
    "extends": [
      "ApplicationCommandChoicesData<number>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionNumericResolvableType;"
      },
      {
        "name": "minValue",
        "kind": "property",
        "static": false,
        "signature": "minValue?: number;"
      },
      {
        "name": "min_value",
        "kind": "property",
        "static": false,
        "signature": "min_value?: number;"
      },
      {
        "name": "maxValue",
        "kind": "property",
        "static": false,
        "signature": "maxValue?: number;"
      },
      {
        "name": "max_value",
        "kind": "property",
        "static": false,
        "signature": "max_value?: number;"
      }
    ]
  },
  "ApplicationCommandStringOptionData": {
    "kind": "interface",
    "extends": [
      "ApplicationCommandChoicesData<string>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.String;"
      },
      {
        "name": "minLength",
        "kind": "property",
        "static": false,
        "signature": "minLength?: number;"
      },
      {
        "name": "min_length",
        "kind": "property",
        "static": false,
        "signature": "min_length?: number;"
      },
      {
        "name": "maxLength",
        "kind": "property",
        "static": false,
        "signature": "maxLength?: number;"
      },
      {
        "name": "max_length",
        "kind": "property",
        "static": false,
        "signature": "max_length?: number;"
      }
    ]
  },
  "ApplicationCommandBooleanOptionData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Boolean;"
      }
    ]
  },
  "ApplicationCommandNumericOption": {
    "kind": "interface",
    "extends": [
      "ApplicationCommandChoicesOption<number>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: CommandOptionNumericResolvableType;"
      },
      {
        "name": "minValue",
        "kind": "property",
        "static": false,
        "signature": "minValue?: number;"
      },
      {
        "name": "maxValue",
        "kind": "property",
        "static": false,
        "signature": "maxValue?: number;"
      }
    ]
  },
  "ApplicationCommandStringOption": {
    "kind": "interface",
    "extends": [
      "ApplicationCommandChoicesOption<string>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.String;"
      },
      {
        "name": "minLength",
        "kind": "property",
        "static": false,
        "signature": "minLength?: number;"
      },
      {
        "name": "maxLength",
        "kind": "property",
        "static": false,
        "signature": "maxLength?: number;"
      }
    ]
  },
  "ApplicationCommandBooleanOption": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Boolean;"
      }
    ]
  },
  "ApplicationCommandSubGroupData": {
    "kind": "interface",
    "extends": [
      "Omit<BaseApplicationCommandOptionsData, 'required'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.SubcommandGroup;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options: readonly ApplicationCommandSubCommandData[];"
      }
    ]
  },
  "ApplicationCommandSubGroup": {
    "kind": "interface",
    "extends": [
      "Omit<BaseApplicationCommandOptionsData, 'required'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.SubcommandGroup;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options?: readonly ApplicationCommandSubCommand[];"
      }
    ]
  },
  "ApplicationCommandSubCommandData": {
    "kind": "interface",
    "extends": [
      "Omit<BaseApplicationCommandOptionsData, 'required'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Subcommand;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options?: readonly Exclude< ApplicationCommandOptionData, ApplicationCommandSubGroupData | ApplicationCommandSubCommandData >[];"
      }
    ]
  },
  "ApplicationCommandSubCommand": {
    "kind": "interface",
    "extends": [
      "Omit<BaseApplicationCommandOptionsData, 'required'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.Subcommand;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options?: readonly Exclude<ApplicationCommandOption, ApplicationCommandSubGroup | ApplicationCommandSubCommand>[];"
      }
    ]
  },
  "ApplicationCommandNonOptionsData": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: Exclude<CommandOptionNonChoiceResolvableType, ApplicationCommandOptionType.Attachment>;"
      }
    ]
  },
  "ApplicationCommandNonOptions": {
    "kind": "interface",
    "extends": [
      "BaseApplicationCommandOptionsData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: Exclude<CommandOptionNonChoiceResolvableType, ApplicationCommandOptionType.Attachment>;"
      }
    ]
  },
  "ApplicationCommandOptionChoiceData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "nameLocalizations?: LocalizationMap;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: Value;"
      }
    ]
  },
  "ApplicationCommandPermissions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandPermissionType;"
      },
      {
        "name": "permission",
        "kind": "property",
        "static": false,
        "signature": "permission: boolean;"
      }
    ]
  },
  "ApplicationCommandPermissionsUpdateData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId: Snowflake;"
      },
      {
        "name": "applicationId",
        "kind": "property",
        "static": false,
        "signature": "applicationId: Snowflake;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "permissions: readonly ApplicationCommandPermissions[];"
      }
    ]
  },
  "EditApplicationCommandPermissionsMixin": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "permissions: readonly ApplicationCommandPermissions[];"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "token: string;"
      }
    ]
  },
  "ApplicationRoleConnectionMetadataEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "nameLocalizations",
        "kind": "property",
        "static": false,
        "signature": "nameLocalizations?: LocalizationMap | null;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description: string;"
      },
      {
        "name": "descriptionLocalizations",
        "kind": "property",
        "static": false,
        "signature": "descriptionLocalizations?: LocalizationMap | null;"
      },
      {
        "name": "key",
        "kind": "property",
        "static": false,
        "signature": "key: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationRoleConnectionMetadataType;"
      }
    ]
  },
  "AutoModerationAction": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: AutoModerationActionType;"
      },
      {
        "name": "metadata",
        "kind": "property",
        "static": false,
        "signature": "metadata: AutoModerationActionMetadata;"
      }
    ]
  },
  "AutoModerationActionMetadata": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "channelId: Snowflake | null;"
      },
      {
        "name": "durationSeconds",
        "kind": "property",
        "static": false,
        "signature": "durationSeconds: number | null;"
      },
      {
        "name": "customMessage",
        "kind": "property",
        "static": false,
        "signature": "customMessage: string | null;"
      }
    ]
  },
  "AutoModerationTriggerMetadata": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "keywordFilter",
        "kind": "property",
        "static": false,
        "signature": "keywordFilter: readonly string[];"
      },
      {
        "name": "regexPatterns",
        "kind": "property",
        "static": false,
        "signature": "regexPatterns: readonly string[];"
      },
      {
        "name": "presets",
        "kind": "property",
        "static": false,
        "signature": "presets: readonly AutoModerationRuleKeywordPresetType[];"
      },
      {
        "name": "allowList",
        "kind": "property",
        "static": false,
        "signature": "allowList: readonly string[];"
      },
      {
        "name": "mentionTotalLimit",
        "kind": "property",
        "static": false,
        "signature": "mentionTotalLimit: number | null;"
      },
      {
        "name": "mentionRaidProtectionEnabled",
        "kind": "property",
        "static": false,
        "signature": "mentionRaidProtectionEnabled: boolean;"
      }
    ]
  },
  "AwaitMessageComponentOptions": {
    "kind": "interface",
    "extends": [
      "Omit< MessageComponentCollectorOptions<Interaction>, 'max' | 'maxComponents' | 'maxUsers' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ModalSubmitInteractionCollectorOptions": {
    "kind": "interface",
    "extends": [
      "Omit< InteractionCollectorOptions<Interaction>, 'channel' | 'message' | 'guild' | 'interactionType' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "AwaitModalSubmitOptions": {
    "kind": "interface",
    "extends": [
      "Omit< ModalSubmitInteractionCollectorOptions<Interaction>, 'max' | 'maxComponents' | 'maxUsers' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "time",
        "kind": "property",
        "static": false,
        "signature": "time: number;"
      }
    ]
  },
  "AwaitMessagesOptions": {
    "kind": "interface",
    "extends": [
      "MessageCollectorOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "errors",
        "kind": "property",
        "static": false,
        "signature": "errors?: readonly string[];"
      }
    ]
  },
  "AwaitReactionsOptions": {
    "kind": "interface",
    "extends": [
      "ReactionCollectorOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "errors",
        "kind": "property",
        "static": false,
        "signature": "errors?: readonly string[];"
      }
    ]
  },
  "BanOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "deleteMessageDays",
        "kind": "property",
        "static": false,
        "signature": "deleteMessageDays?: number;"
      },
      {
        "name": "deleteMessageSeconds",
        "kind": "property",
        "static": false,
        "signature": "deleteMessageSeconds?: number;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "BulkBanOptions": {
    "kind": "interface",
    "extends": [
      "Omit<BanOptions, 'deleteMessageDays'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "BulkBanResult": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "bannedUsers",
        "kind": "property",
        "static": false,
        "signature": "bannedUsers: readonly Snowflake[];"
      },
      {
        "name": "failedUsers",
        "kind": "property",
        "static": false,
        "signature": "failedUsers: readonly Snowflake[];"
      }
    ]
  },
  "PollData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "question",
        "kind": "property",
        "static": false,
        "signature": "question: PollQuestionMedia;"
      },
      {
        "name": "answers",
        "kind": "property",
        "static": false,
        "signature": "answers: readonly PollAnswerData[];"
      },
      {
        "name": "duration",
        "kind": "property",
        "static": false,
        "signature": "duration: number;"
      },
      {
        "name": "allowMultiselect",
        "kind": "property",
        "static": false,
        "signature": "allowMultiselect: boolean;"
      },
      {
        "name": "layoutType",
        "kind": "property",
        "static": false,
        "signature": "layoutType?: PollLayoutType;"
      }
    ]
  },
  "PollAnswerData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "text",
        "kind": "property",
        "static": false,
        "signature": "text: string;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji?: EmojiIdentifierResolvable;"
      }
    ]
  },
  "BaseFetchOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      },
      {
        "name": "force",
        "kind": "property",
        "static": false,
        "signature": "force?: boolean;"
      }
    ]
  },
  "Caches": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "ApplicationCommandManager",
        "kind": "property",
        "static": false,
        "signature": "ApplicationCommandManager: [manager: typeof ApplicationCommandManager, holds: typeof ApplicationCommand];"
      },
      {
        "name": "ApplicationEmojiManager",
        "kind": "property",
        "static": false,
        "signature": "ApplicationEmojiManager: [manager: typeof ApplicationEmojiManager, holds: typeof ApplicationEmoji];"
      },
      {
        "name": "AutoModerationRuleManager",
        "kind": "property",
        "static": false,
        "signature": "AutoModerationRuleManager: [manager: typeof AutoModerationRuleManager, holds: typeof AutoModerationRule];"
      },
      {
        "name": "BaseGuildEmojiManager",
        "kind": "property",
        "static": false,
        "signature": "BaseGuildEmojiManager: [manager: typeof BaseGuildEmojiManager, holds: typeof GuildEmoji];"
      },
      {
        "name": "DMMessageManager",
        "kind": "property",
        "static": false,
        "signature": "DMMessageManager: [manager: typeof MessageManager, holds: typeof Message<false>];"
      },
      {
        "name": "EntitlementManager",
        "kind": "property",
        "static": false,
        "signature": "EntitlementManager: [manager: typeof EntitlementManager, holds: typeof Entitlement];"
      },
      {
        "name": "GuildBanManager",
        "kind": "property",
        "static": false,
        "signature": "GuildBanManager: [manager: typeof GuildBanManager, holds: typeof GuildBan];"
      },
      {
        "name": "GuildEmojiManager",
        "kind": "property",
        "static": false,
        "signature": "GuildEmojiManager: [manager: typeof GuildEmojiManager, holds: typeof GuildEmoji];"
      },
      {
        "name": "GuildForumThreadManager",
        "kind": "property",
        "static": false,
        "signature": "GuildForumThreadManager: [manager: typeof GuildForumThreadManager, holds: typeof ThreadChannel<true>];"
      },
      {
        "name": "GuildInviteManager",
        "kind": "property",
        "static": false,
        "signature": "GuildInviteManager: [manager: typeof GuildInviteManager, holds: typeof Invite];"
      },
      {
        "name": "GuildMemberManager",
        "kind": "property",
        "static": false,
        "signature": "GuildMemberManager: [manager: typeof GuildMemberManager, holds: typeof GuildMember];"
      },
      {
        "name": "GuildMessageManager",
        "kind": "property",
        "static": false,
        "signature": "GuildMessageManager: [manager: typeof GuildMessageManager, holds: typeof Message<true>];"
      },
      {
        "name": "GuildScheduledEventManager",
        "kind": "property",
        "static": false,
        "signature": "GuildScheduledEventManager: [manager: typeof GuildScheduledEventManager, holds: typeof GuildScheduledEvent];"
      },
      {
        "name": "GuildStickerManager",
        "kind": "property",
        "static": false,
        "signature": "GuildStickerManager: [manager: typeof GuildStickerManager, holds: typeof Sticker];"
      },
      {
        "name": "GuildTextThreadManager",
        "kind": "property",
        "static": false,
        "signature": "GuildTextThreadManager: [manager: typeof GuildTextThreadManager, holds: typeof ThreadChannel<false>];"
      },
      {
        "name": "MessageManager",
        "kind": "property",
        "static": false,
        "signature": "MessageManager: [manager: typeof MessageManager, holds: typeof Message];"
      },
      {
        "name": "PresenceManager",
        "kind": "property",
        "static": false,
        "signature": "PresenceManager: [manager: typeof PresenceManager, holds: typeof Presence];"
      },
      {
        "name": "ReactionManager",
        "kind": "property",
        "static": false,
        "signature": "ReactionManager: [manager: typeof ReactionManager, holds: typeof MessageReaction];"
      },
      {
        "name": "ReactionUserManager",
        "kind": "property",
        "static": false,
        "signature": "ReactionUserManager: [manager: typeof ReactionUserManager, holds: typeof User];"
      },
      {
        "name": "StageInstanceManager",
        "kind": "property",
        "static": false,
        "signature": "StageInstanceManager: [manager: typeof StageInstanceManager, holds: typeof StageInstance];"
      },
      {
        "name": "ThreadManager",
        "kind": "property",
        "static": false,
        "signature": "ThreadManager: [manager: typeof ThreadManager, holds: typeof ThreadChannel];"
      },
      {
        "name": "ThreadMemberManager",
        "kind": "property",
        "static": false,
        "signature": "ThreadMemberManager: [manager: typeof ThreadMemberManager, holds: typeof ThreadMember];"
      },
      {
        "name": "UserManager",
        "kind": "property",
        "static": false,
        "signature": "UserManager: [manager: typeof UserManager, holds: typeof User];"
      },
      {
        "name": "VoiceStateManager",
        "kind": "property",
        "static": false,
        "signature": "VoiceStateManager: [manager: typeof VoiceStateManager, holds: typeof VoiceState];"
      }
    ]
  },
  "CategoryCreateChannelOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "permissionOverwrites",
        "kind": "property",
        "static": false,
        "signature": "permissionOverwrites?: readonly OverwriteResolvable[] | ReadonlyCollection<Snowflake, OverwriteResolvable>;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "topic?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: CategoryChannelType;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "nsfw?: boolean;"
      },
      {
        "name": "bitrate",
        "kind": "property",
        "static": false,
        "signature": "bitrate?: number;"
      },
      {
        "name": "userLimit",
        "kind": "property",
        "static": false,
        "signature": "userLimit?: number;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "rateLimitPerUser?: number;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position?: number;"
      },
      {
        "name": "rtcRegion",
        "kind": "property",
        "static": false,
        "signature": "rtcRegion?: string;"
      },
      {
        "name": "videoQualityMode",
        "kind": "property",
        "static": false,
        "signature": "videoQualityMode?: VideoQualityMode;"
      },
      {
        "name": "defaultThreadRateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "defaultThreadRateLimitPerUser?: number;"
      },
      {
        "name": "availableTags",
        "kind": "property",
        "static": false,
        "signature": "availableTags?: readonly GuildForumTagData[];"
      },
      {
        "name": "defaultReactionEmoji",
        "kind": "property",
        "static": false,
        "signature": "defaultReactionEmoji?: DefaultReactionEmoji;"
      },
      {
        "name": "defaultAutoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;"
      },
      {
        "name": "defaultSortOrder",
        "kind": "property",
        "static": false,
        "signature": "defaultSortOrder?: SortOrderType;"
      },
      {
        "name": "defaultForumLayout",
        "kind": "property",
        "static": false,
        "signature": "defaultForumLayout?: ForumLayoutType;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "ChannelCreationOverwrites": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "allow",
        "kind": "property",
        "static": false,
        "signature": "allow?: PermissionResolvable;"
      },
      {
        "name": "deny",
        "kind": "property",
        "static": false,
        "signature": "deny?: PermissionResolvable;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: RoleResolvable | UserResolvable;"
      }
    ]
  },
  "ChannelPosition": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel: NonThreadGuildBasedChannel | Snowflake;"
      },
      {
        "name": "lockPermissions",
        "kind": "property",
        "static": false,
        "signature": "lockPermissions?: boolean;"
      },
      {
        "name": "parent",
        "kind": "property",
        "static": false,
        "signature": "parent?: CategoryChannelResolvable | null;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position?: number;"
      }
    ]
  },
  "ChannelWebhookCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "avatar?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "WebhookCreateOptions": {
    "kind": "interface",
    "extends": [
      "ChannelWebhookCreateOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel: TextChannel | NewsChannel | VoiceChannel | StageChannel | ForumChannel | MediaChannel | Snowflake;"
      }
    ]
  },
  "GuildMembersChunk": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "index",
        "kind": "property",
        "static": false,
        "signature": "index: number;"
      },
      {
        "name": "count",
        "kind": "property",
        "static": false,
        "signature": "count: number;"
      },
      {
        "name": "notFound",
        "kind": "property",
        "static": false,
        "signature": "notFound: readonly unknown[];"
      },
      {
        "name": "nonce",
        "kind": "property",
        "static": false,
        "signature": "nonce: string | undefined;"
      }
    ]
  },
  "VoiceServerUpdateData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "endpoint",
        "kind": "property",
        "static": false,
        "signature": "endpoint: string | null;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId: Snowflake;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "token: string;"
      }
    ]
  },
  "ClientEvents": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "applicationCommandPermissionsUpdate",
        "kind": "property",
        "static": false,
        "signature": "applicationCommandPermissionsUpdate: [data: ApplicationCommandPermissionsUpdateData];"
      },
      {
        "name": "autoModerationActionExecution",
        "kind": "property",
        "static": false,
        "signature": "autoModerationActionExecution: [autoModerationActionExecution: AutoModerationActionExecution];"
      },
      {
        "name": "autoModerationRuleCreate",
        "kind": "property",
        "static": false,
        "signature": "autoModerationRuleCreate: [autoModerationRule: AutoModerationRule];"
      },
      {
        "name": "autoModerationRuleDelete",
        "kind": "property",
        "static": false,
        "signature": "autoModerationRuleDelete: [autoModerationRule: AutoModerationRule];"
      },
      {
        "name": "autoModerationRuleUpdate",
        "kind": "property",
        "static": false,
        "signature": "autoModerationRuleUpdate: [ oldAutoModerationRule: AutoModerationRule | null, newAutoModerationRule: AutoModerationRule, ];"
      },
      {
        "name": "cacheSweep",
        "kind": "property",
        "static": false,
        "signature": "cacheSweep: [message: string];"
      },
      {
        "name": "channelCreate",
        "kind": "property",
        "static": false,
        "signature": "channelCreate: [channel: NonThreadGuildBasedChannel];"
      },
      {
        "name": "channelDelete",
        "kind": "property",
        "static": false,
        "signature": "channelDelete: [channel: DMChannel | NonThreadGuildBasedChannel];"
      },
      {
        "name": "channelPinsUpdate",
        "kind": "property",
        "static": false,
        "signature": "channelPinsUpdate: [channel: TextBasedChannel, date: Date];"
      },
      {
        "name": "channelUpdate",
        "kind": "property",
        "static": false,
        "signature": "channelUpdate: [ oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel, ];"
      },
      {
        "name": "clientReady",
        "kind": "property",
        "static": false,
        "signature": "clientReady: [client: Client<true>];"
      },
      {
        "name": "debug",
        "kind": "property",
        "static": false,
        "signature": "debug: [message: string];"
      },
      {
        "name": "warn",
        "kind": "property",
        "static": false,
        "signature": "warn: [message: string];"
      },
      {
        "name": "emojiCreate",
        "kind": "property",
        "static": false,
        "signature": "emojiCreate: [emoji: GuildEmoji];"
      },
      {
        "name": "emojiDelete",
        "kind": "property",
        "static": false,
        "signature": "emojiDelete: [emoji: GuildEmoji];"
      },
      {
        "name": "emojiUpdate",
        "kind": "property",
        "static": false,
        "signature": "emojiUpdate: [oldEmoji: GuildEmoji, newEmoji: GuildEmoji];"
      },
      {
        "name": "entitlementCreate",
        "kind": "property",
        "static": false,
        "signature": "entitlementCreate: [entitlement: Entitlement];"
      },
      {
        "name": "entitlementDelete",
        "kind": "property",
        "static": false,
        "signature": "entitlementDelete: [entitlement: Entitlement];"
      },
      {
        "name": "entitlementUpdate",
        "kind": "property",
        "static": false,
        "signature": "entitlementUpdate: [oldEntitlement: Entitlement | null, newEntitlement: Entitlement];"
      },
      {
        "name": "error",
        "kind": "property",
        "static": false,
        "signature": "error: [error: Error];"
      },
      {
        "name": "guildAuditLogEntryCreate",
        "kind": "property",
        "static": false,
        "signature": "guildAuditLogEntryCreate: [auditLogEntry: GuildAuditLogsEntry, guild: Guild];"
      },
      {
        "name": "guildAvailable",
        "kind": "property",
        "static": false,
        "signature": "guildAvailable: [guild: Guild];"
      },
      {
        "name": "guildBanAdd",
        "kind": "property",
        "static": false,
        "signature": "guildBanAdd: [ban: GuildBan];"
      },
      {
        "name": "guildBanRemove",
        "kind": "property",
        "static": false,
        "signature": "guildBanRemove: [ban: GuildBan];"
      },
      {
        "name": "guildCreate",
        "kind": "property",
        "static": false,
        "signature": "guildCreate: [guild: Guild];"
      },
      {
        "name": "guildDelete",
        "kind": "property",
        "static": false,
        "signature": "guildDelete: [guild: Guild];"
      },
      {
        "name": "guildUnavailable",
        "kind": "property",
        "static": false,
        "signature": "guildUnavailable: [guild: Guild];"
      },
      {
        "name": "guildIntegrationsUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildIntegrationsUpdate: [guild: Guild];"
      },
      {
        "name": "guildMemberAdd",
        "kind": "property",
        "static": false,
        "signature": "guildMemberAdd: [member: GuildMember];"
      },
      {
        "name": "guildMemberAvailable",
        "kind": "property",
        "static": false,
        "signature": "guildMemberAvailable: [member: GuildMember | PartialGuildMember];"
      },
      {
        "name": "guildMemberRemove",
        "kind": "property",
        "static": false,
        "signature": "guildMemberRemove: [member: GuildMember | PartialGuildMember];"
      },
      {
        "name": "guildMembersChunk",
        "kind": "property",
        "static": false,
        "signature": "guildMembersChunk: [members: ReadonlyCollection<Snowflake, GuildMember>, guild: Guild, data: GuildMembersChunk];"
      },
      {
        "name": "guildMemberUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildMemberUpdate: [oldMember: GuildMember | PartialGuildMember, newMember: GuildMember];"
      },
      {
        "name": "guildUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildUpdate: [oldGuild: Guild, newGuild: Guild];"
      },
      {
        "name": "guildSoundboardSoundCreate",
        "kind": "property",
        "static": false,
        "signature": "guildSoundboardSoundCreate: [soundboardSound: GuildSoundboardSound];"
      },
      {
        "name": "guildSoundboardSoundDelete",
        "kind": "property",
        "static": false,
        "signature": "guildSoundboardSoundDelete: [soundboardSound: GuildSoundboardSound | PartialSoundboardSound];"
      },
      {
        "name": "guildSoundboardSoundUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildSoundboardSoundUpdate: [ oldSoundboardSound: GuildSoundboardSound | null, newSoundboardSound: GuildSoundboardSound, ];"
      },
      {
        "name": "guildSoundboardSoundsUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildSoundboardSoundsUpdate: [soundboardSounds: ReadonlyCollection<Snowflake, GuildSoundboardSound>, guild: Guild];"
      },
      {
        "name": "inviteCreate",
        "kind": "property",
        "static": false,
        "signature": "inviteCreate: [invite: Invite];"
      },
      {
        "name": "inviteDelete",
        "kind": "property",
        "static": false,
        "signature": "inviteDelete: [invite: Invite];"
      },
      {
        "name": "messageCreate",
        "kind": "property",
        "static": false,
        "signature": "messageCreate: [message: OmitPartialGroupDMChannel<Message>];"
      },
      {
        "name": "messageDelete",
        "kind": "property",
        "static": false,
        "signature": "messageDelete: [message: OmitPartialGroupDMChannel<Message | PartialMessage>];"
      },
      {
        "name": "messagePollVoteAdd",
        "kind": "property",
        "static": false,
        "signature": "messagePollVoteAdd: [pollAnswer: PollAnswer | PartialPollAnswer, userId: Snowflake];"
      },
      {
        "name": "messagePollVoteRemove",
        "kind": "property",
        "static": false,
        "signature": "messagePollVoteRemove: [pollAnswer: PollAnswer | PartialPollAnswer, userId: Snowflake];"
      },
      {
        "name": "messageReactionRemoveAll",
        "kind": "property",
        "static": false,
        "signature": "messageReactionRemoveAll: [ message: OmitPartialGroupDMChannel<Message | PartialMessage>, reactions: ReadonlyCollection<string | Snowflake, MessageReaction>, ];"
      },
      {
        "name": "messageReactionRemoveEmoji",
        "kind": "property",
        "static": false,
        "signature": "messageReactionRemoveEmoji: [reaction: MessageReaction | PartialMessageReaction];"
      },
      {
        "name": "messageDeleteBulk",
        "kind": "property",
        "static": false,
        "signature": "messageDeleteBulk: [ messages: ReadonlyCollection<Snowflake, Message<true> | PartialMessage<true>>, channel: GuildTextBasedChannel, ];"
      },
      {
        "name": "messageReactionAdd",
        "kind": "property",
        "static": false,
        "signature": "messageReactionAdd: [ reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, details: MessageReactionEventDetails, ];"
      },
      {
        "name": "messageReactionRemove",
        "kind": "property",
        "static": false,
        "signature": "messageReactionRemove: [ reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, details: MessageReactionEventDetails, ];"
      },
      {
        "name": "messageUpdate",
        "kind": "property",
        "static": false,
        "signature": "messageUpdate: [ oldMessage: OmitPartialGroupDMChannel<Message | PartialMessage>, newMessage: OmitPartialGroupDMChannel<Message>, ];"
      },
      {
        "name": "presenceUpdate",
        "kind": "property",
        "static": false,
        "signature": "presenceUpdate: [oldPresence: Presence | null, newPresence: Presence];"
      },
      {
        "name": "ready",
        "kind": "property",
        "static": false,
        "signature": "ready: [client: Client<true>];"
      },
      {
        "name": "invalidated",
        "kind": "property",
        "static": false,
        "signature": "invalidated: [];"
      },
      {
        "name": "roleCreate",
        "kind": "property",
        "static": false,
        "signature": "roleCreate: [role: Role];"
      },
      {
        "name": "roleDelete",
        "kind": "property",
        "static": false,
        "signature": "roleDelete: [role: Role];"
      },
      {
        "name": "roleUpdate",
        "kind": "property",
        "static": false,
        "signature": "roleUpdate: [oldRole: Role, newRole: Role];"
      },
      {
        "name": "threadCreate",
        "kind": "property",
        "static": false,
        "signature": "threadCreate: [thread: AnyThreadChannel, newlyCreated: boolean];"
      },
      {
        "name": "threadDelete",
        "kind": "property",
        "static": false,
        "signature": "threadDelete: [thread: AnyThreadChannel];"
      },
      {
        "name": "threadListSync",
        "kind": "property",
        "static": false,
        "signature": "threadListSync: [threads: ReadonlyCollection<Snowflake, AnyThreadChannel>, guild: Guild];"
      },
      {
        "name": "threadMemberUpdate",
        "kind": "property",
        "static": false,
        "signature": "threadMemberUpdate: [oldMember: ThreadMember, newMember: ThreadMember];"
      },
      {
        "name": "threadMembersUpdate",
        "kind": "property",
        "static": false,
        "signature": "threadMembersUpdate: [ addedMembers: ReadonlyCollection<Snowflake, ThreadMember>, removedMembers: ReadonlyCollection<Snowflake, ThreadMember | PartialThreadMember>, thread: AnyThreadChannel, ];"
      },
      {
        "name": "threadUpdate",
        "kind": "property",
        "static": false,
        "signature": "threadUpdate: [oldThread: AnyThreadChannel, newThread: AnyThreadChannel];"
      },
      {
        "name": "typingStart",
        "kind": "property",
        "static": false,
        "signature": "typingStart: [typing: Typing];"
      },
      {
        "name": "userUpdate",
        "kind": "property",
        "static": false,
        "signature": "userUpdate: [oldUser: User | PartialUser, newUser: User];"
      },
      {
        "name": "voiceChannelEffectSend",
        "kind": "property",
        "static": false,
        "signature": "voiceChannelEffectSend: [voiceChannelEffect: VoiceChannelEffect];"
      },
      {
        "name": "voiceServerUpdate",
        "kind": "property",
        "static": false,
        "signature": "voiceServerUpdate: [data: VoiceServerUpdateData];"
      },
      {
        "name": "voiceStateUpdate",
        "kind": "property",
        "static": false,
        "signature": "voiceStateUpdate: [oldState: VoiceState, newState: VoiceState];"
      },
      {
        "name": "webhookUpdate",
        "kind": "property",
        "static": false,
        "signature": "webhookUpdate: ClientEvents['webhooksUpdate'];"
      },
      {
        "name": "webhooksUpdate",
        "kind": "property",
        "static": false,
        "signature": "webhooksUpdate: [channel: TextChannel | NewsChannel | VoiceChannel | ForumChannel | MediaChannel];"
      },
      {
        "name": "interactionCreate",
        "kind": "property",
        "static": false,
        "signature": "interactionCreate: [interaction: Interaction];"
      },
      {
        "name": "shardDisconnect",
        "kind": "property",
        "static": false,
        "signature": "shardDisconnect: [closeEvent: CloseEvent, shardId: number];"
      },
      {
        "name": "shardError",
        "kind": "property",
        "static": false,
        "signature": "shardError: [error: Error, shardId: number];"
      },
      {
        "name": "shardReady",
        "kind": "property",
        "static": false,
        "signature": "shardReady: [shardId: number, unavailableGuilds: Set<Snowflake> | undefined];"
      },
      {
        "name": "shardReconnecting",
        "kind": "property",
        "static": false,
        "signature": "shardReconnecting: [shardId: number];"
      },
      {
        "name": "shardResume",
        "kind": "property",
        "static": false,
        "signature": "shardResume: [shardId: number, replayedEvents: number];"
      },
      {
        "name": "stageInstanceCreate",
        "kind": "property",
        "static": false,
        "signature": "stageInstanceCreate: [stageInstance: StageInstance];"
      },
      {
        "name": "stageInstanceUpdate",
        "kind": "property",
        "static": false,
        "signature": "stageInstanceUpdate: [oldStageInstance: StageInstance | null, newStageInstance: StageInstance];"
      },
      {
        "name": "stageInstanceDelete",
        "kind": "property",
        "static": false,
        "signature": "stageInstanceDelete: [stageInstance: StageInstance];"
      },
      {
        "name": "stickerCreate",
        "kind": "property",
        "static": false,
        "signature": "stickerCreate: [sticker: Sticker];"
      },
      {
        "name": "stickerDelete",
        "kind": "property",
        "static": false,
        "signature": "stickerDelete: [sticker: Sticker];"
      },
      {
        "name": "stickerUpdate",
        "kind": "property",
        "static": false,
        "signature": "stickerUpdate: [oldSticker: Sticker, newSticker: Sticker];"
      },
      {
        "name": "subscriptionCreate",
        "kind": "property",
        "static": false,
        "signature": "subscriptionCreate: [subscription: Subscription];"
      },
      {
        "name": "subscriptionDelete",
        "kind": "property",
        "static": false,
        "signature": "subscriptionDelete: [subscription: Subscription];"
      },
      {
        "name": "subscriptionUpdate",
        "kind": "property",
        "static": false,
        "signature": "subscriptionUpdate: [oldSubscription: Subscription | null, newSubscription: Subscription];"
      },
      {
        "name": "guildScheduledEventCreate",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];"
      },
      {
        "name": "guildScheduledEventUpdate",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventUpdate: [ oldGuildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent | null, newGuildScheduledEvent: GuildScheduledEvent, ];"
      },
      {
        "name": "guildScheduledEventDelete",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent];"
      },
      {
        "name": "guildScheduledEventUserAdd",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventUserAdd: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent, user: User];"
      },
      {
        "name": "guildScheduledEventUserRemove",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventUserRemove: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent, user: User];"
      },
      {
        "name": "soundboardSounds",
        "kind": "property",
        "static": false,
        "signature": "soundboardSounds: [soundboardSounds: ReadonlyCollection<Snowflake, GuildSoundboardSound>, guild: Guild];"
      }
    ]
  },
  "ClientFetchInviteOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildScheduledEventId",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventId?: Snowflake;"
      }
    ]
  },
  "ClientOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "shards",
        "kind": "property",
        "static": false,
        "signature": "shards?: number | readonly number[] | 'auto';"
      },
      {
        "name": "shardCount",
        "kind": "property",
        "static": false,
        "signature": "shardCount?: number;"
      },
      {
        "name": "closeTimeout",
        "kind": "property",
        "static": false,
        "signature": "closeTimeout?: number;"
      },
      {
        "name": "makeCache",
        "kind": "property",
        "static": false,
        "signature": "makeCache?: CacheFactory;"
      },
      {
        "name": "allowedMentions",
        "kind": "property",
        "static": false,
        "signature": "allowedMentions?: MessageMentionOptions;"
      },
      {
        "name": "partials",
        "kind": "property",
        "static": false,
        "signature": "partials?: readonly Partials[];"
      },
      {
        "name": "failIfNotExists",
        "kind": "property",
        "static": false,
        "signature": "failIfNotExists?: boolean;"
      },
      {
        "name": "presence",
        "kind": "property",
        "static": false,
        "signature": "presence?: PresenceData;"
      },
      {
        "name": "intents",
        "kind": "property",
        "static": false,
        "signature": "intents: BitFieldResolvable<GatewayIntentsString, number>;"
      },
      {
        "name": "waitGuildTimeout",
        "kind": "property",
        "static": false,
        "signature": "waitGuildTimeout?: number;"
      },
      {
        "name": "sweepers",
        "kind": "property",
        "static": false,
        "signature": "sweepers?: SweeperOptions;"
      },
      {
        "name": "ws",
        "kind": "property",
        "static": false,
        "signature": "ws?: WebSocketOptions;"
      },
      {
        "name": "rest",
        "kind": "property",
        "static": false,
        "signature": "rest?: Partial<RESTOptions>;"
      },
      {
        "name": "jsonTransformer",
        "kind": "property",
        "static": false,
        "signature": "jsonTransformer?: (obj: unknown) => unknown;"
      },
      {
        "name": "enforceNonce",
        "kind": "property",
        "static": false,
        "signature": "enforceNonce?: boolean;"
      }
    ]
  },
  "ClientPresenceStatusData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "web",
        "kind": "property",
        "static": false,
        "signature": "web?: ClientPresenceStatus;"
      },
      {
        "name": "mobile",
        "kind": "property",
        "static": false,
        "signature": "mobile?: ClientPresenceStatus;"
      },
      {
        "name": "desktop",
        "kind": "property",
        "static": false,
        "signature": "desktop?: ClientPresenceStatus;"
      }
    ]
  },
  "ClientUserEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "username",
        "kind": "property",
        "static": false,
        "signature": "username?: string;"
      },
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "avatar?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "banner?: BufferResolvable | Base64Resolvable | null;"
      }
    ]
  },
  "CloseEvent": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "wasClean",
        "kind": "property",
        "static": false,
        "signature": "wasClean: boolean;"
      },
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "code: number;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason: string;"
      }
    ]
  },
  "CollectorOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "filter",
        "kind": "property",
        "static": false,
        "signature": "filter?: CollectorFilter<FilterArguments>;"
      },
      {
        "name": "time",
        "kind": "property",
        "static": false,
        "signature": "time?: number;"
      },
      {
        "name": "idle",
        "kind": "property",
        "static": false,
        "signature": "idle?: number;"
      },
      {
        "name": "dispose",
        "kind": "property",
        "static": false,
        "signature": "dispose?: boolean;"
      }
    ]
  },
  "CollectorResetTimerOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "time",
        "kind": "property",
        "static": false,
        "signature": "time?: number;"
      },
      {
        "name": "idle",
        "kind": "property",
        "static": false,
        "signature": "idle?: number;"
      }
    ]
  },
  "CommandInteractionOption": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value?: string | number | boolean;"
      },
      {
        "name": "focused",
        "kind": "property",
        "static": false,
        "signature": "focused?: boolean;"
      },
      {
        "name": "autocomplete",
        "kind": "property",
        "static": false,
        "signature": "autocomplete?: boolean;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options?: readonly CommandInteractionOption[];"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user?: User;"
      },
      {
        "name": "member",
        "kind": "property",
        "static": false,
        "signature": "member?: CacheTypeReducer<Cached, GuildMember, APIInteractionDataResolvedGuildMember>;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: CacheTypeReducer<Cached, GuildBasedChannel, APIInteractionDataResolvedChannel>;"
      },
      {
        "name": "role",
        "kind": "property",
        "static": false,
        "signature": "role?: CacheTypeReducer<Cached, Role, APIRole>;"
      },
      {
        "name": "attachment",
        "kind": "property",
        "static": false,
        "signature": "attachment?: Attachment;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message?: Message<BooleanCache<Cached>>;"
      }
    ]
  },
  "BaseInteractionResolvedData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "attachments",
        "kind": "property",
        "static": false,
        "signature": "attachments?: ReadonlyCollection<Snowflake, Attachment>;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "channels?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, Channel, APIInteractionDataResolvedChannel>>;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "members?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, GuildMember, APIInteractionDataResolvedGuildMember>>;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, Role, APIRole>>;"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "users?: ReadonlyCollection<Snowflake, User>;"
      }
    ]
  },
  "CommandInteractionResolvedData": {
    "kind": "interface",
    "extends": [
      "BaseInteractionResolvedData<Cached>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "messages",
        "kind": "property",
        "static": false,
        "signature": "messages?: ReadonlyCollection<Snowflake, CacheTypeReducer<Cached, Message, APIMessage>>;"
      }
    ]
  },
  "AutocompleteFocusedOption": {
    "kind": "interface",
    "extends": [
      "Pick<CommandInteractionOption, 'name'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "focused",
        "kind": "property",
        "static": false,
        "signature": "focused: true;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ApplicationCommandOptionType.String | ApplicationCommandOptionType.Integer | ApplicationCommandOptionType.Number;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "GuildScheduledEventInviteURLCreateOptions": {
    "kind": "interface",
    "extends": [
      "InviteCreateOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildInvitableChannelResolvable;"
      }
    ]
  },
  "RoleCreateOptions": {
    "kind": "interface",
    "extends": [
      "RoleData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "colors",
        "kind": "property",
        "static": false,
        "signature": "colors?: RoleColorsResolvable;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "RoleEditOptions": {
    "kind": "interface",
    "extends": [
      "RoleData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "colors",
        "kind": "property",
        "static": false,
        "signature": "colors?: RoleColorsEditResolvable;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "StageInstanceCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "topic: string;"
      },
      {
        "name": "privacyLevel",
        "kind": "property",
        "static": false,
        "signature": "privacyLevel?: StageInstancePrivacyLevel;"
      },
      {
        "name": "sendStartNotification",
        "kind": "property",
        "static": false,
        "signature": "sendStartNotification?: boolean;"
      },
      {
        "name": "guildScheduledEvent",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEvent?: GuildScheduledEventResolvable;"
      }
    ]
  },
  "CrosspostedChannel": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "channelId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ChannelType;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "GuildTemplateEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      }
    ]
  },
  "EmbedField": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      },
      {
        "name": "inline",
        "kind": "property",
        "static": false,
        "signature": "inline: boolean;"
      }
    ]
  },
  "FetchApplicationCommandOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId?: Snowflake;"
      },
      {
        "name": "locale",
        "kind": "property",
        "static": false,
        "signature": "locale?: Locale;"
      },
      {
        "name": "withLocalizations",
        "kind": "property",
        "static": false,
        "signature": "withLocalizations?: boolean;"
      }
    ]
  },
  "FetchArchivedThreadOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: 'public' | 'private';"
      },
      {
        "name": "fetchAll",
        "kind": "property",
        "static": false,
        "signature": "fetchAll?: boolean;"
      },
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: ThreadChannelResolvable | DateResolvable;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      }
    ]
  },
  "FetchAutoModerationRuleOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "autoModerationRule",
        "kind": "property",
        "static": false,
        "signature": "autoModerationRule: AutoModerationRuleResolvable;"
      }
    ]
  },
  "FetchAutoModerationRulesOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchBanOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: UserResolvable;"
      }
    ]
  },
  "FetchBansOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchChannelOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "allowUnknownGuild",
        "kind": "property",
        "static": false,
        "signature": "allowUnknownGuild?: boolean;"
      }
    ]
  },
  "FetchedThreads": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "threads: ReadonlyCollection<Snowflake, AnyThreadChannel>;"
      },
      {
        "name": "members",
        "kind": "property",
        "static": false,
        "signature": "members: ReadonlyCollection<Snowflake, ThreadMember>;"
      }
    ]
  },
  "FetchedThreadsMore": {
    "kind": "interface",
    "extends": [
      "FetchedThreads"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "hasMore",
        "kind": "property",
        "static": false,
        "signature": "hasMore: boolean;"
      }
    ]
  },
  "FetchGuildOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild: GuildResolvable;"
      },
      {
        "name": "withCounts",
        "kind": "property",
        "static": false,
        "signature": "withCounts?: boolean;"
      }
    ]
  },
  "FetchGuildsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      }
    ]
  },
  "FetchGuildScheduledEventOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildScheduledEvent",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEvent: GuildScheduledEventResolvable;"
      },
      {
        "name": "withUserCount",
        "kind": "property",
        "static": false,
        "signature": "withUserCount?: boolean;"
      }
    ]
  },
  "FetchGuildScheduledEventsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      },
      {
        "name": "withUserCount",
        "kind": "property",
        "static": false,
        "signature": "withUserCount?: boolean;"
      }
    ]
  },
  "FetchGuildScheduledEventSubscribersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "withMember",
        "kind": "property",
        "static": false,
        "signature": "withMember?: boolean;"
      }
    ]
  },
  "FetchInviteOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "code: string;"
      }
    ]
  },
  "FetchInvitesOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "channelId?: GuildInvitableChannelResolvable;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchMemberOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: UserResolvable;"
      }
    ]
  },
  "FetchMembersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user?: UserResolvable | readonly UserResolvable[];"
      },
      {
        "name": "query",
        "kind": "property",
        "static": false,
        "signature": "query?: string;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "withPresences",
        "kind": "property",
        "static": false,
        "signature": "withPresences?: boolean;"
      },
      {
        "name": "time",
        "kind": "property",
        "static": false,
        "signature": "time?: number;"
      },
      {
        "name": "nonce",
        "kind": "property",
        "static": false,
        "signature": "nonce?: string;"
      }
    ]
  },
  "FetchMessageOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: MessageResolvable;"
      }
    ]
  },
  "FetchMessagesOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "around",
        "kind": "property",
        "static": false,
        "signature": "around?: Snowflake;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchPinnedMessagesOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: DateResolvable;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      }
    ]
  },
  "FetchPinnedMessagesResponse": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "hasMore",
        "kind": "property",
        "static": false,
        "signature": "hasMore: boolean;"
      },
      {
        "name": "items",
        "kind": "property",
        "static": false,
        "signature": "items: readonly MessagePin<InGuild>[];"
      }
    ]
  },
  "MessagePin": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: Message<InGuild>;"
      },
      {
        "name": "pinnedAt",
        "kind": "getter",
        "static": false,
        "signature": "get pinnedAt(): Date;"
      },
      {
        "name": "pinnedTimestamp",
        "kind": "property",
        "static": false,
        "signature": "pinnedTimestamp: number;"
      }
    ]
  },
  "FetchReactionUsersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: ReactionType;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      }
    ]
  },
  "FetchThreadMemberOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "member",
        "kind": "property",
        "static": false,
        "signature": "member: ThreadMemberResolvable;"
      },
      {
        "name": "withMember",
        "kind": "property",
        "static": false,
        "signature": "withMember?: boolean;"
      }
    ]
  },
  "FetchThreadOwnerOptions": {
    "kind": "interface",
    "extends": [
      "BaseFetchOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withMember",
        "kind": "property",
        "static": false,
        "signature": "withMember?: boolean;"
      }
    ]
  },
  "FetchThreadMembersWithGuildMemberDataOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withMember",
        "kind": "property",
        "static": false,
        "signature": "withMember: true;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchThreadMembersWithoutGuildMemberDataOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withMember",
        "kind": "property",
        "static": false,
        "signature": "withMember?: false;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "FetchThreadsOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "archived",
        "kind": "property",
        "static": false,
        "signature": "archived?: FetchArchivedThreadOptions;"
      }
    ]
  },
  "AttachmentPayload": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "attachment",
        "kind": "property",
        "static": false,
        "signature": "attachment: BufferResolvable | Stream;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "duration",
        "kind": "property",
        "static": false,
        "signature": "duration?: number;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title?: string;"
      },
      {
        "name": "waveform",
        "kind": "property",
        "static": false,
        "signature": "waveform?: string;"
      }
    ]
  },
  "GuildAuditLogsTypes": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "[AuditLogEvent.GuildUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.GuildUpdate]: ['Guild', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.ChannelCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelCreate]: ['Channel', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.ChannelUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelUpdate]: ['Channel', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.ChannelDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelDelete]: ['Channel', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteCreate]: ['Channel', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteUpdate]: ['Channel', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteDelete]: ['Channel', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MemberKick]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberKick]: ['User', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MemberPrune]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberPrune]: ['User', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MemberBanAdd]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberBanAdd]: ['User', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MemberBanRemove]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberBanRemove]: ['User', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.MemberUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberUpdate]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.MemberRoleUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberRoleUpdate]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.MemberMove]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberMove]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.MemberDisconnect]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberDisconnect]: ['User', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.BotAdd]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.BotAdd]: ['User', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.RoleCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.RoleCreate]: ['Role', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.RoleUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.RoleUpdate]: ['Role', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.RoleDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.RoleDelete]: ['Role', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.InviteCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.InviteCreate]: ['Invite', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.InviteUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.InviteUpdate]: ['Invite', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.InviteDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.InviteDelete]: ['Invite', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.WebhookCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.WebhookCreate]: ['Webhook', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.WebhookUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.WebhookUpdate]: ['Webhook', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.WebhookDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.WebhookDelete]: ['Webhook', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.EmojiCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.EmojiCreate]: ['Emoji', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.EmojiUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.EmojiUpdate]: ['Emoji', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.EmojiDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.EmojiDelete]: ['Emoji', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MessageDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageDelete]: ['Message', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MessageBulkDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageBulkDelete]: ['Message', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.MessagePin]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessagePin]: ['Message', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.MessageUnpin]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageUnpin]: ['Message', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.IntegrationCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.IntegrationCreate]: ['Integration', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.IntegrationUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.IntegrationUpdate]: ['Integration', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.IntegrationDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.IntegrationDelete]: ['Integration', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.StageInstanceCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceCreate]: ['StageInstance', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.StageInstanceUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceUpdate]: ['StageInstance', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.StageInstanceDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceDelete]: ['StageInstance', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.StickerCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StickerCreate]: ['Sticker', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.StickerUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StickerUpdate]: ['Sticker', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.StickerDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StickerDelete]: ['Sticker', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.GuildScheduledEventCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.GuildScheduledEventCreate]: ['GuildScheduledEvent', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.GuildScheduledEventUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.GuildScheduledEventUpdate]: ['GuildScheduledEvent', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.GuildScheduledEventDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.GuildScheduledEventDelete]: ['GuildScheduledEvent', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.ThreadCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ThreadCreate]: ['Thread', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.ThreadUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ThreadUpdate]: ['Thread', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.ThreadDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ThreadDelete]: ['Thread', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.ApplicationCommandPermissionUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ApplicationCommandPermissionUpdate]: ['ApplicationCommand', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.SoundboardSoundCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.SoundboardSoundCreate]: ['SoundboardSound', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.SoundboardSoundUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.SoundboardSoundUpdate]: ['SoundboardSound', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.SoundboardSoundDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.SoundboardSoundDelete]: ['SoundboardSound', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationRuleCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationRuleCreate]: ['AutoModeration', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationRuleUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationRuleUpdate]: ['AutoModeration', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationRuleDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationRuleDelete]: ['AutoModeration', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationBlockMessage]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationBlockMessage]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationFlagToChannel]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationFlagToChannel]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.AutoModerationUserCommunicationDisabled]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationUserCommunicationDisabled]: ['User', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.OnboardingPromptCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.OnboardingPromptCreate]: ['GuildOnboardingPrompt', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.OnboardingPromptUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.OnboardingPromptUpdate]: ['GuildOnboardingPrompt', 'Update'];"
      },
      {
        "name": "[AuditLogEvent.OnboardingPromptDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.OnboardingPromptDelete]: ['GuildOnboardingPrompt', 'Delete'];"
      },
      {
        "name": "[AuditLogEvent.OnboardingCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.OnboardingCreate]: ['GuildOnboarding', 'Create'];"
      },
      {
        "name": "[AuditLogEvent.OnboardingUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.OnboardingUpdate]: ['GuildOnboarding', 'Update'];"
      }
    ]
  },
  "GuildAuditLogsEntryExtraField": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "[AuditLogEvent.MemberKick]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberKick]: { integrationType: string } | null;"
      },
      {
        "name": "[AuditLogEvent.MemberRoleUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberRoleUpdate]: { integrationType: string } | null;"
      },
      {
        "name": "[AuditLogEvent.MemberPrune]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberPrune]: { removed: number; days: number };"
      },
      {
        "name": "[AuditLogEvent.MemberMove]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberMove]: { channel: VoiceBasedChannel | { id: Snowflake }; count: number };"
      },
      {
        "name": "[AuditLogEvent.MessageDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageDelete]: { channel: GuildTextBasedChannel | { id: Snowflake }; count: number };"
      },
      {
        "name": "[AuditLogEvent.MessageBulkDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageBulkDelete]: { count: number };"
      },
      {
        "name": "[AuditLogEvent.MessagePin]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessagePin]: { channel: GuildTextBasedChannel | { id: Snowflake }; messageId: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.MessageUnpin]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MessageUnpin]: { channel: GuildTextBasedChannel | { id: Snowflake }; messageId: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.MemberDisconnect]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.MemberDisconnect]: { count: number };"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteCreate]: | Role | GuildMember | { id: Snowflake; name: string; type: AuditLogOptionsType.Role } | { id: Snowflake; type: AuditLogOptionsType.Member };"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteUpdate]: | Role | GuildMember | { id: Snowflake; name: string; type: AuditLogOptionsType.Role } | { id: Snowflake; type: AuditLogOptionsType.Member };"
      },
      {
        "name": "[AuditLogEvent.ChannelOverwriteDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ChannelOverwriteDelete]: | Role | GuildMember | { id: Snowflake; name: string; type: AuditLogOptionsType.Role } | { id: Snowflake; type: AuditLogOptionsType.Member };"
      },
      {
        "name": "[AuditLogEvent.StageInstanceCreate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceCreate]: StageChannel | { id: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.StageInstanceDelete]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceDelete]: StageChannel | { id: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.StageInstanceUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.StageInstanceUpdate]: StageChannel | { id: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.ApplicationCommandPermissionUpdate]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.ApplicationCommandPermissionUpdate]: { applicationId: Snowflake };"
      },
      {
        "name": "[AuditLogEvent.AutoModerationBlockMessage]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationBlockMessage]: { autoModerationRuleName: string; autoModerationRuleTriggerType: AuditLogRuleTriggerType; channel: GuildTextBasedChannel | { id: Snowflake }; };"
      },
      {
        "name": "[AuditLogEvent.AutoModerationFlagToChannel]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationFlagToChannel]: { autoModerationRuleName: string; autoModerationRuleTriggerType: AuditLogRuleTriggerType; channel: GuildTextBasedChannel | { id: Snowflake }; };"
      },
      {
        "name": "[AuditLogEvent.AutoModerationUserCommunicationDisabled]",
        "kind": "property",
        "static": false,
        "signature": "[AuditLogEvent.AutoModerationUserCommunicationDisabled]: { autoModerationRuleName: string; autoModerationRuleTriggerType: AuditLogRuleTriggerType; channel: GuildTextBasedChannel | { id: Snowflake }; };"
      }
    ]
  },
  "GuildAuditLogsEntryTargetField": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "User",
        "kind": "property",
        "static": false,
        "signature": "User: User | PartialUser | null;"
      },
      {
        "name": "Guild",
        "kind": "property",
        "static": false,
        "signature": "Guild: Guild;"
      },
      {
        "name": "Webhook",
        "kind": "property",
        "static": false,
        "signature": "Webhook: Webhook<WebhookType.ChannelFollower | WebhookType.Incoming>;"
      },
      {
        "name": "Invite",
        "kind": "property",
        "static": false,
        "signature": "Invite: Invite;"
      },
      {
        "name": "Emoji",
        "kind": "property",
        "static": false,
        "signature": "Emoji: GuildEmoji | { id: Snowflake };"
      },
      {
        "name": "Role",
        "kind": "property",
        "static": false,
        "signature": "Role: Role | { id: Snowflake };"
      },
      {
        "name": "Message",
        "kind": "property",
        "static": false,
        "signature": "Message: TAction extends AuditLogEvent.MessageBulkDelete ? GuildTextBasedChannel | { id: Snowflake } : User | null;"
      },
      {
        "name": "Integration",
        "kind": "property",
        "static": false,
        "signature": "Integration: Integration;"
      },
      {
        "name": "Channel",
        "kind": "property",
        "static": false,
        "signature": "Channel: NonThreadGuildBasedChannel | { id: Snowflake; [x: string]: unknown };"
      },
      {
        "name": "Thread",
        "kind": "property",
        "static": false,
        "signature": "Thread: AnyThreadChannel | { id: Snowflake; [x: string]: unknown };"
      },
      {
        "name": "StageInstance",
        "kind": "property",
        "static": false,
        "signature": "StageInstance: StageInstance;"
      },
      {
        "name": "Sticker",
        "kind": "property",
        "static": false,
        "signature": "Sticker: Sticker;"
      },
      {
        "name": "GuildScheduledEvent",
        "kind": "property",
        "static": false,
        "signature": "GuildScheduledEvent: GuildScheduledEvent;"
      },
      {
        "name": "ApplicationCommand",
        "kind": "property",
        "static": false,
        "signature": "ApplicationCommand: ApplicationCommand | { id: Snowflake };"
      },
      {
        "name": "AutoModerationRule",
        "kind": "property",
        "static": false,
        "signature": "AutoModerationRule: AutoModerationRule;"
      },
      {
        "name": "GuildOnboardingPrompt",
        "kind": "property",
        "static": false,
        "signature": "GuildOnboardingPrompt: GuildOnboardingPrompt | { id: Snowflake; [x: string]: unknown };"
      },
      {
        "name": "SoundboardSound",
        "kind": "property",
        "static": false,
        "signature": "SoundboardSound: SoundboardSound | { id: Snowflake };"
      }
    ]
  },
  "GuildAuditLogsFetchOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "before",
        "kind": "property",
        "static": false,
        "signature": "before?: Snowflake | GuildAuditLogsEntry;"
      },
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake | GuildAuditLogsEntry;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user?: UserResolvable;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: Event;"
      }
    ]
  },
  "AutoModerationRuleCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "eventType",
        "kind": "property",
        "static": false,
        "signature": "eventType: AutoModerationRuleEventType;"
      },
      {
        "name": "triggerType",
        "kind": "property",
        "static": false,
        "signature": "triggerType: AutoModerationRuleTriggerType;"
      },
      {
        "name": "triggerMetadata",
        "kind": "property",
        "static": false,
        "signature": "triggerMetadata?: AutoModerationTriggerMetadataOptions;"
      },
      {
        "name": "actions",
        "kind": "property",
        "static": false,
        "signature": "actions: readonly AutoModerationActionOptions[];"
      },
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "enabled?: boolean;"
      },
      {
        "name": "exemptRoles",
        "kind": "property",
        "static": false,
        "signature": "exemptRoles?: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[];"
      },
      {
        "name": "exemptChannels",
        "kind": "property",
        "static": false,
        "signature": "exemptChannels?: ReadonlyCollection<Snowflake, GuildBasedChannel> | readonly GuildChannelResolvable[];"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "AutoModerationRuleEditOptions": {
    "kind": "interface",
    "extends": [
      "Partial<Omit<AutoModerationRuleCreateOptions, 'triggerType'>>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "AutoModerationTriggerMetadataOptions": {
    "kind": "interface",
    "extends": [
      "Partial<AutoModerationTriggerMetadata>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "AutoModerationActionOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: AutoModerationActionType;"
      },
      {
        "name": "metadata",
        "kind": "property",
        "static": false,
        "signature": "metadata?: AutoModerationActionMetadataOptions;"
      }
    ]
  },
  "AutoModerationActionMetadataOptions": {
    "kind": "interface",
    "extends": [
      "Partial<Omit<AutoModerationActionMetadata, 'channelId'>>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildTextChannelResolvable | ThreadChannel;"
      }
    ]
  },
  "GuildChannelCreateOptions": {
    "kind": "interface",
    "extends": [
      "Omit<CategoryCreateChannelOptions, 'type'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "parent",
        "kind": "property",
        "static": false,
        "signature": "parent?: CategoryChannelResolvable | null;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: Exclude< ChannelType, | ChannelType.DM | ChannelType.GroupDM | ChannelType.PublicThread | ChannelType.AnnouncementThread | ChannelType.PrivateThread >;"
      }
    ]
  },
  "GuildChannelCloneOptions": {
    "kind": "interface",
    "extends": [
      "Omit<GuildChannelCreateOptions, 'name'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      }
    ]
  },
  "GuildChannelEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: ChannelType.GuildText | ChannelType.GuildAnnouncement;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position?: number;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "topic?: string | null;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "nsfw?: boolean;"
      },
      {
        "name": "bitrate",
        "kind": "property",
        "static": false,
        "signature": "bitrate?: number;"
      },
      {
        "name": "userLimit",
        "kind": "property",
        "static": false,
        "signature": "userLimit?: number;"
      },
      {
        "name": "parent",
        "kind": "property",
        "static": false,
        "signature": "parent?: CategoryChannelResolvable | null;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "rateLimitPerUser?: number;"
      },
      {
        "name": "lockPermissions",
        "kind": "property",
        "static": false,
        "signature": "lockPermissions?: boolean;"
      },
      {
        "name": "permissionOverwrites",
        "kind": "property",
        "static": false,
        "signature": "permissionOverwrites?: readonly OverwriteResolvable[] | ReadonlyCollection<Snowflake, OverwriteResolvable>;"
      },
      {
        "name": "defaultAutoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;"
      },
      {
        "name": "rtcRegion",
        "kind": "property",
        "static": false,
        "signature": "rtcRegion?: string | null;"
      },
      {
        "name": "videoQualityMode",
        "kind": "property",
        "static": false,
        "signature": "videoQualityMode?: VideoQualityMode | null;"
      },
      {
        "name": "availableTags",
        "kind": "property",
        "static": false,
        "signature": "availableTags?: readonly GuildForumTagData[];"
      },
      {
        "name": "defaultReactionEmoji",
        "kind": "property",
        "static": false,
        "signature": "defaultReactionEmoji?: DefaultReactionEmoji | null;"
      },
      {
        "name": "defaultThreadRateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "defaultThreadRateLimitPerUser?: number;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: ChannelFlagsResolvable;"
      },
      {
        "name": "defaultSortOrder",
        "kind": "property",
        "static": false,
        "signature": "defaultSortOrder?: SortOrderType | null;"
      },
      {
        "name": "defaultForumLayout",
        "kind": "property",
        "static": false,
        "signature": "defaultForumLayout?: ForumLayoutType;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildChannelOverwriteOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: OverwriteType;"
      }
    ]
  },
  "GuildCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "icon?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "verificationLevel",
        "kind": "property",
        "static": false,
        "signature": "verificationLevel?: GuildVerificationLevel;"
      },
      {
        "name": "defaultMessageNotifications",
        "kind": "property",
        "static": false,
        "signature": "defaultMessageNotifications?: GuildDefaultMessageNotifications;"
      },
      {
        "name": "explicitContentFilter",
        "kind": "property",
        "static": false,
        "signature": "explicitContentFilter?: GuildExplicitContentFilter;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: readonly PartialRoleData[];"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "channels?: readonly PartialChannelData[];"
      },
      {
        "name": "afkChannelId",
        "kind": "property",
        "static": false,
        "signature": "afkChannelId?: Snowflake | number;"
      },
      {
        "name": "afkTimeout",
        "kind": "property",
        "static": false,
        "signature": "afkTimeout?: number;"
      },
      {
        "name": "systemChannelId",
        "kind": "property",
        "static": false,
        "signature": "systemChannelId?: Snowflake | number;"
      },
      {
        "name": "systemChannelFlags",
        "kind": "property",
        "static": false,
        "signature": "systemChannelFlags?: SystemChannelFlagsResolvable;"
      }
    ]
  },
  "GuildWidgetSettings": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "enabled: boolean;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel: TextChannel | NewsChannel | VoiceBasedChannel | ForumChannel | MediaChannel | null;"
      }
    ]
  },
  "GuildEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "verificationLevel",
        "kind": "property",
        "static": false,
        "signature": "verificationLevel?: GuildVerificationLevel | null;"
      },
      {
        "name": "defaultMessageNotifications",
        "kind": "property",
        "static": false,
        "signature": "defaultMessageNotifications?: GuildDefaultMessageNotifications | null;"
      },
      {
        "name": "explicitContentFilter",
        "kind": "property",
        "static": false,
        "signature": "explicitContentFilter?: GuildExplicitContentFilter | null;"
      },
      {
        "name": "afkTimeout",
        "kind": "property",
        "static": false,
        "signature": "afkTimeout?: number;"
      },
      {
        "name": "afkChannel",
        "kind": "property",
        "static": false,
        "signature": "afkChannel?: VoiceChannelResolvable | null;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "icon?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "owner",
        "kind": "property",
        "static": false,
        "signature": "owner?: GuildMemberResolvable;"
      },
      {
        "name": "splash",
        "kind": "property",
        "static": false,
        "signature": "splash?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "discoverySplash",
        "kind": "property",
        "static": false,
        "signature": "discoverySplash?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "banner?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "systemChannel",
        "kind": "property",
        "static": false,
        "signature": "systemChannel?: TextChannelResolvable | null;"
      },
      {
        "name": "systemChannelFlags",
        "kind": "property",
        "static": false,
        "signature": "systemChannelFlags?: SystemChannelFlagsResolvable;"
      },
      {
        "name": "rulesChannel",
        "kind": "property",
        "static": false,
        "signature": "rulesChannel?: TextChannelResolvable | null;"
      },
      {
        "name": "publicUpdatesChannel",
        "kind": "property",
        "static": false,
        "signature": "publicUpdatesChannel?: TextChannelResolvable | null;"
      },
      {
        "name": "safetyAlertsChannel",
        "kind": "property",
        "static": false,
        "signature": "safetyAlertsChannel?: TextChannelResolvable | null;"
      },
      {
        "name": "preferredLocale",
        "kind": "property",
        "static": false,
        "signature": "preferredLocale?: Locale | null;"
      },
      {
        "name": "features",
        "kind": "property",
        "static": false,
        "signature": "features?: readonly `${GuildFeature}`[];"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string | null;"
      },
      {
        "name": "premiumProgressBarEnabled",
        "kind": "property",
        "static": false,
        "signature": "premiumProgressBarEnabled?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildEmojiCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "attachment",
        "kind": "property",
        "static": false,
        "signature": "attachment: BufferResolvable | Base64Resolvable;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[];"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildEmojiEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[];"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildStickerCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "file",
        "kind": "property",
        "static": false,
        "signature": "file: BufferResolvable | Stream | AttachmentPayload | JSONEncodable<AttachmentBuilder>;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "tags: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string | null;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildStickerEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string | null;"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "tags?: string;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildMemberEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "nick",
        "kind": "property",
        "static": false,
        "signature": "nick?: string | null;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: ReadonlyCollection<Snowflake, Role> | readonly RoleResolvable[];"
      },
      {
        "name": "mute",
        "kind": "property",
        "static": false,
        "signature": "mute?: boolean;"
      },
      {
        "name": "deaf",
        "kind": "property",
        "static": false,
        "signature": "deaf?: boolean;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildVoiceChannelResolvable | null;"
      },
      {
        "name": "communicationDisabledUntil",
        "kind": "property",
        "static": false,
        "signature": "communicationDisabledUntil?: DateResolvable | null;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: GuildMemberFlagsResolvable;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildMemberEditMeOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "avatar?: Base64Resolvable | BufferResolvable | null;"
      },
      {
        "name": "banner",
        "kind": "property",
        "static": false,
        "signature": "banner?: Base64Resolvable | BufferResolvable | null;"
      },
      {
        "name": "bio",
        "kind": "property",
        "static": false,
        "signature": "bio?: string | null;"
      },
      {
        "name": "nick",
        "kind": "property",
        "static": false,
        "signature": "nick?: string | null;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildPruneMembersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "count",
        "kind": "property",
        "static": false,
        "signature": "count?: boolean;"
      },
      {
        "name": "days",
        "kind": "property",
        "static": false,
        "signature": "days?: number;"
      },
      {
        "name": "dry",
        "kind": "property",
        "static": false,
        "signature": "dry?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: readonly RoleResolvable[];"
      }
    ]
  },
  "GuildWidgetSettingsData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "enabled: boolean;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel: TextChannel | NewsChannel | VoiceBasedChannel | ForumChannel | MediaChannel | Snowflake | null;"
      }
    ]
  },
  "GuildSearchMembersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "query",
        "kind": "property",
        "static": false,
        "signature": "query: string;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "GuildListMembersOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "after",
        "kind": "property",
        "static": false,
        "signature": "after?: Snowflake;"
      },
      {
        "name": "limit",
        "kind": "property",
        "static": false,
        "signature": "limit?: number;"
      },
      {
        "name": "cache",
        "kind": "property",
        "static": false,
        "signature": "cache?: boolean;"
      }
    ]
  },
  "GuildScheduledEventCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "scheduledStartTime",
        "kind": "property",
        "static": false,
        "signature": "scheduledStartTime: DateResolvable;"
      },
      {
        "name": "scheduledEndTime",
        "kind": "property",
        "static": false,
        "signature": "scheduledEndTime?: DateResolvable;"
      },
      {
        "name": "privacyLevel",
        "kind": "property",
        "static": false,
        "signature": "privacyLevel: GuildScheduledEventPrivacyLevel;"
      },
      {
        "name": "entityType",
        "kind": "property",
        "static": false,
        "signature": "entityType: GuildScheduledEventEntityType;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildVoiceChannelResolvable;"
      },
      {
        "name": "entityMetadata",
        "kind": "property",
        "static": false,
        "signature": "entityMetadata?: GuildScheduledEventEntityMetadataOptions;"
      },
      {
        "name": "image",
        "kind": "property",
        "static": false,
        "signature": "image?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      },
      {
        "name": "recurrenceRule",
        "kind": "property",
        "static": false,
        "signature": "recurrenceRule?: GuildScheduledEventRecurrenceRuleOptions;"
      }
    ]
  },
  "GuildScheduledEventEditOptions": {
    "kind": "interface",
    "extends": [
      "Omit<Partial<GuildScheduledEventCreateOptions>, 'channel' | 'recurrenceRule'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildVoiceChannelResolvable | null;"
      },
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "status?: AcceptableStatus;"
      },
      {
        "name": "recurrenceRule",
        "kind": "property",
        "static": false,
        "signature": "recurrenceRule?: GuildScheduledEventRecurrenceRuleOptions | null;"
      }
    ]
  },
  "GuildScheduledEventEntityMetadata": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "location",
        "kind": "property",
        "static": false,
        "signature": "location: string | null;"
      }
    ]
  },
  "GuildScheduledEventEntityMetadataOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "location",
        "kind": "property",
        "static": false,
        "signature": "location?: string;"
      }
    ]
  },
  "GuildScheduledEventUser": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "guildScheduledEventId",
        "kind": "property",
        "static": false,
        "signature": "guildScheduledEventId: Snowflake;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: User;"
      },
      {
        "name": "member",
        "kind": "property",
        "static": false,
        "signature": "member: WithMember extends true ? GuildMember : null;"
      }
    ]
  },
  "GuildOnboardingEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "prompts",
        "kind": "property",
        "static": false,
        "signature": "prompts?: readonly GuildOnboardingPromptData[] | ReadonlyCollection<Snowflake, GuildOnboardingPrompt>;"
      },
      {
        "name": "defaultChannels",
        "kind": "property",
        "static": false,
        "signature": "defaultChannels?: readonly ChannelResolvable[] | ReadonlyCollection<Snowflake, GuildChannel>;"
      },
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "enabled?: boolean;"
      },
      {
        "name": "mode",
        "kind": "property",
        "static": false,
        "signature": "mode?: GuildOnboardingMode;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "GuildOnboardingPromptData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id?: Snowflake;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title: string;"
      },
      {
        "name": "singleSelect",
        "kind": "property",
        "static": false,
        "signature": "singleSelect?: boolean;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "inOnboarding",
        "kind": "property",
        "static": false,
        "signature": "inOnboarding?: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: GuildOnboardingPromptType;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options: readonly GuildOnboardingPromptOptionData[] | ReadonlyCollection<Snowflake, GuildOnboardingPromptOption>;"
      }
    ]
  },
  "GuildOnboardingPromptOptionData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id?: Snowflake | null;"
      },
      {
        "name": "channels",
        "kind": "property",
        "static": false,
        "signature": "channels?: readonly ChannelResolvable[] | ReadonlyCollection<Snowflake, GuildChannel>;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>;"
      },
      {
        "name": "title",
        "kind": "property",
        "static": false,
        "signature": "title: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string | null;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji?: EmojiIdentifierResolvable | Emoji | null;"
      }
    ]
  },
  "IncidentActions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "invitesDisabledUntil",
        "kind": "property",
        "static": false,
        "signature": "invitesDisabledUntil: Date | null;"
      },
      {
        "name": "dmsDisabledUntil",
        "kind": "property",
        "static": false,
        "signature": "dmsDisabledUntil: Date | null;"
      },
      {
        "name": "dmSpamDetectedAt",
        "kind": "property",
        "static": false,
        "signature": "dmSpamDetectedAt: Date | null;"
      },
      {
        "name": "raidDetectedAt",
        "kind": "property",
        "static": false,
        "signature": "raidDetectedAt: Date | null;"
      }
    ]
  },
  "IncidentActionsEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "invitesDisabledUntil",
        "kind": "property",
        "static": false,
        "signature": "invitesDisabledUntil?: DateResolvable | null | undefined;"
      },
      {
        "name": "dmsDisabledUntil",
        "kind": "property",
        "static": false,
        "signature": "dmsDisabledUntil?: DateResolvable | null | undefined;"
      }
    ]
  },
  "IntegrationAccount": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: string | Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "IntegrationTypesConfigurationContext": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "oauth2InstallParams",
        "kind": "property",
        "static": false,
        "signature": "oauth2InstallParams: IntegrationTypesConfigurationParameters | null;"
      }
    ]
  },
  "InteractionCollectorOptions": {
    "kind": "interface",
    "extends": [
      "CollectorOptions<[Interaction, Collection<Snowflake, Interaction>]>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: TextBasedChannelResolvable;"
      },
      {
        "name": "componentType",
        "kind": "property",
        "static": false,
        "signature": "componentType?: ComponentType;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild?: GuildResolvable;"
      },
      {
        "name": "interactionType",
        "kind": "property",
        "static": false,
        "signature": "interactionType?: InteractionType;"
      },
      {
        "name": "max",
        "kind": "property",
        "static": false,
        "signature": "max?: number;"
      },
      {
        "name": "maxComponents",
        "kind": "property",
        "static": false,
        "signature": "maxComponents?: number;"
      },
      {
        "name": "maxUsers",
        "kind": "property",
        "static": false,
        "signature": "maxUsers?: number;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message?: CacheTypeReducer<Cached, Message, APIMessage>;"
      },
      {
        "name": "interactionResponse",
        "kind": "property",
        "static": false,
        "signature": "interactionResponse?: InteractionResponse<BooleanCache<Cached>>;"
      }
    ]
  },
  "InteractionDeferReplyOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "ephemeral?: boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: BitFieldResolvable<Extract<MessageFlagsString, 'Ephemeral'>, MessageFlags.Ephemeral> | undefined;"
      },
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      },
      {
        "name": "fetchReply",
        "kind": "property",
        "static": false,
        "signature": "fetchReply?: boolean;"
      }
    ]
  },
  "InteractionDeferUpdateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      },
      {
        "name": "fetchReply",
        "kind": "property",
        "static": false,
        "signature": "fetchReply?: boolean;"
      }
    ]
  },
  "InteractionReplyOptions": {
    "kind": "interface",
    "extends": [
      "BaseMessageOptionsWithPoll"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "ephemeral",
        "kind": "property",
        "static": false,
        "signature": "ephemeral?: boolean;"
      },
      {
        "name": "tts",
        "kind": "property",
        "static": false,
        "signature": "tts?: boolean;"
      },
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      },
      {
        "name": "fetchReply",
        "kind": "property",
        "static": false,
        "signature": "fetchReply?: boolean;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: | BitFieldResolvable< Extract< MessageFlagsString, 'Ephemeral' | 'IsVoiceMessage' | 'SuppressEmbeds' | 'SuppressNotifications' | 'IsComponentsV2' >, | MessageFlags.Ephemeral | MessageFlags.IsVoiceMessage | MessageFlags.SuppressEmbeds | MessageFlags.SuppressNotifications | MessageFlags.IsComponentsV2 > | undefined;"
      }
    ]
  },
  "InteractionUpdateOptions": {
    "kind": "interface",
    "extends": [
      "MessageEditOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      },
      {
        "name": "fetchReply",
        "kind": "property",
        "static": false,
        "signature": "fetchReply?: boolean;"
      }
    ]
  },
  "InviteGenerationOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "permissions?: PermissionResolvable;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild?: GuildResolvable;"
      },
      {
        "name": "disableGuildSelect",
        "kind": "property",
        "static": false,
        "signature": "disableGuildSelect?: boolean;"
      },
      {
        "name": "scopes",
        "kind": "property",
        "static": false,
        "signature": "scopes: readonly OAuth2Scopes[];"
      }
    ]
  },
  "InviteCreateOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "temporary",
        "kind": "property",
        "static": false,
        "signature": "temporary?: boolean;"
      },
      {
        "name": "maxAge",
        "kind": "property",
        "static": false,
        "signature": "maxAge?: number;"
      },
      {
        "name": "maxUses",
        "kind": "property",
        "static": false,
        "signature": "maxUses?: number;"
      },
      {
        "name": "unique",
        "kind": "property",
        "static": false,
        "signature": "unique?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: readonly RoleResolvable[];"
      },
      {
        "name": "targetApplication",
        "kind": "property",
        "static": false,
        "signature": "targetApplication?: ApplicationResolvable;"
      },
      {
        "name": "targetUser",
        "kind": "property",
        "static": false,
        "signature": "targetUser?: UserResolvable;"
      },
      {
        "name": "targetType",
        "kind": "property",
        "static": false,
        "signature": "targetType?: InviteTargetType;"
      },
      {
        "name": "targetUsersFile",
        "kind": "property",
        "static": false,
        "signature": "targetUsersFile?: BufferResolvable | readonly UserResolvable[];"
      }
    ]
  },
  "LifetimeFilterOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "excludeFromSweep",
        "kind": "property",
        "static": false,
        "signature": "excludeFromSweep?: (value: Value, key: Key, collection: LimitedCollection<Key, Value>) => boolean;"
      },
      {
        "name": "getComparisonTimestamp",
        "kind": "property",
        "static": false,
        "signature": "getComparisonTimestamp?: (value: Value, key: Key, collection: LimitedCollection<Key, Value>) => number;"
      },
      {
        "name": "lifetime",
        "kind": "property",
        "static": false,
        "signature": "lifetime?: number;"
      }
    ]
  },
  "MakeErrorOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: string;"
      },
      {
        "name": "stack",
        "kind": "property",
        "static": false,
        "signature": "stack: string;"
      }
    ]
  },
  "MessageActivity": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "partyId",
        "kind": "property",
        "static": false,
        "signature": "partyId?: string;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: MessageActivityType;"
      }
    ]
  },
  "BaseButtonComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.Button;"
      },
      {
        "name": "style",
        "kind": "property",
        "static": false,
        "signature": "style: ButtonStyle;"
      },
      {
        "name": "disabled",
        "kind": "property",
        "static": false,
        "signature": "disabled?: boolean;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji?: ComponentEmojiResolvable;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label?: string;"
      }
    ]
  },
  "LinkButtonComponentData": {
    "kind": "interface",
    "extends": [
      "BaseButtonComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "style",
        "kind": "property",
        "static": false,
        "signature": "style: ButtonStyle.Link;"
      },
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "url: string;"
      }
    ]
  },
  "InteractionButtonComponentData": {
    "kind": "interface",
    "extends": [
      "BaseButtonComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "style",
        "kind": "property",
        "static": false,
        "signature": "style: Exclude<ButtonStyle, ButtonStyle.Link>;"
      },
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      }
    ]
  },
  "MessageCollectorOptions": {
    "kind": "interface",
    "extends": [
      "CollectorOptions<[Message, Collection<Snowflake, Message>]>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "max",
        "kind": "property",
        "static": false,
        "signature": "max?: number;"
      },
      {
        "name": "maxProcessed",
        "kind": "property",
        "static": false,
        "signature": "maxProcessed?: number;"
      }
    ]
  },
  "MessageComponentCollectorOptions": {
    "kind": "interface",
    "extends": [
      "Omit< InteractionCollectorOptions<Interaction>, 'channel' | 'message' | 'guild' | 'interactionType' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "MessageChannelComponentCollectorOptions": {
    "kind": "interface",
    "extends": [
      "Omit< InteractionCollectorOptions<Interaction>, 'channel' | 'guild' | 'interactionType' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "MessageInteractionMetadata": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: InteractionType;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: User;"
      },
      {
        "name": "authorizingIntegrationOwners",
        "kind": "property",
        "static": false,
        "signature": "authorizingIntegrationOwners: AuthorizingIntegrationOwners;"
      },
      {
        "name": "originalResponseMessageId",
        "kind": "property",
        "static": false,
        "signature": "originalResponseMessageId: Snowflake | null;"
      },
      {
        "name": "interactedMessageId",
        "kind": "property",
        "static": false,
        "signature": "interactedMessageId: Snowflake | null;"
      },
      {
        "name": "triggeringInteractionMetadata",
        "kind": "property",
        "static": false,
        "signature": "triggeringInteractionMetadata: MessageInteractionMetadata | null;"
      }
    ]
  },
  "MessageInteraction": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: InteractionType;"
      },
      {
        "name": "commandName",
        "kind": "property",
        "static": false,
        "signature": "commandName: string;"
      },
      {
        "name": "user",
        "kind": "property",
        "static": false,
        "signature": "user: User;"
      }
    ]
  },
  "MessageMentionsHasOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "ignoreDirect",
        "kind": "property",
        "static": false,
        "signature": "ignoreDirect?: boolean;"
      },
      {
        "name": "ignoreRoles",
        "kind": "property",
        "static": false,
        "signature": "ignoreRoles?: boolean;"
      },
      {
        "name": "ignoreRepliedUser",
        "kind": "property",
        "static": false,
        "signature": "ignoreRepliedUser?: boolean;"
      },
      {
        "name": "ignoreEveryone",
        "kind": "property",
        "static": false,
        "signature": "ignoreEveryone?: boolean;"
      }
    ]
  },
  "MessageMentionOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "parse",
        "kind": "property",
        "static": false,
        "signature": "parse?: readonly MessageMentionTypes[];"
      },
      {
        "name": "roles",
        "kind": "property",
        "static": false,
        "signature": "roles?: readonly Snowflake[];"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "users?: readonly Snowflake[];"
      },
      {
        "name": "repliedUser",
        "kind": "property",
        "static": false,
        "signature": "repliedUser?: boolean;"
      }
    ]
  },
  "MessageSnapshot": {
    "kind": "interface",
    "extends": [
      "Partialize< Message, null, Exclude< keyof Message, | 'attachments' | 'client' | 'components' | 'content' | 'createdTimestamp' | 'editedTimestamp' | 'embeds' | 'flags' | 'mentions' | 'stickers' | 'type' > >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "BaseMessageOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "content?: string;"
      },
      {
        "name": "embeds",
        "kind": "property",
        "static": false,
        "signature": "embeds?: readonly (JSONEncodable<APIEmbed> | APIEmbed)[];"
      },
      {
        "name": "allowedMentions",
        "kind": "property",
        "static": false,
        "signature": "allowedMentions?: MessageMentionOptions;"
      },
      {
        "name": "files",
        "kind": "property",
        "static": false,
        "signature": "files?: readonly ( BufferResolvable | Stream | JSONEncodable<APIAttachment> | Attachment | AttachmentBuilder | AttachmentPayload )[];"
      },
      {
        "name": "components",
        "kind": "property",
        "static": false,
        "signature": "components?: readonly ( | JSONEncodable<APIMessageTopLevelComponent> | TopLevelComponentData | ActionRowData<MessageActionRowComponentData | MessageActionRowComponentBuilder> | APIMessageTopLevelComponent )[];"
      }
    ]
  },
  "BaseMessageOptionsWithPoll": {
    "kind": "interface",
    "extends": [
      "BaseMessageOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "poll",
        "kind": "property",
        "static": false,
        "signature": "poll?: PollData;"
      }
    ]
  },
  "MessageCreateOptions": {
    "kind": "interface",
    "extends": [
      "BaseMessageOptionsWithPoll"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "tts",
        "kind": "property",
        "static": false,
        "signature": "tts?: boolean;"
      },
      {
        "name": "nonce",
        "kind": "property",
        "static": false,
        "signature": "nonce?: string | number;"
      },
      {
        "name": "enforceNonce",
        "kind": "property",
        "static": false,
        "signature": "enforceNonce?: boolean;"
      },
      {
        "name": "reply",
        "kind": "property",
        "static": false,
        "signature": "reply?: ReplyOptions;"
      },
      {
        "name": "forward",
        "kind": "property",
        "static": false,
        "signature": "forward?: ForwardOptions;"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "stickers?: readonly StickerResolvable[];"
      },
      {
        "name": "sharedClientTheme",
        "kind": "property",
        "static": false,
        "signature": "sharedClientTheme?: JSONEncodable<APIMessageSharedClientTheme> | SharedClientTheme;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: | BitFieldResolvable< Extract<MessageFlagsString, 'IsVoiceMessage' | 'SuppressEmbeds' | 'SuppressNotifications' | 'IsComponentsV2'>, | MessageFlags.IsVoiceMessage | MessageFlags.SuppressEmbeds | MessageFlags.SuppressNotifications | MessageFlags.IsComponentsV2 > | undefined;"
      }
    ]
  },
  "GuildForumThreadMessageCreateOptions": {
    "kind": "interface",
    "extends": [
      "BaseMessageOptions",
      "Pick<MessageCreateOptions, 'flags' | 'stickers'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "MessageEditAttachmentData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      }
    ]
  },
  "MessageEditOptions": {
    "kind": "interface",
    "extends": [
      "Omit<BaseMessageOptions, 'content'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "content",
        "kind": "property",
        "static": false,
        "signature": "content?: string | null;"
      },
      {
        "name": "attachments",
        "kind": "property",
        "static": false,
        "signature": "attachments?: readonly (Attachment | MessageEditAttachmentData)[];"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: | BitFieldResolvable< Extract<MessageFlagsString, 'SuppressEmbeds' | 'IsComponentsV2'>, MessageFlags.SuppressEmbeds | MessageFlags.IsComponentsV2 > | undefined;"
      }
    ]
  },
  "MessageReference": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "channelId",
        "kind": "property",
        "static": false,
        "signature": "channelId: Snowflake;"
      },
      {
        "name": "guildId",
        "kind": "property",
        "static": false,
        "signature": "guildId: Snowflake | undefined;"
      },
      {
        "name": "messageId",
        "kind": "property",
        "static": false,
        "signature": "messageId: Snowflake | undefined;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: MessageReferenceType;"
      }
    ]
  },
  "BaseSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "disabled",
        "kind": "property",
        "static": false,
        "signature": "disabled?: boolean;"
      },
      {
        "name": "maxValues",
        "kind": "property",
        "static": false,
        "signature": "maxValues?: number;"
      },
      {
        "name": "minValues",
        "kind": "property",
        "static": false,
        "signature": "minValues?: number;"
      },
      {
        "name": "placeholder",
        "kind": "property",
        "static": false,
        "signature": "placeholder?: string;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: true;"
      }
    ]
  },
  "StringSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseSelectMenuComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.StringSelect;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options: readonly SelectMenuComponentOptionData[];"
      }
    ]
  },
  "UserSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseSelectMenuComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.UserSelect;"
      },
      {
        "name": "defaultValues",
        "kind": "property",
        "static": false,
        "signature": "defaultValues?: readonly APISelectMenuDefaultValue<SelectMenuDefaultValueType.User>[];"
      }
    ]
  },
  "RoleSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseSelectMenuComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.RoleSelect;"
      },
      {
        "name": "defaultValues",
        "kind": "property",
        "static": false,
        "signature": "defaultValues?: readonly APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role>[];"
      }
    ]
  },
  "MentionableSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseSelectMenuComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.MentionableSelect;"
      },
      {
        "name": "defaultValues",
        "kind": "property",
        "static": false,
        "signature": "defaultValues?: readonly APISelectMenuDefaultValue< SelectMenuDefaultValueType.Role | SelectMenuDefaultValueType.User >[];"
      }
    ]
  },
  "ChannelSelectMenuComponentData": {
    "kind": "interface",
    "extends": [
      "BaseSelectMenuComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.ChannelSelect;"
      },
      {
        "name": "channelTypes",
        "kind": "property",
        "static": false,
        "signature": "channelTypes?: readonly ChannelType[];"
      },
      {
        "name": "defaultValues",
        "kind": "property",
        "static": false,
        "signature": "defaultValues?: readonly APISelectMenuDefaultValue<SelectMenuDefaultValueType.Channel>[];"
      }
    ]
  },
  "MessageSelectOption": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "default",
        "kind": "property",
        "static": false,
        "signature": "default: boolean;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description: string | null;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji: APIPartialEmoji | null;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "ReactionCountDetailsData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "burst",
        "kind": "property",
        "static": false,
        "signature": "burst: number;"
      },
      {
        "name": "normal",
        "kind": "property",
        "static": false,
        "signature": "normal: number;"
      }
    ]
  },
  "SelectMenuComponentOptionData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "default",
        "kind": "property",
        "static": false,
        "signature": "default?: boolean;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji?: ComponentEmojiResolvable;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "TextInputComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.TextInput;"
      },
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "style",
        "kind": "property",
        "static": false,
        "signature": "style: TextInputStyle;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "minLength",
        "kind": "property",
        "static": false,
        "signature": "minLength?: number;"
      },
      {
        "name": "maxLength",
        "kind": "property",
        "static": false,
        "signature": "maxLength?: number;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value?: string;"
      },
      {
        "name": "placeholder",
        "kind": "property",
        "static": false,
        "signature": "placeholder?: string;"
      }
    ]
  },
  "FileUploadComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "fileTypes",
        "kind": "property",
        "static": false,
        "signature": "fileTypes?: readonly FileUploadType[];"
      },
      {
        "name": "maxValues",
        "kind": "property",
        "static": false,
        "signature": "maxValues?: number;"
      },
      {
        "name": "minValues",
        "kind": "property",
        "static": false,
        "signature": "minValues?: number;"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.FileUpload;"
      }
    ]
  },
  "RadioGroupOption": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "default",
        "kind": "property",
        "static": false,
        "signature": "default?: boolean;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "RadioGroupComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options: readonly RadioGroupOption[];"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.RadioGroup;"
      }
    ]
  },
  "CheckboxGroupOption": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "default",
        "kind": "property",
        "static": false,
        "signature": "default?: boolean;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "label",
        "kind": "property",
        "static": false,
        "signature": "label: string;"
      },
      {
        "name": "value",
        "kind": "property",
        "static": false,
        "signature": "value: string;"
      }
    ]
  },
  "CheckboxGroupComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "maxValues",
        "kind": "property",
        "static": false,
        "signature": "maxValues?: number;"
      },
      {
        "name": "minValues",
        "kind": "property",
        "static": false,
        "signature": "minValues?: number;"
      },
      {
        "name": "options",
        "kind": "property",
        "static": false,
        "signature": "options: readonly CheckboxGroupOption[];"
      },
      {
        "name": "required",
        "kind": "property",
        "static": false,
        "signature": "required?: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.CheckboxGroup;"
      }
    ]
  },
  "CheckboxComponentData": {
    "kind": "interface",
    "extends": [
      "BaseComponentData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customId",
        "kind": "property",
        "static": false,
        "signature": "customId: string;"
      },
      {
        "name": "default",
        "kind": "property",
        "static": false,
        "signature": "default?: boolean;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type: ComponentType.Checkbox;"
      }
    ]
  },
  "MultipleShardRespawnOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "shardDelay",
        "kind": "property",
        "static": false,
        "signature": "shardDelay?: number;"
      },
      {
        "name": "respawnDelay",
        "kind": "property",
        "static": false,
        "signature": "respawnDelay?: number;"
      },
      {
        "name": "timeout",
        "kind": "property",
        "static": false,
        "signature": "timeout?: number;"
      }
    ]
  },
  "MultipleShardSpawnOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "amount",
        "kind": "property",
        "static": false,
        "signature": "amount?: number | 'auto';"
      },
      {
        "name": "delay",
        "kind": "property",
        "static": false,
        "signature": "delay?: number;"
      },
      {
        "name": "timeout",
        "kind": "property",
        "static": false,
        "signature": "timeout?: number;"
      }
    ]
  },
  "OverwriteData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "allow",
        "kind": "property",
        "static": false,
        "signature": "allow?: PermissionResolvable;"
      },
      {
        "name": "deny",
        "kind": "property",
        "static": false,
        "signature": "deny?: PermissionResolvable;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: GuildMemberResolvable | RoleResolvable;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: OverwriteType;"
      }
    ]
  },
  "RecursiveReadonlyArray": {
    "kind": "interface",
    "extends": [
      "ReadonlyArray<ItemType | RecursiveReadonlyArray<ItemType>>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialRecipient": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "username",
        "kind": "property",
        "static": false,
        "signature": "username: string;"
      }
    ]
  },
  "PresenceData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "status",
        "kind": "property",
        "static": false,
        "signature": "status?: PresenceStatusData;"
      },
      {
        "name": "afk",
        "kind": "property",
        "static": false,
        "signature": "afk?: boolean;"
      },
      {
        "name": "activities",
        "kind": "property",
        "static": false,
        "signature": "activities?: readonly ActivitiesOptions[];"
      },
      {
        "name": "shardId",
        "kind": "property",
        "static": false,
        "signature": "shardId?: number | readonly number[];"
      }
    ]
  },
  "PartialChannelData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id?: Snowflake | number;"
      },
      {
        "name": "parentId",
        "kind": "property",
        "static": false,
        "signature": "parentId?: Snowflake | number;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: ChannelType.GuildText | ChannelType.GuildVoice | ChannelType.GuildCategory;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "topic?: string | null;"
      },
      {
        "name": "nsfw",
        "kind": "property",
        "static": false,
        "signature": "nsfw?: boolean;"
      },
      {
        "name": "bitrate",
        "kind": "property",
        "static": false,
        "signature": "bitrate?: number;"
      },
      {
        "name": "userLimit",
        "kind": "property",
        "static": false,
        "signature": "userLimit?: number;"
      },
      {
        "name": "rtcRegion",
        "kind": "property",
        "static": false,
        "signature": "rtcRegion?: string | null;"
      },
      {
        "name": "videoQualityMode",
        "kind": "property",
        "static": false,
        "signature": "videoQualityMode?: VideoQualityMode;"
      },
      {
        "name": "permissionOverwrites",
        "kind": "property",
        "static": false,
        "signature": "permissionOverwrites?: readonly PartialOverwriteData[];"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "rateLimitPerUser?: number;"
      }
    ]
  },
  "PartialEmoji": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "animated",
        "kind": "property",
        "static": false,
        "signature": "animated: boolean;"
      },
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake | undefined;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "PartialEmojiOnlyId": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      }
    ]
  },
  "PartialDMChannel": {
    "kind": "interface",
    "extends": [
      "Partialize<DMChannel, null, null, 'lastMessageId'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "lastMessageId",
        "kind": "property",
        "static": false,
        "signature": "lastMessageId: undefined;"
      }
    ]
  },
  "PartialGuildMember": {
    "kind": "interface",
    "extends": [
      "Partialize<GuildMember, 'joinedAt' | 'joinedTimestamp' | 'pending'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialMessage": {
    "kind": "interface",
    "extends": [
      "Partialize< Message<InGuild>, 'type' | 'system' | 'pinned' | 'tts', 'content' | 'cleanContent' | 'author' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialMessageReaction": {
    "kind": "interface",
    "extends": [
      "Partialize<MessageReaction, 'count'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialPoll": {
    "kind": "interface",
    "extends": [
      "Partialize< Poll, 'allowMultiselect' | 'layoutType' | 'expiresTimestamp', null, 'question' | 'message' | 'answers' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "question",
        "kind": "property",
        "static": false,
        "signature": "question: { text: null };"
      },
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: PartialMessage;"
      },
      {
        "name": "answers",
        "kind": "property",
        "static": false,
        "signature": "answers: Collection<number, PartialPollAnswer>;"
      }
    ]
  },
  "PartialPollAnswer": {
    "kind": "interface",
    "extends": [
      "Partialize<PollAnswer, 'emoji' | 'text', null, 'poll'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "poll",
        "kind": "property",
        "static": false,
        "signature": "readonly poll: PartialPoll;"
      }
    ]
  },
  "PartialGuildScheduledEvent": {
    "kind": "interface",
    "extends": [
      "Partialize< GuildScheduledEvent, 'userCount', 'status' | 'privacyLevel' | 'name' | 'entityType' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialThreadMember": {
    "kind": "interface",
    "extends": [
      "Partialize<ThreadMember, 'flags' | 'joinedAt' | 'joinedTimestamp'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialSoundboardSound": {
    "kind": "interface",
    "extends": [
      "Partialize<SoundboardSound, 'available' | 'name' | 'volume'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "PartialOverwriteData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake | number;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: OverwriteType;"
      },
      {
        "name": "allow",
        "kind": "property",
        "static": false,
        "signature": "allow?: PermissionResolvable;"
      },
      {
        "name": "deny",
        "kind": "property",
        "static": false,
        "signature": "deny?: PermissionResolvable;"
      }
    ]
  },
  "PartialRoleData": {
    "kind": "interface",
    "extends": [
      "RoleData"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id?: Snowflake | number;"
      }
    ]
  },
  "PartialUser": {
    "kind": "interface",
    "extends": [
      "Partialize<User, 'username' | 'tag' | 'discriminator'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "ReactionCollectorOptions": {
    "kind": "interface",
    "extends": [
      "CollectorOptions<[MessageReaction, User]>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "max",
        "kind": "property",
        "static": false,
        "signature": "max?: number;"
      },
      {
        "name": "maxEmojis",
        "kind": "property",
        "static": false,
        "signature": "maxEmojis?: number;"
      },
      {
        "name": "maxUsers",
        "kind": "property",
        "static": false,
        "signature": "maxUsers?: number;"
      }
    ]
  },
  "ReplyOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "messageReference",
        "kind": "property",
        "static": false,
        "signature": "messageReference: MessageResolvable;"
      },
      {
        "name": "failIfNotExists",
        "kind": "property",
        "static": false,
        "signature": "failIfNotExists?: boolean;"
      }
    ]
  },
  "BaseForwardOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: MessageResolvable;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: Exclude<TextBasedChannelResolvable, PartialGroupDMChannel>;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild?: GuildResolvable;"
      }
    ]
  },
  "ForwardOptionsWithOptionalChannel": {
    "kind": "interface",
    "extends": [
      "BaseForwardOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: Exclude<MessageResolvable, Snowflake>;"
      }
    ]
  },
  "MessageReplyOptions": {
    "kind": "interface",
    "extends": [
      "Omit<MessageCreateOptions, 'reply' | 'forward'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "failIfNotExists",
        "kind": "property",
        "static": false,
        "signature": "failIfNotExists?: boolean;"
      }
    ]
  },
  "ResolvedOverwriteOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "allow",
        "kind": "property",
        "static": false,
        "signature": "allow: PermissionsBitField;"
      },
      {
        "name": "deny",
        "kind": "property",
        "static": false,
        "signature": "deny: PermissionsBitField;"
      }
    ]
  },
  "RoleData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "color",
        "kind": "property",
        "static": false,
        "signature": "color?: ColorResolvable;"
      },
      {
        "name": "hoist",
        "kind": "property",
        "static": false,
        "signature": "hoist?: boolean;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position?: number;"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "permissions?: PermissionResolvable;"
      },
      {
        "name": "mentionable",
        "kind": "property",
        "static": false,
        "signature": "mentionable?: boolean;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "icon?: BufferResolvable | Base64Resolvable | EmojiResolvable | null;"
      },
      {
        "name": "unicodeEmoji",
        "kind": "property",
        "static": false,
        "signature": "unicodeEmoji?: string | null;"
      }
    ]
  },
  "RolePosition": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "role",
        "kind": "property",
        "static": false,
        "signature": "role: RoleResolvable;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position: number;"
      }
    ]
  },
  "RoleSubscriptionData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "roleSubscriptionListingId",
        "kind": "property",
        "static": false,
        "signature": "roleSubscriptionListingId: Snowflake;"
      },
      {
        "name": "tierName",
        "kind": "property",
        "static": false,
        "signature": "tierName: string;"
      },
      {
        "name": "totalMonthsSubscribed",
        "kind": "property",
        "static": false,
        "signature": "totalMonthsSubscribed: number;"
      },
      {
        "name": "isRenewal",
        "kind": "property",
        "static": false,
        "signature": "isRenewal: boolean;"
      }
    ]
  },
  "RoleTagData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "botId",
        "kind": "property",
        "static": false,
        "signature": "botId?: Snowflake;"
      },
      {
        "name": "integrationId",
        "kind": "property",
        "static": false,
        "signature": "integrationId?: Snowflake;"
      },
      {
        "name": "premiumSubscriberRole",
        "kind": "property",
        "static": false,
        "signature": "premiumSubscriberRole?: true;"
      },
      {
        "name": "subscriptionListingId",
        "kind": "property",
        "static": false,
        "signature": "subscriptionListingId?: Snowflake;"
      },
      {
        "name": "availableForPurchase",
        "kind": "property",
        "static": false,
        "signature": "availableForPurchase?: true;"
      },
      {
        "name": "guildConnections",
        "kind": "property",
        "static": false,
        "signature": "guildConnections?: true;"
      }
    ]
  },
  "SetChannelPositionOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "relative",
        "kind": "property",
        "static": false,
        "signature": "relative?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "SetParentOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "lockPermissions",
        "kind": "property",
        "static": false,
        "signature": "lockPermissions?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "SetRolePositionOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "relative",
        "kind": "property",
        "static": false,
        "signature": "relative?: boolean;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "ShardingManagerOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "totalShards",
        "kind": "property",
        "static": false,
        "signature": "totalShards?: number | 'auto';"
      },
      {
        "name": "shardList",
        "kind": "property",
        "static": false,
        "signature": "shardList?: readonly number[] | 'auto';"
      },
      {
        "name": "mode",
        "kind": "property",
        "static": false,
        "signature": "mode?: ShardingManagerMode;"
      },
      {
        "name": "respawn",
        "kind": "property",
        "static": false,
        "signature": "respawn?: boolean;"
      },
      {
        "name": "silent",
        "kind": "property",
        "static": false,
        "signature": "silent?: boolean;"
      },
      {
        "name": "shardArgs",
        "kind": "property",
        "static": false,
        "signature": "shardArgs?: readonly string[];"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "token?: string;"
      },
      {
        "name": "execArgv",
        "kind": "property",
        "static": false,
        "signature": "execArgv?: readonly string[];"
      }
    ]
  },
  "ShowModalOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      }
    ]
  },
  "LaunchActivityOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "withResponse",
        "kind": "property",
        "static": false,
        "signature": "withResponse?: boolean;"
      }
    ]
  },
  "StartThreadOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "autoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "autoArchiveDuration?: ThreadAutoArchiveDuration;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "rateLimitPerUser?: number;"
      }
    ]
  },
  "StageInstanceEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "topic",
        "kind": "property",
        "static": false,
        "signature": "topic?: string;"
      },
      {
        "name": "privacyLevel",
        "kind": "property",
        "static": false,
        "signature": "privacyLevel?: StageInstancePrivacyLevel;"
      }
    ]
  },
  "SupportingInteractionResolvedData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "client",
        "kind": "property",
        "static": false,
        "signature": "client: Client;"
      },
      {
        "name": "guild",
        "kind": "property",
        "static": false,
        "signature": "guild?: Guild;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildTextBasedChannel;"
      }
    ]
  },
  "SweepOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "interval",
        "kind": "property",
        "static": false,
        "signature": "interval: number;"
      },
      {
        "name": "filter",
        "kind": "property",
        "static": false,
        "signature": "filter: GlobalSweepFilter<Key, Value>;"
      }
    ]
  },
  "LifetimeSweepOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "interval",
        "kind": "property",
        "static": false,
        "signature": "interval: number;"
      },
      {
        "name": "lifetime",
        "kind": "property",
        "static": false,
        "signature": "lifetime: number;"
      },
      {
        "name": "filter",
        "kind": "property",
        "static": false,
        "signature": "filter?: never;"
      }
    ]
  },
  "SweeperDefinitions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "applicationCommands",
        "kind": "property",
        "static": false,
        "signature": "applicationCommands: [Snowflake, ApplicationCommand];"
      },
      {
        "name": "autoModerationRules",
        "kind": "property",
        "static": false,
        "signature": "autoModerationRules: [Snowflake, AutoModerationRule];"
      },
      {
        "name": "bans",
        "kind": "property",
        "static": false,
        "signature": "bans: [Snowflake, GuildBan];"
      },
      {
        "name": "emojis",
        "kind": "property",
        "static": false,
        "signature": "emojis: [Snowflake, GuildEmoji];"
      },
      {
        "name": "entitlements",
        "kind": "property",
        "static": false,
        "signature": "entitlements: [Snowflake, Entitlement];"
      },
      {
        "name": "invites",
        "kind": "property",
        "static": false,
        "signature": "invites: [string, Invite, true];"
      },
      {
        "name": "guildMembers",
        "kind": "property",
        "static": false,
        "signature": "guildMembers: [Snowflake, GuildMember];"
      },
      {
        "name": "messages",
        "kind": "property",
        "static": false,
        "signature": "messages: [Snowflake, Message, true];"
      },
      {
        "name": "presences",
        "kind": "property",
        "static": false,
        "signature": "presences: [Snowflake, Presence];"
      },
      {
        "name": "reactions",
        "kind": "property",
        "static": false,
        "signature": "reactions: [string | Snowflake, MessageReaction];"
      },
      {
        "name": "stageInstances",
        "kind": "property",
        "static": false,
        "signature": "stageInstances: [Snowflake, StageInstance];"
      },
      {
        "name": "stickers",
        "kind": "property",
        "static": false,
        "signature": "stickers: [Snowflake, Sticker];"
      },
      {
        "name": "threadMembers",
        "kind": "property",
        "static": false,
        "signature": "threadMembers: [Snowflake, ThreadMember];"
      },
      {
        "name": "threads",
        "kind": "property",
        "static": false,
        "signature": "threads: [Snowflake, AnyThreadChannel, true];"
      },
      {
        "name": "users",
        "kind": "property",
        "static": false,
        "signature": "users: [Snowflake, User];"
      },
      {
        "name": "voiceStates",
        "kind": "property",
        "static": false,
        "signature": "voiceStates: [Snowflake, VoiceState];"
      }
    ]
  },
  "LimitedCollectionOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "maxSize",
        "kind": "property",
        "static": false,
        "signature": "maxSize?: number;"
      },
      {
        "name": "keepOverLimit",
        "kind": "property",
        "static": false,
        "signature": "keepOverLimit?: (value: Value, key: Key, collection: LimitedCollection<Key, Value>) => boolean;"
      }
    ]
  },
  "GuildTextThreadCreateOptions": {
    "kind": "interface",
    "extends": [
      "StartThreadOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "startMessage",
        "kind": "property",
        "static": false,
        "signature": "startMessage?: MessageResolvable;"
      },
      {
        "name": "type",
        "kind": "property",
        "static": false,
        "signature": "type?: AllowedThreadType;"
      },
      {
        "name": "invitable",
        "kind": "property",
        "static": false,
        "signature": "invitable?: AllowedThreadType extends ChannelType.PrivateThread ? boolean : never;"
      }
    ]
  },
  "GuildForumThreadCreateOptions": {
    "kind": "interface",
    "extends": [
      "StartThreadOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message: GuildForumThreadMessageCreateOptions | MessagePayload;"
      },
      {
        "name": "appliedTags",
        "kind": "property",
        "static": false,
        "signature": "appliedTags?: readonly Snowflake[];"
      }
    ]
  },
  "ThreadEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "archived",
        "kind": "property",
        "static": false,
        "signature": "archived?: boolean;"
      },
      {
        "name": "autoArchiveDuration",
        "kind": "property",
        "static": false,
        "signature": "autoArchiveDuration?: ThreadAutoArchiveDuration;"
      },
      {
        "name": "rateLimitPerUser",
        "kind": "property",
        "static": false,
        "signature": "rateLimitPerUser?: number;"
      },
      {
        "name": "locked",
        "kind": "property",
        "static": false,
        "signature": "locked?: boolean;"
      },
      {
        "name": "invitable",
        "kind": "property",
        "static": false,
        "signature": "invitable?: boolean;"
      },
      {
        "name": "appliedTags",
        "kind": "property",
        "static": false,
        "signature": "appliedTags?: readonly Snowflake[];"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: ChannelFlagsResolvable;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "Vanity": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "code",
        "kind": "property",
        "static": false,
        "signature": "code: string | null;"
      },
      {
        "name": "uses",
        "kind": "property",
        "static": false,
        "signature": "uses: number;"
      }
    ]
  },
  "VoiceStateEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "requestToSpeak",
        "kind": "property",
        "static": false,
        "signature": "requestToSpeak?: boolean;"
      },
      {
        "name": "suppressed",
        "kind": "property",
        "static": false,
        "signature": "suppressed?: boolean;"
      }
    ]
  },
  "WebhookClientDataIdWithToken": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "token: string;"
      }
    ]
  },
  "WebhookClientDataURL": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "url",
        "kind": "property",
        "static": false,
        "signature": "url: string;"
      }
    ]
  },
  "WebhookClientOptions": {
    "kind": "interface",
    "extends": [
      "Pick<ClientOptions, 'allowedMentions' | 'rest'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": []
  },
  "WebhookDeleteOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "token",
        "kind": "property",
        "static": false,
        "signature": "token?: string;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "WebhookEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name?: string;"
      },
      {
        "name": "avatar",
        "kind": "property",
        "static": false,
        "signature": "avatar?: BufferResolvable | null;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel?: GuildTextChannelResolvable | VoiceChannel | StageChannel | ForumChannel | MediaChannel;"
      },
      {
        "name": "reason",
        "kind": "property",
        "static": false,
        "signature": "reason?: string;"
      }
    ]
  },
  "WebhookMessageEditOptions": {
    "kind": "interface",
    "extends": [
      "MessageEditOptions"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "threadId",
        "kind": "property",
        "static": false,
        "signature": "threadId?: Snowflake;"
      },
      {
        "name": "withComponents",
        "kind": "property",
        "static": false,
        "signature": "withComponents?: boolean;"
      }
    ]
  },
  "InteractionEditReplyOptions": {
    "kind": "interface",
    "extends": [
      "WebhookMessageEditOptions",
      "Pick<BaseMessageOptionsWithPoll, 'poll'>"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "message",
        "kind": "property",
        "static": false,
        "signature": "message?: MessageResolvable | '@original';"
      }
    ]
  },
  "WebhookFetchMessageOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "threadId",
        "kind": "property",
        "static": false,
        "signature": "threadId?: Snowflake;"
      }
    ]
  },
  "WebhookMessageCreateOptions": {
    "kind": "interface",
    "extends": [
      "Omit< MessageCreateOptions, 'nonce' | 'reply' | 'stickers' | 'forward' | 'sharedClientTheme' >"
    ],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "username",
        "kind": "property",
        "static": false,
        "signature": "username?: string;"
      },
      {
        "name": "avatarURL",
        "kind": "property",
        "static": false,
        "signature": "avatarURL?: string;"
      },
      {
        "name": "threadId",
        "kind": "property",
        "static": false,
        "signature": "threadId?: Snowflake;"
      },
      {
        "name": "threadName",
        "kind": "property",
        "static": false,
        "signature": "threadName?: string;"
      },
      {
        "name": "appliedTags",
        "kind": "property",
        "static": false,
        "signature": "appliedTags?: readonly Snowflake[];"
      },
      {
        "name": "withComponents",
        "kind": "property",
        "static": false,
        "signature": "withComponents?: boolean;"
      }
    ]
  },
  "WebSocketOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "buildStrategy",
        "static": false,
        "signature": "buildStrategy?(manager: WSWebSocketManager): IShardingStrategy;"
      },
      {
        "name": "buildIdentifyThrottler",
        "static": false,
        "signature": "buildIdentifyThrottler?(manager: WSWebSocketManager): Awaitable<IIdentifyThrottler>;"
      }
    ],
    "properties": [
      {
        "name": "large_threshold",
        "kind": "property",
        "static": false,
        "signature": "large_threshold?: number;"
      },
      {
        "name": "version",
        "kind": "property",
        "static": false,
        "signature": "version?: number;"
      }
    ]
  },
  "WidgetActivity": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      }
    ]
  },
  "WidgetChannel": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "id",
        "kind": "property",
        "static": false,
        "signature": "id: Snowflake;"
      },
      {
        "name": "name",
        "kind": "property",
        "static": false,
        "signature": "name: string;"
      },
      {
        "name": "position",
        "kind": "property",
        "static": false,
        "signature": "position: number;"
      }
    ]
  },
  "WelcomeChannelData": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description: string;"
      },
      {
        "name": "channel",
        "kind": "property",
        "static": false,
        "signature": "channel: TextChannel | NewsChannel | ForumChannel | MediaChannel | Snowflake;"
      },
      {
        "name": "emoji",
        "kind": "property",
        "static": false,
        "signature": "emoji?: EmojiIdentifierResolvable;"
      }
    ]
  },
  "WelcomeScreenEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "enabled",
        "kind": "property",
        "static": false,
        "signature": "enabled?: boolean;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "welcomeChannels",
        "kind": "property",
        "static": false,
        "signature": "welcomeChannels?: readonly WelcomeChannelData[];"
      }
    ]
  },
  "ClientApplicationEditOptions": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "customInstallURL",
        "kind": "property",
        "static": false,
        "signature": "customInstallURL?: string;"
      },
      {
        "name": "description",
        "kind": "property",
        "static": false,
        "signature": "description?: string;"
      },
      {
        "name": "roleConnectionsVerificationURL",
        "kind": "property",
        "static": false,
        "signature": "roleConnectionsVerificationURL?: string;"
      },
      {
        "name": "installParams",
        "kind": "property",
        "static": false,
        "signature": "installParams?: ClientApplicationInstallParams;"
      },
      {
        "name": "flags",
        "kind": "property",
        "static": false,
        "signature": "flags?: ApplicationFlagsResolvable;"
      },
      {
        "name": "icon",
        "kind": "property",
        "static": false,
        "signature": "icon?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "coverImage",
        "kind": "property",
        "static": false,
        "signature": "coverImage?: BufferResolvable | Base64Resolvable | null;"
      },
      {
        "name": "interactionsEndpointURL",
        "kind": "property",
        "static": false,
        "signature": "interactionsEndpointURL?: string;"
      },
      {
        "name": "eventWebhooksURL",
        "kind": "property",
        "static": false,
        "signature": "eventWebhooksURL?: string;"
      },
      {
        "name": "eventWebhooksStatus",
        "kind": "property",
        "static": false,
        "signature": "eventWebhooksStatus?: ApplicationWebhookEventStatus.Enabled | ApplicationWebhookEventStatus.Disabled;"
      },
      {
        "name": "eventWebhooksTypes",
        "kind": "property",
        "static": false,
        "signature": "eventWebhooksTypes?: readonly ApplicationWebhookEventType[];"
      },
      {
        "name": "tags",
        "kind": "property",
        "static": false,
        "signature": "tags?: readonly string[];"
      }
    ]
  },
  "ClientApplicationInstallParams": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [],
    "properties": [
      {
        "name": "scopes",
        "kind": "property",
        "static": false,
        "signature": "scopes: readonly OAuth2Scopes[];"
      },
      {
        "name": "permissions",
        "kind": "property",
        "static": false,
        "signature": "permissions: Readonly<PermissionsBitField>;"
      }
    ]
  },
  "InternalDiscordGatewayAdapterLibraryMethods": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "onVoiceServerUpdate",
        "static": false,
        "signature": "onVoiceServerUpdate(data: GatewayVoiceServerUpdateDispatchData): void;"
      },
      {
        "name": "onVoiceStateUpdate",
        "static": false,
        "signature": "onVoiceStateUpdate(data: GatewayVoiceStateUpdateDispatchData): void;"
      },
      {
        "name": "destroy",
        "static": false,
        "signature": "destroy(): void;"
      }
    ],
    "properties": []
  },
  "InternalDiscordGatewayAdapterImplementerMethods": {
    "kind": "interface",
    "extends": [],
    "implements": [],
    "constructors": [],
    "methods": [
      {
        "name": "sendPayload",
        "static": false,
        "signature": "sendPayload(payload: unknown): boolean;"
      },
      {
        "name": "destroy",
        "static": false,
        "signature": "destroy(): void;"
      }
    ],
    "properties": []
  }
} as const;

export const DISCORD_TOP_LEVEL_FUNCTIONS = [
  {
    "name": "basename",
    "signature": "export function basename(path: string, ext?: string): string;"
  },
  {
    "name": "cleanContent",
    "signature": "export function cleanContent(str: string, channel: TextBasedChannel): string;"
  },
  {
    "name": "discordSort",
    "signature": "export function discordSort<Key, Value extends { rawPosition: number; id: Snowflake }>( collection: ReadonlyCollection<Key, Value>, ): Collection<Key, Value>;"
  },
  {
    "name": "cleanCodeBlockContent",
    "signature": "export function cleanCodeBlockContent(text: string): string;"
  },
  {
    "name": "fetchRecommendedShardCount",
    "signature": "export function fetchRecommendedShardCount(token: string, options?: FetchRecommendedShardCountOptions): Promise<number>;"
  },
  {
    "name": "flatten",
    "signature": "export function flatten(obj: unknown, ...props: Record<string, boolean | string>[]): unknown;"
  },
  {
    "name": "makeError",
    "signature": "export function makeError(obj: MakeErrorOptions): Error;"
  },
  {
    "name": "makePlainError",
    "signature": "export function makePlainError(err: Error): MakeErrorOptions;"
  },
  {
    "name": "moveElementInArray",
    "signature": "export function moveElementInArray( // eslint-disable-next-line no-restricted-syntax array: unknown[], element: unknown, newIndex: number, offset?: boolean, ): number;"
  },
  {
    "name": "parseEmoji",
    "signature": "export function parseEmoji(text: string): PartialEmoji | null;"
  },
  {
    "name": "resolveColor",
    "signature": "export function resolveColor(color: ColorResolvable): number;"
  },
  {
    "name": "resolvePartialEmoji",
    "signature": "export function resolvePartialEmoji(emoji: Snowflake): PartialEmojiOnlyId;"
  },
  {
    "name": "resolvePartialEmoji",
    "signature": "export function resolvePartialEmoji(emoji: Emoji | EmojiIdentifierResolvable): PartialEmoji | null;"
  },
  {
    "name": "verifyString",
    "signature": "export function verifyString(data: string, error?: typeof Error, errorMessage?: string, allowEmpty?: boolean): string;"
  },
  {
    "name": "setPosition",
    "signature": "export function setPosition<Item extends Channel | Role>( item: Item, position: number, relative: boolean, sorted: ReadonlyCollection<Snowflake, Item>, client: Client<true>, route: string, reason?: string, ): Promise<{ id: Snowflake; position: number }[]>;"
  },
  {
    "name": "parseWebhookURL",
    "signature": "export function parseWebhookURL(url: string): WebhookClientDataIdWithToken | null;"
  },
  {
    "name": "transformResolved",
    "signature": "export function transformResolved<Cached extends CacheType>( supportingData: SupportingInteractionResolvedData, data?: Extract< APIApplicationCommandInteractionData, APIChatInputApplicationCommandInteractionData | APIContextMenuInteractionData >['resolved'], ): CommandInteractionResolvedData<Cached>;"
  },
  {
    "name": "resolveSKUId",
    "signature": "export function resolveSKUId(resolvable: SKUResolvable): Snowflake | null;"
  },
  {
    "name": "createChannel",
    "signature": "export function createChannel( client: Client<true>, data: APIChannel, guild?: Guild, extras?: CreateChannelOptions, ): Channel;"
  }
] as const;

export const DISCORD_CLIENT_EVENTS = {
  "applicationCommandPermissionsUpdate": "applicationCommandPermissionsUpdate: [data: ApplicationCommandPermissionsUpdateData];",
  "autoModerationActionExecution": "autoModerationActionExecution: [autoModerationActionExecution: AutoModerationActionExecution];",
  "autoModerationRuleCreate": "autoModerationRuleCreate: [autoModerationRule: AutoModerationRule];",
  "autoModerationRuleDelete": "autoModerationRuleDelete: [autoModerationRule: AutoModerationRule];",
  "autoModerationRuleUpdate": "autoModerationRuleUpdate: [ oldAutoModerationRule: AutoModerationRule | null, newAutoModerationRule: AutoModerationRule, ];",
  "cacheSweep": "cacheSweep: [message: string];",
  "channelCreate": "channelCreate: [channel: NonThreadGuildBasedChannel];",
  "channelDelete": "channelDelete: [channel: DMChannel | NonThreadGuildBasedChannel];",
  "channelPinsUpdate": "channelPinsUpdate: [channel: TextBasedChannel, date: Date];",
  "channelUpdate": "channelUpdate: [ oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel, ];",
  "clientReady": "clientReady: [client: Client<true>];",
  "debug": "debug: [message: string];",
  "warn": "warn: [message: string];",
  "emojiCreate": "emojiCreate: [emoji: GuildEmoji];",
  "emojiDelete": "emojiDelete: [emoji: GuildEmoji];",
  "emojiUpdate": "emojiUpdate: [oldEmoji: GuildEmoji, newEmoji: GuildEmoji];",
  "entitlementCreate": "entitlementCreate: [entitlement: Entitlement];",
  "entitlementDelete": "entitlementDelete: [entitlement: Entitlement];",
  "entitlementUpdate": "entitlementUpdate: [oldEntitlement: Entitlement | null, newEntitlement: Entitlement];",
  "error": "error: [error: Error];",
  "guildAuditLogEntryCreate": "guildAuditLogEntryCreate: [auditLogEntry: GuildAuditLogsEntry, guild: Guild];",
  "guildAvailable": "guildAvailable: [guild: Guild];",
  "guildBanAdd": "guildBanAdd: [ban: GuildBan];",
  "guildBanRemove": "guildBanRemove: [ban: GuildBan];",
  "guildCreate": "guildCreate: [guild: Guild];",
  "guildDelete": "guildDelete: [guild: Guild];",
  "guildUnavailable": "guildUnavailable: [guild: Guild];",
  "guildIntegrationsUpdate": "guildIntegrationsUpdate: [guild: Guild];",
  "guildMemberAdd": "guildMemberAdd: [member: GuildMember];",
  "guildMemberAvailable": "guildMemberAvailable: [member: GuildMember | PartialGuildMember];",
  "guildMemberRemove": "guildMemberRemove: [member: GuildMember | PartialGuildMember];",
  "guildMembersChunk": "guildMembersChunk: [members: ReadonlyCollection<Snowflake, GuildMember>, guild: Guild, data: GuildMembersChunk];",
  "guildMemberUpdate": "guildMemberUpdate: [oldMember: GuildMember | PartialGuildMember, newMember: GuildMember];",
  "guildUpdate": "guildUpdate: [oldGuild: Guild, newGuild: Guild];",
  "guildSoundboardSoundCreate": "guildSoundboardSoundCreate: [soundboardSound: GuildSoundboardSound];",
  "guildSoundboardSoundDelete": "guildSoundboardSoundDelete: [soundboardSound: GuildSoundboardSound | PartialSoundboardSound];",
  "guildSoundboardSoundUpdate": "guildSoundboardSoundUpdate: [ oldSoundboardSound: GuildSoundboardSound | null, newSoundboardSound: GuildSoundboardSound, ];",
  "guildSoundboardSoundsUpdate": "guildSoundboardSoundsUpdate: [soundboardSounds: ReadonlyCollection<Snowflake, GuildSoundboardSound>, guild: Guild];",
  "inviteCreate": "inviteCreate: [invite: Invite];",
  "inviteDelete": "inviteDelete: [invite: Invite];",
  "messageCreate": "messageCreate: [message: OmitPartialGroupDMChannel<Message>];",
  "messageDelete": "messageDelete: [message: OmitPartialGroupDMChannel<Message | PartialMessage>];",
  "messagePollVoteAdd": "messagePollVoteAdd: [pollAnswer: PollAnswer | PartialPollAnswer, userId: Snowflake];",
  "messagePollVoteRemove": "messagePollVoteRemove: [pollAnswer: PollAnswer | PartialPollAnswer, userId: Snowflake];",
  "messageReactionRemoveAll": "messageReactionRemoveAll: [ message: OmitPartialGroupDMChannel<Message | PartialMessage>, reactions: ReadonlyCollection<string | Snowflake, MessageReaction>, ];",
  "messageReactionRemoveEmoji": "messageReactionRemoveEmoji: [reaction: MessageReaction | PartialMessageReaction];",
  "messageDeleteBulk": "messageDeleteBulk: [ messages: ReadonlyCollection<Snowflake, Message<true> | PartialMessage<true>>, channel: GuildTextBasedChannel, ];",
  "messageReactionAdd": "messageReactionAdd: [ reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, details: MessageReactionEventDetails, ];",
  "messageReactionRemove": "messageReactionRemove: [ reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, details: MessageReactionEventDetails, ];",
  "messageUpdate": "messageUpdate: [ oldMessage: OmitPartialGroupDMChannel<Message | PartialMessage>, newMessage: OmitPartialGroupDMChannel<Message>, ];",
  "presenceUpdate": "presenceUpdate: [oldPresence: Presence | null, newPresence: Presence];",
  "ready": "ready: [client: Client<true>];",
  "invalidated": "invalidated: [];",
  "roleCreate": "roleCreate: [role: Role];",
  "roleDelete": "roleDelete: [role: Role];",
  "roleUpdate": "roleUpdate: [oldRole: Role, newRole: Role];",
  "threadCreate": "threadCreate: [thread: AnyThreadChannel, newlyCreated: boolean];",
  "threadDelete": "threadDelete: [thread: AnyThreadChannel];",
  "threadListSync": "threadListSync: [threads: ReadonlyCollection<Snowflake, AnyThreadChannel>, guild: Guild];",
  "threadMemberUpdate": "threadMemberUpdate: [oldMember: ThreadMember, newMember: ThreadMember];",
  "threadMembersUpdate": "threadMembersUpdate: [ addedMembers: ReadonlyCollection<Snowflake, ThreadMember>, removedMembers: ReadonlyCollection<Snowflake, ThreadMember | PartialThreadMember>, thread: AnyThreadChannel, ];",
  "threadUpdate": "threadUpdate: [oldThread: AnyThreadChannel, newThread: AnyThreadChannel];",
  "typingStart": "typingStart: [typing: Typing];",
  "userUpdate": "userUpdate: [oldUser: User | PartialUser, newUser: User];",
  "voiceChannelEffectSend": "voiceChannelEffectSend: [voiceChannelEffect: VoiceChannelEffect];",
  "voiceServerUpdate": "voiceServerUpdate: [data: VoiceServerUpdateData];",
  "voiceStateUpdate": "voiceStateUpdate: [oldState: VoiceState, newState: VoiceState];",
  "webhookUpdate": "webhookUpdate: ClientEvents['webhooksUpdate'];",
  "webhooksUpdate": "webhooksUpdate: [channel: TextChannel | NewsChannel | VoiceChannel | ForumChannel | MediaChannel];",
  "interactionCreate": "interactionCreate: [interaction: Interaction];",
  "shardDisconnect": "shardDisconnect: [closeEvent: CloseEvent, shardId: number];",
  "shardError": "shardError: [error: Error, shardId: number];",
  "shardReady": "shardReady: [shardId: number, unavailableGuilds: Set<Snowflake> | undefined];",
  "shardReconnecting": "shardReconnecting: [shardId: number];",
  "shardResume": "shardResume: [shardId: number, replayedEvents: number];",
  "stageInstanceCreate": "stageInstanceCreate: [stageInstance: StageInstance];",
  "stageInstanceUpdate": "stageInstanceUpdate: [oldStageInstance: StageInstance | null, newStageInstance: StageInstance];",
  "stageInstanceDelete": "stageInstanceDelete: [stageInstance: StageInstance];",
  "stickerCreate": "stickerCreate: [sticker: Sticker];",
  "stickerDelete": "stickerDelete: [sticker: Sticker];",
  "stickerUpdate": "stickerUpdate: [oldSticker: Sticker, newSticker: Sticker];",
  "subscriptionCreate": "subscriptionCreate: [subscription: Subscription];",
  "subscriptionDelete": "subscriptionDelete: [subscription: Subscription];",
  "subscriptionUpdate": "subscriptionUpdate: [oldSubscription: Subscription | null, newSubscription: Subscription];",
  "guildScheduledEventCreate": "guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];",
  "guildScheduledEventUpdate": "guildScheduledEventUpdate: [ oldGuildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent | null, newGuildScheduledEvent: GuildScheduledEvent, ];",
  "guildScheduledEventDelete": "guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent];",
  "guildScheduledEventUserAdd": "guildScheduledEventUserAdd: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent, user: User];",
  "guildScheduledEventUserRemove": "guildScheduledEventUserRemove: [guildScheduledEvent: GuildScheduledEvent | PartialGuildScheduledEvent, user: User];",
  "soundboardSounds": "soundboardSounds: [soundboardSounds: ReadonlyCollection<Snowflake, GuildSoundboardSound>, guild: Guild];"
} as const;

export const DISCORD_EXPORTED_TYPES = [
  {
    "name": "Activity",
    "kind": "class"
  },
  {
    "name": "ActivityInstance",
    "kind": "class"
  },
  {
    "name": "ActivityLocation",
    "kind": "class"
  },
  {
    "name": "ActivityFlagsString",
    "kind": "type"
  },
  {
    "name": "BaseComponentData",
    "kind": "interface"
  },
  {
    "name": "MessageActionRowComponentData",
    "kind": "type"
  },
  {
    "name": "ModalActionRowComponentData",
    "kind": "type"
  },
  {
    "name": "ActionRowComponentData",
    "kind": "type"
  },
  {
    "name": "ActionRowComponent",
    "kind": "type"
  },
  {
    "name": "ActionRowData",
    "kind": "interface"
  },
  {
    "name": "ActionRowBuilder",
    "kind": "class"
  },
  {
    "name": "ComponentInLabelData",
    "kind": "type"
  },
  {
    "name": "LabelComponentData",
    "kind": "interface"
  },
  {
    "name": "MessageActionRowComponent",
    "kind": "type"
  },
  {
    "name": "ModalActionRowComponent",
    "kind": "type"
  },
  {
    "name": "ActionRow",
    "kind": "class"
  },
  {
    "name": "ActivityFlagsBitField",
    "kind": "class"
  },
  {
    "name": "AnonymousGuild",
    "kind": "class"
  },
  {
    "name": "AutoModerationActionExecution",
    "kind": "class"
  },
  {
    "name": "AutoModerationRule",
    "kind": "class"
  },
  {
    "name": "Application",
    "kind": "class"
  },
  {
    "name": "ApplicationCommand",
    "kind": "class"
  },
  {
    "name": "ApplicationRoleConnectionMetadata",
    "kind": "class"
  },
  {
    "name": "ApplicationResolvable",
    "kind": "type"
  },
  {
    "name": "ApplicationFlagsBitField",
    "kind": "class"
  },
  {
    "name": "ApplicationFlagsResolvable",
    "kind": "type"
  },
  {
    "name": "AutoModerationRuleResolvable",
    "kind": "type"
  },
  {
    "name": "Base",
    "kind": "class"
  },
  {
    "name": "BaseClient",
    "kind": "class"
  },
  {
    "name": "GuildCacheMessage",
    "kind": "type"
  },
  {
    "name": "BooleanCache",
    "kind": "type"
  },
  {
    "name": "CommandInteraction",
    "kind": "class"
  },
  {
    "name": "InteractionResponse",
    "kind": "class"
  },
  {
    "name": "BaseGuild",
    "kind": "class"
  },
  {
    "name": "BaseGuildEmoji",
    "kind": "class"
  },
  {
    "name": "BaseGuildTextChannel",
    "kind": "interface"
  },
  {
    "name": "BaseGuildTextChannel",
    "kind": "class"
  },
  {
    "name": "BaseGuildVoiceChannel",
    "kind": "interface"
  },
  {
    "name": "BaseGuildVoiceChannel",
    "kind": "class"
  },
  {
    "name": "EnumLike",
    "kind": "type"
  },
  {
    "name": "BitField",
    "kind": "class"
  },
  {
    "name": "ButtonInteraction",
    "kind": "class"
  },
  {
    "name": "AnyComponent",
    "kind": "type"
  },
  {
    "name": "Component",
    "kind": "class"
  },
  {
    "name": "AnyComponentV2",
    "kind": "type"
  },
  {
    "name": "TopLevelComponent",
    "kind": "type"
  },
  {
    "name": "TopLevelComponentData",
    "kind": "type"
  },
  {
    "name": "ButtonComponent",
    "kind": "class"
  },
  {
    "name": "ComponentEmojiResolvable",
    "kind": "type"
  },
  {
    "name": "ButtonBuilder",
    "kind": "class"
  },
  {
    "name": "StringSelectMenuBuilder",
    "kind": "class"
  },
  {
    "name": "UserSelectMenuBuilder",
    "kind": "class"
  },
  {
    "name": "RoleSelectMenuBuilder",
    "kind": "class"
  },
  {
    "name": "MentionableSelectMenuBuilder",
    "kind": "class"
  },
  {
    "name": "ChannelSelectMenuBuilder",
    "kind": "class"
  },
  {
    "name": "StringSelectMenuOptionBuilder",
    "kind": "class"
  },
  {
    "name": "ModalBuilder",
    "kind": "class"
  },
  {
    "name": "TextInputBuilder",
    "kind": "class"
  },
  {
    "name": "TextInputComponent",
    "kind": "class"
  },
  {
    "name": "LabelComponent",
    "kind": "class"
  },
  {
    "name": "BaseSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "StringSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "UserSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "RoleSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "MentionableSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "ChannelSelectMenuComponent",
    "kind": "class"
  },
  {
    "name": "EmbedData",
    "kind": "interface"
  },
  {
    "name": "IconData",
    "kind": "interface"
  },
  {
    "name": "EmbedAuthorData",
    "kind": "interface"
  },
  {
    "name": "EmbedFooterData",
    "kind": "interface"
  },
  {
    "name": "EmbedAssetData",
    "kind": "interface"
  },
  {
    "name": "EmbedBuilder",
    "kind": "class"
  },
  {
    "name": "Embed",
    "kind": "class"
  },
  {
    "name": "MappedChannelCategoryTypes",
    "kind": "interface"
  },
  {
    "name": "CategoryChannelType",
    "kind": "type"
  },
  {
    "name": "CategoryChannel",
    "kind": "class"
  },
  {
    "name": "CategoryChannelResolvable",
    "kind": "type"
  },
  {
    "name": "ChannelFlagsString",
    "kind": "type"
  },
  {
    "name": "ChannelFlagsResolvable",
    "kind": "type"
  },
  {
    "name": "ChannelFlagsBitField",
    "kind": "class"
  },
  {
    "name": "BaseChannel",
    "kind": "class"
  },
  {
    "name": "If",
    "kind": "type"
  },
  {
    "name": "AsyncEventIteratorDisposability",
    "kind": "type"
  },
  {
    "name": "AsyncEventIterator",
    "kind": "interface"
  },
  {
    "name": "Client",
    "kind": "class"
  },
  {
    "name": "StickerPackFetchOptions",
    "kind": "interface"
  },
  {
    "name": "ClientApplication",
    "kind": "class"
  },
  {
    "name": "ClientPresence",
    "kind": "class"
  },
  {
    "name": "ClientUser",
    "kind": "class"
  },
  {
    "name": "Options",
    "kind": "class"
  },
  {
    "name": "ClientVoiceManager",
    "kind": "class"
  },
  {
    "name": "ComponentInContainer",
    "kind": "type"
  },
  {
    "name": "ComponentInContainerData",
    "kind": "type"
  },
  {
    "name": "ContainerComponentData",
    "kind": "interface"
  },
  {
    "name": "ContainerComponent",
    "kind": "class"
  },
  {
    "name": "CollectorEventTypes",
    "kind": "interface"
  },
  {
    "name": "Collector",
    "kind": "class"
  },
  {
    "name": "ChatInputCommandInteraction",
    "kind": "class"
  },
  {
    "name": "AutocompleteInteraction",
    "kind": "class"
  },
  {
    "name": "CommandInteractionOptionResolver",
    "kind": "class"
  },
  {
    "name": "ContextMenuCommandInteraction",
    "kind": "class"
  },
  {
    "name": "PrimaryEntryPointCommandInteraction",
    "kind": "class"
  },
  {
    "name": "DMChannel",
    "kind": "interface"
  },
  {
    "name": "DMChannel",
    "kind": "class"
  },
  {
    "name": "Emoji",
    "kind": "class"
  },
  {
    "name": "ApplicationEmojiCreateOptions",
    "kind": "interface"
  },
  {
    "name": "ApplicationEmojiEditOptions",
    "kind": "interface"
  },
  {
    "name": "ApplicationEmoji",
    "kind": "class"
  },
  {
    "name": "ApplicationEmojiManager",
    "kind": "class"
  },
  {
    "name": "Entitlement",
    "kind": "class"
  },
  {
    "name": "Guild",
    "kind": "class"
  },
  {
    "name": "FileComponentData",
    "kind": "interface"
  },
  {
    "name": "FileComponent",
    "kind": "class"
  },
  {
    "name": "GuildAuditLogs",
    "kind": "class"
  },
  {
    "name": "GuildAuditLogsEntry",
    "kind": "class"
  },
  {
    "name": "GuildBan",
    "kind": "class"
  },
  {
    "name": "GuildChannel",
    "kind": "class"
  },
  {
    "name": "GuildEmoji",
    "kind": "class"
  },
  {
    "name": "GuildMemberFlagsString",
    "kind": "type"
  },
  {
    "name": "GuildMemberFlagsResolvable",
    "kind": "type"
  },
  {
    "name": "GuildMemberFlagsBitField",
    "kind": "class"
  },
  {
    "name": "GuildMember",
    "kind": "interface"
  },
  {
    "name": "GuildMember",
    "kind": "class"
  },
  {
    "name": "GuildOnboarding",
    "kind": "class"
  },
  {
    "name": "GuildOnboardingPrompt",
    "kind": "class"
  },
  {
    "name": "GuildOnboardingPromptOption",
    "kind": "class"
  },
  {
    "name": "GuildPreview",
    "kind": "class"
  },
  {
    "name": "GuildScheduledEvent",
    "kind": "class"
  },
  {
    "name": "GuildScheduledEventRecurrenceRule",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventRecurrenceRuleNWeekday",
    "kind": "interface"
  },
  {
    "name": "GuildTemplate",
    "kind": "class"
  },
  {
    "name": "GuildPreviewEmoji",
    "kind": "class"
  },
  {
    "name": "Integration",
    "kind": "class"
  },
  {
    "name": "IntegrationApplication",
    "kind": "class"
  },
  {
    "name": "GatewayIntentsString",
    "kind": "type"
  },
  {
    "name": "IntentsBitField",
    "kind": "class"
  },
  {
    "name": "CacheType",
    "kind": "type"
  },
  {
    "name": "CacheTypeReducer",
    "kind": "type"
  },
  {
    "name": "Interaction",
    "kind": "type"
  },
  {
    "name": "RepliableInteraction",
    "kind": "type"
  },
  {
    "name": "BaseInteraction",
    "kind": "class"
  },
  {
    "name": "InteractionCallback",
    "kind": "class"
  },
  {
    "name": "InteractionCallbackResponse",
    "kind": "class"
  },
  {
    "name": "InteractionCallbackResource",
    "kind": "class"
  },
  {
    "name": "InteractionCollector",
    "kind": "class"
  },
  {
    "name": "InteractionWebhook",
    "kind": "interface"
  },
  {
    "name": "InteractionWebhook",
    "kind": "class"
  },
  {
    "name": "Invite",
    "kind": "class"
  },
  {
    "name": "InviteStageInstance",
    "kind": "class"
  },
  {
    "name": "InviteGuild",
    "kind": "class"
  },
  {
    "name": "InviteFlagsString",
    "kind": "type"
  },
  {
    "name": "InviteFlagsBitField",
    "kind": "class"
  },
  {
    "name": "LimitedCollection",
    "kind": "class"
  },
  {
    "name": "MediaGalleryComponentData",
    "kind": "interface"
  },
  {
    "name": "MediaGalleryComponent",
    "kind": "class"
  },
  {
    "name": "MediaGalleryItemData",
    "kind": "interface"
  },
  {
    "name": "MediaGalleryItem",
    "kind": "class"
  },
  {
    "name": "MessageCall",
    "kind": "interface"
  },
  {
    "name": "SharedClientTheme",
    "kind": "interface"
  },
  {
    "name": "MessageComponentType",
    "kind": "type"
  },
  {
    "name": "MessageCollectorOptionsParams",
    "kind": "interface"
  },
  {
    "name": "MessageChannelCollectorOptionsParams",
    "kind": "interface"
  },
  {
    "name": "AwaitMessageCollectorOptionsParams",
    "kind": "interface"
  },
  {
    "name": "StringMappedInteractionTypes",
    "kind": "interface"
  },
  {
    "name": "WrapBooleanCache",
    "kind": "type"
  },
  {
    "name": "MappedInteractionTypes",
    "kind": "interface"
  },
  {
    "name": "Message",
    "kind": "class"
  },
  {
    "name": "AuthorizingIntegrationOwners",
    "kind": "class"
  },
  {
    "name": "AttachmentBuilder",
    "kind": "class"
  },
  {
    "name": "Attachment",
    "kind": "class"
  },
  {
    "name": "AttachmentFlagsString",
    "kind": "type"
  },
  {
    "name": "AttachmentFlagsBitField",
    "kind": "class"
  },
  {
    "name": "MessageCollector",
    "kind": "class"
  },
  {
    "name": "MessageComponentInteraction",
    "kind": "class"
  },
  {
    "name": "MessageContextMenuCommandInteraction",
    "kind": "class"
  },
  {
    "name": "MessageFlagsString",
    "kind": "type"
  },
  {
    "name": "MessageFlagsBitField",
    "kind": "class"
  },
  {
    "name": "MessageFlagsResolvable",
    "kind": "type"
  },
  {
    "name": "MessageMentions",
    "kind": "class"
  },
  {
    "name": "MessagePayloadOption",
    "kind": "type"
  },
  {
    "name": "MessagePayload",
    "kind": "class"
  },
  {
    "name": "MessageReaction",
    "kind": "class"
  },
  {
    "name": "MessageReactionEventDetails",
    "kind": "interface"
  },
  {
    "name": "ModalComponentData",
    "kind": "interface"
  },
  {
    "name": "BaseModalData",
    "kind": "interface"
  },
  {
    "name": "TextInputModalData",
    "kind": "interface"
  },
  {
    "name": "SelectMenuModalData",
    "kind": "interface"
  },
  {
    "name": "FileUploadModalData",
    "kind": "interface"
  },
  {
    "name": "RadioGroupModalData",
    "kind": "interface"
  },
  {
    "name": "CheckboxGroupModalData",
    "kind": "interface"
  },
  {
    "name": "CheckboxModalData",
    "kind": "interface"
  },
  {
    "name": "ModalData",
    "kind": "type"
  },
  {
    "name": "LabelModalData",
    "kind": "interface"
  },
  {
    "name": "ActionRowModalData",
    "kind": "interface"
  },
  {
    "name": "TextDisplayModalData",
    "kind": "interface"
  },
  {
    "name": "ModalSelectedMentionables",
    "kind": "interface"
  },
  {
    "name": "ModalSubmitFields",
    "kind": "class"
  },
  {
    "name": "ModalMessageModalSubmitInteraction",
    "kind": "interface"
  },
  {
    "name": "ModalSubmitInteraction",
    "kind": "class"
  },
  {
    "name": "NewsChannel",
    "kind": "class"
  },
  {
    "name": "NewsChannelResolvable",
    "kind": "type"
  },
  {
    "name": "OAuth2Guild",
    "kind": "class"
  },
  {
    "name": "PartialGroupDMChannel",
    "kind": "interface"
  },
  {
    "name": "PartialGroupDMChannel",
    "kind": "class"
  },
  {
    "name": "GuildForumTagEmoji",
    "kind": "interface"
  },
  {
    "name": "GuildForumTag",
    "kind": "interface"
  },
  {
    "name": "GuildForumTagData",
    "kind": "interface"
  },
  {
    "name": "DefaultReactionEmoji",
    "kind": "interface"
  },
  {
    "name": "ThreadOnlyChannel",
    "kind": "interface"
  },
  {
    "name": "ThreadOnlyChannel",
    "kind": "class"
  },
  {
    "name": "ForumChannel",
    "kind": "class"
  },
  {
    "name": "MediaChannel",
    "kind": "class"
  },
  {
    "name": "PermissionOverwrites",
    "kind": "class"
  },
  {
    "name": "PermissionsString",
    "kind": "type"
  },
  {
    "name": "PermissionsBitField",
    "kind": "class"
  },
  {
    "name": "Presence",
    "kind": "class"
  },
  {
    "name": "PollQuestionMedia",
    "kind": "interface"
  },
  {
    "name": "PollAnswerVoterManager",
    "kind": "class"
  },
  {
    "name": "Poll",
    "kind": "class"
  },
  {
    "name": "BaseFetchPollAnswerVotersOptions",
    "kind": "interface"
  },
  {
    "name": "PollAnswer",
    "kind": "class"
  },
  {
    "name": "ReactionCollector",
    "kind": "class"
  },
  {
    "name": "ReactionEmoji",
    "kind": "class"
  },
  {
    "name": "RichPresenceAssets",
    "kind": "class"
  },
  {
    "name": "RoleColors",
    "kind": "interface"
  },
  {
    "name": "RoleColorsResolvable",
    "kind": "interface"
  },
  {
    "name": "RoleColorsEditResolvable",
    "kind": "interface"
  },
  {
    "name": "BaseRole",
    "kind": "class"
  },
  {
    "name": "InviteRole",
    "kind": "class"
  },
  {
    "name": "Role",
    "kind": "class"
  },
  {
    "name": "RoleFlagsString",
    "kind": "type"
  },
  {
    "name": "RoleFlagsBitField",
    "kind": "class"
  },
  {
    "name": "SectionComponentData",
    "kind": "interface"
  },
  {
    "name": "SectionComponent",
    "kind": "class"
  },
  {
    "name": "StringSelectMenuInteraction",
    "kind": "class"
  },
  {
    "name": "UserSelectMenuInteraction",
    "kind": "class"
  },
  {
    "name": "RoleSelectMenuInteraction",
    "kind": "class"
  },
  {
    "name": "MentionableSelectMenuInteraction",
    "kind": "class"
  },
  {
    "name": "ChannelSelectMenuInteraction",
    "kind": "class"
  },
  {
    "name": "AnySelectMenuInteraction",
    "kind": "type"
  },
  {
    "name": "SelectMenuType",
    "kind": "type"
  },
  {
    "name": "SeparatorComponentData",
    "kind": "interface"
  },
  {
    "name": "SeparatorComponent",
    "kind": "class"
  },
  {
    "name": "ShardEventTypes",
    "kind": "interface"
  },
  {
    "name": "Shard",
    "kind": "class"
  },
  {
    "name": "ShardClientUtil",
    "kind": "class"
  },
  {
    "name": "ShardingManager",
    "kind": "class"
  },
  {
    "name": "FetchRecommendedShardCountOptions",
    "kind": "interface"
  },
  {
    "name": "SKU",
    "kind": "class"
  },
  {
    "name": "SKUFlagsString",
    "kind": "type"
  },
  {
    "name": "SKUFlagsBitField",
    "kind": "class"
  },
  {
    "name": "Subscription",
    "kind": "class"
  },
  {
    "name": "StageChannel",
    "kind": "class"
  },
  {
    "name": "DirectoryChannel",
    "kind": "class"
  },
  {
    "name": "StageInstance",
    "kind": "class"
  },
  {
    "name": "Sticker",
    "kind": "class"
  },
  {
    "name": "StickerPack",
    "kind": "class"
  },
  {
    "name": "Sweepers",
    "kind": "class"
  },
  {
    "name": "SystemChannelFlagsString",
    "kind": "type"
  },
  {
    "name": "SystemChannelFlagsBitField",
    "kind": "class"
  },
  {
    "name": "Team",
    "kind": "class"
  },
  {
    "name": "TeamMember",
    "kind": "class"
  },
  {
    "name": "TextChannel",
    "kind": "class"
  },
  {
    "name": "TextDisplayComponentData",
    "kind": "interface"
  },
  {
    "name": "TextDisplayComponent",
    "kind": "class"
  },
  {
    "name": "ForumThreadChannel",
    "kind": "type"
  },
  {
    "name": "TextThreadChannel",
    "kind": "type"
  },
  {
    "name": "AnyThreadChannel",
    "kind": "type"
  },
  {
    "name": "PublicThreadChannel",
    "kind": "interface"
  },
  {
    "name": "PrivateThreadChannel",
    "kind": "interface"
  },
  {
    "name": "ThreadChannel",
    "kind": "interface"
  },
  {
    "name": "ThreadChannel",
    "kind": "class"
  },
  {
    "name": "ThreadMember",
    "kind": "class"
  },
  {
    "name": "ThreadMemberFlagsString",
    "kind": "type"
  },
  {
    "name": "ThreadMemberFlagsBitField",
    "kind": "class"
  },
  {
    "name": "ThumbnailComponentData",
    "kind": "interface"
  },
  {
    "name": "ThumbnailComponent",
    "kind": "class"
  },
  {
    "name": "Typing",
    "kind": "class"
  },
  {
    "name": "AvatarDecorationData",
    "kind": "interface"
  },
  {
    "name": "Collectibles",
    "kind": "interface"
  },
  {
    "name": "UserPrimaryGuild",
    "kind": "interface"
  },
  {
    "name": "NameplateData",
    "kind": "interface"
  },
  {
    "name": "UnfurledMediaItemData",
    "kind": "interface"
  },
  {
    "name": "UnfurledMediaItem",
    "kind": "class"
  },
  {
    "name": "User",
    "kind": "interface"
  },
  {
    "name": "User",
    "kind": "class"
  },
  {
    "name": "UserContextMenuCommandInteraction",
    "kind": "class"
  },
  {
    "name": "UserFlagsString",
    "kind": "type"
  },
  {
    "name": "UserFlagsBitField",
    "kind": "class"
  },
  {
    "name": "CreateChannelOptions",
    "kind": "interface"
  },
  {
    "name": "Formatters",
    "kind": "class"
  },
  {
    "name": "ComponentData",
    "kind": "type"
  },
  {
    "name": "SendSoundboardSoundOptions",
    "kind": "interface"
  },
  {
    "name": "VoiceChannel",
    "kind": "class"
  },
  {
    "name": "VoiceChannelEffect",
    "kind": "class"
  },
  {
    "name": "VoiceRegion",
    "kind": "class"
  },
  {
    "name": "VoiceState",
    "kind": "class"
  },
  {
    "name": "Webhook",
    "kind": "interface"
  },
  {
    "name": "Webhook",
    "kind": "class"
  },
  {
    "name": "WebhookClient",
    "kind": "interface"
  },
  {
    "name": "WebhookClient",
    "kind": "class"
  },
  {
    "name": "WebSocketManager",
    "kind": "class"
  },
  {
    "name": "WebSocketShardEventTypes",
    "kind": "interface"
  },
  {
    "name": "WebSocketShard",
    "kind": "class"
  },
  {
    "name": "Widget",
    "kind": "class"
  },
  {
    "name": "WidgetMember",
    "kind": "class"
  },
  {
    "name": "SoundboardSoundResolvable",
    "kind": "type"
  },
  {
    "name": "SoundboardSound",
    "kind": "class"
  },
  {
    "name": "DefaultSoundboardSound",
    "kind": "type"
  },
  {
    "name": "GuildSoundboardSound",
    "kind": "type"
  },
  {
    "name": "WelcomeChannel",
    "kind": "class"
  },
  {
    "name": "WelcomeScreen",
    "kind": "class"
  },
  {
    "name": "NonSystemMessageType",
    "kind": "type"
  },
  {
    "name": "UndeletableMessageType",
    "kind": "type"
  },
  {
    "name": "DeletableMessageType",
    "kind": "type"
  },
  {
    "name": "DiscordjsErrorCodes",
    "kind": "enum"
  },
  {
    "name": "DiscordjsError",
    "kind": "class"
  },
  {
    "name": "DiscordjsTypeError",
    "kind": "class"
  },
  {
    "name": "DiscordjsRangeError",
    "kind": "class"
  },
  {
    "name": "BaseManager",
    "kind": "class"
  },
  {
    "name": "DataManager",
    "kind": "class"
  },
  {
    "name": "CachedManager",
    "kind": "class"
  },
  {
    "name": "ApplicationCommandDataResolvable",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandManager",
    "kind": "class"
  },
  {
    "name": "ApplicationCommandPermissionsManager",
    "kind": "class"
  },
  {
    "name": "AutoModerationRuleManager",
    "kind": "class"
  },
  {
    "name": "BaseGuildEmojiManager",
    "kind": "class"
  },
  {
    "name": "CategoryChannelChildManager",
    "kind": "class"
  },
  {
    "name": "ChannelManager",
    "kind": "class"
  },
  {
    "name": "EntitlementResolvable",
    "kind": "type"
  },
  {
    "name": "SKUResolvable",
    "kind": "type"
  },
  {
    "name": "SubscriptionResolvable",
    "kind": "type"
  },
  {
    "name": "GuildEntitlementCreateOptions",
    "kind": "interface"
  },
  {
    "name": "UserEntitlementCreateOptions",
    "kind": "interface"
  },
  {
    "name": "FetchEntitlementOptions",
    "kind": "interface"
  },
  {
    "name": "FetchEntitlementsOptions",
    "kind": "interface"
  },
  {
    "name": "EntitlementManager",
    "kind": "class"
  },
  {
    "name": "FetchSubscriptionOptions",
    "kind": "interface"
  },
  {
    "name": "FetchSubscriptionsOptions",
    "kind": "interface"
  },
  {
    "name": "SubscriptionManager",
    "kind": "class"
  },
  {
    "name": "FetchGuildApplicationCommandFetchOptions",
    "kind": "interface"
  },
  {
    "name": "GuildApplicationCommandManager",
    "kind": "class"
  },
  {
    "name": "MappedGuildChannelTypes",
    "kind": "type"
  },
  {
    "name": "GuildChannelTypes",
    "kind": "type"
  },
  {
    "name": "GuildChannelManager",
    "kind": "class"
  },
  {
    "name": "GuildEmojiManager",
    "kind": "class"
  },
  {
    "name": "GuildEmojiRoleManager",
    "kind": "class"
  },
  {
    "name": "FetchSoundboardSoundsOptions",
    "kind": "interface"
  },
  {
    "name": "GuildManager",
    "kind": "class"
  },
  {
    "name": "AddOrRemoveGuildMemberRoleOptions",
    "kind": "interface"
  },
  {
    "name": "GuildMemberManager",
    "kind": "class"
  },
  {
    "name": "GuildBanManager",
    "kind": "class"
  },
  {
    "name": "TargetUsersJobStatusForInvite",
    "kind": "interface"
  },
  {
    "name": "GuildInviteManager",
    "kind": "class"
  },
  {
    "name": "GuildScheduledEventManager",
    "kind": "class"
  },
  {
    "name": "GuildSoundboardSoundCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildSoundboardSoundEditOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildSoundboardSoundOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildSoundboardSoundsOptions",
    "kind": "interface"
  },
  {
    "name": "GuildSoundboardSoundManager",
    "kind": "class"
  },
  {
    "name": "GuildStickerManager",
    "kind": "class"
  },
  {
    "name": "GuildMemberRoleManager",
    "kind": "class"
  },
  {
    "name": "FetchPollAnswerVotersOptions",
    "kind": "interface"
  },
  {
    "name": "MessageManager",
    "kind": "class"
  },
  {
    "name": "DMMessageManager",
    "kind": "class"
  },
  {
    "name": "PartialGroupDMMessageManager",
    "kind": "class"
  },
  {
    "name": "GuildMessageManager",
    "kind": "class"
  },
  {
    "name": "PermissionOverwriteManager",
    "kind": "class"
  },
  {
    "name": "PresenceManager",
    "kind": "class"
  },
  {
    "name": "ReactionManager",
    "kind": "class"
  },
  {
    "name": "ReactionUserManager",
    "kind": "class"
  },
  {
    "name": "RoleManager",
    "kind": "class"
  },
  {
    "name": "StageInstanceManager",
    "kind": "class"
  },
  {
    "name": "ThreadManager",
    "kind": "class"
  },
  {
    "name": "GuildTextThreadManager",
    "kind": "class"
  },
  {
    "name": "GuildForumThreadManager",
    "kind": "class"
  },
  {
    "name": "ThreadMemberManager",
    "kind": "class"
  },
  {
    "name": "UserManager",
    "kind": "class"
  },
  {
    "name": "VoiceStateManager",
    "kind": "class"
  },
  {
    "name": "Constructable",
    "kind": "type"
  },
  {
    "name": "PartialTextBasedChannelFields",
    "kind": "interface"
  },
  {
    "name": "TextBasedChannelFields",
    "kind": "interface"
  },
  {
    "name": "PartialWebhookFields",
    "kind": "interface"
  },
  {
    "name": "WebhookFields",
    "kind": "interface"
  },
  {
    "name": "ActivitiesOptions",
    "kind": "interface"
  },
  {
    "name": "ActivityOptions",
    "kind": "interface"
  },
  {
    "name": "AddGuildMemberOptions",
    "kind": "interface"
  },
  {
    "name": "AllowedPartial",
    "kind": "type"
  },
  {
    "name": "AllowedThreadTypeForNewsChannel",
    "kind": "type"
  },
  {
    "name": "AllowedThreadTypeForTextChannel",
    "kind": "type"
  },
  {
    "name": "BaseApplicationCommandData",
    "kind": "interface"
  },
  {
    "name": "AttachmentData",
    "kind": "interface"
  },
  {
    "name": "CommandOptionDataTypeResolvable",
    "kind": "type"
  },
  {
    "name": "CommandOptionChannelResolvableType",
    "kind": "type"
  },
  {
    "name": "CommandOptionChoiceResolvableType",
    "kind": "type"
  },
  {
    "name": "CommandOptionNumericResolvableType",
    "kind": "type"
  },
  {
    "name": "CommandOptionSubOptionResolvableType",
    "kind": "type"
  },
  {
    "name": "CommandOptionNonChoiceResolvableType",
    "kind": "type"
  },
  {
    "name": "BaseApplicationCommandOptionsData",
    "kind": "interface"
  },
  {
    "name": "UserApplicationCommandData",
    "kind": "interface"
  },
  {
    "name": "MessageApplicationCommandData",
    "kind": "interface"
  },
  {
    "name": "ChatInputApplicationCommandData",
    "kind": "interface"
  },
  {
    "name": "PrimaryEntryPointCommandData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandData",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandChannelOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandChannelOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandRoleOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandRoleOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandUserOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandUserOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandMentionableOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandMentionableOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAttachmentOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAttachmentOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAutocompleteNumericOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAutocompleteStringOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAutocompleteNumericOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandAutocompleteStringOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandChoicesData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandChoicesOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandNumericOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandStringOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandBooleanOptionData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandNumericOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandStringOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandBooleanOption",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandSubGroupData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandSubGroup",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandSubCommandData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandSubCommand",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandNonOptionsData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandNonOptions",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandOptionData",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandOption",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandOptionChoiceData",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandPermissions",
    "kind": "interface"
  },
  {
    "name": "ApplicationCommandPermissionsUpdateData",
    "kind": "interface"
  },
  {
    "name": "EditApplicationCommandPermissionsMixin",
    "kind": "interface"
  },
  {
    "name": "ChannelPermissionConstant",
    "kind": "type"
  },
  {
    "name": "RolePermissionConstant",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandPermissionIdResolvable",
    "kind": "type"
  },
  {
    "name": "ApplicationCommandResolvable",
    "kind": "type"
  },
  {
    "name": "ApplicationFlagsString",
    "kind": "type"
  },
  {
    "name": "ApplicationRoleConnectionMetadataEditOptions",
    "kind": "interface"
  },
  {
    "name": "AuditLogChange",
    "kind": "type"
  },
  {
    "name": "AutoModerationAction",
    "kind": "interface"
  },
  {
    "name": "AutoModerationActionMetadata",
    "kind": "interface"
  },
  {
    "name": "AutoModerationTriggerMetadata",
    "kind": "interface"
  },
  {
    "name": "AwaitMessageComponentOptions",
    "kind": "interface"
  },
  {
    "name": "ModalSubmitInteractionCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "AwaitModalSubmitOptions",
    "kind": "interface"
  },
  {
    "name": "AwaitMessagesOptions",
    "kind": "interface"
  },
  {
    "name": "AwaitReactionsOptions",
    "kind": "interface"
  },
  {
    "name": "BanOptions",
    "kind": "interface"
  },
  {
    "name": "BulkBanOptions",
    "kind": "interface"
  },
  {
    "name": "BulkBanResult",
    "kind": "interface"
  },
  {
    "name": "PollData",
    "kind": "interface"
  },
  {
    "name": "PollAnswerData",
    "kind": "interface"
  },
  {
    "name": "Base64Resolvable",
    "kind": "type"
  },
  {
    "name": "Base64String",
    "kind": "type"
  },
  {
    "name": "BaseFetchOptions",
    "kind": "interface"
  },
  {
    "name": "BitFieldResolvable",
    "kind": "type"
  },
  {
    "name": "BufferResolvable",
    "kind": "type"
  },
  {
    "name": "Caches",
    "kind": "interface"
  },
  {
    "name": "CacheConstructors",
    "kind": "type"
  },
  {
    "name": "OverriddenCaches",
    "kind": "type"
  },
  {
    "name": "CacheFactory",
    "kind": "type"
  },
  {
    "name": "CacheWithLimitsOptions",
    "kind": "type"
  },
  {
    "name": "CategoryCreateChannelOptions",
    "kind": "interface"
  },
  {
    "name": "ChannelCreationOverwrites",
    "kind": "interface"
  },
  {
    "name": "ChannelMention",
    "kind": "type"
  },
  {
    "name": "ChannelPosition",
    "kind": "interface"
  },
  {
    "name": "GuildTextChannelResolvable",
    "kind": "type"
  },
  {
    "name": "ChannelResolvable",
    "kind": "type"
  },
  {
    "name": "ChannelWebhookCreateOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildMembersChunk",
    "kind": "interface"
  },
  {
    "name": "OmitPartialGroupDMChannel",
    "kind": "type"
  },
  {
    "name": "VoiceServerUpdateData",
    "kind": "interface"
  },
  {
    "name": "ClientEvents",
    "kind": "interface"
  },
  {
    "name": "ClientFetchInviteOptions",
    "kind": "interface"
  },
  {
    "name": "ClientOptions",
    "kind": "interface"
  },
  {
    "name": "ClientPresenceStatus",
    "kind": "type"
  },
  {
    "name": "ClientPresenceStatusData",
    "kind": "interface"
  },
  {
    "name": "ClientUserEditOptions",
    "kind": "interface"
  },
  {
    "name": "CloseEvent",
    "kind": "interface"
  },
  {
    "name": "CollectorFilter",
    "kind": "type"
  },
  {
    "name": "CollectorOptions",
    "kind": "interface"
  },
  {
    "name": "CollectorResetTimerOptions",
    "kind": "interface"
  },
  {
    "name": "ColorResolvable",
    "kind": "type"
  },
  {
    "name": "CommandInteractionOption",
    "kind": "interface"
  },
  {
    "name": "BaseInteractionResolvedData",
    "kind": "interface"
  },
  {
    "name": "CommandInteractionResolvedData",
    "kind": "interface"
  },
  {
    "name": "AutocompleteFocusedOption",
    "kind": "interface"
  },
  {
    "name": "Events",
    "kind": "enum"
  },
  {
    "name": "ShardEvents",
    "kind": "enum"
  },
  {
    "name": "WebSocketShardEvents",
    "kind": "enum"
  },
  {
    "name": "Status",
    "kind": "enum"
  },
  {
    "name": "GuildScheduledEventInviteURLCreateOptions",
    "kind": "interface"
  },
  {
    "name": "RoleCreateOptions",
    "kind": "interface"
  },
  {
    "name": "RoleEditOptions",
    "kind": "interface"
  },
  {
    "name": "StageInstanceCreateOptions",
    "kind": "interface"
  },
  {
    "name": "CrosspostedChannel",
    "kind": "interface"
  },
  {
    "name": "DateResolvable",
    "kind": "type"
  },
  {
    "name": "GuildTemplateEditOptions",
    "kind": "interface"
  },
  {
    "name": "EmbedField",
    "kind": "interface"
  },
  {
    "name": "EmojiIdentifierResolvable",
    "kind": "type"
  },
  {
    "name": "EmojiResolvable",
    "kind": "type"
  },
  {
    "name": "FetchApplicationCommandOptions",
    "kind": "interface"
  },
  {
    "name": "FetchArchivedThreadOptions",
    "kind": "interface"
  },
  {
    "name": "FetchAutoModerationRuleOptions",
    "kind": "interface"
  },
  {
    "name": "FetchAutoModerationRulesOptions",
    "kind": "interface"
  },
  {
    "name": "FetchBanOptions",
    "kind": "interface"
  },
  {
    "name": "FetchBansOptions",
    "kind": "interface"
  },
  {
    "name": "FetchChannelOptions",
    "kind": "interface"
  },
  {
    "name": "FetchedThreads",
    "kind": "interface"
  },
  {
    "name": "FetchedThreadsMore",
    "kind": "interface"
  },
  {
    "name": "FetchGuildOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildsOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildScheduledEventOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildScheduledEventsOptions",
    "kind": "interface"
  },
  {
    "name": "FetchGuildScheduledEventSubscribersOptions",
    "kind": "interface"
  },
  {
    "name": "FetchInviteOptions",
    "kind": "interface"
  },
  {
    "name": "FetchInvitesOptions",
    "kind": "interface"
  },
  {
    "name": "FetchMemberOptions",
    "kind": "interface"
  },
  {
    "name": "FetchMembersOptions",
    "kind": "interface"
  },
  {
    "name": "FetchMessageOptions",
    "kind": "interface"
  },
  {
    "name": "FetchMessagesOptions",
    "kind": "interface"
  },
  {
    "name": "FetchPinnedMessagesOptions",
    "kind": "interface"
  },
  {
    "name": "FetchPinnedMessagesResponse",
    "kind": "interface"
  },
  {
    "name": "MessagePin",
    "kind": "interface"
  },
  {
    "name": "FetchReactionUsersOptions",
    "kind": "interface"
  },
  {
    "name": "FetchThreadMemberOptions",
    "kind": "interface"
  },
  {
    "name": "FetchThreadOwnerOptions",
    "kind": "interface"
  },
  {
    "name": "FetchThreadMembersWithGuildMemberDataOptions",
    "kind": "interface"
  },
  {
    "name": "FetchThreadMembersWithoutGuildMemberDataOptions",
    "kind": "interface"
  },
  {
    "name": "FetchThreadMembersOptions",
    "kind": "type"
  },
  {
    "name": "FetchThreadsOptions",
    "kind": "interface"
  },
  {
    "name": "AttachmentPayload",
    "kind": "interface"
  },
  {
    "name": "GlobalSweepFilter",
    "kind": "type"
  },
  {
    "name": "GuildAuditLogsTypes",
    "kind": "interface"
  },
  {
    "name": "GuildAuditLogsActionType",
    "kind": "type"
  },
  {
    "name": "GuildAuditLogsEntryExtraField",
    "kind": "interface"
  },
  {
    "name": "GuildAuditLogsEntryTargetField",
    "kind": "interface"
  },
  {
    "name": "GuildAuditLogsFetchOptions",
    "kind": "interface"
  },
  {
    "name": "GuildAuditLogsResolvable",
    "kind": "type"
  },
  {
    "name": "GuildAuditLogsTargetType",
    "kind": "type"
  },
  {
    "name": "GuildAuditLogsTargets",
    "kind": "type"
  },
  {
    "name": "GuildBanResolvable",
    "kind": "type"
  },
  {
    "name": "GuildChannelResolvable",
    "kind": "type"
  },
  {
    "name": "AutoModerationRuleCreateOptions",
    "kind": "interface"
  },
  {
    "name": "AutoModerationRuleEditOptions",
    "kind": "interface"
  },
  {
    "name": "AutoModerationTriggerMetadataOptions",
    "kind": "interface"
  },
  {
    "name": "AutoModerationActionOptions",
    "kind": "interface"
  },
  {
    "name": "AutoModerationActionMetadataOptions",
    "kind": "interface"
  },
  {
    "name": "GuildChannelCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildChannelCloneOptions",
    "kind": "interface"
  },
  {
    "name": "GuildChannelEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildChannelOverwriteOptions",
    "kind": "interface"
  },
  {
    "name": "GuildCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildWidgetSettings",
    "kind": "interface"
  },
  {
    "name": "GuildEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildEmojiCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildEmojiEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildStickerCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildStickerEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildMemberEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildMemberResolvable",
    "kind": "type"
  },
  {
    "name": "GuildMemberEditMeOptions",
    "kind": "interface"
  },
  {
    "name": "GuildResolvable",
    "kind": "type"
  },
  {
    "name": "GuildPruneMembersOptions",
    "kind": "interface"
  },
  {
    "name": "GuildWidgetSettingsData",
    "kind": "interface"
  },
  {
    "name": "GuildSearchMembersOptions",
    "kind": "interface"
  },
  {
    "name": "GuildListMembersOptions",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventRecurrenceRuleOptions",
    "kind": "type"
  },
  {
    "name": "BaseGuildScheduledEventRecurrenceRuleOptions",
    "kind": "type"
  },
  {
    "name": "GuildScheduledEventEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventEntityMetadata",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventEntityMetadataOptions",
    "kind": "interface"
  },
  {
    "name": "GuildScheduledEventManagerFetchResult",
    "kind": "type"
  },
  {
    "name": "GuildScheduledEventManagerFetchSubscribersResult",
    "kind": "type"
  },
  {
    "name": "GuildScheduledEventResolvable",
    "kind": "type"
  },
  {
    "name": "GuildScheduledEventSetStatusArg",
    "kind": "type"
  },
  {
    "name": "GuildScheduledEventUser",
    "kind": "interface"
  },
  {
    "name": "GuildTemplateResolvable",
    "kind": "type"
  },
  {
    "name": "GuildVoiceChannelResolvable",
    "kind": "type"
  },
  {
    "name": "GuildOnboardingEditOptions",
    "kind": "interface"
  },
  {
    "name": "GuildOnboardingPromptData",
    "kind": "interface"
  },
  {
    "name": "GuildOnboardingPromptOptionData",
    "kind": "interface"
  },
  {
    "name": "HexColorString",
    "kind": "type"
  },
  {
    "name": "IncidentActions",
    "kind": "interface"
  },
  {
    "name": "IncidentActionsEditOptions",
    "kind": "interface"
  },
  {
    "name": "IntegrationAccount",
    "kind": "interface"
  },
  {
    "name": "IntegrationType",
    "kind": "type"
  },
  {
    "name": "IntegrationTypesConfigurationParameters",
    "kind": "type"
  },
  {
    "name": "IntegrationTypesConfigurationContext",
    "kind": "interface"
  },
  {
    "name": "IntegrationTypesConfiguration",
    "kind": "type"
  },
  {
    "name": "CollectedInteraction",
    "kind": "type"
  },
  {
    "name": "InteractionCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "InteractionDeferReplyOptions",
    "kind": "interface"
  },
  {
    "name": "InteractionDeferUpdateOptions",
    "kind": "interface"
  },
  {
    "name": "InteractionReplyOptions",
    "kind": "interface"
  },
  {
    "name": "InteractionUpdateOptions",
    "kind": "interface"
  },
  {
    "name": "InviteGenerationOptions",
    "kind": "interface"
  },
  {
    "name": "GuildInvitableChannelResolvable",
    "kind": "type"
  },
  {
    "name": "InviteCreateOptions",
    "kind": "interface"
  },
  {
    "name": "InviteResolvable",
    "kind": "type"
  },
  {
    "name": "LifetimeFilterOptions",
    "kind": "interface"
  },
  {
    "name": "MakeErrorOptions",
    "kind": "interface"
  },
  {
    "name": "ActionRowComponentOptions",
    "kind": "type"
  },
  {
    "name": "MessageActionRowComponentResolvable",
    "kind": "type"
  },
  {
    "name": "MessageActivity",
    "kind": "interface"
  },
  {
    "name": "BaseButtonComponentData",
    "kind": "interface"
  },
  {
    "name": "LinkButtonComponentData",
    "kind": "interface"
  },
  {
    "name": "InteractionButtonComponentData",
    "kind": "interface"
  },
  {
    "name": "ButtonComponentData",
    "kind": "type"
  },
  {
    "name": "MessageCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "MessageComponent",
    "kind": "type"
  },
  {
    "name": "CollectedMessageInteraction",
    "kind": "type"
  },
  {
    "name": "MessageComponentCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "MessageChannelComponentCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "MessageInteractionMetadata",
    "kind": "interface"
  },
  {
    "name": "MessageInteraction",
    "kind": "interface"
  },
  {
    "name": "MessageMentionsHasOptions",
    "kind": "interface"
  },
  {
    "name": "MessageMentionOptions",
    "kind": "interface"
  },
  {
    "name": "MessageMentionTypes",
    "kind": "type"
  },
  {
    "name": "MessageSnapshot",
    "kind": "interface"
  },
  {
    "name": "BaseMessageOptions",
    "kind": "interface"
  },
  {
    "name": "BaseMessageOptionsWithPoll",
    "kind": "interface"
  },
  {
    "name": "MessageCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildForumThreadMessageCreateOptions",
    "kind": "interface"
  },
  {
    "name": "MessageEditAttachmentData",
    "kind": "interface"
  },
  {
    "name": "MessageEditOptions",
    "kind": "interface"
  },
  {
    "name": "MessageReactionResolvable",
    "kind": "type"
  },
  {
    "name": "MessageReference",
    "kind": "interface"
  },
  {
    "name": "MessageResolvable",
    "kind": "type"
  },
  {
    "name": "BaseSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "StringSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "UserSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "RoleSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "MentionableSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "ChannelSelectMenuComponentData",
    "kind": "interface"
  },
  {
    "name": "MessageSelectOption",
    "kind": "interface"
  },
  {
    "name": "ReactionCountDetailsData",
    "kind": "interface"
  },
  {
    "name": "SelectMenuComponentOptionData",
    "kind": "interface"
  },
  {
    "name": "TextInputComponentData",
    "kind": "interface"
  },
  {
    "name": "FileUploadComponentData",
    "kind": "interface"
  },
  {
    "name": "RadioGroupOption",
    "kind": "interface"
  },
  {
    "name": "RadioGroupComponentData",
    "kind": "interface"
  },
  {
    "name": "CheckboxGroupOption",
    "kind": "interface"
  },
  {
    "name": "CheckboxGroupComponentData",
    "kind": "interface"
  },
  {
    "name": "CheckboxComponentData",
    "kind": "interface"
  },
  {
    "name": "MessageTarget",
    "kind": "type"
  },
  {
    "name": "MultipleShardRespawnOptions",
    "kind": "interface"
  },
  {
    "name": "MultipleShardSpawnOptions",
    "kind": "interface"
  },
  {
    "name": "OverwriteData",
    "kind": "interface"
  },
  {
    "name": "OverwriteResolvable",
    "kind": "type"
  },
  {
    "name": "PermissionFlags",
    "kind": "type"
  },
  {
    "name": "PermissionOverwriteOptions",
    "kind": "type"
  },
  {
    "name": "PermissionResolvable",
    "kind": "type"
  },
  {
    "name": "PermissionOverwriteResolvable",
    "kind": "type"
  },
  {
    "name": "RecursiveReadonlyArray",
    "kind": "interface"
  },
  {
    "name": "PartialRecipient",
    "kind": "interface"
  },
  {
    "name": "PresenceData",
    "kind": "interface"
  },
  {
    "name": "PresenceResolvable",
    "kind": "type"
  },
  {
    "name": "PartialChannelData",
    "kind": "interface"
  },
  {
    "name": "PartialEmoji",
    "kind": "interface"
  },
  {
    "name": "PartialEmojiOnlyId",
    "kind": "interface"
  },
  {
    "name": "Partialize",
    "kind": "type"
  },
  {
    "name": "PartialDMChannel",
    "kind": "interface"
  },
  {
    "name": "PartialGuildMember",
    "kind": "interface"
  },
  {
    "name": "PartialMessage",
    "kind": "interface"
  },
  {
    "name": "PartialMessageReaction",
    "kind": "interface"
  },
  {
    "name": "PartialPoll",
    "kind": "interface"
  },
  {
    "name": "PartialPollAnswer",
    "kind": "interface"
  },
  {
    "name": "PartialGuildScheduledEvent",
    "kind": "interface"
  },
  {
    "name": "PartialThreadMember",
    "kind": "interface"
  },
  {
    "name": "PartialSoundboardSound",
    "kind": "interface"
  },
  {
    "name": "PartialOverwriteData",
    "kind": "interface"
  },
  {
    "name": "PartialRoleData",
    "kind": "interface"
  },
  {
    "name": "Partials",
    "kind": "enum"
  },
  {
    "name": "PartialUser",
    "kind": "interface"
  },
  {
    "name": "PresenceStatusData",
    "kind": "type"
  },
  {
    "name": "PresenceStatus",
    "kind": "type"
  },
  {
    "name": "ReactionCollectorOptions",
    "kind": "interface"
  },
  {
    "name": "ReplyOptions",
    "kind": "interface"
  },
  {
    "name": "BaseForwardOptions",
    "kind": "interface"
  },
  {
    "name": "ForwardOptionsWithMandatoryChannel",
    "kind": "type"
  },
  {
    "name": "ForwardOptionsWithOptionalChannel",
    "kind": "interface"
  },
  {
    "name": "ForwardOptions",
    "kind": "type"
  },
  {
    "name": "MessageReplyOptions",
    "kind": "interface"
  },
  {
    "name": "ResolvedOverwriteOptions",
    "kind": "interface"
  },
  {
    "name": "RoleData",
    "kind": "interface"
  },
  {
    "name": "RoleMention",
    "kind": "type"
  },
  {
    "name": "RolePosition",
    "kind": "interface"
  },
  {
    "name": "RoleResolvable",
    "kind": "type"
  },
  {
    "name": "RoleSubscriptionData",
    "kind": "interface"
  },
  {
    "name": "RoleTagData",
    "kind": "interface"
  },
  {
    "name": "SetChannelPositionOptions",
    "kind": "interface"
  },
  {
    "name": "SetParentOptions",
    "kind": "interface"
  },
  {
    "name": "SetRolePositionOptions",
    "kind": "interface"
  },
  {
    "name": "ShardingManagerMode",
    "kind": "type"
  },
  {
    "name": "ShardingManagerOptions",
    "kind": "interface"
  },
  {
    "name": "ShowModalOptions",
    "kind": "interface"
  },
  {
    "name": "LaunchActivityOptions",
    "kind": "interface"
  },
  {
    "name": "StageInstanceResolvable",
    "kind": "type"
  },
  {
    "name": "StartThreadOptions",
    "kind": "interface"
  },
  {
    "name": "ClientStatus",
    "kind": "type"
  },
  {
    "name": "StickerResolvable",
    "kind": "type"
  },
  {
    "name": "SystemChannelFlagsResolvable",
    "kind": "type"
  },
  {
    "name": "StageChannelResolvable",
    "kind": "type"
  },
  {
    "name": "StageInstanceEditOptions",
    "kind": "interface"
  },
  {
    "name": "SupportingInteractionResolvedData",
    "kind": "interface"
  },
  {
    "name": "SweeperKey",
    "kind": "type"
  },
  {
    "name": "CollectionSweepFilter",
    "kind": "type"
  },
  {
    "name": "SweepOptions",
    "kind": "interface"
  },
  {
    "name": "LifetimeSweepOptions",
    "kind": "interface"
  },
  {
    "name": "SweeperDefinitions",
    "kind": "interface"
  },
  {
    "name": "SweeperOptions",
    "kind": "type"
  },
  {
    "name": "LimitedCollectionOptions",
    "kind": "interface"
  },
  {
    "name": "Channel",
    "kind": "type"
  },
  {
    "name": "TextBasedChannel",
    "kind": "type"
  },
  {
    "name": "SendableChannels",
    "kind": "type"
  },
  {
    "name": "TextBasedChannels",
    "kind": "type"
  },
  {
    "name": "TextBasedChannelTypes",
    "kind": "type"
  },
  {
    "name": "GuildTextBasedChannelTypes",
    "kind": "type"
  },
  {
    "name": "SendableChannelTypes",
    "kind": "type"
  },
  {
    "name": "VoiceBasedChannel",
    "kind": "type"
  },
  {
    "name": "GuildBasedChannel",
    "kind": "type"
  },
  {
    "name": "CategoryChildChannel",
    "kind": "type"
  },
  {
    "name": "NonThreadGuildBasedChannel",
    "kind": "type"
  },
  {
    "name": "GuildTextBasedChannel",
    "kind": "type"
  },
  {
    "name": "TextChannelResolvable",
    "kind": "type"
  },
  {
    "name": "TextBasedChannelResolvable",
    "kind": "type"
  },
  {
    "name": "ThreadChannelResolvable",
    "kind": "type"
  },
  {
    "name": "ThreadChannelType",
    "kind": "type"
  },
  {
    "name": "GuildTextThreadCreateOptions",
    "kind": "interface"
  },
  {
    "name": "GuildForumThreadCreateOptions",
    "kind": "interface"
  },
  {
    "name": "ThreadEditOptions",
    "kind": "interface"
  },
  {
    "name": "ThreadMemberResolvable",
    "kind": "type"
  },
  {
    "name": "UserMention",
    "kind": "type"
  },
  {
    "name": "UserResolvable",
    "kind": "type"
  },
  {
    "name": "Vanity",
    "kind": "interface"
  },
  {
    "name": "VoiceBasedChannelTypes",
    "kind": "type"
  },
  {
    "name": "VoiceChannelResolvable",
    "kind": "type"
  },
  {
    "name": "VoiceStateEditOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookClientData",
    "kind": "type"
  },
  {
    "name": "WebhookClientDataIdWithToken",
    "kind": "interface"
  },
  {
    "name": "WebhookClientDataURL",
    "kind": "interface"
  },
  {
    "name": "WebhookClientOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookDeleteOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookEditOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookMessageEditOptions",
    "kind": "interface"
  },
  {
    "name": "InteractionEditReplyOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookFetchMessageOptions",
    "kind": "interface"
  },
  {
    "name": "WebhookMessageCreateOptions",
    "kind": "interface"
  },
  {
    "name": "WebSocketOptions",
    "kind": "interface"
  },
  {
    "name": "WidgetActivity",
    "kind": "interface"
  },
  {
    "name": "WidgetChannel",
    "kind": "interface"
  },
  {
    "name": "WelcomeChannelData",
    "kind": "interface"
  },
  {
    "name": "WelcomeScreenEditOptions",
    "kind": "interface"
  },
  {
    "name": "ClientApplicationEditOptions",
    "kind": "interface"
  },
  {
    "name": "ClientApplicationInstallParams",
    "kind": "interface"
  },
  {
    "name": "Serialized",
    "kind": "type"
  },
  {
    "name": "InternalDiscordGatewayAdapterLibraryMethods",
    "kind": "interface"
  },
  {
    "name": "InternalDiscordGatewayAdapterImplementerMethods",
    "kind": "interface"
  },
  {
    "name": "InternalDiscordGatewayAdapterCreator",
    "kind": "type"
  }
] as const;

export const DISCORD_EXPORT_ALIASES = [
  {
    "from": "StringSelectMenuBuilder",
    "as": "SelectMenuBuilder",
    "module": null
  },
  {
    "from": "StringSelectMenuOptionBuilder",
    "as": "SelectMenuOptionBuilder",
    "module": null
  },
  {
    "from": "StringSelectMenuComponent",
    "as": "SelectMenuComponent",
    "module": null
  },
  {
    "from": "Collection",
    "as": "Collection",
    "module": "@discordjs/collection"
  },
  {
    "from": "ReadonlyCollection",
    "as": "ReadonlyCollection",
    "module": "@discordjs/collection"
  },
  {
    "from": "StringSelectMenuInteraction",
    "as": "SelectMenuInteraction",
    "module": null
  },
  {
    "from": "DiscordSnowflake",
    "as": "SnowflakeUtil",
    "module": "@sapphire/snowflake"
  },
  {
    "from": "SnowflakeGenerateOptions",
    "as": "SnowflakeGenerateOptions",
    "module": "@sapphire/snowflake"
  },
  {
    "from": "DeconstructedSnowflake",
    "as": "DeconstructedSnowflake",
    "module": "@sapphire/snowflake"
  },
  {
    "from": "Snowflake",
    "as": "Snowflake",
    "module": null
  },
  {
    "from": "ImageSize",
    "as": "ImageSize",
    "module": null
  }
] as const;

export type DiscordEntityName = keyof typeof DISCORD_API_ENTITIES;
export type DiscordClientEventName = keyof typeof DISCORD_CLIENT_EVENTS;
export type DiscordTopLevelFunctionName = (typeof DISCORD_TOP_LEVEL_FUNCTIONS)[number]['name'];

export function hasDiscordEntity(name: string): name is DiscordEntityName {
  return Object.prototype.hasOwnProperty.call(DISCORD_API_ENTITIES, name);
}

export function hasDiscordEvent(name: string): name is DiscordClientEventName {
  return Object.prototype.hasOwnProperty.call(DISCORD_CLIENT_EVENTS, name);
}

export function getDiscordMethods(owner: DiscordEntityName): readonly string[] {
  return DISCORD_API_ENTITIES[owner].methods.map((m) => m.name).filter((x) => typeof x === 'string') as readonly string[];
}

export function hasDiscordMethod(owner: string, member: string): boolean {
  if (!hasDiscordEntity(owner)) return false;
  const seen = new Set<string>();
  const visit = (name: DiscordEntityName): boolean => {
    if (seen.has(name)) return false;
    seen.add(name);
    const entity = DISCORD_API_ENTITIES[name];
    if (entity.methods.some((m) => m.name === member)) return true;
    for (const base of entity.extends) {
      const baseName = base.match(/^[A-Za-z_$][\w$]*/)?.[0];
      if (baseName && hasDiscordEntity(baseName) && visit(baseName)) return true;
    }
    return false;
  };
  return visit(owner);
}
