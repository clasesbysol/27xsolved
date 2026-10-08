// 27xSOLved · Química Inorgánica 4.º · TEORÍA (1/2)
// Unidades: 1 Caja de herramientas · 2 Hidrógeno, oxígeno y agua · 3 Metales de los grupos 1 y 2.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  const {m,chain,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field,simple}=K;
  const {rx,rxs,f,vira,swatch,pic,punch,facts,svg}=Q;
  const R=String.raw;

  // =====================================================================
  // UNIDAD 1 · CAJA DE HERRAMIENTAS
  // =====================================================================
  const s1=[];const a1=(key,label,kicker,html)=>s1.push({key:`qi-h-${key}`,label,kicker,html});

  a1('leer','Cómo leer (y escribir) una reacción del TP','HERRAMIENTAS · 01',`
<p>En los trabajos prácticos de Inorgánica siempre se repite el mismo juego: <b>hacemos algo</b>, <b>vemos un cambio</b> y tenemos que <b>explicarlo con una ecuación</b>. Si aprendés a mirar el tubo con ojos de químico, la mitad del informe se escribe solo.</p>
${punch('Observación → interpretación → ecuación. Nunca al revés: la ecuación tiene que explicar lo que viste.')}
<h3>Las pistas que da un tubo de ensayo</h3>
${table(['Lo que ves','Lo que suele significar','Ejemplo del TP'],[
 ['Burbujeo, efervescencia','Se forma un <b>gas</b>','Zn + HCl → H₂ · NaHCO₃ + HCl → CO₂'],
 ['Turbidez o sólido que aparece','Se forma un <b>precipitado</b> (sólido insoluble)','CO₂ en agua de barita → BaCO₃'],
 ['Cambio de color de la solución','Cambió una especie coloreada (estado de oxidación, complejo o indicador)','MnO₄⁻ violeta → Mn²⁺ incoloro'],
 ['Se disuelve un sólido','El sólido reaccionó o formó un complejo soluble','Cu(OH)₂ + NH₃ en exceso'],
 ['Se calienta el tubo, chispas, luz','Reacción muy exotérmica','Mg ardiendo en O₂ o en CO₂'],
 ['Olor','Se desprende un gas con olor','NH₃ (picante), NO₂ (sofocante)']
])}
<h3>El “idioma” de las ecuaciones</h3>
${rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)↑','↑ = sale como gas'],['BaCl2(ac) + Na2CO3(ac) -> BaCO3(s)↓ + 2 NaCl(ac)','↓ = precipita'],['2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)','arriba de la flecha: catalizador y calor'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)','⇌ = equilibrio, no se completa'])}
${facts([['(s)','sólido'],['(l)','líquido'],['(g)','gas'],['(ac)','disuelto en agua'],['(c) · (d)','concentrado · diluido'],['Δ','se calienta']])}
<h3>Ecuación molecular, iónica y neta</h3>
<p>Las sales, ácidos fuertes y bases fuertes disueltas están <b>separadas en iones</b>. Por eso una misma reacción se puede escribir de tres maneras:</p>
${rxs(['BaCl2(ac) + Na2CO3(ac) -> BaCO3(s) + 2 NaCl(ac)','molecular'],['Ba^2+ + 2 Cl^- + 2 Na^+ + CO3^2- -> BaCO3(s) + 2 Na^+ + 2 Cl^-','iónica completa'],['Ba^2+(ac) + CO3^2-(ac) -> BaCO3(s)','iónica neta'])}
${idea('Iones espectadores','<p>Na⁺ y Cl⁻ aparecen igual de los dos lados: <b>miran pero no juegan</b>. La ecuación neta muestra sólo lo que realmente cambia, y sirve para entender por qué <i>cualquier</i> sal de Ba²⁺ con <i>cualquier</i> carbonato soluble da el mismo precipitado blanco.</p>')}
`);

  a1('oxidacion','Números de oxidación en un minuto','HERRAMIENTAS · 02',`
<p>Para saber si una reacción es redox, quién se oxida y quién se reduce, necesitamos los <b>números de oxidación</b> ${simple('la “carga” que tendría cada átomo si todos los enlaces fueran iónicos')}.</p>
${table(['Regla','Ejemplo'],[
 ['Elemento sin combinar: 0','Zn, O₂, N₂, S, C'],
 ['Ion monoatómico: su carga','Na⁺ = +1, Cl⁻ = −1, Fe³⁺ = +3'],
 ['O casi siempre −2 (en peróxidos −1)','H₂O, CO₂ · H₂O₂, Na₂O₂'],
 ['H casi siempre +1 (en hidruros metálicos −1)','HCl, NH₃ · NaH, CaH₂'],
 ['Alcalinos +1 y alcalinotérreos +2','K, Na · Mg, Ca, Ba'],
 ['La suma da la carga total','neutra = 0; ion = su carga']
])}
${example('¿Con qué número de oxidación actúa el N en cada especie?',`<p>HNO₃ · NO₂ · NH₄⁺ · N₂</p>`,
 step('HNO₃ (neutro)',chain(R`(+1)+x+3(-2)=0`,R`x=+5`))+
 step('NO₂ (neutro)',chain(R`x+2(-2)=0`,R`x=+4`))+
 step('NH₄⁺ (carga +1)',chain(R`x+4(+1)=+1`,R`x=-3`))+
 step('N₂ (elemento)',`<p>Sin combinar: <b>0</b>.</p>`),
 'N: +5 en HNO₃ · +4 en NO₂ · −3 en NH₄⁺ · 0 en N₂')}
${example('Manganeso: el camaleón del laboratorio',`<p>KMnO₄ · MnO₂ · MnSO₄</p>`,
 step('KMnO₄',chain(R`(+1)+x+4(-2)=0\Rightarrow x=+7`,'violeta intenso'))+
 step('MnO₂',chain(R`x+2(-2)=0\Rightarrow x=+4`,'sólido pardo-negro'))+
 step('MnSO₄',chain(R`x+(-2)=0\Rightarrow x=+2`,'SO₄²⁻ cuenta como −2 · casi incoloro')),
 'Mn: +7 (violeta) → +4 (pardo) → +2 (incoloro). ¡El color delata cuánto se redujo!')}
${idea('Oxidante y reductor','<p><b>Se oxida</b> = pierde electrones, su número de oxidación <b>sube</b>: es el <b>reductor</b>.<br><b>Se reduce</b> = gana electrones, su número <b>baja</b>: es el <b>oxidante</b>.<br>Regla para no olvidarla: <i>el que se oxida “le da” electrones al otro y lo reduce</i>.</p>')}
`);

  a1('ion-electron','El método del ion-electrón','HERRAMIENTAS · 03',`
<p>El cuestionario pide balancear las redox <b>por el método del ion-electrón</b>. La idea es separar la reacción en dos <b>hemirreacciones</b> ${simple('la mitad que pierde electrones y la mitad que los gana')}, balancear cada una y después sumarlas para que los electrones se cancelen.</p>
${table(['Paso','Medio ácido','Medio básico'],[
 ['1','Escribir las dos hemirreacciones con las especies que cambian','igual'],
 ['2','Balancear todo menos O y H','igual'],
 ['3','Balancear O agregando H₂O','igual (o con OH⁻ / H₂O)'],
 ['4','Balancear H agregando H⁺','agregar H₂O del lado que falta H y OH⁻ del otro'],
 ['5','Balancear cargas con electrones','igual'],
 ['6','Multiplicar para igualar electrones y sumar','igual'],
 ['7','Simplificar y volver a la ecuación molecular agregando los iones espectadores','igual']
])}
${example('Medio ácido · Permanganato y agua oxigenada (TP 4)',`<p>Balancear: KMnO₄ + H₂O₂ + H₂SO₄ → MnSO₄ + O₂ + K₂SO₄ + H₂O</p>`,
 step('1. ¿Quién cambia?',`<p>Mn: +7 → +2 (se reduce: <b>oxidante</b>). O del H₂O₂: −1 → 0 en O₂ (se oxida: <b>reductor</b>).</p>`)+
 step('2. Reducción',rxs(['MnO4^- -> Mn^2+','esqueleto'],['MnO4^- -> Mn^2+ + 4 H2O','4 O con agua'],['MnO4^- + 8 H^+ -> Mn^2+ + 4 H2O','8 H con H⁺'],['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','carga: +7 a la izquierda, +2 a la derecha → 5 e⁻']))+
 step('3. Oxidación',rxs(['H2O2 -> O2 + 2 H^+ + 2 e^-','O ya balanceado; 2 H⁺ y 2 e⁻']))+
 step('4. Igualar electrones (×2 y ×5) y sumar',rxs(['2 MnO4^- + 16 H^+ + 10 e^- -> 2 Mn^2+ + 8 H2O','× 2'],['5 H2O2 -> 5 O2 + 10 H^+ + 10 e^-','× 5'],['2 MnO4^- + 6 H^+ + 5 H2O2 -> 2 Mn^2+ + 5 O2 + 8 H2O','16 H⁺ − 10 H⁺ = 6 H⁺']))+
 step('5. Ecuación molecular',rxs(['2 KMnO4 + 5 H2O2 + 3 H2SO4 -> 2 MnSO4 + 5 O2 + K2SO4 + 8 H2O','2 K⁺ y 3 SO₄²⁻ espectadores']))+
 step('6. Control',`<p>K 2 = 2 · Mn 2 = 2 · S 3 = 3 · H 10 + 6 = 16 = 16 · O 8 + 10 + 12 = 30 = 8 + 10 + 4 + 8 ✓</p>`),
 '2 KMnO₄ + 5 H₂O₂ + 3 H₂SO₄ → 2 MnSO₄ + 5 O₂ + K₂SO₄ + 8 H₂O')}
${example('Medio básico · Amoníaco y permanganato (TP 5)',`<p>En solución de amoníaco el medio es básico: el MnO₄⁻ se reduce a MnO₂ (pardo) y el NH₃ se oxida a N₂.</p>`,
 step('1. Oxidación',rxs(['2 NH3 -> N2','N: −3 → 0'],['2 NH3 + 6 OH^- -> N2 + 6 H2O + 6 e^-','6 H del NH₃ se “llevan” con 6 OH⁻ formando agua']))+
 step('2. Reducción',rxs(['MnO4^- -> MnO2','Mn: +7 → +4'],['MnO4^- + 2 H2O + 3 e^- -> MnO2 + 4 OH^-','2 O sobrantes → 2 H₂O del otro lado y 4 OH⁻']))+
 step('3. Igualar (× 1 y × 2) y sumar',rxs(['2 NH3 + 6 OH^- + 2 MnO4^- + 4 H2O -> N2 + 6 H2O + 2 MnO2 + 8 OH^-'],['2 NH3 + 2 MnO4^- -> N2 + 2 MnO2 + 2 OH^- + 2 H2O','se simplifican 6 OH⁻ y 4 H₂O']))+
 step('4. Control',`<p>N 2 = 2 · Mn 2 = 2 · O 8 = 4 + 2 + 2 · H 6 = 2 + 4 · carga −2 = −2 ✓</p>`),
 '2 NH₃ + 2 MnO₄⁻ → N₂ + 2 MnO₂ + 2 OH⁻ + 2 H₂O')}
${warn('Errores típicos','<ul><li>Olvidar que en medio <b>básico</b> no puede quedar H⁺ en la ecuación final.</li><li>Sumar las hemirreacciones sin igualar electrones.</li><li>No volver a la ecuación molecular cuando la consigna da los reactivos como sales (KMnO₄, KI…).</li></ul>')}
`);

  a1('calculos','Cálculos de laboratorio: soluciones y gases','HERRAMIENTAS · 04',`
<p>Casi todos los problemas del cuestionario son la misma receta: <b>sólido → moles → moles del otro reactivo → masa → solución → volumen</b>. Y si sale un gas, <b>moles → litros</b> con la ecuación de los gases.</p>
<h3>Receta 1 · ¿Qué volumen de solución necesito?</h3>
${chain([R`n_{\text{sólido}}=\frac{m}{M}`,'moles del sólido que tengo'],[R`n_{\text{reactivo}}=n_{\text{sólido}}\cdot\frac{\text{coef. reactivo}}{\text{coef. sólido}}`,'relación de la ecuación balanceada'],[R`m_{\text{puro}}=n\cdot M`,'gramos de reactivo puro'],[R`m_{\text{solución}}=m_{\text{puro}}\cdot\frac{100}{\%\,m/m}`,'la solución no es pura'],[R`V=\frac{m_{\text{solución}}}{\delta}`,'densidad en g/mL'])}
${idea('Atajo para % m/V','<p>Si la concentración es <b>% m/V</b> (gramos cada 100 mL), te salteás la densidad: '+m(R`V=m_{\text{puro}}\cdot\frac{100\ \text{mL}}{\%\,m/V}`)+'. Si es <b>molar</b>: '+m(R`V=\frac{n}{C}`)+'.</p>')}
<h3>Receta 2 · ¿Cuánto gas se forma?</h3>
${chain([R`PV=nRT\ \Rightarrow\ V=\frac{nRT}{P}`],[R`R=0{,}082\ \frac{\mathrm{atm\,L}}{\mathrm{mol\,K}}\qquad T(\mathrm{K})=t(^\circ\mathrm{C})+273`])}
${facts([['25 °C y 1 atm','1 mol de gas ≈ 24,5 L'],['CNPT (0 °C, 1 atm)','1 mol de gas ≈ 22,4 L'],['Densidad de un gas','δ = P·M / (R·T)'],['Aire','M media ≈ 29 g/mol']])}
${example('Carbonato de sodio y ácido clorhídrico',`<p>¿Qué volumen de HCl 18 % m/m (δ = 1,09 g/mL) reacciona exactamente con 2,00 g de Na₂CO₃? ¿Cuántos litros de CO₂ se obtienen a 25 °C y 1 atm?</p>`,
 step('1. Ecuación balanceada',rx('Na2CO3(s) + 2 HCl(ac) -> 2 NaCl(ac) + CO2(g) + H2O(l)','1 mol de carbonato gasta 2 mol de HCl'))+
 step('2. Moles del sólido',chain(R`M(\mathrm{Na_2CO_3})=2\cdot23+12+3\cdot16=106\ \mathrm{g/mol}`,R`n=\frac{2{,}00\ \mathrm{g}}{106\ \mathrm{g/mol}}=0{,}01887\ \mathrm{mol}`))+
 step('3. HCl necesario',chain(R`n_{\mathrm{HCl}}=2\cdot0{,}01887=0{,}03774\ \mathrm{mol}`,R`m_{\mathrm{HCl}}=0{,}03774\cdot36{,}5=1{,}378\ \mathrm{g}`,[R`m_{\text{sc}}=1{,}378\cdot\frac{100}{18}=7{,}65\ \mathrm{g}`,'solución al 18 %'],R`V=\frac{7{,}65\ \mathrm{g}}{1{,}09\ \mathrm{g/mL}}=7{,}02\ \mathrm{mL}`))+
 step('4. Volumen de CO₂',chain([R`n_{\mathrm{CO_2}}=n_{\mathrm{Na_2CO_3}}=0{,}01887\ \mathrm{mol}`,'relación 1 : 1'],R`V=\frac{0{,}01887\cdot0{,}082\cdot298}{1}=0{,}461\ \mathrm{L}`)),
 'V(HCl) ≈ 7,0 mL · V(CO₂) ≈ 0,46 L')}
${calc('reagent','Volumen de solución para consumir un sólido',field('ms','masa del sólido (g)',3)+field('Ms','M del sólido (g/mol)',84)+field('r','mol reactivo / mol sólido',1)+field('Mr','M del reactivo (g/mol)',36.5)+field('pct','% m/m del reactivo',36.5)+field('d','densidad (g/mL)',1.19)+field('extra','cierre hidráulico (mL)',0),'Viene cargado con el bicarbonato del TP 5. Cambiá los datos para probar otros casos.')}
${calc('gasvol','Volumen de gas que se forma',field('m','masa del reactivo (g)',2)+field('M','M del reactivo (g/mol)',53.5)+field('r','mol gas / mol reactivo',1)+field('t','temperatura (°C)',25)+field('P','presión (atm)',1),'Ejemplo cargado: NH₃ a partir de 2 g de NH₄Cl.')}
`);

  a1('repaso','Repaso rápido de herramientas','HERRAMIENTAS · REPASO',`
${cards([
 ['Ecuaciones','¿Qué significa ↓ después de una fórmula?','Que esa sustancia precipita: es un sólido insoluble que aparece en la solución.'],
 ['Ecuaciones','¿Qué es un ion espectador?','Un ion que está igual en reactivos y productos (por ejemplo Na⁺, K⁺, NO₃⁻). No participa del cambio.'],
 ['Redox','¿El oxidante se oxida o se reduce?','Se reduce: gana electrones y su número de oxidación baja.'],
 ['Redox','¿Qué número de oxidación tiene el O en H₂O₂?','−1. Por eso el agua oxigenada puede oxidarse (a O₂) o reducirse (a H₂O).'],
 ['Ion-electrón','En medio básico, ¿qué se usa para balancear?','H₂O y OH⁻. En la ecuación final no puede quedar H⁺.'],
 ['Cálculos','¿Cuánto ocupa 1 mol de gas a 25 °C y 1 atm?','Aproximadamente 24,5 L (en CNPT, 22,4 L).'],
 ['Cálculos','% m/m vs % m/V','m/m: gramos de soluto cada 100 g de solución (necesitás la densidad). m/V: gramos cada 100 mL.']
])}
`);

  // =====================================================================
  // UNIDAD 2 · HIDRÓGENO, OXÍGENO Y AGUA
  // =====================================================================
  const s2=[];const a2=(key,label,kicker,html)=>s2.push({key:`qi-ho-${key}`,label,kicker,html});

  a2('hidrogeno','Hidrógeno: el más liviano de todos','HIDRÓGENO Y OXÍGENO · 01',`
<p>El hidrógeno es el elemento más simple (1 protón, 1 electrón) y el más abundante del universo. En la Tierra casi no está libre: está “atrapado” en el agua, en los ácidos y en la materia orgánica. Como sustancia simple es el gas <b>H₂</b>.</p>
${facts([['Aspecto','gas incoloro, inodoro'],['Densidad','≈ 14 veces menor que el aire'],['Solubilidad en agua','muy baja'],['Combustible','arde con O₂ formando agua'],['Carácter','reductor']])}
<h3>¿Cómo se obtiene en el laboratorio?</h3>
<p>Con un <b>metal activo</b> y un <b>ácido no oxidante</b> (HCl o H₂SO₄ diluido). El metal le “roba” al ácido sus H⁺ y los convierte en H₂:</p>
${rxs(['Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)↑','el método del TP 4'],['Zn(s) + 2 H^+(ac) -> Zn^2+(ac) + H2(g)','ecuación iónica neta: Zn se oxida, H⁺ se reduce'])}
${figure(svg.gases,'Como el H₂ es casi insoluble, se recoge <b>desplazando agua</b> en la cuba hidroneumática.')}
${pic('generador-h2.webp','Aparato generador de hidrógeno de la guía: tubo con zinc y ácido, tubo acodado y cuba hidroneumática','Aparato de la guía del TP 4: el gas desplaza el agua del tubo invertido.')}
<h3>Cómo lo reconocemos</h3>
<p>Al acercar la boca del tubo a la llama se escucha un <b>“ladrido”</b> (una pequeña explosión): el H₂ se combina con el O₂ del aire.</p>
${rx('2 H2(g) + O2(g) -> 2 H2O(g)','muy exotérmica')}
${idea('¿Por qué el tubo se tiene boca abajo?','<p>Porque el H₂ es mucho más liviano que el aire: si das vuelta el tubo, <b>el hidrógeno se escapa hacia arriba</b> en segundos. Eso mismo se usa en el ensayo de densidad.</p>')}
${example('¿Cuánto hidrógeno se puede juntar?',`<p>Supongamos que las dos granallas pesan en total 1,00 g de Zn y se agregan 5 mL de HCl 6 M. ¿Quién se acaba primero? ¿Qué volumen de H₂ se obtiene a 25 °C y 1 atm? <i>(Datos de masa supuestos, para practicar.)</i></p>`,
 step('1. Moles de cada reactivo',chain(R`n_{\mathrm{Zn}}=\frac{1{,}00}{65{,}4}=0{,}0153\ \mathrm{mol}`,R`n_{\mathrm{HCl}}=0{,}005\ \mathrm{L}\cdot6\ \mathrm{mol/L}=0{,}030\ \mathrm{mol}`))+
 step('2. Reactivo limitante',chain([R`\text{HCl necesario}=2\cdot0{,}0153=0{,}0306\ \mathrm{mol}`,'necesito más HCl del que hay'],[R`\Rightarrow\ \text{limita el HCl}`,'queda un poquito de Zn sin reaccionar']))+
 step('3. Hidrógeno formado',chain([R`n_{\mathrm{H_2}}=\frac{0{,}030}{2}=0{,}015\ \mathrm{mol}`,'2 HCl dan 1 H₂'],R`V=0{,}015\cdot24{,}5=0{,}37\ \mathrm{L}`)),
 'Limita el HCl · V(H₂) ≈ 0,37 L: alcanza para llenar más de una docena de tubos')}
`);

  a2('hidruros','Hidruros: cuando el hidrógeno es negativo','HIDRÓGENO Y OXÍGENO · 02',`
<p>Un <b>hidruro</b> es un compuesto binario del hidrógeno. Hay dos grandes familias:</p>
${table(['Tipo','Con quién','Cómo es el H','Ejemplos'],[
 ['Iónicos (salinos)','metales muy activos (grupos 1 y 2)','<b>H⁻</b> (ion hidruro, n.o. −1)','NaH, CaH₂, LiH'],
 ['Covalentes (moleculares)','no metales','H unido covalentemente (n.o. +1)','H₂O, NH₃, CH₄, HCl']
])}
<p>El ion <b>H⁻</b> es una especie muy “desesperada”: tiene un electrón de más que quiere perder. Por eso es <b>muy básico</b> y <b>muy reductor</b>. Apenas toca agua, le saca un protón y se forma H₂:</p>
${rxs(['NaH(s) + H2O(l) -> NaOH(ac) + H2(g)↑','H⁻ (−1) + H⁺ (+1) → H₂ (0)'],['NaH(s) + HCl(ac) -> NaCl(ac) + H2(g)↑','con ácido, aún más rápido'])}
${idea('Doble vida del hidrógeno','<p>En el H₂ que sale, un H venía del hidruro (−1 → 0: <b>se oxida</b>) y el otro del agua o del ácido (+1 → 0: <b>se reduce</b>). Es una reacción redox “de encuentro”, como la del N₂ que veremos con el nitrito y el amonio.</p>')}
${note('Uso real','<p>El CaH₂ se usa como <b>secante</b> de solventes: reacciona con las trazas de agua y las elimina como H₂.</p>')}
`);

  a2('oxigeno','Oxígeno: el gran comburente','HIDRÓGENO Y OXÍGENO · 03',`
<p>El oxígeno es el elemento más abundante de la corteza terrestre y forma el 21 % del aire como <b>O₂</b>. No arde él mismo: es el <b>comburente</b> ${simple('la sustancia que permite que otra arda')}.</p>
${facts([['Aspecto','gas incoloro, inodoro'],['Densidad','un poco mayor que el aire'],['Solubilidad','baja (lo justo para los peces)'],['Carácter','oxidante'],['Reconocimiento','reaviva una astilla en punto de ignición']])}
<h3>Tres formas de obtenerlo en el laboratorio</h3>
${rxs(['2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)↑','clorato + catalizador'],['2 KMnO4(s) =[Δ]=> K2MnO4(s) + MnO2(s) + O2(g)↑','permanganato calentado'],['2 H2O2(ac) =[MnO2]=> 2 H2O(l) + O2(g)↑','agua oxigenada + catalizador'])}
${idea('¿Qué hace el MnO₂?','<p>Es un <b>catalizador</b>: acelera la descomposición sin gastarse. Al final del ensayo sigue ahí, negro como al principio.</p>')}
${pic('generador-o2.webp','Aparato para obtener oxígeno: tubo con clorato calentado con mechero y cuba hidroneumática','Mismo aparato que para el H₂, pero calentando el tubo (TP 4).')}
<h3>Lo que el oxígeno le hace a las demás sustancias</h3>
${table(['Con…','Producto','Carácter del óxido','Cómo se nota'],[
 ['Azufre ardiendo','SO₂','<b>ácido</b>: SO₂ + H₂O ⇌ H₂SO₃','llama azul brillante · tornasol azul → rojo'],
 ['Carbón incandescente','CO₂','<b>ácido</b>','el carbón se aviva y arde con más brillo'],
 ['Hierro al rojo','Fe₃O₄','—','chispas brillantes'],
 ['Sodio','Na₂O / Na₂O₂','<b>básico</b>','con agua: tornasol → azul'],
 ['Magnesio','MgO','<b>básico</b>','luz blanca enceguecedora, polvo blanco']
])}
${punch('No metal + O₂ → óxido ácido. Metal + O₂ → óxido básico.')}
<h3>El O₂ como oxidante en solución</h3>
<p>Burbujeado en soluciones ácidas, el oxígeno oxida a especies reductoras:</p>
${rxs(['4 I^-(ac) + O2(g) + 4 H^+(ac) -> 2 I2(ac) + 2 H2O(l)','ioduro → yodo (pardo)'],['4 Fe^2+(ac) + O2(g) + 4 H^+(ac) -> 4 Fe^3+(ac) + 2 H2O(l)','ferroso → férrico'])}
<p>Para “ver” los productos: el <b>yodo</b> se extrae con cloroformo y lo tiñe de ${swatch('#8a3fb3','violeta')}, y el <b>Fe³⁺</b> con tiocianato forma un complejo ${swatch('#9b111e','rojo sangre')}:</p>
${rx('Fe^3+(ac) + SCN^-(ac) -> [Fe(SCN)]^2+(ac)','reconocimiento del Fe³⁺')}
${example('Oxígeno a partir de clorato',`<p>¿Qué volumen de O₂ (25 °C, 1 atm) se obtiene al descomponer por completo 1,00 g de KClO₃?</p>`,
 step('1. Moles de clorato',chain(R`M(\mathrm{KClO_3})=39{,}1+35{,}5+3\cdot16=122{,}6\ \mathrm{g/mol}`,R`n=\frac{1{,}00}{122{,}6}=8{,}16\cdot10^{-3}\ \mathrm{mol}`))+
 step('2. Moles de O₂',chain([R`n_{\mathrm{O_2}}=8{,}16\cdot10^{-3}\cdot\frac{3}{2}=1{,}22\cdot10^{-2}\ \mathrm{mol}`,'2 KClO₃ dan 3 O₂']))+
 step('3. Volumen',chain(R`V=1{,}22\cdot10^{-2}\cdot24{,}5=0{,}30\ \mathrm{L}`)),
 'V(O₂) ≈ 0,30 L (300 mL)')}
`);

  a2('peroxido','Agua oxigenada: oxidante y reductor a la vez','HIDRÓGENO Y OXÍGENO · 04',`
<p>En el H₂O₂ el oxígeno tiene número de oxidación <b>−1</b>, justo a mitad de camino entre el O₂ (0) y el H₂O (−2). Eso le da una doble personalidad:</p>
${table(['Frente a…','El H₂O₂ actúa como','El O pasa de','Se forma'],[
 ['un reductor (I⁻, Fe²⁺)','<b>oxidante</b>','−1 → −2','H₂O'],
 ['un oxidante fuerte (MnO₄⁻)','<b>reductor</b>','−1 → 0','O₂ (burbujas)'],
 ['un catalizador (MnO₂) o la luz','se descompone (dismutación)','−1 → −2 y 0','H₂O + O₂']
])}
${rxs(['H2O2(ac) + 2 I^-(ac) + 2 H^+(ac) -> I2(ac) + 2 H2O(l)','oxidante: aparece el yodo'],['2 MnO4^-(ac) + 5 H2O2(ac) + 6 H^+(ac) -> 2 Mn^2+(ac) + 5 O2(g) + 8 H2O(l)','reductor: el violeta desaparece'])}
${warn('Si aparece un precipitado pardo','<p>Si falta ácido, el permanganato no llega a Mn²⁺ y se queda en <b>MnO₂</b> (pardo). Por eso la guía dice: si ves precipitado, agregá unas gotas más de ácido.</p>')}
<h3>¿Qué significa “agua oxigenada 10 volúmenes”?</h3>
<p>Que <b>1 litro</b> de solución, al descomponerse por completo, libera <b>10 litros de O₂</b> medidos en CNPT.</p>
${example('Pasar “10 volúmenes” a concentración',`<p>¿Cuál es la concentración molar y el % m/V de un agua oxigenada de 10 volúmenes?</p>`,
 step('1. Moles de O₂ en 1 L de solución',chain(R`n_{\mathrm{O_2}}=\frac{10\ \mathrm{L}}{22{,}4\ \mathrm{L/mol}}=0{,}446\ \mathrm{mol}`))+
 step('2. Moles de H₂O₂',chain([R`2\,\mathrm{H_2O_2}\to2\,\mathrm{H_2O}+\mathrm{O_2}`,'2 a 1'],R`n_{\mathrm{H_2O_2}}=2\cdot0{,}446=0{,}893\ \mathrm{mol}\ \Rightarrow\ 0{,}89\ \mathrm{M}`))+
 step('3. Gramos por litro y % m/V',chain(R`m=0{,}893\cdot34=30{,}4\ \mathrm{g/L}`,R`\%\,m/V=\frac{30{,}4\ \mathrm{g}}{1000\ \mathrm{mL}}\cdot100=3{,}0\ \%`)),
 '10 volúmenes ≈ 0,89 M ≈ 3 % m/V (la de la farmacia)')}
`);

  a2('agua','El agua: hidratos, acuocomplejos e hidrólisis','HIDRÓGENO Y OXÍGENO · 05',`
<p>El agua no es sólo “el solvente”: también <b>se une</b> a los iones metálicos y a veces <b>reacciona</b> con ellos. El TP 4 lo muestra con tres ensayos.</p>
<h3>1 · Hidratos: agua dentro del cristal</h3>
<p>El sulfato cúprico cristaliza con 5 moléculas de agua: <b>CuSO₄·5H₂O</b>, ${swatch('#2f7fd8','azul')}. Al calentarlo pierde el agua y queda ${swatch('#f4f4f4','blanco')}:</p>
${rxs(['CuSO4·5H2O(s) =[Δ]=> CuSO4(s) + 5 H2O(g)','azul → blanco'],['CuSO4(s) + 5 H2O(l) -> CuSO4·5H2O(s)','si se le agrega agua vuelve el azul (¡y se calienta!)'])}
${idea('El color es del agua unida al cobre','<p>El azul no es del Cu²⁺ “solo”: aparece cuando el cobre tiene moléculas de agua alrededor. Sin agua, el sulfato es blanco. Por eso el CuSO₄ anhidro se usa para <b>detectar humedad</b>.</p>')}
${example('¿Cuánta agua pierde el sulfato?',`<p>Se calientan 2,50 g de CuSO₄·5H₂O hasta peso constante. ¿Qué masa queda?</p>`,
 step('1. Porcentaje de agua',chain(R`M(\mathrm{CuSO_4\cdot5H_2O})=159{,}6+5\cdot18{,}0=249{,}6\ \mathrm{g/mol}`,R`\%\,\mathrm{H_2O}=\frac{90{,}0}{249{,}6}\cdot100=36{,}1\ \%`))+
 step('2. Masas',chain(R`m_{\mathrm{H_2O}}=2{,}50\cdot0{,}361=0{,}90\ \mathrm{g}`,R`m_{\text{queda}}=2{,}50-0{,}90=1{,}60\ \mathrm{g\ de\ CuSO_4}`)),
 'Quedan ≈ 1,60 g de CuSO₄ blanco (se pierde el 36 % de la masa)')}
<h3>2 · Acuocomplejos: el agua como ligando</h3>
<p>En solución, el Cu²⁺ está rodeado de agua: <b>[Cu(H₂O)₆]²⁺</b>, celeste. En HCl concentrado, los Cl⁻ desplazan al agua y se forma <b>[CuCl₄]²⁻</b>, amarillo-verdoso. Si diluimos con agua, el equilibrio vuelve atrás:</p>
${rx('[CuCl4]^2-(ac) + 6 H2O(l) <=> [Cu(H2O)6]^2+(ac) + 4 Cl^-(ac)','verde ⇌ celeste')}
${vira('verde (mucho Cl⁻)','#4f9a52','celeste (mucha agua)','#5fb4e8')}
<h3>3 · Hidrólisis: el agua “rompe” la sal</h3>
<p>El Fe³⁺ es un catión chico y muy cargado: tironea tanto de los oxígenos del agua que la hace soltar H⁺. Resultado: la solución de FeCl₃ es <b>ácida</b>, y al calentar aparece una turbidez rojiza de hidróxido.</p>
${rxs(['[Fe(H2O)6]^3+(ac) <=> [Fe(OH)(H2O)5]^2+(ac) + H^+(ac)','primer paso'],['Fe^3+(ac) + 3 H2O(l) <=> Fe(OH)3(s) + 3 H^+(ac)','global; el calor la favorece'])}
${punch('Tornasol azul → rojo: una sal puede dar una solución ácida sin ser un ácido.')}
`);

  a2('repaso','Repaso de hidrógeno, oxígeno y agua','HIDRÓGENO Y OXÍGENO · REPASO',`
${cards([
 ['Hidrógeno','¿Cómo se reconoce el H₂?','Acercando el tubo a la llama: se escucha un “ladrido” (2 H₂ + O₂ → 2 H₂O).'],
 ['Hidrógeno','¿Por qué el tubo con H₂ se mantiene invertido?','Porque es mucho menos denso que el aire y se escaparía hacia arriba.'],
 ['Hidruros','NaH + H₂O → ?','NaOH + H₂. El H⁻ es básico y reductor.'],
 ['Oxígeno','¿Para qué sirve el MnO₂ con el KClO₃?','Es catalizador: acelera la descomposición sin consumirse.'],
 ['Oxígeno','¿Cómo se reconoce el O₂?','Una astilla en punto de ignición se reaviva y arde.'],
 ['Óxidos','S + O₂ y luego agua: ¿ácido o básico?','Ácido: SO₂ + H₂O ⇌ H₂SO₃; el tornasol azul pasa a rojo.'],
 ['H₂O₂','¿Por qué puede ser oxidante y reductor?','Porque su O está en −1: puede bajar a −2 (H₂O) o subir a 0 (O₂).'],
 ['H₂O₂','¿Qué es “10 volúmenes”?','1 L de solución libera 10 L de O₂ en CNPT (≈ 3 % m/V).'],
 ['Agua','¿Por qué el CuSO₄·5H₂O se vuelve blanco al calentarlo?','Pierde el agua de hidratación; el azul depende del agua unida al cobre.'],
 ['Hidrólisis','¿Por qué la solución de FeCl₃ es ácida?','El Fe³⁺ hidroliza el agua y libera H⁺.']
])}
`);

  // =====================================================================
  // UNIDAD 3 · METALES DE LOS GRUPOS 1 Y 2
  // =====================================================================
  const s3=[];const a3=(key,label,kicker,html)=>s3.push({key:`qi-al-${key}`,label,kicker,html});

  a3('quienes','Alcalinos y alcalinotérreos: los que regalan electrones','GRUPOS 1 Y 2 · 01',`
<p>Los <b>metales alcalinos</b> (grupo 1: Li, Na, K, Rb, Cs) tienen <b>1 electrón</b> en su último nivel (ns¹) y los <b>alcalinotérreos</b> (grupo 2: Be, Mg, Ca, Sr, Ba) tienen <b>2</b> (ns²). Ese electrón externo está lejos y poco retenido: lo pierden con muchísima facilidad.</p>
${table(['','Grupo 1 · alcalinos','Grupo 2 · alcalinotérreos'],[
 ['Configuración externa','ns¹','ns²'],
 ['Ion que forman','M⁺','M²⁺'],
 ['Carácter','reductores muy fuertes','reductores fuertes (un poco menos)'],
 ['Óxidos e hidróxidos','muy básicos, solubles (NaOH, KOH)','básicos, menos solubles (Mg(OH)₂, Ca(OH)₂)'],
 ['Dureza','blandos: el sodio se corta con cuchillo','más duros'],
 ['Cómo se guardan','bajo kerosene o vaselina','en frascos cerrados']
])}
${punch('Bajando en el grupo, el electrón externo está más lejos → se pierde más fácil → el metal es más reactivo.')}
${note('Por qué el sodio vive en kerosene','<p>Reacciona con el O₂ y con la humedad del aire. Sumergido en un líquido sin agua ni oxígeno, se conserva.</p>')}
`);

  a3('oxigeno','Reacción con oxígeno','GRUPOS 1 Y 2 · 02',`
<p>Todos se combinan con el oxígeno formando <b>óxidos básicos</b>. Los productos dependen del metal:</p>
${rxs(['4 Li(s) + O2(g) -> 2 Li2O(s)','óxido'],['2 Na(s) + O2(g) =[Δ]=> Na2O2(s)','al arder en aire se forma sobre todo peróxido (amarillento)'],['4 Na(s) + O2(g) -> 2 Na2O(s)','óxido normal (con poco O₂)'],['2 Mg(s) + O2(g) =[Δ]=> 2 MgO(s)','luz blanca intensa'])}
<p>Al disolver esos óxidos en agua aparece el <b>hidróxido</b> y la solución vuelve azul el papel tornasol:</p>
${rxs(['Na2O(s) + H2O(l) -> 2 NaOH(ac)'],['Na2O2(s) + 2 H2O(l) -> 2 NaOH(ac) + H2O2(ac)','el peróxido además da agua oxigenada'],['MgO(s) + H2O(l) -> Mg(OH)2(s)','poco soluble, pero alcanza para virar el tornasol'])}
${warn('No mirar el magnesio ardiendo','<p>La llama del Mg emite muchísima luz (también ultravioleta). La guía insiste: <b>no la mires directamente</b>.</p>')}
${note('Detalle fino','<p>Si el Mg arde en aire, una parte también reacciona con el N₂ y forma nitruro (Mg₃N₂). En el TP alcanza con escribir la formación de MgO.</p>')}
`);

  a3('agua','Reacción con agua y con ácidos','GRUPOS 1 Y 2 · 03',`
<p>Un metal activo puede sacarle H al agua y formar H₂ + hidróxido. Cuanto más activo, más violento:</p>
${rxs(['2 Na(s) + 2 H2O(l) -> 2 NaOH(ac) + H2(g)↑','violenta: el Na “corre” sobre el agua'],['Mg(s) + 2 H2O(l) =[Δ]=> Mg(OH)2(s) + H2(g)↑','en frío casi no se ve; a baño María sí'])}
${vira('incolora','#f4f4f4','fucsia','#d63384')} <span class="simple">(la fenolftaleína delata el hidróxido que se forma)</span>
<h3>Comparación con otros metales del TP 4</h3>
${table(['Metal','Con agua','Con ácido (HCl, H₂SO₄ diluido)','Con NaOH'],[
 ['Na','reacciona violentamente','violentísima (no se hace)','—'],
 ['Mg','lenta en frío, mejor en caliente','rápida: Mg + 2 HCl → MgCl₂ + H₂','no reacciona'],
 ['Al','no (capa protectora de Al₂O₃)','sí: 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂','<b>sí</b>: es anfótero'],
 ['Fe','no en frío','sí, da Fe²⁺: Fe + 2 HCl → FeCl₂ + H₂','no reacciona']
])}
${rxs(['2 Al(s) + 2 NaOH(ac) + 6 H2O(l) -> 2 Na[Al(OH)4](ac) + 3 H2(g)↑','el aluminio “se disuelve” en base'],['Fe(s) + H2SO4(ac) -> FeSO4(ac) + H2(g)↑','ácido diluido: Fe²⁺, verde pálido'])}
${idea('¿Por qué el Fe da Fe²⁺ y no Fe³⁺ con HCl?','<p>Porque el H⁺ es un oxidante <b>débil</b>: le alcanza para sacarle 2 electrones al hierro, no 3. Para llegar a Fe³⁺ hace falta un oxidante más fuerte, como el HNO₃.</p>')}
`);

  a3('llama','Colores a la llama','GRUPOS 1 Y 2 · 04',`
<p>Si ponés una sal de estos metales en la llama, la llama se tiñe de un color característico. Es una de las formas más viejas (¡y lindas!) de identificar elementos.</p>
${figure(svg.llamas,'Colores característicos del ensayo del TP 4.')}
${deep('¿De dónde sale el color?',`<ol class="kitList"><li>El calor de la llama le da energía a un electrón del catión y lo “sube” a un nivel más alto (estado excitado).</li><li>Ese estado es inestable: el electrón vuelve a su nivel.</li><li>Al bajar, libera la energía sobrante como un <b>fotón</b> de luz.</li><li>Como los niveles de cada elemento son únicos, la energía (y el color) también lo es: es su <b>huella digital</b>.</li></ol><p>Es el mismo principio de los fuegos artificiales: el rojo es estroncio, el amarillo sodio, el verde bario y el azul cobre.</p>`,true)}
${table(['Sal del TP','Catión','Color de la llama'],[
 ['NaCl','Na⁺','amarillo intenso (y persistente)'],
 ['KCl','K⁺','violeta / lila pálido'],
 ['LiCl','Li⁺','rojo carmín'],
 ['SrCl₂','Sr²⁺','rojo']
])}
${warn('El sodio “tapa” todo','<p>Una mínima contaminación con sodio da amarillo y esconde el lila del potasio. Por eso las espátulas tienen que estar <b>limpias</b> y, en análisis, el potasio se mira a través de un vidrio de cobalto (azul) que filtra el amarillo.</p>')}
`);

  a3('amoniaco','Metales alcalinos en amoníaco líquido','GRUPOS 1 Y 2 · 05',`
<p>El amoníaco hierve a −33 °C: para tenerlo líquido hay que enfriarlo mucho (en el TP, con un baño de hielo seco y etanol, ≈ −78 °C). Si se le agrega sodio, el metal se disuelve y aparece una solución <b>azul intensa</b>.</p>
${rxs(['NH4NO3(s) + NaOH(s) -> NH3(g) + NaNO3(s) + H2O(l)','así se genera el NH₃ del ensayo'],['Na(s) -> Na^+(am) + e^-(am)','(am) = rodeado de moléculas de amoníaco'])}
${idea('Electrones “sueltos”','<p>El azul se debe a <b>electrones solvatados</b>: electrones libres envueltos por moléculas de NH₃. Esa solución es uno de los <b>reductores más fuertes</b> que se conocen. Es un ensayo opcional, pero muestra de forma espectacular qué significa que el sodio “regala” su electrón.</p>')}
`);

  a3('repaso','Repaso de grupos 1 y 2','GRUPOS 1 Y 2 · REPASO',`
${cards([
 ['Grupos 1 y 2','¿Por qué son tan reductores?','Tienen 1 o 2 electrones externos poco retenidos que pierden con facilidad.'],
 ['Grupos 1 y 2','¿Qué carácter tienen sus óxidos?','Básico: con agua forman hidróxidos (tornasol → azul).'],
 ['Sodio','2 Na + 2 H₂O → ?','2 NaOH + H₂. La fenolftaleína se pone fucsia.'],
 ['Magnesio','¿Por qué el Mg con agua necesita baño María?','En frío reacciona muy lento; el calor la acelera.'],
 ['Aluminio','¿Por qué el Al reacciona con NaOH y el Mg no?','El aluminio es anfótero: forma el ion [Al(OH)₄]⁻ soluble.'],
 ['Llama','Color del Li⁺, Na⁺, K⁺ y Sr²⁺','Rojo carmín · amarillo · violeta/lila · rojo.'],
 ['Llama','¿Por qué cada elemento tiene su color?','Los electrones excitados vuelven a su nivel emitiendo luz de energía característica.'],
 ['NH₃ líquido','¿Por qué la solución de Na es azul?','Por los electrones solvatados por el amoníaco.']
])}
`);

  window.ET27_QI4.units.push(
    {id:'herramientas',part:'teoria',n:1,title:'Caja de herramientas',lead:'Todo lo que hace falta antes de entrar al laboratorio: leer una reacción, números de oxidación, el método del ion-electrón y los cálculos con soluciones y gases.',sections:s1},
    {id:'hidrogeno-oxigeno',part:'teoria',n:2,title:'Hidrógeno, oxígeno y agua',lead:'Cómo se obtienen y se reconocen el H₂ y el O₂, qué son los hidruros, la doble vida del agua oxigenada y lo que el agua le hace a los iones metálicos.',sections:s2},
    {id:'grupos-1-2',part:'teoria',n:3,title:'Metales de los grupos 1 y 2',lead:'Alcalinos y alcalinotérreos: por qué son tan reactivos, cómo reaccionan con oxígeno, agua y ácidos, y de dónde salen los colores a la llama.',sections:s3}
  );
})();
