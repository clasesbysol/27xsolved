// 27xSOLved · Química Analítica Cualitativa 5.º · SOLUCIONES REGULADORAS (buffer)
// Qué son y cómo funcionan, criterios para que una solución sea reguladora, Henderson (cuándo sí y cuándo NO),
// pH = pKa y máxima capacidad, elegir y diseñar un buffer, agregados y dilución, sistemas que no regulan.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const {sup,ver,flow,memo,spec,jus,desc}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-bf-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('que-es','Qué es una solución reguladora y cómo funciona','BUFFER',`
<p>Una solución reguladora (buffer, amortiguadora) <b>resiste los cambios de pH</b> cuando se le agregan pequeñas cantidades de ácido o base fuerte, o cuando se diluye. Se arma con un <b>par conjugado débil</b> con las dos formas en cantidades apreciables.</p>
${figure(A.draw.buffer,'El componente básico del par “se come” el H⁺ agregado y el componente ácido “se come” el OH⁻: lo fuerte se transforma en débil.')}
${table(['Tipo','Ejemplo','Componente ácido','Componente básico'],[
 ['Ácido débil + su sal','HAc + NaAc',f('HAc'),f('Ac^-')],
 ['Base débil + su sal','NH₃ + NH₄Cl',f('NH4^+'),f('NH3')],
 ['Dos sales de un poliprótico','NaHCO₃ + Na₂CO₃',f('HCO3^-'),f('CO3^2-')],
 ['Neutralización parcial','HAc en exceso + NaOH','el HAc que sobra','el Ac⁻ formado']
])}
${example('Explicar el funcionamiento (modelo con HCO₃⁻ / CO₃²⁻)','<p>Explicar cómo regula un buffer de carbonato ácido / carbonato (pKa₂ = 10,33).</p>',
 step('Descripción',desc(rxs(['NaHCO3 -> Na^+ + HCO3^-','total'],['Na2CO3 -> 2 Na^+ + CO3^2-','total'],['HCO3^- + H2O <=> CO3^2- + H3O^+','Ka₂ = 4,7·10⁻¹¹'],['H2O + H2O <=> H3O^+ + HO^-','Kw'])))+
 step('Si se agrega ácido',rx('CO3^2- + H3O^+ -> HCO3^- + H2O')+jus('<p>El CO₃²⁻ (base) consume el H₃O⁺ agregado: el ácido fuerte se transforma en HCO₃⁻, un ácido débil. Cambia un poco la relación [CO₃²⁻]/[HCO₃⁻] y el pH casi no cambia.</p>'))+
 step('Si se agrega base',rx('HCO3^- + HO^- -> CO3^2- + H2O')+jus('<p>El HCO₃⁻ (ácido) neutraliza el HO⁻ agregado y lo transforma en CO₃²⁻, base débil.</p>'))+
 step('Por qué el pH casi no cambia',jus('<p>'+m(R`\mathrm{pH}=\mathrm{p}K_{a2}+\log\frac{[\mathrm{CO_3^{2-}}]}{[\mathrm{HCO_3^-}]}`)+': el log de un cociente cercano a 1 varía muy poco aunque cambien un poco las cantidades. Funciona alrededor de pH 10,33 ± 1.</p>')),
 'Par conjugado débil + las dos formas apreciables = regulación')}
`);

  // =====================================================================
  add('criterios','Criterios: ¿es o no es una solución reguladora?','BUFFER',`
${flow([
 ['1. Tiene que haber un par conjugado DÉBIL','ácido débil y su base conjugada (o base débil y su ácido conjugado). Pares de electrolitos fuertes (HCl/Cl⁻, NaOH/Na⁺) no regulan: el Cl⁻ no capta H⁺.'],
 ['2. Las dos formas en cantidades apreciables','relación entre 1:10 y 10:1, es decir <b>pH dentro de pKa ± 1</b>. Si una forma es despreciable, no hay quien neutralice ese lado.'],
 ['3. Concentraciones altas frente a [H₃O⁺] y [HO⁻]','si el buffer está muy diluido, cualquier agregado lo supera.'],
 ['4. Sin exceso de ácido o base fuerte','si sobra fuerte después de mezclar, manda el fuerte y no hay regulación.']
])}
${table(['Sistema','¿Regula?','Por qué'],[
 ['HAc + NaAc (comparables)','sí','par débil, ambas formas apreciables'],
 ['NH₃ + NH₄Cl','sí (pH ≈ 9,26 ± 1)','par débil NH₄⁺/NH₃'],
 ['NaOH 0,2 M + HAc 0,4 M (mismo volumen)','sí, en el pKa','neutralización parcial: queda la mitad HAc y la mitad Ac⁻'],
 ['NH₄Cl solo','<b>no</b>','falta NH₃ en cantidad apreciable (sólo la poquita de la hidrólisis)'],
 ['NH₃ solo','<b>no</b>','falta NH₄⁺ apreciable'],
 ['H₂S solo','<b>no</b>','HS⁻ y S²⁻ son despreciables frente a H₂S'],
 ['NaCl (solución fisiológica)','<b>no</b>','iones de electrolitos fuertes, sin comportamiento ácido-base'],
 ['(NH₄)₂SO₄','<b>no</b>','NH₄⁺ sin NH₃; SO₄²⁻ casi sin HSO₄⁻'],
 ['Ca(OH)₂ en exceso + ácido débil','<b>no</b>','sobra base fuerte: el ácido se consumió todo']
],'compareTable')}
`);

  // =====================================================================
  add('henderson','Henderson–Hasselbalch: cuándo SÍ y cuándo NO','BUFFER',`
${chain([R`K_a=\frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}\ \Rightarrow\ [\mathrm{H_3O^+}]=K_a\frac{[\mathrm{HA}]}{[\mathrm{A^-}]}`],[R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}`,'exacta (es la misma Ka)'])}
<p>Hasta acá no se supuso nada. El paso que sí supone algo es reemplazar las concentraciones de equilibrio por las <b>analíticas</b>:</p>
${sup([['[HA] ≈ C<sub>a</sub> y [A⁻] ≈ C<sub>s</sub>','por ion común: el A⁻ reprime la disociación del HA y el HA reprime la hidrólisis del A⁻. Lo que cambia (≈ [H₃O⁺] o [HO⁻]) es despreciable frente a C<sub>a</sub> y C<sub>s</sub>.']],'Lo que supone Henderson')}
${key(R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_s}{C_a}=\mathrm{p}K_a+\log\frac{n_{base}}{n_{ácido}}`,'Henderson–Hasselbalch')}
${ver('<p>Siempre: calcular [H₃O⁺] (y [HO⁻]) y comprobar que son ≤ 5 % de C<sub>a</sub> y de C<sub>s</sub>.</p>')}
<h3>Cuándo NO se puede usar</h3>
${table(['Situación','Por qué falla','Qué hacer'],[
 ['Ka grande y concentraciones bajas','[H₃O⁺] deja de ser chica frente a C<sub>s</sub> o C<sub>a</sub>','resolver con Ka: '+m(R`K_a=\frac{h\,(C_s+h)}{C_a-h}`)],
 ['Buffer muy diluido','idem: el agua y la disociación pesan','planteo completo'],
 ['Una de las formas es despreciable','no es un buffer: es un ácido o una base sola','fórmula del ácido/base débil'],
 ['Sobra ácido o base fuerte','manda el fuerte','calcular con el exceso'],
 ['Antes de hacer la reacción con lo agregado','las cantidades todavía no son las del equilibrio','primero estequiometría, después Henderson']
],'compareTable')}
${example('HF 0,010 M + NaF 0,010 M: Henderson falla','<p>Ka = 6,8·10⁻⁴ (pKa 3,17).</p>',
 step('Con Henderson',chain(R`\mathrm{pH}=3{,}17+\log1=3{,}17\ \Rightarrow\ [\mathrm{H_3O^+}]=6{,}8\times10^{-4}`))+
 step('Verificamos',ver('<p>6,8·10⁻⁴ es 6,8 % de 0,010: no es despreciable.</p>',false))+
 step('Sin despreciar h',chain(R`6{,}8\times10^{-4}=\frac{h\,(0{,}010+h)}{0{,}010-h}\ \Rightarrow\ h=6{,}0\times10^{-4}\ \mathrm{M}`,R`\mathrm{pH}=3{,}22`)),
 'pH 3,22 (Henderson daba 3,17)')}
<h3>¿Qué pasa justo en el pKa?</h3>
${chain([R`C_s=C_a\ \Rightarrow\ \log\frac{C_s}{C_a}=\log1=0\ \Rightarrow\ \mathrm{pH}=\mathrm{p}K_a`])}
${flow([['pH = pKa','las dos formas en igual cantidad (en el diagrama de especiación, el cruce de las curvas, α = 0,5).'],['Máxima capacidad reguladora','puede absorber la misma cantidad de ácido que de base, y es donde el pH cambia menos por mol agregado.'],['La dilución no cambia el pH','el cociente C<sub>s</sub>/C<sub>a</sub> es 1 a cualquier dilución (mientras Henderson valga).']])}
`);

  // =====================================================================
  add('capacidad','Capacidad reguladora y rango útil','BUFFER',`
${flow([['Depende de la concentración total','más moles de HA y A⁻ → más ácido o base fuerte se puede absorber.'],['Depende de la relación','es <b>máxima cuando [HA] = [A⁻]</b> (pH = pKa). El rango útil es pKa ± 1.']])}
${example('¿Qué buffer resiste más?','<p>Dos buffers acéticos de 100 mL con la misma concentración total (0,20 M): A con 10 mmol HAc + 10 mmol Ac⁻; B con 2 mmol HAc + 18 mmol Ac⁻. Se agregan 2,0 mmol de HCl a cada uno.</p>',
 step('Buffer A (1 : 1)',chain(R`4{,}74\ \to\ 4{,}74+\log\frac{8}{12}=4{,}56\qquad\Delta\mathrm{pH}=-0{,}18`))+
 step('Buffer B (1 : 9)',chain(R`4{,}74+\log9=5{,}70\ \to\ 4{,}74+\log\frac{16}{4}=5{,}34\qquad\Delta\mathrm{pH}=-0{,}35`)),
 'El 1:1 cambia la mitad: máxima capacidad en pH = pKa')}
${deep('La capacidad reguladora como fórmula',`${M(R`\beta=\frac{dC_b}{d\,\mathrm{pH}}\approx2{,}303\,C\,\frac{K_a[\mathrm{H_3O^+}]}{(K_a+[\mathrm{H_3O^+}])^2}`)}<p>El máximo está en [H₃O⁺] = Ka (pH = pKa), donde β = 2,303·C/4 ≈ 0,58·C. En el diagrama de especiación es el punto de máxima pendiente.</p>`)}
`);

  // =====================================================================
  add('elegir','Elegir el sistema regulador','BUFFER',`
${flow([['1. Pasar todo a pKa del ácido del par','para bases: pKa(BH⁺) = 14 − pKb. Para polipróticos, cada par tiene su pKa.'],['2. Elegir el pKa más cercano al pH buscado','tiene que estar en pKa ± 1, y cuanto más cerca, más capacidad.'],['3. Decidir con qué compuestos se arma','ácido + su sal, base + su sal, o neutralización parcial (ácido débil + NaOH, base débil + HCl).']])}
${example('Regular a pH 9,5','<p>Disponibles: ácido acético (pKa 4,74), amoníaco (pKb 4,74) y carbonato ácido de sodio (pKa₂ 10,25).</p>',
 step('pKa de cada par',table(['Par','pKa','¿pH 9,5 en pKa ± 1?'],[['HAc/Ac⁻','4,74','no'],['NH₄⁺/NH₃','14 − 4,74 = 9,26','sí (Δ = 0,24)'],['HCO₃⁻/CO₃²⁻','10,25','sí (Δ = 0,75)']]))+
 step('Elección',jus('<p>NH₄⁺/NH₃: su pKa es el más cercano a 9,5, así que con relación cercana a 1 tiene mayor capacidad. Relación: '+m(R`\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=10^{9{,}5-9{,}26}=1{,}76`)+'. Se arma con NH₃ + NH₄Cl.</p>')),
 'NH₃ / NH₄Cl con relación 1,76 : 1')}
`);

  // =====================================================================
  add('disenar','Diseñar un buffer: cantidades','BUFFER',`
${flow([['1. Relación','de Henderson: '+m(R`\frac{C_s}{C_a}=10^{\,\mathrm{pH}-\mathrm{p}K_a}`)],['2. Concentración total','la elige quien diseña (más concentración = más capacidad). Si no la dan, se fija y se aclara.'],['3. Moles y masas','n = C·V; si el reactivo no es puro, dividir por la pureza; si es solución, pasar por % y densidad.'],['4. Verificar Henderson','[H₃O⁺] y [HO⁻] ≪ C<sub>a</sub>, C<sub>s</sub>.']])}
${example('1,0 L de buffer acético de pH 5,00 con concentración total 0,20 M','<p>pKa = 4,745.</p>',
 step('Relación y concentraciones',chain(R`\frac{C_s}{C_a}=10^{5{,}00-4{,}745}=1{,}80`,R`C_s=0{,}20\cdot\frac{1{,}80}{2{,}80}=0{,}129\ \mathrm{M}\qquad C_a=0{,}071\ \mathrm{M}`))+
 step('Opción A: ácido + sal',chain(R`n_{\mathrm{NaAc}}=0{,}129\ \mathrm{mol}\ \to\ 10{,}5\ \mathrm{g\ de\ NaAc}`,R`n_{\mathrm{HAc}}=0{,}071\ \mathrm{mol}`))+
 step('Opción B: neutralización parcial',chain([R`0{,}20\ \mathrm{mol\ HAc}+0{,}129\ \mathrm{mol\ NaOH}`,'el NaOH convierte 0,129 mol de HAc en Ac⁻']))+
 step('Verificamos',ver('<p>[H₃O⁺] = 10⁻⁵ M: ≪ 0,071 y 0,129 ✔</p>')),
 'NaAc 0,129 mol + HAc 0,071 mol, o HAc 0,20 mol + NaOH 0,129 mol, en 1 L')}
`);

  // =====================================================================
  add('agregados','Agregado de ácido o base fuerte y dilución','BUFFER',`
${punch('Primero la reacción completa del fuerte con el componente del par (estequiometría en moles), después Henderson.')}
${example('Buffer acético: pH y agregado de ácido y base fuertes','<p>100 mL con HAc 0,10 M y NaAc 0,15 M (pKa = 4,74). a) pH. b) + 1,0 mL de HCl 1,0 M. c) + 1,0 mL de NaOH 1,0 M. d) El mismo HCl en 100 mL de agua.</p>',
 step('a) pH inicial',chain(R`\mathrm{pH}=4{,}74+\log\frac{0{,}15}{0{,}10}=4{,}92`)+ver('<p>[H₃O⁺] = 1,2·10⁻⁵ M ≪ 0,10 ✔</p>'))+
 step('b) 1,0 mmol de H⁺',table(['mmol','Ac⁻','H⁺','HAc'],[['Inicio','15','1,0','10'],['Reacción completa','−1,0','−1,0','+1,0'],['Final','14','0','11']])+chain(R`\mathrm{pH}=4{,}74+\log\frac{14}{11}=4{,}85\qquad\Delta\mathrm{pH}=-0{,}07`))+
 step('c) 1,0 mmol de HO⁻',chain(R`\mathrm{pH}=4{,}74+\log\frac{16}{9}=5{,}00\qquad\Delta\mathrm{pH}=+0{,}08`))+
 step('d) En agua pura',chain(R`[\mathrm{H_3O^+}]=\frac{1{,}0}{101}=9{,}9\times10^{-3}\ \Rightarrow\ \mathrm{pH}=2{,}00\qquad\Delta\mathrm{pH}=-5`)),
 'Buffer: ±0,08 · agua: −5 unidades')}
${example('Dilución: hasta dónde vale Henderson','<p>El mismo buffer (HAc 0,10 / NaAc 0,15) diluido 1000 veces: C<sub>a</sub> = 1,0·10⁻⁴, C<sub>s</sub> = 1,5·10⁻⁴ M.</p>',
 step('Henderson diría',chain(R`\mathrm{pH}=4{,}92\ \Rightarrow\ h=1{,}2\times10^{-5}`)+ver('<p>1,2·10⁻⁵ es el 12 % de 1,0·10⁻⁴: no vale.</p>',false))+
 step('Exacto',chain(R`1{,}8\times10^{-5}=\frac{h(1{,}5\times10^{-4}+h)}{1{,}0\times10^{-4}-h}\ \Rightarrow\ h=1{,}0\times10^{-5}\ \mathrm{M},\ \mathrm{pH}=5{,}00`)),
 'Diluir poco no cambia el pH; diluir mucho, sí')}
${calc('qacBuffer','Buffer: pH antes y después de un agregado',field('pka','pKa',4.74)+field('na','ácido HA (mmol)',10)+field('nb','base A⁻ (mmol)',15)+field('add','agregado (mmol, + ácido / − base)',1),'Probá agregar 16 mmol para agotar el buffer.')}
`);

  // =====================================================================
  add('ejemplos','Buffers de la vida real y del laboratorio','BUFFER',`
${table(['Sistema','Par','pKa','Dónde'],[
 ['Carbonato en sangre','H₂CO₃ / HCO₃⁻','6,36','plasma (pH 7,4; relación HCO₃⁻/H₂CO₃ ≈ 11)'],
 ['Fosfato','H₂PO₄⁻ / HPO₄²⁻','7,20','células, plasma, medicamentos'],
 ['Amoniacal','NH₄⁺ / NH₃','9,26','marcha analítica (grupos III y IV)'],
 ['Acetato','HAc / Ac⁻','4,74','marcha analítica, alimentos'],
 ['Borato','H₃BO₃ / H₂BO₃⁻','9,14','soluciones oftálmicas y antimicóticas']
])}
${note('El carbonato de la sangre trabaja fuera del 1:10','<p>A pH 7,4 la relación HCO₃⁻/H₂CO₃ es ≈ 11 (algo más que 10:1). Funciona igual porque el H₂CO₃ se elimina como CO₂ por la respiración: es un sistema abierto. En un ejercicio de tubo de ensayo, ese buffer estaría en el límite de su rango.</p>')}
`);

  // =====================================================================
  add('repaso','Repaso de soluciones reguladoras','BUFFER',`
${cards([
 ['Criterio','¿Qué hace falta para que una solución regule?','Un par conjugado débil, las dos formas apreciables (pH = pKa ± 1), concentraciones altas y sin exceso de fuerte.'],
 ['Criterio','¿NaCl regula?','No: Na⁺ y Cl⁻ vienen de electrolitos fuertes.'],
 ['Henderson','¿Qué supone?','[HA] ≈ Ca y [A⁻] ≈ Cs (ion común); se verifica que [H₃O⁺], [HO⁻] ≪ Ca, Cs.'],
 ['Henderson','¿Cuándo no se puede usar?','Ka grande con concentraciones bajas, buffer muy diluido, una forma despreciable o exceso de fuerte.'],
 ['pKa','¿Qué pasa si pH = pKa?','Ca = Cs, log 1 = 0, máxima capacidad, y la dilución no lo mueve.'],
 ['Elegir','¿Cómo elijo el par?','El de pKa más cercano al pH pedido (para bases, pKa = 14 − pKb).'],
 ['Agregados','Orden de cálculo al agregar HCl','Primero la reacción completa con la base del par; después Henderson.'],
 ['Diseño','¿Y si no dan la concentración total?','Se elige (más alta = más capacidad) y se aclara en la respuesta.']
])}
`);

  window.ET27_QAC5.units.push({id:'buffer',n:2,title:'Soluciones reguladoras',short:'Buffer',lead:'Qué son y cómo funcionan, criterios para decidir si una solución regula, Henderson–Hasselbalch (cuándo sí y cuándo no), qué pasa en el pKa, capacidad reguladora y cómo elegir y diseñar un buffer.',sections:s});
})();
