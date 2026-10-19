// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 2 (estudio cualitativo de la disociación).
// Ítems de ácido-base (Ácido-base II), de reguladoras (Buffer: 15, 18, 20, 21, 22) y de complejos (8 y 17).
// Constantes del enunciado; si no las da, tablas del apéndice.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;

  // ---------------------------------------------------------------- 1
  S('g2-1',res({
   plan:'<p>Se comparan constantes de ácidos. Como pKa = −log Ka, <b>a menor pKa, mayor Ka</b>: el equilibrio HA + H₂O ⇌ A⁻ + H₃O⁺ está más desplazado hacia los productos y el ácido es más fuerte.</p>',
   cuali:table(['Par','pKa','Ka = 10⁻ᵖᴷᵃ','Más fuerte'],[['HF / HIO₃','3,45 / 0,77','3,5·10⁻⁴ / 1,7·10⁻¹','<b>HIO₃</b>'],['HNO₂ / HCN','3,37 / 9,31','4,3·10⁻⁴ / 4,9·10⁻¹⁰','<b>HNO₂</b>']])+'<p>Por el criterio de la cursada, la Ka del HIO₃ es <b>alta</b> (10⁻¹), las del HF y HNO₂ son intermedias (10⁻⁴) y la del HCN es baja (10⁻¹⁰).</p>',
   jus:'<p>A menor pKa, mayor Ka: el ácido cede con más facilidad su protón al agua. HIO₃ (pKa 0,77) es más fuerte que HF (3,45) y HNO₂ (3,37) más fuerte que HCN (9,31).</p>'
  }),'HIO₃ más fuerte que HF · HNO₂ más fuerte que HCN');

  // ---------------------------------------------------------------- 2
  S('g2-2',res({
   plan:'<p>Acidez creciente = Ka creciente = <b>pKa decreciente</b>. Se ordenan los pKa de mayor a menor.</p>',
   cuali:chain([R`9{,}31>3{,}75>3{,}45>3{,}37>2{,}00`,'pKa de HCN, HCOOH, HF, HNO₂ y HClO₂'])+table(['Ácido','pKa','Ka'],[['HCN','9,31','4,9·10⁻¹⁰'],['HCOOH','3,75','1,8·10⁻⁴'],['HF','3,45','3,5·10⁻⁴'],['HNO₂','3,37','4,3·10⁻⁴'],['HClO₂','2,00','1,0·10⁻²']]),
   jus:'<p>El pKa más bajo corresponde a la Ka más alta: el ácido cloroso es el que más se disocia y el cianhídrico el que menos.</p>'
  }),'HCN &lt; HCOOH &lt; HF &lt; HNO₂ &lt; HClO₂');

  // ---------------------------------------------------------------- 3
  S('g2-3',res({
   plan:'<p>Para comparar bases hay que tenerlas todas en la misma escala. Los iones vienen dados con el pKa de su <b>ácido conjugado</b>: se pasan a pKb con Ka·Kb = Kw, es decir pKb = 14 − pKa (25 °C). Más fuerte = <b>menor pKb</b>.</p>',
   cuali:table(['Base','Dato','pKb'],[['F⁻','pKa (HF) 3,45','14 − 3,45 = 10,55'],['Ac⁻','pKa (HAc) 4,75','14 − 4,75 = 9,25'],['piridina','pKb 8,75','8,75'],['hidracina','pKb 5,77','5,77'],['BrO⁻','pKa (HBrO) 8,6','14 − 8,6 = 5,4'],['NH₃','pKb 4,75','4,75']])+M(R`K_a\cdot K_b=K_w\ \Rightarrow\ \mathrm{p}K_a+\mathrm{p}K_b=14`,'par conjugado a 25 °C'),
   jus:'<p>Cuanto más fuerte es un ácido, más débil es su base conjugada (Ka·Kb = Kw). Con todo en pKb, la base más débil es el F⁻ (su ácido, el HF, es el más fuerte) y la más fuerte el NH₃.</p>'
  }),'F⁻ &lt; Ac⁻ &lt; piridina &lt; hidracina &lt; BrO⁻ &lt; NH₃');

  // ---------------------------------------------------------------- 4
  S('g2-4',res({
   plan:'<p>En agua pura la única fuente de iones es la autoprotólisis. Con el balance de carga se ve que [H₃O⁺] = [HO⁻] y se despeja de Kw a esa temperatura.</p>',
   datos:'<p>Kw (50 °C) = 5,5·10⁻¹⁴ (dato). Especies: H₂O(l), H₃O⁺(ac), HO⁻(ac).</p>',
   sist:sys({rx:[['2 H2O(l) <=> H3O^+(ac) + HO^-(ac)',R`K_w(50\,^\circ\mathrm{C})=[\mathrm{H_3O^+}][\mathrm{HO^-}]=5{,}5\times10^{-14}`]],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuanti:chain(R`[\mathrm{H_3O^+}]^2=K_w\ \Rightarrow\ [\mathrm{H_3O^+}]=\sqrt{5{,}5\times10^{-14}}=2{,}35\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=-\log(2{,}35\times10^{-7})=6{,}63\qquad\mathrm{p}K_w=13{,}26`),
   concl:'<p>Es <b>neutra</b> aunque el pH sea menor que 7: neutra significa [H₃O⁺] = [HO⁻], y a 50 °C eso ocurre en pH = pKw/2 = 6,63. La autoprotólisis es endotérmica: al calentar, por Le Châtelier, se desplaza hacia los iones y Kw aumenta.</p>',
   jus:'<p>Sin solutos, el BC da [H₃O⁺] = [HO⁻]; con Kw a 50 °C, pH = 6,63. Neutra, porque la neutralidad no depende del número 7 sino de la igualdad [H₃O⁺] = [HO⁻].</p>'
  }),'pH = 6,63 (neutra a 50 °C)');

  // ---------------------------------------------------------------- 5
  S('g2-5',res({
   plan:'<p>Para cada solución se escribe qué hace el soluto con el agua y se decide el carácter justificando con la fuerza de los electrolitos de origen (y, en b, con el balance de carga).</p>',
   cuali:inc('a','NH₄Cl 0,1 M: ¿pH ácido? → VERDADERO',rxs(['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','electrolito fuerte'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','Ka = Kw/Kb = 5,56·10⁻¹⁰'])+'<p>El Cl⁻ viene del HCl (fuerte): no tiene comportamiento ácido-base. El NH₄⁺ es el ácido conjugado del NH₃ (débil): cede H⁺ al agua. Ácida (pH ≈ 5,1).</p>')+
    inc('b','HCl 10⁻⁸ M: ¿pH básico? → FALSO',rxs(['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','total'],W)+M(R`\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]=10^{-8}+\frac{K_w}{[\mathrm{H_3O^+}]}`)+'<p>Acá <b>no</b> se puede suponer [HO⁻] baja respecto de [Cl⁻]: el ácido aporta 10⁻⁸ M y el agua del orden de 10⁻⁷ M. Se resuelve completo:</p>'+chain(R`[\mathrm{H_3O^+}]^2-10^{-8}[\mathrm{H_3O^+}]-10^{-14}=0\ \Rightarrow\ [\mathrm{H_3O^+}]=1{,}05\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}98`)+'<p>Levemente ácida: agregar un ácido al agua nunca la vuelve básica. El “pH 8” sale de usar −log 10⁻⁸ sin el agua.</p>')+
    inc('c','Acetato de calcio 0,1 M: ¿pH neutro? → FALSO',rxs(['Ca(Ac)2(s) -> Ca^2+(ac) + 2 Ac^-(ac)','electrolito fuerte'],['Ac^-(ac) + H2O(l) <=> HAc(ac) + HO^-(ac)','Kb = Kw/Ka = 5,6·10⁻¹⁰'])+'<p>El Ca²⁺ viene del Ca(OH)₂ (fuerte): no reacciona. El Ac⁻ es base conjugada del HAc (débil): genera HO⁻. Básica.</p>')+
    inc('d','Arseniato diácido de sodio 1 M: ¿básica? → FALSO',rxs(['NaH2AsO4(s) -> Na^+(ac) + H2AsO4^-(ac)','electrolito fuerte'],['H2AsO4^-(ac) + H2O(l) <=> HAsO4^2-(ac) + H3O^+(ac)','Ka₂ = 1,0·10⁻⁷'],['H2AsO4^-(ac) + H2O(l) <=> H3AsO4(ac) + HO^-(ac)','Kb = Kw/Ka₁ = 10⁻¹⁴/5,6·10⁻³ = 1,8·10⁻¹²'])+'<p>Es anfiprótico y Ka₂ ≫ Kb: predomina el carácter ácido. pH ≈ ½(pKa₁ + pKa₂) = ½(2,25 + 7,00) = 4,63: <b>ácida</b>.</p>'+tab('Ka del arsénico: Tabla 1.')),
   jus:'<p>a) NH₄⁺ ácido conjugado de base débil → ácida. b) El aporte del agua no es despreciable: pH 6,98, ácida. c) Ac⁻ base conjugada de ácido débil → básica. d) H₂AsO₄⁻ anfiprótico con Ka₂ ≫ Kb → ácida.</p>'
  }),'a) V · b) F (pH 6,98) · c) F (básica) · d) F (ácida, pH ≈ 4,6)');

  // ---------------------------------------------------------------- 6
  S('g2-6',res({
   plan:'<p>Método de las sales: (1) de qué ácido y de qué base proviene la sal; (2) disociación total (electrolito fuerte); (3) cada ion: si es conjugado de un fuerte no reacciona; si es conjugado de un débil, se escribe su equilibrio con el agua y su constante; (4) se concluye comparando constantes. Constantes de las tablas.</p>',
   cuali:inc('a','Nitrato de potasio (KOH fuerte + HNO₃ fuerte)',rx('KNO3(s) -> K^+(ac) + NO3^-(ac)')+'<p>K⁺ y NO₃⁻ son conjugados de electrolitos fuertes: ninguno reacciona con el agua. <b>Neutra</b> (pH 7 a 25 °C).</p>')+
    inc('b','Nitrato de amonio (NH₃ débil + HNO₃ fuerte)',rxs(['NH4NO3(s) -> NH4^+(ac) + NO3^-(ac)'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','Ka = 10⁻¹⁴/1,8·10⁻⁵ = 5,6·10⁻¹⁰'])+'<p>NO₃⁻ inalterado; NH₄⁺ ácido débil. <b>Ácida</b>.</p>')+
    inc('c','Bisulfito de sodio (NaOH fuerte + H₂SO₃ débil)',rxs(['NaHSO3(s) -> Na^+(ac) + HSO3^-(ac)'],['HSO3^-(ac) + H2O(l) <=> SO3^2-(ac) + H3O^+(ac)','Ka₂ = 6,4·10⁻⁸'],['HSO3^-(ac) + H2O(l) <=> H2SO3(ac) + HO^-(ac)','Kb = Kw/Ka₁ = 10⁻¹⁴/1,7·10⁻² = 5,9·10⁻¹³'])+'<p>Na⁺ inalterado; HSO₃⁻ anfiprótico con Ka₂ ≫ Kb: <b>ácida</b> (pH ≈ ½(1,77 + 7,19) = 4,5).</p>')+
    inc('d','Iodato de metilamonio (CH₃NH₂ débil + HIO₃ débil)',rxs(['CH3NH3IO3(s) -> CH3NH3^+(ac) + IO3^-(ac)'],['CH3NH3^+(ac) + H2O(l) <=> CH3NH2(ac) + H3O^+(ac)','Ka = 10⁻¹⁴/4,4·10⁻⁴ = 2,3·10⁻¹¹'],['IO3^-(ac) + H2O(l) <=> HIO3(ac) + HO^-(ac)','Kb = 10⁻¹⁴/1,7·10⁻¹ = 5,9·10⁻¹⁴'])+'<p>Los dos iones reaccionan: se comparan las constantes. Ka(CH₃NH₃⁺) &gt; Kb(IO₃⁻): <b>levemente ácida</b>.</p>'+M(R`\mathrm{pH}\approx\tfrac12\left(\mathrm{p}K_w+\mathrm{p}K_a(\mathrm{HIO_3})-\mathrm{p}K_b(\mathrm{CH_3NH_2})\right)=\tfrac12(14+0{,}77-3{,}36)=5{,}7`))+
    tab('Kb NH₃ y CH₃NH₂: Tabla 2 · Ka H₂SO₃ y HIO₃: Tabla 1.'),
   jus:'<p>Las sales se disocian totalmente; el carácter lo deciden los iones que vienen de electrolitos débiles. KNO₃ neutra; NH₄NO₃ ácida; NaHSO₃ ácida (Ka₂ ≫ Kb); CH₃NH₃IO₃ levemente ácida (Ka del catión &gt; Kb del anión).</p>'
  }),'a) neutra · b) ácida · c) ácida · d) levemente ácida (pH ≈ 5,7)');

  // ---------------------------------------------------------------- 7
  S('g2-7',res({
   plan:'<p>Primero se calcula la concentración del HCl diluido (masa con densidad y %, moles, molaridad). Es un ácido fuerte: el pH sale directo. Después se analiza si el NaCl agregado tiene comportamiento ácido-base o desplaza algún equilibrio.</p>',
   datos:'<p>2,34 mL de HCl 36 % m/m, δ = 1,19 g/mL, llevados a 250 mL. M(HCl) = 36,46 g/mol. Se agregan 10 g de NaCl.</p>',
   sist:sys({rx:[['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','','ácido fuerte: total'],W,['NaCl(s) -> Na^+(ac) + Cl^-(ac)','','electrolito fuerte: total']],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}),
   cuanti:chain(R`m_{\text{solución}}=2{,}34\cdot1{,}19=2{,}785\ \mathrm{g}\ \Rightarrow\ m_{\mathrm{HCl}}=0{,}36\cdot2{,}785=1{,}003\ \mathrm{g}`,R`n=\frac{1{,}003}{36{,}46}=0{,}0275\ \mathrm{mol}\ \Rightarrow\ C=\frac{0{,}0275}{0{,}250}=0{,}110\ \mathrm{M}`,[R`[\mathrm{H_3O^+}]=0{,}110\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=0{,}96`,'es razonable suponer [HO⁻] baja respecto de [Cl⁻]: medio muy ácido']),
   cuali:'<p><b>¿Cambia el pH con el NaCl?</b> No. El Na⁺ (de NaOH, fuerte) y el Cl⁻ (de HCl, fuerte) no tienen comportamiento ácido-base. El Cl⁻ es “común” con el HCl, pero el HCl está <b>totalmente disociado</b>: no hay equilibrio que desplazar. En el BC aparecen Na⁺ y Cl⁻ en igual cantidad agregada y se compensan: [H₃O⁺] sigue igual a C(HCl) + [HO⁻].</p>',
   verif:ver('<p>[HO⁻] = 10⁻¹⁴/0,110 = 9,1·10⁻¹⁴ M frente a 0,110 M ✔.</p>'),
   jus:'<p>HCl electrolito fuerte: [H₃O⁺] = C = 0,110 M, pH 0,96. El NaCl aporta iones de electrolitos fuertes, sin comportamiento ácido-base: el pH no cambia y sigue ácido.</p>'
  }),'pH = 0,96 antes y después del NaCl (ácido)');

  // ---------------------------------------------------------------- 9
  S('g2-9',res({
   plan:'<p>“Describir el sistema” es escribir, en orden, las disociaciones totales (→, sin K), los equilibrios con el agua (⇌, con su K), la autoprotólisis, el BM y el BC. Lo que define cómo se escribe es si el soluto es electrolito fuerte o débil.</p>',
   cuali:inc('a','Hidróxido de estroncio · base fuerte',sys({rx:[['Sr(OH)2(s) -> Sr^2+(ac) + 2 HO^-(ac)','','→ sin K: disociación total'],W],bm:[R`[\mathrm{Sr^{2+}}]=C`],bc:[R`2[\mathrm{Sr^{2+}}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}))+
    inc('b','Ácido bromhídrico · ácido fuerte',sys({rx:[['HBr(ac) + H2O(l) -> H3O^+(ac) + Br^-(ac)','','→ sin K'],W],bm:[R`[\mathrm{Br^-}]=C`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Br^-}]+[\mathrm{HO^-}]`]}))+
    inc('c','Ácido carbónico · diprótico débil',sys({rx:[['H2CO3(ac) + H2O(l) <=> HCO3^-(ac) + H3O^+(ac)',R`K_{a1}=\frac{[\mathrm{HCO_3^-}][\mathrm{H_3O^+}]}{[\mathrm{H_2CO_3}]}=4{,}7\times10^{-7}`],['HCO3^-(ac) + H2O(l) <=> CO3^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{CO_3^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HCO_3^-}]}=5{,}6\times10^{-11}`],W],bm:[R`C=[\mathrm{H_2CO_3}]+[\mathrm{HCO_3^-}]+[\mathrm{CO_3^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HCO_3^-}]+2[\mathrm{CO_3^{2-}}]+[\mathrm{HO^-}]`]})+'<p>Un protón por equilibrio, cada uno con su Ka (Ka₁ ≫ Ka₂). El 2 del CO₃²⁻ en el BC es su carga.</p>')+
    inc('d','Ácido fluorhídrico · ácido débil',sys({rx:[['HF(ac) + H2O(l) <=> F^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{F^-}][\mathrm{H_3O^+}]}{[\mathrm{HF}]}=3{,}5\times10^{-4}`],W],bm:[R`C=[\mathrm{HF}]+[\mathrm{F^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{F^-}]+[\mathrm{HO^-}]`]}))+
    inc('e','Piridina · base débil',sys({rx:[['C5H5N(ac) + H2O(l) <=> C5H5NH^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{C_5H_5NH^+}][\mathrm{HO^-}]}{[\mathrm{C_5H_5N}]}=1{,}5\times10^{-9}`],W],bm:[R`C=[\mathrm{C_5H_5N}]+[\mathrm{C_5H_5NH^+}]`],bc:[R`[\mathrm{C_5H_5NH^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]})),
   jus:'<p>Fuertes (Sr(OH)₂, HBr): disociación total, →, sin constante. Débiles (H₂CO₃, HF, piridina): equilibrio con el agua (Brønsted), ⇌, con su constante. Siempre la autoprotólisis, el BM y el BC.</p>'
  }),'Fuertes con → y sin K; débiles con ⇌, su K, BM y BC; siempre el agua');

  // ---------------------------------------------------------------- 10
  S('g2-10',res({
   plan:'<p>El diagrama de especiación muestra la fracción α de cada especie en función del pH. Los cruces (α = 0,5) están en los pKa. Para los fuertes no hay equilibrio: una sola especie a cualquier pH acuoso. Constantes del ítem 9.</p>',
   cuali:inc('a y b','Sr(OH)₂ y HBr (electrolitos fuertes)','<p>En solución no existe la especie sin disociar a ningún pH: sólo Sr²⁺ o Br⁻ (α = 1 en todo el rango). No hay cruces.</p>')+
    inc('c','Ácido carbónico (pKa₁ = 6,33; pKa₂ = 10,25)',spec([6.33,10.25],['H₂CO₃','HCO₃⁻','CO₃²⁻'])+'<p>Predomina H₂CO₃ a pH &lt; 6,33; HCO₃⁻ entre 6,33 y 10,25; CO₃²⁻ a pH &gt; 10,25.</p>')+
    inc('d','Ácido fluorhídrico (pKa = 3,46)',spec([3.46],['HF','F⁻'])+'<p>HF predomina a pH &lt; 3,46; F⁻ a pH &gt; 3,46.</p>')+
    inc('e','Piridina (pKb = 8,82 → pKa del piridinio = 14 − 8,82 = 5,18)',spec([5.18],['C₅H₅NH⁺','C₅H₅N'])+'<p>La forma ácida (piridinio) predomina a pH &lt; 5,18; la piridina, a pH &gt; 5,18.</p>')+
    note('Sobre “el rango de pH en que existe”','<p>Cada especie de un electrolito débil <b>existe en todo el rango de pH</b> (su α nunca es exactamente 0). Lo que el diagrama marca es dónde <b>predomina</b> y dónde es <b>despreciable</b> (por ejemplo, a más de 2 unidades del pKa su α es menor que 1 %).</p>'),
   jus:'<p>Las fracciones se calculan con las constantes; los límites de predominio son los pKa. El diagrama no da el pH de una solución concreta: sólo qué especie predomina a cada pH.</p>'
  }),'H₂CO₃ &lt; 6,33 &lt; HCO₃⁻ &lt; 10,25 &lt; CO₃²⁻ · HF &lt; 3,46 &lt; F⁻ · C₅H₅NH⁺ &lt; 5,18 &lt; C₅H₅N');

  // ---------------------------------------------------------------- 11
  S('g2-11',res({
   plan:'<p>Se revisa línea por línea con los criterios de descripción: los electrolitos fuertes con → y sin K; los débiles con ⇌, con el agua como reactivo (Brønsted) y con su constante; siempre la autoprotólisis, el BM y el BC.</p>',
   cuali:table(['Línea','¿Qué está mal?','Correcto'],[
    ['1','está bien: la sal es un electrolito fuerte (se disocia totalmente)',rx('NH4HSO4(s) -> NH4^+(ac) + HSO4^-(ac)')],
    ['2','la 2.ª disociación del sulfúrico es <b>débil</b>: va con ⇌ y su Ka₂; falta el agua como reactivo',rx('HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)','Ka₂ = 1,2·10⁻²')],
    ['3','el NH₄⁺ es un ácido débil: va con ⇌ y su Ka; falta el agua (no hay protón “libre”)',rx('NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','Ka = Kw/Kb = 5,56·10⁻¹⁰')],
    ['falta','la autoprotólisis del agua, las expresiones de las constantes, el BM y el BC',rx('2 H2O(l) <=> H3O^+(ac) + HO^-(ac)','Kw')]])+
    M(R`\text{BM: }C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{HSO_4^-}]+[\mathrm{SO_4^{2-}}]`)+M(R`\text{BC: }[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{HSO_4^-}]+2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`),
   jus:'<p>Con → se afirma que la reacción es total, y eso sólo vale para electrolitos fuertes (la disociación de la sal). Para los débiles (HSO₄⁻ y NH₄⁺) se escribe el equilibrio con el agua y su constante, como dice la ley de acción de masas.</p>'
  }),'Las líneas 2 y 3 son equilibrios débiles (⇌ con el agua y su K); falta la autoprotólisis, BM y BC');

  // ---------------------------------------------------------------- 12
  S('g2-12',res({
   plan:'<p>Con el diagrama de especiación del ácido cítrico (pKa 3,15 · 4,77 · 6,40) se ve qué especie predomina a pH 2,3. Para confirmarlo se calculan las fracciones α.</p>',
   cuali:spec([3.15,4.77,6.40],['H₃Cit','H₂Cit⁻','HCit²⁻','Cit³⁻'],{mark:[{pH:2.3,label:'jugo de limón'}]})+'<p>pH 2,3 &lt; pKa₁ = 3,15: está a la izquierda del primer cruce, donde predomina la forma totalmente protonada.</p>',
   cuanti:chain(R`\frac{[\mathrm{H_2Cit^-}]}{[\mathrm{H_3Cit}]}=\frac{K_{a1}}{[\mathrm{H_3O^+}]}=10^{\,2{,}3-3{,}15}=0{,}14`,R`\alpha_{\mathrm{H_3Cit}}=0{,}88\quad\alpha_{\mathrm{H_2Cit^-}}=0{,}12\quad\alpha_{\mathrm{HCit^{2-}}}=4\times10^{-4}\quad\alpha_{\mathrm{Cit^{3-}}}=3\times10^{-8}`),
   jus:'<p>A pH menor que pKa₁ predomina el ácido sin disociar: H₃Cit es el 88 % del cítrico total; HCit²⁻ y Cit³⁻ son despreciables (pero no nulos).</p>'
  }),'Predomina el ácido cítrico sin disociar (H₃Cit, α ≈ 0,88)');

  // ---------------------------------------------------------------- 13
  S('g2-13',res({
   plan:'<p>Se ubica el pH 7,4 en el diagrama del carbónico (pKa₁ 6,36 · pKa₂ 10,33) y se calculan los cocientes entre especies para decidir cuál es despreciable respecto de cuál.</p>',
   cuali:spec([6.36,10.33],['H₂CO₃','HCO₃⁻','CO₃²⁻'],{mark:[{pH:7.4,label:'sangre'}]}),
   cuanti:chain([R`\frac{[\mathrm{HCO_3^-}]}{[\mathrm{H_2CO_3}]}=10^{\,7{,}4-6{,}36}=11`,'ambas apreciables'],[R`\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{\,7{,}4-10{,}33}=1{,}2\times10^{-3}`,'≈ 0,1 % del HCO₃⁻'],R`\alpha_{\mathrm{H_2CO_3}}=0{,}083\quad\alpha_{\mathrm{HCO_3^-}}=0{,}916\quad\alpha_{\mathrm{CO_3^{2-}}}=1{,}1\times10^{-3}`),
   jus:'<p>A pH 7,4 predomina HCO₃⁻ y el H₂CO₃ es apreciable (par regulador). El CO₃²⁻ es despreciable respecto de HCO₃⁻ (α ≈ 10⁻³, el pH está tres unidades por debajo de pKa₂), pero no es cero.</p>'
  }),'El CO₃²⁻ (α ≈ 1·10⁻³): despreciable, no nulo');

  // ---------------------------------------------------------------- 14
  S('g2-14',res({
   plan:'<p>En un diagrama de especiación: (1) se cuentan las curvas: n + 1 curvas → n protones ácidos; (2) dos curvas consecutivas se cortan en α = 0,5, y en ese punto [ácido] = [base conjugada], así que Ka = [H₃O⁺]: <b>el pH del cruce es el pKa</b>; (3) entre dos cruces predomina la curva que está arriba.</p>',
   cuali:inc('1','Diagrama 1 · triprótico (4 curvas)',chain(R`\mathrm{p}K_{a1}\approx2{,}0\quad\mathrm{p}K_{a2}\approx7{,}0\quad\mathrm{p}K_{a3}\approx11{,}9`,R`K_{a1}\approx1\times10^{-2}\quad K_{a2}\approx1\times10^{-7}\quad K_{a3}\approx1\times10^{-12}`)+table(['Especie','Predomina en'],[['H₃A','pH &lt; 2,0'],['H₂A⁻','2,0 – 7,0'],['HA²⁻','7,0 – 11,9'],['A³⁻','pH &gt; 11,9']]))+
    inc('2','Diagrama 2 · monoprótico (2 curvas)',chain(R`\mathrm{p}K_a\approx4{,}7\ \Rightarrow\ K_a\approx2\times10^{-5}`)+table(['Especie','Predomina en'],[['HA','pH &lt; 4,7'],['A⁻','pH &gt; 4,7']])+'<p>Compatible con el ácido acético (Tabla 1: pKa 4,74).</p>')+
    inc('3','Diagrama 3 · diprótico (3 curvas)',chain(R`\mathrm{p}K_{a1}\approx1{,}1\quad\mathrm{p}K_{a2}\approx4{,}0`,R`K_{a1}\approx8\times10^{-2}\quad K_{a2}\approx1\times10^{-4}`)+table(['Especie','Predomina en'],[['H₂A','pH &lt; 1,1'],['HA⁻','1,1 – 4,0'],['A²⁻','pH &gt; 4,0']])+'<p>Control: el máximo del HA⁻ está en pH ≈ ½(pKa₁ + pKa₂) ≈ 2,5 y no llega a 1 (≈ 0,93) porque los pKa están cerca; a pH 0 el H₂A ya no vale 1, lo que confirma un pKa₁ bajo.</p>'),
   jus:'<p>El pKa se lee donde dos curvas consecutivas se cortan (α = 0,5), porque ahí Ka = [H₃O⁺]. Son lecturas aproximadas de un gráfico: el segundo decimal no es confiable.</p>'
  }),'1) pKa ≈ 2,0 · 7,0 · 11,9 · 2) pKa ≈ 4,7 · 3) pKa ≈ 1,1 · 4,0');

  // ---------------------------------------------------------------- 16
  const row=(l,que,rxn,car)=>[l,que,rxn,car];
  S('g2-16',res({
   plan:'<p>Para cada sistema: (1) si hay dos sustancias, hacer primero las reacciones completas (neutralizaciones entre fuertes o de un fuerte con un débil, K enorme) con 1 mol de cada una; (2) ver qué queda; (3) describir: fuertes con →, débiles con ⇌ y su constante, la autoprotólisis siempre. Constantes de las tablas.</p>',
   cuali:table(['','Reacción completa previa','Qué queda y su equilibrio','Carácter'],[
    row('a','—',rx('NaNO3(s) -> Na^+(ac) + NO3^-(ac)')+'iones de fuertes: sin comportamiento ácido-base','neutra'),
    row('b','—',rx('NaNO2(s) -> Na^+(ac) + NO2^-(ac)')+rx('NO2^-(ac) + H2O(l) <=> HNO2(ac) + HO^-(ac)','Kb = 10⁻¹⁴/4,5·10⁻⁴ = 2,2·10⁻¹¹'),'básica'),
    row('c','—','dos ácidos fuertes, ambos totales: '+rx('HNO3(ac) + H2O(l) -> H3O^+(ac) + NO3^-(ac)')+rx('HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)'),'ácida'),
    row('d','—',rx('(CH3)3NHCl(s) -> (CH3)3NH^+(ac) + Cl^-(ac)')+rx('(CH3)3NH^+(ac) + H2O(l) <=> (CH3)3N(ac) + H3O^+(ac)','Ka = 10⁻¹⁴/6,4·10⁻⁵ = 1,6·10⁻¹⁰'),'ácida'),
    row('e','—','HNO₃ (fuerte, total) + Na⁺ y NO₃⁻ espectadores','ácida (manda el fuerte)'),
    row('f','—','HNO₂ y NO₂⁻, 1 mol de cada uno: par conjugado débil'+rx('HNO2(ac) + H2O(l) <=> NO2^-(ac) + H3O^+(ac)','Ka = 4,5·10⁻⁴'),'<b>reguladora</b>, pH = pKa = 3,35'),
    row('g','—',rx('CH3NH2(ac) + H2O(l) <=> CH3NH3^+(ac) + HO^-(ac)','Kb = 4,4·10⁻⁴'),'básica'),
    row('h',rx('CH3NH2(ac) + H3O^+(ac) -> CH3NH3^+(ac) + H2O(l)','1:1, completa'),'CH₃NH₃Cl: '+rx('CH3NH3^+(ac) + H2O(l) <=> CH3NH2(ac) + H3O^+(ac)','Ka = 2,3·10⁻¹¹'),'ácida (no regula: no queda base)'),
    row('i','—','base fuerte (Ca(OH)₂, total) + base débil; el HO⁻ del Ca(OH)₂ reprime a la metilamina (ion común)','básica'),
    row('j',rx('2 HO^-(ac) + 2 H3O^+(ac) -> 4 H2O(l)','1 mol Ca(OH)₂ = 2 mol HO⁻; 1 mol HCl'),'sobra 1 mol de HO⁻ (más Ca²⁺ y Cl⁻ espectadores)','básica (manda el fuerte)'),
    row('k',rx('HAc(ac) + HO^-(ac) -> Ac^-(ac) + H2O(l)','completa'),'1 mol Ac⁻ y sobra 1 mol HO⁻','básica (manda el fuerte)')])+
    tab('Ka HNO₂ (Tabla 1) · Kb trimetilamina y metilamina (Tabla 2).'),
   jus:'<p>Primero las reacciones completas (K muy grande); después se mira qué queda. Si sobra un electrolito fuerte, fija el carácter. Si sólo quedan iones de una sal, se mira de qué electrolito viene cada uno. Si quedan un ácido débil y su base conjugada en cantidades comparables (f), es reguladora.</p>'
  }),'Sólo (f) es reguladora; neutra a; ácidas c, d, e, h; básicas b, g, i, j, k');

  // ---------------------------------------------------------------- 19
  S('g2-19',res({
   plan:'<p>Se toman los sistemas del ítem 16 que <b>no</b> son reguladores (todos menos f) y se justifica el carácter del medio con lo que queda después de las reacciones completas.</p>',
   cuali:table(['Sistema','Qué queda','pH'],[['a NaNO₃','iones de fuertes','neutro (7 a 25 °C)'],['b NaNO₂','NO₂⁻ base débil','básico'],['c HNO₃ + HCl','dos ácidos fuertes','ácido'],['d (CH₃)₃NHCl','catión ácido débil','ácido'],['e NaNO₃ + HNO₃','ácido fuerte','ácido'],['g CH₃NH₂','base débil','básico'],['h CH₃NH₂ + HCl','CH₃NH₃⁺ ácido débil','ácido'],['i CH₃NH₂ + Ca(OH)₂','base fuerte (manda)','básico'],['j Ca(OH)₂ + HCl','sobra HO⁻','básico'],['k Ca(OH)₂ + HAc','sobra HO⁻ (y Ac⁻)','básico']]),
   jus:'<p>Cuando sobra un electrolito fuerte (e, i, j, k), él fija el pH. Si sólo quedan iones de una sal (a, b, d, h), el carácter lo da el ion que viene de un electrolito débil.</p>'
  }),'Neutro: a · ácidos: c, d, e, h · básicos: b, g, i, j, k');

  // ================================================================ BUFFER · Guía 2
  S('b-g2-15',res({
   plan:'<p>Se describe el sistema regulador (las dos sales y el par conjugado), se muestra qué pasa al agregar un ácido fuerte y una base fuerte, y se justifica por qué el pH cambia poco.</p>',
   datos:tab('Ka₂ del carbónico = 5,6·10⁻¹¹ (Tabla 1) → pKa₂ = 10,25.'),
   sist:sys({rx:[['NaHCO3(s) -> Na^+(ac) + HCO3^-(ac)','','sal: total'],['Na2CO3(s) -> 2 Na^+(ac) + CO3^2-(ac)','','sal: total'],['HCO3^-(ac) + H2O(l) <=> CO3^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{CO_3^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HCO_3^-}]}=5{,}6\times10^{-11}`],W],bm:[R`C_{\mathrm{HCO_3^-}}+C_{\mathrm{CO_3^{2-}}}=[\mathrm{H_2CO_3}]+[\mathrm{HCO_3^-}]+[\mathrm{CO_3^{2-}}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{HCO_3^-}]+2[\mathrm{CO_3^{2-}}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>Hay un par conjugado débil, HCO₃⁻/CO₃²⁻, con las dos formas en cantidad apreciable (requisito 1). Por ion común cada forma reprime la reacción de la otra con el agua, así que '+m(R`[\mathrm{H_3O^+}]=K_{a2}\frac{[\mathrm{HCO_3^-}]}{[\mathrm{CO_3^{2-}}]}`)+'.</p>'+
    rxs(['CO3^2-(ac) + H3O^+(ac) -> HCO3^-(ac) + H2O(l)','si se agrega ácido: lo consume la base del par'],['HCO3^-(ac) + HO^-(ac) -> CO3^2-(ac) + H2O(l)','si se agrega base: la consume el ácido del par'])+
    '<p>Lo fuerte que se agrega se transforma en la especie débil del par; sólo cambia un poco el cociente [CO₃²⁻]/[HCO₃⁻] y, como el pH depende del logaritmo de ese cociente, varía poco. Regula en pKa₂ ± 1 = 9,25 – 11,25 (relación 0,1–10), con máxima capacidad en pH 10,25.</p>',
   cuanti:ilu(chain([R`\text{0,10 M de cada una (1 L): }\mathrm{pH}=10{,}25+\log\frac{0{,}10}{0{,}10}=10{,}25`,'requisitos ✔ (0,05–1 M; relación 1)'],[R`\text{+ 0,010 mol HCl: }\mathrm{pH}=10{,}25+\log\frac{0{,}090}{0{,}110}=10{,}16\quad(\Delta=-0{,}09)`,'en agua pura el pH pasaría de 7 a 2']),'')+'',
   jus:'<p>Funciona porque tiene un ácido débil y su base conjugada en cantidades apreciables: el ácido fuerte agregado lo consume el CO₃²⁻ y la base fuerte la consume el HCO₃⁻, y el cociente que fija el pH cambia poco.</p>'
  }),'Par HCO₃⁻/CO₃²⁻: neutraliza lo agregado; regula en pH 10,25 ± 1');

  S('b-g2-18',res({
   plan:'<p>Se mezclan una base fuerte y un ácido débil: primero la neutralización (completa) en moles; después se ve qué queda y se evalúan los tres requisitos de una reguladora.</p>',
   datos:'<p>100 mL NaOH 0,2 M y 100 mL HAc 0,4 M → V total 200 mL. '+tab('Ka HAc = 1,8·10⁻⁵ (Tabla 1), pKa 4,74.')+'</p>',
   sist:rxs(['NaOH(s) -> Na^+(ac) + HO^-(ac)','base fuerte'],['HAc(ac) + HO^-(ac) -> Ac^-(ac) + H2O(l)','K = Ka/Kw = 1,8·10⁹: completa'],['HAc(ac) + H2O(l) <=> Ac^-(ac) + H3O^+(ac)','Ka = 1,8·10⁻⁵'],W),
   cuanti:chain(R`n_{\mathrm{HO^-}}=0{,}2\cdot100=20\ \mathrm{mmol}\qquad n_{\mathrm{HAc}}=0{,}4\cdot100=40\ \mathrm{mmol}`,[R`\text{quedan }20\ \mathrm{mmol\ HAc}\ \text{y}\ 20\ \mathrm{mmol\ Ac^-}\ \Rightarrow\ C_A=C_B=\frac{20}{200}=0{,}10\ \mathrm{M}`,'el HO⁻ es el limitante'],R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_B}{C_A}=4{,}74+\log1=4{,}74`),
   cuali:'<p><b>Requisitos:</b> (1) par conjugado débil HAc/Ac⁻ ✔; (2) 0,10 M cada uno, dentro de 0,05–1 M ✔; (3) relación 1, dentro de 0,1–10 ✔. Por ion común, el HAc casi no se disocia y el Ac⁻ casi no hidroliza: es razonable suponer [H₃O⁺] y [HO⁻] bajas respecto de C_A y C_B.</p>',
   verif:ver('<p>[H₃O⁺] = 1,8·10⁻⁵ M frente a 0,10 M: 0,018 % ✔.</p>'),
   jus:'<p>Sí es reguladora: se neutralizó la mitad del ácido y quedaron HAc y Ac⁻ en igual concentración (0,10 M). pH = pKa = 4,74: máxima capacidad reguladora.</p>'
  }),'Sí: HAc/Ac⁻ 0,10 M cada uno, pH = pKa = 4,74 (máxima capacidad)');

  S('b-g2-20',res({
   plan:'<p>Del ítem 16 sólo (f), NaNO₂ + HNO₂ (1 mol de cada uno), es reguladora. Se muestra cómo neutraliza un agregado de ácido y uno de base.</p>',
   datos:tab('Ka HNO₂ = 4,5·10⁻⁴ (Tabla 1) → pKa 3,35.'),
   sist:rxs(['HNO2(ac) + H2O(l) <=> NO2^-(ac) + H3O^+(ac)','Ka = 4,5·10⁻⁴'],['NO2^-(ac) + H3O^+(ac) -> HNO2(ac) + H2O(l)','agrego ácido fuerte'],['HNO2(ac) + HO^-(ac) -> NO2^-(ac) + H2O(l)','agrego base fuerte']),
   cuanti:ilu(chain([R`\text{1 mol de cada uno + 0,1 mol HCl: }\mathrm{pH}=3{,}35+\log\frac{0{,}9}{1{,}1}=3{,}26`,'baja 0,09'],[R`\text{1 mol de cada uno + 0,1 mol NaOH: }\mathrm{pH}=3{,}35+\log\frac{1{,}1}{0{,}9}=3{,}44`,'sube 0,09'])),
   jus:'<p>El ácido agregado lo consume el NO₂⁻ (base del par) y la base agregada la consume el HNO₂ (ácido del par). Sólo cambia un poco el cociente [NO₂⁻]/[HNO₂]: el pH casi no varía mientras lo agregado sea menor que los moles del componente que lo consume.</p>'
  }),'Sólo (f): el NO₂⁻ consume el ácido y el HNO₂ la base; pH ≈ 3,35');

  S('b-g2-21',res({
   plan:'<p>Se hace la neutralización en moles (base fuerte con ácido débil, completa), se ve qué sobra y se compara con el pH informado. Después se evalúan los requisitos de reguladora.</p>',
   datos:'<p>100 mL Ca(OH)₂ 0,25 M y 50 mL de ácido cloroacético 0,5 M. V total = 150 mL.</p>',
   sist:rxs(['Ca(OH)2(s) -> Ca^2+(ac) + 2 HO^-(ac)','base fuerte'],['ClCH2COOH(ac) + HO^-(ac) -> ClCH2COO^-(ac) + H2O(l)','completa (K = Ka/Kw ≫ 1)']),
   cuanti:chain(R`n_{\mathrm{HO^-}}=2\cdot0{,}25\cdot100=50\ \mathrm{mmol}\qquad n_{\text{ácido}}=0{,}5\cdot50=25\ \mathrm{mmol}`,[R`\text{sobran }25\ \mathrm{mmol\ HO^-}\ \Rightarrow\ [\mathrm{HO^-}]=\frac{25}{150}=0{,}167\ \mathrm{M}`,'el ácido es el limitante'],R`\mathrm{pOH}=0{,}78\ \Rightarrow\ \mathrm{pH}=13{,}22`),
   cuali:inc('a','¿Es posible pH 8,5?','<p><b>No.</b> Sobra base fuerte: el pH lo fija el exceso de HO⁻ (≈ 13,2). El cloroacetato (base débil, Kb = 7,1·10⁻¹²) no cambia nada frente a 0,167 M de HO⁻ (ion común).</p>')+
    inc('b','¿Es reguladora?','<p><b>No.</b> El ácido débil se consumió por completo: no queda el componente ácido del par (requisito 1) y manda la base fuerte en exceso.</p>')+
    note('Un detalle del enunciado','<p>Con el Kps del Ca(OH)₂ (5,5·10⁻⁶, Tabla 5) su solubilidad es ≈ 1,1·10⁻² M: una solución 0,25 M no es posible a 25 °C. Se resuelve como indica la guía, suponiendo que todo el Ca(OH)₂ está disuelto.</p>'),
   jus:'<p>Hay 50 mmol de HO⁻ y 25 mmol de ácido: sobran 25 mmol de base fuerte y el pH es 13,2, no 8,5. No es reguladora porque no queda ácido débil.</p>'
  }),'a) No: pH ≈ 13,2 (sobra base fuerte) · b) No');

  S('b-g2-22',res({
   plan:'<p>Se revisa cada afirmación con los requisitos de una reguladora (par conjugado con las dos formas apreciables) y con lo que hace cada especie en agua.</p>',
   cuali:inc('a','“Una solución de NH₄Cl es capaz de regular el pH” → FALSO',rx('NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','Ka = 5,56·10⁻¹⁰')+'<p>Sólo hay NH₄⁺; el NH₃ que forma por hidrólisis es despreciable (en NH₄Cl 0,10 M, 7,5·10⁻⁶ M). Falta el componente básico del par en cantidad apreciable.</p>')+
    inc('b','“Una solución de amoníaco es ácida porque tiene amonios” → FALSO',rx('NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb = 1,8·10⁻⁵')+'<p>Los NH₄⁺ se forman junto con la misma cantidad de HO⁻ (BC: [NH₄⁺] + [H₃O⁺] = [HO⁻]): [HO⁻] &gt; [H₃O⁺], la solución es <b>básica</b>. Que haya NH₄⁺ no la hace ácida.</p>')+
    inc('c','“Una solución de H₂S es capaz de regular el pH” → FALSO',rx('H2S(ac) + H2O(l) <=> HS^-(ac) + H3O^+(ac)','Ka₁ = 9,5·10⁻⁸ (Tabla 1)')+'<p>Es un ácido débil solo: en H₂S 0,1 M, [HS⁻] ≈ 10⁻⁴ M, apenas el 0,1 % del H₂S. No hay par conjugado en cantidades comparables.</p>'),
   jus:'<p>Las tres son falsas. Una reguladora necesita las dos formas del par conjugado en cantidades apreciables: el NH₄Cl solo y el H₂S solo no las tienen; y una solución de NH₃ es básica aunque tenga NH₄⁺.</p>'
  }),'a) F · b) F (es básica) · c) F');

  // ================================================================ COMPLEJOS · Guía 2 (8 y 17)
  S('c-g4-g2-8',res({
   plan:'<p>Hay que identificar qué parte del HCl es la responsable de disolver el AgCl: el H₃O⁺ o el Cl⁻. Si es el Cl⁻ (formando un clorocomplejo), cualquier fuente de Cl⁻ en concentración alta sirve.</p>',
   datos:tab('Kps AgCl = 1,8·10⁻¹⁰ (Tabla 5).'),
   sist:rxs(['AgNO3(s) -> Ag^+(ac) + NO3^-(ac)','sal soluble'],['Ag^+(ac) + Cl^-(ac) <=> AgCl(s)','Q &gt; Kps: precipitado blanco'],['AgCl(s) + Cl^-(ac) <=> [AgCl2]^-(ac)','con mucho Cl⁻: complejo soluble'],['NaCl(s) -> Na^+(ac) + Cl^-(ac)','electrolito fuerte: aporta Cl⁻']),
   cuali:'<p>La disolución se debe al Cl⁻ en gran exceso, que forma el clorocomplejo y baja la Ag⁺ libre (Q &lt; Kps, Le Châtelier). El H₃O⁺ del HCl no participa: el AgCl no se disuelve en ácidos porque el Cl⁻ es conjugado de un ácido fuerte y no se protona. El Na⁺ es espectador.</p><p><b>Sí</b> se puede reemplazar por NaCl, siempre que se alcance una [Cl⁻] igual de alta. El NaCl es muy soluble (≈ 36 g en 100 mL de agua, unos 6 M), lo que alcanza para formar los clorocomplejos.</p>',
   jus:'<p>Lo que disuelve el AgCl es el Cl⁻ en exceso (forma [AgCl₂]⁻), no el H₃O⁺. El NaCl aporta Cl⁻ igual que el HCl, con Na⁺ espectador: sirve si la [Cl⁻] es igual de alta.</p>'
  }),'Sí, el NaCl sirve si se logra la misma [Cl⁻] alta (el que disuelve es el Cl⁻)');

  S('c-g4-g2-17',res({
   plan:'<p>Es la misma secuencia que en la Guía 1 (ej. 3), pero el reactivo es un <b>buffer</b> NH₃/NH₄Cl equimolar. Hay que esquematizar los pasos, decir cuándo el sistema está fuera del equilibrio y explicar por qué unas gotas de HNO₃ no cambian nada: el buffer amortigua.</p>',
   datos:tab('Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Kps Cu(OH)₂ = 2,2·10⁻²⁰ (Tabla 5) · Kf [Cu(NH₃)₄]²⁺ = 1,1·10¹³ (Guía 4).'),
   cuali:inc('a','Sucesión de eventos y equilibrio',
     step('Paso 1 · CuSO₄ en agua (azul)',rxs(['CuSO4(s) -> Cu^2+(ac) + SO4^2-(ac)','total'],['Cu^2+(ac) + 4 H2O(l) -> [Cu(H2O)4]^2+(ac)','acuocomplejo']))+
     step('Paso 2 · NH₃/NH₄Cl: precipitado celeste',rxs(['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Cu^2+(ac) + 2 HO^-(ac) <=> Cu(OH)2(s)','Kps'])+'<p>El buffer equimolar fija pH ≈ pKa = 9,26 ([HO⁻] ≈ 1,8·10⁻⁵ M): Q = [Cu²⁺][HO⁻]² supera el Kps y precipita.</p>')+
     step('Paso 3 · más solución: se disuelve (azul intenso)',rxs(['Cu^2+(ac) + 4 NH3(ac) <=> [Cu(NH3)4]^2+(ac)','Kf = 1,1·10¹³'],['Cu(OH)2(s) + 4 NH3(ac) <=> [Cu(NH3)4]^2+(ac) + 2 HO^-(ac)','K = Kps·Kf = 2,4·10⁻⁷']))+
     step('Paso 4 · 5 gotas de HNO₃ 0,1 M: sin cambios',rx('NH3(ac) + H3O^+(ac) -> NH4^+(ac) + H2O(l)','lo consume el buffer'))+
     '<p><b>¿Equilibrio?</b> Cada agregado saca al sistema del equilibrio por un instante (Q ≠ K): al precipitar, Q &gt; Kps; al disolverse, Q &lt; Kps con sólido presente. Después de cada reajuste el sistema vuelve a estar en equilibrio.</p>')+
    inc('b','Justificación de los cambios','<p><b>Precipitación:</b> el HO⁻ del buffer amoniacal supera el Kps del Cu(OH)₂. <b>Disolución:</b> el NH₃ en exceso forma el tetraamincobre(II) (Kf grande), baja el Cu²⁺ libre (Q &lt; Kps) y, por Le Châtelier, se disuelve el sólido. El NH₄⁺ no compleja (no tiene par libre).</p>'+M(R`\text{BC: }2[\mathrm{Cu^{2+}}]+2[\mathrm{Cu(NH_3)_4^{2+}}]+[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=2[\mathrm{SO_4^{2-}}]+[\mathrm{Cl^-}]+[\mathrm{HO^-}]`))+
    inc('c','¿Por qué no hubo cambios con el HNO₃?','<p>El sistema NH₃/NH₄⁺ es una reguladora: el H₃O⁺ agregado (unas 5·0,05 mL·0,1 M ≈ 2,5·10⁻² mmol) lo consume el NH₃, que está en una cantidad muchísimo mayor. El pH y la [NH₃] libre casi no cambian, así que el complejo no se destruye. Con mucho más ácido (agotando el NH₃) sí se destruiría, como en la Guía 1.</p>'),
   jus:'<p>Precipita Cu(OH)₂ (Q &gt; Kps por el HO⁻ del buffer), se disuelve como [Cu(NH₃)₄]²⁺ (Kf grande, Q &lt; Kps) y el buffer amortigua las gotas de HNO₃: no cambian ni el pH ni el NH₃ libre.</p>'
  }),'Precipita Cu(OH)₂, se disuelve como [Cu(NH₃)₄]²⁺ y el buffer NH₃/NH₄⁺ amortigua el HNO₃');
})();
