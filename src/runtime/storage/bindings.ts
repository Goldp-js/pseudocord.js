import type { PersistentStore, StorageScope } from './index.js';

type StorageFunction = (...args:any[])=>Promise<any>;

/** Registra funciones DSL desacopladas del intérprete y del motor SQL. */
export function createStorageBindings(storeProvider:()=>PersistentStore|undefined):Record<string,StorageFunction> {
  const identifier=(value:any):string=>{
    const raw=value&&typeof value==='object'&&'id' in value?value.id:value;
    if(typeof raw!=='string'&&typeof raw!=='number'&&typeof raw!=='bigint')
      throw new Error('Persistencia: identificador de usuario o servidor ausente.');
    if(!String(raw))throw new Error('Persistencia: identificador vacío.');
    return String(raw);
  };
  const store=():PersistentStore=>{
    const provider=storeProvider();
    if(!provider)throw new Error('Persistencia no disponible: Database.Provider ausente o definido como none.');
    return provider;
  };

  const functions:Record<string,StorageFunction>=Object.create(null);
  const register=(scope:StorageScope,suffix:string):void=>{
    const owner=(value:any)=>scope==='global'?'_':identifier(value);
    const global=scope==='global';
    const get=async(...args:any[])=>{
      const [who,key,fallback]=global?['_',args[0],args[1]]:args;
      const result=await store().get(scope,owner(who),String(key));
      return result===undefined?fallback:result;
    };
    const set=async(...args:any[])=>{
      const [who,key,value]=global?['_',args[0],args[1]]:args;
      await store().set(scope,owner(who),String(key),value);
      return value;
    };
    const del=async(...args:any[])=>{
      const [who,key]=global?['_',args[0]]:args;
      return store().delete(scope,owner(who),String(key));
    };
    const inc=async(...args:any[])=>{
      const [who,key,value]=global?['_',args[0],args[1]]:args;
      return store().increment(scope,owner(who),String(key),value===undefined?1:Number(value));
    };
    Object.assign(functions,{
      [`OBTENER_${suffix}`]:get,
      [`GUARDAR_${suffix}`]:set,
      [`BORRAR_${suffix}`]:del,
      [`INCREMENTAR_${suffix}`]:inc
    });
  };
  register('usuario','USUARIO');
  register('servidor','SERVIDOR');
  register('global','GLOBAL');
  return functions;
}
