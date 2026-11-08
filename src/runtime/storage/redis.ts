import type { PersistentStore, StorageScope } from './index.js';
import { checkIdentity, serialize, deserialize, checkIncrement } from './shared.js';

const INCREMENT_LUA=`local current=redis.call('GET',KEYS[1]); if not current then current='0' end
local n=tonumber(current); if not n then return redis.error_reply('El valor no es numérico') end
local v=n+tonumber(ARGV[1]); redis.call('SET',KEYS[1],tostring(v)); return tostring(v)`;
export class RedisStore implements PersistentStore {
  constructor(private readonly client:any,private readonly namespace:string){}
  private key(scope:StorageScope,owner:string,key:string):string{checkIdentity(scope,owner,key);return ['pd',this.namespace,scope,owner,key].map(x=>encodeURIComponent(x)).join(':');}
  async get(scope:StorageScope,owner:string,key:string):Promise<unknown>{return deserialize(await this.client.get(this.key(scope,owner,key)));}
  async set(scope:StorageScope,owner:string,key:string,value:unknown):Promise<void>{await this.client.set(this.key(scope,owner,key),serialize(value));}
  async delete(scope:StorageScope,owner:string,key:string):Promise<boolean>{return (await this.client.del(this.key(scope,owner,key)))>0;}
  async increment(scope:StorageScope,owner:string,key:string,amount:number):Promise<number>{checkIncrement(amount);return Number(await this.client.eval(INCREMENT_LUA,{keys:[this.key(scope,owner,key)],arguments:[String(amount)]}));}
  private cooldownKey(key:string):string{return ['pd',this.namespace,'cooldown',key].map(x=>encodeURIComponent(x)).join(':');}
  async claimCooldown(key:string,now:number,expires:number):Promise<number>{
    if(!key||key.length>1024||!Number.isSafeInteger(now)||!Number.isSafeInteger(expires)||expires<=now)throw new Error('Persistencia de cooldown: identificador o expiración no válidos.');
    const lua=`if redis.call('SET',KEYS[1],'1','PX',ARGV[1],'NX') then return 0 end
      local ttl=redis.call('PTTL',KEYS[1]); return math.max(ttl,0)`;
    return Number(await this.client.eval(lua,{keys:[this.cooldownKey(key)],arguments:[String(expires-now)]}));
  }
  async cooldownRemaining(key:string,_now:number):Promise<number>{
    return Math.max(0,Number(await this.client.pTTL(this.cooldownKey(key))));
  }
  async close():Promise<void>{await this.client.quit();}
}

