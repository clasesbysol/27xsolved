// 27xSOLved · Química Inorgánica 4.º · Teoría · Unidad 5 (polaridad y fuerzas intermoleculares)
// Evaluación «Desinfección del agua · microondas» resuelta + un modelo parecido (variado) para practicar.
(function(){
  'use strict';
  const K=window.ET27Kit,q=window.ET27_QI4;if(!K||!q)return;
  const u=q.units.find(x=>x.id==='fuerzas-intermoleculares');if(!u)return;
  const {idea,warn,note,step,table}=K;
  u.exercises=u.exercises||[];
  const add=(group,n,tag,title,statement,solution,answer)=>u.exercises.push({n,group,tag,title,statement,solution,answer});
  const trepev=(rows)=>table(['Especie','Lewis (central)','Regiones','Geometría electrónica','Geometría molecular','Ángulo'],rows);

  // =====================================================================
  // EVALUACIÓN TOMADA
  // =====================================================================
  add('eval','EV1','EVALUACIÓN · 1 (3,5 p)','TREPEV de los subproductos de la cloración',
   `<p>La desinfección del agua para consumo elimina organismos patógenos. El método más común es la <b>cloración</b>, con cloro, dióxido de cloro o cloruro de tionilo (SOCl₂). Pueden formarse subproductos nocivos como el <b>dibromoclorometano</b> (CHClBr₂) o la <b>cloramina</b> (NH₂Cl).</p><p>a) Completá el cuadro y justificá con TREPEV: geometría electrónica, geometría molecular y ángulo de enlace de dióxido de cloro, dibromoclorometano, cloramina y cloruro de tionilo.</p>`,
   trepev([
    ['ClO₂','Cl unido a 2 O; 1 par libre y 1 electrón desapareado (19 e⁻ de valencia)','4 (2 enlaces + 1 par + 1 e⁻ solo)','tetraédrica','angular','≈ 117° (real)'],
    ['CHClBr₂','C unido a H, Cl y 2 Br; sin pares libres','4 (4 enlaces)','tetraédrica','tetraédrica','≈ 109,5°'],
    ['NH₂Cl','N unido a 2 H y 1 Cl; 1 par libre','4 (3 enlaces + 1 par)','tetraédrica','piramidal trigonal','&lt; 109,5° (≈ 107°)'],
    ['SOCl₂','S unido a O (doble) y 2 Cl; 1 par libre','4 (3 enlaces + 1 par)','tetraédrica','piramidal trigonal','&lt; 109,5° (≈ 106° O–S–Cl, ≈ 96° Cl–S–Cl)']
   ])+step('Cómo se cuenta','<p>Para TREPEV se cuentan las <b>regiones de electrones</b> alrededor del átomo central: cada enlace (simple, doble o triple) vale <b>una</b> región, y cada par libre también. 4 regiones → geometría electrónica <b>tetraédrica</b>. La molecular se nombra mirando sólo los átomos: si hay pares libres, la forma cambia y el ángulo se cierra porque un par libre repele más que un par de enlace.</p>')
   +step('Dióxido de cloro: el caso raro','<p>Tiene 7 + 6 + 6 = <b>19 electrones</b>: número impar, así que queda un electrón sin aparear (es un radical). Alrededor del Cl hay 2 enlaces, 1 par libre y 1 electrón solo → 4 regiones, electrónica tetraédrica y molecular <b>angular</b>. Como un electrón solo repele <b>menos</b> que un par, el ángulo queda más abierto que 109,5°: el valor medido es 117,5°. Si en clase se cuenta el electrón solo como un par, se acepta “angular, cercano a 109,5°”.</p>')
   +step('Cloruro de tionilo','<p>S tiene 6 e⁻ de valencia: usa 2 en el doble enlace con O, 1 con cada Cl y le queda <b>1 par libre</b>. El doble enlace cuenta como una sola región → 3 enlaces + 1 par = 4 regiones: piramidal trigonal, como el NH₃.</p>'),
   'ClO₂ angular · CHClBr₂ tetraédrica · NH₂Cl y SOCl₂ piramidales trigonales (las cuatro con geometría electrónica tetraédrica).');

  add('eval','EV2a','EVALUACIÓN · 2a (V/F)','El IF₄⁻ es piramidal cuadrado',
   '<p>Indicá si es verdadera o falsa y justificá: “El anión IF₄⁻ tiene una geometría electrónica octaédrica y una geometría molecular piramidal cuadrada.”</p>',
   step('Contar electrones','<p>I aporta 7, cada F 7 (4 × 7 = 28) y la carga suma 1: <b>36 e⁻</b>. El I forma 4 enlaces con F y le quedan <b>2 pares libres</b>.</p>')
   +step('TREPEV','<p>4 enlaces + 2 pares = <b>6 regiones</b> → geometría electrónica <b>octaédrica</b> (esa parte está bien). Los 2 pares libres se ubican opuestos (a 180°) para repelerse lo menos posible, y los 4 F quedan en un plano: geometría molecular <b>cuadrado plana</b>, con ángulos de 90°.</p>')
   +note('¿Cuándo es piramidal cuadrada?','<p>Con 5 enlaces y 1 par libre (6 regiones), como en el IF₅ o el BrF₅.</p>'),
   '<b>FALSA</b>: la electrónica es octaédrica, pero la molecular es cuadrado plana (piramidal cuadrada sería con 5 enlaces y 1 par).');

  add('eval','EV2b','EVALUACIÓN · 2b (V/F)','Momento dipolar de la cloramina frente al amoníaco',
   '<p>Indicá si es verdadera o falsa y justificá: “La cloramina utilizada en la desinfección de aguas tiene un momento dipolar superior al del amoníaco.”</p>',
   step('Las dos moléculas tienen la misma forma','<p>NH₃ y NH₂Cl son piramidales trigonales (N con 3 enlaces y 1 par libre): las dos son <b>polares</b>. La diferencia está en los enlaces.</p>')
   +table(['Enlace','ΔEN (Pauling)','Polaridad'],[['N–H','3,0 − 2,1 = 0,9','polar: el δ⁻ está en el N'],['N–Cl','3,0 − 3,0 ≈ 0','prácticamente no polar']])
   +step('Conclusión','<p>En el NH₃ los <b>tres</b> dipolos N–H apuntan hacia el N, del mismo lado que el par libre, y se suman. En la cloramina uno de esos enlaces se reemplaza por un N–Cl casi no polar: quedan sólo dos dipolos N–H que se suman. El momento dipolar resultante es <b>menor</b> que el del amoníaco.</p>'),
   '<b>FALSA</b>: el enlace N–Cl es casi no polar (ΔEN ≈ 0), así que la cloramina suma menos dipolos que el NH₃ y es menos polar.');

  add('eval','EV3a','EVALUACIÓN · 3a (4,5 p en total)','¿Qué se calienta en el microondas?',
   '<p>Las microondas generan un campo eléctrico que hace rotar muy rápido a las <b>moléculas polares</b> (como el agua), y eso aumenta su temperatura. Indicá cuáles de estas sustancias se calentarán en el microondas, justificando: i) hidroxilamina (NH₂OH) · ii) cianógeno (C₂N₂) · iii) tricloruro de fósforo (PCl₃) · iv) cloro (Cl₂).</p>',
   table(['Sustancia','Forma','¿Polar?','¿Se calienta?'],[
    ['NH₂OH','N piramidal (3 enlaces + 1 par) y O angular (2 enlaces + 2 pares); enlaces N–H y O–H muy polares','sí','<b>sí</b>'],
    ['C₂N₂ (N≡C–C≡N)','lineal y simétrica: cada C tiene 2 regiones','no: los dipolos C≡N se anulan','no'],
    ['PCl₃','piramidal trigonal (P con 3 enlaces + 1 par libre)','sí: los dipolos P–Cl no se anulan','<b>sí</b>'],
    ['Cl₂','diatómica de un solo elemento','no: ΔEN = 0','no']
   ])+step('La clave','<p>Sólo una molécula con momento dipolar neto se orienta con el campo eléctrico y rota. Para saber si es polar hay que mirar <b>las dos cosas</b>: si los enlaces son polares y si la geometría los anula (simétrica) o no.</p>'),
   'Se calientan la hidroxilamina y el PCl₃ (polares). El cianógeno (lineal simétrico) y el Cl₂ no.');

  add('eval','EV3b','EVALUACIÓN · 3b','Fuerzas intermoleculares y quién hierve primero',
   '<p>Para las sustancias del punto anterior indicá qué interacciones intermoleculares presentan. ¿Cuál de las que se calientan en el microondas comenzará a hervir primero? Justificá.</p>',
   table(['Sustancia','Fuerzas intermoleculares'],[
    ['NH₂OH','London + dipolo–dipolo + <b>puente de hidrógeno</b> (H unido a N y a O, que además tienen pares libres)'],
    ['C₂N₂','sólo London (dipolo instantáneo–dipolo inducido)'],
    ['PCl₃','London + dipolo–dipolo (no tiene H unido a N, O o F: no hay puente de H)'],
    ['Cl₂','sólo London']
   ])+step('¿Cuál hierve primero?','<p>Entre las que se calientan (NH₂OH y PCl₃), hierve primero la que tiene <b>fuerzas intermoleculares más débiles</b>: el <b>PCl₃</b>. La hidroxilamina forma puentes de hidrógeno, que son las interacciones más fuertes entre moléculas: hace falta más energía para separarlas y pasar al estado gaseoso.</p>')
   +note('Dato','<p>El PCl₃ hierve a 76 °C. La hidroxilamina es un sólido a temperatura ambiente (funde a 33 °C) y se descompone al calentarla mucho, justamente porque sus moléculas están muy unidas por puentes de H.</p>'),
   'NH₂OH: London, dipolo–dipolo y puente de H · C₂N₂ y Cl₂: London · PCl₃: London y dipolo–dipolo. Hierve primero el PCl₃.');

  add('eval','EV3c','EVALUACIÓN · 3c','Interacciones del PCl₃ con otras sustancias',
   '<p>Indicá qué interacciones intermoleculares habrá entre el tricloruro de fósforo y: i) cloruro de sodio · ii) agua · iii) tetracloruro de carbono.</p>',
   table(['PCl₃ con…','Qué es la otra sustancia','Interacción'],[
    ['NaCl','compuesto iónico (Na⁺ y Cl⁻)','<b>ion–dipolo</b> (+ London)'],
    ['H₂O','molécula polar','<b>dipolo–dipolo</b> (+ London)'],
    ['CCl₄','molécula no polar (tetraédrica simétrica)','<b>dipolo–dipolo inducido</b> (+ London)']
   ])+step('Por qué no hay puente de H con el agua','<p>Para que haya puente de hidrógeno entre las dos sustancias, una tiene que aportar un H unido a N, O o F y la otra un átomo chico y muy electronegativo con par libre. El PCl₃ no tiene H, y su P y sus Cl no son buenos aceptores: la interacción es dipolo–dipolo.</p>')
   +warn('Detalle químico','<p>En la realidad el PCl₃ no se queda “mezclado” con el agua: reacciona con ella (hidrólisis: PCl₃ + 3 H₂O → H₃PO₃ + 3 HCl). La pregunta apunta a las fuerzas intermoleculares, y eso es lo que se responde.</p>'),
   'NaCl: ion–dipolo · agua: dipolo–dipolo · CCl₄: dipolo–dipolo inducido (en los tres, además, London).');

  // =====================================================================
  // MODELO PARA PRACTICAR (parecido, con otras sustancias)
  // =====================================================================
  add('modelo','MO1','MODELO · 1 (3,5 p)','TREPEV de la ozonización del agua',
   `<p>Otra forma de potabilizar el agua es la <b>ozonización</b>: se burbujea ozono (O₃), un oxidante muy fuerte. Si el agua tiene bromuro, puede formarse el ion <b>bromato</b> (BrO₃⁻), un subproducto tóxico. En aguas con amonio y cloro aparece también la <b>tricloramina</b> (NCl₃), responsable del “olor a pileta”, y en la industria se usa el <b>cloruro de sulfurilo</b> (SO₂Cl₂) como fuente de cloro.</p><p>a) Completá el cuadro y justificá con TREPEV: geometría electrónica, geometría molecular y ángulo de enlace de O₃, BrO₃⁻, NCl₃ y SO₂Cl₂.</p>`,
   trepev([
    ['O₃','O central con 1 enlace doble, 1 simple (resonancia) y 1 par libre','3 (2 enlaces + 1 par)','trigonal plana','angular','&lt; 120° (≈ 117°)'],
    ['BrO₃⁻','Br unido a 3 O; 1 par libre','4 (3 enlaces + 1 par)','tetraédrica','piramidal trigonal','&lt; 109,5° (≈ 104°)'],
    ['NCl₃','N unido a 3 Cl; 1 par libre','4 (3 enlaces + 1 par)','tetraédrica','piramidal trigonal','&lt; 109,5° (≈ 107°)'],
    ['SO₂Cl₂','S unido a 2 O (dobles) y 2 Cl; sin pares libres','4 (4 enlaces)','tetraédrica','tetraédrica','≈ 109,5° (algo deformada)']
   ])+step('Ozono','<p>El O central usa 2 de sus 6 electrones en el doble enlace, 1 en el simple, le queda 1 par libre y una carga formal +1. 3 regiones → trigonal plana; con un par libre la molécula es angular y el ángulo se cierra un poco debajo de 120°.</p>')
   +step('Bromato','<p>Br (7) + 3 O (18) + 1 por la carga = 26 e⁻. El Br forma enlaces con los 3 O y conserva <b>1 par libre</b> → como el NH₃: piramidal trigonal.</p>')
   +step('Cloruro de sulfurilo','<p>S usa sus 6 electrones en 2 dobles enlaces con O y 2 simples con Cl: no le quedan pares libres. 4 regiones de enlace → tetraédrica en las dos geometrías. Los ángulos no son exactamente 109,5° porque los dobles enlaces ocupan más lugar.</p>'),
   'O₃ angular (electrónica trigonal plana) · BrO₃⁻ y NCl₃ piramidales trigonales · SO₂Cl₂ tetraédrica.');

  add('modelo','MO2a','MODELO · 2a (V/F)','El XeF₄ es tetraédrico',
   '<p>Indicá si es verdadera o falsa y justificá: “El tetrafluoruro de xenón (XeF₄) tiene geometría electrónica octaédrica y geometría molecular tetraédrica.”</p>',
   step('Contar','<p>Xe aporta 8 electrones: usa 4 en los enlaces con F y le quedan 4, es decir <b>2 pares libres</b>. 4 enlaces + 2 pares = 6 regiones → electrónica <b>octaédrica</b>.</p>')
   +step('Forma','<p>Los dos pares se ubican opuestos y los 4 F quedan en un plano: <b>cuadrado plana</b>, ángulos de 90°. Tetraédrica sería con 4 regiones y ningún par libre (como el CH₄).</p>'),
   '<b>FALSA</b>: es octaédrica / cuadrado plana (igual que el IF₄⁻ de la evaluación: tienen la misma cantidad de electrones alrededor del central).');

  add('modelo','MO2b','MODELO · 2b (V/F)','Tricloramina frente al amoníaco',
   '<p>Indicá si es verdadera o falsa y justificá: “La tricloramina (NCl₃) es más polar que el amoníaco porque el cloro es más electronegativo que el hidrógeno.”</p>',
   step('Forma','<p>Las dos son piramidales trigonales: N con 3 enlaces y 1 par libre.</p>')
   +step('Enlaces','<p>N–H: ΔEN = 0,9, polar con δ⁻ en el N. N–Cl: ΔEN ≈ 0, casi no polar. Que el Cl sea más electronegativo que el H no importa: lo que cuenta es la <b>diferencia</b> con el átomo al que está unido, y el N y el Cl tienen electronegatividades casi iguales.</p>')
   +step('Resultado','<p>El NH₃ suma tres dipolos N–H importantes (μ ≈ 1,47 D). El NCl₃ tiene enlaces casi no polares: es apenas polar (μ ≈ 0,6 D).</p>'),
   '<b>FALSA</b>: el NCl₃ es mucho menos polar que el NH₃ porque el enlace N–Cl casi no tiene diferencia de electronegatividad.');

  add('modelo','MO3a','MODELO · 3a (4,5 p en total)','Solventes en el microondas',
   '<p>En un laboratorio se quiere usar un microondas para calentar solventes rápidamente (recordá que el microondas calienta las sustancias cuyas moléculas son polares). Indicá cuáles se calentarán, justificando: i) metanol (CH₃OH) · ii) diclorometano (CH₂Cl₂) · iii) disulfuro de carbono (CS₂) · iv) bromo (Br₂).</p>',
   table(['Sustancia','Forma','¿Polar?','¿Se calienta?'],[
    ['CH₃OH','C tetraédrico y O angular (2 enlaces + 2 pares); enlace O–H muy polar','sí','<b>sí</b>'],
    ['CH₂Cl₂','tetraédrica, pero con dos sustituyentes distintos (2 H y 2 Cl): los dipolos C–Cl no se anulan','sí','<b>sí</b>'],
    ['CS₂ (S=C=S)','lineal y simétrica','no: los dipolos se anulan','no'],
    ['Br₂','diatómica de un solo elemento','no: ΔEN = 0','no']
   ])+note('Comparalo con el CCl₄','<p>El CCl₄ también es tetraédrico, pero con los cuatro sustituyentes iguales: los dipolos se anulan y es no polar. En el CH₂Cl₂ la simetría se rompe.</p>'),
   'Se calientan el metanol y el diclorometano. CS₂ y Br₂, no.');

  add('modelo','MO3b','MODELO · 3b','Fuerzas intermoleculares y quién hierve primero',
   '<p>Indicá qué interacciones intermoleculares presentan las sustancias del punto anterior. Entre las que se calientan, ¿cuál comenzará a hervir primero? Justificá.</p>',
   table(['Sustancia','Fuerzas intermoleculares'],[
    ['CH₃OH','London + dipolo–dipolo + <b>puente de hidrógeno</b> (O–H)'],
    ['CH₂Cl₂','London + dipolo–dipolo'],
    ['CS₂','sólo London'],
    ['Br₂','sólo London']
   ])+step('¿Cuál hierve primero?','<p>El <b>diclorometano</b>: aunque sus moléculas son más pesadas, entre ellas no hay puente de hidrógeno. El metanol sí los forma y necesita más energía para pasar a gas. (Datos: CH₂Cl₂ hierve a 40 °C; CH₃OH, a 65 °C.)</p>'),
   'CH₃OH: London, dipolo–dipolo y puente de H · CH₂Cl₂: London y dipolo–dipolo · CS₂ y Br₂: London. Hierve primero el CH₂Cl₂.');

  add('modelo','MO3c','MODELO · 3c','Interacciones del diclorometano con otras sustancias',
   '<p>Indicá qué interacciones intermoleculares habrá entre el diclorometano y: i) bromuro de potasio · ii) metanol · iii) hexano (C₆H₁₄).</p>',
   table(['CH₂Cl₂ con…','Qué es la otra sustancia','Interacción'],[
    ['KBr','compuesto iónico (K⁺ y Br⁻)','<b>ion–dipolo</b> (+ London)'],
    ['CH₃OH','molécula polar','<b>dipolo–dipolo</b> (+ London)'],
    ['C₆H₁₄','molécula no polar (sólo C–C y C–H)','<b>dipolo–dipolo inducido</b> (+ London)']
   ])+step('¿Y el puente de H con el metanol?','<p>El CH₂Cl₂ no tiene H unido a N, O o F, así que no puede donar; sus Cl son aceptores muy débiles. Lo que domina es el dipolo–dipolo.</p>'),
   'KBr: ion–dipolo · metanol: dipolo–dipolo · hexano: dipolo–dipolo inducido (y London en todos).');

  // Secciones (después de la Guía 5)
  const i=u.sections.findIndex(s=>s.key==='qi-fi-guia5');
  u.sections.splice(i<0?u.sections.length:i+1,0,
   {key:'qi-fi-evaluacion',label:'Evaluación resuelta: desinfección del agua y microondas',kicker:'EVALUACIÓN · TREPEV · POLARIDAD · FUERZAS',html:`
<p>La evaluación de la unidad, punto por punto. Antes de mirar la resolución, intentá cada punto con el método de siempre: <b>contar regiones → geometría → ¿los dipolos se anulan? → fuerzas</b>.</p>
${idea('Lo que más se evalúa acá','<ul><li>Contar bien las regiones (un doble enlace es <b>una</b> región).</li><li>Distinguir geometría electrónica de molecular.</li><li>Polaridad = enlaces polares <b>y</b> geometría que no los anule.</li><li>Puente de H sólo con H unido a N, O o F.</li></ul>')}
<div data-qi-guide="eval"></div>`},
   {key:'qi-fi-modelo',label:'Modelo de evaluación para practicar (resuelto)',kicker:'MODELO · MISMA ESTRUCTURA, OTRAS SUSTANCIAS',html:`
<p>Un modelo con la misma estructura que la evaluación (cuadro de TREPEV, dos verdadero/falso y el problema del microondas) pero con otras sustancias. Hacelo como si fuera la prueba y después controlá con las resoluciones.</p>
<div data-qi-guide="modelo"></div>`});
})();
