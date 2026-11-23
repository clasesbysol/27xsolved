// 27xSOLved · Química General 4.º — Evaluaciones de la Unidad 1 (Soluciones).
// Dos evaluaciones fotografiadas (TP general 07/09/26 y «Mezcla de gases – Soluciones y diluciones
// aplicadas» 31/08/26) en versión virtual, cada una con dos modelos nuevos (B y C). Todo resuelto.
(function(){
  'use strict';
  const Q=window.ET27_QG4,K=window.ET27Kit;if(!Q||!K)return;
  const {m,chain,sym,idea,warn,note,step,table}=K;const R=String.raw;

  // ---------- Helpers comunes ----------
  const E=(n,title,statement,solution,answer)=>({n,title,statement,solution,answer});
  // Primera parte de cada resolución: qué vamos a hacer y con qué fórmula, en una oración.
  const plan=(t,f,s)=>step('Qué vamos a hacer',`<p>${t}</p>`+(f&&f.length?chain(...f):'')+(s?sym(s):''));
  const datos=rows=>step('Datos que usamos',table(['Dato','Valor','De dónde sale'],rows));
  const part=t=>`<h3 class="qgEvPart">${t}</h3>`;
  const items=(intro,list)=>`<p>${intro}</p>`+list.map(([l,t])=>`<p class="qgEvItem"><b>${l})</b> ${t}</p>`).join('');
  const dataTable=pairs=>table(pairs.map(p=>p[0]),[pairs.map(p=>p[1])]);
  const RULES='Las ecuaciones químicas deben estar completas, correctamente balanceadas y con los estados de agregación de cada sustancia. Los planteos de cálculo se hacen en sentido matemático y químico correcto, explicitando las fórmulas empleadas e indicando siempre las unidades.';
  function evaluation(u,o){
    if(!u||u.sections.some(s=>s.key===o.key))return;
    const html=`<div class="kitBox kitNote"><b>📝 ${o.title}</b><p>${o.meta}</p></div>`+
      (o.recursos?idea('Qué recursos pone en juego este modelo',`<p>${o.recursos}</p>`):'')+
      `<p><b>Consignas generales.</b> ${o.rules||RULES}</p>`+
      (o.data?step('Datos de la evaluación',dataTable(o.data)+(o.dataNote?`<p>${o.dataNote}</p>`:'')):'')+
      `<p>Intentá resolver cada consigna antes de abrir la resolución. Cada desarrollo empieza diciendo <b>qué vamos a hacer y con qué fórmula</b>; después muestra los datos (también los de tabla y las constantes), el despeje, el reemplazo y el control.</p><div data-qg-eval></div>`;
    u.sections.push({key:o.key,label:o.label,kicker:o.kicker,html,evalExercises:o.exercises});
  }
  const u=Q.units.find(x=>x.id==='soluciones');if(!u)return;
  if(u.pending){u.pending=false;u.sections=[];u.exercises=[];u.lead='Concentraciones, diluciones y mezclas de gases: evaluaciones en versión virtual, con modelos extra y todas las resoluciones paso a paso.'}

  // =====================================================================
  // 1 · TRABAJO PRÁCTICO GENERAL (original, 07/09/26)
  // =====================================================================
  evaluation(u,{key:'qg-ev-sol-1',label:'Evaluación · Soluciones y concentraciones (original)',kicker:'EVALUACIÓN · 07/09/26',
   title:'Trabajo práctico general · Soluciones',
   meta:'Versión virtual del trabajo práctico del 07/09/26: expresiones de concentración, comparación de soluciones, dilución y preparación de soluciones. Cuatro consignas.',
   data:[['H','1,01 g/mol'],['F','19,00 g/mol'],['O','16,00 g/mol'],['Na','22,99 g/mol'],['Cl','35,45 g/mol'],['K','39,10 g/mol'],['δ agua','1,00 g/cm³']],
   dataNote:'La hoja original no trae tabla de datos: se agregan las masas atómicas usuales.',
   exercises:[
    E(1,'Ácido fluorhídrico: de molaridad a otras expresiones',
     items('Se tiene una solución acuosa <b>5,75 M</b> de ácido fluorhídrico (HF), cuya densidad es <b>δ<sub>sc</sub> = 1,040 g/cm³</b>. Determinar su concentración expresada en:',[['a','% m/m.'],['b','Molalidad.'],['c','Gramos de soluto por cada 100 cm³ de solvente (agua).']]),
     plan('Vamos a tomar como base 1 L de solución: con la molaridad sacamos los moles de HF (n = M·V) y su masa (m = n·M<sub>m</sub>); con la densidad, la masa de solución (m = δ·V); por diferencia, la masa de agua. Con esas tres masas armamos cada expresión.',
      [R`n_{st}=M\cdot V_{sc}`,R`m_{st}=n_{st}\cdot M_m`,R`m_{sc}=\delta_{sc}\cdot V_{sc}`,R`m_{sv}=m_{sc}-m_{st}`],
      [['M','molaridad: moles de soluto por litro de solución','mol/L'],['M_m','masa molar del soluto','g/mol'],[R`\delta_{sc}`,'densidad de la solución','g/cm³'],[R`m_{sv}`,'masa de solvente (agua)','g']])+
     datos([['Molaridad','5,75 mol/L','enunciado'],['δ solución','1,040 g/cm³ = 1040 g/L','enunciado'],['M<sub>m</sub>(HF)','1,01 + 19,00 = 20,01 g/mol','tabla de masas atómicas'],['δ agua','1,00 g/cm³','dato conocido del agua']])+
     step('1. Base de cálculo: 1 L de solución',chain([R`V_{sc}=1\ \mathrm{L}=1000\ \mathrm{cm^3}`,'elegimos 1 L porque M está "por litro"'],R`n_{st}=5{,}75\ \mathrm{mol/L}\cdot1\ \mathrm{L}=5{,}75\ \mathrm{mol}`,R`m_{st}=5{,}75\ \mathrm{mol}\cdot20{,}01\ \mathrm{g/mol}=115{,}06\ \mathrm{g}`))+
     step('2. Masa de solución y de agua',chain(R`m_{sc}=1{,}040\ \mathrm{g/cm^3}\cdot1000\ \mathrm{cm^3}=1040\ \mathrm{g}`,R`m_{sv}=1040-115{,}06=924{,}94\ \mathrm{g}`))+
     part('a) % m/m')+
     step('3. Porcentaje masa en masa',chain(R`\%\,m/m=\frac{m_{st}}{m_{sc}}\cdot100`,R`\%\,m/m=\frac{115{,}06\ \mathrm{g}}{1040\ \mathrm{g}}\cdot100`,R`\%\,m/m=11{,}06\ \%`))+
     part('b) Molalidad')+
     step('4. Molalidad (moles de soluto por kg de solvente)',chain(R`b=\frac{n_{st}}{m_{sv}\ (\mathrm{kg})}`,R`b=\frac{5{,}75\ \mathrm{mol}}{0{,}92494\ \mathrm{kg}}`,R`b=6{,}22\ \mathrm{mol/kg}`))+
     part('c) g de soluto cada 100 cm³ de agua')+
     step('5. Regla de tres con el agua',chain([R`V_{sv}=\frac{924{,}94\ \mathrm{g}}{1{,}00\ \mathrm{g/cm^3}}=924{,}94\ \mathrm{cm^3}`,'el agua tiene δ = 1'],R`924{,}94\ \mathrm{cm^3\ sv}\to115{,}06\ \mathrm{g\ st}`,R`100\ \mathrm{cm^3\ sv}\to x=\frac{100\cdot115{,}06}{924{,}94}`,R`x=12{,}44\ \mathrm{g\ de\ HF}`))+
     idea('Control','<p>La molalidad (6,22) da mayor que la molaridad (5,75). Tiene sentido: en 1 L de solución hay sólo 0,925 kg de agua, así que por cada kg de agua hay más moles de HF.</p>'),
     '11,06 % m/m · 6,22 m · 12,44 g de HF cada 100 cm³ de agua'),

    E(2,'Soluciones de NaOH: ordenar por molaridad',
     items('Dadas las siguientes soluciones acuosas de NaOH, ordenarlas según su concentración molar, de la más diluida a la más concentrada:',[['A','2·10⁻³ M.'],['B','1,008 g/dm³ de solución.'],['C','1,001 g/100 cm³ de solución.'],['D','0,551 g/250 cm³ de solución.'],['E','5·10⁻³ g por cada mililitro de solución.']]),
     plan('Vamos a llevar todas a la misma unidad, mol/L: primero pasamos cada una a gramos por litro con una regla de tres hasta 1000 cm³, y después dividimos por la masa molar del NaOH.',
      [R`M=\frac{n_{st}}{V_{sc}\ (\mathrm{L})}=\frac{m_{st}/M_m}{V_{sc}\ (\mathrm{L})}`],
      [['M','molaridad','mol/L'],[R`m_{st}`,'masa de NaOH','g'],[R`M_m`,'masa molar del NaOH','g/mol']])+
     datos([['M<sub>m</sub>(NaOH)','22,99 + 16,00 + 1,01 = 40,00 g/mol','tabla de masas atómicas'],['Equivalencias','1 dm³ = 1 L = 1000 cm³ = 1000 mL','conversión de unidades']])+
     step('A) Ya está en molaridad',chain(R`M_A=2\cdot10^{-3}=0{,}0020\ \mathrm{M}`))+
     step('B) 1,008 g en 1 dm³',chain(R`M_B=\frac{1{,}008\ \mathrm{g}/40{,}00\ \mathrm{g/mol}}{1\ \mathrm{L}}`,R`M_B=0{,}0252\ \mathrm{M}`))+
     step('C) 1,001 g en 100 cm³',chain([R`100\ \mathrm{cm^3}\to1{,}001\ \mathrm{g};\ 1000\ \mathrm{cm^3}\to10{,}01\ \mathrm{g}`,'regla de tres'],R`M_C=\frac{10{,}01}{40{,}00}=0{,}2503\ \mathrm{M}`))+
     step('D) 0,551 g en 250 cm³',chain(R`1000\ \mathrm{cm^3}\to\frac{0{,}551\cdot1000}{250}=2{,}204\ \mathrm{g}`,R`M_D=\frac{2{,}204}{40{,}00}=0{,}0551\ \mathrm{M}`))+
     step('E) 5·10⁻³ g en 1 mL',chain(R`1000\ \mathrm{mL}\to5\cdot10^{-3}\cdot1000=5{,}00\ \mathrm{g}`,R`M_E=\frac{5{,}00}{40{,}00}=0{,}125\ \mathrm{M}`))+
     step('Orden',table(['Solución','A','B','D','E','C'],[['M (mol/L)','0,0020','0,0252','0,0551','0,125','0,2503']])+chain(R`A<B<D<E<C`)),
     'De más diluida a más concentrada: A (0,0020 M) < B (0,0252 M) < D (0,0551 M) < E (0,125 M) < C (0,250 M)'),

    E(3,'Solución de KCl: agua empleada, % m/m, molaridad y dilución',
     items('Se disuelve una determinada cantidad de cloruro de potasio (KCl) en agua y se obtienen <b>361 cm³</b> de solución de densidad <b>1,60 g/cm³</b>. La masa de soluto es de <b>20 g</b>.',[['a','Calcular el volumen de agua empleado y la concentración de la solución en % m/m.'],['b','¿Cuál es la concentración molar de la solución? ¿Qué volumen de ella se necesita para preparar una solución diluida, si el factor de dilución es 1:100 y el volumen final es de 2 L?']]),
     part('a) Volumen de agua y % m/m')+
     plan('Vamos a sacar la masa de solución con la densidad (m = δ·V), restarle el soluto para obtener la masa de agua (y su volumen, porque el agua tiene δ = 1) y calcular el % m/m.',
      [R`m_{sc}=\delta_{sc}\cdot V_{sc}`,R`m_{sv}=m_{sc}-m_{st}`,R`\%\,m/m=\frac{m_{st}}{m_{sc}}\cdot100`])+
     datos([['V solución','361 cm³','enunciado'],['δ solución','1,60 g/cm³','enunciado'],['m soluto','20 g','enunciado'],['δ agua','1,00 g/cm³','dato conocido del agua'],['M<sub>m</sub>(KCl)','39,10 + 35,45 = 74,55 g/mol','tabla de masas atómicas']])+
     step('1. Masa de solución',chain(R`m_{sc}=1{,}60\ \mathrm{g/cm^3}\cdot361\ \mathrm{cm^3}=577{,}6\ \mathrm{g}`))+
     step('2. Masa y volumen de agua',chain(R`m_{sv}=577{,}6-20=557{,}6\ \mathrm{g}`,R`V_{agua}=\frac{557{,}6\ \mathrm{g}}{1{,}00\ \mathrm{g/cm^3}}=557{,}6\ \mathrm{cm^3}`))+
     step('3. % m/m',chain(R`\%\,m/m=\frac{20}{577{,}6}\cdot100=3{,}46\ \%`))+
     warn('Ojo con los datos','<p>Con δ = 1,60 g/cm³ da más agua (557,6 cm³) que solución (361 cm³), algo imposible en la realidad: una solución de KCl tan diluida tiene δ ≈ 1,02 g/cm³. Resolvemos con los datos tal como están en la consigna.</p>')+
     part('b) Molaridad y dilución 1:100')+
     plan('Vamos a calcular la molaridad con M = n/V, y para la dilución usamos que los moles de soluto no cambian al agregar agua: C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>. Un factor 1:100 significa que C<sub>f</sub> = C<sub>i</sub>/100 (o V<sub>i</sub> = V<sub>f</sub>/100).',
      [R`M=\frac{m_{st}/M_m}{V_{sc}}`,R`C_iV_i=C_fV_f`,R`\text{factor}=\frac{V_f}{V_i}=\frac{C_i}{C_f}=100`])+
     step('4. Molaridad',chain(R`n_{st}=\frac{20\ \mathrm{g}}{74{,}55\ \mathrm{g/mol}}=0{,}2683\ \mathrm{mol}`,R`M=\frac{0{,}2683\ \mathrm{mol}}{0{,}361\ \mathrm{L}}=0{,}743\ \mathrm{M}`))+
     step('5. Volumen a medir',chain(R`V_i=\frac{V_f}{100}=\frac{2\ \mathrm{L}}{100}`,R`V_i=0{,}020\ \mathrm{L}=20\ \mathrm{mL}`,R`C_f=\frac{0{,}743}{100}=7{,}43\cdot10^{-3}\ \mathrm{M}`))+
     note('Cómo se prepara','<p>Se miden 20 mL de la solución 0,743 M y se llevan con agua hasta 2 L en un matraz aforado.</p>'),
     'a) 557,6 cm³ de agua · 3,46 % m/m · b) 0,743 M; se miden 20 mL para obtener 2 L de solución 7,43·10⁻³ M'),

    E(4,'Volumen de NaOH 0,25 M con 50 g',
     '<p>Calcular el volumen de solución <b>0,25 M</b> que se puede preparar con <b>50 g de NaOH</b>.</p>',
     plan('Vamos a pasar la masa de NaOH a moles (n = m/M<sub>m</sub>) y despejar el volumen de la definición de molaridad (V = n/M).',
      [R`n=\frac{m}{M_m}`,R`M=\frac{n}{V}\Rightarrow V=\frac{n}{M}`])+
     datos([['m NaOH','50 g','enunciado'],['Molaridad','0,25 mol/L','enunciado'],['M<sub>m</sub>(NaOH)','40,00 g/mol','tabla de masas atómicas']])+
     step('1. Moles de NaOH',chain(R`n=\frac{50\ \mathrm{g}}{40{,}00\ \mathrm{g/mol}}=1{,}25\ \mathrm{mol}`))+
     step('2. Volumen',chain(R`V=\frac{1{,}25\ \mathrm{mol}}{0{,}25\ \mathrm{mol/L}}=5{,}0\ \mathrm{L}`)),
     'Se pueden preparar 5,0 L de solución 0,25 M')
   ]});

  // ---------- Modelo B ----------
  evaluation(u,{key:'qg-ev-sol-1b',label:'Evaluación · Soluciones y concentraciones · Modelo B',kicker:'EVALUACIÓN · MODELO B',
   title:'Soluciones · Modelo B',
   meta:'Modelo nuevo con la misma estructura que el trabajo práctico general: cuatro consignas.',
   recursos:'Pasar de % m/m y densidad a molaridad, molalidad, % m/v y fracción molar; comparar concentraciones dadas en ppm y en moles; mezclar dos soluciones del mismo soluto (volúmenes aditivos); trabajar con una sal hidratada.',
   data:[['H','1,01'],['C','12,01'],['N','14,01'],['O','16,00'],['Na','22,99'],['Cl','35,45'],['K','39,10']],dataNote:'Masas atómicas en g/mol. δ del agua = 1,00 g/mL.',
   exercises:[
    E(1,'Ácido nítrico comercial',
     items('El ácido nítrico comercial es una solución acuosa de HNO₃ al <b>65 % m/m</b> con densidad <b>1,40 g/mL</b>. Expresar su concentración en:',[['a','Molaridad.'],['b','Molalidad.'],['c','% m/v.'],['d','Fracción molar del soluto.']]),
     plan('Vamos a tomar como base 1 L de solución: con la densidad sacamos la masa de solución (m = δ·V), con el % m/m la masa de HNO₃ y por diferencia la de agua; pasando a moles armamos M, b, % m/v y X.',
      [R`m_{sc}=\delta\cdot V`,R`m_{st}=\frac{\%\,m/m}{100}\cdot m_{sc}`,R`M=\frac{n_{st}}{V_{sc}}`,R`b=\frac{n_{st}}{m_{sv}\ (\mathrm{kg})}`,R`X_{st}=\frac{n_{st}}{n_{st}+n_{sv}}`],
      [['b','molalidad','mol/kg'],[R`X_{st}`,'fracción molar del soluto','sin unidad']])+
     datos([['% m/m','65 %','enunciado'],['δ solución','1,40 g/mL = 1400 g/L','enunciado'],['M<sub>m</sub>(HNO₃)','1,01 + 14,01 + 3·16,00 = 63,02 g/mol','tabla'],['M<sub>m</sub>(H₂O)','2·1,01 + 16,00 = 18,02 g/mol','tabla']])+
     step('1. Masas en 1 L de solución',chain(R`m_{sc}=1400\ \mathrm{g}`,R`m_{st}=0{,}65\cdot1400=910\ \mathrm{g}`,R`m_{sv}=1400-910=490\ \mathrm{g}`))+
     step('2. Moles',chain(R`n_{st}=\frac{910}{63{,}02}=14{,}44\ \mathrm{mol}`,R`n_{sv}=\frac{490}{18{,}02}=27{,}19\ \mathrm{mol}`))+
     part('a) Molaridad')+step('3.',chain(R`M=\frac{14{,}44\ \mathrm{mol}}{1\ \mathrm{L}}=14{,}44\ \mathrm{M}`))+
     part('b) Molalidad')+step('4.',chain(R`b=\frac{14{,}44\ \mathrm{mol}}{0{,}490\ \mathrm{kg}}=29{,}47\ \mathrm{m}`))+
     part('c) % m/v')+step('5. Gramos de soluto cada 100 mL de solución',chain(R`\%\,m/v=\frac{910\ \mathrm{g}}{1000\ \mathrm{mL}}\cdot100=91{,}0\ \%`))+
     part('d) Fracción molar')+step('6.',chain(R`X_{st}=\frac{14{,}44}{14{,}44+27{,}19}=0{,}347`,R`X_{sv}=1-0{,}347=0{,}653`))+
     idea('Control','<p>% m/v = % m/m · δ = 65 · 1,40 = 91,0 %: coincide. Es un atajo útil para verificar.</p>'),
     '14,44 M · 29,47 m · 91,0 % m/v · X(HNO₃) = 0,347'),

    E(2,'Soluciones de KCl: ordenar por molaridad',
     items('Ordenar las siguientes soluciones acuosas de KCl de la más diluida a la más concentrada (en mol/L):',[['A','0,150 M.'],['B','7,455 g de KCl en 500 cm³ de solución.'],['C','2,5 % m/v.'],['D','1500 ppm (mg de soluto por litro de solución).'],['E','0,040 mol de KCl en 250 mL de solución.']]),
     plan('Vamos a llevar todas a mol/L con M = n/V: las que vienen en masa las pasamos a moles con la masa molar; las que vienen en % m/v o en ppm primero las llevamos a gramos por litro.',
      [R`M=\frac{n_{st}}{V_{sc}}=\frac{m_{st}/M_m}{V_{sc}}`,R`1\ \mathrm{ppm}=1\ \mathrm{mg/L}`])+
     datos([['M<sub>m</sub>(KCl)','39,10 + 35,45 = 74,55 g/mol','tabla'],['ppm','mg de soluto por litro de solución','definición (enunciado)']])+
     step('A)',chain(R`M_A=0{,}150\ \mathrm{M}`))+
     step('B)',chain(R`n=\frac{7{,}455}{74{,}55}=0{,}100\ \mathrm{mol}`,R`M_B=\frac{0{,}100}{0{,}500}=0{,}200\ \mathrm{M}`))+
     step('C) 2,5 g cada 100 mL → 25 g/L',chain(R`M_C=\frac{25/74{,}55}{1}=0{,}335\ \mathrm{M}`))+
     step('D) 1500 mg/L = 1,5 g/L',chain(R`M_D=\frac{1{,}5}{74{,}55}=0{,}0201\ \mathrm{M}`))+
     step('E)',chain(R`M_E=\frac{0{,}040\ \mathrm{mol}}{0{,}250\ \mathrm{L}}=0{,}160\ \mathrm{M}`))+
     step('Orden',chain(R`D<A<E<B<C`)),
     'D (0,0201 M) < A (0,150 M) < E (0,160 M) < B (0,200 M) < C (0,335 M)'),

    E(3,'Mezcla de dos soluciones de NaCl',
     items('Se mezclan <b>200 mL de NaCl 0,500 M</b> con <b>300 mL de NaCl 2,00 % m/v</b>. Suponer volúmenes aditivos.',[['a','Calcular los moles de NaCl que aporta cada solución.'],['b','Calcular la molaridad y el % m/v de la mezcla.'],['c','Si a la mezcla se le agrega agua hasta 1,00 L, ¿cuál es la nueva molaridad y cuál fue el factor de dilución?']]),
     plan('Vamos a sumar los moles de soluto de las dos soluciones (n = M·V para una, n = m/M<sub>m</sub> para la otra) y dividir por el volumen total, que es la suma de los volúmenes; para el agregado de agua usamos C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>.',
      [R`n_{total}=n_1+n_2`,R`V_{total}=V_1+V_2`,R`M_{mezcla}=\frac{n_{total}}{V_{total}}`,R`C_iV_i=C_fV_f`])+
     datos([['V₁, M₁','200 mL, 0,500 M','enunciado'],['V₂, concentración','300 mL, 2,00 % m/v','enunciado'],['M<sub>m</sub>(NaCl)','22,99 + 35,45 = 58,44 g/mol','tabla']])+
     part('a) Moles de cada solución')+
     step('1.',chain(R`n_1=0{,}500\ \mathrm{mol/L}\cdot0{,}200\ \mathrm{L}=0{,}100\ \mathrm{mol}`,[R`m_2=\frac{2{,}00\ \mathrm{g}}{100\ \mathrm{mL}}\cdot300\ \mathrm{mL}=6{,}00\ \mathrm{g}`,'2 g cada 100 mL'],R`n_2=\frac{6{,}00}{58{,}44}=0{,}1027\ \mathrm{mol}`))+
     part('b) Concentración de la mezcla')+
     step('2.',chain(R`n_{total}=0{,}100+0{,}1027=0{,}2027\ \mathrm{mol}`,R`V_{total}=200+300=500\ \mathrm{mL}`,R`M=\frac{0{,}2027}{0{,}500}=0{,}405\ \mathrm{M}`,[R`m_{total}=0{,}100\cdot58{,}44+6{,}00=11{,}84\ \mathrm{g}`,'masa total de NaCl'],R`\%\,m/v=\frac{11{,}84}{500}\cdot100=2{,}37\ \%`))+
     part('c) Agregado de agua')+
     step('3.',chain(R`C_f=\frac{0{,}405\cdot0{,}500}{1{,}00}=0{,}203\ \mathrm{M}`,R`\text{factor}=\frac{V_f}{V_i}=\frac{1{,}00}{0{,}500}=2\Rightarrow 1{:}2`)),
     'a) 0,100 mol y 0,1027 mol · b) 0,405 M y 2,37 % m/v · c) 0,203 M, dilución 1:2'),

    E(4,'Sal hidratada: carbonato de sodio decahidratado',
     items('Se quiere preparar <b>250 mL</b> de solución <b>0,100 M de Na₂CO₃</b>, pero en el laboratorio sólo hay <b>Na₂CO₃·10H₂O</b>.',[['a','¿Qué masa del hidrato hay que pesar?'],['b','¿Qué masa se hubiera pesado si se tuviera la sal anhidra? Explicar la diferencia.']]),
     plan('Vamos a calcular los moles de Na₂CO₃ que necesitamos (n = M·V); como cada mol de hidrato aporta 1 mol de Na₂CO₃, esos son los moles de hidrato, y los pasamos a masa con la masa molar del hidrato (m = n·M<sub>m</sub>).',
      [R`n=M\cdot V`,R`m=n\cdot M_m`])+
     datos([['V, M','250 mL, 0,100 M','enunciado'],['M<sub>m</sub>(Na₂CO₃)','2·22,99 + 12,01 + 3·16,00 = 105,99 g/mol','tabla'],['M<sub>m</sub>(H₂O)','18,02 g/mol','tabla'],['M<sub>m</sub>(Na₂CO₃·10H₂O)','105,99 + 10·18,02 = 286,19 g/mol','tabla']])+
     step('1. Moles necesarios',chain(R`n=0{,}100\ \mathrm{mol/L}\cdot0{,}250\ \mathrm{L}=0{,}0250\ \mathrm{mol}`,R`1\ \mathrm{mol\ hidrato}\to1\ \mathrm{mol\ Na_2CO_3}`))+
     part('a) Masa de hidrato')+step('2.',chain(R`m=0{,}0250\cdot286{,}19=7{,}15\ \mathrm{g}`))+
     part('b) Masa de sal anhidra')+step('3.',chain(R`m=0{,}0250\cdot105{,}99=2{,}65\ \mathrm{g}`)+'<p>Con el hidrato hay que pesar más porque cada fórmula arrastra 10 moléculas de agua: de los 7,15 g, sólo 2,65 g son Na₂CO₃. Esa agua pasa a formar parte del solvente.</p>'),
     'a) 7,15 g de Na₂CO₃·10H₂O · b) 2,65 g de sal anhidra')
   ]});

  // ---------- Modelo C ----------
  evaluation(u,{key:'qg-ev-sol-1c',label:'Evaluación · Soluciones y concentraciones · Modelo C',kicker:'EVALUACIÓN · MODELO C',
   title:'Soluciones · Modelo C',
   meta:'Segundo modelo nuevo del trabajo práctico general: cuatro consignas.',
   recursos:'Partir de la molalidad en lugar de la molaridad; ordenar soluciones que incluyen un hidrato y una dilución; concentrar una solución por evaporación; preparar una solución desde un ácido comercial razonando con masas, sin calcular su molaridad.',
   data:[['H','1,01'],['C','12,01'],['O','16,00'],['Na','22,99'],['S','32,06'],['Cl','35,45'],['Cu','63,55']],dataNote:'Masas atómicas en g/mol.',
   exercises:[
    E(1,'Glucosa: de molalidad a las otras expresiones',
     items('Una solución acuosa de glucosa (C₆H₁₂O₆) es <b>0,800 m</b> y su densidad es <b>1,050 g/mL</b>. Calcular:',[['a','Su concentración en % m/m.'],['b','Su molaridad.'],['c','La fracción molar de la glucosa.']]),
     plan('Como la molalidad está "por kg de agua", vamos a tomar como base 1 kg de solvente: ahí hay 0,800 mol de glucosa; pasamos a masa, sumamos para tener la masa de solución, con la densidad sacamos su volumen (V = m/δ) y armamos cada expresión.',
      [R`b=\frac{n_{st}}{m_{sv}\ (\mathrm{kg})}`,R`m_{sc}=m_{st}+m_{sv}`,R`V_{sc}=\frac{m_{sc}}{\delta_{sc}}`,R`M=\frac{n_{st}}{V_{sc}}`])+
     datos([['b','0,800 mol/kg','enunciado'],['δ solución','1,050 g/mL','enunciado'],['M<sub>m</sub>(glucosa)','6·12,01 + 12·1,01 + 6·16,00 = 180,18 g/mol','tabla'],['M<sub>m</sub>(H₂O)','18,02 g/mol','tabla']])+
     step('1. Base 1 kg de agua',chain(R`n_{st}=0{,}800\ \mathrm{mol}`,R`m_{st}=0{,}800\cdot180{,}18=144{,}14\ \mathrm{g}`,R`m_{sc}=1000+144{,}14=1144{,}14\ \mathrm{g}`))+
     part('a) % m/m')+step('2.',chain(R`\%\,m/m=\frac{144{,}14}{1144{,}14}\cdot100=12{,}60\ \%`))+
     part('b) Molaridad')+step('3.',chain(R`V_{sc}=\frac{1144{,}14\ \mathrm{g}}{1{,}050\ \mathrm{g/mL}}=1089{,}7\ \mathrm{mL}`,R`M=\frac{0{,}800}{1{,}0897}=0{,}734\ \mathrm{M}`))+
     part('c) Fracción molar')+step('4.',chain(R`n_{sv}=\frac{1000}{18{,}02}=55{,}49\ \mathrm{mol}`,R`X_{st}=\frac{0{,}800}{0{,}800+55{,}49}=0{,}0142`)),
     '12,60 % m/m · 0,734 M · X(glucosa) = 0,0142'),

    E(2,'Soluciones de sulfato de cobre(II): ordenar',
     items('Ordenar de la más diluida a la más concentrada (en mol/L de CuSO₄):',[['A','0,0500 M.'],['B','3,99 g de CuSO₄·5H₂O disueltos hasta 250 mL de solución.'],['C','12,0 g de CuSO₄ por litro de solución.'],['D','0,96 % m/v de CuSO₄.'],['E','25,0 mL de solución 0,400 M llevados con agua hasta 100 mL.']]),
     plan('Vamos a calcular la molaridad de cada una con M = n/V; en B los moles salen de la masa molar del hidrato (cada mol de hidrato da 1 mol de CuSO₄) y en E usamos la dilución C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>.',
      [R`M=\frac{m/M_m}{V}`,R`C_iV_i=C_fV_f`])+
     datos([['M<sub>m</sub>(CuSO₄)','63,55 + 32,06 + 4·16,00 = 159,61 g/mol','tabla'],['M<sub>m</sub>(CuSO₄·5H₂O)','159,61 + 5·18,02 = 249,71 g/mol','tabla']])+
     step('A)',chain(R`M_A=0{,}0500\ \mathrm{M}`))+
     step('B)',chain(R`n=\frac{3{,}99}{249{,}71}=0{,}01598\ \mathrm{mol}`,R`M_B=\frac{0{,}01598}{0{,}250}=0{,}0639\ \mathrm{M}`))+
     step('C)',chain(R`M_C=\frac{12{,}0}{159{,}61}=0{,}0752\ \mathrm{M}`))+
     step('D) 0,96 g/100 mL → 9,6 g/L',chain(R`M_D=\frac{9{,}6}{159{,}61}=0{,}0601\ \mathrm{M}`))+
     step('E)',chain(R`C_f=\frac{0{,}400\cdot25{,}0}{100}=0{,}100\ \mathrm{M}`))+
     step('Orden',chain(R`A<D<B<C<E`)),
     'A (0,0500 M) < D (0,0601 M) < B (0,0639 M) < C (0,0752 M) < E (0,100 M)'),

    E(3,'Concentrar por evaporación y volver a diluir',
     items('Se tienen <b>500 mL de NaCl 0,200 M</b>. Se calienta y se evapora agua hasta que el volumen queda en <b>150 mL</b>, sin pérdida de soluto.',[['a','¿Cuál es la nueva molaridad y su % m/v?'],['b','¿Qué volumen de esa solución concentrada hay que tomar para preparar 2,00 L de NaCl 0,0150 M? ¿Cuál es el factor de dilución?']]),
     plan('Vamos a usar que al evaporar sólo se va agua: los moles de NaCl se conservan, así que vale la misma ecuación de la dilución pero "al revés" (C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>, con V<sub>f</sub> menor).',
      [R`C_iV_i=C_fV_f`,R`\%\,m/v=\frac{M\cdot M_m}{10}`])+
     datos([['C, V iniciales','0,200 M, 500 mL','enunciado'],['V final (evaporado)','150 mL','enunciado'],['M<sub>m</sub>(NaCl)','58,44 g/mol','tabla']])+
     part('a) Solución concentrada')+
     step('1.',chain(R`C_f=\frac{0{,}200\cdot500}{150}=0{,}667\ \mathrm{M}`,[R`0{,}667\ \mathrm{mol/L}\cdot58{,}44\ \mathrm{g/mol}=38{,}96\ \mathrm{g/L}`,'pasamos a g/L'],R`\%\,m/v=\frac{38{,}96\ \mathrm{g}}{1000\ \mathrm{mL}}\cdot100=3{,}90\ \%`))+
     part('b) Nueva dilución')+
     step('2.',chain(R`V_i=\frac{C_fV_f}{C_i}=\frac{0{,}0150\cdot2{,}00}{0{,}667}`,R`V_i=0{,}0450\ \mathrm{L}=45{,}0\ \mathrm{mL}`,R`\text{factor}=\frac{0{,}667}{0{,}0150}=44{,}4\Rightarrow1{:}44{,}4`)),
     'a) 0,667 M y 3,90 % m/v · b) 45,0 mL; factor de dilución 1:44,4'),

    E(4,'Preparar HCl 0,250 M desde ácido comercial',
     '<p>¿Qué volumen de ácido clorhídrico comercial (<b>37 % m/m</b>, <b>δ = 1,19 g/mL</b>) hay que medir para preparar <b>500 mL de HCl 0,250 M</b>? Resolverlo pasando por la masa de soluto, sin calcular la molaridad del ácido comercial.</p>',
     plan('Vamos a calcular los gramos de HCl puro que necesita la solución diluida (n = M·V, m = n·M<sub>m</sub>), ver cuántos gramos del ácido al 37 % los contienen y pasar esa masa a volumen con la densidad (V = m/δ).',
      [R`m_{HCl}=M\cdot V\cdot M_m`,R`m_{sc}=\frac{m_{HCl}\cdot100}{\%\,m/m}`,R`V_{sc}=\frac{m_{sc}}{\delta}`])+
     datos([['Solución a preparar','500 mL, 0,250 M','enunciado'],['Ácido comercial','37 % m/m, δ = 1,19 g/mL','enunciado'],['M<sub>m</sub>(HCl)','1,01 + 35,45 = 36,46 g/mol','tabla']])+
     step('1. HCl puro necesario',chain(R`n=0{,}250\cdot0{,}500=0{,}125\ \mathrm{mol}`,R`m_{HCl}=0{,}125\cdot36{,}46=4{,}558\ \mathrm{g}`))+
     step('2. Masa de ácido comercial',chain([R`37\ \mathrm{g\ HCl}\to100\ \mathrm{g\ sc}`,'regla de tres con el %'],R`4{,}558\ \mathrm{g\ HCl}\to m_{sc}=\frac{4{,}558\cdot100}{37}=12{,}32\ \mathrm{g}`))+
     step('3. Volumen a medir',chain(R`V=\frac{12{,}32\ \mathrm{g}}{1{,}19\ \mathrm{g/mL}}=10{,}35\ \mathrm{mL}`))+
     note('Seguridad','<p>Siempre se agrega el ácido sobre el agua, nunca al revés.</p>'),
     'Hay que medir 10,35 mL del ácido comercial y llevar a 500 mL con agua')
   ]});

  // =====================================================================
  // 2 · MEZCLA DE GASES – SOLUCIONES Y DILUCIONES APLICADAS (original, 31/08/26)
  // =====================================================================
  evaluation(u,{key:'qg-ev-sol-2',label:'Evaluación · Mezcla de gases, soluciones y diluciones (original)',kicker:'EVALUACIÓN · 31/08/26',
   title:'Mezcla de gases – Soluciones y diluciones aplicadas',
   meta:'Versión virtual de la evaluación del 31/08/26: ley de Dalton, concentraciones y diluciones de una solución comercial y obtención de una oxosal por neutralización y por redox. Tres ejercicios.',
   data:[['Kr','84'],['O','16'],['N','14'],['C','12'],['K','39'],['H','1'],['S','32'],['Al','27']],dataNote:'Masas atómicas en g/mol, tal como figuran en la evaluación.',
   exercises:[
    E(1,'Mezcla de CO₂, Kr, N₂ y O₂',
     items('Una mezcla gaseosa contiene cuatro sustancias: dióxido de carbono, kriptón, nitrógeno y oxígeno moleculares, que en conjunto ejercen una presión total de <b>1080 hPa</b>. Se sabe que la fracción molar del gas noble es <b>0,112</b> y que el óxido aporta al sistema <b>la cuarta parte</b> de la fracción molar del gas noble. Además, las presiones parciales de las dos sustancias simples diatómicas tienen el mismo valor.',[['a','¿Cuál es la fracción molar y la presión parcial de cada gas?'],['b','¿En qué ley fundamental se sustenta el sistema? Explicar.']]),
     plan('Vamos a usar que las fracciones molares suman 1 para encontrar las que faltan, y la ley de Dalton (p<sub>i</sub> = X<sub>i</sub>·P<sub>T</sub>) para cada presión parcial.',
      [R`X_{Kr}+X_{CO_2}+X_{N_2}+X_{O_2}=1`,R`p_i=X_i\cdot P_T`],
      [[R`X_i`,'fracción molar del gas i','sin unidad'],[R`p_i`,'presión parcial del gas i','hPa'],[R`P_T`,'presión total','hPa']])+
     datos([['P total','1080 hPa','enunciado'],['X(Kr)','0,112','enunciado (gas noble)'],['X(CO₂)','0,112/4','enunciado (el óxido)'],['p(N₂) = p(O₂)','⇒ X(N₂) = X(O₂)','enunciado (sustancias simples diatómicas)']])+
     part('a) Fracciones molares y presiones parciales')+
     step('1. Fracción del óxido',chain(R`X_{CO_2}=\frac{0{,}112}{4}=0{,}028`))+
     step('2. Fracciones de N₂ y O₂',chain([R`p_{N_2}=p_{O_2}\Rightarrow X_{N_2}=X_{O_2}`,'misma P total'],R`0{,}112+0{,}028+2X_{N_2}=1`,R`X_{N_2}=X_{O_2}=\frac{1-0{,}140}{2}=0{,}430`))+
     step('3. Presiones parciales',chain(R`p_{Kr}=0{,}112\cdot1080=120{,}96\ \mathrm{hPa}`,R`p_{CO_2}=0{,}028\cdot1080=30{,}24\ \mathrm{hPa}`,R`p_{N_2}=p_{O_2}=0{,}430\cdot1080=464{,}4\ \mathrm{hPa}`))+
     step('4. Control',chain(R`120{,}96+30{,}24+464{,}4+464{,}4=1080\ \mathrm{hPa}`))+
     part('b) Ley fundamental')+
     step('5. Ley de Dalton de las presiones parciales','<p>En una mezcla de gases ideales que no reaccionan entre sí, cada gas se comporta como si estuviera solo en el recipiente y ejerce su propia presión parcial. La presión total es la suma de las presiones parciales: P<sub>T</sub> = p<sub>CO₂</sub> + p<sub>Kr</sub> + p<sub>N₂</sub> + p<sub>O₂</sub>, y cada una es proporcional a su fracción molar (p<sub>i</sub> = X<sub>i</sub>·P<sub>T</sub>).</p>'),
     'X: Kr 0,112 · CO₂ 0,028 · N₂ 0,430 · O₂ 0,430 — p: Kr 120,96 hPa · CO₂ 30,24 hPa · N₂ 464,4 hPa · O₂ 464,4 hPa · Ley de Dalton'),

    E(2,'Potasa cáustica comercial: concentración y diluciones',
     items('Las soluciones acuosas comerciales de hidróxido de potasio se usan para fabricar sustancias tensioactivas (jabones líquidos y detergentes). Se las conoce como <i>potasas cáusticas</i> o <i>lejías de potasa</i>: son muy corrosivas por su alcalinidad, se manipulan con guantes y gafas y se guardan en envases de plástico, lejos de ácidos y entre 5 y 25 °C. Una de las presentaciones habituales es de <b>1,0 L de solución al 45 % m/m</b>, con <b>densidad 1,45 g/mL</b>.',[['a','Expresar la concentración de la solución comercial en molalidad, molaridad y % m/v.'],['b','¿Qué volumen de la solución concentrada hay que medir para preparar 1,50 L de solución 0,820 M?'],['c','A la solución preparada en b) se le realiza una dilución 1:20 y luego otra 1:100 (preparando en ambos casos 1 L de solución). ¿Cuáles son las concentraciones molares de las dos soluciones?']]),
     part('a) Molalidad, molaridad y % m/v')+
     plan('Vamos a trabajar con el litro de solución comercial: masa de solución con la densidad (m = δ·V), masa de KOH con el 45 %, masa de agua por diferencia y, pasando a moles, armamos b, M y % m/v.',
      [R`m_{sc}=\delta\cdot V`,R`m_{st}=0{,}45\cdot m_{sc}`,R`b=\frac{n_{st}}{m_{sv}(\mathrm{kg})}`,R`M=\frac{n_{st}}{V_{sc}}`])+
     datos([['V solución','1,0 L = 1000 mL','enunciado'],['δ','1,45 g/mL','enunciado'],['% m/m','45 %','enunciado'],['M<sub>m</sub>(KOH)','39 + 16 + 1 = 56 g/mol','tabla de la evaluación']])+
     step('1. Masas',chain(R`m_{sc}=1{,}45\cdot1000=1450\ \mathrm{g}`,R`m_{st}=0{,}45\cdot1450=652{,}5\ \mathrm{g}`,R`m_{sv}=1450-652{,}5=797{,}5\ \mathrm{g}`))+
     step('2. Moles de KOH',chain(R`n=\frac{652{,}5}{56}=11{,}65\ \mathrm{mol}`))+
     step('3. Las tres expresiones',chain(R`b=\frac{11{,}65}{0{,}7975}=14{,}61\ \mathrm{m}`,R`M=\frac{11{,}65}{1{,}0}=11{,}65\ \mathrm{M}`,R`\%\,m/v=\frac{652{,}5}{1000}\cdot100=65{,}25\ \%`))+
     part('b) Volumen a medir')+
     plan('Vamos a usar que los moles de KOH que se toman de la concentrada son los que quedan en la diluida: C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>.',[R`V_i=\frac{C_fV_f}{C_i}`])+
     step('4.',chain(R`V_i=\frac{0{,}820\cdot1{,}50}{11{,}65}`,R`V_i=0{,}1056\ \mathrm{L}=105{,}6\ \mathrm{mL}`))+
     part('c) Diluciones sucesivas')+
     plan('Una dilución 1:x divide la concentración por x (el volumen final es x veces el que se toma). Se aplica una después de la otra.',[R`C_f=\frac{C_i}{x}`])+
     step('5.',chain([R`C_1=\frac{0{,}820}{20}=0{,}041\ \mathrm{M}`,'se toman 50 mL y se llevan a 1 L'],[R`C_2=\frac{0{,}041}{100}=4{,}1\cdot10^{-4}\ \mathrm{M}`,'se toman 10 mL y se llevan a 1 L'])),
     'a) 14,61 m · 11,65 M · 65,25 % m/v · b) 105,6 mL · c) 0,041 M y 4,1·10⁻⁴ M'),

    E(3,'Sulfato de aluminio: neutralización, redox y estequiometría',
     items('El sulfato de aluminio se usa como clarificador de aguas: en piletas y piscinas forma "flóculos" que decantan por su propio peso. La forma habitual de obtener esta oxosal es una <b>neutralización</b> entre el oxoácido y el hidróxido correspondientes. Otra forma es a partir de <b>aluminio metálico y ácido sulfúrico concentrado y en caliente</b>, que forma además dióxido de azufre y agua.',[['a','Escribir las dos ecuaciones químicas que permiten obtener el compuesto y balancear por el método ion-electrón la que involucra una reacción redox.'],['b','¿Qué masa de metal (en kg) debe tratarse con una solución del ácido en exceso para obtener, con 100 % de rendimiento, 2,0 kg del compuesto? ¿Qué volumen (en L) de óxido de azufre(IV) se desprende si la reacción transcurre a 120 °C y 1 atm?']]),
     part('a) Ecuaciones')+
     plan('Vamos a escribir la neutralización (ácido + hidróxido → sal + agua) y la redox; en la redox separamos la oxidación del Al y la reducción del S (de +6 en el sulfato a +4 en el SO₂), igualamos los electrones y sumamos.',null)+
     step('1. Neutralización',chain(R`2\,\mathrm{Al(OH)_3(s)}+3\,\mathrm{H_2SO_4(aq)}\to\mathrm{Al_2(SO_4)_3(aq)}+6\,\mathrm{H_2O(l)}`))+
     step('2. Hemirreacciones (medio ácido)',chain([R`\mathrm{Al(s)}\to\mathrm{Al^{3+}}+3e^-`,'oxidación (Al: 0 → +3)'],[R`\mathrm{SO_4^{2-}}+4\,\mathrm{H^+}+2e^-\to\mathrm{SO_2(g)}+2\,\mathrm{H_2O}`,'reducción (S: +6 → +4)']))+
     step('3. Igualar electrones (×2 y ×3) y sumar',chain(R`2\,\mathrm{Al}\to2\,\mathrm{Al^{3+}}+6e^-`,R`3\,\mathrm{SO_4^{2-}}+12\,\mathrm{H^+}+6e^-\to3\,\mathrm{SO_2}+6\,\mathrm{H_2O}`,R`2\,\mathrm{Al}+3\,\mathrm{SO_4^{2-}}+12\,\mathrm{H^+}\to2\,\mathrm{Al^{3+}}+3\,\mathrm{SO_2}+6\,\mathrm{H_2O}`))+
     step('4. Ecuación molecular',chain(R`2\,\mathrm{Al(s)}+6\,\mathrm{H_2SO_4(conc)}\to\mathrm{Al_2(SO_4)_3(aq)}+3\,\mathrm{SO_2(g)}+6\,\mathrm{H_2O(l)}`)+'<p>Se agregan 3 SO₄²⁻ espectadores a cada lado (los que quedan en la sal): 12 H⁺ + 6 SO₄²⁻ = 6 H₂SO₄. Agente reductor: Al. Agente oxidante: H₂SO₄.</p>')+
     part('b) Masa de aluminio y volumen de SO₂')+
     plan('Vamos a pasar los 2,0 kg de sal a moles, usar la relación de la ecuación (2 mol Al : 1 mol sal : 3 mol SO₂) y, para el gas, la ecuación de estado P·V = n·R·T con T en kelvin.',
      [R`n=\frac{m}{M_m}`,R`PV=nRT\Rightarrow V=\frac{nRT}{P}`])+
     datos([['m sal','2,0 kg = 2000 g','enunciado'],['M<sub>m</sub>(Al₂(SO₄)₃)','2·27 + 3·(32 + 4·16) = 342 g/mol','tabla'],['M(Al)','27 g/mol','tabla'],['T, P','120 °C = 393,15 K; 1 atm','enunciado'],['R','0,082 L·atm/(K·mol)','constante']])+
     step('1. Moles de sal',chain(R`n=\frac{2000}{342}=5{,}848\ \mathrm{mol}`))+
     step('2. Aluminio',chain(R`n_{Al}=2\cdot5{,}848=11{,}70\ \mathrm{mol}`,R`m_{Al}=11{,}70\cdot27=315{,}8\ \mathrm{g}=0{,}316\ \mathrm{kg}`))+
     step('3. SO₂',chain(R`n_{SO_2}=3\cdot5{,}848=17{,}54\ \mathrm{mol}`,R`V=\frac{17{,}54\cdot0{,}082\cdot393{,}15}{1}`,R`V=565{,}6\ \mathrm{L}`)),
     'a) 2Al(OH)₃ + 3H₂SO₄ → Al₂(SO₄)₃ + 6H₂O · 2Al + 6H₂SO₄ → Al₂(SO₄)₃ + 3SO₂ + 6H₂O · b) 0,316 kg de Al · 565,6 L de SO₂')
   ]});

  // ---------- Modelo B ----------
  evaluation(u,{key:'qg-ev-sol-2b',label:'Evaluación · Mezcla de gases, soluciones y diluciones · Modelo B',kicker:'EVALUACIÓN · MODELO B',
   title:'Mezcla de gases – Soluciones y diluciones aplicadas · Modelo B',
   meta:'Modelo nuevo con la misma estructura: mezcla gaseosa, solución comercial con diluciones y obtención de una oxosal. Tres ejercicios.',
   recursos:'Calcular fracciones molares a partir de masas y la presión total con P·V = n·R·T; trabajar presiones en atm y en hPa; analizar qué pasa con una presión parcial al agregar otro gas; usar otra redox (cobre con ácido nítrico, que transfiere 1 electrón por N) y sumar un rendimiento distinto de 100 %.',
   data:[['H','1'],['C','12'],['N','14'],['O','16'],['Cl','35,5'],['Cu','63,5']],dataNote:'Masas atómicas en g/mol. R = 0,082 L·atm/(K·mol); 1 atm = 1013,25 hPa.',
   exercises:[
    E(1,'Mezcla de metano, nitrógeno y dióxido de carbono',
     items('Un recipiente rígido de <b>10,0 L</b> a <b>27 °C</b> contiene <b>8,00 g de CH₄</b>, <b>14,0 g de N₂</b> y <b>4,40 g de CO₂</b>.',[['a','Calcular los moles y la fracción molar de cada gas.'],['b','Calcular la presión total y la presión parcial de cada gas, en atm y en hPa.'],['c','¿Qué ley se aplica? Si se agrega argón al recipiente a volumen y temperatura constantes, ¿qué pasa con la presión parcial del metano y con su fracción molar?']]),
     plan('Vamos a pasar cada masa a moles (n = m/M<sub>m</sub>), calcular la presión total con la ecuación de estado (P<sub>T</sub>·V = n<sub>T</sub>·R·T) y repartirla con la ley de Dalton (p<sub>i</sub> = X<sub>i</sub>·P<sub>T</sub>).',
      [R`n_i=\frac{m_i}{M_{m,i}}`,R`X_i=\frac{n_i}{n_T}`,R`P_T=\frac{n_TRT}{V}`,R`p_i=X_i\cdot P_T`])+
     datos([['M<sub>m</sub>(CH₄)','12 + 4·1 = 16 g/mol','tabla'],['M<sub>m</sub>(N₂)','2·14 = 28 g/mol','tabla'],['M<sub>m</sub>(CO₂)','12 + 2·16 = 44 g/mol','tabla'],['V, T','10,0 L; 27 °C = 300,15 K','enunciado'],['R','0,082 L·atm/(K·mol)','constante'],['1 atm','1013,25 hPa','equivalencia']])+
     part('a) Moles y fracciones molares')+
     step('1.',chain(R`n_{CH_4}=\frac{8{,}00}{16}=0{,}500\ \mathrm{mol}`,R`n_{N_2}=\frac{14{,}0}{28}=0{,}500\ \mathrm{mol}`,R`n_{CO_2}=\frac{4{,}40}{44}=0{,}100\ \mathrm{mol}`,R`n_T=1{,}100\ \mathrm{mol}`,R`X_{CH_4}=X_{N_2}=\frac{0{,}500}{1{,}100}=0{,}455`,R`X_{CO_2}=\frac{0{,}100}{1{,}100}=0{,}091`))+
     part('b) Presiones')+
     step('2. Presión total',chain(R`P_T=\frac{1{,}100\cdot0{,}082\cdot300{,}15}{10{,}0}=2{,}707\ \mathrm{atm}`,R`P_T=2{,}707\cdot1013{,}25=2743\ \mathrm{hPa}`))+
     step('3. Parciales',chain(R`p_{CH_4}=p_{N_2}=0{,}455\cdot2{,}707=1{,}231\ \mathrm{atm}=1247\ \mathrm{hPa}`,R`p_{CO_2}=0{,}091\cdot2{,}707=0{,}246\ \mathrm{atm}=249\ \mathrm{hPa}`))+
     part('c) Ley y agregado de argón')+
     step('4.','<p>Es la <b>ley de Dalton</b>: cada gas ejerce su presión como si estuviera solo y la total es la suma. Si se agrega Ar a V y T constantes, la presión parcial del CH₄ <b>no cambia</b> (p = n·R·T/V y nada de eso cambió), pero su <b>fracción molar baja</b> porque aumentan los moles totales. Sube la presión total.</p>'),
     'a) 0,500 / 0,500 / 0,100 mol; X = 0,455 / 0,455 / 0,091 · b) P<sub>T</sub> = 2,707 atm (2743 hPa); CH₄ y N₂ 1,231 atm (1247 hPa); CO₂ 0,246 atm (249 hPa) · c) Dalton; p(CH₄) no cambia, X(CH₄) disminuye'),

    E(2,'Ácido muriático comercial: concentración y diluciones',
     items('El ácido muriático que se vende para limpieza es una solución de HCl. Un frasco de <b>1,0 L</b> contiene solución al <b>36,5 % m/m</b> con densidad <b>1,18 g/mL</b>.',[['a','Expresar su concentración en molalidad, molaridad y % m/v.'],['b','¿Qué volumen hay que medir para preparar 2,00 L de HCl 0,500 M?'],['c','A la solución de b) se le hace una dilución 1:10 y luego otra 1:50 (en ambos casos se prepara 1 L). ¿Cuáles son las molaridades obtenidas?']]),
     plan('Vamos a trabajar con el litro de solución comercial (m = δ·V, % para el soluto, diferencia para el agua) y después usar C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub> y C<sub>f</sub> = C<sub>i</sub>/x para las diluciones.',
      [R`m_{sc}=\delta V`,R`b=\frac{n_{st}}{m_{sv}(\mathrm{kg})}`,R`M=\frac{n_{st}}{V_{sc}}`,R`C_iV_i=C_fV_f`])+
     datos([['V, δ, %','1,0 L; 1,18 g/mL; 36,5 % m/m','enunciado'],['M<sub>m</sub>(HCl)','1 + 35,5 = 36,5 g/mol','tabla']])+
     part('a)')+
     step('1. Masas y moles',chain(R`m_{sc}=1180\ \mathrm{g}`,R`m_{st}=0{,}365\cdot1180=430{,}7\ \mathrm{g}`,R`m_{sv}=749{,}3\ \mathrm{g}`,R`n=\frac{430{,}7}{36{,}5}=11{,}80\ \mathrm{mol}`))+
     step('2. Expresiones',chain(R`b=\frac{11{,}80}{0{,}7493}=15{,}75\ \mathrm{m}`,R`M=11{,}80\ \mathrm{M}`,R`\%\,m/v=\frac{430{,}7}{1000}\cdot100=43{,}07\ \%`))+
     part('b)')+step('3.',chain(R`V_i=\frac{0{,}500\cdot2{,}00}{11{,}80}=0{,}0847\ \mathrm{L}=84{,}7\ \mathrm{mL}`))+
     part('c)')+step('4.',chain([R`C_1=\frac{0{,}500}{10}=0{,}0500\ \mathrm{M}`,'100 mL llevados a 1 L'],[R`C_2=\frac{0{,}0500}{50}=1{,}00\cdot10^{-3}\ \mathrm{M}`,'20 mL llevados a 1 L'])),
     'a) 15,75 m · 11,80 M · 43,07 % m/v · b) 84,7 mL · c) 0,0500 M y 1,00·10⁻³ M'),

    E(3,'Nitrato de cobre(II): neutralización y redox',
     items('El nitrato de cobre(II) se usa como mordiente en tintorería. Puede obtenerse por <b>neutralización</b> del hidróxido de cobre(II) con ácido nítrico, o tratando <b>cobre metálico con ácido nítrico concentrado</b>, reacción que libera además dióxido de nitrógeno y agua.',[['a','Escribir las dos ecuaciones y balancear la redox por el método ion-electrón.'],['b','¿Qué masa de cobre (en kg) se necesita para obtener 1,50 kg de nitrato de cobre(II) con 100 % de rendimiento? ¿Qué volumen de NO₂ se libera a 90 °C y 1 atm?'],['c','¿Qué masa de cobre habría que usar si el rendimiento fuera del 80 %?']]),
     part('a) Ecuaciones')+
     plan('Escribimos la neutralización y, en la redox, separamos la oxidación del Cu (0 → +2) y la reducción del N (+5 en el nitrato → +4 en el NO₂); igualamos electrones y sumamos.',null)+
     step('1. Neutralización',chain(R`\mathrm{Cu(OH)_2(s)}+2\,\mathrm{HNO_3(aq)}\to\mathrm{Cu(NO_3)_2(aq)}+2\,\mathrm{H_2O(l)}`))+
     step('2. Hemirreacciones',chain([R`\mathrm{Cu}\to\mathrm{Cu^{2+}}+2e^-`,'oxidación'],[R`\mathrm{NO_3^-}+2\,\mathrm{H^+}+e^-\to\mathrm{NO_2}+\mathrm{H_2O}`,'reducción, ×2'],R`\mathrm{Cu}+2\,\mathrm{NO_3^-}+4\,\mathrm{H^+}\to\mathrm{Cu^{2+}}+2\,\mathrm{NO_2}+2\,\mathrm{H_2O}`))+
     step('3. Ecuación molecular (2 NO₃⁻ espectadores más)',chain(R`\mathrm{Cu(s)}+4\,\mathrm{HNO_3(conc)}\to\mathrm{Cu(NO_3)_2(aq)}+2\,\mathrm{NO_2(g)}+2\,\mathrm{H_2O(l)}`))+
     part('b) Masa de Cu y volumen de NO₂')+
     plan('Vamos a pasar la sal a moles, usar la relación 1 Cu : 1 Cu(NO₃)₂ : 2 NO₂ y calcular el volumen con V = n·R·T/P.',[R`n=\frac{m}{M_m}`,R`V=\frac{nRT}{P}`])+
     datos([['m sal','1,50 kg = 1500 g','enunciado'],['M<sub>m</sub>(Cu(NO₃)₂)','63,5 + 2·(14 + 3·16) = 187,5 g/mol','tabla'],['T, P','90 °C = 363,15 K; 1 atm','enunciado'],['R','0,082 L·atm/(K·mol)','constante']])+
     step('4.',chain(R`n_{sal}=\frac{1500}{187{,}5}=8{,}00\ \mathrm{mol}`,R`m_{Cu}=8{,}00\cdot63{,}5=508\ \mathrm{g}=0{,}508\ \mathrm{kg}`,R`n_{NO_2}=2\cdot8{,}00=16{,}0\ \mathrm{mol}`,R`V=\frac{16{,}0\cdot0{,}082\cdot363{,}15}{1}=476{,}5\ \mathrm{L}`))+
     part('c) Con 80 % de rendimiento')+
     plan('Si sólo se aprovecha el 80 %, hay que poner más reactivo: masa real = masa teórica / 0,80.',[R`m_{real}=\frac{m_{teórica}}{\eta}`])+
     step('5.',chain(R`m_{Cu}=\frac{0{,}508}{0{,}80}=0{,}635\ \mathrm{kg}`)),
     'a) Cu(OH)₂ + 2HNO₃ → Cu(NO₃)₂ + 2H₂O · Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O · b) 0,508 kg de Cu; 476,5 L de NO₂ · c) 0,635 kg')
   ]});

  // ---------- Modelo C ----------
  evaluation(u,{key:'qg-ev-sol-2c',label:'Evaluación · Mezcla de gases, soluciones y diluciones · Modelo C',kicker:'EVALUACIÓN · MODELO C',
   title:'Mezcla de gases – Soluciones y diluciones aplicadas · Modelo C',
   meta:'Segundo modelo nuevo con la misma estructura. Tres ejercicios.',
   recursos:'Ir de presiones parciales a moles y masas de cada gas; calcular la composición en masa y la masa molar media de una mezcla; usar la fracción molar en una solución comercial; encadenar diluciones dando volúmenes en lugar del factor; combinar pureza y rendimiento en el cálculo inverso de un reactivo.',
   data:[['H','1'],['N','14'],['O','16'],['S','32'],['Ar','40'],['Cu','63,5']],dataNote:'Masas atómicas en g/mol. R = 0,082 L·atm/(K·mol).',
   exercises:[
    E(1,'Aire seco simplificado: N₂, O₂ y Ar',
     items('Un recipiente de <b>5,00 L</b> a <b>25 °C</b> contiene una mezcla de N₂, O₂ y Ar con presión total <b>1,00 atm</b>. La presión parcial del O₂ es <b>0,21 atm</b> y la fracción molar del argón es <b>1/78</b> de la del nitrógeno.',[['a','Calcular la fracción molar y la presión parcial de cada gas.'],['b','Calcular los moles y la masa de cada gas, y la composición de la mezcla en % m/m.'],['c','Calcular la masa molar media de la mezcla. ¿Qué ley fundamental permite hacer estos cálculos?']]),
     plan('Vamos a sacar X(O₂) de la ley de Dalton (X = p/P<sub>T</sub>), repartir el resto entre N₂ y Ar con la relación del enunciado, calcular los moles totales con P·V = n·R·T y pasar a masas con m = n·M<sub>m</sub>.',
      [R`X_i=\frac{p_i}{P_T}`,R`n_T=\frac{P_TV}{RT}`,R`n_i=X_in_T`,R`\bar M=\frac{m_T}{n_T}=\sum X_iM_i`])+
     datos([['P<sub>T</sub>, p(O₂)','1,00 atm; 0,21 atm','enunciado'],['X(Ar)','X(N₂)/78','enunciado'],['V, T','5,00 L; 25 °C = 298,15 K','enunciado'],['M<sub>m</sub>','N₂ 28 · O₂ 32 · Ar 40 g/mol','tabla'],['R','0,082 L·atm/(K·mol)','constante']])+
     part('a) Fracciones y presiones')+
     step('1.',chain(R`X_{O_2}=\frac{0{,}21}{1{,}00}=0{,}21`,R`X_{N_2}+\frac{X_{N_2}}{78}=1-0{,}21=0{,}79`,R`X_{N_2}=\frac{0{,}79\cdot78}{79}=0{,}78`,R`X_{Ar}=0{,}01`,R`p_{N_2}=0{,}78\ \mathrm{atm};\ p_{O_2}=0{,}21\ \mathrm{atm};\ p_{Ar}=0{,}01\ \mathrm{atm}`))+
     part('b) Moles, masas y % m/m')+
     step('2. Moles totales',chain(R`n_T=\frac{1{,}00\cdot5{,}00}{0{,}082\cdot298{,}15}=0{,}2045\ \mathrm{mol}`))+
     step('3. Cada gas',table(['Gas','n = X·n<sub>T</sub> (mol)','m = n·M<sub>m</sub> (g)','% m/m'],[['N₂','0,1595','4,467','75,41 %'],['O₂','0,04295','1,374','23,20 %'],['Ar','0,002045','0,0818','1,38 %'],['Total','0,2045','5,923','100 %']]))+
     part('c) Masa molar media')+
     step('4.',chain(R`\bar M=0{,}78\cdot28+0{,}21\cdot32+0{,}01\cdot40=28{,}96\ \mathrm{g/mol}`,R`\bar M=\frac{5{,}923}{0{,}2045}=28{,}96\ \mathrm{g/mol}`)+'<p>Se basa en la <b>ley de Dalton</b>: la presión de cada gas es proporcional a sus moles, por eso X = p/P<sub>T</sub>.</p>'),
     'a) X: N₂ 0,78 · O₂ 0,21 · Ar 0,01 (mismos valores en atm) · b) 4,467 g N₂ · 1,374 g O₂ · 0,0818 g Ar → 75,41 % / 23,20 % / 1,38 % · c) 28,96 g/mol; ley de Dalton'),

    E(2,'Amoníaco comercial: concentración y diluciones encadenadas',
     items('Una solución comercial de amoníaco contiene <b>28 % m/m de NH₃</b> y tiene densidad <b>0,90 g/mL</b>.',[['a','Expresarla en molaridad, molalidad, % m/v y fracción molar de NH₃.'],['b','¿Qué volumen hay que medir para preparar 250 mL de solución 1,50 M?'],['c','Los 250 mL de b) se mezclan con 750 mL de agua. Luego se toman 100 mL de esa solución y se llevan a 500 mL. Calcular ambas molaridades y el factor de dilución total.']]),
     plan('Vamos a tomar 1 L de solución comercial (m = δ·V, % para el soluto, diferencia para el agua) y para las diluciones usar C<sub>i</sub>·V<sub>i</sub> = C<sub>f</sub>·V<sub>f</sub>, calculando el factor como V<sub>f</sub>/V<sub>i</sub>.',
      [R`m_{sc}=\delta V`,R`X_{st}=\frac{n_{st}}{n_{st}+n_{sv}}`,R`C_iV_i=C_fV_f`])+
     datos([['%, δ','28 % m/m; 0,90 g/mL','enunciado'],['M<sub>m</sub>(NH₃)','14 + 3·1 = 17 g/mol','tabla'],['M<sub>m</sub>(H₂O)','2·1 + 16 = 18 g/mol','tabla']])+
     part('a)')+
     step('1. Masas y moles en 1 L',chain(R`m_{sc}=900\ \mathrm{g}`,R`m_{st}=0{,}28\cdot900=252\ \mathrm{g}`,R`m_{sv}=648\ \mathrm{g}`,R`n_{st}=\frac{252}{17}=14{,}82\ \mathrm{mol}`,R`n_{sv}=\frac{648}{18}=36{,}0\ \mathrm{mol}`))+
     step('2. Expresiones',chain(R`M=14{,}82\ \mathrm{M}`,R`b=\frac{14{,}82}{0{,}648}=22{,}88\ \mathrm{m}`,R`\%\,m/v=\frac{252}{1000}\cdot100=25{,}2\ \%`,R`X_{NH_3}=\frac{14{,}82}{14{,}82+36{,}0}=0{,}292`))+
     part('b)')+step('3.',chain(R`V_i=\frac{1{,}50\cdot0{,}250}{14{,}82}=0{,}0253\ \mathrm{L}=25{,}3\ \mathrm{mL}`))+
     part('c)')+
     step('4. Primera dilución (250 mL → 1000 mL)',chain(R`C_1=\frac{1{,}50\cdot250}{1000}=0{,}375\ \mathrm{M}`,R`\text{factor}=\frac{1000}{250}=4`))+
     step('5. Segunda dilución (100 mL → 500 mL)',chain(R`C_2=\frac{0{,}375\cdot100}{500}=0{,}0750\ \mathrm{M}`,R`\text{factor}=5`,R`\text{factor total}=4\cdot5=20\Rightarrow1{:}20`)),
     'a) 14,82 M · 22,88 m · 25,2 % m/v · X = 0,292 · b) 25,3 mL · c) 0,375 M y 0,0750 M; factor total 1:20'),

    E(3,'Sulfato de cobre(II): neutralización, redox, pureza y rendimiento',
     items('El sulfato de cobre(II) se usa como alguicida en piletas. Se obtiene por <b>neutralización</b> del hidróxido de cobre(II) con ácido sulfúrico, o tratando <b>cobre con ácido sulfúrico concentrado y caliente</b>, que forma además dióxido de azufre y agua.',[['a','Escribir las dos ecuaciones y balancear la redox por el método ion-electrón.'],['b','¿Qué masa (en kg) de cobre de 90 % de pureza hay que tratar con ácido en exceso para obtener 3,19 kg de CuSO₄, si el rendimiento es del 80 %?'],['c','¿Qué volumen de SO₂ se libera, medido a 150 °C y 2,00 atm?']]),
     part('a) Ecuaciones')+
     plan('Escribimos la neutralización y, en la redox, la oxidación del Cu (0 → +2) y la reducción del S (+6 → +4); como ambas intercambian 2 electrones, se suman directamente.',null)+
     step('1. Neutralización',chain(R`\mathrm{Cu(OH)_2(s)}+\mathrm{H_2SO_4(aq)}\to\mathrm{CuSO_4(aq)}+2\,\mathrm{H_2O(l)}`))+
     step('2. Hemirreacciones',chain([R`\mathrm{Cu}\to\mathrm{Cu^{2+}}+2e^-`,'oxidación'],[R`\mathrm{SO_4^{2-}}+4\,\mathrm{H^+}+2e^-\to\mathrm{SO_2}+2\,\mathrm{H_2O}`,'reducción'],R`\mathrm{Cu}+\mathrm{SO_4^{2-}}+4\,\mathrm{H^+}\to\mathrm{Cu^{2+}}+\mathrm{SO_2}+2\,\mathrm{H_2O}`,R`\mathrm{Cu(s)}+2\,\mathrm{H_2SO_4(conc)}\to\mathrm{CuSO_4(aq)}+\mathrm{SO_2(g)}+2\,\mathrm{H_2O(l)}`))+
     part('b) Masa de cobre impuro')+
     plan('Vamos de atrás para adelante: moles de sal que se quieren obtener → moles teóricos (divididos por el rendimiento) → masa de Cu puro → masa de muestra (dividida por la pureza).',
      [R`n_{teórico}=\frac{n_{real}}{\eta}`,R`m_{muestra}=\frac{m_{puro}}{\text{pureza}}`])+
     datos([['m CuSO₄','3,19 kg = 3190 g','enunciado'],['M<sub>m</sub>(CuSO₄)','63,5 + 32 + 4·16 = 159,5 g/mol','tabla'],['η, pureza','80 %; 90 %','enunciado'],['T, P','150 °C = 423,15 K; 2,00 atm','enunciado'],['R','0,082 L·atm/(K·mol)','constante']])+
     step('3.',chain(R`n_{real}=\frac{3190}{159{,}5}=20{,}0\ \mathrm{mol}`,R`n_{Cu}=\frac{20{,}0}{0{,}80}=25{,}0\ \mathrm{mol}`,R`m_{Cu\ puro}=25{,}0\cdot63{,}5=1587{,}5\ \mathrm{g}`,R`m_{muestra}=\frac{1587{,}5}{0{,}90}=1764\ \mathrm{g}=1{,}76\ \mathrm{kg}`))+
     part('c) Volumen de SO₂')+
     plan('El SO₂ que realmente se forma es el de la reacción que ocurrió: 1 mol de SO₂ por cada mol de CuSO₄ obtenido (20,0 mol). Usamos V = n·R·T/P.',[R`V=\frac{nRT}{P}`])+
     step('4.',chain(R`V=\frac{20{,}0\cdot0{,}082\cdot423{,}15}{2{,}00}=347{,}0\ \mathrm{L}`)),
     'a) Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O · Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O · b) 1,76 kg de cobre impuro · c) 347,0 L de SO₂')
   ]});
})();
