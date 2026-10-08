// 27xSOLved · Química Inorgánica 4.º · Evaluaciones y material de clase sumado a los TP 4 y 5
// Fuente: prueba de TP «Hidrógeno y oxígeno 2», resumen de evaluación de H y O, evaluación TP 5 (tema 2),
// cuestionario con respuestas que circulan y apuntes de redox. Respuestas revisadas y corregidas.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {chain,idea,warn,fix,note,step,table,figure}=K;
  const {rx,rxs,f,vira,swatch,pic,punch,svg}=Q;
  const R=String.raw;
  const unit=id=>window.ET27_QI4.units.find(u=>u.id===id);
  const insertBefore=(u,key,sec)=>{const i=u.sections.findIndex(s=>s.key===key);u.sections.splice(i<0?u.sections.length:i,0,sec)};
  const ev=(u,n,title,statement,solution,answer)=>u.exercises.push({n,group:'eval',tag:`EVALUACIÓN · ${n}`,title,statement,solution,answer});
  const corr=(title,html)=>fix(title,html);

  // =====================================================================
  // TP 4 · EVALUACIONES
  // =====================================================================
  const tp4=unit('tp4');
  if(tp4){
    insertBefore(tp4,'qi-tp4-practica',{key:'qi-tp4-evaluaciones',label:'Evaluaciones y preguntas de examen',kicker:'TP 4 · EVALUACIONES',html:`
<p>Preguntas tomadas de la <b>prueba de TP “Hidrógeno y oxígeno” (tema 2)</b> y del resumen de evaluación que circula entre los alumnos. Cada respuesta está revisada: cuando la versión que circula tiene un error, se marca en un recuadro <b>✎</b>.</p>
${idea('Cómo se corrige una pregunta de TP','<p>Casi siempre piden lo mismo: <b>esquema o descripción</b> del ensayo, <b>observación</b> (color, gas, precipitado), <b>ecuación balanceada</b> y la <b>propiedad</b> que demuestra. Si falta alguna de las cuatro, la respuesta queda incompleta.</p>')}
<div data-qi-guide="eval"></div>`});

    ev(tp4,'E1','Aparato para obtener hidrógeno','Realizá el esquema del aparato empleado para la obtención de hidrógeno y nombrá las consideraciones importantes para su uso.',
      pic('generador-h2.webp','Aparato generador de hidrógeno','Aparato de la guía del TP 4.')+
      step('Partes',table(['Parte','Función'],[['Tubo de ensayos con granallas de Zn, sujeto con agarradera al pie universal','recipiente de reacción (generador)'],['Ácido clorhídrico 18 % (≈ 6 M)','reactivo que se agrega al final'],['Tapón con tubo acodado (de desprendimiento)','lleva el gas hasta la cuba'],['Cuba hidroneumática con agua','permite recoger el gas'],['Tubos llenos de agua, invertidos en la cuba','colectores: el H₂ desplaza el agua']]))+
      step('Consideraciones',`<ul><li>Pedir al docente que revise el aparato <b>antes</b> de agregar el ácido; agregarlo y <b>tapar enseguida</b>.</li><li>Verificar que no haya pérdidas: el gas se escapa por cualquier unión floja.</li><li>Se recoge por <b>desplazamiento de agua</b> porque el H₂ es casi insoluble.</li><li>Descartar el primer tubo: lleva el aire que había en el aparato.</li><li><b>Nunca acercar una llama al generador</b>: la mezcla H₂ + aire es explosiva.</li></ul>`)+
      rx('Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)↑')+
      corr('Lo que circula','<p>“El hidrógeno se puede recolectar en el mismo aparato porque es menos denso que el aire y se eleva”: está mezclado. En el TP se recoge <b>desplazando agua</b> (por ser poco soluble). Que sea menos denso explica por qué, si se recogiera desplazando aire, el tubo va <b>boca abajo</b>.</p>'),
      'Generador (tubo con Zn + HCl) → tubo acodado → tubo colector invertido en la cuba hidroneumática; recolección por desplazamiento de agua, sin llamas cerca.');

    ev(tp4,'E2','¿Por qué el Zn reacciona con HCl y el Cu no?','Explicá por qué el zinc reacciona con ácido clorhídrico liberando hidrógeno y el cobre no.',
      step('Potenciales de reducción',table(['Par','E° (V)'],[['Zn²⁺/Zn','−0,76'],['H⁺/H₂','0,00'],['Cu²⁺/Cu','+0,34']])+'<p>Un metal con E° <b>menor</b> que el del hidrógeno (negativo) es más reductor que el H₂: le cede electrones al H⁺ y lo convierte en H₂. Un metal con E° positivo no puede hacerlo.</p>')+
      step('Zinc: sí',rxs(['Zn -> Zn^2+ + 2 e^-','oxidación'],['2 H^+ + 2 e^- -> H2','reducción'],['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)']))+
      step('Cobre: no','<p>E°(Cu²⁺/Cu) = +0,34 V &gt; 0: el H⁺ no es un oxidante suficiente. Para disolver cobre hace falta un ácido <b>oxidante</b> (HNO₃, TP 5), que no libera H₂.</p>'+rx('Cu(s) + HCl(ac) -> no reacciona')),
      'Zn (E° = −0,76 V) desplaza al hidrógeno; Cu (E° = +0,34 V) no.');

    ev(tp4,'E3','Hidrógeno con aluminio y ácido clorhídrico','Explicá la obtención de hidrógeno a partir de aluminio y ácido clorhídrico. Escribí la ecuación balanceada.',
      step('Por qué ocurre','<p>E°(Al³⁺/Al) ≈ −1,66 V: el aluminio es mucho más reductor que el hidrógeno y lo desplaza del ácido.</p>')+
      step('Ion-electrón',rxs(['Al -> Al^3+ + 3 e^-','× 2'],['2 H^+ + 2 e^- -> H2','× 3'],['2 Al + 6 H^+ -> 2 Al^3+ + 3 H2','6 e⁻ en cada lado'],['2 Al(s) + 6 HCl(ac) -> 2 AlCl3(ac) + 3 H2(g)','molecular']))+
      note('Detalle de laboratorio','<p>Al principio la reacción tarda: el aluminio está cubierto por una capa de Al₂O₃ que el ácido tiene que disolver primero.</p>'),
      '2 Al + 6 HCl → 2 AlCl₃ + 3 H₂');

    ev(tp4,'E4','Hidruros iónicos con agua y con ácido','Explicá cómo se obtiene hidrógeno a partir de un hidruro (KH o NaH) con agua y con ácido clorhídrico. ¿Qué se observa si el agua tiene fenolftaleína?',
      step('Reacciones',rxs(['KH(s) + H2O(l) -> KOH(ac) + H2(g)↑'],['KH(s) + HCl(ac) -> KCl(ac) + H2(g)↑'],['NaH(s) + H2O(l) -> NaOH(ac) + H2(g)↑','el del TP 4']))+
      step('Interpretación','<p>El ion <b>H⁻</b> (n.o. −1) es <b>básico</b> (capta el H⁺ del agua) y <b>reductor</b> (pasa a 0 en el H₂). Las reacciones son rápidas y muy exotérmicas.</p>')+
      step('Observación',`<p>Burbujeo intenso, el tubo se calienta y la fenolftaleína pasa de incolora a ${swatch('#d63384','fucsia')} por el hidróxido formado.</p>`),
      'MH + H₂O → MOH + H₂ (fucsia con fenolftaleína) · MH + HCl → MCl + H₂');

    ev(tp4,'E5','Agua oxigenada con ioduro en medio ácido','Escribí la reacción redox del H₂O₂ con KI en medio ácido, explicá qué se observa y qué pasa al agregar cloroformo.',
      step('Ion-electrón',rxs(['2 I^- -> I2 + 2 e^-','oxidación'],['H2O2 + 2 H^+ + 2 e^- -> 2 H2O','reducción: O de −1 a −2'],['H2O2 + 2 I^- + 2 H^+ -> I2 + 2 H2O'],['H2O2 + 2 KI + H2SO4 -> I2 + K2SO4 + 2 H2O','molecular']))+
      step('Observación',`<p>La solución se pone ${swatch('#a0662a','parda')} (I₂). Al agitar con cloroformo, el I₂ pasa a la capa orgánica, que se ve ${swatch('#8a3fb3','violeta')}.</p>`),
      'H₂O₂ oxidante: H₂O₂ + 2 I⁻ + 2 H⁺ → I₂ + 2 H₂O; pardo, y violeta en cloroformo.');

    ev(tp4,'E6','Agua oxigenada con dióxido de manganeso','Escribí la reacción y explicá el papel del MnO₂.',
      rx('2 H2O2(ac) =[MnO2]=> 2 H2O(l) + O2(g)↑')+
      '<p>El MnO₂ es <b>catalizador</b>: acelera la descomposición y al final queda igual. Se observa efervescencia, el tubo se calienta y una astilla en punto de ignición se reaviva (O₂).</p>'+
      corr('Lo que circula','<p>“H₂O₂ → H₂O + O₂” no está balanceada (2 O a la izquierda, 3 a la derecha). Va <b>2 H₂O₂ → 2 H₂O + O₂</b>.</p>'),
      '2 H₂O₂ → 2 H₂O + O₂ (MnO₂ catalizador)');

    ev(tp4,'E7','Agua oxigenada con nitrato de plata','Al agregar H₂O₂ a una solución de AgNO₃ se observa burbujeo y un precipitado negro; la astilla se reaviva y la solución final vira el tornasol azul a rosa. Interpretá con ecuaciones.',
      step('¿Quién hace qué?','<p>Acá el H₂O₂ actúa como <b>reductor</b>: su O pasa de −1 a 0 (O₂). El Ag⁺ se reduce a <b>plata metálica</b>, negra cuando está finamente dividida.</p>')+
      step('Ion-electrón',rxs(['H2O2 -> O2 + 2 H^+ + 2 e^-','oxidación'],['Ag^+ + e^- -> Ag','reducción, × 2'],['H2O2 + 2 Ag^+ -> O2 + 2 Ag + 2 H^+'],['H2O2 + 2 AgNO3 -> 2 Ag(s)↓ + O2(g)↑ + 2 HNO3(ac)','molecular']))+
      step('Las observaciones','<ul><li>Burbujeo + astilla que se reaviva → <b>O₂</b>.</li><li>Precipitado negro → <b>Ag</b>.</li><li>Tornasol azul → rosa → se formó <b>HNO₃</b> (H⁺).</li></ul>')+
      note('Además','<p>La plata formada cataliza la descomposición de más agua oxigenada (2 H₂O₂ → 2 H₂O + O₂), por eso el burbujeo es abundante.</p>'),
      'H₂O₂ + 2 AgNO₃ → 2 Ag↓ (negro) + O₂↑ + 2 HNO₃');

    ev(tp4,'E8','Intercambio de ligandos en el complejo de cobre','A una solución verde de H₂[CuCl₄] (CuSO₄ en HCl concentrado) se le agrega agua y pasa a celeste. Explicá con una ecuación.',
      rx('[CuCl4]^2-(ac) + 4 H2O(l) <=> [Cu(H2O)4]^2+(ac) + 4 Cl^-(ac)','verde ⇌ celeste')+
      '<p>Es un <b>intercambio de ligandos</b>: el agua desplaza al cloruro. Al agregar mucha agua el equilibrio se corre hacia el acuocomplejo (Le Chatelier). Si se vuelve a agregar HCl concentrado, el color vuelve al verde.</p>'+
      corr('Lo que circula','<p>“H₂[CuCl₄] + H₂O → [Cu(H₂O)₄]²⁺ + 4 Cl⁻” no está balanceada: hacen falta <b>4 H₂O</b>, y el complejo se escribe como ion [CuCl₄]²⁻ (los 2 H⁺ son espectadores).</p>'),
      '[CuCl₄]²⁻ + 4 H₂O ⇌ [Cu(H₂O)₄]²⁺ + 4 Cl⁻');

    ev(tp4,'E9','Calentamiento del sulfato ferroso hidratado','¿Qué se observa al calentar sulfato ferroso hidratado? Escribí la ecuación.',
      rx('FeSO4·7H2O(s) =[Δ]=> FeSO4(s) + 7 H2O(g)','sal verde → sólido blanco-grisáceo')+
      '<p>El sólido pierde el <b>agua de cristalización</b>: se ven vapores y gotitas en la parte fría del tubo, y el color pasa del verde al blanco grisáceo. Es el mismo fenómeno que el CuSO₄·5H₂O del TP (azul → blanco).</p>'+
      note('Sobre la fórmula','<p>El material que circula lo escribe como hexahidrato (FeSO₄·6H₂O → FeSO₄ + 6 H₂O). La sal comercial habitual es el <b>heptahidrato</b>, FeSO₄·7H₂O; el razonamiento es el mismo. Con calentamiento muy fuerte se descompone y queda un residuo rojizo de Fe₂O₃.</p>'),
      'FeSO₄·7H₂O → FeSO₄ + 7 H₂O (verde → blanco)');

    ev(tp4,'E10','Oxígeno con sulfato ferroso y tiocianato','Se burbujea O₂ en FeSO₄ acidificado y luego se agrega KSCN. ¿Qué se observa? Ecuaciones.',
      rxs(['4 Fe^2+ + O2 + 4 H^+ -> 4 Fe^3+ + 2 H2O','el O₂ oxida al Fe²⁺'],['Fe^3+ + SCN^- -> [Fe(SCN)]^2+','complejo rojo sangre'])+`<p>Aparece color ${swatch('#9b111e','rojo intenso')}: prueba de que se formó Fe³⁺, es decir, de que el O₂ es oxidante.</p>`,
      'Color rojo sangre: el O₂ oxidó Fe²⁺ a Fe³⁺.');
  }

  // =====================================================================
  // TP 5 · EVALUACIÓN (TEMA 2) Y ERRORES FRECUENTES
  // =====================================================================
  const tp5=unit('tp5');
  if(tp5){
    insertBefore(tp5,'qi-tp5-cuestionario',{key:'qi-tp5-evaluacion',label:'Evaluación del TP 5 (tema 2) resuelta',kicker:'TP 5 · EVALUACIÓN',html:`
<p>Las cuatro preguntas de la <b>Evaluación TP N.º 5: Carbono y Nitrógeno — Tema 2</b>, con la respuesta completa. Debajo de cada una se marca qué le faltaba o qué estaba mal en la respuesta que circula.</p>
<div data-qi-guide="eval"></div>`});

    ev(tp5,'E1','Aparato de obtención del HNO₃','Realizá el esquema del aparato utilizado para la obtención del HNO₃ indicando el nombre de cada parte. Explicá el ensayo con la ecuación balanceada. ¿Cómo corroboramos que obtuvimos el ácido?',
      pic('retorta-hno3.webp','Retorta y tubo colector en baño de hielo','')+
      step('Partes',table(['Parte','Función'],[['Retorta (con NaNO₃ o KNO₃ + H₂SO₄ concentrado)','recipiente de reacción; es de una sola pieza de vidrio porque el HNO₃ ataca tapones y mangueras'],['Tela metálica, trípode y mechero','calentamiento suave y parejo'],['Pie universal y agarradera','sostienen la retorta'],['Cuello de la retorta','conduce los vapores'],['Tubo colector en baño de agua con hielo','condensa el HNO₃ (hace de refrigerante)']]))+
      step('Ensayo y ecuación','<p>Se calienta el nitrato con ácido sulfúrico concentrado: el H₂SO₄, poco volátil, desplaza al HNO₃, que destila y se condensa en el tubo frío.</p>'+rxs(['NaNO3(s) + H2SO4(c) =[Δ]=> NaHSO4(s) + HNO3(g)','con nitrato de sodio (guía)'],['KNO3(s) + H2SO4(c) =[Δ]=> KHSO4(s) + HNO3(g)','con nitrato de potasio (tema 2)']))+
      step('Cómo se corrobora',`<ul><li>Tornasol azul → ${swatch('#d6332a','rojo')}: es un ácido.</li><li>Vapores pardos (NO₂) por su descomposición parcial: 4 HNO₃ → 4 NO₂ + O₂ + 2 H₂O.</li><li>Prueba de que es <b>nítrico</b> y no sulfúrico arrastrado: con un trocito de cobre desprende gas pardo (TP 5, clase 2).</li></ul>`)+
      corr('Lo que circula','<p>Describe “matraz + condensador”. En nuestra guía se usa una <b>retorta</b> y el tubo colector en hielo cumple la función del refrigerante. La ecuación con KNO₃ está bien.</p>'),
      'Retorta con nitrato + H₂SO₄(c), calentada; el HNO₃ destila y se condensa en un tubo en hielo; tornasol azul → rojo.');

    ev(tp5,'E2','Propiedades del CO₂ demostradas','En el ensayo demostrativo se recogió CO₂ en tubos y se demostraron algunas de sus propiedades. Explicá por lo menos dos y cómo se determinaron.',
      table(['Propiedad','Cómo se determinó','Ecuación / razón'],[['No es comburente','una vela encendida se apaga dentro del tubo 1','no aporta O₂'],['Más denso que el aire','tubos invertidos: la vela se apaga en el tubo de abajo (que tenía aire)','44 g/mol vs 29 g/mol'],['Óxido ácido','fenolftaleína alcalinizada: fucsia → incolora; con barita, turbidez blanca',rx('CO2 + Ba(OH)2 -> BaCO3↓ + H2O')],['Se reduce con metales activos','el Mg encendido sigue ardiendo y deja puntos negros',rx('2 Mg + CO2 -> 2 MgO + C')]])+
      corr('Lo que circula','<p>“Su solubilidad en agua, comprobada al observar burbujas al agitarlo” no es un ensayo válido (las burbujas no demuestran solubilidad) y no fue uno de los ensayos del TP. Elegí dos de la tabla, con su observación.</p>'),
      'Por ejemplo: no comburente (la vela se apaga) y más denso que el aire (tubos invertidos); también carácter ácido.');

    ev(tp5,'E3','Adsorción del carbón activado','¿A qué se debe la capacidad adsorbente del carbón activado? ¿Por qué se usa para purificar agua? ¿Con qué fin se filtró en el ensayo del Pb(NO₃)₂ con carbón activado y KI?',
      step('Por qué adsorbe','<p>El carbón activado es <b>muy poroso</b>: tiene una superficie interna enorme (cientos de m² por gramo). Sobre esa superficie quedan retenidas (adsorbidas) moléculas e iones, por fuerzas de atracción débiles.</p>')+
      step('Purificación del agua','<p>Retiene colorantes, sustancias que dan olor y sabor, cloro y metales pesados como el Pb²⁺, sin agregar nada al agua.</p>')+
      step('Para qué se filtra','<p>Se agita la solución de Pb²⁺ con carbón y se <b>filtra para separar el carbón</b>, que se lleva el Pb²⁺ adsorbido. Al filtrado se le agrega KI: si <b>no</b> aparece (o aparece mucho menos) el precipitado amarillo de PbI₂ que sí se forma en el tubo testigo, queda demostrado que el plomo quedó en el carbón.</p>'+rx('Pb^2+(ac) + 2 I^-(ac) -> PbI2(s)↓','amarillo'))+
      corr('Lo que circula','<p>“El precipitado PbI₂ se filtró para separarlo del líquido y el carbón ayudó a eliminar impurezas”: no explica la idea del ensayo. Lo que se separa es el <b>carbón</b>, y la prueba es la <b>comparación con el testigo</b> al agregar KI.</p>'),
      'Gran superficie porosa; se filtra para separar el carbón con el Pb²⁺ adsorbido y comprobar con KI que el filtrado ya no lo tiene.');

    ev(tp5,'E4','Poder reductor del NH₃','Se hizo reaccionar NH₃ con KMnO₄ para comprobar su poder reductor. Escribí la reacción y qué se observó. ¿Qué otra característica importante del NH₃ ensayamos?',
      step('Observación','<p>Al calentar, el violeta desaparece, se forma un <b>precipitado pardo</b> (MnO₂) y se ve un leve burbujeo (N₂).</p>')+
      step('Ecuación (medio básico)',rxs(['2 NH3 + 6 OH^- -> N2 + 6 H2O + 6 e^-','oxidación'],['MnO4^- + 2 H2O + 3 e^- -> MnO2 + 4 OH^-','reducción, × 2'],['2 NH3 + 2 MnO4^- -> N2 + 2 MnO2 + 2 OH^- + 2 H2O'],['2 KMnO4 + 2 NH3 -> 2 MnO2 + N2 + 2 KOH + 2 H2O','molecular']))+
      corr('Lo que circula','<p>“2 KMnO₄ + 2 NH₃ + H₂O → 2 MnO₂ + N₂ + 2 KOH” no está balanceada: sobran O y faltan H del lado derecho. El agua va del lado de los <b>productos</b> y son <b>2 H₂O</b>.</p>')+
      step('Otra característica ensayada','<p>Es <b>muy soluble</b> en agua y <b>básico</b>: en la fuente de amoníaco el agua sube por el tubo y la fenolftaleína se pone fucsia (tornasol rojo → azul). También: forma humo blanco con HCl y actúa como <b>ligando</b> (complejo azul con Cu²⁺).</p>'+rx('NH3 + H2O <=> NH4^+ + OH^-')),
      '2 KMnO₄ + 2 NH₃ → 2 MnO₂↓ (pardo) + N₂ + 2 KOH + 2 H₂O; además es muy soluble y básico.');

    insertBefore(tp5,'qi-tp5-cuestionario',{key:'qi-tp5-errores',label:'Errores frecuentes en las respuestas del cuestionario',kicker:'TP 5 · ERRORES FRECUENTES',html:`
<p>Entre los alumnos circula una versión resuelta del cuestionario. Tiene varias respuestas bien, pero también errores que conviene marcar en clase:</p>
${table(['Pregunta','Lo que circula','Lo correcto'],[
 ['2 d','“se comprueba con fenolftaleína” al burbujear CO₂ en agua','En agua pura la fenolftaleína ya es incolora: no se ve ningún cambio. Se usa <b>heliantina</b> (amarillo → rojo) o <b>tornasol</b> (azul → rojo). La fenolftaleína sirve si está <b>alcalinizada</b> (fucsia → incolora).'],
 ['2 e II','“la solución queda a pH 7 y la fenolftaleína cambia”','La fenolftaleína se decolora por debajo de pH ≈ 8,2; el cambio se ve cuando el CO₂ pasa el carbonato a <b>bicarbonato</b> (pH ≈ 8,3), no hace falta llegar a 7.'],
 ['3','olor “astringente”','El olor del NH₃ es <b>picante, irritante, sofocante</b>. Además falta que es menos denso que el aire (tubo invertido) y muy soluble (la fuente).'],
 ['4 c','redox del NH₃ con O₂','La reacción 4 NH₃ + 3 O₂ → 2 N₂ + 6 H₂O es correcta, pero en el TP el poder reductor se probó con <b>KMnO₄</b>: hay que escribir esa (ver Evaluación E4).'],
 ['5','“Cu²⁺ + 2 NH₃ → Cu(OH)₂”, “[Cu(NH₃)₄]²⁺ + HCl → CuCl₂”, etc.','Sin agua ni NH₄⁺ las ecuaciones no cierran: Cu²⁺ + 2 NH₃ + 2 H₂O → Cu(OH)₂ + 2 NH₄⁺. El Al(OH)₃ y el Mn(OH)₂ <b>sí</b> se disuelven con HCl (por eso la tabla dice “solución incolora”). Ver la resolución de la pregunta 5.'],
 ['6 c','2 NO₂ + H₂O → HNO₃ + HNO₂','<b>También es correcta</b> (en agua fría). Con agua tibia o en exceso, el HNO₂ se descompone y queda 3 NO₂ + H₂O → 2 HNO₃ + NO, que es la del material. Cualquiera de las dos muestra el carácter ácido.'],
 ['7 d','KI + 4 HNO₃ → I₂ + …','Falta el 2: <b>2 KI</b> + 4 HNO₃ → I₂ + 2 NO₂ + 2 KNO₃ + 2 H₂O.'],
 ['7 e','Al + 6 HNO₃(c) → Al(NO₃)₃ + 3 NO₂ + 3 H₂O','La consigna es con ácido <b>diluido</b>; con el concentrado el aluminio se <b>pasiva</b>. Con diluido: 8 Al + 30 HNO₃ → 8 Al(NO₃)₃ + 3 NH₄NO₃ + 9 H₂O.'],
 ['7 f · g','Fe con HNO₃(d) → NO o “Fe(NO₃)₂ + NO₂”','Las consignas f y g son <b>Zn</b> y <b>Fe</b> con ácido diluido; según el material teórico se reducen a <b>NH₄⁺</b>: 4 Zn + 10 HNO₃ → 4 Zn(NO₃)₂ + NH₄NO₃ + 3 H₂O y 8 Fe + 30 HNO₃ → 8 Fe(NO₃)₃ + 3 NH₄NO₃ + 9 H₂O. El NO₂ nunca sale con ácido diluido.'],
 ['7 (comprobaciones)','“se comprobó la formación de H₂SO₄”; “gas incoloro (NO)” en f','Hay que decir <b>cómo</b>: sulfato con BaCl₂ (precipitado blanco); en f, el NH₄⁺ se detecta agregando NaOH y calentando: el NH₃ vira el tornasol rojo a azul.']
])}
${note('Lo que sí está bien','<p>Los cálculos de las preguntas 2 b–c (10,2 mL y ≈ 1,45 L), 4 a–b (18,7 mL y 1,14 L) y 6 a (3,2 mL) coinciden con los nuestros, igual que las ecuaciones 7 a, b y c.</p>')}
`});
  }

  // =====================================================================
  // CAJA DE HERRAMIENTAS · MÁS EJEMPLOS DE REDOX
  // =====================================================================
  const h=unit('herramientas');
  if(h){
    insertBefore(h,'qi-h-repaso',{key:'qi-h-redox-mas',label:'Más ejemplos de ion-electrón (de las clases)',kicker:'HERRAMIENTAS · 05',html:`
<p>Ejemplos que se trabajaron en clase, resueltos con el mismo orden de siempre (el “formato milanesa”): <b>números de oxidación → hemirreacciones → elemento principal → O con H₂O → H con H⁺ → cargas con e⁻ → igualar e⁻ → sumar → volver a molecular</b>.</p>
${K.example('NH₃ + O₂ → N₂ + H₂O','<p>N: −3 → 0 (se oxida) · O: 0 → −2 (se reduce).</p>',
 step('Oxidación',rxs(['2 NH3 -> N2 + 6 H^+ + 6 e^-','× 2']))+step('Reducción',rxs(['O2 + 4 H^+ + 4 e^- -> 2 H2O','× 3']))+step('Suma (12 e⁻; se cancelan 12 H⁺)',rx('4 NH3 + 3 O2 -> 2 N2 + 6 H2O')),'4 NH₃ + 3 O₂ → 2 N₂ + 6 H₂O')}
${K.example('Permanganato + oxalato (medio ácido)','<p>Mn: +7 → +2 · C: +3 → +4.</p>',
 step('Oxidación',rx('C2O4^2- -> 2 CO2 + 2 e^-','× 5'))+step('Reducción',rx('MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','× 2'))+step('Suma',rx('5 C2O4^2- + 2 MnO4^- + 16 H^+ -> 10 CO2 + 2 Mn^2+ + 8 H2O'))+step('Control','<p>Carga: −10 − 2 + 16 = +4 · derecha: 2·(+2) = +4 ✓</p>'),'5 C₂O₄²⁻ + 2 MnO₄⁻ + 16 H⁺ → 10 CO₂ + 2 Mn²⁺ + 8 H₂O')}
${K.example('Dicromato + ioduro (medio ácido)','<p>Cr: +6 → +3 · I: −1 → 0.</p>',
 step('Oxidación',rx('2 I^- -> I2 + 2 e^-','× 3'))+step('Reducción',rxs(['Cr2O7^2- -> 2 Cr^3+','primero el Cr'],['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O','7 O → 7 H₂O → 14 H⁺']))+step('Suma',rx('Cr2O7^2- + 6 I^- + 14 H^+ -> 2 Cr^3+ + 3 I2 + 7 H2O')),'Cr₂O₇²⁻ + 6 I⁻ + 14 H⁺ → 2 Cr³⁺ + 3 I₂ + 7 H₂O')}
${K.example('Dicromato + hierro(II) (medio ácido)','<p>Fe: +2 → +3 · Cr: +6 → +3.</p>',
 step('Oxidación',rx('Fe^2+ -> Fe^3+ + e^-','× 6'))+step('Reducción',rx('Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O'))+step('Suma',rx('6 Fe^2+ + Cr2O7^2- + 14 H^+ -> 6 Fe^3+ + 2 Cr^3+ + 7 H2O'))+step('Control','<p>Carga: 12 − 2 + 14 = 24 · derecha: 18 + 6 = 24 ✓</p>'),'6 Fe²⁺ + Cr₂O₇²⁻ + 14 H⁺ → 6 Fe³⁺ + 2 Cr³⁺ + 7 H₂O')}
<h3>Medio básico: el truco del OH⁻</h3>
<p>Se resuelve igual que en medio ácido y, al final, <b>por cada H⁺ se agrega un OH⁻ a los dos lados</b>: H⁺ + OH⁻ forman H₂O, y se simplifican las aguas repetidas.</p>
${K.example('Bromo en hidróxido de sodio (dismutación)','<p>El Br₂ (0) se reduce a Br⁻ (−1) y a la vez se oxida a BrO⁻ (+1): la misma sustancia es oxidante y reductora.</p>',
 step('Reducción',rx('Br2 + 2 e^- -> 2 Br^-'))+
 step('Oxidación en ácido',rx('Br2 + 2 H2O -> 2 BrO^- + 4 H^+ + 2 e^-'))+
 step('Pasar a básico (+ 4 OH⁻ a cada lado)',rxs(['Br2 + 2 H2O + 4 OH^- -> 2 BrO^- + 4 H2O + 2 e^-'],['Br2 + 4 OH^- -> 2 BrO^- + 2 H2O + 2 e^-','se simplifican 2 H₂O']))+
 step('Suma y simplificación',rxs(['2 Br2 + 4 OH^- -> 2 Br^- + 2 BrO^- + 2 H2O'],['Br2 + 2 OH^- -> Br^- + BrO^- + H2O','÷ 2'])),'Br₂ + 2 OH⁻ → Br⁻ + BrO⁻ + H₂O')}
`});
  }
})();
