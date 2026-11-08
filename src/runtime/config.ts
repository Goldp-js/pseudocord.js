import type { StorageConfig } from './storage/index.js';
import type { CommandSyncMode } from './command-sync.js';

/** Opciones internas normalizadas; configuración pública mediante PseudoClient. */
export interface PseudoDiscordConfig {
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
  database?: StorageConfig;
  plugins?: string[];
  projectRoot?: string;
}
