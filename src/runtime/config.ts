import type { StorageConfig } from './storage/index.js';
import type { CommandSyncMode } from './command-sync.js';

/** Opciones internas normalizadas; configuración pública mediante PseudoClient. */
export interface BotRuntimeConfig {
  token?: string;
  guildId?: string;
  defaultPrefix?: string;
  intents?: string[];
  partials?: string[];
  presence?: { status?: string; activities?: {name:string; type?:number}[] };
  syncCommands?: boolean;
  commandSyncMode?: CommandSyncMode;
  commandSyncCacheSeconds?: number;
  pruneManagedCommands?: boolean;
  cooldownStorage?: 'memory' | 'database';
  maxIterations?: number;
  maxExecutionMs?: number;
  /** IANA time zone for scheduled cron tasks; local server time by default. */
  schedulerTimeZone?: string;
  /** Opt-in: defer slash command replies after this many milliseconds. */
  autoDeferMs?: number;
  autoDeferEphemeral?: boolean;
  database?: StorageConfig;
  plugins?: string[];
  projectRoot?: string;
}
