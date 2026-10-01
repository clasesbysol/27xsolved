// 27xSOLved · Química General de 4.º año — materia propia, independiente de la Química del CBC.
// Unidades: Soluciones, Estequiometría y Formulación (pendientes) · Propiedades coligativas (desarrollada).
(function(){
  'use strict';
  const K=window.ET27Kit;if(!K)return;
  const {M,m,chain,key,sym,simple,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field}=K;
  const R=String.raw;

  // ---------- Esquemas ----------
  const svgVapor=`<svg viewBox="0 0 640 250" role="img" aria-label="Dos recipientes cerrados: el solvente puro tiene más moléculas en el vapor que la solución con soluto no volátil">
    ${[[60,'Solvente puro',10],[350,'Solución (soluto no volátil)',6]].map(([x,label,n],k)=>`
      <rect x="${x}" y="30" width="230" height="190" rx="12" class="svgLineFill svgSoft"/>
      <rect x="${x+2}" y="130" width="226" height="88" rx="10" class="svgLiquid"/>
      ${[...Array(n)].map((_,i)=>`<circle cx="${x+25+((i*47)%190)}" cy="${55+((i*29)%60)}" r="6" class="svgMolecule"/>`).join('')}
      ${[...Array(12)].map((_,i)=>`<circle cx="${x+20+((i*37)%195)}" cy="${145+((i*23)%60)}" r="6" class="svgMolecule"/>`).join('')}
      ${k?[0,1,2,3].map(i=>`<rect x="${x+38+i*48}" y="${150+(i%2)*28}" width="13" height="13" class="svgSolute"/>`).join(''):''}
      <text x="${x+115}" y="245" text-anchor="middle" class="svgText strong">${label}</text>`).join('')}
    <text x="320" y="20" text-anchor="middle" class="svgText">● solvente · ■ soluto</text>
  </svg>`;

  const svgLine=`<svg viewBox="0 0 640 170" role="img" aria-label="Recta de temperaturas: la solución congela por debajo y hierve por encima del solvente puro">
    <defs><marker id="qgArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="30" y1="90" x2="610" y2="90" class="svgLine" marker-end="url(#qgArr)"/><text x="590" y="120" class="svgText">T</text>
    <rect x="160" y="80" width="300" height="20" class="svgLiquidBand"/>
    <line x1="120" y1="70" x2="120" y2="110" class="svgTick"/><line x1="160" y1="70" x2="160" y2="110" class="svgTick strongTick"/>
    <line x1="460" y1="70" x2="460" y2="110" class="svgTick strongTick"/><line x1="500" y1="70" x2="500" y2="110" class="svgTick"/>
    <text x="160" y="62" text-anchor="middle" class="svgText strong">T⁰f</text><text x="120" y="135" text-anchor="middle" class="svgText strong">Tf</text>
    <text x="460" y="62" text-anchor="middle" class="svgText strong">T⁰b</text><text x="500" y="135" text-anchor="middle" class="svgText strong">Tb</text>
    <text x="140" y="160" text-anchor="middle" class="svgText">ΔTf: baja</text><text x="480" y="160" text-anchor="middle" class="svgText">ΔTb: sube</text>
    <text x="310" y="72" text-anchor="middle" class="svgText">rango líquido del solvente puro</text>
  </svg>`;

  const svgOsmosis=`<svg viewBox="0 0 640 260" role="img" aria-label="Ósmosis en un tubo en U con membrana semipermeable: el solvente pasa hacia la solución y su nivel sube">
    <defs><marker id="qgArr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <path d="M170 30 V200 Q170 240 210 240 H430 Q470 240 470 200 V30" class="svgTube"/>
    <path d="M230 30 V180 H410 V30" class="svgTube"/>
    <path d="M172 120 V200 Q172 238 210 238 H320 V180 H232 V120 Z" class="svgLiquid"/>
    <path d="M320 238 H430 Q468 238 468 200 V80 H408 V180 H320 Z" class="svgLiquid strongLiquid"/>
    <line x1="320" y1="182" x2="320" y2="238" class="svgMembrane"/>
    ${[0,1,2].map(i=>`<rect x="${345+i*30}" y="${200+(i%2)*14}" width="10" height="10" class="svgSolute"/>`).join('')}
    <line x1="270" y1="210" x2="312" y2="210" class="svgArrow" marker-end="url(#qgArr2)"/>
    <text x="110" y="115" class="svgText strong">solvente</text><text x="480" y="75" class="svgText strong">solución</text>
    <text x="320" y="258" text-anchor="middle" class="svgText">membrana semipermeable</text>
    <line x1="500" y1="80" x2="500" y2="120" class="svgArrow" marker-end="url(#qgArr2)"/><text x="508" y="105" class="svgText">h ↑</text>
  </svg>`;

  const sections=[];
  const add=(key,label,kicker,html)=>sections.push({key:`qg-${key}`,label,kicker,html});

  // ---------- 1. Concepto general ----------
  add('concepto','Concepto general y concentraciones','PROPIEDADES COLIGATIVAS · 01',`
<p>Las <b>propiedades coligativas</b> son propiedades de una solución que, en el modelo ideal o suficientemente diluido, dependen de la <b>cantidad de partículas de soluto</b> presentes respecto del solvente, más que de la identidad química del soluto. ${simple('Importa cuántas partículas hay, no cuáles son: 1 mol de glucosa o 1 mol de urea producen casi el mismo efecto')}</p>
<p>Son cuatro:</p>
<ol class="kitList">
 <li><b>Descenso de la presión de vapor</b> del solvente.</li>
 <li><b>Descenso de la temperatura de congelación</b> (descenso crioscópico).</li>
 <li><b>Ascenso de la temperatura de ebullición</b> (ascenso ebulloscópico).</li>
 <li><b>Presión osmótica</b>.</li>
</ol>
<p>Un mismo sistema puede manifestar las cuatro, según qué condición se estudie. La presión osmótica, además, requiere considerar una <b>membrana semipermeable</b>.</p>
${fix('Corrección del apunte: “son sumativas”',`<p>Esa palabra no es la definición de propiedad coligativa. Lo correcto es decir que dependen del <b>número de partículas</b> de soluto. Sí se puede explicar que, si hay varias partículas distintas disueltas, sus contribuciones se suman (por eso se usa el factor de van ’t Hoff), pero eso es una consecuencia, no la definición.</p>`)}
${note('Alcance del modelo',`<p>Todas las fórmulas de esta unidad valen para comportamiento <b>ideal</b> o soluciones <b>suficientemente diluidas</b>. Las constantes crioscópica y ebulloscópica <b>dependen del solvente</b>, no del soluto. ${simple('El agua tiene una K<sub>f</sub>; el benceno, otra')}</p>`)}
<h3>Vocabulario y abreviaturas</h3>
${table(['Abreviatura','Significa','Ejemplo'],[['st','<b>soluto</b>: lo que se disuelve, en menor cantidad','azúcar, urea, sal'],['sv','<b>solvente</b>: el medio que disuelve, en mayor cantidad','agua, benceno'],['sc','<b>solución</b>: la mezcla homogénea completa (soluto + solvente)','agua azucarada']])}
<h3>Concentraciones y relaciones necesarias</h3>
<p>Para esta unidad se necesitan algunas formas de expresar la concentración. ${simple('Son las “herramientas” para traducir gramos y mililitros a partículas')}</p>
${sym([['n','cantidad de sustancia','mol'],[R`m_{\mathrm{st}}`,'masa de soluto','g'],[R`M_m`,'masa molar','g/mol']])}
${chain([R`n=\frac{m_{\mathrm{st}}}{M_m}`,'moles a partir de la masa'],[R`M_m=\frac{m_{\mathrm{st}}}{n}`,'masa molar si conozco los moles'])}
<div class="twoCol">
<div class="kitBox kitIdea"><b>Molalidad b</b><p>Moles de soluto por <b>kilogramo de solvente</b>.</p>${M(R`b=\frac{n_{\mathrm{st}}}{m_{\mathrm{sv}}\ (\mathrm{kg})}`)}${M(R`[b]=\mathrm{mol/kg}`)}<p>${simple('Se usa en crioscopía y ebulloscopía')}</p></div>
<div class="kitBox kitNote"><b>Molaridad C</b><p>Moles de soluto por <b>litro de solución</b>.</p>${M(R`C=\frac{n_{\mathrm{st}}}{V_{\mathrm{sc}}\ (\mathrm{L})}`)}${M(R`[C]=\mathrm{mol/L}`)}<p>${simple('Se usa en presión osmótica')}</p></div>
</div>
${warn('Molalidad ≠ molaridad',`<p>La molalidad usa <b>masa de solvente</b> (kg). La molaridad usa <b>volumen de solución</b> (L). Se parecen en el nombre, pero no son intercambiables.</p>`)}
<h4>Fracción molar</h4>
<p>Es la parte de los moles totales que corresponde a cada componente. ${simple('Si x = 0,25, uno de cada cuatro moles es de ese componente')}</p>
${chain([R`x_i=\frac{n_i}{\sum_j n_j}`,'moles del componente / moles totales'],[R`\sum_i x_i=1`,'todas suman 1'],[R`x_{\mathrm{st}}+x_{\mathrm{sv}}=1`,'solución binaria'])}
<h4>Densidad de la solución</h4>
${chain([R`\rho_{\mathrm{sc}}=\frac{m_{\mathrm{sc}}}{V_{\mathrm{sc}}}`],[R`m_{\mathrm{sc}}=m_{\mathrm{st}}+m_{\mathrm{sv}}`,'las masas sí se suman'],[R`V_{\mathrm{sc}}=\frac{m_{\mathrm{sc}}}{\rho_{\mathrm{sc}}}`,'volumen de solución'])}
${warn('Los volúmenes no siempre se suman',`<p>La masa de la solución es la suma de masas, pero el volumen de solución <b>no</b> es, en general, la suma de volúmenes. Por eso se calcula con la densidad de la solución.</p>`)}
<h4>Porcentajes</h4>
${chain([R`\%\ m/m=\frac{m_{\mathrm{st}}}{m_{\mathrm{sc}}}\cdot100`,'g de soluto en 100 g de solución'],[R`\%\ m/v=\frac{m_{\mathrm{st}}\ (\mathrm{g})}{V_{\mathrm{sc}}\ (\mathrm{mL})}\cdot100`,'g de soluto en 100 mL de solución'])}
<h4>Factor de van ’t Hoff i</h4>
<p>Representa el efecto del <b>número de partículas</b> que aporta cada unidad de soluto disuelta. ${simple('Cuántos “pedazos” se forman al disolver')}</p>
${table(['Soluto','Qué pasa al disolver','i (aprox.)'],[['Molecular, no electrolito (glucosa, urea, sacarosa)','No se disocia ni se asocia','≈ 1'],['NaCl (ideal)','Na⁺ + Cl⁻','≈ 2'],['CaCl₂ (ideal)','Ca²⁺ + 2 Cl⁻','≈ 3']])}
<p>En todos los ejemplos de esta unidad los solutos son moleculares y se indica explícitamente la suposición <b>i ≈ 1</b>.</p>
`);

  // ---------- 2. Presión de vapor ----------
  add('vapor','Descenso de la presión de vapor','LEY DE RAOULT · 02',`
<h3>Equilibrio dinámico</h3>
<p>En un recipiente cerrado con un líquido, algunas moléculas pasan al vapor (<b>evaporación</b>) y otras vuelven al líquido (<b>condensación</b>). Al principio domina la evaporación; con el tiempo, las dos velocidades se igualan. Ambos procesos <b>siguen ocurriendo</b>, pero ya no cambia la cantidad de vapor: es un <b>equilibrio dinámico</b>. La presión que ejerce ese vapor es la <b>presión de vapor</b>. ${simple('Tantas moléculas se van como vuelven')}</p>
${table(['','Evaporación','Ebullición'],[['Dónde ocurre','En la superficie del líquido','En todo el líquido: se forman burbujas'],['Cuándo','A distintas temperaturas','Cuando la presión de vapor iguala la presión externa']])}
<p>Para escapar, una molécula tiene que estar <b>en la superficie</b> y tener <b>energía suficiente</b>. ${simple('Ojo: no todas las moléculas de mayor energía están en la superficie; las que escapan son las que cumplen las dos condiciones a la vez')} La temperatura de ebullición depende de la sustancia y de la <b>presión externa</b> ${simple('en la montaña, con menor presión, el agua hierve a menos de 100 °C')}.</p>
<h3>¿Por qué baja con un soluto no volátil?</h3>
<p>Las partículas de soluto ocupan parte de la superficie y diluyen al solvente, así que, a la misma temperatura, escapan menos moléculas de solvente por unidad de tiempo. El equilibrio se alcanza con menos vapor: la presión de vapor de la solución es menor que la del solvente puro.</p>
${figure(svgVapor,'Mismo recipiente, misma temperatura: con soluto no volátil hay menos vapor de solvente.')}
<h3>Ley de Raoult</h3>
<p>Para una solución ideal con <b>soluto no volátil</b>:</p>
${sym([[R`p_{\mathrm{sc}}`,'presión de vapor sobre la solución','mmHg · torr · atm'],[R`p^{0}_{\mathrm{sv}}`,'presión de vapor del solvente puro a la misma temperatura','mmHg'],[R`x_{\mathrm{sv}}`,'fracción molar del solvente','adimensional'],[R`x_{\mathrm{st}}`,'fracción molar del soluto','adimensional'],[R`\Delta p`,'descenso de la presión de vapor (positivo)','mmHg']])}
${key(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^{0}_{\mathrm{sv}}`,'Ley de Raoult')}
<p>El descenso se define como magnitud positiva. Deducción:</p>
${chain([R`\Delta p=p^{0}_{\mathrm{sv}}-p_{\mathrm{sc}}`,'definición'],[R`\Delta p=p^{0}_{\mathrm{sv}}-x_{\mathrm{sv}}\,p^{0}_{\mathrm{sv}}`,'reemplazo Raoult'],[R`\Delta p=(1-x_{\mathrm{sv}})\,p^{0}_{\mathrm{sv}}`,'factor común'],[R`\Delta p=x_{\mathrm{st}}\,p^{0}_{\mathrm{sv}}`,'porque 1 − x_sv = x_st'])}
<div class="twoCol">
${key(R`\frac{\Delta p}{p^{0}_{\mathrm{sv}}}=x_{\mathrm{st}}`,'Descenso relativo → soluto')}
${key(R`\frac{p_{\mathrm{sc}}}{p^{0}_{\mathrm{sv}}}=x_{\mathrm{sv}}`,'Cociente de presiones → solvente')}
</div>
${idea('La diferencia entre los dos cocientes',`<p>Si dividís el <b>descenso</b> Δp por p⁰ obtenés la fracción molar del <b>soluto</b>. Si dividís la <b>presión de la solución</b> por p⁰ obtenés la del <b>solvente</b>. ${simple('Lo que “se perdió” corresponde al soluto; lo que “quedó”, al solvente')}</p>`)}
${calc('raoult','Raoult con moles',field('p0','p⁰ del solvente',23.69)+field('nst','moles de soluto',0.032)+field('nsv','moles de solvente',2.775),'Soluto no volátil, i ≈ 1.')}
${deep('Ampliación: ambos componentes volátiles',`<p>Si los dos componentes pasan al vapor (por ejemplo, benceno y tolueno), cada uno aporta su propia presión parcial según Raoult, y la presión total es la suma:</p>${chain([R`p_i=x_i\,p^{0}_i`,'cada componente'],[R`p_{\mathrm{total}}=\sum_i p_i`,'se suman'])}<p>En ese caso <b>no</b> se usa la fórmula de soluto no volátil: los dos componentes “aportan vapor”. El ejercicio 6 de la guía es de este tipo.</p>`)}
${example('Presión de vapor a partir de la fracción molar del soluto',
 `<p><b>Datos:</b> presión de vapor del solvente puro 78 mmHg; fracción molar del soluto 0,015. Calcular la fracción molar del solvente, la presión de vapor de la solución y el descenso. (Soluto no volátil, i ≈ 1).</p>`,
 step('1. Fracción molar del solvente',chain(R`x_{\mathrm{sv}}=1-x_{\mathrm{st}}`,R`x_{\mathrm{sv}}=1-0{,}015`,R`x_{\mathrm{sv}}=0{,}985`))+
 step('2. Raoult',chain(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^{0}_{\mathrm{sv}}`,R`p_{\mathrm{sc}}=0{,}985\cdot78\ \mathrm{mmHg}`,R`p_{\mathrm{sc}}=76{,}83\ \mathrm{mmHg}`))+
 step('3. Descenso',chain(R`\Delta p=78-76{,}83`,R`\Delta p=1{,}17\ \mathrm{mmHg}`,[R`\Delta p=x_{\mathrm{st}}\,p^0_{\mathrm{sv}}=0{,}015\cdot78=1{,}17\ \mathrm{mmHg}`,'control por el otro camino']))+
 fix('Vocabulario',`<p>El apunte pregunta por la “presión molar del solvente”. Lo correcto es <b>fracción molar del solvente</b>.</p>`),
 `x<sub>sv</sub> = 0,985 · p<sub>sc</sub> = 76,83 mmHg · Δp = 1,17 mmHg`)}
${example('Fracciones molares a partir de las presiones',
 `<p><b>Datos:</b> presión de vapor de la solución 72 torr; del solvente puro 74 torr. Calcular las fracciones molares.</p>`,
 note('Interpretación utilizada',`<p>La lectura más clara de la consigna indica 72 torr (solución) y 74 torr (solvente puro). En la resolución manuscrita aparece un número contradictorio, parecido a 64. Se usan <b>72 y 74</b>.</p>`)+
 step('1. Descenso',chain(R`\Delta p=74-72`,R`\Delta p=2\ \mathrm{torr}`))+
 step('2. Fracción molar del soluto (descenso relativo)',chain(R`x_{\mathrm{st}}=\frac{\Delta p}{p^0_{\mathrm{sv}}}`,R`x_{\mathrm{st}}=\frac{2}{74}`,R`x_{\mathrm{st}}\approx0{,}0270`))+
 step('3. Fracción molar del solvente (cociente de presiones)',chain(R`x_{\mathrm{sv}}=\frac{p_{\mathrm{sc}}}{p^0_{\mathrm{sv}}}`,R`x_{\mathrm{sv}}=\frac{72}{74}`,R`x_{\mathrm{sv}}\approx0{,}9730`))+
 step('4. Control',chain(R`x_{\mathrm{st}}+x_{\mathrm{sv}}=0{,}0270+0{,}9730=1`)),
 `x<sub>st</sub> ≈ 0,0270 · x<sub>sv</sub> ≈ 0,9730`)}
`);

  // ---------- 3. Crioscópico ----------
  add('crioscopico','Descenso crioscópico','CONGELACIÓN · 03',`
<p>La presencia de soluto <b>disminuye la temperatura de congelación</b> del solvente, bajo las condiciones del modelo. ${simple('Por eso se echa sal en las rutas con hielo y se usa anticongelante en los autos')}</p>
${warn('Cómo NO explicarlo',`<p>No es correcto decir que el soluto “impide que se formen cristales” de manera absoluta. La solución <b>sí puede congelarse</b>, pero a una temperatura <b>menor</b>. ${simple('Las partículas de soluto “estorban” el ordenamiento del sólido y hay que enfriar más para lograrlo')}</p>`)}
${figure(svgLine,'El soluto “estira” el rango líquido: congela más abajo y hierve más arriba.')}
${sym([[R`T^{0}_f`,'temperatura de congelación del solvente puro','°C · K'],[R`T_f`,'temperatura de congelación de la solución','°C · K'],[R`\Delta T_f`,'descenso crioscópico (positivo)','K = °C'],[R`K_f`,'constante crioscópica del solvente (en la guía: Kc)','K·kg/mol'],['b','molalidad','mol/kg'],['i','factor de van ’t Hoff','adimensional']])}
${chain([R`\Delta T_f=T^{0}_f-T_f`,'puro menos solución: da positivo'])}
${key(R`\Delta T_f=i\,K_f\,b`,'Descenso crioscópico')}
${chain([R`T_f=T^{0}_f-i\,K_f\,b`,'la temperatura de congelación baja: se RESTA'])}
${chain([R`[K_f]=\mathrm{K\cdot kg/mol}`,'también °C·kg/mol'])}
${idea('Kelvin o Celsius en una diferencia',`<p>Una <b>diferencia</b> de temperatura tiene el mismo valor numérico en kelvin y en grados Celsius: bajar 9,4 °C es bajar 9,4 K. ${simple('Por eso K<sub>f</sub> puede venir en K·kg/mol o en °C·kg/mol sin cambiar el número')}</p>`)}
${calc('colligative','Descenso crioscópico o ascenso ebulloscópico',`<label><span>Propiedad</span><select name="type"><option value="f">Congelación (ΔT<sub>f</sub>)</option><option value="b">Ebullición (ΔT<sub>b</sub>)</option></select></label>`+field('T0','T⁰ del solvente (°C)',0)+field('K','K (K·kg/mol)',1.86)+field('b','b (mol/kg)',1)+field('i','i',1),'Valores iniciales: agua, 1 mol/kg, soluto molecular.')}
${example('Sustancia Z en ciclohexano: masa molar y % m/v',
 `<p><b>Datos (reconstruidos de la consigna y su resolución):</b> 1,255 g de sustancia Z en 50 g de ciclohexano; densidad de la solución 0,781 g/mL; el solvente puro congela a 6,6 °C y la solución a −2,8 °C; constante crioscópica 20,8 K·kg/mol. Calcular la masa molar de Z y el % m/v.</p>`,
 note('Interpretación utilizada',`<p>El signo negativo de −2,8 °C es poco claro en la consigna fotografiada, pero se distingue en el desarrollo de la cuenta. Se supone que Z no se disocia ni se asocia: <b>i = 1</b>.</p>`)+
 step('1. Descenso crioscópico',chain(R`\Delta T_f=T_f^0-T_f`,R`\Delta T_f=6{,}6-(-2{,}8)`,R`\Delta T_f=9{,}4\ \mathrm{K}`))+
 step('2. Molalidad (i = 1)',chain(R`b=\frac{\Delta T_f}{K_f}`,R`b=\frac{9{,}4\ \mathrm{K}}{20{,}8\ \mathrm{K\cdot kg/mol}}`,R`b\approx0{,}4519\ \mathrm{mol/kg}`))+
 step('3. Moles de soluto',chain([R`m_{\mathrm{sv}}=50\ \mathrm{g}=0{,}050\ \mathrm{kg}`,'¡en kilogramos!'],R`n=b\,m_{\mathrm{sv}}`,R`n\approx0{,}4519\cdot0{,}050`,R`n\approx0{,}02260\ \mathrm{mol}`))+
 step('4. Masa molar',chain(R`M_m=\frac{m_{\mathrm{st}}}{n}`,R`M_m=\frac{1{,}255\ \mathrm{g}}{0{,}02260\ \mathrm{mol}}`,R`M_m\approx55{,}5\ \mathrm{g/mol}`))+
 step('5. Volumen de solución y % m/v',`<p>Para el volumen de <b>solución</b> uso la masa de <b>solución</b> y la densidad de la <b>solución</b>.</p>${chain(R`m_{\mathrm{sc}}=50+1{,}255`,R`m_{\mathrm{sc}}=51{,}255\ \mathrm{g}`,R`V_{\mathrm{sc}}=\frac{51{,}255\ \mathrm{g}}{0{,}781\ \mathrm{g/mL}}`,R`V_{\mathrm{sc}}\approx65{,}63\ \mathrm{mL}`,R`\%\ m/v=\frac{1{,}255}{65{,}63}\cdot100`,R`\%\ m/v\approx1{,}91`)}`),
 `M<sub>m</sub> ≈ 55,5 g/mol · % m/v ≈ 1,91`)}
${example('Atomicidad del azufre',
 `<p><b>Datos:</b> 0,154 g de azufre disueltos en 4,38 g de alcanfor; descenso crioscópico 5,47 K; constante crioscópica del alcanfor 40,0 K·kg/mol. Determinar la fórmula molecular del azufre y el % m/m.</p>`,
 note('Planteo',`<p>La especie se representa como <b>Sₓ</b>: x es la <b>atomicidad</b>, el número de átomos de azufre por molécula. Se supone que no se disocia ni se asocia durante la medición (i = 1).</p>`)+
 step('1. Molalidad',chain(R`b=\frac{\Delta T_f}{K_f}`,R`b=\frac{5{,}47}{40{,}0}`,R`b=0{,}13675\ \mathrm{mol/kg}`))+
 step('2. Moles de Sₓ',chain([R`m_{\mathrm{sv}}=4{,}38\ \mathrm{g}=0{,}00438\ \mathrm{kg}`],R`n=0{,}13675\cdot0{,}00438`,R`n\approx5{,}99\cdot10^{-4}\ \mathrm{mol}`))+
 step('3. Masa molar de Sₓ',chain(R`M_m=\frac{0{,}154}{5{,}99\cdot10^{-4}}`,R`M_m\approx257\ \mathrm{g/mol}`))+
 step('4. Atomicidad',`<p>Cada átomo de S aporta 32,06 g/mol:</p>${chain(R`x=\frac{257}{32{,}06}`,R`x\approx8`,R`\text{Especie molecular: }\mathrm{S_8}`)}`)+
 step('5. % m/m',chain(R`\%\ m/m=\frac{0{,}154}{0{,}154+4{,}38}\cdot100`,R`\%\ m/m\approx3{,}40`)),
 `Azufre: S<sub>8</sub> (M ≈ 257 g/mol) · % m/m ≈ 3,40`)}
`);

  // ---------- 4. Ebulloscópico ----------
  add('ebulloscopico','Ascenso ebulloscópico','EBULLICIÓN · 04',`
<p>Con un soluto <b>no volátil</b>, la presión de vapor de la solución es menor que la del solvente puro (Raoult). Para hervir, la presión de vapor tiene que alcanzar la presión externa, así que la solución necesita una <b>temperatura mayor</b>. ${simple('Como su vapor “empuja menos”, hay que calentarla más para que llegue')}</p>
${sym([[R`T^{0}_b`,'temperatura de ebullición del solvente puro','°C'],[R`T_b`,'temperatura de ebullición de la solución','°C'],[R`\Delta T_b`,'ascenso ebulloscópico (positivo)','K = °C'],[R`K_b`,'constante ebulloscópica del solvente (en la guía: Keb)','K·kg/mol']])}
${chain([R`\Delta T_b=T_b-T^{0}_b`,'solución menos puro: da positivo'])}
${key(R`\Delta T_b=i\,K_b\,b`,'Ascenso ebulloscópico')}
${chain([R`T_b=T^{0}_b+i\,K_b\,b`,'la temperatura de ebullición sube: se SUMA'],[R`[K_b]=\mathrm{K\cdot kg/mol}`])}
${warn('Tres concentraciones que no hay que confundir',`<p>En ΔT = iKb va la <b>molalidad</b> (mol/kg de solvente). No la molaridad (mol/L de solución) ni la osmolaridad (osmoles por litro).</p>`)}
${idea('Signos, para no equivocarse',`<p><b>Congelación:</b> T<sub>f</sub> = T⁰<sub>f</sub> − ΔT<sub>f</sub> (baja). <b>Ebullición:</b> T<sub>b</sub> = T⁰<sub>b</sub> + ΔT<sub>b</sub> (sube). Los dos ΔT se escriben positivos. ${simple('El soluto “ensancha” el rango en que el solvente es líquido')}</p>`)}
${example('Sustancia Z en tetracloruro de carbono',
 `<p><b>Datos del apunte:</b> 3 g de Z en 100 g de tetracloruro de carbono; densidad del solvente 1,59 g/mL; ascenso ebulloscópico 0,60 K; constante ebulloscópica 5,00 K·kg/mol; constante crioscópica 31,8 K·kg/mol. En el desarrollo se usa T⁰<sub>b</sub> = 76,7 °C. Calcular T<sub>b</sub>, la masa molar de Z, el descenso crioscópico y el volumen de solvente. (i = 1)</p>`,
 step('1. Temperatura de ebullición de la solución',chain(R`T_b=T_b^0+\Delta T_b`,R`T_b=76{,}7+0{,}60`,R`T_b=77{,}3\ \mathrm{°C}`))+
 step('2. Molalidad compatible con los datos',chain(R`b=\frac{\Delta T_b}{K_b}`,R`b=\frac{0{,}60}{5{,}00}`,R`b=0{,}120\ \mathrm{mol/kg}`))+
 step('3. Moles y masa molar',chain([R`m_{\mathrm{sv}}=100\ \mathrm{g}=0{,}100\ \mathrm{kg}`],R`n=0{,}120\cdot0{,}100`,R`n=0{,}0120\ \mathrm{mol}`,R`M_m=\frac{3\ \mathrm{g}}{0{,}0120\ \mathrm{mol}}`,R`M_m=250\ \mathrm{g/mol}`))+
 step('4. Descenso crioscópico de la misma solución',`<p>La molalidad es la misma; cambia la constante: ahora va la <b>crioscópica</b>.</p>${chain(R`\Delta T_f=K_f\,b`,R`\Delta T_f=31{,}8\cdot0{,}120`,R`\Delta T_f=3{,}816\ \mathrm{K}`)}`)+
 step('5. Volumen de solvente',chain(R`V_{\mathrm{sv}}=\frac{m_{\mathrm{sv}}}{\rho_{\mathrm{sv}}}`,R`V_{\mathrm{sv}}=\frac{100\ \mathrm{g}}{1{,}59\ \mathrm{g/mL}}`,R`V_{\mathrm{sv}}\approx62{,}9\ \mathrm{mL}`)+`<p>Es el volumen del <b>solvente</b>, no el de la solución: la densidad dada es la del solvente.</p>`)+
 fix('Dato contradictorio del manuscrito (caso condicional aparte)',`<p>El manuscrito también menciona una molalidad de <b>0,208 mol/kg</b>. Ese dato <b>contradice</b> el ascenso de 0,60 K con K<sub>b</sub> = 5,00 (que da 0,120 mol/kg). Sólo como caso hipotético separado, <i>si</i> la molalidad fuera 0,208 mol/kg:</p>${chain(R`\Delta T_f=31{,}8\cdot0{,}208`,R`\Delta T_f\approx6{,}61\ \mathrm{K}`)}<p>No son dos resultados de la misma solución: con los datos consistentes, el descenso es 3,816 K.</p>`),
 `T<sub>b</sub> = 77,3 °C · M<sub>m</sub> = 250 g/mol · ΔT<sub>f</sub> = 3,816 K · V<sub>sv</sub> ≈ 62,9 mL`)}
${example('Otro ejemplo del apunte (consigna ambigua)',
 `<p><b>Datos:</b> 3 g de sustancia X en 100 g de tetracloruro de carbono; variación de temperatura 0,600 K; constante corregida a “crioscópica” de 31,8 K·kg/mol; densidad del solvente 1,59 g/mL. Se pide molalidad y volumen de solvente.</p>`,
 note('Interpretación utilizada',`<p>Se resuelve suponiendo que la variación de 0,600 K es un <b>descenso crioscópico</b>, porque la única constante dada es la crioscópica.</p>`)+
 step('1. Molalidad',chain(R`b=\frac{\Delta T_f}{K_f}`,R`b=\frac{0{,}600}{31{,}8}`,R`b\approx0{,}0189\ \mathrm{mol/kg}`))+
 step('2. Volumen de solvente',chain(R`V_{\mathrm{sv}}=\frac{100}{1{,}59}`,R`V_{\mathrm{sv}}\approx62{,}9\ \mathrm{mL}`))+
 warn('Si fuera un ascenso',`<p>Si la variación se interpretara como <b>ascenso ebulloscópico</b>, haría falta la constante <b>ebulloscópica</b>. No se puede usar una constante crioscópica para calcular un ascenso.</p>`),
 `b ≈ 0,0189 mol/kg (interpretado como descenso crioscópico) · V<sub>sv</sub> ≈ 62,9 mL`)}
`);

  // ---------- 5. Presión osmótica ----------
  add('osmotica','Ósmosis y presión osmótica','MEMBRANAS · 05',`
<p><b>Ósmosis:</b> movimiento <b>neto</b> de solvente a través de una <b>membrana semipermeable</b>, que deja pasar al solvente y restringe el paso de determinados solutos. El solvente pasa desde la solución más diluida hacia la más concentrada. ${simple('El agua “va” hacia donde hay más partículas disueltas, para diluirlas')}</p>
${figure(svgOsmosis,'El solvente pasa hacia la solución; el nivel de la solución sube hasta que la diferencia de presión frena el flujo neto.')}
${warn('Membranas',`<p>No todas las membranas impiden siempre el paso de todos los iones: <b>depende de la membrana</b>. Por eso se habla de “determinados solutos”.</p>`)}
<p>La <b>presión osmótica</b> Π es la diferencia de presión que hay que aplicar sobre la solución para <b>detener</b> el flujo osmótico neto. ${simple('Cuánto hay que “empujar” del lado de la solución para que el agua deje de entrar')}</p>
${sym([[R`\Pi`,'presión osmótica (pi mayúscula)','atm'],['V','volumen de solución','L'],['n','moles de soluto','mol'],['C','molaridad','mol/L'],['R','constante de los gases','L·atm/(mol·K)'],['T','temperatura absoluta','K'],['i','factor de van ’t Hoff','adimensional']])}
${key(R`\Pi V=i\,nRT`,'Ecuación de van ’t Hoff')}
${chain([R`\Pi=i\,\frac{n}{V}\,RT`,'divido por V'],[R`\Pi=i\,C\,R\,T`,'n/V es la molaridad'])}
${chain([R`T\ (\mathrm{K})=T\ (\mathrm{°C})+273{,}15`,'¡siempre en kelvin!'],[R`R\approx0{,}08206\ \mathrm{\frac{L\cdot atm}{mol\cdot K}}`,'con Π en atm y V en L'])}
<div class="twoCol">
${key(R`C=\frac{\Pi}{i\,R\,T}`,'Da concentración (mol/L)')}
${key(R`n=\frac{\Pi V}{i\,R\,T}`,'Da cantidad (mol)')}
</div>
${idea('Dos despejes distintos',`<p>El primero entrega <b>concentración</b> (mol/L); el segundo, <b>cantidad de sustancia</b> (mol). Si te piden “concentración molar”, el resultado va en mol/L. ${simple('Concentración = cuánto hay por litro; cantidad = cuánto hay en total')}</p>`)}
${note('Si la presión está en mmHg',`<p>Convertí a atm con ${m(R`1\ \mathrm{atm}=760\ \mathrm{mmHg}`)}, porque R = 0,08206 está en L·atm/(mol·K).</p>`)}
<h3>Comparar soluciones</h3>
${table(['Término','Significa (respecto de una referencia, a la misma T)'],[['Isoosmótica','Igual presión osmótica'],['Hipoosmótica','Menor presión osmótica'],['Hiperosmótica','Mayor presión osmótica']])}
${deep('Isoosmótico no siempre es isotónico',`<p>“Isoosmótico” compara presiones osmóticas calculadas con <b>todas</b> las partículas. “Isotónico” se refiere al efecto real sobre una célula: la <b>tonicidad</b> depende sólo de los solutos que <b>no atraviesan</b> la membrana celular y de cómo cambian el volumen de la célula. ${simple('Una solución de urea puede ser isoosmótica con la sangre pero no isotónica, porque la urea atraviesa la membrana')}</p><p>En los ejercicios escolares, cuando se dice “isotónica”, se suele trabajar con la aproximación ideal de igualar presiones osmóticas.</p>`)}
${calc('osmotic','Presión osmótica',field('C','C (mol/L)',0.315)+field('t','t (°C)',25)+field('i','i',1),'')}
${example('Glucosa y sangre',
 `<p><b>Consigna del apunte:</b> la presión osmótica de la sangre a 25 °C es 7,7 atm. Calcular la concentración molar de glucosa que, en la aproximación ideal del ejercicio, iguala esa presión osmótica.</p>`,
 step('1. Datos',chain([R`\mathrm{C_6H_{12}O_6}`,'glucosa'],[R`M_m\approx180\ \mathrm{g/mol}`],[R`i\approx1`,'molecular, no se disocia'],R`T=25+273{,}15`,R`T=298{,}15\ \mathrm{K}`))+
 step('2. Concentración',chain(R`C=\frac{\Pi}{i\,R\,T}`,R`C=\frac{7{,}7}{0{,}08206\cdot298{,}15}`,R`C\approx0{,}315\ \mathrm{mol/L}`))+
 step('3. Ampliación: en gramos',chain(R`c_{\mathrm{masa}}=C\,M_m`,R`c_{\mathrm{masa}}\approx0{,}315\cdot180`,R`c_{\mathrm{masa}}\approx56{,}7\ \mathrm{g/L}`,[R`\%\ m/v\approx5{,}67`,'56,7 g en 1000 mL → 5,67 g en 100 mL']))+
 fix('Corrección del manuscrito',`<p>La concentración pedida se expresa en <b>mol/L</b>. Si se toma un litro de solución, la <b>cantidad</b> correspondiente es ≈ 0,315 mol; pero la respuesta a “concentración molar” es 0,315 mol/L.</p>`),
 `C ≈ 0,315 mol/L (≈ 56,7 g/L · ≈ 5,67 % m/v)`)}
`);

  // ---------- 6. Comparación ----------
  add('comparacion','Comparación de las cuatro propiedades','CUADRO COMPARATIVO · 06',`
<p>Usá este cuadro para elegir la fórmula: primero identificá <b>qué cambia</b> en el enunciado, y eso te dice qué concentración necesitás.</p>
${table(['Propiedad','Qué cambia','Fórmula','Concentración','Símbolos','Condiciones'],[
 ['Descenso de la presión de vapor','Baja la presión de vapor del solvente',m(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}p^0_{\mathrm{sv}}`)+'<br>'+m(R`\Delta p=x_{\mathrm{st}}p^0_{\mathrm{sv}}`),'Fracción molar x','p⁰: solvente puro; p<sub>sc</sub>: solución','Ideal; soluto no volátil; misma T'],
 ['Descenso crioscópico','Baja la temperatura de congelación',m(R`\Delta T_f=iK_fb`)+'<br>'+m(R`T_f=T^0_f-\Delta T_f`),'Molalidad b (mol/kg sv)','K<sub>f</sub> (Kc): del solvente','Diluida; el soluto no entra en el sólido'],
 ['Ascenso ebulloscópico','Sube la temperatura de ebullición',m(R`\Delta T_b=iK_bb`)+'<br>'+m(R`T_b=T^0_b+\Delta T_b`),'Molalidad b (mol/kg sv)','K<sub>b</sub> (Keb): del solvente','Diluida; soluto no volátil; P externa fija'],
 ['Presión osmótica','Aparece Π a través de la membrana',m(R`\Pi=iCRT`)+'<br>'+m(R`\Pi V=inRT`),'Molaridad C (mol/L sc)','R = 0,08206; T en K','Diluida; membrana semipermeable']
],'compareTable')}
${idea('Regla para elegir',`<p>¿Hay <b>presiones de vapor</b>? → fracción molar y Raoult. ¿Hay <b>temperaturas de congelación o ebullición</b>? → molalidad y K del solvente. ¿Hay <b>membrana o Π</b>? → molaridad, R y T en kelvin.</p>`)}
`);

  // ---------- 7. Guía de ejercitación (resolución gated en app.js) ----------
  const exercises=[];
  const ex=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  const assume=t=>note('Supuestos',`<p>${t}</p>`);

  ex(1,'Masa molar de la resorcina','Se disuelven 0,572 g de resorcina en 19,310 g de agua y la solución resultante hierve a una temperatura de 100,14 °C. Si la Keb del agua es de 0,52 °C·kg/mol, ¿cuál es la masa molar de la resorcina?',
   assume('Presión externa de 1 atm, así que el agua pura hierve a 100,00 °C. La resorcina es molecular y no se disocia: i = 1. Keb = K<sub>b</sub>.')+
   step('1. ¿Qué propiedad es?','<p>Hay una temperatura de ebullición → <b>ascenso ebulloscópico</b>, con molalidad.</p>')+
   step('2. Ascenso',chain(R`\Delta T_b=T_b-T_b^0`,R`\Delta T_b=100{,}14-100{,}00`,R`\Delta T_b=0{,}14\ \mathrm{°C}`))+
   step('3. Molalidad',chain(R`b=\frac{\Delta T_b}{K_b}`,R`b=\frac{0{,}14}{0{,}52}`,R`b\approx0{,}269\ \mathrm{mol/kg}`))+
   step('4. Moles de resorcina',chain([R`m_{\mathrm{sv}}=19{,}310\ \mathrm{g}=0{,}019310\ \mathrm{kg}`,'a kilogramos'],R`n=b\,m_{\mathrm{sv}}`,R`n=0{,}2692\cdot0{,}019310`,R`n\approx5{,}20\cdot10^{-3}\ \mathrm{mol}`))+
   step('5. Masa molar',chain(R`M_m=\frac{m_{\mathrm{st}}}{n}`,R`M_m=\frac{0{,}572\ \mathrm{g}}{5{,}20\cdot10^{-3}\ \mathrm{mol}}`,R`M_m\approx110\ \mathrm{g/mol}`))+
   idea('Control',`<p>La resorcina es C₆H₆O₂, cuya masa molar es ≈ 110,1 g/mol. El resultado es coherente.</p>`),
   'M<sub>m</sub> ≈ 110 g/mol');

  ex(2,'Glucosa isotónica con la sangre','La presión osmótica de la sangre a 25 °C es de 7,7 atm. ¿Qué concentración molar de glucosa (C₆H₁₂O₆) es isotónica con la sangre a dicha temperatura?',
   assume('Aproximación ideal: “isotónica” se trabaja como igual presión osmótica (isoosmótica). Glucosa molecular: i = 1.')+
   step('1. ¿Qué propiedad es?','<p>Presión osmótica → <b>Π = iCRT</b>, con molaridad y T en kelvin.</p>')+
   step('2. Temperatura absoluta',chain(R`T=25+273{,}15`,R`T=298{,}15\ \mathrm{K}`))+
   step('3. Despeje y cálculo',chain(R`C=\frac{\Pi}{i\,R\,T}`,R`C=\frac{7{,}7\ \mathrm{atm}}{0{,}08206\ \frac{\mathrm{L\cdot atm}}{\mathrm{mol\cdot K}}\cdot298{,}15\ \mathrm{K}}`,R`C=\frac{7{,}7}{24{,}47}\ \mathrm{mol/L}`,R`C\approx0{,}315\ \mathrm{mol/L}`))+
   note('Matiz',`<p>Estrictamente, igualar Π da una solución <b>isoosmótica</b>. Que además sea isotónica depende de la membrana celular (la glucosa, en la práctica, puede ingresar a las células). Ver la tarjeta “isoosmótico vs. isotónico”.</p>`),
   'C ≈ 0,315 mol/L');

  ex(3,'Anticongelante: etilenglicol en agua','Calcular la temperatura de congelación de una solución que contiene 100 g de anticongelante de etilenglicol (C₂H₆O₂) en 900 g de agua, si se sabe que la Kc del agua es de 1,86 °C·kg/mol.',
   note('Sobre la consigna','<p>La fotocopia repite “en 900 g en 900 g”; se interpreta como <b>900 g de agua</b>. Kc es la constante <b>crioscópica</b> (K<sub>f</sub>).</p>')+
   assume('Agua pura congela a 0 °C. Etilenglicol molecular: i = 1.')+
   step('1. Masa molar del etilenglicol',chain(R`M_m=2(12{,}01)+6(1{,}008)+2(16{,}00)`,R`M_m\approx62{,}07\ \mathrm{g/mol}`))+
   step('2. Moles',chain(R`n=\frac{100\ \mathrm{g}}{62{,}07\ \mathrm{g/mol}}`,R`n\approx1{,}611\ \mathrm{mol}`))+
   step('3. Molalidad',chain([R`m_{\mathrm{sv}}=900\ \mathrm{g}=0{,}900\ \mathrm{kg}`],R`b=\frac{1{,}611}{0{,}900}`,R`b\approx1{,}790\ \mathrm{mol/kg}`))+
   step('4. Descenso',chain(R`\Delta T_f=K_f\,b`,R`\Delta T_f=1{,}86\cdot1{,}790`,R`\Delta T_f\approx3{,}33\ \mathrm{°C}`))+
   step('5. Temperatura de congelación',chain(R`T_f=T_f^0-\Delta T_f`,R`T_f=0-3{,}33`,R`T_f\approx-3{,}33\ \mathrm{°C}`)),
   'T<sub>f</sub> ≈ −3,33 °C');

  ex(4,'Masa de anilina por presión osmótica','¿Qué cantidad de masa de anilina hay que disolver en agua a 18 °C, para preparar 200 mL de una solución acuosa del compuesto, cuya presión osmótica es de 750 mmHg? Se sabe que la fórmula molecular de la anilina es C₆H₇N. ¿Cuál es la concentración de la solución en % m/v?',
   assume('Anilina molecular: i = 1. Comportamiento ideal.')+
   step('1. Unidades coherentes con R',chain([R`\Pi=\frac{750}{760}\ \mathrm{atm}`,'mmHg → atm'],R`\Pi\approx0{,}9868\ \mathrm{atm}`,R`T=18+273{,}15=291{,}15\ \mathrm{K}`,[R`V=200\ \mathrm{mL}=0{,}200\ \mathrm{L}`]))+
   step('2. Moles (despeje de cantidad)',chain(R`n=\frac{\Pi\,V}{i\,R\,T}`,R`n=\frac{0{,}9868\cdot0{,}200}{0{,}08206\cdot291{,}15}`,R`n\approx8{,}26\cdot10^{-3}\ \mathrm{mol}`))+
   step('3. Masa molar de la anilina',chain(R`M_m=6(12{,}01)+7(1{,}008)+14{,}01`,R`M_m\approx93{,}13\ \mathrm{g/mol}`))+
   step('4. Masa',chain(R`m=n\,M_m`,R`m=8{,}26\cdot10^{-3}\cdot93{,}13`,R`m\approx0{,}769\ \mathrm{g}`))+
   step('5. % m/v',chain(R`\%\ m/v=\frac{0{,}769\ \mathrm{g}}{200\ \mathrm{mL}}\cdot100`,R`\%\ m/v\approx0{,}385`)),
   'm ≈ 0,769 g de anilina · ≈ 0,385 % m/v');

  ex(5,'Presión de vapor de una solución 2,32 molal','Determinar la presión de vapor de una solución de un compuesto no electrolito y no volátil, cuya concentración es 2,32 molal a 26 °C, si se conoce que a esa temperatura la presión de vapor del agua es de 25,21 mmHg.',
   assume('No electrolito → i = 1. No volátil → Raoult para el solvente. Solución ideal.')+
   step('1. La clave: tomar una base de cálculo',`<p>“2,32 molal” significa 2,32 mol de soluto <b>por cada 1 kg de agua</b>. Tomo exactamente 1 kg de agua para tener moles de ambos componentes. ${simple('Raoult necesita fracción molar, no molalidad')}</p>${chain(R`n_{\mathrm{st}}=2{,}32\ \mathrm{mol}`,R`n_{\mathrm{sv}}=\frac{1000\ \mathrm{g}}{18{,}015\ \mathrm{g/mol}}`,R`n_{\mathrm{sv}}\approx55{,}51\ \mathrm{mol}`)}`)+
   step('2. Fracción molar del solvente',chain(R`x_{\mathrm{sv}}=\frac{n_{\mathrm{sv}}}{n_{\mathrm{sv}}+n_{\mathrm{st}}}`,R`x_{\mathrm{sv}}=\frac{55{,}51}{55{,}51+2{,}32}`,R`x_{\mathrm{sv}}\approx0{,}9599`))+
   step('3. Raoult',chain(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^0_{\mathrm{sv}}`,R`p_{\mathrm{sc}}=0{,}9599\cdot25{,}21`,R`p_{\mathrm{sc}}\approx24{,}20\ \mathrm{mmHg}`,[R`\Delta p\approx1{,}01\ \mathrm{mmHg}`,'descenso'])),
   'p<sub>sc</sub> ≈ 24,20 mmHg (Δp ≈ 1,01 mmHg)');

  ex(6,'Benceno y tolueno: dos componentes volátiles','Se trata una solución formada por 1 mol de benceno y 2 moles de tolueno, resultando ser las presiones puras de cada compuesto 75 mmHg y 22 mmHg, respectivamente a 20 °C. ¿Cuál es la fracción molar de cada compuesto, las presiones parciales que ejercen en el sistema y la presión total de la mezcla? Expresar en mmHg. ¿Cuál es el porcentaje de vapor de cada componente y cuál de las dos sustancias resulta ser más volátil?',
   note('Tipo de problema','<p>Acá <b>los dos componentes son volátiles</b>: se aplica Raoult a cada uno (p<sub>i</sub> = x<sub>i</sub>p⁰<sub>i</sub>) y se suman las presiones parciales. No se usa la fórmula de soluto no volátil. Para el vapor se usa la fracción molar en fase gaseosa <b>y</b> (Dalton).</p>')+
   step('1. Fracciones molares en el líquido',chain(R`n_{\mathrm{total}}=1+2=3\ \mathrm{mol}`,R`x_{\mathrm{B}}=\frac{1}{3}\approx0{,}333`,R`x_{\mathrm{T}}=\frac{2}{3}\approx0{,}667`))+
   step('2. Presiones parciales (Raoult)',chain(R`p_{\mathrm{B}}=x_{\mathrm{B}}\,p^0_{\mathrm{B}}=\frac{1}{3}\cdot75`,R`p_{\mathrm{B}}=25{,}0\ \mathrm{mmHg}`,R`p_{\mathrm{T}}=x_{\mathrm{T}}\,p^0_{\mathrm{T}}=\frac{2}{3}\cdot22`,R`p_{\mathrm{T}}\approx14{,}67\ \mathrm{mmHg}`))+
   step('3. Presión total',chain(R`p_{\mathrm{total}}=p_{\mathrm{B}}+p_{\mathrm{T}}`,R`p_{\mathrm{total}}=25{,}0+14{,}67`,R`p_{\mathrm{total}}\approx39{,}67\ \mathrm{mmHg}`))+
   step('4. Composición del vapor (Dalton)',chain(R`y_{\mathrm{B}}=\frac{p_{\mathrm{B}}}{p_{\mathrm{total}}}=\frac{25{,}0}{39{,}67}\approx0{,}630`,R`y_{\mathrm{T}}=\frac{p_{\mathrm{T}}}{p_{\mathrm{total}}}=\frac{14{,}67}{39{,}67}\approx0{,}370`)+`<p>En porcentaje: vapor con ≈ <b>63,0 % de benceno</b> y ≈ <b>37,0 % de tolueno</b> (en moles).</p>`)+
   step('5. ¿Cuál es más volátil?',`<p>El <b>benceno</b>, porque su presión de vapor pura (75 mmHg) es mayor que la del tolueno (22 mmHg). ${simple('Aunque en el líquido hay el doble de tolueno, el vapor queda enriquecido en benceno: en el líquido x<sub>B</sub> = 0,333 y en el vapor y<sub>B</sub> = 0,630')}</p>`),
   'x<sub>B</sub> ≈ 0,333 · x<sub>T</sub> ≈ 0,667 · p<sub>B</sub> = 25,0 mmHg · p<sub>T</sub> ≈ 14,67 mmHg · P<sub>total</sub> ≈ 39,67 mmHg · vapor: 63,0 % benceno y 37,0 % tolueno · más volátil: benceno');

  ex(7,'Urea al 20 % m/m','¿Cuál es la temperatura de ebullición de una solución acuosa de urea de concentración 20 % m/m, si la Keb del solvente es de 0,52 °C·kg/mol y la masa molar de la urea es de 60 g/mol?',
   assume('Presión externa 1 atm (agua pura hierve a 100 °C). Urea molecular: i = 1.')+
   step('1. Base de cálculo: 100 g de solución',`<p>“20 % m/m” significa 20 g de urea en 100 g de <b>solución</b>. El solvente es lo que falta:</p>${chain(R`m_{\mathrm{st}}=20\ \mathrm{g}`,R`m_{\mathrm{sv}}=100-20=80\ \mathrm{g}=0{,}080\ \mathrm{kg}`)}`)+
   step('2. Moles y molalidad',chain(R`n=\frac{20}{60}\approx0{,}333\ \mathrm{mol}`,R`b=\frac{0{,}333\ \mathrm{mol}}{0{,}080\ \mathrm{kg}}`,R`b\approx4{,}17\ \mathrm{mol/kg}`))+
   step('3. Ascenso y temperatura',chain(R`\Delta T_b=K_b\,b=0{,}52\cdot4{,}17`,R`\Delta T_b\approx2{,}17\ \mathrm{°C}`,R`T_b=100+2{,}17`,R`T_b\approx102{,}17\ \mathrm{°C}`))+
   warn('Error típico',`<p>Dividir por 100 g (masa de <b>solución</b>) en lugar de 80 g (masa de <b>solvente</b>). La molalidad va por kilogramo de solvente.</p>`)+
   note('Alcance','<p>Una solución al 20 % m/m ya no es muy diluida: el resultado es el que da el modelo ideal y puede diferir algo del valor experimental.</p>'),
   'T<sub>b</sub> ≈ 102,17 °C (ΔT<sub>b</sub> ≈ 2,17 °C)');

  ex(8,'Temperatura a partir de la presión osmótica','Si se disuelven 0,1505 g de sacarosa en agua y el volumen de la solución es de 220 mL, ¿cuál es la temperatura a la cual se prepara la solución si la presión osmótica es de 0,0481 atm?',
   assume('Sacarosa C₁₂H₂₂O₁₁, molecular: i = 1.')+
   step('1. Masa molar de la sacarosa',chain(R`M_m=12(12{,}01)+22(1{,}008)+11(16{,}00)`,R`M_m\approx342{,}3\ \mathrm{g/mol}`))+
   step('2. Moles y molaridad',chain(R`n=\frac{0{,}1505}{342{,}3}\approx4{,}397\cdot10^{-4}\ \mathrm{mol}`,R`C=\frac{4{,}397\cdot10^{-4}\ \mathrm{mol}}{0{,}220\ \mathrm{L}}`,R`C\approx1{,}999\cdot10^{-3}\ \mathrm{mol/L}`))+
   step('3. Despeje de T',chain(R`\Pi=i\,C\,R\,T\ \Rightarrow\ T=\frac{\Pi}{i\,C\,R}`,R`T=\frac{0{,}0481}{1{,}999\cdot10^{-3}\cdot0{,}08206}`,R`T\approx293{,}3\ \mathrm{K}`))+
   step('4. A Celsius',chain(R`t=293{,}3-273{,}15`,R`t\approx20{,}1\ \mathrm{°C}`)),
   'T ≈ 293,3 K ≈ 20 °C');

  ex(9,'Masa molar de la glucosa por presión de vapor','La presión de vapor del agua a 25 °C es de 23,69 mmHg. Suponiendo comportamiento ideal de la solución, ¿cuál es la masa molar de la glucosa, si se sabe que se disuelven 5,76 g del soluto en 50,00 g de agua y la presión de vapor de la solución resulta ser de 23,42 mmHg?',
   assume('Glucosa no volátil y molecular (i = 1). Raoult.')+
   step('1. Fracción molar del soluto (descenso relativo)',chain(R`\Delta p=23{,}69-23{,}42=0{,}27\ \mathrm{mmHg}`,R`x_{\mathrm{st}}=\frac{\Delta p}{p^0_{\mathrm{sv}}}=\frac{0{,}27}{23{,}69}`,R`x_{\mathrm{st}}\approx0{,}01140`))+
   step('2. Moles de agua',chain(R`n_{\mathrm{sv}}=\frac{50{,}00}{18{,}015}`,R`n_{\mathrm{sv}}\approx2{,}775\ \mathrm{mol}`))+
   step('3. Moles de glucosa',`<p>De ${m(R`x_{\mathrm{st}}=\frac{n_{\mathrm{st}}}{n_{\mathrm{st}}+n_{\mathrm{sv}}}`)} despejo n<sub>st</sub>:</p>${chain(R`n_{\mathrm{st}}=\frac{x_{\mathrm{st}}\,n_{\mathrm{sv}}}{1-x_{\mathrm{st}}}`,R`n_{\mathrm{st}}=\frac{0{,}01140\cdot2{,}775}{0{,}98860}`,R`n_{\mathrm{st}}\approx0{,}0320\ \mathrm{mol}`)}`)+
   step('4. Masa molar',chain(R`M_m=\frac{5{,}76\ \mathrm{g}}{0{,}0320\ \mathrm{mol}}`,R`M_m\approx180\ \mathrm{g/mol}`))+
   idea('Control','<p>La glucosa C₆H₁₂O₆ tiene M ≈ 180 g/mol: coincide.</p>')+
   warn('Error típico','<p>Aproximar x<sub>st</sub> ≈ n<sub>st</sub>/n<sub>sv</sub> está bien sólo si la solución es muy diluida. Acá conviene el despeje exacto.</p>'),
   'M<sub>m</sub> ≈ 180 g/mol');

  ex(10,'Glicina que congela a −1,1 °C','Una disolución acuosa de glicina (un aminoácido de fórmula molecular NH₂CH₂COOH) congela a 1,1 °C bajo cero. Conocidos los datos de congelación del solvente y la constante crioscópica, ¿cuál es la concentración molar y el % m/m de la solución si se supone que el líquido no ioniza?',
   assume('Datos del agua: T⁰<sub>f</sub> = 0 °C y K<sub>f</sub> = 1,86 °C·kg/mol. “No ioniza”: i = 1.')+
   step('1. Molalidad (lo que da directamente la crioscopía)',chain(R`\Delta T_f=0-(-1{,}1)=1{,}1\ \mathrm{°C}`,R`b=\frac{\Delta T_f}{K_f}=\frac{1{,}1}{1{,}86}`,R`b\approx0{,}591\ \mathrm{mol/kg}`))+
   step('2. Masa molar de la glicina',chain(R`\mathrm{C_2H_5NO_2}`,R`M_m=2(12{,}01)+5(1{,}008)+14{,}01+2(16{,}00)`,R`M_m\approx75{,}07\ \mathrm{g/mol}`))+
   step('3. % m/m (base: 1 kg de agua)',chain(R`m_{\mathrm{st}}=0{,}591\cdot75{,}07\approx44{,}4\ \mathrm{g}`,R`m_{\mathrm{sc}}=1000+44{,}4=1044{,}4\ \mathrm{g}`,R`\%\ m/m=\frac{44{,}4}{1044{,}4}\cdot100`,R`\%\ m/m\approx4{,}25`))+
   step('4. Molaridad (necesita una suposición)',`<p>La molaridad pide <b>volumen de solución</b>, y la consigna no da densidad. Suponiendo una solución diluida con ${m(R`\rho_{\mathrm{sc}}\approx1{,}00\ \mathrm{g/mL}`)}:</p>${chain(R`V_{\mathrm{sc}}\approx1044{,}4\ \mathrm{mL}=1{,}044\ \mathrm{L}`,R`C=\frac{0{,}591\ \mathrm{mol}}{1{,}044\ \mathrm{L}}`,R`C\approx0{,}566\ \mathrm{mol/L}`)}`)+
   warn('Ojo con “concentración molar”',`<p>Lo que sale exacto de la crioscopía es la <b>molalidad</b> (0,591 mol/kg). La molaridad (≈ 0,566 mol/L) depende de la densidad supuesta. Si el docente quería “molal”, la respuesta es 0,591 mol/kg.</p>`),
   'b ≈ 0,591 mol/kg · C ≈ 0,566 mol/L (con ρ ≈ 1,00 g/mL supuesta) · % m/m ≈ 4,25');

  ex(11,'Temperatura de congelación del benceno puro','Al disolver 10,0 g de naftaleno en 50,0 mL de benceno (densidad del solvente = 0,88 g/mL), la temperatura de congelamiento de la solución es de −3,39 °C. Si la masa molar del soluto es de 178 g/mol y la Kc del sv es de 5,12 °C·kg/mol, ¿cuál es la temperatura de congelamiento del solvente puro?',
   assume('Naftaleno molecular: i = 1. Se usan los datos de la guía tal como están.')+
   step('1. Masa de solvente',`<p>Me dan volumen de <b>solvente</b> y densidad del <b>solvente</b>:</p>${chain(R`m_{\mathrm{sv}}=\rho\,V=0{,}88\ \mathrm{g/mL}\cdot50{,}0\ \mathrm{mL}`,R`m_{\mathrm{sv}}=44{,}0\ \mathrm{g}=0{,}0440\ \mathrm{kg}`)}`)+
   step('2. Moles y molalidad',chain(R`n=\frac{10{,}0}{178}\approx0{,}05618\ \mathrm{mol}`,R`b=\frac{0{,}05618}{0{,}0440}`,R`b\approx1{,}277\ \mathrm{mol/kg}`))+
   step('3. Descenso',chain(R`\Delta T_f=K_f\,b=5{,}12\cdot1{,}277`,R`\Delta T_f\approx6{,}54\ \mathrm{°C}`))+
   step('4. Temperatura del solvente puro',`<p>Como ${m(R`T_f=T_f^0-\Delta T_f`)}, despejo ${m(R`T_f^0`)}: ${simple('el puro congela MÁS ARRIBA que la solución, así que se suma')}</p>${chain(R`T_f^0=T_f+\Delta T_f`,R`T_f^0=-3{,}39+6{,}54`,R`T_f^0\approx3{,}15\ \mathrm{°C}`)}`)+
   note('Para pensar: el dato de 178 g/mol',`<p>El naftaleno (C₁₀H₈) tiene en realidad M ≈ 128,17 g/mol; 178 g/mol corresponde a otros compuestos (antraceno, fenantreno). Con 128,17 g/mol el resultado sería ≈ 5,7 °C, muy cerca del valor real del benceno (5,5 °C). La respuesta con los datos de la guía es 3,15 °C.</p>`),
   'T⁰<sub>f</sub> ≈ 3,15 °C (con M = 178 g/mol de la guía)');

  ex(12,'Constante ebulloscópica del benzol','Determinar la Keb del benzol cuando se disuelven 5,65 g de un compuesto hidrocarbonado de fórmula molecular C₁₆H₃₄ en 100,00 g del solvente, si se sabe que el ascenso ebulloscópico es de 0,66 °C.',
   assume('Benzol = benceno. El hexadecano C₁₆H₃₄ prácticamente no es volátil a esa temperatura y no se disocia: i = 1.')+
   step('1. Masa molar del C₁₆H₃₄',chain(R`M_m=16(12{,}01)+34(1{,}008)`,R`M_m\approx226{,}4\ \mathrm{g/mol}`))+
   step('2. Moles y molalidad',chain(R`n=\frac{5{,}65}{226{,}4}\approx0{,}02495\ \mathrm{mol}`,R`b=\frac{0{,}02495\ \mathrm{mol}}{0{,}10000\ \mathrm{kg}}`,R`b\approx0{,}2495\ \mathrm{mol/kg}`))+
   step('3. Despeje de K<sub>b</sub>',chain(R`K_b=\frac{\Delta T_b}{b}`,R`K_b=\frac{0{,}66}{0{,}2495}`,R`K_b\approx2{,}65\ \mathrm{°C\cdot kg/mol}`))+
   idea('Control','<p>El valor tabulado para el benceno es ≈ 2,53 °C·kg/mol: el resultado es razonable para un dato experimental.</p>'),
   'K<sub>b</sub> ≈ 2,65 °C·kg/mol');

  add('guia','Guía de ejercitación resuelta','GUÍA 4.º AÑO TM · 07',`
<p>Los 12 ejercicios de la <b>Guía de Ejercitación de Química General “Propiedades Coligativas”</b>. Intentá cada uno antes de abrir la resolución.</p>
${idea('Método para todos los ejercicios',`<ol class="kitList"><li>Leé qué se mide: ¿presión de vapor, temperatura o presión osmótica?</li><li>Eso define la concentración: x, b o C.</li><li>Pasá unidades: masa de solvente en kg, volumen de solución en L, T en K para Π, mmHg → atm.</li><li>Anotá el supuesto de i.</li><li>Controlá: ¿el signo y el orden de magnitud tienen sentido?</li></ol>`)}
<div data-qg-guide></div>
`);

  // ---------- 8. Tarjetas ----------
  add('repaso','Tarjetas de repaso','PARA MEMORIZAR · 08',`
<p>Respondé antes de dar vuelta. Si dudás, volvé a la sección correspondiente.</p>
${cards([
 ['Concentraciones','Molalidad vs. molaridad','Molalidad b = mol de soluto / kg de SOLVENTE (crio/ebulloscopía). Molaridad C = mol de soluto / L de SOLUCIÓN (presión osmótica).'],
 ['Concentraciones','Masa de solvente vs. masa de solución','m<sub>sc</sub> = m<sub>st</sub> + m<sub>sv</sub>. En la molalidad va m<sub>sv</sub> (en kg); en el % m/m va m<sub>sc</sub>.'],
 ['Concentraciones','Volumen de solvente vs. volumen de solución','V<sub>sv</sub> = m<sub>sv</sub>/ρ<sub>sv</sub>; V<sub>sc</sub> = m<sub>sc</sub>/ρ<sub>sc</sub>. Los volúmenes no se suman; para molaridad o % m/v va V<sub>sc</sub>.'],
 ['Signos','Crioscopía y ebulloscopía','T<sub>f</sub> = T⁰<sub>f</sub> − ΔT<sub>f</sub> (baja) · T<sub>b</sub> = T⁰<sub>b</sub> + ΔT<sub>b</sub> (sube). Los ΔT se escriben positivos.'],
 ['Ósmosis','¿Por qué T en kelvin?','Porque Π = iCRT usa temperatura absoluta: con °C el resultado no tiene sentido (a 0 °C daría Π = 0).'],
 ['Raoult','x<sub>sv</sub> vs. x<sub>st</sub>','p<sub>sc</sub>/p⁰ = x<sub>sv</sub> (lo que queda) · Δp/p⁰ = x<sub>st</sub> (lo que baja). x<sub>st</sub> + x<sub>sv</sub> = 1.'],
 ['van ’t Hoff','¿Cuándo i ≈ 1?','Soluto molecular que no se disocia ni se asocia (glucosa, urea, sacarosa), en solución diluida.'],
 ['Ósmosis','Isoosmótico vs. isotónico','Isoosmótico: misma Π. Isotónico: no cambia el volumen celular; depende de los solutos que no atraviesan la membrana.'],
 ['Concepto','¿Qué es una propiedad coligativa?','Depende del número de partículas de soluto respecto del solvente, no de su identidad (modelo ideal/diluido).'],
 ['Concepto','Evaporación vs. ebullición','Evaporación: superficie, cualquier T. Ebullición: p de vapor = p externa, burbujas en todo el líquido.'],
 ['Constantes','¿De qué depende K<sub>f</sub> o K<sub>b</sub>?','Del solvente. Unidades K·kg/mol (= °C·kg/mol).'],
 ['Raoult','Dos componentes volátiles','p<sub>i</sub> = x<sub>i</sub>·p⁰<sub>i</sub> para cada uno y P_total = Σp<sub>i</sub>. Vapor: y<sub>i</sub> = p<sub>i</sub>/P_total.']
])}
${table(['Error frecuente','Corrección'],[
 ['Usar gramos de solvente en la molalidad','Pasar a kilogramos: 50 g = 0,050 kg'],
 ['Usar la masa de solución en la molalidad','Restar el soluto: m<sub>sv</sub> = m<sub>sc</sub> − m<sub>st</sub>'],
 ['Usar °C en Π = iCRT','T(K) = T(°C) + 273,15'],
 ['Dejar Π en mmHg con R = 0,08206','Dividir por 760 para pasar a atm'],
 ['Usar K<sub>f</sub> para un ascenso','Cada propiedad con su constante: K<sub>b</sub> para ebullición'],
 ['Responder “0,315 mol” a una concentración','La concentración va en mol/L']
])}
`);

  // ---------- 9. Complemento ----------
  add('gases','Complemento: mezclas gaseosas','APARTE DE LAS COLIGATIVAS · 09',`
${note('Contenido complementario','<p>Esto aparece en la autocorrección de una prueba. <b>No es una propiedad coligativa</b>: se incluye aparte porque usa fracciones molares y presiones parciales, igual que Raoult.</p>')}
<h3>Ley de Dalton</h3>
<p>En una mezcla ideal de gases, cada gas ejerce su propia <b>presión parcial</b>, como si estuviera solo, y la presión total es la suma. ${simple('Cada gas “empuja” en proporción a cuántos moles aporta')}</p>
${sym([[R`p_{\mathrm{total}}`,'presión total de la mezcla','hPa · atm'],[R`p_i`,'presión parcial del gas i','hPa'],[R`y_i`,'fracción molar en fase GASEOSA','adimensional']])}
${chain([R`p_{\mathrm{total}}=\sum_i p_i`],[R`p_i=y_i\,p_{\mathrm{total}}`])}
${idea('¿y o x?','<p>Se usa <b>y</b> para la fracción molar en el <b>gas</b> y <b>x</b> para la fracción molar en el <b>líquido</b>. Así no se confunden en problemas como el de benceno y tolueno.</p>')}
${example('Mezcla de Kr, CO₂, N₂ y O₂',
 `<p><b>Datos:</b> presión total 1000 hPa; y(Kr) = 0,112; y(CO₂) = 0,030; las fracciones de N₂ y O₂ son iguales. Calcular las fracciones faltantes y las presiones parciales.</p>`,
 step('1. Fracciones molares',chain(R`y_{\mathrm{Kr}}+y_{\mathrm{CO_2}}+y_{\mathrm{N_2}}+y_{\mathrm{O_2}}=1`,[R`0{,}112+0{,}030+2y_{\mathrm{N_2}}=1`,'y(N₂) = y(O₂)'],R`y_{\mathrm{N_2}}=\frac{1-0{,}112-0{,}030}{2}`,R`y_{\mathrm{N_2}}=0{,}429`,R`y_{\mathrm{O_2}}=0{,}429`))+
 step('2. Presiones parciales',chain(R`p_{\mathrm{Kr}}=0{,}112\cdot1000=112\ \mathrm{hPa}`,R`p_{\mathrm{CO_2}}=0{,}030\cdot1000=30\ \mathrm{hPa}`,R`p_{\mathrm{N_2}}=0{,}429\cdot1000=429\ \mathrm{hPa}`,R`p_{\mathrm{O_2}}=0{,}429\cdot1000=429\ \mathrm{hPa}`))+
 step('3. Control',chain(R`112+30+429+429=1000\ \mathrm{hPa}`)),
 `y(N₂) = y(O₂) = 0,429 · p: Kr 112 hPa, CO₂ 30 hPa, N₂ 429 hPa, O₂ 429 hPa`)}
${example('Relación entre cantidad, concentración y volumen',
 `<p>La misma autocorrección contiene una regla de tres compatible con una concentración de 0,820 mol/L y un volumen de 1,5 L, y luego una concentración de 11,65 mol/L.</p>`,
 note('Alcance','<p>Falta la consigna original: no se inventan sustancias ni una situación de mezcla. Se presenta sólo como ejemplo de la relación n = C·V.</p>')+
 step('1. Cantidad',chain(R`n=C\,V`,R`n=0{,}820\ \mathrm{mol/L}\cdot1{,}5\ \mathrm{L}`,R`n=1{,}23\ \mathrm{mol}`))+
 step('2. Volumen con otra concentración',chain(R`V=\frac{n}{C}`,R`V=\frac{1{,}23\ \mathrm{mol}}{11{,}65\ \mathrm{mol/L}}`,R`V\approx0{,}1056\ \mathrm{L}`,R`V\approx105{,}6\ \mathrm{mL}`))+
 fix('Sobre el valor del manuscrito','<p>El manuscrito escribe ≈ 105,13 mL. Con los números legibles corresponde <b>≈ 105,6 mL</b>.</p>'),
 `n = 1,23 mol · V ≈ 105,6 mL`)}
`);

  window.ET27_QG4={
    subjectName:'Química General',
    year:4,
    units:[
      {id:'soluciones',n:1,title:'Soluciones',pending:true},
      {id:'estequiometria',n:2,title:'Estequiometría',pending:true},
      {id:'formulacion',n:3,title:'Formulación',pending:true},
      {id:'coligativas',n:4,title:'Propiedades coligativas',lead:'Cómo un soluto cambia la presión de vapor, las temperaturas de congelación y ebullición y genera presión osmótica: teoría, fórmulas paso a paso y la guía completa resuelta.',sections,exercises}
    ]
  };
})();
