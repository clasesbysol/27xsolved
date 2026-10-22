// 27xSOLved · Química Inorgánica 4.º · TEORÍA · Unidad 5: Polaridad y fuerzas intermoleculares
// (tema 5 del programa: «las relaciones entre las moléculas»). Por ahora sólo la ejercitación resuelta,
// tomada de una guía resuelta por un alumno y revisada: consignas completadas y errores marcados con ✎.
// La teoría queda pendiente hasta tener el material de clase.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {idea,warn,fix,note,step,table}=K;
  const {rx}=Q;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qi-fi-${k}`,label:l,kicker:`FUERZAS INTERMOLECULARES · ${kk}`,html:h});
  const ver=(id,label)=>`<p class="guideLink">🔗 Repaso previo: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;

  add('teoria','01 · De la geometría a las fuerzas','CONCEPTOS FUNDAMENTALES',\`
<h3>Qué explica esta unidad</h3>
<p>En la unidad anterior aprendimos a representar <b>enlaces dentro de una molécula</b> con Lewis, a contar regiones electrónicas con <b>TRePEV</b> y a determinar su <b>geometría molecular</b>. Acá usamos esos resultados para explicar <b>cómo se atraen las partículas entre sí</b> y por qué una sustancia hierve, se funde o se disuelve a determinada temperatura.</p>
<p><b>Enlace intramolecular:</b> unión que mantiene juntos los átomos de una especie, como el enlace covalente O–H dentro de H₂O. <b>Fuerza intermolecular:</b> atracción entre moléculas diferentes, como los puentes de hidrógeno entre moléculas de agua. Al hervir agua líquida se vencen principalmente las atracciones entre moléculas; no se rompen los enlaces covalentes O–H.</p>
\${ver('uniones:qi-un-polaridad','Repasar polaridad de enlaces y moléculas')}
\${ver('uniones:qi-un-trepev','Repasar TRePEV y geometría molecular')}
\${idea('Método de resolución','<ol><li>Identificar si la sustancia es molecular, iónica, metálica o una red covalente.</li><li>Si es molecular, dibujar Lewis, contar dominios y determinar la geometría.</li><li>Decidir si los dipolos de enlace se cancelan o dan un momento molecular distinto de cero.</li><li>Identificar London (siempre), dipolo–dipolo (si hay polaridad permanente) y puentes de H (cuando corresponda).</li><li>Para comparar propiedades, considerar además masa, tamaño, polarizabilidad, estructura, estado y posibles reacciones químicas.</li></ol>')}
\`);

  add('polaridad','02 · Polaridad molecular','MOMENTO DIPOLAR',\`
<h3>Polaridad del enlace y polaridad de toda la molécula</h3>
<p><b>Electronegatividad:</b> capacidad de un átomo enlazado para atraer hacia sí los electrones compartidos. Si dos átomos tienen electronegatividades diferentes, el enlace puede tener un extremo parcialmente negativo (<b>δ−</b>) y otro parcialmente positivo (<b>δ+</b>). <b>Dipolo:</b> separación de cargas de signos opuestos. <b>Momento dipolar (μ):</b> magnitud que cuantifica esa separación; para dos cargas puntuales opuestas se expresa como μ = q × d, donde q es el valor de la carga y d la distancia entre ellas. Su unidad frecuente es el <b>debye (D)</b>.</p>
<p>En una molécula con varios enlaces, los momentos dipolares son <b>vectores</b>: tienen magnitud y dirección, y se suman teniendo en cuenta la geometría. <b>Vector:</b> cantidad representada por una flecha que señala dirección y sentido. Una molécula puede tener enlaces polares y, aun así, ser apolar si la suma vectorial se anula.</p>
\${table(['Molécula','Lewis y geometría','¿Se cancelan los dipolos?','Resultado'],[
['CO₂','O=C=O, lineal, 180°','Sí: dos enlaces C=O opuestos e iguales','Apolar, μ = 0'],
['SO₂','dos regiones S–O y un par libre, angular','No: las flechas no son opuestas','Polar, μ ≠ 0'],
['H₂O','dos enlaces O–H y dos pares libres, angular','No: ángulo 104,5°','Polar'],
['BF₃','tres enlaces B–F, trigonal plana','Sí: tres direcciones simétricas','Apolar'],
['NH₃','tres enlaces N–H y un par libre, piramidal','No','Polar'],
['CCl₄','cuatro enlaces C–Cl, tetraédrica','Sí: cuatro enlaces equivalentes','Apolar']])}
\${idea('Ejemplo de examen: NF₃ y NH₃','<p>Ambas moléculas son piramidales, pero la magnitud de sus momentos dipolares difiere: en NH₃ la contribución de los enlaces N–H se suma en la dirección del par libre; en NF₃ la contribución de los enlaces N–F se opone parcialmente a la del par libre. Por eso μ(NF₃) es menor que μ(NH₃). No alcanza con comparar solamente las electronegatividades.</p>')}
\`);

  add('london','03 · Fuerzas de London','DISPERSIÓN',\`
<h3>Dipolos instantáneos e inducidos</h3>
<p><b>Fuerzas de dispersión de London:</b> atracciones que aparecen porque los electrones están en movimiento y su distribución puede fluctuar. Por un instante, una partícula adquiere un <b>dipolo instantáneo</b>, que deforma la nube electrónica vecina y genera un <b>dipolo inducido</b>. La atracción resultante existe en <b>todas</b> las partículas, incluso las apolares y los átomos de gases nobles.</p>
<p><b>Polarizabilidad:</b> facilidad con que se deforma la nube electrónica. Suele aumentar cuando hay más electrones, mayor tamaño y una nube electrónica más extendida. El <b>efecto pantalla</b> es la disminución de la atracción neta que sienten los electrones externos debido a la presencia de electrones internos. La <b>carga nuclear efectiva</b> es la atracción neta del núcleo sobre un electrón una vez considerado ese apantallamiento.</p>
\${step('Comparación razonada: F₂, Cl₂, Br₂ e I₂','<p><b>1.</b> Todas son moléculas diatómicas homonucleares (dos átomos del mismo elemento), así que son apolares. <b>2.</b> Todas presentan London. <b>3.</b> Al bajar por el grupo aumenta el tamaño de la nube electrónica y la polarizabilidad. <b>4.</b> En general se intensifican las fuerzas de London y aumentan los puntos de ebullición: F₂ &lt; Cl₂ &lt; Br₂ &lt; I₂.</p>')}
<p><b>Precisión:</b> la masa molar es un indicador útil cuando se comparan sustancias semejantes, pero no es por sí sola la causa de London. También influyen la forma molecular y la superficie de contacto.</p>
\`);

  add('dipolos','04 · Dipolo–dipolo','MOLÉCULAS POLARES',\`
<h3>Atracción entre dipolos permanentes</h3>
<p>Una <b>molécula polar</b> presenta una distribución asimétrica de carga y un momento dipolar permanente. Sus extremos parcialmente positivos y negativos pueden orientarse de manera favorable y atraerse: esto se llama <b>interacción dipolo–dipolo</b>. Es una interacción <b>electrostática</b>, es decir, debida a la atracción entre regiones con cargas de signos opuestos.</p>
\${step('HCl frente a CO₂','<p><b>HCl:</b> el Cl es más electronegativo que H; como es diatómica, el dipolo de enlace también es el dipolo molecular. Presenta London y dipolo–dipolo. <b>CO₂:</b> cada enlace C=O es polar, pero la molécula es lineal y los dipolos se cancelan. Presenta London, no dipolo–dipolo permanente. La diferencia de electronegatividad de un enlace, por sí sola, no determina la polaridad total.</p>')}
<p><b>No usar la regla «más diferencia de electronegatividad = más dipolo molecular» sin considerar geometría y longitud de enlace.</b> El momento dipolar depende de la distribución real de cargas y de la estructura de toda la molécula.</p>
\`);

  add('puentes','05 · Puentes de hidrógeno','INTERACCIÓN ESPECÍFICA',\`
<h3>¿Cuándo aparecen?</h3>
<p>El <b>puente de hidrógeno</b> es una interacción atractiva específica en la que un H unido covalentemente a un átomo electronegativo —habitualmente <b>N, O o F</b>— interactúa con una región rica en electrones, generalmente un <b>par libre</b> de N, O o F de otra molécula. <b>Par libre:</b> dos electrones de valencia que no forman parte de un enlace. La interacción tiene contribuciones electrostáticas y de otras naturalezas; no es un nuevo enlace covalente ordinario entre las dos moléculas.</p>
\${table(['Sustancia','¿Puentes H entre sus moléculas?','Razón'],[
['H₂O','Sí','Enlaces O–H y pares libres en O'],
['HF','Sí','Enlace H–F y pares libres en F'],
['NH₃','Sí','Enlaces N–H y par libre en N'],
['H₂S','No, en la clasificación escolar','H está unido a S; no cumple el criterio N/O/F'],
['CH₄','No','H unido a C'],
['PH₃','No, en la clasificación escolar','H unido a P']])}
\${step('Por qué el agua es líquida y H₂S gaseoso a temperatura ambiente','<p><b>1.</b> Las dos moléculas son angulares y polares. <b>2.</b> Ambas tienen London y dipolo–dipolo. <b>3.</b> El agua, además, forma una red extensa de puentes de hidrógeno. <b>4.</b> Se requiere más energía para separar sus moléculas y pasar al gas, lo que eleva su temperatura de ebullición. H₂S no forma esa red de puentes de H.</p>')}
\`);

  add('propiedades','06 · Propiedades físicas y solubilidad','APLICACIONES',\`
<h3>Puntos de fusión y ebullición</h3>
<p><b>Punto de fusión:</b> temperatura a la que un sólido y su líquido coexisten en equilibrio a una presión determinada. <b>Punto de ebullición:</b> temperatura a la que la presión de vapor del líquido iguala la presión externa. <b>Vaporización:</b> transformación de líquido a gas. Cuanto mayores sean las atracciones entre partículas comparables, generalmente más energía se necesita para separarlas y mayor es el punto de ebullición.</p>
<p>En una <b>red iónica</b> como KCl hay cationes y aniones unidos electrostáticamente en un cristal, no moléculas discretas de KCl. En un <b>metal</b> como Cu hay enlace metálico y electrones deslocalizados; en una <b>red covalente</b> como SiO₂ se extienden enlaces covalentes por el sólido. No comparar estas redes como si solo tuvieran fuerzas intermoleculares.</p>
\${table(['Sustancia','Partículas e interacción dominante','Consecuencia'],[
['CH₄','Moléculas pequeñas y apolares; London débiles','Gas, ebullición muy baja'],
['Cl₂','Moléculas apolares más polarizables; London','Hierve más alto que CH₄'],
['CCl₄','Moléculas apolares grandes; London más intensas','Líquido a temperatura ambiente'],
['H₂O','Moléculas polares; puentes de H, dipolo–dipolo y London','Ebullición alta para su masa'],
['KCl','Red de K⁺ y Cl⁻','Altos puntos de fusión y ebullición']])}
<h3>Solubilidad: no basta decir «semejante disuelve semejante»</h3>
<p><b>Solubilidad:</b> cantidad máxima de soluto que puede disolverse en un solvente a temperatura y presión dadas. <b>Soluto:</b> sustancia que se incorpora; <b>solvente:</b> medio en que se incorpora. Disolver requiere separar partículas del soluto y del solvente y formar nuevas interacciones favorables. El balance energético y el aumento o disminución de desorden determinan si la mezcla resulta favorable.</p>
<p><b>Ion–dipolo:</b> atracción entre un ion y una molécula polar; explica la hidratación de Na⁺ y Cl⁻ al disolver NaCl en agua. <b>Dipolo inducido:</b> una molécula polar o un ion deforma la nube electrónica de una especie apolar; puede favorecer solubilidades parciales. El I₂, apolar y polarizable, se disuelve mejor en varios solventes orgánicos que en agua; CCl₄ es apolar.</p>
\${warn('Atención a las reacciones químicas','<p>Que una sustancia desaparezca en agua no siempre significa una simple disolución: Na₂O reacciona con agua formando NaOH; HCl se ioniza en agua; BF₃ y BCl₃ se hidrolizan. No clasificar esos casos solo por polaridad.</p>')}
<h3>Conductividad eléctrica</h3>
<p><b>Conductor eléctrico:</b> material que permite transportar carga. Los metales conducen mediante electrones móviles; las sales iónicas conducen cuando están fundidas o disueltas porque sus iones pueden moverse. Las sustancias moleculares puras normalmente conducen poco, pero algunas generan iones al reaccionar con agua, como HCl.</p>
\`);

  add('ejercitacion','Ejercitación resuelta','02',`
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

  window.ET27_QI4.units.push({id:'fuerzas-intermoleculares',part:'teoria',n:5,title:'Polaridad y fuerzas intermoleculares',short:'Fuerzas intermoleculares',lead:'Polaridad de enlaces y de moléculas, fuerzas de London, dipolo–dipolo y puente de hidrógeno, y cómo explican puntos de ebullición, solubilidad y tipos de sólidos. Por ahora con la ejercitación resuelta; la teoría está pendiente.',sections:s,exercises:ex});
})();
