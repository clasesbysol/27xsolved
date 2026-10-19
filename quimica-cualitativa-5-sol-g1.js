// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 1 (conceptos introductorios).
// Guía conceptual: se justifica con los conceptos (electrolitos, Le Châtelier, ion común, Kps, Kf, teorías
// ácido-base). Constantes del enunciado; si no las da, tablas del apéndice.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;

  // ---------------------------------------------------------------- 1
  S('g1-1',res({
   plan:'<p>Es un equilibrio de precipitación (heterogéneo) al que se le agrega un ácido que aporta un ion del precipitado. Primero describimos el equilibrio del sulfato de bario con su solución (a), después qué aporta el H₂SO₄ y cómo responde el equilibrio (b): Le Châtelier por ion común y comparación de Q con Kps.</p>',
   datos:'<p>Sólido: BaSO₄(s). Sobrenadante: solución saturada (en equilibrio con el sólido). Reactivo agregado: H₂SO₄ (1.ª disociación fuerte; 2.ª débil). '+tab('Kps BaSO₄ = 1,1·10⁻¹⁰ (Tabla 5) · Ka₂ = 1,2·10⁻² (Tabla 1).')+'</p>',
   sist:sys({rx:[['BaSO4(s) <=> Ba^2+(ac) + SO4^2-(ac)',R`K_{ps}=[\mathrm{Ba^{2+}}][\mathrm{SO_4^{2-}}]=1{,}1\times10^{-10}`],['H2SO4(ac) + H2O(l) -> HSO4^-(ac) + H3O^+(ac)','','1.ª disociación: total'],['HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{SO_4^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HSO_4^-}]}=1{,}2\times10^{-2}`],W]}),
   cuali:X.inc('a','¿Por qué el BaSO₄ no se disuelve en agua?',
     '<p>El BaSO₄ es un compuesto iónico cuya red cristalina es muy estable: la energía que liberaría la hidratación de los iones Ba²⁺ y SO₄²⁻ no alcanza para compensar la energía de red. Por eso, en contacto con agua, se disuelve muy poco y se establece el equilibrio heterogéneo de arriba. Su Kps es <b>muy bajo</b> (10⁻¹⁰):</p>'+
     chain(R`K_{ps}=s\cdot s=s^2\ \Rightarrow\ s=\sqrt{1{,}1\times10^{-10}}=1{,}0\times10^{-5}\ \mathrm{M}\ (\approx2{,}4\ \mathrm{mg/L})`)+
     '<p>Lo poco que se disuelve <b>está totalmente disociado</b> (es un electrolito fuerte poco soluble, no un electrolito débil). El sobrenadante está saturado: Q = Kps, el sistema está en equilibrio.</p>')+
    X.inc('b','¿Por qué aumenta la cantidad de sal al agregar H₂SO₄?',
     '<p>El H₂SO₄ se disocia totalmente en la 1.ª etapa y, en la 2.ª (débil, pero con Ka₂ alta), aporta SO₄²⁻: <b>ion común</b> del equilibrio de solubilidad. En el instante del agregado el sistema sale del equilibrio:</p>'+
     M(R`Q=[\mathrm{Ba^{2+}}][\mathrm{SO_4^{2-}}]>K_{ps}`,'aumentó [SO₄²⁻]')+
     lc('BaSO4(s) <=> Ba^2+(ac) + SO4^2-(ac)','se agrega SO₄²⁻ (ion común)','←',[['[SO₄²⁻]','↑ (respecto del agua pura)'],['[Ba²⁺]','↓'],['BaSO₄(s)','↑']],'Por Le Châtelier el equilibrio se desplaza hacia el sólido: precipita BaSO₄ hasta que Q vuelve a ser igual a Kps. La [Ba²⁺] en solución baja y la cantidad de sólido aumenta.')+
     note('¿Y el H₃O⁺ del ácido?','<p>Podría protonar algo de SO₄²⁻ (SO₄²⁻(ac) + H₃O⁺(ac) ⇌ HSO₄⁻(ac) + H₂O(l)), pero el sulfato es una base muy débil (Kb = Kw/Ka₂ = 8,3·10⁻¹³): ese efecto es chico frente al aporte de sulfato. Por eso el BaSO₄ <b>no</b> se disuelve en ácidos.</p>')),
   jus:('<p>a) El BaSO₄ es una sal poco soluble (Kps = 1,1·10⁻¹⁰): en contacto con agua se establece el equilibrio heterogéneo con una solubilidad de 10⁻⁵ M; lo disuelto está totalmente disociado. b) El H₂SO₄ aporta SO₄²⁻ (ion común): Q &gt; Kps y, por Le Châtelier, el equilibrio se desplaza hacia el sólido, que aumenta.</p>')
  }),'a) Kps muy bajo: s ≈ 1,0·10⁻⁵ M · b) ion común SO₄²⁻: Q &gt; Kps, precipita más BaSO₄');

  // ---------------------------------------------------------------- 2
  S('g1-2',res({
   plan:'<p>En los dos casos hay un electrolito fuerte (HCl) y uno débil (HAc) que comparten el ion H₃O⁺. Hay que analizar qué le hace cada uno a la disociación del otro: el fuerte no tiene equilibrio que desplazar; el débil sí, y el H₃O⁺ del fuerte es su ion común.</p>',
   sist:sys({rx:[['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','','electrolito fuerte: total, sin K'],['HAc(ac) + H2O(l) <=> Ac^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{Ac^-}][\mathrm{H_3O^+}]}{[\mathrm{HAc}]}=1{,}8\times10^{-5}`],W],bm:[R`C_{\mathrm{HCl}}=[\mathrm{Cl^-}]\qquad C_{\mathrm{HAc}}=[\mathrm{HAc}]+[\mathrm{Ac^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{Ac^-}]+[\mathrm{HO^-}]`]})+X.tab('Ka HAc = 1,8·10⁻⁵ (Tabla 1).'),
   cuali:inc('a','Disociación del HCl en presencia de HAc','<p>El HCl es un electrolito fuerte: se disocia <b>totalmente</b> y no está en equilibrio con sus iones (se escribe →, sin constante). Por eso el H₃O⁺ que aporta el acético <b>no puede</b> retrogradar su disociación: no hay equilibrio que desplazar. La disociación del HCl no se modifica: sigue siendo total.</p>')+
    inc('b','Disociación del HAc en presencia de HCl','<p>El HAc es un electrolito débil: está en equilibrio con sus iones. El HCl aporta mucho H₃O⁺, que es un <b>producto</b> de ese equilibrio (ion común):</p>'+
     lc('HAc(ac) + H2O(l) <=> Ac^-(ac) + H3O^+(ac)','se agrega H₃O⁺ (del HCl)','←',[['[H₃O⁺]','↑'],['[Ac⁻]','↓'],['[HAc]','↑']],'Por Le Châtelier el equilibrio se desplaza hacia los reactivos: el acético se disocia todavía menos (su grado de disociación α baja).'))+
    ilu(chain([R`\text{HAc 0,10 M solo: }[\mathrm{Ac^-}]=\sqrt{K_aC}=1{,}34\times10^{-3}\ \mathrm{M}\ \Rightarrow\ \alpha=1{,}3\,\%`,'C/Ka &gt; 100, verificado 1,3 % ≤ 5 %'],[R`\text{con HCl 0,10 M: }[\mathrm{Ac^-}]=\frac{K_aC}{[\mathrm{H_3O^+}]}=\frac{1{,}8\times10^{-5}\cdot0{,}10}{0{,}10}=1{,}8\times10^{-5}\ \mathrm{M}\ \Rightarrow\ \alpha=0{,}018\,\%`,'[H₃O⁺] ≈ 0,10 la fija el HCl'])+'<p>La disociación del acético baja unas 75 veces.</p>'),
   jus:('<p>a) El HCl es electrolito fuerte: disociación total, sin equilibrio; el acético no la afecta. b) El H₃O⁺ del HCl es ion común del equilibrio del acético: por Le Châtelier lo desplaza hacia el ácido sin disociar y el grado de disociación del HAc disminuye.</p>')
  }),'a) no cambia (sigue total) · b) disminuye por ion común (H₃O⁺)');

  // ---------------------------------------------------------------- 3
  const cuSec=step('Paso 1 · Sulfato cúprico en agua (azul)',rxs(['CuSO4(s) -> Cu^2+(ac) + SO4^2-(ac)','sal soluble: electrolito fuerte, total'],['Cu^2+(ac) + 4 H2O(l) -> [Cu(H2O)4]^2+(ac)','el ion se hidrata: color azul'])+'<p>Equilibrio: sí (la autoprotólisis del agua y la leve hidrólisis ácida del Cu²⁺ hidratado están en equilibrio).</p>')+
   step('Paso 2 · Primeras gotas de NH₃: precipitado celeste',rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb = 1,8·10⁻⁵'],['Cu^2+(ac) + 2 HO^-(ac) <=> Cu(OH)2(s)','1/Kps · Kps = 2,2·10⁻²⁰'])+'<p>En el instante del agregado el sistema está <b>fuera del equilibrio</b>: el NH₃ genera HO⁻ y '+m(R`Q=[\mathrm{Cu^{2+}}][\mathrm{HO^-}]^2>K_{ps}`)+'. Evoluciona precipitando Cu(OH)₂ hasta que Q = Kps (nuevo equilibrio).</p>')+
   step('Paso 3 · Exceso de NH₃: se disuelve el precipitado (azul intenso)',rxs(['Cu^2+(ac) + 4 NH3(ac) <=> [Cu(NH3)4]^2+(ac)','Kf = 1,1·10¹³'],['Cu(OH)2(s) + 4 NH3(ac) <=> [Cu(NH3)4]^2+(ac) + 2 HO^-(ac)','K = Kps·Kf = 2,4·10⁻⁷'])+'<p>Cada agregado vuelve a sacar al sistema del equilibrio; al aumentar [NH₃] se forma el complejo tetraamincobre(II), muy estable (Kf grande), que baja el Cu²⁺ libre: '+m(R`Q<K_{ps}`)+' y el sólido se disuelve hasta desaparecer. Al final el sistema está en equilibrio (sin sólido).</p>');
  S('g1-3',res({
   plan:'<p>Es una secuencia de equilibrios: disolución de una sal soluble, precipitación de un hidróxido por la base débil y disolución de ese precipitado por formación de un complejo. En cada agregado el sistema sale del equilibrio y evoluciona hasta uno nuevo; se justifica con Le Châtelier, Q frente a Kps y el valor de Kf.</p>',
   datos:tab('Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Kps Cu(OH)₂ = 2,2·10⁻²⁰ (Tabla 5) · Kf [Cu(NH₃)₄]²⁺ = 1,1·10¹³ (dato de la Guía 4, integración 1) · Ka NH₄⁺ = 5,56·10⁻¹⁰.'),
   cuali:inc('a','Sucesión de eventos y equilibrio',cuSec)+
    inc('b','¿Por qué el sulfato cúprico se disuelve en agua?','<p>Es un compuesto iónico cuyos iones se hidratan muy bien: el agua es polar y rodea al Cu²⁺ (catión pequeño y de carga 2+) y al SO₄²⁻ con interacciones ion-dipolo; la energía de hidratación compensa la energía de red. Por eso es una <b>sal soluble</b> y, además, un <b>electrolito fuerte</b>: lo disuelto queda totalmente como iones (se escribe →).</p>')+
    inc('c','Justificación teórica de los cambios',flow([['Precipitación','el NH₃ es base débil: su equilibrio con el agua genera HO⁻. Con el Cu²⁺ presente, Q supera el Kps del Cu(OH)₂ (Kps muy bajo) y precipita.'],['Disolución','el NH₃ en exceso actúa como ligando (base de Lewis: dona el par libre del N al Cu²⁺, ácido de Lewis). El complejo es muy estable (Kf = 1,1·10¹³): consume Cu²⁺ libre, Q del hidróxido queda por debajo del Kps y, por Le Châtelier, el sólido se disuelve.'],['Color','el cambio de ligandos (H₂O → NH₃) alrededor del Cu²⁺ cambia el color: celeste del acuocomplejo, azul intenso del amincomplejo.']]))+
    inc('d','¿Por qué vuelve el azul original al agregar HCl?',rxs(['NH3(ac) + H3O^+(ac) -> NH4^+(ac) + H2O(l)','K = 1/Ka(NH₄⁺) = 1,8·10⁹: prácticamente completa'],['[Cu(NH3)4]^2+(ac) + 4 H3O^+(ac) <=> Cu^2+(ac) + 4 NH4^+(ac) + 4 H2O(l)','K = (1/Kf)/Ka⁴ = 9,5·10²³'])+'<p>El H₃O⁺ protona el NH₃ libre: el NH₄⁺ ya no tiene par libre y no puede coordinarse al cobre. Al bajar [NH₃], por Le Châtelier el complejo se disocia y vuelve el Cu²⁺ hidratado (azul). En medio ácido [HO⁻] es muy baja, así que el Cu(OH)₂ no reprecipita.</p>'+M(R`K=\frac{K_i}{K_a^{\,4}}=\frac{1/1{,}1\times10^{13}}{(5{,}56\times10^{-10})^4}=\frac{9{,}1\times10^{-14}}{9{,}6\times10^{-38}}=9{,}5\times10^{23}\gg1`)),
   jus:('<p>Cada agregado saca al sistema del equilibrio (Q ≠ K) y evoluciona hasta un nuevo equilibrio. Precipita Cu(OH)₂ porque el HO⁻ del NH₃ hace Q &gt; Kps; se disuelve porque el complejo con NH₃ (Kf grande) baja el Cu²⁺ libre (Q &lt; Kps); el HCl destruye el complejo porque protona el ligando (K global ≫ 1).</p>')
  }),'CuSO₄ soluble → Cu(OH)₂(s) (Q &gt; Kps) → [Cu(NH₃)₄]²⁺ (Kf grande, Q &lt; Kps) → con HCl, NH₃(ac) → NH₄⁺(ac) y vuelve el Cu²⁺');

  // ---------------------------------------------------------------- 4
  S('g1-4',res({
   plan:'<p>Primero precipita AgCl (Q &gt; Kps). Al seguir agregando HCl concentrado, el exceso de Cl⁻ actúa como ligando y forma clorocomplejos de plata, que bajan la Ag⁺ libre y disuelven el sólido. Después se escriben las expresiones de la ley de acción de masas del sistema final.</p>',
   datos:tab('Kps AgCl = 1,8·10⁻¹⁰ (Tabla 5). La constante de los clorocomplejos no figura en las tablas: se trabaja con su expresión (β₂).'),
   sist:rxs(['AgNO3(s) -> Ag^+(ac) + NO3^-(ac)','sal soluble: total'],['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','ácido fuerte: total'],['Ag^+(ac) + Cl^-(ac) <=> AgCl(s)','precipitado blanco (1/Kps)'],['AgCl(s) + Cl^-(ac) <=> [AgCl2]^-(ac)','con Cl⁻ en gran exceso: se disuelve']),
   cuali:inc('a','¿Por qué se disolvió el precipitado?','<p>Con las primeras gotas, '+m(R`Q=[\mathrm{Ag^+}][\mathrm{Cl^-}]>K_{ps}`)+' (Ag⁺ 0,1 M): precipita AgCl. Al seguir agregando HCl <b>concentrado</b>, la [Cl⁻] se vuelve muy alta y el Cl⁻ actúa como <b>ligando</b> (base de Lewis) frente a la Ag⁺ (ácido de Lewis): se forma el complejo [AgCl₂]⁻ (y con más Cl⁻ aún, [AgCl₃]²⁻ y [AgCl₄]³⁻). El complejo consume Ag⁺ libre:</p>'+
     lc('AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','la Ag⁺ libre se consume formando [AgCl₂]⁻','→',[['[Ag⁺] libre','↓'],['AgCl(s)','↓']],'Q &lt; Kps: por Le Châtelier el sólido se disuelve. No es que “cambie la solubilidad por el ion común”: a [Cl⁻] baja el Cl⁻ es ion común (disminuye la solubilidad), pero a [Cl⁻] muy alta predomina la formación del complejo.'))+
    inc('b','Expresiones de la ley de acción de masas del sistema final',
     '<p>Al final el precipitado se disolvió por completo: en solución hay Ag⁺ (muy poca), [AgCl₂]⁻, Cl⁻, NO₃⁻, H₃O⁺ y HO⁻.</p>'+
     M(R`\beta_2=\frac{[\mathrm{AgCl_2^-}]}{[\mathrm{Ag^+}][\mathrm{Cl^-}]^2}\qquad K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`)+
     M(R`K_{ps}=[\mathrm{Ag^+}][\mathrm{Cl^-}]\ \text{(sólo si queda sólido; sin sólido, }Q=[\mathrm{Ag^+}][\mathrm{Cl^-}]<K_{ps})`)+
     M(R`\text{BM: }C_{\mathrm{Ag}}=[\mathrm{Ag^+}]+[\mathrm{AgCl_2^-}]\qquad C_{\mathrm{Cl}}=[\mathrm{Cl^-}]+2[\mathrm{AgCl_2^-}]`)+
     M(R`\text{BC: }[\mathrm{Ag^+}]+[\mathrm{H_3O^+}]=[\mathrm{NO_3^-}]+[\mathrm{Cl^-}]+[\mathrm{AgCl_2^-}]+[\mathrm{HO^-}]`)+
     '<p>El HCl y el AgNO₃ no tienen expresión de K: son electrolitos fuertes (disociación total).</p>'),
   jus:('<p>El AgCl precipita porque Q &gt; Kps. Con Cl⁻ en gran exceso el cloruro actúa como ligando y forma [AgCl₂]⁻: baja la Ag⁺ libre, Q &lt; Kps y por Le Châtelier el sólido se disuelve.</p>')
  }),'Precipita AgCl y se redisuelve como [AgCl₂]⁻ (Cl⁻ en gran exceso como ligando)');

  // ---------------------------------------------------------------- 5
  S('g1-5',res({
   plan:'<p>Hay que mostrar que el Fe³⁺ genera H₃O⁺ en agua. Lo hacemos con Brønsted-Lowry (el acuocomplejo cede un protón al agua) y lo completamos con Lewis (el Fe³⁺ acepta pares del agua); al final se conecta con la precipitación del hidróxido.</p>',
   sist:rxs(['FeCl3(s) -> Fe^3+(ac) + 3 Cl^-(ac)','sal soluble: total (ejemplo de sal férrica)'],['Fe^3+(ac) + 6 H2O(l) -> [Fe(H2O)6]^3+(ac)','hidratación: el Fe³⁺ (ácido de Lewis) acepta pares de los O del agua'],['[Fe(H2O)6]^3+(ac) + H2O(l) <=> [Fe(OH)(H2O)5]^2+(ac) + H3O^+(ac)','Ka ≈ 6·10⁻³ (bibliografía; no figura en las tablas)'],['Fe^3+(ac) + 3 HO^-(ac) <=> Fe(OH)3(s)','Kps = 4·10⁻³⁸ (Tabla 5)'],W),
   cuali:'<p><b>Brønsted-Lowry:</b> el ion hexaacuohierro(III) es un ácido: cede un H⁺ a una molécula de agua (que actúa como base) y forma H₃O⁺. Los pares conjugados son [Fe(H₂O)₆]³⁺/[Fe(OH)(H₂O)₅]²⁺ y H₃O⁺/H₂O. La solución resulta ácida.</p><p><b>Por qué cede el protón (Lewis):</b> el Fe³⁺ es pequeño y de carga alta; al coordinarse con el O del agua atrae fuertemente su densidad electrónica, debilita el enlace O–H y facilita que el H⁺ pase al solvente.</p><p><b>Relación con el hidróxido:</b> si se sigue sacando H⁺ (subiendo el pH), se llega al Fe(OH)₃, de Kps bajísimo, que precipita: por eso se dice que el catión “precipita como hidróxido”.</p>'+warn('Arrhenius no sirve acá','<p>El Fe³⁺ no tiene H en su fórmula: con la definición de Arrhenius (libera H⁺ propios) no se podría explicar su acidez. Hace falta Brønsted (con el acuocomplejo) o Lewis.</p>'),
   jus:('<p>Con Brønsted-Lowry, el [Fe(H₂O)₆]³⁺ es un ácido débil (Ka ≈ 6·10⁻³) que cede H⁺ al agua y forma H₃O⁺. Con Lewis, el Fe³⁺ es aceptor de pares: polariza el agua coordinada y debilita el O–H. El producto final de esa hidrólisis es el Fe(OH)₃, muy poco soluble.</p>')
  }),'[Fe(H₂O)₆]³⁺(ac) + H₂O(l) ⇌ [Fe(OH)(H₂O)₅]²⁺(ac) + H₃O⁺(ac): ácido de Brønsted (y aceptor de pares de Lewis)');

  // ---------------------------------------------------------------- 6
  S('g1-6',res({
   plan:'<p>En Lewis, un <b>ácido</b> acepta un par de electrones y una <b>base</b> lo dona. Para cada sustancia se arma la estructura de Lewis, se buscan los pares libres (posibles donadores) y los centros deficientes en electrones o los H⁺ que puede ceder (aceptores).</p>',
   cuali:table(['Sustancia','Estructura de Lewis (descripción)','Pares libres / aceptores','Carácter (Lewis)'],[
    ['Pirrolidina (C₄H₈NH)','anillo de 4 C y 1 N; el N une 2 C y 1 H y conserva <b>un par libre</b>','el par libre del N puede donarse (por ejemplo a un H⁺ o a un catión metálico)','<b>base de Lewis</b> (amina secundaria)'],
    ['Ácido fosfórico (H₃PO₄)','P central unido a 4 O: uno doble (P=O) y tres O–H; cada O conserva pares libres','el H⁺ que libera es un ácido de Lewis (acepta un par del agua); los O tienen pares libres, pero muy poco disponibles','<b>ácido</b> (cede H⁺: H₃PO₄(ac) + H₂O(l) ⇌ H₂PO₄⁻(ac) + H₃O⁺(ac), Ka₁ = 7,5·10⁻³)'],
    ['Etanol (CH₃CH₂OH)','O unido a C y H con <b>dos pares libres</b>','los pares del O pueden donarse; el H del O–H es muy poco ácido en agua','<b>base de Lewis débil</b> (prácticamente neutro en agua)']])+
    rxs(['C4H8NH(ac) + H2O(l) <=> C4H8NH2^+(ac) + HO^-(ac)','la pirrolidina dona su par al H⁺ del agua: base'],['H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)','Ka₁ = 7,5·10⁻³ (Tabla 1): ácido'])+
    note('Ácidos de Brønsted dentro de Lewis','<p>En Lewis el aceptor estricto es el H⁺; un ácido como el H₃PO₄ se considera ácido porque es la fuente de ese H⁺ (aceptor de pares). La teoría de Lewis es más general: incluye también ácidos sin H, como los cationes metálicos.</p>'),
   jus:('<p>Pirrolidina: base de Lewis por el par libre del N. Ácido fosfórico: ácido (cede H⁺, que acepta un par del agua). Etanol: base de Lewis muy débil por los pares libres del O; en agua prácticamente no modifica el pH.</p>')
  }),'Pirrolidina: base · ácido fosfórico: ácido · etanol: base de Lewis muy débil');

  // ---------------------------------------------------------------- 7
  S('g1-7',res({
   plan:'<p>La ley de acción de masas describe <b>equilibrios</b>. Hay que ver si cada compuesto, en agua, establece un equilibrio con sus iones.</p>',
   sist:rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','base débil: equilibrio'],['NaOH(s) -> Na^+(ac) + HO^-(ac)','base fuerte: disociación total'],W),
   cuali:'<p><b>Amoníaco:</b> es un electrolito débil; sólo una fracción reacciona con el agua y coexisten NH₃, NH₄⁺ y HO⁻ en equilibrio. <b>Sí</b> se aplica la ley de acción de masas:</p>'+M(R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}=1{,}8\times10^{-5}`)+'<p><b>Hidróxido de sodio:</b> es un electrolito fuerte; se disocia totalmente y no queda NaOH sin disociar en equilibrio con sus iones. Su disociación <b>no</b> se describe con una constante (sería prácticamente infinita): se trata con estequiometría ([HO⁻] = C).</p><p>En las dos soluciones sí se aplica la ley de acción de masas a la <b>autoprotólisis del agua</b> (Kw), que está siempre.</p>',
   jus:('<p>La ley de acción de masas se aplica a sistemas en equilibrio: al NH₃ (base débil, Kb) sí; a la disociación del NaOH (base fuerte, total) no. En ambos casos sí a la autoprotólisis del agua.</p>')
  }),'NH₃: sí (Kb) · NaOH: no para su disociación (total); en ambos, sí para Kw');

  // ---------------------------------------------------------------- 8
  S('g1-8',res({
   plan:'<p>Con Brønsted-Lowry: si la especie tiene un H⁺ que ceder es un ácido (dona al agua); si tiene un par que acepte H⁺ es una base (acepta del agua). En cada equilibrio se señalan los dos pares conjugados. Constantes: tablas del apéndice (Ka·Kb = Kw).</p>',
   cuali:table(['Especie','Equilibrio con el agua','Pares conjugados (ácido/base)','Constante'],[
    ['ion anilinio C₆H₅NH₃⁺',rx('C6H5NH3^+(ac) + H2O(l) <=> C6H5NH2(ac) + H3O^+(ac)'),'C₆H₅NH₃⁺/C₆H₅NH₂ · H₃O⁺/H₂O','Ka = Kw/Kb = 10⁻¹⁴/4,3·10⁻¹⁰ = 2,3·10⁻⁵'],
    ['ortofosfato diácido H₂PO₄⁻ (anfiprótico)',rx('H2PO4^-(ac) + H2O(l) <=> HPO4^2-(ac) + H3O^+(ac)')+rx('H2PO4^-(ac) + H2O(l) <=> H3PO4(ac) + HO^-(ac)'),'H₂PO₄⁻/HPO₄²⁻ · H₃O⁺/H₂O<br>H₃PO₄/H₂PO₄⁻ · H₂O/HO⁻','Ka₂ = 6,2·10⁻⁸ · Kb = Kw/Ka₁ = 1,3·10⁻¹² (predomina el carácter ácido)'],
    ['ácido fórmico HCOOH',rx('HCOOH(ac) + H2O(l) <=> HCOO^-(ac) + H3O^+(ac)'),'HCOOH/HCOO⁻ · H₃O⁺/H₂O','Ka = 1,8·10⁻⁴'],
    ['ion hidracinio NH₂NH₃⁺',rx('NH2NH3^+(ac) + H2O(l) <=> NH2NH2(ac) + H3O^+(ac)'),'NH₂NH₃⁺/NH₂NH₂ · H₃O⁺/H₂O','Ka = 10⁻¹⁴/1,3·10⁻⁶ = 7,7·10⁻⁹'],
    ['anión cianuro CN⁻',rx('CN^-(ac) + H2O(l) <=> HCN(ac) + HO^-(ac)'),'HCN/CN⁻ · H₂O/HO⁻','Kb = 10⁻¹⁴/4,9·10⁻¹⁰ = 2,0·10⁻⁵'],
    ['urea CO(NH₂)₂',rx('CO(NH2)2(ac) + H2O(l) <=> CO(NH2)(NH3)^+(ac) + HO^-(ac)'),'CO(NH₂)(NH₃)⁺/CO(NH₂)₂ · H₂O/HO⁻','Kb = 1,2·10⁻¹⁴ (dato de la Guía 3): base extremadamente débil']])+
    tab('Kb anilina 4,3·10⁻¹⁰ e hidracina 1,3·10⁻⁶ (Tabla 2) · Ka₁ 7,5·10⁻³ y Ka₂ 6,2·10⁻⁸ del fosfórico, Ka fórmico 1,8·10⁻⁴ y Ka HCN 4,9·10⁻¹⁰ (Tabla 1).'),
   jus:('<p>Ácidos: anilinio, fórmico, hidracinio (ceden H⁺ al agua). Bases: cianuro y urea (aceptan H⁺ del agua). El H₂PO₄⁻ es anfiprótico: puede hacer las dos cosas, y como Ka₂ &gt; Kb predomina el carácter ácido. En cada equilibrio hay dos pares conjugados: el de la especie y el del agua.</p>')
  }),'Ácidos: C₆H₅NH₃⁺, HCOOH, NH₂NH₃⁺ · bases: CN⁻, CO(NH₂)₂ · H₂PO₄⁻ anfiprótico (predomina ácido)');

  // ---------------------------------------------------------------- 9
  S('g1-9',res({
   plan:'<p>Una especie anfiprótica puede ceder un H⁺ (actúa como ácido) o aceptarlo (actúa como base). Se escriben los dos equilibrios con el agua y se comparan sus constantes para ver qué carácter predomina.</p>',
   sist:'<h4>Carbonato ácido (HCO₃⁻)</h4>'+rxs(['HCO3^-(ac) + H2O(l) <=> CO3^2-(ac) + H3O^+(ac)','como ácido: Ka₂ = 5,6·10⁻¹¹'],['HCO3^-(ac) + H2O(l) <=> H2CO3(ac) + HO^-(ac)','como base: Kb = Kw/Ka₁ = 10⁻¹⁴/4,3·10⁻⁷ = 2,3·10⁻⁸'])+
    '<h4>Ortoarseniato ácido (HAsO₄²⁻)</h4>'+rxs(['HAsO4^2-(ac) + H2O(l) <=> AsO4^3-(ac) + H3O^+(ac)','como ácido: Ka₃ = 3,0·10⁻¹²'],['HAsO4^2-(ac) + H2O(l) <=> H2AsO4^-(ac) + HO^-(ac)','como base: Kb = Kw/Ka₂ = 10⁻¹⁴/1,0·10⁻⁷ = 1,0·10⁻⁷'])+tab('Ka del carbónico y del arsénico: Tabla 1.'),
   cuali:'<p>En los dos casos la constante como base es mayor que la constante como ácido: sus soluciones son <b>básicas</b>. Para el bicarbonato se estima pH ≈ ½(pKa₁ + pKa₂) = ½(6,37 + 10,25) = 8,31.</p>'+note('Si “ortoarseniato ácido” se refiere al H₂AsO₄⁻','<p>Ese es el ortoarseniato <b>diácido</b>: H₂AsO₄⁻(ac) + H₂O(l) ⇌ HAsO₄²⁻(ac) + H₃O⁺(ac) (Ka₂ = 1,0·10⁻⁷) y H₂AsO₄⁻(ac) + H₂O(l) ⇌ H₃AsO₄(ac) + HO⁻(ac) (Kb = Kw/Ka₁ = 1,8·10⁻¹²): predomina el carácter ácido.</p>'),
   jus:('<p>Son anfipróticos porque tienen un H⁺ que ceder y un par que acepta H⁺. El carácter que predomina se decide comparando la constante ácida con la básica de la misma especie.</p>')
  }),'HCO₃⁻ y HAsO₄²⁻: anfipróticos, con predominio básico (Kb &gt; Ka)');

  // ---------------------------------------------------------------- 10
  S('g1-10',res({
   plan:'<p>El carácter ácido de un catión depende de si “atrapa” los HO⁻ del agua. Eso se ve en su hidróxido: si es base fuerte (totalmente disociada), el catión no tiene tendencia a unirse al HO⁻; si es débil o poco soluble, sí.</p>',
   sist:rxs(['NaOH(s) -> Na^+(ac) + HO^-(ac)','base fuerte: total → el Na⁺ no se une al HO⁻'],['Al(OH)3(s) <=> Al^3+(ac) + 3 HO^-(ac)','Kps = 1,3·10⁻³³ (Tabla 5): el Al³⁺ se une fuertemente al HO⁻'],['[Al(H2O)6]^3+(ac) + H2O(l) <=> [Al(OH)(H2O)5]^2+(ac) + H3O^+(ac)','hidrólisis ácida (Ka ≈ 10⁻⁵, bibliografía)']),
   cuali:'<p><b>Na⁺:</b> el NaOH es un electrolito fuerte: en agua no existe NaOH sin disociar. Eso quiere decir que el Na⁺ no tiene tendencia a combinarse con el HO⁻ del agua; es el ácido conjugado de una base fuerte y <b>no</b> tiene comportamiento ácido-base: es un catión <b>neutro</b>.</p><p><b>Al³⁺:</b> su hidróxido es débil y muy poco soluble: el Al³⁺ (pequeño y con carga 3+) atrae con fuerza al HO⁻. En agua toma HO⁻ de las moléculas de agua coordinadas y libera H₃O⁺: es un catión <b>ácido</b>.</p>',
   jus:('<p>El conjugado de un electrolito fuerte no tiene comportamiento ácido-base (Na⁺ neutro). El catión de un hidróxido débil o poco soluble sí lo tiene: el Al³⁺ hidroliza y acidifica.</p>')
  }),'Na⁺ neutro (NaOH fuerte) · Al³⁺ ácido (Al(OH)₃ débil y poco soluble: hidroliza)');

  // ---------------------------------------------------------------- 11
  S('g1-11',res({
   plan:'<p>Igual que con el cobre: precipitación del hidróxido por el HO⁻ del amoníaco y disolución por formación del amincomplejo. Al final se escriben las expresiones de equilibrio del sistema final.</p>',
   datos:tab('Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Kps Zn(OH)₂ = 1,2·10⁻¹⁷ (Tabla 5) · Kf [Zn(NH₃)₄]²⁺ ≈ 2,9·10⁹ (bibliografía; no figura en las tablas).'),
   sist:rxs(['ZnSO4(s) -> Zn^2+(ac) + SO4^2-(ac)','sal soluble: total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Zn^2+(ac) + 2 HO^-(ac) <=> Zn(OH)2(s)','precipitado blanco (1/Kps)'],['Zn(OH)2(s) + 4 NH3(ac) <=> [Zn(NH3)4]^2+(ac) + 2 HO^-(ac)','K = Kps·Kf = 3,5·10⁻⁸']),
   cuali:'<p><b>Primer cambio (aparece el precipitado):</b> al agregar NH₃ se genera HO⁻ y '+m(R`Q=[\mathrm{Zn^{2+}}][\mathrm{HO^-}]^2>K_{ps}`)+': precipita Zn(OH)₂ hasta Q = Kps.</p><p><b>Segundo cambio (se disuelve):</b> con NH₃ en exceso se forma el tetraaminzinc(II), estable: consume Zn²⁺ libre, Q &lt; Kps y, por Le Châtelier, el Zn(OH)₂ se disuelve.</p>'+note('Si la base en exceso fuera NaOH','<p>El Zn(OH)₂ también se disuelve, pero por otra razón: es anfótero y forma el hidroxocomplejo [Zn(OH)₄]²⁻.</p>'),
   cuanti:'<p><b>Expresiones de la ley de acción de masas del sistema final</b> (sin sólido):</p>'+M(R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}\qquad K_f=\beta_4=\frac{[\mathrm{Zn(NH_3)_4^{2+}}]}{[\mathrm{Zn^{2+}}][\mathrm{NH_3}]^4}\qquad K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`)+M(R`Q=[\mathrm{Zn^{2+}}][\mathrm{HO^-}]^2<K_{ps}\ \text{(el sólido se disolvió)}`)+M(R`\text{BM: }C_{\mathrm{Zn}}=[\mathrm{Zn^{2+}}]+[\mathrm{Zn(NH_3)_4^{2+}}]\qquad C_{\mathrm{N}}=[\mathrm{NH_3}]+[\mathrm{NH_4^+}]+4[\mathrm{Zn(NH_3)_4^{2+}}]`)+M(R`\text{BC: }2[\mathrm{Zn^{2+}}]+2[\mathrm{Zn(NH_3)_4^{2+}}]+[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`),
   jus:('<p>Precipita Zn(OH)₂ porque el HO⁻ del NH₃ hace Q &gt; Kps; se disuelve porque el NH₃ en exceso forma [Zn(NH₃)₄]²⁺ y baja el Zn²⁺ libre (Le Châtelier).</p>')
  }),'Zn(OH)₂(s) por Q &gt; Kps; se disuelve como [Zn(NH₃)₄]²⁺');

  // ---------------------------------------------------------------- 12
  S('g1-12',res({
   plan:'<p>Primero precipita el hidróxido de cromo(III) por el HO⁻ del NH₃. Después el H₂O₂ <b>oxida</b> el Cr(III) a Cr(VI): en medio básico se forma cromato, amarillo. Se balancea la redox por ion-electrón en medio básico y se escriben las expresiones de equilibrio.</p>',
   datos:tab('Kps Cr(OH)₃ = 6,3·10⁻³¹ (Tabla 5) · Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Ka HCrO₄⁻ = 3,0·10⁻⁷ (Tabla 1).'),
   sist:rxs(['CrCl3(s) -> Cr^3+(ac) + 3 Cl^-(ac)','sal soluble: total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Cr^3+(ac) + 3 HO^-(ac) <=> Cr(OH)3(s)','precipitado verde grisáceo (1/Kps)'])+
    '<h4>Oxidación con H₂O₂ (medio básico, ion-electrón)</h4>'+rxs(['Cr(OH)3(s) + 5 HO^-(ac) -> CrO4^2-(ac) + 4 H2O(l) + 3 e^-','oxidación: Cr +3 → +6 (×2)'],['H2O2(ac) + 2 e^- -> 2 HO^-(ac)','reducción: O −1 → −2 (×3)'],['2 Cr(OH)3(s) + 3 H2O2(ac) + 4 HO^-(ac) -> 2 CrO4^2-(ac) + 8 H2O(l)','ecuación global (cromato: amarillo)']),
   cuali:'<p><b>Primer cambio:</b> el HO⁻ del NH₃ hace Q &gt; Kps y precipita Cr(OH)₃. <b>Segundo cambio:</b> el H₂O₂ es un oxidante; en medio básico oxida el Cr(OH)₃ a CrO₄²⁻, que es amarillo y soluble. La reacción es prácticamente completa (→). Como el medio es básico, el cromato no se protona apreciablemente:</p>'+M(R`\frac{[\mathrm{HCrO_4^-}]}{[\mathrm{CrO_4^{2-}}]}=\frac{[\mathrm{H_3O^+}]}{K_a}\approx\frac{10^{-11}}{3{,}0\times10^{-7}}=3\times10^{-5}`,'a pH ≈ 11 predomina CrO₄²⁻'),
   cuanti:'<p><b>Expresiones de equilibrio del sistema final:</b></p>'+M(R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}\qquad K_a=\frac{[\mathrm{CrO_4^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HCrO_4^-}]}\qquad K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`)+M(R`K_{ps}=[\mathrm{Cr^{3+}}][\mathrm{HO^-}]^3\ \text{(sólo mientras quede Cr(OH)}_3\text{ sin oxidar)}`),
   jus:('<p>El Cr³⁺ precipita como Cr(OH)₃ porque el HO⁻ del amoníaco supera su Kps. El H₂O₂ oxida el Cr(III) a Cr(VI); en medio básico queda como CrO₄²⁻ (amarillo), que predomina sobre HCrO₄⁻ porque el pH está muy por encima de su pKa (6,52).</p>')
  }),'Cr(OH)₃(s) por Q &gt; Kps · con H₂O₂: 2 Cr(OH)₃(s) + 3 H₂O₂(ac) + 4 HO⁻(ac) → 2 CrO₄²⁻(ac) (amarillo) + 8 H₂O(l)');

  // ---------------------------------------------------------------- 13
  S('g1-13',res({
   plan:'<p>Hay que ver el papel de cada sal: el NaCl es un electrolito fuerte sin comportamiento ácido-base ni complejante apreciable (sólo aporta iones); el NiCl₂ da el ion níquel hidratado (verde) y el NH₃ lo transforma en un amincomplejo (azul violáceo), previo paso posible por el hidróxido.</p>',
   datos:tab('Kps Ni(OH)₂ = 2,0·10⁻¹⁵ (Tabla 5) · Kb NH₃ = 1,8·10⁻⁵ (Tabla 2). La Kf del [Ni(NH₃)₆]²⁺ no figura en las tablas (es grande).'),
   sist:rxs(['NaCl(s) -> Na^+(ac) + Cl^-(ac)','solución fisiológica: electrolito fuerte, iones espectadores'],['NiCl2(s) -> Ni^2+(ac) + 2 Cl^-(ac)','sal soluble'],['Ni^2+(ac) + 6 H2O(l) -> [Ni(H2O)6]^2+(ac)','verde'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Ni^2+(ac) + 2 HO^-(ac) <=> Ni(OH)2(s)','con poco NH₃ puede precipitar (verde claro)'],['[Ni(H2O)6]^2+(ac) + 6 NH3(ac) <=> [Ni(NH3)6]^2+(ac) + 6 H2O(l)','Kf grande: azul violáceo']),
   cuali:'<p>El NaCl no cambia nada ácido-base: Na⁺ y Cl⁻ son conjugados de electrolitos fuertes, y el Cl⁻ es un ligando muy débil para el Ni²⁺, así que el color sigue siendo el verde del acuocomplejo. Al agregar NH₃, sus moléculas (bases de Lewis, mejores ligandos que el agua) desplazan al agua del entorno del Ni²⁺: por Le Châtelier, con NH₃ en exceso el equilibrio se desplaza hacia el hexaaminníquel(II), azul violáceo. Si con las primeras gotas apareciera Ni(OH)₂ (Q &gt; Kps), con más NH₃ se redisuelve porque el complejo baja el Ni²⁺ libre (Q &lt; Kps).</p>',
   jus:('<p>El cambio de color es un cambio de ligandos: H₂O (verde) → NH₃ (azul violáceo). El NH₃ forma un complejo más estable y en exceso desplaza el equilibrio de sustitución (Le Châtelier). El NaCl sólo aporta iones espectadores.</p>')
  }),'Sustitución de ligandos: [Ni(H₂O)₆]²⁺ (verde) → [Ni(NH₃)₆]²⁺ (azul violáceo); el NaCl no interviene');

  // ---------------------------------------------------------------- 14
  const fos=sys({rx:[['H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)',R`K_{a1}=7{,}5\times10^{-3}`],['H2PO4^-(ac) + H2O(l) <=> HPO4^2-(ac) + H3O^+(ac)',R`K_{a2}=6{,}2\times10^{-8}`],['HPO4^2-(ac) + H2O(l) <=> PO4^3-(ac) + H3O^+(ac)',R`K_{a3}=4{,}2\times10^{-13}`],W]});
  S('g1-14',res({
   plan:'<p>El ácido fosfórico es débil y triprótico: tres equilibrios sucesivos. Cada agregado actúa sobre el H₃O⁺, que es producto de los tres: se analiza con Le Châtelier. El calcio, además, puede precipitar fosfatos.</p>',
   datos:tab('Constantes del H₃PO₄: Tabla 1 · Kps CaHPO₄ = 1·10⁻⁷ y Ca₃(PO₄)₂ = 2,0·10⁻²⁹ (Tabla 5).'),
   sist:fos,
   cuali:inc('a','Hidróxido de sodio (base fuerte)',rx('H3O^+(ac) + HO^-(ac) -> 2 H2O(l)','K = 1/Kw = 10¹⁴: completa')+lc('H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)','se consume H₃O⁺','→',[['[H₃O⁺]','↓'],['[H₂PO₄⁻]','↑'],['[H₃PO₄]','↓']],'Por Le Châtelier los equilibrios se desplazan hacia los productos: el ácido se disocia más. Según cuánto NaOH se agregue, va predominando H₂PO₄⁻, luego HPO₄²⁻ y finalmente PO₄³⁻.'))+
    inc('b','Ácido nítrico (ácido fuerte)',rx('HNO3(ac) + H2O(l) -> H3O^+(ac) + NO3^-(ac)','total')+lc('H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)','se agrega H₃O⁺ (ion común)','←',[['[H₃O⁺]','↑'],['[H₂PO₄⁻]','↓'],['[H₃PO₄]','↑']],'Se reprimen las tres disociaciones: el fosfórico se disocia menos.'))+
    inc('c','Hidróxido de calcio (base fuerte)',rx('Ca(OH)2(s) -> Ca^2+(ac) + 2 HO^-(ac)','base fuerte (lo disuelto, total)')+'<p>Igual que el NaOH: el HO⁻ consume H₃O⁺ y la disociación del ácido aumenta. Además el Ca²⁺ precipita las especies desprotonadas (Kps bajos), que salen de la solución y desplazan aún más los equilibrios hacia los productos:</p>'+rxs(['Ca^2+(ac) + HPO4^2-(ac) <=> CaHPO4(s)','Kps = 1·10⁻⁷'],['3 Ca^2+(ac) + 2 PO4^3-(ac) <=> Ca3(PO4)2(s)','Kps = 2,0·10⁻²⁹'])),
   jus:('<p>Las bases fuertes consumen H₃O⁺ y, por Le Châtelier, aumentan la disociación del fosfórico (en c, además, el Ca²⁺ retira aniones como precipitado). El ácido fuerte aporta H₃O⁺ (ion común) y la reprime.</p>')
  }),'a) aumenta · b) disminuye (ion común) · c) aumenta y precipitan fosfatos de calcio');

  // ---------------------------------------------------------------- 15
  S('g1-15',res({
   plan:'<p>Una sustancia anfiprótica, según Brønsted-Lowry, tiene que poder <b>ceder</b> y <b>aceptar</b> un H⁺ en el medio de trabajo. Hay que ver si la acetona puede ceder H⁺ en agua.</p>',
   cuali:'<p>La acetona es la propanona, CH₃–CO–CH₃: un C central con un doble enlace al O y dos grupos metilo. <b>No tiene H unidos a átomos electronegativos</b> (O o N); sus H están unidos a C y son extremadamente poco ácidos (en agua no se ceden). El O del carbonilo sí tiene pares libres y podría aceptar un H⁺ de un ácido muy fuerte, pero en agua es una base prácticamente nula.</p><p>Como en solución acuosa no puede actuar como ácido de Brønsted (no cede H⁺), <b>no se puede afirmar con esta teoría que sea anfiprótica</b>. Sus pares libres se describen mejor con Lewis (base de Lewis débil). Es un solvente <b>aprótico</b>.</p>',
   jus:('<p>Para ser anfiprótica tiene que poder donar y aceptar H⁺. La acetona no tiene H ácidos (sólo H unidos a C): no cede protones en agua. Sólo podría aceptarlos débilmente por el O: no es anfiprótica.</p>')
  }),'No tiene H ácidos: no cede H⁺ en agua, no es anfiprótica (solvente aprótico)');

  // ---------------------------------------------------------------- Integración 1
  S('g1-i1',res({
   plan:'<p>El cloruro férrico es una sal soluble con un catión ácido. En cada porción se agrega algo distinto: hay que decir qué equilibrio se perturba, hacia dónde evoluciona y escribir las expresiones de equilibrio del sistema final. “Fuera del equilibrio” es el instante en que se agrega un reactivo y Q ≠ K, antes del reajuste.</p>',
   datos:tab('Kps Fe(OH)₃ = 4·10⁻³⁸ (Tabla 5) · Kb NH₃ = 1,8·10⁻⁵ (Tabla 2).'),
   sist:rxs(['FeCl3(s) -> Fe^3+(ac) + 3 Cl^-(ac)','sal soluble: total'],['[Fe(H2O)6]^3+(ac) + H2O(l) <=> [Fe(OH)(H2O)5]^2+(ac) + H3O^+(ac)','catión ácido (hidrólisis)'],W),
   cuali:inc('a','Porción 1: amoníaco',rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Fe^3+(ac) + 3 HO^-(ac) <=> Fe(OH)3(s)','precipitado pardo rojizo'])+'<p>El HO⁻ del amoníaco hace '+m(R`Q=[\mathrm{Fe^{3+}}][\mathrm{HO^-}]^3>K_{ps}`)+' (el Kps es bajísimo): precipita Fe(OH)₃ hasta que Q = Kps. Además el NH₃ neutraliza el H₃O⁺ de la hidrólisis.</p>'+M(R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}\qquad K_{ps}=[\mathrm{Fe^{3+}}][\mathrm{HO^-}]^3\qquad K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]`))+
    inc('b','Porción 2: hidróxido de calcio y luego ácido nítrico',rxs(['Ca(OH)2(s) -> Ca^2+(ac) + 2 HO^-(ac)','base fuerte'],['Fe^3+(ac) + 3 HO^-(ac) -> Fe(OH)3(s)','precipitación prácticamente completa'],['HNO3(ac) + H2O(l) -> H3O^+(ac) + NO3^-(ac)','ácido fuerte'],['Fe(OH)3(s) + 3 H3O^+(ac) <=> Fe^3+(ac) + 6 H2O(l)','K = Kps/Kw³ = 4·10⁻³⁸/10⁻⁴² = 4·10⁴'])+
     '<p>El H₃O⁺ neutraliza el HO⁻ del equilibrio de solubilidad; por Le Châtelier el sólido se disuelve (K ≫ 1). <b>Sistema final</b> (en equilibrio, sin sólido): Fe³⁺ (hidratado y parcialmente hidrolizado), Ca²⁺, Cl⁻, NO₃⁻, H₃O⁺ en exceso y HO⁻.</p>'+M(R`K_a=\frac{[\mathrm{Fe(OH)^{2+}}][\mathrm{H_3O^+}]}{[\mathrm{Fe^{3+}}]}\qquad K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]\qquad Q=[\mathrm{Fe^{3+}}][\mathrm{HO^-}]^3<K_{ps}`)+
     '<p><b>¿Cuándo estuvo fuera del equilibrio?</b> En cada instante de agregado: al agregar Ca(OH)₂ (Q &gt; Kps, antes de que precipite) y al agregar HNO₃ (con sólido presente, Q &lt; Kps, antes de que se disuelva). Después de cada reajuste el sistema vuelve a estar en equilibrio.</p>')+
    inc('c','Porción 3: cloruro de sodio',rx('NaCl(s) -> Na^+(ac) + Cl^-(ac)','electrolito fuerte')+'<p>El Na⁺ (de base fuerte) y el Cl⁻ (de ácido fuerte) no tienen comportamiento ácido-base: no perturban la hidrólisis del Fe³⁺ ni la autoprotólisis. El Cl⁻ ya estaba presente (el FeCl₃ lo aporta), así que no aparece ninguna reacción nueva observable. El sistema <b>sigue en equilibrio</b>: al disolver el NaCl las concentraciones se reajustan apenas y vuelve a cumplirse Q = K.</p>'),
   jus:('<p>1) Q &gt; Kps por el HO⁻ del NH₃: precipita Fe(OH)₃. 2) El Ca(OH)₂ precipita el hidróxido y el HNO₃ lo disuelve (K = Kps/Kw³ ≫ 1); hubo desequilibrio en cada agregado. 3) El NaCl aporta iones espectadores: no hay cambios y el sistema está en equilibrio.</p>')
  }),'1) precipita Fe(OH)₃ · 2) precipita y se redisuelve con HNO₃ · 3) sin cambios, en equilibrio');

  // ---------------------------------------------------------------- Integración 2
  S('g1-i2',res({
   plan:'<p>Se mezcla un ácido débil triprótico con una base fuerte. El enunciado no da concentraciones, así que se analiza cualitativamente: la neutralización (completa) y cómo responde cada equilibrio del ácido, según cuántos moles de HO⁻ haya por mol de H₃PO₄. También influye la dilución y el Ba²⁺.</p>',
   sist:rxs(['Ba(OH)2(s) -> Ba^2+(ac) + 2 HO^-(ac)','base fuerte: total'],['H3O^+(ac) + HO^-(ac) -> 2 H2O(l)','neutralización: completa'])+fos,
   cuali:'<p><b>Dilución:</b> el volumen se duplica; al diluir, cada equilibrio de disociación se desplaza hacia los iones (más partículas disueltas; menos choques efectivos que rearmen el ácido).</p><p><b>Base fuerte:</b> el HO⁻ consume H₃O⁺; por Le Châtelier las disociaciones avanzan hacia los productos y el ácido se disocia más. Cuánto, depende de la relación de moles:</p>'+
    table(['n HO⁻ / n H₃PO₄','Qué queda','Especie que predomina'],[['&lt; 1','H₃PO₄ y H₂PO₄⁻ (reguladora)','H₃PO₄ / H₂PO₄⁻'],['= 1','H₂PO₄⁻ (anfiprótico)','H₂PO₄⁻ (pH ≈ 4,7)'],['entre 1 y 2','H₂PO₄⁻ y HPO₄²⁻ (reguladora)','H₂PO₄⁻ / HPO₄²⁻'],['= 2','HPO₄²⁻ (anfiprótico)','HPO₄²⁻ (pH ≈ 9,8)'],['entre 2 y 3','HPO₄²⁻ y PO₄³⁻','HPO₄²⁻ / PO₄³⁻'],['≥ 3','PO₄³⁻ (y HO⁻ en exceso)','PO₄³⁻']])+
    '<p><b>El Ba²⁺:</b> forma fosfatos de bario poco solubles; al precipitar retiran aniones de la solución y desplazan aún más los equilibrios hacia la disociación (su Kps no figura en la Tabla 5).</p>',
   jus:('<p>La base fuerte neutraliza el H₃O⁺ y, por Le Châtelier, aumenta la disociación del H₃PO₄ etapa por etapa; la dilución y la precipitación de fosfatos de bario favorecen lo mismo. Hasta qué especie llega depende de la relación de moles, que el enunciado no da.</p>')
  }),'La disociación del H₃PO₄ aumenta (neutralización, dilución y precipitación con Ba²⁺); la especie final depende de la relación de moles');

  // ---------------------------------------------------------------- Burriel
  S('g1t-f1',res({
   cuali:inc('1','Errores teóricos del texto',flow([
     ['Las disociaciones sin el agua','plantea la disociación del electrolito al estilo Arrhenius: sin el solvente, sin los estados de agregación y sin la constante debajo. En clase: HA(ac) + H₂O(l) ⇌ A⁻(ac) + H₃O⁺(ac), con su Ka.'],
     ['“Disminuyendo la concentración total de AB”','después de agregar AB, el nuevo equilibrio tiene <b>más</b> AB que el original: lo que baja es respecto del instante del agregado (parte del AB añadido se disocia). Además, al aumentar la concentración el grado de disociación α disminuye, aunque haya más iones.'],
     ['El precipitado tratado como electrolito débil','en “disminución de la concentración” AB pasa a ser un precipitado: un sólido poco soluble no es un electrolito débil; lo que se disuelve está totalmente disociado. Se escribe AB(s) ⇌ A⁺(ac) + B⁻(ac), equilibrio heterogéneo con su Kps.'],
     ['Sin cargas en el complejo','“para simplificar se omiten las cargas”: el balance de carga y las expresiones de K las necesitan.'],
     ['Lo correcto del texto','el sólido y el agua (actividad 1) no figuran en K; agregar sólido no desplaza el equilibrio de solubilidad; el agua actúa indirectamente por dilución; el electrolito débil no afecta la disociación del fuerte (que es total).']]))+
    inc('2','“Evolución del sistema” en términos cinéticos','<p>Al perturbar el equilibrio, las velocidades de las reacciones directa e inversa dejan de ser iguales. “Evoluciona” significa que, durante un tiempo, una de las dos es mayor que la otra y las concentraciones cambian; por ejemplo, al agregar AB aumenta la velocidad de disociación (hay más AB). A medida que se forman iones aumenta la velocidad de la inversa, hasta que las dos se igualan de nuevo: nuevo equilibrio dinámico.</p>')+
    inc('3','Teoría ácido-base que usa el libro','<p>Usa la de <b>Arrhenius</b>: la sustancia se “disocia” sola y libera H⁺ (u OH⁻), sin que participe el agua. No describe la realidad: en agua el H⁺ no existe libre, está unido al solvente (H₃O⁺). La descripción correcta es la de <b>Brønsted-Lowry</b>: el ácido transfiere el protón al agua, que actúa como base.</p>')+
    inc('4','¿Qué representa n en ALₙ?','<p>El <b>número de ligandos</b> L unidos al ion central A en el complejo (en general, su número de coordinación). Por ejemplo, en [Ag(NH₃)₂]⁺, n = 2; en [Cu(NH₃)₄]²⁺, n = 4. Los ligandos entran de a uno, cada paso con su constante (Kf₁, Kf₂…; global βₙ).</p>')
  }),'Arrhenius en lugar de Brønsted; precipitado tratado como electrolito débil; n = número de ligandos');
  S('g1t-f2',res({
   cuali:inc('5','Magnitud de las disociaciones sucesivas','<p><b>No</b> tienen la misma magnitud: cada etapa es mucho más débil que la anterior, Ka₁ ≫ Ka₂ ≫ Ka₃, porque cuesta más sacar un H⁺ positivo de una especie cada vez más negativa. Ejemplo (Tabla 1): H₃PO₄ Ka₁ = 7,5·10⁻³, Ka₂ = 6,2·10⁻⁸, Ka₃ = 4,2·10⁻¹³. El esquema del libro lo sugiere con “cajas” cada vez más chicas.</p>')+
    inc('6','¿A qué tipo de sales corresponde el sistema?','<p>A sales de <b>ácido débil y base fuerte</b> (catión neutro, como Na⁺ o K⁺, y anión base débil): NaAc, NaCN, borato de sodio. Su solución es <b>básica</b> porque el anión hidroliza: A⁻(ac) + H₂O(l) ⇌ HA(ac) + HO⁻(ac) (Kb = Kw/Ka).</p>')+
    inc('7','Términos que en clase no usamos (o usamos distinto)','<ul><li>“sistema monoprótido / poliprótido” (en clase: monoprótico, poliprótico).</li><li>“disolvente” (en clase: solvente).</li><li>H⁺ en lugar de H₃O⁺, y OH⁻ en lugar de HO⁻.</li><li>“catión neutro, nada ácido”; “se retrograda la disociación”; “reacción parásita o colateral”.</li><li>“Ion borato BO₂⁻” (en rigor es el metaborato).</li></ul>')
  }),'Ka₁ ≫ Ka₂ ≫ Ka₃ · sales de ácido débil y base fuerte (básicas)');
  S('g1t-f3',res({
   cuali:inc('8','Errores desde el marco teórico de clase',flow([
     ['La disociación de la sal con doble flecha','Na₃A(s) ⇌ 3Na⁺(ac) + A³⁻(ac): una sal soluble es un electrolito fuerte; va con flecha simple y sin constante: Na₃A(s) → 3Na⁺(ac) + A³⁻(ac).'],
     ['El agua escrita arriba de la flecha','el agua es reactivo: A³⁻(ac) + H₂O(l) ⇌ HA²⁻(ac) + HO⁻(ac), con su Kb debajo.'],
     ['Autoprotólisis con H⁺','2 H₂O(l) ⇌ H₃O⁺(ac) + HO⁻(ac), con Kw.'],
     ['Faltan constantes y estados','cada equilibrio con su constante abajo y cada especie con su estado.']]))+
    inc('9','Magnitud de las “disociaciones” sucesivas del anión','<p>En realidad son protonaciones sucesivas (hidrólisis), cada una con su Kb, de magnitud decreciente: Kb₁ ≫ Kb₂ ≫ Kb₃, con Kb₁ = Kw/Ka₃, Kb₂ = Kw/Ka₂ y Kb₃ = Kw/Ka₁. Para el fosfato: Kb₁ = 10⁻¹⁴/4,2·10⁻¹³ = 2,4·10⁻² (¡alta!), Kb₂ = 1,6·10⁻⁷ y Kb₃ = 1,3·10⁻¹². La primera manda.</p>')+
    inc('10','Comportamiento ácido-base de la sal Na₃A','<p>El Na⁺ viene de una base fuerte: no tiene comportamiento ácido-base. El A³⁻ es base débil y genera HO⁻: la solución es <b>básica</b>, y el pH lo fija la primera hidrólisis.</p>'+ilu('<p>Na₃PO₄ 0,10 M: Kb₁ = 2,4·10⁻² es alta (C/Kb₁ = 4 &lt; 100), se resuelve la cuadrática: '+m(R`x^2+2{,}4\times10^{-2}x-2{,}4\times10^{-3}=0\Rightarrow[\mathrm{HO^-}]=3{,}8\times10^{-2}\ \mathrm{M}`)+', pOH 1,42 y pH 12,58.</p>'))+
    inc('11','¿La autoprotólisis estará siempre presente?','<p>Sí. En toda solución acuosa el agua se autoioniza y Kw = [H₃O⁺][HO⁻] se cumple siempre. Puede estar <b>reprimida</b> (por el H₃O⁺ de un ácido o el HO⁻ de una base) y su aporte ser despreciable respecto de otro término, pero nunca desaparece: la especie minoritaria se calcula con Kw.</p>')
  }),'La sal se disocia totalmente (→); Kb₁ ≫ Kb₂ ≫ Kb₃; solución básica; la autoprotólisis siempre está');
})();
