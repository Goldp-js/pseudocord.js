/** Comprueba una expresión cron de cinco campos sin modificar el reloj del bot. */
export function matchesCronExpression(expr:string,date:Date):boolean {
  const parts=expr.trim().split(/\s+/);
  if(parts.length!==5)return false;
  const values=[date.getMinutes(),date.getHours(),date.getDate(),date.getMonth()+1,date.getDay()];
  return parts.every((part,index)=>cronFieldMatches(part,values[index]!));
}

function cronFieldMatches(field:string,value:number):boolean {
  return field.split(',').some(part=>{
    if(part==='*')return true;
    if(part.startsWith('*/'))return value%Number(part.slice(2))===0;
    const range=part.match(/^(\d+)-(\d+)$/);
    if(range)return value>=Number(range[1])&&value<=Number(range[2]);
    return Number(part)===value;
  });
}
