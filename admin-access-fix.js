// ET 27 · guardado robusto de accesos del panel admin.
// Importante: NO crea un segundo cliente de Supabase. Usa REST con la sesión ya persistida
// por la app para evitar que un evento de Auth saque al administrador del panel mientras guarda.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  sessionStorage.removeItem('et27-return-admin');

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
    `;
    document.head.appendChild(style);
  }

  function selectedDuration(){
    const selected=document.querySelector('[data-duration].selected');
    const date=document.querySelector('#expiryDate')?.value||'';
    if(date&&!selected)return {mode:'custom',date};
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

  function readGrantsNow(){
    // Se ejecuta SIN await: primero congelamos exactamente lo que está tildado en pantalla.
    const out=[];
    document.querySelectorAll('[data-full-unit]:checked').forEach(x=>{
      out.push({subject:x.dataset.subject||'chemistry',unit_no:Number(x.dataset.fullUnit),grant_type:'unit',grant_key:'*'});
    });
    document.querySelectorAll('[data-grant-section]:checked').forEach(x=>{
      const [subject,u,type,key]=String(x.dataset.grantSection||'').split('|');
      if(!subject||!u||!type||!key)return;
      const full=[...document.querySelectorAll('[data-full-unit]')].find(y=>
        String(y.dataset.fullUnit)===String(u)&&String(y.dataset.subject||'chemistry')===String(subject)
      );
      if(full?.checked)return;
      out.push({subject,unit_no:Number(u),grant_type:type,grant_key:key});
    });
    return out;
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
      headers:{
        apikey:CFG.supabaseAnonKey,
        Authorization:`Bearer ${auth.token}`,
        'Content-Type':'application/json',
        ...(options.headers||{})
      },
      cache:'no-store'
    });
    const text=await response.text();
    let data=null;
    if(text){try{data=JSON.parse(text)}catch(_){data=text}}
    if(!response.ok){
      const message=data?.message||data?.hint||data?.details||`Error ${response.status}`;
      throw new Error(message);
    }
    return data;
  }

  function query(table,params){
    const q=new URLSearchParams(params);
    return api(`/rest/v1/${table}?${q.toString()}`);
  }

  function grantKey(g){return `${g.subject}|${Number(g.unit_no)}|${g.grant_type}|${g.grant_key}`}

  async function save(button){
    addStyles();

    // TODO se lee ANTES de cualquier operación asíncrona para que ningún render pueda borrar la selección.
    const email=String(document.querySelector('#accessEmail')?.value||'').trim().toLowerCase();
    const grants=readGrantsNow();
    const duration=selectedDuration();

    if(!email){feedback(button,'Ingresá el email del alumno.','error');return;}

    const original=button.textContent;
    button.disabled=true;
    button.textContent='Guardando…';
    feedback(button,`Guardando ${grants.length} permiso${grants.length===1?'':'s'}…`);

    try{
      const profiles=await query('access_profiles',{
        select:'access_starts_at,access_expires_at',
        email:`eq.${email}`
      });
      const existing=Array.isArray(profiles)?profiles[0]||null:null;
      const expires=computeExpiry(duration.mode,duration.date,existing);
      const starts=duration.mode==='keep'&&existing?.access_starts_at?existing.access_starts_at:new Date().toISOString();

      await api('/rest/v1/rpc/save_student_access',{
        method:'POST',
        body:JSON.stringify({
          p_email:email,
          p_access_starts_at:starts,
          p_access_expires_at:expires,
          p_grants:grants
        })
      });

      // Verificación real: no informamos éxito hasta releer lo que quedó en PostgreSQL.
      const saved=await query('access_grants',{
        select:'subject,unit_no,grant_type,grant_key',
        email:`eq.${email}`
      });
      const wantedKeys=grants.map(grantKey).sort();
      const savedKeys=(Array.isArray(saved)?saved:[]).map(grantKey).sort();
      if(JSON.stringify(wantedKeys)!==JSON.stringify(savedKeys)){
        throw new Error(`La base respondió, pero la verificación no coincide (${savedKeys.length}/${wantedKeys.length} permisos).`);
      }

      feedback(button,`✓ Guardado y verificado: ${savedKeys.length} permiso${savedKeys.length===1?'':'s'} activo${savedKeys.length===1?'':'s'}.`,'success');
      button.textContent='✓ Guardado';
      button.disabled=false;

      // Nos quedamos EXACTAMENTE en el panel y en la misma edición. No reload, no navegación.
      window.setTimeout(()=>{if(document.contains(button))button.textContent=original},1800);
    }catch(err){
      console.error('Error guardando acceso',err);
      feedback(button,`No se pudo guardar: ${err?.message||'error desconocido'}`,'error');
      button.disabled=false;
      button.textContent=original;
    }
  }

  // Captura el botón antes del handler viejo, que falla con durationMode="keep".
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-a="saveAccess"]');
    if(!button)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    save(button);
  },true);

  addStyles();
})();
