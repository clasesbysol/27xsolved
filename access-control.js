// 27xSOLved · acceso unificado por materia.
// Modelo: materia completa + respuestas + evaluaciones.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const ALIASES={
    'quimica-general-4':'chemistry',
    'fisica-aplicada-4':'physics_applied'
  };
  const REVERSE={chemistry:'quimica-general-4',physics_applied:'fisica-aplicada-4'};
  let state={authenticated:false,admin:false,active:false,email:'',profile:null,grants:[],error:null};

  function canonicalSubject(id){return ALIASES[id]||id||''}
  function catalogSubjectId(subject){return REVERSE[subject]||subject||''}

  function storedSession(){
    const projectRef=(()=>{try{return new URL(CFG.supabaseUrl).hostname.split('.')[0]}catch(_){return''}})();
    const preferred=projectRef?`sb-${projectRef}-auth-token`:'';
    const keys=[];
    if(preferred)keys.push(preferred);
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&/^sb-.+-auth-token$/.test(k)&&!keys.includes(k))keys.push(k);
    }
    for(const key of keys){
      try{
        let raw=JSON.parse(localStorage.getItem(key)||'null');
        if(typeof raw==='string')raw=JSON.parse(raw);
        const token=raw?.access_token||raw?.currentSession?.access_token||raw?.session?.access_token;
        if(token)return {token,raw,key};
      }catch(_err){}
    }
    return null;
  }

  function tokenEmail(auth){
    const direct=auth?.raw?.user?.email||auth?.raw?.currentSession?.user?.email||auth?.raw?.session?.user?.email;
    if(direct)return String(direct).trim().toLowerCase();
    try{
      let payload=auth.token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
      while(payload.length%4)payload+='=';
      const decoded=JSON.parse(decodeURIComponent(escape(atob(payload))));
      return String(decoded?.email||'').trim().toLowerCase();
    }catch(_){return''}
  }

  async function api(path,auth){
    const response=await fetch(`${CFG.supabaseUrl}${path}`,{
      headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${auth.token}`},
      cache:'no-store'
    });
    if(!response.ok)throw new Error(`No pude comprobar el acceso (${response.status}).`);
    return response.json();
  }

  function profileIsActive(profile){
    if(!profile||!profile.active)return false;
    const now=Date.now();
    const starts=profile.access_starts_at?new Date(profile.access_starts_at).getTime():0;
    const expires=profile.access_expires_at?new Date(profile.access_expires_at).getTime():Infinity;
    return now>=starts&&now<=expires;
  }

  function subjectGrants(id){
    const subject=canonicalSubject(id);
    return state.grants.filter(g=>g.subject===subject);
  }
  function hasSubject(id){
    if(state.admin)return true;
    if(!state.active)return false;
    return subjectGrants(id).some(g=>g.grant_type==='unit'&&g.grant_key==='*');
  }
  function hasAnswers(id){
    if(state.admin)return true;
    if(!state.active)return false;
    return subjectGrants(id).some(g=>g.grant_type==='resource'&&g.grant_key==='answers');
  }
  function hasEvaluations(id){
    if(state.admin)return true;
    if(!state.active)return false;
    return subjectGrants(id).some(g=>g.grant_type==='evaluation'&&g.grant_key==='*');
  }

  function subjectFromHref(href){
    try{
      const url=new URL(href,location.href);
      const id=url.searchParams.get('subject');
      if(id)return id;
      const view=url.searchParams.get('view');
      if(view==='chemistry')return'quimica-general-4';
      if(view==='physics')return'fisica-aplicada-4';
    }catch(_){ }
    return'';
  }

  function catalogSubjects(){
    return (window.ET27_ACADEMIC_CATALOG?.years||[]).flatMap(y=>(y.subjects||[]).map(s=>({...s,year:y.year})));
  }

  function addStyles(){
    if(document.getElementById('et27-access-control-style'))return;
    const style=document.createElement('style');
    style.id='et27-access-control-style';
    style.textContent=`
      .et27-access-notice{margin:18px 0;padding:14px 16px;border:1px solid var(--border,#d7e5e4);border-radius:14px;background:var(--surface2,#f5f9f8);line-height:1.5}
      .et27-access-notice b{display:block;margin-bottom:4px}
      .et27-student-answer{margin-top:14px;border:1px solid var(--line,#d7e5e4);border-radius:16px;background:var(--panel,#fff);overflow:hidden}
      .et27-student-answer>summary{cursor:pointer;padding:13px 15px;font-weight:900;background:color-mix(in srgb,var(--accent,#0f9f9a) 8%,transparent)}
      .et27-student-answer-body{padding:14px;display:grid;gap:10px}
      .et27-answer-step{padding:12px;border:1px solid var(--line,#d7e5e4);border-radius:12px}
      .et27-answer-step h4{margin:0 0 7px}.et27-answer-step ul{margin:6px 0;padding-left:20px}
      .et27-answer-math{overflow:auto;text-align:center;padding:7px}
      .et27-locked-page{min-height:100vh;display:grid;place-items:center;padding:24px;font-family:Nunito,system-ui,sans-serif;background:#f4f8f8;color:#183037}
      .et27-locked-card{width:min(560px,100%);padding:28px;border:1px solid #d7e5e4;border-radius:20px;background:white;box-shadow:0 12px 34px rgba(0,0,0,.05)}
      .et27-locked-card h1{margin:6px 0 10px}.et27-locked-card p{line-height:1.55}.et27-locked-card a{display:inline-flex;margin-top:12px;font-weight:900;color:#0f827e;text-decoration:none}
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

  function lockGenericPage(subjectId){
    const app=document.getElementById('subjectApp');
    if(!app)return;
    const subject=catalogSubjects().find(s=>s.id===subjectId);
    const name=subject?.name||'esta materia';
    const message=state.authenticated
      ?`Tu cuenta no tiene acceso activo a ${name}. El administrador puede habilitarte la materia completa desde el Panel de control.`
      :`Para abrir ${name}, ingresá con tu cuenta de Google desde el inicio y usá una cuenta con acceso habilitado.`;
    const html=`<main class="et27-locked-page"><section class="et27-locked-card"><small>27xSOLved · acceso</small><h1>${escapeHtml(name)}</h1><p>${escapeHtml(message)}</p><a href="./?view=subjects">← Volver a materias</a></section></main>`;
    if(app.dataset.accessLocked==='1'&&app.innerHTML===html)return;
    app.dataset.accessLocked='1';
    app.className='';
    app.innerHTML=html;
  }

  function patchAcademicPlan(){
    if(!state.authenticated||state.admin)return;
    const cards=[...document.querySelectorAll('.academic-subject-card')];
    let visible=0;
    cards.forEach(card=>{
      const subjectId=subjectFromHref(card.getAttribute('href')||'');
      const meta=catalogSubjects().find(s=>s.id===subjectId);
      if(!meta||meta.kind!=='Materia')return;
      const allowed=hasSubject(subjectId);
      card.hidden=!allowed;
      if(allowed)visible+=1;
    });
    document.querySelectorAll('.academic-year-group').forEach(group=>{
      const shown=[...group.querySelectorAll('.academic-subject-card')].some(card=>!card.hidden);
      group.hidden=!shown;
    });
    document.querySelectorAll('.academic-year').forEach(year=>{
      const shown=[...year.querySelectorAll('.academic-subject-card')].some(card=>!card.hidden);
      year.hidden=!shown;
    });
    const shell=document.querySelector('[data-academic-plan]');
    if(shell&&!visible&&!shell.querySelector('.et27-access-notice')){
      shell.insertAdjacentHTML('afterbegin','<div class="et27-access-notice"><b>No tenés materias habilitadas todavía.</b><span>Cuando el administrador te asigne una materia, va a aparecer acá automáticamente.</span></div>');
    }
  }

  function patchGenericSections(subjectId){
    if(!hasSubject(subjectId))return lockGenericPage(subjectId);
    const evalAllowed=hasEvaluations(subjectId);
    const evalSection=document.querySelector('#parciales');
    if(evalSection)evalSection.hidden=!evalAllowed;
    document.querySelectorAll('a[href="#parciales"]').forEach(a=>a.hidden=!evalAllowed);
    document.documentElement.dataset.et27Answers=hasAnswers(subjectId)?'1':'0';
    document.documentElement.dataset.et27Evaluations=evalAllowed?'1':'0';
    if(subjectId==='procesos-operaciones-4')patchProcessAnswers();
  }

  function patchProcessAnswers(){
    const allowed=hasAnswers('procesos-operaciones-4');
    if(!allowed)return;
    const data=window.ET27_PROCESOS_U4;
    if(!data?.exercises?.length)return;
    document.querySelectorAll('#ejercicios .exercise-item').forEach((card,index)=>{
      if(card.querySelector('.et27-student-answer'))return;
      const locked=card.querySelector('.u4-locked');
      const ex=data.exercises[index];
      if(!locked||!ex?.solution?.blocks?.length)return;
      const details=document.createElement('details');
      details.className='et27-student-answer';
      details.innerHTML=`<summary>Resolución paso a paso · ${escapeHtml(ex.title||`Ejercicio ${index+1}`)}</summary><div class="et27-student-answer-body">${ex.solution.blocks.map(block=>`<section class="et27-answer-step"><h4>${escapeHtml(block.title||'Paso')}</h4>${block.bullets?.length?`<ul>${block.bullets.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`:''}${(block.formulas||[]).map(f=>`<div class="et27-answer-math" data-et27-answer-math="${encodeURIComponent(f)}"></div>`).join('')}</section>`).join('')}</div>`;
      locked.replaceWith(details);
      details.addEventListener('toggle',()=>{if(details.open)renderAnswerMath(details)});
    });
  }

  function renderAnswerMath(root=document){
    root.querySelectorAll?.('[data-et27-answer-math]:not([data-rendered])').forEach(node=>{
      const latex=decodeURIComponent(node.dataset.et27AnswerMath||'');
      if(!window.katex){node.textContent=latex;return;}
      try{window.katex.render(latex,node,{displayMode:true,throwOnError:false,strict:'ignore'});node.dataset.rendered='1'}catch(_){node.textContent=latex}
    });
  }

  function patchPhysics(){
    const evalAllowed=hasEvaluations('fisica-aplicada-4');
    const answersAllowed=hasAnswers('fisica-aplicada-4');
    const evaluations=document.querySelector('#physics-model-evaluations');
    if(evaluations)evaluations.hidden=!evalAllowed;
    document.querySelectorAll('#physics-model-evaluations .modelStudentAnswer').forEach(node=>node.hidden=!answersAllowed);
    document.querySelectorAll('#physics-exercises .exerciseCard > .solutionCard').forEach(node=>node.hidden=!answersAllowed&&!state.admin);
  }

  function applyDomPermissions(){
    addStyles();
    patchAcademicPlan();
    const genericId=new URLSearchParams(location.search).get('subject')||'';
    if(genericId&&document.getElementById('subjectApp'))patchGenericSections(genericId);
    patchPhysics();
  }

  function currentLegacySubject(){
    const view=new URLSearchParams(location.search).get('view');
    if(view==='chemistry')return'quimica-general-4';
    if(view==='physics')return'fisica-aplicada-4';
    return'';
  }

  async function load(){
    addStyles();
    const auth=storedSession();
    if(!auth){
      state={authenticated:false,admin:false,active:false,email:'',profile:null,grants:[],error:null};
      applyDomPermissions();
      return state;
    }
    const email=tokenEmail(auth);
    const admin=email&&email===String(CFG.adminEmail||'').trim().toLowerCase();
    if(admin){
      state={authenticated:true,admin:true,active:true,email,profile:{email,active:true,role:'admin'},grants:[],error:null};
      applyDomPermissions();
      return state;
    }
    try{
      const [profiles,grants]=await Promise.all([
        api(`/rest/v1/access_profiles?select=email,active,role,access_starts_at,access_expires_at&email=eq.${encodeURIComponent(email)}`,auth),
        api(`/rest/v1/access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${encodeURIComponent(email)}`,auth)
      ]);
      const profile=Array.isArray(profiles)?profiles[0]||null:null;
      state={authenticated:true,admin:false,active:profileIsActive(profile),email,profile,grants:Array.isArray(grants)?grants:[],error:null};
    }catch(error){
      console.error('27xSOLved access check',error);
      state={authenticated:true,admin:false,active:false,email,profile:null,grants:[],error:error?.message||'No se pudo comprobar el acceso.'};
    }

    const legacy=currentLegacySubject();
    if(legacy&&!hasSubject(legacy)){
      const target=new URL('./?view=subjects&access=denied',location.href);
      if(location.href!==target.href){location.replace(target.href);return state;}
    }
    applyDomPermissions();
    return state;
  }

  const ready=load().finally(()=>{
    document.dispatchEvent(new CustomEvent('et27-access-ready',{detail:{authenticated:state.authenticated,admin:state.admin,active:state.active}}));
  });

  window.ET27Access={
    ready,
    get state(){return state},
    canonicalSubject,
    catalogSubjectId,
    hasSubject,
    hasAnswers,
    hasEvaluations,
    refresh:load
  };

  let scheduled=false;
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;applyDomPermissions()});
  }
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  document.addEventListener('et27-access-ready',schedule);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
