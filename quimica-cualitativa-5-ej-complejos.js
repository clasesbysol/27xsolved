// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS Y EVALUACIONES · Complejos
// Guía 2 (8 y 17), Guía 4 (11–16, 18, 19), Ejercicios de complejos 2024 (1–17), Integraciones y exámenes E8 y E9.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,flow}=A;
  const R=String.raw;
  const SH=window.ET27_QAC5.shared||{};
  const patron=sup([['Todo el metal está como complejo','Kf muy grande y ligando en exceso: el equilibrio está totalmente desplazado hacia el complejo.'],['Ligando libre = total − n·(metal)','lo que devuelve la disociación es del orden del metal libre, despreciable.']]);

  const S={};
  S.c1=step('Mezcla (volúmenes iguales: concentraciones a la mitad)',chain(R`C_{\mathrm{Hg}}=1\times10^{-3}\ \mathrm{M}`,R`\text{a) }C_{\mathrm{I}}=1\times10^{-2}\qquad\text{b) }C_{\mathrm{I}}=1\times10^{-3}`))+
   step('a) Exceso de ligando',rx('Hg^2+ + 4 I^- <=> [HgI4]^2-','Kf = 5·10²⁹')+patron+chain(R`[\mathrm{HgI_4^{2-}}]=1\times10^{-3}\qquad[\mathrm{I^-}]=10^{-2}-4\cdot10^{-3}=6\times10^{-3}`,R`[\mathrm{Hg^{2+}}]=\frac{10^{-3}}{5\times10^{29}\cdot(6\times10^{-3})^4}=1{,}54\times10^{-24}\ \mathrm{M}`)+ver('<p>1,5·10⁻²⁴ ≪ 10⁻³ ✔ · [K⁺] = 10⁻², [NO₃⁻] = 2·10⁻³ (espectadores)</p>'))+
   step('b) El ligando es limitante (falta I⁻)',jus('<p>Se necesitan 4·10⁻³ M de I⁻ y hay 10⁻³: limita el ligando. Ahora lo despreciable es el I⁻ libre.</p>')+chain(R`[\mathrm{HgI_4^{2-}}]=\frac{10^{-3}}{4}=2{,}5\times10^{-4}\qquad[\mathrm{Hg^{2+}}]=10^{-3}-2{,}5\times10^{-4}=7{,}5\times10^{-4}`,R`[\mathrm{I^-}]=\sqrt[4]{\frac{2{,}5\times10^{-4}}{5\times10^{29}\cdot7{,}5\times10^{-4}}}=2{,}86\times10^{-8}\ \mathrm{M}`)+ver('<p>2,9·10⁻⁸ ≪ 10⁻³ ✔</p>'))+rta('a) [I⁻] 6·10⁻³; [HgI₄²⁻] 1·10⁻³; [Hg²⁺] 1,54·10⁻²⁴ · b) 2,5·10⁻⁴; 7,5·10⁻⁴; 2,86·10⁻⁸');
  S.c2=patron+chain(R`[\mathrm{Ag(NH_3)_2^+}]=0{,}01\qquad[\mathrm{NH_3}]=0{,}1-0{,}02=0{,}08`,R`K_f=\frac{0{,}01}{9{,}36\times10^{-8}\cdot(0{,}08)^2}=1{,}67\times10^{7}`)+rta('1,67·10⁷');
  S.c3=rxs(['AgCl(s) <=> Ag^+ + Cl^-','Kps'],['Ag^+ + 2 NH3 <=> [Ag(NH3)2]^+','Kf'],['AgCl(s) + 2 NH3 <=> [Ag(NH3)2]^+ + Cl^-','K = Kps·Kf'])+
   jus('<p><b>Será mayor.</b> El NH₃ forma un complejo estable con Ag⁺: baja la [Ag⁺] libre, Q = [Ag⁺][Cl⁻] &lt; Kps y, por Le Châtelier, se disuelve más AgCl hasta un nuevo equilibrio.</p>')+
   note('Con números (Kf de tabla 1,7·10⁷)','<p>Kps = (1,26·10⁻⁵)² = 1,6·10⁻¹⁰ → K = 2,7·10⁻³; '+m(R`\frac{s}{0{,}1-2s}=\sqrt{K}\Rightarrow s=4{,}7\times10^{-3}\ \mathrm{M}`)+': unas 370 veces más que en agua.</p>');
  S.c4=step('Concentraciones al mezclar (750 mL)',chain(R`C_{\mathrm{Zn}}=\frac{1{,}5\times10^{-3}\cdot250}{750}=5\times10^{-4}\qquad C_{\mathrm{CN}}=\frac{1\cdot500}{750}=0{,}667`))+
   step('Complejo',rx('Zn^2+ + 4 CN^- <=> [Zn(CN)4]^2-','Kf = 1·10¹⁸')+patron+chain(R`[\mathrm{Zn(CN)_4^{2-}}]=5\times10^{-4}\qquad[\mathrm{CN^-}]=0{,}667-4\cdot5\times10^{-4}=0{,}665`,R`[\mathrm{Zn^{2+}}]=\frac{5\times10^{-4}}{10^{18}\cdot0{,}665^4}=2{,}56\times10^{-21}\ \mathrm{M}`)+ver('<p>✔ Hidrólisis del CN⁻ despreciada, como indica el enunciado.</p>'))+rta('5·10⁻⁴; 0,665; 2,56·10⁻²¹');
  S.c5=chain(R`C_{\mathrm{Ni}}=0{,}75\ \mathrm{M}\qquad C_{\mathrm{CN}}=1{,}2\times10^{-4}\ \mathrm{M}`)+jus('<p>Para [Ni(CN)₄]²⁻ hacen falta 4 CN⁻ por Ni: <b>limita el ligando</b> (metal en exceso). Se forma todo el complejo que permite el cianuro y el CN⁻ libre queda despreciable.</p>')+
   chain(R`[\mathrm{Ni(CN)_4^{2-}}]=\frac{1{,}2\times10^{-4}}{4}=3\times10^{-5}\qquad[\mathrm{Ni^{2+}}]=0{,}75-3\times10^{-5}\approx0{,}75`,R`[\mathrm{CN^-}]=\sqrt[4]{\frac{3\times10^{-5}}{2\times10^{31}\cdot0{,}75}}=1{,}19\times10^{-9}\ \mathrm{M}`)+ver('<p>1,2·10⁻⁹ ≪ 1,2·10⁻⁴ ✔</p>')+rta('0,75; 3·10⁻⁵; 1,19·10⁻⁹');
  S.c6=patron+chain(R`[\mathrm{en}]_{\text{libre}}=1-3\cdot2\times10^{-3}=0{,}994\ \mathrm{M}`,R`[\mathrm{Co^{3+}}]=\frac{2\times10^{-3}}{4{,}9\times10^{48}\cdot0{,}994^3}=4{,}16\times10^{-52}\ \mathrm{M}`)+rta('4,16·10⁻⁵²');
  S.c7=rx('[Ag(CN)2]^- <=> Ag^+ + 2 CN^-','Ki = 2·10⁻¹⁹')+
   step('a) Complejo solo en agua',jus('<p>Sin exceso de ligando, la Ag⁺ y el CN⁻ libres salen de la disociación: [CN⁻] = 2[Ag⁺].</p>')+chain(R`2\times10^{-19}=\frac{x(2x)^2}{0{,}01}\Rightarrow x=\sqrt[3]{\frac{2\times10^{-21}}{4}}=7{,}94\times10^{-8}\ \mathrm{M}`)+ver('<p>x ≪ 0,01 ✔</p>'))+
   step('b) Con CN⁻ 0,001 M (ion común)',chain(R`[\mathrm{Ag^+}]=\frac{2\times10^{-19}\cdot0{,}01}{(0{,}001)^2}=2\times10^{-15}\ \mathrm{M}`)+jus('<p>El ligando en exceso reprime la disociación del complejo (Le Châtelier): la Ag⁺ libre baja 40 millones de veces.</p>'))+rta('a) 7,94·10⁻⁸ M · b) 2·10⁻¹⁵ M');
  S.c8=rxs(['Ag2S(s) <=> 2 Ag^+ + S^2-','Kps'],['2 Ag^+ + 4 CN^- <=> 2 [Ag(CN)2]^-','Kf²'],['Ag2S(s) + 4 CN^- <=> 2 [Ag(CN)2]^- + S^2-','K = Kps·Kf² = 1,58·10⁻¹²'])+
   chain(R`[\mathrm{Ag(CN)_2^-}]=0{,}2\qquad[\mathrm{S^{2-}}]=0{,}1`,R`[\mathrm{CN^-}]^4=\frac{(0{,}2)^2\cdot0{,}1}{1{,}58\times10^{-12}}\Rightarrow[\mathrm{CN^-}]_{\text{libre}}=224{,}5\ \mathrm{M}\qquad C_{\text{total}}=224{,}5+0{,}4=224{,}9\ \mathrm{M}`)+
   jus('<p><b>Imposible en el laboratorio:</b> el agua pura es ≈ 55 M; ninguna solución puede tener 225 M de cianuro. El Ag₂S es tan insoluble que ni el cianuro lo disuelve.</p>')+rta('224,5 M');
  S.c9=rxs(['PbSO4(s) <=> Pb^2+ + SO4^2-','Kps'],['Pb^2+ + 4 Br^- <=> [PbBr4]^2-','Kf'],['PbSO4(s) + 4 Br^- <=> [PbBr4]^2- + SO4^2-','K = 1,22·10⁶'])+
   chain(R`[\mathrm{PbBr_4^{2-}}]=[\mathrm{SO_4^{2-}}]=\frac{10^{-3}\ \mathrm{mol}}{0{,}150\ \mathrm{L}}=6{,}67\times10^{-3}\ \mathrm{M}`,R`[\mathrm{Br^-}]=\sqrt[4]{\frac{(6{,}67\times10^{-3})^2}{1{,}22\times10^{6}}}=2{,}46\times10^{-3}\ \mathrm{M}`)+jus('<p>Se supone que todo el Pb disuelto está como complejo (Kf grande).</p>')+rta('2,46·10⁻³ M');
  S.c10=rx('AgBr(s) + 2 CN^- <=> [Ag(CN)2]^- + Br^-','K = Kps·Kf = 4,9·10⁹')+chain(R`\frac{s\cdot s}{(10^{-7})^2}=4{,}9\times10^{9}\Rightarrow s=\sqrt{4{,}9\times10^{-5}}=7\times10^{-3}\ \mathrm{M}`)+rta('7·10⁻³ M');
  S.c11=step('Fracciones',chain(R`\alpha_{\mathrm{Zn^{2+}}}=\frac{1}{1+K_f[\mathrm{CN^-}]^4}=\frac{1}{1+4{,}17\times10^{19}\cdot(0{,}002)^4}=1{,}50\times10^{-9}`,R`\alpha_{\mathrm{S^{2-}}}(\mathrm{pH}\ 9)=\frac{K_{a1}K_{a2}}{[\mathrm{H_3O^+}]^2+K_{a1}[\mathrm{H_3O^+}]+K_{a1}K_{a2}}=9{,}9\times10^{-7}`))+
   step('Solubilidad',chain(R`K_{ps}=(s\,\alpha_{\mathrm{Zn}})(s\,\alpha_{\mathrm{S}})\Rightarrow s=\sqrt{\frac{2\times10^{-24}}{1{,}50\times10^{-9}\cdot9{,}9\times10^{-7}}}=3{,}67\times10^{-5}\ \mathrm{M}`)+jus('<p>El cianuro saca Zn²⁺ libre (complejo) y el pH saca S²⁻ libre (protonación): los dos aumentan la solubilidad (Le Châtelier).</p>'))+rta('3,65·10⁻⁵ M');
  S.c12=chain(R`K_f=10^{9{,}7}=5{,}0\times10^{9}\qquad[\mathrm{Ag^+}]=\frac{5\times10^{-4}}{1+K_f\cdot(10^{-2})^3}=1{,}0\times10^{-7}\ \mathrm{M}`,R`[\mathrm{I^-}]=\frac{0{,}035/166{,}0}{1\ \mathrm{L}}=2{,}1\times10^{-4}\ \mathrm{M}\qquad Q=1{,}0\times10^{-7}\cdot2{,}1\times10^{-4}=2{,}1\times10^{-11}`)+
   jus('<p>Q ≫ Kps (10⁻¹⁶): <b>precipita AgI</b>. Aun complejada, queda suficiente Ag⁺ libre para un precipitado tan insoluble.</p>')+rta('Sí');
  S.c13=step('Fracciones',chain(R`\alpha_{\mathrm{Ni^{2+}}}=\frac{1}{1+10^{30}\cdot(10^{-4})^4}=1\times10^{-14}`,R`\alpha_{\mathrm{S^{2-}}}(\mathrm{pH}\ 13)=\frac{10^{-22}}{10^{-26}+10^{-20}+10^{-22}}=9{,}9\times10^{-3}`))+
   step('Solubilidad',chain(R`s=\sqrt{\frac{10^{-19{,}4}}{10^{-14}\cdot9{,}9\times10^{-3}}}=2{,}0\times10^{-2}\ \mathrm{M}`))+
   rta('6,62·10⁻³ M',false,'Con pKa₂ = 15 (dato) sale 2,0·10⁻²; la respuesta impresa se obtiene si pKa₂ fuera 14 (α<sub>S²⁻</sub> ≈ 0,09). Conviene consultarlo con la profe.');
  S.c14=step('a) BaF₂ en buffer de pH 4',chain(R`\alpha_{\mathrm{F^-}}=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=\frac{6{,}31\times10^{-4}}{6{,}31\times10^{-4}+10^{-4}}=0{,}863`,R`K_{ps}=s\,(2s\,\alpha)^2=4\alpha^2s^3\Rightarrow s=\sqrt[3]{\frac{10^{-6}}{4\cdot0{,}863^2}}=6{,}95\times10^{-3}\ \mathrm{M}`,R`\text{sin disolver}=0{,}1-0{,}0070=0{,}093\ \mathrm{mol}`)+jus('<p>Se supone pH constante (solución reguladora) y que el sólido está en exceso (queda sin disolver).</p>'))+
   step('b) CaCl₂ máximo',chain(R`[\mathrm{F^-}]=2s\,\alpha=0{,}0120\ \mathrm{M}\qquad[\mathrm{Ca^{2+}}]_{\max}=\frac{3{,}98\times10^{-11}}{0{,}0120^2}=2{,}8\times10^{-7}\ \mathrm{mol\ (en\ 1\ L)}`))+
   rta('a) 0,0994 mol; b) 2,97·10⁻⁵ mol',false,'Con los datos impresos no coincide: 6·10⁻⁴ mol disueltos darían un Kps del BaF₂ de ≈ 10⁻⁹, no 10⁻⁶. Revisar los datos con la profe.');
  S.c15=rx('AgX(s) + 2 S2O3^2- <=> [Ag(S2O3)2]^3- + X^-','K = Kps·Kf = 10⁻¹²·¹·2,51·10¹³ = 19,9')+
   chain(R`[\mathrm{Ag(S_2O_3)_2^{3-}}]=[\mathrm{X^-}]=\frac{4\times10^{-4}}{0{,}100}=4\times10^{-3}\ \mathrm{M}`,R`[\mathrm{S_2O_3^{2-}}]_{\text{libre}}=\sqrt{\frac{(4\times10^{-3})^2}{19{,}9}}=8{,}96\times10^{-4}\ \mathrm{M}`,R`n_{\text{total}}=(8{,}96\times10^{-4}+2\cdot4\times10^{-3})\cdot0{,}100=8{,}9\times10^{-4}\ \mathrm{mol}\Rightarrow V=\frac{8{,}9\times10^{-4}}{0{,}1}=8{,}9\ \mathrm{mL}`)+rta('8,9 mL');
  S.c16=chain(R`C_{\mathrm{Ag}}=\frac{0{,}01\cdot50}{100}=0{,}005\qquad C_{\mathrm{NH_3}}=0{,}50\ \mathrm{M}`)+patron+chain(R`[\mathrm{NH_3}]=0{,}50-0{,}010=0{,}49`,R`[\mathrm{Ag^+}]=K_i\frac{[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{NH_3}]^2}=5{,}9\times10^{-8}\cdot\frac{0{,}005}{0{,}49^2}=1{,}23\times10^{-9}\ \mathrm{M}`,R`[\mathrm{Cl^-}]_{\max}=\frac{1{,}8\times10^{-10}}{1{,}23\times10^{-9}}=0{,}147\ \mathrm{M}\to0{,}147\cdot0{,}100\cdot58{,}44=0{,}856\ \mathrm{g\ NaCl}`)+
   jus('<p>La constante 5,9·10⁻⁸ es de <b>inestabilidad</b> (chica): la guía 4 la rotula “Kf”, pero por su valor es Ki.</p>','Ojo con el dato')+rta('0,856 g');
  S.c17=chain(R`C_{\mathrm{Fe}}=\frac{1\times10^{-3}\ \mathrm{g/L}}{55{,}85}=1{,}79\times10^{-5}\ \mathrm{M}\qquad[\mathrm{FeSCN^{2+}}]_{\min}=6{,}4\times10^{-6}`)+
   jus('<p>Kf es chica (140): <b>no</b> se puede suponer que todo el hierro se compleja. El Fe³⁺ libre es lo que queda: 1,79·10⁻⁵ − 6,4·10⁻⁶.</p>')+
   chain(R`[\mathrm{SCN^-}]=\frac{6{,}4\times10^{-6}}{140\cdot(1{,}79\times10^{-5}-6{,}4\times10^{-6})}=4{,}0\times10^{-3}\ \mathrm{M}`)+jus('<p>El SCN⁻ unido (6,4·10⁻⁶) es despreciable frente a 4·10⁻³: el total también es ≈ 0,004 M.</p>')+rta('0,004 M');

  // ---------- Guía 2 y Guía 4 ----------
  const g=[];const e=(id,tag,title,statement,solution,answer)=>g.push({id,tag,title,statement,solution,answer});
  e('c-g2-8','GUÍA 2 · EJ. 8','AgNO₃ + HCl concentrado: ¿sirve NaCl?',st('Al agregar HCl concentrado a AgNO₃ 0,1 M aparece un precipitado blanco que luego se disuelve. ¿Se puede reemplazar el HCl por NaCl?'),
   rxs(['Ag^+ + Cl^- <=> AgCl(s)↓','Q > Kps: precipitado blanco'],['AgCl(s) + Cl^- <=> [AgCl2]^-','con mucho Cl⁻: complejo soluble'])+
   jus('<p>La disolución se debe al <b>Cl⁻ en exceso</b> que forma el clorocomplejo (Le Châtelier: baja la Ag⁺ libre y Q &lt; Kps). El H⁺ del HCl no participa. <b>Sí</b> se puede reemplazar por NaCl, siempre que se alcance una [Cl⁻] igual de alta: Na⁺ es espectador.</p>'),'Sí, si se logra la misma [Cl⁻] alta');
  e('c-g2-17','GUÍA 2 · EJ. 17','CuSO₄ con NH₃/NH₄Cl y luego HNO₃',st('a) Esquematice la sucesión de eventos y si el sistema está en equilibrio. b) Justifique los cambios. c) ¿Por qué no hubo cambios con HNO₃?'),SH.cobre||'','Precipita Cu(OH)₂, se disuelve como [Cu(NH₃)₄]²⁺, y el buffer amortigua el HNO₃');
  e('c-g4-11','GUÍA 4 · EJ. 11','AgCl en NH₃ 0,1 M (cualitativo)',st('AgCl tiene s = 1,26·10⁻⁵ M en agua. ¿Cómo cambia la cantidad disuelta en NH₃ 0,1 M?'),S.c3,'Aumenta (complejo + Le Châtelier)');
  e('c-g4-12','GUÍA 4 · EJ. 12','Zn²⁺ con cianuro',st('250 mL de Zn²⁺ 1,5·10⁻³ M + 500 mL de CN⁻ 1 M. Kf = 1·10¹⁸.'),S.c4,'[Zn²⁺] = 2,56·10⁻²¹ M');
  e('c-g4-13','GUÍA 4 · EJ. 13','[Co(en)₃]³⁺',st('Complejo 2·10⁻³ M con etilendiamina 1 M; Kf 4,9·10⁴⁸. [Co³⁺]?'),S.c6,'4,16·10⁻⁵² M');
  e('c-g4-14','GUÍA 4 · EJ. 14','Disolver Ag₂S con cianuro',st('Cianuro total mínimo para disolver 0,1 mol/L de Ag₂S. Kps 6,3·10⁻⁵⁰; Kf [Ag(CN)₂]⁻ 5·10¹⁸.'),S.c8,'224,9 M total: imposible');
  e('c-g4-15','GUÍA 4 · EJ. 15','Disolver PbSO₄ con Br⁻',st('10⁻³ mol de PbSO₄ con 150 mL de sobrenadante. Br⁻ libre mínimo. Kps 2,2·10⁻⁸; Kf [PbBr₄]²⁻ 5,56·10¹³.'),S.c9,'2,46·10⁻³ M');
  e('c-g4-16','GUÍA 4 · EJ. 16','Disolver AgX con tiosulfato',st('4·10⁻⁴ mol de AgX para 100 mL de complejo. Volumen mínimo de Na₂S₂O₃ 0,1 M. Kf 2,51·10¹³; pKps 12,1.'),S.c15,'8,9 mL');
  e('c-g4-18','GUÍA 4 · EJ. 18','NaCl máximo sin precipitar AgCl',st('50 mL AgNO₃ 0,01 M + 50 mL NH₃ 1,00 M. Kps AgCl 1,8·10⁻¹⁰; “Kf” [Ag(NH₃)₂]⁺ 5,9·10⁻⁸.'),S.c16,'0,856 g');
  e('c-g4-19','GUÍA 4 · EJ. 19','SCN⁻ mínimo para ver 1 ppm de Fe³⁺',st('El color de Fe(SCN)²⁺ se ve desde 6,4·10⁻⁶ M. Kf 1,4·10².'),S.c17,'≈ 0,004 M');
  A.addEx('complejos',{group:'cg',label:'Guía 2 y Guía 4 · complejos y equilibrios combinados'},g);

  // ---------- Guía de complejos 2024 ----------
  const c=[];const ec=(n,title,statement,sol,answer,ref)=>{if(!statement&&ref)statement=(g.find(x=>x.id===`c-g4-${ref}`)||{}).statement||'';c.push({id:`c-24-${n}`,tag:`COMPLEJOS 2024 · EJ. ${n}`,title,statement:statement+(ref?`<p class="qacExTag">= Guía 4 · ej. ${ref}</p>`:''),solution:sol,answer})};
  ec(1,'[HgI₄]²⁻: con exceso y con defecto de I⁻',st('Kf 5·10²⁹.',['500 mL Hg(NO₃)₂ 2·10⁻³ M + 500 mL KI 2·10⁻² M.','500 mL Hg(NO₃)₂ 2·10⁻³ M + 500 mL KI 2·10⁻³ M.']),S.c1,'a) [Hg²⁺] 1,54·10⁻²⁴ · b) [I⁻] 2,86·10⁻⁸');
  ec(2,'Kf del complejo de plata',st('AgNO₃ 0,01 M y NH₃ 0,1 M; [Ag⁺] = 9,36·10⁻⁸ M.'),S.c2,'1,67·10⁷');
  ec(3,'AgCl en NH₃ 0,1 M','',S.c3,'Mayor que en agua','11');
  ec(4,'Zn²⁺ y cianuro','',S.c4,'2,56·10⁻²¹ M','12');
  ec(5,'Ni²⁺ en exceso y poco CN⁻',st('500 mL Ni²⁺ 1,5 M + 500 mL CN⁻ 2,4·10⁻⁴ M. Kf 2·10³¹.'),S.c5,'[CN⁻] = 1,19·10⁻⁹ M');
  ec(6,'[Co(en)₃]³⁺','',S.c6,'4,16·10⁻⁵² M','13');
  ec(7,'[Ag(CN)₂]⁻ con y sin exceso de CN⁻',st('Ki global 2·10⁻¹⁹. a) 0,01 M en complejo; b) 0,01 M en complejo y 0,001 M en CN⁻.'),S.c7,'a) 7,94·10⁻⁸ · b) 2·10⁻¹⁵ M');
  ec(8,'Ag₂S con cianuro','',S.c8,'224,5 M (imposible)','14');
  ec(9,'PbSO₄ con Br⁻','',S.c9,'2,46·10⁻³ M','15');
  ec(10,'AgBr con CN⁻ libre 10⁻⁷ M',st('Kps 4,9·10⁻¹³; Kf [Ag(CN)₂]⁻ 1·10²².'),S.c10,'7·10⁻³ M');
  ec(11,'ZnS a pH 9 con CN⁻ 0,002 M',st('Kps 2·10⁻²⁴; pKa HCN 9,31; pKa₁ H₂S 7,0; pKa₂ 15,0; Kf [Zn(CN)₄]²⁻ 4,17·10¹⁹. (El CN⁻ libre es dato.)'),S.c11,'3,7·10⁻⁵ M');
  ec(12,'¿Precipita AgI con plata complejada con etilendiamina?',st('Ag total 5·10⁻⁴ M; en libre 10⁻² M; se agregan 0,035 g de KI a 1 L. pKf = −9,7; pKps AgI = 16.'),S.c12,'Sí');
  ec(13,'NiS con CN⁻ y pH 13',st('CN⁻ libre 10⁻⁴ M; pKps 19,4; pKf [Ni(CN)₄]²⁻ = −30; pKa₁ 7,0; pKa₂ 15,0.'),S.c13,'2,0·10⁻² M (ver nota)');
  ec(14,'BaF₂ en buffer de pH 4 y luego CaCl₂',st('0,1 mol de BaF₂ en 1 L de reguladora de pH 4. Ka HF 6,31·10⁻⁴; Kps BaF₂ 1,0·10⁻⁶; Kps CaF₂ 3,98·10⁻¹¹.',['Moles de BaF₂ sin disolver.','Moles máximos de CaCl₂ sin precipitar CaF₂.']),S.c14,'a) 0,093 mol · b) 2,8·10⁻⁷ mol (ver nota)');
  ec(15,'AgX con tiosulfato','',S.c15,'8,9 mL','16');
  ec(16,'NaCl máximo con plata amoniacal','',S.c16,'0,856 g','18');
  ec(17,'SCN⁻ mínimo para 1 ppm de Fe³⁺','',S.c17,'0,004 M','19');
  A.addEx('complejos',{group:'c24',label:'Ejercicios de complejos (2024)',intro:'<p>Los que coinciden con la Guía 4 lo indican. Se coteja con la respuesta impresa de cada uno.</p>'},c);

  // ---------- Integraciones y exámenes ----------
  const ev=[];const ee=(id,tag,title,statement,solution,answer)=>ev.push({id,tag,title,statement,solution,answer});
  const agKI=chain(R`[\mathrm{NH_3}]_{\text{libre}}=0{,}1-2\cdot10^{-3}=0{,}098\ \mathrm{M}`,R`[\mathrm{Ag^+}]=\frac{10^{-3}}{1{,}6\times10^{7}\cdot0{,}098^2}=6{,}5\times10^{-9}\ \mathrm{M}`,R`Q_{\mathrm{AgI}}=6{,}5\times10^{-9}\cdot10^{-2}=6{,}5\times10^{-11}\gg K_{ps}=8{,}52\times10^{-17}`)+
   jus('<p><b>Precipita AgI</b> (amarillo): aunque la plata esté complejada, su Kps es tan chico que la poca Ag⁺ libre alcanza. Se desprecia la protonación del NH₃: con Kb = 1,8·10⁻⁵ sólo el 1,4 % pasa a NH₄⁺.</p>');
  ee('int1-1','GUÍA 4 · INTEGRACIÓN 1 · PUNTO 1','Identificación de Ag⁺ con HNO₃ y con KI',st('A) Justifique cualitativamente la identificación con HNO₃. B) Justifique cuantitativamente la identificación con KI: Ag total 10⁻³ M, NH₃ total 10⁻¹ M, KI total 10⁻² M. Kf 1,6·10⁷; Kps AgI 8,52·10⁻¹⁷; Kb 1,8·10⁻⁵.'),
   step('A) HNO₃',rxs(['NH3 + H3O^+ -> NH4^+ + H2O'],['[Ag(NH3)2]^+ + Cl^- + 2 H3O^+ -> AgCl(s)↓ + 2 NH4^+ + 2 H2O'])+jus('<p>El H₃O⁺ protona el NH₃ libre; por Le Châtelier el complejo se disocia, aumenta la Ag⁺ libre y con el Cl⁻ presente Q &gt; Kps: reaparece el AgCl blanco. K global ≈ 10²¹.</p>'))+step('B) KI',patron+agKI),'A) reprecipita AgCl · B) precipita AgI');
  ee('int1-2','GUÍA 4 · INTEGRACIÓN 1 · PUNTO 2','¿Precipita Cu(OH)₂ con NH₃ 5·10⁻³ M?',st('Cu total 10⁻⁴ M, NH₃ total 5·10⁻³ M. Kps Cu(OH)₂ 4,8·10⁻¹⁶; Kf 1,1·10¹³; Kb 1,8·10⁻⁵.'),
   patron+chain(R`[\mathrm{NH_3}]=5\times10^{-3}-4\cdot10^{-4}=4{,}6\times10^{-3}`,R`[\mathrm{Cu^{2+}}]=\frac{10^{-4}}{1{,}1\times10^{13}\cdot(4{,}6\times10^{-3})^4}=2{,}0\times10^{-8}\ \mathrm{M}`,R`[\mathrm{HO^-}]=\sqrt{K_b[\mathrm{NH_3}]}=2{,}9\times10^{-4}\ \mathrm{M}`,R`Q=2{,}0\times10^{-8}\cdot(2{,}9\times10^{-4})^2=1{,}7\times10^{-15}>K_{ps}`)+
   jus('<p><b>Sí precipita</b> (por poco): con tan poco NH₃ el complejo deja demasiado Cu²⁺ libre. Por eso en la marcha se usa amoníaco <b>concentrado</b> (ver E9 punto 2c).</p>'),'Sí, precipita');
  ee('int2-1ce','GUÍA 4 · INTEGRACIÓN 2 · PUNTO 1 c, d y e','Pigmentos: NH₃ 0,1 M + NH₄Cl 0,75 M',st('Pb total 4·10⁻⁴ M y Cu 2·10⁻² M. c) ¿Qué ocurre y qué sistema se establece? d) Despreciando el precipitado, NH₃ libre. e) ¿Es correcto despreciar el precipitado?'),
   step('c)',rxs(['Cu^2+ + 4 NH3 <=> [Cu(NH3)4]^2+','azul intenso'],['Pb^2+ + 2 NH3 + 2 H2O -> Pb(OH)2(s)↓ + 2 NH4^+','blanco'])+jus('<p>NH₃/NH₄⁺ es una <b>solución reguladora</b>: pH = 9,26 + log(0,1/0,75) = 8,38. El Cu²⁺ queda en solución como complejo; el Pb²⁺ (no forma complejo amoniacal estable) precipita como hidróxido: así se separan.</p>'))+
   step('d)',patron+chain(R`[\mathrm{NH_3}]_{\text{libre}}=0{,}1-4\cdot0{,}02=0{,}02\ \mathrm{M}`)+ver('<p>[Cu²⁺] libre = 0,02/(1,1·10¹³·0,02⁴) = 1,1·10⁻⁸ ≪ 0,02 ✔</p>'))+
   step('e)',jus('<p>Sí: el Pb²⁺ (4·10⁻⁴ M) es 50 veces menos que el Cu²⁺ y consume ≈ 8·10⁻⁴ M de NH₃ (para dar HO⁻), poco frente a lo que hay; además el buffer repone el HO⁻ consumido.</p>')),'c) buffer pH 8,38; Cu complejado, Pb precipita · d) 0,02 M');
  ee('int2-2a','GUÍA 4 · INTEGRACIÓN 2 · PUNTO 2a','[HgCl₄]²⁻ con KI',st('La muestra disuelta en agua regia da [HgCl₄]²⁻. ¿Habrá reacción al agregar KI?'),
   rx('[HgCl4]^2- + 4 I^- <=> [HgI4]^2- + 4 Cl^-','K = Kf(HgI₄²⁻)/Kf(HgCl₄²⁻) ≈ 5·10²⁹/1·10¹⁵ ≈ 10¹⁴')+jus('<p><b>Sí.</b> El yoduro forma un complejo mucho más estable: el ligando más fuerte desplaza al cloruro (Le Châtelier). Con poco I⁻ puede verse el HgI₂ rojo y con exceso se redisuelve como [HgI₄]²⁻.</p>'),'Sí: intercambio de ligandos (K ≈ 10¹⁴)');
  ee('e8-3','EXAMEN E8 · PUNTO 3','Fe³⁺ con NaCN',st('A FeCl₃ 0,1 M se agrega NaCN 0,1 M para complejar completamente el catión. Calcule [Fe³⁺] en el equilibrio.'),
   rx('Fe^3+ + 6 CN^- <=> [Fe(CN)6]^3-','Kf ≈ 1·10⁴² (tabla)')+jus('<p>Kf altísima → baja disociación: todo el Fe queda complejado. Para complejar completamente hacen falta 6 volúmenes de NaCN por volumen de FeCl₃; tomamos esa relación exacta (sin exceso, el peor caso).</p>')+
   chain(R`[\mathrm{Fe(CN)_6^{3-}}]=\frac{0{,}1}{7}=0{,}0143\ \mathrm{M}`,R`\frac{x\,(6x)^6}{0{,}0143}=10^{-42}\Rightarrow x=[\mathrm{Fe^{3+}}]=1{,}2\times10^{-7}\ \mathrm{M}`)+jus('<p>Con exceso de CN⁻ (ion común), la [Fe³⁺] sería todavía menor.</p>'),'[Fe³⁺] ≈ 10⁻⁷ M (o menor con exceso de CN⁻)');
  ee('e8-4','EXAMEN E8 · PUNTO 4','Agregar KBr al complejo',st('¿Qué ocurre si a la solución del complejo se agrega KBr?'),
   jus('<p><b>Nada apreciable.</b> El Br⁻ es un ligando mucho más débil que el CN⁻ (Kf de FeBr²⁺ del orden de 1 frente a 10⁴²): no desplaza al cianuro. Tampoco forma precipitado (FeBr₃ y KBr son solubles) y el K⁺ es espectador.</p>'),'No hay cambios');
  ee('e9-1','EXAMEN E9 · PUNTO 1','Separación de Ag⁺ y Hg₂²⁺ en el grupo I; Ag⁺ con KI',st('a) Justifique la separación con NH₃. b) Identificación de Ag⁺ con KI: Ag total 10⁻³ M, NH₃ 10⁻¹ M, KI 10⁻² M; Kf 1,6·10⁷; Kps 8,52·10⁻¹⁷.'),
   step('a)',rxs(['AgCl(s) + 2 NH3 <=> [Ag(NH3)2]^+ + Cl^-','K = Kps·Kf ≈ 3·10⁻³: se disuelve'],['Hg2Cl2(s) + 2 NH3 -> Hg(l) + HgNH2Cl(s) + NH4^+ + Cl^-','dismutación: residuo negro'])+jus('<p>El NH₃ disuelve el AgCl porque forma un complejo estable (Le Châtelier sobre el Kps). El Hg₂Cl₂ no se disuelve: dismuta en Hg (negro) y HgNH₂Cl (blanco). La plata queda en la solución y el mercurio en el residuo.</p>'))+step('b)',patron+agKI),'a) AgCl se disuelve, Hg₂Cl₂ ennegrece · b) precipita AgI');
  ee('e9-2','EXAMEN E9 · PUNTO 2','Grupo II con NH₃: Cu, Cd, Bi, Pb',st('a) Reacciones y constantes. b) Descripción de uno de los cationes. c) ¿Precipita Cu(OH)₂ con Cu 10⁻⁴ M, NH₃ 5·10⁻¹ M y NH₄Cl 0,1 M? Kps 4,8·10⁻¹⁶; Kf 1,1·10¹³; Kb 1,8·10⁻⁵.'),
   step('a)',rxs(['Cu^2+ + 4 NH3 <=> [Cu(NH3)4]^2+','Kf'],['Cd^2+ + 4 NH3 <=> [Cd(NH3)4]^2+','Kf'],['Bi^3+ + 3 NH3 + 3 H2O -> Bi(OH)3(s)↓ + 3 NH4^+','Kps de Bi(OH)₃ y Kb'],['Pb^2+ + 2 NH3 + 2 H2O -> Pb(OH)2(s)↓ + 2 NH4^+','Kps de Pb(OH)₂ y Kb']))+
   step('b) Cobre',desc(rxs(['Cu(NO3)2 -> Cu^2+ + 2 NO3^-','total'],['NH3 + H2O <=> NH4^+ + HO^-','Kb'],['Cu^2+ + 4 NH3 <=> [Cu(NH3)4]^2+','Kf'],['Cu^2+ + 2 HO^- <=> Cu(OH)2(s)','Kps']))+chain(R`\text{BM Cu: }C_{\mathrm{Cu}}=[\mathrm{Cu^{2+}}]+[\mathrm{Cu(NH_3)_4^{2+}}]\qquad\text{BM N: }C_{\mathrm{NH_3}}+C_{\mathrm{NH_4^+}}=[\mathrm{NH_3}]+[\mathrm{NH_4^+}]+4[\mathrm{Cu(NH_3)_4^{2+}}]`))+
   step('c)',patron+chain(R`[\mathrm{NH_3}]\approx0{,}5\qquad[\mathrm{Cu^{2+}}]=\frac{10^{-4}}{1{,}1\times10^{13}\cdot0{,}5^4}=1{,}5\times10^{-16}\ \mathrm{M}`,R`[\mathrm{HO^-}]=K_b\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=1{,}8\times10^{-5}\cdot\frac{0{,}5}{0{,}1}=9{,}0\times10^{-5}`,R`Q=1{,}5\times10^{-16}\cdot(9{,}0\times10^{-5})^2=1{,}2\times10^{-24}\ll K_{ps}`)+jus('<p><b>No precipita</b>: con NH₃ concentrado casi todo el cobre está complejado, y el NH₄Cl (ion común) limita el HO⁻.</p>')),'c) No precipita');
  A.addEx('complejos',{group:'cev',label:'Integraciones y evaluaciones de complejos',kicker:'EVALUACIONES RESUELTAS'},ev);
})();
