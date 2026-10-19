// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 4 · Equilibrio redox
// Reacciones redox, ion-electrón en medio ácido y básico (paso a paso), oxidantes y reductores, pilas (dos fórmulas),
// potenciales y tablas, electrodo normal de hidrógeno, Nernst, el "n" del denominador, relación con Ke y condición de equilibrio.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts,vira,swatch}=Q;
  const {sup,ver,flow,memo}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-rx-${k}`,label:l,kicker:kk,html:h});

  const pila=`<svg viewBox="0 0 660 300" role="img" aria-label="Pila de Daniell: ánodo de zinc, cátodo de cobre, puente salino y circulación de electrones por el circuito externo">
    <defs><marker id="qacArrP" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <path d="M40 120 V270 H260 V120" class="svgTube"/><rect x="42" y="150" width="216" height="118" class="svgLiquid"/>
    <path d="M400 120 V270 H620 V120" class="svgTube"/><rect x="402" y="150" width="216" height="118" class="svgLiquid strongLiquid"/>
    <rect x="60" y="70" width="34" height="170" rx="4" fill="#9aa3ad"/><text x="77" y="60" text-anchor="middle" class="svgText strong">Zn</text>
    <rect x="566" y="70" width="34" height="170" rx="4" fill="#c46a3a"/><text x="583" y="60" text-anchor="middle" class="svgText strong">Cu</text>
    <path d="M210 175 V100 H450 V175" fill="none" stroke="var(--muted)" stroke-width="16" stroke-linecap="round" opacity=".35"/>
    <text x="330" y="92" text-anchor="middle" class="svgText qiSmall">puente salino (KNO₃)</text>
    <path d="M77 70 V30 H583 V70" class="svgLine thickLine"/><circle cx="330" cy="30" r="20" class="svgLineFill svgSoft"/><text x="330" y="36" text-anchor="middle" class="svgText strong">V</text>
    <line x1="190" y1="18" x2="290" y2="18" class="svgArrow" marker-end="url(#qacArrP)"/><text x="240" y="12" text-anchor="middle" class="svgText qiSmall">e⁻</text>
    <line x1="370" y1="18" x2="470" y2="18" class="svgArrow" marker-end="url(#qacArrP)"/><text x="420" y="12" text-anchor="middle" class="svgText qiSmall">e⁻</text>
    <text x="150" y="292" text-anchor="middle" class="svgText strong">ÁNODO (−) · oxidación</text><text x="510" y="292" text-anchor="middle" class="svgText strong">CÁTODO (+) · reducción</text>
    <text x="108" y="200" class="svgText qiSmall">Zn(s) → Zn²⁺(ac) + 2e⁻</text><text x="420" y="200" class="svgText qiSmall">Cu²⁺(ac) + 2e⁻ → Cu(s)</text>
    <text x="108" y="250" class="svgText qiSmall">ZnSO₄ 1 M</text><text x="420" y="250" class="svgText qiSmall">CuSO₄ 1 M</text>
  </svg>`;

  window.ET27_QAC5.shared=Object.assign(window.ET27_QAC5.shared||{},{pila});
  // =====================================================================
  add('conceptos','Reacciones redox: quién se oxida y quién se reduce','REDOX · 01',`
<p>Una reacción redox es una <b>transferencia de electrones</b>: una especie los pierde (se oxida) y otra los gana (se reduce). Siempre ocurren las dos a la vez: los electrones no quedan sueltos en la solución.</p>
${table(['Proceso','Electrones','Número de oxidación','La especie es el…'],[['Oxidación','<b>pierde</b> e⁻','<b>sube</b>','<b>reductor</b> (reduce al otro)'],['Reducción','<b>gana</b> e⁻','<b>baja</b>','<b>oxidante</b> (oxida al otro)']])}
${punch('El oxidante se reduce; el reductor se oxida. Parece un trabalenguas, pero es lógico: el oxidante le saca electrones al otro y se los queda.')}
<h3>Repaso exprés de números de oxidación</h3>
${table(['Regla','Ejemplos'],[['Elemento libre: 0','Fe, Cu, Cl₂, O₂'],['Ion monoatómico: su carga','Fe³⁺ = +3, Cl⁻ = −1'],['O: −2 (peróxidos −1)','H₂O, Cr₂O₇²⁻ · H₂O₂'],['H: +1 (hidruros metálicos −1)','HCl, NH₃ · NaH'],['Suma = carga de la especie','neutra 0; ion = su carga']])}
${example('Identificar oxidante y reductor','<p>En la reacción entre dicromato y Fe²⁺ en medio ácido: Cr₂O₇²⁻(ac) + Fe²⁺(ac) → Cr³⁺(ac) + Fe³⁺(ac).</p>',
 step('Números de oxidación del Cr',chain(R`2x+7(-2)=-2\ \Rightarrow\ x=+6\ \text{en}\ \mathrm{Cr_2O_7^{2-}}`,R`\mathrm{Cr^{3+}}:\ +3`))+
 step('Conclusión',`<p>Cr: +6 → +3, baja: se <b>reduce</b> → el Cr₂O₇²⁻ es el <b>oxidante</b>. Fe: +2 → +3, sube: se <b>oxida</b> → el Fe²⁺ es el <b>reductor</b>.</p>${vira('Cr₂O₇²⁻ naranja','#e2711d','Cr³⁺ verde','#3d8b4a')}`)+A.jus('<p>El que se reduce gana electrones (baja su número de oxidación) y es el oxidante, porque oxida al otro; el que se oxida pierde electrones y es el reductor.</p>'),
 'Oxidante: Cr₂O₇²⁻ · Reductor: Fe²⁺')}
`);

  // =====================================================================
  add('acido','Método del ion-electrón en medio ácido, paso a paso','REDOX · 02',`
<p>El método separa la reacción en dos <b>hemirreacciones</b> (la de oxidación y la de reducción), balancea cada una por separado y las suma de modo que se cancelen los electrones.</p>
${flow([
 ['Escribir las dos hemirreacciones','sólo con las especies que cambian de número de oxidación (como están en solución: iones, no sales).'],
 ['Balancear los átomos que no son O ni H',''],
 ['Balancear el O con H₂O','agregar tantas moléculas de agua como O falten, del lado que falten.'],
 ['Balancear el H con H⁺','agregar H⁺ del lado que falten H.'],
 ['Balancear la carga con e⁻','agregar electrones del lado más positivo hasta igualar cargas.'],
 ['Igualar los electrones','multiplicar cada hemirreacción para que los e⁻ cedidos = e⁻ ganados (mínimo común múltiplo).'],
 ['Sumar y simplificar','cancelar e⁻, y lo que se repita de los dos lados (H₂O, H⁺).'],
 ['Controlar','átomos de cada elemento y carga total a ambos lados.'],
 ['Pasar a la ecuación molecular (si la piden)','agregar los iones espectadores de las sales y ácidos dados.']
])}
${example('Dicromato + Fe²⁺ en H₂SO₄','<p>Balancear: K₂Cr₂O₇(ac) + FeSO₄(ac) + H₂SO₄(ac) → Cr₂(SO₄)₃(ac) + Fe₂(SO₄)₃(ac) + K₂SO₄(ac) + H₂O(l)</p>',
 step('1. Hemirreacciones (iónicas)',rxs(['Cr2O7^2- -> Cr^3+','reducción (Cr +6 → +3)'],['Fe^2+ -> Fe^3+','oxidación']))+
 step('2. Átomos que no son O ni H',rx('Cr2O7^2- -> 2 Cr^3+','2 Cr de cada lado'))+
 step('3. Oxígeno con agua',rx('Cr2O7^2- -> 2 Cr^3+ + 7 H2O','7 O a la izquierda → 7 H₂O a la derecha'))+
 step('4. Hidrógeno con H⁺',rx('Cr2O7^2- + 14 H^+ -> 2 Cr^3+ + 7 H2O','14 H en el agua → 14 H⁺ a la izquierda'))+
 step('5. Carga con electrones',chain([R`\text{izquierda: }-2+14=+12\qquad\text{derecha: }2\cdot(+3)=+6`,'faltan 6 cargas negativas a la izquierda'])+rxs(['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O','reducción balanceada'],['Fe^2+ -> Fe^3+ + e^-','oxidación balanceada']))+
 step('6. Igualar electrones (× 1 y × 6) y sumar',rxs(['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O','× 1'],['6 Fe^2+ -> 6 Fe^3+ + 6 e^-','× 6'],['Cr2O7^2- + 14 H^+ + 6 Fe^2+ -> 2 Cr^3+ + 6 Fe^3+ + 7 H2O','ecuación iónica']))+
 step('7. Control',`<p>Cr 2 = 2 · Fe 6 = 6 · O 7 = 7 · H 14 = 14 · carga: −2 + 14 + 12 = <b>+24</b>; 6 + 18 = <b>+24</b> ✓</p>`)+
 step('8. Ecuación molecular',rx('K2Cr2O7 + 6 FeSO4 + 7 H2SO4 -> Cr2(SO4)3 + 3 Fe2(SO4)3 + K2SO4 + 7 H2O')+`<p>Los 14 H⁺ vienen de 7 H₂SO₄. Control del S: 6 + 7 = 13; 3 + 9 + 1 = 13 ✓</p>`)+A.jus('<p>En una redox los electrones que pierde el reductor los gana el oxidante: por eso se igualan los electrones de las dos hemirreacciones antes de sumarlas. En medio ácido el O se balancea con H₂O y el H con H⁺.</p>'),
 'K₂Cr₂O₇(ac) + 6 FeSO₄(ac) + 7 H₂SO₄(ac) → Cr₂(SO₄)₃(ac) + 3 Fe₂(SO₄)₃(ac) + K₂SO₄(ac) + 7 H₂O(l)')}
${example('Permanganato + oxalato (un producto gaseoso)','<p>Balancear en medio ácido: MnO₄⁻(ac) + C₂O₄²⁻(ac) → Mn²⁺(ac) + CO₂(g)</p>',
 step('Reducción',rxs(['MnO4^- -> Mn^2+'],['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','Mn +7 → +2: 5 e⁻']))+
 step('Oxidación',rxs(['C2O4^2- -> 2 CO2','C +3 → +4, dos C'],['C2O4^2- -> 2 CO2 + 2 e^-','carga −2 = 0 − 2 ✓']))+
 step('× 2 y × 5, y sumar',rx('2 MnO4^- + 16 H^+ + 5 C2O4^2- -> 2 Mn^2+ + 10 CO2 + 8 H2O'))+
 step('Control',`<p>Mn 2 · C 10 · O 8 + 20 = 28 = 20 + 8 ✓ · H 16 = 16 · carga −2 + 16 − 10 = +4 = +4 ✓</p>`)+A.jus('<p>Mn pasa de +7 a +2 (5 e⁻, se reduce) y cada C del oxalato de +3 a +4 (2 e⁻ por oxalato, se oxida). El mínimo común múltiplo de 5 y 2 da 10 electrones intercambiados.</p>'),
 '2 MnO₄⁻(ac) + 5 C₂O₄²⁻(ac) + 16 H⁺(ac) → 2 Mn²⁺(ac) + 10 CO₂(g) + 8 H₂O(l)')}
`);

  // =====================================================================
  add('basico','Método del ion-electrón en medio básico','REDOX · 03',`
<p>En medio básico casi no hay H⁺: la ecuación final <b>no puede tener H⁺</b>. Hay dos maneras equivalentes; elegí una y usala siempre.</p>
${table(['Método A: directo con OH⁻ y H₂O','Método B: “como en ácido y después neutralizar”'],[
 ['Por cada O que <b>falta</b> en un lado, agregar <b>2 OH⁻</b> en ese lado y <b>1 H₂O</b> del otro.','Balancear todo como si fuera medio ácido (con H₂O y H⁺).'],
 ['Por cada H que <b>falta</b>, agregar <b>1 H₂O</b> en ese lado y <b>1 OH⁻</b> del otro.','Sumar a <b>ambos lados</b> tantos OH⁻ como H⁺ haya.'],
 ['Balancear carga con e⁻ y seguir igual.','Juntar H⁺ + OH⁻ = H₂O y simplificar el agua.']
])}
${example('Permanganato + sulfito en medio básico','<p>Balancear: KMnO₄(ac) + Na₂SO₃(ac) → MnO₂(s) + Na₂SO₄(ac) (medio básico)</p>',
 step('1. Reducción',rxs(['MnO4^- -> MnO2','Mn +7 → +4'],['MnO4^- + 2 H2O -> MnO2 + 4 OH^-','sobran 2 O a la izquierda: 2 H₂O a la izquierda y 4 OH⁻ a la derecha'],['MnO4^- + 2 H2O + 3 e^- -> MnO2 + 4 OH^-','carga: −1 → −4: 3 e⁻']))+
 step('2. Oxidación',rxs(['SO3^2- -> SO4^2-','S +4 → +6'],['SO3^2- + 2 OH^- -> SO4^2- + H2O','falta 1 O a la izquierda: 2 OH⁻ ahí y 1 H₂O a la derecha'],['SO3^2- + 2 OH^- -> SO4^2- + H2O + 2 e^-','carga: −4 → −2: 2 e⁻']))+
 step('3. × 2 y × 3, sumar y simplificar',rxs(['2 MnO4^- + 4 H2O + 3 SO3^2- + 6 OH^- -> 2 MnO2 + 8 OH^- + 3 SO4^2- + 3 H2O'],['2 MnO4^- + 3 SO3^2- + H2O -> 2 MnO2 + 3 SO4^2- + 2 OH^-','se cancelan 3 H₂O y 6 OH⁻']))+
 step('4. Control',`<p>Mn 2 · S 3 · O 8 + 9 + 1 = 18 = 4 + 12 + 2 ✓ · H 2 = 2 ✓ · carga −2 − 6 = −8 = −6 − 2 ✓ · <b>no hay H⁺</b> ✓</p>`)+
 step('5. Molecular',rx('2 KMnO4 + 3 Na2SO3 + H2O -> 2 MnO2 + 3 Na2SO4 + 2 KOH'))+A.jus('<p>En medio básico no hay H⁺ libre: el O se balancea con H₂O y HO⁻. Mn +7 → +4 (3 e⁻) y S +4 → +6 (2 e⁻): se multiplica por 2 y por 3 para igualar 6 electrones.</p>'),
 '2 MnO₄⁻(ac) + 3 SO₃²⁻(ac) + H₂O(l) → 2 MnO₂(s) + 3 SO₄²⁻(ac) + 2 OH⁻(ac)')}
${example('Cromo(III) a cromato con hipoclorito (reconocimiento del cromo)','<p>Balancear en medio básico: Cr(OH)₃(s) + ClO⁻(ac) → CrO₄²⁻(ac) + Cl⁻(ac). Lo resolvemos con el <b>método B</b> para mostrarlo.</p>',
 step('1. Oxidación como si fuera ácido',rxs(['Cr(OH)3 + H2O -> CrO4^2- + 5 H^+ + 3 e^-','Cr +3 → +6']))+
 step('2. Reducción como si fuera ácido',rxs(['ClO^- + 2 H^+ + 2 e^- -> Cl^- + H2O','Cl +1 → −1']))+
 step('3. × 2 y × 3, sumar',rxs(['2 Cr(OH)3 + 2 H2O + 3 ClO^- + 6 H^+ -> 2 CrO4^2- + 10 H^+ + 3 Cl^- + 3 H2O'],['2 Cr(OH)3 + 3 ClO^- -> 2 CrO4^2- + 4 H^+ + 3 Cl^- + H2O','simplificando H⁺ y H₂O']))+
 step('4. Neutralizar: + 4 OH⁻ a cada lado',rxs(['2 Cr(OH)3 + 3 ClO^- + 4 OH^- -> 2 CrO4^2- + 3 Cl^- + 4 H2O + H2O'],['2 Cr(OH)3 + 3 ClO^- + 4 OH^- -> 2 CrO4^2- + 3 Cl^- + 5 H2O','4 H⁺ + 4 OH⁻ = 4 H₂O']))+
 step('5. Control',`<p>Cr 2 · Cl 3 · O 6 + 3 + 4 = 13 = 8 + 5 ✓ · H 6 + 4 = 10 = 10 ✓ · carga −3 − 4 = −7 = −4 − 3 ✓</p>${vira('Cr(OH)₃ verde grisáceo','#6f8f6a','CrO₄²⁻ amarillo','#e8c21c')}`)+A.jus('<p>Se balancea como en medio ácido y después se agregan HO⁻ a ambos lados para neutralizar los H⁺: así la ecuación final queda en medio básico, que es donde ocurre la reacción.</p>'),
 '2 Cr(OH)₃(s) + 3 ClO⁻(ac) + 4 OH⁻(ac) → 2 CrO₄²⁻(ac) + 3 Cl⁻(ac) + 5 H₂O(l)')}
${note('Dismutación (o desproporción)','<p>Una misma especie se oxida y se reduce a la vez. Ejemplo clásico en medio básico:</p>'+rx('Cl2 + 2 OH^- -> Cl^- + ClO^- + H2O','Cl 0 → −1 y 0 → +1')+'<p>Se balancea igual: las dos hemirreacciones parten del Cl₂.</p>')}
${warn('Errores típicos','<ul><li>Dejar H⁺ en la ecuación final de un medio básico.</li><li>Sumar hemirreacciones sin igualar electrones.</li><li>Escribir sales o ácidos sin disociar en las hemirreacciones (va '+f('MnO4^-')+', no KMnO₄).</li><li>No controlar la carga al final: es el control que detecta casi todos los errores.</li></ul>')}
`);

  // =====================================================================
  add('oxidantes','Sustancias oxidantes y reductoras','REDOX · 04',`
${memo([
 ['Oxidantes frecuentes','strong','<ul><li>'+f('MnO4^-(ac)')+' → '+f('Mn^2+(ac)')+' (ácido) · '+f('MnO2(s)')+' (neutro/básico)</li><li>'+f('Cr2O7^2-(ac)')+' → '+f('Cr^3+(ac)')+'</li><li>'+f('H2O2(ac)')+' → '+f('H2O(l)')+'</li><li>'+f('HNO3(ac)')+' → '+f('NO(g)')+' o '+f('NO2(g)')+'</li><li>'+f('Cl2(g)')+', '+f('Br2(l)')+', '+f('I2(s)')+' → haluros ('+f('Cl^-(ac)')+', '+f('Br^-(ac)')+', '+f('I^-(ac)')+')</li><li>'+f('ClO^-(ac)')+' → '+f('Cl^-(ac)')+'</li><li>'+f('Fe^3+(ac)')+' → '+f('Fe^2+(ac)')+'</li></ul>'],
 ['Reductores frecuentes','weak','<ul><li>metales activos: Zn, Fe, Al, Mg</li><li>'+f('Fe^2+(ac)')+' → '+f('Fe^3+(ac)')+'</li><li>'+f('Sn^2+(ac)')+' → '+f('Sn^4+(ac)')+'</li><li>'+f('I^-(ac)')+' → '+f('I2(s)')+'</li><li>'+f('SO3^2-(ac)')+' → '+f('SO4^2-(ac)')+'</li><li>'+f('C2O4^2-(ac)')+' → '+f('CO2(g)')+'</li><li>'+f('H2S(ac)')+' → '+f('S(s)')+'</li><li>'+f('H2O2(ac)')+' → '+f('O2(g)')+' (¡también puede ser reductor!)</li></ul>']
])}
${idea('¿Quién puede ser oxidante, reductor o las dos cosas?','<ul><li>Elemento en su <b>máximo</b> estado de oxidación (Mn +7 en MnO₄⁻, Cr +6, N +5 en HNO₃): sólo puede bajar → <b>sólo oxidante</b>.</li><li>En su <b>mínimo</b> (S −2 en H₂S, I⁻, N −3 en NH₃): <b>sólo reductor</b>.</li><li>En un estado <b>intermedio</b> (Fe²⁺, H₂O₂ con O −1, SO₃²⁻ con S +4, NO₂⁻): <b>puede ser las dos cosas</b>, depende de con quién reaccione.</li></ul>')}
`);

  // =====================================================================
  add('pilas','Pilas galvánicas (voltaicas): las dos fórmulas','REDOX · 05',`
<p>Si separamos las dos hemirreacciones en dos recipientes y las conectamos con un cable y un puente salino, los electrones tienen que pasar por el cable: obtenemos <b>corriente eléctrica</b> a partir de una reacción química espontánea. Eso es una pila galvánica (o voltaica).</p>
${figure(pila,'Pila de Daniell. Los electrones salen del ánodo (Zn, se oxida) y llegan al cátodo (Cu²⁺ se reduce). El puente salino cierra el circuito y mantiene la neutralidad de cada solución.')}
${table(['Electrodo','Qué pasa','Signo en la pila','Regla mnemotécnica'],[['Ánodo','oxidación','−','<b>A</b>nodo – <b>O</b>xidación (vocales)'],['Cátodo','reducción','+','<b>C</b>átodo – <b>R</b>educción (consonantes)']])}
<p>Notación abreviada (ánodo a la izquierda, cátodo a la derecha, ‖ = puente salino):</p>
${M(R`\mathrm{Zn(s)\,|\,Zn^{2+}(1\,M)\ \|\ Cu^{2+}(1\,M)\,|\,Cu(s)}`)}
<h3>Las dos fórmulas de la unidad</h3>
${key(R`E^\circ_{\text{pila}}=E^\circ_{\text{cátodo}}-E^\circ_{\text{ánodo}}`,'Fórmula 1 · con potenciales de REDUCCIÓN de tabla')}
${key(R`\Delta G^\circ=-n\,F\,E^\circ_{\text{pila}}\qquad F=96\,500\ \mathrm{C/mol}`,'Fórmula 2 · espontaneidad')}
${table(['E° pila','ΔG°','La reacción tal como está escrita…'],[['&gt; 0','&lt; 0','es <b>espontánea</b> (funciona como pila)'],['&lt; 0','&gt; 0','no es espontánea (ocurre la inversa)'],['= 0','= 0','está en equilibrio']])}
${example('Pila de Daniell','<p>E°(Cu²⁺/Cu) = +0,34 V · E°(Zn²⁺/Zn) = −0,76 V. Calcular E° y ΔG°, e indicar ánodo y cátodo.</p>',
 step('1. ¿Quién se reduce?',`<p>El de <b>mayor</b> potencial de reducción: el Cu²⁺ (0,34 &gt; −0,76). Cátodo: Cu. Ánodo: Zn.</p>`+rxs(['Cu^2+ + 2 e^- -> Cu','cátodo'],['Zn -> Zn^2+ + 2 e^-','ánodo'],['Zn + Cu^2+ -> Zn^2+ + Cu','global, n = 2']))+
 step('2. Fórmula 1',chain(R`E^\circ=0{,}34-(-0{,}76)=1{,}10\ \mathrm{V}`))+
 step('3. Fórmula 2',chain(R`\Delta G^\circ=-2\cdot96\,500\cdot1{,}10=-2{,}12\times10^{5}\ \mathrm{J}=-212\ \mathrm{kJ}`))+A.jus('<p>Se reduce la especie con mayor potencial de reducción (Cu²⁺), así que el cobre es el cátodo y el zinc el ánodo. E° &gt; 0 implica ΔG° &lt; 0: la reacción es espontánea y la pila funciona.</p>'),
 'E° = 1,10 V · ΔG° = −212 kJ · espontánea')}
${warn('No restes “al revés” ni cambies signos de más','<p>En la fórmula 1 se usan los dos potenciales <b>de reducción tal como figuran en la tabla</b>; el “menos” ya se encarga de invertir el del ánodo. Si además le cambiás el signo al del ánodo, lo invertís dos veces.</p>')}
`);

  // =====================================================================
  add('notacion','Leer la notación de una pila (y las pilas raras)','REDOX',`
${M(R`\underbrace{\mathrm{Zn(s)\,|\,Zn^{2+}(c_1)}}_{\text{ánodo: oxidación}}\ \|\ \underbrace{\mathrm{Cu^{2+}(c_2)\,|\,Cu(s)}}_{\text{cátodo: reducción}}`)}
${table(['Símbolo','Significa'],[['|','límite entre fases (metal | solución, sólido | solución)'],['‖','puente salino'],[',','especies en la misma solución (ej. Fe³⁺, Fe²⁺)'],['Pt','electrodo inerte: se usa cuando las dos formas del par están disueltas'],['izquierda / derecha','ánodo / cátodo (por convención)']])}
${table(['Pila “rara”','Cómo se piensa'],[
 ['Electrodo con precipitado: Pb | PbSO₄ | SO₄²⁻','el Pb²⁺ libre lo fija el Kps: [Pb²⁺] = Kps/[SO₄²⁻]; después Nernst del par Pb²⁺/Pb.'],
 ['Pila de concentración: Zn | Zn²⁺(c₁) ‖ Zn²⁺(c₂) | Zn','E° = 0: '+m(R`E=\frac{0{,}0592}{n}\log\frac{c_{\text{cát}}}{c_{\text{án}}}`)+'. Sirve para medir concentraciones muy bajas (y de ahí Kps o Kf).'],
 ['Con complejo: Zn | Zn(CN)₄²⁻, CN⁻','el Zn²⁺ libre lo fija Kf: [Zn²⁺] = [Zn(CN)₄²⁻]/(Kf·[CN⁻]⁴).']
])}
${warn('¿Está en equilibrio?','<p>Si el voltímetro marca un valor distinto de cero, <b>no</b>: hay diferencia de potencial y la reacción sigue avanzando. El equilibrio es E = 0 (Q = K).</p>')}
`);

  // =====================================================================
  add('potenciales','Potenciales estándar, tablas y el electrodo de hidrógeno','REDOX · 06',`
<h3>El electrodo normal de hidrógeno (ENH)</h3>
<p>No se puede medir el potencial de un electrodo solo: siempre se mide una <b>diferencia</b> entre dos. Por eso se eligió uno de referencia y se le asignó potencial cero:</p>
${facts([['Electrodo','lámina de platino platinado (recubierto de Pt finamente dividido)'],['Gas','H₂ burbujeando a 1 atm'],['Solución','H⁺ 1 M (actividad 1)'],['Temperatura','25 °C'],['Potencial','E° = 0,00 V por convención']])}
${rx('2 H^+(1 M) + 2 e^- <=> H2(g, 1 atm)','E° = 0,00 V')}
<p>El potencial estándar de cualquier par es la fem de la pila que forma con el ENH, con todas las especies en condiciones estándar (1 M, 1 atm, 25 °C).</p>
<h3>Tabla de potenciales estándar de reducción</h3>
${table(['Hemirreacción de reducción','E° (V)'],[
 ['F₂(g) + 2e⁻ → 2F⁻(ac)','+2,87'],['NaBiO₃(s) + 6H⁺(ac) + 2e⁻ → Bi³⁺(ac) + Na⁺(ac) + 3H₂O(l)','≈ +1,8 (según tabla)'],['H₂O₂(ac) + 2H⁺(ac) + 2e⁻ → 2H₂O(l)','+1,78'],['MnO₄⁻(ac) + 8H⁺(ac) + 5e⁻ → Mn²⁺(ac) + 4H₂O(l)','+1,51'],['Cl₂(g) + 2e⁻ → 2Cl⁻(ac)','+1,36'],['Cr₂O₇²⁻(ac) + 14H⁺(ac) + 6e⁻ → 2Cr³⁺(ac) + 7H₂O(l)','+1,33'],['O₂(g) + 4H⁺(ac) + 4e⁻ → 2H₂O(l)','+1,23'],['Br₂(l) + 2e⁻ → 2Br⁻(ac)','+1,07'],['NO₃⁻(ac) + 4H⁺(ac) + 3e⁻ → NO(g) + 2H₂O(l)','+0,96'],['Ce⁴⁺(ac) + e⁻ → Ce³⁺(ac)','+1,61'],['Hg²⁺(ac) + 2e⁻ → Hg(l)','+0,85'],['Ag⁺(ac) + e⁻ → Ag(s)','+0,80'],['Fe³⁺(ac) + e⁻ → Fe²⁺(ac)','+0,77'],['I₂(s) + 2e⁻ → 2I⁻(ac)','+0,54'],['Cu²⁺(ac) + 2e⁻ → Cu(s)','+0,34'],['AgCl(s) + e⁻ → Ag(s) + Cl⁻(ac)','+0,22'],['Sn⁴⁺(ac) + 2e⁻ → Sn²⁺(ac)','+0,15'],['<b>2H⁺(ac) + 2e⁻ → H₂(g)</b>','<b>0,00</b>'],['Pb²⁺(ac) + 2e⁻ → Pb(s)','−0,13'],['Sn²⁺(ac) + 2e⁻ → Sn(s)','−0,14'],['Ni²⁺(ac) + 2e⁻ → Ni(s)','−0,25'],['Fe²⁺(ac) + 2e⁻ → Fe(s)','−0,44'],['Zn²⁺(ac) + 2e⁻ → Zn(s)','−0,76'],['Al³⁺(ac) + 3e⁻ → Al(s)','−1,66'],['Mg²⁺(ac) + 2e⁻ → Mg(s)','−2,37'],['Na⁺(ac) + e⁻ → Na(s)','−2,71']
])}
${flow([
 ['Arriba de la tabla (E° grande y positivo)','las formas oxidadas son <b>oxidantes fuertes</b> (F₂, MnO₄⁻, Cl₂): tienen muchas ganas de reducirse.'],
 ['Abajo de la tabla (E° muy negativo)','las formas reducidas son <b>reductores fuertes</b> (Na, Mg, Zn): tienen muchas ganas de oxidarse.'],
 ['Regla para predecir','un oxidante reacciona espontáneamente con cualquier reductor que esté <b>más abajo</b> en la tabla (E°cát &gt; E°án).']
])}
${idea('Potencial de oxidación','<p>Algunas tablas dan potenciales de <b>oxidación</b>: son los mismos números con el signo cambiado (Zn(s) → Zn²⁺(ac) + 2e⁻, E°ox = +0,76 V). Fijate siempre cómo está escrita la hemirreacción en tu tabla. Con potenciales de oxidación la fórmula queda '+m(R`E^\circ_{\text{pila}}=E^\circ_{\text{red,cát}}+E^\circ_{\text{ox,án}}`)+'.</p>')}
${warn('E° NO se multiplica','<p>Para igualar electrones multiplicamos las hemirreacciones por 2, 3, 5…, pero <b>el potencial no cambia</b>: es una propiedad intensiva (como la temperatura). Lo que sí se multiplica es ΔG (y n).</p>')}
${example('¿Reacciona el Fe³⁺ con el I⁻? ¿Y con el Br⁻?','<p>Usar la tabla.</p>',
 step('Fe³⁺ + I⁻',chain(R`E^\circ=E^\circ(\mathrm{Fe^{3+}/Fe^{2+}})-E^\circ(\mathrm{I_2/I^-})=0{,}77-0{,}54=+0{,}23\ \mathrm{V}>0`)+rx('2 Fe^3+ + 2 I^- -> 2 Fe^2+ + I2','espontánea: aparece el color pardo del I₂'))+
 step('Fe³⁺ + Br⁻',chain(R`E^\circ=0{,}77-1{,}07=-0{,}30\ \mathrm{V}<0`)+'<p>No reacciona: el Br₂ es mejor oxidante que el Fe³⁺ (está más arriba).</p>')+A.jus('<p>Una reacción redox es espontánea si el oxidante tiene mayor potencial de reducción que el par del reductor (E°pila &gt; 0). El Fe³⁺ está por encima del I₂/I⁻ pero por debajo del Br₂/Br⁻.</p>'),
 'El Fe³⁺ oxida al I⁻ pero no al Br⁻')}
`);

  // =====================================================================
  add('nernst','Ecuación de Nernst y el famoso denominador','REDOX · 07',`
<p>Los E° valen sólo con todo en 1 M. Con otras concentraciones el potencial cambia, y lo calcula la ecuación de Nernst. Para una hemirreacción escrita como reducción, a Ox + n e⁻ → b Red:</p>
${key(R`E=E^\circ-\frac{0{,}0592}{n}\,\log\frac{[\mathrm{Red}]^b}{[\mathrm{Ox}]^a}\qquad(25\,^\circ\mathrm{C})`,'Nernst para una hemirreacción')}
${key(R`E_{\text{pila}}=E^\circ_{\text{pila}}-\frac{0{,}0592}{n}\,\log Q`,'Nernst para la pila (Q = cociente de la reacción global)')}
${note('Qué va en el cociente','<p>Igual que en cualquier constante: productos arriba, reactivos abajo, elevados a sus coeficientes. Sólidos (metales) y el agua <b>no entran</b>. El H⁺ y el OH⁻ <b>sí</b> entran: por eso el potencial de muchos oxidantes depende del pH.</p>')}
${example('Pila de Daniell fuera de condiciones estándar','<p>[Zn²⁺] = 1,0 M y [Cu²⁺] = 0,010 M. Calcular E.</p>',
 step('1. Reacción y Q',rx('Zn + Cu^2+ -> Zn^2+ + Cu','n = 2')+chain(R`Q=\frac{[\mathrm{Zn^{2+}}]}{[\mathrm{Cu^{2+}}]}=\frac{1{,}0}{0{,}010}=100`))+
 step('2. Nernst',chain(R`E=1{,}10-\frac{0{,}0592}{2}\log100=1{,}10-0{,}0592=1{,}04\ \mathrm{V}`))+A.jus('<p>Con poco Cu²⁺ (reactivo), Q aumenta y por Nernst el potencial baja: es Le Châtelier en versión eléctrica (la reacción tiene menos tendencia a avanzar).</p>'),
 'E = 1,04 V (baja porque hay poco Cu²⁺ para reducir)')}
${example('El poder oxidante del permanganato depende del pH','<p>Calcular el potencial del par MnO₄⁻/Mn²⁺ con [MnO₄⁻] = [Mn²⁺] a pH 0, pH 3 y pH 7.</p>',
 step('1. Nernst para la hemirreacción',rx('MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O')+chain(R`E=1{,}51-\frac{0{,}0592}{5}\log\frac{[\mathrm{Mn^{2+}}]}{[\mathrm{MnO_4^-}][\mathrm{H^+}]^8}=1{,}51-\frac{0{,}0592\cdot8}{5}\,\mathrm{pH}`))+
 step('2. Valores',table(['pH','E (V)'],[['0','1,51'],['3','1,51 − 0,284 = 1,23'],['7','1,51 − 0,663 = 0,85']]))+A.jus('<p>El H⁺ es reactivo de la reducción del MnO₄⁻ (aparece a la octava en Nernst): a menor [H⁺] el potencial baja mucho. Por eso los oxidantes oxigenados se usan en medio ácido.</p>'),
 'El MnO₄⁻ oxida mucho más en medio ácido: por eso se acidifica con H₂SO₄')}
<h3>Lo “raro” del número del denominador</h3>
${deep('1 · ¿De dónde sale 0,0592 y por qué a veces aparece 0,059 o 0,06?',`
<p>Nernst se deduce con logaritmo natural: ${m(R`E=E^\circ-\frac{RT}{nF}\ln Q`)}. Pasando a logaritmo decimal (ln = 2,303·log):</p>
${M(R`\frac{2{,}303\,RT}{F}=\frac{2{,}303\cdot8{,}314\cdot298{,}15}{96\,485}=0{,}0592\ \mathrm{V}`)}
<p>Entonces: <b>0,0592 sólo vale a 25 °C</b>. A otra temperatura hay que recalcularlo (a 37 °C da 0,0615). Los que escriben 0,059 o 0,06 están redondeando: el resultado cambia en el tercer decimal. Usá el que use tu profesor.</p>`,true)}
${deep('2 · El n cambia si multiplico la ecuación… y el resultado NO',`
<p>Escribamos el mismo electrodo de plata de dos maneras con [Ag⁺] = 0,010 M:</p>
${chain([R`\mathrm{Ag^+}+e^-\to\mathrm{Ag}:\quad E=0{,}80-\frac{0{,}0592}{1}\log\frac{1}{0{,}010}=0{,}80-0{,}118=0{,}68\ \mathrm{V}`,'n = 1'],[R`2\mathrm{Ag^+}+2e^-\to2\mathrm{Ag}:\quad E=0{,}80-\frac{0{,}0592}{2}\log\frac{1}{(0{,}010)^2}=0{,}80-\frac{0{,}0592}{2}\cdot4=0{,}68\ \mathrm{V}`,'n = 2, pero Q al cuadrado'])}
<p><b>Da lo mismo.</b> Si multiplicás la ecuación por 2, se duplica n, pero el cociente queda elevado al cuadrado y su logaritmo también se duplica: se compensan. El potencial no depende de cómo escribas la ecuación. Lo que sí cambia es ΔG (se duplica) y K (se eleva al cuadrado).</p>`,true)}
${deep('3 · En la pila, n es el total de electrones intercambiados',`
<p>Para la reacción global, n es la cantidad de electrones que <b>se transfieren en la ecuación balanceada</b> (después de igualar con el mínimo común múltiplo), no los de una sola hemirreacción. Ejemplo:</p>
${rx('Cu + 2 Ag^+ -> Cu^2+ + 2 Ag','n = 2 (aunque cada Ag⁺ tome 1 e⁻)')}
${rx('5 Fe^2+ + MnO4^- + 8 H^+ -> 5 Fe^3+ + Mn^2+ + 4 H2O','n = 5 (no 1, no 6)')}
<p>Error típico: usar n = 1 en Cu + 2Ag⁺ “porque la plata toma un electrón”. Con n = 1 y Q escrito con [Ag⁺]² el resultado sale mal. Regla: el n y el Q tienen que corresponder <b>a la misma ecuación escrita</b>.</p>`,true)}
${deep('4 · Calcular la pila como diferencia de dos Nernst (cada uno con su n)',`
<p>También se puede calcular E de cada electrodo por separado, cada uno con su propio n, y restar: ${m(R`E_{\text{pila}}=E_{\text{cát}}-E_{\text{án}}`)}. Da exactamente lo mismo que usar el n global con Q, justamente por lo del punto 2. Es la forma más segura cuando las hemirreacciones tienen distinto número de electrones.</p>`)}
${calc('qacNernst','Nernst a cualquier temperatura',field('e0','E° (V)',1.10)+field('n','n (electrones)',2)+field('q','Q (cociente de reacción)',100)+field('t','temperatura (°C)',25),'Cargado con la pila de Daniell del ejemplo.')}
`);

  // =====================================================================
  add('equilibrio','Relación con la constante de equilibrio: el despeje','REDOX · 08',`
<p>Una pila funciona mientras la reacción avanza. A medida que se consumen reactivos, Q crece y E baja… hasta que <b>E = 0</b>: la pila “se agotó”, la reacción llegó al <b>equilibrio</b> y Q = K.</p>
<h3>Condición de equilibrio</h3>
${key(R`E_{\text{pila}}=0\quad\Longleftrightarrow\quad E_{\text{cátodo}}=E_{\text{ánodo}}\quad\Longleftrightarrow\quad Q=K`,'En el equilibrio los dos electrodos tienen el mismo potencial')}
<h3>El despeje, paso a paso</h3>
${chain([R`0=E^\circ-\frac{0{,}0592}{n}\log K`,'E = 0 y Q = K'],[R`\frac{0{,}0592}{n}\log K=E^\circ`],[R`\log K=\frac{n\,E^\circ}{0{,}0592}`],[R`K=10^{\,nE^\circ/0{,}0592}`])}
${key(R`\log K=\frac{n\,E^\circ_{\text{pila}}}{0{,}0592}\qquad(25\,^\circ\mathrm{C})`,'Relación E° – K')}
${table(['E° pila','K','Significado'],[['muy positivo (&gt; 0,3 V con n = 2)','enorme (&gt; 10¹⁰)','reacción prácticamente completa'],['≈ 0','≈ 1','equilibrio con cantidades parecidas de reactivos y productos'],['negativo','&lt; 1','casi no ocurre en ese sentido']])}
${example('Constantes de equilibrio de dos reacciones','<p>a) Zn(s) + Cu²⁺(ac) ⇌ Zn²⁺(ac) + Cu(s) (E° = 1,10 V). b) Sn²⁺(ac) + 2 Fe³⁺(ac) ⇌ Sn⁴⁺(ac) + 2 Fe²⁺(ac) (E°: Fe³⁺/Fe²⁺ 0,77 V; Sn⁴⁺/Sn²⁺ 0,15 V).</p>',
 step('a) n = 2',chain(R`\log K=\frac{2\cdot1{,}10}{0{,}0592}=37{,}2\ \Rightarrow\ K=1{,}5\times10^{37}`))+
 step('b) E° y n',chain([R`E^\circ=0{,}77-0{,}15=0{,}62\ \mathrm{V}\qquad n=2`,'el Sn²⁺ cede 2 e⁻, que toman 2 Fe³⁺'],R`\log K=\frac{2\cdot0{,}62}{0{,}0592}=20{,}9\ \Rightarrow\ K=8{,}8\times10^{20}`))+A.jus('<p>En el equilibrio la pila tiene E = 0 y Q = K; despejando Nernst queda log K = n·E°/0,0592. Un E° positivo de unas décimas de volt ya da K enormes: reacciones prácticamente completas.</p>'),
 'Ambas K enormes: reacciones prácticamente completas')}
${example('Concentraciones en el equilibrio y verificación con la condición E₁ = E₂','<p>Se mezclan volúmenes iguales para tener [Ag⁺] = [Fe²⁺] = 0,10 M (sin Fe³⁺). Calcular las concentraciones en el equilibrio. E°(Ag⁺/Ag) = 0,80 V · E°(Fe³⁺/Fe²⁺) = 0,77 V.</p>',
 step('1. Reacción, E° y K',rx('Ag^+ + Fe^2+ <=> Ag(s) + Fe^3+','n = 1')+chain(R`E^\circ=0{,}80-0{,}77=0{,}03\ \mathrm{V}`,R`\log K=\frac{1\cdot0{,}03}{0{,}0592}=0{,}507\ \Rightarrow\ K=3{,}2`))+
 step('2. ¿Podemos suponer algo?',sup([['Nada: K ≈ 3 no es ni grande ni chica','reactivos y productos van a quedar en cantidades comparables; no se puede despreciar x.']],'Pensamos antes de suponer'))+
 step('3. Tabla y ecuación',table(['M','Ag⁺','Fe²⁺','Fe³⁺'],[['Inicio','0,10','0,10','0'],['Equilibrio','0,10 − x','0,10 − x','x']])+chain(R`3{,}2=\frac{x}{(0{,}10-x)^2}\ \Rightarrow\ 3{,}2x^2-1{,}64x+0{,}032=0`,[R`x=0{,}0204\ \mathrm{M}`,'la otra raíz (0,49) es mayor que 0,10: absurda']))+
 step('4. Verificamos con la condición de equilibrio',chain(R`E_{\mathrm{Ag}}=0{,}80+0{,}0592\log(0{,}0796)=0{,}735\ \mathrm{V}`,R`E_{\mathrm{Fe}}=0{,}77-0{,}0592\log\frac{0{,}0796}{0{,}0204}=0{,}735\ \mathrm{V}`)+ver('<p>Los dos electrodos tienen el mismo potencial: la pila tiene E = 0, estamos en equilibrio ✔. Es la mejor forma de comprobar un ejercicio de este tipo.</p>')),
 '[Fe³⁺] = 0,020 M · [Ag⁺] = [Fe²⁺] = 0,080 M')}
${idea('Las dos caras de la misma moneda','<p>'+m(R`\Delta G^\circ=-nFE^\circ`)+' y '+m(R`\Delta G^\circ=-RT\ln K`)+' juntas dan '+m(R`\ln K=\frac{nFE^\circ}{RT}`)+', que en log decimal a 25 °C es la fórmula de arriba. Por eso un E° positivo es lo mismo que una K mayor que 1 y que un ΔG° negativo.</p>')}
`);

  add('redox-otro','Redox + precipitación y redox + complejos','REDOX · COMBINADOS',`
<p>Si el ion de un par redox precipita o forma un complejo, su concentración libre baja muchísimo y, por Nernst, <b>el potencial cambia</b>. Se puede calcular un “E° nuevo” para el par con el sólido o el complejo.</p>
${example('E° del electrodo AgCl/Ag','<p>Calcular el E° de AgCl(s) + e⁻ → Ag(s) + Cl⁻(ac), sabiendo que E°(Ag⁺/Ag) = 0,80 V y Kps AgCl = 1,8·10⁻¹⁰.</p>',
 step('1. Nernst del par de la plata',chain(R`E=0{,}80-0{,}0592\log\frac{1}{[\mathrm{Ag^+}]}=0{,}80+0{,}0592\log[\mathrm{Ag^+}]`))+
 step('2. La plata libre la fija el Kps',chain(R`[\mathrm{Ag^+}]=\frac{K_{ps}}{[\mathrm{Cl^-}]}`,R`E=0{,}80+0{,}0592\log K_{ps}-0{,}0592\log[\mathrm{Cl^-}]`))+
 step('3. “Estándar” del nuevo par: [Cl⁻] = 1 M',chain(R`E^\circ(\mathrm{AgCl/Ag})=0{,}80+0{,}0592\log(1{,}8\times10^{-10})=0{,}80-0{,}577=0{,}22\ \mathrm{V}`))+
 ver('<p>El valor tabulado es 0,222 V ✔. Es el electrodo de referencia de plata–cloruro de plata que se usa en los pH-metros.</p>')+A.jus('<p>Al precipitar AgCl, la Ag⁺ libre queda fijada por el Kps (muy chica): por Nernst el potencial del par baja. Por eso la plata en presencia de cloruro es peor oxidante.</p>'),
 'E°(AgCl/Ag) = 0,22 V: la plata es mucho peor oxidante cuando está precipitada')}
${example('E° del complejo amoniacal de plata','<p>Calcular el E° de [Ag(NH₃)₂]⁺(ac) + e⁻ → Ag(s) + 2 NH₃(ac) (Ki = 5,9·10⁻⁸).</p>',
 step('Mismo razonamiento, con el complejo',chain(R`[\mathrm{Ag^+}]=K_i\frac{[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{NH_3}]^2}\ \xrightarrow{\ \text{todo 1 M}\ }\ [\mathrm{Ag^+}]=K_i`,R`E^\circ=0{,}80+0{,}0592\log(5{,}9\times10^{-8})=0{,}37\ \mathrm{V}`))+A.jus('<p>Al complejar la Ag⁺ (forma oxidada), su concentración libre baja muchísimo y, por Nernst, baja el potencial del par.</p>'),
 'E° = 0,37 V (tabulado 0,373 V ✔)')}
${punch('Precipitar o complejar la forma OXIDADA baja el potencial (el par se vuelve peor oxidante). Hacerlo con la forma REDUCIDA lo sube.')}
${idea('Redox + ácido-base','<p>Ya lo viste en la Unidad 4: cuando hay H⁺ en la hemirreacción (MnO₄⁻, Cr₂O₇²⁻, NO₃⁻), el potencial depende del pH. Por eso los oxidantes oxigenados se usan en medio ácido.</p>')}
`);

  // =====================================================================
  add('repaso','Repaso de redox','REDOX · REPASO',`
${cards([
 ['Conceptos','El oxidante… ¿se oxida o se reduce?','Se reduce: gana electrones y su número de oxidación baja.'],
 ['Ion-electrón','¿Con qué se balancea el O en medio ácido?','Con H₂O; después el H con H⁺ y la carga con e⁻.'],
 ['Ion-electrón','¿Qué no puede quedar en la ecuación final en medio básico?','H⁺. Se usan OH⁻ y H₂O.'],
 ['Ion-electrón','Último control antes de entregar','Átomos de cada elemento y carga total iguales a ambos lados.'],
 ['Pilas','¿Dónde ocurre la oxidación?','En el ánodo (negativo en la pila).'],
 ['Pilas','Fórmula 1','E°pila = E°cátodo − E°ánodo (los dos de reducción, de tabla).'],
 ['Pilas','Fórmula 2','ΔG° = −n·F·E°. E° &gt; 0 ⇒ espontánea.'],
 ['ENH','¿Cómo es el electrodo normal de hidrógeno?','Pt platinado, H₂ a 1 atm, H⁺ 1 M, 25 °C; E° = 0 por convención.'],
 ['Tablas','Al multiplicar una hemirreacción por 2, ¿qué pasa con E°?','Nada: E° no se multiplica.'],
 ['Nernst','¿De dónde sale 0,0592?','2,303·RT/F a 25 °C. A otra temperatura cambia.'],
 ['Nernst','Si duplico la ecuación, ¿cambia E?','No: n se duplica pero log Q también.'],
 ['Equilibrio','Condición de equilibrio de una pila','E = 0: los dos electrodos con el mismo potencial; Q = K.'],
 ['Equilibrio','Despeje de K','log K = n·E°/0,0592.']
])}
`);

  window.ET27_QAC5.units.push({id:'redox',n:5,title:'Equilibrio redox',short:'Redox',lead:'Reacciones redox, método del ion-electrón en medio ácido y básico paso a paso, oxidantes y reductores, pilas con sus dos fórmulas, potenciales y electrodo de hidrógeno, Nernst (y el n del denominador) y la relación con la constante de equilibrio.',sections:s});
})();
