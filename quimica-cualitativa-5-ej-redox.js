// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS Y EVALUACIONES · Redox
// Guía 4 (20–26), Integración 1 punto 4, Integración 2 punto 2 b y c, Examen E8 punto 5, Examen E9 punto 3.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,flow}=A;
  const R=String.raw;

  const bismutato=step('Hemirreacciones (medio ácido)',rxs(['NaBiO3 + 6 H^+ + 2 e^- -> Bi^3+ + Na^+ + 3 H2O','reducción (Bi +5 → +3)'],['Mn^2+ + 4 H2O -> MnO4^- + 8 H^+ + 5 e^-','oxidación (Mn +2 → +7)']))+
   step('× 5 y × 2, sumar',rx('2 Mn^2+ + 5 NaBiO3 + 14 H^+ -> 2 MnO4^- + 5 Bi^3+ + 5 Na^+ + 7 H2O','n = 10'))+
   step('Control',`<p>Mn 2 · Bi 5 · Na 5 · O 15 = 8 + 7 · H 14 = 14 · carga 4 + 14 = 18 = −2 + 15 + 5 ✓</p>`);
  const g=[];const e=(n,title,statement,solution,answer)=>g.push({id:`r-g4-${n}`,tag:`GUÍA 4 · EJ. ${n}`,title,statement,solution,answer});
  e(20,'K entre estaño metálico y dicromato',st('Medio ácido. E° Cr₂O₇²⁻|Cr³⁺ = 1,33 V; E° Sn⁴⁺|Sn(s) = −0,009 V.'),
   step('Reacción balanceada',rxs(['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O','× 2'],['Sn -> Sn^4+ + 4 e^-','× 3'],['2 Cr2O7^2- + 28 H^+ + 3 Sn -> 4 Cr^3+ + 3 Sn^4+ + 14 H2O','n = 12 (mcm de 6 y 4)']))+
   step('Constante',chain(R`E^\circ=1{,}33-(-0{,}009)=1{,}339\ \mathrm{V}`,R`\log K=\frac{12\cdot1{,}339}{0{,}0592}=271\Rightarrow K\approx10^{271}`)+jus('<p>n es el total de electrones intercambiados en la ecuación global (12), no los de una hemirreacción. K enorme: reacción prácticamente completa.</p>')),
   'K ≈ 10²⁷¹');
  e(21,'Fe y Sn: potencial de la reacción',st('Calcular el potencial de la reacción en que el ion hierro se reduce a hierro metálico con estaño, con [Fe²⁺] = 0,300 M y [Sn²⁺] = 0,500 M. E° Fe²⁺|Fe = −0,440 V; E° Sn²⁺|Sn = −0,136 V.'),
   rx('Fe^2+ + Sn -> Fe + Sn^2+','n = 2')+chain(R`E^\circ=-0{,}440-(-0{,}136)=-0{,}304\ \mathrm{V}`,R`E=E^\circ-\frac{0{,}0592}{2}\log\frac{[\mathrm{Sn^{2+}}]}{[\mathrm{Fe^{2+}}]}=-0{,}304-0{,}0296\log\frac{0{,}500}{0{,}300}=-0{,}311\ \mathrm{V}`)+
   jus('<p>E &lt; 0: tal como está escrita <b>no es espontánea</b>. Ocurre la inversa: el Fe (E° más negativo, mejor reductor) reduce al Sn²⁺.</p>'),'E = −0,311 V (no espontánea)');
  e(22,'Pila Pb | PbSO₄ | Na₂SO₄ ‖ Cr₂O₇²⁻, Cr³⁺, H₃O⁺ | Pt',st('Concentraciones: Na₂SO₄ 0,300 M; Cr₂O₇²⁻ 0,160 M; Cr³⁺ 0,270 M; H₃O⁺ 0,400 M. E° Pb²⁺|Pb = −0,126 V; E° Cr₂O₇²⁻|Cr³⁺ = 1,33 V.',['¿Funcionaría en medio básico?','¿Cuál es el potencial de la pila?']),
   step('Ánodo: el Pb²⁺ libre lo fija el Kps',jus('<p>No se da el Kps del PbSO₄: usamos 2,2·10⁻⁸ (el de la guía de complejos).</p>')+chain(R`[\mathrm{Pb^{2+}}]=\frac{K_{ps}}{[\mathrm{SO_4^{2-}}]}=\frac{2{,}2\times10^{-8}}{0{,}300}=7{,}3\times10^{-8}\ \mathrm{M}`,R`E_{\text{án}}=-0{,}126+\frac{0{,}0592}{2}\log(7{,}3\times10^{-8})=-0{,}337\ \mathrm{V}`))+
   step('Cátodo',chain(R`E_{\text{cát}}=1{,}33-\frac{0{,}0592}{6}\log\frac{[\mathrm{Cr^{3+}}]^2}{[\mathrm{Cr_2O_7^{2-}}][\mathrm{H_3O^+}]^{14}}=1{,}33-\frac{0{,}0592}{6}\log\frac{0{,}270^2}{0{,}160\cdot0{,}400^{14}}=1{,}278\ \mathrm{V}`))+
   step('b) Pila',chain(R`E=1{,}278-(-0{,}337)=1{,}62\ \mathrm{V}`))+
   step('a) Medio básico',jus('<p>No funcionaría como está escrita: el H₃O⁺ es reactivo de la reducción del dicromato (aparece a la 14 en Nernst), así que al bajar [H₃O⁺] el potencial del cátodo cae muchísimo. Además, en medio básico el dicromato pasa a cromato (CrO₄²⁻) y el Cr³⁺ precipita como Cr(OH)₃: cambian las especies de la hemirreacción.</p>')),
   'b) ≈ 1,62 V (con Kps PbSO₄ 2,2·10⁻⁸) · a) no');
  e(23,'Pila de dicromato y permanganato',st('Pt | Cr³⁺ (0,125 M), Cr₂O₇²⁻ (0,200 M), H₃O⁺ (0,600 M) ‖ MnO₄⁻ (0,150 M), Mn²⁺ (0,400 M), H₃O⁺ (0,250 M) | Pt. E° 1,33 y 1,51 V.'),
   chain(R`E_{\text{án}}=1{,}33-\frac{0{,}0592}{6}\log\frac{0{,}125^2}{0{,}200\cdot0{,}600^{14}}=1{,}310\ \mathrm{V}`,R`E_{\text{cát}}=1{,}51-\frac{0{,}0592}{5}\log\frac{0{,}400}{0{,}150\cdot0{,}250^{8}}=1{,}448\ \mathrm{V}`,R`E_{\text{pila}}=1{,}448-1{,}310=0{,}138\ \mathrm{V}`)+
   jus('<p>Cada electrodo se calcula con Nernst escrito como reducción y con su propio n (6 y 5); luego E = E<sub>cát</sub> − E<sub>án</sub>. Es lo mismo que usar el n global (30) con el Q global.</p>'),'E = 0,138 V');
  e(24,'Kps del AgCl a partir de potenciales',st('Exprese el Kps del AgCl en función de E° AgCl|Ag (0,22 V) y E° Ag⁺|Ag (0,80 V) y calcúlelo.'),
   rxs(['AgCl(s) + e^- -> Ag(s) + Cl^-','E°₁ = 0,22'],['Ag(s) -> Ag^+ + e^-','−E°₂ = −0,80'],['AgCl(s) <=> Ag^+ + Cl^-','suma: K = Kps, E° = E°₁ − E°₂'])+
   chain(R`\log K_{ps}=\frac{1\cdot(E^\circ_{\mathrm{AgCl/Ag}}-E^\circ_{\mathrm{Ag^+/Ag}})}{0{,}0592}=\frac{0{,}22-0{,}80}{0{,}0592}=-9{,}80`,R`K_{ps}=1{,}6\times10^{-10}`),'Kps = 1,6·10⁻¹⁰');
  e(25,'Kf del Zn(CN)₄²⁻ a partir de una pila',st('Zn | Zn(CN)₄²⁻ (0,450 M), CN⁻ (0,265 M) ‖ Zn²⁺ (3,84·10⁻⁴ M) | Zn. Se mide 0,099 V. Calcular Kf.'),
   jus('<p>Es una pila de concentración: el mismo par Zn²⁺/Zn a los dos lados (E° = 0). El cátodo es el de mayor [Zn²⁺] (derecha); en el ánodo el Zn²⁺ libre es muy chico porque está complejado.</p>')+
   chain(R`E=\frac{0{,}0592}{2}\log\frac{[\mathrm{Zn^{2+}}]_{\text{cát}}}{[\mathrm{Zn^{2+}}]_{\text{án}}}\Rightarrow\log\frac{3{,}84\times10^{-4}}{[\mathrm{Zn^{2+}}]_{\text{án}}}=\frac{2\cdot0{,}099}{0{,}0592}=3{,}34`,R`[\mathrm{Zn^{2+}}]_{\text{án}}=1{,}74\times10^{-7}\ \mathrm{M}`,R`K_f=\frac{[\mathrm{Zn(CN)_4^{2-}}]}{[\mathrm{Zn^{2+}}][\mathrm{CN^-}]^4}=\frac{0{,}450}{1{,}74\times10^{-7}\cdot0{,}265^4}=5{,}3\times10^{8}`),'Kf ≈ 5·10⁸');
  e(26,'Pila Ce⁴⁺/Ce³⁺ frente a plata con cloruro',st('100 mL Ce⁴⁺ 2,5·10⁻² M + 100 mL Ce³⁺ 2,5·10⁻³ M llevados a 250 mL (pH 2), con Pt. Otra hemicelda: 100 mL AgNO₃ 10⁻³ M + 100 mL HCl 0,1 M, con Ag.',['Describa la pila y el sentido de la corriente.','Masa de nitrato de mercurio a agregar a la hemicelda de plata para que la corriente sea despreciable.']),
   step('Hemicelda de cerio',chain(R`[\mathrm{Ce^{4+}}]=\frac{2{,}5}{250}=0{,}010\qquad[\mathrm{Ce^{3+}}]=0{,}0010`,[R`E=1{,}61+0{,}0592\log\frac{0{,}010}{0{,}0010}=1{,}67\ \mathrm{V}`,'E° Ce⁴⁺/Ce³⁺ ≈ 1,61 V de tabla']))+
   step('Hemicelda de plata',jus('<p>Al mezclar precipita AgCl (Q ≫ Kps). Sobra Cl⁻ (ion común) y la Ag⁺ libre la fija el Kps.</p>')+chain(R`[\mathrm{Cl^-}]=\frac{10-0{,}1}{200}=0{,}0495\ \mathrm{M}\Rightarrow[\mathrm{Ag^+}]=\frac{1{,}8\times10^{-10}}{0{,}0495}=3{,}6\times10^{-9}`,R`E=0{,}80+0{,}0592\log(3{,}6\times10^{-9})=0{,}30\ \mathrm{V}`))+
   step('a) La pila',jus('<p>Cátodo: Pt en Ce⁴⁺/Ce³⁺ (Ce⁴⁺ + e⁻ → Ce³⁺). Ánodo: Ag (Ag + Cl⁻ → AgCl + e⁻). E = 1,67 − 0,30 = 1,37 V. Los electrones van por el cable de la plata al platino; la corriente convencional, al revés.</p>'))+
   step('b) ¿Corriente despreciable?',jus('<p>Haría falta E<sub>Ag</sub> = E<sub>Ce</sub> = 1,67 V. Agregar Hg²⁺ secuestra Cl⁻ (forma HgCl₂ / HgCl₄²⁻ muy estables) y libera Ag⁺; pero aun con <b>toda</b> la plata libre (5·10⁻⁴ M) el potencial máximo sería 0,80 + 0,0592·log(5·10⁻⁴) = 0,60 V. <b>No es posible</b> igualar los potenciales: ninguna masa de nitrato de mercurio logra corriente nula.</p>')),
   'a) E ≈ 1,37 V, cátodo Ce · b) imposible');
  A.addEx('redox',{group:'rg4',label:'Guía 4 · redox (ejercicios 20 a 26)'},g);

  const ev=[];const ee=(id,tag,title,statement,solution,answer)=>ev.push({id,tag,title,statement,solution,answer});
  ee('int1-4','GUÍA 4 · INTEGRACIÓN 1 · PUNTO 4','Identificación de manganeso con bismutato',st('El voltímetro marca 0,23 V. A) ¿Está en equilibrio? B) Calcule la constante de equilibrio.'),
   step('A)',jus('<p><b>No.</b> Hay diferencia de potencial (0,23 V ≠ 0): la reacción sigue avanzando. En el equilibrio E = 0 y Q = K.</p>'))+bismutato+
   step('B) K',jus('<p>Con E° de tabla: BiO₃⁻/Bi³⁺ ≈ 1,80 V y MnO₄⁻/Mn²⁺ = 1,51 V (usá los valores de tu tabla).</p>')+chain(R`\log K=\frac{10\cdot(1{,}80-1{,}51)}{0{,}0592}=49\Rightarrow K\approx10^{49}`)),'A) no · B) K ≈ 10⁴⁹');
  ee('int2-2bc','GUÍA 4 · INTEGRACIÓN 2 · PUNTO 2 b y c','Hg²⁺ con cloruro estañoso (precipitado negro)',st('Al Hg²⁺ sin complejar se agrega SnCl₂ hasta que el potencial medido es 0,23 V; aparece un precipitado negro. b) ¿Está en equilibrio? c) Constante de equilibrio.'),
   step('b)',jus('<p>No: E = 0,23 V ≠ 0.</p>'))+step('Reacción',rx('Hg^2+ + Sn^2+ -> Hg(l) + Sn^4+','n = 2; el Hg finamente dividido se ve negro'))+
   step('c)',chain(R`E^\circ=E^\circ_{\mathrm{Hg^{2+}/Hg}}-E^\circ_{\mathrm{Sn^{4+}/Sn^{2+}}}=0{,}85-0{,}15=0{,}70\ \mathrm{V}`,R`\log K=\frac{2\cdot0{,}70}{0{,}0592}=23{,}6\Rightarrow K\approx4\times10^{23}`)),'b) no · c) K ≈ 4·10²³');
  ee('e8-5','EXAMEN E8 · PUNTO 5','Ni²⁺ + granalla de zinc',st('A NiCl₂ 0,2 M se agrega una granalla de zinc. Calcule la constante de equilibrio.'),
   rx('Ni^2+ + Zn -> Ni + Zn^2+','n = 2')+chain(R`E^\circ=-0{,}25-(-0{,}76)=0{,}51\ \mathrm{V}`,R`\log K=\frac{2\cdot0{,}51}{0{,}0592}=17{,}2\Rightarrow K=1{,}7\times10^{17}`)+jus('<p>K no depende de las concentraciones (0,2 M no se usa): es una constante. Reacción prácticamente completa.</p>'),'K ≈ 1,7·10¹⁷');
  ee('e9-3','EXAMEN E9 · PUNTO 3','Identificación de Mn con bismutato',st('a) Escriba y balancee la reacción. b) Justifique cuál hemirreacción tiene mayor potencial estándar de reducción.'),
   bismutato+step('b)',jus('<p>La reacción es espontánea en ese sentido: el bismutato oxida al Mn²⁺ hasta MnO₄⁻. Para que eso ocurra, el par del oxidante (BiO₃⁻/Bi³⁺) tiene que tener <b>mayor E° de reducción</b> que MnO₄⁻/Mn²⁺ (1,51 V): E°pila = E°cát − E°án &gt; 0.</p>')),'E°(BiO₃⁻/Bi³⁺) &gt; E°(MnO₄⁻/Mn²⁺)');
  A.addEx('redox',{group:'rev',label:'Integración y evaluaciones de redox',kicker:'EVALUACIONES RESUELTAS'},ev);
})();
