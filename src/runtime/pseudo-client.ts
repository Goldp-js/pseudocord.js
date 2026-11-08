import { realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Program, TopLevelDeclaration } from '../ast/declarations.js';
import type { Diagnostic } from '../language/diagnostics.js';
import { parse } from '../language/parser.js';
import { loadProgramFile } from '../language/loader.js';
import { validate } from '../language/validator.js';
import { formatValidationDiagnostic } from '../language/errors.js';
import { PseudoDiscordBot } from './bot.js';
import { collectSourceFiles, resolveProjectSource } from './source-files.js';
import type { PseudoDiscordConfig } from './config.js';
import type { StorageConfig } from './storage/index.js';
import type { CommandSyncMode, CommandSyncStats } from './command-sync.js';

export interface PseudoClientOptions {
  /** Token de Discord proporcionado por el proceso host (por ejemplo, mediante una variable de entorno). */
  token?: string;
  /** Intents de discord.js; se infieren desde declaraciones DSL cuando no se indican. */
  intents?: string[];
  partials?: string[];
  prefix?: string;
  guildId?: string;
  projectRoot?: string;
  presence?: PseudoDiscordConfig['presence'];
  database?: StorageConfig;
  cooldownStorage?: 'memory' | 'database';
  plugins?: string[];
  maxIterations?: number;
  maxExecutionMs?: number;
  commands?: {
    /** Modo predeterminado manual: start() no publica comandos automáticamente. */
    sync?: 'manual' | 'auto' | 'off';
    mode?: Exclude<CommandSyncMode,'off'>;
    cacheSeconds?: number;
    pruneManaged?: boolean;
  };
}

export interface CommandSource { code: string; sourceName?: string }
export interface PseudoSyncOptions { force?: boolean }
type Listener = (...args: any[]) => void;
type Registration = { event: string; listener: Listener; once: boolean };

/** API pública Node.js; no requiere CLI ni declaración LOGIN BOT. */
export class PseudoClient {
  private readonly folders: string[] = [];
  private readonly sources: CommandSource[] = [];
  private readonly listeners: Registration[] = [];
  private readonly options: PseudoClientOptions;
  private readonly root: string;
  private runtime?: PseudoDiscordBot;
  private startup?: Promise<any>;
  private state: 'idle' | 'starting' | 'running' | 'stopping' | 'stopped' = 'idle';
  private lastDiagnostics: readonly Diagnostic[] = [];
  private program?: Program;

  constructor(options: PseudoClientOptions = {}) {
    if (options.token !== undefined && (typeof options.token !== 'string' || !options.token.trim())) {
      throw new Error('PseudoClient-TokenInvalido-Error: token: cadena no vacía requerida.');
    }
    if (options.intents !== undefined && (!Array.isArray(options.intents) || options.intents.some(x => typeof x !== 'string'))) {
      throw new Error('PseudoClient-Intents-Error: intents: lista de nombres de intents de discord.js requerida.');
    }
    if (options.prefix !== undefined && (typeof options.prefix !== 'string' || !options.prefix.length)) {
      throw new Error('PseudoClient-Prefijo-Error: prefix: cadena no vacía requerida.');
    }
    const sync = options.commands?.sync ?? 'manual';
    if (!['manual','auto','off'].includes(sync)) throw new Error('PseudoClient-ModoSync-Error: modo de sincronización inválido (manual | auto | off).');
    if (options.commands?.mode && !['upsert','replace'].includes(options.commands.mode)) {
      throw new Error('PseudoClient-ModoSync-Error: modo REST inválido (upsert | replace).');
    }
    if (options.commands?.cacheSeconds !== undefined && (!Number.isSafeInteger(options.commands.cacheSeconds) || options.commands.cacheSeconds < 0)) {
      throw new Error('PseudoClient-Cache-Error: cacheSeconds: entero no negativo requerido.');
    }
    if (options.cooldownStorage !== undefined && !['memory','database'].includes(options.cooldownStorage)) {
      throw new Error('PseudoClient-Cooldown-Error: cooldownStorage inválido (memory | database).');
    }
    if (options.cooldownStorage === 'database' && !options.database) {
      throw new Error('PseudoClient-BaseDeDatos-Error: cooldownStorage=database sin conexión de base de datos configurada.');
    }
    if (options.maxIterations !== undefined && (!Number.isSafeInteger(options.maxIterations) || options.maxIterations < 1)) {
      throw new Error('PseudoClient-Limite-Error: maxIterations: entero positivo requerido.');
    }
    if (options.maxExecutionMs !== undefined && (!Number.isSafeInteger(options.maxExecutionMs) || options.maxExecutionMs < 1)) {
      throw new Error('PseudoClient-Limite-Error: maxExecutionMs: entero positivo requerido.');
    }
    this.options = { ...options, commands: options.commands ? {...options.commands} : undefined };
    this.root = resolve(options.projectRoot ?? process.cwd());
  }

  /** Añade archivos o directorios .pdiscord/.pd para procesarlos al iniciar. */
  loadCommands(path: string): this {
    this.assertCanConfigure();
    if (typeof path !== 'string' || !path.trim() || path.includes('\0')) {
      throw new Error('PseudoClient-RutaComandos-Error: ruta de comandos inválida.');
    }
    this.folders.push(path);
    return this;
  }

  /** Registra código DSL en memoria sin publicarlo en Discord. */
  command(source: CommandSource | string): this {
    this.assertCanConfigure();
    const item = typeof source === 'string' ? {code: source} : source;
    if (!item || typeof item.code !== 'string' || !item.code.trim()) {
      throw new Error('PseudoClient-Comando-Error: código PseudoDiscord vacío.');
    }
    this.sources.push({...item});
    return this;
  }

  /** Registra eventos de discord.js antes de realizar login. */
  on(event: string, listener: Listener): this { return this.register(event,listener,false); }
  once(event: string, listener: Listener): this { return this.register(event,listener,true); }
  off(event: string, listener: Listener): this {
    for (let i=this.listeners.length-1;i>=0;i--) {
      if (this.listeners[i]?.event===event && this.listeners[i]?.listener===listener) this.listeners.splice(i,1);
    }
    this.runtime?.client?.off?.(event,listener);
    return this;
  }

  /** Cliente discord.js disponible tras comenzar start(). */
  get discord(): any { return this.runtime?.client; }
  get user(): any { return this.discord?.user; }
  get diagnostics(): readonly Diagnostic[] { return [...this.lastDiagnostics]; }
  get isRunning(): boolean { return this.state === 'running'; }

  /** Valida las fuentes registradas sin conectarse al Gateway. */
  async compile(): Promise<Program> {
    if (this.state !== 'idle') throw new Error('PseudoClient-Estado-Error: estado inválido para iniciar; compilación pendiente.');
    const realRoot = await realpath(this.root);
    const seen = new Set<string>();
    const all: TopLevelDeclaration[] = [];
    let entryFile: string | undefined;
    const files: string[] = [];
    for (const input of this.folders) {
      const selected = await resolveProjectSource(realRoot, realRoot, input, 'either', 'PseudoClient');
      if (selected.kind === 'file') files.push(selected.path);
      else files.push(...await collectSourceFiles(selected.path,{projectRoot:realRoot,recursive:true,maxFiles:2000,errorPrefix:'PseudoClient'}));
    }
    if (files.length > 2000) throw new Error('PseudoClient-LimiteArchivos-Error: límite de archivos de comandos excedido (2000).');
    // Mantener orden de declaración y evitar registros duplicados.
    for (const file of files) {
      if (seen.has(file)) continue;
      entryFile ??= file;
      const loaded = await loadProgramFile(file,{seenPaths:seen,projectRoot:realRoot});
      all.push(...loaded.body);
    }
    this.sources.forEach((source,index)=>{
      const sourceName=source.sourceName??`<inline:${index+1}>`;
      const parsed=parse(source.code,sourceName);
      if (parsed.body.some(d=>d.kind==='ImportDeclaration')) throw new Error('PseudoClient-ImportInline-Error: declaración IMPORTAR no admitida en código inline.');
      all.push(...parsed.body);
    });
    // Apply the JavaScript default prefix before validation, so collisions are checked correctly.
    const prepared = all.map(d => d.kind==='DiscordCommandDeclaration' && d.commandKind==='message-prefix' && !d.prefixExplicit
      ? {...d,prefix:this.options.prefix??'!'} : d);
    const program:Program = {kind:'Program',version:'0.11',entryFile:entryFile??resolve(realRoot,'main.pdiscord'),sourceFiles:[...seen],body:prepared};
    const report=validate(program);
    this.lastDiagnostics=report.diagnostics;
    if (!report.ok) {
      const errors=report.diagnostics.filter(d=>d.severity==='error');
      throw new Error(`PseudoClient-Validacion-Error: ${errors.length} error(es):\n${errors.map(d=>formatValidationDiagnostic(d)).join('\n')}`);
    }
    this.program=program;
    return program;
  }

  /** Initializes the interpreter and discord.js and starts the Gateway session. */
  async start(): Promise<any> {
    if (this.startup || this.state !== 'idle') throw new Error('PseudoClient-InicioDuplicado-Error: inicio duplicado.');
    this.startup = (async()=>{
      if(!this.options.token?.trim()) throw new Error('PseudoClient-TokenRequerido-Error: token de Discord no configurado.');
      const program=await this.compile();
      this.state='starting';
      const sync=this.options.commands?.sync??'manual';
      const config:PseudoDiscordConfig={
        token:this.options.token, intents:this.options.intents, partials:this.options.partials,
        guildId:this.options.guildId, projectRoot:this.root, defaultPrefix:this.options.prefix,
        database:this.options.database, cooldownStorage:this.options.cooldownStorage,
        plugins:this.options.plugins,
        maxIterations:this.options.maxIterations, maxExecutionMs:this.options.maxExecutionMs,
        presence:this.options.presence, syncCommands:sync==='auto',
        commandSyncMode:sync==='off'?'off':this.options.commands?.mode??'upsert',
        commandSyncCacheSeconds:this.options.commands?.cacheSeconds??900,
        pruneManagedCommands:this.options.commands?.pruneManaged===true
      };
      this.runtime=new PseudoDiscordBot(program,config);
      try {
        const client=await this.runtime.start(c=>{
          for (const {event,listener,once} of this.listeners) c[once?'once':'on'](event,listener);
        });
        this.state='running';
        return client;
      }catch(e){
        this.state='stopped';
        throw e;
      }
    })();
    try { return await this.startup; }
    catch(e){ if(this.state==='idle') this.startup=undefined; throw e; }
  }

  /** Explicitly deploys the command definitions. Not invoked by start() in manual mode. */
  async syncCommands(options: PseudoSyncOptions={}): Promise<CommandSyncStats> {
    if (this.state!=='running'||!this.runtime) throw new Error('PseudoClient-SyncNoIniciado-Error: cliente no iniciado.');
    return this.runtime.synchronizeCommands(options.force===true);
  }

  /** Clean shutdown; clients are intentionally single-use. */
  async stop(): Promise<void> {
    if (this.state==='stopped') return;
    if (this.state==='starting') throw new Error('PseudoClient-CicloDeVida-Error: transición de estado inválida: inicio en curso.');
    if (this.state==='stopping') return;
    this.state='stopping';
    try{await this.runtime?.stop();}
    finally{this.state='stopped';}
  }

  private assertCanConfigure():void{
    if(this.state!=='idle'||this.startup) throw new Error('PseudoClient-ComandosBloqueados-Error: registro de comandos no permitido en el estado actual.');
  }
  private register(event:string,listener:Listener,once:boolean):this{
    if(typeof event!=='string'||!event||typeof listener!=='function') throw new Error('PseudoClient-Evento-Error: nombre de evento o callback inválido.');
    if(this.state==='stopped'||this.state==='stopping') throw new Error('PseudoClient-Estado-Error: cliente detenido.');
    this.listeners.push({event,listener,once});
    if(this.runtime?.client) this.runtime.client[once?'once':'on'](event,listener);
    return this;
  }
}
