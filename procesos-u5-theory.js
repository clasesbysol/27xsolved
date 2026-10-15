/* Teoría visual de Entropía. Los ejercicios se mantienen en su módulo original. */
(function(){
  'use strict';
  const badge=(icon,label)=>`<span class="u5-badge"><span aria-hidden="true">${icon}</span> ${label}</span>`;
  const head=(n,icon,title,kicker)=>`<header class="u5-lesson-head"><span class="u5-lesson-icon" aria-hidden="true">${icon}</span><div><small>${n} · ${kicker}</small><h3>${title}</h3></div></header>`;
  const cue=(label,text,tone='')=>`<aside class="u5-cue ${tone}"><b>${label}</b><span>${text}</span></aside>`;
  const card=(icon,title,text,tone='')=>`<article class="u5-mini ${tone}"><span class="u5-mini-icon" aria-hidden="true">${icon}</span><h4>${title}</h4><p>${text}</p></article>`;
  function energyDiagram(){return `<figure class="u5-energy-figure"><svg viewBox="0 0 720 340" role="img" aria-labelledby="u5-energy-title u5-energy-desc"><title id="u5-energy-title">Una entrada y dos salidas de energía</title><desc id="u5-energy-desc">La fuente caliente entrega calor Qc a la máquina. La máquina entrega trabajo L y cede calor Qf a la fuente fría.</desc><defs><marker id="u5-hot-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#c45b20"/></marker><marker id="u5-cold-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#1664a0"/></marker><marker id="u5-work-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#32734f"/></marker></defs><rect x="24" y="114" width="164" height="106" rx="18" class="u5-svg-hot"/><text x="106" y="146" text-anchor="middle" class="u5-svg-hot-text">FUENTE CALIENTE</text><text x="106" y="173" text-anchor="middle" class="u5-svg-hot-text u5-svg-bold">Entrega calor</text><text x="106" y="199" text-anchor="middle" class="u5-svg-hot-text">a temperatura Tc</text><path d="M188 166H285" stroke="#c45b20" stroke-width="10" marker-end="url(#u5-hot-tip)"/><text x="235" y="139" text-anchor="middle" class="u5-svg-label">Qc · ENTRA</text><rect x="294" y="112" width="156" height="110" rx="22" class="u5-svg-engine"/><text x="372" y="156" text-anchor="middle" class="u5-svg-label u5-svg-bold">MÁQUINA</text><text x="372" y="185" text-anchor="middle" class="u5-svg-label">trabaja por ciclos</text><path d="M450 166H535" stroke="#32734f" stroke-width="10" marker-end="url(#u5-work-tip)"/><text x="493" y="139" text-anchor="middle" class="u5-svg-label">L · SALE</text><rect x="545" y="114" width="150" height="106" rx="18" class="u5-svg-work"/><text x="620" y="151" text-anchor="middle" class="u5-svg-work-text u5-svg-bold">TRABAJO ÚTIL</text><text x="620" y="178" text-anchor="middle" class="u5-svg-work-text">mueve una rueda</text><text x="620" y="201" text-anchor="middle" class="u5-svg-work-text">o un pistón</text><path d="M372 222V270" stroke="#1664a0" stroke-width="9" marker-end="url(#u5-cold-tip)"/><text x="412" y="255" class="u5-svg-label">Qf · SALE</text><rect x="255" y="281" width="235" height="48" rx="14" class="u5-svg-cold"/><text x="372" y="310" text-anchor="middle" class="u5-svg-cold-text">FUENTE FRÍA · recibe calor · Tf</text></svg><figcaption><b>Leé las flechas:</b> entra calor; salen trabajo útil y calor. El dibujo representa un ciclo completo.</figcaption></figure>`;}
  function pistonDiagram(real){
    const suffix=real?'real':'ideal';
    return `<svg class="u5-piston" viewBox="0 0 330 205" role="img" aria-labelledby="u5-piston-${suffix}"><title id="u5-piston-${suffix}">${real?'Pistón real: hay rozamiento y parte del trabajo se disipa como calor.':'Pistón ideal: sin rozamiento; pequeños cambios de carga pueden invertir el movimiento.'}</title><path d="M48 25V160H247V25" fill="none" class="u5-svg-stroke" stroke-width="4"/><rect x="51" y="81" width="193" height="76" rx="2" class="u5-svg-cold"/><g fill="#1974b2">${[[75,104],[115,137],[158,104],[198,133],[223,106],[80,139],[132,112],[174,142]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g><rect x="46" y="65" width="203" height="15" rx="4" class="u5-svg-engine"/><rect x="139" y="18" width="18" height="47" class="u5-svg-engine"/>${real?`<path d="M30 61l-11 17 13 6-14 17M264 64l12 14-13 11 12 12" stroke="#c45b20" stroke-width="4" fill="none"/><text x="273" y="128" class="u5-svg-hot-text">calor</text><text x="147" y="192" text-anchor="middle" class="u5-svg-label">Rozamiento · disipación</text>`:`<rect x="119" y="9" width="18" height="12" rx="2" class="u5-svg-work"/><rect x="160" y="9" width="18" height="12" rx="2" class="u5-svg-work"/><path d="M280 52V114M273 61l7-10 7 10M273 105l7 10 7-10" fill="none" stroke="#32734f" stroke-width="3"/><text x="147" y="192" text-anchor="middle" class="u5-svg-label">Cambios muy pequeños · sin rozamiento</text>`}</svg>`;
  }
  function heatDirection(){return `<div class="u5-heat-route" role="img" aria-label="El calor fluye espontáneamente de un cuerpo más caliente a otro más frío"><span class="u5-temp hot">🔥<b>Más caliente</b></span><span class="u5-route-arrow"><b>CALOR</b><span aria-hidden="true">⟶</span><small>fluye espontáneamente</small></span><span class="u5-temp cold">❄️<b>Más frío</b></span></div>`;}
  function symbols(){return `<div class="u5-symbol-grid">${[
    ['🔥','Qc','Calor que <b>recibe</b> la máquina de la fuente caliente.','J, cal o kcal'],['❄️','Qf','Calor que la máquina <b>cede</b> a la fuente fría.','J, cal o kcal'],['⚙️','L','<b>Trabajo útil entregado</b> por la máquina.','J, cal o kcal'],['🌡️','Tc / Tf','Temperatura <b>caliente / fría</b>. En los cocientes, siempre kelvin.','K'],['🎯','η / ηC','Rendimiento <b>real / ideal de Carnot</b>.','fracción o %'],['↗️','ΔS / ΔSu','Cambio de entropía del <b>sistema / universo</b>.','J/K'],['⏱️','P / Δt','<b>Potencia</b> mecánica y <b>tiempo</b> de funcionamiento.','W y s'],['⛽','m / ρ / V / V̇','<b>Masa, densidad, volumen</b> y consumo por unidad de tiempo.','unidades coherentes'],['💧','λ / Hc','<b>Calor latente</b> de condensación y <b>calor de combustión</b> por masa.','J/kg']
  ].map(([ico,symbol,text,unit])=>`<article class="u5-symbol"><span aria-hidden="true">${ico}</span><div><b>${symbol}</b><p>${text}</p><small>${unit}</small></div></article>`).join('')}</div>`;}
  function theory(m){return `<div class="u5-teaching">
  <section class="u5-lesson" id="u5-maquina">
    ${head('01','⚙️','¿Dónde se ve una máquina térmica?','Mirar antes de calcular')}
    <p class="u5-lead">Pensá en una <b>máquina de vapor</b>: recibe energía como calor y entrega parte como <b>movimiento útil</b>.</p>
    <figure class="u5-machine-photo"><img src="./assets/procesos/entropia/maquina-vapor-commons.webp" alt="Máquina de vapor con caldera, pistón, cilindro, rueda y condensador señalados en español" width="1200" height="713" loading="lazy"><figcaption>Tico1516-Judith · <a href="https://commons.wikimedia.org/wiki/File:M%C3%A1quina_de_vapor_(Primera_Revoluci%C3%B3n_Industrial).svg" target="_blank" rel="noopener">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>. Dibujo sin modificaciones; convertido a WebP.</figcaption></figure>
    <div class="u5-inspect" aria-label="Seguir el recorrido de la energía"><p><b>Seguí el recorrido:</b> tocá cada parte.</p><div class="u5-part-buttons" role="group" aria-label="Partes de la máquina"><button type="button" data-u5-part="caldera" aria-pressed="true">🔥 Caldera</button><button type="button" data-u5-part="piston" aria-pressed="false">↔ Pistón</button><button type="button" data-u5-part="rueda" aria-pressed="false">⚙️ Rueda</button><button type="button" data-u5-part="condensador" aria-pressed="false">❄️ Condensador</button></div><p class="u5-part-detail" aria-live="polite"><b>Caldera:</b> el combustible aporta calor y el agua se transforma en vapor.</p></div>
    <div class="u5-reading-grid">${card('🔥','La entrada','La combustión aporta <b>energía térmica</b>.','hot')}${card('⚙️','Lo que aprovechamos','El vapor empuja el pistón. La biela transmite el movimiento a la <b>rueda</b>.','work')}${card('❄️','Lo que se cede','En el <b>condensador</b>, el vapor cede calor a una fuente fría. No todo lo recibido se transforma en trabajo.','cold')}</div>
    ${cue('Para dar la clase','Señalá la caldera y preguntá: <b>¿qué entra?</b> Después señalá la rueda: <b>¿qué obtenemos?</b>')}
    <details class="u5-extra-info"><summary>📖 La historia que aparece en el PDF</summary><p>Antes de la máquina de vapor se utilizaba energía de <b>seres vivos y fenómenos naturales</b>. Su desarrollo fue decisivo en la <b>Revolución Industrial</b>.</p><p>En <b>1824</b>, Carnot analizó qué determina el rendimiento de una máquina. Su trabajo permitió mejorar las máquinas y sentó las bases de la <b>termodinámica</b>.</p><p>El original escribe “Sedi Carnot”; el nombre es <b>Sadi Carnot</b>. Las páginas originales conservan la grafía del PDF.</p></details>
  </section>

  <section class="u5-lesson" id="u5-flujo">
    ${head('02','🔥','Una entrada, dos salidas','Las tres flechas que hay que reconocer')}
    ${energyDiagram()}
    <div class="u5-reading-grid">${card('🔥','Fuente caliente','Es la de <b>mayor temperatura</b>. Le entrega calor a la máquina.','hot')}${card('⚙️','Máquina','Transforma <b>una parte del calor</b> recibido en trabajo útil.','work')}${card('❄️','Fuente fría','Es la de <b>menor temperatura</b>. Recibe el calor cedido.','cold')}</div>
    ${cue('“Fría” es un nombre relativo','Puede estar caliente al tacto. Lo que importa es que tenga <b>menor temperatura que la fuente caliente</b>.')}
    <details class="u5-extra-info"><summary>🖼️ Comparar con el esquema del PDF</summary><img class="u5-source-image" src="./assets/procesos/entropia/maquina-termica.webp" alt="Esquema original: depósito de temperatura elevada, ingreso de calor, máquina de calor, trabajo mecánico y depósito de temperatura baja" loading="lazy"><p>El dibujo original muestra el <b>ingreso de calor por ciclo</b>, la <b>salida de trabajo mecánico</b> y la <b>salida de calor hacia el depósito frío</b>.</p></details>
  </section>

  <section class="u5-lesson" id="u5-reversible">
    ${head('03','↔️','Reversible e irreversible','Esta diferencia es la clave')}
    <p class="u5-lead">La pregunta no es si una rueda puede girar al revés. Es si podemos <b>deshacer el proceso sin dejar cambios en el sistema ni en su entorno</b>.</p>
    <div class="u5-compare">
      <article class="u5-comparison reversible">${badge('↔️','MODELO IDEAL')}<h4>Máquina reversible</h4><p>Todos los procesos de su ciclo son <b>reversibles</b>.</p>${pistonDiagram(false)}<p>Imaginá un pistón <b>sin rozamiento</b>. Cambiamos la carga de a muy poquito.</p><p>Una variación mínima puede invertir el movimiento. El intercambio de calor se idealiza con diferencias de temperatura <b>infinitesimales</b>.</p><ul><li>Podemos invertir el camino sin dejar cambios netos en <b>sistema y entorno</b>.</li><li><b>No genera entropía.</b></li><li>Da el <b>máximo rendimiento</b> entre las fuentes dadas.</li></ul>${m('\\Delta S_{\\mathrm{universo}}=0')}
      </article>
      <article class="u5-comparison irreversible">${badge('⚙️','MÁQUINA REAL')}<h4>Máquina irreversible</h4><p>Al menos una parte de su funcionamiento incluye <b>irreversibilidades</b>.</p>${pistonDiagram(true)}<p>Ahora hay <b>rozamiento</b>, combustión o intercambio de calor con diferencias finitas de temperatura.</p><p>Podemos devolver la máquina a su estado inicial, pero no borrar <b>todos los efectos sobre el entorno</b>.</p><ul><li>Se disipa energía que ya no se aprovecha igual para producir trabajo.</li><li><b>Genera entropía.</b></li><li>Su rendimiento es <b>menor que el ideal</b> entre las mismas fuentes.</li></ul>${m('\\Delta S_{\\mathrm{universo}}>0')}
      </article>
    </div>
    ${cue('Ojo con esta confusión','<b>Irreversible no significa que la máquina no pueda volver al inicio.</b> Lo que no se puede deshacer sin dejar huella es el proceso completo: máquina <b>y entorno</b>.','amber')}
    <details class="u5-extra-info"><summary>☕ Un ejemplo cotidiano para explicarlo</summary><p>Un café caliente se enfría y el ambiente recibe calor.</p><p>El calor no vuelve espontáneamente del ambiente al café para dejar <b>todo exactamente como antes</b>.</p><p>Podés recalentar el café, pero necesitás energía externa y provocás otros cambios. Eso <b>no deshace el proceso original</b>.</p></details>
    <p class="u5-bottom-line"><b>La máquina de vapor de la imagen es una máquina real: irreversible.</b> La reversible es un modelo de comparación, no una máquina perfecta que podamos construir.</p>
  </section>

  <section class="u5-lesson" id="u5-ciclos">
    ${head('04','🔄','¿Qué significa trabajar por ciclos?','Volver al inicio no es borrar lo ocurrido')}
    <div class="u5-cycle-strip"><span><b>1</b>Recibe calor</span><i aria-hidden="true">→</i><span><b>2</b>Entrega trabajo y calor</span><i aria-hidden="true">→</i><span><b>3</b>Vuelve al mismo estado</span></div>
    <p>Al terminar el ciclo, la máquina recupera su <b>estado inicial</b>. Puede empezar otro ciclo.</p>
    <div class="u5-two-formulas"><div><b>Energía interna de la máquina</b>${m('\\Delta U_{\\mathrm{ciclo}}=0')}</div><div><b>Entropía de la máquina</b>${m('\\Delta S_{\\mathrm{m\\acute aquina,ciclo}}=0')}</div></div>
    ${cue('¿Entonces la entropía total también es cero?','<b>No necesariamente.</b> La máquina vuelve al inicio, pero las fuentes han entregado o recibido calor. Hay que incluirlas al evaluar el <b>universo</b>.')}
    <p class="u5-bottom-line">Tanto una máquina <b>reversible</b> como una <b>irreversible</b> pueden trabajar por ciclos.</p>
  </section>

  <section class="u5-lesson" id="u5-entropia-concepto">
    ${head('05','✨','¿Qué nos dice la entropía?','La energía se conserva, pero se dispersa')}
    <div class="u5-concept-banner"><span class="u5-big-s" aria-hidden="true">S</span><div><h4>Entropía</h4><p>Es una <b>función de estado</b> relacionada con cómo se distribuye y se dispersa la energía entre los movimientos de las moléculas.</p></div></div>
    <div class="u5-two-col">${card('📍','Función de estado','Su cambio depende del <b>estado inicial y del final</b>, no del camino elegido.')}${card('🧩','“Medida del desorden”','Así lo presenta el PDF. Usalo como ayuda inicial, sin confundirlo con <b>desorden visual</b>.')}</div>
    ${heatDirection()}
    <p>Cuando el calor se distribuye espontáneamente entre cuerpos a distinta temperatura, la energía queda <b>más dispersa</b>.</p>
    ${cue('Lo que se conserva y lo que cambia','La energía <b>no desaparece</b>. En un proceso irreversible, una parte queda <b>menos disponible para obtener trabajo útil</b>.','amber')}
    <p>Clausius relacionó la variación de entropía con el calor. Para las <b>fuentes a temperatura constante</b> de esta guía:</p>
    ${m('\\Delta S=\\frac{Q}{T}')}
    <div class="u5-formula-key"><span><b>Q</b> · calor recibido con su signo</span><span><b>T</b> · temperatura en kelvin</span><span><b>ΔS</b> · cambio de entropía</span></div>
    <p class="u5-small-note">En general se emplea calor de un camino <b>reversible</b>. La forma anterior se usa aquí para cada depósito térmico ideal, que mantiene su temperatura.</p>
    ${m('[\\Delta S]=\\mathrm{J/K}')}
    <p class="u5-small-note">También puede aparecer en cal/K o kcal/K si el calor se conserva en esas unidades. <b>No mezclamos unidades.</b></p>
    <details class="u5-extra-info"><summary>👤 ¿Quién fue Clausius?</summary><p><b>Rudolf Clausius (1822–1888)</b> fue el físico alemán que formuló esta relación y una expresión del segundo principio.</p></details>
  </section>

  <section class="u5-lesson" id="u5-segundo-principio">
    ${head('06','🧭','¿En qué dirección puede ocurrir un proceso?','Segundo principio')}
    ${heatDirection()}
    <div class="u5-two-col">${card('✓','Ocurre espontáneamente','El calor pasa del cuerpo <b>más caliente al más frío</b>.','work')}${card('⚡','Requiere intervención','Para llevar calor del frío al caliente hace falta un <b>aporte externo de trabajo</b>.','cold')}</div>
    <p>Podemos transformar trabajo totalmente en calor, por ejemplo por rozamiento.</p>
    <p>Una máquina térmica que trabaja por ciclos <b>no puede transformar todo el calor recibido de una sola fuente en trabajo</b>.</p>
    ${cue('Regla para una máquina cíclica','Necesita una <b>fuente caliente</b> y una <b>fuente fría</b>. Parte del calor debe salir hacia la fuente fría.','amber')}
    <p>El PDF expresa el segundo principio sumando el cambio del sistema y el del entorno:</p>
    ${m('\\Delta S_{\\mathrm{sistema}}+\\Delta S_{\\mathrm{entorno}}=\\Delta S_{\\mathrm{universo}}')}
    <div class="u5-status-grid"><article class="u5-status possible"><span aria-hidden="true">✓</span><b>Irreversible posible</b>${m('\\Delta S_{\\mathrm{universo}}>0')}<small>Se produce entropía.</small></article><article class="u5-status ideal"><span aria-hidden="true">↔</span><b>Límite reversible</b>${m('\\Delta S_{\\mathrm{universo}}=0')}<small>No se produce entropía.</small></article><article class="u5-status impossible"><span aria-hidden="true">✕</span><b>Imposible</b>${m('\\Delta S_{\\mathrm{universo}}<0')}<small>Violaría el segundo principio.</small></article></div>
    <p class="u5-small-note">El original dice “La entropía del universo siempre aumenta”. La precisión es <b>nunca disminuye</b>: aumenta si es irreversible y no cambia en el límite reversible.</p>
    ${cue('Sistema no es universo','Un sistema particular <b>sí puede disminuir su entropía</b>. El entorno debe compensarlo para que el total no disminuya.')}
  </section>

  <section class="u5-lesson" id="u5-balance">
    ${head('07','⚖️','La energía tiene que cerrar','Primer principio aplicado a la máquina')}
    <p>De toda la energía que entra, una parte sale como trabajo y otra como calor.</p>
    <div class="u5-balance-banner"><span class="hot">🔥 Calor recibido</span><span aria-hidden="true">=</span><span class="work">⚙️ Trabajo útil</span><span aria-hidden="true">+</span><span class="cold">❄️ Calor cedido</span></div>
    ${m('Q_c=Q_f+L')}
    <div class="u5-formula-key"><span><b>Qc</b> · entrada</span><span><b>L</b> · salida útil</span><span><b>Qf</b> · salida hacia la fuente fría</span></div>
    ${cue('Dos controles, no uno solo','Una máquina debe cumplir <b>el primer y el segundo principio</b>. Que cierre la energía no demuestra, por sí solo, que pueda funcionar.','amber')}
    <details class="u5-extra-info"><summary>± La convención de signos de esta unidad</summary><p>Tomamos <b>Qc, Qf y el trabajo útil L como magnitudes positivas</b> en el balance anterior.</p><p>En la Unidad 4 se tomó positivo el trabajo realizado <b>sobre</b> el sistema. Aquí L es trabajo entregado <b>por</b> la máquina: la convención es distinta.</p><p>La energía interna no cambia en el ciclo. El calor neto recibido queda compensado por el trabajo que sale.</p></details>
  </section>

  <section class="u5-lesson" id="u5-rendimiento">
    ${head('08','🎯','¿Cuánto de lo recibido se aprovecha?','Rendimiento real y límite de Carnot')}
    <div class="u5-efficiency-intro"><p><b>Rendimiento</b> significa comparar el <b>trabajo útil</b> con el <b>calor recibido</b>.</p>${m('\\eta=\\frac{L}{Q_c}')}</div>
    <p>Para expresarlo como porcentaje, multiplicamos por cien:</p>
    ${m('\\eta_{\\mathrm{real},\\%}=\\frac{L}{Q_c}\\cdot100')}
    <div class="u5-two-col"><article class="u5-mini"><span class="u5-mini-icon" aria-hidden="true">⚙️</span><h4>Real</h4><p>Calculamos cuánto trabajo entrega la <b>máquina concreta</b>.</p><p>Usamos su calor de entrada y su trabajo útil.</p></article><article class="u5-mini work"><span class="u5-mini-icon" aria-hidden="true">🏁</span><h4>Ideal o de Carnot</h4><p>Es el <b>máximo posible</b> entre esas dos temperaturas.</p><p>Lo alcanza el modelo <b>reversible</b>.</p></article></div>
    ${m('\\eta_{\\mathrm{Carnot},\\%}=\\left(1-\\frac{T_f}{T_c}\\right)\\cdot100')}
    <div class="u5-formula-key"><span><b>Tc</b> · fuente caliente</span><span><b>Tf</b> · fuente fría</span><span><b>Ambas en K</b></span></div>
    ${cue('El límite no se puede superar','<b>Ninguna máquina</b> puede rendir más que Carnot entre las mismas fuentes. La máquina real irreversible queda por debajo.')}
    <div class="u5-two-col">${card('🌡️','Kelvin, siempre','El cociente de temperaturas requiere <b>temperaturas absolutas</b>.')}${card('➗','Fracción o porcentaje','Para despejar en los ejercicios usamos <b>la fracción decimal</b>; multiplicamos por cien al informar el porcentaje.')}</div>
    ${m('T(\\mathrm K)=t({}^{\\circ}\\mathrm C)+273{,}15')}
    <p class="u5-small-note">En las resoluciones se conserva la aproximación escolar de sumar <b>273</b>. Se indican las pequeñas diferencias donde corresponde.</p>
    <details class="u5-extra-info"><summary>🔎 “25 % del ideal” no significa “rendimiento de 25 %”</summary><p>Si se pide un porcentaje del rendimiento ideal, tomamos <b>esa fracción de Carnot</b>. No restamos puntos porcentuales.</p>${m('\\eta=\\alpha\\,\\eta_{\\mathrm C}')}<p><b>α</b> es la fracción pedida. Los cálculos completos permanecen en los ejercicios.</p></details>
  </section>

  <section class="u5-lesson" id="u5-entropia-fuentes">
    ${head('09','➕','¿Quién gana y quién pierde entropía?','Mirar cada fuente por separado')}
    <div class="u5-two-col"><article class="u5-mini hot"><h4>🔥 Fuente caliente</h4><p><b>Entrega calor.</b> Su entropía disminuye.</p>${m('\\Delta S_c=-\\frac{Q_c}{T_c}')}</article><article class="u5-mini cold"><h4>❄️ Fuente fría</h4><p><b>Recibe calor.</b> Su entropía aumenta.</p>${m('\\Delta S_f=+\\frac{Q_f}{T_f}')}</article></div>
    <p>La máquina cíclica vuelve al mismo estado. Para el universo del modelo, sumamos los cambios de las dos fuentes:</p>
    ${m('\\Delta S_{\\mathrm{universo}}=\\frac{Q_f}{T_f}-\\frac{Q_c}{T_c}')}
    <div class="u5-reading-grid">${card('±','Primero, los signos','Calor que recibe el depósito: <b>positivo</b>. Calor que pierde: <b>negativo</b>.')}${card('🌡️','Después, la temperatura','Cada calor se divide por la temperatura <b>de su propia fuente</b>, en kelvin.')}${card('🧭','Al final, interpretamos','El signo del resultado decide si la propuesta <b>respeta el segundo principio</b>.')}</div>
    ${cue('No agregamos un término por el trabajo','El trabajo útil <b>no se divide por temperatura</b> como si fuera calor.')}
    <p class="u5-small-note">“Universo” incluye sistema y entorno pertinente. Para esta guía usamos <b>máquina cíclica y dos fuentes ideales</b>; las fuentes entregan o reciben calor sin cambiar apreciablemente su temperatura.</p>
  </section>

  <section class="u5-lesson" id="u5-frigorifica">
    ${head('10','❄️','Refrigerar también implica mover calor','Distinguir los dos ejemplos')}
    <div class="u5-two-col">${card('🔥','Máquina térmica','Recibe calor de la fuente caliente y <b>entrega trabajo útil</b>.')}${card('❄️','Máquina frigorífica','Recibe <b>trabajo externo</b> para llevar calor de la fuente fría a la caliente.','cold')}</div>
    <figure class="u5-original-in-context"><img src="./assets/procesos/entropia/refrigeracion-motor.webp" alt="Circuito de refrigeración del motor con electroválvula termostática, sensor, termostato, tapón de llenado, ventilador, radiador y bomba de agua" loading="lazy"><figcaption><b>Imagen del PDF:</b> refrigeración de un motor.</figcaption></figure>
    <div class="u5-cycle-strip"><span><b>1</b>El líquido recoge calor del motor</span><i aria-hidden="true">→</i><span><b>2</b>Lo lleva al radiador</span><i aria-hidden="true">→</i><span><b>3</b>El calor pasa al ambiente</span></div>
    ${cue('No confundamos el dibujo con una heladera','Este esquema muestra <b>cómo se enfría un motor</b>. No es necesariamente una máquina frigorífica con compresor que extrae calor de una fuente más fría que el ambiente.','amber')}
    <details class="u5-extra-info"><summary>🏷️ Rótulos completos del dibujo original</summary><ul><li>Electroválvula termostática.</li><li>Sensor temperatura del motor.</li><li>Termostato.</li><li>Tapón de llenado.</li><li>Ventilador.</li><li>Radiador.</li><li>Bomba de agua.</li></ul></details>
  </section>

  <section class="u5-lesson" id="u5-formulas-uso">
    ${head('11','🧰','Qué fórmula usar según el dato','Herramientas para los ejercicios')}
    <p>Sin demostraciones adicionales. Elegimos según <b>qué dato nos dan</b> y <b>qué nos piden</b>.</p>
    <div class="u5-tool-grid"><details class="u5-tool"><summary>⏱️ Me dan potencia y tiempo</summary><p>La potencia no es energía. Multiplicala por el tiempo para hallar el <b>trabajo útil</b>.</p>${m('L=P\\,\\Delta t')}<small>P en W y tiempo en s → trabajo en J.</small></details><details class="u5-tool"><summary>⛽ Me dan consumo de combustible</summary><p>Primero obtenemos volumen y masa. Después multiplicamos por el <b>calor de combustión por kilogramo</b>.</p>${m('V=\\dot V\\,\\Delta t')}${m('m=\\rho V')}${m('Q_c=mH_c')}</details><details class="u5-tool"><summary>💧 Me dan vapor que condensa</summary><p>En el cambio de fase usamos <b>calor latente</b>, no calor específico por diferencia de temperatura.</p>${m('Q_c=m\\lambda')}<small>λ se expresa como energía por masa. La condensación libera energía a temperatura constante.</small></details><details class="u5-tool"><summary>🌡️ Me piden temperatura límite</summary><p>Usamos la igualdad de Carnot para el <b>límite reversible</b>.</p><b>Fuente caliente mínima</b>${m('T_{c,\\min}=\\frac{T_f}{1-\\eta}')}<b>Fuente fría máxima</b>${m('T_{f,\\max}=T_c(1-\\eta)')}<small>Una máquina irreversible necesita una diferencia de temperaturas mayor. Son límites del modelo, no garantías de construcción.</small></details><details class="u5-tool"><summary>🔁 Necesito convertir unidades</summary>${m('1\\ \\mathrm{kW}=1000\\ \\mathrm W')}${m('1\\ \\mathrm W=1\\ \\mathrm{J/s}')}${m('1\\ \\mathrm{min}=60\\ \\mathrm s')}${m('1\\ \\mathrm h=3600\\ \\mathrm s')}${m('1\\ \\mathrm{cal}=4{,}184\\ \\mathrm J')}${m('1\\ \\mathrm{kcal}=4184\\ \\mathrm J')}</details></div>
    <details class="u5-extra-info"><summary>📚 Referencias para las aclaraciones visuales</summary><p>La teoría base y las consignas proceden del <b>PDF de la Prof. Gabriela López Rodriguez</b>, conservado íntegro.</p><p>La distinción conceptual entre reversible e irreversible se contrastó con <a href="https://openstax.org/books/university-physics-volume-2/pages/4-1-reversible-and-irreversible-processes" target="_blank" rel="noopener">OpenStax · procesos reversibles e irreversibles</a>. Diagramas de apoyo: elaboración propia.</p></details>
  </section>
  </div>`;}
  window.ET27_PROCESOS_U5_TEACHING={theory,symbols,sections:[['u5-maquina','⚙️','Máquina de vapor'],['u5-flujo','🔥','Calor y trabajo'],['u5-reversible','↔️','Reversible / irreversible'],['u5-ciclos','🔄','Ciclos'],['u5-entropia-concepto','✨','Qué es la entropía'],['u5-segundo-principio','🧭','Segundo principio'],['u5-balance','⚖️','Balance de energía'],['u5-rendimiento','🎯','Rendimientos'],['u5-entropia-fuentes','➕','Entropía de las fuentes'],['u5-frigorifica','❄️','Refrigeración'],['u5-formulas-uso','🧰','Elegir la fórmula']]};
})();
