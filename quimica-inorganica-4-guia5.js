// 27xSOLved · Química Inorgánica 4.º · Unidad 5 · GUÍA 5 «Geometría – Polaridad – Fuerzas intermoleculares».
// Consignas copiadas textualmente de la guía (Departamento de la Especialidad) y resolución desplegable por ejercicio.
// La teoría que usa está en quimica-inorganica-4-teoria-fuerzas.js (TREPEV, polaridad, fuerzas, propiedades, sólidos).
(function(){
  'use strict';
  const K=window.ET27Kit,q=window.ET27_QI4;if(!K||!q)return;
  const u=q.units.find(x=>x.id==='fuerzas-intermoleculares');if(!u)return;
  const {idea,warn,note,step,table,simple}=K;

  const ol=items=>`<ol type="a" class="kitList">${items.map(x=>`<li>${x}</li>`).join('')}</ol>`;
  const repaso=(key,label)=>`<p class="guideLink">🔗 Teoría: <button type="button" class="textButton" data-result-go="qi:fuerzas-intermoleculares:qi-fi-${key}">${label} →</button></p>`;
  const data=[];
  const ex=(n,title,statement,solution,answer)=>data.push({n:`G5-${n}`,group:'guia5',tag:`GUÍA 5 · EJERCICIO ${n}`,title,statement,solution,answer});
  const metodo=idea('Receta TREPEV','<p>Átomo central → electrones de valencia (± carga del ion) → Lewis → contar dominios del central (cada enlace = 1, cada par libre = 1) → AXₘEₙ → geometría.</p>');

  // ---------- 1 ----------
  ex(1,'Geometría electrónica y molecular',
   `<p>1. Utilizando TRePEV, predice la geometría electrónica y la geometría molecular de:</p>${ol(['Cloruro de Berilio','Trifluoruro de Boro','Tetrabromuro de Carbono','Amoniaco','Cianuro de Hidrogeno','Dióxido de Azufre','Agua','Metanal'])}`,
   repaso('teoria','Geometría molecular: TREPEV paso a paso')+metodo+
   step('a. Cloruro de berilio · BeCl₂',`<p>Be tiene 2 e⁻ de valencia y forma dos enlaces Be–Cl; no le quedan pares libres ${simple('el Be es una excepción: queda con 4 e⁻, no con 8')}.</p><p>Cl–Be–Cl → 2 dominios, 0 pares libres → <b>AX₂</b>.</p>`)+
   step('b. Trifluoruro de boro · BF₃',`<p>B tiene 3 e⁻ y forma tres enlaces B–F, sin pares libres ${simple('otra excepción: el B queda con 6 e⁻')}. 3 dominios → <b>AX₃</b>.</p>`)+
   step('c. Tetrabromuro de carbono · CBr₄',`<p>C tiene 4 e⁻ y forma cuatro enlaces C–Br. 4 dominios, 0 pares libres → <b>AX₄</b>.</p>`)+
   step('d. Amoníaco · NH₃',`<p>N tiene 5 e⁻: usa 3 en los enlaces N–H y le queda <b>1 par libre</b>. 4 dominios → <b>AX₃E</b>.</p>`)+
   step('e. Cianuro de hidrógeno · HCN',`<p>Lewis: H–C≡N: . El C es central, con un simple (con H) y un triple (con N). El triple cuenta como <b>un</b> dominio → 2 dominios → <b>AX₂</b>.</p>`)+
   step('f. Dióxido de azufre · SO₂',`<p>S tiene 6 e⁻: hace una unión doble con un O y otra con el segundo O (doble o coordinada, según cómo se dibuje) y le queda <b>1 par libre</b>. Pares libres = (6 − 4) ÷ 2 = 1 → 3 dominios → <b>AX₂E</b>.</p>`)+
   step('g. Agua · H₂O',`<p>O tiene 6 e⁻: usa 2 en los enlaces O–H y le quedan <b>2 pares libres</b>. 4 dominios → <b>AX₂E₂</b>.</p>`)+
   step('h. Metanal · H₂CO (formaldehído)',`<p>C central: dos enlaces C–H y un doble C=O. 3 dominios, sin pares libres → <b>AX₃</b>.</p>`)+
   step('Resumen',table(['Sustancia','AXₘEₙ','Geometría electrónica','Geometría molecular','Ángulo'],[
     ['a. BeCl₂','AX₂','lineal','lineal','180°'],
     ['b. BF₃','AX₃','trigonal plana','trigonal plana','120°'],
     ['c. CBr₄','AX₄','tetraédrica','tetraédrica','109,5°'],
     ['d. NH₃','AX₃E','tetraédrica','<b>piramidal</b>','≈ 107°'],
     ['e. HCN','AX₂','lineal','lineal','180°'],
     ['f. SO₂','AX₂E','trigonal plana','<b>angular</b>','≈ 119°'],
     ['g. H₂O','AX₂E₂','tetraédrica','<b>angular</b>','≈ 104,5°'],
     ['h. H₂CO','AX₃','trigonal plana','trigonal plana','≈ 120°']]))+
   warn('Error típico','<p>Cuando el central tiene pares libres, la geometría electrónica y la molecular <b>no</b> coinciden (NH₃, SO₂, H₂O).</p>'),
   'a. lineal/lineal · b. trigonal plana/trigonal plana · c. tetraédrica/tetraédrica · d. tetraédrica/piramidal · e. lineal/lineal · f. trigonal plana/angular · g. tetraédrica/angular · h. trigonal plana/trigonal plana');

  // ---------- 2 ----------
  ex(2,'Geometría de iones',
   `<p>2. Señala la geometría molecular y el ángulo de enlace de los siguientes iones:</p>${ol(['Catión amonio (NH₄⁺)','Anión Sulfito','Anión Sulfato','Anión Clorito','Catión Hidronio','Anión Carbonato','Anión Nitrato','Anión Yodato'])}`,
   repaso('teoria','TREPEV en iones y oxoaniones')+
   idea('Lo nuevo con los iones','<p>Al contar electrones se <b>suma</b> 1 e⁻ por cada carga negativa y se <b>resta</b> 1 e⁻ por cada carga positiva. Para los oxoaniones: pares libres del central = (e⁻ del central + carga negativa − 2 × número de O) ÷ 2.</p>')+
   step('a. NH₄⁺',`<p>N: 5 e⁻ + 4 H (4 e⁻) − 1 (carga +) = 8 e⁻ = 4 pares, los 4 en enlaces N–H. 4 dominios, 0 pares libres → <b>AX₄</b>.</p>`)+
   step('b. Sulfito · SO₃²⁻',`<p>Pares libres del S = (6 + 2 − 6) ÷ 2 = <b>1</b>. 3 O + 1 par libre = 4 dominios → <b>AX₃E</b>.</p>`)+
   step('c. Sulfato · SO₄²⁻',`<p>Pares libres del S = (6 + 2 − 8) ÷ 2 = <b>0</b>. 4 dominios → <b>AX₄</b>.</p>`)+
   step('d. Clorito · ClO₂⁻',`<p>Pares libres del Cl = (7 + 1 − 4) ÷ 2 = <b>2</b>. 2 O + 2 pares libres = 4 dominios → <b>AX₂E₂</b>.</p>`)+
   step('e. Hidronio · H₃O⁺',`<p>O: 6 e⁻ + 3 H − 1 (carga +) = 8 e⁻ = 4 pares: 3 enlaces O–H y <b>1 par libre</b> → <b>AX₃E</b> ${simple('igual que el NH₃')}.</p>`)+
   step('f. Carbonato · CO₃²⁻',`<p>C: 4 e⁻ + 2 = 6 e⁻ para unirse a 3 O (un doble y dos simples, con resonancia). Pares libres = (4 + 2 − 6) ÷ 2 = <b>0</b> → <b>AX₃</b>.</p>`)+
   step('g. Nitrato · NO₃⁻',`<p>N central unido a 3 O (un doble, uno simple y uno coordinado; resonancia). Sin pares libres → <b>AX₃</b>.</p>`)+
   step('h. Yodato · IO₃⁻',`<p>Pares libres del I = (7 + 1 − 6) ÷ 2 = <b>1</b> → 3 O + 1 par = <b>AX₃E</b> ${simple('igual que el sulfito')}.</p>`)+
   step('Resumen',table(['Ion','AXₘEₙ','Geometría molecular','Ángulo'],[
     ['a. NH₄⁺','AX₄','tetraédrica','109,5°'],
     ['b. SO₃²⁻','AX₃E','piramidal','≈ 107° (&lt; 109,5°)'],
     ['c. SO₄²⁻','AX₄','tetraédrica','109,5°'],
     ['d. ClO₂⁻','AX₂E₂','angular','≈ 105° (&lt; 109,5°)'],
     ['e. H₃O⁺','AX₃E','piramidal','≈ 107°'],
     ['f. CO₃²⁻','AX₃','trigonal plana','120°'],
     ['g. NO₃⁻','AX₃','trigonal plana','120°'],
     ['h. IO₃⁻','AX₃E','piramidal','≈ 107° (&lt; 109,5°)']]))+
   note('Sobre los ángulos','<p>Los valores con “≈” son los que predice TREPEV comparando con NH₃ y H₂O. Los medidos pueden variar algunos grados (por ejemplo, el clorito real ronda los 111°), pero lo que se pide es la predicción del modelo.</p>'),
   'a. tetraédrica 109,5° · b. piramidal ≈ 107° · c. tetraédrica 109,5° · d. angular ≈ 105° · e. piramidal ≈ 107° · f. trigonal plana 120° · g. trigonal plana 120° · h. piramidal ≈ 107°');

  // ---------- 3 ----------
  ex(3,'Completar el cuadro',
   `<p>3. Complete el siguiente cuadro:</p>${table(['Formula','Geometría Electrónica','Geometría Molecular','Angulo de Enlace','Polaridad'],[['H₂Se','','','',''],['BCl₃','','','',''],['CH₄','','','',''],['Br₂O','','','',''],['CS₂','','','',''],['CH₃Cl','','','',''],['TeO₂','','','','']])}`,
   repaso('polaridad','Polaridad de las moléculas')+
   step('1. Dominios de cada central',table(['Fórmula','Central','Pares libres del central','AXₘEₙ'],[
     ['H₂Se','Se (grupo 16, como el O del agua)','2','AX₂E₂'],
     ['BCl₃','B (3 e⁻, sin octeto)','0','AX₃'],
     ['CH₄','C','0','AX₄'],
     ['Br₂O','O (los Br son externos)','2','AX₂E₂'],
     ['CS₂','C (S=C=S)','0','AX₂'],
     ['CH₃Cl','C','0','AX₄'],
     ['TeO₂','Te (grupo 16, como el S del SO₂)','1','AX₂E']]))+
   step('2. Polaridad',`<p>Se mira si las flechas de los enlaces se anulan:</p><ul class="kitList">
     <li><b>H₂Se, Br₂O, TeO₂</b>: angulares (pares libres en el central) → los dipolos no se anulan → <b>polares</b>.</li>
     <li><b>BCl₃, CS₂</b>: enlaces polares pero geometría simétrica sin pares libres → se anulan → <b>apolares</b>.</li>
     <li><b>CH₄</b>: tetraédrica simétrica y C–H casi no polar → <b>apolar</b>.</li>
     <li><b>CH₃Cl</b>: tetraédrica pero con un átomo distinto (el Cl) → no se anulan → <b>polar</b>.</li></ul>`)+
   step('3. Cuadro completo',table(['Fórmula','Geometría electrónica','Geometría molecular','Ángulo de enlace','Polaridad'],[
     ['H₂Se','tetraédrica','angular','&lt; 109,5° (≈ 104,5°)','polar'],
     ['BCl₃','trigonal plana','trigonal plana','120°','apolar'],
     ['CH₄','tetraédrica','tetraédrica','109,5°','apolar'],
     ['Br₂O','tetraédrica','angular','&lt; 109,5° (≈ 104,5°)','polar'],
     ['CS₂','lineal','lineal','180°','apolar'],
     ['CH₃Cl','tetraédrica','tetraédrica','≈ 109,5°','polar'],
     ['TeO₂','trigonal plana','angular','&lt; 120° (≈ 119°)','polar']]))+
   note('Dato real','<p>Los ángulos medidos de moléculas con átomos grandes se apartan de la predicción (el H₂Se real tiene ≈ 91°). Para el cuadro se pone lo que predice TREPEV.</p>'),
   'H₂Se tetraédrica/angular/<109,5°/polar · BCl₃ trigonal plana/trigonal plana/120°/apolar · CH₄ tetraédrica/tetraédrica/109,5°/apolar · Br₂O tetraédrica/angular/<109,5°/polar · CS₂ lineal/lineal/180°/apolar · CH₃Cl tetraédrica/tetraédrica/≈109,5°/polar · TeO₂ trigonal plana/angular/<120°/polar');

  // ---------- 4 ----------
  ex(4,'Oxoaniones',
   `<p>4. Predice la geometría molecular y el ángulo de enlace del oxoanion tetraatomico del tercer elemento del grupo 16. Repite para los aniones: SiO₃²⁻ ; PO₄³⁻</p>`,
   step('1. Identificar el ion',`<p>Grupo 16: O, S, <b>Se</b>, Te, Po. El tercero es el <b>selenio</b>. “Tetraatómico” = 4 átomos en total: 1 Se + 3 O → <b>SeO₃²⁻ (selenito)</b> ${simple('el seleniato SeO₄²⁻ tiene 5 átomos, no sirve')}.</p>`)+
   step('2. Selenito · SeO₃²⁻',`<p>Pares libres del Se = (6 + 2 − 6) ÷ 2 = <b>1</b> → <b>AX₃E</b> → <b>piramidal</b>, ángulo ≈ 107° (&lt; 109,5°). Es igual al sulfito.</p>`)+
   step('3. SiO₃²⁻ (metasilicato)',`<p>Si: 4 e⁻ + 2 (carga) = 6 e⁻ → pares libres = (4 + 2 − 6) ÷ 2 = <b>0</b>. Tres O alrededor, sin pares libres → <b>AX₃</b> → <b>trigonal plana</b>, 120° ${simple('igual que el carbonato: C y Si están en el mismo grupo')}.</p>`)+
   step('4. PO₄³⁻ (fosfato)',`<p>Pares libres del P = (5 + 3 − 8) ÷ 2 = <b>0</b> → <b>AX₄</b> → <b>tetraédrica</b>, 109,5°.</p>`)+
   note('Para saber','<p>En los minerales los silicatos se unen en cadenas y redes; acá se analiza el ion aislado, como pide TREPEV.</p>'),
   'SeO₃²⁻ (selenito): piramidal ≈ 107° · SiO₃²⁻: trigonal plana 120° · PO₄³⁻: tetraédrica 109,5°');

  // ---------- 5 ----------
  ex(5,'Ordenar ángulos',
   `<p>5. Ordena las siguientes especies por ángulo de enlace creciente:</p>${ol(['SO₃','Anión Perbromato','I₂O','CO₂'])}`,
   step('1. Geometría de cada una',table(['Especie','Central y pares libres','AXₘEₙ','Geometría','Ángulo'],[
     ['a. SO₃','S: (6 − 6) ÷ 2 = 0','AX₃','trigonal plana','120°'],
     ['b. BrO₄⁻ (perbromato)','Br: (7 + 1 − 8) ÷ 2 = 0','AX₄','tetraédrica','109,5°'],
     ['c. I₂O','O central con 2 pares libres','AX₂E₂','angular','&lt; 109,5° (≈ 104,5°)'],
     ['d. CO₂','C: (4 − 4) ÷ 2 = 0','AX₂','lineal','180°']]))+
   step('2. Ordenar',`<p>De menor a mayor ángulo: los dos pares libres del I₂O cierran el ángulo por debajo del tetraédrico; después el tetraedro, el triángulo plano y la recta.</p>`)+
   idea('Regla rápida','<p>Más dominios → menor ángulo (180° → 120° → 109,5°). Con el mismo número de dominios, cada par libre lo achica un poco más.</p>'),
   'I₂O (&lt; 109,5°) &lt; BrO₄⁻ (109,5°) &lt; SO₃ (120°) &lt; CO₂ (180°) → c &lt; b &lt; a &lt; d');

  // ---------- 6 ----------
  ex(6,'Relacionar geometrías',
   `<p>6. Une los pares que se corresponden. Justifica la respuesta sobre las bases de la TRePEV:</p>${table(['','',''],[['a.','Fosfina','Lineal'],['b.','Bromuro de Berilio','Piramidal'],['c.','Sulfuro de Hidrogeno','Angular'],['d.','Triyoduro de Boro','Plana Triangular'],['e.','CH₃F','Tetraédrica']])}`,
   step('Justificación de cada par',table(['Sustancia','Lewis / dominios del central','AXₘEₙ','Geometría'],[
     ['a. Fosfina · PH₃','P (5 e⁻): 3 enlaces P–H + 1 par libre','AX₃E','<b>Piramidal</b>'],
     ['b. Bromuro de berilio · BeBr₂','Be (2 e⁻): 2 enlaces Be–Br, sin pares libres','AX₂','<b>Lineal</b>'],
     ['c. Sulfuro de hidrógeno · H₂S','S (6 e⁻): 2 enlaces S–H + 2 pares libres','AX₂E₂','<b>Angular</b>'],
     ['d. Triyoduro de boro · BI₃','B (3 e⁻): 3 enlaces B–I, sin pares libres','AX₃','<b>Plana triangular</b>'],
     ['e. CH₃F','C: 3 enlaces C–H + 1 enlace C–F, sin pares libres','AX₄','<b>Tetraédrica</b>']])),
   'a → Piramidal · b → Lineal · c → Angular · d → Plana triangular · e → Tetraédrica');

  // ---------- 7 ----------
  ex(7,'Polaridad de las especies anteriores',
   `<p>7. Indica y justifica si las moléculas del ejercicio anterior son polares o no.</p>`,
   repaso('polaridad','Polaridad de las moléculas')+
   step('Análisis',table(['Molécula','Geometría','¿Se anulan los dipolos?','Polaridad'],[
     ['PH₃','piramidal (1 par libre)','no: el par libre rompe la simetría','<b>polar</b> (débil: P–H casi no polar, ΔEN ≈ 0)'],
     ['BeBr₂','lineal','sí: dos Be–Br iguales y opuestos','<b>apolar</b>'],
     ['H₂S','angular (2 pares libres)','no: las dos flechas S–H se suman','<b>polar</b>'],
     ['BI₃','plana triangular','sí: tres B–I iguales a 120°','<b>apolar</b>'],
     ['CH₃F','tetraédrica','no: el C–F es mucho más polar que los C–H','<b>polar</b>']]))+
   idea('La pregunta clave','<p>¿El central tiene pares libres o átomos distintos alrededor? → polar. ¿Geometría simétrica con átomos iguales y sin pares libres? → apolar.</p>'),
   'Polares: PH₃, H₂S, CH₃F · Apolares: BeBr₂, BI₃');

  // ---------- 8 ----------
  ex(8,'Momento dipolar',
   `<p>8. Dadas las sustancias PF₃, cuyo µt = 0,55D, y BF₃ con µt = 0D, justifica la diferencia de valores del momento dipolar total que hay entre ellas.</p>`,
   step('1. Los enlaces son parecidos',`<p>En las dos moléculas hay tres enlaces <b>polares</b> con el F, que es el más electronegativo: cada enlace es una flecha que apunta al F. La diferencia no está en los enlaces sino en la <b>geometría</b>.</p>`)+
   step('2. BF₃',`<p>B (3 e⁻) forma 3 enlaces y no tiene pares libres → <b>AX₃, trigonal plana</b>. Las tres flechas iguales a 120° se compensan → <b>μ<sub>t</sub> = 0 D</b> (molécula apolar).</p>`)+
   step('3. PF₃',`<p>P (5 e⁻) forma 3 enlaces y le queda <b>1 par libre</b> → <b>AX₃E, piramidal</b>. Las tres flechas apuntan hacia la base de la pirámide y no se anulan → <b>μ<sub>t</sub> = 0,55 D</b> (polar).</p>`)+
   warn('Ojo','<p>μ<sub>t</sub> = 0 no significa que los enlaces sean apolares: los B–F son muy polares, pero se cancelan por simetría.</p>'),
   'BF₃ es trigonal plana y simétrica: los dipolos B–F se anulan (0 D). PF₃ tiene un par libre, es piramidal y los dipolos P–F no se anulan (0,55 D).');

  // ---------- 9 ----------
  ex(9,'Identificar fuerzas intermoleculares',
   `<p>9. Para las siguientes sustancias indicar que tipos de fuerzas intermoleculares presentan, justificando tu respuesta:</p>${ol(['Oxigeno','Cloruro de Berilio','Agua','Oxido Hipocloroso','Cloruro de Hidrogeno','Ácido Nítrico','Fosfina','Trióxido de azufre'])}`,
   repaso('fuerzas','Fuerzas intermoleculares')+
   idea('Método','<p>London siempre · + dipolo–dipolo si la molécula es polar · + puente de H si hay H unido a F, O o N.</p>')+
   step('Análisis',table(['Sustancia','¿Polar?','¿H unido a F, O, N?','Fuerzas'],[
     ['a. O₂','no (átomos iguales)','no','London'],
     ['b. BeCl₂','no (lineal, se anulan)','no','London'],
     ['c. H₂O','sí (angular)','<b>sí</b> (O–H)','London + dipolo–dipolo + <b>puente de H</b>'],
     ['d. Cl₂O (óxido hipocloroso)','sí (angular, AX₂E₂)','no (no tiene H)','London + dipolo–dipolo'],
     ['e. HCl','sí (H–Cl, ΔEN 0,96)','no (Cl no es F, O, N)','London + dipolo–dipolo'],
     ['f. HNO₃','sí','<b>sí</b> (tiene un O–H)','London + dipolo–dipolo + <b>puente de H</b>'],
     ['g. PH₃','sí, débil (piramidal)','no (P no es N)','London + dipolo–dipolo (débil)'],
     ['h. SO₃','no (trigonal plana, se anulan)','no','London']]))+
   note('Para saber','<p>El BeCl₂ sólido real forma cadenas; la guía lo trabaja como molécula lineal aislada, y así se responde.</p>'),
   'a. London · b. London · c. London + dip–dip + puente de H · d. London + dip–dip · e. London + dip–dip · f. London + dip–dip + puente de H · g. London + dip–dip · h. London');

  // ---------- 10 ----------
  ex(10,'Puentes de hidrógeno',
   `<p>10. Indica cuales de los siguientes compuestos presentan interacciones puente de hidrogeno entre sus moléculas y porque:</p>${ol(['H₂S','CH₄','AsH₃','H₂O','BH₃','HF','NH₃'])}`,
   repaso('fuerzas','Puente de hidrógeno')+
   step('Condición',`<p>Hace falta un <b>H unido directamente a F, O o N</b>: átomos chicos y muy electronegativos que dejan al H con una carga δ⁺ grande, y que además tienen pares libres para “recibir” el H de otra molécula.</p>`)+
   step('Análisis',table(['Compuesto','H unido a…','¿Puente de H?'],[
     ['a. H₂S','S (más grande y menos electronegativo que el O)','no'],
     ['b. CH₄','C (ΔEN con H casi nula)','no'],
     ['c. AsH₃','As','no'],
     ['d. H₂O','<b>O</b>','<b>sí</b>'],
     ['e. BH₃','B (menos electronegativo que el H)','no'],
     ['f. HF','<b>F</b>','<b>sí</b>'],
     ['g. NH₃','<b>N</b>','<b>sí</b>']])),
   'Presentan puente de H: H₂O, HF y NH₃ (H unido a O, F o N). No: H₂S, CH₄, AsH₃, BH₃.');

  // ---------- 11 ----------
  ex(11,'Puntos de ebullición',
   `<p>11. Dados los elementos ¹²T ; ¹⁷A ; ⁹J ordena las sustancias : J₂ ; A₂ ; TJ₂ por punto de ebullición creciente, identificando a las sustancias y justificando el orden propuesto.</p>`,
   step('1. Identificar los elementos',`<p>El número es el <b>número atómico Z</b> (protones):</p>`+table(['Letra','Z','Elemento'],[['T','12','Mg (magnesio, metal del grupo 2)'],['A','17','Cl (cloro, halógeno)'],['J','9','F (flúor, halógeno)']]))+
   step('2. Identificar las sustancias',table(['Sustancia','Es…','Tipo de partícula','Fuerzas a vencer al hervir'],[
     ['J₂','F₂ (flúor)','molécula apolar chica','London (débiles: pocos electrones)'],
     ['A₂','Cl₂ (cloro)','molécula apolar más grande','London (más intensas: más electrones, más polarizable)'],
     ['TJ₂','MgF₂ (fluoruro de magnesio)','red iónica Mg²⁺ / F⁻','atracciones iónicas (uniones químicas)']]))+
   step('3. Orden',`<p>F₂ y Cl₂ sólo tienen London; el Cl₂ es más grande, así que hierve más arriba. El MgF₂ es iónico: para hervirlo hay que romper la red, y queda muy por encima.</p>`)+
   idea('Datos reales','<p>F₂ −188 °C · Cl₂ −34 °C · MgF₂ ≈ 2260 °C.</p>'),
   'F₂ (J₂) &lt; Cl₂ (A₂) &lt; MgF₂ (TJ₂)');

  // ---------- 12 ----------
  ex(12,'Justificar hechos experimentales',
   `<p>12. Justifica los siguientes hechos experimentales:</p>${ol(['El I₂ es menos soluble en agua que el cloroformo (CH₃Cl)','La solubilidad de los halógenos en agua aumenta con el numero atómico en el grupo.','El sulfuro de hidrogeno es un gas a temperatura ambiente mientras que el agua es un líquido en estas condiciones.'])}`,
   repaso('propiedades','Ebullición, estado y solubilidad')+
   step('a. I₂ en agua y en cloroformo',`<p>Se lee como: el I₂ se disuelve <b>menos en agua que en cloroformo</b>.</p><ul class="kitList"><li>El I₂ es <b>apolar</b>: sólo tiene fuerzas de London, muy intensas porque es una molécula grande y polarizable.</li><li>El agua es <b>muy polar</b> y está unida por puentes de H: para meter I₂ habría que romper esos puentes y a cambio sólo se forman atracciones débiles. Por eso casi no se disuelve.</li><li>El cloroformo es <b>poco polar</b> y sus moléculas se atraen sobre todo por London, igual que el I₂: “lo semejante disuelve a lo semejante”.</li></ul>`)+
   note('Sobre la consigna','<p>La fórmula del cloroformo es <b>CHCl₃</b>; CH₃Cl es el clorometano. La justificación es la misma para los dos: son solventes de baja polaridad.</p>')+
   step('b. Halógenos en agua',`<p>Los halógenos (X₂) son moléculas <b>apolares</b>. Su interacción con el agua es de tipo <b>dipolo – dipolo inducido</b>: el dipolo del agua deforma la nube del halógeno. Al bajar en el grupo aumenta el número atómico, la molécula es <b>más grande y más polarizable</b>, se le induce un dipolo mayor y la atracción con el agua es más intensa: aumenta la solubilidad.</p>`)+
   note('Matiz','<p>Es la explicación que pide la guía y vale para Cl₂ → Br₂. El F₂ no se disuelve: <b>reacciona</b> con el agua. Y el I₂, aunque es el más polarizable, es un sólido y en agua resulta poco soluble (por eso el ítem a).</p>')+
   step('c. H₂S gas y H₂O líquida',`<p>Las dos moléculas son angulares y polares, pero sólo el <b>agua</b> forma <b>puentes de hidrógeno</b> (H unido a O). El H₂S tiene el H unido a S, que no es F, O ni N: sólo tiene London y dipolo–dipolo, mucho más débiles. Hace falta mucha más energía para separar las moléculas de agua: el H₂O hierve a 100 °C y el H₂S a ≈ −60 °C, por eso a temperatura ambiente uno es líquido y el otro gas.</p>`)+
   warn('Error típico','<p>Decir que el agua tiene puntos de ebullición altos “porque sus enlaces O–H son fuertes”: al hervir <b>no</b> se rompen los enlaces de la molécula, se separan las moléculas.</p>'),
   'a. I₂ apolar: se disuelve en un solvente de baja polaridad (London) y no en agua (puentes de H) · b. más Z → más polarizable → mayor dipolo inducido por el agua · c. el agua forma puentes de H y el H₂S no');

  // ---------- 13 ----------
  ex(13,'Relacionar tipos de unión',
   `<p>13. Une con flechas los nombres de las sustancias de la columna derecha con alguna característica de las uniones entre sus partículas:</p>${table(['','',''],[['a.','Sus moléculas forman puente de hidrogeno.','Grafito'],['b.','Conduce la electricidad en estado líquido, pero no en estado sólido.','Metano'],['c.','Sus moléculas presentan fuerzas dip-dip, pero no puentes de Hidrogeno.','Cobre'],['d.','Conduce el calor y la corriente eléctrica en estado sólido.','Oxido de bromo'],['e.','No metal que conduce la corriente eléctrica y está formado por redes covalentes.','HF'],['f.','Sus moléculas presentan únicamente fuerzas de London.','Cloruro de Potasio']])}`,
   repaso('solidos','Tipos de sólidos')+
   step('Primero, qué es cada sustancia',table(['Sustancia','Tipo','Partículas y fuerzas'],[
     ['Grafito','covalente de red (no metal)','láminas de C con un electrón deslocalizado por átomo → conduce'],
     ['Metano · CH₄','molecular apolar','sólo London'],
     ['Cobre · Cu','metálico','mar de electrones → conduce sólido'],
     ['Óxido de bromo · Br₂O','molecular polar (angular), sin H','London + dipolo–dipolo, sin puente de H'],
     ['HF','molecular polar con H–F','puente de hidrógeno'],
     ['Cloruro de potasio · KCl','iónico','red de K⁺ y Cl⁻: conduce sólo fundido o disuelto']]))+
   step('Pares',table(['Característica','Sustancia'],[
     ['a. Puente de hidrógeno','<b>HF</b>'],
     ['b. Conduce en estado líquido, no en sólido','<b>Cloruro de potasio</b>'],
     ['c. Dipolo–dipolo, pero no puente de H','<b>Óxido de bromo</b>'],
     ['d. Conduce calor y corriente en estado sólido','<b>Cobre</b>'],
     ['e. No metal conductor, red covalente','<b>Grafito</b>'],
     ['f. Sólo fuerzas de London','<b>Metano</b>']])),
   'a → HF · b → Cloruro de potasio · c → Óxido de bromo · d → Cobre · e → Grafito · f → Metano');

  // ---------- 14 ----------
  ex(14,'Solubilidad en agua y CCl₄',
   `<p>14. ¿Cuáles de las sustancias de los puntos 1) y 3) son solubles en agua? ¿Cuáles lo son en CCl₄? ¿Por qué?</p>`,
   repaso('propiedades','Solubilidad: lo semejante disuelve a lo semejante')+
   step('1. El criterio',`<p>El <b>agua</b> es polar y forma puentes de H: disuelve sustancias <b>polares</b>. El <b>CCl₄</b> es apolar (tetraédrico simétrico): disuelve sustancias <b>apolares</b>, porque entre ellos sólo hay London.</p>`)+
   step('2. Clasificación',table(['Sustancia (punto)','Polaridad','Se disuelve en'],[
     ['BeCl₂ (1a)','apolar','CCl₄'],
     ['BF₃ (1b)','apolar','CCl₄'],
     ['CBr₄ (1c)','apolar','CCl₄'],
     ['NH₃ (1d)','polar + puente de H','agua'],
     ['HCN (1e)','polar','agua'],
     ['SO₂ (1f)','polar','agua'],
     ['H₂O (1g)','—','es el solvente (no se mezcla con CCl₄)'],
     ['H₂CO (1h)','polar (acepta puentes de H del agua)','agua'],
     ['H₂Se (3)','polar','agua'],
     ['BCl₃ (3)','apolar','CCl₄'],
     ['CH₄ (3)','apolar','CCl₄'],
     ['Br₂O (3)','polar','agua'],
     ['CS₂ (3)','apolar','CCl₄'],
     ['CH₃Cl (3)','polar (poco)','agua (poco); también se mezcla con CCl₄'],
     ['TeO₂ (3)','polar','agua (según el criterio)']]))+
   note('En la realidad','<p>BF₃, BCl₃ y BeCl₂ no se disuelven simplemente en agua: <b>reaccionan</b> con ella (hidrólisis). El TeO₂ real es un sólido de red y casi no se disuelve. El criterio de polaridad es lo que pide la guía.</p>'),
   'En agua (polares): NH₃, HCN, SO₂, H₂CO, H₂Se, Br₂O, CH₃Cl, TeO₂ · En CCl₄ (apolares): BeCl₂, BF₃, CBr₄, BCl₃, CH₄, CS₂ · Lo semejante disuelve a lo semejante.');

  u.exercises=(u.exercises||[]).filter(e=>e.group!=='guia5');
  u.exercises.push(...data);
  u.sections=u.sections.filter(s=>s.key!=='qi-fi-guia5');
  u.sections.push({key:'qi-fi-guia5',label:'Más ejercicios · Guía 5',kicker:'GEOMETRÍA · POLARIDAD · FUERZAS',html:`
<p>Los 14 ejercicios de la <b>Guía de Ejercitación “Geometría – Polaridad – Fuerzas Intermoleculares”</b> (4.º año, Química Inorgánica), con las consignas tal como están en la guía. Intentá cada uno antes de abrir la resolución.</p>
${idea('Todo sale de tres preguntas','<ol class="kitList"><li>¿Qué <b>forma</b> tiene? (TREPEV: dominios y pares libres del central)</li><li>¿Es <b>polar</b>? (¿se anulan las flechas de los enlaces?)</li><li>¿Qué <b>fuerzas</b> hay entre las partículas? (London, dipolo–dipolo, puente de H, o uniones químicas si es iónico, metálico o red covalente)</li></ol>')}
<div data-qi-guide="guia5"></div>
`});
})();
