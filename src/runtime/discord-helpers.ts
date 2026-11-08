import { resolvePermissionName, DISCORD_PERMISSION_NAMES } from '../discord/permissions.js';
import { currentSignal, remainingExecutionMs, ExecutionCancelledError } from './execution.js';

/** Registro canónico de operaciones Discord; comparación de nombres insensible a mayúsculas. Las comprobaciones de jerarquía fallan si faltan datos. */
function discordId(x:unknown):string {
  const data:any=x;
  const id=(data!==null&&typeof data==='object')?(data.id??data.user?.id??data.author?.id):data;
  const value=String(id??'');
  const normalized=value.match(/^<@!?([0-9]{15,22})>$/)?.[1]??value.match(/^<@&([0-9]{15,22})>$/)?.[1]??value.match(/^<#([0-9]{15,22})>$/)?.[1]??value;
  if(!/^\d{15,22}$/.test(normalized))throw new Error('Referencia Discord no válida: se esperaba objeto o Snowflake de 15–22 dígitos.');
  return normalized;
}
function softId(x:any):string|undefined {
  const v=x?.id??x?.user?.id??x?.author?.id??((typeof x==='string'||typeof x==='number')?x:undefined);
  if(v===undefined)return undefined;
  const raw=String(v);
  return raw.match(/^<@!?([0-9]{15,22})>$/)?.[1]??raw.match(/^<@&([0-9]{15,22})>$/)?.[1]??raw.match(/^<#([0-9]{15,22})>$/)?.[1]??raw;
}
function actualUser(x:any):any{return x?.user??x?.author??x;}
function rolesOf(x:any):any[]{
  const roles=x?.roles?.cache??x?.roles;
  if(!roles)return [];
  if(Array.isArray(roles))return roles;
  if(typeof roles.values==='function')return [...roles.values()];
  if(typeof roles==='object')return Object.values(roles);
  return [];
}
function highestRole(member:any):any {
  if(member?.roles?.highest)return member.roles.highest;
  const roles=rolesOf(member).filter(r=>r&&typeof r==='object');
  return roles.sort((a,b)=>{
    if(typeof a.comparePositionTo==='function')return -Number(a.comparePositionTo(b));
    return Number(b.position??-1)-Number(a.position??-1);
  })[0];
}
function higherRole(a:any,b:any):boolean {
  if(!a||!b)return false;
  if(typeof a.comparePositionTo==='function')return a.comparePositionTo(b)>0;
  if(Number.isFinite(a.position)&&Number.isFinite(b.position))return a.position>b.position;
  return false;
}
function isOwner(user:any,guild:any):boolean{
  const uid=softId(user),ownerId=softId(guild?.ownerId);
  return Boolean(uid&&ownerId&&uid===ownerId);
}

/** Funciones auxiliares sin acceso arbitrario a métodos nativos. */
export function createDiscordHelpers(discord:any={},clientGetter:()=>any=()=>undefined,contextGetter:()=>any=()=>undefined):Record<string,(...args:any[])=>any>{
  const context=()=>contextGetter()??{};
  const author=()=>context().autor??context().usuario;
  const member=()=>context().miembro;
  const guild=()=>context().servidor??context().guild;
  const channel=()=>context().canal;
  const message=()=>context().mensaje;
  const resolveActorTarget=(actorOrTarget:any,target:any)=>target===undefined?[member(),actorOrTarget]:[actorOrTarget,target];
  const ensureClient=()=>{const c=clientGetter();if(!c)throw new Error('Cliente Discord no disponible: sesión no iniciada.');return c;};
  const ensureGuild=async(input:any)=>{
    const guild=input??context().servidor??context().guild;
    if(guild?.members?.fetch)return guild;
    const c=ensureClient();return c.guilds.cache?.get(discordId(guild))??await c.guilds.fetch(discordId(guild));
  };
  const ensureGuildMember=async(guild:any,member:any):Promise<any|undefined>=>{
    if(!guild?.members)return undefined;
    const id=softId(member);if(!id)return undefined;
    // Validar la membresía en el servidor objetivo antes de comparar jerarquías.
    if(member?.guild?.id===guild.id&&member?.roles&&member?.permissions)return member;
    const cached=guild.members.cache?.get?.(id);
    if(cached)return cached;
    if(typeof guild.members.fetch!=='function')return undefined;
    try{return await guild.members.fetch(id);}catch(error:any){
      if(error?.code===10007||error?.rawError?.code===10007)return undefined; // Discord API error 10007: Unknown Member.
      throw error;
    }
  };
  const makePayload=(payload:any)=>{
    let value=typeof payload==='string'?{content:payload}:payload;
    if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('ENVIAR: contenido incompatible; esperado texto u objeto de mensaje.');
    const kind=value.constructor?.name;
    if(kind==='EmbedBuilder')value={embeds:[value]};
    else if(kind==='AttachmentBuilder')value={files:[value]};
    else if(kind==='ActionRowBuilder')value={components:[value]};
    else if(value.__pdKind==='message'){value={...value};delete value.__pdKind;}
    else if(value.__pdKind==='poll'){value={poll:{...value}};delete value.poll.__pdKind;}
    return {allowedMentions:{parse:['users'],repliedUser:false},...value};
  };
  const getPermissions=(member:any)=>member?.permissions??member?.memberPermissions;
  const hasPermission=(member:any,permiso:any):boolean=>{
    const canonical=resolvePermissionName(String(permiso));
    if(!canonical)throw new Error(`Permiso Discord no reconocido: '${String(permiso)}'.`);
    const permissions=getPermissions(member);
    if(permissions===undefined||permissions===null)return false;
    if(typeof permissions.has==='function')return Boolean(permissions.has(canonical));
    const bits=discord?.PermissionFlagsBits;
    if((typeof permissions==='bigint'||typeof permissions==='string'||typeof permissions==='number')&&bits){
      if(!/^\d+$/.test(String(permissions)))throw new Error('TIENE_PERMISO: máscara de permisos no numérica.');
      const flag=bits[canonical];if(flag===undefined)throw new Error(`TIENE_PERMISO: indicador '${canonical}' no disponible en discord.js.`);
      const mask=BigInt(permissions),required=BigInt(flag);
      const admin=bits.Administrator===undefined?0n:BigInt(bits.Administrator);
      return (mask&required)===required||(admin!==0n&&(mask&admin)===admin);
    }
    throw new Error('TIENE_PERMISO: objeto miembro ausente o sin permisos accesibles.');
  };
  const waitMs=(time:any,name:string):number=>{
    const m=String(time).trim().match(/^(\d+(?:\.\d+)?)(ms|s|m)?$/i);
    if(!m)throw new Error(`${name}: duración no válida; formatos admitidos: 15s, 1m, 2h.`);
    const ms=Number(m[1])*({ms:1,s:1000,m:60000}[(m[2]?.toLowerCase()??'ms') as 'ms'|'s'|'m']);
    if(!Number.isSafeInteger(ms)||ms<1000||ms>120000)throw new Error(`${name}: duración fuera de rango (1–120 segundos).`);
    if(ms+100>=remainingExecutionMs())throw new Error(`${name}: espera superior al tiempo de ejecución restante (Runtime.MaxExecutionMs).`);
    return ms;
  };
  const waitComponent=async(mensaje:any,id:any,tiempo:any,tipo:'boton'|'menu'|'cualquiera',usuario:any):Promise<any|undefined>=>{
    const msg=mensaje;
    if(!msg||typeof msg.createMessageComponentCollector!=='function')
      throw new Error('ESPERAR_COMPONENTE: se requiere un mensaje enviado por el bot que contenga componentes interactivos.');
    if(!msg.id)throw new Error('ESPERAR_COMPONENTE: referencia a mensaje ausente; espera global del canal no admitida.');
    const customId=String(id??'');
    if(!customId||customId.length>100)throw new Error('ESPERAR_COMPONENTE: custom_id fuera de rango (1–100 caracteres).');
    const uid=discordId(usuario);
    const ms=waitMs(tiempo,'ESPERAR_COMPONENTE');
    const signal=currentSignal();
    if(signal?.aborted)throw new ExecutionCancelledError();
    const filter=(interaction:any)=>{
      if(String(interaction?.user?.id)!==uid||interaction?.customId!==customId)return false;
      return tipo==='cualquiera'||(tipo==='boton'?interaction.isButton?.()===true:
        (interaction.isAnySelectMenu?.()===true||interaction.isStringSelectMenu?.()===true));
    };
    return new Promise<any>((resolve,reject)=>{
      const collector=msg.createMessageComponentCollector({filter,max:1,time:ms});
      let ended=false;
      const cleanup=()=>{collector.off('collect',onCollect);collector.off('end',onEnd);signal?.removeEventListener('abort',onAbort);};
      const finish=(result:any,error?:Error)=>{
        if(ended)return;ended=true;cleanup();
        if(error)reject(error);else resolve(result);
      };
      const onCollect=(interaction:any)=>{
        collector.off('end',onEnd);
        collector.stop('pseudodiscord');
        // Confirma el clic automáticamente para que Discord no muestre «Interacción fallida».
        // El script puede editar el mensaje original o enviar otro mensaje después.
        void (async()=>{
          try {
            if(!interaction?.deferred&&!interaction?.replied&&typeof interaction?.deferUpdate==='function')
              await interaction.deferUpdate();
            finish(interaction);
          }catch(error){finish(undefined,error instanceof Error?error:new Error(String(error)));}
        })();
      };
      const onEnd=()=>finish(undefined);
      const onAbort=()=>{finish(undefined,new ExecutionCancelledError());collector.stop('cancelado');};
      collector.on('collect',onCollect);
      collector.once('end',onEnd);
      signal?.addEventListener('abort',onAbort,{once:true});
      if(signal?.aborted)onAbort();
    });
  };
  const canModerate=async(action:'kick'|'ban'|'timeout',actor:any,target:any):Promise<boolean>=>{
    const guild=actor?.guild??target?.guild??context().servidor??context().guild;
    if(!guild?.members)return false;
    if(actor?.guild?.id&&target?.guild?.id&&actor.guild.id!==target.guild.id)return false;
    const executor=await ensureGuildMember(guild,actor);
    const victim=await ensureGuildMember(guild,target);
    if(!executor||!victim)return false;
    if(!softId(executor)||softId(executor)===softId(victim)||isOwner(victim,guild))return false;
    const permission=action==='kick'?'EXPULSAR_MIEMBROS':action==='ban'?'BANEAR_MIEMBROS':'MODERAR_MIEMBROS';
    if(!isOwner(executor,guild)&&!hasPermission(executor,permission))return false;
    if(!isOwner(executor,guild)&&!higherRole(highestRole(executor),highestRole(victim)))return false;
    // discord.js calcula también permisos y jerarquía del propio bot.
    return action==='kick'?victim.kickable===true:action==='ban'?victim.bannable===true:victim.moderatable===true;
  };
  // En las funciones de identidad, omitir el parámetro significa «usuario actual».
  // Pasar INDEFINIDO expresamente (p. ej. una OPCION omitida) es un error;
  // de otro modo JavaScript activa silenciosamente el argumento por defecto.
  const explicitUser=(fn:string,received:any[],defaultUser:()=>any=author):any=>{
    const input=received.length?received[0]:defaultUser();
    if(input===undefined||input===null)throw new Error(`${fn}: Referencia Discord no válida: usuario no especificado. Usa contexto.usuario o COALESCER(argumentos.objetivo, contexto.usuario).`);
    return input;
  };
  const api:Record<string,(...args:any[])=>any>={
    MENCIONAR:(...args:any[])=>`<@${discordId(explicitUser('MENCIONAR',args))}>`,
    MENCIONAR_ROL:(x:any)=>`<@&${discordId(x)}>`,
    MENCIONAR_CANAL:(x:any)=>`<#${discordId(x)}>`,
    ID_DE:(...args:any[])=>discordId(explicitUser('ID_DE',args)),
    NOMBRE_DE:(...args:any[])=>{const x=explicitUser('NOMBRE_DE',args);return String(actualUser(x)?.username??x?.name??x?.displayName??'');},
    NOMBRE_VISIBLE:(...args:any[])=>{const x=explicitUser('NOMBRE_VISIBLE',args);return String(x?.displayName??x?.nickname??actualUser(x)?.globalName??actualUser(x)?.username??x?.name??'');},
    ES_BOT:(...args:any[])=>args.length&&args[0]==null?false:Boolean(actualUser(explicitUser('ES_BOT',args))?.bot),
    AVATAR_DE:(...args:any[])=>{
      const x=explicitUser('AVATAR_DE',args),tamano=args.length>1?args[1]:256;
      const size=Number(tamano);
      if(!Number.isSafeInteger(size)||size<16||size>4096||(size&(size-1))!==0)throw new Error('AVATAR_DE: tamaño no admitido; esperado potencia de 2 entre 16 y 4096.');
      const u=actualUser(x);
      if(!u||typeof u.displayAvatarURL!=='function')throw new Error('AVATAR_DE: referencia de usuario ausente o sin proveedor de avatar.');
      return u.displayAvatarURL({size});
    },
    ROLES_DE:(x:any=member())=>rolesOf(x).map((r:any)=>r?.name??String(r)),
    ROLES_OBJETO:(x:any=member())=>rolesOf(x),
    ROL_MAS_ALTO:(x:any=member())=>highestRole(x),
    JERARQUIA_ROL:(x:any=member())=>{
      const role=x?.roles?highestRole(x):x;
      return Number.isFinite(role?.position)?role.position:undefined;
    },
    TIENE_ROL:(memberOrRole:any,optionalRole?:any)=>{
      const member=optionalRole===undefined?context().miembro:memberOrRole;
      const rol=optionalRole===undefined?memberOrRole:optionalRole;
      const id=typeof rol==='object'&&rol?.id?String(rol.id):String(rol);
      const cache=member?.roles?.cache;
      if(cache?.has?.(id))return true;
      return rolesOf(member).some((r:any)=>String(r?.id??r)===id||String(r?.name??r).toLowerCase()===id.toLowerCase());
    },
    TIENE_PERMISO:(memberOrPermission:any,permission?:any)=>permission===undefined?hasPermission(member(),memberOrPermission):hasPermission(memberOrPermission,permission),
    ES_ID_DISCORD:(valor:any)=>{try{discordId(valor);return true;}catch{return false;}},
    TIENE_PERMISO_BOT:async(permiso:any)=>{
      const g=guild(),c=ensureClient();
      if(!g?.members)throw new Error('TIENE_PERMISO_BOT: contexto de servidor requerido.');
      const me=g.members.me??g.members.cache?.get?.(c.user?.id)??await g.members.fetch?.(c.user?.id);
      return me?hasPermission(me,permiso):false;
    },
    ESPERAR_MENSAJE:async(usuario:any=author(),tiempo:any='15s')=>{
      // Forma cómoda: ESPERAR_MENSAJE('10s') espera al autor actual.
      if(typeof usuario==='string'&&/^\d+(?:\.\d+)?(?:ms|s|m)$/i.test(usuario)&&tiempo==='15s'){
        tiempo=usuario;usuario=author();
      }
      const ch=channel();
      if(typeof ch?.createMessageCollector!=='function'&&typeof ch?.awaitMessages!=='function')
        throw new Error('ESPERAR_MENSAJE: contexto de canal de texto no disponible.');
      const uid=discordId(usuario);
      const ms=waitMs(tiempo,'ESPERAR_MENSAJE');
      const filter=(msg:any)=>!msg?.author?.bot&&String(msg?.author?.id)===uid;
      const signal=currentSignal();
      if(signal?.aborted)throw new ExecutionCancelledError();
      if(typeof ch.createMessageCollector==='function'){
        return await new Promise<any>((resolve,reject)=>{
          const collector=ch.createMessageCollector({filter,max:1,time:ms});
          const cleanup=()=>{collector.off('collect',onCollect);collector.off('end',onEnd);signal?.removeEventListener('abort',onAbort);};
          const onCollect=(msg:any)=>{cleanup();collector.stop('pseudodiscord');resolve(msg);};
          const onEnd=()=>{cleanup();resolve(undefined);};
          const onAbort=()=>{cleanup();collector.stop('cancelado');reject(new ExecutionCancelledError());};
          collector.on('collect',onCollect);collector.once('end',onEnd);
          signal?.addEventListener('abort',onAbort,{once:true});
          if(signal?.aborted)onAbort();
        });
      }
      // Compatibilidad con adaptadores que ofrecen awaitMessages, sin Collector directo.
      const messages=await ch.awaitMessages({filter,max:1,time:ms});
      return messages?.first?.();
    },
    ESPERAR_COMPONENTE:(mensaje:any,id:any,tiempo:any='15s',tipo:any='cualquiera',usuario:any=author())=>{
      if(!['boton','menu','cualquiera'].includes(String(tipo)))throw new Error('ESPERAR_COMPONENTE: tipo no reconocido; admitidos: boton, menu, cualquiera.');
      return waitComponent(mensaje,id,tiempo,tipo,usuario);
    },
    ESPERAR_BOTON:(mensaje:any,id:any,tiempo:any='15s',usuario:any=author())=>waitComponent(mensaje,id,tiempo,'boton',usuario),
    ESPERAR_MENU:(mensaje:any,id:any,tiempo:any='15s',usuario:any=author())=>waitComponent(mensaje,id,tiempo,'menu',usuario),
    PERMISOS_DE:(member:any=context().miembro)=>{
      const permissions=getPermissions(member);
      if(permissions===undefined||permissions===null)throw new Error('PERMISOS_DE: objeto miembro sin propiedad de permisos.');
      return DISCORD_PERMISSION_NAMES.filter(name=>{
        if(discord?.PermissionFlagsBits && discord.PermissionFlagsBits[name]===undefined)return false;
        return hasPermission(member,name);
      });
    },
    PRIMER_MENCIONADO:(mensaje:any=context().mensaje,siFaltaAutor=false)=>{
      const first=(mentions:any)=>typeof mentions?.first==='function'?mentions.first():Array.isArray(mentions)?mentions[0]:mentions?.values?.().next().value;
      const found=first(mensaje?.mentions?.members)??first(mensaje?.mentions?.users);
      return found??(siFaltaAutor?mensaje?.author:undefined);
    },
    ENLACE_MENSAJE:(mensaje:any=context().mensaje)=>{
      if(!mensaje)throw new Error('ENLACE_MENSAJE: mensaje ausente.');
      if(typeof mensaje?.url==='string')return mensaje.url;
      const guildId=mensaje?.guildId??mensaje?.guild?.id;
      const guild=guildId===null||guildId===undefined?'@me':discordId(guildId);
      const channel=discordId(mensaje?.channelId??mensaje?.channel);
      const id=discordId(mensaje);
      return `https://discord.com/channels/${guild}/${channel}/${id}`;
    },
    FECHA_DISCORD:(fecha:any=new Date(),estilo='f')=>{
      const styles=new Set(['t','T','d','D','f','F','R']);
      if(!styles.has(String(estilo)))throw new Error('FECHA_DISCORD: estilo no reconocido; admitidos: t, T, d, D, f, F, R.');
      const date=fecha instanceof Date?fecha:new Date(fecha);
      const timestamp=date.getTime();if(!Number.isFinite(timestamp))throw new Error('FECHA_DISCORD: fecha no válida.');
      return `<t:${Math.floor(timestamp/1000)}:${estilo}>`;
    },
    ES_DUENO:(usuario:any=author(),servidor:any=guild())=>isOwner(usuario,servidor),
    ES_ADMINISTRADOR:(miembro:any=member())=>hasPermission(miembro,'ADMINISTRADOR'),
    ES_MIEMBRO:async(usuario:any=author(),servidor:any=guild())=>Boolean(await ensureGuildMember(await ensureGuild(servidor),usuario)),
    PUEDE_GESTIONAR_ROL:async(ejecutorORol:any,roleArg?:any):Promise<boolean>=>{
      const actor=roleArg===undefined?member():ejecutorORol;
      const requested=roleArg===undefined?ejecutorORol:roleArg;
      const g=actor?.guild??guild();
      if(!g?.roles||!g?.members)return false;
      const executor=await ensureGuildMember(g,actor);
      if(!executor)return false;
      let role:any;
      if(typeof requested==='object'&&requested?.id)role=requested;
      else {
        let rid:string;
        try{rid=discordId(requested);}catch{return false;}
        role=g.roles.cache?.get?.(rid);
        if(!role&&typeof g.roles.fetch==='function'){
          try{role=await g.roles.fetch(rid);}
          catch(error:any){if(error?.code===10011||error?.rawError?.code===10011)return false;throw error;}
        }
      }
      if(!role||!role.id||(role.guild?.id&&role.guild.id!==g.id))return false;
      if(role.managed||role.id===g.id||role.id===g.roles.everyone?.id)return false;
      if(!isOwner(executor,g)&&!hasPermission(executor,'GESTIONAR_ROLES'))return false;
      if(!isOwner(executor,g)&&!higherRole(highestRole(executor),role))return false;
      // editable es una propiedad calculada por discord.js que combina permisos y jerarquía del bot.
      if(typeof role.editable!=='boolean')return false;
      return role.editable;
    },
    ES_BANEABLE:(miembro:any)=>miembro?.bannable===true,
    ES_EXPULSABLE:(miembro:any)=>miembro?.kickable===true,
    ES_MODERABLE:(miembro:any)=>miembro?.moderatable===true,
    PUEDE_BANEAR:(ejecutor:any,objetivo?:any)=>canModerate('ban',...resolveActorTarget(ejecutor,objetivo) as [any,any]),
    PUEDE_EXPULSAR:(ejecutor:any,objetivo?:any)=>canModerate('kick',...resolveActorTarget(ejecutor,objetivo) as [any,any]),
    PUEDE_SILENCIAR:(ejecutor:any,objetivo?:any)=>canModerate('timeout',...resolveActorTarget(ejecutor,objetivo) as [any,any]),
    CANTIDAD_MIEMBROS:(servidor:any=guild())=>servidor?.memberCount??servidor?.approximateMemberCount??undefined,
    COLOR_ROL:(rol:any)=>rol?.hexColor??(Number.isInteger(rol?.color)?`#${rol.color.toString(16).padStart(6,'0')}`:undefined),
    BANNER_DE:(...args:any[])=>{
      const usuario=explicitUser('BANNER_DE',args),tamano=args.length>1?args[1]:1024;
      const size=Number(tamano);
      if(!Number.isSafeInteger(size)||size<16||size>4096||(size&(size-1))!==0)throw new Error('BANNER_DE: tamaño no admitido; esperado potencia de 2 entre 16 y 4096.');
      const u=actualUser(usuario);
      if(!u||typeof u.bannerURL!=='function')throw new Error('BANNER_DE: referencia de usuario sin proveedor de banner.');
      return u.bannerURL({size})??undefined;
    },
    ESCAPAR_MENCIONES:(texto:any)=>String(texto).replaceAll('@','@\u200b'),
    CODIGO_DISCORD:(texto:any,lenguaje='')=>{
      const code=String(texto).replaceAll('```','`\u200b``');
      const lang=String(lenguaje).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,25);
      return `\`\`\`${lang}\n${code}\n\`\`\``;
    },
    EMBED_SIMPLE:(titulo:any,descripcion?:any,color:any='#5865F2')=>{
      // Un argumento: descripción. Dos argumentos: título y descripción.
      const title=descripcion===undefined?'':String(titulo),description=descripcion===undefined?String(titulo):String(descripcion);
      if(title.length>256||description.length>4096)throw new Error('EMBED_SIMPLE: límite excedido (título 256, descripción 4096 caracteres).');
      const c=typeof color==='number'?color:typeof color==='string'&&/^#?[a-f0-9]{6}$/i.test(color)?parseInt(color.replace('#',''),16):NaN;
      if(!Number.isSafeInteger(c)||c<0||c>0xffffff)throw new Error('EMBED_SIMPLE: valor de color no válido (RGB de 24 bits).');
      return {embeds:[{...(title?{title}:{}),description,color:c}]};
    },
    BUSCAR_SERVIDOR_DISCORD:async(id:any=guild())=>{
      if(id?.members)return id;
      const c=ensureClient();const gid=discordId(id);
      return c.guilds.cache?.get(gid)??await c.guilds.fetch(gid);
    },
    OBTENER_USUARIO_DISCORD:async(...args:any[])=>{
      const id=explicitUser('OBTENER_USUARIO_DISCORD',args);
      if(actualUser(id)?.username)return actualUser(id);
      const c=ensureClient();const uid=discordId(id);
      return c.users.cache?.get(uid)??await c.users.fetch(uid);
    },
    OBTENER_CANAL_DISCORD:async(id:any=channel())=>{
      if(id?.send||id?.messages)return id;
      const c=ensureClient();const cid=discordId(id);
      return c.channels.cache?.get(cid)??await c.channels.fetch(cid);
    },
    OBTENER_MIEMBRO_DISCORD:async(guildOrId:any,id?:any)=>{
      const g=await ensureGuild(id===undefined?undefined:guildOrId);const uid=discordId(id===undefined?guildOrId:id);
      return g.members.cache?.get(uid)??await g.members.fetch(uid);
    },
    OBTENER_ROL_DISCORD:async(guildOrId:any,id?:any)=>{
      const g=await ensureGuild(id===undefined?undefined:guildOrId);const rid=discordId(id===undefined?guildOrId:id);
      return g.roles.cache?.get(rid)??await g.roles.fetch(rid);
    },
    OBTENER_MENSAJE:async(canalOrId:any,id?:any)=>{
      const canal=id===undefined?channel():canalOrId;
      const messageId=id===undefined?canalOrId:id;
      const ch=canal?.messages?.fetch?canal:await api.OBTENER_CANAL_DISCORD(canal);
      if(typeof ch?.messages?.fetch!=='function')throw new Error('OBTENER_MENSAJE: canal sin acceso a historial de mensajes.');
      return ch.messages.cache?.get(discordId(messageId))??await ch.messages.fetch(discordId(messageId));
    },
    // Consultas de lectura adicionales.
    
    BUSCAR_MENSAJES:async(canalOCantidad:any=10,cantidad?:any)=>{
      const isCount=typeof canalOCantidad==='number'||typeof canalOCantidad==='string'&&/^\d{1,3}$/.test(canalOCantidad);
      const channelInput=isCount?channel():canalOCantidad;
      const limit=isCount?canalOCantidad:(cantidad??10);
      const n=Number(limit);
      if(!Number.isSafeInteger(n)||n<1||n>100)throw new Error('BUSCAR_MENSAJES: cantidad fuera de rango (1–100).');
      const ch=channelInput?.messages?.fetch?channelInput:await api.OBTENER_CANAL_DISCORD(channelInput);
      if(typeof ch?.messages?.fetch!=='function')throw new Error('BUSCAR_MENSAJES: canal sin acceso a historial de mensajes.');
      const result=await ch.messages.fetch({limit:n});
      return [...(result?.values?.()??[])];
    },
    MENSAJES_FIJADOS:async(canalActual:any=channel())=>{
      const ch=canalActual?.messages?.fetchPins||canalActual?.messages?.fetchPinned?canalActual:await api.OBTENER_CANAL_DISCORD(canalActual);
      if(typeof ch?.messages?.fetchPins==='function'){
        // discord.js 14.28: fetchPins sustituye fetchPinned y devuelve elementos con .message.
        const result=await ch.messages.fetchPins();
        return Array.isArray(result?.items)?result.items.map((item:any)=>item.message).filter(Boolean):[];
      }
      if(typeof ch?.messages?.fetchPinned!=='function')throw new Error('MENSAJES_FIJADOS: tipo de canal o API de mensajes fijados no compatible.');
      const result=await ch.messages.fetchPinned();return [...(result?.values?.()??[])];
    },
    INVITACIONES_DE:async(servidor:any=guild())=>{
      const g=await ensureGuild(servidor);
      if(typeof g?.invites?.fetch!=='function')throw new Error('INVITACIONES_DE: administrador de invitaciones no disponible en el servidor.');
      const result=await g.invites.fetch();return [...(result?.values?.()??[])];
    },
    AUDITORIA_SERVIDOR:async(cantidad:any=10,servidor:any=guild())=>{
      const n=Number(cantidad);
      if(!Number.isSafeInteger(n)||n<1||n>100)throw new Error('AUDITORIA_SERVIDOR: límite de consulta fuera de rango (1–100).');
      const g=await ensureGuild(servidor);
      if(typeof g?.fetchAuditLogs!=='function')throw new Error('AUDITORIA_SERVIDOR: registro de auditoría no disponible en el servidor.');
      const result=await g.fetchAuditLogs({limit:n});return [...(result?.entries?.values?.()??[])];
    },
    ENVIAR_PRIVADO:async(usuarioOContenido:any,contenido?:any)=>{
      const usuario=contenido===undefined?author():usuarioOContenido;
      const payload=contenido===undefined?usuarioOContenido:contenido;
      const target=usuario?.send?usuario:await api.OBTENER_USUARIO_DISCORD(usuario);
      if(typeof target?.send!=='function')throw new Error('ENVIAR_PRIVADO: destinatario sin capacidad de recibir mensajes.');
      return target.send(makePayload(payload));
    },
    ENVIAR_CANAL:async(canalOContenido:any,contenido?:any)=>{
      const canal=contenido===undefined?channel():canalOContenido;
      const payload=contenido===undefined?canalOContenido:contenido;
      const target=canal?.send?canal:await api.OBTENER_CANAL_DISCORD(canal);
      if(typeof target?.send!=='function')throw new Error('ENVIAR_CANAL: destino incompatible; se requiere canal de texto.');
      return target.send(makePayload(payload));
    }
  };
  return api;
}
