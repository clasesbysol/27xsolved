// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 3 · Equilibrio de complejación
// Qué es un complejo, Kf, Ki y Kd, el patrón "despreciar el catión libre y reemplazar en K", casos sin exceso,
// cuándo falla la aproximación y usos de los complejos en la marcha analítica.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts,vira,swatch}=Q;
  const {sup,ver,flow,memo}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-u3-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('complejos','¿Qué es un ion complejo?','COMPLEJOS · 01',`
<p>Un <b>complejo</b> (o compuesto de coordinación) se forma cuando un ion metálico central se une a varias moléculas o iones que le “prestan” pares de electrones. Es una reacción ácido-base <b>de Lewis</b>:</p>
${rx('Ag^+ + 2 :NH3 -> [Ag(NH3)2]^+','ácido de Lewis + base de Lewis → complejo')}
${table(['Parte','Qué es','Ejemplo en [Cu(NH₃)₄]²⁺'],[
 ['Ion central','catión metálico con orbitales vacíos (ácido de Lewis)',f('Cu^2+')],
 ['Ligandos','moléculas o iones con pares libres (bases de Lewis)','4 '+f('NH3')],
 ['Número de coordinación','cantidad de enlaces que forma el ion central con los ligandos','4'],
 ['Carga del complejo','carga del ion central + suma de cargas de los ligandos','+2 + 4·0 = +2']
])}
${table(['Ligandos frecuentes en Cualitativa','Fórmula','Carga'],[['amoníaco (ammin)',f('NH3'),'0'],['agua (acuo)',f('H2O'),'0'],['cloruro (cloro)',f('Cl^-'),'−1'],['hidróxido (hidroxo)',f('OH^-'),'−1'],['cianuro (ciano)',f('CN^-'),'−1'],['tiocianato (tiocianato)',f('SCN^-'),'−1'],['tiosulfato',f('S2O3^2-'),'−2'],['EDTA (quelante: 6 uniones)','Y⁴⁻','−4']])}
<h3>Complejos que vas a ver en el laboratorio</h3>
${table(['Complejo','Color','Para qué se usa'],[
 [f('[Cu(NH3)4]^2+'),swatch('#1f4fd1','azul intenso'),'reconocer Cu²⁺'],
 [f('[Ag(NH3)2]^+'),swatch('#f2f2f2','incoloro'),'disolver AgCl (separarlo del Hg₂Cl₂)'],
 [f('[Fe(SCN)]^2+'),swatch('#9b111e','rojo sangre'),'reconocer Fe³⁺'],
 [f('[Ni(NH3)6]^2+'),swatch('#5b6fd6','azul violáceo'),'Ni²⁺ en medio amoniacal'],
 [f('[Co(SCN)4]^2-'),swatch('#2a64c9','azul (en acetona o alcohol amílico)'),'reconocer Co²⁺'],
 [f('[Zn(OH)4]^2-')+' · '+f('[Al(OH)4]^-'),swatch('#f2f2f2','incoloros'),'disolución de hidróxidos anfóteros en exceso de NaOH'],
 [f('Fe4[Fe(CN)6]3'),swatch('#0f3d91','azul de Prusia'),'reconocer Fe³⁺ con ferrocianuro']
])}
`);

  // =====================================================================
  add('constantes','Constantes: Kf, Ki y Kd','COMPLEJOS · 02',`
<p>La formación de un complejo es un equilibrio, y se puede escribir en los dos sentidos:</p>
${rxs(['Ag^+ + 2 NH3 <=> [Ag(NH3)2]^+','formación'],['[Ag(NH3)2]^+ <=> Ag^+ + 2 NH3','disociación (o inestabilidad)'])}
${key(R`K_f=\frac{[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{Ag^+}][\mathrm{NH_3}]^2}\qquad K_i=K_d=\frac{[\mathrm{Ag^+}][\mathrm{NH_3}]^2}{[\mathrm{Ag(NH_3)_2^+}]}=\frac{1}{K_f}`,'Formación (estabilidad) e inestabilidad (disociación)')}
${table(['Nombre','Símbolo','Escrita como…','Valor típico','Complejo estable si…'],[
 ['Constante de formación o de estabilidad','K<sub>f</sub>, K<sub>est</sub>, β','metal + ligandos → complejo','grande (10⁷, 10¹³…)','K<sub>f</sub> es grande'],
 ['Constante de inestabilidad o de disociación','K<sub>i</sub>, K<sub>d</sub>','complejo → metal + ligandos','chica (10⁻⁸, 10⁻¹³…)','K<sub>i</sub> es chica']
],'compareTable')}
${idea('Cómo saber cuál te dieron','<p>Mirá el orden de magnitud: si el número es <b>enorme</b> es K<sub>f</sub>; si es <b>chiquito</b>, es K<sub>i</sub> (o K<sub>d</sub>). Y antes de usarla, escribí la reacción en el sentido que corresponde a esa constante. Las dos describen lo mismo: '+m(R`K_i=1/K_f`)+'.</p>')}
${table(['Complejo','Kf','Ki = 1/Kf'],[[f('[Ag(NH3)2]^+'),'1,7·10⁷','5,9·10⁻⁸'],[f('[Cu(NH3)4]^2+'),'1,1·10¹³','9,1·10⁻¹⁴'],[f('[Zn(NH3)4]^2+'),'2,9·10⁹','3,4·10⁻¹⁰'],[f('[Ag(S2O3)2]^3-'),'2,9·10¹³','3,4·10⁻¹⁴'],[f('[Ag(CN)2]^-'),'1·10²¹','1·10⁻²¹'],[f('[Fe(SCN)]^2+'),'1,4·10²','7,1·10⁻³']])}
${deep('Constantes escalonadas (parciales) y globales',`<p>En realidad los ligandos entran de a uno, y cada paso tiene su constante:</p>${rxs(['Ag^+ + NH3 <=> [Ag(NH3)]^+','K₁ = 2,1·10³'],['[Ag(NH3)]^+ + NH3 <=> [Ag(NH3)2]^+','K₂ = 8,1·10³'])}${M(R`K_f=\beta_2=K_1\cdot K_2=1{,}7\times10^{7}`)}<p>Igual que con los ácidos polipróticos: sumar las etapas = multiplicar las constantes. Si tu tabla da constantes de disociación escalonadas, la global de disociación es el producto de todas. En los ejercicios del curso se usa casi siempre la <b>global</b>, suponiendo que con exceso de ligando el metal está en la forma con más ligandos.</p>`)}
`);

  // =====================================================================
  add('patron','El patrón de los ejercicios: despreciar el catión libre','COMPLEJOS · 03',`
<p>Casi todos los ejercicios de esta unidad son iguales: se mezcla un catión metálico con <b>exceso de ligando</b> y se pide la concentración de catión libre. Como Kf es enorme, la formación es prácticamente completa, y se resuelve así:</p>
${flow([
 ['Escribir la reacción de formación','M + n L ⇌ MLₙ, con su constante.'],
 ['Hacer la reacción como si fuera completa','Kf grande y ligando en exceso: todo el metal pasa a complejo. '+m(R`[\mathrm{ML_n}]\approx C_M`)],
 ['Calcular el ligando libre que sobra','A lo que se puso hay que restarle lo que quedó unido: '+m(R`[\mathrm{L}]\approx C_L-n\,C_M`)+'. ¡No olvidar el coeficiente n!'],
 ['Reemplazar en K y despejar el catión libre','Con Ki: '+m(R`[\mathrm{M}]=K_i\frac{[\mathrm{ML_n}]}{[\mathrm{L}]^n}`)+'. Con Kf: '+m(R`[\mathrm{M}]=\frac{[\mathrm{ML_n}]}{K_f[\mathrm{L}]^n}`)],
 ['Verificar','[M] libre tiene que ser ≤ 5 % de C<sub>M</sub> (casi siempre da millones de veces menos).']
])}
${sup([
 ['[M] libre ≪ C<sub>M</sub>, es decir [MLₙ] ≈ C<sub>M</sub>','Kf es muy grande (10⁷ o más) y hay exceso de ligando: el equilibrio está totalmente desplazado hacia el complejo.'],
 ['El ligando libre es lo que sobra de la estequiometría','la cantidad que “devuelve” la disociación del complejo es del orden de [M] libre, despreciable.']
],'Suponemos (siempre las mismas dos cosas)')}
${example('Plata en amoníaco','<p>Se disuelve AgNO₃ en NH₃ de modo que la solución queda con C<sub>Ag</sub> = 0,010 M y C<sub>NH₃</sub> = 1,0 M (totales). Calcular [Ag⁺] libre. Ki [Ag(NH₃)₂]⁺ = 5,9·10⁻⁸.</p>',
 step('1. Reacción completa',rx('Ag^+ + 2 NH3 -> [Ag(NH3)2]^+')+table(['M','Ag⁺','NH₃','[Ag(NH₃)₂]⁺'],[['Inicio','0,010','1,0','0'],['Reacción completa','−0,010','−0,020','+0,010'],['Después','≈ 0 (x)','0,98','0,010']]))+
 step('2. Disociación del complejo (ahora sí, equilibrio)',rx('[Ag(NH3)2]^+ <=> Ag^+ + 2 NH3')+chain(R`K_i=\frac{[\mathrm{Ag^+}][\mathrm{NH_3}]^2}{[\mathrm{Ag(NH_3)_2^+}]}=\frac{x\,(0{,}98+2x)^2}{0{,}010-x}`))+
 step('3. Suponemos',sup([['x ≪ 0,010 y 2x ≪ 0,98','Ki = 5,9·10⁻⁸ es chiquísima y hay mucho NH₃ libre (ion común que reprime la disociación).']]))+
 step('4. Reemplazamos y despejamos',chain(R`5{,}9\times10^{-8}=\frac{x\,(0{,}98)^2}{0{,}010}`,R`x=[\mathrm{Ag^+}]=\frac{5{,}9\times10^{-8}\cdot0{,}010}{(0{,}98)^2}=6{,}1\times10^{-10}\ \mathrm{M}`))+
 step('5. Verificamos',ver('<p>'+m(R`\frac{6{,}1\times10^{-10}}{0{,}010}\cdot100=6\times10^{-6}\,\%`)+' ✔. Prácticamente toda la plata está como complejo.</p>')),
 '[Ag⁺] libre = 6,1·10⁻¹⁰ M · [Ag(NH₃)₂⁺] = 0,010 M · [NH₃] = 0,98 M')}
${example('Cobre en amoníaco (con Kf)','<p>C<sub>Cu</sub> = 0,050 M y C<sub>NH₃</sub> = 2,0 M. Kf [Cu(NH₃)₄]²⁺ = 1,1·10¹³. Calcular [Cu²⁺] libre.</p>',
 step('1. Reacción completa',rx('Cu^2+ + 4 NH3 -> [Cu(NH3)4]^2+','se usan 4 × 0,050 = 0,20 M de NH₃')+chain(R`[\mathrm{Cu(NH_3)_4^{2+}}]\approx0{,}050\ \mathrm{M}\qquad[\mathrm{NH_3}]\approx2{,}0-0{,}20=1{,}8\ \mathrm{M}`))+
 step('2. Suponemos',sup([['[Cu²⁺] ≪ 0,050','Kf = 10¹³: el complejo es muy estable y el NH₃ está en exceso.']]))+
 step('3. Despejamos de Kf',chain(R`[\mathrm{Cu^{2+}}]=\frac{[\mathrm{Cu(NH_3)_4^{2+}}]}{K_f\,[\mathrm{NH_3}]^4}=\frac{0{,}050}{1{,}1\times10^{13}\cdot(1{,}8)^4}=4{,}3\times10^{-16}\ \mathrm{M}`))+
 step('4. Verificamos',ver('<p>4,3·10⁻¹⁶ ≪ 0,050 ✔. Ojo: elevamos 1,8 a la cuarta (10,5), no multiplicamos por 4.</p>')),
 '[Cu²⁺] libre = 4,3·10⁻¹⁶ M')}
${example('El problema al revés: ¿cuánto ligando hace falta?','<p>Se quiere que en una solución con C<sub>Ag</sub> = 0,010 M la [Ag⁺] libre sea 1,0·10⁻⁸ M. ¿Qué concentración total de NH₃ hay que poner?</p>',
 step('1. Ligando LIBRE necesario',sup([['[Ag(NH₃)₂⁺] ≈ 0,010 M','si queda sólo 10⁻⁸ M libre, prácticamente toda la plata está complejada (10⁻⁸ es 0,0001 % de 0,010).']])+chain(R`[\mathrm{NH_3}]^2=\frac{K_i\,[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{Ag^+}]}=\frac{5{,}9\times10^{-8}\cdot0{,}010}{1{,}0\times10^{-8}}=0{,}059`,R`[\mathrm{NH_3}]_{\text{libre}}=0{,}24\ \mathrm{M}`))+
 step('2. Total = libre + el que está en el complejo',chain(R`C_{\mathrm{NH_3}}=0{,}24+2\cdot0{,}010=0{,}26\ \mathrm{M}`)),
 'Hay que poner NH₃ 0,26 M en total (0,24 libre + 0,02 en el complejo)')}
${warn('Errores típicos','<ul><li>Olvidarse de restar el ligando que quedó dentro del complejo (o restarlo sin multiplicar por n).</li><li>Usar la constante “dada vuelta”: si te dan Ki y la escribís como formación, el resultado sale absurdo (una [M] mayor que C<sub>M</sub>).</li><li>Elevar mal: '+m(R`[\mathrm{NH_3}]^4`)+' con [NH₃] = 1,8 es 10,5, no 7,2.</li></ul>')}
`);

  // =====================================================================
  add('sin-exceso','Cuando no hay exceso de ligando: el complejo solo','COMPLEJOS · 04',`
<p>Si se disuelve directamente la sal de un complejo en agua, no hay ligando extra: todo el ligando libre sale de la disociación. Ahora el catión libre y el ligando libre <b>están relacionados por la estequiometría</b>.</p>
${example('[Ag(NH₃)₂]NO₃ 0,10 M en agua','<p>Calcular [Ag⁺] y [NH₃] libres (Ki = 5,9·10⁻⁸).</p>',
 step('1. Tabla',rx('[Ag(NH3)2]^+ <=> Ag^+ + 2 NH3')+table(['','[Ag(NH₃)₂]⁺','Ag⁺','NH₃'],[['Inicio','0,10','0','0'],['Cambio','−x','+x','+2x'],['Equilibrio','0,10 − x','x','2x']]))+
 step('2. Suponemos',sup([['x ≪ 0,10','Ki muy chica: el complejo se disocia poco.']]))+
 step('3. Resolvemos',chain(R`5{,}9\times10^{-8}=\frac{x\,(2x)^2}{0{,}10}=\frac{4x^3}{0{,}10}`,R`x=\sqrt[3]{\frac{5{,}9\times10^{-9}}{4}}=1{,}1\times10^{-3}\ \mathrm{M}`))+
 step('4. Verificamos',ver('<p>'+m(R`\frac{1{,}1\times10^{-3}}{0{,}10}\cdot100=1{,}1\,\%`)+' ✔</p>')),
 '[Ag⁺] = 1,1·10⁻³ M · [NH₃] = 2,3·10⁻³ M')}
${idea('Compará con el ejemplo anterior','<p>Sin exceso de NH₃, la plata libre es <b>1,1·10⁻³ M</b>; con NH₃ 1 M en exceso, <b>6·10⁻¹⁰ M</b>. Es el efecto del ion común otra vez: el ligando en exceso reprime la disociación del complejo. Por eso en el laboratorio siempre se agrega <b>exceso</b> de reactivo complejante.</p>')}
`);

  // =====================================================================
  add('cuando-falla','Cuando la aproximación falla: complejos poco estables','COMPLEJOS · 05',`
<p>El patrón de “catión libre despreciable” funciona porque Kf es enorme. Si el complejo es poco estable, la verificación lo detecta.</p>
${example('Tiocianato de hierro(III)','<p>Se mezclan Fe³⁺ (C = 1,0·10⁻³ M) y SCN⁻ (C = 0,10 M). Kf [Fe(SCN)]²⁺ = 1,4·10². Calcular [Fe³⁺] libre.</p>',
 step('1. Aplicamos el patrón',sup([['Todo el Fe³⁺ forma complejo','lo suponemos para probar, aunque Kf = 140 es chica…']])+chain(R`[\mathrm{FeSCN^{2+}}]\approx1{,}0\times10^{-3}\qquad[\mathrm{SCN^-}]\approx0{,}099`,R`[\mathrm{Fe^{3+}}]=\frac{1{,}0\times10^{-3}}{140\cdot0{,}099}=7{,}2\times10^{-5}\ \mathrm{M}`))+
 step('2. Verificamos',ver('<p>'+m(R`\frac{7{,}2\times10^{-5}}{1{,}0\times10^{-3}}\cdot100=7{,}2\,\%>5\,\%`)+'. Queda una parte apreciable del hierro sin complejar.</p>',false))+
 step('3. Sin despreciar el hierro libre',chain(R`y=[\mathrm{FeSCN^{2+}}]\qquad[\mathrm{Fe^{3+}}]=1{,}0\times10^{-3}-y\qquad[\mathrm{SCN^-}]\approx0{,}099`,[R`140=\frac{y}{(1{,}0\times10^{-3}-y)\cdot0{,}099}\ \Rightarrow\ y=9{,}33\times10^{-4}\ \mathrm{M}`,'ecuación lineal en y'],R`[\mathrm{Fe^{3+}}]=1{,}0\times10^{-3}-9{,}33\times10^{-4}=6{,}7\times10^{-5}\ \mathrm{M}`))+
 step('4. Lo que sí sigue valiendo',ver('<p>El SCN⁻ consumido (≈ 10⁻³) es 1 % de 0,10: seguir tomando [SCN⁻] ≈ 0,099 está bien ✔.</p>')),
 '[Fe³⁺] = 6,7·10⁻⁵ M (el 6,7 % del hierro queda libre)')}
${punch('La aproximación no es un acto de fe: se verifica. Si no da, se plantea la incógnita que se había despreciado.')}
`);

  // =====================================================================
  add('usos','Los complejos en la marcha analítica','COMPLEJOS · 06',`
${table(['Uso','Ejemplo','Reacción'],[
 ['Disolver un precipitado','AgCl en NH₃ (separa Ag⁺ del Hg₂²⁺ en el grupo I)',rx('AgCl(s) + 2 NH3 -> [Ag(NH3)2]^+ + Cl^-')],
 ['Reconocer un ion por color','Cu²⁺ azul intenso con NH₃ en exceso',rx('Cu^2+ + 4 NH3 -> [Cu(NH3)4]^2+')],
 ['Reconocer un ion por color','Fe³⁺ rojo sangre con SCN⁻',rx('Fe^3+ + SCN^- <=> [Fe(SCN)]^2+')],
 ['Separar anfóteros','Al(OH)₃ y Zn(OH)₂ se disuelven en exceso de NaOH; Fe(OH)₃ no',rx('Al(OH)3(s) + OH^- -> [Al(OH)4]^-')],
 ['Enmascarar','F⁻ “esconde” al Fe³⁺ como [FeF₆]³⁻ incoloro para reconocer Co²⁺ con SCN⁻ sin interferencia',rx('Fe^3+ + 6 F^- -> [FeF6]^3-')],
 ['Destruir un complejo','al acidificar, el NH₃ se protona y vuelve a precipitar AgCl (prueba de la plata)',rx('[Ag(NH3)2]^+ + Cl^- + 2 H^+ -> AgCl(s)↓ + 2 NH4^+')]
],'compareTable')}
${idea('Por qué el ácido destruye los complejos amoniacales','<p>El H⁺ compite con el metal por el par libre del NH₃: lo transforma en NH₄⁺, que ya no tiene par para donar. Al bajar [NH₃] libre, el equilibrio del complejo se desplaza hacia la disociación (Le Châtelier) y el metal queda libre para precipitar. El cálculo con constantes combinadas está en la Unidad 5.</p>')}
`);

  // =====================================================================
  add('repaso','Repaso de complejos','COMPLEJOS · REPASO',`
${cards([
 ['Concepto','¿Por qué la formación de un complejo es ácido-base?','Porque el ligando (base de Lewis) dona un par de electrones al metal (ácido de Lewis).'],
 ['Constantes','¿Qué relación hay entre Ki y Kf?','Ki = Kd = 1/Kf. Kf es grande y Ki chica para un complejo estable.'],
 ['Constantes','Te dan K = 5,9·10⁻⁸ para el complejo de plata. ¿Cuál es?','Ki (inestabilidad): es chica. La reacción va complejo → Ag⁺ + 2 NH₃.'],
 ['Patrón','¿Qué se supone en los ejercicios típicos?','Que todo el metal está como complejo ([MLₙ] ≈ C_M) y que el ligando libre es C_L − n·C_M.'],
 ['Patrón','¿Cómo se verifica?','Que [M] libre ≤ 5 % de C_M.'],
 ['Patrón','Ligando total necesario','Ligando libre (despejado de K) + n·C_M (el que está en el complejo).'],
 ['Sin exceso','Complejo solo en agua: ¿qué relación hay entre M y L libres?','[L] = n·[M] (salen juntos de la disociación).'],
 ['Falla','¿Cuándo no se puede despreciar el catión libre?','Cuando Kf es chica (ej. FeSCN²⁺, Kf ≈ 140) o el ligando no está en exceso.'],
 ['Usos','¿Cómo se separa AgCl de Hg₂Cl₂?','Con NH₃: el AgCl se disuelve como [Ag(NH₃)₂]⁺.'],
 ['Usos','¿Qué hace el HNO₃ sobre [Ag(NH₃)₂]⁺ con Cl⁻ presente?','Protona el NH₃ y reprecipita AgCl blanco.']
])}
`);

  window.ET27_QAC5.units.push({id:'u3',n:3,title:'Equilibrio de complejación',short:'Complejos',lead:'Ion central y ligandos, constantes de formación, inestabilidad y disociación, y el patrón que se repite en todos los ejercicios: despreciar el catión libre, reemplazar en K y verificar.',sections:s});
})();
