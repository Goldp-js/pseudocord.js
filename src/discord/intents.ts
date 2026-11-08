import type { Program, DiscordEventDeclaration, DiscordCommandDeclaration } from '../ast/declarations.js';

export function inferIntentNames(program:Program):string[]{
  const out=new Set<string>(['Guilds']);
  for(const d of program.body){
    if(d.kind==='DiscordCommandDeclaration'){
      const c=d as DiscordCommandDeclaration;out.add('Guilds');
      if(c.commandKind==='message-prefix'){out.add('GuildMessages');out.add('DirectMessages');out.add('MessageContent');}
      continue;
    }
    if(d.kind==='DiscordContextCommandDeclaration'||d.kind==='DiscordComponentHandlerDeclaration'){out.add('Guilds');continue;}
    if(d.kind!=='DiscordEventDeclaration')continue;
    const e=(d as DiscordEventDeclaration).event;
    if(/^message(Create|Delete|Update)$/.test(e)){out.add('GuildMessages');out.add('DirectMessages');if(e==='messageCreate'||e==='messageUpdate')out.add('MessageContent');}
    if(/^guildMember/.test(e)){out.add('GuildMembers');}
    if(/^guildBan/.test(e)){out.add('GuildModeration');}
    if(/^messageReaction/.test(e)){out.add('GuildMessageReactions');out.add('DirectMessageReactions');}
    if(e==='voiceStateUpdate')out.add('GuildVoiceStates');
    if(e==='presenceUpdate')out.add('GuildPresences');
    if(/^guildScheduledEvent/.test(e))out.add('GuildScheduledEvents');
    if(/^autoModeration/.test(e)){out.add('AutoModerationConfiguration');out.add('AutoModerationExecution');}
    if(/^thread/.test(e)||/^channel/.test(e)||/^role/.test(e)||/^emoji/.test(e)||/^sticker/.test(e)||/^invite/.test(e)||/^guildSoundboard/.test(e))out.add('Guilds');
    if(/^typing/.test(e)){out.add('GuildMessageTyping');out.add('DirectMessageTyping');}
  }
  return [...out];
}
