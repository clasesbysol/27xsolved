// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS · Ácido-base (2/3)
// Guía N° 3: polipróticos, problemas desafío (oxálico, ascórbico y nicotínico, maleico), sales y desafío del ácido fólico.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,spec,flow}=A;
  const R=String.raw;
  const W=rx('H2O + H2O <=> H3O^+ + HO^-','Kw');

  // =====================================================================
  const gp=[];const ep=(n,title,statement,solution,answer,tag)=>gp.push({id:`g3p-${n}`,tag:tag||`GUÍA 3 · POLIPRÓTICOS · ${n}`,title,statement,solution,answer});

  ep(1,'H₂S saturado 0,1 M',st('Calcule la concentración de iones hidronio en una solución saturada de H₂S 0,1 M. Ka₁: 9,6·10⁻⁸; Ka₂: 1,3·10⁻¹⁴.'),
   desc(rxs(['H2S + H2O <=> HS^- + H3O^+','Ka₁'],['HS^- + H2O <=> S^2- + H3O^+','Ka₂'])+W)+
   sup([['Sólo la primera disociación aporta H₃O⁺','Ka₂ es 10⁷ veces menor y además está reprimida por el H₃O⁺ de la primera (ion común).'],['[HS⁻] ≪ 0,1','C/Ka₁ ≫ 100.']])+
   chain(R`[\mathrm{H_3O^+}]=\sqrt{9{,}6\times10^{-8}\cdot0{,}1}=9{,}8\times10^{-5}\ \mathrm{M}\quad(\mathrm{pH}=4{,}01)`,R`[\mathrm{S^{2-}}]\approx K_{a2}=1{,}3\times10^{-14}\ \mathrm{M}`)+
   ver('<p>9,8·10⁻⁵ es 0,1 % de 0,1 ✔ · la segunda etapa aporta 1,3·10⁻¹⁴ ≪ 9,8·10⁻⁵ ✔</p>'),
   '[H₃O⁺] = 9,8·10⁻⁵ M');

  ep(2,'H₂SO₄ de pH 2,5: grado de disociación',st('Calcule el grado de disociación de todas las especies en una solución de ácido sulfúrico cuyo pH es 2,5. Ka₂: 1,2·10⁻².'),
   desc(rxs(['H2SO4 + H2O -> HSO4^- + H3O^+','1.ª: fuerte'],['HSO4^- + H2O <=> SO4^2- + H3O^+','Ka₂'])+W)+
   chain([R`[\mathrm{H_3O^+}]=10^{-2{,}5}=3{,}16\times10^{-3}`,''],[R`\frac{[\mathrm{SO_4^{2-}}]}{[\mathrm{HSO_4^-}]}=\frac{K_{a2}}{[\mathrm{H_3O^+}]}=3{,}79`,'de Ka₂ con el pH dato'],[R`\alpha_{\mathrm{SO_4^{2-}}}=\frac{3{,}79}{4{,}79}=0{,}79\qquad\alpha_{\mathrm{HSO_4^-}}=0{,}21`,'BM: C = [HSO₄⁻] + [SO₄²⁻]'],[R`\text{BC: }[\mathrm{H_3O^+}]=C\,(1+0{,}79)\Rightarrow C=1{,}77\times10^{-3}\ \mathrm{M}`,'despreciando HO⁻'])+
   jus('<p>La primera disociación es total (α₁ = 1: no queda H₂SO₄). De la segunda se disocia el 79 %: a este pH (2,5) por encima de pKa₂ (1,92) predomina el SO₄²⁻.</p>'),
   'α₁ = 1 · HSO₄⁻ 21 % · SO₄²⁻ 79 % (C ≈ 1,8·10⁻³ M)');

  ep(3,'H₂S con HCl: [H₃O⁺] = 0,3 M',st('A una solución de H₂S (saturada, 0,1 M) se agrega HCl hasta [H₃O⁺] = 0,3 M. Calcule la concentración de todas las especies.'),
   jus('<p>El H₃O⁺ lo fija el HCl (fuerte). Por ion común, las disociaciones del H₂S quedan muy reprimidas: [H₂S] ≈ 0,1 M. Se despejan las demás de Ka₁ y Ka₂ (Ka₁ 9,6·10⁻⁸, Ka₂ 1,3·10⁻¹⁴).</p>')+
   chain(R`[\mathrm{HS^-}]=\frac{K_{a1}\cdot0{,}1}{0{,}3}=3{,}2\times10^{-8}\ \mathrm{M}`,R`[\mathrm{S^{2-}}]=\frac{K_{a2}[\mathrm{HS^-}]}{0{,}3}=1{,}4\times10^{-21}\ \mathrm{M}`,R`[\mathrm{HO^-}]=3{,}3\times10^{-14}\qquad[\mathrm{Cl^-}]=0{,}3\ \mathrm{M}`)+
   ver('<p>El H₂S aporta 3,2·10⁻⁸ M de H₃O⁺: despreciable frente a 0,3 ✔. Y el sistema <b>sí</b> está en equilibrio: el HCl sólo lo desplazó.</p>'),
   '[S²⁻] = 1,4·10⁻²¹ M (así se controla el sulfuro con el pH)');

  ep(4,'H₃PO₄ 0,2 M',st('Calcule la concentración de todas las especies y su grado de disociación para H₃PO₄ 0,2 M. pKa₁ 2,3; pKa₂ 7,2; pKa₃ 13,0.'),
   desc(rxs(['H3PO4 + H2O <=> H2PO4^- + H3O^+','Ka₁'],['H2PO4^- + H2O <=> HPO4^2- + H3O^+','Ka₂'],['HPO4^2- + H2O <=> PO4^3- + H3O^+','Ka₃'])+W)+
   sup([['El pH lo fija la primera disociación','Ka₂/Ka₁ ≈ 10⁻⁵.']])+ver('<p>C/Ka₁ = 40 &lt; 100: x no es despreciable frente a C → cuadrática.</p>',false)+
   chain(R`x=\frac{-5{,}0\times10^{-3}+\sqrt{(5{,}0\times10^{-3})^2+4\cdot5{,}0\times10^{-3}\cdot0{,}2}}{2}=0{,}0293\ \mathrm{M}\quad(\mathrm{pH}=1{,}53)`,R`[\mathrm{HPO_4^{2-}}]\approx K_{a2}=6{,}3\times10^{-8}\qquad[\mathrm{PO_4^{3-}}]=\frac{K_{a3}K_{a2}}{x}=2{,}2\times10^{-19}`)+
   table(['Especie','M','α'],[['H₃PO₄','0,171','85 %'],['H₂PO₄⁻','0,0293','15 %'],['HPO₄²⁻','6,3·10⁻⁸','3·10⁻⁵ %'],['PO₄³⁻','2,2·10⁻¹⁹','≈ 10⁻¹⁶ %'],['HO⁻','3,4·10⁻¹³','']]),
   'pH 1,53');

  ep(5,'Ácido ascórbico a pH 3',st('Ka₁ = 8,0·10⁻⁵, Ka₂ = 1,6·10⁻¹². Calcule el grado de disociación porcentual de todas las especies a pH 3.'),
   chain(R`D=[\mathrm{H_3O^+}]^2+K_{a1}[\mathrm{H_3O^+}]+K_{a1}K_{a2}=10^{-6}+8\times10^{-8}+1{,}3\times10^{-16}`,R`\alpha_{\mathrm{H_2A}}=92{,}6\,\%\qquad\alpha_{\mathrm{HA^-}}=7{,}4\,\%\qquad\alpha_{\mathrm{A^{2-}}}=1{,}2\times10^{-8}\,\%`)+
   jus('<p>pH 3 &lt; pKa₁ (4,10): predomina la forma sin disociar. El A²⁻ es despreciable (8,8 unidades por debajo de pKa₂) pero no nulo.</p>'),
   'H₂A 92,6 % · HA⁻ 7,4 % · A²⁻ 1,2·10⁻⁸ %');

  ep(6,'Nicotina diluida 1:10',st('Nicotina 0,1 M (pKb₁ 4; pKb₂ 10,9) se diluye 1:10. ¿Será básica? Calcular el pH.'),
   chain(R`C=0{,}01\ \mathrm{M}\qquad K_{b1}=10^{-4}`)+ver('<p>C/Kb₁ = 100: al límite; la aproximación da x = 10⁻³ (10 % de C) → no vale, cuadrática.</p>',false)+
   chain(R`x=\frac{-10^{-4}+\sqrt{10^{-8}+4\cdot10^{-6}}}{2}=9{,}5\times10^{-4}\ \mathrm{M}`,R`\mathrm{pOH}=3{,}02\Rightarrow\mathrm{pH}=10{,}98`)+jus('<p>La segunda protonación (Kb₂ = 1,3·10⁻¹¹) es despreciable. Es una base: diluida sigue siendo básica.</p>'),
   'Sí, básica: pH 10,98');

  ep(7,'Ácido arsénico 0,2 M',st('Calcule la concentración de todas las especies en H₃AsO₄ 0,2 M. pKa₁ 2,24; pKa₂ 6,93; pKa₃ 11,50.'),
   ver('<p>C/Ka₁ = 35 &lt; 100 → cuadrática para la primera etapa; las otras dos se desprecian para el pH (Ka₂/Ka₁ ≈ 2·10⁻⁵).</p>',false)+
   chain(R`x=0{,}0312\ \mathrm{M}\ (\mathrm{pH}=1{,}51)\qquad[\mathrm{H_3AsO_4}]=0{,}169`,R`[\mathrm{HAsO_4^{2-}}]\approx K_{a2}=1{,}2\times10^{-7}\qquad[\mathrm{AsO_4^{3-}}]=\frac{K_{a3}K_{a2}}{x}=1{,}2\times10^{-17}`)+
   jus('<p>Comparado con el fosfórico 0,2 M (ej. 4): constantes muy parecidas, comportamiento casi idéntico (pH 1,51 vs 1,53).</p>'),
   'pH 1,51');

  ep('d1','Desafío 1 · ácido oxálico',st('Se disuelve 1 g de ácido oxálico dihidratado hasta 2 L. Determinar en qué rango estará el pH. pKa₁ 1,3; pKa₂ 4,3.'),
   chain(R`C=\frac{1/126{,}07}{2}=3{,}97\times10^{-3}\ \mathrm{M}\qquad K_{a1}=0{,}050`)+
   jus('<p>C ≪ Ka₁: la primera disociación es casi completa (dilución: pocos choques efectivos). La segunda (Ka₂ = 5·10⁻⁵) aporta poco. El pH queda entre el de “sólo el primer H, total” (−log C = 2,40) y el de “los dos H totales” (−log 2C = 2,10), muy cerca del primero.</p>')+
   chain(R`\text{planteo completo (BC con las dos etapas)}:\ [\mathrm{H_3O^+}]=3{,}74\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pH}=2{,}43`),
   'pH ≈ 2,4 (entre 2,1 y 2,4)','GUÍA 3 · DESAFÍO 1');

  ep('d2','Desafío 2 · ácido L-ascórbico cosmético',st('H₂A con Ka₁ 8,0·10⁻⁵ y Ka₂ 1,6·10⁻¹² (pKa 4,10 y 11,80).',['Describa el sistema en equilibrio, justificando.','¿Qué especies actúan sobre la piel (pH 4,7–5,7)?','Calcule la concentración de todas las especies en un producto 12,5 % m/v.']),
   step('a) Descripción',desc(rxs(['H2A + H2O <=> HA^- + H3O^+','Ka₁'],['HA^- + H2O <=> A^2- + H3O^+','Ka₂'])+W+chain(R`\text{BM: }C=[\mathrm{H_2A}]+[\mathrm{HA^-}]+[\mathrm{A^{2-}}]\qquad\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{HA^-}]+2[\mathrm{A^{2-}}]+[\mathrm{HO^-}]`))+jus('<p>Diprótico débil: un equilibrio por protón. Ka₂ ≪ Ka₁, así que la segunda disociación es despreciable para el pH.</p>'))+
   step('b) Sobre la piel',table(['pH','H₂A','HA⁻','A²⁻'],[['4,7','20 %','80 %','6·10⁻⁶ %'],['5,7','2,4 %','97,6 %','8·10⁻⁵ %']])+jus('<p>El rango 4,7–5,7 está por encima de pKa₁ y muy lejos de pKa₂: actúa principalmente HA⁻ (y algo de H₂A en el extremo ácido).</p>'))+
   step('c) Producto 12,5 % m/v',chain(R`C=\frac{125\ \mathrm{g/L}}{176{,}12}=0{,}710\ \mathrm{M}`,R`[\mathrm{H_3O^+}]=[\mathrm{HA^-}]=\sqrt{8\times10^{-5}\cdot0{,}710}=7{,}5\times10^{-3}\ (\mathrm{pH}\ 2{,}12)`,R`[\mathrm{H_2A}]=0{,}702\qquad[\mathrm{A^{2-}}]\approx K_{a2}=1{,}6\times10^{-12}\qquad[\mathrm{HO^-}]=1{,}3\times10^{-12}`)+ver('<p>7,5·10⁻³ / 0,710 = 1,1 % ✔</p>')),
   'c) pH 2,12, con 99 % sin disociar','GUÍA 3 · DESAFÍO ASCÓRBICO 1');

  ep('d3','Desafío · ácido nicotínico a pH 2,5',st('40 mL de solución contienen 380 mg de ácido nicotínico (Ka 1,4·10⁻⁵, M 123,11). Se agrega HCl hasta pH 2,5. Calcule la cantidad de HCl 36 % m/m (δ 1,18) para un lote de 40 L.'),
   chain(R`C=\frac{9{,}5\ \mathrm{g/L}}{123{,}11}=0{,}0772\ \mathrm{M}`)+
   jus('<p>No todo el H₃O⁺ viene del HCl: el ácido nicotínico también aporta un poco. Se plantea el BC: [H₃O⁺] = [Cl⁻] + [Nic⁻] (HO⁻ despreciable a pH 2,5).</p>')+
   chain(R`[\mathrm{Nic^-}]=C\,\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=0{,}0772\cdot\frac{1{,}4\times10^{-5}}{1{,}4\times10^{-5}+3{,}16\times10^{-3}}=3{,}4\times10^{-4}\ \mathrm{M}`,R`[\mathrm{Cl^-}]=3{,}16\times10^{-3}-3{,}4\times10^{-4}=2{,}82\times10^{-3}\ \mathrm{M}`,R`n_{\mathrm{HCl}}=2{,}82\times10^{-3}\cdot40=0{,}113\ \mathrm{mol}\to4{,}12\ \mathrm{g}\to\frac{4{,}12}{0{,}36}=11{,}4\ \mathrm{g\ sc}\to9{,}7\ \mathrm{mL}`),
   '≈ 9,7 mL (11,4 g) de HCl 36 %','GUÍA 3 · DESAFÍO ASCÓRBICO 2');

  ep('d4','Ácido maleico disociado 18 % (1.ª disociación)',st('Calcular el pH de una solución de ácido maleico disociado en un 18 % (1.ª disociación). pKa₁ 1,61; pKa₂ 6,33. (Ejercicio manuscrito.)'),
   chain([R`K_{a1}=\frac{\alpha^2C}{1-\alpha}\Rightarrow C=\frac{0{,}0245\cdot0{,}82}{0{,}18^2}=0{,}621\ \mathrm{M}`,'Ostwald'],R`[\mathrm{H_3O^+}]=\alpha C=0{,}112\ \mathrm{M}\Rightarrow\mathrm{pH}=0{,}95`)+jus('<p>La segunda disociación (Ka₂ = 4,7·10⁻⁷) está reprimida por 0,11 M de H₃O⁺: despreciable.</p>'),
   'pH = 0,95','GUÍA 3 · EJERCITACIÓN EXTRA');

  A.addEx('acido-base-2',{group:'g3p',label:'Guía 3 · polipróticos y problemas desafío'},gp);

  // =====================================================================
  const gs=[];const es=(n,title,statement,solution,answer,tag)=>gs.push({id:`g3s-${n}`,tag:tag||`GUÍA 3 · SALES · ${n}`,title,statement,solution,answer});
  const kcn=step('1. Descripción',desc(rxs(['KCN -> K^+ + CN^-','sal: electrolito fuerte'],['CN^- + H2O <=> HCN + HO^-','Kb = Kw/Ka = 1,39·10⁻⁵'])+W)+jus('<p>K⁺ viene del KOH (fuerte): inalterado. CN⁻ es base conjugada del HCN (débil): hidroliza → básica.</p>'))+
   step('2. Desprecios',sup([['[H₃O⁺] ≪ [HCN] en el BC','medio básico.'],['[HCN] ≪ 0,25','Kb chica, C/Kb = 18 000 &gt; 100.']]))+
   step('3. Despeje',chain(R`[\mathrm{HO^-}]=\sqrt{1{,}39\times10^{-5}\cdot0{,}25}=1{,}86\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pOH}=2{,}73\Rightarrow\mathrm{pH}=11{,}27`))+
   step('4. Verificamos',ver('<p>0,75 % de 0,25 ✔</p>'));
  es(1,'KCN 0,25 M',st('Calcule el pH de KCN 0,25 M. Ka (HCN) = 7,20·10⁻¹⁰.'),kcn,'pH = 11,27');
  es(2,'KSCN (Ka HSCN = 70)',st('Se disuelven 4,5682 g de KSCN en 250 mL. Calcule el pH. Ka (HSCN) = 70. (Ejercicio tachado en la guía.)'),
   chain(R`C=\frac{4{,}5682/97{,}18}{0{,}250}=0{,}188\ \mathrm{M}\qquad K_b(\mathrm{SCN^-})=\frac{10^{-14}}{70}=1{,}4\times10^{-16}`)+jus('<p>Ka = 70: el HSCN es un ácido fuerte. Su base conjugada no tiene comportamiento ácido-base apreciable (Kb·C ≪ Kw). K⁺ tampoco. La solución es neutra.</p>'),
   'pH = 7 (neutra)');
  es(3,'Diluir 10 veces NaAc 0,2 M',st('Calcule el cambio de pH al diluir 10 veces NaAc 0,2 M. Ka = 1,8·10⁻⁵.'),
   chain(R`K_b=5{,}56\times10^{-10}`,R`0{,}2\ \mathrm{M}:\ [\mathrm{HO^-}]=\sqrt{K_b\cdot0{,}2}=1{,}05\times10^{-5}\Rightarrow\mathrm{pH}=9{,}02`,R`0{,}02\ \mathrm{M}:\ [\mathrm{HO^-}]=3{,}33\times10^{-6}\Rightarrow\mathrm{pH}=8{,}52`)+jus('<p>Para una base débil [HO⁻] ∝ √C: diluir 10 veces baja el pH sólo ½·log 10 = 0,5. En las dos el agua sigue siendo despreciable (HO⁻ ≥ 3·10⁻⁶ ≫ 10⁻⁷).</p>'),
   'ΔpH = −0,50');
  es(4,'KNO₂ 0,2 M',st('Calcule [HO⁻] y pH de KNO₂ 0,2 M. Ka (HNO₂) = 4,5·10⁻⁴.'),
   chain(R`K_b=\frac{10^{-14}}{4{,}5\times10^{-4}}=2{,}2\times10^{-11}`,R`[\mathrm{HO^-}]=\sqrt{2{,}2\times10^{-11}\cdot0{,}2}=2{,}1\times10^{-6}\ \mathrm{M}\Rightarrow\mathrm{pH}=8{,}32`)+ver('<p>x ≪ 0,2 ✔ · el agua aporta ≈ 5·10⁻⁹ M de HO⁻ (Kw/[HO⁻]): despreciable ✔</p>')+jus('<p>K⁺ viene del KOH (fuerte) y queda inalterado; NO₂⁻ es base conjugada de un ácido débil y genera HO⁻: solución básica. Es razonable suponer [H₃O⁺] baja respecto de [HNO₂] en el BC (medio básico) y [HNO₂] baja respecto de C en el BM (Kb muy chica).</p>'),
   '[HO⁻] = 2,1·10⁻⁶ M · pH 8,32');
  es(5,'Porcentaje de hidrólisis de NaCN 0,1 M',st('Calcule el porcentaje de hidrólisis de NaCN 0,1 M. Ka = 7,2·10⁻¹⁰.'),
   chain(R`[\mathrm{HO^-}]=[\mathrm{HCN}]=\sqrt{1{,}39\times10^{-5}\cdot0{,}1}=1{,}18\times10^{-3}`,R`\%\,h=\frac{1{,}18\times10^{-3}}{0{,}1}\cdot100=1{,}18\,\%`)+jus('<p>Na⁺ inalterado (de NaOH, fuerte); el CN⁻ hidroliza. Es razonable suponer [HCN] baja respecto de C (C/Kb &gt; 100) y [H₃O⁺] baja respecto de [HCN] (medio básico).</p>'),
   '1,18 %');
  es(6,'NaAc de pH 9,3',st('Calcule la concentración de una solución de acetato de sodio de pH 9,3.'),
   chain(R`[\mathrm{HO^-}]=10^{-4{,}7}=2{,}0\times10^{-5}=[\mathrm{HAc}]`,R`C=[\mathrm{Ac^-}]+[\mathrm{HAc}]=\frac{(2{,}0\times10^{-5})^2}{5{,}56\times10^{-10}}+2{,}0\times10^{-5}=0{,}717\ \mathrm{M}`)+jus('<p>Del pH se conoce [HO⁻]; en el BC, [HAc] ≈ [HO⁻] porque es razonable suponer [H₃O⁺] baja respecto de [HAc] (medio básico). La concentración pedida sale del BM con Kb.</p>'),
   'C ≈ 0,72 M');
  es(7,'Ka de HA a partir del pH de KA',st('KA 0,15 M tiene pH 8,5. ¿Cuál es Ka de HA?'),
   chain(R`[\mathrm{HO^-}]=[\mathrm{HA}]=10^{-5{,}5}=3{,}16\times10^{-6}`,R`K_b=\frac{(3{,}16\times10^{-6})^2}{0{,}15}=6{,}7\times10^{-11}\Rightarrow K_a=\frac{K_w}{K_b}=1{,}5\times10^{-4}`)+jus('<p>El K⁺ viene de una base fuerte, así que la basicidad viene sólo del A⁻: [HA] = [HO⁻] (despreciando [H₃O⁺] respecto de [HA], medio básico). Con Kb y Ka·Kb = Kw se obtiene Ka.</p>'),
   'Ka = 1,5·10⁻⁴');
  es(8,'Kb del amoníaco desde el % de hidrólisis',st('NH₄Cl 10⁻³ M está hidrolizado un 0,074 %. ¿Kb del NH₃?'),
   chain(R`[\mathrm{H_3O^+}]=[\mathrm{NH_3}]=7{,}4\times10^{-7}`,R`K_a=\frac{(7{,}4\times10^{-7})^2}{10^{-3}}=5{,}5\times10^{-10}\Rightarrow K_b=1{,}8\times10^{-5}`)+note('Detalle fino','<p>7,4·10⁻⁷ no es ≫ 10⁻⁷: el agua aporta algo de H₃O⁺. Para obtener Ka se usa el NH₃ formado (dato), que sólo viene de la hidrólisis, así que la cuenta es correcta.</p>')+jus('<p>El porcentaje de hidrólisis es la fracción del NH₄⁺ que reaccionó con el agua: [NH₃] = 0,074 %·C. Con Ka del NH₄⁺ y Ka·Kb = Kw se obtiene Kb.</p>'),
   'Kb = 1,8·10⁻⁵');
  es(9,'Cloruro de metilamonio 2,0 M',st('Calcule el pH de CH₃NH₃Cl 2,0 M. pKb (metilamina) = 3,36.'),
   chain(R`K_a=10^{-(14-3{,}36)}=2{,}29\times10^{-11}`,R`[\mathrm{H_3O^+}]=\sqrt{2{,}29\times10^{-11}\cdot2{,}0}=6{,}8\times10^{-6}\Rightarrow\mathrm{pH}=5{,}17`)+jus('<p>Cl⁻ inalterado (de HCl fuerte); CH₃NH₃⁺ ácido conjugado de una base débil → ácida.</p>'),
   'pH = 5,17');
  es(10,'Masa de NH₄NO₃ para pH 5,4',st('¿Cuántos gramos de NH₄NO₃ hay que agregar a 1 L de agua para tener pH 5,4?'),
   chain(R`[\mathrm{H_3O^+}]=[\mathrm{NH_3}]=3{,}98\times10^{-6}`,R`C=\frac{(3{,}98\times10^{-6})^2}{5{,}56\times10^{-10}}+3{,}98\times10^{-6}=0{,}0285\ \mathrm{M}\to2{,}28\ \mathrm{g}`)+jus('<p>El NO₃⁻ no tiene comportamiento ácido-base; el NH₄⁺ fija la acidez. Del BC, [NH₃] ≈ [H₃O⁺] (despreciando [HO⁻] respecto de [NH₃], medio ácido), y del BM y Ka se obtiene C.</p>'),
   '≈ 2,3 g');
  const benzoato=desc(rxs(['NH4C7H5O2 -> NH4^+ + C7H5O2^-','total'],['NH4^+ + H2O <=> NH3 + H3O^+','Ka = Kw/Kb = 5,6·10⁻¹⁰'],['C7H5O2^- + H2O <=> C7H5O2H + HO^-','Kb = Kw/Ka = 1,6·10⁻¹⁰'])+W)+
   jus('<p>Los dos iones vienen de electrolitos débiles: los dos reaccionan con el agua. Como Ka(NH₄⁺) &gt; Kb(benzoato), la solución será levemente ácida. Si los dos se hidrolizan poco y en igual medida, el H₃O⁺ de uno se combina con el HO⁻ del otro y el pH no depende de C:</p>')+
   chain(R`\mathrm{pH}=\tfrac12\left(\mathrm{p}K_w+\mathrm{p}K_a(\text{benzoico})-\mathrm{p}K_b(\mathrm{NH_3})\right)=\tfrac12(14+4{,}20-4{,}74)=6{,}73`);
  es(11,'Benzoato de amonio 10⁻² M',st('Calcule el pH. Ka (ácido benzoico) = 6,3·10⁻⁵; Kb (amoníaco) = 1,8·10⁻⁵.'),benzoato,'pH = 6,73');
  es(12,'Cianuro de amonio 0,3 M',st('Calcule [HO⁻]. Ka (HCN) = 7,2·10⁻¹⁰; Kb (NH₃) = 1,8·10⁻⁵.'),
   chain(R`\mathrm{pH}=\tfrac12(14+9{,}14-4{,}74)=9{,}20\Rightarrow[\mathrm{HO^-}]=1{,}6\times10^{-5}\ \mathrm{M}`)+jus('<p>Kb(CN⁻) = 1,4·10⁻⁵ ≫ Ka(NH₄⁺) = 5,6·10⁻¹⁰: predomina la hidrólisis del cianuro → básica.</p>'),
   '[HO⁻] = 1,6·10⁻⁵ M (pH 9,20)');

  es('f','Desafío · ácido fólico (pKa₁ 2,3; pKa₂ 8,3)',st('Considerando que en sangre (pH 7,4) se comporta como en agua:',['1a) Describa el sistema en equilibrio.','1b) ¿Qué especies son despreciables a pH fisiológico?','1c) Concentración de todas las especies a pH 7,4.','2) Jugo gástrico pH 1, 1,5–2 L por día; dosis 5 mg. ¿Afecta el pH del estómago?','3a) Carácter ácido-base de las sales de sodio del ácido fólico.','3b) Magnitud de las disociaciones del folato de sodio a pH 7,4.','3c) [folato] en el estómago luego de un comprimido.']),
   step('1a) Descripción',desc(rxs(['H2Fol + H2O <=> HFol^- + H3O^+','Ka₁ = 5,0·10⁻³'],['HFol^- + H2O <=> Fol^2- + H3O^+','Ka₂ = 5,0·10⁻⁹'])+W))+
   step('1b) y 1c) Especiación a pH 7,4',chain(R`D=[\mathrm{H_3O^+}]^2+K_{a1}[\mathrm{H_3O^+}]+K_{a1}K_{a2}\qquad[\mathrm{H_3O^+}]=3{,}98\times10^{-8}`,R`\alpha_{\mathrm{H_2Fol}}=7{,}1\times10^{-6}\qquad\alpha_{\mathrm{HFol^-}}=0{,}888\qquad\alpha_{\mathrm{Fol^{2-}}}=0{,}112`)+jus('<p>pH 7,4 está 5 unidades por encima de pKa₁: el H₂Fol es despreciable (no nulo). Predomina HFol⁻ con algo de Fol²⁻ (7,4 está 0,9 por debajo de pKa₂). Como no se da la concentración total, se informan las fracciones: [especie] = α·C.</p>'))+
   step('2) Estómago',chain(R`n=\frac{5\times10^{-3}}{441{,}4}=1{,}1\times10^{-5}\ \mathrm{mol}\qquad n_{\mathrm{H_3O^+}}=0{,}1\cdot1{,}5=0{,}15\ \mathrm{mol}`)+jus('<p>El ácido fólico es débil y su cantidad es 10⁴ veces menor que el H₃O⁺ del jugo gástrico; además, a pH 1 está reprimido (ion común). No cambia el pH.</p>'))+
   step('3a) Sales de sodio',table(['Sal','Comportamiento','Carácter'],[['NaHFol','anfiprótico: Ka₂ = 5·10⁻⁹ vs Kb₂ = Kw/Ka₁ = 2·10⁻¹² → gana el ácido','levemente ácida (pH ≈ ½(2,3 + 8,3) = 5,3)'],['Na₂Fol','Fol²⁻ base: Kb₁ = Kw/Ka₂ = 2·10⁻⁶','básica']]))+
   step('3b) A pH 7,4',jus('<p>Las fracciones no dependen de qué sal se disolvió: el pH fija la especiación. Predomina HFol⁻ (89 %) con Fol²⁻ (11 %).</p>'))+
   step('3c) Folato en el estómago',chain(R`C\approx\frac{1{,}1\times10^{-5}}{1{,}5\text{ a }2\ \mathrm{L}}=5{,}7\text{ a }7{,}6\times10^{-6}\ \mathrm{M}`,R`\alpha_{\mathrm{Fol^{2-}}}(\mathrm{pH}\ 1)=\frac{K_{a1}K_{a2}}{D}=2{,}4\times10^{-9}\Rightarrow[\mathrm{Fol^{2-}}]\approx1{,}4\text{ a }1{,}8\times10^{-14}\ \mathrm{M}`)),
   'A pH 7,4: HFol⁻ 89 % y Fol²⁻ 11 %; en el estómago el folato es despreciable','GUÍA 3 · DESAFÍO ÁCIDO FÓLICO');

  window.ET27_QAC5.shared=Object.assign(window.ET27_QAC5.shared||{},{kcn,benzoato});
  A.addEx('acido-base-2',{group:'g3s',label:'Guía 3 · sales (hidrólisis) y desafío del ácido fólico'},gs);
})();
