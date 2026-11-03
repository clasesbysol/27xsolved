// 27xSOLved · Química Inorgánica 4.º · TEORÍA · Unidad 5: Polaridad y fuerzas intermoleculares
// (tema 5 del programa: «las relaciones entre las moléculas»). Teoría: TREPEV en moléculas e iones, polaridad,
// fuerzas intermoleculares, propiedades y tipos de sólidos (lo necesario para la Guía 5). Ejercitación F1–F12
// tomada de una guía resuelta por un alumno y revisada (errores marcados con ✎). La Guía 5 está en quimica-inorganica-4-guia5.js.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {idea,warn,fix,note,step,table}=K;
  const {rx}=Q;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qi-fi-${k}`,label:l,kicker:`FUERZAS INTERMOLECULARES · ${kk}`,html:h});
  const ver=(id,label)=>`<p class="guideLink">🔗 Repaso previo: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;

  // ---------- Esquemas ----------
  const arrowDefs=id=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>`;
  const at=(x,y,t,c='svgSoft')=>`<circle cx="${x}" cy="${y}" r="16" class="svgLineFill ${c}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="svgText strong">${t}</text>`;
  const ln=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="svgLine thickLine"/>`;
  const vec=(x1,y1,x2,y2,id)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="svgArrow" marker-end="url(#${id})"/>`;
  const svgDipolos=`<svg viewBox="0 0 660 230" role="img" aria-label="En el CO2 lineal los dos dipolos se anulan; en el agua angular se suman y queda un momento dipolar">
    ${arrowDefs('qiFiA')}
    ${ln(60,90,260,90)}${at(60,90,'O')}${at(160,90,'C','svgSection')}${at(260,90,'O')}
    ${vec(150,62,78,62,'qiFiA')}${vec(170,62,242,62,'qiFiA')}
    <text x="160" y="140" text-anchor="middle" class="svgText strong">CO₂ · lineal</text>
    <text x="160" y="162" text-anchor="middle" class="svgText qiSmall">dipolos iguales y opuestos</text>
    <text x="160" y="182" text-anchor="middle" class="svgText strong">μ = 0 → apolar</text>
    ${ln(500,70,440,140)}${ln(500,70,560,140)}${at(440,140,'H')}${at(560,140,'H')}${at(500,70,'O','svgSection')}
    <text x="500" y="38" text-anchor="middle" class="svgText strong">·· ··</text>
    ${vec(452,112,488,74,'qiFiA')}${vec(548,112,512,74,'qiFiA')}
    ${vec(500,200,500,110,'qiFiA')}
    <text x="520" y="190" class="svgText qiSmall">μ total</text>
    <text x="500" y="222" text-anchor="middle" class="svgText strong">H₂O · angular → μ ≠ 0 → polar</text>
  </svg>`;
  const svgPuente=`<svg viewBox="0 0 460 250" role="img" aria-label="Puente de hidrógeno entre dos moléculas de agua: el H de una se acerca al par libre del O de la otra">
    ${ln(90,90,40,150)}${ln(90,90,170,90)}${at(40,150,'H')}${at(170,90,'H')}${at(90,90,'O','svgSection')}
    <text x="90" y="56" text-anchor="middle" class="svgText strong">δ⁻</text><text x="170" y="60" text-anchor="middle" class="svgText strong">δ⁺</text>
    <line x1="188" y1="90" x2="292" y2="90" class="svgLine" stroke-dasharray="7 7"/>
    <text x="300" y="70" text-anchor="middle" class="svgText strong">··</text>
    ${ln(320,90,400,40)}${ln(320,90,400,140)}${at(400,40,'H')}${at(400,140,'H')}${at(320,90,'O','svgSection')}
    <text x="320" y="132" text-anchor="middle" class="svgText strong">δ⁻</text>
    <text x="240" y="122" text-anchor="middle" class="svgText strong">puente de H</text>
    <text x="230" y="200" text-anchor="middle" class="svgText">dador: H unido a F, O o N</text>
    <text x="230" y="226" text-anchor="middle" class="svgText">aceptor: par libre de F, O o N</text>
  </svg>`;

  add('teoria','Geometría molecular: TREPEV paso a paso','01',`
<p>La forma de una molécula decide si es polar, y la polaridad decide qué fuerzas hay entre las moléculas. Por eso esta unidad arranca por la geometría. ${ver('uniones:qi-un-trepev','TREPEV e hibridación (Uniones químicas)')}</p>
<h3>La idea</h3>
<p>Alrededor del átomo central hay <b>dominios electrónicos</b>: cada enlace (simple, doble o triple cuenta como <b>uno</b>) y cada <b>par libre</b>. Los dominios se repelen y se ubican lo más lejos posible. <span class="simple">(como globos atados por el nudo: se acomodan solos lo más separados que pueden)</span></p>
<h3>Receta en 5 pasos (sirve para moléculas e iones)</h3>
<ol class="kitList">
 <li><b>Átomo central</b>: el menos electronegativo y que forma más uniones (nunca H; el O es central sólo si los otros son H o halógenos más grandes, como en H₂O, Cl₂O, I₂O).</li>
 <li><b>Electrones de valencia</b>: sumar los de todos los átomos. En un <b>anión</b> se suma 1 e⁻ por cada carga negativa; en un <b>catión</b> se resta 1 e⁻ por cada carga positiva.</li>
 <li><b>Lewis</b>: unir los átomos al central, completar octetos de los externos y poner los pares que sobran en el central.</li>
 <li><b>Contar dominios del central</b> y escribir la notación <b>AXₘEₙ</b>: A = central, X = átomos unidos, E = pares libres.</li>
 <li>Leer la geometría en la tabla. La <b>electrónica</b> mira todos los dominios; la <b>molecular</b> sólo dónde están los átomos.</li>
</ol>
${table(['Dominios','AXₘEₙ','Geometría electrónica','Geometría molecular','Ángulo','Ejemplos'],[
 ['2','AX₂','lineal','<b>lineal</b>','180°','BeCl₂, CO₂, CS₂, HCN'],
 ['3','AX₃','trigonal plana','<b>trigonal plana</b>','120°','BF₃, BCl₃, SO₃, CO₃²⁻, NO₃⁻, H₂CO'],
 ['3','AX₂E','trigonal plana','<b>angular</b>','&lt; 120° (≈ 119°)','SO₂, TeO₂, O₃'],
 ['4','AX₄','tetraédrica','<b>tetraédrica</b>','109,5°','CH₄, CBr₄, NH₄⁺, SO₄²⁻, PO₄³⁻, BrO₄⁻'],
 ['4','AX₃E','tetraédrica','<b>piramidal</b>','&lt; 109,5° (≈ 107°)','NH₃, PH₃, H₃O⁺, SO₃²⁻, IO₃⁻'],
 ['4','AX₂E₂','tetraédrica','<b>angular</b>','&lt; 109,5° (≈ 104,5°)','H₂O, H₂S, H₂Se, ClO₂⁻, Cl₂O']
])}
${idea('Por qué el ángulo se achica','<p>Un <b>par libre</b> está más “gordo” que un par de enlace (lo atrae un solo núcleo) y empuja a los enlaces. Por eso: CH₄ 109,5° → NH₃ 107° (1 par libre) → H₂O 104,5° (2 pares libres). Con 3 dominios pasa lo mismo: BF₃ 120° → SO₂ ≈ 119°.</p>')}
<h3>Átomos centrales que superan el octeto</h3>
<p>S, Se, Te, P, Cl, Br e I (período 3 en adelante) pueden tener más de 4 pares de enlace alrededor, como en los oxoaniones. <b>No importa</b> cómo se dibujen los dobles enlaces o las uniones coordinadas: para TREPEV cada átomo unido es <b>un</b> dominio. Lo único que hay que contar bien son los <b>pares libres del central</b>.</p>
${idea('Atajo para oxoaniones y óxidos','<p>Pares libres del central = (e⁻ de valencia del central + carga negativa − número de uniones que hace con los O contadas como “2 e⁻ por O”) ÷ 2.<br>Ejemplos: SO₄²⁻ → (6 + 2 − 8) ÷ 2 = 0 → AX₄. SO₃²⁻ → (6 + 2 − 6) ÷ 2 = 1 → AX₃E. IO₃⁻ → (7 + 1 − 6) ÷ 2 = 1 → AX₃E. ClO₂⁻ → (7 + 1 − 4) ÷ 2 = 2 → AX₂E₂. SO₂ → (6 − 4) ÷ 2 = 1 → AX₂E.</p>')}
${table(['Especie','Pares libres del central','AXₘEₙ','Geometría molecular','Ángulo'],[
 ['NH₄⁺','0 (8 e⁻ = 4 enlaces N–H)','AX₄','tetraédrica','109,5°'],
 ['H₃O⁺','1 (8 e⁻ = 3 enlaces O–H + 1 par)','AX₃E','piramidal','≈ 107°'],
 ['CO₃²⁻ · NO₃⁻','0','AX₃','trigonal plana','120°'],
 ['SO₃²⁻ · IO₃⁻ · SeO₃²⁻','1','AX₃E','piramidal','≈ 107°'],
 ['SO₄²⁻ · PO₄³⁻ · BrO₄⁻','0','AX₄','tetraédrica','109,5°'],
 ['ClO₂⁻','2','AX₂E₂','angular','≈ 105° (&lt; 109,5°)']
])}
${warn('Errores típicos','<ul><li>Olvidar la carga del ion al contar electrones.</li><li>Contar un doble enlace como dos dominios: es <b>uno</b>.</li><li>Decir “tetraédrica” para el NH₃: la <b>electrónica</b> es tetraédrica; la <b>molecular</b> es piramidal.</li></ul>')}
`);

  add('polaridad','Polaridad de las moléculas','02',`
${ver('uniones:qi-un-polaridad','Polaridad de enlace (Uniones químicas)')}
<h3>Del enlace a la molécula</h3>
<p>Un enlace entre átomos de distinta electronegatividad es <b>polar</b>: la nube se corre hacia el más electronegativo (δ⁻) y deja al otro con δ⁺. Cada enlace polar es una flechita (vector) que apunta al átomo más electronegativo.</p>
<p>La <b>polaridad de la molécula</b> sale de <b>sumar esas flechas</b> teniendo en cuenta la geometría. El resultado es el <b>momento dipolar total</b> μ<sub>t</sub>, que se mide en <b>debye (D)</b>.</p>
<figure class="kitFigure">${svgDipolos}<figcaption>Mismos enlaces polares, distinta forma: en el CO₂ se anulan, en el H₂O se suman.</figcaption></figure>
${table(['Situación','Resultado','Ejemplos'],[
 ['Enlaces apolares (átomos iguales o ΔEN ≈ 0)','molécula <b>apolar</b>','O₂, Cl₂, F₂'],
 ['Enlaces polares <b>iguales</b> y geometría <b>simétrica</b> (lineal AX₂, trigonal plana AX₃, tetraédrica AX₄) <b>sin pares libres en el central</b>','se anulan → <b>apolar</b> (μ = 0)','CO₂, CS₂, BeCl₂, BF₃, BCl₃, SO₃, CH₄, CCl₄, CBr₄'],
 ['Hay <b>pares libres</b> en el central (angular, piramidal)','no se anulan → <b>polar</b>','H₂O, NH₃, SO₂, PF₃, H₂S'],
 ['Geometría simétrica pero con <b>átomos distintos</b> alrededor','no se anulan → <b>polar</b>','CH₃Cl, CH₃F, H₂CO, HCN']
])}
${idea('PF₃ y BF₃: el par libre hace la diferencia','<p>Los dos tienen tres enlaces polares X–F. El BF₃ es trigonal plano (AX₃): las tres flechas a 120° se anulan y μ<sub>t</sub> = 0 D. El PF₃ tiene un par libre (AX₃E) y es piramidal: las flechas apuntan “hacia abajo” y no se anulan, μ<sub>t</sub> = 0,55 D.</p>')}
${warn('Polar no es lo mismo que iónico','<p>“Polar” habla de moléculas con cargas <b>parciales</b> (δ). En un compuesto iónico hay cargas <b>enteras</b> (Na⁺, Cl⁻) y no hay moléculas.</p>')}
`);

  add('fuerzas','Fuerzas intermoleculares','03',`
<p>Las uniones químicas (iónica, covalente, metálica) actúan <b>dentro</b> de una sustancia y mantienen unidos a los átomos. Las <b>fuerzas intermoleculares</b> actúan <b>entre moléculas</b> y son mucho más débiles. <span class="simple">(romper una molécula de agua cuesta muchísimo; separar dos moléculas de agua, al hervirla, cuesta mucho menos)</span></p>
<h3>1. Fuerzas de London (dispersión)</h3>
<p>Los electrones se mueven: en un instante la nube queda corrida y aparece un <b>dipolo instantáneo</b>, que <b>induce</b> otro en la molécula vecina y se atraen. Existen en <b>todas</b> las moléculas (polares y apolares) y son las <b>únicas</b> en las apolares (O₂, CH₄, CO₂, I₂).</p>
<p>Son más intensas cuanto más grande es la molécula (más electrones), porque la nube es más fácil de deformar: más <b>polarizable</b>. Por eso, en los halógenos: F₂ (gas) &lt; Cl₂ (gas) &lt; Br₂ (líquido) &lt; I₂ (sólido).</p>
<h3>2. Dipolo – dipolo</h3>
<p>Entre moléculas <b>polares</b>: el extremo δ⁺ de una atrae al δ⁻ de la otra. Se suman a las de London. Ejemplos: HCl, SO₂, Cl₂O, CH₃Cl, H₂S.</p>
<h3>3. Puente de hidrógeno</h3>
<p>Es un dipolo–dipolo especialmente fuerte. Aparece cuando un <b>H está unido a F, O o N</b> (átomos chicos y muy electronegativos): ese H queda casi “desnudo” (δ⁺ grande) y se acerca a un <b>par libre de F, O o N</b> de otra molécula.</p>
<figure class="kitFigure">${svgPuente}<figcaption>Puente de hidrógeno O–H ··· O entre dos moléculas de agua: es una atracción entre moléculas, no un enlace.</figcaption></figure>
${table(['¿Tiene puente de H?','Por qué','Ejemplos'],[
 ['<b>Sí</b>','H unido a F, O o N','H₂O, HF, NH₃, HNO₃, CH₃OH'],
 ['No','el H está unido a C, S, P, As, B o Cl (no son F, O, N)','CH₄, H₂S, PH₃, AsH₃, BH₃, HCl'],
 ['No (aunque tenga O)','tiene O pero ningún H unido a él','H₂CO, Cl₂O, SO₂']
])}
<h3>4. Ion – dipolo</h3>
<p>Entre un ion y moléculas polares. Es la que explica que una sal se disuelva en agua: las moléculas de agua rodean a los iones (los <b>hidratan</b>) con el O hacia el catión y los H hacia el anión.</p>
${idea('Cómo decidir qué fuerzas tiene una sustancia','<ol class="kitList"><li><b>London</b>: siempre.</li><li>¿La molécula es <b>polar</b>? → además <b>dipolo–dipolo</b>.</li><li>¿Tiene <b>H unido a F, O o N</b>? → además <b>puente de hidrógeno</b>.</li></ol>')}
${table(['Fuerza','Entre…','Intensidad relativa'],[
 ['London','todas las moléculas','débil (crece con el tamaño)'],
 ['Dipolo–dipolo','moléculas polares','intermedia'],
 ['Puente de hidrógeno','H–F, H–O, H–N con F, O, N','la más fuerte de las intermoleculares'],
 ['Ion–dipolo','ion y molécula polar','fuerte (disolución de sales)']
])}
`);

  add('propiedades','Ebullición, estado y solubilidad','04',`
<h3>Punto de ebullición y estado a temperatura ambiente</h3>
<p>Para hervir hay que <b>separar</b> las moléculas: cuanto más fuertes las fuerzas entre ellas, más alto el punto de ebullición. Si ya a temperatura ambiente están separadas, la sustancia es un <b>gas</b>.</p>
${idea('Método para ordenar puntos de ebullición','<ol class="kitList"><li>Identificar el tipo de partícula: <b>red iónica, red covalente o metal</b> → punto de ebullición muy alto (hay que romper uniones químicas).</li><li>Entre moléculas: puente de H &gt; dipolo–dipolo &gt; sólo London.</li><li>Con el mismo tipo de fuerza: gana la molécula <b>más grande</b> (más London).</li></ol>')}
${table(['Comparación','Qué decide','Resultado'],[
 ['H₂O y H₂S','el agua tiene puentes de H; el H₂S no','H₂O líquida (PE 100 °C) · H₂S gas (PE ≈ −60 °C)'],
 ['F₂, Cl₂ y MgF₂','London crece con el tamaño; MgF₂ es iónico','F₂ (−188 °C) &lt; Cl₂ (−34 °C) &lt; MgF₂ (≈ 2260 °C)'],
 ['CH₄ y CBr₄','ambas apolares; CBr₄ mucho más grande','CH₄ gas · CBr₄ sólido']
])}
<h3>Solubilidad: “lo semejante disuelve a lo semejante”</h3>
<p>Una sustancia se disuelve bien cuando las atracciones nuevas soluto–solvente son parecidas a las que tenía cada uno por separado.</p>
${table(['Soluto','Se disuelve en…','Por qué'],[
 ['Polar o con puentes de H (NH₃, HCl, H₂CO, SO₂)','<b>agua</b> (polar)','dipolo–dipolo y puentes de H con el agua'],
 ['Iónico (NaCl, KCl)','<b>agua</b>','ion–dipolo: el agua hidrata los iones'],
 ['Apolar (I₂, Br₂, CH₄, CS₂, CBr₄)','<b>CCl₄</b>, benceno, CHCl₃ (poco polares)','London con London; en agua tendría que romper sus puentes de H sin ganar nada a cambio']
])}
${warn('Ojo: “disolverse” no es “reaccionar”','<p>Algunas sustancias no se disuelven sino que <b>reaccionan</b> con el agua (BF₃, BCl₃, BeCl₂, SO₃, Na₂O). El criterio de polaridad sirve para disolución física.</p>')}
`);

  add('solidos','Tipos de sólidos','05',`
<p>Con las uniones y las fuerzas se explican las propiedades de cualquier sólido. Primero hay que identificar <b>qué partículas</b> forman el sólido y <b>qué las mantiene juntas</b>.</p>
${table(['Tipo de sólido','Partículas','Qué las une','Punto de fusión','¿Conduce?','Ejemplos'],[
 ['<b>Molecular</b>','moléculas','fuerzas intermoleculares (London, dipolo–dipolo, puente de H)','bajo','no','I₂, hielo, CO₂ sólido, CH₄'],
 ['<b>Iónico</b>','cationes y aniones','atracción iónica (red)','alto','sólo <b>fundido o disuelto</b> (no sólido)','KCl, NaCl, MgF₂'],
 ['<b>Metálico</b>','cationes en un mar de electrones','unión metálica','variable, en general alto','<b>sí, en estado sólido</b> (calor y electricidad)','Cu, Fe, Ag'],
 ['<b>Covalente de red</b>','átomos unidos por covalentes en toda la red','enlaces covalentes','muy alto','no… salvo el <b>grafito</b>','diamante, SiO₂, grafito']
])}
${idea('El caso del grafito','<p>Es un no metal (carbono) formado por una <b>red covalente</b> de láminas. Cada C usa 3 electrones en enlaces y le queda 1 electrón <b>deslocalizado</b> a lo largo de la lámina: por eso conduce la corriente, cosa rara en un no metal.</p>')}
`);

  add('ejercitacion','Ejercitación resuelta','06',`
<p>Doce ejercicios sobre polaridad de enlaces y moléculas, fuerzas intermoleculares y propiedades físicas. Para las diferencias de electronegatividad se usa la escala de Pauling: H 2,20 · C 2,55 · N 3,04 · O 3,44 · F 3,98 · Na 0,93 · P 2,19 · S 2,58 · Cl 3,16 · As 2,18 · Br 2,96 · Sb 2,05 · I 2,66.</p>
${idea('La receta para casi todos','<ol><li>¿Qué partículas hay? (iones, moléculas, átomos de metal, red covalente).</li><li>Si son moléculas: ¿son polares? (enlaces polares <b>y</b> geometría que no los cancele).</li><li>¿Qué fuerzas actúan? London siempre; dipolo–dipolo si es polar; puente de hidrógeno si hay H unido a F, O o N.</li><li>Con eso se comparan puntos de ebullición y solubilidad.</li></ol>')}
<div data-qi-guide></div>
`);

  const ex=[
   {n:'F1',title:'Clasificación de enlaces',statement:'Clasificá cada enlace como covalente no polar, covalente polar o iónico, justificando: a) H–C · b) Cl–Cl · c) O–H · d) Na–Cl.',
    solution:table(['Enlace','ΔEN','Tipo','Por qué'],[
     ['H–C','2,55 − 2,20 = 0,35','covalente <b>prácticamente no polar</b>','dos no metales con electronegatividades muy parecidas'],
     ['Cl–Cl','0','covalente <b>no polar</b>','átomos idénticos: comparten el par por igual'],
     ['O–H','3,44 − 2,20 = 1,24','covalente <b>polar</b>','el O atrae el par: δ− en O y δ+ en H; no hay transferencia completa'],
     ['Na–Cl','3,16 − 0,93 = 2,23','<b>iónico</b>','metal + no metal con ΔEN grande: el Na cede su electrón al Cl (red de Na⁺ y Cl⁻)']]),
    answer:'H–C no polar (en la práctica) · Cl–Cl no polar · O–H polar · Na–Cl iónico'},
   {n:'F2',title:'Ordenar por polaridad de enlace',statement:'Ordená de menor a mayor polaridad y explicá: a) C–C, C–I, C–Cl, C–F · b) N–N, N–O, N–F · c) N–F, P–F, As–F, Sb–F.',
    solution:step('a) Con el C fijo, cambia el halógeno',table(['Enlace','ΔEN'],[['C–C','0'],['C–I','0,11'],['C–Cl','0,61'],['C–F','1,43']])+'<p>Subiendo en el grupo 17 el halógeno es más electronegativo: el F es el que más “tira” del par.</p>')+
     step('b) Con el N fijo, avanza el período',table(['Enlace','ΔEN'],[['N–N','0'],['N–O','0,40'],['N–F','0,94']]))+
     step('c) Con el F fijo, baja el grupo 15',table(['Enlace','ΔEN'],[['N–F','0,94'],['P–F','1,79'],['As–F','1,80'],['Sb–F','1,93']])+'<p>Bajando en el grupo el elemento es menos electronegativo, así que la diferencia con el F crece. P–F y As–F son casi iguales.</p>')+
     fix('Lo que circulaba','<p>Agregaba que “el mayor tamaño reduce el solapamiento y favorece el carácter polar”. La polaridad del enlace la decide la <b>diferencia de electronegatividad</b>; un peor solapamiento hace al enlace más <b>débil</b>, no más polar.</p>'),
    answer:'a) C–C < C–I < C–Cl < C–F · b) N–N < N–O < N–F · c) N–F < P–F ≈ As–F < Sb–F'},
   {n:'F3',title:'Lewis, geometría y polaridad de moléculas',statement:'Para cada sustancia, dibujá la estructura de Lewis, predecí la geometría (TREPEV) e indicá si la molécula es polar: I) CH₄ · II) CO₂ · III) H₂CO₃ · IV) NH₃ · V) BF₃ · VI) SO₂ · VII) OF₂ · VIII) H₂SO₄.',
    solution:table(['Molécula','Lewis (resumen)','Dominios del central','Geometría molecular','¿Polar?'],[
     ['CH₄','C con 4 enlaces C–H, sin pares libres','4','tetraédrica','no: los 4 dipolos se cancelan'],
     ['CO₂','O=C=O','2','lineal','no: dos dipolos opuestos'],
     ['H₂CO₃','C con un =O y dos –OH','3 (en el C)','trigonal plana en el C','sí: grupos distintos, no se cancelan'],
     ['NH₃','N con 3 enlaces N–H y 1 par libre','4','piramidal','sí'],
     ['BF₃','B con 3 enlaces B–F (6 e⁻ en el B)','3','trigonal plana','no: simetría perfecta'],
     ['SO₂','S con dos enlaces S–O (resonancia) y 1 par libre','3','angular','sí'],
     ['OF₂','O con 2 enlaces O–F y 2 pares libres','4','angular','sí'],
     ['H₂SO₄','S unido a 2 O y a 2 grupos –OH','4','tetraédrica alrededor del S','sí']])+
     idea('La clave','<p>Enlaces polares no alcanzan: la molécula es apolar si la <b>geometría es simétrica</b> y los dipolos se anulan (CO₂, BF₃, CH₄). Un par libre en el central casi siempre rompe la simetría (NH₃, SO₂, OF₂).</p>')+
     note('Sobre el H₂SO₄','<p>Con la regla del octeto se dibuja con cuatro enlaces simples S–O (y cargas formales +2 en el S y −1 en los dos O sin H); muchos libros lo dibujan con dos S=O para minimizar cargas formales (octeto expandido). En los dos casos son 4 dominios: tetraédrica.</p>'),
    answer:'Apolares: CH₄, CO₂, BF₃ · Polares: H₂CO₃, NH₃, SO₂, OF₂, H₂SO₄'},
   {n:'F4',title:'Momentos dipolares: explicar',statement:'Explicá cualitativamente: a) el CHCl₃ tiene μ ≠ 0; b) el PF₃ es polar; c) el CCl₄ tiene μ = 0; d) μ(NF₃) < μ(NH₃).',
    solution:step('a) CHCl₃','<p>Es tetraédrico pero con <b>sustituyentes distintos</b> (un H y tres Cl): los dipolos C–Cl no se compensan con el C–H. Queda un momento neto hacia los Cl.</p>')+
     step('b) PF₃','<p>Como el NH₃: 3 enlaces y 1 par libre → <b>piramidal</b>. Los dipolos P–F (hacia los F) no se cancelan → μ ≠ 0.</p>')+
     step('c) CCl₄','<p>Cada C–Cl es polar, pero son cuatro <b>iguales</b> en una geometría tetraédrica perfecta: la suma vectorial da cero.</p>')+
     step('d) NF₃ vs NH₃','<p>Las dos son piramidales con un par libre en el N, que aporta un dipolo hacia “arriba”.</p><ul><li><b>NH₃:</b> el N es más electronegativo que el H, así que los dipolos N–H también apuntan hacia el N: <b>se suman</b> con el del par libre → μ grande.</li><li><b>NF₃:</b> el F es más electronegativo que el N, así que los dipolos N–F apuntan hacia los F, <b>en contra</b> del par libre: se restan → μ chico.</li></ul>')+
     fix('Lo que circulaba','<p>La explicación de d) hablaba de “la orientación de la nube electrónica” sin decir hacia dónde apunta cada dipolo. Lo que decide es eso: en NH₃ suman y en NF₃ se oponen.</p>'),
    answer:'a) sustituyentes distintos · b) piramidal · c) tetraédrica simétrica · d) en NH₃ los dipolos de enlace se suman al del par libre; en NF₃ se oponen'},
   {n:'F5',title:'Fuerzas intermoleculares principales',statement:'Indicá las fuerzas intermoleculares principales en: O₂, BeCl₂, H₂O, HOCl, HCl, HNO₃, CHCl₃, PH₃, SO₃ y NO₂/N₂O₄.',
    solution:table(['Sustancia','¿Polar?','Fuerzas','Comentario'],[
     ['O₂','no','London','diatómica homonuclear'],
     ['BeCl₂','no (lineal)','London','en estado gaseoso; el sólido forma cadenas con uniones Be–Cl–Be'],
     ['H₂O','sí','<b>puente de H</b> + dipolo–dipolo + London','red extensa de puentes de H: punto de ebullición anómalo'],
     ['HOCl','sí','<b>puente de H</b> (tiene O–H) + dipolo–dipolo + London',''],
     ['HCl','sí','dipolo–dipolo + London','no hay puente de H: el H está unido a Cl'],
     ['HNO₃','sí','<b>puente de H</b> + dipolo–dipolo + London',''],
     ['CHCl₃','sí','dipolo–dipolo + London','el H unido a C no forma puente de H'],
     ['PH₃','apenas (ΔEN ≈ 0)','London (dipolo–dipolo muy débil)',''],
     ['SO₃','no (trigonal plana)','London',''],
     ['NO₂ / N₂O₄','NO₂ sí (angular) · N₂O₄ no (plano, simétrico)','NO₂: dipolo–dipolo + London · N₂O₄: London','2 NO₂ ⇌ N₂O₄']])+
     fix('Lo que circulaba','<p>Decía que en el HOCl el puente de H es “débil, menos extenso que en el agua”: tiene un solo O–H, así que forma menos puentes por molécula, pero el puente de H existe y es la fuerza dominante. Del SO₃ decía “London o dipolo según sea asimétrica”: la molécula es <b>trigonal plana y apolar</b> → London.</p>'),
    answer:'Puente de H: H₂O, HOCl, HNO₃ · Dipolo–dipolo: HCl, CHCl₃, NO₂ · Sólo London: O₂, BeCl₂ (g), PH₃ (prácticamente), SO₃, N₂O₄'},
   {n:'F6',title:'¿Qué pares tienen mayor afinidad?',statement:'Indicá qué pares de sustancias presentan mayor afinidad entre sí (es decir, cuáles se mezclarían o disolverían mejor), justificando con las fuerzas intermoleculares: a) H₂O₂ y H₂SO₄ · b) H₂O₂ y H₂S · c) H₂O₂ y HBr · d) H₂SO₄ y HBr · e) CH₄ y CCl₄ · f) CCl₄ y CCl₄.',
    solution:step('Criterio','<p>“Lo semejante disuelve a lo semejante”: hay afinidad cuando las dos sustancias tienen el <b>mismo tipo de fuerzas</b>.</p>')+
     table(['Par','Fuerzas de cada una','Afinidad'],[
      ['a) H₂O₂ – H₂SO₄','puente de H / puente de H','<b>alta</b>: se forman puentes de H entre ellas'],
      ['b) H₂O₂ – H₂S','puente de H / dipolo débil + London','baja: el H₂S no forma puentes de H'],
      ['c) H₂O₂ – HBr','puente de H / dipolo–dipolo','intermedia: ambas polares'],
      ['d) H₂SO₄ – HBr','puente de H / dipolo–dipolo','intermedia: ambas polares'],
      ['e) CH₄ – CCl₄','London / London','<b>alta</b>: ambas apolares'],
      ['f) CCl₄ – CCl₄','London / London','<b>total</b>: es la misma sustancia']])+
     fix('Lo que circulaba','<p>Concluía que los pares apolares (CH₄–CCl₄, CCl₄–CCl₄) tienen “afinidad menor”. Es al revés: <b>afinidad no es fuerza absoluta</b>, es parecido entre las fuerzas. Dos apolares se mezclan perfectamente, igual que dos sustancias con puente de H.</p>'),
    answer:'Mayor afinidad: a (puente de H con puente de H), e y f (apolar con apolar). Menor: b.'},
   {n:'F7',title:'Partículas, puntos de ebullición y solubilidad',statement:'Para Na₂O, N₂, Al, CF₄ y H₂O₂: a) indicá qué partículas forman cada sustancia y qué interacciones hay entre ellas; b) ordenalas por punto de ebullición creciente; c) ordenalas por solubilidad en agua.',
    solution:step('a) Partículas e interacciones',table(['Sustancia','Partículas','Interacción'],[['Na₂O','iones Na⁺ y O²⁻ (red iónica)','atracción electrostática'],['N₂','moléculas apolares','London'],['Al','cationes en un mar de electrones','enlace metálico'],['CF₄','moléculas apolares (tetraédricas)','London'],['H₂O₂','moléculas polares con O–H','puente de H + dipolo–dipolo + London']]))+
     step('b) Punto de ebullición','<p><b>N₂ (−196 °C) &lt; CF₄ (−128 °C) &lt; H₂O₂ (150 °C) &lt; Na₂O &lt; Al (≈ 2500 °C)</b>. Moleculares apolares abajo (el CF₄, con más electrones, tiene London más intensas que el N₂); después la molecular con puente de H; arriba las redes iónica y metálica.</p>')+
     step('c) Solubilidad en agua','<p><b>H₂O₂ ≈ Na₂O &gt; N₂ ≈ CF₄ &gt; Al</b>. El H₂O₂ es miscible (puentes de H con el agua). El Na₂O no se disuelve “tal cual”: <b>reacciona</b> y da NaOH, muy soluble. N₂ y CF₄, apolares, casi no se disuelven. El Al es insoluble.</p>'+rx('Na2O(s) + H2O(l) -> 2 NaOH(ac)')),
    answer:'b) N₂ < CF₄ < H₂O₂ < Na₂O < Al · c) H₂O₂ ≈ Na₂O (reacciona) > N₂ ≈ CF₄ > Al'},
   {n:'F8',title:'Dos hechos experimentales',statement:'Justificá: a) el iodo es menos soluble en agua que en cloroformo (CHCl₃); b) el sulfuro de hidrógeno es gaseoso a temperatura ambiente y el agua es líquida.',
    solution:step('a) Iodo','<p>El I₂ es <b>apolar</b>: sólo tiene fuerzas de London. El agua está unida por puentes de H que el I₂ no puede reemplazar, así que casi no se disuelve. El cloroformo es muy poco polar y sus moléculas interactúan con el I₂ por London: lo disuelve bien (de color violeta, como se vio en el TP 6).</p>')+
     step('b) H₂S vs. H₂O','<p>Las dos son angulares y parecidas, pero el agua forma <b>puentes de hidrógeno</b> (O muy electronegativo y chico). El S es menos electronegativo y más grande: el H₂S sólo tiene dipolo–dipolo débil y London. Hace falta mucha más energía para separar las moléculas de agua: 100 °C contra −60 °C.</p>')+
     note('Puente con el TP 6','<p>Tubos 1 y 2 del iodo: en agua casi no se disuelve, en cloroformo da violeta.</p>'),
    answer:'a) I₂ apolar: se disuelve en un solvente poco polar · b) el agua tiene puentes de H y el H₂S no'},
   {n:'F9',title:'Propiedades físicas de CH₄, Cl₂, CCl₄ y KCl',statement:'Con los datos de la tabla, justificá las diferencias de densidad, punto de fusión y punto de ebullición.'+table(['Sustancia','Densidad a 20 °C y 1 atm (g/cm³)','PF (°C)','PE (°C)'],[['Metano (CH₄)','6,66·10⁻⁴','−182,6','−161,4'],['Cloro (Cl₂)','2,90·10⁻³','−101,6','−34,6'],['Tetracloruro de carbono (CCl₄)','1,595','−22,6','76,8'],['Cloruro de potasio (KCl)','1,988','790','1500']]),
    solution:table(['Sustancia','Partículas y fuerzas','Por qué esos valores'],[
     ['CH₄','moléculas apolares, livianas (16 g/mol) → London muy débiles','los PF y PE más bajos; a 20 °C es gas (densidad bajísima)'],
     ['Cl₂','apolar, pero con más electrones (71 g/mol) → London más intensas','PE mayor que el CH₄; a 20 °C sigue siendo gas'],
     ['CCl₄','apolar, muy pesada (154 g/mol) y con muchos electrones → London intensas','a 20 °C es líquido: densidad de líquido y PE de 76,8 °C'],
     ['KCl','<b>iónico</b>: red de K⁺ y Cl⁻','fuerzas electrostáticas muy fuertes: PF 790 °C, PE 1500 °C']])+
     idea('Ojo con las densidades','<p>Las del CH₄ y el Cl₂ son tan chicas porque a 20 °C son <b>gases</b>. La densidad grande del CCl₄ y del KCl corresponde a un líquido y a un sólido.</p>'),
    answer:'CH₄ < Cl₂ < CCl₄ (London crecientes con el tamaño) < KCl (red iónica)'},
   {n:'F10',title:'Ordenar por punto de ebullición',statement:'Ordená en forma creciente de punto de ebullición, justificando: argón (Ar), sulfuro de hidrógeno (H₂S), ácido sulfúrico (H₂SO₄) y sulfuro de potasio (K₂S).',
    solution:table(['Sustancia','Partículas y fuerzas'],[
     ['Ar','átomos aislados: sólo London débiles (PE ≈ −186 °C)'],
     ['H₂S','molécula polar: dipolo–dipolo + London, sin puente de H (PE ≈ −60 °C)'],
     ['H₂SO₄','molécula muy polar con dos O–H: <b>puentes de H</b> extensos (PE ≈ 337 °C)'],
     ['K₂S','<b>sal iónica</b>: red de K⁺ y S²⁻']])+
     '<p>De menos a más “pegadas” las partículas: London &lt; dipolo–dipolo &lt; puente de H &lt; red iónica.</p>',
    answer:'Ar < H₂S < H₂SO₄ < K₂S'},
   {n:'F11',title:'¿Quién es cada sólido?',statement:'Cuatro sólidos A, B, C y D tienen estas propiedades: A conduce la electricidad fundido; B al calentarlo sublima con vapores violetas; C conduce la electricidad en estado sólido; D funde a 1713 °C. Asigná a cada uno: I) iodo · II) cloruro de magnesio (MgCl₂) · III) dióxido de silicio (SiO₂) · IV) plata (Ag).',
    solution:table(['Sólido','Sustancia','Tipo de sólido','Por qué'],[
     ['A','MgCl₂','iónico','en el sólido los iones están fijos; fundido se mueven y conduce'],
     ['B','I₂','molecular','las moléculas se unen sólo por London: sublima con vapor violeta'],
     ['C','Ag','metálico','el mar de electrones conduce en el sólido'],
     ['D','SiO₂','red covalente','hay que romper enlaces covalentes Si–O en toda la red: PF altísimo']]),
    answer:'A → MgCl₂ · B → I₂ · C → Ag · D → SiO₂'},
   {n:'F12',title:'Elegir el solvente',statement:'Hay que preparar soluciones de: a) cobre · b) óxido de sodio · c) nitrato de plata · d) bromo · e) cloruro de hidrógeno. Solventes disponibles: tetracloruro de carbono (CCl₄), agua, acetonitrilo (CH₃CN) y ácido nítrico concentrado. Elegí el solvente adecuado para cada uno y justificá.',
    solution:table(['Sustancia','Solvente','Por qué'],[
     ['a) Cu','HNO₃ concentrado','el cobre no se disuelve en ningún solvente: hay que <b>oxidarlo</b>. El HNO₃ lo pasa a Cu(NO₃)₂, soluble (TP 5)'],
     ['b) Na₂O','agua','óxido básico: <b>reacciona</b> con el agua y da NaOH, muy soluble'],
     ['c) AgNO₃','agua','sal iónica: el agua, polar, separa e hidrata los iones Ag⁺ y NO₃⁻'],
     ['d) Br₂','CCl₄','molécula apolar: se disuelve en un solvente apolar (London)'],
     ['e) HCl','agua','molécula polar que en agua se <b>ioniza</b> por completo: HCl + H₂O → H₃O⁺ + Cl⁻']])+
     rx('Cu + 4 HNO3(c) -> Cu(NO3)2 + 2 NO2 + 2 H2O')+
     note('Sobre la guía','<p>La resolución original estaba cortada después del nitrato de plata; d) y e) se completaron acá.</p>'),
    answer:'a) HNO₃ (c) · b) agua · c) agua · d) CCl₄ · e) agua'}
  ];

  window.ET27_QI4.units.push({id:'fuerzas-intermoleculares',part:'teoria',n:5,title:'Polaridad y fuerzas intermoleculares',short:'Fuerzas intermoleculares',lead:'Polaridad de enlaces y de moléculas, fuerzas de London, dipolo–dipolo y puente de hidrógeno, y cómo explican puntos de ebullición, solubilidad y tipos de sólidos. Teoría paso a paso, ejercitación resuelta y la Guía 5 completa.',sections:s,exercises:ex});
})();
