/** Subconjunto explícito de rangos SemVer: exactos, ^, ~, comparadores y ||.
 * No admite comodines parciales, hífen ni rangos npm complejos. */
interface Version { major:number; minor:number; patch:number; pre:string[] }
function parse(value:string):Version {
  const m=/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(value);
  if(!m)throw new Error(`Versión SemVer no válida: '${value}'.`);
  const v={major:Number(m[1]),minor:Number(m[2]),patch:Number(m[3]),pre:m[4]?.split('.')??[]};
  if(![v.major,v.minor,v.patch].every(Number.isSafeInteger))throw new Error(`Versión fuera del rango seguro: '${value}'.`);
  if(v.pre.some(s=>!s||/^\d+$/.test(s)&&s.length>1&&s.startsWith('0')))throw new Error(`Versión preliminar no válida: '${value}'.`);
  return v;
}
function cmp(a:Version,b:Version):number {
  for(const k of ['major','minor','patch'] as const)if(a[k]!==b[k])return Math.sign(a[k]-b[k]);
  if(!a.pre.length&&!b.pre.length)return 0;
  if(!a.pre.length)return 1;if(!b.pre.length)return -1;
  for(let i=0;i<Math.max(a.pre.length,b.pre.length);i++){
    const x=a.pre[i],y=b.pre[i];if(x===undefined)return -1;if(y===undefined)return 1;
    const nx=/^\d+$/.test(x),ny=/^\d+$/.test(y);
    if(nx&&ny){const a=BigInt(x),b=BigInt(y);if(a!==b)return a>b?1:-1;}
    else if(nx!==ny)return nx?-1:1;
    else if(x!==y)return x<y?-1:1;
  }
  return 0;
}
export function satisfiesVersion(version:string,range:string):boolean {
  const actual=parse(version);
  return range.split('||').some(group=>{
    const parts=group.trim().split(/\s+/).filter(Boolean);
    if(!parts.length)throw new Error('Rango SemVer vacío.');
    const prerelease=actual.pre.length>0;
    let explicitlyAllowsPre=false;
    const valid=parts.every(part=>{
      if(part==='*')return true;
      const m=/^(\^|~|>=|<=|>|<|=)?(.+)$/.exec(part)!;
      const op=m[1]??'=',reference=parse(m[2]!);
      if(reference.pre.length&&reference.major===actual.major&&reference.minor===actual.minor&&reference.patch===actual.patch)explicitlyAllowsPre=true;
      const c=cmp(actual,reference);
      if(op==='^'){
        const max={major:reference.major,minor:reference.minor,patch:reference.patch};
        if(reference.major>0){max.major++;max.minor=0;max.patch=0;}
        else if(reference.minor>0){max.minor++;max.patch=0;}
        else max.patch++;
        return c>=0&&cmp(actual,{...max,pre:[]})<0;
      }
      if(op==='~')return c>=0&&cmp(actual,{major:reference.major,minor:reference.minor+1,patch:0,pre:[]})<0;
      if(op==='>=')return c>=0;if(op==='<=')return c<=0;
      if(op==='>')return c>0;if(op==='<')return c<0;
      return c===0;
    });
    return valid&&(!prerelease||explicitlyAllowsPre);
  });
}
