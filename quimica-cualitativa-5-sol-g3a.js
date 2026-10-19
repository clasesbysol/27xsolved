// 27xSOLved · Química Analítica Cualitativa 5.º · RESOLUCIONES · Guía N° 3 (1/2):
// ácidos y bases monopróticos, polipróticos y problemas desafío 1 y 2.
// Prioridad de la guía: el análisis cualitativo; el cálculo tiene que ser coherente con él.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,X=window.ET27QACS;if(!K||!Q||!A||!X)return;
  const {M,m,chain,idea,warn,note,step,table}=K;
  const {rx,rxs}=Q;
  const {sup,ver,jus,sys,lc,spec,flow}=A;
  const {S,fix,ilu,tab,res,inc,esp,W}=X;
  const R=String.raw;
  const agua=(sp)=>`es razonable suponer [HO⁻] baja respecto de ${sp} porque el medio es ácido: el H₃O⁺ del ácido reprime la autoprotólisis (Le Châtelier)`;

  // ================================================================ MONOPRÓTICOS
  S('g3m-1',res({
   plan:'<p>Ácido fuerte: se ioniza totalmente, así que [H₃O⁺] sale de la estequiometría. [HO⁻] sale de Kw. Hay que justificar por qué el agua aporta poco.</p>',
   datos:'<p>HNO₃ 0,050 M. Especies: H₃O⁺, NO₃⁻, HO⁻, H₂O.</p>',
   sist:sys({rx:[['HNO3(ac) + H2O(l) -> H3O^+(ac) + NO3^-(ac)','','ácido fuerte: total'],W],bm:[R`C=0{,}050=[\mathrm{NO_3^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{NO_3^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [NO₃⁻] en el BC',agua('[NO₃⁻]')+'; además C ≫ 10⁻⁶ M.']]),
   cuanti:chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{NO_3^-}]=0{,}050\ \mathrm{M}`,R`[\mathrm{HO^-}]=\frac{K_w}{[\mathrm{H_3O^+}]}=\frac{1{,}0\times10^{-14}}{0{,}050}=2{,}0\times10^{-13}\ \mathrm{M}`),
   verif:ver('<p>'+m(R`\frac{2{,}0\times10^{-13}}{0{,}050}\cdot100=4\times10^{-10}\,\%\le5\,\%`)+' ✔</p>'),
   esp:esp([['H₃O⁺','0,050'],['NO₃⁻','0,050'],['HO⁻','2,0·10⁻¹³']]),
   jus:'<p>El HNO₃ es un electrolito fuerte: ionización total, [H₃O⁺] = C. El H₃O⁺ del ácido desplaza la autoprotólisis hacia los reactivos, así que [HO⁻] es despreciable respecto de [NO₃⁻] (verificado) y se calcula con Kw.</p>'
  }),'[H₃O⁺] = 0,050 M · [HO⁻] = 2,0·10⁻¹³ M');

  S('g3m-2',res({
   plan:'<p>Primero la concentración del HCl diluido (volumen → masa con la densidad → masa de HCl con el % → moles → molaridad). Es un ácido fuerte: [H₃O⁺] = C.</p>',
   datos:'<p>0,07 mL de HCl 36 % m/m (δ = 1,179 g/mL) llevados a 500 mL. M(HCl) = 36,46 g/mol.</p>',
   sist:sys({rx:[['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','','total'],W],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}),
   cuanti:chain(R`n=\frac{0{,}07\cdot1{,}179\cdot0{,}36}{36{,}46}=8{,}15\times10^{-4}\ \mathrm{mol}`,R`C=\frac{8{,}15\times10^{-4}}{0{,}500}=1{,}63\times10^{-3}\ \mathrm{M}`,[R`\mathrm{pH}=-\log(1{,}63\times10^{-3})=2{,}79`,'[HO⁻] despreciable: medio ácido, C ≫ 10⁻⁶ M']),
   verif:ver('<p>[HO⁻] = 6,1·10⁻¹² M frente a 1,63·10⁻³ M ✔.</p>'),
   jus:'<p>Ácido fuerte: [H₃O⁺] = C = 1,63·10⁻³ M. Es razonable suponer [HO⁻] baja respecto de [Cl⁻] porque el medio es ácido y la concentración es mucho mayor que 10⁻⁶ M.</p>'
  }),'pH = 2,79');

  S('g3m-3',res({
   plan:'<p>Se calcula el pH antes y después de diluir 10 veces. En los fuertes la concentración baja 10 veces; en el agua pura no hay soluto que diluir.</p>',
   cuanti:table(['Sistema','Antes','Después (C/10)','ΔpH'],[['Agua pura','[H₃O⁺] = [HO⁻] = 10⁻⁷ → pH 7,00','igual: pH 7,00','0'],['HCl 0,025 M','pH = −log 0,025 = 1,60','pH = −log 0,0025 = 2,60','+1'],['NaOH 0,025 M','pOH 1,60 → pH 12,40','pOH 2,60 → pH 11,40','−1']]),
   cuali:'<p><b>Agua:</b> diluir agua con agua no cambia nada; Kw (sólo depende de T) sigue igual y [H₃O⁺] = [HO⁻]. <b>Fuertes:</b> como [H₃O⁺] = C (o [HO⁻] = C), dividir C por 10 cambia el pH en log 10 = 1 unidad, acercándolo a 7.</p>',
   verif:ver('<p>Después de diluir, C = 2,5·10⁻³ M sigue siendo ≫ 10⁻⁶ M: el aporte del agua sigue siendo despreciable ✔.</p>'),
   jus:'<p>En los fuertes [H₃O⁺] o [HO⁻] es proporcional a C: una dilución 1:10 mueve el pH una unidad hacia 7. El agua pura no cambia porque Kw no depende de la cantidad de agua.</p>'
  }),'ΔpH: agua 0 · HCl +1 · NaOH −1');

  S('g3m-4',res({
   plan:'<p>Todos son electrolitos fuertes: [H₃O⁺] o [HO⁻] sale de la estequiometría (ojo con el Ba(OH)₂, que da 2 HO⁻). En d y e hay que calcular primero la concentración.</p>',
   sist:rxs(['HI(ac) + H2O(l) -> H3O^+(ac) + I^-(ac)','total'],['Ba(OH)2(s) -> Ba^2+(ac) + 2 HO^-(ac)','total: 2 HO⁻ por fórmula'],['NaOH(s) -> Na^+(ac) + HO^-(ac)','total'],W),
   cuanti:table(['','Cálculo','pH','pOH'],[
    ['d) HI 0,0356 M','[H₃O⁺] = 0,0356','1,45','12,55'],
    ['e) HCl 0,0725 M','[H₃O⁺] = 0,0725','1,14','12,86'],
    ['f) Ba(OH)₂ 0,0092 M','[HO⁻] = 2·0,0092 = 0,0184','12,26','1,74'],
    ['g) NaOH 13,6 mg en 350 mL','n = 13,6·10⁻³/40,00 = 3,40·10⁻⁴ mol → C = 9,71·10⁻⁴ M','10,99','3,01'],
    ['h) HBr 75 mL de 3,5·10⁻⁴ M → 500 mL','C = 3,5·10⁻⁴·75/500 = 5,25·10⁻⁵ M','4,28','9,72']]),
   verif:ver('<p>En todos C ≥ 5·10⁻⁵ M ≫ 10⁻⁶ M: el aporte del agua es despreciable frente al del ácido o la base ✔ (en h, el agua aporta 1,9·10⁻¹⁰ M frente a 5,25·10⁻⁵ M).</p>'),
   jus:'<p>Electrolitos fuertes: disociación total, sin equilibrio que plantear; [H₃O⁺] o [HO⁻] = n·C. El agua se desprecia porque su autoprotólisis está reprimida por el H₃O⁺ o el HO⁻ agregado. pH + pOH = 14 a 25 °C.</p>'
  }),'d) 1,45 · e) 1,14 · f) 12,26 · g) 10,99 · h) 4,28');

  S('g3m-5',res({
   plan:'<p>Ácido débil: se plantea su equilibrio con Ka, el BM y el BC. Se justifica qué despreciar (agua y fracción disociada), se resuelve y se verifica; si la verificación falla, se resuelve la cuadrática.</p>',
   datos:'<p>HCOOH 0,1 M; Ka = 1,78·10⁻⁴ (dato).</p>',
   sist:sys({rx:[['HCOOH(ac) + H2O(l) <=> HCOO^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{HCOO^-}][\mathrm{H_3O^+}]}{[\mathrm{HCOOH}]}=1{,}78\times10^{-4}`],W],bm:[R`0{,}1=[\mathrm{HCOOH}]+[\mathrm{HCOO^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HCOO^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>El fórmico es un electrolito débil (Ka intermedia). Lo que molesta: [HO⁻] en el BC y [HCOO⁻] en el BM.</p>'+sup([['[HO⁻] baja respecto de [HCOO⁻] (BC)',agua('[HCOO⁻]')+'.'],['[HCOO⁻] baja respecto de 0,1 (BM)','C/Ka = 562 &gt; 100: en concentración alta hay muchos choques efectivos que rearman HCOOH; se disocia poco.']]),
   cuanti:chain([R`[\mathrm{H_3O^+}]\approx[\mathrm{HCOO^-}]\qquad[\mathrm{HCOOH}]\approx0{,}1`,'de BC y BM con los desprecios'],R`K_a=\frac{[\mathrm{H_3O^+}]^2}{0{,}1}\ \Rightarrow\ [\mathrm{H_3O^+}]=\sqrt{1{,}78\times10^{-4}\cdot0{,}1}=4{,}22\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}37`),
   verif:ver('<p>'+m(R`\frac{4{,}22\times10^{-3}}{0{,}1}\cdot100=4{,}2\,\%\le5\,\%`)+' ✔ (al límite; la cuadrática da 4,13·10⁻³ M y pH 2,38) · [HO⁻] = 2,4·10⁻¹² M ≪ [HCOO⁻] ✔</p>'),
   esp:esp([['H₃O⁺','4,2·10⁻³'],['HCOO⁻','4,2·10⁻³'],['HCOOH','0,1 − 0,0042 = 0,096'],['HO⁻','2,4·10⁻¹²']]),
   jus:'<p>Ácido débil en concentración alta (C/Ka &gt; 100): se disocia poco y [HCOO⁻] es baja respecto de C; el medio es ácido y [HO⁻] es baja respecto de [HCOO⁻]. Ambos desprecios verifican (4,2 % y ≈ 0 %).</p>'
  }),'pH = 2,37 · [HCOOH] = 0,096 M · [HCOO⁻] = [H₃O⁺] = 4,2·10⁻³ M · [HO⁻] = 2,4·10⁻¹² M');

  S('g3m-6',res({
   plan:'<p>El dato dice que es un ácido “débil” con Ka = 0,162, que por el criterio de la cursada es una constante <b>alta</b>, y la concentración es muy baja. Hay que ver qué se puede despreciar: seguramente no la fracción disociada sino el ácido sin disociar.</p>',
   datos:'<p>Ácido periódico 2·10⁻⁴ M; Ka = 0,162 (dato).</p>',
   sist:sys({rx:[['HIO4(ac) + H2O(l) <=> IO4^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{IO_4^-}][\mathrm{H_3O^+}]}{[\mathrm{HIO_4}]}=0{,}162`],W],bm:[R`2\times10^{-4}=[\mathrm{HIO_4}]+[\mathrm{IO_4^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{IO_4^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>C/Ka = 1,2·10⁻³, muchísimo menor que 100: <b>no</b> se puede despreciar [IO₄⁻] frente a C. Al contrario: con Ka alta y C tan baja (muy pocos choques efectivos que rearmen el ácido), la disociación es prácticamente total.</p>'+sup([['[HO⁻] baja respecto de [IO₄⁻] (BC)','medio ácido (≈ 10⁻⁴ M de H₃O⁺, mil veces más que el agua).']]),
   cuanti:chain(R`K_a=\frac{x^2}{C-x}\ \Rightarrow\ x^2+K_ax-K_aC=0`,R`x=\frac{-0{,}162+\sqrt{0{,}162^2+4\cdot0{,}162\cdot2\times10^{-4}}}{2}=1{,}998\times10^{-4}\ \mathrm{M}`,R`\mathrm{pH}=3{,}70\qquad[\mathrm{HIO_4}]=\frac{x^2}{K_a}=2{,}5\times10^{-7}\ \mathrm{M}\qquad\alpha=\frac{x}{C}=0{,}999`),
   verif:ver('<p>[HO⁻] = 5,0·10⁻¹¹ M frente a 2,0·10⁻⁴ M ✔. Lo despreciable resultó ser el ácido sin disociar (0,12 % de C).</p>'),
   esp:esp([['H₃O⁺','2,0·10⁻⁴'],['IO₄⁻','2,0·10⁻⁴'],['HIO₄','2,5·10⁻⁷'],['HO⁻','5,0·10⁻¹¹']]),
   jus:'<p>Con Ka alta y C/Ka ≪ 100 no es razonable suponer [IO₄⁻] baja respecto de C: se resuelve la cuadrática. Se disocia el 99,9 %: a esta concentración se comporta prácticamente como un ácido fuerte.</p>'
  }),'pH = 3,70 · α = 99,9 % · [HIO₄] = 2,5·10⁻⁷ M');

  S('g3m-7',res({
   plan:'<p>Base extremadamente débil (Kb 10⁻¹⁴, del orden de Kw). Hay que ver si su aporte de HO⁻ es comparable con el del agua: si lo es, no se puede despreciar la autoprotólisis.</p>',
   datos:'<p>Urea (U) 0,0446 M; Kb = 1,20·10⁻¹⁴ (dato).</p>',
   sist:sys({rx:[['CO(NH2)2(ac) + H2O(l) <=> CO(NH2)(NH3)^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{UH^+}][\mathrm{HO^-}]}{[\mathrm{U}]}=1{,}20\times10^{-14}`],W],bm:[R`0{,}0446=[\mathrm{U}]+[\mathrm{UH^+}]`],bc:[R`[\mathrm{UH^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuali:'<p>Kb·C = 5,4·10⁻¹⁶ ≪ Kw = 10⁻¹⁴: la urea aporta muchísimo menos HO⁻ que el agua. <b>No</b> es razonable despreciar [H₃O⁺] en el BC (es el término grande). Lo que sí se desprecia es [UH⁺] frente a C (base muy débil, C/Kb enorme).</p>'+sup([['[UH⁺] baja respecto de C (BM)','Kb extremadamente baja: [U] ≈ C.']]),
   cuanti:chain([R`[\mathrm{HO^-}]=\frac{K_b[\mathrm{U}]}{[\mathrm{HO^-}]}+\frac{K_w}{[\mathrm{HO^-}]}\ \Rightarrow\ [\mathrm{HO^-}]=\sqrt{K_bC+K_w}`,'del BC, reemplazando [UH⁺] de Kb y [H₃O⁺] de Kw'],R`[\mathrm{HO^-}]=\sqrt{5{,}35\times10^{-16}+1{,}0\times10^{-14}}=1{,}03\times10^{-7}\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=7{,}01`,R`[\mathrm{UH^+}]=\frac{K_bC}{[\mathrm{HO^-}]}=5{,}2\times10^{-9}\ \mathrm{M}\qquad\alpha=\frac{[\mathrm{UH^+}]}{C}=1{,}2\times10^{-7}`),
   verif:ver('<p>[UH⁺]/C = 1,2·10⁻⁵ % ✔.</p>'),
   esp:esp([['U','0,0446'],['UH⁺','5,2·10⁻⁹'],['HO⁻','1,03·10⁻⁷'],['H₃O⁺','9,7·10⁻⁸']]),
   jus:'<p>La urea es una base tan débil (Kb·C ≪ Kw) que el pH lo fija el agua: no se puede despreciar la autoprotólisis. Prácticamente no se protona (α ≈ 10⁻⁷) y el pH queda en 7,01.</p>'
  }),'pH ≈ 7,01 · α = 1,2·10⁻⁵ % (el pH lo fija el agua)');

  S('g3m-8',res({
   plan:'<p>Base débil con Kb de magnitud intermedia-alta (10⁻³). Se plantea, se evalúa C/Kb y, si no alcanza para despreciar, se resuelve la cuadrática.</p>',
   datos:'<p>Piperidina (C₅H₁₁N) 0,039 M; Kb = 1,60·10⁻³ (dato).</p>',
   sist:sys({rx:[['C5H11N(ac) + H2O(l) <=> C5H11NH^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{C_5H_{11}NH^+}][\mathrm{HO^-}]}{[\mathrm{C_5H_{11}N}]}=1{,}60\times10^{-3}`],W],bm:[R`0{,}039=[\mathrm{C_5H_{11}N}]+[\mathrm{C_5H_{11}NH^+}]`],bc:[R`[\mathrm{C_5H_{11}NH^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [BH⁺] (BC)','medio básico: el HO⁻ de la base reprime la autoprotólisis.']])+'<p>En el BM, C/Kb = 24 &lt; 100: <b>no</b> es razonable suponer [BH⁺] baja respecto de C (Kb alta para esa concentración).</p>',
   cuanti:chain(R`K_b=\frac{x^2}{0{,}039-x}\ \Rightarrow\ x=\frac{-1{,}6\times10^{-3}+\sqrt{(1{,}6\times10^{-3})^2+4\cdot1{,}6\times10^{-3}\cdot0{,}039}}{2}=7{,}14\times10^{-3}\ \mathrm{M}`,R`\mathrm{pOH}=2{,}15\ \Rightarrow\ \mathrm{pH}=11{,}85\qquad\alpha=\frac{7{,}14\times10^{-3}}{0{,}039}=18\,\%`),
   verif:ver('<p>Con la aproximación habría dado 7,9·10⁻³ M (20 % de C): no valía ✔ se usó la cuadrática. [H₃O⁺] = 1,4·10⁻¹² M ≪ [BH⁺] ✔.</p>'),
   esp:esp([['HO⁻','7,14·10⁻³'],['C₅H₁₁NH⁺','7,14·10⁻³'],['C₅H₁₁N','0,0319'],['H₃O⁺','1,4·10⁻¹²']]),
   jus:'<p>Base débil, pero con C/Kb = 24 &lt; 100 no se desprecia la fracción protonada: cuadrática. El agua sí se desprecia por el medio básico.</p>'
  }),'pH = 11,85 · α = 18 %');

  S('g3m-9',res({
   plan:'<p>El grado de disociación da directamente cuánto ácido se disoció: [A⁻] = α·C. Con eso y el BC se obtiene [H₃O⁺]; después se reemplaza en Ka sin necesidad de despreciar nada frente a C.</p>',
   datos:'<p>Ácido benzoico 0,110 M; α = 2,4 %.</p>',
   sist:sys({rx:[['C6H5COOH(ac) + H2O(l) <=> C6H5COO^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{C_6H_5COO^-}][\mathrm{H_3O^+}]}{[\mathrm{C_6H_5COOH}]}`],W],bm:[R`0{,}110=[\mathrm{HBz}]+[\mathrm{Bz^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Bz^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [Bz⁻] (BC)',agua('[Bz⁻]')+'.']]),
   cuanti:chain(R`[\mathrm{Bz^-}]=\alpha C=0{,}024\cdot0{,}110=2{,}64\times10^{-3}\ \mathrm{M}=[\mathrm{H_3O^+}]`,R`\mathrm{pH}=-\log(2{,}64\times10^{-3})=2{,}58`,R`K_a=\frac{(2{,}64\times10^{-3})^2}{0{,}110-0{,}00264}=6{,}5\times10^{-5}`),
   verif:ver('<p>Coincide con la Tabla 1 (benzoico: 6,5·10⁻⁵) ✔. [HO⁻] = 3,8·10⁻¹² M ≪ [Bz⁻] ✔.</p>'),
   jus:'<p>El grado de disociación es la fracción disociada: [Bz⁻] = α·C. Del BC (medio ácido) [H₃O⁺] = [Bz⁻], y en el BM se usa el valor exacto de lo que quedó sin disociar.</p>'
  }),'pH = 2,58 · Ka = 6,5·10⁻⁵');

  S('g3m-10',res({
   plan:'<p>Primero la concentración después de diluir (masa de solución, masa de metilamina, moles). Después, base débil: equilibrio con Kb (Tabla 2), desprecios justificados, cálculo y verificación.</p>',
   datos:'<p>50 mL de CH₃NH₂ 35 % m/m (δ = 0,85 g/mL) llevados a 1 L. M = 31,06 g/mol. '+tab('Kb CH₃NH₂ = 4,4·10⁻⁴ (Tabla 2).')+'</p>',
   sist:sys({rx:[['CH3NH2(ac) + H2O(l) <=> CH3NH3^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{CH_3NH_3^+}][\mathrm{HO^-}]}{[\mathrm{CH_3NH_2}]}=4{,}4\times10^{-4}`],W],bm:[R`C=[\mathrm{CH_3NH_2}]+[\mathrm{CH_3NH_3^+}]`],bc:[R`[\mathrm{CH_3NH_3^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [CH₃NH₃⁺] (BC)','medio básico: el HO⁻ de la base reprime la autoprotólisis.'],['[CH₃NH₃⁺] baja respecto de C (BM)','base débil concentrada: C/Kb = 1090 &gt; 100.']]),
   cuanti:chain(R`m_{\text{sc}}=50\cdot0{,}85=42{,}5\ \mathrm{g}\ \Rightarrow\ m=0{,}35\cdot42{,}5=14{,}9\ \mathrm{g}`,R`C=\frac{14{,}9/31{,}06}{1{,}0\ \mathrm{L}}=0{,}479\ \mathrm{M}`,R`[\mathrm{HO^-}]=\sqrt{4{,}4\times10^{-4}\cdot0{,}479}=1{,}45\times10^{-2}\ \mathrm{M}`,R`\mathrm{pOH}=1{,}84\ \Rightarrow\ \mathrm{pH}=12{,}16`),
   verif:ver('<p>'+m(R`\frac{0{,}0145}{0{,}479}\cdot100=3{,}0\,\%\le5\,\%`)+' ✔ (la cuadrática da 0,0143 M y pH 12,16) · [H₃O⁺] = 6,9·10⁻¹³ M ≪ [CH₃NH₃⁺] ✔</p>'),
   esp:esp([['HO⁻','1,45·10⁻²'],['CH₃NH₃⁺','1,45·10⁻²'],['CH₃NH₂','0,465'],['H₃O⁺','6,9·10⁻¹³']]),
   jus:'<p>Base débil concentrada: se protona poco (3 %), por eso [CH₃NH₃⁺] es baja respecto de C; el medio es básico, por eso [H₃O⁺] es baja respecto de [CH₃NH₃⁺]. Ambos verifican.</p>'
  }),'C = 0,479 M · pH = 12,16');

  S('g3m-11',res({
   plan:'<p>Dilución y ácido débil: C₁V₁ = C₂V₂, después equilibrio con Ka, desprecios, cálculo, verificación y todas las especies.</p>',
   datos:'<p>50 mL de ácido propanoico 0,250 M llevados a 1 L; Ka = 1,3·10⁻⁵ (dato).</p>',
   sist:sys({rx:[['CH3CH2COOH(ac) + H2O(l) <=> CH3CH2COO^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{Pr^-}][\mathrm{H_3O^+}]}{[\mathrm{HPr}]}=1{,}3\times10^{-5}`],W],bm:[R`C=[\mathrm{HPr}]+[\mathrm{Pr^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Pr^-}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HO⁻] baja respecto de [Pr⁻] (BC)',agua('[Pr⁻]')+'.'],['[Pr⁻] baja respecto de C (BM)','C/Ka = 962 &gt; 100.']]),
   cuanti:chain(R`C=\frac{0{,}250\cdot50}{1000}=0{,}0125\ \mathrm{M}`,R`[\mathrm{H_3O^+}]=\sqrt{1{,}3\times10^{-5}\cdot0{,}0125}=4{,}03\times10^{-4}\ \mathrm{M}\quad(\mathrm{pH}=3{,}39)`),
   verif:ver('<p>4,03·10⁻⁴/0,0125 = 3,2 % ✔ · [HO⁻] = 2,5·10⁻¹¹ M ✔</p>'),
   esp:esp([['H₃O⁺','4,0·10⁻⁴'],['CH₃CH₂COO⁻','4,0·10⁻⁴'],['CH₃CH₂COOH','0,0121'],['HO⁻','2,5·10⁻¹¹']]),
   jus:'<p>La dilución conserva los moles (C = 0,0125 M). Ácido débil con C/Ka &gt; 100: se disocia poco; medio ácido: el agua se desprecia. Verificado.</p>'
  }),'pH = 3,39 · [ácido] = 0,0121 M · [propanoato] = 4,0·10⁻⁴ M');

  S('g3m-12',res({
   plan:'<p>Mismo ácido a tres concentraciones: se ve cómo cambia lo que se puede despreciar y cómo crece el grado de disociación al diluir. En cada caso se decide con C/Ka y se verifica.</p>',
   datos:'<p>Ácido láctico (HLac); Ka = 8,4·10⁻⁴ (dato).</p>',
   sist:sys({rx:[['HLac(ac) + H2O(l) <=> Lac^-(ac) + H3O^+(ac)',R`K_a=8{,}4\times10^{-4}`],W],bm:[R`C=[\mathrm{HLac}]+[\mathrm{Lac^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Lac^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>En los tres casos el medio es ácido y [HO⁻] se desprecia respecto de [Lac⁻] (verificado al final). Lo que cambia es el BM:</p>'+table(['C (M)','C/Ka','Aproximación x ≈ √(KaC)','Decisión'],[['0,12','143 &gt; 100','8,4 % de C: no verifica','cuadrática'],['1,2·10⁻³','1,4','84 %: absurdo','cuadrática'],['1,2·10⁻⁵','0,014','837 %: imposible','cuadrática (casi todo disociado)']]),
   cuanti:chain(R`x=\frac{-K_a+\sqrt{K_a^2+4K_aC}}{2}`)+table(['C (M)','[H₃O⁺] (M)','pH','pOH','α'],[['0,12','9,63·10⁻³','2,02','11,98','8,0 %'],['1,2·10⁻³','6,68·10⁻⁴','3,18','10,82','56 %'],['1,2·10⁻⁵','1,18·10⁻⁵','4,93','9,07','99 %']]),
   verif:ver('<p>Aun en c), [HO⁻] = 8,5·10⁻¹⁰ M frente a 1,18·10⁻⁵ M (0,007 %) ✔.</p>'),
   jus:'<p>En a) C/Ka &gt; 100 pero la verificación da 8,4 % &gt; 5 %: manda la verificación, cuadrática. Al diluir, α aumenta (menos choques efectivos que rearmen el ácido; Le Châtelier: hacia el lado con más partículas): en c) se comporta casi como un ácido fuerte.</p>'
  }),'a) pH 2,02, α 8 % · b) pH 3,18, α 56 % · c) pH 4,93, α 99 %');

  S('g3m-13',res({
   plan:'<p>HF concentrado que se diluye: dilución, después equilibrio de un ácido débil con Ka (de pKa). Se calcula [F⁻] en las dos soluciones y se comparan los grados de disociación.</p>',
   datos:'<p>HF 22,6 M; pKa = 3,17 → Ka = 6,76·10⁻⁴. 5 cm³ llevados a 2 dm³.</p>',
   sist:sys({rx:[['HF(ac) + H2O(l) <=> F^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{F^-}][\mathrm{H_3O^+}]}{[\mathrm{HF}]}=6{,}76\times10^{-4}`],W],bm:[R`C=[\mathrm{HF}]+[\mathrm{F^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{F^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>En las dos soluciones el medio es ácido: [HO⁻] se desprecia respecto de [F⁻]. En la <b>diluida</b>, C/Ka = 84 &lt; 100: no se desprecia [F⁻] frente a C. En la <b>concentrada</b>, C/Ka ≈ 3·10⁴: sí (muchos choques efectivos que rearman HF).</p>',
   cuanti:inc('a','pH de la solución final',chain(R`C=\frac{22{,}6\cdot5}{2000}=0{,}0565\ \mathrm{M}`,R`x=\frac{-6{,}76\times10^{-4}+\sqrt{(6{,}76\times10^{-4})^2+4\cdot6{,}76\times10^{-4}\cdot0{,}0565}}{2}=5{,}85\times10^{-3}\ \mathrm{M}`,R`\mathrm{pH}=2{,}23\qquad\alpha=10{,}4\,\%`))+
    inc('b','[F⁻] en ambas soluciones',chain([R`\text{concentrada: }[\mathrm{F^-}]=\sqrt{6{,}76\times10^{-4}\cdot22{,}6}=0{,}124\ \mathrm{M}\ (\alpha=0{,}55\,\%)`,'verifica: 0,55 % ≤ 5 %'],[R`\text{diluida: }[\mathrm{F^-}]=5{,}85\times10^{-3}\ \mathrm{M}`,''])+note('Límite del modelo','<p>En HF 22,6 M las actividades son muy distintas de las concentraciones: el cálculo de la solución concentrada es sólo orientativo.</p>')),
   jus:'<p>Al diluir 400 veces, [F⁻] baja (0,124 → 0,00585 M) pero el grado de disociación sube de 0,55 % a 10,4 %: menos choques efectivos (y Le Châtelier por dilución). En la diluida C/Ka &lt; 100 obliga a la cuadrática.</p>'
  }),'a) pH 2,23 · b) [F⁻] = 0,124 M (concentrada) y 5,85·10⁻³ M (diluida)');

  S('g3m-14',res({
   plan:'<p>Es el problema “al revés”: se conoce el pH y se busca la concentración. Del pH sale [HO⁻]; del BC, [NH₄⁺]; de Kb, [NH₃]; del BM, la concentración total. Después la masa de solución concentrada.</p>',
   datos:'<p>500 mL de NH₃ a pH 11; Kb = 1,8·10⁻⁵ (dato). Solución concentrada 50 % m/m. M(NH₃) = 17,03 g/mol.</p>',
   sist:sys({rx:[['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}=1{,}8\times10^{-5}`],W],bm:[R`C=[\mathrm{NH_3}]+[\mathrm{NH_4^+}]`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuali:sup([['[H₃O⁺] baja respecto de [NH₄⁺] (BC)','pH 11: [H₃O⁺] = 10⁻¹¹ M frente a 10⁻³ M.']])+'<p>En el BM no se desprecia nada: se quiere el valor exacto de C.</p>',
   cuanti:chain(R`[\mathrm{HO^-}]=10^{-(14-11)}=10^{-3}\ \mathrm{M}=[\mathrm{NH_4^+}]`,R`[\mathrm{NH_3}]=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{K_b}=\frac{(10^{-3})^2}{1{,}8\times10^{-5}}=0{,}0556\ \mathrm{M}`,R`C=0{,}0556+0{,}0010=0{,}0566\ \mathrm{M}`,R`m_{\mathrm{NH_3}}=0{,}0566\cdot0{,}500\cdot17{,}03=0{,}482\ \mathrm{g}\ \Rightarrow\ m_{\text{sc}}=\frac{0{,}482}{0{,}50}=0{,}963\ \mathrm{g}`),
   verif:ver('<p>Comprobación: con C = 0,0566 M, √(Kb·C) = 1,0·10⁻³ M → pH 11,0 ✔.</p>'),
   jus:'<p>Del pH se conoce [HO⁻] exactamente; en el BC es razonable suponer [H₃O⁺] baja respecto de [NH₄⁺] (medio básico), así que [NH₄⁺] = [HO⁻]. Con Kb se despeja [NH₃] y la concentración total sale del BM.</p>'
  }),'C = 0,0566 M · 0,96 g de solución de NH₃ al 50 %');

  S('g3m-15',res({
   plan:'<p>Ácido débil y muy diluido: hay que evaluar <b>antes</b> si el agua aporta tanto H₃O⁺ como el ácido (Ka·C frente a Kw) y si se puede despreciar la fracción disociada (C/Ka). Si no se puede despreciar ninguna de las dos cosas, se resuelve el planteo completo.</p>',
   datos:'<p>HClO 1·10⁻⁶ M; Ka = 2,95·10⁻⁸ (dato).</p>',
   sist:sys({rx:[['HClO(ac) + H2O(l) <=> ClO^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{ClO^-}][\mathrm{H_3O^+}]}{[\mathrm{HClO}]}=2{,}95\times10^{-8}`],W],bm:[R`10^{-6}=[\mathrm{HClO}]+[\mathrm{ClO^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{ClO^-}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>Lo que molesta en el BC es [HO⁻]. Pero Ka·C = 2,95·10⁻¹⁴, del mismo orden que Kw: el ácido aporta tanto H₃O⁺ como el agua, así que <b>no</b> es razonable suponer [HO⁻] baja respecto de [ClO⁻]. En el BM, C/Ka = 34 &lt; 100 y la solución está muy diluida (pocos choques efectivos): tampoco se desprecia [ClO⁻] frente a C. Se conserva todo.</p>',
   cuanti:chain([R`[\mathrm{H_3O^+}]=\frac{K_a[\mathrm{HClO}]}{[\mathrm{H_3O^+}]}+\frac{K_w}{[\mathrm{H_3O^+}]}\ \Rightarrow\ [\mathrm{H_3O^+}]=\sqrt{K_a[\mathrm{HClO}]+K_w}`,'del BC'],[R`[\mathrm{HClO}]=C\,\frac{[\mathrm{H_3O^+}]}{[\mathrm{H_3O^+}]+K_a}`,'del BM y Ka'],R`\text{resolviendo (iterando o con la cúbica): }[\mathrm{H_3O^+}]=1{,}88\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}72\qquad\alpha=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=0{,}135`),
   esp:esp([['H₃O⁺','1,88·10⁻⁷'],['HO⁻','5,3·10⁻⁸'],['ClO⁻','1,35·10⁻⁷'],['HClO','8,6·10⁻⁷']]),
   verif:ver('<p>BC: 1,35·10⁻⁷ + 0,53·10⁻⁷ = 1,88·10⁻⁷ ✔. Si se hubiera despreciado el agua, el pH daría 6,80 y, con ese resultado, [HO⁻] sería el 40 % de [ClO⁻]: no verificaría.</p>'),
   jus:'<p>Ácido muy débil y muy diluido: Ka·C ≈ Kw, el agua no se puede despreciar; y C/Ka &lt; 100 con dilución alta, tampoco la fracción disociada. Planteo completo: pH 6,72 y α = 13,5 %.</p>'
  }),'pH = 6,72 · α = 13,5 %');

  // ================================================================ POLIPRÓTICOS
  const h2s=sys({rx:[['H2S(ac) + H2O(l) <=> HS^-(ac) + H3O^+(ac)',R`K_{a1}=\frac{[\mathrm{HS^-}][\mathrm{H_3O^+}]}{[\mathrm{H_2S}]}=9{,}6\times10^{-8}`],['HS^-(ac) + H2O(l) <=> S^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{S^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HS^-}]}=1{,}3\times10^{-14}`],W],bm:[R`0{,}1=[\mathrm{H_2S}]+[\mathrm{HS^-}]+[\mathrm{S^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HS^-}]+2[\mathrm{S^{2-}}]+[\mathrm{HO^-}]`]});
  S('g3p-1',res({
   plan:'<p>Diprótico débil: dos equilibrios, uno por protón. Se justifica que el H₃O⁺ lo fija la primera etapa (Ka₂ ≪ Ka₁ y además reprimida) y que se disocia poco (C/Ka₁ &gt; 100).</p>',
   datos:'<p>H₂S saturado 0,1 M; Ka₁ = 9,6·10⁻⁸; Ka₂ = 1,3·10⁻¹⁴ (datos).</p>',
   sist:h2s,
   cuali:sup([['[S²⁻] y [HO⁻] bajas respecto de [HS⁻] en el BC','Ka₂ es 10⁷ veces menor que Ka₁ y la 2.ª etapa está reprimida por el H₃O⁺ de la 1.ª (ion común); medio ácido.'],['[HS⁻] baja respecto de 0,1 en el BM','ácido débil, C/Ka₁ = 10⁶ &gt; 100.']]),
   cuanti:chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{HS^-}]\qquad[\mathrm{H_2S}]\approx0{,}1`,R`[\mathrm{H_3O^+}]=\sqrt{9{,}6\times10^{-8}\cdot0{,}1}=9{,}8\times10^{-5}\ \mathrm{M}\quad(\mathrm{pH}=4{,}01)`,[R`[\mathrm{S^{2-}}]=K_{a2}\frac{[\mathrm{HS^-}]}{[\mathrm{H_3O^+}]}\approx K_{a2}=1{,}3\times10^{-14}\ \mathrm{M}`,'[HS⁻] ≈ [H₃O⁺]']),
   verif:ver('<p>9,8·10⁻⁵/0,1 = 0,1 % ✔ · 2[S²⁻] = 2,6·10⁻¹⁴ ≪ [HS⁻] ✔ · [HO⁻] = 1,0·10⁻¹⁰ M ✔</p>'),
   esp:esp([['H₂S','0,1'],['HS⁻','9,8·10⁻⁵'],['H₃O⁺','9,8·10⁻⁵'],['S²⁻','1,3·10⁻¹⁴'],['HO⁻','1,0·10⁻¹⁰']]),
   jus:'<p>El pH lo fija la primera disociación: la segunda es mucho más débil y está reprimida por ion común. C/Ka₁ &gt; 100: se disocia poco. Todo verificado.</p>'
  }),'[H₃O⁺] = 9,8·10⁻⁵ M (pH 4,01)');

  S('g3p-2',res({
   plan:'<p>La 1.ª disociación del sulfúrico es total y la 2.ª es débil. Con el pH dato se conoce [H₃O⁺]: el cociente [SO₄²⁻]/[HSO₄⁻] sale de Ka₂ y con el BC se obtiene la concentración del ácido.</p>',
   datos:'<p>pH = 2,5 → [H₃O⁺] = 3,16·10⁻³ M; Ka₂ = 1,2·10⁻² (dato).</p>',
   sist:sys({rx:[['H2SO4(ac) + H2O(l) -> HSO4^-(ac) + H3O^+(ac)','','1.ª: total'],['HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)',R`K_{a2}=1{,}2\times10^{-2}`],W],bm:[R`C=[\mathrm{HSO_4^-}]+[\mathrm{SO_4^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HSO_4^-}]+2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`]}),
   cuali:'<p>No queda H₂SO₄ sin disociar (1.ª etapa total: α₁ = 1). pH 2,5 &gt; pKa₂ = 1,92: según el diagrama de especiación predomina el SO₄²⁻.</p>'+sup([['[HO⁻] baja en el BC','medio ácido.']]),
   cuanti:chain(R`\frac{[\mathrm{SO_4^{2-}}]}{[\mathrm{HSO_4^-}]}=\frac{K_{a2}}{[\mathrm{H_3O^+}]}=\frac{1{,}2\times10^{-2}}{3{,}16\times10^{-3}}=3{,}79`,R`\alpha_{\mathrm{SO_4^{2-}}}=\frac{3{,}79}{1+3{,}79}=0{,}79\qquad\alpha_{\mathrm{HSO_4^-}}=0{,}21`,[R`[\mathrm{H_3O^+}]=C(\alpha_{\mathrm{HSO_4^-}}+2\alpha_{\mathrm{SO_4^{2-}}})=C(1+0{,}79)\ \Rightarrow\ C=1{,}77\times10^{-3}\ \mathrm{M}`,'del BC']),
   esp:esp([['H₂SO₄','≈ 0'],['HSO₄⁻','3,7·10⁻⁴'],['SO₄²⁻','1,40·10⁻³'],['H₃O⁺','3,16·10⁻³'],['HO⁻','3,2·10⁻¹²']]),
   jus:'<p>Primera disociación total (α₁ = 1). En la segunda se disocia el 79 % porque el pH está por encima de pKa₂. La concentración de ácido compatible con pH 2,5 es 1,8·10⁻³ M.</p>'
  }),'1.ª: 100 % · HSO₄⁻ 21 % · SO₄²⁻ 79 % (C ≈ 1,8·10⁻³ M)');

  S('g3p-3',res({
   plan:'<p>El HCl (fuerte) fija el H₃O⁺ en 0,3 M; por ion común reprime las dos disociaciones del H₂S. Con [H₃O⁺] conocida, cada especie sale de su constante.</p>',
   datos:'<p>H₂S saturado 0,1 M; [H₃O⁺] = 0,3 M; Ka₁ y Ka₂ del ej. 1.</p>',
   sist:rxs(['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','fuerte: total'])+h2s,
   cuali:lc('H2S(ac) + H2O(l) <=> HS^-(ac) + H3O^+(ac)','0,3 M de H₃O⁺ (ion común)','←',[['[HS⁻]','↓'],['[S²⁻]','↓↓'],['[H₂S]','≈ 0,1']],'Las dos disociaciones se desplazan hacia los reactivos: el H₂S queda prácticamente sin disociar y el sulfuro baja muchísimo.'),
   cuanti:chain(R`[\mathrm{HS^-}]=\frac{K_{a1}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]}=\frac{9{,}6\times10^{-8}\cdot0{,}1}{0{,}3}=3{,}2\times10^{-8}\ \mathrm{M}`,R`[\mathrm{S^{2-}}]=\frac{K_{a2}[\mathrm{HS^-}]}{[\mathrm{H_3O^+}]}=1{,}4\times10^{-21}\ \mathrm{M}`,R`[\mathrm{HO^-}]=3{,}3\times10^{-14}\ \mathrm{M}\qquad[\mathrm{Cl^-}]\approx0{,}3\ \mathrm{M}`),
   verif:ver('<p>El H₂S aporta 3,2·10⁻⁸ M de H₃O⁺, despreciable frente a 0,3 M ✔.</p>'),
   concl:'<p><b>Especies relevantes:</b> H₂S (0,1 M), H₃O⁺ y Cl⁻ (0,3 M). HS⁻, S²⁻ y HO⁻ son despreciables (pero no nulas). Así se controla el sulfuro con el pH en la marcha analítica.</p>',
   jus:'<p>El H₃O⁺ del HCl es ion común de las dos disociaciones del H₂S y las reprime (Le Châtelier): [H₂S] ≈ 0,1 M y [S²⁻] baja a 10⁻²¹ M.</p>'
  }),'Relevantes: H₂S, H₃O⁺ y Cl⁻ · [S²⁻] = 1,4·10⁻²¹ M');

  S('g3p-4',res({
   plan:'<p>Triprótico débil: tres equilibrios. El H₃O⁺ lo fija la primera etapa (Ka₂/Ka₁ ≈ 10⁻⁵); hay que ver si en esa etapa se puede despreciar x frente a C. Las demás especies salen de Ka₂ y Ka₃.</p>',
   datos:'<p>H₃PO₄ 0,2 M; pKa₁ 2,3 · pKa₂ 7,2 · pKa₃ 13,0 → Ka₁ = 5,0·10⁻³; Ka₂ = 6,3·10⁻⁸; Ka₃ = 1,0·10⁻¹³ (datos).</p>',
   sist:sys({rx:[['H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)',R`K_{a1}=5{,}0\times10^{-3}`],['H2PO4^-(ac) + H2O(l) <=> HPO4^2-(ac) + H3O^+(ac)',R`K_{a2}=6{,}3\times10^{-8}`],['HPO4^2-(ac) + H2O(l) <=> PO4^3-(ac) + H3O^+(ac)',R`K_{a3}=1{,}0\times10^{-13}`],W],bm:[R`0{,}2=[\mathrm{H_3PO_4}]+[\mathrm{H_2PO_4^-}]+[\mathrm{HPO_4^{2-}}]+[\mathrm{PO_4^{3-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{H_2PO_4^-}]+2[\mathrm{HPO_4^{2-}}]+3[\mathrm{PO_4^{3-}}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['[HPO₄²⁻], [PO₄³⁻] y [HO⁻] bajas respecto de [H₂PO₄⁻] en el BC','Ka₂ y Ka₃ muy menores que Ka₁, reprimidas por el H₃O⁺ de la 1.ª; medio ácido.']])+'<p>En el BM, C/Ka₁ = 40 &lt; 100: <b>no</b> se desprecia [H₂PO₄⁻] frente a C.</p>',
   cuanti:chain(R`5{,}0\times10^{-3}=\frac{x^2}{0{,}2-x}\ \Rightarrow\ x=\frac{-5{,}0\times10^{-3}+\sqrt{(5{,}0\times10^{-3})^2+4\cdot5{,}0\times10^{-3}\cdot0{,}2}}{2}=2{,}93\times10^{-2}\ \mathrm{M}`,R`\mathrm{pH}=1{,}53`,R`[\mathrm{HPO_4^{2-}}]\approx K_{a2}=6{,}3\times10^{-8}\qquad[\mathrm{PO_4^{3-}}]=\frac{K_{a3}K_{a2}}{x}=2{,}2\times10^{-19}\ \mathrm{M}`),
   esp:K.table(['Especie','M','α'],[['H₃PO₄','0,171','85 %'],['H₂PO₄⁻','0,0293','15 %'],['HPO₄²⁻','6,3·10⁻⁸','3·10⁻⁵ %'],['PO₄³⁻','2,2·10⁻¹⁹','1·10⁻¹⁶ %'],['H₃O⁺','0,0293','—'],['HO⁻','3,4·10⁻¹³','—']]),
   verif:ver('<p>2[HPO₄²⁻] = 1,3·10⁻⁷ frente a 0,0293 en el BC ✔.</p>'),
   jus:'<p>La primera etapa fija el pH; C/Ka₁ &lt; 100, así que se resuelve con la cuadrática. Las siguientes son despreciables para el pH, pero sus especies existen y se calculan con sus constantes.</p>'
  }),'pH = 1,53 · H₃PO₄ 85 % · H₂PO₄⁻ 15 % · HPO₄²⁻ 6,3·10⁻⁸ M · PO₄³⁻ 2,2·10⁻¹⁹ M');

  S('g3p-5',res({
   plan:'<p>Con el pH dato se calculan las fracciones de distribución α de cada especie (no hace falta la concentración total): '+m(R`D=h^2+K_{a1}h+K_{a1}K_{a2}`)+'.</p>',
   datos:'<p>Ácido ascórbico (H₂A); Ka₁ = 8,0·10⁻⁵; Ka₂ = 1,6·10⁻¹²; pH = 3 → h = 10⁻³ M.</p>',
   sist:rxs(['H2A(ac) + H2O(l) <=> HA^-(ac) + H3O^+(ac)','Ka₁ = 8,0·10⁻⁵'],['HA^-(ac) + H2O(l) <=> A^2-(ac) + H3O^+(ac)','Ka₂ = 1,6·10⁻¹²'],W),
   cuanti:chain(R`D=(10^{-3})^2+8\times10^{-5}\cdot10^{-3}+8\times10^{-5}\cdot1{,}6\times10^{-12}=1{,}08\times10^{-6}`,R`\alpha_{\mathrm{H_2A}}=\frac{h^2}{D}=92{,}6\,\%\qquad\alpha_{\mathrm{HA^-}}=\frac{K_{a1}h}{D}=7{,}4\,\%\qquad\alpha_{\mathrm{A^{2-}}}=\frac{K_{a1}K_{a2}}{D}=1{,}2\times10^{-8}\,\%`)+spec([4.10,11.80],['H₂A','HA⁻','A²⁻'],{mark:[{pH:3,label:'pH 3'}]}),
   jus:'<p>pH 3 &lt; pKa₁ (4,10): predomina la forma sin disociar. El A²⁻ es despreciable (8,8 unidades por debajo de pKa₂) pero no nulo.</p>'
  }),'H₂A 92,6 % · HA⁻ 7,4 % · A²⁻ 1,2·10⁻⁸ %');

  S('g3p-6',res({
   plan:'<p>La nicotina es una base diprótica (acepta dos H⁺). Después de diluir se evalúa si se puede aproximar en la 1.ª protonación (la que fija el pH) y se justifica que la 2.ª es despreciable.</p>',
   datos:'<p>Nicotina (Nic) 0,1 M diluida 1:10 → C = 0,01 M; pKb₁ = 4 → Kb₁ = 1·10⁻⁴; pKb₂ = 10,9 → Kb₂ = 1,3·10⁻¹¹.</p>',
   sist:sys({rx:[['Nic(ac) + H2O(l) <=> NicH^+(ac) + HO^-(ac)',R`K_{b1}=1\times10^{-4}`],['NicH^+(ac) + H2O(l) <=> NicH2^2+(ac) + HO^-(ac)',R`K_{b2}=1{,}3\times10^{-11}`],W],bm:[R`0{,}01=[\mathrm{Nic}]+[\mathrm{NicH^+}]+[\mathrm{NicH_2^{2+}}]`],bc:[R`[\mathrm{NicH^+}]+2[\mathrm{NicH_2^{2+}}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]}),
   cuali:'<p>Sí será básica: es una base y al diluirla sigue aportando HO⁻ (el pH baja hacia 7, pero no lo cruza).</p>'+sup([['[NicH₂²⁺] y [H₃O⁺] bajas en el BC','Kb₂ 10⁷ veces menor y reprimida por el HO⁻ de la 1.ª; medio básico.']])+'<p>C/Kb₁ = 100: justo en el límite; se prueba y se verifica.</p>',
   cuanti:chain([R`x\approx\sqrt{10^{-4}\cdot0{,}01}=1{,}0\times10^{-3}\ \mathrm{M}`,'10 % de C: no verifica'],R`x=\frac{-10^{-4}+\sqrt{10^{-8}+4\cdot10^{-6}}}{2}=9{,}5\times10^{-4}\ \mathrm{M}`,R`\mathrm{pOH}=3{,}02\ \Rightarrow\ \mathrm{pH}=10{,}98`),
   verif:ver('<p>La aproximación daba 10 % &gt; 5 %: se usó la cuadrática ✔. [NicH₂²⁺] ≈ Kb₂ = 1,3·10⁻¹¹ M ≪ [NicH⁺] ✔.</p>'),
   jus:'<p>La nicotina diluida sigue siendo básica. La 2.ª protonación es despreciable (Kb₂ ≪ Kb₁ y reprimida). En la 1.ª, C/Kb₁ = 100 está en el límite y la verificación falla: cuadrática.</p>'
  }),'Sí, básica: pH = 10,98');

  S('g3p-7',res({
   plan:'<p>Mismo esquema que el fosfórico (ej. 4): triprótico, la 1.ª etapa fija el pH, se evalúa C/Ka₁ y las demás especies salen de Ka₂ y Ka₃. Al final se comparan los dos ácidos.</p>',
   datos:'<p>H₃AsO₄ 0,2 M; pKa₁ 2,24 · pKa₂ 6,93 · pKa₃ 11,50 → Ka₁ = 5,75·10⁻³; Ka₂ = 1,17·10⁻⁷; Ka₃ = 3,2·10⁻¹² (datos).</p>',
   sist:sys({rx:[['H3AsO4(ac) + H2O(l) <=> H2AsO4^-(ac) + H3O^+(ac)',R`K_{a1}=5{,}75\times10^{-3}`],['H2AsO4^-(ac) + H2O(l) <=> HAsO4^2-(ac) + H3O^+(ac)',R`K_{a2}=1{,}17\times10^{-7}`],['HAsO4^2-(ac) + H2O(l) <=> AsO4^3-(ac) + H3O^+(ac)',R`K_{a3}=3{,}2\times10^{-12}`],W],bm:[R`0{,}2=[\mathrm{H_3AsO_4}]+[\mathrm{H_2AsO_4^-}]+[\mathrm{HAsO_4^{2-}}]+[\mathrm{AsO_4^{3-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{H_2AsO_4^-}]+2[\mathrm{HAsO_4^{2-}}]+3[\mathrm{AsO_4^{3-}}]+[\mathrm{HO^-}]`]}),
   cuali:sup([['2.ª y 3.ª etapas y [HO⁻] despreciables en el BC','Ka₂/Ka₁ ≈ 2·10⁻⁵ y reprimidas por ion común; medio ácido.']])+'<p>C/Ka₁ = 35 &lt; 100: cuadrática en la 1.ª etapa.</p>',
   cuanti:chain(R`x=\frac{-5{,}75\times10^{-3}+\sqrt{(5{,}75\times10^{-3})^2+4\cdot5{,}75\times10^{-3}\cdot0{,}2}}{2}=3{,}12\times10^{-2}\ \mathrm{M}\quad(\mathrm{pH}=1{,}51)`,R`[\mathrm{H_3AsO_4}]=0{,}169\qquad[\mathrm{HAsO_4^{2-}}]\approx K_{a2}=1{,}2\times10^{-7}\qquad[\mathrm{AsO_4^{3-}}]=\frac{K_{a3}K_{a2}}{x}=1{,}2\times10^{-17}`),
   esp:esp([['H₃AsO₄','0,169'],['H₂AsO₄⁻','0,0312'],['HAsO₄²⁻','1,2·10⁻⁷'],['AsO₄³⁻','1,2·10⁻¹⁷'],['H₃O⁺','0,0312'],['HO⁻','3,2·10⁻¹³']]),
   concl:'<p><b>Comparación con el ej. 4:</b> constantes muy parecidas a las del fosfórico (son elementos del mismo grupo), así que el comportamiento es casi idéntico: pH 1,51 frente a 1,53 y la misma distribución de especies.</p>',
   jus:'<p>Primera etapa con cuadrática (C/Ka₁ &lt; 100); el resto despreciable para el pH pero calculable con sus constantes.</p>'
  }),'pH = 1,51 (casi igual que el fosfórico 0,2 M: 1,53)');

  // ---------------------------------------------------------------- Desafío 1 · oxálico
  S('g3p-d1',res({
   plan:'<p>“Determinar en qué rango” invita a acotar el pH con dos casos extremos y después confirmar con el planteo completo. Primero la concentración (el sólido está dihidratado: su masa molar incluye las dos aguas).</p>',
   datos:'<p>1 g de H₂C₂O₄·2H₂O (M = 126,07 g/mol) en 2 L. pKa₁ 1,3 → Ka₁ = 0,050; pKa₂ 4,3 → Ka₂ = 5,0·10⁻⁵.</p>',
   sist:sys({rx:[['H2C2O4(ac) + H2O(l) <=> HC2O4^-(ac) + H3O^+(ac)',R`K_{a1}=0{,}050`],['HC2O4^-(ac) + H2O(l) <=> C2O4^2-(ac) + H3O^+(ac)',R`K_{a2}=5{,}0\times10^{-5}`],W],bm:[R`C=[\mathrm{H_2C_2O_4}]+[\mathrm{HC_2O_4^-}]+[\mathrm{C_2O_4^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HC_2O_4^-}]+2[\mathrm{C_2O_4^{2-}}]+[\mathrm{HO^-}]`]}),
   cuanti:chain(R`C=\frac{1/126{,}07}{2}=3{,}97\times10^{-3}\ \mathrm{M}`),
   cuali:'<p><b>1.ª etapa:</b> Ka₁ = 0,050 es <b>alta</b> y C ≪ Ka₁ (C/Ka₁ = 0,08): en solución tan diluida casi todo el oxálico cede su primer protón (pocos choques efectivos). <b>2.ª etapa:</b> Ka₂ intermedia y reprimida por el H₃O⁺ de la primera: aporta poco. Entonces el pH queda acotado entre:</p>'+table(['Caso extremo','[H₃O⁺]','pH'],[['sólo el 1.er H, total','C = 3,97·10⁻³','2,40'],['los dos H, totales','2C = 7,93·10⁻³','2,10']]),
   verif:'<p><b>Planteo completo</b> (BC con las fracciones α de las dos etapas, resuelto numéricamente):</p>'+chain(R`[\mathrm{H_3O^+}]=C\,(\alpha_1+2\alpha_2)+\frac{K_w}{[\mathrm{H_3O^+}]}\ \Rightarrow\ [\mathrm{H_3O^+}]=3{,}74\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pH}=2{,}43`)+'<p>Da un poco por encima de 2,40 porque la 1.ª etapa no llega a ser del todo completa (queda 7 % sin disociar) y la 2.ª aporta poco (1,2 % de oxalato).</p>',
   esp:esp([['H₂C₂O₄','2,7·10⁻⁴'],['HC₂O₄⁻','3,65·10⁻³'],['C₂O₄²⁻','4,9·10⁻⁵'],['H₃O⁺','3,74·10⁻³']]),
   jus:'<p>Ka₁ alta y solución muy diluida: la 1.ª disociación es casi completa; la 2.ª aporta poco por ser más débil y estar reprimida. El pH queda alrededor de 2,4, dentro del rango 2,1–2,4.</p>'
  }),'pH ≈ 2,4 (rango 2,1 – 2,4)');

  // ---------------------------------------------------------------- Desafío 2 · ascórbico y nicotínico
  S('g3p-d2',res({
   plan:'<p>Tres partes de ácido ascórbico: (a) describir el sistema; (b) qué especies están sobre la piel (especiación a pH 4,7–5,7); (c) concentraciones en el producto 12,5 % m/v. Después, el ácido nicotínico: cuánto HCl hay que agregar para llevarlo a pH 2,5, teniendo en cuenta que el propio ácido aporta algo de H₃O⁺.</p>',
   datos:'<p>H₂A (C₆H₈O₆, M = 176,12 g/mol); Ka₁ = 8,0·10⁻⁵ (pKa₁ 4,10); Ka₂ = 1,6·10⁻¹² (pKa₂ 11,80). Ácido nicotínico (HNic, M = 123,11 g/mol): Ka = 1,4·10⁻⁵; 380 mg en 40 mL. HCl 36 % m/m, δ = 1,18 g/mL.</p>',
   cuali:inc('1a','Descripción del sistema en equilibrio',sys({rx:[['H2A(ac) + H2O(l) <=> HA^-(ac) + H3O^+(ac)',R`K_{a1}=\frac{[\mathrm{HA^-}][\mathrm{H_3O^+}]}{[\mathrm{H_2A}]}=8{,}0\times10^{-5}`],['HA^-(ac) + H2O(l) <=> A^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{A^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HA^-}]}=1{,}6\times10^{-12}`],W],bm:[R`C=[\mathrm{H_2A}]+[\mathrm{HA^-}]+[\mathrm{A^{2-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HA^-}]+2[\mathrm{A^{2-}}]+[\mathrm{HO^-}]`]})+'<p>Diprótico débil: un equilibrio por protón. Ka₂ ≪ Ka₁ (diferencia de 10⁷) y además la 2.ª etapa está reprimida por el H₃O⁺ de la 1.ª: es despreciable para el pH. El sistema alcanza el equilibrio (como mínimo, el del agua).</p>')+
    inc('1b','Especies activas sobre la piel (pH 4,7 – 5,7)',spec([4.10,11.80],['H₂A','HA⁻','A²⁻'],{band:[4.7,5.7]})+table(['pH','H₂A','HA⁻','A²⁻'],[['4,7','20 %','80 %','6·10⁻⁶ %'],['5,7','2,4 %','97,6 %','8·10⁻⁵ %']])+'<p>El rango está por encima de pKa₁ y muy lejos de pKa₂: actúa principalmente el <b>ascorbato HA⁻</b>, con algo de H₂A en el extremo ácido. El A²⁻ es despreciable.</p>')+
    inc('1c','Concentraciones en el producto 12,5 % m/v',chain(R`C=\frac{125\ \mathrm{g/L}}{176{,}12\ \mathrm{g/mol}}=0{,}710\ \mathrm{M}`)+sup([['[HA⁻] baja respecto de C (BM)','C/Ka₁ = 8900 &gt; 100.'],['[A²⁻] y [HO⁻] bajas respecto de [HA⁻] (BC)','Ka₂ ≪ Ka₁ y medio ácido.']])+chain(R`[\mathrm{H_3O^+}]=[\mathrm{HA^-}]=\sqrt{8{,}0\times10^{-5}\cdot0{,}710}=7{,}5\times10^{-3}\ \mathrm{M}\quad(\mathrm{pH}=2{,}12)`,R`[\mathrm{H_2A}]=0{,}702\qquad[\mathrm{A^{2-}}]\approx K_{a2}=1{,}6\times10^{-12}\qquad[\mathrm{HO^-}]=1{,}3\times10^{-12}`)+ver('<p>7,5·10⁻³/0,710 = 1,1 % ✔</p>'))+
    inc('2','HCl 36 % para el lote de 40 L de ácido nicotínico a pH 2,5',
     sys({rx:[['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','','total'],['HNic(ac) + H2O(l) <=> Nic^-(ac) + H3O^+(ac)',R`K_a=1{,}4\times10^{-5}`],W],bm:[R`C=[\mathrm{HNic}]+[\mathrm{Nic^-}]\qquad C_{\mathrm{HCl}}=[\mathrm{Cl^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{Nic^-}]+[\mathrm{HO^-}]`]})+
     '<p>No todo el H₃O⁺ viene del HCl: el ácido nicotínico, aunque reprimido por ion común, aporta algo. Se despeja [Cl⁻] del BC (con [HO⁻] despreciable a pH 2,5).</p>'+
     chain(R`C=\frac{0{,}380\ \mathrm{g}/0{,}040\ \mathrm{L}}{123{,}11}=0{,}0772\ \mathrm{M}\qquad[\mathrm{H_3O^+}]=10^{-2{,}5}=3{,}16\times10^{-3}\ \mathrm{M}`,R`[\mathrm{Nic^-}]=C\,\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=0{,}0772\cdot\frac{1{,}4\times10^{-5}}{3{,}18\times10^{-3}}=3{,}4\times10^{-4}\ \mathrm{M}`,R`[\mathrm{Cl^-}]=3{,}16\times10^{-3}-3{,}4\times10^{-4}=2{,}82\times10^{-3}\ \mathrm{M}`,R`n_{\mathrm{HCl}}=2{,}82\times10^{-3}\cdot40=0{,}113\ \mathrm{mol}\to4{,}12\ \mathrm{g}\to\frac{4{,}12}{0{,}36}=11{,}4\ \mathrm{g\ sc}\to\frac{11{,}4}{1{,}18}=9{,}7\ \mathrm{mL}`)),
   jus:'<p>Ascórbico: diprótico débil cuya 2.ª etapa es despreciable; sobre la piel actúa el HA⁻; en el producto está 99 % sin disociar (pH 2,12). Nicotínico: el HCl es el que fija el pH, pero hay que restar el pequeño aporte del ácido (BC), lo que da 9,7 mL de HCl 36 % por lote.</p>'
  }),'1c) pH 2,12, [H₂A] = 0,702 M, [HA⁻] = 7,5·10⁻³ M · 2) ≈ 9,7 mL (11,4 g) de HCl 36 %');
})();
