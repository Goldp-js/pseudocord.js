import type { PersistentStore, StorageScope } from './index.js';
import { checkIdentity, serialize, deserialize, checkIncrement } from './shared.js';

export class SqliteStore implements PersistentStore {
  private cooldownClaims=0;
  constructor(private readonly db:any,private readonly namespace:string){
    db.exec(`CREATE TABLE IF NOT EXISTS pd_values (
      namespace TEXT NOT NULL, scope TEXT NOT NULL, owner TEXT NOT NULL, key TEXT NOT NULL,
      value TEXT NOT NULL, updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      PRIMARY KEY(namespace, scope, owner, key)
    )`);
    db.exec(`CREATE TABLE IF NOT EXISTS pd_cooldowns (
      namespace TEXT NOT NULL, key TEXT NOT NULL, expires_at INTEGER NOT NULL,
      PRIMARY KEY(namespace,key)
    )`);
  }
  async get(scope:StorageScope,owner:string,key:string):Promise<unknown>{checkIdentity(scope,owner,key);
    const row=this.db.prepare('SELECT value FROM pd_values WHERE namespace=? AND scope=? AND owner=? AND key=?').get(this.namespace,scope,owner,key) as {value:string}|undefined;
    return deserialize(row?.value);
  }
  async set(scope:StorageScope,owner:string,key:string,value:unknown):Promise<void>{checkIdentity(scope,owner,key);
    this.db.prepare(`INSERT INTO pd_values(namespace,scope,owner,key,value) VALUES(?,?,?,?,?)
      ON CONFLICT(namespace,scope,owner,key) DO UPDATE SET value=excluded.value,updated_at=unixepoch()`).run(this.namespace,scope,owner,key,serialize(value));
  }
  async delete(scope:StorageScope,owner:string,key:string):Promise<boolean>{checkIdentity(scope,owner,key);
    const result=this.db.prepare('DELETE FROM pd_values WHERE namespace=? AND scope=? AND owner=? AND key=?').run(this.namespace,scope,owner,key);
    return Number(result.changes)>0;
  }
  async increment(scope:StorageScope,owner:string,key:string,amount:number):Promise<number>{checkIdentity(scope,owner,key);checkIncrement(amount);
    // SQLite serializa los escritores; una sentencia evita el read-modify-write no atómico.
    const row=this.db.prepare(`INSERT INTO pd_values(namespace,scope,owner,key,value) VALUES(?,?,?,?,?)
       ON CONFLICT(namespace,scope,owner,key) DO UPDATE SET
       value=CASE
         WHEN json_type(pd_values.value)='integer' AND json_type(excluded.value)='integer'
         THEN CAST(CAST(pd_values.value AS INTEGER)+CAST(excluded.value AS INTEGER) AS TEXT)
         ELSE CAST(CAST(pd_values.value AS REAL)+CAST(excluded.value AS REAL) AS TEXT)
       END,updated_at=unixepoch()
       WHERE json_type(pd_values.value) IN ('integer','real')
         AND ABS(CAST(pd_values.value AS REAL)+CAST(excluded.value AS REAL)) < 9007199254740991
       RETURNING value`).get(this.namespace,scope,owner,key,String(amount)) as {value:string}|undefined;
    if(!row)throw new Error('Persistencia: valor no numérico o resultado fuera del rango seguro; incremento rechazado.');
    return Number(row.value);
  }
  async claimCooldown(key:string,now:number,expires:number):Promise<number>{
    if(!key||key.length>1024||!Number.isSafeInteger(now)||!Number.isSafeInteger(expires)||expires<=now)throw new Error('Persistencia de cooldown: identificador o expiración no válidos.');
    const row=this.db.prepare(`INSERT INTO pd_cooldowns(namespace,key,expires_at) VALUES(?,?,?)
       ON CONFLICT(namespace,key) DO UPDATE SET expires_at=excluded.expires_at
       WHERE pd_cooldowns.expires_at<=? RETURNING expires_at`).get(this.namespace,key,expires,now);
    if(++this.cooldownClaims%512===0)this.db.prepare('DELETE FROM pd_cooldowns WHERE namespace=? AND expires_at<=?').run(this.namespace,now);
    if(row)return 0;
    return this.cooldownRemaining(key,now);
  }
  async cooldownRemaining(key:string,now:number):Promise<number>{
    const row=this.db.prepare('SELECT expires_at FROM pd_cooldowns WHERE namespace=? AND key=?').get(this.namespace,key) as {expires_at:number}|undefined;
    return Math.max(0,Number(row?.expires_at??0)-now);
  }
  async close():Promise<void>{this.db.close();}
}

