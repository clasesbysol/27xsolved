// 27xSOLved · Panel de control de accesos (árbol de contenidos por materia).
// Flujo: alumno (email) → año → materia → secciones / unidades / capítulos / bloques de ejercicios.
//
// · Cada materia muestra su propio árbol (access-tree.js), armado con los títulos reales.
// · Tildar un nivel habilita todo lo que tiene adentro (incluido lo que se agregue después);
//   destildar un hijo deja al padre en estado parcial (casillero con guion).
// · Guardado en access_grants:
//     materia completa → filas clásicas unit/* + resource/answers + evaluation/* (compatibles)
//     selección parcial → una fila grant_type='node' por ruta (migración 20261020)
// · Los permisos anteriores (niveles "teórica", "teórica + evaluaciones", "por sección") se
//   muestran traducidos al árbol y sólo se reescriben si se modifica esa materia.
// · Se guarda primero lo nuevo y después se borra lo viejo: si algo falla, el alumno no pierde acceso.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const T=()=>window.ET27AccessTree;
  const ALIASES={'quimica-general-4':'chemistry','fisica-aplicada-4':'physics_applied'};
  const MIGRATION='supabase/migrations/20261020_granular_access_tree.sql';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dbSubject=id=>ALIASES[id]||id;

  function years(){
    return (window.ET27_ACADEMIC_CATALOG?.years||[])
      .map(y=>({year:y.year,subjects:(y.subjects||[]).filter(s=>s.kind==='Materia')}))
      .filter(y=>y.subjects.length);
  }
  function allSubjects(){return years().flatMap(y=>y.subjects.map(s=>({...s,year:y.year,db:dbSubject(s.id)})))}

  // ---------- Estado (sobrevive a los re-render de app.js) ----------
  const st={
    email:'',loadedEmail:'',sel:{},orig:{},legacy:{},profile:null,
    openYear:null,openSubject:null,open:new Set(),filter:{},
    duration:'1m',customDate:'',
    users:[],grants:[],listLoaded:false,listError:'',
    year:null,originalYear:null,years:{},yearsAvailable:null,
    busy:false,loadingEmail:false,msg:'',msgType:'info',
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
    if(!res.ok){const err=new Error(data?.message||data?.hint||data?.details||`Error ${res.status}`);err.code=data?.code||'';throw err}
    return data;
  }
  const enc=encodeURIComponent;
  const inList=values=>`in.(${values.map(v=>`"${String(v).replace(/"/g,'')}"`).join(',')})`;
  const key=g=>`${g.subject}|${Number(g.unit_no)}|${g.grant_type}|${g.grant_key}`;
  const migrationMissing=e=>e?.code==='23514'||/grant_type_check|node_key_check|check constraint/i.test(e?.message||'');

  // ---------- Permisos <-> árbol ----------
  function pathsFromRows(subjectId,rows){
    const nodes=rows.filter(g=>g.grant_type==='node').map(g=>g.grant_key);
    const legacy=T().legacyPaths(subjectId,rows.filter(g=>g.grant_type!=='node'));
    return new Set(T().compress(subjectId,new Set([...nodes,...legacy])));
  }
  const setKey=set=>JSON.stringify([...(set||[])].sort());
  const sel=id=>st.sel[id]||(st.sel[id]=new Set());
  const isChanged=id=>setKey(st.sel[id])!==setKey(st.orig[id]);
  function loadSelection(grants){
    st.sel={};st.orig={};st.legacy={};
    allSubjects().forEach(s=>{
      const rows=grants.filter(g=>g.subject===s.db);
      st.sel[s.id]=pathsFromRows(s.id,rows);
      st.orig[s.id]=new Set(st.sel[s.id]);
      st.legacy[s.id]=rows.length>0&&!rows.some(g=>g.grant_type==='node')&&T().legacyLevel(rows)!=='full'&&T().legacyLevel(rows)!==null;
    });
  }
  function subjectStatus(id,set){
    set=set||sel(id);
    if(!set.size)return{t:'Sin acceso',off:true};
    if(set.has('*'))return{t:'Completa',off:false};
    const root=T().tree(id),all=T().leaves(root).filter(n=>n.path!=='*');
    const on=all.filter(n=>T().covers(set,n.path)).length;
    return{t:`Parcial · ${on}/${all.length}`,off:false};
  }

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
  function summaryParts(email){
    const rows=st.grants.filter(g=>String(g.email).toLowerCase()===email);
    return allSubjects().map(s=>{
      const set=pathsFromRows(s.id,rows.filter(g=>g.subject===s.db));
      return set.size?{s,text:T().describe(s.id,set)}:null;
    }).filter(Boolean);
  }

  // ---------- Acciones ----------
  async function loadList(){
    try{
      const [users,grants]=await Promise.all([
        api('access_profiles?select=email,active,role,access_starts_at,access_expires_at&order=email'),
        api('access_grants?select=email,subject,unit_no,grant_type,grant_key')
      ]);
      st.users=(users||[]).filter(u=>u.role!=='admin');
      await loadYears();
      st.grants=grants||[];
      st.listError='';
    }catch(e){st.listError=e.message}
    st.listLoaded=true;
    draw();
  }
  async function loadEmail(email){
    email=String(email||'').trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setMsg('Escribí un email válido.','error');return}
    st.email=email;st.loadingEmail=true;st.msg='';st.openYear=null;st.openSubject=null;draw();
    try{
      const [profiles,grants]=await Promise.all([
        api(`access_profiles?select=email,active,role,access_starts_at,access_expires_at&email=eq.${enc(email)}`),
        api(`access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${enc(email)}`)
      ]);
      st.profile=(profiles||[])[0]||null;
      loadSelection(grants||[]);
      await loadYear(email);
      st.loadedEmail=email;
      st.duration=st.profile?'keep':'1m';st.customDate='';
      const mine=st.year?years().find(y=>y.year===st.year):null;
      if(mine)st.openYear=mine.year;
      if(!st.profile)setMsg('Alumno nuevo: elegí los contenidos y guardá.','info',true);
    }catch(e){setMsg(`No pude cargar ese alumno: ${e.message}`,'error',true)}
    st.loadingEmail=false;draw();
  }
  async function save(){
    const email=st.loadedEmail;
    if(!email||st.busy)return;
    const changed=allSubjects().filter(s=>isChanged(s.id));
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
        const dbs=[...new Set(changed.map(s=>s.db))];
        const wanted=[...new Map(changed.flatMap(s=>T().rowsFor(s.db,s.id,sel(s.id))).map(r=>[key(r),{email,...r}])).values()];
        const current=await api(`access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${enc(email)}&subject=${enc(inList(dbs))}`)||[];
        const currentKeys=new Set(current.map(key)),wantedKeys=new Set(wanted.map(key));
        const toInsert=wanted.filter(r=>!currentKeys.has(key(r)));
        const toDelete=current.filter(r=>!wantedKeys.has(key(r)));
        // 1) primero lo nuevo (si falla, no se borra nada)
        if(toInsert.length){
          try{await api('access_grants',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(toInsert)})}
          catch(e){if(migrationMissing(e))throw new Error(`Para guardar selecciones parciales falta aplicar la migración ${MIGRATION} en Supabase (SQL Editor → pegar el archivo → Run). Mientras tanto podés habilitar materias completas. No se modificó ningún permiso.`);throw e}
        }
        // 2) después se quita lo que ya no corresponde
        for(const r of toDelete)await api(`access_grants?email=eq.${enc(email)}&subject=eq.${enc(r.subject)}&unit_no=eq.${Number(r.unit_no)}&grant_type=eq.${enc(r.grant_type)}&grant_key=eq.${enc(r.grant_key)}`,{method:'DELETE',headers:{Prefer:'return=minimal'}});
        const saved=await api(`access_grants?select=subject,unit_no,grant_type,grant_key&email=eq.${enc(email)}&subject=${enc(inList(dbs))}`)||[];
        if(wanted.map(key).sort().join()!==saved.map(key).sort().join())throw new Error('Los permisos guardados no coinciden con lo elegido. Revisá la conexión y volvé a guardar.');
        // Una notificación por materia con permisos nuevos, nunca por cada unidad.
        const notices=changed.filter(s=>{
          const before=st.orig[s.id]||new Set();
          const after=sel(s.id);
          return [...after].some(node=>!before.has(node));
        }).map(s=>({email,subject:s.db,message:'Tenés nuevos permisos en '+s.name+'.'}));
        changed.forEach(s=>{st.orig[s.id]=new Set(sel(s.id));st.legacy[s.id]=false});
        if(notices.length){
          try{await api('student_notifications',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(notices)})}
          catch(error){console.warn('Permisos guardados; no se pudo registrar la notificación',error);setMsg('Permisos guardados, pero no se pudo crear la notificación.','error',true)}
        }
      }
      st.profile={...(st.profile||{}),email,active:true,access_starts_at:starts,access_expires_at:expires};
      st.duration='keep';
      setMsg(`✓ Guardado para ${email}. El alumno ve los cambios la próxima vez que abra o vuelva a la app.`,'success',true);
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

  // ---------- Año del alumno (student_profiles) ----------
  async function loadYears(){
    try{
      const rows=await api('student_profiles?select=email,year');
      st.years={};(rows||[]).forEach(r=>{st.years[String(r.email).toLowerCase()]=r.year||null});
      st.yearsAvailable=true;
    }catch(_){st.yearsAvailable=false}
  }
  async function loadYear(email){
    st.year=null;st.originalYear=null;
    try{
      const rows=await api(`student_profiles?select=year&email=eq.${enc(email)}`);
      st.year=st.originalYear=(rows||[])[0]?.year||null;st.yearsAvailable=true;
    }catch(_){st.yearsAvailable=false}
  }
  async function saveWithYear(){
    const email=st.loadedEmail;
    if(!email||st.busy)return;
    const yearChanged=st.yearsAvailable&&st.year!==st.originalYear;
    const otherChanged=allSubjects().some(s=>isChanged(s.id))||!(st.profile&&st.duration==='keep');
    if(yearChanged){
      try{
        await window.ET27Cloud?.adminSetYear?.(email,st.year,st.originalYear);
        st.originalYear=st.year;st.years[email]=st.year;
        if(!otherChanged){setMsg(`✓ Año guardado: ${st.year?`${st.year}.º`:'sin año'} para ${email}.`,'success');return}
      }catch(e){setMsg(`No pude guardar el año: ${e.message}`,'error');return}
    }
    save();
  }
  function yearMarkupPick(){
    if(st.yearsAvailable===false)return '';
    const ys=(window.ET27_ACADEMIC_CATALOG?.years||[]).map(y=>y.year);
    return `<div class="xa-block"><b class="xa-label">Año del alumno <small>· el alumno también lo puede cambiar; cambiar el año no modifica sus permisos</small></b>
      <div class="xa-pills">${ys.map(y=>`<button type="button" data-xa-year-pick="${y}" class="${st.year===y?'is-on':''}">${y}.º</button>`).join('')}<button type="button" data-xa-year-pick="0" class="${!st.year?'is-on':''}">Sin año</button></div></div>`;
  }

  // ---------- Vista: árbol ----------
  const openKey=(id,path)=>`${id}|${path}`;
  function matches(n,q){if(!q)return true;const t=n.label.toLocaleLowerCase('es');return t.includes(q)||(n.children||[]).some(c=>matches(c,q))}
  function nodeMarkup(id,n,depth,q){
    if(!matches(n,q))return'';
    const set=sel(id),state=T().state(id,set,n),has=!!n.children?.length;
    const open=has&&(st.open.has(openKey(id,n.path))||!!q);
    const leaves=has?T().leaves(n):[];
    const on=has?leaves.filter(x=>T().covers(set,x.path)).length:0;
    const tag=n.kind==='exercises'?'<em class="xa-tag is-ex">Ejercicios</em>':n.pending?'<em class="xa-tag">Pendiente</em>':'';
    return `<li class="xa-node" style="--d:${depth}">
      <div class="xa-nodeRow ${state==='on'?'is-on':state==='partial'?'is-partial':''}">
        ${has?`<button type="button" class="xa-tw" data-xa-tw="${esc(openKey(id,n.path))}" aria-expanded="${open}" aria-label="${open?'Contraer':'Desplegar'} ${esc(n.label)}">${open?'▾':'▸'}</button>`:'<span class="xa-tw" aria-hidden="true"></span>'}
        <label class="xa-check"><input type="checkbox" data-xa-node="${esc(id)}" data-xa-path="${esc(n.path)}" ${state==='on'?'checked':''} ${state==='partial'?'data-xa-partial="1"':''} aria-checked="${state==='on'?'true':state==='partial'?'mixed':'false'}"><span>${esc(n.label)}</span></label>
        ${tag}${has?`<small class="xa-count">${on}/${leaves.length}</small>`:''}
      </div>
      ${open?`<ul class="xa-tree">${n.children.map(c=>nodeMarkup(id,c,depth+1,q)).join('')}</ul>`:''}
    </li>`;
  }
  function treeMarkup(s){
    const root=T().tree(s.id),set=sel(s.id),state=T().state(s.id,set,root);
    const q=String(st.filter[s.id]||'').trim().toLocaleLowerCase('es');
    const legacy=st.legacy[s.id]&&!isChanged(s.id);
    return `<div class="xa-treeBox">
      <div class="xa-treeTools">
        <label class="xa-check xa-rootCheck"><input type="checkbox" data-xa-node="${esc(s.id)}" data-xa-path="*" ${state==='on'?'checked':''} ${state==='partial'?'data-xa-partial="1"':''}><span><b>Toda la materia</b> <small>(incluye lo que se agregue después)</small></span></label>
        <div class="xa-quick"><button type="button" data-xa-quick="${esc(s.id)}|theory">Solo teoría</button><button type="button" data-xa-quick="${esc(s.id)}|expand">Desplegar todo</button><button type="button" data-xa-quick="${esc(s.id)}|collapse">Contraer</button><button type="button" data-xa-quick="${esc(s.id)}|none">Nada</button></div>
      </div>
      ${legacy?'<p class="xa-note">Este alumno tiene un permiso del sistema anterior; acá se ve traducido al árbol. Sólo se reescribe si cambiás algo de esta materia.</p>':''}
      ${root.rules?`<p class="xa-note is-ok">✓ ${esc(root.rules)}</p>`:''}
      ${T().leaves(root).length>12?`<input type="search" class="xa-filter" data-xa-filter="${esc(s.id)}" placeholder="Buscar un tema dentro de ${esc(s.name)}…" value="${esc(st.filter[s.id]||'')}">`:''}
      ${root.children.length?`<ul class="xa-tree is-root">${root.children.map(c=>nodeMarkup(s.id,c,0,q)).join('')}</ul>`:'<p class="xa-note">Esta materia todavía no tiene contenido cargado: podés habilitarla completa.</p>'}
    </div>`;
  }
  function subjectMarkup(s){
    const status=subjectStatus(s.id);
    const dirty=isChanged(s.id);
    const open=st.openSubject===s.id;
    return `<div class="xa-subject ${open?'is-open':''}">
      <button type="button" class="xa-row" data-xa-subject="${esc(s.id)}" aria-expanded="${open}">
        <span class="xa-mark">${esc(s.letter||'')}</span>
        <span class="xa-name">${esc(s.name)}</span>
        <span class="xa-chip ${status.off?'is-off':''}">${esc(status.t)}${dirty?' •':''}</span>
        <b class="xa-caret" aria-hidden="true">›</b>
      </button>
      ${open?treeMarkup(s):''}
    </div>`;
  }
  function yearMarkup(y){
    const open=st.openYear===y.year;
    const count=y.subjects.filter(s=>sel(s.id).size).length;
    return `<section class="xa-year ${open?'is-open':''}">
      <button type="button" class="xa-row xa-yearRow" data-xa-year="${y.year}" aria-expanded="${open}">
        <span class="xa-name">${y.year}.º año${st.year===y.year?' <small>· año del alumno</small>':''}</span>
        <span class="xa-chip ${count?'':'is-off'}">${count?`${count} con acceso`:`${y.subjects.length} materia${y.subjects.length>1?'s':''}`}</span>
        <b class="xa-caret" aria-hidden="true">›</b>
      </button>
      ${open?`<div class="xa-subjects">${y.subjects.map(s=>subjectMarkup({...s,year:y.year,db:dbSubject(s.id)})).join('')}</div>`:''}
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
  function currentSummary(){
    const parts=allSubjects().filter(s=>sel(s.id).size).map(s=>`<li><b>${esc(s.name)}</b><span>${esc(T().describe(s.id,sel(s.id)))}</span></li>`);
    return `<div class="xa-block"><b class="xa-label">Lo que tiene habilitado${allSubjects().some(s=>isChanged(s.id))?' <small>· con los cambios sin guardar</small>':''}</b>${parts.length?`<ul class="xa-summary">${parts.join('')}</ul>`:'<p class="xa-hint">Todavía nada.</p>'}</div>`;
  }
  function editorMarkup(){
    if(!st.loadedEmail)return `<p class="xa-hint">Escribí el email y tocá <b>Buscar</b>, o tocá <b>Editar</b> en la lista de alumnos.</p>`;
    return `<div class="xa-current"><span>Editando</span><b>${esc(st.loadedEmail)}</b></div>
      ${yearMarkupPick()}
      ${durationMarkup()}
      <div class="xa-block"><b class="xa-label">Contenidos <small>· desplegá una materia y tildá exactamente lo que querés habilitar</small></b><div class="xa-years">${years().map(yearMarkup).join('')}</div></div>
      ${currentSummary()}
      <button type="button" class="primary xa-save" data-xa-save ${st.busy?'disabled':''}>${st.busy?'Guardando…':'Guardar acceso'}</button>`;
  }
  function listMarkup(){
    if(!st.listLoaded)return `<div class="xa-empty">Cargando alumnos…</div>`;
    if(st.listError)return `<div class="xa-msg" data-type="error">No pude cargar la lista: ${esc(st.listError)}</div>`;
    if(!st.users.length)return `<div class="xa-empty">Todavía no agregaste alumnos.</div>`;
    return st.users.map(u=>{const s=statusOf(u);const email=String(u.email).toLowerCase();const year=st.years?.[email];const parts=summaryParts(email);return `<div class="xa-user">
      <div class="xa-userInfo"><b>${esc(u.email)}</b><small>${year?`${year}.º año · `:''}${parts.length?parts.map(p=>`${esc(p.s.name)}: ${esc(p.text)}`).join(' · '):'Sin contenidos habilitados'}</small></div>
      <div class="xa-userActions"><span class="xa-status ${s.bad?'is-bad':''}">${esc(s.t)}</span>
      <button type="button" class="secondary small" data-xa-edit="${esc(email)}">Editar</button>
      <button type="button" class="ghost small" data-xa-toggle="${esc(email)}" data-active="${u.active?'1':'0'}">${u.active?'Suspender':'Reactivar'}</button></div></div>`}).join('');
  }
  function markup(){
    return `<section class="xa-card">
      <div class="xa-head"><h2>Accesos por alumno</h2><p>Alumno → año → materia → sección → unidad → capítulo → bloque de ejercicios.</p></div>
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
    const active=document.activeElement;
    const focusSel=active?.matches?.('[data-xa-email]')?'[data-xa-email]':active?.dataset?.xaFilter?`[data-xa-filter="${CSS.escape(active.dataset.xaFilter)}"]`:'';
    const caret=active&&'selectionStart' in active?active.selectionStart:null;
    root.innerHTML=markup();
    root.querySelectorAll('[data-xa-partial]').forEach(i=>{i.indeterminate=true});
    if(focusSel){const el=root.querySelector(focusSel);if(el){el.focus();try{if(caret!==null)el.setSelectionRange(caret,caret)}catch(_){}}}
  }

  function quick(id,what){
    const root=T().tree(id);
    if(what==='none')st.sel[id]=new Set();
    else if(what==='theory'){
      const set=new Set(T().leaves(root).filter(n=>n.path!=='*'&&n.kind!=='exercises').map(n=>n.path));
      st.sel[id]=new Set(T().compress(id,set));
    }else if(what==='expand'){T().walk(root,n=>{if(n.children?.length&&n.path!=='*')st.open.add(openKey(id,n.path))})}
    else if(what==='collapse'){[...st.open].forEach(k=>{if(k.startsWith(`${id}|`))st.open.delete(k)})}
  }

  function bindRoot(el){
    el.addEventListener('click',e=>{
      const t=e.target.closest('button');if(!t||!el.contains(t))return;
      if(t.dataset.xaYear){const y=Number(t.dataset.xaYear);st.openYear=st.openYear===y?null:y;st.openSubject=null;draw();return}
      if(t.dataset.xaSubject){
        const id=t.dataset.xaSubject;st.openSubject=st.openSubject===id?null:id;
        if(st.openSubject)T().tree(id).children.forEach(c=>{if(c.children?.length)st.open.add(openKey(id,c.path))});
        draw();return;
      }
      if(t.dataset.xaTw){const k=t.dataset.xaTw;st.open.has(k)?st.open.delete(k):st.open.add(k);draw();return}
      if(t.dataset.xaQuick){const i=t.dataset.xaQuick.lastIndexOf('|');quick(t.dataset.xaQuick.slice(0,i),t.dataset.xaQuick.slice(i+1));st.msg='';draw();return}
      if(t.dataset.xaDuration){st.duration=t.dataset.xaDuration;st.customDate='';draw();return}
      if(t.hasAttribute('data-xa-save')){saveWithYear();return}
      if(t.dataset.xaYearPick){st.year=Number(t.dataset.xaYearPick)||null;draw();return}
      if(t.dataset.xaEdit){st.openYear=null;st.openSubject=null;loadEmail(t.dataset.xaEdit);el.scrollIntoView({behavior:'smooth',block:'start'});return}
      if(t.dataset.xaToggle){toggleUser(t.dataset.xaToggle,t.dataset.active!=='1');return}
    });
    el.addEventListener('change',e=>{
      const t=e.target;
      if(t.dataset?.xaNode){
        const id=t.dataset.xaNode,path=t.dataset.xaPath;
        // Un casillero parcial al tocarlo se completa (habilita todo lo de adentro).
        const on=t.dataset.xaPartial?true:t.checked;
        st.sel[id]=T().toggle(id,sel(id),path,on);
        st.msg='';draw();return;
      }
      if(t.hasAttribute?.('data-xa-date')){st.customDate=t.value;st.duration=t.value?'custom':(st.profile?'keep':'1m');draw()}
    });
    el.addEventListener('input',e=>{
      if(e.target.matches('[data-xa-email]'))st.email=e.target.value;
      if(e.target.dataset?.xaFilter!==undefined&&e.target.matches('[data-xa-filter]')){st.filter[e.target.dataset.xaFilter]=e.target.value;draw()}
    });
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
      .xa-pills{display:flex;flex-wrap:wrap;gap:6px}.xa-pills button,.xa-quick button{border:1px solid var(--border,#d8e5f0);background:var(--surface2,#f5f8fb);color:inherit;border-radius:999px;padding:7px 12px;font:inherit;font-size:.8rem;font-weight:800;cursor:pointer}
      .xa-pills button.is-on{background:var(--accent,#15579D);border-color:var(--accent,#15579D);color:#fff}
      .xa-date{display:flex;align-items:center;gap:8px;font-size:.8rem;font-weight:800;color:var(--muted,#5b6b7a)}.xa-date input{font:inherit;padding:6px 8px;border:1px solid var(--border,#d8e5f0);border-radius:9px;background:var(--surface2,#f5f8fb);color:inherit}
      .xa-years{display:grid;gap:8px}
      .xa-year{border:1px solid var(--border,#d8e5f0);border-radius:14px;overflow:hidden}
      .xa-row{width:100%;display:flex;align-items:center;gap:10px;padding:12px 14px;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
      .xa-yearRow{background:var(--surface2,#f5f8fb);font-weight:900}.xa-yearRow small{font-weight:800;color:var(--accent,#15579D)}
      .xa-name{flex:1;min-width:0;font-weight:800}
      .xa-caret{transition:transform .15s;color:var(--muted,#5b6b7a)}.is-open>.xa-row .xa-caret{transform:rotate(90deg)}
      .xa-chip{font-size:.72rem;font-weight:900;padding:4px 9px;border-radius:999px;background:color-mix(in srgb,var(--accent,#15579D) 12%,transparent);color:var(--accent,#15579D);white-space:nowrap}
      .xa-chip.is-off{background:transparent;color:var(--muted,#5b6b7a)}
      .xa-subjects{display:grid}
      .xa-subject{border-top:1px solid var(--border,#d8e5f0)}
      .xa-mark{flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-size:.7rem;font-weight:900;background:var(--surface2,#f5f8fb)}
      .xa-treeBox{display:grid;gap:10px;padding:0 14px 16px}
      .xa-treeTools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:12px;background:var(--surface2,#f5f8fb)}
      .xa-quick{display:flex;flex-wrap:wrap;gap:6px}.xa-quick button{padding:5px 10px;font-size:.75rem}
      .xa-note{margin:0;font-size:.8rem;color:var(--muted,#5b6b7a);line-height:1.45}.xa-note.is-ok{color:var(--accent,#15579D);font-weight:800}
      .xa-filter{padding:9px 12px;border:1px solid var(--border,#d8e5f0);border-radius:10px;font:inherit;font-size:.85rem;background:var(--surface,#fff);color:inherit}
      .xa-tree{list-style:none;margin:0;padding:0;display:grid;gap:2px}
      .xa-tree .xa-tree{margin-left:22px;padding-left:8px;border-left:1px dashed var(--border,#d8e5f0)}
      .xa-nodeRow{display:flex;align-items:center;gap:6px;min-height:38px;padding:3px 6px;border-radius:9px}
      .xa-nodeRow.is-on{background:color-mix(in srgb,var(--accent,#15579D) 7%,transparent)}
      .xa-tw{flex:none;width:26px;height:26px;border:0;border-radius:7px;background:transparent;color:var(--muted,#5b6b7a);font:inherit;font-size:.9rem;cursor:pointer;display:grid;place-items:center}
      button.xa-tw:hover{background:var(--surface2,#f5f8fb)}
      .xa-check{display:flex;align-items:center;gap:9px;flex:1;min-width:0;cursor:pointer;font-size:.86rem;font-weight:700;line-height:1.3}
      .xa-check input{flex:none;width:19px;height:19px;accent-color:var(--accent,#15579D);cursor:pointer}
      .xa-check span{min-width:0;overflow-wrap:anywhere}.xa-rootCheck{flex:1 1 260px}.xa-rootCheck small{font-weight:700;color:var(--muted,#5b6b7a)}
      .xa-tag{flex:none;font-style:normal;font-size:.66rem;font-weight:900;text-transform:uppercase;letter-spacing:.03em;padding:3px 7px;border-radius:999px;background:var(--surface2,#f5f8fb);color:var(--muted,#5b6b7a)}
      .xa-tag.is-ex{background:#fff3d6;color:#7a5200}:root[data-theme="dark"] .xa-tag.is-ex{background:#3a2f12;color:#ffd77a}
      .xa-count{flex:none;font-size:.72rem;font-weight:900;color:var(--muted,#5b6b7a)}
      .xa-summary{margin:0;padding:0;list-style:none;display:grid;gap:6px}.xa-summary li{display:grid;gap:2px;padding:9px 12px;border-radius:11px;background:var(--surface2,#f5f8fb);font-size:.84rem}.xa-summary span{color:var(--muted,#5b6b7a)}
      .xa-save{justify-self:start;position:sticky;bottom:12px;z-index:2}.xa-save[disabled]{opacity:.7;cursor:wait}
      .xa-user{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid var(--border,#d8e5f0)}
      .xa-userInfo{display:grid;gap:3px;min-width:0}.xa-userInfo b{overflow-wrap:anywhere}.xa-userInfo small{color:var(--muted,#5b6b7a)}
      .xa-userActions{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end}
      .xa-status{font-size:.72rem;font-weight:900;color:var(--muted,#5b6b7a)}.xa-status.is-bad{color:#b54848}
      .solutionAdmin{display:none!important}
      @media(max-width:640px){.xa-user{flex-direction:column}.xa-userActions{justify-content:flex-start}.xa-tree .xa-tree{margin-left:12px}.xa-treeBox{padding:0 8px 14px}}
    `;
    document.head.appendChild(s);
  }

  // Monta el panel una sola vez por cada render de app.js. Es síncrono: no hay carreras ni duplicados.
  function mount(){
    const editor=document.querySelector('#app .adminEditor');
    if(!editor)return;
    if(!window.ET27Access?.isVerifiedAdmin?.())return; // sólo el administrador verificado
    addStyles();
    root=document.createElement('div');
    root.id='xa-root';
    editor.replaceWith(root);
    document.querySelectorAll('#app .adminList').forEach(n=>n.remove());
    const hero=document.querySelector('#app .hero.compact p');
    if(hero)hero.textContent='Buscá al alumno por email, desplegá cada materia y tildá exactamente los contenidos que puede ver.';
    bindRoot(root);
    draw();
    loadList();
  }

  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;mount()})};
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('et27-access-ready',schedule);
  schedule();
})();
