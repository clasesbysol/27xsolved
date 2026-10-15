/* Unidad 5 · Teoría de Entropía para estudiar y dar clase. Los ejercicios viven en procesos-u5-content.js. */
(function(){
  'use strict';
  const IMG='./assets/procesos/entropia/';
  const ICONS={
    flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.2-3.9 2.5-5 .2 1.6 1 2.6 2 3 0-3 .3-5.6.5-8z"/>',
    snow:'<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
    gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M5.5 18.5l2.1-2.1M16.4 7.6l2.1-2.1"/>',
    arrow:'<path d="M4 12h15M14 7l5 5-5 5"/>',
    loop:'<path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v4h-4"/>',
    scale:'<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/>',
    target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    alert:'<path d="M12 3 2.5 20h19zM12 10v4.5M12 17.2v.3"/>',
    check:'<path d="m4.5 12.5 4.5 4.5L19.5 7"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>',
    thermo:'<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0zM12 9v7"/>',
    bolt:'<path d="M13 2 5 13.5h6L10 22l9-12h-6z"/>',
    spread:'<circle cx="12" cy="12" r="2"/><circle cx="4.5" cy="6" r="1.4"/><circle cx="19" cy="5" r="1.4"/><circle cx="20" cy="17" r="1.4"/><circle cx="5" cy="18.5" r="1.4"/><path d="M10.3 10.8 6 7M13.7 10.8 17.8 6M13.8 13 18.6 16.3M10.4 13.4 6.2 17.4"/>'
  };
  const icon=(name,cls='')=>`<svg class="u5t-ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  const sec=(id,n,kicker,title,body)=>`<article class="u5t-sec" id="${id}"><header class="u5t-head"><span class="u5t-num">${String(n).padStart(2,'0')}</span><div><small>${kicker}</small><h3>${title}</h3></div></header>${body}</article>`;
  const key=(label,html,tone='blue',ic='book')=>`<div class="u5t-key u5t-${tone}">${icon(ic)}<div><b>${label}</b><p>${html}</p></div></div>`;
  const chip=(t,tone='')=>`<span class="u5t-chip ${tone}">${t}</span>`;

  const symbolRows=[
    ['Q<sub>c</sub>','Calor que la máquina <b>recibe</b> de la fuente caliente','J, kJ, kcal'],
    ['Q<sub>f</sub>','Calor que la máquina <b>cede</b> a la fuente fría','J, kJ, kcal'],
    ['L','<b>Trabajo útil</b> que entrega la máquina (en el dibujo del PDF figura como W)','J, kJ'],
    ['T<sub>c</sub> · T<sub>f</sub>','Temperaturas de la fuente caliente y de la fría, <b>siempre en kelvin</b>','K'],
    ['η · η<sub>C</sub>','Rendimiento <b>real</b> y rendimiento <b>ideal o de Carnot</b>','fracción o %'],
    ['S · ΔS','<b>Entropía</b> y su variación','J/K'],
    ['ΔS<sub>u</sub>','Variación de entropía del <b>universo</b> (sistema + entorno)','J/K'],
    ['P · Δt','<b>Potencia</b> mecánica y <b>tiempo</b> de funcionamiento','W · s'],
    ['m · ρ · V · V̇','Masa, densidad, volumen y consumo por unidad de tiempo','kg · kg/L · L · L/h'],
    ['λ · H<sub>c</sub>','<b>Calor latente</b> de condensación y <b>calor de combustión</b> por unidad de masa','J/kg, kcal/kg']
  ];
  function symbols(){
    return `<div class="u5t-table-wrap"><table class="u5t-table"><thead><tr><th>Símbolo</th><th>Qué representa</th><th>Unidad</th></tr></thead><tbody>${symbolRows.map(([s,d,u])=>`<tr><td class="u5t-sym">${s}</td><td>${d}</td><td class="u5t-unit">${u}</td></tr>`).join('')}</tbody></table></div>`;
  }

  /* ---------- Diagramas propios ---------- */
  const pistonReversible=`<svg viewBox="0 0 260 230" class="u5t-svg" role="img" aria-label="Pistón con granitos de arena que se quitan de a uno">
    <rect x="70" y="40" width="120" height="165" rx="6" class="s-wall"/>
    <rect x="76" y="120" width="108" height="82" class="s-gas"/>
    <rect x="72" y="104" width="116" height="16" rx="3" class="s-piston"/>
    ${[0,1,2,3,4,5,6].map(i=>`<circle cx="${92+i*12}" cy="98" r="4.2" class="s-grain"/>`).join('')}
    ${[0,1,2,3,4].map(i=>`<circle cx="${104+i*12}" cy="90" r="4.2" class="s-grain"/>`).join('')}
    <circle cx="214" cy="62" r="4.2" class="s-grain"/><path d="M168 86q30-30 40-20" class="s-arrow" marker-end="url(#u5t-a1)"/>
    <defs><marker id="u5t-a1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="s-tip"/></marker></defs>
    <text x="130" y="168" text-anchor="middle" class="s-txt">gas</text>
    <text x="130" y="224" text-anchor="middle" class="s-cap">se saca un granito por vez</text>
  </svg>`;
  const pistonIrreversible=`<svg viewBox="0 0 260 230" class="u5t-svg" role="img" aria-label="Pistón que se libera de golpe">
    <rect x="70" y="40" width="120" height="165" rx="6" class="s-wall"/>
    <rect x="76" y="70" width="108" height="132" class="s-gas"/>
    <rect x="72" y="54" width="116" height="16" rx="3" class="s-piston"/>
    <path d="M86 110q14-14 28 0t28 0 28 0M86 140q14-14 28 0t28 0 28 0M86 170q14-14 28 0t28 0 28 0" class="s-swirl"/>
    <path d="M130 46V14" class="s-arrow" marker-end="url(#u5t-a2)"/>
    <path d="M60 64l-14-6M60 72l-16 2M200 64l14-6M200 72l16 2" class="s-hot"/>
    <defs><marker id="u5t-a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="s-tip"/></marker></defs>
    <text x="130" y="224" text-anchor="middle" class="s-cap">se suelta de golpe</text>
  </svg>`;
  const flowSvg=`<svg viewBox="0 0 560 236" class="u5t-svg u5t-wide" role="img" aria-label="El calor pasa solo de caliente a frío; para llevarlo al revés hace falta trabajo">
    <defs><marker id="u5t-a3" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 10 5 0 10z" class="s-tip"/></marker></defs>
    <text x="130" y="20" text-anchor="middle" class="s-title">Espontáneo</text>
    <rect x="20" y="34" width="220" height="44" rx="10" class="s-hotbox"/><text x="130" y="61" text-anchor="middle" class="s-txt">Cuerpo caliente</text>
    <path d="M130 80V158" class="s-heat" marker-end="url(#u5t-a3)"/><text x="146" y="124" class="s-small">Q</text>
    <rect x="20" y="172" width="220" height="44" rx="10" class="s-coldbox"/><text x="130" y="199" text-anchor="middle" class="s-txt">Cuerpo frío</text>
    <text x="420" y="20" text-anchor="middle" class="s-title">Máquina frigorífica</text>
    <rect x="310" y="34" width="220" height="44" rx="10" class="s-hotbox"/><text x="420" y="61" text-anchor="middle" class="s-txt">Fuente caliente (ambiente)</text>
    <circle cx="420" cy="125" r="22" class="s-machine"/><text x="420" y="130" text-anchor="middle" class="s-small">M</text>
    <path d="M420 170V156" class="s-heat" marker-end="url(#u5t-a3)"/><text x="406" y="166" text-anchor="end" class="s-small">Q<tspan font-size="10" dy="3">f</tspan></text>
    <path d="M420 102V88" class="s-heat" marker-end="url(#u5t-a3)"/><text x="406" y="98" text-anchor="end" class="s-small">Q<tspan font-size="10" dy="3">c</tspan></text>
    <path d="M530 125H456" class="s-work" marker-end="url(#u5t-a3)"/><text x="494" y="114" text-anchor="middle" class="s-small">L entra</text>
    <rect x="310" y="172" width="220" height="44" rx="10" class="s-coldbox"/><text x="420" y="199" text-anchor="middle" class="s-txt">Fuente fría (interior)</text>
  </svg>`;

  function theory(math){
    const tiles=list=>`<div class="u5t-tiles">${list.map(([label,latex,note])=>`<div class="u5t-tile"><small>${label}</small>${math(latex)}${note?`<p>${note}</p>`:''}</div>`).join('')}</div>`;
    const parts=[
      sec('u5-t-historia',1,'Para empezar la clase','De la máquina de vapor a Carnot',`
        <ol class="u5t-timeline">
          <li><b>Antes</b><span>Se usaba energía de <b>seres vivos</b> (personas, animales) o de <b>fenómenos naturales</b> (viento, agua).</span></li>
          <li><b>Máquina de vapor</b><span>Es capaz de <b>transformar calor en trabajo</b>. Con ella llega la <b>Revolución Industrial</b>.</span></li>
          <li><b>1824 · Sadi Carnot</b><span>Publica un análisis sobre <b>qué tan eficiente</b> puede ser una máquina. En la guía figura como “Sedi Carnot”.</span></li>
          <li><b>Resultado</b><span>Su análisis permitió construir máquinas más eficientes y dio origen a la <b>Termodinámica</b>.</span></li>
        </ol>
        <figure class="u5t-figure"><img src="${IMG}maquina-vapor-commons.webp" alt="Esquema de una máquina de vapor: caldera, cilindro con pistón, rueda y condensador" loading="lazy"><figcaption>Máquina de vapor. Ilustración: Tico1516-Judith, <a href="https://commons.wikimedia.org/wiki/File:M%C3%A1quina_de_vapor_(Primera_Revoluci%C3%B3n_Industrial).svg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0.</figcaption></figure>
        <div class="u5t-legend">
          <div class="u5t-hot">${icon('flame')}<b>Caldera</b><span>Se quema combustible y el agua pasa a vapor. Es la <b>fuente caliente</b>: de acá sale <b>Q<sub>c</sub></b>.</span></div>
          <div class="u5t-blue">${icon('gear')}<b>Cilindro y pistón</b><span>El vapor se expande y empuja el pistón. Esto es la <b>máquina</b>.</span></div>
          <div class="u5t-green">${icon('loop')}<b>Rueda</b><span>La biela transforma el ir y venir del pistón en giro. Es el <b>trabajo útil L</b>.</span></div>
          <div class="u5t-cold">${icon('snow')}<b>Condensador</b><span>El vapor que ya empujó se enfría y vuelve a líquido. Es la <b>fuente fría</b>: recibe <b>Q<sub>f</sub></b>.</span></div>
        </div>
        ${key('Idea para la clase','Aunque la máquina sea muy buena, <b>siempre</b> hay que tirar calor al condensador. Esa es la pregunta que se hizo Carnot: <b>¿cuánto del calor se puede aprovechar como máximo?</b>','yellow','target')}`),

      sec('u5-t-ideal',2,'Definición','Máquina ideal',`
        <p class="u5t-lead">Una <b>máquina ideal</b> es la que tiene la <b>mayor eficacia o rendimiento posible</b> en las condiciones dadas. Funciona en condiciones ideales, donde <b>todos los procesos son reversibles</b>.</p>
        <div class="u5t-duo">
          <div class="u5t-box u5t-green">${icon('check')}<b>Lo que sí logra</b><p>El rendimiento <b>máximo</b> entre esas dos temperaturas: el <b>rendimiento de Carnot</b>.</p></div>
          <div class="u5t-box u5t-red">${icon('alert')}<b>Lo que nunca logra</b><p>Convertir <b>por completo</b> la energía del combustible en trabajo. Una parte importante <b>se pierde como calor hacia el entorno</b>.</p></div>
        </div>`),

      sec('u5-t-reversible',3,'Concepto clave','Procesos reversibles e irreversibles',`
        <p class="u5t-lead">La diferencia está en <b>si se puede volver atrás sin dejar rastro</b> en el universo.</p>
        <div class="u5t-compare">
          <div class="u5t-col u5t-green">
            <header>${chip('Reversible','ok')}<h4>Se puede deshacer</h4></header>
            <figure>${pistonReversible}</figure>
            <ul><li>Ocurre <b>muy lentamente</b>, pasando por estados de equilibrio.</li><li><b>Sin rozamiento</b> y con diferencias de temperatura casi nulas.</li><li>Si volvemos a poner los granitos, el gas vuelve <b>exactamente</b> al estado inicial y el entorno también.</li><li>Es una <b>idealización</b>: sirve como límite.</li></ul>
            <div class="u5t-result">${math('\\Delta S_{universo}=0')}<span>Rendimiento = Carnot</span></div>
          </div>
          <div class="u5t-col u5t-red">
            <header>${chip('Irreversible','bad')}<h4>No vuelve solo</h4></header>
            <figure>${pistonIrreversible}</figure>
            <ul><li>Ocurre <b>rápido</b>, con remolinos, <b>rozamiento</b> o calor que pasa entre cuerpos a <b>distinta temperatura</b>.</li><li>Para volver atrás hay que gastar energía, y el entorno <b>queda cambiado</b>.</li><li>Son <b>todos los procesos reales</b>: un café que se enfría, un freno que se calienta, un motor de auto.</li></ul>
            <div class="u5t-result">${math('\\Delta S_{universo}>0')}<span>Rendimiento menor que Carnot</span></div>
          </div>
        </div>
        ${key('Cómo se usa en los ejercicios','Una <b>máquina reversible</b> trabaja justo en el límite: <b>η = η<sub>C</sub></b> y <b>ΔS<sub>u</sub> = 0</b>. Una <b>máquina irreversible</b> (real) queda por debajo: <b>η &lt; η<sub>C</sub></b> y <b>ΔS<sub>u</sub> &gt; 0</b>.','blue','scale')}`),

      sec('u5-t-entropia',4,'La nueva función de estado','¿Qué es la entropía (S)?',`
        <div class="u5t-def">${icon('spread','u5t-big')}<p>El segundo principio define una nueva <b>función de estado</b>: la <b>ENTROPÍA (S)</b>. Está relacionada con el <b>grado de distribución o dispersión de la energía</b> entre los distintos movimientos de las moléculas del sistema. La llamamos <b>medida del desorden</b> de un sistema.</p></div>
        <div class="u5t-grid3">
          <div class="u5t-box">${icon('loop')}<b>Función de estado</b><p>Su variación depende solo del estado <b>inicial</b> y <b>final</b>, no del camino.</p>${math('\\Delta S=S_{final}-S_{inicial}')}</div>
          <div class="u5t-box">${icon('arrow')}<b>Indica la dirección</b><p>Es la propiedad que dice <b>hacia dónde ocurre</b> un proceso. La describió <b>Rudolf Clausius</b> (1822‑1888), físico alemán.</p></div>
          <div class="u5t-box">${icon('scale')}<b>Unidad</b><p>Como es calor dividido temperatura, en el SI se mide en <b>joule por kelvin</b>.</p>${math('[S]=\\mathrm{J/K}')}</div>
        </div>
        ${key('Ojo con “desorden”','No es desorden visual. La energía <b>no se pierde</b> (se conserva), pero queda <b>más repartida</b> y por eso <b>se puede aprovechar menos</b> para hacer trabajo.','yellow','alert')}`),

      sec('u5-t-calculo',5,'La fórmula de la guía','Entropía de una fuente a temperatura constante',`
        <p class="u5t-lead">Si el proceso es <b>isotérmico</b> (temperatura constante), como consideramos a las <b>fuentes</b> entre las que operan las máquinas térmicas y frigoríficas:</p>
        <div class="u5t-hero">${math('\\Delta S=\\frac{Q}{T}')}</div>
        <div class="u5t-duo">
          <div class="u5t-box">${icon('thermo')}<b>¿Por qué sirve para las fuentes?</b><p>Una fuente es tan grande que <b>entrega o recibe calor sin cambiar su temperatura</b>. Por eso T es constante.</p></div>
          <div class="u5t-box u5t-red">${icon('alert')}<b>Cuándo no usarla así</b><p>No vale para un cuerpo que <b>se calienta o se enfría</b> durante el proceso: su temperatura no es constante.</p></div>
        </div>
        ${key('Siempre en kelvin','La T de esta fórmula es <b>temperatura absoluta</b>: si viene en °C, primero se pasa a K.','blue','thermo')}`),

      sec('u5-t-maquina',6,'Esquema de la guía','Cómo funciona una máquina térmica',`
        <div class="u5t-split">
          <figure class="u5t-figure u5t-pdf"><img src="${IMG}maquina-termica.webp" alt="Esquema: depósito de temperatura elevada, ingreso de calor por ciclo, máquina de calor, salida de trabajo mecánico y salida de calor al depósito de temperatura baja" loading="lazy"><figcaption>Esquema del PDF, página 2.</figcaption></figure>
          <ol class="u5t-steps">
            <li><b>Entra calor.</b> En cada ciclo ingresa energía calórica <b>desde la fuente caliente</b> (Q<sub>c</sub>).</li>
            <li><b>Se aprovecha una parte.</b> Solo una parte se transforma en <b>trabajo útil</b> (L; en el dibujo, W).</li>
            <li><b>Sale el resto.</b> El calor que no se aprovechó se cede a <b>la fuente fría</b> (Q<sub>f</sub>).</li>
            <li><b>Vuelve a empezar.</b> Trabaja <b>por ciclos</b>: al final de cada uno queda igual que al principio.</li>
          </ol>
        </div>
        <div class="u5t-grid3">
          <div class="u5t-box u5t-blue">${icon('thermo')}<b>Fuente fría ≠ fría al tacto</b><p>Es simplemente la de <b>menor temperatura</b>: puede ser el aire a 27 °C.</p>${math('T_c>T_f')}</div>
          <div class="u5t-box u5t-blue">${icon('loop')}<b>En un ciclo completo</b><p>La máquina vuelve al mismo estado: <b>no cambia</b> su energía interna ni su entropía.</p>${math('\\Delta U_{ciclo}=0\\qquad\\Delta S_{máq}=0')}</div>
          <div class="u5t-box u5t-blue">${icon('check')}<b>Cumple las dos leyes</b><p>La energía <b>no se crea ni se destruye</b>, y al fluir calor entre ambas fuentes el rendimiento es <b>&lt; 100 %</b>.</p></div>
        </div>`),

      sec('u5-t-primer',7,'Balance de energía','Primer principio en la máquina',`
        <p class="u5t-lead">Todo lo que entra tiene que salir: el calor recibido se reparte entre <b>trabajo</b> y <b>calor cedido</b>.</p>
        <div class="u5t-hero">${math('Q_c=Q_f+L')}</div>
        ${tiles([['Si piden el trabajo','L=Q_c-Q_f'],['Si piden el calor cedido','Q_f=Q_c-L'],['Si piden el calor recibido','Q_c=Q_f+L']])}
        <div class="u5t-table-wrap"><table class="u5t-table"><thead><tr><th>Convención de signos</th><th>Unidad 4</th><th>Unidad 5</th></tr></thead><tbody>
          <tr><td>Trabajo</td><td>Positivo si se hace <b>sobre</b> el sistema</td><td>Positivo si la máquina lo <b>entrega</b></td></tr>
          <tr><td>Calores</td><td>Con signo según entre o salga</td><td>Q<sub>c</sub> y Q<sub>f</sub> se usan como <b>valores positivos</b></td></tr></tbody></table></div>
        ${key('No hay contradicción','Son dos convenciones distintas. En cada ejercicio conviene <b>aclarar cuál se usa</b>.','yellow','alert')}`),

      sec('u5-t-rendimiento',8,'Qué fracción se aprovecha','Rendimiento real y rendimiento de Carnot',`
        <div class="u5t-duo">
          <div class="u5t-box u5t-green u5t-formula">${chip('η real','ok')}${math('\\eta_{real}=\\frac{L}{Q_c}\\cdot100')}<p>Lo que <b>se aprovecha</b> dividido lo que <b>entra</b>.</p></div>
          <div class="u5t-box u5t-blue u5t-formula">${chip('η ideal o de Carnot')}${math('\\eta_{C}=\\left(1-\\frac{T_f}{T_c}\\right)\\cdot100')}<p>Depende <b>solo de las temperaturas</b> de las fuentes, en <b>kelvin</b>.</p></div>
        </div>
        <div class="u5t-bar" aria-label="Escala de rendimiento">
          <div class="u5t-bar-track"><span class="real" style="width:30%"><b>η real</b></span><span class="carnot" style="width:52%"><b>η Carnot</b></span></div>
          <div class="u5t-bar-labels"><span>0 %</span><span>zona imposible →</span><span>100 %</span></div>
        </div>
        ${key('Regla de oro','<b>Ninguna máquina</b> puede tener un rendimiento <b>mayor</b> al ideal o de Carnot. Solo una máquina reversible lo alcanza.','yellow','target')}
        <h4 class="u5t-sub">Despejes que más se usan</h4>
        ${tiles([['Trabajo','L=\\eta\\,Q_c'],['Calor recibido','Q_c=\\frac{L}{\\eta}'],['Calor cedido','Q_f=Q_c(1-\\eta)']])}
        <div class="u5t-grid3">
          <div class="u5t-box">${icon('target')}<b>η como fracción</b><p>Para despejar usamos el rendimiento como <b>fracción</b>: 40 % = 0,40.</p></div>
          <div class="u5t-box">${icon('thermo')}<b>Kelvin</b><p>T(K) = t(°C) + 273,15. En los ejercicios usamos <b>+ 273</b>; la diferencia es mínima.</p></div>
          <div class="u5t-box">${icon('alert')}<b>“% del ideal”</b><p>“25 % del ideal” significa <b>multiplicar</b>: η = 0,25 · η<sub>C</sub>. No es restar puntos.</p></div>
        </div>`),

      sec('u5-t-universo',9,'Entropía en la máquina','Entropía de las fuentes y del universo',`
        <div class="u5t-flowrow">
          <div class="u5t-box u5t-hot">${icon('flame')}<b>Fuente caliente</b><p><b>Pierde</b> calor: su entropía <b>baja</b>.</p>${math('\\Delta S_c=-\\frac{Q_c}{T_c}')}</div>
          <div class="u5t-plus">+</div>
          <div class="u5t-box u5t-blue">${icon('gear')}<b>Máquina</b><p>Vuelve al mismo estado: <b>no suma</b>.</p>${math('\\Delta S_{máq}=0')}</div>
          <div class="u5t-plus">+</div>
          <div class="u5t-box u5t-cold">${icon('snow')}<b>Fuente fría</b><p><b>Gana</b> calor: su entropía <b>sube</b>.</p>${math('\\Delta S_f=+\\frac{Q_f}{T_f}')}</div>
        </div>
        <div class="u5t-hero"><small>Universo = sistema + entorno</small>${math('\\Delta S_{universo}=\\frac{Q_f}{T_f}-\\frac{Q_c}{T_c}')}</div>
        ${key('El trabajo no entra en la cuenta','El trabajo <b>no es calor</b>: no se divide por ninguna temperatura ni se suma a la entropía.','yellow','alert')}`),

      sec('u5-t-segundo',10,'El criterio para decidir','Segundo principio: ¿puede funcionar?',`
        <p class="u5t-lead">En todo proceso <b>espontáneo e irreversible</b>:</p>
        <div class="u5t-hero">${math('\\Delta S_{sistema}+\\Delta S_{entorno}=\\Delta S_{universo}>0')}</div>
        <div class="u5t-semaforo">
          <div class="ok">${math('\\Delta S_u>0')}<b>Posible</b><span>Máquina real, irreversible.</span></div>
          <div class="mid">${math('\\Delta S_u=0')}<b>Límite</b><span>Máquina ideal, reversible.</span></div>
          <div class="bad">${math('\\Delta S_u<0')}<b>Imposible</b><span>No se puede construir.</span></div>
        </div>
        <h4 class="u5t-sub">Lo que dice la guía</h4>
        <ul class="u5t-checks">
          <li>${icon('arrow')}<span>El calor fluye siempre de los cuerpos de <b>mayor temperatura</b> a los de <b>menor temperatura</b>.</span></li>
          <li>${icon('bolt')}<span>El <b>trabajo</b> se puede transformar <b>totalmente en calor</b>, pero el <b>calor no</b> se puede transformar totalmente en trabajo.</span></li>
          <li>${icon('spread')}<span>La <b>entropía del universo siempre aumenta</b>. Más preciso: <b>nunca disminuye</b>; aumenta en los procesos reales y queda igual en el caso ideal. Un sistema sí puede bajar su entropía si el entorno sube más.</span></li>
          <li>${icon('scale')}<span>Tanto una <b>máquina térmica</b> como una <b>frigorífica</b> necesitan siempre una <b>fuente fría</b> y una <b>fuente caliente</b>.</span></li>
          <li>${icon('target')}<span><b>Ninguna máquina</b> puede tener un rendimiento mayor al ideal o de Carnot.</span></li>
        </ul>
        <div class="u5t-must"><b>Para que una máquina funcione debe cumplir con el 1.° y el 2.° principio</b><div class="u5t-must-row"><div><small>1.° principio</small>${math('Q_c=Q_f+L')}</div><div><small>2.° principio</small>${math('\\Delta S_{universo}\\geq0')}</div></div><p>Cerrar el balance de energía <b>no alcanza</b>. Para el 2.° principio hay dos caminos equivalentes: <b>comparar η con η<sub>C</sub></b> o <b>calcular ΔS<sub>u</sub></b>.</p></div>`),

      sec('u5-t-limites',11,'Cuando piden una temperatura','Temperaturas límite',`
        <p class="u5t-lead">Si piden la temperatura <b>mínima</b> de la fuente caliente o la <b>máxima</b> de la fría, se usa el <b>límite de Carnot</b> (máquina ideal, η = η<sub>C</sub>) y se despeja.</p>
        ${tiles([['Fuente caliente mínima','T_{c,\\min}=\\frac{T_f}{1-\\eta}','Con una T<sub>c</sub> menor, el rendimiento pedido sería imposible.'],['Fuente fría máxima','T_{f,\\max}=T_c(1-\\eta)','Con una T<sub>f</sub> mayor, el rendimiento pedido sería imposible.']])}
        ${key('Para recordar','Una máquina <b>real</b> necesita una diferencia de temperaturas <b>todavía mayor</b> que la del límite.','blue','thermo')}`),

      sec('u5-t-datos',12,'Datos que aparecen en los problemas','Potencia, combustible y condensación',`
        <div class="u5t-grid2">
          <div class="u5t-box">${icon('bolt')}<b>Potencia</b><p>Es energía <b>por unidad de tiempo</b>, no una cantidad de energía. Para tener el trabajo, se multiplica por el tiempo.</p>${math('L=P\\,\\Delta t')}</div>
          <div class="u5t-box">${icon('flame')}<b>Combustible</b><p>Primero la <b>masa</b> quemada (a partir de volumen y densidad) y después el calor de combustión.</p>${math('m=\\rho V\\qquad Q_c=m\\,H_c')}</div>
          <div class="u5t-box">${icon('snow')}<b>Condensación</b><p>Se usa el <b>calor latente</b>. El vapor entrega energía <b>aunque su temperatura no cambie</b>.</p>${math('Q_c=m\\,\\lambda')}</div>
          <div class="u5t-box">${icon('loop')}<b>Consumo por hora</b><p>Si dan litros por hora, el volumen se obtiene con el tiempo.</p>${math('V=\\dot V\\,\\Delta t')}</div>
        </div>
        <div class="u5t-conv">${['1 W = 1 J/s','1 kW = 1000 W','1 min = 60 s','1 h = 3600 s','1 cal = 4,184 J','1 kcal = 4184 J'].map(x=>`<span>${x}</span>`).join('')}</div>`),

      sec('u5-t-frigorifica',13,'El camino inverso','Máquina frigorífica y refrigeración del motor',`
        <figure class="u5t-figure">${flowSvg}<figcaption>Para llevar calor de lo frío a lo caliente hace falta <b>entregar trabajo</b>.</figcaption></figure>
        <p class="u5t-lead">El calor pasa <b>solo</b> de caliente a frío. Una <b>máquina frigorífica</b> hace lo contrario, y por eso <b>necesita recibir trabajo</b>. También funciona entre una fuente fría y una caliente.</p>
        <div class="u5t-split">
          <figure class="u5t-figure u5t-pdf"><img src="${IMG}refrigeracion-motor.webp" alt="Circuito de refrigeración del motor: electroválvula termostática, sensor de temperatura del motor, termostato, tapón de llenado, ventilador, radiador y bomba de agua" loading="lazy"><figcaption>Dibujo del PDF, página 3.</figcaption></figure>
          <div><p>Este dibujo de la guía es el <b>circuito de refrigeración de un motor</b> (no una heladera). Recorrido del líquido:</p>
          <ol class="u5t-steps">
            <li><b>Motor:</b> el líquido <b>recoge calor</b> y sale caliente (rojo).</li>
            <li><b>Sensor y termostato:</b> controlan la temperatura y <b>abren el paso</b> hacia el radiador.</li>
            <li><b>Radiador y ventilador:</b> el líquido <b>cede calor al aire</b> y se enfría (azul).</li>
            <li><b>Bomba de agua:</b> lo devuelve al motor. El <b>tapón de llenado</b> y la <b>electroválvula termostática</b> completan el circuito.</li>
          </ol></div>
        </div>`),

      sec('u5-t-metodo',14,'Antes de calcular','Método de resolución',`
        <ol class="u5t-method">
          <li><b>Dibujar</b><span>Fuente caliente, máquina, fuente fría y las tres flechas: Q<sub>c</sub>, L, Q<sub>f</sub>. La guía pide el esquema en todos los ejercicios.</span></li>
          <li><b>Unificar</b><span>Temperaturas a <b>kelvin</b> y energías en la misma unidad.</span></li>
          <li><b>Elegir y despejar</b><span>Fórmula general primero, despeje después, números al final.</span></li>
          <li><b>Verificar</b><span>Primer principio y, si hay dos temperaturas, segundo principio.</span></li>
          <li><b>Concluir</b><span>Resultado con unidad y <b>qué significa</b>.</span></li>
        </ol>`)
    ];
    return `<div class="u5t">${parts.join('')}</div>`;
  }

  window.ET27_PROCESOS_U5_TEACHING={
    sections:[['u5-t-historia','Máquina de vapor y Carnot'],['u5-t-ideal','Máquina ideal'],['u5-t-reversible','Reversible e irreversible'],['u5-t-entropia','Qué es la entropía'],['u5-t-calculo','ΔS = Q/T'],['u5-t-maquina','Máquina térmica'],['u5-t-primer','Primer principio'],['u5-t-rendimiento','Rendimientos'],['u5-t-universo','Entropía del universo'],['u5-t-segundo','Segundo principio'],['u5-t-limites','Temperaturas límite'],['u5-t-datos','Potencia y combustible'],['u5-t-frigorifica','Frigorífica y refrigeración'],['u5-t-metodo','Método de resolución']],
    symbols,theory,icon
  };
})();
