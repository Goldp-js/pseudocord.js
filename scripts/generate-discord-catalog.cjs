#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const input = process.argv[2];
const output = process.argv[3] ?? path.resolve('src/discord/catalog.generated.ts');
if (!input) {
  console.error('Uso: node scripts/generate-discord-catalog.cjs <index.d.ts> [salida]');
  process.exit(1);
}

const sourceText = fs.readFileSync(input, 'utf8');
const sf = ts.createSourceFile(input, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

const visible = (node) => !node.modifiers?.some((m) =>
  m.kind === ts.SyntaxKind.PrivateKeyword || m.kind === ts.SyntaxKind.ProtectedKeyword
);
const compact = (node) => node.getText(sf).replace(/\s+/g, ' ').trim();
const nameText = (name) => {
  if (!name) return undefined;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return name.getText(sf);
};
const heritage = (node, token) => {
  const clause = node.heritageClauses?.find((h) => h.token === token);
  return clause?.types.map((t) => compact(t)) ?? [];
};

const entities = {};
const exportedTypes = [];
const functions = [];
const aliases = [];
let events = {};

for (const st of sf.statements) {
  if (ts.isClassDeclaration(st) && st.name) {
    const methods = [];
    const properties = [];
    const constructors = [];
    for (const member of st.members) {
      if (!visible(member)) continue;
      if (ts.isConstructorDeclaration(member)) constructors.push(compact(member));
      else if (ts.isMethodDeclaration(member)) {
        methods.push({
          name: nameText(member.name),
          static: !!member.modifiers?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword),
          signature: compact(member),
        });
      } else if (ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member) || ts.isPropertyDeclaration(member)) {
        properties.push({
          name: nameText(member.name),
          kind: ts.isGetAccessorDeclaration(member) ? 'getter' : ts.isSetAccessorDeclaration(member) ? 'setter' : 'property',
          static: !!member.modifiers?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword),
          signature: compact(member),
        });
      }
    }
    entities[st.name.text] = {
      kind: 'class',
      extends: heritage(st, ts.SyntaxKind.ExtendsKeyword),
      implements: heritage(st, ts.SyntaxKind.ImplementsKeyword),
      constructors,
      methods,
      properties,
    };
    exportedTypes.push({ name: st.name.text, kind: 'class' });
  } else if (ts.isInterfaceDeclaration(st)) {
    const methods = [];
    const properties = [];
    for (const member of st.members) {
      if (ts.isMethodSignature(member)) {
        methods.push({ name: nameText(member.name), static: false, signature: compact(member) });
      } else if (ts.isPropertySignature(member) || ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member)) {
        properties.push({
          name: nameText(member.name),
          kind: ts.isGetAccessorDeclaration(member) ? 'getter' : ts.isSetAccessorDeclaration(member) ? 'setter' : 'property',
          static: false,
          signature: compact(member),
        });
      }
    }
    entities[st.name.text] = {
      kind: 'interface',
      extends: heritage(st, ts.SyntaxKind.ExtendsKeyword),
      implements: [],
      constructors: [],
      methods,
      properties,
    };
    exportedTypes.push({ name: st.name.text, kind: 'interface' });

    if (st.name.text === 'ClientEvents') {
      events = Object.fromEntries(st.members
        .filter(ts.isPropertySignature)
        .map((m) => [nameText(m.name), compact(m)]));
    }
  } else if (ts.isFunctionDeclaration(st) && st.name) {
    functions.push({ name: st.name.text, signature: compact(st) });
  } else if (ts.isTypeAliasDeclaration(st)) {
    exportedTypes.push({ name: st.name.text, kind: 'type' });
  } else if (ts.isEnumDeclaration(st)) {
    exportedTypes.push({ name: st.name.text, kind: 'enum' });
  } else if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
    for (const el of st.exportClause.elements) {
      aliases.push({ from: el.propertyName?.text ?? el.name.text, as: el.name.text, module: st.moduleSpecifier?.text ?? null });
    }
  }
}

const stats = {
  discordJsVersion: '14.28.0',
  generatedFrom: path.basename(input),
  classes: Object.values(entities).filter((e) => e.kind === 'class').length,
  interfaces: Object.values(entities).filter((e) => e.kind === 'interface').length,
  declaredMethods: Object.values(entities).reduce((n, e) => n + e.methods.length, 0),
  declaredProperties: Object.values(entities).reduce((n, e) => n + e.properties.length, 0),
  topLevelFunctions: functions.length,
  clientEvents: Object.keys(events).length,
};

const banner = `/**\n * AUTO-GENERADO desde discord.js 14.28.0 typings/index.d.ts.\n * No editar manualmente. Regenerar con scripts/generate-discord-catalog.cjs.\n */\n`;
const body = `${banner}
export const DISCORD_API_STATS = ${JSON.stringify(stats, null, 2)} as const;

export const DISCORD_API_ENTITIES = ${JSON.stringify(entities, null, 2)} as const;

export const DISCORD_TOP_LEVEL_FUNCTIONS = ${JSON.stringify(functions, null, 2)} as const;

export const DISCORD_CLIENT_EVENTS = ${JSON.stringify(events, null, 2)} as const;

export const DISCORD_EXPORTED_TYPES = ${JSON.stringify(exportedTypes, null, 2)} as const;

export const DISCORD_EXPORT_ALIASES = ${JSON.stringify(aliases, null, 2)} as const;

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
      const baseName = base.match(/^[A-Za-z_$][\\w$]*/)?.[0];
      if (baseName && hasDiscordEntity(baseName) && visit(baseName)) return true;
    }
    return false;
  };
  return visit(owner);
}
`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, body);
console.log(JSON.stringify(stats, null, 2));
