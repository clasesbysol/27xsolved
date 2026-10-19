// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 3 (2/2):
// sales (hidrólisis), desafío del ácido fólico, soluciones reguladoras y desafío del metotrexato.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;
  const salPlan=(ion,tipo)=>`<p>Método de las sales: la sal es un electrolito fuerte y se disocia totalmente; ${ion} es conjugado de un electrolito débil y reacciona con el agua (${tipo}); el otro ion es espectador. Se plantea el equilibrio de hidrólisis con su constante (Ka·Kb = Kw), BM y BC, se justifican los desprecios, se calcula y se verifica.</p>`;

  // ================================================================ SALES
  S('g3s-1',res({
   plan:salPlan('el CN⁻','base débil: genera HO⁻'),
   datos:'<p>KCN 0,25 M; Ka(HCN) = 7,20·10⁻¹⁰ (dato).</p>',
   sist:sys({rx:[['KCN(s) -> K^+(ac) + CN^-(ac)','','sal: total'],['CN^-(ac) + H2O(l) <=> HCN(ac) + HO^-(ac)',R`K_b=\frac{K_w}{K_a}=\frac{10^{-14}}{7{,}20\times10^{-10}}=1{,}39\times10^{-5}`],W],bm:[R`0{,}25=[\mathrm{CN^-}]+[\mathrm{HCN}]\qquad[\mathrm{K^+}]=0{,}25`],bc:[R`[\mathrm{K^+}]+[\mathrm{H_3O^+}]=[\mathrm{CN^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>K⁺ viene del KOH (fuerte): no reacciona. CN⁻ es la base conjugada del HCN (débil): <b>básica</b>. Del BM y el BC (con [K⁺] = C): '+m(R`[\mathrm{HO^-}]=[\mathrm{HCN}]+[\mathrm{H_3O^+}]`)+'.</p>'+sup([['[H₃O⁺] baja respecto de [HCN]','medio básico.'],['[HCN] baja respecto de C (BM)','C/Kb = 18 000 &gt; 100.']]),
   cuanti:chain(R`[\mathrm{HO^-}]=\sqrt{K_bC}=\sqrt{1{,}39\times10^{-5}\cdot0{,}25}=1{,}86\times10^{-3}\ \mathrm{M}`,R`\mathrm{pOH}=2{,}73\ \Rightarrow\ \mathrm{pH}=11{,}27`),
   verif:ver('<p>1,86·10⁻³/0,25 = 0,75 % ✔ · [H₃O⁺] = 5,4·10⁻¹² M ≪ [HCN] ✔</p>'),
   esp:esp([['K⁺','0,25'],['CN⁻','0,248'],['HCN','1,86·10⁻³'],['HO⁻','1,86·10⁻³'],['H₃O⁺','5,4·10⁻¹²']]),
   jus:'<p>El CN⁻ es base débil (Kb = Kw/Ka): genera HO⁻. Se hidroliza poco (C/Kb ≫ 100) y el medio básico permite despreciar [H₃O⁺]. Verificado.</p>'
  }),'pH = 11,27');

  S('g3s-2',res({
   plan:'<p>Se calcula la concentración y se analiza el anión: el HSCN tiene Ka = 70, es decir, es un ácido <b>fuerte</b> en la práctica; su base conjugada prácticamente no tiene comportamiento básico.</p>',
   datos:'<p>4,5682 g de KSCN (M = 97,18 g/mol) en 250 mL; Ka(HSCN) = 70 (dato).</p>',
   sist:sys({rx:[['KSCN(s) -> K^+(ac) + SCN^-(ac)','','sal: total'],['SCN^-(ac) + H2O(l) <=> HSCN(ac) + HO^-(ac)',R`K_b=\frac{10^{-14}}{70}=1{,}4\times10^{-16}`],W],bc:[R`[\mathrm{K^+}]+[\mathrm{H_3O^+}]=[\mathrm{SCN^-}]+[\mathrm{HO^-}]`]}),
   cuanti:chain(R`C=\frac{4{,}5682/97{,}18}{0{,}250}=0{,}188\ \mathrm{M}`,R`K_bC=2{,}7\times10^{-17}\ll K_w`,R`[\mathrm{HO^-}]=\sqrt{K_bC+K_w}=1{,}00\times10^{-7}\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=7{,}00`),
   cuali:'<p>Ka = 70 es enorme (mayor que la de muchos ácidos “fuertes”): el SCN⁻ es una base tan débil que su aporte de HO⁻ es despreciable frente al del agua. Lo que fija el pH es la autoprotólisis.</p>',
   jus:'<p>Sal de ácido prácticamente fuerte y base fuerte: ninguno de sus iones altera el pH del agua. Solución neutra.</p>'
  }),'C = 0,188 M · pH = 7,00 (neutra)');

  S('g3s-3',res({
   plan:salPlan('el Ac⁻','base débil')+'<p>Se calcula el pH antes y después de diluir y se compara.</p>',
   datos:'<p>NaAc 2·10⁻¹ M, diluido 10 veces → 2·10⁻² M. '+tab('Ka HAc = 1,8·10⁻⁵ (Tabla 1) → Kb(Ac⁻) = 5,6·10⁻¹⁰.')+'</p>',
   sist:sys({rx:[['NaAc(s) -> Na^+(ac) + Ac^-(ac)','','total'],['Ac^-(ac) + H2O(l) <=> HAc(ac) + HO^-(ac)',R`K_b=5{,}6\times10^{-10}`],W],bm:[R`C=[\mathrm{Ac^-}]+[\mathrm{HAc}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [HAc]','medio básico.'],['[HAc] baja respecto de C','Kb muy baja: C/Kb ≫ 100 en los dos casos.']]),
   cuanti:chain(R`\text{0,2 M: }[\mathrm{HO^-}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}2}=1{,}05\times10^{-5}\Rightarrow\mathrm{pH}=9{,}02`,R`\text{0,02 M: }[\mathrm{HO^-}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}02}=3{,}33\times10^{-6}\Rightarrow\mathrm{pH}=8{,}52`,R`\Delta\mathrm{pH}=-0{,}50=-\tfrac12\log10`),
   verif:ver('<p>En la diluida el agua aportaría ≈ 10⁻⁷ M frente a 3,3·10⁻⁶ (3 %) ✔.</p>'),
   jus:'<p>Al diluir 10 veces una base débil, [HO⁻] = √(Kb·C) baja √10 veces: el pH baja media unidad (no una, como en los fuertes), porque al diluir se hidroliza una fracción mayor (Le Châtelier).</p>'
  }),'pH 9,02 → 8,52 (ΔpH = −0,50)');

  S('g3s-4',res({
   plan:salPlan('el NO₂⁻','base débil'),
   datos:'<p>KNO₂ 0,2 M. '+tab('Ka HNO₂ = 4,5·10⁻⁴ (Tabla 1) → Kb = 2,2·10⁻¹¹.')+'</p>',
   sist:sys({rx:[['KNO2(s) -> K^+(ac) + NO2^-(ac)','','total'],['NO2^-(ac) + H2O(l) <=> HNO2(ac) + HO^-(ac)',R`K_b=\frac{10^{-14}}{4{,}5\times10^{-4}}=2{,}2\times10^{-11}`],W],bm:[R`0{,}2=[\mathrm{NO_2^-}]+[\mathrm{HNO_2}]`],bc:[R`[\mathrm{K^+}]+[\mathrm{H_3O^+}]=[\mathrm{NO_2^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [HNO₂]','medio básico (habrá que verificarlo: la base es muy débil).'],['[HNO₂] baja respecto de C','C/Kb ≫ 100.']]),
   cuanti:chain(R`[\mathrm{HO^-}]=\sqrt{2{,}2\times10^{-11}\cdot0{,}2}=2{,}1\times10^{-6}\ \mathrm{M}`,R`\mathrm{pOH}=5{,}68\ \Rightarrow\ \mathrm{pH}=8{,}32`),
   verif:ver('<p>El agua aportaría como máximo 10⁻⁷ M de HO⁻: 4,7 % de 2,1·10⁻⁶ ✔ (al límite; con √(KbC + Kw) da lo mismo: 2,11·10⁻⁶ M).</p>'),
   jus:'<p>NO₂⁻ base conjugada de un ácido débil: básica, pero muy levemente (Kb = 2,2·10⁻¹¹). El aporte del agua queda justo dentro del 5 %.</p>'
  }),'[HO⁻] = 2,1·10⁻⁶ M · pH = 8,32');

  S('g3s-5',res({
   plan:'<p>El porcentaje de hidrólisis es la fracción de la sal que reaccionó con el agua: '+m(R`\%h=\frac{[\mathrm{HCN}]}{C}\cdot100`)+'. Se calcula [HCN] con el equilibrio de hidrólisis.</p>',
   datos:'<p>NaCN 0,1 M. '+tab('El enunciado no da Ka: Tabla 1, Ka(HCN) = 4,9·10⁻¹⁰ → Kb = 2,0·10⁻⁵.')+'</p>',
   sist:sys({rx:[['NaCN(s) -> Na^+(ac) + CN^-(ac)','','total'],['CN^-(ac) + H2O(l) <=> HCN(ac) + HO^-(ac)',R`K_b=\frac{10^{-14}}{4{,}9\times10^{-10}}=2{,}0\times10^{-5}`],W],bm:[R`0{,}1=[\mathrm{CN^-}]+[\mathrm{HCN}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{CN^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [HCN]','medio básico.'],['[HCN] baja respecto de C','C/Kb = 4900 &gt; 100.']]),
   cuanti:chain(R`[\mathrm{HCN}]=[\mathrm{HO^-}]=\sqrt{2{,}0\times10^{-5}\cdot0{,}1}=1{,}43\times10^{-3}\ \mathrm{M}`,R`\%h=\frac{1{,}43\times10^{-3}}{0{,}1}\cdot100=1{,}4\,\%\qquad\mathrm{pH}=11{,}15`),
   verif:ver('<p>1,4 % ≤ 5 % ✔</p>'),
   jus:'<p>El CN⁻ es una base débil de Kb relativamente alta (10⁻⁵): se hidroliza el 1,4 % de la sal.</p>'
  }),'Hidrólisis: 1,4 % (pH 11,15)');

  S('g3s-6',res({
   plan:'<p>Problema “al revés”: del pH sale [HO⁻]; del BC (medio básico), [HAc] = [HO⁻]; de Kb, [Ac⁻]; y del BM, la concentración de la sal.</p>',
   datos:'<p>NaAc de pH 9,3. '+tab('Kb(Ac⁻) = Kw/Ka = 5,6·10⁻¹⁰ (Ka de la Tabla 1).')+'</p>',
   sist:sys({rx:[['Ac^-(ac) + H2O(l) <=> HAc(ac) + HO^-(ac)',R`K_b=5{,}6\times10^{-10}`],W],bm:[R`C=[\mathrm{Ac^-}]+[\mathrm{HAc}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]\Rightarrow[\mathrm{HO^-}]=[\mathrm{HAc}]+[\mathrm{H_3O^+}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [HAc]','pH 9,3: [H₃O⁺] = 5·10⁻¹⁰ M frente a 2·10⁻⁵ M.']]),
   cuanti:chain(R`[\mathrm{HO^-}]=10^{-(14-9{,}3)}=2{,}0\times10^{-5}\ \mathrm{M}=[\mathrm{HAc}]`,R`[\mathrm{Ac^-}]=\frac{[\mathrm{HAc}][\mathrm{HO^-}]}{K_b}=\frac{(2{,}0\times10^{-5})^2}{5{,}6\times10^{-10}}=0{,}717\ \mathrm{M}`,R`C=0{,}717+2\times10^{-5}=0{,}717\ \mathrm{M}`),
   jus:'<p>Del pH se conoce [HO⁻]; en medio básico, [HAc] = [HO⁻]. La concentración de acetato sale de Kb y la de la sal del BM.</p>'
  }),'C ≈ 0,72 M');

  S('g3s-7',res({
   plan:'<p>La sal KA es básica (pH 8,5): A⁻ es una base débil. Del pH sale [HO⁻] = [HA]; con el BM sale [A⁻]; con eso, Kb; y Ka = Kw/Kb.</p>',
   datos:'<p>KA 0,15 M; pH 8,5.</p>',
   sist:sys({rx:[['KA(s) -> K^+(ac) + A^-(ac)','','total'],['A^-(ac) + H2O(l) <=> HA(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{HA}][\mathrm{HO^-}]}{[\mathrm{A^-}]}`],W],bm:[R`0{,}15=[\mathrm{A^-}]+[\mathrm{HA}]`],bc:[R`[\mathrm{HO^-}]=[\mathrm{HA}]+[\mathrm{H_3O^+}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [HA]','pH 8,5: 3,2·10⁻⁹ M frente a 3,2·10⁻⁶ M.']]),
   cuanti:chain(R`[\mathrm{HO^-}]=10^{-5{,}5}=3{,}16\times10^{-6}\ \mathrm{M}=[\mathrm{HA}]`,R`K_b=\frac{(3{,}16\times10^{-6})^2}{0{,}15-3{,}16\times10^{-6}}=6{,}7\times10^{-11}`,R`K_a=\frac{K_w}{K_b}=\frac{10^{-14}}{6{,}7\times10^{-11}}=1{,}5\times10^{-4}`),
   jus:'<p>El pH básico indica que A⁻ hidroliza. Con [HA] = [HO⁻] (BC en medio básico) y el BM se obtiene Kb; la Ka del ácido sale de Ka·Kb = Kw.</p>'
  }),'Ka(HA) = 1,5·10⁻⁴');

  S('g3s-8',res({
   plan:'<p>El porcentaje de hidrólisis da [NH₃] (lo que reaccionó del NH₄⁺). Con el BC (medio ácido) [H₃O⁺] = [NH₃]; se calcula Ka del NH₄⁺ y Kb = Kw/Ka.</p>',
   datos:'<p>NH₄Cl 10⁻³ M, hidrolizado 0,074 %.</p>',
   sist:sys({rx:[['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','','total'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{NH_3}][\mathrm{H_3O^+}]}{[\mathrm{NH_4^+}]}`],W],bm:[R`10^{-3}=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{NH_3}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [NH₃]','medio ácido (se verifica al final).']]),
   cuanti:chain(R`[\mathrm{NH_3}]=0{,}00074\cdot10^{-3}=7{,}4\times10^{-7}\ \mathrm{M}=[\mathrm{H_3O^+}]`,R`K_a=\frac{(7{,}4\times10^{-7})^2}{10^{-3}-7{,}4\times10^{-7}}=5{,}5\times10^{-10}`,R`K_b=\frac{K_w}{K_a}=1{,}8\times10^{-5}`),
   verif:ver('<p>[HO⁻] = 1,35·10⁻⁸ M: 1,8 % de [NH₃] ✔. Coincide con la Tabla 2 (1,8·10⁻⁵) ✔.</p>'),
   jus:'<p>El NH₄⁺ es ácido débil; lo hidrolizado es [NH₃] y en medio ácido [H₃O⁺] = [NH₃]. Ka·Kb = Kw da la constante del amoníaco.</p>'
  }),'Kb(NH₃) = 1,8·10⁻⁵');

  S('g3s-9',res({
   plan:salPlan('el CH₃NH₃⁺','ácido débil: genera H₃O⁺'),
   datos:'<p>CH₃NH₃Cl 2,0 M; pKb (metilamina) = 3,36 → Kb = 4,4·10⁻⁴.</p>',
   sist:sys({rx:[['CH3NH3Cl(s) -> CH3NH3^+(ac) + Cl^-(ac)','','total'],['CH3NH3^+(ac) + H2O(l) <=> CH3NH2(ac) + H3O^+(ac)',R`K_a=\frac{K_w}{K_b}=\frac{10^{-14}}{4{,}4\times10^{-4}}=2{,}3\times10^{-11}`],W],bm:[R`2{,}0=[\mathrm{CH_3NH_3^+}]+[\mathrm{CH_3NH_2}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{CH_3NH_2}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [CH₃NH₂]','medio ácido.'],['[CH₃NH₂] baja respecto de C','C/Ka enorme.']]),
   cuanti:chain(R`[\mathrm{H_3O^+}]=\sqrt{2{,}3\times10^{-11}\cdot2{,}0}=6{,}8\times10^{-6}\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=5{,}17`),
   verif:ver('<p>6,8·10⁻⁶/2,0 ≈ 3·10⁻⁴ % ✔ · [HO⁻] = 1,5·10⁻⁹ M ≪ 6,8·10⁻⁶ ✔</p>'),
   jus:'<p>Cl⁻ espectador; CH₃NH₃⁺ ácido conjugado de una base débil: ácida. Se hidroliza muy poco.</p>'
  }),'pH = 5,17');

  S('g3s-10',res({
   plan:'<p>Se busca la concentración de NH₄NO₃ que da pH 5,4: del pH sale [H₃O⁺] = [NH₃] (BC en medio ácido); de Ka, [NH₄⁺]; del BM, C; y la masa para 1 L.</p>',
   datos:'<p>pH 5,4; 1 L. '+tab('Ka(NH₄⁺) = Kw/Kb = 5,56·10⁻¹⁰ (Kb Tabla 2). M(NH₄NO₃) = 80,04 g/mol.')+'</p>',
   sist:sys({rx:[['NH4NO3(s) -> NH4^+(ac) + NO3^-(ac)','','total'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a=5{,}56\times10^{-10}`],W],bm:[R`C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{NH_3}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [NH₃]','pH 5,4: 2,5·10⁻⁹ M frente a 4·10⁻⁶ M.']]),
   cuanti:chain(R`[\mathrm{H_3O^+}]=10^{-5{,}4}=3{,}98\times10^{-6}\ \mathrm{M}=[\mathrm{NH_3}]`,R`[\mathrm{NH_4^+}]=\frac{[\mathrm{NH_3}][\mathrm{H_3O^+}]}{K_a}=\frac{(3{,}98\times10^{-6})^2}{5{,}56\times10^{-10}}=0{,}0285\ \mathrm{M}`,R`C=0{,}0285\ \mathrm{M}\ \Rightarrow\ m=0{,}0285\cdot80{,}04=2{,}28\ \mathrm{g}`),
   jus:'<p>El NH₄⁺ es ácido débil; con el pH se conoce [NH₃] y con Ka la [NH₄⁺], que es prácticamente toda la sal.</p>'
  }),'≈ 2,28 g de NH₄NO₃ por litro');

  S('g3s-11',res({
   plan:'<p>Sal de ácido débil (benzoico) y base débil (amoníaco): los dos iones reaccionan con el agua. Se comparan constantes y se usa la expresión para sales de débil + débil, justificando sus supuestos.</p>',
   datos:'<p>NH₄C₆H₅COO 10⁻² M. '+tab('Ka benzoico = 6,5·10⁻⁵ (Tabla 1) · Kb NH₃ = 1,8·10⁻⁵ (Tabla 2).')+'</p>',
   sist:sys({rx:[['NH4C7H5O2(s) -> NH4^+(ac) + C7H5O2^-(ac)','','total'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a(\mathrm{NH_4^+})=5{,}6\times10^{-10}`],['C7H5O2^-(ac) + H2O(l) <=> C7H5O2H(ac) + HO^-(ac)',R`K_b(\mathrm{Bz^-})=\frac{10^{-14}}{6{,}5\times10^{-5}}=1{,}5\times10^{-10}`],W],bm:[R`C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{Bz^-}]+[\mathrm{HBz}]`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Bz^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>Ka(NH₄⁺) = 5,6·10⁻¹⁰ &gt; Kb(Bz⁻) = 1,5·10⁻¹⁰: el amonio genera algo más de H₃O⁺ que el HO⁻ que genera el benzoato. Se espera un medio <b>levemente ácido</b>.</p>'+sup([['[H₃O⁺] y [HO⁻] bajas respecto de [NH₃] y [HBz] en el BC combinado','los dos iones hidrolizan “juntos” y lo que forma uno lo neutraliza el otro: queda [NH₃] ≈ [HBz].'],['se hidroliza una fracción chica de cada ion','constantes muy bajas.']]),
   cuanti:chain(R`[\mathrm{H_3O^+}]=\sqrt{\frac{K_wK_a(\mathrm{HBz})}{K_b(\mathrm{NH_3})}}=\sqrt{\frac{10^{-14}\cdot6{,}5\times10^{-5}}{1{,}8\times10^{-5}}}=1{,}9\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}72`),
   jus:'<p>Los dos iones hidrolizan; gana el de mayor constante (Ka del NH₄⁺): levemente ácida. El resultado no depende de la concentración mientras C ≫ Ka(HBz).</p>'
  }),'pH = 6,72 (levemente ácida)');

  S('g3s-12',res({
   plan:'<p>Sal de ácido débil (HCN) y base débil (NH₃). Se comparan Ka(NH₄⁺) y Kb(CN⁻). Ojo: acá las dos constantes son parecidas y altas para una hidrólisis, así que conviene revisar el supuesto de “fracción chica”.</p>',
   datos:'<p>NH₄CN 0,3 M. '+tab('Ka HCN = 4,9·10⁻¹⁰ (Tabla 1) · Kb NH₃ = 1,8·10⁻⁵ (Tabla 2).')+'</p>',
   sist:sys({rx:[['NH4CN(s) -> NH4^+(ac) + CN^-(ac)','','total'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a(\mathrm{NH_4^+})=5{,}6\times10^{-10}`],['CN^-(ac) + H2O(l) <=> HCN(ac) + HO^-(ac)',R`K_b(\mathrm{CN^-})=2{,}0\times10^{-5}`],W],bm:[R`0{,}3=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{CN^-}]+[\mathrm{HCN}]`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{CN^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>Kb(CN⁻) = 2,0·10⁻⁵ ≫ Ka(NH₄⁺) = 5,6·10⁻¹⁰: predomina el carácter <b>básico</b>.</p>',
   cuanti:chain(R`\mathrm{NH_4^+}+\mathrm{CN^-}\rightleftharpoons\mathrm{NH_3}+\mathrm{HCN}\qquad K=\frac{K_a(\mathrm{NH_4^+})}{K_a(\mathrm{HCN})}=\frac{5{,}6\times10^{-10}}{4{,}9\times10^{-10}}=1{,}13`,[R`\frac{x^2}{(0{,}3-x)^2}=1{,}13\ \Rightarrow\ x=[\mathrm{NH_3}]=[\mathrm{HCN}]=0{,}155\ \mathrm{M}`,'¡se “hidroliza” la mitad!'],R`[\mathrm{H_3O^+}]=K_a(\mathrm{HCN})\frac{[\mathrm{HCN}]}{[\mathrm{CN^-}]}=4{,}9\times10^{-10}\cdot\frac{0{,}155}{0{,}145}=5{,}2\times10^{-10}\ \mathrm{M}`,R`[\mathrm{HO^-}]=\frac{10^{-14}}{5{,}2\times10^{-10}}=1{,}9\times10^{-5}\ \mathrm{M}\qquad\mathrm{pH}=9{,}28`),
   verif:'<p>La expresión simple '+m(R`[\mathrm{H_3O^+}]=\sqrt{K_wK_a/K_b}=5{,}2\times10^{-10}`)+' da el mismo pH porque [NH₃] = [HCN] y [NH₄⁺] = [CN⁻], aunque el supuesto de “fracción chica” no se cumpla: reacciona el 52 % de cada ion.</p>',
   jus:'<p>Gana el carácter básico del cianuro (Kb ≫ Ka del amonio). El par reacciona entre sí en gran proporción (K ≈ 1), pero por la simetría del sistema el pH sale igual que con la fórmula de débil + débil.</p>'
  }),'[HO⁻] = 1,9·10⁻⁵ M · pH = 9,28');

  // ---------------------------------------------------------------- Desafío fólico
  const fol=sys({rx:[['H2Fol(ac) + H2O(l) <=> HFol^-(ac) + H3O^+(ac)',R`K_{a1}=10^{-2{,}3}=5{,}0\times10^{-3}`],['HFol^-(ac) + H2O(l) <=> Fol^2-(ac) + H3O^+(ac)',R`K_{a2}=10^{-8{,}3}=5{,}0\times10^{-9}`],W],bm:[R`C=[\mathrm{H_2Fol}]+[\mathrm{HFol^-}]+[\mathrm{Fol^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HFol^-}]+2[\mathrm{Fol^{2-}}]+[\mathrm{HO^-}]`]});
  S('g3s-f',res({
   plan:'<p>Es un diprótico débil cuyo comportamiento depende del pH del medio (sangre, estómago). Se usan las fracciones de distribución α (diagrama de especiación) con el pH dado; donde hace falta una concentración, se calcula con la dosis.</p>',
   datos:'<p>Ácido fólico (H₂Fol, C₁₉H₁₉N₇O₆, M = 441,4 g/mol); pKa₁ 2,3; pKa₂ 8,3. Dosis 5 mg. Jugo gástrico pH 1, 1,5 a 2 L.</p>',
   cuali:inc('1a','Descripción del sistema',fol+'<p>Diprótico débil: un protón por equilibrio, Ka₁ ≫ Ka₂.</p>')+
    inc('1b','Especies despreciables a pH 7,4',spec([2.3,8.3],['H₂Fol','HFol⁻','Fol²⁻'],{mark:[{pH:7.4,label:'sangre'}]})+chain(R`D=h^2+K_{a1}h+K_{a1}K_{a2}\quad(h=3{,}98\times10^{-8})`,R`\alpha_{\mathrm{H_2Fol}}=7{,}1\times10^{-6}\qquad\alpha_{\mathrm{HFol^-}}=0{,}888\qquad\alpha_{\mathrm{Fol^{2-}}}=0{,}112`)+'<p>pH 7,4 está 5 unidades por encima de pKa₁: el <b>H₂Fol es despreciable</b> (no nulo). Predomina HFol⁻ con una fracción apreciable de Fol²⁻ (7,4 está 0,9 por debajo de pKa₂).</p>')+
    inc('1c','Concentración de todas las especies a pH 7,4','<p>El enunciado no da la concentración total en sangre: [especie] = α·C. Como ejemplo, con la dosis de 5 mg distribuida en 4 L de sangre (volumen del ej. 11 de reguladoras):</p>'+chain(R`C=\frac{5\times10^{-3}/441{,}4}{4}=2{,}8\times10^{-6}\ \mathrm{M}`)+esp([['H₂Fol','2,0·10⁻¹¹'],['HFol⁻','2,5·10⁻⁶'],['Fol²⁻','3,2·10⁻⁷']]))+
    inc('2','¿Afecta el pH del estómago?',chain(R`n_{\mathrm{H_2Fol}}=\frac{5\times10^{-3}}{441{,}4}=1{,}1\times10^{-5}\ \mathrm{mol}\qquad n_{\mathrm{H_3O^+}}=0{,}1\cdot1{,}5=0{,}15\ \mathrm{mol}`)+'<p><b>No.</b> El ácido fólico es débil, está en una cantidad 10⁴ veces menor que el H₃O⁺ del jugo gástrico y, a pH 1, su disociación está totalmente reprimida (ion común): queda como H₂Fol.</p>')+
    inc('3a','Carácter ácido-base de las sales de sodio',table(['Sal','Qué hace el anión','Carácter'],[['NaHFol','anfiprótico: Ka₂ = 5,0·10⁻⁹ frente a Kb = Kw/Ka₁ = 2,0·10⁻¹²: gana el carácter ácido','levemente ácida: pH ≈ ½(2,3 + 8,3) = 5,3'],['Na₂Fol','Fol²⁻ + H₂O ⇌ HFol⁻ + HO⁻, Kb = Kw/Ka₂ = 2,0·10⁻⁶','básica']])+'<p>En las dos, el Na⁺ (de base fuerte) es espectador.</p>')+
    inc('3b','Folato de sodio a pH sanguíneo','<p>Las fracciones dependen sólo del pH, no de qué sal se disolvió: a pH 7,4 el folato se protona mayoritariamente a HFol⁻ (89 %) y queda 11 % como Fol²⁻. El H₂Fol es despreciable.</p>')+
    inc('3c','Anión folato en el estómago (1 comprimido)',chain(R`C=\frac{1{,}1\times10^{-5}\ \mathrm{mol}}{1{,}5\text{ a }2\ \mathrm{L}}=7{,}6\times10^{-6}\text{ a }5{,}7\times10^{-6}\ \mathrm{M}`,R`\mathrm{pH}\ 1:\ \alpha_{\mathrm{HFol^-}}=0{,}048\qquad\alpha_{\mathrm{Fol^{2-}}}=\frac{K_{a1}K_{a2}}{D}=2{,}4\times10^{-9}`,R`[\mathrm{Fol^{2-}}]=1{,}8\times10^{-14}\text{ a }1{,}4\times10^{-14}\ \mathrm{M}\qquad[\mathrm{HFol^-}]=3{,}6\times10^{-7}\text{ a }2{,}7\times10^{-7}\ \mathrm{M}`)+'<p>En el estómago el folato (Fol²⁻) es despreciable: aunque se administre como sal, el medio ácido lo protona casi todo a H₂Fol.</p>'),
   jus:'<p>Todo se decide con la especiación: a pH 7,4 predomina HFol⁻ (89 %) con 11 % de Fol²⁻ y H₂Fol despreciable; a pH 1 predomina H₂Fol y el folato es despreciable. La dosis es demasiado chica para cambiar el pH del estómago.</p>'
  }),'pH 7,4: HFol⁻ 89 %, Fol²⁻ 11 %, H₂Fol despreciable · no cambia el pH del estómago · [Fol²⁻] en el estómago ≈ 10⁻¹⁴ M');

  // ================================================================ REGULADORAS
  const hh=R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_B}{C_A}`;
  S('b-g3-1',res({
   plan:'<p>Paso 1 del diseño: el pH buscado tiene que estar dentro de pKa ± 1, y cuanto más cerca del pKa, mayor capacidad. Se compara la distancia de cada pKa a 3,1.</p>',
   cuali:table(['Ácido','pKa','|pH − pKa|','¿Dentro de pKa ± 1?'],[['peróxido de hidrógeno','11,65','8,55','no'],['ácido propanoico','4,874','1,77','no'],['ácido cianoacético','2,472','0,63','sí'],['ácido 4-aminobencensulfónico','3,232','0,13','sí, el más cercano']]),
   jus:'<p>El ácido 4-aminobencensulfónico (pKa 3,232) es el más adecuado: su pKa está a 0,13 unidades del pH buscado, así que la relación base/ácido sería ≈ 0,74 (cercana a 1: máxima capacidad). El cianoacético también serviría, con menor capacidad.</p>'
  }),'Ácido 4-aminobencensulfónico (pKa 3,232)');

  S('b-g3-2',res({
   plan:'<p>(a) Se calculan los moles de cada componente, se verifica que se cumplan los tres requisitos y se aplica Henderson (verificando su supuesto). (b) Primero la reacción completa del ácido fuerte con la base del par (estequiometría), después Henderson con los nuevos moles.</p>',
   datos:'<p>Imidazol (Im, M = 68,08 g/mol) 1,00 g; cloruro de imidazol (ImH⁺Cl⁻, M = 104,54 g/mol) 1,00 g; 100 mL. pKb = 7,007 → pKa(ImH⁺) = 14 − 7,007 = 6,993. HClO₄ 1,07 M.</p>',
   sist:sys({rx:[['ImHCl(s) -> ImH^+(ac) + Cl^-(ac)','','sal: total'],['ImH^+(ac) + H2O(l) <=> Im(ac) + H3O^+(ac)',R`K_a=10^{-6{,}993}=1{,}02\times10^{-7}`],W],bm:[R`C_{\mathrm{Im}}+C_{\mathrm{ImH^+}}=[\mathrm{Im}]+[\mathrm{ImH^+}]`],bc:[R`[\mathrm{ImH^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}),
   cuanti:inc('a','pH inicial y ¿es reguladora?',chain(R`n_{\mathrm{Im}}=\frac{1{,}00}{68{,}08}=14{,}69\ \mathrm{mmol}\ (0{,}147\ \mathrm{M})\qquad n_{\mathrm{ImH^+}}=\frac{1{,}00}{104{,}54}=9{,}57\ \mathrm{mmol}\ (0{,}0957\ \mathrm{M})`,hh,R`\mathrm{pH}=6{,}993+\log\frac{14{,}69}{9{,}57}=7{,}18`)+'<p><b>Sí</b>: par conjugado débil ImH⁺/Im ✔; 0,147 y 0,0957 M dentro de 0,05–1 M ✔; relación 1,54 dentro de 0,1–10 ✔.</p>'+ver('<p>Henderson supone [H₃O⁺] y [HO⁻] bajas respecto de C_A y C_B: [H₃O⁺] = 6,6·10⁻⁸ M y [HO⁻] = 1,5·10⁻⁷ M ≪ 0,1 M ✔ (ion común: cada forma reprime la reacción de la otra con el agua).</p>'))+
    inc('b','pH luego de 2,30 mL de HClO₄ 1,07 M',rx('Im(ac) + H3O^+(ac) -> ImH^+(ac) + H2O(l)','completa (K = 1/Ka ≫ 1)')+chain(R`n_{\mathrm{H_3O^+}}=2{,}30\cdot1{,}07=2{,}46\ \mathrm{mmol}`,R`\mathrm{Im}:\ 14{,}69-2{,}46=12{,}23\ \mathrm{mmol}\qquad\mathrm{ImH^+}:\ 9{,}57+2{,}46=12{,}03\ \mathrm{mmol}`,R`\mathrm{pH}=6{,}993+\log\frac{12{,}23}{12{,}03}=7{,}00`)+'<p>El volumen total cambia, pero en el cociente de Henderson se cancela: se puede trabajar con moles.</p>'),
   jus:'<p>Es reguladora (cumple los tres requisitos). El HClO₄ agregado lo consume el imidazol (base del par) y el pH baja apenas 0,18: el cociente pasó de 1,54 a 1,02.</p>'
  }),'a) pH 7,18, sí es reguladora · b) pH 7,00');

  S('b-g3-3',res({
   plan:'<p>pH = pKa quiere decir C_B = C_A: hay que protonar <b>la mitad</b> del imidazol con el ácido fuerte. Como no se da el volumen de la solución 1 % m/V, se calcula por cada 100 mL (base de cálculo).</p>',
   datos:'<p>Imidazol 1 % m/V (1,00 g por 100 mL); pKa(ImH⁺) = 6,993; HClO₄ 1,07 M.</p>',
   sist:rxs(['Im(ac) + H3O^+(ac) -> ImH^+(ac) + H2O(l)','neutralización parcial: completa']),
   cuanti:chain(R`\mathrm{pH}=\mathrm{p}K_a\ \Rightarrow\ \log\frac{C_B}{C_A}=0\ \Rightarrow\ n_{\mathrm{Im}}=n_{\mathrm{ImH^+}}`,R`\text{por 100 mL: }n_{\mathrm{Im}}=\frac{1{,}00}{68{,}08}=14{,}69\ \mathrm{mmol}\ \Rightarrow\ n_{\mathrm{HClO_4}}=\frac{14{,}69}{2}=7{,}34\ \mathrm{mmol}`,R`V=\frac{7{,}34\ \mathrm{mmol}}{1{,}07\ \mathrm{M}}=6{,}86\ \mathrm{mL}\ \text{(por cada 100 mL de solución)}`),
   verif:ver('<p>Quedan 7,34 mmol de cada forma en ≈ 107 mL: 0,069 M cada una, dentro de 0,05–1 M ✔; relación 1 ✔.</p>'),
   jus:'<p>Para pH = pKa hay que convertir la mitad de la base en su ácido conjugado (máxima capacidad reguladora). No depende del volumen sino de cuánto imidazol hay: 6,86 mL de HClO₄ 1,07 M por cada gramo de imidazol.</p>'
  }),'6,86 mL de HClO₄ 1,07 M por cada 100 mL de solución 1 % (68,6 mL por litro)');

  S('b-g3-4',res({
   plan:'<p>Ácido débil y su sal: par conjugado. Primero se prueba Henderson y se <b>verifica</b> su supuesto ([H₃O⁺] baja respecto de C_B y C_A). Con una Ka tan alta (10⁻³) probablemente no se cumpla y haya que resolver con el BC.</p>',
   datos:'<p>0,08 mol de ácido cloroacético (HA) + 0,04 mol de cloroacetato de sodio en 1,00 L; pKa = 2,865 → Ka = 1,36·10⁻³.</p>',
   sist:sys({rx:[['NaA(s) -> Na^+(ac) + A^-(ac)','','sal: total'],['HA(ac) + H2O(l) <=> A^-(ac) + H3O^+(ac)',R`K_a=1{,}36\times10^{-3}`],W],bm:[R`0{,}12=[\mathrm{HA}]+[\mathrm{A^-}]\qquad[\mathrm{Na^+}]=0{,}04`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{A^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>Hay par conjugado (HA/A⁻) y por ion común cada forma reprime la reacción de la otra con el agua. Henderson supone [H₃O⁺] baja respecto de C_B en el BC; pero la Ka es <b>intermedia-alta</b> (10⁻³) y C_B no es mucho mayor: hay que verificarlo.</p>'+sup([['[HO⁻] baja respecto de [A⁻] (BC)','medio ácido.']]),
   cuanti:chain([R`\text{Henderson: }\mathrm{pH}=2{,}865+\log\frac{0{,}04}{0{,}08}=2{,}56\ \Rightarrow\ [\mathrm{H_3O^+}]=2{,}7\times10^{-3}`,'primer intento'])+ver('<p>2,7·10⁻³ es el 6,8 % de C_B = 0,04 M: <b>no</b> es despreciable.</p>',false)+'<p>Sin despreciar h: del BC '+m(R`[\mathrm{A^-}]=0{,}04+h`)+' y del BM '+m(R`[\mathrm{HA}]=0{,}08-h`)+':</p>'+chain(R`K_a=\frac{h\,(0{,}04+h)}{0{,}08-h}\ \Rightarrow\ h^2+0{,}04136\,h-1{,}09\times10^{-4}=0`,R`h=2{,}49\times10^{-3}\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=2{,}60`),
   verif:ver('<p>Reemplazando: 2,49·10⁻³·0,0425/0,0775 = 1,37·10⁻³ ≈ Ka ✔ · [HO⁻] = 4,0·10⁻¹² M ✔</p>'),
   esp:esp([['H₃O⁺','2,49·10⁻³'],['A⁻','0,0425'],['HA','0,0775'],['Na⁺','0,04'],['HO⁻','4,0·10⁻¹²']]),
   jus:'<p>Henderson supone [H₃O⁺] despreciable respecto de C_B; con Ka = 1,36·10⁻³ eso no se cumple (6,8 %), así que se resuelve con el BC sin despreciar h: pH 2,60 (Henderson daba 2,56).</p>'
  }),'pH = 2,60 (Henderson daría 2,56 y no verifica)');

  S('b-g3-5',res({
   plan:'<p>El NaHCO₃ aporta el ácido del par HCO₃⁻/CO₃²⁻ y el Na₂CO₃ la base. Con Henderson se obtiene la relación para pH 10 y, con la concentración del bicarbonato, la masa de carbonato. No se da el volumen: se calcula por litro.</p>',
   datos:'<p>NaHCO₃ 5 % m/v (50 g/L; M = 84,01) · Na₂CO₃ (M = 105,99). '+tab('Ka₂ del carbónico = 5,6·10⁻¹¹ (Tabla 1) → pKa₂ = 10,25.')+'</p>',
   sist:sys({rx:[['NaHCO3(s) -> Na^+(ac) + HCO3^-(ac)','','total'],['Na2CO3(s) -> 2 Na^+(ac) + CO3^2-(ac)','','total'],['HCO3^-(ac) + H2O(l) <=> CO3^2-(ac) + H3O^+(ac)',R`K_{a2}=5{,}6\times10^{-11}`],W]}),
   cuanti:chain(R`C_A=\frac{50/84{,}01}{1\ \mathrm{L}}=0{,}595\ \mathrm{M}`,R`\frac{C_B}{C_A}=10^{\,10-10{,}25}=0{,}56\ \Rightarrow\ C_B=0{,}333\ \mathrm{M}`,R`m_{\mathrm{Na_2CO_3}}=0{,}333\cdot105{,}99=35{,}3\ \mathrm{g\ por\ litro}`),
   verif:ver('<p>Requisitos: par conjugado ✔; 0,595 y 0,333 M dentro de 0,05–1 M ✔; relación 0,56 ✔; pH 10 dentro de 10,25 ± 1 ✔. [HO⁻] = 10⁻⁴ M ≪ C ✔ (Henderson vale).</p>'),
   jus:'<p>Par HCO₃⁻/CO₃²⁻ con pKa₂ 10,25: para pH 10 hace falta [CO₃²⁻]/[HCO₃⁻] = 0,56, es decir 35,3 g de Na₂CO₃ por cada litro de solución de bicarbonato al 5 %.</p>'
  }),'≈ 35,3 g de Na₂CO₃ por litro (relación CO₃²⁻/HCO₃⁻ = 0,56)');

  S('b-g3-6',res({
   plan:'<p>Neutralización parcial de un ácido débil con base fuerte. La cantidad de NaOH se obtiene de la fracción de ácido que tiene que pasar a salicilato a pH 3,50; como la Ka es alta y el pH bajo, conviene plantear el BC en lugar de Henderson.</p>',
   datos:'<p>25 mL de ácido salicílico (HSal) 0,230 M (5,75 mmol); pKa 2,97 → Ka = 1,07·10⁻³; NaOH 0,202 M; pH 3,50.</p>',
   sist:sys({rx:[['HSal(ac) + HO^-(ac) -> Sal^-(ac) + H2O(l)','','completa'],['HSal(ac) + H2O(l) <=> Sal^-(ac) + H3O^+(ac)',R`K_a=1{,}07\times10^{-3}`],W],bm:[R`n_{\text{total}}=n_{\mathrm{HSal}}+n_{\mathrm{Sal^-}}=5{,}75\ \mathrm{mmol}`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Sal^-}]+[\mathrm{HO^-}]`]}),
   cuanti:chain(R`\alpha_{\mathrm{Sal^-}}=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=\frac{1{,}07\times10^{-3}}{1{,}07\times10^{-3}+3{,}16\times10^{-4}}=0{,}772`,[R`n_{\mathrm{Sal^-}}=0{,}772\cdot5{,}75=4{,}44\ \mathrm{mmol}=n_{\mathrm{Na^+}}+[\mathrm{H_3O^+}](25+V)`,'BC en moles, con [HO⁻] despreciable'],R`0{,}202\,V+3{,}16\times10^{-4}(25+V)=4{,}44\ \Rightarrow\ V=21{,}9\ \mathrm{mL}`),
   verif:'<p>Con Henderson ('+m(R`n_{\mathrm{NaOH}}=n_{\mathrm{Sal^-}}`)+') daría 22,0 mL: la diferencia es chica porque [H₃O⁺] (3·10⁻⁴ M) es apenas 0,3 % de [Sal⁻], pero el planteo con BC es el correcto.</p>',
   jus:'<p>A pH 3,50 el 77 % del salicílico tiene que estar como salicilato. Ese salicilato lo aporta el NaOH (y una parte mínima la disociación del propio ácido, que se tiene en cuenta con el BC).</p>'
  }),'V ≈ 21,9 mL de NaOH 0,202 M');

  S('b-g3-7',res({
   plan:'<p>Sin cálculos: se evalúa si el par disponible puede regular a pH 5,50 con el criterio del rango (pKa ± 1) y de la relación (0,1–10).</p>',
   cuali:chain(R`\mathrm{rango\ del\ par}:\ 3{,}46\pm1=2{,}46\text{ a }4{,}46\qquad\frac{C_B}{C_A}=10^{\,5{,}50-3{,}46}=110`)+'<p>pH 5,50 está <b>fuera</b> del rango de regulación del par oxoacético/oxoacetato: haría falta una relación base/ácido de 110 (fuera de 0,1–10), con el componente ácido prácticamente agotado. Se podría llevar el oxoacetato a pH 5,50 agregando unas gotas de HCl, pero esa solución no regularía frente a bases (casi no hay ácido del par). El NaOH no tiene sentido: subiría aún más el pH.</p>',
   jus:'<p>No es posible preparar una buena reguladora de pH 5,50 con este par: su pKa (3,46) está a más de una unidad. Habría que elegir otro par con pKa entre 4,5 y 6,5.</p>'
  }),'No es posible una buena reguladora: 5,50 está fuera de 3,46 ± 1');

  S('b-g3-8',res({
   plan:'<p>Se identifica el par del ortofosfato que regula cerca del pH fisiológico y se evalúa si a pH 8,5 sigue cumpliendo los requisitos (rango, relación y concentración).</p>',
   datos:tab('Ka₂ del fosfórico = 6,2·10⁻⁸ (Tabla 1) → pKa₂ = 7,21.'),
   sist:rxs(['H2PO4^-(ac) + H2O(l) <=> HPO4^2-(ac) + H3O^+(ac)','Ka₂ = 6,2·10⁻⁸']),
   cuanti:chain(R`\text{a pH 8,5: }\frac{[\mathrm{HPO_4^{2-}}]}{[\mathrm{H_2PO_4^-}]}=10^{\,8{,}5-7{,}21}=19{,}6`),
   cuali:'<p>El par H₂PO₄⁻/HPO₄²⁻ regula en 7,21 ± 1 = 6,21 – 8,21. A pH 8,5 está fuera del rango: la relación es 19,6 (fuera de 0,1–10) y el H₂PO₄⁻ queda casi agotado, sin capacidad para neutralizar bases. Además 0,01 M está por debajo del criterio de 0,05 M: tiene poca capacidad aun a pH 7,4.</p>',
   jus:'<p>No será útil: a pH 8,5 el componente ácido del par es escaso (relación 19,6) y el pH está fuera de pKa₂ ± 1.</p>'
  }),'No: a pH 8,5 la relación HPO₄²⁻/H₂PO₄⁻ es 19,6 (fuera de rango)');

  S('b-g3-9',res({
   plan:'<p>Se aplica el primer requisito: ¿hay un par ácido-base conjugado débil?</p>',
   sist:rxs(['NaCl(s) -> Na^+(ac) + Cl^-(ac)','electrolito fuerte: total'],W),
   cuali:'<p>Na⁺ (de NaOH) y Cl⁻ (de HCl) son conjugados de electrolitos fuertes: no tienen comportamiento ácido-base y no pueden neutralizar ni ácidos ni bases agregados. <b>No hay par conjugado débil</b>: no se cumple el requisito 1. La solución fisiológica es isotónica (por eso se usa), pero no reguladora: su pH lo fija el agua.</p>',
   jus:'<p>No es una solución reguladora: sólo contiene iones de electrolitos fuertes, sin un ácido débil y su base conjugada.</p>'
  }),'No es reguladora (no hay par conjugado débil)');

  S('b-g3-10',res({
   plan:'<p>El par es HSO₄⁻/SO₄²⁻ (2.ª disociación del sulfúrico). Como Ka₂ es alta y a pH 2 [H₃O⁺] = 0,01 M no es despreciable frente a las concentraciones, el diseño se hace con los balances y no con Henderson.</p>',
   datos:tab('Ka₂ del sulfúrico = 1,2·10⁻² (Tabla 1) → pKa₂ = 1,92. Sulfato de sodio (M = 142,04) y ácido sulfúrico (M = 98,08).'),
   sist:sys({rx:[['Na2SO4(s) -> 2 Na^+(ac) + SO4^2-(ac)','','total'],['H2SO4(ac) + H2O(l) -> HSO4^-(ac) + H3O^+(ac)','','1.ª: total'],['HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)',R`K_{a2}=1{,}2\times10^{-2}`],W],bm:[R`C_{\mathrm{S}}=C_{\mathrm{H_2SO_4}}+C_{\mathrm{Na_2SO_4}}=[\mathrm{HSO_4^-}]+[\mathrm{SO_4^{2-}}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{HSO_4^-}]+2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`]}),
   cuanti:chain([R`\frac{[\mathrm{SO_4^{2-}}]}{[\mathrm{HSO_4^-}]}=\frac{K_{a2}}{[\mathrm{H_3O^+}]}=\frac{1{,}2\times10^{-2}}{10^{-2}}=1{,}2`,'pH 2 dentro de 1,92 ± 1 ✔'],[R`\text{elegimos }[\mathrm{HSO_4^-}]=0{,}10\ \mathrm{M}\ \Rightarrow\ [\mathrm{SO_4^{2-}}]=0{,}12\ \mathrm{M}`,'criterio 0,05–1 M (dato que fija quien diseña)'],[R`\text{BC: }[\mathrm{Na^+}]=0{,}10+2\cdot0{,}12-0{,}010=0{,}33\ \mathrm{M}\ \Rightarrow\ C_{\mathrm{Na_2SO_4}}=0{,}165\ \mathrm{M}`,'[HO⁻] despreciable'],[R`\text{BM: }C_{\mathrm{H_2SO_4}}=0{,}22-0{,}165=0{,}055\ \mathrm{M}`,'']),
   verif:ver('<p>Requisitos: par ✔; 0,10 y 0,12 M ✔; relación 1,2 ✔. Por litro: 0,165 mol de Na₂SO₄ (23,4 g) + 0,055 mol de H₂SO₄ (5,4 g). Si se hubiera usado Henderson con las cantidades “agregadas”, se habría ignorado que 0,010 M de H₃O⁺ libre no es despreciable.</p>'),
   jus:'<p>El H₂SO₄ aporta HSO₄⁻ (y su H⁺ protona parte del sulfato); el Na₂SO₄ aporta SO₄²⁻. Con Ka₂ alta, el H₃O⁺ libre (0,01 M) pesa en los balances: el diseño se hace con BC y BM.</p>'
  }),'Por litro: 0,055 mol de H₂SO₄ + 0,165 mol de Na₂SO₄ (una opción con [HSO₄⁻] = 0,10 M)');

  S('b-g3-11',res({
   plan:'<p>Con Henderson para el par H₂CO₃/HCO₃⁻ (1.ª disociación) se obtiene la relación de concentraciones a pH 7,4. Los 4 L no cambian la relación (sí cambiarían las cantidades totales).</p>',
   datos:tab('Ka₁ del carbónico = 4,3·10⁻⁷ (Tabla 1) → pKa₁ = 6,37.'),
   sist:rxs(['H2CO3(ac) + H2O(l) <=> HCO3^-(ac) + H3O^+(ac)','Ka₁ = 4,3·10⁻⁷'],['HCO3^-(ac) + H2O(l) <=> CO3^2-(ac) + H3O^+(ac)','Ka₂ = 5,6·10⁻¹¹']),
   cuanti:chain(R`\frac{[\mathrm{HCO_3^-}]}{[\mathrm{H_2CO_3}]}=10^{\,7{,}4-6{,}37}=10{,}8`,R`\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{\,7{,}4-10{,}25}=1{,}4\times10^{-3}\ \text{(despreciable)}`),
   cuali:'<p>La relación (≈ 11:1) queda apenas fuera del criterio 0,1–10 de un buffer de laboratorio: en la sangre funciona igual porque el sistema es <b>abierto</b> (los pulmones regulan el CO₂, es decir el H₂CO₃) y los riñones regulan el HCO₃⁻. La relación no depende del volumen de sangre.</p>',
   jus:'<p>A pH 7,4 hace falta [HCO₃⁻]/[H₂CO₃] ≈ 10,8; el carbonato es despreciable. Los 4 L no modifican la relación.</p>'
  }),'[HCO₃⁻]/[H₂CO₃] ≈ 10,8 (no depende de los 4 L)');

  S('b-g3-12',res({
   plan:'<p>Se analiza cómo el pH controla la fracción de sulfuro libre (S²⁻) en el sistema H₂S/HS⁻/S²⁻, y por qué conviene que ese pH esté regulado.</p>',
   datos:tab('Ka₁ = 9,5·10⁻⁸ y Ka₂ = 1·10⁻¹⁹ del H₂S (Tabla 1). La reguladora de pH 10 es NH₃/NH₄Cl (pKa 9,26).'),
   sist:rxs(['H2S(ac) + H2O(l) <=> HS^-(ac) + H3O^+(ac)','Ka₁'],['HS^-(ac) + H2O(l) <=> S^2-(ac) + H3O^+(ac)','Ka₂']),
   cuanti:chain(R`\alpha_{\mathrm{S^{2-}}}=\frac{K_{a1}K_{a2}}{[\mathrm{H_3O^+}]^2+K_{a1}[\mathrm{H_3O^+}]+K_{a1}K_{a2}}`,R`\mathrm{pH}\ 10:\ \alpha_{\mathrm{S^{2-}}}=1\times10^{-9}\qquad\mathrm{pH}\ 0{,}5\ (\mathrm{HCl\ 0{,}3\ M,\ grupo\ II}):\ \alpha_{\mathrm{S^{2-}}}=1\times10^{-25}`),
   cuali:'<p>Al bajar [H₃O⁺], por Le Châtelier los equilibrios del H₂S se desplazan hacia los productos: la fracción de S²⁻ aumenta unas 10¹⁶ veces respecto del medio ácido del grupo II. Así se alcanzan los Kps de los sulfuros más solubles (grupo III: ZnS, MnS, FeS…). La reguladora mantiene el pH aunque la precipitación libere H₃O⁺ (M²⁺ + H₂S → MS + 2 H⁺), y el pH 10 no es tan alto como para precipitar hidróxidos como el de magnesio.</p>',
   jus:'<p>A pH 10 la [S²⁻] es muchísimo mayor que en medio ácido (Le Châtelier): precipitan los sulfuros del grupo III. El buffer evita que el H⁺ liberado al precipitar baje el pH y frene la precipitación.</p>'
  }),'A pH 10 la fracción de S²⁻ es ≈ 10¹⁶ veces mayor que en el grupo II; el buffer la mantiene');

  S('b-g3-13',res({
   plan:'<p>Diseño de una reguladora de borato a pH 10: (1) par y pKa; (2) relación con Henderson; (3) concentraciones con el criterio 0,05–1 M; (4) masas para 500 mL, corregidas por la pureza del 80 %.</p>',
   datos:tab('Ka₁ del bórico = 5,8·10⁻¹⁰ (Tabla 1) → pKa₁ = 9,24. H₃BO₃ M = 61,83 g/mol; borato monosódico (NaH₂BO₃) M = 83,82 g/mol; pureza 80 %.'),
   sist:rxs(['NaH2BO3(s) -> Na^+(ac) + H2BO3^-(ac)','sal: total'],['H3BO3(ac) + H2O(l) <=> H2BO3^-(ac) + H3O^+(ac)','Ka₁ = 5,8·10⁻¹⁰'],W),
   cuanti:chain(R`\frac{C_B}{C_A}=10^{\,10-9{,}24}=5{,}8`,['\\text{criterio 0,05–1 M: }C_A=0{,}050\\ \\mathrm{M}\\ \\Rightarrow\\ C_B=0{,}29\\ \\mathrm{M}','el enunciado no fija la concentración'],R`\mathrm{H_3BO_3}:\ 0{,}050\cdot0{,}500=0{,}025\ \mathrm{mol}\to1{,}55\ \mathrm{g}\to\frac{1{,}55}{0{,}80}=1{,}93\ \mathrm{g}`,R`\mathrm{NaH_2BO_3}:\ 0{,}29\cdot0{,}500=0{,}145\ \mathrm{mol}\to12{,}2\ \mathrm{g}\to\frac{12{,}2}{0{,}80}=15{,}2\ \mathrm{g}`),
   verif:ver('<p>Relación 5,8 dentro de 0,1–10 ✔; pH 10 dentro de 9,24 ± 1 ✔; [HO⁻] = 10⁻⁴ M ≪ C_A, C_B ✔. Por qué funciona: a pH 10 (muy lejos de 4,5–5,5) los hongos no pueden crecer, y el buffer impide que el pH de la piel o del agua lo baje.</p>'),
   jus:'<p>Par H₃BO₃/H₂BO₃⁻ con pKa₁ 9,24: pH 10 está dentro del rango. La relación 5,8 sale de Henderson; la concentración absoluta la fija quien diseña (acá, el mínimo del criterio para el ácido). Las masas se dividen por la pureza.</p>'
  }),'Para 500 mL: 1,93 g de ácido bórico + 15,2 g de borato (80 %), relación 5,8');

  S('b-g3-mtx',res({
   plan:'<p>Se siguen los pasos del diseño: (1) qué pares disponibles tienen pKa cerca del rango 7,5–9,0 y cuál da la mayor capacidad; (2) sistema y relación; (3) cantidades para 100 L; (4 y 5) preguntas conceptuales.</p>',
   datos:'<p>Datos de la consigna: H₃PO₄ (pKa 2,148 · 7,199 · 12,15), NH₃ (pKa 9,26), H₃BO₃ (pKa₁ 9,14), NaOH 98 %, etc. M(H₃BO₃) = 61,83; M(NaOH) = 40,00.</p>',
   cuali:inc('1','Componentes ideales',table(['Par','pKa','pH del rango más cercano','Distancia'],[['H₂PO₄⁻/HPO₄²⁻','7,199','7,5','0,30'],['NH₄⁺/NH₃','9,26','9,0','0,26'],['H₃BO₃/H₂BO₃⁻','9,14','9,0','0,14']])+'<p>Máxima capacidad = pH lo más cerca posible del pKa (relación cercana a 1). El <b>borato a pH 9,0</b> es el de menor distancia: se prepara con H₃BO₃ + NaOH (neutralización parcial). El fosfato a pH 7,5 es una alternativa más biocompatible, con algo menos de capacidad; el amoníaco es volátil y poco adecuado en un inyectable.</p>')+
    inc('2','Sistema y relación',sys({rx:[['H3BO3(ac) + HO^-(ac) -> H2BO3^-(ac) + H2O(l)','','neutralización parcial: completa'],['H3BO3(ac) + H2O(l) <=> H2BO3^-(ac) + H3O^+(ac)',R`K_{a1}=10^{-9{,}14}`],W],bm:[R`C_{\mathrm{B}}=[\mathrm{H_3BO_3}]+[\mathrm{H_2BO_3^-}]`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{H_2BO_3^-}]+[\mathrm{HO^-}]`]})+chain(R`\frac{[\mathrm{H_2BO_3^-}]}{[\mathrm{H_3BO_3}]}=10^{\,9{,}0-9{,}14}=0{,}72`))+
    inc('3','Cantidades para 100 L',chain(['\\text{criterio 0,05–1 M: }[\\mathrm{H_2BO_3^-}]=0{,}10\\ \\mathrm{M}\\ \\Rightarrow\\ [\\mathrm{H_3BO_3}]=0{,}138\\ \\mathrm{M}','concentración fijada por quien diseña'],R`n_{\mathrm{H_3BO_3,\ total}}=(0{,}10+0{,}138)\cdot100=23{,}8\ \mathrm{mol}\to\frac{1472\ \mathrm{g}}{0{,}99}=1487\ \mathrm{g}`,R`n_{\mathrm{NaOH}}=n_{\mathrm{H_2BO_3^-}}=10{,}0\ \mathrm{mol}\to\frac{400\ \mathrm{g}}{0{,}98}=408\ \mathrm{g}`)+'<p>Se disuelve, se ajusta el pH final con pHmetro y se lleva a volumen.</p>')+
    inc('4a','¿Otro par?','<p>Sí: H₂PO₄⁻/HPO₄²⁻ (H₃PO₄ + NaOH, o Na₃PO₄ + HNO₃) para la parte baja del rango (pH 7,5), o NH₄⁺/NH₃ (NH₃ + NH₄NO₃) para la parte alta, este último poco recomendable en un inyectable.</p>')+
    inc('4b','¿Acetato de amonio?','<p>No. Su pH es ≈ 7 (Ka(NH₄⁺) = Kb(Ac⁻)) y no tiene ningún par con las dos formas apreciables en 7,5–9,0: el HAc/Ac⁻ regula en 4,74 ± 1 y el NH₄⁺ está sin NH₃ apreciable.</p>')+
    inc('5a','Balances del acetato de amonio y su pH',M(R`\text{BM: }C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{Ac^-}]+[\mathrm{HAc}]\qquad\text{BC: }[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`)+M(R`\mathrm{pH}=\tfrac12(\mathrm{p}K_w+\mathrm{p}K_a-\mathrm{p}K_b)=7{,}0`,'no depende de la concentración')+'<p>(La consigna dice “dependiente del pH”; se entiende “de la concentración”.)</p>')+
    inc('5b','HCl + ácido acético a pH 2,0','<p>El H₃O⁺ del HCl (0,01 M) es ion común del acético y reprime su disociación: '+m(R`\frac{[\mathrm{Ac^-}]}{[\mathrm{HAc}]}=\frac{K_a}{[\mathrm{H_3O^+}]}=\frac{1{,}8\times10^{-5}}{10^{-2}}=1{,}8\times10^{-3}`)+'. En el BC, [Ac⁻] es despreciable respecto de [Cl⁻]: el pH lo fija el HCl.</p>'),
   jus:'<p>El borato a pH 9,0 (Δ = 0,14 del pKa) da la mayor capacidad entre los pares disponibles. Relación 0,72; para 100 L con [H₂BO₃⁻] = 0,10 M: 1,49 kg de H₃BO₃ 99 % y 408 g de NaOH 98 %.</p>'
  }),'Borato (H₃BO₃ + NaOH) a pH 9,0, relación 0,72; 100 L: 1487 g de H₃BO₃ y 408 g de NaOH');
})();
