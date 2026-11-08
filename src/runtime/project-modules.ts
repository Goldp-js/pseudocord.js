import { dirname, relative, resolve } from 'node:path';
import { collectSourceFiles, resolveProjectSource, MAX_SOURCE_FILES } from './source-files.js';
import type { Program, TopLevelDeclaration } from '../ast/declarations.js';
import { loadProgramFile } from '../language/loader.js';
import { validate } from '../language/validator.js';
import type { Interpreter } from './interpreter.js';

const MAX_MODULES=MAX_SOURCE_FILES;

/** Carga módulos .pdiscord durante el arranque. El código JavaScript importado se ejecuta con permisos del proceso Node.js. */
export class ProjectModules {
  private readonly pending:string[]=[];
  private readonly scheduled=new Set<string>();
  private readonly seen:Set<string>;
  private readonly entryDir:string;
  private readonly rootDir:string;
  private active=true;
  constructor(private readonly program:Program, private readonly projectRoot?:string) {
    this.rootDir=resolve(projectRoot??dirname(resolve(program.entryFile??resolve('main.pdiscord'))));
    // Resolver rutas desde projectRoot, no desde el primer archivo de comandos.
    this.entryDir=projectRoot?this.rootDir:dirname(resolve(program.entryFile??resolve('main.pdiscord')));
    this.seen=new Set(program.sourceFiles??(program.entryFile?[resolve(program.entryFile)]:[]));
  }

  private async resolvePath(input:unknown,type:'directory'|'file'):Promise<string>{
    if(!this.program.entryFile)throw new Error('Módulos: no hay un archivo de entrada .pdiscord asociado a la ejecución.');
    const source=await resolveProjectSource(this.rootDir,this.entryDir,input,type,'Módulos');
    return source.path;
  }

  /** Devuelve rutas relativas a projectRoot o al archivo de entrada. */
  async list(folder:unknown,recursive=false):Promise<string[]>{
    const root=await this.resolvePath(folder,'directory');
    const found=await collectSourceFiles(root,{projectRoot:this.rootDir,recursive,maxFiles:MAX_MODULES});
    return found.map(path=>`./${relative(this.entryDir,path).replaceAll('\\','/')}`).sort((a,b)=>a.localeCompare(b,'en'));
  }

  /** Encola un archivo, su parser y registro tienen lugar tras AL PREPARAR. */
  async queue(file:unknown):Promise<boolean>{
    if(!this.active)throw new Error('CARGAR_MODULO: operación fuera de la fase AL PREPARAR.');
    const path=await this.resolvePath(file,'file');
    if(this.seen.has(path)||this.scheduled.has(path))return false;
    if(this.pending.length+this.scheduled.size>MAX_MODULES)throw new Error(`CARGAR_MODULO: límite de ${MAX_MODULES} módulos por arranque excedido.`);
    this.pending.push(path);this.scheduled.add(path);
    return true;
  }

  readonly api={
    LISTAR_MODULOS:(folder:unknown,recursive=false)=>this.list(folder,recursive),
    CARGAR_MODULO:(file:unknown)=>this.queue(file),
    listarModulos:(folder:unknown,recursive=false)=>this.list(folder,recursive),
    cargarModulo:(file:unknown)=>this.queue(file),
  };

  async finish(interpreter:Interpreter):Promise<number>{
    let count=0;
    try{
      await interpreter.prepareDeclarations(this.program.body);
      while(this.pending.length){
        const path=this.pending.shift()!;
        const loaded=await loadProgramFile(path,{seenPaths:this.seen,projectRoot:this.rootDir});
        const additions=loaded.body;
        if(this.seen.size>MAX_MODULES)throw new Error(`CARGAR_MODULO: límite de ${MAX_MODULES} archivos de proyecto excedido.`);
        if(!additions.length)continue;
        const combined={...this.program,body:[...this.program.body,...additions]};
        const result=validate(combined);
        const errors=result.diagnostics.filter(x=>x.severity==='error');
        if(errors.length)throw new Error(`CARGAR_MODULO '${path}': ${errors.map(d=>`${d.source??path}:${d.line??'?'} ${d.code}: ${d.message}`).join('; ')}`);
        (this.program.body as TopLevelDeclaration[]).push(...additions);
        await interpreter.initializeDeclarations(additions);
        await interpreter.prepareDeclarations(additions);
        count++;
        if(count>MAX_MODULES)throw new Error('CARGAR_MODULO: cantidad de módulos dinámicos superior al límite de preparación.');
      }
      return count;
    } finally {this.active=false;}
  }
}
