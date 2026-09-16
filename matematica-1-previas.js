(function(){
  'use strict';

  const root=document.documentElement;
  const rail=document.querySelector('.formula-rail');
  const fab=document.getElementById('formulaFab');
  const search=document.getElementById('mathSearch');
  const empty=document.getElementById('emptyMathSearch');

  function readTheme(){
    let mode='system';
    try{mode=localStorage.getItem('cbc-theme')||JSON.parse(localStorage.getItem('27xsolved-theme')||'"system"')}catch(_){ }
    if(mode==='system')return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    return mode==='dark'?'dark':'light';
  }
  function applyTheme(){root.dataset.theme=readTheme()}
  applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{
    let mode='system';
    try{mode=localStorage.getItem('cbc-theme')||JSON.parse(localStorage.getItem('27xsolved-theme')||'"system"')}catch(_){ }
    if(mode==='system')applyTheme();
  });

  function installVisualFixes(){
    if(document.getElementById('math-visual-fix-v1120'))return;
    const style=document.createElement('style');
    style.id='math-visual-fix-v1120';
    style.textContent=`
      :root{
        --m-text:#18324A;
        --m-muted:#52697d;
        --m-surface:#ffffff;
        --m-soft:#f4f8fb;
        --m-border:#d6e1ea;
        --m-blue:#15579D;
        --m-yellow:#F7B500;
        --m-dark:#18324A;
        --m-green:#1f6b3a;
      }
      html[data-theme='dark']{
        --m-text:#f3f7fb;
        --m-muted:#c6d3df;
        --m-surface:#152536;
        --m-soft:#1b3045;
        --m-border:#3b566f;
        --m-blue:#78b9ff;
        --m-yellow:#ffd34d;
        --m-dark:#0f2131;
        --m-green:#9ad7aa;
      }

      /* Contraste consistente en TODA la guía. */
      .lesson-section,.class-card,.concept-card,.rule-card,.triangle-rules article,.classification-grid article,
      .method-steps li,.exam-card,.practice-card,.formula-rail,.math-index,.decision-table,.parallel-demo,
      .memory-cards article,.cheat-grid article,.hint,.solution{
        color:var(--m-text)!important;
        border-color:var(--m-border)!important;
      }
      .class-card,.concept-card,.classification-grid article,.parallel-demo,.memory-cards article,.cheat-grid article,
      .exam-card>header,.practice-card>header,.formula-rail>div{
        background:var(--m-soft)!important;
      }
      .section-heading p,.class-card ol,.concept-card p,.rule-card p,.triangle-rules p,.method-steps p,
      .exam-reading ul,.exam-reading li,.practice-card>p,.memory-cards p,.cheat-grid small,.parallel-demo p,
      .geometry-figure figcaption,.hint p,.result-box small{
        color:var(--m-muted)!important;
        opacity:1!important;
      }
      .lesson-section h2,.lesson-section h3,.lesson-section h4,.exam-card h3,.practice-card h3,
      .parallel-demo h3,.signal-box>b,.warning-box>b,.formula-rail h3{
        color:var(--m-text)!important;
      }
      .eyebrow,.section-heading>span,.class-card small,.triangle-rules small,.exam-card header small,
      .practice-card header small,.memory-cards span,.math-index a:hover,.math-index a.active{
        color:var(--m-blue)!important;
      }
      .math-row,.math-step{
        color:var(--m-text)!important;
        background:color-mix(in srgb,var(--m-surface) 76%,var(--m-soft))!important;
        border-color:var(--m-border)!important;
      }
      .math-step{border-left-color:var(--m-blue)!important}
      .difficulty{
        color:#0e2b47!important;
        background:#dcecff!important;
        border:1px solid #b9d6f4!important;
      }
      html[data-theme='dark'] .difficulty{color:#f7fbff!important;background:#20486b!important;border-color:#3c6b91!important}

      /* La caja de marcas nunca vuelve a quedar con texto blanco sobre tarjeta blanca. */
      .signal-box{
        background:#fff6d8!important;
        border-color:#e8c75c!important;
        color:#25384b!important;
      }
      .signal-box>b{color:#25384b!important;font-size:1.05rem!important}
      .signal-grid span{
        background:#ffffff!important;
        color:#193047!important;
        border:1px solid #e2e8ee!important;
        font-weight:800!important;
        opacity:1!important;
      }
      .signal-grid i{
        background:#ffc928!important;
        color:#173149!important;
        box-shadow:inset 0 0 0 1px rgba(70,50,0,.06);
      }
      html[data-theme='dark'] .signal-box{
        background:#2d2815!important;
        border-color:#6f5d1f!important;
      }
      html[data-theme='dark'] .signal-box>b{color:#fff9df!important}
      html[data-theme='dark'] .signal-grid span{
        background:#f8fafc!important;
        color:#14283c!important;
        border-color:#d8e0e8!important;
      }

      /* Regla práctica y tarjetas oscuras: blanco real + secundario legible. */
      html[data-theme='dark'] .parallel-demo{
        background:#172b3e!important;
        border-color:#35516a!important;
      }
      html[data-theme='dark'] .parallel-demo h3{color:#ffffff!important}
      html[data-theme='dark'] .parallel-demo p{color:#d7e2ec!important}
      html[data-theme='dark'] .parallel-demo .math-row{background:#102538!important;color:#ffffff!important}
      html[data-theme='dark'] .memory-cards article{background:#1a3147!important;border-color:#3a5871!important}
      html[data-theme='dark'] .memory-cards b{color:#ffffff!important}
      html[data-theme='dark'] .memory-cards p{color:#d0dce7!important}
      html[data-theme='dark'] .memory-cards span{color:#8bc8ff!important}

      /* Detalles y respuestas. */
      .hint,.solution{background:var(--m-surface)!important}
      .hint summary,.solution summary{color:var(--m-text)!important;background:var(--m-soft)!important}
      .solution-body{border-color:var(--m-border)!important}
      .result-box{background:#eaf6ed!important;border-color:#bddfc6!important;color:#183f24!important}
      .result-box b,.result-box span,.result-box small{color:#183f24!important}
      html[data-theme='dark'] .result-box{background:#193b29!important;border-color:#356949!important;color:#eaffef!important}
      html[data-theme='dark'] .result-box b,html[data-theme='dark'] .result-box span,html[data-theme='dark'] .result-box small{color:#eaffef!important}

      /* Los dibujos se muestran sobre papel claro incluso en modo oscuro: máxima lectura. */
      .hero-visual,.geometry-figure,.parallel-demo svg{
        color:#18324A!important;
      }
      .geometry-figure{
        background:#fbfdff!important;
        border-color:#d8e2eb!important;
        box-shadow:inset 0 0 0 1px rgba(24,50,74,.025);
      }
      .geometry-figure figcaption{color:#425a6f!important}
      .parallel-demo svg{
        background:#fbfdff!important;
        border:1px solid #dbe4ec!important;
        border-radius:16px!important;
        padding:8px!important;
      }
      html[data-theme='dark'] .hero-visual{background:#f8fbfd!important;border-color:#d8e2eb!important;color:#18324A!important}

      /* Sistema único para todos los SVG geométricos. */
      .geo-main{fill:none;stroke:#263f56;stroke-width:5.5;stroke-linecap:round;stroke-linejoin:round}
      .geo-guide{fill:none;stroke:#1769aa;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
      .geo-angle{fill:none;stroke:#f2a100;stroke-width:8;stroke-linecap:round}
      .geo-angle-secondary{fill:none;stroke:#e06f2d;stroke-width:7;stroke-linecap:round}
      .geo-mark{fill:none;stroke:#263f56;stroke-width:4.5;stroke-linecap:round}
      .geo-label{fill:#173149;stroke:#ffffff;stroke-width:5px;paint-order:stroke fill;stroke-linejoin:round;font-weight:900}
      .geo-angle-label{fill:#7b4a00;stroke:#ffffff;stroke-width:5px;paint-order:stroke fill;stroke-linejoin:round;font-weight:900}
      .geo-note{fill:#24445f;stroke:#ffffff;stroke-width:4px;paint-order:stroke fill;font-weight:800}
      .geo-dot{fill:#173149}
      .hero-visual .geo-main{stroke:#263f56}
      .hero-visual .geo-angle{stroke:#f2a100}

      /* Evita burbujas lavadas por reglas viejas del dark mode. */
      html[data-theme='dark'] .angle-types>div,
      html[data-theme='dark'] .teacher-strip span,
      html[data-theme='dark'] .math-index a span{
        background:#edf4fa!important;
        color:#173149!important;
        border-color:#d5e1eb!important;
      }
      html[data-theme='dark'] .angle-types b{color:#174f80!important}
      html[data-theme='dark'] .teacher-strip{background:#0f2131!important;color:#ffffff!important}
      html[data-theme='dark'] .warning-box{background:#2d2815!important;border-color:#6f5d1f!important;color:#fff9df!important}
      html[data-theme='dark'] .warning-box p{color:#f4edcf!important}

      @media (max-width:820px){
        .parallel-demo svg{min-height:240px}
        .geometry-figure svg{max-height:none!important}
      }
    `;
    document.head.append(style);
  }

  function replaceSvg(node,markup){
    if(!node)return;
    const host=document.createElement('div');
    host.innerHTML=markup.trim();
    const next=host.firstElementChild;
    if(next)node.replaceWith(next);
  }

  function examSvg(label){
    const card=[...document.querySelectorAll('.exam-card')].find(item=>item.querySelector('header small')?.textContent.includes(label));
    return card?.querySelector('.geometry-figure svg')||null;
  }

  function installCorrectedGeometry(){
    replaceSvg(document.querySelector('.hero-visual svg'),`
      <svg viewBox="0 0 360 250" role="img" aria-label="Triángulo con ángulos interiores correctamente ubicados">
        <path class="geo-main" d="M62 205 L178 42 L300 205 Z"/>
        <path class="geo-guide" d="M32 136 H328"/>
        <path class="geo-angle" d="M211 88 A36 36 0 0 1 232 119"/>
        <path class="geo-angle" d="M88 205 A28 28 0 0 0 79 181"/>
        <path class="geo-angle" d="M274 181 A28 28 0 0 0 266 205"/>
        <text class="geo-angle-label" x="236" y="112">μ</text>
        <text class="geo-label" x="45" y="229">A</text>
        <text class="geo-label" x="171" y="29">B</text>
        <text class="geo-label" x="305" y="229">C</text>
      </svg>`);

    replaceSvg(document.querySelector('#paralelas .parallel-demo svg'),`
      <svg viewBox="0 0 620 300" role="img" aria-label="Dos rectas paralelas cortadas por una transversal; alfa y beta son alternos internos">
        <path class="geo-main" d="M50 90 H570 M50 230 H570"/>
        <path class="geo-guide" d="M220 20 L390 300"/>
        <circle class="geo-dot" cx="262.5" cy="90" r="4"/>
        <circle class="geo-dot" cx="347.5" cy="230" r="4"/>
        <path class="geo-angle" d="M296.5 90 A34 34 0 0 1 280 119"/>
        <path class="geo-angle" d="M313.5 230 A34 34 0 0 1 329.9 200.9"/>
        <text class="geo-angle-label" x="286" y="120">α</text>
        <text class="geo-angle-label" x="305" y="203">β</text>
        <text class="geo-label" x="72" y="72">r</text>
        <text class="geo-label" x="72" y="214">s</text>
        <text class="geo-note" x="470" y="58">r ∥ s</text>
      </svg>`);

    replaceSvg(examSvg('MODELO A'),`
      <svg viewBox="0 0 520 330" role="img" aria-label="Modelo A: triángulo ABC isósceles con R paralela a AC; mu y C son correspondientes">
        <path class="geo-main" d="M90 285 L260 45 L430 285 Z"/>
        <path class="geo-guide" d="M45 170 H475"/>
        <path class="geo-angle" d="M316.5 170 A32 32 0 0 1 329.9 144"/>
        <path class="geo-angle" d="M394 285 A36 36 0 0 1 409 255"/>
        <path class="geo-mark" d="M168 160 L182 170 M352 160 L338 170"/>
        <text class="geo-label" x="70" y="311">A</text>
        <text class="geo-label" x="253" y="31">B</text>
        <text class="geo-label" x="437" y="311">C</text>
        <text class="geo-angle-label" x="309" y="143">μ</text>
        <text class="geo-angle-label" x="382" y="257">Ĉ</text>
        <text class="geo-note" x="451" y="155">R</text>
        <text class="geo-note" x="205" y="318">R ∥ AC</text>
      </svg>`);

    replaceSvg(examSvg('MODELO B'),`
      <svg viewBox="0 0 520 350" role="img" aria-label="Modelo B: triángulo RTP con prolongaciones; alfa es exterior en T y beta es opuesto por el vértice a P">
        <path class="geo-main" d="M100 260 L165 60 L450 260 Z"/>
        <path class="geo-main" d="M62 260 H505"/>
        <path class="geo-main" d="M100 260 L72 346"/>
        <path class="geo-main" d="M450 260 L510 302"/>
        <path class="geo-angle-secondary" d="M140 260 A40 40 0 0 1 87.6 298"/>
        <path class="geo-angle" d="M482 260 A32 32 0 0 1 476.2 278.4"/>
        <text class="geo-label" x="157" y="46">R</text>
        <text class="geo-label" x="82" y="252">T</text>
        <text class="geo-label" x="445" y="252">P</text>
        <text class="geo-angle-label" x="104" y="313">α</text>
        <text class="geo-angle-label" x="484" y="294">β</text>
        <text class="geo-note" x="394" y="236">p̂</text>
      </svg>`);

    replaceSvg(examSvg('MODELO C'),`
      <svg viewBox="0 0 520 340" role="img" aria-label="Modelo C: triángulo DBC con DB paralela a CT; los arcos beta y mu están separados en el vértice C">
        <path class="geo-main" d="M80 280 L150 88 L329 280 Z"/>
        <path class="geo-main" d="M55 280 H500"/>
        <path class="geo-guide" d="M329 280 L403 77"/>
        <path class="geo-angle" d="M110 280 A30 30 0 0 0 90.3 251.8"/>
        <path class="geo-angle-secondary" d="M305.5 252.8 A36 36 0 0 1 341.3 246.2"/>
        <path class="geo-angle" d="M340 250 A32 32 0 0 1 361 280"/>
        <text class="geo-label" x="63" y="307">D</text>
        <text class="geo-label" x="143" y="75">B</text>
        <text class="geo-label" x="318" y="307">C</text>
        <text class="geo-label" x="408" y="72">T</text>
        <text class="geo-angle-label" x="104" y="247">d̂</text>
        <text class="geo-angle-label" x="314" y="238">β</text>
        <text class="geo-angle-label" x="357" y="257">μ</text>
        <text class="geo-note" x="196" y="118">DB ∥ CT</text>
      </svg>`);

    replaceSvg(examSvg('MODELO D'),`
      <svg viewBox="0 0 520 330" role="img" aria-label="Modelo D: triángulo isósceles RTS; el ángulo interior T y el exterior alfa son suplementarios">
        <path class="geo-main" d="M155 260 L300 70 L445 260 Z"/>
        <path class="geo-main" d="M155 260 L350 5"/>
        <path class="geo-angle" d="M320.6 97 A34 34 0 0 1 279.4 97"/>
        <path class="geo-angle-secondary" d="M329.1 31.8 A48 48 0 0 1 329.1 108.2"/>
        <path class="geo-mark" d="M219 158 L235 171 M385 158 L369 171"/>
        <text class="geo-label" x="137" y="287">R</text>
        <text class="geo-label" x="292" y="61">T</text>
        <text class="geo-label" x="450" y="287">S</text>
        <text class="geo-angle-label" x="291" y="118">t̂</text>
        <text class="geo-angle-label" x="350" y="76">α</text>
        <text class="geo-note" x="219" y="224">RT = TS</text>
      </svg>`);
  }

  installVisualFixes();
  installCorrectedGeometry();

  let mathAttempts=0;
  function renderMath(){
    if(!window.katex){
      mathAttempts+=1;
      if(mathAttempts<40)setTimeout(renderMath,150);
      return;
    }
    document.querySelectorAll('[data-latex]').forEach(node=>{
      if(node.dataset.rendered==='1')return;
      try{
        window.katex.render(node.dataset.latex,node,{throwOnError:false,displayMode:node.classList.contains('math-row')||node.classList.contains('math-step'),output:'htmlAndMathml'});
        node.dataset.rendered='1';
      }catch(err){console.warn('No se pudo renderizar una fórmula',err)}
    });
  }
  renderMath();

  if(rail){rail.id='formulaRail'}
  fab?.addEventListener('click',()=>{
    const open=rail?.classList.toggle('open')||false;
    fab.setAttribute('aria-expanded',String(open));
  });

  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function filterContent(){
    const query=normalize(search?.value.trim());
    const cards=[...document.querySelectorAll('.exam-card.search-target,.practice-card.search-target')];
    cards.forEach(card=>card.classList.toggle('search-hidden',Boolean(query)&&!normalize(card.textContent).includes(query)));

    const sections=[...document.querySelectorAll('.lesson-section.search-target')];
    let visible=0;
    sections.forEach(section=>{
      const ownText=normalize(section.textContent);
      const hasVisibleCard=[...section.querySelectorAll('.exam-card.search-target,.practice-card.search-target')].some(card=>!card.classList.contains('search-hidden'));
      const hasCards=section.querySelector('.exam-card.search-target,.practice-card.search-target');
      const match=!query||ownText.includes(query)||(hasCards&&hasVisibleCard);
      section.classList.toggle('search-hidden',!match);
      if(match)visible+=1;
    });
    empty?.classList.toggle('show',Boolean(query)&&visible===0);
  }
  search?.addEventListener('input',filterContent);
  search?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      search.value='';
      filterContent();
      search.blur();
    }
  });

  const links=[...document.querySelectorAll('.math-index a[href^="#"]')];
  const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+visible.target.id));
    },{rootMargin:'-18% 0px -68% 0px',threshold:[0,.15,.35,.6]});
    sections.forEach(section=>observer.observe(section));
  }

  links.forEach(link=>link.addEventListener('click',()=>{
    if(innerWidth<=820){
      const index=document.querySelector('.math-index');
      index?.scrollTo({left:Math.max(0,link.offsetLeft-24),behavior:'smooth'});
    }
  }));

  document.querySelectorAll('details.solution,details.hint').forEach(details=>details.addEventListener('toggle',()=>{
    if(details.open)renderMath();
  }));
})();