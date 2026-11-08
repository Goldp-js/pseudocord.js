/** API HTTP integrada para scripts PseudoDiscord.
 * Bloquea destinos internos, valida DNS justo antes de conectar y limita recursos.
 */
import { lookup as dnsLookup } from 'node:dns/promises';
import https from 'node:https';
import { isIP } from 'node:net';
import { timingSafeEqual, createHmac } from 'node:crypto';
import { currentSignal, remainingExecutionMs } from './execution.js';

export interface HttpResponse {
  estado:number;
  correcto:boolean;
  url:string;
  cabeceras:Record<string,string>;
  texto:string;
  json?:any;
}
interface HttpOptions {
  metodo?:string;
  cabeceras?:Record<string,string>;
  cuerpo?:string|object;
  tiempo?:number;
  maxBytes?:number;
  redirecciones?:number;
}
const MAX_BYTES=1024*1024;
const MAX_BODY=256*1024;
const MAX_TIME=10000;
const BLOCKED_HOST=/(^|\.)(?:localhost|local|internal|test|invalid|home|lan)$/i;
const validHeaderName=/^[!#$%&'*+.^_`|~0-9a-z-]+$/i;
function parseUrl(raw:any):URL {
  if(typeof raw!=='string'||raw.length>2048)throw new Error('HTTP: URL ausente o superior a 2048 caracteres.');
  let url:URL;
  try{url=new URL(raw);}catch{throw new Error('HTTP: formato de URL no válido.');}
  if(url.protocol!=='https:'||url.username||url.password||url.hash||!url.hostname||url.port&&url.port!=='443')
    throw new Error('HTTP: destino no autorizado; se requiere HTTPS público sin credenciales, fragmento ni puerto personalizado.');
  if(BLOCKED_HOST.test(url.hostname)||url.hostname.endsWith('.')||url.hostname.includes('%'))
    throw new Error('HTTP: política SSRF: destino local o interno bloqueado.');
  return url;
}
/** Filtrado de direcciones no públicas antes de efectuar solicitudes HTTP. */
export function isPublicAddress(address:string):boolean {
  const addr=address.replace(/^\[|\]$/g,'').toLowerCase();
  if(isIP(addr)===4){
    const a=addr.split('.').map(Number),[p,q,r]=a;
    if(p===0||p===10||p===127||p>=224||p===169&&q===254||p===172&&q>=16&&q<=31||
      p===192&&(q===168||q===0||q===88)||p===100&&q>=64&&q<=127||
      p===198&&(q===18||q===19||q===51&&r===100)||p===203&&q===0&&r===113||p===192&&q===0&&r===2)return false;
    return true;
  }
  if(isIP(addr)!==6)return false;
  // Sólo 2000::/3; excluye direcciones de documentación, transición, Teredo y mapeadas.
  const p=Number.parseInt(addr.split(':')[0]||'0',16);
  if(p<0x2000||p>0x3fff)return false;
  if(addr.startsWith('2001:db8:')||addr.startsWith('2001:db8::')||addr.startsWith('2001:0:')||addr.startsWith('2001::')||addr.startsWith('2002:'))return false;
  return true;
}
const validateNumber=(x:any,name:string,min:number,max:number)=>{
  const n=Number(x);
  if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(`HTTP: opción '${name}' fuera de rango (${min}–${max}).`);
  return n;
};
export function urlParametros(params:any):string {
  if(!params||typeof params!=='object'||Array.isArray(params))throw new Error('URL_PARAMETROS: esperado objeto de parámetros.');
  const entries=Object.entries(params);
  if(entries.length>100)throw new Error('URL_PARAMETROS: cantidad máxima excedida (100 parámetros).');
  const result=new URLSearchParams();
  for(const [k,v] of entries){
    if(Array.isArray(v)){for(const item of v)if(item!==null&&item!==undefined)result.append(k,String(item));}
    else if(v!==null&&v!==undefined)result.append(k,String(v));
  }
  const out=result.toString();if(out.length>8192)throw new Error('URL_PARAMETROS: resultado superior a 8192 caracteres.');return out;
}
export function jsonCamino(value:any,path:any,fallback?:any):any {
  const keys=String(path).split('.');
  if(keys.length>32||keys.some(k=>!k||k==='__proto__'||k==='constructor'||k==='prototype'))throw new Error('JSON_CAMINO: ruta no válida (máximo 32 segmentos; sin claves reservadas).');
  let node=value;
  for(const k of keys){
    if(node===null||node===undefined||!Object.prototype.hasOwnProperty.call(Object(node),k))return fallback;
    node=node[k];
  }
  return node;
}
export function verificarFirma(secret:any,payload:any,firma:any,algoritmo='sha256'):boolean {
  if(typeof secret!=='string'||!secret||typeof payload!=='string'||typeof firma!=='string')return false;
  if(!['sha256','sha512'].includes(algoritmo))throw new Error('VERIFICAR_FIRMA: algoritmo no admitido; valores válidos: sha256, sha512.');
  const expected=createHmac(algoritmo,secret).update(payload,'utf8').digest('hex');
  const given=firma.replace(new RegExp(`^${algoritmo}=`,'i'),'').toLowerCase();
  if(!/^[0-9a-f]+$/.test(given)||given.length!==expected.length)return false;
  return timingSafeEqual(Buffer.from(expected,'hex'),Buffer.from(given,'hex'));
}
interface HttpDependencies {
  lookup?:typeof dnsLookup;
  request?:typeof https.request;
}
export async function solicitarHttp(raw:any,settings:HttpOptions={},deps:HttpDependencies={}):Promise<HttpResponse>{
  const url=parseUrl(raw);
  if(!settings||typeof settings!=='object'||Array.isArray(settings))throw new Error('HTTP: opciones incompatibles; esperado objeto no nulo.');
  const method=String(settings.metodo??'GET').toUpperCase();
  if(!['GET','POST','PUT','PATCH','DELETE','HEAD'].includes(method))throw new Error('HTTP: método no admitido; permitidos: GET, POST, PUT, PATCH, DELETE, HEAD.');
  const timeout=validateNumber(settings.tiempo??MAX_TIME,'tiempo (ms)',100,30000);
  const maxBytes=validateNumber(settings.maxBytes??MAX_BYTES,'maxBytes',1,MAX_BYTES);
  const redirects=validateNumber(settings.redirecciones??0,'redirecciones',0,3);
  if(redirects>0&&!['GET','HEAD'].includes(method))throw new Error('HTTP: redirecciones no admitidas para métodos distintos de GET o HEAD.');
  const budget=remainingExecutionMs();
  if(budget<=150)throw new Error('HTTP: presupuesto de ejecución inferior al mínimo de 150 ms.');
  const deadline=Date.now()+Math.min(timeout,Number.isFinite(budget)?budget-50:timeout);
  const signal=currentSignal();
  if(signal?.aborted)throw new Error('HTTP: petición cancelada por señal de ejecución.');
  const headers:Record<string,string>={accept:'application/json, text/plain, */*','accept-encoding':'identity'};
  if(settings.cabeceras!==undefined&&(typeof settings.cabeceras!=='object'||Array.isArray(settings.cabeceras)||!settings.cabeceras))throw new Error('HTTP: cabeceras incompatibles; esperado objeto.');
  if(Object.keys(settings.cabeceras??{}).length>32)throw new Error('HTTP: límite excedido (32 cabeceras).');
  for(const [k,v] of Object.entries(settings.cabeceras??{})){
    if(!validHeaderName.test(k)||k.length>100||typeof v!=='string'||v.length>4096||/[\r\n]/.test(v))throw new Error('HTTP: cabecera no válida (nombre, longitud, tipo o caracteres de control).');
    if(['host','connection','proxy-authorization','transfer-encoding','content-length','upgrade','cookie'].includes(k.toLowerCase()))throw new Error(`HTTP: escritura de cabecera reservada bloqueada ('${k}').`);
    headers[k.toLowerCase()]=v;
  }
  let body:Buffer|undefined;
  if(settings.cuerpo!==undefined){
    const content=typeof settings.cuerpo==='string'?settings.cuerpo:JSON.stringify(settings.cuerpo);
    if(typeof content!=='string')throw new Error('HTTP: cuerpo incompatible; esperado texto o JSON serializable.');
    body=Buffer.from(content,'utf8');
    if(body.length>MAX_BODY)throw new Error('HTTP: cuerpo de petición superior al máximo de 256 KiB.');
    if(typeof settings.cuerpo!=='string'&&!headers['content-type'])headers['content-type']='application/json';
    headers['content-length']=String(body.length);
  }
  const resolve=deps.lookup??dnsLookup;
  const request=deps.request??https.request;
  const once=async(target:URL,requestMethod:string,data?:Buffer):Promise<HttpResponse>=>{
    const hostname=target.hostname.replace(/^\[|\]$/g,'');
    const addresses=isIP(hostname)?[{address:hostname,family:isIP(hostname)}]:await new Promise<{address:string;family:number}[]>((accept,reject)=>{
      const remaining=deadline-Date.now();
      if(remaining<=0){reject(new Error('HTTP: agotado el plazo de resolución DNS.'));return;}
      const timer=setTimeout(()=>{cleanup();reject(new Error('HTTP: agotado el plazo de resolución DNS.'));},remaining);
      timer.unref?.();
      const cancel=()=>{cleanup();reject(new Error('HTTP: resolución DNS cancelada.'));};
      const cleanup=()=>{clearTimeout(timer);signal?.removeEventListener('abort',cancel);};
      signal?.addEventListener('abort',cancel,{once:true});
      Promise.resolve(resolve(hostname,{all:true,verbatim:true})).then(x=>{cleanup();accept(x);},e=>{cleanup();reject(e);});
    });
    if(!addresses.length||addresses.some(v=>!isPublicAddress(v.address)))throw new Error('HTTP: política SSRF: IP privada/reservada o resolución DNS inconsistente.');
    const selected=addresses[0];
    return await new Promise<HttpResponse>((accept,reject)=>{
      let settled=false;let req:any;let absolute:ReturnType<typeof setTimeout>|undefined;
      const cancel=()=>req?.destroy(new Error('HTTP: petición cancelada por señal de ejecución.'));
      const finish=(error?:Error,result?:HttpResponse)=>{
        if(settled)return;settled=true;if(absolute)clearTimeout(absolute);signal?.removeEventListener('abort',cancel);
        if(error)reject(error);else accept(result!);
      };
      const remaining=deadline-Date.now();
      if(remaining<=0){finish(new Error('HTTP: tiempo de espera de la petición agotado.'));return;}
      const opts:any={protocol:'https:',hostname,port:443,path:target.pathname+target.search,method:requestMethod,
        headers:{...headers,...(data?{'content-length':String(data.length)}:{})},
        lookup:(_hostname:string,_options:any,cb:any)=>cb(null,selected.address,selected.family),agent:false};
      if(!data)delete opts.headers['content-length'];
      req=request(opts,(res:any)=>{
        const chunks:Buffer[]=[];let size=0;
        const encoding=String(res.headers['content-encoding']??'identity').toLowerCase();
        if(encoding!=='identity'){req.destroy(new Error('HTTP: respuesta comprimida sin negociación de compresión.'));return;}
        res.on('data',(piece:Buffer)=>{
          const buf=Buffer.isBuffer(piece)?piece:Buffer.from(piece);
          size+=buf.length;
          if(size>maxBytes){req.destroy(new Error('HTTP: respuesta superior al tamaño máximo configurado.'));return;}
          chunks.push(buf);
        });
        res.on('error',(e:Error)=>finish(e));
        res.on('end',()=>{
          const text=Buffer.concat(chunks).toString('utf8');
          const responseHeaders:Record<string,string>={};
          for(const [k,v] of Object.entries(res.headers))if(typeof v==='string')responseHeaders[k]=v;
          const response:HttpResponse={estado:res.statusCode??0,correcto:(res.statusCode??0)>=200&&(res.statusCode??0)<300,url:target.toString(),cabeceras:responseHeaders,texto:text};
          if(/\bjson\b|\+json/i.test(responseHeaders['content-type']??'')){try{response.json=JSON.parse(text);}catch{finish(new Error('HTTP: cuerpo incompatible con el tipo de contenido JSON declarado.'));return;}}
          finish(undefined,response);
        });
      });
      absolute=setTimeout(()=>req.destroy(new Error('HTTP: plazo máximo de ejecución agotado.')),Math.max(1,remaining));
      absolute.unref?.();
      req.on('error',(e:Error)=>finish(e));
      req.setTimeout(Math.max(1,remaining),()=>req.destroy(new Error('HTTP: tiempo de espera de la petición agotado.')));
      signal?.addEventListener('abort',cancel,{once:true});
      if(signal?.aborted){cancel();return;}
      req.end(data);
    });
  };
  let current=url;let currentMethod=method;let currentBody=body;
  for(let i=0;i<=redirects;i++){
    const result=await once(current,currentMethod,currentBody);
    if(![301,302,303,307,308].includes(result.estado)||!result.cabeceras.location)return result;
    if(i===redirects)throw new Error('HTTP: redirección no autorizada o límite de redirecciones alcanzado.');
    current=parseUrl(new URL(result.cabeceras.location,current).toString());
    if(result.estado===303){currentMethod='GET';currentBody=undefined;}
  }
  throw new Error('HTTP: límite de redirecciones excedido.');
}
export function createHttpHelpers():Record<string,(...args:any[])=>any>{
  return {
    HTTP_SOLICITAR:(url:any,opciones?:HttpOptions)=>solicitarHttp(url,opciones),
    HTTP_JSON:async(url:any,opciones?:HttpOptions)=>{
      const result=await solicitarHttp(url,opciones);
      if(!result.correcto)throw new Error(`HTTP_JSON: respuesta HTTP no satisfactoria (estado ${result.estado}).`);
      if(result.json!==undefined)return result.json;
      try{return JSON.parse(result.texto);}catch{throw new Error('HTTP_JSON: error de análisis sintáctico del cuerpo JSON.');}
    },
    HTTP_ESTADO:(r:HttpResponse)=>r?.estado,
    HTTP_CABECERA:(r:HttpResponse,k:any)=>{const name=String(k).toLowerCase();return r?.cabeceras&&Object.prototype.hasOwnProperty.call(r.cabeceras,name)?r.cabeceras[name]:undefined;},
    VALIDAR_URL:(url:any)=>{try{parseUrl(url);return true;}catch{return false;}},
    URL_PARAMETROS:urlParametros,
    JSON_CAMINO:jsonCamino,
    CODIFICAR_HTML:(value:any)=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'} as Record<string,string>)[c]),
    VERIFICAR_FIRMA:verificarFirma
  };
}
