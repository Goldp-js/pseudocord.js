'use strict';
const vscode = require('vscode');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const MAX_SOURCE = 2_000_000;
const MAX_OUTPUT = 2_000_000;
const MAX_RUNTIME_MS = 10_000;

/** Localiza el motor de análisis en la instalación o compilación local. */
function findRunner(document) {
  const configured = vscode.workspace.getConfiguration('pseudodiscord').get('libraryPath');
  if (typeof configured === 'string' && configured.trim()) {
    const file = path.resolve(configured);
    return fs.existsSync(file) ? {file} : undefined;
  }
  let dir = path.dirname(document.uri.fsPath);
  for (let i = 0; i < 24; i++) {
    for (const relative of ['node_modules/pseudodiscord/dist/src/index.js', 'dist/src/index.js']) {
      const file = path.join(dir, relative);
      if (fs.existsSync(file)) return {file};
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

function documentRange(document, item) {
  const startLine = Math.min(document.lineCount - 1, Math.max(0, Number(item.line || 1) - 1));
  const startColumn = Math.min(document.lineAt(startLine).text.length, Math.max(0, Number(item.column || 1) - 1));
  const endLine = Number.isInteger(item.endLine)
    ? Math.min(document.lineCount - 1, Math.max(startLine, item.endLine - 1)) : startLine;
  const endColumn = Number.isInteger(item.endColumn)
    ? Math.min(document.lineAt(endLine).text.length, Math.max(0, item.endColumn - 1)) : startColumn + 1;
  const start = new vscode.Position(startLine, startColumn);
  const end = new vscode.Position(endLine, endColumn);
  if (end.isAfter(start)) return new vscode.Range(start, end);
  return document.getWordRangeAtPosition(start) ?? new vscode.Range(start, start);
}

function activate(context) {
  const collection = vscode.languages.createDiagnosticCollection('pseudodiscord');
  const output = vscode.window.createOutputChannel('PseudoDiscord Diagnostics');
  const scheduled = new Map();
  const running = new Map();
  let disposed = false;
  context.subscriptions.push(collection, output);

  function cancel(uri) {
    const id = uri.toString();
    if (scheduled.has(id)) clearTimeout(scheduled.get(id));
    scheduled.delete(id);
    const child = running.get(id);
    if (child) child.kill();
    running.delete(id);
  }

  function validateDocument(document) {
    if (disposed || document.isClosed || document.languageId !== 'pseudodiscord' || document.uri.scheme !== 'file') return;
    const id = document.uri.toString();
    const runner = findRunner(document);
    if (!runner) { collection.delete(document.uri); return; }
    const source = document.getText();
    if (source.length > MAX_SOURCE) {
      collection.delete(document.uri);
      output.appendLine(`Diagnóstico omitido (archivo superior a ${MAX_SOURCE} caracteres): ${document.uri.fsPath}`);
      return;
    }
    const version = document.version;
    const child = spawn(process.execPath, [path.join(__dirname,'diagnose.mjs'), runner.file, document.uri.fsPath], {
      cwd: path.dirname(runner.file), windowsHide: true, stdio: ['pipe', 'pipe', 'pipe']
    });
    running.set(id, child);
    let stdout = '', stderr = '', failed = false;
    const timeout = setTimeout(() => { failed = true; child.kill(); }, MAX_RUNTIME_MS);
    child.stdout.on('data', chunk => {
      stdout += String(chunk);
      if (stdout.length > MAX_OUTPUT) { failed = true; child.kill(); }
    });
    child.stderr.on('data', chunk => {
      if (stderr.length < 20_000) stderr += String(chunk).slice(0, 20_000 - stderr.length);
    });
    child.on('error', error => {
      failed = true;
      output.appendLine(`No se pudo iniciar el analizador: ${error.message}`);
    });
    child.on('close', exitCode => {
      clearTimeout(timeout);
      if (running.get(id) !== child) return;
      running.delete(id);
      if (disposed || document.isClosed || document.version !== version) return;
      if (failed || exitCode !== 0) {
        output.appendLine(`Diagnóstico no disponible (${exitCode ?? 'sin código'}): ${stderr || 'proceso cancelado o tiempo agotado'}`);
        return;
      }
      try {
        const result = JSON.parse(stdout);
        if (!Array.isArray(result.diagnostics)) throw new Error('Respuesta sin lista de diagnósticos.');
        const entries = result.diagnostics.map(item => {
          const severity = item.severity === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning;
          const explanation = item.hint ? `${item.message}\nAyuda: ${item.hint}` : item.message;
          const diagnostic = new vscode.Diagnostic(documentRange(document, item), explanation || 'Diagnóstico sin descripción.', severity);
          diagnostic.code = item.code;
          diagnostic.source = 'PseudoDiscord';
          return diagnostic;
        });
        collection.set(document.uri, entries);
      } catch (error) {
        output.appendLine(`Respuesta de diagnóstico inválida: ${error.message}`);
      }
    });
    child.stdin.on('error', () => { /* El proceso puede terminar al cancelar o cerrar el editor. */ });
    child.stdin.end(source, 'utf8');
  }

  function schedule(document) {
    if (document.languageId !== 'pseudodiscord' || document.uri.scheme !== 'file') return;
    cancel(document.uri);
    const id = document.uri.toString();
    scheduled.set(id, setTimeout(() => {
      scheduled.delete(id);
      validateDocument(document);
    }, 300));
  }

  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(schedule));
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => schedule(event.document)));
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(schedule));
  context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(document => {
    cancel(document.uri);
    collection.delete(document.uri);
  }));
  for (const document of vscode.workspace.textDocuments) schedule(document);
  context.subscriptions.push({ dispose() {
    disposed = true;
    for (const document of vscode.workspace.textDocuments) cancel(document.uri);
    for (const timer of scheduled.values()) clearTimeout(timer);
    scheduled.clear();
    for (const child of running.values()) child.kill();
    running.clear();
  }});
}
function deactivate() {}
module.exports = { activate, deactivate };
