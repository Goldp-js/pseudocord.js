import type { SourceSpan } from '../ast/base.js';
import type {
  Program, TopLevelDeclaration, FunctionDeclaration, FunctionParameterDeclaration,
  DiscordEventDeclaration, DiscordCommandDeclaration, DiscordCommandOptionDeclaration,
  DiscordContextCommandDeclaration, DiscordComponentHandlerDeclaration,
  DiscordSubcommandDeclaration, DiscordSubcommandGroupDeclaration,
  VariableTopLevelDeclaration, SchedulerDeclaration, RecordDeclaration, EnumDeclaration
} from '../ast/declarations.js';
import type {
  Statement, VariableDeclarationStatement, IfStatement, WhileStatement, ForRangeStatement,
  ForEachStatement, RepeatStatement, SwitchStatement, TryStatement, DiscordActionStatement,
  DiscordBuilderDeclarationStatement, DiscordBuilderEntry, ParallelStatement, RaceStatement,
  TimeoutStatement, DoWhileStatement, InfiniteLoopStatement, DimensionStatement, RepeatUntilStatement
} from '../ast/statements.js';
import type { Expression, CallArgument, BinaryOperator } from '../ast/expressions.js';
import type { TypeNode, PrimitiveTypeName } from '../ast/types.js';
import type { Token } from './token.js';
import { upper } from './token.js';
import { lex } from './lexer.js';
import { PseudoDiscordError } from './errors.js';
import { EVENT_ALIASES, PRECEDENCE, BUILDER_WORDS, BUILDER_FLAGS, BUILDER_ENUMS } from './parser-tables.js';

export class Parser {
  private i=0;
  constructor(private readonly tokens: readonly Token[], private readonly sourceName='<memoria>') {}

  parseProgram(): Program {
    const body: TopLevelDeclaration[]=[]; this.skipLines();
    while(!this.is('eof')) { body.push(this.parseTopLevel()); this.skipLines(); }
    // version corresponde al esquema AST, no a la versión del paquete npm.
    return {kind:'Program',version:'0.11',body};
  }

  parseExpressionOnly(): Expression { this.skipLines(); const e=this.parseExpression(); this.skipLines(); this.expect('eof'); return e; }

  private parseTopLevel(): TopLevelDeclaration {
    if(this.matchWord('EXPORTAR')) {
      const declaration=this.parseTopLevel();
      if(declaration.kind!=='FunctionDeclaration'&&declaration.kind!=='VariableTopLevelDeclaration'&&declaration.kind!=='RecordDeclaration'&&declaration.kind!=='EnumDeclaration')throw this.error('EXPORTAR: declaración incompatible; tipos admitidos: FUNCION, VARIABLE, CONSTANTE, REGISTRO, ENUM.');
      return {...declaration,exported:true};
    }
    if(this.matchWord('LOGIN')) throw this.error('Parser-LoginObsoleto-Error: LOGIN BOT ENV fue eliminado. Configura token en new PseudoClient({token}).');
    if(this.matchWord('IMPORTAR')) return this.parseImport();
    if(this.matchWord('VARIABLE')||this.matchWord('CONSTANTE')) { this.i--; return this.parseTopVariable(); }
    if(this.matchWord('FUNCION')) return this.parseFunction(false);
    if(this.matchWord('SUBPROCESO')) return this.parseFunction(false,'SUBPROCESO');
    if(this.matchWord('DEFINIR')) return this.parseDefine(true) as VariableTopLevelDeclaration;
    if(this.matchWord('REGISTRO')) return this.parseRecord();
    if(this.matchWord('ENUM')) return this.parseEnum();
    if(this.matchWord('ASYNC')||this.matchWord('ASINCRONA')||this.matchWord('ASINCRONO')) { this.expectWord('FUNCION'); return this.parseFunction(true); }
    if(this.matchWord('AL')) {
      if(this.matchWord('PREPARAR')){const start=this.prev().span;this.endLine();const body=this.parseStatementsUntil(new Set(['FIN']));this.expectWord('FIN');this.optionalWord('PREPARAR');this.endLine();return {kind:'StartupDeclaration',body,span:this.merge(start,this.prev().span)};}
      if(this.checkWord('BOTON')||this.checkWord('MENU')||this.checkWord('SELECT')||this.checkWord('MODAL')||this.checkWord('AUTOCOMPLETAR')) return this.parseComponentHandler();
      return this.parseAliasedEvent();
    }
    if(this.matchWord('EVENTO')) return this.parseRawEvent();
    if(this.matchWord('COMANDO')) return this.parseCommandAny();
    if(this.matchWord('CADA')) return this.parseSchedulerEvery();
    if(this.matchWord('TAREA')) return this.parseSchedulerTask();
    throw this.error(`Declaración no reconocida: '${this.peek().value}'. Se esperaba IMPORTAR, VARIABLE, CONSTANTE, FUNCION, AL, EVENTO, COMANDO, CADA o TAREA.`);
  }

  private parseImport():import('../ast/declarations.js').ImportDeclaration {
    const start=this.prev().span;const source=this.expectString();let alias:string|undefined;if(this.matchWord('COMO'))alias=this.expectWordAny();this.endLine();return {kind:'ImportDeclaration',source,alias,span:this.merge(start,this.prev().span)};
  }

  private parseTopVariable(): VariableTopLevelDeclaration {
    const start=this.peek().span; const d=upper(this.advance().value) as 'VARIABLE'|'CONSTANTE'; const name=this.expectWordAny();
    let typeAnnotation:TypeNode|undefined; if(this.matchP(':')) typeAnnotation=this.parseType();
    let value:Expression|undefined; if(this.matchOp('=')||this.matchOp('<-')) value=this.parseExpression(); this.endLine();
    return {kind:'VariableTopLevelDeclaration',name,declaration:d,value,typeAnnotation,span:this.merge(start,this.prev().span)};
  }

  private parseFunction(async:boolean, terminator='FUNCION'): FunctionDeclaration {
    const start=this.prev().span; const name=this.expectWordAny(); const parameters:FunctionParameterDeclaration[]=[];
    if(this.matchP('(')) {
      if(!this.checkP(')')) do {
        let byReference=false;
        if(this.matchWord('POR')) {this.expectWord('REFERENCIA');byReference=true;}
        const n=this.expectWordAny();
        if(this.matchWord('POR')) {this.expectWord('REFERENCIA');byReference=true;}
        let type:TypeNode|undefined; if(this.matchP(':')) type=this.parseType();
        let def:Expression|undefined;
        if(this.matchOp('=')) {if(byReference)throw this.error('Parámetro POR REFERENCIA: no admite valor predeterminado.');def=this.parseExpression();}
        parameters.push({name:n,type,defaultValue:def,byReference});
      } while(this.matchP(',')); this.expectP(')');
    }
    let returnType:TypeNode|undefined; if(this.matchP(':')) returnType=this.parseType();
    this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord(terminator); this.endLine();
    return {kind:'FunctionDeclaration',name,parameters,returnType,body,async,span:this.merge(start,this.prev().span)};
  }

  private parseDefine(topLevel:boolean):VariableTopLevelDeclaration|VariableDeclarationStatement {
    const start=this.prev().span,name=this.expectWordAny();
    this.expectWord('COMO');const typeAnnotation=this.parseType();this.endLine();
    return topLevel?{kind:'VariableTopLevelDeclaration',name,declaration:'VARIABLE',typeAnnotation,span:this.merge(start,this.prev().span)}:
      {kind:'VariableDeclarationStatement',name,declaration:'VARIABLE',typeAnnotation,span:this.merge(start,this.prev().span)};
  }

  private parseRecord():RecordDeclaration {
    const start=this.prev().span, name=this.expectWordAny();this.endLine();
    const fields:RecordDeclaration['fields'][number][]=[]; const seen=new Set<string>();this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')){
      const field=this.expectWordAny(), key=upper(field);
      if(seen.has(key))throw this.error(`REGISTRO: campo duplicado '${field}'.`);seen.add(key);
      if(['__PROTO__','CONSTRUCTOR','PROTOTYPE'].includes(key))throw this.error(`REGISTRO: identificador reservado '${field}'.`);
      this.expectP(':');const type=this.parseType();
      let defaultValue:Expression|undefined;if(this.matchOp('='))defaultValue=this.parseExpression();
      this.endLine();fields.push({name:field,type,defaultValue});if(fields.length>512)throw this.error('REGISTRO: límite excedido (512 campos).');this.skipLines();
    }
    this.expectWord('FIN');this.optionalWord('REGISTRO');this.endLine();
    return {kind:'RecordDeclaration',name,fields,span:this.merge(start,this.prev().span)};
  }

  private parseEnum():EnumDeclaration {
    const start=this.prev().span,name=this.expectWordAny();this.endLine();
    const members:EnumDeclaration['members'][number][]=[];const seen=new Set<string>();this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')){
      const member=this.expectWordAny(),key=upper(member);
      if(seen.has(key))throw this.error(`ENUM: miembro duplicado '${member}'.`);seen.add(key);
      if(['__PROTO__','CONSTRUCTOR','PROTOTYPE'].includes(key))throw this.error(`ENUM: identificador reservado '${member}'.`);
      let value:string|number|undefined;
      if(this.matchOp('=')){const t=this.peek();if(t.kind==='number'){value=Number(this.numberValue(this.advance().value));if(!Number.isFinite(value))throw this.error('ENUM: valor numérico no finito.');}else if(t.kind==='string')value=this.advance().value;else throw this.error('ENUM: valor incompatible; se esperaba literal de texto o número.');}
      this.endLine();members.push({name:member,value});if(members.length>4096)throw this.error('ENUM: límite excedido (4096 miembros).');this.skipLines();
    }
    this.expectWord('FIN');this.optionalWord('ENUM');this.endLine();
    return {kind:'EnumDeclaration',name,members,span:this.merge(start,this.prev().span)};
  }

  private parseType():TypeNode {
    const t=this.peek(); const name=this.expectWordAny(); const u=upper(name).toLowerCase();
    const primitives=new Set(['nulo','booleano','entero','numero','bigint','texto','fecha','duracion','regex','bytes','json','cualquiera','desconocido','nunca','vacio']);
    let out:TypeNode=primitives.has(u)?{kind:'PrimitiveType',name:u as PrimitiveTypeName,span:t.span}:{kind:'NamedType',name,span:t.span};
    if(this.matchP('?')) out={kind:'OptionalType',inner:out,span:t.span};
    return out;
  }

  private parseAliasedEvent(): DiscordEventDeclaration {
    const start=this.prev().span; const parts:string[]=[];
    while(!this.lineEnd() && this.peek().kind==='word') {
      const u=upper(this.peek().value); if(parts.length && !EVENT_ALIASES[parts.concat(u).join('_')]) break;
      parts.push(u); this.advance();
      if(EVENT_ALIASES[parts.join('_')] && !this.lineEnd()) { const combined=parts.concat(upper(this.peek().value)).join('_'); if(!EVENT_ALIASES[combined]) break; }
    }
    const alias=parts.join('_'); const mapped=EVENT_ALIASES[alias];
    if(!mapped) throw this.errorAt(start,`Evento abreviado desconocido: AL ${parts.join(' ')}`,'Parser-EventoAbreviado-Error');
    const params:string[]=[]; while(!this.lineEnd()) { if(this.matchP(',')) continue; params.push(this.expectWordAny()); }
    this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('AL'); this.endLine();
    return {kind:'DiscordEventDeclaration',event:mapped.event,parameters:params.length?params:mapped.params,body,span:this.merge(start,this.prev().span)};
  }

  private parseComponentHandler():DiscordComponentHandlerDeclaration {
    const start=this.prev().span; const k=upper(this.expectWordAny());
    let componentKind:DiscordComponentHandlerDeclaration['componentKind']; let customId:string|undefined, commandName:string|undefined, optionName:string|undefined;
    if(k==='BOTON'){componentKind='boton';customId=this.expectStringOrWord();}
    else if(k==='MENU'||k==='SELECT'){componentKind='menu';customId=this.expectStringOrWord();}
    else if(k==='MODAL'){componentKind='modal';customId=this.expectStringOrWord();}
    else {componentKind='autocomplete';commandName=this.expectStringOrWord();optionName=this.expectStringOrWord();}
    this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('AL'); this.endLine();
    return {kind:'DiscordComponentHandlerDeclaration',componentKind,customId,commandName,optionName,body,span:this.merge(start,this.prev().span)};
  }

  private parseRawEvent(): DiscordEventDeclaration {
    const start=this.prev().span; const event=this.expectStringOrWord(); const parameters:string[]=[];
    if(this.matchP('(')) { if(!this.checkP(')')) do parameters.push(this.expectWordAny()); while(this.matchP(',')); this.expectP(')'); }
    else while(!this.lineEnd()){ if(this.matchP(',')) continue; parameters.push(this.expectWordAny()); }
    this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('EVENTO'); this.endLine();
    return {kind:'DiscordEventDeclaration',event,parameters,body,span:this.merge(start,this.prev().span)};
  }

  private parseCommandAny():DiscordCommandDeclaration|DiscordContextCommandDeclaration {
    const start=this.prev().span;
    if(this.matchWord('USUARIO')) return this.parseContextCommand(start,'usuario');
    if(this.matchWord('CONTEXTO')) { if(this.matchWord('USUARIO')) return this.parseContextCommand(start,'usuario'); this.expectWord('MENSAJE'); return this.parseContextCommand(start,'mensaje'); }
    if(this.matchWord('BARRA')) return this.parseSlashCommand(start);
    if(this.matchWord('MENSAJE')) return this.parseMessageCommand(start);
    return this.parseSlashCommand(start);
  }

  private parseContextCommand(start:SourceSpan,contextKind:'usuario'|'mensaje'):DiscordContextCommandDeclaration {
    const name=this.expectStringOrWord(); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('COMANDO'); this.endLine();
    return {kind:'DiscordContextCommandDeclaration',contextKind,name,body,span:this.merge(start,this.prev().span)};
  }

  private parseSlashCommand(start:SourceSpan):DiscordCommandDeclaration {
    const name=this.expectStringOrWord(); let description=`Comando /${name}`; if(this.matchWord('DESCRIPCION')) description=this.expectString(); this.endLine();
    const options:DiscordCommandOptionDeclaration[]=[]; const body:Statement[]=[]; const subcommands:DiscordSubcommandDeclaration[]=[]; const groups:DiscordSubcommandGroupDeclaration[]=[];
    let dmPermission:boolean|undefined, nsfw:boolean|undefined; const defaultMemberPermissions:string[]=[]; let permissionError:string|undefined;let cooldown:import('../ast/declarations.js').CommandCooldown|undefined;
    this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) {
      if(this.matchWord('DESCRIPCION')) {description=this.expectString();this.endLine();continue;}
      if(this.matchWord('OPCION')||this.matchWord('ARGUMENTO')) {options.push(this.parseCommandOption());continue;}
      if(this.matchWord('SUBCOMANDO')) {subcommands.push(this.parseSubcommand());continue;}
      if(this.matchWord('GRUPO')) {groups.push(this.parseSubcommandGroup());continue;}
      if(this.matchWord('NSFW')) {nsfw=this.parseOptionalBoolean(true);this.endLine();continue;}
      if(this.matchWord('DM')) {dmPermission=this.parseOptionalBoolean(true);this.endLine();continue;}
      if(this.matchWord('PERMISOS')||this.matchWord('PERMISO')) {do defaultMemberPermissions.push(this.expectStringOrWord()); while(this.matchP(',')); if(this.matchWord('ERROR'))permissionError=this.expectString();this.endLine();continue;}
      if(this.checkWord('ERROR')&&this.peek(1).kind==='word'&&upper(this.peek(1).value)==='PERMISOS'){this.advance();this.advance();permissionError=this.expectString();this.endLine();continue;}
      if(this.matchWord('COOLDOWN')){if(cooldown)throw this.error('COOLDOWN: declaración duplicada dentro del mismo comando.');cooldown=this.parseCommandCooldown();continue;}
      body.push(this.parseStatement()); this.skipLines();
    }
    this.expectWord('FIN'); this.optionalWord('COMANDO'); this.endLine();
    return {kind:'DiscordCommandDeclaration',commandKind:'chat-input',name,description,options,subcommands,groups,body,dmPermission,nsfw,defaultMemberPermissions,permissionError,cooldown,span:this.merge(start,this.prev().span)};
  }

  private parseMessageCommand(start:SourceSpan):DiscordCommandDeclaration {
    const name=this.expectStringOrWord(); let prefix='!'; let prefixExplicit=false; let description=`Comando ${prefix}${name}`; const aliases:string[]=[];
    while(!this.lineEnd()) {
      if(this.matchWord('PREFIJO')) {prefix=this.expectStringOrWord();prefixExplicit=true;}
      else if(this.matchWord('DESCRIPCION')) description=this.expectString();
      else if(this.matchWord('ALIAS')||this.matchWord('ALIASES')) {do aliases.push(this.expectStringOrWord());while(this.matchP(','));}
      else break;
    }
    this.endLine(); const options:DiscordCommandOptionDeclaration[]=[]; const body:Statement[]=[]; const defaultMemberPermissions:string[]=[];let permissionError:string|undefined;let cooldown:import('../ast/declarations.js').CommandCooldown|undefined; this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) {
      if(this.matchWord('DESCRIPCION')) {description=this.expectString();this.endLine();continue;}
      if(this.matchWord('PREFIJO')) {prefix=this.expectStringOrWord();prefixExplicit=true;this.endLine();continue;}
      if(this.matchWord('ALIAS')||this.matchWord('ALIASES')) {do aliases.push(this.expectStringOrWord());while(this.matchP(','));this.endLine();continue;}
      if(this.matchWord('ARGUMENTO')||this.matchWord('OPCION')) {options.push(this.parseCommandOption());continue;}
      if(this.matchWord('PERMISOS')||this.matchWord('PERMISO')) {do defaultMemberPermissions.push(this.expectStringOrWord());while(this.matchP(','));if(this.matchWord('ERROR'))permissionError=this.expectString();this.endLine();continue;}
      if(this.checkWord('ERROR')&&this.peek(1).kind==='word'&&upper(this.peek(1).value)==='PERMISOS'){this.advance();this.advance();permissionError=this.expectString();this.endLine();continue;}
      if(this.matchWord('COOLDOWN')){if(cooldown)throw this.error('COOLDOWN: declaración duplicada dentro del mismo comando.');cooldown=this.parseCommandCooldown();continue;}
      body.push(this.parseStatement()); this.skipLines();
    }
    this.expectWord('FIN'); this.optionalWord('COMANDO'); this.endLine();
    return {kind:'DiscordCommandDeclaration',commandKind:'message-prefix',name,description,options,body,prefix,prefixExplicit,aliases,defaultMemberPermissions,permissionError,cooldown,span:this.merge(start,this.prev().span)};
  }

  private parseCommandCooldown():import('../ast/declarations.js').CommandCooldown {
    const token=this.expectStringOrWord();
    const match=token.match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d)$/i);
    if(!match)throw this.error('COOLDOWN: formato de duración no válido; admitidos: 10s, 5m, 1h, 1d.');
    const durationMs=Number(match[1])*({ms:1,s:1000,m:60000,h:3600000,d:86400000}[match[2]!.toLowerCase() as 'ms'|'s'|'m'|'h'|'d']);
    if(!Number.isSafeInteger(durationMs)||durationMs<1000||durationMs>30*86400000)throw this.error('COOLDOWN: duración fuera de rango (1 segundo–30 días).');
    let scope:import('../ast/declarations.js').CommandCooldown['scope']='usuario', error:string|undefined;
    if(this.matchWord('POR')){
      const value=upper(this.expectWordAny());
      if(!['USUARIO','SERVIDOR','CANAL','GLOBAL'].includes(value))throw this.error('COOLDOWN POR: ámbito no reconocido; admitidos: USUARIO, SERVIDOR, CANAL, GLOBAL.');
      scope=value.toLowerCase() as typeof scope;
    }
    if(this.matchWord('ERROR'))error=this.expectString();
    this.endLine();
    return {durationMs,scope,error};
  }

  private parseSubcommand():DiscordSubcommandDeclaration {
    const name=this.expectStringOrWord(); let description=`Subcomando ${name}`; if(this.matchWord('DESCRIPCION'))description=this.expectString(); this.endLine();
    const options:DiscordCommandOptionDeclaration[]=[]; const body:Statement[]=[]; this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) { if(this.matchWord('DESCRIPCION')){description=this.expectString();this.endLine();continue;} if(this.matchWord('OPCION')||this.matchWord('ARGUMENTO')){options.push(this.parseCommandOption());continue;} body.push(this.parseStatement()); this.skipLines(); }
    this.expectWord('FIN'); this.optionalWord('SUBCOMANDO'); this.endLine(); return {name,description,options,body};
  }

  private parseSubcommandGroup():DiscordSubcommandGroupDeclaration {
    const name=this.expectStringOrWord(); let description=`Grupo ${name}`; if(this.matchWord('DESCRIPCION'))description=this.expectString(); this.endLine(); const subcommands:DiscordSubcommandDeclaration[]=[]; this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) { if(this.matchWord('DESCRIPCION')){description=this.expectString();this.endLine();continue;} this.expectWord('SUBCOMANDO'); subcommands.push(this.parseSubcommand()); this.skipLines(); }
    this.expectWord('FIN'); this.optionalWord('GRUPO'); this.endLine(); return {name,description,subcommands};
  }

  private parseCommandOption(): DiscordCommandOptionDeclaration {
    const optionSpan=this.peek().span;
    const name=this.expectWordAny();
    if(['__proto__','prototype','constructor'].includes(name.toLowerCase()))throw this.error(`ARGUMENTO/OPCION: identificador reservado '${name}'.`);
    let kind:DiscordCommandOptionDeclaration['kind']='texto'; let description=name; let required=false, autocomplete=false;
    const choices:any[]=[];let minValue,maxValue,minLength,maxLength:number|undefined;
    let minBound,maxBound:number|undefined,consumeRest:boolean|undefined;
    const channelTypes:string[]=[];
    const errors:Partial<Record<'faltante'|'invalido'|'minimo'|'maximo'|'eleccion',string>>={};
    const readError=()=>{
      const code=upper(this.expectWordAny()).toLowerCase();
      if(!['faltante','invalido','minimo','maximo','eleccion'].includes(code))throw this.error('ERROR: categoría desconocida; admitidas: FALTANTE, INVALIDO, MINIMO, MAXIMO, ELECCION.');
      if(Object.hasOwn(errors,code))throw this.error(`OPCION '${name}': mensaje ERROR ${code.toUpperCase()} duplicado.`);
      errors[code as keyof typeof errors]=this.expectString();
    };
    while(!this.lineEnd()) {
      if(this.matchWord('TIPO')) kind=upper(this.expectWordAny()).toLowerCase() as any;
      else if(this.matchWord('DESCRIPCION')) description=this.expectString();
      else if(this.matchWord('REQUERIDO')||this.matchWord('OBLIGATORIO')) required=true;
      else if(this.matchWord('OPCIONAL')) required=false;
      else if(this.matchWord('AUTOCOMPLETAR')) autocomplete=true;
      else if(this.matchWord('RESTO'))consumeRest=true;
      else if(this.matchWord('PALABRA'))consumeRest=false;
      else if(this.matchWord('ERROR'))readError();
      else if(this.matchWord('MINIMO')) {minBound=this.expectNumberLiteral();}
      else if(this.matchWord('MAXIMO')) {maxBound=this.expectNumberLiteral();}
      else if(this.matchWord('CANALES')) {do channelTypes.push(this.expectStringOrWord());while(this.matchP(','));}
      else if(this.matchWord('ELECCION')||this.matchWord('OPCIONES')) { const cn=this.expectStringOrWord(); this.expectOpOrP('='); const v=this.peek().kind==='number'?this.numberValue(this.advance().value):this.expectStringOrWord(); choices.push({name:cn,value:v}); }
      else throw this.error(`OPCION: atributo no reconocido '${this.peek().value}'.`);
    }
    if(kind==='texto'){minLength=minBound;maxLength=maxBound;}
    else {minValue=minBound;maxValue=maxBound;}
    this.endLine();
    // Admite mensajes de error legibles, uno por línea, sin confundir ERROR con el log genérico.
    while(this.checkWord('ERROR')&&this.peek(1).kind==='word'&&
      ['FALTANTE','INVALIDO','MINIMO','MAXIMO','ELECCION'].includes(upper(this.peek(1).value))){
      this.advance();readError();this.endLine();
    }
    return {name,span:optionSpan,kind,description,required,autocomplete,choices,minValue,maxValue,minLength,maxLength,channelTypes,
      errors:Object.keys(errors).length?errors:undefined,consumeRest};
  }

  private parseSchedulerEvery():SchedulerDeclaration {
    const start=this.prev().span; const every=this.parseExpression(); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('CADA'); this.endLine(); return {kind:'SchedulerDeclaration',every,body,span:this.merge(start,this.prev().span)};
  }
  private parseSchedulerTask():SchedulerDeclaration {
    const start=this.prev().span; const name=this.lineEnd()?undefined:this.expectStringOrWord(); let every:Expression|undefined,at:Expression|undefined,cron:string|undefined;
    if(!this.lineEnd()) {if(this.matchWord('CADA'))every=this.parseExpression(); else if(this.matchWord('A_LAS')||this.matchWord('A'))at=this.parseExpression(); else if(this.matchWord('CRON'))cron=this.expectString();}
    this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('TAREA'); this.endLine(); return {kind:'SchedulerDeclaration',name,every,at,cron,body,span:this.merge(start,this.prev().span)};
  }

  private parseStatementsUntil(terminators:Set<string>): Statement[] {
    const body:Statement[]=[]; this.skipLines();
    while(!this.is('eof') && !(this.peek().kind==='word' && terminators.has(upper(this.peek().value)))) { body.push(this.parseStatement()); this.skipLines(); }
    return body;
  }

  private parseStatement(): Statement {
    if(this.matchWord('VARIABLE')||this.matchWord('CONSTANTE')) { this.i--; return this.parseVariableStatement(); }
    if(this.matchWord('SI')) return this.parseIf();
    if(this.matchWord('MIENTRAS')) return this.parseWhile();
    if(this.matchWord('HACER')) return this.parseDoWhile();
    if(this.matchWord('PARA')) return this.parseFor();
    if(this.matchWord('REPETIR')) return this.parseRepeat();
    if(this.matchWord('DIMENSION')) return this.parseDimension();
    if(this.matchWord('DEFINIR')) return this.parseDefine(false) as VariableDeclarationStatement;
    if(this.matchWord('BUCLE')) return this.parseInfiniteLoop();
    if(this.matchWord('SEGUN')) return this.parseSwitch();
    if(this.matchWord('INTENTAR')) return this.parseTry();
    if(this.matchWord('PARALELO')) return this.parseParallel();
    if(this.matchWord('CARRERA')) return this.parseRace();
    if(this.matchWord('TIEMPO_LIMITE')||this.matchWord('TIMEOUT')) return this.parseTimeout();
    if(this.matchWord('RETORNAR')) { const span=this.prev().span; const value=this.lineEnd()?undefined:this.parseExpression(); this.endLine(); return {kind:'ReturnStatement',value,span}; }
    if(this.matchWord('ROMPER')) { const span=this.prev().span; this.endLine(); return {kind:'BreakStatement',span}; }
    if(this.matchWord('CONTINUAR')) { const span=this.prev().span; this.endLine(); return {kind:'ContinueStatement',span}; }
    if(this.matchWord('LANZAR')) { const span=this.prev().span; const value=this.parseExpression(); this.endLine(); return {kind:'ThrowStatement',value,span}; }
    if(this.matchWord('AFIRMAR')||this.matchWord('ASSERT')) { const span=this.prev().span; const condition=this.parseExpression(); let message:Expression|undefined; if(this.matchP(',')) message=this.parseExpression(); this.endLine(); return {kind:'AssertStatement',condition,message,span}; }
    if(this.matchWord('ESPERAR')) { const span=this.prev().span; const duration=this.parseExpression(); this.endLine(); return {kind:'WaitStatement',duration,span}; }
    if(this.matchWord('JAVASCRIPT')||this.matchWord('JS')) {
      const start=this.prev().span;const code=this.expectString();this.endLine();
      return {kind:'JavaScriptStatement',code,span:this.merge(start,this.prev().span)};
    }
    if(this.matchWord('EMITIR')) {const span=this.prev().span;const event=this.expectStringOrWord();const args:Expression[]=[];if(this.matchP(','))do args.push(this.parseExpression());while(this.matchP(','));this.endLine();return {kind:'EmitStatement',event,arguments:args,span};}
    if(this.matchWord('IMPRIMIR')||this.matchWord('ESCRIBIR')||this.matchWord('LOG')) { const span=this.prev().span; const values=this.parseExpressionListToLine(); this.endLine(); return {kind:'LogStatement',level:'info',values,span}; }
    if(this.matchWord('DEPURAR')) { const span=this.prev().span; const values=this.parseExpressionListToLine(); this.endLine(); return {kind:'LogStatement',level:'depurar',values,span}; }
    if(this.matchWord('AVISAR')) { const span=this.prev().span; const values=this.parseExpressionListToLine(); this.endLine(); return {kind:'LogStatement',level:'aviso',values,span}; }
    if(this.matchWord('ERROR')) { const span=this.prev().span; const values=this.parseExpressionListToLine(); this.endLine(); return {kind:'LogStatement',level:'error',values,span}; }
    if(this.isBuilderStart()) return this.parseBuilderDeclaration();
    if(this.isDiscordActionStart()) return this.parseDiscordAction();

    const start=this.peek().span; const save=this.i; const possibleTarget=this.parseExpression(4);
    if(this.peek().kind==='operator' && ['=','<-','+=','-=','*=','/=','%=','**='].includes(this.peek().value)) {
      const op=this.advance().value; const value=this.parseExpression(); this.endLine();
      if(op==='='||op==='<-') return {kind:'AssignmentStatement',target:possibleTarget,value,span:this.merge(start,this.prev().span)};
      return {kind:'CompoundAssignmentStatement',operator:op as any,target:possibleTarget,value,span:this.merge(start,this.prev().span)};
    }
    if(this.matchOp('++')){this.endLine();return {kind:'IncrementStatement',target:possibleTarget,amount:1,span:this.merge(start,this.prev().span)};}
    if(this.matchOp('--')){this.endLine();return {kind:'IncrementStatement',target:possibleTarget,amount:-1,span:this.merge(start,this.prev().span)};}
    this.i=save; const expression=this.parseExpression(); this.endLine(); return {kind:'ExpressionStatement',expression,span:this.merge(start,this.prev().span)};
  }

  private parseVariableStatement(): VariableDeclarationStatement {
    const start=this.peek().span; const declaration=upper(this.advance().value) as 'VARIABLE'|'CONSTANTE'; const name=this.expectWordAny(); let typeAnnotation:TypeNode|undefined;if(this.matchP(':'))typeAnnotation=this.parseType(); let value:Expression|undefined;
    if(this.matchOp('=')||this.matchOp('<-')) value=this.parseExpression(); this.endLine(); return {kind:'VariableDeclarationStatement',name,declaration,value,typeAnnotation,span:this.merge(start,this.prev().span)};
  }

  private parseIf(): IfStatement {
    const start=this.prev().span; const branches:{condition:Expression;body:Statement[]}[]=[]; const cond=this.parseExpression(); this.optionalWord('ENTONCES'); this.endLine(); branches.push({condition:cond,body:this.parseStatementsUntil(new Set(['SINO','FIN']))}); let otherwise:Statement[]|undefined;
    while(this.matchWord('SINO')) { if(this.matchWord('SI')) { const c=this.parseExpression(); this.optionalWord('ENTONCES'); this.endLine(); branches.push({condition:c,body:this.parseStatementsUntil(new Set(['SINO','FIN']))}); } else { this.endLine(); otherwise=this.parseStatementsUntil(new Set(['FIN'])); break; } }
    this.expectWord('FIN'); this.optionalWord('SI'); this.endLine(); return {kind:'IfStatement',branches,otherwise,span:this.merge(start,this.prev().span)};
  }
  private parseWhile(): WhileStatement { const start=this.prev().span; const condition=this.parseExpression(); this.optionalWord('HACER'); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('MIENTRAS'); this.endLine(); return {kind:'WhileStatement',condition,body,span:this.merge(start,this.prev().span)}; }
  private parseDoWhile():DoWhileStatement {const start=this.prev().span;this.endLine();const body=this.parseStatementsUntil(new Set(['MIENTRAS']));this.expectWord('MIENTRAS');const condition=this.parseExpression();this.endLine();return {kind:'DoWhileStatement',body,condition,span:this.merge(start,this.prev().span)};}
  private parseFor(): ForRangeStatement|ForEachStatement {
    const start=this.prev().span;
    if(this.matchWord('CADA')) { const valueVariable=this.expectWordAny(); let keyVariable:string|undefined; if(this.matchP(',')) keyVariable=this.expectWordAny(); this.expectWord('EN'); const iterable=this.parseExpression(); this.optionalWord('HACER'); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('PARA'); this.endLine(); return {kind:'ForEachStatement',valueVariable,keyVariable,iterable,body,span:this.merge(start,this.prev().span)}; }
    const variable=this.expectWordAny(); this.expectWord('DESDE'); const from=this.parseExpression(); this.expectWord('HASTA'); const end=this.parseExpression(); let step:Expression|undefined; if(this.matchWord('PASO')) step=this.parseExpression(); this.optionalWord('HACER'); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('PARA'); this.endLine(); return {kind:'ForRangeStatement',variable,start:from,end,step,inclusive:true,body,span:this.merge(start,this.prev().span)};
  }
  private parseRepeat(): RepeatStatement|RepeatUntilStatement {
    if(this.lineEnd()) {
      const start=this.prev().span;this.endLine();const body=this.parseStatementsUntil(new Set(['HASTA']));
      this.expectWord('HASTA');this.expectWord('QUE');const condition=this.parseExpression();this.endLine();
      return {kind:'RepeatUntilStatement',body,condition,span:this.merge(start,this.prev().span)};
    }
    const start=this.prev().span; const count=this.parseExpression(); let indexVariable:string|undefined; if(this.matchWord('COMO')) indexVariable=this.expectWordAny(); this.optionalWord('VECES'); this.endLine(); const body=this.parseStatementsUntil(new Set(['FIN'])); this.expectWord('FIN'); this.optionalWord('REPETIR'); this.endLine(); return {kind:'RepeatStatement',count,indexVariable,body,span:this.merge(start,this.prev().span)}; }
  private parseDimension():DimensionStatement {
    const start=this.prev().span,name=this.expectWordAny();this.expectP('[');
    const dimensions:Expression[]=[];do dimensions.push(this.parseExpression());while(this.matchP(','));
    this.expectP(']');this.endLine();
    if(dimensions.length>8)throw this.error('DIMENSION: límite excedido (8 dimensiones).');
    return {kind:'DimensionStatement',name,dimensions,span:this.merge(start,this.prev().span)};
  }
  private parseInfiniteLoop():InfiniteLoopStatement {const start=this.prev().span;this.endLine();const body=this.parseStatementsUntil(new Set(['FIN']));this.expectWord('FIN');this.optionalWord('BUCLE');this.endLine();return {kind:'InfiniteLoopStatement',body,span:this.merge(start,this.prev().span)};}
  private parseSwitch(): SwitchStatement {
    const start=this.prev().span; const discriminant=this.parseExpression(); this.endLine(); const cases:any[]=[]; let defaultCase:Statement[]|undefined; this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) { if(this.matchWord('CASO')) { const tests=this.parseExpressionListToLine(); this.endLine(); const body=this.parseStatementsUntil(new Set(['CASO','DEFECTO','FIN'])); cases.push({tests,body}); continue; } if(this.matchWord('DEFECTO')) { this.endLine(); defaultCase=this.parseStatementsUntil(new Set(['FIN'])); break; } throw this.error('SEGUN: token inesperado; esperados: CASO, DEFECTO, FIN.'); }
    this.expectWord('FIN'); this.optionalWord('SEGUN'); this.endLine(); return {kind:'SwitchStatement',discriminant,cases,defaultCase,span:this.merge(start,this.prev().span)};
  }
  private parseTry(): TryStatement {
    const start=this.prev().span; this.endLine(); const body=this.parseStatementsUntil(new Set(['CAPTURAR','FINALMENTE','FIN'])); const catches:any[]=[]; let finallyBody:Statement[]|undefined;
    while(this.matchWord('CAPTURAR')) { let variable:string|undefined; if(!this.lineEnd()) variable=this.expectWordAny(); this.endLine(); catches.push({variable,body:this.parseStatementsUntil(new Set(['CAPTURAR','FINALMENTE','FIN']))}); }
    if(this.matchWord('FINALMENTE')) { this.endLine(); finallyBody=this.parseStatementsUntil(new Set(['FIN'])); }
    this.expectWord('FIN'); this.optionalWord('INTENTAR'); this.endLine(); return {kind:'TryStatement',body,catches,finallyBody,span:this.merge(start,this.prev().span)};
  }
  private parseParallel():ParallelStatement {const start=this.prev().span;this.endLine();const branches=this.parseBranches('PARALELO');return {kind:'ParallelStatement',branches,span:this.merge(start,this.prev().span)};}
  private parseRace():RaceStatement {const start=this.prev().span;this.endLine();const branches=this.parseBranches('CARRERA');return {kind:'RaceStatement',branches,span:this.merge(start,this.prev().span)};}
  private parseBranches(endWord:string):Statement[][] {const branches:Statement[][]=[];this.skipLines();while(!this.checkWord('FIN')&&!this.is('eof')){if(this.matchWord('RAMA')){this.endLine();const b=this.parseStatementsUntil(new Set(['RAMA','FIN']));branches.push(b);if(this.checkWord('FIN')&&upper(this.peek(1).value)==='RAMA'){this.advance();this.advance();this.endLine();}continue;}const s=this.parseStatement();branches.push([s]);this.skipLines();}this.expectWord('FIN');this.optionalWord(endWord);this.endLine();return branches;}
  private parseTimeout():TimeoutStatement {const start=this.prev().span;const duration=this.parseExpression();this.endLine();const body=this.parseStatementsUntil(new Set(['EXPIRA','FIN']));let onTimeout:Statement[]|undefined;if(this.matchWord('EXPIRA')){this.endLine();onTimeout=this.parseStatementsUntil(new Set(['FIN']));}this.expectWord('FIN');this.optionalWord('TIEMPO_LIMITE');this.endLine();return {kind:'TimeoutStatement',duration,body,onTimeout,span:this.merge(start,this.prev().span)};}

  private isBuilderStart():boolean {const u=upper(this.peek().value);return BUILDER_WORDS.has(u)||(u==='CREAR'&&this.peek(1).kind==='word'&&BUILDER_WORDS.has(upper(this.peek(1).value)));}
  private parseBuilderDeclaration():DiscordBuilderDeclarationStatement {
    const start=this.peek().span;if(this.matchWord('CREAR')){} const raw=upper(this.expectWordAny());const map:Record<string,DiscordBuilderDeclarationStatement['builderKind']>={BUILDER:'generic',EMBED:'embed',BOTON:'button',MENU:'select',SELECT:'select',CAMPO_TEXTO:'textInput',ENTRADA_TEXTO:'textInput',MODAL:'modal',FILA:'row',ARCHIVO:'attachment',IMAGEN:'image',ENCUESTA:'poll',MENSAJE:'message'};const builderKind=map[raw]!;
    let subtype:string|undefined;let name:string;if(builderKind==='generic'){subtype=this.expectWordAny();name=this.expectWordAny();}else{name=this.expectWordAny();if(builderKind==='select'&&this.matchWord('TIPO'))subtype=upper(this.expectWordAny()).toLowerCase();}const entries:DiscordBuilderEntry[]=[];if(builderKind==='generic'&&this.matchWord('CON')){const cargs=this.parseExpressionListToLine();entries.push({key:'CONSTRUCTOR',arguments:cargs});}this.endLine();this.skipLines();
    while(!this.checkWord('FIN')&&!this.is('eof')) {const key=upper(this.expectWordAny());const args:Expression[]=[];const flags:string[]=[];if(key==='LLAMAR'&&this.peek().kind==='word'){const mt=this.advance();args.push({kind:'LiteralExpression',value:mt.value,literalType:'texto',span:mt.span});if(this.matchP(',')){} }while(!this.lineEnd()){if(this.matchP(','))continue;if(this.peek().kind==='word'&&BUILDER_FLAGS.has(upper(this.peek().value))){flags.push(upper(this.advance().value));continue;}if((key==='ESTILO'||key==='TIPO')&&this.peek().kind==='word'&&BUILDER_ENUMS.has(upper(this.peek().value))){const et=this.advance();args.push({kind:'LiteralExpression',value:upper(et.value).toLowerCase(),literalType:'texto',span:et.span});}else args.push(this.parseExpression());if(!this.matchP(',')&&!this.lineEnd()&&!(this.peek().kind==='word'&&BUILDER_FLAGS.has(upper(this.peek().value))))throw this.error(`Propiedad '${key}': separador no válido; esperado ',' o salto de línea.`);}this.endLine();entries.push({key,arguments:args,flags});}
    this.expectWord('FIN'); if(this.peek().kind==='word'&&[raw,'CREAR'].includes(upper(this.peek().value)))this.advance(); this.endLine();return {kind:'DiscordBuilderDeclarationStatement',builderKind,name,subtype,entries,span:this.merge(start,this.prev().span)};
  }

  private isDiscordActionStart(): boolean { const u=upper(this.peek().value); return ['RESPONDER','ENVIAR','DAR','QUITAR','EXPULSAR','BANEAR','DESBANEAR','SILENCIAR','ELIMINAR','EDITAR','REACCIONAR','APODO','CREAR','FIJAR','DESFIJAR','LIMPIAR','DIFERIR','SEGUIR','MOSTRAR','MOVER','DESCONECTAR','PRESENCIA','SUGERIR','ARCHIVAR','DESARCHIVAR','BLOQUEAR','DESBLOQUEAR','SLOWMODE','PUBLICAR','PERMITIR','DENEGAR','SINCRONIZAR','AGREGAR','UNIR','SALIR'].includes(u); }
  private parseDiscordAction(): DiscordActionStatement {
    const start=this.peek().span; const first=upper(this.advance().value); let action=''; let target:Expression|undefined; const args:Expression[]=[]; const options:Record<string,Expression>={};
    if(first==='RESPONDER') { action='reply'; args.push(this.parseExpression()); if(this.matchWord('A')) target=this.parseExpression();
      while(!this.lineEnd()) {
        if(this.matchWord('EFIMERO')) options.efimero=this.literal(true);
        else if(this.matchWord('SIN_MENCIONES')) options.sinMenciones=this.literal(true);
        else if(this.matchWord('SIN')) {this.expectWord('MENCIONES'); options.sinMenciones=this.literal(true);}
        else throw this.error(`RESPONDER: modificador no reconocido '${this.peek().value}'; admitidos: EFIMERO, SIN MENCIONES.`);
      }
    }
    else if(first==='ENVIAR') { if(this.matchWord('PRIVADO')) { action='dm'; args.push(this.parseExpression()); this.expectWord('A'); target=this.parseExpression(); } else { action='send'; args.push(this.parseExpression(4)); if(this.matchWord('EN'))target=this.parseExpression(); } }
    else if(first==='DAR') { this.expectWord('ROL'); action='addRole'; args.push(this.parseExpression()); this.expectWord('A'); target=this.parseExpression(); }
    else if(first==='QUITAR') { if(this.matchWord('ROL')){action='removeRole';args.push(this.parseExpression());this.expectWord('A');target=this.parseExpression();}else{target=this.parseExpression(4);this.expectWord('DE');this.expectWord('HILO');args.push(this.parseExpression());action='removeThreadMember';} }
    else if(first==='EXPULSAR') { action='kick'; target=this.parseExpression(); if(this.matchWord('POR')) args.push(this.parseExpression()); }
    else if(first==='BANEAR') { action='ban'; target=this.parseExpression(); if(this.matchWord('POR')) args.push(this.parseExpression()); }
    else if(first==='DESBANEAR') { action='unban'; target=this.parseExpression(); if(this.matchWord('POR'))args.push(this.parseExpression()); }
    else if(first==='SILENCIAR') { action='timeout'; target=this.parseExpression(); this.expectWord('POR'); args.push(this.parseExpression()); if(this.matchWord('RAZON')) args.push(this.parseExpression()); }
    else if(first==='ELIMINAR') { if(this.matchWord('MENSAJE')) { action='deleteMessage'; if(!this.lineEnd())target=this.parseExpression(); } else if(this.matchWord('CANAL')) { action='deleteChannel'; target=this.parseExpression(); } else if(this.matchWord('ROL')){action='deleteRole';target=this.parseExpression();} else if(this.matchWord('RESPUESTA')){action='deleteReply';} else if(this.matchWord('EMOJI')){action='deleteEmoji';target=this.parseExpression();} else if(this.matchWord('STICKER')){action='deleteSticker';target=this.parseExpression();} else if(this.matchWord('EVENTO')){action='deleteScheduledEvent';target=this.parseExpression();} else if(this.matchWord('AUTOMOD')){action='deleteAutoMod';target=this.parseExpression();} else if(this.matchWord('SONIDO')){action='deleteSoundboard';target=this.parseExpression();} else throw this.error('ELIMINAR: destino no reconocido; admitidos: MENSAJE, CANAL, ROL, RESPUESTA, EMOJI, STICKER, EVENTO, AUTOMOD, SONIDO.'); }
    else if(first==='EDITAR') { if(this.matchWord('MENSAJE')){action='editMessage';target=this.parseExpression();this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('RESPUESTA')){action='editReply';args.push(this.parseExpression());} else if(this.matchWord('CANAL')){action='editChannel';target=this.parseExpression();this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('ROL')){action='editRole';target=this.parseExpression();this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('EMOJI')){action='editEmoji';target=this.parseExpression(4);this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('STICKER')){action='editSticker';target=this.parseExpression(4);this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('EVENTO')){action='editScheduledEvent';target=this.parseExpression(4);this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('AUTOMOD')){action='editAutoMod';target=this.parseExpression(4);this.expectWord('CON');args.push(this.parseExpression());} else if(this.matchWord('SONIDO')){action='editSoundboard';target=this.parseExpression(4);this.expectWord('CON');args.push(this.parseExpression());} else throw this.error('EDITAR: destino no reconocido; admitidos: MENSAJE, RESPUESTA, CANAL, ROL, EMOJI, STICKER, EVENTO, AUTOMOD, SONIDO.'); }
    else if(first==='REACCIONAR') { action='react'; args.push(this.parseExpression(4)); if(this.matchWord('A'))target=this.parseExpression(); }
    else if(first==='APODO') { action='nickname'; args.push(this.parseExpression()); this.expectWord('A'); target=this.parseExpression(); }
    else if(first==='CREAR') {
      if(this.matchWord('CANAL')) { action='createChannel'; args.push(this.parseExpression()); if(this.matchWord('CON'))args.push(this.parseExpression()); }
      else if(this.matchWord('HILO')) { action='createThread'; args.push(this.parseExpression(4)); this.expectWord('EN'); target=this.parseExpression(); }
      else if(this.matchWord('ROL')) {action='createRole';args.push(this.parseExpression());if(this.matchWord('CON'))args.push(this.parseExpression());}
      else if(this.matchWord('WEBHOOK')) {action='createWebhook';args.push(this.parseExpression(4));this.expectWord('EN');target=this.parseExpression();}
      else if(this.matchWord('INVITACION')) {action='createInvite';if(!this.lineEnd())target=this.parseExpression();}
      else if(this.matchWord('EMOJI')) {action='createEmoji';args.push(this.parseExpression());}
      else if(this.matchWord('STICKER')) {action='createSticker';args.push(this.parseExpression());}
      else if(this.matchWord('EVENTO')) {action='createScheduledEvent';args.push(this.parseExpression());}
      else if(this.matchWord('AUTOMOD')) {action='createAutoMod';args.push(this.parseExpression());}
      else if(this.matchWord('SONIDO')) {action='createSoundboard';args.push(this.parseExpression());}
      else throw this.error('CREAR: tipo de recurso no reconocido; admitidos: CANAL, HILO, ROL, WEBHOOK, INVITACION, EMOJI, STICKER, EVENTO, AUTOMOD, SONIDO.');
    }
    else if(first==='FIJAR'){action='pin';if(!this.lineEnd())target=this.parseExpression();}
    else if(first==='DESFIJAR'){action='unpin';if(!this.lineEnd())target=this.parseExpression();}
    else if(first==='LIMPIAR'){action='bulkDelete';args.push(this.parseExpression(4));if(this.matchWord('EN'))target=this.parseExpression();}
    else if(first==='DIFERIR'){action='deferReply';if(this.matchWord('EFIMERO'))args.push(this.literal(true));}
    else if(first==='SEGUIR'){action='followUp';args.push(this.parseExpression());}
    else if(first==='MOSTRAR'){this.expectWord('MODAL');action='showModal';args.push(this.parseExpression());}
    else if(first==='MOVER'){action='moveVoice';target=this.parseExpression(4);this.expectWord('A');args.push(this.parseExpression());}
    else if(first==='DESCONECTAR'){this.optionalWord('VOZ');action='disconnectVoice';target=this.parseExpression();}
    else if(first==='PRESENCIA'){action='presence';args.push(this.parseExpression());}
    else if(first==='SUGERIR'){action='autocompleteRespond';args.push(this.parseExpressionListAsArray());}
    else if(first==='ARCHIVAR'){action='archiveThread';target=this.parseExpression();}
    else if(first==='DESARCHIVAR'){action='unarchiveThread';target=this.parseExpression();}
    else if(first==='BLOQUEAR'){action='lockThread';target=this.parseExpression();}
    else if(first==='DESBLOQUEAR'){action='unlockThread';target=this.parseExpression();}
    else if(first==='SLOWMODE'){action='slowmode';args.push(this.parseExpression(4));if(this.matchWord('EN'))target=this.parseExpression();}
    else if(first==='PUBLICAR'){this.optionalWord('MENSAJE');action='crosspost';target=this.parseExpression();}
    else if(first==='PERMITIR'||first==='DENEGAR'){action=first==='PERMITIR'?'allowPermission':'denyPermission';args.push(this.parseExpression(4));this.expectWord('A');args.push(this.parseExpression(4));this.expectWord('EN');target=this.parseExpression();}
    else if(first==='SINCRONIZAR'){this.expectWord('PERMISOS');action='syncPermissions';target=this.parseExpression();}
    else if(first==='AGREGAR'){target=this.parseExpression(4);this.expectWord('A');this.expectWord('HILO');args.push(this.parseExpression());action='addThreadMember';}
    else if(first==='UNIR'){this.optionalWord('HILO');action='joinThread';target=this.lineEnd()?undefined:this.parseExpression();}
    else if(first==='SALIR'){this.optionalWord('HILO');action='leaveThread';target=this.lineEnd()?undefined:this.parseExpression();}
    this.endLine(); return {kind:'DiscordActionStatement',action,target,arguments:args,options,await:true,span:this.merge(start,this.prev().span)};
  }

  private parseExpression(minPrec=0): Expression {
    let left=this.parsePrefix();
    while(true) {
      if(this.matchP('.')) { const property=this.expectWordAny(); left={kind:'MemberExpression',object:left,property}; continue; }
      if(this.matchOp('?.')) { const property=this.expectWordAny(); left={kind:'MemberExpression',object:left,property,optional:true}; continue; }
      if(this.matchP('[')) { const index=this.parseExpression(); this.expectP(']'); left={kind:'IndexExpression',object:left,index}; continue; }
      if(this.matchP('(')) { const args=this.parseArgumentsAfterOpen(); left={kind:'CallExpression',callee:left,arguments:args}; continue; }
      if(minPrec<=3 && this.matchWord('ES')) {const negate=this.matchWord('NO');const checked:Expression={kind:'TypeCheckExpression',expression:left,expected:this.parseType()};left=negate?{kind:'UnaryExpression',operator:'NO',argument:checked}:checked;continue;}
      if(minPrec<=10 && this.matchWord('COMO')) {left={kind:'CastExpression',expression:left,target:this.parseType()};continue;}
      if(this.matchP('?')) { const whenTrue=this.parseExpression(); this.expectP(':'); const whenFalse=this.parseExpression(); left={kind:'ConditionalExpression',condition:left,whenTrue,whenFalse}; continue; }
      const op=this.currentOperator(); if(!op) break; const prec=PRECEDENCE[op]; if(prec===undefined||prec<minPrec) break; this.advance(); const right=this.parseExpression(op==='**'?prec:prec+1);
      if(op==='Y'||op==='&&'||op==='O'||op==='||') left={kind:'LogicalExpression',operator:(op==='Y'||op==='&&')?'Y':'O',left,right};
      else if(op==='??') left={kind:'NullishExpression',left,right};
      else left={kind:'BinaryExpression',operator:this.mapBinary(op),left,right};
    }
    return left;
  }

  private parsePrefix(): Expression {
    const t=this.advance();
    if(t.kind==='number') { const v=this.numberValue(t.value); return typeof v==='bigint'?{kind:'LiteralExpression',value:v,literalType:'bigint',span:t.span}:{kind:'LiteralExpression',value:v,literalType:Number.isInteger(v)?'entero':'numero',span:t.span}; }
    if(t.kind==='string') return {kind:'LiteralExpression',value:t.value,literalType:'texto',span:t.span};
    if(t.kind==='word') {
      const u=upper(t.value);
      if(['VERDADERO','TRUE'].includes(u)) return {kind:'LiteralExpression',value:true,literalType:'booleano',span:t.span};
      if(['FALSO','FALSE'].includes(u)) return {kind:'LiteralExpression',value:false,literalType:'booleano',span:t.span};
      if(['NULO','NULL'].includes(u)) return {kind:'LiteralExpression',value:null,literalType:'nulo',span:t.span};
      if(u==='NO') return {kind:'UnaryExpression',operator:'NO',argument:this.parseExpression(11),span:t.span};
      if(u==='NUEVO') { const callee=this.parseExpression(11); if(callee.kind==='CallExpression') return {kind:'NewExpression',callee:callee.callee,arguments:callee.arguments,span:t.span}; return {kind:'NewExpression',callee,arguments:[],span:t.span}; }
      if(u==='AWAIT'||u==='ESPERAR_RESULTADO') return {kind:'AwaitExpression',expression:this.parseExpression(11),span:t.span};
      if(u==='TIPO_DE') return {kind:'TypeOfExpression',expression:this.parseExpression(11),span:t.span};
      if(this.matchOp('=>'))return {kind:'LambdaExpression',parameters:[{name:t.value}],body:this.parseExpression(),span:t.span};
      return {kind:'IdentifierExpression',name:t.value,span:t.span};
    }
    if(t.kind==='operator' && ['+','-','!','~'].includes(t.value)) return {kind:'UnaryExpression',operator:t.value==='!'?'NO':t.value==='~'?'BIT_NO':t.value as any,argument:this.parseExpression(11),span:t.span};
    if(t.kind==='punctuation'&&t.value==='(') {
      const saved=this.i;
      const parameters:{name:string}[]=[];
      let possible=true;
      if(!this.checkP(')')){
        do {
          if(this.peek().kind!=='word'){possible=false;break;}
          parameters.push({name:this.advance().value});
        } while(this.matchP(','));
      }
      if(possible&&this.matchP(')')&&this.matchOp('=>'))
        return {kind:'LambdaExpression',parameters,body:this.parseExpression(),span:t.span};
      this.i=saved;
      const e=this.parseExpression();this.expectP(')');return e;
    }
    if(t.kind==='punctuation'&&t.value==='[') { const elements:Expression[]=[]; if(!this.checkP(']')) do elements.push(this.parseExpression()); while(this.matchP(',')); this.expectP(']'); return {kind:'ArrayExpression',elements,span:t.span}; }
    if(t.kind==='punctuation'&&t.value==='{') {
      const properties:any[]=[]; if(!this.checkP('}')) do { let key:string|Expression; let computed=false; if(this.matchP('[')){key=this.parseExpression();this.expectP(']');computed=true;} else if(this.peek().kind==='string'||this.peek().kind==='word') key=this.advance().value; else throw this.error('Literal objeto: clave no válida; se esperaba identificador o cadena.'); this.expectP(':'); const value=this.parseExpression(); properties.push({key,value,computed}); } while(this.matchP(','));
      this.expectP('}'); return {kind:'ObjectExpression',properties,span:t.span};
    }
    throw this.errorAt(t.span,`Expresión inesperada: '${t.value}'`,'Parser-Expresion-Error');
  }

  private parseArgumentsAfterOpen(): CallArgument[] { const out:CallArgument[]=[]; if(!this.checkP(')')) do out.push({value:this.parseExpression()}); while(this.matchP(',')); this.expectP(')'); return out; }
  private parseExpressionListToLine(): Expression[] { const out:Expression[]=[]; if(this.lineEnd()) return out; do out.push(this.parseExpression()); while(this.matchP(',')); return out; }
  private parseExpressionListAsArray():Expression {const elements=this.parseExpressionListToLine();return {kind:'ArrayExpression',elements};}
  private currentOperator(): string|undefined { const t=this.peek(); if(t.kind==='operator') return t.value; if(t.kind==='word') { const u=upper(t.value); if(PRECEDENCE[u]!==undefined) return u; if(u==='NO' && this.peek(1).kind==='word') { const c=`NO_${upper(this.peek(1).value)}`; if(PRECEDENCE[c]!==undefined) { this.advance(); return c; } } } return undefined; }
  private mapBinary(op:string): BinaryOperator { const map:Record<string,string>={'&':'BIT_Y','|':'BIT_O','^':'BIT_XOR','MOD':'%'}; return (map[op]??op) as BinaryOperator; }
  private literal(value:boolean):Expression{return {kind:'LiteralExpression',value,literalType:'booleano'};}
  private numberValue(raw0:string):number|bigint {const raw=raw0.replaceAll('_','');if(raw.endsWith('n'))return BigInt(raw.slice(0,-1));return raw.startsWith('0x')?parseInt(raw.slice(2),16):raw.startsWith('0b')?parseInt(raw.slice(2),2):raw.startsWith('0o')?parseInt(raw.slice(2),8):Number(raw);}
  private expectNumberLiteral():number {const t=this.peek();if(t.kind!=='number')throw this.error('Literal numérico requerido.');this.advance();return Number(this.numberValue(t.value));}
  private parseOptionalBoolean(def:boolean):boolean {if(this.lineEnd())return def;if(this.matchWord('VERDADERO')||this.matchWord('SI'))return true;if(this.matchWord('FALSO')||this.matchWord('NO'))return false;return def;}

  private lineEnd(): boolean { return this.is('newline')||this.is('eof'); }
  private endLine(): void { if(this.matchP(';')){} if(this.is('newline')) this.skipLines(); else if(!this.is('eof')&&!this.checkWord('FIN')&&!this.checkWord('SINO')&&!this.checkWord('CASO')&&!this.checkWord('DEFECTO')&&!this.checkWord('CAPTURAR')&&!this.checkWord('FINALMENTE')&&!this.checkWord('EXPIRA')&&!this.checkWord('RAMA')&&!this.checkWord('MIENTRAS')) throw this.error(`Token inesperado '${this.peek().value}': se esperaba fin de línea.`); }
  private skipLines(): void { while(this.is('newline')||(this.peek().kind==='punctuation'&&this.peek().value===';')) this.advance(); }
  private optionalWord(w:string): boolean { return this.matchWord(w); }
  private matchWord(w:string): boolean { if(this.checkWord(w)){this.advance();return true} return false; }
  private checkWord(w:string): boolean { return this.peek().kind==='word'&&upper(this.peek().value)===upper(w); }
  private expectWord(w:string): Token { if(!this.checkWord(w)) throw this.error(`Token inesperado '${this.peek().value}': esperado '${w}'.`); return this.advance(); }
  private expectWordAny(): string { const t=this.peek(); if(t.kind!=='word') throw this.error(`Token no válido '${t.value}': se esperaba identificador.`); this.advance(); return t.value; }
  private expectString(): string { const t=this.peek(); if(t.kind!=='string') throw this.error('Cadena literal requerida (entre comillas).'); this.advance(); return t.value; }
  private expectStringOrWord():string {const t=this.peek();if(t.kind==='string'||t.kind==='word'){this.advance();return t.value;}throw this.error('Token incompatible: se esperaba cadena o identificador.');}
  private matchP(v:string): boolean { if(this.peek().kind==='punctuation'&&this.peek().value===v){this.advance();return true} return false; }
  private checkP(v:string): boolean { return this.peek().kind==='punctuation'&&this.peek().value===v; }
  private expectP(v:string): Token { if(!this.checkP(v)) throw this.error(`Token requerido: '${v}'.`); return this.advance(); }
  private matchOp(v:string): boolean { if(this.peek().kind==='operator'&&this.peek().value===v){this.advance();return true} return false; }
  private expectOpOrP(v:string):void {if(this.matchOp(v)||this.matchP(v))return;throw this.error(`Token requerido: '${v}'.`);}
  private is(kind:Token['kind']): boolean { return this.peek().kind===kind; }
  private expect(kind:Token['kind']):Token { if(!this.is(kind)) throw this.error(`Token requerido de clase '${kind}'.`); return this.advance(); }
  private peek(n=0):Token { return this.tokens[Math.min(this.i+n,this.tokens.length-1)]!; }
  private prev():Token { return this.tokens[Math.max(0,this.i-1)]!; }
  private advance():Token { return this.tokens[this.i++]!; }
  private error(message:string):PseudoDiscordError { return this.errorAt(this.peek().span,message,'Parser-Sintaxis-Error'); }
  private errorAt(span:SourceSpan,message:string,code='Parser-Sintaxis-Error'):PseudoDiscordError { return new PseudoDiscordError(message,span,code); }
  private merge(a:SourceSpan,b:SourceSpan):SourceSpan { return {start:a.start,end:b.end,source:a.source??b.source}; }
}

export function parse(source:string, sourceName='<memoria>'):Program { return new Parser(lex(source,sourceName),sourceName).parseProgram(); }
export function parseExpressionText(source:string):Expression { return new Parser(lex(source,'<expresion>')).parseExpressionOnly(); }
