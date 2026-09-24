// 27xSOLved · acceso unificado por materia.
// Niveles por materia: none · theory (solo teórica) · theory_eval (teórica + evaluaciones) · full (completa).
// Ver admin-access.js para la convención de filas en access_grants (resource/theory = nivel teórico).
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const ALIASES={
    'quimica-general-4':'chemistry',
    'fisica-aplicada-4':'physics_applied'
  };
  const REVERSE={chemistry:'quimica-general-4',physics_applied:'fisica-aplicada-4'};
  const PAGE_SUBJECTS={
    'matematica-1-inicio.html':'matematica-1',
    'matematica-1.html':'matematica-1',
    'matematica-1-examen-1.html':'matematica-1',
    'quimica-general.html':'quimica-general-4',
    'fisica-aplicada.html':'fisica-aplicada-4',
    'fisica-formulas-a4.html':'fisica-aplicada-4'
  };
  // Invitados (sin cuenta): ven sólo una muestra de UNA materia por año, cortada a ~PREVIEW_WORDS palabras.
  // Para cambiar la materia de muestra de un año, reemplazá el id (ver academic-catalog.js).
  const GUEST_PREVIEW={
    1:'matematica-1',
    4:'procesos-operaciones-4',
    5:'matematica-5',
    6:'quimica-analitica-cuantitativa-6'
  };
  const PREVIEW_WORDS=500;
  const PREVIEW_ROOTS='.subject-main, .math-main, main.hub';
  let pageReady=document.readyState==='complete';
  window.addEventListener('load',()=>{pageReady=true;setTimeout(()=>schedule?.(),50)},{once:true});
  let state={authenticated:false,admin:false,active:false,email:'',profile:null,grants:[],error:null};
  let loaded=false;
  const pageFile=href=>{try{return new URL(href,location.href).pathname.split('/').pop()}catch(_){return''}};

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
  function level(id){
    if(state.admin)return'full';
    if(!state.active)return'none';
    const rows=subjectGrants(id);
    if(!rows.length)return'none';
    const theory=rows.some(g=>g.grant_type==='resource'&&g.grant_key==='theory');
    if(!theory&&rows.some(g=>g.grant_type==='unit'&&g.grant_key==='*'))return'full';
    return rows.some(g=>g.grant_type==='evaluation')?'theory_eval':'theory';
  }
  const hasSubject=id=>level(id)!=='none';
  const hasPractice=id=>level(id)==='full';
  const hasAnswers=id=>level(id)==='full';
  const hasEvaluations=id=>level(id)==='full'||level(id)==='theory_eval';

  function subjectFromHref(href){
    try{
      const url=new URL(href,location.href);
      const id=url.searchParams.get('subject');
      if(id)return id;
      const view=url.searchParams.get('view');
      if(view==='chemistry')return'quimica-general-4';
      if(view==='physics')return'fisica-aplicada-4';
      return PAGE_SUBJECTS[pageFile(url.href)]||'';
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
      .et27-student-answer>summary{cursor:pointer;padding:13px 15px;font-weight:900;background:color-mix(in srgb,var(--accent,#15579D) 8%,transparent)}
      .et27-student-answer-body{padding:14px;display:grid;gap:10px}
      .et27-answer-step{padding:12px;border:1px solid var(--line,#d7e5e4);border-radius:12px}
      .et27-answer-step h4{margin:0 0 7px}.et27-answer-step ul{margin:6px 0;padding-left:20px}
      .et27-answer-math{overflow:auto;text-align:center;padding:7px}
      .et27-locked-page{min-height:100vh;display:grid;place-items:center;padding:24px;font-family:Nunito,system-ui,sans-serif;background:#f4f8f8;color:#183037}
      .et27-locked-card{width:min(560px,100%);padding:28px;border:1px solid #d7e5e4;border-radius:20px;background:white;box-shadow:0 12px 34px rgba(0,0,0,.05)}
      .et27-locked-card h1{margin:6px 0 10px}.et27-locked-card p{line-height:1.55}
      .et27-locked-card,.et27-locked-card *{box-sizing:border-box}.et27-locked-inline{padding-inline:4px}
      .et27-locked-icon{font-size:40px;line-height:1}
      .et27-locked-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
      .et27-locked-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:12px;font-weight:900;text-decoration:none;border:1px solid #15579D;color:#15579D;background:transparent}
      .et27-locked-actions a.primary{background:#15579D;color:#fff}
      .et27-locked-inline{display:grid;place-items:center;padding:40px 0}
      .et27-locked-inline .et27-locked-card{background:var(--surface,#fff);color:inherit;border-color:var(--border,#d7e5e4)}
      html.et27-pending body{visibility:hidden}
      .academic-subject-card.et27-guest-locked{opacity:.62}
      .et27-preview-cta{width:auto;margin:28px 0;box-shadow:none;background:var(--surface,#fff);color:inherit}
      .et27-preview-cta h2{margin:6px 0 8px}
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

  function lockedCard(subjectId){
    const subject=catalogSubjects().find(s=>s.id===subjectId);
    const name=subject?.name||'esta materia';
    const message=state.authenticated
      ?`Tu cuenta no tiene acceso a ${name}. Si creés que es un error, pedile al administrador que te la habilite.`
      :`${name} es contenido para alumnos con cuenta. Ingresá con Google para pedir acceso, o mirá las muestras gratis en Plan y materias.`;
    const actions=state.authenticated
      ?`<a class="primary" href="./">Volver al inicio</a><a href="./?view=subjects">Ver mis materias</a>`
      :`<a class="primary" href="./" data-et27-login>Ingresar con Google</a><a href="./?view=subjects">Ver muestras gratis</a>`;
    return `<section class="et27-locked-card" data-et27-lock="${escapeHtml(subjectId)}"><div class="et27-locked-icon" aria-hidden="true">🔒</div><small>27xSOLved · acceso</small><h1>${escapeHtml(name)}</h1><p>${escapeHtml(message)}</p><div class="et27-locked-actions">${actions}</div></section>`;
  }

  // ---------- Muestra para invitados ----------
  const isGuest=()=>!state.authenticated;
  const previewSubjects=()=>Object.values(GUEST_PREVIEW);
  const isPreview=id=>isGuest()&&previewSubjects().includes(id);

  function previewCta(subjectId){
    const name=catalogSubjects().find(s=>s.id===subjectId)?.name||'esta materia';
    return `<section class="et27-preview-cta et27-locked-card" data-et27-preview-cta><div class="et27-locked-icon" aria-hidden="true">✨</div><small>Muestra gratis</small><h2>Hasta acá llega la muestra de ${escapeHtml(name)}</h2><p>El resto del contenido (teoría completa, ejercicios resueltos y modelos de evaluación) está disponible para alumnos con cuenta habilitada.</p><div class="et27-locked-actions"><a class="primary" href="./" data-et27-login>Ingresar con Google</a><a href="./?view=subjects">Volver a materias</a></div></section>`;
  }

  // Deja sólo las primeras ~PREVIEW_WORDS palabras del contenido y quita el resto del DOM.
  function previewCut(subjectId){
    const root=document.querySelector(PREVIEW_ROOTS);
    if(!root)return false;
    const existing=root.querySelector(':scope > [data-et27-preview-cta]');
    if(existing){while(existing.nextSibling)existing.nextSibling.remove();return true}
    if(!pageReady)return false; // esperar a que la página termine de armarse
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('.katex-mathml,script,style,noscript,annotation')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    let count=0,cutNode=null;
    while(walker.nextNode()){
      count+=(walker.currentNode.nodeValue.match(/[\p{L}\p{N}]+/gu)||[]).length;
      if(count>=PREVIEW_WORDS){cutNode=walker.currentNode;break}
    }
    if(cutNode){
      let node=cutNode.parentElement.closest('p,li,h1,h2,h3,h4,h5,tr,figure,pre,blockquote,summary,.math-row,.math-step')||cutNode.parentElement;
      if(node.tagName==='SUMMARY')node=node.parentElement;
      while(node&&node!==root){while(node.nextSibling)node.nextSibling.remove();node=node.parentNode}
    }
    root.insertAdjacentHTML('beforeend',previewCta(subjectId));
    document.querySelectorAll('#formulaFab,#formulaRail,#formulaSheet,.formula-sheet').forEach(n=>n.remove());
    document.querySelectorAll('a[href^="#"]').forEach(a=>{const id=a.getAttribute('href').slice(1);if(id&&!document.getElementById(id))a.hidden=true});
    return true;
  }
  let previewDone=false;

  function lockGenericPage(subjectId){
    const app=document.getElementById('subjectApp');
    if(!app||app.querySelector(`[data-et27-lock="${CSS.escape(subjectId)}"]`))return;
    app.dataset.accessLocked='1';
    app.className='';
    app.innerHTML=`<main class="et27-locked-page">${lockedCard(subjectId)}</main>`;
  }

  function labelGuestPlan(){
    document.querySelectorAll('.academic-subject-card').forEach(card=>{
      const subjectId=subjectFromHref(card.getAttribute('href')||'');
      const meta=catalogSubjects().find(s=>s.id===subjectId);
      if(!meta)return;
      const label=previewSubjects().includes(subjectId)?'✨ Muestra gratis':'🔒 Requiere cuenta';
      const em=card.querySelector('.academic-subject-copy em');
      if(em&&em.textContent!==label)em.textContent=label;
      card.classList.toggle('et27-guest-locked',!previewSubjects().includes(subjectId));
    });
  }

  function patchAcademicPlan(){
    if(!state.authenticated)return labelGuestPlan();
    if(state.admin)return;
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

  function toggleSection(selector,allowed){
    document.querySelectorAll(selector).forEach(node=>{if(node.hidden!==!allowed)node.hidden=!allowed});
    const id=selector.startsWith('#')?selector:'';
    if(id)document.querySelectorAll(`a[href="${id}"]`).forEach(a=>{if(a.hidden!==!allowed)a.hidden=!allowed});
  }

  function lockWholePage(subjectId){
    if(document.body.dataset.et27Locked==='1')return;
    document.body.dataset.et27Locked='1';
    document.body.innerHTML=`<main class="et27-locked-page">${lockedCard(subjectId)}</main>`;
  }

  // Química y Física viven dentro de la app principal: se bloquea sólo el contenido, sin redirigir.
  function currentAppSubject(){
    const view=document.documentElement.dataset.view||new URLSearchParams(location.search).get('view')||'';
    if(view==='chemistry'||view==='unit')return'quimica-general-4';
    if(view==='physics')return'fisica-aplicada-4';
    return'';
  }
  function lockAppContent(){
    if(state.admin)return;
    const subjectId=currentAppSubject();
    if(!subjectId||hasSubject(subjectId))return;
    const content=document.querySelector('#app .main .content');
    if(!content||content.querySelector(`[data-et27-lock="${subjectId}"]`))return;
    content.innerHTML=`<div class="et27-locked-inline">${lockedCard(subjectId)}</div>`;
    document.querySelector('.periodicFab')?.remove();
  }

  // Páginas estáticas propias (Matemática de 1.º, resúmenes de Química y Física).
  // En Matemática: teoría = todo salvo práctica, desafío y modelos de examen.
  function patchMathPage(subjectId){
    if(!hasSubject(subjectId)){
      if(isPreview(subjectId)){previewDone=previewCut(subjectId);return}
      return lockWholePage(subjectId);
    }
    if(subjectId!=='matematica-1')return;
    toggleSection('#practica',hasPractice(subjectId));
    toggleSection('#desafio',hasPractice(subjectId));
    toggleSection('#modelos',hasEvaluations(subjectId));
  }

  function patchGenericSections(subjectId){
    if(!hasSubject(subjectId)){
      if(isPreview(subjectId)){previewDone=previewCut(subjectId);return}
      return lockGenericPage(subjectId);
    }
    toggleSection('#ejercicios',hasPractice(subjectId));
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
    if(!loaded)return; // no bloquear nada hasta saber quién es el usuario
    patchAcademicPlan();
    const genericId=new URLSearchParams(location.search).get('subject')||'';
    if(genericId&&document.getElementById('subjectApp'))patchGenericSections(genericId);
    const pageSubject=PAGE_SUBJECTS[pageFile(location.href)];
    if(pageSubject)patchMathPage(pageSubject);
    lockAppContent();
    patchPhysics();
    if(guestPreviewPage&&previewDone)releaseGate();
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

    applyDomPermissions();
    return state;
  }

  const pageSubjectId=PAGE_SUBJECTS[pageFile(location.href)]||new URLSearchParams(location.search).get('subject')||'';
  const guestPreviewPage=!storedSession()&&Object.values(GUEST_PREVIEW).includes(pageSubjectId);
  function releaseGate(){document.documentElement.classList.remove('et27-pending')}
  const needsGate=(
    Boolean(PAGE_SUBJECTS[pageFile(location.href)])||
    (Boolean(new URLSearchParams(location.search).get('subject'))&&!!document.getElementById('subjectApp'))||
    ['chemistry','physics','unit'].includes(new URLSearchParams(location.search).get('view')||'')
  );
  if(needsGate){
    document.documentElement.classList.add('et27-pending');
    // Red de seguridad: si algo tarda, se corta igual antes de mostrar.
    setTimeout(()=>{if(guestPreviewPage){pageReady=true;applyDomPermissions()}releaseGate()},10000);
  }
  const ready=load().finally(()=>{
    loaded=true;
    applyDomPermissions();
    if(!guestPreviewPage)releaseGate();
    document.dispatchEvent(new CustomEvent('et27-access-ready',{detail:{authenticated:state.authenticated,admin:state.admin,active:state.active}}));
  });

  window.ET27Access={
    ready,
    get state(){return state},
    canonicalSubject,
    catalogSubjectId,
    level,
    hasSubject,
    hasPractice,
    hasAnswers,
    hasEvaluations,
    refresh:load
  };

  document.addEventListener('click',e=>{
    if(e.target.closest?.('[data-et27-login]')){try{localStorage.removeItem('cbc-mode')}catch(_){}}
  },true);

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
