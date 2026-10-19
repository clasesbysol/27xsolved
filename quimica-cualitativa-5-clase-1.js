// 27xSOLved · Química Analítica Cualitativa 5.º · PARA LA CLASE (1/2)
// Versión corta y lineal de cada sección para dar la clase sin saltar entre temas: Ácido-base I, Ácido-base II y Buffer.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,example,step,table,figure,cards}=K;
  const {rx,rxs,f,punch}=Q;
  const {sup,ver,flow,memo,jus,sys,lc,ladder,spec,specLog,pasajes,reglas,draw}=A;
  const R=String.raw;
  const data=window.ET27_QAC5;data.clase=data.clase||[];
  // Botones a los ejercicios resueltos de la pestaña Teoría.
  const prac=(uid,list)=>`<div class="qacPrac">${list.map(([id,l])=>`<button type="button" data-result-go="qac:${uid}:qac-ej-${id}"><span>Ejercicio</span><b>${l}</b></button>`).join('')}</div>`;
  const W=['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`];
  const unit=(id,n,title,lead,blocks)=>data.clase.push({id,n,title,short:(data.units.find(x=>x.id===id)||{}).short,lead,sections:blocks.map(([k,l,h],i)=>({key:`qac-cl-${id}-${k}`,label:l,kicker:`CLASE · ${String(i+1).padStart(2,'0')}`,html:h}))});

  // =====================================================================
  unit('acido-base',1,'Ácido-base I · Fundamentos, fuertes y débiles','Recorrido de la clase: equilibrio y Le Châtelier → teorías → fuertes y débiles → el agua y los anfolitos → pH → cómo se resuelve y se justifica → un fuerte y un débil resueltos.',[
  ['equilibrio','1 · Equilibrio químico y Le Châtelier',`
<p>Una reacción reversible ocurre en los dos sentidos. En el <b>equilibrio</b> las dos velocidades son iguales y las concentraciones ya no cambian (pero las reacciones siguen: es dinámico). La constante K relaciona esas concentraciones: productos sobre reactivos, cada uno elevado a su coeficiente. Sólidos y agua no entran.</p>
${key(R`\text{Si se perturba un equilibrio, el sistema se desplaza en el sentido que contrarresta la perturbación.}`,'Le Châtelier')}
${table(['Perturbación','Sentido','¿Cambia K?'],[['agrego un reactivo / saco un producto','→','no'],['agrego un producto (ion común)','←','no'],['diluyo','hacia el lado con más partículas disueltas','no'],['caliento (endotérmica)','→','sí']])}
${lc('NH3 + H2O <=> NH4^+ + HO^-','se agrega NH₄Cl (aporta NH₄⁺, un producto)','←',[['[NH₄⁺]','↑'],['[NH₃]','↑'],['[HO⁻]','↓']],'El sistema consume NH₄⁺: se desplaza hacia los reactivos y baja [HO⁻]. El pH baja.')}
${punch('El sistema SIEMPRE llega a un nuevo equilibrio. K sólo cambia con la temperatura.')}
`],
  ['teorias','2 · Ácidos y bases: las tres teorías',`
${table(['Teoría','Ácido','Base','Ejemplo'],[['Arrhenius','libera H⁺ en agua','libera HO⁻ en agua','HCl(ac) → H⁺(ac) + Cl⁻(ac) · NaOH(s) → Na⁺(ac) + HO⁻(ac)'],['Brønsted–Lowry','<b>cede</b> un H⁺','<b>acepta</b> un H⁺','NH₃(ac) + H₂O(l) ⇌ NH₄⁺(ac) + HO⁻(ac)'],['Lewis','acepta un par de e⁻','dona un par de e⁻','Ag⁺(ac) + 2 NH₃(ac) → [Ag(NH₃)₂]⁺(ac)']])}
${rxs(['HAc + H2O <=> Ac^- + H3O^+','ácido₁ + base₂ ⇌ base₁ + ácido₂: dos pares conjugados'])}
${idea('Por qué Arrhenius no alcanza','<p>Sólo vale en agua y exige tener H⁺ o HO⁻ en la fórmula: no explica que el NH₃ sea básico ni que el NH₄Cl sea ácido. Brønsted–Lowry la incluye y la amplía.</p>')}
`],
  ['fuertes','3 · Fuertes y débiles: lo primero que hay que saber',`
${memo([['Ácidos fuertes','strong','<ul><li>HCl, HBr, HI</li><li>HNO₃, HClO₄, HClO₃</li><li>H₂SO₄ (sólo el 1.er H)</li></ul>'],['Bases fuertes','strong','<ul><li>LiOH, NaOH, KOH, RbOH, CsOH</li><li>Ca(OH)₂, Sr(OH)₂, Ba(OH)₂</li></ul>'],['Todo lo demás','weak','<ul><li>es débil: HAc, HF, HCN, NH₃, NH₄⁺…</li><li>se escribe con ⇌ y lleva su constante</li></ul>']])}
${table(['Fuerte','Débil'],[['disociación total: →, sin K','parcial: ⇌, con Ka o Kb'],['en solución no existe la especie sin disociar','conviven la especie y sus iones'],['su conjugado no tiene comportamiento ácido-base','su conjugado sí (hidroliza)']])}
${idea('Pista de los enunciados','<p>Si te dan una constante, normalmente es débil. Si no te la dan y no está en la tabla de constantes, normalmente es fuerte. Mirar siempre el contexto.</p>')}
`],
  ['agua','4 · El agua, Kw y el pH',`
<p>El agua es <b>anfiprótica</b>: puede ceder o aceptar un H⁺, incluso consigo misma (autoprotólisis). Por eso está en <b>todos</b> los sistemas.</p>
${sys({rx:[W]})}
${figure(pasajes,'Con un dato se calculan los otros tres. A 25 °C: Kw = 10⁻¹⁴ y pH + pOH = 14.')}
${flow([['Neutro','[H₃O⁺] = [HO⁻]. Sólo a 25 °C es pH 7.'],['Temperatura','la autoprotólisis es endotérmica: al calentar Kw sube (Le Châtelier) y el neutro baja (a 50 °C, pH 6,63, y sigue siendo neutro).'],['[HO⁻] nunca es 0','en un ácido es chica, pero vale Kw/[H₃O⁺].']])}
`],
  ['anfolitos','5 · Anfolitos y diagramas de especiación',`
<p>Un <b>anfolito</b> puede actuar como ácido o como base (H₂O, HCO₃⁻, H₂PO₄⁻, Al(OH)₃). Los polipróticos se escriben como una escalera, sin los H₂O, con las Ka arriba y las Kb abajo:</p>
${figure(ladder(['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻'],'del fosfórico'),'Cada tramo es un par conjugado: Ka·Kb = Kw con las dos constantes del mismo tramo (Kb₁ va con Ka₃).')}
<p>El <b>diagrama de especiación</b> dice qué fracción (α) hay de cada especie a cada pH:</p>
${figure(spec([2.12,7.21,12.32],['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻']),'Se cruzan en α = 0,5 en cada pKa. Entre dos pKa predomina el anfolito.')}
${flow([['Construir','un punto en α = 0,5 en cada pKa; a pKa ± 2 la especie que se va ya es ≈ 1 %.'],['Leer','debajo del pKa manda la forma con más H; arriba, la que tiene menos.'],['Regular','en pKa ± 1 las dos formas son comparables: ahí puede haber buffer.'],['Nunca cero','fuera de su zona, una especie es despreciable, no inexistente.']])}
`],
  ['resolver','6 · Cómo se resuelve y cómo se justifica',`
${flow([['1. Planteo','las reacciones (totales con →; reversibles con ⇌ y su K escrita abajo; el agua siempre), después el BM, después el BC.'],['2. Qué me molesta','miro los balances y veo qué término quiero sacar, y <b>respecto de qué</b>.'],['3. Por qué lo puedo sacar','fuerza del electrolito y K, C/K &gt; 100, choques efectivos, Le Châtelier, ion común, medio ácido o básico.'],['4. Despejo y reemplazo','del BM despejo una especie (C − la otra), la meto en el BC, cancelo, y el resultado va a K.'],['5. Verifico','lo despreciado ≤ 5 % de aquello respecto de lo cual lo desprecié.']])}
${reglas}
${figure(draw.choques,'Choques efectivos: en la concentrada los iones se encuentran seguido y rearman HA; se disocia una fracción menor (α, la fracción disociada, es chica).')}
`],
  ['fuerte-ej','7 · Resuelto: un ácido fuerte (y la trampa del muy diluido)',`
${example('HCl 0,025 M','',step('Planteo',sys({rx:[['HCl + H2O -> H3O^+ + Cl^-','','fuerte: total, sin K'],W],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}))+step('Justificación',jus('<p>Es razonable suponer [HO⁻] baja respecto de [Cl⁻] en el BC: el HCl aporta mucho H₃O⁺ y desplaza la autoprotólisis hacia los reactivos (Le Châtelier).</p>'))+chain(R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]=0{,}025\ \Rightarrow\ \mathrm{pH}=1{,}60`)+ver('<p>[HO⁻] = 4·10⁻¹³ M respecto de 0,025 ✔</p>'),'pH 1,60')}
${example('HCl 10⁻⁸ M: la suposición falla','',jus('<p>Con tan poco ácido no es razonable suponer [HO⁻] baja respecto de [Cl⁻]: el agua aporta más que el ácido. Se conserva todo el BC.</p>')+chain(R`[\mathrm{H_3O^+}]=C+\frac{K_w}{[\mathrm{H_3O^+}]}\Rightarrow[\mathrm{H_3O^+}]=1{,}05\times10^{-7}\Rightarrow\mathrm{pH}=6{,}98`),'pH 6,98: levemente ácido, nunca básico')}
`],
  ['debil-ej','8 · Resuelto: un ácido débil (y cuándo la aproximación falla)',`
${example('HAc 0,10 M (Ka 1,8·10⁻⁵)','',
 step('Planteo',sys({rx:[['HAc + H2O <=> Ac^- + H3O^+',R`K_a=\frac{[\mathrm{Ac^-}][\mathrm{H_3O^+}]}{[\mathrm{HAc}]}`],W],bm:[R`0{,}10=[\mathrm{HAc}]+[\mathrm{Ac^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`]}))+
 step('Justificación',jus('<p>En el BC es razonable suponer [HO⁻] baja respecto de [Ac⁻] (medio ácido). En el BM es razonable suponer [Ac⁻] baja respecto de 0,10: débil y C/Ka = 5560 &gt; 100 (muchos choques efectivos).</p>'))+
 chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{Ac^-}]\quad[\mathrm{HAc}]\approx0{,}10\ \Rightarrow\ K_a=\frac{[\mathrm{H_3O^+}]^2}{0{,}10}`,R`[\mathrm{H_3O^+}]=1{,}34\times10^{-3}\ \mathrm{M}\quad\mathrm{pH}=2{,}87\quad\alpha=1{,}3\,\%`)+ver('<p>1,3 % de C ✔</p>'),'pH 2,87')}
${example('HF 0,010 M (Ka 6,8·10⁻⁴)','',jus('<p>C/Ka = 15 &lt; 100: no es razonable suponer [F⁻] baja respecto de C. Se resuelve la cuadrática.</p>')+chain(R`6{,}8\times10^{-4}=\frac{x^2}{0{,}010-x}\Rightarrow x=2{,}29\times10^{-3}\quad\mathrm{pH}=2{,}64`),'pH 2,64')}
`],
  ['practica','9 · Para practicar',`
<p>Ejercicios de la Guía 3 que salen con lo visto hoy (se abren en la pestaña Teoría):</p>
${prac('acido-base',[['g3m-1','HNO₃ 0,050 M'],['g3m-4','Fuertes: pH y pOH'],['g3m-6','Fórmico 0,1 M'],['g3m-13','Metilamina diluida'],['g3m-9','Piperidina (cuadrática)'],['g3m-5','HClO muy diluido']])}
`]
  ]);

  // =====================================================================
  unit('acido-base-2',2,'Ácido-base II · Especiación, polipróticos e hidrólisis','Recorrido: leer y calcular un diagrama de especiación → ion común → polipróticos → mezclas → hidrólisis de sales.',[
  ['especiacion','1 · Diagramas de especiación con números',`
${chain([R`\alpha_{\mathrm{HA}}=\frac{[\mathrm{H_3O^+}]}{[\mathrm{H_3O^+}]+K_a}\qquad\alpha_{\mathrm{A^-}}=\frac{K_a}{[\mathrm{H_3O^+}]+K_a}`,'de Ka y el BM'])}
${figure(spec([4.74],['HAc','Ac⁻'],{band:[3.74,5.74]}),'Cruce en pH = pKa. La franja es pKa ± 1 (zona reguladora).')}
${figure(specLog([4.74],['HAc','Ac⁻'],{labels:[['HAc',1.5,-0.6,0],['Ac⁻',12.5,-0.6,1]]}),'En escala logarítmica se ve que ninguna fracción llega a 0.')}
${table(['pH respecto del pKa','[A⁻]/[HA]'],[['pKa − 2','1/100'],['pKa − 1','1/10'],['pKa','1'],['pKa + 1','10'],['pKa + 2','100']])}
`],
  ['ioncomun','2 · Efecto del ion común',`
${example('HAc 0,10 M + HCl 0,010 M','',
 step('Planteo',sys({rx:[['HCl + H2O -> H3O^+ + Cl^-','','total'],['HAc + H2O <=> Ac^- + H3O^+',R`K_a=\frac{[\mathrm{Ac^-}][\mathrm{H_3O^+}]}{[\mathrm{HAc}]}`],W],bm:[R`0{,}10=[\mathrm{HAc}]+[\mathrm{Ac^-}]`,R`[\mathrm{Cl^-}]=0{,}010`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{Ac^-}]+[\mathrm{HO^-}]`]}))+
 step('Justificación',jus('<p>Por ion común (Le Châtelier), el H₃O⁺ del HCl desplaza el equilibrio del acético hacia los reactivos: es razonable suponer [Ac⁻] baja respecto de [Cl⁻] en el BC y respecto de 0,10 en el BM.</p>'))+
 chain(R`[\mathrm{H_3O^+}]\approx0{,}010\Rightarrow\mathrm{pH}=2{,}00\qquad[\mathrm{Ac^-}]=\frac{K_a\cdot0{,}10}{0{,}010}=1{,}8\times10^{-4}`)+ver('<p>1,8 % de [Cl⁻] ✔</p>'),'El acético casi no se disocia (0,18 %)')}
`],
  ['polipro','3 · Polipróticos',`
${figure(ladder(['H₂S','HS⁻','S²⁻'],'del sulfhídrico'),'Dos protones, dos Ka; Kb₁ = Kw/Ka₂ y Kb₂ = Kw/Ka₁.')}
${jus('<p>El pH lo fija la primera disociación: es razonable suponer el H₃O⁺ de la segunda bajo respecto del de la primera porque Ka₂ ≪ Ka₁ y además está reprimida por ion común.</p>','Siempre se justifica así')}
${chain([R`\text{H}_2\text{S}\ 0{,}10\ \mathrm{M}:\ [\mathrm{H_3O^+}]=1{,}0\times10^{-4}\quad[\mathrm{S^{2-}}]\approx K_{a2}`,''],[R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}`,'con el pH se controla el sulfuro'])}
${warn('H₂SO₄','<p>1.ª disociación total; la 2.ª es débil pero con Ka₂ = 1,2·10⁻² grande: se resuelve la cuadrática (H₂SO₄ 0,010 M → pH 1,84).</p>')}
`],
  ['mezclas','4 · Mezclas de ácidos',`
${jus('<p>Se escribe el BC con todos los aniones y se decide qué anión es bajo <b>respecto de</b> cuál: el ácido más débil (menor Ka·C) queda reprimido por el H₃O⁺ del otro. Después se verifica con su propia K.</p>','La idea')}
${chain([R`\text{HCOOH }0{,}10+\text{HCN }0{,}10:\ [\mathrm{H_3O^+}]\approx[\mathrm{HCOO^-}]=4{,}24\times10^{-3}`,'manda el fórmico'],[R`[\mathrm{CN^-}]=\frac{K_a\,[\mathrm{HCN}]}{[\mathrm{H_3O^+}]}=1{,}2\times10^{-8}\ \ll\ [\mathrm{HCOO^-}]\ \checkmark`,''])}
${note('Si no verifica','<p>Acético + fórmico: [Ac⁻] da 10 % de [HCOO⁻]. Se conservan los dos en el BC y se resuelve.</p>')}
`],
  ['hidrolisis','5 · Hidrólisis de sales',`
${flow([['1. Neutralización que da la sal','de qué ácido y de qué base viene.'],['2. La sal se disocia toda','es electrolito fuerte.'],['3. Cada ion','si viene de un fuerte, no reacciona; si viene de un débil, reacciona con el agua.'],['4. Conclusión','fuerte–fuerte neutra · ácido fuerte–base débil ácida · ácido débil–base fuerte básica · débil–débil: comparar constantes.']])}
${example('NH₄Cl 0,10 M','',
 step('Planteo',sys({rx:[['NH4Cl -> NH4^+ + Cl^-','','total'],['NH4^+ + H2O <=> NH3 + H3O^+',R`K_a=\frac{[\mathrm{NH_3}][\mathrm{H_3O^+}]}{[\mathrm{NH_4^+}]}=\frac{K_w}{K_b}`],W],bm:[R`C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{Cl^-}]`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}))+
 step('Despeje',chain(R`[\mathrm{NH_4^+}]=C-[\mathrm{NH_3}]\ \Rightarrow\ C-[\mathrm{NH_3}]+[\mathrm{H_3O^+}]=C+[\mathrm{HO^-}]\ \Rightarrow\ [\mathrm{H_3O^+}]=[\mathrm{NH_3}]+[\mathrm{HO^-}]`))+
 step('Justificación',jus('<p>Es razonable suponer [HO⁻] baja respecto de [NH₃] (medio ácido) y [NH₃] baja respecto de C (Ka muy chica).</p>'))+
 chain(R`[\mathrm{H_3O^+}]=\sqrt{K_aC}=7{,}5\times10^{-6}\Rightarrow\mathrm{pH}=5{,}13`),'Ácida')}
${flow([['Anfiprótico (NaHCO₃)','pH ≈ ½(pKa₁ + pKa₂); se compara Ka con Kb del mismo ion para saber si es ácido o básico.'],['Débil–débil (NH₄Ac)','pH = ½(pKw + pKa − pKb), no depende de C.']])}
`],
  ['practica','6 · Para practicar',`
${prac('acido-base-2',[['g2-5','V o F de sales'],['g2-11','Descripción del NH₄HSO₄'],['g3p-1','H₂S saturado'],['g3p-3','H₂S + HCl'],['g3s-1','KCN 0,25 M'],['g3s-11','Benzoato de amonio'],['e2-2','HCl + acético (examen)'],['e4-6','¿Alcanza el equilibrio? (examen)']])}
`]
  ]);

  // =====================================================================
  unit('buffer',3,'Soluciones reguladoras','Recorrido: qué es y cómo funciona → criterios → Henderson y sus límites → elegir y diseñar → agregados.',[
  ['que-es','1 · Qué es y cómo funciona',`
${figure(draw.buffer,'Lo fuerte que se agrega se transforma en el componente débil del par.')}
${flow([['Par conjugado débil','ácido débil + su base conjugada (o base débil + su ácido).'],['Las dos formas apreciables','pH = pKa ± 1.'],['Concentraciones altas','y sin exceso de ácido o base fuerte.']])}
${table(['Sistema','¿Regula?'],[['HAc + NaAc','sí'],['NH₃ + NH₄Cl','sí'],['NH₄Cl solo','no: falta NH₃'],['NaCl','no: iones de fuertes'],['HAc + NaOH a la mitad','sí, en pH = pKa']])}
`],
  ['henderson','2 · Henderson y cuándo no usarlo',`
${chain([R`K_a=\frac{[\mathrm{A^-}][\mathrm{H_3O^+}]}{[\mathrm{HA}]}\Rightarrow\mathrm{pH}=\mathrm{p}K_a+\log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}`,'exacta'])}
${jus('<p>Para usar las concentraciones analíticas hay que suponer [H₃O⁺] (y [HO⁻]) bajas respecto de Cₐ y Cₛ: por ion común el ácido casi no se disocia y la base casi no hidroliza.</p>','Lo que supone')}
${key(R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_s}{C_a}`,'Henderson–Hasselbalch')}
${warn('No se usa si…','<ul><li>Ka grande con concentraciones bajas (verificación falla).</li><li>Una de las formas es despreciable.</li><li>Sobra ácido o base fuerte.</li><li>Todavía no hiciste la reacción con lo agregado.</li></ul>')}
${flow([['En el pKa','Cₐ = Cₛ → log 1 = 0 → pH = pKa: máxima capacidad reguladora, y diluir no lo cambia.']])}
`],
  ['disenar','3 · Elegir y diseñar',`
${flow([['Elegir','el par con pKa más cercano al pH pedido (para bases: pKa = 14 − pKb).'],['Relación',m(R`\frac{C_s}{C_a}=10^{\,\mathrm{pH}-\mathrm{p}K_a}`)],['Cantidades','con la concentración total elegida (más concentrado = más capacidad), pureza y volumen.']])}
${example('Regular a pH 9,5','<p>HAc (4,74) · NH₃ (pKb 4,74) · HCO₃⁻ (pKa₂ 10,25)</p>',jus('<p>NH₄⁺/NH₃ (pKa 9,26) es el más cercano a 9,5: con relación cercana a 1 tiene más capacidad. Relación NH₃/NH₄⁺ = 10<sup>0,24</sup> = 1,76.</p>'),'NH₃ + NH₄Cl, relación 1,76')}
`],
  ['agregados','4 · Agregado de ácido o base fuerte',`
${punch('Primero la reacción completa (estequiometría en moles), después Henderson.')}
${example('100 mL HAc 0,10 + NaAc 0,15; se agrega 1,0 mmol de HCl','',jus('<p>El H₃O⁺ agregado reacciona completamente con el Ac⁻ (base del par): Ac⁻(ac) + H₃O⁺(ac) → HAc(ac) + H₂O(l).</p>')+table(['mmol','Ac⁻','HAc'],[['antes','15','10'],['después','14','11']])+chain(R`\mathrm{pH}:\ 4{,}92\ \to\ 4{,}74+\log\frac{14}{11}=4{,}85`),'Cambia 0,07 (en agua cambiaría 5 unidades)')}
`],
  ['practica','5 · Para practicar',`
${prac('buffer',[['b-g2-18','NaOH + HAc: ¿regula?'],['b-g2-22','V o F'],['b-g3-1','Elegir el ácido'],['b-g3-2','Imidazol'],['b-g3-3','Henderson no alcanza'],['e7-1','Factor VIII (examen)']])}
`]
  ]);
})();
