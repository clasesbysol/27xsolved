// 27xSOLved · Química Inorgánica 4.º · TRABAJO PRÁCTICO N.º 5
// Carbono y nitrógeno: guía de laboratorio explicada + cuestionario de térreos, carbonoides y nitrogenoides resuelto.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  const {chain,idea,warn,fix,note,example,step,table,figure}=K;
  const {rx,rxs,f,vira,swatch,ensayo,pic,punch,svg}=Q;
  const R=String.raw;
  const s=[];const add=(key,label,kicker,html)=>s.push({key:`qi-tp5-${key}`,label,kicker,html});
  const ver=(id,label)=>`<p class="guideLink">📘 Material teórico: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;

  add('intro','Antes de entrar al laboratorio','TP 5 · 00',`
<p>En este TP se trabajan los dos no metales estrella de los grupos 14 y 15: el <b>carbono</b> (y su dióxido, carbonatos y bicarbonatos) y el <b>nitrógeno</b> (amoníaco y ácido nítrico).</p>
${table(['Clase','Ensayos'],[
 ['Clase 1 · demostrativa','poder reductor del carbono · obtención y propiedades del CO₂ · obtención y propiedades del NH₃ · obtención de HNO₃'],
 ['Clase 2 · en grupos','adsorción con carbón activado · carbonatos y bicarbonatos · obtención de N₂ · amoníaco redox y ligando · HNO₃ con metales']
])}
${warn('Seguridad','<ul><li>El <b>ácido nítrico concentrado</b> se usa bajo campana, con gafas y guantes.</li><li>El NO₂ (gas pardo) es tóxico: no se huele.</li><li>El NH₃ es irritante: se huele “abanicando”, nunca directo.</li><li>En el generador de CO₂ no deben quedar burbujas de aire en el tubo de seguridad.</li></ul>')}
${figure(svg.gases,'NH₃ (liviano) en tubo boca abajo · CO₂ (denso) en tubo boca arriba.')}
`);

  // ---------------- CLASE 1 ----------------
  add('c1-carbono','Clase 1 · Poder reductor del carbono','TP 5 · CLASE 1 · 01',`
${ver('carbono:qi-c-reductor','Carácter reductor del carbono')}
${ensayo({n:'1',title:'Carbón + óxido cúprico',
 hacemos:`<p>En un kitasato se colocan 0,5 g de carbón en polvo y 0,4 g de CuO. Se calienta fuertemente 5–10 minutos y el gas se burbujea en agua de barita.</p>`+pic('carbon-reductor-kitasato.webp','Kitasato calentado con salida a un tubo con hidróxido de bario','Esquema del material teórico (allí con Ag₂O; el montaje es el mismo).'),
 vemos:`<ul><li>La mezcla negra va mostrando puntos ${swatch('#b5562e','rojizos')}: cobre metálico.</li><li>El agua de barita se enturbia: ${vira('transparente','transparent','turbia blanca','#eeeeee')}.</li></ul>`,
 pasa:rxs(['2 CuO(s) + C(s) =[Δ]=> 2 Cu(s) + CO2(g)↑','C: 0 → +4 (reductor) · Cu: +2 → 0'],['CO2(g) + Ba(OH)2(ac) -> BaCO3(s)↓ + H2O(l)','prueba del CO₂']),
 demuestra:'el carbono es reductor: reduce óxidos metálicos al metal.',
 extra:example('¿Cuánto cobre se forma?','<p>Con los datos de la guía (0,4 g de CuO y 0,5 g de C).</p>',step('Resolución',chain(R`n_{\mathrm{CuO}}=\frac{0{,}4}{79{,}5}=5{,}03\cdot10^{-3}\ \mathrm{mol}\ \text{(limitante)}`,R`m_{\mathrm{Cu}}=5{,}03\cdot10^{-3}\cdot63{,}5=0{,}32\ \mathrm{g}`)),'≈ 0,32 g de cobre')})}
`);

  add('c1-co2','Clase 1 · Obtención y propiedades del CO₂','TP 5 · CLASE 1 · 02',`
${ver('carbono:qi-c-co2-lab','El CO₂ en el laboratorio')}
${ensayo({n:'2',title:'Generador de dióxido de carbono',
 hacemos:`<p>Se arma el generador con 3 g de NaHCO₃. El ácido se agrega por el tubo de seguridad, en porciones y diluido a la mitad. Preparados en la gradilla: tubos 1, 2 y 3 limpios y secos; tubo 4 con 5 mL de agua; tubo 5 con fenolftaleína alcalinizada.</p>`+pic('generador-co2.webp','Generador de CO2 de la guía','Figura 1 de la guía del TP 5.'),
 vemos:`<p>Efervescencia intensa sobre el bicarbonato. Una vela encendida en la salida del tubo <b>se apaga</b>.</p>`,
 pasa:rx('NaHCO3(s) + HCl(ac) -> NaCl(ac) + CO2(g)↑ + H2O(l)'),
 demuestra:'obtención de CO₂ a partir de un bicarbonato y un ácido; el CO₂ no es comburente.'})}
${example('Cálculo de la guía: ¿cuánto HCl hay que agregar?',`<p>Calcular el volumen de HCl 36,5 % m/m (δ = 1,19 g/cm³) necesario para que reaccionen 3 g de NaHCO₃, teniendo en cuenta que el ácido se diluye a la mitad y que hay que sumar el volumen del cierre hidráulico.</p>`,
 step('1. Moles de NaHCO₃',chain(R`n=\frac{3\ \mathrm{g}}{84\ \mathrm{g/mol}}=0{,}0357\ \mathrm{mol}`))+
 step('2. HCl puro (relación 1 : 1)',chain(R`m_{\mathrm{HCl}}=0{,}0357\cdot36{,}5=1{,}30\ \mathrm{g}`))+
 step('3. Volumen de ácido concentrado',chain(R`m_{\text{sc}}=1{,}30\cdot\frac{100}{36{,}5}=3{,}57\ \mathrm{g}`,R`V=\frac{3{,}57\ \mathrm{g}}{1{,}19\ \mathrm{g/mL}}=3{,}0\ \mathrm{mL}`))+
 step('4. Diluido a la mitad',chain([R`V_{\text{diluido}}=2\cdot3{,}0=6{,}0\ \mathrm{mL}`,'misma cantidad de HCl en el doble de volumen']))+
 step('5. Más el cierre hidráulico',`<p>Al volumen anterior hay que sumarle el del cierre hidráulico de <b>tu</b> aparato (se mide). Por ejemplo, con un cierre de 7 mL:</p>`+chain(R`V_{\text{total}}\approx6{,}0+7=13\ \mathrm{mL\ de\ ácido\ diluido}`)),
 '3,0 mL de HCl concentrado (6,0 mL diluido a la mitad) + el volumen del cierre hidráulico')}
${idea('Atajo lindo','<p>Con HCl al 36,5 % y M(HCl) = 36,5 g/mol, cada mol de HCl viene en exactamente <b>100 g de solución</b>. Entonces: '+K.m(R`m_{\text{sc}}=n\cdot100\ \mathrm{g}`)+'.</p>')}
<h3>Ensayos con el gas</h3>
${ensayo({n:'1',tag:'TUBO',title:'Poder comburente',
 hacemos:`<p>Se introduce una vela encendida en el tubo 1 lleno de CO₂.</p>`,
 vemos:`<p>La vela <b>se apaga</b> enseguida.</p>`,
 pasa:`<p>Sin O₂ no hay combustión: el CO₂ no aporta oxígeno a la vela (es un producto de combustión, ya está “quemado”).</p>`,
 demuestra:'el CO₂ no es comburente.'})}
${ensayo({n:'2',tag:'TUBO',title:'Densidad',
 hacemos:`<p>Sobre el tubo 2 (con CO₂, boca arriba) se coloca un tubo “vacío” (con aire), boca con boca. Se invierte el par, se esperan unos minutos y se prueban <b>los dos</b> con la vela.</p>`,
 vemos:`<p>Al invertir, el tubo que tenía CO₂ queda arriba. Después de esperar, la vela <b>se apaga en el tubo de abajo</b> (el que tenía aire) y arde en el de arriba.</p>`,
 pasa:`<p>El CO₂ “se vuelca” hacia abajo como un líquido invisible:</p>`+K.chain([R`\frac{\delta_{\mathrm{CO_2}}}{\delta_{\text{aire}}}=\frac{44}{29}\approx1{,}5`]),
 demuestra:'el CO₂ es más denso que el aire.'})}
${ensayo({n:'3',tag:'TUBO',title:'Reducción por acción del magnesio',
 hacemos:`<p>Se enciende una cinta de magnesio y se introduce en el tubo 3 con CO₂.</p>`,
 vemos:`<p>El Mg <b>sigue ardiendo</b> con luz blanca; queda un polvo blanco con <b>puntos negros</b>.</p>`,
 pasa:rx('2 Mg(s) + CO2(g) =[Δ]=> 2 MgO(s) + C(s)','Mg: 0 → +2 · C: +4 → 0'),
 demuestra:'un metal muy activo puede reducir el CO₂ a carbono.'})}
${ensayo({n:'4 y 5',tag:'TUBOS',title:'Carácter ácido: agua, barita y fenolftaleína alcalinizada',
 hacemos:`<p>Se burbujea CO₂ unos minutos en el tubo 4 (agua) y en el tubo 5 (fenolftaleína alcalinizada) hasta ver cambios. Después, al tubo 4 se le agrega 1 mL de agua de barita.</p>`,
 vemos:`<ul><li>Tubo 5: ${vira('fucsia','#d63384','incoloro','transparent')} (tarda un poco).</li><li>Tubo 4 + barita: <b>turbidez blanca</b>.</li></ul>`,
 pasa:rxs(['CO2(g) + H2O(l) <=> H2CO3(ac)','óxido ácido'],['CO2(g) + 2 NaOH(ac) -> Na2CO3(ac) + H2O(l)','se consume la base'],['Na2CO3(ac) + CO2(g) + H2O(l) -> 2 NaHCO3(ac)','pH ≈ 8: la fenolftaleína se decolora'],['H2CO3(ac) + Ba(OH)2(ac) -> BaCO3(s)↓ + 2 H2O(l)','tubo 4 con barita']),
 demuestra:'el CO₂ es un óxido ácido.'})}
`);

  add('c1-nh3','Clase 1 · Obtención y propiedades del amoníaco','TP 5 · CLASE 1 · 03',`
${ver('nitrogeno:qi-n-nh3','Amoníaco')}
${ensayo({n:'3',title:'Obtención de amoníaco',
 hacemos:`<p>En un kitasato levemente inclinado: 2 g de NH₄Cl + 4–5 mL de NaOH 6 M; se agita y se tapa. En la manguera de la salida lateral se coloca un tubo de hemólisis <b>seco e invertido</b>. Se calienta y se prueba la salida con papel tornasol rosado humedecido.</p>`,
 vemos:`<p>Olor picante. El papel tornasol ${vira('rosado','#e07a8f','azul','#2f6fd1')}.</p>`,
 pasa:rx('NH4Cl(s) + NaOH(ac) =[Δ]=> NH3(g)↑ + NaCl(ac) + H2O(l)')+`<p>¿Por qué el tubo va invertido? Porque el NH₃ (17 g/mol) es <b>menos denso que el aire</b> (29 g/mol): sube y desplaza al aire hacia abajo.</p>`,
 demuestra:'obtención de NH₃ desde una sal de amonio y una base fuerte; es menos denso que el aire y básico.'})}
${ensayo({n:'3a',title:'Solubilidad y carácter ácido-base (fuente de amoníaco)',
 hacemos:`<p>Un cristalizador con 2–3 cm de agua y 3–4 gotas de fenolftaleína. Se sumerge el tubo con NH₃ boca abajo, se destapa bajo el agua y se espera.</p>`+pic('fuente-amoniaco.webp','Tubo con amoníaco invertido en agua con fenolftaleína: el agua sube y se colorea de fucsia','La fuente de amoníaco.'),
 vemos:`<p>El <b>agua sube</b> por el tubo y se tiñe de ${swatch('#d63384','fucsia')}.</p>`,
 pasa:`<p>El NH₃ se disuelve tan rápido que deja un “vacío” y la presión atmosférica empuja el agua hacia adentro.</p>`+rx('NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)'),
 demuestra:'el NH₃ es muy soluble en agua y tiene carácter básico.'})}
${ensayo({n:'3b',title:'Reacción con cloruro de hidrógeno',
 hacemos:`<p>Se acerca a la boca del tubo con NH₃ un gotero con HCl concentrado.</p>`,
 vemos:`<p>Se forma un <b>humo blanco</b> denso.</p>`,
 pasa:rx('NH3(g) + HCl(g) -> NH4Cl(s)','partículas sólidas en el aire'),
 demuestra:'el NH₃ es una base: reacciona con ácidos incluso en fase gaseosa.'})}
`);

  add('c1-hno3','Clase 1 · Obtención de ácido nítrico','TP 5 · CLASE 1 · 04',`
${ver('nitrogeno:qi-n-hno3','Ácido nítrico')}
${ensayo({n:'4',title:'Obtención de HNO₃ en la retorta',
 hacemos:`<p>En una retorta: 5 g de NaNO₃ y 5 mL de H₂SO₄ concentrado (con embudo). Se calienta suave sobre tela metálica. El ácido destila y se condensa en un tubo sumergido en agua con hielo. Al terminar se tapa el tubo, se saca un momento del hielo y se ensaya con tornasol azul.</p>`+pic('retorta-hno3.webp','Retorta sobre tela metálica con salida a un tubo en baño de hielo','Figura 2 de la guía.'),
 vemos:`<ul><li>Vapores <b>pardo-rojizos</b> dentro de la retorta.</li><li>Se junta un líquido amarillento en el tubo frío.</li><li>Tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}.</li></ul>`,
 pasa:rxs(['NaNO3(s) + H2SO4(c) =[Δ]=> NaHSO4(s) + HNO3(g)','el H₂SO₄, poco volátil, desplaza al HNO₃'],['4 HNO3 =[Δ]=> 4 NO2(g) + O2(g) + 2 H2O','los vapores pardos y el color amarillo'],['3 NO2(g) + H2O(l) -> 2 HNO3(ac) + NO(g)','el NO₂ también es ácido']),
 demuestra:'obtención de un ácido volátil desplazándolo con uno fijo; separación por destilación.',
 extra:example('¿Hay ácido sulfúrico de sobra?','<p>5 mL de H₂SO₄ 98 % (δ = 1,84 g/mL) con 5 g de NaNO₃.</p>',step('Comparar moles',chain(R`n_{\mathrm{H_2SO_4}}=\frac{5\cdot1{,}84\cdot0{,}98}{98}=0{,}092\ \mathrm{mol}`,R`n_{\mathrm{NaNO_3}}=\frac{5}{85}=0{,}059\ \mathrm{mol}`,[R`\Rightarrow\ \text{sobra H}_2\text{SO}_4`,'relación 1 : 1']))+step('HNO₃ máximo',chain(R`m_{\mathrm{HNO_3}}=0{,}059\cdot63=3{,}7\ \mathrm{g}`)),'H₂SO₄ en exceso · como máximo ≈ 3,7 g de HNO₃')})}
`);

  // ---------------- CLASE 2 ----------------
  add('c2-adsorcion','Clase 2 · Propiedades adsorbentes del carbono','TP 5 · CLASE 2 · 01',`
${ver('carbono:qi-c-adsorcion','Adsorción')}
${ensayo({n:'1.1',title:'Adsorción de iones plomo(II)',
 hacemos:`<p><b>Tubo testigo:</b> 5 mL de agua + 5 gotas de Pb(NO₃)₂ 0,01 M + gotas de KI 0,1 M.<br><b>Tubo de ensayo:</b> lo mismo, pero antes del KI se agrega carbón activado, se agita varios minutos y se filtra (o centrifuga); al filtrado se le agrega KI.</p>`,
 vemos:`<ul><li>Testigo: precipitado ${swatch('#f2d21b','amarillo')} de PbI₂.</li><li>Filtrado del carbón: <b>no precipita</b> (o muchísimo menos).</li></ul>`,
 pasa:rxs(['Pb(NO3)2(ac) + 2 KI(ac) -> PbI2(s)↓ + 2 KNO3(ac)','ioduro plumboso, amarillo'],['Pb^2+(ac) + 2 I^-(ac) -> PbI2(s)','iónica neta'])+`<p>Si en el filtrado no aparece PbI₂, es porque <b>los Pb²⁺ quedaron retenidos en la superficie del carbón</b>.</p>`,
 demuestra:'el carbón activado adsorbe iones (por eso se usa para purificar agua).'})}
${ensayo({n:'1.2',title:'Adsorción de pigmentos',
 hacemos:`<p>3 mL de agua con gotas de azul de metileno; se agrega carbón activado, se tapa, se agita vigorosamente y se filtra.</p>`+pic('azul-metileno-carbon.webp','Secuencia: solución azul, tratamiento con carbón, filtrado incoloro',''),
 vemos:`<p>El filtrado sale ${vira('azul','#2e57d6','incoloro','transparent')}.</p>`,
 pasa:`<p>Las moléculas del colorante se acumulan sobre la enorme superficie de los poros del carbón. No es una reacción química: es un fenómeno de superficie.</p>`+figure(svg.adsorcion,''),
 demuestra:'el carbón activado adsorbe colorantes.'})}
`);

  add('c2-carbonatos-n2','Clase 2 · Carbonatos y bicarbonatos · Obtención de N₂','TP 5 · CLASE 2 · 02',`
${ver('carbono:qi-c-carbonatos','Carbonatos y bicarbonatos')}
${ensayo({n:'2',title:'Separación de carbonato y bicarbonato',
 hacemos:`<p>2 mL de agua + 2 mL de mezcla Na₂CO₃/NaHCO₃ + 2 mL de BaCl₂; se agita y se filtra. Al filtrado se le agregan gotas de NH₃ concentrado (si no hay cambios, más BaCl₂).</p>`,
 vemos:`<ul><li>Al agregar BaCl₂: precipitado <b>blanco</b> (queda en el filtro).</li><li>El filtrado es transparente; con NH₃ aparece un <b>nuevo precipitado blanco</b>.</li></ul>`,
 pasa:figure(svg.carbonatos,'')+rxs(['Ba^2+(ac) + CO3^2-(ac) -> BaCO3(s)↓','precipita el carbonato'],['HCO3^-(ac) + NH3(ac) -> CO3^2-(ac) + NH4^+(ac)','el NH₃ convierte el bicarbonato en carbonato'],['Ba^2+(ac) + CO3^2-(ac) -> BaCO3(s)↓','ahora precipita lo que era bicarbonato']),
 demuestra:'los carbonatos de alcalinotérreos son insolubles y los bicarbonatos no; así se pueden separar.'})}
${ver('nitrogeno:qi-n-n2','Obtención de N₂')}
${ensayo({n:'3',title:'Obtención de nitrógeno',
 hacemos:`<p>3 mL de NaNO₂ 10 % se calientan suavemente a baño María (sin hervir) y se agregan 0,2–0,3 g de NH₄Cl.</p>`,
 vemos:`<p>Burbujeo de un gas <b>incoloro e inodoro</b> que <b>apaga</b> una astilla encendida.</p>`,
 pasa:rxs(['NaNO2(ac) + NH4Cl(ac) =[Δ]=> N2(g)↑ + NaCl(ac) + 2 H2O(l)'],['NH4^+(ac) + NO2^-(ac) -> N2(g) + 2 H2O(l)','N −3 y N +3 → N 0']),
 demuestra:'obtención de N₂ por una redox de comproporción; el N₂ es poco reactivo y no comburente.'})}
`);

  add('c2-nh3','Clase 2 · Propiedades del amoníaco: redox y ligando','TP 5 · CLASE 2 · 03',`
${ver('nitrogeno:qi-n-nh3-redox','Amoníaco como reductor')}
${ensayo({n:'4.1',title:'Propiedades redox',
 hacemos:`<p>3 mL de agua + 1 mL de amoníaco + una punta de espátula de KMnO₄; se calienta a baño María.</p>`,
 vemos:`<p>El violeta desaparece, se forma un <b>precipitado pardo</b> y se ve un leve <b>burbujeo</b>.</p>`,
 pasa:rx('2 NH3(ac) + 2 MnO4^-(ac) -> N2(g)↑ + 2 MnO2(s)↓ + 2 OH^-(ac) + 2 H2O(l)','NH₃ reductor (−3 → 0) · MnO₄⁻ oxidante (+7 → +4)'),
 demuestra:'el amoníaco es reductor; en medio básico el permanganato se reduce a MnO₂ (pardo).'})}
${ver('nitrogeno:qi-n-ligando','Amoníaco como ligando')}
${ensayo({n:'4.2',title:'Propiedades como ligando',
 hacemos:`<p>Tres tubos con 2 mL de CuSO₄, NiCl₂ (o NiSO₄) y FeCl₃ al 10 %. Primero una pequeña cantidad de NH₃ concentrado; después 2 mL más, agitando.</p>`,
 vemos:table(['Tubo','Poco NH₃','Exceso de NH₃'],[['CuSO₄ '+swatch('#7ec3ee','celeste'),'precipitado celeste',swatch('#1f4fd1','azul intenso')],['Ni²⁺ '+swatch('#5ea85c','verde'),'precipitado verde',swatch('#6f74d6','azul violáceo')],['FeCl₃ '+swatch('#e9c33d','amarillo'),'precipitado pardo rojizo','sin cambios']]),
 pasa:rxs(['Cu^2+(ac) + 2 NH3(ac) + 2 H2O(l) -> Cu(OH)2(s)↓ + 2 NH4^+(ac)'],['Cu(OH)2(s) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac) + 2 OH^-(ac)','tetraammincobre(II)'],['Ni^2+(ac) + 2 NH3(ac) + 2 H2O(l) -> Ni(OH)2(s)↓ + 2 NH4^+(ac)'],['Ni(OH)2(s) + 6 NH3(ac) -> [Ni(NH3)6]^2+(ac) + 2 OH^-(ac)','hexaamminníquel(II)'],['Fe^3+(ac) + 3 NH3(ac) + 3 H2O(l) -> Fe(OH)3(s)↓ + 3 NH4^+(ac)','el Fe³⁺ no forma complejo amoniacal']),
 demuestra:'el NH₃ es base de Brønsted (precipita hidróxidos) y base de Lewis (ligando que forma complejos con Cu²⁺ y Ni²⁺).'})}
`);

  add('c2-hno3','Clase 2 · Propiedades del ácido nítrico','TP 5 · CLASE 2 · 04',`
${ver('nitrogeno:qi-n-hno3-oxidante','Ácido nítrico como oxidante')}
${ensayo({n:'5',title:'Ácido nítrico concentrado con cobre y con zinc',
 hacemos:`<p>Bajo campana, con gafas y guantes: un trozo de Cu en el tubo 1 y de Zn en el tubo 2; se agregan ~2 mL de HNO₃ concentrado. Se acerca a la boca un papel tornasol azul húmedo.</p>`,
 vemos:`<ul><li>Reacción vigorosa; el metal se disuelve.</li><li>Se desprende un <b>gas pardo rojizo</b> (NO₂).</li><li>Con Cu la solución queda ${swatch('#3d8fa8','azul-verdosa')}; con Zn, incolora.</li><li>Tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}.</li></ul>`,
 pasa:rxs(['Cu(s) + 4 HNO3(c) -> Cu(NO3)2(ac) + 2 NO2(g)↑ + 2 H2O(l)'],['Zn(s) + 4 HNO3(c) -> Zn(NO3)2(ac) + 2 NO2(g)↑ + 2 H2O(l)'],['3 NO2(g) + H2O(l) -> 2 HNO3(ac) + NO(g)','por eso el tornasol se pone rojo']),
 demuestra:'el HNO₃ es un oxidante fuerte: no libera H₂ sino NO₂; ataca incluso al cobre, que el HCl no ataca.'})}
${idea('¿Por qué el cobre sí con HNO₃ y no con HCl?','<p>El cobre es <b>menos</b> reductor que el hidrógeno: el H⁺ no le alcanza para oxidarlo. El nitrato, en cambio, es un oxidante mucho más fuerte.</p>')}
`);

  add('resumen','Cuadro resumen del TP 5','TP 5 · RESUMEN',`
${table(['Ensayo','Lo que se ve','Lo que demuestra'],[
 ['C + CuO, Δ → barita','negro → rojizo; barita turbia','C reductor'],
 ['NaHCO₃ + HCl','efervescencia; vela se apaga','obtención de CO₂; no comburente'],
 ['Tubos invertidos','la vela se apaga en el tubo de abajo','CO₂ más denso que el aire'],
 ['Mg en CO₂','sigue ardiendo; puntos negros','CO₂ reducible por metales activos'],
 ['CO₂ en fenolftaleína alcalinizada / barita','fucsia → incoloro; turbidez blanca','CO₂ óxido ácido'],
 ['NH₄Cl + NaOH, Δ','olor picante; tornasol rosado → azul','obtención de NH₃'],
 ['Fuente de NH₃','el agua sube y se pone fucsia','NH₃ muy soluble y básico'],
 ['NH₃ + HCl','humo blanco','NH₃ base'],
 ['NaNO₃ + H₂SO₄, Δ','vapores pardos; tornasol rojo','obtención de HNO₃ por destilación'],
 ['Pb²⁺ / azul de metileno + carbón','no precipita PbI₂ / se decolora','adsorción'],
 ['CO₃²⁻/HCO₃⁻ + BaCl₂, filtrado + NH₃','dos precipitados blancos','separación carbonato/bicarbonato'],
 ['NaNO₂ + NH₄Cl, Δ','gas incoloro','obtención de N₂'],
 ['NH₃ + KMnO₄, Δ','violeta → precipitado pardo, burbujeo','NH₃ reductor'],
 ['Cu²⁺, Ni²⁺, Fe³⁺ + NH₃','precipitan; Cu y Ni se redisuelven en exceso','NH₃ ligando'],
 ['Cu, Zn + HNO₃ (c)','gas pardo; tornasol rojo','HNO₃ oxidante']
])}
`);

  add('cuestionario','Cuestionario resuelto: térreos, carbonoides y nitrogenoides','TP 5 · CUESTIONARIO',`
<p>Las siete preguntas del cuestionario oficial, resueltas paso a paso. Las masas molares usadas: NaHCO₃ 84, HCl 36,5, NH₄Cl 53,5, NaOH 40, NaNO₃ 85, H₂SO₄ 98 g/mol; R = 0,082 atm·L/(mol·K).</p>
<div data-qi-guide></div>
`);

  // ---------------- CUESTIONARIO ----------------
  const exercises=[
   {n:1,title:'Adsorción y carbón activado',
    statement:'Definir adsorción y describir ensayos realizados en el laboratorio que muestren la utilidad que presenta el carbón activado como adsorbente.',
    solution:step('Definición','<p><b>Adsorción</b> es la acumulación de partículas (moléculas o iones) sobre la <b>superficie</b> de un sólido. No hay que confundirla con la <b>absorción</b>, en la que las partículas penetran en todo el volumen del material.</p>')+
     step('Ensayo 1 · Iones plomo(II)','<p>Se preparan dos tubos con agua y Pb(NO₃)₂. Al <b>testigo</b> se le agrega KI y precipita PbI₂ amarillo. Al otro se le agrega carbón activado, se agita, se filtra y recién entonces se agrega KI: <b>no aparece</b> (o casi no aparece) el precipitado, porque el Pb²⁺ quedó adsorbido en el carbón.</p>'+rx('Pb(NO3)2(ac) + 2 KI(ac) -> PbI2(s)↓ + 2 KNO3(ac)'))+
     step('Ensayo 2 · Pigmentos','<p>Una solución de azul de metileno agitada con carbón activado y filtrada sale <b>incolora</b>: el colorante quedó retenido en la superficie del carbón.</p>'),
    answer:'Adsorción = acumulación sobre la superficie. Se demostró con Pb²⁺ (el filtrado ya no da PbI₂ con KI) y con azul de metileno (se decolora).'},
   {n:2,title:'Obtención y propiedades del CO₂',
    statement:'Realizá un esquema del aparato empleado en la obtención de CO₂ y respondé: a) Ecuación de la obtención. b) Volumen de HCl 18 % m/m (δ = 1,184 g/cm³) necesario para que reaccionen completamente 5 g de NaHCO₃. c) Volumen de CO₂ a 25 °C y 1 atm con los datos de b). d) ¿Qué carácter ácido-base presenta el CO₂ en agua? Ecuaciones y comprobación experimental. e) Observaciones y ecuaciones al burbujear CO₂ en I) agua de barita y II) fenolftaleína alcalinizada.',
    solution:step('Esquema',pic('generador-co2.webp','Generador de CO2','')+'<p>Tubo de ensayos con NaHCO₃ y tapón de dos perforaciones: por una entra el <b>tubo de seguridad</b> con embudo (por donde se agrega el HCl, sumergido en el <b>cierre hidráulico</b>), y por la otra sale el <b>tubo de desprendimiento</b> hacia los tubos colectores.</p>')+
     step('a) Ecuación',rx('NaHCO3(s) + HCl(ac) -> NaCl(ac) + CO2(g)↑ + H2O(l)'))+
     step('b) Volumen de HCl',chain(R`n_{\mathrm{NaHCO_3}}=\frac{5}{84}=0{,}0595\ \mathrm{mol}=n_{\mathrm{HCl}}`,R`m_{\mathrm{HCl}}=0{,}0595\cdot36{,}5=2{,}17\ \mathrm{g}`,R`m_{\text{sc}}=2{,}17\cdot\frac{100}{18}=12{,}07\ \mathrm{g}`,R`V=\frac{12{,}07}{1{,}184}=10{,}2\ \mathrm{mL}`))+
     step('c) Volumen de CO₂',chain([R`n_{\mathrm{CO_2}}=0{,}0595\ \mathrm{mol}`,'1 : 1'],R`V=\frac{0{,}0595\cdot0{,}082\cdot298}{1}=1{,}45\ \mathrm{L}`))+
     step('d) Carácter ácido',rxs(['CO2(g) + H2O(l) <=> H2CO3(ac)'],['H2CO3(ac) <=> H^+(ac) + HCO3^-(ac)'],['HCO3^-(ac) <=> H^+(ac) + CO3^2-(ac)'])+'<p>Es un <b>óxido ácido</b>. Se comprueba burbujeando CO₂ en agua con un indicador: la heliantina vira de amarillo a rojo (o el tornasol azul a rojo). En el TP se burbujeó en agua (tubo 4) y luego se agregó barita, y también en fenolftaleína alcalinizada (tubo 5), que se decoloró.</p>')+
     step('e-I) Agua de barita','<p>Aparece una <b>turbidez blanca</b> de carbonato de bario (con mucho exceso de gas puede redisolverse como bicarbonato).</p>'+rxs(['CO2(g) + Ba(OH)2(ac) -> BaCO3(s)↓ + H2O(l)'],['BaCO3(s) + CO2(g) + H2O(l) -> Ba(HCO3)2(ac)','sólo con gran exceso de CO₂']))+
     step('e-II) Fenolftaleína alcalinizada','<p>La solución pasa de <b>fucsia a incolora</b>: el CO₂ neutraliza la base y el pH baja por debajo de ≈ 8.</p>'+rxs(['CO2(g) + 2 NaOH(ac) -> Na2CO3(ac) + H2O(l)'],['Na2CO3(ac) + CO2(g) + H2O(l) -> 2 NaHCO3(ac)','acá se decolora'])),
    answer:'b) ≈ 10,2 mL de HCl 18 % · c) ≈ 1,45 L de CO₂ · d) óxido ácido · e) I: turbidez blanca de BaCO₃; II: fucsia → incoloro'},
   {n:3,title:'Propiedades físicas y ácido-base del amoníaco',
    statement:'¿Qué propiedades físicas del amoníaco pueden verificarse en la práctica? Describí cómo puede comprobarse su carácter ácido-base.',
    solution:step('Propiedades físicas verificadas',table(['Propiedad','Cómo se ve en el TP'],[['Gas incoloro','el tubo colector se ve vacío'],['Olor picante e irritante','se percibe al generarlo'],['Menos denso que el aire','se recoge en tubo <b>boca abajo</b>'],['Muy soluble en agua','en la fuente, el agua <b>sube</b> por el tubo']]))+
     step('Carácter ácido-base: es una base','<ul><li>Papel tornasol rosado humedecido en la salida del kitasato → <b>azul</b>.</li><li>Fuente de amoníaco: la fenolftaleína se pone <b>fucsia</b>.</li><li>Con HCl concentrado: <b>humo blanco</b> de NH₄Cl.</li></ul>'+rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)'],['NH3(g) + HCl(g) -> NH4Cl(s)'])),
    answer:'Incoloro, olor picante, menos denso que el aire y muy soluble. Es básico: tornasol → azul, fenolftaleína → fucsia, humo blanco con HCl.'},
   {n:4,title:'Obtención del amoníaco: cálculos y propiedades',
    statement:'Esquema del aparato de obtención de NH₃ y calcular: a) volumen de NaOH 10 % m/V necesario para que reaccionen completamente 2,5 g de NH₄Cl; b) volumen de NH₃ a 25 °C y 1 atm; c) características ácido-base y redox del amoníaco, cómo comprobarlas, observaciones y ecuaciones (las redox, por ion-electrón).',
    solution:step('Esquema','<p>Kitasato sujeto al pie universal, levemente inclinado, con NH₄Cl + NaOH y tapado. De la salida lateral sale una manguera que termina dentro de un <b>tubo seco invertido</b>. Se calienta con mechero.</p>'+figure(svg.gases,''))+
     step('a) Volumen de NaOH',rx('NH4Cl(s) + NaOH(ac) -> NH3(g) + NaCl(ac) + H2O(l)')+chain(R`n_{\mathrm{NH_4Cl}}=\frac{2{,}5}{53{,}5}=0{,}0467\ \mathrm{mol}=n_{\mathrm{NaOH}}`,R`m_{\mathrm{NaOH}}=0{,}0467\cdot40=1{,}87\ \mathrm{g}`,[R`V=1{,}87\ \mathrm{g}\cdot\frac{100\ \mathrm{mL}}{10\ \mathrm{g}}=18{,}7\ \mathrm{mL}`,'10 g cada 100 mL']))+
     step('b) Volumen de NH₃',chain(R`V=\frac{0{,}0467\cdot0{,}082\cdot298}{1}=1{,}14\ \mathrm{L}`))+
     step('c) Ácido-base','<p>Es una <b>base</b> (de Brønsted: capta H⁺; y de Lewis: dona su par libre). Se comprueba con tornasol rosado → azul, fenolftaleína → fucsia (fuente) y humo blanco con HCl.</p>'+rx('NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)'))+
     step('c) Redox: sólo reductor','<p>Su N está en −3, el mínimo: sólo puede oxidarse. Con KMnO₄ y calor se observa decoloración del violeta, <b>precipitado pardo</b> (MnO₂) y burbujeo (N₂).</p>'+rxs(['2 NH3 + 6 OH^- -> N2 + 6 H2O + 6 e^-','oxidación'],['MnO4^- + 2 H2O + 3 e^- -> MnO2 + 4 OH^-','reducción (× 2)'],['2 NH3 + 2 MnO4^- -> N2 + 2 MnO2 + 2 OH^- + 2 H2O','ecuación iónica'],['2 NH3 + 2 KMnO4 -> N2 + 2 MnO2 + 2 KOH + 2 H2O','molecular'])),
    answer:'a) ≈ 18,7 mL de NaOH 10 % m/V · b) ≈ 1,14 L de NH₃ · c) base; reductor (2 NH₃ + 2 MnO₄⁻ → N₂ + 2 MnO₂ + 2 OH⁻ + 2 H₂O)'},
   {n:5,title:'Amoníaco frente a cationes metálicos',
    statement:'Interpretar con ecuaciones balanceadas los cambios del cuadro y nombrar los iones complejos.'+table(['Solución','Una gota de NH₃','Exceso de NH₃','Al agregar HCl'],[['Sulfato cúprico (celeste)','precipitado celeste','solución azul intensa','solución verde'],['Sulfato manganoso (incolora)','precipitado blanco','sin cambios','solución incolora'],['Cloruro niqueloso (verde)','precipitado verde','solución azul','solución incolora'],['Cloruro de aluminio (incoloro)','precipitado blanco','sin cambios','solución incolora'],['Nitrato de plata (incoloro)','precipitado pardo','solución incolora','precipitado blanco']]),
    solution:step('Idea general','<p>Una gota de NH₃ aporta OH⁻ y precipita el <b>hidróxido</b> (u óxido). En exceso, Cu²⁺, Ni²⁺ y Ag⁺ forman <b>complejos amoniacales</b> solubles; Mn²⁺ y Al³⁺ no. El HCl transforma el NH₃ en NH₄⁺ y destruye los complejos; el Cl⁻ puede formar clorocomplejos o precipitar AgCl.</p>'+figure(svg.amoniaco,''))+
     step('Cobre',rxs(['CuSO4 + 2 NH3 + 2 H2O -> Cu(OH)2↓ + (NH4)2SO4','precipitado celeste'],['Cu(OH)2 + 4 NH3 -> [Cu(NH3)4]^2+ + 2 OH^-','azul intenso: ion tetraammincobre(II)'],['[Cu(NH3)4]^2+ + 4 HCl -> [CuCl4]^2- + 4 NH4^+','verde: ion tetraclorocuprato(II)']))+
     step('Manganeso',rxs(['MnSO4 + 2 NH3 + 2 H2O -> Mn(OH)2↓ + (NH4)2SO4','precipitado blanco'],['exceso de NH3 -> sin cambios','el Mn²⁺ no forma complejo amoniacal estable'],['Mn(OH)2 + 2 HCl -> MnCl2 + 2 H2O','se disuelve: solución incolora']))+note('Detalle','<p>Expuesto al aire, el Mn(OH)₂ blanco se oscurece lentamente (se oxida a Mn(III)/Mn(IV), pardo).</p>')+
     step('Níquel',rxs(['NiCl2 + 2 NH3 + 2 H2O -> Ni(OH)2↓ + 2 NH4Cl','precipitado verde'],['Ni(OH)2 + 6 NH3 -> [Ni(NH3)6]^2+ + 2 OH^-','azul: ion hexaamminníquel(II)'],['[Ni(NH3)6]^2+ + 6 HCl -> [NiCl4]^2- + 6 NH4^+ + 2 Cl^-','como lo plantea el apunte: ion tetracloroniquelato(II)']))+note('Para afinar','<p>En solución acuosa diluida, lo que se forma realmente al acidificar es el acuocomplejo [Ni(H₂O)₆]²⁺ (verde muy pálido, casi incoloro). El [NiCl₄]²⁻ sólo es estable con muchísimo cloruro o en solventes no acuosos.</p>'+rx('[Ni(NH3)6]^2+ + 6 H^+ + 6 H2O -> [Ni(H2O)6]^2+ + 6 NH4^+'))+
     step('Aluminio',rxs(['AlCl3 + 3 NH3 + 3 H2O -> Al(OH)3↓ + 3 NH4Cl','precipitado blanco gelatinoso'],['exceso de NH3 -> sin cambios','el NH₃ es una base demasiado débil para formar [Al(OH)₄]⁻ y el Al³⁺ no forma amminocomplejos'],['Al(OH)3 + 3 HCl -> AlCl3 + 3 H2O','solución incolora']))+
     step('Plata',rxs(['2 AgNO3 + 2 NH3 + H2O -> Ag2O↓ + 2 NH4NO3','precipitado pardo'],['Ag2O + H2O + 4 NH3 -> 2 [Ag(NH3)2]^+ + 2 OH^-','incoloro: ion diamminplata(I)'],['[Ag(NH3)2]^+ + 2 HCl -> AgCl↓ + 2 NH4^+ + Cl^-','precipitado blanco de AgCl'])),
    answer:'Complejos: [Cu(NH₃)₄]²⁺ tetraammincobre(II) · [CuCl₄]²⁻ tetraclorocuprato(II) · [Ni(NH₃)₆]²⁺ hexaamminníquel(II) · [NiCl₄]²⁻ tetracloroniquelato(II) · [Ag(NH₃)₂]⁺ diamminplata(I)'},
   {n:6,title:'Obtención del ácido nítrico',
    statement:'Esquema del aparato de obtención de HNO₃ y respondé: a) ¿Qué volumen de H₂SO₄ concentrado (98 % m/m, δ = 1,84 g/cm³) debe emplearse para que reaccionen completamente 5 g de NaNO₃? b) ¿Cómo se separa el HNO₃ de la mezcla? c) ¿Qué carácter ácido-base presenta el NO₂ en solución acuosa? ¿Cómo se comprueba?',
    solution:step('Esquema',pic('retorta-hno3.webp','Retorta y tubo colector en hielo','')+'<p>Retorta (con el NaNO₃ y el H₂SO₄) sobre tela metálica y mechero, sujeta al pie universal; el cuello entra en un tubo de ensayos sumergido en agua con hielo.</p>')+
     step('a) Volumen de H₂SO₄',rx('NaNO3(s) + H2SO4(c) -> NaHSO4(s) + HNO3(g)')+chain(R`n_{\mathrm{NaNO_3}}=\frac{5}{85}=0{,}0588\ \mathrm{mol}=n_{\mathrm{H_2SO_4}}`,R`m_{\mathrm{H_2SO_4}}=0{,}0588\cdot98=5{,}76\ \mathrm{g}`,R`m_{\text{sc}}=5{,}76\cdot\frac{100}{98}=5{,}88\ \mathrm{g}`,R`V=\frac{5{,}88}{1{,}84}=3{,}2\ \mathrm{mL}`)+'<p>La guía usa 5 mL: se trabaja con <b>exceso</b> de H₂SO₄ para asegurar que reaccione todo el nitrato.</p>')+
     step('b) Separación','<p>Por <b>destilación</b>: el HNO₃ es volátil (hierve a ≈ 83 °C) y el H₂SO₄ y el NaHSO₄ no. Al calentar suave, el ácido nítrico pasa al estado gaseoso, sale por el cuello de la retorta y se <b>condensa</b> en el tubo enfriado con hielo.</p>')+
     step('c) Carácter del NO₂','<p>Es <b>ácido</b>: con agua regenera HNO₃ (dismutación). Se comprueba acercando papel tornasol azul húmedo a los vapores pardos (o ensayando la solución obtenida): vira a <b>rojo</b>.</p>'+rx('3 NO2(g) + H2O(l) -> 2 HNO3(ac) + NO(g)')),
    answer:'a) ≈ 3,2 mL de H₂SO₄ 98 % · b) por destilación, condensando en hielo · c) ácido: 3 NO₂ + H₂O → 2 HNO₃ + NO; tornasol azul → rojo'},
   {n:7,title:'Ácido nítrico con metales y no metales',
    statement:'Completar y balancear por ion-electrón: a) HNO₃ (c) + Zn · b) HNO₃ (c) + Fe · c) HNO₃ (c) + S · d) HNO₃ (c) + KI · e) HNO₃ (d) + Al · f) HNO₃ (d) + Zn · g) HNO₃ (d) + Fe. Para a), c) y f): ¿qué comprobaciones experimentales se ensayaron?',
    solution:note('Criterio','<p>Como en el material teórico: ácido <b>concentrado</b> → se reduce a <b>NO₂</b>; ácido <b>diluido</b> → se reduce a <b>NH₄⁺</b>.</p>'+rxs(['NO3^- + 2 H^+ + e^- -> NO2 + H2O','concentrado'],['NO3^- + 10 H^+ + 8 e^- -> NH4^+ + 3 H2O','diluido']))+
     step('a) Zn + HNO₃ (c)',rxs(['Zn -> Zn^2+ + 2 e^-'],['2 NO3^- + 4 H^+ + 2 e^- -> 2 NO2 + 2 H2O','× 2'],['Zn + 4 HNO3 -> Zn(NO3)2 + 2 NO2 + 2 H2O','molecular']))+
     step('b) Fe + HNO₃ (c)',rxs(['Fe -> Fe^3+ + 3 e^-'],['3 NO3^- + 6 H^+ + 3 e^- -> 3 NO2 + 3 H2O','× 3'],['Fe + 6 HNO3 -> Fe(NO3)3 + 3 NO2 + 3 H2O','molecular']))+
     step('c) S + HNO₃ (c)',rxs(['S + 4 H2O -> SO4^2- + 8 H^+ + 6 e^-','S: 0 → +6'],['6 NO3^- + 12 H^+ + 6 e^- -> 6 NO2 + 6 H2O','× 6'],['S + 6 NO3^- + 4 H^+ -> SO4^2- + 6 NO2 + 2 H2O','suma simplificada'],['S + 6 HNO3 -> H2SO4 + 6 NO2 + 2 H2O','molecular']))+
     step('d) KI + HNO₃ (c)',rxs(['2 I^- -> I2 + 2 e^-'],['2 NO3^- + 4 H^+ + 2 e^- -> 2 NO2 + 2 H2O','× 2'],['2 KI + 4 HNO3 -> I2 + 2 NO2 + 2 KNO3 + 2 H2O','molecular']))+
     step('e) Al + HNO₃ (d)',rxs(['Al -> Al^3+ + 3 e^-','× 8'],['NO3^- + 10 H^+ + 8 e^- -> NH4^+ + 3 H2O','× 3'],['8 Al + 3 NO3^- + 30 H^+ -> 8 Al^3+ + 3 NH4^+ + 9 H2O','24 e⁻ en cada lado'],['8 Al + 30 HNO3 -> 8 Al(NO3)3 + 3 NH4NO3 + 9 H2O','molecular']))+note('Ojo','<p>Con HNO₃ concentrado el aluminio se <b>pasiva</b>; por eso este caso se plantea con ácido diluido.</p>')+
     step('f) Zn + HNO₃ (d)',rxs(['Zn -> Zn^2+ + 2 e^-','× 4'],['NO3^- + 10 H^+ + 8 e^- -> NH4^+ + 3 H2O'],['4 Zn + NO3^- + 10 H^+ -> 4 Zn^2+ + NH4^+ + 3 H2O'],['4 Zn + 10 HNO3 -> 4 Zn(NO3)2 + NH4NO3 + 3 H2O','molecular']))+
     step('g) Fe + HNO₃ (d)',rxs(['Fe -> Fe^3+ + 3 e^-','× 8'],['NO3^- + 10 H^+ + 8 e^- -> NH4^+ + 3 H2O','× 3'],['8 Fe + 30 HNO3 -> 8 Fe(NO3)3 + 3 NH4NO3 + 9 H2O','molecular']))+
     step('Comprobaciones experimentales','<ul><li><b>a)</b> Zn + HNO₃ (c): se observa el <b>gas pardo</b> (NO₂) y el papel tornasol azul húmedo vira a <b>rojo</b> (3 NO₂ + H₂O → 2 HNO₃ + NO).</li><li><b>c)</b> S + HNO₃ (c): también se desprende NO₂ pardo; el sulfato formado se reconoce con BaCl₂, que da un precipitado blanco de BaSO₄ insoluble en ácidos. <i>(Este ensayo no figura en la guía de laboratorio del TP 5; es la comprobación que corresponde.)</i></li><li><b>f)</b> Zn + HNO₃ (d): no se ve gas; a la solución se le agrega NaOH y se calienta: se desprende NH₃, que vira el tornasol rojo humedecido a <b>azul</b>.</li></ul>'+rxs(['Ba^2+(ac) + SO4^2-(ac) -> BaSO4(s)↓'],['NH4NO3(ac) + NaOH(ac) =[Δ]=> NH3(g)↑ + NaNO3(ac) + H2O(l)'])),
    answer:'a) Zn + 4 HNO₃ → Zn(NO₃)₂ + 2 NO₂ + 2 H₂O · b) Fe + 6 HNO₃ → Fe(NO₃)₃ + 3 NO₂ + 3 H₂O · c) S + 6 HNO₃ → H₂SO₄ + 6 NO₂ + 2 H₂O · d) 2 KI + 4 HNO₃ → I₂ + 2 NO₂ + 2 KNO₃ + 2 H₂O · e) 8 Al + 30 HNO₃ → 8 Al(NO₃)₃ + 3 NH₄NO₃ + 9 H₂O · f) 4 Zn + 10 HNO₃ → 4 Zn(NO₃)₂ + NH₄NO₃ + 3 H₂O · g) 8 Fe + 30 HNO₃ → 8 Fe(NO₃)₃ + 3 NH₄NO₃ + 9 H₂O'}
  ];

  window.ET27_QI4.units.push({id:'tp5',part:'tp',n:5,title:'TP 5 · Carbono y nitrógeno',short:'Carbono y nitrógeno',lead:'La guía de laboratorio del TP 5 explicada ensayo por ensayo, con los cálculos de la guía y el cuestionario de térreos, carbonoides y nitrogenoides resuelto paso a paso.',sections:s,exercises,exercisesLabel:'Cuestionario resuelto'});
})();
