import { createHash } from 'node:crypto';
import { readFile, writeFile, rename, unlink, mkdir, open, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface SyncCacheOptions {
  /** Directorio raíz utilizado para persistir .pdiscord/command-sync/. */
  projectRoot: string;
  /** ID de aplicación de Discord; no utilizar el token del bot. */
  applicationId: string;
  guildId?: string;
  /** TTL predeterminado: 15 min. 0 omite la comprobación de TTL. */
  ttlMs?: number;
  /** Omite la comprobación de TTL sin descartar IDs propios conocidos. */
  force?: boolean;
}
export interface SyncCacheRecord {
  schema: 1;
  scope: string;
  mode: 'upsert' | 'replace';
  pruneManaged: boolean;
  fingerprint: string;
  verifiedAt: number;
  /** Nombres e IDs de comandos administrados por el proyecto. */
  managed: Record<string, string>;
}
export function cacheScope(config: SyncCacheOptions): string {
  if (!/^\d{15,25}$/.test(config.applicationId)) throw new Error('CommandSync-ApplicationId-Error: identificador de aplicación no válido.');
  if (config.guildId !== undefined && !/^\d{15,25}$/.test(config.guildId)) throw new Error('CommandSync-GuildId-Error: identificador del servidor no válido.');
  return `${config.applicationId}:${config.guildId ?? 'global'}`;
}
export function cacheFile(config: SyncCacheOptions): string {
  const digest = createHash('sha256').update(cacheScope(config)).digest('hex').slice(0, 24);
  return join(config.projectRoot, '.pdiscord', 'command-sync', `${digest}.json`);
}
export async function readCache(path: string, scope: string): Promise<SyncCacheRecord | undefined> {
  try {
    const v: unknown = JSON.parse(await readFile(path, 'utf8'));
    if (!v || typeof v !== 'object' || Array.isArray(v)) return undefined;
    const data = v as SyncCacheRecord;
    if (data.schema !== 1 || data.scope !== scope || !['upsert', 'replace'].includes(data.mode) ||
      typeof data.fingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(data.fingerprint) ||
      typeof data.verifiedAt !== 'number' || !Number.isFinite(data.verifiedAt) ||
      typeof data.pruneManaged !== 'boolean' || !data.managed || typeof data.managed !== 'object' || Array.isArray(data.managed)) return undefined;
    const managed: Record<string, string> = Object.create(null);
    for (const [key, id] of Object.entries(data.managed)) if (/^[123]:.+$/.test(key) && typeof id === 'string' && /^\d{15,25}$/.test(id)) managed[key] = id;
    return {...data, managed};
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    // A broken cache must never cause incorrect remote writes or a startup failure.
    return undefined;
  }
}
export async function writeCache(path: string, record: SyncCacheRecord): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.${process.pid}.${createHash('sha256').update(String(Math.random())).digest('hex').slice(0,10)}.tmp`;
  try {
    await writeFile(temp, JSON.stringify(record, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    await rename(temp, path);
  } finally { await unlink(temp).catch(()=>{}); }
}
function delay(ms: number): Promise<void> { return new Promise(resolve => setTimeout(resolve, ms)); }
/** Cooperative lock for multiple project processes sharing the same filesystem. */
export async function withFileLock<T>(path: string, operation: () => Promise<T>): Promise<T> {
  await mkdir(dirname(path), { recursive: true });
  const lockPath = `${path}.lock`;
  let handle: Awaited<ReturnType<typeof open>> | undefined;
  for (let attempt=0; attempt<180; attempt++) {
    try {
      handle = await open(lockPath, 'wx', 0o600);
      await handle.writeFile(String(process.pid));
      break;
    } catch(e) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e;
      // If a process crashed, safely allow recovery after five minutes.
      const info = await stat(lockPath).catch(()=>undefined);
      if (info && Date.now() - info.mtimeMs > 5*60*1000) await unlink(lockPath).catch(()=>{});
      await delay(150);
    }
  }
  if (!handle) throw new Error('CommandSync-Bloqueo-Error: existe otra sincronización activa; se agotó el tiempo de espera.');
  try { return await operation(); }
  finally { await handle.close(); await unlink(lockPath).catch(()=>{}); }
}
