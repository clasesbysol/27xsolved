// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 4 (2/2): complejos (11–16, 18, 19)
// y los dos ejercicios de integración. Constantes del enunciado; si no las da, tablas del apéndice;
// si tampoco están en el apéndice, se aclara de dónde salen.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;
  const guia=(t,ok=true)=>A.rta(t,ok);
  const exceso=sup([['Todo el metal está como complejo','Kf muy grande y ligando en exceso: el equilibrio está totalmente desplazado hacia el complejo (Le Châtelier).'],['Ligando libre = total − n·(metal)','lo que devuelve la disociación del complejo es del orden del metal libre: despreciable.']]);

  S('c-g4-11',res({
   plan:'<p>Se compara la solubilidad del AgCl en agua y en amoníaco. Cualitativamente: el NH₃ forma un complejo con la Ag⁺ y, por Le Châtelier, se disuelve más sólido. Se confirma con la constante del equilibrio combinado.</p>',
   datos:'<p>s (agua) = 1,26·10⁻⁵ M (dato) → Kps = s² = 1,6·10⁻¹⁰. '+tab('Kf [Ag(NH₃)₂]⁺ = 1,6·10⁷ (dato de la integración 1 de esta guía).')+'</p>',
   sist:rxs(['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','Kps'],['Ag^+(ac) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac)','Kf'],['AgCl(s) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac) + Cl^-(ac)','K = Kps·Kf']),
   cuali:'<p><b>Aumenta.</b> El NH₃ (base de Lewis) se une a la Ag⁺ (ácido de Lewis) formando un complejo estable: baja la [Ag⁺] libre, Q = [Ag⁺][Cl⁻] &lt; Kps y, por Le Châtelier, se disuelve más AgCl hasta un nuevo equilibrio.</p>',
   cuanti:ilu(chain(R`K=1{,}6\times10^{-10}\cdot1{,}6\times10^{7}=2{,}5\times10^{-3}`,['\\frac{s^2}{(0{,}1-2s)^2}=K\\ \\Rightarrow\\ \\frac{s}{0{,}1-2s}=\\sqrt{K}\\ \\Rightarrow\\ s=4{,}6\\times10^{-3}\\ \\mathrm{M}','[complejo] = [Cl⁻] = s'])+'<p>Unas 360 veces más que en agua. (Se desprecia la pequeña protonación del NH₃.)</p>'),
   jus:'<p>La formación del complejo disminuye la concentración de Ag⁺ libre; para restablecer el equilibrio de solubilidad se disuelve más sólido. Lo disuelto está como [Ag(NH₃)₂]⁺ y Cl⁻.</p>'
  }),'Aumenta (≈ 4,6·10⁻³ M frente a 1,26·10⁻⁵ M en agua)');

  S('c-g4-12',res({
   plan:'<p>Se calculan las concentraciones después de mezclar; con Kf enorme y ligando en exceso, todo el zinc pasa a complejo; el Zn²⁺ libre sale de Kf.</p>',
   datos:'<p>250 mL de Zn²⁺ 1,5·10⁻³ M + 500 mL de CN⁻ 1 M → 750 mL; Kf = 1·10¹⁸ (dato); hidrólisis despreciada (enunciado).</p>',
   sist:sys({rx:[['Zn^2+(ac) + 4 CN^-(ac) <=> [Zn(CN)4]^2-(ac)',R`K_f=\frac{[\mathrm{Zn(CN)_4^{2-}}]}{[\mathrm{Zn^{2+}}][\mathrm{CN^-}]^4}=1\times10^{18}`]],bm:[R`C_{\mathrm{Zn}}=[\mathrm{Zn^{2+}}]+[\mathrm{Zn(CN)_4^{2-}}]\qquad C_{\mathrm{CN}}=[\mathrm{CN^-}]+4[\mathrm{Zn(CN)_4^{2-}}]`]}),
   cuali:exceso,
   cuanti:chain(R`C_{\mathrm{Zn}}=\frac{1{,}5\times10^{-3}\cdot250}{750}=5{,}0\times10^{-4}\ \mathrm{M}\qquad C_{\mathrm{CN}}=\frac{1\cdot500}{750}=0{,}667\ \mathrm{M}`,R`[\mathrm{Zn(CN)_4^{2-}}]=5{,}0\times10^{-4}\qquad[\mathrm{CN^-}]=0{,}667-4\cdot5{,}0\times10^{-4}=0{,}665`,R`[\mathrm{Zn^{2+}}]=\frac{5{,}0\times10^{-4}}{10^{18}\cdot0{,}665^4}=2{,}56\times10^{-21}\ \mathrm{M}`),
   verif:ver('<p>[Zn²⁺] ≪ 5·10⁻⁴ M ✔</p>')+guia('5·10⁻⁴; 0,665; 2,56·10⁻²¹'),
   esp:esp([['[Zn(CN)₄]²⁻','5,0·10⁻⁴'],['CN⁻','0,665'],['Zn²⁺','2,56·10⁻²¹']]),
   jus:'<p>Kf enorme y cianuro en gran exceso: prácticamente todo el zinc está complejado; el libre se calcula de Kf.</p>'
  }),'[Zn(CN)₄²⁻] = 5,0·10⁻⁴ M · [CN⁻] = 0,665 M · [Zn²⁺] = 2,56·10⁻²¹ M');

  S('c-g4-13',res({
   plan:'<p>Complejo muy estable con ligando en exceso: el metal libre se despeja de Kf con el ligando libre (total menos el unido).</p>',
   datos:'<p>[Co(en)₃]³⁺ 2·10⁻³ M; en total 1 M; Kf = 4,9·10⁴⁸ (dato).</p>',
   sist:rx('Co^3+(ac) + 3 en(ac) <=> [Co(en)3]^3+(ac)','Kf = 4,9·10⁴⁸'),
   cuali:exceso,
   cuanti:chain(R`[\mathrm{en}]_{\text{libre}}=1-3\cdot2\times10^{-3}=0{,}994\ \mathrm{M}`,R`[\mathrm{Co^{3+}}]=\frac{2\times10^{-3}}{4{,}9\times10^{48}\cdot0{,}994^3}=4{,}16\times10^{-52}\ \mathrm{M}`)+guia('4,16·10⁻⁵²'),
   jus:'<p>La etilendiamina es bidentada (3 por cobalto). Con Kf tan grande el Co³⁺ libre es prácticamente nulo.</p>'
  }),'[Co³⁺] = 4,16·10⁻⁵² M');

  S('c-g4-14',res({
   plan:'<p>Precipitación + complejos: se suma la disolución del Ag₂S con la formación del complejo (las K se multiplican) y se despeja el cianuro libre necesario para tener todo disuelto. El total suma el cianuro unido.</p>',
   datos:tab('Kps Ag₂S = 6·10⁻⁵¹ (Tabla 5). La Kf del [Ag(CN)₂]⁻ no figura en el apéndice: β₂ ≈ 1·10²¹ (bibliografía; tabla de la teoría).'),
   sist:rxs(['Ag2S(s) <=> 2 Ag^+(ac) + S^2-(ac)','Kps'],['2 Ag^+(ac) + 4 CN^-(ac) <=> 2 [Ag(CN)2]^-(ac)','Kf²'],['Ag2S(s) + 4 CN^-(ac) <=> 2 [Ag(CN)2]^-(ac) + S^2-(ac)','K = Kps·Kf²']),
   cuanti:chain(R`K=6\times10^{-51}\cdot(10^{21})^2=6\times10^{-9}`,[R`[\mathrm{Ag(CN)_2^-}]=0{,}2\ \mathrm{M}\qquad[\mathrm{S^{2-}}]=0{,}1\ \mathrm{M}`,'0,1 mol/L disueltos'],R`[\mathrm{CN^-}]^4=\frac{0{,}2^2\cdot0{,}1}{6\times10^{-9}}\ \Rightarrow\ [\mathrm{CN^-}]_{\text{libre}}=28{,}6\ \mathrm{M}`,R`C_{\text{total}}=28{,}6+2\cdot0{,}2=29\ \mathrm{M}`),
   concl:'<p><b>No es posible en el laboratorio:</b> el agua pura es ≈ 55 M y ninguna solución acuosa puede tener 29 M de cianuro. El Ag₂S es tan insoluble que ni un ligando tan fuerte lo disuelve.</p>'+note('Respuesta impresa','<p>224,5 M sale con Kps = 6,3·10⁻⁵⁰ y Kf = 5·10¹⁸ (otras tablas). Cambia el número, no la conclusión.</p>'),
   jus:'<p>Sumar reacciones es multiplicar sus constantes. La K global es tan chica que haría falta una concentración de cianuro imposible.</p>'
  }),'≈ 29 M de cianuro total: imposible');

  S('c-g4-15',res({
   plan:'<p>Disolución de un precipitado por formación de complejo: reacción combinada (K = Kps·Kf); con todo el PbSO₄ disuelto se despeja el Br⁻ libre necesario.</p>',
   datos:'<p>10⁻³ mol de PbSO₄ en 150 mL; hidrólisis del sulfato despreciada. '+tab('Kps PbSO₄ = 1,6·10⁻⁸ (Tabla 5). Kf [PbBr₄]²⁻ = 5,56·10¹³: no figura en el apéndice; es el valor de otra edición de esta guía.')+'</p>',
   sist:rxs(['PbSO4(s) <=> Pb^2+(ac) + SO4^2-(ac)','Kps'],['Pb^2+(ac) + 4 Br^-(ac) <=> [PbBr4]^2-(ac)','Kf'],['PbSO4(s) + 4 Br^-(ac) <=> [PbBr4]^2-(ac) + SO4^2-(ac)','K = Kps·Kf = 8,9·10⁵']),
   cuali:sup([['Todo el plomo disuelto está como complejo','Kf grande.']]),
   cuanti:chain(R`[\mathrm{PbBr_4^{2-}}]=[\mathrm{SO_4^{2-}}]=\frac{10^{-3}\ \mathrm{mol}}{0{,}150\ \mathrm{L}}=6{,}67\times10^{-3}\ \mathrm{M}`,R`[\mathrm{Br^-}]=\sqrt[4]{\frac{(6{,}67\times10^{-3})^2}{8{,}9\times10^{5}}}=2{,}7\times10^{-3}\ \mathrm{M}`),
   concl:note('Respuesta impresa','<p>2,46·10⁻³ M corresponde a Kps 2,2·10⁻⁸; con la Tabla 5 (1,6·10⁻⁸) da 2,7·10⁻³ M.</p>'),
   jus:'<p>Se pide el Br⁻ libre en el equilibrio (no el total). Con K = Kps·Kf y las concentraciones de complejo y sulfato fijadas por el sólido disuelto, se despeja directamente.</p>'
  }),'[Br⁻] libre mínimo ≈ 2,7·10⁻³ M');

  S('c-g4-16',res({
   plan:'<p>Mismo esquema: reacción combinada de disolución con el tiosulfato (K = Kps·Kf). Se despeja el tiosulfato libre y se le suma el unido (dos por plata) para tener el total; con la concentración del reactivo, el volumen.</p>',
   datos:'<p>4·10⁻⁴ mol de AgX; 100 mL de solución final; pKps = 12,1 (dato); Na₂S₂O₃ 0,1 M. '+tab('Kf [Ag(S₂O₃)₂]³⁻ = 2,9·10¹³ (no figura en el apéndice; tabla de la teoría).')+'</p>',
   sist:rxs(['AgX(s) <=> Ag^+(ac) + X^-(ac)','Kps = 10⁻¹²·¹'],['Ag^+(ac) + 2 S2O3^2-(ac) <=> [Ag(S2O3)2]^3-(ac)','Kf'],['AgX(s) + 2 S2O3^2-(ac) <=> [Ag(S2O3)2]^3-(ac) + X^-(ac)','K = Kps·Kf = 23']),
   cuali:sup([['Toda la plata disuelta está complejada','Kf grande.']]),
   cuanti:chain(R`[\mathrm{Ag(S_2O_3)_2^{3-}}]=[\mathrm{X^-}]=\frac{4\times10^{-4}}{0{,}100}=4\times10^{-3}\ \mathrm{M}`,R`[\mathrm{S_2O_3^{2-}}]_{\text{libre}}=\sqrt{\frac{(4\times10^{-3})^2}{23}}=8{,}3\times10^{-4}\ \mathrm{M}`,R`n_{\text{total}}=(8{,}3\times10^{-4}+2\cdot4\times10^{-3})\cdot0{,}100=8{,}8\times10^{-4}\ \mathrm{mol}\ \Rightarrow\ V=\frac{8{,}8\times10^{-4}}{0{,}1}=8{,}8\ \mathrm{mL}`),
   concl:guia('8,9 mL (con Kf 2,51·10¹³)'),
   jus:'<p>El tiosulfato total es el libre (para cumplir K) más el unido (2 por plata). La Kf usada cambia poco el resultado: 8,8 mL.</p>'
  }),'V mínimo ≈ 8,8 mL de Na₂S₂O₃ 0,1 M');

  S('c-g4-18',res({
   plan:'<p>Con el NH₃ en exceso toda la plata queda como diamminplata; con Kf se calcula la Ag⁺ libre. El máximo de Cl⁻ es el que hace Q = Kps del AgCl; de ahí, la masa de NaCl.</p>',
   datos:'<p>50,0 mL AgNO₃ 0,01 M + 50,0 mL NH₃ 1,00 M → 100 mL. '+tab('Kps AgCl = 1,8·10⁻¹⁰ (Tabla 5) · Kf [Ag(NH₃)₂]⁺ = 1,6·10⁷ (integración 1 de esta guía).')+'</p>',
   sist:rxs(['Ag^+(ac) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac)','Kf'],['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','Kps'],['NaCl(s) -> Na^+(ac) + Cl^-(ac)','total']),
   cuali:exceso+'<p>Se supone que el NH₃ no hidroliza (enunciado).</p>',
   cuanti:chain(R`C_{\mathrm{Ag}}=\frac{0{,}01\cdot50}{100}=5{,}0\times10^{-3}\ \mathrm{M}\qquad C_{\mathrm{NH_3}}=0{,}50\ \mathrm{M}`,R`[\mathrm{NH_3}]=0{,}50-2\cdot5{,}0\times10^{-3}=0{,}49\ \mathrm{M}`,R`[\mathrm{Ag^+}]=\frac{5{,}0\times10^{-3}}{1{,}6\times10^{7}\cdot0{,}49^2}=1{,}30\times10^{-9}\ \mathrm{M}`,R`[\mathrm{Cl^-}]_{\max}=\frac{1{,}8\times10^{-10}}{1{,}30\times10^{-9}}=0{,}138\ \mathrm{M}\ \Rightarrow\ m=0{,}138\cdot0{,}100\cdot58{,}44=0{,}81\ \mathrm{g}`),
   concl:note('Respuesta impresa','<p>0,856 g sale con la constante de inestabilidad 5,9·10⁻⁸ (Kf = 1,7·10⁷). Con la Kf de la guía (1,6·10⁷) da 0,81 g.</p>'),
   jus:'<p>El complejo deja muy poca Ag⁺ libre, así que hace falta mucho Cl⁻ (0,138 M) para que Q llegue al Kps del AgCl.</p>'
  }),'≈ 0,81 g de NaCl');

  S('c-g4-19',res({
   plan:'<p>Kf <b>chica</b> (140): no se puede suponer que todo el hierro se compleja. Se fija la concentración mínima de complejo visible, el Fe³⁺ libre es lo que queda, y con Kf se despeja el SCN⁻ libre.</p>',
   datos:'<p>1 ppm de Fe³⁺ (1 mg/L); [Fe(SCN)]²⁺ visible desde 6,4·10⁻⁶ M; Kf = 1,4·10² (dato).</p>',
   sist:sys({rx:[['Fe^3+(ac) + SCN^-(ac) <=> [Fe(SCN)]^2+(ac)',R`K_f=\frac{[\mathrm{FeSCN^{2+}}]}{[\mathrm{Fe^{3+}}][\mathrm{SCN^-}]}=1{,}4\times10^{2}`]],bm:[R`C_{\mathrm{Fe}}=[\mathrm{Fe^{3+}}]+[\mathrm{FeSCN^{2+}}]\qquad C_{\mathrm{SCN}}=[\mathrm{SCN^-}]+[\mathrm{FeSCN^{2+}}]`]}),
   cuali:'<p>Con Kf = 140 el complejo es poco estable: no es razonable suponer [Fe³⁺] baja respecto de [FeSCN²⁺]. Se usa el BM completo del hierro.</p>',
   cuanti:chain(R`C_{\mathrm{Fe}}=\frac{1\times10^{-3}\ \mathrm{g/L}}{55{,}85}=1{,}79\times10^{-5}\ \mathrm{M}`,R`[\mathrm{Fe^{3+}}]=1{,}79\times10^{-5}-6{,}4\times10^{-6}=1{,}15\times10^{-5}\ \mathrm{M}`,R`[\mathrm{SCN^-}]=\frac{6{,}4\times10^{-6}}{140\cdot1{,}15\times10^{-5}}=4{,}0\times10^{-3}\ \mathrm{M}`),
   verif:ver('<p>El SCN⁻ unido (6,4·10⁻⁶ M) es despreciable frente a 4·10⁻³ M: el total también es ≈ 0,004 M ✔.</p>')+guia('0,004 M'),
   jus:'<p>Con una Kf chica hace falta un exceso grande de ligando para formar suficiente complejo coloreado.</p>'
  }),'≈ 4,0·10⁻³ M de KSCN');

  // ================================================================ INTEGRACIÓN 1
  S('g4-int-1',res({
   plan:'<p>Cuatro partes de la marcha analítica, cada una con su equilibrio combinado: (1) complejo de plata + ácido-base y + precipitación; (2) complejo de cobre + precipitación del hidróxido; (3) reguladora del grupo IV; (4) redox del manganeso.</p>',
   cuali:inc('1A','Identificación de plata con HNO₃ (cualitativa)',rxs(['NH3(ac) + H3O^+(ac) -> NH4^+(ac) + H2O(l)','K = 1/Ka = 1,8·10⁹'],['[Ag(NH3)2]^+(ac) + Cl^-(ac) + 2 H3O^+(ac) -> AgCl(s) + 2 NH4^+(ac) + 2 H2O(l)','reaparece el precipitado blanco'])+'<p>El H₃O⁺ protona el NH₃ libre: el NH₄⁺ no tiene par libre y no compleja. Por Le Châtelier el complejo se disocia, aumenta la Ag⁺ libre y, con el Cl⁻ presente, Q &gt; Kps: reprecipita AgCl. K global ≈ 10²¹.</p>')+
    inc('1B','Identificación de plata con KI (cuantitativa)',chain(R`\text{datos: }C_{\mathrm{Ag}}=10^{-3},\ C_{\mathrm{NH_3}}=10^{-1},\ C_{\mathrm{I^-}}=10^{-2}\ \mathrm{M};\ K_f=1{,}6\times10^{7};\ K_{ps}(\mathrm{AgI})=8{,}52\times10^{-17}`)+exceso+chain(R`[\mathrm{NH_3}]_{\text{libre}}=0{,}1-2\cdot10^{-3}=0{,}098\ \mathrm{M}`,R`[\mathrm{Ag^+}]=\frac{10^{-3}}{1{,}6\times10^{7}\cdot0{,}098^2}=6{,}5\times10^{-9}\ \mathrm{M}`,R`Q_{\mathrm{AgI}}=6{,}5\times10^{-9}\cdot10^{-2}=6{,}5\times10^{-11}\gg K_{ps}=8{,}52\times10^{-17}`)+'<p><b>Precipita AgI</b> (amarillo): aunque la plata esté complejada, el Kps del AgI es tan chico que la poca Ag⁺ libre alcanza. La protonación del NH₃ se desprecia: con Kb = 1,8·10⁻⁵ sólo ≈ 1,4 % pasa a NH₄⁺.</p>')+
    inc('2','¿Precipita Cu(OH)₂ con NH₃ 5·10⁻³ M?',chain(R`\text{datos: }C_{\mathrm{Cu}}=10^{-4},\ C_{\mathrm{NH_3}}=5\times10^{-3}\ \mathrm{M};\ K_{ps}=4{,}8\times10^{-16};\ K_f=1{,}1\times10^{13};\ K_b=1{,}8\times10^{-5}`)+exceso+chain(R`[\mathrm{NH_3}]=5\times10^{-3}-4\cdot10^{-4}=4{,}6\times10^{-3}\ \mathrm{M}`,R`[\mathrm{Cu^{2+}}]=\frac{10^{-4}}{1{,}1\times10^{13}\cdot(4{,}6\times10^{-3})^4}=2{,}0\times10^{-8}\ \mathrm{M}`,R`[\mathrm{HO^-}]=\sqrt{K_b[\mathrm{NH_3}]}=2{,}9\times10^{-4}\ \mathrm{M}`,R`Q=2{,}0\times10^{-8}\cdot(2{,}9\times10^{-4})^2=1{,}7\times10^{-15}>K_{ps}=4{,}8\times10^{-16}`)+'<p><b>Sí precipita</b> (por poco): con tan poco NH₃ el complejo deja demasiado Cu²⁺ libre y el mismo NH₃ aporta HO⁻. Por eso en la marcha se usa amoníaco <b>concentrado</b>: más ligando libre (el Cu²⁺ libre baja con la cuarta potencia) y el cobre queda en solución.</p>')+
    inc('3','Grupo IV: ¿se usan reguladoras?',rxs(['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb = 1,8·10⁻⁵'],['(NH4)2CO3(s) -> 2 NH4^+(ac) + CO3^2-(ac)','total'],['CO3^2-(ac) + H2O(l) <=> HCO3^-(ac) + HO^-(ac)','Kb = Kw/Ka₂ = 1,8·10⁻⁴'],['Ca^2+(ac) + CO3^2-(ac) <=> CaCO3(s)','1/Kps (y lo mismo Sr, Ba)'])+'<p><b>Sí.</b> NH₃/NH₄Cl es un par conjugado débil con las dos formas apreciables: es una reguladora (rango 9,26 ± 1). Cumple dos funciones: mantiene el medio básico para que el CO₃²⁻ no se protone (y precipiten los carbonatos) y, por ion común (NH₄⁺), limita [HO⁻] para que no precipite Mg(OH)₂ (queda para el grupo V). <b>Máxima capacidad:</b> [NH₃] = [NH₄⁺], pH = pKa = 9,26 (relación 1, cada uno entre 0,05 y 1 M).</p>')+
    inc('4','Identificación de manganeso con bismutato',rxs(['NaBiO3(s) + 6 H^+(ac) + 2 e^- -> Bi^3+(ac) + Na^+(ac) + 3 H2O(l)','reducción (Bi +5 → +3) · ×5'],['Mn^2+(ac) + 4 H2O(l) -> MnO4^-(ac) + 8 H^+(ac) + 5 e^-','oxidación (Mn +2 → +7) · ×2'],['2 Mn^2+(ac) + 5 NaBiO3(s) + 14 H^+(ac) -> 2 MnO4^-(ac) + 5 Bi^3+(ac) + 5 Na^+(ac) + 7 H2O(l)','n = 10 · violeta (MnO₄⁻)'])+
     '<p><b>A) ¿Equilibrio?</b> No. El voltímetro marca 0,23 V ≠ 0: la reacción sigue avanzando. En el equilibrio E = 0 y Q = K.</p>'+
     chain(R`\textbf{B) }\log K=\frac{n\,(E^\circ_{\text{cát}}-E^\circ_{\text{án}})}{0{,}0592}=\frac{10\,(1{,}80-1{,}49)}{0{,}0592}=52\ \Rightarrow\ K\approx10^{52}`)+note('Constantes','<p>E° MnO₄⁻/Mn²⁺ = 1,49 V (Tabla 6). El bismutato no figura en la Tabla 6; en bibliografía su E° está entre 1,6 y 1,8 V (con 1,8 V, K ≈ 10⁵²; con 1,6 V, K ≈ 10¹⁹). En cualquier caso K ≫ 1: la oxidación es prácticamente completa.</p>')),
   jus:'<p>1A) el ácido destruye el complejo protonando el ligando. 1B) Q ≫ Kps: precipita AgI aun con la plata complejada. 2) con poco NH₃ el Cu(OH)₂ precipita; hace falta amoníaco concentrado. 3) NH₃/NH₄Cl regula a pH ≈ 9,3. 4) E ≠ 0: no hay equilibrio; K ≫ 1.</p>'
  }),'1A) reprecipita AgCl · 1B) precipita AgI · 2) sí precipita · 3) sí, NH₃/NH₄⁺ (pH 9,26) · 4) no está en equilibrio; K ≫ 1');

  // ================================================================ INTEGRACIÓN 2
  S('g4-int-2',res({
   plan:'<p>Dos muestras de pigmentos: (1) disolución en ácido de sales de aniones básicos, separación con una reguladora amoniacal (complejo de cobre y precipitado de plomo); (2) intercambio de ligandos en el mercurio y una redox con el cloruro estañoso.</p>',
   datos:tab('Kb NH₃ 1,8·10⁻⁵ (Tabla 2) · Kps PbCl₂ 1,6·10⁻⁵ y Pb(OH)₂ 1,2·10⁻¹⁵ (Tabla 5) · Kf [Cu(NH₃)₄]²⁺ 1,1·10¹³ (integración 1).'),
   cuali:inc('1a','Disolución con HNO₃',rxs(['PbCO3(s) + 2 H3O^+(ac) -> Pb^2+(ac) + CO2(g) + 3 H2O(l)','se disuelve con efervescencia'],['Cu3(AsO4)2(s) + 6 H3O^+(ac) -> 3 Cu^2+(ac) + 2 H3AsO4(ac) + 6 H2O(l)','se disuelve'])+'<p>CO₃²⁻ y AsO₄³⁻ son bases conjugadas de ácidos débiles: el H₃O⁺ las protona, baja su concentración libre, Q &lt; Kps y por Le Châtelier los sólidos se disuelven (el CO₂ además se escapa). El NO₃⁻ no forma precipitados: todos los nitratos son solubles.</p>')+
    inc('1b','¿Se podría usar HCl?',chain(R`Q_{\mathrm{PbCl_2}}=[\mathrm{Pb^{2+}}][\mathrm{Cl^-}]^2=4\times10^{-4}\cdot1^2=4\times10^{-4}>K_{ps}=1{,}6\times10^{-5}\quad(\text{HCl 1 M})`)+'<p>No conviene: el Cl⁻ precipitaría PbCl₂ (precipita desde [Cl⁻] ≈ 0,2 M) y se perdería plomo de la solución a analizar. El HNO₃ disuelve sin agregar aniones precipitantes.</p>')+
    inc('1c','NH₃ 0,1 M + NH₄Cl 0,75 M: ¿qué ocurre?',rxs(['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','Kb'],['Cu^2+(ac) + 4 NH3(ac) <=> [Cu(NH3)4]^2+(ac)','Kf = 1,1·10¹³ · azul intenso'],['Pb^2+(ac) + 2 HO^-(ac) <=> Pb(OH)2(s)','precipitado blanco'])+'<p>NH₃/NH₄⁺ es una <b>solución reguladora</b> (par conjugado, concentraciones apreciables, relación 0,13): por ion común el NH₄⁺ reprime la ionización del NH₃ y fija un pH moderadamente básico, '+m(R`\mathrm{pH}=9{,}26+\log\frac{0{,}1}{0{,}75}=8{,}38`)+'. El Cu²⁺ queda en solución como amincomplejo; el Pb²⁺, que no forma complejo amoniacal estable, tiende a precipitar como hidróxido: así se separan.</p>')+
    inc('1d','NH₃ libre despreciando el precipitado',exceso+chain(R`[\mathrm{NH_3}]_{\text{libre}}=0{,}1-4\cdot0{,}02=0{,}02\ \mathrm{M}`,R`[\mathrm{Cu^{2+}}]=\frac{0{,}02}{1{,}1\times10^{13}\cdot0{,}02^4}=1{,}1\times10^{-8}\ \mathrm{M}\ll0{,}02`)+'<p>Ojo: al consumirse el NH₃ en el complejo, el cociente del buffer cambia y el pH baja a '+m(R`9{,}26+\log\frac{0{,}02}{0{,}75}=7{,}68`)+'.</p>')+
    inc('1e','¿Es correcto despreciar el precipitado?','<p>Sí. El Pb²⁺ (4·10⁻⁴ M) es 50 veces menos que el Cu²⁺; aunque precipitara todo, consumiría ≈ 8·10⁻⁴ M de HO⁻ (que el NH₃ repone pasando a NH₄⁺), poco frente a 0,02 M de NH₃ libre y 0,75 M de NH₄⁺. No cambia ni el NH₃ libre ni el pH de forma apreciable.</p>'+note('Un detalle cuantitativo','<p>Con el pH ya corregido (7,68), Q del Pb(OH)₂ = 4·10⁻⁴·(4,8·10⁻⁷)² = 9·10⁻¹⁷, por debajo del Kps de la Tabla 5 (1,2·10⁻¹⁵): con estas cantidades el plomo podría no precipitar completo. Haría falta más NH₃ para que quede NH₃ libre en exceso y suba el pH.</p>'))+
    inc('2a','[HgCl₄]²⁻ con KI',rx('[HgCl4]^2-(ac) + 4 I^-(ac) <=> [HgI4]^2-(ac) + 4 Cl^-(ac)','K = β₄(HgI₄²⁻)/β₄(HgCl₄²⁻)')+'<p><b>Sí</b> hay reacción: el yoduro forma con el Hg²⁺ un complejo mucho más estable que el cloruro (β₄ ≈ 10³⁰ frente a 10¹⁵, bibliografía: no figuran en el apéndice), así que K ≈ 10¹⁴ ≫ 1 y el ligando más fuerte desplaza al cloruro (Le Châtelier). Con poco I⁻ puede verse el HgI₂ rojo, que con exceso se redisuelve como [HgI₄]²⁻.</p>')+
    inc('2b','Hg²⁺ con SnCl₂: ¿está en equilibrio?',rx('Hg^2+(ac) + Sn^2+(ac) -> Hg(l) + Sn^4+(ac)','n = 2; el Hg finamente dividido se ve negro')+'<p><b>No.</b> La diferencia de potencial medida es 0,23 V ≠ 0: la reacción sigue avanzando. En el equilibrio E = 0.</p>')+
    inc('2c','Constante de equilibrio',chain(R`E^\circ=E^\circ_{\mathrm{Hg^{2+}/Hg}}-E^\circ_{\mathrm{Sn^{4+}/Sn^{2+}}}=0{,}85-0{,}15=0{,}70\ \mathrm{V}`,R`\log K=\frac{2\cdot0{,}70}{0{,}0592}=23{,}6\ \Rightarrow\ K\approx4\times10^{23}`)+note('Constantes','<p>Ninguno de los dos pares está en la Tabla 6 (allí figura 2Hg²⁺/Hg₂²⁺ = 0,92 V); se usan los valores de bibliografía (0,85 y 0,15 V). K ≫ 1: reacción prácticamente completa.</p>')),
   jus:'<p>1) El ácido disuelve las sales de aniones básicos; el HCl no sirve porque precipita PbCl₂; la reguladora amoniacal compleja el cobre y deja precipitar el plomo. 2) El I⁻ desplaza al Cl⁻ del mercurio (complejo más estable); con E ≠ 0 la redox no está en equilibrio y su K es enorme.</p>'
  }),'1a) protonación de los aniones · 1b) no (PbCl₂) · 1c) buffer pH 8,38; Cu complejado · 1d) NH₃ libre 0,02 M · 1e) sí · 2a) sí · 2b) no · 2c) K ≈ 4·10²³');
})();
