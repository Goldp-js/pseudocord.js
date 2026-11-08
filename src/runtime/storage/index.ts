/** Punto de entrada estable para los proveedores de persistencia. */
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

/** Persistencia por ámbito/propietario/clave. Valores JSON; operaciones incrementales atómicas. */

export type StorageScope = 'usuario' | 'servidor' | 'global';
export interface StorageConfig {
  provider: 'sqlite' | 'postgresql' | 'redis';
  namespace: string;
  sqliteFile?: string;
  connectionString?: string;
  url?: string;
}
export interface PersistentStore {
  get(scope: StorageScope, owner: string, key: string): Promise<unknown | undefined>;
  set(scope: StorageScope, owner: string, key: string, value: unknown): Promise<void>;
  delete(scope: StorageScope, owner: string, key: string): Promise<boolean>;
  increment(scope: StorageScope, owner: string, key: string, amount: number): Promise<number>;
  /** Reclama cooldown atómicamente; devuelve milisegundos restantes si otro proceso ya lo reservó. */
  claimCooldown(key:string,now:number,expires:number):Promise<number>;
  cooldownRemaining(key:string,now:number):Promise<number>;
  close(): Promise<void>;
}

/** Conexión diferida. PostgreSQL y Redis requieren instalar sus controladores npm. */
export async function openPersistentStore(config:StorageConfig):Promise<PersistentStore>{
  if(config.provider==='sqlite'){
    if(!config.sqliteFile)throw new Error('Configuración Database.SQLite.File: ruta requerida.');
    await mkdir(dirname(config.sqliteFile),{recursive:true});
    let sqlite:any;
    try{const name='node:sqlite';sqlite=await import(name);}catch{throw new Error('SQLite nativo no disponible: se requiere Node.js >=22.13.');}
    const { SqliteStore } = await import('./sqlite.js');
    const db=new sqlite.DatabaseSync(config.sqliteFile);try{db.exec('PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL;');return new SqliteStore(db,config.namespace);}catch(e){db.close();throw e;}
  }
  if(config.provider==='postgresql'){
    if(!config.connectionString)throw new Error('Configuración PostgreSQL: variable de conexión DATABASE_URL ausente.');
    let mod:any;try{const name='pg';mod=await import(name);}catch{throw new Error('Dependencia PostgreSQL ausente: paquete npm pg.');}
    const { PostgresStore } = await import('./postgres.js');
    const Pool=mod.Pool??mod.default?.Pool;const pool=new Pool({connectionString:config.connectionString});
    try{const store=new PostgresStore(pool,config.namespace);await store.init();return store;}catch(e){await pool.end();throw e;}
  }
  if(config.provider==='redis'){
    if(!config.url)throw new Error('Configuración Redis: variable de conexión REDIS_URL ausente.');
    let mod:any;try{const name='redis';mod=await import(name);}catch{throw new Error('Dependencia Redis ausente: paquete npm redis.');}
    const { RedisStore } = await import('./redis.js');
    const client=mod.createClient({url:config.url});client.on('error',(e:Error)=>console.error('[PseudoDiscord/Redis]',e.message));await client.connect();return new RedisStore(client,config.namespace);
  }
  throw new Error(`Persistencia: proveedor no reconocido '${(config as StorageConfig).provider}'.`);
}
