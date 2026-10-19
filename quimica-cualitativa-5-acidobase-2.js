// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 1 (2/2) · Equilibrio ácido-base
// Débiles (BM y BC), Ka·Kb, grado de disociación, especiación, Kp y Kc, ion común, polipróticos, mezclas,
// hidrólisis, buffers y capacidad reguladora, estrategia general y repaso.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const {sup,ver,flow,memo,spec,opt,jus,desc,sys,lc}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-ab-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('debiles','Ácidos y bases débiles: ley de acción de masas, BM y BC','ÁCIDO-BASE · 08',`
<p>Un ácido débil se disocia <b>sólo en parte</b>: en la solución conviven el ácido sin disociar y sus iones, en equilibrio. Cuánto se disocia lo dice su constante de acidez.</p>
${rx('HA(ac) <=> H^+(ac) + A^-(ac)')}
${key(R`K_a=\frac{[\mathrm{H^+}]\,[\mathrm{A^-}]}{[\mathrm{HA}]}\qquad\qquad K_b=\frac{[\mathrm{BH^+}]\,[\mathrm{OH^-}]}{[\mathrm{B}]}`,'Ley de acción de masas')}
${table(['Ácido / base débil','Constante (25 °C)','pK'],[
 ['Ácido acético HAc (CH₃COOH)','Ka = 1,8·10⁻⁵','4,74'],['Ácido fórmico HCOOH','Ka = 1,8·10⁻⁴','3,74'],['Ácido fluorhídrico HF','Ka = 6,8·10⁻⁴','3,17'],['Ácido nitroso HNO₂','Ka = 4,5·10⁻⁴','3,35'],['Ácido cianhídrico HCN','Ka = 4,9·10⁻¹⁰','9,31'],['Ion amonio NH₄⁺','Ka = 5,6·10⁻¹⁰','9,26'],['Amoníaco NH₃','Kb = 1,8·10⁻⁵','4,74']
])}
${note('Sobre los valores de las tablas','<p>Las constantes cambian un poco según el libro (por ejemplo Ka del HF aparece como 6,8·10⁻⁴ o 7,2·10⁻⁴). <b>Usá siempre los valores que da tu guía o tu parcial.</b> El razonamiento no cambia.</p>')}
<h3>Deducción de la fórmula del pH, sin saltear nada</h3>
<p>Tenemos un ácido débil HA de concentración analítica C<sub>a</sub>. Las incógnitas son [H⁺], [OH⁻], [HA] y [A⁻]: necesitamos cuatro ecuaciones.</p>
${chain([R`(1)\ K_a=\frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}`,'equilibrio del ácido'],[R`(2)\ K_w=[\mathrm{H^+}][\mathrm{OH^-}]`,'equilibrio del agua'],[R`(3)\ \text{BM: }C_a=[\mathrm{HA}]+[\mathrm{A^-}]`,'el ácido se reparte en dos formas'],[R`(4)\ \text{BC: }[\mathrm{H^+}]=[\mathrm{A^-}]+[\mathrm{OH^-}]`,'neutralidad eléctrica'])}
${step('Primera suposición: el agua no aporta',sup([['[OH⁻] ≪ [A⁻] en el BC, es decir [H⁺] ≈ [A⁻]','la solución es ácida (el ácido aporta mucho más H⁺ que el agua, y además el H⁺ del ácido reprime la autoionización). Falla sólo si el ácido es muy débil Y muy diluido.']])+chain([R`[\mathrm{A^-}]\approx[\mathrm{H^+}]\quad\text{y}\quad[\mathrm{HA}]=C_a-[\mathrm{H^+}]`,'de BC y BM'],[R`K_a=\frac{[\mathrm{H^+}]^2}{C_a-[\mathrm{H^+}]}`,'ecuación cuadrática: casi exacta']))}
${step('Segunda suposición: se disocia poco',sup([['[H⁺] ≪ C<sub>a</sub>, es decir C<sub>a</sub> − [H⁺] ≈ C<sub>a</sub>','Ka es chica: el equilibrio está muy desplazado hacia el ácido sin disociar. Funciona bien cuando C<sub>a</sub>/K<sub>a</sub> ≥ 400 aproximadamente.']])+chain([R`K_a\approx\frac{[\mathrm{H^+}]^2}{C_a}\ \Rightarrow\ [\mathrm{H^+}]=\sqrt{K_a\,C_a}`],[R`\mathrm{pH}=\tfrac12\left(\mathrm{p}K_a-\log C_a\right)`,'la misma fórmula en forma logarítmica']))}
${key(R`[\mathrm{H^+}]=\sqrt{K_a C_a}\qquad[\mathrm{OH^-}]=\sqrt{K_b C_b}`,'Ácido o base débil (con las dos suposiciones)')}
${ver('<p>Con el resultado: (1) '+m(R`[\mathrm{OH^-}]=K_w/[\mathrm{H^+}]`)+' tiene que ser ≤ 5 % de [H⁺]; (2) '+m(R`\frac{[\mathrm{H^+}]}{C_a}\cdot100\le5\,\%`)+'. Si (2) falla, se resuelve la cuadrática. Si (1) falla, hay que usar el planteo completo.</p>')}
${example('Ácido acético 0,10 M (la aproximación funciona)','<p>Calcular pH y grado de disociación de HAc 0,10 M (Ka = 1,8·10⁻⁵).</p>',
 step('1. Equilibrio y tabla',rx('HAc <=> H^+ + Ac^-')+table(['','HAc','H⁺','Ac⁻'],[['Inicio','0,10','≈ 0','0'],['Cambio','−x','+x','+x'],['Equilibrio','0,10 − x','x','x']]))+
 step('2. Suposiciones',sup([['El H⁺ del agua es despreciable','la solución va a ser claramente ácida; el agua aporta menos de 10⁻⁷ M.'],['x ≪ 0,10','Ka = 1,8·10⁻⁵ es chica y C/Ka = 5560 ≥ 400.']]))+
 step('3. Resolver',chain(R`1{,}8\times10^{-5}=\frac{x^2}{0{,}10-x}\approx\frac{x^2}{0{,}10}`,R`x=[\mathrm{H^+}]=\sqrt{1{,}8\times10^{-6}}=1{,}34\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}87`))+
 step('4. Verificar',ver('<p>'+m(R`\frac{1{,}34\times10^{-3}}{0{,}10}\cdot100=1{,}3\,\%\le5\,\%`)+' ✔ · '+m(R`[\mathrm{OH^-}]=7{,}5\times10^{-12}\ \mathrm{M}\ll[\mathrm{H^+}]`)+' ✔. (La cuadrática da pH 2,875: la diferencia es 0,003.)</p>'))+
 step('5. Grado de disociación',chain(R`\alpha=\frac{x}{C_a}=0{,}013\ \Rightarrow\ 1{,}3\,\%`)),
 'pH = 2,87 · α = 1,3 % (de cada 100 moléculas, sólo 1 o 2 se disocian)')}
${example('HF 0,010 M (la aproximación FALLA)','<p>Calcular el pH de HF 0,010 M (Ka = 6,8·10⁻⁴).</p>',
 step('1. Intento con x ≪ C',sup([['x ≪ 0,010','la suponemos para probar… aunque C/Ka = 14,7, muy por debajo de 400: sospechamos que va a fallar.']])+chain(R`x=\sqrt{6{,}8\times10^{-4}\cdot0{,}010}=2{,}61\times10^{-3}\ \mathrm{M}`))+
 step('2. Verificar',ver('<p>'+m(R`\frac{2{,}61\times10^{-3}}{0{,}010}\cdot100=26\,\%>5\,\%`)+'. Se disocia una parte importante: no se puede despreciar x frente a C.</p>',false))+
 step('3. Resolver la cuadrática',chain(R`6{,}8\times10^{-4}=\frac{x^2}{0{,}010-x}`,R`x^2+6{,}8\times10^{-4}x-6{,}8\times10^{-6}=0`,R`x=\frac{-K_a+\sqrt{K_a^2+4K_aC_a}}{2}=2{,}29\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}64\qquad\alpha=23\,\%`))+
 step('4. ¿Y el agua?',ver('<p>Seguimos despreciando sólo el agua: '+m(R`[\mathrm{OH^-}]=4\times10^{-12}\ \mathrm{M}`)+', despreciable ✔.</p>')),
 'pH = 2,64 (con la fórmula aproximada habría dado 2,58: error en el segundo decimal)')}
${example('Base débil: amoníaco 0,050 M','<p>Calcular el pH de NH₃ 0,050 M (Kb = 1,8·10⁻⁵).</p>',
 step('1. Equilibrio',rx('NH3 + H2O <=> NH4^+ + OH^-')+chain(R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{OH^-}]}{[\mathrm{NH_3}]}=\frac{x^2}{0{,}050-x}`))+
 step('2. Suponemos',sup([['x ≪ 0,050','Kb chica; C/Kb = 2780 ≥ 400.'],['El OH⁻ del agua no cuenta','medio claramente básico.']]))+
 step('3. Resolvemos',chain(R`[\mathrm{OH^-}]=\sqrt{1{,}8\times10^{-5}\cdot0{,}050}=9{,}5\times10^{-4}\ \mathrm{M}`,R`\mathrm{pOH}=3{,}02\ \Rightarrow\ \mathrm{pH}=10{,}98`))+
 step('4. Verificamos',ver('<p>'+m(R`\frac{9{,}5\times10^{-4}}{0{,}050}\cdot100=1{,}9\,\%`)+' ✔</p>')),
 'pH = 10,98')}
${example('Al revés: calcular Ka a partir del pH','<p>Una solución 0,20 M de un ácido débil HA tiene pH 3,00. Calcular Ka y α.</p>',
 step('1. Del pH sale x',chain(R`[\mathrm{H^+}]=[\mathrm{A^-}]=10^{-3}\ \mathrm{M}`,R`[\mathrm{HA}]=0{,}20-0{,}001=0{,}199\ \mathrm{M}`))+
 step('2. Constante',chain(R`K_a=\frac{(10^{-3})^2}{0{,}199}=5{,}0\times10^{-6}`))+
 step('3. Grado',chain(R`\alpha=\frac{10^{-3}}{0{,}20}=5\times10^{-3}\ \Rightarrow\ 0{,}5\,\%`))+
 note('Acá no hace falta suponer','<p>El pH es dato: conocemos x exactamente. Sólo supusimos (y es obvio a pH 3) que el agua no aporta.</p>')+A.jus('<p>Como el pH es dato, [H₃O⁺] se conoce exactamente: no hace falta despreciar nada para hallar Ka. Del BC, [A⁻] ≈ [H₃O⁺] porque es razonable suponer [HO⁻] baja respecto de [A⁻] en un medio de pH 3.</p>'),
 'Ka = 5,0·10⁻⁶ · α = 0,5 %')}
${deep('Ácido débil MUY diluido (o muy débil): vuelve a importar el agua',`<p>Si el ácido aporta tan poco H₃O⁺ como el agua (Ka·C del orden de Kw), no se puede despreciar la autoprotólisis. Del BC ${m(R`[\mathrm{H_3O^+}]=[\mathrm{A^-}]+[\mathrm{HO^-}]`)} con ${m(R`[\mathrm{A^-}]=K_a[\mathrm{HA}]/[\mathrm{H_3O^+}]`)}:</p>${M(R`[\mathrm{H_3O^+}]=\sqrt{K_a[\mathrm{HA}]+K_w}`)}<p>Ejemplos de la guía: HClO 10⁻⁶ M (Ka = 2,95·10⁻⁸) da pH 6,72, y la urea (Kb = 1,2·10⁻¹⁴) prácticamente no cambia el pH del agua.</p>`)}
${calc('qacWeak','Ácido o base débil: aproximado vs. exacto',opt('t',[['a','ácido débil (Ka)'],['b','base débil (Kb)']],'Tipo')+field('k','Ka o Kb',1.8e-5)+field('c','concentración C (M)',0.1),'Escribí las potencias como 1.8e-5. Probá HF: K = 6.8e-4 y C = 0.01.')}
`);

  // =====================================================================
  add('kakb','Pares conjugados: Ka·Kb = Kw','ÁCIDO-BASE · 09',`
<p>Si un ácido es débil, su base conjugada es una base débil (y al revés). Sus constantes están atadas:</p>
${chain([R`\mathrm{HA}\rightleftharpoons\mathrm{H^+}+\mathrm{A^-}\qquad K_a=\frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}`],[R`\mathrm{A^-}+\mathrm{H_2O}\rightleftharpoons\mathrm{HA}+\mathrm{OH^-}\qquad K_b=\frac{[\mathrm{HA}][\mathrm{OH^-}]}{[\mathrm{A^-}]}`],[R`K_a\cdot K_b=\frac{[\mathrm{H^+}][\cancel{\mathrm{A^-}}]}{\cancel{[\mathrm{HA}]}}\cdot\frac{\cancel{[\mathrm{HA}]}[\mathrm{OH^-}]}{\cancel{[\mathrm{A^-}]}}=[\mathrm{H^+}][\mathrm{OH^-}]`,'se cancelan'])}
${key(R`K_a\cdot K_b=K_w\qquad\mathrm{p}K_a+\mathrm{p}K_b=\mathrm{p}K_w=14`,'Par conjugado (25 °C)')}
${idea('Por qué funciona: sumar reacciones = multiplicar constantes','<p>Si sumás las dos reacciones de arriba te queda '+f('H2O')+' ⇌ '+f('H^+')+' + '+f('OH^-')+'. Esa es una regla que vamos a usar en toda la materia: <b>cuando se suman equilibrios, sus constantes se multiplican</b>; si una reacción se invierte, su constante se invierte (1/K).</p>')}
${table(['Ácido','Ka','Base conjugada','Kb = Kw/Ka'],[[f('HAc'),'1,8·10⁻⁵',f('Ac^-'),'5,6·10⁻¹⁰'],[f('HCN'),'4,9·10⁻¹⁰',f('CN^-'),'2,0·10⁻⁵'],[f('NH4^+'),'5,6·10⁻¹⁰',f('NH3'),'1,8·10⁻⁵'],[f('HF'),'6,8·10⁻⁴',f('F^-'),'1,5·10⁻¹¹']])}
${warn('Para polipróticos, ojo con qué constante va con qué','<p>Para el carbonato ('+f('CO3^2-')+' + H₂O ⇌ '+f('HCO3^-')+' + OH⁻), el par es '+f('HCO3^-')+'/'+f('CO3^2-')+', así que '+m(R`K_{b1}(\mathrm{CO_3^{2-}})=\frac{K_w}{K_{a2}}`)+'. La primera Kb va con la ÚLTIMA Ka.</p>')}
`);

  // =====================================================================
  add('alfa','Grado de disociación y ley de dilución de Ostwald','ÁCIDO-BASE · 10',`
${key(R`\alpha=\frac{\text{concentración disociada}}{\text{concentración inicial}}=\frac{[\mathrm{A^-}]}{C_a}\qquad \%\,\text{disociación}=\alpha\cdot100`,'Grado de disociación')}
<p>Para un ácido fuerte α = 1 (100 %). Para un débil α &lt; 1. Escribiendo las concentraciones en función de α:</p>
${chain([R`[\mathrm{H^+}]=[\mathrm{A^-}]=\alpha C\qquad[\mathrm{HA}]=C(1-\alpha)`],[R`K_a=\frac{(\alpha C)^2}{C(1-\alpha)}=\frac{\alpha^2C}{1-\alpha}`,'ley de dilución de Ostwald (exacta salvo el agua)'],[R`\text{si }\alpha\ll1:\quad \alpha\approx\sqrt{\frac{K_a}{C}}`,'misma suposición que x ≪ C'])}
${punch('Al diluir, el ácido débil se disocia MÁS (α sube), aunque la [H⁺] total baje. Es Le Châtelier: del lado derecho hay más partículas.')}
${table(['C del HAc (M)','α exacto','% disociado','pH'],[['1,0','0,0042','0,42 %','2,37'],['0,10','0,013','1,3 %','2,87'],['0,010','0,042','4,2 %','3,38'],['0,0010','0,125','12,5 %','3,90']])}
${idea('Por qué α sube al diluir: choques efectivos','<p>En la solución diluida los H₃O⁺ y A⁻ están más lejos: hay menos choques efectivos que rearmen HA, así que la fracción disociada aumenta. Es la justificación teórica de la tabla (y coincide con Le Châtelier: al diluir se favorece el lado con más partículas).</p>')}
${idea('Verificar el desprecio es verificar α','<p>“x ≪ C” es lo mismo que “α chico”. En la tabla, para HAc 0,001 M el α es 12,5 %: la fórmula aproximada ya no sirve (además C/Ka = 56 &lt; 100).</p>')}
`);

  // =====================================================================
  add('especiacion','Diagramas de especiación','ÁCIDO-BASE · 11',`
<p>Un diagrama de especiación muestra <b>qué fracción</b> del ácido está en cada forma según el pH. Es la foto más útil de la unidad: de un vistazo sabés qué especie predomina, dónde funciona un buffer y por qué un sulfuro precipita o no (Unidad 5).</p>
<h3>Monoprótico: ácido acético</h3>
${chain([R`\alpha_{\mathrm{HA}}=\frac{[\mathrm{HA}]}{C}=\frac{[\mathrm{H^+}]}{[\mathrm{H^+}]+K_a}\qquad\alpha_{\mathrm{A^-}}=\frac{[\mathrm{A^-}]}{C}=\frac{K_a}{[\mathrm{H^+}]+K_a}`,'salen de combinar Ka con el BM'],[R`\alpha_{\mathrm{HA}}+\alpha_{\mathrm{A^-}}=1`])}
${figure(spec([4.74],['HAc','Ac⁻'],{band:[3.74,5.74]}),'Las curvas se cruzan en pH = pKa = 4,74 (mitad y mitad). La franja sombreada, pKa ± 1, es la zona de buffer.')}
${table(['pH respecto del pKa','Qué predomina','[A⁻]/[HA]'],[['pH = pKa − 2','casi todo HA (99 %)','1/100'],['pH = pKa − 1','HA (91 %)','1/10'],['<b>pH = pKa</b>','<b>mitad y mitad</b>','<b>1</b>'],['pH = pKa + 1','A⁻ (91 %)','10'],['pH = pKa + 2','casi todo A⁻ (99 %)','100']])}
${punch('Regla de oro: por debajo del pKa manda la forma ácida (con el H); por encima, la forma básica.')}
<h3>Diprótico: ácido carbónico</h3>
${figure(spec([6.37,10.25],['H₂CO₃','HCO₃⁻','CO₃²⁻']),'Dos pKa, tres especies. El HCO₃⁻ predomina entre 6,37 y 10,25 y es máximo en pH = ½(pKa₁ + pKa₂) = 8,31.')}
<h3>Triprótico: ácido fosfórico</h3>
${figure(spec([2.12,7.21,12.32],['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻'],{mark:[{pH:7.4,label:'pH 7,4'}],markY:150}),'A pH 7,4 conviven H₂PO₄⁻ (39 %) y HPO₄²⁻ (61 %): por eso el fosfato regula el pH de la sangre y de las células.')}
${example('Leer un diagrama con números','<p>a) ¿Qué fracción del acético está como Ac⁻ a pH 5,00? b) ¿Qué especies del fosfato predominan a pH 7,40?</p>',
 step('a) Acético a pH 5',chain(R`[\mathrm{H^+}]=1{,}0\times10^{-5}`,R`\alpha_{\mathrm{Ac^-}}=\frac{1{,}8\times10^{-5}}{1{,}0\times10^{-5}+1{,}8\times10^{-5}}=0{,}64`)+'<p>Tiene sentido: pH 5 está un poco por encima del pKa (4,74), así que predomina apenas la forma básica.</p>')+
 step('b) Fosfato a pH 7,4',`<p>7,4 está entre pKa₂ = 7,21 y pKa₃ = 12,32, muy cerca de pKa₂: predominan ${f('H2PO4^-')} y ${f('HPO4^2-')}. Como 7,4 &gt; 7,21, gana apenas HPO₄²⁻ (61 % frente a 39 %). H₃PO₄ y PO₄³⁻ son menos del 0,001 %.</p>`)+A.jus('<p>Cada fracción α sale de combinar Ka con el balance de masa. A pH 5 el pH está por encima del pKa (4,74), así que predomina la forma básica del par; a pH 7,4 el fosfato está entre pKa₂ y pKa₃, cerca de pKa₂: conviven H₂PO₄⁻ y HPO₄²⁻.</p>'),
 'a) 64 % como Ac⁻ · b) HPO₄²⁻ 61 % y H₂PO₄⁻ 39 %')}
<h3>Cómo confeccionar un diagrama (lo piden así)</h3>
${flow([
 ['1. Escribir los equilibrios y sus pKa','Un poliprótico con n protones tiene n equilibrios y <b>n + 1 especies</b>.'],
 ['2. Ubicar los pKa en el eje de pH','En cada pKa se cruzan dos curvas consecutivas, con α = 0,5.'],
 ['3. Rangos de predominio','Por debajo de pKa₁ predomina la forma más protonada; entre pKa₁ y pKa₂, la siguiente; etc.'],
 ['4. Forma de las curvas','A pKa ± 1 la otra especie del par es ≈ 9 %; a pKa ± 2, ≈ 1 %. Las fracciones suman 1 en todo pH.'],
 ['5. Ninguna curva toca el cero','Fuera de su zona, una especie es despreciable pero existe (ver el gráfico logarítmico).']
])}
${figure(A.specLog([4.74],['HAc','Ac⁻'],{labels:[['HAc',1.5,-0.6,0],['Ac⁻',12.5,-0.6,1]]}),'El mismo diagrama del acético en escala logarítmica: a pH 12 la fracción de HAc es ≈ 10⁻⁷. Muy chica, pero no cero. “Despreciable” no es “inexistente”.')}
${table(['Pregunta típica','Respuesta'],[['¿Qué información da el diagrama?','qué fracción de la concentración total está como cada especie a cada pH, qué especie predomina y en qué rango, y dónde hay pares conjugados en cantidades comparables (zona de buffer).'],['¿Cómo se ve si está mal hecho?','curvas que no se cruzan en los pKa, fracciones que no suman 1, una especie con α = 0 o un número de especies que no es n + 1.'],['¿Se relaciona con la cinética?','<b>No</b>: describe el estado de equilibrio, no la velocidad con que se alcanza.']])}
<h3>Los indicadores son diagramas de especiación con color</h3>
<p>Un indicador es un ácido débil HIn cuya forma ácida y básica tienen distinto color. Vira cuando pasa de predominar una forma a la otra: en <b>pKi ± 1</b>.</p>
${table(['Indicador','Forma ácida','Forma básica','pKi','Viraje (pH)'],[['Anaranjado de metilo','rojo','amarillo-anaranjado','3,4','3,1–4,4'],['Rojo de metilo','rojo','amarillo','5,0','4,2–6,2'],['Azul de bromotimol','amarillo','azul','7,3','6,0–7,6'],['Fenolftaleína','incoloro','púrpura','9,1','8,3–10,0']])}
${deep('Fórmulas generales de las fracciones (diprótico)',`${M(R`D=[\mathrm{H^+}]^2+K_{a1}[\mathrm{H^+}]+K_{a1}K_{a2}`)}${M(R`\alpha_{\mathrm{H_2A}}=\frac{[\mathrm{H^+}]^2}{D}\qquad\alpha_{\mathrm{HA^-}}=\frac{K_{a1}[\mathrm{H^+}]}{D}\qquad\alpha_{\mathrm{A^{2-}}}=\frac{K_{a1}K_{a2}}{D}`)}<p>El patrón se extiende a cualquier número de protones: cada término agrega una Ka y le saca un [H⁺]. Así se dibujaron los diagramas de esta página.</p>`)}
`);

  // =====================================================================
  add('kpkc','Relación entre Kp y Kc (por si aparece)','ÁCIDO-BASE · 12',`
<p>Este tema viene de Química General y casi no se usa en Cualitativa (que trabaja en solución acuosa, con Kc). Lo dejamos resumido por si aparece en el programa.</p>
<p>Cuando en un equilibrio intervienen gases, la constante puede escribirse con presiones parciales (Kp) o con concentraciones (Kc). Como para un gas ideal ${m(R`p=\frac{n}{V}RT=[\,\mathrm{gas}\,]\,RT`)}:</p>
${key(R`K_p=K_c\,(RT)^{\Delta n}\qquad \Delta n=\text{moles de gas productos}-\text{moles de gas reactivos}`,'Kp y Kc')}
${example('N₂O₄ ⇌ 2 NO₂ a 25 °C','<p>Kc = 4,61·10⁻³. Calcular Kp (R = 0,082 atm·L/mol·K).</p>',
 step('Δn y cálculo',chain(R`\Delta n=2-1=1`,R`K_p=4{,}61\times10^{-3}\cdot(0{,}082\cdot298)^1=0{,}113`))+A.jus('<p>Para gases, presión parcial y concentración están relacionadas por p = [ ]·RT; al reemplazar en Kp aparece el factor (RT) elevado a la diferencia de moles gaseosos.</p>'),
 'Kp = 0,113 · si Δn = 0, Kp = Kc')}
`);

  // =====================================================================
  add('ioncomun','Efecto del ion común','ÁCIDO-BASE · 13',`
<p>Si a un ácido débil le agregamos uno de sus propios iones (H⁺ de un ácido fuerte, o A⁻ de una sal), el equilibrio se desplaza hacia el ácido sin disociar (Le Châtelier): <b>el ácido débil se disocia mucho menos</b>.</p>
${rx('HAc <=> H^+ + Ac^-','agregar H⁺ o Ac⁻ desplaza ←')}
${example('Ácido acético 0,10 M + HCl 0,010 M','<p>Calcular pH, [Ac⁻] y α del acético en una solución que contiene HAc 0,10 M y HCl 0,010 M. Comparar con el acético solo.</p>',
 step('1. ¿Qué hay en el vaso?',`<p>El HCl es fuerte: aporta 0,010 M de H⁺ completos. El acético es débil y además está “reprimido” por esos H⁺.</p>`)+
 step('2. Suponemos',sup([['[H⁺] ≈ 0,010 M (sólo del HCl)','el acético solo aportaría 1,3·10⁻³ M, y con ion común todavía menos: esperamos que sume menos del 5 % de 0,010.'],['[HAc] ≈ 0,10 M','si casi no se disocia, la forma sin disociar queda igual.']]))+
 step('3. Resolvemos desde Ka',chain(R`[\mathrm{Ac^-}]=\frac{K_a\,[\mathrm{HAc}]}{[\mathrm{H^+}]}=\frac{1{,}8\times10^{-5}\cdot0{,}10}{0{,}010}=1{,}8\times10^{-4}\ \mathrm{M}`,R`\mathrm{pH}=-\log(0{,}010)=2{,}00`))+
 step('4. Verificamos',ver('<p>El acético aportó 1,8·10⁻⁴ M de H⁺: '+m(R`\frac{1{,}8\times10^{-4}}{0{,}010}\cdot100=1{,}8\,\%`)+' de lo que aporta el HCl ✔. (Si lo sumáramos: pH 1,99.)</p>'))+
 step('5. Comparación',table(['','HAc 0,10 M solo','HAc 0,10 M + HCl 0,010 M'],[['[Ac⁻]','1,3·10⁻³ M','1,8·10⁻⁴ M'],['α del acético','1,3 %','<b>0,18 %</b>'],['pH','2,87','2,00']])),
 'pH 2,00 · el acético se disocia 7 veces menos por el ion común')}
${idea('El patrón del ion común','<p>Cuando hay ion común, la cuenta es <b>más fácil</b>, no más difícil: la concentración del ion común la fija la especie fuerte, y la débil se despeja directamente de la constante. Este mismo patrón aparece en precipitación (Unidad 2) y en complejos (Unidad 3).</p>')}
<p>El otro caso de ion común, ácido débil + su sal (HAc + NaAc), es la base de las <b>soluciones reguladoras</b> (más abajo).</p>
`);

  // =====================================================================
  add('polipro','Ácidos polipróticos: constantes parciales y total','ÁCIDO-BASE · 14',`
<p>Un ácido poliprótico tiene más de un H ácido y los cede <b>de a uno</b>, cada uno con su constante. Siempre Ka₁ ≫ Ka₂ ≫ Ka₃: cuesta más sacar un H⁺ de una especie que ya es negativa.</p>
${rxs(['H2S <=> H^+ + HS^-','Ka₁ = 9,5·10⁻⁸ (Tabla 1)'],['HS^- <=> H^+ + S^2-','Ka₂ = 1·10⁻¹⁹ (Tabla 1)'],['H2S <=> 2 H^+ + S^2-','K total = Ka₁·Ka₂ = 9,5·10⁻²⁷'])}
${key(R`K_{total}=K_{a1}\cdot K_{a2}=\frac{[\mathrm{H^+}]^2[\mathrm{S^{2-}}]}{[\mathrm{H_2S}]}`,'Constante total (suma de las dos etapas)')}
${table(['Ácido','Ka₁','Ka₂','Ka₃'],[['H₂S','9,5·10⁻⁸','1·10⁻¹⁹','—'],['H₂CO₃','4,3·10⁻⁷','5,6·10⁻¹¹','—'],['H₂SO₃','1,7·10⁻²','6,4·10⁻⁸','—'],['H₂SO₄','fuerte','1,2·10⁻²','—'],['H₃PO₄','7,5·10⁻³','6,2·10⁻⁸','4,2·10⁻¹³']])}
<h3>Cómo se calcula: la primera etapa manda</h3>
${sup([
 ['El pH lo fija sólo la primera disociación','Ka₂ es miles de veces menor que Ka₁, y además la segunda etapa está reprimida por el H⁺ de la primera (ion común).'],
 ['[HA⁻] ≈ [H⁺]','de la primera etapa salen un H⁺ y un HA⁻ por molécula, y la segunda casi no consume HA⁻.'],
 ['[A²⁻] ≈ Ka₂','de Ka₂ = [H⁺][A²⁻]/[HA⁻] con [H⁺] ≈ [HA⁻], se simplifican.']
])}
${example('H₂S 0,10 M (solución saturada)','<p>Calcular pH, [HS⁻] y [S²⁻].</p>',
 step('1. Primera etapa, como monoprótico',chain(R`[\mathrm{H^+}]=\sqrt{K_{a1}C}=\sqrt{9{,}5\times10^{-8}\cdot0{,}10}=9{,}7\times10^{-5}\ \mathrm{M}`,R`\mathrm{pH}=4{,}01\qquad[\mathrm{HS^-}]\approx9{,}7\times10^{-5}\ \mathrm{M}`))+
 step('2. Segunda etapa',chain(R`[\mathrm{S^{2-}}]=K_{a2}\frac{[\mathrm{HS^-}]}{[\mathrm{H^+}]}\approx K_{a2}=1\times10^{-19}\ \mathrm{M}`))+
 step('3. Verificamos',ver('<p>(a) '+m(R`\frac{10^{-4}}{0{,}10}=0{,}1\,\%`)+' → x ≪ C ✔. (b) La segunda etapa aporta 1·10⁻¹⁹ M de H⁺ frente a 10⁻⁴: despreciable ✔.</p>'))+A.jus('<p>El pH lo fija la primera disociación: es razonable suponer el H₃O⁺ de la segunda bajo respecto del de la primera porque Ka₂ ≪ Ka₁ y además la segunda está reprimida por el H₃O⁺ de la primera (ion común). Es razonable suponer [HS⁻] baja respecto de C porque C/Ka₁ &gt; 100.</p>'),
 'pH 4,01 · [HS⁻] = 9,7·10⁻⁵ M · [S²⁻] = 1·10⁻¹⁹ M')}
${idea('La [S²⁻] se controla con el pH','<p>Despejando de la constante total: '+m(R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H^+}]^2}=\frac{9{,}5\times10^{-28}}{[\mathrm{H^+}]^2}`)+' (con H₂S saturado 0,10 M y las constantes de la Tabla 1). Cambiando el pH con HCl se puede subir o bajar [S²⁻] en muchos órdenes: es la base de la separación de cationes por sulfuros (Unidades 2 y 5).</p>')}
${example('Ácido sulfúrico 0,010 M: el caso especial','<p>Calcular el pH de H₂SO₄ 0,010 M (Ka₂ = 1,2·10⁻²).</p>',
 step('1. Primera etapa: fuerte',rx('H2SO4 -> H^+ + HSO4^-','0,010 → 0,010 + 0,010'))+
 step('2. Segunda etapa: débil, pero con Ka₂ grande',rx('HSO4^- <=> H^+ + SO4^2-')+chain([R`1{,}2\times10^{-2}=\frac{(0{,}010+x)\,x}{0{,}010-x}`,'el H⁺ de la primera etapa es ion común']))+
 step('3. ¿Podemos suponer x ≪ 0,010?',ver('<p>No: Ka₂ = 0,012 es del mismo orden que C. Hay que resolver la cuadrática.</p>',false)+chain(R`x^2+0{,}022x-1{,}2\times10^{-4}=0\ \Rightarrow\ x=4{,}5\times10^{-3}\ \mathrm{M}`,R`[\mathrm{H^+}]=0{,}010+0{,}0045=0{,}0145\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=1{,}84`))+
 step('4. Las dos respuestas incorrectas típicas',table(['Error','pH que da'],[['Tomar los dos H como fuertes (2·0,010)','1,70'],['Ignorar la segunda etapa','2,00'],['<b>Correcto</b>','<b>1,84</b>']]))+A.jus('<p>La primera disociación es total (ácido fuerte). La segunda es débil, pero Ka₂ es del orden de C: no es razonable suponer x baja respecto de 0,010, por eso se resuelve la cuadrática. El H₃O⁺ de la primera etapa actúa como ion común y reprime en parte la segunda.</p>'),
 'pH = 1,84')}
${example('H₃PO₄ 0,10 M: la primera etapa no cumple x ≪ C','<p>Calcular el pH (Ka₁ = 7,5·10⁻³).</p>',
 step('1. Suponemos y verificamos',sup([['Sólo cuenta la primera etapa','Ka₂ es 120 000 veces menor.']])+chain(R`x\approx\sqrt{7{,}5\times10^{-3}\cdot0{,}10}=0{,}027`)+ver('<p>27 % de 0,10: no vale x ≪ C.</p>',false))+
 step('2. Cuadrática de la primera etapa',chain(R`x=\frac{-7{,}5\times10^{-3}+\sqrt{(7{,}5\times10^{-3})^2+4\cdot7{,}5\times10^{-3}\cdot0{,}10}}{2}=0{,}0239\ \mathrm{M}`,R`\mathrm{pH}=1{,}62`))+
 step('3. Esa sí se verifica',ver('<p>La segunda etapa aporta ≈ Ka₂ = 6,2·10⁻⁸ M frente a 0,024 M ✔.</p>')),
 'pH = 1,62')}
`);

  // =====================================================================
  add('mezclas','Mezclas de ácidos','ÁCIDO-BASE',`
<p>Cuando hay dos ácidos en el mismo vaso, los dos aportan H₃O⁺ y cada uno <b>reprime al otro</b> por ion común (Le Châtelier). La pregunta es siempre la misma: ¿puedo despreciar el aporte de uno <b>respecto del</b> otro?</p>
${table(['Mezcla','Qué pasa','Cómo se razona'],[
 ['Fuerte + fuerte','los dos se disocian totalmente','se suman los moles de H₃O⁺ y se divide por el volumen total'],
 ['Fuerte + débil','el H₃O⁺ del fuerte reprime al débil (ion común)','se supone [A⁻] del débil baja respecto de [Cl⁻] (o el anión del fuerte) en el BC; se verifica'],
 ['Débil + débil','el de mayor Ka·C aporta casi todo; el otro queda reprimido','se supone el aporte del más débil bajo respecto del otro en el BC; se verifica. Si no verifica, se resuelve el BC completo']
])}
${example('Ácido fórmico 0,10 M + HCN 0,10 M','<p>Ka(HCOOH) = 1,8·10⁻⁴ · Ka(HCN) = 4,9·10⁻¹⁰. Calcular el pH y [CN⁻].</p>',
 step('1. Planteo',sys({rx:[['HCOOH + H2O <=> HCOO^- + H3O^+',R`K_{a1}=\frac{[\mathrm{HCOO^-}][\mathrm{H_3O^+}]}{[\mathrm{HCOOH}]}`],['HCN + H2O <=> CN^- + H3O^+',R`K_{a2}=\frac{[\mathrm{CN^-}][\mathrm{H_3O^+}]}{[\mathrm{HCN}]}`],['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`]],bm:[R`0{,}10=[\mathrm{HCOOH}]+[\mathrm{HCOO^-}]`,R`0{,}10=[\mathrm{HCN}]+[\mathrm{CN^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HCOO^-}]+[\mathrm{CN^-}]+[\mathrm{HO^-}]`]}))+
 step('2. Qué molesta y por qué lo puedo sacar',jus('<p>En el BC me molestan [CN⁻] y [HO⁻]. Es razonable suponer que [CN⁻] es baja <b>respecto de</b> [HCOO⁻]: el HCN es un ácido muchísimo más débil (Ka 10⁶ veces menor) y además el H₃O⁺ del fórmico lo reprime (ion común, Le Châtelier). Es razonable suponer [HO⁻] baja respecto de [HCOO⁻] porque el medio es ácido.</p><p>En el BM del fórmico, es razonable suponer [HCOO⁻] baja respecto de 0,10: es débil y C/Ka = 556 &gt; 100.</p>'))+
 step('3. Despeje y reemplazo en Ka₁',chain([R`[\mathrm{H_3O^+}]\approx[\mathrm{HCOO^-}]\qquad[\mathrm{HCOOH}]\approx0{,}10`,'de BC y BM'],R`K_{a1}=\frac{[\mathrm{H_3O^+}]^2}{0{,}10}\Rightarrow[\mathrm{H_3O^+}]=4{,}24\times10^{-3}\ \mathrm{M}\quad\mathrm{pH}=2{,}37`))+
 step('4. El ácido despreciado se calcula con su K',chain([R`[\mathrm{CN^-}]=\frac{K_{a2}[\mathrm{HCN}]}{[\mathrm{H_3O^+}]}=\frac{4{,}9\times10^{-10}\cdot0{,}10}{4{,}24\times10^{-3}}=1{,}2\times10^{-8}\ \mathrm{M}`,'[HCN] ≈ 0,10']))+
 step('5. Verificación (respecto de la misma especie)',ver('<p>[CN⁻] = 1,2·10⁻⁸ respecto de [HCOO⁻] = 4,2·10⁻³: 3·10⁻⁴ % ✔ · [HCOO⁻] respecto de C: 4,2 % ✔ · [HO⁻] = 2,4·10⁻¹² respecto de [HCOO⁻] ✔</p>')),
 'pH = 2,37 · [CN⁻] = 1,2·10⁻⁸ M')}
${example('Ácido acético 0,10 M + ácido fórmico 0,10 M: cuando el desprecio NO vale','<p>Ka(HAc) = 1,8·10⁻⁵ · Ka(HCOOH) = 1,8·10⁻⁴.</p>',
 step('1. Intento',jus('<p>Supongo [Ac⁻] baja respecto de [HCOO⁻] en el BC (el acético es 10 veces más débil y está reprimido por el H₃O⁺ del fórmico). Con el ejemplo anterior: [H₃O⁺] = 4,24·10⁻³ M.</p>')+chain(R`[\mathrm{Ac^-}]=\frac{1{,}8\times10^{-5}\cdot0{,}10}{4{,}24\times10^{-3}}=4{,}2\times10^{-4}\ \mathrm{M}`))+
 step('2. Verificación',ver('<p>[Ac⁻] es el 10 % de [HCOO⁻] (4,2·10⁻³): <b>no</b> se puede despreciar. Las constantes no son tan distintas.</p>',false))+
 step('3. BC sin despreciar a ninguno de los dos',jus('<p>Se mantienen los dos aniones en el BC y se despeja cada uno de su propia K (en cada BM, sí sigue valiendo [A⁻] baja respecto de C: los dos son débiles y están reprimidos).</p>')+chain([R`[\mathrm{H_3O^+}]=[\mathrm{HCOO^-}]+[\mathrm{Ac^-}]=\frac{K_{a1}\cdot0{,}10}{[\mathrm{H_3O^+}]}+\frac{K_{a2}\cdot0{,}10}{[\mathrm{H_3O^+}]}`,'reemplazo cada anión despejado de su K'],R`[\mathrm{H_3O^+}]^2=1{,}8\times10^{-5}+1{,}8\times10^{-6}\Rightarrow[\mathrm{H_3O^+}]=4{,}45\times10^{-3}\ \mathrm{M}\quad\mathrm{pH}=2{,}35`)+ver('<p>[HCOO⁻] = 4,0·10⁻³ (4 % de C) ✔ y [Ac⁻] = 4,0·10⁻⁴ (0,4 % de C) ✔: los desprecios en los BM sí valen.</p>')),
 'pH = 2,35 (el acético aporta el 10 %)')}
${punch('Nunca se usa una fórmula de memoria para una mezcla: se escribe el BC y se decide, con justificación, qué término es bajo respecto de cuál.')}
<p>El caso <b>fuerte + débil</b> está resuelto en la sección del ion común (HAc + HCl) y en el Examen E2.</p>
`);

  // =====================================================================
  add('hidrolisis','Hidrólisis de sales','ÁCIDO-BASE · 16',`
<p>Una sal disuelta se separa completamente en iones. La pregunta es: <b>¿alguno de esos iones reacciona con el agua?</b> Reacciona (hidroliza) el que es <b>conjugado de una especie débil</b>. Los conjugados de fuertes (Na⁺, K⁺, Cl⁻, NO₃⁻…) son espectadores.</p>
<h3>El método de la cátedra: mirar de dónde viene cada ion</h3>
${flow([
 ['1. Escribir la neutralización que da origen a la sal','Ej.: HAc + NaOH → NaAc + H₂O. Así queda claro de qué ácido y de qué base viene.'],
 ['2. Disociación total de la sal (electrolito fuerte)','NaAc → Na⁺ + Ac⁻.'],
 ['3. Analizar cada ion con Brønsted–Lowry','Si viene de un electrolito <b>fuerte</b>, su conjugado no tiene comportamiento ácido-base: queda inalterado. Si viene de un electrolito <b>débil</b>, su conjugado reacciona con el agua: escribir el equilibrio.'],
 ['4. Concluir','Ninguno reacciona → neutra · sólo el catión → ácida · sólo el anión → básica · los dos → comparar constantes (no se puede generalizar).']
])}
${example('Aplicado a las cuatro categorías','<p>NaCl · NH₄Cl · NaAc · NH₄Ac</p>',
 step('NaCl (ácido fuerte + base fuerte)',jus('<p>Na⁺ viene del NaOH (fuerte) y Cl⁻ del HCl (fuerte): ninguno altera la autoprotólisis del agua → <b>neutra</b> (pH 7 a 25 °C).</p>'))+
 step('NH₄Cl (ácido fuerte + base débil)',rx('NH4^+ + H2O <=> NH3 + H3O^+')+jus('<p>Cl⁻ inalterado; el NH₄⁺, ácido conjugado de una base débil, genera H₃O⁺ → <b>ácida</b>.</p>'))+
 step('NaAc (ácido débil + base fuerte)',rx('Ac^- + H2O <=> HAc + HO^-')+jus('<p>Na⁺ inalterado; el Ac⁻, base conjugada de un ácido débil, genera HO⁻ → <b>básica</b>.</p>'))+
 step('NH₄Ac (ácido débil + base débil)',jus('<p>Ambos iones reaccionan con el agua: el carácter depende de comparar Ka(NH₄⁺) con Kb(Ac⁻). Acá son iguales (5,6·10⁻¹⁰) → pH 7, pero <b>no se puede generalizar</b>.</p>')),
 'Fuerte–fuerte neutra · fuerte–débil ácida · débil–fuerte básica · débil–débil: comparar constantes')}

${table(['Sal formada por…','Ejemplo','Ion que hidroliza','Medio'],[
 ['ácido fuerte + base fuerte','NaCl, KNO₃','ninguno','<b>neutro</b> (pH 7)'],
 ['ácido débil + base fuerte','NaAc, NaCN, Na₂CO₃','el anión: A⁻ + H₂O ⇌ HA + OH⁻','<b>básico</b>'],
 ['ácido fuerte + base débil','NH₄Cl, NH₄NO₃','el catión: NH₄⁺ ⇌ NH₃ + H⁺','<b>ácido</b>'],
 ['ácido débil + base débil','NH₄Ac, NH₄CN','los dos','depende de Ka vs Kb']
])}
${key(R`K_h=\frac{K_w}{K_a}\ \text{(anión de ácido débil)}\qquad K_h=\frac{K_w}{K_b}\ \text{(catión de base débil)}`,'Constante de hidrólisis')}
${example('Acetato de sodio 0,10 M','<p>Calcular el pH (Ka del HAc = 1,8·10⁻⁵).</p>',
 step('1. ¿Qué hay en el vaso?',rx('NaAc -> Na^+ + Ac^-','disociación total; Na⁺ espectador')+rx('Ac^- + H2O <=> HAc + OH^-','el acetato es una base débil'))+
 step('2. Constante',chain(R`K_h=K_b=\frac{10^{-14}}{1{,}8\times10^{-5}}=5{,}6\times10^{-10}`))+
 step('3. Suponemos',sup([['x ≪ 0,10','Kh = 5,6·10⁻¹⁰ es muy chica.'],['El OH⁻ del agua no cuenta','esperamos un medio básico con [OH⁻] ≫ 10⁻⁷.']]))+
 step('4. Resolvemos',chain(R`[\mathrm{OH^-}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}10}=7{,}5\times10^{-6}\ \mathrm{M}`,R`\mathrm{pOH}=5{,}13\ \Rightarrow\ \mathrm{pH}=8{,}87`))+
 step('5. Verificamos',ver('<p>'+m(R`\frac{7{,}5\times10^{-6}}{0{,}10}=0{,}0075\,\%`)+' ✔ · el agua aportaría ≈ 10⁻⁷ frente a 7,5·10⁻⁶ (1,3 %) ✔</p>')),
 'pH = 8,87 (básico)')}
${example('Cloruro de amonio 0,10 M','<p>Calcular el pH (Kb del NH₃ = 1,8·10⁻⁵).</p>',
 step('Hidrólisis del catión',rx('NH4^+ <=> NH3 + H^+')+chain(R`K_a(\mathrm{NH_4^+})=\frac{10^{-14}}{1{,}8\times10^{-5}}=5{,}6\times10^{-10}`,R`[\mathrm{H^+}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}10}=7{,}5\times10^{-6}\ \Rightarrow\ \mathrm{pH}=5{,}13`))+
 step('Verificamos',ver('<p>Mismas suposiciones y mismos números que el acetato, del otro lado de 7 ✔.</p>'))+A.jus('<p>El Cl⁻ viene del HCl (fuerte) y no reacciona con el agua; el NH₄⁺ es el ácido conjugado de una base débil y cede H⁺ al agua: la solución es ácida. Es razonable suponer [HO⁻] baja respecto de [NH₃] en el BC (medio ácido) y [NH₃] baja respecto de C en el BM (Ka muy chica, C/Ka ≫ 100).</p>'),
 'pH = 5,13 (ácido)')}
<h3>Sal de ácido débil y base débil</h3>
${key(R`[\mathrm{H^+}]=\sqrt{\frac{K_w\,K_a}{K_b}}\qquad\mathrm{pH}=\tfrac12\left(\mathrm{p}K_w+\mathrm{p}K_a-\mathrm{p}K_b\right)`,'Ka del ácido del anión · Kb de la base del catión')}
${table(['Sal','Ka (ácido)','Kb (base)','pH'],[['NH₄Ac','1,8·10⁻⁵','1,8·10⁻⁵','7,00 (iguales: neutra)'],['NH₄CN','4,9·10⁻¹⁰','1,8·10⁻⁵','9,28 (Kb &gt; Ka: básica)']])}
${note('Qué se supone en esa fórmula','<p>Que la sal es lo bastante concentrada para que los dos iones hidrolicen “juntos” (el H⁺ de uno se combina con el OH⁻ del otro) y que se hidroliza una fracción chica de cada uno. Por eso el resultado <b>no depende de la concentración</b>.</p>')}
<h3>Sales anfipróticas (NaHCO₃, NaH₂PO₄, NaHS)</h3>
<p>El anión puede ceder o aceptar un H⁺. Las dos tendencias compiten y, si la concentración no es muy baja:</p>
${key(R`[\mathrm{H^+}]\approx\sqrt{K_{a1}K_{a2}}\qquad\mathrm{pH}\approx\tfrac12(\mathrm{p}K_{a1}+\mathrm{p}K_{a2})`,'Anfiprótico')}
${chain([R`\mathrm{NaHCO_3}:\ \mathrm{pH}=\tfrac12(6{,}37+10{,}25)=8{,}31`,'bicarbonato: levemente básico'],[R`\mathrm{NaH_2PO_4}:\ \mathrm{pH}=\tfrac12(2{,}12+7{,}21)=4{,}67`,'diácido fosfato: ácido'])}
${deep('Fórmula más general del anfiprótico (cuando C no es ≫ Ka₁)',`${M(R`[\mathrm{H_3O^+}]=\sqrt{\frac{K_{a1}K_{a2}\,C}{K_{a1}+C}}`)}<p>Se deduce del BC suponiendo que el anfiprótico casi no se consume. Si C ≫ Ka₁, el cociente C/(Ka₁ + C) ≈ 1 y vuelve a ${m(R`\sqrt{K_{a1}K_{a2}}`)}. Ejemplo: NaHSO₃ 0,024 M (Ka₁ = 1,7·10⁻², Ka₂ = 6,4·10⁻⁸): C es comparable con Ka₁, la fórmula general da pH 4,60 y la simple 4,48.</p>`)}
${sup([['C ≫ Ka₁ y Ka₂·C ≫ Kw','se cumple en las concentraciones habituales (≥ 0,01 M). En el bicarbonato 0,1 M: C/Ka₁ ≈ 2·10⁵.']],'Suponemos (en la fórmula del anfiprótico)')}
<h3>Cationes metálicos que acidifican</h3>
<p>Los cationes pequeños y con carga alta (Fe³⁺, Al³⁺, Cr³⁺, Zn²⁺, Cu²⁺) polarizan las moléculas de agua que los rodean y liberan H⁺:</p>
${rx('[Fe(H2O)6]^3+ + H2O <=> [Fe(OH)(H2O)5]^2+ + H3O^+','Ka ≈ 6·10⁻³: ¡tan ácido como el fosfórico!')}
${idea('Consecuencia práctica en el laboratorio','<p>Las soluciones de FeCl₃ o de sales de Al³⁺ son ácidas. Por eso se preparan con un poco de ácido: si no, por hidrólisis precipitan los hidróxidos (la solución se enturbia).</p>')}
`);


  // =====================================================================
  add('estrategia','Estrategia general: ¿qué fórmula uso?','ÁCIDO-BASE · 18',`
<p>Antes de elegir fórmula, hacé siempre las reacciones completas (neutralizaciones) y mirá <b>qué queda en el vaso</b>. Después, esta tabla:</p>
${table(['Lo que queda en solución','Fórmula','Suposición a verificar'],[
 ['Ácido fuerte','[H⁺] = C','C ≥ 10⁻⁶ M (si no, BC + Kw)'],
 ['Base fuerte','[OH⁻] = C','C ≥ 10⁻⁶ M'],
 ['Ácido débil solo','[H⁺] = √(Ka·C)','x/C ≤ 5 % (si no, cuadrática)'],
 ['Base débil sola','[OH⁻] = √(Kb·C)','x/C ≤ 5 %'],
 ['Sal de ácido débil (A⁻)','[OH⁻] = √(Kw/Ka · C)','x/C ≤ 5 %'],
 ['Sal de base débil (BH⁺)','[H⁺] = √(Kw/Kb · C)','x/C ≤ 5 %'],
 ['Ácido débil + su base conjugada','Henderson (sección Buffer)','[H⁺], [OH⁻] ≪ Ca, Cs'],
 ['Ácido fuerte + ácido débil','[H⁺] ≈ C fuerte','el débil aporta &lt; 5 %'],
 ['Dos ácidos débiles','BC: el de mayor Ka·C fija el pH; el otro se desprecia respecto de él','[A⁻] del más débil ≤ 5 % del otro; si no, BC completo'],
 ['Poliprótico','primera etapa','Ka₂ ≪ Ka₁ y x/C ≤ 5 %'],
 ['Anfiprótico (HA⁻)','pH = ½(pKa₁ + pKa₂)','C no muy baja'],
 ['Sal de ácido y base débiles','pH = ½(pKw + pKa − pKb)','—']
],'compareTable')}
${punch('Si sobra ácido fuerte o base fuerte después de neutralizar, manda el fuerte. Si no sobra nada fuerte, mirá qué especies débiles quedaron.')}
`);

  // =====================================================================
  add('repaso','Repaso de ácido-base','ÁCIDO-BASE · REPASO',`
${cards([
 ['Teorías','¿Por qué Arrhenius no explica el NH₃?','Porque el NH₃ no tiene OH⁻: es básico porque acepta un H⁺ del agua (Brønsted) usando su par libre (Lewis).'],
 ['Teorías','¿Base conjugada de H₂PO₄⁻?','HPO₄²⁻: un H⁺ menos y una carga negativa más.'],
 ['Agua','¿Anfiprótico o anfolito?','Anfiprótico: cede o acepta H⁺. Anfolito: actúa como ácido o base (incluye al Al(OH)₃, que no es anfiprótico).'],
 ['Kw','¿Agua a 60 °C con pH 6,51 es ácida?','No: es neutra. A 60 °C pKw = 13,02 y neutro es 6,51.'],
 ['Fuertes','Nombrá los 7 ácidos fuertes','HCl, HBr, HI, HNO₃, HClO₄, HClO₃ y H₂SO₄ (primer H).'],
 ['Fuertes','pH de HCl 10⁻⁸ M','6,98 (no 8): hay que sumar el H⁺ del agua con BC + Kw.'],
 ['Débiles','¿Cuándo vale [H⁺] = √(KaC)?','Si el agua no aporta y x/C ≤ 5 % (orientativo: C/Ka ≥ 400). Siempre verificar.'],
 ['Débiles','Al diluir un ácido débil, ¿α sube o baja?','Sube (Ostwald). La [H⁺] total baja igual.'],
 ['Especiación','¿Qué hay en pH = pKa?','50 % de la forma ácida y 50 % de la básica.'],
 ['Ion común','¿Qué le pasa al HAc si agrego HCl?','Se disocia mucho menos: [Ac⁻] = Ka·[HAc]/[H⁺].'],
 ['Polipróticos','[S²⁻] en H₂S 0,1 M','≈ Ka₂ = 1·10⁻¹⁹ M (Tabla 1).'],
 ['Polipróticos','pH de H₂SO₄ 0,010 M','1,84: el segundo H es débil pero con Ka₂ grande (cuadrática).'],
 ['Hidrólisis','¿NaCN es ácido o básico?','Básico: el CN⁻ es base conjugada de un ácido débil.'],
 ['Hidrólisis','pH del NaHCO₃','≈ ½(pKa₁ + pKa₂) = 8,31.'],
 ['Buffers','¿Qué se hace primero al agregar HCl a un buffer?','La reacción completa con la base del par (estequiometría) y después Henderson.'],
 ['Buffers','¿Cuándo es máxima la capacidad reguladora?','Cuando [HA] = [A⁻], o sea pH = pKa (y a mayor concentración total).']
])}
`);
  window.ET27_QAC5.units.push({id:'acido-base-2',n:2,title:'Ácido-base II · Especiación, polipróticos e hidrólisis',short:'Ácido-base II',lead:'Diagramas de especiación, efecto del ion común, ácidos polipróticos, mezclas de ácidos e hidrólisis de sales. Con las guías 2 y 3 (polipróticos, sales y desafíos) y las evaluaciones resueltas.',sections:s});
})();
