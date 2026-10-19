// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 4 (1/2): precipitación (1–10, 17) y redox (20–26).
// Constantes del enunciado; si no las da, Tablas 5 y 6 del apéndice (y, si tampoco están, se aclara el origen).
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;
  const guia=(t,ok=true)=>A.rta(t,ok);
  const sulfNote=note('Sobre los Kps de sulfuros de la Tabla 5','<p>La nota ᵇ de la tabla aclara que esos valores corresponden a MS(s) + H₂O(l) ⇌ M²⁺(ac) + HS⁻(ac) + HO⁻(ac). En la guía se usan como producto [M²⁺][S²⁻], que es lo que se hace acá; la conclusión (precipita o no) no cambia.</p>');

  // ================================================================ PRECIPITACIÓN
  S('p-g4-1',res({
   plan:'<p>Kps a partir de la solubilidad: (1) escribir el equilibrio de disolución (sólido a la izquierda, iones a la derecha) y su Kps; (2) pasar el dato a solubilidad molar s de la <b>sal</b> (ojo si el dato es de un ion); (3) cada ion vale su coeficiente por s; (4) reemplazar en Kps.</p>',
   cuali:'<p>Se supone que los iones no reaccionan con nada más (sin hidrólisis apreciable ni complejos) y que lo disuelto está totalmente disociado (electrolitos fuertes poco solubles).</p>',
   cuanti:inc('a','Ioduro de plata',rx('AgI(s) <=> Ag^+(ac) + I^-(ac)','Kps = [Ag⁺][I⁻]')+chain(R`s=\frac{2{,}9\times10^{-6}\ \mathrm{g/L}}{234{,}77\ \mathrm{g/mol}}=1{,}24\times10^{-8}\ \mathrm{M}`,R`K_{ps}=s\cdot s=s^2=1{,}53\times10^{-16}`)+guia('1,525·10⁻¹⁶'))+
    inc('b','Fluoruro de estroncio',rx('SrF2(s) <=> Sr^2+(ac) + 2 F^-(ac)','Kps = [Sr²⁺][F⁻]²')+chain([R`s=[\mathrm{Sr^{2+}}]=\frac{0{,}111\ \mathrm{g/L}}{87{,}62\ \mathrm{g/mol}}=1{,}27\times10^{-3}\ \mathrm{M}`,'el dato es del ion estroncio: se divide por la masa molar del Sr'],R`K_{ps}=s\,(2s)^2=4s^3=8{,}1\times10^{-9}`)+guia('2,76·10⁻⁹',false)+note('Por qué no coincide con la respuesta impresa','<p>2,76·10⁻⁹ sale de dividir 0,111 g/L por la masa molar del SrF₂ (125,62), como si el dato fuera de la sal. El enunciado da la concentración de <b>estroncio</b>, así que corresponde 87,62. (La Tabla 5 trae 2,5·10⁻⁹.) Conviene preguntarle a la profe qué criterio quiere.</p>'))+
    inc('c','Cromato de plata',rx('Ag2CrO4(s) <=> 2 Ag^+(ac) + CrO4^2-(ac)','Kps = [Ag⁺]²[CrO₄²⁻]')+chain(R`s=\frac{4{,}35\times10^{-3}\ \mathrm{g}/0{,}100\ \mathrm{L}}{331{,}73\ \mathrm{g/mol}}=1{,}31\times10^{-4}\ \mathrm{M}`,R`K_{ps}=(2s)^2\,s=4s^3=9{,}0\times10^{-12}`)+guia('9·10⁻¹²')),
   jus:'<p>Por cada mol de sal disuelto aparecen tantos moles de cada ion como indica su subíndice, y en el Kps cada concentración se eleva a su coeficiente (el 2 de 2s también se eleva).</p>'
  }),'a) 1,53·10⁻¹⁶ · b) 8,1·10⁻⁹ · c) 9,0·10⁻¹²');

  S('p-g4-2',res({
   plan:'<p>Solubilidad en agua pura a partir del Kps (sal 1:2) y efecto de la temperatura con Le Châtelier sobre un proceso exotérmico.</p>',
   datos:'<p>Kps Cu(IO₃)₂ = 1,4·10⁻⁷ (dato); disolución exotérmica.</p>',
   sist:rxs(['Cu(IO3)2(s) <=> Cu^2+(ac) + 2 IO3^-(ac)','Kps = [Cu²⁺][IO₃⁻]²; ΔH &lt; 0']),
   cuanti:chain(R`K_{ps}=s\,(2s)^2=4s^3\ \Rightarrow\ s=\sqrt[3]{\frac{1{,}4\times10^{-7}}{4}}=3{,}27\times10^{-3}\ \mathrm{M}`)+guia('3,27·10⁻³ M'),
   cuali:'<p>Exotérmica: el calor es un “producto”. Al aumentar la temperatura, por Le Châtelier el equilibrio se desplaza hacia el sólido: el Kps (que sólo depende de T) y la solubilidad <b>disminuyen</b>; al enfriar, aumentan.</p>',
   jus:'<p>s = (Kps/4)^(1/3) porque [IO₃⁻] = 2s. Como la disolución libera calor, calentar la desfavorece.</p>'
  }),'s = 3,27·10⁻³ M; disminuye al aumentar la temperatura');

  S('p-g4-3',res({
   plan:'<p>Solubilidad con ion común: el ion agregado (HO⁻ en a, I⁻ en b) viene de un electrolito fuerte y fija su concentración; la solubilidad se despeja del Kps. Después se analiza el efecto del pH sobre cada equilibrio.</p>',
   datos:tab('Kps Fe(OH)₃ = 4·10⁻³⁸ y PbI₂ = 7,1·10⁻⁹ (Tabla 5; el enunciado no los da). M(PbI₂) = 461,0 g/mol.'),
   cuanti:inc('a','Hidróxido férrico en NaOH 0,3 M',rxs(['NaOH(s) -> Na^+(ac) + HO^-(ac)','total: [HO⁻] = 0,3 M'],['Fe(OH)3(s) <=> Fe^3+(ac) + 3 HO^-(ac)','Kps = 4·10⁻³⁸'])+sup([['[HO⁻] ≈ 0,3 M (del NaOH)','ion común: lo que aporta el sólido (3s) es despreciable respecto de 0,3.']])+chain(R`[\mathrm{Fe^{3+}}]=\frac{K_{ps}}{[\mathrm{HO^-}]^3}=\frac{4\times10^{-38}}{0{,}3^3}=1{,}5\times10^{-36}\ \mathrm{M}`)+ver('<p>3s = 4,4·10⁻³⁶ ≪ 0,3 ✔</p>')+'<p><b>¿Cómo disolverlo?</b> Bajando el pH (agregando ácido): el H₃O⁺ consume HO⁻ (H₃O⁺(ac) + HO⁻(ac) → 2 H₂O(l)), Q queda por debajo del Kps y, por Le Châtelier, el hidróxido se disuelve: Fe(OH)₃(s) + 3 H₃O⁺(ac) ⇌ Fe³⁺(ac) + 6 H₂O(l), K = Kps/Kw³ = 4·10⁴.</p>'+note('Respuesta impresa','<p>La guía da 2,37·10⁻³⁴ g/L, calculada con Kps 6,0·10⁻³⁸ y expresada en g/L de Fe(OH)₃; con la Tabla 5 es 1,6·10⁻³⁴ g/L.</p>'))+
    inc('b','Ioduro de plomo en CaI₂ 0,2 M (% m/v)',rxs(['CaI2(s) -> Ca^2+(ac) + 2 I^-(ac)','total: [I⁻] = 0,4 M'],['PbI2(s) <=> Pb^2+(ac) + 2 I^-(ac)','Kps = 7,1·10⁻⁹'])+sup([['[I⁻] ≈ 0,4 M','ion común: 2s ≪ 0,4.']])+chain(R`s=[\mathrm{Pb^{2+}}]=\frac{7{,}1\times10^{-9}}{0{,}4^2}=4{,}4\times10^{-8}\ \mathrm{M}`,R`4{,}4\times10^{-8}\cdot461{,}0=2{,}0\times10^{-5}\ \mathrm{g/L}=2{,}0\times10^{-6}\ \%\,m/v`)+ver('<p>2s = 8,9·10⁻⁸ ≪ 0,4 ✔</p>')+'<p><b>¿Y el pH?</b> Prácticamente no modifica esta solubilidad: el I⁻ es base conjugada de un ácido fuerte (HI) y no se protona al acidificar. Sólo a pH alto cambiaría, porque el Pb²⁺ precipitaría como Pb(OH)₂ (otro equilibrio).</p>'+note('Respuesta impresa','<p>4,03·10⁻⁶ % m/v corresponde a Kps 1,4·10⁻⁸; con la Tabla 5 (7,1·10⁻⁹) da la mitad.</p>')),
   jus:'<p>El ion común aportado por un electrolito fuerte desplaza el equilibrio hacia el sólido (Le Châtelier) y la solubilidad baja muchísimo. El pH importa cuando el anión del precipitado es base (HO⁻ en a); no cuando es conjugado de un ácido fuerte (I⁻ en b).</p>'
  }),'a) [Fe³⁺] = 1,5·10⁻³⁶ M (se disuelve con ácido) · b) 2,0·10⁻⁶ % m/v (el pH no influye)');

  S('p-g4-4',res({
   plan:'<p>Es una mezcla con reacción de precipitación: primero moles y reactivo limitante (precipitación prácticamente completa), después el exceso del otro ion fija la solubilidad por ion común, y con el Kps se calcula lo que queda disuelto.</p>',
   datos:'<p>250 mL de Ba(NO₃)₂ 0,1 M + 600 mL de K₂SO₄ 1 M → 850 mL. '+tab('Kps BaSO₄ = 1,1·10⁻¹⁰ (Tabla 5). M(BaSO₄) = 233,39 g/mol.')+'</p>',
   sist:rxs(['Ba(NO3)2(s) -> Ba^2+(ac) + 2 NO3^-(ac)','total'],['K2SO4(s) -> 2 K^+(ac) + SO4^2-(ac)','total'],['Ba^2+(ac) + SO4^2-(ac) <=> BaSO4(s)','1/Kps']),
   cuanti:chain(R`n_{\mathrm{Ba^{2+}}}=0{,}250\cdot0{,}1=0{,}025\ \mathrm{mol}\qquad n_{\mathrm{SO_4^{2-}}}=0{,}600\cdot1=0{,}600\ \mathrm{mol}`,[R`[\mathrm{SO_4^{2-}}]_{\text{exceso}}=\frac{0{,}600-0{,}025}{0{,}850}=0{,}676\ \mathrm{M}`,'precipita todo el Ba²⁺ (limitante)'],R`[\mathrm{Ba^{2+}}]=\frac{1{,}1\times10^{-10}}{0{,}676}=1{,}6\times10^{-10}\ \mathrm{M}`,R`m_{\text{disuelta}}=1{,}6\times10^{-10}\cdot0{,}850\cdot233{,}39=3{,}2\times10^{-8}\ \mathrm{g}\qquad m_{\text{insoluble}}=0{,}025\cdot233{,}39=5{,}83\ \mathrm{g}`),
   cuali:sup([['Precipitación prácticamente completa del Ba²⁺','Kps muy bajo y sulfato en gran exceso (ion común): por Le Châtelier el equilibrio está muy desplazado hacia el sólido.']]),
   verif:ver('<p>El Ba²⁺ disuelto (1,4·10⁻¹⁰ mol) es despreciable frente a 0,025 mol ✔.</p>')+note('Respuesta impresa','<p>5,31·10⁻⁷ g disueltos corresponde a K₂SO₄ 0,1 M (anotación en la guía). Con 1 M, como dice la consigna, el exceso de sulfato es mayor y queda menos disuelto. La masa insoluble (5,83 g) es la misma en los dos casos.</p>'),
   jus:'<p>El Ba²⁺ es el limitante y precipita casi todo; el sulfato en exceso actúa como ion común y deja en solución sólo 1,6·10⁻¹⁰ M de bario.</p>'
  }),'≈ 3,2·10⁻⁸ g disueltos · 5,83 g insolubles');

  S('p-g4-5',res({
   plan:'<p>Precipita cuando el producto iónico supera el Kps; el mínimo de fluoruro es el que hace Q = Kps.</p>',
   datos:'<p>[Ca²⁺] = 0,02 M. '+tab('Kps CaF₂ = 5,3·10⁻⁹ (Tabla 5).')+'</p>',
   sist:rx('CaF2(s) <=> Ca^2+(ac) + 2 F^-(ac)','Kps = [Ca²⁺][F⁻]²'),
   cuanti:chain(R`Q=[\mathrm{Ca^{2+}}][\mathrm{F^-}]^2=K_{ps}\ \Rightarrow\ [\mathrm{F^-}]_{\min}=\sqrt{\frac{5{,}3\times10^{-9}}{0{,}02}}=5{,}1\times10^{-4}\ \mathrm{M}`),
   concl:note('Respuesta impresa','<p>La guía da 4,47·10⁻⁵ M, que corresponde a Kps = 4,0·10⁻¹¹ (valor de otra bibliografía). Con la Tabla 5 de la cátedra (5,3·10⁻⁹) da 5,1·10⁻⁴ M. Conviene confirmar con la profe qué valor usar.</p>'),
   jus:'<p>Con [F⁻] menor que 5,1·10⁻⁴ M, Q &lt; Kps y no precipita; justo en ese valor la solución queda saturada y por encima empieza a precipitar CaF₂.</p>'
  }),'[F⁻] mínima = 5,1·10⁻⁴ M (con la Tabla 5)');

  S('p-g4-6',res({
   plan:'<p>La reguladora NH₃/NH₄Cl fija [HO⁻]; con esa [HO⁻] el Kps del Mg(OH)₂ da la máxima [Mg²⁺] que puede quedar sin precipitar.</p>',
   datos:'<p>NH₄Cl 0,4 M + NH₃ 0,1 M. '+tab('Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Kps Mg(OH)₂ = 1,8·10⁻¹¹ (Tabla 5).')+'</p>',
   sist:sys({rx:[['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','','total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)',R`K_b=1{,}8\times10^{-5}`],['Mg(OH)2(s) <=> Mg^2+(ac) + 2 HO^-(ac)',R`K_{ps}=1{,}8\times10^{-11}`]]}),
   cuali:sup([['[NH₃] ≈ 0,1 y [NH₄⁺] ≈ 0,4','reguladora: el NH₄⁺ reprime la ionización del NH₃ (ion común).']]),
   cuanti:chain(R`[\mathrm{HO^-}]=K_b\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=1{,}8\times10^{-5}\cdot\frac{0{,}1}{0{,}4}=4{,}5\times10^{-6}\ \mathrm{M}`,R`[\mathrm{Mg^{2+}}]_{\max}=\frac{1{,}8\times10^{-11}}{(4{,}5\times10^{-6})^2}=0{,}89\ \mathrm{M}`),
   verif:ver('<p>[HO⁻] = 4,5·10⁻⁶ M ≪ 0,1 M ✔ (Henderson vale).</p>')+note('Respuesta impresa','<p>0,59 M corresponde a Kps 1,2·10⁻¹¹; con la Tabla 5 (1,8·10⁻¹¹) da 0,89 M.</p>'),
   jus:'<p>El NH₄⁺ en exceso baja [HO⁻] (ion común) y así el Mg(OH)₂ no precipita salvo con más de 0,89 M de Mg²⁺. Por eso en la marcha el NH₄Cl evita que el Mg²⁺ precipite con el grupo III.</p>'
  }),'[Mg²⁺] máxima ≈ 0,89 M (con la Tabla 5)');

  S('p-g4-7',res({
   plan:'<p>Para predecir si precipita se calcula Q con las concentraciones <b>después de mezclar</b> y se compara con el Kps. El HO⁻ lo aporta el NH₃ (base débil).</p>',
   datos:'<p>100 mL con 10 mg de Fe³⁺ + 1 mL de NH₃ 1 M → 101 mL. '+tab('Kb NH₃ = 1,8·10⁻⁵ (Tabla 2) · Kps Fe(OH)₃ = 4·10⁻³⁸ (Tabla 5).')+'</p>',
   sist:rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Fe(OH)3(s) <=> Fe^3+(ac) + 3 HO^-(ac)','Kps']),
   cuanti:chain(R`[\mathrm{Fe^{3+}}]=\frac{10\times10^{-3}/55{,}85}{0{,}101}=1{,}77\times10^{-3}\ \mathrm{M}\qquad[\mathrm{NH_3}]=\frac{1\ \mathrm{mmol}}{101\ \mathrm{mL}}=9{,}9\times10^{-3}\ \mathrm{M}`,[R`[\mathrm{HO^-}]=\sqrt{K_b[\mathrm{NH_3}]}=\sqrt{1{,}8\times10^{-5}\cdot9{,}9\times10^{-3}}=4{,}2\times10^{-4}\ \mathrm{M}`,'NH₃ solo; C/Kb &gt; 100'],R`Q=[\mathrm{Fe^{3+}}][\mathrm{HO^-}]^3=1{,}77\times10^{-3}\cdot(4{,}2\times10^{-4})^3=1{,}3\times10^{-13}\gg K_{ps}=4\times10^{-38}`),
   jus:'<p>Q supera al Kps en 25 órdenes de magnitud: precipita Fe(OH)₃. (El cálculo de [HO⁻] ignora que el Fe³⁺ consume HO⁻ y su hidrólisis, pero eso no cambia la conclusión.)</p>'
  }),'Sí, precipita Fe(OH)₃ (Q = 1,3·10⁻¹³ ≫ Kps)');

  S('p-g4-8',res({
   plan:'<p>Precipitación fraccionada: precipita primero la sal que necesita <b>menos</b> reactivo (Ag⁺ en a, CrO₄²⁻ en b) para alcanzar su Kps. No se comparan los Kps directamente (y menos si la estequiometría es distinta).</p>',
   datos:tab('Kps AgCl 1,8·10⁻¹⁰ · AgBr 5,0·10⁻¹³ · Ag₂CrO₄ 1,1·10⁻¹² · PbCrO₄ 2,8·10⁻¹³ (Tabla 5).'),
   cuanti:inc('a','Cl⁻ 0,01 M y Br⁻ 0,001 M con Ag⁺',rxs(['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','Kps 1,8·10⁻¹⁰'],['AgBr(s) <=> Ag^+(ac) + Br^-(ac)','Kps 5,0·10⁻¹³'])+chain(R`\mathrm{AgCl}:\ [\mathrm{Ag^+}]=\frac{1{,}8\times10^{-10}}{0{,}01}=1{,}8\times10^{-8}\ \mathrm{M}`,R`\mathrm{AgBr}:\ [\mathrm{Ag^+}]=\frac{5{,}0\times10^{-13}}{0{,}001}=5{,}0\times10^{-10}\ \mathrm{M}`)+'<p>Precipita primero el <b>AgBr</b>, aunque el Br⁻ esté diez veces más diluido.</p>'+guia('Bromuro de plata'))+
    inc('b','Ag⁺ y Pb²⁺ (10 g/L cada uno) con cromato',rxs(['Ag2CrO4(s) <=> 2 Ag^+(ac) + CrO4^2-(ac)','Kps 1,1·10⁻¹²'],['PbCrO4(s) <=> Pb^2+(ac) + CrO4^2-(ac)','Kps 2,8·10⁻¹³'])+chain(R`[\mathrm{Ag^+}]=\frac{10}{107{,}87}=0{,}0927\ \mathrm{M}\qquad[\mathrm{Pb^{2+}}]=\frac{10}{207{,}2}=0{,}0483\ \mathrm{M}`,R`\mathrm{Ag_2CrO_4}:\ [\mathrm{CrO_4^{2-}}]=\frac{1{,}1\times10^{-12}}{0{,}0927^2}=1{,}3\times10^{-10}\ \mathrm{M}`,R`\mathrm{PbCrO_4}:\ [\mathrm{CrO_4^{2-}}]=\frac{2{,}8\times10^{-13}}{0{,}0483}=5{,}8\times10^{-12}\ \mathrm{M}`)+'<p>Precipita primero el <b>PbCrO₄</b>. El Ag₂CrO₄ es 2:1: por eso se compara cuánto cromato necesita cada uno, no los Kps.</p>'+guia('Cromato de plomo')),
   jus:'<p>Al agregar el reactivo gota a gota, su concentración sube de a poco: el primer precipitado es el que alcanza su Kps con menos reactivo.</p>'
  }),'a) AgBr · b) PbCrO₄');

  S('p-g4-9',res({
   plan:'<p>Equilibrio combinado precipitación + ácido-base: el pH fija [S²⁻] a través de las dos disociaciones del H₂S. Con [S²⁻] se calcula Q y se compara con el Kps. Después, Le Châtelier para precipitar o disolver.</p>',
   datos:'<p>H₂S saturado 0,1 M; pH 3; [Co²⁺] = 0,01 M. '+tab('Ka₁ = 9,5·10⁻⁸ y Ka₂ = 1·10⁻¹⁹ del H₂S (Tabla 1). El CoS no figura en la Tabla 5: se usa Kps = 6,4·10⁻²³, el valor de otra edición de esta misma guía.')+'</p>',
   sist:rxs(['H2S(ac) + H2O(l) <=> HS^-(ac) + H3O^+(ac)','Ka₁'],['HS^-(ac) + H2O(l) <=> S^2-(ac) + H3O^+(ac)','Ka₂'],['H2S(ac) + 2 H2O(l) <=> S^2-(ac) + 2 H3O^+(ac)','K = Ka₁·Ka₂'],['CoS(s) <=> Co^2+(ac) + S^2-(ac)','Kps']),
   cuali:sup([['[H₂S] ≈ 0,1 M','a pH 3 la disociación del H₂S está reprimida por el H₃O⁺ del ácido fuerte (ion común).']]),
   cuanti:chain(R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}=\frac{9{,}5\times10^{-8}\cdot1\times10^{-19}\cdot0{,}1}{(10^{-3})^2}=9{,}5\times10^{-22}\ \mathrm{M}`,R`Q=[\mathrm{Co^{2+}}][\mathrm{S^{2-}}]=0{,}01\cdot9{,}5\times10^{-22}=9{,}5\times10^{-24}<K_{ps}=6{,}4\times10^{-23}`)+guia('No'),
   concl:'<p><b>No precipita.</b> Para favorecer la <b>precipitación total</b>: subir el pH (menos H₃O⁺ → por Le Châtelier el H₂S se disocia más → más S²⁻ → Q &gt; Kps), por ejemplo con una reguladora amoniacal. Para favorecer la <b>disolución</b>: acidificar más (el H₃O⁺ protona el S²⁻, baja su concentración libre, Q &lt; Kps y el sólido se disuelve).</p>'+sulfNote,
   jus:'<p>El pH controla [S²⁻]: a pH 3 es tan baja que Q no alcanza el Kps del CoS. Subir el pH aumenta [S²⁻] y lo precipita; bajarlo lo disuelve.</p>'
  }),'No precipita (Q = 9,5·10⁻²⁴ &lt; Kps); subir el pH para precipitar, acidificar para disolver');

  S('p-g4-10',res({
   plan:'<p>Con [S²⁻] fija (dato), para cada catión se calcula Q; si supera el Kps precipita hasta que la concentración que queda es Kps/[S²⁻].</p>',
   datos:'<p>[Pb²⁺] = [Mn²⁺] = 0,1 M; [S²⁻] = 1,2·10⁻¹⁵ M. '+tab('Kps PbS = 3·10⁻²⁸ y MnS = 3·10⁻¹⁴ (Tabla 5).')+'</p>',
   sist:rxs(['PbS(s) <=> Pb^2+(ac) + S^2-(ac)','Kps 3·10⁻²⁸'],['MnS(s) <=> Mn^2+(ac) + S^2-(ac)','Kps 3·10⁻¹⁴']),
   cuanti:chain([R`Q_{\mathrm{PbS}}=0{,}1\cdot1{,}2\times10^{-15}=1{,}2\times10^{-16}\gg3\times10^{-28}`,'precipita'],R`[\mathrm{Pb^{2+}}]=\frac{3\times10^{-28}}{1{,}2\times10^{-15}}=2{,}5\times10^{-13}\ \mathrm{M}`,[R`Q_{\mathrm{MnS}}=1{,}2\times10^{-16}<3\times10^{-14}`,'no precipita: [Mn²⁺] sigue 0,1 M']),
   concl:'<p>Queda Pb²⁺ = 2,5·10⁻¹³ M (precipitación completa: ≤ 10⁻⁵ M) y Mn²⁺ = 0,1 M. Para garantizar la precipitación de los dos hay que aumentar [S²⁻] subiendo el pH (medio amoniacal, como en el grupo III): el MnS necesita [S²⁻] ≥ 3·10⁻¹⁴/10⁻⁵ = 3·10⁻⁹ M para quedar en ≤ 10⁻⁵ M.</p>'+note('Respuesta impresa','<p>La guía da 2,83·10⁻³ M de plomo: el exponente parece una errata; con Kps 3,4·10⁻²⁸ da 2,83·10⁻¹³ M.</p>')+sulfNote,
   jus:'<p>El PbS, con Kps muchísimo menor, precipita casi por completo; el MnS no alcanza su Kps con ese sulfuro. Es la base de la separación de los grupos II y III.</p>'
  }),'Pb²⁺ = 2,5·10⁻¹³ M · Mn²⁺ = 0,1 M (no precipita); subir el pH para precipitar ambos');

  S('p-g4-17',res({
   plan:'<p>La solubilidad depende del pH porque el fosfato disuelto se reparte entre sus especies; sólo el HPO₄²⁻ entra en el Kps del CaHPO₄. Se calcula la fracción α del HPO₄²⁻ a pH 7,5.</p>',
   datos:'<p>10 mg de CaHPO₄ (M = 136,06) por 100 mL a pH 7,5; Ka₁ 7,11·10⁻³ · Ka₂ 6,34·10⁻⁸ · Ka₃ 4,22·10⁻¹³ (datos).</p>',
   sist:rxs(['CaHPO4(s) <=> Ca^2+(ac) + HPO4^2-(ac)','Kps = [Ca²⁺][HPO₄²⁻]'],['HPO4^2-(ac) + H3O^+(ac) <=> H2PO4^-(ac) + H2O(l)','1/Ka₂'],['HPO4^2-(ac) + H2O(l) <=> PO4^3-(ac) + H3O^+(ac)','Ka₃'])+M(R`\text{BM: }s=[\mathrm{Ca^{2+}}]=[\mathrm{H_3PO_4}]+[\mathrm{H_2PO_4^-}]+[\mathrm{HPO_4^{2-}}]+[\mathrm{PO_4^{3-}}]`),
   cuanti:chain(R`s=\frac{10\times10^{-3}\ \mathrm{g}/0{,}100\ \mathrm{L}}{136{,}06}=7{,}35\times10^{-4}\ \mathrm{M}`,R`\alpha_{\mathrm{HPO_4^{2-}}}=\frac{K_{a1}K_{a2}h}{h^3+K_{a1}h^2+K_{a1}K_{a2}h+K_{a1}K_{a2}K_{a3}}=0{,}667\quad(h=10^{-7{,}5})`,R`K_{ps}=[\mathrm{Ca^{2+}}][\mathrm{HPO_4^{2-}}]=s\cdot\alpha s=7{,}35\times10^{-4}\cdot0{,}667\cdot7{,}35\times10^{-4}=3{,}6\times10^{-7}`),
   cuali:'<p>A pH 7,5 (entre pKa₂ = 7,20 y pKa₃) el fosfato disuelto está 33 % como H₂PO₄⁻ y 67 % como HPO₄²⁻. El producto s² = 5,4·10⁻⁷ sería el Kps “condicional” a ese pH.</p>',
   jus:'<p>Lo disuelto (s) se reparte entre las especies del fosfato según el pH; en el Kps sólo entra la que forma el sólido (HPO₄²⁻). (Tabla 5: 1·10⁻⁷, del mismo orden.)</p>'
  }),'Kps ≈ 3,6·10⁻⁷');

  // ================================================================ REDOX
  const nern=R`E=E^\circ-\frac{0{,}0592}{n}\log Q`;
  S('r-g4-20',res({
   plan:'<p>Se balancea la redox por ion-electrón en medio ácido, se obtiene n (electrones totales intercambiados en la ecuación global) y se usa la relación entre E° y K.</p>',
   datos:'<p>E° Cr₂O₇²⁻|Cr³⁺ = 1,33 V; E° Sn⁴⁺|Sn(s) = −0,009 V (datos).</p>',
   sist:rxs(['Cr2O7^2-(ac) + 14 H^+(ac) + 6 e^- -> 2 Cr^3+(ac) + 7 H2O(l)','reducción · ×2'],['Sn(s) -> Sn^4+(ac) + 4 e^-','oxidación · ×3'],['2 Cr2O7^2-(ac) + 28 H^+(ac) + 3 Sn(s) -> 4 Cr^3+(ac) + 3 Sn^4+(ac) + 14 H2O(l)','n = 12 (mcm de 6 y 4)']),
   cuanti:chain(R`E^\circ=E^\circ_{\text{cát}}-E^\circ_{\text{án}}=1{,}33-(-0{,}009)=1{,}339\ \mathrm{V}`,R`\log K=\frac{n\,E^\circ}{0{,}0592}=\frac{12\cdot1{,}339}{0{,}0592}=271\ \Rightarrow\ K\approx10^{271}`),
   jus:'<p>n es el total de electrones de la ecuación global (12), no los de una hemirreacción. K enorme: reacción prácticamente completa.</p>'
  }),'K ≈ 10²⁷¹');

  S('r-g4-21',res({
   plan:'<p>Se escribe la reacción tal como la plantea el enunciado (el Sn reduce al Fe²⁺), se calcula E° y se corrige con Nernst.</p>',
   datos:'<p>[Fe²⁺] = 0,300 M; [Sn²⁺] = 0,500 M; E° Fe²⁺|Fe = −0,440 V; E° Sn²⁺|Sn = −0,136 V (datos).</p>',
   sist:rx('Fe^2+(ac) + Sn(s) -> Fe(s) + Sn^2+(ac)','n = 2'),
   cuanti:chain(R`E^\circ=-0{,}440-(-0{,}136)=-0{,}304\ \mathrm{V}`,nern,R`E=-0{,}304-\frac{0{,}0592}{2}\log\frac{[\mathrm{Sn^{2+}}]}{[\mathrm{Fe^{2+}}]}=-0{,}304-0{,}0296\log\frac{0{,}500}{0{,}300}=-0{,}311\ \mathrm{V}`),
   jus:'<p>E &lt; 0: tal como está escrita la reacción no es espontánea. Ocurre la inversa: el Fe (E° más negativo, mejor reductor) reduce al Sn²⁺. Los sólidos no entran en Q.</p>'
  }),'E = −0,311 V (no espontánea en ese sentido)');

  S('r-g4-22',res({
   plan:'<p>Se calcula el potencial de cada electrodo con Nernst (escrito como reducción). En el ánodo la [Pb²⁺] libre la fija el Kps del PbSO₄ con el sulfato del Na₂SO₄ (ion común). Después E = E cát − E án y el análisis del medio.</p>',
   datos:'<p>Na₂SO₄ 0,300 M; Cr₂O₇²⁻ 0,160 M; Cr³⁺ 0,270 M; H₃O⁺ 0,400 M; E° Pb²⁺|Pb = −0,126 V; E° Cr₂O₇²⁻|Cr³⁺ = 1,33 V (datos). '+tab('Kps PbSO₄ = 1,6·10⁻⁸ (Tabla 5; el enunciado no lo da).')+'</p>',
   sist:rxs(['Pb(s) + SO4^2-(ac) -> PbSO4(s) + 2 e^-','ánodo (oxidación)'],['Cr2O7^2-(ac) + 14 H3O^+(ac) + 6 e^- -> 2 Cr^3+(ac) + 21 H2O(l)','cátodo (reducción)']),
   cuanti:inc('b','Potencial de la pila',chain([R`[\mathrm{Pb^{2+}}]=\frac{K_{ps}}{[\mathrm{SO_4^{2-}}]}=\frac{1{,}6\times10^{-8}}{0{,}300}=5{,}3\times10^{-8}\ \mathrm{M}`,'ion común'],R`E_{\text{án}}=-0{,}126+\frac{0{,}0592}{2}\log(5{,}3\times10^{-8})=-0{,}341\ \mathrm{V}`,R`E_{\text{cát}}=1{,}33-\frac{0{,}0592}{6}\log\frac{0{,}270^2}{0{,}160\cdot0{,}400^{14}}=1{,}278\ \mathrm{V}`,R`E=1{,}278-(-0{,}341)=1{,}62\ \mathrm{V}`)),
   cuali:inc('a','¿Funcionaría en medio básico?','<p>No como está escrita: el H₃O⁺ es reactivo de la reducción del dicromato (aparece elevado a la 14 en Nernst), así que al bajar [H₃O⁺] el potencial del cátodo cae muchísimo. Además, en medio básico el dicromato pasa a cromato (CrO₄²⁻) y el Cr³⁺ precipita como Cr(OH)₃: cambian las especies de la hemirreacción.</p>'),
   jus:'<p>El ion común (sulfato) deja muy poco Pb²⁺ libre y eso baja el potencial del ánodo; la pila da 1,62 V. El medio ácido es indispensable para el dicromato.</p>'
  }),'b) E ≈ 1,62 V · a) no funcionaría en medio básico');

  S('r-g4-23',res({
   plan:'<p>Se calcula cada electrodo con Nernst escrito como reducción y su propio n; después E = E cát − E án.</p>',
   datos:'<p>E° Cr₂O₇²⁻|Cr³⁺ = 1,33 V; E° MnO₄⁻|Mn²⁺ = 1,51 V (datos).</p>',
   sist:rxs(['Cr2O7^2-(ac) + 14 H3O^+(ac) + 6 e^- -> 2 Cr^3+(ac) + 21 H2O(l)','electrodo izquierdo (ánodo)'],['MnO4^-(ac) + 8 H3O^+(ac) + 5 e^- -> Mn^2+(ac) + 12 H2O(l)','electrodo derecho (cátodo)']),
   cuanti:chain(R`E_{\text{án}}=1{,}33-\frac{0{,}0592}{6}\log\frac{0{,}125^2}{0{,}200\cdot0{,}600^{14}}=1{,}310\ \mathrm{V}`,R`E_{\text{cát}}=1{,}51-\frac{0{,}0592}{5}\log\frac{0{,}400}{0{,}150\cdot0{,}250^{8}}=1{,}448\ \mathrm{V}`,R`E_{\text{pila}}=1{,}448-1{,}310=0{,}138\ \mathrm{V}`),
   jus:'<p>E &gt; 0: la pila funciona como está escrita (el permanganato oxida al Cr³⁺). Es lo mismo que usar el n global (30) con el Q global.</p>'
  }),'E = 0,138 V');

  S('r-g4-24',res({
   plan:'<p>Se combinan dos hemirreacciones para obtener la disolución del AgCl, cuya constante es el Kps, y se usa log K = n·E°/0,0592.</p>',
   datos:'<p>E° AgCl|Ag = 0,22 V; E° Ag⁺|Ag = 0,80 V (datos).</p>',
   sist:rxs(['AgCl(s) + e^- -> Ag(s) + Cl^-(ac)','E°₁ = 0,22 V'],['Ag(s) -> Ag^+(ac) + e^-','oxidación: −E°₂ = −0,80 V'],['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','suma: K = Kps; E° = E°₁ − E°₂']),
   cuanti:chain(R`\log K_{ps}=\frac{n\,(E^\circ_{\mathrm{AgCl/Ag}}-E^\circ_{\mathrm{Ag^+/Ag}})}{0{,}0592}=\frac{1\cdot(0{,}22-0{,}80)}{0{,}0592}=-9{,}80`,R`K_{ps}=1{,}6\times10^{-10}`),
   jus:'<p>La suma de la reducción del AgCl y la oxidación de la plata es la disolución del AgCl: su E° (negativo) da un Kps chico. La Tabla 5 trae 1,8·10⁻¹⁰: coincide en el orden.</p>'
  }),'Kps = 10^((E°AgCl/Ag − E°Ag⁺/Ag)/0,0592) = 1,6·10⁻¹⁰');

  S('r-g4-25',res({
   plan:'<p>Es una pila de concentración: el mismo par Zn²⁺/Zn a los dos lados (E° = 0). Con el potencial medido se calcula el Zn²⁺ libre del lado del complejo y con eso la Kf.</p>',
   datos:'<p>[Zn(CN)₄²⁻] = 0,450 M; [CN⁻] = 2,65·10⁻¹ M; [Zn²⁺] (derecha) = 3,84·10⁻⁴ M; E = 0,099 V.</p>',
   sist:rxs(['Zn(s) -> Zn^2+(ac) + 2 e^-','ánodo (izquierda, Zn²⁺ libre muy bajo)'],['Zn^2+(ac) + 2 e^- -> Zn(s)','cátodo (derecha)'],['Zn^2+(ac) + 4 CN^-(ac) <=> [Zn(CN)4]^2-(ac)','Kf']),
   cuanti:chain(R`E=\frac{0{,}0592}{2}\log\frac{[\mathrm{Zn^{2+}}]_{\text{cát}}}{[\mathrm{Zn^{2+}}]_{\text{án}}}\ \Rightarrow\ \log\frac{3{,}84\times10^{-4}}{[\mathrm{Zn^{2+}}]_{\text{án}}}=\frac{2\cdot0{,}099}{0{,}0592}=3{,}34`,R`[\mathrm{Zn^{2+}}]_{\text{án}}=1{,}74\times10^{-7}\ \mathrm{M}`,R`K_f=\frac{[\mathrm{Zn(CN)_4^{2-}}]}{[\mathrm{Zn^{2+}}][\mathrm{CN^-}]^4}=\frac{0{,}450}{1{,}74\times10^{-7}\cdot0{,}265^4}=5{,}3\times10^{8}`),
   jus:'<p>El cátodo es el lado de mayor [Zn²⁺] libre. En el ánodo el Zn²⁺ libre es muy bajo porque está complejado: la diferencia de potencial mide cuánto.</p>'
  }),'Kf ≈ 5,3·10⁸');

  S('r-g4-26',res({
   plan:'<p>(a) Potencial de cada hemicelda con Nernst: la del cerio con sus concentraciones diluidas; la de plata con la Ag⁺ libre que deja el AgCl precipitado (exceso de Cl⁻). (b) Corriente despreciable significa E pila = 0: hay que ver si agregando Hg²⁺ (que secuestra Cl⁻) se pueden igualar los potenciales.</p>',
   datos:tab('E° Ag⁺/Ag = 0,80 V (Tabla 6) · Kps AgCl = 1,8·10⁻¹⁰ (Tabla 5) · el par Ce⁴⁺/Ce³⁺ no figura en la Tabla 6: E° ≈ 1,61 V (bibliografía).'),
   cuanti:inc('a','La pila',step('Hemicelda de cerio',chain(R`[\mathrm{Ce^{4+}}]=\frac{100\cdot2{,}5\times10^{-2}}{250}=0{,}010\ \mathrm{M}\qquad[\mathrm{Ce^{3+}}]=\frac{100\cdot2{,}5\times10^{-3}}{250}=0{,}0010\ \mathrm{M}`,R`E_{\mathrm{Ce}}=1{,}61-0{,}0592\log\frac{[\mathrm{Ce^{3+}}]}{[\mathrm{Ce^{4+}}]}=1{,}67\ \mathrm{V}`))+
     step('Hemicelda de plata',rx('Ag^+(ac) + Cl^-(ac) <=> AgCl(s)','al mezclar: Q ≫ Kps, precipita')+chain(R`[\mathrm{Cl^-}]=\frac{10-0{,}1}{200}=0{,}0495\ \mathrm{M}\ \Rightarrow\ [\mathrm{Ag^+}]=\frac{1{,}8\times10^{-10}}{0{,}0495}=3{,}6\times10^{-9}\ \mathrm{M}`,R`E_{\mathrm{Ag}}=0{,}80+0{,}0592\log(3{,}6\times10^{-9})=0{,}30\ \mathrm{V}`))+
     '<p><b>Cátodo:</b> Pt en Ce⁴⁺/Ce³⁺ (Ce⁴⁺(ac) + e⁻ → Ce³⁺(ac)). <b>Ánodo:</b> Ag (Ag(s) + Cl⁻(ac) → AgCl(s) + e⁻). E = 1,67 − 0,30 = 1,37 V. Los electrones van por el cable de la plata al platino; la corriente convencional, al revés.</p>')+
    inc('b','Nitrato de mercurio para que la corriente sea despreciable','<p>Haría falta E_Ag = E_Ce = 1,67 V. El Hg²⁺ secuestra Cl⁻ (HgCl₂ / [HgCl₄]²⁻ muy estables) y libera Ag⁺ del AgCl; pero aun con toda la plata libre (0,1 mmol en 200 mL = 5·10⁻⁴ M) el potencial máximo sería '+m(R`0{,}80+0{,}0592\log(5\times10^{-4})=0{,}60\ \mathrm{V}`)+'. No se pueden igualar los potenciales: <b>ninguna</b> masa de nitrato de mercurio logra corriente nula.</p>'),
   jus:'<p>El ion común (Cl⁻ en exceso) deja muy poca Ag⁺ libre y baja el potencial de la plata. El techo de ese electrodo (0,80 V con Ag⁺ 1 M; 0,60 V con toda la plata disponible) está muy por debajo del cerio.</p>'
  }),'a) E ≈ 1,37 V, cátodo Pt/Ce · b) imposible');
})();
