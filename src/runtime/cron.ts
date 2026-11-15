/** Five-field cron with ranges, lists and steps, Sunday 0/7, DOM/DOW OR semantics. */
interface CronField { values:ReadonlySet<number>; wildcard:boolean }
const LIMITS:readonly [number,number][]=[[0,59],[0,23],[1,31],[1,12],[0,7]];
function parseField(source:string,min:number,max:number,dayOfWeek=false):CronField {
  const values=new Set<number>();
  const wildcard=source==='*';
  for(const entry of source.split(',')){
    const m=/^(\*|\d+|\d+-\d+)(?:\/(\d+))?$/.exec(entry);
    if(!m)throw new Error(`Cron: campo inválido '${source}'.`);
    const step=m[2]===undefined?1:Number(m[2]);
    if(!Number.isSafeInteger(step)||step<1)throw new Error(`Cron: paso inválido '${source}'.`);
    let start:number,end:number;
    if(m[1]==='*'){start=min;end=max;}
    else if(m[1]!.includes('-')){const parts=m[1]!.split('-').map(Number);start=parts[0]!;end=parts[1]!;}
    else{start=Number(m[1]);end=m[2]===undefined?start:max;}
    if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<min||end>max||start>end)
      throw new Error(`Cron: intervalo inválido '${source}'.`);
    for(let value=start;value<=end;value+=step)values.add(dayOfWeek&&value===7?0:value);
  }
  return {values,wildcard};
}
export function validateCronExpression(expr:string):void {
  if(typeof expr!=='string')throw new Error('Cron: expresión de texto requerida.');
  const parts=expr.trim().split(/\s+/);
  if(parts.length!==5)throw new Error('Cron: se esperan cinco campos.');
  parts.forEach((part,index)=>parseField(part,...LIMITS[index]!,index===4));
}
export function matchesCronExpression(expr:string,date:Date,timeZone?:string):boolean {
  try {
    const parts=expr.trim().split(/\s+/);
    if(parts.length!==5||!Number.isFinite(date.getTime()))return false;
    const fields=parts.map((part,index)=>parseField(part,...LIMITS[index]!,index===4));
    let minute=date.getMinutes(),hour=date.getHours(),day=date.getDate(),month=date.getMonth()+1,weekday=date.getDay();
    if(timeZone){
      const values=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone,minute:'2-digit',hour:'2-digit',day:'2-digit',month:'2-digit',weekday:'short',hourCycle:'h23'}).formatToParts(date).map(x=>[x.type,x.value]));
      minute=Number(values.minute);hour=Number(values.hour);day=Number(values.day);month=Number(values.month);
      weekday=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(values.weekday);
    }
    const dom=fields[2]!.values.has(day),dow=fields[4]!.values.has(weekday);
    const dayMatches=fields[2]!.wildcard||fields[4]!.wildcard?dom&&dow:dom||dow;
    return fields[0]!.values.has(minute)&&fields[1]!.values.has(hour)&&dayMatches&&fields[3]!.values.has(month);
  }catch{return false;}
}
