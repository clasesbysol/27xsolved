// 27xSOLved · control de acceso unificado (única autoridad de permisos en el navegador).
//
// · La identidad se verifica con Supabase (/auth/v1/user): un token armado a mano en
//   localStorage no sirve, porque el servidor valida la firma. Sólo cuenta un correo confirmado.
// · Los permisos se leen de access_grants (RLS: cada alumno lee sólo los suyos) y se traducen al
//   árbol de contenidos de cada materia (access-tree.js). localStorage nunca es autoridad.
// · Lo no habilitado se QUITA del DOM (no se oculta con CSS) y se reemplaza por un aviso.
// · app.js y las páginas de cada materia consultan ET27Access.can(materia, ruta).
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const T=()=>window.ET27AccessTree;
  const ALIASES={'quimica-general-4':'chemistry','fisica-aplicada-4':'physics_applied'};
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
  const EMPTY={authenticated:false,verified:false,admin:false,active:false,email:'',profile:null,grants:[],error:null};
  let state={...EMPTY};
  let loaded=false;
  let loadedAt=0;
  const pageFile=href=>{try{return new URL(href,location.href).pathname.split('/').pop()||'index.html'}catch(_){return''}};
  const FILE=pageFile(location.href);

  function canonicalSubject(id){return ALIASES[id]||id||''}
  function catalogSubjectId(subject){return REVERSE[subject]||subject||''}

  // ---------- Sesión ----------
  function sessionKeys(){
    const projectRef=(()=>{try{return new URL(CFG.supabaseUrl).hostname.split('.')[0]}catch(_){return''}})();
    const preferred=projectRef?`sb-${projectRef}-auth-token`:'';
    const keys=[];
    if(preferred)keys.push(preferred);
    try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&/^sb-.+-auth-token$/.test(k)&&!keys.includes(k))keys.push(k)}}catch(_){}
    return keys;
  }
  function storedSession(){
    for(const key of sessionKeys()){
      try{
        let raw=JSON.parse(localStorage.getItem(key)||'null');
        if(typeof raw==='string')raw=JSON.parse(raw);
        const s=raw?.currentSession||raw?.session||raw;
        if(s?.access_token)return{token:s.access_token,refresh:s.refresh_token||'',raw,key};
      }catch(_err){}
    }
    return null;
  }
  const hasAppClient=()=>!!document.getElementById('app');

  async function verifyUser(auth){
    const res=await fetch(`${CFG.supabaseUrl}/auth/v1/user`,{headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${auth.token}`},cache:'no-store'});
    if(res.status===401||res.status===403)return null;
    if(!res.ok)throw new Error(`No pude verificar la sesión (${res.status}).`);
    return res.json();
  }
  // En páginas sueltas (sin el cliente de Supabase de app.js) renovamos el token vencido.
  async function refreshSession(auth){
    if(!auth?.refresh||hasAppClient())return null;
    const res=await fetch(`${CFG.supabaseUrl}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:{apikey:CFG.supabaseAnonKey,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:auth.refresh}),cache:'no-store'});
    if(!res.ok)return null;
    const s=await res.json();
    if(!s?.access_token)return null;
    if(!s.expires_at&&s.expires_in)s.expires_at=Math.floor(Date.now()/1000)+Number(s.expires_in);
    try{localStorage.setItem(auth.key,JSON.stringify(s))}catch(_){}
    return{token:s.access_token,refresh:s.refresh_token||'',raw:s,key:auth.key};
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

  // ---------- Permisos ----------
  function subjectGrants(id){
    const subject=canonicalSubject(T()?.resolve(id).subject||id);
    return state.grants.filter(g=>g.subject===subject);
  }
  const pathCache=new Map();
  function granted(subjectId){
    const rows=subjectGrants(subjectId);
    const sig=JSON.stringify(rows);
    const hit=pathCache.get(subjectId);
    if(hit&&hit.sig===sig)return hit.set;
    const tree=T();
    const nodes=rows.filter(g=>g.grant_type==='node').map(g=>g.grant_key);
    const legacy=tree?tree.legacyPaths(subjectId,rows.filter(g=>g.grant_type!=='node')):[];
    const set=new Set([...nodes,...legacy]);
    pathCache.set(subjectId,{sig,set});
    return set;
  }
  function target(id,path){
    const r=T()?.resolve(id)||{subject:id,prefix:''};
    const p=!path||path==='*'?'':path;
    const full=r.prefix?(p?`${r.prefix}/${p}`:r.prefix):(p||'*');
    return{subject:r.subject,path:full};
  }
  // ¿El alumno puede abrir exactamente este nodo (y todo lo de adentro)?
  function can(id,path='*'){
    if(state.admin)return true;
    if(!state.active||!T())return false;
    const t=target(id,path);
    return T().covers(granted(t.subject),t.path);
  }
  // ¿Hay algo habilitado en este nodo o dentro de él? (para mostrar la puerta de entrada)
  function reach(id,path='*'){
    if(state.admin)return true;
    if(!state.active||!T())return false;
    const t=target(id,path);
    return T().touches(granted(t.subject),t.path);
  }
  // Permisos anteriores al árbol: en algunas materias el nivel "teórica" mostraba las consignas
  // de los ejercicios sin las resoluciones. Se respeta hasta que el profe vuelva a guardar.
  function statementsOnly(id,path){
    if(state.admin||can(id,path))return false;
    const t=target(id,path);
    if(!T()?.legacyStatements(t.subject))return false;
    const rows=subjectGrants(t.subject);
    return rows.some(g=>g.grant_type!=='node')&&!rows.some(g=>g.grant_type==='node')&&reach(id,path.split('/').slice(0,-1).join('/')||'*');
  }
  function level(id){
    if(state.admin)return'full';
    if(!reach(id))return'none';
    return can(id)?'full':'partial';
  }
  const hasSubject=id=>reach(id);
  const hasPractice=id=>can(id);
  const hasAnswers=id=>can(id);
  const hasEvaluations=id=>can(id);

  function subjectFromHref(href){
    try{
      const url=new URL(href,location.href);
      const id=url.searchParams.get('subject');
      if(id)return id;
      const view=url.searchParams.get('view');
      if(view==='chemistry')return'quimica-general-4';
      if(view==='physics')return'fisica-aplicada-4';
      if(view==='inorganic')return'quimica-inorganica-4';
      if(view==='cualitativa')return'quimica-analitica-cualitativa-5';
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
      .et27-section-lock{display:flex;gap:12px;align-items:flex-start;margin:6px 0;padding:16px 18px;border:1px dashed var(--border,var(--m-border,#c9d8e2));border-radius:16px;background:var(--surface2,var(--m-soft,#f5f8fb));color:inherit}
      .et27-section-lock>span{font-size:22px;line-height:1}
      .et27-section-lock b{display:block;margin-bottom:3px}.et27-section-lock small{opacity:.8;line-height:1.45}
      a.et27-nav-locked,button.et27-nav-locked{opacity:.55;position:relative;cursor:not-allowed}
      a.et27-nav-locked::after{content:"🔒";position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:.8em}
      .examChoice.et27-choice-locked,.choice.et27-choice-locked{opacity:.55;cursor:not-allowed}
      html[data-theme='dark'] .et27-locked-page{background:#101822;color:#edf3f8}
      html[data-theme='dark'] .et27-locked-card{background:#152536;border-color:#3b566f}
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
      ?(reach(subjectId)?`Tu profe todavía no te habilitó esta parte de ${name}. Lo demás que tenés habilitado sigue disponible desde la materia.`:`Tu cuenta no tiene acceso a ${name}. Si creés que es un error, pedile al profe que te la habilite.`)
      :`${name} es contenido para alumnos con cuenta. Ingresá para pedir acceso, o mirá las muestras gratis en Plan y materias.`;
    const actions=state.authenticated
      ?`<a class="primary" href="./">Volver al inicio</a><a href="./?view=subjects">Ver mis materias</a>`
      :`<a class="primary" href="./" data-et27-login>Ingresar</a><a href="./?view=subjects">Ver muestras gratis</a>`;
    return `<section class="et27-locked-card" data-et27-lock="${escapeHtml(subjectId)}"><div class="et27-locked-icon" aria-hidden="true">🔒</div><small>27xSOLved · acceso</small><h1>${escapeHtml(name)}</h1><p>${escapeHtml(message)}</p><div class="et27-locked-actions">${actions}</div></section>`;
  }
  // Aviso que reemplaza a una sección no habilitada (el contenido original se elimina del DOM).
  function sectionLockHtml(title,kind){
    const what=kind==='exercises'?'Este bloque de ejercicios':'Esta parte';
    return `<div class="et27-section-lock" data-et27-section-lock><span aria-hidden="true">🔒</span><div><b>${escapeHtml(title||'Contenido no habilitado')}</b><small>${what} todavía no está habilitada para tu cuenta. Tu profe la puede habilitar desde el panel de accesos.</small></div></div>`;
  }

  // ---------- Muestra para invitados ----------
  const isGuest=()=>!state.authenticated;
  const previewSubjects=()=>Object.values(GUEST_PREVIEW);
  const isPreview=id=>isGuest()&&previewSubjects().includes(id);

  function previewCta(subjectId){
    const name=catalogSubjects().find(s=>s.id===subjectId)?.name||'esta materia';
    return `<section class="et27-preview-cta et27-locked-card" data-et27-preview-cta><div class="et27-locked-icon" aria-hidden="true">✨</div><small>Muestra gratis</small><h2>Hasta acá llega la muestra de ${escapeHtml(name)}</h2><p>El resto del contenido (teoría completa, ejercicios resueltos y modelos de evaluación) está disponible para alumnos con cuenta habilitada.</p><div class="et27-locked-actions"><a class="primary" href="./" data-et27-login>Ingresar</a><a href="./?view=subjects">Volver a materias</a></div></section>`;
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
      shell.insertAdjacentHTML('afterbegin','<div class="et27-access-notice"><b>No tenés materias habilitadas todavía.</b><span>Cuando el profe te habilite contenidos, van a aparecer acá automáticamente.</span></div>');
    }
  }

  function lockWholePage(subjectId){
    if(document.body.dataset.et27Locked==='1')return;
    document.body.dataset.et27Locked='1';
    document.body.innerHTML=`<main class="et27-locked-page">${lockedCard(subjectId)}</main>`;
  }

  // Reemplaza el contenido de una sección no habilitada. Idempotente: si otro script vuelve a
  // escribir adentro, se vuelve a bloquear.
  function lockSection(el,title,kind){
    const lock=el.querySelector(':scope > [data-et27-section-lock]');
    if(lock&&el.children.length===1&&el.dataset.et27Locked==='1')return;
    el.dataset.et27Locked='1';
    el.removeAttribute('data-searchable');
    el.innerHTML=sectionLockHtml(title,kind);
  }
  function markNav(id,locked){
    document.querySelectorAll(`a[href="#${CSS.escape(id)}"]`).forEach(a=>{
      a.classList.toggle('et27-nav-locked',locked);
      if(locked)a.setAttribute('aria-disabled','true');else a.removeAttribute('aria-disabled');
    });
  }
  function nodeTitle(subjectId,path,el){
    const node=T()?.find(T().resolve(subjectId).subject,path);
    const heading=el?.querySelector('h2,h3')?.textContent?.trim();
    return{title:node?.label||heading||'Contenido no habilitado',kind:node?.kind||''};
  }

  // Aplica el árbol a una página estática: cada sección del mapa se deja o se reemplaza.
  // Las secciones que no figuran en el mapa sólo se muestran con la materia completa.
  function patchSections(subjectId,map,rootSel,prefixPath){
    const root=document.querySelector(rootSel);
    if(!root)return{allowed:0,total:0};
    let allowed=0,total=0;
    const mapped=new Set(Object.keys(map||{}));
    Object.entries(map||{}).forEach(([id,path])=>{
      const el=document.getElementById(id);
      if(!el||!root.contains(el))return;
      total+=1;
      const full=prefixPath?`${prefixPath}`:path;
      const ok=can(subjectId,prefixPath?'*':full);
      if(ok){allowed+=1;markNav(id,false);return}
      const {title,kind}=nodeTitle(subjectId,full,el);
      lockSection(el,title,kind);markNav(id,true);
    });
    root.querySelectorAll(':scope > section[id], :scope > .lesson-section[id]').forEach(el=>{
      if(mapped.has(el.id))return;
      if([...mapped].some(id=>el.querySelector(`#${CSS.escape(id)}`)))return; // contenedor de secciones mapeadas
      total+=1;
      if(can(subjectId)){allowed+=1;return}
      lockSection(el,el.querySelector('h2')?.textContent?.trim()||'Contenido nuevo',''); markNav(el.id,true);
    });
    return{allowed,total};
  }

  // Química y Física viven dentro de la app principal: se bloquea sólo el contenido, sin redirigir.
  function currentAppSubject(){
    const view=document.documentElement.dataset.view||new URLSearchParams(location.search).get('view')||'';
    if(view==='chemistry'||view==='unit')return'quimica-general-4';
    if(view==='physics')return'fisica-aplicada-4';
    if(view==='inorganic')return'quimica-inorganica-4';
    if(view==='cualitativa')return'quimica-analitica-cualitativa-5';
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

  // ---------- Páginas estáticas de Matemática (y resúmenes sueltos) ----------
  const MATH_HUB_TARGETS={
    'matematica-1-examen-1.html':['clases/ex1','previas/ex1'],
    'matematica-1-examen-1.html#teoria':['clases/ex1'],
    'matematica-1.html':['clases/ex2','previas/ex2'],
    'matematica-1.html#ruta':['clases/ex2']
  };
  function patchMathHub(subjectId){
    document.querySelectorAll('a.examChoice,a.choice').forEach(a=>{
      const href=a.getAttribute('href')||'';
      if(href.startsWith('#'))return;
      let key='';try{const u=new URL(href,location.href);key=pageFile(u.href)+(u.hash||'')}catch(_){return}
      const paths=MATH_HUB_TARGETS[key]||MATH_HUB_TARGETS[key.split('#')[0]];
      if(!paths)return;
      const ok=paths.some(p=>reach(subjectId,p));
      a.classList.toggle('et27-choice-locked',!ok);
      if(!ok){a.dataset.et27Href=a.dataset.et27Href||href;a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='Todavía no está habilitado para tu cuenta'}
    });
  }
  function patchStaticPage(subjectId){
    if(!hasSubject(subjectId)){
      if(isPreview(subjectId)){previewDone=previewCut(subjectId);return}
      return lockWholePage(subjectId);
    }
    const standalone=T()?.standalone(subjectId,FILE);
    if(standalone==='*'&&!can(subjectId))return lockWholePage(subjectId);
    if(standalone)return; // '@rules': hoja de fórmulas, disponible con cualquier acceso
    if(FILE==='matematica-1-inicio.html')return patchMathHub(subjectId);
    const map=T()?.pageMap(subjectId,FILE);
    if(!map)return;
    const res=patchSections(subjectId,map,'.math-main, main');
    if(res.total&&!res.allowed&&!state.admin)lockWholePage(subjectId);
  }

  // ---------- materia.html (Procesos, materias en esqueleto y TP) ----------
  function patchGenericSections(subjectId){
    if(!hasSubject(subjectId)){
      if(isPreview(subjectId)){previewDone=previewCut(subjectId);return}
      return lockGenericPage(subjectId);
    }
    const r=T()?.resolve(subjectId)||{subject:subjectId,prefix:''};
    const map=r.prefix?Object.fromEntries(Object.keys(T().pageMap('__standard__','materia.html')||{}).map(k=>[k,k])):T()?.pageMap(r.subject,'materia.html');
    patchSections(subjectId,map,'.subject-main',r.prefix?'tp':'');
    document.documentElement.dataset.et27Answers=can(subjectId,'u4/ejercicios')?'1':'0';
    document.documentElement.dataset.et27Evaluations=can(subjectId,'u4/parciales')?'1':'0';
    if(subjectId==='procesos-operaciones-4')patchProcessAnswers();
  }

  function patchProcessAnswers(){
    if(state.admin)return; // el modo profe ya muestra la resolución docente
    const allowed=can('procesos-operaciones-4','u4/ejercicios');
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

  // Física: los modelos de evaluación los inserta physics-model-evaluations.js.
  function patchPhysics(){
    const box=document.querySelector('#physics-model-evaluations');
    if(!box||state.admin)return;
    if(can('fisica-aplicada-4','tension/evaluaciones'))return;
    lockSection(box,'Modelos de evaluación','exercises');
    document.querySelectorAll('[data-physics-scroll="evaluations"],a[href="#physics-model-evaluations"]').forEach(n=>n.classList.add('et27-nav-locked'));
  }

  function applyDomPermissions(){
    addStyles();
    if(!loaded)return; // no bloquear nada hasta saber quién es el usuario
    patchAcademicPlan();
    const genericId=new URLSearchParams(location.search).get('subject')||'';
    if(genericId&&document.getElementById('subjectApp'))patchGenericSections(genericId);
    const pageSubject=PAGE_SUBJECTS[FILE];
    if(pageSubject)patchStaticPage(pageSubject);
    lockAppContent();
    patchPhysics();
    if(guestPreviewPage&&previewDone)releaseGate();
  }

  async function load(){
    addStyles();
    let auth=storedSession();
    if(!auth){
      state={...EMPTY};
      return state;
    }
    try{
      let user=await verifyUser(auth);
      if(!user){
        const renewed=await refreshSession(auth);
        if(renewed){auth=renewed;user=await verifyUser(auth)}
      }
      if(!user){state={...EMPTY,error:'La sesión venció. Volvé a ingresar.'};return state}
      const email=String(user.email||'').trim().toLowerCase();
      const confirmed=!!(user.email_confirmed_at||user.confirmed_at);
      if(!email||!confirmed){state={...EMPTY,authenticated:!!email,email,error:'Confirmá tu correo para ver tus materias.'};return state}
      const admin=email===String(CFG.adminEmail||'').trim().toLowerCase();
      if(admin){
        state={authenticated:true,verified:true,admin:true,active:true,email,profile:{email,active:true,role:'admin'},grants:[],error:null};
        return state;
      }
      const [profiles,grants]=await Promise.all([
        api(`/rest/v1/access_profiles?select=email,active,role,access_starts_at,access_expires_at&email=eq.${encodeURIComponent(email)}`,auth),
        api(`/rest/v1/access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${encodeURIComponent(email)}`,auth)
      ]);
      const profile=Array.isArray(profiles)?profiles[0]||null:null;
      state={authenticated:true,verified:true,admin:false,active:profileIsActive(profile),email,profile,grants:Array.isArray(grants)?grants:[],error:null};
    }catch(error){
      console.error('27xSOLved access check',error);
      const email=String(auth?.raw?.user?.email||'').toLowerCase();
      state={...EMPTY,authenticated:!!email,email,error:error?.message||'No se pudo comprobar el acceso.'};
    }
    return state;
  }
  const signatureOf=s=>JSON.stringify([s.authenticated,s.admin,s.active,s.email,s.profile?.access_expires_at||null,s.grants.map(g=>`${g.subject}|${g.unit_no}|${g.grant_type}|${g.grant_key}`).sort()]);

  const pageSubjectId=PAGE_SUBJECTS[FILE]||new URLSearchParams(location.search).get('subject')||'';
  const guestPreviewPage=!storedSession()&&Object.values(GUEST_PREVIEW).includes(pageSubjectId);
  function releaseGate(){document.documentElement.classList.remove('et27-pending')}
  const needsGate=(
    Boolean(PAGE_SUBJECTS[FILE])||
    (Boolean(new URLSearchParams(location.search).get('subject'))&&FILE==='materia.html')||
    ['chemistry','physics','unit','inorganic','cualitativa'].includes(new URLSearchParams(location.search).get('view')||'')
  );
  if(needsGate){
    document.documentElement.classList.add('et27-pending');
    // Red de seguridad: si algo tarda, se corta igual antes de mostrar.
    setTimeout(()=>{if(guestPreviewPage){pageReady=true;applyDomPermissions()}releaseGate()},10000);
  }
  function announce(type){
    document.dispatchEvent(new CustomEvent(type,{detail:{authenticated:state.authenticated,admin:state.admin,active:state.active}}));
  }
  let refreshing=null;
  // Vuelve a leer los permisos (al volver a la pestaña, al cambiar la sesión o a pedido).
  async function refresh(){
    if(refreshing)return refreshing;
    const before=signatureOf(state);
    refreshing=load().then(()=>{
      loadedAt=Date.now();
      const changed=signatureOf(state)!==before;
      if(changed){
        pathCache.clear();
        // En páginas estáticas el contenido quitado no se puede restituir: se recarga.
        if(!document.getElementById('app')&&loaded&&(document.querySelector('[data-et27-locked="1"],[data-et27-lock]')||!state.active))location.reload();
        applyDomPermissions();
        announce('et27-access-changed');
      }
      return state;
    }).finally(()=>{refreshing=null});
    return refreshing;
  }
  const ready=load().finally(()=>{
    loaded=true;loadedAt=Date.now();
    applyDomPermissions();
    if(!guestPreviewPage)releaseGate();
    announce('et27-access-ready');
  });
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&loaded&&Date.now()-loadedAt>30000)refresh()});

  window.ET27Access={
    ready,
    get state(){return state},
    get loaded(){return loaded},
    isVerifiedAdmin:()=>loaded&&state.verified&&state.admin,
    canonicalSubject,
    catalogSubjectId,
    can,
    reach,
    statementsOnly,
    granted:id=>new Set(state.admin?['*']:granted(T()?.resolve(id).subject||id)),
    level,
    hasSubject,
    hasPractice,
    hasAnswers,
    hasEvaluations,
    sectionLockHtml,
    guestPreview:GUEST_PREVIEW,
    refresh
  };

  document.addEventListener('click',e=>{
    if(e.target.closest?.('[data-et27-login]')){try{localStorage.removeItem('cbc-mode')}catch(_){}}
    const lockedChoice=e.target.closest?.('.et27-choice-locked,a.et27-nav-locked');
    if(lockedChoice){e.preventDefault();e.stopPropagation()}
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
