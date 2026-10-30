// 27xSOLved · Química General de 4.º año — Unidad 5: Cinética química.
// Desarrollo autónomo de cinética química: teoría, ejemplos y ejercicios resueltos.
// Se agrega al final de las unidades de window.ET27_QG4 (se carga después de quimica-general-4-content.js).
(function(){
  'use strict';
  const K=window.ET27Kit,QG=window.ET27_QG4;if(!K||!QG)return;
  const {M,m,chain,key,sym,simple,note,fix,example,step,table,figure,cards,calc,field,fmt}=K;
  const R=String.raw;

  // ---------- Calculadoras ----------
  const val=(root,name)=>{const el=root.querySelector(`[name="${name}"]`);return el?Number(String(el.value).replace(',','.')):NaN};
  K.calcs.qgRate=root=>{
    const c1=val(root,'c1'),c2=val(root,'c2'),t1=val(root,'t1'),t2=val(root,'t2'),nu=val(root,'nu');
    const kind=root.querySelector('[name="kind"]')?.value||'r';
    if(!(t2>t1)||!(nu>0))return '<small>Revisá los datos: t₂ tiene que ser mayor que t₁ y el coeficiente, positivo.</small>';
    const dc=c2-c1,dt=t2-t1,sign=kind==='r'?-1:1,v=sign*dc/dt/nu;
    return `<b>v ≈ ${fmt(v,3)} M/s</b><br><small>Δ[ ] = ${fmt(dc,3)} M · Δt = ${fmt(dt,4)} s · ${kind==='r'?'reactivo: signo −':'producto: signo +'} · dividido por ${fmt(nu,3)}${v<0?' · ¡Ojo! Dio negativa: revisá si es reactivo o producto.':''}</small>`;
  };
  K.calcs.qgLaw=root=>{
    const k=val(root,'k'),a=val(root,'a'),mo=val(root,'mo'),b=val(root,'b'),no=val(root,'no');
    const v=k*Math.pow(a,mo)*Math.pow(b,no),tot=mo+no;
    const units=tot===0?'M/s':tot===1?'s⁻¹':`M<sup>${fmt(1-tot,3)}</sup>·s⁻¹`;
    return `<b>v ≈ ${fmt(v,3)} M/s</b><br><small>Orden total = ${fmt(mo,3)} + ${fmt(no,3)} = ${fmt(tot,3)} · unidades de k (tiempo en s): ${units}</small>`;
  };

  // ---------- Esquemas ----------
  const DATA={t:[0,4000,8000,12000,16000],N2O5:[2.15,1.88,1.64,1.43,1.25],NO2:[0,0.54,1.02,1.44,1.80],O2:[0,0.135,0.255,0.36,0.45]};
  const X=t=>70+t/16000*520,Y=c=>220-c/2.2*175;
  // Curva suave (Catmull-Rom → Bézier): pasa por todos los puntos sin ondular.
  const curve=(arr)=>{
    const p=DATA.t.map((t,i)=>[X(t),Y(arr[i])]);
    let d=`M${p[0][0]} ${p[0][1]}`;
    for(let i=0;i<p.length-1;i++){
      const p0=p[Math.max(0,i-1)],p1=p[i],p2=p[i+1],p3=p[Math.min(p.length-1,i+2)];
      const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
      d+=` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const svgGraph=`<svg viewBox="0 0 640 280" role="img" aria-label="Concentración en función del tiempo para la descomposición del N₂O₅: el reactivo baja y los productos NO₂ y O₂ suben">
    <defs><marker id="cinArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="70" y1="225" x2="610" y2="225" class="svgLine" marker-end="url(#cinArr)"/>
    <line x1="70" y1="225" x2="70" y2="10" class="svgLine" marker-end="url(#cinArr)"/>
    <text x="606" y="212" text-anchor="end" class="svgText">t (s)</text>
    <text x="78" y="22" class="svgText">conc. (M)</text>
    ${DATA.t.slice(1).map(t=>`<line x1="${X(t)}" y1="221" x2="${X(t)}" y2="229" class="svgLine"/><text x="${X(t)}" y="248" text-anchor="middle" class="svgText" font-size="12">${t}</text>`).join('')}
    ${[0.5,1,1.5,2].map(c=>`<line x1="66" y1="${Y(c)}" x2="74" y2="${Y(c)}" class="svgLine"/><text x="60" y="${Y(c)+4}" text-anchor="end" class="svgText" font-size="12">${String(c).replace('.',',')}</text>`).join('')}
    <line x1="${X(0)}" y1="${Y(2.15)}" x2="${X(11000)}" y2="${Y(2.15-0.0000713*11000)}" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="${curve(DATA.N2O5)}" fill="none" stroke="#15579D" stroke-width="3.5"/>
    <path d="${curve(DATA.NO2)}" fill="none" stroke="#F38C1B" stroke-width="3.5"/>
    <path d="${curve(DATA.O2)}" fill="none" stroke="#1E9E6A" stroke-width="3.5"/>
    ${['N2O5','NO2','O2'].map((s,j)=>DATA[s].map((c,i)=>`<circle cx="${X(DATA.t[i])}" cy="${Y(c)}" r="4" fill="${['#15579D','#F38C1B','#1E9E6A'][j]}"/>`).join('')).join('')}
    <text x="${X(16000)-4}" y="${Y(1.25)+24}" text-anchor="end" class="svgText strong" fill="#15579D">N₂O₅ (reactivo)</text>
    <text x="${X(16000)-4}" y="${Y(1.80)-10}" text-anchor="end" class="svgText strong" fill="#F38C1B">NO₂</text>
    <text x="${X(16000)-4}" y="${Y(0.45)-10}" text-anchor="end" class="svgText strong" fill="#1E9E6A">O₂</text>
    <text x="${X(11000)}" y="${Y(2.15-0.0000713*11000)+18}" text-anchor="middle" class="svgText" font-size="12" fill="#c0392b">tangente en t = 0</text>
  </svg>`;

  const svgEnergy=`<svg viewBox="0 0 640 260" role="img" aria-label="Diagrama de energía: con catalizador la barrera de energía de activación es más baja; reactivos y productos quedan en el mismo nivel">
    <defs><marker id="cinArr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="60" y1="230" x2="610" y2="230" class="svgLine" marker-end="url(#cinArr2)"/>
    <line x1="60" y1="230" x2="60" y2="20" class="svgLine" marker-end="url(#cinArr2)"/>
    <text x="600" y="252" text-anchor="end" class="svgText">avance de la reacción</text>
    <text x="68" y="24" class="svgText">energía</text>
    <path d="M80 160 H180 C250 160 260 40 320 40 C380 40 390 195 460 195 H590" fill="none" stroke="#15579D" stroke-width="3.5"/>
    <path d="M180 160 C250 160 260 105 320 105 C380 105 390 195 460 195" fill="none" stroke="#1E9E6A" stroke-width="3.5" stroke-dasharray="8 6"/>
    <line x1="150" y1="160" x2="150" y2="44" stroke="#15579D" stroke-width="2" marker-start="url(#cinArr2)" marker-end="url(#cinArr2)"/>
    <text x="142" y="100" text-anchor="end" class="svgText" fill="#15579D">Eₐ sin catalizador</text>
    <line x1="235" y1="160" x2="235" y2="110" stroke="#1E9E6A" stroke-width="2" marker-start="url(#cinArr2)" marker-end="url(#cinArr2)"/>
    <text x="243" y="140" class="svgText" fill="#1E9E6A">Eₐ con catalizador</text>
    <text x="90" y="152" class="svgText strong">reactivos</text>
    <text x="580" y="187" text-anchor="end" class="svgText strong">productos</text>
  </svg>`;

  const sections=[];
  const add=(k,label,kicker,html)=>sections.push({key:`qg5-${k}`,label,kicker,html});
  const ref=t=>`<span class="simple">(${t})</span>`;

  // ---------- 1. Qué estudia la cinética  ----------
  add('velocidad','Cinética química y velocidad de reacción','CLASE 13/10 · 01',`
<p>La <b>cinética química</b> es la parte de la química que estudia la <b>velocidad de las reacciones</b>: qué tan rápido desaparecen los reactivos y aparecen los productos, y de qué depende esa rapidez.</p>
<p>La velocidad de reacción se define a partir del el <b>cambio de la cantidad de moles por unidad de tiempo</b>, y enseguida como cambio de <b>concentración</b> por unidad de tiempo, dividido por el coeficiente estequiométrico:</p>
${chain([R`v=\frac{\Delta n}{\Delta t}`,'Δn: diferencia de número de moles'],[R`v=\frac{1}{\nu_i}\cdot\frac{\Delta C_i}{\Delta t}`,'νᵢ: coeficiente estequiométrico de la especie i'])}
<p>Es decir:</p>
${key(R`v=\frac{\text{cambio de concentración}}{\text{cambio de tiempo}}`,'Velocidad de reacción')}
<p>Con la concentración en mol/L (M) y el tiempo en segundos, la velocidad queda en <b>M/s</b> (mol·L⁻¹·s⁻¹). ${simple('Si el tiempo está en minutos, queda en M/min: así aparece en el ejercicio 8 ')}</p>
${fix('Sobre “siempre se expresa en M/s”',`<p>El material  dice que la velocidad “siempre se expresa en M/s”. Vale cuando el tiempo está en segundos; la unidad general es <b>concentración / tiempo</b>. En la guía aparecen también mol dm⁻³ s⁻¹ (que es lo mismo que M/s) y mol dm⁻³ min⁻¹.</p>`)}
<h3>Expresiones de velocidad según la estequiometría</h3>
<p>Para una reacción general:</p>
${M(R`aA+bB\rightarrow cC+dD`)}
${key(R`v=-\frac{1}{a}\frac{d[A]}{dt}=-\frac{1}{b}\frac{d[B]}{dt}=\frac{1}{c}\frac{d[C]}{dt}=\frac{1}{d}\frac{d[D]}{dt}`,'La fórmula más importante de la primera parte')}
<h4>¿Por qué es así?</h4>
<ul class="kitList">
 <li>Los <b>reactivos disminuyen</b>: su variación es negativa, por eso llevan <b>signo −</b> (así la velocidad da positiva).</li>
 <li>Los <b>productos aumentan</b>: llevan <b>signo +</b>.</li>
 <li>Se <b>divide por el coeficiente estequiométrico</b> porque la velocidad de la reacción es una sola, pero las concentraciones cambian en proporciones fijas según los coeficientes.</li>
</ul>
${note('Δ o d: velocidad media o instantánea',`<p>La notación Δ (Δ[ ]/Δt) representa es la <b>velocidad media</b> en un intervalo. La notación diferencial d (d[ ]/dt) representa es la <b>velocidad instantánea</b>, el límite cuando el intervalo se hace muy chico. ${simple('Gráficamente, la media es la pendiente de una recta entre dos puntos; la instantánea, la pendiente de la tangente en un punto')} Para escribir las expresiones de velocidad, las dos se arman igual.</p>`)}
<h3>Velocidad de desaparición y de formación</h3>
<p>Antes de dividir por los coeficientes, cada especie tiene su propia velocidad:</p>
${chain([R`v(A)=-\frac{d[A]}{dt}`,'velocidad de desaparición de un reactivo'],[R`v(P)=+\frac{d[P]}{dt}`,'velocidad de formación de un producto'])}
<p>Recién al dividirlas por su coeficiente todas dan el mismo número: la <b>velocidad de la reacción</b>.</p>
`);

  // ---------- 2. Ejemplos de aplicación ----------
  add('ejemplos','Primeros ejemplos: Na + Cl₂ y descomposición del N₂O₅','CLASE 13/10 · 02',`
<h3>1) Sodio y cloro</h3>
<p><b>“Balancear se necesita”</b>. Antes de escribir velocidades, la ecuación tiene que estar balanceada:</p>
${M(R`2\,\mathrm{Na_{(s)}}+\mathrm{Cl_{2(g)}}\rightarrow2\,\mathrm{NaCl_{(s)}}`)}
${chain([R`v_{\mathrm{Na}}=-\frac12\cdot\frac{\Delta[\mathrm{Na}]}{\Delta t}`],[R`v_{\mathrm{Cl_2}}=-1\cdot\frac{\Delta[\mathrm{Cl_2}]}{\Delta t}`],[R`v_{\mathrm{NaCl}}=\frac12\cdot\frac{\Delta[\mathrm{NaCl}]}{\Delta t}`])}
<p><b>v<sub>NaCl</sub> = v<sub>Na</sub> = v<sub>Cl₂</sub></b>. Una vez divididas por los coeficientes, las tres expresiones dan la misma velocidad de reacción.</p>
${fix('Coeficiente del NaCl',`<p>La ecuación balanceada es 2 Na + Cl₂ → 2 NaCl; por eso la expresión del NaCl lleva ½.</p>`)}
${note('Un detalle para más adelante',`<p>Na y NaCl son sólidos: en la práctica, la velocidad se sigue con especies en solución o en fase gaseosa, cuya concentración sí cambia. El ejemplo sirve para practicar cómo se arman los signos y los coeficientes.</p>`)}

<h3>Ejercicio: calcular la velocidad de reacción</h3>
<p>Descomposición del pentóxido de dinitrógeno:</p>
${M(R`\mathrm{N_2O_{5(g)}}\rightarrow2\,\mathrm{NO_{2(g)}}+\tfrac12\,\mathrm{O_{2(g)}}`)}
<p><b>“Balancear las ecuaciones: se sabe que se forma 0,5 mol de O₂”</b> (por cada mol de N₂O₅).</p>
${table(['t (s)','[N₂O₅] (M)','[NO₂] (M)','[O₂] (M)'],[['0','2,15','0','0'],['4000','1,88','0,54','0,135'],['8000','1,64','1,02','0,255'],['12000','1,43','1,44','0,36'],['16000','1,25','1,80','0,45']])}
${fix('Consistencia de datos ',`<p>Las columnas de NO₂ y O₂ se leen claras y respetan la proporción 2 : ½ (el O₂ es siempre la cuarta parte del NO₂). La concentración de N₂O₅ debe cumplir la proporción estequiométrica en todos los tiempos. Como por cada mol de NO₂ que se forma se gasta medio mol de N₂O₅, los valores de esa columna se recalcularon a partir del NO₂: <b>[N₂O₅] = 2,15 − ½·[NO₂]</b>. Para el cálculo se consideran t = 0 y t = 4000 s.</p>`)}
${step('1. Expresión de la velocidad',chain(R`v=-\frac{\Delta[\mathrm{N_2O_5}]}{\Delta t}=\frac12\frac{\Delta[\mathrm{NO_2}]}{\Delta t}=2\,\frac{\Delta[\mathrm{O_2}]}{\Delta t}`))}
${step('2. Con el reactivo (0 → 4000 s)',chain(R`v=-\frac{1{,}88-2{,}15}{4000-0}\ \mathrm{\frac{M}{s}}`,R`v=\frac{0{,}27}{4000}\ \mathrm{\frac{M}{s}}`,R`v=6{,}75\cdot10^{-5}\ \mathrm{M/s}`))}
${step('3. Control con los productos',chain([R`v=\frac12\cdot\frac{0{,}54-0}{4000-0}=6{,}75\cdot10^{-5}\ \mathrm{M/s}`,'con NO₂'],[R`v=2\cdot\frac{0{,}135-0}{4000-0}=6{,}75\cdot10^{-5}\ \mathrm{M/s}`,'con O₂']))}
${note('Resultado',`<p>Con cualquiera de las tres especies, la velocidad media entre 0 y 4000 s es <b>v = 6,75 · 10⁻⁵ M/s</b>, el mismo valor que en la ecuación.</p>`)}
${fix('Coeficientes y unidades ',`<p>La expresión de velocidad se obtiene a partir de la ecuación balanceada. El resultado 6,75 · 10⁻⁵ que figura en la ecuación corresponde a escribir la ecuación <b>por 1 mol de N₂O₅</b>, como arriba. Si en cambio se escribe <b>2 N₂O₅ → 4 NO₂ + O₂</b>, la expresión es ${m(R`v=-\tfrac12\tfrac{\Delta[\mathrm{N_2O_5}]}{\Delta t}=\tfrac14\tfrac{\Delta[\mathrm{NO_2}]}{\Delta t}=\tfrac{\Delta[\mathrm{O_2}]}{\Delta t}`)} y da la mitad: 3,38 · 10⁻⁵ M/s. ${simple('La velocidad “de la reacción” depende de cómo se escribió la ecuación; la velocidad con que se gasta o se forma cada sustancia, no')} La unidad correcta es <b>M/s</b> (mol·L⁻¹·s⁻¹), no “mol/seg”, porque se usan concentraciones.</p>`)}
<h4>La velocidad no es constante</h4>
<p>Si se repite la cuenta en cada intervalo de la tabla, la velocidad media va bajando: a medida que se gasta el reactivo, la reacción se hace más lenta.</p>
${table(['Intervalo (s)','−Δ[N₂O₅] (M)','v media (M/s)'],[['0 – 4000','0,27','6,75 · 10⁻⁵'],['4000 – 8000','0,24','6,00 · 10⁻⁵'],['8000 – 12000','0,21','5,25 · 10⁻⁵'],['12000 – 16000','0,18','4,50 · 10⁻⁵']])}
${calc('qgRate','Velocidad media a partir de una tabla',`<label><span>Especie</span><select name="kind"><option value="r">Reactivo (signo −)</option><option value="p">Producto (signo +)</option></select></label>`+field('c1','[ ] en t₁ (M)',2.15)+field('c2','[ ] en t₂ (M)',1.88)+field('t1','t₁ (s)',0)+field('t2','t₂ (s)',4000)+field('nu','coeficiente',1),'Viene cargado con el N₂O₅ entre 0 y 4000 s.')}
`);

  // ---------- 3. Ejercicio N.º 2 ----------
  add('expresar','Expresar velocidades con ecuaciones a balancear','EJERCICIO · 03',`
<p><b>Consigna :</b> “Dadas las siguientes ecuaciones expresar las velocidades de reacción según corresponda. Balancear por método ion-electrón.”</p>
${M(R`\text{a)}\ \ \mathrm{IO_3^-{}_{(ac)}+I^-{}_{(ac)}+H^+\rightarrow I_2+H_2O}`)}
${M(R`\text{b)}\ \ \mathrm{H_2O_2+IO^-\rightarrow H_2O+O_2+I^-}`)}
${M(R`\text{c)}\ \ \mathrm{HCrO_4^-+3\,HSO_3^-+5\,H^+\rightarrow Cr^{3+}+3\,SO_4^{2-}+5\,H_2O}`)}
${fix('Sobre el inciso c)',`<p>Para el balance de la reacción, El cromo del producto es el ion <b>Cr³⁺</b>, y para balancear hace falta un <b>2</b> también delante del HCrO₄⁻ (ver abajo).</p>`)}
${note('Método',`<ol class="kitList"><li>Balancear la ecuación (ion-electrón).</li><li>Escribir cada especie con signo − (reactivo) o + (producto).</li><li>Dividir por su coeficiente.</li></ol><p>El <b>agua</b>, cuando es el solvente, casi no cambia su concentración: por eso en general no se usa para seguir la velocidad. Igual se puede escribir.</p>`)}
${example('a) Iodato con ioduro en medio ácido','',
 step('Semirreacciones',chain([R`\mathrm{2\,IO_3^-+12\,H^++10\,e^-\rightarrow I_2+6\,H_2O}`,'reducción: el I pasa de +5 a 0'],[R`\mathrm{2\,I^-\rightarrow I_2+2\,e^-}\quad(\times5)`,'oxidación: el I pasa de −1 a 0'],[R`\mathrm{2\,IO_3^-+10\,I^-+12\,H^+\rightarrow6\,I_2+6\,H_2O}`,'sumo y simplifico por 2']))+
 step('Ecuación balanceada',M(R`\mathrm{IO_3^-+5\,I^-+6\,H^+\rightarrow3\,I_2+3\,H_2O}`))+
 step('Velocidad',M(R`v=-\frac{\Delta[\mathrm{IO_3^-}]}{\Delta t}=-\frac15\frac{\Delta[\mathrm{I^-}]}{\Delta t}=-\frac16\frac{\Delta[\mathrm{H^+}]}{\Delta t}=\frac13\frac{\Delta[\mathrm{I_2}]}{\Delta t}`)),
 'IO₃⁻ + 5 I⁻ + 6 H⁺ → 3 I₂ + 3 H₂O')}
${example('b) Agua oxigenada con hipoiodito','',
 step('Ya está balanceada',`<p>Contando átomos: H 2 = 2; O 3 = 3; I 1 = 1; carga −1 = −1. El hipoiodito (IO⁻) existe en medio básico; con semirreacciones en medio básico se llega a la misma ecuación:</p>`+chain([R`\mathrm{IO^-+H_2O+2\,e^-\rightarrow I^-+2\,OH^-}`,'reducción: I de +1 a −1'],[R`\mathrm{H_2O_2+2\,OH^-\rightarrow O_2+2\,H_2O+2\,e^-}`,'oxidación: O de −1 a 0'],[R`\mathrm{H_2O_2+IO^-\rightarrow H_2O+O_2+I^-}`,'sumo y cancelo']))+
 step('Velocidad',M(R`v=-\frac{\Delta[\mathrm{H_2O_2}]}{\Delta t}=-\frac{\Delta[\mathrm{IO^-}]}{\Delta t}=\frac{\Delta[\mathrm{O_2}]}{\Delta t}=\frac{\Delta[\mathrm{I^-}]}{\Delta t}`)),
 'Todos los coeficientes son 1')}
${example('c) Cromato ácido con hidrogenosulfito','',
 step('Semirreacciones',chain([R`\mathrm{HCrO_4^-+7\,H^++3\,e^-\rightarrow Cr^{3+}+4\,H_2O}\quad(\times2)`,'reducción: Cr de +6 a +3'],[R`\mathrm{HSO_3^-+H_2O\rightarrow SO_4^{2-}+3\,H^++2\,e^-}\quad(\times3)`,'oxidación: S de +4 a +6']))+
 step('Sumo (6 electrones) y simplifico H⁺ y H₂O',M(R`\mathrm{2\,HCrO_4^-+3\,HSO_3^-+5\,H^+\rightarrow2\,Cr^{3+}+3\,SO_4^{2-}+5\,H_2O}`)+`<p>Control: carga −2 − 3 + 5 = 0 a la izquierda y +6 − 6 = 0 a la derecha.</p>`)+
 step('Velocidad',M(R`v=-\frac12\frac{\Delta[\mathrm{HCrO_4^-}]}{\Delta t}=-\frac13\frac{\Delta[\mathrm{HSO_3^-}]}{\Delta t}=-\frac15\frac{\Delta[\mathrm{H^+}]}{\Delta t}=\frac12\frac{\Delta[\mathrm{Cr^{3+}}]}{\Delta t}=\frac13\frac{\Delta[\mathrm{SO_4^{2-}}]}{\Delta t}`)),
 '2 HCrO₄⁻ + 3 HSO₃⁻ + 5 H⁺ → 2 Cr³⁺ + 3 SO₄²⁻ + 5 H₂O')}
`);

  // ---------- 4. Análisis gráfico  ----------
  add('grafico','Análisis gráfico','CLASE 19/10 · 04',`
<p>Con la tabla del N₂O₅ se grafica la <b>concentración (M)</b> en función del <b>tiempo (s)</b>:</p>
${figure(svgGraph,'El reactivo baja y los productos suben; las curvas se van aplanando. La línea punteada es la tangente en t = 0.')}
<ul class="kitList">
 <li>La curva del <b>reactivo (N₂O₅) desciende</b>: se va gastando.</li>
 <li>Las curvas de los <b>productos (NO₂ y O₂) crecen</b> y tienden a estabilizarse.</li>
 <li>El NO₂ crece el doble de rápido que lo que baja el N₂O₅, y el O₂ la cuarta parte que el NO₂: son los coeficientes 1 : 2 : ½.</li>
 <li>Al principio las curvas son más empinadas: la reacción es <b>más rápida al comienzo</b>, cuando hay más reactivo.</li>
</ul>
<h3>Media e instantánea en el gráfico</h3>
<p>La <b>velocidad media</b> entre dos tiempos es la pendiente de la recta que une esos dos puntos de la curva. La <b>velocidad instantánea</b> en un tiempo es la pendiente de la <b>recta tangente</b> a la curva en ese punto (la línea punteada, en t = 0). ${simple('Por eso la velocidad inicial es la más grande: es donde la curva está más inclinada')}</p>
${fix('Interpretación del gráfico ',`<p>Para interpretar las curvas, En esta reacción solo intervienen <b>N₂O₅, NO₂ y O₂</b>: las curvas inferiores corresponden al O₂.</p>`)}
`);

  // ---------- 5. Ley empírica de velocidad y órdenes ----------
  add('ley','Ley empírica de velocidad y órdenes de reacción','CLASE 19/10 · 05',`
<p>La velocidad depende de las <b>concentraciones de los reactivos</b>. La relación entre ambas es la <b>ley de velocidad</b>, y es <b>empírica</b>: se determina con datos experimentales.</p>
<p>Para una reacción</p>
${M(R`aA+bB\rightarrow\text{productos}`)}
${key(R`v=k\,[A]^m\,[B]^n`,'Ley de velocidad')}
${sym([['k','constante de velocidad (depende de la temperatura)','según el orden'],['m, n','órdenes parciales respecto de A y de B','sin unidad'],['m + n','orden total (orden global)','sin unidad'],[R`[A],[B]`,'concentraciones molares de los reactivos','M']])}
${fix('Definición y ley de velocidad en la ecuación',`<p>Es importante distinguir dos conceptos: <b>d[A]/dt</b> es la definición de velocidad (sección 01), y la <b>ley de velocidad</b> dice de qué depende esa velocidad: ${m(R`v=k[A]^m[B]^n`)}. La anotación debajo de k (“a temperaturas diferentes, una cte de velocidad distinta”) sí es correcta: <b>k cambia con la temperatura</b>.</p>`)}
${note('Los órdenes NO salen de la ecuación química',`<p>Los exponentes m y n <b>se miden</b>; no son, en general, los coeficientes estequiométricos. El orden respecto de cada reactivo es un parámetro experimental y suele ser un número entero o racional (0, 1, 2, ½…). ${ref('afirmación ii del ejercicio 6')}</p>`)}
<h3>Órdenes de velocidad</h3>
<p>El <b>orden global</b> es la <b>suma de los órdenes</b> respecto de cada reactivo.</p>
${table(['Ley de velocidad','Orden global'],[[m(R`v=k`),'0'],[m(R`v=k[A]`),'1'],[m(R`v=k[A][B]`),'2 (1 + 1)'],[m(R`v=k[A]^2`),'2'],[m(R`v=k[A][B]^{1/2}`),'3/2 (1 + ½)']])}
${fix('Interpretación de órdenes ',`<p>Para identificar el orden, se suman los exponentes de las concentraciones. Para orden 1 la ley es <b>v = k[A]</b> (exponente 1; [A]⁰ = 1 daría orden 0). Y ([A][B])<sup>1/2</sup> tendría orden ½ + ½ = 1; un ejemplo de orden 3/2 es <b>v = k[A][B]<sup>1/2</sup></b>. Además, todas las leyes llevan la constante k.</p>`)}
<h3>Cómo descubrir los órdenes (m y n)</h3>
<p>Se usa el <b>método de comparación de experimentos</b>: se comparan dos experimentos en los que <b>cambia una sola concentración</b> y se mira cuánto cambia la velocidad. ${ref('ejercicios 7, 8, 9 y 10')}</p>
${table(['Si duplicar [A]…','el orden en A es'],[['no cambia v','0'],['duplica v','1'],['cuadruplica v','2']])}
<p>En general: si [A] se multiplica por f y v se multiplica por f<sup>m</sup>, el orden es m. ${simple('Triplicar [A] y que v se triplique también es orden 1')}</p>

<h3>Cómo sacar el orden con una tabla de experimentos: fórmula que sirve siempre</h3>
<p><b>Idea clave:</b> dividir la velocidad del experimento 2 por la del 1 <b>no da directamente el orden</b>: da el factor por el que cambió la velocidad. También hay que comparar cuánto cambió la concentración. Elegí dos filas donde <b>solo cambie la concentración del reactivo que estás estudiando</b>; las demás deben permanecer constantes.</p>
${chain([R`v=k[A]^m[B]^n`,'Ley de velocidad: m y n son los órdenes parciales'],[R`\frac{v_2}{v_1}=\left(\frac{[A]_2}{[A]_1}\right)^m`,'Al comparar dos experimentos con [B] constante, k y [B] se cancelan'],[R`m=\frac{\log(v_2/v_1)}{\log([A]_2/[A]_1)}`,'Fórmula general para calcular el orden en A'],[R`n=\frac{\log(v_2/v_1)}{\log([B]_2/[B]_1)}`,'Para calcular el orden en B, compará otras dos filas con [A] constante'],[R`\text{Orden total}=m+n`,'Sumá los órdenes parciales'])}
<p><b>Ejemplo explicado:</b> si al duplicar [A] la velocidad se cuadruplica, la relación de velocidades es 4 y la relación de concentraciones es 2. Buscamos el exponente m que convierte 2 en 4:</p>
${chain([R`\frac{v_2}{v_1}=4`,'La velocidad se multiplicó por cuatro'],[R`\frac{[A]_2}{[A]_1}=2`,'La concentración se duplicó'],[R`4=2^m`,'El orden es el exponente, no el cociente de velocidades'],[R`m=\frac{\log 4}{\log 2}=2`,'Segundo orden respecto de A'])}
<p><b>Atajo cuando la concentración se duplica:</b> si la velocidad no cambia, orden 0; si se duplica, orden 1; si se cuadruplica, orden 2; si se multiplica por ocho, orden 3. <b>La fórmula con logaritmos funciona también cuando la concentración se triplica, se reduce a la mitad o cambia por cualquier otro factor positivo distinto de 1.</b></p>
<p><b>Atención:</b> si en las dos filas cambian simultáneamente A y B, no podés usar directamente la fórmula de un solo reactivo: necesitás otra comparación o resolver los exponentes conjuntamente.</p>

<h3>Método de velocidades iniciales: resolución completa</h3>
<p>Para v = k[A]<sup>m</sup>[B]<sup>n</sup>, los exponentes m y n se determinan experimentalmente. Compará dos experimentos donde una concentración permanezca fija. Si A cambia por un factor f y la velocidad por un factor g, entonces g = f<sup>m</sup> y m = log(g)/log(f). Repetí con B. El orden global es m + n; finalmente calculá k = v/([A]<sup>m</sup>[B]<sup>n</sup>) y verificá otra fila. <b>Los órdenes no se deducen de los coeficientes de la ecuación global.</b></p>
<h3>Cuatro ejercicios modelo con tablas experimentales</h3>
<h4>Ejemplo 1 · Primer orden en ambos reactivos</h4>
<p>Para A + B → productos, determinar la ley de velocidad, orden total y k.</p>
${table(['Experimento','[A] (M)','[B] (M)','v inicial (M/s)'],[['1','0,10','0,10','0,0020'],['2','0,20','0,10','0,0040'],['3','0,10','0,30','0,0060']])}
<p><b>Paso 1:</b> de 1 a 2, A se duplica y v se duplica (B fija): m = 1. <b>Paso 2:</b> de 1 a 3, B se triplica y v se triplica (A fija): n = 1. <b>Paso 3:</b> v = k[A][B]; orden global = 2. <b>Paso 4:</b> k = 0,0020/(0,10·0,10) = <b>0,20 M⁻¹ s⁻¹</b>.</p>
<h4>Ejemplo 2 · Orden cero y segundo orden</h4>
${table(['Experimento','[A] (M)','[B] (M)','v inicial (M/s)'],[['1','0,10','0,10','0,0030'],['2','0,20','0,10','0,0030'],['3','0,10','0,20','0,0120']])}
<p><b>Paso 1:</b> de 1 a 2, duplicar A no cambia v: m = 0. <b>Paso 2:</b> de 1 a 3, duplicar B cuadruplica v: n = 2. <b>Paso 3:</b> v = k[B]²; orden global = 2. <b>Paso 4:</b> k = 0,0030/(0,10)² = <b>0,30 M⁻¹ s⁻¹</b>.</p>
<h4>Ejemplo 3 · Orden fraccionario</h4>
${table(['Experimento','[A] (M)','[B] (M)','v inicial (M/s)'],[['1','0,10','0,10','0,0040'],['2','0,40','0,10','0,0080'],['3','0,10','0,20','0,0080']])}
<p><b>Paso 1:</b> A se cuadruplica y v se duplica: 2 = 4<sup>m</sup> ⇒ m = ½. <b>Paso 2:</b> B se duplica y v se duplica: n = 1. <b>Paso 3:</b> v = k[A]<sup>½</sup>[B]; orden global = 3/2. <b>Paso 4:</b> k = 0,0040/(√0,10 · 0,10) ≈ <b>0,1265 M⁻½ s⁻¹</b>.</p>
<h4>Ejemplo 4 · Cambian simultáneamente las concentraciones</h4>
${table(['Experimento','[A] (M)','[B] (M)','v inicial (M/s)'],[['1','0,10','0,10','0,0010'],['2','0,20','0,20','0,0080'],['3','0,40','0,20','0,0320']])}
<p><b>Paso 1:</b> comparar 3 y 2: B constante, A se duplica y v se cuadruplica ⇒ m = 2. <b>Paso 2:</b> comparar 2 y 1: ambas concentraciones se duplican y v aumenta 8 veces: 8 = 2²·2<sup>n</sup> ⇒ n = 1. <b>Paso 3:</b> v = k[A]²[B]; orden global = 3. <b>Paso 4:</b> k = 0,0010/(0,10²·0,10) = <b>1,0 M⁻² s⁻¹</b>.</p>

<h3>Unidades de la constante k</h3>
<p>Como v está en M/s y las concentraciones en M, las unidades de k dependen del orden total:</p>
${table(['Orden total','Ley','Unidades de k'],[['0',m(R`v=k`),'M/s'],['1',m(R`v=k[A]`),'s⁻¹'],['2',m(R`v=k[A]^2`),'M⁻¹ s⁻¹'],['3',m(R`v=k[A]^2[B]`),'M⁻² s⁻¹']])}
${chain([R`[k]=\frac{\mathrm{M/s}}{\mathrm{M}^{\text{orden total}}}=\mathrm{M}^{\,1-\text{orden total}}\,\mathrm{s}^{-1}`,'regla general'])}
<h3>Cómo encontrar k</h3>
<p>Si se conocen la velocidad y las concentraciones de un experimento:</p>
${key(R`k=\frac{v}{[A]^m\,[B]^n}`,'Despeje de k')}
${calc('qgLaw','Ley de velocidad',field('k','k',3.408)+field('a','[A] (M)',0.3)+field('mo','orden m',1,'0.5')+field('b','[B] (M)',0.3)+field('no','orden n',1,'0.5'),'Viene cargado con el ejercicio 8 b.')}
`);

  // ---------- 6. Mecanismos de reacción ----------
  add('mecanismos','Mecanismos de reacción','CLASE 19/10 · 06',`
<p>Muchas reacciones no ocurren en un solo choque, sino en varios <b>pasos</b>. El conjunto de pasos es el <b>mecanismo de reacción</b>. Sumando los pasos se obtiene la <b>ecuación global</b>.</p>
<p>En estos ejemplos, R, R′ y R″ son <b>cadenas hidrocarbonadas</b>.</p>

<h3>Pasos elementales, paso lento y perfiles de energía</h3>
<p>Un mecanismo es una secuencia de <b>pasos elementales</b>. La suma de sus ecuaciones, cancelando las especies comunes, da la ecuación global. Un <b>intermediario</b> se forma en una etapa y se consume en otra; no aparece en la ecuación global. El <b>paso lento</b> limita la rapidez del mecanismo. En un perfil de energía con varias etapas hay un máximo (estado de transición) por etapa y un mínimo entre máximos (intermediario). La energía de activación de cada etapa se mide desde el mínimo anterior hasta el máximo correspondiente.</p>
<p><b>Importante:</b> la ley de velocidad de un paso elemental puede escribirse a partir de su molecularidad; esto NO puede hacerse directamente con la ecuación global. Si hay un equilibrio rápido antes del paso lento, hay que utilizarlo para eliminar los intermediarios de la ley.</p>
<h3>Ejemplo · Monóxido de nitrógeno y oxígeno</h3>
<p>Reacción global: <b>2 NO(g) + O₂(g) → 2 NO₂(g)</b>. Consideremos el siguiente mecanismo propuesto:</p>
${chain([R`2NO_{(g)}\rightleftharpoons N_2O_{2(g)}`,'paso 1: formación reversible del intermediario'],[R`N_2O_{2(g)}+O_{2(g)}\rightarrow2NO_{2(g)}`,'paso 2: consumo del intermediario'])}
<p>Al sumar las dos etapas, el N₂O₂ se cancela: es el <b>intermediario</b>, porque se forma y luego se consume. El producto final es NO₂. El mecanismo no permite decidir cuál paso es lento sin información adicional.</p>
<p><b>Si</b> el primer paso está en equilibrio rápido y el segundo es lento, entonces v = k₂[N₂O₂][O₂]. Como [N₂O₂] = K₁[NO]², resulta <b>v = k₂K₁[NO]²[O₂]</b>. Esta deducción depende de las hipótesis del mecanismo, no solamente de la ecuación global.</p>
${figure(`<svg viewBox="0 0 640 260" role="img" aria-label="Perfil de energía exotérmico con dos estados de transición y un intermediario"><line x1="45" y1="228" x2="612" y2="228" stroke="currentColor"/><line x1="45" y1="228" x2="45" y2="15" stroke="currentColor"/><text x="55" y="20" fill="currentColor">Energía potencial</text><text x="430" y="252" fill="currentColor">Avance de reacción →</text><path d="M70 175 H125 C170 175 170 40 220 40 C270 40 270 145 325 145 C380 145 375 92 420 92 C470 92 475 205 525 205 H590" fill="none" stroke="#15579D" stroke-width="4"/><text x="70" y="165" fill="currentColor">Reactivos</text><text x="280" y="166" fill="currentColor">Intermediario</text><text x="510" y="195" fill="currentColor">Productos</text><text x="190" y="30" fill="currentColor">TS₁</text><text x="410" y="80" fill="currentColor">TS₂</text></svg>`,'Perfil energético de dos etapas: dos máximos y un intermediario. Los productos quedan a menor energía que los reactivos (exotérmica).')}

<h3>Vocabulario</h3>
${table(['Término','Qué es'],[['<b>Nucleófilo</b> (Nu⁻)','Especie con un par de electrones disponible que “busca” un centro positivo (carga − o un par libre, como en el NH₃).'],['<b>Electrófilo</b> (E⁺)','Especie con defecto de electrones que “busca” electrones (carga + o parcial +, como el carbocatión R₃C⁺).'],['<b>Carbocatión</b>','Carbono con solo tres enlaces y carga positiva.'],['<b>Intermediario de reacción</b>','Especie que se genera en un paso de reacción y se consume en el siguiente: no aparece en la ecuación global.']])}
${fix('Identificación de especies ',`<p>En la sustitución nucleofílica, se distinguen el grupo saliente y el electrófilo. El Br⁻ es el <b>grupo saliente</b> (se lleva el par de electrones del enlace); el <b>electrófilo</b> es el carbocatión R₃C⁺. En el equilibrio NH₃ ⇌ NH₄⁺: el <b>NH₃</b> es un nucleófilo neutro porque tiene un par de electrones libre; cuando lo usa para tomar un H⁺, se forma el NH₄⁺.</p>`)}
<h3>2) Sustitución</h3>
<p>Un grupo de la molécula (Br) es reemplazado por otro (el nucleófilo). Ocurre en dos pasos:</p>
${chain([R`\mathrm{R_3C{-}Br\rightleftharpoons R_3C^++Br^-}`,'paso 1: se rompe el enlace C–Br y queda un carbocatión'],[R`\mathrm{R_3C^++Nu^-\rightarrow R_3C{-}Nu}`,'paso 2: el nucleófilo se une al carbocatión'])}
<p>El enlace C–Br está polarizado: el C tiene carga parcial positiva (δ+) y el Br, carga parcial negativa (δ−).</p>
${key(R`\mathrm{R_3C{-}Br+Nu^-\rightarrow R_3C{-}Nu+Br^-}`,'Ecuación global · reacción de sustitución')}
<p><b>Intermediario de reacción:</b> el carbocatión R₃C⁺ (se forma en el paso 1 y se gasta en el 2).</p>
${note('Conexión con la ley de velocidad',`<p>Si el paso 1 es el <b>lento</b>, es el que manda en la velocidad: la velocidad depende solo de [R₃C–Br] y no del nucleófilo. Es exactamente lo que se mide en el <b>ejercicio 7</b> : el (CH₃)₃CBr con OH⁻ tiene <b>orden 1</b> en el bromuro y <b>orden 0</b> en el OH⁻ (sustitución SN1). ${simple('Por eso los órdenes se miden: la ecuación global tiene OH⁻, pero la velocidad no depende de él')}</p>`)}
<h3>Ejercicio N.º 2: adición</h3>
<p><b>Consignas:</b> 1) escribir la ecuación global; 2) identificar si hay algún intermediario de reacción; 3) indicar qué tipo de reacción es.</p>
${chain([R`\mathrm{{>}C{=}C{<}+E^+\rightarrow{-}\overset{|}{\underset{|}{C}}(E){-}C^+{<}}`,'paso 1: el electrófilo se une a uno de los carbonos del doble enlace'],[R`\mathrm{{-}\overset{|}{\underset{|}{C}}(E){-}C^+{<}+Nu^-\rightarrow{-}\overset{|}{\underset{|}{C}}(E){-}\overset{|}{\underset{|}{C}}(Nu){-}}`,'paso 2: el nucleófilo se une al carbocatión'])}
${example('Respuestas del ejercicio','',
 step('1. Ecuación global',M(R`\mathrm{{>}C{=}C{<}+E^++Nu^-\rightarrow{-}C(E){-}C(Nu){-}}`)+`<p>Se suman los pasos y se cancela lo que aparece a los dos lados. <b>igual cantidad de reactivos con igual cantidad de productos</b> (la ecuación global queda balanceada).</p>`)+
 step('2. Intermediario',`<p>El <b>carbocatión</b>: se forma en el paso 1 y se consume en el 2.</p>`)+
 step('3. Tipo de reacción',`<p>Es una <b>adición</b>: dos sustancias se transforman en un único producto nuevo. No es una sustitución, porque no sale ningún grupo de la molécula.</p>`),
 'Adición · intermediario: carbocatión')}
${table(['','Sustitución','Adición'],[['Qué pasa','Un grupo sale y otro entra en su lugar','Se rompe el doble enlace y se suman dos grupos'],['Ejemplo ','R₃C–Br + Nu⁻ → R₃C–Nu + Br⁻','C=C + E⁺ + Nu⁻ → E–C–C–Nu'],['Intermediario','carbocatión','carbocatión']])}
`);


  { const sec=sections.find(x=>x.key==='qg5-mecanismos'); if(sec) sec.html += `<h3>Guía para explicar en clase: mecanismos desde cero</h3>
<p><b>Primero, tres ideas distintas:</b> (1) sumar etapas para obtener la reacción global; (2) reconocer un intermediario que se forma y luego se consume; (3) obtener una ley de velocidad, que exige conocer el paso lento y las hipótesis del mecanismo.</p>
<h3>1. Cómo se suman las etapas</h3>
${chain(R`A+B\rightarrow C`,R`C+D\rightarrow E`,R`A+B+C+D\rightarrow C+E`,R`A+B+D\rightarrow E`)}
<p>C aparece como producto de la primera etapa y reactivo de la segunda. Se cancela de ambos lados. Por eso C es un <b>intermediario</b> y no aparece en la ecuación global. La suma no permite deducir automáticamente la ley de velocidad.</p>
<h3>2. Ejemplo con NO y oxígeno</h3>
${chain(R`2NO\rightleftharpoons N_2O_2`,R`N_2O_2+O_2\rightarrow2NO_2`,R`2NO+O_2\rightarrow2NO_2`)}
<p>En este mecanismo didáctico propuesto, N₂O₂ se forma en el primer paso y se consume en el segundo. <b>No se debe confundir el intermediario con el estado de transición:</b> el primero está en un valle del gráfico energético; el segundo, en un pico.</p>
<h3>3. ¿Por qué se reemplaza una concentración por otra?</h3>
<p><b>Supongamos</b> que la primera etapa reversible alcanza un equilibrio rápido y que la segunda etapa es lenta. La velocidad del paso lento depende de N₂O₂, pero podemos expresar su concentración usando el equilibrio de la primera etapa.</p>
${step('Paso A. Velocidad de la etapa lenta',chain(R`v=k_2[N_2O_2][O_2]`))}
${step('Paso B. Equilibrio rápido de la primera etapa',chain(R`K_1=\frac{[N_2O_2]}{[NO]^2}`))}
${step('Paso C. Despejar el intermediario',chain(R`K_1[NO]^2=[N_2O_2]`,R`[N_2O_2]=K_1[NO]^2`))}
${step('Paso D. Reemplazar en la velocidad',chain(R`v=k_2[N_2O_2][O_2]`,R`v=k_2(K_1[NO]^2)[O_2]`,R`v=(k_2K_1)[NO]^2[O_2]`,R`v=k[NO]^2[O_2]`))}
<p><b>Frase para decir en clase:</b> “No reemplazamos N₂O₂ por NO porque sí. Primero despejamos cuánto N₂O₂ hay usando el equilibrio rápido. Recién entonces sustituimos esa expresión en la fórmula de velocidad del paso lento”. Es un reemplazo algebraico, no una reacción química adicional.</p>
<p><b>Advertencia:</b> si el primer paso no está en preequilibrio, esta sustitución no es válida automáticamente. También puede necesitarse un análisis de estado estacionario. Si el primer paso es lento y reversible, su velocidad neta incluye la reacción inversa.</p>
<h3>4. Cómo leer el gráfico</h3>
<p>Cada <b>pico</b> corresponde a un estado de transición y cada <b>valle entre picos</b> a un intermediario. Dos etapas suelen representarse con dos picos y un valle. La energía de activación de cada etapa se mide desde su nivel inicial hasta el pico siguiente. Los productos más bajos que los reactivos indican reacción exotérmica; más altos, endotérmica.</p>
${chain(R`\Delta H=H_{productos}-H_{reactivos}`,R`\Delta H<0\quad\text{exotérmica}`,R`\Delta H>0\quad\text{endotérmica}`)}
<h3>5. Ejemplo sin intermediario: sustitución SN2</h3>
<p>En condiciones que favorecen SN2, OH⁻ ataca al 2-clorobutano mientras sale Cl⁻. Ambos cambios ocurren en una sola etapa: hay un estado de transición, pero no un intermediario discreto. Otras condiciones pueden favorecer SN1 o eliminación.</p>
${M(R`CH_3CH(Cl)CH_2CH_3+OH^-\rightarrow CH_3CH(OH)CH_2CH_3+Cl^-`)}
<h3>Preguntas de repaso para la clase</h3>
${cards([['Intermediario','¿Por qué desaparece de la ecuación global?','Porque se forma y se consume en etapas diferentes.'],['Paso lento','¿Se obtiene la ley mirando la ecuación global?','No. Se necesita el mecanismo y sus hipótesis.'],['Sustitución','¿De dónde sale [N₂O₂] = K₁[NO]²?','De despejar la constante de equilibrio de la primera etapa rápida.'],['Energía','¿Qué diferencia hay entre un pico y un valle?','Pico: estado de transición. Valle: intermediario.']])}`; }
  // ---------- 7. Factores y catalizadores ----------
  add('factores','Factores que modifican la velocidad y catalizadores','TEORÍA · 07',`
<p>Para que una reacción ocurra, las partículas tienen que <b>chocar</b> con <b>energía suficiente</b> (al menos la <b>energía de activación</b>, E<sub>a</sub>) y con la orientación adecuada: son los <b>choques efectivos</b>.</p>
${table(['Factor','Efecto sobre la velocidad','Por qué'],[['Concentración de reactivos','Aumenta (si el orden respecto de ese reactivo no es 0)','Más partículas por volumen: más choques por segundo. Lo describe la ley de velocidad.'],['Temperatura','Aumenta','Mayor energía cinética: más choques y más choques con energía ≥ E<sub>a</sub>. Aumenta k.'],['Catalizador','Aumenta','Ofrece otro camino (mecanismo) con menor energía de activación.']])}
<h3>Catalizadores</h3>
<ul class="kitList">
 <li><b>Cambian la velocidad</b> porque modifican el mecanismo: proveen un camino alternativo.</li>
 <li><b>Disminuyen la energía de activación.</b></li>
 <li><b>No cambian la constante de equilibrio</b> (ni el estado inicial y final): reactivos y productos quedan en el mismo nivel de energía.</li>
 <li>No se consumen en la reacción global.</li>
</ul>
${figure(svgEnergy,'Con catalizador (línea punteada) la barrera es más baja; reactivos y productos no cambian.')}
${note('Ejemplos  (ejercicio 9.11)',`<p><b>Jugo de manzana en frío:</b> la fermentación es una reacción catalizada por enzimas; a menor temperatura es más lenta. <b>Madera en oxígeno puro:</b> la combustión depende de la concentración de O₂, que es mayor en oxígeno puro que en el aire (x(O₂) ≈ 0,21).</p>`)}
`);

  // ---------- 8. Hoja de fórmulas ----------
  add('formulas','Hoja de fórmulas','PARA IMPRIMIR · 08',`
${note('Velocidad estequiométrica general','')}
${M(R`v=-\frac{1}{a}\frac{d[A]}{dt}=-\frac{1}{b}\frac{d[B]}{dt}=\frac{1}{c}\frac{d[C]}{dt}=\frac{1}{d}\frac{d[D]}{dt}`)}
${note('Ley de velocidad, orden total y k','')}
${chain([R`v=k[A]^m[B]^n`,'ley de velocidad'],[R`\text{orden total}=m+n`],[R`k=\frac{v}{[A]^m[B]^n}`])}
${note('Unidades de k (tiempo en s)','<p>Orden 0: M/s · Orden 1: s⁻¹ · Orden 2: M⁻¹ s⁻¹.</p>')}
${note('Regla experimental para órdenes','<p>Duplicar [A]: si v no cambia → orden 0; si v se duplica → orden 1; si v se cuadruplica → orden 2.</p>')}
${note('Concentración en función del tiempo (solo por si lo piden)','')}
${chain([R`[A]=[A]_0-kt`,'orden 0'],[R`\ln[A]=\ln[A]_0-kt`,'orden 1'],[R`\frac{1}{[A]}=\frac{1}{[A]_0}+kt`,'orden 2'])}
${note('Diluciones y titulaciones (segunda hoja)','')}
${chain([R`C_1V_1=C_2V_2`],[R`FD=\frac{V_2}{V_1}`],[R`M_1V_1=M_2V_2`,'titulación con relación 1 : 1'])}
`);

  // ---------- 9. Apoyo: diluciones y titulaciones ----------
  add('apoyo','Repaso de apoyo: diluciones y titulaciones','REPASO · 09',`
<p>El material  incluye, para la segunda hoja, dos herramientas de soluciones que conviene tener a mano.</p>
<h3>Diluciones</h3>
<p>Al diluir, la cantidad de soluto no cambia: solo se agrega solvente.</p>
${chain([R`n=C_1V_1=C_2V_2`,'fórmula base'],[R`FD=\frac{V_2}{V_1}=\frac{C_1}{C_2}`,'factor de dilución'])}
<h3>Titulaciones</h3>
<p>En el punto de equivalencia de una titulación ácido-base con relación 1 : 1:</p>
${chain([R`n(\text{ácido})=n(\text{base})`],[R`n=M\cdot V`],[R`M_1V_1=M_2V_2`])}
${fix('Cuándo vale M₁V₁ = M₂V₂',`<p>Solo si el ácido y la base reaccionan mol a mol (por ejemplo, HCl + NaOH). Si la relación es otra (H₂SO₄ + 2 NaOH), hay que usar los coeficientes: ${m(R`n_{\mathrm{NaOH}}=2\,n_{\mathrm{H_2SO_4}}`)}.</p>`)}
<p>No siempre se usa un indicador de pH para detectar el punto final: a veces se usan electrodos (potenciometría), conductimetría, etc.</p>
`);

  // ---------- 10. Guía ----------
  add('guia','Guía de ejercitación resuelta','EJERCICIOS · 10',`
<p>Ejercicios de cinética química con sus consignas y resoluciones. Se conserva la numeración de los problemas. Intentá cada uno antes de abrir la resolución.</p>
${note('Método para los ejercicios de órdenes',`<ol class="kitList"><li>Buscá dos experimentos donde cambie <b>una sola</b> concentración.</li><li>Calculá por cuánto se multiplicó la concentración y por cuánto la velocidad.</li><li>Deducí el orden; repetí con el otro reactivo.</li><li>Armá la ley y despejá k con cualquier experimento.</li></ol>`)}
<div data-qg-guide></div>
`);

  // ---------- 11. Tarjetas ----------
  add('repaso','Tarjetas de repaso','PARA MEMORIZAR · 11',`
<p>Respondé antes de dar vuelta. Si dudás, volvé a la sección correspondiente.</p>
${cards([
 ['Concepto','¿Qué estudia la cinética química?','La velocidad de las reacciones y de qué depende.'],
 ['Signos','¿Por qué los reactivos llevan signo −?','Porque su concentración disminuye (Δ[ ] negativa); con el signo − la velocidad da positiva.'],
 ['Coeficientes','¿Por qué se divide por el coeficiente?','Para que todas las especies den la misma velocidad de reacción.'],
 ['Unidades','Unidad de la velocidad','Concentración / tiempo: M/s (mol·L⁻¹·s⁻¹) si el tiempo está en segundos.'],
 ['Media vs. instantánea','¿Qué es cada una en el gráfico?','Media: pendiente de la recta entre dos puntos. Instantánea: pendiente de la tangente.'],
 ['Ley de velocidad','v = ?','v = k[A]<sup>m</sup>[B]<sup>n</sup>. m y n se miden: no salen de la ecuación.'],
 ['Órdenes','Duplico [A] y v se cuadruplica','Orden 2 respecto de A.'],
 ['Órdenes','Duplico [A] y v no cambia','Orden 0 respecto de A.'],
 ['Unidades de k','Orden 0, 1 y 2','M/s · s⁻¹ · M⁻¹ s⁻¹.'],
 ['Mecanismos','Intermediario de reacción','Se forma en un paso y se consume en el siguiente; no está en la ecuación global.'],
 ['Mecanismos','Sustitución vs. adición','Sustitución: un grupo sale y otro entra. Adición: dos sustancias forman un único producto.'],
 ['Catalizador','¿Qué cambia y qué no?','Baja la Eₐ y acelera la reacción. No cambia la constante de equilibrio ni se consume.']
])}
`);

  // ---------- Ejercicios  ----------
  const exercises=[];
  const ex=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  const given=html=>note('Resolución',html||'<p>Desarrollo dla consigna original con la guía.</p>');
  const official=t=>note('Hoja de respuestas',`<p>${t}</p>`);

  ex(1,'Expresiones de velocidad',
   `<p>Escribir las expresiones de velocidad para las reacciones siguientes, en función del cambio de concentración de los reactivos y de los productos:</p>
<p>a) H₂ (g) + I₂ (g) → 2HI (g)</p>
<p>b) 5Br⁻ (ac) + BrO₃⁻ (ac) + 6H⁺ (ac) → 3Br₂ (ac) + 3H₂O (l)</p>
<p>c) 2 H₂ (g) + O₂ (g) → 2 H₂O (g)</p>
<p>d) 4NH₃ (g) + 5O₂ (g) → 4NO (g) + 6H₂O (g)</p>`,
   step('a) H₂ (g) + I₂ (g) → 2HI (g)','<p>Aplicamos la definición general de velocidad estequiométrica. Los reactivos llevan signo negativo porque su concentración disminuye.</p>'+M(R`v=-\frac{d[H_2]}{dt}=-\frac{d[I_2]}{dt}=\frac{1}{2}\frac{d[HI]}{dt}`))+
   step('b) 5Br⁻ (ac) + BrO₃⁻ (ac) + 6H⁺ (ac) → 3Br₂ (ac) + 3H₂O (l)','<p>Dividimos cada derivada por su coeficiente para que todas representen la misma velocidad de reacción.</p>'+M(R`v=-\frac{1}{5}\frac{d[Br^-]}{dt}=-\frac{d[BrO_3^-]}{dt}=-\frac{1}{6}\frac{d[H^+]}{dt}=\frac{1}{3}\frac{d[Br_2]}{dt}=\frac{1}{3}\frac{d[H_2O]}{dt}`))+
   step('c) 2H₂ (g) + O₂ (g) → 2H₂O (g)','<p>Misma lógica: signo negativo en reactivos, positivo en productos.</p>'+M(R`v=-\frac{1}{2}\frac{d[H_2]}{dt}=-\frac{d[O_2]}{dt}=\frac{1}{2}\frac{d[H_2O]}{dt}`))+
   step('d) 4NH₃ (g) + 5O₂ (g) → 4NO (g) + 6H₂O (g)','<p>Cada término se divide por su coeficiente estequiométrico.</p>'+M(R`v=-\frac{1}{4}\frac{d[NH_3]}{dt}=-\frac{1}{5}\frac{d[O_2]}{dt}=\frac{1}{4}\frac{d[NO]}{dt}=\frac{1}{6}\frac{d[H_2O]}{dt}`))+
   note('Observación','<p>En b) el H₂O es líquido y es el solvente: su concentración prácticamente no cambia, por lo que en la práctica no se usa para seguir la velocidad.</p>'),
   'Signo − en reactivos, + en productos, cada término dividido por su coeficiente');

  ex(2,'Velocidades a partir de v<sub>NO</sub>',
   `<p>Considerar la reacción</p><p>2NO (g) + O₂ (g) → 2NO₂ (g)</p><p>y suponer que, en un instante dado y a cierta temperatura, la vNO = −0,0660 M/s. Calcular:</p><p>a) vNO₂ ; b) vO₂ ; c) la velocidad de la reacción en tales condiciones.</p>`,
   step('Velocidad de reacción','<p>Primero convertimos la velocidad de desaparición de NO en velocidad de reacción usando su coeficiente 2.</p>'+chain(R`v=-\frac{1}{2}\frac{d[NO]}{dt}`,R`v=-\frac{1}{2}(-0{,}0660)=0{,}0330\ \mathrm{M/s}`))+
   step('c) Velocidad de reacción',M(R`v=0{,}0330\ \mathrm{M/s}`))+
   step('a) Para NO₂ (coeficiente 2)',chain(R`v=\frac{1}{2}\frac{d[NO_2]}{dt}`,R`\frac{d[NO_2]}{dt}=2v=0{,}0660\ \mathrm{M/s}`))+
   step('b) Para O₂ (coeficiente 1)',chain(R`v=-\frac{d[O_2]}{dt}`,R`\frac{d[O_2]}{dt}=-v=-0{,}0330\ \mathrm{M/s}`))+
   official('9.2: a) 0,0660 M/s; b) −0,0330 M/s; c) 0,0330 M/s.'),
   'a) 0,0660 M/s; b) −0,0330 M/s; c) 0,0330 M/s');

  ex(3,'Velocidades a partir de v<sub>O₂</sub>',
   `<p>Considerar la reacción:</p><p>O₂ (g) + 2CO (g) → 2CO₂ (g)</p><p>y suponer que, en un instante dado y a cierta temperatura, la vO₂ = −0,0740 M/s. Calcular:</p><p>a) vCO₂ ; b) vCO; c) la velocidad de la reacción en tales condiciones.</p>`,
   step('Velocidad de reacción','<p>Primero encontramos la velocidad de reacción usando el coeficiente de O₂ (que es 1):</p>'+M(R`v=-\frac{d[O_2]}{dt}=-(-0{,}0740)=0{,}0740\ \mathrm{M/s}`))+
   step('c) Velocidad de reacción',M(R`v=0{,}0740\ \mathrm{M/s}`))+
   step('a) Para CO₂ (coeficiente 2)',chain(R`v=\frac{1}{2}\frac{d[CO_2]}{dt}`,R`\frac{d[CO_2]}{dt}=2v=0{,}148\ \mathrm{M/s}`))+
   step('b) Para CO (coeficiente 2)',chain(R`v=-\frac{1}{2}\frac{d[CO]}{dt}`,R`\frac{d[CO]}{dt}=-2v=-0{,}148\ \mathrm{M/s}`))+
   official('9.3: a) 0,148 M/s; b) −0,148 M/s; c) 0,0740 M/s.'),
   'a) 0,148 M/s; b) −0,148 M/s; c) 0,0740 M/s');

  ex(4,'Unidades de la constante de velocidad',
   `<p>¿Cuáles son las unidades de la constante de velocidad si el tiempo se expresa en segundos y los órdenes totales son, respectivamente, cero, uno y dos?</p>`,
   step('Relación','<p>Usamos la relación:</p>'+M(R`v=k[A]^n`)+'<p>Recordamos que v se mide en M/s y [A] en M.</p>')+
   step('Orden 0',M(R`v=k\qquad [k]=\mathrm{M/s}`))+
   step('Orden 1',M(R`v=k[A]\qquad [k]=\mathrm{s}^{-1}`))+
   step('Orden 2',M(R`v=k[A]^2\qquad [k]=\mathrm{M}^{-1}\mathrm{s}^{-1}`))+
   official('9.4: M/s, s⁻¹ y M⁻¹ s⁻¹, respectivamente.'),
   'M/s, s⁻¹ y M⁻¹ s⁻¹');

  ex(5,'Ecuación de velocidad y k',
   `<p>La reacción:</p><p>2NO (g) + 2H₂ (g) → N₂ (g) + 2H₂O (g)</p><p>es de primer orden con respecto a H₂ y de segundo orden con respecto a NO.</p><p>i. ¿Cuál es la ecuación de velocidad?</p><p>ii. Calcular k si la velocidad es 15,0 M/s y las concentraciones de los reactivos son: [NO] = 0,0500 M y [H₂] = 0,100 M.</p>`,
   step('i) Orden 2 en NO y 1 en H₂',M(R`v=k[NO]^2[H_2]`))+
   step('ii) Despejamos k',chain(R`k=\frac{v}{[NO]^2[H_2]}`,R`k=\frac{15{,}0}{(0{,}0500)^2(0{,}100)}`,R`(0{,}0500)^2=0{,}00250`,R`0{,}00250\times0{,}100=0{,}000250`,R`k=\frac{15{,}0}{0{,}000250}=6{,}00\times10^4\ \mathrm{M}^{-2}\mathrm{s}^{-1}`))+
   official('9.5: a) v = k[NO]²[H₂]; b) k = 6,00·10⁴ M⁻² s⁻¹.'),
   'v = k[NO]²[H₂] · k = 6,00 · 10⁴ M⁻² s⁻¹');

  ex(6,'Correcta o incorrecta',
   `<p>Indicar si cada una de las afirmaciones siguientes es correcta (C) o incorrecta (I):</p><p>i. “Si la reacción es de orden uno, la velocidad es constante”.</p><p>ii. “El orden de reacción respecto de cada reactivo es un parámetro experimental y suele ser un número entero o racional”.</p><p>iii. “Un catalizador modifica la velocidad de una reacción porque le provee un camino (mecanismo) alternativo con energía de activación diferente”.</p>`,
   step('i) Incorrecta','<p>En orden 1 la velocidad depende de la concentración y esta disminuye.</p>')+
   step('ii) Correcta','<p>El orden siempre se obtiene experimentalmente.</p>')+
   step('iii) Correcta','<p>Un catalizador cambia la energía de activación.</p>')+
   official('9.6: a) I; b) C; c) C.'),
   'i. I · ii. C · iii. C');

  ex(7,'Ecuación de velocidad del (CH₃)₃CBr',
   `<p>Se tienen los datos siguientes para la reacción del 2-bromometilpropano, (CH₃)₃CBr, con iones hidróxido a 55 °C:</p><p>(CH₃)₃CBr (l) + OH⁻ (aq) → (CH₃)₃COH (aq) + Br⁻ (aq)</p>
${table(['Experimento','[(CH₃)₃CBr]ₜ₌₀','[OH⁻]ₜ₌₀','Veloc. inicial / mol dm⁻³ s⁻¹'],[['1','0,10','0,10','0,0010'],['2','0,20','0,10','0,0020'],['3','0,30','0,10','0,0030'],['4','0,10','0,20','0,0010'],['5','0,10','0,30','0,0010']])}
<p>iv. Determinar la ecuación de velocidad.</p><p>v. Calcular la velocidad de la reacción si las concentraciones de los reactivos fueran ambas de 0,400 M.</p>`,
   step('iv. 1) Orden respecto de (CH₃)₃CBr','<p>Comparamos experimentos donde solo cambia la concentración de (CH₃)₃CBr, mientras [OH⁻] permanece constante. La mejor comparación es:</p><ul class="kitList"><li>Experimento 1: [(CH₃)₃CBr] = 0,10 M; v = 0,0010.</li><li>Experimento 2: [(CH₃)₃CBr] = 0,20 M; v = 0,0020.</li></ul><p>(CH₃)₃CBr se duplica y la velocidad también se duplica. Conclusión: <b>orden 1 en (CH₃)₃CBr</b>.</p><p>También lo confirma Exp. 1 → Exp. 3: 0,10 → 0,30 (×3) y 0,0010 → 0,0030 (×3). Consistente con primer orden.</p>')+
   step('iv. 2) Orden respecto de OH⁻','<p>Comparamos experimentos donde cambia OH⁻ y se mantiene constante (CH₃)₃CBr:</p><ul class="kitList"><li>Experimento 1: [OH⁻] = 0,10 → v = 0,0010.</li><li>Experimento 4: [OH⁻] = 0,20 → v = 0,0010.</li><li>Experimento 5: [OH⁻] = 0,30 → v = 0,0010.</li></ul><p>Aumentar OH⁻ al doble o al triple no cambia la velocidad. Conclusión: <b>orden 0 en OH⁻</b>. Este comportamiento es típico de reacciones SN1, donde la velocidad depende solo del sustrato (ver la sección “Mecanismos de reacción”).</p>')+
   step('iv. 3) Ley de velocidad',chain(R`v=k[(CH_3)_3CBr]^1[OH^-]^0`,R`v=k[(CH_3)_3CBr]`))+
   step('iv. 4) Calcular k','<p>Usamos cualquier experimento; elegimos el 1:</p>'+chain(R`v=0{,}0010`,R`[(CH_3)_3CBr]=0{,}10`,R`0{,}0010=k(0{,}10)`,R`k=\frac{0{,}0010}{0{,}10}`,R`k=1{,}0\times10^{-2}\ \mathrm{s}^{-1}`))+
   step('v. Velocidad si ambas concentraciones fueran 0,400 M',chain(R`v=k[(CH_3)_3CBr]`,R`v=(1{,}0\times10^{-2}\ \mathrm{s}^{-1})(0{,}400\ \mathrm{M})`,R`v=4{,}0\times10^{-3}\ \mathrm{M/s}`,R`v=0{,}0040\ \mathrm{mol\,dm}^{-3}\mathrm{s}^{-1}`))+
   official('9.7: a) v = 1,0×10⁻² s⁻¹ [(CH₃)₃CBr]; b) v = 0,0040 M/s.'),
   'v = 1,0 · 10⁻² s⁻¹ · [(CH₃)₃CBr] · v = 0,0040 M/s');

  ex(8,'Ecuación de velocidad del BF₃ con NH₃',
   `<p>Se midieron los datos siguientes a 350 K para la reacción representada por la ecuación química:</p><p>BF₃(g) + NH₃(g) → BF₃NH₃(g)</p>
${table(['Experimento','[BF₃]ₜ₌₀','[NH₃]ₜ₌₀','Veloc. inicial / mol dm⁻³ min⁻¹'],[['1','0,500','0,500','0,8520'],['2','0,500','0,250','0,4260'],['3','0,400','0,200','0,2726'],['4','0,700','0,200','0,4771'],['5','0,350','0,200','0,2386']])}
<p>a) ¿Cuál es la ecuación de velocidad de esta reacción? ¿Y cuál es su orden total?</p><p>b) Calcular la velocidad de la reacción si las concentraciones de los reactivos fueran ambas 0,300 M.</p>`,
   note('Resolución desarrollada','<p>Se desarrolla el procedimiento completo. Se resuelve con el mismo método que el ejercicio 7.</p>')+
   step('a) 1. Orden respecto de NH₃','<p>Experimentos 1 y 2: [BF₃] queda en 0,500 y [NH₃] pasa de 0,500 a 0,250 (se divide por 2).</p>'+chain(R`\frac{v_2}{v_1}=\frac{0{,}4260}{0{,}8520}=0{,}5`,['\\text{[NH}_3\\text{] a la mitad}\\Rightarrow v\\text{ a la mitad}','orden 1 en NH₃']))+
   step('a) 2. Orden respecto de BF₃','<p>Experimentos 3 y 4: [NH₃] queda en 0,200 y [BF₃] pasa de 0,400 a 0,700.</p>'+chain(R`\frac{[BF_3]_4}{[BF_3]_3}=\frac{0{,}700}{0{,}400}=1{,}75`,R`\frac{v_4}{v_3}=\frac{0{,}4771}{0{,}2726}\approx1{,}750`,['\\text{v aumenta en la misma proporción}','orden 1 en BF₃']))+
   step('a) 3. Ley de velocidad y orden total',chain(R`v=k[BF_3][NH_3]`,R`\text{orden total}=1+1=2`))+
   step('a) 4. Calcular k (experimento 1)',chain(R`k=\frac{v}{[BF_3][NH_3]}`,R`k=\frac{0{,}8520}{(0{,}500)(0{,}500)}`,R`k=3{,}408\ \mathrm{L\,mol^{-1}\,min^{-1}}\approx3{,}41\ \mathrm{L\,mol^{-1}\,min^{-1}}`)+'<p>Con los experimentos 3, 4 y 5 se obtiene lo mismo (3,4075; 3,4079; 3,4086).</p>')+
   step('b) Velocidad con ambas concentraciones 0,300 M',chain(R`v=3{,}408\cdot(0{,}300)(0{,}300)`,R`v=3{,}408\cdot0{,}0900`,R`v\approx0{,}307\ \mathrm{M/min}`))+
   official('9.8: a) v = 3,41 L mol⁻¹ min⁻¹ [BF₃][NH₃], orden total 2; b) v = 0,308 M/min.')+
   fix('Posible diferencia con la hoja de respuestas','<p>Con k = 3,408 (o con 3,41) la cuenta da 0,3067 ≈ <b>0,307 M/min</b>; la hoja de respuestas indica 0,308 M/min. La diferencia está en el último decimal y no cambia el método.</p>'),
   'v = 3,41 L·mol⁻¹·min⁻¹ [BF₃][NH₃] · orden total 2 · v ≈ 0,307 M/min (hoja: 0,308)');

  ex(9,'Elegir la ecuación de velocidad',
   `<p>En una reacción del tipo A + B → C, se determinó experimentalmente que al duplicar [B], la velocidad aumentó 4 veces, mientras que al duplicar [A] la velocidad no tuvo variación alguna. Esto significa que la ecuación de velocidad es (elegir la opción que se considere correcta):</p><p>a) v = k[A]²; b) v = k[C]/[A][B]; c) v = k[B]²; d) v = k[A]; e) v = k[A][B].</p>`,
   step('Órdenes','<ul class="kitList"><li>Al duplicar [B], la velocidad aumenta 4 veces: orden 2 en B.</li><li>Al duplicar [A], la velocidad no cambia: orden 0 en A.</li></ul>')+
   step('Ley de velocidad',M(R`v=k[B]^2`)+'<p>La opción correcta es c).</p>')+
   official('9.9: c). Coincide con la resolución.'),
   'c) v = k[B]²');

  ex(10,'Hidrólisis del acetato de etilo',
   `<p>Para la reacción:</p><p>CH₃COOC₂H₅(aq) + OH⁻(aq) → CH₃COO⁻(aq) + CH₃CH₂OH(aq)</p><p>se determinó experimentalmente que si se aumenta al doble la concentración de CH₃COOC₂H₅, la velocidad se duplica y si se triplica la concentración de OH⁻ la velocidad se triplica. Elegir la opción que se considere correcta para la ecuación de velocidad entre las opciones siguientes:</p><p>i. v = k[CH₃COOC₂H₅][OH⁻]</p><p>ii. v = k[CH₃COOC₂H₅]¹ᐟ²[OH⁻]</p><p>iii. v = k[CH₃COOC₂H₅]²[OH⁻]</p><p>iv. v = k[CH₃COOC₂H₅][OH⁻]³</p>`,
   step('Órdenes','<ul class="kitList"><li>Si duplicar [CH₃COOC₂H₅] duplica la velocidad: orden 1.</li><li>Si triplicar [OH⁻] triplica la velocidad: orden 1.</li></ul>')+
   step('Ecuación de velocidad',M(R`v=k[CH_3COOC_2H_5][OH^-]`)+'<p>La opción correcta es i.</p>')+
   official('9.10: a) (la primera opción, i). Coincide con la resolución.'),
   'i. v = k[CH₃COOC₂H₅][OH⁻]');

  ex('9.11','Explicar los hechos',
   `<p>Explicar los hechos siguientes:</p><p>a) para evitar que el jugo de manzana se fermente y se convierta en sidra, debe mantenerse frío.</p><p>b) La madera se quema muy rápidamente en presencia de oxígeno puro, pero sólo lo hace lentamente en aire.</p>`,
   step('a) Jugo de manzana','<p>La fermentación es una reacción química catalizada por enzimas. A menor temperatura:</p><ul class="kitList"><li>Baja la energía cinética.</li><li>Baja la frecuencia de choques efectivos.</li><li>Baja la velocidad de reacción.</li></ul><p>Por eso, mantener frío el jugo de manzana detiene o reduce la fermentación y evita que se transforme en sidra.</p>')+
   step('b) Madera en oxígeno puro','<p>La velocidad de combustión depende de la concentración de oxígeno. Comparación:</p><ul class="kitList"><li>En el aire: x(O₂) ≈ 0,21.</li><li>Oxígeno puro: x(O₂) = 1,00.</li></ul><p>Con presión parcial de oxígeno mucho mayor, la velocidad de combustión aumenta enormemente. Por eso, en oxígeno puro la madera se quema muy rápido y en aire la combustión es mucho más lenta.</p>')+
   official('9.11: a) a menor temperatura, también lo es la velocidad de fermentación; b) el orden respecto de la concentración de oxígeno debe ser distinto de cero (la proporción de oxígeno en el aire, x(O₂) ≈ 0,2, es menor que en el oxígeno puro, x(O₂) = 1).'),
   'a) menor T → menor velocidad de fermentación · b) el orden respecto del O₂ es distinto de cero');


  { const section=sections.find(s=>s.key==='qg5-ley'); if(section) section.html += `<h3>Órdenes 0, 1 y 2: leyes integradas</h3><p>Estas expresiones describen la concentración en función del tiempo para una reacción con un único reactivo A. [A]₀ es la concentración inicial, [A] la concentración al tiempo t y k la constante cinética.</p>${table(['Orden','Ley integrada','Unidades de k','Vida media'],[['0','[A] = [A]₀ − kt','M/s','[A]₀/(2k)'],['1','ln[A] = ln[A]₀ − kt','s⁻¹','ln(2)/k'],['2','1/[A] = 1/[A]₀ + kt','M⁻¹s⁻¹','1/(k[A]₀)']])}<p>Orden cero: graficar [A] contra t. Orden uno: ln[A] contra t. Orden dos: 1/[A] contra t. La recta permite identificar el orden y calcular k. Los coeficientes estequiométricos no determinan los órdenes cinéticos.</p><h3>Experimento: NO y Cl₂</h3>${M(R`2NO+Cl_2\rightarrow2NOCl`)}${table(['Experimento','[NO] (M)','[Cl₂] (M)','v inicial (M/s)'],[['1','0,250','0,150','3,25 × 10⁻⁴'],['2','0,250','0,300','6,50 × 10⁻⁴'],['3','0,500','0,150','1,33 × 10⁻³']])}<p>Comparando 1 y 2, al duplicar [Cl₂] se duplica v: orden 1 en Cl₂. Comparando 1 y 3, al duplicar [NO] la velocidad aumenta aproximadamente cuatro veces: orden 2 en NO. La diferencia entre 4 y 4,09 es compatible con dispersión o redondeo.</p>${chain(R`v=k[NO]^2[Cl_2]`,R`n=2+1=3`,R`k=\frac{3{,}25\cdot10^{-4}}{(0{,}250)^2(0{,}150)}`,R`k=3{,}47\cdot10^{-2}\ \mathrm{M^{-2}s^{-1}}`)}`; }

  { const section=sections.find(s=>s.key==='qg5-factores'); if(section) section.html += `<h3>Arrhenius: temperatura y energía de activación</h3>${key(R`k(T)=A e^{-E_a/(RT)}`,'Ecuación de Arrhenius')}<p>k es la constante de velocidad; A el factor preexponencial (mismas unidades que k); Eₐ la energía de activación en J/mol; T la temperatura en kelvin; R = 8,314 J·mol⁻¹·K⁻¹.</p>${chain(R`\ln k=\ln A-\frac{E_a}{RT}`,R`\ln\frac{k_2}{k_1}=\frac{E_a}{R}\left(\frac1{T_1}-\frac1{T_2}\right)`)}<h4>Ejemplo con los datos del experimento de NO y Cl₂</h4><p>Tomamos k a 25 °C = 0,0347 M⁻²s⁻¹, Eₐ = 81 kJ/mol y calculamos A y k a 100 °C.</p>${chain(R`T_1=298{,}15\ \mathrm K`,R`T_2=373{,}15\ \mathrm K`,R`E_a=81000\ \mathrm{J/mol}`,R`A=k_1 e^{E_a/(RT_1)}\approx5{,}4\cdot10^{12}\ \mathrm{M^{-2}s^{-1}}`,R`k_2=k_1e^{\frac{E_a}{R}(1/T_1-1/T_2)}\approx24{,}8\ \mathrm{M^{-2}s^{-1}}`)}<h3>Peróxido de hidrógeno catalizado por ioduro (298 K)</h3>${M(R`2H_2O_2\rightarrow2H_2O+O_2`) }<p>Experimento 1: [I⁻] = 0,10 M. Experimento 2: [I⁻] = 0,050 M. Datos del cuaderno:</p>${table(['t (s)','[H₂O₂] exp. 1 (M)','[H₂O₂] exp. 2 (M)'],[['0','0,500','0,500'],['10','0,352','0,420'],['20','0,219','0,352'],['30','0,175','0,296'],['40','0,124','0,240'],['50','0,087','0,208'],['60','0,062','0,175'],['70','0,043','0,147'],['80','0,031','0,124'],['90','0,021','0,104'],['100','0,015','0,087']])}${chain(R`v_{1,0-10}=\frac{0{,}500-0{,}352}{10}=0{,}0148\ \mathrm{M/s}`,R`v_{2,0-10}=\frac{0{,}500-0{,}420}{10}=0{,}0080\ \mathrm{M/s}`,R`\frac{v_1}{v_2}=1{,}85`) }<p>Se comparan velocidades medias de desaparición, no velocidades estrictamente iniciales. La serie tiene cierta dispersión: no debe forzarse un orden exacto respecto del ioduro a partir de un solo intervalo.</p>`; }

  { const section=sections.find(s=>s.key==='qg5-mecanismos'); if(section) section.html += `<h3>Intermediarios, estados de transición y paso lento</h3><p>Un intermediario se forma en una etapa y se consume en otra: corresponde a un mínimo local en el perfil energético. Un estado de transición es el máximo de energía de cada barrera, no un intermediario aislable. En un mecanismo de dos etapas hay dos máximos y un mínimo intermedio. El paso lento condiciona la velocidad, pero en mecanismos reversibles pueden necesitarse relaciones de preequilibrio.</p><h4>Exotérmica y endotérmica</h4>${chain(R`\Delta H=H_{productos}-H_{reactivos}`,R`\Delta H<0\quad\text{exotérmica}`,R`\Delta H>0\quad\text{endotérmica}`)}<p>La reacción exotérmica termina con productos de menor energía; la endotérmica con productos de mayor energía. La altura de la barrera Eₐ no indica por sí sola si la reacción libera o absorbe calor.</p><h4>Formación de HI</h4>${M(R`H_2+I_2\rightarrow2HI`) }<p>Una secuencia radicalaria ilustrativa, sin afirmar que sea el único mecanismo real, es:</p>${chain(R`I_2\rightleftharpoons2I`,R`H_2+I\rightleftharpoons H_2I`,R`H_2I+I\rightarrow2HI`) }<p>Al sumar se cancelan I y H₂I: no aparecen en la reacción global.</p><h4>Oxidación del monóxido de nitrógeno</h4>${M(R`2NO+O_2\rightarrow2NO_2`) }<p>En los apuntes la etapa que produce N₂O₃ no conserva los átomos. Para practicar suma de etapas puede usarse el siguiente mecanismo formal balanceado, sin presentarlo como el mecanismo real demostrado:</p>${chain(R`NO+NO\rightleftharpoons N_2O_2`,R`N_2O_2+O_2\rightarrow2NO_2`) }<p>N₂O₂ es un intermediario y se cancela. Si la primera etapa fuera lenta y elemental, su velocidad directa dependería de [NO]², pero la reversibilidad requiere analizar las condiciones antes de atribuir esa ley a toda la reacción.</p><h4>Sustitución nucleofílica</h4>${M(R`CH_3CH(Cl)CH_2CH_3+OH^-\rightarrow CH_3CH(OH)CH_2CH_3+Cl^-`) }<p>Una vía SN2 para 2-clorobutano ocurre en una sola etapa concertada, con un máximo energético y sin intermediario discreto. Según las condiciones también pueden competir otros mecanismos.</p>`; }

  // Modelos de prueba reconstruidos con consigna y desarrollo.
  const modelExercises=[];
  const exam=(n,title,statement,solution,answer)=>modelExercises.push({n,title,statement,solution,answer});
  exam('P1','Prueba: método de velocidades iniciales y Arrhenius',
    '<p>Para la reacción entre NO(g) y Cl₂(g), se midieron las velocidades iniciales:</p>'+
    table(['Experimento','[NO] (M)','[Cl₂] (M)','Velocidad (M/s)'],[['1','0,250','0,150','3,25 × 10⁻⁴'],['2','0,250','0,300','6,50 × 10⁻⁴'],['3','0,500','0,150','1,33 × 10⁻³']])+
    '<p><b>a)</b> Balancear la reacción que forma NOCl. <b>b)</b> Determinar los órdenes parciales y global mediante velocidades iniciales. <b>c)</b> Calcular k con el experimento 1. <b>d)</b> Si Eₐ = 81 kJ/mol y la tabla corresponde a 25 °C, calcular A y k a 100 °C (R = 8,314 J·mol⁻¹·K⁻¹).</p>',
    step('a. Ecuación balanceada',M(R`2NO+Cl_2\rightarrow2NOCl`))+
    step('b. Órdenes experimentales',chain(R`v=k[NO]^m[Cl_2]^n`,R`\frac{v_2}{v_1}=2=2^n\Rightarrow n=1`,R`\frac{v_3}{v_1}=4{,}09\approx2^m\Rightarrow m\approx2`,R`m+n=3`))+
    step('c. Constante de velocidad',chain(R`k=\frac{3{,}25\cdot10^{-4}}{(0{,}250)^2(0{,}150)}`,R`k=3{,}47\cdot10^{-2}\ \mathrm{M^{-2}s^{-1}}`))+
    step('d. Arrhenius',chain(R`T_1=298{,}15\ \mathrm K`,R`T_2=373{,}15\ \mathrm K`,R`A=k_1e^{E_a/(RT_1)}\approx5{,}4\cdot10^{12}\ \mathrm{M^{-2}s^{-1}}`,R`k_2=k_1e^{\frac{E_a}{R}(1/T_1-1/T_2)}\approx24{,}8\ \mathrm{M^{-2}s^{-1}}`)),
    'Órdenes 2 y 1; orden global 3; k₁ = 0,0347 M⁻²s⁻¹.');
  exam('P2','Prueba: descomposición de H₂O₂ con ioduro',
    '<p>A 298 K se sigue la descomposición de H₂O₂ con dos concentraciones de catalizador: [I⁻]₁ = 0,10 M y [I⁻]₂ = 0,050 M.</p>'+
    table(['t (s)','[H₂O₂] exp. 1 (M)','[H₂O₂] exp. 2 (M)'],[['0','0,500','0,500'],['10','0,352','0,420'],['20','0,219','0,352'],['30','0,175','0,296'],['40','0,124','0,240'],['50','0,087','0,208'],['60','0,062','0,175'],['70','0,043','0,147'],['80','0,031','0,124'],['90','0,021','0,104'],['100','0,015','0,087']])+
    '<p><b>a)</b> Balancear la reacción. <b>b)</b> Calcular las velocidades medias de desaparición entre 0 y 10 s. <b>c)</b> Comparar las velocidades. <b>d)</b> Explicar por qué las velocidades medias no prueban por sí solas un orden exacto respecto de I⁻.</p>',
    step('a. Balanceo',M(R`2H_2O_2\rightarrow2H_2O+O_2`))+
    step('b. Velocidades medias',chain(R`v_{des}=-\frac{\Delta[H_2O_2]}{\Delta t}`,R`v_1=\frac{0{,}500-0{,}352}{10}=0{,}0148\ \mathrm{M/s}`,R`v_2=\frac{0{,}500-0{,}420}{10}=0{,}0080\ \mathrm{M/s}`))+
    step('c. Comparación',chain(R`\frac{v_1}{v_2}=1{,}85`)+'<p>La mayor concentración de ioduro produce una desaparición más rápida de H₂O₂.</p>')+
    step('d. Interpretación','<p>Son pendientes medias en intervalos finitos. Para determinar el orden con fiabilidad se necesitan velocidades iniciales reproducibles y condiciones restantes constantes, o un ajuste cinético de todos los datos.</p>'),
    'Velocidades medias 0,0148 y 0,0080 M/s; razón 1,85.');
  exam('P3','Prueba: equilibrio de SO₃, SO₂ y O₂',
    '<p>En un recipiente de 3,00 L se introducen 1,50 mol de SO₃, 2,50 × 10²⁴ moléculas de O₂ y 39,5 g de SO₂. A 250 °C, Kc = 5,5 × 10⁻³ para la descomposición del SO₃.</p><p><b>a)</b> Balancear, calcular Qc y decidir el sentido de evolución. <b>b)</b> Plantear la tabla de equilibrio. <b>c)</b> Predecir el efecto de agregar O₂, comprimir y disminuir T si la reacción directa es exotérmica.</p>',
    step('a. Balance y concentraciones',chain(R`2SO_3\rightleftharpoons2SO_2+O_2`,R`[SO_3]_0=\frac{1{,}50}{3{,}00}=0{,}500\ \mathrm M`,R`[O_2]_0=\frac{2{,}50\cdot10^{24}}{6{,}022\cdot10^{23}\cdot3{,}00}=1{,}384\ \mathrm M`,R`[SO_2]_0=\frac{39{,}5}{64{,}06\cdot3{,}00}=0{,}206\ \mathrm M`,R`Q_c=\frac{(0{,}206)^2(1{,}384)}{(0{,}500)^2}\approx0{,}234>K_c`))+
    step('b. Equilibrio',chain(R`[SO_3]_e=0{,}500+2x`,R`[SO_2]_e=0{,}206-2x`,R`[O_2]_e=1{,}384-x`,R`5{,}5\cdot10^{-3}=\frac{(0{,}206-2x)^2(1{,}384-x)}{(0{,}500+2x)^2}`))+
    step('c. Le Châtelier','<p>Agregar O₂ favorece SO₃; comprimir favorece el lado con menos moles gaseosos, SO₃; enfriar favorece los productos si la reacción directa es exotérmica. Comprimir implica modificar el volumen, aunque inicialmente el recipiente se describa como rígido.</p>'),
    'Qc > Kc: evolución hacia SO₃; planteo de equilibrio completo.');


  // Prácticas A y B reconstruidas: mecanismos explícitos, consignas completas y resolución guiada.
  const practice=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  practice('A1','Mecanismo de dos etapas: formación de NO₂',`<p>Se propone el siguiente mecanismo hipotético para la oxidación del monóxido de nitrógeno. La primera etapa es rápida y reversible; la segunda es lenta.</p><p><b>Etapa 1:</b></p>${M(R`2NO\rightleftharpoons N_2O_2`)}<p><b>Etapa 2:</b></p>${M(R`N_2O_2+O_2\rightarrow2NO_2`)}<p><b>a)</b> Sumar las etapas y obtener la reacción global. <b>b)</b> Identificar el intermediario y justificar por qué no aparece en la ecuación neta. <b>c)</b> Escribir la ley de velocidad del paso lento. <b>d)</b> Utilizar el preequilibrio para reemplazar la concentración del intermediario y deducir la ley final.</p>`,
    step('a. Sumar las etapas',chain(R`2NO+N_2O_2+O_2\rightarrow N_2O_2+2NO_2`,R`2NO+O_2\rightarrow2NO_2`)+`<p>El N₂O₂ aparece a ambos lados: se forma y luego se consume; por eso se cancela.</p>`)+
    step('b. Identificar el intermediario',chain(R`N_2O_2`)+`<p>Es intermediario porque se forma en la primera etapa y se consume en la segunda; no figura en la reacción global.</p>`)+
    step('c. Ley del paso lento',chain(R`v=k_2[N_2O_2][O_2]`)+`<p>La segunda etapa es elemental y lenta. Por eso su ley utiliza las concentraciones de sus reactivos, no los coeficientes de la ecuación global.</p>`)+
    step('d. Despejar y reemplazar',chain(R`K_1=\frac{[N_2O_2]}{[NO]^2}`,R`[N_2O_2]=K_1[NO]^2`,R`v=k_2(K_1[NO]^2)[O_2]`,R`v=(k_2K_1)[NO]^2[O_2]`,R`v=k[NO]^2[O_2]`)+`<p>La sustitución se justifica exclusivamente por el preequilibrio rápido de la primera etapa.</p>`),
    'Global: 2NO + O₂ → 2NO₂; intermediario N₂O₂; v = k[NO]²[O₂].');
  practice('A2','Mecanismo con catalizador regenerado',`<p>Una reacción entre A y B ocurre mediante las siguientes etapas elementales. La especie X se agrega al sistema y se recupera al finalizar el mecanismo.</p><p><b>Etapa 1:</b></p>${M(R`A+X\rightarrow AX`)}<p><b>Etapa 2:</b></p>${M(R`AX+B\rightarrow AB+X`)}<p><b>a)</b> Obtener la ecuación global. <b>b)</b> Identificar el intermediario y el catalizador. <b>c)</b> Explicar por qué X no figura en la reacción global. <b>d)</b> Si el primer paso es lento e irreversible, escribir su ley de velocidad.</p>`,
    step('a. Sumar y cancelar',chain(R`A+X+AX+B\rightarrow AX+AB+X`,R`A+B\rightarrow AB`)+`<p>AX se forma y se consume. X se consume y se regenera, de modo que ambos desaparecen de la suma neta.</p>`)+
    step('b. Identificar especies',chain(R`AX`,R`X`)+`<p>AX es el intermediario; X actúa como catalizador en la secuencia propuesta.</p>`)+
    step('c. Interpretación',chain(R`A+B\rightarrow AB`)+`<p>El catalizador participa en el recorrido, pero se recupera al final; por eso no figura en el balance global.</p>`)+
    step('d. Ley de la etapa lenta',chain(R`v=k_1[A][X]`)+`<p>La etapa lenta elemental utiliza A y X; la ausencia de X en la reacción global no significa que no afecte la velocidad.</p>`),
    'Global A + B → AB; intermediario AX; catalizador X; v = k₁[A][X].');
  practice('A3','Tres etapas: intermediarios y etapa determinante',`<p>Una transformación se desarrolla mediante tres etapas elementales consecutivas. La segunda es la etapa lenta; las otras dos son rápidas.</p><p><b>Etapa 1:</b></p>${M(R`A+B\rightarrow I_1`)}<p><b>Etapa 2:</b></p>${M(R`I_1+C\rightarrow I_2`)}<p><b>Etapa 3:</b></p>${M(R`I_2+D\rightarrow P`)}<p><b>a)</b> Escribir la reacción global. <b>b)</b> Identificar todos los intermediarios. <b>c)</b> Indicar cuántos máximos y mínimos intermedios tendrá el perfil energético idealizado. <b>d)</b> Escribir la velocidad de la segunda etapa y explicar por qué no se puede sustituir automáticamente [I₁] por [A][B].</p>`,
    step('a. Ecuación global',chain(R`A+B+I_1+C+I_2+D\rightarrow I_1+I_2+P`,R`A+B+C+D\rightarrow P`)+`<p>Se cancelan I₁ e I₂ porque cada uno se forma y luego se consume.</p>`)+
    step('b. Intermediarios',chain(R`I_1`,R`I_2`)+`<p>Hay dos intermediarios distintos, no dos estados de transición.</p>`)+
    step('c. Perfil energético',`<p>Tres etapas elementales implican tres estados de transición (tres picos) y dos mínimos intermedios. La etapa lenta no necesariamente corresponde al pico más alto medido desde el origen: importa la barrera desde el mínimo precedente.</p>`)+
    step('d. Velocidad',chain(R`v_2=k_2[I_1][C]`)+`<p>No se conoce una relación de preequilibrio para I₁. No corresponde reemplazarlo por [A][B] sin una hipótesis cinética adicional.</p>`),
    'Global A + B + C + D → P; dos intermediarios; tres máximos; v₂ = k₂[I₁][C].');
  practice('A4','Preequilibrio y orden experimental',`<p>Para una reacción global A + 2B → P se propone un mecanismo con una asociación rápida reversible seguida de una transformación lenta elemental.</p><p><b>Etapa 1:</b></p>${M(R`A+B\rightleftharpoons I`)}<p><b>Etapa 2:</b></p>${M(R`I+B\rightarrow P`)}<p><b>a)</b> Verificar que la suma de las etapas reproduce la reacción global. <b>b)</b> Escribir la ley del paso lento. <b>c)</b> Despejar [I] desde la constante K₁ del preequilibrio. <b>d)</b> Obtener la ley global y determinar los órdenes parciales y el orden total.</p>`,
    step('a. Suma',chain(R`A+B+I+B\rightarrow I+P`,R`A+2B\rightarrow P`)+`<p>I es un intermediario y se cancela.</p>`)+
    step('b. Paso lento',chain(R`v=k_2[I][B]`)+`<p>La velocidad depende inicialmente de un intermediario.</p>`)+
    step('c. Preequilibrio',chain(R`K_1=\frac{[I]}{[A][B]}`,R`[I]=K_1[A][B]`)+`<p>Despejamos [I] multiplicando ambos lados por [A][B].</p>`)+
    step('d. Sustitución y órdenes',chain(R`v=k_2(K_1[A][B])[B]`,R`v=k[A][B]^2`,R`n_A=1`,R`n_B=2`,R`n_{total}=3`)+`<p>Los exponentes surgen del mecanismo bajo las hipótesis dadas, no de copiar la estequiometría global.</p>`),
    'v = k[A][B]²; orden 1 en A, 2 en B, total 3.');
  practice('A5','Paso lento y velocidades iniciales',`<p>Se propone el mecanismo A + B → I (lento, elemental) seguido de I + C → P (rápido). Se realizan tres experimentos a temperatura constante: exp. 1: [A] = 0,10 M, [B] = 0,20 M, [C] = 0,10 M y v = 0,0020 M/s; exp. 2: [A] = 0,20 M, [B] = 0,20 M, [C] = 0,10 M y v = 0,0040 M/s; exp. 3: [A] = 0,10 M, [B] = 0,20 M, [C] = 0,30 M y v = 0,0020 M/s.</p><p><b>Etapa 1:</b></p>${M(R`A+B\rightarrow I`)}<p><b>Etapa 2:</b></p>${M(R`I+C\rightarrow P`)}<p><b>a)</b> Escribir la reacción global. <b>b)</b> Deducir la ley cinética del paso lento. <b>c)</b> Verificar con los experimentos que A es de primer orden y C no aparece en la ley. <b>d)</b> Calcular k con el experimento 1.</p>`,
    step('a. Suma',chain(R`A+B+C\rightarrow P`)+`<p>I es intermediario y desaparece de la suma.</p>`)+
    step('b. Paso lento',chain(R`v=k[A][B]`)+`<p>La primera etapa es elemental y controla la velocidad.</p>`)+
    step('c. Comparación',chain(R`\frac{v_2}{v_1}=\frac{0{,}0040}{0{,}0020}=2`,R`\frac{[A]_2}{[A]_1}=2`,R`\frac{v_3}{v_1}=1`)+`<p>Duplicar A duplica la velocidad. Triplicar C no la modifica: concuerda con el mecanismo supuesto.</p>`)+
    step('d. Constante',chain(R`k=\frac{v_1}{[A]_1[B]_1}`,R`k=\frac{0{,}0020}{0{,}10\cdot0{,}20}=0{,}100\ \mathrm{M^{-1}s^{-1}}`)+`<p>La unidad de k corresponde a orden total 2.</p>`),
    'Global A + B + C → P; v = k[A][B]; k = 0,100 M⁻¹s⁻¹.');
  practice('B1','Perfil energético de un mecanismo de dos etapas',`<p>En un perfil de energía potencial de dos etapas se leen los siguientes valores: reactivos = 70 kJ/mol; primer estado de transición = 145 kJ/mol; intermediario = 90 kJ/mol; segundo estado de transición = 125 kJ/mol; productos = 30 kJ/mol.</p><p><b>Etapa 1:</b></p>${M(R`A+B\rightarrow I`)}<p><b>Etapa 2:</b></p>${M(R`I\rightarrow P`)}<p><b>a)</b> Calcular la energía de activación de cada etapa en el sentido directo. <b>b)</b> Calcular el cambio global de entalpía y clasificar la reacción. <b>c)</b> Identificar los dos máximos y el mínimo intermedio. <b>d)</b> Explicar qué barrera es mayor y por qué eso no basta para demostrar experimentalmente cuál es el paso lento.</p>`,
    step('a. Barreras',chain(R`E_{a,1}=145-70=75\ \mathrm{kJ/mol}`,R`E_{a,2}=125-90=35\ \mathrm{kJ/mol}`)+`<p>Cada barrera se mide desde el nivel de energía inmediatamente anterior.</p>`)+
    step('b. Entalpía',chain(R`\Delta H=30-70=-40\ \mathrm{kJ/mol}`)+`<p>Es exotérmica porque los productos tienen menor energía.</p>`)+
    step('c. Interpretación',`<p>Los dos picos son estados de transición. El valle de 90 kJ/mol representa al intermediario I.</p>`)+
    step('d. Comparación',chain(R`75>35`)+`<p>La primera barrera es mayor; aun así, para identificar rigurosamente el paso lento pueden importar factores preexponenciales, concentraciones y condiciones cinéticas.</p>`),
    'Eₐ₁ = 75 kJ/mol; Eₐ₂ = 35 kJ/mol; ΔH = −40 kJ/mol.');
  practice('B2','Catalizador y caminos alternativos',`<p>Para la reacción global A → P, el camino sin catalizador tiene reactivos a 50 kJ/mol, un estado de transición a 140 kJ/mol y productos a 20 kJ/mol. Un mecanismo catalizado alternativo consta de dos etapas, con un intermediario de 65 kJ/mol y estados de transición de 95 y 100 kJ/mol.</p><p><b>Etapa 1:</b></p>${M(R`A+X\rightarrow I`)}<p><b>Etapa 2:</b></p>${M(R`I\rightarrow P+X`)}<p><b>a)</b> Identificar intermediario y catalizador. <b>b)</b> Calcular la barrera del camino sin catalizador y las dos barreras del catalizado. <b>c)</b> Calcular ΔH y explicar por qué el catalizador no lo modifica. <b>d)</b> Indicar qué se representa en cada máximo.</p>`,
    step('a. Suma y especies',chain(R`A+X+I\rightarrow I+P+X`,R`A\rightarrow P`)+`<p>I se forma y consume; X se consume y regenera.</p>`)+
    step('b. Energías de activación',chain(R`E_{a,sin}=140-50=90\ \mathrm{kJ/mol}`,R`E_{a,cat,1}=95-50=45\ \mathrm{kJ/mol}`,R`E_{a,cat,2}=100-65=35\ \mathrm{kJ/mol}`)+`<p>El camino alternativo tiene barreras menores en este ejemplo.</p>`)+
    step('c. Cambio energético',chain(R`\Delta H=20-50=-30\ \mathrm{kJ/mol}`)+`<p>Reactivos y productos son los mismos, por eso ΔH no cambia al agregar catalizador.</p>`)+
    step('d. Máximos',`<p>Cada máximo representa un estado de transición de una etapa; el valle intermedio representa I.</p>`),
    'Eₐ sin catalizador = 90 kJ/mol; barreras catalizadas 45 y 35 kJ/mol; ΔH = −30 kJ/mol.');
  practice('B3','Arrhenius y mecanismo propuesto',`<p>La constante de velocidad de una reacción aumenta al elevar la temperatura. A 300 K vale 0,0200 s⁻¹ y la energía de activación aparente es 50,0 kJ/mol. Se propone además un mecanismo de dos etapas, A → I (lenta) e I → P (rápida).</p><p><b>Etapa 1:</b></p>${M(R`A\rightarrow I`)}<p><b>Etapa 2:</b></p>${M(R`I\rightarrow P`)}<p><b>a)</b> Calcular k a 330 K con R = 8,314 J·mol⁻¹·K⁻¹. <b>b)</b> Sumar las etapas e identificar el intermediario. <b>c)</b> Escribir la ley del paso lento si es elemental. <b>d)</b> Explicar la diferencia entre energía de activación e intermediario.</p>`,
    step('a. Arrhenius',chain(R`\ln\frac{k_2}{k_1}=\frac{E_a}{R}\left(\frac1{T_1}-\frac1{T_2}\right)`,R`\ln\frac{k_2}{0{,}0200}=\frac{50000}{8{,}314}\left(\frac1{300}-\frac1{330}\right)`,R`k_2\approx0{,}124\ \mathrm{s^{-1}}`)+`<p>Se utilizan temperaturas absolutas y energía en J/mol.</p>`)+
    step('b. Suma',chain(R`A+I\rightarrow I+P`,R`A\rightarrow P`)+`<p>I se cancela y es el intermediario.</p>`)+
    step('c. Ley del paso lento',chain(R`v=k_1[A]`)+`<p>Se supone que la primera etapa es elemental e irreversible y determina la velocidad.</p>`)+
    step('d. Conceptos',`<p>La energía de activación es una diferencia de energía hasta un estado de transición; el intermediario es una especie química situada entre etapas.</p>`),
    'k(330 K) ≈ 0,124 s⁻¹; global A → P; intermediario I; v = k₁[A].');
  practice('B4','Formación de HI por etapas',`<p>Se propone el siguiente mecanismo radicalario ilustrativo para la formación de ioduro de hidrógeno. Las etapas están escritas en el sentido directo para analizar su suma; no se afirma que representen por sí solas el mecanismo experimental completo.</p><p><b>Etapa 1:</b></p>${M(R`I_2\rightarrow2I`)}<p><b>Etapa 2:</b></p>${M(R`H_2+I\rightarrow H_2I`)}<p><b>Etapa 3:</b></p>${M(R`H_2I+I\rightarrow2HI`)}<p><b>a)</b> Verificar la conservación de átomos en cada etapa. <b>b)</b> Sumar las tres etapas y obtener la reacción global. <b>c)</b> Identificar las especies intermediarias. <b>d)</b> Explicar por qué no se puede determinar la ley global sin información sobre la rapidez de las etapas.</p>`,
    step('a. Conservación',`<p>En cada etapa se conserva el número de átomos de H y de I. El símbolo I representa yodo atómico, no I₂.</p>`)+
    step('b. Sumar y cancelar',chain(R`I_2+H_2+2I+H_2I\rightarrow2I+H_2I+2HI`,R`I_2+H_2\rightarrow2HI`)+`<p>Los dos átomos I y H₂I aparecen a ambos lados y se cancelan.</p>`)+
    step('c. Intermediarios',chain(R`I`,R`H_2I`)+`<p>Se forman en una etapa y se consumen en otras. No aparecen en la reacción global.</p>`)+
    step('d. Ley cinética',`<p>Sin conocer las etapas rápidas y lentas, la reversibilidad y posibles preequilibrios, no corresponde inventar exponentes para la ley global.</p>`),
    'Global H₂ + I₂ → 2HI; intermediarios I y H₂I; la ley global no se deduce solo de la suma.');
  practice('B5','Sustitución SN1 frente a SN2',`<p>Se estudia la sustitución de un halogenuro orgánico R–Cl por OH⁻. Se proponen dos caminos alternativos. Camino I: ionización lenta R–Cl → R⁺ + Cl⁻, seguida de ataque rápido R⁺ + OH⁻ → R–OH. Camino II: reacción concertada R–Cl + OH⁻ → R–OH + Cl⁻ en una sola etapa.</p><p><b>Etapa 1:</b></p>${M(R`RCl\rightarrow R^++Cl^-`)}<p><b>Etapa 2:</b></p>${M(R`R^++OH^-\rightarrow ROH`)}<p><b>Etapa 3:</b></p>${M(R`RCl+OH^-\rightarrow ROH+Cl^-`)}<p><b>a)</b> Sumar las etapas del camino I. <b>b)</b> Identificar el intermediario del camino I y explicar por qué el camino II no tiene intermediario. <b>c)</b> Escribir las leyes de velocidad de los pasos determinantes, suponiéndolos elementales. <b>d)</b> Comparar la cantidad de máximos de energía de ambos caminos.</p>`,
    step('a. Camino I',chain(R`RCl+R^++OH^-\rightarrow R^++Cl^-+ROH`,R`RCl+OH^-\rightarrow ROH+Cl^-`)+`<p>El carbocatión R⁺ se cancela.</p>`)+
    step('b. Intermediario',chain(R`R^+`)+`<p>El camino I tiene carbocatión intermedio. El camino II es concertado: solo tiene estado de transición, no un mínimo intermedio.</p>`)+
    step('c. Leyes cinéticas',chain(R`v_{SN1}=k_1[RCl]`,R`v_{SN2}=k_2[RCl][OH^-]`)+`<p>En SN1 la ionización unimolecular es lenta; en SN2 el único paso es bimolecular.</p>`)+
    step('d. Perfiles',`<p>El camino I tiene dos máximos y un mínimo intermedio. El camino II tiene un máximo y ningún mínimo intermedio. Las condiciones reales determinan qué vía predomina.</p>`),
    'SN1: v = k₁[RCl], dos picos; SN2: v = k₂[RCl][OH⁻], un pico.');
  const n=Math.max(0,...QG.units.map(u=>Number(u.n)||0))+1;
  if(QG.units.some(u=>u.id==='cinetica'))return;
  QG.units.push({
    id:'cinetica',n,title:'Cinética química',
    lead:'Velocidad de reacción, ley de velocidad, órdenes y mecanismos, en una secuencia conceptual progresiva. Ejemplos , gráfico, hoja de fórmulas y la guía de ejercitación resuelta.',
    sections,exercises,modelExercises
  });
})();
