import type { Program, TopLevelDeclaration, FunctionDeclaration } from '../ast/declarations.js';
import { normalizeIdentifier as normalize } from './identifiers.js';
import { parseExpressionText } from './parser.js';
import { hasCommandOptionContextCollision, contextOptionRoute } from './command-context.js';
import type { Statement } from '../ast/statements.js';
import type { Expression } from '../ast/expressions.js';
import type { TypeNode } from '../ast/types.js';
import { createStdlib } from '../runtime/stdlib.js';
import { matchesType, typeName } from '../runtime/type-system.js';
import { createDiagnostic } from './diagnostics.js';
import type { Diagnostic } from './diagnostics.js';

export interface SemanticOptions { strictNames?: boolean; externalFunctions?: readonly string[] }
type SymbolInfo = { type?: TypeNode; readonly?: boolean; moduleExports?: Set<string>; ambiguousOption?:string };
const contextNames = [
  'cliente','client','mensaje','message','interaccion','interaction','usuario','autor','ejecutor','miembro','canal','servidor','guild','cuenta',
  'autorId','autorNombre','canalId','nombreCanal','servidorId','nombreServidor','botId',
  'AUTOR_ID','AUTOR_NOMBRE','CANAL_ID','NOMBRE_CANAL','SERVIDOR_ID','NOMBRE_SERVIDOR','BOT_ID',
  'reaccion','voz','objetivo','usuarioObjetivo','mensajeObjetivo','textoArgumentos','partes','argumentos','valores','campos','modal','boton','menu','id','valor','opcion',
  'contexto','anterior','nuevo','entrada','salida','hilo','evento','regla','accion','sonido','sticker','emoji','respuesta','entitlement',
];

class Scope {
  private readonly names=new Map<string,SymbolInfo>();
  constructor(readonly parent?:Scope) {}
  define(name:string, info:SymbolInfo = {}):boolean { const k=normalize(name); if(this.names.has(k))return false;this.names.set(k,info);return true; }
  markOptionCollision(name:string):void { const k=normalize(name);this.names.set(k,{...this.names.get(k),ambiguousOption:name}); }
  resolve(name:string):SymbolInfo|undefined {return this.names.get(normalize(name))??this.parent?.resolve(name);}
}

export function analyzeSemantics(program:Program, options:SemanticOptions={}):Diagnostic[]{
  const out:Diagnostic[]=[];
  const emit=(severity:Diagnostic['severity'],code:string,message:string,node:{span?:any})=>out.push(createDiagnostic(severity,code,message,node));
  const globals=new Scope();
  for(const k of Object.keys(createStdlib()))globals.define(k,{readonly:true});
  for(const k of options.externalFunctions??[])globals.define(k,{readonly:true});
  for(const k of ['discord','IMPORTAR_JS','PI','E','LISTAR_MODULOS','CARGAR_MODULO','listarModulos','cargarModulo'])globals.define(k,{readonly:true});
  for(const k of ['GUARDAR_USUARIO','OBTENER_USUARIO','BORRAR_USUARIO','INCREMENTAR_USUARIO','GUARDAR_SERVIDOR','OBTENER_SERVIDOR','BORRAR_SERVIDOR','INCREMENTAR_SERVIDOR','GUARDAR_GLOBAL','OBTENER_GLOBAL','BORRAR_GLOBAL','INCREMENTAR_GLOBAL'])globals.define(k,{readonly:true});
  for(const decl of program.body){
    if(decl.kind==='VariableTopLevelDeclaration')globals.define(decl.name,{type:decl.typeAnnotation,readonly:decl.declaration==='CONSTANTE'});
    if(decl.kind==='FunctionDeclaration'||decl.kind==='RecordDeclaration'||decl.kind==='EnumDeclaration')globals.define(decl.name,{readonly:true});
    if(decl.kind==='ModuleDeclaration')globals.define(decl.name,{readonly:true,moduleExports:new Set(decl.body.filter(d=>('exported' in d)&&d.exported).map(d=>(d as any).name))});
  }
  const literalValue=(expr:Expression):unknown => expr.kind==='LiteralExpression'?expr.value:undefined;
  const checkLiteral=(expr:Expression,type:TypeNode|undefined,node:any,where:string)=>{
    if(!type || expr.kind!=='LiteralExpression')return;
    try{if(!matchesType(literalValue(expr),type))emit('error','Semantic-TipoIncompatible-Error',`Tipo incompatible en ${where}: esperado '${typeName(type)}'.`,node);}
    catch(e){emit('error','Semantic-ValidacionTipo-Error',(e as Error).message,node);}
  };
  const declare=(scope:Scope,name:string,node:any,info:SymbolInfo={})=>{
    if(!scope.define(name,info))emit('error','Semantic-DeclaracionDuplicada-Error',`Declaración local duplicada: '${name}'.`,node);
  };
  // Un alias corto solo se diagnostica cuando aparece en el código, no
  // simplemente porque exista la opción. Los ámbitos léxicos prevalecen.
  const warnShortOption=(name:string,scope:Scope,node:{span?:any}):void=>{
    const option=scope.resolve(name)?.ambiguousOption;
    if(!option)return;
    emit('warning','Validator-OpcionContexto-Error',
      `Identificador ambiguo '${name}': coincide con una opción y una variable del contexto. Argumento: argumentos.${option}; contexto: ${contextOptionRoute(option)}.`,node);
  };
  // Una cadena puede contener expresiones {NOMBRE_DE(usuario)}. Solo se
  // inspeccionan sus colisiones; no alteramos el lint de interpolaciones.
  const inspectOptionReferences=(expression:Expression,scope:Scope,location:{span?:any}):void=>{
    if(expression.kind==='IdentifierExpression'){
      warnShortOption(expression.name,scope,location);return;
    }
    if(expression.kind==='LiteralExpression')return;
    if(expression.kind==='MemberExpression' && expression.object.kind==='IdentifierExpression'
      && ['contexto','argumentos'].includes(normalize(expression.object.name)))return;
    const visit=(value:unknown):void=>{
      if(!value||typeof value!=='object')return;
      if(Array.isArray(value)){for(const child of value)visit(child);return;}
      const record=value as Record<string,unknown>;
      if(typeof record.kind==='string'&&record.kind.endsWith('Expression')){
        inspectOptionReferences(value as Expression,scope,location);return;
      }
      for(const [key,child] of Object.entries(record))if(key!=='span')visit(child);
    };
    for(const [key,child] of Object.entries(expression))if(key!=='span')visit(child);
  };
  const check=(expr:Expression,scope:Scope):void=>{
    switch(expr.kind){
      case 'LiteralExpression': {
        // Lint conservador: solo referencias simples {variable}, no expresiones ni JSON.
        if(typeof expr.value==='string')for(const match of expr.value.matchAll(/\{([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\}/g)){
          const name=match[1]!;
          if(!scope.resolve(name))emit(options.strictNames?'error':'warning','Semantic-InterpolacionSinResolver-Error',`Interpolación sin resolver: '{${name}}'; identificador '${name}' no declarado en el ámbito actual.`,expr);
        }
        if(typeof expr.value==='string')for(const match of expr.value.matchAll(/\{([^{}]+)\}/g)){
          try {inspectOptionReferences(parseExpressionText(match[1]!),scope,expr);}catch{/* No es una expresión DSL válida; conservar el diagnóstico existente. */}
        }
        break;
      }
      case 'IdentifierExpression':
        if(!scope.resolve(expr.name))emit(options.strictNames?'error':'warning','Semantic-IdentificadorNoResuelto-Error',`Identificador no resuelto en el ámbito actual: '${expr.name}'.`,expr);
        else warnShortOption(expr.name,scope,expr);
        break;
      case 'MemberExpression': {
        // `contexto.usuario` y `argumentos.usuario` nunca son alias cortos.
        if(expr.object.kind!=='IdentifierExpression'||!['contexto','argumentos'].includes(normalize(expr.object.name))
          ||!scope.resolve(expr.object.name))check(expr.object,scope);
        if(expr.object.kind==='IdentifierExpression'){
          const sym=scope.resolve(expr.object.name);
          if(sym?.moduleExports && !sym.moduleExports.has(expr.property))emit('error','Semantic-ExportacionInexistente-Error',`Exportación inexistente: '${expr.property}' en el módulo '${expr.object.name}'.`,expr);
        }
        break;
      }
      case 'IndexExpression':check(expr.object,scope);check(expr.index,scope);break;
      case 'CallExpression':check(expr.callee,scope);for(const a of expr.arguments)check(a.value,scope);break;
      case 'NewExpression':check(expr.callee,scope);for(const a of expr.arguments)check(a.value,scope);break;
      case 'UnaryExpression':check(expr.argument,scope);break;
      case 'BinaryExpression':case 'LogicalExpression':check(expr.left,scope);check(expr.right,scope);break;
      case 'NullishExpression':check(expr.left,scope);check(expr.right,scope);break;
      case 'ConditionalExpression':check(expr.condition,scope);check(expr.whenTrue,scope);check(expr.whenFalse,scope);break;
      case 'ArrayExpression':case 'TupleExpression':case 'SetExpression':for(const e of expr.elements)check(e,scope);break;
      case 'MapExpression':for(const e of expr.entries){check(e.key,scope);check(e.value,scope);}break;
      case 'ObjectExpression':for(const p of expr.properties){if(typeof p.key!=='string')check(p.key,scope);check(p.value,scope);}break;
      case 'RangeExpression':check(expr.start,scope);check(expr.end,scope);if(expr.step)check(expr.step,scope);break;
      case 'TemplateExpression':for(const p of expr.parts)if(p.kind==='expression')check(p.value,scope);break;
      case 'AwaitExpression':case 'TypeOfExpression':case 'TypeCheckExpression':case 'CastExpression':check(expr.expression,scope);break;
      case 'LambdaExpression':{const local=new Scope(scope);for(const p of expr.parameters)declare(local,p.name,expr,{type:p.type});if(Array.isArray(expr.body))walk(expr.body as readonly Statement[],local);else check(expr.body as Expression,local);break;}
      case 'DiscordConstructExpression':for(const a of expr.arguments)check(a.value,scope);break;
      case 'DiscordInvokeExpression':if(expr.target)check(expr.target,scope);for(const a of expr.arguments)check(a.value,scope);break;
    }
  };
  const walk=(body:readonly Statement[],scope:Scope):void=>{
    for(const s of body){
      const nested=(b:readonly Statement[],extra:readonly string[]=[]):void=>{const child=new Scope(scope);for(const k of extra)child.define(k);walk(b,child);};
      switch(s.kind){
        case 'VariableDeclarationStatement':
          if(s.value){check(s.value,scope);checkLiteral(s.value,s.typeAnnotation,s,`variable ${s.name}`);}
          declare(scope,s.name,s,{type:s.typeAnnotation,readonly:s.declaration==='CONSTANTE'});break;
        case 'AssignmentStatement':case 'CompoundAssignmentStatement':
          check(s.target,scope);check(s.value,scope);
          if(s.target.kind==='IdentifierExpression'){
            const sym=scope.resolve(s.target.name);
            if(sym?.readonly)emit('error','Semantic-ConstanteInmutable-Error',`Asignación a constante: '${s.target.name}'.`,s);
            if(sym?.type)checkLiteral(s.value,sym.type,s,`asignación a ${s.target.name}`);
          }
          break;
        case 'IncrementStatement':check(s.target,scope);if(s.target.kind==='IdentifierExpression'&&scope.resolve(s.target.name)?.readonly)emit('error','Semantic-ConstanteInmutable-Error',`Modificación de constante: '${s.target.name}'.`,s);break;
        case 'ExpressionStatement':check(s.expression,scope);break;
        case 'JavaScriptStatement':break;
        case 'IfStatement':for(const b of s.branches){check(b.condition,scope);nested(b.body);}if(s.otherwise)nested(s.otherwise);break;
        case 'SwitchStatement':check(s.discriminant,scope);for(const c of s.cases){for(const e of c.tests)check(e,scope);nested(c.body);}if(s.defaultCase)nested(s.defaultCase);break;
        case 'WhileStatement':check(s.condition,scope);nested(s.body);break;
        case 'RepeatUntilStatement':nested(s.body);check(s.condition,scope);break;
        case 'DimensionStatement':for(const size of s.dimensions)check(size,scope);declare(scope,s.name,s);break;
        case 'DoWhileStatement':nested(s.body);check(s.condition,scope);break;
        case 'ForRangeStatement':check(s.start,scope);check(s.end,scope);if(s.step)check(s.step,scope);nested(s.body,[s.variable]);break;
        case 'ForEachStatement':check(s.iterable,scope);nested(s.body,[s.valueVariable,...(s.keyVariable?[s.keyVariable]:[])]);break;
        case 'RepeatStatement':check(s.count,scope);nested(s.body,s.indexVariable?[s.indexVariable]:[]);break;
        case 'InfiniteLoopStatement':case 'BlockStatement':nested(s.body);break;
        case 'TryStatement':nested(s.body);for(const c of s.catches??[])nested(c.body,c.variable?[c.variable]:[]);if(s.finallyBody)nested(s.finallyBody);break;
        case 'ReturnStatement':if(s.value)check(s.value,scope);break;
        case 'ThrowStatement':check(s.value,scope);break;
        case 'AssertStatement':check(s.condition,scope);if(s.message)check(s.message,scope);break;
        case 'WaitStatement':check(s.duration,scope);break;
        case 'ParallelStatement':case 'RaceStatement':for(const b of s.branches)nested(b);break;
        case 'TimeoutStatement':check(s.duration,scope);nested(s.body);if(s.onTimeout)nested(s.onTimeout);break;
        case 'EmitStatement':for(const a of s.arguments)check(a,scope);break;
        case 'LogStatement':for(const a of s.values)check(a,scope);break;
        case 'DiscordBuilderDeclarationStatement':for(const entry of s.entries)for(const a of entry.arguments)check(a,scope);declare(scope,s.name,s);break;
        case 'DiscordActionStatement':if(s.target)check(s.target,scope);for(const a of s.arguments)check(a,scope);break;
      }
    }
  };
  const analyzeBody=(body:readonly Statement[],extra:readonly string[]=[],optionNames:readonly string[]=[]):void=>{
    const injected=new Scope(globals);for(const k of contextNames)injected.define(k);for(const k of extra)injected.define(k);
    for(const name of optionNames)if(hasCommandOptionContextCollision(name))injected.markOptionCollision(name);
    walk(body,new Scope(injected));
  };
  const analyzeDecl=(decl:TopLevelDeclaration):void=>{
    switch(decl.kind){
      case 'VariableTopLevelDeclaration':if(decl.value){check(decl.value,globals);checkLiteral(decl.value,decl.typeAnnotation,decl,`variable ${decl.name}`);}break;
      case 'RecordDeclaration':for(const field of decl.fields)if(field.defaultValue)check(field.defaultValue,globals);break;
      case 'EnumDeclaration':break;
      case 'FunctionDeclaration': {
        // Las funciones no reciben automáticamente objetos Discord salvo si se les pasan.
        const scope=new Scope(globals);
        for(const p of decl.parameters){if(p.defaultValue){check(p.defaultValue,scope);checkLiteral(p.defaultValue,p.type,decl,`valor por defecto ${p.name}`);}declare(scope,p.name,decl,{type:p.type});}
        walk(decl.body,scope);break;
      }
      case 'DiscordCommandDeclaration': {
        // Atajos posicionales definidos únicamente dentro de comandos.
        const positional=Array.from({length:25},(_,i)=>`argumento${i+1}`);
        analyzeBody(decl.body,[...positional,...decl.options.map(o=>o.name)],decl.options.map(o=>o.name));
        for(const sub of decl.subcommands??[])analyzeBody(sub.body,[...positional,...sub.options.map(o=>o.name)],sub.options.map(o=>o.name));
        for(const group of decl.groups??[])for(const sub of group.subcommands)analyzeBody(sub.body,[...positional,...sub.options.map(o=>o.name)],sub.options.map(o=>o.name));break;
      }
      case 'DiscordContextCommandDeclaration':analyzeBody(decl.body);break;
      case 'DiscordComponentHandlerDeclaration':analyzeBody(decl.body);break;
      case 'DiscordEventDeclaration':analyzeBody(decl.body,decl.parameters);break;
      case 'StartupDeclaration':analyzeBody(decl.body);break;
      case 'SchedulerDeclaration':if(decl.every)check(decl.every,globals);if(decl.at)check(decl.at,globals);analyzeBody(decl.body);break;
      case 'ModuleDeclaration': {
        const moduleScope=new Scope(globals);
        for(const member of decl.body){
          if(member.kind==='FunctionDeclaration'||member.kind==='VariableTopLevelDeclaration'||member.kind==='EnumDeclaration'||member.kind==='RecordDeclaration')
            declare(moduleScope,member.name,member,member.kind!=='VariableTopLevelDeclaration'?{readonly:true}:{type:member.typeAnnotation,readonly:member.declaration==='CONSTANTE'});
          else if(member.kind==='ModuleDeclaration')declare(moduleScope,member.name,member,{readonly:true});
        }
        for(const member of decl.body){
          if(member.kind==='VariableTopLevelDeclaration'&&member.value){
            check(member.value,moduleScope);checkLiteral(member.value,member.typeAnnotation,member,`variable ${member.name}`);
          } else if(member.kind==='FunctionDeclaration'){
            const inner=new Scope(moduleScope);
            for(const param of member.parameters){
              if(param.defaultValue){check(param.defaultValue,inner);checkLiteral(param.defaultValue,param.type,member,`parámetro ${param.name}`);}
              declare(inner,param.name,member,{type:param.type});
            }
            walk(member.body,inner);
          }
        }
        break;
      }
    }
  };
  for(const decl of program.body)analyzeDecl(decl);
  return out;
}
