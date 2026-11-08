/** Analizador privado de la extensión de VS Code. */
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const [modulePath, sourceName = '<editor>'] = process.argv.slice(2);
if (!modulePath) {
  process.stderr.write('PseudoDiscord: falta la ruta del motor de análisis.\n');
  process.exitCode = 1;
} else {
  // Acceso directo a módulos internos desde el paquete instalado.
  // Estos módulos no forman parte de los exports públicos del paquete.
  const dir = dirname(resolve(modulePath));
  const internal = async (name) => import(pathToFileURL(resolve(dir, 'language', name)).href);
  const [{ parse }, { validate }, { diagnosticFromError }] = await Promise.all([
    internal('parser.js'), internal('validator.js'), internal('diagnostics.js')
  ]);
  let source = '';
  for await (const chunk of process.stdin) {
    source += String(chunk);
    if (source.length > 2_000_000) throw new Error('Diagnóstico: tamaño máximo de 2 MB excedido.');
  }
  try {
    const program = parse(source, sourceName);
    const result = validate(program, { strictNames: false });
    process.stdout.write(JSON.stringify({ diagnostics: result.diagnostics }) + '\n');
  } catch (error) {
    process.stdout.write(JSON.stringify({ diagnostics: [diagnosticFromError(error, sourceName)] }) + '\n');
  }
}
