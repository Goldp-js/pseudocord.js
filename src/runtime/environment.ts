import type { TypeNode } from '../ast/types.js';
import { normalizeIdentifier } from '../language/identifiers.js';

interface Binding { value:any; constant:boolean; type?:TypeNode; target?:Binding; displayName?:string; }

export class Environment {
  private readonly values=new Map<string,Binding>();
  constructor(public readonly parent?:Environment){}
  private key(name:string){return normalizeIdentifier(name);}
  define(name:string,value:any,constant=false,type?:TypeNode):void{const k=this.key(name); if(this.values.has(k)) throw new Error(`Ámbito léxico: declaración duplicada de '${name}'.`); this.values.set(k,{value,constant,type,displayName:name});}
  hasLocal(name:string):boolean{return this.values.has(this.key(name));}
  has(name:string):boolean{return this.hasLocal(name)||!!this.parent?.has(name);}
  private root(b:Binding):Binding {while(b.target)b=b.target;return b;}
  defineReference(name:string,source:Environment,sourceName:string,type?:TypeNode):void {
    const original=source.getBinding(sourceName);
    if(this.root(original).constant)throw new Error(`POR REFERENCIA: '${sourceName}' no es una variable asignable.`);
    const k=this.key(name);if(this.values.has(k))throw new Error(`Función: parámetro duplicado '${name}'.`);
    this.values.set(k,{value:undefined,constant:false,type,target:original,displayName:name});
  }
  get(name:string):any{return this.root(this.getBinding(name)).value;}
  getType(name:string):TypeNode|undefined{const k=this.key(name);const v=this.values.get(k);if(v)return v.type??(v.target?this.root(v.target).type:undefined);return this.parent?.getType(name);}
  private visibleNames():string[]{
    return [...this.values.values()].map(v=>v.displayName??'').concat(this.parent?.visibleNames()??[]);
  }
  private static distance(a:string,b:string):number{
    const prev=Array.from({length:b.length+1},(_,j)=>j);
    for(let i=1;i<=a.length;i++){
      let northwest=prev[0]!;prev[0]=i;
      for(let j=1;j<=b.length;j++){
        const above=prev[j]!;
        prev[j]=Math.min(prev[j]!+1,prev[j-1]!+1,northwest+(a[i-1]===b[j-1]?0:1));
        northwest=above;
      }
    }
    return prev[b.length]!;
  }
  getBinding(name:string):Binding{
    const k=this.key(name);const v=this.values.get(k);if(v)return v;
    if(this.parent?.has(name))return this.parent.getBinding(name);
    const candidates=this.visibleNames().filter(Boolean).map(x=>({name:x,d:Environment.distance(k,this.key(x))})).sort((a,b)=>a.d-b.d);
    const best=candidates[0];
    const hint=best&&best.d<=Math.max(2,Math.floor(k.length/3))?` Coincidencia próxima: '${name===name.toUpperCase()?best.name.toUpperCase():best.name}'.`:'';
    throw new Error(`Identificador no resuelto: '${name}'.${hint}`);
  }
  set(name:string,value:any):void{const k=this.key(name); const v=this.values.get(k); if(v){const root=this.root(v);if(root.constant)throw new Error(`Asignación a constante: '${name}'.`);root.value=value;return;} if(this.parent?.has(name)){this.parent.set(name,value);return;} throw new Error(`Identificador no resuelto: '${name}'.`);}
  setInitial(name:string,value:any):void{const k=this.key(name);const v=this.values.get(k);if(!v)throw new Error(`Identificador no resuelto: '${name}'.`);v.value=value;}
  entries():[string,any][]{return [...this.values.entries()].map(([k,v])=>[k,this.root(v).value]);}
}
