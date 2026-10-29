(function(){
'use strict';
const cfg=window.CBCLASES_CONFIG||{};
let timer=null, email='', token='';
const enc=encodeURIComponent;
function session(){
 try{
  const ref=new URL(cfg.supabaseUrl).hostname.split('.')[0];
  const raw=JSON.parse(localStorage.getItem('sb-'+ref+'-auth-token')||'null');
  const s=raw?.currentSession||raw?.session||raw;
  if(!s?.access_token)return null;
  const p=JSON.parse(atob(s.access_token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
  return {email:String(p.email||'').toLowerCase(),token:s.access_token};
 }catch(_){return null}
}
async function request(path,opts={}){
 const r=await fetch(cfg.supabaseUrl+'/rest/v1/'+path,{...opts,headers:{apikey:cfg.supabaseAnonKey,Authorization:'Bearer '+token,...opts.headers}});
 if(!r.ok)throw Error('Notification HTTP '+r.status);
 return r.status===204?null:r.json();
}
function render(items){
 let root=document.getElementById('solved-notifications');
 if(!root){root=document.createElement('aside');root.id='solved-notifications';root.style.cssText='position:fixed;right:16px;bottom:16px;z-index:9999;font:600 14px Nunito,system-ui,sans-serif';document.body.appendChild(root)}
 const unread=items.filter(n=>!n.read_at);
 root.innerHTML='<button type="button" id="solved-notifications-toggle" style="background:#15579d;color:white;border:0;border-radius:24px;padding:11px 15px;box-shadow:0 3px 14px #0003;cursor:pointer">Notificaciones'+(unread.length?' ('+unread.length+')':'')+'</button><section id="solved-notifications-list" hidden style="margin-top:8px;max-width:min(340px,90vw);max-height:50vh;overflow:auto;background:white;color:#18324a;border:1px solid #ccd9e6;border-radius:14px;padding:12px;box-shadow:0 5px 25px #0003"></section>';
 const panel=root.querySelector('section');
 panel.textContent=items.length?'':'No tenés notificaciones.';
 items.forEach(n=>{
  const el=document.createElement('div');el.style.cssText='padding:10px;border-bottom:1px solid #e5edf3;line-height:1.5';
  const p=document.createElement('p');p.textContent=n.message;el.appendChild(p);
  if(!n.read_at){const b=document.createElement('button');b.textContent='Marcar como leída';b.style.cssText='border:0;background:#e5f1fc;padding:6px 9px;border-radius:8px;cursor:pointer';b.onclick=async()=>{try{await request('student_notifications?id=eq.'+enc(n.id),{method:'PATCH',headers:{'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({read_at:new Date().toISOString()})});await refresh()}catch(e){console.warn(e)}};el.appendChild(b)}
  panel.appendChild(el);
 });
 root.querySelector('button').onclick=()=>{panel.hidden=!panel.hidden};
}
async function refresh(){
 const s=session();
 if(!s?.email){document.getElementById('solved-notifications')?.remove();return}
 email=s.email;token=s.token;
 try{const rows=await request('student_notifications?select=id,message,read_at,created_at&email=eq.'+enc(email)+'&order=created_at.desc&limit=30');render(rows||[])}
 catch(e){console.warn('Notificaciones no disponibles',e)}
}
document.addEventListener('et27-access-ready',refresh);
document.addEventListener('et27-access-changed',refresh);
window.addEventListener('focus',refresh);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh);else refresh();
timer=setInterval(()=>{if(!document.hidden)refresh()},60000);
})();