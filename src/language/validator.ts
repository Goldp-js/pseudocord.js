import type {
  Program, DiscordCommandDeclaration, DiscordEventDeclaration, FunctionDeclaration,
  DiscordContextCommandDeclaration, DiscordComponentHandlerDeclaration
} from '../ast/declarations.js';
import type { Statement } from '../ast/statements.js';
import { DISCORD_CLIENT_EVENTS } from '../discord/catalog.generated.js';
import { resolvePermissionName } from '../discord/permissions.js';
import { analyzeSemantics, type SemanticOptions } from './semantic.js';
import { normalizeIdentifier } from './identifiers.js';
import { createDiagnostic } from './diagnostics.js';
import type { Diagnostic } from './diagnostics.js';
export type { Diagnostic } from './diagnostics.js';

export interface ValidationResult { ok:boolean; diagnostics:Diagnostic[]; }

const SEMANTIC_ACTIONS=new Set([
  'reply','send','dm','addRole','removeRole','kick','ban','unban','timeout','deleteMessage','deleteChannel','editMessage','react','nickname','createChannel','createThread',
  'deleteRole','editReply','deleteReply','editChannel','editRole','createRole','createWebhook','createInvite','pin','unpin','bulkDelete','deferReply','followUp','showModal','moveVoice','disconnectVoice','presence','autocompleteRespond','archiveThread','unarchiveThread','lockThread','unlockThread','slowmode','createEmoji','editEmoji','deleteEmoji','createSticker','editSticker','deleteSticker','createScheduledEvent','editScheduledEvent','deleteScheduledEvent','createAutoMod','editAutoMod','deleteAutoMod','createSoundboard','editSoundboard','deleteSoundboard','crosspost','allowPermission','denyPermission','syncPermissions','addThreadMember','removeThreadMember','joinThread','leaveThread'
]);

export function validate(program:Program, options:SemanticOptions={}):ValidationResult {
  const diagnostics:Diagnostic[]=[]; const names=new Set<string>(); const appCommands=new Set<string>(); const prefixCommands=new Set<string>(); const componentKeys=new Set<string>();
  const add=(severity:Diagnostic['severity'],code:string,message:string,node:any)=>diagnostics.push(createDiagnostic(severity,code,message,node));
  const eventValues=Array.isArray(DISCORD_CLIENT_EVENTS)?DISCORD_CLIENT_EVENTS.map((x:any)=>typeof x==='string'?x:x.name):Object.keys(DISCORD_CLIENT_EVENTS as any);

  for(const d of program.body){
    const n=(d as any).name as string|undefined;
    if(n && !['DiscordCommandDeclaration','DiscordContextCommandDeclaration','SchedulerDeclaration'].includes(d.kind)){const k=normalizeIdentifier(n);if(names.has(k))add('error','Validator-DeclaracionDuplicada-Error',`Declaración duplicada: '${n}'.`,d);else names.add(k);}

    if(d.kind==='DiscordCommandDeclaration'){
      const c=d as DiscordCommandDeclaration;
      if(c.commandKind==='chat-input'){
        const key=c.name.toLowerCase();if(appCommands.has(key))add('error','Validator-ComandoDuplicado-Error',`Comando de aplicación duplicado: '/${c.name}'.`,c);else appCommands.add(key);
        if(!/^[a-z0-9_-]{1,32}$/.test(c.name))add('error','Validator-NombreComando-Error',`Nombre de comando '/${c.name}' no válido: longitud permitida 1–32; caracteres admitidos a-z, 0-9, '_' y '-'.`,c);
        if(c.description.length<1||c.description.length>100)add('error','Validator-DescripcionComando-Error',`Descripción de '/${c.name}' fuera de rango: longitud permitida 1–100 caracteres.`,c);
      }else{
        for(const n of [c.name,...(c.aliases??[])]){
          const key=`${c.prefix??'!'}${c.caseSensitive?n:n.toLowerCase()}`;
          if(prefixCommands.has(key))add('error','Validator-PrefijoDuplicado-Error',`Comando o alias con prefijo duplicado: '${key}'.`,c);
          else prefixCommands.add(key);
        }
      }
      if(c.defaultMemberPermissions?.length){
        for(const permission of c.defaultMemberPermissions){
          if(!resolvePermissionName(permission))add('error','Validator-PermisoDiscord-Error',`Permiso de Discord no reconocido: '${permission}'. Identificadores admitidos: nombres canónicos y alias declarados.`,c);
        }
      }
      if(c.commandKind==='chat-input'){
        if(c.options.length>0&&((c.subcommands?.length??0)>0||(c.groups?.length??0)>0))
          add('error','Validator-OpcionesSubcomandos-Error',`/${c.name}: OPCION raíz y SUBCOMANDO/GRUPO son mutuamente excluyentes.`,c);
        const keys=new Set<string>();
        for(const item of [...(c.subcommands??[]),...(c.groups??[])]){
          const key=item.name.toLowerCase();
          if(keys.has(key))add('error','Validator-SubcomandoDuplicado-Error',`Grupo o subcomando duplicado: '${item.name}'.`,c);
          keys.add(key);
          if(!/^[a-z0-9_-]{1,32}$/.test(item.name))add('error','Validator-NombreSubcomando-Error',`Nombre de grupo/subcomando no válido: '${item.name}' (a-z, 0-9, '_', '-'; 1–32 caracteres).`,c);
          if(item.description.length<1||item.description.length>100)add('error','Validator-DescripcionSubcomando-Error',`Descripción de '${item.name}' fuera de rango: 1–100 caracteres.`,c);
        }
        if((c.subcommands?.length??0)+(c.groups?.length??0)>25)add('error','Validator-LimiteSubcomandos-Error',`/${c.name}: límite excedido; máximo 25 subcomandos y grupos.`,c);
        for(const group of c.groups??[]){
          if(group.subcommands.length>25)add('error','Validator-LimiteSubcomandos-Error',`Grupo '${group.name}': límite excedido; máximo 25 subcomandos.`,c);
          const used=new Set<string>();
          for(const sub of group.subcommands){
            if(used.has(sub.name.toLowerCase()))add('error','Validator-SubcomandoDuplicado-Error',`Subcomando duplicado: '${sub.name}' en el grupo '${group.name}'.`,c);
            used.add(sub.name.toLowerCase());
            if(!/^[a-z0-9_-]{1,32}$/.test(sub.name))add('error','Validator-NombreSubcomando-Error',`Nombre de subcomando no válido: '${sub.name}' (a-z, 0-9, '_', '-'; 1–32 caracteres).`,c);
            if(sub.description.length<1||sub.description.length>100)add('error','Validator-DescripcionSubcomando-Error',`Descripción del subcomando '${sub.name}' fuera de rango: 1–100 caracteres.`,c);
          }
        }
      }
      if(c.commandKind==='message-prefix')for(let i=0;i<c.options.length;i++){
        const o=c.options[i]!;
        if(o.consumeRest===true&&(o.kind!=='texto'||i!==c.options.length-1))add('error','Validator-ArgumentoResto-Error',`ARGUMENTO '${o.name}': RESTO requiere tipo texto y la última posición.`,o.span?o:c);
      }
      validateOptions(c.options,c,add);for(const s of c.subcommands??[]){validateOptions(s.options,c,add);walkStatements(s.body,add,{loop:0,functionDepth:0});}for(const g of c.groups??[])for(const s of g.subcommands) {validateOptions(s.options,c,add);walkStatements(s.body,add,{loop:0,functionDepth:0});}
      walkStatements(c.body,add,{loop:0,functionDepth:0});
    } else if(d.kind==='DiscordContextCommandDeclaration'){
      const c=d as DiscordContextCommandDeclaration;const key=`${c.contextKind}:${c.name.toLowerCase()}`;if(appCommands.has(key))add('error','Validator-ComandoContextualDuplicado-Error',`Comando contextual duplicado: '${c.name}'.`,c);else appCommands.add(key);if(c.name.length<1||c.name.length>32)add('error','Validator-NombreComandoContextual-Error','Nombre de comando contextual fuera de rango: 1–32 caracteres.',c);walkStatements(c.body,add,{loop:0,functionDepth:0});
    } else if(d.kind==='DiscordComponentHandlerDeclaration'){
      const h=d as DiscordComponentHandlerDeclaration;const key=`${h.componentKind}:${h.customId??h.commandName??'*'}:${h.optionName??'*'}`;if(componentKeys.has(key))add('warning','Validator-ControladorDuplicado-Error',`Controlador duplicado para '${key}': varios handlers comparten el mismo identificador de interacción.`,h);componentKeys.add(key);walkStatements(h.body,add,{loop:0,functionDepth:0});
    } else if(d.kind==='DiscordEventDeclaration'){
      const e=d as DiscordEventDeclaration;if(!eventValues.includes(e.event))add('warning','Validator-EventoDesconocido-Error',`Evento '${e.event}' ausente de ClientEvents (discord.js 14.28.0); registro sin verificación de compatibilidad.`,e);walkStatements(e.body,add,{loop:0,functionDepth:0});
    } else if(d.kind==='StartupDeclaration'){
      walkStatements(d.body,add,{loop:0,functionDepth:0});
    } else if(d.kind==='RecordDeclaration'){for(const field of d.fields)if(field.defaultValue&&field.defaultValue.kind==='LiteralExpression'){} }
    else if(d.kind==='FunctionDeclaration') walkStatements((d as FunctionDeclaration).body,add,{loop:0,functionDepth:1});
    else if(d.kind==='SchedulerDeclaration') walkStatements(d.body,add,{loop:0,functionDepth:0});
  }
  diagnostics.push(...analyzeSemantics(program,options));
  return {ok:!diagnostics.some(x=>x.severity==='error'),diagnostics};
}

function validateOptions(options:readonly any[],node:any,add:any){
  const allowed=new Set(['texto','entero','numero','booleano','usuario','canal','rol','mencionable','adjunto']);
  if(options.length>25)add('error','Validator-LimiteOpciones-Error','Límite de opciones excedido: Discord admite hasta 25 por comando o subcomando.',node);
  const seen=new Set<string>();let optionalSeen=false;
  for(const o of options){
    // Diagnósticos de opciones: la ubicación pertenece al identificador, no al comando contenedor.
    const optionLocation=o.span?o:node;
    const addOption=(severity:'error'|'warning',code:string,message:string)=>add(severity,code,message,optionLocation);
    const k=String(o.name).toLowerCase();
    if(['__proto__','prototype','constructor'].includes(k))addOption('error','Validator-NombreReservado-Error',`Opción '${o.name}': identificador reservado del prototipo de objetos.`);
    // La opción homónima no es ambigua por sí sola: analizar el uso real
    // de nombres cortos en el cuerpo evita advertencias falsas.
    if(seen.has(k))addOption('error','Validator-OpcionDuplicada-Error',`Opción duplicada: '${o.name}'.`);
    seen.add(k);
    if(!/^[a-z0-9_-]{1,32}$/.test(o.name))addOption('error','Validator-NombreOpcion-Error',`Nombre de opción no válido: '${o.name}' (a-z, 0-9, '_', '-'; 1–32 caracteres).`);
    if(!allowed.has(o.kind))addOption('error','Validator-TipoOpcion-Error',`Opción '${o.name}': tipo no reconocido '${o.kind}'. Valores admitidos: ${[...allowed].join(', ')}.`);
    if(o.description.length<1||o.description.length>100)addOption('error','Validator-DescripcionOpcion-Error',`Opción '${o.name}': descripción fuera de rango (1–100 caracteres).`);
    if(!o.required)optionalSeen=true;
    else if(optionalSeen)addOption('error','Validator-OrdenOpciones-Error',`Opción requerida '${o.name}' declarada después de una opción opcional; Discord exige las requeridas primero.`);
    if((o.choices?.length??0)>25)addOption('error','Validator-LimiteElecciones-Error',`Opción '${o.name}': límite de 25 elecciones excedido.`);
    if(o.autocomplete&&o.choices?.length)addOption('error','Validator-EleccionAutocompletar-Error',`Opción '${o.name}': ELECCION y AUTOCOMPLETAR son incompatibles.`);
    if(o.choices?.length&&!['texto','entero','numero'].includes(o.kind))addOption('error','Validator-EleccionTipo-Error',`Opción '${o.name}': ELECCION requiere tipo texto, entero o numero.`);
    for(const choice of o.choices??[])if(o.kind==='entero'&&!Number.isSafeInteger(choice.value)||o.kind==='numero'&&(typeof choice.value!=='number'||!Number.isFinite(choice.value))||o.kind==='texto'&&typeof choice.value!=='string')
      addOption('error','Validator-EleccionValor-Error',`Opción '${o.name}': valor de ELECCION incompatible con el tipo '${o.kind}'.`);
    if(o.minLength!==undefined||o.maxLength!==undefined){
      if(o.kind!=='texto')addOption('error','Validator-LongitudOpcion-Error',`Opción '${o.name}': límites de longitud disponibles solo para tipo texto.`);
      for(const n of [o.minLength,o.maxLength])if(n!==undefined&&(!Number.isSafeInteger(n)||n<0||n>6000))addOption('error','Validator-LongitudOpcion-Error',`Opción '${o.name}': límite de longitud fuera del rango 0–6000.`);
      if(o.minLength!==undefined&&o.maxLength!==undefined&&o.minLength>o.maxLength)addOption('error','Validator-LimitesOpcion-Error',`Opción '${o.name}': MINIMO excede MAXIMO.`);
    }
    if(o.minValue!==undefined||o.maxValue!==undefined){
      if(!['entero','numero'].includes(o.kind))addOption('error','Validator-LimiteNumerico-Error',`Opción '${o.name}': límites numéricos requieren tipo entero o numero.`);
      for(const n of [o.minValue,o.maxValue])if(n!==undefined&&(!Number.isFinite(n)||(o.kind==='entero'&&!Number.isSafeInteger(n))))addOption('error','Validator-LimiteNumerico-Error',`Opción '${o.name}': límite numérico no finito o incompatible con su tipo.`);
      if(o.minValue!==undefined&&o.maxValue!==undefined&&o.minValue>o.maxValue)addOption('error','Validator-LimitesOpcion-Error',`Opción '${o.name}': MINIMO excede MAXIMO.`);
    }
    if(o.channelTypes?.length&&o.kind!=='canal')addOption('error','Validator-TipoCanal-Error',`Opción '${o.name}': CANALES requiere tipo canal.`);
    if(o.autocomplete&&!['texto','entero','numero'].includes(o.kind))addOption('error','Validator-AutocompletarTipo-Error',`Opción '${o.name}': AUTOCOMPLETAR requiere tipo texto, entero o numero.`);
  }
}

function walkStatements(body:readonly Statement[],add:(s:'error'|'warning',c:string,m:string,n:any)=>void,ctx:{loop:number;functionDepth:number}):void{
  let terminated=false;
  for(const s of body){
    if(terminated)add('warning','Validator-CodigoInalcanzable-Error','Código inalcanzable: el bloque ya contiene una instrucción de terminación.',s);
    if(s.kind==='DiscordActionStatement'&&!SEMANTIC_ACTIONS.has(s.action))add('error','Validator-AccionDiscord-Error',`Acción Discord no registrada: '${s.action}'.`,s);
    if((s.kind==='BreakStatement'||s.kind==='ContinueStatement')&&ctx.loop===0)add('error','Validator-ControlBucle-Error',`${s.kind==='BreakStatement'?'ROMPER':'CONTINUAR'} fuera de un bucle.`,s);
    if(s.kind==='ReturnStatement'&&ctx.functionDepth===0)add('warning','Validator-RetornoFueraFuncion-Error','RETORNAR fuera de una función: finaliza exclusivamente el controlador actual.',s);
    if(['ReturnStatement','ThrowStatement','BreakStatement','ContinueStatement'].includes(s.kind))terminated=true;

    if(s.kind==='IfStatement'){for(const b of s.branches)walkStatements(b.body,add,{...ctx});if(s.otherwise)walkStatements(s.otherwise,add,{...ctx});}
    else if(s.kind==='SwitchStatement'){for(const c of s.cases)walkStatements(c.body,add,{...ctx});if(s.defaultCase)walkStatements(s.defaultCase,add,{...ctx});}
    else if(s.kind==='TryStatement'){walkStatements(s.body,add,{...ctx});for(const c of s.catches??[])walkStatements(c.body,add,{...ctx});if(s.finallyBody)walkStatements(s.finallyBody,add,{...ctx});}
    else if(['WhileStatement','DoWhileStatement','ForRangeStatement','ForEachStatement','RepeatStatement','RepeatUntilStatement','InfiniteLoopStatement'].includes(s.kind)){walkStatements((s as any).body,add,{...ctx,loop:ctx.loop+1});}
    else if(s.kind==='ParallelStatement'||s.kind==='RaceStatement'){for(const b of s.branches)walkStatements(b,add,{...ctx});}
    else if(s.kind==='TimeoutStatement'){walkStatements(s.body,add,{...ctx});if(s.onTimeout)walkStatements(s.onTimeout,add,{...ctx});}
    else if(s.kind==='BlockStatement')walkStatements(s.body,add,{...ctx});
  }
}
