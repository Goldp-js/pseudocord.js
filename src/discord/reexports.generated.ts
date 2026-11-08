/** AUTO-GENERADO desde los paquetes reexportados por discord.js 14.28.0. */
export const DISCORD_REEXPORT_STATS = {
  "builders": {
    "files": 65,
    "entities": 61,
    "methods": 217,
    "properties": 78,
    "functions": 36,
    "constants": 71
  },
  "formatters": {
    "files": 3,
    "entities": 2,
    "methods": 0,
    "properties": 17,
    "functions": 73,
    "constants": 2
  },
  "rest": {
    "files": 10,
    "entities": 29,
    "methods": 36,
    "properties": 116,
    "functions": 10,
    "constants": 10
  },
  "util": {
    "files": 12,
    "entities": 4,
    "methods": 2,
    "properties": 4,
    "functions": 8,
    "constants": 1
  },
  "ws": {
    "files": 13,
    "entities": 26,
    "methods": 46,
    "properties": 62,
    "functions": 2,
    "constants": 5
  },
  "collection": {
    "files": 2,
    "entities": 2,
    "methods": 105,
    "properties": 2,
    "functions": 0,
    "constants": 1
  }
} as const;

export const DISCORD_REEXPORT_CATALOG = {
  "builders": {
    "files": 65,
    "entities": {
      "IconData": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
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
        ],
        "constructors": []
      },
      "EmbedAuthorData": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "EmbedAuthorOptions": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "EmbedFooterData": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "EmbedFooterOptions": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "EmbedImageData": {
        "kind": "interface",
        "source": "messages/embed/Embed.ts",
        "methods": [],
        "properties": [
          {
            "name": "proxyURL",
            "kind": "property",
            "static": false,
            "signature": "proxyURL?: string;"
          }
        ],
        "constructors": []
      },
      "EmbedBuilder": {
        "kind": "class",
        "source": "messages/embed/Embed.ts",
        "methods": [
          {
            "name": "addFields",
            "static": false,
            "signature": "public addFields(...fields: RestOrArray<APIEmbedField>): this { const normalizedFields = normalizeArray(fields); // Ensure adding these fields won't exceed the 25 field limit validateFieldLength(normalizedFields.length, this.data.fields); // Data assertions embedFieldsArrayPredicate.parse(normalizedFields); if (this.data.fields) this.data.fields.push(...normalizedFields); else this.data.fields = normalizedFields; return this; }"
          },
          {
            "name": "spliceFields",
            "static": false,
            "signature": "public spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this { // Ensure adding these fields won't exceed the 25 field limit validateFieldLength(fields.length - deleteCount, this.data.fields); // Data assertions embedFieldsArrayPredicate.parse(fields); if (this.data.fields) this.data.fields.splice(index, deleteCount, ...fields); else this.data.fields = fields; return this; }"
          },
          {
            "name": "setFields",
            "static": false,
            "signature": "public setFields(...fields: RestOrArray<APIEmbedField>): this { this.spliceFields(0, this.data.fields?.length ?? 0, ...normalizeArray(fields)); return this; }"
          },
          {
            "name": "setAuthor",
            "static": false,
            "signature": "public setAuthor(options: EmbedAuthorOptions | null): this { if (options === null) { this.data.author = undefined; return this; } // Data assertions embedAuthorPredicate.parse(options); this.data.author = { name: options.name, url: options.url, icon_url: options.iconURL }; return this; }"
          },
          {
            "name": "setColor",
            "static": false,
            "signature": "public setColor(color: RGBTuple | number | null): this { // Data assertions colorPredicate.parse(color); if (Array.isArray(color)) { const [red, green, blue] = color; this.data.color = (red << 16) + (green << 8) + blue; return this; } this.data.color = color ?? undefined; return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string | null): this { // Data assertions descriptionPredicate.parse(description); this.data.description = description ?? undefined; return this; }"
          },
          {
            "name": "setFooter",
            "static": false,
            "signature": "public setFooter(options: EmbedFooterOptions | null): this { if (options === null) { this.data.footer = undefined; return this; } // Data assertions embedFooterPredicate.parse(options); this.data.footer = { text: options.text, icon_url: options.iconURL }; return this; }"
          },
          {
            "name": "setImage",
            "static": false,
            "signature": "public setImage(url: string | null): this { // Data assertions imageURLPredicate.parse(url); this.data.image = url ? { url } : undefined; return this; }"
          },
          {
            "name": "setThumbnail",
            "static": false,
            "signature": "public setThumbnail(url: string | null): this { // Data assertions imageURLPredicate.parse(url); this.data.thumbnail = url ? { url } : undefined; return this; }"
          },
          {
            "name": "setTimestamp",
            "static": false,
            "signature": "public setTimestamp(timestamp: Date | number | null = Date.now()): this { // Data assertions timestampPredicate.parse(timestamp); this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined; return this; }"
          },
          {
            "name": "setTitle",
            "static": false,
            "signature": "public setTitle(title: string | null): this { // Data assertions titlePredicate.parse(title); this.data.title = title ?? undefined; return this; }"
          },
          {
            "name": "setURL",
            "static": false,
            "signature": "public setURL(url: string | null): this { // Data assertions urlPredicate.parse(url); this.data.url = url ?? undefined; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIEmbed { return { ...this.data }; }"
          }
        ],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "public readonly data: APIEmbed;"
          }
        ],
        "constructors": [
          "public constructor(data: APIEmbed = {}) { this.data = { ...data }; if (data.timestamp) this.data.timestamp = new Date(data.timestamp).toISOString(); }"
        ]
      },
      "ActionRowBuilder": {
        "kind": "class",
        "source": "components/ActionRow.ts",
        "methods": [
          {
            "name": "addComponents",
            "static": false,
            "signature": "public addComponents(...components: RestOrArray<ComponentType>) { this.components.push(...normalizeArray(components)); return this; }"
          },
          {
            "name": "setComponents",
            "static": false,
            "signature": "public setComponents(...components: RestOrArray<ComponentType>) { this.components.splice(0, this.components.length, ...normalizeArray(components)); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIActionRowComponent<ReturnType<ComponentType['toJSON']>> { return { ...this.data, components: this.components.map((component) => component.toJSON()), } as APIActionRowComponent<ReturnType<ComponentType['toJSON']>>; }"
          }
        ],
        "properties": [
          {
            "name": "components",
            "kind": "property",
            "static": false,
            "signature": "public readonly components: ComponentType[];"
          }
        ],
        "constructors": [
          "public constructor({ components, ...data }: Partial<APIActionRowComponent<APIComponentInActionRow>> = {}) { super({ type: ComponentType.ActionRow, ...data }); this.components = (components?.map((component) => createComponentBuilder(component)) ?? []) as ComponentType[]; }"
        ]
      },
      "ButtonBuilder": {
        "kind": "class",
        "source": "components/button/Button.ts",
        "methods": [
          {
            "name": "setStyle",
            "static": false,
            "signature": "public setStyle(style: ButtonStyle) { this.data.style = buttonStyleValidator.parse(style); return this; }"
          },
          {
            "name": "setURL",
            "static": false,
            "signature": "public setURL(url: string) { (this.data as APIButtonComponentWithURL).url = urlValidator.parse(url); return this; }"
          },
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { (this.data as APIButtonComponentWithCustomId).custom_id = customIdValidator.parse(customId); return this; }"
          },
          {
            "name": "setSKUId",
            "static": false,
            "signature": "public setSKUId(skuId: Snowflake) { (this.data as APIButtonComponentWithSKUId).sku_id = skuId; return this; }"
          },
          {
            "name": "setEmoji",
            "static": false,
            "signature": "public setEmoji(emoji: APIMessageComponentEmoji) { (this.data as Exclude<APIButtonComponent, APIButtonComponentWithSKUId>).emoji = emojiValidator.parse(emoji); return this; }"
          },
          {
            "name": "setDisabled",
            "static": false,
            "signature": "public setDisabled(disabled = true) { this.data.disabled = disabledValidator.parse(disabled); return this; }"
          },
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { (this.data as Exclude<APIButtonComponent, APIButtonComponentWithSKUId>).label = buttonLabelValidator.parse(label); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIButtonComponent { validateRequiredButtonParameters( this.data.style, (this.data as Exclude<APIButtonComponent, APIButtonComponentWithSKUId>).label, (this.data as Exclude<APIButtonComponent, APIButtonComponentWithSKUId>).emoji, (this.data as APIButtonComponentWithCustomId).custom_id, (this.data as APIButtonComponentWithSKUId).sku_id, (this.data as APIButtonComponentWithURL).url, ); return { ...this.data, } as APIButtonComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APIButtonComponent>) { super({ type: ComponentType.Button, ...data }); }"
        ]
      },
      "ComponentBuilder": {
        "kind": "class",
        "source": "components/Component.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "public abstract toJSON(): AnyAPIActionRowComponent;"
          },
          {
            "name": "setId",
            "static": false,
            "signature": "public setId(id: number) { this.data.id = idValidator.parse(id); return this; }"
          },
          {
            "name": "clearId",
            "static": false,
            "signature": "public clearId() { this.data.id = undefined; return this; }"
          }
        ],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "public readonly data: Partial<DataType>;"
          }
        ],
        "constructors": [
          "public constructor(data: Partial<DataType>) { this.data = data; }"
        ]
      },
      "MappedComponentTypes": {
        "kind": "interface",
        "source": "components/Components.ts",
        "methods": [],
        "properties": [
          {
            "name": "[ComponentType.ActionRow]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.ActionRow]: ActionRowBuilder<AnyComponentBuilder>;"
          },
          {
            "name": "[ComponentType.Button]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Button]: ButtonBuilder;"
          },
          {
            "name": "[ComponentType.StringSelect]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.StringSelect]: StringSelectMenuBuilder;"
          },
          {
            "name": "[ComponentType.TextInput]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.TextInput]: TextInputBuilder;"
          },
          {
            "name": "[ComponentType.UserSelect]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.UserSelect]: UserSelectMenuBuilder;"
          },
          {
            "name": "[ComponentType.RoleSelect]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.RoleSelect]: RoleSelectMenuBuilder;"
          },
          {
            "name": "[ComponentType.MentionableSelect]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.MentionableSelect]: MentionableSelectMenuBuilder;"
          },
          {
            "name": "[ComponentType.ChannelSelect]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.ChannelSelect]: ChannelSelectMenuBuilder;"
          },
          {
            "name": "[ComponentType.File]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.File]: FileBuilder;"
          },
          {
            "name": "[ComponentType.Separator]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Separator]: SeparatorBuilder;"
          },
          {
            "name": "[ComponentType.Container]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Container]: ContainerBuilder;"
          },
          {
            "name": "[ComponentType.TextDisplay]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.TextDisplay]: TextDisplayBuilder;"
          },
          {
            "name": "[ComponentType.Thumbnail]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Thumbnail]: ThumbnailBuilder;"
          },
          {
            "name": "[ComponentType.Section]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Section]: SectionBuilder;"
          },
          {
            "name": "[ComponentType.MediaGallery]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.MediaGallery]: MediaGalleryBuilder;"
          },
          {
            "name": "[ComponentType.Label]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Label]: LabelBuilder;"
          },
          {
            "name": "[ComponentType.FileUpload]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.FileUpload]: FileUploadBuilder;"
          },
          {
            "name": "[ComponentType.Checkbox]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.Checkbox]: CheckboxBuilder;"
          },
          {
            "name": "[ComponentType.CheckboxGroup]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.CheckboxGroup]: CheckboxGroupBuilder;"
          },
          {
            "name": "[ComponentType.RadioGroup]",
            "kind": "property",
            "static": false,
            "signature": "[ComponentType.RadioGroup]: RadioGroupBuilder;"
          }
        ],
        "constructors": []
      },
      "TextInputBuilder": {
        "kind": "class",
        "source": "components/textInput/TextInput.ts",
        "methods": [
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customIdValidator.parse(customId); return this; }"
          },
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { this.data.label = labelValidator.parse(label); return this; }"
          },
          {
            "name": "setStyle",
            "static": false,
            "signature": "public setStyle(style: TextInputStyle) { this.data.style = textInputStyleValidator.parse(style); return this; }"
          },
          {
            "name": "setMinLength",
            "static": false,
            "signature": "public setMinLength(minLength: number) { this.data.min_length = minLengthValidator.parse(minLength); return this; }"
          },
          {
            "name": "setMaxLength",
            "static": false,
            "signature": "public setMaxLength(maxLength: number) { this.data.max_length = maxLengthValidator.parse(maxLength); return this; }"
          },
          {
            "name": "setPlaceholder",
            "static": false,
            "signature": "public setPlaceholder(placeholder: string) { this.data.placeholder = placeholderValidator.parse(placeholder); return this; }"
          },
          {
            "name": "setValue",
            "static": false,
            "signature": "public setValue(value: string) { this.data.value = valueValidator.parse(value); return this; }"
          },
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required = true) { this.data.required = requiredValidator.parse(required); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APITextInputComponent { validateRequiredParameters(this.data.custom_id, this.data.style); return { ...this.data, } as APITextInputComponent; }"
          },
          {
            "name": "equals",
            "static": false,
            "signature": "public equals(other: APITextInputComponent | JSONEncodable<APITextInputComponent>): boolean { if (isJSONEncodable(other)) { return isEqual(other.toJSON(), this.data); } return isEqual(other, this.data); }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: APITextInputComponent & { type?: ComponentType.TextInput }) { super({ type: ComponentType.TextInput, ...data }); }"
        ]
      },
      "ModalBuilder": {
        "kind": "class",
        "source": "interactions/modals/Modal.ts",
        "methods": [
          {
            "name": "setTitle",
            "static": false,
            "signature": "public setTitle(title: string) { this.data.title = titleValidator.parse(title); return this; }"
          },
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customIdValidator.parse(customId); return this; }"
          },
          {
            "name": "addComponents",
            "static": false,
            "signature": "public addComponents( ...components: RestOrArray< | ActionRowBuilder<ModalActionRowComponentBuilder> | APIActionRowComponent<APIComponentInModalActionRow> | APILabelComponent | APITextDisplayComponent | APITextInputComponent | LabelBuilder | TextDisplayBuilder | TextInputBuilder > ) { this.components.push( ...normalizeArray(components).map((component, idx) => { if ( component instanceof ActionRowBuilder || component instanceof LabelBuilder || component instanceof TextDisplayBuilder ) { return component; } // Deprecated support if (component instanceof TextInputBuilder) { return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(component); } if ('type' in component) { if (component.type === ComponentType.ActionRow) { return new ActionRowBuilder<ModalActionRowComponentBuilder>(component); } if (component.type === ComponentType.Label) { return new LabelBuilder(component); } if (component.type === ComponentType.TextDisplay) { return new TextDisplayBuilder(component); } // Deprecated, should go in a label component if (component.type === ComponentType.TextInput) { return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents( new TextInputBuilder(component), ); } } throw new TypeError(`Invalid component passed in ModalBuilder.addComponents at index ${idx}!`); }), ); return this; }"
          },
          {
            "name": "addLabelComponents",
            "static": false,
            "signature": "public addLabelComponents( ...components: RestOrArray<APILabelComponent | LabelBuilder | ((builder: LabelBuilder) => LabelBuilder)> ) { const normalized = normalizeArray(components); const resolved = normalized.map((label) => resolveBuilder(label, LabelBuilder)); this.components.push(...resolved); return this; }"
          },
          {
            "name": "addTextDisplayComponents",
            "static": false,
            "signature": "public addTextDisplayComponents( ...components: RestOrArray< APITextDisplayComponent | TextDisplayBuilder | ((builder: TextDisplayBuilder) => TextDisplayBuilder) > ) { const normalized = normalizeArray(components); const resolved = normalized.map((row) => resolveBuilder(row, TextDisplayBuilder)); this.components.push(...resolved); return this; }"
          },
          {
            "name": "addActionRowComponents",
            "static": false,
            "signature": "public addActionRowComponents( ...components: RestOrArray< | ActionRowBuilder<ModalActionRowComponentBuilder> | APIActionRowComponent<APIComponentInModalActionRow> | (( builder: ActionRowBuilder<ModalActionRowComponentBuilder>, ) => ActionRowBuilder<ModalActionRowComponentBuilder>) > ) { const normalized = normalizeArray(components); const resolved = normalized.map((row) => resolveBuilder(row, ActionRowBuilder<ModalActionRowComponentBuilder>)); this.components.push(...resolved); return this; }"
          },
          {
            "name": "setLabelComponents",
            "static": false,
            "signature": "public setLabelComponents( ...components: RestOrArray<APILabelComponent | LabelBuilder | ((builder: LabelBuilder) => LabelBuilder)> ) { const normalized = normalizeArray(components); this.spliceLabelComponents(0, this.components.length, ...normalized); return this; }"
          },
          {
            "name": "spliceLabelComponents",
            "static": false,
            "signature": "public spliceLabelComponents( index: number, deleteCount: number, ...labels: (APILabelComponent | LabelBuilder | ((builder: LabelBuilder) => LabelBuilder))[] ): this { const resolved = labels.map((label) => resolveBuilder(label, LabelBuilder)); this.components.splice(index, deleteCount, ...resolved); return this; }"
          },
          {
            "name": "setComponents",
            "static": false,
            "signature": "public setComponents( ...components: RestOrArray<ActionRowBuilder<ModalActionRowComponentBuilder> | LabelBuilder | TextDisplayBuilder> ) { this.components.splice(0, this.components.length, ...normalizeArray(components)); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIModalInteractionResponseCallbackData { validateRequiredParameters(this.data.custom_id, this.data.title, this.components); return { ...this.data, components: this.components.map((component) => component.toJSON()), } as APIModalInteractionResponseCallbackData; }"
          }
        ],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "public readonly data: Partial<APIModalInteractionResponseCallbackData>;"
          },
          {
            "name": "components",
            "kind": "property",
            "static": false,
            "signature": "public readonly components: (ActionRowBuilder<ModalActionRowComponentBuilder> | LabelBuilder | TextDisplayBuilder)[] = [];"
          }
        ],
        "constructors": [
          "public constructor({ components, ...data }: Partial<APIModalInteractionResponseCallbackData> = {}) { this.data = { ...data }; this.components = (components?.map((component) => createComponentBuilder(component)) ?? []) as ( ActionRowBuilder<ModalActionRowComponentBuilder> | LabelBuilder )[]; }"
        ]
      },
      "BaseSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/BaseSelectMenu.ts",
        "methods": [
          {
            "name": "setPlaceholder",
            "static": false,
            "signature": "public setPlaceholder(placeholder: string) { this.data.placeholder = placeholderValidator.parse(placeholder); return this; }"
          },
          {
            "name": "setMinValues",
            "static": false,
            "signature": "public setMinValues(minValues: number) { this.data.min_values = minMaxValidator.parse(minValues); return this; }"
          },
          {
            "name": "setMaxValues",
            "static": false,
            "signature": "public setMaxValues(maxValues: number) { this.data.max_values = minMaxValidator.parse(maxValues); return this; }"
          },
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customIdValidator.parse(customId); return this; }"
          },
          {
            "name": "setDisabled",
            "static": false,
            "signature": "public setDisabled(disabled = true) { this.data.disabled = disabledValidator.parse(disabled); return this; }"
          },
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required = true) { this.data.required = requiredValidator.parse(required); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): SelectMenuType { customIdValidator.parse(this.data.custom_id); return { ...this.data, } as SelectMenuType; }"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "ChannelSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/ChannelSelectMenu.ts",
        "methods": [
          {
            "name": "addChannelTypes",
            "static": false,
            "signature": "public addChannelTypes(...types: RestOrArray<ChannelType>) { const normalizedTypes = normalizeArray(types); this.data.channel_types ??= []; this.data.channel_types.push(...channelTypesValidator.parse(normalizedTypes)); return this; }"
          },
          {
            "name": "setChannelTypes",
            "static": false,
            "signature": "public setChannelTypes(...types: RestOrArray<ChannelType>) { const normalizedTypes = normalizeArray(types); this.data.channel_types ??= []; this.data.channel_types.splice(0, this.data.channel_types.length, ...channelTypesValidator.parse(normalizedTypes)); return this; }"
          },
          {
            "name": "addDefaultChannels",
            "static": false,
            "signature": "public addDefaultChannels(...channels: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(channels); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push( ...normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.Channel as const, })), ); return this; }"
          },
          {
            "name": "setDefaultChannels",
            "static": false,
            "signature": "public setDefaultChannels(...channels: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(channels); optionsLengthValidator.parse(normalizedValues.length); this.data.default_values = normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.Channel as const, })); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APIChannelSelectComponent { customIdValidator.parse(this.data.custom_id); return { ...this.data, } as APIChannelSelectComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APIChannelSelectComponent>) { super({ ...data, type: ComponentType.ChannelSelect }); }"
        ]
      },
      "MentionableSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/MentionableSelectMenu.ts",
        "methods": [
          {
            "name": "addDefaultRoles",
            "static": false,
            "signature": "public addDefaultRoles(...roles: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(roles); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push( ...normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.Role as const, })), ); return this; }"
          },
          {
            "name": "addDefaultUsers",
            "static": false,
            "signature": "public addDefaultUsers(...users: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(users); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push( ...normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.User as const, })), ); return this; }"
          },
          {
            "name": "addDefaultValues",
            "static": false,
            "signature": "public addDefaultValues( ...values: RestOrArray< | APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role> | APISelectMenuDefaultValue<SelectMenuDefaultValueType.User> > ) { const normalizedValues = normalizeArray(values); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push(...normalizedValues); return this; }"
          },
          {
            "name": "setDefaultValues",
            "static": false,
            "signature": "public setDefaultValues( ...values: RestOrArray< | APISelectMenuDefaultValue<SelectMenuDefaultValueType.Role> | APISelectMenuDefaultValue<SelectMenuDefaultValueType.User> > ) { const normalizedValues = normalizeArray(values); optionsLengthValidator.parse(normalizedValues.length); this.data.default_values = normalizedValues; return this; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APIMentionableSelectComponent>) { super({ ...data, type: ComponentType.MentionableSelect }); }"
        ]
      },
      "RoleSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/RoleSelectMenu.ts",
        "methods": [
          {
            "name": "addDefaultRoles",
            "static": false,
            "signature": "public addDefaultRoles(...roles: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(roles); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push( ...normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.Role as const, })), ); return this; }"
          },
          {
            "name": "setDefaultRoles",
            "static": false,
            "signature": "public setDefaultRoles(...roles: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(roles); optionsLengthValidator.parse(normalizedValues.length); this.data.default_values = normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.Role as const, })); return this; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APIRoleSelectComponent>) { super({ ...data, type: ComponentType.RoleSelect }); }"
        ]
      },
      "StringSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/StringSelectMenu.ts",
        "methods": [
          {
            "name": "addOptions",
            "static": false,
            "signature": "public addOptions(...options: RestOrArray<APISelectMenuOption | StringSelectMenuOptionBuilder>) { const normalizedOptions = normalizeArray(options); optionsLengthValidator.parse(this.options.length + normalizedOptions.length); this.options.push( ...normalizedOptions.map((normalizedOption) => normalizedOption instanceof StringSelectMenuOptionBuilder ? normalizedOption : new StringSelectMenuOptionBuilder(selectMenuStringOptionPredicate.parse(normalizedOption)), ), ); return this; }"
          },
          {
            "name": "setOptions",
            "static": false,
            "signature": "public setOptions(...options: RestOrArray<APISelectMenuOption | StringSelectMenuOptionBuilder>) { return this.spliceOptions(0, this.options.length, ...options); }"
          },
          {
            "name": "spliceOptions",
            "static": false,
            "signature": "public spliceOptions( index: number, deleteCount: number, ...options: RestOrArray<APISelectMenuOption | StringSelectMenuOptionBuilder> ) { const normalizedOptions = normalizeArray(options); const clone = [...this.options]; clone.splice( index, deleteCount, ...normalizedOptions.map((normalizedOption) => normalizedOption instanceof StringSelectMenuOptionBuilder ? normalizedOption : new StringSelectMenuOptionBuilder(selectMenuStringOptionPredicate.parse(normalizedOption)), ), ); optionsLengthValidator.parse(clone.length); this.options.splice(0, this.options.length, ...clone); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APIStringSelectComponent { validateRequiredSelectMenuParameters(this.options, this.data.custom_id); return { ...this.data, options: this.options.map((option) => option.toJSON()), } as APIStringSelectComponent; }"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: StringSelectMenuOptionBuilder[];"
          }
        ],
        "constructors": [
          "public constructor(data?: Partial<APIStringSelectComponent>) { const { options, ...initData } = data ?? {}; super({ ...initData, type: ComponentType.StringSelect }); this.options = options?.map((option: APISelectMenuOption) => new StringSelectMenuOptionBuilder(option)) ?? []; }"
        ]
      },
      "StringSelectMenuOptionBuilder": {
        "kind": "class",
        "source": "components/selectMenu/StringSelectMenuOption.ts",
        "methods": [
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { this.data.label = labelValueDescriptionValidator.parse(label); return this; }"
          },
          {
            "name": "setValue",
            "static": false,
            "signature": "public setValue(value: string) { this.data.value = labelValueDescriptionValidator.parse(value); return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = labelValueDescriptionValidator.parse(description); return this; }"
          },
          {
            "name": "setDefault",
            "static": false,
            "signature": "public setDefault(isDefault = true) { this.data.default = defaultValidator.parse(isDefault); return this; }"
          },
          {
            "name": "setEmoji",
            "static": false,
            "signature": "public setEmoji(emoji: APIMessageComponentEmoji) { this.data.emoji = emojiValidator.parse(emoji); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APISelectMenuOption { validateRequiredSelectMenuOptionParameters(this.data.label, this.data.value); return { ...this.data, } as APISelectMenuOption; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(public data: Partial<APISelectMenuOption> = {}) {}"
        ]
      },
      "UserSelectMenuBuilder": {
        "kind": "class",
        "source": "components/selectMenu/UserSelectMenu.ts",
        "methods": [
          {
            "name": "addDefaultUsers",
            "static": false,
            "signature": "public addDefaultUsers(...users: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(users); optionsLengthValidator.parse((this.data.default_values?.length ?? 0) + normalizedValues.length); this.data.default_values ??= []; this.data.default_values.push( ...normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.User as const, })), ); return this; }"
          },
          {
            "name": "setDefaultUsers",
            "static": false,
            "signature": "public setDefaultUsers(...users: RestOrArray<Snowflake>) { const normalizedValues = normalizeArray(users); optionsLengthValidator.parse(normalizedValues.length); this.data.default_values = normalizedValues.map((id) => ({ id, type: SelectMenuDefaultValueType.User as const, })); return this; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APIUserSelectComponent>) { super({ ...data, type: ComponentType.UserSelect }); }"
        ]
      },
      "FileUploadBuilder": {
        "kind": "class",
        "source": "components/fileUpload/FileUpload.ts",
        "methods": [
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customId; return this; }"
          },
          {
            "name": "setMinValues",
            "static": false,
            "signature": "public setMinValues(minValues: number) { this.data.min_values = minValues; return this; }"
          },
          {
            "name": "clearMinValues",
            "static": false,
            "signature": "public clearMinValues() { this.data.min_values = undefined; return this; }"
          },
          {
            "name": "setMaxValues",
            "static": false,
            "signature": "public setMaxValues(maxValues: number) { this.data.max_values = maxValues; return this; }"
          },
          {
            "name": "clearMaxValues",
            "static": false,
            "signature": "public clearMaxValues() { this.data.max_values = undefined; return this; }"
          },
          {
            "name": "addFileTypes",
            "static": false,
            "signature": "public addFileTypes(...fileTypes: RestOrArray<FileUploadType>) { this.data.file_types ??= []; this.data.file_types.push(...normalizeArray(fileTypes)); return this; }"
          },
          {
            "name": "setFileTypes",
            "static": false,
            "signature": "public setFileTypes(...fileTypes: RestOrArray<FileUploadType>) { this.data.file_types = normalizeArray(fileTypes); return this; }"
          },
          {
            "name": "clearFileTypes",
            "static": false,
            "signature": "public clearFileTypes() { this.data.file_types = undefined; return this; }"
          },
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required = true) { this.data.required = required; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIFileUploadComponent { fileUploadPredicate.parse(this.data); return this.data as APIFileUploadComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data: Partial<APIFileUploadComponent> = {}) { super({ type: ComponentType.FileUpload, ...data }); }"
        ]
      },
      "LabelBuilderData": {
        "kind": "interface",
        "source": "components/label/Label.ts",
        "methods": [],
        "properties": [
          {
            "name": "component",
            "kind": "property",
            "static": false,
            "signature": "component?: | ChannelSelectMenuBuilder | CheckboxBuilder | CheckboxGroupBuilder | FileUploadBuilder | MentionableSelectMenuBuilder | RadioGroupBuilder | RoleSelectMenuBuilder | StringSelectMenuBuilder | TextInputBuilder | UserSelectMenuBuilder;"
          }
        ],
        "constructors": []
      },
      "LabelBuilder": {
        "kind": "class",
        "source": "components/label/Label.ts",
        "methods": [
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { this.data.label = label; return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = description; return this; }"
          },
          {
            "name": "clearDescription",
            "static": false,
            "signature": "public clearDescription() { this.data.description = undefined; return this; }"
          },
          {
            "name": "setStringSelectMenuComponent",
            "static": false,
            "signature": "public setStringSelectMenuComponent( input: | APIStringSelectComponent | StringSelectMenuBuilder | ((builder: StringSelectMenuBuilder) => StringSelectMenuBuilder), ): this { this.data.component = resolveBuilder(input, StringSelectMenuBuilder); return this; }"
          },
          {
            "name": "setUserSelectMenuComponent",
            "static": false,
            "signature": "public setUserSelectMenuComponent( input: APIUserSelectComponent | UserSelectMenuBuilder | ((builder: UserSelectMenuBuilder) => UserSelectMenuBuilder), ): this { this.data.component = resolveBuilder(input, UserSelectMenuBuilder); return this; }"
          },
          {
            "name": "setRoleSelectMenuComponent",
            "static": false,
            "signature": "public setRoleSelectMenuComponent( input: APIRoleSelectComponent | RoleSelectMenuBuilder | ((builder: RoleSelectMenuBuilder) => RoleSelectMenuBuilder), ): this { this.data.component = resolveBuilder(input, RoleSelectMenuBuilder); return this; }"
          },
          {
            "name": "setMentionableSelectMenuComponent",
            "static": false,
            "signature": "public setMentionableSelectMenuComponent( input: | APIMentionableSelectComponent | MentionableSelectMenuBuilder | ((builder: MentionableSelectMenuBuilder) => MentionableSelectMenuBuilder), ): this { this.data.component = resolveBuilder(input, MentionableSelectMenuBuilder); return this; }"
          },
          {
            "name": "setChannelSelectMenuComponent",
            "static": false,
            "signature": "public setChannelSelectMenuComponent( input: | APIChannelSelectComponent | ChannelSelectMenuBuilder | ((builder: ChannelSelectMenuBuilder) => ChannelSelectMenuBuilder), ): this { this.data.component = resolveBuilder(input, ChannelSelectMenuBuilder); return this; }"
          },
          {
            "name": "setTextInputComponent",
            "static": false,
            "signature": "public setTextInputComponent( input: APITextInputComponent | TextInputBuilder | ((builder: TextInputBuilder) => TextInputBuilder), ): this { this.data.component = resolveBuilder(input, TextInputBuilder); return this; }"
          },
          {
            "name": "setFileUploadComponent",
            "static": false,
            "signature": "public setFileUploadComponent( input: APIFileUploadComponent | FileUploadBuilder | ((builder: FileUploadBuilder) => FileUploadBuilder), ): this { this.data.component = resolveBuilder(input, FileUploadBuilder); return this; }"
          },
          {
            "name": "setCheckboxComponent",
            "static": false,
            "signature": "public setCheckboxComponent( input: APICheckboxComponent | CheckboxBuilder | ((builder: CheckboxBuilder) => CheckboxBuilder), ): this { this.data.component = resolveBuilder(input, CheckboxBuilder); return this; }"
          },
          {
            "name": "setCheckboxGroupComponent",
            "static": false,
            "signature": "public setCheckboxGroupComponent( input: APICheckboxGroupComponent | CheckboxGroupBuilder | ((builder: CheckboxGroupBuilder) => CheckboxGroupBuilder), ): this { this.data.component = resolveBuilder(input, CheckboxGroupBuilder); return this; }"
          },
          {
            "name": "setRadioGroupComponent",
            "static": false,
            "signature": "public setRadioGroupComponent( input: APIRadioGroupComponent | RadioGroupBuilder | ((builder: RadioGroupBuilder) => RadioGroupBuilder), ): this { this.data.component = resolveBuilder(input, RadioGroupBuilder); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APILabelComponent { const { component, ...rest } = this.data; const data = { ...rest, // The label predicate validates the component. component: component?.toJSON(), }; labelPredicate.parse(data); return data as APILabelComponent; }"
          }
        ],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "public override readonly data: LabelBuilderData;"
          }
        ],
        "constructors": [
          "public constructor(data: Partial<APILabelComponent> = {}) { super({ type: ComponentType.Label }); const { component, ...rest } = data; this.data = { ...rest, component: component ? createComponentBuilder(component) : undefined, type: ComponentType.Label, }; }"
        ]
      },
      "ContainerBuilder": {
        "kind": "class",
        "source": "components/v2/Container.ts",
        "methods": [
          {
            "name": "setAccentColor",
            "static": false,
            "signature": "public setAccentColor(color?: RGBTuple | number): this { // Data assertions containerColorPredicate.parse(color); if (Array.isArray(color)) { const [red, green, blue] = color; this.data.accent_color = (red << 16) + (green << 8) + blue; return this; } this.data.accent_color = color; return this; }"
          },
          {
            "name": "clearAccentColor",
            "static": false,
            "signature": "public clearAccentColor() { this.data.accent_color = undefined; return this; }"
          },
          {
            "name": "addActionRowComponents",
            "static": false,
            "signature": "public addActionRowComponents<ComponentType extends MessageActionRowComponentBuilder>( ...components: RestOrArray< | ActionRowBuilder<ComponentType> | APIActionRowComponent<APIComponentInMessageActionRow> | ((builder: ActionRowBuilder<ComponentType>) => ActionRowBuilder<ComponentType>) > ) { this.components.push( ...normalizeArray(components).map((component) => resolveBuilder(component, ActionRowBuilder<ComponentType>)), ); return this; }"
          },
          {
            "name": "addFileComponents",
            "static": false,
            "signature": "public addFileComponents( ...components: RestOrArray<APIFileComponent | FileBuilder | ((builder: FileBuilder) => FileBuilder)> ) { this.components.push(...normalizeArray(components).map((component) => resolveBuilder(component, FileBuilder))); return this; }"
          },
          {
            "name": "addMediaGalleryComponents",
            "static": false,
            "signature": "public addMediaGalleryComponents( ...components: RestOrArray< APIMediaGalleryComponent | MediaGalleryBuilder | ((builder: MediaGalleryBuilder) => MediaGalleryBuilder) > ) { this.components.push( ...normalizeArray(components).map((component) => resolveBuilder(component, MediaGalleryBuilder)), ); return this; }"
          },
          {
            "name": "addSectionComponents",
            "static": false,
            "signature": "public addSectionComponents( ...components: RestOrArray<APISectionComponent | SectionBuilder | ((builder: SectionBuilder) => SectionBuilder)> ) { this.components.push(...normalizeArray(components).map((component) => resolveBuilder(component, SectionBuilder))); return this; }"
          },
          {
            "name": "addSeparatorComponents",
            "static": false,
            "signature": "public addSeparatorComponents( ...components: RestOrArray< APISeparatorComponent | SeparatorBuilder | ((builder: SeparatorBuilder) => SeparatorBuilder) > ) { this.components.push(...normalizeArray(components).map((component) => resolveBuilder(component, SeparatorBuilder))); return this; }"
          },
          {
            "name": "addTextDisplayComponents",
            "static": false,
            "signature": "public addTextDisplayComponents( ...components: RestOrArray< APITextDisplayComponent | TextDisplayBuilder | ((builder: TextDisplayBuilder) => TextDisplayBuilder) > ) { this.components.push( ...normalizeArray(components).map((component) => resolveBuilder(component, TextDisplayBuilder)), ); return this; }"
          },
          {
            "name": "spliceComponents",
            "static": false,
            "signature": "public spliceComponents( index: number, deleteCount: number, ...components: RestOrArray<APIComponentInContainer | ContainerComponentBuilder> ) { this.components.splice( index, deleteCount, ...normalizeArray(components).map((component) => component instanceof ComponentBuilder ? component : createComponentBuilder(component), ), ); return this; }"
          },
          {
            "name": "setSpoiler",
            "static": false,
            "signature": "public setSpoiler(spoiler = true) { this.data.spoiler = spoilerPredicate.parse(spoiler); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIContainerComponent { return { ...this.data, components: this.components.map((component) => component.toJSON()), } as APIContainerComponent; }"
          }
        ],
        "properties": [
          {
            "name": "components",
            "kind": "property",
            "static": false,
            "signature": "public readonly components: ContainerComponentBuilder[];"
          }
        ],
        "constructors": [
          "public constructor({ components, ...data }: Partial<APIContainerComponent> = {}) { super({ type: ComponentType.Container, ...data }); this.components = (components?.map((component) => createComponentBuilder(component)) ?? []) as ContainerComponentBuilder[]; }"
        ]
      },
      "FileBuilder": {
        "kind": "class",
        "source": "components/v2/File.ts",
        "methods": [
          {
            "name": "setSpoiler",
            "static": false,
            "signature": "public setSpoiler(spoiler = true) { this.data.spoiler = spoilerPredicate.parse(spoiler); return this; }"
          },
          {
            "name": "setURL",
            "static": false,
            "signature": "public setURL(url: string) { this.data.file = filePredicate.parse({ url }); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APIFileComponent { filePredicate.parse(this.data.file); return { ...this.data, file: { ...this.data.file } } as APIFileComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data: Partial<APIFileComponent> = {}) { super({ type: ComponentType.File, ...data, file: data.file ? { url: data.file.url } : undefined }); }"
        ]
      },
      "MediaGalleryBuilder": {
        "kind": "class",
        "source": "components/v2/MediaGallery.ts",
        "methods": [
          {
            "name": "addItems",
            "static": false,
            "signature": "public addItems( ...items: RestOrArray< APIMediaGalleryItem | MediaGalleryItemBuilder | ((builder: MediaGalleryItemBuilder) => MediaGalleryItemBuilder) > ) { this.items.push( ...normalizeArray(items).map((input) => { const result = resolveBuilder(input, MediaGalleryItemBuilder); assertReturnOfBuilder(result, MediaGalleryItemBuilder); return result; }), ); return this; }"
          },
          {
            "name": "spliceItems",
            "static": false,
            "signature": "public spliceItems( index: number, deleteCount: number, ...items: RestOrArray< APIMediaGalleryItem | MediaGalleryItemBuilder | ((builder: MediaGalleryItemBuilder) => MediaGalleryItemBuilder) > ) { this.items.splice( index, deleteCount, ...normalizeArray(items).map((input) => { const result = resolveBuilder(input, MediaGalleryItemBuilder); assertReturnOfBuilder(result, MediaGalleryItemBuilder); return result; }), ); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIMediaGalleryComponent { validateComponentArray(this.items, 1, 10, MediaGalleryItemBuilder); return { ...this.data, items: this.items.map((item) => item.toJSON()), } as APIMediaGalleryComponent; }"
          }
        ],
        "properties": [
          {
            "name": "items",
            "kind": "property",
            "static": false,
            "signature": "public readonly items: MediaGalleryItemBuilder[];"
          }
        ],
        "constructors": [
          "public constructor({ items, ...data }: Partial<APIMediaGalleryComponent> = {}) { super({ type: ComponentType.MediaGallery, ...data }); this.items = items?.map((item) => new MediaGalleryItemBuilder(item)) ?? []; }"
        ]
      },
      "MediaGalleryItemBuilder": {
        "kind": "class",
        "source": "components/v2/MediaGalleryItem.ts",
        "methods": [
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = descriptionPredicate.parse(description); return this; }"
          },
          {
            "name": "clearDescription",
            "static": false,
            "signature": "public clearDescription() { this.data.description = undefined; return this; }"
          },
          {
            "name": "setSpoiler",
            "static": false,
            "signature": "public setSpoiler(spoiler = true) { this.data.spoiler = spoilerPredicate.parse(spoiler); return this; }"
          },
          {
            "name": "setURL",
            "static": false,
            "signature": "public setURL(url: string) { this.data.media = unfurledMediaItemPredicate.parse({ url }); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIMediaGalleryItem { unfurledMediaItemPredicate.parse(this.data.media); return { ...this.data } as APIMediaGalleryItem; }"
          }
        ],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "public readonly data: Partial<APIMediaGalleryItem>;"
          }
        ],
        "constructors": [
          "public constructor(data: Partial<APIMediaGalleryItem> = {}) { this.data = data; }"
        ]
      },
      "SectionBuilder": {
        "kind": "class",
        "source": "components/v2/Section.ts",
        "methods": [
          {
            "name": "setButtonAccessory",
            "static": false,
            "signature": "public setButtonAccessory( accessory: APIButtonComponent | ButtonBuilder | ((builder: ButtonBuilder) => ButtonBuilder), ): this { Reflect.set(this, 'accessory', accessoryPredicate.parse(resolveBuilder(accessory, ButtonBuilder))); return this; }"
          },
          {
            "name": "setThumbnailAccessory",
            "static": false,
            "signature": "public setThumbnailAccessory( accessory: APIThumbnailComponent | ThumbnailBuilder | ((builder: ThumbnailBuilder) => ThumbnailBuilder), ): this { Reflect.set(this, 'accessory', accessoryPredicate.parse(resolveBuilder(accessory, ThumbnailBuilder))); return this; }"
          },
          {
            "name": "addTextDisplayComponents",
            "static": false,
            "signature": "public addTextDisplayComponents( ...components: RestOrArray<TextDisplayBuilder | ((builder: TextDisplayBuilder) => TextDisplayBuilder)> ) { this.components.push( ...normalizeArray(components).map((input) => { const result = resolveBuilder(input, TextDisplayBuilder); assertReturnOfBuilder(result, TextDisplayBuilder); return result; }), ); return this; }"
          },
          {
            "name": "spliceTextDisplayComponents",
            "static": false,
            "signature": "public spliceTextDisplayComponents( index: number, deleteCount: number, ...components: RestOrArray< APITextDisplayComponent | TextDisplayBuilder | ((builder: TextDisplayBuilder) => TextDisplayBuilder) > ) { this.components.splice( index, deleteCount, ...normalizeArray(components).map((input) => { const result = resolveBuilder(input, TextDisplayBuilder); assertReturnOfBuilder(result, TextDisplayBuilder); return result; }), ); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APISectionComponent { validateComponentArray(this.components, 1, 3, TextDisplayBuilder); return { ...this.data, components: this.components.map((component) => component.toJSON()), accessory: accessoryPredicate.parse(this.accessory).toJSON(), } as APISectionComponent; }"
          }
        ],
        "properties": [
          {
            "name": "components",
            "kind": "property",
            "static": false,
            "signature": "public readonly components: ComponentBuilder[];"
          },
          {
            "name": "accessory",
            "kind": "property",
            "static": false,
            "signature": "public readonly accessory?: ButtonBuilder | ThumbnailBuilder;"
          }
        ],
        "constructors": [
          "public constructor({ components, accessory, ...data }: Partial<APISectionComponent> = {}) { super({ type: ComponentType.Section, ...data }); this.components = (components?.map((component) => createComponentBuilder(component)) ?? []) as ComponentBuilder[]; this.accessory = accessory ? createComponentBuilder(accessory) : undefined; }"
        ]
      },
      "SeparatorBuilder": {
        "kind": "class",
        "source": "components/v2/Separator.ts",
        "methods": [
          {
            "name": "setDivider",
            "static": false,
            "signature": "public setDivider(divider = true) { this.data.divider = dividerPredicate.parse(divider); return this; }"
          },
          {
            "name": "setSpacing",
            "static": false,
            "signature": "public setSpacing(spacing: SeparatorSpacingSize) { this.data.spacing = spacingPredicate.parse(spacing); return this; }"
          },
          {
            "name": "clearSpacing",
            "static": false,
            "signature": "public clearSpacing() { this.data.spacing = undefined; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APISeparatorComponent { return { ...this.data } as APISeparatorComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data: Partial<APISeparatorComponent> = {}) { super({ type: ComponentType.Separator, ...data, }); }"
        ]
      },
      "TextDisplayBuilder": {
        "kind": "class",
        "source": "components/v2/TextDisplay.ts",
        "methods": [
          {
            "name": "setContent",
            "static": false,
            "signature": "public setContent(content: string) { this.data.content = textDisplayContentPredicate.parse(content); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APITextDisplayComponent { textDisplayContentPredicate.parse(this.data.content); return { ...this.data } as APITextDisplayComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data: Partial<APITextDisplayComponent> = {}) { super({ type: ComponentType.TextDisplay, ...data, }); }"
        ]
      },
      "ThumbnailBuilder": {
        "kind": "class",
        "source": "components/v2/Thumbnail.ts",
        "methods": [
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = descriptionPredicate.parse(description); return this; }"
          },
          {
            "name": "clearDescription",
            "static": false,
            "signature": "public clearDescription() { this.data.description = undefined; return this; }"
          },
          {
            "name": "setSpoiler",
            "static": false,
            "signature": "public setSpoiler(spoiler = true) { this.data.spoiler = spoilerPredicate.parse(spoiler); return this; }"
          },
          {
            "name": "setURL",
            "static": false,
            "signature": "public setURL(url: string) { this.data.media = unfurledMediaItemPredicate.parse({ url }); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APIThumbnailComponent { unfurledMediaItemPredicate.parse(this.data.media); return { ...this.data } as APIThumbnailComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data: Partial<APIThumbnailComponent> = {}) { super({ type: ComponentType.Thumbnail, ...data, media: data.media ? { url: data.media.url } : undefined, }); }"
        ]
      },
      "CheckboxBuilder": {
        "kind": "class",
        "source": "components/checkbox/Checkbox.ts",
        "methods": [
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customId; return this; }"
          },
          {
            "name": "setDefault",
            "static": false,
            "signature": "public setDefault(isDefault: boolean) { this.data.default = isDefault; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APICheckboxComponent { checkboxPredicate.parse(this.data); return { ...this.data, } as APICheckboxComponent; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(data?: Partial<APICheckboxComponent>) { super({ type: ComponentType.Checkbox, ...data }); }"
        ]
      },
      "CheckboxGroupBuilder": {
        "kind": "class",
        "source": "components/checkbox/CheckboxGroup.ts",
        "methods": [
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customId; return this; }"
          },
          {
            "name": "addOptions",
            "static": false,
            "signature": "public addOptions(...options: RestOrArray<APICheckboxGroupOption | CheckboxGroupOptionBuilder>) { const normalizedOptions = normalizeArray(options); this.options.push( ...normalizedOptions.map((normalizedOption) => { // I do this because TS' duck typing causes issues, // if I put in a RadioGroupOption, TS lets it pass but // it fails to convert to a checkbox group option at runtime const json = 'toJSON' in normalizedOption ? normalizedOption.toJSON() : normalizedOption; const option = new CheckboxGroupOptionBuilder(json); checkboxGroupOptionPredicate.parse(option.toJSON()); return option; }), ); return this; }"
          },
          {
            "name": "setOptions",
            "static": false,
            "signature": "public setOptions(...options: RestOrArray<APICheckboxGroupOption | CheckboxGroupOptionBuilder>) { return this.spliceOptions(0, this.options.length, ...options); }"
          },
          {
            "name": "spliceOptions",
            "static": false,
            "signature": "public spliceOptions( index: number, deleteCount: number, ...options: RestOrArray<APICheckboxGroupOption | CheckboxGroupOptionBuilder> ) { const normalizedOptions = normalizeArray(options); const clone = [...this.options]; clone.splice( index, deleteCount, ...normalizedOptions.map((normalizedOption) => { // I do this because TS' duck typing causes issues, // if I put in a RadioGroupOption, TS lets it pass but // it fails to convert to a checkbox group option at runtime const json = 'toJSON' in normalizedOption ? normalizedOption.toJSON() : normalizedOption; const option = new CheckboxGroupOptionBuilder(json); checkboxGroupOptionPredicate.parse(option.toJSON()); return option; }), ); this.options.splice(0, this.options.length, ...clone); return this; }"
          },
          {
            "name": "setMinValues",
            "static": false,
            "signature": "public setMinValues(minValues: number) { this.data.min_values = minValues; return this; }"
          },
          {
            "name": "setMaxValues",
            "static": false,
            "signature": "public setMaxValues(maxValues: number) { this.data.max_values = maxValues; return this; }"
          },
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required: boolean) { this.data.required = required; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APICheckboxGroupComponent { const data = { ...this.data, options: this.options.map((option) => option.toJSON()), }; checkboxGroupPredicate.parse(data); return data as APICheckboxGroupComponent; }"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: CheckboxGroupOptionBuilder[];"
          }
        ],
        "constructors": [
          "public constructor(data?: Partial<APICheckboxGroupComponent>) { const { options, ...initData } = data ?? {}; super({ ...initData, type: ComponentType.CheckboxGroup }); this.options = options?.map((option: APICheckboxGroupOption) => new CheckboxGroupOptionBuilder(option)) ?? []; }"
        ]
      },
      "CheckboxGroupOptionBuilder": {
        "kind": "class",
        "source": "components/checkbox/CheckboxGroupOption.ts",
        "methods": [
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { this.data.label = label; return this; }"
          },
          {
            "name": "setValue",
            "static": false,
            "signature": "public setValue(value: string) { this.data.value = value; return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = description; return this; }"
          },
          {
            "name": "setDefault",
            "static": false,
            "signature": "public setDefault(isDefault: boolean) { this.data.default = isDefault; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APICheckboxGroupOption { checkboxGroupOptionPredicate.parse(this.data); return { ...this.data, } as APICheckboxGroupOption; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(public data: Partial<APICheckboxGroupOption> = {}) {}"
        ]
      },
      "RadioGroupBuilder": {
        "kind": "class",
        "source": "components/checkbox/RadioGroup.ts",
        "methods": [
          {
            "name": "setCustomId",
            "static": false,
            "signature": "public setCustomId(customId: string) { this.data.custom_id = customId; return this; }"
          },
          {
            "name": "addOptions",
            "static": false,
            "signature": "public addOptions(...options: RestOrArray<APIRadioGroupOption | RadioGroupOptionBuilder>) { const normalizedOptions = normalizeArray(options); this.options.push( ...normalizedOptions.map((normalizedOption) => { // I do this because TS' duck typing causes issues, // if I put in a CheckboxGroupOption, TS lets it pass but // it fails to convert to a checkbox group option at runtime const json = 'toJSON' in normalizedOption ? normalizedOption.toJSON() : normalizedOption; const option = new RadioGroupOptionBuilder(json); radioGroupOptionPredicate.parse(option.toJSON()); return option; }), ); return this; }"
          },
          {
            "name": "setOptions",
            "static": false,
            "signature": "public setOptions(...options: RestOrArray<APIRadioGroupOption | RadioGroupOptionBuilder>) { return this.spliceOptions(0, this.options.length, ...options); }"
          },
          {
            "name": "spliceOptions",
            "static": false,
            "signature": "public spliceOptions( index: number, deleteCount: number, ...options: RestOrArray<APIRadioGroupOption | RadioGroupOptionBuilder> ) { const normalizedOptions = normalizeArray(options); const clone = [...this.options]; clone.splice( index, deleteCount, ...normalizedOptions.map((normalizedOption) => { // I do this because TS' duck typing causes issues, // if I put in a CheckboxGroupOption, TS lets it pass but // it fails to convert to a radio group option at runtime const json = 'toJSON' in normalizedOption ? normalizedOption.toJSON() : normalizedOption; const option = new RadioGroupOptionBuilder(json); radioGroupOptionPredicate.parse(option.toJSON()); return option; }), ); this.options.splice(0, this.options.length, ...clone); return this; }"
          },
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required: boolean) { this.data.required = required; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public override toJSON(): APIRadioGroupComponent { const data = { ...this.data, options: this.options.map((option) => option.toJSON()), }; radioGroupPredicate.parse(data); return data as APIRadioGroupComponent; }"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: RadioGroupOptionBuilder[];"
          }
        ],
        "constructors": [
          "public constructor(data?: Partial<APIRadioGroupComponent>) { const { options, ...initData } = data ?? {}; super({ ...initData, type: ComponentType.RadioGroup }); this.options = options?.map((option: APIRadioGroupOption) => new RadioGroupOptionBuilder(option)) ?? []; }"
        ]
      },
      "RadioGroupOptionBuilder": {
        "kind": "class",
        "source": "components/checkbox/RadioGroupOption.ts",
        "methods": [
          {
            "name": "setLabel",
            "static": false,
            "signature": "public setLabel(label: string) { this.data.label = label; return this; }"
          },
          {
            "name": "setValue",
            "static": false,
            "signature": "public setValue(value: string) { this.data.value = value; return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { this.data.description = description; return this; }"
          },
          {
            "name": "setDefault",
            "static": false,
            "signature": "public setDefault(isDefault: boolean) { this.data.default = isDefault; return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIRadioGroupOption { radioGroupOptionPredicate.parse(this.data); return { ...this.data, } as APIRadioGroupOption; }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(public data: Partial<APIRadioGroupOption> = {}) {}"
        ]
      },
      "SlashCommandBuilder": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandBuilder.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandSubcommandsOnlyBuilder": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandBuilder.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandOptionsOnlyBuilder": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandBuilder.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "ToAPIApplicationCommandOptions": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandBuilder.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "toJSON(): APIApplicationCommandOption;"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "SlashCommandSubcommandGroupBuilder": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandSubcommands.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandSubcommandBuilder": {
        "kind": "interface",
        "source": "interactions/slashCommands/SlashCommandSubcommands.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandBooleanOption": {
        "kind": "class",
        "source": "interactions/slashCommands/options/boolean.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIApplicationCommandBooleanOption { this.runRequiredValidations(); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type = ApplicationCommandOptionType.Boolean as const;"
          }
        ],
        "constructors": []
      },
      "SlashCommandChannelOption": {
        "kind": "interface",
        "source": "interactions/slashCommands/options/channel.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandIntegerOption": {
        "kind": "interface",
        "source": "interactions/slashCommands/options/integer.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandMentionableOption": {
        "kind": "class",
        "source": "interactions/slashCommands/options/mentionable.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIApplicationCommandMentionableOption { this.runRequiredValidations(); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type = ApplicationCommandOptionType.Mentionable as const;"
          }
        ],
        "constructors": []
      },
      "SlashCommandNumberOption": {
        "kind": "interface",
        "source": "interactions/slashCommands/options/number.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandRoleOption": {
        "kind": "class",
        "source": "interactions/slashCommands/options/role.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIApplicationCommandRoleOption { this.runRequiredValidations(); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public override readonly type = ApplicationCommandOptionType.Role as const;"
          }
        ],
        "constructors": []
      },
      "SlashCommandAttachmentOption": {
        "kind": "class",
        "source": "interactions/slashCommands/options/attachment.ts",
        "methods": [
          {
            "name": "addFileTypes",
            "static": false,
            "signature": "public addFileTypes(...fileTypes: RestOrArray<FileUploadType>) { const normalizedFileTypes = normalizeArray(fileTypes); fileUploadTypesValidator.parse([...(this.file_types ?? []), ...normalizedFileTypes]); if (this.file_types === undefined) { Reflect.set(this, 'file_types', []); } this.file_types!.push(...normalizedFileTypes); return this; }"
          },
          {
            "name": "setFileTypes",
            "static": false,
            "signature": "public setFileTypes(...fileTypes: RestOrArray<FileUploadType>) { const normalizedFileTypes = normalizeArray(fileTypes); fileUploadTypesValidator.parse(normalizedFileTypes); Reflect.set(this, 'file_types', normalizedFileTypes); return this; }"
          },
          {
            "name": "clearFileTypes",
            "static": false,
            "signature": "public clearFileTypes() { Reflect.set(this, 'file_types', undefined); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIApplicationCommandAttachmentOption { this.runRequiredValidations(); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public override readonly type = ApplicationCommandOptionType.Attachment as const;"
          },
          {
            "name": "file_types",
            "kind": "property",
            "static": false,
            "signature": "public readonly file_types?: FileUploadType[];"
          }
        ],
        "constructors": []
      },
      "SlashCommandStringOption": {
        "kind": "interface",
        "source": "interactions/slashCommands/options/string.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "SlashCommandUserOption": {
        "kind": "class",
        "source": "interactions/slashCommands/options/user.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): APIApplicationCommandUserOption { this.runRequiredValidations(); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type = ApplicationCommandOptionType.User as const;"
          }
        ],
        "constructors": []
      },
      "ApplicationCommandNumericOptionMinMaxValueMixin": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/ApplicationCommandNumericOptionMinMaxValueMixin.ts",
        "methods": [
          {
            "name": "setMaxValue",
            "static": false,
            "signature": "public abstract setMaxValue(max: number): this;"
          },
          {
            "name": "setMinValue",
            "static": false,
            "signature": "public abstract setMinValue(min: number): this;"
          }
        ],
        "properties": [
          {
            "name": "max_value",
            "kind": "property",
            "static": false,
            "signature": "public readonly max_value?: number;"
          },
          {
            "name": "min_value",
            "kind": "property",
            "static": false,
            "signature": "public readonly min_value?: number;"
          }
        ],
        "constructors": []
      },
      "ApplicationCommandOptionBase": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/ApplicationCommandOptionBase.ts",
        "methods": [
          {
            "name": "setRequired",
            "static": false,
            "signature": "public setRequired(required: boolean) { // Assert that you actually passed a boolean validateRequired(required); Reflect.set(this, 'required', required); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public abstract toJSON(): APIApplicationCommandBasicOption;"
          }
        ],
        "properties": [
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public abstract readonly type: ApplicationCommandOptionType;"
          },
          {
            "name": "required",
            "kind": "property",
            "static": false,
            "signature": "public readonly required: boolean = false;"
          }
        ],
        "constructors": []
      },
      "ApplicationCommandOptionChannelTypesMixin": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/ApplicationCommandOptionChannelTypesMixin.ts",
        "methods": [
          {
            "name": "addChannelTypes",
            "static": false,
            "signature": "public addChannelTypes(...channelTypes: RestOrArray<ApplicationCommandOptionAllowedChannelTypes>) { if (this.channel_types === undefined) { Reflect.set(this, 'channel_types', []); } this.channel_types!.push(...channelTypesPredicate.parse(normalizeArray(channelTypes))); return this; }"
          }
        ],
        "properties": [
          {
            "name": "channel_types",
            "kind": "property",
            "static": false,
            "signature": "public readonly channel_types?: ApplicationCommandOptionAllowedChannelTypes[];"
          }
        ],
        "constructors": []
      },
      "ApplicationCommandOptionWithAutocompleteMixin": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/ApplicationCommandOptionWithAutocompleteMixin.ts",
        "methods": [
          {
            "name": "setAutocomplete",
            "static": false,
            "signature": "public setAutocomplete(autocomplete: boolean): this { // Assert that you actually passed a boolean booleanPredicate.parse(autocomplete); if (autocomplete && 'choices' in this && Array.isArray(this.choices) && this.choices.length > 0) { throw new RangeError('Autocomplete and choices are mutually exclusive to each other.'); } Reflect.set(this, 'autocomplete', autocomplete); return this; }"
          }
        ],
        "properties": [
          {
            "name": "autocomplete",
            "kind": "property",
            "static": false,
            "signature": "public readonly autocomplete?: boolean;"
          },
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type!: ApplicationCommandOptionType;"
          }
        ],
        "constructors": []
      },
      "ApplicationCommandOptionWithChoicesMixin": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/ApplicationCommandOptionWithChoicesMixin.ts",
        "methods": [
          {
            "name": "addChoices",
            "static": false,
            "signature": "public addChoices(...choices: RestOrArray<APIApplicationCommandOptionChoice<ChoiceType>>): this { const normalizedChoices = normalizeArray(choices); if (normalizedChoices.length > 0 && 'autocomplete' in this && this.autocomplete) { throw new RangeError('Autocomplete and choices are mutually exclusive to each other.'); } choicesPredicate.parse(normalizedChoices); if (this.choices === undefined) { Reflect.set(this, 'choices', []); } validateChoicesLength(normalizedChoices.length, this.choices); for (const { name, name_localizations, value } of normalizedChoices) { // Validate the value if (this.type === ApplicationCommandOptionType.String) { stringPredicate.parse(value); } else { numberPredicate.parse(value); } this.choices!.push({ name, name_localizations, value }); } return this; }"
          },
          {
            "name": "setChoices",
            "static": false,
            "signature": "public setChoices<Input extends APIApplicationCommandOptionChoice<ChoiceType>>(...choices: RestOrArray<Input>): this { const normalizedChoices = normalizeArray(choices); if (normalizedChoices.length > 0 && 'autocomplete' in this && this.autocomplete) { throw new RangeError('Autocomplete and choices are mutually exclusive to each other.'); } choicesPredicate.parse(normalizedChoices); Reflect.set(this, 'choices', []); this.addChoices(normalizedChoices); return this; }"
          }
        ],
        "properties": [
          {
            "name": "choices",
            "kind": "property",
            "static": false,
            "signature": "public readonly choices?: APIApplicationCommandOptionChoice<ChoiceType>[];"
          },
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type!: ApplicationCommandOptionType;"
          }
        ],
        "constructors": []
      },
      "SharedNameAndDescription": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/NameAndDescription.ts",
        "methods": [
          {
            "name": "setName",
            "static": false,
            "signature": "public setName(name: string): this { // Assert the name matches the conditions validateName(name); Reflect.set(this, 'name', name); return this; }"
          },
          {
            "name": "setDescription",
            "static": false,
            "signature": "public setDescription(description: string) { // Assert the description matches the conditions validateDescription(description); Reflect.set(this, 'description', description); return this; }"
          },
          {
            "name": "setNameLocalization",
            "static": false,
            "signature": "public setNameLocalization(locale: LocaleString, localizedName: string | null) { if (!this.name_localizations) { Reflect.set(this, 'name_localizations', {}); } const parsedLocale = validateLocale(locale); if (localizedName === null) { this.name_localizations![parsedLocale] = null; return this; } validateName(localizedName); this.name_localizations![parsedLocale] = localizedName; return this; }"
          },
          {
            "name": "setNameLocalizations",
            "static": false,
            "signature": "public setNameLocalizations(localizedNames: LocalizationMap | null) { if (localizedNames === null) { Reflect.set(this, 'name_localizations', null); return this; } Reflect.set(this, 'name_localizations', {}); for (const args of Object.entries(localizedNames)) { this.setNameLocalization(...(args as [LocaleString, string | null])); } return this; }"
          },
          {
            "name": "setDescriptionLocalization",
            "static": false,
            "signature": "public setDescriptionLocalization(locale: LocaleString, localizedDescription: string | null) { if (!this.description_localizations) { Reflect.set(this, 'description_localizations', {}); } const parsedLocale = validateLocale(locale); if (localizedDescription === null) { this.description_localizations![parsedLocale] = null; return this; } validateDescription(localizedDescription); this.description_localizations![parsedLocale] = localizedDescription; return this; }"
          },
          {
            "name": "setDescriptionLocalizations",
            "static": false,
            "signature": "public setDescriptionLocalizations(localizedDescriptions: LocalizationMap | null) { if (localizedDescriptions === null) { Reflect.set(this, 'description_localizations', null); return this; } Reflect.set(this, 'description_localizations', {}); for (const args of Object.entries(localizedDescriptions)) { this.setDescriptionLocalization(...(args as [LocaleString, string | null])); } return this; }"
          }
        ],
        "properties": [
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "public readonly name!: string;"
          },
          {
            "name": "name_localizations",
            "kind": "property",
            "static": false,
            "signature": "public readonly name_localizations?: LocalizationMap;"
          },
          {
            "name": "description",
            "kind": "property",
            "static": false,
            "signature": "public readonly description!: string;"
          },
          {
            "name": "description_localizations",
            "kind": "property",
            "static": false,
            "signature": "public readonly description_localizations?: LocalizationMap;"
          }
        ],
        "constructors": []
      },
      "SharedSlashCommandOptions": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/SharedSlashCommandOptions.ts",
        "methods": [
          {
            "name": "addBooleanOption",
            "static": false,
            "signature": "public addBooleanOption( input: SlashCommandBooleanOption | ((builder: SlashCommandBooleanOption) => SlashCommandBooleanOption), ) { return this._sharedAddOptionMethod(input, SlashCommandBooleanOption); }"
          },
          {
            "name": "addUserOption",
            "static": false,
            "signature": "public addUserOption(input: SlashCommandUserOption | ((builder: SlashCommandUserOption) => SlashCommandUserOption)) { return this._sharedAddOptionMethod(input, SlashCommandUserOption); }"
          },
          {
            "name": "addChannelOption",
            "static": false,
            "signature": "public addChannelOption( input: SlashCommandChannelOption | ((builder: SlashCommandChannelOption) => SlashCommandChannelOption), ) { return this._sharedAddOptionMethod(input, SlashCommandChannelOption); }"
          },
          {
            "name": "addRoleOption",
            "static": false,
            "signature": "public addRoleOption(input: SlashCommandRoleOption | ((builder: SlashCommandRoleOption) => SlashCommandRoleOption)) { return this._sharedAddOptionMethod(input, SlashCommandRoleOption); }"
          },
          {
            "name": "addAttachmentOption",
            "static": false,
            "signature": "public addAttachmentOption( input: SlashCommandAttachmentOption | ((builder: SlashCommandAttachmentOption) => SlashCommandAttachmentOption), ) { return this._sharedAddOptionMethod(input, SlashCommandAttachmentOption); }"
          },
          {
            "name": "addMentionableOption",
            "static": false,
            "signature": "public addMentionableOption( input: SlashCommandMentionableOption | ((builder: SlashCommandMentionableOption) => SlashCommandMentionableOption), ) { return this._sharedAddOptionMethod(input, SlashCommandMentionableOption); }"
          },
          {
            "name": "addStringOption",
            "static": false,
            "signature": "public addStringOption( input: SlashCommandStringOption | ((builder: SlashCommandStringOption) => SlashCommandStringOption), ) { return this._sharedAddOptionMethod(input, SlashCommandStringOption); }"
          },
          {
            "name": "addIntegerOption",
            "static": false,
            "signature": "public addIntegerOption( input: SlashCommandIntegerOption | ((builder: SlashCommandIntegerOption) => SlashCommandIntegerOption), ) { return this._sharedAddOptionMethod(input, SlashCommandIntegerOption); }"
          },
          {
            "name": "addNumberOption",
            "static": false,
            "signature": "public addNumberOption( input: SlashCommandNumberOption | ((builder: SlashCommandNumberOption) => SlashCommandNumberOption), ) { return this._sharedAddOptionMethod(input, SlashCommandNumberOption); }"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options!: ToAPIApplicationCommandOptions[];"
          }
        ],
        "constructors": []
      },
      "SharedSlashCommandSubcommands": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/SharedSubcommands.ts",
        "methods": [
          {
            "name": "addSubcommandGroup",
            "static": false,
            "signature": "public addSubcommandGroup( input: | SlashCommandSubcommandGroupBuilder | ((subcommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder), ): TypeAfterAddingSubcommands { const { options } = this; // First, assert options conditions - we cannot have more than 25 options validateMaxOptionsLength(options); // Get the final result const result = typeof input === 'function' ? input(new SlashCommandSubcommandGroupBuilder()) : input; assertReturnOfBuilder(result, SlashCommandSubcommandGroupBuilder); // Push it options.push(result); return this as unknown as TypeAfterAddingSubcommands; }"
          },
          {
            "name": "addSubcommand",
            "static": false,
            "signature": "public addSubcommand( input: | SlashCommandSubcommandBuilder | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder), ): TypeAfterAddingSubcommands { const { options } = this; // First, assert options conditions - we cannot have more than 25 options validateMaxOptionsLength(options); // Get the final result const result = typeof input === 'function' ? input(new SlashCommandSubcommandBuilder()) : input; assertReturnOfBuilder(result, SlashCommandSubcommandBuilder); // Push it options.push(result); return this as unknown as TypeAfterAddingSubcommands; }"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: ToAPIApplicationCommandOptions[] = [];"
          }
        ],
        "constructors": []
      },
      "SharedSlashCommand": {
        "kind": "class",
        "source": "interactions/slashCommands/mixins/SharedSlashCommand.ts",
        "methods": [
          {
            "name": "setContexts",
            "static": false,
            "signature": "public setContexts(...contexts: RestOrArray<InteractionContextType>) { Reflect.set(this, 'contexts', contextsPredicate.parse(normalizeArray(contexts))); return this; }"
          },
          {
            "name": "setIntegrationTypes",
            "static": false,
            "signature": "public setIntegrationTypes(...integrationTypes: RestOrArray<ApplicationIntegrationType>) { Reflect.set(this, 'integration_types', integrationTypesPredicate.parse(normalizeArray(integrationTypes))); return this; }"
          },
          {
            "name": "setDefaultPermission",
            "static": false,
            "signature": "public setDefaultPermission(value: boolean) { // Assert the value matches the conditions validateDefaultPermission(value); Reflect.set(this, 'default_permission', value); return this; }"
          },
          {
            "name": "setDefaultMemberPermissions",
            "static": false,
            "signature": "public setDefaultMemberPermissions(permissions: Permissions | bigint | number | null | undefined) { // Assert the value and parse it const permissionValue = validateDefaultMemberPermissions(permissions); Reflect.set(this, 'default_member_permissions', permissionValue); return this; }"
          },
          {
            "name": "setDMPermission",
            "static": false,
            "signature": "public setDMPermission(enabled: boolean | null | undefined) { // Assert the value matches the conditions validateDMPermission(enabled); Reflect.set(this, 'dm_permission', enabled); return this; }"
          },
          {
            "name": "setNSFW",
            "static": false,
            "signature": "public setNSFW(nsfw = true) { // Assert the value matches the conditions validateNSFW(nsfw); Reflect.set(this, 'nsfw', nsfw); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody { validateRequiredParameters(this.name, this.description, this.options); validateLocalizationMap(this.name_localizations); validateLocalizationMap(this.description_localizations); return { ...this, type: ApplicationCommandType.ChatInput, options: this.options.map((option) => option.toJSON()), }; }"
          }
        ],
        "properties": [
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "public readonly name: string = undefined!;"
          },
          {
            "name": "name_localizations",
            "kind": "property",
            "static": false,
            "signature": "public readonly name_localizations?: LocalizationMap;"
          },
          {
            "name": "description",
            "kind": "property",
            "static": false,
            "signature": "public readonly description: string = undefined!;"
          },
          {
            "name": "description_localizations",
            "kind": "property",
            "static": false,
            "signature": "public readonly description_localizations?: LocalizationMap;"
          },
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: ToAPIApplicationCommandOptions[] = [];"
          },
          {
            "name": "contexts",
            "kind": "property",
            "static": false,
            "signature": "public readonly contexts?: InteractionContextType[];"
          },
          {
            "name": "default_permission",
            "kind": "property",
            "static": false,
            "signature": "public readonly default_permission: boolean | undefined = undefined;"
          },
          {
            "name": "default_member_permissions",
            "kind": "property",
            "static": false,
            "signature": "public readonly default_member_permissions: Permissions | null | undefined = undefined;"
          },
          {
            "name": "dm_permission",
            "kind": "property",
            "static": false,
            "signature": "public readonly dm_permission: boolean | undefined = undefined;"
          },
          {
            "name": "integration_types",
            "kind": "property",
            "static": false,
            "signature": "public readonly integration_types?: ApplicationIntegrationType[];"
          },
          {
            "name": "nsfw",
            "kind": "property",
            "static": false,
            "signature": "public readonly nsfw: boolean | undefined = undefined;"
          }
        ],
        "constructors": []
      },
      "ContextMenuCommandBuilder": {
        "kind": "class",
        "source": "interactions/contextMenuCommands/ContextMenuCommandBuilder.ts",
        "methods": [
          {
            "name": "setContexts",
            "static": false,
            "signature": "public setContexts(...contexts: RestOrArray<InteractionContextType>) { Reflect.set(this, 'contexts', contextsPredicate.parse(normalizeArray(contexts))); return this; }"
          },
          {
            "name": "setIntegrationTypes",
            "static": false,
            "signature": "public setIntegrationTypes(...integrationTypes: RestOrArray<ApplicationIntegrationType>) { Reflect.set(this, 'integration_types', integrationTypesPredicate.parse(normalizeArray(integrationTypes))); return this; }"
          },
          {
            "name": "setName",
            "static": false,
            "signature": "public setName(name: string) { // Assert the name matches the conditions validateName(name); Reflect.set(this, 'name', name); return this; }"
          },
          {
            "name": "setType",
            "static": false,
            "signature": "public setType(type: ContextMenuCommandType) { // Assert the type is valid validateType(type); Reflect.set(this, 'type', type); return this; }"
          },
          {
            "name": "setDefaultPermission",
            "static": false,
            "signature": "public setDefaultPermission(value: boolean) { // Assert the value matches the conditions validateDefaultPermission(value); Reflect.set(this, 'default_permission', value); return this; }"
          },
          {
            "name": "setDefaultMemberPermissions",
            "static": false,
            "signature": "public setDefaultMemberPermissions(permissions: Permissions | bigint | number | null | undefined) { // Assert the value and parse it const permissionValue = validateDefaultMemberPermissions(permissions); Reflect.set(this, 'default_member_permissions', permissionValue); return this; }"
          },
          {
            "name": "setDMPermission",
            "static": false,
            "signature": "public setDMPermission(enabled: boolean | null | undefined) { // Assert the value matches the conditions validateDMPermission(enabled); Reflect.set(this, 'dm_permission', enabled); return this; }"
          },
          {
            "name": "setNameLocalization",
            "static": false,
            "signature": "public setNameLocalization(locale: LocaleString, localizedName: string | null) { if (!this.name_localizations) { Reflect.set(this, 'name_localizations', {}); } const parsedLocale = validateLocale(locale); if (localizedName === null) { this.name_localizations![parsedLocale] = null; return this; } validateName(localizedName); this.name_localizations![parsedLocale] = localizedName; return this; }"
          },
          {
            "name": "setNameLocalizations",
            "static": false,
            "signature": "public setNameLocalizations(localizedNames: LocalizationMap | null) { if (localizedNames === null) { Reflect.set(this, 'name_localizations', null); return this; } Reflect.set(this, 'name_localizations', {}); for (const args of Object.entries(localizedNames)) this.setNameLocalization(...(args as [LocaleString, string | null])); return this; }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON(): RESTPostAPIContextMenuApplicationCommandsJSONBody { validateRequiredParameters(this.name, this.type); validateLocalizationMap(this.name_localizations); return { ...this }; }"
          }
        ],
        "properties": [
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "public readonly name: string = undefined!;"
          },
          {
            "name": "name_localizations",
            "kind": "property",
            "static": false,
            "signature": "public readonly name_localizations?: LocalizationMap;"
          },
          {
            "name": "type",
            "kind": "property",
            "static": false,
            "signature": "public readonly type: ContextMenuCommandType = undefined!;"
          },
          {
            "name": "contexts",
            "kind": "property",
            "static": false,
            "signature": "public readonly contexts?: InteractionContextType[];"
          },
          {
            "name": "default_permission",
            "kind": "property",
            "static": false,
            "signature": "public readonly default_permission: boolean | undefined = undefined;"
          },
          {
            "name": "default_member_permissions",
            "kind": "property",
            "static": false,
            "signature": "public readonly default_member_permissions: Permissions | null | undefined = undefined;"
          },
          {
            "name": "dm_permission",
            "kind": "property",
            "static": false,
            "signature": "public readonly dm_permission: boolean | undefined = undefined;"
          },
          {
            "name": "integration_types",
            "kind": "property",
            "static": false,
            "signature": "public readonly integration_types?: ApplicationIntegrationType[];"
          }
        ],
        "constructors": []
      }
    },
    "functions": [
      {
        "name": "validateFieldLength",
        "signature": "export function validateFieldLength(amountAdding: number, fields?: APIEmbedField[]): void { fieldLengthPredicate.parse((fields?.length ?? 0) + amountAdding); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredSelectMenuParameters",
        "signature": "export function validateRequiredSelectMenuParameters(options: StringSelectMenuOptionBuilder[], customId?: string) { customIdValidator.parse(customId); optionsValidator.parse(options); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredSelectMenuOptionParameters",
        "signature": "export function validateRequiredSelectMenuOptionParameters(label?: string, value?: string) { labelValueDescriptionValidator.parse(label); labelValueDescriptionValidator.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredButtonParameters",
        "signature": "export function validateRequiredButtonParameters( style?: ButtonStyle, label?: string, emoji?: APIMessageComponentEmoji, customId?: string, skuId?: string, url?: string, ) { if (style === ButtonStyle.Premium) { if (!skuId) { throw new RangeError('Premium buttons must have an SKU id.'); } if (customId || label || url || emoji) { throw new RangeError('Premium buttons cannot have a custom id, label, URL, or emoji.'); } } else { if (skuId) { throw new RangeError('Non-premium buttons must not have an SKU id.'); } if (url && customId) { throw new RangeError('URL and custom id are mutually exclusive.'); } if (!label && !emoji) { throw new RangeError('Non-premium buttons must have a label and/or an emoji.'); } if (style === ButtonStyle.Link) { if (!url) { throw new RangeError('Link buttons must have a URL.'); } } else if (url) { throw new RangeError('Non-premium and non-link buttons cannot have a URL.'); } } }",
        "source": "Assertions.ts"
      },
      {
        "name": "createComponentBuilder",
        "signature": "export function createComponentBuilder<ComponentType extends keyof MappedComponentTypes>( // eslint-disable-next-line @typescript-eslint/sort-type-constituents data: (APIModalComponent | APIMessageComponent) & { type: ComponentType }, ): MappedComponentTypes[ComponentType];",
        "source": "Components.ts"
      },
      {
        "name": "createComponentBuilder",
        "signature": "export function createComponentBuilder<ComponentBuilder extends MessageComponentBuilder | ModalComponentBuilder>( data: ComponentBuilder, ): ComponentBuilder;",
        "source": "Components.ts"
      },
      {
        "name": "createComponentBuilder",
        "signature": "export function createComponentBuilder( data: APIMessageComponent | APIModalComponent | MessageComponentBuilder, ): ComponentBuilder { if (data instanceof ComponentBuilder) { return data; } switch (data.type) { case ComponentType.ActionRow: return new ActionRowBuilder(data); case ComponentType.Button: return new ButtonBuilder(data); case ComponentType.StringSelect: return new StringSelectMenuBuilder(data); case ComponentType.TextInput: return new TextInputBuilder(data); case ComponentType.UserSelect: return new UserSelectMenuBuilder(data); case ComponentType.RoleSelect: return new RoleSelectMenuBuilder(data); case ComponentType.MentionableSelect: return new MentionableSelectMenuBuilder(data); case ComponentType.ChannelSelect: return new ChannelSelectMenuBuilder(data); case ComponentType.File: return new FileBuilder(data); case ComponentType.Container: return new ContainerBuilder(data); case ComponentType.Section: return new SectionBuilder(data); case ComponentType.Separator: return new SeparatorBuilder(data); case ComponentType.TextDisplay: return new TextDisplayBuilder(data); case ComponentType.Thumbnail: return new ThumbnailBuilder(data); case ComponentType.MediaGallery: return new MediaGalleryBuilder(data); case ComponentType.Label: return new LabelBuilder(data); case ComponentType.FileUpload: return new FileUploadBuilder(data); case ComponentType.Checkbox: return new CheckboxBuilder(data); case ComponentType.CheckboxGroup: return new CheckboxGroupBuilder(data); case ComponentType.RadioGroup: return new RadioGroupBuilder(data); default: // @ts-expect-error This case can still occur if we get a newer unsupported component type throw new Error(`Cannot properly serialize component type: ${data.type}`); } }",
        "source": "Components.ts"
      },
      {
        "name": "resolveBuilder",
        "signature": "export function resolveBuilder<ComponentType extends Record<PropertyKey, any>, Builder extends JSONEncodable<any>>( builder: Builder | ComponentType | ((builder: Builder) => Builder), Constructor: new (data?: ComponentType) => Builder, ) { if (isBuilder(builder, Constructor)) { return builder; } if (typeof builder === 'function') { return builder(new Constructor()); } return new Constructor(builder); }",
        "source": "Components.ts"
      },
      {
        "name": "validateRequiredParameters",
        "signature": "export function validateRequiredParameters(customId?: string, style?: TextInputStyle) { customIdValidator.parse(customId); textInputStyleValidator.parse(style); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredParameters",
        "signature": "export function validateRequiredParameters( customId?: string, title?: string, components?: (ActionRowBuilder<ModalActionRowComponentBuilder> | LabelBuilder | TextDisplayBuilder)[], ) { customIdValidator.parse(customId); titleValidator.parse(title); componentsValidator.parse(components); }",
        "source": "Assertions.ts"
      },
      {
        "name": "assertReturnOfBuilder",
        "signature": "export function assertReturnOfBuilder<ReturnType extends MediaGalleryItemBuilder | TextDisplayBuilder>( input: unknown, ExpectedInstanceOf: new () => ReturnType, ): asserts input is ReturnType { s.instance(ExpectedInstanceOf).setValidationEnabled(isValidationEnabled).parse(input); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateComponentArray",
        "signature": "export function validateComponentArray< ReturnType extends ContainerComponentBuilder | MediaGalleryItemBuilder = ContainerComponentBuilder, >(input: unknown, min: number, max: number, ExpectedInstanceOf?: new () => ReturnType): asserts input is ReturnType[] { (ExpectedInstanceOf ? s.instance(ExpectedInstanceOf) : s.instance(ComponentBuilder)) .array() .lengthGreaterThanOrEqual(min) .lengthLessThanOrEqual(max) .setValidationEnabled(isValidationEnabled) .parse(input); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateName",
        "signature": "export function validateName(name: unknown): asserts name is string { namePredicate.parse(name); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDescription",
        "signature": "export function validateDescription(description: unknown): asserts description is string { descriptionPredicate.parse(description); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateLocale",
        "signature": "export function validateLocale(locale: unknown) { return localePredicate.parse(locale); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateMaxOptionsLength",
        "signature": "export function validateMaxOptionsLength(options: unknown): asserts options is ToAPIApplicationCommandOptions[] { maxArrayLengthPredicate.parse(options); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredParameters",
        "signature": "export function validateRequiredParameters( name: string, description: string, options: ToAPIApplicationCommandOptions[], ) { // Assert name matches all conditions validateName(name); // Assert description conditions validateDescription(description); // Assert options conditions validateMaxOptionsLength(options); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDefaultPermission",
        "signature": "export function validateDefaultPermission(value: unknown): asserts value is boolean { booleanPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequired",
        "signature": "export function validateRequired(required: unknown): asserts required is boolean { booleanPredicate.parse(required); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateChoicesLength",
        "signature": "export function validateChoicesLength(amountAdding: number, choices?: APIApplicationCommandOptionChoice[]): void { choicesLengthPredicate.parse((choices?.length ?? 0) + amountAdding); }",
        "source": "Assertions.ts"
      },
      {
        "name": "assertReturnOfBuilder",
        "signature": "export function assertReturnOfBuilder< ReturnType extends ApplicationCommandOptionBase | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder, >(input: unknown, ExpectedInstanceOf: new () => ReturnType): asserts input is ReturnType { s.instance(ExpectedInstanceOf).parse(input); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateLocalizationMap",
        "signature": "export function validateLocalizationMap(value: unknown): asserts value is LocalizationMap { localizationMapPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDMPermission",
        "signature": "export function validateDMPermission(value: unknown): asserts value is boolean | null | undefined { dmPermissionPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDefaultMemberPermissions",
        "signature": "export function validateDefaultMemberPermissions(permissions: unknown) { return memberPermissionPredicate.parse(permissions); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateNSFW",
        "signature": "export function validateNSFW(value: unknown): asserts value is boolean { booleanPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDefaultPermission",
        "signature": "export function validateDefaultPermission(value: unknown): asserts value is boolean { booleanPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateName",
        "signature": "export function validateName(name: unknown): asserts name is string { namePredicate.parse(name); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateType",
        "signature": "export function validateType(type: unknown): asserts type is ContextMenuCommandType { typePredicate.parse(type); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateRequiredParameters",
        "signature": "export function validateRequiredParameters(name: string, type: number) { // Assert name matches all conditions validateName(name); // Assert type is valid validateType(type); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDMPermission",
        "signature": "export function validateDMPermission(value: unknown): asserts value is boolean | null | undefined { dmPermissionPredicate.parse(value); }",
        "source": "Assertions.ts"
      },
      {
        "name": "validateDefaultMemberPermissions",
        "signature": "export function validateDefaultMemberPermissions(permissions: unknown) { return memberPermissionPredicate.parse(permissions); }",
        "source": "Assertions.ts"
      },
      {
        "name": "embedLength",
        "signature": "export function embedLength(data: APIEmbed) { return ( (data.title?.length ?? 0) + (data.description?.length ?? 0) + (data.fields?.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0) ?? 0) + (data.footer?.text.length ?? 0) + (data.author?.name.length ?? 0) ); }",
        "source": "componentUtil.ts"
      },
      {
        "name": "normalizeArray",
        "signature": "export function normalizeArray<ItemType>(arr: RestOrArray<ItemType>): ItemType[] { if (Array.isArray(arr[0])) return [...arr[0]]; return arr as ItemType[]; }",
        "source": "normalizeArray.ts"
      },
      {
        "name": "enableValidators",
        "signature": "export function enableValidators() { return (validate = true); }",
        "source": "validation.ts"
      },
      {
        "name": "disableValidators",
        "signature": "export function disableValidators() { return (validate = false); }",
        "source": "validation.ts"
      },
      {
        "name": "isValidationEnabled",
        "signature": "export function isValidationEnabled() { return validate; }",
        "source": "validation.ts"
      }
    ],
    "constants": [
      "version",
      "fieldNamePredicate",
      "fieldValuePredicate",
      "fieldInlinePredicate",
      "embedFieldPredicate",
      "embedFieldsArrayPredicate",
      "fieldLengthPredicate",
      "authorNamePredicate",
      "imageURLPredicate",
      "urlPredicate",
      "embedAuthorPredicate",
      "RGBPredicate",
      "colorPredicate",
      "descriptionPredicate",
      "footerTextPredicate",
      "embedFooterPredicate",
      "timestampPredicate",
      "titlePredicate",
      "idValidator",
      "customIdValidator",
      "emojiValidator",
      "disabledValidator",
      "buttonLabelValidator",
      "buttonStyleValidator",
      "placeholderValidator",
      "minMaxValidator",
      "labelValueDescriptionValidator",
      "jsonOptionValidator",
      "optionValidator",
      "optionsValidator",
      "optionsLengthValidator",
      "defaultValidator",
      "channelTypesValidator",
      "urlValidator",
      "textInputStyleValidator",
      "minLengthValidator",
      "maxLengthValidator",
      "requiredValidator",
      "valueValidator",
      "placeholderValidator",
      "labelValidator",
      "textInputPredicate",
      "titleValidator",
      "componentsValidator",
      "selectMenuChannelPredicate",
      "selectMenuMentionablePredicate",
      "selectMenuRolePredicate",
      "selectMenuUserPredicate",
      "selectMenuStringOptionPredicate",
      "selectMenuStringPredicate",
      "fileUploadPredicate",
      "labelPredicate",
      "unfurledMediaItemPredicate",
      "descriptionPredicate",
      "filePredicate",
      "spoilerPredicate",
      "dividerPredicate",
      "spacingPredicate",
      "textDisplayContentPredicate",
      "accessoryPredicate",
      "containerColorPredicate",
      "checkboxPredicate",
      "checkboxGroupOptionPredicate",
      "checkboxGroupPredicate",
      "radioGroupOptionPredicate",
      "radioGroupPredicate",
      "localizationMapPredicate",
      "contextsPredicate",
      "integrationTypesPredicate",
      "contextsPredicate",
      "integrationTypesPredicate"
    ],
    "stats": {
      "files": 65,
      "entities": 61,
      "methods": 217,
      "properties": 78,
      "functions": 36,
      "constants": 71
    }
  },
  "formatters": {
    "files": 3,
    "entities": {
      "EscapeMarkdownOptions": {
        "kind": "interface",
        "source": "escapers.ts",
        "methods": [],
        "properties": [
          {
            "name": "bold",
            "kind": "property",
            "static": false,
            "signature": "bold?: boolean;"
          },
          {
            "name": "bulletedList",
            "kind": "property",
            "static": false,
            "signature": "bulletedList?: boolean;"
          },
          {
            "name": "codeBlock",
            "kind": "property",
            "static": false,
            "signature": "codeBlock?: boolean;"
          },
          {
            "name": "codeBlockContent",
            "kind": "property",
            "static": false,
            "signature": "codeBlockContent?: boolean;"
          },
          {
            "name": "escape",
            "kind": "property",
            "static": false,
            "signature": "escape?: boolean;"
          },
          {
            "name": "heading",
            "kind": "property",
            "static": false,
            "signature": "heading?: boolean;"
          },
          {
            "name": "inlineCode",
            "kind": "property",
            "static": false,
            "signature": "inlineCode?: boolean;"
          },
          {
            "name": "inlineCodeContent",
            "kind": "property",
            "static": false,
            "signature": "inlineCodeContent?: boolean;"
          },
          {
            "name": "italic",
            "kind": "property",
            "static": false,
            "signature": "italic?: boolean;"
          },
          {
            "name": "maskedLink",
            "kind": "property",
            "static": false,
            "signature": "maskedLink?: boolean;"
          },
          {
            "name": "numberedList",
            "kind": "property",
            "static": false,
            "signature": "numberedList?: boolean;"
          },
          {
            "name": "spoiler",
            "kind": "property",
            "static": false,
            "signature": "spoiler?: boolean;"
          },
          {
            "name": "strikethrough",
            "kind": "property",
            "static": false,
            "signature": "strikethrough?: boolean;"
          },
          {
            "name": "underline",
            "kind": "property",
            "static": false,
            "signature": "underline?: boolean;"
          }
        ],
        "constructors": []
      },
      "FormatEmojiOptions": {
        "kind": "interface",
        "source": "formatters.ts",
        "methods": [],
        "properties": [
          {
            "name": "animated",
            "kind": "property",
            "static": false,
            "signature": "animated?: boolean;"
          },
          {
            "name": "id",
            "kind": "property",
            "static": false,
            "signature": "id: EmojiId;"
          },
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "name?: EmojiName;"
          }
        ],
        "constructors": []
      }
    },
    "functions": [
      {
        "name": "escapeMarkdown",
        "signature": "export function escapeMarkdown(text: string, options: EscapeMarkdownOptions = {}): string { const { codeBlock = true, inlineCode = true, bold = true, italic = true, underline = true, strikethrough = true, spoiler = true, codeBlockContent = true, inlineCodeContent = true, escape = true, heading = false, bulletedList = false, numberedList = false, maskedLink = false, } = options; if (!codeBlockContent) { return text .split('```') .map((subString, index, array) => { if (index % 2 && index !== array.length - 1) return subString; return escapeMarkdown(subString, { inlineCode, bold, italic, underline, strikethrough, spoiler, inlineCodeContent, escape, heading, bulletedList, numberedList, maskedLink, }); }) .join(codeBlock ? '\\\\`\\\\`\\\\`' : '```'); } if (!inlineCodeContent) { return text .split(/(?<=^|[^`])`(?=[^`]|$)/g) .map((subString, index, array) => { if (index % 2 && index !== array.length - 1) return subString; return escapeMarkdown(subString, { codeBlock, bold, italic, underline, strikethrough, spoiler, escape, heading, bulletedList, numberedList, maskedLink, }); }) .join(inlineCode ? '\\\\`' : '`'); } let res = text; if (escape) res = escapeEscape(res); if (inlineCode) res = escapeInlineCode(res); if (codeBlock) res = escapeCodeBlock(res); if (italic) res = escapeItalic(res); if (bold) res = escapeBold(res); if (underline) res = escapeUnderline(res); if (strikethrough) res = escapeStrikethrough(res); if (spoiler) res = escapeSpoiler(res); if (heading) res = escapeHeading(res); if (bulletedList) res = escapeBulletedList(res); if (numberedList) res = escapeNumberedList(res); if (maskedLink) res = escapeMaskedLink(res); return res; }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeCodeBlock",
        "signature": "export function escapeCodeBlock(text: string): string { return text.replaceAll('```', '\\\\`\\\\`\\\\`'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeInlineCode",
        "signature": "export function escapeInlineCode(text: string): string { return text.replaceAll(/(?<=^|[^`])``?(?=[^`]|$)/g, (match) => (match.length === 2 ? '\\\\`\\\\`' : '\\\\`')); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeItalic",
        "signature": "export function escapeItalic(text: string): string { let idx = 0; const newText = text.replaceAll( /(?<=^|[^*])(?<!(?<!<)https?:\\/\\/\\S*|<[^\\s:]+:\\/[^\\s>]*)\\*([^*]|\\*\\*|$)/g, (_, match) => { if (match === '**') return ++idx % 2 ? `\\\\*${match}` : `${match}\\\\*`; return `\\\\*${match}`; }, ); idx = 0; return newText.replaceAll( /(?<=^|[^_])(?<!<a?:.+|(?<!<)https?:\\/\\/\\S*|<[^\\s:]:\\/[^\\s>]*)_(?!:\\d+>)([^_]|__|$)/g, (_, match) => { if (match === '__') return ++idx % 2 ? `\\\\_${match}` : `${match}\\\\_`; return `\\\\_${match}`; }, ); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeBold",
        "signature": "export function escapeBold(text: string): string { let idx = 0; return text.replaceAll(/\\*\\*(\\*)?/g, (_, match) => { if (match) return ++idx % 2 ? `${match}\\\\*\\\\*` : `\\\\*\\\\*${match}`; return '\\\\*\\\\*'; }); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeUnderline",
        "signature": "export function escapeUnderline(text: string): string { let idx = 0; return text.replaceAll(/(?<!<a?:.+|https?:\\/\\/\\S+)__(_)?(?!:\\d+>)/g, (_, match) => { if (match) return ++idx % 2 ? `${match}\\\\_\\\\_` : `\\\\_\\\\_${match}`; return '\\\\_\\\\_'; }); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeStrikethrough",
        "signature": "export function escapeStrikethrough(text: string): string { return text.replaceAll('~~', '\\\\~\\\\~'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeSpoiler",
        "signature": "export function escapeSpoiler(text: string): string { return text.replaceAll('||', '\\\\|\\\\|'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeEscape",
        "signature": "export function escapeEscape(text: string): string { return text.replaceAll('\\\\', '\\\\\\\\'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeHeading",
        "signature": "export function escapeHeading(text: string): string { return text.replaceAll(/^( {0,2})([*-] )?( *)(#{1,3} )/gm, '$1$2$3\\\\$4'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeBulletedList",
        "signature": "export function escapeBulletedList(text: string): string { return text.replaceAll(/^( *)([*-])( +)/gm, '$1\\\\$2$3'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeNumberedList",
        "signature": "export function escapeNumberedList(text: string): string { return text.replaceAll(/^( *\\d+)\\./gm, '$1\\\\.'); }",
        "source": "escapers.ts"
      },
      {
        "name": "escapeMaskedLink",
        "signature": "export function escapeMaskedLink(text: string): string { return text.replaceAll(/\\[.+]\\(.+\\)/gm, '\\\\$&'); }",
        "source": "escapers.ts"
      },
      {
        "name": "codeBlock",
        "signature": "export function codeBlock<Content extends string>(content: Content): `\\`\\`\\`\\n${Content}\\n\\`\\`\\``;",
        "source": "formatters.ts"
      },
      {
        "name": "codeBlock",
        "signature": "export function codeBlock<Language extends string, Content extends string>( language: Language, content: Content, ): `\\`\\`\\`${Language}\\n${Content}\\n\\`\\`\\``;",
        "source": "formatters.ts"
      },
      {
        "name": "codeBlock",
        "signature": "export function codeBlock(language: string, content?: string): string { return content === undefined ? `\\`\\`\\`\\n${language}\\n\\`\\`\\`` : `\\`\\`\\`${language}\\n${content}\\n\\`\\`\\``; }",
        "source": "formatters.ts"
      },
      {
        "name": "inlineCode",
        "signature": "export function inlineCode<Content extends string>(content: Content): `\\`${Content}\\`` { return `\\`${content}\\``; }",
        "source": "formatters.ts"
      },
      {
        "name": "italic",
        "signature": "export function italic<Content extends string>(content: Content): `_${Content}_` { return `_${content}_`; }",
        "source": "formatters.ts"
      },
      {
        "name": "bold",
        "signature": "export function bold<Content extends string>(content: Content): `**${Content}**` { return `**${content}**`; }",
        "source": "formatters.ts"
      },
      {
        "name": "underscore",
        "signature": "export function underscore<Content extends string>(content: Content): `__${Content}__` { return underline(content); }",
        "source": "formatters.ts"
      },
      {
        "name": "underline",
        "signature": "export function underline<Content extends string>(content: Content): `__${Content}__` { return `__${content}__`; }",
        "source": "formatters.ts"
      },
      {
        "name": "strikethrough",
        "signature": "export function strikethrough<Content extends string>(content: Content): `~~${Content}~~` { return `~~${content}~~`; }",
        "source": "formatters.ts"
      },
      {
        "name": "quote",
        "signature": "export function quote<Content extends string>(content: Content): `> ${Content}` { return `> ${content}`; }",
        "source": "formatters.ts"
      },
      {
        "name": "blockQuote",
        "signature": "export function blockQuote<Content extends string>(content: Content): `>>> ${Content}` { return `>>> ${content}`; }",
        "source": "formatters.ts"
      },
      {
        "name": "hideLinkEmbed",
        "signature": "export function hideLinkEmbed<Content extends string>(url: Content): `<${Content}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "hideLinkEmbed",
        "signature": "export function hideLinkEmbed(url: URL): `<${string}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "hideLinkEmbed",
        "signature": "export function hideLinkEmbed(url: URL | string) { return `<${url}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "hyperlink",
        "signature": "export function hyperlink<Content extends string>(content: Content, url: URL): `[${Content}](${string})`;",
        "source": "formatters.ts"
      },
      {
        "name": "hyperlink",
        "signature": "export function hyperlink<Content extends string, Url extends string>( content: Content, url: Url, ): `[${Content}](${Url})`;",
        "source": "formatters.ts"
      },
      {
        "name": "hyperlink",
        "signature": "export function hyperlink<Content extends string, Title extends string>( content: Content, url: URL, title: Title, ): `[${Content}](${string} \"${Title}\")`;",
        "source": "formatters.ts"
      },
      {
        "name": "hyperlink",
        "signature": "export function hyperlink<Content extends string, Url extends string, Title extends string>( content: Content, url: Url, title: Title, ): `[${Content}](${Url} \"${Title}\")`;",
        "source": "formatters.ts"
      },
      {
        "name": "hyperlink",
        "signature": "export function hyperlink(content: string, url: URL | string, title?: string) { return title ? `[${content}](${url} \"${title}\")` : `[${content}](${url})`; }",
        "source": "formatters.ts"
      },
      {
        "name": "spoiler",
        "signature": "export function spoiler<Content extends string>(content: Content): `||${Content}||` { return `||${content}||`; }",
        "source": "formatters.ts"
      },
      {
        "name": "userMention",
        "signature": "export function userMention<UserId extends Snowflake>(userId: UserId): `<@${UserId}>` { return `<@${userId}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "channelMention",
        "signature": "export function channelMention<ChannelId extends Snowflake>(channelId: ChannelId): `<#${ChannelId}>` { return `<#${channelId}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "roleMention",
        "signature": "export function roleMention<RoleId extends Snowflake>(roleId: RoleId): `<@&${RoleId}>` { return `<@&${roleId}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "linkedRoleMention",
        "signature": "export function linkedRoleMention<RoleId extends Snowflake>(roleId: RoleId): `<id:linked-roles:${RoleId}>` { return `<id:linked-roles:${roleId}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "chatInputApplicationCommandMention",
        "signature": "export function chatInputApplicationCommandMention< CommandName extends string, SubcommandGroupName extends string, SubcommandName extends string, CommandId extends Snowflake, >( commandName: CommandName, subcommandGroupName: SubcommandGroupName, subcommandName: SubcommandName, commandId: CommandId, ): `</${CommandName} ${SubcommandGroupName} ${SubcommandName}:${CommandId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "chatInputApplicationCommandMention",
        "signature": "export function chatInputApplicationCommandMention< CommandName extends string, SubcommandName extends string, CommandId extends Snowflake, >( commandName: CommandName, subcommandName: SubcommandName, commandId: CommandId, ): `</${CommandName} ${SubcommandName}:${CommandId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "chatInputApplicationCommandMention",
        "signature": "export function chatInputApplicationCommandMention<CommandName extends string, CommandId extends Snowflake>( commandName: CommandName, commandId: CommandId, ): `</${CommandName}:${CommandId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "chatInputApplicationCommandMention",
        "signature": "export function chatInputApplicationCommandMention< CommandName extends string, SubcommandGroupName extends Snowflake | string, SubcommandName extends Snowflake | string, CommandId extends Snowflake, >( commandName: CommandName, subcommandGroupName: SubcommandGroupName, subcommandName?: SubcommandName, commandId?: CommandId, ): | `</${CommandName} ${SubcommandGroupName} ${SubcommandName}:${CommandId}>` | `</${CommandName} ${SubcommandGroupName}:${SubcommandName}>` | `</${CommandName}:${SubcommandGroupName}>` { if (commandId !== undefined) { return `</${commandName} ${subcommandGroupName} ${subcommandName!}:${commandId}>`; } if (subcommandName !== undefined) { return `</${commandName} ${subcommandGroupName}:${subcommandName}>`; } return `</${commandName}:${subcommandGroupName}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake>(emojiId: EmojiId, animated?: false): `<:emoji:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake>(emojiId: EmojiId, animated?: true): `<a:emoji:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake>( emojiId: EmojiId, animated?: boolean, ): `<:emoji:${EmojiId}>` | `<a:emoji:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake, EmojiName extends string>( options: FormatEmojiOptions<EmojiId, EmojiName> & { animated: true }, ): `<a:${EmojiName}:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake, EmojiName extends string>( options: FormatEmojiOptions<EmojiId, EmojiName> & { animated?: false }, ): `<:${EmojiName}:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake, EmojiName extends string>( options: FormatEmojiOptions<EmojiId, EmojiName>, ): `<:${EmojiName}:${EmojiId}>` | `<a:${EmojiName}:${EmojiId}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "formatEmoji",
        "signature": "export function formatEmoji<EmojiId extends Snowflake, EmojiName extends string>( emojiIdOrOptions: EmojiId | FormatEmojiOptions<EmojiId, EmojiName>, animated?: boolean, ): `<:${string}:${EmojiId}>` | `<a:${string}:${EmojiId}>` { const options = typeof emojiIdOrOptions === 'string' ? { id: emojiIdOrOptions, animated: animated ?? false, } : emojiIdOrOptions; const { id, animated: isAnimated, name: emojiName } = options; return `<${isAnimated ? 'a' : ''}:${emojiName ?? 'emoji'}:${id}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "channelLink",
        "signature": "export function channelLink<ChannelId extends Snowflake>( channelId: ChannelId, ): `https://discord.com/channels/@me/${ChannelId}`;",
        "source": "formatters.ts"
      },
      {
        "name": "channelLink",
        "signature": "export function channelLink<ChannelId extends Snowflake, GuildId extends Snowflake>( channelId: ChannelId, guildId: GuildId, ): `https://discord.com/channels/${GuildId}/${ChannelId}`;",
        "source": "formatters.ts"
      },
      {
        "name": "channelLink",
        "signature": "export function channelLink<ChannelId extends Snowflake, GuildId extends Snowflake>( channelId: ChannelId, guildId?: GuildId, ): `https://discord.com/channels/@me/${ChannelId}` | `https://discord.com/channels/${GuildId}/${ChannelId}` { return `https://discord.com/channels/${guildId ?? '@me'}/${channelId}`; }",
        "source": "formatters.ts"
      },
      {
        "name": "messageLink",
        "signature": "export function messageLink<ChannelId extends Snowflake, MessageId extends Snowflake>( channelId: ChannelId, messageId: MessageId, ): `https://discord.com/channels/@me/${ChannelId}/${MessageId}`;",
        "source": "formatters.ts"
      },
      {
        "name": "messageLink",
        "signature": "export function messageLink<ChannelId extends Snowflake, MessageId extends Snowflake, GuildId extends Snowflake>( channelId: ChannelId, messageId: MessageId, guildId: GuildId, ): `https://discord.com/channels/${GuildId}/${ChannelId}/${MessageId}`;",
        "source": "formatters.ts"
      },
      {
        "name": "messageLink",
        "signature": "export function messageLink<ChannelId extends Snowflake, MessageId extends Snowflake, GuildId extends Snowflake>( channelId: ChannelId, messageId: MessageId, guildId?: GuildId, ): | `https://discord.com/channels/@me/${ChannelId}/${MessageId}` | `https://discord.com/channels/${GuildId}/${ChannelId}/${MessageId}` { return `${guildId === undefined ? channelLink(channelId) : channelLink(channelId, guildId)}/${messageId}`; }",
        "source": "formatters.ts"
      },
      {
        "name": "heading",
        "signature": "export function heading<Content extends string>(content: Content, level?: HeadingLevel.One): `# ${Content}`;",
        "source": "formatters.ts"
      },
      {
        "name": "heading",
        "signature": "export function heading<Content extends string>(content: Content, level: HeadingLevel.Two): `## ${Content}`;",
        "source": "formatters.ts"
      },
      {
        "name": "heading",
        "signature": "export function heading<Content extends string>(content: Content, level: HeadingLevel.Three): `### ${Content}`;",
        "source": "formatters.ts"
      },
      {
        "name": "heading",
        "signature": "export function heading(content: string, level?: HeadingLevel) { switch (level) { case HeadingLevel.Three: return `### ${content}`; case HeadingLevel.Two: return `## ${content}`; default: return `# ${content}`; } }",
        "source": "formatters.ts"
      },
      {
        "name": "orderedList",
        "signature": "export function orderedList(list: RecursiveArray<string>, startNumber = 1): string { return listCallback(list, Math.max(startNumber, 1)); }",
        "source": "formatters.ts"
      },
      {
        "name": "unorderedList",
        "signature": "export function unorderedList(list: RecursiveArray<string>): string { return listCallback(list); }",
        "source": "formatters.ts"
      },
      {
        "name": "subtext",
        "signature": "export function subtext<Content extends string>(content: Content): `-# ${Content}` { return `-# ${content}`; }",
        "source": "formatters.ts"
      },
      {
        "name": "time",
        "signature": "export function time(date?: Date): `<t:${bigint}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "time",
        "signature": "export function time<Style extends TimestampStylesString>(date: Date, style: Style): `<t:${bigint}:${Style}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "time",
        "signature": "export function time<Seconds extends number>(seconds: Seconds): `<t:${Seconds}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "time",
        "signature": "export function time<Seconds extends number, Style extends TimestampStylesString>( seconds: Seconds, style: Style, ): `<t:${Seconds}:${Style}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "time",
        "signature": "export function time(timeOrSeconds?: Date | number, style?: TimestampStylesString): string { if (typeof timeOrSeconds !== 'number') { // eslint-disable-next-line no-param-reassign timeOrSeconds = Math.floor((timeOrSeconds?.getTime() ?? Date.now()) / 1_000); } return typeof style === 'string' ? `<t:${timeOrSeconds}:${style}>` : `<t:${timeOrSeconds}>`; }",
        "source": "formatters.ts"
      },
      {
        "name": "applicationDirectory",
        "signature": "export function applicationDirectory<ApplicationId extends Snowflake>( applicationId: ApplicationId, ): `https://discord.com/application-directory/${ApplicationId}/store`;",
        "source": "formatters.ts"
      },
      {
        "name": "applicationDirectory",
        "signature": "export function applicationDirectory<ApplicationId extends Snowflake, SKUId extends Snowflake>( applicationId: ApplicationId, skuId: SKUId, ): `https://discord.com/application-directory/${ApplicationId}/store/${SKUId}`;",
        "source": "formatters.ts"
      },
      {
        "name": "applicationDirectory",
        "signature": "export function applicationDirectory<ApplicationId extends Snowflake, SKUId extends Snowflake>( applicationId: ApplicationId, skuId?: SKUId, ): | `https://discord.com/application-directory/${ApplicationId}/store/${SKUId}` | `https://discord.com/application-directory/${ApplicationId}/store` { const url = `https://discord.com/application-directory/${applicationId}/store` as const; return skuId ? `${url}/${skuId}` : url; }",
        "source": "formatters.ts"
      },
      {
        "name": "email",
        "signature": "export function email<Email extends string>(email: Email): `<${Email}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "email",
        "signature": "export function email<Email extends string>( email: Email, headers: Record<string, string | readonly string[]> | undefined, ): `<${Email}?${string}>`;",
        "source": "formatters.ts"
      },
      {
        "name": "email",
        "signature": "export function email<Email extends string>(email: Email, headers?: Record<string, string | readonly string[]>) { if (headers) { const searchParams = new URLSearchParams( Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])), ); return `<${email}?${searchParams.toString()}>` as const; } return `<${email}>` as const; }",
        "source": "formatters.ts"
      },
      {
        "name": "phoneNumber",
        "signature": "export function phoneNumber<PhoneNumber extends `+${string}`>(phoneNumber: PhoneNumber) { if (!phoneNumber.startsWith('+')) { throw new Error('Phone number must start with a \"+\" sign.'); } return `<${phoneNumber}>` as const; }",
        "source": "formatters.ts"
      }
    ],
    "constants": [
      "version",
      "TimestampStyles"
    ],
    "stats": {
      "files": 3,
      "entities": 2,
      "methods": 0,
      "properties": 17,
      "functions": 73,
      "constants": 2
    }
  },
  "rest": {
    "files": 10,
    "entities": {
      "BaseImageURLOptions": {
        "kind": "interface",
        "source": "lib/CDN.ts",
        "methods": [],
        "properties": [
          {
            "name": "extension",
            "kind": "property",
            "static": false,
            "signature": "extension?: ImageExtension;"
          },
          {
            "name": "size",
            "kind": "property",
            "static": false,
            "signature": "size?: ImageSize;"
          }
        ],
        "constructors": []
      },
      "EmojiURLOptionsWebp": {
        "kind": "interface",
        "source": "lib/CDN.ts",
        "methods": [],
        "properties": [
          {
            "name": "animated",
            "kind": "property",
            "static": false,
            "signature": "animated?: boolean;"
          },
          {
            "name": "extension",
            "kind": "property",
            "static": false,
            "signature": "extension?: 'webp';"
          }
        ],
        "constructors": []
      },
      "EmojiURLOptionsNotWebp": {
        "kind": "interface",
        "source": "lib/CDN.ts",
        "methods": [],
        "properties": [
          {
            "name": "extension",
            "kind": "property",
            "static": false,
            "signature": "extension: Exclude<ImageExtension, 'webp'>;"
          }
        ],
        "constructors": []
      },
      "ImageURLOptions": {
        "kind": "interface",
        "source": "lib/CDN.ts",
        "methods": [],
        "properties": [
          {
            "name": "forceStatic",
            "kind": "property",
            "static": false,
            "signature": "forceStatic?: boolean;"
          }
        ],
        "constructors": []
      },
      "MakeURLOptions": {
        "kind": "interface",
        "source": "lib/CDN.ts",
        "methods": [],
        "properties": [
          {
            "name": "allowedExtensions",
            "kind": "property",
            "static": false,
            "signature": "allowedExtensions?: readonly string[];"
          },
          {
            "name": "animated",
            "kind": "property",
            "static": false,
            "signature": "animated?: boolean;"
          },
          {
            "name": "base",
            "kind": "property",
            "static": false,
            "signature": "base?: string;"
          },
          {
            "name": "extension",
            "kind": "property",
            "static": false,
            "signature": "extension?: string | undefined;"
          },
          {
            "name": "size",
            "kind": "property",
            "static": false,
            "signature": "size?: ImageSize;"
          }
        ],
        "constructors": []
      },
      "CDN": {
        "kind": "class",
        "source": "lib/CDN.ts",
        "methods": [
          {
            "name": "appAsset",
            "static": false,
            "signature": "public appAsset(clientId: string, assetHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/app-assets/${clientId}/${assetHash}`, options); }"
          },
          {
            "name": "appIcon",
            "static": false,
            "signature": "public appIcon(clientId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/app-icons/${clientId}/${iconHash}`, options); }"
          },
          {
            "name": "avatar",
            "static": false,
            "signature": "public avatar(id: string, avatarHash: string, options?: Readonly<ImageURLOptions>): string { return this.dynamicMakeURL(`/avatars/${id}/${avatarHash}`, avatarHash, options); }"
          },
          {
            "name": "avatarDecoration",
            "static": false,
            "signature": "public avatarDecoration(asset: string): string;"
          },
          {
            "name": "avatarDecoration",
            "static": false,
            "signature": "public avatarDecoration( userId: string, userAvatarDecoration: string, // eslint-disable-next-line @typescript-eslint/unified-signatures options?: Readonly<BaseImageURLOptions>, ): string;"
          },
          {
            "name": "avatarDecoration",
            "static": false,
            "signature": "public avatarDecoration( userIdOrAsset: string, userAvatarDecoration?: string, options?: Readonly<BaseImageURLOptions>, ): string { if (userAvatarDecoration) { return this.makeURL(`/avatar-decorations/${userIdOrAsset}/${userAvatarDecoration}`, options); } return this.makeURL(`/avatar-decoration-presets/${userIdOrAsset}`, { extension: 'png' }); }"
          },
          {
            "name": "banner",
            "static": false,
            "signature": "public banner(id: string, bannerHash: string, options?: Readonly<ImageURLOptions>): string { return this.dynamicMakeURL(`/banners/${id}/${bannerHash}`, bannerHash, options); }"
          },
          {
            "name": "channelIcon",
            "static": false,
            "signature": "public channelIcon(channelId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/channel-icons/${channelId}/${iconHash}`, options); }"
          },
          {
            "name": "defaultAvatar",
            "static": false,
            "signature": "public defaultAvatar(index: number): string { return this.makeURL(`/embed/avatars/${index}`, { extension: 'png' }); }"
          },
          {
            "name": "discoverySplash",
            "static": false,
            "signature": "public discoverySplash(guildId: string, splashHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/discovery-splashes/${guildId}/${splashHash}`, options); }"
          },
          {
            "name": "emoji",
            "static": false,
            "signature": "public emoji(emojiId: string, options?: Readonly<EmojiURLOptions>): string;"
          },
          {
            "name": "emoji",
            "static": false,
            "signature": "public emoji(emojiId: string, extension?: ImageExtension): string;"
          },
          {
            "name": "emoji",
            "static": false,
            "signature": "public emoji(emojiId: string, options?: ImageExtension | Readonly<EmojiURLOptions>): string { let resolvedOptions; if (typeof options === 'string') { if (!deprecationEmittedForEmoji) { deprecationWarning( 'Passing a string for the second parameter of CDN#emoji() is deprecated. Use an object instead.', ); deprecationEmittedForEmoji = true; } resolvedOptions = { extension: options }; } else { resolvedOptions = options; } return this.makeURL(`/emojis/${emojiId}`, resolvedOptions); }"
          },
          {
            "name": "guildMemberAvatar",
            "static": false,
            "signature": "public guildMemberAvatar( guildId: string, userId: string, avatarHash: string, options?: Readonly<ImageURLOptions>, ): string { return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/avatars/${avatarHash}`, avatarHash, options); }"
          },
          {
            "name": "guildMemberBanner",
            "static": false,
            "signature": "public guildMemberBanner( guildId: string, userId: string, bannerHash: string, options?: Readonly<ImageURLOptions>, ): string { return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/banners/${bannerHash}`, bannerHash, options); }"
          },
          {
            "name": "icon",
            "static": false,
            "signature": "public icon(id: string, iconHash: string, options?: Readonly<ImageURLOptions>): string { return this.dynamicMakeURL(`/icons/${id}/${iconHash}`, iconHash, options); }"
          },
          {
            "name": "roleIcon",
            "static": false,
            "signature": "public roleIcon(roleId: string, roleIconHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/role-icons/${roleId}/${roleIconHash}`, options); }"
          },
          {
            "name": "splash",
            "static": false,
            "signature": "public splash(guildId: string, splashHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/splashes/${guildId}/${splashHash}`, options); }"
          },
          {
            "name": "sticker",
            "static": false,
            "signature": "public sticker(stickerId: string, extension: StickerExtension = 'png'): string { return this.makeURL(`/stickers/${stickerId}`, { allowedExtensions: ALLOWED_STICKER_EXTENSIONS, base: extension === 'gif' ? this.mediaProxy : this.cdn, extension, }); }"
          },
          {
            "name": "stickerPackBanner",
            "static": false,
            "signature": "public stickerPackBanner(bannerId: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/app-assets/710982414301790216/store/${bannerId}`, options); }"
          },
          {
            "name": "teamIcon",
            "static": false,
            "signature": "public teamIcon(teamId: string, iconHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/team-icons/${teamId}/${iconHash}`, options); }"
          },
          {
            "name": "guildScheduledEventCover",
            "static": false,
            "signature": "public guildScheduledEventCover( scheduledEventId: string, coverHash: string, options?: Readonly<BaseImageURLOptions>, ): string { return this.makeURL(`/guild-events/${scheduledEventId}/${coverHash}`, options); }"
          },
          {
            "name": "soundboardSound",
            "static": false,
            "signature": "public soundboardSound(soundId: string): string { return `${this.cdn}${CDNRoutes.soundboardSound(soundId)}`; }"
          },
          {
            "name": "guildTagBadge",
            "static": false,
            "signature": "public guildTagBadge(guildId: string, badgeHash: string, options?: Readonly<BaseImageURLOptions>): string { return this.makeURL(`/guild-tag-badges/${guildId}/${badgeHash}`, options); }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor( private readonly cdn: string = DefaultRestOptions.cdn, private readonly mediaProxy: string = DefaultRestOptions.mediaProxy, ) {}"
        ]
      },
      "DiscordErrorFieldInformation": {
        "kind": "interface",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "code",
            "kind": "property",
            "static": false,
            "signature": "code: string;"
          },
          {
            "name": "message",
            "kind": "property",
            "static": false,
            "signature": "message: string;"
          }
        ],
        "constructors": []
      },
      "DiscordErrorGroupWrapper": {
        "kind": "interface",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "_errors",
            "kind": "property",
            "static": false,
            "signature": "_errors: DiscordError[];"
          }
        ],
        "constructors": []
      },
      "DiscordErrorData": {
        "kind": "interface",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "code",
            "kind": "property",
            "static": false,
            "signature": "code: number;"
          },
          {
            "name": "errors",
            "kind": "property",
            "static": false,
            "signature": "errors?: DiscordError;"
          },
          {
            "name": "message",
            "kind": "property",
            "static": false,
            "signature": "message: string;"
          }
        ],
        "constructors": []
      },
      "OAuthErrorData": {
        "kind": "interface",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "error",
            "kind": "property",
            "static": false,
            "signature": "error: string;"
          },
          {
            "name": "error_description",
            "kind": "property",
            "static": false,
            "signature": "error_description?: string;"
          }
        ],
        "constructors": []
      },
      "RequestBody": {
        "kind": "interface",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "files",
            "kind": "property",
            "static": false,
            "signature": "files: RawFile[] | undefined;"
          },
          {
            "name": "json",
            "kind": "property",
            "static": false,
            "signature": "json: unknown | undefined;"
          }
        ],
        "constructors": []
      },
      "DiscordAPIError": {
        "kind": "class",
        "source": "lib/errors/DiscordAPIError.ts",
        "methods": [],
        "properties": [
          {
            "name": "requestBody",
            "kind": "property",
            "static": false,
            "signature": "public requestBody: RequestBody;"
          },
          {
            "name": "name",
            "kind": "getter",
            "static": false,
            "signature": "public override get name(): string { return `${DiscordAPIError.name}[${this.code}]`; }"
          }
        ],
        "constructors": [
          "public constructor( public rawError: DiscordErrorData | OAuthErrorData, public code: number | string, public status: number, public method: string, public url: string, bodyData: Pick<InternalRequest, 'body' | 'files'>, ) { super(DiscordAPIError.getMessage(rawError)); this.requestBody = { files: bodyData.files, json: bodyData.body }; }"
        ]
      },
      "HTTPError": {
        "kind": "class",
        "source": "lib/errors/HTTPError.ts",
        "methods": [],
        "properties": [
          {
            "name": "requestBody",
            "kind": "property",
            "static": false,
            "signature": "public requestBody: RequestBody;"
          },
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "public override name = HTTPError.name;"
          }
        ],
        "constructors": [
          "public constructor( public status: number, statusText: string, public method: string, public url: string, bodyData: Pick<InternalRequest, 'body' | 'files'>, ) { super(statusText); this.requestBody = { files: bodyData.files, json: bodyData.body }; }"
        ]
      },
      "RateLimitError": {
        "kind": "class",
        "source": "lib/errors/RateLimitError.ts",
        "methods": [],
        "properties": [
          {
            "name": "timeToReset",
            "kind": "property",
            "static": false,
            "signature": "public timeToReset: number;"
          },
          {
            "name": "limit",
            "kind": "property",
            "static": false,
            "signature": "public limit: number;"
          },
          {
            "name": "method",
            "kind": "property",
            "static": false,
            "signature": "public method: string;"
          },
          {
            "name": "hash",
            "kind": "property",
            "static": false,
            "signature": "public hash: string;"
          },
          {
            "name": "url",
            "kind": "property",
            "static": false,
            "signature": "public url: string;"
          },
          {
            "name": "route",
            "kind": "property",
            "static": false,
            "signature": "public route: string;"
          },
          {
            "name": "majorParameter",
            "kind": "property",
            "static": false,
            "signature": "public majorParameter: string;"
          },
          {
            "name": "global",
            "kind": "property",
            "static": false,
            "signature": "public global: boolean;"
          },
          {
            "name": "retryAfter",
            "kind": "property",
            "static": false,
            "signature": "public retryAfter: number;"
          },
          {
            "name": "sublimitTimeout",
            "kind": "property",
            "static": false,
            "signature": "public sublimitTimeout: number;"
          },
          {
            "name": "scope",
            "kind": "property",
            "static": false,
            "signature": "public scope: RateLimitData['scope'];"
          },
          {
            "name": "name",
            "kind": "getter",
            "static": false,
            "signature": "public override get name(): string { return `${RateLimitError.name}[${this.route}]`; }"
          }
        ],
        "constructors": [
          "public constructor({ timeToReset, limit, method, hash, url, route, majorParameter, global, retryAfter, sublimitTimeout, scope, }: RateLimitData) { super(); this.timeToReset = timeToReset; this.limit = limit; this.method = method; this.hash = hash; this.url = url; this.route = route; this.majorParameter = majorParameter; this.global = global; this.retryAfter = retryAfter; this.sublimitTimeout = sublimitTimeout; this.scope = scope; }"
        ]
      },
      "REST": {
        "kind": "class",
        "source": "lib/REST.ts",
        "methods": [
          {
            "name": "get",
            "static": false,
            "signature": "public async get(fullRoute: RouteLike, options: RequestData = {}) { return this.request({ ...options, fullRoute, method: RequestMethod.Get }); }"
          },
          {
            "name": "delete",
            "static": false,
            "signature": "public async delete(fullRoute: RouteLike, options: RequestData = {}) { return this.request({ ...options, fullRoute, method: RequestMethod.Delete }); }"
          },
          {
            "name": "post",
            "static": false,
            "signature": "public async post(fullRoute: RouteLike, options: RequestData = {}) { return this.request({ ...options, fullRoute, method: RequestMethod.Post }); }"
          },
          {
            "name": "put",
            "static": false,
            "signature": "public async put(fullRoute: RouteLike, options: RequestData = {}) { return this.request({ ...options, fullRoute, method: RequestMethod.Put }); }"
          },
          {
            "name": "patch",
            "static": false,
            "signature": "public async patch(fullRoute: RouteLike, options: RequestData = {}) { return this.request({ ...options, fullRoute, method: RequestMethod.Patch }); }"
          },
          {
            "name": "request",
            "static": false,
            "signature": "public async request(options: InternalRequest) { const response = await this.queueRequest(options); return parseResponse(response); }"
          },
          {
            "name": "setAgent",
            "static": false,
            "signature": "public setAgent(agent: Dispatcher) { this.agent = agent; return this; }"
          },
          {
            "name": "setToken",
            "static": false,
            "signature": "public setToken(token: string) { this.#token = token; return this; }"
          },
          {
            "name": "queueRequest",
            "static": false,
            "signature": "public async queueRequest(request: InternalRequest): Promise<ResponseLike> { // Generalize the endpoint to its route data const routeId = REST.generateRouteData(request.fullRoute, request.method); // Get the bucket hash for the generic route, or point to a global route otherwise const hash = this.hashes.get(`${request.method}:${routeId.bucketRoute}`) ?? { value: `Global(${request.method}:${routeId.bucketRoute})`, lastAccess: -1, }; // Get the request handler for the obtained hash, with its major parameter const handler = this.handlers.get(`${hash.value}:${routeId.majorParameter}`) ?? this.createHandler(hash.value, routeId.majorParameter); // Resolve the request into usable fetch options const { url, fetchOptions } = await this.resolveRequest(request); // Queue the request return handler.queueRequest(routeId, url, fetchOptions, { body: request.body, files: request.files, auth: request.auth !== false, signal: request.signal, }); }"
          },
          {
            "name": "clearHashSweeper",
            "static": false,
            "signature": "public clearHashSweeper() { clearInterval(this.hashTimer); }"
          },
          {
            "name": "clearHandlerSweeper",
            "static": false,
            "signature": "public clearHandlerSweeper() { clearInterval(this.handlerTimer); }"
          }
        ],
        "properties": [
          {
            "name": "agent",
            "kind": "property",
            "static": false,
            "signature": "public agent: Dispatcher | null = null;"
          },
          {
            "name": "cdn",
            "kind": "property",
            "static": false,
            "signature": "public readonly cdn: CDN;"
          },
          {
            "name": "globalRemaining",
            "kind": "property",
            "static": false,
            "signature": "public globalRemaining: number;"
          },
          {
            "name": "globalDelay",
            "kind": "property",
            "static": false,
            "signature": "public globalDelay: Promise<void> | null = null;"
          },
          {
            "name": "globalReset",
            "kind": "property",
            "static": false,
            "signature": "public globalReset = -1;"
          },
          {
            "name": "hashes",
            "kind": "property",
            "static": false,
            "signature": "public readonly hashes = new Collection<string, HashData>();"
          },
          {
            "name": "handlers",
            "kind": "property",
            "static": false,
            "signature": "public readonly handlers = new Collection<string, IHandler>();"
          },
          {
            "name": "#token",
            "kind": "property",
            "static": false,
            "signature": "#token: string | null = null;"
          },
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: RESTOptions;"
          }
        ],
        "constructors": [
          "public constructor(options: Partial<RESTOptions> = {}) { super(); this.cdn = new CDN(options.cdn ?? DefaultRestOptions.cdn, options.mediaProxy ?? DefaultRestOptions.mediaProxy); this.options = { ...DefaultRestOptions, ...options }; this.globalRemaining = Math.max(1, this.options.globalRequestsPerSecond); this.agent = options.agent ?? null; // Start sweepers this.setupSweepers(); }"
        ]
      },
      "RestEvents": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "handlerSweep",
            "kind": "property",
            "static": false,
            "signature": "handlerSweep: [sweptHandlers: Collection<string, IHandler>];"
          },
          {
            "name": "hashSweep",
            "kind": "property",
            "static": false,
            "signature": "hashSweep: [sweptHashes: Collection<string, HashData>];"
          },
          {
            "name": "invalidRequestWarning",
            "kind": "property",
            "static": false,
            "signature": "invalidRequestWarning: [invalidRequestInfo: InvalidRequestWarningData];"
          },
          {
            "name": "rateLimited",
            "kind": "property",
            "static": false,
            "signature": "rateLimited: [rateLimitInfo: RateLimitData];"
          },
          {
            "name": "response",
            "kind": "property",
            "static": false,
            "signature": "response: [request: APIRequest, response: ResponseLike];"
          },
          {
            "name": "restDebug",
            "kind": "property",
            "static": false,
            "signature": "restDebug: [info: string];"
          }
        ],
        "constructors": []
      },
      "RestEventsMap": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "RESTOptions": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [
          {
            "name": "makeRequest",
            "static": false,
            "signature": "makeRequest(url: string, init: RequestInit): Promise<ResponseLike>;"
          }
        ],
        "properties": [
          {
            "name": "agent",
            "kind": "property",
            "static": false,
            "signature": "agent: Dispatcher | null;"
          },
          {
            "name": "api",
            "kind": "property",
            "static": false,
            "signature": "api: string;"
          },
          {
            "name": "authPrefix",
            "kind": "property",
            "static": false,
            "signature": "authPrefix: 'Bearer' | 'Bot';"
          },
          {
            "name": "cdn",
            "kind": "property",
            "static": false,
            "signature": "cdn: string;"
          },
          {
            "name": "globalRequestsPerSecond",
            "kind": "property",
            "static": false,
            "signature": "globalRequestsPerSecond: number;"
          },
          {
            "name": "handlerSweepInterval",
            "kind": "property",
            "static": false,
            "signature": "handlerSweepInterval: number;"
          },
          {
            "name": "hashLifetime",
            "kind": "property",
            "static": false,
            "signature": "hashLifetime: number;"
          },
          {
            "name": "hashSweepInterval",
            "kind": "property",
            "static": false,
            "signature": "hashSweepInterval: number;"
          },
          {
            "name": "headers",
            "kind": "property",
            "static": false,
            "signature": "headers: Record<string, string>;"
          },
          {
            "name": "invalidRequestWarningInterval",
            "kind": "property",
            "static": false,
            "signature": "invalidRequestWarningInterval: number;"
          },
          {
            "name": "mediaProxy",
            "kind": "property",
            "static": false,
            "signature": "mediaProxy: string;"
          },
          {
            "name": "offset",
            "kind": "property",
            "static": false,
            "signature": "offset: GetRateLimitOffsetFunction | number;"
          },
          {
            "name": "rejectOnRateLimit",
            "kind": "property",
            "static": false,
            "signature": "rejectOnRateLimit: RateLimitQueueFilter | string[] | null;"
          },
          {
            "name": "retries",
            "kind": "property",
            "static": false,
            "signature": "retries: number;"
          },
          {
            "name": "timeout",
            "kind": "property",
            "static": false,
            "signature": "timeout: number;"
          },
          {
            "name": "userAgentAppendix",
            "kind": "property",
            "static": false,
            "signature": "userAgentAppendix: string;"
          },
          {
            "name": "version",
            "kind": "property",
            "static": false,
            "signature": "version: string;"
          }
        ],
        "constructors": []
      },
      "RateLimitData": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "global",
            "kind": "property",
            "static": false,
            "signature": "global: boolean;"
          },
          {
            "name": "hash",
            "kind": "property",
            "static": false,
            "signature": "hash: string;"
          },
          {
            "name": "limit",
            "kind": "property",
            "static": false,
            "signature": "limit: number;"
          },
          {
            "name": "majorParameter",
            "kind": "property",
            "static": false,
            "signature": "majorParameter: string;"
          },
          {
            "name": "method",
            "kind": "property",
            "static": false,
            "signature": "method: string;"
          },
          {
            "name": "retryAfter",
            "kind": "property",
            "static": false,
            "signature": "retryAfter: number;"
          },
          {
            "name": "route",
            "kind": "property",
            "static": false,
            "signature": "route: string;"
          },
          {
            "name": "scope",
            "kind": "property",
            "static": false,
            "signature": "scope: 'global' | 'shared' | 'user';"
          },
          {
            "name": "sublimitTimeout",
            "kind": "property",
            "static": false,
            "signature": "sublimitTimeout: number;"
          },
          {
            "name": "timeToReset",
            "kind": "property",
            "static": false,
            "signature": "timeToReset: number;"
          },
          {
            "name": "url",
            "kind": "property",
            "static": false,
            "signature": "url: string;"
          }
        ],
        "constructors": []
      },
      "APIRequest": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "data: HandlerRequestData;"
          },
          {
            "name": "method",
            "kind": "property",
            "static": false,
            "signature": "method: string;"
          },
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "options: RequestInit;"
          },
          {
            "name": "path",
            "kind": "property",
            "static": false,
            "signature": "path: RouteLike;"
          },
          {
            "name": "retries",
            "kind": "property",
            "static": false,
            "signature": "retries: number;"
          },
          {
            "name": "route",
            "kind": "property",
            "static": false,
            "signature": "route: string;"
          }
        ],
        "constructors": []
      },
      "ResponseLike": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "body",
            "kind": "property",
            "static": false,
            "signature": "body: Readable | ReadableStream | null;"
          }
        ],
        "constructors": []
      },
      "InvalidRequestWarningData": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "count",
            "kind": "property",
            "static": false,
            "signature": "count: number;"
          },
          {
            "name": "remainingTime",
            "kind": "property",
            "static": false,
            "signature": "remainingTime: number;"
          }
        ],
        "constructors": []
      },
      "RawFile": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "contentType",
            "kind": "property",
            "static": false,
            "signature": "contentType?: string;"
          },
          {
            "name": "data",
            "kind": "property",
            "static": false,
            "signature": "data: Buffer | Uint8Array | boolean | number | string;"
          },
          {
            "name": "key",
            "kind": "property",
            "static": false,
            "signature": "key?: string;"
          },
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "name: string;"
          }
        ],
        "constructors": []
      },
      "RequestData": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "appendToFormData",
            "kind": "property",
            "static": false,
            "signature": "appendToFormData?: boolean;"
          },
          {
            "name": "auth",
            "kind": "property",
            "static": false,
            "signature": "auth?: boolean;"
          },
          {
            "name": "authPrefix",
            "kind": "property",
            "static": false,
            "signature": "authPrefix?: 'Bearer' | 'Bot';"
          },
          {
            "name": "body",
            "kind": "property",
            "static": false,
            "signature": "body?: BodyInit | unknown;"
          },
          {
            "name": "dispatcher",
            "kind": "property",
            "static": false,
            "signature": "dispatcher?: Agent;"
          },
          {
            "name": "files",
            "kind": "property",
            "static": false,
            "signature": "files?: RawFile[] | undefined;"
          },
          {
            "name": "headers",
            "kind": "property",
            "static": false,
            "signature": "headers?: Record<string, string>;"
          },
          {
            "name": "passThroughBody",
            "kind": "property",
            "static": false,
            "signature": "passThroughBody?: boolean;"
          },
          {
            "name": "query",
            "kind": "property",
            "static": false,
            "signature": "query?: URLSearchParams;"
          },
          {
            "name": "reason",
            "kind": "property",
            "static": false,
            "signature": "reason?: string | undefined;"
          },
          {
            "name": "signal",
            "kind": "property",
            "static": false,
            "signature": "signal?: AbortSignal | undefined;"
          },
          {
            "name": "versioned",
            "kind": "property",
            "static": false,
            "signature": "versioned?: boolean;"
          }
        ],
        "constructors": []
      },
      "RequestHeaders": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "Authorization",
            "kind": "property",
            "static": false,
            "signature": "Authorization?: string;"
          },
          {
            "name": "User-Agent",
            "kind": "property",
            "static": false,
            "signature": "'User-Agent': string;"
          },
          {
            "name": "X-Audit-Log-Reason",
            "kind": "property",
            "static": false,
            "signature": "'X-Audit-Log-Reason'?: string;"
          }
        ],
        "constructors": []
      },
      "InternalRequest": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "fullRoute",
            "kind": "property",
            "static": false,
            "signature": "fullRoute: RouteLike;"
          },
          {
            "name": "method",
            "kind": "property",
            "static": false,
            "signature": "method: RequestMethod;"
          }
        ],
        "constructors": []
      },
      "RouteData": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "bucketRoute",
            "kind": "property",
            "static": false,
            "signature": "bucketRoute: string;"
          },
          {
            "name": "majorParameter",
            "kind": "property",
            "static": false,
            "signature": "majorParameter: string;"
          },
          {
            "name": "original",
            "kind": "property",
            "static": false,
            "signature": "original: RouteLike;"
          }
        ],
        "constructors": []
      },
      "HashData": {
        "kind": "interface",
        "source": "lib/utils/types.ts",
        "methods": [],
        "properties": [
          {
            "name": "lastAccess",
            "kind": "property",
            "static": false,
            "signature": "lastAccess: number;"
          },
          {
            "name": "value",
            "kind": "property",
            "static": false,
            "signature": "value: string;"
          }
        ],
        "constructors": []
      },
      "MakeURLSearchParamsOptions": {
        "kind": "interface",
        "source": "lib/utils/utils.ts",
        "methods": [],
        "properties": [
          {
            "name": "arrayFormat",
            "kind": "property",
            "static": false,
            "signature": "arrayFormat?: 'comma' | 'repeat';"
          }
        ],
        "constructors": []
      }
    },
    "functions": [
      {
        "name": "makeURLSearchParams",
        "signature": "export function makeURLSearchParams<ParametersType extends object>( parameters?: Readonly<ParametersType>, options: MakeURLSearchParamsOptions = {}, ) { const params = new URLSearchParams(); if (!parameters) return params; const { arrayFormat = 'repeat' } = options; for (const [key, value] of Object.entries(parameters)) { if (Array.isArray(value)) { const commaSeparatedElements: string[] | null = arrayFormat === 'comma' ? [] : null; for (const element of value) { const serialized = serializeSearchParam(element); if (serialized === null) { continue; } if (commaSeparatedElements) { commaSeparatedElements.push(serialized); } else { params.append(key, serialized); } } if (commaSeparatedElements?.length) { params.append(key, commaSeparatedElements.join(',')); } continue; } const serialized = serializeSearchParam(value); if (serialized !== null) params.append(key, serialized); } return params; }",
        "source": "utils.ts"
      },
      {
        "name": "parseResponse",
        "signature": "export async function parseResponse(res: ResponseLike): Promise<unknown> { if (res.headers.get('Content-Type')?.startsWith('application/json')) { return res.json(); } return res.arrayBuffer(); }",
        "source": "utils.ts"
      },
      {
        "name": "hasSublimit",
        "signature": "export function hasSublimit(bucketRoute: string, body?: unknown, method?: string): boolean { // TODO: Update for new sublimits // Currently known sublimits: // Editing channel `name` or `topic` if (bucketRoute === '/channels/:id') { if (typeof body !== 'object' || body === null) return false; // This should never be a POST body, but just in case if (method !== RequestMethod.Patch) return false; const castedBody = body as RESTPatchAPIChannelJSONBody; return ['name', 'topic'].some((key) => Reflect.has(castedBody, key)); } // If we are checking if a request has a sublimit on a route not checked above, sublimit all requests to avoid a flood of 429s return true; }",
        "source": "utils.ts"
      },
      {
        "name": "shouldRetry",
        "signature": "export function shouldRetry(error: Error | NodeJS.ErrnoException) { // Retry for possible timed out requests if (error.name === 'AbortError') return true; // Downlevel ECONNRESET to retry as it may be recoverable return ('code' in error && error.code === 'ECONNRESET') || error.message.includes('ECONNRESET'); }",
        "source": "utils.ts"
      },
      {
        "name": "onRateLimit",
        "signature": "export async function onRateLimit(manager: REST, rateLimitData: RateLimitData) { const { options } = manager; if (!options.rejectOnRateLimit) return; const shouldThrow = typeof options.rejectOnRateLimit === 'function' ? await options.rejectOnRateLimit(rateLimitData) : options.rejectOnRateLimit.some((route) => rateLimitData.route.startsWith(route.toLowerCase())); if (shouldThrow) { throw new RateLimitError(rateLimitData); } }",
        "source": "utils.ts"
      },
      {
        "name": "calculateUserDefaultAvatarIndex",
        "signature": "export function calculateUserDefaultAvatarIndex(userId: Snowflake) { return Number(BigInt(userId) >> 22n) % 6; }",
        "source": "utils.ts"
      },
      {
        "name": "sleep",
        "signature": "export async function sleep(ms: number): Promise<void> { return new Promise<void>((resolve) => { setTimeout(() => resolve(), ms); }); }",
        "source": "utils.ts"
      },
      {
        "name": "isBufferLike",
        "signature": "export function isBufferLike(value: unknown): value is ArrayBuffer | Buffer | Uint8Array | Uint8ClampedArray { return value instanceof ArrayBuffer || value instanceof Uint8Array || value instanceof Uint8ClampedArray; }",
        "source": "utils.ts"
      },
      {
        "name": "deprecationWarning",
        "signature": "export function deprecationWarning(message: string) { if (typeof globalThis.process === 'undefined') { console.warn(`${DEPRECATION_WARNING_PREFIX}: ${message}`); } else { process.emitWarning(message, DEPRECATION_WARNING_PREFIX); } }",
        "source": "utils.ts"
      },
      {
        "name": "normalizeRateLimitOffset",
        "signature": "export function normalizeRateLimitOffset(offset: GetRateLimitOffsetFunction | number, route: string): number { if (typeof offset === 'number') { return Math.max(0, offset); } const result = offset(route); return Math.max(0, result); }",
        "source": "utils.ts"
      }
    ],
    "constants": [
      "version",
      "DefaultUserAgent",
      "DefaultUserAgentAppendix",
      "DefaultRestOptions",
      "ALLOWED_EXTENSIONS",
      "ALLOWED_STICKER_EXTENSIONS",
      "ALLOWED_SIZES",
      "OverwrittenMimeTypes",
      "BurstHandlerMajorIdKey",
      "DEPRECATION_WARNING_PREFIX"
    ],
    "stats": {
      "files": 10,
      "entities": 29,
      "methods": 36,
      "properties": 116,
      "functions": 10,
      "constants": 10
    }
  },
  "util": {
    "files": 12,
    "entities": {
      "JSONEncodable": {
        "kind": "interface",
        "source": "JSONEncodable.ts",
        "methods": [
          {
            "name": "toJSON",
            "static": false,
            "signature": "toJSON(): Value;"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "Equatable": {
        "kind": "interface",
        "source": "Equatable.ts",
        "methods": [
          {
            "name": "equals",
            "static": false,
            "signature": "equals(other: Value): boolean;"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "GatewayRateLimitError": {
        "kind": "class",
        "source": "gatewayRateLimitError.ts",
        "methods": [],
        "properties": [
          {
            "name": "name",
            "kind": "property",
            "static": false,
            "signature": "public override readonly name = GatewayRateLimitError.name;"
          }
        ],
        "constructors": [
          "public constructor( /** * The data associated with the rate limit event */ public readonly data: GatewayRateLimitedDispatchData<keyof GatewayOpcodeRateLimitMetadataMap>, /** * The payload data that lead to this rate limit * * @privateRemarks * Too complicated to type properly here (i.e. extract the ['data'] * of event payloads that have t = keyof GatewayOpcodeRateLimitMetadataMap) */ public readonly payload: unknown, ) { super(`Request with opcode ${data.opcode} was rate limited. Retry after ${data.retry_after} seconds.`); }"
        ]
      },
      "RangeOptions": {
        "kind": "interface",
        "source": "functions/range.ts",
        "methods": [],
        "properties": [
          {
            "name": "end",
            "kind": "property",
            "static": false,
            "signature": "end: number;"
          },
          {
            "name": "start",
            "kind": "property",
            "static": false,
            "signature": "start: number;"
          },
          {
            "name": "step",
            "kind": "property",
            "static": false,
            "signature": "step?: number;"
          }
        ],
        "constructors": []
      }
    },
    "functions": [
      {
        "name": "isJSONEncodable",
        "signature": "export function isJSONEncodable(maybeEncodable: unknown): maybeEncodable is JSONEncodable<unknown> { return maybeEncodable !== null && typeof maybeEncodable === 'object' && 'toJSON' in maybeEncodable; }",
        "source": "JSONEncodable.ts"
      },
      {
        "name": "isEquatable",
        "signature": "export function isEquatable(maybeEquatable: unknown): maybeEquatable is Equatable<unknown> { return maybeEquatable !== null && typeof maybeEquatable === 'object' && 'equals' in maybeEquatable; }",
        "source": "Equatable.ts"
      },
      {
        "name": "lazy",
        "signature": "export function lazy<Value>(cb: () => Value): () => Value { let defaultValue: Value; // eslint-disable-next-line promise/prefer-await-to-callbacks return () => (defaultValue ??= cb()); }",
        "source": "lazy.ts"
      },
      {
        "name": "range",
        "signature": "export function* range(range: RangeOptions | number) { let rangeEnd: number; let start = 0; let step = 1; if (typeof range === 'number') { rangeEnd = range; } else { start = range.start; rangeEnd = range.end; step = range.step ?? 1; } for (let index = start; index < rangeEnd; index += step) { yield index; } }",
        "source": "range.ts"
      },
      {
        "name": "calculateShardId",
        "signature": "export function calculateShardId(guildId: string, shardCount: number) { return Number(BigInt(guildId) >> 22n) % shardCount; }",
        "source": "calculateShardId.ts"
      },
      {
        "name": "shouldUseGlobalFetchAndWebSocket",
        "signature": "export function shouldUseGlobalFetchAndWebSocket() { // Browser env and deno when ran directly if (typeof globalThis.process === 'undefined') { return 'fetch' in globalThis && 'WebSocket' in globalThis; } if ('versions' in globalThis.process) { return 'deno' in globalThis.process.versions || 'bun' in globalThis.process.versions; } return false; }",
        "source": "runtime.ts"
      },
      {
        "name": "getUserAgentAppendix",
        "signature": "export function getUserAgentAppendix(): string { // https://vercel.com/docs/concepts/functions/edge-functions/edge-runtime#check-if-you're-running-on-the-edge-runtime // @ts-expect-error Vercel Edge functions if (typeof globalThis.EdgeRuntime !== 'undefined') { return 'Vercel-Edge-Functions'; } // @ts-expect-error Cloudflare Workers if (typeof globalThis.R2 !== 'undefined' && typeof globalThis.WebSocketPair !== 'undefined') { // https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent return 'Cloudflare-Workers'; } // https://docs.netlify.com/edge-functions/api/#netlify-global-object // @ts-expect-error Netlify Edge functions if (typeof globalThis.Netlify !== 'undefined') { return 'Netlify-Edge-Functions'; } // Most (if not all) edge environments will have `process` defined. Within a web browser we'll extract it using `navigator.userAgent`. if (typeof globalThis.process !== 'object') { // @ts-expect-error web env if (typeof globalThis.navigator === 'object') { // @ts-expect-error web env return globalThis.navigator.userAgent; } return 'UnknownEnvironment'; } if ('versions' in globalThis.process) { if ('deno' in globalThis.process.versions) { return `Deno/${globalThis.process.versions.deno}`; } if ('bun' in globalThis.process.versions) { return `Bun/${globalThis.process.versions.bun}`; } if ('node' in globalThis.process.versions) { return `Node.js/${globalThis.process.versions.node}`; } } return 'UnknownEnvironment'; }",
        "source": "userAgentAppendix.ts"
      },
      {
        "name": "polyfillDispose",
        "signature": "export function polyfillDispose() { // Polyfill for `Symbol.dispose` and `Symbol.asyncDispose` if not available. // Taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management // @ts-expect-error This is a polyfill, so it's fine to write Symbol.dispose ??= Symbol('Symbol.dispose'); // @ts-expect-error Same as above Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); }",
        "source": "polyfillDispose.ts"
      }
    ],
    "constants": [
      "version"
    ],
    "stats": {
      "files": 12,
      "entities": 4,
      "methods": 2,
      "properties": 4,
      "functions": 8,
      "constants": 1
    }
  },
  "ws": {
    "files": 13,
    "entities": {
      "FetchingStrategyOptions": {
        "kind": "interface",
        "source": "strategies/context/IContextFetchingStrategy.ts",
        "methods": [],
        "properties": [
          {
            "name": "gatewayInformation",
            "kind": "property",
            "static": false,
            "signature": "readonly gatewayInformation: APIGatewayBotInfo;"
          },
          {
            "name": "shardCount",
            "kind": "property",
            "static": false,
            "signature": "readonly shardCount: number;"
          }
        ],
        "constructors": []
      },
      "IContextFetchingStrategy": {
        "kind": "interface",
        "source": "strategies/context/IContextFetchingStrategy.ts",
        "methods": [
          {
            "name": "retrieveSessionInfo",
            "static": false,
            "signature": "retrieveSessionInfo(shardId: number): Awaitable<SessionInfo | null>;"
          },
          {
            "name": "updateSessionInfo",
            "static": false,
            "signature": "updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): Awaitable<void>;"
          },
          {
            "name": "waitForIdentify",
            "static": false,
            "signature": "waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;"
          }
        ],
        "properties": [
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "readonly options: FetchingStrategyOptions;"
          }
        ],
        "constructors": []
      },
      "SimpleContextFetchingStrategy": {
        "kind": "class",
        "source": "strategies/context/SimpleContextFetchingStrategy.ts",
        "methods": [
          {
            "name": "retrieveSessionInfo",
            "static": false,
            "signature": "public async retrieveSessionInfo(shardId: number): Promise<SessionInfo | null> { return this.manager.options.retrieveSessionInfo(shardId); }"
          },
          {
            "name": "updateSessionInfo",
            "static": false,
            "signature": "public updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null) { return this.manager.options.updateSessionInfo(shardId, sessionInfo); }"
          },
          {
            "name": "waitForIdentify",
            "static": false,
            "signature": "public async waitForIdentify(shardId: number, signal: AbortSignal): Promise<void> { const throttler = await SimpleContextFetchingStrategy.ensureThrottler(this.manager); await throttler.waitForIdentify(shardId, signal); }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor( private readonly manager: WebSocketManager, public readonly options: FetchingStrategyOptions, ) {}"
        ]
      },
      "WorkerContextFetchingStrategy": {
        "kind": "class",
        "source": "strategies/context/WorkerContextFetchingStrategy.ts",
        "methods": [
          {
            "name": "retrieveSessionInfo",
            "static": false,
            "signature": "public async retrieveSessionInfo(shardId: number): Promise<SessionInfo | null> { const nonce = Math.random(); const payload: WorkerReceivePayload = { op: WorkerReceivePayloadOp.RetrieveSessionInfo, shardId, nonce, }; // eslint-disable-next-line no-promise-executor-return const promise = new Promise<SessionInfo | null>((resolve) => this.sessionPromises.set(nonce, resolve)); parentPort!.postMessage(payload); return promise; }"
          },
          {
            "name": "updateSessionInfo",
            "static": false,
            "signature": "public updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null) { const payload: WorkerReceivePayload = { op: WorkerReceivePayloadOp.UpdateSessionInfo, shardId, session: sessionInfo, }; parentPort!.postMessage(payload); }"
          },
          {
            "name": "waitForIdentify",
            "static": false,
            "signature": "public async waitForIdentify(shardId: number, signal: AbortSignal): Promise<void> { const nonce = Math.random(); const payload: WorkerReceivePayload = { op: WorkerReceivePayloadOp.WaitForIdentify, nonce, shardId, }; const promise = new Promise<void>((resolve, reject) => // eslint-disable-next-line no-promise-executor-return this.waitForIdentifyPromises.set(nonce, { signal, resolve, reject }), ); parentPort!.postMessage(payload); const listener = () => { const payload: WorkerReceivePayload = { op: WorkerReceivePayloadOp.CancelIdentify, nonce, }; parentPort!.postMessage(payload); }; signal.addEventListener('abort', listener); try { await promise; } finally { signal.removeEventListener('abort', listener); } }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(public readonly options: FetchingStrategyOptions) { if (isMainThread) { throw new Error('Cannot instantiate WorkerContextFetchingStrategy on the main thread'); } parentPort!.on('message', (payload: WorkerSendPayload) => { if (payload.op === WorkerSendPayloadOp.SessionInfoResponse) { this.sessionPromises.get(payload.nonce)?.(payload.session); this.sessionPromises.delete(payload.nonce); } if (payload.op === WorkerSendPayloadOp.ShardIdentifyResponse) { const promise = this.waitForIdentifyPromises.get(payload.nonce); if (payload.ok) { promise?.resolve(); } else { // We need to make sure we reject with an abort error promise?.reject(promise.signal.reason); } this.waitForIdentifyPromises.delete(payload.nonce); } }); }"
        ]
      },
      "IShardingStrategy": {
        "kind": "interface",
        "source": "strategies/sharding/IShardingStrategy.ts",
        "methods": [
          {
            "name": "connect",
            "static": false,
            "signature": "connect(): Awaitable<void>;"
          },
          {
            "name": "destroy",
            "static": false,
            "signature": "destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>): Awaitable<void>;"
          },
          {
            "name": "fetchStatus",
            "static": false,
            "signature": "fetchStatus(): Awaitable<Collection<number, WebSocketShardStatus>>;"
          },
          {
            "name": "send",
            "static": false,
            "signature": "send(shardId: number, payload: GatewaySendPayload): Awaitable<void>;"
          },
          {
            "name": "spawn",
            "static": false,
            "signature": "spawn(shardIds: number[]): Awaitable<void>;"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "SimpleShardingStrategy": {
        "kind": "class",
        "source": "strategies/sharding/SimpleShardingStrategy.ts",
        "methods": [
          {
            "name": "spawn",
            "static": false,
            "signature": "public async spawn(shardIds: number[]) { const strategyOptions = await managerToFetchingStrategyOptions(this.manager); for (const shardId of shardIds) { const strategy = new SimpleContextFetchingStrategy(this.manager, strategyOptions); const shard = new WebSocketShard(strategy, shardId); for (const event of Object.values(WebSocketShardEvents)) { // @ts-expect-error Ugly casts are needed because when we try to collect all args, TS doesn't handle that nicely due to the strictness + lack of context shard.on(event, (...args) => this.manager.emit(event, ...args, shardId)); } this.shards.set(shardId, shard); } }"
          },
          {
            "name": "connect",
            "static": false,
            "signature": "public async connect() { const promises = []; for (const shard of this.shards.values()) { promises.push(shard.connect()); } await Promise.all(promises); }"
          },
          {
            "name": "destroy",
            "static": false,
            "signature": "public async destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>) { const promises = []; for (const shard of this.shards.values()) { promises.push(shard.destroy(options)); } await Promise.all(promises); this.shards.clear(); }"
          },
          {
            "name": "send",
            "static": false,
            "signature": "public async send(shardId: number, payload: GatewaySendPayload) { const shard = this.shards.get(shardId); if (!shard) { throw new RangeError(`Shard ${shardId} not found`); } return shard.send(payload); }"
          },
          {
            "name": "fetchStatus",
            "static": false,
            "signature": "public async fetchStatus() { return this.shards.mapValues((shard) => shard.status); }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(manager: WebSocketManager) { this.manager = manager; }"
        ]
      },
      "WorkerData": {
        "kind": "interface",
        "source": "strategies/sharding/WorkerShardingStrategy.ts",
        "methods": [],
        "properties": [
          {
            "name": "shardIds",
            "kind": "property",
            "static": false,
            "signature": "shardIds: number[];"
          }
        ],
        "constructors": []
      },
      "WorkerShardingStrategyOptions": {
        "kind": "interface",
        "source": "strategies/sharding/WorkerShardingStrategy.ts",
        "methods": [
          {
            "name": "unknownPayloadHandler",
            "static": false,
            "signature": "unknownPayloadHandler?(payload: any): unknown;"
          }
        ],
        "properties": [
          {
            "name": "shardsPerWorker",
            "kind": "property",
            "static": false,
            "signature": "shardsPerWorker: number | 'all';"
          },
          {
            "name": "workerPath",
            "kind": "property",
            "static": false,
            "signature": "workerPath?: string;"
          }
        ],
        "constructors": []
      },
      "WorkerShardingStrategy": {
        "kind": "class",
        "source": "strategies/sharding/WorkerShardingStrategy.ts",
        "methods": [
          {
            "name": "spawn",
            "static": false,
            "signature": "public async spawn(shardIds: number[]) { const shardsPerWorker = this.options.shardsPerWorker === 'all' ? shardIds.length : this.options.shardsPerWorker; const strategyOptions = await managerToFetchingStrategyOptions(this.manager); const loops = Math.ceil(shardIds.length / shardsPerWorker); const promises: Promise<void>[] = []; for (let idx = 0; idx < loops; idx++) { const slice = shardIds.slice(idx * shardsPerWorker, (idx + 1) * shardsPerWorker); const workerData: WorkerData = { ...strategyOptions, shardIds: slice, }; promises.push(this.setupWorker(workerData)); } await Promise.all(promises); }"
          },
          {
            "name": "connect",
            "static": false,
            "signature": "public async connect() { const promises = []; for (const [shardId, worker] of this.#workerByShardId.entries()) { const payload: WorkerSendPayload = { op: WorkerSendPayloadOp.Connect, shardId, }; // eslint-disable-next-line no-promise-executor-return const promise = new Promise<void>((resolve) => this.connectPromises.set(shardId, resolve)); worker.postMessage(payload); promises.push(promise); } await Promise.all(promises); }"
          },
          {
            "name": "destroy",
            "static": false,
            "signature": "public async destroy(options: Omit<WebSocketShardDestroyOptions, 'recover'> = {}) { const promises = []; for (const [shardId, worker] of this.#workerByShardId.entries()) { const payload: WorkerSendPayload = { op: WorkerSendPayloadOp.Destroy, shardId, options, }; promises.push( // eslint-disable-next-line no-promise-executor-return, promise/prefer-await-to-then new Promise<void>((resolve) => this.destroyPromises.set(shardId, resolve)).then(async () => worker.terminate()), ); worker.postMessage(payload); } this.#workers = []; this.#workerByShardId.clear(); await Promise.all(promises); }"
          },
          {
            "name": "send",
            "static": false,
            "signature": "public send(shardId: number, data: GatewaySendPayload) { const worker = this.#workerByShardId.get(shardId); if (!worker) { throw new Error(`No worker found for shard ${shardId}`); } const payload: WorkerSendPayload = { op: WorkerSendPayloadOp.Send, shardId, payload: data, }; worker.postMessage(payload); }"
          },
          {
            "name": "fetchStatus",
            "static": false,
            "signature": "public async fetchStatus() { const statuses = new Collection<number, WebSocketShardStatus>(); for (const [shardId, worker] of this.#workerByShardId.entries()) { const nonce = Math.random(); const payload: WorkerSendPayload = { op: WorkerSendPayloadOp.FetchStatus, shardId, nonce, }; // eslint-disable-next-line no-promise-executor-return const promise = new Promise<WebSocketShardStatus>((resolve) => this.fetchStatusPromises.set(nonce, resolve)); worker.postMessage(payload); const status = await promise; statuses.set(shardId, status); } return statuses; }"
          }
        ],
        "properties": [
          {
            "name": "#workers",
            "kind": "property",
            "static": false,
            "signature": "#workers: Worker[] = [];"
          },
          {
            "name": "#workerByShardId",
            "kind": "property",
            "static": false,
            "signature": "readonly #workerByShardId = new Collection<number, Worker>();"
          }
        ],
        "constructors": [
          "public constructor(manager: WebSocketManager, options: WorkerShardingStrategyOptions) { this.manager = manager; this.options = options; }"
        ]
      },
      "IIdentifyThrottler": {
        "kind": "interface",
        "source": "throttling/IIdentifyThrottler.ts",
        "methods": [
          {
            "name": "waitForIdentify",
            "static": false,
            "signature": "waitForIdentify(shardId: number, signal: AbortSignal): Promise<void>;"
          }
        ],
        "properties": [],
        "constructors": []
      },
      "IdentifyState": {
        "kind": "interface",
        "source": "throttling/SimpleIdentifyThrottler.ts",
        "methods": [],
        "properties": [
          {
            "name": "queue",
            "kind": "property",
            "static": false,
            "signature": "queue: AsyncQueue;"
          },
          {
            "name": "resetsAt",
            "kind": "property",
            "static": false,
            "signature": "resetsAt: number;"
          }
        ],
        "constructors": []
      },
      "SimpleIdentifyThrottler": {
        "kind": "class",
        "source": "throttling/SimpleIdentifyThrottler.ts",
        "methods": [
          {
            "name": "waitForIdentify",
            "static": false,
            "signature": "public async waitForIdentify(shardId: number, signal: AbortSignal): Promise<void> { const key = shardId % this.maxConcurrency; const state = this.states.ensure(key, () => { return { queue: new AsyncQueue(), resetsAt: Number.POSITIVE_INFINITY, }; }); await state.queue.wait({ signal }); try { const diff = state.resetsAt - Date.now(); if (diff > 0 && diff <= 5_000) { // To account for the latency the IDENTIFY payload goes through, we add a bit more wait time const time = diff + Math.random() * 1_500; await sleep(time); } state.resetsAt = Date.now() + 5_000; } finally { state.queue.shift(); } }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor(private readonly maxConcurrency: number) {}"
        ]
      },
      "BootstrapOptions": {
        "kind": "interface",
        "source": "utils/WorkerBootstrapper.ts",
        "methods": [
          {
            "name": "shardCallback",
            "static": false,
            "signature": "shardCallback?(shard: WebSocketShard): Awaitable<void>;"
          }
        ],
        "properties": [
          {
            "name": "forwardEvents",
            "kind": "property",
            "static": false,
            "signature": "forwardEvents?: WebSocketShardEvents[];"
          }
        ],
        "constructors": []
      },
      "WorkerBootstrapper": {
        "kind": "class",
        "source": "utils/WorkerBootstrapper.ts",
        "methods": [
          {
            "name": "bootstrap",
            "static": false,
            "signature": "public async bootstrap(options: Readonly<BootstrapOptions> = {}): Promise<void> { // Start by initializing the shards for (const shardId of this.data.shardIds) { const shard = new WebSocketShard(new WorkerContextFetchingStrategy(this.data), shardId); for (const event of options.forwardEvents ?? Object.values(WebSocketShardEvents)) { shard.on(event, (...args: unknown[]) => { const payload: WorkerReceivePayload = { op: WorkerReceivePayloadOp.Event, event, data: args, shardId, }; parentPort!.postMessage(payload); }); } // Any additional setup the user might want to do await options.shardCallback?.(shard); this.shards.set(shardId, shard); } // Lastly, start listening to messages from the parent thread this.setupThreadEvents(); const message: WorkerReceivePayload = { op: WorkerReceivePayloadOp.WorkerReady, }; parentPort!.postMessage(message); }"
          }
        ],
        "properties": [],
        "constructors": [
          "public constructor() { if (isMainThread) { throw new Error('Expected WorkerBootstrap to not be used within the main thread'); } }"
        ]
      },
      "ShardRange": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [
          {
            "name": "end",
            "kind": "property",
            "static": false,
            "signature": "end: number;"
          },
          {
            "name": "start",
            "kind": "property",
            "static": false,
            "signature": "start: number;"
          }
        ],
        "constructors": []
      },
      "SessionInfo": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [
          {
            "name": "resumeURL",
            "kind": "property",
            "static": false,
            "signature": "resumeURL: string;"
          },
          {
            "name": "sequence",
            "kind": "property",
            "static": false,
            "signature": "sequence: number;"
          },
          {
            "name": "sessionId",
            "kind": "property",
            "static": false,
            "signature": "sessionId: string;"
          },
          {
            "name": "shardCount",
            "kind": "property",
            "static": false,
            "signature": "shardCount: number;"
          },
          {
            "name": "shardId",
            "kind": "property",
            "static": false,
            "signature": "shardId: number;"
          }
        ],
        "constructors": []
      },
      "RequiredWebSocketManagerOptions": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [
          {
            "name": "intents",
            "kind": "property",
            "static": false,
            "signature": "intents: GatewayIntentBits | 0;"
          },
          {
            "name": "rest",
            "kind": "property",
            "static": false,
            "signature": "rest: REST;"
          }
        ],
        "constructors": []
      },
      "OptionalWebSocketManagerOptions": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [
          {
            "name": "buildIdentifyThrottler",
            "static": false,
            "signature": "buildIdentifyThrottler(manager: WebSocketManager): Awaitable<IIdentifyThrottler>;"
          },
          {
            "name": "buildStrategy",
            "static": false,
            "signature": "buildStrategy(manager: WebSocketManager): IShardingStrategy;"
          },
          {
            "name": "retrieveSessionInfo",
            "static": false,
            "signature": "retrieveSessionInfo(shardId: number): Awaitable<SessionInfo | null>;"
          },
          {
            "name": "updateSessionInfo",
            "static": false,
            "signature": "updateSessionInfo(shardId: number, sessionInfo: SessionInfo | null): Awaitable<void>;"
          }
        ],
        "properties": [
          {
            "name": "compression",
            "kind": "property",
            "static": false,
            "signature": "compression: CompressionMethod | null;"
          },
          {
            "name": "encoding",
            "kind": "property",
            "static": false,
            "signature": "encoding: Encoding;"
          },
          {
            "name": "handshakeTimeout",
            "kind": "property",
            "static": false,
            "signature": "handshakeTimeout: number | null;"
          },
          {
            "name": "helloTimeout",
            "kind": "property",
            "static": false,
            "signature": "helloTimeout: number | null;"
          },
          {
            "name": "identifyProperties",
            "kind": "property",
            "static": false,
            "signature": "identifyProperties: GatewayIdentifyProperties;"
          },
          {
            "name": "initialPresence",
            "kind": "property",
            "static": false,
            "signature": "initialPresence: GatewayPresenceUpdateData | null;"
          },
          {
            "name": "largeThreshold",
            "kind": "property",
            "static": false,
            "signature": "largeThreshold: number | null;"
          },
          {
            "name": "readyTimeout",
            "kind": "property",
            "static": false,
            "signature": "readyTimeout: number | null;"
          },
          {
            "name": "shardCount",
            "kind": "property",
            "static": false,
            "signature": "shardCount: number | null;"
          },
          {
            "name": "shardIds",
            "kind": "property",
            "static": false,
            "signature": "shardIds: number[] | ShardRange | null;"
          },
          {
            "name": "token",
            "kind": "property",
            "static": false,
            "signature": "token: string;"
          },
          {
            "name": "useIdentifyCompression",
            "kind": "property",
            "static": false,
            "signature": "useIdentifyCompression: boolean;"
          },
          {
            "name": "version",
            "kind": "property",
            "static": false,
            "signature": "version: string;"
          }
        ],
        "constructors": []
      },
      "WebSocketManagerOptions": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "CreateWebSocketManagerOptions": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [],
        "constructors": []
      },
      "ManagerShardEventsMap": {
        "kind": "interface",
        "source": "ws/WebSocketManager.ts",
        "methods": [],
        "properties": [
          {
            "name": "[WebSocketShardEvents.Closed]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Closed]: [code: number, shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Debug]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Debug]: [message: string, shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Dispatch]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Dispatch]: [payload: GatewayDispatchPayload, shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Error]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Error]: [error: Error, shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Hello]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Hello]: [shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Ready]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Ready]: [data: GatewayReadyDispatchData, shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.Resumed]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Resumed]: [shardId: number];"
          },
          {
            "name": "[WebSocketShardEvents.HeartbeatComplete]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.HeartbeatComplete]: [ stats: { ackAt: number; heartbeatAt: number; latency: number }, shardId: number, ];"
          },
          {
            "name": "[WebSocketShardEvents.SocketError]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.SocketError]: [error: Error, shardId: number];"
          }
        ],
        "constructors": []
      },
      "WebSocketManager": {
        "kind": "class",
        "source": "ws/WebSocketManager.ts",
        "methods": [
          {
            "name": "fetchGatewayInformation",
            "static": false,
            "signature": "public async fetchGatewayInformation(force = false) { if (this.gatewayInformation) { if (this.gatewayInformation.expiresAt <= Date.now()) { this.gatewayInformation = null; } else if (!force) { return this.gatewayInformation.data; } } const data = (await this.options.rest.get(Routes.gatewayBot())) as RESTGetAPIGatewayBotResult; // For single sharded bots session_start_limit.reset_after will be 0, use 5 seconds as a minimum expiration time this.gatewayInformation = { data, expiresAt: Date.now() + (data.session_start_limit.reset_after || 5_000) }; return this.gatewayInformation.data; }"
          },
          {
            "name": "updateShardCount",
            "static": false,
            "signature": "public async updateShardCount(shardCount: number | null) { await this.strategy.destroy({ reason: 'User is adjusting their shards' }); this.options.shardCount = shardCount; const shardIds = await this.getShardIds(true); await this.strategy.spawn(shardIds); return this; }"
          },
          {
            "name": "getShardCount",
            "static": false,
            "signature": "public async getShardCount(): Promise<number> { if (this.options.shardCount) { return this.options.shardCount; } const shardIds = await this.getShardIds(); return Math.max(...shardIds) + 1; }"
          },
          {
            "name": "getShardIds",
            "static": false,
            "signature": "public async getShardIds(force = false): Promise<number[]> { if (this.shardIds && !force) { return this.shardIds; } let shardIds: number[]; if (this.options.shardIds) { if (Array.isArray(this.options.shardIds)) { shardIds = this.options.shardIds; } else { const { start, end } = this.options.shardIds; shardIds = [...range({ start, end: end + 1 })]; } } else { const data = await this.fetchGatewayInformation(); shardIds = [...range(this.options.shardCount ?? data.shards)]; } this.shardIds = shardIds; return shardIds; }"
          },
          {
            "name": "connect",
            "static": false,
            "signature": "public async connect() { const shardCount = await this.getShardCount(); // Spawn shards and adjust internal state await this.updateShardCount(shardCount); const shardIds = await this.getShardIds(); const data = await this.fetchGatewayInformation(); if (data.session_start_limit.remaining < shardIds.length) { throw new Error( `Not enough sessions remaining to spawn ${shardIds.length} shards; only ${ data.session_start_limit.remaining } remaining; resets at ${new Date(Date.now() + data.session_start_limit.reset_after).toISOString()}`, ); } await this.strategy.connect(); }"
          },
          {
            "name": "setToken",
            "static": false,
            "signature": "public setToken(token: string): void { if (this.#token) { throw new Error('Token has already been set'); } this.#token = token; }"
          },
          {
            "name": "destroy",
            "static": false,
            "signature": "public destroy(options?: Omit<WebSocketShardDestroyOptions, 'recover'>) { return this.strategy.destroy(options); }"
          },
          {
            "name": "send",
            "static": false,
            "signature": "public send(shardId: number, payload: GatewaySendPayload) { return this.strategy.send(shardId, payload); }"
          },
          {
            "name": "fetchStatus",
            "static": false,
            "signature": "public fetchStatus() { return this.strategy.fetchStatus(); }"
          },
          {
            "name": "[Symbol.asyncDispose]",
            "static": false,
            "signature": "public async [Symbol.asyncDispose]() { await this.destroy(); }"
          }
        ],
        "properties": [
          {
            "name": "#token",
            "kind": "property",
            "static": false,
            "signature": "#token: string | null = null;"
          },
          {
            "name": "options",
            "kind": "property",
            "static": false,
            "signature": "public readonly options: Omit<WebSocketManagerOptions, 'token'>;"
          },
          {
            "name": "token",
            "kind": "getter",
            "static": false,
            "signature": "public get token(): string { if (!this.#token) { throw new Error('Token has not been set'); } return this.#token; }"
          }
        ],
        "constructors": [
          "public constructor(options: CreateWebSocketManagerOptions) { super(); this.options = { ...DefaultWebSocketManagerOptions, ...options }; this.strategy = this.options.buildStrategy(this); this.#token = options.token ?? null; }"
        ]
      },
      "WebSocketShardEventsMap": {
        "kind": "interface",
        "source": "ws/WebSocketShard.ts",
        "methods": [],
        "properties": [
          {
            "name": "[WebSocketShardEvents.Closed]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Closed]: [code: number];"
          },
          {
            "name": "[WebSocketShardEvents.Debug]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Debug]: [message: string];"
          },
          {
            "name": "[WebSocketShardEvents.Dispatch]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Dispatch]: [payload: GatewayDispatchPayload];"
          },
          {
            "name": "[WebSocketShardEvents.Error]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Error]: [error: Error];"
          },
          {
            "name": "[WebSocketShardEvents.Hello]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Hello]: [];"
          },
          {
            "name": "[WebSocketShardEvents.Ready]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Ready]: [payload: GatewayReadyDispatchData];"
          },
          {
            "name": "[WebSocketShardEvents.Resumed]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.Resumed]: [];"
          },
          {
            "name": "[WebSocketShardEvents.HeartbeatComplete]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.HeartbeatComplete]: [stats: { ackAt: number; heartbeatAt: number; latency: number }];"
          },
          {
            "name": "[WebSocketShardEvents.SocketError]",
            "kind": "property",
            "static": false,
            "signature": "[WebSocketShardEvents.SocketError]: [error: Error];"
          }
        ],
        "constructors": []
      },
      "WebSocketShardDestroyOptions": {
        "kind": "interface",
        "source": "ws/WebSocketShard.ts",
        "methods": [],
        "properties": [
          {
            "name": "code",
            "kind": "property",
            "static": false,
            "signature": "code?: number;"
          },
          {
            "name": "reason",
            "kind": "property",
            "static": false,
            "signature": "reason?: string;"
          },
          {
            "name": "recover",
            "kind": "property",
            "static": false,
            "signature": "recover?: WebSocketShardDestroyRecovery;"
          }
        ],
        "constructors": []
      },
      "SendRateLimitState": {
        "kind": "interface",
        "source": "ws/WebSocketShard.ts",
        "methods": [],
        "properties": [
          {
            "name": "resetAt",
            "kind": "property",
            "static": false,
            "signature": "resetAt: number;"
          },
          {
            "name": "sent",
            "kind": "property",
            "static": false,
            "signature": "sent: number;"
          }
        ],
        "constructors": []
      },
      "WebSocketShard": {
        "kind": "class",
        "source": "ws/WebSocketShard.ts",
        "methods": [
          {
            "name": "connect",
            "static": false,
            "signature": "public async connect() { const controller = new AbortController(); let promise; if (!this.initialConnectResolved) { // Sleep for the remaining time, but if the connection closes in the meantime, we shouldn't wait the remainder to avoid blocking the new conn promise = Promise.race([ once(this, WebSocketShardEvents.Ready, { signal: controller.signal }), once(this, WebSocketShardEvents.Resumed, { signal: controller.signal }), ]); } void this.internalConnect(); try { await promise; } finally { // cleanup hanging listeners controller.abort(); } this.initialConnectResolved = true; }"
          },
          {
            "name": "destroy",
            "static": false,
            "signature": "public async destroy(options: WebSocketShardDestroyOptions = {}) { if (this.#status === WebSocketShardStatus.Idle) { this.debug(['Tried to destroy a shard that was idle']); return; } if (!options.code) { options.code = options.recover === WebSocketShardDestroyRecovery.Resume ? CloseCodes.Resuming : CloseCodes.Normal; } this.debug([ 'Destroying shard', `Reason: ${options.reason ?? 'none'}`, `Code: ${options.code}`, `Recover: ${options.recover === undefined ? 'none' : WebSocketShardDestroyRecovery[options.recover]!}`, ]); // Reset state this.isAck = true; if (this.heartbeatInterval) { clearInterval(this.heartbeatInterval); } if (this.initialHeartbeatTimeoutController) { this.initialHeartbeatTimeoutController.abort(); this.initialHeartbeatTimeoutController = null; } this.lastHeartbeatAt = -1; for (const controller of this.timeoutAbortControllers.values()) { controller.abort(); } this.timeoutAbortControllers.clear(); this.failedToConnectDueToNetworkError = false; // Clear session state if applicable if (options.recover !== WebSocketShardDestroyRecovery.Resume) { await this.strategy.updateSessionInfo(this.id, null); } if (this.connection) { // No longer need to listen to messages this.connection.onmessage = null; // Prevent a reconnection loop by unbinding the main close event this.connection.onclose = null; const shouldClose = this.connection.readyState === WebSocket.OPEN; this.debug([ 'Connection status during destroy', `Needs closing: ${shouldClose}`, `Ready state: ${this.connection.readyState}`, ]); if (shouldClose) { let outerResolve: () => void; const promise = new Promise<void>((resolve) => { outerResolve = resolve; }); this.connection.onclose = outerResolve!; this.connection.close(options.code, options.reason); await promise; this.emit(WebSocketShardEvents.Closed, options.code); } // Lastly, remove the error event. // Doing this earlier would cause a hard crash in case an error event fired on our `close` call this.connection.onerror = null; } else { this.debug(['Destroying a shard that has no connection; please open an issue on GitHub']); } this.#status = WebSocketShardStatus.Idle; if (options.recover !== undefined) { // There's cases (like no internet connection) where we immediately fail to connect, // causing a very fast and draining reconnection loop. await sleep(500); return this.internalConnect(); } }"
          },
          {
            "name": "send",
            "static": false,
            "signature": "public async send(payload: GatewaySendPayload): Promise<void> { if (!this.connection) { throw new Error(\"WebSocketShard wasn't connected\"); } // Generally, the way we treat payloads is 115/60 seconds. The actual limit is 120/60, so we have a bit of leeway. // We use that leeway for those special payloads that we just fire with no checking, since there's no shot we ever // send more than 5 of those in a 60 second interval. This way we can avoid more complex queueing logic. if (ImportantGatewayOpcodes.has(payload.op)) { this.connection.send(JSON.stringify(payload)); return; } if (this.#status !== WebSocketShardStatus.Ready && !ImportantGatewayOpcodes.has(payload.op)) { this.debug(['Tried to send a non-crucial payload before the shard was ready, waiting']); // This will throw if the shard throws an error event in the meantime, just requeue the payload try { await once(this, WebSocketShardEvents.Ready); } catch { return this.send(payload); } } await this.sendQueue.wait(); const now = Date.now(); if (now >= this.sendRateLimitState.resetAt) { this.sendRateLimitState = getInitialSendRateLimitState(); } if (this.sendRateLimitState.sent + 1 >= 115) { // Sprinkle in a little randomness just in case. const sleepFor = this.sendRateLimitState.resetAt - now + Math.random() * 1_500; this.debug([`Was about to hit the send rate limit, sleeping for ${sleepFor}ms`]); const controller = new AbortController(); // Sleep for the remaining time, but if the connection closes in the meantime, we shouldn't wait the remainder to avoid blocking the new conn const interrupted = await Promise.race([ sleep(sleepFor).then(() => false), once(this, WebSocketShardEvents.Closed, { signal: controller.signal }).then(() => true), ]); if (interrupted) { this.debug(['Connection closed while waiting for the send rate limit to reset, re-queueing payload']); this.sendQueue.shift(); return this.send(payload); } // This is so the listener from the `once` call is removed controller.abort(); } this.sendRateLimitState.sent++; this.sendQueue.shift(); this.connection.send(JSON.stringify(payload)); }"
          }
        ],
        "properties": [
          {
            "name": "id",
            "kind": "property",
            "static": false,
            "signature": "public readonly id: number;"
          },
          {
            "name": "#status",
            "kind": "property",
            "static": false,
            "signature": "#status: WebSocketShardStatus = WebSocketShardStatus.Idle;"
          },
          {
            "name": "status",
            "kind": "getter",
            "static": false,
            "signature": "public get status(): WebSocketShardStatus { return this.#status; }"
          }
        ],
        "constructors": [
          "public constructor(strategy: IContextFetchingStrategy, id: number) { super(); this.strategy = strategy; this.id = id; }"
        ]
      }
    },
    "functions": [
      {
        "name": "managerToFetchingStrategyOptions",
        "signature": "export async function managerToFetchingStrategyOptions(manager: WebSocketManager): Promise<FetchingStrategyOptions> { return { compression: manager.options.compression, encoding: manager.options.encoding, handshakeTimeout: manager.options.handshakeTimeout, helloTimeout: manager.options.helloTimeout, identifyProperties: manager.options.identifyProperties, initialPresence: manager.options.initialPresence, intents: manager.options.intents, largeThreshold: manager.options.largeThreshold, readyTimeout: manager.options.readyTimeout, token: manager.token, useIdentifyCompression: manager.options.useIdentifyCompression, version: manager.options.version, gatewayInformation: await manager.fetchGatewayInformation(), shardCount: await manager.getShardCount(), }; }",
        "source": "IContextFetchingStrategy.ts"
      },
      {
        "name": "getInitialSendRateLimitState",
        "signature": "export function getInitialSendRateLimitState(): SendRateLimitState { return { sent: 0, resetAt: Date.now() + 60_000, }; }",
        "source": "constants.ts"
      }
    ],
    "constants": [
      "version",
      "DefaultDeviceProperty",
      "CompressionParameterMap",
      "DefaultWebSocketManagerOptions",
      "ImportantGatewayOpcodes"
    ],
    "stats": {
      "files": 13,
      "entities": 26,
      "methods": 46,
      "properties": 62,
      "functions": 2,
      "constants": 5
    }
  },
  "collection": {
    "files": 2,
    "entities": {
      "CollectionConstructor": {
        "kind": "interface",
        "source": "collection.ts",
        "methods": [],
        "properties": [
          {
            "name": "prototype",
            "kind": "property",
            "static": false,
            "signature": "readonly prototype: Collection<unknown, unknown>;"
          },
          {
            "name": "[Symbol.species]",
            "kind": "property",
            "static": false,
            "signature": "readonly [Symbol.species]: CollectionConstructor;"
          }
        ],
        "constructors": []
      },
      "Collection": {
        "kind": "class",
        "source": "collection.ts",
        "methods": [
          {
            "name": "ensure",
            "static": false,
            "signature": "public ensure(key: Key, defaultValueGenerator: (key: Key, collection: this) => Value): Value { if (this.has(key)) return this.get(key)!; if (typeof defaultValueGenerator !== 'function') throw new TypeError(`${defaultValueGenerator} is not a function`); const defaultValue = defaultValueGenerator(key, this); this.set(key, defaultValue); return defaultValue; }"
          },
          {
            "name": "hasAll",
            "static": false,
            "signature": "public hasAll(...keys: Key[]) { return keys.every((key) => super.has(key)); }"
          },
          {
            "name": "hasAny",
            "static": false,
            "signature": "public hasAny(...keys: Key[]) { return keys.some((key) => super.has(key)); }"
          },
          {
            "name": "first",
            "static": false,
            "signature": "public first(): Value | undefined;"
          },
          {
            "name": "first",
            "static": false,
            "signature": "public first(amount: number): Value[];"
          },
          {
            "name": "first",
            "static": false,
            "signature": "public first(amount?: number): Value | Value[] | undefined { if (amount === undefined) return this.values().next().value; if (amount < 0) return this.last(amount * -1); amount = Math.min(this.size, amount); const iter = this.values(); return Array.from({ length: amount }, (): Value => iter.next().value!); }"
          },
          {
            "name": "firstKey",
            "static": false,
            "signature": "public firstKey(): Key | undefined;"
          },
          {
            "name": "firstKey",
            "static": false,
            "signature": "public firstKey(amount: number): Key[];"
          },
          {
            "name": "firstKey",
            "static": false,
            "signature": "public firstKey(amount?: number): Key | Key[] | undefined { if (amount === undefined) return this.keys().next().value; if (amount < 0) return this.lastKey(amount * -1); amount = Math.min(this.size, amount); const iter = this.keys(); return Array.from({ length: amount }, (): Key => iter.next().value!); }"
          },
          {
            "name": "last",
            "static": false,
            "signature": "public last(): Value | undefined;"
          },
          {
            "name": "last",
            "static": false,
            "signature": "public last(amount: number): Value[];"
          },
          {
            "name": "last",
            "static": false,
            "signature": "public last(amount?: number): Value | Value[] | undefined { const arr = [...this.values()]; if (amount === undefined) return arr[arr.length - 1]; if (amount < 0) return this.first(amount * -1); if (!amount) return []; return arr.slice(-amount); }"
          },
          {
            "name": "lastKey",
            "static": false,
            "signature": "public lastKey(): Key | undefined;"
          },
          {
            "name": "lastKey",
            "static": false,
            "signature": "public lastKey(amount: number): Key[];"
          },
          {
            "name": "lastKey",
            "static": false,
            "signature": "public lastKey(amount?: number): Key | Key[] | undefined { const arr = [...this.keys()]; if (amount === undefined) return arr[arr.length - 1]; if (amount < 0) return this.firstKey(amount * -1); if (!amount) return []; return arr.slice(-amount); }"
          },
          {
            "name": "at",
            "static": false,
            "signature": "public at(index: number) { index = Math.floor(index); const arr = [...this.values()]; return arr.at(index); }"
          },
          {
            "name": "keyAt",
            "static": false,
            "signature": "public keyAt(index: number) { index = Math.floor(index); const arr = [...this.keys()]; return arr.at(index); }"
          },
          {
            "name": "random",
            "static": false,
            "signature": "public random(): Value | undefined;"
          },
          {
            "name": "random",
            "static": false,
            "signature": "public random(amount: number): Value[];"
          },
          {
            "name": "random",
            "static": false,
            "signature": "public random(amount?: number): Value | Value[] | undefined { const arr = [...this.values()]; if (amount === undefined) return arr[Math.floor(Math.random() * arr.length)]; if (!arr.length || !amount) return []; return Array.from( { length: Math.min(amount, arr.length) }, (): Value => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]!, ); }"
          },
          {
            "name": "randomKey",
            "static": false,
            "signature": "public randomKey(): Key | undefined;"
          },
          {
            "name": "randomKey",
            "static": false,
            "signature": "public randomKey(amount: number): Key[];"
          },
          {
            "name": "randomKey",
            "static": false,
            "signature": "public randomKey(amount?: number): Key | Key[] | undefined { const arr = [...this.keys()]; if (amount === undefined) return arr[Math.floor(Math.random() * arr.length)]; if (!arr.length || !amount) return []; return Array.from( { length: Math.min(amount, arr.length) }, (): Key => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]!, ); }"
          },
          {
            "name": "reverse",
            "static": false,
            "signature": "public reverse() { const entries = [...this.entries()].reverse(); this.clear(); for (const [key, value] of entries) this.set(key, value); return this; }"
          },
          {
            "name": "find",
            "static": false,
            "signature": "public find<NewValue extends Value>( fn: (value: Value, key: Key, collection: this) => value is NewValue, ): NewValue | undefined;"
          },
          {
            "name": "find",
            "static": false,
            "signature": "public find(fn: (value: Value, key: Key, collection: this) => unknown): Value | undefined;"
          },
          {
            "name": "find",
            "static": false,
            "signature": "public find<This, NewValue extends Value>( fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This, ): NewValue | undefined;"
          },
          {
            "name": "find",
            "static": false,
            "signature": "public find<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): Value | undefined;"
          },
          {
            "name": "find",
            "static": false,
            "signature": "public find(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): Value | undefined { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); for (const [key, val] of this) { if (fn(val, key, this)) return val; } return undefined; }"
          },
          {
            "name": "findKey",
            "static": false,
            "signature": "public findKey<NewKey extends Key>( fn: (value: Value, key: Key, collection: this) => key is NewKey, ): NewKey | undefined;"
          },
          {
            "name": "findKey",
            "static": false,
            "signature": "public findKey(fn: (value: Value, key: Key, collection: this) => unknown): Key | undefined;"
          },
          {
            "name": "findKey",
            "static": false,
            "signature": "public findKey<This, NewKey extends Key>( fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This, ): NewKey | undefined;"
          },
          {
            "name": "findKey",
            "static": false,
            "signature": "public findKey<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): Key | undefined;"
          },
          {
            "name": "findKey",
            "static": false,
            "signature": "public findKey(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): Key | undefined { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); for (const [key, val] of this) { if (fn(val, key, this)) return key; } return undefined; }"
          },
          {
            "name": "findLast",
            "static": false,
            "signature": "public findLast<NewValue extends Value>( fn: (value: Value, key: Key, collection: this) => value is NewValue, ): NewValue | undefined;"
          },
          {
            "name": "findLast",
            "static": false,
            "signature": "public findLast(fn: (value: Value, key: Key, collection: this) => unknown): Value | undefined;"
          },
          {
            "name": "findLast",
            "static": false,
            "signature": "public findLast<This, NewValue extends Value>( fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This, ): NewValue | undefined;"
          },
          {
            "name": "findLast",
            "static": false,
            "signature": "public findLast<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): Value | undefined;"
          },
          {
            "name": "findLast",
            "static": false,
            "signature": "public findLast(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): Value | undefined { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const entries = [...this.entries()]; for (let index = entries.length - 1; index >= 0; index--) { const val = entries[index]![1]; const key = entries[index]![0]; if (fn(val, key, this)) return val; } return undefined; }"
          },
          {
            "name": "findLastKey",
            "static": false,
            "signature": "public findLastKey<NewKey extends Key>( fn: (value: Value, key: Key, collection: this) => key is NewKey, ): NewKey | undefined;"
          },
          {
            "name": "findLastKey",
            "static": false,
            "signature": "public findLastKey(fn: (value: Value, key: Key, collection: this) => unknown): Key | undefined;"
          },
          {
            "name": "findLastKey",
            "static": false,
            "signature": "public findLastKey<This, NewKey extends Key>( fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This, ): NewKey | undefined;"
          },
          {
            "name": "findLastKey",
            "static": false,
            "signature": "public findLastKey<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): Key | undefined;"
          },
          {
            "name": "findLastKey",
            "static": false,
            "signature": "public findLastKey(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): Key | undefined { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const entries = [...this.entries()]; for (let index = entries.length - 1; index >= 0; index--) { const key = entries[index]![0]; const val = entries[index]![1]; if (fn(val, key, this)) return key; } return undefined; }"
          },
          {
            "name": "sweep",
            "static": false,
            "signature": "public sweep(fn: (value: Value, key: Key, collection: this) => unknown): number;"
          },
          {
            "name": "sweep",
            "static": false,
            "signature": "public sweep<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): number;"
          },
          {
            "name": "sweep",
            "static": false,
            "signature": "public sweep(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): number { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const previousSize = this.size; for (const [key, val] of this) { if (fn(val, key, this)) this.delete(key); } return previousSize - this.size; }"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter<NewKey extends Key>( fn: (value: Value, key: Key, collection: this) => key is NewKey, ): Collection<NewKey, Value>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter<NewValue extends Value>( fn: (value: Value, key: Key, collection: this) => value is NewValue, ): Collection<Key, NewValue>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter(fn: (value: Value, key: Key, collection: this) => unknown): Collection<Key, Value>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter<This, NewKey extends Key>( fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This, ): Collection<NewKey, Value>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter<This, NewValue extends Value>( fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This, ): Collection<Key, NewValue>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): Collection<Key, Value>;"
          },
          {
            "name": "filter",
            "static": false,
            "signature": "public filter(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): Collection<Key, Value> { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const results = new this.constructor[Symbol.species]<Key, Value>(); for (const [key, val] of this) { if (fn(val, key, this)) results.set(key, val); } return results; }"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition<NewKey extends Key>( fn: (value: Value, key: Key, collection: this) => key is NewKey, ): [Collection<NewKey, Value>, Collection<Exclude<Key, NewKey>, Value>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition<NewValue extends Value>( fn: (value: Value, key: Key, collection: this) => value is NewValue, ): [Collection<Key, NewValue>, Collection<Key, Exclude<Value, NewValue>>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition( fn: (value: Value, key: Key, collection: this) => unknown, ): [Collection<Key, Value>, Collection<Key, Value>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition<This, NewKey extends Key>( fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This, ): [Collection<NewKey, Value>, Collection<Exclude<Key, NewKey>, Value>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition<This, NewValue extends Value>( fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This, ): [Collection<Key, NewValue>, Collection<Key, Exclude<Value, NewValue>>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition<This>( fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This, ): [Collection<Key, Value>, Collection<Key, Value>];"
          },
          {
            "name": "partition",
            "static": false,
            "signature": "public partition( fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown, ): [Collection<Key, Value>, Collection<Key, Value>] { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const results: [Collection<Key, Value>, Collection<Key, Value>] = [ new this.constructor[Symbol.species]<Key, Value>(), new this.constructor[Symbol.species]<Key, Value>(), ]; for (const [key, val] of this) { if (fn(val, key, this)) { results[0].set(key, val); } else { results[1].set(key, val); } } return results; }"
          },
          {
            "name": "flatMap",
            "static": false,
            "signature": "public flatMap<NewValue>( fn: (value: Value, key: Key, collection: this) => Collection<Key, NewValue>, ): Collection<Key, NewValue>;"
          },
          {
            "name": "flatMap",
            "static": false,
            "signature": "public flatMap<NewValue, This>( fn: (this: This, value: Value, key: Key, collection: this) => Collection<Key, NewValue>, thisArg: This, ): Collection<Key, NewValue>;"
          },
          {
            "name": "flatMap",
            "static": false,
            "signature": "public flatMap<NewValue>( fn: (value: Value, key: Key, collection: this) => Collection<Key, NewValue>, thisArg?: unknown, ): Collection<Key, NewValue> { // eslint-disable-next-line unicorn/no-array-method-this-argument const collections = this.map(fn, thisArg); return new this.constructor[Symbol.species]<Key, NewValue>().concat(...collections); }"
          },
          {
            "name": "map",
            "static": false,
            "signature": "public map<NewValue>(fn: (value: Value, key: Key, collection: this) => NewValue): NewValue[];"
          },
          {
            "name": "map",
            "static": false,
            "signature": "public map<This, NewValue>( fn: (this: This, value: Value, key: Key, collection: this) => NewValue, thisArg: This, ): NewValue[];"
          },
          {
            "name": "map",
            "static": false,
            "signature": "public map<NewValue>(fn: (value: Value, key: Key, collection: this) => NewValue, thisArg?: unknown): NewValue[] { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const iter = this.entries(); return Array.from({ length: this.size }, (): NewValue => { const [key, value] = iter.next().value!; return fn(value, key, this); }); }"
          },
          {
            "name": "mapValues",
            "static": false,
            "signature": "public mapValues<NewValue>(fn: (value: Value, key: Key, collection: this) => NewValue): Collection<Key, NewValue>;"
          },
          {
            "name": "mapValues",
            "static": false,
            "signature": "public mapValues<This, NewValue>( fn: (this: This, value: Value, key: Key, collection: this) => NewValue, thisArg: This, ): Collection<Key, NewValue>;"
          },
          {
            "name": "mapValues",
            "static": false,
            "signature": "public mapValues<NewValue>( fn: (value: Value, key: Key, collection: this) => NewValue, thisArg?: unknown, ): Collection<Key, NewValue> { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); const coll = new this.constructor[Symbol.species]<Key, NewValue>(); for (const [key, val] of this) coll.set(key, fn(val, key, this)); return coll; }"
          },
          {
            "name": "some",
            "static": false,
            "signature": "public some(fn: (value: Value, key: Key, collection: this) => unknown): boolean;"
          },
          {
            "name": "some",
            "static": false,
            "signature": "public some<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): boolean;"
          },
          {
            "name": "some",
            "static": false,
            "signature": "public some(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): boolean { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); for (const [key, val] of this) { if (fn(val, key, this)) return true; } return false; }"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every<NewKey extends Key>( fn: (value: Value, key: Key, collection: this) => key is NewKey, ): this is Collection<NewKey, Value>;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every<NewValue extends Value>( fn: (value: Value, key: Key, collection: this) => value is NewValue, ): this is Collection<Key, NewValue>;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every(fn: (value: Value, key: Key, collection: this) => unknown): boolean;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every<This, NewKey extends Key>( fn: (this: This, value: Value, key: Key, collection: this) => key is NewKey, thisArg: This, ): this is Collection<NewKey, Value>;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every<This, NewValue extends Value>( fn: (this: This, value: Value, key: Key, collection: this) => value is NewValue, thisArg: This, ): this is Collection<Key, NewValue>;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every<This>(fn: (this: This, value: Value, key: Key, collection: this) => unknown, thisArg: This): boolean;"
          },
          {
            "name": "every",
            "static": false,
            "signature": "public every(fn: (value: Value, key: Key, collection: this) => unknown, thisArg?: unknown): boolean { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); for (const [key, val] of this) { if (!fn(val, key, this)) return false; } return true; }"
          },
          {
            "name": "reduce",
            "static": false,
            "signature": "public reduce( fn: (accumulator: Value, value: Value, key: Key, collection: this) => Value, initialValue?: Value, ): Value;"
          },
          {
            "name": "reduce",
            "static": false,
            "signature": "public reduce<InitialValue>( fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue: InitialValue, ): InitialValue;"
          },
          {
            "name": "reduce",
            "static": false,
            "signature": "public reduce<InitialValue>( fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue?: InitialValue, ): InitialValue { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); let accumulator!: InitialValue; const iterator = this.entries(); if (initialValue === undefined) { if (this.size === 0) throw new TypeError('Reduce of empty collection with no initial value'); accumulator = iterator.next().value![1] as unknown as InitialValue; } else { accumulator = initialValue; } for (const [key, value] of iterator) { accumulator = fn(accumulator, value, key, this); } return accumulator; }"
          },
          {
            "name": "reduceRight",
            "static": false,
            "signature": "public reduceRight( fn: (accumulator: Value, value: Value, key: Key, collection: this) => Value, initialValue?: Value, ): Value;"
          },
          {
            "name": "reduceRight",
            "static": false,
            "signature": "public reduceRight<InitialValue>( fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue: InitialValue, ): InitialValue;"
          },
          {
            "name": "reduceRight",
            "static": false,
            "signature": "public reduceRight<InitialValue>( fn: (accumulator: InitialValue, value: Value, key: Key, collection: this) => InitialValue, initialValue?: InitialValue, ): InitialValue { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); const entries = [...this.entries()]; let accumulator!: InitialValue; let index: number; if (initialValue === undefined) { if (entries.length === 0) throw new TypeError('Reduce of empty collection with no initial value'); accumulator = entries[entries.length - 1]![1] as unknown as InitialValue; index = entries.length - 1; } else { accumulator = initialValue; index = entries.length; } while (--index >= 0) { const key = entries[index]![0]; const val = entries[index]![1]; accumulator = fn(accumulator, val, key, this); } return accumulator; }"
          },
          {
            "name": "each",
            "static": false,
            "signature": "public each(fn: (value: Value, key: Key, collection: this) => void): this;"
          },
          {
            "name": "each",
            "static": false,
            "signature": "public each<This>(fn: (this: This, value: Value, key: Key, collection: this) => void, thisArg: This): this;"
          },
          {
            "name": "each",
            "static": false,
            "signature": "public each(fn: (value: Value, key: Key, collection: this) => void, thisArg?: unknown): this { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); for (const [key, value] of this) { fn(value, key, this); } return this; }"
          },
          {
            "name": "tap",
            "static": false,
            "signature": "public tap(fn: (collection: this) => void): this;"
          },
          {
            "name": "tap",
            "static": false,
            "signature": "public tap<This>(fn: (this: This, collection: this) => void, thisArg: This): this;"
          },
          {
            "name": "tap",
            "static": false,
            "signature": "public tap(fn: (collection: this) => void, thisArg?: unknown): this { if (typeof fn !== 'function') throw new TypeError(`${fn} is not a function`); if (thisArg !== undefined) fn = fn.bind(thisArg); fn(this); return this; }"
          },
          {
            "name": "clone",
            "static": false,
            "signature": "public clone(): Collection<Key, Value> { return new this.constructor[Symbol.species](this); }"
          },
          {
            "name": "concat",
            "static": false,
            "signature": "public concat(...collections: ReadonlyCollection<Key, Value>[]) { const newColl = this.clone(); for (const coll of collections) { for (const [key, val] of coll) newColl.set(key, val); } return newColl; }"
          },
          {
            "name": "equals",
            "static": false,
            "signature": "public equals(collection: ReadonlyCollection<Key, Value>) { if (!collection) return false; // runtime check if (this === collection) return true; if (this.size !== collection.size) return false; for (const [key, value] of this) { if (!collection.has(key) || value !== collection.get(key)) { return false; } } return true; }"
          },
          {
            "name": "sort",
            "static": false,
            "signature": "public sort(compareFunction: Comparator<Key, Value> = Collection.defaultSort) { const entries = [...this.entries()]; entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0])); // Perform clean-up super.clear(); // Set the new entries for (const [key, value] of entries) { super.set(key, value); } return this; }"
          },
          {
            "name": "intersection",
            "static": false,
            "signature": "public intersection(other: ReadonlyCollection<Key, any>): Collection<Key, Value> { const coll = new this.constructor[Symbol.species]<Key, Value>(); for (const [key, value] of this) { if (other.has(key)) coll.set(key, value); } return coll; }"
          },
          {
            "name": "union",
            "static": false,
            "signature": "public union<OtherValue>(other: ReadonlyCollection<Key, OtherValue>): Collection<Key, OtherValue | Value> { const coll = new this.constructor[Symbol.species]<Key, OtherValue | Value>(this); for (const [key, value] of other) { if (!coll.has(key)) coll.set(key, value); } return coll; }"
          },
          {
            "name": "difference",
            "static": false,
            "signature": "public difference(other: ReadonlyCollection<Key, any>): Collection<Key, Value> { const coll = new this.constructor[Symbol.species]<Key, Value>(); for (const [key, value] of this) { if (!other.has(key)) coll.set(key, value); } return coll; }"
          },
          {
            "name": "symmetricDifference",
            "static": false,
            "signature": "public symmetricDifference<OtherValue>( other: ReadonlyCollection<Key, OtherValue>, ): Collection<Key, OtherValue | Value> { const coll = new this.constructor[Symbol.species]<Key, OtherValue | Value>(); for (const [key, value] of this) { if (!other.has(key)) coll.set(key, value); } for (const [key, value] of other) { if (!this.has(key)) coll.set(key, value); } return coll; }"
          },
          {
            "name": "merge",
            "static": false,
            "signature": "public merge<OtherValue, ResultValue>( other: ReadonlyCollection<Key, OtherValue>, whenInSelf: (value: Value, key: Key) => Keep<ResultValue>, whenInOther: (valueOther: OtherValue, key: Key) => Keep<ResultValue>, whenInBoth: (value: Value, valueOther: OtherValue, key: Key) => Keep<ResultValue>, ): Collection<Key, ResultValue> { const coll = new this.constructor[Symbol.species]<Key, ResultValue>(); const keys = new Set([...this.keys(), ...other.keys()]); for (const key of keys) { const hasInSelf = this.has(key); const hasInOther = other.has(key); if (hasInSelf && hasInOther) { const result = whenInBoth(this.get(key)!, other.get(key)!, key); if (result.keep) coll.set(key, result.value); } else if (hasInSelf) { const result = whenInSelf(this.get(key)!, key); if (result.keep) coll.set(key, result.value); } else if (hasInOther) { const result = whenInOther(other.get(key)!, key); if (result.keep) coll.set(key, result.value); } } return coll; }"
          },
          {
            "name": "toReversed",
            "static": false,
            "signature": "public toReversed() { return new this.constructor[Symbol.species](this).reverse(); }"
          },
          {
            "name": "toSorted",
            "static": false,
            "signature": "public toSorted(compareFunction: Comparator<Key, Value> = Collection.defaultSort) { return new this.constructor[Symbol.species](this).sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk)); }"
          },
          {
            "name": "toJSON",
            "static": false,
            "signature": "public toJSON() { // toJSON is called recursively by JSON.stringify. return [...this.entries()]; }"
          },
          {
            "name": "combineEntries",
            "static": true,
            "signature": "public static combineEntries<Key, Value>( entries: Iterable<[Key, Value]>, combine: (firstValue: Value, secondValue: Value, key: Key) => Value, ): Collection<Key, Value> { const coll = new Collection<Key, Value>(); for (const [key, value] of entries) { if (coll.has(key)) { coll.set(key, combine(coll.get(key)!, value, key)); } else { coll.set(key, value); } } return coll; }"
          }
        ],
        "properties": [],
        "constructors": []
      }
    },
    "functions": [],
    "constants": [
      "version"
    ],
    "stats": {
      "files": 2,
      "entities": 2,
      "methods": 105,
      "properties": 2,
      "functions": 0,
      "constants": 1
    }
  }
} as const;

export type DiscordReexportPackage = keyof typeof DISCORD_REEXPORT_CATALOG;
export function hasReexportMethod(pkg: DiscordReexportPackage, owner: string, member: string): boolean {
  const entities = DISCORD_REEXPORT_CATALOG[pkg].entities as Record<string, { methods: readonly { name: string | null }[] }>;
  return entities[owner]?.methods.some((m) => m.name === member) ?? false;
}
