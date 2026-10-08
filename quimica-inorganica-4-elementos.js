// 27xSOLved · Química Inorgánica 4.º · FICHAS DE ELEMENTOS
// Cada elemento que aparece en los TP 4 y 5: datos, propiedades físicas y químicas, obtención,
// compuestos importantes y lo que se vio en el laboratorio.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  const {idea,warn,note,table,cards}=K;
  const {rx,rxs,f,swatch,punch,facts}=Q;
  const esc=K.esc;

  const FAM={
    nm:['No metal','#2e9d6a'],
    al:['Metal alcalino','#e0602a'],
    at:['Metal alcalinotérreo','#d89a1c'],
    md:['Metaloide','#7d6bd6'],
    mp:['Metal del bloque p','#3b8fd9'],
    tr:['Metal de transición','#c0507a']
  };
  const sections=[];
  const lab=(unit,key,text)=>`<li><button type="button" class="textButton qiLabLink" data-result-go="qi:${unit}:${key}">${text} →</button></li>`;

  // Cabecera tipo “casillero de tabla periódica” + datos clave.
  const head=e=>{const [fam,col]=FAM[e.fam];return `<div class="qiEl" style="--fam:${col}">
    <div class="qiElTile"><small>${e.Z}</small><b>${e.sym}</b><span>${e.name}</span><em>${e.M}</em></div>
    <div class="qiElData">
      <div><small>Familia</small><b>${fam}</b></div>
      <div><small>Grupo · período</small><b>${e.gp}</b></div>
      <div><small>Configuración</small><b>${e.cfg}</b></div>
      <div><small>Electronegatividad</small><b>${e.en}</b></div>
      <div><small>Estados de oxidación</small><b>${e.ox}</b></div>
      <div><small>En la naturaleza</small><b>${e.nat}</b></div>
    </div></div>`};

  // Ficha completa.
  const ficha=e=>{
    const html=`${head(e)}
${punch(e.punch)}
<h3>Características generales</h3>${e.general}
<h3>Propiedades físicas</h3>${facts(e.fis)}${e.fisExtra||''}
<h3>Propiedades químicas</h3>${e.quim}
${e.obt?`<h3>Obtención</h3>${e.obt}`:''}
${e.comp?`<h3>Compuestos importantes</h3>${table(['Compuesto','Qué es / para qué sirve'],e.comp)}`:''}
<h3>🧪 Lo que vimos en el laboratorio</h3>${e.labHtml||''}${e.labs?`<ul class="qiLabList">${e.labs.join('')}</ul>`:''}
${e.extra||''}`;
    sections.push({key:`qi-el-${e.sym.toLowerCase()}`,label:`${e.name} (${e.sym})`,kicker:`${e.kicker} · ${e.sym}`,html,el:e});
  };

  // =====================================================================
  // PROTAGONISTAS
  // =====================================================================
  ficha({sym:'H',name:'Hidrógeno',Z:1,M:'1,008',fam:'nm',gp:'1 (aparte) · 1',cfg:'1s¹',en:'2,20',ox:'+1 · −1 (hidruros)',nat:'agua, materia orgánica; casi nunca libre',kicker:'PROTAGONISTA',
   punch:'El más simple y liviano de todos: un protón y un electrón. Puede perder su electrón (H⁺) o ganar uno (H⁻).',
   general:`<p>Es el elemento más abundante del universo (≈ 75 % de la materia de las estrellas), pero en la Tierra casi no está libre: está combinado en el agua, en los ácidos y en la materia orgánica. Se ubica arriba del grupo 1 por su configuración 1s¹, pero <b>no es un metal alcalino</b>: es un no metal que forma moléculas diatómicas, <b>H₂</b>.</p>
<p>Tiene tres isótopos: <b>protio</b> (¹H, el común), <b>deuterio</b> (²H, “agua pesada”) y <b>tritio</b> (³H, radiactivo).</p>`,
   fis:[['Estado (25 °C)','gas, H₂'],['Color y olor','incoloro, inodoro'],['Densidad','0,09 g/L: ≈ 14 veces menos que el aire'],['Fusión · ebullición','−259 °C · −253 °C'],['Solubilidad en agua','muy baja']],
   quim:`<ul class="kitList"><li><b>Combustible:</b> arde con el O₂; mezclado con aire explota (el “ladrido”).</li><li><b>Reductor:</b> le saca el oxígeno a óxidos metálicos.</li><li>Con metales muy activos forma <b>hidruros iónicos</b> (H⁻); con no metales, compuestos covalentes (HCl, NH₃, H₂O).</li></ul>
${rxs(['2 H2(g) + O2(g) -> 2 H2O(g)','combustión'],['CuO(s) + H2(g) =[Δ]=> Cu(s) + H2O(g)','reductor'],['N2(g) + 3 H2(g) <=> 2 NH3(g)','síntesis de Haber'],['2 Na(s) + H2(g) =[Δ]=> 2 NaH(s)','hidruro iónico'])}`,
   obt:rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)','laboratorio: metal activo + ácido'],['2 H2O(l) =[electricidad]=> 2 H2(g) + O2(g)','electrólisis del agua'],['CH4(g) + H2O(g) =[catalizador, Δ]=> CO(g) + 3 H2(g)','industria: reformado del gas natural']),
   comp:[['H₂O','agua: solvente universal'],['HCl','ácido clorhídrico, el ácido de casi todos los TP'],['NH₃','amoníaco'],['NaH, CaH₂','hidruros iónicos: básicos y reductores'],['H₂O₂','agua oxigenada']],
   labs:[lab('tp4','qi-tp4-c1-hidrogeno','Obtención con Zn + HCl, “ladrido” y ensayo de densidad (TP 4)'),lab('tp4','qi-tp4-c2-metales','Se desprende con Na y Mg en agua, Al en NaOH y Fe en ácidos; hidruro de sodio (TP 4)')],
   extra:note('Usos','<p>Fabricación de amoníaco (fertilizantes), hidrogenación de aceites (margarinas), combustible de cohetes y celdas de combustible (el único “residuo” es agua).</p>')});

  ficha({sym:'O',name:'Oxígeno',Z:8,M:'16,00',fam:'nm',gp:'16 · 2',cfg:'[He] 2s² 2p⁴',en:'3,44 (2.º más electronegativo)',ox:'−2 · −1 (peróxidos)',nat:'21 % del aire; ≈ 46 % de la corteza',kicker:'PROTAGONISTA',
   punch:'No arde: hace arder. Es el gran comburente y uno de los oxidantes más importantes.',
   general:`<p>Es el elemento más abundante de la corteza terrestre (forma parte del agua, los óxidos y los silicatos). Como sustancia simple es el <b>O₂</b>, un gas diatómico; su otro alótropo es el <b>ozono, O₃</b>, que en la estratósfera nos protege de la radiación ultravioleta. Lo producen las plantas en la fotosíntesis y lo usamos para respirar.</p>`,
   fis:[['Estado (25 °C)','gas, O₂'],['Color y olor','incoloro, inodoro (líquido: celeste)'],['Densidad','1,43 g/L (CNPT): algo mayor que el aire'],['Fusión · ebullición','−218 °C · −183 °C'],['Solubilidad en agua','baja'],['Magnetismo','paramagnético: lo atrae un imán']],
   quim:`<ul class="kitList"><li><b>Comburente:</b> reaviva una astilla en punto de ignición (su ensayo de reconocimiento).</li><li>Con <b>no metales</b> forma óxidos ácidos (SO₂, CO₂); con <b>metales</b>, óxidos básicos (Na₂O, MgO).</li><li><b>Oxidante</b> en solución ácida: I⁻ → I₂, Fe²⁺ → Fe³⁺.</li></ul>
${rxs(['S(s) + O2(g) -> SO2(g)','óxido ácido'],['2 Mg(s) + O2(g) -> 2 MgO(s)','óxido básico'],['4 Fe^2+ + O2 + 4 H^+ -> 4 Fe^3+ + 2 H2O','oxidante'],['CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(g)','combustión'])}`,
   obt:rxs(['2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)'],['2 KMnO4(s) =[Δ]=> K2MnO4(s) + MnO2(s) + O2(g)'],['2 H2O2(ac) =[MnO2]=> 2 H2O(l) + O2(g)'])+'<p>En la industria se obtiene por <b>destilación fraccionada del aire líquido</b>.</p>',
   comp:[['H₂O','agua'],['H₂O₂','peróxido: O en −1, oxidante y reductor'],['Óxidos','CO₂, SO₂ (ácidos) · Na₂O, MgO (básicos) · Al₂O₃ (anfótero)'],['O₃','ozono, alótropo']],
   labs:[lab('tp4','qi-tp4-c1-oxigeno','Obtención con KClO₃ + MnO₂ y ensayos con KI, Fe²⁺, S, C y Fe (TP 4)'),lab('tp4','qi-tp4-c2-oxigeno-agua','Obtención con KMnO₄ y con H₂O₂ + MnO₂ (TP 4)'),lab('tp4','qi-tp4-c1-metales','Na y Mg ardiendo: óxidos básicos (TP 4)')]});

  ficha({sym:'C',name:'Carbono',Z:6,M:'12,01',fam:'nm',gp:'14 · 2',cfg:'[He] 2s² 2p²',en:'2,55',ox:'de −4 (CH₄) a +4 (CO₂)',nat:'carbón, grafito, diamante, carbonatos, CO₂, seres vivos',kicker:'PROTAGONISTA',
   punch:'Mismo átomo, personalidades opuestas: grafito blando y conductor, diamante durísimo y aislante.',
   general:`<p>Tiene 4 electrones de valencia y forma <b>4 enlaces covalentes</b>, también consigo mismo: por eso existen cadenas, anillos y millones de compuestos (la química orgánica entera). En química inorgánica nos interesan sus <b>alótropos</b>, sus óxidos (CO y CO₂) y los carbonatos.</p>`,
   fis:[['Estado (25 °C)','sólido'],['Alótropos','grafito, diamante, fullerenos (y grafeno, nanotubos)'],['Grafito','negro, blando, untuoso, conduce la electricidad'],['Diamante','transparente, dureza 10 (Mohs), no conduce'],['Fusión','no funde a 1 atm: sublima a ≈ 3600 °C']],
   quim:`<ul class="kitList"><li><b>Reductor:</b> se oxida fácil a CO o CO₂; le saca el oxígeno a los óxidos metálicos (metalurgia).</li><li><b>Adsorbente</b> (carbón activado): retiene colorantes e iones sobre su superficie.</li><li>Su óxido CO₂ es <b>ácido</b>.</li></ul>
${rxs(['C(s) + O2(g) -> CO2(g)','combustión completa'],['2 C(s) + O2(g) -> 2 CO(g)','con poco O₂: CO, muy tóxico'],['2 CuO(s) + C(s) =[Δ]=> 2 Cu(s) + CO2(g)','reductor'])}`,
   obt:'<p>El <b>carbón vegetal</b> se obtiene calentando madera sin aire (pirólisis); el <b>coque</b>, igual a partir de hulla. El carbón activado es carbón tratado para multiplicar sus poros.</p>',
   comp:[['CO₂','gas, óxido ácido, no comburente, 1,5 veces más denso que el aire'],['CO','gas tóxico (se une a la hemoglobina), reductor en altos hornos'],['Carbonatos (CO₃²⁻)','CaCO₃ (mármol, caliza), Na₂CO₃; insolubles salvo alcalinos y amonio'],['Bicarbonatos (HCO₃⁻)','NaHCO₃: no precipita con Ba²⁺ y se descompone con calor']],
   labs:[lab('tp5','qi-tp5-c1-carbono','C + CuO: poder reductor (TP 5)'),lab('tp5','qi-tp5-c2-adsorcion','Adsorción de Pb²⁺ y azul de metileno (TP 5)'),lab('tp5','qi-tp5-c1-co2','Obtención y propiedades del CO₂ (TP 5)'),lab('tp5','qi-tp5-c2-carbonatos-n2','Carbonatos y bicarbonatos (TP 5)'),lab('tp4','qi-tp4-c1-oxigeno','Carbón incandescente en O₂ (TP 4)')]});

  ficha({sym:'N',name:'Nitrógeno',Z:7,M:'14,01',fam:'nm',gp:'15 · 2',cfg:'[He] 2s² 2p³',en:'3,04',ox:'todos, de −3 a +5',nat:'78 % del aire (N₂); proteínas; nitratos',kicker:'PROTAGONISTA',
   punch:'Como N₂ es casi inerte (triple enlace), pero en sus compuestos recorre todos los estados de oxidación de −3 a +5.',
   general:`<p>El aire es casi todo nitrógeno. La molécula <b>N≡N</b> tiene uno de los enlaces más fuertes que existen, por eso el N₂ casi no reacciona. Los seres vivos lo necesitan (proteínas, ADN), pero sólo algunas bacterias pueden “fijarlo”; la industria lo fija con el proceso Haber para hacer fertilizantes.</p>`,
   fis:[['Estado (25 °C)','gas, N₂'],['Color y olor','incoloro, inodoro'],['Densidad','1,25 g/L: apenas menor que el aire'],['Fusión · ebullición','−210 °C · −196 °C (nitrógeno líquido)'],['Comburente','no: apaga la llama']],
   quim:`<ul class="kitList"><li>El N₂ reacciona sólo en condiciones extremas (alta temperatura, catalizadores, descargas eléctricas).</li><li>En el NH₃ (−3) sólo puede ser <b>reductor</b>; en el HNO₃ (+5) es <b>oxidante</b> fuerte.</li><li>El NH₃ es <b>base</b> y <b>ligando</b>; el NO₂ y el HNO₃ son <b>ácidos</b>.</li></ul>
${rxs(['N2(g) + 3 H2(g) <=[Fe, 450 °C, 200 atm]=> 2 NH3(g)','Haber'],['N2(g) + O2(g) =[rayo]=> 2 NO(g)','en las tormentas'],['3 Mg(s) + N2(g) =[Δ]=> Mg3N2(s)','con metales activos'])}`,
   obt:rxs(['NaNO2(ac) + NH4Cl(ac) =[Δ]=> N2(g) + NaCl(ac) + 2 H2O(l)','laboratorio (TP 5)'])+'<p>En la industria, por destilación fraccionada del aire líquido.</p>',
   comp:[['NH₃ · NH₄⁺','amoníaco: gas básico, muy soluble, reductor, ligando'],['HNO₃','ácido fuerte y oxidante; no libera H₂'],['NO₂','gas pardo, ácido'],['NO · N₂O','gases incoloros (N₂O: gas hilarante)'],['Nitratos · nitritos','NaNO₃, KNO₃ (salitre) · NaNO₂']],
   labs:[lab('tp5','qi-tp5-c2-carbonatos-n2','Obtención de N₂ con NaNO₂ + NH₄Cl (TP 5)'),lab('tp5','qi-tp5-c1-nh3','Obtención y propiedades del NH₃ (TP 5)'),lab('tp5','qi-tp5-c2-nh3','NH₃ reductor y ligando (TP 5)'),lab('tp5','qi-tp5-c1-hno3','Obtención del HNO₃ (TP 5)'),lab('tp5','qi-tp5-c2-hno3','HNO₃ con Cu y Zn (TP 5)'),lab('tp4','qi-tp4-c1-metales','Sodio en amoníaco líquido (TP 4)')]});

  // =====================================================================
  // METALES ALCALINOS
  // =====================================================================
  ficha({sym:'Li',name:'Litio',Z:3,M:'6,94',fam:'al',gp:'1 · 2',cfg:'[He] 2s¹',en:'0,98',ox:'+1',nat:'minerales y salares (Argentina, Bolivia, Chile)',kicker:'METAL ALCALINO',
   punch:'El metal más liviano: flota hasta en aceite. Y el corazón de las baterías del celular.',
   general:`<p>Es el primero de los alcalinos y el “menos alcalino” de todos: su átomo es tan chico que se comporta un poco distinto (por ejemplo, es el único que reacciona con el N₂ del aire a temperatura ambiente). Argentina es uno de los grandes productores, desde los salares de la Puna.</p>`,
   fis:[['Aspecto','metal blando, plateado'],['Densidad','0,53 g/cm³: el metal menos denso'],['Fusión','181 °C'],['Llama','rojo carmín']],
   quim:`<ul class="kitList"><li>Reductor fuerte, pero el menos reactivo de los alcalinos con el agua.</li><li>Con O₂ forma el óxido normal Li₂O.</li></ul>${rxs(['4 Li(s) + O2(g) -> 2 Li2O(s)'],['2 Li(s) + 2 H2O(l) -> 2 LiOH(ac) + H2(g)'],['6 Li(s) + N2(g) -> 2 Li3N(s)','particularidad del litio'])}`,
   comp:[['LiCl','la sal usada en el ensayo a la llama'],['Li₂CO₃','medicamento estabilizador del ánimo; materia prima de baterías'],['LiOH','base fuerte']],
   labs:[lab('tp4','qi-tp4-c1-metales','Ensayo a la llama con LiCl: rojo carmín (TP 4)')]});

  ficha({sym:'Na',name:'Sodio',Z:11,M:'22,99',fam:'al',gp:'1 · 3',cfg:'[Ne] 3s¹',en:'0,93',ox:'+1',nat:'NaCl (mar, salinas), silicatos',kicker:'METAL ALCALINO',
   punch:'Se corta con cuchillo, vive bajo kerosene y corre sobre el agua. Su llama es amarilla.',
   general:`<p>Metal tan reactivo que nunca se encuentra libre. Pierde su único electrón 3s con muchísima facilidad y forma Na⁺, el catión de la sal de mesa. Se guarda bajo kerosene porque reacciona con el oxígeno y la humedad del aire.</p>`,
   fis:[['Aspecto','plateado brillante (se opaca enseguida al aire)'],['Dureza','blando: se corta con cuchillo'],['Densidad','0,97 g/cm³: flota en agua'],['Fusión','98 °C'],['Llama','amarillo intenso (589 nm)']],
   quim:`<ul class="kitList"><li>Reductor muy fuerte.</li><li>Con agua reacciona violentamente (puede encenderse el H₂).</li><li>Al arder en aire forma sobre todo <b>peróxido</b>, Na₂O₂.</li><li>Se disuelve en amoníaco líquido dando una solución azul de electrones solvatados.</li></ul>${rxs(['2 Na(s) + 2 H2O(l) -> 2 NaOH(ac) + H2(g)'],['2 Na(s) + O2(g) =[Δ]=> Na2O2(s)'],['2 Na(s) + Cl2(g) -> 2 NaCl(s)'])}`,
   obt:rx('2 NaCl(l) =[electrólisis]=> 2 Na(l) + Cl2(g)','electrólisis de la sal fundida'),
   comp:[['NaCl','sal de mesa'],['NaOH','soda cáustica: base fuerte'],['Na₂CO₃ · NaHCO₃','carbonato (soda Solvay) · bicarbonato'],['NaH','hidruro iónico'],['NaNO₃ · NaNO₂','nitrato (obtención de HNO₃) · nitrito (obtención de N₂)']],
   labs:[lab('tp4','qi-tp4-c1-metales','Sodio con O₂, a la llama y en NH₃ líquido (TP 4)'),lab('tp4','qi-tp4-c2-metales','Sodio en la cuba con agua y fenolftaleína; NaH (TP 4)')],
   extra:warn('El sodio “tapa” al resto','<p>Una contaminación mínima de Na colorea la llama de amarillo y esconde otros colores (como el lila del potasio).</p>')});

  ficha({sym:'K',name:'Potasio',Z:19,M:'39,10',fam:'al',gp:'1 · 4',cfg:'[Ar] 4s¹',en:'0,82',ox:'+1',nat:'silvita (KCl), feldespatos; esencial en los seres vivos',kicker:'METAL ALCALINO',
   punch:'Más reactivo que el sodio: con agua arde con llama lila. Y aparece en medio TP como catión espectador.',
   general:`<p>Su electrón externo está todavía más lejos que el del sodio, así que lo pierde aún más fácil. Es un nutriente esencial (fertilizantes, función nerviosa). En los TP aparece sobre todo en sus sales: KClO₃, KMnO₄, KI, KSCN… donde el K⁺ es casi siempre un <b>ion espectador</b>.</p>`,
   fis:[['Aspecto','plateado, muy blando'],['Densidad','0,86 g/cm³'],['Fusión','63 °C'],['Llama','violeta / lila']],
   quim:`<ul class="kitList"><li>Reductor fortísimo; con agua la reacción es tan exotérmica que el H₂ se enciende.</li><li>Al arder en aire forma <b>superóxido</b>, KO₂.</li></ul>${rxs(['2 K(s) + 2 H2O(l) -> 2 KOH(ac) + H2(g)'],['K(s) + O2(g) -> KO2(s)','superóxido'])}`,
   comp:[['KClO₃','clorato: fuente de O₂'],['KMnO₄','permanganato: oxidante violeta'],['KI','ioduro: reductor, se oxida a I₂'],['KSCN','tiocianato: reconoce el Fe³⁺'],['KNO₃','salitre: fertilizante, pólvora'],['KCl','sal del ensayo a la llama']],
   labs:[lab('tp4','qi-tp4-c1-metales','KCl a la llama: violeta/lila (TP 4)'),lab('tp4','qi-tp4-c1-oxigeno','KClO₃ para obtener O₂ (TP 4)'),lab('tp4','qi-tp4-c2-oxigeno-agua','KMnO₄ y KI con agua oxigenada (TP 4)')]});

  // =====================================================================
  // ALCALINOTÉRREOS
  // =====================================================================
  ficha({sym:'Mg',name:'Magnesio',Z:12,M:'24,31',fam:'at',gp:'2 · 3',cfg:'[Ne] 3s²',en:'1,31',ox:'+2',nat:'dolomita, agua de mar (MgCl₂), clorofila',kicker:'ALCALINOTÉRREO',
   punch:'Arde con una luz blanca enceguecedora y es tan reductor que sigue ardiendo dentro del CO₂.',
   general:`<p>Metal liviano y resistente: se usa en aleaciones para autos, aviones y bicicletas. Está en el centro de la molécula de clorofila. Pierde sus dos electrones 3s y forma Mg²⁺.</p>`,
   fis:[['Aspecto','gris plateado (cinta o polvo)'],['Densidad','1,74 g/cm³'],['Fusión','650 °C'],['Llama','luz blanca intensa al arder']],
   quim:`<ul class="kitList"><li>Reductor fuerte; su óxido MgO es <b>básico</b>.</li><li>Con agua fría casi no reacciona; en caliente sí.</li><li>Reacciona rápido con ácidos y con HNO₃ da distintos productos según la concentración.</li></ul>${rxs(['2 Mg(s) + O2(g) =[Δ]=> 2 MgO(s)'],['Mg(s) + 2 H2O(l) =[Δ]=> Mg(OH)2(s) + H2(g)'],['Mg(s) + 2 HCl(ac) -> MgCl2(ac) + H2(g)'],['2 Mg(s) + CO2(g) =[Δ]=> 2 MgO(s) + C(s)'])}`,
   obt:rx('MgCl2(l) =[electrólisis]=> Mg(l) + Cl2(g)','a partir del agua de mar'),
   comp:[['MgO','magnesia: óxido básico, refractario'],['Mg(OH)₂','“leche de magnesia”: antiácido'],['MgCO₃','se descompone con calor en MgO + CO₂'],['MgSO₄','sal de Epsom']],
   labs:[lab('tp4','qi-tp4-c1-metales','Mg ardiendo en aire y su óxido en agua (TP 4)'),lab('tp4','qi-tp4-c2-metales','Mg con agua y fenolftaleína a baño María (TP 4)'),lab('tp5','qi-tp5-c1-co2','Mg encendido dentro de CO₂ (TP 5)')],
   extra:warn('Seguridad','<p>No mirar directamente la llama del magnesio: emite mucha luz, también ultravioleta.</p>')});

  ficha({sym:'Ca',name:'Calcio',Z:20,M:'40,08',fam:'at',gp:'2 · 4',cfg:'[Ar] 4s²',en:'1,00',ox:'+2',nat:'caliza y mármol (CaCO₃), yeso, huesos',kicker:'ALCALINOTÉRREO',
   punch:'El metal de los huesos y de la cal: casi todo el calcio del planeta está como carbonato.',
   general:`<p>Quinto elemento más abundante de la corteza. Aparece en el material teórico como ejemplo de metal activo que reduce al CO₂ y en la descomposición térmica de los carbonatos (fabricación de la cal).</p>`,
   fis:[['Aspecto','metal plateado, algo blando'],['Densidad','1,55 g/cm³'],['Fusión','842 °C'],['Llama','rojo anaranjado (ladrillo)']],
   quim:rxs(['Ca(s) + 2 H2O(l) -> Ca(OH)2(ac) + H2(g)','moderada en frío'],['2 Ca(s) + CO2(g) =[Δ]=> 2 CaO(s) + C(s)','reduce el CO₂'],['CaCO3(s) =[Δ]=> CaO(s) + CO2(g)','calcinación de la caliza'],['CaO(s) + H2O(l) -> Ca(OH)2(s)','apagado de la cal: muy exotérmico']),
   comp:[['CaCO₃','caliza, mármol, cáscara de huevo'],['CaO','cal viva'],['Ca(OH)₂','cal apagada; su solución es el “agua de cal”, que se enturbia con CO₂ igual que la barita'],['CaH₂','hidruro: secante de solventes']],
   labs:[lab('carbono','qi-c-co2','Ca y Mg reducen el CO₂ (teoría del TP 5)'),lab('carbono','qi-c-carbonatos','Descomposición térmica de carbonatos (teoría del TP 5)')]});

  ficha({sym:'Sr',name:'Estroncio',Z:38,M:'87,62',fam:'at',gp:'2 · 5',cfg:'[Kr] 5s²',en:'0,95',ox:'+2',nat:'celestina (SrSO₄), estroncianita (SrCO₃)',kicker:'ALCALINOTÉRREO',
   punch:'El rojo de los fuegos artificiales.',
   general:`<p>Alcalinotérreo bastante reactivo, parecido al calcio. En el TP aparece sólo en el ensayo a la llama, donde da un rojo intenso.</p>`,
   fis:[['Aspecto','metal plateado-amarillento'],['Densidad','2,64 g/cm³'],['Fusión','777 °C'],['Llama','rojo']],
   quim:rxs(['Sr(s) + 2 H2O(l) -> Sr(OH)2(ac) + H2(g)'],['2 Sr(s) + O2(g) -> 2 SrO(s)']),
   comp:[['SrCl₂','la sal del ensayo a la llama'],['SrCO₃ · Sr(NO₃)₂','colorantes rojos en pirotecnia y bengalas']],
   labs:[lab('tp4','qi-tp4-c1-metales','SrCl₂ a la llama: rojo (TP 4)')]});

  ficha({sym:'Ba',name:'Bario',Z:56,M:'137,3',fam:'at',gp:'2 · 6',cfg:'[Xe] 6s²',en:'0,89',ox:'+2',nat:'baritina (BaSO₄)',kicker:'ALCALINOTÉRREO',
   punch:'El detector de CO₂ del laboratorio: el agua de barita se enturbia con BaCO₃.',
   general:`<p>El más pesado de los alcalinotérreos que usamos. Sus sales solubles (BaCl₂) son <b>tóxicas</b>, pero el BaSO₄ es tan insoluble que se toma como contraste para radiografías. En los TP es el reactivo para reconocer el CO₂ y para separar carbonatos de bicarbonatos.</p>`,
   fis:[['Aspecto','metal plateado, blando'],['Densidad','3,51 g/cm³'],['Fusión','727 °C'],['Llama','verde manzana']],
   quim:rxs(['CO2(g) + Ba(OH)2(ac) -> BaCO3(s)↓ + H2O(l)','turbidez blanca: prueba del CO₂'],['Ba^2+(ac) + CO3^2-(ac) -> BaCO3(s)↓','precipita el carbonato, no el bicarbonato'],['Ba^2+(ac) + SO4^2-(ac) -> BaSO4(s)↓','reconocimiento de sulfatos']),
   comp:[['Ba(OH)₂','“agua de barita”: base fuerte'],['BaCl₂','reactivo de precipitación'],['BaCO₃','precipitado blanco'],['BaSO₄','insoluble incluso en ácidos; contraste radiológico']],
   labs:[lab('tp5','qi-tp5-c1-carbono','Barita para probar el CO₂ del C + CuO (TP 5)'),lab('tp5','qi-tp5-c1-co2','CO₂ en agua y luego barita (TP 5)'),lab('tp5','qi-tp5-c2-carbonatos-n2','BaCl₂ para separar CO₃²⁻ y HCO₃⁻ (TP 5)')]});

  // =====================================================================
  // BLOQUE p
  // =====================================================================
  ficha({sym:'B',name:'Boro',Z:5,M:'10,81',fam:'md',gp:'13 · 2',cfg:'[He] 2s² 2p¹',en:'2,04',ox:'+3',nat:'bórax (Na₂B₄O₇·10H₂O), ácido bórico',kicker:'BLOQUE p',
   punch:'Es del grupo 13 pero se parece al silicio: la relación diagonal.',
   general:`<p>Único no metálico (metaloide) del grupo 13. Su átomo es muy chico y tiene sólo 3 electrones de valencia, así que forma compuestos covalentes con un orbital vacío: por eso el ácido bórico acepta un OH⁻ (ácido de Lewis). Con el oxígeno forma redes –O–B–O– (boratos).</p>`,
   fis:[['Aspecto','sólido negro, muy duro'],['Densidad','2,34 g/cm³'],['Fusión','≈ 2076 °C'],['Conductividad','semiconductor']],
   quim:`<ul class="kitList"><li>Óxido B₂O₃ sólido y <b>ácido</b> (como el SiO₂).</li><li>Ácido bórico muy débil.</li><li>Hidruros gaseosos e inflamables (boranos), como los silanos.</li></ul>${rxs(['B(OH)3(ac) + H2O(l) <=> [B(OH)4]^-(ac) + H^+(ac)','ácido de Lewis'],['Na2B4O7(ac) + 2 HCl(ac) + 5 H2O(l) -> 2 NaCl(ac) + 4 H3BO3(ac)','el bórax neutraliza ácidos'])}`,
   comp:[['Na₂B₄O₇','bórax: neutraliza ácidos, perlas coloreadas, slime'],['H₃BO₃','ácido bórico: antiséptico suave'],['B₂O₃','óxido; con SiO₂ forma el vidrio borosilicato']],
   labHtml:'<p>No tiene ensayo propio en las guías, pero lo usás todo el tiempo: el <b>vidrio pírex</b> de los tubos que van al fuego es vidrio <b>borosilicato</b> (SiO₂ + B₂O₃), que resiste los cambios bruscos de temperatura.</p>',
   labs:[lab('bloque-p','qi-pb-boro','Material teórico del TP 5: boratos y bórax'),lab('bloque-p','qi-pb-diagonal','Material teórico del TP 5: relación diagonal B–Si')]});

  ficha({sym:'Al',name:'Aluminio',Z:13,M:'26,98',fam:'mp',gp:'13 · 3',cfg:'[Ne] 3s² 3p¹',en:'1,61',ox:'+3',nat:'bauxita, arcillas, feldespatos',kicker:'BLOQUE p',
   punch:'El metal más abundante de la corteza y el anfótero estrella: se disuelve en ácidos y en bases.',
   general:`<p>Liviano, buen conductor y muy reductor, pero no se nota en la vida diaria porque se cubre de una capa finísima de <b>Al₂O₃</b> que lo protege (por eso una olla no reacciona con el agua). Es <b>anfótero</b>: su hidróxido se disuelve en ácidos y en bases.</p>`,
   fis:[['Aspecto','metal plateado, liviano'],['Densidad','2,70 g/cm³'],['Fusión','660 °C'],['Conductividad','muy buena (eléctrica y térmica)']],
   quim:rxs(['2 Al(s) + 6 HCl(ac) -> 2 AlCl3(ac) + 3 H2(g)','con ácidos'],['2 Al(s) + 2 NaOH(ac) + 6 H2O(l) -> 2 Na[Al(OH)4](ac) + 3 H2(g)','con bases'],['Al(OH)3(s) + NaOH(ac) -> Na[Al(OH)4](ac)','anfoterismo'],['2 Al(s) + Fe2O3(s) =[Δ]=> Al2O3(s) + 2 Fe(l)','aluminotermia: soldadura de rieles'])+'<p>Con HNO₃ concentrado se <b>pasiva</b>. Con NH₃ precipita Al(OH)₃ blanco que <b>no</b> se redisuelve en exceso.</p>',
   obt:'<p>Por electrólisis de la alúmina (Al₂O₃) extraída de la bauxita, disuelta en criolita fundida (proceso Hall–Héroult). Reciclar aluminio ahorra ≈ 95 % de esa energía.</p>',
   comp:[['Al₂O₃','alúmina: capa protectora, corindón, rubí y zafiro'],['Al(OH)₃','hidróxido anfótero, blanco gelatinoso'],['AlCl₃','sal del cuestionario'],['Na[Al(OH)₄]','tetrahidroxoaluminato']],
   labs:[lab('tp4','qi-tp4-c2-metales','Al con NaOH 6 M (TP 4)'),lab('tp5','qi-tp5-cuestionario','AlCl₃ con NH₃ y HCl (pregunta 5 del cuestionario)')]});

  ficha({sym:'Si',name:'Silicio',Z:14,M:'28,09',fam:'md',gp:'14 · 3',cfg:'[Ne] 3s² 3p²',en:'1,90',ox:'+4 (−4 en siliciuros)',nat:'≈ 28 % de la corteza: arena, cuarzo, silicatos',kicker:'BLOQUE p',
   punch:'El segundo elemento más abundante de la corteza: está en la arena, las rocas, el vidrio y los chips.',
   general:`<p>Metaloide semiconductor: la base de la electrónica. Con el oxígeno forma enlaces Si–O fortísimos y redes de tetraedros SiO₄: el cuarzo y todos los silicatos. Todo el material de vidrio del laboratorio es, básicamente, SiO₂.</p>`,
   fis:[['Aspecto','sólido gris con brillo metálico'],['Densidad','2,33 g/cm³'],['Fusión','1414 °C'],['Conductividad','semiconductor']],
   quim:`<ul class="kitList"><li>SiO₂ es un óxido <b>ácido</b> sólido y un sólido covalente (no hay moléculas).</li><li>Lo ataca el HF (por eso el HF graba el vidrio) y las bases fuertes concentradas.</li></ul>${rxs(['SiO2(s) + 2 NaOH(l) =[Δ]=> Na2SiO3(s) + H2O(g)','vidrio líquido'],['SiO2(s) + 4 HF(ac) -> SiF4(g) + 2 H2O(l)','grabado del vidrio'])}`,
   obt:rx('SiO2(s) + 2 C(s) =[horno eléctrico]=> Si(l) + 2 CO(g)','otra vez el carbono como reductor'),
   comp:[['SiO₂','sílice: arena, cuarzo, vidrio'],['Silicatos','neso-, soro-, ciclo-, ino- y tectosilicatos'],['Na₂SiO₃','metasilicato: “vidrio líquido”, jardín químico']],
   labHtml:'<p>No hay ensayo propio en las guías: está en la teoría del TP 5 (sílice, silicatos y vidrio líquido).</p>',
   labs:[lab('bloque-p','qi-pb-silicio','Material teórico del TP 5: sílice y silicatos')]});

  ficha({sym:'Sn',name:'Estaño',Z:50,M:'118,7',fam:'mp',gp:'14 · 5',cfg:'[Kr] 4d¹⁰ 5s² 5p²',en:'1,96',ox:'+2 · +4',nat:'casiterita (SnO₂); Bolivia es gran productor',kicker:'BLOQUE p',
   punch:'Metal anfótero de los carbonoides: reacciona con ácidos y con bases liberando H₂.',
   general:`<p>Metal blando y de bajo punto de fusión. Se usa para recubrir el hierro (hojalata de las latas), en la soldadura y aleado con cobre forma el <b>bronce</b>. Por debajo de 13 °C el estaño blanco se transforma lentamente en estaño gris, quebradizo (“peste del estaño”).</p>`,
   fis:[['Aspecto','plateado, blando, maleable'],['Densidad','7,29 g/cm³'],['Fusión','232 °C'],['Particularidad','al doblarlo “cruje” (grito del estaño)']],
   quim:rxs(['Sn(s) + 2 HCl(ac) -> SnCl2(ac) + H2(g)'],['Sn(s) + 2 NaOH(ac) -> Na2SnO2(ac) + H2(g)','estannito'],['Sn(OH)2(s) + 2 NaOH(ac) -> Na2[Sn(OH)4](ac)','anfótero'])+'<p>Con HNO₃ concentrado no da nitrato sino óxido, SnO₂. El Sn²⁺ es un buen <b>reductor</b> (tiende a pasar a Sn⁴⁺).</p>',
   comp:[['SnCl₂','cloruro estannoso: reductor'],['SnO₂','casiterita'],['Bronce','aleación Cu–Sn']],
   labHtml:'<p>No tiene ensayo en las guías: aparece en la teoría de anfoterismo del TP 5.</p>',
   labs:[lab('bloque-p','qi-pb-al-sn-pb','Material teórico del TP 5: Al, Sn y Pb anfóteros')]});

  ficha({sym:'Pb',name:'Plomo',Z:82,M:'207,2',fam:'mp',gp:'14 · 6',cfg:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',en:'2,33',ox:'+2 (el estable) · +4 (oxidante)',nat:'galena (PbS)',kicker:'BLOQUE p',
   punch:'El ejemplo clásico del par inerte: prefiere +2, y el Pb(IV) es oxidante.',
   general:`<p>Metal muy denso, blando y <b>tóxico</b> (se acumula en el organismo; por eso se retiró de las naftas y las pinturas). Se usa en las baterías de los autos y como blindaje contra rayos X. Por el efecto del par inerte, sus electrones 6s² cuesta sacarlos.</p>`,
   fis:[['Aspecto','gris azulado, blando'],['Densidad','11,3 g/cm³'],['Fusión','327 °C'],['Toxicidad','alta: no manipular sin cuidado']],
   quim:rxs(['3 Pb(s) + 8 HNO3(d) -> 3 Pb(NO3)2(ac) + 2 NO(g) + 4 H2O(l)','se disuelve en HNO₃'],['Pb(s) + 2 NaOH(ac) -> Na2PbO2(ac) + H2(g)','anfótero'],['Pb^2+(ac) + 2 I^-(ac) -> PbI2(s)↓','precipitado amarillo'])+'<p>Con HCl o H₂SO₄ casi no se disuelve: se forma una capa de PbCl₂ o PbSO₄ poco solubles.</p>',
   comp:[['Pb(NO₃)₂','nitrato soluble (usado en el TP 5)'],['PbI₂','ioduro plumboso: amarillo intenso'],['PbO₂','óxido de plomo(IV): oxidante, placa de la batería'],['PbSO₄ · PbCl₂','poco solubles']],
   labs:[lab('tp5','qi-tp5-c2-adsorcion','Adsorción de Pb²⁺ con carbón activado; PbI₂ amarillo (TP 5)')]});

  // =====================================================================
  // ELEMENTOS DE REPARTO
  // =====================================================================
  ficha({sym:'S',name:'Azufre',Z:16,M:'32,06',fam:'nm',gp:'16 · 3',cfg:'[Ne] 3s² 3p⁴',en:'2,58',ox:'−2 · +4 · +6',nat:'volcanes, yacimientos, sulfuros, sulfatos',kicker:'DE REPARTO',
   punch:'Sólido amarillo que arde con llama azul y da un óxido ácido.',
   general:`<p>No metal del grupo del oxígeno. Forma anillos S₈. Su compuesto estrella es el <b>ácido sulfúrico</b>, el reactivo industrial más fabricado del mundo y presente en casi todos los ensayos.</p>`,
   fis:[['Aspecto','sólido amarillo, quebradizo'],['Fusión','115 °C'],['Solubilidad','insoluble en agua']],
   quim:rxs(['S(s) + O2(g) -> SO2(g)','llama azul'],['SO2(g) + H2O(l) <=> H2SO3(ac)','óxido ácido'],['S(s) + 6 HNO3(c) -> H2SO4(ac) + 6 NO2(g) + 2 H2O(l)','lo oxida el HNO₃']),
   comp:[['H₂SO₄','ácido fuerte; concentrado, deshidratante y poco volátil'],['SO₂','gas sofocante, óxido ácido'],['H₂S','olor a huevo podrido'],['Sulfatos','CuSO₄, FeSO₄, BaSO₄']],
   labs:[lab('tp4','qi-tp4-c1-oxigeno','Azufre ardiendo en O₂ (TP 4)'),lab('tp5','qi-tp5-c1-hno3','H₂SO₄ concentrado para obtener HNO₃ (TP 5)')]});

  ficha({sym:'Cl',name:'Cloro',Z:17,M:'35,45',fam:'nm',gp:'17 · 3',cfg:'[Ne] 3s² 3p⁵',en:'3,16',ox:'−1 (y +1 a +7)',nat:'NaCl del mar y salinas',kicker:'DE REPARTO',
   punch:'En los TP casi siempre aparece como Cl⁻: en el HCl, en los cloruros y como ligando.',
   general:`<p>Halógeno: le falta un electrón para completar su capa, así que tiende a formar Cl⁻. El Cl₂ es un gas amarillo verdoso, tóxico, usado para potabilizar el agua (lavandina = hipoclorito).</p>`,
   fis:[['Cl₂','gas amarillo verdoso, olor irritante'],['Ebullición','−34 °C'],['HCl','gas muy soluble; su solución es el ácido clorhídrico']],
   quim:rxs(['Ag^+(ac) + Cl^-(ac) -> AgCl(s)↓','precipitado blanco'],['Cu^2+(ac) + 4 Cl^-(ac) -> [CuCl4]^2-(ac)','Cl⁻ como ligando'],['NH3(g) + HCl(g) -> NH4Cl(s)','humo blanco']),
   comp:[['HCl','ácido fuerte no oxidante: libera H₂ con metales activos'],['NaCl, KCl, LiCl, SrCl₂','sales de los ensayos a la llama'],['NH₄Cl','fuente de NH₃ y de N₂'],['AgCl','insoluble, blanco']],
   labs:[lab('tp4','qi-tp4-c1-hidrogeno','HCl con Zn (TP 4)'),lab('tp4','qi-tp4-c2-oxigeno-agua','CuSO₄ en HCl concentrado (TP 4)'),lab('tp5','qi-tp5-c1-nh3','Humo blanco de NH₄Cl (TP 5)')]});

  ficha({sym:'I',name:'Iodo',Z:53,M:'126,9',fam:'nm',gp:'17 · 5',cfg:'[Kr] 4d¹⁰ 5s² 5p⁵',en:'2,66',ox:'−1 · 0 (y +5)',nat:'algas, salitres, sal yodada',kicker:'DE REPARTO',
   punch:'El I⁻ es el reductor “testigo”: cuando se oxida aparece el I₂, pardo en agua y violeta en cloroformo.',
   general:`<p>Halógeno sólido: forma cristales violeta-negros que subliman con vapores violetas. Es esencial para la tiroides (por eso la sal es yodada). En los TP se usa el KI como reductor para demostrar que algo es <b>oxidante</b>.</p>`,
   fis:[['I₂','sólido violeta-negro; sublima'],['En agua','poco soluble: pardo amarillento'],['En CHCl₃ o CCl₄','muy soluble: violeta']],
   quim:rxs(['2 I^- -> I2 + 2 e^-','reductor'],['4 I^- + O2 + 4 H^+ -> 2 I2 + 2 H2O','con O₂'],['H2O2 + 2 I^- + 2 H^+ -> I2 + 2 H2O','con agua oxigenada'],['Pb^2+ + 2 I^- -> PbI2(s)↓','amarillo']),
   comp:[['KI','ioduro de potasio'],['I₂','yodo'],['PbI₂','precipitado amarillo']],
   labs:[lab('tp4','qi-tp4-c1-oxigeno','KI + O₂ y extracción con cloroformo (TP 4)'),lab('tp4','qi-tp4-c2-oxigeno-agua','KI + H₂O₂ (TP 4)'),lab('tp5','qi-tp5-c2-adsorcion','KI para detectar Pb²⁺ (TP 5)')]});

  ficha({sym:'Mn',name:'Manganeso',Z:25,M:'54,94',fam:'tr',gp:'7 · 4',cfg:'[Ar] 3d⁵ 4s²',en:'1,55',ox:'+2 · +4 · +6 · +7',nat:'pirolusita (MnO₂)',kicker:'DE REPARTO',
   punch:'El camaleón: su color dice en qué estado de oxidación está.',
   general:`<p>Metal de transición con muchísimos estados de oxidación. En los TP no se usa el metal sino sus compuestos: el permanganato como oxidante y el MnO₂ como catalizador.</p>`,
   fis:[['MnO₄⁻ (+7)',swatch('#7b2a9e','violeta intenso')],['MnO₄²⁻ (+6)',swatch('#2f8a4a','verde')],['MnO₂ (+4)',swatch('#4a3324','pardo-negro, sólido')],['Mn²⁺ (+2)',swatch('#f6dfe6','rosado pálido, casi incoloro')]],
   quim:rxs(['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','medio ácido: hasta Mn²⁺'],['MnO4^- + 2 H2O + 3 e^- -> MnO2 + 4 OH^-','medio neutro o básico: hasta MnO₂'],['2 KMnO4(s) =[Δ]=> K2MnO4(s) + MnO2(s) + O2(g)','descomposición']),
   comp:[['KMnO₄','oxidante fuerte'],['MnO₂','catalizador de la descomposición del KClO₃ y del H₂O₂'],['MnSO₄','sal del cuestionario: Mn(OH)₂ blanco con NH₃']],
   labs:[lab('tp4','qi-tp4-c2-oxigeno-agua','KMnO₄ calentado y con H₂O₂; MnO₂ catalizador (TP 4)'),lab('tp5','qi-tp5-c2-nh3','KMnO₄ oxida al NH₃ (TP 5)')]});

  ficha({sym:'Fe',name:'Hierro',Z:26,M:'55,85',fam:'tr',gp:'8 · 4',cfg:'[Ar] 3d⁶ 4s²',en:'1,83',ox:'+2 (ferroso) · +3 (férrico)',nat:'hematita (Fe₂O₃), magnetita (Fe₃O₄)',kicker:'DE REPARTO',
   punch:'Con ácidos comunes llega a Fe²⁺; para llegar a Fe³⁺ hace falta un oxidante fuerte (O₂, HNO₃).',
   general:`<p>El metal más usado por la humanidad (acero = hierro + carbono). En solución, el Fe²⁺ es verde pálido y el Fe³⁺ amarillo; el Fe³⁺ hidroliza y da soluciones ácidas.</p>`,
   fis:[['Aspecto','gris, magnético'],['Densidad','7,87 g/cm³'],['Fusión','1538 °C'],['Fe²⁺ · Fe³⁺',swatch('#cfe3b5','verde pálido')+' · '+swatch('#e9c33d','amarillo')]],
   quim:rxs(['Fe(s) + 2 HCl(ac) -> FeCl2(ac) + H2(g)'],['3 Fe(s) + 2 O2(g) -> Fe3O4(s)','arde en O₂'],['Fe^3+ + SCN^- -> [Fe(SCN)]^2+','rojo sangre'],['Fe^3+ + 3 H2O <=> Fe(OH)3 + 3 H^+','hidrólisis'],['Fe(s) + 6 HNO3(c) -> Fe(NO3)3(ac) + 3 NO2(g) + 3 H2O(l)']),
   comp:[['FeSO₄','sulfato ferroso'],['FeCl₃','cloruro férrico: hidroliza'],['Fe(OH)₃','pardo rojizo'],['Fe₃O₄','óxido magnético']],
   labs:[lab('tp4','qi-tp4-c1-oxigeno','Fe en O₂ y Fe²⁺ oxidado por O₂ (TP 4)'),lab('tp4','qi-tp4-c2-metales','Fe con HCl y H₂SO₄ (TP 4)'),lab('tp4','qi-tp4-c2-oxigeno-agua','Hidrólisis del FeCl₃ (TP 4)'),lab('tp5','qi-tp5-c2-nh3','FeCl₃ con NH₃ (TP 5)')]});

  ficha({sym:'Ni',name:'Níquel',Z:28,M:'58,69',fam:'tr',gp:'10 · 4',cfg:'[Ar] 3d⁸ 4s²',en:'1,91',ox:'+2',nat:'pentlandita, meteoritos',kicker:'DE REPARTO',
   punch:'Verde en agua, azul violáceo con exceso de amoníaco.',
   general:`<p>Metal resistente a la corrosión (acero inoxidable, monedas, niquelado). En el TP se usan sus sales para ver al NH₃ como ligando.</p>`,
   fis:[['Metal','plateado, magnético'],['Ni²⁺',swatch('#5ea85c','verde')],['[Ni(NH₃)₆]²⁺',swatch('#6f74d6','azul violáceo')]],
   quim:rxs(['Ni^2+ + 2 NH3 + 2 H2O -> Ni(OH)2(s)↓ + 2 NH4^+','precipitado verde'],['Ni(OH)2(s) + 6 NH3 -> [Ni(NH3)6]^2+ + 2 OH^-','hexaamminníquel(II)']),
   labs:[lab('tp5','qi-tp5-c2-nh3','NiCl₂/NiSO₄ con NH₃ (TP 5)')]});

  ficha({sym:'Cu',name:'Cobre',Z:29,M:'63,55',fam:'tr',gp:'11 · 4',cfg:'[Ar] 3d¹⁰ 4s¹',en:'1,90',ox:'+1 · +2',nat:'calcopirita, cobre nativo',kicker:'DE REPARTO',
   punch:'El HCl no lo ataca, el HNO₃ sí. Y sus colores (celeste, azul intenso, verde, blanco) son una clase entera.',
   general:`<p>Metal rojizo, excelente conductor (cables). Es <b>menos reductor que el hidrógeno</b>: no libera H₂ con ácidos comunes. Sus compuestos de Cu²⁺ son de colores muy característicos.</p>`,
   fis:[['Metal','rojizo, dúctil, muy buen conductor'],['Densidad','8,96 g/cm³'],['CuSO₄·5H₂O · CuSO₄',swatch('#2f7fd8','azul')+' · '+swatch('#f4f4f4','blanco')],['[Cu(NH₃)₄]²⁺',swatch('#1f4fd1','azul intenso')]],
   quim:rxs(['Cu(s) + 4 HNO3(c) -> Cu(NO3)2(ac) + 2 NO2(g) + 2 H2O(l)'],['2 CuO(s) + C(s) =[Δ]=> 2 Cu(s) + CO2(g)','el carbono lo reduce'],['Cu(OH)2(s) + 4 NH3 -> [Cu(NH3)4]^2+ + 2 OH^-'],['[CuCl4]^2- + 6 H2O <=> [Cu(H2O)6]^2+ + 4 Cl^-','verde ⇌ celeste']),
   comp:[['CuSO₄·5H₂O','sulfato cúprico pentahidratado'],['CuO','óxido cúprico, negro'],['Cu(OH)₂','precipitado celeste']],
   labs:[lab('tp4','qi-tp4-c2-oxigeno-agua','Hidrato y acuocomplejos del CuSO₄ (TP 4)'),lab('tp5','qi-tp5-c1-carbono','CuO reducido por carbono (TP 5)'),lab('tp5','qi-tp5-c2-nh3','CuSO₄ con NH₃ (TP 5)'),lab('tp5','qi-tp5-c2-hno3','Cu con HNO₃ concentrado (TP 5)')]});

  ficha({sym:'Zn',name:'Zinc',Z:30,M:'65,38',fam:'tr',gp:'12 · 4',cfg:'[Ar] 3d¹⁰ 4s²',en:'1,65',ox:'+2',nat:'blenda (ZnS)',kicker:'DE REPARTO',
   punch:'El metal “obrero” del TP: con HCl da H₂, con HNO₃ da NO₂ o NH₄⁺.',
   general:`<p>Metal gris azulado, más reductor que el hidrógeno. Se usa para galvanizar el hierro (protegerlo de la corrosión) y en pilas. Su hidróxido es anfótero y forma complejos con NH₃ (incoloros).</p>`,
   fis:[['Aspecto','gris azulado (granallas)'],['Densidad','7,14 g/cm³'],['Fusión','420 °C'],['Zn²⁺','incoloro']],
   quim:rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)'],['Zn(s) + 4 HNO3(c) -> Zn(NO3)2(ac) + 2 NO2(g) + 2 H2O(l)'],['4 Zn(s) + 10 HNO3(d) -> 4 Zn(NO3)2(ac) + NH4NO3(ac) + 3 H2O(l)'],['Zn(OH)2(s) + 2 NaOH(ac) -> Na2[Zn(OH)4](ac)','anfótero']),
   labs:[lab('tp4','qi-tp4-c1-hidrogeno','Granallas de Zn + HCl para el H₂ (TP 4)'),lab('tp5','qi-tp5-c2-hno3','Zn con HNO₃ concentrado (TP 5)')]});

  ficha({sym:'Ag',name:'Plata',Z:47,M:'107,9',fam:'tr',gp:'11 · 5',cfg:'[Kr] 4d¹⁰ 5s¹',en:'1,93',ox:'+1',nat:'argentita (Ag₂S), plata nativa',kicker:'DE REPARTO',
   punch:'Ag⁺ + Cl⁻ → AgCl blanco; con amoníaco se disuelve como [Ag(NH₃)₂]⁺.',
   general:`<p>El mejor conductor eléctrico de todos los metales (y el nombre de nuestro país viene de ella). En el laboratorio se usa como AgNO₃; sus compuestos se oscurecen con la luz (fotografía).</p>`,
   fis:[['Metal','blanco brillante'],['Densidad','10,5 g/cm³'],['Ag₂O',swatch('#5a3a22','pardo')],['AgCl',swatch('#f4f4f4','blanco')]],
   quim:rxs(['2 AgNO3 + 2 NH3 + H2O -> Ag2O(s)↓ + 2 NH4NO3','pardo'],['Ag2O + H2O + 4 NH3 -> 2 [Ag(NH3)2]^+ + 2 OH^-','diamminplata(I)'],['[Ag(NH3)2]^+ + 2 HCl -> AgCl(s)↓ + 2 NH4^+ + Cl^-'],['2 Ag2O(s) + C(s) =[Δ]=> 4 Ag(s) + CO2(g)']),
   labs:[lab('tp4','qi-tp4-c2-metales','NaH en AgNO₃: precipitado oscuro (TP 4)'),lab('tp5','qi-tp5-cuestionario','AgNO₃ con NH₃ y HCl (pregunta 5 del cuestionario)')]});

  // =====================================================================
  // MAPA INICIAL Y REPASO
  // =====================================================================
  const groups=[['Protagonistas',['H','O','C','N']],['Metales alcalinos',['Li','Na','K']],['Alcalinotérreos',['Mg','Ca','Sr','Ba']],['Bloque p',['B','Al','Si','Sn','Pb']],['De reparto (reactivos de los TP)',['S','Cl','I','Mn','Fe','Ni','Cu','Zn','Ag']]];
  const bySym=Object.fromEntries(sections.map(s=>[s.el.sym,s]));
  const chip=sym=>{const s=bySym[sym],e=s.el;return `<button type="button" class="qiElChip" style="--fam:${FAM[e.fam][1]}" data-scroll="${s.key}"><small>${e.Z}</small><b>${e.sym}</b><span>${e.name}</span></button>`};
  const mapa=`<p>Todos los elementos que aparecen en los TP 4 y 5, cada uno con su ficha: datos de la tabla, propiedades físicas y químicas, cómo se obtiene, sus compuestos importantes y <b>qué hicimos con él en el laboratorio</b>. Tocá un casillero para ir a su ficha.</p>
${groups.map(([t,list])=>`<h3>${t}</h3><div class="qiElGrid">${list.map(chip).join('')}</div>`).join('')}
<div class="qiLegend">${Object.values(FAM).map(([n,c])=>`<span><i style="background:${c}"></i>${n}</span>`).join('')}</div>
${idea('Cómo usar las fichas en clase','<p>Para cada elemento, el recorrido es siempre el mismo: <b>dónde está en la tabla → cómo es → qué hace → cómo se obtiene → qué compuestos importan → qué vimos en el TP</b>. Al final hay un repaso para jugar a “¿quién es quién?”.</p>')}`;
  sections.unshift({key:'qi-el-mapa',label:'Mapa de elementos',kicker:'ELEMENTOS · MAPA',html:mapa});

  sections.push({key:'qi-el-repaso',label:'Repaso: ¿quién es quién?',kicker:'ELEMENTOS · REPASO',html:cards([
   ['Adiviná','Gas más liviano que todos; su ensayo es un “ladrido”.','Hidrógeno (H₂).'],
   ['Adiviná','Reaviva una astilla en punto de ignición.','Oxígeno (O₂).'],
   ['Adiviná','Sus alótropos son uno conductor y blando y otro aislante y durísimo.','Carbono (grafito y diamante).'],
   ['Adiviná','Es el 78 % del aire y tiene estados de oxidación de −3 a +5.','Nitrógeno.'],
   ['Adiviná','Llama rojo carmín; el metal menos denso.','Litio.'],
   ['Adiviná','Llama amarilla intensa; se guarda bajo kerosene.','Sodio.'],
   ['Adiviná','Llama lila; en el TP aparece en KClO₃, KMnO₄ y KI.','Potasio.'],
   ['Adiviná','Luz blanca al arder y sigue ardiendo en CO₂.','Magnesio.'],
   ['Adiviná','Llama roja de los fuegos artificiales.','Estroncio.'],
   ['Adiviná','Su hidróxido enturbia con CO₂: el “agua de…”','Bario (agua de barita).'],
   ['Adiviná','Metal anfótero que se disuelve en NaOH y se pasiva con HNO₃ concentrado.','Aluminio.'],
   ['Adiviná','Grupo 13, pero se parece al silicio.','Boro.'],
   ['Adiviná','Prefiere +2 por el par inerte; su ioduro es amarillo.','Plomo.'],
   ['Adiviná','Su catión forma un complejo azul intenso con NH₃ y no reacciona con HCl.','Cobre.'],
   ['Adiviná','Violeta como +7, pardo como +4, casi incoloro como +2.','Manganeso.'],
   ['Adiviná','Con KSCN da rojo sangre.','Hierro (como Fe³⁺).']
  ])});

  window.ET27_QI4.units.push({id:'elementos',part:'elementos',n:1,title:'Fichas de elementos',short:'Fichas de elementos',lead:'Cada elemento de los TP 4 y 5 en una ficha: datos de tabla, propiedades físicas y químicas, obtención, compuestos importantes y lo que aprendimos con él en el laboratorio.',sections});
})();
