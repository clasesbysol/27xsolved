// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS Y EVALUACIONES · Precipitación
// Guía 4 (1–10 y 17), Ejercicios de precipitación 2.ª parte (2024), Integración 2 (punto 1 a y b) y Examen E8 punto 1.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,flow}=A;
  const R=String.raw;

  // ---------- Resoluciones (compartidas entre la Guía 4 y la guía 2024) ----------
  const S={};
  S.agi=desc(rx('AgI(s) <=> Ag^+ + I^-','Kps = [Ag⁺][I⁻]'))+chain(R`s=\frac{2{,}9\times10^{-6}\ \mathrm{g/L}}{234{,}77\ \mathrm{g/mol}}=1{,}235\times10^{-8}\ \mathrm{M}`,R`K_{ps}=s\cdot s=s^2=1{,}53\times10^{-16}`)+rta('1,525·10⁻¹⁶')+jus('<p>Por cada mol de AgI que se disuelve aparecen 1 mol de Ag⁺ y 1 de I⁻: [Ag⁺] = [I⁻] = s. Se desprecia la hidrólisis de los iones (vienen de electrolitos fuertes o casi no reaccionan con el agua).</p>');
  S.srf2=desc(rx('SrF2(s) <=> Sr^2+ + 2 F^-','Kps = [Sr²⁺][F⁻]²'))+chain([R`s=[\mathrm{Sr^{2+}}]=\frac{0{,}111\ \mathrm{g/L}}{87{,}62\ \mathrm{g/mol}}=1{,}27\times10^{-3}\ \mathrm{M}`,'el dato es del ion estroncio'],R`K_{ps}=s\,(2s)^2=4s^3=8{,}1\times10^{-9}`)+
   rta('2,76·10⁻⁹',false,'Ese valor sale de dividir 0,111 g/L por la masa molar del SrF₂ (125,62): s = 8,84·10⁻⁴ M y 4s³ = 2,76·10⁻⁹. Pero el enunciado da la concentración de <b>estroncio</b>, así que corresponde dividir por 87,62. Conviene preguntarle a la profe qué criterio quiere.')+jus('<p>Por cada mol de SrF₂ disuelto aparecen 1 mol de Sr²⁺ y 2 de F⁻: [Sr²⁺] = s y [F⁻] = 2s (el coeficiente también se eleva en Kps).</p>');
  S.ag2cro4=desc(rx('Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-','Kps = [Ag⁺]²[CrO₄²⁻]'))+chain(R`s=\frac{4{,}35\times10^{-3}\ \mathrm{g}/0{,}100\ \mathrm{L}}{331{,}73}=1{,}31\times10^{-4}\ \mathrm{M}`,R`K_{ps}=(2s)^2s=4s^3=9{,}0\times10^{-12}`)+rta('9·10⁻¹²')+jus('<p>Por cada mol de Ag₂CrO₄ disuelto aparecen 2 mol de Ag⁺ y 1 de CrO₄²⁻: [Ag⁺] = 2s y [CrO₄²⁻] = s.</p>');
  S.cuio3=desc(rx('Cu(IO3)2(s) <=> Cu^2+ + 2 IO3^-'))+chain(R`K_{ps}=4s^3\Rightarrow s=\sqrt[3]{\frac{1{,}4\times10^{-7}}{4}}=3{,}27\times10^{-3}\ \mathrm{M}`)+
   jus('<p>Disolución exotérmica: el calor es un “producto”. Al aumentar la temperatura, por Le Châtelier el equilibrio se desplaza hacia el sólido: <b>Kps y la solubilidad disminuyen</b>; al enfriar, aumentan.</p>')+rta('3,27·10⁻³ M');
  S.feoh3=desc(rxs(['NaOH -> Na^+ + HO^-','total'],['Fe(OH)3(s) <=> Fe^3+ + 3 HO^-','Kps = 6,0·10⁻³⁸']))+sup([['[HO⁻] ≈ 0,3 M (sólo del NaOH)','ion común: el HO⁻ del NaOH reprime la disolución; lo que aporta el sólido (3s) es despreciable.']])+
   chain(R`s=[\mathrm{Fe^{3+}}]=\frac{6{,}0\times10^{-38}}{(0{,}3)^3}=2{,}2\times10^{-36}\ \mathrm{M}\to2{,}2\times10^{-36}\cdot106{,}87=2{,}37\times10^{-34}\ \mathrm{g/L}`)+ver('<p>3s ≪ 0,3 ✔</p>')+
   jus('<p>Para disolverlo hay que <b>bajar el pH</b> (agregar ácido): el H₃O⁺ consume HO⁻ (H₃O⁺(ac) + HO⁻(ac) → 2 H₂O(l)), Q baja por debajo del Kps y por Le Châtelier se disuelve el hidróxido.</p>','¿Cómo disolverlo?')+rta('2,37·10⁻³⁴ g/L');
  S.pbi2=desc(rxs(['CaI2 -> Ca^2+ + 2 I^-','total: [I⁻] = 0,4 M'],['PbI2(s) <=> Pb^2+ + 2 I^-','Kps = 1,4·10⁻⁸']))+sup([['[I⁻] ≈ 0,4 M','ion común: 2s ≪ 0,4.']])+
   chain(R`s=\frac{1{,}4\times10^{-8}}{(0{,}4)^2}=8{,}75\times10^{-8}\ \mathrm{M}\to4{,}03\times10^{-5}\ \mathrm{g/L}=4{,}03\times10^{-6}\ \%\,m/v`)+ver('<p>2s = 1,8·10⁻⁷ ≪ 0,4 ✔</p>')+
   jus('<p><b>El pH prácticamente no la modifica:</b> el I⁻ es base conjugada de un ácido fuerte (HI), no se protona al acidificar. Sólo a pH muy alto cambiaría, porque el Pb²⁺ formaría Pb(OH)₂ / plumbito, un equilibrio distinto.</p>','¿Y el pH?')+rta('4,03·10⁻⁶ % m/v');
  S.baso4=chain([R`n_{\mathrm{Ba^{2+}}}=0{,}250\cdot0{,}1=25\ \mathrm{mmol}\qquad n_{\mathrm{SO_4^{2-}}}=0{,}600\cdot0{,}1=60\ \mathrm{mmol}`,'K₂SO₄ 0,1 M (dato anotado a mano)'],R`\text{precipita todo el Ba}^{2+}:\ [\mathrm{SO_4^{2-}}]_{\text{sobra}}=\frac{35}{850}=0{,}0412\ \mathrm{M}`)+
   sup([['Precipitación prácticamente completa del Ba²⁺','Kps muy chico y exceso de sulfato (ion común).']])+
   chain(R`[\mathrm{Ba^{2+}}]=\frac{1{,}1\times10^{-10}}{0{,}0412}=2{,}67\times10^{-9}\ \mathrm{M}\to2{,}67\times10^{-9}\cdot0{,}850\cdot233{,}39=5{,}3\times10^{-7}\ \mathrm{g\ disueltos}`,R`m_{\text{insoluble}}=0{,}025\cdot233{,}39=5{,}83\ \mathrm{g}`)+ver('<p>El Ba²⁺ disuelto (2,3·10⁻⁹ mol) es despreciable frente a 25 mmol ✔</p>')+rta('5,31·10⁻⁷ g disueltos; 5,8339 g insolubles');
  S.caf2=chain(R`K_{ps}=[\mathrm{Ca^{2+}}][\mathrm{F^-}]^2\Rightarrow[\mathrm{F^-}]_{\min}=\sqrt{\frac{4{,}0\times10^{-11}}{0{,}02}}=4{,}47\times10^{-5}\ \mathrm{M}`)+jus('<p>Precipita cuando Q = [Ca²⁺][F⁻]² supera el Kps: el mínimo es Q = Kps.</p>')+rta('4,47·10⁻⁵ M');
  S.mgbuffer=desc(rxs(['NH3 + H2O <=> NH4^+ + HO^-','Kb'],['Mg(OH)2(s) <=> Mg^2+ + 2 HO^-','Kps']))+sup([['[NH₃] ≈ 0,1 y [NH₄⁺] ≈ 0,4','buffer: el NH₄⁺ reprime la ionización del NH₃ (ion común).']])+
   chain(R`[\mathrm{HO^-}]=K_b\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=1{,}8\times10^{-5}\cdot\frac{0{,}1}{0{,}4}=4{,}5\times10^{-6}\ \mathrm{M}`,R`[\mathrm{Mg^{2+}}]_{\max}=\frac{1{,}2\times10^{-11}}{(4{,}5\times10^{-6})^2}=0{,}59\ \mathrm{M}`)+jus('<p>Por eso en la marcha el NH₄Cl evita que el Mg²⁺ precipite con el grupo III.</p>')+rta('0,59 M');
  S.fenh3=chain(R`[\mathrm{Fe^{3+}}]=\frac{10\times10^{-3}/55{,}85}{0{,}101}=1{,}77\times10^{-3}\ \mathrm{M}\qquad[\mathrm{NH_3}]=\frac{1\ \mathrm{mmol}}{101\ \mathrm{mL}}=9{,}9\times10^{-3}\ \mathrm{M}`,R`[\mathrm{HO^-}]=\sqrt{K_b[\mathrm{NH_3}]}=\sqrt{1{,}8\times10^{-5}\cdot9{,}9\times10^{-3}}=4{,}2\times10^{-4}\ \mathrm{M}`,R`Q=[\mathrm{Fe^{3+}}][\mathrm{HO^-}]^3=1{,}77\times10^{-3}\cdot(4{,}2\times10^{-4})^3=1{,}3\times10^{-13}`)+
   jus('<p>Q ≫ Kps (con el valor impreso 6,0·10⁻²⁸ o con el real ≈ 10⁻³⁸): <b>precipita</b>. Se calcula Q con las concentraciones después de mezclar.</p>')+rta('Sí');
  S.clbr=chain(R`\mathrm{AgCl}:\ [\mathrm{Ag^+}]=\frac{1{,}56\times10^{-10}}{0{,}01}=1{,}56\times10^{-8}\ \mathrm{M}`,R`\mathrm{AgBr}:\ [\mathrm{Ag^+}]=\frac{7{,}7\times10^{-13}}{0{,}001}=7{,}7\times10^{-10}\ \mathrm{M}`)+jus('<p>Precipita primero el que necesita <b>menos</b> Ag⁺ para alcanzar su Kps: el AgBr (aunque el Br⁻ esté 10 veces más diluido).</p>')+rta('Bromuro de plata');
  S.cromatos=chain(R`[\mathrm{Ag^+}]=\frac{10}{107{,}87}=0{,}0927\ \mathrm{M}\qquad[\mathrm{Pb^{2+}}]=\frac{10}{207{,}2}=0{,}0483\ \mathrm{M}`,R`\mathrm{Ag_2CrO_4}:\ [\mathrm{CrO_4^{2-}}]=\frac{9\times10^{-12}}{(0{,}0927)^2}=1{,}05\times10^{-9}\ \mathrm{M}`,R`\mathrm{PbCrO_4}:\ [\mathrm{CrO_4^{2-}}]=\frac{2\times10^{-14}}{0{,}0483}=4{,}1\times10^{-13}\ \mathrm{M}`)+jus('<p>Precipita primero el PbCrO₄ (necesita menos cromato). Ojo: Ag₂CrO₄ es 2:1, por eso se compara la concentración de reactivo necesaria y no los Kps.</p>')+rta('Cromato de plomo');
  S.cos=chain([R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}=\frac{9{,}5\times10^{-8}\cdot1\times10^{-19}\cdot0{,}1}{(10^{-3})^2}=9{,}5\times10^{-22}\ \mathrm{M}`,'constantes de la Tabla 1'],R`Q=0{,}01\cdot9{,}5\times10^{-22}=9{,}5\times10^{-24}<K_{ps}=6{,}4\times10^{-23}`)+
   jus('<p><b>No precipita.</b> Para favorecer la precipitación total hay que <b>subir el pH</b> (menos H₃O⁺ → por Le Châtelier el H₂S se disocia más → más S²⁻). Para disolver el precipitado, <b>acidificar</b>: el H₃O⁺ protona el S²⁻, Q &lt; Kps y el sólido se disuelve.</p>')+
   note('Constantes','<p>Con Ka₂ = 1,3·10⁻¹⁴ (otras tablas) el resultado cambia (Q ≈ 10⁻¹⁸, precipitaría): la respuesta “No” corresponde a los valores de la Tabla 1 de la cátedra.</p>')+rta('No');
  S.pbmn=chain(R`[\mathrm{Pb^{2+}}]=\frac{3{,}4\times10^{-28}}{1{,}2\times10^{-15}}=2{,}8\times10^{-13}\ \mathrm{M}`,[R`\mathrm{MnS}:\ Q=0{,}1\cdot1{,}2\times10^{-15}=1{,}2\times10^{-16}<1{,}4\times10^{-15}`,'no precipita'])+
   jus('<p>Queda Pb²⁺ = 2,8·10⁻¹³ M (precipitación completa) y Mn²⁺ = 0,1 M (el MnS no llegó a su Kps). Para precipitar los dos hay que aumentar [S²⁻] <b>subiendo el pH</b> (medio amoniacal), como en el grupo III.</p>')+
   rta('2,83·10⁻³ M de plomo',false,'El exponente impreso parece una errata: con los datos da 2,83·10⁻¹³ M.');
  S.cahpo4=chain(R`s=\frac{10\times10^{-3}\ \mathrm{g}/0{,}100\ \mathrm{L}}{136{,}06}=7{,}35\times10^{-4}\ \mathrm{M}=[\mathrm{Ca^{2+}}]=C_{\mathrm{fosfato}}`,[R`\alpha_{\mathrm{HPO_4^{2-}}}(\mathrm{pH}\ 7{,}5)=\frac{K_{a1}K_{a2}[\mathrm{H_3O^+}]}{D}=0{,}667`,'D: suma de los cuatro términos'],R`K_{ps}=[\mathrm{Ca^{2+}}][\mathrm{HPO_4^{2-}}]=s\cdot\alpha s=3{,}6\times10^{-7}`)+
   jus('<p>A pH 7,5 el fosfato disuelto se reparte entre H₂PO₄⁻ (33 %) y HPO₄²⁻ (67 %); sólo el HPO₄²⁻ entra en el Kps. El producto s² = 5,4·10⁻⁷ sería el Kps “condicional” a ese pH.</p>');

  // ---------- Guía 4 ----------
  const g4=[];const e4=(n,title,statement,solution,answer)=>g4.push({id:`p-g4-${n}`,tag:`GUÍA 4 · EJ. ${n}`,title,statement,solution,answer});
  e4('1a','Kps del AgI',st('2,9·10⁻⁶ g de AgI son solubles en 1 L de agua (δ = 1).'),S.agi,'Kps = 1,53·10⁻¹⁶');
  e4('1b','Kps del SrF₂',st('La concentración de estroncio en la solución saturada de SrF₂ es 1,11·10⁻¹ g/L.'),S.srf2,'Kps = 8,1·10⁻⁹ (ver nota)');
  e4('1c','Kps del Ag₂CrO₄',st('Se disuelven como máximo 4,35 mg de Ag₂CrO₄ en 100 mL a 25 °C.'),S.ag2cro4,'Kps = 9,0·10⁻¹²');
  e4(2,'Solubilidad del iodato cúprico y temperatura',st('Kps = 1,4·10⁻⁷ a 25 °C. Calcule s. Si la disolución es exotérmica, ¿cómo varía con T?'),S.cuio3,'s = 3,27·10⁻³ M; disminuye al calentar');
  e4('3a','Fe(OH)₃ en NaOH 0,3 M',st('Concentración de catión disuelto. Kps 6,0·10⁻³⁸. ¿Cómo disolverlo modificando el pH?'),S.feoh3,'2,2·10⁻³⁶ M');
  e4('3b','PbI₂ en CaI₂ 0,2 M',st('Solubilidad en % m/v. Kps 1,4·10⁻⁸. ¿Influye el pH?'),S.pbi2,'4,03·10⁻⁶ % m/v');
  e4(4,'BaSO₄ que queda disuelto',st('250 mL de Ba(NO₃)₂ 0,1 M + 600 mL de K₂SO₄ (0,1 M, anotado). Kps 1,1·10⁻¹⁰. Masa disuelta e insoluble.'),S.baso4,'5,3·10⁻⁷ g disueltos · 5,83 g insolubles');
  e4(5,'F⁻ mínimo para precipitar CaF₂',st('[Ca²⁺] = 0,02 M. Kps 4,0·10⁻¹¹.'),S.caf2,'4,47·10⁻⁵ M');
  e4(6,'Mg²⁺ máximo en buffer NH₄Cl 0,4 / NH₃ 0,1',st('Kps Mg(OH)₂ 1,2·10⁻¹¹.'),S.mgbuffer,'0,59 M');
  e4(7,'¿Precipita Fe(OH)₃ con 1 mL de NH₃ 1 M?',st('100 mL con 10 mg de Fe³⁺ + 1 mL de NH₃ 1 M. Kps 6,0·10⁻²⁸ (impreso); Kb 1,8·10⁻⁵.'),S.fenh3,'Sí');
  e4('8a','Cl⁻ 0,01 M y Br⁻ 0,001 M con Ag⁺',st('Kps AgCl 1,56·10⁻¹⁰; AgBr 7,7·10⁻¹³. ¿Qué precipita primero?'),S.clbr,'AgBr');
  e4('8b','Ag⁺ y Pb²⁺ (10 g/L c/u) con cromato',st('Kps Ag₂CrO₄ 9·10⁻¹²; PbCrO₄ 2·10⁻¹⁴.'),S.cromatos,'PbCrO₄');
  e4(9,'CoS en H₂S saturado a pH 3',st('H₂S 0,1 M, pH 3, Co²⁺ 0,01 M. Kps 6,4·10⁻²³. ¿Precipita? ¿Cómo favorecer la precipitación total y la disolución?'),S.cos,'No');
  e4(10,'Pb²⁺ y Mn²⁺ con [S²⁻] = 1,2·10⁻¹⁵',st('Pb²⁺ y Mn²⁺ 0,1 M. Kps PbS 3,4·10⁻²⁸; MnS 1,4·10⁻¹⁵. ¿Qué concentración de cada uno queda? ¿Cómo garantizar la precipitación total de ambos?'),S.pbmn,'Pb²⁺ 2,8·10⁻¹³ M · Mn²⁺ 0,1 M');
  e4(17,'Kps del CaHPO₄ a pH 7,5',st('A pH 7,5 se disuelven como máximo 10 mg de CaHPO₄ por 100 mL. Calcular el Kps. Ka: 7,11·10⁻³; 6,34·10⁻⁸; 4,22·10⁻¹³.'),S.cahpo4,'Kps ≈ 3,6·10⁻⁷');
  A.addEx('precipitacion',{group:'pg4',label:'Guía 4 · precipitación (ejercicios 1 a 10 y 17)'},g4);

  // ---------- Guía 2024 ----------
  const p=[];const ep=(n,title,statement,solution,answer,ref)=>{if(!statement&&ref)statement=(g4.find(x=>x.id===`p-g4-${ref}`)||{}).statement||'';p.push({id:`p-24-${n}`,tag:`PRECIPITACIÓN 2024 · EJ. ${n}`,title,statement:statement+(ref?`<p class="qacExTag">= Guía 4 · ej. ${ref}</p>`:''),solution,answer})};
  ep(1,'Kps del AgI','',S.agi,'1,53·10⁻¹⁶','1a');
  ep(2,'Kps del SrF₂','',S.srf2,'8,1·10⁻⁹ (ver nota)','1b');
  ep(3,'Kps del Ag₂CrO₄','',S.ag2cro4,'9,0·10⁻¹²','1c');
  ep(4,'Iodato cúprico','',S.cuio3,'3,27·10⁻³ M','2');
  ep(5,'S²⁻ en solución saturada de Bi₂S₃',st('Kps 1,6·10⁻³³.'),
   desc(rx('Bi2S3(s) <=> 2 Bi^3+ + 3 S^2-','Kps = [Bi³⁺]²[S²⁻]³'))+chain(R`K_{ps}=(2s)^2(3s)^3=108\,s^5\Rightarrow s=\sqrt[5]{\frac{1{,}6\times10^{-33}}{108}}=1{,}08\times10^{-7}\ \mathrm{M}`,R`[\mathrm{S^{2-}}]=3s=3{,}24\times10^{-7}\ \mathrm{M}`)+note('Supuesto','<p>Se desprecia la hidrólisis del S²⁻ (en realidad se protona bastante), como pide el ejercicio.</p>')+rta('3,24·10⁻⁷ M')+jus('<p>Por cada mol que se disuelve aparecen 2 mol de Bi³⁺ y 3 de S²⁻: los coeficientes se elevan junto con s en Kps. El enunciado pide despreciar la hidrólisis del S²⁻ (en realidad es una base bastante fuerte).</p>'),'3,24·10⁻⁷ M');
  ep(6,'Ag⁺ en HCl 0,01 M al aparecer precipitado',st('A HCl 0,01 M se agrega una sal de plata hasta observar precipitado blanco. Calcular [Ag⁺] en equilibrio.'),
   jus('<p>El precipitado aparece cuando Q = Kps (solución saturada en AgCl). El Cl⁻ lo fija el HCl.</p>')+chain(R`[\mathrm{Ag^+}]=\frac{K_{ps}}{[\mathrm{Cl^-}]}=\frac{1{,}56\times10^{-10}}{0{,}01}=1{,}56\times10^{-8}\ \mathrm{M}`)+rta('1,56·10⁻⁸ M'),'1,56·10⁻⁸ M');
  ep(7,'BaSO₄','',S.baso4,'5,3·10⁻⁷ g · 5,83 g','4');
  ep(8,'F⁻ mínimo para CaF₂','',S.caf2,'4,47·10⁻⁵ M','5');
  ep(9,'Fe(OH)₃ en NaOH 0,3 M','',S.feoh3,'2,37·10⁻³⁴ g/L','3a');
  ep(10,'PbI₂ en CaI₂ 0,2 M','',S.pbi2,'4,03·10⁻⁶ % m/v','3b');
  ep(11,'Mg²⁺ máximo en buffer amoniacal','',S.mgbuffer,'0,59 M','6');
  ep(12,'¿Precipita Fe(OH)₃?','',S.fenh3,'Sí','7');
  ep(13,'Cl⁻ y Br⁻ con Ag⁺','',S.clbr,'AgBr','8a');
  ep(14,'Ag⁺ y Pb²⁺ con cromato','',S.cromatos,'PbCrO₄','8b');
  ep(15,'Pb²⁺ y Mn²⁺ con sulfuro','',S.pbmn,'Pb²⁺ 2,8·10⁻¹³ M','10');
  ep(16,'CoS a pH 3','',S.cos,'No','9');
  ep(17,'MnS en acético + acetato en exceso',st('Mn²⁺ 0,1 M, HAc 0,05 M, saturado con H₂S y con NaAc en exceso. Kps MnS 1,4·10⁻¹⁵. ¿Precipita?'),
   jus('<p>HAc + NaAc forman un buffer acético: aun con mucho acetato, su pH útil llega como mucho a pKa + 1 ≈ 5,7. A ese pH la [S²⁻] sigue siendo muy baja (Tabla 1: Ka₁Ka₂ = 9,5·10⁻²⁷).</p>')+
   chain(R`\mathrm{pH}\approx5{,}7:\ [\mathrm{S^{2-}}]=\frac{9{,}5\times10^{-27}\cdot0{,}1}{(10^{-5{,}74})^2}=2{,}9\times10^{-16}\ \mathrm{M}`,R`Q=0{,}1\cdot2{,}9\times10^{-16}=2{,}9\times10^{-17}<1{,}4\times10^{-15}`)+jus('<p><b>No precipita</b>; haría falta pH ≈ 7 o más (medio amoniacal).</p>')+rta('No'),'No');
  ep(18,'Separar cromato y cloruro por precipitación fraccionada',st('Explique cómo usar la precipitación fraccionada para separar CrO₄²⁻ y Cl⁻.'),
   flow([['Opción 1 · con Ag⁺, de a poco','Con concentraciones habituales (ej.: 0,1 M de cada uno), el AgCl necesita mucha menos Ag⁺ (1,8·10⁻⁹ M) que el Ag₂CrO₄ (≈ 3·10⁻⁶ M): precipita primero el AgCl blanco. Se agrega Ag⁺ hasta justo antes de que aparezca el rojo ladrillo y se filtra: el cromato queda en solución.'],['Opción 2 · con Ba²⁺','BaCrO₄ es insoluble (Kps ≈ 1,2·10⁻¹⁰) y BaCl₂ soluble: el Ba²⁺ precipita sólo el cromato y deja el cloruro.'],['Criterio','La separación es buena si cuando empieza a precipitar el segundo, del primero queda ≤ 0,1 % (o ≤ 10⁻⁵ M).']])+jus('<p>Precipita primero la sal que necesita menos reactivo para alcanzar su Kps. Si los Kps son muy distintos, cuando empieza a precipitar la segunda, de la primera queda una cantidad despreciable respecto de la inicial.</p>'),'');
  A.addEx('precipitacion',{group:'p24',label:'Ejercicios de precipitación · 2.ª parte (2024)',intro:'<p>Muchos coinciden con la Guía 4: se indica cuál y la resolución es la misma. Se compara siempre con la respuesta impresa (Rta).</p>'},p);

  // ---------- Integración y evaluaciones ----------
  const ev=[];const ee=(id,tag,title,statement,solution,answer)=>ev.push({id,tag,title,statement,solution,answer});
  ee('int2-1ab','GUÍA 4 · INTEGRACIÓN 2 · PUNTO 1 a y b','Pigmentos de Sorolla: disolver con HNO₃ (¿o HCl?)',st('Una fracción verde contiene blanco de plomo (PbCO₃) y verde de París (arseniato cúprico). Se disuelve con HNO₃ y se encuentran Pb 4·10⁻⁴ M y Cu 2·10⁻² M.',['Justifique cualitativamente la disolución con ácido nítrico.','¿Podría reemplazar el HNO₃ por HCl?']),
   step('a) Con HNO₃',rxs(['PbCO3(s) + 2 H3O^+ -> Pb^2+ + CO2(g)↑ + 3 H2O'],['Cu3(AsO4)2(s) + 6 H3O^+ -> 3 Cu^2+ + 2 H3AsO4 + 6 H2O'])+jus('<p>CO₃²⁻ y AsO₄³⁻ son bases conjugadas de ácidos débiles: el H₃O⁺ las protona, baja su concentración libre, Q &lt; Kps y por Le Châtelier los sólidos se disuelven (el CO₂ además se escapa). El NO₃⁻ no forma precipitados: todos los nitratos son solubles.</p>'))+
   step('b) Con HCl',chain(R`Q_{\mathrm{PbCl_2}}=4\times10^{-4}\cdot[\mathrm{Cl^-}]^2\ \ (\text{con HCl 1 M}:\ Q=4\times10^{-4}>K_{ps}=1{,}7\times10^{-5})`)+jus('<p><b>No conviene:</b> el Cl⁻ precipitaría PbCl₂ (y se perdería plomo de la solución a analizar). El HNO₃ disuelve sin agregar aniones precipitantes.</p>')),
   'a) protonación de los aniones (Le Châtelier) · b) no: precipita PbCl₂');
  ee('e8-1','EXAMEN E8 · PUNTO 1','pH para precipitar Ni(OH)₂ (NiCl₂ 0,2 M)',st('Se desea precipitar el Ni²⁺ como hidróxido en medio regulado. Calcule el pH que garantice la precipitación.'),
   jus('<p>“Garantizar la precipitación” = precipitación <b>completa</b>: que en solución quede ≤ 10⁻⁵ M de Ni²⁺. Kps Ni(OH)₂ de tabla ≈ 2,0·10⁻¹⁵ (usá el de tu tabla).</p>')+
   chain(R`\text{empieza}:\ [\mathrm{HO^-}]=\sqrt{\frac{2\times10^{-15}}{0{,}2}}=10^{-7}\Rightarrow\mathrm{pH}=7{,}0`,R`\text{completa}:\ [\mathrm{HO^-}]=\sqrt{\frac{2\times10^{-15}}{10^{-5}}}=1{,}4\times10^{-5}\Rightarrow\mathrm{pH}=9{,}15`)+jus('<p>Se trabaja en un medio regulado a pH ≥ 9,2: el buffer evita que el pH baje al consumirse HO⁻ en la precipitación.</p>'),'pH ≥ 9,15 (con Kps 2·10⁻¹⁵)');
  A.addEx('precipitacion',{group:'pev',label:'Integración y evaluaciones de precipitación',kicker:'EVALUACIONES RESUELTAS'},ev);
})();
