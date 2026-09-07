// 27xSOLved · panel de acceso simplificado y guardado robusto.
// Únicos permisos por materia: materia completa, respuestas y evaluaciones.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  const ALIASES={'quimica-general-4':'chemistry','fisica-aplicada-4':'physics_applied'};
  const REVERSE={chemistry:'quimica-general-4',physics_applied:'fisica-aplicada-4'};
  sessionStorage.removeItem('et27-return-admin');

  const canonical=id=>ALIASES[id]||id;
  const catalogId=subject=>REVERSE[subject]||subject;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function subjects(){
    return (window.ET27_ACADEMIC_CATALOG?.years||[]).map(year=>({
      year:year.year,
      subjects:(year.subjects||[]).filter(s=>s.kind==='Materia')
    })).filter(group=>group.subjects.length);
  }

  function subjectName(dbSubject){
    const id=catalogId(dbSubject);
    for(const group of subjects()){
      const found=group.subjects.find(s=>s.id===id);
      if(found)return found.name;
    }
    return id;
  }

  function feedback(button,text,type='info'){
    let box=document.querySelector('.accessSaveFeedback');
    if(!box){
      box=document.createElement('div');
      box.className='accessSaveFeedback';
      button.insertAdjacentElement('beforebegin',box);
    }
    box.textContent=text;
    box.dataset.type=type;
  }

  function addStyles(){
    if(document.getElementById('et27-access-fix-style'))return;
    const style=document.createElement('style');
    style.id='et27-access-fix-style';
    style.textContent=`
      .accessSaveFeedback{margin:14px 0 9px;padding:11px 13px;border-radius:11px;font-size:.82rem;font-weight:800;border:1px solid var(--border);background:var(--surface2);color:var(--muted)}
      .accessSaveFeedback[data-type="success"]{border-color:color-mix(in srgb,var(--accent) 35%,var(--border));color:var(--accent);background:color-mix(in srgb,var(--accent) 9%,var(--surface))}
      .accessSaveFeedback[data-type="error"]{border-color:#e3bcbc;color:#a33f3f;background:#fff3f3}
      :root[data-theme="dark"] .accessSaveFeedback[data-type="error"]{background:#2b1c1c;color:#ffb4b4;border-color:#704040}
      .saveAccess[disabled]{opacity:.72;cursor:wait}
      .simpleAccessPanel{display:grid;gap:22px;margin:8px 0 22px}
      .simpleAccessYear{display:grid;gap:10px}.simpleAccessYear>header{display:flex;align-items:center;justify-content:space-between;gap:12px}.simpleAccessYear>header b{font-size:.92rem}.simpleAccessYear>header span{font-size:.72rem;font-weight:900;color:var(--muted)}
      .simpleAccessGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .simpleSubject{border:1px solid var(--border);border-radius:15px;background:var(--surface);padding:13px;display:grid;gap:11px}
      .simpleSubjectMain{display:flex;align-items:flex-start;gap:10px;font-weight:900;cursor:pointer}.simpleSubjectMain input{margin-top:3px}.simpleSubjectMain span{display:grid;gap:2px}.simpleSubjectMain small{font-size:.68rem;color:var(--muted);font-weight:800}
      .simpleExtras{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding-top:9px;border-top:1px solid var(--border)}
      .simpleExtra{display:flex;align-items:center;gap:7px;font-size:.76rem;font-weight:800;cursor:pointer;padding:7px 8px;border-radius:9px;background:var(--surface2)}
      .simpleExtra:has(input:disabled){opacity:.46;cursor:not-allowed}
      .simpleAccessLoading{padding:14px;border:1px dashed var(--border);border-radius:12px;color:var(--muted);font-size:.82rem}
      .solutionAdmin{display:none!important}
      @media(max-width:760px){.simpleAccessGrid{grid-template-columns:1fr}.simpleExtras{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);
  }

  function selectedDuration(){
    const selected=document.querySelector('[data-duration].selected');
    const date=document.querySelector('#expiryDate')?.value||'';
    if(date&&selected?.dataset.duration!=='keep'&&selected?.dataset.duration!=='forever')return {mode:'custom',date};
    return {mode:selected?.dataset.duration||'1m',date};
  }

  function computeExpiry(mode,date,existing){
    if(mode==='keep')return existing?.access_expires_at??null;
    if(mode==='forever')return null;
    if(mode==='custom'){
      if(!date)throw new Error('Elegí una fecha de vencimiento.');
      const d=new Date(`${date}T23:59:59`);
      if(Number.isNaN(d.getTime()))throw new Error('La fecha de vencimiento no es válida.');
      return d.toISOString();
    }
    const match=/^(1|2|3)m$/.exec(mode);
    if(!match)throw new Error('La duración elegida no es válida.');
    const d=new Date();
    d.setMonth(d.getMonth()+Number(match[1]));
    d.setHours(23,59,59,999);
    return d.toISOString();
  }

  function unitsForSubject(subject){
    return subject==='chemistry'?[...Array(13)].map((_,i)=>i+1):[1];
  }

  function readGrantsNow(){
    const out=[];
    document.querySelectorAll('[data-simple-subject]:checked').forEach(main=>{
      const subject=main.dataset.simpleSubject;
      unitsForSubject(subject).forEach(unit_no=>out.push({subject,unit_no,grant_type:'unit',grant_key:'*'}));
      const card=main.closest('.simpleSubject');
      if(card?.querySelector('[data-simple-extra="answers"]:checked'))out.push({subject,unit_no:1,grant_type:'resource',grant_key:'answers'});
      if(card?.querySelector('[data-simple-extra="evaluations"]:checked'))out.push({subject,unit_no:1,grant_type:'evaluation',grant_key:'*'});
    });
    const unique=new Map(out.map(g=>[grantKey(g),g]));
    return [...unique.values()];
  }

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
        let value=JSON.parse(localStorage.getItem(key)||'null');
        if(typeof value==='string')value=JSON.parse(value);
        const token=value?.access_token||value?.currentSession?.access_token||value?.session?.access_token;
        if(token)return {token,raw:value,key};
      }catch(_err){}
    }
    return null;
  }

  async function api(path,options={}){
    const auth=storedSession();
    if(!auth)throw new Error('No pude leer la sesión activa. Cerrá y volvé a abrir la app.');
    const response=await fetch(`${CFG.supabaseUrl}${path}`,{
      ...options,
      headers:{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${auth.token}`,'Content-Type':'application/json',...(options.headers||{})},
      cache:'no-store'
    });
    const text=await response.text();
    let data=null;
    if(text){try{data=JSON.parse(text)}catch(_){data=text}}
    if(!response.ok)throw new Error(data?.message||data?.hint||data?.details||`Error ${response.status}`);
    return data;
  }

  function query(table,params){
    const q=new URLSearchParams(params);
    return api(`/rest/v1/${table}?${q.toString()}`);
  }
  function grantKey(g){return `${g.subject}|${Number(g.unit_no)}|${g.grant_type}|${g.grant_key}`}

  function cardMarkup(subject,grants){
    const dbSubject=canonical(subject.id);
    const own=grants.filter(g=>g.subject===dbSubject);
    const full=own.some(g=>g.grant_type==='unit'&&g.grant_key==='*')||own.length>0;
    const answers=own.some(g=>g.grant_type==='resource'&&g.grant_key==='answers');
    const evaluations=own.some(g=>g.grant_type==='evaluation'&&g.grant_key==='*');
    return `<article class="simpleSubject" data-simple-card="${esc(dbSubject)}">
      <label class="simpleSubjectMain"><input type="checkbox" data-simple-subject="${esc(dbSubject)}" ${full?'checked':''}><span>${esc(subject.name)}<small>${esc(subject.status||'Materia')}</small></span></label>
      <div class="simpleExtras">
        <label class="simpleExtra"><input type="checkbox" data-simple-extra="answers" ${answers?'checked':''} ${full?'':'disabled'}> Respuestas</label>
        <label class="simpleExtra"><input type="checkbox" data-simple-extra="evaluations" ${evaluations?'checked':''} ${full?'':'disabled'}> Evaluaciones</label>
      </div>
    </article>`;
  }

  function panelMarkup(grants){
    return `<div class="simpleAccessPanel" data-simple-access-panel>${subjects().map(group=>`<section class="simpleAccessYear"><header><b>${group.year}.º año</b><span>${group.subjects.length} materias</span></header><div class="simpleAccessGrid">${group.subjects.map(s=>cardMarkup(s,grants)).join('')}</div></section>`).join('')}</div>`;
  }

  async function patchEditor(){
    addStyles();
    const editor=document.querySelector('.adminEditor');
    if(!editor||!window.ET27_ACADEMIC_CATALOG)return;
    const email=String(document.querySelector('#accessEmail')?.value||'').trim().toLowerCase();
    const key=email||'__new__';
    if(editor.dataset.simpleAccessFor===key&&editor.querySelector('[data-simple-access-panel]'))return;
    editor.dataset.simpleAccessFor=key;

    document.querySelector('.hero.compact p')?.replaceChildren(document.createTextNode('Asigná materias completas y, si corresponde, habilitá respuestas y evaluaciones.'));
    editor.querySelector('.editorHead p')?.replaceChildren(document.createTextNode('El acceso empieza al guardarlo. No hay permisos por unidad ni por sección.'));
    editor.querySelectorAll('.subheading,.grantGrid').forEach(node=>node.remove());
    editor.querySelector('[data-simple-access-panel]')?.remove();
    const save=editor.querySelector('[data-a="saveAccess"]');
    if(!save)return;
    const loading=document.createElement('div');
    loading.className='simpleAccessLoading';
    loading.textContent=email?'Cargando permisos actuales…':'Elegí al menos una materia.';
    save.insertAdjacentElement('beforebegin',loading);

    let grants=[];
    if(email){
      try{
        const rows=await query('access_grants',{select:'subject,unit_no,grant_type,grant_key',email:`eq.${email}`});
        grants=Array.isArray(rows)?rows:[];
      }catch(err){
        loading.textContent=`No pude cargar los permisos actuales: ${err?.message||'error desconocido'}`;
        loading.dataset.error='1';
        return;
      }
    }
    if(!document.contains(editor)||editor.dataset.simpleAccessFor!==key)return;
    loading.remove();
    save.insertAdjacentHTML('beforebegin',panelMarkup(grants));
  }

  function updateExtras(main){
    const card=main.closest('.simpleSubject');
    card?.querySelectorAll('[data-simple-extra]').forEach(extra=>{
      extra.disabled=!main.checked;
      if(!main.checked)extra.checked=false;
    });
  }

  function summarize(grants){
    const names=[...new Set(grants.filter(g=>g.grant_type==='unit'&&g.grant_key==='*').map(g=>subjectName(g.subject)))];
    return names.length?names.join(' · '):'Sin materias habilitadas';
  }

  function patchCurrentUserSummary(email,grants){
    const edit=[...document.querySelectorAll('[data-edit]')].find(b=>String(b.dataset.edit||'').toLowerCase()===email);
    const small=edit?.closest('.userRow')?.querySelector('small');
    if(small)small.textContent=summarize(grants);
  }

  async function save(button){
    addStyles();
    const email=String(document.querySelector('#accessEmail')?.value||'').trim().toLowerCase();
    const grants=readGrantsNow();
    const duration=selectedDuration();
    if(!email){feedback(button,'Ingresá el email del alumno.','error');return;}
    if(!grants.some(g=>g.grant_type==='unit'&&g.grant_key==='*')){
      feedback(button,'Elegí al menos una materia. No se guardó nada.','error');
      return;
    }

    const original=button.textContent;
    button.disabled=true;
    button.textContent='Guardando…';
    feedback(button,'Guardando acceso por materia…');

    try{
      const profiles=await query('access_profiles',{select:'access_starts_at,access_expires_at',email:`eq.${email}`});
      const existing=Array.isArray(profiles)?profiles[0]||null:null;
      const expires=computeExpiry(duration.mode,duration.date,existing);
      const starts=duration.mode==='keep'&&existing?.access_starts_at?existing.access_starts_at:new Date().toISOString();
      await api('/rest/v1/rpc/save_student_access',{
        method:'POST',
        body:JSON.stringify({p_email:email,p_access_starts_at:starts,p_access_expires_at:expires,p_grants:grants})
      });

      const saved=await query('access_grants',{select:'subject,unit_no,grant_type,grant_key',email:`eq.${email}`});
      const wantedKeys=grants.map(grantKey).sort();
      const savedRows=Array.isArray(saved)?saved:[];
      const savedKeys=savedRows.map(grantKey).sort();
      if(JSON.stringify(wantedKeys)!==JSON.stringify(savedKeys))throw new Error(`La verificación no coincide (${savedKeys.length}/${wantedKeys.length} permisos).`);

      patchCurrentUserSummary(email,savedRows);
      feedback(button,`✓ Guardado: ${summarize(savedRows)}.`,'success');
      button.textContent='✓ Guardado';
      window.ET27Access?.refresh?.().catch(()=>{});
      window.setTimeout(()=>{if(document.contains(button)){button.disabled=false;button.textContent=original}},1300);
    }catch(err){
      console.error('Error guardando acceso',err);
      feedback(button,`No se pudo guardar: ${err?.message||'error desconocido'}`,'error');
      button.disabled=false;
      button.textContent=original;
    }
  }

  document.addEventListener('change',event=>{
    const main=event.target.closest?.('[data-simple-subject]');
    if(main)updateExtras(main);
  },true);

  // Captura el guardado antes del handler legado y usa el nuevo modelo.
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-a="saveAccess"]');
    if(!button)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    save(button);
  },true);

  let scheduled=false;
  function schedulePatch(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;patchEditor()});
  }
  const observer=new MutationObserver(schedulePatch);
  observer.observe(document.documentElement,{subtree:true,childList:true});
  document.addEventListener('DOMContentLoaded',schedulePatch,{once:true});
  addStyles();
  schedulePatch();
})();
