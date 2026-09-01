// 27xSOLved · Física Aplicada — restaura la detección de administrador para los guiones 4.1–4.9.
(function(){
  'use strict';

  const MARKER_ID='physics-admin-guide-access-marker';

  function adminEmailInStorage(storage){
    const target=String(window.CBCLASES_CONFIG?.adminEmail||'').trim().toLowerCase();
    if(!target)return false;
    try{
      for(let i=0;i<storage.length;i++){
        const key=storage.key(i);
        const value=storage.getItem(key);
        if(value&&String(value).toLowerCase().includes(target))return true;
      }
    }catch(_){ }
    return false;
  }

  function hasAdminUi(){
    return [...document.querySelectorAll('.pill,.rolePill,.accountRole,.userRole,button,a')].some(el=>{
      const text=(el.textContent||'').trim().toLowerCase();
      return text==='administrador'||text==='panel de control'||text.includes('panel admin');
    });
  }

  function isPhysics(){
    return document.querySelector('.unitHero h1')?.textContent.trim()==='Física Aplicada';
  }

  function isAdmin(){
    return hasAdminUi()||adminEmailInStorage(localStorage)||adminEmailInStorage(sessionStorage);
  }

  function syncMarker(){
    const shouldExist=isPhysics()&&isAdmin();
    let marker=document.getElementById(MARKER_ID);

    if(!shouldExist){
      marker?.remove();
      return;
    }

    if(!marker){
      marker=document.createElement('span');
      marker.id=MARKER_ID;
      marker.className='pill';
      marker.textContent='Administrador';
      marker.setAttribute('aria-hidden','true');
      marker.style.setProperty('display','none','important');
      document.body.insertBefore(marker,document.body.firstChild);
    }else if(document.body.firstChild!==marker){
      document.body.insertBefore(marker,document.body.firstChild);
    }
  }

  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      syncMarker();
    });
  }

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('storage',schedule);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
  setTimeout(schedule,250);
  setTimeout(schedule,800);
  setTimeout(schedule,1800);
})();
