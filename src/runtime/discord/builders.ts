import { parseColor, stripPd } from './payload.js';

export interface BuilderEntry { key:string; args:any[]; flags:string[]; }

/** Construye los componentes de Discord a partir de propiedades ya evaluadas. */
export async function constructDiscordBuilder(s:any,entries:BuilderEntry[],discord:any):Promise<any>{
    const D:any=discord;
    const getFirstBuilderArgument=(key:string)=>entries.find(e=>e.key===key)?.args?.[0];
    const findBuilderEntries=(key:string)=>entries.filter(e=>e.key===key);
    const hasBuilderEntryOrFlag=(key:string)=>entries.some(e=>e.key===key)||entries.some(e=>e.flags.includes(key));
    if(s.builderKind==='generic'){
      const C:any=D[String(s.subtype)];if(typeof C!=='function')throw new Error(`API Discord: constructor 'discord.${s.subtype}' no disponible.`);const ctor=entries.find(e=>e.key==='CONSTRUCTOR')?.args??[];const b:any=Reflect.construct(C,ctor);
      for(const e of entries){if(e.key==='CONSTRUCTOR')continue;if(e.key==='LLAMAR'){const [method,...args]=e.args;const fn=b?.[String(method)];if(typeof fn!=='function')throw new Error(`API Discord: método '${s.subtype}.${String(method)}' no disponible.`);await fn.apply(b,args);}else if(e.key==='PROPIEDAD'){b[String(e.args[0])]=e.args[1];}}
      return b;
    }
    if(s.builderKind==='embed'){
      const b=new D.EmbedBuilder();
      for(const e of entries){const a=e.args;switch(e.key){case'TITULO':b.setTitle(String(a[0]??''));break;case'DESCRIPCION':b.setDescription(String(a[0]??''));break;case'URL':b.setURL(String(a[0]));break;case'COLOR':b.setColor(parseColor(a[0]));break;case'IMAGEN':b.setImage(String(a[0]));break;case'MINIATURA':b.setThumbnail(String(a[0]));break;case'FECHA':b.setTimestamp(a[0]===undefined?new Date():new Date(a[0]));break;case'AUTOR':b.setAuthor({name:String(a[0]??''),iconURL:a[1]?String(a[1]):undefined,url:a[2]?String(a[2]):undefined});break;case'PIE':b.setFooter({text:String(a[0]??''),iconURL:a[1]?String(a[1]):undefined});break;case'CAMPO':b.addFields({name:String(a[0]??''),value:String(a[1]??''),inline:e.flags.includes('EN_LINEA')||Boolean(a[2])});break;}}
      return b;
    }
    if(s.builderKind==='button'){
      const b=new D.ButtonBuilder();const styleMap:any={primario:D.ButtonStyle.Primary,secundario:D.ButtonStyle.Secondary,exito:D.ButtonStyle.Success,peligro:D.ButtonStyle.Danger,enlace:D.ButtonStyle.Link,premium:D.ButtonStyle.Premium};
      for(const e of entries){const a=e.args;switch(e.key){case'TEXTO':case'ETIQUETA':b.setLabel(String(a[0]));break;case'ID':b.setCustomId(String(a[0]));break;case'ESTILO':b.setStyle(styleMap[String(a[0]).toLowerCase()]??a[0]);break;case'EMOJI':b.setEmoji(a[0]);break;case'URL':b.setURL(String(a[0]));break;case'SKU':case'SKU_ID':b.setSKUId(String(a[0]));break;case'DESHABILITADO':b.setDisabled(a[0]===undefined?true:Boolean(a[0]));break;}}
      return b;
    }
    if(s.builderKind==='select'){
      const k=String(s.subtype??'texto').toLowerCase();const C=k==='usuario'?D.UserSelectMenuBuilder:k==='rol'?D.RoleSelectMenuBuilder:k==='mencionable'?D.MentionableSelectMenuBuilder:k==='canal'?D.ChannelSelectMenuBuilder:D.StringSelectMenuBuilder;const b=new C();
      for(const e of entries){const a=e.args;switch(e.key){case'ID':b.setCustomId(String(a[0]));break;case'PLACEHOLDER':case'MARCADOR':b.setPlaceholder(String(a[0]));break;case'MINIMO':b.setMinValues(Number(a[0]));break;case'MAXIMO':b.setMaxValues(Number(a[0]));break;case'DESHABILITADO':b.setDisabled(a[0]===undefined?true:Boolean(a[0]));break;case'OPCION':if(k==='texto')b.addOptions({label:String(a[0]),value:String(a[1]),description:a[2]===undefined?undefined:String(a[2]),emoji:a[3],default:e.flags.includes('PREDETERMINADO')||Boolean(a[4])});break;case'TIPO_CANAL':case'CANALES':if(k==='canal')b.setChannelTypes(...a);break;}}
      return b;
    }
    if(s.builderKind==='textInput'){
      const b=new D.TextInputBuilder();const styles:any={corto:D.TextInputStyle.Short,parrafo:D.TextInputStyle.Paragraph};
      for(const e of entries){const a=e.args;switch(e.key){case'ID':b.setCustomId(String(a[0]));break;case'ETIQUETA':case'TEXTO':b.setLabel(String(a[0]));break;case'ESTILO':b.setStyle(styles[String(a[0]).toLowerCase()]??a[0]);break;case'PLACEHOLDER':b.setPlaceholder(String(a[0]));break;case'VALOR':b.setValue(String(a[0]));break;case'REQUERIDO':b.setRequired(a[0]===undefined?true:Boolean(a[0]));break;case'MINIMO':b.setMinLength(Number(a[0]));break;case'MAXIMO':b.setMaxLength(Number(a[0]));break;}}
      return b;
    }
    if(s.builderKind==='row'){
      const b=new D.ActionRowBuilder();for(const e of entries)if(e.key==='COMPONENTE'||e.key==='AGREGAR')b.addComponents(...e.args);return b;
    }
    if(s.builderKind==='modal'){
      const b=new D.ModalBuilder();for(const e of entries){if(e.key==='ID')b.setCustomId(String(e.args[0]));else if(e.key==='TITULO')b.setTitle(String(e.args[0]));else if(e.key==='CAMPO'||e.key==='COMPONENTE'){for(const c of e.args){if(c?.data?.type===D.ComponentType?.ActionRow)b.addComponents(c);else b.addComponents(new D.ActionRowBuilder().addComponents(c));}}}return b;
    }
    if(s.builderKind==='attachment'||s.builderKind==='image'){
      const source=getFirstBuilderArgument('ORIGEN')??getFirstBuilderArgument('RUTA')??getFirstBuilderArgument('DATOS');if(source===undefined)throw new Error(`Constructor ${s.builderKind.toUpperCase()}: campo ORIGEN requerido.`);const opts:any={};const n=getFirstBuilderArgument('NOMBRE');if(n!==undefined)opts.name=String(n);const d=getFirstBuilderArgument('DESCRIPCION');if(d!==undefined)opts.description=String(d);const b=new D.AttachmentBuilder(source,opts);if(hasBuilderEntryOrFlag('SPOILER'))b.setSpoiler(true);return b;
    }
    if(s.builderKind==='poll'){
      const answers=findBuilderEntries('OPCION').map(e=>({text:String(e.args[0]),emoji:e.args[1]}));return {__pdKind:'poll',question:{text:String(getFirstBuilderArgument('PREGUNTA')??'Encuesta')},answers,duration:Number(getFirstBuilderArgument('DURACION')??24),allowMultiselect:hasBuilderEntryOrFlag('MULTIPLE')||Boolean(getFirstBuilderArgument('MULTIPLE')),layoutType:getFirstBuilderArgument('DISENO')??getFirstBuilderArgument('DISEÑO')};
    }
    if(s.builderKind==='message'){
      const out:any={__pdKind:'message'};const content=getFirstBuilderArgument('CONTENIDO');if(content!==undefined)out.content=String(content);const embeds=findBuilderEntries('EMBED').flatMap(e=>e.args);if(embeds.length)out.embeds=embeds;const comps=findBuilderEntries('COMPONENTE').concat(findBuilderEntries('FILA')).flatMap(e=>e.args);if(comps.length)out.components=comps;const files=findBuilderEntries('ARCHIVO').concat(findBuilderEntries('IMAGEN')).flatMap(e=>e.args);if(files.length)out.files=files;const poll=getFirstBuilderArgument('ENCUESTA');if(poll)out.poll=poll.__pdKind==='poll'?stripPd(poll):poll;const mentions=getFirstBuilderArgument('MENCIONES');if(mentions)out.allowedMentions=mentions;if(hasBuilderEntryOrFlag('EFIMERO'))out.ephemeral=true;if(hasBuilderEntryOrFlag('TTS'))out.tts=true;if(hasBuilderEntryOrFlag('SUPRIMIR_EMBEDS')&&D.MessageFlags)out.flags=D.MessageFlags.SuppressEmbeds;return out;
    }
    throw new Error(`Constructor de Discord no implementado: '${s.builderKind}'.`);
}
