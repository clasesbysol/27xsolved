// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS · Ácido-base (1/3)
// Guía de ejercitación N° 2 (conceptual) y Guía N° 3 · ácidos y bases monopróticos, resueltos paso a paso.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,spec,flow}=A;
  const R=String.raw;
  const W=rx('H2O + H2O <=> H3O^+ + HO^-','Kw');

  // =====================================================================
  // GUÍA N° 2 · ítems de ácido-base
  // =====================================================================
  const g2=[];const e2=(n,title,statement,solution,answer)=>g2.push({id:`g2-${n}`,tag:`GUÍA 2 · EJ. ${n}`,title,statement,solution,answer});

  e2(1,'¿Cuál es el ácido más fuerte?',st('Decidir de los siguientes pares, cuál es el ácido o base más fuerte: HF o HIO₃ y HNO₂ o HCN. pKa (HF): 3,45; pKa (HIO₃): 0,77; pKa (HNO₂): 3,37; pKa (HCN): 9,31.'),
   jus('<p>A menor pKa, mayor Ka: el ácido cede más fácilmente el H⁺ al agua (equilibrio más desplazado hacia los productos).</p>')+
   table(['Par','pKa','Más fuerte'],[['HF / HIO₃','3,45 / 0,77','<b>HIO₃</b>'],['HNO₂ / HCN','3,37 / 9,31','<b>HNO₂</b>']]),
   'HIO₃ más fuerte que HF · HNO₂ más fuerte que HCN');

  e2(2,'Ordenar ácidos por acidez',st('Ubique los siguientes ácidos en orden creciente de acidez: ácido nitroso pKa 3,37; ácido cloroso pKa 2,00; ácido fluorhídrico pKa 3,45; ácido fórmico pKa 3,75; ácido cianhídrico pKa 9,31.'),
   jus('<p>Acidez creciente = pKa decreciente (Ka creciente).</p>')+chain([R`9{,}31>3{,}75>3{,}45>3{,}37>2{,}00`,'pKa']),
   'HCN &lt; HCOOH &lt; HF &lt; HNO₂ &lt; HClO₂');

  e2(3,'Ordenar bases por fuerza',st('Ubique las siguientes bases en orden de fuerza creciente: ion fluoruro pKa 3,45; amoníaco pKb 4,75; ion acetato pKa 4,75; piridina pKb 8,75; hidracina pKb 5,77; ion hipobromito pKa 8,6.'),
   jus('<p>Los iones vienen dados por el pKa de su ácido conjugado: hay que pasarlos a pKb con '+m(R`\mathrm{p}K_b=14-\mathrm{p}K_a`)+' (par conjugado, Ka·Kb = Kw). Más fuerte = menor pKb.</p>')+
   table(['Base','pKb'],[['F⁻','14 − 3,45 = 10,55'],['Ac⁻','14 − 4,75 = 9,25'],['piridina','8,75'],['hidracina','5,77'],['BrO⁻','14 − 8,6 = 5,4'],['NH₃','4,75']]),
   'F⁻ &lt; Ac⁻ &lt; piridina &lt; hidracina &lt; BrO⁻ &lt; NH₃');

  e2(4,'pH del agua pura a 50 °C',st('Calcular el pH de agua pura a 50 °C. Kw (50 °C): 5,5·10⁻¹⁴.'),
   desc(W)+jus('<p>En agua pura la única fuente de iones es la autoprotólisis: por cada H₃O⁺ se forma un HO⁻ (BC: [H₃O⁺] = [HO⁻]).</p>')+
   chain(R`[\mathrm{H_3O^+}]^2=K_w\Rightarrow[\mathrm{H_3O^+}]=\sqrt{5{,}5\times10^{-14}}=2{,}35\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}63`)+
   jus('<p>Es <b>neutra</b> aunque el pH sea menor que 7: [H₃O⁺] = [HO⁻]. La autoprotólisis es endotérmica y al calentar Kw aumenta (Le Châtelier).</p>','Ojo'),
   'pH = 6,63 y la solución es neutra');

  e2(5,'Verdadero o falso (justificar cualitativamente)',st('Indicar V o F y justificar:',['Una solución 0,1 M de cloruro de amonio tendrá pH ácido.','Una solución 10⁻⁸ M de ácido clorhídrico tendrá pH básico.','Una solución 0,1 M de acetato de calcio tendrá pH neutro.','Una solución 1 M de arseniato diácido de sodio será básica.']),
   step('a) VERDADERO',rx('NH4^+ + H2O <=> NH3 + H3O^+')+jus('<p>El Cl⁻ viene del HCl (fuerte): queda inalterado. El NH₄⁺ es ácido conjugado de una base débil: cede H⁺ al agua → ácida.</p>'))+
   step('b) FALSO',jus('<p>Con 10⁻⁸ M de ácido, el aporte del agua (≈ 10⁻⁷ M) no es despreciable. BC: [H₃O⁺] = [Cl⁻] + [HO⁻] → [H₃O⁺] = 1,05·10⁻⁷ M, pH 6,98: levemente ácido. Agregar un ácido al agua nunca puede volverla básica.</p>'))+
   step('c) FALSO',rx('Ac^- + H2O <=> HAc + HO^-')+jus('<p>El Ca²⁺ viene del Ca(OH)₂ (fuerte): inalterado. El Ac⁻ es base conjugada de un ácido débil → básica.</p>'))+
   step('d) FALSO',rxs(['H2AsO4^- + H2O <=> HAsO4^2- + H3O^+','Ka₂ = 1,0·10⁻⁷'],['H2AsO4^- + H2O <=> H3AsO4 + HO^-','Kb = Kw/Ka₁ = 1,8·10⁻¹²'])+jus('<p>El H₂AsO₄⁻ es anfiprótico. Como Ka₂ ≫ Kb, predomina su comportamiento ácido → solución ácida (pH ≈ ½(pKa₁ + pKa₂) ≈ 4,6).</p>')),
   'a) V · b) F · c) F · d) F');

  e2(6,'Comportamiento ácido-base de sales',st('Explicar el comportamiento ácido-base de: a) nitrato de potasio; b) nitrato de amonio; c) bisulfito de sodio; d) iodato de metilamonio.'),
   step('a) KNO₃ · neutra',jus('<p>K⁺ (de KOH, fuerte) y NO₃⁻ (de HNO₃, fuerte): ninguno reacciona con el agua.</p>'))+
   step('b) NH₄NO₃ · ácida',rx('NH4^+ + H2O <=> NH3 + H3O^+','Ka = 5,6·10⁻¹⁰')+jus('<p>NO₃⁻ inalterado; NH₄⁺ ácido conjugado de base débil.</p>'))+
   step('c) NaHSO₃ · ácida',rxs(['HSO3^- + H2O <=> SO3^2- + H3O^+','Ka₂ = 6,4·10⁻⁸'],['HSO3^- + H2O <=> H2SO3 + HO^-','Kb = Kw/Ka₁ = 5,9·10⁻¹³'])+jus('<p>Anfiprótico con Ka₂ ≫ Kb: actúa como ácido.</p>'))+
   step('d) CH₃NH₃IO₃ · ácida',rxs(['CH3NH3^+ + H2O <=> CH3NH2 + H3O^+','Ka = Kw/4,4·10⁻⁴ = 2,3·10⁻¹¹'],['IO3^- + H2O <=> HIO3 + HO^-','Kb = Kw/0,17 = 5,9·10⁻¹⁴'])+jus('<p>Los dos iones vienen de electrolitos débiles: se comparan constantes. Ka(CH₃NH₃⁺) ≫ Kb(IO₃⁻) → levemente ácida.</p>')),
   'a) neutra · b) ácida · c) ácida · d) ácida');

  e2(7,'HCl diluido y agregado de NaCl',st('Una solución de ácido clorhídrico se prepara diluyendo 2,34 mL de ácido concentrado 36 % m/m (δ = 1,19 g/mL) hasta 250 mL. Si se agregan 10 g de cloruro de sodio, ¿cambia el pH? ¿El pH final será ácido, básico o neutro?'),
   step('1. Concentración',chain(R`m_{sc}=2{,}34\cdot1{,}19=2{,}785\ \mathrm{g}\Rightarrow m_{\mathrm{HCl}}=0{,}36\cdot2{,}785=1{,}003\ \mathrm{g}`,R`n=\frac{1{,}003}{36{,}46}=0{,}0275\ \mathrm{mol}\Rightarrow C=\frac{0{,}0275}{0{,}250}=0{,}110\ \mathrm{M}`))+
   step('2. pH',desc(rxs(['HCl + H2O -> H3O^+ + Cl^-','fuerte: total'])+W)+chain(R`[\mathrm{H_3O^+}]=0{,}110\ \mathrm{M}\Rightarrow\mathrm{pH}=0{,}96`))+
   step('3. Agregado de NaCl',rx('NaCl -> Na^+ + Cl^-')+jus('<p>El pH <b>no cambia</b>: Na⁺ y Cl⁻ vienen de electrolitos fuertes y no tienen comportamiento ácido-base. El Cl⁻ es “ion común” del HCl, pero el HCl está totalmente disociado: no hay equilibrio que desplazar.</p>')),
   'pH 0,96 antes y después: ácido');

  e2(9,'Describir sistemas',st('Describir el sistema de las siguientes especies, explicando por qué se escribe de esa forma:',['Hidróxido de estroncio','Ácido bromhídrico','Ácido carbónico (Ka₁ 4,7·10⁻⁷; Ka₂ 5,6·10⁻¹¹)','Ácido fluorhídrico (Ka 3,5·10⁻⁴)','Piridina (Kb 1,5·10⁻⁹)']),
   step('a) Sr(OH)₂ · base fuerte',desc(rx('Sr(OH)2 -> Sr^2+ + 2 HO^-','→ y sin K: disociación total')+W+chain(R`\text{BC: }2[\mathrm{Sr^{2+}}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`)))+
   step('b) HBr · ácido fuerte',desc(rx('HBr + H2O -> H3O^+ + Br^-')+W+chain(R`\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{Br^-}]+[\mathrm{HO^-}]`)))+
   step('c) H₂CO₃ · diprótico débil',desc(rxs(['H2CO3 + H2O <=> HCO3^- + H3O^+','Ka₁'],['HCO3^- + H2O <=> CO3^2- + H3O^+','Ka₂'])+W+chain(R`\text{BM: }C=[\mathrm{H_2CO_3}]+[\mathrm{HCO_3^-}]+[\mathrm{CO_3^{2-}}]`,R`\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{HCO_3^-}]+2[\mathrm{CO_3^{2-}}]+[\mathrm{HO^-}]`))+jus('<p>Un protón por equilibrio: cada disociación tiene su Ka, y Ka₁ ≫ Ka₂.</p>'))+
   step('d) HF · ácido débil',desc(rx('HF + H2O <=> F^- + H3O^+','Ka')+W+chain(R`\text{BM: }C=[\mathrm{HF}]+[\mathrm{F^-}]\qquad\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{F^-}]+[\mathrm{HO^-}]`)))+
   step('e) Piridina · base débil',desc(rx('C5H5N + H2O <=> C5H5NH^+ + HO^-','Kb')+W+chain(R`\text{BC: }[\mathrm{C_5H_5NH^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`))),
   'Fuertes con → y sin K; débiles con ⇌, su K, BM y BC; siempre el agua');

  e2(10,'Diagramas de especiación de esas 5 especies',st('Confeccionar el diagrama de especiación de las 5 especies del ítem anterior e indicar el rango de pH en que existe cada especie.'),
   step('Sr(OH)₂ y HBr',jus('<p>Son electrolitos fuertes: en solución no existe la especie sin disociar (Sr(OH)₂ o HBr) a ningún pH acuoso; sólo Sr²⁺ o Br⁻. El “diagrama” es una sola línea en α = 1.</p>'))+
   step('H₂CO₃ (pKa₁ 6,33; pKa₂ 10,25)',figure(spec([6.33,10.25],['H₂CO₃','HCO₃⁻','CO₃²⁻']),'Predominio: H₂CO₃ pH &lt; 6,33 · HCO₃⁻ entre 6,33 y 10,25 · CO₃²⁻ pH &gt; 10,25.'))+
   step('HF (pKa 3,46)',figure(spec([3.46],['HF','F⁻']),'HF predomina a pH &lt; 3,46 y F⁻ a pH &gt; 3,46.'))+
   step('Piridina (pKb 8,82 → pKa del C₅H₅NH⁺ = 5,18)',figure(spec([5.18],['C₅H₅NH⁺','C₅H₅N']),'La forma ácida (piridinio) predomina a pH &lt; 5,18; la piridina libre, a pH &gt; 5,18.'))+
   note('Sobre “el rango en que existe”','<p>Cada especie <b>existe</b> en todo el rango de pH (ninguna llega a 0); lo que cambia es dónde <b>predomina</b> y dónde es despreciable.</p>'),
   'Rangos de predominio delimitados por los pKa');

  e2(11,'Por qué esta descripción del NH₄HSO₄ está mal',st('Se realiza la descripción cualitativa de una solución de sulfato ácido de amonio. Explique por qué no es correcta:')+rxs(['NH4HSO4(ac) -> NH4^+(ac) + HSO4^-(ac)'],['HSO4^-(ac) -> SO4^2-(ac) + H3O^+(ac)'],['NH4^+ -> NH3(ac) + H3O^+(ac)']),
   step('Errores',table(['Línea','Error','Correcto'],[['1','está bien: la sal es electrolito fuerte',rx('NH4HSO4 -> NH4^+ + HSO4^-')],['2','la 2.ª disociación del sulfúrico es débil: va ⇌ con Ka₂, y falta el H₂O como reactivo',rx('HSO4^- + H2O <=> SO4^2- + H3O^+','Ka₂')],['3','el NH₄⁺ es ácido débil: va ⇌ con Ka; falta el H₂O (no hay protón “libre”)',rx('NH4^+ + H2O <=> NH3 + H3O^+','Ka = Kw/Kb')],['falta','la autoprotólisis del agua, las expresiones de K, BM y BC',W]]))+
   jus('<p>Con → se afirma que la reacción es total, y eso sólo vale para electrolitos fuertes. Para débiles se escribe el equilibrio con su constante, como dice la ley de acción de masas.</p>'),
   'Faltan los equilibrios (⇌) con sus constantes, el H₂O en Brønsted y la autoprotólisis');

  e2(12,'Jugo de limón: especie predominante',st('El ácido cítrico es triprótico (pKa₁ 3,15; pKa₂ 4,77; pKa₃ 6,40). Si el pH del jugo de limón es 2,3, ¿qué especie predomina?'),
   jus('<p>Por el diagrama de especiación: a pH menor que pKa₁ predomina la forma totalmente protonada. 2,3 &lt; 3,15 → predomina H₃Cit; [H₂Cit⁻]/[H₃Cit] = 10<sup>2,3−3,15</sup> = 0,14.</p>'),
   'Predomina el ácido cítrico sin disociar, H₃Cit');

  e2(13,'Sangre a pH 7,4: ¿alguna especie despreciable?',st('El pH de la sangre ronda 7,4 y está regulado por el ácido carbónico (pKa₁ 6,36; pKa₂ 10,33). ¿Existe alguna especie cuya concentración sea despreciable?'),
   chain([R`\frac{[\mathrm{HCO_3^-}]}{[\mathrm{H_2CO_3}]}=10^{7{,}4-6{,}36}=11`,'ambas apreciables'],[R`\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{7{,}4-10{,}33}=1{,}2\times10^{-3}`,'CO₃²⁻ ≈ 0,1 % del HCO₃⁻'])+
   jus('<p>El CO₃²⁻ es despreciable frente a HCO₃⁻ y H₂CO₃ (pH tres unidades por debajo de pKa₂), pero no es cero: su α es ≈ 10⁻³.</p>'),
   'El CO₃²⁻ (despreciable, no nulo)');

  e2(14,'Leer Ka desde diagramas de especiación',st('Determinar los valores de Ka e intervalos de pH de predominio de cada especie presente en los siguientes diagramas de especiación:')+`<figure class="kitFigure qiPhoto"><img src="./assets/quimica-cualitativa/guia2-ej14-diagramas.webp" alt="Tres diagramas de especiación de la Guía 2, ejercicio 14" loading="lazy"><figcaption>Diagramas originales de la guía (1, 2 y 3 de arriba hacia abajo).</figcaption></figure>`,
   step('Método',flow([['1. Contar curvas','n + 1 curvas → n protones ácidos (n constantes).'],['2. Leer los cruces','dos curvas consecutivas se cortan en α = 0,5: ese pH es el pKa, porque ahí [ácido] = [base conjugada] y Ka = [H₃O⁺].'],['3. Ka = 10^(−pKa)',''],['4. Predominio','entre dos cruces manda la curva que está arriba; los límites son los pKa.']]))+
   step('Diagrama 1 · triprótico (4 curvas)',chain([R`\mathrm{p}K_{a1}\approx2{,}0\quad\mathrm{p}K_{a2}\approx6{,}9\quad\mathrm{p}K_{a3}\approx11{,}6`,'lectura de los cruces'],[R`K_{a1}\approx1\times10^{-2}\quad K_{a2}\approx1{,}3\times10^{-7}\quad K_{a3}\approx2{,}5\times10^{-12}`,''])+table(['Especie','Predomina en'],[['H₃A','pH &lt; 2,0'],['H₂A⁻','2,0 – 6,9'],['HA²⁻','6,9 – 11,6'],['A³⁻','pH &gt; 11,6']])+figure(spec([2.0,6.9,11.6],['H₃A','H₂A⁻','HA²⁻','A³⁻']),'Reconstrucción con los pKa leídos. Valores compatibles con el ácido arsénico de la Tabla 1 (pKa 2,25 · 7,0 · 11,5).'))+
   step('Diagrama 2 · monoprótico (2 curvas)',chain([R`\mathrm{p}K_a\approx4{,}7\ \Rightarrow\ K_a\approx2\times10^{-5}`,'un solo cruce'])+table(['Especie','Predomina en'],[['HA','pH &lt; 4,7'],['A⁻','pH &gt; 4,7']])+figure(spec([4.7],['HA','A⁻']),'Compatible con el ácido acético (pKa 4,74).'))+
   step('Diagrama 3 · diprótico (3 curvas)',chain([R`\mathrm{p}K_{a1}\approx1{,}1\quad\mathrm{p}K_{a2}\approx4{,}0`,''],[R`K_{a1}\approx8\times10^{-2}\quad K_{a2}\approx1\times10^{-4}`,''])+table(['Especie','Predomina en'],[['H₂A','pH &lt; 1,1'],['HA⁻','1,1 – 4,0'],['A²⁻','pH &gt; 4,0']])+jus('<p>Control: el máximo de HA⁻ está en pH = ½(pKa₁ + pKa₂) ≈ 2,55, y como los pKa están cerca (Δ ≈ 3), ese máximo no llega a 1 (≈ 0,93): las tres especies coexisten. Además, a pH 0 el H₂A ya no es 1 (≈ 0,93), lo que confirma un pKa₁ bajo.</p>')+figure(spec([1.1,4.0],['H₂A','HA⁻','A²⁻']),'Compatible con un ácido tipo oxálico (pKa 1,2 · 4,2 en la Tabla 1).'))+
   note('Precisión','<p>Los valores salen de leer la foto, con un error de ±0,1 a 0,2 unidades de pH. En el parcial se informa la lectura del gráfico tal como se ve.</p>'),
   '1) pKa ≈ 2,0 · 6,9 · 11,6 · 2) pKa ≈ 4,7 · 3) pKa ≈ 1,1 · 4,0');

  e2(16,'Describir sistemas finales (1 mol de cada uno)',st('Describa el sistema final (si son 2 sustancias, 1 mol de cada una):',['NaNO₃','NaNO₂','HNO₃ y HCl','cloruro de trimetilamonio','NaNO₃ y HNO₃','NaNO₂ y HNO₂','metilamina','metilamina y HCl','metilamina e Ca(OH)₂','Ca(OH)₂ y HCl','Ca(OH)₂ y ácido acético']),
   table(['','Qué queda','Carácter / tipo'],[
    ['a','Na⁺ y NO₃⁻ (de fuertes)','neutra'],['b','Na⁺ y NO₂⁻; NO₂⁻ + H₂O ⇌ HNO₂ + HO⁻','básica'],['c','dos ácidos fuertes, total','ácida'],['d','(CH₃)₃NH⁺ + H₂O ⇌ (CH₃)₃N + H₃O⁺; Cl⁻ inalterado','ácida'],['e','HNO₃ fuerte + iones espectadores','ácida'],['f','HNO₂ y NO₂⁻ en igual cantidad: par conjugado débil','<b>reguladora</b>, pH = pKa = 3,35'],['g','CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + HO⁻','básica'],['h','neutralización 1:1 → CH₃NH₃Cl; CH₃NH₃⁺ ácido débil','ácida (no regula: no queda base)'],['i','base fuerte + base débil: el HO⁻ del Ca(OH)₂ reprime a la metilamina (ion común)','básica'],['j','Ca(OH)₂ aporta 2 mol HO⁻ y HCl 1 mol H₃O⁺: sobra 1 mol HO⁻','básica'],['k','2 mol HO⁻ + 1 mol HAc → 1 mol Ac⁻ y sobra 1 mol HO⁻','básica (manda el fuerte)']
   ]),
   'Sólo f es reguladora');

  e2(19,'pH de los sistemas no reguladores del ítem 16',st('Para los sistemas NO reguladores del ítem 16 justifique si el pH será ácido, básico o neutro.'),
   jus('<p>Ver la tabla del ítem 16: neutro a; ácidos c, d, e, h; básicos b, g, i, j, k. Cuando sobra un electrolito fuerte (e, i, j, k) manda el fuerte; si sólo quedan iones de una sal, se analiza de qué electrolito viene cada ion.</p>'),
   'Neutro: a · ácidos: c, d, e, h · básicos: b, g, i, j, k');

  A.addEx('acido-base',{group:'g2',label:'Guía 2 · ejercicios de ácido-base',intro:'<p>Ítems conceptuales de la Guía N° 2. Los de soluciones reguladoras (15, 18, 20, 21, 22) están en la sección Buffer y los del cobre con amoníaco y la plata con cloruro (8, 17), en Complejos.</p>'},g2);

  // =====================================================================
  // GUÍA N° 3 · ácidos y bases monopróticos
  // =====================================================================
  const g3=[];const e3=(n,title,statement,solution,answer)=>g3.push({id:`g3m-${n}`,tag:`GUÍA 3 · MONOPRÓTICOS · ${n}`,title,statement,solution,answer});

  e3(1,'HNO₃ 0,050 M',st('Calcule las concentraciones de catión hidronio y anión oxhidrilo en una solución de ácido nítrico 0,050 M.'),
   desc(rx('HNO3 + H2O -> H3O^+ + NO3^-','fuerte: total')+W)+sup([['[H₃O⁺] = 0,050 M (el agua no aporta)','el ácido aporta ≫ 10⁻⁷ M y reprime la autoprotólisis (Le Châtelier).']])+
   chain(R`[\mathrm{HO^-}]=\frac{10^{-14}}{0{,}050}=2{,}0\times10^{-13}\ \mathrm{M}`)+ver('<p>El agua aporta 2·10⁻¹³ M de H₃O⁺ frente a 0,050 ✔</p>'),
   '[H₃O⁺] = 0,050 M · [HO⁻] = 2,0·10⁻¹³ M');

  e3(2,'HCl 36 % diluido',st('Calcular el pH de la solución que se obtiene cuando 0,07 mL de HCl 36 % m/m (δ = 1,179 g/mL) se diluyen a 500 mL a 25 °C.'),
   chain(R`n=\frac{0{,}07\cdot1{,}179\cdot0{,}36}{36{,}46}=8{,}15\times10^{-4}\ \mathrm{mol}`,R`C=\frac{8{,}15\times10^{-4}}{0{,}500}=1{,}63\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}79`)+jus('<p>HCl fuerte: [H₃O⁺] = C; el agua es despreciable (C ≫ 10⁻⁶ M).</p>'),
   'pH = 2,79');

  e3(3,'Diluir 10 veces',st('Calcule la variación de pH al diluir 10 veces:',['agua pura','HCl 0,025 M','NaOH 0,025 M']),
   table(['Sistema','pH inicial','pH diluido','ΔpH'],[['agua','7,00','7,00','0'],['HCl','1,60','2,60','+1'],['NaOH','12,40','11,40','−1']])+
   jus('<p>Agua: Kw no cambia, sigue neutra. Fuertes: la concentración baja 10 veces y el pH cambia 1 unidad (log 10). Sigue siendo válido despreciar el agua (0,0025 M ≫ 10⁻⁶).</p>'),
   'ΔpH: 0 · +1 · −1');

  e3(4,'Electrolitos fuertes: pH y pOH',st('Calcule el pH y pOH:',['HI 0,0356 M','HCl 0,0725 M','Ba(OH)₂ 0,0092 M','NaOH: 13,6 mg en 350 mL','HBr: 75 mL de 3,5·10⁻⁴ M llevados a 500 mL']),
   table(['','Cálculo','pH','pOH'],[['a','[H₃O⁺] = 0,0356','1,45','12,55'],['b','[H₃O⁺] = 0,0725','1,14','12,86'],['c','[HO⁻] = 2·0,0092 = 0,0184','12,26','1,74'],['d','13,6·10⁻³/40,0 = 3,40·10⁻⁴ mol → 9,71·10⁻⁴ M','10,99','3,01'],['e','75·3,5·10⁻⁴/500 = 5,25·10⁻⁵ M','4,28','9,72']])+
   jus('<p>Todos fuertes: disociación total. En todos C ≥ 10⁻⁶ M, así que el aporte del agua es despreciable. El Ba(OH)₂ aporta 2 HO⁻ por fórmula.</p>'),
   'a) 1,45 · b) 1,14 · c) 12,26 · d) 10,99 · e) 4,28');

  e3(5,'HClO 1·10⁻⁶ M: débil y muy diluido',st('Calcular el pH y el grado de disociación de HClO 1·10⁻⁶ M. Ka = 2,95·10⁻⁸.'),
   desc(rx('HClO + H2O <=> ClO^- + H3O^+','Ka')+W+chain(R`\text{BM: }10^{-6}=[\mathrm{HClO}]+[\mathrm{ClO^-}]\qquad\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{ClO^-}]+[\mathrm{HO^-}]`))+
   step('¿Se puede despreciar el agua?',ver('<p>No: Ka·C = 2,95·10⁻¹⁴, del mismo orden que Kw. El ácido es muy débil y está muy diluido: aporta tanto H₃O⁺ como el agua. Tampoco vale x ≪ C (C/Ka = 34 &lt; 100).</p>',false))+
   step('Planteo completo',chain([R`[\mathrm{H_3O^+}]=\frac{K_a[\mathrm{HClO}]}{[\mathrm{H_3O^+}]}+\frac{K_w}{[\mathrm{H_3O^+}]}\Rightarrow[\mathrm{H_3O^+}]=\sqrt{K_a[\mathrm{HClO}]+K_w}`,'del BC'],R`[\mathrm{HClO}]=C\frac{[\mathrm{H_3O^+}]}{[\mathrm{H_3O^+}]+K_a}\ \Rightarrow\ \text{resolviendo: }[\mathrm{H_3O^+}]=1{,}88\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}72\qquad\alpha=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=0{,}135`)),
   'pH = 6,72 · α = 13,5 %');

  const formico=desc(rx('HCOOH + H2O <=> HCOO^- + H3O^+','Ka = 1,78·10⁻⁴')+W+chain(R`\text{BM: }0{,}1=[\mathrm{HCOOH}]+[\mathrm{HCOO^-}]\qquad\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{HCOO^-}]+[\mathrm{HO^-}]`))+
   sup([['[HO⁻] ≪ [HCOO⁻] en el BC','medio ácido: el H₃O⁺ del fórmico reprime la autoprotólisis (Le Châtelier).'],['[HCOO⁻] ≪ 0,1 en el BM','ácido débil en concentración alta: C/Ka = 562 &gt; 100, se disocia poco (choques efectivos).']])+
   chain(R`K_a=\frac{[\mathrm{H_3O^+}]^2}{0{,}1}\Rightarrow[\mathrm{H_3O^+}]=\sqrt{1{,}78\times10^{-5}}=4{,}22\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}37`)+
   ver('<p>'+m(R`\frac{4{,}22\times10^{-3}}{0{,}1}\cdot100=4{,}2\,\%\le5\,\%`)+' ✔ (al límite: la cuadrática da 4,13·10⁻³, pH 2,38) · [HO⁻] = 2,4·10⁻¹² ≪ [H₃O⁺] ✔</p>')+
   table(['Especie','Concentración (M)'],[['H₃O⁺','4,2·10⁻³'],['HCOO⁻','4,2·10⁻³'],['HCOOH','0,096'],['HO⁻','2,4·10⁻¹²']]);
  e3(6,'Ácido fórmico 0,1 M',st('Calcular el pH y la concentración de todas las especies en equilibrio de HCOOH 0,1 M. Ka = 1,78·10⁻⁴.'),formico,'pH = 2,37');

  e3(7,'Ácido perclórico 2·10⁻⁴ M (Ka 0,162)',st('Calcular pH, concentración de todas las especies y grado de disociación de HClO₄ 2·10⁻⁴ M. Ka: 0,162.'),
   jus('<p>Con Ka tan grande y C tan chica (C/Ka = 1,2·10⁻³), la disociación es prácticamente total: lo despreciable es el ácido sin disociar, no x.</p>')+
   chain(R`0{,}162=\frac{x^2}{2\times10^{-4}-x}\Rightarrow x=\frac{-0{,}162+\sqrt{0{,}162^2+4\cdot0{,}162\cdot2\times10^{-4}}}{2}=2{,}0\times10^{-4}`,R`\mathrm{pH}=3{,}70\qquad[\mathrm{HClO_4}]=\frac{x^2}{K_a}=2{,}5\times10^{-7}\ \mathrm{M}\qquad\alpha=0{,}999`)+
   table(['Especie','M'],[['H₃O⁺ = ClO₄⁻','2,0·10⁻⁴'],['HClO₄','2,5·10⁻⁷'],['HO⁻','5,0·10⁻¹¹']]),
   'pH 3,70 · α ≈ 99,9 % (se comporta como fuerte)');

  e3(8,'Urea 0,0446 M (Kb 1,2·10⁻¹⁴)',st('Calcular pH, concentración de todas las especies y grado de disociación de urea 0,0446 M. Kb: 1,20·10⁻¹⁴.'),
   desc(rx('U + H2O <=> UH^+ + HO^-','Kb')+W)+
   jus('<p>Kb·C = 5,4·10⁻¹⁶ ≪ Kw: la urea es tan débil que el que fija el pH es el agua. No se puede despreciar la autoprotólisis; lo despreciable es la disociación de la urea.</p>')+
   chain(R`[\mathrm{HO^-}]=\sqrt{K_b C+K_w}=\sqrt{5{,}35\times10^{-16}+10^{-14}}=1{,}03\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=7{,}01`,R`[\mathrm{UH^+}]=\frac{K_b\,C}{[\mathrm{HO^-}]}=5{,}2\times10^{-9}\ \mathrm{M}\qquad\alpha=1{,}2\times10^{-7}`),
   'pH ≈ 7,01 · α = 1,2·10⁻⁵ %');

  e3(9,'Piperidina 0,039 M (Kb 1,6·10⁻³)',st('Calcular pH y grado de disociación. Kb: 1,60·10⁻³.'),
   desc(rx('C5H11N + H2O <=> C5H11NH^+ + HO^-','Kb')+W)+
   ver('<p>C/Kb = 24 &lt; 100: no se puede despreciar x frente a C.</p>',false)+
   chain(R`1{,}6\times10^{-3}=\frac{x^2}{0{,}039-x}\Rightarrow x=[\mathrm{HO^-}]=7{,}14\times10^{-3}\ \mathrm{M}`,R`\mathrm{pOH}=2{,}15\Rightarrow\mathrm{pH}=11{,}85\qquad\alpha=\frac{7{,}14\times10^{-3}}{0{,}039}=18\,\%`),
   'pH 11,85 · α = 18 %');

  e3(10,'Ka del ácido cloroso',st('Calcular Ka del ácido cloroso si el pH de una solución 0,1 M es 1,2.'),
   chain([R`[\mathrm{H_3O^+}]=[\mathrm{ClO_2^-}]=10^{-1{,}2}=0{,}0631\ \mathrm{M}`,'del BC, despreciando HO⁻ (medio muy ácido)'],R`K_a=\frac{(0{,}0631)^2}{0{,}1-0{,}0631}=0{,}108`)+jus('<p>No se desprecia x frente a 0,1: es dato y vale 63 % de C.</p>'),
   'Ka ≈ 0,11');

  e3(11,'Kb de la butilamina',st('Calcular Kb de la butilamina si una solución 0,1 M tiene pH 12,04.'),
   chain(R`[\mathrm{HO^-}]=10^{12{,}04-14}=0{,}0110\ \mathrm{M}`,R`K_b=\frac{(0{,}0110)^2}{0{,}1-0{,}0110}=1{,}35\times10^{-3}`),
   'Kb = 1,35·10⁻³');

  e3(12,'Ácido benzoico con α = 2,4 %',st('Una solución de ácido benzoico 0,110 M tiene un grado de disociación de 2,4 %. Calcular el pH y Ka.'),
   chain(R`[\mathrm{H_3O^+}]=\alpha C=0{,}024\cdot0{,}110=2{,}64\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pH}=2{,}58`,R`K_a=\frac{(2{,}64\times10^{-3})^2}{0{,}110-0{,}00264}=6{,}5\times10^{-5}`),
   'pH 2,58 · Ka = 6,5·10⁻⁵');

  const metil=step('1. Concentración',chain(R`m_{sc}=50\cdot0{,}85=42{,}5\ \mathrm{g}\Rightarrow m=0{,}35\cdot42{,}5=14{,}9\ \mathrm{g}`,R`C=\frac{14{,}9/31{,}06}{1{,}0\ \mathrm{L}}=0{,}479\ \mathrm{M}`))+
   step('2. Descripción',desc(rx('CH3NH2 + H2O <=> CH3NH3^+ + HO^-','Kb = 4,4·10⁻⁴ (tabla)')+W+chain(R`\text{BM: }0{,}479=[\mathrm{CH_3NH_2}]+[\mathrm{CH_3NH_3^+}]\qquad\text{BC: }[\mathrm{CH_3NH_3^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`)))+
   step('3. Desprecios',sup([['[H₃O⁺] ≪ [CH₃NH₃⁺] en el BC','medio básico: el HO⁻ de la base reprime la autoprotólisis.'],['[CH₃NH₃⁺] ≪ 0,479','base débil concentrada: C/Kb = 1090 &gt; 100.']]))+
   step('4. Despeje en Kb',chain(R`[\mathrm{HO^-}]=\sqrt{4{,}4\times10^{-4}\cdot0{,}479}=0{,}0145\ \mathrm{M}\Rightarrow\mathrm{pOH}=1{,}84\Rightarrow\mathrm{pH}=12{,}16`))+
   step('5. Verificamos',ver('<p>'+m(R`\frac{0{,}0145}{0{,}479}=3{,}0\,\%`)+' ✔ (la cuadrática da 0,0143 M, pH 12,16)</p>'))+
   table(['Especie','M'],[['HO⁻ = CH₃NH₃⁺','0,0145'],['CH₃NH₂','0,465'],['H₃O⁺','6,9·10⁻¹³']]);
  e3(13,'Metilamina 35 % diluida',st('Una solución de metilamina 35 % m/m (δ = 0,85 g/mL): 50 mL se diluyen a 1 L. Calcular el pH final y la concentración de todas las especies.'),metil,'pH = 12,16');

  e3(14,'Ácido propanoico diluido',st('Ka = 1,3·10⁻⁵. 50 mL de ácido 0,250 M se diluyen a 1 L. Calcular la concentración de todas las especies.'),
   chain(R`C=\frac{0{,}250\cdot50}{1000}=0{,}0125\ \mathrm{M}`)+sup([['x ≪ 0,0125 y el agua no aporta','C/Ka = 962 &gt; 100 y medio ácido.']])+
   chain(R`[\mathrm{H_3O^+}]=\sqrt{1{,}3\times10^{-5}\cdot0{,}0125}=4{,}03\times10^{-4}\ \mathrm{M}\quad(\mathrm{pH}=3{,}39)`)+ver('<p>3,2 % ✔</p>')+
   table(['Especie','M'],[['H₃O⁺ = propanoato','4,0·10⁻⁴'],['ácido sin disociar','0,0121'],['HO⁻','2,5·10⁻¹¹']]),
   'pH 3,39');

  e3(15,'Ácido láctico a tres concentraciones',st('Ka = 8,4·10⁻⁴. Calcule pH, pOH y grado de disociación para: a) 0,12 M; b) 1,2·10⁻³ M; c) 1,2·10⁻⁵ M.'),
   table(['C (M)','C/Ka','¿x ≪ C?','[H₃O⁺] (cuadrática)','pH','pOH','α'],[['0,12','143','aproximación da 8,4 %: no','9,63·10⁻³','2,02','11,98','8,0 %'],['1,2·10⁻³','1,4','no','6,68·10⁻⁴','3,18','10,82','56 %'],['1,2·10⁻⁵','0,014','no (casi todo disociado)','1,18·10⁻⁵','4,93','9,07','99 %']])+
   jus('<p>Aunque C/Ka &gt; 100 en (a), la verificación da 8,4 % &gt; 5 %: hay que resolver la cuadrática. Al diluir, α aumenta (menos choques efectivos entre iones; Le Châtelier): en (c) se comporta casi como un ácido fuerte.</p>'),
   'a) 2,02 · b) 3,18 · c) 4,93; α crece al diluir');

  e3(16,'HF 22,6 M diluido',st('HF 22,6 M (pKa 3,17). Se diluyen 5 cm³ hasta 2 dm³. Calcular: a) pH final; b) [F⁻] en ambas soluciones.'),
   chain(R`C=\frac{22{,}6\cdot5}{2000}=0{,}0565\ \mathrm{M}\qquad K_a=6{,}76\times10^{-4}`)+ver('<p>C/Ka = 84 &lt; 100: no se desprecia x.</p>',false)+
   chain(R`x=\frac{-K_a+\sqrt{K_a^2+4K_aC}}{2}=5{,}85\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pH}=2{,}23`,R`\text{concentrada: }[\mathrm{F^-}]=\sqrt{6{,}76\times10^{-4}\cdot22{,}6}=0{,}124\ \mathrm{M}\ (0{,}55\,\%)`),
   'a) pH 2,23 · b) [F⁻] = 0,124 M (concentrada) y 5,85·10⁻³ M (diluida)');

  e3(17,'Preparar NH₃ de pH 11',st('Preparar 500 mL de amoníaco a pH 11 (Kb 1,8·10⁻⁵). Calcular la concentración y la masa de solución 50 % m/m necesaria.'),
   chain([R`[\mathrm{HO^-}]=10^{-3}=[\mathrm{NH_4^+}]`,'BC, medio básico'],[R`C=[\mathrm{NH_3}]+[\mathrm{NH_4^+}]=\frac{(10^{-3})^2}{1{,}8\times10^{-5}}+10^{-3}=0{,}0566\ \mathrm{M}`,'BM + Kb'],R`m=0{,}0566\cdot0{,}500\cdot17{,}03=0{,}482\ \mathrm{g\ NH_3}\Rightarrow\frac{0{,}482}{0{,}50}=0{,}963\ \mathrm{g\ de\ solución}`),
   'C = 0,0566 M · 0,96 g de NH₃ 50 %');

  window.ET27_QAC5.shared=Object.assign(window.ET27_QAC5.shared||{},{formico,metil});
  A.addEx('acido-base',{group:'g3m',label:'Guía 3 · ácidos y bases monopróticos'},g3);
})();
