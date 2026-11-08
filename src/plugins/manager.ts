import { createRequire } from 'node:module';
import { realpath } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createStdlib } from '../runtime/stdlib.js';
import { normalizeIdentifier } from '../language/identifiers.js';
import { satisfiesVersion } from './versions.js';

export interface PluginService { version:string; value:unknown; owner:string }
export interface PluginAPI {
  readonly pluginName:string;
  readonly services: {
    register(name:string,version:string,value:unknown):void;
    get<T=unknown>(name:string,range?:string):T;
  };
  readonly functions: { register(name:string,callback:(...args:any[])=>unknown):void };
  readonly logger: Pick<Console,'info'|'warn'|'error'>;
}
export interface PseudoPlugin {
  name:string;
  version:string;
  compatibility?:{core?:string;sdk?:string};
  dependencies?:{plugins?:Record<string,string>};
  setup(api:PluginAPI):void|Promise<void>;
  dispose?(api:PluginAPI):void|Promise<void>;
}
export function definePlugin<T extends PseudoPlugin>(plugin:T):T {return plugin;}

/** Registro tipado de plugins; la ejecución JavaScript no está aislada. */
export class PluginManager {
  readonly functions:Record<string,(...args:any[])=>unknown>=Object.create(null);
  private readonly services=new Map<string,PluginService>();
  private readonly plugins=new Map<string,{plugin:PseudoPlugin;api:PluginAPI}>();
  private readonly registrations=new Set<string>();
  constructor(readonly coreVersion='0.17.0',readonly sdkVersion='0.1.0'){}

  private makeApi(owner:string):PluginAPI {
    return Object.freeze({
      pluginName:owner,
      logger:console,
      services:Object.freeze({
        register:(name:string,version:string,value:unknown)=>{
          const key=normalizeIdentifier(name);
          if(!key||this.services.has(key))throw new Error(`Plugin '${owner}': servicio duplicado o inválido '${name}'.`);
          if(!satisfiesVersion(version,version))throw new Error(`Servicio '${name}': versión no válida.`);
          this.services.set(key,{version,value,owner});
        },
        get:<T=unknown>(name:string,range='*'):T=>{
          const service=this.services.get(normalizeIdentifier(name));
          if(!service)throw new Error(`Plugin '${owner}': servicio requerido '${name}' no disponible.`);
          if(!satisfiesVersion(service.version,range))throw new Error(`Plugin '${owner}': servicio '${name}' incompatible: ${service.version} no cumple ${range}.`);
          return service.value as T;
        }
      }),
      functions:Object.freeze({register:(name:string,callback:(...args:any[])=>unknown)=>{
        const key=normalizeIdentifier(name);
        if(!/^[a-z_][a-z0-9_]*$/.test(key)||typeof callback!=='function')throw new Error(`Plugin '${owner}': función no válida '${name}'.`);
        if(this.registrations.has(key)||Object.keys(this.functions).some(n=>normalizeIdentifier(n)===key)||Object.keys(createStdlib()).some(n=>normalizeIdentifier(n)===key))
          throw new Error(`Plugin '${owner}': función duplicada o reservada '${name}'.`);
        this.registrations.add(key);this.functions[name]=callback;
      }})
    });
  }

  /** Resolución topológica de plugins y reversión de registros ante fallos. */
  async load(plugins:readonly PseudoPlugin[]):Promise<void>{
    if(this.plugins.size)throw new Error('Plugins: el gestor ya ha sido inicializado.');
    const all=new Map<string,PseudoPlugin>();
    for(const plugin of plugins){
      if(!plugin||typeof plugin.setup!=='function'||!plugin.name||!plugin.version)throw new Error('Plugins: manifiesto inválido.');
      const key=normalizeIdentifier(plugin.name);
      if(all.has(key))throw new Error(`Plugins: nombre duplicado '${plugin.name}'.`);
      if(!satisfiesVersion(plugin.version,plugin.version))throw new Error(`Plugins: versión inválida de '${plugin.name}'.`);
      if(plugin.compatibility?.core&&!satisfiesVersion(this.coreVersion,plugin.compatibility.core))throw new Error(`Plugin '${plugin.name}': núcleo ${this.coreVersion} no cumple ${plugin.compatibility.core}.`);
      if(plugin.compatibility?.sdk&&!satisfiesVersion(this.sdkVersion,plugin.compatibility.sdk))throw new Error(`Plugin '${plugin.name}': SDK ${this.sdkVersion} no cumple ${plugin.compatibility.sdk}.`);
      all.set(key,plugin);
    }
    const sorted:PseudoPlugin[]=[],visit=new Set<string>(),done=new Set<string>();
    const dfs=(key:string)=>{
      if(done.has(key))return;
      if(visit.has(key))throw new Error(`Plugins: dependencia circular detectada en '${key}'.`);
      const plugin=all.get(key);if(!plugin)throw new Error(`Plugins: dependencia obligatoria '${key}' no instalada.`);
      visit.add(key);
      for(const [dep,range] of Object.entries(plugin.dependencies?.plugins??{})){
        const other=all.get(normalizeIdentifier(dep));
        if(!other)throw new Error(`Plugin '${plugin.name}': falta la dependencia '${dep}'.`);
        if(!satisfiesVersion(other.version,range))throw new Error(`Plugin '${plugin.name}': '${dep}' ${other.version} no cumple ${range}.`);
        dfs(normalizeIdentifier(dep));
      }
      visit.delete(key);done.add(key);sorted.push(plugin);
    };
    for(const key of all.keys())dfs(key);
    try{
      for(const plugin of sorted){
        const api=this.makeApi(plugin.name);
        // Registrar antes de setup para intentar dispose si se produce un fallo parcial.
        this.plugins.set(normalizeIdentifier(plugin.name),{plugin,api});
        await plugin.setup(api);
      }
    }catch(error){await this.dispose();throw error;}
  }

  /** Plugins JavaScript declarados en PseudoClient; ejecución en el proceso del host. */
  async loadFromSpecifiers(specifiers:readonly string[],root:string):Promise<void>{
    const base=resolve(root),require=createRequire(resolve(base,'index.js'));
    const plugins:PseudoPlugin[]=[];
    for(const spec of specifiers){
      if(typeof spec!=='string'||!spec.trim()||spec.includes('\0'))throw new Error('Plugins: nombre/ruta inválida.');
      const raw=(spec.startsWith('.')||isAbsolute(spec))?resolve(base,spec):require.resolve(spec);
      const file=await realpath(raw);
      if(spec.startsWith('.')||isAbsolute(spec)){
        const rel=relative(base,file);
        if(rel==='..'||rel.startsWith(`..${sep}`)||isAbsolute(rel))throw new Error(`Plugins: ruta fuera del proyecto '${spec}'.`);
      }
      const imported=await import(pathToFileURL(file).href);
      plugins.push(imported.default??imported.plugin);
    }
    await this.load(plugins);
  }

  async dispose():Promise<void>{
    const loaded=[...this.plugins.values()].reverse();
    this.plugins.clear();
    const errors:unknown[]=[];
    for(const {plugin,api} of loaded){try{await plugin.dispose?.(api);}catch(e){errors.push(e);}}
    this.services.clear();this.registrations.clear();for(const name of Object.keys(this.functions))delete this.functions[name];
    if(errors.length)throw new AggregateError(errors,'Plugins: errores durante el cierre.');
  }
}
