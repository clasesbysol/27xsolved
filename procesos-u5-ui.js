(function(){
  'use strict';
  const D=window.ET27_PROCESOS_U5;
  if(!D||new URLSearchParams(location.search).get('subject')!=='procesos-operaciones-4')return;
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=x=>`<div class="u5-math" data-u5-math="${esc(encodeURIComponent(x))}" aria-label="Fórmula"></div>`;
  const block=(s,id='')=>`<article class="u5-card ${id?'u4-theory-card':'u4-step'}" ${id?`id="${id}"`:''}><h4>${esc(s.title)}</h4><div class="u5-flow">${(s.flow||[]).map(line=>line.formula?math(line.formula):`<p class="u5-line">${esc(line.text)}</p>`).join('')}</div></article>`;
  function diagram(x,n){
    const warn=n===3;
    return `<figure class="u5-diagram"><svg viewBox="0 0 540 360" role="img" aria-labelledby="u5diag${n}"><title id="u5diag${n}">Esquema del ejercicio ${n}: ${esc(x.hot)} entrega ${esc(x.qc)}; la máquina entrega ${esc(x.work)} y cede ${esc(x.qf)} a ${esc(x.cold)}.</title>
    <defs><marker id="u5arrow${n}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs>
    <rect x="35" y="12" width="330" height="66" rx="12" fill="#fff0e9" stroke="#a94b20"/><text x="200" y="37" text-anchor="middle" fill="#773211">${warn?'Fuente que entrega calor':'Fuente caliente'}</text><text x="200" y="61" text-anchor="middle" fill="#773211">${esc(x.hot)}</text>
    <path d="M200 78V153" stroke="#a94b20" color="#a94b20" stroke-width="3" marker-end="url(#u5arrow${n})"/><text x="218" y="117" fill="currentColor">Qc: ${esc(x.qc)}</text>
    <rect x="96" y="157" width="208" height="63" rx="15" fill="#eef5fb" stroke="#15579D"/><text x="200" y="194" text-anchor="middle" fill="#15579D">Máquina · ciclo</text>
    <path d="M304 188H358" stroke="#15579D" color="#15579D" stroke-width="3" marker-end="url(#u5arrow${n})"/><text x="367" y="174" fill="currentColor">Trabajo útil</text><text x="367" y="196" fill="currentColor">${esc(x.work)}</text>
    <path d="M200 220V289" stroke="#15579D" color="#15579D" stroke-width="3" marker-end="url(#u5arrow${n})"/><text x="218" y="261" fill="currentColor">Qf: ${esc(x.qf)}</text>
    <rect x="35" y="295" width="330" height="60" rx="12" fill="#e9f6ff" stroke="#15579D"/><text x="200" y="319" text-anchor="middle" fill="#15579D">${warn?'Ambiente que recibe calor':'Fuente fría'}</text><text x="200" y="342" text-anchor="middle" fill="#15579D">${esc(x.cold)}</text></svg><figcaption>${warn?'Flujo propuesto por el enunciado; no es un motor térmico posible.':'Esquema energético del intervalo o ciclo indicado en la consigna.'}</figcaption></figure>`;
  }
  const exercisePlans={
  "1": "Vamos a decidir si el motor puede funcionar. Primero pasamos las temperaturas a kelvin y usamos el primer principio para hallar el trabajo. Con él calculamos el rendimiento y lo comparamos con el máximo de Carnot. Finalmente comprobamos la entropía total: conservar energía no alcanza para asegurar que sea posible.",
  "2": "Nos piden el calor cedido y la variación de entropía en un minuto. Primero unificamos unidades y obtenemos el trabajo a partir de la potencia y el tiempo. Después despejamos el calor recibido usando el rendimiento y el calor cedido con el primer principio. Con ambos calores calculamos la entropía de las fuentes y verificamos el segundo principio.",
  "3": "Nos piden elegir el trabajo y el calor, pero primero debemos revisar las temperaturas: el calor entraría desde la fuente más fría. Comprobamos cada opción con el primer principio y luego con la entropía total. Así veremos por qué no alcanza con que cierre el balance y por qué no podemos aplicar Carnot sin revisar los datos.",
  "4": "Vamos a calcular el trabajo y el calor cedido por ciclo. Primero aclaramos qué vapor se condensa y qué calor latente usamos, porque ese dato falta. Con la masa y el calor latente obtenemos el calor recibido. Después usamos el rendimiento para hallar el trabajo y el primer principio para calcular la energía que sale al ambiente.",
  "5": "Nos piden la energía de entrada y la eficiencia durante dos horas. Primero calculamos el volumen consumido y lo pasamos a masa usando la densidad. Con el calor de combustión obtenemos la energía recibida. Luego convertimos el tiempo a segundos y calculamos el trabajo a partir de la potencia; al compararlo con la energía de entrada obtenemos la eficiencia.",
  "6": "Buscamos la menor temperatura caliente compatible con el segundo principio. Primero pasamos la temperatura ambiente a kelvin y el rendimiento a fracción. Usamos el límite reversible de Carnot y despejamos la temperatura caliente. Después aprovechamos el calor cedido para comprobar el balance y verificar que la entropía total sea nula en ese límite.",
  "7": "Vamos a hallar los dos calores y la entropía por ciclo. Primero calculamos el rendimiento de Carnot y tomamos su 25 %, porque nos piden una parte del ideal. Con ese rendimiento y el trabajo despejamos el calor recibido. Luego usamos el primer principio para hallar el calor cedido y sumamos las variaciones de entropía de ambas fuentes.",
  "8": "Vamos a comprobar si las especificaciones describen un motor posible. Primero identificamos las fuentes y pasamos sus temperaturas a kelvin. Revisamos el primer principio, calculamos el rendimiento y lo comparamos con Carnot. Por último comprobamos la entropía total y el trabajo máximo: el motor debe cumplir también el segundo principio.",
  "9": "Nos piden el calor cedido y la temperatura fría máxima. Primero pasamos el rendimiento a fracción y lo usamos para calcular el trabajo. Con el primer principio obtenemos el calor que va a la fuente fría. Después despejamos su temperatura en el límite de Carnot y verificamos que ese máximo corresponda a entropía total nula."
};
  function exercise(e){return `<details class="exercise-item u5-exercise" id="u5-ej-${e.n}" data-searchable><summary><span class="exercise-number">${e.n}</span><span class="exercise-copy"><small>Unidad 5 · Ejercicio ${e.n}</small><b>${esc(e.title)}</b></span><span class="exercise-chevron">›</span></summary><div class="exercise-body"><aside class="u5-exercise-plan" aria-label="Qué vamos a hacer"><svg class="u5-star" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8l-5.8 3.3 1.4-6.4-4.9-4.4 6.5-.7z"/></svg><div><b>Qué vamos a hacer</b><p>${esc(exercisePlans[e.n])}</p></div></aside><h3>Consigna textual</h3><p>${esc(e.statement)}</p>${e.parts.length?`<div class="u5-parts">${e.parts.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}${diagram(e.diagram,e.n)}<details class="u5-solution"><summary>Ver resolución completa paso a paso</summary>${e.steps.map(s=>block(s)).join('')}<div class="u5-result"><b>Respuesta y significado</b><p>${esc(e.answer)}</p></div></details></div></details>`;}
  function renderMath(){
    if(!window.katex)return;
    document.querySelectorAll('[data-u5-math]:not([data-u5-rendered])').forEach(node=>{
      try{window.katex.render(decodeURIComponent(node.dataset.u5Math),node,{displayMode:true,throwOnError:true,output:'htmlAndMathml',strict:'ignore'});node.dataset.u5Rendered='1';}catch(error){node.textContent='No se pudo mostrar esta fórmula.';node.dataset.u5Error=error.message;}
    });
  }
  function configureNavigation(index){
    if(!index)return;
    const oldOpen=new Set([...index.querySelectorAll('details[open]')].map(node=>node.dataset.poUnit).filter(Boolean));
    const initialized=index.classList.contains('po-unit-index');
    const hash=location.hash;
    const openFor=n=>initialized?oldOpen.has(String(n)):(n===(hash.startsWith('#u5-')?5:4));
    const link=(id,label,cls='')=>`<a class="${cls}" href="#${id}">${esc(label)}</a>`;
    const topics=[...document.querySelectorAll('#resumen .u4-theory-card')].map((card,i)=>{card.id=`po-u4-tema-${i+1}`;return [card.id,card.querySelector('h4')?.textContent||`Tema ${i+1}`]});
    const fourth=`${link('resumen','Resumen')}${topics.map(([id,title])=>link(id,title,'po-sub')).join('')}${link('mapa','Mapa mental')}${link('ejercicios','Ejercicios')}${link('parciales','Evaluaciones')}`;
    const fifth=`${link('u5-simbolos','Símbolos')}${link('u5-teoria','Teoría')}${window.ET27_PROCESOS_U5_TEACHING.sections.map(([id,title])=>link(id,title,'po-sub')).join('')}${link('u5-mapa','Mapa para resolver')}${link('u5-ejercicios','Ejercicios 1 a 9')}${link('u5-original','PDF original')}${link('u5-errores','Antes de entregar')}`;
    index.classList.add('po-unit-index');
    index.innerHTML='<small>ÍNDICE</small><h3>Procesos y Operaciones</h3>'+[1,2,3,4,5].map(n=>`<details class="po-unit ${n===(hash.startsWith('#u5-')?5:4)?'po-unit-current':''}" data-po-unit="${n}" ${openFor(n)?'open':''}><summary><span>Unidad ${n}${n===4?' · Primer principio':n===5?' · Entropía':''}</span></summary><div class="po-unit-body">${n<4?'<p class="po-unit-empty">Sin contenido cargado.</p>':n===4?fourth:fifth}</div></details>`).join('');
  }
  function configureFormulaSheet(){
    const sheet=document.getElementById('formulaSheet');
    if(!sheet)return;
    const fourth=window.ET27_PROCESOS_U4?.formulas||[];
    const fifth=[['Balance por ciclo','Q_c=Q_f+L'],['Rendimiento real','\\eta=\\frac{L}{Q_c}'],['Máximo de Carnot','\\eta_C=1-\\frac{T_f}{T_c}'],['Entropía de la fuente caliente','\\Delta S_c=-\\frac{Q_c}{T_c}'],['Entropía de la fuente fría','\\Delta S_f=+\\frac{Q_f}{T_f}'],['Entropía del universo','\\Delta S_u=\\frac{Q_f}{T_f}-\\frac{Q_c}{T_c}'],['Fuente caliente mínima','T_{c,\\min}=\\frac{T_f}{1-\\eta}'],['Fuente fría máxima','T_{f,\\max}=T_c(1-\\eta)'],['Potencia y tiempo','L=P\\Delta t'],['Condensación','Q_c=m\\lambda'],['Combustión','Q_c=mH_c']].map(([label,latex])=>({label,latex}));
    const items=xs=>xs.map(x=>`<div class="po-formula-item"><b>${esc(x.label)}</b>${math(x.latex)}</div>`).join('');
    sheet.innerHTML=`<div class="po-formula-groups"><small>HOJA DE FÓRMULAS</small><h3>Procesos y Operaciones</h3>${[1,2,3].map(n=>`<details class="po-formula-unit"><summary>Unidad ${n}</summary><p class="po-unit-empty">Sin fórmulas cargadas.</p></details>`).join('')}<details class="po-formula-unit" ${location.hash.startsWith('#u5-')?'':'open'}><summary>Unidad 4 · Primer principio</summary>${items(fourth)}</details><details class="po-formula-unit" ${location.hash.startsWith('#u5-')?'open':''}><summary>Unidad 5 · Entropía</summary>${items(fifth)}<p class="po-unit-empty">η como fracción. Temperaturas en K. Para expresar el rendimiento en %, multiplicar por 100.</p></details></div>`;
  }
  function mount(){
    const main=document.querySelector('.subject-main'),index=document.querySelector('.subject-index');
    if(!main||document.getElementById('u5-entropia'))return;
    const unit=document.createElement('section');unit.id='u5-entropia';unit.className='subject-section u5-unit';unit.dataset.searchable='';
    unit.innerHTML=`<div class="section-title"><div><small>PROCESOS · UNIDAD 5</small><h2>${esc(D.title)}</h2></div></div><div class="u5-intro"><p>Máquinas térmicas, rendimiento, entropía y el criterio para saber si una máquina <b>puede funcionar</b>.</p><p><small>${esc(D.source)}</small></p><a class="back-plan" href="./assets/procesos/entropia/guia-original.pdf" target="_blank" rel="noopener">Abrir PDF original · 4 páginas</a></div>
    <section id="u5-simbolos" class="u5-subsection"><h2>Símbolos y unidades</h2>${window.ET27_PROCESOS_U5_TEACHING.symbols()}</section>
    <section id="u5-teoria" class="u5-subsection"><h2>Teoría</h2>${window.ET27_PROCESOS_U5_TEACHING.theory(math)}</section>
    <section id="u5-mapa" class="u5-subsection"><h2>Mapa para elegir el camino</h2><div class="u5-map"><article class="u5-card"><h3>¿Piden calor o trabajo?</h3><p>Empezá por conservación de energía y rendimiento. Si hay potencia, calculá primero el trabajo del intervalo.</p>${math('Q_c=Q_f+L')}${math('L=\\eta Q_c')}</article><article class="u5-card"><h3>¿Puede funcionar?</h3><p>Verificá el balance de energía y luego compará con Carnot o calculá la entropía. Debe cumplir ambos principios.</p>${math('\\eta\\leq1-\\frac{T_f}{T_c}')}${math('\\Delta S_u\\geq0')}</article><article class="u5-card"><h3>¿Piden temperatura límite?</h3><p>Usá la igualdad de Carnot para el límite reversible. Despejá primero y reemplazá después.</p>${math('T_{c,\\min}=\\frac{T_f}{1-\\eta}')}${math('T_{f,\\max}=T_c(1-\\eta)')}</article><article class="u5-card"><h3>¿Piden entropía?</h3><p>Restá el calor perdido por la fuente caliente y sumá el recibido por la fría, cada uno dividido por su temperatura.</p>${math('\\Delta S_u=\\frac{Q_f}{T_f}-\\frac{Q_c}{T_c}')}</article></div></section>
    <section id="u5-ejercicios" class="u5-subsection"><h2>Los nueve ejercicios de la guía</h2><div class="u5-note">${esc(D.instruction)}</div><p>Las consignas conservan la redacción del PDF, incluidas sus erratas. Las aclaraciones y datos añadidos aparecen en la resolución.</p><div class="exercise-list">${D.exercises.map(exercise).join('')}</div></section>
    <section id="u5-original" class="u5-subsection"><h2>Material original completo</h2><p>Estas cuatro páginas conservan todos los textos, fórmulas, rótulos, imágenes, alternativas y pies de la guía. La última página está numerada “2” en el PDF, aunque es la cuarta página del archivo.</p>${[1,2,3,4].map(n=>`<details class="u5-card u5-original"><summary>Ver página ${n} del PDF</summary><a href="./assets/procesos/entropia/pagina-${n}.webp" target="_blank" rel="noopener"><img src="./assets/procesos/entropia/pagina-${n}.webp" alt="Página ${n} completa de la guía original" loading="lazy" class="u5-source-image"></a></details>`).join('')}</section>
    <section id="u5-errores" class="u5-subsection"><h2>Antes de entregar</h2><div class="u5-card"><ul><li>Usá kelvin en Carnot y entropía.</li><li>Distinguí porcentaje absoluto de porcentaje del ideal.</li><li>Convertí potencia por tiempo a trabajo y no confundas kW con kJ.</li><li>Los calores del balance son magnitudes positivas; la entropía de la fuente caliente lleva signo negativo.</li><li>El primer principio solo no demuestra que un motor sea posible.</li><li>Una máquina reversible tiene entropía total nula; una irreversible produce entropía.</li><li>Si falta un dato o el enunciado es incompatible, señalalo antes de calcular: ejercicio 3, temperaturas; ejercicio 4, sustancia y calor latente; ejercicio 5, potencia expresada como “energía”.</li><li>En la Unidad 4 el trabajo sobre el sistema es positivo; aquí el trabajo útil entregado es positivo. Indicá siempre la convención.</li></ul></div></section>`;
    main.insertBefore(unit,document.getElementById('emptySearch'));
    configureNavigation(index);
    configureFormulaSheet();
    // Unidad 4 agrega sus tarjetas al terminar el primer render.
    setTimeout(()=>configureNavigation(index),360);
    const hero=document.querySelector('.subject-hero-card p');if(hero)hero.textContent='Teoría · Unidad 4: Primer principio · Unidad 5: Segundo principio y Entropía.';
    const toggle=document.createElement('button');toggle.type='button';toggle.className='back-plan u5-theme';toggle.textContent='☀ / ☾';toggle.setAttribute('aria-label','Cambiar tema claro u oscuro');toggle.addEventListener('click',()=>{const mode=document.documentElement.dataset.theme;const dark=mode==='dark'||mode==='system'&&matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=dark?'light':'dark';try{localStorage.setItem('cbc-theme',dark?'light':'dark');}catch(_){}});document.querySelector('.subject-topbar')?.append(toggle);
    unit.addEventListener('toggle',renderMath,true);renderMath();
    let tries=0;const timer=setInterval(()=>{renderMath();if(window.katex||++tries>30)clearInterval(timer);},200);
    if(location.hash.startsWith('#u5-'))requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
