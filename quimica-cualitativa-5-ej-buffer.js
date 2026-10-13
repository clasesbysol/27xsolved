// 27xSOLved · Química Analítica Cualitativa 5.º · EJERCICIOS Y EVALUACIONES · Soluciones reguladoras
// Guía 2 (15, 18, 20, 21, 22), Guía 3 · reguladoras (1–12) y desafío del metotrexato, integración (grupo IV), E7 y E8 punto 2.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,step,table,figure}=K;
  const {rx,rxs,f}=Q;
  const {sup,ver,jus,desc,rta,st,addEx,spec,flow}=A;
  const R=String.raw;
  const W=rx('H2O + H2O <=> H3O^+ + HO^-','Kw');

  // ---------------- Guía 2 ----------------
  const g2=[];const e2=(n,title,statement,solution,answer)=>g2.push({id:`b-g2-${n}`,tag:`GUÍA 2 · EJ. ${n}`,title,statement,solution,answer});
  e2(15,'Funcionamiento de un buffer HCO₃⁻ / CO₃²⁻',st('Explique el funcionamiento de una solución reguladora con el sistema carbonato ácido / carbonato.'),
   desc(rxs(['NaHCO3 -> Na^+ + HCO3^-','total'],['Na2CO3 -> 2 Na^+ + CO3^2-','total'],['HCO3^- + H2O <=> CO3^2- + H3O^+','Ka₂ (pKa₂ ≈ 10,3)'])+W)+
   rxs(['CO3^2- + H3O^+ -> HCO3^- + H2O','agregado de ácido'],['HCO3^- + HO^- -> CO3^2- + H2O','agregado de base'])+
   jus('<p>Par conjugado débil con las dos formas apreciables: lo fuerte que se agrega se transforma en la especie débil del par y sólo cambia un poco el cociente [CO₃²⁻]/[HCO₃⁻]. Regula en pH ≈ pKa₂ ± 1.</p>'),'');
  e2(18,'NaOH 0,2 M + HAc 0,4 M (100 mL c/u)',st('Informe si es una solución reguladora y justifique.'),
   chain(R`n_{\mathrm{HO^-}}=20\ \mathrm{mmol}\qquad n_{\mathrm{HAc}}=40\ \mathrm{mmol}`,R`\mathrm{HAc}+\mathrm{HO^-}\to\mathrm{Ac^-}+\mathrm{H_2O}:\ \text{quedan }20\ \mathrm{mmol\ HAc}\ \text{y}\ 20\ \mathrm{mmol\ Ac^-}`)+
   jus('<p><b>Sí.</b> Se neutraliza la mitad del ácido: quedan HAc y Ac⁻ en igual cantidad. pH = pKa + log 1 = 4,74, justo en el pKa: <b>máxima capacidad reguladora</b>.</p>'),'Sí, reguladora a pH = pKa = 4,74 (máxima capacidad)');
  e2(20,'Respuesta de los reguladores del ítem 16 ante ácido o base',st('Para los sistemas reguladores del ítem 16, explique cómo responderá el sistema ante el agregado de ácido o base.'),
   jus('<p>Sólo (f) NaNO₂ + HNO₂ (1 mol de cada uno) es reguladora, con pH = pKa = 3,35.</p>')+rxs(['NO2^- + H3O^+ -> HNO2 + H2O','agrego ácido'],['HNO2 + HO^- -> NO2^- + H2O','agrego base'])+
   jus('<p>Se mueve un poco el cociente [NO₂⁻]/[HNO₂] y el pH casi no cambia mientras el agregado sea menor que los moles del componente que lo consume.</p>'),'');
  e2(21,'Ca(OH)₂ + ácido cloroacético: ¿pH 8,5?',st('Se mezclan 100 mL de Ca(OH)₂ 0,25 M con 50 mL de ácido cloroacético 0,5 M. El equipo informa pH 8,5. a) ¿Es posible? b) ¿Es reguladora?'),
   chain(R`n_{\mathrm{HO^-}}=2\cdot0{,}25\cdot100=50\ \mathrm{mmol}\qquad n_{\text{ácido}}=0{,}5\cdot50=25\ \mathrm{mmol}`,R`\text{sobran }25\ \mathrm{mmol\ HO^-}\ \text{en }150\ \mathrm{mL}\Rightarrow[\mathrm{HO^-}]=0{,}167\ \mathrm{M}\Rightarrow\mathrm{pH}=13{,}2`)+
   jus('<p>a) <b>No</b>: sobra base fuerte, el pH tiene que ser ≈ 13,2. b) <b>No</b> es reguladora: el ácido débil se consumió totalmente (no queda el componente ácido del par) y manda el exceso de base fuerte.</p>'),'a) No (pH ≈ 13,2) · b) No');
  e2(22,'Verdadero o falso',st('',['Una solución de NH₄Cl es capaz de regular el pH.','Una solución de NH₃ es ácida porque tiene amonios.','Una solución de H₂S es capaz de regular el pH.']),
   step('a) FALSO',jus('<p>Sólo está NH₄⁺; el NH₃ que forma por hidrólisis es despreciable. Falta el componente básico del par en cantidad apreciable.</p>'))+
   step('b) FALSO',jus('<p>NH₃ + H₂O ⇌ NH₄⁺ + HO⁻: los NH₄⁺ se forman junto con la misma cantidad de HO⁻, así que [HO⁻] &gt; [H₃O⁺] → básica.</p>'))+
   step('c) FALSO',jus('<p>H₂S es un ácido débil solo: HS⁻ es despreciable frente a H₂S (α ≈ 0,1 %). No hay par conjugado en cantidades comparables.</p>')),'a) F · b) F · c) F');
  A.addEx('buffer',{group:'bg2',label:'Guía 2 · soluciones reguladoras'},g2);

  // ---------------- Guía 3 · reguladoras ----------------
  const gr=[];const er=(n,title,statement,solution,answer,tag)=>gr.push({id:`b-g3-${n}`,tag:tag||`GUÍA 3 · REGULADORAS · ${n}`,title,statement,solution,answer});
  er(1,'Elegir el ácido para pH 3,1',st('¿Cuál es más adecuado para una reguladora a pH 3,1: H₂O₂ (pKa 11,65), ácido propanoico (4,874), ácido cianoacético (2,472), ácido 4-aminobencensulfónico (3,232)?'),
   table(['Ácido','pKa','pKa ± 1','|pH − pKa|'],[['H₂O₂','11,65','10,65–12,65','8,55'],['propanoico','4,874','3,87–5,87','1,77 (fuera)'],['cianoacético','2,472','1,47–3,47','0,63'],['<b>4-aminobencensulfónico</b>','3,232','2,23–4,23','<b>0,13</b>']])+
   jus('<p>Se elige el pKa más cercano al pH buscado: con relación base/ácido cercana a 1 la capacidad reguladora es máxima.</p>'),'Ácido 4-aminobencensulfónico (pKa 3,232)');
  er(2,'Cloruro de imidazol / imidazol',st('1,00 g de cloruro de imidazol y 1,00 g de imidazol (pKa 6,993) en 100 mL.',['pH inicial; ¿es reguladora?','pH tras agregar 2,30 mL de HClO₄ 1,07 M.','mL de HClO₄ 1,07 M a agregar a una solución 1 % m/V de imidazol para pH 6,993.']),
   step('a)',chain(R`n_{\mathrm{Im}}=\frac{1{,}00}{68{,}08}=14{,}69\ \mathrm{mmol}\qquad n_{\mathrm{ImH^+}}=\frac{1{,}00}{104{,}54}=9{,}57\ \mathrm{mmol}`,R`\mathrm{pH}=6{,}993+\log\frac{14{,}69}{9{,}57}=7{,}18`)+jus('<p>Sí: par conjugado débil (ImH⁺/Im) con relación 1,5, dentro de pKa ± 1. Henderson vale: [H₃O⁺] ≈ 7·10⁻⁸ ≪ 0,1 M.</p>'))+
   step('b) Primero estequiometría',chain(R`n_{\mathrm{H^+}}=2{,}30\cdot1{,}07=2{,}46\ \mathrm{mmol}`,R`\mathrm{Im}:14{,}69-2{,}46=12{,}23\qquad\mathrm{ImH^+}:9{,}57+2{,}46=12{,}03`,R`\mathrm{pH}=6{,}993+\log\frac{12{,}23}{12{,}03}=7{,}00`))+
   step('c)',jus('<p>pH = pKa ⇒ [Im] = [ImH⁺]: hay que protonar la mitad del imidazol. No depende del volumen de solución, sí de cuánto imidazol hay. Por cada 100 mL de solución 1 % (1,00 g = 14,69 mmol):</p>')+chain(R`n_{\mathrm{HClO_4}}=\frac{14{,}69}{2}=7{,}34\ \mathrm{mmol}\Rightarrow V=\frac{7{,}34}{1{,}07}=6{,}9\ \mathrm{mL}`)),
   'a) 7,18, sí · b) 7,00 · c) 6,9 mL por cada 100 mL');
  er(3,'Cloroacético + cloroacetato: Henderson no alcanza',st('0,08 mol de ácido cloroacético (pKa 2,865) + 0,04 mol de cloroacetato de sodio en 1,00 L. Calcule el pH.'),
   step('Con Henderson',chain(R`\mathrm{pH}=2{,}865+\log\frac{0{,}04}{0{,}08}=2{,}56\Rightarrow[\mathrm{H_3O^+}]=2{,}7\times10^{-3}`)+ver('<p>2,7·10⁻³ es el 6,8 % de 0,04: <b>no</b> es despreciable frente a C<sub>s</sub>. Ka es grande (1,36·10⁻³) y el ácido se disocia apreciablemente.</p>',false))+
   step('Sin despreciar',chain(R`K_a=\frac{h\,(0{,}04+h)}{0{,}08-h}\Rightarrow h^2+0{,}04136\,h-1{,}09\times10^{-4}=0`,R`h=2{,}49\times10^{-3}\ \mathrm{M}\Rightarrow\mathrm{pH}=2{,}60`))+
   note('Anotación de la guía','<p>Si los datos fueran 0,8 y 0,4 mol (cifras corregidas a mano), h sería 0,7 % de C<sub>s</sub> y Henderson (2,56) coincidiría con la cuenta exacta (2,57).</p>')+jus('<p>Henderson supone [H₃O⁺] baja respecto de Cₛ. El ácido cloroacético tiene Ka grande (1,36·10⁻³): aun con ion común se disocia apreciablemente, y la verificación lo confirma.</p>'),
   'pH = 2,60 (Henderson daría 2,56 y no verifica)');
  er(4,'Na₂CO₃ para llevar NaHCO₃ 5 % a pH 10',st('Masa de Na₂CO₃ a agregar a NaHCO₃ 5 % m/v para obtener una reguladora de pH 10 (pKa₁ 6,352; pKa₂ 10,329).'),
   chain(R`[\mathrm{HCO_3^-}]=\frac{50\ \mathrm{g/L}}{84{,}01}=0{,}595\ \mathrm{M}`,R`\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{10-10{,}329}=0{,}469\Rightarrow[\mathrm{CO_3^{2-}}]=0{,}279\ \mathrm{M}`,R`m=0{,}279\cdot105{,}99=29{,}6\ \mathrm{g\ por\ litro}`)+jus('<p>Par HCO₃⁻/CO₃²⁻ (pKa₂): pH 10 está dentro de 10,33 ± 1. Como no se da el volumen, se informa por litro (2,96 g cada 100 mL).</p>'),'29,6 g de Na₂CO₃ por litro');
  er(5,'NaOH para llevar ácido salicílico a pH 3,50',st('Volumen de NaOH 0,202 M a añadir a 25 mL de ácido salicílico 0,023 M (pKa 2,97) para pH 3,50.'),
   jus('<p>Ka = 1,07·10⁻³ es grande y las concentraciones son bajas: [H₃O⁺] = 3,2·10⁻⁴ no es despreciable frente a ~0,02 M. Se plantea el BC en lugar de Henderson: [Na⁺] + [H₃O⁺] = [Sal⁻].</p>')+
   chain(R`\alpha_{\mathrm{Sal^-}}=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}=0{,}772`,R`0{,}202\,v+3{,}16\times10^{-4}(25+v)=0{,}575\cdot0{,}772\Rightarrow v=2{,}16\ \mathrm{mL}`)+
   note('Con Henderson','<p>Daría 2,20 mL: la diferencia es chica, pero el planteo con BC es el correcto.</p>'),'≈ 2,2 mL');
  er(6,'Reguladora de pH 5,50 con oxoacético',st('¿Cómo preparar una reguladora de pH 5,50 con oxoacetato de sodio 0,100 M, ácido oxoacético (pKa 3,46), HCl 1,0 M y NaOH 1,0 M? (sin cálculos)'),
   jus('<p>El par oxoacético/oxoacetato regula en 3,46 ± 1 = 2,46–4,46. pH 5,50 está <b>fuera</b> del rango: haría falta una relación base/ácido de 10<sup>2,04</sup> ≈ 110, con el componente ácido casi despreciable. Se podría “ajustar” el pH agregando apenas HCl al oxoacetato, pero <b>no sería una buena reguladora</b> (capacidad mínima frente a bases). Hay que elegir otro par con pKa cercano a 5,5.</p>'),'No es posible una buena reguladora con ese par');
  er(7,'Fosfato 0,01 M para el plasma a pH 8,5',st('El ortofosfato 0,01 M regula el plasma a pH 7,4. ¿Será útil si el pH fuera 8,5? (pKa 2,148; 7,199; 12,15)'),
   jus('<p>El par útil es H₂PO₄⁻/HPO₄²⁻ (pKa₂ 7,199): regula entre 6,2 y 8,2. A pH 8,5 la relación HPO₄²⁻/H₂PO₄⁻ = 10<sup>1,3</sup> = 20: el H₂PO₄⁻ queda casi agotado y no puede neutralizar bases. <b>No será útil.</b></p>'),'No');
  er(8,'¿La solución fisiológica regula?',st('Solución 0,9 % m/V de NaCl. ¿Es reguladora?'),jus('<p><b>No.</b> Na⁺ y Cl⁻ vienen de electrolitos fuertes: no hay par conjugado débil. Su pH es el del agua y cualquier agregado lo cambia.</p>'),'No');
  er(9,'Reguladora de pH 2 con Na₂SO₄ y H₂SO₄',st('Diseñe una reguladora de pH 2 con sulfato de sodio y ácido sulfúrico. pKa₂ = 1,2.'),
   jus('<p>Par HSO₄⁻/SO₄²⁻; pH 2 está en 1,2 ± 1. El H₂SO₄ aporta HSO₄⁻ (1.ª disociación total y su H⁺ protona sulfato): H₂SO₄ + SO₄²⁻ → 2 HSO₄⁻. Pero Ka₂ es grande y [H₃O⁺] = 0,01 M no es despreciable frente a las concentraciones: se diseña con el BC, no con Henderson.</p>')+
   chain(R`\text{a pH 2: }\alpha_{\mathrm{HSO_4^-}}=\frac{0{,}01}{0{,}01+0{,}063}=0{,}137\qquad\alpha_{\mathrm{SO_4^{2-}}}=0{,}863`,[R`\text{BC: }2n+0{,}01=(n+x)(\alpha_{\mathrm{HSO_4^-}}+2\alpha_{\mathrm{SO_4^{2-}}})`,'n = mol Na₂SO₄, x = mol H₂SO₄ por litro'],R`\text{con }x=0{,}050\ \mathrm{mol\ H_2SO_4}\Rightarrow n=0{,}61\ \mathrm{mol\ Na_2SO_4}`,R`[\mathrm{HSO_4^-}]=0{,}090\qquad[\mathrm{SO_4^{2-}}]=0{,}568\quad(\text{cociente }6{,}3=10^{0{,}8}\ \checkmark)`),
   'Por litro: 0,050 mol de H₂SO₄ + 0,61 mol de Na₂SO₄ (una opción)');
  er(10,'Carbonato en el plasma',st('Relación de concentraciones de especies del ácido carbónico para mantener pH 7,4 (pKa₁ 6,36; pKa₂ 10,33), con 4 L de sangre.'),
   chain(R`\frac{[\mathrm{HCO_3^-}]}{[\mathrm{H_2CO_3}]}=10^{7{,}4-6{,}36}=11\qquad\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{7{,}4-10{,}33}=1{,}2\times10^{-3}`)+jus('<p>El volumen no influye: Henderson depende del cociente. El par activo es H₂CO₃/HCO₃⁻; el CO₃²⁻ es despreciable.</p>'),'HCO₃⁻ : H₂CO₃ = 11 : 1');
  er(11,'Grupo 3: reguladora de pH 10 y sulfuro',st('Justifique por qué la reguladora de pH 10 aumenta la concentración de sulfuros (pKa₁ 6,97; pKa₂ 15).'),
   chain(R`\alpha_{\mathrm{S^{2-}}}=\frac{K_{a1}K_{a2}}{[\mathrm{H_3O^+}]^2+K_{a1}[\mathrm{H_3O^+}]+K_{a1}K_{a2}}`,R`\mathrm{pH}\ 10:\ \alpha=1\times10^{-5}\qquad\mathrm{pH}\ 1:\ \alpha=1\times10^{-20}`)+
   jus('<p>Al bajar [H₃O⁺], el equilibrio H₂S ⇌ HS⁻ ⇌ S²⁻ se desplaza hacia el S²⁻ (Le Châtelier): la fracción de sulfuro libre aumenta unas 10¹⁵ veces respecto del medio ácido, y precipitan sulfuros de Kps mayores (grupo III). El buffer mantiene el pH aunque la precipitación libere H₃O⁺.</p>'),'');
  er(12,'Buffer de borato a pH 10 para baño de pies',st('Ácido bórico y sus sales (80 % de pureza) en 500 mL a pH 10. pKa₁ 9,14; pKa₂ 12,7; pKa₃ 13,8.'),
   chain(R`\frac{[\mathrm{H_2BO_3^-}]}{[\mathrm{H_3BO_3}]}=10^{10-9{,}14}=7{,}24`)+jus('<p>Par H₃BO₃/H₂BO₃⁻ (pKa₁): pH 10 está dentro de 9,14 ± 1 (algo lejos del pKa, capacidad menor que la máxima). No se da la concentración total: elegimos 0,10 M.</p>')+
   chain(R`[\mathrm{H_3BO_3}]=0{,}0121\ \mathrm{M}\to6{,}06\times10^{-3}\ \mathrm{mol}\to\frac{0{,}375\ \mathrm{g}}{0{,}80}=0{,}47\ \mathrm{g}`,R`[\mathrm{NaH_2BO_3}]=0{,}0879\ \mathrm{M}\to0{,}0439\ \mathrm{mol}\to\frac{3{,}68\ \mathrm{g}}{0{,}80}=4{,}6\ \mathrm{g}`),
   'Relación 7,24 : 1 (con 0,10 M total: 0,47 g de ácido y 4,6 g de borato)');

  er('mtx','Desafío · metotrexato inyectable (pH 7,5–9,0)',st('Disponibles: H₃PO₄ 85 % (pKa 2,148; 7,199; 12,15), NaOH 98 %, Ca(OH)₂ 85 %, HNO₃ 63 %, NH₃ 28 % m/v (pKa 9,26), Na₃PO₄ 99 %, NH₄NO₃ 92,5 %, H₃BO₃ 99 % (pKa₁ 9,14).',['Componentes ideales con la mayor capacidad reguladora posible.','Describa el sistema y la relación ácido/base.','Cantidades para 100 L.','¿Otro par posible? ¿Acetato de amonio?','BM y BC del acetato de amonio; ¿su pH depende de la concentración? ¿Por qué HCl pH 2 + acético se resuelve despreciando el acético?']),
   step('1) Elección',table(['Par','pKa','pH del rango más cercano','Distancia'],[['H₂PO₄⁻/HPO₄²⁻','7,20','7,5','0,30'],['NH₄⁺/NH₃','9,26','9,0','0,26'],['<b>H₃BO₃/H₂BO₃⁻</b>','9,14','9,0','<b>0,14</b>']])+jus('<p>Máxima capacidad = pH lo más cerca posible del pKa. El borato a pH 9,0 es el de menor distancia. Se prepara con H₃BO₃ + NaOH (neutralización parcial). El fosfato a pH 7,5 es una alternativa (más biocompatible) con algo menos de capacidad.</p>'))+
   step('2) Sistema y relación',desc(rxs(['H3BO3 + HO^- -> H2BO3^- + H2O','neutralización parcial'],['H3BO3 + H2O <=> H2BO3^- + H3O^+','Ka₁'])+W)+chain(R`\frac{[\mathrm{H_2BO_3^-}]}{[\mathrm{H_3BO_3}]}=10^{9{,}0-9{,}14}=0{,}72`))+
   step('3) 100 L (eligiendo C total 0,10 M)',chain(R`n_{\mathrm{H_3BO_3}}=0{,}10\cdot100=10\ \mathrm{mol}\to\frac{618{,}3\ \mathrm{g}}{0{,}99}=624\ \mathrm{g}`,R`n_{\mathrm{NaOH}}=n_{\mathrm{H_2BO_3^-}}=10\cdot\frac{0{,}72}{1{,}72}=4{,}20\ \mathrm{mol}\to\frac{168\ \mathrm{g}}{0{,}98}=171\ \mathrm{g}`))+
   step('4) Otros pares',jus('<p>a) Sí: H₂PO₄⁻/HPO₄²⁻ (H₃PO₄ + NaOH, o Na₃PO₄ + HNO₃) para la parte baja del rango, o NH₄⁺/NH₃ (NH₃ + NH₄NO₃), poco recomendable en un inyectable. b) Acetato de amonio no: su pH es ≈ 7 y no tiene ningún par con las dos formas apreciables en 7,5–9,0 (Ac⁻/HAc regula en 4,74; NH₄⁺ sin NH₃ apreciable).</p>'))+
   step('5) Acetato de amonio y el ácido acético',chain(R`\text{BM: }C=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{Ac^-}]+[\mathrm{HAc}]`,R`\text{BC: }[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`,R`\mathrm{pH}=\tfrac12(\mathrm{p}K_w+\mathrm{p}K_a-\mathrm{p}K_b)\ \text{no depende de }C`)+jus('<p>HCl a pH 2 + acético: por ion común el acético se disocia ≈ 0,1 % ([Ac⁻]/[HAc] = Ka/[H₃O⁺]), así que en el BC [Ac⁻] ≪ [Cl⁻] (ver Examen E2 punto 2).</p>')),
   'Borato (H₃BO₃ + NaOH) a pH 9,0, relación 0,72','GUÍA 3 · DESAFÍO METOTREXATO');
  A.addEx('buffer',{group:'bg3',label:'Guía 3 · soluciones reguladoras y desafío'},gr);

  // ---------------- Integración y evaluaciones ----------------
  const ev=[];const ee=(id,tag,title,statement,solution,answer)=>ev.push({id,tag,title,statement,solution,answer});
  ee('int1-3','GUÍA 4 · INTEGRACIÓN 1 · PUNTO 3','Grupo IV: ¿se usan reguladoras?',st('El cuarto grupo comienza con (NH₄)₂CO₃ en medio NH₃/NH₄Cl, precipitando CaCO₃, SrCO₃ y BaCO₃. Justifique si se usan soluciones reguladoras y analice el sistema con máxima capacidad.'),
   desc(rxs(['NH4Cl -> NH4^+ + Cl^-','total'],['NH3 + H2O <=> NH4^+ + HO^-','Kb = 1,8·10⁻⁵'],['(NH4)2CO3 -> 2 NH4^+ + CO3^2-','total'],['CO3^2- + H2O <=> HCO3^- + HO^-','Kb = Kw/Ka₂']))+
   jus('<p><b>Sí:</b> NH₃/NH₄Cl es un par conjugado débil con las dos formas apreciables → reguladora (pH ≈ 9,26 ± 1). Mantiene el medio básico para que el CO₃²⁻ no se protone (y precipiten los carbonatos) y, por ion común (NH₄⁺), limita [HO⁻] para que no precipite Mg(OH)₂ (queda en el grupo V). Máxima capacidad: [NH₃] = [NH₄⁺] → pH = pKa = 9,26.</p>'),'Sí: NH₃/NH₄⁺, máxima capacidad en pH 9,26');
  ee('e7-1','EXAMEN E7 · PUNTO 1','Factor VIII: regulador para pH 7,2–7,4',st('Sistema con especies de ácido acético (Ka 1,8·10⁻⁵) o de hidrazina (Kb 9,5·10⁻⁷). Materia prima al 98 %, contraiones Na⁺ o Cl⁻.',['Sistema ideal y compuestos.','Descripción cuali y cuantitativa.','Cantidades para 500 L con máxima capacidad, justificando los desprecios.']),
   step('a) Elección',chain(R`\mathrm{HAc}:\ \mathrm{p}K_a=4{,}74\ (\text{regula }3{,}7\text{–}5{,}7)`,R`\mathrm{N_2H_5^+}:\ \mathrm{p}K_a=14-6{,}02=7{,}98\ (\text{regula }6{,}98\text{–}8{,}98)`)+jus('<p>Sólo la hidrazina tiene el rango 7,2–7,4 dentro de pKa ± 1. Compuestos: hidrazina (N₂H₄) y cloruro de hidrazinio (N₂H₅Cl).</p>'))+
   step('b) Descripción',desc(rxs(['N2H5Cl -> N2H5^+ + Cl^-','total'],['N2H4 + H2O <=> N2H5^+ + HO^-','Kb = 9,5·10⁻⁷'])+W+chain(R`\text{BM: }C_b+C_a=[\mathrm{N_2H_4}]+[\mathrm{N_2H_5^+}]\qquad\text{BC: }[\mathrm{N_2H_5^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`))+sup([['[N₂H₄] ≈ C<sub>b</sub> y [N₂H₅⁺] ≈ C<sub>a</sub>','por ion común la base casi no se protona y el ácido casi no se disocia; [HO⁻] (≈ 10⁻⁶,⁷) y [H₃O⁺] ≪ concentraciones.']]))+
   step('c) Cantidades',jus('<p>Máxima capacidad: lo más cerca posible del pKa (7,98) dentro del rango pedido → pH 7,4 (o 7,3 al centro). Con pH 7,3 y concentración total elegida 0,10 M:</p>')+chain(R`\frac{[\mathrm{N_2H_4}]}{[\mathrm{N_2H_5^+}]}=10^{7{,}3-7{,}98}=0{,}21`,R`[\mathrm{N_2H_4}]=0{,}0174\ \mathrm{M}\to8{,}68\ \mathrm{mol}\to\frac{278\ \mathrm{g}}{0{,}98}=284\ \mathrm{g}`,R`[\mathrm{N_2H_5Cl}]=0{,}0826\ \mathrm{M}\to41{,}3\ \mathrm{mol}\to\frac{2831\ \mathrm{g}}{0{,}98}=2{,}89\ \mathrm{kg}`)+ver('<p>[HO⁻] = 10⁻⁶,⁷ = 2·10⁻⁷ ≪ 0,017 ✔ → Henderson válido.</p>')),
   'Hidrazina / cloruro de hidrazinio (pKa 7,98)');
  ee('e7-2','EXAMEN E7 · PUNTO 2','Balances, sulfato de amonio y cloroacetato',st('',['Significado del BM y del BC.','¿El sulfato de amonio es reguladora? (Ka₂ 1,2·10⁻²; Kb 1,8·10⁻⁵)','pH de cloroacetato de potasio 0,1 M.']),
   step('a)',jus('<p><b>BM:</b> la materia no se crea ni se destruye: lo que se disolvió se reparte entre todas sus especies (HAc + Ac⁻ = C). <b>BC:</b> la solución es eléctricamente neutra: Σ cargas + = Σ cargas − (cada concentración por su carga).</p>'))+
   step('b) (NH₄)₂SO₄',jus('<p><b>No.</b> NH₄⁺ es ácido débil sin NH₃ apreciable; SO₄²⁻ es base muy débil (Kb = Kw/Ka₂ = 8·10⁻¹³) sin HSO₄⁻ apreciable. Ningún par tiene sus dos formas en cantidades comparables.</p>'))+
   step('c) Cloroacetato 0,1 M',chain(R`K_b=\frac{10^{-14}}{1{,}4\times10^{-3}}=7{,}1\times10^{-12}`,R`[\mathrm{HO^-}]=\sqrt{7{,}1\times10^{-13}}=8{,}5\times10^{-7}\ \mathrm{M}\Rightarrow\mathrm{pH}=7{,}93`)+ver('<p>El agua aporta [H₃O⁺] ≈ 1,2·10⁻⁸, 1,4 % del HO⁻: despreciable al límite ✔</p>')),
   'b) No · c) pH 7,93');
  ee('e8-2','EXAMEN E8 · PUNTO 2','Diseñar el buffer 1 unidad por encima',st('Diseñe la solución reguladora de pH 1 unidad mayor que el calculado en el punto 1 (pH ≈ 9,15 → 10,15), en moles para 1 L. (Si no hizo el 1, a pH 9.)'),
   step('pH 10,15',jus('<p>Con la tabla: HCO₃⁻/CO₃²⁻ (pKa₂ = 10,25) es el más cercano (NH₄⁺/NH₃, 9,26, queda casi en el borde).</p>')+chain(R`\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}=10^{10{,}15-10{,}25}=0{,}79`,R`\text{con }0{,}20\ \mathrm{M}\ \text{total}:\ 0{,}089\ \mathrm{mol\ Na_2CO_3}+0{,}111\ \mathrm{mol\ NaHCO_3}`))+
   step('Alternativa pH 9',chain(R`\mathrm{NH_3/NH_4Cl}:\ \frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=10^{9-9{,}26}=0{,}56`)),
   'NaHCO₃ / Na₂CO₃ en relación 1 : 0,79');
  A.addEx('buffer',{group:'bev',label:'Integración y evaluaciones de soluciones reguladoras',kicker:'EVALUACIONES RESUELTAS'},ev);
})();
