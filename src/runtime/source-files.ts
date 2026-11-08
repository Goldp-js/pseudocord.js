import { lstat, readdir, realpath } from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path';

export const DSL_EXTENSIONS = new Set(['.pd', '.pdiscord']);
export const MAX_SOURCE_FILES = 2000;
export const MAX_SOURCE_DEPTH = 32;

export type SourceSelection = {path:string; kind:'file'|'directory'};

export function assertProjectPath(root:string,path:string,prefix='Módulos'):void {
  const rel=relative(root,path);
  if(rel==='..'||rel.startsWith(`..${sep}`)||isAbsolute(rel)) {
    if(prefix==='PseudoClient') throw new Error(`PseudoClient-RutaExterna-Error: acceso fuera del proyecto bloqueado ('${path}').`);
    throw new Error(`Módulos: acceso externo al directorio del proyecto bloqueado ('${path}').`);
  }
}

/** Resolve a DSL source without following a symlink outside the project. */
export async function resolveProjectSource(root:string,base:string,input:unknown,kind:'file'|'directory'|'either'='either',prefix='Módulos'):Promise<SourceSelection> {
  if(typeof input!=='string'||!input.trim()||input.includes('\0')) {
    throw new Error(prefix==='PseudoClient' ? 'PseudoClient-RutaComandos-Error: ruta de comandos inválida.' : 'Módulos: ruta de entrada vacía o incompatible.');
  }
  const candidate=resolve(base,input);
  assertProjectPath(root,candidate,prefix);
  const path=await realpath(candidate);
  assertProjectPath(root,path,prefix);
  const stats=await lstat(path);
  const actual=stats.isFile()?'file':stats.isDirectory()?'directory':undefined;
  if(!actual || (kind!=='either'&&kind!==actual)) {
    if(prefix==='PseudoClient')throw new Error(`PseudoClient-RutaComandos-Error: no es archivo ni carpeta: '${input}'.`);
    throw new Error(`Módulos: ruta no correspondiente a ${kind==='file'?'un archivo .pdiscord':'un directorio'} ('${input}').`);
  }
  if(actual==='file'&&!DSL_EXTENSIONS.has(extname(path).toLowerCase())){
    if(prefix==='PseudoClient')throw new Error(`PseudoClient-Extension-Error: se requiere .pd o .pdiscord ('${path}').`);
    throw new Error(`CARGAR_MODULO: extensión no admitida ('${input}'); permitidas: .pdiscord, .pd.`);
  }
  return {path,kind:actual};
}

/** Shared deterministic traversal for loadCommands and LISTAR_MODULOS. */
export async function collectSourceFiles(dir:string,options:{projectRoot:string;recursive?:boolean;maxFiles?:number;errorPrefix?:string}):Promise<string[]> {
  const {projectRoot,recursive=true,maxFiles=MAX_SOURCE_FILES,errorPrefix='Módulos'}=options;
  const out:string[]=[];
  const walk=async(current:string,depth:number):Promise<void>=>{
    if(depth>MAX_SOURCE_DEPTH) throw new Error(errorPrefix==='PseudoClient'?'PseudoClient-Profundidad-Error: máximo 32 niveles de subcarpetas.':'LISTAR_MODULOS: profundidad máxima excedida (32 niveles).');
    const entries=(await readdir(current,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name,'en'));
    for(const entry of entries){
      if(entry.isSymbolicLink())continue;
      const candidate=join(current,entry.name);
      if(entry.isDirectory()){
        if(recursive){const actual=await realpath(candidate);assertProjectPath(projectRoot,actual,errorPrefix);await walk(actual,depth+1);}
      }else if(entry.isFile()&&DSL_EXTENSIONS.has(extname(entry.name).toLowerCase())){
        const actual=await realpath(candidate);
        assertProjectPath(projectRoot,actual,errorPrefix);
        out.push(actual);
        if(out.length>maxFiles)throw new Error(errorPrefix==='PseudoClient'?`PseudoClient-LimiteArchivos-Error: máximo ${maxFiles} archivos de comandos.`:`LISTAR_MODULOS: límite de ${maxFiles} archivos excedido.`);
      }
    }
  };
  await walk(dir,0);
  return out;
}
