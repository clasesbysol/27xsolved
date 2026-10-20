// 27xSOLved · Panel de control → Actividad de alumnos.
// Ingresos (último ingreso de cada alumno), temas abiertos y ranking de temas por materia.
// Lee activity_events, student_profiles y student_year_changes (ver supabase/migrations/20261019_*).
(function(){
  'use strict';

  const $=(s,r=document)=>r.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const DAY=86400000;
  const st={tab:'ingresos',year:'all',days:30,subject:'',loaded:false,loading:false,error:'',events:[],profiles:[],access:[],changes:[],loadedAt:0};

  function subjectName(id){return window.ET27Cloud?.catalogSubject?.(id)?.name||id||'—'}
  function subjectYear(id){return window.ET27Cloud?.catalogSubject?.(id)?.year||null}
  function rel(v){
    if(!v)return'Nunca';
    const d=Date.now()-new Date(v).getTime(),m=Math.floor(d/60000);
    if(m<1)return'recién';if(m<60)return`hace ${m} min`;
    const h=Math.floor(m/60);if(h<24)return`hace ${h} h`;
    const days=Math.floor(h/24);if(days<7)return`hace ${days} día${days===1?'':'s'}`;
    return new Intl.DateTimeFormat('es-AR',{day:'numeric',month:'short'}).format(new Date(v));
  }

  async function load(){
    const api=window.ET27Cloud?.api;if(!api)return;
    st.loading=true;draw();
    const since=new Date(Date.now()-60*DAY).toISOString();
    try{
      const [events,profiles,access,changes]=await Promise.all([
        api(`activity_events?select=email,kind,subject,topic,label,created_at&created_at=gte.${encodeURIComponent(since)}&order=created_at.desc&limit=5000`),
        api('student_profiles?select=email,full_name,year,year_set_by,year_updated_at,last_seen_at'),
        api('access_profiles?select=email,active,role').catch(()=>[]),
        api('student_year_changes?select=email,from_year,to_year,changed_by,changed_at&order=changed_at.desc&limit=200').catch(()=>[])
      ]);
      st.events=events||[];st.profiles=profiles||[];st.access=(access||[]).filter(a=>a.role!=='admin');st.changes=changes||[];
      st.error='';st.loaded=true;st.loadedAt=Date.now();
    }catch(e){
      st.error=/student_profiles|activity_events|does not exist|schema cache|404/i.test(e.message)
        ?'Falta activar la actividad en Supabase: corré el archivo supabase/migrations/20261019_home_students_activity.sql en el SQL Editor (una sola vez).'
        :`No pude cargar la actividad: ${e.message}`;
    }
    st.loading=false;draw();
  }

  function students(){
    const map=new Map();
    st.access.forEach(a=>map.set(String(a.email).toLowerCase(),{email:String(a.email).toLowerCase(),active:a.active}));
    st.profiles.forEach(p=>{const k=String(p.email).toLowerCase();map.set(k,{...(map.get(k)||{email:k}),...p,email:k})});
    const admin=String(window.CBCLASES_CONFIG?.adminEmail||'').toLowerCase();
    map.delete(admin);
    return[...map.values()];
  }
  const nameOf=email=>{const p=st.profiles.find(x=>String(x.email).toLowerCase()===email);return p?.full_name||email};
  const yearOf=email=>st.profiles.find(x=>String(x.email).toLowerCase()===email)?.year||null;
  const inYear=email=>st.year==='all'||String(yearOf(email))===st.year;
  const inPeriod=e=>Date.now()-new Date(e.created_at).getTime()<=st.days*DAY;

  function ingresos(){
    const list=students().filter(s=>inYear(s.email)).map(s=>{
      const opens=st.events.filter(e=>e.kind==='app_open'&&String(e.email).toLowerCase()===s.email);
      const last=opens[0]?.created_at||s.last_seen_at||null;
      const week=opens.filter(e=>Date.now()-new Date(e.created_at).getTime()<=7*DAY).length;
      const change=st.changes.find(c=>String(c.email).toLowerCase()===s.email);
      return{...s,last,week,change};
    }).sort((a,b)=>(b.last?new Date(b.last):0)-(a.last?new Date(a.last):0));
    if(!list.length)return'<p class="h27-empty">Todavía no hay alumnos para mostrar.</p>';
    return `<div class="h27-table">${list.map(s=>{
      const age=s.last?Date.now()-new Date(s.last).getTime():Infinity;
      const dot=age<DAY?'is-today':age<7*DAY?'is-week':'';
      const change=s.change?` · pasó a ${s.change.to_year}.º (${s.change.changed_by==='admin'?'lo cambiaste vos':'lo cambió el alumno'}, ${rel(s.change.changed_at)})`:'';
      return `<div class="h27-tr"><div><b><span class="h27-dot ${dot}"></span>${esc(s.full_name||s.email)}</b><small>${esc(s.full_name?s.email:'')}</small></div>
        <div><small>${s.year?`${s.year}.º año`:'Sin año'}${esc(change)}</small><small>${s.week} ingreso${s.week===1?'':'s'} en 7 días</small></div>
        <div class="h27-when">${esc(rel(s.last))}</div></div>`}).join('')}</div>`;
  }
  function temas(){
    const list=st.events.filter(e=>e.kind==='topic_open'&&inPeriod(e)&&inYear(String(e.email).toLowerCase())).slice(0,80);
    if(!list.length)return'<p class="h27-empty">Nadie abrió temas en este período.</p>';
    return `<div class="h27-table">${list.map(e=>`<div class="h27-tr"><div><b>${esc(e.topic)}</b><small>${esc(subjectName(e.subject))}</small></div><div><small>${esc(nameOf(String(e.email).toLowerCase()))}</small></div><div class="h27-when">${esc(rel(e.created_at))}</div></div>`).join('')}</div>`;
  }
  function ranking(){
    const evs=st.events.filter(e=>e.kind==='topic_open'&&inPeriod(e)&&inYear(String(e.email).toLowerCase()));
    const subjects=[...new Set(evs.map(e=>e.subject).filter(Boolean))].sort((a,b)=>subjectName(a).localeCompare(subjectName(b)));
    if(!subjects.length)return'<p class="h27-empty">Todavía no hay datos para armar el ranking.</p>';
    if(!subjects.includes(st.subject))st.subject=subjects[0];
    const rows=new Map();
    evs.filter(e=>e.subject===st.subject).forEach(e=>{const r=rows.get(e.topic)||{topic:e.topic,opens:0,who:new Set()};r.opens++;r.who.add(String(e.email).toLowerCase());rows.set(e.topic,r)});
    const list=[...rows.values()].sort((a,b)=>b.who.size-a.who.size||b.opens-a.opens);
    const max=Math.max(1,...list.map(r=>r.who.size));
    return `<div class="h27-filters"><label>Materia <select data-h27a-subject>${subjects.map(s=>`<option value="${esc(s)}" ${s===st.subject?'selected':''}>${esc(subjectName(s))}${subjectYear(s)?` (${subjectYear(s)}.º)`:''}</option>`).join('')}</select></label></div>
      <div class="h27-table">${list.map((r,i)=>`<div class="h27-tr"><div><b>${i+1}. ${esc(r.topic)}</b><div class="h27-bar"><i style="width:${Math.round(r.who.size/max*100)}%"></i></div></div><div><small>${r.who.size} alumno${r.who.size===1?'':'s'}</small></div><div class="h27-when">${r.opens} vez${r.opens===1?'':'es'}</div></div>`).join('')}</div>`;
  }

  function body(){
    if(!window.ET27Cloud)return'';
    if(st.error)return `<div class="xa-msg" data-type="error">${esc(st.error)}</div>`;
    if(!st.loaded)return'<div class="xa-empty">Cargando actividad…</div>';
    const yearsOpts=(window.ET27_ACADEMIC_CATALOG?.years||[]).map(y=>y.year);
    const today=new Set(st.events.filter(e=>e.kind==='app_open'&&Date.now()-new Date(e.created_at).getTime()<DAY).map(e=>String(e.email).toLowerCase())).size;
    return `<div class="h27-filters">
        <label>Año <select data-h27a-year><option value="all">Todos</option>${yearsOpts.map(y=>`<option value="${y}" ${st.year===String(y)?'selected':''}>${y}.º</option>`).join('')}</select></label>
        ${st.tab!=='ingresos'?`<label>Período <select data-h27a-days>${[[7,'7 días'],[30,'30 días'],[60,'60 días']].map(([d,l])=>`<option value="${d}" ${st.days===d?'selected':''}>${l}</option>`).join('')}</select></label>`:''}
        <small style="color:var(--muted)">${today===1?'1 alumno entró hoy':`${today} alumnos entraron hoy`}</small>
      </div>
      ${st.tab==='ingresos'?ingresos():st.tab==='temas'?temas():ranking()}`;
  }
  function markup(){
    return `<div class="xa-head xa-listHead"><h2>Actividad de alumnos</h2><button type="button" class="ghost small" data-h27a-reload>${st.loading?'Actualizando…':'Actualizar'}</button></div>
      <div class="h27-tabs" role="tablist">${[['ingresos','Último ingreso'],['temas','Temas abiertos'],['ranking','Ranking por materia']].map(([k,l])=>`<button type="button" role="tab" class="${st.tab===k?'is-on':''}" data-h27a-tab="${k}" aria-selected="${st.tab===k}">${l}</button>`).join('')}</div>
      <div class="h27-activity">${body()}</div>`;
  }
  let root=null;
  function draw(){if(root&&root.isConnected)root.innerHTML=markup()}
  function mount(){
    const anchor=$('#xa-root');
    if(!anchor||$('#h27-activity-root'))return;
    if(!(window.ET27Access?.state?.admin||window.ET27Cloud?.me?.admin))return;
    root=document.createElement('section');
    root.id='h27-activity-root';root.className='xa-card';
    // Queda arriba de Accesos, así es lo primero que ves al entrar al panel.
    anchor.before(root);
    draw();
    if(!st.loaded||Date.now()-st.loadedAt>60000)load();
  }
  document.addEventListener('click',e=>{
    const t=e.target.closest?.('[data-h27a-tab],[data-h27a-reload]');if(!t||!root?.contains(t))return;
    if(t.dataset.h27aTab){st.tab=t.dataset.h27aTab;draw()}
    if(t.hasAttribute('data-h27a-reload'))load();
  });
  document.addEventListener('change',e=>{
    if(!root?.contains(e.target))return;
    if(e.target.matches('[data-h27a-year]')){st.year=e.target.value;draw()}
    if(e.target.matches('[data-h27a-days]')){st.days=Number(e.target.value);draw()}
    if(e.target.matches('[data-h27a-subject]')){st.subject=e.target.value;draw()}
  });
  let q=false;
  new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;mount()})}).observe(document.documentElement,{childList:true,subtree:true});
})();
