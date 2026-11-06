// 27xSOLved · Procesos y Operaciones Químicas 4.º · Trabajos prácticos.
// Reemplaza el esqueleto de materia.html?subject=tp-procesos-operaciones-4 con el TP de Electroquímica,
// usando el índice lateral, la hoja de fórmulas y las tarjetas de las unidades de teoría.
(function(){
  'use strict';
  if(new URLSearchParams(location.search).get('subject')!=='tp-procesos-operaciones-4')return;
  const D=window.ET27_PO_TP_ELECTRO;if(!D)return;
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const star='<svg class="u5-star" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8l-5.8 3.3 1.4-6.4-4.9-4.4 6.5-.7z"/></svg>';

  function renderMath(root){
    if(!window.katex){setTimeout(()=>renderMath(root),200);return}
    root.querySelectorAll('[data-tpx-math]:not([data-ready])').forEach(n=>{
      try{window.katex.render(decodeURIComponent(n.dataset.tpxMath),n,{displayMode:n.dataset.inline!=='1',throwOnError:false,strict:'ignore',output:'htmlAndMathml'});n.dataset.ready='1'}catch(e){console.error('TP fórmula:',e)}
    });
  }

  const exercise=(e,group,label)=>`<details class="exercise-item u5-exercise" id="tpx-${group}-${e.n}" data-searchable>
    <summary><span class="exercise-number">${e.n}</span><span class="exercise-copy"><small>${label} · Ejercicio ${e.n}</small><b>${esc(e.title)}</b></span><span class="exercise-chevron">›</span></summary>
    <div class="exercise-body">
      <aside class="u5-exercise-plan" aria-label="Qué vamos a hacer">${star}<div><b>Qué vamos a hacer</b><p>${e.plan}</p></div></aside>
      <h3>Consigna</h3><div class="tpx-statement">${e.statement}</div>
      <details class="u5-solution"><summary>Ver resolución completa paso a paso</summary>
        ${e.steps.map(([t,h])=>`<article class="u5-card u4-step"><h4>${t}</h4><div class="u5-flow">${h}</div></article>`).join('')}
        <div class="u5-result"><b>Respuesta</b>${e.answer}</div>
      </details>
    </div>
  </details>`;

  function mount(){
    const main=document.querySelector('.subject-main'),index=document.querySelector('.subject-index'),sheet=document.getElementById('formulaSheet');
    if(!main||document.getElementById('tp-electroquimica'))return;
    // Fuera las secciones vacías del esqueleto.
    main.querySelectorAll(':scope > .subject-section').forEach(s=>s.remove());
    const hero=document.querySelector('.subject-hero-card p');if(hero)hero.textContent='Trabajos prácticos · TP 1: Electroquímica — pilas, corrosión y electrólisis.';

    const unit=document.createElement('section');
    unit.id='tp-electroquimica';unit.className='subject-section u5-unit tpx-unit';unit.dataset.searchable='';
    unit.innerHTML=`<div class="section-title"><div><small>TRABAJOS PRÁCTICOS · TP 1</small><h2>${esc(D.title)}</h2></div></div>
      <div class="u5-intro"><p class="tpx-lead">${D.lead}</p><div class="tpx-chips"><span>${D.theory.length} bloques de teoría</span><span>${D.pilas.length} ejercicios de pilas</span><span>${D.elec.length} ejercicios de electrólisis</span><span>Tabla de potenciales</span></div></div>
      <section class="u5-subsection" id="tpx-teoria"><h2>Teoría</h2><div class="u5t">${D.theory.map((t,i)=>D.sec(t.id,i+1,t.kicker,t.title,t.body)).join('')}</div></section>
      <section class="u5-subsection" id="tpx-pilas"><h2>Guía de ejercicios de pilas</h2><div class="u5-note">Para todos los ejercicios usá la <a href="#tpx-t-tabla">tabla de potenciales estándar de reducción</a>. Intentá cada uno antes de abrir la resolución.</div><div class="exercise-list">${D.pilas.map(e=>exercise(e,'p','Pilas')).join('')}</div></section>
      <section class="u5-subsection" id="tpx-electrolisis"><h2>Guía de ejercicios de electrólisis</h2><div class="u5-note">Datos: F = 96500 C · R = 0,082 atm·L/(mol·K) · en CNPT 1 mol de gas ocupa 22,4 L.</div><div class="exercise-list">${D.elec.map(e=>exercise(e,'e','Electrólisis')).join('')}</div></section>
      <section class="u5-subsection" id="tpx-errores"><h2>Antes de entregar</h2><div class="u5-card"><ul>${D.errores.map(x=>`<li>${x}</li>`).join('')}</ul></div></section>`;
    main.insertBefore(unit,document.getElementById('emptySearch'));

    if(index){
      const link=(id,label,cls='')=>`<a class="${cls}" href="#${id}">${esc(label)}</a>`;
      index.classList.add('po-unit-index');
      index.innerHTML=`<small>ÍNDICE</small><h3>Trabajos prácticos</h3>
        <details class="po-unit po-unit-current" data-po-unit="tp1" open><summary><span>TP 1 · Electroquímica</span></summary><div class="po-unit-body">
          ${link('tpx-teoria','Teoría')}${D.theory.map(t=>link(t.id,t.nav,'po-sub')).join('')}
          ${link('tpx-pilas','Guía de pilas · 1 a 11')}${D.pilas.map(e=>link(`tpx-p-${e.n}`,`Ejercicio ${e.n}`,'po-sub')).join('')}
          ${link('tpx-electrolisis','Guía de electrólisis · 1 a 9')}${D.elec.map(e=>link(`tpx-e-${e.n}`,`Ejercicio ${e.n}`,'po-sub')).join('')}
          ${link('tpx-errores','Antes de entregar')}
        </div></details>`;
    }
    if(sheet){
      sheet.innerHTML=`<div class="po-formula-groups"><small>HOJA DE FÓRMULAS</small><h3>Trabajos prácticos</h3><details class="po-formula-unit" open><summary>TP 1 · Electroquímica</summary>${D.formulas.map(([l,x])=>`<div class="po-formula-item"><b>${esc(l)}</b>${D.M(x)}</div>`).join('')}<p class="po-unit-empty">Temperaturas en K, tiempo en s, carga en C. Los potenciales no se multiplican por los coeficientes.</p></details></div>`;
    }
    // Un enlace del índice abre el ejercicio desplegable al que apunta.
    const openTarget=()=>{const id=location.hash.slice(1);const el=id&&document.getElementById(id);if(el&&el.tagName==='DETAILS'){el.open=true;setTimeout(()=>el.scrollIntoView({block:'start'}),30)}};
    window.addEventListener('hashchange',openTarget);
    document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#tpx-"]');if(a&&location.hash===a.getAttribute('href'))openTarget()});

    if(!document.querySelector('.u5-theme')){
      const toggle=document.createElement('button');toggle.type='button';toggle.className='back-plan u5-theme';toggle.textContent='☀ / ☾';toggle.setAttribute('aria-label','Cambiar tema claro u oscuro');
      toggle.addEventListener('click',()=>{const mode=document.documentElement.dataset.theme;const dark=mode==='dark'||mode==='system'&&matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=dark?'light':'dark';try{localStorage.setItem('cbc-theme',dark?'light':'dark')}catch(_){}});
      document.querySelector('.subject-topbar')?.append(toggle);
    }
    renderMath(document);
    if(location.hash)openTarget();
  }
  let tries=0;const timer=setInterval(()=>{if(document.querySelector('.subject-main')){clearInterval(timer);mount()}else if(++tries>80)clearInterval(timer)},100);
})();
