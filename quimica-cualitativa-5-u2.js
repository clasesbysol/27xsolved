// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 2 · Equilibrio heterogéneo o de precipitación
// Solubilidad, Kps y producto iónico, comparación de Kps, ion común, ¿precipita?, precipitación fraccionada,
// agentes precipitantes (marcha de cationes) y relación con el pH.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts,vira,swatch}=Q;
  const {sup,ver,flow,memo}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-u2-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('solubilidad','Solubilidad de sustancias inorgánicas','PRECIPITACIÓN · 01',`
<p>Cuando agregamos un sólido iónico poco soluble al agua, una pequeñísima parte se disuelve y se separa en iones. Al rato se llega a un <b>equilibrio heterogéneo</b> (dos fases): el sólido sigue en el fondo y la solución queda <b>saturada</b>.</p>
${rx('AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','sólido ⇌ iones disueltos')}
${key(R`s=\text{solubilidad molar}=\text{moles de sólido que se disuelven por litro de solución saturada}`,'Solubilidad')}
${facts([['s (molar)','mol/L de sal disuelta'],['s (g/L)','s (mol/L) × M (g/mol)'],['Saturada','en equilibrio con el sólido'],['No saturada','todavía disuelve más'],['Sobresaturada','inestable: precipita al menor estímulo']])}
<h3>Reglas de solubilidad (para predecir sin tabla)</h3>
${table(['En general son SOLUBLES','Excepciones'],[
 ['Sales de Na⁺, K⁺, NH₄⁺ (grupo 1 y amonio)','—'],
 ['Nitratos NO₃⁻ y acetatos Ac⁻','—'],
 ['Cloruros, bromuros y yoduros','de Ag⁺, Pb²⁺ y Hg₂²⁺ (el PbCl₂ es algo soluble en caliente)'],
 ['Sulfatos SO₄²⁻','de Ba²⁺, Sr²⁺, Pb²⁺ (Ca²⁺ y Ag⁺ poco solubles)']
])}
${table(['En general son INSOLUBLES','Excepciones'],[
 ['Hidróxidos OH⁻','grupo 1; Ca, Sr, Ba algo solubles'],
 ['Carbonatos CO₃²⁻, fosfatos PO₄³⁻, cromatos CrO₄²⁻','grupo 1 y NH₄⁺'],
 ['Sulfuros S²⁻','grupo 1, NH₄⁺ y alcalinotérreos']
])}
${idea('Estas reglas son la base de la marcha analítica','<p>Cualitativa usa precipitaciones <b>selectivas</b> para separar cationes: elegimos un reactivo que precipite a unos y deje en solución a otros. Para hacerlo bien hay que cuantificar: eso es el Kps.</p>')}
`);

  // =====================================================================
  add('kps','Producto de solubilidad (Kps) y producto iónico (Q)','PRECIPITACIÓN · 02',`
<p>Aplicamos la ley de acción de masas al equilibrio de disolución. El sólido puro <b>no entra</b> en la constante (su “concentración” es constante):</p>
${rxs(['AgCl(s) <=> Ag^+ + Cl^-','Kps = [Ag⁺][Cl⁻]'],['Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-','Kps = [Ag⁺]²[CrO₄²⁻]'],['Mg(OH)2(s) <=> Mg^2+ + 2 OH^-','Kps = [Mg²⁺][OH⁻]²'])}
${key(R`\mathrm{A}_m\mathrm{B}_n(s)\rightleftharpoons m\,\mathrm{A}^{n+}+n\,\mathrm{B}^{m-}\qquad K_{ps}=[\mathrm{A}^{n+}]^m[\mathrm{B}^{m-}]^n`,'Producto de solubilidad')}
<h3>Kps vs. producto iónico Q</h3>
<p>La expresión es la misma, pero <b>Kps</b> usa las concentraciones <b>en el equilibrio</b> (solución saturada) y <b>Q</b> usa las concentraciones <b>que hay en este momento</b>, sean las que sean.</p>
${table(['Comparación','Situación','Qué pasa'],[['Q &lt; Kps','no saturada','no precipita; si hay sólido, se disuelve'],['Q = Kps','saturada','equilibrio'],['Q &gt; Kps','sobresaturada','<b>precipita</b> hasta que Q = Kps']])}
<h3>De Kps a s (en agua pura)</h3>
<p>Si se disuelven s mol/L de A<sub>m</sub>B<sub>n</sub>, aparecen m·s de catión y n·s de anión:</p>
${table(['Tipo','Ejemplo','Kps en función de s','s'],[
 ['AB','AgCl, BaSO₄',m(R`K_{ps}=s\cdot s=s^2`),m(R`s=\sqrt{K_{ps}}`)],
 ['AB₂ o A₂B','Mg(OH)₂, PbI₂, Ag₂CrO₄',m(R`K_{ps}=s\,(2s)^2=4s^3`),m(R`s=\sqrt[3]{K_{ps}/4}`)],
 ['AB₃','Fe(OH)₃, Al(OH)₃',m(R`K_{ps}=s\,(3s)^3=27s^4`),m(R`s=\sqrt[4]{K_{ps}/27}`)],
 ['A₃B₂','Ca₃(PO₄)₂',m(R`K_{ps}=(3s)^3(2s)^2=108s^5`),m(R`s=\sqrt[5]{K_{ps}/108}`)]
])}
${key(R`K_{ps}=m^m\,n^n\,s^{\,m+n}`,'Fórmula general (en agua pura)')}
${warn('El error clásico','<p>Para Ag₂CrO₄ escribir '+m(R`K_{ps}=(2s)\cdot s`)+' (sin elevar al cuadrado) o '+m(R`K_{ps}=2s^2\cdot s`)+' (elevando sólo la s). Es '+m(R`(2s)^2=4s^2`)+': el coeficiente <b>también</b> se eleva.</p>')}
${table(['Sal','Kps (25 °C)'],[['AgCl','1,8·10⁻¹⁰'],['AgBr','5,0·10⁻¹³'],['AgI','8,3·10⁻¹⁷'],['Ag₂CrO₄','1,1·10⁻¹²'],['PbCl₂','1,7·10⁻⁵'],['PbI₂','7,1·10⁻⁹'],['BaSO₄','1,1·10⁻¹⁰'],['CaCO₃','4,5·10⁻⁹'],['CaF₂','3,9·10⁻¹¹'],['Mg(OH)₂','1,8·10⁻¹¹'],['Fe(OH)₃','4·10⁻³⁸'],['Al(OH)₃','1,3·10⁻³³'],['FeS','6,3·10⁻¹⁸'],['CuS','6,3·10⁻³⁶']])}
${note('Los Kps varían mucho entre tablas','<p>Sobre todo los de sulfuros e hidróxidos (pueden diferir en órdenes de magnitud según la fuente). Usá los de tu guía.</p>')}
${example('Solubilidad del AgCl en agua','<p>Calcular s en mol/L y en g/L (M = 143,3 g/mol).</p>',
 step('1. Equilibrio y tabla',rx('AgCl(s) <=> Ag^+ + Cl^-')+table(['','Ag⁺','Cl⁻'],[['Se disuelven s mol/L','s','s']]))+
 step('2. Resolver',chain(R`K_{ps}=s^2=1{,}8\times10^{-10}\ \Rightarrow\ s=1{,}34\times10^{-5}\ \mathrm{M}`,R`s=1{,}34\times10^{-5}\cdot143{,}3=1{,}9\times10^{-3}\ \mathrm{g/L}`))+
 note('¿Qué supusimos?','<p>Que los iones no reaccionan con nada más (ni hidrólisis ni complejos). Para Ag⁺ y Cl⁻ es razonable: el Cl⁻ es base conjugada de un ácido fuerte y el Ag⁺ casi no hidroliza.</p>'),
 's = 1,34·10⁻⁵ M = 1,9 mg/L')}
${example('Solubilidad y pH de una solución saturada de Mg(OH)₂','<p>Kps = 1,8·10⁻¹¹. Calcular s y el pH de la solución saturada.</p>',
 step('1. Planteo',rx('Mg(OH)2(s) <=> Mg^2+ + 2 OH^-')+chain(R`K_{ps}=s\,(2s)^2=4s^3`))+
 step('2. Resolver',chain(R`s=\sqrt[3]{\frac{1{,}8\times10^{-11}}{4}}=1{,}65\times10^{-4}\ \mathrm{M}`,R`[\mathrm{OH^-}]=2s=3{,}3\times10^{-4}\ \mathrm{M}\ \Rightarrow\ \mathrm{pOH}=3{,}48\ \Rightarrow\ \mathrm{pH}=10{,}52`))+
 step('3. Verificar',ver('<p>Supusimos que todo el OH⁻ viene del hidróxido: el agua aportaría ≈ 10⁻¹⁰ M (en medio básico), despreciable frente a 3,3·10⁻⁴ ✔.</p>')),
 's = 1,65·10⁻⁴ M · pH = 10,52 (la “leche de magnesia”)')}
${calc('qacKps','Solubilidad a partir de Kps',field('m','m (cationes por fórmula)',2)+field('n','n (aniones por fórmula)',1)+field('kps','Kps',1.1e-12)+field('cc','ion común: [anión] agregado (M, 0 = agua)',0),'Cargado con Ag₂CrO₄. Probá AgCl (1, 1, 1.8e-10) con 0.01 M de Cl⁻.')}
`);

  // =====================================================================
  add('comparar','Comparación de Kps: ¿cuál es más soluble?','PRECIPITACIÓN · 03',`
${punch('Comparar Kps directamente SÓLO vale para sales del mismo tipo (misma relación m:n). Si no, hay que comparar s.')}
${table(['Sales del mismo tipo (AB)','Kps','s (M)'],[['AgCl','1,8·10⁻¹⁰','1,3·10⁻⁵'],['AgBr','5,0·10⁻¹³','7,1·10⁻⁷'],['AgI','8,3·10⁻¹⁷','9,1·10⁻⁹']])}
<p>Acá sí: menor Kps → menor s. El AgI es el menos soluble.</p>
${example('AgCl vs Ag₂CrO₄: la trampa','<p>Kps(AgCl) = 1,8·10⁻¹⁰ · Kps(Ag₂CrO₄) = 1,1·10⁻¹². ¿Cuál es más soluble?</p>',
 step('Mirando sólo Kps…',`<p>Diríamos que el cromato (Kps menor) es menos soluble. <b>Error</b>: son de distinto tipo.</p>`)+
 step('Calculando s',chain(R`\mathrm{AgCl}:\ s=\sqrt{1{,}8\times10^{-10}}=1{,}3\times10^{-5}\ \mathrm{M}`,R`\mathrm{Ag_2CrO_4}:\ s=\sqrt[3]{\frac{1{,}1\times10^{-12}}{4}}=6{,}5\times10^{-5}\ \mathrm{M}`)),
 'El Ag₂CrO₄ es ~5 veces MÁS soluble que el AgCl, aunque su Kps sea menor')}
${idea('Por qué pasa','<p>En el Ag₂CrO₄ la s está elevada al cubo (4s³) y en el AgCl al cuadrado (s²). Con exponentes distintos, un número más chico de Kps puede venir de una s más grande. Esto se usa en el <b>método de Mohr</b> (titulación de cloruros): primero precipita todo el AgCl blanco y recién después el Ag₂CrO₄ rojo ladrillo, que marca el punto final.</p>')}
`);

  // =====================================================================
  add('ioncomun','Efecto del ion común en la solubilidad','PRECIPITACIÓN · 04',`
<p>Si la solución ya contiene uno de los iones de la sal, el equilibrio de disolución se desplaza hacia el sólido (Le Châtelier): <b>la solubilidad disminuye</b>. Es el mismo patrón que en ácido-base: la concentración del ion común la fija la sal soluble y la otra se despeja del Kps.</p>
${rx('AgCl(s) <=> Ag^+ + Cl^-','agregar Cl⁻ (NaCl) desplaza ←')}
${example('AgCl en NaCl 0,010 M','<p>Calcular la solubilidad del AgCl en NaCl 0,010 M y compararla con la del agua pura.</p>',
 step('1. Tabla',table(['','Ag⁺','Cl⁻'],[['Inicial (del NaCl)','0','0,010'],['Se disuelve s','+s','+s'],['Equilibrio','s','0,010 + s']]))+
 step('2. Suponemos',sup([['0,010 + s ≈ 0,010','en agua pura s = 1,3·10⁻⁵ M y con ion común va a ser todavía menor: es despreciable frente a 0,010.']]))+
 step('3. Resolvemos',chain(R`K_{ps}=s\cdot0{,}010\ \Rightarrow\ s=\frac{1{,}8\times10^{-10}}{0{,}010}=1{,}8\times10^{-8}\ \mathrm{M}`))+
 step('4. Verificamos',ver('<p>'+m(R`\frac{1{,}8\times10^{-8}}{0{,}010}\cdot100=1{,}8\times10^{-4}\,\%`)+' ✔</p>'))+
 step('5. Comparamos',chain(R`\frac{s_{\text{agua}}}{s_{\text{NaCl}}}=\frac{1{,}34\times10^{-5}}{1{,}8\times10^{-8}}\approx740`)),
 's = 1,8·10⁻⁸ M: unas 740 veces menos soluble que en agua')}
${example('Ag₂CrO₄: no da lo mismo cuál ion es el común','<p>Calcular s del Ag₂CrO₄ (Kps = 1,1·10⁻¹²) en a) AgNO₃ 0,010 M y b) K₂CrO₄ 0,010 M.</p>',
 step('a) Ion común Ag⁺',sup([['[Ag⁺] = 0,010 + 2s ≈ 0,010','s va a ser muy chica (ion común).']])+chain(R`K_{ps}=(0{,}010)^2\cdot s\ \Rightarrow\ s=\frac{1{,}1\times10^{-12}}{10^{-4}}=1{,}1\times10^{-8}\ \mathrm{M}`)+ver('<p>2s = 2,2·10⁻⁸ ≪ 0,010 ✔</p>'))+
 step('b) Ion común CrO₄²⁻',sup([['[CrO₄²⁻] = 0,010 + s ≈ 0,010','idem.']])+chain(R`K_{ps}=(2s)^2\cdot0{,}010\ \Rightarrow\ s=\sqrt{\frac{1{,}1\times10^{-12}}{0{,}040}}=5{,}2\times10^{-6}\ \mathrm{M}`)+ver('<p>s = 5,2·10⁻⁶ ≪ 0,010 ✔</p>')),
 'a) 1,1·10⁻⁸ M · b) 5,2·10⁻⁶ M — reprime mucho más el ion que va al cuadrado')}
${idea('Para precipitar “completamente”, se agrega exceso de reactivo','<p>Por el ion común, un pequeño exceso del agente precipitante baja muchísimo la concentración del ion que queremos sacar de la solución. ¡Pero ojo!: un gran exceso puede volver a disolver el precipitado si forma complejos (por ejemplo AgCl en Cl⁻ muy concentrado → '+f('[AgCl2]^-')+'). Eso es Unidad 3 y 5.</p>')}
`);

  // =====================================================================
  add('precipita','¿Precipita o no? Mezclas y precipitación completa','PRECIPITACIÓN · 05',`
${flow([
 ['Calcular las concentraciones DESPUÉS de mezclar','Cada solución se diluye en el volumen total: '+m(R`C'=\frac{C\cdot V}{V_{total}}`)+'. Es el error más frecuente olvidarlo.'],
 ['Calcular Q','Con la misma expresión que el Kps, pero con esas concentraciones.'],
 ['Comparar','Q &gt; Kps precipita · Q &lt; Kps no precipita.'],
 ['Si precipita y piden cuánto queda','Reacción “completa” con el limitante, ver qué ion sobra y despejar el otro del Kps (ion común).']
])}
${example('Dos mezclas: una precipita y otra no','<p>a) 50 mL de Pb(NO₃)₂ 0,010 M + 50 mL de KI 0,010 M (Kps PbI₂ = 7,1·10⁻⁹). b) 10 mL de AgNO₃ 1,0·10⁻⁴ M + 90 mL de NaCl 1,0·10⁻⁵ M (Kps AgCl = 1,8·10⁻¹⁰).</p>',
 step('a) Concentraciones en 100 mL',chain(R`[\mathrm{Pb^{2+}}]=\frac{0{,}010\cdot50}{100}=0{,}0050\qquad[\mathrm{I^-}]=0{,}0050`,R`Q=[\mathrm{Pb^{2+}}][\mathrm{I^-}]^2=0{,}0050\cdot(0{,}0050)^2=1{,}25\times10^{-7}`,[R`Q=1{,}25\times10^{-7}>K_{ps}=7{,}1\times10^{-9}`,'precipita PbI₂ (amarillo)']))+
 step('b) Concentraciones en 100 mL',chain(R`[\mathrm{Ag^+}]=\frac{10^{-4}\cdot10}{100}=1{,}0\times10^{-5}\qquad[\mathrm{Cl^-}]=\frac{10^{-5}\cdot90}{100}=9{,}0\times10^{-6}`,R`Q=1{,}0\times10^{-5}\cdot9{,}0\times10^{-6}=9{,}0\times10^{-11}`,[R`Q<K_{ps}=1{,}8\times10^{-10}`,'no precipita'])),
 'a) precipita PbI₂ · b) no precipita (queda solución no saturada)')}
${key(R`\text{Precipitación completa (criterio práctico): }[\text{ion}]_{\text{que queda}}\le10^{-5}\ \mathrm{M}\ \ (\text{o}\ \ge99{,}9\,\%\ \text{precipitado})`,'Cuándo decimos que “precipitó todo”')}
${example('¿Cuánta plata queda en solución?','<p>Se mezclan 50 mL de AgNO₃ 0,020 M con 50 mL de NaCl 0,030 M. Calcular [Ag⁺] que queda y decidir si la precipitación es completa.</p>',
 step('1. Después de mezclar',chain(R`[\mathrm{Ag^+}]_0=0{,}010\ \mathrm{M}\qquad[\mathrm{Cl^-}]_0=0{,}015\ \mathrm{M}`))+
 step('2. Precipitación (como si fuera completa)',sup([['Precipita prácticamente toda la plata','Kps muy chico y hay exceso de Cl⁻.']])+chain(R`[\mathrm{Cl^-}]_{\text{sobra}}=0{,}015-0{,}010=0{,}005\ \mathrm{M}`))+
 step('3. La plata que queda sale del Kps (ion común)',chain(R`[\mathrm{Ag^+}]=\frac{1{,}8\times10^{-10}}{0{,}005}=3{,}6\times10^{-8}\ \mathrm{M}`))+
 step('4. Verificamos',ver('<p>La plata que queda (3,6·10⁻⁸ M) es despreciable frente a lo que precipitó y no cambia el Cl⁻ que sobra ✔. Queda el '+m(R`\frac{3{,}6\times10^{-8}}{0{,}010}\cdot100=0{,}00036\,\%`)+' → <b>precipitación completa</b> (≪ 10⁻⁵ M).</p>')),
 '[Ag⁺] = 3,6·10⁻⁸ M · precipitación completa')}
${calc('qacQ','¿Precipita al mezclar?',field('cm','[catión] solución 1 (M)',0.01)+field('vm','V solución 1 (mL)',50)+field('ca','[anión] solución 2 (M)',0.01)+field('va','V solución 2 (mL)',50)+field('m','m (cationes por fórmula)',1)+field('n','n (aniones por fórmula)',2)+field('kps','Kps',7.1e-9),'Cargado con el PbI₂. Ya incluye la dilución al mezclar.')}
`);

  // =====================================================================
  add('fraccionada','Precipitación fraccionada','PRECIPITACIÓN · 06',`
<p>Si en una solución hay <b>dos iones</b> que precipitan con el mismo reactivo, y lo agregamos de a poco, precipita primero el que <b>necesita menos reactivo</b> para llegar a su Kps. Si los Kps son bien distintos, podemos <b>separar</b> los iones.</p>
${flow([
 ['Calcular cuánto reactivo necesita cada ion para EMPEZAR a precipitar','Con Q = Kps y la concentración inicial de cada ion.'],
 ['El que necesita menos, precipita primero',''],
 ['Calcular cuánto queda del primero cuando empieza el segundo','Con la concentración de reactivo del paso 1 para el segundo ion y el Kps del primero.'],
 ['Decidir si la separación es efectiva','Si en ese momento queda ≤ 0,1 % (o ≤ 10⁻⁵ M) del primero, la separación es buena.']
])}
${example('Cloruro y cromato con Ag⁺ (método de Mohr)','<p>Una solución es 0,10 M en Cl⁻ y 0,010 M en CrO₄²⁻. Se agrega AgNO₃ gota a gota (sin cambio de volumen). a) ¿Qué precipita primero? b) ¿Cuánto Cl⁻ queda cuando empieza a precipitar el Ag₂CrO₄?</p>',
 step('1. Ag⁺ necesaria para cada uno',chain([R`\mathrm{AgCl}:\ [\mathrm{Ag^+}]=\frac{1{,}8\times10^{-10}}{0{,}10}=1{,}8\times10^{-9}\ \mathrm{M}`,''],[R`\mathrm{Ag_2CrO_4}:\ [\mathrm{Ag^+}]=\sqrt{\frac{1{,}1\times10^{-12}}{0{,}010}}=1{,}05\times10^{-5}\ \mathrm{M}`,'raíz: la Ag⁺ va al cuadrado']))+
 step('2. Primero el AgCl',`<p>Necesita 1,8·10⁻⁹ M, miles de veces menos plata: precipita primero el AgCl (blanco).</p>`)+
 step('3. Cuando empieza el cromato',chain(R`[\mathrm{Ag^+}]=1{,}05\times10^{-5}\ \mathrm{M}`,R`[\mathrm{Cl^-}]_{\text{queda}}=\frac{1{,}8\times10^{-10}}{1{,}05\times10^{-5}}=1{,}7\times10^{-5}\ \mathrm{M}`,R`\%\ \text{que queda}=\frac{1{,}7\times10^{-5}}{0{,}10}\cdot100=0{,}017\,\%`))+
 step('4. Conclusión',`<p>Cuando aparece el color rojo ladrillo del Ag₂CrO₄ ya precipitó el 99,98 % del cloruro: la separación (y la titulación) funciona.</p>${vira('AgCl blanco','#f4f4f4','Ag₂CrO₄ rojo ladrillo','#b5462d')}`),
 'Primero AgCl · cuando empieza el Ag₂CrO₄ queda 0,017 % del Cl⁻')}
${example('Yoduro y cloruro','<p>Solución 0,010 M en I⁻ y 0,010 M en Cl⁻, se agrega Ag⁺. ¿Se pueden separar?</p>',
 step('Ag⁺ para empezar',chain(R`\mathrm{AgI}:\ \frac{8{,}3\times10^{-17}}{0{,}010}=8{,}3\times10^{-15}\ \mathrm{M}\qquad\mathrm{AgCl}:\ \frac{1{,}8\times10^{-10}}{0{,}010}=1{,}8\times10^{-8}\ \mathrm{M}`))+
 step('I⁻ que queda cuando empieza el AgCl',chain(R`[\mathrm{I^-}]=\frac{8{,}3\times10^{-17}}{1{,}8\times10^{-8}}=4{,}6\times10^{-9}\ \mathrm{M}\ \ (0{,}00005\,\%)`)),
 'Separación excelente: precipita todo el AgI antes de que empiece el AgCl')}
`);

  // =====================================================================
  add('agentes','Agentes precipitantes y la marcha de cationes','PRECIPITACIÓN · 07',`
<p>Un <b>agente precipitante</b> es el reactivo que se agrega para precipitar selectivamente un grupo de iones. En la marcha sistemática de cationes, cada reactivo separa un “grupo”, aprovechando todo lo de esta unidad (Kps, ion común, pH) y de la siguiente (complejos).</p>
${table(['Grupo','Agente precipitante','Qué precipita','Por qué funciona'],[
 ['I','HCl diluido','AgCl, PbCl₂, Hg₂Cl₂ (blancos)','son los únicos cloruros insolubles; el PbCl₂ precipita incompleto (Kps 1,7·10⁻⁵, se separa en caliente)'],
 ['II','H₂S en medio ácido (HCl ≈ 0,3 M)','CuS, Bi₂S₃, CdS, HgS, PbS, SnS₂, As₂S₃, Sb₂S₃','en medio ácido [S²⁻] es mínima: sólo precipitan los sulfuros de Kps muy chico'],
 ['III','NH₃ + NH₄Cl, luego (NH₄)₂S','Fe(OH)₃, Al(OH)₃, Cr(OH)₃ · NiS, CoS, MnS, ZnS','el buffer amoniacal fija el pH (≈ 9) y ahora [S²⁻] es alta: precipitan los sulfuros más solubles; el NH₄Cl impide que precipite el Mg(OH)₂'],
 ['IV','(NH₄)₂CO₃ en medio amoniacal','CaCO₃, SrCO₃, BaCO₃','carbonatos insolubles de los alcalinotérreos'],
 ['V','(sin reactivo de grupo)','Mg²⁺, Na⁺, K⁺, NH₄⁺','quedan en solución; se reconocen con ensayos específicos']
],'compareTable')}
${note('Los esquemas cambian según la escuela y el libro','<p>Algunos cursos dividen el grupo III en IIIA (hidróxidos) y IIIB (sulfuros), o usan esquemas sin H₂S (con tioacetamida, que lo genera en el tubo). Lo importante es entender <b>por qué</b> cada reactivo separa lo que separa: eso es lo que se pregunta.</p>')}
${idea('Cómo se elige un agente precipitante','<ul><li>Que forme con el ion buscado un compuesto de <b>Kps muy chico</b> (precipitación completa).</li><li>Que con los demás iones presentes <b>no supere</b> el Kps (selectividad), controlando su concentración, a menudo con el pH.</li><li>Que el precipitado sea fácil de separar (filtrar o centrifugar) y de redisolver para seguir analizando.</li><li>Que su exceso no redisuelva el precipitado formando complejos.</li></ul>')}
`);

  // =====================================================================
  add('ph','Relación de la precipitación con el pH','PRECIPITACIÓN · 08',`
<p>El pH controla la precipitación de dos maneras:</p>
${flow([
 ['Cuando el anión es OH⁻ (hidróxidos)','[OH⁻] la fija directamente el pH: para cada catión hay un pH de inicio y un pH de precipitación completa.'],
 ['Cuando el anión es base conjugada de un ácido débil (S²⁻, CO₃²⁻, F⁻, CrO₄²⁻, PO₄³⁻)','En medio ácido el anión se protona (S²⁻ → HS⁻ → H₂S): baja su concentración libre y el sólido se disuelve o no llega a precipitar.']
])}
<h3>Hidróxidos: ¿a qué pH precipitan?</h3>
${example('Separar Fe³⁺ de Mg²⁺ ajustando el pH','<p>Una solución es 0,010 M en Fe³⁺ y 0,010 M en Mg²⁺. Kps Fe(OH)₃ = 4·10⁻³⁸ · Kps Mg(OH)₂ = 1,8·10⁻¹¹. Calcular el pH de inicio y de precipitación completa (10⁻⁵ M) de cada uno.</p>',
 step('Fe(OH)₃: empieza',chain(R`[\mathrm{OH^-}]=\sqrt[3]{\frac{4\times10^{-38}}{0{,}010}}=1{,}6\times10^{-12}\ \Rightarrow\ \mathrm{pH}=2{,}2`))+
 step('Fe(OH)₃: completa',chain(R`[\mathrm{OH^-}]=\sqrt[3]{\frac{4\times10^{-38}}{10^{-5}}}=1{,}6\times10^{-11}\ \Rightarrow\ \mathrm{pH}=3{,}2`))+
 step('Mg(OH)₂: empieza',chain(R`[\mathrm{OH^-}]=\sqrt{\frac{1{,}8\times10^{-11}}{0{,}010}}=4{,}2\times10^{-5}\ \Rightarrow\ \mathrm{pH}=9{,}6`))+
 step('Mg(OH)₂: completa',chain(R`[\mathrm{OH^-}]=\sqrt{\frac{1{,}8\times10^{-11}}{10^{-5}}}=1{,}3\times10^{-3}\ \Rightarrow\ \mathrm{pH}=11{,}1`))+
 step('Ventana de separación',`<p>Entre pH 3,2 y 9,6 el hierro está todo precipitado y el magnesio todavía no empezó. Cualquier pH en ese rango los separa.</p>`),
 'Fe³⁺: pH 2,2 → 3,2 · Mg²⁺: pH 9,6 → 11,1 · separar entre 3,2 y 9,6')}
${example('El papel del NH₄Cl en el grupo III','<p>A la solución anterior se le agrega a) NH₃ 0,10 M solo; b) NH₃ 0,10 M + NH₄Cl 1,0 M. ¿Precipita Mg(OH)₂ en cada caso? (Kb = 1,8·10⁻⁵)</p>',
 step('a) Sólo amoníaco',chain(R`[\mathrm{OH^-}]=\sqrt{1{,}8\times10^{-5}\cdot0{,}10}=1{,}3\times10^{-3}\ \mathrm{M}`,[R`Q_{\mathrm{Mg}}=0{,}010\cdot(1{,}3\times10^{-3})^2=1{,}8\times10^{-8}>K_{ps}`,'precipita: ¡se pierde el Mg en el grupo III!']))+
 step('b) Buffer amoniacal (ion común NH₄⁺)',chain(R`[\mathrm{OH^-}]=K_b\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=1{,}8\times10^{-5}\cdot\frac{0{,}10}{1{,}0}=1{,}8\times10^{-6}\ \mathrm{M}\ (\mathrm{pH}\ 8{,}3)`,[R`Q_{\mathrm{Mg}}=0{,}010\cdot(1{,}8\times10^{-6})^2=3{,}2\times10^{-14}<K_{ps}`,'no precipita ✔'],[R`Q_{\mathrm{Fe}}=0{,}010\cdot(1{,}8\times10^{-6})^3=5{,}8\times10^{-20}\gg K_{ps}`,'el Fe(OH)₃ sí'])),
 'El NH₄Cl reprime la ionización del NH₃ (ion común), baja [OH⁻] y evita que el Mg²⁺ precipite')}
<h3>Sulfuros: [S²⁻] se regula con [H⁺]</h3>
<p>Del capítulo de polipróticos, con H₂S saturado (0,10 M):</p>
${key(R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}\,[\mathrm{H_2S}]}{[\mathrm{H^+}]^2}=\frac{1{,}3\times10^{-21}}{[\mathrm{H^+}]^2}`,'Sulfuro libre según el pH')}
${example('Separar Cu²⁺ de Fe²⁺ con H₂S en HCl 0,30 M','<p>Solución 0,010 M en Cu²⁺ y 0,010 M en Fe²⁺, saturada con H₂S, en HCl 0,30 M. Kps CuS = 6,3·10⁻³⁶ · Kps FeS = 6,3·10⁻¹⁸.</p>',
 step('1. [S²⁻] en ese medio',sup([['[H⁺] = 0,30 M','la fija el HCl; el H₂S (ácido muy débil y reprimido) no aporta nada apreciable.']])+chain(R`[\mathrm{S^{2-}}]=\frac{1{,}3\times10^{-21}}{(0{,}30)^2}=1{,}4\times10^{-20}\ \mathrm{M}`))+
 step('2. Q de cada sulfuro',chain([R`Q=0{,}010\cdot1{,}4\times10^{-20}=1{,}4\times10^{-22}`,'igual para los dos'],[R`\mathrm{CuS}:\ 1{,}4\times10^{-22}\gg6{,}3\times10^{-36}`,'precipita'],[R`\mathrm{FeS}:\ 1{,}4\times10^{-22}\ll6{,}3\times10^{-18}`,'no precipita']))+
 step('3. ¿Cuánto cobre queda?',chain(R`[\mathrm{Cu^{2+}}]=\frac{6{,}3\times10^{-36}}{1{,}4\times10^{-20}}=4{,}4\times10^{-16}\ \mathrm{M}`)+ver('<p>Precipitación completa del cobre ✔. Separación perfecta: es el grupo II frente al grupo III.</p>'))+
 step('4. ¿A qué pH empezaría el FeS?',chain(R`[\mathrm{S^{2-}}]=\frac{6{,}3\times10^{-18}}{0{,}010}=6{,}3\times10^{-16}\ \Rightarrow\ [\mathrm{H^+}]=\sqrt{\frac{1{,}3\times10^{-21}}{6{,}3\times10^{-16}}}=1{,}4\times10^{-3}\ (\mathrm{pH}\ 2{,}8)`)),
 'En HCl 0,30 M precipita sólo CuS; el FeS necesita un medio mucho menos ácido (grupo III)')}
${idea('Sales de ácidos débiles se disuelven en ácidos','<p>CaCO₃, FeS, ZnS, CaF₂ y los fosfatos se disuelven al acidificar: el H⁺ se lleva el anión (CO₃²⁻ → HCO₃⁻ → H₂CO₃ → CO₂↑), Q baja por debajo del Kps y se disuelve más sólido (Le Châtelier). En cambio el AgCl o el BaSO₄ no se disuelven en ácidos: sus aniones son conjugados de ácidos fuertes y no se protonan. El cálculo con números está en la Unidad 5.</p>')}
${rxs(['CaCO3(s) + 2 H^+ -> Ca^2+ + CO2(g)↑ + H2O','se disuelve con efervescencia'],['FeS(s) + 2 H^+ -> Fe^2+ + H2S(g)↑','olor a huevo podrido'])}
`);

  // =====================================================================
  add('repaso','Repaso de precipitación','PRECIPITACIÓN · REPASO',`
${cards([
 ['Kps','¿Por qué el sólido no aparece en la expresión del Kps?','Porque su “concentración” (actividad) es constante: se incluye en la constante.'],
 ['Kps','Kps del Ag₂CrO₄ en función de s','Kps = (2s)²·s = 4s³.'],
 ['Kps','Kps de un AB₃ (Fe(OH)₃) en función de s','Kps = s·(3s)³ = 27s⁴.'],
 ['Q','Q &gt; Kps significa…','Solución sobresaturada: precipita hasta llegar a Q = Kps.'],
 ['Comparar','¿Se pueden comparar los Kps del AgCl y del Ag₂CrO₄?','No directamente: son de distinto tipo. Hay que calcular s (el cromato resulta más soluble).'],
 ['Ion común','¿Qué le pasa a la solubilidad del AgCl en NaCl?','Baja muchísimo (de 1,3·10⁻⁵ a 1,8·10⁻⁸ M en NaCl 0,01 M).'],
 ['Mezclas','Primer paso antes de calcular Q al mezclar dos soluciones','Recalcular las concentraciones en el volumen total.'],
 ['Fraccionada','¿Qué precipita primero?','El que necesita menos concentración de reactivo para alcanzar su Kps.'],
 ['Completa','Criterio de precipitación completa','Que quede ≤ 10⁻⁵ M (o ≤ 0,1 %) del ion en solución.'],
 ['Marcha','Agente precipitante del grupo I','HCl diluido: AgCl, PbCl₂ (incompleto) y Hg₂Cl₂.'],
 ['pH','¿Para qué se agrega NH₄Cl junto con NH₃?','Para bajar [OH⁻] por ion común y que no precipite Mg(OH)₂.'],
 ['pH','¿Por qué en HCl 0,3 M precipita CuS y no FeS?','Porque el H⁺ baja [S²⁻] a ≈ 10⁻²⁰ M: alcanza para el Kps tan chico del CuS pero no para el FeS.']
])}
`);

  window.ET27_QAC5.units.push({id:'u2',n:2,title:'Equilibrio heterogéneo o de precipitación',short:'Precipitación',lead:'Solubilidad, Kps y producto iónico, comparación de Kps, ion común, ¿precipita o no?, precipitación fraccionada, agentes precipitantes de la marcha de cationes y el control con el pH.',sections:s});
})();
