// 27xSOLved · Química Inorgánica 4.º · TP anteriores (material parcial)
// Armados con los resúmenes y evaluaciones que circulan. Falta la guía de laboratorio de cada uno:
// se marcan como parciales hasta tenerla.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {chain,idea,warn,fix,note,step,table,cards,example}=K;
  const {rx,rxs,f,vira,swatch,punch,facts}=Q;
  const pend=(que)=>`<div class="kitBox kitWarn"><b>⏳ TP todavía no dado · material parcial</b><p>Esto se armó con ${que}. Falta la <b>guía de laboratorio</b> del TP: cuando la tengamos se agregan los ensayos uno por uno, igual que en los TP 4 y 5.</p></div>`;

  // =====================================================================
  // TP 1 · REACCIONES QUÍMICAS
  // =====================================================================
  const s1=[];const a1=(k,l,kk,h)=>s1.push({key:`qi-tp1-${k}`,label:l,kicker:kk,html:h});
  a1('intro','Transformaciones y ecuaciones','TP 1 · 01',`
${pend('un resumen de la cursada sobre reacciones químicas (el número de TP es probable, por el orden del programa)')}
<h3>Transformación física o química</h3>
${table(['','Física','Química'],[['Qué cambia','el estado o la forma','la sustancia: se forman sustancias nuevas'],['Ejemplo','hielo → agua líquida','hierro + oxígeno → óxido de hierro'],['¿Se puede escribir una ecuación?','no hace falta','sí: reactivos → productos']])}
<h3>La ecuación química</h3>
${rx('2 Mg(s) + O2(g) -> 2 MgO(s)','reactivos a la izquierda, productos a la derecha')}
${facts([['(s)','sólido'],['(l)','líquido'],['(g)','gas'],['(ac)','disuelto en agua']])}
${note('Detalle','<p>En los apuntes aparece a veces “(aq)” (del inglés <i>aqueous</i>): es lo mismo que “(ac)”. Conviene usar una sola notación en todo el informe.</p>')}
<h3>Qué anotar en cada ensayo</h3>
<ol class="kitList"><li><b>Lo que se ve</b>: cambio de color, precipitado, efervescencia, calor.</li><li><b>Interpretación química</b>: qué pasó.</li><li><b>Ecuación balanceada</b>.</li><li>Todo con <b>lenguaje técnico</b> (precipitado, efervescencia, viraje…).</li></ol>
`);
  a1('clasificacion','Clasificación de las reacciones','TP 1 · 02',`
<h3>Según la energía</h3>
${table(['Tipo','Qué pasa','Ejemplo'],[['Exotérmica','libera calor (el tubo se calienta)','combustiones, CaO + H₂O'],['Endotérmica','absorbe calor (el tubo se enfría)','disolver NH₄NO₃ en agua; descomponer CaCO₃']])}
<h3>Según el tipo de proceso</h3>
${table(['Tipo','Esquema','Ejemplo'],[
 ['A. Combinación (síntesis)','A + B → AB',rxs(['2 Mg(s) + O2(g) -> 2 MgO(s)','sustancia simple + O₂ → óxido'],['H2(g) + Cl2(g) -> 2 HCl(g)','con H₂ → hidruro'],['2 Na(s) + Cl2(g) -> 2 NaCl(s)','metal + no metal → sal binaria'],['CaO(s) + H2O(l) -> Ca(OH)2(ac)','óxido básico + agua → hidróxido'],['SO3(g) + H2O(l) -> H2SO4(ac)','óxido ácido + agua → oxoácido'])],
 ['B. Descomposición','AB → A + B',rxs(['2 H2O2(ac) -> 2 H2O(l) + O2(g)'],['CaCO3(s) =[Δ]=> CaO(s) + CO2(g)'])],
 ['C. Desplazamiento simple','A + BC → AC + B',rx('Zn(s) + CuSO4(ac) -> ZnSO4(ac) + Cu(s)','el metal más activo desplaza al otro')],
 ['C. Doble desplazamiento','AB + CD → AD + CB',rx('AgNO3(ac) + NaCl(ac) -> AgCl(s)↓ + NaNO3(ac)')],
 ['D. Ácido-base (neutralización)','ácido + base → sal + agua',rx('HCl(ac) + NaOH(ac) -> NaCl(ac) + H2O(l)')],
 ['E. Precipitación','dos soluciones → sólido',rx('BaCl2(ac) + Na2SO4(ac) -> BaSO4(s)↓ + 2 NaCl(ac)')],
 ['F. Formación de complejos','catión + ligandos → complejo',rx('Cu^2+(ac) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac)')],
 ['G. Redox','transferencia de electrones',rx('Zn(s) + Cu^2+(ac) -> Zn^2+(ac) + Cu(s)')]
])}
${idea('Una reacción puede tener dos etiquetas','<p>Zn + CuSO₄ es desplazamiento <b>y</b> redox; AgNO₃ + NaCl es doble desplazamiento <b>y</b> precipitación. La clasificación depende de qué se quiere destacar.</p>')}
<h3>La tabla de una redox</h3>
${table(['Especie','N.o. inicial','N.o. final','¿Qué le pasa?','Agente'],[['Zn','0','+2','se oxida (pierde 2 e⁻)','reductor'],['Cu²⁺','+2','0','se reduce (gana 2 e⁻)','oxidante']])}
`);
  a1('electrolitos','Electrolitos, ionización y flechas','TP 1 · 03',`
${table(['Tipo','En agua…','Cómo se escribe','Ejemplo'],[
 ['No electrolito','no forma iones; no conduce','no se escribe disociación','glucosa, sacarosa, etanol'],
 ['Electrolito débil','se disocia parcialmente','doble flecha ⇌',rx('CH3COOH(ac) <=> CH3COO^-(ac) + H^+(ac)')],
 ['Electrolito fuerte','se disocia completamente','flecha simple →',rx('HCl(ac) -> H^+(ac) + Cl^-(ac)')]
])}
<h3>Ionización</h3>
<p>Una sustancia <b>molecular</b> (no iónica) forma iones al reaccionar con el agua:</p>
${rx('HCl(g) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','ion hidronio')}
${note('Disociación vs. ionización','<p><b>Disociación</b>: un compuesto iónico (NaCl) que ya tenía iones los separa. <b>Ionización</b>: una molécula (HCl) que no tenía iones los forma al reaccionar con el agua.</p>')}
<div data-qi-guide></div>
`);
  const ex1=[{n:'R1',title:'Clasificar reacciones',statement:'Clasificá cada reacción (puede tener más de un tipo): a) Fe + CuSO₄ → FeSO₄ + Cu · b) 2 KClO₃ → 2 KCl + 3 O₂ · c) Pb(NO₃)₂ + 2 KI → PbI₂ + 2 KNO₃ · d) H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O · e) CO₂ + H₂O → H₂CO₃ · f) Cu(OH)₂ + 4 NH₃ → [Cu(NH₃)₄]²⁺ + 2 OH⁻',
   solution:table(['','Reacción','Tipo'],[['a','Fe + CuSO₄ → FeSO₄ + Cu','desplazamiento simple + redox (Fe 0 → +2; Cu +2 → 0)'],['b','2 KClO₃ → 2 KCl + 3 O₂','descomposición + redox (Cl +5 → −1; O −2 → 0)'],['c','Pb(NO₃)₂ + 2 KI → PbI₂↓ + 2 KNO₃','doble desplazamiento + precipitación'],['d','H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O','ácido-base (neutralización)'],['e','CO₂ + H₂O → H₂CO₃','combinación (óxido ácido + agua → oxoácido)'],['f','Cu(OH)₂ + 4 NH₃ → [Cu(NH₃)₄]²⁺ + 2 OH⁻','formación de complejo']]),
   answer:'a desplazamiento/redox · b descomposición/redox · c precipitación · d neutralización · e combinación · f complejo'}];
  window.ET27_QI4.units.push({id:'tp1',part:'tp',kind:'tp',n:1,pending:true,title:'TP 1 · Reacciones químicas',short:'Reacciones químicas',lead:'Transformaciones físicas y químicas, ecuaciones, clasificación de reacciones, electrolitos e ionización. Material parcial: falta la guía de laboratorio.',sections:s1,exercises:ex1});

  // =====================================================================
  // TP 2 · COMPLEJOS
  // =====================================================================
  const s2=[];const a2=(k,l,kk,h)=>s2.push({key:`qi-tp2-${k}`,label:l,kicker:kk,html:h});
  a2('que-es','¿Qué es un complejo?','TP 2 · 01',`
${pend('el resumen “TP N.º 2: Complejos — TPE Inorgánica 4.º año”')}
<p>Un <b>complejo</b> (o compuesto de coordinación) es un <b>ion metálico central</b> rodeado por <b>ligandos</b>: moléculas o iones que le “prestan” un par de electrones libre. El metal es el <b>ácido de Lewis</b> (acepta pares) y el ligando la <b>base de Lewis</b> (los dona).</p>
${rx('Cu^2+(ac) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac)','H₃N: → Cu²⁺')}
${table(['Concepto','Qué significa'],[['Ion central','casi siempre un catión de metal de transición'],['Ligando','dona un par de electrones no compartido'],['Número de coordinación','cuántos enlaces forma el ion central con ligandos (habitualmente 4 o 6)'],['Geometría','tetraédrica o cuadrado plana (4) · octaédrica (6)'],['Corchetes','encierran el ion complejo; la carga va afuera']])}
${idea('La carga del complejo','<p>Se suman la carga del metal y la de los ligandos: [Fe(CN)₆]: Fe³⁺ + 6 CN⁻ → +3 − 6 = <b>−3</b>. [Cu(NH₃)₄]: Cu²⁺ + 4 NH₃ (neutro) → <b>+2</b>.</p>')}
<h3>Cationes que suelen formar complejos</h3>
<p>Fe³⁺, Fe²⁺, Cu²⁺, Cu⁺, Co²⁺, Co³⁺, Ni²⁺, Zn²⁺, Ag⁺, Cr³⁺, Mn²⁺ (y también Al³⁺, Pb²⁺, Sn²⁺ con OH⁻).</p>
`);
  a2('nomenclatura','Ligandos y nomenclatura','TP 2 · 02',`
${table(['Ligando','Fórmula','Nombre en el complejo'],[['agua','H₂O','acuo (aqua)'],['amoníaco','NH₃','ammin (en clase: amin)'],['cloruro','Cl⁻','cloro'],['fluoruro','F⁻','fluoro'],['bromuro','Br⁻','bromo'],['ioduro','I⁻','yodo'],['cianuro','CN⁻','ciano'],['hidróxido','OH⁻','hidroxo'],['oxalato','C₂O₄²⁻','oxalato'],['sulfato','SO₄²⁻','sulfato'],['tiosulfato','S₂O₃²⁻','tiosulfato'],['tiocianato (sulfocianuro)','SCN⁻','tiocianato']])}
<h3>Reglas para nombrar</h3>
<ol class="kitList"><li><b>Ligandos</b> con prefijo de cantidad (di, tri, tetra, penta, hexa), en orden <b>alfabético</b> (sin contar el prefijo).</li><li>Después el <b>metal</b> con su número de oxidación en números romanos.</li><li>Si el complejo es un <b>anión</b>, el metal termina en <b>-ato</b> (ferrato, cuprato, argentato, zincato, plumbato).</li><li>En el compuesto, se nombra primero el anión y después el catión, como en cualquier sal.</li></ol>
${table(['Ion complejo','Nombre','Compuesto','Nombre del compuesto'],[
 ['[Cu(NH₃)₄]²⁺','tetraammincobre(II)','[Cu(NH₃)₄]SO₄','sulfato de tetraammincobre(II)'],
 ['[Ag(CN)₂]⁻','dicianoargentato(I)','K[Ag(CN)₂]','dicianoargentato(I) de potasio'],
 ['[Fe(CN)₆]³⁻','hexacianoferrato(III)','K₃[Fe(CN)₆]','hexacianoferrato(III) de potasio'],
 ['[Zn(OH)₄]²⁻','tetrahidroxozincato(II)','Na₂[Zn(OH)₄]','tetrahidroxozincato(II) de sodio']
])}
${note('Ammin o amin','<p>En el apunte de clase aparece “tetramincobre(II)” y “diaminoplata(I)”. La forma recomendada por IUPAC es <b>ammin</b> (con dos m: tetraammincobre(II), diamminplata(I)). Ambas se entienden; usá la que pida el profesor.</p>')}
<div data-qi-guide></div>
`);
  a2('intercambio','Intercambio de ligandos y disolución de precipitados','TP 2 · 03',`
<p>Un ligando puede <b>desplazar</b> a otro si forma un complejo más estable (mayor constante de formación). Orden de prioridad según el apunte de clase (de mayor a menor estabilidad de sus complejos):</p>
<p class="qiPunch">CN⁻ &gt; NH₃ &gt; F⁻ &gt; SCN⁻ &gt; OH⁻ &gt; H₂O &gt; Cl⁻</p>
${note('Ojo','<p>Es una regla práctica: el orden real depende de cada metal. Además, el exceso de un ligando puede invertir el resultado (por eso el [CuCl₄]²⁻ vuelve a celeste al diluir con agua, TP 4).</p>')}
${rxs(['[Cu(H2O)4]^2+ + 4 NH3 -> [Cu(NH3)4]^2+ + 4 H2O','celeste → azul intenso'],['[Fe(H2O)6]^3+ + 6 CN^- -> [Fe(CN)6]^3- + 6 H2O'],['[Fe(H2O)6]^3+ + SCN^- -> [Fe(SCN)(H2O)5]^2+ + H2O','rojo sangre: reconocimiento del Fe³⁺'])}
<h3>Un precipitado que se disuelve por formar un complejo</h3>
${rxs(['Cu(OH)2(s) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac) + 2 OH^-(ac)'],['AgCl(s) + 2 NH3(ac) -> [Ag(NH3)2]^+(ac) + Cl^-(ac)'])}
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
 [rx('Au^3+ + 4 Cl^- -> [AuCl4]^-'),'tetracloroaurato(III)'],
 [rx('Pt^2+ + 2 NH3 + 2 Cl^- -> [Pt(NH3)2Cl2]'),'diammindicloroplatino(II) (el cis es el cisplatino)']
])}
${fix('Correcciones a la lista de clase','<ul><li>“Fe²⁺ + 3 C₂O₄²⁻ → [Fe(C₂O₄)₃]³⁻ trioxalatoferrato(III)”: si la carga es 3−, el hierro es <b>Fe³⁺</b>.</li><li>“[Fe(SCN)₃] tris(tiocianato)<b>ferrato</b>(III)”: es neutro, no anión; se llama tritiocianatohierro(III) (sin “-ato”).</li><li>“[Fe(NO)₂]²⁺ dinitrosil<b>ferrato</b>(II)”: es un catión, no lleva “-ato”.</li></ul>')}
`);
  const ex2=[
   {n:'C1',title:'Completar la tabla de complejos',statement:'Completá: a) [Cu(NH₃)₄]²⁺: nombre, fórmula del sulfato y su nombre · b) dicianoargentato(I): fórmula, sal de potasio · c) K₃[Fe(CN)₆]: ion y nombres · d) tetrahidroxozincato(II): fórmula y sal de sodio.',
    solution:table(['Ion complejo','Nombre','Compuesto','Nombre del compuesto'],[['[Cu(NH₃)₄]²⁺','tetraammincobre(II)','[Cu(NH₃)₄]SO₄','sulfato de tetraammincobre(II)'],['[Ag(CN)₂]⁻','dicianoargentato(I)','K[Ag(CN)₂]','dicianoargentato(I) de potasio'],['[Fe(CN)₆]³⁻','hexacianoferrato(III)','K₃[Fe(CN)₆]','hexacianoferrato(III) de potasio'],['[Zn(OH)₄]²⁻','tetrahidroxozincato(II)','Na₂[Zn(OH)₄]','tetrahidroxozincato(II) de sodio']])+step('Cómo sacar la carga','<p>[Ag(CN)₂]: +1 + 2·(−1) = −1 · [Fe(CN)₆]: +3 + 6·(−1) = −3 · [Zn(OH)₄]: +2 + 4·(−1) = −2. La cantidad de K⁺ o Na⁺ es la que neutraliza esa carga.</p>'),
    answer:'Ver tabla completa.'},
   {n:'C2',title:'Nombrar y formular',statement:'a) Nombrá [Ni(NH₃)₆]Cl₂ y K₄[Fe(CN)₆]. b) Escribí la fórmula del tetraclorocuprato(II) de sodio y del sulfato de tetraacuocobre(II).',
    solution:step('a','<p>[Ni(NH₃)₆]Cl₂: cloruro de hexaamminníquel(II) (Ni: x + 0 = +2). K₄[Fe(CN)₆]: hexacianoferrato(II) de potasio (x − 6 = −4 → Fe²⁺).</p>')+step('b','<p>[CuCl₄]²⁻ necesita 2 Na⁺: <b>Na₂[CuCl₄]</b>. [Cu(H₂O)₄]²⁺ con SO₄²⁻: <b>[Cu(H₂O)₄]SO₄</b>.</p>'),
    answer:'cloruro de hexaamminníquel(II) · hexacianoferrato(II) de potasio · Na₂[CuCl₄] · [Cu(H₂O)₄]SO₄'}
  ];
  window.ET27_QI4.units.push({id:'tp2',part:'tp',kind:'tp',n:2,pending:true,title:'TP 2 · Complejos',short:'Complejos',lead:'Compuestos de coordinación: ion central, ligandos, número de coordinación, nomenclatura e intercambio de ligandos. Material parcial: falta la guía de laboratorio.',sections:s2,exercises:ex2});

  // =====================================================================
  // TP · HALÓGENOS Y AZUFRE (número a confirmar)
  // =====================================================================
  const s3=[];const a3=(k,l,kk,h)=>s3.push({key:`qi-tphs-${k}`,label:l,kicker:kk,html:h});
  a3('intro','Halógenos y azufre: lo que tenemos','HALÓGENOS Y AZUFRE · 01',`
${pend('dos preguntas de evaluación sobre halógenos y azufre (no sabemos todavía qué número de TP es)')}
<h3>Halógenos (grupo 17)</h3>
<p>F, Cl, Br, I: les falta <b>un electrón</b> para el octeto, así que son <b>oxidantes</b> (forman X⁻). El bromo es un líquido rojo-pardo y su solución acuosa es <b>naranja</b>.</p>
<h3>El azufre y los sulfuros</h3>
<p>Los sulfuros (S²⁻) de muchos metales son muy insolubles y de colores característicos: se usan para separar e identificar cationes. En el laboratorio, en vez de usar H₂S gaseoso (tóxico), se usa <b>tioacetamida</b>, que en solución caliente libera H₂S de a poco:</p>
${rxs(['CH3CSNH2 + H2O =[Δ]=> CH3CONH2 + H2S','tioacetamida → acetamida + sulfuro de hidrógeno'],['H2S <=> 2 H^+ + S^2-','en medio ácido hay muy poco S²⁻; en medio básico, mucho'])}
${table(['Sulfuro','Color','¿Se disuelve en HCl?'],[['CuS','negro','no'],['ZnS','blanco','sí'],['SnS','pardo','sí (en HCl concentrado)']])}
<div data-qi-guide></div>
`);
  const ex3=[
   {n:'H1',title:'Bromo con NaOH y luego HCl',statement:'Si a una solución acuosa de bromo (naranja) se le agrega NaOH, se decolora; al agregar HCl vuelve el color naranja. Indicá qué procesos ocurren y escribí las ecuaciones balanceadas.',
    solution:step('1. Con NaOH: dismutación','<p>El Br₂ (n.o. 0) se reduce a Br⁻ (−1) y al mismo tiempo se oxida a BrO⁻ (+1, hipobromito). Las dos especies son incoloras: la solución se decolora.</p>'+rxs(['Br2 + 2 e^- -> 2 Br^-','reducción'],['Br2 + 4 OH^- -> 2 BrO^- + 2 H2O + 2 e^-','oxidación (medio básico)'],['Br2 + 2 OH^- -> Br^- + BrO^- + H2O','suma ÷ 2'],['Br2 + 2 NaOH -> NaBr + NaBrO + H2O','molecular']))+
     step('2. Con HCl: comproporción','<p>En medio ácido el proceso se invierte: el Br⁻ (−1) y el BrO⁻ (+1) se encuentran en Br₂ (0) y vuelve el naranja.</p>'+rx('Br^- + BrO^- + 2 H^+ -> Br2 + H2O'))+
     idea('La clave','<p>El medio decide: en básico el bromo dismuta; en ácido se regenera. Es un equilibrio redox que se desplaza con el pH.</p>'),
    answer:'NaOH: Br₂ + 2 OH⁻ → Br⁻ + BrO⁻ + H₂O (incoloro) · HCl: Br⁻ + BrO⁻ + 2 H⁺ → Br₂ + H₂O (naranja)'},
   {n:'H2',title:'Cationes con tioacetamida',statement:'Interpretá: Cu(NO₃)₂ + tioacetamida → precipitado negro (con NaOH y con HCl, sin cambios) · ZnSO₄ + tioacetamida → sin cambios; con NaOH, precipitado blanco; con HCl, se disuelve · SnCl₂ + tioacetamida → precipitado pardo; con HCl se disuelve.',
    solution:step('Cobre','<p>El CuS es tan insoluble que precipita aun en medio ácido, y no se disuelve en HCl.</p>'+rx('Cu^2+ + H2S -> CuS(s)↓ + 2 H^+','negro'))+
     step('Zinc','<p>El ZnS es más soluble: en el medio ácido no alcanza el S²⁻ y no precipita. Al agregar NaOH aumenta el S²⁻ y precipita ZnS blanco; con HCl se redisuelve.</p>'+rxs(['Zn^2+ + S^2- -> ZnS(s)↓','blanco, en medio básico'],['ZnS(s) + 2 H^+ -> Zn^2+ + H2S','se disuelve en HCl']))+note('Otra lectura posible','<p>El precipitado blanco también podría ser Zn(OH)₂ (Zn²⁺ + 2 OH⁻ → Zn(OH)₂), que igualmente se disuelve en HCl. Con tioacetamida presente, lo esperable es ZnS.</p>')+
     step('Estaño','<p>Precipita SnS pardo, que se disuelve en HCl concentrado.</p>'+rxs(['Sn^2+ + H2S -> SnS(s)↓ + 2 H^+','pardo'],['SnS(s) + 2 H^+ -> Sn^2+ + H2S']))+
     fix('Lo que circula','<p>Presenta la formación de CuS como redox (“Cu²⁺ + 2e⁻ → Cu; S²⁻ → S + 2e⁻”). <b>No es redox</b>: el Cu sigue siendo +2 y el S sigue siendo −2 en el CuS. Es una reacción de <b>precipitación</b>.</p>'),
    answer:'CuS negro (insoluble en HCl) · ZnS blanco sólo en medio básico, soluble en HCl · SnS pardo, soluble en HCl. Son precipitaciones, no redox.'}
  ];
  window.ET27_QI4.units.push({id:'tp-halogenos',part:'tp',kind:'tp',n:3,numLabel:'TP ?',pending:true,title:'TP · Halógenos y azufre (n.º a confirmar)',short:'Halógenos y azufre',lead:'Bromo en medio básico y ácido, sulfuros con tioacetamida. Material parcial: falta la guía y el número de TP.',sections:s3,exercises:ex3});
})();
