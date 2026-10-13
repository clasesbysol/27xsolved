// 27xSOLved · Química Analítica Cualitativa 5.º · EVALUACIONES · Ácido-base (E1 a E6)
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,spec,flow}=A;
  const R=String.raw;
  const W=rx('H2O + H2O <=> H3O^+ + HO^-','Kw');
  const SH=window.ET27_QAC5.shared||{};

  // Secuencia del cobre con amoníaco (Guía 2 ej. 17 y Examen E1 punto 2): compartida con Complejos.
  const cobre=step('Paso 1 · CuSO₄ en agua (azul)',desc(rxs(['CuSO4 -> Cu^2+ + SO4^2-','sal soluble: total'],['Cu^2+ + 4 H2O -> [Cu(H2O)4]^2+','acuocomplejo celeste'])))+
   step('Paso 2 · se agrega NH₃/NH₄Cl equimolar: precipitado',rxs(['NH3 + H2O <=> NH4^+ + HO^-','Kb'],['Cu^2+ + 2 HO^- <=> Cu(OH)2(s)','Kps'])+jus('<p>El sistema NH₃/NH₄⁺ equimolar es un buffer (pH ≈ pKa = 9,26). Aporta HO⁻ suficiente para que Q = [Cu²⁺][HO⁻]² supere el Kps: precipita Cu(OH)₂ celeste.</p>'))+
   step('Paso 3 · más NH₃: el precipitado se disuelve (azul intenso)',rxs(['Cu^2+ + 4 NH3 <=> [Cu(NH3)4]^2+','Kf ≈ 10¹³'],['Cu(OH)2(s) + 4 NH3 <=> [Cu(NH3)4]^2+ + 2 HO^-','K = Kps·Kf'])+jus('<p>El NH₃ en exceso forma el complejo, muy estable (Kf grande). Al consumirse Cu²⁺ libre, Q &lt; Kps y por Le Châtelier el Cu(OH)₂ se disuelve.</p>'))+
   step('Paso 4 · 5 gotas de HNO₃ 0,1 M: no hay cambios',rx('NH3 + H3O^+ -> NH4^+ + H2O')+jus('<p>El buffer NH₃/NH₄⁺ consume el H₃O⁺ agregado (cantidad muy chica frente a la del buffer): el pH y la [NH₃] libre casi no cambian, así que el complejo no se destruye.</p>'))+
   step('Balances',chain(R`\text{BM Cu: }C_{\mathrm{Cu}}=[\mathrm{Cu^{2+}}]+[\mathrm{Cu(NH_3)_4^{2+}}]\ (+\ \text{sólido mientras existe})`,R`\text{BM N: }C_{\mathrm{NH_3}}+C_{\mathrm{NH_4Cl}}=[\mathrm{NH_3}]+[\mathrm{NH_4^+}]+4[\mathrm{Cu(NH_3)_4^{2+}}]`,R`\text{BC: }2[\mathrm{Cu^{2+}}]+2[\mathrm{Cu(NH_3)_4^{2+}}]+[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=2[\mathrm{SO_4^{2-}}]+[\mathrm{Cl^-}]+[\mathrm{HO^-}]`))+
   step('¿Equilibrio o fuera de él?',jus('<p>Cada agregado saca al sistema del equilibrio por un instante; después se desplaza (Le Châtelier) hasta un <b>nuevo equilibrio</b>, que siempre se alcanza.</p>'));
  window.ET27_QAC5.shared=Object.assign(window.ET27_QAC5.shared||{},{cobre});

  const ev=[];const e=(id,tag,title,statement,solution,answer)=>ev.push({id,tag,title,statement,solution,answer});

  // ---------------- E1 ----------------
  e('e1-1','EXAMEN E1 · PUNTO 1','HCl diluido + NaCl',st('Una solución de HCl se prepara diluyendo 2,34 mL de ácido 36 % m/m (δ 1,19 g/mL) hasta 250 mL. Si se agregan 10 g de NaCl, ¿cambia el pH? ¿Ácido, básico o neutro?'),
   chain(R`C=\frac{2{,}34\cdot1{,}19\cdot0{,}36/36{,}46}{0{,}250}=0{,}110\ \mathrm{M}\Rightarrow\mathrm{pH}=0{,}96`)+jus('<p>El NaCl se disocia totalmente en Na⁺ y Cl⁻, iones de electrolitos fuertes sin comportamiento ácido-base. El HCl ya está totalmente disociado: no hay equilibrio sobre el que actúe el Cl⁻ común. El pH no cambia y es ácido.</p>'),
   'pH 0,96, no cambia, ácido (igual a Guía 2 ej. 7)');
  e('e1-2','EXAMEN E1 · PUNTO 2','Cobre con amoníaco y cloruro de amonio',st('Explicar mediante los balances: CuSO₄ (azul) + NH₃/NH₄Cl equimolar hasta precipitado; más agregado hasta disolución total (azul intenso); luego 5 gotas de HNO₃ 0,1 M sin cambios.'),cobre,'Precipita Cu(OH)₂, se redisuelve como [Cu(NH₃)₄]²⁺ y el buffer amortigua el HNO₃');
  e('e1-3','EXAMEN E1 · PUNTO 3','Diagrama de especiación del HF',st('Confeccionar el diagrama de especiación del HF: Ka 3,5·10⁻⁴.'),
   chain(R`\mathrm{p}K_a=-\log(3{,}5\times10^{-4})=3{,}46`)+figure(spec([3.46],['HF','F⁻'],{band:[2.46,4.46]}),'Cruce en pH 3,46. Por debajo predomina HF; por encima, F⁻. Ninguna curva llega a 0.')+
   flow([['Dos especies','monoprótico: n + 1 = 2.'],['Cruce','α = 0,5 en pH = pKa = 3,46.'],['pKa ± 1','91 % / 9 %; a pKa ± 2, 99 % / 1 %.']]),
   'pKa 3,46: HF predomina a pH &lt; 3,46 y F⁻ por encima');

  // ---------------- E2 ----------------
  e('e2-1','EXAMEN E2 · PUNTO 1','Ácido fórmico 0,1 M',st('Calcular el pH y la concentración de todas las especies en equilibrio de HCOOH 0,1 M. Ka 1,78·10⁻⁴.'),SH.formico||'','pH 2,37');
  e('e2-2','EXAMEN E2 · PUNTO 2','HCl + ácido acético a pH 2,0',st('¿Por qué una solución de pH 2,0 de HCl y ácido acético puede resolverse despreciando el aporte de acidez del acético? Explicar planteando los balances. Ka = 10⁻⁵.'),
   desc(rxs(['HCl + H2O -> H3O^+ + Cl^-','total'],['HAc + H2O <=> Ac^- + H3O^+','Ka = 10⁻⁵'])+W+chain(R`\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{Ac^-}]+[\mathrm{HO^-}]\qquad\text{BM: }C_{\mathrm{HAc}}=[\mathrm{HAc}]+[\mathrm{Ac^-}]`))+
   jus('<p><b>Ion común (Le Châtelier):</b> el H₃O⁺ del HCl desplaza el equilibrio del acético hacia la izquierda. De Ka: '+m(R`\frac{[\mathrm{Ac^-}]}{[\mathrm{HAc}]}=\frac{K_a}{[\mathrm{H_3O^+}]}=\frac{10^{-5}}{10^{-2}}=10^{-3}`)+': sólo el 0,1 % del acético está disociado. En el BC, [Ac⁻] ≪ [Cl⁻] (y [HO⁻] = 10⁻¹² también) → [H₃O⁺] ≈ [Cl⁻].</p>')+
   ver('<p>Para cualquier C<sub>HAc</sub> comparable con 0,01 M, [Ac⁻] ≈ 10⁻³·C ≪ 0,01 ✔</p>'),
   'Por ion común el acético se disocia ≈ 0,1 %: [Ac⁻] ≪ [Cl⁻] en el BC');

  // ---------------- E3 ----------------
  e('e3-1','EXAMEN E3 · PUNTO 1','KCN 0,25 M',st('Calcule el pH de KCN 0,25 M. Ka (HCN) = 7,20·10⁻¹⁰.'),SH.kcn||'','pH 11,27');
  e('e3-2','EXAMEN E3 · PUNTO 2','Metilamina 35 % diluida',st('Metilamina 35 % m/m (δ 0,85 g/mL); 50 mL se diluyen a 1 L. pH final y concentración de todas las especies.'),SH.metil||'','pH 12,16');
  e('e3-3','EXAMEN E3 · PUNTO 3','Benzoato de amonio 10⁻² M',st('Calcule el pH. Ka (benzoico) = 6,3·10⁻⁵; Kb (NH₃) = 1,8·10⁻⁵.'),SH.benzoato||'','pH 6,73');
  e('e3-4','EXAMEN E3 · PUNTO 4','Na⁺ neutro y Al³⁺ ácido',st('El catión sodio es neutro y el catión aluminio es ácido. Explicarlo en función de la fuerza como electrolito de los hidróxidos.'),
   jus('<p>NaOH es un electrolito <b>fuerte</b>: su ácido conjugado (Na⁺) no tiene comportamiento ácido-base. Al(OH)₃ es <b>débil</b> (y poco soluble): su ácido conjugado, el catión hidratado, sí cede protones al agua.</p>')+rx('[Al(H2O)6]^3+ + H2O <=> [Al(OH)(H2O)5]^2+ + H3O^+','Ka ≈ 10⁻⁵'),
   'Conjugado de base fuerte = neutro; de base débil = ácido');

  // ---------------- E4 ----------------
  e('e4-1','EXAMEN E4 · PUNTO 1','Ley de acción de masas',st('Explique qué representa la Ley de acción de masas.'),
   jus('<p>En un sistema en equilibrio a temperatura constante, el cociente entre el producto de las concentraciones de los productos y el de los reactivos, cada una elevada a su coeficiente estequiométrico, es constante (K), independientemente de las concentraciones iniciales. Sólo cambia con T y no informa sobre la velocidad.</p>'),'');
  e('e4-2','EXAMEN E4 · PUNTO 2','Electrolito débil vs fuerte',st('Describa la diferencia entre un electrolito débil y uno fuerte.'),
   jus('<p>Fuerte: se disocia totalmente en solución (→, α = 1, sin constante útil); sólo hay iones. Débil: se disocia parcialmente y queda en equilibrio con sus iones (⇌, con K, α &lt; 1), y su grado depende de la concentración.</p>'),'');
  e('e4-3','EXAMEN E4 · PUNTO 3','Arrhenius',st('Justifique por qué la teoría de Arrhenius hoy no es considerada válida.'),
   jus('<p>Es restringida: sólo vale en solución acuosa, exige que el ácido o la base contengan H⁺ u HO⁻ (no explica la basicidad del NH₃ ni de sales como Na₂CO₃, ni la acidez del NH₄Cl), no explica reacciones sin agua y supone un H⁺ libre, que en agua está como H₃O⁺. Brønsted–Lowry (y Lewis) la incluyen y amplían.</p>'),'');
  e('e4-4','EXAMEN E4 · PUNTO 4','Descripción completa del H₂SO₄',st('Escriba y explique la descripción completa de una solución de ácido sulfúrico. Ka₂ 1,2·10⁻².'),
   desc(rxs(['H2SO4 + H2O -> HSO4^- + H3O^+','1.ª disociación: fuerte, total'],['HSO4^- + H2O <=> SO4^2- + H3O^+','2.ª: débil, Ka₂ = 1,2·10⁻²'])+W+chain(R`K_{a2}=\frac{[\mathrm{SO_4^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HSO_4^-}]}\qquad\text{BM: }C=[\mathrm{HSO_4^-}]+[\mathrm{SO_4^{2-}}]`,R`\text{BC: }[\mathrm{H_3O^+}]=[\mathrm{HSO_4^-}]+2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`))+
   jus('<p>No hay H₂SO₄ sin disociar (primera disociación total). La segunda no puede despreciarse ni tomarse como total: Ka₂ es grande y el H₃O⁺ de la primera la reprime parcialmente (ion común); se resuelve con la cuadrática.</p>'),'');
  e('e4-5','EXAMEN E4 · PUNTO 5','α mayor en la solución más diluida',st('Una solución 10⁻⁴ M de una base débil tiene mayor grado de disociación que una 0,4 M de la misma base. Explique.'),
   jus('<p><b>Choques efectivos:</b> en la solución diluida las partículas están más lejos y hay menos choques efectivos entre BH⁺ y HO⁻ que regeneren la base: la reacción inversa se ve menos favorecida y α aumenta. <b>Le Châtelier:</b> al diluir, el equilibrio se desplaza hacia el lado con más partículas disueltas (los iones). Cuantitativamente, '+m(R`\alpha\approx\sqrt{K_b/C}`)+'.</p>'),'');
  e('e4-6','EXAMEN E4 · PUNTO 6','H₂S + HCl: ¿alcanza el equilibrio?',st('A una solución de H₂S se agrega HCl hasta [H₃O⁺] = 0,3 M. Explique si el sistema alcanza el equilibrio. Ka₁ 10⁻⁷; Ka₂ 10⁻¹³.'),
   jus('<p><b>Sí, siempre lo alcanza.</b> El HCl (fuerte) aporta H₃O⁺ que, por Le Châtelier (ion común), desplaza los equilibrios del H₂S hacia la izquierda, pero estos siguen existiendo: el sistema llega a un nuevo equilibrio con [HS⁻] = Ka₁[H₂S]/0,3 y [S²⁻] = Ka₁Ka₂[H₂S]/0,3², muy pequeñas pero no nulas. Además, siempre está la autoprotólisis del agua.</p>'),'Sí, alcanza el equilibrio (desplazado, no anulado)');
  e('e4-7','EXAMEN E4 · PUNTO 7','Ácido ascórbico en el cuerpo',st('Ascórbico: Ka₁ 8,0·10⁻⁵ (pKa 4,10) y Ka₂ 1,6·10⁻¹² (pKa 11,80). ¿Qué especies hay en estómago (pH 1), intestino delgado (6), grueso (8) y sangre (7,4)?'),
   table(['Lugar','pH','H₂A','HA⁻','A²⁻','Predomina'],[['Estómago','1','99,9 %','0,08 %','1·10⁻¹² %','H₂A'],['Intestino delgado','6','1,2 %','98,8 %','1,6·10⁻⁴ %','HA⁻'],['Sangre','7,4','0,05 %','99,9 %','0,004 %','HA⁻'],['Intestino grueso','8','0,01 %','99,97 %','0,016 %','HA⁻']])+
   jus('<p>Por el diagrama de especiación: por debajo de pKa₁ predomina H₂A; entre pKa₁ y pKa₂, HA⁻. A²⁻ es despreciable en todos los casos (pH ≪ pKa₂) pero existe.</p>'),'');
  e('e4-8','EXAMEN E4 · PUNTO 8','¿Ácido picolínico diprótico débil?',st('El ácido picolínico es un ácido débil diprótico. Establezca la veracidad del enunciado con pKa₁ 1,1 y pKa₂ 5,3.'),
   jus('<p><b>Verdadero.</b> Tiene dos constantes de disociación → dos protones ácidos (diprótico). Las dos son finitas y menores que 1 (Ka₁ = 0,079; Ka₂ = 5·10⁻⁶): ambas disociaciones son equilibrios, no totales → débil. Aunque Ka₁ es relativamente grande, no figura entre los ácidos fuertes.</p>'),'Verdadero');
  e('e4-9','EXAMEN E4 · PUNTO 9','Buffer de arseniato ácido / diácido',st('Explique cómo funciona una solución reguladora formada por arseniato ácido de sodio y arseniato diácido de sodio.'),
   desc(rxs(['NaH2AsO4 -> Na^+ + H2AsO4^-','total'],['Na2HAsO4 -> 2 Na^+ + HAsO4^2-','total'],['H2AsO4^- + H2O <=> HAsO4^2- + H3O^+','Ka₂ = 1,0·10⁻⁷'])+W)+
   rxs(['HAsO4^2- + H3O^+ -> H2AsO4^- + H2O','si se agrega ácido'],['H2AsO4^- + HO^- -> HAsO4^2- + H2O','si se agrega base'])+jus('<p>Par conjugado débil con las dos formas apreciables: regula alrededor de pH = pKa₂ = 7,0 (±1), con '+m(R`\mathrm{pH}=7{,}0+\log\frac{[\mathrm{HAsO_4^{2-}}]}{[\mathrm{H_2AsO_4^-}]}`)+'.</p>'),'Regula en pH 7 ± 1');

  // ---------------- E5 (Edgardo I) ----------------
  e('e5-1','EXAMEN E5 · PUNTO 1','Masa de NaHSO₃ para la solución madre',st('Solución final de 25 ppm obtenida diluyendo 1:100 una madre preparada en matraz de 250 mL. Calcule la masa de sulfito ácido de sodio.'),
   chain(R`\text{madre}=25\cdot100=2500\ \mathrm{ppm}=2{,}5\ \mathrm{g/L}\Rightarrow m=2{,}5\cdot0{,}250=0{,}625\ \mathrm{g}`),'0,625 g de NaHSO₃');
  e('e5-2','EXAMEN E5 · PUNTO 2','Descripción cuali-cuantitativa del NaHSO₃',st('Realice la descripción cuali-cuantitativa de la solución del ítem 1 (Ka₁ H₂SO₃ = 1,7·10⁻², Ka₂ = 6,4·10⁻⁸).'),
   step('Cualitativa',desc(rxs(['NaHSO3 -> Na^+ + HSO3^-','sal: electrolito fuerte'],['HSO3^- + H2O <=> SO3^2- + H3O^+','Ka₂ = 6,4·10⁻⁸'],['HSO3^- + H2O <=> H2SO3 + HO^-','Kb₂ = Kw/Ka₁ = 5,9·10⁻¹³'])+W+chain(R`\text{BM: }C=[\mathrm{H_2SO_3}]+[\mathrm{HSO_3^-}]+[\mathrm{SO_3^{2-}}]=[\mathrm{Na^+}]`,R`\text{BC: }[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{HSO_3^-}]+2[\mathrm{SO_3^{2-}}]+[\mathrm{HO^-}]`))+jus('<p>Na⁺ inalterado (de NaOH fuerte). HSO₃⁻ anfiprótico: Ka₂ ≫ Kb₂ → predomina su carácter ácido.</p>'))+
   step('Cuantitativa',chain(R`C=\frac{2{,}5}{104{,}06}=0{,}0240\ \mathrm{M}`)+sup([['[HSO₃⁻] ≈ C','se disocia y se protona muy poco (constantes chicas).']])+jus('<p>C no es ≫ Ka₁ (0,024 vs 0,017): se usa la fórmula completa del anfiprótico, no ½(pKa₁ + pKa₂).</p>')+chain([R`[\mathrm{H_3O^+}]=\sqrt{\frac{K_{a1}K_{a2}C}{K_{a1}+C}}=2{,}5\times10^{-5}\ \mathrm{M}\Rightarrow\mathrm{pH}=4{,}60`,'la simplificada daría 4,48'],R`[\mathrm{SO_3^{2-}}]=K_{a2}\frac{C}{[\mathrm{H_3O^+}]}\approx6{,}1\times10^{-5}\qquad[\mathrm{H_2SO_3}]=\frac{C[\mathrm{H_3O^+}]}{K_{a1}}\approx3{,}6\times10^{-5}`)+ver('<p>Ambas ≪ 0,024 ✔</p>')),
   'Ácida, pH ≈ 4,6');
  e('e5-3','EXAMEN E5 · PUNTO 3','“Esto no está bien”: H₃PO₄',st('El equipo informa:')+rxs(['H3PO4(ac) + 3 H2O(l) -> 3 H3O^+(ac) + PO4^3-(ac)'],['H2O(l) + H2O(l) -> H3O^+(ac) + HO^-(ac)'])+'<p>Justifique por qué la docente dice que está mal.</p>',
   jus('<p>1) El H₃PO₄ es un electrolito débil: no se disocia totalmente (va ⇌, con constante). 2) Es poliprótico: cede los protones <b>de a uno</b>, en tres equilibrios con Ka₁ ≫ Ka₂ ≫ Ka₃; no salen los tres juntos. 3) La autoprotólisis del agua es un equilibrio (⇌, Kw), no una reacción total.</p>')+rxs(['H3PO4 + H2O <=> H2PO4^- + H3O^+','Ka₁'],['H2PO4^- + H2O <=> HPO4^2- + H3O^+','Ka₂'],['HPO4^2- + H2O <=> PO4^3- + H3O^+','Ka₃'])+W,'');
  e('e5-4','EXAMEN E5 · PUNTO 4','El diagrama de especiación del equipo',st('a) Explique qué información brinda el diagrama y si es correcto. b) ¿Se puede relacionar con la cinética de disociación?'),
   step('a) Qué informa',jus('<p>La fracción α de cada especie del ácido en función del pH, en el equilibrio: qué especie predomina en cada rango, dónde coexisten pares conjugados (cruces en pH = pKa, zona de buffer) y cuáles son despreciables.</p>'))+
   step('¿Es correcto? Cómo controlarlo',flow([['n + 1 curvas','el fosfórico tiene 3 pKa → 4 especies.'],['Cruces en α = 0,5 en los pKa','2,15 · 7,20 · 12,15 (o los de la tabla).'],['Suma 1 en todo pH',''],['Ninguna curva vale exactamente 0','las especies minoritarias son despreciables, no inexistentes.']])+note('Gráfico','<p>El gráfico del examen no está reproducido acá; con él en mano se aplica esta lista.</p>'))+
   step('b) Cinética',jus('<p><b>No.</b> El diagrama describe el estado de equilibrio (termodinámica); no informa a qué velocidad se llega a él.</p>')),'');
  e('e5-5','EXAMEN E5 · PUNTO 5','Carácter de la sal y fuerza como electrolito',st('a) ¿La descripción del ítem 2 sirve para conocer el carácter ácido-base de la sal? b) ¿La sal es electrolito fuerte o débil?'),
   jus('<p>a) Sí: comparando las constantes del HSO₃⁻ (Ka₂ = 6,4·10⁻⁸ &gt; Kb₂ = 5,9·10⁻¹³) se concluye que es ácida. b) Fuerte: el NaHSO₃ se disocia totalmente en Na⁺ y HSO₃⁻. Lo débil es el comportamiento ácido-base del HSO₃⁻.</p>'),'a) Sí · b) fuerte');
  e('e5-6','EXAMEN E5 · PUNTO 6','Metilamina: descripción y grado',st('a) Descripción correcta de una solución de metilamina. b) ¿El α será razonablemente bajo en 0,3 M comparado con 10⁻³ M?'),
   step('a)',desc(rx('CH3NH2 + H2O <=> CH3NH3^+ + HO^-','Kb = 4,4·10⁻⁴')+W+chain(R`\text{BM: }C=[\mathrm{CH_3NH_2}]+[\mathrm{CH_3NH_3^+}]\qquad\text{BC: }[\mathrm{CH_3NH_3^+}]+[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`)))+
   step('b)',chain(R`0{,}3\ \mathrm{M}:\ \alpha\approx\sqrt{K_b/C}=3{,}8\,\%\qquad10^{-3}\ \mathrm{M}:\ \alpha=48\,\%\ (\text{cuadrática})`)+jus('<p>Sí: a mayor concentración, más choques efectivos entre CH₃NH₃⁺ y HO⁻ que regeneran la base → α menor.</p>')),'b) Sí: 3,8 % frente a 48 %');
  e('e5-7','EXAMEN E5 · PUNTO 7','Agregados a la metilamina 0,3 M',st('Qué ocurre si a la solución 0,3 M se agrega: a) 10 mL de HCl 0,1 M; b) 1 g de NaCl.'),
   step('a) HCl',rx('CH3NH2 + H3O^+ -> CH3NH3^+ + H2O','completa')+jus('<p>El HCl (1 mmol) se consume completamente con la base en exceso: se forma CH₃NH₃⁺ y queda metilamina. Ahora hay un par conjugado débil con las dos formas → solución reguladora; el pH baja un poco.</p>'))+
   step('b) NaCl',jus('<p>Na⁺ y Cl⁻ son iones de electrolitos fuertes: no tienen comportamiento ácido-base. El pH no cambia.</p>')),'a) baja levemente el pH y se forma un buffer · b) sin cambios');

  // ---------------- E6 (Edgardo II) ----------------
  e('e6-1','EXAMEN E6 · PUNTO 1','¿Especies apreciables del ácido arsénico?',st('Solución madre de H₃AsO₄ 1000 ppm e hija 500 ppm. ¿La cantidad de cada especie será apreciable? (Ka₁ 5,6·10⁻³, Ka₂ 1,0·10⁻⁷, Ka₃ 3,0·10⁻¹²)'),
   chain(R`\text{madre}: C=\frac{1{,}000}{141{,}94}=7{,}05\times10^{-3}\ \mathrm{M}\qquad\text{hija}: 3{,}52\times10^{-3}\ \mathrm{M}`)+
   jus('<p>C es del orden de Ka₁ (C/Ka₁ ≈ 1): la primera disociación es importante → H₃AsO₄ y H₂AsO₄⁻ son apreciables. HAsO₄²⁻ ≈ Ka₂ = 10⁻⁷ M y AsO₄³⁻ ≈ 10⁻¹⁷ M: despreciables frente a las anteriores, pero no nulas. Al diluir (hija) aumenta el grado de la primera disociación (menos choques efectivos): en la hija predomina H₂AsO₄⁻.</p>')+
   table(['','madre','hija'],[['[H₃O⁺]','4,08·10⁻³ (pH 2,39)','2,45·10⁻³ (pH 2,61)'],['H₃AsO₄','2,97·10⁻³','1,07·10⁻³'],['H₂AsO₄⁻','4,08·10⁻³','2,45·10⁻³'],['HAsO₄²⁻','1,0·10⁻⁷','1,0·10⁻⁷'],['AsO₄³⁻','7,4·10⁻¹⁷','1,2·10⁻¹⁶']]),'');
  e('e6-2','EXAMEN E6 · PUNTO 2','“[HO⁻] = 0”',st('El equipo informa [HO⁻] = 0. ¿Es correcto?'),
   jus('<p><b>No.</b> En toda solución acuosa está el equilibrio de autoprotólisis: [HO⁻] = Kw/[H₃O⁺]. Es despreciable frente a [H₃O⁺], pero no nula.</p>')+chain(R`[\mathrm{HO^-}]=\frac{10^{-14}}{4{,}08\times10^{-3}}=2{,}5\times10^{-12}\ \mathrm{M}`),'[HO⁻] = 2,5·10⁻¹² M');
  e('e6-3','EXAMEN E6 · PUNTO 3','¿Y con arseniato (fosfato) de sodio?',st('Si en lugar del ácido se usa la sal sódica totalmente desprotonada, ¿[HO⁻] será 0?'),
   rx('AsO4^3- + H2O <=> HAsO4^2- + HO^-','Kb₁ = Kw/Ka₃ = 3,3·10⁻³')+jus('<p>Menos todavía: el anión es una base relativamente fuerte (Kb₁ grande) y la solución es básica; [HO⁻] es apreciable. Nunca es 0.</p>'),'No: es básica, [HO⁻] apreciable');
  e('e6-4','EXAMEN E6 · PUNTO 4','Concentraciones en la solución madre',st('Calcule la concentración de todas las especies del ácido en la madre.'),
   ver('<p>C/Ka₁ = 1,26 &lt; 100: no se desprecia x → cuadrática.</p>',false)+chain(R`x=\frac{-5{,}6\times10^{-3}+\sqrt{(5{,}6\times10^{-3})^2+4\cdot5{,}6\times10^{-3}\cdot7{,}05\times10^{-3}}}{2}=4{,}08\times10^{-3}`,R`[\mathrm{H_3AsO_4}]=2{,}97\times10^{-3}\quad[\mathrm{H_2AsO_4^-}]=4{,}08\times10^{-3}\quad[\mathrm{HAsO_4^{2-}}]=1{,}0\times10^{-7}\quad[\mathrm{AsO_4^{3-}}]=7{,}4\times10^{-17}`),'pH 2,39');
  e('e6-5','EXAMEN E6 · PUNTO 5','¿Alguna solución no alcanzará el equilibrio?',st('Soluciones de ácido salicílico, HCl, NaCl, morfolina y cis-maleato de sodio: ¿alguna no alcanzará el equilibrio?'),
   jus('<p><b>Todas</b> alcanzan el equilibrio. Incluso en HCl o NaCl (disociación total) existe el equilibrio de autoprotólisis del agua; en las demás, además, el equilibrio de la especie débil.</p>'),'Ninguna: todas lo alcanzan');
  e('e6-6','EXAMEN E6 · PUNTO 6','¿Alguna será neutra?',st('¿Alguna de esas soluciones será neutra?'),
   table(['Solución','Carácter'],[['ácido salicílico','ácida'],['HCl','ácida'],['NaCl','<b>neutra</b>'],['morfolina','básica'],['cis-maleato de sodio','básica (anión de ácido débil)']]),'Sólo NaCl');
  e('e6-7','EXAMEN E6 · PUNTO 7','Morfolina 0,1 M: ¿pH 10?',st('Morfolina 0,1 M (pKb 8,3): el equipo informa pH 10. ¿Es correcto?'),
   sup([['x ≪ 0,1','Kb = 5·10⁻⁹, C/Kb ≫ 100.']])+chain(R`[\mathrm{HO^-}]=\sqrt{10^{-8{,}3}\cdot0{,}1}=2{,}24\times10^{-5}\Rightarrow\mathrm{pOH}=4{,}65\Rightarrow\mathrm{pH}=9{,}35`)+ver('<p>0,02 % ✔</p>'),'No: el pH es 9,35');

  A.addEx('acido-base',{group:'ev-ab',label:'Evaluaciones de ácido-base (E1 a E6)',kicker:'EVALUACIONES RESUELTAS',intro:'<p>Exámenes y pruebas, punto por punto. Donde un punto es idéntico a uno de la guía, la resolución es la misma.</p>'},ev);
})();
