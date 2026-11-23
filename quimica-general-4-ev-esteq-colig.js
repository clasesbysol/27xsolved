// 27xSOLved · Química General 4.º — Evaluaciones de Estequiometría (Unidad 2) y Propiedades coligativas (Unidad 4).
// Evaluaciones fotografiadas «Estequiometría combinada – Gases ideales» (30/06/26) y «Propiedades
// coligativas» (6/10) en versión virtual, cada una con dos modelos nuevos (B y C). Todo resuelto.
(function(){
  'use strict';
  const Q=window.ET27_QG4,K=window.ET27Kit;if(!Q||!K)return;
  const {chain,sym,idea,warn,note,step,table,figure}=K;const R=String.raw;

  // ---------- Helpers comunes ----------
  const E=(n,title,statement,solution,answer)=>({n,title,statement,solution,answer});
  const plan=(t,f,s)=>step('Qué vamos a hacer',`<p>${t}</p>`+(f&&f.length?chain(...f):'')+(s?sym(s):''));
  const datos=rows=>step('Datos que usamos',table(['Dato','Valor','De dónde sale'],rows));
  const part=t=>`<h3 class="qgEvPart">${t}</h3>`;
  const items=(intro,list)=>`<p>${intro}</p>`+list.map(([l,t])=>`<p class="qgEvItem"><b>${l})</b> ${t}</p>`).join('');
  const dataTable=pairs=>table(pairs.map(p=>p[0]),[pairs.map(p=>p[1])]);
  const RULES='Las ecuaciones químicas deben estar completas, correctamente balanceadas y con los estados de agregación de cada sustancia. Los planteos (reglas de tres simple, fórmulas) deben ser correctos en sentido matemático y químico, indicando unidades y tipo de sustancia, y escribiendo cada fórmula completa antes de usarla.';
  function evaluation(u,o,at){
    if(!u||u.sections.some(s=>s.key===o.key))return;
    const html=`<div class="kitBox kitNote"><b>📝 ${o.title}</b><p>${o.meta}</p></div>`+
      (o.recursos?idea('Qué recursos pone en juego este modelo',`<p>${o.recursos}</p>`):'')+
      `<p><b>Consignas generales.</b> ${o.rules||RULES}</p>`+
      (o.data?step('Datos de la evaluación',dataTable(o.data)+(o.dataNote?`<p>${o.dataNote}</p>`:'')):'')+
      `<p>Intentá resolver cada consigna antes de abrir la resolución. Cada desarrollo empieza diciendo <b>qué vamos a hacer y con qué fórmula</b>; después muestra los datos (también los de tabla y las constantes), el despeje, el reemplazo y el control.</p><div data-qg-eval></div>`;
    const s={key:o.key,label:o.label,kicker:o.kicker,html,evalExercises:o.exercises};
    if(typeof at==='number')u.sections.splice(at,0,s);else u.sections.push(s);
  }
  const RG=['R','0,082 L·atm/(K·mol)','constante de los gases'];
  const NA=['N<sub>A</sub>','6,022·10²³ partículas/mol','constante de Avogadro'];

  // ---------- Gráficos ----------
  const svgPT=`<svg viewBox="0 0 380 250" role="img" aria-label="Gráfico de presión en función de la temperatura a volumen constante: una recta que sale del origen y pasa por (T₁, P₁) y (T₂, P₂)">
    <line x1="50" y1="210" x2="360" y2="210" class="svgLine"/><line x1="50" y1="210" x2="50" y2="20" class="svgLine"/>
    <text x="352" y="232" class="svgText strong">T</text><text x="28" y="30" class="svgText strong">P</text>
    <line x1="50" y1="210" x2="320" y2="40" class="svgCurve"/>
    <line x1="50" y1="134" x2="170" y2="134" class="svgSectionDash"/><line x1="170" y1="134" x2="170" y2="210" class="svgSectionDash"/>
    <line x1="50" y1="71" x2="270" y2="71" class="svgSectionDash"/><line x1="270" y1="71" x2="270" y2="210" class="svgSectionDash"/>
    <circle cx="170" cy="134" r="5" class="svgMolecule"/><circle cx="270" cy="71" r="5" class="svgMolecule"/>
    <text x="22" y="139" class="svgText">P₁</text><text x="22" y="76" class="svgText">P₂</text>
    <text x="163" y="230" class="svgText">T₁</text><text x="263" y="230" class="svgText">T₂</text>
    <text x="190" y="26" class="svgText">V = 1,2 L (constante)</text>
  </svg>`;
  const hyper=[];for(let v=0.85;v<=8.01;v+=0.05)hyper.push(`${(50+v*38).toFixed(1)},${(210-(6/v)*26).toFixed(1)}`);
  const svgPV=`<svg viewBox="0 0 380 250" role="img" aria-label="Gráfico de presión en función del volumen a temperatura constante: una hipérbola que pasa por (4,0 L; 1,5 atm) y (2,0 L; 3,0 atm)">
    <line x1="50" y1="210" x2="360" y2="210" class="svgLine"/><line x1="50" y1="210" x2="50" y2="20" class="svgLine"/>
    <text x="340" y="232" class="svgText strong">V (L)</text><text x="12" y="30" class="svgText strong">P (atm)</text>
    <polyline points="${hyper.join(' ')}" fill="none" class="svgCurve"/>
    <line x1="50" y1="171" x2="202" y2="171" class="svgSectionDash"/><line x1="202" y1="171" x2="202" y2="210" class="svgSectionDash"/>
    <line x1="50" y1="132" x2="126" y2="132" class="svgSectionDash"/><line x1="126" y1="132" x2="126" y2="210" class="svgSectionDash"/>
    <circle cx="202" cy="171" r="5" class="svgMolecule"/><circle cx="126" cy="132" r="5" class="svgMolecule"/>
    <text x="18" y="175" class="svgText">1,5</text><text x="18" y="136" class="svgText">3,0</text>
    <text x="192" y="230" class="svgText">4,0</text><text x="116" y="230" class="svgText">2,0</text>
    <text x="215" y="60" class="svgText">T = 300 K (constante)</text>
  </svg>`;

  // =====================================================================
  // ESTEQUIOMETRÍA · ESTEQUIOMETRÍA COMBINADA – GASES IDEALES (original, 30/06/26)
  // =====================================================================
  const est=Q.units.find(x=>x.id==='estequiometria');
  if(est){
    if(est.pending){est.pending=false;est.sections=[];est.exercises=[];est.lead='Leyes de los gases ideales y estequiometría combinada con soluciones, pureza, rendimiento y reactivo limitante: evaluaciones en versión virtual con modelos extra, resueltas paso a paso.'}

    evaluation(est,{key:'qg-ev-est-1',label:'Evaluación · Estequiometría combinada y gases ideales (original)',kicker:'EVALUACIÓN · 30/06/26',
     title:'Estequiometría combinada – Gases ideales',
     meta:'Versión virtual de la evaluación del 30/06/26 (Espacio de integración "Leyes fundamentales de la Química I", 1.er cuatrimestre). Tres ejercicios.',
     data:[['Cl','35,45'],['Na','22,01'],['Ag','107,87'],['N','14,01'],['O','16,00'],['H','1,01'],['S','32,06'],['Ni','58,69']],
     dataNote:'Masas atómicas en g/mol, tal como figuran en la evaluación (la del Na real es 22,99 g/mol; ver el ejercicio 3).',
     exercises:[
      E(1,'Gas ideal a volumen constante: gráfico P–T',
       `<p>El siguiente gráfico muestra la presión en función de la temperatura para un gas ideal (sustancia incógnita) a <b>volumen constante de 1,2 L</b>:</p>${figure(svgPT,'P en función de T a V constante.')}`+
       items('',[['A','Explicar el comportamiento de la sustancia mediante la ley correspondiente e indicar si el gráfico representado es isocórico, isobárico o isotérmico.'],['B','Si la temperatura inicial del gas es de 360 K cuando la presión inicial es de 2 atm, ¿cuánto vale la temperatura final cuando la presión aumenta al doble?'],['C','¿Qué ocurre con el volumen inicial del gas, a la temperatura inicial, si ahora la presión se mantiene constante y la temperatura se reduce a la mitad?']]),
       part('A) Ley y tipo de gráfico')+
       plan('Vamos a leer el gráfico: el volumen está fijo y la presión crece en línea recta con la temperatura absoluta, que es lo que dice la ley de Gay-Lussac.',[R`\frac{P}{T}=\text{cte}\quad(V,\ n\ \text{constantes})`,R`\frac{P_1}{T_1}=\frac{P_2}{T_2}`])+
       step('1. Explicación','<p>Es un proceso <b>isocórico</b> (volumen constante). Al aumentar la temperatura, las partículas se mueven más rápido y chocan más seguido y con más fuerza contra las paredes; como el recipiente no puede agrandarse, la presión aumenta en la misma proporción que la temperatura en kelvin. Por eso la recta pasa por el origen (a 0 K la presión sería cero).</p>')+
       part('B) Temperatura final')+
       plan('Vamos a usar la ley de Gay-Lussac (P₁/T₁ = P₂/T₂) y despejar T₂.',[R`T_2=\frac{P_2\,T_1}{P_1}`])+
       datos([['T₁','360 K','enunciado'],['P₁','2 atm','enunciado'],['P₂','2·2 = 4 atm','enunciado ("al doble")'],['V','1,2 L (constante)','gráfico']])+
       step('2.',chain(R`T_2=\frac{4\ \mathrm{atm}\cdot360\ \mathrm{K}}{2\ \mathrm{atm}}`,R`T_2=720\ \mathrm{K}`))+
       part('C) Volumen a presión constante')+
       plan('Ahora la presión es constante, así que usamos la ley de Charles (V₁/T₁ = V₂/T₂), partiendo del volumen inicial 1,2 L a 360 K.',[R`\frac{V_1}{T_1}=\frac{V_2}{T_2}\Rightarrow V_2=\frac{V_1T_2}{T_1}`])+
       step('3.',chain(R`T_2=\frac{360}{2}=180\ \mathrm{K}`,R`V_2=\frac{1{,}2\ \mathrm{L}\cdot180\ \mathrm{K}}{360\ \mathrm{K}}`,R`V_2=0{,}6\ \mathrm{L}`)+'<p>El volumen se reduce a la mitad: a presión constante, volumen y temperatura absoluta son directamente proporcionales (proceso <b>isobárico</b>).</p>'),
       'A) Ley de Gay-Lussac; gráfico isocórico · B) T₂ = 720 K · C) el volumen baja a la mitad: 0,6 L (ley de Charles)'),

      E(2,'Níquel con ácido sulfúrico: pureza, solución, rendimiento y gas',
       items('Una muestra de níquel metálico de <b>1,80 g</b> con <b>95 % de pureza</b> se trata con <b>20,0 mL</b> de solución acuosa de ácido sulfúrico <b>80 % m/m</b> (δ<sub>sc</sub> = <b>1,60 g/mL</b>). La reacción transcurre con un rendimiento del <b>85 %</b>, a <b>1015 hPa</b> y <b>33 °C</b>, según: 1 mol de níquel reacciona con 2 moles de ácido sulfúrico para formar 1 mol de sulfato niqueloso, 1 mol de dióxido de azufre y 2 moles de agua.',[['A','¿Cuánta masa del reactivo en exceso queda sin reaccionar?'],['B','¿Qué volumen de dióxido de azufre se desprende y qué cantidad de aniones sulfato se forman en la oxosal?']]),
       plan('Vamos a escribir la ecuación, pasar el níquel puro y el ácido de la solución a moles, comparar con la relación 1 : 2 para hallar el limitante, y con él calcular el exceso que sobra (m = n·M<sub>m</sub>), el SO₂ real (afectado por el 85 %) y su volumen con P·V = n·R·T.',
        [R`\mathrm{Ni(s)}+2\,\mathrm{H_2SO_4(aq)}\to\mathrm{NiSO_4(aq)}+\mathrm{SO_2(g)}+2\,\mathrm{H_2O(l)}`,R`m_{puro}=m_{muestra}\cdot\frac{\%\ \text{pureza}}{100}`,R`m_{st}=\delta\cdot V\cdot\frac{\%\,m/m}{100}`,R`V=\frac{nRT}{P}`])+
       datos([['m muestra, pureza','1,80 g; 95 %','enunciado'],['Solución ácida','20,0 mL; 80 % m/m; δ = 1,60 g/mL','enunciado'],['η','85 %','enunciado'],['P','1015 hPa = 1015/1013,25 = 1,0017 atm','enunciado + equivalencia 1 atm = 1013,25 hPa'],['T','33 °C = 306,15 K','enunciado'],['M<sub>m</sub>(Ni)','58,69 g/mol','tabla'],['M<sub>m</sub>(H₂SO₄)','2·1,01 + 32,06 + 4·16,00 = 98,08 g/mol','tabla'],RG,NA])+
       step('1. Moles de níquel puro',chain(R`m_{Ni}=1{,}80\cdot0{,}95=1{,}71\ \mathrm{g}`,R`n_{Ni}=\frac{1{,}71}{58{,}69}=0{,}02914\ \mathrm{mol}`))+
       step('2. Moles de ácido',chain(R`m_{sc}=1{,}60\cdot20{,}0=32{,}0\ \mathrm{g}`,R`m_{H_2SO_4}=0{,}80\cdot32{,}0=25{,}6\ \mathrm{g}`,R`n_{H_2SO_4}=\frac{25{,}6}{98{,}08}=0{,}2610\ \mathrm{mol}`))+
       step('3. Reactivo limitante',chain([R`1\ \mathrm{mol\ Ni}\to2\ \mathrm{mol\ H_2SO_4}`,'relación de la ecuación'],R`0{,}02914\ \mathrm{mol\ Ni}\to0{,}05827\ \mathrm{mol\ H_2SO_4}`,R`0{,}05827<0{,}2610`)+'<p>Sobra ácido: el <b>níquel es el limitante</b> y el <b>H₂SO₄ está en exceso</b>.</p>')+
       part('A) Exceso sin reaccionar')+
       step('4.',chain(R`n_{sobra}=0{,}2610-0{,}05827=0{,}2027\ \mathrm{mol}`,R`m_{sobra}=0{,}2027\cdot98{,}08=19{,}88\ \mathrm{g\ de\ H_2SO_4}`))+
       note('Si el 85 % se aplica también al consumo','<p>Con el criterio usual el rendimiento afecta a los productos y el exceso se calcula con el consumo estequiométrico. Si se considera que sólo reaccionó el 85 % del níquel, se consumen 0,04953 mol de ácido y sobran 0,2115 mol = 20,74 g.</p>')+
       part('B) Volumen de SO₂ y aniones sulfato')+
       step('5. Moles reales de SO₂ (85 %)',chain(R`n_{SO_2,teórico}=n_{Ni}=0{,}02914\ \mathrm{mol}`,R`n_{SO_2,real}=0{,}85\cdot0{,}02914=0{,}02477\ \mathrm{mol}`))+
       step('6. Volumen',chain(R`V=\frac{0{,}02477\cdot0{,}082\cdot306{,}15}{1{,}0017}`,R`V=0{,}621\ \mathrm{L}=621\ \mathrm{mL}`))+
       step('7. Aniones sulfato en el NiSO₄',chain([R`n_{NiSO_4}=n_{SO_2}=0{,}02477\ \mathrm{mol}`,'1 : 1 en la ecuación'],[R`\mathrm{NiSO_4}\to\mathrm{Ni^{2+}}+\mathrm{SO_4^{2-}}`,'1 anión por fórmula'],R`N=0{,}02477\cdot6{,}022\cdot10^{23}=1{,}49\cdot10^{22}\ \mathrm{aniones}`)),
       'A) Quedan 19,88 g de H₂SO₄ sin reaccionar · B) 0,621 L de SO₂; 0,02477 mol = 1,49·10²² aniones SO₄²⁻'),

      E(3,'Cloruro de sodio con nitrato de plata: precipitación',
       items('Se tratan <b>10,0 mL</b> de una solución acuosa de cloruro de sodio <b>1,2 M</b> con <b>25,6 mL</b> de una solución de nitrato de plata <b>10 % m/v</b> (δ<sub>sc</sub> = 1,48 g/mL). Se produce una reacción de doble desplazamiento que forma una sal en solución y otra que precipita.',[['A','Calcular la concentración de la solución inicial de cloruro de sodio en % m/v y la de la solución inicial de nitrato de plata en M.'],['B','¿Cuántos moles de la sal precipitada se forman y cómo se llaman ambos productos de reacción?']]),
       plan('Vamos a pasar cada concentración a g/L (o mol/L) con la masa molar (M·M<sub>m</sub> = g/L), calcular los moles de cada reactivo con n = M·V, buscar el limitante con la relación 1 : 1 y con él los moles de precipitado.',
        [R`\mathrm{NaCl(aq)}+\mathrm{AgNO_3(aq)}\to\mathrm{AgCl(s)}+\mathrm{NaNO_3(aq)}`,R`\%\,m/v=\frac{M\cdot M_m}{10}`,R`M=\frac{\%\,m/v\cdot10}{M_m}`,R`n=M\cdot V`])+
       datos([['NaCl','10,0 mL; 1,2 M','enunciado'],['AgNO₃','25,6 mL; 10 % m/v','enunciado'],['M<sub>m</sub>(NaCl)','22,01 + 35,45 = 57,46 g/mol','tabla de la evaluación'],['M<sub>m</sub>(AgNO₃)','107,87 + 14,01 + 3·16,00 = 169,88 g/mol','tabla'],['δ AgNO₃','1,48 g/mL','enunciado (no se necesita: el % es m/v)']])+
       part('A) Concentraciones iniciales')+
       step('1. NaCl en % m/v',chain(R`1{,}2\ \mathrm{mol/L}\cdot57{,}46\ \mathrm{g/mol}=68{,}95\ \mathrm{g/L}`,R`\%\,m/v=\frac{68{,}95\ \mathrm{g}}{1000\ \mathrm{mL}}\cdot100=6{,}90\ \%`))+
       note('Con la masa atómica real del sodio','<p>Con Na = 22,99 g/mol, M<sub>m</sub>(NaCl) = 58,44 g/mol y la concentración da 7,01 % m/v.</p>')+
       step('2. AgNO₃ en M',chain([R`10\ \mathrm{g}/100\ \mathrm{mL}\to100\ \mathrm{g/L}`,'regla de tres'],R`M=\frac{100\ \mathrm{g/L}}{169{,}88\ \mathrm{g/mol}}=0{,}589\ \mathrm{M}`))+
       part('B) Precipitado y nombres')+
       step('3. Moles de reactivos',chain(R`n_{NaCl}=1{,}2\cdot0{,}0100=0{,}0120\ \mathrm{mol}`,R`n_{AgNO_3}=0{,}589\cdot0{,}0256=0{,}01507\ \mathrm{mol}`)+'<p>La relación es 1 : 1 y hay menos NaCl: el <b>NaCl es el limitante</b>.</p>')+
       step('4. Precipitado',chain(R`n_{AgCl}=n_{NaCl}=0{,}0120\ \mathrm{mol}`)+'<p>Productos: <b>cloruro de plata</b> (AgCl, sólido blanco que precipita) y <b>nitrato de sodio</b> (NaNO₃, queda disuelto).</p>'),
       'A) NaCl 6,90 % m/v · AgNO₃ 0,589 M · B) 0,0120 mol de AgCl (cloruro de plata, precipitado) y nitrato de sodio en solución')
     ]});

    // ---------- Modelo B ----------
    evaluation(est,{key:'qg-ev-est-1b',label:'Evaluación · Estequiometría combinada y gases ideales · Modelo B',kicker:'EVALUACIÓN · MODELO B',
     title:'Estequiometría combinada – Gases ideales · Modelo B',
     meta:'Modelo nuevo con la misma estructura: un gráfico de gases, un problema con pureza y gas, y uno con reactivo limitante y rendimiento. Tres ejercicios.',
     recursos:'Leer un gráfico isotérmico (ley de Boyle); usar la ecuación general de los gases cuando cambian P y T a la vez; calcular moles con P·V = n·R·T; calcular la pureza y el rendimiento a partir del gas obtenido (el camino inverso al del original).',
     data:[['H','1,01'],['C','12,01'],['O','16,00'],['Cl','35,45'],['Ca','40,08'],['Zn','65,38']],dataNote:'Masas atómicas en g/mol. R = 0,082 L·atm/(K·mol); 1 atm = 1013,25 hPa; N<sub>A</sub> = 6,022·10²³.',
     exercises:[
      E(1,'Gas ideal a temperatura constante: gráfico P–V',
       `<p>El gráfico muestra la presión en función del volumen para una muestra de gas ideal a <b>300 K constantes</b>:</p>${figure(svgPV,'P en función de V a T constante.')}`+
       items('',[['A','¿Qué ley describe el gráfico? ¿Es isocórico, isobárico o isotérmico? ¿Por qué la curva no es una recta?'],['B','Comprobar con la ley el valor de presión que corresponde a 2,0 L.'],['C','A partir de 4,0 L y 1,5 atm, el gas se calienta hasta 450 K y la presión sube a 4,0 atm. ¿Cuál es el nuevo volumen?'],['D','¿Cuántos moles de gas hay en la muestra?']]),
       part('A) Ley de Boyle')+
       plan('A temperatura constante, la presión y el volumen son inversamente proporcionales: su producto es constante (ley de Boyle-Mariotte).',[R`P\cdot V=\text{cte}\quad(T,\ n\ \text{constantes})`,R`P_1V_1=P_2V_2`])+
       step('1.','<p>Es un proceso <b>isotérmico</b>. Si el volumen se reduce a la mitad, las partículas chocan el doble de veces contra las paredes y la presión se duplica. Como P = cte/V, el gráfico es una <b>hipérbola</b>, no una recta.</p>')+
       part('B) Presión a 2,0 L')+
       step('2.',chain(R`P_2=\frac{P_1V_1}{V_2}=\frac{1{,}5\cdot4{,}0}{2{,}0}=3{,}0\ \mathrm{atm}`)+'<p>Coincide con el punto marcado en el gráfico.</p>')+
       part('C) Cambian P y T a la vez')+
       plan('Como cambian presión y temperatura, usamos la ecuación general de los gases, que junta Boyle, Charles y Gay-Lussac.',[R`\frac{P_1V_1}{T_1}=\frac{P_2V_2}{T_2}\Rightarrow V_2=\frac{P_1V_1T_2}{T_1P_2}`])+
       datos([['P₁, V₁, T₁','1,5 atm; 4,0 L; 300 K','gráfico'],['P₂, T₂','4,0 atm; 450 K','enunciado']])+
       step('3.',chain(R`V_2=\frac{1{,}5\cdot4{,}0\cdot450}{300\cdot4{,}0}`,R`V_2=2{,}25\ \mathrm{L}`))+
       part('D) Moles')+
       plan('Usamos la ecuación de estado del gas ideal con cualquier punto del gráfico.',[R`PV=nRT\Rightarrow n=\frac{PV}{RT}`])+
       step('4.',chain(R`n=\frac{1{,}5\cdot4{,}0}{0{,}082\cdot300}=0{,}244\ \mathrm{mol}`)),
       'A) Ley de Boyle, isotérmico, hipérbola · B) 3,0 atm · C) 2,25 L · D) 0,244 mol'),

      E(2,'Cinc impuro con ácido clorhídrico: pureza a partir del gas',
       items('Se tratan <b>5,00 g</b> de una muestra de cinc impuro con exceso de ácido clorhídrico. Se recogen <b>1,52 L de H₂</b> medidos a <b>25 °C</b> y <b>1013 hPa</b>. Las impurezas no reaccionan.',[['A','Escribir la ecuación balanceada y calcular la pureza de la muestra.'],['B','¿Qué masa de cloruro de cinc se forma y cuántos moles de HCl reaccionaron?'],['C','¿Cuántos iones cloruro hay en la sal formada?']]),
       plan('Vamos a calcular los moles de H₂ con P·V = n·R·T, pasar a moles de Zn con la ecuación (1 : 1) y comparar la masa de Zn puro con la de la muestra; con los mismos moles sacamos la sal y el HCl.',
        [R`\mathrm{Zn(s)}+2\,\mathrm{HCl(aq)}\to\mathrm{ZnCl_2(aq)}+\mathrm{H_2(g)}`,R`n=\frac{PV}{RT}`,R`\%\ \text{pureza}=\frac{m_{puro}}{m_{muestra}}\cdot100`])+
       datos([['m muestra','5,00 g','enunciado'],['V H₂','1,52 L','enunciado'],['P','1013 hPa = 0,99975 atm','enunciado + 1 atm = 1013,25 hPa'],['T','25 °C = 298,15 K','enunciado'],['M<sub>m</sub>(Zn)','65,38 g/mol','tabla'],['M<sub>m</sub>(ZnCl₂)','65,38 + 2·35,45 = 136,28 g/mol','tabla'],RG,NA])+
       part('A) Pureza')+
       step('1. Moles de H₂',chain(R`n_{H_2}=\frac{0{,}99975\cdot1{,}52}{0{,}082\cdot298{,}15}=0{,}06216\ \mathrm{mol}`))+
       step('2. Zn puro y pureza',chain(R`n_{Zn}=n_{H_2}=0{,}06216\ \mathrm{mol}`,R`m_{Zn}=0{,}06216\cdot65{,}38=4{,}064\ \mathrm{g}`,R`\%\ \text{pureza}=\frac{4{,}064}{5{,}00}\cdot100=81{,}3\ \%`))+
       part('B) Sal y ácido')+
       step('3.',chain(R`m_{ZnCl_2}=0{,}06216\cdot136{,}28=8{,}47\ \mathrm{g}`,R`n_{HCl}=2\cdot0{,}06216=0{,}1243\ \mathrm{mol}`))+
       part('C) Iones cloruro')+
       step('4.',chain([R`\mathrm{ZnCl_2}\to\mathrm{Zn^{2+}}+2\,\mathrm{Cl^-}`,'2 iones por fórmula'],R`n_{Cl^-}=2\cdot0{,}06216=0{,}1243\ \mathrm{mol}`,R`N=0{,}1243\cdot6{,}022\cdot10^{23}=7{,}49\cdot10^{22}\ \mathrm{iones}`)),
       'A) Zn + 2HCl → ZnCl₂ + H₂; pureza 81,3 % · B) 8,47 g de ZnCl₂; 0,1243 mol de HCl · C) 7,49·10²² iones Cl⁻'),

      E(3,'Carbonato de calcio con HCl: limitante y rendimiento',
       items('Se hacen reaccionar <b>15,0 g de CaCO₃</b> con <b>100 mL de HCl 2,00 M</b>. Se obtienen <b>2,10 L de CO₂</b> medidos a <b>27 °C</b> y <b>1 atm</b>.',[['A','Escribir la ecuación e identificar el reactivo limitante.'],['B','¿Qué masa del reactivo en exceso queda sin reaccionar?'],['C','Calcular el rendimiento de la reacción.']]),
       plan('Vamos a pasar ambos reactivos a moles (n = m/M<sub>m</sub> y n = M·V), compararlos con la relación 1 : 2, calcular el CO₂ teórico con el limitante y el real con P·V = n·R·T; el rendimiento es real/teórico·100.',
        [R`\mathrm{CaCO_3(s)}+2\,\mathrm{HCl(aq)}\to\mathrm{CaCl_2(aq)}+\mathrm{CO_2(g)}+\mathrm{H_2O(l)}`,R`\eta=\frac{n_{real}}{n_{teórico}}\cdot100`])+
       datos([['m CaCO₃','15,0 g','enunciado'],['HCl','100 mL; 2,00 M','enunciado'],['CO₂','2,10 L; 27 °C = 300,15 K; 1 atm','enunciado'],['M<sub>m</sub>(CaCO₃)','40,08 + 12,01 + 3·16,00 = 100,09 g/mol','tabla'],RG])+
       part('A) Limitante')+
       step('1.',chain(R`n_{CaCO_3}=\frac{15{,}0}{100{,}09}=0{,}1499\ \mathrm{mol}`,R`n_{HCl}=2{,}00\cdot0{,}100=0{,}200\ \mathrm{mol}`,[R`0{,}1499\ \mathrm{mol\ CaCO_3}\to0{,}2997\ \mathrm{mol\ HCl}`,'necesarios'])+'<p>Se necesitan 0,2997 mol de HCl y hay 0,200: el <b>HCl es el limitante</b>.</p>')+
       part('B) Exceso')+
       step('2.',chain(R`n_{CaCO_3\ usado}=\frac{0{,}200}{2}=0{,}100\ \mathrm{mol}`,R`n_{sobra}=0{,}1499-0{,}100=0{,}0499\ \mathrm{mol}`,R`m_{sobra}=0{,}0499\cdot100{,}09=4{,}99\ \mathrm{g}`))+
       part('C) Rendimiento')+
       step('3.',chain(R`n_{CO_2,teórico}=0{,}100\ \mathrm{mol}`,R`n_{CO_2,real}=\frac{1\cdot2{,}10}{0{,}082\cdot300{,}15}=0{,}0853\ \mathrm{mol}`,R`\eta=\frac{0{,}0853}{0{,}100}\cdot100=85{,}3\ \%`)),
       'A) HCl limitante · B) 4,99 g de CaCO₃ sin reaccionar · C) η = 85,3 %')
     ]});

    // ---------- Modelo C ----------
    evaluation(est,{key:'qg-ev-est-1c',label:'Evaluación · Estequiometría combinada y gases ideales · Modelo C',kicker:'EVALUACIÓN · MODELO C',
     title:'Estequiometría combinada – Gases ideales · Modelo C',
     meta:'Segundo modelo nuevo con la misma estructura. Tres ejercicios.',
     recursos:'Calcular la masa molar y la densidad de un gas con P·V = (m/M)·R·T; pasar a kelvin antes de usar Gay-Lussac; cambiar unidades de presión (atm, hPa, mmHg); usar el volumen molar en CNPT como dato de un reactivo gaseoso; calcular concentraciones de iones que quedan en solución después de una precipitación.',
     data:[['H','1,01'],['N','14,01'],['O','16,00'],['Na','22,99'],['S','32,06'],['Cl','35,45'],['Ba','137,33']],dataNote:'Masas atómicas en g/mol. R = 0,082 L·atm/(K·mol); 1 atm = 1013,25 hPa = 760 mmHg; volumen molar en CNPT = 22,4 L/mol.',
     exercises:[
      E(1,'Gas desconocido en un recipiente rígido',
       items('Un recipiente rígido de <b>5,00 L</b> contiene <b>8,00 g</b> de un gas desconocido a <b>27 °C</b> y <b>1,23 atm</b>.',[['A','Calcular la masa molar del gas y proponer de qué gas diatómico se trata.'],['B','Calcular su densidad en esas condiciones.'],['C','Se calienta el recipiente hasta 177 °C. ¿Cuál es la nueva presión? Expresarla en atm, hPa y mmHg.']]),
       plan('Vamos a reemplazar n = m/M en la ecuación de estado para despejar la masa molar; la densidad es m/V; y para el calentamiento usamos Gay-Lussac con las temperaturas en kelvin (el recipiente es rígido).',
        [R`PV=\frac{m}{M}RT\Rightarrow M=\frac{mRT}{PV}`,R`\delta=\frac{m}{V}=\frac{PM}{RT}`,R`\frac{P_1}{T_1}=\frac{P_2}{T_2}`])+
       datos([['V, m','5,00 L; 8,00 g','enunciado'],['T₁','27 °C = 300,15 K','enunciado'],['P₁','1,23 atm','enunciado'],['T₂','177 °C = 450,15 K','enunciado'],RG,['Equivalencias','1 atm = 1013,25 hPa = 760 mmHg','conversión de unidades']])+
       part('A) Masa molar')+
       step('1.',chain(R`M=\frac{8{,}00\cdot0{,}082\cdot300{,}15}{1{,}23\cdot5{,}00}`,R`M=32{,}0\ \mathrm{g/mol}`)+'<p>Un gas diatómico de 32 g/mol es el <b>O₂</b> (2·16,00).</p>')+
       part('B) Densidad')+
       step('2.',chain(R`\delta=\frac{8{,}00\ \mathrm{g}}{5{,}00\ \mathrm{L}}=1{,}60\ \mathrm{g/L}`))+
       part('C) Calentamiento a volumen constante')+
       step('3.',chain(R`P_2=\frac{P_1T_2}{T_1}=\frac{1{,}23\cdot450{,}15}{300{,}15}`,R`P_2=1{,}845\ \mathrm{atm}`,R`P_2=1{,}845\cdot1013{,}25=1869\ \mathrm{hPa}`,R`P_2=1{,}845\cdot760=1402\ \mathrm{mmHg}`))+
       warn('Error típico','<p>Si se usan °C (177/27) la presión daría 6,6 veces mayor, lo cual es absurdo: las leyes de los gases sólo funcionan con temperatura absoluta.</p>'),
       'A) 32,0 g/mol → O₂ · B) 1,60 g/L · C) 1,845 atm = 1869 hPa = 1402 mmHg'),

      E(2,'Síntesis de amoníaco con un reactivo gaseoso',
       items('Se hacen reaccionar <b>14,0 g de N₂</b> con <b>11,2 L de H₂</b> medidos en CNPT. El rendimiento es del <b>60 %</b>.',[['A','Escribir la ecuación e indicar el reactivo limitante.'],['B','¿Qué masa de NH₃ se obtiene?'],['C','¿Qué volumen ocupa ese NH₃ a 2,00 atm y 50 °C?'],['D','¿Qué masa del reactivo en exceso queda sin reaccionar?']]),
       plan('Vamos a pasar el N₂ a moles con su masa molar y el H₂ con el volumen molar en CNPT (22,4 L = 1 mol), comparar con la relación 1 : 3, calcular el NH₃ teórico, aplicarle el 60 % y usar P·V = n·R·T para el volumen.',
        [R`\mathrm{N_2(g)}+3\,\mathrm{H_2(g)}\to2\,\mathrm{NH_3(g)}`,R`n_{gas,CNPT}=\frac{V}{22{,}4\ \mathrm{L/mol}}`,R`n_{real}=\eta\cdot n_{teórico}`,R`V=\frac{nRT}{P}`])+
       datos([['m N₂','14,0 g','enunciado'],['V H₂ (CNPT)','11,2 L','enunciado'],['η','60 %','enunciado'],['M<sub>m</sub>(N₂)','2·14,01 = 28,02 g/mol','tabla'],['M<sub>m</sub>(NH₃)','14,01 + 3·1,01 = 17,04 g/mol','tabla'],['V molar CNPT','22,4 L/mol (0 °C y 1 atm)','constante'],RG])+
       part('A) Limitante')+
       step('1.',chain(R`n_{N_2}=\frac{14{,}0}{28{,}02}=0{,}4996\ \mathrm{mol}`,R`n_{H_2}=\frac{11{,}2}{22{,}4}=0{,}500\ \mathrm{mol}`,[R`0{,}4996\ \mathrm{mol\ N_2}\to1{,}499\ \mathrm{mol\ H_2}`,'necesarios'])+'<p>Hace falta mucho más H₂ del que hay: el <b>H₂ es el limitante</b>.</p>')+
       part('B) Masa de NH₃')+
       step('2.',chain(R`n_{NH_3,teórico}=\frac{2}{3}\cdot0{,}500=0{,}3333\ \mathrm{mol}`,R`n_{NH_3,real}=0{,}60\cdot0{,}3333=0{,}200\ \mathrm{mol}`,R`m=0{,}200\cdot17{,}04=3{,}41\ \mathrm{g}`))+
       part('C) Volumen de NH₃')+
       step('3.',chain(R`T=50+273{,}15=323{,}15\ \mathrm{K}`,R`V=\frac{0{,}200\cdot0{,}082\cdot323{,}15}{2{,}00}=2{,}65\ \mathrm{L}`))+
       part('D) Exceso')+
       step('4.',chain(R`n_{N_2\ usado}=\frac{0{,}500}{3}=0{,}1667\ \mathrm{mol}`,R`n_{sobra}=0{,}4996-0{,}1667=0{,}3330\ \mathrm{mol}`,R`m_{sobra}=0{,}3330\cdot28{,}02=9{,}33\ \mathrm{g\ de\ N_2}`)),
       'A) N₂ + 3H₂ → 2NH₃; H₂ limitante · B) 3,41 g de NH₃ · C) 2,65 L · D) 9,33 g de N₂'),

      E(3,'Cloruro de bario con sulfato de sodio: lo que queda en solución',
       items('Se mezclan <b>50,0 mL de BaCl₂ 0,200 M</b> con <b>40,0 mL de Na₂SO₄ 3,00 % m/v</b>. Se forma un precipitado blanco. Suponer volúmenes aditivos.',[['A','Escribir la ecuación de doble desplazamiento con estados de agregación y nombrar los productos.'],['B','Calcular la molaridad de la solución de Na₂SO₄ y el reactivo limitante.'],['C','¿Qué masa de precipitado se forma?'],['D','Calcular la concentración molar de NaCl y de Ba²⁺ que queda en la solución final.']]),
       plan('Vamos a pasar el % m/v a molaridad (M = %·10/M<sub>m</sub>), calcular moles con n = M·V, buscar el limitante con la relación 1 : 1 y, con él, el precipitado; lo que queda disuelto se divide por el volumen total (90,0 mL).',
        [R`\mathrm{BaCl_2(aq)}+\mathrm{Na_2SO_4(aq)}\to\mathrm{BaSO_4(s)}+2\,\mathrm{NaCl(aq)}`,R`M=\frac{\%\,m/v\cdot10}{M_m}`,R`n=M\cdot V`,R`C=\frac{n}{V_{total}}`])+
       datos([['BaCl₂','50,0 mL; 0,200 M','enunciado'],['Na₂SO₄','40,0 mL; 3,00 % m/v','enunciado'],['M<sub>m</sub>(Na₂SO₄)','2·22,99 + 32,06 + 4·16,00 = 142,04 g/mol','tabla'],['M<sub>m</sub>(BaSO₄)','137,33 + 32,06 + 64,00 = 233,39 g/mol','tabla']])+
       part('A) Ecuación y nombres')+
       step('1.','<p>Se forman <b>sulfato de bario</b> (BaSO₄, precipitado blanco) y <b>cloruro de sodio</b> (NaCl, disuelto).</p>')+
       part('B) Molaridad y limitante')+
       step('2.',chain(R`M_{Na_2SO_4}=\frac{3{,}00\cdot10}{142{,}04}=0{,}2112\ \mathrm{M}`,R`n_{Na_2SO_4}=0{,}2112\cdot0{,}0400=8{,}448\cdot10^{-3}\ \mathrm{mol}`,R`n_{BaCl_2}=0{,}200\cdot0{,}0500=1{,}000\cdot10^{-2}\ \mathrm{mol}`)+'<p>Relación 1 : 1 y hay menos Na₂SO₄: el <b>Na₂SO₄ es el limitante</b>.</p>')+
       part('C) Precipitado')+
       step('3.',chain(R`n_{BaSO_4}=8{,}448\cdot10^{-3}\ \mathrm{mol}`,R`m=8{,}448\cdot10^{-3}\cdot233{,}39=1{,}97\ \mathrm{g}`))+
       part('D) Lo que queda disuelto')+
       step('4.',chain(R`V_{total}=50{,}0+40{,}0=90{,}0\ \mathrm{mL}`,R`n_{NaCl}=2\cdot8{,}448\cdot10^{-3}=0{,}01690\ \mathrm{mol}`,R`[\mathrm{NaCl}]=\frac{0{,}01690}{0{,}0900}=0{,}188\ \mathrm{M}`,R`n_{Ba^{2+}}=0{,}01000-0{,}008448=1{,}552\cdot10^{-3}\ \mathrm{mol}`,R`[\mathrm{Ba^{2+}}]=\frac{1{,}552\cdot10^{-3}}{0{,}0900}=0{,}0172\ \mathrm{M}`)),
       'A) BaCl₂ + Na₂SO₄ → BaSO₄(s) + 2NaCl: sulfato de bario y cloruro de sodio · B) 0,2112 M; Na₂SO₄ limitante · C) 1,97 g de BaSO₄ · D) NaCl 0,188 M; Ba²⁺ 0,0172 M')
     ]});
  }

  // =====================================================================
  // PROPIEDADES COLIGATIVAS (original, 6/10)
  // =====================================================================
  const col=Q.units.find(x=>x.id==='coligativas');
  if(col&&col.sections){
    let at=col.sections.findIndex(s=>s.key==='qg-modelo');at=at<0?col.sections.length:at+1;
    const add=o=>{const n=col.sections.length;evaluation(col,o,at);if(col.sections.length>n)at++};
    const COL_RULES='Indicar en cada caso la fórmula de la propiedad coligativa usada, el tipo de concentración que requiere (fracción molar, molalidad o molaridad), las unidades y el supuesto sobre el soluto (electrolito o no electrolito).';

    add({key:'qg-ev-col-1',label:'Evaluación · Propiedades coligativas (original)',kicker:'EVALUACIÓN · 6/10',
     title:'Evaluación de Química General · Propiedades coligativas',
     meta:'Versión virtual de la evaluación del 6/10: presión de vapor, ascenso ebulloscópico, presión osmótica y descenso crioscópico. Cuatro ejercicios.',rules:COL_RULES,
     data:[['C','12,01'],['H','1,008'],['O','16,00'],['R','0,082 L·atm/(K·mol)'],['1 atm','760 mmHg']],dataNote:'Masas atómicas en g/mol (la evaluación no trae tabla: se usan las usuales).',
     exercises:[
      E(1,'Cloroformo: fracción molar y masa molar del soluto',
       '<p>Una solución contiene <b>8,3 g</b> de una sustancia no electrolito y no volátil, disuelta en <b>un mol de cloroformo</b> (CHCl₃). La solución presenta una presión de vapor de <b>510,79 mmHg</b>, mientras que la del solvente puro es de <b>525,79 mmHg</b>. ¿Cuál es la fracción molar del soluto y su masa molar?</p>',
       plan('Vamos a usar la ley de Raoult (la presión de vapor de la solución es la del solvente puro por la fracción molar del solvente) para sacar X<sub>sv</sub> y X<sub>st</sub>; como conocemos los moles de solvente, con la fracción molar despejamos los moles de soluto y la masa molar (M = m/n).',
        [R`P_{sc}=X_{sv}\cdot P^0_{sv}`,R`X_{st}=1-X_{sv}`,R`X_{sv}=\frac{n_{sv}}{n_{sv}+n_{st}}`,R`M_m=\frac{m_{st}}{n_{st}}`],
        [[R`P_{sc}`,'presión de vapor de la solución','mmHg'],[R`P^0_{sv}`,'presión de vapor del solvente puro','mmHg'],[R`X_{sv},\ X_{st}`,'fracciones molares de solvente y soluto','sin unidad']])+
       datos([['P solución','510,79 mmHg','enunciado'],['P° solvente','525,79 mmHg','enunciado'],['n solvente','1 mol de CHCl₃','enunciado'],['m soluto','8,3 g','enunciado']])+
       step('1. Fracciones molares',chain(R`X_{sv}=\frac{510{,}79}{525{,}79}=0{,}97147`,R`X_{st}=1-0{,}97147=0{,}02853`))+
       step('2. Moles de soluto',chain(R`0{,}97147=\frac{1}{1+n_{st}}`,R`n_{st}=\frac{1}{0{,}97147}-1=0{,}02937\ \mathrm{mol}`)+'<p>Otra forma: n<sub>st</sub>/n<sub>sv</sub> = X<sub>st</sub>/X<sub>sv</sub> = 0,02853/0,97147.</p>')+
       step('3. Masa molar',chain(R`M_m=\frac{8{,}3\ \mathrm{g}}{0{,}02937\ \mathrm{mol}}=282{,}6\ \mathrm{g/mol}`)),
       'X<sub>st</sub> = 0,0285 · M<sub>m</sub> ≈ 282,6 g/mol'),

      E(2,'Benceno: masa molar por ascenso ebulloscópico',
       '<p>La K<sub>eb</sub> del benceno (C₆H₆) es <b>2,53 °C·kg/mol</b> y su punto de ebullición es <b>80,1 °C</b>. Determinar la masa molar de un compuesto no electrolito sabiendo que, al disolver <b>384,0 g</b> del soluto en <b>500,0 g de benceno</b>, la solución hierve a <b>85,1 °C</b>.</p>',
       plan('Vamos a usar el ascenso ebulloscópico (ΔT<sub>eb</sub> = K<sub>eb</sub>·m) para obtener la molalidad, con ella los moles de soluto en 0,5 kg de benceno, y después la masa molar.',
        [R`\Delta T_{eb}=T_{eb}-T^0_{eb}`,R`\Delta T_{eb}=K_{eb}\cdot m`,R`m=\frac{n_{st}}{m_{sv}(\mathrm{kg})}`,R`M_m=\frac{m_{st}}{n_{st}}`],
        [[R`K_{eb}`,'constante ebulloscópica del solvente','°C·kg/mol'],['m','molalidad','mol/kg']])+
       datos([['K<sub>eb</sub>','2,53 °C·kg/mol','enunciado'],['T° benceno','80,1 °C','enunciado'],['T solución','85,1 °C','enunciado'],['m soluto, m solvente','384,0 g; 500,0 g = 0,5000 kg','enunciado'],['i','1 (no electrolito)','enunciado']])+
       step('1.',chain(R`\Delta T_{eb}=85{,}1-80{,}1=5{,}0\ \mathrm{°C}`,R`m=\frac{5{,}0}{2{,}53}=1{,}976\ \mathrm{mol/kg}`,R`n_{st}=1{,}976\cdot0{,}5000=0{,}9881\ \mathrm{mol}`,R`M_m=\frac{384{,}0}{0{,}9881}=388{,}6\ \mathrm{g/mol}`)),
       'M<sub>m</sub> ≈ 388,6 g/mol'),

      E(3,'Polímero: masa molar por presión osmótica',
       '<p>Una disolución contiene <b>0,8330 g</b> de un polímero de estructura desconocida, disuelto en <b>170 mL</b> de un solvente orgánico; el volumen no varía al disolverlo. Si la presión osmótica es de <b>5,20 mmHg</b> a <b>25 °C</b>, ¿cuál es la masa molar del polímero?</p>',
       plan('Vamos a usar la presión osmótica (π = M·R·T) para obtener la molaridad, con ella los moles de polímero en 0,170 L y la masa molar. La presión tiene que estar en atm y la temperatura en K para usar R = 0,082.',
        [R`\pi=M\cdot R\cdot T`,R`M=\frac{\pi}{RT}`,R`n=M\cdot V`,R`M_m=\frac{m}{n}`],
        [[R`\pi`,'presión osmótica','atm'],['M','molaridad','mol/L'],['T','temperatura absoluta','K']])+
       datos([['π','5,20 mmHg = 5,20/760 = 6,842·10⁻³ atm','enunciado + 1 atm = 760 mmHg'],['T','25 °C = 298,15 K','enunciado'],['V solución','170 mL = 0,170 L','enunciado (no cambia al disolver)'],['m polímero','0,8330 g','enunciado'],RG])+
       step('1. Molaridad',chain(R`M=\frac{6{,}842\cdot10^{-3}}{0{,}082\cdot298{,}15}=2{,}799\cdot10^{-4}\ \mathrm{M}`))+
       step('2. Moles y masa molar',chain(R`n=2{,}799\cdot10^{-4}\cdot0{,}170=4{,}758\cdot10^{-5}\ \mathrm{mol}`,R`M_m=\frac{0{,}8330}{4{,}758\cdot10^{-5}}=1{,}75\cdot10^{4}\ \mathrm{g/mol}`))+
       idea('Por qué ósmosis','<p>Para moléculas tan grandes hay muy pocos moles: el descenso crioscópico sería de milésimas de grado, imposible de medir con un termómetro común; la presión osmótica, en cambio, se mide bien (5,20 mmHg).</p>'),
       'M<sub>m</sub> ≈ 1,75·10⁴ g/mol (17 500 g/mol)'),

      E(4,'Ácido cítrico: punto de congelación',
       '<p>Calcular el punto de congelación de una solución que contiene <b>17,25 g</b> de ácido cítrico (C₆H₈O₇) disueltos en <b>250 g de agua</b>, si la constante crioscópica del solvente es <b>1,86 °C·kg/mol</b>.</p>',
       plan('Vamos a calcular la molalidad (moles de ácido por kg de agua) y usar el descenso crioscópico ΔT<sub>c</sub> = K<sub>c</sub>·m; la solución congela ΔT<sub>c</sub> grados por debajo de 0 °C.',
        [R`m=\frac{n_{st}}{m_{sv}(\mathrm{kg})}`,R`\Delta T_c=K_c\cdot m`,R`T_c=T^0_c-\Delta T_c`])+
       datos([['m soluto','17,25 g','enunciado'],['m agua','250 g = 0,250 kg','enunciado'],['K<sub>c</sub>','1,86 °C·kg/mol','enunciado'],['T° congelación agua','0 °C','dato conocido'],['M<sub>m</sub>(C₆H₈O₇)','6·12,01 + 8·1,008 + 7·16,00 = 192,12 g/mol','tabla'],['i','1 (se trata como no electrolito: es un ácido débil)','supuesto']])+
       step('1.',chain(R`n=\frac{17{,}25}{192{,}12}=0{,}08979\ \mathrm{mol}`,R`m=\frac{0{,}08979}{0{,}250}=0{,}3592\ \mathrm{mol/kg}`,R`\Delta T_c=1{,}86\cdot0{,}3592=0{,}668\ \mathrm{°C}`,R`T_c=0-0{,}668=-0{,}668\ \mathrm{°C}`)),
       'La solución congela a −0,67 °C')
     ]});

    // ---------- Modelo B ----------
    add({key:'qg-ev-col-1b',label:'Evaluación · Propiedades coligativas · Modelo B',kicker:'EVALUACIÓN · MODELO B',
     title:'Propiedades coligativas · Modelo B',rules:COL_RULES,
     meta:'Modelo nuevo con la misma estructura: una consigna por cada propiedad coligativa. Cuatro ejercicios.',
     recursos:'Calcular la presión de vapor a partir de las masas (pasando también el solvente a moles); usar el factor de van’t Hoff (i) en un electrolito; encadenar dos propiedades (de la presión osmótica a la temperatura de congelación); usar el descenso crioscópico para determinar la constante K<sub>c</sub> de un solvente.',
     data:[['H','1,01'],['C','12,01'],['N','14,01'],['O','16,00'],['Na','22,99'],['Cl','35,45'],['R','0,082 L·atm/(K·mol)']],dataNote:'Masas atómicas en g/mol. Agua: K<sub>eb</sub> = 0,52 °C·kg/mol; K<sub>c</sub> = 1,86 °C·kg/mol.',
     exercises:[
      E(1,'Urea en agua: presión de vapor de la solución',
       '<p>Se disuelven <b>25,0 g de urea</b> (CO(NH₂)₂, no electrolito y no volátil) en <b>180,0 g de agua</b> a 25 °C. La presión de vapor del agua pura a esa temperatura es <b>23,76 mmHg</b>. Calcular la presión de vapor de la solución y el descenso de la presión de vapor.</p>',
       plan('Vamos a pasar soluto y solvente a moles, calcular la fracción molar del agua y aplicar la ley de Raoult (P = X<sub>sv</sub>·P°); el descenso es la diferencia.',
        [R`X_{sv}=\frac{n_{sv}}{n_{sv}+n_{st}}`,R`P_{sc}=X_{sv}P^0`,R`\Delta P=P^0-P_{sc}=X_{st}P^0`])+
       datos([['m urea, m agua','25,0 g; 180,0 g','enunciado'],['P° agua (25 °C)','23,76 mmHg','enunciado'],['M<sub>m</sub>(urea)','12,01 + 16,00 + 2·(14,01 + 2·1,01) = 60,07 g/mol','tabla'],['M<sub>m</sub>(H₂O)','18,02 g/mol','tabla']])+
       step('1. Moles',chain(R`n_{st}=\frac{25{,}0}{60{,}07}=0{,}4162\ \mathrm{mol}`,R`n_{sv}=\frac{180{,}0}{18{,}02}=9{,}989\ \mathrm{mol}`))+
       step('2. Raoult',chain(R`X_{sv}=\frac{9{,}989}{9{,}989+0{,}4162}=0{,}9600`,R`P_{sc}=0{,}9600\cdot23{,}76=22{,}81\ \mathrm{mmHg}`,R`\Delta P=23{,}76-22{,}81=0{,}95\ \mathrm{mmHg}`)),
       'P<sub>sc</sub> = 22,81 mmHg · ΔP = 0,95 mmHg'),

      E(2,'Cloruro de sodio: un electrolito',
       '<p>Calcular la temperatura de ebullición y la de congelación de una solución que contiene <b>11,70 g de NaCl</b> en <b>500 g de agua</b>, considerando que la sal se disocia totalmente. ¿Qué valores se obtendrían si se ignorara la disociación?</p>',
       plan('Como el NaCl es un electrolito, en el agua se separa en Na⁺ y Cl⁻: hay el doble de partículas, así que usamos las fórmulas con el factor de van’t Hoff (i = 2), ΔT = i·K·m.',
        [R`\mathrm{NaCl(s)}\to\mathrm{Na^+(aq)}+\mathrm{Cl^-(aq)}\Rightarrow i=2`,R`\Delta T_{eb}=i\,K_{eb}\,m`,R`\Delta T_c=i\,K_c\,m`],
        [['i','factor de van’t Hoff: partículas que da cada fórmula','sin unidad']])+
       datos([['m NaCl, m agua','11,70 g; 500 g = 0,500 kg','enunciado'],['M<sub>m</sub>(NaCl)','22,99 + 35,45 = 58,44 g/mol','tabla'],['K<sub>eb</sub>, K<sub>c</sub> (agua)','0,52 y 1,86 °C·kg/mol','datos de la evaluación'],['T° agua','100 °C y 0 °C','dato conocido']])+
       step('1. Molalidad',chain(R`n=\frac{11{,}70}{58{,}44}=0{,}2002\ \mathrm{mol}`,R`m=\frac{0{,}2002}{0{,}500}=0{,}4004\ \mathrm{mol/kg}`))+
       step('2. Con i = 2',chain(R`\Delta T_{eb}=2\cdot0{,}52\cdot0{,}4004=0{,}416\ \mathrm{°C}\Rightarrow T_{eb}=100{,}42\ \mathrm{°C}`,R`\Delta T_c=2\cdot1{,}86\cdot0{,}4004=1{,}49\ \mathrm{°C}\Rightarrow T_c=-1{,}49\ \mathrm{°C}`))+
       step('3. Si se ignorara la disociación (i = 1)',chain(R`T_{eb}=100{,}21\ \mathrm{°C};\quad T_c=-0{,}74\ \mathrm{°C}`)+'<p>El error sería de la mitad: las propiedades coligativas cuentan partículas, no fórmulas.</p>'),
       'T<sub>eb</sub> = 100,42 °C · T<sub>c</sub> = −1,49 °C (sin disociación: 100,21 °C y −0,74 °C)'),

      E(3,'Suero isotónico: de la presión osmótica a la congelación',
       '<p>Una solución acuosa de glucosa (C₆H₁₂O₆) tiene una presión osmótica de <b>7,65 atm</b> a <b>37 °C</b>, igual a la del plasma sanguíneo. Calcular: a) su molaridad y los gramos de glucosa por litro; b) su punto de congelación, considerando que por ser diluida la molalidad es prácticamente igual a la molaridad.</p>',
       plan('Vamos a sacar la molaridad de la presión osmótica (M = π/(R·T)), pasarla a g/L con la masa molar y, aproximando m ≈ M, usar el descenso crioscópico.',
        [R`\pi=MRT\Rightarrow M=\frac{\pi}{RT}`,R`\Delta T_c=K_c\cdot m\approx K_c\cdot M`])+
       datos([['π','7,65 atm','enunciado'],['T','37 °C = 310,15 K','enunciado'],['M<sub>m</sub>(glucosa)','180,18 g/mol','tabla'],['K<sub>c</sub> agua','1,86 °C·kg/mol','datos de la evaluación'],RG])+
       step('a) Molaridad y g/L',chain(R`M=\frac{7{,}65}{0{,}082\cdot310{,}15}=0{,}3008\ \mathrm{M}`,R`0{,}3008\cdot180{,}18=54{,}2\ \mathrm{g/L}`))+
       step('b) Punto de congelación',chain(R`\Delta T_c=1{,}86\cdot0{,}3008=0{,}559\ \mathrm{°C}`,R`T_c=-0{,}56\ \mathrm{°C}`)+'<p>Coincide con el valor conocido del plasma (≈ −0,56 °C): las dos propiedades miden lo mismo, la cantidad de partículas disueltas.</p>'),
       'a) 0,3008 M · 54,2 g/L · b) −0,56 °C'),

      E(4,'Determinar la constante crioscópica de un solvente',
       '<p>Al disolver <b>3,20 g de naftaleno</b> (C₁₀H₈, no electrolito) en <b>50,0 g</b> de un solvente X, la solución congela <b>2,55 °C</b> por debajo del solvente puro. a) Calcular la K<sub>c</sub> del solvente X. b) ¿Qué masa de naftaleno habría que disolver en 100 g de X para que congele 1,00 °C por debajo?</p>',
       plan('Ahora la incógnita es la constante: calculamos la molalidad con los datos de masa y despejamos K<sub>c</sub> = ΔT<sub>c</sub>/m; después usamos esa K<sub>c</sub> en el camino inverso.',
        [R`\Delta T_c=K_c\cdot m\Rightarrow K_c=\frac{\Delta T_c}{m}`,R`m=\frac{n_{st}}{m_{sv}(\mathrm{kg})}`])+
       datos([['m naftaleno, m solvente','3,20 g; 50,0 g = 0,0500 kg','enunciado'],['ΔT<sub>c</sub>','2,55 °C','enunciado'],['M<sub>m</sub>(C₁₀H₈)','10·12,01 + 8·1,01 = 128,18 g/mol','tabla']])+
       part('a) K<sub>c</sub>')+
       step('1.',chain(R`n=\frac{3{,}20}{128{,}18}=0{,}02496\ \mathrm{mol}`,R`m=\frac{0{,}02496}{0{,}0500}=0{,}4993\ \mathrm{mol/kg}`,R`K_c=\frac{2{,}55}{0{,}4993}=5{,}11\ \mathrm{°C\cdot kg/mol}`))+
       part('b) Masa para ΔT = 1,00 °C')+
       step('2.',chain(R`m=\frac{1{,}00}{5{,}11}=0{,}1957\ \mathrm{mol/kg}`,R`n=0{,}1957\cdot0{,}100=0{,}01957\ \mathrm{mol}`,R`m_{st}=0{,}01957\cdot128{,}18=2{,}51\ \mathrm{g}`))+
       idea('Control','<p>K<sub>c</sub> ≈ 5,1 °C·kg/mol es el valor del benceno: el solvente X podría ser benceno.</p>'),
       'a) K<sub>c</sub> = 5,11 °C·kg/mol · b) 2,51 g de naftaleno')
     ]});

    // ---------- Modelo C ----------
    add({key:'qg-ev-col-1c',label:'Evaluación · Propiedades coligativas · Modelo C',kicker:'EVALUACIÓN · MODELO C',
     title:'Propiedades coligativas · Modelo C',rules:COL_RULES,
     meta:'Segundo modelo nuevo con la misma estructura. Cuatro ejercicios.',
     recursos:'Ordenar soluciones sin hacer cuentas largas, comparando i·m; resolver el problema "al revés" (qué masa de soluto agregar para lograr una temperatura); pasar de fracción molar a molalidad; comparar la presión osmótica con el descenso crioscópico para justificar qué método conviene.',
     data:[['H','1,01'],['C','12,01'],['O','16,00'],['R','0,082 L·atm/(K·mol)'],['1 atm','760 mmHg']],dataNote:'Masas atómicas en g/mol. Agua: K<sub>eb</sub> = 0,52 °C·kg/mol; K<sub>c</sub> = 1,86 °C·kg/mol; M<sub>m</sub> = 18,02 g/mol.',
     exercises:[
      E(1,'Ordenar por punto de congelación',
       '<p>Ordenar las siguientes soluciones acuosas de <b>menor a mayor punto de congelación</b>, justificando: glucosa 0,10 m; NaCl 0,10 m; CaCl₂ 0,10 m; sacarosa 0,15 m; KNO₃ 0,05 m. Considerar disociación total de las sales.</p>',
       plan('El descenso crioscópico depende de la cantidad de partículas (ΔT<sub>c</sub> = i·K<sub>c</sub>·m): basta comparar el producto i·m. A mayor i·m, más baja la temperatura de congelación.',
        [R`\Delta T_c=i\,K_c\,m`,R`T_c=0\ \mathrm{°C}-\Delta T_c`])+
       datos([['i','glucosa y sacarosa 1; NaCl y KNO₃ 2 (dos iones); CaCl₂ 3 (Ca²⁺ + 2 Cl⁻)','disociación de cada sustancia'],['K<sub>c</sub> agua','1,86 °C·kg/mol','datos de la evaluación']])+
       step('1. Partículas y temperaturas',table(['Solución','i','i·m','T<sub>c</sub> (°C)'],[['CaCl₂ 0,10 m','3','0,30','−0,558'],['NaCl 0,10 m','2','0,20','−0,372'],['Sacarosa 0,15 m','1','0,15','−0,279'],['Glucosa 0,10 m','1','0,10','−0,186'],['KNO₃ 0,05 m','2','0,10','−0,186']]))+
       step('2. Orden',chain(R`\mathrm{CaCl_2}<\mathrm{NaCl}<\text{sacarosa}<\text{glucosa}=\mathrm{KNO_3}`)+'<p>La glucosa 0,10 m y el KNO₃ 0,05 m congelan igual: el KNO₃ tiene la mitad de molalidad pero da el doble de partículas.</p>'),
       'CaCl₂ (−0,558 °C) < NaCl (−0,372 °C) < sacarosa (−0,279 °C) < glucosa = KNO₃ (−0,186 °C)'),

      E(2,'Anticongelante: cuánto soluto agregar',
       '<p>¿Qué masa de etilenglicol (C₂H₆O₂, no electrolito y no volátil) hay que agregar a <b>4,00 kg de agua</b> para que la solución no congele hasta <b>−15,0 °C</b>? ¿A qué temperatura hierve esa solución?</p>',
       plan('Vamos al revés: con el descenso que queremos (15,0 °C) despejamos la molalidad de ΔT<sub>c</sub> = K<sub>c</sub>·m, la pasamos a moles y a masa; con la misma molalidad calculamos el ascenso ebulloscópico.',
        [R`m=\frac{\Delta T_c}{K_c}`,R`n=m\cdot m_{sv}(\mathrm{kg})`,R`\Delta T_{eb}=K_{eb}\cdot m`])+
       datos([['ΔT<sub>c</sub>','0 − (−15,0) = 15,0 °C','enunciado'],['m agua','4,00 kg','enunciado'],['K<sub>c</sub>, K<sub>eb</sub>','1,86 y 0,52 °C·kg/mol','datos de la evaluación'],['M<sub>m</sub>(C₂H₆O₂)','2·12,01 + 6·1,01 + 2·16,00 = 62,08 g/mol','tabla']])+
       step('1. Masa de etilenglicol',chain(R`m=\frac{15{,}0}{1{,}86}=8{,}065\ \mathrm{mol/kg}`,R`n=8{,}065\cdot4{,}00=32{,}26\ \mathrm{mol}`,R`m_{st}=32{,}26\cdot62{,}08=2003\ \mathrm{g}\approx2{,}00\ \mathrm{kg}`))+
       step('2. Temperatura de ebullición',chain(R`\Delta T_{eb}=0{,}52\cdot8{,}065=4{,}19\ \mathrm{°C}`,R`T_{eb}=104{,}19\ \mathrm{°C}`)+'<p>Por eso el anticongelante también protege al motor del sobrecalentamiento.</p>'),
       '≈ 2,00 kg de etilenglicol · la solución hierve a 104,19 °C'),

      E(3,'De la presión de vapor a la molalidad',
       '<p>A 100 °C, una solución acuosa de un soluto no volátil y no electrolito tiene una presión de vapor de <b>745,0 mmHg</b> (la del agua pura es <b>760,0 mmHg</b>). Calcular la molalidad de la solución y su punto de ebullición.</p>',
       plan('Vamos a obtener las fracciones molares con Raoult y, tomando 1 kg de agua como base (pasándolo a moles), convertir la fracción molar en molalidad; luego usamos el ascenso ebulloscópico.',
        [R`X_{sv}=\frac{P_{sc}}{P^0}`,R`\frac{n_{st}}{n_{sv}}=\frac{X_{st}}{X_{sv}}`,R`\Delta T_{eb}=K_{eb}\cdot m`])+
       datos([['P solución, P°','745,0 y 760,0 mmHg','enunciado'],['M<sub>m</sub>(H₂O)','18,02 g/mol','datos de la evaluación'],['K<sub>eb</sub>','0,52 °C·kg/mol','datos de la evaluación']])+
       step('1. Fracciones molares',chain(R`X_{sv}=\frac{745{,}0}{760{,}0}=0{,}98026`,R`X_{st}=0{,}01974`))+
       step('2. Molalidad (base 1 kg de agua)',chain(R`n_{sv}=\frac{1000}{18{,}02}=55{,}49\ \mathrm{mol}`,R`n_{st}=55{,}49\cdot\frac{0{,}01974}{0{,}98026}=1{,}117\ \mathrm{mol}`,R`m=1{,}117\ \mathrm{mol/kg}`))+
       step('3. Ebullición',chain(R`\Delta T_{eb}=0{,}52\cdot1{,}117=0{,}58\ \mathrm{°C}`,R`T_{eb}=100{,}58\ \mathrm{°C}`)),
       'm ≈ 1,12 mol/kg · T<sub>eb</sub> = 100,58 °C'),

      E(4,'Proteína: ¿ósmosis o crioscopía?',
       '<p>Se disuelven <b>0,500 g</b> de una proteína en agua hasta obtener <b>50,0 mL</b> de solución. A <b>27 °C</b> la presión osmótica es <b>3,80 mmHg</b>. a) Calcular la masa molar de la proteína. b) Calcular el descenso crioscópico que tendría esa solución (m ≈ M) y explicar por qué para proteínas se usa la presión osmótica.</p>',
       plan('Vamos a pasar la presión a atm, despejar la molaridad de π = M·R·T, obtener los moles en 0,0500 L y la masa molar; después estimamos ΔT<sub>c</sub> = K<sub>c</sub>·m con m ≈ M.',
        [R`M=\frac{\pi}{RT}`,R`n=M\cdot V`,R`M_m=\frac{m}{n}`,R`\Delta T_c=K_c\cdot m`])+
       datos([['π','3,80 mmHg = 3,80/760 = 5,00·10⁻³ atm','enunciado + 1 atm = 760 mmHg'],['T','27 °C = 300,15 K','enunciado'],['V, m','0,0500 L; 0,500 g','enunciado'],['K<sub>c</sub>','1,86 °C·kg/mol','datos de la evaluación'],RG])+
       part('a) Masa molar')+
       step('1.',chain(R`M=\frac{5{,}00\cdot10^{-3}}{0{,}082\cdot300{,}15}=2{,}032\cdot10^{-4}\ \mathrm{M}`,R`n=2{,}032\cdot10^{-4}\cdot0{,}0500=1{,}016\cdot10^{-5}\ \mathrm{mol}`,R`M_m=\frac{0{,}500}{1{,}016\cdot10^{-5}}=4{,}92\cdot10^{4}\ \mathrm{g/mol}`))+
       part('b) Comparación con la crioscopía')+
       step('2.',chain(R`\Delta T_c=1{,}86\cdot2{,}032\cdot10^{-4}=3{,}8\cdot10^{-4}\ \mathrm{°C}`)+'<p>Un descenso de 0,0004 °C no se puede medir con un termómetro común, en cambio 3,80 mmHg sí se mide con facilidad. Por eso la presión osmótica es el método para solutos de masa molar muy grande.</p>'),
       'a) M<sub>m</sub> ≈ 4,92·10⁴ g/mol · b) ΔT<sub>c</sub> ≈ 3,8·10⁻⁴ °C, imposible de medir: conviene la ósmosis')
     ]});
  }
})();
