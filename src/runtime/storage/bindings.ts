import type { PersistentStore, StorageScope } from './index.js';

type StorageFunction = (...args:any[])=>Promise<any>;

/** Registra funciones DSL desacopladas del intérprete y del motor SQL. */
export function createStorageBindings(storeProvider:()=>PersistentStore|undefined):Record<string,StorageFunction> {
  const normalizeStorageIdentifier=(value:any):string=>{
    const raw=value&&typeof value==='object'&&'id' in value?value.id:value;
    if(typeof raw!=='string'&&typeof raw!=='number'&&typeof raw!=='bigint')
      throw new Error('Persistencia: identificador de usuario o servidor ausente.');
    if(!String(raw))throw new Error('Persistencia: identificador vacío.');
    return String(raw);
  };
  const requirePersistentStore=():PersistentStore=>{
    const provider=storeProvider();
    if(!provider)throw new Error('Persistencia no disponible: Database.Provider ausente o definido como none.');
    return provider;
  };

  const functions:Record<string,StorageFunction>=Object.create(null);
  const register=(scope:StorageScope,suffix:string):void=>{
    const resolveStorageOwnerId=(value:any)=>scope==='global'?'_':normalizeStorageIdentifier(value);
    const global=scope==='global';
    const readStoredValue=async(...args:any[])=>{
      const [who,key,fallback]=global?['_',args[0],args[1]]:args;
      const result=await requirePersistentStore().get(scope,resolveStorageOwnerId(who),String(key));
      return result===undefined?fallback:result;
    };
    const writeStoredValue=async(...args:any[])=>{
      const [who,key,value]=global?['_',args[0],args[1]]:args;
      await requirePersistentStore().set(scope,resolveStorageOwnerId(who),String(key),value);
      return value;
    };
    const deleteStoredValue=async(...args:any[])=>{
      const [who,key]=global?['_',args[0]]:args;
      return requirePersistentStore().delete(scope,resolveStorageOwnerId(who),String(key));
    };
    const incrementStoredValue=async(...args:any[])=>{
      const [who,key,value]=global?['_',args[0],args[1]]:args;
      return requirePersistentStore().increment(scope,resolveStorageOwnerId(who),String(key),value===undefined?1:Number(value));
    };
    Object.assign(functions,{
      [`OBTENER_${suffix}`]:readStoredValue,
      [`GUARDAR_${suffix}`]:writeStoredValue,
      [`BORRAR_${suffix}`]:deleteStoredValue,
      [`INCREMENTAR_${suffix}`]:incrementStoredValue
    });
  };
  register('usuario','USUARIO');
  register('servidor','SERVIDOR');
  register('global','GLOBAL');
  return functions;
}
