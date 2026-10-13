// 27xSOLved · Química Analítica Cualitativa 5.º · PARA LA CLASE (2/2): Precipitación, Redox y Complejos.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,idea,warn,note,example,step,table,figure}=K;
  const {rx,rxs,f,punch,vira}=Q;
  const {sup,ver,flow,memo,jus,sys,lc,ladder,spec,draw}=A;
  const R=String.raw;
  const data=window.ET27_QAC5;data.clase=data.clase||[];
  const SH=data.shared||{};
  const prac=(uid,list)=>`<div class="qacPrac">${list.map(([id,l])=>`<button type="button" data-result-go="qac:${uid}:qac-ej-${id}"><span>Ejercicio</span><b>${l}</b></button>`).join('')}</div>`;
  const unit=(id,n,title,lead,blocks)=>data.clase.push({id,n,title,short:(data.units.find(x=>x.id===id)||{}).short,lead,sections:blocks.map(([k,l,h],i)=>({key:`qac-cl-${id}-${k}`,label:l,kicker:`CLASE · ${String(i+1).padStart(2,'0')}`,html:h}))});

  // =====================================================================
  unit('precipitacion',4,'Equilibrio de precipitación','Recorrido: Kps y solubilidad → Q frente a Kps → ion común → ¿precipita al mezclar? → precipitación fraccionada → el pH.',[
  ['kps','1 · Kps y solubilidad',`
${rxs(['AgCl(s) <=> Ag^+ + Cl^-','Kps = [Ag⁺][Cl⁻]'],['Ag2CrO4(s) <=> 2 Ag^+ + CrO4^2-','Kps = [Ag⁺]²[CrO₄²⁻]'])}
${jus('<p>Es un equilibrio heterogéneo: el sólido no entra en la constante. Por cada mol que se disuelve aparecen m·s y n·s de cada ion, y el coeficiente también se eleva.</p>')}
${table(['Tipo','Kps','s'],[['AB',m(R`s^2`),m(R`\sqrt{K_{ps}}`)],['AB₂ o A₂B',m(R`4s^3`),m(R`\sqrt[3]{K_{ps}/4}`)],['AB₃',m(R`27s^4`),m(R`\sqrt[4]{K_{ps}/27}`)]])}
${warn('Comparar Kps','<p>Sólo entre sales del mismo tipo. AgCl (1,8·10⁻¹⁰) es MENOS soluble que Ag₂CrO₄ (1,1·10⁻¹²): hay que calcular s.</p>')}
`],
  ['q','2 · Q frente a Kps',`
${figure(draw.qkps,'Q con las concentraciones de ahora; Kps, las del equilibrio.')}
${flow([['Al mezclar','primero diluir cada concentración en el volumen total.'],['Q &gt; Kps','precipita hasta Q = Kps.'],['Precipitación completa','queda ≤ 10⁻⁵ M del ion.']])}
`],
  ['ioncomun','3 · Ion común',`
${example('AgCl en NaCl 0,010 M','',
 step('Planteo',sys({rx:[['NaCl -> Na^+ + Cl^-','','total'],['AgCl(s) <=> Ag^+ + Cl^-',R`K_{ps}=[\mathrm{Ag^+}][\mathrm{Cl^-}]`]],bm:[R`[\mathrm{Ag^+}]=s\qquad[\mathrm{Cl^-}]=0{,}010+s`]}))+
 step('Justificación',jus('<p>Por ion común (Le Châtelier) el Cl⁻ del NaCl desplaza la disolución hacia el sólido: es razonable suponer s baja respecto de 0,010 en el BM del cloruro.</p>'))+
 chain(R`s=\frac{1{,}8\times10^{-10}}{0{,}010}=1{,}8\times10^{-8}\ \mathrm{M}`)+ver('<p>s respecto de 0,010: 2·10⁻⁴ % ✔</p>'),'740 veces menos soluble que en agua')}
`],
  ['fraccionada','4 · Precipitación fraccionada',`
${figure(draw.fraccionada,'Precipita primero el que necesita menos reactivo para llegar a su Kps.')}
${flow([['1','Calcular cuánto reactivo necesita cada ion para empezar a precipitar.'],['2','El que necesita menos, precipita primero.'],['3','Con la concentración a la que empieza el segundo, calcular cuánto queda del primero (Kps).'],['4','Si queda ≤ 0,1 % (o ≤ 10⁻⁵ M), la separación es buena.']])}
`],
  ['ph','5 · El pH controla la precipitación',`
${flow([['Hidróxidos','[HO⁻] la fija el pH: cada catión tiene un pH de inicio y uno de precipitación completa.'],['Sales de ácidos débiles (S²⁻, CO₃²⁻, F⁻)','el H₃O⁺ protona el anión, baja su concentración libre, Q &lt; Kps y el sólido se disuelve (Le Châtelier).']])}
${lc('NH3 + H2O <=> NH4^+ + HO^-','se agrega NH₄Cl (ion común) en el grupo III','←',[['[HO⁻]','↓']],'Baja [HO⁻]: el Mg(OH)₂ no llega a su Kps y queda en solución, mientras el Fe(OH)₃ precipita.')}
${chain([R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}`,'más ácido → menos sulfuro → sólo precipitan los de Kps muy chico (grupo II)'])}
`],
  ['practica','6 · Para practicar',`
${prac('precipitacion',[['p-g4-1a','Kps del AgI'],['p-g4-3a','Fe(OH)₃ en NaOH'],['p-g4-4','BaSO₄ que queda'],['p-g4-6','Mg²⁺ en buffer'],['p-g4-8a','¿Qué precipita primero?'],['p-g4-9','CoS a pH 3']])}
`]
  ]);

  // =====================================================================
  unit('redox',5,'Equilibrio redox','Recorrido: oxidante y reductor → ion-electrón (ácido y básico) → pilas con dos fórmulas → Nernst → constante de equilibrio.',[
  ['conceptos','1 · Oxidante y reductor',`
${table(['','Electrones','N.º de oxidación','Es el…'],[['Se oxida','pierde','sube','reductor'],['Se reduce','gana','baja','oxidante']])}
${punch('El oxidante se reduce (le saca electrones al otro); el reductor se oxida.')}
`],
  ['ion','2 · Ion-electrón paso a paso',`
${flow([['1','Hemirreacciones con las especies que cambian (como iones).'],['2','Balancear todo menos O y H.'],['3','O con H₂O.'],['4','H con H⁺ (en básico: después sumar HO⁻ a ambos lados).'],['5','Carga con e⁻.'],['6','Igualar electrones y sumar.'],['7','Controlar átomos y carga.']])}
${rxs(['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O','reducción'],['Fe^2+ -> Fe^3+ + e^-','oxidación (× 6)'],['Cr2O7^2- + 14 H^+ + 6 Fe^2+ -> 2 Cr^3+ + 6 Fe^3+ + 7 H2O','global, n = 6'])}
${jus('<p>Se igualan los electrones porque los que pierde el reductor son exactamente los que gana el oxidante; la carga total tiene que dar igual a ambos lados (+24 = +24).</p>')}
`],
  ['pilas','3 · Pilas: las dos fórmulas',`
${SH.pila?figure(SH.pila,'Ánodo: oxidación (−). Cátodo: reducción (+).'):''}
${key(R`E^\circ=E^\circ_{cát}-E^\circ_{án}\qquad\Delta G^\circ=-nFE^\circ`,'Pilas')}
${jus('<p>Se reduce la especie de mayor potencial de reducción (cátodo). E° &gt; 0 ⇔ ΔG° &lt; 0: espontánea. E° no se multiplica al balancear.</p>')}
`],
  ['nernst','4 · Nernst y el denominador',`
${key(R`E=E^\circ-\frac{0{,}0592}{n}\log Q`,'Nernst (25 °C)')}
${flow([['0,0592','= 2,303 RT/F a 25 °C; a otra temperatura cambia.'],['Si duplico la ecuación','n se duplica pero log Q también: E no cambia.'],['En la pila','n es el total de electrones de la ecuación balanceada (y Q tiene que ser de esa misma ecuación).'],['H⁺ en la hemirreacción','el potencial depende del pH (MnO₄⁻, Cr₂O₇²⁻ oxidan más en medio ácido).']])}
`],
  ['equilibrio','5 · Constante de equilibrio',`
${chain([R`E=0\ \text{y}\ Q=K\ \Rightarrow\ \log K=\frac{nE^\circ}{0{,}0592}`,'condición de equilibrio'])}
${jus('<p>En el equilibrio la pila ya no da corriente: los dos electrodos tienen el mismo potencial. Si el voltímetro marca algo distinto de 0, el sistema todavía no está en equilibrio.</p>')}
${example('Ni²⁺ + Zn','',chain(R`E^\circ=-0{,}25-(-0{,}76)=0{,}51\ \mathrm{V}`,R`\log K=\frac{2\cdot0{,}51}{0{,}0592}=17{,}2`),'K ≈ 10¹⁷: prácticamente completa')}
`],
  ['practica','6 · Para practicar',`
${prac('redox',[['r-g4-20','K dicromato + Sn'],['r-g4-21','Fe y Sn'],['r-g4-23','Pila Cr / Mn'],['r-g4-24','Kps desde potenciales'],['e8-5','Ni²⁺ + Zn (examen)']])}
`]
  ]);

  // =====================================================================
  unit('complejos',6,'Equilibrio de complejación','Recorrido: qué es un complejo → Kf y Ki → el patrón de los ejercicios → ligando limitante → combinados con precipitación y ácido.',[
  ['que-es','1 · Qué es un complejo',`
${figure(draw.complejo,'El ligando (base de Lewis) dona pares al ion central (ácido de Lewis).')}
${key(R`K_f=\frac{[\mathrm{ML_n}]}{[\mathrm{M}][\mathrm{L}]^n}\qquad K_i=K_d=\frac{1}{K_f}`,'Formación e inestabilidad')}
${idea('¿Cuál me dieron?','<p>Número enorme: Kf. Número chiquito: Ki. Escribir la reacción en el sentido de la constante dada.</p>')}
`],
  ['patron','2 · El patrón de los ejercicios',`
${example('Ag⁺ 0,010 M en NH₃ 1,0 M (Ki 5,9·10⁻⁸)','',
 step('Planteo',sys({rx:[['[Ag(NH3)2]^+ <=> Ag^+ + 2 NH3',R`K_i=\frac{[\mathrm{Ag^+}][\mathrm{NH_3}]^2}{[\mathrm{Ag(NH_3)_2^+}]}`]],bm:[R`0{,}010=[\mathrm{Ag^+}]+[\mathrm{Ag(NH_3)_2^+}]`,R`1{,}0=[\mathrm{NH_3}]+2[\mathrm{Ag(NH_3)_2^+}]`]}))+
 step('Justificación',jus('<p>Es razonable suponer [Ag⁺] baja respecto de [Ag(NH₃)₂⁺] en el BM de la plata: Ki muy chica (complejo estable) y NH₃ en exceso (Le Châtelier: reprime la disociación).</p>'))+
 chain(R`[\mathrm{Ag(NH_3)_2^+}]\approx0{,}010\qquad[\mathrm{NH_3}]=1{,}0-0{,}020=0{,}98`,R`[\mathrm{Ag^+}]=\frac{5{,}9\times10^{-8}\cdot0{,}010}{0{,}98^2}=6{,}1\times10^{-10}\ \mathrm{M}`)+ver('<p>[Ag⁺] respecto de 0,010: 6·10⁻⁶ % ✔</p>'),'[Ag⁺] = 6,1·10⁻¹⁰ M')}
${punch('Siempre: todo el metal como complejo · ligando libre = total − n·metal · reemplazar en K · verificar.')}
`],
  ['limitante','3 · Si el que falta es el ligando',`
${jus('<p>Con metal en exceso, el ligando se consume casi todo: ahora lo despreciable es el ligando libre (respecto del total de ligando). El complejo lo fija el ligando y el metal libre es lo que sobra.</p>')}
${chain(R`[\mathrm{ML_n}]=\frac{C_L}{n}\qquad[\mathrm{M}]=C_M-\frac{C_L}{n}\qquad[\mathrm{L}]=\sqrt[n]{\frac{[\mathrm{ML_n}]}{K_f[\mathrm{M}]}}`)}
`],
  ['combinados','4 · Combinados: disolver y reprecipitar',`
${rxs(['AgCl(s) + 2 NH3 <=> [Ag(NH3)2]^+ + Cl^-','K = Kps·Kf ≈ 3·10⁻³: se disuelve'],['[Ag(NH3)2]^+ + Cl^- + 2 H^+ -> AgCl(s)↓ + 2 NH4^+','K ≈ 10²¹: la prueba de la plata'])}
${jus('<p>Sumar reacciones es multiplicar constantes. El NH₃ disuelve el AgCl porque baja la Ag⁺ libre (Q &lt; Kps); el ácido rompe el complejo porque protona el NH₃ y libera la Ag⁺, que vuelve a superar el Kps con el Cl⁻ (Le Châtelier).</p>')}
`],
  ['practica','5 · Para practicar',`
${prac('complejos',[['c-24-1','[HgI₄]²⁻ exceso y defecto'],['c-24-4','Zn²⁺ con cianuro'],['c-24-7','[Ag(CN)₂]⁻'],['c-24-16','NaCl máximo'],['c-g2-17','Cobre con amoníaco'],['int1-1','Identificación de plata']])}
`]
  ]);
})();
