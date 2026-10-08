// 27xSOLved · Química Inorgánica 4.º · TRABAJO PRÁCTICO N.º 4
// Hidrógeno, oxígeno y metales de los grupos 1 y 2 — guía de laboratorio explicada ensayo por ensayo.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  const {chain,idea,warn,fix,note,example,step,table,figure}=K;
  const {rx,rxs,f,vira,swatch,ensayo,pic,punch,svg}=Q;
  const R=String.raw;
  const s=[];const add=(key,label,kicker,html)=>s.push({key:`qi-tp4-${key}`,label,kicker,html});
  const ver=(id,label)=>`<p class="guideLink">📘 Material teórico: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;

  add('intro','Antes de entrar al laboratorio','TP 4 · 00',`
<p>Este TP recorre los protagonistas más “simples” de la química inorgánica: el <b>hidrógeno</b>, el <b>oxígeno</b>, el <b>agua</b> y los metales más reactivos de la tabla, los de los <b>grupos 1 y 2</b>. Se hace en dos clases:</p>
${table(['Clase','Quién hace los ensayos','Qué se ve'],[
 ['Clase 1 · demostrativa','el docente','obtención de H₂ y O₂, metales con oxígeno, colores a la llama, sodio en amoníaco líquido'],
 ['Clase 2 · en grupos de 2 o 3','ustedes','metales con agua, ácidos y bases; hidruros; O₂ desde oxosales y H₂O₂; hidratos, complejos, hidrólisis y agua oxigenada']
])}
${punch('En cada ensayo hay que registrar tres cosas: el aparato, lo que se observa y la reacción que lo explica.')}
${figure(svg.gases,'Cómo se recoge cada gas según su solubilidad y su densidad.')}
${warn('Seguridad','<ul><li>El <b>sodio</b> es muy peligroso: sólo lo manipula el docente.</li><li>No mirar directamente el <b>magnesio</b> ardiendo.</li><li>Pedir que el docente revise el aparato <b>antes</b> de empezar a generar gas.</li><li>Con el permanganato calentado: la astilla <b>no</b> debe caer dentro del tubo.</li></ul>')}
${note('Plantilla para el informe','<ol class="kitList"><li>Nombre del ensayo y esquema del aparato.</li><li>Observaciones (colores, gases, precipitados, calor, luz).</li><li>Ecuación balanceada (y si es redox, quién se oxida y quién se reduce).</li><li>Propiedad que demuestra.</li></ol>')}
`);

  // ---------------- CLASE 1 ----------------
  add('c1-hidrogeno','Clase 1 · Hidrógeno: obtención, identificación y densidad','TP 4 · CLASE 1 · 01',`
${ver('hidrogeno-oxigeno:qi-ho-hidrogeno','Hidrógeno')}
${ensayo({n:'1.1',title:'Obtención de hidrógeno',
 hacemos:`<p>Se llenan tubos con agua y se invierten en la cuba hidroneumática. En un tubo sujeto al pie universal se ponen dos granallas de <b>zinc</b>, se agregan 5 mL de <b>HCl 18 %</b> (≈ 6 M) y se tapa enseguida con el tubo acodado, cuya salida va dentro del tubo invertido.</p>`+pic('generador-h2.webp','Aparato generador de hidrógeno','Figura 1 de la guía.'),
 vemos:`<ul><li>Burbujeo intenso sobre el zinc; el tubo se entibia.</li><li>El gas entra al tubo invertido y <b>desplaza el agua</b> hacia abajo.</li><li>El zinc se va gastando.</li></ul>`,
 pasa:`<p>El zinc es más reductor que el hidrógeno: les cede electrones a los H⁺ del ácido.</p>`+rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)↑'],['Zn(s) + 2 H^+(ac) -> Zn^2+(ac) + H2(g)','Zn se oxida · H⁺ se reduce']),
 demuestra:'obtención de H₂ a partir de un metal activo y un ácido no oxidante; el H₂ es casi insoluble en agua (por eso se recoge en la cuba).'})}
${ensayo({n:'1.2',title:'Identificación del hidrógeno',
 hacemos:`<p>Se toma un tubo con H₂, siempre <b>boca abajo</b>, y se acerca a la llama del mechero dos o tres veces, inclinándolo un poco.</p>`,
 vemos:`<p>Un pequeño estallido: el clásico <b>“ladrido”</b>. A veces se ven gotitas en las paredes.</p>`,
 pasa:rx('2 H2(g) + O2(g) =[llama]=> 2 H2O(g)','combustión explosiva de la mezcla con el aire'),
 demuestra:'el H₂ es combustible; es el ensayo de reconocimiento del hidrógeno.'})}
${ensayo({n:'1.3',title:'Ensayo de densidad',
 hacemos:`<p>Tubo A con H₂ (boca abajo) arriba de un tubo B con aire (boca arriba), unidos por la boca. Se invierten juntos: <b>B queda arriba y A abajo</b>. Se espera y se prueba cada tubo a la llama.</p>`+pic('densidad-h2.webp','Dos tubos unidos por la boca, A y B, antes y después de invertir','Figura 2 de la guía.','qiSmallPic'),
 vemos:`<p>El “ladrido” aparece en el tubo <b>B</b> (el de arriba, que tenía aire), y el A casi no ladra.</p>`,
 pasa:`<p>Al invertir, el hidrógeno quedó abajo. Como es muchísimo más liviano que el aire, <b>sube</b> al tubo de arriba y el aire baja.</p>`+K.chain([R`\frac{\delta_{\mathrm{H_2}}}{\delta_{\text{aire}}}=\frac{2}{29}\approx0{,}07`,'≈ 14 veces más liviano']),
 demuestra:'el H₂ es mucho menos denso que el aire.'})}
`);

  add('c1-oxigeno','Clase 1 · Oxígeno: obtención y propiedades','TP 4 · CLASE 1 · 02',`
${ver('hidrogeno-oxigeno:qi-ho-oxigeno','Oxígeno')}
${ensayo({n:'2',title:'Obtención de oxígeno a partir de clorato de potasio',
 hacemos:`<p>Se mezcla <b>KClO₃</b> con una punta de espátula de <b>MnO₂</b> en un tubo pírex, se calienta y el gas se recoge en la cuba (mismo aparato que el H₂, pero con mechero). Antes se preparan los tubos 1 y 2 con soluciones.</p>`+pic('generador-o2.webp','Aparato para obtener oxígeno con calentamiento','Figura 3 de la guía.'),
 vemos:`<p>La mezcla funde, burbujea y el gas desplaza el agua. El MnO₂ sigue negro al final.</p>`,
 pasa:rx('2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)↑','el MnO₂ es catalizador'),
 demuestra:'obtención de O₂ por descomposición térmica de una oxosal; acción de un catalizador.'})}
<h3>Ensayos con el oxígeno obtenido</h3>
${ensayo({n:'1',tag:'TUBO',title:'O₂ en ioduro de potasio acidificado (luego + cloroformo)',
 hacemos:`<p>Se burbujea O₂ en KI con H₂SO₄. Al final se agregan 2 mL de cloroformo y se agita.</p>`,
 vemos:`<p>La solución se pone ${swatch('#c08a2d','amarilla a parda')}. El cloroformo (capa de abajo) se tiñe de ${swatch('#8a3fb3','violeta')}.</p>`,
 pasa:rxs(['4 I^-(ac) + O2(g) + 4 H^+(ac) -> 2 I2(ac) + 2 H2O(l)','I⁻ se oxida a I₂'],['4 KI(ac) + O2(g) + 2 H2SO4(ac) -> 2 I2(ac) + 2 K2SO4(ac) + 2 H2O(l)','molecular'])+`<p>El I₂ es mucho más soluble en cloroformo que en agua: se “muda” a la capa orgánica, donde es violeta.</p>`,
 demuestra:'el O₂ es oxidante.'})}
${ensayo({n:'2',tag:'TUBO',title:'O₂ en sulfato ferroso acidificado (luego + tiocianato)',
 hacemos:`<p>Se burbujea O₂ en FeSO₄ con H₂SO₄ y después se agregan gotas de KSCN.</p>`,
 vemos:`<p>Con el tiocianato aparece un color ${swatch('#9b111e','rojo sangre')}.</p>`,
 pasa:rxs(['4 Fe^2+(ac) + O2(g) + 4 H^+(ac) -> 4 Fe^3+(ac) + 2 H2O(l)','Fe²⁺ se oxida a Fe³⁺'],['4 FeSO4(ac) + O2(g) + 2 H2SO4(ac) -> 2 Fe2(SO4)3(ac) + 2 H2O(l)'],['Fe^3+(ac) + SCN^-(ac) -> [Fe(SCN)]^2+(ac)','reconocimiento del Fe³⁺']),
 demuestra:'el O₂ es oxidante (oxida Fe²⁺ a Fe³⁺).'})}
${ensayo({n:'3',tag:'TUBO',title:'Azufre encendido en oxígeno',
 hacemos:`<p>Se introduce azufre encendido y se acerca a la boca un papel tornasol azul humedecido.</p>`,
 vemos:`<p>El azufre arde con una <b>llama azul</b> mucho más viva que en el aire; olor sofocante. Tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}.</p>`,
 pasa:rxs(['S(s) + O2(g) -> SO2(g)'],['SO2(g) + H2O(l) <=> H2SO3(ac)','óxido ácido']),
 demuestra:'el O₂ es comburente; un no metal forma un óxido ácido.'})}
${ensayo({n:'4',tag:'TUBO',title:'Carbón incandescente',
 hacemos:`<p>Se introduce un trocito de carbón de leña al rojo.</p>`,
 vemos:`<p>El carbón se <b>aviva</b> y arde con mucho más brillo.</p>`,
 pasa:rx('C(s) + O2(g) -> CO2(g)'),
 demuestra:'el O₂ es comburente.'})}
${ensayo({n:'5',tag:'TUBO',title:'Alambre de hierro al rojo',
 hacemos:`<p>Se introduce con cuidado un alambre muy fino de hierro calentado al rojo.</p>`,
 vemos:`<p>El hierro <b>chisporrotea</b> lanzando chispas brillantes y se forman gotitas oscuras de óxido.</p>`,
 pasa:rx('3 Fe(s) + 2 O2(g) -> Fe3O4(s)','óxido ferroso-férrico'),
 demuestra:'en O₂ puro arden sustancias que en el aire sólo se oxidan lentamente.'})}
`);

  add('c1-metales','Clase 1 · Metales con oxígeno, llama y amoníaco líquido','TP 4 · CLASE 1 · 03',`
${ver('grupos-1-2:qi-al-oxigeno','Grupos 1 y 2 con oxígeno')}
${ensayo({n:'3.1',title:'Reacción del sodio con oxígeno',
 hacemos:`<p>En un crisol limpio y seco se calienta suavemente un trozo de sodio del tamaño de un grano de arroz. Ya frío, el sólido se pasa a un vaso con 5 mL de agua y se prueba con tornasol.</p>`,
 vemos:`<p>El sodio funde, se enciende con <b>llama amarilla</b> y deja un sólido blanco-amarillento. En agua: tornasol ${vira('rojo','#d6332a','azul','#2f6fd1')}.</p>`,
 pasa:rxs(['2 Na(s) + O2(g) =[Δ]=> Na2O2(s)','en aire, sobre todo peróxido'],['4 Na(s) + O2(g) -> 2 Na2O(s)','óxido'],['Na2O(s) + H2O(l) -> 2 NaOH(ac)'],['Na2O2(s) + 2 H2O(l) -> 2 NaOH(ac) + H2O2(ac)']),
 demuestra:'el sodio es muy reductor; su óxido es básico.'})}
${ensayo({n:'3.2',title:'Reacción del magnesio con oxígeno',
 hacemos:`<p>Con pinzas metálicas se calienta una cinta de Mg hasta que se enciende (¡sin mirar la luz!). El producto se pone en un tubo con 5 mL de agua y se prueba con tornasol.</p>`,
 vemos:`<p><b>Luz blanca enceguecedora</b>; queda un polvo blanco. En agua: tornasol ${vira('rojo','#d6332a','azul','#2f6fd1')} (débil).</p>`,
 pasa:rxs(['2 Mg(s) + O2(g) =[Δ]=> 2 MgO(s)'],['MgO(s) + H2O(l) -> Mg(OH)2(s)','poco soluble, pero básico']),
 demuestra:'el magnesio es reductor; su óxido es básico.'})}
${ensayo({n:'4',title:'Emisión a la llama',
 hacemos:`<p>Con espátulas limpias se lleva a la llama una punta de NaCl, KCl, LiCl y SrCl₂, de a una.</p>`,
 vemos:`<p>${swatch('#f4b400','Na: amarillo intenso')} · ${swatch('#a77bd6','K: violeta/lila')} · ${swatch('#c8173a','Li: rojo carmín')} · ${swatch('#e0402a','Sr: rojo')}</p>`,
 pasa:`<p>El calor excita electrones de cada catión; al volver a su nivel emiten luz de una energía característica de ese elemento.</p>`+figure(svg.llamas,''),
 demuestra:'cada elemento tiene un espectro de emisión propio: sirve para identificarlo.'})}
${ensayo({n:'5',tag:'ENSAYO OPCIONAL',title:'Disolución de sodio en amoníaco líquido',
 hacemos:`<p>Un tubo con un trocito de sodio se enfría en un baño de hielo seco y etanol. En un kitasato se genera NH₃ con NH₄NO₃ y NaOH, y el gas se condensa en el tubo frío.</p>`,
 vemos:`<p>Al agitar, el sodio se disuelve y aparece una solución <b>${swatch('#1d3fb8','azul intensa')}</b>.</p>`,
 pasa:rxs(['NH4NO3(s) + NaOH(s) -> NH3(g) + NaNO3(s) + H2O(l)','generación del NH₃'],['Na(s) -> Na^+(am) + e^-(am)','electrones solvatados: color azul']),
 demuestra:'el sodio cede su electrón con muchísima facilidad.'})}
`);

  // ---------------- CLASE 2 ----------------
  add('c2-metales','Clase 2 · Metales con agua, ácidos e hidróxidos; hidruros','TP 4 · CLASE 2 · 01',`
${ver('grupos-1-2:qi-al-agua','Reacción con agua y ácidos')}
${table(['Recipiente','Contenido','Metal','Se observa','Ecuación'],[
 ['Cuba (docente)','250 mL agua + fenolftaleína','Na','el sodio corre sobre el agua, burbujea, a veces se enciende; aparecen estelas '+swatch('#d63384','fucsia'),rx('2 Na(s) + 2 H2O(l) -> 2 NaOH(ac) + H2(g)')],
 ['Tubo 1','2 mL agua + fenolftaleína','Mg','en frío casi nada; a baño María burbujeo lento y color '+swatch('#e48ab9','rosado'),rx('Mg(s) + 2 H2O(l) =[Δ]=> Mg(OH)2(s) + H2(g)')],
 ['Tubo 2','2 mL NaOH 6 M','Al','burbujeo: el aluminio se disuelve',rx('2 Al(s) + 2 NaOH(ac) + 6 H2O(l) -> 2 Na[Al(OH)4](ac) + 3 H2(g)')],
 ['Tubo 3','2 mL HCl 6 M','Fe','burbujeo; solución '+swatch('#cfe3b5','verde pálido'),rx('Fe(s) + 2 HCl(ac) -> FeCl2(ac) + H2(g)')],
 ['Tubo 4','2 mL H₂SO₄ 6 M','Fe','burbujeo; solución '+swatch('#cfe3b5','verde pálido'),rx('Fe(s) + H2SO4(ac) -> FeSO4(ac) + H2(g)')]
])}
${idea('Qué demuestra cada tubo','<ul><li><b>Na y Mg:</b> metales muy reductores que desplazan al H del agua; forman hidróxidos (fenolftaleína fucsia). El Na mucho más que el Mg.</li><li><b>Al con NaOH:</b> el aluminio es <b>anfótero</b>.</li><li><b>Fe con ácidos:</b> el H⁺ es un oxidante débil y sólo lleva el hierro a <b>Fe²⁺</b>.</li></ul>')}
${note('Si no se ve reacción','<p>La guía indica calentar a baño María. El calor aumenta la velocidad (es clave en el tubo del magnesio).</p>')}
<h3>Propiedades de los hidruros</h3>
${ver('hidrogeno-oxigeno:qi-ho-hidruros','Hidruros')}
${ensayo({n:'2',title:'Hidruro de sodio frente a agua, ácido y nitrato de plata',
 hacemos:`<p>Tres tubos: (1) agua + fenolftaleína, (2) HCl 6 M, (3) AgNO₃ 10 %. A cada uno se le agrega una punta de espátula de <b>NaH</b> y se agita con cuidado.</p>`,
 vemos:`<ul><li>Tubo 1: burbujeo y color ${swatch('#d63384','fucsia')}.</li><li>Tubo 2: burbujeo más vivo.</li><li>Tubo 3: burbujeo y un <b>precipitado oscuro</b> (pardo-negruzco).</li></ul>`,
 pasa:rxs(['NaH(s) + H2O(l) -> NaOH(ac) + H2(g)↑','H⁻ es básico: le saca H⁺ al agua'],['NaH(s) + HCl(ac) -> NaCl(ac) + H2(g)↑'],['2 AgNO3(ac) + 2 NaOH(ac) -> Ag2O(s)↓ + 2 NaNO3(ac) + H2O(l)','el NaOH formado precipita óxido de plata pardo'])+note('Detalle','<p>Como el H⁻ es además muy reductor, parte de la plata puede reducirse a <b>Ag metálica</b> (negra), lo que oscurece aún más el precipitado.</p>'),
 demuestra:'el ion hidruro H⁻ es básico y reductor.'})}
`);

  add('c2-oxigeno-agua','Clase 2 · Oxígeno, agua y agua oxigenada','TP 4 · CLASE 2 · 02',`
${ensayo({n:'3.1',title:'Oxígeno a partir de permanganato de potasio',
 hacemos:`<p>Se calientan tres puntas de espátula de KMnO₄ en un tubo térmico, acercando a la boca una astilla en punto de ignición (sin que caiga adentro).</p>`,
 vemos:`<p>Los cristales violeta-negros chisporrotean y se oscurecen; la astilla <b>se reaviva</b> y vuelve a arder.</p>`,
 pasa:rx('2 KMnO4(s) =[Δ]=> K2MnO4(s) + MnO2(s) + O2(g)↑','Mn +7 se reduce; O −2 se oxida a 0'),
 demuestra:'obtención de O₂ desde una oxosal; reconocimiento del O₂ (comburente).'})}
${ensayo({n:'3.2',title:'Oxígeno a partir de agua oxigenada',
 hacemos:`<p>A 2 mL de agua oxigenada se le agrega una punta de espátula de MnO₂ y se acerca la astilla.</p>`,
 vemos:`<p>Efervescencia inmediata, el tubo se calienta y la astilla se reaviva.</p>`,
 pasa:rx('2 H2O2(ac) =[MnO2]=> 2 H2O(l) + O2(g)↑','dismutación catalizada'),
 demuestra:'el H₂O₂ se descompone en presencia de un catalizador liberando O₂.'})}
${ensayo({n:'4.1',title:'Acción del calor sobre hidratos',
 hacemos:`<p>Se calienta CuSO₄·5H₂O a fuego directo hasta que no haya más cambios y se deja enfriar.</p>`,
 vemos:`<p>${vira('azul','#2f7fd8','blanco','#f4f4f4')}; aparecen gotitas de agua en la parte fría del tubo. Frío, sigue blanco (si toma humedad, vuelve lentamente a celeste).</p>`,
 pasa:rx('CuSO4·5H2O(s) =[Δ]=> CuSO4(s) + 5 H2O(g)'),
 demuestra:'existencia de agua de hidratación; el color del Cu²⁺ depende del agua unida.'})}
${ensayo({n:'4.2',title:'Formación de acuocomplejos',
 hacemos:`<p>Se disuelve CuSO₄ en ~1 mL de HCl concentrado y luego se agrega agua poco a poco.</p>`,
 vemos:`<p>En HCl la solución es ${swatch('#7da84a','verde amarillenta')}; al diluir pasa a ${swatch('#5fb4e8','celeste')}.</p>`,
 pasa:rxs(['Cu^2+(ac) + 4 Cl^-(ac) -> [CuCl4]^2-(ac)','con mucho Cl⁻'],['[CuCl4]^2-(ac) + 6 H2O(l) <=> [Cu(H2O)6]^2+(ac) + 4 Cl^-(ac)','el agua desplaza al cloruro']),
 demuestra:'el agua actúa como ligando; los equilibrios de complejos se desplazan con la concentración.'})}
${ensayo({n:'4.3',title:'Hidrólisis de sales',
 hacemos:`<p>Se disuelve FeCl₃ en 2 mL de agua, se calienta a baño María y se prueba con tornasol azul.</p>`,
 vemos:`<p>La solución amarilla se oscurece y aparece una turbidez ${swatch('#9a4a1c','pardo rojiza')}. Tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}.</p>`,
 pasa:rx('Fe^3+(ac) + 3 H2O(l) <=> Fe(OH)3(s) + 3 H^+(ac)','el calor desplaza el equilibrio hacia la derecha'),
 demuestra:'las sales de cationes pequeños y muy cargados hidrolizan dando soluciones ácidas.'})}
${ensayo({n:'5.1',title:'Agua oxigenada como oxidante',
 hacemos:`<p>1 mL de agua + 10 gotas de KI 3 % + 5 gotas de H₂SO₄ 3 M. Se agrega H₂O₂ 10 vol. gota a gota; luego 2 mL de cloroformo (o CCl₄) y se agita con tapón.</p>`,
 vemos:`<p>La solución se pone ${swatch('#a0662a','amarilla a parda')}; la capa orgánica, ${swatch('#8a3fb3','violeta')}.</p>`,
 pasa:rxs(['H2O2(ac) + 2 I^-(ac) + 2 H^+(ac) -> I2(ac) + 2 H2O(l)'],['H2O2(ac) + 2 KI(ac) + H2SO4(ac) -> I2(ac) + K2SO4(ac) + 2 H2O(l)','molecular']),
 demuestra:'el H₂O₂ oxida al ioduro (su O pasa de −1 a −2).'})}
${ensayo({n:'5.2',title:'Agua oxigenada como reductor',
 hacemos:`<p>1 mL de agua + 20 gotas de KMnO₄ + 5 gotas de H₂SO₄ 3 M. Se agrega H₂O₂ gota a gota, sin que la reacción sea muy violenta, hasta que no haya más cambios.</p>`,
 vemos:`<p>${vira('violeta','#7b2a9e','incoloro','transparent')} con burbujeo de O₂. Si aparece un precipitado pardo, falta ácido.</p>`,
 pasa:rxs(['2 MnO4^-(ac) + 5 H2O2(ac) + 6 H^+(ac) -> 2 Mn^2+(ac) + 5 O2(g) + 8 H2O(l)'],['2 KMnO4 + 5 H2O2 + 3 H2SO4 -> 2 MnSO4 + 5 O2 + K2SO4 + 8 H2O','molecular']),
 demuestra:'frente a un oxidante más fuerte, el H₂O₂ actúa como reductor (su O pasa de −1 a 0).'})}
`);

  add('resumen','Cuadro resumen del TP 4','TP 4 · RESUMEN',`
${table(['Ensayo','Lo que se ve','Lo que demuestra'],[
 ['Zn + HCl','burbujeo, gas que desplaza agua','obtención de H₂'],
 ['H₂ a la llama','“ladrido”','H₂ combustible'],
 ['Tubos A/B','ladra el tubo de arriba','H₂ menos denso que el aire'],
 ['KClO₃ + MnO₂, Δ','gas que reaviva la astilla','obtención de O₂ · catalizador'],
 ['O₂ + KI/H⁺ (+ CHCl₃)','pardo; capa violeta','O₂ oxidante'],
 ['O₂ + Fe²⁺/H⁺ (+ SCN⁻)','rojo sangre','O₂ oxidante'],
 ['S en O₂','llama azul; tornasol rojo','O₂ comburente · óxido ácido'],
 ['C y Fe en O₂','arden con brillo, chispas','O₂ comburente'],
 ['Na y Mg en O₂ (+ agua)','llama amarilla / luz blanca; tornasol azul','óxidos básicos'],
 ['Sales a la llama','amarillo, lila, carmín, rojo','espectros de emisión'],
 ['Na en NH₃ líquido','azul intenso','electrones solvatados'],
 ['Na, Mg + agua','H₂ y fucsia','metales reductores'],
 ['Al + NaOH','burbujeo','anfoterismo'],
 ['Fe + HCl / H₂SO₄','burbujeo, verde pálido','Fe → Fe²⁺'],
 ['NaH + agua / HCl / AgNO₃','H₂; fucsia; precipitado oscuro','H⁻ básico y reductor'],
 ['KMnO₄, Δ · H₂O₂ + MnO₂','astilla se reaviva','obtención de O₂'],
 ['CuSO₄·5H₂O, Δ','azul → blanco','agua de hidratación'],
 ['CuSO₄ en HCl + agua','verde → celeste','acuocomplejos'],
 ['FeCl₃ + Δ','turbidez parda; tornasol rojo','hidrólisis'],
 ['H₂O₂ + I⁻ · H₂O₂ + MnO₄⁻','pardo/violeta · violeta → incoloro','H₂O₂ oxidante y reductor']
])}
`);

  add('practica','Práctica resuelta del TP 4','TP 4 · PRÁCTICA',`
${note('Práctica extra','<p>La guía del TP 4 no trae cuestionario. Estos problemas están armados con los ensayos del TP para practicar el informe y el examen.</p>')}
<div data-qi-guide></div>
`);

  const exercises=[
   {n:'P1',title:'¿Qué tubo “ladra”?',
    statement:'En el ensayo de densidad, el tubo A (con H₂) se coloca boca abajo sobre el tubo B (con aire) y se invierten juntos. ¿En qué tubo se detecta el hidrógeno? ¿Qué propiedad se demuestra?',
    solution:step('1. Situación después de invertir','<p>B queda arriba y A (con el H₂) queda abajo.</p>')+step('2. Qué hace el gas','<p>El H₂ (M = 2 g/mol) es mucho menos denso que el aire (M ≈ 29 g/mol): sube al tubo de arriba y el aire baja.</p>')+step('3. Comprobación',rx('2 H2(g) + O2(g) -> 2 H2O(g)','el “ladrido” aparece en B')),
    answer:'El “ladrido” se produce en el tubo B (arriba): el H₂ es menos denso que el aire.'},
   {n:'P2',title:'Oxígeno a partir de clorato',
    statement:'¿Qué volumen de O₂ se obtiene al descomponer completamente 2,45 g de KClO₃ a 25 °C y 1 atm? ¿Y en CNPT?',
    solution:step('1. Ecuación',rx('2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)'))+step('2. Moles',chain(R`n_{\mathrm{KClO_3}}=\frac{2{,}45}{122{,}5}=0{,}0200\ \mathrm{mol}`,[R`n_{\mathrm{O_2}}=0{,}0200\cdot\frac{3}{2}=0{,}0300\ \mathrm{mol}`,'2 → 3']))+step('3. Volúmenes',chain(R`V_{25^\circ\mathrm{C}}=\frac{0{,}0300\cdot0{,}082\cdot298}{1}=0{,}733\ \mathrm{L}`,R`V_{\mathrm{CNPT}}=0{,}0300\cdot22{,}4=0{,}672\ \mathrm{L}`)),
    answer:'≈ 0,73 L a 25 °C · 0,67 L en CNPT'},
   {n:'P3',title:'Balanceo: agua oxigenada y ioduro',
    statement:'Balanceá por ion-electrón: KI + H₂O₂ + H₂SO₄ → I₂ + K₂SO₄ + H₂O. Indicá oxidante y reductor.',
    solution:step('1. Oxidación',rx('2 I^- -> I2 + 2 e^-'))+step('2. Reducción',rxs(['H2O2 -> 2 H2O','O: −1 → −2'],['H2O2 + 2 H^+ + 2 e^- -> 2 H2O']))+step('3. Suma',rx('2 I^- + H2O2 + 2 H^+ -> I2 + 2 H2O'))+step('4. Molecular',rx('2 KI + H2O2 + H2SO4 -> I2 + K2SO4 + 2 H2O')),
    answer:'2 KI + H₂O₂ + H₂SO₄ → I₂ + K₂SO₄ + 2 H₂O · oxidante: H₂O₂ · reductor: KI (I⁻)'},
   {n:'P4',title:'Balanceo: oxígeno y sulfato ferroso',
    statement:'Balanceá por ion-electrón la oxidación del FeSO₄ por O₂ en medio ácido (H₂SO₄). ¿Cómo se comprueba en el TP que se formó Fe³⁺?',
    solution:step('1. Oxidación (× 4)',rx('Fe^2+ -> Fe^3+ + e^-'))+step('2. Reducción',rx('O2 + 4 H^+ + 4 e^- -> 2 H2O'))+step('3. Suma',rx('4 Fe^2+ + O2 + 4 H^+ -> 4 Fe^3+ + 2 H2O'))+step('4. Molecular',rx('4 FeSO4 + O2 + 2 H2SO4 -> 2 Fe2(SO4)3 + 2 H2O'))+step('5. Comprobación',rx('Fe^3+ + SCN^- -> [Fe(SCN)]^2+','color rojo sangre')),
    answer:'4 FeSO₄ + O₂ + 2 H₂SO₄ → 2 Fe₂(SO₄)₃ + 2 H₂O · con KSCN aparece color rojo sangre'},
   {n:'P5',title:'Sodio en agua',
    statement:'Un trozo de 0,23 g de sodio reacciona por completo con agua y la solución final se lleva a 250 mL. Calculá el volumen de H₂ (25 °C, 1 atm), la concentración de NaOH y el pH.',
    solution:step('1. Ecuación y moles',rx('2 Na(s) + 2 H2O(l) -> 2 NaOH(ac) + H2(g)')+chain(R`n_{\mathrm{Na}}=\frac{0{,}23}{23}=0{,}0100\ \mathrm{mol}`))+step('2. Hidrógeno',chain([R`n_{\mathrm{H_2}}=\frac{0{,}0100}{2}=0{,}00500\ \mathrm{mol}`,'2 Na → 1 H₂'],R`V=0{,}00500\cdot24{,}5=0{,}122\ \mathrm{L}`))+step('3. NaOH y pH',chain(R`[\mathrm{OH^-}]=\frac{0{,}0100\ \mathrm{mol}}{0{,}250\ \mathrm{L}}=0{,}0400\ \mathrm{M}`,R`\mathrm{pOH}=-\log0{,}0400=1{,}40`,R`\mathrm{pH}=14-1{,}40=12{,}6`)),
    answer:'V(H₂) ≈ 122 mL · [NaOH] = 0,040 M · pH ≈ 12,6'},
   {n:'P6',title:'Hidruro de sodio',
    statement:'¿Qué volumen de H₂ (25 °C, 1 atm) se libera al tratar 0,48 g de NaH con agua en exceso? ¿Qué carácter del ion hidruro pone en evidencia?',
    solution:step('1. Ecuación',rx('NaH(s) + H2O(l) -> NaOH(ac) + H2(g)'))+step('2. Cálculo',chain(R`n_{\mathrm{NaH}}=\frac{0{,}48}{24}=0{,}020\ \mathrm{mol}=n_{\mathrm{H_2}}`,R`V=0{,}020\cdot24{,}5=0{,}49\ \mathrm{L}`))+step('3. Interpretación','<p>El H⁻ capta un H⁺ del agua (<b>básico</b>) y a la vez pierde un electrón pasando de −1 a 0 (<b>reductor</b>).</p>'),
    answer:'≈ 0,49 L de H₂ · el H⁻ es básico y reductor'},
   {n:'P7',title:'Hidrólisis del cloruro férrico',
    statement:'Explicá con una ecuación por qué la solución de FeCl₃ vira el tornasol azul a rojo, y por qué al calentarla aumenta la turbidez.',
    solution:step('1. Hidrólisis',rx('Fe^3+(ac) + 3 H2O(l) <=> Fe(OH)3(s) + 3 H^+(ac)'))+step('2. Carácter ácido','<p>Se liberan H⁺: el medio es ácido aunque la sal no sea un ácido.</p>')+step('3. Efecto del calor','<p>La hidrólisis es endotérmica: al calentar, el equilibrio se desplaza hacia la derecha (principio de Le Chatelier) y se forma más Fe(OH)₃, que enturbia la solución.</p>'),
    answer:'El Fe³⁺ hidroliza liberando H⁺; el calor favorece la formación de Fe(OH)₃ (turbidez parda).'}
  ];

  window.ET27_QI4.units.push({id:'tp4',part:'tp',n:4,title:'TP 4 · Hidrógeno, oxígeno y metales de los grupos 1 y 2',short:'Hidrógeno, oxígeno y grupos 1 y 2',lead:'La guía de laboratorio explicada ensayo por ensayo: qué se hace, qué se ve, qué reacción ocurre y qué propiedad demuestra. Con cuadro resumen y práctica resuelta.',sections:s,exercises,exercisesLabel:'Práctica resuelta'});
})();
