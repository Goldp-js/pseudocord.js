/** Consultas Discord; las mutaciones comprueban permisos del bot y del ejecutor. */

const SNOWFLAKE=/^\d{15,22}$/;
function idOf(x:any):string {
  const raw=String(x?.id??x?.user?.id??x?.author?.id??x??'');
  const normalized=raw.match(/^<@!?([0-9]{15,22})>$/)?.[1]??raw.match(/^<@&([0-9]{15,22})>$/)?.[1]??raw.match(/^<#([0-9]{15,22})>$/)?.[1]??raw;
  if(!SNOWFLAKE.test(normalized))throw new Error('Identificador Discord no válido: esperado Snowflake o mención.');
  return normalized;
}
const values=(collection:any):any[]=>collection?.values?[...collection.values()]:Array.isArray(collection)?[...collection]:[];
const has=(target:any,perm:string):boolean=>{
  const p=target?.permissions;
  return p?.has?.(perm)===true||p?.has?.(perm.replace(/^[a-z]/,x=>x.toLowerCase()))===true;
};
const guildOf=(thing:any)=>thing?.guild??thing?.server;
const everyone=(g:any)=>g?.roles?.everyone?.id??g?.id;
const prefix='pseudodiscord-ticket:v1:';
const inflightTickets=new Map<string,Promise<any>>();
export function createDiscordExtras(clientGetter:()=>any=()=>undefined,contextGetter:()=>any=()=>undefined):Record<string,(...args:any[])=>any>{
  const ctx=()=>contextGetter()??{};
  const author=()=>ctx().autor??ctx().usuario;
  const member=()=>ctx().miembro;
  const guild=()=>ctx().servidor??ctx().guild;
  const channel=()=>ctx().canal;
  const message=()=>ctx().mensaje;
  const interaction=()=>ctx().interaccion;
  const client=()=>{const c=clientGetter();if(!c)throw new Error('Cliente Discord no conectado: operación no disponible.');return c;};
  const getGuild=async(input?:any):Promise<any>=>{
    const g=input??guild();if(g?.members&&g?.channels)return g;
    const c=client();const id=idOf(g);
    return c.guilds.cache?.get(id)??await c.guilds.fetch(id);
  };
  const getBotMember=async(g:any):Promise<any>=>{
    const uid=client().user?.id;
    if(!uid)throw new Error('Cliente Discord: usuario del bot todavía no disponible (estado Ready pendiente).');
    return g.members?.me??g.members?.cache?.get?.(uid)??await g.members?.fetch?.(uid);
  };
  const assertBotCan=async(g:any,permission:string)=>{
    const bot=await getBotMember(g);
    if(!bot||!has(bot,permission))throw new Error(`Permisos del bot insuficientes: falta '${permission}'.`);
  };
  const getCh=async(input:any=channel())=>{
    if(input?.id&&(input?.guild||input?.guildId||input?.messages||input?.send))return input;
    const c=client();const i=idOf(input);return c.channels.cache?.get?.(i)??await c.channels.fetch(i);
  };
  const getMessage=async(input:any=message())=>{
    if(input?.id&&input?.channel)return input;
    const ch=await getCh();return ch?.messages?.fetch?.(idOf(input));
  };
  const getMember=async(input:any=member(),g:any=guild()):Promise<any>=>{
    if(input?.guild?.id===g?.id&&input?.roles)return input;
    const i=idOf(input);return g?.members?.cache?.get?.(i)??await g?.members?.fetch?.(i);
  };
  const ensureMemberGuild=(m:any,g:any)=>{
    if(!m||!g||m?.guild?.id&&m.guild.id!==g.id)throw new Error('Miembro objetivo: no pertenece al servidor activo.');
  };
  const guildRead=async(input:any,field:string,method?:string)=>{
    const g=await getGuild(input);const manager=g[field];
    if(!manager)return [];
    const result=method&&typeof manager[method]==='function'?await manager[method]():manager.cache;
    return values(result);
  };
  const canManage=(m:any,perm:string)=>m&&has(m,perm);
  const getChannelTopic=(ch:any)=>String(ch?.topic??'');
  const ticketOwner=(ch:any)=>getChannelTopic(ch).startsWith(prefix)?getChannelTopic(ch).slice(prefix.length):undefined;
  const checkTicketAccess=async(g:any,ch:any,actor:any)=>{
    const ownerId=ticketOwner(ch);if(!ownerId||!SNOWFLAKE.test(ownerId))throw new Error('Tickets: el canal no contiene metadatos de ticket de PseudoDiscord.');
    if((ch?.guild?.id??ch?.guildId)!==g.id)throw new Error('Tickets: servidor propietario distinto o metadatos de origen no verificables.');
    const executor=await getMember(actor,g);
    if(idOf(executor)!==ownerId&&!canManage(executor,'ManageChannels'))throw new Error('Tickets: operación denegada; requiere solicitante original o permiso de moderación.');
    return ownerId;
  };
  const f:Record<string,(...args:any[])=>any>={
    
    CREACION_USUARIO:(usuario:any=author())=>new Date(Number((BigInt(idOf(usuario))>>22n)+1420070400000n)),
    INGRESO_MIEMBRO:(m:any=member())=>m?.joinedAt??(m?.joinedTimestamp?new Date(m.joinedTimestamp):undefined),
    ESTADO_PRESENCIA:(m:any=member())=>m?.presence?.status,
    ACTIVIDAD_USUARIO:(m:any=member())=>m?.presence?.activities??[],
    CANAL_DE_VOZ:(m:any=member())=>m?.voice?.channel,
    ESTA_EN_VOZ:(m:any=member())=>Boolean(m?.voice?.channelId??m?.voice?.channel?.id),
    ESTA_SILENCIADO:(m:any=member())=>Boolean(m?.communicationDisabledUntilTimestamp>Date.now()||m?.voice?.mute||m?.voice?.deaf),
    TIEMPO_SILENCIO:(m:any=member())=>Math.max(0,Number(m?.communicationDisabledUntilTimestamp??0)-Date.now()),
    PERMISOS_EN_CANAL:(m:any=member(),ch:any=channel())=>ch?.permissionsFor?.(m)?.toArray?.()??[],
    ROLES_MUTUOS:(a:any,b:any)=>{
      const first=values(a?.roles?.cache),second=new Set(values(b?.roles?.cache).map(x=>String(x?.id)));
      return first.filter(x=>second.has(String(x?.id)));
    },
    ROLES_GESTIONABLES:async(input:any=guild())=>{
      const g=await getGuild(input);await assertBotCan(g,'ManageRoles');
      return values(g.roles?.cache).filter(r=>r?.editable===true&&!r?.managed&&r?.id!==g.id);
    },
    MIEMBROS_CON_ROL:async(role:any,guildInput:any=guild())=>{
      const g=await getGuild(guildInput);const rid=idOf(role);
      // Consulta limitada a miembros presentes en caché.
      return values(g.members?.cache).filter(m=>m?.roles?.cache?.has?.(rid));
    },
    BUSCAR_ROLES:async(query:any,guildInput:any=guild())=>{
      const g=await getGuild(guildInput),term=String(query??'').trim().toLowerCase();
      if(!term||term.length>100)throw new Error('BUSCAR_ROLES: búsqueda fuera de rango (1–100 caracteres).');
      return values(g.roles?.cache).filter(r=>String(r?.name??'').toLowerCase().includes(term)).slice(0,100);
    },
    PERFIL_MIEMBRO:(m:any=member())=>({id:idOf(m),nombre:m?.user?.username??m?.username,apodo:m?.displayName??m?.nickname,
      ingreso:m?.joinedAt,roles:values(m?.roles?.cache).map(r=>({id:r.id,nombre:r.name})),bot:m?.user?.bot??m?.bot??false}),
    
    MENSAJE_EXISTE:async(idOrMessage:any,ch?:any)=>{
      try{
        const input=idOrMessage?.channel?.messages?.fetch?idOrMessage.channel:await getCh(ch);
        if(typeof input?.messages?.fetch!=='function')throw new Error('MENSAJE_EXISTE: el canal no admite consultar mensajes.');
        // Una instancia Message puede permanecer en caché tras ser eliminada.
        // La existencia del mensaje requiere consulta remota; el ID local no es suficiente.
        const msg=await input.messages.fetch(idOf(idOrMessage));
        return Boolean(msg?.id);
      }catch(e:any){if([10008,10003].includes(e?.code??e?.rawError?.code))return false;throw e;}
    },
    REACCIONES_DE:(msg:any=message())=>values(msg?.reactions?.cache),
    USUARIOS_REACCION:async(emoji:any,msg:any=message(),cantidad:any=100)=>{
      const n=Number(cantidad);if(!Number.isSafeInteger(n)||n<1||n>100)throw new Error('Consulta Discord: cantidad fuera de rango (1–100).');
      const reaction=values(msg?.reactions?.cache).find(r=>r?.emoji?.name===String(emoji)||r?.emoji?.id===String(emoji));
      if(!reaction?.users?.fetch)return [];
      return values(await reaction.users.fetch({limit:n}));
    },
    CANAL_DE_TIPO:(ch:any=channel(),tipo?:any)=>tipo===undefined?ch?.type:ch?.type===tipo||String(ch?.type)===String(tipo),
    CANAL_PADRE:(ch:any=channel())=>ch?.parent??ch?.parentId,
    CANAL_NSFW:(ch:any=channel())=>ch?.nsfw===true,
    CANAL_LENTO:(ch:any=channel())=>ch?.rateLimitPerUser??0,
    HILOS_ACTIVOS:async(ch:any=channel())=>{
      const input=await getCh(ch);if(typeof input?.threads?.fetchActive!=='function')throw new Error('HILOS_ACTIVOS: API de hilos no disponible para el canal.');const result=await input.threads.fetchActive();return values(result?.threads);
    },
    HILOS_ARCHIVADOS:async(ch:any=channel(),tipo:any='public')=>{
      if(!['public','private'].includes(String(tipo)))throw new Error('Tipo de hilo no reconocido; admitidos: public, private.');
      const input=await getCh(ch);if(typeof input?.threads?.fetchArchived!=='function')throw new Error('HILOS_ARCHIVADOS: API de hilos no disponible para el canal.');const result=await input.threads.fetchArchived({type:tipo,limit:100});return values(result?.threads);
    },
    ETIQUETAS_FORO:(ch:any=channel())=>Array.isArray(ch?.availableTags)?[...ch.availableTags]:[],
    WEBHOOKS_DE:async(ch:any=channel())=>{
      const input=await getCh(ch);if(typeof input?.fetchWebhooks!=='function')throw new Error('WEBHOOKS_DE: administrador de webhooks no disponible para el canal.');
      return values(await input.fetchWebhooks());
    },
    INVITACION_DE:async(code:any)=>{
      const value=String(code??'').replace(/^https?:\/\/(?:www\.)?(?:discord\.gg\/|discord(?:app)?\.com\/invite\/)/i,'');
      if(!/^[A-Za-z0-9_-]{2,40}$/.test(value))throw new Error('Invitaciones: código con formato no válido.');
      return client().fetchInvite(value);
    },
    RESPONDIENDO:async(ch:any=channel())=>{const input=await getCh(ch);if(typeof input?.sendTyping!=='function')throw new Error('Canal: operación de indicador de escritura no disponible.');await input.sendTyping();return true;},
    // Estado del bot y del servidor; excluye credenciales.
    ESTADO_BOT:()=>clientGetter()?.ws?.status===0?'listo':clientGetter()?.isReady?.()===true?'listo':'desconectado',
    ESTADISTICAS_BOT:()=>{
      const c=client();return {servidores:c.guilds?.cache?.size??0,usuariosCache:c.users?.cache?.size??0,
        canalesCache:c.channels?.cache?.size??0,latencia:c.ws?.ping,tiempoActivo:c.uptime};
    },
    SERVIDORES_BOT:()=>values(client().guilds?.cache).slice(0,100),
    ESTADISTICAS_SERVIDOR:(g:any=guild())=>({id:idOf(g),nombre:g?.name,miembros:g?.memberCount,
      canales:g?.channels?.cache?.size,roles:g?.roles?.cache?.size,boosts:g?.premiumSubscriptionCount,nivelBoost:g?.premiumTier}),
    NIVEL_BOOST:(g:any=guild())=>g?.premiumTier,
    NIVEL_VERIFICACION:(g:any=guild())=>g?.verificationLevel,
    CANAL_SISTEMA:(g:any=guild())=>g?.systemChannel??g?.systemChannelId,
    CANAL_REGLAS:(g:any=guild())=>g?.rulesChannel??g?.rulesChannelId,
    CREADO_SERVIDOR:(g:any=guild())=>new Date(Number((BigInt(idOf(g))>>22n)+1420070400000n)),
    EMOJIS_DE:(g:any=guild())=>values(g?.emojis?.cache),
    STICKERS_DE:(g:any=guild())=>values(g?.stickers?.cache),
    EVENTOS_PROGRAMADOS:async(g:any=guild())=>guildRead(g,'scheduledEvents','fetch'),
    REGLAS_AUTOMOD:async(g:any=guild())=>guildRead(g,'autoModerationRules','fetch'),
    // Las consultas de moderación dependen de los permisos de Discord.
    PUEDE_CAMBIAR_APODO:async(objetivo:any,actor:any=member())=>{
      const g=await getGuild();
      const executor=await getMember(actor,g),victim=await getMember(objetivo,g);
      if(!executor||!victim||victim.id===g.ownerId)return false;
      const bot=await getBotMember(g);
      if(!bot||!has(bot,'ManageNicknames')||victim.manageable!==true)return false;
      if(idOf(executor)===idOf(victim))return true;
      if(!has(executor,'ManageNicknames')&&idOf(executor)!==g.ownerId)return false;
      const highest=(m:any)=>m?.roles?.highest;
      const above=(a:any,b:any)=>{
        const first=highest(a),second=highest(b);
        return first?.comparePositionTo?first.comparePositionTo(second)>0:
          Number.isFinite(first?.position)&&Number.isFinite(second?.position)&&first.position>second.position;
      };
      return idOf(executor)===g.ownerId||above(executor,victim);
    },
    PUEDE_BORRAR_MENSAJE:async(mensaje:any=message(),actor:any=member()??author())=>{
      const msg=await getMessage(mensaje),g=await getGuild(msg?.guild??guild());
      if(!msg||!msg.author||!msg.channel)return false;
      const executor=await getMember(actor,g),bot=await getBotMember(g);
      if(!executor||!bot)return false;
      const permission=(who:any)=>msg.channel.permissionsFor?.(who)?.has?.('ManageMessages')===true;
      const botOwn=msg.author.id===client().user.id;
      if(!botOwn&&!permission(bot))return false;
      return msg.author.id===idOf(executor)||permission(executor);
    },
    PUEDE_EDITAR_CANAL:async(ch:any=channel(),actor:any=member()??author())=>{
      const input=await getCh(ch),g=await getGuild(input?.guild??guild());
      if(!input||input.guildId&&input.guildId!==g.id)return false;
      const executor=await getMember(actor,g),bot=await getBotMember(g);
      if(!executor||!bot)return false;
      const can=(m:any)=>input.permissionsFor?.(m)?.has?.('ManageChannels')===true;
      return can(executor)&&can(bot);
    },
    BANEO_ACTIVO:async(usuario:any,g:any=guild())=>{
      const srv=await getGuild(g);try{return Boolean(await srv.bans.fetch(idOf(usuario)));}
      catch(e:any){if(e?.code===10026||e?.rawError?.code===10026)return false;throw e;}
    },
    DETALLE_BANEO:async(usuario:any,g:any=guild())=>{const srv=await getGuild(g);return srv.bans.fetch(idOf(usuario));},
    // Gestión de respuestas y confirmaciones de interacciones (ACK).
    RESPUESTA_ENVIADA:(i:any=interaction())=>Boolean(i?.replied||i?.deferred),
    ES_INTERACCION:(i:any=interaction())=>Boolean(i&&typeof i==='object'&&typeof i.isRepliable==='function'),
    ID_INTERACCION:(i:any=interaction())=>i?.id,
    OPCIONES_MENU:(i:any=interaction())=>i?.values??[],
    LEER_CAMPO_MODAL:(nombre:any,i:any=interaction())=>i?.fields?.getTextInputValue?.(String(nombre)),
    RESPONDER_INTERACCION:async(contenido:any,i:any=interaction())=>{
      if(!i?.isRepliable?.())throw new Error('Interacción: contexto no disponible o no admite respuesta.');
      if(i.replied||i.deferred)throw new Error('Interacción: respuesta inicial ya enviada o diferida; operación inicial duplicada.');
      const payload=typeof contenido==='string'?{content:contenido}:contenido;
      if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new Error('RESPONDER_INTERACCION: contenido incompatible; esperado texto u objeto de mensaje.');
      return i.reply({...payload,allowedMentions:{parse:[],repliedUser:false}});
    },
    // Creación de tickets con canal privado y verificación de permisos.
    TICKETS_ABIERTOS:async(g:any=guild())=>{
      const srv=await getGuild(g),actor=await getMember(member()??author(),srv);
      const uid=idOf(actor),moderator=canManage(actor,'ManageChannels');
      return values(srv.channels?.cache).filter(ch=>ticketOwner(ch)&&(moderator||ticketOwner(ch)===uid));
    },
    CREAR_TICKET:async(nombre:any='soporte',solicitante:any=author())=>{
      const g=await getGuild();await assertBotCan(g,'ManageChannels');
      const origin=await getMember(member()??author(),g);
      const ownerId=idOf(solicitante);
      if(idOf(origin)!==ownerId&&!canManage(origin,'ManageChannels'))throw new Error('CREAR_TICKET: solicitante distinto del ejecutor; suplantación no autorizada.');
      const text=String(nombre??'soporte').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48);
      if(!text)throw new Error('CREAR_TICKET: identificador de canal no válido.');
      const key=`${idOf(g)}:${ownerId}`;
      const prior=inflightTickets.get(key);if(prior)return prior;
      const creation=(async()=>{
        if(typeof g.channels?.fetch==='function')await g.channels.fetch();
        const existing=values(g.channels?.cache).find(ch=>ticketOwner(ch)===ownerId);
        if(existing)return existing;
        const botId=idOf(client().user);
        return g.channels.create({name:`ticket-${text}-${ownerId.slice(-4)}`.slice(0,100),type:0,topic:`${prefix}${ownerId}`,
          permissionOverwrites:[{id:everyone(g),deny:['ViewChannel']},{id:ownerId,allow:['ViewChannel','SendMessages','ReadMessageHistory']},
            {id:botId,allow:['ViewChannel','ManageChannels','SendMessages','ReadMessageHistory']}]});
      })();
      inflightTickets.set(key,creation);
      try{return await creation;}finally{if(inflightTickets.get(key)===creation)inflightTickets.delete(key);}
    },
    CERRAR_TICKET:async(ch:any=channel())=>{
      const g=await getGuild(),input=await getCh(ch);
      await checkTicketAccess(g,input,member()??author());
      await assertBotCan(g,'ManageChannels');
      if(typeof input.delete!=='function')throw new Error('CERRAR_TICKET: el canal no admite eliminación o cierre.');
      await input.delete('Ticket cerrado desde PseudoDiscord');return true;
    }
  };
  return f;
}
