import type { PersistentStore, StorageScope } from './index.js';
import { checkIdentity, serialize, deserialize, checkIncrement } from './shared.js';

export class PostgresStore implements PersistentStore {
  private cooldownClaims=0;
  constructor(private readonly pool:any,private readonly namespace:string){}
  async init():Promise<void>{await this.pool.query(`CREATE TABLE IF NOT EXISTS pd_values (
    namespace TEXT NOT NULL, scope TEXT NOT NULL, owner TEXT NOT NULL, key TEXT NOT NULL,
    value TEXT NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(namespace,scope,owner,key))`);
    await this.pool.query(`CREATE TABLE IF NOT EXISTS pd_cooldowns (
      namespace TEXT NOT NULL, key TEXT NOT NULL, expires_at BIGINT NOT NULL,
      PRIMARY KEY(namespace,key))`);
  }
  async claimCooldown(key:string,now:number,expires:number):Promise<number>{
    if(!key||key.length>1024||!Number.isSafeInteger(now)||!Number.isSafeInteger(expires)||expires<=now)throw new Error('Persistencia de cooldown: identificador o expiración no válidos.');
    const r=await this.pool.query(`INSERT INTO pd_cooldowns(namespace,key,expires_at) VALUES($1,$2,$3)
      ON CONFLICT(namespace,key) DO UPDATE SET expires_at=excluded.expires_at
      WHERE pd_cooldowns.expires_at<=$4 RETURNING expires_at`,
      [this.namespace,key,expires,now]);
    if(++this.cooldownClaims%512===0)await this.pool.query('DELETE FROM pd_cooldowns WHERE namespace=$1 AND expires_at<=$2',[this.namespace,now]);
    if(r.rowCount>0)return 0;
    return this.cooldownRemaining(key,now);
  }
  async cooldownRemaining(key:string,now:number):Promise<number>{
    const r=await this.pool.query('SELECT expires_at FROM pd_cooldowns WHERE namespace=$1 AND key=$2',[this.namespace,key]);
    return Math.max(0,Number(r.rows[0]?.expires_at??0)-now);
  }
  private args(scope:StorageScope,owner:string,key:string):string[]{checkIdentity(scope,owner,key);return [this.namespace,scope,owner,key];}
  async get(scope:StorageScope,owner:string,key:string):Promise<unknown>{const r=await this.pool.query('SELECT value FROM pd_values WHERE namespace=$1 AND scope=$2 AND owner=$3 AND key=$4',this.args(scope,owner,key));return deserialize(r.rows[0]?.value);}
  async set(scope:StorageScope,owner:string,key:string,value:unknown):Promise<void>{await this.pool.query(`INSERT INTO pd_values(namespace,scope,owner,key,value) VALUES($1,$2,$3,$4,$5) ON CONFLICT(namespace,scope,owner,key) DO UPDATE SET value=excluded.value,updated_at=NOW()`,[...this.args(scope,owner,key),serialize(value)]);}
  async delete(scope:StorageScope,owner:string,key:string):Promise<boolean>{const r=await this.pool.query('DELETE FROM pd_values WHERE namespace=$1 AND scope=$2 AND owner=$3 AND key=$4',this.args(scope,owner,key));return r.rowCount>0;}
  async increment(scope:StorageScope,owner:string,key:string,amount:number):Promise<number>{checkIncrement(amount);const r=await this.pool.query(`INSERT INTO pd_values(namespace,scope,owner,key,value) VALUES($1,$2,$3,$4,$5)
    ON CONFLICT(namespace,scope,owner,key) DO UPDATE SET value=((pd_values.value)::NUMERIC+(excluded.value)::NUMERIC)::TEXT,updated_at=NOW()
    RETURNING value`,[...this.args(scope,owner,key),String(amount)]);return Number(r.rows[0].value);}
  async close():Promise<void>{await this.pool.end();}
}

