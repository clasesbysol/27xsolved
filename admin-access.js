// 27xSOLved · Panel de control de accesos (reemplaza admin-access-fix.js y admin-access-summary.js).
// Flujo: email → año → materia → nivel (sin acceso / teórica / teórica + evaluaciones / completa).
// Usa las tablas existentes access_profiles y access_grants; no requiere cambios en Supabase.
//
// Convención en access_grants (unit_no 1 salvo que se indique):
//   completa            → unit/* (Química: unidades 1–13) + resource/answers + evaluation/*
//   teórica             → guide/theory (+ Física: resource/theory, resource/methods;
//                                       + Química: chapter/<key> de cada capítulo cargado)
//   teórica + evaluac.  → lo anterior + evaluation/* (+ Química: secciones evaluation/partial)
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const ALIASES={'quimica-general-4':'chemistry','fisica-aplicada-4':'physics_applied'};
  const LEVELS=[
    {id:'none',label:'Sin acceso',short:''},
    {id:'theory',label:'Solo teórica',short:'Teórica'},
    {id:'theory_eval',label:'Teórica + evaluaciones',short:'Teórica + eval.'},
    {id:'full',label:'Materia completa',short:'Completa'}
  ];
  const THEORY_TYPES_EXCLUDED=['evaluation','partial','practice','guide'];
  const EVAL_TYPES=['evaluation','partial'];

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dbSubject=id=>ALIASES[id]||id;
  const levelLabel=id=>LEVELS.find(l=>l.id===id)?.label||'Sin acceso';
  const levelShort=id=>LEVELS.find(l=>l.id===id)?.short||'';

  function years(){
    return (window.ET27_ACADEMIC_CATALOG?.years||[])
      .map(y=>({year:y.year,subjects:(y.subjects||[]).filter(s=>s.kind==='Materia')}))
      .filter(y=>y.subjects.length);
  }
  function allSubjects(){return years().flatMap(y=>y.subjects.map(s=>({...s,year:y.year,db:dbSubject(s.id)})))}
  function subjectByDb(db){return allSubjects().find(s=>s.db===db)}

  // ---------- Estado (sobrevive a los re-render de app.js) ----------
  const st={
    email:'',loadedEmail:'',levels:{},original:{},profile:null,
    openYear:null,openSubject:null,
    duration:'1m',customDate:'',
    users:[],grants:[],listLoaded:false,listError:'',
    busy:false,loadingEmail:false,msg:'',msgType:'info',
    chemSections:null
  };

  // ---------- Supabase REST ----------
  function token(){
    const ref=(()=>{try{return new URL(CFG.supabaseUrl).hostname.split('.')[0]}catch(_){return''}})();
    const keys=ref?[`sb-${ref}-auth-token`]:[];
    for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&/^sb-.+-auth-token$/.test(k)&&!keys.includes(k))keys.push(k)}
    for(const key of keys){
      try{
        let raw=JSON.parse(localStorage.getItem(key)||'null');
        if(typeof raw==='string')raw=JSON.parse(raw);
        const t=raw?.access_token||raw?.currentSession?.access_token||raw?.session?.access_token;
        if(t)return t;
      }catch(_){}
    }
    return '';
  }
  async function api(path,options={}){
    const t=token();
    if(!t)throw new Error('No encontré la sesión. Cerrá sesión y volvé a entrar.');
    const res=await fetch(`${CFG.supabaseUrl}/rest/v1/${path}`,{
      ...options,cache:'no-store',
      headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${t}`,'Content-Type':'application/json',...(options.headers||{})}
    });
    const text=await res.text();
    let data=null;if(text){try{data=JSON.parse(text)}catch(_){data=text}}
    if(!res.ok)throw new Error(data?.message||data?.hint||data?.details||`Error ${res.status}`);
    return data;
  }
  const enc=encodeURIComponent;
  const inList=values=>`in.(${values.map(v=>`"${String(v).replace(/"/g,'')}"`).join(',')})`;

  // ---------- Niveles <-> permisos ----------
  function levelFromRows(rows){
    if(!rows.length)return 'none';
    if(rows.some(g=>g.grant_type==='unit'&&g.grant_key==='*'))return 'full';
    return rows.some(g=>g.grant_type==='evaluation')?'theory_eval':'theory';
  }
  function levelsFromGrants(grants){
    const out={};
    allSubjects().forEach(s=>{out[s.db]=levelFromRows(grants.filter(g=>g.subject===s.db))});
    return out;
  }
  async function chemistrySections(){
    if(st.chemSections)return st.chemSections;
    const rows=await api('course_sections?select=unit_no,section_type,section_key&subject=eq.chemistry');
    st.chemSections=Array.isArray(rows)?rows:[];
    return st.chemSections;
  }
  async function rowsFor(db,level){
    const out=[];
    const add=(unit_no,grant_type,grant_key)=>out.push({subject:db,unit_no,grant_type,grant_key});
    if(level==='none')return out;
    if(level==='full'){
      (db==='chemistry'?[...Array(13)].map((_,i)=>i+1):[1]).forEach(u=>add(u,'unit','*'));
      add(1,'resource','answers');add(1,'evaluation','*');
      return out;
    }
    add(1,'guide','theory');
    if(level==='theory_eval')add(1,'evaluation','*');
    if(db==='physics_applied'){add(1,'resource','theory');add(1,'resource','methods')}
    if(db==='chemistry'){
      const sections=await chemistrySections();
      sections.forEach(s=>{
        const n=Number(s.unit_no);
        if(!THEORY_TYPES_EXCLUDED.includes(s.section_type))add(n,s.section_type,s.section_key);
        else if(level==='theory_eval'&&EVAL_TYPES.includes(s.section_type))add(n,s.section_type,s.section_key);
      });
    }
    return out;
  }
  const key=g=>`${g.subject}|${Number(g.unit_no)}|${g.grant_type}|${g.grant_key}`;

  // ---------- Fechas ----------
  function expiryFor(existing){
    if(st.duration==='keep')return existing?.access_expires_at??null;
    if(st.duration==='forever')return null;
    if(st.duration==='custom'){
      if(!st.customDate)throw new Error('Elegí una fecha de vencimiento.');
      const d=new Date(`${st.customDate}T23:59:59`);
      if(Number.isNaN(d.getTime()))throw new Error('La fecha no es válida.');
      return d.toISOString();
    }
    const d=new Date();d.setMonth(d.getMonth()+Number(st.duration[0]));d.setHours(23,59,59,999);
    return d.toISOString();
  }
  const fmt=v=>new Intl.DateTimeFormat('es-AR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(v));
  function statusOf(u){
    if(!u.active)return{t:'Suspendido',bad:true};
    if(!u.access_expires_at)return{t:'Sin vencimiento',bad:false};
    return new Date(u.access_expires_at)<Date.now()?{t:'Vencido',bad:true}:{t:`Vence ${fmt(u.access_expires_at)}`,bad:false};
  }
  function summary(email){
    const levels=levelsFromGrants(st.grants.filter(g=>String(g.email).toLowerCase()===email));
    const parts=allSubjects().filter(s=>levels[s.db]!=='none').map(s=>`${s.name} (${levelShort(levels[s.db])})`);
    return parts.length?parts.join(' · '):'Sin materias habilitadas';
  }

  // ---------- Acciones ----------
  async function loadList(){
    try{
      const [users,grants]=await Promise.all([
        api('access_profiles?select=email,active,role,access_starts_at,access_expires_at&order=email'),
        api('access_grants?select=email,subject,unit_no,grant_type,grant_key')
      ]);
      st.users=(users||[]).filter(u=>u.role!=='admin');
      st.grants=grants||[];
      st.listError='';
    }catch(e){st.listError=e.message}
    st.listLoaded=true;
    draw();
  }
  async function loadEmail(email){
    email=String(email||'').trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setMsg('Escribí un email válido.','error');return}
    st.email=email;st.loadingEmail=true;st.msg='';draw();
    try{
      const [profiles,grants]=await Promise.all([
        api(`access_profiles?select=email,active,role,access_starts_at,access_expires_at&email=eq.${enc(email)}`),
        api(`access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${enc(email)}`)
      ]);
      st.profile=(profiles||[])[0]||null;
      st.levels=levelsFromGrants(grants||[]);
      st.original={...st.levels};
      st.loadedEmail=email;
      st.duration=st.profile?'keep':'1m';st.customDate='';
      if(!st.profile)setMsg('Alumno nuevo: elegí materias y guardá.','info',true);
    }catch(e){setMsg(`No pude cargar ese alumno: ${e.message}`,'error',true)}
    st.loadingEmail=false;draw();
  }
  async function save(){
    const email=st.loadedEmail;
    if(!email||st.busy)return;
    const changed=allSubjects().filter(s=>(st.levels[s.db]||'none')!==(st.original[s.db]||'none'));
    const durationChanged=!(st.profile&&st.duration==='keep');
    if(!changed.length&&!durationChanged){setMsg('No hay cambios para guardar.','info');return}
    st.busy=true;setMsg('Guardando…','info');
    try{
      const starts=st.duration==='keep'&&st.profile?.access_starts_at?st.profile.access_starts_at:new Date().toISOString();
      const expires=expiryFor(st.profile);
      await api('access_profiles?on_conflict=email',{
        method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
        body:JSON.stringify({email,active:true,access_starts_at:starts,access_expires_at:expires})
      });
      if(changed.length){
        const dbs=changed.map(s=>s.db);
        let rows=[];
        for(const s of changed)rows=rows.concat(await rowsFor(s.db,st.levels[s.db]||'none'));
        rows=[...new Map(rows.map(r=>[key(r),{email,...r}])).values()];
        await api(`access_grants?email=eq.${enc(email)}&subject=${enc(inList(dbs))}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});
        if(rows.length)await api('access_grants',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(rows)});
        const saved=await api(`access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${enc(email)}&subject=${enc(inList(dbs))}`);
        const a=rows.map(key).sort().join(),b=(saved||[]).map(key).sort().join();
        if(a!==b)throw new Error('Los permisos guardados no coinciden con lo elegido. Revisá la conexión y volvé a guardar.');
      }
      st.original={...st.levels};
      st.profile={...(st.profile||{}),email,active:true,access_starts_at:starts,access_expires_at:expires};
      st.duration='keep';
      setMsg(`✓ Guardado para ${email}.`,'success',true);
      await loadList();
    }catch(e){setMsg(`No se pudo guardar: ${e.message}`,'error',true)}
    st.busy=false;draw();
  }
  async function toggleUser(email,active){
    try{
      await api(`access_profiles?email=eq.${enc(email)}`,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({active})});
      if(st.profile&&st.loadedEmail===email)st.profile.active=active;
      await loadList();
    }catch(e){setMsg(`No pude actualizar a ${email}: ${e.message}`,'error')}
  }
  function setMsg(text,type='info',silent){st.msg=text;st.msgType=type;if(!silent)draw()}

  // ---------- Vista ----------
  function subjectMarkup(s){
    const level=st.levels[s.db]||'none';
    const dirty=level!==(st.original[s.db]||'none');
    const open=st.openSubject===s.db;
    return `<div class="xa-subject ${open?'is-open':''}">
      <button type="button" class="xa-row" data-xa-subject="${esc(s.db)}" aria-expanded="${open}">
        <span class="xa-mark">${esc(s.letter||'')}</span>
        <span class="xa-name">${esc(s.name)}</span>
        <span class="xa-chip ${level==='none'?'is-off':''}">${esc(level==='none'?'Sin acceso':levelShort(level))}${dirty?' •':''}</span>
        <b class="xa-caret" aria-hidden="true">›</b>
      </button>
      ${open?`<div class="xa-levels" role="radiogroup" aria-label="Acceso a ${esc(s.name)}">${LEVELS.map(l=>`<label class="xa-level ${level===l.id?'is-on':''}"><input type="radio" name="xa-${esc(s.db)}" value="${l.id}" data-xa-level="${esc(s.db)}" ${level===l.id?'checked':''}><span>${esc(l.label)}</span></label>`).join('')}</div>`:''}
    </div>`;
  }
  function yearMarkup(y){
    const open=st.openYear===y.year;
    const count=y.subjects.filter(s=>(st.levels[dbSubject(s.id)]||'none')!=='none').length;
    return `<section class="xa-year ${open?'is-open':''}">
      <button type="button" class="xa-row xa-yearRow" data-xa-year="${y.year}" aria-expanded="${open}">
        <span class="xa-name">${y.year}.º año</span>
        <span class="xa-chip ${count?'':'is-off'}">${count?`${count} habilitada${count>1?'s':''}`:`${y.subjects.length} materia${y.subjects.length>1?'s':''}`}</span>
        <b class="xa-caret" aria-hidden="true">›</b>
      </button>
      ${open?`<div class="xa-subjects">${y.subjects.map(s=>subjectMarkup({...s,db:dbSubject(s.id)})).join('')}</div>`:''}
    </section>`;
  }
  function durationMarkup(){
    const opts=[['1m','1 mes'],['2m','2 meses'],['3m','3 meses'],['forever','Por siempre']];
    if(st.profile)opts.unshift(['keep','Mantener actual']);
    const current=st.profile?statusOf(st.profile).t:'';
    return `<div class="xa-block"><b class="xa-label">Duración${current?` <small>· ahora: ${esc(current)}</small>`:''}</b>
      <div class="xa-pills">${opts.map(([k,l])=>`<button type="button" data-xa-duration="${k}" class="${st.duration===k?'is-on':''}">${l}</button>`).join('')}</div>
      <label class="xa-date">Otra fecha <input type="date" data-xa-date value="${esc(st.customDate)}"></label></div>`;
  }
  function editorMarkup(){
    if(!st.loadedEmail)return `<p class="xa-hint">Escribí el email y tocá <b>Buscar</b> para ver o asignar sus materias.</p>`;
    return `<div class="xa-current"><span>Editando</span><b>${esc(st.loadedEmail)}</b></div>
      ${durationMarkup()}
      <div class="xa-block"><b class="xa-label">Materias</b><div class="xa-years">${years().map(yearMarkup).join('')}</div></div>
      <button type="button" class="primary xa-save" data-xa-save ${st.busy?'disabled':''}>${st.busy?'Guardando…':'Guardar acceso'}</button>`;
  }
  function listMarkup(){
    if(!st.listLoaded)return `<div class="xa-empty">Cargando alumnos…</div>`;
    if(st.listError)return `<div class="xa-msg" data-type="error">No pude cargar la lista: ${esc(st.listError)}</div>`;
    if(!st.users.length)return `<div class="xa-empty">Todavía no agregaste alumnos.</div>`;
    return st.users.map(u=>{const s=statusOf(u);const email=String(u.email).toLowerCase();return `<div class="xa-user">
      <div class="xa-userInfo"><b>${esc(u.email)}</b><small>${esc(summary(email))}</small></div>
      <div class="xa-userActions"><span class="xa-status ${s.bad?'is-bad':''}">${esc(s.t)}</span>
      <button type="button" class="secondary small" data-xa-edit="${esc(email)}">Editar</button>
      <button type="button" class="ghost small" data-xa-toggle="${esc(email)}" data-active="${u.active?'1':'0'}">${u.active?'Suspender':'Reactivar'}</button></div></div>`}).join('');
  }
  function markup(){
    return `<section class="xa-card">
      <div class="xa-head"><h2>Accesos por alumno</h2><p>Email → año → materia → nivel de acceso.</p></div>
      <form class="xa-search" data-xa-search>
        <input type="email" data-xa-email placeholder="alumno@gmail.com" value="${esc(st.email)}" autocomplete="off" autocapitalize="off" spellcheck="false">
        <button type="submit" class="primary" ${st.loadingEmail?'disabled':''}>${st.loadingEmail?'Buscando…':'Buscar'}</button>
      </form>
      ${st.msg?`<div class="xa-msg" data-type="${st.msgType}">${esc(st.msg)}</div>`:''}
      ${editorMarkup()}
    </section>
    <section class="xa-card"><div class="xa-head xa-listHead"><h2>Alumnos</h2><span>${st.users.length} registrados</span></div>${listMarkup()}</section>`;
  }

  let root=null;
  function draw(){
    if(!root||!document.contains(root))return;
    const focused=document.activeElement?.matches?.('[data-xa-email]');
    root.innerHTML=markup();
    if(focused)root.querySelector('[data-xa-email]')?.focus();
  }

  function bindRoot(el){
    el.addEventListener('click',e=>{
      const t=e.target.closest('button');if(!t||!el.contains(t))return;
      if(t.dataset.xaYear){const y=Number(t.dataset.xaYear);st.openYear=st.openYear===y?null:y;st.openSubject=null;draw();return}
      if(t.dataset.xaSubject){st.openSubject=st.openSubject===t.dataset.xaSubject?null:t.dataset.xaSubject;draw();return}
      if(t.dataset.xaDuration){st.duration=t.dataset.xaDuration;st.customDate='';draw();return}
      if(t.hasAttribute('data-xa-save')){save();return}
      if(t.dataset.xaEdit){st.openYear=null;st.openSubject=null;loadEmail(t.dataset.xaEdit);el.scrollIntoView({behavior:'smooth',block:'start'});return}
      if(t.dataset.xaToggle){toggleUser(t.dataset.xaToggle,t.dataset.active!=='1');return}
    });
    el.addEventListener('change',e=>{
      const t=e.target;
      if(t.dataset?.xaLevel){st.levels[t.dataset.xaLevel]=t.value;st.msg='';draw();return}
      if(t.hasAttribute?.('data-xa-date')){st.customDate=t.value;st.duration=t.value?'custom':(st.profile?'keep':'1m');draw()}
    });
    el.addEventListener('input',e=>{if(e.target.matches('[data-xa-email]'))st.email=e.target.value});
    el.addEventListener('submit',e=>{if(e.target.matches('[data-xa-search]')){e.preventDefault();loadEmail(st.email)}});
  }

  function addStyles(){
    if(document.getElementById('xa-style'))return;
    const s=document.createElement('style');s.id='xa-style';
    s.textContent=`
      #xa-root{display:grid;gap:18px;margin:8px 0 24px}
      .xa-card{border:1px solid var(--border,#d8e5f0);border-radius:18px;background:var(--surface,#fff);padding:18px;display:grid;gap:14px}
      .xa-head h2{margin:0}.xa-head p{margin:4px 0 0;color:var(--muted,#5b6b7a);font-size:.88rem}
      .xa-listHead{display:flex;justify-content:space-between;align-items:center;gap:10px}.xa-listHead span{color:var(--muted,#5b6b7a);font-weight:800;font-size:.8rem}
      .xa-search{display:flex;gap:8px}.xa-search input{flex:1;min-width:0;padding:12px 14px;border:1px solid var(--border,#d8e5f0);border-radius:12px;font:inherit;background:var(--surface2,#f5f8fb);color:inherit}
      .xa-search button{white-space:nowrap}
      .xa-hint,.xa-empty{margin:0;color:var(--muted,#5b6b7a);font-size:.88rem}
      .xa-msg{padding:10px 12px;border-radius:11px;font-size:.85rem;font-weight:800;border:1px solid var(--border,#d8e5f0);background:var(--surface2,#f5f8fb)}
      .xa-msg[data-type="success"]{color:var(--accent,#15579D);border-color:color-mix(in srgb,var(--accent,#15579D) 35%,transparent)}
      .xa-msg[data-type="error"]{color:#a33f3f;background:#fff3f3;border-color:#e3bcbc}
      :root[data-theme="dark"] .xa-msg[data-type="error"]{background:#2b1c1c;color:#ffb4b4;border-color:#704040}
      .xa-current{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}.xa-current span{font-size:.75rem;font-weight:900;text-transform:uppercase;color:var(--muted,#5b6b7a)}
      .xa-block{display:grid;gap:8px}.xa-label{font-size:.9rem}.xa-label small{font-weight:700;color:var(--muted,#5b6b7a)}
      .xa-pills{display:flex;flex-wrap:wrap;gap:6px}.xa-pills button{border:1px solid var(--border,#d8e5f0);background:var(--surface2,#f5f8fb);color:inherit;border-radius:999px;padding:7px 12px;font:inherit;font-size:.8rem;font-weight:800;cursor:pointer}
      .xa-pills button.is-on{background:var(--accent,#15579D);border-color:var(--accent,#15579D);color:#fff}
      .xa-date{display:flex;align-items:center;gap:8px;font-size:.8rem;font-weight:800;color:var(--muted,#5b6b7a)}.xa-date input{font:inherit;padding:6px 8px;border:1px solid var(--border,#d8e5f0);border-radius:9px;background:var(--surface2,#f5f8fb);color:inherit}
      .xa-years{display:grid;gap:8px}
      .xa-year{border:1px solid var(--border,#d8e5f0);border-radius:14px;overflow:hidden}
      .xa-row{width:100%;display:flex;align-items:center;gap:10px;padding:12px 14px;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
      .xa-yearRow{background:var(--surface2,#f5f8fb);font-weight:900}
      .xa-name{flex:1;min-width:0;font-weight:800}
      .xa-caret{transition:transform .15s;color:var(--muted,#5b6b7a)}.is-open>.xa-row .xa-caret{transform:rotate(90deg)}
      .xa-chip{font-size:.72rem;font-weight:900;padding:4px 9px;border-radius:999px;background:color-mix(in srgb,var(--accent,#15579D) 12%,transparent);color:var(--accent,#15579D);white-space:nowrap}
      .xa-chip.is-off{background:transparent;color:var(--muted,#5b6b7a)}
      .xa-subjects{display:grid}
      .xa-subject{border-top:1px solid var(--border,#d8e5f0)}
      .xa-mark{flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-size:.7rem;font-weight:900;background:var(--surface2,#f5f8fb)}
      .xa-levels{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0 14px 14px}
      .xa-level{display:flex;align-items:center;gap:8px;padding:10px;border:1px solid var(--border,#d8e5f0);border-radius:11px;font-size:.82rem;font-weight:800;cursor:pointer}
      .xa-level.is-on{border-color:var(--accent,#15579D);background:color-mix(in srgb,var(--accent,#15579D) 9%,transparent)}
      .xa-save{justify-self:start}.xa-save[disabled]{opacity:.7;cursor:wait}
      .xa-user{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid var(--border,#d8e5f0)}
      .xa-userInfo{display:grid;gap:3px;min-width:0}.xa-userInfo b{overflow-wrap:anywhere}.xa-userInfo small{color:var(--muted,#5b6b7a)}
      .xa-userActions{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end}
      .xa-status{font-size:.72rem;font-weight:900;color:var(--muted,#5b6b7a)}.xa-status.is-bad{color:#b54848}
      .solutionAdmin{display:none!important}
      @media(max-width:640px){.xa-user{flex-direction:column}.xa-userActions{justify-content:flex-start}.xa-levels{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  // Monta el panel una sola vez por cada render de app.js. Es síncrono: no hay carreras ni duplicados.
  function mount(){
    const editor=document.querySelector('#app .adminEditor');
    if(!editor)return;
    addStyles();
    root=document.createElement('div');
    root.id='xa-root';
    editor.replaceWith(root);
    document.querySelectorAll('#app .adminList').forEach(n=>n.remove());
    const hero=document.querySelector('#app .hero.compact p');
    if(hero)hero.textContent='Buscá al alumno por email y elegí, materia por materia, qué puede ver y hasta cuándo.';
    bindRoot(root);
    draw();
    loadList();
  }

  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;mount()})};
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  schedule();
})();
