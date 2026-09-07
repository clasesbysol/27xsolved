// 27xSOLved · resumen legible de materias en la lista de alumnos del panel.
(function(){
  'use strict';
  const CFG=window.CBCLASES_CONFIG||{};
  const REVERSE={chemistry:'quimica-general-4',physics_applied:'fisica-aplicada-4'};

  function catalog(){
    return (window.ET27_ACADEMIC_CATALOG?.years||[]).flatMap(y=>(y.subjects||[]).filter(s=>s.kind==='Materia'));
  }
  function subjectName(dbSubject){
    const id=REVERSE[dbSubject]||dbSubject;
    return catalog().find(s=>s.id===id)?.name||id;
  }
  function storedToken(){
    const ref=(()=>{try{return new URL(CFG.supabaseUrl).hostname.split('.')[0]}catch(_){return''}})();
    const keys=[];
    if(ref)keys.push(`sb-${ref}-auth-token`);
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&/^sb-.+-auth-token$/.test(k)&&!keys.includes(k))keys.push(k);
    }
    for(const key of keys){
      try{
        let raw=JSON.parse(localStorage.getItem(key)||'null');
        if(typeof raw==='string')raw=JSON.parse(raw);
        const token=raw?.access_token||raw?.currentSession?.access_token||raw?.session?.access_token;
        if(token)return token;
      }catch(_){}
    }
    return'';
  }
  async function loadGrants(){
    const token=storedToken();
    if(!token)return[];
    const response=await fetch(`${CFG.supabaseUrl}/rest/v1/access_grants?select=email,subject,unit_no,grant_type,grant_key`,{
      headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${token}`},cache:'no-store'
    });
    if(!response.ok)throw new Error(`Error ${response.status}`);
    return response.json();
  }
  function summary(rows){
    const names=[...new Set(rows.filter(g=>g.grant_type==='unit'&&g.grant_key==='*').map(g=>subjectName(g.subject)))];
    return names.length?names.join(' · '):'Sin materias habilitadas';
  }

  let running=false;
  async function patch(){
    if(running)return;
    const list=document.querySelector('.adminList:not(.solutionAdmin)');
    if(!list||list.dataset.subjectSummary==='done')return;
    const edits=[...list.querySelectorAll('[data-edit]')];
    if(!edits.length)return;
    running=true;
    list.dataset.subjectSummary='loading';
    try{
      const grants=await loadGrants();
      edits.forEach(button=>{
        const email=String(button.dataset.edit||'').trim().toLowerCase();
        const small=button.closest('.userRow')?.querySelector('small');
        if(small)small.textContent=summary(grants.filter(g=>String(g.email||'').trim().toLowerCase()===email));
      });
      list.dataset.subjectSummary='done';
    }catch(err){
      console.error('No pude resumir materias del panel',err);
      delete list.dataset.subjectSummary;
    }finally{running=false}
  }

  let scheduled=false;
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;patch()});
  }
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  document.addEventListener('DOMContentLoaded',schedule,{once:true});
  schedule();
})();
