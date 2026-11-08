import { AsyncLocalStorage } from 'node:async_hooks';
import type { Program, FunctionDeclaration, RecordDeclaration, EnumDeclaration } from '../ast/declarations.js';
import type { Statement } from '../ast/statements.js';
import type { Expression, CallExpression, MemberExpression } from '../ast/expressions.js';
import type { TypeNode } from '../ast/types.js';
import { Environment } from './environment.js';
import { createStdlib } from './stdlib.js';
import { UserInputError } from './user-input.js';
import { COMMAND_INVOCATION } from './command-context.js';
import { parseExpressionText } from '../language/parser.js';
import { matchesType, assertRuntimeType, castValue, runtimeTypeOf, typeName } from './type-system.js';
import { runExecution, executionGuard, runConcurrent, runWithTimeout, sleepCancelable } from './execution.js';
import type { PersistentStore } from './storage/index.js';
import { createStorageBindings } from './storage/bindings.js';
import type { CommandCooldowns } from './cooldowns.js';
import { evaluateBinary } from './operators.js';
import { constructDiscordBuilder } from './discord/builders.js';
import { normalizeMessagePayload } from './discord/payload.js';
import { dispatchDiscordAction } from './discord/actions.js';
import { parseDuration } from './duration.js';
import { assertDiscordActionPermission } from './discord/action-permissions.js';

class ReturnSignal { constructor(public value:any){} }
class BreakSignal {}
class ContinueSignal {}

export interface ExecutionOptions { maxIterations?:number; maxExecutionMs?:number; storage?:PersistentStore; moduleFunctions?:Record<string, (...args:any[])=>any>; client?:any; cooldowns?:CommandCooldowns; }
export interface ExecutionContext { [key:string]:any; [COMMAND_INVOCATION]?:boolean; }
interface UserFunction { readonly __pseudoFunction:true; }
interface UserFunctionDetails { readonly declaration:FunctionDeclaration; readonly closure:Environment; }

export class Interpreter {
  readonly globals=new Environment();
  /** Contexto asincrónico aislado por ejecución: ningún comando ve el autor/canal de otro. */
  private readonly discordContext=new AsyncLocalStorage<ExecutionContext>();
  readonly options:Required<Pick<ExecutionOptions,'maxIterations'|'maxExecutionMs'>>;
  readonly store?:PersistentStore;
  private readonly pseudoFunctions = new WeakMap<object,UserFunctionDetails>();
  private readonly dimensionedArrays=new WeakSet<object>();
  constructor(public readonly program:Program, public readonly discord:any={}, options:ExecutionOptions={}){
    this.options={maxIterations:options.maxIterations??100_000,maxExecutionMs:options.maxExecutionMs??30_000};
    this.store=options.storage;
    for(const [k,v] of Object.entries(createStdlib({discord:this.discord,client:options.client,cooldowns:options.cooldowns,context:()=>this.discordContext.getStore(),invokeCallback:(fn,args)=>this.invokeCollectionCallback(fn,args)}))) { if(!this.globals.hasLocal(k)) this.globals.define(k,v,true); }
    {
      this.globals.define('discord',discord,true);
      const importer=async (specifier:unknown):Promise<unknown> => {
        if(typeof specifier!=='string'||!specifier.trim())throw new Error('IMPORTAR_JS: identificador de módulo vacío o no válido.');
        this.guard();
        const module=await import(specifier);
        this.guard();return module;
      };
      this.globals.define('IMPORTAR_JS',importer,true);
    }
    for (const [name, fn] of Object.entries(createStorageBindings(() => this.store))) {
      this.globals.define(name,fn,true);
    }
    for(const [name,fn] of Object.entries(options.moduleFunctions??{})){if(this.globals.hasLocal(name))throw new Error(`Registro de módulo: función duplicada '${name}'.`);this.globals.define(name,fn,true);}
    this.globals.define('PI',Math.PI,true); this.globals.define('E',Math.E,true);
    for(const d of program.body){
      if(d.kind==='VariableTopLevelDeclaration') this.globals.define(d.name,undefined,d.declaration==='CONSTANTE',d.typeAnnotation);
    }
  }

  async initialize():Promise<void>{await this.initializeDeclarations(this.program.body);}

  /** Registra funciones cargadas durante AL PREPARAR sin reinicializar módulos previos. */
  async initializeDeclarations(body:readonly import('../ast/declarations.js').TopLevelDeclaration[]):Promise<void>{
    return runExecution(this.options,undefined,async()=>{
      for(const d of body)if(d.kind==='VariableTopLevelDeclaration'&&!this.globals.hasLocal(d.name))
        this.globals.define(d.name,undefined,d.declaration==='CONSTANTE',d.typeAnnotation);
      for(const d of body){
        if(d.kind==='FunctionDeclaration')this.globals.define(d.name,this.createPseudoFunction(d,this.globals),true);
        if(d.kind==='EnumDeclaration')this.globals.define(d.name,this.createEnum(d),true);
        if(d.kind==='RecordDeclaration')this.globals.define(d.name,this.createRecord(d,this.globals),true);
      }
      for(const d of body){
        if(d.kind==='VariableTopLevelDeclaration'&&d.value){
          const value=await this.eval(d.value,this.globals,{});
          this.assertType(value,d.typeAnnotation,`variable ${d.name}`);
          this.globals.setInitial(d.name,value);
        }
        if(d.kind==='ModuleDeclaration') await this.initializeModule(d.name,d.body,this.globals);
      }
    });
  }

  /** Ejecuta únicamente los preparadores nuevos antes de iniciar el cliente Discord. */
  async prepareDeclarations(body:readonly import('../ast/declarations.js').TopLevelDeclaration[]):Promise<void>{
    for(const d of body)if(d.kind==='StartupDeclaration')await this.execute(d.body,{});
  }

  private async initializeModule(name:string,body:readonly import('../ast/declarations.js').TopLevelDeclaration[],parent:Environment):Promise<void>{
    const moduleEnv=new Environment(parent);
    for(const d of body){
      if(d.kind==='VariableTopLevelDeclaration')moduleEnv.define(d.name,undefined,d.declaration==='CONSTANTE',d.typeAnnotation);
      else if(d.kind==='FunctionDeclaration')moduleEnv.define(d.name,this.createPseudoFunction(d,moduleEnv),true);
      else if(d.kind==='EnumDeclaration')moduleEnv.define(d.name,this.createEnum(d),true);
      else if(d.kind==='RecordDeclaration')moduleEnv.define(d.name,this.createRecord(d,moduleEnv),true);
    }
    for(const d of body){
      if(d.kind==='VariableTopLevelDeclaration'&&d.value){const v=await this.eval(d.value,moduleEnv,{});this.assertType(v,d.typeAnnotation,`variable ${d.name}`);moduleEnv.setInitial(d.name,v);}
      if(d.kind==='ModuleDeclaration')await this.initializeModule(d.name,d.body,moduleEnv);
    }
    const namespace:Record<string,unknown>=Object.create(null);
    for(const d of body)if((d.kind==='FunctionDeclaration'||d.kind==='VariableTopLevelDeclaration'||d.kind==='EnumDeclaration'||d.kind==='RecordDeclaration')&&d.exported){
      Object.defineProperty(namespace,d.name,{enumerable:true,get:()=>moduleEnv.get(d.name)});
    }
    Object.freeze(namespace);
    parent.define(name,namespace,true);
  }

  private createEnum(decl:EnumDeclaration):Readonly<Record<string,string|number>> {
    const values:Record<string,string|number>=Object.create(null);
    let next=0;
    for(const member of decl.members){
      const value=member.value??next;
      values[member.name]=value;
      next=typeof value==='number'?value+1:next;
    }
    return Object.freeze(values);
  }

  private createRecord(decl:RecordDeclaration,closure:Environment):Function {
    const factory=async (...inputs:any[])=>{
      this.guard();
      const dictionary=inputs.length===1&&inputs[0]!==null&&typeof inputs[0]==='object'&&!Array.isArray(inputs[0])?inputs[0]:null;
      if(dictionary){const accepted=new Set(decl.fields.map(f=>f.name));for(const key of Object.keys(dictionary))if(!accepted.has(key))throw new Error(`REGISTRO '${decl.name}': campo no declarado '${key}'.`);}
      const data:Record<string,unknown>=Object.create(null);
      for(let i=0;i<decl.fields.length;i++){
        const field=decl.fields[i]!;
        const provided=dictionary?Object.prototype.hasOwnProperty.call(dictionary,field.name):i<inputs.length;
        const value=provided?(dictionary?dictionary[field.name]:inputs[i]):field.defaultValue?await this.eval(field.defaultValue,closure,{}):undefined;
        if(value===undefined&&!field.optional)throw new Error(`REGISTRO '${decl.name}': falta el campo requerido '${field.name}'.`);
        if(value!==undefined)this.assertType(value,field.type,`campo ${decl.name}.${field.name}`);
        data[field.name]=value;
      }
      return data;
    };
    return factory;
  }

  private createPseudoFunction(declaration:FunctionDeclaration,closure:Environment):UserFunction{
    const fn:UserFunction=Object.freeze(Object.assign(Object.create(null),{__pseudoFunction:true}));this.pseudoFunctions.set(fn,{declaration,closure});return fn;
  }

  async execute(body:readonly Statement[],context:ExecutionContext={},parent?:Environment,signal?:AbortSignal):Promise<any>{
    return runExecution(this.options,signal,async()=>{
      const env=new Environment(parent??this.globals);
      for(const [k,v] of Object.entries(context)) if(!env.hasLocal(k)) env.define(k,v,false);
      return this.discordContext.run(context,async()=>{
        try{await this.execBlock(body,env,context);}catch(e){if(e instanceof ReturnSignal)return e.value;throw e;}
      });
    });
  }

  async eval(expr:Expression, env:Environment, ctx:ExecutionContext):Promise<any>{
    this.guard();
    switch(expr.kind){
      case 'LiteralExpression': return typeof expr.value==='string'?await this.interpolate(expr.value,env,ctx):expr.value;
      case 'IdentifierExpression': return env.get(expr.name);
      case 'ArrayExpression': return this.evalElements(expr.elements,env,ctx);
      case 'TupleExpression': return this.evalElements(expr.elements,env,ctx);
      case 'ObjectExpression': { const o:any=Object.create(null); for(const p of expr.properties){const k=typeof p.key==='string'?p.key:await this.eval(p.key,env,ctx);o[k as any]=await this.eval(p.value,env,ctx);} return o; }
      case 'SetExpression': return new Set(await this.evalElements(expr.elements,env,ctx));
      case 'MapExpression': {const m=new Map();for(const x of expr.entries)m.set(await this.eval(x.key,env,ctx),await this.eval(x.value,env,ctx));return m;}
      case 'RangeExpression': {const a=Number(await this.eval(expr.start,env,ctx)),b=Number(await this.eval(expr.end,env,ctx)),s=expr.step?Number(await this.eval(expr.step,env,ctx)):a<=b?1:-1;const out:number[]=[];if(![a,b,s].every(Number.isFinite)||s===0||(a!==b&&(b>a?s<0:s>0)))throw new Error('RANGO: extremos/paso no finitos, paso cero o dirección incompatible.');for(let i=a;s>0?(expr.inclusive===false?i<b:i<=b):(expr.inclusive===false?i>b:i>=b);){if(out.length>=1_000_000)throw new Error('RANGO: límite excedido (1 000 000 elementos).');out.push(i);const next=i+s;if(next===i)throw new Error('RANGO: el paso no modifica el valor por pérdida de precisión.');i=next;}return out;}
      case 'UnaryExpression': {const x=await this.eval(expr.argument,env,ctx);if(expr.operator==='NO')return !x;if(expr.operator==='-')return -x;if(expr.operator==='+')return +x;if(expr.operator==='BIT_NO')return ~x;break;}
      case 'BinaryExpression': return evaluateBinary(expr.operator,await this.eval(expr.left,env,ctx),await this.eval(expr.right,env,ctx));
      case 'LogicalExpression': {const a=await this.eval(expr.left,env,ctx);return expr.operator==='Y'?(a?this.eval(expr.right,env,ctx):a):(a?a:this.eval(expr.right,env,ctx));}
      case 'NullishExpression': {const a=await this.eval(expr.left,env,ctx);return a??this.eval(expr.right,env,ctx);}
      case 'ConditionalExpression': return (await this.eval(expr.condition,env,ctx))?this.eval(expr.whenTrue,env,ctx):this.eval(expr.whenFalse,env,ctx);
      case 'MemberExpression': {const o=await this.eval(expr.object,env,ctx);if((o===null||o===undefined)&&expr.optional)return undefined;if(o==null)throw new Error(`Acceso a propiedad '.${expr.property}' sobre valor ${o===null?'null':'undefined'}.`);return o[expr.property];}
      case 'IndexExpression': {const o=await this.eval(expr.object,env,ctx);if((o===null||o===undefined)&&expr.optional)return undefined;const key=await this.eval(expr.index,env,ctx);
        if(Array.isArray(o)&&this.dimensionedArrays.has(o)&&(!Number.isSafeInteger(key)||key<0||key>=o.length))throw new RangeError(`DIMENSION: índice fuera de rango (${String(key)}).`);
        return o[key];}
      case 'CallExpression': return this.call(expr,env,ctx);
      case 'NewExpression': {const C=await this.eval(expr.callee,env,ctx);const args:any[]=[];for(const a of expr.arguments)args.push(await this.eval(a.value,env,ctx));return Reflect.construct(C,args);}
      case 'AwaitExpression': return await this.eval(expr.expression,env,ctx);
      case 'TypeOfExpression': return this.typeOf(await this.eval(expr.expression,env,ctx));
      case 'TemplateExpression': {let s='';for(const p of expr.parts)s+=p.kind==='text'?p.value:String(await this.eval(p.value,env,ctx));return s;}
      case 'RegexExpression': return new RegExp(expr.pattern,expr.flags);
      case 'DiscordReferenceExpression': {let x=this.discord[expr.owner];for(const p of expr.path??[])x=x?.[p];return x;}
      case 'DiscordConstructExpression': {const C=this.discord[expr.owner];const args:any[]=[];for(const a of expr.arguments)args.push(await this.eval(a.value,env,ctx));return Reflect.construct(C,args);}
      case 'DiscordInvokeExpression': {const target=expr.target?await this.eval(expr.target,env,ctx):this.discord[expr.owner];const fn=expr.static?this.discord[expr.owner]?.[expr.member]:target?.[expr.member];const args:any[]=[];for(const a of expr.arguments)args.push(await this.eval(a.value,env,ctx));const r=fn.apply(expr.static?this.discord[expr.owner]:target,args);return expr.await?await r:r;}
      case 'TypeCheckExpression': return matchesType(await this.eval(expr.expression,env,ctx),expr.expected);
      case 'CastExpression': return castValue(await this.eval(expr.expression,env,ctx),expr.target);
      case 'LambdaExpression': {const self=this;const fn=async function(...args:any[]){const child=new Environment(env);expr.parameters.forEach((p,i)=>child.define(p.name,args[i]));if(Array.isArray(expr.body)){try{await self.execBlock(expr.body,child,ctx)}catch(e){if(e instanceof ReturnSignal)return e.value;throw e;}return;}return self.eval(expr.body as Expression,child,ctx);};return fn;}
    }
    throw new Error(`Intérprete: tipo de expresión no implementado '${(expr as any).kind}'.`);
  }

  private async evalElements(elements:readonly Expression[],env:Environment,ctx:ExecutionContext):Promise<any[]>{
    const values:any[]=[];for(const e of elements)values.push(await this.eval(e,env,ctx));return values;
  }

  private async execBlock(body:readonly Statement[],env:Environment,ctx:ExecutionContext):Promise<void>{for(const s of body){this.guard();await this.exec(s,env,ctx);this.guard();}}
  private async exec(s:Statement,env:Environment,ctx:ExecutionContext):Promise<void>{
    this.guard();
    switch(s.kind){
      case 'EmptyStatement':return;
      case 'BlockStatement':return this.execBlock(s.body,new Environment(env),ctx);
      case 'ExpressionStatement':await this.eval(s.expression,env,ctx);return;
      case 'VariableDeclarationStatement':{const value=s.value?await this.eval(s.value,env,ctx):undefined;if(s.value)this.assertType(value,s.typeAnnotation,`variable ${s.name}`);env.define(s.name,value,s.declaration==='CONSTANTE',s.typeAnnotation);return;}
      case 'AssignmentStatement':return this.assign(s.target,await this.eval(s.value,env,ctx),env,ctx);
      case 'CompoundAssignmentStatement':{const old=await this.eval(s.target,env,ctx);const value=evaluateBinary(s.operator.slice(0,-1) as any,old,await this.eval(s.value,env,ctx));return this.assign(s.target,value,env,ctx);}
      case 'IncrementStatement':{const old=await this.eval(s.target,env,ctx);return this.assign(s.target,old+s.amount,env,ctx);}
      case 'IfStatement':for(const b of s.branches){if(await this.eval(b.condition,env,ctx)){await this.execBlock(b.body,new Environment(env),ctx);return;}}if(s.otherwise)await this.execBlock(s.otherwise,new Environment(env),ctx);return;
      case 'SwitchStatement':{const v=await this.eval(s.discriminant,env,ctx);for(const c of s.cases){for(const t of c.tests)if(v===await this.eval(t,env,ctx)){await this.execBlock(c.body,new Environment(env),ctx);return;}}if(s.defaultCase)await this.execBlock(s.defaultCase,new Environment(env),ctx);return;}
      case 'WhileStatement':while(await this.eval(s.condition,env,ctx)){this.loop();try{await this.execBlock(s.body,new Environment(env),ctx)}catch(e){if(e instanceof BreakSignal)break;if(e instanceof ContinueSignal)continue;throw e;}}return;
      case 'DoWhileStatement':do{this.loop();try{await this.execBlock(s.body,new Environment(env),ctx)}catch(e){if(e instanceof BreakSignal)break;if(!(e instanceof ContinueSignal))throw e;}}while(await this.eval(s.condition,env,ctx));return;
      case 'ForRangeStatement':{const a=Number(await this.eval(s.start,env,ctx)),b=Number(await this.eval(s.end,env,ctx)),step=s.step?Number(await this.eval(s.step,env,ctx)):a<=b?1:-1;if(![a,b,step].every(Number.isFinite)||step===0||(a!==b&&(b>a?step<0:step>0)))throw new Error('PARA: extremos/paso no finitos, paso cero o dirección incompatible.');for(let i=a;step>0?(s.inclusive===false?i<b:i<=b):(s.inclusive===false?i>b:i>=b);i+=step){this.loop();if(i+step===i)throw new RangeError('PARA: el paso no modifica el índice por pérdida de precisión.');const e=new Environment(env);e.define(s.variable,i);try{await this.execBlock(s.body,e,ctx)}catch(x){if(x instanceof BreakSignal)break;if(x instanceof ContinueSignal)continue;throw x;}}return;}
      case 'ForEachStatement':{const it=await this.eval(s.iterable,env,ctx);const entries=it instanceof Map?[...it.entries()]:Array.isArray(it)?it.map((v,i)=>[i,v]):Object.entries(it??{});for(const [k,v] of entries){this.loop();const e=new Environment(env);e.define(s.valueVariable,v);if(s.keyVariable)e.define(s.keyVariable,k);try{await this.execBlock(s.body,e,ctx)}catch(x){if(x instanceof BreakSignal)break;if(x instanceof ContinueSignal)continue;throw x;}}return;}
      case 'RepeatUntilStatement':{
        do{
          this.loop();
          try{await this.execBlock(s.body,new Environment(env),ctx)}
          catch(x){if(x instanceof BreakSignal)break;if(!(x instanceof ContinueSignal))throw x;}
        }while(!await this.eval(s.condition,env,ctx));
        return;
      }
      case 'DimensionStatement':{
        const dimensions:number[]=[];let elements=1,allocatedNodes=0;
        for(const expr of s.dimensions){const n=await this.eval(expr,env,ctx);
          if(!Number.isSafeInteger(n)||n<0)throw new RangeError('DIMENSION: cada tamaño debe ser entero seguro no negativo.');
          if(n>1_000_000||(elements>0&&n>1_000_000/elements))throw new RangeError('DIMENSION: tamaño total excede 1 000 000 elementos.');
          elements*=n;allocatedNodes+=elements;
          if(allocatedNodes>1_000_000 || (dimensions.length>=1 && allocatedNodes-elements>100_000))throw new RangeError('DIMENSION: asignación excede 1 000 000 posiciones o 100 000 subarreglos.');
          dimensions.push(n);
        }
        const allocate=(depth:number):unknown[]=>{const size=dimensions[depth]!;
          const array=Array.from({length:size},()=>depth===dimensions.length-1?null:allocate(depth+1));
          this.dimensionedArrays.add(array);return array;
        };
        env.define(s.name,allocate(0));return;
      }
      case 'RepeatStatement':{const n=Number(await this.eval(s.count,env,ctx));if(!Number.isSafeInteger(n)||n<0)throw new RangeError('REPETIR: cantidad inválida; se requiere entero seguro no negativo.');for(let i=0;i<n;i++){this.loop();const e=new Environment(env);if(s.indexVariable)e.define(s.indexVariable,i);try{await this.execBlock(s.body,e,ctx)}catch(x){if(x instanceof BreakSignal)break;if(x instanceof ContinueSignal)continue;throw x;}}return;}
      case 'InfiniteLoopStatement':while(true){this.loop();try{await this.execBlock(s.body,new Environment(env),ctx)}catch(x){if(x instanceof BreakSignal)break;if(x instanceof ContinueSignal)continue;throw x;}}return;
      case 'BreakStatement':throw new BreakSignal(); case 'ContinueStatement':throw new ContinueSignal();
      case 'ReturnStatement':throw new ReturnSignal(s.value?await this.eval(s.value,env,ctx):undefined);
      case 'ThrowStatement':throw await this.eval(s.value,env,ctx);
      case 'TryStatement':{try{await this.execBlock(s.body,new Environment(env),ctx)}catch(e){if(e instanceof ReturnSignal||e instanceof BreakSignal||e instanceof ContinueSignal)throw e;let handled=false;for(const c of s.catches??[]){const ce=new Environment(env);if(c.variable)ce.define(c.variable,e);await this.execBlock(c.body,ce,ctx);handled=true;break;}if(!handled)throw e;}finally{if(s.finallyBody)await this.execBlock(s.finallyBody,new Environment(env),ctx);}return;}
      case 'AssertStatement':if(!await this.eval(s.condition,env,ctx))throw new Error(s.message?String(await this.eval(s.message,env,ctx)):'AFIRMAR: la condición evaluó a FALSO.');return;
      case 'WaitStatement':{const ms=parseDuration(await this.eval(s.duration,env,ctx));await sleepCancelable(ms);return;}
      case 'LogStatement':{const xs=[];for(const v of s.values)xs.push(await this.eval(v,env,ctx));(s.level==='error'?console.error:s.level==='aviso'?console.warn:s.level==='depurar'?console.debug:console.log)(...xs);return;}
      case 'DiscordBuilderDeclarationStatement':{const value=await this.buildDiscordValue(s,env,ctx);env.define(s.name,value,false);return;}
      case 'DiscordActionStatement':await this.discordAction(s,env,ctx);return;
      case 'ParallelStatement':await runConcurrent(s.branches.map(b=>()=>this.execBlock(b,new Environment(env),ctx)),'all');return;
      case 'RaceStatement':await runConcurrent(s.branches.map(b=>()=>this.execBlock(b,new Environment(env),ctx)),'race');return;
      case 'TimeoutStatement':{const ms=parseDuration(await this.eval(s.duration,env,ctx));await runWithTimeout(ms,()=>this.execBlock(s.body,new Environment(env),ctx),s.onTimeout?()=>this.execBlock(s.onTimeout!,new Environment(env),ctx):undefined);return;}
      case 'JavaScriptStatement':{
        
        // Ejecuta JS real, sin sandbox. La API pseudo permite acceder a las variables del intérprete.
        const pseudo=Object.freeze({
          get:(name:string)=>env.get(name),
          set:(name:string,value:unknown)=>{if(env.has(name))env.set(name,value);else env.define(name,value);return value;},
          context:ctx,
          storage:this.store
        });
        const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
        await new AsyncFunction('pseudo','discord','console',`"use strict";\n${s.code}`)(pseudo,this.discord,console);
        this.guard();return;
      }
      case 'EmitStatement':{const args=[];for(const x of s.arguments)args.push(await this.eval(x,env,ctx));ctx.client?.emit?.(s.event,...args);return;}
    }
    throw new Error(`Intérprete: tipo de instrucción no implementado '${(s as any).kind}'.`);
  }

  /** Callbacks de la biblioteca: respetan closures, tipos y límites de ejecución. */
  private async invokeCollectionCallback(fn:unknown,args:unknown[]):Promise<unknown>{
    this.guard();
    if(fn&&typeof fn==='object'&&this.pseudoFunctions.has(fn as object)){
      const uf=this.pseudoFunctions.get(fn as object)!;
      if(uf.declaration.parameters.some(p=>p.byReference))throw new Error(`Función '${uf.declaration.name}': POR REFERENCIA no se admite como callback de colecciones.`);
      if(args.length>uf.declaration.parameters.length){
        // Las colecciones pasan (valor, índice, colección). Los parámetros adicionales
        // son opcionales y no se consideran un error en callbacks.
        args=args.slice(0,uf.declaration.parameters.length);
      }
      const child=new Environment(uf.closure);
      for(let i=0;i<uf.declaration.parameters.length;i++){
        const param=uf.declaration.parameters[i]!;
        let value=args[i];
        if(value===undefined&&param.defaultValue)value=await this.eval(param.defaultValue,child,this.discordContext.getStore()??{});
        if(value!==undefined)this.assertType(value,param.type,`parámetro ${param.name}`);
        child.define(param.name,value,false,param.type);
      }
      try{await this.execBlock(uf.declaration.body,child,this.discordContext.getStore()??{});}
      catch(error){if(error instanceof ReturnSignal){this.assertType(error.value,uf.declaration.returnType,`retorno de ${uf.declaration.name}`);return error.value;}throw error;}
      this.assertType(undefined,uf.declaration.returnType,`retorno de ${uf.declaration.name}`);
      return undefined;
    }
    if(typeof fn!=='function')throw new TypeError('Colección: callback no ejecutable.');
    const result=await fn(...args);this.guard();return result;
  }

  private async call(expr:CallExpression,env:Environment,ctx:ExecutionContext):Promise<any>{
    let fn:any,thisArg:any=undefined;
    if(expr.callee.kind==='MemberExpression'){const m=expr.callee as MemberExpression;thisArg=await this.eval(m.object,env,ctx);if((thisArg==null)&&m.optional)return undefined;fn=thisArg?.[m.property];}
    else fn=await this.eval(expr.callee,env,ctx);
    if(fn&&typeof fn==='object'&&this.pseudoFunctions.has(fn)){
      const uf=this.pseudoFunctions.get(fn)!;const child=new Environment(uf.closure);
      if(expr.arguments.length>uf.declaration.parameters.length)throw new Error(`Función '${uf.declaration.name}': exceso de argumentos posicionales.`);
      for(let i=0;i<uf.declaration.parameters.length;i++){
        const p=uf.declaration.parameters[i]!,arg=expr.arguments[i];
        if(p.byReference){
          if(!arg||arg.spread||arg.value.kind!=='IdentifierExpression')throw new Error(`Parámetro '${p.name}' POR REFERENCIA: se esperaba variable asignable (identificador).`);
          const name=arg.value.name;
          const value=env.get(name);this.assertType(value,p.type,`parámetro por referencia ${p.name}`);
          child.defineReference(p.name,env,name,p.type);
        }else{
          if(arg?.spread)throw new Error('Invocación de función: operador de expansión de argumentos no admitido.');
          let value=arg?await this.eval(arg.value,env,ctx):undefined;
          if(value===undefined&&p.defaultValue)value=await this.eval(p.defaultValue,child,ctx);
          if(value!==undefined)this.assertType(value,p.type,`parámetro ${p.name}`);
          child.define(p.name,value,false,p.type);
        }
      }
      try{await this.execBlock(uf.declaration.body,child,ctx)}catch(e){if(e instanceof ReturnSignal){this.assertType(e.value,uf.declaration.returnType,`retorno de ${uf.declaration.name}`);return e.value;}throw e;}this.assertType(undefined,uf.declaration.returnType,`retorno de ${uf.declaration.name}`);return undefined;
    }
    const args:any[]=[];for(const a of expr.arguments){const v=await this.eval(a.value,env,ctx);if(a.spread)args.push(...v);else args.push(v);}
    if(typeof fn!=='function')throw new Error('Invocación inválida: la expresión evaluó a un valor no ejecutable.');
    const result=await fn.apply(thisArg,args);this.guard();return result;
  }

  private async assign(target:Expression,value:any,env:Environment,ctx:ExecutionContext):Promise<void>{
    if(target.kind==='IdentifierExpression'){this.assertType(value,env.getType(target.name),`asignación a ${target.name}`);env.set(target.name,value);return;}
    if(target.kind==='MemberExpression'){const o=await this.eval(target.object,env,ctx);o[target.property]=value;return;}
    if(target.kind==='IndexExpression'){const o=await this.eval(target.object,env,ctx);const key=await this.eval(target.index,env,ctx);
      if(Array.isArray(o)&&this.dimensionedArrays.has(o)&&(!Number.isSafeInteger(key)||key<0||key>=o.length))throw new RangeError(`DIMENSION: índice fuera de rango (${String(key)}).`);
      o[key]=value;return;}
    throw new Error('Asignación: destino no válido; se requiere identificador, propiedad o índice.');
  }
  private async discordAction(s:any,env:Environment,ctx:ExecutionContext):Promise<any>{
    return dispatchDiscordAction(s,env,ctx,{
      discord:this.discord,
      eval:(expression,scope,context)=>this.eval(expression,scope,context),
      assertActionPermission:(action,context,guild)=>assertDiscordActionPermission(action,context,guild,this.discord),
      resolveChannel:(value,guild,fallback)=>this.resolveChannel(value,guild,fallback),
      resolveUserOrMember:(value,guild,client)=>this.resolveUserOrMember(value,guild,client),
      resolveMember:(value,guild)=>this.resolveMember(value,guild),
      resolveRole:(value,guild)=>this.resolveRole(value,guild),
      mentionId:(value)=>this.mentionId(value),
      duration:parseDuration,
    });
  }

  private async buildDiscordValue(s:any,env:Environment,ctx:ExecutionContext):Promise<any>{
    const entries=[] as {key:string;args:any[];flags:string[]}[];
    for(const e of s.entries){const args=[];for(const x of e.arguments)args.push(await this.eval(x,env,ctx));entries.push({key:String(e.key).toUpperCase(),args,flags:[...(e.flags??[])]});}
    return constructDiscordBuilder(s,entries,this.discord);
  }

  private mentionId(value:any):string|undefined{
    const raw=typeof value==='string'?value:(value?.id??value?.user?.id);
    if(raw===undefined||raw===null)return undefined;
    const str=String(raw);
    const id=str.match(/^<@!?([0-9]{15,22})>$/)?.[1]??str.match(/^<@&([0-9]{15,22})>$/)?.[1]??str.match(/^<#([0-9]{15,22})>$/)?.[1]??str;
    return /^\d{15,22}$/.test(id)?id:undefined;
  }
  private async resolveUserOrMember(x:any,guild:any,contextClient?:any){
    if(x?.send)return x;if(x?.user?.send)return x.user;
    if(typeof x==='string'){
      const id=this.mentionId(x);
      if(!id)throw new UserInputError('ENVIAR PRIVADO: identificador de destinatario no válido (Snowflake o mención).');
      const member=await this.resolveMember(id,guild);
      if(member?.send)return member;
      if(member?.user?.send)return member.user;
      const client=guild?.client??contextClient;
      return typeof client?.users?.fetch==='function'?await client.users.fetch(id):undefined;
    }
    return x?.user??x;
  }
  private async resolveChannel(x:any,guild:any,fallback:any){
    if(x===undefined||x===null||x==='')return fallback;
    if(typeof x!=='string')return x;
    const id=this.mentionId(x);
    const cached=id?guild?.channels?.cache?.get?.(id):undefined;
    if(cached)return cached;
    const byName=guild?.channels?.cache?.find?.((c:any)=>c.name?.toLowerCase()===x.toLowerCase());
    if(byName)return byName;
    if(id&&typeof guild?.channels?.fetch==='function')return guild.channels.fetch(id);
    return undefined;
  }
  private async resolveRole(x:any,guild:any){
    if(typeof x!=='string')return x;
    const id=this.mentionId(x);
    const cached=id?guild?.roles?.cache?.get?.(id):undefined;
    if(cached)return cached;
    const byName=guild?.roles?.cache?.find?.((r:any)=>r.name?.toLowerCase()===x.toLowerCase());
    if(byName)return byName;
    if(id&&typeof guild?.roles?.fetch==='function')return guild.roles.fetch(id);
    return undefined;
  }
  private async resolveMember(x:any,guild:any){
    if(!x||!guild?.members)return undefined;
    if(x?.guild?.id&&x.guild.id===guild.id&&x.roles?.add)return x;
    const id=this.mentionId(x);
    if(!id)return undefined;
    const cached=guild.members.cache?.get?.(id);
    if(cached)return cached;
    if(typeof guild.members.fetch==='function'){
      try{return await guild.members.fetch(id);}catch(error:any){
        if(error?.code===10007||error?.rawError?.code===10007)return undefined;
        throw error;
      }
    }
    return undefined;
  }
  private assertType(value:any,type:TypeNode|undefined,where:string):void{assertRuntimeType(value,type,where);}
  private typeOf(x:any):string{return runtimeTypeOf(x);}
  private guard(){executionGuard();}
  private loop(){executionGuard(true);}
  private async interpolate(text:string,env:Environment,ctx:ExecutionContext):Promise<string>{
    if(!text.includes('{'))return text;
    const re=/\{\{([^{}]*)\}\}|\{([^{}]+)\}/g;let out='',last=0,m:RegExpExecArray|null;
    while((m=re.exec(text))){
      out+=text.slice(last,m.index);if(m[1]!==undefined){out+=`{${m[1]}}`;last=m.index+m[0].length;continue;}let parsed:Expression;
      try{parsed=parseExpressionText(m[2]!);}
      catch{out+=m[0];last=m.index+m[0].length;continue;} // JSON/texto literal, sin expresión DSL.
      try{const result=await this.eval(parsed,env,ctx);out+=result===undefined?'INDEFINIDO':result===null?'NULO':String(result);}
      catch(error){throw new Error(`Interpolación '{${m[2]}}' fallida: ${(error as Error).message}`,{cause:error});}
      last=m.index+m[0].length;
    }
    return out+text.slice(last);
  }
}
