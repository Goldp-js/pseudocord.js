/** Sincroniza definiciones de comandos, no el cuerpo ejecutable del DSL. */
import { cacheFile, cacheScope, readCache, writeCache, withFileLock, type SyncCacheOptions } from './command-sync/cache.js';
import { commandKey, fingerprint, sameCommand } from './command-sync/canonical.js';

export { canonicalCommand, sameCommand, fingerprint } from './command-sync/canonical.js';
export type { SyncCacheOptions } from './command-sync/cache.js';
export type CommandSyncMode = 'upsert' | 'replace' | 'off';
export interface CommandSyncStats { created: number; updated: number; unchanged: number; deleted: number }
export interface CommandSyncOptions {
  cache?: SyncCacheOptions;
  /** Elimina únicamente comandos con IDs remotos registrados como propios. */
  pruneManaged?: boolean;
  /** Indica que la caché validada evitó llamadas HTTP. */
  onCacheHit?: () => void;
}

const serial = new Map<unknown, Promise<void>>();
async function oneAtATime<T>(key: unknown, action: () => Promise<T>): Promise<T> {
  const previous = serial.get(key) ?? Promise.resolve();
  let done!: () => void;
  const next = new Promise<void>(resolve => {done = resolve;});
  const chain = previous.catch(()=>{}).then(()=>next);
  serial.set(key, chain);
  await previous.catch(()=>{});
  try {return await action();}
  finally {done(); if(serial.get(key)===chain)serial.delete(key);}
}
function entriesOf(result: any): any[] {
  if (result?.values && typeof result.values === 'function') return Array.from(result.values());
  if (Array.isArray(result)) return result;
  return Object.values(result ?? {});
}
function validate(commands: readonly any[], mode: CommandSyncMode, manager: any): void {
  if (!['upsert','replace','off'].includes(mode)) throw new Error(`CommandSync-ModoInvalido-Error: '${String(mode)}'.`);
  if (mode === 'off') return;
  const seen = new Set<string>();
  for (const cmd of commands) {
    if (!cmd || typeof cmd.name !== 'string' || !cmd.name.trim() || ![1,2,3].includes(Number(cmd.type??1)))
      throw new Error('CommandSync-ComandoInvalido-Error: nombre o tipo de comando no válido.');
    const key = commandKey(cmd);
    if (seen.has(key)) throw new Error(`Sincronización: nombre y tipo de comando duplicados ('${cmd.name}').`);
    seen.add(key);
  }
  const methods = mode === 'replace' ? ['fetch','set'] : ['fetch','create','edit'];
  if (methods.some(method => typeof manager?.[method] !== 'function'))
    throw new Error(`CommandSync-APIIncompleta-Error: se requieren commands.${methods.join('/')}().`);
}

/** The 4th parameter is optional; legacy callers retain the original response shape. */
export async function synchronizeApplicationCommands(
  manager: any, commands: readonly any[], mode: CommandSyncMode='upsert', options: CommandSyncOptions={}
): Promise<CommandSyncStats> {
  const initial = (): CommandSyncStats => ({created:0, updated:0, unchanged:0, deleted:0});
  validate(commands,mode,manager); // Preflight before GET, POST or PATCH.
  if (mode === 'off') return initial();
  if (options.pruneManaged && !options.cache) throw new Error('CommandSync-Propiedad-Error: PruneManaged requiere una caché persistente.');
  if (options.pruneManaged && mode === 'replace') throw new Error('CommandSync-Modo-Error: PruneManaged no se utiliza con replace.');
  if (options.pruneManaged && typeof manager.delete !== 'function') throw new Error('CommandSync-APIIncompleta-Error: commands.delete() no disponible.');

  const key = options.cache ? cacheFile(options.cache) : manager;
  return oneAtATime(key, async () => {
    const execute = async (): Promise<CommandSyncStats> => {
      const stats = initial();
      const scope = options.cache ? cacheScope(options.cache) : '';
      const path = options.cache ? cacheFile(options.cache) : '';
      const previous = options.cache ? await readCache(path, scope) : undefined;
      const digest = fingerprint(commands);
      const ttlMs = options.cache?.ttlMs ?? 15 * 60_000;
      if (!Number.isFinite(ttlMs) || ttlMs < 0) throw new Error('CommandSync-CacheTTL-Error: ttlMs debe ser no negativo.');
      const now = Date.now();
      if (previous && !options.cache?.force && ttlMs > 0 && previous.fingerprint === digest &&
        previous.mode === mode && previous.pruneManaged === (options.pruneManaged === true) &&
        now >= previous.verifiedAt && now - previous.verifiedAt < ttlMs) {
        stats.unchanged = commands.length;
        options.onCacheHit?.();
        return stats;
      }

      const existing = entriesOf(await manager.fetch());
      const remote = new Map<string, any>();
      for (const item of existing) remote.set(commandKey(item), item);
      const desired = new Map(commands.map(c => [commandKey(c),c]));
      const managed: Record<string, string> = Object.create(null);
      if (mode === 'replace') {
        // Compare before a bulk PUT; a plain commands.set() always sends a write.
        const different = existing.length !== commands.length ||
          commands.some(c => !remote.has(commandKey(c)) || !sameCommand(remote.get(commandKey(c)), c));
        if (!different) stats.unchanged = commands.length;
        else {
          stats.created = commands.filter(c => !remote.has(commandKey(c))).length;
          stats.updated = commands.filter(c => remote.has(commandKey(c)) && !sameCommand(remote.get(commandKey(c)),c)).length;
          stats.unchanged = commands.filter(c => remote.has(commandKey(c)) && sameCommand(remote.get(commandKey(c)),c)).length;
          stats.deleted = existing.filter(c => !desired.has(commandKey(c))).length;
          await manager.set([...commands]);
        }
        // set() may not provide IDs when the test mock is minimal; use its return collection when available.
      } else {
        for (const command of commands) {
          const id = commandKey(command);
          const found = remote.get(id);
          if (!found) {
            const created = await manager.create(command);
            stats.created++;
            if (created?.id) managed[id] = String(created.id);
          } else if (sameCommand(found, command)) {
            stats.unchanged++;
            if (found.id) managed[id] = String(found.id);
          } else {
            const result = await manager.edit(found.id, command);
            stats.updated++;
            if (result?.id ?? found.id) managed[id] = String(result?.id ?? found.id);
          }
        }
        if (options.pruneManaged && previous) {
          for (const [key, oldId] of Object.entries(previous.managed)) {
            if (desired.has(key)) continue;
            const current = remote.get(key);
            // Avoid deleting a command that somebody else replaced with a different ID.
            if (current && String(current.id) === oldId) {
              await manager.delete(oldId);
              stats.deleted++;
            }
          }
        }
      }
      if (options.cache) {
        // Failed or interrupted syncs never write a verified fingerprint.
        try {
          await writeCache(path, {schema:1,scope,mode,pruneManaged:options.pruneManaged===true,
            fingerprint:digest,verifiedAt:Date.now(),managed});
        } catch(e) {
          console.warn('[CommandSync] No se pudo guardar la caché; la próxima sincronización consultará Discord:', (e as Error).message);
        }
      }
      return stats;
    };
    return options.cache ? withFileLock(cacheFile(options.cache),execute) : execute();
  });
}
