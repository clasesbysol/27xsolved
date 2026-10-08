// 27xSOLved · Química Inorgánica 4.º · TEORÍA (materia teórica)
// Unidad 1: Uniones químicas — enlace iónico, covalente y metálico, Lewis, carga formal, resonancia,
// longitud y energía de enlace, polaridad, TREPEV e hibridación, redes iónicas. Con la ejercitación resuelta.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {M,m,chain,key,idea,warn,fix,note,deep,step,table,figure,cards,example}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qi-un-${k}`,label:l,kicker:kk,html:h});

  // Geometrías TREPEV en 2D
  const at=(x,y,t,c='')=>`<circle cx="${x}" cy="${y}" r="15" class="svgLineFill ${c||'svgSoft'}"/><text x="${x}" y="${y+5}" text-anchor="middle" class="svgText strong">${t}</text>`;
  const bond=(x1,y1,x2,y2,cls='svgLine thickLine')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  const lp=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="11" ry="7" class="qiLonePair"/><text x="${x}" y="${y+4}" text-anchor="middle" class="svgText strong">··</text>`;
  const cell=(cx,title,sub,body)=>`${body}<text x="${cx}" y="168" text-anchor="middle" class="svgText strong">${title}</text><text x="${cx}" y="186" text-anchor="middle" class="svgText qiSmall">${sub}</text>`;
  const svgTrepev=`<svg viewBox="0 0 660 200" role="img" aria-label="Geometrías: lineal, trigonal plana, tetraédrica, piramidal y angular">
   ${cell(66,'Lineal','CO₂ · 180°',bond(26,80,106,80)+at(26,80,'O')+at(106,80,'O')+at(66,80,'C','svgSection'))}
   ${cell(198,'Trigonal plana','BF₃ · 120°',bond(198,80,198,36)+bond(198,80,160,102)+bond(198,80,236,102)+at(198,36,'F')+at(160,102,'F')+at(236,102,'F')+at(198,80,'B','svgSection'))}
   ${cell(330,'Tetraédrica','CH₄ · 109,5°',bond(330,82,330,34)+bond(330,82,292,108)+bond(330,82,368,108)+bond(330,82,350,124,'svgLine thickLine qiDash')+at(330,34,'H')+at(292,108,'H')+at(368,108,'H')+at(350,124,'H')+at(330,82,'C','svgSection'))}
   ${cell(462,'Piramidal','NH₃ · 107°',lp(462,44)+bond(462,82,424,108)+bond(462,82,500,108)+bond(462,82,462,126)+at(424,108,'H')+at(500,108,'H')+at(462,126,'H')+at(462,82,'N','svgSection'))}
   ${cell(594,'Angular','H₂O · 104,5°',lp(574,48)+lp(614,48)+bond(594,82,558,112)+bond(594,82,630,112)+at(558,112,'H')+at(630,112,'H')+at(594,82,'O','svgSection'))}
  </svg>`;

  add('tipos','Los tres tipos de unión','UNIONES QUÍMICAS · 01',`
<p>Los átomos se unen para quedar más estables, casi siempre buscando la configuración de gas noble (<b>regla del octeto</b>). Según cómo “se arreglen” con los electrones, hay tres tipos de unión:</p>
${table(['Unión','Entre…','Qué pasa con los electrones','Ejemplo'],[
 ['Iónica','metal + no metal (ΔEN grande)','se <b>transfieren</b>: se forman cationes y aniones que se atraen','NaCl, MgO, CaCl₂'],
 ['Covalente','no metales (ΔEN chica o moderada)','se <b>comparten</b> pares de electrones','H₂O, O₂, CH₄'],
 ['Metálica','átomos de un metal','cationes en un <b>“mar” de electrones</b> deslocalizados','Na, Fe, Cu']
])}
<h3>La diferencia de electronegatividad decide</h3>
${table(['ΔEN','Tipo de enlace','Ejemplo'],[['≈ 0 (menor que 0,4)','covalente no polar','Cl₂, H₂, F₂'],['0,4 a 1,7 aprox.','covalente polar','H₂O, HCl'],['mayor que 1,7 aprox.','iónico','NaCl (ΔEN = 2,23)']])}
${punch('No hay una frontera tajante: entre iónico y covalente hay una gradación. 1,7 es una referencia, no una ley.')}
${idea('Por qué cada uno tiene sus propiedades','<ul><li><b>Iónicos</b>: red de iones → sólidos duros, frágiles, alto punto de fusión; conducen fundidos o disueltos.</li><li><b>Covalentes moleculares</b>: moléculas sueltas unidas por fuerzas débiles → gases, líquidos o sólidos blandos de bajo punto de fusión; no conducen.</li><li><b>Metálicos</b>: electrones libres → conducen, brillan y son maleables.</li></ul>')}
`);

  add('lewis','Estructuras de Lewis paso a paso','UNIONES QUÍMICAS · 02',`
<p>La estructura de Lewis muestra los electrones de valencia: los pares que forman enlaces (rayitas) y los pares libres (puntitos). Seguimos siempre los mismos pasos, con el ejemplo del <b>ion carbonato, CO₃²⁻</b>:</p>
${table(['Paso','Qué hacer','CO₃²⁻'],[
 ['1. Átomo central','el menos electronegativo; nunca el H; ante la duda, el que forma más enlaces','C'],
 ['2. Contar electrones de valencia','sumar los de todos los átomos; anión: sumar la carga; catión: restarla','4 (C) + 3·6 (O) + 2 (carga) = <b>24</b>'],
 ['3. Esqueleto','unir el central con cada periférico con enlaces simples (2 e⁻ cada uno)','3 enlaces C–O = 6 e⁻ → quedan 18'],
 ['4. Octetos periféricos','completar con pares libres los átomos de afuera','6 e⁻ en cada O → quedan 0'],
 ['5. Octeto del central','si no llega, convertir un par libre de un periférico en doble (o triple) enlace','el C tenía 6 → un C=O → 8 ✓'],
 ['6. Cargas formales','calcularlas y elegir la mejor estructura','C 0 · O(doble) 0 · cada O(simple) −1 → total −2 ✓'],
 ['7. Resonancia','si hay varias estructuras equivalentes, se dibujan todas','el doble enlace puede estar en cualquiera de los 3 O']
])}
${key(R`\text{CF}=V-N-\frac{B}{2}`,'Carga formal')}
${K.sym([['V','electrones de valencia del átomo libre',''],['N','electrones no enlazantes (pares libres)',''],['B','electrones enlazantes (compartidos)','']])}
${example('Cargas formales del carbonato','<p>En la estructura con un C=O y dos C–O:</p>',
 step('Carbono',chain(R`\text{CF}=4-0-\frac{8}{2}=0`))+step('Oxígeno con doble enlace',chain(R`\text{CF}=6-4-\frac{4}{2}=0`))+step('Cada oxígeno con enlace simple',chain(R`\text{CF}=6-6-\frac{2}{2}=-1`))+step('Control',chain(R`0+0+(-1)+(-1)=-2\ \checkmark`)),'C 0 · O= 0 · O– −1 (dos veces) · suma −2 = carga del ion')}
${table(['Criterio para elegir la mejor estructura'],[['Cargas formales lo más cercanas a 0'],['Las cargas negativas en los átomos más electronegativos'],['La suma de las cargas formales = carga total (0 si es neutra)']])}
${warn('Excepciones al octeto','<ul><li><b>Octeto incompleto</b>: Be y B pueden quedar con 4 o 6 electrones (BeCl₂, BF₃).</li><li><b>Octeto expandido</b>: elementos del período 3 o mayores (P, S, Cl) pueden superar 8 (PCl₅, SF₆).</li><li><b>Número impar de electrones</b> (radicales): queda un electrón desapareado (NO, NO₂).</li></ul>')}
`);

  add('casos','Galería de casos de Lewis','UNIONES QUÍMICAS · 03',`
<p>Si entendés estos casos, Lewis deja de ser un problema:</p>
${table(['Especie','Tipo','Cómo es'],[
 ['NaCl','iónico','el Na cede su único electrón al Cl: Na⁺ y [Cl]⁻ con octeto, unidos por atracción electrostática'],
 ['CaCl₂','iónico','el Ca pierde 2 e⁻, uno para cada Cl: Ca²⁺ y 2 [Cl]⁻'],
 ['Na (s) · Fe (s)','metálico','cationes en un mar de electrones deslocalizados: conducen, brillan, son maleables'],
 ['O₂','covalente no polar','doble enlace O=O; cada O con 2 pares libres'],
 ['N₂','covalente no polar','triple enlace N≡N; cada N con 1 par libre'],
 ['HCl · HF','covalente polar','un par compartido; el halógeno atrae más los electrones (HF, el más polar)'],
 ['CH₄','covalente','4 enlaces C–H, sin pares libres; tetraédrica'],
 ['H₂O','covalente polar','2 enlaces O–H y 2 pares libres; angular'],
 ['NH₄⁺','covalente (ion)','4 enlaces N–H, sin pares libres; carga +1 (el cuarto H entra por un enlace coordinado)'],
 ['CO₂','covalente','O=C=O, dos dobles; lineal y no polar'],
 ['C₂H₄','covalente','C=C doble, cada C con 2 H; plana'],
 ['SO₂','covalente','S con un doble, un simple (resonancia) y un par libre; angular'],
 ['NO₃⁻','covalente (ion)','24 e⁻; N con un doble y dos simples; la carga se reparte por resonancia'],
 ['HNO₃','covalente','N unido a 3 O: uno doble, uno simple (O⁻) y uno al grupo –OH'],
 ['N₂O','covalente','N=N=O ↔ N≡N–O (resonancia); lineal'],
 ['BeCl₂','covalente (molécula gaseosa)','Be con 2 enlaces simples: sólo 4 e⁻, octeto incompleto'],
 ['BF₃','covalente','B con 3 enlaces simples: sólo 6 e⁻ y un orbital vacío'],
 ['PCl₅ · SF₆','covalente','octeto expandido: 10 y 12 electrones alrededor del central'],
 ['H₂SO₄','covalente','S unido a 4 O: dos –OH y dos O “terminales”']
])}
${fix('Correcciones al apunte','<ul><li><b>BF₃</b>: el apunte dice que es estable “por su baja tendencia a captar electrones”. Es al revés: como el B queda con 6 e⁻ y un orbital vacío, <b>acepta pares con facilidad</b> (es un ácido de Lewis típico, por ejemplo BF₃ + NH₃ → F₃B–NH₃).</li><li><b>H₂SO₄</b>: si se dibuja con dos dobles S=O, el S queda con 12 electrones (octeto expandido); no “todos cumplen el octeto”. La estructura que sí cumple octeto tiene cuatro enlaces simples, con carga formal +2 en el S y −1 en los dos O terminales. Las dos se usan; la de dobles enlaces minimiza las cargas formales.</li><li><b>NH₄⁺</b>: además de “4 enlaces” conviene decir que uno es <b>coordinado</b> (el par lo pone el N al captar un H⁺).</li></ul>')}
`);

  add('longitud','Longitud, energía de enlace y resonancia','UNIONES QUÍMICAS · 04',`
${facts([['Longitud de enlace','distancia entre los núcleos unidos'],['Energía de enlace','energía para romper 1 mol de enlaces en fase gaseosa (ΔH > 0)']])}
${table(['Enlace','Longitud','Energía'],[['simple','la más larga','la menor'],['doble','intermedia','intermedia'],['triple','la más corta','la mayor']])}
${punch('Más enlaces entre dos átomos → más corto y más fuerte. Un doble NO es más fácil de romper que un simple (aunque tampoco vale el doble).')}
<h3>Qué más influye</h3>
<ul class="kitList"><li><b>Radio atómico</b>: átomos más grandes → núcleos más separados → enlaces más largos y débiles. <b>Bajando en un grupo</b> el radio crece: H–F &lt; H–Cl &lt; H–Br &lt; H–I en longitud.</li><li><b>Carga nuclear efectiva</b>: aumenta hacia la derecha en un período → átomos más chicos → enlaces más cortos y fuertes.</li></ul>
<h3>Resonancia</h3>
<p>A veces una sola estructura de Lewis no alcanza. En el <b>ozono, O₃</b>, el doble enlace podría estar a la izquierda o a la derecha:</p>
${M(R`\mathrm{O{=}O{-}O}\ \longleftrightarrow\ \mathrm{O{-}O{=}O}`)}
<p>La molécula real no “salta” entre las dos: es un <b>híbrido de resonancia</b> con los dos enlaces iguales, de longitud intermedia entre simple y doble. Las formas resonantes no existen por separado. Lo mismo pasa con CO₃²⁻, NO₃⁻ y SO₂.</p>
`);

  add('polaridad','Orbitales, uniones σ y π, polaridad','UNIONES QUÍMICAS · 05',`
<p>Un <b>orbital</b> es la zona del espacio donde es muy probable encontrar al electrón. El enlace covalente aparece cuando se <b>superponen (solapan)</b> orbitales de dos átomos que comparten electrones.</p>
${table(['Unión','Solapamiento','Dónde aparece'],[['σ (sigma)','frontal: los orbitales se “enfrentan” sobre la línea que une los núcleos','todo enlace simple; el primer enlace de un doble o triple'],['π (pi)','lateral: orbitales p paralelos, por arriba y por abajo','el segundo enlace de un doble; el 2.º y 3.º de un triple']])}
${idea('Contar σ y π','<p>Simple = 1σ · Doble = 1σ + 1π · Triple = 1σ + 2π. Ejemplo: el CO₂ (O=C=O) tiene 2σ + 2π.</p>')}
<h3>Polaridad del enlace y de la molécula</h3>
<p>Si los dos átomos tienen distinta electronegatividad, la nube de electrones se corre hacia el más electronegativo: aparece un <b>dipolo</b> (δ⁺ y δ⁻). La polaridad total de la molécula se mide con el <b>momento dipolar</b>, que depende de:</p>
<ol class="kitList"><li>la <b>diferencia de electronegatividad</b> de cada enlace, y</li><li>la <b>geometría</b>: si la molécula es simétrica, los dipolos se anulan.</li></ol>
${table(['Molécula','Enlaces','Geometría','¿Molécula polar?'],[['CO₂','polares','lineal, simétrica','no (se anulan)'],['H₂O','polares','angular','sí'],['CH₄','casi no polares','tetraédrica, simétrica','no'],['NH₃','polares','piramidal','sí'],['BF₃','polares','trigonal plana, simétrica','no']])}
`);

  add('trepev','TREPEV e hibridación','UNIONES QUÍMICAS · 06',`
<p><b>TREPEV</b> (teoría de repulsión de pares electrónicos de valencia): los pares de electrones alrededor del átomo central se <b>repelen</b> y se ubican lo más lejos posible. Se cuentan los <b>dominios</b>: cada enlace (simple, doble o triple cuenta como uno) y cada par libre.</p>
${figure(svgTrepev,'Geometrías moleculares más comunes (los pares libres no se “ven” en la forma, pero empujan).')}
${table(['Dominios','Geometría electrónica','Hibridación','Ángulo','Ejemplos'],[
 ['2','lineal','sp','180°','CO₂, BeCl₂'],
 ['3','trigonal plana','sp²','120°','BF₃, SO₃ · SO₂ (1 par libre → angular)'],
 ['4','tetraédrica','sp³','109,5°','CH₄ · NH₃ (1 par libre → piramidal, 107°) · H₂O (2 pares → angular, 104,5°)'],
 ['5','bipirámide trigonal','sp³d','90° y 120°','PCl₅, PF₅'],
 ['6','octaédrica','sp³d²','90°','SF₆']
])}
${punch('Geometría electrónica: cuenta todos los dominios. Geometría molecular: sólo mira dónde están los átomos.')}
${idea('Por qué el ángulo se achica','<p>Un par libre ocupa más lugar que un par de enlace y empuja a los enlaces: CH₄ 109,5° → NH₃ 107° (1 par libre) → H₂O 104,5° (2 pares libres).</p>')}
<h3>Hibridación (teoría de enlace de valencia)</h3>
<p>Para explicar esas geometrías, el átomo central “mezcla” sus orbitales s y p y forma orbitales <b>híbridos</b> equivalentes: tantos como dominios necesita. Los orbitales p que <b>no</b> se mezclan quedan disponibles para las uniones π.</p>
${table(['Hibridación','Orbitales que se mezclan','Quedan p sin hibridar','Puede formar π'],[['sp','1 s + 1 p → 2 sp','2','hasta 2 (triple o dos dobles)'],['sp²','1 s + 2 p → 3 sp²','1','1 (un doble)'],['sp³','1 s + 3 p → 4 sp³','0','no']])}
${note('Sobre sp³d y sp³d²','<p>Es la explicación clásica con orbitales d para PCl₅ y SF₆, que es la que se usa en el curso. Hoy se sabe que los orbitales d participan poco, pero para TREPEV y el examen vale este modelo.</p>')}
`);

  add('red-ionica','La red cristalina iónica','UNIONES QUÍMICAS · 07',`
<p>Los compuestos iónicos <b>no forman moléculas</b>: forman una <b>red tridimensional</b> de cationes y aniones alternados. NaCl es la fórmula mínima (1 : 1), no una molécula. La red es muy estable por la <b>energía reticular</b>: la energía liberada al armar el cristal a partir de los iones separados.</p>
${table(['Propiedad','Por qué'],[['Sólidos duros y frágiles','al desplazar una capa quedan enfrentadas cargas iguales y el cristal se parte'],['Puntos de fusión y ebullición altos','hay que vencer atracciones fuertes en todas las direcciones'],['Muchos son solubles en agua','el agua (polar) rodea y separa los iones (aunque hay excepciones: AgCl, BaSO₄, CaCO₃)'],['Conducen fundidos o disueltos, no sólidos','sólo cuando los iones pueden moverse']])}
<h3>¿Qué hace más fuerte la unión iónica?</h3>
${M(R`F\propto\frac{q_+\cdot q_-}{d^2}`)}
<ul class="kitList"><li><b>Mayor carga</b> de los iones → más atracción (MgO, con 2+ y 2−, funde mucho más alto que NaCl, con 1+ y 1−).</li><li><b>Iones más chicos</b> → más cerca → más atracción.</li><li><b>Bajando en un grupo</b>: iones más grandes → enlaces más largos → menor energía reticular.</li><li><b>Hacia la derecha en un período</b>: cationes más chicos y con más carga → más energía reticular.</li></ul>
`);

  add('ejercicios','Ejercitación resuelta','UNIONES QUÍMICAS · 08',`
<p>La ejercitación de la unidad, resuelta y revisada. Donde la resolución que circula tiene un error, se marca con <b>✎</b>.</p>
<div data-qi-guide></div>`);

  add('repaso','Repaso de uniones químicas','UNIONES QUÍMICAS · REPASO',`
${cards([
 ['Uniones','¿Cuándo una unión es iónica?','Entre metal y no metal con ΔEN grande (más de ~1,7): transferencia de electrones.'],
 ['Lewis','¿Cómo se cuentan los electrones de un anión?','Se suman los de valencia de todos los átomos más la carga (CO₃²⁻: 4 + 18 + 2 = 24).'],
 ['Lewis','Fórmula de la carga formal','CF = V − N − B/2.'],
 ['Lewis','Dos excepciones al octeto','Incompleto: BF₃, BeCl₂. Expandido: PCl₅, SF₆.'],
 ['Enlace','Ordená por longitud: N₂, O₂, F₂','N≡N &lt; O=O &lt; F–F (y en energía al revés).'],
 ['Resonancia','¿Qué es el híbrido de resonancia?','La estructura real, intermedia entre las formas resonantes, que no existen por separado.'],
 ['σ y π','¿Cuántas σ y π tiene un triple enlace?','1 σ y 2 π.'],
 ['TREPEV','4 dominios con 2 pares libres','Geometría electrónica tetraédrica; molecular angular (H₂O, 104,5°).'],
 ['Hibridación','CO₂, BF₃, CH₄','sp, sp², sp³.'],
 ['Red iónica','¿Por qué el MgO funde más alto que el NaCl?','Sus iones tienen más carga (2+ y 2−): se atraen más.']
])}
`);

  const ex=[
   {n:'U1',title:'Tipo de unión',statement:'Indicá qué tipo de unión presentan: cloruro de sodio, litio, yodo, óxido de magnesio, ácido clorhídrico, flúor y óxido de nitrógeno(V).',
    solution:table(['Sustancia','Unión','Por qué'],[['NaCl','iónica','metal + no metal, ΔEN = 3,16 − 0,93 = 2,23: el Na transfiere 1 e⁻ al Cl'],['Li','metálica','red de Li⁺ en un mar de electrones'],['I₂','covalente no polar','mismo átomo (ΔEN = 0); en el sólido las moléculas se unen por fuerzas de Van der Waals'],['MgO','iónica','Mg²⁺ y O²⁻ (ΔEN = 2,13)'],['HCl','covalente polar','ΔEN = 0,96; en agua se ioniza: HCl + H₂O → H₃O⁺ + Cl⁻'],['F₂','covalente no polar','ΔEN = 0'],['N₂O₅','covalente polar','no metal + no metal; es un óxido ácido: N₂O₅ + H₂O → 2 HNO₃']]),
    answer:'Iónica: NaCl, MgO · Metálica: Li · Covalente no polar: I₂, F₂ · Covalente polar: HCl, N₂O₅'},
   {n:'U2',title:'Verdadero o falso',statement:'A) La unión covalente se da únicamente entre no metales. B) Los óxidos ácidos son sustancias covalentes. C) El carácter covalente de los óxidos del período 2 aumenta con el Z. D) Todos los compuestos del grupo 2 son iónicos.',
    solution:table(['','V/F','Justificación'],[['A','Falso','casi siempre es entre no metales, pero hay uniones covalentes entre metales y no metales cuando la ΔEN es chica: BeCl₂, AlCl₃, AlBr₃'],['B','Verdadero','son óxidos de no metales (CO₂, SO₂, N₂O₅): uniones covalentes'],['C','Verdadero','Li₂O iónico → BeO intermedio → B₂O₃, CO₂, N₂O₅ covalentes: al aumentar Z sube la electronegatividad y baja la ΔEN con el O'],['D','Falso','el berilio forma compuestos con mucho carácter covalente (BeCl₂)']]),
    answer:'A F · B V · C V · D F'},
   {n:'U3',title:'Haluros de aluminio',statement:'AlF₃: ΔEN 2,37, PF 1200 °C, conduce fundido · AlCl₃: ΔEN 1,55, PF 192 °C, conduce · AlBr₃: ΔEN 1,35, PF 98 °C, no conduce. ¿Qué opciones explican estos hechos? (1) El carácter covalente Al–X aumenta con el Z. (2) La diferencia de electronegatividad. (3) Todos son iónicos. (4) Los compuestos covalentes no se disocian. (5) Si el halógeno es más electronegativo, la sal es más iónica. (6) Todas. (7) Ninguna.',
    solution:step('Lectura de los datos','<p>De F a Br baja la ΔEN, baja muchísimo el punto de fusión y se pierde la conductividad: pasamos de un sólido <b>iónico</b> (AlF₃) a uno con predominio <b>covalente</b> (AlBr₃, que funde a 98 °C y no conduce porque no tiene iones).</p>')+table(['Opción','¿Correcta?'],[['1 · el carácter covalente aumenta con Z','✔'],['2 · la diferencia de electronegatividad','✔'],['3 · todos son iónicos','✘ (AlBr₃ es covalente)'],['4 · los covalentes no se disocian','✔ (por eso AlBr₃ no conduce)'],['5 · halógeno más electronegativo → más iónico','✔'],['6 · todas','✘'],['7 · ninguna','✘']]),
    answer:'Correctas: 1, 2, 4 y 5.'},
   {n:'U4',title:'Longitud y energía de enlace',statement:'Ordená por longitud de enlace (de corto a largo) y por energía (de fuerte a débil), justificando: A) H–F, H–Cl, H–Br, H–I · B) F₂, O₂, N₂.',
    solution:step('A · Halogenuros de hidrógeno',`<p><b>Longitud:</b> H–F &lt; H–Cl &lt; H–Br &lt; H–I. <b>Energía:</b> H–F &gt; H–Cl &gt; H–Br &gt; H–I.</p><p>Bajando en el grupo 17 el radio del halógeno crece: el enlace es más largo y el solapamiento de orbitales peor, entonces más débil. (Por eso la acidez de los HX en agua aumenta hacia el HI: su enlace se rompe más fácil.)</p>`)+
     step('B · F₂, O₂, N₂',`<p><b>Longitud:</b> N≡N &lt; O=O &lt; F–F. <b>Energía:</b> N≡N &gt; O=O &gt; F–F.</p><p>El orden de enlace baja de 3 a 2 a 1. Además, en el F₂ los muchos pares libres de dos átomos muy chicos se repelen y lo debilitan todavía más.</p>`),
    answer:'A: longitud H–F < H–Cl < H–Br < H–I; energía al revés · B: longitud N₂ < O₂ < F₂; energía N₂ > O₂ > F₂'},
   {n:'U5',title:'Geometría e hibridación (TREPEV)',statement:'Para BeF₂, SO₃, CH₄, PF₅, SF₆, SO₂, H₂O y NH₃ indicá dominios, geometría electrónica y molecular, hibridación y ángulo.',
    solution:table(['Especie','Dominios','G. electrónica','G. molecular','Hibridación','Ángulo'],[['BeF₂','2 (2 σ)','lineal','lineal (molécula gaseosa)','sp','180°'],['SO₃','3','trigonal plana','trigonal plana','sp²','120°'],['CH₄','4','tetraédrica','tetraédrica','sp³','109,5°'],['PF₅','5','bipirámide trigonal','bipirámide trigonal','sp³d','90° y 120°'],['SF₆','6','octaédrica','octaédrica','sp³d²','90°'],['SO₂','3 (2 enlaces + 1 par)','trigonal plana','angular','sp²','≈ 119°'],['H₂O','4 (2 + 2 pares)','tetraédrica','angular','sp³','104,5°'],['NH₃','4 (3 + 1 par)','tetraédrica','piramidal','sp³','107°']])+note('BeF₂ sólido','<p>Este análisis es para la molécula aislada (gas). En estado sólido el BeF₂ forma una red; no hace falta para el ejercicio.</p>'),
    answer:'Ver tabla: lineal sp · trigonal plana sp² · tetraédrica sp³ · bipirámide sp³d · octaédrica sp³d²; SO₂, H₂O angulares y NH₃ piramidal.'},
   {n:'U6',title:'Teoría de enlace de valencia',statement:'Describí con TEV el CO₂, NH₃, BF₃ y N₂O: geometría electrónica, hibridación del átomo central, cantidad de uniones σ y π del central, y qué orbitales forman las uniones del NH₃.',
    solution:table(['Molécula','Geometría','Hibridación del central','σ y π del central','Orbitales'],[['CO₂ (O=C=O)','lineal, 180°','C sp','2 σ + 2 π','σ: sp(C) con orbitales del O; π: p sin hibridar del C con p del O'],['NH₃','electrónica tetraédrica; molecular piramidal (107°)','N sp³','3 σ, 0 π','cada N–H: <b>sp³ (N) + 1s (H)</b>; el 4.º sp³ tiene el par libre'],['BF₃','trigonal plana, 120°','B sp²','3 σ, 0 π','sp²(B) + p(F); queda un p vacío en el B (por eso es ácido de Lewis)'],['N₂O (N–N–O)','lineal, 180°','N central sp','2 σ + 2 π','σ: sp del N central con el otro N y con el O; π: p del N central con p del N terminal']]),
    answer:'CO₂ sp (2σ+2π) · NH₃ sp³ (3σ; N sp³ + H 1s) · BF₃ sp² (3σ) · N₂O sp (2σ+2π)'},
   {n:'U7',title:'Óxido de sodio y óxido de magnesio',statement:'Datos: Na₂O: PF 1132 °C, solubilidad 111 g/100 mL · MgO: PF 2852 °C, solubilidad 0,0086 g/100 mL. a) Iones y estructura de Lewis. b) ¿Ambos son iónicos? ¿Cuál tiene mayor carácter iónico? c) y d) Marcá las opciones que explican las diferencias de punto de fusión y de solubilidad: (1) los iones del Na₂O tienen igual carga y se anulan; (2) el catión del Na₂O tiene menor carga y se atraen menos; (3) Na⁺ y Mg²⁺ son isoelectrónicos; (4) el catión del MgO tiene mayor carga y se atraen más; (5) ninguna. e) Ecuaciones al disolverlos en agua.',
    solution:step('a · Iones','<p><b>Na₂O</b>: 2 Na⁺ + O²⁻. Cada Na pierde 1 e⁻ (queda como [Ne]); el O gana 2 (octeto, [Ne]). Lewis: 2 Na⁺ y [:Ö:]²⁻ con 8 electrones. <b>MgO</b>: Mg²⁺ + O²⁻; el Mg pierde 2 e⁻ que gana el O.</p>')+
     step('b · Carácter iónico',chain(R`\Delta EN(\mathrm{Na{-}O})=3{,}44-0{,}93=2{,}51`,R`\Delta EN(\mathrm{Mg{-}O})=3{,}44-1{,}31=2{,}13`)+'<p>Los dos son iónicos (ΔEN &gt; 1,7). Por diferencia de electronegatividad, el <b>Na₂O</b> tiene <b>mayor</b> carácter iónico.</p>'+fix('Lo que circula','<p>Dice que la ΔEN Mg–O es mayor y que el MgO es más iónico: es al revés. El Mg es <b>más</b> electronegativo que el Na, así que su diferencia con el O es <b>menor</b>. (Que el MgO funda más alto se explica por la carga de los iones, no por la ΔEN.)</p>'))+
     step('c · Punto de fusión','<p>Correctas <b>2 y 4</b>: con más carga (Mg²⁺ y O²⁻) la atracción es mucho mayor y hace falta más energía para fundir. La 3 es una afirmación <b>verdadera</b> (los dos tienen configuración de Ne) y sirve de contexto: como tienen la misma configuración, la diferencia la hace la carga (y el menor tamaño del Mg²⁺); por sí sola no explica. La 1 es falsa.</p>')+
     step('d · Solubilidad','<p>Correctas <b>2 y 4</b>: los iones del MgO se atraen tanto que el agua casi no puede separarlos.</p>')+
     step('e · Ecuaciones',rxs(['Na2O(s) + H2O(l) -> 2 NaOH(ac)','muy soluble, solución muy básica'],['MgO(s) + H2O(l) -> Mg(OH)2(s)','hidróxido poco soluble'])),
    answer:'b) ambos iónicos; mayor carácter iónico el Na₂O (ΔEN 2,51 vs 2,13) · c) 2 y 4 · d) 2 y 4'}
  ];
  window.ET27_QI4.units.push({id:'uniones',part:'teoria',n:1,title:'Uniones químicas',short:'Uniones químicas',lead:'Enlace iónico, covalente y metálico; estructuras de Lewis y carga formal; longitud, energía y resonancia; polaridad; TREPEV e hibridación; redes iónicas. Con la ejercitación resuelta.',sections:s,exercises:ex});
})();
