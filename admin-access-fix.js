// ET 27 · corrección robusta del guardado de accesos del panel admin.
(function(){
  'use strict';

  const CFG=window.CBCLASES_CONFIG||{};
  let clientPromise=null;

  function client(){
    if(!clientPromise){
      clientPromise=import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
        .then(({createClient})=>createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{
          auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
        }));
    }
    return clientPromise;
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

  function readGrants(){
    const out=[];
    document.querySelectorAll('[data-full-unit]:checked').forEach(x=>{
      out.push({
        subject:x.dataset.subject||'chemistry',
        unit_no:Number(x.dataset.fullUnit),
        grant_type:'unit',
        grant_key:'*'
      });
    });
    document.querySelectorAll('[data-grant-section]:checked').forEach(x=>{
      const [subject,u,type,key]=String(x.dataset.grantSection||'').split('|');
      if(!subject||!u||!type||!key)return;
      const full=document.querySelector(`[data-full-unit="${CSS.escape(u)}"][data-subject="${CSS.escape(subject)}"]`);
      if(full?.checked)return;
      out.push({subject,unit_no:Number(u),grant_type:type,grant_key:key});
    });
    return out;
  }

  async function save(button){
    addStyles();
    const email=String(document.querySelector('#accessEmail')?.value||'').trim().toLowerCase();
    if(!email){feedback(button,'Ingresá el email del alumno.','error');return;}

    const original=button.textContent;
    button.disabled=true;
    button.textContent='Guardando…';
    feedback(button,'Guardando perfil y permisos…');

    try{
      const sb=await client();
      const {data:{session},error:sessionError}=await sb.auth.getSession();
      if(sessionError)throw sessionError;
      if(!session)throw new Error('La sesión venció. Volvé a iniciar sesión.');

      const {data:existing,error:profileError}=await sb
        .from('access_profiles')
        .select('email,access_starts_at,access_expires_at')
        .eq('email',email)
        .maybeSingle();
      if(profileError)throw profileError;

      const {mode,date}=selectedDuration();
      const expires=computeExpiry(mode,date,existing);
      const starts=mode==='keep'&&existing?.access_starts_at
        ? existing.access_starts_at
        : new Date().toISOString();
      const grants=readGrants();

      const {error}=await sb.rpc('save_student_access',{
        p_email:email,
        p_access_starts_at:starts,
        p_access_expires_at:expires,
        p_grants:grants
      });
      if(error)throw error;

      feedback(button,`✓ Acceso actualizado. ${grants.length} permiso${grants.length===1?'':'s'} guardado${grants.length===1?'':'s'}.`,'success');
      button.textContent='✓ Guardado';
      sessionStorage.setItem('et27-return-admin','1');
      window.setTimeout(()=>location.reload(),650);
    }catch(err){
      console.error('Error guardando acceso',err);
      feedback(button,`No se pudo guardar: ${err?.message||'error desconocido'}`,'error');
      button.disabled=false;
      button.textContent=original;
    }
  }

  // Interceptamos antes del onclick original: el flujo viejo se rompe con durationMode="keep".
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-a="saveAccess"]');
    if(!button)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    save(button);
  },true);

  // Después de guardar y recargar, volvemos solos al panel para mostrar los datos frescos.
  function returnToAdmin(){
    if(sessionStorage.getItem('et27-return-admin')!=='1')return;
    const button=document.querySelector('[data-v="admin"]');
    if(!button)return;
    sessionStorage.removeItem('et27-return-admin');
    button.click();
  }
  const observer=new MutationObserver(returnToAdmin);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',returnToAdmin);
  else returnToAdmin();
})();
