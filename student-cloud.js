// 27xSOLved · datos del alumno en la nube (Supabase) + registro de actividad.
// - Año del alumno (lo elige él o lo asigna el admin; los cambios quedan registrados).
// - Horario semanal y tareas sincronizados entre dispositivos.
// - Actividad: ingreso a la app y temas abiertos (solo después del aviso).
// - "Seguir donde dejaste" y "Nuevo para vos" (temas vistos).
// Si las tablas todavía no existen en Supabase, todo sigue funcionando en el dispositivo.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const LS={
    profile:email=>`27xsolved-student-profile-v1:${email||'guest'}`,
    guestYear:'27xsolved-guest-year',
    notice:email=>`27xsolved-activity-notice:${email}`,
    plannerMeta:'27xsolved-planner-meta-v1',
    schedule:'27xsolved-weekly-schedule-v1',
    checklist:'27xsolved-checklist-v1',
    cont:email=>`27xsolved-continue-v1:${email||'guest'}`,
    seen:email=>`27xsolved-seen-v1:${email||'guest'}`
  };
  const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(_){return f}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
  const enc=encodeURIComponent;

  // ---------- Sesión ----------
  function storedSession(){
    const ref=(()=>{try{return new URL(CFG.supabaseUrl).hostname.split('.')[0]}catch(_){return''}})();
    const keys=[];if(ref)keys.push(`sb-${ref}-auth-token`);
    for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&/^sb-.+-auth-token$/.test(k)&&!keys.includes(k))keys.push(k)}
    for(const key of keys){
      try{
        let raw=JSON.parse(localStorage.getItem(key)||'null');if(typeof raw==='string')raw=JSON.parse(raw);
        const s=raw?.currentSession||raw?.session||raw;
        if(s?.access_token)return s;
      }catch(_){}
    }
    return null;
  }
  function decode(token){
    try{let p=token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');while(p.length%4)p+='=';return JSON.parse(decodeURIComponent(escape(atob(p))))}catch(_){return{}}
  }
  function who(){
    const s=storedSession();
    const guest=localStorage.getItem('cbc-mode')==='guest';
    if(!s)return{authenticated:false,guest,admin:false,email:'',name:'',token:''};
    const claims=decode(s.access_token);
    const email=String(s.user?.email||claims.email||'').trim().toLowerCase();
    const meta=s.user?.user_metadata||claims.user_metadata||{};
    const name=String(meta.full_name||meta.name||'').trim();
    const expired=claims.exp&&claims.exp*1000<Date.now()-60000;
    return{authenticated:!!email,guest:false,admin:email===String(CFG.adminEmail||'').toLowerCase(),email,name,token:s.access_token,expired};
  }

  let available=true; // false si las tablas nuevas no existen todavía
  async function api(path,options={}){
    const me=who();
    if(!me.token)throw new Error('Sin sesión');
    const res=await fetch(`${CFG.supabaseUrl}/rest/v1/${path}`,{
      ...options,cache:'no-store',keepalive:!!options.keepalive,
      headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${me.token}`,'Content-Type':'application/json',...(options.headers||{})}
    });
    const text=await res.text();let data=null;if(text){try{data=JSON.parse(text)}catch(_){data=text}}
    if(!res.ok){
      const code=data?.code||'';
      if(res.status===404||code==='42P01'||code==='PGRST205')available=false;
      throw new Error(data?.message||`Error ${res.status}`);
    }
    return data;
  }
  const safe=p=>p.catch(e=>{console.warn('27xSOLved cloud:',e.message);return null});

  // ---------- Perfil ----------
  const me=who();
  let profile=read(LS.profile(me.email),null)||{};
  if(!me.authenticated)profile={year:read(LS.guestYear,null)};
  function saveLocal(){if(me.authenticated)write(LS.profile(me.email),profile);else write(LS.guestYear,profile.year??null)}

  async function loadProfile(){
    if(!me.authenticated||me.admin)return profile;
    const rows=await safe(api(`student_profiles?select=*&email=eq.${enc(me.email)}`));
    if(Array.isArray(rows)&&rows[0]){profile={...profile,...rows[0]};saveLocal();}
    else if(Array.isArray(rows)){
      await safe(api('student_profiles',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({email:me.email,full_name:me.name||null,year:profile.year||null,year_set_by:profile.year?'student':null})}));
    }
    if(Array.isArray(rows)&&me.name&&rows[0]&&!rows[0].full_name)safe(patchProfile({full_name:me.name}));
    return profile;
  }
  function patchProfile(fields){
    return api(`student_profiles?on_conflict=email`,{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({email:me.email,...fields,updated_at:new Date().toISOString()})});
  }

  async function setYear(year){
    year=Number(year)||null;
    const from=profile.year||null;
    if(from===year)return;
    profile={...profile,year,year_set_by:'student',year_updated_at:new Date().toISOString()};
    saveLocal();
    document.dispatchEvent(new CustomEvent('et27-year-changed',{detail:{year}}));
    if(!me.authenticated||me.admin)return;
    await safe(patchProfile({year,year_set_by:'student',year_updated_at:profile.year_updated_at}));
    await safe(api('student_year_changes',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({email:me.email,from_year:from,to_year:year,changed_by:'student'})}));
  }

  // El admin asigna el año desde Accesos.
  async function adminSetYear(email,year,fromYear){
    email=String(email||'').toLowerCase();year=Number(year)||null;
    await api('student_profiles?on_conflict=email',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({email,year,year_set_by:'admin',year_updated_at:new Date().toISOString(),updated_at:new Date().toISOString()})});
    if(year!==(Number(fromYear)||null))await safe(api('student_year_changes',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({email,from_year:Number(fromYear)||null,to_year:year,changed_by:'admin'})}));
  }

  // ---------- Aviso de actividad ----------
  const noticeAcked=()=>!!(profile.activity_notice_at||read(LS.notice(me.email),null));
  function noticeNeeded(){return me.authenticated&&!me.admin&&!noticeAcked()}
  function ackNotice(){
    const at=new Date().toISOString();
    write(LS.notice(me.email),at);profile.activity_notice_at=at;saveLocal();
    safe(patchProfile({activity_notice_at:at}));
    logAppOpen();
  }
  const canLog=()=>me.authenticated&&!me.admin&&available&&noticeAcked();

  function logEvent(kind,fields={}){
    if(!canLog())return;
    safe(api('activity_events',{method:'POST',keepalive:true,headers:{Prefer:'return=minimal'},body:JSON.stringify({email:me.email,kind,...fields})}));
  }
  function logAppOpen(){
    if(!canLog())return;
    try{if(sessionStorage.getItem('27xsolved-open-logged'))return;sessionStorage.setItem('27xsolved-open-logged','1')}catch(_){}
    logEvent('app_open',{label:'Abrió la app'});
    safe(patchProfile({last_seen_at:new Date().toISOString()}));
  }

  // ---------- Horario y tareas ----------
  let plannerTimer=null;
  function plannerChanged(){
    write(LS.plannerMeta,{updatedAt:new Date().toISOString(),email:me.email});
    if(!me.authenticated||me.admin)return;
    clearTimeout(plannerTimer);
    plannerTimer=setTimeout(()=>{
      safe(api('student_planner?on_conflict=email',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({email:me.email,schedule:read(LS.schedule,[]),checklist:read(LS.checklist,[]),updated_at:read(LS.plannerMeta,{}).updatedAt})}));
    },800);
  }
  async function pullPlanner(){
    if(!me.authenticated||me.admin)return;
    const rows=await safe(api(`student_planner?select=schedule,checklist,updated_at&email=eq.${enc(me.email)}`));
    if(!Array.isArray(rows))return;
    const local=read(LS.plannerMeta,{});
    const remote=rows[0];
    const localData=read(LS.schedule,[]).length||read(LS.checklist,[]).length;
    if(remote&&(!local.updatedAt||local.email!==me.email||new Date(remote.updated_at)>new Date(local.updatedAt))){
      write(LS.schedule,Array.isArray(remote.schedule)?remote.schedule:[]);
      write(LS.checklist,Array.isArray(remote.checklist)?remote.checklist:[]);
      write(LS.plannerMeta,{updatedAt:remote.updated_at,email:me.email});
      document.dispatchEvent(new CustomEvent('et27-planner-updated'));
    }else if(!remote&&localData){plannerChanged()}
    else if(remote&&local.updatedAt&&new Date(local.updatedAt)>new Date(remote.updated_at)){plannerChanged()}
  }

  // ---------- Seguir donde dejaste ----------
  function getContinue(){return read(LS.cont(me.email),null)||profile.continue_item||null}
  let contTimer=null;
  function setContinue(item){
    write(LS.cont(me.email),item);
    if(!me.authenticated||me.admin)return;
    clearTimeout(contTimer);contTimer=setTimeout(()=>safe(patchProfile({continue_item:item})),3000);
  }

  // ---------- Nuevo para vos ----------
  function getSeen(){return{...(profile.seen||{}),...read(LS.seen(me.email),{})}}
  let seenTimer=null;
  function setSeen(map){
    write(LS.seen(me.email),map);profile.seen=map;
    if(!me.authenticated||me.admin)return;
    clearTimeout(seenTimer);seenTimer=setTimeout(()=>safe(patchProfile({seen:map})),2500);
  }

  // ---------- Seguimiento de temas ----------
  const VIEW_SUBJECT={
    'Química General':'quimica-general-4','Física Aplicada':'fisica-aplicada-4',
    'Química Inorgánica':'quimica-inorganica-4','Química Analítica Cualitativa':'quimica-analitica-cualitativa-5'
  };
  const VIEW_OF={'quimica-general-4':'chemistry','fisica-aplicada-4':'physics','quimica-inorganica-4':'inorganic','quimica-analitica-cualitativa-5':'cualitativa'};
  const PAGE_SUBJECT={
    'matematica-1-inicio.html':'matematica-1','matematica-1.html':'matematica-1','matematica-1-examen-1.html':'matematica-1',
    'quimica-general.html':'quimica-general-4','fisica-aplicada.html':'fisica-aplicada-4','fisica-formulas-a4.html':'fisica-aplicada-4'
  };
  function catalogSubject(id){
    for(const y of window.ET27_ACADEMIC_CATALOG?.years||[]){const s=y.subjects.find(x=>x.id===id);if(s)return{...s,year:y.year}}
    return null;
  }
  const clean=t=>String(t||'').replace(/\s+/g,' ').trim().slice(0,140);
  function currentLocation(){
    const file=location.pathname.split('/').pop()||'index.html';
    let subject='',href='';
    if(file===''||file==='index.html'){
      const title=clean(document.querySelector('#app .top > b')?.textContent);
      subject=VIEW_SUBJECT[title]||(title.startsWith('Química General ·')?'quimica-general-4':'');
      if(subject)href=`./?view=${VIEW_OF[subject]}`;
    }else if(file==='materia.html'){
      subject=new URLSearchParams(location.search).get('subject')||'';href=location.pathname.split('/').pop()+location.search;
    }else if(PAGE_SUBJECT[file]){subject=PAGE_SUBJECT[file];href=`./${file}${location.search}`}
    if(!subject)return null;
    const scope=document.querySelector('#app .content, main')||document;
    const h1=[...scope.querySelectorAll('h1')].find(n=>n.offsetParent!==null);
    const info=catalogSubject(subject);
    const name=info?.name||subject;
    const topic=clean(h1?.textContent)||name;
    return{subject,subjectName:name,year:info?.year||null,topic,href,key:`${subject}|${topic}`};
  }
  let candidate=null,candidateSince=0,lastKey='';
  function tick(){
    if(document.hidden)return;
    const loc=currentLocation();
    if(!loc){candidate=null;return}
    if(!candidate||candidate.key!==loc.key){candidate=loc;candidateSince=Date.now();return}
    if(loc.key===lastKey||Date.now()-candidateSince<4000)return;
    lastKey=loc.key;
    if(!me.admin)setContinue({label:loc.topic,subject:loc.subject,subjectName:loc.subjectName,href:loc.href,at:new Date().toISOString()});
    logEvent('topic_open',{subject:loc.subject,topic:loc.topic===loc.subjectName?'(índice de la materia)':loc.topic,label:loc.subjectName});
  }
  setInterval(tick,1500);

  const ready=(async()=>{
    await loadProfile();
    if(noticeAcked())logAppOpen();
    pullPlanner();
    return{...me,profile};
  })();

  window.ET27Cloud={
    ready,me,api,
    get available(){return available},
    get profile(){return profile},
    get year(){return profile.year||null},
    setYear,adminSetYear,
    noticeNeeded,ackNotice,
    plannerChanged,pullPlanner,
    getContinue,setContinue,getSeen,setSeen,
    catalogSubject
  };
})();
