// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 1 (2/2) · Equilibrio ácido-base
// Débiles (BM y BC), Ka·Kb, grado de disociación, especiación, Kp y Kc, ion común, polipróticos, mezclas,
// hidrólisis, buffers y capacidad reguladora, estrategia general y repaso.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const {sup,ver,flow,memo,spec,opt}=A;
  const R=String.raw;
  const u=window.ET27_QAC5.units.find(x=>x.id==='u1');if(!u)return;
  const s=u.sections;const add=(k,l,kk,h)=>s.push({key:`qac-u1-${k}`,label:l,kicker:kk,html:h});

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
 note('Acá no hace falta suponer','<p>El pH es dato: conocemos x exactamente. Sólo supusimos (y es obvio a pH 3) que el agua no aporta.</p>'),
 'Ka = 5,0·10⁻⁶ · α = 0,5 %')}
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
${idea('El criterio del 5 % es lo mismo que pedir α ≤ 0,05','<p>Por eso decir “x ≪ C” es lo mismo que decir “se disocia menos del 5 %”. Fijate en la tabla: para HAc 0,001 M el α es 12,5 % y la fórmula aproximada ya no sirve.</p>')}
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
 step('b) Fosfato a pH 7,4',`<p>7,4 está entre pKa₂ = 7,21 y pKa₃ = 12,32, muy cerca de pKa₂: predominan ${f('H2PO4^-')} y ${f('HPO4^2-')}. Como 7,4 &gt; 7,21, gana apenas HPO₄²⁻ (61 % frente a 39 %). H₃PO₄ y PO₄³⁻ son menos del 0,001 %.</p>`),
 'a) 64 % como Ac⁻ · b) HPO₄²⁻ 61 % y H₂PO₄⁻ 39 %')}
${deep('Fórmulas generales de las fracciones (diprótico)',`${M(R`D=[\mathrm{H^+}]^2+K_{a1}[\mathrm{H^+}]+K_{a1}K_{a2}`)}${M(R`\alpha_{\mathrm{H_2A}}=\frac{[\mathrm{H^+}]^2}{D}\qquad\alpha_{\mathrm{HA^-}}=\frac{K_{a1}[\mathrm{H^+}]}{D}\qquad\alpha_{\mathrm{A^{2-}}}=\frac{K_{a1}K_{a2}}{D}`)}<p>El patrón se extiende a cualquier número de protones: cada término agrega una Ka y le saca un [H⁺]. Así se dibujaron los diagramas de esta página.</p>`)}
`);

  // =====================================================================
  add('kpkc','Relación entre Kp y Kc (por si aparece)','ÁCIDO-BASE · 12',`
<p>Este tema viene de Química General y casi no se usa en Cualitativa (que trabaja en solución acuosa, con Kc). Lo dejamos resumido por si aparece en el programa.</p>
<p>Cuando en un equilibrio intervienen gases, la constante puede escribirse con presiones parciales (Kp) o con concentraciones (Kc). Como para un gas ideal ${m(R`p=\frac{n}{V}RT=[\,\mathrm{gas}\,]\,RT`)}:</p>
${key(R`K_p=K_c\,(RT)^{\Delta n}\qquad \Delta n=\text{moles de gas productos}-\text{moles de gas reactivos}`,'Kp y Kc')}
${example('N₂O₄ ⇌ 2 NO₂ a 25 °C','<p>Kc = 4,61·10⁻³. Calcular Kp (R = 0,082 atm·L/mol·K).</p>',
 step('Δn y cálculo',chain(R`\Delta n=2-1=1`,R`K_p=4{,}61\times10^{-3}\cdot(0{,}082\cdot298)^1=0{,}113`)),
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
${rxs(['H2S <=> H^+ + HS^-','Ka₁ = 1,0·10⁻⁷'],['HS^- <=> H^+ + S^2-','Ka₂ = 1,3·10⁻¹³'],['H2S <=> 2 H^+ + S^2-','K total = Ka₁·Ka₂ = 1,3·10⁻²⁰'])}
${key(R`K_{total}=K_{a1}\cdot K_{a2}=\frac{[\mathrm{H^+}]^2[\mathrm{S^{2-}}]}{[\mathrm{H_2S}]}`,'Constante total (suma de las dos etapas)')}
${table(['Ácido','Ka₁','Ka₂','Ka₃'],[['H₂S','1,0·10⁻⁷','1,3·10⁻¹³','—'],['H₂CO₃','4,3·10⁻⁷','5,6·10⁻¹¹','—'],['H₂SO₃','1,5·10⁻²','1,0·10⁻⁷','—'],['H₂SO₄','fuerte','1,2·10⁻²','—'],['H₃PO₄','7,5·10⁻³','6,2·10⁻⁸','4,8·10⁻¹³']])}
<h3>Cómo se calcula: la primera etapa manda</h3>
${sup([
 ['El pH lo fija sólo la primera disociación','Ka₂ es miles de veces menor que Ka₁, y además la segunda etapa está reprimida por el H⁺ de la primera (ion común).'],
 ['[HA⁻] ≈ [H⁺]','de la primera etapa salen un H⁺ y un HA⁻ por molécula, y la segunda casi no consume HA⁻.'],
 ['[A²⁻] ≈ Ka₂','de Ka₂ = [H⁺][A²⁻]/[HA⁻] con [H⁺] ≈ [HA⁻], se simplifican.']
])}
${example('H₂S 0,10 M (solución saturada)','<p>Calcular pH, [HS⁻] y [S²⁻].</p>',
 step('1. Primera etapa, como monoprótico',chain(R`[\mathrm{H^+}]=\sqrt{K_{a1}C}=\sqrt{1{,}0\times10^{-7}\cdot0{,}10}=1{,}0\times10^{-4}\ \mathrm{M}`,R`\mathrm{pH}=4{,}00\qquad[\mathrm{HS^-}]\approx1{,}0\times10^{-4}\ \mathrm{M}`))+
 step('2. Segunda etapa',chain(R`[\mathrm{S^{2-}}]=K_{a2}\frac{[\mathrm{HS^-}]}{[\mathrm{H^+}]}\approx K_{a2}=1{,}3\times10^{-13}\ \mathrm{M}`))+
 step('3. Verificamos',ver('<p>(a) '+m(R`\frac{10^{-4}}{0{,}10}=0{,}1\,\%`)+' → x ≪ C ✔. (b) La segunda etapa aporta 1,3·10⁻¹³ M de H⁺ frente a 10⁻⁴: despreciable ✔.</p>')),
 'pH 4,00 · [HS⁻] = 1,0·10⁻⁴ M · [S²⁻] = 1,3·10⁻¹³ M')}
${idea('La [S²⁻] se controla con el pH','<p>Despejando de la constante total: '+m(R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H^+}]^2}=\frac{1{,}3\times10^{-21}}{[\mathrm{H^+}]^2}`)+' (con H₂S saturado 0,10 M). Cambiando el pH con HCl se puede subir o bajar [S²⁻] en muchos órdenes: es la base de la separación de cationes por sulfuros (Unidades 2 y 5).</p>')}
${example('Ácido sulfúrico 0,010 M: el caso especial','<p>Calcular el pH de H₂SO₄ 0,010 M (Ka₂ = 1,2·10⁻²).</p>',
 step('1. Primera etapa: fuerte',rx('H2SO4 -> H^+ + HSO4^-','0,010 → 0,010 + 0,010'))+
 step('2. Segunda etapa: débil, pero con Ka₂ grande',rx('HSO4^- <=> H^+ + SO4^2-')+chain([R`1{,}2\times10^{-2}=\frac{(0{,}010+x)\,x}{0{,}010-x}`,'el H⁺ de la primera etapa es ion común']))+
 step('3. ¿Podemos suponer x ≪ 0,010?',ver('<p>No: Ka₂ = 0,012 es del mismo orden que C. Hay que resolver la cuadrática.</p>',false)+chain(R`x^2+0{,}022x-1{,}2\times10^{-4}=0\ \Rightarrow\ x=4{,}5\times10^{-3}\ \mathrm{M}`,R`[\mathrm{H^+}]=0{,}010+0{,}0045=0{,}0145\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=1{,}84`))+
 step('4. Las dos respuestas incorrectas típicas',table(['Error','pH que da'],[['Tomar los dos H como fuertes (2·0,010)','1,70'],['Ignorar la segunda etapa','2,00'],['<b>Correcto</b>','<b>1,84</b>']])),
 'pH = 1,84')}
${example('H₃PO₄ 0,10 M: la primera etapa no cumple x ≪ C','<p>Calcular el pH (Ka₁ = 7,5·10⁻³).</p>',
 step('1. Suponemos y verificamos',sup([['Sólo cuenta la primera etapa','Ka₂ es 120 000 veces menor.']])+chain(R`x\approx\sqrt{7{,}5\times10^{-3}\cdot0{,}10}=0{,}027`)+ver('<p>27 % de 0,10: no vale x ≪ C.</p>',false))+
 step('2. Cuadrática de la primera etapa',chain(R`x=\frac{-7{,}5\times10^{-3}+\sqrt{(7{,}5\times10^{-3})^2+4\cdot7{,}5\times10^{-3}\cdot0{,}10}}{2}=0{,}0239\ \mathrm{M}`,R`\mathrm{pH}=1{,}62`))+
 step('3. Esa sí se verifica',ver('<p>La segunda etapa aporta ≈ Ka₂ = 6,2·10⁻⁸ M frente a 0,024 M ✔.</p>')),
 'pH = 1,62')}
`);

  // =====================================================================
  add('mezclas','Mezclas de ácidos','ÁCIDO-BASE · 15',`
${table(['Mezcla','Qué pasa','Cómo se calcula'],[
 ['Fuerte + fuerte','todos se disocian','sumar los H⁺ (moles) y dividir por el volumen total'],
 ['Fuerte + débil','el fuerte reprime al débil (ion común)','[H⁺] ≈ la del fuerte; verificar que el débil aporta &lt; 5 %'],
 ['Débil + débil','los dos aportan H⁺ y se reprimen mutuamente','[H⁺] = √(Ka₁C₁ + Ka₂C₂); verificar los dos α'],
 ['Débil muy diferente','si Ka₁C₁ ≫ Ka₂C₂ manda el primero','calcular con el primero y verificar']
])}
<h3>Deducción para dos ácidos débiles</h3>
${chain([R`\text{BC: }[\mathrm{H^+}]=[\mathrm{A_1^-}]+[\mathrm{A_2^-}]`,'despreciando OH⁻'],[R`[\mathrm{A_i^-}]=\frac{K_{ai}[\mathrm{HA_i}]}{[\mathrm{H^+}]}\approx\frac{K_{ai}C_i}{[\mathrm{H^+}]}`,'suponiendo que cada uno se disocia poco'],[R`[\mathrm{H^+}]^2=K_{a1}C_1+K_{a2}C_2\ \Rightarrow\ [\mathrm{H^+}]=\sqrt{K_{a1}C_1+K_{a2}C_2}`])}
${example('Acético 0,10 M + fórmico 0,10 M','<p>Ka(HAc) = 1,8·10⁻⁵ · Ka(HCOOH) = 1,8·10⁻⁴. Calcular el pH.</p>',
 step('1. Suponemos',sup([['Cada ácido se disocia poco (HAᵢ ≈ Cᵢ)','son débiles y además se reprimen entre sí por el H⁺ común.'],['El agua no aporta','medio ácido.']]))+
 step('2. Resolvemos',chain(R`[\mathrm{H^+}]=\sqrt{1{,}8\times10^{-5}\cdot0{,}10+1{,}8\times10^{-4}\cdot0{,}10}=\sqrt{1{,}98\times10^{-5}}=4{,}45\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}35`))+
 step('3. Verificamos cada ácido',chain(R`[\mathrm{Ac^-}]=\frac{1{,}8\times10^{-6}}{4{,}45\times10^{-3}}=4{,}0\times10^{-4}\ (0{,}4\,\%\ \text{de }0{,}10)`,R`[\mathrm{HCOO^-}]=\frac{1{,}8\times10^{-5}}{4{,}45\times10^{-3}}=4{,}0\times10^{-3}\ (4{,}0\,\%\ \text{de }0{,}10)`)+ver('<p>Los dos por debajo del 5 % ✔. Control del BC: 4,0·10⁻⁴ + 4,0·10⁻³ = 4,4·10⁻³ ≈ [H⁺] ✔. El fórmico aporta el 90 % de la acidez.</p>')),
 'pH = 2,35')}
<p>El caso <b>fuerte + débil</b> está resuelto completo en la sección del ion común (HAc + HCl).</p>
`);

  // =====================================================================
  add('hidrolisis','Hidrólisis de sales','ÁCIDO-BASE · 16',`
<p>Una sal disuelta se separa completamente en iones. La pregunta es: <b>¿alguno de esos iones reacciona con el agua?</b> Reacciona (hidroliza) el que es <b>conjugado de una especie débil</b>. Los conjugados de fuertes (Na⁺, K⁺, Cl⁻, NO₃⁻…) son espectadores.</p>
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
 step('Verificamos',ver('<p>Mismas suposiciones y mismos números que el acetato, del otro lado de 7 ✔.</p>')),
 'pH = 5,13 (ácido)')}
<h3>Sal de ácido débil y base débil</h3>
${key(R`[\mathrm{H^+}]=\sqrt{\frac{K_w\,K_a}{K_b}}\qquad\mathrm{pH}=\tfrac12\left(\mathrm{p}K_w+\mathrm{p}K_a-\mathrm{p}K_b\right)`,'Ka del ácido del anión · Kb de la base del catión')}
${table(['Sal','Ka (ácido)','Kb (base)','pH'],[['NH₄Ac','1,8·10⁻⁵','1,8·10⁻⁵','7,00 (iguales: neutra)'],['NH₄CN','4,9·10⁻¹⁰','1,8·10⁻⁵','9,28 (Kb &gt; Ka: básica)']])}
${note('Qué se supone en esa fórmula','<p>Que la sal es lo bastante concentrada para que los dos iones hidrolicen “juntos” (el H⁺ de uno se combina con el OH⁻ del otro) y que se hidroliza una fracción chica de cada uno. Por eso el resultado <b>no depende de la concentración</b>.</p>')}
<h3>Sales anfipróticas (NaHCO₃, NaH₂PO₄, NaHS)</h3>
<p>El anión puede ceder o aceptar un H⁺. Las dos tendencias compiten y, si la concentración no es muy baja:</p>
${key(R`[\mathrm{H^+}]\approx\sqrt{K_{a1}K_{a2}}\qquad\mathrm{pH}\approx\tfrac12(\mathrm{p}K_{a1}+\mathrm{p}K_{a2})`,'Anfiprótico')}
${chain([R`\mathrm{NaHCO_3}:\ \mathrm{pH}=\tfrac12(6{,}37+10{,}25)=8{,}31`,'bicarbonato: levemente básico'],[R`\mathrm{NaH_2PO_4}:\ \mathrm{pH}=\tfrac12(2{,}12+7{,}21)=4{,}67`,'diácido fosfato: ácido'])}
${sup([['C ≫ Ka₁ y Ka₂·C ≫ Kw','se cumple en las concentraciones habituales (≥ 0,01 M). En el bicarbonato 0,1 M: C/Ka₁ ≈ 2·10⁵.']],'Suponemos (en la fórmula del anfiprótico)')}
<h3>Cationes metálicos que acidifican</h3>
<p>Los cationes pequeños y con carga alta (Fe³⁺, Al³⁺, Cr³⁺, Zn²⁺, Cu²⁺) polarizan las moléculas de agua que los rodean y liberan H⁺:</p>
${rx('[Fe(H2O)6]^3+ + H2O <=> [Fe(OH)(H2O)5]^2+ + H3O^+','Ka ≈ 6·10⁻³: ¡tan ácido como el fosfórico!')}
${idea('Consecuencia práctica en el laboratorio','<p>Las soluciones de FeCl₃ o de sales de Al³⁺ son ácidas. Por eso se preparan con un poco de ácido: si no, por hidrólisis precipitan los hidróxidos (la solución se enturbia).</p>')}
`);

  // =====================================================================
  add('buffers','Soluciones reguladoras (buffers)','ÁCIDO-BASE · 17',`
<p>Un buffer es una solución que <b>resiste los cambios de pH</b> cuando se le agregan pequeñas cantidades de ácido o base fuerte, o cuando se diluye. Se arma con un <b>par conjugado</b> en concentraciones parecidas:</p>
${table(['Caso','Ejemplo','Componente ácido','Componente básico'],[
 ['Ácido débil + su sal','HAc + NaAc',f('HAc'),f('Ac^-')],
 ['Base débil + su sal','NH₃ + NH₄Cl',f('NH4^+'),f('NH3')],
 ['Dos sales de un poliprótico','NaH₂PO₄ + Na₂HPO₄',f('H2PO4^-'),f('HPO4^2-')],
 ['Neutralización parcial','HAc en exceso + NaOH','el HAc que sobra','el Ac⁻ que se formó']
])}
<h3>Cómo funciona</h3>
${rxs(['Ac^- + H^+ -> HAc','si agrego ácido, lo “come” la base del par'],['HAc + OH^- -> Ac^- + H2O','si agrego base, la “come” el ácido del par'])}
<p>El ácido o base fuerte agregado se transforma en el componente débil del par: en lugar de cambiar mucho [H⁺], cambia un poco la relación entre las dos formas.</p>
<h3>Ecuación de Henderson–Hasselbalch</h3>
${chain([R`K_a=\frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}\ \Rightarrow\ [\mathrm{H^+}]=K_a\frac{[\mathrm{HA}]}{[\mathrm{A^-}]}`],[R`-\log[\mathrm{H^+}]=-\log K_a-\log\frac{[\mathrm{HA}]}{[\mathrm{A^-}]}`],[R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}`])}
${sup([
 ['[HA] ≈ C<sub>a</sub> y [A⁻] ≈ C<sub>s</sub> (lo que pusimos)','por ion común, el ácido casi no se disocia (lo reprime A⁻) y la base casi no hidroliza (la reprime HA). El cambio x es mucho menor que C<sub>a</sub> y C<sub>s</sub>.'],
 ['Las concentraciones no son muy bajas','si C<sub>a</sub> y C<sub>s</sub> fueran del orden de [H⁺] u [OH⁻], la suposición anterior se rompe.']
])}
${key(R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_s}{C_a}=\mathrm{p}K_a+\log\frac{n_{base}}{n_{ácido}}`,'Henderson–Hasselbalch')}
${ver('<p>Calcular [H⁺] (y [OH⁻]) y comprobar que son ≤ 5 % de C<sub>a</sub> y de C<sub>s</sub>.</p>')}
${example('Buffer acético: pH y agregado de ácido y base fuertes','<p>100 mL de solución con HAc 0,10 M y NaAc 0,15 M (pKa = 4,74). a) pH. b) pH al agregar 1,0 mL de HCl 1,0 M. c) pH al agregar 1,0 mL de NaOH 1,0 M. d) Comparar con agregar el HCl a 100 mL de agua.</p>',
 step('a) pH inicial',chain(R`\mathrm{pH}=4{,}74+\log\frac{0{,}15}{0{,}10}=4{,}74+0{,}18=4{,}92`)+ver('<p>'+m(R`[\mathrm{H^+}]=1{,}2\times10^{-5}\ \mathrm{M}`)+': es 0,012 % de 0,10 ✔</p>'))+
 step('b) Agrego 1,0 mmol de H⁺: PRIMERO estequiometría',table(['mmol','Ac⁻','H⁺','HAc'],[['Inicio','15','1,0','10'],['Reacción completa','−1,0','−1,0','+1,0'],['Final','14','0','11']])+chain(R`\mathrm{pH}=4{,}74+\log\frac{14}{11}=4{,}85\qquad\Delta\mathrm{pH}=-0{,}07`))+
 step('c) Agrego 1,0 mmol de OH⁻',chain(R`\mathrm{HAc}:10-1=9\qquad\mathrm{Ac^-}:15+1=16`,R`\mathrm{pH}=4{,}74+\log\frac{16}{9}=5{,}00\qquad\Delta\mathrm{pH}=+0{,}08`))+
 step('d) El mismo HCl en agua pura',chain(R`[\mathrm{H^+}]=\frac{1{,}0\ \mathrm{mmol}}{101\ \mathrm{mL}}=9{,}9\times10^{-3}\ \Rightarrow\ \mathrm{pH}=2{,}00\qquad\Delta\mathrm{pH}=-5`)),
 'Buffer: 4,92 → 4,85 con ácido y → 5,00 con base · Agua: 7 → 2,00')}
${idea('Por qué se pueden usar moles en Henderson','<p>Ácido y base conjugada están en el mismo volumen: '+m(R`\frac{C_s}{C_a}=\frac{n_s/V}{n_a/V}=\frac{n_s}{n_a}`)+'. Además eso explica por qué <b>diluir un buffer no cambia su pH</b> (mientras no se diluya demasiado).</p>')}
${example('Armar un buffer por neutralización parcial','<p>Se mezclan 50,0 mL de HAc 0,20 M con 25,0 mL de NaOH 0,20 M. Calcular el pH.</p>',
 step('1. Estequiometría',chain(R`n_{\mathrm{HAc}}=10{,}0\ \mathrm{mmol}\qquad n_{\mathrm{OH^-}}=5{,}0\ \mathrm{mmol}`,R`\text{quedan }5{,}0\ \mathrm{mmol\ HAc}\ \text{y se forman }5{,}0\ \mathrm{mmol\ Ac^-}`))+
 step('2. Henderson',chain(R`\mathrm{pH}=4{,}74+\log\frac{5{,}0}{5{,}0}=4{,}74=\mathrm{p}K_a`)),
 'pH = 4,74: neutralizar un ácido débil “a la mitad” da pH = pKa')}
${example('Buffer amoniacal','<p>NH₃ 0,20 M + NH₄Cl 0,10 M (Kb = 1,8·10⁻⁵).</p>',
 step('Dos caminos equivalentes',chain([R`\mathrm{pOH}=\mathrm{p}K_b+\log\frac{[\mathrm{NH_4^+}]}{[\mathrm{NH_3}]}=4{,}74+\log\frac{0{,}10}{0{,}20}=4{,}44\ \Rightarrow\ \mathrm{pH}=9{,}56`,'con Kb'],[R`\mathrm{pH}=\mathrm{p}K_a(\mathrm{NH_4^+})+\log\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=9{,}26+0{,}30=9{,}56`,'con Ka del amonio ✔'])),
 'pH = 9,56')}
<h3>Capacidad reguladora: ¿cuándo es máxima?</h3>
<p>La capacidad reguladora es la cantidad de ácido o base fuerte que el buffer puede absorber sin que el pH cambie demasiado. Depende de dos cosas:</p>
${flow([['Concentración total','Más concentrado (más moles de HA y A⁻) → más capacidad.'],['Relación entre las formas','Es <b>máxima cuando [HA] = [A⁻]</b>, es decir cuando <b>pH = pKa</b>. El rango útil es pKa ± 1 (relación entre 1:10 y 10:1).']])}
${example('¿Qué buffer resiste más?','<p>Dos buffers acéticos de 100 mL con la misma concentración total (0,20 M): A con 10 mmol HAc + 10 mmol Ac⁻; B con 2 mmol HAc + 18 mmol Ac⁻. Se agregan 2,0 mmol de HCl a cada uno.</p>',
 step('Buffer A (1 : 1)',chain(R`\mathrm{pH}:\ 4{,}74\ \to\ 4{,}74+\log\frac{8}{12}=4{,}56\qquad\Delta\mathrm{pH}=-0{,}18`))+
 step('Buffer B (1 : 9)',chain(R`\mathrm{pH}:\ 4{,}74+\log 9=5{,}70\ \to\ 4{,}74+\log\frac{16}{4}=5{,}34\qquad\Delta\mathrm{pH}=-0{,}35`)),
 'El buffer 1:1 cambia la mitad: la capacidad es máxima cuando pH = pKa')}
${deep('La capacidad reguladora como fórmula',`${M(R`\beta=\frac{dC_b}{d\,\mathrm{pH}}\approx2{,}303\,C\,\frac{K_a[\mathrm{H^+}]}{(K_a+[\mathrm{H^+}])^2}`)}<p>Derivando respecto de [H⁺] se ve que el máximo está en [H⁺] = Ka (pH = pKa), donde β = 2,303·C/4 ≈ 0,58·C. Es lo mismo que muestra el diagrama de especiación: en pH = pKa las dos curvas tienen la máxima pendiente, así que hace falta agregar más base para mover el pH.</p>`)}
${calc('qacBuffer','Buffer: pH antes y después de un agregado',field('pka','pKa',4.74)+field('na','ácido HA (mmol)',10)+field('nb','base A⁻ (mmol)',15)+field('add','agregado (mmol, + ácido / − base)',1),'Cargado con el ejemplo del acético. Probá agregar 16 mmol para agotar el buffer.')}
${warn('Errores típicos en buffers','<ul><li>Aplicar Henderson <b>antes</b> de hacer la reacción con el ácido o base fuerte agregado.</li><li>Invertir el cociente: va <b>base sobre ácido</b> (A⁻ / HA).</li><li>Usar Henderson cuando el agregado se come todo un componente: ahí ya no hay buffer.</li></ul>')}
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
 ['Ácido débil + su base conjugada','Henderson','[H⁺], [OH⁻] ≪ Ca, Cs'],
 ['Ácido fuerte + ácido débil','[H⁺] ≈ C fuerte','el débil aporta &lt; 5 %'],
 ['Dos ácidos débiles','[H⁺] = √(Ka₁C₁ + Ka₂C₂)','α de cada uno ≤ 5 %'],
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
 ['Polipróticos','[S²⁻] en H₂S 0,1 M','≈ Ka₂ = 1,3·10⁻¹³ M.'],
 ['Polipróticos','pH de H₂SO₄ 0,010 M','1,84: el segundo H es débil pero con Ka₂ grande (cuadrática).'],
 ['Hidrólisis','¿NaCN es ácido o básico?','Básico: el CN⁻ es base conjugada de un ácido débil.'],
 ['Hidrólisis','pH del NaHCO₃','≈ ½(pKa₁ + pKa₂) = 8,31.'],
 ['Buffers','¿Qué se hace primero al agregar HCl a un buffer?','La reacción completa con la base del par (estequiometría) y después Henderson.'],
 ['Buffers','¿Cuándo es máxima la capacidad reguladora?','Cuando [HA] = [A⁻], o sea pH = pKa (y a mayor concentración total).']
])}
`);
})();
