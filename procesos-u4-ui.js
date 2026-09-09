(function(){
  'use strict';

  const DATA=window.ET27_PROCESOS_U4;
  if(!DATA)return;

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=(latex,display=true)=>`<${display?'div':'span'} class="u4math ${display?'u4math-block':'u4math-inline'}" data-u4-math="${encodeURIComponent(String(latex||''))}" data-u4-display="${display?'1':'0'}"></${display?'div':'span'}>`;

  function adminEmailInStorage(storage){
    const target=String(window.CBCLASES_CONFIG?.adminEmail||'').trim().toLowerCase();
    if(!target)return false;
    try{
      for(let i=0;i<storage.length;i++){
        const k=storage.key(i),v=storage.getItem(k);
        if(v&&String(v).toLowerCase().includes(target))return true;
      }
    }catch(_){}
    return false;
  }
  function isAdmin(){return adminEmailInStorage(localStorage)||adminEmailInStorage(sessionStorage)}

  let mathAttempts=0;
  function fallbackMath(root=document){
    root.querySelectorAll?.('[data-u4-math]:not([data-rendered])').forEach(n=>{
      const raw=decodeURIComponent(n.getAttribute('data-u4-math')||'');
      n.textContent=raw
        .replace(/\\qquad/g,'   ')
        .replace(/\\,/g,' ')
        .replace(/\\mathrm\{([^}]*)\}/g,'$1')
        .replace(/\\times/g,'×')
        .replace(/\\cdot/g,'·')
        .replace(/\\Delta/g,'Δ')
        .replace(/\\approx/g,'≈')
        .replace(/\\ln/g,'ln')
        .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,'($1)/($2)')
        .replace(/[{}]/g,'');
      n.dataset.rendered='fallback';
    });
  }
  function isInsideClosedExercise(n){
    const exercise=n.closest?.('details.exercise-item');
    return Boolean(exercise&&!exercise.open);
  }
  function renderMath(root=document,force=false){
    if(!window.katex){
      mathAttempts+=1;
      if(mathAttempts<18){setTimeout(()=>renderMath(root,force),180);return;}
      fallbackMath(root);
      return;
    }
    root.querySelectorAll?.('[data-u4-math]').forEach(n=>{
      if(!force&&n.dataset.rendered==='1')return;
      if(isInsideClosedExercise(n))return;
      try{
        window.katex.render(decodeURIComponent(n.getAttribute('data-u4-math')||''),n,{
          throwOnError:false,
          strict:'ignore',
          output:'html',
          displayMode:n.getAttribute('data-u4-display')==='1'
        });
        n.dataset.rendered='1';
      }catch(_){
        n.removeAttribute('data-rendered');
      }
    });
  }

  const ETY=[
    ['Isobárica','iso = igual · baros = peso o presión','Misma presión. Durante toda la transformación P permanece constante.'],
    ['Isocórica','iso = igual · chora = espacio o volumen','Mismo volumen. Como V no cambia, el trabajo de expansión es cero.'],
    ['Isotérmica','iso = igual · thermē = calor / temperatura','Misma temperatura. Para un gas ideal, si T no cambia entonces ΔU=0.'],
    ['Adiabática','a = sin · diabatos = atravesar','Sin intercambio de calor entre sistema y entorno: Q=0.'],
    ['Expansión','ex = hacia afuera · pandere = extender','El volumen aumenta. Con esta convención, el trabajo del gas suele ser negativo.'],
    ['Compresión','com = junto · premere = apretar','El volumen disminuye. Con esta convención, el trabajo sobre el gas suele ser positivo.']
  ];

  function injectStyles(){
    if(document.getElementById('u4adminstyle'))return;
    const s=document.createElement('style');
    s.id='u4adminstyle';
    s.textContent=`
      .u4-theory{margin-top:18px;display:grid;gap:12px}.u4-theory-card{padding:16px;border:1px solid var(--line);border-radius:16px;background:var(--panel-soft)}.u4-theory-card h4{margin:0 0 7px;font-size:17px}.u4-theory-card p{margin:6px 0;color:var(--muted);line-height:1.62}.u4-theory-card ul,.u4-theory-card ol{margin:8px 0 0;padding-left:21px;line-height:1.6}.u4-theory-card li+li{margin-top:5px}.u4-theory-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.u4-sign-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.u4-sign{padding:10px 12px;border-radius:12px;background:var(--panel);border:1px solid var(--line)}.u4-sign b{display:block;margin-bottom:3px}.u4-sign span{color:var(--muted);font-size:13px;line-height:1.45}.u4-key{padding:12px 14px;border-left:4px solid var(--accent);border-radius:12px;background:rgba(21,87,157,.07);line-height:1.58}.u4-extra{margin-top:18px;padding-top:18px;border-top:1px solid var(--line)}.u4-extra h4{margin:0 0 8px}.u4-ety-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.u4-ety{padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--panel-soft)}.u4-ety summary{cursor:pointer;font-weight:900;text-decoration:underline;text-decoration-color:rgba(21,87,157,.55);text-decoration-thickness:2px;text-underline-offset:4px}.u4-ety small{display:block;color:var(--accent);font-weight:900;margin:7px 0 4px}.u4-ety p{margin:0;color:var(--muted);line-height:1.5}.u4-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:14px}.u4-table{width:100%;min-width:760px;border-collapse:collapse;background:var(--panel)}.u4-table th,.u4-table td{padding:10px;border-bottom:1px solid var(--line);vertical-align:middle;text-align:left}.u4-table tr:last-child td{border-bottom:0}.u4-table th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);background:var(--panel-soft)}.u4-table td small{display:block;color:var(--muted)}.u4-table .u4math{margin:0;padding:2px 0;border:0;background:transparent;text-align:left;overflow:visible}.u4-admin{margin-top:14px;border:2px solid rgba(21,87,157,.28);border-radius:18px;overflow:hidden;background:var(--panel-soft)}.u4-admin>summary{cursor:pointer;list-style:none;padding:14px 16px;background:rgba(21,87,157,.08);font-weight:950}.u4-admin>summary::-webkit-details-marker{display:none}.u4-admin>summary:before{content:'ADMIN';display:inline-block;margin-right:8px;padding:4px 7px;border-radius:999px;background:var(--accent);color:#fff;font-size:9px;letter-spacing:.09em}.u4-admin-body{padding:14px}.u4-step{padding:13px 14px;border:1px solid var(--line);border-radius:14px;background:var(--panel);margin:9px 0}.u4-step h4{margin:0 0 8px;font-size:14px}.u4-step ul{margin:6px 0 8px;padding-left:20px;line-height:1.55}.u4math-block{padding:9px 10px;margin:8px 0;border:1px dashed rgba(21,87,157,.25);border-radius:11px;overflow-x:auto;overflow-y:hidden;text-align:center;max-width:100%}.u4math-inline{display:inline-block;max-width:100%;vertical-align:middle}.u4math .katex-display{margin:.25em 0!important;overflow-x:auto;overflow-y:hidden}.u4math .katex{font-size:1em}.u4-step .u4math-block .katex{font-size:.98em}.u4-locked{margin-top:14px;padding:12px 14px;border:1px dashed var(--line);border-radius:13px;background:var(--panel-soft);color:var(--muted)}
      @media(max-width:900px){.u4-theory-grid,.u4-sign-row,.u4-ety-grid{grid-template-columns:1fr}.u4-table{min-width:650px}}
      @media(max-width:760px){.u4-admin-body{padding:10px}.u4-step{padding:11px}.u4math .katex{font-size:.92em}.u4-step .u4math-block .katex{font-size:.88em}}
    `;
    document.head.appendChild(s);
  }

  function theoryMarkup(){
    return `<section class="u4-extra">
      <h4>Primer principio explicado en palabras</h4>
      <div class="u4-theory">
        <article class="u4-theory-card">
          <h4>1 · Qué dice el primer principio</h4>
          <p>El primer principio de la Termodinámica es la conservación de la energía aplicada a un sistema termodinámico. La energía no aparece ni desaparece: puede entrar o salir como <b>calor</b> o como <b>trabajo</b>, y eso modifica la <b>energía interna</b> del sistema.</p>
          ${math('\\Delta U=Q+L')}
          <div class="u4-key"><b>Idea central:</b> la energía interna cambia según cuánta energía entra o sale como calor y como trabajo.</div>
          <div class="u4-sign-row">
            <div class="u4-sign"><b>Q &gt; 0</b><span>el sistema recibe calor.</span></div>
            <div class="u4-sign"><b>Q &lt; 0</b><span>el sistema cede calor.</span></div>
            <div class="u4-sign"><b>L &gt; 0</b><span>se realiza trabajo sobre el sistema: compresión.</span></div>
            <div class="u4-sign"><b>L &lt; 0</b><span>el sistema realiza trabajo sobre el entorno: expansión.</span></div>
          </div>
        </article>

        <div class="u4-theory-grid">
          <article class="u4-theory-card">
            <h4>2 · Energía interna U</h4>
            <p>La energía interna representa la energía asociada al estado microscópico de las partículas. Para un gas ideal, el cambio de energía interna depende de la temperatura.</p>
            ${math('\\Delta U=nC_v\\Delta T')}
            <p>Si la temperatura aumenta, ΔU es positiva. Si el gas se enfría, ΔU es negativa.</p>
          </article>
          <article class="u4-theory-card">
            <h4>3 · Calor Q</h4>
            <p>El calor es energía en transferencia debido a una diferencia de temperatura. No es una propiedad “guardada” dentro del sistema.</p>
            ${math('Q>0\\;\\Rightarrow\\;\\text{recibe calor}')}
            ${math('Q<0\\;\\Rightarrow\\;\\text{cede calor}')}
          </article>
        </div>

        <article class="u4-theory-card">
          <h4>4 · Trabajo L: expansión y compresión</h4>
          <p>En estos ejercicios el trabajo aparece principalmente cuando el gas cambia su volumen. En una transformación isobárica:</p>
          ${math('L=-P\\Delta V')}
          <ul>
            <li><b>Expansión:</b> Vf &gt; Vi, entonces ΔV &gt; 0 y L &lt; 0. El gas hace trabajo sobre el entorno.</li>
            <li><b>Compresión:</b> Vf &lt; Vi, entonces ΔV &lt; 0 y L &gt; 0. El entorno hace trabajo sobre el gas.</li>
          </ul>
        </article>

        <div class="u4-theory-grid">
          <article class="u4-theory-card">
            <h4>5 · Ecuación del gas ideal</h4>
            ${math('PV=nRT')}
            <p>Relaciona presión, volumen, cantidad de gas y temperatura. Se usa para encontrar la variable de estado que falta antes de calcular ΔU, Q o L.</p>
            ${math('T=\\frac{PV}{nR}')}
          </article>
          <article class="u4-theory-card">
            <h4>6 · Qué significan Cv y Cp</h4>
            <p><b>Cv</b> es la capacidad calorífica molar a volumen constante. <b>Cp</b> es la capacidad calorífica molar a presión constante.</p>
            ${math('C_p-C_v=R')}
            <p>Como a presión constante el gas puede expandirse y realizar trabajo, normalmente Cp es mayor que Cv.</p>
          </article>
        </div>

        <div class="u4-theory-grid">
          <article class="u4-theory-card"><h4>7 · Isocórica</h4><p>Volumen constante. Si el recipiente es rígido, no hay cambio de volumen y por lo tanto no hay trabajo de expansión.</p>${math('V=\\text{cte}\\qquad L=0')}${math('\\Delta U=Q=nC_v\\Delta T')}</article>
          <article class="u4-theory-card"><h4>8 · Isobárica</h4><p>Presión constante. El calor recibido puede aumentar la energía interna y además permitir que el gas se expanda.</p>${math('P=\\text{cte}')}${math('L=-P\\Delta V')}${math('\\Delta U=nC_v\\Delta T\\qquad Q=nC_p\\Delta T')}</article>
          <article class="u4-theory-card"><h4>9 · Isotérmica</h4><p>Temperatura constante. Para un gas ideal, si T no cambia, la energía interna tampoco.</p>${math('T=\\text{cte}\\qquad \\Delta U=0')}${math('Q=-L')}${math('L=-nRT\\ln\\left(\\frac{V_f}{V_i}\\right)')}</article>
          <article class="u4-theory-card"><h4>10 · Adiabática</h4><p>No hay intercambio de calor con el entorno. Todo el cambio de energía interna se explica por el trabajo.</p>${math('Q=0')}${math('\\Delta U=L=nC_v\\Delta T')}<p>Una compresión adiabática eleva la temperatura; una expansión adiabática la disminuye.</p></article>
        </div>

        <article class="u4-theory-card">
          <h4>11 · Ciclos termodinámicos</h4>
          <p>En un ciclo el sistema vuelve al mismo estado del que partió. Como U es función de estado, la variación total de energía interna es cero.</p>
          ${math('\\Delta U_{ciclo}=0')}
          ${math('Q_{total}=-L_{total}')}
        </article>

        <article class="u4-theory-card">
          <h4>12 · Cómo encarar cualquier ejercicio</h4>
          <ol>
            <li>Identificá la transformación: isobárica, isocórica, isotérmica, adiabática o ciclo.</li>
            <li>Decidí si hay expansión o compresión mirando el cambio de volumen.</li>
            <li>Usá PV=nRT si necesitás calcular alguna temperatura, presión o volumen.</li>
            <li>Calculá ΔU con la relación que corresponda.</li>
            <li>Calculá el trabajo del tramo.</li>
            <li>Cerrá y controlá todo con la primera ley: ΔU = Q + L.</li>
          </ol>
        </article>
      </div>
    </section>`;
  }

  function enhanceSummary(){
    const card=document.querySelector('#resumen .topic-card');
    if(!card||card.dataset.u4enhanced)return;
    card.dataset.u4enhanced='1';
    const t=DATA.summary?.transformations||[];
    const ety=ETY.map(([a,b,c])=>`<details class="u4-ety"><summary>${esc(a)}</summary><small>${esc(b)}</small><p>${esc(c)}</p></details>`).join('');
    const rows=t.map(x=>`<tr><td><b>${esc(x.name)}</b><small>${esc(x.rule)}</small></td><td>${math(x.constant||'',false)}</td><td>${math(x.dU,false)}</td><td>${math(x.q,false)}</td><td>${math(x.l,false)}</td></tr>`).join('');
    card.insertAdjacentHTML('beforeend',
      theoryMarkup()+
      `<section class="u4-extra"><h4>Etimologías que ayudan a memorizar</h4><div class="u4-ety-grid">${ety}</div></section>`+
      `<section class="u4-extra"><h4>Cuadro comparativo para memorizar</h4><div class="u4-table-wrap"><table class="u4-table"><thead><tr><th>Transformación</th><th>Constante</th><th>ΔU</th><th>Q</th><th>L</th></tr></thead><tbody>${rows}</tbody></table></div></section>`
    );
  }

  function stepHtml(b){
    return `<section class="u4-step"><h4>${esc(b.title||'Paso')}</h4>${b.bullets?.length?`<ul>${b.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}${b.formulas?.map(f=>math(f,true)).join('')||''}</section>`;
  }

  function enhanceExercises(){
    const admin=isAdmin();
    document.querySelectorAll('#ejercicios .exercise-item').forEach((card,i)=>{
      const ex=DATA.exercises?.[i];
      if(!ex||card.dataset.u4done)return;
      card.dataset.u4done='1';
      const old=card.querySelector('.solution-placeholder');
      if(!old)return;
      if(!admin){
        old.className='u4-locked';
        old.innerHTML='<b>Resolución disponible en modo administrador.</b><div>La consigna queda visible para estudiantes; el desarrollo docente está protegido.</div>';
      }else{
        const d=document.createElement('details');
        d.className='u4-admin';
        d.open=true;
        d.innerHTML=`<summary>Resolución paso a paso · ${esc(ex.title)}</summary><div class="u4-admin-body">${(ex.solution?.blocks||[]).map(stepHtml).join('')}</div>`;
        old.replaceWith(d);
        d.addEventListener('toggle',()=>{if(d.open)renderMath(d,true)});
      }
      card.addEventListener('toggle',()=>{if(card.open)requestAnimationFrame(()=>renderMath(card,true))});
    });
  }

  function enhance(){
    if(!location.search.includes('procesos-operaciones-4'))return;
    injectStyles();
    enhanceSummary();
    enhanceExercises();
    renderMath(document);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(enhance,0));
  else setTimeout(enhance,0);
  setTimeout(enhance,320);
})();
