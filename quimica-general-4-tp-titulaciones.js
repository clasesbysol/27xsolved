// 27xSOLved · Química General de 4.º año — Trabajos prácticos · Titulaciones ácido-base.
// Teoría de laboratorio, esquemas y los 14 ejercicios resueltos paso a paso.
// Se agrega a window.ET27_QG4 como unidad de la parte "tp" (se carga después de quimica-general-4-content.js).
(function(){
  'use strict';
  const K=window.ET27Kit,QG=window.ET27_QG4,Q=window.ET27QI;if(!K||!QG||!Q)return;
  if(QG.units.some(u=>u.id==='titulaciones'))return;
  const {M,m,chain,key,sym,simple,idea,warn,note,fix,example,step,table,figure,cards}=K;
  const {rx,rxs,f}=Q;
  const R=String.raw;

  // ---------- Esquemas ----------
  const svgMontaje=`<svg viewBox="0 0 640 400" role="img" aria-label="Montaje de una titulación: bureta sostenida por un soporte con pinza, con el titulante; debajo, un Erlenmeyer con la alícuota y el indicador">
    <rect x="70" y="372" width="230" height="12" rx="4" class="svgLineFill svgSoft"/>
    <line x1="110" y1="372" x2="110" y2="30" class="svgLine thickLine"/>
    <path d="M110 92 H186" class="svgLine thickLine"/><rect x="180" y="82" width="22" height="20" rx="4" class="svgLineFill svgSoft"/>
    <rect x="186" y="40" width="22" height="210" rx="4" class="svgLineFill" fill="none"/>
    <rect x="188" y="96" width="18" height="152" class="svgLiquid strongLiquid"/>
    ${[60,90,120,150,180,210,240].map((y,i)=>`<line x1="186" y1="${y}" x2="${i%2?196:200}" y2="${y}" class="svgLine"/>`).join('')}
    <path d="M192 250 L192 266 L202 266 L202 250" class="svgLineFill" fill="none"/>
    <rect x="182" y="258" width="30" height="7" rx="3" class="svgAccentFill"/>
    <path d="M197 266 L197 286" class="svgLine"/>
    <circle cx="197" cy="296" r="3.4" fill="#3b8fd9"/>
    <path d="M168 306 L226 306 L226 318 L256 366 Q258 372 250 372 L144 372 Q136 372 138 366 L168 318 Z" class="svgLineFill" fill="none"/>
    <path d="M152 344 L242 344 L254 366 Q256 370 250 370 L144 370 Q138 370 140 366 Z" fill="#f2a6c8" opacity=".85"/>
    <path d="M226 160 H330" class="svgArrow"/><path d="M324 154 330 160 324 166" class="svgArrow"/>
    <text x="340" y="146" class="svgText strong">Bureta</text>
    <text x="340" y="166" class="svgText qiSmall">el titulante (concentración conocida)</text>
    <text x="340" y="184" class="svgText qiSmall">se lee el volumen gastado</text>
    <path d="M222 262 H330" class="svgArrow"/><path d="M324 256 330 262 324 268" class="svgArrow"/>
    <text x="340" y="258" class="svgText strong">Robinete (llave)</text>
    <text x="340" y="276" class="svgText qiSmall">se abre de a gotas cerca del final</text>
    <path d="M262 352 H330" class="svgArrow"/><path d="M324 346 330 352 324 358" class="svgArrow"/>
    <text x="340" y="340" class="svgText strong">Erlenmeyer</text>
    <text x="340" y="358" class="svgText qiSmall">alícuota (volumen exacto, con pipeta aforada)</text>
    <text x="340" y="376" class="svgText qiSmall">+ 2 o 3 gotas de indicador</text>
    <text x="96" y="22" class="svgText qiSmall">soporte</text>
  </svg>`;

  // Curva real: 20,00 mL de HCl 0,100 M titulados con NaOH 0,100 M.
  const pHcurve=(()=>{
    const Va=20,C=0.1,pts=[];
    for(let v=0;v<=40;v+=0.25){
      const na=C*Va,nb=C*v,Vt=(Va+v);let pH;
      if(Math.abs(na-nb)<1e-9)pH=7;
      else if(na>nb)pH=-Math.log10((na-nb)/Vt);
      else pH=14+Math.log10((nb-na)/Vt);
      pts.push([v,pH]);
    }
    const X=v=>70+v/40*520,Y=p=>250-p/14*220;
    const d=pts.map(([v,p],i)=>`${i?'L':'M'}${X(v).toFixed(1)} ${Y(p).toFixed(1)}`).join(' ');
    return `<svg viewBox="0 0 640 300" role="img" aria-label="Curva de titulación de un ácido fuerte con una base fuerte: el pH sube lentamente, salta bruscamente alrededor de 20 mL (punto de equivalencia, pH 7) y después se aplana">
      <rect x="${X(0)}" y="${Y(10)}" width="${X(40)-X(0)}" height="${Y(8.2)-Y(10)}" fill="#e83e8c" opacity=".12"/>
      <rect x="${X(0)}" y="${Y(4.4)}" width="${X(40)-X(0)}" height="${Y(3.1)-Y(4.4)}" fill="#f39c12" opacity=".14"/>
      <line x1="70" y1="250" x2="600" y2="250" class="svgLine"/><line x1="70" y1="250" x2="70" y2="22" class="svgLine"/>
      ${[0,2,4,6,7,8,10,12,14].map(p=>`<line x1="66" y1="${Y(p)}" x2="74" y2="${Y(p)}" class="svgLine"/><text x="60" y="${Y(p)+4}" text-anchor="end" class="svgText qiSmall">${p}</text>`).join('')}
      ${[0,10,20,30,40].map(v=>`<line x1="${X(v)}" y1="246" x2="${X(v)}" y2="254" class="svgLine"/><text x="${X(v)}" y="270" text-anchor="middle" class="svgText qiSmall">${v}</text>`).join('')}
      <text x="600" y="290" text-anchor="end" class="svgText">V de NaOH agregado (mL)</text>
      <text x="78" y="20" class="svgText">pH</text>
      <line x1="${X(20)}" y1="250" x2="${X(20)}" y2="30" stroke="#15579D" stroke-dasharray="5 5" stroke-width="1.5"/>
      <path d="${d}" fill="none" stroke="#15579D" stroke-width="3.5"/>
      <circle cx="${X(20)}" cy="${Y(7)}" r="6" fill="#15579D"/>
      <text x="${X(20)+12}" y="${Y(7)+5}" class="svgText strong" fill="#15579D">punto de equivalencia (pH = 7)</text>
      <text x="${X(40)-6}" y="${Y(10)+15}" text-anchor="end" class="svgText qiSmall">viraje de la fenolftaleína (8,2 – 10)</text>
      <text x="${X(40)-6}" y="${Y(4.4)+15}" text-anchor="end" class="svgText qiSmall">viraje del naranja de metilo (3,1 – 4,4)</text>
      <text x="${X(3)}" y="${Y(1)-10}" class="svgText qiSmall">sobra ácido</text>
      <text x="${X(31)}" y="${Y(12.4)-10}" class="svgText qiSmall">sobra base</text>
    </svg>`;
  })();

  const svgRetro=`<svg viewBox="0 0 640 210" role="img" aria-label="Titulación por retroceso: el ácido agregado en exceso se reparte entre lo que reacciona con la muestra y lo que sobra, que se titula con base">
    <rect x="40" y="40" width="560" height="44" rx="10" class="svgLineFill svgSoft"/>
    <text x="320" y="68" text-anchor="middle" class="svgText strong">HCl agregado en exceso (n total = M · V, se conoce)</text>
    <rect x="40" y="120" width="420" height="44" rx="10" fill="#e8f2fc" stroke="#15579D"/>
    <text x="250" y="140" text-anchor="middle" class="svgText strong" fill="#15579D">reaccionó con la muestra</text>
    <text x="250" y="157" text-anchor="middle" class="svgText qiSmall">lo que queremos saber</text>
    <rect x="470" y="120" width="130" height="44" rx="10" fill="#fdecec" stroke="#a3322b"/>
    <text x="535" y="140" text-anchor="middle" class="svgText strong" fill="#a3322b">sobró</text>
    <text x="535" y="157" text-anchor="middle" class="svgText qiSmall">se titula con NaOH</text>
    <path d="M250 86 V116" class="svgArrow"/><path d="M244 110 250 116 256 110" class="svgArrow"/>
    <path d="M535 86 V116" class="svgArrow"/><path d="M529 110 535 116 541 110" class="svgArrow"/>
    <text x="320" y="196" text-anchor="middle" class="svgText">n (reaccionó) = n (total) − n (sobró)</text>
  </svg>`;

  // ---------- Teoría ----------
  const sections=[];
  const add=(k,label,kicker,html)=>sections.push({key:`qgt-${k}`,label,kicker,html});

  add('que-es','Qué es una titulación','LABORATORIO · 01',`
<p>Una <b>titulación</b> (o <b>valoración</b>) es una técnica para averiguar la <b>concentración desconocida</b> de una solución haciéndola reaccionar con otra solución de <b>concentración conocida</b>, agregada de a poco, hasta que la reacción se completa justo.</p>
${sym([
 [R`\textsf{\textbf{titulante}}`,'Solución de concentración conocida. Va en la bureta.',''],
 [R`\textsf{\textbf{analito}}`,'Solución cuya concentración queremos conocer. Va en el Erlenmeyer.',''],
 [R`\textsf{\textbf{alícuota}}`,'Porción de volumen exacto que se toma del analito con una pipeta aforada.','mL'],
 [R`\textsf{\textbf{indicador}}`,'Sustancia que cambia de color cuando termina la reacción.','']
])}
${figure(svgMontaje,'Montaje de una titulación ácido-base.')}
<h3>Cómo se hace, paso a paso</h3>
<ol class="kitList">
 <li>Se <b>enjuaga la bureta</b> con un poco del titulante, se llena y se enrasa en cero (sin burbujas en la punta).</li>
 <li>Con una <b>pipeta aforada</b> se mide la alícuota del analito y se pasa al Erlenmeyer. Se agregan 2 o 3 gotas de <b>indicador</b>.</li>
 <li>Se deja caer el titulante agitando el Erlenmeyer con movimientos circulares. Cerca del final se agrega <b>gota a gota</b>.</li>
 <li>Cuando el indicador <b>cambia de color y el color persiste</b> unos segundos, se cierra la llave y se lee el volumen gastado.</li>
 <li>Se repite (al menos dos veces más) y se usa el promedio de los volúmenes que coinciden.</li>
</ol>
${idea('La idea en una frase',`<p>Si sé <b>cuántos moles de titulante</b> gasté, por la estequiometría sé <b>cuántos moles de analito</b> había en la alícuota; dividiendo por el volumen de la alícuota obtengo su <b>concentración</b>.</p>`)}
`);

  add('equivalencia','Punto de equivalencia y estequiometría','LABORATORIO · 02',`
<p>Un ácido y una base se <b>neutralizan</b>: los H⁺ del ácido se combinan con los OH⁻ de la base para formar agua, y el resto queda como una sal.</p>
${rxs(['HCl(ac) + NaOH(ac) -> NaCl(ac) + H2O(l)','relación 1 : 1'],['H2SO4(ac) + 2 NaOH(ac) -> Na2SO4(ac) + 2 H2O(l)','el H₂SO₄ aporta 2 H⁺'],['2 HCl(ac) + Ca(OH)2(ac) -> CaCl2(ac) + 2 H2O(l)','el Ca(OH)₂ aporta 2 OH⁻'])}
<p>El <b>punto de equivalencia</b> es el momento en que se agregó exactamente la cantidad de titulante que pide la ecuación balanceada. Ni un poco más, ni un poco menos.</p>
${key(R`n=M\cdot V`,'Moles de soluto en una solución (V en litros)')}
<h3>La relación que se usa siempre</h3>
<p>En el punto de equivalencia, los moles de H⁺ que entregó el ácido son iguales a los moles de OH⁻ que entregó la base:</p>
${key(R`a\cdot M_{\text{ácido}}\cdot V_{\text{ácido}}=b\cdot M_{\text{base}}\cdot V_{\text{base}}`,'a = H⁺ que libera cada fórmula de ácido · b = OH⁻ que libera cada fórmula de base')}
${table(['Sustancia','Fórmula','H⁺ u OH⁻ por fórmula'],[
 ['Ácido clorhídrico',f('HCl'),'a = 1'],['Ácido perclórico',f('HClO4'),'a = 1'],['Ácido sulfúrico',f('H2SO4'),'a = 2'],
 ['Hidróxido de sodio',f('NaOH'),'b = 1'],['Hidróxido de potasio',f('KOH'),'b = 1'],['Hidróxido de calcio',f('Ca(OH)2'),'b = 2'],['Hidróxido de bario',f('Ba(OH)2'),'b = 2'],['Hidróxido de magnesio',f('Mg(OH)2'),'b = 2']
])}
${fix('Cuándo vale M₁V₁ = M₂V₂',`<p>Solo cuando a = b (por ejemplo HCl con NaOH). Con H₂SO₄ y NaOH, usar ${m(R`M_1V_1=M_2V_2`)} da la mitad (o el doble) de lo correcto. Ante la duda, escribí la ecuación balanceada y trabajá con <b>moles</b>.</p>`)}
${example('HCl con Ca(OH)₂',`<p>Se gastan 15,0 mL de HCl 0,120 M para neutralizar 20,0 mL de Ca(OH)₂. ¿Concentración de la base?</p>`,
 step('1. Ecuación y relación',rx('2 HCl + Ca(OH)2 -> CaCl2 + 2 H2O')+`<p>2 mol de HCl por cada 1 mol de Ca(OH)₂.</p>`)+
 step('2. Moles del titulante',chain(R`n_{\mathrm{HCl}}=0{,}120\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0150\ \text{L}=1{,}80\cdot10^{-3}\ \text{mol}`))+
 step('3. Moles del analito y concentración',chain(R`n_{\mathrm{Ca(OH)_2}}=\frac{1{,}80\cdot10^{-3}}{2}=9{,}00\cdot10^{-4}\ \text{mol}`,R`M=\frac{9{,}00\cdot10^{-4}\ \text{mol}}{0{,}0200\ \text{L}}=0{,}0450\ M`)),
 '0,0450 M')}
`);

  add('indicadores','Indicadores y curva de titulación','LABORATORIO · 03',`
<p>Un <b>indicador ácido-base</b> es un ácido débil (o una base débil) orgánico que tiene <b>un color en medio ácido y otro en medio básico</b>. Cambia de color en un intervalo corto de pH, llamado <b>zona de viraje</b>.</p>
${table(['Indicador','Color en medio ácido','Color en medio básico','Zona de viraje (pH)'],[
 ['Fenolftaleína','incoloro','fucsia','8,2 – 10'],['Naranja de metilo (heliantina)','rojo','amarillo','3,1 – 4,4'],['Azul de bromotimol','amarillo','azul','6,0 – 7,6'],['Rojo de metilo','rojo','amarillo','4,4 – 6,2']
])}
<p>Si se va midiendo el pH a medida que se agrega la base, se obtiene la <b>curva de titulación</b>. Para un ácido fuerte con una base fuerte tiene esta forma:</p>
${figure(pHcurve,'20,00 mL de HCl 0,100 M titulados con NaOH 0,100 M.')}
<ul class="kitList">
 <li><b>Al principio</b> sobra ácido: el pH es bajo y sube muy despacio.</li>
 <li><b>Cerca de la equivalencia</b> una sola gota cambia el pH en varias unidades: es el <b>salto</b>.</li>
 <li><b>En la equivalencia</b> de ácido fuerte con base fuerte, la solución tiene solo sal y agua: <b>pH = 7</b>.</li>
 <li><b>Después</b> sobra base y el pH se aplana en valores altos.</li>
</ul>
${note('Punto final y punto de equivalencia',`<p>El <b>punto de equivalencia</b> es el teórico (moles justos). El <b>punto final</b> es el que vemos: cuando vira el indicador. Como el salto es tan vertical, la fenolftaleína vira prácticamente con la misma gota en que se llega a la equivalencia: el error es despreciable.</p>`)}
`);

  add('preparar','Preparar soluciones: droga sólida y ácido concentrado','LABORATORIO · 04',`
<p>Antes de titular hay que <b>preparar</b> las soluciones. Hay dos casos típicos.</p>
<h3>A. A partir de un sólido que no es puro</h3>
<p>Las drogas sólidas vienen con una <b>pureza</b> (por ejemplo, KOH 92,5 %): de cada 100 g de droga, solo 92,5 g son KOH. Por eso hay que pesar <b>un poco más</b> de lo que da la cuenta.</p>
${chain([R`n=M\cdot V`,'moles que necesito'],[R`m_{\text{puro}}=n\cdot\mathcal{M}`,'𝓜: masa molar'],[R`m_{\text{a pesar}}=\frac{m_{\text{puro}}\cdot100}{\%\ \text{pureza}}`,'siempre da más que la masa pura'])}
<h3>B. A partir de un ácido concentrado (% m/m y densidad)</h3>
<p>Los ácidos se compran concentrados: H₂SO₄ 98 % m/m con densidad 1,84 g/mL quiere decir que <b>cada 100 g de solución contienen 98 g de H₂SO₄</b>, y que <b>cada mL pesa 1,84 g</b>. Como los líquidos se miden en volumen, el camino es:</p>
${chain([R`n=M\cdot V`,'moles que necesito'],[R`m_{\text{soluto}}=n\cdot\mathcal{M}`],[R`m_{\text{solución conc.}}=\frac{m_{\text{soluto}}\cdot100}{\%\,m/m}`],[R`V_{\text{conc.}}=\frac{m_{\text{solución conc.}}}{\delta}`,'δ: densidad'])}
${warn('Seguridad con el ácido concentrado',`<p>Siempre se agrega <b>el ácido sobre el agua</b>, despacio y agitando, nunca al revés: la dilución del H₂SO₄ libera mucho calor y el agua sobre el ácido puede hervir de golpe y salpicar.</p>`)}
<h3>Cómo se prepara en el laboratorio</h3>
<ol class="kitList"><li>Pesar (o medir con pipeta graduada) la cantidad calculada.</li><li>Disolver en un vaso con menos agua que el volumen final.</li><li>Pasar al <b>matraz aforado</b> del volumen pedido, enjuagando el vaso.</li><li>Completar con agua destilada hasta el <b>aforo</b> y homogeneizar.</li></ol>
`);

  add('retro','Titulación por retroceso y neutralización con bicarbonato','LABORATORIO · 05',`
<p>A veces la muestra no se puede titular directamente (por ejemplo, un sólido poco soluble como el Mg(OH)₂). Entonces se la disuelve en un <b>exceso conocido de ácido</b> y después se titula con base <b>lo que sobró</b>.</p>
${figure(svgRetro,'Titulación por retroceso.')}
${key(R`n_{\text{reaccionó}}=n_{\text{total}}-n_{\text{sobrante}}`,'La resta que resuelve todo')}
<h3>Bicarbonato de sodio como neutralizante</h3>
<p>El bicarbonato de sodio (NaHCO₃) es una base débil y barata: con un ácido forma CO₂, que se ve como <b>efervescencia</b>. Cuando deja de burbujear, el ácido se terminó.</p>
${rx('2 NaHCO3(s) + H2SO4(ac) -> Na2SO4(ac) + 2 H2O(l) + 2 CO2(g)↑')}
${idea('Por qué se usa en los derrames',`<p>Si se pone bicarbonato de más, no pasa nada: es una base débil que no corroe. Con NaOH, en cambio, un exceso dejaría la mesada con una base fuerte.</p>`)}
`);

  add('metodo','Método para resolver cualquier ejercicio','LABORATORIO · 06',`
<ol class="kitList">
 <li><b>Escribí la ecuación balanceada</b> y anotá la relación de moles entre ácido y base.</li>
 <li><b>Pasá los volúmenes a litros</b> (o trabajá todo en mL y mmol: ${m(R`\text{mmol}=M\cdot V(\text{mL})`)}).</li>
 <li><b>Calculá los moles de lo que conocés del todo</b> (concentración y volumen, o masa y masa molar).</li>
 <li><b>Pasá a moles de la otra sustancia</b> con la relación de la ecuación.</li>
 <li><b>Despejá lo que piden</b>: concentración (n / V), volumen (n / M) o masa (n · 𝓜).</li>
 <li><b>Controlá</b>: ¿el resultado tiene sentido? Un volumen de bureta de 300 mL o una concentración de 50 M avisan que algo salió mal.</li>
</ol>
${sym([[R`M`,'Molaridad: moles de soluto por litro de solución','mol/L'],[R`n`,'Cantidad de sustancia','mol'],[R`V`,'Volumen de solución','L'],[R`\mathcal{M}`,'Masa molar','g/mol'],[R`\delta`,'Densidad','g/mL']])}
${table(['Sustancia','Masa molar (g/mol)'],[[f('KOH'),'56'],[f('NaOH'),'40'],[f('H2SO4'),'98'],[f('HCl'),'36,5'],[f('Mg(OH)2'),'58,3'],[f('NaHCO3'),'84'],[f('Ca(OH)2'),'74'],[f('Ba(OH)2'),'171,3']])}
`);

  add('guia','Guía de ejercitación resuelta','EJERCICIOS · 07',`
<p>Catorce ejercicios con su consigna y la resolución paso a paso. Probá cada uno antes de abrir la resolución.</p>
${note('Antes de empezar',`<p>Los ejercicios 3 y 4 usan las soluciones que se preparan en el 1 y el 2: conviene resolverlos en orden.</p>`)}
<div data-qg-guide></div>
`);

  add('repaso','Tarjetas de repaso','PARA MEMORIZAR · 08',`
<p>Respondé antes de dar vuelta la tarjeta.</p>
${cards([
 ['Concepto','¿Qué es el punto de equivalencia?','El momento en que se agregaron los moles justos de titulante que pide la ecuación balanceada.'],
 ['Concepto','¿Punto final o punto de equivalencia?','El final es cuando vira el indicador (lo que se ve); el de equivalencia es el teórico.'],
 ['Fórmula','Moles en una solución','n = M · V, con V en litros.'],
 ['Fórmula','Relación en la equivalencia','a · M<sub>ácido</sub> · V<sub>ácido</sub> = b · M<sub>base</sub> · V<sub>base</sub>'],
 ['Trampa','¿H₂SO₄ con NaOH es 1 : 1?','No: 1 mol de H₂SO₄ neutraliza 2 mol de NaOH.'],
 ['Laboratorio','¿Dónde va el titulante?','En la bureta. La alícuota del analito va en el Erlenmeyer.'],
 ['Laboratorio','Fenolftaleína','Incolora en medio ácido, fucsia en medio básico. Vira entre pH 8,2 y 10.'],
 ['Pureza','Droga al 92,5 %: ¿peso más o menos que la masa pura?','Más: m a pesar = m pura · 100 / 92,5.'],
 ['Concentrado','98 % m/m y δ = 1,84 g/mL','98 g de ácido cada 100 g de solución; cada mL pesa 1,84 g.'],
 ['Retroceso','¿Cómo se calculan los moles que reaccionaron con la muestra?','Moles totales de ácido agregados menos los que sobraron (titulados con base).'],
 ['Seguridad','¿Ácido sobre agua o agua sobre ácido?','Siempre el ácido sobre el agua, despacio.']
])}
`);

  add('formulas','Fórmulas del TP','MACHETE · 09',`
${key(R`n=M\cdot V`,'Moles en solución')}
${key(R`n=\frac{m}{\mathcal{M}}`,'Moles a partir de la masa')}
${key(R`a\,M_aV_a=b\,M_bV_b`,'Equivalencia ácido-base')}
${key(R`m_{\text{droga}}=\frac{m_{\text{puro}}\cdot100}{\%\ \text{pureza}}`,'Droga impura')}
${key(R`V_{\text{conc.}}=\frac{m_{\text{soluto}}\cdot100}{\%\,m/m\cdot\delta}`,'Ácido concentrado')}
${key(R`n_{\text{reaccionó}}=n_{\text{total}}-n_{\text{sobrante}}`,'Titulación por retroceso')}
${key(R`\%\ m/m=\frac{m_{\text{sustancia}}}{m_{\text{muestra}}}\cdot100`,'Porcentaje en masa de una muestra')}
`);

  // ---------- Guía de ejercicios ----------
  const exercises=[];
  const ex=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  const dato=rows=>`<ul class="kitList">${rows.map(([a,b])=>`<li><b>${a}:</b> ${b}</li>`).join('')}</ul>`;

  ex(1,'Preparar KOH 0,1 M a partir de una droga al 92,5 %',
   `<p>Se desean preparar 100 ml de solución de hidróxido de potasio 0,1 M a partir de la droga 92,5%. Calcular la masa de soluto a pesar. <b>Rta: 0,6054 g</b></p>`,
   step('1. Datos',dato([['Volumen a preparar','100 mL = 0,100 L'],['Concentración','0,1 M'],['Pureza de la droga','92,5 %'],['Masa molar KOH','39 + 16 + 1 = 56 g/mol']]))+
   step('2. Moles de KOH necesarios',chain(R`n=M\cdot V=0{,}1\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}100\ \text{L}=0{,}0100\ \text{mol}`))+
   step('3. Masa de KOH puro',chain(R`m_{\text{puro}}=n\cdot\mathcal{M}=0{,}0100\ \text{mol}\cdot56\ \tfrac{\text{g}}{\text{mol}}=0{,}560\ \text{g}`))+
   step('4. Corrección por pureza',`<p>Solo el 92,5 % de lo que pesemos es KOH, así que hay que pesar más:</p>`+chain(R`m_{\text{a pesar}}=\frac{0{,}560\ \text{g}\cdot100}{92{,}5}=0{,}6054\ \text{g}`))+
   step('5. Cómo se prepara',`<p>Se pesan 0,6054 g de la droga, se disuelven en un vaso con unos 50 mL de agua destilada, se pasan a un matraz aforado de 100 mL enjuagando el vaso y se enrasa.</p>`+simple('Control: la masa a pesar es apenas mayor que la pura, como tiene que ser')),
   '0,6054 g de droga');

  ex(2,'Volumen de H₂SO₄ concentrado para preparar una solución 0,2 M',
   `<p>Se prepararon 200 ml de solución de ácido sulfúrico 0,2 M. Calcular el volumen de ácido concentrado 98% m/m, densidad 1,84 g/ml necesario. <b>Rta: 2,2 ml</b></p>`,
   step('1. Datos',dato([['Volumen a preparar','200 mL = 0,200 L'],['Concentración','0,2 M'],['Ácido concentrado','98 % m/m · δ = 1,84 g/mL'],['Masa molar H₂SO₄','2 + 32 + 64 = 98 g/mol']]))+
   step('2. Moles y masa de H₂SO₄',chain(R`n=0{,}2\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}200\ \text{L}=0{,}0400\ \text{mol}`,R`m=0{,}0400\ \text{mol}\cdot98\ \tfrac{\text{g}}{\text{mol}}=3{,}92\ \text{g de H}_2\text{SO}_4`))+
   step('3. Masa de ácido concentrado',`<p>98 g de H₂SO₄ están en 100 g de ácido concentrado:</p>`+chain(R`m_{\text{conc.}}=\frac{3{,}92\ \text{g}\cdot100}{98}=4{,}00\ \text{g}`))+
   step('4. Volumen con la densidad',chain(R`V=\frac{m}{\delta}=\frac{4{,}00\ \text{g}}{1{,}84\ \tfrac{\text{g}}{\text{mL}}}=2{,}17\ \text{mL}\approx2{,}2\ \text{mL}`))+
   warn('Al prepararla',`<p>Se ponen unos 100 mL de agua en el matraz aforado de 200 mL y se agregan <b>sobre el agua</b> los 2,2 mL de ácido, medidos con pipeta graduada. Se deja enfriar y recién después se enrasa.</p>`),
   '≈ 2,2 mL de H₂SO₄ concentrado');

  ex(3,'Titulación de la solución de KOH con HCl',
   `<p>Una alícuota de la solución 1 de 20 ml se tituló con ácido clorhídrico, gastándose 12,3 ml. Calcule la concentración de ácido. <b>Rta: 0,16 M</b></p>`,
   step('1. Qué es cada cosa',`<p>La «solución 1» es el KOH 0,1 M del ejercicio 1. La alícuota de 20 mL de KOH va en el Erlenmeyer y el HCl, de concentración desconocida, en la bureta.</p>`+rx('HCl(ac) + KOH(ac) -> KCl(ac) + H2O(l)','relación 1 : 1'))+
   step('2. Moles de KOH en la alícuota',chain(R`n_{\mathrm{KOH}}=0{,}1\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}020\ \text{L}=2{,}0\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de HCl gastados',`<p>Relación 1 : 1 → los mismos moles.</p>`+chain(R`n_{\mathrm{HCl}}=2{,}0\cdot10^{-3}\ \text{mol}`))+
   step('4. Concentración del ácido',chain(R`M_{\mathrm{HCl}}=\frac{2{,}0\cdot10^{-3}\ \text{mol}}{0{,}0123\ \text{L}}=0{,}163\ M\approx0{,}16\ M`)+simple('Control: se gastó menos volumen de ácido que de base, entonces el ácido está más concentrado que 0,1 M')),
   '≈ 0,16 M de HCl');

  ex(4,'Titulación de la solución de H₂SO₄ con Ca(OH)₂',
   `<p>Una alícuota de la solución 2 de 25 ml se tituló con hidróxido de calcio, gastándose 23,4 ml. Calcule la concentración de base. <b>Rta: 0,21 M</b></p>`,
   step('1. Qué es cada cosa',`<p>La «solución 2» es el H₂SO₄ 0,2 M del ejercicio 2. La base va en la bureta.</p>`+rx('H2SO4(ac) + Ca(OH)2(ac) -> CaSO4(s) + 2 H2O(l)','relación 1 : 1 (2 H⁺ con 2 OH⁻)'))+
   step('2. Moles de H₂SO₄ en la alícuota',chain(R`n_{\mathrm{H_2SO_4}}=0{,}2\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}025\ \text{L}=5{,}0\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de Ca(OH)₂',`<p>1 mol de ácido diprótico con 1 mol de base que aporta 2 OH⁻:</p>`+chain(R`n_{\mathrm{Ca(OH)_2}}=5{,}0\cdot10^{-3}\ \text{mol}`))+
   step('4. Concentración de la base',chain(R`M=\frac{5{,}0\cdot10^{-3}\ \text{mol}}{0{,}0234\ \text{L}}=0{,}214\ M\approx0{,}21\ M`))+
   note('Comprobación con la fórmula general',chain(R`a\,M_aV_a=b\,M_bV_b\;\Rightarrow\;2\cdot0{,}2\cdot25=2\cdot M_b\cdot23{,}4\;\Rightarrow\;M_b=0{,}214\ M`)),
   '≈ 0,21 M de Ca(OH)₂');

  ex(5,'Molaridad de NaOH a partir de H₂SO₄',
   `<p>Calcule la molaridad de una disolución de NaOH si se requieren 48.0 mL para neutralizar 35.0 mL de H<sub>2</sub>SO<sub>4</sub> 0.144 M. <b>Respuesta: 0.210 M</b></p>`,
   step('1. Ecuación',rx('H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O','1 mol de ácido : 2 mol de base'))+
   step('2. Moles de H₂SO₄',chain(R`n_{\mathrm{H_2SO_4}}=0{,}144\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0350\ \text{L}=5{,}04\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de NaOH',chain(R`n_{\mathrm{NaOH}}=2\cdot5{,}04\cdot10^{-3}=1{,}008\cdot10^{-2}\ \text{mol}`))+
   step('4. Molaridad',chain(R`M_{\mathrm{NaOH}}=\frac{1{,}008\cdot10^{-2}\ \text{mol}}{0{,}0480\ \text{L}}=0{,}210\ M`)),
   '0,210 M');

  ex(6,'Control de la solución para pelar papas',
   `<p>Un método comercial empleado para pelar papas es remojarlas en una solución de NaOH durante un tiempo corto, sacarlas y aplicarles un rocío a presión para eliminar la cáscara. La concentración de NaOH normalmente está en el intervalo de 3 a 6 M. El NaOH se analiza periódicamente. En uno de esos análisis se requirieron 45.7 mL de H<sub>2</sub>SO<sub>4</sub> 0.500 M para neutralizar una muestra de 20.0 mL de disolución de NaOH. Calcule la concentración de la disolución de NaOH. <b>Rta: 2,28M</b></p>`,
   step('1. Ecuación',rx('H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O'))+
   step('2. Moles de H₂SO₄ gastados',chain(R`n_{\mathrm{H_2SO_4}}=0{,}500\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0457\ \text{L}=2{,}285\cdot10^{-2}\ \text{mol}`))+
   step('3. Moles de NaOH en la muestra',chain(R`n_{\mathrm{NaOH}}=2\cdot2{,}285\cdot10^{-2}=4{,}57\cdot10^{-2}\ \text{mol}`))+
   step('4. Concentración',chain(R`M_{\mathrm{NaOH}}=\frac{4{,}57\cdot10^{-2}\ \text{mol}}{0{,}0200\ \text{L}}=2{,}285\ M\approx2{,}28\ M`))+
   idea('¿Y entonces?',`<p>2,28 M está <b>por debajo</b> del intervalo de trabajo (3 a 6 M): la solución se fue gastando y hay que <b>reforzarla con NaOH</b>. Para eso sirve el análisis periódico.</p>`),
   '≈ 2,28 M (por debajo del intervalo de 3 a 6 M)');

  ex(7,'Volumen de HClO₄ para neutralizar NaOH',
   `<p>Calcule el volumen de solución 0.115 M de ácido perclórico que se requiere para neutralizar 50.00 mL de hidróxido de sodio 0.0875 M.</p>`,
   step('1. Ecuación',rx('HClO4 + NaOH -> NaClO4 + H2O','relación 1 : 1'))+
   step('2. Moles de NaOH',chain(R`n_{\mathrm{NaOH}}=0{,}0875\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}05000\ \text{L}=4{,}375\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles y volumen de HClO₄',chain(R`n_{\mathrm{HClO_4}}=4{,}375\cdot10^{-3}\ \text{mol}`,R`V=\frac{n}{M}=\frac{4{,}375\cdot10^{-3}\ \text{mol}}{0{,}115\ \tfrac{\text{mol}}{\text{L}}}=0{,}03804\ \text{L}=38{,}0\ \text{mL}`))+
   `<p>${simple('Control: el ácido está un poco más concentrado que la base, así que se necesita un poco menos de 50 mL')}</p>`,
   '≈ 38,0 mL de HClO₄');

  ex(8,'Volumen de HCl para neutralizar Mg(OH)₂ sólido',
   `<p>Calcule el volumen de ácido clorhídrico 0.128 M que se requiere para neutralizar 2.87 g de Mg(OH)<sub>2</sub></p>`,
   step('1. Ecuación',rx('2 HCl + Mg(OH)2 -> MgCl2 + 2 H2O','2 mol de HCl por mol de Mg(OH)₂'))+
   step('2. Moles de Mg(OH)₂',`<p>Masa molar: 24,3 + 2 · (16 + 1) = 58,3 g/mol.</p>`+chain(R`n_{\mathrm{Mg(OH)_2}}=\frac{2{,}87\ \text{g}}{58{,}3\ \tfrac{\text{g}}{\text{mol}}}=4{,}92\cdot10^{-2}\ \text{mol}`))+
   step('3. Moles de HCl',chain(R`n_{\mathrm{HCl}}=2\cdot4{,}92\cdot10^{-2}=9{,}84\cdot10^{-2}\ \text{mol}`))+
   step('4. Volumen',chain(R`V=\frac{9{,}84\cdot10^{-2}\ \text{mol}}{0{,}128\ \tfrac{\text{mol}}{\text{L}}}=0{,}769\ \text{L}=769\ \text{mL}`)+simple('Es mucho volumen porque el ácido está diluido y la masa de base es grande')),
   '≈ 769 mL (0,769 L) de HCl');

  ex(9,'Masa de KOH en una alícuota y cómo preparar la solución',
   `<p>Si se requieren 45.3 mL de una solución 0.108 M de ácido clorhídrico para neutralizar 25 ml de una solución de hidróxido de potasio, ¿cuántos gramos de KOH deben estar presentes en la alícuota? ¿Cómo prepararía la solución básica?</p>`,
   step('1. Ecuación',rx('HCl + KOH -> KCl + H2O','relación 1 : 1'))+
   step('2. Moles de HCl = moles de KOH',chain(R`n=0{,}108\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0453\ \text{L}=4{,}89\cdot10^{-3}\ \text{mol}`))+
   step('3. Masa de KOH en la alícuota',chain(R`m=4{,}89\cdot10^{-3}\ \text{mol}\cdot56{,}1\ \tfrac{\text{g}}{\text{mol}}=0{,}274\ \text{g}`))+
   step('4. Concentración de la solución básica',chain(R`M_{\mathrm{KOH}}=\frac{4{,}89\cdot10^{-3}\ \text{mol}}{0{,}025\ \text{L}}=0{,}196\ M`))+
   step('5. Cómo prepararla (por ejemplo, 100 mL)',chain(R`n=0{,}196\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}100\ \text{L}=0{,}0196\ \text{mol}`,R`m=0{,}0196\cdot56{,}1=1{,}10\ \text{g de KOH puro}`)+`<ol class="kitList"><li>Pesar 1,10 g de KOH (si la droga es de 92,5 %: 1,10 · 100 / 92,5 = 1,19 g).</li><li>Disolver en un vaso con unos 50 mL de agua destilada; la disolución calienta, dejar enfriar.</li><li>Pasar a un matraz aforado de 100 mL, enjuagar el vaso con agua y agregarla al matraz.</li><li>Enrasar con agua destilada, tapar e invertir varias veces.</li></ol>`)+
   note('Por qué después se titula igual',`<p>El KOH absorbe agua y CO₂ del aire, así que la masa pesada nunca es exacta. Por eso la concentración real de una base se determina <b>titulándola</b>, como en este ejercicio.</p>`),
   '0,274 g de KOH en la alícuota (solución 0,196 M)');

  ex(10,'HCl para neutralizar Ba(OH)₂',
   `<p>Calcule cuántos mililitros de ácido clorhídrico 0.120 M se necesitan para neutralizar totalmente 50.0 mL de una disolución 0.101 M de Ba(OH)<sub>2</sub></p>`,
   step('1. Ecuación',rx('2 HCl + Ba(OH)2 -> BaCl2 + 2 H2O'))+
   step('2. Moles de Ba(OH)₂',chain(R`n_{\mathrm{Ba(OH)_2}}=0{,}101\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0500\ \text{L}=5{,}05\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de HCl',chain(R`n_{\mathrm{HCl}}=2\cdot5{,}05\cdot10^{-3}=1{,}01\cdot10^{-2}\ \text{mol}`))+
   step('4. Volumen',chain(R`V=\frac{1{,}01\cdot10^{-2}\ \text{mol}}{0{,}120\ \tfrac{\text{mol}}{\text{L}}}=0{,}0842\ \text{L}=84{,}2\ \text{mL}`)),
   '≈ 84,2 mL de HCl');

  ex(11,'H₂SO₄ para neutralizar NaOH sólido',
   `<p>Calcule el volumen de solución de ácido sulfúrico 0.125 M que se requiere para neutralizar 0.200 g de hidróxido de sodio.</p>`,
   step('1. Ecuación',rx('H2SO4 + 2 NaOH -> Na2SO4 + 2 H2O'))+
   step('2. Moles de NaOH',chain(R`n_{\mathrm{NaOH}}=\frac{0{,}200\ \text{g}}{40\ \tfrac{\text{g}}{\text{mol}}}=5{,}00\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de H₂SO₄',chain(R`n_{\mathrm{H_2SO_4}}=\frac{5{,}00\cdot10^{-3}}{2}=2{,}50\cdot10^{-3}\ \text{mol}`))+
   step('4. Volumen',chain(R`V=\frac{2{,}50\cdot10^{-3}\ \text{mol}}{0{,}125\ \tfrac{\text{mol}}{\text{L}}}=0{,}0200\ \text{L}=20{,}0\ \text{mL}`)),
   '20,0 mL de H₂SO₄');

  ex(12,'Molaridad de una solución de Ca(OH)₂',
   `<p>Si se requieren 42.7 mL de una solución 0.208 M de ácido clorhídrico para neutralizar 50 ml una solución de hidróxido de calcio, ¿cuál es la molaridad de la solución?</p>`,
   step('1. Ecuación',rx('2 HCl + Ca(OH)2 -> CaCl2 + 2 H2O'))+
   step('2. Moles de HCl',chain(R`n_{\mathrm{HCl}}=0{,}208\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}0427\ \text{L}=8{,}88\cdot10^{-3}\ \text{mol}`))+
   step('3. Moles de Ca(OH)₂',chain(R`n_{\mathrm{Ca(OH)_2}}=\frac{8{,}88\cdot10^{-3}}{2}=4{,}44\cdot10^{-3}\ \text{mol}`))+
   step('4. Molaridad',chain(R`M=\frac{4{,}44\cdot10^{-3}\ \text{mol}}{0{,}050\ \text{L}}=0{,}0888\ M`)+simple('Valor razonable: el Ca(OH)₂ es poco soluble, sus soluciones nunca son muy concentradas')),
   '≈ 0,0888 M de Ca(OH)₂');

  ex(13,'Problema desafío 1 · Pureza del Mg(OH)₂ por retroceso',
   `<p><b>Problema desafío 1:</b> Una muestra de 0.5895 g de hidróxido de magnesio impuro se disolvió en 100.0 mL de solución 0.2050 M de ácido clorhídrico. Después, se requirió 19.85 mL de hidróxido de sodio 0.1020 M para neutralizar el exceso de ácido. Calcule el porcentaje en masa de hidróxido de magnesio en la muestra, suponiendo que es la única sustancia que reacciona con la solución de ácido.</p>`,
   step('1. Qué está pasando',`<p>Es una <b>titulación por retroceso</b>: el HCl se puso en exceso, una parte reaccionó con el Mg(OH)₂ y lo que sobró se tituló con NaOH.</p>`+rxs(['Mg(OH)2 + 2 HCl -> MgCl2 + 2 H2O','con la muestra'],['HCl + NaOH -> NaCl + H2O','titulación del exceso']))+
   step('2. HCl total agregado',chain(R`n_{\text{total}}=0{,}2050\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}1000\ \text{L}=2{,}050\cdot10^{-2}\ \text{mol}`))+
   step('3. HCl que sobró (= NaOH gastado)',chain(R`n_{\text{sobrante}}=0{,}1020\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}01985\ \text{L}=2{,}025\cdot10^{-3}\ \text{mol}`))+
   step('4. HCl que reaccionó con la muestra',chain(R`n_{\text{reaccionó}}=2{,}050\cdot10^{-2}-2{,}025\cdot10^{-3}=1{,}848\cdot10^{-2}\ \text{mol}`))+
   step('5. Mg(OH)₂ y su masa',chain(R`n_{\mathrm{Mg(OH)_2}}=\frac{1{,}848\cdot10^{-2}}{2}=9{,}238\cdot10^{-3}\ \text{mol}`,R`m=9{,}238\cdot10^{-3}\ \text{mol}\cdot58{,}32\ \tfrac{\text{g}}{\text{mol}}=0{,}5388\ \text{g}`))+
   step('6. Porcentaje en masa',chain(R`\%=\frac{0{,}5388\ \text{g}}{0{,}5895\ \text{g}}\cdot100=91{,}4\ \%`)+simple('Control: da menos de 100 %, como corresponde a una muestra impura')),
   '≈ 91,4 % de Mg(OH)₂');

  ex(14,'Problema desafío 2 · Bicarbonato para un derrame de ácido',
   `<p><b>Problema desafío 2:</b> Se derrama un poco de ácido sulfúrico en una mesa de laboratorio. El ácido puede neutralizarse espolvoreando sobre el bicarbonato de sodio y absorbiendo con un trapo la disolución resultante. El bicarbonato de sodio reacciona con el ácido sulfúrico como sigue: 2NaHCO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> → Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O + CO<sub>2</sub></p><p>Se agrega bicarbonato de sodio hasta que cesa la efervescencia causada por la formación de gas. Si se derramaron 27 mL de ácido sulfúrico 6.0 M, ¿qué masa mínima de bicarbonato de sodio debe agregarse al derrame para neutralizar el ácido?</p>`,
   step('1. Ecuación balanceada',`<p>Contando átomos, con 2 NaHCO₃ se forman <b>2</b> H₂O y <b>2</b> CO₂ (hay 2 C y 6 H a la izquierda):</p>`+rx('2 NaHCO3 + H2SO4 -> Na2SO4 + 2 H2O + 2 CO2↑','2 mol de NaHCO₃ por mol de ácido')+simple('La relación que importa para el cálculo, 2 : 1 entre bicarbonato y ácido, es la misma'))+
   step('2. Moles de H₂SO₄ derramados',chain(R`n_{\mathrm{H_2SO_4}}=6{,}0\ \tfrac{\text{mol}}{\text{L}}\cdot0{,}027\ \text{L}=0{,}162\ \text{mol}`))+
   step('3. Moles de NaHCO₃',chain(R`n_{\mathrm{NaHCO_3}}=2\cdot0{,}162=0{,}324\ \text{mol}`))+
   step('4. Masa mínima',`<p>Masa molar NaHCO₃: 23 + 1 + 12 + 3 · 16 = 84 g/mol.</p>`+chain(R`m=0{,}324\ \text{mol}\cdot84\ \tfrac{\text{g}}{\text{mol}}=27{,}2\ \text{g}`))+
   idea('Por qué «mínima»',`<p>Es la masa justa de la estequiometría. En la práctica se agrega más, hasta que deja de burbujear, porque el exceso de bicarbonato no es peligroso.</p>`),
   '≈ 27 g de NaHCO₃ (27,2 g)');

  QG.units.push({
    id:'titulaciones',part:'tp',n:1,numLabel:'TP 1',
    title:'Titulaciones ácido-base',short:'Titulaciones ácido-base',
    lead:'Cómo se titula en el laboratorio, el punto de equivalencia, los indicadores y la preparación de soluciones, con la guía de 14 ejercicios resuelta paso a paso (incluidos los dos problemas desafío).',
    sections,exercises
  });
})();
