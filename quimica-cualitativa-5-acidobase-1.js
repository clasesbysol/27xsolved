// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 1 (1/2) · Equilibrio ácido-base
// Método de trabajo, teorías ácido-base, el agua, Kw y pH, Le Châtelier, ácidos y bases fuertes, soluciones muy diluidas.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const {sup,ver,flow,memo,pasajes,scale,opt,jus,desc,sys,lc}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-ab-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('metodo','Antes de arrancar: cómo se trabaja (y cómo corrige la profe)','ÁCIDO-BASE',`
<p>Cualitativa se aprueba <b>justificando</b>. Un resultado numérico sin la justificación de por qué se planteó así vale poco. Todas las unidades usan el mismo razonamiento, y si lo entendés acá en ácido-base, después precipitación, complejos y redox son variaciones.</p>
${punch('Describir el sistema → plantear K, BM y BC → justificar qué se desprecia y por qué → despejar y reemplazar en K → resolver → VERIFICAR el desprecio.')}
${flow([
 ['1. ¿Qué hay en el vaso?','Antes de cualquier cuenta: qué se puso, qué reacciona completo (fuertes, neutralizaciones) y qué queda en equilibrio.'],
 ['2. Planteo del sistema, siempre en este orden','(a) todas las reacciones: totales con → y sin K; reversibles con ⇌ y <b>su constante escrita abajo</b>; la autoprotólisis del agua siempre. (b) Balance de masa. (c) Balance de carga. Recién después se justifica.'],
 ['3. Justificar los desprecios','primero ver qué término me molesta y qué quiero sacar; después justificarlo con teoría (fuerza del electrolito, choques efectivos, Le Châtelier, ion común, especiación), siempre <b>respecto de</b> otra especie. <b>Nunca “porque sí”.</b>'],
 ['4. Despejar y reemplazar','del BM se despeja una especie (C − la otra), se mete en el BC, se cancela lo que se repite, y el resultado se reemplaza en K.'],
 ['5. Verificar','con el resultado, comprobar que lo despreciado es ≤ 5 % de la especie respecto de la cual se despreció. Si no, resolver sin despreciar.']
])}
<h3>El criterio para despreciar</h3>
${table(['Cuándo','Qué se mira','Criterio'],[
 ['<b>Antes</b> de calcular (para justificar el desprecio)','cociente entre la concentración inicial y la constante',m(R`\frac{C_{\text{inicial}}}{K}>100\ \Rightarrow`)+' se disocia poco: x se desprecia frente a C'],
 ['<b>Después</b> de calcular (verificación)','lo despreciado frente a aquello de lo que se restó o sumó',m(R`\frac{x}{C}\cdot100\le5\,\%`)+' ✔ (si no, cuadrática o planteo completo)']
])}
${punch('Criterio de la cátedra: para JUSTIFICAR el desprecio, C/K > 100. Para VERIFICARLO al final, lo despreciado ≤ 5 % de aquello frente a lo que se despreció.')}
${warn('El error que más puntos cuesta','<p>Usar una fórmula de memoria (por ejemplo '+m(R`[\mathrm{H^+}]=\sqrt{K_aC}`)+') <b>sin decir qué se supuso, por qué, ni verificarlo</b>. En todos los ejemplos de esta materia vas a ver las cajas <b>Suponemos</b> y <b>Verificamos</b>: así se escribe en el parcial.</p>')}
${deep('Balance de masa y balance de carga, con calma',`
<p><b>BM.</b> La materia no se crea ni se destruye: si disolvemos 0,1 mol/L de acético, todo ese acético está en alguna forma: ${m(R`C_a=[\mathrm{HAc}]+[\mathrm{Ac^-}]`)}.</p>
<p><b>BC.</b> La solución no tiene carga neta: suma de cargas positivas = suma de negativas, cada ion multiplicado por su carga: ${m(R`[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`)}; con Na₂SO₄: ${m(R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`)}.</p>
<p>Con K, Kw, BM y BC hay tantas ecuaciones como incógnitas: el problema tiene solución exacta. Los desprecios sólo evitan ecuaciones de grado 3 o 4.</p>`)}
`);

  // =====================================================================
  add('justificar','Cómo se justifica: primero qué me molesta, después por qué lo puedo sacar','ÁCIDO-BASE',`
<p>Toda resolución de la materia tiene el mismo razonamiento. Antes de escribir una justificación hay que hacerse dos preguntas, <b>en este orden</b>:</p>
${flow([
 ['1. ¿Qué me molesta en la cuenta?','Miro la ecuación (casi siempre un balance) y veo qué término la complica: una incógnita de más, una suma que no me deja despejar, un grado alto.'],
 ['2. ¿Qué quiero sacar?','Ese término es el que voy a intentar despreciar, y siempre <b>respecto de otro término</b> de la misma suma o resta.'],
 ['3. ¿Qué pasa en la realidad que me permite sacarlo?','Recién ahora busco el concepto teórico: es un electrolito débil, hay ion común, el medio es ácido, la concentración es alta (choques efectivos), el pH está lejos del pKa…'],
 ['4. Al final, verifico','con los números ya calculados, que lo que saqué era de verdad ≤ 5 % de aquello respecto de lo cual lo saqué.']
])}
${A.reglas}
<h3>Las herramientas teóricas para justificar</h3>
${table(['Herramienta','Qué permite justificar','Frase modelo (corta)'],[
 ['<b>Fuerza del electrolito y valor de K</b>','si algo se disocia todo, poco o casi nada','“El HAc es un electrolito débil (Ka = 1,8·10⁻⁵): se disocia parcialmente.”'],
 ['<b>Concentración · choques efectivos</b>','por qué se disocia menos (en proporción) al concentrar y más al diluir','“Es razonable suponer [Ac⁻] baja respecto de C porque la concentración es alta: hay muchos choques efectivos que rearman HAc.”'],
 ['<b>Le Châtelier</b>','hacia dónde se corre un equilibrio al agregar, quitar, diluir o calentar','“El H₃O⁺ del HCl desplaza el equilibrio del acético hacia los reactivos (ion común).”'],
 ['<b>Diagrama de especiación</b>','qué especie predomina a un pH y cuáles son despreciables','“A pH 7,4, [CO₃²⁻] es despreciable respecto de [HCO₃⁻] (α ≈ 10⁻³), pero no nula.”'],
 ['<b>BM, BC y despeje en K</b>','el cálculo y qué término de un balance se puede tachar','“En el BC es razonable suponer [HO⁻] baja respecto de [Ac⁻] porque el medio es ácido.”']
],'compareTable')}
<h3>Teoría de los choques efectivos y el grado de disociación</h3>
<p>Para que dos partículas reaccionen tienen que <b>chocar</b> con la orientación y la energía adecuadas: eso es un <b>choque efectivo</b>. En un ácido débil HA hay dos reacciones a la vez: la disociación (HA(ac) + H₂O(l) → A⁻(ac) + H₃O⁺(ac)) y la inversa (A⁻(ac) + H₃O⁺(ac) → HA(ac) + H₂O(l)). La inversa necesita que un A⁻ y un H₃O⁺ se encuentren, y eso depende de cuántas partículas hay por litro.</p>
<p>Para comparar usamos el <b>grado de disociación α</b> (la fracción del ácido que está disociada: α = [A⁻]/C; si α = 0,01, de cada 100 moléculas que pusimos, 1 está disociada).</p>
${figure(A.draw.choques,'Más concentrado: más encuentros entre iones, más recombinación, menor fracción disociada.')}
${flow([
 ['Solución concentrada','hay muchas partículas por litro, así que los A⁻ y H₃O⁺ chocan seguido y vuelven a formar HA. Se disocia una fracción <b>chica</b> (α bajo). Ojo: igual hay <b>más</b> H₃O⁺ en total que en la diluida, porque hay mucho más ácido (el pH es menor).'],
 ['Solución diluida','las partículas están lejos, hay pocos choques efectivos y casi no se rearma HA. Se disocia una fracción <b>grande</b> (α alto), aunque la [H₃O⁺] total es menor (pH mayor) porque hay poco ácido.'],
 ['Le Châtelier dice lo mismo','al diluir, el equilibrio se desplaza hacia el lado con más partículas disueltas (los iones).']
])}
${table(['','HAc 1,0 M','HAc 0,001 M'],[['[H₃O⁺]','4,2·10⁻³ M (más)','1,25·10⁻⁴ M (menos)'],['pH','2,37','3,90'],['α (fracción disociada)','0,42 %','12,5 %']])}
<h3>Cómo se escribe un desprecio bien justificado</h3>
${example('Modelo de redacción','<p>HAc 0,10 M (Ka = 1,8·10⁻⁵): justificar los desprecios.</p>',
 step('Lo que molesta',`<p>En el BC, ${m(R`[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`)}, me sobra [HO⁻]. En el BM, ${m(R`C=[\mathrm{HAc}]+[\mathrm{Ac^-}]`)}, me molesta [Ac⁻] para despejar [HAc].</p>`)+
 step('Desprecio 1',jus('<p>Es razonable suponer que [HO⁻] es baja <b>respecto de</b> [Ac⁻] porque el medio es ácido: el H₃O⁺ del acético desplaza la autoprotólisis del agua hacia los reactivos (Le Châtelier).</p>'))+
 step('Desprecio 2',jus('<p>Es razonable suponer que [Ac⁻] es baja <b>respecto de</b> C porque el HAc es un electrolito débil (Ka ≪ 1) en concentración alta (C/Ka = 5560 &gt; 100): hay muchos choques efectivos que rearman HAc.</p>'))+
 step('Verificación (siempre al final)',ver('<p>[Ac⁻] = 1,34·10⁻³ M es el 1,3 % de C ✔ · [HO⁻] = 7,5·10⁻¹² M es despreciable respecto de [Ac⁻] ✔</p>')),
 'Qué molesta + concepto + criterio numérico + verificación')}
${idea('Conciso, no largo','<p>La justificación ideal es <b>una o dos oraciones</b> que nombren el concepto (débil, ion común, choques, especiación, Le Châtelier) y el dato que lo respalda (K, C/K, pH respecto del pKa). Un párrafo largo sin concepto vale menos que una línea precisa.</p>')}
`);

  // =====================================================================
  add('teorias','Las tres teorías ácido-base','ÁCIDO-BASE · 01',`
<p>“Ácido” y “base” no son una sola definición: hay tres teorías, cada una más amplia que la anterior. No se contradicen; <b>cada una incluye a la anterior</b> y explica casos que la otra no podía.</p>
<h3>1 · Arrhenius (1884): todo pasa en agua</h3>
${table(['','Definición','Reacción típica'],[
 ['Ácido','sustancia que <b>en agua</b> libera iones '+f('H^+'),rx('HCl(ac) -> H^+(ac) + Cl^-(ac)')],
 ['Base','sustancia que <b>en agua</b> libera iones '+f('OH^-'),rx('NaOH(ac) -> Na^+(ac) + OH^-(ac)')],
 ['Neutralización','H⁺ + OH⁻ forman agua',rx('H^+(ac) + OH^-(ac) -> H2O(l)')]
])}
${idea('¿Por qué hoy la teoría de Arrhenius no se considera válida (o suficiente)?','<p>Porque es demasiado restringida: sólo vale en agua, exige que el ácido o la base <b>contengan</b> H⁺ u OH⁻ (no explica el NH₃, el Na₂CO₃ básico ni el NH₄Cl ácido), no explica reacciones sin agua y supone un H⁺ libre que en solución no existe (está como H₃O⁺). Brønsted–Lowry la incluye y la amplía.</p>')}
${warn('Lo que Arrhenius no puede explicar','<ul><li>El <b>amoníaco</b> es básico, pero no tiene OH⁻ en su fórmula.</li><li>Sólo vale <b>en agua</b>: no sirve para reacciones en fase gaseosa o en otros solventes (por ejemplo NH₃(g) + HCl(g) → NH₄Cl(s)).</li><li>El H⁺ “desnudo” no existe en agua: siempre está unido a moléculas de agua.</li></ul>')}
<h3>2 · Brønsted–Lowry (1923): transferencia de protones</h3>
${key(R`\text{ácido}=\text{dador de }\mathrm{H^+}\qquad\text{base}=\text{aceptor de }\mathrm{H^+}`,'Brønsted–Lowry')}
<p>Una reacción ácido-base es <b>pasar un protón de una especie a otra</b>. Por eso siempre hay dos pares: el ácido, al perder su H⁺, se convierte en una base (su <b>base conjugada</b>), y la base, al ganarlo, se convierte en un ácido (su <b>ácido conjugado</b>).</p>
${rxs(['HCl + H2O -> Cl^- + H3O^+','ácido₁ + base₂ → base₁ + ácido₂'],['NH3 + H2O <=> NH4^+ + OH^-','base₁ + ácido₂ ⇌ ácido₁ + base₂'],['HAc + H2O <=> Ac^- + H3O^+','el acético cede su H⁺ al agua'],['CO3^2- + H2O <=> HCO3^- + OH^-','el carbonato es una base: acepta un H⁺'])}
${table(['Ácido','cede un H⁺','Base conjugada'],[[f('HCl'),'− H⁺',f('Cl^-')],[f('H3O^+'),'− H⁺',f('H2O')],[f('H2O'),'− H⁺',f('OH^-')],[f('NH4^+'),'− H⁺',f('NH3')],[f('HCO3^-'),'− H⁺',f('CO3^2-')],[f('H2CO3'),'− H⁺',f('HCO3^-')]])}
${idea('Cómo armar un par conjugado sin equivocarte','<p>El ácido y su base conjugada difieren <b>en exactamente un H⁺</b>: misma fórmula, un H menos y una carga negativa más. '+f('H2PO4^-')+' → su base conjugada es '+f('HPO4^2-')+' (no '+f('PO4^3-')+') y su ácido conjugado es '+f('H3PO4')+'.</p>')}
${note('H⁺ y H₃O⁺ son lo mismo','<p>En agua el protón está siempre hidratado: lo escribimos '+f('H3O^+')+' (ion hidronio) cuando queremos mostrar que el agua lo aceptó, y '+f('H^+')+' para abreviar en las cuentas. En toda la materia '+m(R`[\mathrm{H^+}]=[\mathrm{H_3O^+}]`)+'.</p>')}
<h3>3 · Lewis (1923): pares de electrones</h3>
${key(R`\text{ácido}=\text{aceptor de un par de e}^-\qquad\text{base}=\text{dador de un par de e}^-`,'Lewis')}
<p>Lewis mira lo que pasa con los electrones: la base tiene un <b>par libre</b> y lo “presta” para formar un enlace (coordinado o dativo) con el ácido, que tiene un <b>orbital vacío</b>. Así entran como ácidos especies que no tienen ningún H:</p>
${rxs(['BF3(g) + NH3(g) -> F3B–NH3(s)','el B tiene un orbital vacío; el N, un par libre'],['Ag^+ + 2 NH3 -> [Ag(NH3)2]^+','¡un complejo es una reacción ácido-base de Lewis! (Unidad 3)'],['Fe^3+ + 6 H2O -> [Fe(H2O)6]^3+','los cationes metálicos son ácidos de Lewis'],['H^+ + OH^- -> H2O','el H⁺ acepta un par del OH⁻'])}
<h3>Comparación y casos resueltos</h3>
${table(['Especie','Arrhenius','Brønsted–Lowry','Lewis'],[
 [f('HCl'),'ácido (libera H⁺ en agua)','ácido (cede H⁺)','ácido (su H⁺ acepta un par)'],
 [f('NaOH'),'base (libera OH⁻)','el OH⁻ es la base (acepta H⁺)','el OH⁻ es base (da un par)'],
 [f('NH3'),'<b>no la explica</b>','base (acepta H⁺(ac) → NH₄⁺(ac))','base (par libre del N)'],
 [f('H2O'),'—','<b>ácido o base</b> según con quién reaccione','ácido o base'],
 [f('BF3'),'—','— (no tiene H)','<b>ácido</b> (orbital vacío)'],
 [f('Ag^+')+', '+f('Cu^2+')+', '+f('Fe^3+'),'—','—','<b>ácidos</b> (forman complejos)']
],'compareTable')}
${example('Escribir la reacción de cada sustancia según cada teoría','<p>Escribí el comportamiento de: a) HNO₃ · b) KOH · c) NH₃ · d) HCO₃⁻ · e) AlCl₃ (catión Al³⁺)</p>',
 step('a) HNO₃: ácido en las tres teorías',rxs(['HNO3(ac) -> H^+(ac) + NO3^-(ac)','Arrhenius'],['HNO3 + H2O -> NO3^- + H3O^+','Brønsted: par HNO₃/NO₃⁻ y H₃O⁺/H₂O']))+
 step('b) KOH: base',rxs(['KOH(ac) -> K^+(ac) + OH^-(ac)','Arrhenius: libera OH⁻'],['OH^- + H3O^+ -> 2 H2O','Brønsted: el OH⁻ acepta el H⁺; el K⁺ es espectador']))+
 step('c) NH₃: base de Brønsted y de Lewis',rxs(['NH3 + H2O <=> NH4^+ + OH^-','Brønsted: acepta H⁺ del agua'],['NH3 + H^+ -> NH4^+','Lewis: el par libre del N forma el enlace con el H⁺'])+'<p>Para Arrhenius no tiene sentido: el NH₃ no contiene OH⁻. Los OH⁻ los aporta el agua.</p>')+
 step('d) HCO₃⁻: anfiprótico',rxs(['HCO3^- + H2O <=> CO3^2- + H3O^+','como ácido'],['HCO3^- + H2O <=> H2CO3 + OH^-','como base']))+
 step('e) Al³⁺: ácido de Lewis… y de Brønsted cuando está hidratado',rxs(['Al^3+ + 6 H2O -> [Al(H2O)6]^3+','Lewis: acepta pares del agua'],['[Al(H2O)6]^3+ + H2O <=> [Al(OH)(H2O)5]^2+ + H3O^+','el complejo hidratado cede un H⁺: por eso las sales de Al³⁺ son ácidas']))+A.jus('<p>Cada teoría mira una cosa distinta: Arrhenius, qué libera la sustancia en agua; Brønsted–Lowry, quién cede y quién acepta el H⁺ (siempre en pares conjugados); Lewis, quién da y quién acepta el par de electrones. Por eso el NH₃ y el Al³⁺ sólo se explican con las dos últimas.</p>'),
 'Cada teoría amplía a la anterior: Arrhenius ⊂ Brønsted–Lowry ⊂ Lewis.')}
`);

  // =====================================================================
  add('agua','El agua: anfiprótica, anfolito y electrolito débil','ÁCIDO-BASE · 02',`
<p>El agua es la protagonista silenciosa de toda la unidad: es el solvente, participa en las reacciones y además tiene su propio equilibrio ácido-base.</p>
<h3>Anfiprótico y anfolito</h3>
${table(['Término','Qué significa','Ejemplos'],[
 ['<b>Anfiprótico</b>','puede <b>ceder o aceptar un H⁺</b> (Brønsted). Necesita tener un H para dar y un par libre para recibir.',f('H2O')+', '+f('HCO3^-')+', '+f('HS^-')+', '+f('H2PO4^-')+', '+f('HPO4^2-')],
 ['<b>Anfolito</b> (o anfótero)','puede comportarse como <b>ácido o como base</b> según el medio. Es el término general: incluye a los anfipróticos y también a sustancias que no ceden H⁺, como los hidróxidos anfóteros.',f('H2O')+', '+f('HCO3^-')+', '+f('Al(OH)3')+', '+f('Zn(OH)2')]
])}
${idea('Todo anfiprótico es anfolito, pero no al revés','<p>El '+f('Al(OH)3')+' es anfolito: se disuelve en ácidos ('+f('Al^3+')+') y en bases ('+f('[Al(OH)4]^-')+'), pero en medio básico no actúa “cediendo un H⁺” sino aceptando un OH⁻ (comportamiento de Lewis). No es anfiprótico en sentido estricto.</p>')}
${rxs(['H2O + NH3 <=> OH^- + NH4^+','frente a una base, el agua actúa como ácido'],['H2O + HAc <=> H3O^+ + Ac^-','frente a un ácido, actúa como base'])}
<h3>El esquema de los anfolitos: la escalera del fosfórico</h3>
<p>Para no perderse con las constantes de un poliprótico, se escribe la cadena “esquelética”, sin los H₂O ni los H₃O⁺, sólo las especies. Arriba, la constante de cada paso hacia la derecha (pierde un H⁺: <b>Ka</b>); abajo, la de cada paso hacia la izquierda (gana un H⁺: <b>Kb</b>):</p>
${figure(A.ladder(['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻'],'del ácido fosfórico'),'Las especies del medio (H₂PO₄⁻ y HPO₄²⁻) tienen una flecha hacia cada lado: son anfipróticas (anfolitos).')}
${table(['Paso','Constante','Relación'],[['H₃PO₄(ac) ⇌ H₂PO₄⁻(ac)','Ka₁ = 7,5·10⁻³',''],['H₂PO₄⁻(ac) ⇌ HPO₄²⁻(ac)','Ka₂ = 6,2·10⁻⁸',''],['HPO₄²⁻(ac) ⇌ PO₄³⁻(ac)','Ka₃ = 4,2·10⁻¹³',''],['PO₄³⁻(ac) ⇌ HPO₄²⁻(ac)','Kb₁','= Kw/Ka₃ = 2,4·10⁻²'],['HPO₄²⁻(ac) ⇌ H₂PO₄⁻(ac)','Kb₂','= Kw/Ka₂ = 1,6·10⁻⁷'],['H₂PO₄⁻(ac) ⇌ H₃PO₄(ac)','Kb₃','= Kw/Ka₁ = 1,3·10⁻¹²']])}
${idea('Recurso para no equivocarse','<p>Cada par de flechas (arriba y abajo) es un par conjugado: <b>Ka·Kb = Kw</b> con las dos constantes del mismo tramo. Por eso <b>Kb₁ va con Ka₃</b> (el último tramo) y <b>Kb₃ con Ka₁</b>. Para saber si un anfolito es ácido o básico, se comparan las dos flechas que salen de él: el H₂PO₄⁻ tiene Ka₂ (6,2·10⁻⁸) &gt; Kb₃ (1,3·10⁻¹²) → es ácido; el HPO₄²⁻ tiene Kb₂ (1,6·10⁻⁷) &gt; Ka₃ (4,2·10⁻¹³) → es básico.</p>')}
<h3>Diagrama de especiación: dónde vive cada especie</h3>
<p>Un <b>diagrama de especiación</b> muestra qué fracción del total está en cada forma (α, de 0 a 1) según el pH. Con él se ve enseguida qué especie predomina y cuáles son despreciables a cada pH.</p>
${figure(A.spec([2.12,7.21,12.32],['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻']),'Especiación del ácido fosfórico. Cada curva domina entre dos pKa; las del medio son los anfolitos.')}
${flow([
 ['Construir','poner un punto en α = 0,5 en cada pKa (ahí se cruzan las dos especies del par). A <b>pKa ± 2</b> la especie que se va ya es ≈ 1 % (casi 0): con eso se dibuja la curva en S. Fuera de ese rango, se la toma como despreciable.'],
 ['Interpretar','por debajo de un pKa predomina la forma más protonada del par; por encima, la menos protonada. Entre pKa₁ y pKa₂ predomina el anfolito.'],
 ['Zona de regulación','<b>pKa ± 1</b>: ahí las dos especies del par están en cantidades comparables (entre 10:1 y 1:10). Es donde ese par puede funcionar como buffer.'],
 ['Nunca cero','fuera de su zona una especie es despreciable respecto de las otras, pero su α no es 0.']
])}
<p>Se ve en detalle (con cálculo de cada fracción) en la Parte 2, sección “Diagramas de especiación”.</p>
<h3>Autoionización del agua</h3>
<p>Como el agua es anfiprótica, puede reaccionar <b>consigo misma</b>: una molécula le cede un protón a otra.</p>
${rxs(['H2O(l) + H2O(l) <=> H3O^+(ac) + OH^-(ac)','autoionización (o autoprotólisis)'],['H2O(l) <=> H^+(ac) + OH^-(ac)','forma abreviada'])}
<p>Aplicando la ley de acción de masas, el agua líquida es el solvente y su concentración prácticamente no cambia (≈ 55,5 M), así que se incluye dentro de la constante:</p>
${key(R`K_w=[\mathrm{H^+}]\cdot[\mathrm{OH^-}]=1{,}0\times10^{-14}\quad(25\,^\circ\mathrm{C})`,'Producto iónico del agua')}
${chain([R`K=\frac{[\mathrm{H^+}][\mathrm{OH^-}]}{[\mathrm{H_2O}]}\ \Rightarrow\ K\cdot[\mathrm{H_2O}]=[\mathrm{H^+}][\mathrm{OH^-}]=K_w`,'la [H₂O] constante se “mete” en Kw'])}
<h3>¿Por qué el agua es un electrolito débil?</h3>
<p>En agua pura a 25 °C, ${m(R`[\mathrm{H^+}]=[\mathrm{OH^-}]=\sqrt{K_w}=1{,}0\times10^{-7}\ \mathrm{M}`)}. Comparemos con la cantidad de moléculas de agua:</p>
${chain([R`\frac{[\mathrm{H^+}]}{[\mathrm{H_2O}]}=\frac{1{,}0\times10^{-7}}{55{,}5}=1{,}8\times10^{-9}`,'≈ 2 moléculas ionizadas cada mil millones'])}
${punch('El agua pura casi no conduce la corriente: hay muy pocos iones. Es un electrolito débil.')}
${warn('Kw vale SIEMPRE, en cualquier solución acuosa','<p>No sólo en agua pura. Si agregás un ácido, sube '+m(R`[\mathrm{H^+}]`)+' y baja '+m(R`[\mathrm{OH^-}]`)+', pero el producto sigue siendo '+m(R`K_w`)+' (a temperatura constante). Por eso, en cualquier solución, conociendo uno se calcula el otro.</p>')}
`);

  // =====================================================================
  add('ph','pH, pOH, pKw y los pasajes entre ellos','ÁCIDO-BASE · 03',`
<p>Las concentraciones de H⁺ en solución van de ≈ 1 M a ≈ 10⁻¹⁴ M: números incómodos. Sörensen propuso usar el <b>logaritmo</b>, que transforma esas potencias en números entre 0 y 14.</p>
${key(R`\mathrm{pH}=-\log[\mathrm{H^+}]\qquad \mathrm{pOH}=-\log[\mathrm{OH^-}]\qquad \mathrm{p}K_w=-\log K_w`,'Definiciones')}
<p>Aplicando “menos logaritmo” a los dos lados de Kw:</p>
${chain([R`[\mathrm{H^+}][\mathrm{OH^-}]=K_w`],[R`-\log[\mathrm{H^+}]-\log[\mathrm{OH^-}]=-\log K_w`,'log de un producto = suma de logs'],[R`\mathrm{pH}+\mathrm{pOH}=\mathrm{p}K_w=14\quad(25\,^\circ\mathrm{C})`])}
<h3>El mapa de pasajes</h3>
<p>Con cualquiera de los cuatro datos se calculan los otros tres. Este esquema es el que hay que tener en la cabeza:</p>
${figure(pasajes,'Ida y vuelta: −log para pasar de concentración a “p”, y 10 elevado a menos el “p” para volver.')}
${scale}
${table(['Solución (25 °C)','[H⁺] vs [OH⁻]','pH'],[['Ácida','[H⁺] &gt; [OH⁻] · [H⁺] &gt; 10⁻⁷','&lt; 7'],['Neutra','[H⁺] = [OH⁻] = 10⁻⁷','= 7'],['Básica','[H⁺] &lt; [OH⁻] · [H⁺] &lt; 10⁻⁷','&gt; 7']])}
${idea('Trucos para no perderse con los logaritmos','<ul><li>Si [H⁺] = 10⁻ⁿ exacto → pH = n. Ej.: 10⁻³ M → pH 3.</li><li>Si [H⁺] = a·10⁻ⁿ con a entre 1 y 10 → el pH está entre n−1 y n. Ej.: 3,2·10⁻⁴ → pH entre 3 y 4 (da 3,49). <b>Usalo para controlar la calculadora.</b></li><li>Cada unidad de pH es un factor 10 en [H⁺]: pH 3 tiene <b>100 veces</b> más H⁺ que pH 5.</li><li>Cifras: el pH se informa con tantos decimales como cifras significativas tiene la concentración (3,2·10⁻⁴ → pH 3,49).</li></ul>')}
${example('Pasaje completo partiendo de [H⁺]','<p>Una solución tiene [H⁺] = 3,2·10⁻⁴ M. Calcular pH, pOH y [OH⁻] a 25 °C.</p>',
 step('1. pH',chain(R`\mathrm{pH}=-\log(3{,}2\times10^{-4})=3{,}49`,['3 < 3,49 < 4 ✓','control mental']))+
 step('2. pOH',chain(R`\mathrm{pOH}=14-3{,}49=10{,}51`))+
 step('3. [OH⁻] (dos caminos que tienen que coincidir)',chain([R`[\mathrm{OH^-}]=10^{-10{,}51}=3{,}1\times10^{-11}\ \mathrm{M}`,'desde pOH'],[R`[\mathrm{OH^-}]=\frac{K_w}{[\mathrm{H^+}]}=\frac{1{,}0\times10^{-14}}{3{,}2\times10^{-4}}=3{,}1\times10^{-11}\ \mathrm{M}`,'desde Kw ✓']))+A.jus('<p>pH y pOH son logaritmos (−log) de concentraciones, y Kw vincula [H₃O⁺] con [HO⁻] en cualquier solución acuosa a 25 °C: por eso, con un dato, se obtienen los otros tres. Es ácida porque [H₃O⁺] &gt; [HO⁻].</p>'),
 'pH 3,49 · pOH 10,51 · [OH⁻] = 3,1·10⁻¹¹ M · solución ácida')}
${example('Pasaje partiendo del pH','<p>Una solución tiene pH = 9,25. Calcular [H⁺], pOH y [OH⁻].</p>',
 step('1. [H⁺]',chain(R`[\mathrm{H^+}]=10^{-9{,}25}=5{,}6\times10^{-10}\ \mathrm{M}`,['entre 10⁻¹⁰ y 10⁻⁹ ✓','control']))+
 step('2. pOH y [OH⁻]',chain(R`\mathrm{pOH}=14-9{,}25=4{,}75`,R`[\mathrm{OH^-}]=10^{-4{,}75}=1{,}8\times10^{-5}\ \mathrm{M}`))+A.jus('<p>Para volver de pH a concentración se aplica la operación inversa del −log (10 elevado a −pH). Es básica porque pH &gt; 7 a 25 °C, es decir [HO⁻] &gt; [H₃O⁺].</p>'),
 '[H⁺] = 5,6·10⁻¹⁰ M · pOH 4,75 · [OH⁻] = 1,8·10⁻⁵ M · básica')}
${warn('Errores típicos en los pasajes','<ul><li>Olvidar el signo menos: '+m(R`\log(10^{-3})=-3`)+', entonces pH = −(−3) = 3.</li><li>Calcular 10^−pH como “10 × −pH”. Es una potencia: en la calculadora, tecla 10ˣ con el exponente negativo.</li><li>Usar pH + pOH = 14 a otra temperatura. La relación general es <b>pH + pOH = pKw</b>, y pKw cambia con T (siguiente sección).</li></ul>')}
${calc('qacPh','Convertidor pH ⇄ [H⁺] ⇄ pOH ⇄ [OH⁻]',opt('t',[['pH','pH'],['pOH','pOH'],['H','[H⁺] (M)'],['OH','[OH⁻] (M)']],'Tengo el dato de…')+field('v','valor',3.2e-4)+field('pkw','pKw (14 a 25 °C)',14),'Probá con 3,2·10⁻⁴ escrito como 3.2e-4. Cambiá pKw para trabajar a otra temperatura.')}
`);

  // =====================================================================
  add('lechatelier','Equilibrio químico y principio de Le Châtelier','ÁCIDO-BASE',`
<h3>Qué es un equilibrio químico</h3>
<p>Una reacción reversible ocurre en los dos sentidos a la vez. Al principio va más rápido la directa; a medida que se forman productos, la inversa se acelera. Llega un momento en que <b>las dos velocidades son iguales</b>: las concentraciones dejan de cambiar, aunque las reacciones siguen ocurriendo. Eso es el <b>equilibrio</b>: es dinámico, no “se detiene”.</p>
${flow([['Q (cociente de reacción)','tiene la misma expresión que K, pero con las concentraciones de <b>este momento</b>.'],['Q = K','el sistema está en equilibrio.'],['Q &lt; K','hay “pocos productos”: la reacción avanza hacia los productos (→) hasta que Q = K.'],['Q &gt; K','hay “demasiados productos”: avanza hacia los reactivos (←).']])}
${key(R`\text{Si se perturba un sistema en equilibrio, se desplaza en el sentido que contrarresta la perturbación, hasta alcanzar un nuevo equilibrio.}`,'Principio de Le Châtelier')}
<p>Le Châtelier es la forma de <b>predecir sin hacer cuentas</b> lo que hace la Q: si agrego un reactivo, Q baja (Q &lt; K) y la reacción va hacia productos; si agrego un producto, Q sube (Q &gt; K) y va hacia reactivos.</p>
${table(['Perturbación','Qué “quiere” el sistema','Sentido','¿Cambia K?'],[
 ['Agrego un reactivo','consumirlo','→','no'],
 ['Agrego un producto (ion común)','consumirlo','←','no'],
 ['Saco un producto (lo consume otra reacción, precipita, se va como gas)','reponerlo','→','no'],
 ['Diluyo (agrego agua)','aumentar el número de partículas disueltas','hacia el lado con más partículas (en una disociación: →)','no'],
 ['Caliento una reacción endotérmica','absorber el calor','→','<b>sí</b>, K aumenta'],
 ['Caliento una reacción exotérmica','absorber el calor','←','<b>sí</b>, K disminuye'],
 ['Agrego un catalizador','—','no se desplaza (sólo se llega antes)','no']
],'compareTable')}
${punch('K sólo cambia con la temperatura. Al agregar o quitar especies cambian las concentraciones, pero el sistema vuelve a un equilibrio con la MISMA K.')}
<h3>Cómo se escribe en el parcial</h3>
<p>Siempre con el mismo esqueleto: el sistema de reacciones con sus constantes, la perturbación, hacia dónde se desplaza y qué concentraciones suben (↑) y bajan (↓).</p>
${example('Ejemplo 1 · Agrego NH₄Cl a una solución de amoníaco','<p>Explicar qué pasa con el pH.</p>',
 step('Sistema',sys({rx:[['NH4Cl -> NH4^+ + Cl^-','','sal: electrolito fuerte, total'],['NH3 + H2O <=> NH4^+ + HO^-',R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}`],['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`]]}))+
 step('Le Châtelier',lc('NH3 + H2O <=> NH4^+ + HO^-','se agrega NH₄⁺ (producto: ion común)','←',[['[NH₄⁺]','↑'],['[NH₃]','↑'],['[HO⁻]','↓'],['[H₃O⁺]','↑']],'El sistema consume parte del NH₄⁺ agregado: el equilibrio se desplaza hacia los reactivos, baja [HO⁻] y, por Kw, sube [H₃O⁺]. <b>El pH baja.</b>')),
 'Desplazamiento hacia reactivos: [HO⁻] ↓ y el pH baja (efecto ion común)')}
${example('Ejemplo 2 · Agrego NaOH a una solución de ácido acético','<p>Explicar qué pasa con la disociación del ácido.</p>',
 step('Sistema',sys({rx:[['NaOH -> Na^+ + HO^-','','base fuerte, total'],['HAc + H2O <=> Ac^- + H3O^+',R`K_a=\frac{[\mathrm{Ac^-}][\mathrm{H_3O^+}]}{[\mathrm{HAc}]}`],['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`]]}))+
 step('Le Châtelier (dos equilibrios encadenados)',lc('H2O + H2O <=> H3O^+ + HO^-','se agrega HO⁻ (producto del agua)','←',[['[HO⁻]','↑'],['[H₃O⁺]','↓']],'El HO⁻ agregado consume H₃O⁺ (formando agua).')+lc('HAc + H2O <=> Ac^- + H3O^+','se consume H₃O⁺ (producto del acético)','→',[['[H₃O⁺]','↓'],['[HAc]','↓'],['[Ac⁻]','↑']],'El acético repone el H₃O⁺ consumido: <b>se disocia más</b>. Así funciona una neutralización de un ácido débil.')),
 'El acético se disocia más ([Ac⁻] ↑, [HAc] ↓) y el pH sube')}
${example('Ejemplo 3 · Agrego HCl a una solución de H₂S','<p>Explicar qué pasa con la concentración de sulfuro.</p>',
 step('Sistema',sys({rx:[['HCl + H2O -> H3O^+ + Cl^-','','ácido fuerte, total'],['H2S + H2O <=> HS^- + H3O^+',R`K_{a1}=\frac{[\mathrm{HS^-}][\mathrm{H_3O^+}]}{[\mathrm{H_2S}]}`],['HS^- + H2O <=> S^2- + H3O^+',R`K_{a2}=\frac{[\mathrm{S^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HS^-}]}`],['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`]]}))+
 step('Le Châtelier',lc('H2S + H2O <=> HS^- + H3O^+','se agrega H₃O⁺ (producto: ion común)','←',[['[H₃O⁺]','↑'],['[HS⁻]','↓'],['[H₂S]','↑']])+lc('HS^- + H2O <=> S^2- + H3O^+','sube [H₃O⁺] y además baja [HS⁻] (su reactivo)','←',[['[S²⁻]','↓'],['[HS⁻]','↑ (repone algo)']],'Los dos equilibrios se desplazan hacia los reactivos: <b>[S²⁻] baja muchísimo</b>. Es como se controla el sulfuro en la marcha analítica (más ácido → menos S²⁻ → precipitan sólo los sulfuros más insolubles).')),
 '[S²⁻] ↓: el HCl reprime las dos disociaciones del H₂S')}
${idea('El sistema siempre alcanza un nuevo equilibrio','<p>Cada agregado saca al sistema del equilibrio por un instante. Después se desplaza (Le Châtelier) hasta que Q vuelve a ser igual a K. <b>Siempre</b> se alcanza el equilibrio: en solución acuosa, como mínimo, está el del agua.</p>')}
`);

  // =====================================================================
  add('temperatura','El pH neutro cambia con la temperatura','ÁCIDO-BASE',`
<p>Aplicación directa de Le Châtelier sobre el agua. La autoprotólisis del agua es <b>endotérmica</b> (romper un enlace O–H cuesta energía):</p>
${lc('H2O + H2O <=> H3O^+ + HO^-','se calienta (la reacción absorbe calor)','→',[['[H₃O⁺]','↑'],['[HO⁻]','↑'],['Kw','↑']],'Al calentar se forman más iones, en la misma cantidad: Kw crece y el pH del agua pura baja, pero sigue siendo <b>neutra</b>.')}
${table(['T (°C)','Kw','pKw','pH neutro = pKw/2'],[
 ['0','1,14·10⁻¹⁵','14,94','7,47'],['10','2,92·10⁻¹⁵','14,53','7,27'],['25','1,01·10⁻¹⁴','14,00','7,00'],['40','2,92·10⁻¹⁴','13,53','6,77'],['50','5,47·10⁻¹⁴','13,26','6,63'],['60','9,61·10⁻¹⁴','13,02','6,51'],['100','5,13·10⁻¹³','12,29','6,14']
])}
${punch('Neutro NO significa pH 7. Neutro significa [H₃O⁺] = [HO⁻]. Sólo a 25 °C eso da pH 7.')}
${example('Agua pura a 50 °C: ¿es ácida?','<p>A 50 °C, Kw = 5,47·10⁻¹⁴. Calcular el pH del agua pura y decidir si es ácida, neutra o básica. Calcular además el pH de NaOH 0,010 M a esa temperatura.</p>',
 step('Sistema',sys({rx:[['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]=5{,}47\times10^{-14}`]],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}))+
 step('1. Agua pura',jus('<p>En agua pura la única fuente de iones es la autoprotólisis, que forma un H₃O⁺ por cada HO⁻: el BC da [H₃O⁺] = [HO⁻]. No hay nada que despreciar.</p>')+chain(R`[\mathrm{H_3O^+}]^2=K_w\ \Rightarrow\ [\mathrm{H_3O^+}]=2{,}34\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}63`))+
 step('2. ¿Es ácida?',jus('<p><b>No.</b> Aunque el pH es menor que 7, [H₃O⁺] = [HO⁻]: es <b>neutra</b>. A 50 °C la escala se corre: neutro es 6,63 y pH + pOH = pKw = 13,26.</p>'))+
 step('3. NaOH 0,010 M a 50 °C',jus('<p>Es razonable suponer que el HO⁻ que aporta el agua es bajo respecto del que aporta el NaOH (base fuerte en concentración alta, que además reprime la autoprotólisis por ion común).</p>')+chain(R`\mathrm{pOH}=2{,}00`,[R`\mathrm{pH}=\mathrm{p}K_w-\mathrm{pOH}=13{,}26-2{,}00=11{,}26`,'NO 14 − 2 = 12'])+ver('<p>El agua aporta como mucho 2,3·10⁻⁷ M frente a 0,010 M (0,002 %) ✔</p>')),
 'Agua pura a 50 °C: pH 6,63 y es neutra · NaOH 0,010 M: pH 11,26')}
${warn('Cuidado en el parcial','<p>Si el enunciado da una temperatura distinta de 25 °C, usá Kw a esa temperatura y <b>pH + pOH = pKw</b>. Es una trampa clásica decir que el agua a 60 °C (pH 6,51) “es ácida”.</p>')}
`);

  // =====================================================================
  add('lam','Ley de acción de masas y electrolitos fuertes y débiles','ÁCIDO-BASE',`
${key(R`a\,\mathrm{A}+b\,\mathrm{B}\rightleftharpoons c\,\mathrm{C}+d\,\mathrm{D}\qquad K=\frac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b}`,'Ley de acción de masas')}
<p><b>Qué representa:</b> en un sistema en equilibrio, a temperatura constante, el cociente entre las concentraciones de productos y de reactivos (cada una elevada a su coeficiente) es un número fijo, K, sin importar de qué concentraciones se partió. Sólidos puros y el agua como solvente no entran. K sólo cambia con la temperatura, y no dice nada sobre la velocidad.</p>
${table(['','Electrolito fuerte','Electrolito débil'],[
 ['Disociación','total (α = 1)','parcial (α &lt; 1)'],
 ['Cómo se escribe','flecha simple → y sin constante','equilibrio ⇌ con su K'],
 ['En solución hay','sólo iones (la especie sin disociar no existe)','iones y especie sin disociar, en equilibrio'],
 ['Ejemplos','HCl, HNO₃, NaOH, sales solubles (NaCl, NaAc, NH₄Cl)','HAc, HF, NH₃, H₂CO₃, HSO₄⁻'],
 ['Conductividad','alta','baja para la misma concentración']
])}
${warn('Una sal es un electrolito fuerte aunque venga de un ácido débil','<p>El acetato de sodio se disocia <b>totalmente</b> (NaAc(s) → Na⁺(ac) + Ac⁻(ac)): es un electrolito fuerte. Lo que es débil es el comportamiento ácido-base del ion Ac⁻ con el agua. Son dos cosas distintas y conviene decirlas por separado.</p>')}
`);

  // =====================================================================
  add('lista','Fuertes y débiles: aprendelos ANTES de calcular','ÁCIDO-BASE · 05',`
<p>El primer paso de cualquier ejercicio es saber si el ácido o la base es <b>fuerte</b> (se disocia todo) o <b>débil</b> (equilibrio). Si te equivocás acá, todo lo que sigue está mal aunque las cuentas sean perfectas. Por eso conviene <b>memorizar la lista corta de fuertes</b>: todo lo que no está en ella, es débil.</p>
${memo([
 ['Ácidos fuertes · memorizar','strong','<ul><li>'+f('HCl')+' clorhídrico</li><li>'+f('HBr')+' bromhídrico</li><li>'+f('HI')+' yodhídrico</li><li>'+f('HNO3')+' nítrico</li><li>'+f('HClO4')+' perclórico</li><li>'+f('HClO3')+' clórico</li><li>'+f('H2SO4')+' sulfúrico (<b>sólo el primer H</b>)</li></ul>'],
 ['Bases fuertes · memorizar','strong','<ul><li>Hidróxidos del grupo 1: '+f('LiOH')+', '+f('NaOH')+', '+f('KOH')+', '+f('RbOH')+', '+f('CsOH')+'</li><li>Hidróxidos de los alcalinotérreos pesados: '+f('Ca(OH)2')+', '+f('Sr(OH)2')+', '+f('Ba(OH)2')+' (lo que se disuelve, se disocia todo)</li></ul>'],
 ['Ácidos débiles · ejemplos','weak','<ul><li>'+f('HF')+' (¡aunque sea un hidrácido halogenado!)</li><li>'+f('HAc')+' = CH₃COOH acético, '+f('HCOOH')+' fórmico</li><li>'+f('HCN')+', '+f('HNO2')+', '+f('HClO')+'</li><li>'+f('H2CO3')+', '+f('H2S')+', '+f('H3PO4')+', '+f('H2SO3')+'</li><li>'+f('HSO4^-')+' (el segundo H del sulfúrico)</li><li>'+f('NH4^+')+' y los cationes metálicos hidratados</li></ul>'],
 ['Bases débiles · ejemplos','weak','<ul><li>'+f('NH3')+' amoníaco</li><li>aminas: '+f('CH3NH2')+'…</li><li>aniones de ácidos débiles: '+f('Ac^-')+', '+f('CN^-')+', '+f('F^-')+', '+f('CO3^2-')+', '+f('S^2-')+'</li><li>'+f('Mg(OH)2')+', '+f('Fe(OH)3')+' y casi todos los hidróxidos de metales de transición: son poco solubles (Unidad 2)</li></ul>']
])}
${idea('Pista práctica: ¿me dieron una constante?','<p>En los enunciados, si te dan Ka o Kb de una sustancia, normalmente es porque es <b>débil</b>. Si no te dan ninguna constante y la sustancia no figura en la tabla de constantes de la cátedra, normalmente es <b>fuerte</b>. Es una pista, no una regla: hay que mirar el contexto (por ejemplo, el H₂SO₄ trae Ka₂ porque la segunda disociación es débil, y una sal soluble nunca trae constante de disociación porque se disocia totalmente).</p>')}
${table(['Fuerte','Débil'],[
 ['Se disocia <b>completamente</b>: flecha simple →','Se disocia <b>parcialmente</b>: equilibrio ⇌'],
 ['No tiene constante útil (Ka “infinita”)','Tiene Ka o Kb (tabla)'],
 ['[H⁺] = C (por cada H ácido fuerte)','[H⁺] &lt; C: hay que plantear el equilibrio'],
 ['Su base conjugada es <b>despreciable</b>: Cl⁻, NO₃⁻ no hidrolizan','Su base conjugada es una base débil: Ac⁻, CN⁻ sí hidrolizan']
])}
${idea('Cuanto más fuerte el ácido, más débil su base conjugada','<p>Para un par conjugado se cumple '+m(R`K_a\cdot K_b=K_w`)+' (lo demostramos más adelante). Si el ácido es muy fuerte, su base conjugada no tiene ninguna tendencia a recuperar el H⁺: por eso el Cl⁻ no cambia el pH. Si el ácido es débil, su base conjugada sí: por eso el acetato de sodio es básico.</p>')}
${warn('Fuerza no es lo mismo que concentración (ni que peligrosidad)','<ul><li><b>Fuerte/débil</b> habla de <b>cuánto se disocia</b>.</li><li><b>Concentrado/diluido</b> habla de <b>cuánto soluto hay</b>.</li><li>HCl 10⁻⁵ M es un ácido fuerte diluido (pH 5); HAc 1 M es un ácido débil concentrado (pH 2,4). El acético concentrado tiene <b>más acidez</b>.</li><li>El HF es débil… y es de los ácidos más peligrosos que existen.</li></ul>')}
${cards([
 ['¿Fuerte o débil?','HF','Débil (Ka ≈ 6,8·10⁻⁴). Es la excepción entre los hidrácidos halogenados.'],
 ['¿Fuerte o débil?','HNO₂ (nitroso)','Débil. El fuerte es el nítrico, HNO₃.'],
 ['¿Fuerte o débil?','HClO₄','Fuerte (el más fuerte de la lista).'],
 ['¿Fuerte o débil?','H₂SO₄','Fuerte en la primera disociación; el HSO₄⁻ es débil (Ka₂ ≈ 1,2·10⁻²).'],
 ['¿Fuerte o débil?','Ba(OH)₂','Base fuerte: libera 2 OH⁻ por fórmula.'],
 ['¿Fuerte o débil?','NH₃','Base débil (Kb = 1,8·10⁻⁵).'],
 ['¿Fuerte o débil?','H₂CO₃','Ácido débil diprótico (Ka₁ = 4,3·10⁻⁷).'],
 ['¿Fuerte o débil?','KOH','Base fuerte.']
])}
`);

  // =====================================================================
  add('fuerza','Comparar la fuerza de ácidos y bases','ÁCIDO-BASE',`
${table(['Para comparar…','Más fuerte es el que tiene…'],[['ácidos','mayor Ka · <b>menor pKa</b>'],['bases','mayor Kb · <b>menor pKb</b>'],['una base dada por el pKa de su ácido conjugado','pKb = 14 − pKa: <b>mayor pKa del conjugado</b> → base más fuerte']])}
${example('Ordenar bases dadas con pKa y pKb mezclados','<p>Ordenar en fuerza creciente: F⁻ (pKa HF 3,45), NH₃ (pKb 4,75), Ac⁻ (pKa HAc 4,75).</p>',
 step('Pasar todo a pKb',chain([R`\mathrm{F^-}:\ 14-3{,}45=10{,}55`,'base muy débil'],[R`\mathrm{Ac^-}:\ 14-4{,}75=9{,}25`,''],[R`\mathrm{NH_3}:\ 4{,}75`,'dato']))+A.jus('<p>Sólo se pueden comparar constantes del mismo tipo. Por Ka·Kb = Kw (par conjugado) se pasa todo a pKb; una base es más fuerte cuanto menor es su pKb (más se desplaza su equilibrio con el agua hacia los productos).</p>'),
 'F⁻ &lt; Ac⁻ &lt; NH₃ (menor pKb = más fuerte)')}
${idea('Por qué funciona','<p>Por Ka·Kb = Kw: cuanto más fuerte es un ácido (Ka grande), más débil es su base conjugada (Kb chica). El HF es más fuerte que el acético, por eso el F⁻ es una base más débil que el Ac⁻.</p>')}
`);

  // =====================================================================
  add('descripcion','Descripción del sistema (cualitativa y cuantitativa)','ÁCIDO-BASE',`
<p>Es la consigna más frecuente: “describa el sistema”, “realice la descripción cuali–cuantitativa”. Es escribir <b>todo lo que pasa</b> en la solución, en orden, y después las concentraciones.</p>
${flow([
 ['1. Disociaciones totales (→, sin K)','Electrolitos fuertes: sales solubles, ácidos y bases fuertes.'],
 ['2. Equilibrios con el agua (⇌, con K y su expresión)','Cada especie débil reacciona con H₂O (Brønsted). Polipróticos: <b>un protón por equilibrio</b>, cada uno con su Ka.'],
 ['3. Autoprotólisis del agua (⇌, Kw)','Siempre, en cualquier solución acuosa.'],
 ['4. BM y BC',''],
 ['5. Análisis cualitativo','Comparar constantes y concentraciones: qué especies predominan, cuáles son despreciables (justificado). El pH será ácido, básico o neutro según quién gane.'],
 ['6. Cuantitativo','Desprecios, despeje en K, cálculo de <b>todas</b> las concentraciones (incluidas [HO⁻] y las minoritarias) y verificación.']
])}
${example('Descripción completa de NH₄Cl 0,10 M','<p>(Kb NH₃ = 1,8·10⁻⁵)</p>',
 step('1. Planteo (siempre en este orden)',sys({rx:[['NH4Cl -> NH4^+ + Cl^-','','sal: electrolito fuerte, disociación total (sin K)'],['NH4^+ + H2O <=> NH3 + H3O^+',R`K_a=\frac{[\mathrm{NH_3}][\mathrm{H_3O^+}]}{[\mathrm{NH_4^+}]}=\frac{K_w}{K_b}=5{,}6\times10^{-10}`],['H2O + H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`]],bm:[R`C=0{,}10=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]`,R`[\mathrm{Cl^-}]=0{,}10`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}))+
 step('2. Análisis cualitativo',jus('<p>El Cl⁻ proviene del HCl (electrolito fuerte): no tiene comportamiento ácido-base. El NH₄⁺ proviene del NH₃ (electrolito débil): es un ácido débil que cede H⁺ al agua → <b>solución ácida</b>.</p>'))+
 step('3. Despeje del BM y reemplazo en el BC',chain([R`\text{del BM: }[\mathrm{NH_4^+}]=C-[\mathrm{NH_3}]`,'despejo una especie'],[R`\text{en el BC: }C-[\mathrm{NH_3}]+[\mathrm{H_3O^+}]=C+[\mathrm{HO^-}]`,'[Cl⁻] = C'],[R`[\mathrm{H_3O^+}]=[\mathrm{NH_3}]+[\mathrm{HO^-}]`,'se cancela C']))+
 step('4. Desprecios',jus('<p>Es razonable suponer que [HO⁻] es baja <b>respecto de</b> [NH₃] porque el medio es ácido (el H₃O⁺ desplaza la autoprotólisis hacia los reactivos). Queda [H₃O⁺] ≈ [NH₃].</p><p>Es razonable suponer que [NH₃] es baja <b>respecto de</b> C en el BM porque el NH₄⁺ es un ácido muy débil (Ka = 5,6·10⁻¹⁰, C/Ka ≫ 100): queda [NH₄⁺] ≈ C.</p>'))+
 step('5. Reemplazo en K',chain(R`K_a=\frac{[\mathrm{H_3O^+}]^2}{C}\Rightarrow[\mathrm{H_3O^+}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}10}=7{,}5\times10^{-6}\ \mathrm{M}\quad\mathrm{pH}=5{,}13`,R`[\mathrm{NH_3}]=7{,}5\times10^{-6}\quad[\mathrm{NH_4^+}]=[\mathrm{Cl^-}]=0{,}10\quad[\mathrm{HO^-}]=1{,}3\times10^{-9}\ \mathrm{M}`))+
 step('6. Verificación',ver('<p>[NH₃] = 7,5·10⁻⁶ es el 0,0075 % de C ✔ · [HO⁻] = 1,3·10⁻⁹ es el 0,02 % de [NH₃] ✔</p>')),
 'Ácida, pH 5,13, con todas las concentraciones')}
<h3>Errores de descripción que la profe marca siempre</h3>
${table(['Error','Por qué está mal','Correcto'],[
 [rx('H3PO4 + 3 H2O -> 3 H3O^+ + PO4^3-'),'un débil no se disocia totalmente (va ⇌) y los protones salen <b>de a uno</b>, cada uno con su Ka','tres equilibrios: H₃PO₄(ac) ⇌ H₂PO₄⁻(ac) ⇌ HPO₄²⁻(ac) ⇌ PO₄³⁻(ac)'],
 [rx('HSO4^- -> SO4^2- + H3O^+'),'la segunda disociación del sulfúrico es débil (Ka₂ = 1,2·10⁻²)','HSO₄⁻(ac) + H₂O(l) ⇌ SO₄²⁻(ac) + H₃O⁺(ac), con Ka₂'],
 [rx('NH4^+ -> NH3 + H3O^+'),'faltan el agua (Brønsted: el H⁺ va al H₂O), el equilibrio y la constante','NH₄⁺(ac) + H₂O(l) ⇌ NH₃(ac) + H₃O⁺(ac), Ka'],
 [rx('H2O + H2O -> H3O^+ + HO^-'),'la autoprotólisis es un equilibrio','⇌ con Kw'],
 ['[HO⁻] = 0 en un ácido','Kw siempre vale: [HO⁻] = Kw/[H₃O⁺], chico pero no cero','calcularla'],
 ['Olvidar la autoprotólisis del agua','está en todas las soluciones acuosas','escribirla siempre']
],'compareTable')}
`);

  // =====================================================================
  add('trampas','Preguntas trampa frecuentes','ÁCIDO-BASE',`
${cards([
 ['Equilibrio','¿Un sistema de dos sustancias “alcanza el equilibrio”?','Siempre. En solución acuosa al menos está la autoprotólisis del agua; cualquier agregado desplaza el sistema hasta un nuevo equilibrio.'],
 ['Equilibrio','¿Una solución de HCl alcanza el equilibrio si el HCl se disocia todo?','Sí: la disociación es total, pero el agua sigue en equilibrio (Kw) con [HO⁻] = Kw/[H₃O⁺].'],
 ['Especiación','¿Alguna especie tiene concentración 0?','Nunca. Puede ser despreciable (α muy chico) frente a otra, pero no nula.'],
 ['Especiación','¿El diagrama de especiación informa sobre la cinética de disociación?','No. Muestra fracciones en el equilibrio (termodinámica), no a qué velocidad se llega.'],
 ['pH','¿Agua pura con pH 6,63 es ácida?','No: a 50 °C pKw = 13,26 y es neutra ([H₃O⁺] = [HO⁻]).'],
 ['pH','HCl 10⁻⁸ M, ¿pH 8?','No: 6,98. El aporte del agua no se puede despreciar.'],
 ['Fuerza','¿Fuerte es lo mismo que concentrado?','No. Fuerte/débil = cuánto se disocia; concentrado/diluido = cuánto soluto hay.'],
 ['Sales','¿Una sal es electrolito fuerte o débil?','Las sales solubles son electrolitos fuertes (disociación total); sus iones pueden luego tener comportamiento ácido-base débil.'],
 ['Grado','¿Dónde es mayor α, en 10⁻⁴ M o en 0,4 M?','En 10⁻⁴ M: menos choques efectivos (y Le Châtelier por dilución).'],
 ['Ion común','¿Se puede despreciar el acético frente a HCl a pH 2?','Sí: el H₃O⁺ del HCl desplaza el equilibrio del acético (ion común) y su aporte es despreciable (verificar).'],
 ['Fórmulas','¿√(Ka·C) vale siempre?','No: sólo si el agua no aporta y C/Ka &gt; 100 (verificar x ≤ 5 %).'],
 ['Buffer','¿NH₄Cl solo regula el pH?','No: falta la base conjugada (NH₃) en cantidad apreciable.']
])}
`);

  // =====================================================================
  add('fuertes','Ácidos y bases fuertes: disociación total y neutralización','ÁCIDO-BASE · 06',`
<p>Un ácido fuerte se disocia <b>totalmente</b>: no hay equilibrio que plantear. La concentración de H⁺ sale directamente de la estequiometría.</p>
${rxs(['HCl(ac) -> H^+(ac) + Cl^-(ac)','C → C + C'],['Ba(OH)2(ac) -> Ba^2+(ac) + 2 OH^-(ac)','C → C + 2C'])}
${key(R`\text{Ácido fuerte: }[\mathrm{H^+}]=n_{\mathrm{H}}\cdot C_a\qquad\text{Base fuerte: }[\mathrm{OH^-}]=n_{\mathrm{OH}}\cdot C_b`,'Cálculo directo')}
${sup([
 ['Todo el H⁺ viene del ácido (despreciamos el agua)','el ácido aporta C ≫ 10⁻⁷ M; además, el H⁺ del ácido desplaza la autoionización hacia la izquierda (Le Châtelier), así que el agua aporta todavía menos de 10⁻⁷ M.'],
 ['La disociación es completa','es un ácido o base fuerte (de la lista).']
])}
${ver('<p>El agua aporta [H⁺]<sub>agua</sub> = [OH⁻] = Kw/[H⁺]. Si eso es ≤ 5 % de [H⁺], la suposición vale. En la práctica esto se cumple siempre que <b>C ≥ 10⁻⁶ M</b>. Para concentraciones menores, ver la sección siguiente.</p>')}
${example('Tres casos directos','<p>Calcular el pH de: a) HCl 0,025 M · b) Ba(OH)₂ 0,0050 M · c) 10,0 mL de HNO₃ 0,50 M llevados a 250 mL con agua.</p>',
 step('a) HCl 0,025 M',chain(R`[\mathrm{H^+}]=C_a=0{,}025\ \mathrm{M}`,R`\mathrm{pH}=-\log(0{,}025)=1{,}60`))+
 step('b) Ba(OH)₂ 0,0050 M: ¡dos OH⁻ por fórmula!',chain(R`[\mathrm{OH^-}]=2\cdot0{,}0050=0{,}010\ \mathrm{M}`,R`\mathrm{pOH}=2{,}00\ \Rightarrow\ \mathrm{pH}=14-2{,}00=12{,}00`))+
 step('c) Primero la dilución, después el pH',chain([R`C_1V_1=C_2V_2\ \Rightarrow\ C_2=\frac{0{,}50\cdot10{,}0}{250}=0{,}020\ \mathrm{M}`,'los moles no cambian al diluir'],R`\mathrm{pH}=-\log(0{,}020)=1{,}70`))+
 step('Verificamos (caso c)',ver('<p>'+m(R`[\mathrm{OH^-}]=\frac{10^{-14}}{0{,}020}=5\times10^{-13}\ \mathrm{M}`)+': el agua aportó 5·10⁻¹³ M de H⁺ frente a 0,020 M. Totalmente despreciable. ✔</p>'))+A.jus('<p>Los tres son electrolitos fuertes (HCl, Ba(OH)₂, HNO₃): disociación total, así que la concentración de H₃O⁺ o HO⁻ sale de la estequiometría. Es razonable suponer el aporte del agua bajo respecto del del ácido o la base: la concentración es alta (≥ 10⁻⁶ M) y el H₃O⁺ o HO⁻ agregado desplaza la autoprotólisis hacia los reactivos (Le Châtelier). En la dilución se conservan los moles: C₁V₁ = C₂V₂.</p>'),
 'a) pH 1,60 · b) pH 12,00 · c) pH 1,70')}
<h3>Neutralización y mezclas de ácido fuerte con base fuerte</h3>
${rx('H^+(ac) + OH^-(ac) -> H2O(l)','K = 1/Kw = 10¹⁴: es completa')}
${flow([
 ['Pasar todo a moles (o milimoles)','n = C·V. Con mL y M salen milimoles (mmol): más cómodo.'],
 ['Hacer la reacción completa','Como K = 10¹⁴, el reactivo limitante se consume totalmente. ¡Es estequiometría, no equilibrio!'],
 ['Ver qué sobra','Si sobra H⁺ → ácida. Si sobra OH⁻ → básica. Si no sobra nada → neutra (pH 7 a 25 °C; las sales como NaCl no hidrolizan).'],
 ['Dividir por el volumen TOTAL','[exceso] = n que sobra / (V₁ + V₂).']
])}
${example('Mezcla con exceso de ácido','<p>Se mezclan 25,0 mL de HCl 0,100 M con 15,0 mL de NaOH 0,120 M. Calcular el pH.</p>',
 step('1. Milimoles',chain(R`n_{\mathrm{H^+}}=25{,}0\cdot0{,}100=2{,}50\ \mathrm{mmol}`,R`n_{\mathrm{OH^-}}=15{,}0\cdot0{,}120=1{,}80\ \mathrm{mmol}`))+
 step('2. Reacción completa',table(['','H⁺','OH⁻'],[['Inicio','2,50','1,80'],['Reacciona','−1,80','−1,80'],['Final','<b>0,70</b>','0']]))+
 step('3. Concentración del exceso en el volumen total',chain(R`[\mathrm{H^+}]=\frac{0{,}70\ \mathrm{mmol}}{40{,}0\ \mathrm{mL}}=0{,}0175\ \mathrm{M}`,R`\mathrm{pH}=-\log(0{,}0175)=1{,}76`))+A.jus('<p>La neutralización H₃O⁺(ac) + HO⁻(ac) → 2 H₂O(l) tiene K = 1/Kw = 10¹⁴: es completa, por eso se trabaja con estequiometría en moles y no con equilibrio. Sobra ácido fuerte, que fija el pH; es razonable suponer el aporte del agua bajo respecto de él.</p>'),
 'pH = 1,76 (sobra ácido)')}
${warn('Errores típicos en mezclas','<ul><li>Restar <b>concentraciones</b> en vez de moles: sólo los moles se conservan.</li><li>Dividir por el volumen de uno solo de los reactivos en lugar del total.</li><li>Olvidar que '+f('H2SO4')+' o '+f('Ca(OH)2')+' aportan más de un H⁺ u OH⁻ por fórmula (al menos en la primera disociación del sulfúrico).</li></ul>')}
`);

  // =====================================================================
  add('diluidas','Soluciones muy diluidas: cuando el agua sí importa','ÁCIDO-BASE · 07',`
<p>¿Cuál es el pH de HCl 10⁻⁸ M? La fórmula directa da pH = 8: <b>¡un ácido con pH básico!</b> Imposible. El error está en la suposición: con tan poco ácido, los H⁺ del agua (≈ 10⁻⁷ M) ya <b>no son despreciables</b>.</p>
<h3>El planteo completo (sin despreciar nada)</h3>
${chain([R`\text{BC: }[\mathrm{H^+}]=[\mathrm{Cl^-}]+[\mathrm{OH^-}]`,'cargas + = cargas −'],[R`[\mathrm{Cl^-}]=C_a`,'el ácido fuerte se disocia todo'],[R`[\mathrm{OH^-}]=\frac{K_w}{[\mathrm{H^+}]}`,'Kw siempre vale'],[R`[\mathrm{H^+}]=C_a+\frac{K_w}{[\mathrm{H^+}]}\ \Rightarrow\ [\mathrm{H^+}]^2-C_a[\mathrm{H^+}]-K_w=0`],[R`[\mathrm{H^+}]=\frac{C_a+\sqrt{C_a^2+4K_w}}{2}`,'raíz positiva'])}
${idea('Leé la ecuación como un químico','<p>'+m(R`[\mathrm{H^+}]=C_a+[\mathrm{OH^-}]`)+' dice: <b>H⁺ total = H⁺ del ácido + H⁺ del agua</b> (el agua forma un H⁺ por cada OH⁻). Si C<sub>a</sub> es grande, el segundo término es chico y volvemos a [H⁺] = C<sub>a</sub>.</p>')}
${table(['C del ácido fuerte','Fórmula simple','Exacta','¿Vale la simple?'],[
 ['10⁻³ M','3,00','3,00','sí'],['10⁻⁵ M','5,00','5,00','sí'],['10⁻⁶ M','6,00','5,996','sí (error 1 %)'],['10⁻⁷ M','7,00','<b>6,79</b>','no'],['10⁻⁸ M','8,00 (absurdo)','<b>6,98</b>','no'],['10⁻¹⁰ M','10,00 (absurdo)','7,00','no: es agua']
])}
${example('HCl 1,0·10⁻⁸ M','<p>Calcular el pH de una solución de HCl 1,0·10⁻⁸ M a 25 °C.</p>',
 step('1. Intento con la suposición de siempre',sup([['[H⁺] = C<sub>a</sub> = 1,0·10⁻⁸ M','(es lo que hacemos con ácidos fuertes)']])+chain(R`\mathrm{pH}=8{,}00`))+
 step('2. Verificamos… y falla',ver('<p>Con pH 8 la solución sería básica: '+m(R`[\mathrm{OH^-}]=10^{-6}\ \mathrm{M}`)+', es decir el agua aportaría <b>100 veces más</b> que el ácido. La suposición “el agua no aporta” es falsa.</p>',false))+
 step('3. Sin aproximar: BC + Kw',chain(R`[\mathrm{H^+}]=\frac{10^{-8}+\sqrt{(10^{-8})^2+4\cdot10^{-14}}}{2}`,R`[\mathrm{H^+}]=\frac{10^{-8}+2{,}0025\times10^{-7}}{2}=1{,}05\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}98`))+
 step('4. ¿Tiene sentido?',`<p>Sí: es apenas ácido (un poco menos de 7), porque se agregó una cantidad mínima de ácido al agua. De los 1,05·10⁻⁷ M de H⁺, sólo 10⁻⁸ vienen del HCl; el resto, del agua.</p>`),
 'pH = 6,98 (ligeramente ácido, como debe ser)')}
${punch('Regla práctica: si la concentración del ácido o base fuerte es menor que 10⁻⁶ M, plantear BC + Kw.')}
${deep('¿Y con una base fuerte muy diluida?',`<p>Es simétrico: ${m(R`[\mathrm{OH^-}]=C_b+[\mathrm{H^+}]`)}, de donde ${m(R`[\mathrm{OH^-}]=\frac{C_b+\sqrt{C_b^2+4K_w}}{2}`)}. Para NaOH 10⁻⁷ M: [OH⁻] = 1,62·10⁻⁷ M → pOH 6,79 → pH 7,21.</p>`)}
`);

  window.ET27_QAC5.units.push({id:'acido-base',n:1,title:'Ácido-base I · Fundamentos, fuertes y débiles',short:'Ácido-base I',lead:'Cómo se trabaja y cómo se justifica, las tres teorías, equilibrio y Le Châtelier, el agua y los anfolitos, pH y pasajes, ácidos y bases fuertes y débiles, grado de disociación y descripción del sistema. Con la Guía 3 de monopróticos resuelta.',sections:s});
})();
