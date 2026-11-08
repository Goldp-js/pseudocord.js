#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const base = process.argv[2];
const output = process.argv[3] ?? path.resolve('src/discord/reexports.generated.ts');
if (!base) {
  console.error('Uso: node scripts/generate-reexports-catalog.cjs <packages-dir> [salida]');
  process.exit(1);
}

const PACKAGES = ['builders', 'formatters', 'rest', 'util', 'ws', 'collection'];
const compact = (node, sf) => node.getText(sf).replace(/\s+/g, ' ').trim();
const visible = (node) => !node.modifiers?.some((m) => m.kind === ts.SyntaxKind.PrivateKeyword || m.kind === ts.SyntaxKind.ProtectedKeyword);
const memberName = (name, sf) => {
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return compact(name, sf);
};

function resolveRelative(from, spec) {
  const raw = path.resolve(path.dirname(from), spec.replace(/\.js$/, '.ts').replace(/\.mjs$/, '.ts'));
  const candidates = [raw, raw + '.ts', path.join(raw, 'index.ts')];
  return candidates.find((p) => fs.existsSync(p)) ?? null;
}

function reachableFiles(indexFile) {
  const seen = new Set();
  const queue = [indexFile];
  while (queue.length) {
    const file = queue.shift();
    if (!file || seen.has(file) || !fs.existsSync(file)) continue;
    seen.add(file);
    const source = fs.readFileSync(file, 'utf8');
    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const st of sf.statements) {
      if (ts.isExportDeclaration(st) && st.moduleSpecifier && ts.isStringLiteral(st.moduleSpecifier)) {
        const spec = st.moduleSpecifier.text;
        if (spec.startsWith('.')) {
          const next = resolveRelative(file, spec);
          if (next) queue.push(next);
        }
      }
    }
  }
  return [...seen];
}

function parsePackage(pkg) {
  const indexFile = path.join(base, pkg, 'src', 'index.ts');
  const files = reachableFiles(indexFile);
  const entities = {};
  const functions = [];
  const constants = [];

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const st of sf.statements) {
      if ((ts.isClassDeclaration(st) || ts.isInterfaceDeclaration(st)) && st.name) {
        const methods = [];
        const properties = [];
        const constructors = [];
        for (const m of st.members) {
          if (!visible(m)) continue;
          if (ts.isConstructorDeclaration(m)) constructors.push(compact(m, sf));
          else if (ts.isMethodDeclaration(m) || ts.isMethodSignature(m)) {
            methods.push({
              name: memberName(m.name, sf),
              static: !!m.modifiers?.some((x) => x.kind === ts.SyntaxKind.StaticKeyword),
              signature: compact(m, sf),
            });
          } else if (ts.isPropertyDeclaration(m) || ts.isPropertySignature(m) || ts.isGetAccessorDeclaration(m) || ts.isSetAccessorDeclaration(m)) {
            properties.push({
              name: memberName(m.name, sf),
              kind: ts.isGetAccessorDeclaration(m) ? 'getter' : ts.isSetAccessorDeclaration(m) ? 'setter' : 'property',
              static: !!m.modifiers?.some((x) => x.kind === ts.SyntaxKind.StaticKeyword),
              signature: compact(m, sf),
            });
          }
        }
        entities[st.name.text] = {
          kind: ts.isClassDeclaration(st) ? 'class' : 'interface',
          source: path.relative(path.join(base, pkg, 'src'), file).replaceAll('\\', '/'),
          methods,
          properties,
          constructors,
        };
      } else if (ts.isFunctionDeclaration(st) && st.name && st.modifiers?.some((x) => x.kind === ts.SyntaxKind.ExportKeyword)) {
        functions.push({ name: st.name.text, signature: compact(st, sf), source: path.basename(file) });
      } else if (ts.isVariableStatement(st) && st.modifiers?.some((x) => x.kind === ts.SyntaxKind.ExportKeyword)) {
        for (const d of st.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) constants.push(d.name.text);
        }
      }
    }
  }

  return {
    files: files.length,
    entities,
    functions,
    constants,
    stats: {
      files: files.length,
      entities: Object.keys(entities).length,
      methods: Object.values(entities).reduce((n, e) => n + e.methods.length, 0),
      properties: Object.values(entities).reduce((n, e) => n + e.properties.length, 0),
      functions: functions.length,
      constants: constants.length,
    },
  };
}

const catalog = Object.fromEntries(PACKAGES.map((p) => [p, parsePackage(p)]));
const stats = Object.fromEntries(PACKAGES.map((p) => [p, catalog[p].stats]));
const body = `/** AUTO-GENERADO desde los paquetes reexportados por discord.js 14.28.0. */\n` +
`export const DISCORD_REEXPORT_STATS = ${JSON.stringify(stats, null, 2)} as const;\n\n` +
`export const DISCORD_REEXPORT_CATALOG = ${JSON.stringify(catalog, null, 2)} as const;\n\n` +
`export type DiscordReexportPackage = keyof typeof DISCORD_REEXPORT_CATALOG;\n` +
`export function hasReexportMethod(pkg: DiscordReexportPackage, owner: string, member: string): boolean {\n` +
`  const entities = DISCORD_REEXPORT_CATALOG[pkg].entities as Record<string, { methods: readonly { name: string | null }[] }>;\n` +
`  return entities[owner]?.methods.some((m) => m.name === member) ?? false;\n` +
`}\n`;
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, body);
console.log(JSON.stringify(stats, null, 2));
