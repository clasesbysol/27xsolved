// 27xSOLved · Química Inorgánica 4.º · TP 1 (Reacciones químicas) y TP 2 (Complejos)
// Guías de laboratorio: «TP N.º 1 – Reacciones químicas (desarrollo experimental)», clases 1 y 2, y
// «TP N.º 2: Complejos (desarrollo experimental)». Teoría: resúmenes de la cursada, revisados y corregidos.
// Cada sección trae su `block` (antes · teoria · ensayos · resueltos); el orden final y el bloque
// «Practicar» los arma quimica-inorganica-4-orden.js. No cambiar los `key` ya publicados.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {idea,warn,fix,note,step,table}=K;
  const {rx,rxs,f,vira,swatch,ensayo,punch,facts}=Q;
  const guia=t=>`<p class="qiSource"><span class="qxFromGuide">De la guía</span> ${t}</p>`;
  const errata=(title,html)=>fix(title,html);
  const C={rosa:'#e0559a',incoloro:'transparent',azul:'#2f5fd0',celeste:'#7ec3ea',rojo:'#a3121f',ladrillo:'#b5462a',amarillo:'#f2c230',naranja:'#f08a24',verde:'#3f9a5a',blanco:'#f3f3f3',gris:'#9aa0a6',plata:'#c9ced6',rosaCo:'#e58fb0',azulCo:'#2d48c4'};

  // =====================================================================
  // TP 1 · REACCIONES QUÍMICAS
  // =====================================================================
  const s1=[];const a1=(k,block,l,h)=>s1.push({key:`qi-tp1-${k}`,block,label:l,kicker:'',html:h});

  a1('lab','antes','Antes de entrar al laboratorio',`
<p>El TP 1 es la puerta de entrada a todos los demás: se aprende a <b>mirar un tubo</b>, describir lo que pasa con lenguaje técnico y escribir la <b>ecuación</b> que lo explica. Se hace en dos clases:</p>
${table(['Clase','Tipo de reacción','Ensayos'],[
 ['Clase 1','Combinación y descomposición','<b>Demostrativos</b> (los hace el docente): NH₃ + HCl → NH₄Cl · descomposición del dicromato de amonio.<br><b>Por los estudiantes</b>: combustión del magnesio · descomposición del óxido mercúrico.'],
 ['Clase 2','Desplazamiento','<b>Simple</b>: cobre en nitrato de plata · zinc en ácido clorhídrico.<br><b>Doble</b>: neutralización · precipitación del PbI₂ · desprendimiento de CO₂.']
])}
${punch('En cada ensayo: qué hago → qué veo → qué pasó (ecuación) → qué tipo de reacción es.')}
${warn('Seguridad','<ul><li><b>No mirar directamente</b> el magnesio cuando arde: la luz es muy intensa y puede dañar la vista.</li><li>El <b>óxido mercúrico</b> libera vapor de <b>mercurio</b>, que es tóxico: el tubo se calienta con la boca lejos de la cara y la astilla <b>no debe caer dentro del tubo</b> (puede producirse una explosión).</li><li>El <b>dicromato</b> tiene cromo(VI), tóxico: sólo lo manipula el docente.</li><li>El HCl concentrado y el amoníaco concentrado se usan con gotero, sin olerlos directamente.</li><li><b>No se descartan los restos</b> de metales ni de sólidos: van a los recipientes que indica el docente.</li></ul>')}
${note('Qué se entrega','<p>En la Clase 1 los ensayos demostrativos se anotan en la <b>libreta de laboratorio</b>. Los ensayos de los estudiantes (clases 1 y 2) se registran en una <b>hoja individual</b> con lo observado y las ecuaciones, y se entrega al docente <b>antes de que termine la clase</b>.</p>')}
${table(['En la hoja va…','Ejemplo'],[
 ['Lo que se ve, con palabras técnicas','“Se forma un <b>precipitado</b> amarillo”, “hay <b>efervescencia</b>”, “la solución <b>vira</b> de fucsia a incolora”'],
 ['La interpretación','“El cobre desplaza a la plata de su sal porque es más reductor”'],
 ['La ecuación balanceada, con estados',rx('Cu(s) + 2 AgNO3(ac) -> Cu(NO3)2(ac) + 2 Ag(s)')],
 ['El tipo de reacción','desplazamiento simple · redox']
])}
`);

  a1('intro','teoria','Transformaciones y ecuaciones',`
<h3>Transformación física o química</h3>
${table(['','Física','Química'],[['Qué cambia','el estado o la forma','la sustancia: se forman sustancias nuevas'],['Ejemplo','hielo → agua líquida','hierro + oxígeno → óxido de hierro'],['¿Se escribe una ecuación química?','no hace falta','sí: reactivos → productos']])}
${idea('Pistas de que hubo reacción química','<p>Cambio de color, formación de un <b>precipitado</b>, desprendimiento de un <b>gas</b> (efervescencia), emisión de <b>luz</b> o cambio de <b>temperatura</b>. Ojo: el PbI₂ que se disuelve al calentar y vuelve a aparecer al enfriar (Clase 2) es un cambio <b>físico</b> de solubilidad, no una reacción nueva.</p>')}
<h3>La ecuación química</h3>
${rx('2 Mg(s) + O2(g) -> 2 MgO(s)','reactivos a la izquierda, productos a la derecha')}
${facts([['(s)','sólido'],['(l)','líquido'],['(g)','gas'],['(ac)','disuelto en agua']])}
${note('Detalle','<p>En los apuntes aparece a veces “(aq)” (del inglés <i>aqueous</i>): es lo mismo que “(ac)”. Conviene usar una sola notación en todo el informe. Sobre la flecha se anotan las condiciones: Δ (calor), catalizador, llama.</p>')}
<h3>Ecuación molecular e iónica neta</h3>
<p>Cuando la reacción ocurre en solución, conviene escribirla también con los iones que <b>de verdad</b> reaccionan. Los iones que están igual de los dos lados (“espectadores”) se tachan.</p>
${rxs(['Pb(NO3)2(ac) + 2 KI(ac) -> PbI2(s)↓ + 2 KNO3(ac)','molecular'],['Pb^2+(ac) + 2 NO3^-(ac) + 2 K^+(ac) + 2 I^-(ac) -> PbI2(s) + 2 K^+(ac) + 2 NO3^-(ac)','iónica completa'],['Pb^2+(ac) + 2 I^-(ac) -> PbI2(s)↓','iónica neta: K⁺ y NO₃⁻ son espectadores'])}
`);

  a1('clasificacion','teoria','Clasificación de las reacciones',`
<h3>Según la energía</h3>
${table(['Tipo','Qué pasa','Ejemplo del TP'],[['Exotérmica','libera calor (el tubo se calienta) o luz','combustión del Mg · neutralización HCl + NaOH'],['Endotérmica','absorbe calor: hay que calentar para que ocurra (o el tubo se enfría)','descomposición del HgO']])}
<h3>Según el tipo de proceso</h3>
${table(['Tipo','Esquema','Ejemplo'],[
 ['A. Combinación (síntesis)','A + B → AB',rxs(['2 Mg(s) + O2(g) -> 2 MgO(s)','sustancia simple + O₂ → óxido'],['H2(g) + Cl2(g) -> 2 HCl(g)','con H₂: hidruro (acá, un hidrácido)'],['2 Na(s) + Cl2(g) -> 2 NaCl(s)','metal + no metal → sal binaria'],['CaO(s) + H2O(l) -> Ca(OH)2(ac)','óxido básico + agua → hidróxido'],['SO3(g) + H2O(l) -> H2SO4(ac)','óxido ácido + agua → oxoácido'],['NH3(g) + HCl(g) -> NH4Cl(s)','ensayo demostrativo de la Clase 1'])],
 ['B. Descomposición','AB → A + B',rxs(['2 H2O2(ac) -> 2 H2O(l) + O2(g)'],['CaCO3(s) =[Δ]=> CaO(s) + CO2(g)'],['2 HgO(s) =[Δ]=> 2 Hg(l) + O2(g)','Clase 1'])],
 ['C. Desplazamiento simple','A + BC → AC + B',rxs(['Zn(s) + CuSO4(ac) -> ZnSO4(ac) + Cu(s)','el metal más activo desplaza al otro'],['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)','un metal desplaza al hidrógeno de un ácido'])],
 ['C. Doble desplazamiento','AB + CD → AD + CB',rx('AgNO3(ac) + NaCl(ac) -> AgCl(s)↓ + NaNO3(ac)')],
 ['D. Ácido-base (neutralización)','ácido + base → sal + agua',rx('HCl(ac) + NaOH(ac) -> NaCl(ac) + H2O(l)')],
 ['E. Precipitación','dos soluciones → sólido insoluble',rx('BaCl2(ac) + Na2SO4(ac) -> BaSO4(s)↓ + 2 NaCl(ac)')],
 ['F. Formación de complejos','catión + ligandos → complejo',rx('Cu^2+(ac) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac)')],
 ['G. Redox','transferencia de electrones',rx('Zn(s) + Cu^2+(ac) -> Zn^2+(ac) + Cu(s)')]
])}
${idea('Una reacción puede tener dos etiquetas','<p>Zn + CuSO₄ es desplazamiento <b>y</b> redox; AgNO₃ + NaCl es doble desplazamiento <b>y</b> precipitación; la combustión del Mg es combinación <b>y</b> redox. La clasificación depende de qué se quiere destacar. Los desplazamientos <b>simples</b> son siempre redox; los <b>dobles</b>, nunca.</p>')}
<h3>Desplazamiento simple: ¿quién desplaza a quién?</h3>
<p>Un metal desplaza a otro de su sal (o al hidrógeno de un ácido) si es <b>más reductor</b>, es decir, si su potencial de reducción es <b>menor</b>:</p>
${table(['Par','E° (V)','Lectura'],[['Zn²⁺/Zn','−0,76','el más reductor de la lista: desplaza al H₂ y al Cu'],['H⁺/H₂','0,00','referencia'],['Cu²⁺/Cu','+0,34','no desplaza al H₂ (no reacciona con HCl), pero sí a la plata'],['Ag⁺/Ag','+0,80','el menos reductor: lo desplazan todos los anteriores']])}
<h3>La tabla de una redox</h3>
${table(['Especie','N.o. inicial','N.o. final','¿Qué le pasa?','Agente'],[['Zn','0','+2','se oxida (pierde 2 e⁻)','reductor'],['Cu²⁺','+2','0','se reduce (gana 2 e⁻)','oxidante']])}
`);

  a1('electrolitos','teoria','Electrolitos, ionización y flechas',`
${table(['Tipo','En agua…','Cómo se escribe','Ejemplo'],[
 ['No electrolito','no forma iones; no conduce','no se escribe disociación','glucosa, sacarosa, etanol'],
 ['Electrolito débil','se disocia parcialmente','doble flecha ⇌',rx('CH3COOH(ac) <=> CH3COO^-(ac) + H^+(ac)')],
 ['Electrolito fuerte','se disocia completamente','flecha simple →',rx('HCl(ac) -> H^+(ac) + Cl^-(ac)')]
])}
<h3>Ionización</h3>
<p>Una sustancia <b>molecular</b> (no iónica) forma iones al reaccionar con el agua:</p>
${rx('HCl(g) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','ion hidronio')}
${note('Disociación vs. ionización','<p><b>Disociación</b>: un compuesto iónico (NaCl) que ya tenía iones los separa. <b>Ionización</b>: una molécula (HCl) que no tenía iones los forma al reaccionar con el agua.</p>')}
<h3>Indicadores: la fenolftaleína</h3>
${table(['Medio','Color de la fenolftaleína'],[['ácido o neutro (pH &lt; 8)',swatch('#ffffff','incolora')],['básico (pH &gt; 8 a 10)',swatch(C.rosa,'fucsia')]])}
<p>Se usa en dos ensayos del TP 1: para ver que el MgO forma una base en agua y para seguir la neutralización.</p>
`);

  // ---------------- CLASE 1 ----------------
  a1('c1','ensayos','Clase 1 · Reacciones de combinación y descomposición',`
${guia('Clase 1. Ensayos 1.1 y 1.2: demostrativos (registrar en la libreta y discutir las reacciones). Ensayos 2.1 y 2.2: los hacen los estudiantes y los registran en la hoja individual.')}
<h3>1 · Ensayos demostrativos</h3>
${ensayo({n:'1.1',title:'Reacción de combinación: obtención de cloruro de amonio',
 hacemos:'<p>Un gotero con <b>solución de amoníaco</b> y otro con <b>ácido clorhídrico concentrado</b>. Se acercan los picos y se presionan suavemente para expulsar <b>sólo los gases</b> (no debe salir líquido).</p>',
 vemos:`<p>Entre los dos picos se forma un <b>humo blanco</b> denso, sin que los líquidos se toquen.</p>`,
 pasa:`<p>Los dos son volátiles: del gotero de amoníaco sale NH₃ gaseoso y del de ácido sale HCl gaseoso. Al encontrarse en el aire reaccionan y forman un <b>sólido</b> en partículas finísimas: eso es el humo.</p>`+rx('NH3(g) + HCl(g) -> NH4Cl(s)','combinación · ácido-base'),
 demuestra:'dos gases pueden combinarse y dar un sólido; el NH₃ es una base y el HCl un ácido aun en fase gaseosa.'})}
${ensayo({n:'1.2',title:'Reacción de descomposición: descomposición térmica del dicromato de amonio',
 hacemos:'<p>En una cápsula o crisol se colocan 2 g de <b>dicromato de amonio</b>, (NH₄)₂Cr₂O₇, sobre un triángulo de pipa en un aro del pie universal. Se calienta con el mechero hasta que el sólido se encienda.</p>',
 vemos:`<p>Los cristales ${swatch(C.naranja,'naranjas')} se encienden y la reacción sigue sola, con <b>chispas</b> e incandescencia (el “volcán”). El producto es un polvo ${swatch(C.verde,'verde')}, muy esponjoso: ocupa mucho más volumen que el sólido inicial.</p>`,
 pasa:rx('(NH4)2Cr2O7(s) =[Δ]=> Cr2O3(s) + N2(g) + 4 H2O(g)','N: −3 → 0 · Cr: +6 → +3')+`<p>Un solo reactivo da tres productos: es una <b>descomposición</b>. Además es una <b>redox interna</b>: el N del amonio se oxida y el Cr del dicromato se reduce, dentro del mismo compuesto. Es <b>exotérmica</b>: una vez iniciada se mantiene sola. Los gases (N₂ y vapor de agua) “inflan” el Cr₂O₃ y por eso queda tan voluminoso.</p>`,
 demuestra:'una descomposición térmica; un mismo compuesto puede tener la parte oxidante y la reductora.'})}
${errata('Ojo con el título de la guía','<p>El ensayo 1.2 se titula “descomposición térmica de cloruro de amonio”, pero el procedimiento usa <b>dicromato de amonio</b> y eso es lo que se observa (polvo verde de Cr₂O₃). Si en la evaluación preguntan por el ensayo de la clase, la ecuación es la del dicromato. El NH₄Cl también se descompone al calentarlo (NH₄Cl → NH₃ + HCl), pero sin cambio de color: se ve un sólido blanco que “desaparece” y se vuelve a formar en la parte fría.</p>')}
<h3>2 · Ensayos a realizar por los estudiantes</h3>
${ensayo({n:'2.1',title:'Reacción de combinación: combustión del magnesio',
 hacemos:'<p>Se observa la cinta de magnesio (si está oxidada, se raspa con la espátula). Con la pinza se la coloca en la parte superior de la llama reductora (azul) hasta que se encienda, y se retira. El residuo se pone en el cristalizador con 1 cm de agua, se disuelve con una varilla y se agregan gotas de fenolftaleína.</p>',
 vemos:`<p>La cinta es un metal gris plateado (opaco si está oxidada). Arde con una <b>luz blanca enceguecedora</b> y deja un <b>polvo blanco</b> que se desmorona. En agua se disuelve poco; con fenolftaleína la mezcla se pone ${swatch(C.rosa,'fucsia')} (suave, sobre todo junto al sólido).</p>`,
 pasa:rxs(['2 Mg(s) + O2(g) =[Δ]=> 2 MgO(s)','combinación · redox · exotérmica'],['MgO(s) + H2O(l) -> Mg(OH)2(s)','óxido básico + agua → hidróxido'],['Mg(OH)2(s) <=> Mg^2+(ac) + 2 OH^-(ac)','poco soluble, pero lo que se disuelve da OH⁻'])+`<p>El Mg se oxida (0 → +2) y el O se reduce (0 → −2). El óxido de un metal es <b>básico</b>: con agua da un hidróxido, y los OH⁻ ponen fucsia la fenolftaleína.</p>`,
 demuestra:'combinación de un metal con oxígeno; los óxidos metálicos son básicos.'})}
${note('Detalle fino','<p>En el aire, una pequeña parte del magnesio también se combina con el nitrógeno (3 Mg + N₂ → Mg₃N₂). No hace falta ponerlo en el informe, pero explica por qué a veces el residuo huele un poco a amoníaco al mojarlo.</p>')}
${ensayo({n:'2.2',title:'Reacción de descomposición: descomposición del óxido mercúrico',
 hacemos:'<p>En un tubo de ensayos térmico se ponen tres puntas de espátula de <b>óxido mercúrico</b>, HgO. Se lo toma con el broche de madera cerca de la boca y se calienta con la llama reductora. Cuando el sólido empieza a cambiar, se acerca a la boca del tubo una astilla con <b>punto de ignición</b> (brasa roja, sin llama). Después se deja enfriar el tubo sobre la tela metálica.</p>',
 vemos:`<p>El sólido ${swatch(C.ladrillo,'rojo anaranjado')} se oscurece al calentarlo (casi negro). En las paredes frías del tubo aparecen <b>gotitas plateadas</b> brillantes (mercurio) que forman un espejo. La astilla con brasa <b>se reaviva</b> y vuelve a encenderse. Al enfriar, el sólido que queda sin descomponer recupera su color rojo.</p>`,
 pasa:rx('2 HgO(s) =[Δ]=> 2 Hg(l) + O2(g)','descomposición · redox · endotérmica')+`<p>Hay que calentar todo el tiempo: es <b>endotérmica</b>. El Hg pasa de +2 a 0 (se reduce) y el O de −2 a 0 (se oxida). El O₂ es <b>comburente</b>: por eso reaviva la astilla. El oscurecimiento del HgO caliente es un cambio físico (el color depende de la temperatura); al enfriar vuelve a ser rojo.</p>`,
 demuestra:'descomposición térmica de un óxido; reconocimiento del O₂ con la astilla con punto de ignición.'})}
`);

  // ---------------- CLASE 2 ----------------
  a1('c2','ensayos','Clase 2 · Reacciones de desplazamiento',`
${guia('Clase 2. Registrar lo observado en cada ensayo y escribir las ecuaciones en la hoja individual; entregarla al docente antes de que termine la clase.')}
<h3>1 · Desplazamiento simple</h3>
${ensayo({n:'1.1',title:'Desplazamiento de metales: cobre en nitrato de plata',
 hacemos:'<p>En un tubo de ensayos se coloca un <b>alambre de cobre</b> y se agregan 2 mL de <b>nitrato de plata al 10 %</b>. Se deja el tubo quieto en la gradilla 15 minutos.</p>',
 vemos:`<p>Sobre el alambre crecen <b>cristales plateados</b> brillantes, como ramitas (“árbol de plata”), que con el tiempo se ven grises. La solución incolora se va poniendo ${swatch(C.celeste,'celeste')}.</p>`,
 pasa:rxs(['Cu(s) + 2 AgNO3(ac) -> Cu(NO3)2(ac) + 2 Ag(s)','molecular'],['Cu(s) + 2 Ag^+(ac) -> Cu^2+(ac) + 2 Ag(s)','iónica neta: Cu se oxida · Ag⁺ se reduce'])+`<p>El cobre es más reductor que la plata (E°: +0,34 V frente a +0,80 V): le cede electrones a los Ag⁺, que se depositan como plata metálica. El color celeste es del Cu²⁺ que pasa a la solución.</p>`,
 demuestra:'un metal más activo desplaza de su sal a uno menos activo; desplazamiento simple = redox.'})}
${ensayo({n:'1.2',title:'Desplazamiento de ácidos: zinc en ácido clorhídrico',
 hacemos:'<p>En un tubo de ensayos se coloca una <b>granalla de zinc</b> y se agregan 2 mL de <b>HCl 18 % m/m</b> (≈ 6 M). Se deja quieto 10 minutos.</p>',
 vemos:'<p><b>Efervescencia</b>: burbujas de un gas incoloro que se forman sobre el zinc. La granalla se va gastando y el tubo se entibia.</p>',
 pasa:rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)↑','molecular'],['Zn(s) + 2 H^+(ac) -> Zn^2+(ac) + H2(g)','iónica neta: Zn se oxida · H⁺ se reduce'])+'<p>El zinc (E° = −0,76 V) es más reductor que el hidrógeno: desplaza al H del ácido como H₂. El cobre del ensayo anterior, en cambio, <b>no</b> reaccionaría con HCl, porque su potencial es mayor que 0.</p>',
 demuestra:'un metal más activo que el hidrógeno lo desplaza de los ácidos liberando H₂ (el mismo ensayo que se usa en el TP 4 para obtener hidrógeno).'})}
<h3>2 · Desplazamiento doble</h3>
${ensayo({n:'2.1',title:'Reacción de neutralización',
 hacemos:'<p>En un tubo de hemólisis: 2 mL de agua y dos gotas de fenolftaleína. Después se agregan: I) tres gotas de <b>hidróxido de sodio</b>; II) gotas de <b>ácido clorhídrico</b> hasta ver un cambio, prestando atención a la temperatura del tubo; III) nuevamente gotas de hidróxido de sodio.</p>',
 vemos:`<p>Agua + fenolftaleína: incolora. I) con NaOH: ${vira('incolora',C.incoloro,'fucsia',C.rosa)}. II) con HCl: ${vira('fucsia',C.rosa,'incolora',C.incoloro)} y el tubo <b>se entibia</b>. III) con NaOH otra vez: vuelve el ${swatch(C.rosa,'fucsia')}.</p>`,
 pasa:rxs(['HCl(ac) + NaOH(ac) -> NaCl(ac) + H2O(l)','molecular'],['H^+(ac) + OH^-(ac) -> H2O(l)','iónica neta · exotérmica'])+'<p>La fenolftaleína es fucsia mientras sobran OH⁻. Al agregar ácido, los H⁺ consumen los OH⁻: cuando se pasa del punto de neutralización el medio queda ácido y el indicador se decolora. Agregando base otra vez vuelve el fucsia: el indicador cambia de color de forma <b>reversible</b>. La neutralización libera calor.</p>',
 demuestra:'ácido + base → sal + agua; es exotérmica; la fenolftaleína distingue medio básico de ácido o neutro.'})}
${errata('Ojo con el punto I de la guía','<p>La guía dice “I) Tres gotas de <b>fenolftaleína</b>”, pero el tubo ya tiene fenolftaleína y sin base no cambia nada. Por cómo sigue el ensayo (después ácido y “nuevamente” hidróxido de sodio), el punto I es agregar tres gotas de <b>hidróxido de sodio</b>.</p>')}
${ensayo({n:'2.2',title:'Reacción de precipitación: ioduro de potasio y nitrato plumboso',
 hacemos:'<p>En un tubo de hemólisis: 2 mL de <b>ioduro de potasio</b> y gotas de <b>nitrato plumboso</b> hasta ver cambios. Después se calienta a baño María y se deja enfriar.</p>',
 vemos:`<p>Aparece al instante un <b>precipitado</b> ${swatch(C.amarillo,'amarillo intenso')}. Al calentar, el precipitado se disuelve y la solución queda casi incolora. Al enfriar, reaparecen cristalitos amarillos brillantes, como escamas doradas (“lluvia de oro”).</p>`,
 pasa:rxs(['Pb(NO3)2(ac) + 2 KI(ac) -> PbI2(s)↓ + 2 KNO3(ac)','molecular: doble desplazamiento'],['Pb^2+(ac) + 2 I^-(ac) -> PbI2(s)↓','iónica neta'])+'<p>Las dos sales son solubles, pero al intercambiar iones se forma el <b>ioduro plumboso</b>, insoluble en frío. Su solubilidad aumenta mucho con la temperatura: en caliente se disuelve y al enfriar recristaliza. Eso último es un cambio <b>físico</b>.</p>',
 demuestra:'doble desplazamiento con formación de un precipitado; la solubilidad depende de la temperatura.'})}
${ensayo({n:'2.3',title:'Reacción de desprendimiento de un gas: carbonato de sodio y ácido clorhídrico',
 hacemos:'<p>En un tubo de hemólisis: 2 mL de <b>carbonato de sodio</b> y se agrega ácido clorhídrico <b>gota a gota</b> hasta ver cambios. Se agita.</p>',
 vemos:'<p><b>Efervescencia</b>: burbujas de un gas incoloro e inodoro. Con las primeras gotas casi no burbujea; después el burbujeo es intenso.</p>',
 pasa:rxs(['Na2CO3(ac) + 2 HCl(ac) -> 2 NaCl(ac) + H2O(l) + CO2(g)↑','molecular'],['CO3^2-(ac) + 2 H^+(ac) -> H2O(l) + CO2(g)↑','iónica neta'])+'<p>En realidad son dos pasos: primero el carbonato toma un H⁺ y queda bicarbonato (sin gas), y recién con más ácido el bicarbonato forma ácido carbónico, que se descompone en agua y CO₂.</p>'+rxs(['CO3^2- + H^+ -> HCO3^-','primeras gotas: no hay burbujas'],['HCO3^- + H^+ -> H2CO3 -> H2O + CO2(g)','después: efervescencia']),
 demuestra:'doble desplazamiento en el que uno de los productos se descompone y libera un gas; los carbonatos reaccionan con ácidos dando CO₂ (lo mismo que se usa en el TP 5).'})}
`);

  a1('resumen','ensayos','Cuadro resumen del TP 1',`
${table(['Ensayo','Qué se ve','Ecuación','Tipo'],[
 ['1.1 NH₃ + HCl (gases)','humo blanco',rx('NH3 + HCl -> NH4Cl'),'combinación'],
 ['1.2 Dicromato de amonio + calor','naranja → polvo verde voluminoso, chispas',rx('(NH4)2Cr2O7 -> Cr2O3 + N2 + 4 H2O'),'descomposición · redox'],
 ['2.1 Mg en la llama','luz blanca, polvo blanco; con agua y fenolftaleína, fucsia',rx('2 Mg + O2 -> 2 MgO'),'combinación · redox'],
 ['2.2 HgO + calor','gotitas de Hg, la astilla se reaviva',rx('2 HgO -> 2 Hg + O2'),'descomposición · redox'],
 ['C2 1.1 Cu + AgNO₃','cristales de plata, solución celeste',rx('Cu + 2 Ag^+ -> Cu^2+ + 2 Ag'),'desplazamiento simple · redox'],
 ['C2 1.2 Zn + HCl','efervescencia (H₂)',rx('Zn + 2 H^+ -> Zn^2+ + H2'),'desplazamiento simple · redox'],
 ['C2 2.1 HCl + NaOH','fucsia → incoloro, se calienta',rx('H^+ + OH^- -> H2O'),'doble desplazamiento · neutralización'],
 ['C2 2.2 KI + Pb(NO₃)₂','precipitado amarillo; se disuelve en caliente',rx('Pb^2+ + 2 I^- -> PbI2'),'doble desplazamiento · precipitación'],
 ['C2 2.3 Na₂CO₃ + HCl','efervescencia (CO₂)',rx('CO3^2- + 2 H^+ -> H2O + CO2'),'doble desplazamiento · desprendimiento de gas']
])}
`);

  a1('resueltos','resueltos','Ejercicios resueltos del TP 1',`
${note('De dónde salen','<p>La guía del TP 1 no trae cuestionario: pide registrar lo observado y escribir las ecuaciones. Estos ejercicios están armados con los mismos ensayos, como los pregunta la evaluación de TP.</p>')}
<div data-qi-guide></div>
`);
  const ex1=[
   {n:'R1',title:'Clasificar reacciones',statement:'Clasificá cada reacción (puede tener más de un tipo): a) Fe + CuSO₄ → FeSO₄ + Cu · b) 2 KClO₃ → 2 KCl + 3 O₂ · c) Pb(NO₃)₂ + 2 KI → PbI₂ + 2 KNO₃ · d) H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O · e) CO₂ + H₂O → H₂CO₃ · f) Cu(OH)₂ + 4 NH₃ → [Cu(NH₃)₄]²⁺ + 2 OH⁻',
    solution:table(['','Reacción','Tipo'],[['a','Fe + CuSO₄ → FeSO₄ + Cu','desplazamiento simple + redox (Fe 0 → +2; Cu +2 → 0)'],['b','2 KClO₃ → 2 KCl + 3 O₂','descomposición + redox (Cl +5 → −1; O −2 → 0)'],['c','Pb(NO₃)₂ + 2 KI → PbI₂↓ + 2 KNO₃','doble desplazamiento + precipitación'],['d','H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O','ácido-base (neutralización)'],['e','CO₂ + H₂O → H₂CO₃','combinación (óxido ácido + agua → oxoácido)'],['f','Cu(OH)₂ + 4 NH₃ → [Cu(NH₃)₄]²⁺ + 2 OH⁻','formación de complejo']]),
    answer:'a desplazamiento/redox · b descomposición/redox · c precipitación · d neutralización · e combinación · f complejo'},
   {n:'R2',title:'La tabla redox de los ensayos',statement:'Para cada reacción, indicá los números de oxidación que cambian, quién se oxida, quién se reduce y cuál es el agente oxidante y el reductor: a) 2 Mg + O₂ → 2 MgO · b) 2 HgO → 2 Hg + O₂ · c) Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag · d) Zn + 2 H⁺ → Zn²⁺ + H₂ · e) (NH₄)₂Cr₂O₇ → Cr₂O₃ + N₂ + 4 H₂O',
    solution:table(['','Se oxida','Se reduce','Agente reductor','Agente oxidante'],[
     ['a','Mg: 0 → +2','O: 0 → −2','Mg','O₂'],
     ['b','O: −2 → 0','Hg: +2 → 0','HgO (su oxígeno)','HgO (su mercurio)'],
     ['c','Cu: 0 → +2','Ag: +1 → 0','Cu','Ag⁺ (AgNO₃)'],
     ['d','Zn: 0 → +2','H: +1 → 0','Zn','H⁺ (HCl)'],
     ['e','N: −3 → 0','Cr: +6 → +3','NH₄⁺ (su nitrógeno)','Cr₂O₇²⁻ (su cromo)']
    ])+step('Por qué en b y e el mismo compuesto es oxidante y reductor','<p>Son <b>redox internas</b>: dentro de un solo reactivo hay un elemento que pierde electrones y otro que los gana. En e, 2 N pierden 3 e⁻ cada uno (6 e⁻) y 2 Cr ganan 3 e⁻ cada uno (6 e⁻): cierra el balance.</p>'),
    answer:'Ver tabla. b y e son redox internas.'},
   {n:'R3',title:'¿Por qué el cobre desplaza a la plata pero no al hidrógeno?',statement:'En la Clase 2, el cobre reacciona con AgNO₃, pero si se lo pone en HCl no pasa nada. El zinc, en cambio, sí reacciona con HCl. Explicalo con los potenciales de reducción: E°(Ag⁺/Ag) = +0,80 V; E°(Cu²⁺/Cu) = +0,34 V; E°(H⁺/H₂) = 0,00 V; E°(Zn²⁺/Zn) = −0,76 V.',
    solution:step('La regla','<p>Un metal le cede electrones a la especie de una pareja con <b>mayor</b> potencial de reducción. Cuanto más bajo el E°, más reductor es el metal.</p>')+step('Cobre','<p>Cu (0,34) frente a Ag⁺ (0,80): 0,80 &gt; 0,34 → el Ag⁺ le saca electrones al Cu: <b>reacciona</b>. Cu frente a H⁺ (0,00): 0,00 &lt; 0,34 → el H⁺ no alcanza a oxidar al cobre: <b>no reacciona</b>.</p>')+step('Zinc','<p>Zn (−0,76) frente a H⁺ (0,00): 0,00 &gt; −0,76 → <b>reacciona</b> y libera H₂.</p>')+rxs(['Cu(s) + 2 Ag^+(ac) -> Cu^2+(ac) + 2 Ag(s)','sí'],['Cu(s) + HCl(ac) -> no reacciona'],['Zn(s) + 2 H^+(ac) -> Zn^2+(ac) + H2(g)','sí']),
    answer:'Orden de poder reductor: Zn &gt; H₂ &gt; Cu &gt; Ag. Cada metal desplaza sólo a los que están después.'},
   {n:'R4',title:'Masa de plata que se deposita',statement:'Si se sumergen 0,50 g de alambre de cobre en un exceso de solución de AgNO₃ y el cobre reacciona por completo, ¿qué masa de plata se deposita? (Cu = 63,5 g/mol; Ag = 107,9 g/mol)',
    solution:rx('Cu(s) + 2 AgNO3(ac) -> Cu(NO3)2(ac) + 2 Ag(s)','1 mol Cu → 2 mol Ag')+step('1. Moles de cobre','<p>n(Cu) = 0,50 g ÷ 63,5 g/mol = <b>7,87 × 10⁻³ mol</b></p>')+step('2. Moles de plata','<p>n(Ag) = 2 × 7,87 × 10⁻³ = <b>1,57 × 10⁻² mol</b></p>')+step('3. Masa de plata','<p>m(Ag) = 1,57 × 10⁻² mol × 107,9 g/mol = <b>1,70 g</b></p>'),
    answer:'≈ 1,70 g de plata (más del triple de la masa de cobre que se disolvió).'},
   {n:'R5',title:'Volumen de hidrógeno',statement:'Una granalla de 0,65 g de zinc reacciona completamente con HCl en exceso. ¿Qué volumen de H₂ se obtiene a 25 °C y 1 atm? (Zn = 65,4 g/mol; R = 0,082 atm·L/(mol·K))',
    solution:rx('Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)','1 mol Zn → 1 mol H₂')+step('1. Moles','<p>n(Zn) = 0,65 ÷ 65,4 = 9,94 × 10⁻³ mol = n(H₂)</p>')+step('2. Gases ideales','<p>V = nRT/P = 9,94 × 10⁻³ × 0,082 × 298 ÷ 1 = <b>0,243 L</b></p>'),
    answer:'≈ 0,243 L = 243 mL de H₂.'},
   {n:'R6',title:'Explicar el ensayo de neutralización',statement:'En el ensayo 2.1 de la Clase 2: a) ¿por qué el tubo con agua y fenolftaleína es incoloro y se pone fucsia con NaOH? b) ¿Qué pasa al agregar HCl y por qué se calienta el tubo? c) ¿Por qué vuelve el fucsia con más NaOH? Escribí la ecuación iónica neta.',
    solution:step('a','<p>La fenolftaleína es incolora en medio neutro o ácido y fucsia en medio básico. El agua es neutra; el NaOH aporta OH⁻ y el medio queda básico.</p>')+step('b','<p>Los H⁺ del ácido reaccionan con los OH⁻: cuando el ácido supera a la base, ya no quedan OH⁻ y el indicador se decolora. La neutralización es <b>exotérmica</b>: libera calor.</p>')+rx('H^+(ac) + OH^-(ac) -> H2O(l)','ΔH &lt; 0')+step('c','<p>Al agregar más NaOH vuelven a sobrar OH⁻. El viraje del indicador es reversible: depende sólo de si el medio es básico o no.</p>'),
    answer:'H⁺ + OH⁻ → H₂O, exotérmica; el color sigue al medio (básico = fucsia).'},
   {n:'R7',title:'Ecuaciones moleculares e iónicas de la Clase 2',statement:'Escribí la ecuación molecular y la iónica neta de: a) KI + Pb(NO₃)₂ · b) Na₂CO₃ + HCl · c) Zn + HCl. Indicá en cada caso los iones espectadores.',
    solution:table(['','Molecular','Iónica neta','Espectadores'],[
     ['a',rx('Pb(NO3)2 + 2 KI -> PbI2↓ + 2 KNO3'),rx('Pb^2+ + 2 I^- -> PbI2↓'),'K⁺, NO₃⁻'],
     ['b',rx('Na2CO3 + 2 HCl -> 2 NaCl + H2O + CO2↑'),rx('CO3^2- + 2 H^+ -> H2O + CO2↑'),'Na⁺, Cl⁻'],
     ['c',rx('Zn + 2 HCl -> ZnCl2 + H2↑'),rx('Zn + 2 H^+ -> Zn^2+ + H2↑'),'Cl⁻']
    ]),
    answer:'Ver tabla.'}
  ];
  window.ET27_QI4.units.push({id:'tp1',part:'tp',kind:'tp',n:1,title:'TP 1 · Reacciones químicas',short:'Reacciones químicas',tab:'Reacciones',lead:'Combinación, descomposición y desplazamiento: los nueve ensayos de la guía explicados, la teoría para clasificar reacciones y escribir ecuaciones, ejercicios resueltos y multiple choice.',sections:s1,exercises:ex1});

  // =====================================================================
  // TP 2 · COMPLEJOS
  // =====================================================================
  const s2=[];const a2=(k,block,l,h)=>s2.push({key:`qi-tp2-${k}`,block,label:l,kicker:'',html:h});

  a2('lab','antes','Antes de entrar al laboratorio',`
<p>En el TP 2 se ven los <b>compuestos de coordinación</b> (complejos) en acción. Son tres experiencias cortas, todas en tubo, y en las tres el protagonista es un <b>cambio de color</b> o un precipitado que aparece o se disuelve:</p>
${table(['Experiencia','Qué se hace','Qué se ve'],[
 ['1 · Formación de complejos','NH₃ concentrado + gotas de CuSO₄ · KSCN + gotas de FeCl₃','azul intenso · rojo sangre'],
 ['2 · Disolución de un precipitado','AgNO₃ + cromato → precipitado; después NH₃ concentrado','precipitado rojo ladrillo que se disuelve'],
 ['3 · Intercambio de ligandos','sal de cobalto(II) + HCl concentrado; después agua','rosa → azul → rosa']
])}
${punch('Un complejo cambia de color cuando cambian los ligandos que rodean al metal.')}
${warn('Seguridad','<ul><li>El <b>amoníaco concentrado</b> y el <b>HCl concentrado</b> desprenden vapores irritantes: se usan bajo campana y con gotero, sin olerlos.</li><li>El <b>cromato</b> tiene cromo(VI) y las sales de <b>cobalto</b> son tóxicas: guantes, y nada al desagüe.</li><li>Los residuos con plata y cromo van a los recipientes que indique el docente.</li></ul>')}
${note('Para el informe','<p>En cada tubo: color inicial, qué se agregó, color o cambio final, ecuación con el complejo entre corchetes y su <b>nombre</b>.</p>')}
`);

  a2('que-es','teoria','¿Qué es un complejo?',`
<p>Un <b>complejo</b> (o compuesto de coordinación) es un <b>ion metálico central</b> rodeado por <b>ligandos</b>: moléculas o iones que le “prestan” un par de electrones libre. El metal es el <b>ácido de Lewis</b> (acepta pares) y el ligando la <b>base de Lewis</b> (los dona). La unión es un enlace <b>covalente coordinado</b> (dativo).</p>
${rx('Cu^2+(ac) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac)','H₃N: → Cu²⁺')}
${table(['Concepto','Qué significa'],[['Ion central','casi siempre un catión de metal de transición'],['Ligando','dona un par de electrones no compartido'],['Número de coordinación','cuántos enlaces forma el ion central con ligandos (habitualmente 2, 4 o 6)'],['Geometría','2 → lineal · 4 → tetraédrica o cuadrado plana · 6 → octaédrica'],['Corchetes','encierran el ion complejo; la carga va afuera']])}
${idea('La carga del complejo','<p>Se suman la carga del metal y la de los ligandos: [Fe(CN)₆]: Fe³⁺ + 6 CN⁻ → +3 − 6 = <b>−3</b>. [Cu(NH₃)₄]: Cu²⁺ + 4 NH₃ (neutro) → <b>+2</b>. [CoCl₄]: Co²⁺ + 4 Cl⁻ → <b>−2</b>.</p>')}
<h3>Ningún catión está “desnudo” en agua</h3>
<p>El Cu²⁺ de una solución de CuSO₄ en realidad está rodeado de moléculas de agua: es el acuocomplejo [Cu(H₂O)₄]²⁺ (o [Cu(H₂O)₆]²⁺), y ese es el responsable del color celeste. Por eso casi todas las reacciones de este TP son en realidad <b>intercambios de ligandos</b>: el agua es reemplazada por otro ligando.</p>
${table(['Ion en agua','Color','Ion complejo que se forma en el TP','Color'],[
 ['[Cu(H₂O)₄]²⁺',swatch(C.celeste,'celeste'),'[Cu(NH₃)₄]²⁺',swatch(C.azul,'azul intenso')],
 ['Fe³⁺ en la solución de FeCl₃',swatch(C.amarillo,'amarillo'),'[Fe(SCN)(H₂O)₅]²⁺',swatch(C.rojo,'rojo sangre')],
 ['[Co(H₂O)₆]²⁺',swatch(C.rosaCo,'rosa'),'[CoCl₄]²⁻',swatch(C.azulCo,'azul')],
 ['Ag⁺ (ac)','incoloro','[Ag(NH₃)₂]⁺','incoloro']
])}
<h3>Cationes que suelen formar complejos</h3>
<p>Fe³⁺, Fe²⁺, Cu²⁺, Cu⁺, Co²⁺, Co³⁺, Ni²⁺, Zn²⁺, Ag⁺, Cr³⁺, Mn²⁺ (y también Al³⁺, Pb²⁺, Sn²⁺ con OH⁻).</p>
`);

  a2('nomenclatura','teoria','Ligandos y nomenclatura',`
${table(['Ligando','Fórmula','Nombre en el complejo'],[['agua','H₂O','acuo (aqua)'],['amoníaco','NH₃','ammin (en clase: amin)'],['cloruro','Cl⁻','cloro'],['fluoruro','F⁻','fluoro'],['bromuro','Br⁻','bromo'],['ioduro','I⁻','yodo'],['cianuro','CN⁻','ciano'],['hidróxido','OH⁻','hidroxo'],['oxalato','C₂O₄²⁻','oxalato'],['sulfato','SO₄²⁻','sulfato'],['sulfuro','S²⁻','sulfuro (o tio)'],['tiosulfato','S₂O₃²⁻','tiosulfato'],['tiocianato (sulfocianuro)','SCN⁻','tiocianato']])}
<h3>Reglas para nombrar</h3>
<ol class="kitList"><li><b>Ligandos</b> con prefijo de cantidad (di, tri, tetra, penta, hexa), en orden <b>alfabético</b> (sin contar el prefijo).</li><li>Después el <b>metal</b> con su número de oxidación en números romanos.</li><li>Si el complejo es un <b>anión</b>, el metal termina en <b>-ato</b> (ferrato, cuprato, argentato, zincato, cobaltato, plumbato). Si es catión o neutro, el metal conserva su nombre.</li><li>En el compuesto, se nombra primero el anión y después el catión, como en cualquier sal.</li></ol>
${table(['Ion complejo','Nombre','Compuesto','Nombre del compuesto'],[
 ['[Cu(NH₃)₄]²⁺','tetraammincobre(II)','[Cu(NH₃)₄]SO₄','sulfato de tetraammincobre(II)'],
 ['[Ag(CN)₂]⁻','dicianoargentato(I)','K[Ag(CN)₂]','dicianoargentato(I) de potasio'],
 ['[Fe(CN)₆]³⁻','hexacianoferrato(III)','K₃[Fe(CN)₆]','hexacianoferrato(III) de potasio'],
 ['[Zn(OH)₄]²⁻','tetrahidroxozincato(II)','Na₂[Zn(OH)₄]','tetrahidroxozincato(II) de sodio']
])}
${note('Ammin o amin','<p>En el apunte de clase aparece “tetramincobre(II)” y “diaminoplata(I)”. La forma recomendada por IUPAC es <b>ammin</b> (con dos m: tetraammincobre(II), diamminplata(I)). Ambas se entienden; usá la que pida el profesor. Lo mismo con “cloro/ciano/hidroxo”: las recomendaciones nuevas dicen cloruro, cianuro, hidróxido, pero en el colegio se usan las formas cortas.</p>')}
`);

  a2('intercambio','teoria','Intercambio de ligandos y disolución de precipitados',`
<p>Un ligando puede <b>desplazar</b> a otro si forma un complejo más estable (mayor constante de formación). Orden de prioridad según el apunte de clase (de mayor a menor estabilidad de sus complejos):</p>
${punch('CN⁻ &gt; NH₃ &gt; F⁻ &gt; SCN⁻ &gt; OH⁻ &gt; H₂O &gt; Cl⁻')}
${note('Ojo','<p>Es una regla práctica: el orden real depende de cada metal. Además, un ligando “débil” en <b>gran exceso</b> puede ganar: con HCl concentrado, el Cl⁻ desplaza al agua del cobalto y del cobre (experiencia 3, y el [CuCl₄]²⁻ del TP 4). Al diluir con agua, el agua vuelve a ganar. Son <b>equilibrios</b> que se corren según Le Chatelier.</p>')}
${rxs(['[Cu(H2O)4]^2+ + 4 NH3 -> [Cu(NH3)4]^2+ + 4 H2O','celeste → azul intenso'],['[Fe(H2O)6]^3+ + 6 CN^- -> [Fe(CN)6]^3- + 6 H2O'],['[Fe(H2O)6]^3+ + SCN^- -> [Fe(SCN)(H2O)5]^2+ + H2O','rojo sangre: reconocimiento del Fe³⁺'],['[Co(H2O)6]^2+ + 4 Cl^- <=> [CoCl4]^2- + 6 H2O','rosa ⇌ azul'])}
<h3>Un precipitado que se disuelve por formar un complejo</h3>
<p>Si un catión está atrapado en un sólido poco soluble y se agrega un ligando que lo “agarra” muy fuerte, el complejo le saca el catión al sólido y el precipitado se disuelve:</p>
${rxs(['Cu(OH)2(s) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac) + 2 OH^-(ac)'],['AgCl(s) + 2 NH3(ac) -> [Ag(NH3)2]^+(ac) + Cl^-(ac)'],['Ag2CrO4(s) + 4 NH3(ac) -> 2 [Ag(NH3)2]^+(ac) + CrO4^2-(ac)','experiencia 2 del TP'])}
<p>Con <b>pocas gotas</b> de NH₃ se forma poco complejo y queda precipitado; con <b>exceso</b> el precipitado se disuelve por completo. Es la misma lógica que se usa en el TP 5 (amoníaco como ligando).</p>
<h3>Más reacciones de formación</h3>
${table(['Reacción','Nombre del complejo'],[
 [rx('Ag^+ + 2 NH3 -> [Ag(NH3)2]^+'),'diamminplata(I)'],
 [rx('Fe^2+ + 6 CN^- -> [Fe(CN)6]^4-'),'hexacianoferrato(II)'],
 [rx('Ni^2+ + 6 H2O -> [Ni(H2O)6]^2+'),'hexaacuoníquel(II)'],
 [rx('Ni^2+ + 6 NH3 -> [Ni(NH3)6]^2+'),'hexaamminníquel(II)'],
 [rx('Co^3+ + 6 NH3 -> [Co(NH3)6]^3+'),'hexaammincobalto(III)'],
 [rx('Co^2+ + 4 Cl^- -> [CoCl4]^2-'),'tetraclorocobaltato(II)'],
 [rx('Zn^2+ + 4 OH^- -> [Zn(OH)4]^2-'),'tetrahidroxozincato(II)'],
 [rx('Cu^2+ + 4 Cl^- -> [CuCl4]^2-'),'tetraclorocuprato(II)'],
 [rx('Ag^+ + 2 S2O3^2- -> [Ag(S2O3)2]^3-'),'ditiosulfatoargentato(I)'],
 [rx('Pb^2+ + 4 I^- -> [PbI4]^2-'),'tetrayodoplumbato(II)'],
 [rx('Fe^3+ + 3 C2O4^2- -> [Fe(C2O4)3]^3-'),'trioxalatoferrato(III)'],
 [rx('Fe^3+ + 3 SCN^- -> [Fe(SCN)3]'),'tritiocianatohierro(III) (neutro: sin “-ato”)'],
 [rx('Cu^2+ + EDTA^4- -> [Cu(EDTA)]^2-'),'etilendiaminotetraacetatocuprato(II)'],
 [rx('Au^3+ + 4 Cl^- -> [AuCl4]^-'),'tetracloroaurato(III)'],
 [rx('Pt^2+ + 2 NH3 + 2 Cl^- -> [Pt(NH3)2Cl2]'),'diammindicloroplatino(II) (el cis es el cisplatino)']
])}
${fix('Correcciones a la lista de clase','<ul><li>“Fe²⁺ + 3 C₂O₄²⁻ → [Fe(C₂O₄)₃]³⁻ trioxalatoferrato(III)”: si la carga es 3−, el hierro es <b>Fe³⁺</b>. Con Fe²⁺ sería [Fe(C₂O₄)₃]⁴⁻, trioxalatoferrato(II).</li><li>“[Fe(SCN)₃] tris(tiocianato)<b>ferrato</b>(III)”: es neutro, no anión; se llama tritiocianatohierro(III) (sin “-ato”).</li><li>“[Cu(EDTA)]²⁻ etilendiaminotetraacetato<b>cobre</b>(II)” y “[Co(EDTA)]⁻ …<b>cobalto</b>(III)”: son aniones, así que llevan “-ato”: …<b>cuprato</b>(II) y …<b>cobaltato</b>(III).</li><li>“[Fe(NO)₂]²⁺ dinitrosil<b>ferrato</b>(II)”: es un catión, no lleva “-ato”. No hace falta aprenderlo para el TP.</li></ul>')}
`);

  a2('ensayos','ensayos','Ensayos · Formación, disolución e intercambio de complejos',`
${guia('TP N.º 2: Complejos (desarrollo experimental). Tres experiencias en tubos de hemólisis y de ensayo.')}
<h3>1 · Reacciones de formación de complejos</h3>
${table(['Tubo','2 mL de…','gotas de… hasta ver cambios'],[['1','amoníaco concentrado','sulfato cúprico'],['2','tiocianato de potasio (KSCN)','cloruro férrico']])}
${ensayo({n:'1',tag:'TUBO',title:'Amoníaco concentrado + gotas de sulfato cúprico',
 hacemos:'<p>Sobre 2 mL de NH₃ concentrado se agregan gotas de CuSO₄ y se agita.</p>',
 vemos:`<p>Cada gota celeste se transforma enseguida en un ${swatch(C.azul,'azul intenso')} (azul “royal”). Puede aparecer un instante una nubecita celeste donde cae la gota, que se disuelve al agitar.</p>`,
 pasa:rxs(['[Cu(H2O)4]^2+(ac) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac) + 4 H2O(l)','ion tetraammincobre(II)'],['CuSO4(ac) + 4 NH3(ac) -> [Cu(NH3)4]SO4(ac)','molecular: sulfato de tetraammincobre(II)'])+'<p>Como el amoníaco está en <b>exceso desde el principio</b>, el cobre pasa directo al complejo amoniacal y casi no se ve el precipitado de Cu(OH)₂. Si se hiciera al revés (gotas de NH₃ sobre CuSO₄, como en el TP 5), primero precipitaría el hidróxido celeste y recién con exceso se disolvería.</p>',
 demuestra:'el NH₃ es un ligando (base de Lewis) que desplaza al agua del Cu²⁺; el complejo amoniacal es azul intenso.'})}
${ensayo({n:'2',tag:'TUBO',title:'Tiocianato de potasio + gotas de cloruro férrico',
 hacemos:'<p>Sobre 2 mL de KSCN (incoloro) se agregan gotas de FeCl₃ (amarillo).</p>',
 vemos:`<p>Con la primera gota aparece un color ${swatch(C.rojo,'rojo sangre')} muy intenso.</p>`,
 pasa:rxs(['[Fe(H2O)6]^3+(ac) + SCN^-(ac) -> [Fe(SCN)(H2O)5]^2+(ac) + H2O(l)','ion pentaacuotiocianatohierro(III)'],['Fe^3+(ac) + SCN^-(ac) -> [Fe(SCN)]^2+(ac)','forma abreviada'])+'<p>Con mucho exceso de SCN⁻ entran más tiocianatos (hasta [Fe(SCN)₆]³⁻), pero el color sigue siendo rojo. Es una reacción tan sensible que se usa para <b>reconocer Fe³⁺</b>: la misma que aparece en el TP 4 para demostrar que el O₂ oxidó al Fe²⁺.</p>',
 demuestra:'formación de un complejo coloreado; reconocimiento del ion férrico.'})}
<h3>2 · Disolución de un precipitado por formación de un complejo</h3>
${ensayo({n:'2',title:'Cromato de plata y amoníaco',
 hacemos:'<p>En un tubo de hemólisis: 1 mL de <b>nitrato de plata</b> y solución de <b>cromato</b> hasta ver un precipitado o turbidez. Después, gotas de <b>amoníaco concentrado</b> hasta ver cambios.</p>',
 vemos:`<p>Se forma un <b>precipitado</b> ${swatch(C.ladrillo,'rojo ladrillo')}. Con el amoníaco el precipitado <b>se disuelve</b> y queda una solución ${swatch(C.amarillo,'amarilla')} transparente.</p>`,
 pasa:rxs(['2 AgNO3(ac) + K2CrO4(ac) -> Ag2CrO4(s)↓ + 2 KNO3(ac)','cromato de plata: rojo ladrillo'],['2 Ag^+(ac) + CrO4^2-(ac) -> Ag2CrO4(s)↓','iónica neta'],['Ag2CrO4(s) + 4 NH3(ac) -> 2 [Ag(NH3)2]^+(ac) + CrO4^2-(ac)','ion diamminplata(I): incoloro'])+'<p>El precipitado está en equilibrio con una cantidad muy pequeña de Ag⁺ disuelto. El NH₃ “atrapa” esos Ag⁺ en el complejo [Ag(NH₃)₂]⁺, muy estable: el equilibrio de solubilidad se corre y el sólido se sigue disolviendo (Le Chatelier). El color amarillo final es del <b>cromato</b> que quedó libre en la solución; el complejo de plata es incoloro.</p>',
 demuestra:'un precipitado se puede disolver si el catión forma un complejo estable con el reactivo agregado.'})}
${errata('Ojo con la guía','<p>La guía dice agregar “solución de <b>cromato de plata</b>”. El cromato de plata es justamente el precipitado que se forma, así que no puede estar en solución: lo que se agrega es <b>cromato de potasio</b> (K₂CrO₄, amarillo).</p>')}
<h3>3 · Intercambio de ligandos en un complejo</h3>
${ensayo({n:'3',title:'Cloruro cobaltoso, ácido clorhídrico y agua',
 hacemos:'<p>En un tubo de ensayos: una punta de espátula de <b>cloruro cobaltoso</b> (o de otra sal cobaltosa) y unas 20 gotas de <b>HCl concentrado</b> hasta disolver (más gotas si hace falta). Se registra el color. Después se agrega <b>agua lentamente</b> y se registran los cambios.</p>',
 vemos:`<p>El sólido es ${swatch(C.rosaCo,'rosado')} (CoCl₂·6H₂O). En HCl concentrado se disuelve dando una solución ${swatch(C.azulCo,'azul')}. Al agregar agua, el color pasa por violeta y termina ${swatch(C.rosaCo,'rosa')}.</p>`,
 pasa:rx('[Co(H2O)6]^2+(ac) + 4 Cl^-(ac) <=> [CoCl4]^2-(ac) + 6 H2O(l)','rosa (octaédrico) ⇌ azul (tetraédrico)')+`<p>En HCl concentrado hay tantísimo Cl⁻ que el equilibrio se corre a la derecha: el cloruro desplaza al agua y se forma el <b>tetraclorocobaltato(II)</b>, azul. Al agregar agua aumenta el agua y baja la concentración de Cl⁻: el equilibrio vuelve a la izquierda y se regenera el <b>hexaacuocobalto(II)</b>, rosa. El violeta intermedio es la mezcla de los dos.</p>`,
 demuestra:'el intercambio de ligandos es un equilibrio: se desplaza con la concentración (Le Chatelier). Cambia el ligando, cambian la geometría y el color.'})}
${idea('Ampliación: también cambia con la temperatura','<p>La formación del [CoCl₄]²⁻ es endotérmica. Si se calienta la solución violeta se pone más azul, y si se enfría en hielo se pone más rosa. Por eso se usa el cloruro de cobalto en indicadores de humedad (azul seco, rosa húmedo).</p>')}
`);

  a2('resumen','ensayos','Cuadro resumen del TP 2',`
${table(['Experiencia','Qué se ve','Ecuación','Complejo'],[
 ['1 · NH₃ + CuSO₄','celeste → azul intenso',rx('[Cu(H2O)4]^2+ + 4 NH3 -> [Cu(NH3)4]^2+ + 4 H2O'),'tetraammincobre(II)'],
 ['1 · KSCN + FeCl₃','rojo sangre',rx('Fe^3+ + SCN^- -> [Fe(SCN)]^2+'),'tiocianatohierro(III)'],
 ['2 · AgNO₃ + K₂CrO₄','precipitado rojo ladrillo',rx('2 Ag^+ + CrO4^2- -> Ag2CrO4↓'),'— (precipitación)'],
 ['2 · + NH₃ concentrado','el precipitado se disuelve; solución amarilla',rx('Ag2CrO4 + 4 NH3 -> 2 [Ag(NH3)2]^+ + CrO4^2-'),'diamminplata(I)'],
 ['3 · CoCl₂ + HCl (c)','rosa → azul',rx('[Co(H2O)6]^2+ + 4 Cl^- <=> [CoCl4]^2- + 6 H2O'),'tetraclorocobaltato(II)'],
 ['3 · + agua','azul → violeta → rosa','(el mismo equilibrio, hacia la izquierda)','hexaacuocobalto(II)']
])}
`);

  a2('resueltos','resueltos','Ejercicios resueltos del TP 2',`
${note('De dónde salen','<p>C1 es la tabla “para completar en clase” del resumen del TP 2. Los demás están armados con los ensayos de la guía, como los pregunta la evaluación de TP.</p>')}
<div data-qi-guide></div>
`);
  const ex2=[
   {n:'C1',title:'Completar la tabla de complejos',statement:'Completá los espacios: <br>a) [Cu(NH₃)₄]²⁺ → nombre del ion · fórmula del sulfato · nombre del compuesto<br>b) dicianoargentato(I) → fórmula del ion · sal de potasio · nombre de la sal<br>c) K₃[Fe(CN)₆] → fórmula del ion · nombre del ion · nombre del compuesto<br>d) tetrahidroxozincato(II) → fórmula del ion · sal de sodio · nombre de la sal',
    solution:table(['Ion complejo','Nombre','Compuesto','Nombre del compuesto'],[['[Cu(NH₃)₄]²⁺','tetraammincobre(II)','[Cu(NH₃)₄]SO₄','sulfato de tetraammincobre(II)'],['[Ag(CN)₂]⁻','dicianoargentato(I)','K[Ag(CN)₂]','dicianoargentato(I) de potasio'],['[Fe(CN)₆]³⁻','hexacianoferrato(III)','K₃[Fe(CN)₆]','hexacianoferrato(III) de potasio'],['[Zn(OH)₄]²⁻','tetrahidroxozincato(II)','Na₂[Zn(OH)₄]','tetrahidroxozincato(II) de sodio']])+step('Cómo sacar la carga','<p>[Ag(CN)₂]: +1 + 2·(−1) = −1 · [Fe(CN)₆]: +3 + 6·(−1) = −3 · [Zn(OH)₄]: +2 + 4·(−1) = −2. La cantidad de K⁺ o Na⁺ es la que neutraliza esa carga.</p>'),
    answer:'Ver tabla completa.'},
   {n:'C2',title:'Nombrar y formular',statement:'a) Nombrá [Ni(NH₃)₆]Cl₂ y K₄[Fe(CN)₆]. b) Escribí la fórmula del tetraclorocuprato(II) de sodio y del sulfato de tetraacuocobre(II).',
    solution:step('a','<p>[Ni(NH₃)₆]Cl₂: cloruro de hexaamminníquel(II) (Ni: x + 0 = +2). K₄[Fe(CN)₆]: hexacianoferrato(II) de potasio (x − 6 = −4 → Fe²⁺).</p>')+step('b','<p>[CuCl₄]²⁻ necesita 2 Na⁺: <b>Na₂[CuCl₄]</b>. [Cu(H₂O)₄]²⁺ con SO₄²⁻: <b>[Cu(H₂O)₄]SO₄</b>.</p>'),
    answer:'cloruro de hexaamminníquel(II) · hexacianoferrato(II) de potasio · Na₂[CuCl₄] · [Cu(H₂O)₄]SO₄'},
   {n:'C3',title:'Ion central, ligandos, carga y geometría',statement:'Para [Cu(NH₃)₄]²⁺, [Fe(SCN)(H₂O)₅]²⁺, [Ag(NH₃)₂]⁺, [CoCl₄]²⁻ y [Co(H₂O)₆]²⁺ indicá: número de oxidación del metal, ligandos, número de coordinación y geometría.',
    solution:table(['Complejo','N.o. del metal','Ligandos','N.º de coordinación','Geometría'],[
     ['[Cu(NH₃)₄]²⁺','+2','4 NH₃','4','cuadrado plana'],
     ['[Fe(SCN)(H₂O)₅]²⁺','+3 (x − 1 = +2)','1 SCN⁻ y 5 H₂O','6','octaédrica'],
     ['[Ag(NH₃)₂]⁺','+1','2 NH₃','2','lineal'],
     ['[CoCl₄]²⁻','+2 (x − 4 = −2)','4 Cl⁻','4','tetraédrica'],
     ['[Co(H₂O)₆]²⁺','+2','6 H₂O','6','octaédrica']
    ])+step('Truco','<p>Los ligandos neutros (NH₃, H₂O) no aportan carga: el n.o. del metal es la carga del complejo menos la de los ligandos aniónicos.</p>'),
    answer:'Ver tabla.'},
   {n:'C4',title:'Ecuaciones y nombres de la experiencia 1',statement:'Escribí las ecuaciones de los tubos 1 y 2 de la experiencia 1 y nombrá el ion complejo que se forma en cada uno. ¿Por qué en el tubo 1 casi no se ve precipitado?',
    solution:rxs(['[Cu(H2O)4]^2+ + 4 NH3 -> [Cu(NH3)4]^2+ + 4 H2O','tetraammincobre(II): azul intenso'],['[Fe(H2O)6]^3+ + SCN^- -> [Fe(SCN)(H2O)5]^2+ + H2O','pentaacuotiocianatohierro(III): rojo sangre'])+step('El orden de agregado','<p>Se agregan gotas de CuSO₄ sobre <b>mucho</b> NH₃: el amoníaco está siempre en exceso y el Cu²⁺ pasa directo al complejo. El Cu(OH)₂ sólo se ve cuando el NH₃ escasea (gotas de NH₃ sobre la sal de cobre).</p>'),
    answer:'Tubo 1: [Cu(NH₃)₄]²⁺ · Tubo 2: [Fe(SCN)(H₂O)₅]²⁺ (o [Fe(SCN)]²⁺).'},
   {n:'C5',title:'¿Por qué se disuelve el cromato de plata?',statement:'Explicá con ecuaciones por qué el precipitado de la experiencia 2 se disuelve al agregar NH₃ concentrado. ¿De qué color queda la solución y a qué se debe?',
    solution:rxs(['Ag2CrO4(s) <=> 2 Ag^+(ac) + CrO4^2-(ac)','equilibrio de solubilidad: muy poco Ag⁺ libre'],['Ag^+(ac) + 2 NH3(ac) -> [Ag(NH3)2]^+(ac)','el NH₃ captura el Ag⁺'],['Ag2CrO4(s) + 4 NH3(ac) -> 2 [Ag(NH3)2]^+(ac) + CrO4^2-(ac)','global'])+step('Le Chatelier','<p>Al formar el complejo baja la concentración de Ag⁺ libre; el equilibrio de solubilidad se desplaza hacia la derecha para reponerlo y el sólido se va disolviendo hasta desaparecer.</p>')+step('El color','<p>El [Ag(NH₃)₂]⁺ es incoloro; el color <b>amarillo</b> que queda es del ion cromato (CrO₄²⁻), que ahora está libre en la solución.</p>'),
    answer:'Se forma diamminplata(I), muy estable; la solución queda amarilla por el cromato.'},
   {n:'C6',title:'El equilibrio del cobalto',statement:'En la experiencia 3: a) escribí el equilibrio y nombrá las dos especies; b) explicá el cambio de color al disolver en HCl concentrado y al agregar agua; c) ¿qué esperarías si se calienta la solución violeta, sabiendo que la formación del complejo azul es endotérmica?',
    solution:rx('[Co(H2O)6]^2+ + 4 Cl^- <=> [CoCl4]^2- + 6 H2O','ΔH &gt; 0')+step('a','<p>Izquierda: hexaacuocobalto(II), rosa, octaédrico. Derecha: tetraclorocobaltato(II), azul, tetraédrico.</p>')+step('b','<p>Con HCl concentrado aumenta [Cl⁻] → el equilibrio se corre a la derecha → azul. Con agua se diluye el Cl⁻ y aumenta el agua → se corre a la izquierda → rosa.</p>')+step('c','<p>Si la reacción directa absorbe calor, al calentar se favorece la formación del complejo azul: la solución se pone más azul. Al enfriar, más rosa.</p>'),
    answer:'Más Cl⁻ o más temperatura → azul; más agua o frío → rosa.'}
  ];
  window.ET27_QI4.units.push({id:'tp2',part:'tp',kind:'tp',n:2,title:'TP 2 · Complejos',short:'Complejos',tab:'Complejos',lead:'Formación de complejos, disolución de un precipitado e intercambio de ligandos: las tres experiencias de la guía explicadas, la teoría de nomenclatura y estructura, ejercicios resueltos y multiple choice.',sections:s2,exercises:ex2});
})();
