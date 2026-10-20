/*
 * 27xSOLved · pantalla de arranque.
 * El solcito amarillo se llena como un balón de laboratorio mientras busca si hay una versión nueva.
 * Si la hay, la instala (app.js recarga sola al activarse); si no, entra a la app.
 * Se muestra una vez por apertura de la app (no en cada cambio de página).
 */
(()=>{
  'use strict';
  const MIN_VISIBLE_MS=2200;     // el solcito se ve al menos este tiempo
  const CHECK_TIMEOUT_MS=5000;   // máximo para preguntar si hay versión nueva
  const INSTALL_TIMEOUT_MS=25000;// máximo para bajar la versión nueva
  const BOOTED_KEY='27xsolved-booted';
  const GUARD_KEY='27xsolved-boot-reloads';
  const started=Date.now();
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const withTimeout=(p,ms)=>Promise.race([p,sleep(ms).then(()=>'timeout')]);
  const splash=()=>document.getElementById('xBootSplash');

  let booted=false;
  try{booted=sessionStorage.getItem(BOOTED_KEY)==='1'}catch(_){}
  if(booted){splash()?.remove();return}
  document.documentElement.classList.add('x-booting');

  function setText(t){const n=splash()?.querySelector('[data-boot-text]');if(n)n.textContent=t}
  function mayReload(){
    try{
      const now=Date.now(),recent=JSON.parse(sessionStorage.getItem(GUARD_KEY)||'[]').filter(at=>now-at<60000);
      if(recent.length>=2)return false;
      recent.push(now);sessionStorage.setItem(GUARD_KEY,JSON.stringify(recent));return true;
    }catch(_){return true}
  }
  async function checkForUpdate(){
    if(!('serviceWorker' in navigator)||!location.protocol.startsWith('http')||!navigator.onLine)return'skip';
    const reg=await withTimeout(navigator.serviceWorker.getRegistration('./').catch(()=>null),1500);
    if(!reg||reg==='timeout'||!navigator.serviceWorker.controller)return'skip'; // primera visita: nada que actualizar
    if(!reg.installing&&!reg.waiting){
      const r=await withTimeout(reg.update().catch(()=>null),CHECK_TIMEOUT_MS);
      if(r==='timeout')return'timeout';
    }
    const worker=reg.installing||reg.waiting;
    if(!worker)return'current';
    if(!mayReload())return'guard';
    setText('Actualizando…');
    splash()?.classList.add('is-updating');
    // sw.js hace skipWaiting y app.js recarga la página cuando cambia el controlador.
    const changed=new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',()=>r('activated'),{once:true}));
    try{(reg.waiting||worker).postMessage({type:'SKIP_WAITING'})}catch(_){}
    const res=await withTimeout(changed,INSTALL_TIMEOUT_MS);
    if(res!=='activated')return'timeout';
    setText('¡Listo! Abriendo…');
    await sleep(400);
    location.reload();
    return new Promise(()=>{});
  }
  function hide(){
    const el=splash();
    try{sessionStorage.setItem(BOOTED_KEY,'1')}catch(_){}
    document.documentElement.classList.remove('x-booting');
    if(!el)return;
    el.classList.add('is-leaving');
    setTimeout(()=>el.remove(),450);
  }

  window.X27_BOOT_GATE=(async()=>{
    let result='error';
    try{result=await checkForUpdate()}catch(e){console.warn('27xSOLved: no se pudo comprobar la actualización',e)}
    const wait=MIN_VISIBLE_MS-(Date.now()-started);
    if(wait>0)await sleep(wait);
    const el=splash();
    if(el){el.classList.add('is-done');setText(result==='current'||result==='skip'?'¡Todo al día!':'Abriendo 27xSOLved…')}
    await sleep(700);
    hide();
    return result;
  })();
  // Red de seguridad: nunca tapar la app más de 30 s.
  setTimeout(hide,30000);
})();
