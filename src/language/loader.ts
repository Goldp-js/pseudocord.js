import { readFile, readdir, lstat, realpath } from 'node:fs/promises';
import { dirname, extname, resolve, join, relative, isAbsolute, sep } from 'node:path';
import type { Program, TopLevelDeclaration } from '../ast/declarations.js';
import { parse } from './parser.js';

export interface LoadProgramOptions { extensions?:string[]; seenPaths?:Set<string>; projectRoot?:string; }

/** Expansión única de imports; los imports con alias usan espacios de nombres aislados. */
export async function loadProgramFile(file:string,options:LoadProgramOptions={}):Promise<Program>{
  const seenLegacy=options.seenPaths??new Set<string>();const stack:string[]=[];const exts=options.extensions??['.pdiscord','.pd'];
  const ensureRoot=(path:string)=>{
    if(!options.projectRoot)return;
    const rel=relative(resolve(options.projectRoot),path);
    if(rel==='..'||rel.startsWith(`..${sep}`)||isAbsolute(rel))throw new Error(`IMPORTAR: ruta externa al proyecto bloqueada ('${path}').`);
  };
  /** Patrón explícito: './comandos/*' o './comandos/**', con sufijo opcional .pdiscord/.pd.
   * Es una expansión ESTÁTICA en tiempo de carga; no equivale a registro dinámico.
   */
  const expandGlob=async(baseFile:string,specifier:string):Promise<string[]|null>=>{
    const normalized=specifier.replaceAll('\\','/');
    const match=normalized.match(/^(.*?)\/(\*\*|\*)(?:\/\*(\.pdiscord|\.pd)|(\.pdiscord|\.pd))?$/);
    if(!match){if(normalized.includes('*'))throw new Error(`IMPORTAR: patrón no válido '${specifier}'; formatos admitidos: './carpeta/*', './carpeta/**'.`);return null;}
    const base=resolve(dirname(baseFile),match[1]!);
    ensureRoot(base);ensureRoot(await realpath(base));
    if((await lstat(base)).isSymbolicLink())throw new Error(`IMPORTAR: enlace simbólico de carpeta no admitido ('${specifier}').`);
    const recursive=match[2]==='**';const ext=match[3]??match[4];const files:string[]=[];
    const walk=async(dir:string,depth:number):Promise<void>=>{
      if(depth>32)throw new Error(`IMPORTAR: profundidad máxima excedida (32 directorios) en '${specifier}'.`);
      const entries=await readdir(dir,{withFileTypes:true});
      entries.sort((a,b)=>a.name.localeCompare(b.name,'en'));
      for(const item of entries){
        if(item.isSymbolicLink())continue;
        const path=join(dir,item.name);
        if(item.isDirectory()){if(recursive)await walk(path,depth+1);continue;}
        if(item.isFile()&&exts.includes(extname(item.name))&&(!ext||extname(item.name)===ext)){
          files.push(path);if(files.length>2000)throw new Error(`IMPORTAR: límite de 2000 archivos .pdiscord/.pd excedido en '${specifier}'.`);
        }
      }
    };
    await walk(base,0);
    if(!files.length)throw new Error(`IMPORTAR: sin archivos .pdiscord/.pd en '${specifier}'.`);
    return files;
  };
  const load=async(path0:string,seen:Set<string>, legacy:boolean):Promise<TopLevelDeclaration[]>=>{
    let path=resolve(path0);ensureRoot(path);
    if(!extname(path)){for(const e of exts){try{await readFile(path+e,'utf8');path+=e;break}catch{}}}
    if(options.projectRoot){path=await realpath(path);ensureRoot(path);}
    if(stack.includes(path))throw new Error(`Dependencia circular detectada: ${[...stack,path].join(' -> ')}.`);
    if(legacy&&seen.has(path))return [];
    if(legacy)seen.add(path);
    stack.push(path);
    try {
      const source=await readFile(path,'utf8');const program=parse(source,path);const body:TopLevelDeclaration[]=[];
      for(const d of program.body){
        if(d.kind==='ImportDeclaration'){
          const group=await expandGlob(path,d.source);
          if(group&&d.alias)throw new Error('IMPORTAR: alias COMO no admitido en importaciones de carpeta; solo en archivos individuales.');
          const imported=group
            ? (await (async()=>{const all:TopLevelDeclaration[]=[];for(const file of group)all.push(...await load(file,seen,true));return all;})())
            :await load(resolve(dirname(path),d.source),d.alias?new Set<string>():seen,!d.alias);
          if(d.alias){
            if(imported.some(x=>!['VariableTopLevelDeclaration','FunctionDeclaration','ModuleDeclaration','EnumDeclaration','RecordDeclaration'].includes(x.kind)))
              throw new Error(`IMPORTAR COMO '${d.alias}': exportación incompatible en '${d.source}'; admitidos: funciones, variables y módulos.`);
            body.push({kind:'ModuleDeclaration',name:d.alias,body:imported,span:d.span});
          } else body.push(...imported);
        } else body.push(d);
      }
      return body;
    } finally { stack.pop(); }
  };
  return {kind:'Program',version:'0.11',entryFile:resolve(file),sourceFiles:[...seenLegacy],body:await load(file,seenLegacy,true)};
}
