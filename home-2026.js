// 27xSOLved · inicio nuevo (octubre 2026).
// Admin (modo profe): el inicio es la grilla de años → ventana con las materias del año → cartel Teoría / TP / Machete.
// Alumno: su año (lo puede cambiar), sus materias en filas (las no habilitadas en gris con candado),
//         "Seguir donde dejaste", etiqueta "Nuevo", y horario/tareas como botoncitos opcionales.
// La misma grilla de años reemplaza la vista "Plan y materias" para todos.
(function(){
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(k,f)=>{try{const v=localStorage.getItem(k);return v===null?f:JSON.parse(v)}catch(_){return f}};
  const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};

  const YEAR_COLORS={1:'#F38C1B',2:'#E0567A',3:'#C9A100',4:'#15579D',5:'#1E9E6A',6:'#7A4CC2',7:'#0E8C9A'};
  const color=y=>YEAR_COLORS[y]||'#15579D';
  // Machete / fórmulas disponibles por materia.
  const MACHETE={
    'fisica-aplicada-4':'./fisica-formulas-a4.html',
    'quimica-analitica-cualitativa-5':'./?view=cualitativa&machete=1'
  };
  const HREF_FIX={'matematica-1':'./matematica-1-inicio.html'};
  const PLANNER_UI='27xsolved-planner-ui-v1';

  // ---------- Catálogo ----------
  const years=()=>(window.ET27_ACADEMIC_CATALOG?.years||[]).slice().sort((a,b)=>a.year-b.year);
  const tpName=n=>String(n||'').replace(/^TP\s*\/\s*Laboratorio de\s*/i,'').trim().toLowerCase();
  function subjectsOf(year){
    const y=years().find(x=>x.year===Number(year));if(!y)return[];
    const labs=y.subjects.filter(s=>s.kind!=='Materia');
    return y.subjects.filter(s=>s.kind==='Materia').map(s=>{
      const tp=labs.find(t=>tpName(t.name)===s.name.toLowerCase());
      return{...s,year:y.year,href:HREF_FIX[s.id]||s.href,tp,machete:MACHETE[s.id]||null};
    });
  }
  function findSubject(id){for(const y of years()){const s=subjectsOf(y.year).find(x=>x.id===id);if(s)return s}return null}
  function options(s){
    const out=[{id:'teoria',label:'Teoría',icon:'📖',href:s.href,note:s.status}];
    if(s.tp)out.push({id:'tp',label:'TP',icon:'🧪',href:s.tp.href,note:s.tp.status});
    if(s.machete)out.push({id:'machete',label:'Machete',icon:'📋',href:s.machete,note:'Fórmulas y tablas a mano'});
    return out;
  }
  const isReady=s=>s.id==='matematica-1'||s.status==='Disponible'||/cargad[oa]/i.test(s.status||'');

  // ---------- Quién mira ----------
  function role(){
    const st=window.ET27Access?.state||{};
    const cloud=window.ET27Cloud?.me||{};
    if(st.admin||cloud.admin)return'admin';
    if(st.authenticated||cloud.authenticated)return'student';
    return'guest';
  }
  function canOpen(s){
    const r=role();
    if(r==='admin')return true;
    if(r==='guest')return window.ET27Access?.guestPreview?.[s.year]===s.id;
    const lvl=window.ET27Access?.level?.(s.id)||'none';
    return lvl!=='none';
  }
  const firstName=()=>{const n=window.ET27Cloud?.me?.name||'';return n.split(/\s+/)[0]||''};
  const myYear=()=>window.ET27Cloud?.year||null;

  // ---------- Nuevo para vos ----------
  const GLOBALS={'quimica-analitica-cualitativa-5':'ET27_QAC5','quimica-inorganica-4':'ET27_QI4','quimica-general-4':'ET27_QG4','fisica-aplicada-4':'ET27_PHYSICS'};
  function hash(str){let h=5381;for(let i=0;i<str.length;i++)h=((h<<5)+h+str.charCodeAt(i))|0;return(h>>>0).toString(36)}
  function fingerprint(s){
    const parts=[s.status,s.tp?.status||''];
    const content=window.ET27_ACADEMIC_CATALOG?.content?.[s.id];
    if(content)try{parts.push(JSON.stringify(content).length)}catch(_){}
    const g=window[GLOBALS[s.id]];
    const units=g?.units||g?.topics||[];
    if(Array.isArray(units))parts.push(units.map(u=>`${u.id||u.n||''}:${u.title||''}:${(u.sections||[]).length}:${(u.exercises||[]).length}`).join('|'));
    return hash(parts.join('§'));
  }
  function isNew(s){
    const cloud=window.ET27Cloud;if(!cloud||role()==='admin')return false;
    const seen=cloud.getSeen();
    if(!seen.__init)return false;
    return seen[s.id]!==undefined?seen[s.id]!==fingerprint(s):isReady(s);
  }
  function initSeen(list){
    const cloud=window.ET27Cloud;if(!cloud||role()==='admin')return;
    const seen=cloud.getSeen();if(seen.__init)return;
    const map={__init:1};list.forEach(s=>{map[s.id]=fingerprint(s)});
    cloud.setSeen(map);
  }
  function markSeen(s){
    const cloud=window.ET27Cloud;if(!cloud||role()==='admin')return;
    const seen=cloud.getSeen();if(seen[s.id]===fingerprint(s))return;
    cloud.setSeen({...seen,__init:1,[s.id]:fingerprint(s)});
  }

  // ---------- Piezas ----------
  function yearGrid(){
    const mine=role()==='student'?myYear():null;
    return `<div class="h27-years" role="list">${years().map(y=>{
      const list=subjectsOf(y.year);
      const open=role()==='admin'?list.length:list.filter(canOpen).length;
      const count=role()==='admin'?`${list.length} materia${list.length===1?'':'s'}`:(open?`${open} habilitada${open===1?'':'s'}`:`${list.length} materia${list.length===1?'':'s'}`);
      return `<button type="button" role="listitem" class="h27-year ${mine===y.year?'is-mine':''}" style="--yc:${color(y.year)}" data-h27-year="${y.year}">
        <b>${y.year}<sup>º</sup></b><span>año</span><small>${esc(count)}</small>${mine===y.year?'<i>Tu año</i>':''}
      </button>`}).join('')}</div>`;
  }
  function subjectRow(s){
    const ok=canOpen(s);
    const nu=ok&&isNew(s);
    const extra=[s.tp?'TP':'',s.machete?'Machete':''].filter(Boolean).join(' · ');
    return `<button type="button" class="h27-row ${ok?'':'is-locked'}" style="--yc:${color(s.year)}" data-h27-subject="${esc(s.id)}">
      <span class="h27-mark">${esc(s.letter||'')}</span>
      <span class="h27-rowText"><strong>${esc(s.name)}</strong><small>${ok?esc([isReady(s)?'Teoría':'En preparación',extra].filter(Boolean).join(' · ')):'Sin acceso todavía'}</small></span>
      ${nu?'<em class="h27-new">Nuevo</em>':''}
      <b aria-hidden="true">${ok?'›':'🔒'}</b>
    </button>`;
  }
  function subjectList(year){
    const list=subjectsOf(year);
    if(!list.length)return'<p class="h27-empty">Todavía no hay materias cargadas en este año.</p>';
    return `<div class="h27-rows">${list.map(subjectRow).join('')}</div>`;
  }
  function continueCard(){
    const item=window.ET27Cloud?.getContinue?.();
    if(!item?.href)return'';
    const s=findSubject(item.subject);
    if(s&&!canOpen(s))return'';
    return `<a class="h27-continue" href="${esc(item.href)}" data-h27-continue>
      <span class="h27-play" aria-hidden="true">▶</span>
      <span><small>Seguir donde dejaste</small><strong>${esc(item.label)}</strong><em>${esc(item.subjectName||'')}</em></span>
    </a>`;
  }
  function plannerBlock(){
    const ui=read(PLANNER_UI,{});
    const has={schedule:(window.ET27Planner?.scheduleData?.()||[]).length>0,tasks:(window.ET27Planner?.checklistData?.()||[]).length>0};
    const show=k=>ui[k]==='open'||(ui[k]!=='closed'&&has[k]);
    const pills=[];
    if(!show('schedule'))pills.push('<button type="button" class="h27-pill" data-h27-open-planner="schedule">+ Agregar horario semanal</button>');
    if(!show('tasks'))pills.push('<button type="button" class="h27-pill" data-h27-open-planner="tasks">+ Agregar tareas</button>');
    return `${pills.length?`<div class="h27-pills">${pills.join('')}</div>`:''}
      ${show('schedule')?'<section class="ui-weekly-schedule-section h27-planner"></section>':''}
      ${show('tasks')?'<section class="ui-checklist-host h27-planner h27-tasks"></section>':''}`;
  }

  function adminHome(){
    return `<section class="h27-home h27-admin" data-h27-root="home">
      <header class="h27-head"><div><span class="eyebrow">Modo profe</span><h1>Plan y materias</h1><p>Elegí el año y después la materia.</p></div></header>
      ${yearGrid()}
      <button type="button" class="h27-panel" data-h27-admin><span aria-hidden="true">⚙</span><span><strong>Panel de control</strong><small>Accesos y actividad de tus alumnos</small></span><b aria-hidden="true">›</b></button>
    </section>`;
  }
  function studentHome(){
    const y=myYear();
    const hello=firstName()?`Hola, ${esc(firstName())}`:'Hola';
    if(!y)return `<section class="h27-home" data-h27-root="home">
      <header class="h27-head"><div><span class="eyebrow">${role()==='guest'?'Modo invitado':'Bienvenido'}</span><h1>${hello}</h1><p>¿En qué año estás? Así te dejamos tus materias a mano cada vez que entres.</p></div></header>
      ${pickYearButtons()}
    </section>`;
    const list=subjectsOf(y);
    initSeen(list);
    return `<section class="h27-home" data-h27-root="home" style="--yc:${color(y)}">
      <header class="h27-head h27-studentHead">
        <div><span class="eyebrow">${role()==='guest'?'Modo invitado':'Tu año'}</span><h1>${hello}</h1></div>
        <button type="button" class="h27-yearChip" data-h27-change-year><b>${y}.º año</b><span>Cambiar</span></button>
      </header>
      ${continueCard()}
      <div class="h27-sectionTitle"><h2>Materias de ${y}.º</h2><button type="button" class="textButton" data-h27-allyears>Ver todos los años</button></div>
      ${subjectList(y)}
      ${role()==='guest'?'<p class="h27-guestNote">Estás como invitado: ves una muestra. <button type="button" class="textButton" data-h27-login>Ingresá con Gmail</button> para ver lo que tu profe te habilitó.</p>':''}
      ${role()==='student'?plannerBlock():''}
    </section>`;
  }
  function pickYearButtons(current){
    return `<div class="h27-years h27-pick">${years().map(y=>`<button type="button" class="h27-year ${current===y.year?'is-mine':''}" style="--yc:${color(y.year)}" data-h27-pick-year="${y.year}"><b>${y.year}<sup>º</sup></b><span>año</span></button>`).join('')}</div>`;
  }
  function planPage(){
    return `<section class="h27-home h27-plan" data-h27-root="plan">
      <header class="h27-head"><div><span class="eyebrow">${years().map(y=>`${y.year}.º`).join(' · ')} año</span><h1>Plan y materias</h1><p>Tocá un año para ver sus materias.</p></div></header>
      ${yearGrid()}
    </section>`;
  }

  // ---------- Ventana central ----------
  let modal=null;
  function openModal(html,{label='Ventana',wide=false,onClose}={}){
    closeModal(true);
    modal=document.createElement('div');
    modal.className='h27-overlay';
    modal.innerHTML=`<div class="h27-dialog ${wide?'is-wide':''}" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`;
    modal._onClose=onClose;
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
    document.body.appendChild(modal);
    document.documentElement.classList.add('h27-locked');
    requestAnimationFrame(()=>modal?.classList.add('is-in'));
    setTimeout(()=>$('.h27-dialog button:not([data-h27-close]), .h27-dialog a',modal)?.focus({preventScroll:true}),60);
  }
  function closeModal(instant){
    if(!modal)return;
    const m=modal;modal=null;
    document.documentElement.classList.remove('h27-locked');
    if(instant)m.remove();else{m.classList.remove('is-in');setTimeout(()=>m.remove(),180)}
    m._onClose?.();
  }
  const closeBtn='<button type="button" class="h27-x" data-h27-close aria-label="Cerrar">×</button>';

  function openYear(year){
    const list=subjectsOf(year);
    openModal(`<header class="h27-dHead" style="--yc:${color(year)}"><span class="h27-dYear">${year}<sup>º</sup></span><div><h2>${year}.º año</h2><p>${list.length} materia${list.length===1?'':'s'}</p></div>${closeBtn}</header>${subjectList(year)}`,{label:`${year}.º año`});
  }
  function openSubject(id,fromYear){
    const s=findSubject(id);if(!s)return;
    if(!canOpen(s))return openLocked(s,fromYear);
    const opts=options(s);
    if(opts.length===1){go(s,opts[0]);return}
    const back=fromYear?`<button type="button" class="h27-back" data-h27-year="${s.year}">‹ ${s.year}.º año</button>`:'';
    openModal(`<header class="h27-dHead h27-sHead" style="--yc:${color(s.year)}">${back}<span class="h27-mark">${esc(s.letter||'')}</span><div><h2>${esc(s.name)}</h2><p>${s.year}.º año</p></div>${closeBtn}</header>
      <div class="h27-choices">${opts.map(o=>`<button type="button" class="h27-choice" data-h27-go="${esc(s.id)}|${o.id}"><span aria-hidden="true">${o.icon}</span><strong>${esc(o.label)}</strong><small>${esc(o.note||'')}</small></button>`).join('')}</div>`,{label:s.name});
  }
  function openLocked(s,fromYear){
    const guest=role()==='guest';
    const back=fromYear?`<button type="button" class="h27-back" data-h27-year="${s.year}">‹ ${s.year}.º año</button>`:'';
    openModal(`<header class="h27-dHead h27-sHead" style="--yc:${color(s.year)}">${back}<span class="h27-mark">🔒</span><div><h2>${esc(s.name)}</h2><p>${s.year}.º año</p></div>${closeBtn}</header>
      <p class="h27-lockText">${guest?'Para ver esta materia tenés que ingresar con tu cuenta.':'Esta materia todavía no está habilitada para vos. Pedile acceso a tu profe.'}</p>
      ${guest?'<button type="button" class="primary h27-wide" data-h27-login>Ingresar con Gmail</button>':'<button type="button" class="secondary h27-wide" data-h27-close>Entendido</button>'}`,{label:s.name});
  }
  function openYearPicker(){
    const cur=myYear();
    openModal(`<header class="h27-dHead"><div><h2>¿En qué año estás?</h2><p>${role()==='student'?'Si pasaste de año, elegí el nuevo. Tu profe va a ver el cambio.':'Elegí tu año para tener tus materias a mano.'}</p></div>${closeBtn}</header>${pickYearButtons(cur)}`,{label:'Elegir año'});
  }
  function openNotice(){
    openModal(`<header class="h27-dHead"><div><h2>Antes de empezar</h2></div></header>
      <p class="h27-lockText">Tu profe puede ver <b>cuándo entrás a la app</b> y <b>qué temas abrís</b>, para saber qué se está usando y acompañarte mejor. Tu horario y tus tareas son privados.</p>
      <button type="button" class="primary h27-wide" data-h27-ack>Entendido</button>`,{label:'Aviso',onClose:()=>window.ET27Cloud?.ackNotice?.()});
  }

  function go(s,o){
    markSeen(s);
    closeModal(true);
    if(window.ET27Cloud&&role()!=='admin'){
      const label=o.id==='teoria'?s.name:`${s.name} · ${o.label}`;
      window.ET27Cloud.setContinue({label,subject:s.id,subjectName:s.name,href:o.href,at:new Date().toISOString()});
    }
    location.assign(o.href);
  }
  function goAdmin(){
    const native=$$('[data-v="admin"]').find(n=>n.isConnected);
    if(native){native.click();return}
    location.assign('./?view=admin');
  }

  // ---------- Montaje ----------
  let lastSig='';
  function signature(){
    return JSON.stringify([role(),myYear(),window.ET27Access?.state?.grants?.length||0,window.ET27Access?.state?.active,read(PLANNER_UI,{}),window.ET27Cloud?.getContinue?.()?.label||'',(window.ET27Planner?.scheduleData?.()||[]).length>0,(window.ET27Planner?.checklistData?.()||[]).length>0]);
  }
  function mount(force){
    const content=$('#app .main .content')||$('#app .content');
    if(!content)return;
    // Inicio
    const greeting=$('.homeGreeting',content);
    const existing=$('[data-h27-root]',content);
    const isHome=!!greeting||existing?.dataset.h27Root==='home';
    const planIntro=$$('.pageIntro',content).find(n=>/Mis materias|Plan y materias/i.test($('h1',n)?.textContent||''));
    const isPlan=!!planIntro||existing?.dataset.h27Root==='plan';
    if(!isHome&&!isPlan)return;
    const sig=signature()+(isHome?'h':'p');
    if(existing&&!force&&sig===lastSig)return;
    lastSig=sig;
    const html=isHome?(role()==='admin'?adminHome():studentHome()):planPage();
    if(existing){existing.outerHTML=html}
    else{
      const host=document.createElement('div');host.innerHTML=html;
      const node=host.firstElementChild;
      if(isHome){
        $$('.homeGreeting,.homeSection,.homeColumns,.ui-home-secondary,.ui-weekly-schedule-section',content).forEach(n=>n.remove());
        content.prepend(node);
      }else{
        $$('.subjects,[data-academic-plan],.planLink',content).forEach(n=>n.remove());
        planIntro.replaceWith(node);
      }
    }
    window.ET27Planner?.renderSchedule?.(content);
    window.ET27Planner?.renderChecklist?.(content);
    const top=$('#app .top > b');
    if(top&&isHome&&role()==='admin'&&top.textContent!=='Inicio')top.textContent='Inicio';
    if(isHome&&role()==='student'&&window.ET27Cloud?.noticeNeeded?.()&&!modal)openNotice();
  }
  let queued=false;
  function schedule(force){
    if(queued)return;queued=true;
    requestAnimationFrame(()=>{queued=false;mount(force===true)});
  }

  document.addEventListener('click',e=>{
    const t=e.target.closest?.('[data-h27-year],[data-h27-subject],[data-h27-go],[data-h27-close],[data-h27-pick-year],[data-h27-change-year],[data-h27-open-planner],[data-h27-collapse],[data-h27-ack],[data-h27-admin],[data-h27-allyears],[data-h27-login]');
    if(!t)return;
    e.preventDefault();e.stopPropagation();
    if(t.dataset.h27Year)return openYear(Number(t.dataset.h27Year));
    if(t.dataset.h27Subject)return openSubject(t.dataset.h27Subject,!!t.closest('.h27-dialog'));
    if(t.dataset.h27Go){const [id,opt]=t.dataset.h27Go.split('|');const s=findSubject(id);const o=s&&options(s).find(x=>x.id===opt);if(o)go(s,o);return}
    if(t.hasAttribute('data-h27-ack')){closeModal();return}
    if(t.hasAttribute('data-h27-close'))return closeModal();
    if(t.dataset.h27PickYear){
      const year=Number(t.dataset.h27PickYear);
      closeModal(true);
      window.ET27Cloud?.setYear?.(year);
      schedule(true);return;
    }
    if(t.hasAttribute('data-h27-change-year'))return openYearPicker();
    if(t.hasAttribute('data-h27-allyears')){
      openModal(`<header class="h27-dHead"><div><h2>Todos los años</h2><p>Tocá un año para ver sus materias.</p></div>${closeBtn}</header>${yearGrid()}`,{label:'Todos los años'});return;
    }
    if(t.dataset.h27OpenPlanner){const ui=read(PLANNER_UI,{});ui[t.dataset.h27OpenPlanner]='open';write(PLANNER_UI,ui);schedule(true);
      setTimeout(()=>{if(t.dataset.h27OpenPlanner==='schedule')$('[data-ui-schedule-add]')?.click();else $('.ui-checklist-form input')?.focus()},120);return}
    if(t.dataset.h27Collapse){const ui=read(PLANNER_UI,{});ui[t.dataset.h27Collapse]='closed';write(PLANNER_UI,ui);schedule(true);return}
    if(t.hasAttribute('data-h27-admin'))return goAdmin();
    if(t.hasAttribute('data-h27-login')){try{localStorage.removeItem('cbc-mode')}catch(_){}location.assign('./');return}
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal)closeModal()});
  document.addEventListener('et27-year-changed',()=>schedule(true));
  document.addEventListener('et27-access-ready',()=>schedule(true));
  document.addEventListener('et27-planner-updated',()=>schedule(true));

  // Machete de Analítica Cualitativa: ./?view=cualitativa&machete=1 abre las tablas del apéndice.
  (function openMacheteFromUrl(){
    const p=new URLSearchParams(location.search);
    if(p.get('machete')!=='1')return;
    const started=Date.now();
    const timer=setInterval(()=>{
      const btn=$('[data-a="openQacTables"]');
      if(btn){clearInterval(timer);btn.click();p.delete('machete');history.replaceState(null,'',`${location.pathname}${p.toString()?`?${p}`:''}`);return}
      if(Date.now()-started>10000)clearInterval(timer);
    },250);
  })();

  function init(){
    const app=$('#app');if(!app)return;
    new MutationObserver(()=>schedule()).observe(app,{childList:true});
    Promise.allSettled([window.ET27Access?.ready,window.ET27Cloud?.ready]).then(()=>schedule(true));
    schedule(true);
  }
  window.ET27Home={planPage,yearGrid,openYear,openSubject,subjectsOf,refresh:()=>schedule(true)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
