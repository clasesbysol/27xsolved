// 27xSOLved · Química General 4.º · Unidad Propiedades coligativas — GUÍA 2 de ejercitación resuelta.
// «Ejercicios de propiedades coligativas»: Primera parte (solutos no iónicos, 1–12) y Segunda parte (solutos iónicos, 1–4).
// Se agrega a la unidad 'coligativas' de window.ET27_QG4 (se carga después de quimica-general-4-content.js).
// No reemplaza la primera guía: suma la sección 'qg-guia2' justo después de 'qg-guia'.
// Convenciones de la guía (con ellas coinciden sus respuestas): C 12 · H 1 · O 16 · N 14 · P 31 · Na 23 · Al 27 ·
// Cl 35,5 · K 39 · Cr 52 · Pb 207,2 g/mol; M(agua) = 18 g/mol; R = 0,082 L·atm/(mol·K); T(K) = t(°C) + 273.
(function(){
  'use strict';
  const K=window.ET27Kit,QG=window.ET27_QG4;if(!K||!QG)return;
  const u=(QG.units||[]).find(x=>x.id==='coligativas');
  if(!u||(u.sections||[]).some(s=>s.key==='qg-guia2'))return;
  const {m,chain,sym,simple,idea,warn,note,step,table}=K;
  const R=String.raw;

  // ---------- Tablas "a mano" ----------
  const SOLVENTES=[
    ['Agua','0','1,86','100','0,52'],
    ['Benceno','5,5','5,12','80,1','2,53'],
    ['Etanol','−117,3','1,99','78,4','1,22'],
    ['Ácido acético','16,6','3,9','117,9','2,93'],
    ['Ciclohexano','6,6','20','80,7','2,79']
  ];
  // Tabla de constantes del solvente; resalta la fila que se usa.
  const solv=(usar)=>`<p class="kitTableCaption"><b>📋 Tabla de la guía · constantes de los solventes</b>${usar?` (se usa la fila de <b>${usar.toLowerCase()}</b>)`:''}</p>`+
    table(['Solvente','Punto de congelación (°C)','K<sub>f</sub> (°C/m)','Punto de ebullición (°C)','K<sub>eb</sub> (°C/m)'],
      SOLVENTES.map(r=>r[0]===usar?r.map(c=>`<b>${c}</b>`):r));
  const datos=rows=>table(['Dato','Valor','De dónde sale'],rows);
  const consigna=(txt,extra='')=>`<p>${txt}</p>${extra}`;
  const assume=t=>note('Supuestos',`<p>${t}</p>`);
  const guia=(rta,html)=>note('Comparación con la respuesta de la guía',`<p>La guía informa <b>${rta}</b>. ${html}</p>`);
  const ok=(rta)=>idea('Coincide con la guía',`<p>Respuesta de la guía: <b>${rta}</b>. ✔</p>`);

  // =====================================================================
  // PRIMERA PARTE · SOLUTOS NO IÓNICOS (i = 1)
  // =====================================================================
  const exercises2=[];
  const ex=(n,title,statement,solution,answer)=>exercises2.push({n,title,statement,solution,answer});

  // ---------- 1 ----------
  ex(1,'Presión de vapor de una solución de sacarosa',
   consigna('Se prepara una solución disolviendo 396 g de sacarosa (C₁₂H₂₂O₁₁) en 624 g de agua. ¿Cuál es la presión de vapor de esta solución a 30 °C? (La presión de vapor del agua es 31,8 mmHg a 30 °C).'),
   step('1. Datos a mano',datos([
     ['Masa de sacarosa (soluto)','396 g','consigna'],
     ['Masa de agua (solvente)','624 g','consigna'],
     ['p⁰ del agua a 30 °C','31,8 mmHg','consigna'],
     ['M de la sacarosa C₁₂H₂₂O₁₁','12·12 + 22·1 + 11·16 = 342 g/mol','masas atómicas C 12, H 1, O 16'],
     ['M del agua H₂O','2·1 + 16 = 18 g/mol','masas atómicas']]))+
   assume('La sacarosa es <b>no volátil</b> (no pasa al vapor) y <b>no electrolito</b> (no se disocia: i = 1). Solución ideal.')+
   step('2. ¿Qué propiedad es?',`<p>Piden una <b>presión de vapor</b> → descenso de la presión de vapor, <b>ley de Raoult</b>. ${simple('Raoult trabaja con fracción molar, así que necesito los moles de los dos componentes')}</p>`+
     sym([[R`p_{\mathrm{sc}}`,'presión de vapor de la solución','mmHg'],[R`p^0_{\mathrm{sv}}`,'presión de vapor del solvente puro','mmHg'],[R`x_{\mathrm{sv}}`,'fracción molar del solvente','sin unidad']])+
     chain(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^0_{\mathrm{sv}}`))+
   step('3. Moles de cada componente',`<p>Moles = masa ÷ masa molar.</p>`+chain(
     [R`n_{\mathrm{st}}=\frac{396\ \mathrm{g}}{342\ \mathrm{g/mol}}`,'sacarosa'],R`n_{\mathrm{st}}\approx1{,}158\ \mathrm{mol}`,
     [R`n_{\mathrm{sv}}=\frac{624\ \mathrm{g}}{18\ \mathrm{g/mol}}`,'agua'],R`n_{\mathrm{sv}}\approx34{,}667\ \mathrm{mol}`))+
   step('4. Fracción molar del solvente',`<p>Es la parte de los moles totales que corresponde al agua.</p>`+chain(
     R`x_{\mathrm{sv}}=\frac{n_{\mathrm{sv}}}{n_{\mathrm{sv}}+n_{\mathrm{st}}}`,
     R`x_{\mathrm{sv}}=\frac{34{,}667}{34{,}667+1{,}158}`,
     R`x_{\mathrm{sv}}=\frac{34{,}667}{35{,}825}`,
     R`x_{\mathrm{sv}}\approx0{,}9677`))+
   step('5. Ley de Raoult',chain(
     R`p_{\mathrm{sc}}=0{,}9677\cdot31{,}8\ \mathrm{mmHg}`,
     R`p_{\mathrm{sc}}\approx30{,}77\ \mathrm{mmHg}`,
     [R`\Delta p=31{,}8-30{,}77\approx1{,}03\ \mathrm{mmHg}`,'cuánto bajó']))+
   idea('Control de sentido',`<p>La solución tiene que tener <b>menor</b> presión de vapor que el agua pura (30,77 &lt; 31,8). ✔ ${simple('las partículas de soluto “ocupan lugar” en la superficie y escapan menos moléculas de agua')}</p>`)+
   ok('30,77 mmHg'),
   'p<sub>sc</sub> ≈ 30,77 mmHg');

  // ---------- 2 ----------
  ex(2,'Masa de sacarosa para bajar 2,0 mmHg',
   consigna('¿Cuántos gramos de sacarosa se deben agregar a 552 g de agua para obtener una solución cuya presión de vapor sea 2,0 mmHg inferior a la del agua pura a 20 °C? (La presión de vapor del agua a 20 °C es 17,5 mmHg).'),
   step('1. Datos a mano',datos([
     ['Masa de agua','552 g','consigna'],
     ['Descenso Δp','2,0 mmHg','consigna: “2,0 mmHg inferior”'],
     ['p⁰ del agua a 20 °C','17,5 mmHg','consigna'],
     ['M de la sacarosa','342 g/mol','C 12, H 1, O 16'],
     ['M del agua','18 g/mol','H 1, O 16']]))+
   assume('Sacarosa no volátil y no electrolito (i = 1). Solución ideal.')+
   step('2. Leer bien la consigna',`<p>“2,0 mmHg <b>inferior</b>” es el <b>descenso</b> Δp, no la presión final. La presión final sería 17,5 − 2,0 = 15,5 mmHg.</p>`+
     sym([[R`\Delta p`,'descenso de la presión de vapor','mmHg'],[R`x_{\mathrm{st}}`,'fracción molar del soluto','sin unidad']])+
     chain([R`\Delta p=x_{\mathrm{st}}\,p^0_{\mathrm{sv}}`,'Raoult escrita con el descenso']))+
   step('3. Fracción molar del soluto',chain(
     R`x_{\mathrm{st}}=\frac{\Delta p}{p^0_{\mathrm{sv}}}`,
     R`x_{\mathrm{st}}=\frac{2{,}0}{17{,}5}`,
     R`x_{\mathrm{st}}\approx0{,}11429`))+
   step('4. Moles de agua',chain(R`n_{\mathrm{sv}}=\frac{552\ \mathrm{g}}{18\ \mathrm{g/mol}}`,R`n_{\mathrm{sv}}\approx30{,}667\ \mathrm{mol}`))+
   step('5. Despeje de los moles de sacarosa',`<p>Parto de la definición de fracción molar y despejo n<sub>st</sub> ${simple('paso a paso, sin aproximar')}:</p>`+chain(
     R`x_{\mathrm{st}}=\frac{n_{\mathrm{st}}}{n_{\mathrm{st}}+n_{\mathrm{sv}}}`,
     [R`x_{\mathrm{st}}\,(n_{\mathrm{st}}+n_{\mathrm{sv}})=n_{\mathrm{st}}`,'paso el denominador multiplicando'],
     [R`x_{\mathrm{st}}\,n_{\mathrm{sv}}=n_{\mathrm{st}}-x_{\mathrm{st}}\,n_{\mathrm{st}}`,'agrupo n<sub>st</sub> de un lado'],
     [R`x_{\mathrm{st}}\,n_{\mathrm{sv}}=n_{\mathrm{st}}\,(1-x_{\mathrm{st}})`,'saco factor común'],
     R`n_{\mathrm{st}}=\frac{x_{\mathrm{st}}\,n_{\mathrm{sv}}}{1-x_{\mathrm{st}}}`,
     R`n_{\mathrm{st}}=\frac{0{,}11429\cdot30{,}667}{0{,}88571}`,
     R`n_{\mathrm{st}}\approx3{,}957\ \mathrm{mol}`))+
   step('6. Masa de sacarosa',chain(R`m=n\,M`,R`m=3{,}957\ \mathrm{mol}\cdot342\ \mathrm{g/mol}`,R`m\approx1353\ \mathrm{g}`))+
   warn('Error típico',`<p>Aproximar x<sub>st</sub> ≈ n<sub>st</sub>/n<sub>sv</sub> da ≈ 1199 g: acá la solución es muy concentrada y esa aproximación <b>no</b> sirve. Hay que usar el despeje exacto.</p>`)+
   guia('1348,3 g','Con el despeje exacto y los datos dados da ≈ 1353 g; la diferencia (≈ 0,4 %) viene de redondear valores intermedios. El planteo es el mismo y ambos resultados se leen como ≈ 1,35 kg de sacarosa.'),
   'm ≈ 1353 g de sacarosa (la guía: 1348,3 g, por redondeo)');

  // ---------- 3 ----------
  ex(3,'Alcanfor en benceno',
   consigna('La presión de vapor del benceno es 100,0 mmHg a 26,1 °C. Calcule la presión de vapor de una solución que contiene 24,6 g de alcanfor (C₁₀H₁₆O) disueltos en 98,5 g de benceno. (El alcanfor es un sólido de baja volatilidad).'),
   step('1. Datos a mano',datos([
     ['p⁰ del benceno a 26,1 °C','100,0 mmHg','consigna'],
     ['Masa de alcanfor (soluto)','24,6 g','consigna'],
     ['Masa de benceno (solvente)','98,5 g','consigna'],
     ['M del alcanfor C₁₀H₁₆O','10·12 + 16·1 + 16 = 152 g/mol','C 12, H 1, O 16'],
     ['M del benceno C₆H₆','6·12 + 6·1 = 78 g/mol','C 12, H 1']]))+
   assume('“Baja volatilidad” → se toma el alcanfor como <b>no volátil</b>. Molecular: i = 1. El solvente ahora es el <b>benceno</b>, no el agua.')+
   step('2. ¿Qué propiedad es?',`<p>Presión de vapor → <b>Raoult</b>.</p>`+chain(R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^0_{\mathrm{sv}}`))+
   step('3. Moles',chain(
     [R`n_{\mathrm{st}}=\frac{24{,}6}{152}\approx0{,}1618\ \mathrm{mol}`,'alcanfor'],
     [R`n_{\mathrm{sv}}=\frac{98{,}5}{78}\approx1{,}2628\ \mathrm{mol}`,'benceno']))+
   step('4. Fracción molar del benceno',chain(
     R`x_{\mathrm{sv}}=\frac{1{,}2628}{1{,}2628+0{,}1618}`,
     R`x_{\mathrm{sv}}=\frac{1{,}2628}{1{,}4247}`,
     R`x_{\mathrm{sv}}\approx0{,}8864`))+
   step('5. Raoult',chain(R`p_{\mathrm{sc}}=0{,}8864\cdot100{,}0\ \mathrm{mmHg}`,R`p_{\mathrm{sc}}\approx88{,}64\ \mathrm{mmHg}`))+
   guia('88,63 mmHg','Da 88,64 mmHg: la diferencia está en la última cifra y es sólo de redondeo. ✔'),
   'p<sub>sc</sub> ≈ 88,6 mmHg (guía: 88,63 mmHg)');

  // ---------- 4 ----------
  ex(4,'Masa de urea para bajar 2,50 mmHg',
   consigna('¿Cuántos gramos de urea (H₂NCONH₂) deben agregarse a 450 g de agua para dar una solución cuya presión de vapor sea inferior en 2,50 mmHg a la del agua pura a 30 °C? (La presión de vapor del agua pura a 30 °C es 31,8 mmHg).'),
   step('1. Datos a mano',datos([
     ['Masa de agua','450 g','consigna'],
     ['Descenso Δp','2,50 mmHg','consigna: “inferior en 2,50 mmHg”'],
     ['p⁰ del agua a 30 °C','31,8 mmHg','consigna'],
     ['M de la urea CH₄N₂O','12 + 4·1 + 2·14 + 16 = 60 g/mol','C 12, H 1, N 14, O 16'],
     ['M del agua','18 g/mol','']]))+
   assume('Urea no volátil y molecular (i = 1).')+
   step('2. Fracción molar del soluto',`<p>Es el mismo tipo de problema que el 2: el dato es el <b>descenso</b>.</p>`+chain(
     R`x_{\mathrm{st}}=\frac{\Delta p}{p^0_{\mathrm{sv}}}`,R`x_{\mathrm{st}}=\frac{2{,}50}{31{,}8}`,R`x_{\mathrm{st}}\approx0{,}07862`))+
   step('3. Moles de agua',chain(R`n_{\mathrm{sv}}=\frac{450}{18}`,R`n_{\mathrm{sv}}=25{,}0\ \mathrm{mol}`))+
   step('4. Moles de urea (mismo despeje del ej. 2)',chain(
     R`n_{\mathrm{st}}=\frac{x_{\mathrm{st}}\,n_{\mathrm{sv}}}{1-x_{\mathrm{st}}}`,
     R`n_{\mathrm{st}}=\frac{0{,}07862\cdot25{,}0}{0{,}92138}`,
     R`n_{\mathrm{st}}\approx2{,}133\ \mathrm{mol}`))+
   step('5. Masa de urea',chain(R`m=2{,}133\ \mathrm{mol}\cdot60\ \mathrm{g/mol}`,R`m\approx128{,}0\ \mathrm{g}`))+
   idea('Control',chain(R`x_{\mathrm{sv}}=\frac{25{,}0}{25{,}0+2{,}133}\approx0{,}92138`,R`p_{\mathrm{sc}}=0{,}92138\cdot31{,}8\approx29{,}30\ \mathrm{mmHg}`,R`31{,}8-29{,}30=2{,}50\ \mathrm{mmHg}`)+'<p>Baja exactamente lo pedido. ✔</p>')+
   guia('128,64 g','Con los datos de la consigna el resultado exacto es ≈ 128,0 g (el control de arriba lo confirma: baja justo 2,50 mmHg). La diferencia con la guía (≈ 0,5 %) es de redondeo intermedio.'),
   'm ≈ 128 g de urea (la guía: 128,64 g, por redondeo)');

  // ---------- 5 ----------
  ex(5,'Naftaleno en benceno: ebullición y congelación',
   consigna('¿Cuáles son los puntos de ebullición y de congelación de una solución 2,47 m de naftaleno en benceno? (Los puntos de ebullición y de congelación del benceno son 80,1 °C y 5,5 °C respectivamente).',solv('Benceno')),
   step('1. Datos a mano',datos([
     ['Molalidad b','2,47 mol/kg','consigna (“2,47 m”)'],
     ['T⁰<sub>eb</sub> del benceno','80,1 °C','consigna / tabla'],
     ['T⁰<sub>f</sub> del benceno','5,5 °C','consigna / tabla'],
     ['K<sub>eb</sub> del benceno','2,53 °C·kg/mol','tabla de la guía'],
     ['K<sub>f</sub> del benceno','5,12 °C·kg/mol','tabla de la guía']])+solv('Benceno'))+
   assume('Naftaleno molecular y no volátil: i = 1.')+
   step('2. ¿Qué propiedades son?',`<p>Dos temperaturas → <b>ascenso ebulloscópico</b> y <b>descenso crioscópico</b>. Las dos usan molalidad, que ya me dan.</p>`+
     sym([[R`\Delta T_{eb}`,'ascenso ebulloscópico','°C'],[R`\Delta T_f`,'descenso crioscópico','°C'],['b','molalidad','mol/kg']])+
     chain(R`\Delta T_{eb}=K_{eb}\,b`,R`\Delta T_f=K_f\,b`))+
   step('3. Punto de ebullición',`<p>La solución hierve <b>más arriba</b> que el benceno puro ${simple('se suma')}.</p>`+chain(
     R`\Delta T_{eb}=2{,}53\cdot2{,}47`,R`\Delta T_{eb}\approx6{,}25\ \mathrm{°C}`,
     R`T_{eb}=T^0_{eb}+\Delta T_{eb}`,R`T_{eb}=80{,}1+6{,}25`,R`T_{eb}\approx86{,}35\ \mathrm{°C}`))+
   step('4. Punto de congelación',`<p>La solución congela <b>más abajo</b> que el benceno puro ${simple('se resta')}.</p>`+chain(
     R`\Delta T_f=5{,}12\cdot2{,}47`,R`\Delta T_f\approx12{,}65\ \mathrm{°C}`,
     R`T_f=T^0_f-\Delta T_f`,R`T_f=5{,}5-12{,}65`,R`T_f\approx-7{,}15\ \mathrm{°C}`))+
   warn('Error típico',`<p>Usar las constantes del <b>agua</b> (0,52 y 1,86). Las constantes dependen del <b>solvente</b>: acá es benceno.</p>`)+
   ok('86,35 °C y −7,15 °C'),
   'T<sub>eb</sub> ≈ 86,35 °C · T<sub>f</sub> ≈ −7,15 °C');

  // ---------- 6 ----------
  ex(6,'Fórmula de una feromona',
   consigna('Las feromonas son compuestos secretados por las hembras de muchas especies de insectos para atraer a los machos. Uno de estos compuestos contiene 80,78 % de C, 13,56 % de H y 5,66 % de O. Una solución de 1,00 g de esta feromona en 8,50 g de benceno se congela a 3,37 °C. ¿Cuáles son la fórmula molecular y la masa molar del compuesto?',solv('Benceno')),
   step('1. Datos a mano',datos([
     ['Composición','80,78 % C · 13,56 % H · 5,66 % O','consigna'],
     ['Masa de feromona','1,00 g','consigna'],
     ['Masa de benceno','8,50 g = 0,00850 kg','consigna'],
     ['T<sub>f</sub> de la solución','3,37 °C','consigna'],
     ['T⁰<sub>f</sub> del benceno','5,5 °C','tabla de la guía'],
     ['K<sub>f</sub> del benceno','5,12 °C·kg/mol','tabla de la guía'],
     ['Masas atómicas','C 12 · H 1 · O 16 g/mol','']])+solv('Benceno'))+
   assume('La feromona es molecular (i = 1) y no volátil.')+
   step('2. Plan',`<p>Son dos problemas encadenados: <b>(a)</b> la composición centesimal da la <b>fórmula mínima</b>; <b>(b)</b> la crioscopía da la <b>masa molar</b>; <b>(c)</b> comparando las dos sale la <b>fórmula molecular</b>.</p>`)+
   step('3. Fórmula mínima (base: 100 g)',`<p>En 100 g de compuesto hay 80,78 g de C, 13,56 g de H y 5,66 g de O. Paso cada masa a moles de átomos y divido por el menor:</p>`+
     table(['Elemento','Masa en 100 g','Moles de átomos','÷ menor (0,354)','Subíndice'],[
       ['C','80,78 g','80,78 / 12 = 6,732','19,03','19'],
       ['H','13,56 g','13,56 / 1 = 13,56','38,33','38'],
       ['O','5,66 g','5,66 / 16 = 0,354','1','1']])+
     `<p>Fórmula mínima: <b>C₁₉H₃₈O</b>.</p>`+chain(R`M_{\mathrm{FM}}=19\cdot12+38\cdot1+16=282\ \mathrm{g/mol}`))+
   step('4. Descenso crioscópico',chain(R`\Delta T_f=T^0_f-T_f`,R`\Delta T_f=5{,}5-3{,}37`,R`\Delta T_f=2{,}13\ \mathrm{°C}`))+
   step('5. Molalidad',chain(R`b=\frac{\Delta T_f}{K_f}`,R`b=\frac{2{,}13}{5{,}12}`,R`b\approx0{,}4160\ \mathrm{mol/kg}`))+
   step('6. Moles de feromona',`<p>b son moles por kg de solvente: multiplico por los kg de benceno.</p>`+chain(
     R`n=b\,m_{\mathrm{sv}}`,R`n=0{,}4160\cdot0{,}00850`,R`n\approx3{,}536\cdot10^{-3}\ \mathrm{mol}`))+
   step('7. Masa molar',chain(R`M=\frac{m_{\mathrm{st}}}{n}`,R`M=\frac{1{,}00\ \mathrm{g}}{3{,}536\cdot10^{-3}\ \mathrm{mol}}`,R`M\approx282{,}8\ \mathrm{g/mol}`))+
   step('8. Fórmula molecular',`<p>¿Cuántas fórmulas mínimas entran en la molécula?</p>`+chain(
     R`k=\frac{M}{M_{\mathrm{FM}}}=\frac{282{,}8}{282}\approx1`)+`<p>k = 1 → la fórmula molecular es igual a la mínima: <b>C₁₉H₃₈O</b>.</p>`)+
   ok('C₁₉H₃₈O y 282,8 g/mol'),
   'Fórmula molecular C₁₉H₃₈O · M ≈ 282,8 g/mol');

  // ---------- 7 ----------
  ex(7,'Molalidad y masa molar del mesitol',
   consigna('Se observa que una solución de 0,85 g del compuesto orgánico mesitol en 100,0 g de benceno tiene un punto de congelación de 5,16 °C. ¿Cuál es la molalidad del mesitol en la solución y la masa molar del mesitol?',solv('Benceno')),
   step('1. Datos a mano',datos([
     ['Masa de mesitol','0,85 g','consigna'],
     ['Masa de benceno','100,0 g = 0,1000 kg','consigna'],
     ['T<sub>f</sub> de la solución','5,16 °C','consigna'],
     ['T⁰<sub>f</sub> del benceno','5,5 °C','tabla de la guía'],
     ['K<sub>f</sub> del benceno','5,12 °C·kg/mol','tabla de la guía']])+solv('Benceno'))+
   assume('Mesitol molecular: i = 1.')+
   step('2. Descenso',chain(R`\Delta T_f=5{,}5-5{,}16`,R`\Delta T_f=0{,}34\ \mathrm{°C}`))+
   step('3. Molalidad (primera respuesta)',chain(R`b=\frac{\Delta T_f}{K_f}`,R`b=\frac{0{,}34}{5{,}12}`,R`b\approx0{,}0664\ \mathrm{mol/kg}`))+
   step('4. Moles de mesitol',chain(R`n=b\,m_{\mathrm{sv}}`,R`n=0{,}0664\cdot0{,}1000`,R`n\approx6{,}64\cdot10^{-3}\ \mathrm{mol}`))+
   step('5. Masa molar (segunda respuesta)',chain(R`M=\frac{0{,}85\ \mathrm{g}}{6{,}64\cdot10^{-3}\ \mathrm{mol}}`,R`M\approx128\ \mathrm{g/mol}`))+
   idea('Control',`<p>El mesitol (2,4,6-trimetilfenol, C₉H₁₂O) tiene M = 9·12 + 12 + 16 = 136 g/mol: el valor experimental es razonable para un dato de laboratorio con un descenso tan chico (0,34 °C).</p>`)+
   ok('0,0664 m y 128 g/mol'),
   'b ≈ 0,0664 mol/kg · M ≈ 128 g/mol');

  // ---------- 8 ----------
  ex(8,'Fórmula molecular a partir de C₆H₅P',
   consigna('Se observa que una solución de 2,50 g de un compuesto cuya fórmula empírica es C₆H₅P en 25 g de benceno se congela a 4,3 °C. Calcule la masa molar del soluto y su fórmula molecular.',solv('Benceno')),
   step('1. Datos a mano',datos([
     ['Masa de soluto','2,50 g','consigna'],
     ['Masa de benceno','25 g = 0,025 kg','consigna'],
     ['T<sub>f</sub> de la solución','4,3 °C','consigna'],
     ['T⁰<sub>f</sub> del benceno','5,5 °C','tabla de la guía'],
     ['K<sub>f</sub> del benceno','5,12 °C·kg/mol','tabla de la guía'],
     ['Fórmula empírica','C₆H₅P → 6·12 + 5·1 + 31 = 108 g/mol','C 12, H 1, P 31']])+solv('Benceno'))+
   assume('Soluto molecular: i = 1.')+
   step('2. Descenso y molalidad',chain(R`\Delta T_f=5{,}5-4{,}3=1{,}2\ \mathrm{°C}`,R`b=\frac{1{,}2}{5{,}12}`,R`b\approx0{,}2344\ \mathrm{mol/kg}`))+
   step('3. Moles',chain(R`n=0{,}2344\cdot0{,}025`,R`n\approx5{,}859\cdot10^{-3}\ \mathrm{mol}`))+
   step('4. Masa molar',chain(R`M=\frac{2{,}50}{5{,}859\cdot10^{-3}}`,R`M\approx426{,}67\ \mathrm{g/mol}`))+
   step('5. Fórmula molecular',chain(R`k=\frac{426{,}67}{108}\approx3{,}95\approx4`)+
     `<p>Se multiplican <b>todos</b> los subíndices de C₆H₅P por 4: <b>C₂₄H₂₀P₄</b> (M = 432 g/mol, cercano al valor experimental).</p>`)+
   warn('Ojo al redondear k',`<p>k tiene que ser entero: 3,95 se redondea a 4 porque el dato experimental tiene error. No se escribe “C₂₃,₇…”.</p>`)+
   ok('426,67 g/mol y C₂₄H₂₀P₄'),
   'M ≈ 426,67 g/mol · fórmula molecular C₂₄H₂₀P₄');

  // ---------- 9 ----------
  ex(9,'Sólido de la goma arábiga en bifenilo',
   consigna('El análisis elemental de un sólido orgánico extraído de la goma arábiga muestra que contiene 40,0 % de C, 6,7 % de H y 53,3 % de O. Una solución de 0,650 g del sólido en 27,8 g del disolvente bifenilo dio una depresión en el punto de congelación de 1,56 °C. Calcule la masa molar y la fórmula molecular del sólido (K<sub>f</sub> del bifenilo es 8 °C/m).'),
   step('1. Datos a mano',datos([
     ['Composición','40,0 % C · 6,7 % H · 53,3 % O','consigna'],
     ['Masa de sólido','0,650 g','consigna'],
     ['Masa de bifenilo','27,8 g = 0,0278 kg','consigna'],
     ['ΔT<sub>f</sub> (“depresión”)','1,56 °C','consigna: ya es el descenso'],
     ['K<sub>f</sub> del bifenilo','8 °C·kg/mol','consigna (no está en la tabla)'],
     ['Masas atómicas','C 12 · H 1 · O 16','']]))+
   assume('Soluto molecular: i = 1.')+
   step('2. Fórmula mínima (base: 100 g)',table(['Elemento','Masa en 100 g','Moles de átomos','÷ menor (3,331)','Subíndice'],[
       ['C','40,0 g','40,0 / 12 = 3,333','1,00','1'],
       ['H','6,7 g','6,7 / 1 = 6,7','2,01','2'],
       ['O','53,3 g','53,3 / 16 = 3,331','1','1']])+
     `<p>Fórmula mínima: <b>CH₂O</b> → M<sub>FM</sub> = 12 + 2 + 16 = 30 g/mol.</p>`)+
   step('3. Molalidad',`<p>“Depresión del punto de congelación” = descenso: ya tengo ΔT<sub>f</sub>.</p>`+chain(R`b=\frac{1{,}56}{8}`,R`b=0{,}195\ \mathrm{mol/kg}`))+
   step('4. Moles y masa molar',chain(R`n=0{,}195\cdot0{,}0278`,R`n\approx5{,}421\cdot10^{-3}\ \mathrm{mol}`,R`M=\frac{0{,}650}{5{,}421\cdot10^{-3}}`,R`M\approx119{,}9\approx120\ \mathrm{g/mol}`))+
   step('5. Fórmula molecular',chain(R`k=\frac{120}{30}=4`)+`<p>(CH₂O)×4 = <b>C₄H₈O₄</b>.</p>`)+
   ok('120 g/mol y C₄H₈O₄'),
   'M ≈ 120 g/mol · fórmula molecular C₄H₈O₄');

  // ---------- 10 ----------
  ex(10,'Fórmula molecular por presión osmótica',
   consigna('Se disuelve en agua una cantidad de 7,480 g de un compuesto orgánico para hacer 300,0 mL de disolución. La disolución tiene una presión osmótica de 1,43 atm a 27 °C. El análisis de este compuesto muestra que contiene 41,8 % de C, 4,7 % de H, 37,3 % de O y 16,3 % de N. Calcule la fórmula molecular del compuesto.'),
   step('1. Datos a mano',datos([
     ['Masa de compuesto','7,480 g','consigna'],
     ['Volumen de solución','300,0 mL = 0,3000 L','consigna'],
     ['Π','1,43 atm','consigna'],
     ['Temperatura','27 °C = 300 K','T = t + 273'],
     ['R','0,082 L·atm/(mol·K)','constante de los gases'],
     ['Composición','41,8 % C · 4,7 % H · 37,3 % O · 16,3 % N','consigna'],
     ['Masas atómicas','C 12 · H 1 · O 16 · N 14','']]))+
   assume('Compuesto molecular (no se disocia): i = 1.')+
   step('2. ¿Qué propiedad es?',`<p>Presión osmótica → <b>Π V = n R T</b>, con V de <b>solución</b> en litros y T en <b>kelvin</b>.</p>`+
     sym([[R`\Pi`,'presión osmótica','atm'],['V','volumen de solución','L'],['n','moles de soluto','mol'],['R','0,082','L·atm/(mol·K)'],['T','temperatura absoluta','K']]))+
   step('3. Moles de soluto',chain(R`n=\frac{\Pi\,V}{R\,T}`,R`n=\frac{1{,}43\cdot0{,}3000}{0{,}082\cdot300}`,R`n=\frac{0{,}429}{24{,}6}`,R`n\approx0{,}01744\ \mathrm{mol}`))+
   step('4. Masa molar',chain(R`M=\frac{7{,}480\ \mathrm{g}}{0{,}01744\ \mathrm{mol}}`,R`M\approx428{,}9\ \mathrm{g/mol}`))+
   step('5. Fórmula mínima (base: 100 g)',table(['Elemento','Masa en 100 g','Moles de átomos','÷ menor (1,164)','Subíndice'],[
       ['C','41,8 g','41,8 / 12 = 3,483','2,99','3'],
       ['H','4,7 g','4,7 / 1 = 4,7','4,04','4'],
       ['O','37,3 g','37,3 / 16 = 2,331','2,00','2'],
       ['N','16,3 g','16,3 / 14 = 1,164','1','1']])+
     `<p>Fórmula mínima: <b>C₃H₄O₂N</b> → M<sub>FM</sub> = 3·12 + 4 + 2·16 + 14 = 86 g/mol.</p>`)+
   step('6. Fórmula molecular',chain(R`k=\frac{428{,}9}{86}\approx4{,}99\approx5`)+`<p>(C₃H₄O₂N)×5 = <b>C₁₅H₂₀O₁₀N₅</b>.</p>`)+
   ok('C₁₅H₂₀O₁₀N₅'),
   'M ≈ 429 g/mol · fórmula molecular C₁₅H₂₀O₁₀N₅');

  // ---------- 11 ----------
  ex(11,'Presión osmótica de urea 1,36 M',
   consigna('¿Cuál es la presión osmótica (en atm) de una solución acuosa de urea 1,36 M a 22 °C?'),
   step('1. Datos a mano',datos([
     ['Concentración molar C','1,36 mol/L','consigna (“1,36 M”)'],
     ['Temperatura','22 °C = 295 K','T = t + 273'],
     ['R','0,082 L·atm/(mol·K)','constante de los gases'],
     ['i de la urea','1','no electrolito']]))+
   step('2. Fórmula',sym([[R`\Pi`,'presión osmótica','atm'],['C','molaridad','mol/L'],['T','temperatura absoluta','K']])+chain(R`\Pi=C\,R\,T`))+
   step('3. Cálculo',chain(R`\Pi=1{,}36\cdot0{,}082\cdot295`,R`\Pi\approx32{,}9\ \mathrm{atm}`))+
   warn('Error típico',`<p>Poner 22 en lugar de 295: con °C la presión osmótica saldría ≈ 2,45 atm, que está mal. Siempre <b>kelvin</b>.</p>`)+
   ok('32,9 atm'),
   'Π ≈ 32,9 atm');

  // ---------- 12 ----------
  ex(12,'Masa molar de un carbohidrato (con densidad)',
   consigna('Una disolución de 6,85 g de un carbohidrato en 100,0 g de agua tiene una densidad de 1,024 g/mL y una presión osmótica de 4,61 atm a 20 °C. Calcule la masa molar del carbohidrato.'),
   step('1. Datos a mano',datos([
     ['Masa de carbohidrato','6,85 g','consigna'],
     ['Masa de agua','100,0 g','consigna'],
     ['Densidad de la <b>solución</b>','1,024 g/mL','consigna'],
     ['Π','4,61 atm','consigna'],
     ['Temperatura','20 °C = 293 K','T = t + 273'],
     ['R','0,082 L·atm/(mol·K)','']]))+
   assume('Carbohidrato molecular: i = 1.')+
   step('2. ¿Para qué está la densidad?',`<p>La presión osmótica necesita el <b>volumen de solución</b>, y me dan masas. La densidad es el puente: ${simple('volumen = masa ÷ densidad, usando la masa de SOLUCIÓN')}</p>`+chain(
     R`m_{\mathrm{sc}}=m_{\mathrm{st}}+m_{\mathrm{sv}}`,R`m_{\mathrm{sc}}=6{,}85+100{,}0=106{,}85\ \mathrm{g}`,
     R`V_{\mathrm{sc}}=\frac{m_{\mathrm{sc}}}{\rho_{\mathrm{sc}}}`,R`V_{\mathrm{sc}}=\frac{106{,}85\ \mathrm{g}}{1{,}024\ \mathrm{g/mL}}`,R`V_{\mathrm{sc}}\approx104{,}35\ \mathrm{mL}=0{,}10435\ \mathrm{L}`))+
   step('3. Moles',chain(R`n=\frac{\Pi\,V}{R\,T}`,R`n=\frac{4{,}61\cdot0{,}10435}{0{,}082\cdot293}`,R`n=\frac{0{,}4810}{24{,}026}`,R`n\approx0{,}02002\ \mathrm{mol}`))+
   step('4. Masa molar',chain(R`M=\frac{6{,}85\ \mathrm{g}}{0{,}02002\ \mathrm{mol}}`,R`M\approx342\ \mathrm{g/mol}`))+
   warn('Error típico',`<p>Usar 100 mL (el agua) como volumen: da ≈ 357 g/mol. El volumen tiene que ser el de la <b>solución</b>.</p>`)+
   guia('345,5 g/mol','Con los datos de la consigna el cálculo da ≈ 342 g/mol (≈ 1 % menos). La diferencia es de redondeo. Dato útil: 342 g/mol es justo la masa molar de la <b>sacarosa</b> (C₁₂H₂₂O₁₁), un carbohidrato, así que el resultado es coherente.'),
   'M ≈ 342 g/mol (la guía: 345,5 g/mol, por redondeo)');

  // =====================================================================
  // SEGUNDA PARTE · SOLUTOS IÓNICOS (factor de van 't Hoff i)
  // =====================================================================
  const exercises2i=[];
  const exi=(n,title,statement,solution,answer)=>exercises2i.push({n,title,statement,solution,answer});
  const tablaI=(rows)=>`<p class="kitTableCaption"><b>📋 Factor de van ’t Hoff (disociación total)</b></p>`+table(['Soluto','Disociación','i (partículas por fórmula)'],rows);

  // ---------- S1 ----------
  exi(1,'Presión osmótica del agua de mar',
   consigna('El agua de mar contiene 3,4 g de sales por cada litro de solución. Suponiendo que el soluto consiste totalmente en cloruro de sodio, calcule la presión osmótica del agua de mar a 20 °C.'),
   step('1. Datos a mano',datos([
     ['Masa de sal','3,4 g por 1 L de solución','consigna'],
     ['M del NaCl','23 + 35,5 = 58,5 g/mol','Na 23, Cl 35,5'],
     ['Temperatura','20 °C = 293 K','T = t + 273'],
     ['R','0,082 L·atm/(mol·K)','']])+tablaI([['NaCl','NaCl → Na⁺ + Cl⁻','2']]))+
   assume('Disociación total del NaCl (i = 2) y solución ideal.')+
   step('2. ¿Qué cambia con un soluto iónico?',`<p>Las propiedades coligativas cuentan <b>partículas</b>. Cada NaCl da <b>dos</b> iones, así que se multiplica por i:</p>`+chain(R`\Pi=i\,C\,R\,T`))+
   step('3. Molaridad',chain(R`n=\frac{3{,}4\ \mathrm{g}}{58{,}5\ \mathrm{g/mol}}\approx0{,}05812\ \mathrm{mol}`,[R`C=\frac{0{,}05812\ \mathrm{mol}}{1\ \mathrm{L}}=0{,}05812\ \mathrm{M}`,'ya está “por litro de solución”']))+
   step('4. Presión osmótica',chain(R`\Pi=2\cdot0{,}05812\cdot0{,}082\cdot293`,R`\Pi\approx2{,}79\ \mathrm{atm}`))+
   guia('2,787 atm','Con los datos da 2,793 atm: coinciden en 2,79 atm; la diferencia en la tercera decimal es de redondeo.')+
   note('Para pensar','<p>El agua de mar real tiene ≈ 35 g de sales por litro (unas diez veces más) y Π ≈ 27 atm. El dato de la guía es un caso didáctico.</p>'),
   'Π ≈ 2,79 atm (guía: 2,787 atm)');

  // ---------- S2 ----------
  exi(2,'Anticongelante: propilenglicol',
   consigna('Uno de los anticongelantes más usados en motores de combustión interna es el propilenglicol (C₃H₈O₂, sustancia orgánica covalente, no electrolito). La densidad del propilenglicol es 1,0361 g/mL. <b>a)</b> Calcular el volumen de propilenglicol que se necesitará añadir a 1 litro de agua para preparar una solución que permanezca líquida hasta −10 °C. <b>b)</b> ¿A qué temperatura empezará a hervir la solución preparada con el anticongelante?',solv('Agua')),
   step('1. Datos a mano',datos([
     ['Agua','1 L ≈ 1000 g = 1,000 kg','densidad del agua ≈ 1 g/mL'],
     ['T<sub>f</sub> buscada','−10 °C','consigna'],
     ['Densidad del propilenglicol','1,0361 g/mL','consigna'],
     ['M del C₃H₈O₂','3·12 + 8·1 + 2·16 = 76 g/mol','C 12, H 1, O 16'],
     ['K<sub>f</sub> del agua · T⁰<sub>f</sub>','1,86 °C·kg/mol · 0 °C','tabla de la guía'],
     ['K<sub>eb</sub> del agua · T⁰<sub>eb</sub>','0,52 °C·kg/mol · 100 °C','tabla de la guía']])+solv('Agua'))+
   assume('No electrolito: i = 1 (aunque está en la segunda parte, este soluto <b>no</b> se disocia).')+
   step('a) 2. Descenso necesario',`<p>Que “permanezca líquida hasta −10 °C” significa que su punto de congelación sea −10 °C.</p>`+chain(R`\Delta T_f=T^0_f-T_f=0-(-10)`,R`\Delta T_f=10\ \mathrm{°C}`))+
   step('a) 3. Molalidad',chain(R`b=\frac{\Delta T_f}{K_f}=\frac{10}{1{,}86}`,R`b\approx5{,}376\ \mathrm{mol/kg}`))+
   step('a) 4. Moles y masa de propilenglicol',chain([R`n=b\,m_{\mathrm{sv}}=5{,}376\cdot1{,}000`,'1 kg de agua'],R`n\approx5{,}376\ \mathrm{mol}`,R`m=5{,}376\cdot76`,R`m\approx408{,}6\ \mathrm{g}`))+
   step('a) 5. Volumen (con la densidad del propilenglicol)',chain(R`V=\frac{m}{\rho}=\frac{408{,}6\ \mathrm{g}}{1{,}0361\ \mathrm{g/mL}}`,R`V\approx394{,}4\ \mathrm{mL}`))+
   step('b) 6. Punto de ebullición',`<p>La <b>misma</b> molalidad sirve para el ascenso, pero con la constante ebulloscópica del agua:</p>`+chain(R`\Delta T_{eb}=K_{eb}\,b=0{,}52\cdot5{,}376`,R`\Delta T_{eb}\approx2{,}80\ \mathrm{°C}`,R`T_{eb}=100+2{,}80`,R`T_{eb}\approx102{,}8\ \mathrm{°C}`))+
   idea('Por qué sirve en el motor',`<p>El mismo soluto <b>baja</b> el punto de congelación y <b>sube</b> el de ebullición: protege del congelamiento en invierno y de la ebullición en verano.</p>`)+
   guia('394,3 mL y 102,8 °C','a) da 394,37 mL → 394,4 mL redondeando (la guía lo trunca a 394,3). b) coincide: 102,8 °C. ✔'),
   'a) V ≈ 394,4 mL de propilenglicol (guía: 394,3 mL) · b) T<sub>eb</sub> ≈ 102,8 °C');

  // ---------- S3 ----------
  exi(3,'Soluciones isotónicas: AlCl₃ y soluto desconocido',
   consigna('43 g de cloruro de aluminio están disueltos en 800 cm³ de una solución acuosa a 23 °C. Otra solución acuosa, isotónica con la anterior, contiene 50,4 g de un soluto desconocido (no electrolito) cada 500 mL de solución, a 20 °C. La composición centesimal del soluto es: 38,71 % de carbono, 9,677 % de hidrógeno y 51,613 % de oxígeno. Calcular la masa molar del soluto desconocido, su fórmula mínima y molecular.'),
   step('1. Datos a mano',datos([
     ['Solución 1: AlCl₃','43 g en 800 cm³ = 0,800 L, a 23 °C = 296 K','consigna'],
     ['M del AlCl₃','27 + 3·35,5 = 133,5 g/mol','Al 27, Cl 35,5'],
     ['Solución 2: desconocido','50,4 g en 500 mL = 0,500 L, a 20 °C = 293 K','consigna'],
     ['Composición del desconocido','38,71 % C · 9,677 % H · 51,613 % O','consigna'],
     ['R','0,082 L·atm/(mol·K)','']])+tablaI([['AlCl₃','AlCl₃ → Al³⁺ + 3 Cl⁻','4'],['Soluto desconocido','no electrolito','1']]))+
   assume('Disociación total del AlCl₃ (i = 4). “Isotónica” se toma como <b>igual presión osmótica</b>.')+
   step('2. Idea clave',`<p>Isotónicas → <b>Π₁ = Π₂</b>. Calculo Π con el AlCl₃ y uso ese valor en la segunda solución. ${simple('las temperaturas son distintas, así que no alcanza con igualar concentraciones: hay que pasar por Π')}</p>`)+
   step('3. Π de la solución de AlCl₃',chain(
     R`n_1=\frac{43}{133{,}5}\approx0{,}3221\ \mathrm{mol}`,
     R`C_1=\frac{0{,}3221}{0{,}800}\approx0{,}4026\ \mathrm{M}`,
     R`\Pi_1=i\,C_1\,R\,T_1=4\cdot0{,}4026\cdot0{,}082\cdot296`,
     R`\Pi_1\approx39{,}09\ \mathrm{atm}`))+
   step('4. Molaridad de la segunda solución',chain([R`\Pi_2=\Pi_1=39{,}09\ \mathrm{atm}`,'isotónicas'],R`C_2=\frac{\Pi_2}{R\,T_2}=\frac{39{,}09}{0{,}082\cdot293}`,R`C_2\approx1{,}627\ \mathrm{M}`))+
   step('5. Masa molar del desconocido',chain(R`n_2=C_2\,V_2=1{,}627\cdot0{,}500`,R`n_2\approx0{,}8135\ \mathrm{mol}`,R`M=\frac{50{,}4}{0{,}8135}`,R`M\approx61{,}96\approx62\ \mathrm{g/mol}`))+
   step('6. Fórmula mínima (base: 100 g)',table(['Elemento','Masa en 100 g','Moles de átomos','÷ menor (3,226)','Subíndice'],[
       ['C','38,71 g','38,71 / 12 = 3,226','1','1'],
       ['H','9,677 g','9,677 / 1 = 9,677','3,00','3'],
       ['O','51,613 g','51,613 / 16 = 3,226','1,00','1']])+`<p>Fórmula mínima: <b>CH₃O</b> → M<sub>FM</sub> = 12 + 3 + 16 = 31 g/mol.</p>`)+
   step('7. Fórmula molecular',chain(R`k=\frac{62}{31}=2`)+`<p>(CH₃O)×2 = <b>C₂H₆O₂</b> ${simple('es el etilenglicol, otro anticongelante')}.</p>`)+
   ok('62 g/mol · CH₃O · C₂H₆O₂'),
   'M ≈ 62 g/mol · fórmula mínima CH₃O · fórmula molecular C₂H₆O₂');

  // ---------- S4 ----------
  exi(4,'Misma % m/m, distinta presión de vapor',
   consigna('¿Cuál será la presión de vapor a 20 °C de tres soluciones acuosas que contienen 5 g de tres solutos distintos cada 800 g de solución? Los tres solutos son dicromato de potasio, sacarosa (C₁₂H₂₂O₁₁) y cloruro plúmbico. ¿Por qué varía la presión de vapor de las tres soluciones si todas tienen la misma masa de soluto disuelta en la misma masa de solución, es decir la misma concentración % m/m?'),
   step('1. Datos a mano',datos([
     ['Soluto','5 g en cada solución','consigna'],
     ['Masa de solución','800 g','consigna'],
     ['Masa de agua','800 − 5 = 795 g','solvente = solución − soluto'],
     ['p⁰ del agua a 20 °C','17,5 mmHg = 17,5 Torr','dato del ej. 2 de la primera parte (1 Torr = 1 mmHg)'],
     ['M del K₂Cr₂O₇','2·39 + 2·52 + 7·16 = 294 g/mol','K 39, Cr 52, O 16'],
     ['M de la sacarosa','342 g/mol','C 12, H 1, O 16'],
     ['M del PbCl₄','207,2 + 4·35,5 = 349,2 g/mol','Pb 207,2, Cl 35,5'],
     ['M del agua','18 g/mol','']])+
     tablaI([['Dicromato de potasio K₂Cr₂O₇','K₂Cr₂O₇ → 2 K⁺ + Cr₂O₇²⁻','3'],['Sacarosa C₁₂H₂₂O₁₁','no se disocia','1'],['Cloruro plúmbico PbCl₄','PbCl₄ → Pb⁴⁺ + 4 Cl⁻','5']]))+
   assume('Disociación total de las sales (como plantea la guía) y solución ideal. Los solutos son no volátiles.')+
   step('2. Raoult con partículas',`<p>En la fracción molar hay que contar <b>moles de partículas</b> de soluto: i·n.</p>`+chain(R`x_{\mathrm{sv}}=\frac{n_{\mathrm{sv}}}{n_{\mathrm{sv}}+i\,n_{\mathrm{st}}}`,R`p_{\mathrm{sc}}=x_{\mathrm{sv}}\,p^0`))+
   step('3. Moles de agua (iguales para las tres)',chain(R`n_{\mathrm{sv}}=\frac{795}{18}\approx44{,}167\ \mathrm{mol}`))+
   step('4. Dicromato de potasio (i = 3)',chain(
     R`n=\frac{5}{294}\approx0{,}01701\ \mathrm{mol}`,R`i\,n=3\cdot0{,}01701\approx0{,}05102\ \mathrm{mol}`,
     R`x_{\mathrm{sv}}=\frac{44{,}167}{44{,}167+0{,}05102}\approx0{,}998846`,
     R`p=0{,}998846\cdot17{,}5\approx17{,}480\ \mathrm{Torr}`))+
   step('5. Sacarosa (i = 1)',chain(
     R`n=\frac{5}{342}\approx0{,}01462\ \mathrm{mol}`,
     R`x_{\mathrm{sv}}=\frac{44{,}167}{44{,}167+0{,}01462}\approx0{,}999669`,
     R`p=0{,}999669\cdot17{,}5\approx17{,}494\ \mathrm{Torr}`))+
   step('6. Cloruro plúmbico (i = 5)',chain(
     R`n=\frac{5}{349{,}2}\approx0{,}01432\ \mathrm{mol}`,R`i\,n=5\cdot0{,}01432\approx0{,}07159\ \mathrm{mol}`,
     R`x_{\mathrm{sv}}=\frac{44{,}167}{44{,}167+0{,}07159}\approx0{,}998382`,
     R`p=0{,}998382\cdot17{,}5\approx17{,}472\ \mathrm{Torr}`))+
   step('7. ¿Por qué varía si la % m/m es la misma?',table(['Soluto','Moles de fórmula','i','Moles de partículas','p (Torr)'],[
       ['Sacarosa','0,01462','1','0,01462','17,494 (la más alta)'],
       ['K₂Cr₂O₇','0,01701','3','0,05102','17,480'],
       ['PbCl₄','0,01432','5','0,07159','17,472 (la más baja)']])+
     `<p>Las propiedades coligativas <b>no dependen de la masa</b> de soluto sino del <b>número de partículas</b> disueltas. Los mismos 5 g dan cantidades distintas de partículas porque: <b>(1)</b> cada soluto tiene distinta <b>masa molar</b> (distintos moles con la misma masa), y <b>(2)</b> las sales se <b>disocian</b> en iones (i = 3 y 5), mientras que la sacarosa no (i = 1). Más partículas → menor fracción molar del agua → <b>menor presión de vapor</b>.</p>`)+
   ok('K₂Cr₂O₇ 17,480 Torr · sacarosa 17,494 Torr · PbCl₄ 17,472 Torr'),
   'K₂Cr₂O₇ ≈ 17,480 Torr · sacarosa ≈ 17,494 Torr · PbCl₄ ≈ 17,472 Torr · varía porque cambia el número de partículas (masa molar distinta e i distinto).');

  // ---------- Sección ----------
  const section={key:'qg-guia2',label:'Guía 2 de ejercitación resuelta',kicker:'GUÍA 2 · EJERCICIOS DE PROPIEDADES COLIGATIVAS',html:`
<p>Los 16 ejercicios de la guía <b>“Ejercicios de propiedades coligativas”</b>: la <b>primera parte</b> con solutos no iónicos (1–12) y la <b>segunda parte</b> con solutos iónicos (1–4). Cada resolución empieza con una tabla de <b>datos a mano</b>; cuando hace falta una constante del solvente, la tabla de la guía está ahí mismo.</p>
${idea('Convenciones de esta guía',`<p>Para que los resultados coincidan con las respuestas de la guía se usan: masas atómicas redondeadas (C 12 · H 1 · O 16 · N 14 · P 31 · Na 23 · Al 27 · Cl 35,5 · K 39 · Cr 52 · Pb 207,2 g/mol), M(agua) = 18 g/mol, ${m(R`R=0{,}082\ \tfrac{\mathrm{L\cdot atm}}{\mathrm{mol\cdot K}}`)} y ${m(R`T(\mathrm{K})=t(\mathrm{°C})+273`)}. Cuando un resultado difiere un poco de la guía por redondeo, se aclara en la resolución.</p>`)}
${solv('')}
<h3>Primera parte: solutos no iónicos</h3>
<div data-qg-guide2></div>
<h3>Segunda parte: solutos iónicos</h3>
${idea('Factor de van ’t Hoff',`<p>Con electrolitos se multiplica por <b>i</b> (partículas que da cada fórmula al disociarse): ${m(R`\Delta T=i\,K\,b`)} · ${m(R`\Pi=i\,C\,R\,T`)} · en Raoult se cuentan ${m(R`i\,n_{\mathrm{st}}`)} moles de partículas.</p>`)}
<div data-qg-guide2i></div>
`};

  const at=u.sections.findIndex(s=>s.key==='qg-guia');
  u.sections.splice(at>=0?at+1:u.sections.length,0,section);
  u.exercises2=exercises2;
  u.exercises2i=exercises2i;
  u.lead='Cómo un soluto cambia la presión de vapor, las temperaturas de congelación y ebullición y genera presión osmótica: teoría, fórmulas paso a paso, dos guías resueltas y modelo de evaluación.';
})();
