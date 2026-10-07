// 27xSOLved · Física Aplicada · Tema 2: Hidrodinámica y viscosidad.
// Teoría y guías resueltas con fórmulas renderizadas.
(function(){
  'use strict';
  const K=window.ET27Kit;if(!K)return;
  const {M,m,chain,key,sym,simple,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field}=K;
  const R=String.raw;

  // ---------- Esquemas ----------
  const svgTube=`<svg viewBox="0 0 640 230" role="img" aria-label="Tubo con una sección de área A; el fluido avanza una distancia Δx a velocidad v durante Δt">
    <defs><marker id="hdArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="40" y="60" width="560" height="100" rx="10" class="svgSoft"/>
    <line x1="40" y1="60" x2="600" y2="60" class="svgLine"/><line x1="40" y1="160" x2="600" y2="160" class="svgLine"/>
    <rect x="200" y="62" width="190" height="96" class="svgVolume"/>
    <ellipse cx="200" cy="110" rx="18" ry="50" class="svgSection"/><ellipse cx="390" cy="110" rx="18" ry="50" class="svgSectionDash"/>
    <text x="200" y="40" text-anchor="middle" class="svgText">sección A</text>
    <text x="295" y="115" text-anchor="middle" class="svgText strong">ΔV = A·Δx</text>
    <line x1="210" y1="190" x2="382" y2="190" class="svgArrow" marker-end="url(#hdArr)"/><text x="295" y="215" text-anchor="middle" class="svgText">Δx (recorre en Δt)</text>
    <line x1="460" y1="110" x2="560" y2="110" class="svgArrow" marker-end="url(#hdArr)"/><text x="510" y="98" text-anchor="middle" class="svgText strong">v</text>
    <text x="70" y="115" class="svgText">fluido →</text>
  </svg>`;

  const svgNarrow=`<svg viewBox="0 0 640 200" role="img" aria-label="Conducto que se angosta: en la parte ancha la velocidad es menor y en la angosta es mayor">
    <defs><marker id="hdArr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <path d="M30 40 H250 L370 75 H610 V125 H370 L250 160 H30 Z" class="svgSoft svgLineFill"/>
    <line x1="80" y1="100" x2="150" y2="100" class="svgArrow" marker-end="url(#hdArr2)"/>
    <line x1="430" y1="100" x2="580" y2="100" class="svgArrow thick" marker-end="url(#hdArr2)"/>
    <text x="115" y="88" text-anchor="middle" class="svgText strong">v₁ (lenta)</text><text x="505" y="90" text-anchor="middle" class="svgText strong">v₂ (rápida)</text>
    <text x="140" y="185" text-anchor="middle" class="svgText">A₁ grande</text><text x="490" y="150" text-anchor="middle" class="svgText">A₂ chica</text>
  </svg>`;

  const svgLayers=`<svg viewBox="0 0 640 250" role="img" aria-label="Capas de fluido entre una placa fija abajo y una placa móvil arriba; la velocidad crece con la altura">
    <defs><marker id="hdArr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="60" y="20" width="420" height="16" class="svgPlate"/><text x="500" y="33" class="svgText">placa móvil</text>
    <rect x="60" y="204" width="420" height="16" class="svgPlate fixed"/><text x="500" y="217" class="svgText">pared fija (v = 0)</text>
    ${[0,1,2,3,4].map(i=>{const y=186-i*36,l=30+i*55;return `<line x1="70" y1="${y+10}" x2="470" y2="${y+10}" class="svgLayer"/><line x1="140" y1="${y}" x2="${140+l}" y2="${y}" class="svgArrow" marker-end="url(#hdArr3)"/>`}).join('')}
    <line x1="40" y1="200" x2="40" y2="40" class="svgLine" marker-end="url(#hdArr3)"/><text x="22" y="120" class="svgText strong">y</text>
    <text x="350" y="125" class="svgText">cada capa “arrastra” a la de abajo</text>
  </svg>`;

  const svgProfile=`<svg viewBox="0 0 640 230" role="img" aria-label="Perfil de velocidades parabólico en un tubo: cero en las paredes y máximo en el centro">
    <defs><marker id="hdArr4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="60" y1="30" x2="600" y2="30" class="svgLine thickLine"/><line x1="60" y1="200" x2="600" y2="200" class="svgLine thickLine"/>
    <line x1="160" y1="30" x2="160" y2="200" class="svgLayer"/>
    <path d="M160 30 Q 440 115 160 200" class="svgCurve"/>
    ${[50,72,94,115,136,158,180].map(y=>{const t=(y-115)/85,len=Math.max(4,210*(1-t*t));return `<line x1="160" y1="${y}" x2="${160+len}" y2="${y}" class="svgArrow" marker-end="url(#hdArr4)"/>`}).join('')}
    <text x="410" y="120" class="svgText strong">v máxima en el centro</text>
    <text x="410" y="24" class="svgText">pared: v = 0</text><text x="410" y="222" class="svgText">pared: v = 0</text>
  </svg>`;

  const svgReynolds=`<svg viewBox="0 0 640 220" role="img" aria-label="Experiencia del colorante: en régimen laminar el filamento se mantiene; en turbulento se dispersa">
    <rect x="40" y="25" width="560" height="60" rx="8" class="svgSoft"/><rect x="40" y="135" width="560" height="60" rx="8" class="svgSoft"/>
    <line x1="60" y1="55" x2="580" y2="55" class="svgDye"/>
    <path d="M60 165 L170 165 C 200 150 220 185 250 160 S 300 140 330 175 S 380 190 410 150" class="svgDye"/>
    ${[[430,150],[455,178],[480,158],[505,170],[530,148],[555,182],[575,162],[495,145],[545,166],[470,186]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" class="svgDyeDot"/>`).join('')}
    <text x="40" y="18" class="svgText strong">Laminar: el filamento de colorante sigue entero</text>
    <text x="40" y="128" class="svgText strong">Turbulento: remolinos, el colorante se mezcla</text>
  </svg>`;

  const svgSphere=`<svg viewBox="0 0 640 260" role="img" aria-label="Esfera que cae en un fluido: peso hacia abajo, empuje y fuerza viscosa hacia arriba">
    <defs><marker id="hdArr5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="200" y="10" width="240" height="240" rx="12" class="svgSoft"/>
    <circle cx="320" cy="130" r="34" class="svgBall"/>
    <line x1="320" y1="168" x2="320" y2="240" class="svgArrow thick" marker-end="url(#hdArr5)"/><text x="332" y="232" class="svgText strong">P (peso)</text>
    <line x1="296" y1="94" x2="296" y2="30" class="svgArrow" marker-end="url(#hdArr5)"/><text x="196" y="48" class="svgText strong">E (empuje)</text>
    <line x1="344" y1="94" x2="344" y2="40" class="svgArrow" marker-end="url(#hdArr5)"/><text x="354" y="52" class="svgText strong">F<tspan baseline-shift="sub" font-size="11">vis</tspan></text>
    <text x="460" y="120" class="svgText">movimiento ↓</text><text x="460" y="145" class="svgText">+ hacia abajo</text>
  </svg>`;

  const sections=[];
  const add=(key,label,kicker,html)=>sections.push({key:`hidro-${key}`,label,kicker,html});

  // ---------- 1. Caudal ----------
  add('caudal','Caudal','CONCEPTO · 01',`
<p>El <b>caudal volumétrico</b> es el volumen de fluido que atraviesa una sección por unidad de tiempo. ${simple('Dicho fácil: cuántos litros pasan por un punto del caño en cada segundo')}</p>
${sym([['Q','caudal (volumen por tiempo)','m³/s · cm³/s · L/s'],['V','volumen; ΔV, volumen que pasa','m³ · cm³ · L'],[R`\Delta t`,'intervalo de tiempo','s'],['A','área de la sección transversal','m² · cm²'],['v','velocidad media del fluido','m/s · cm/s'],[R`\Delta x`,'distancia que avanza el fluido','m · cm']])}
${key(R`Q=\frac{\Delta V}{\Delta t}`,'Definición')}
<p>Si el caudal es constante, se puede despejar el volumen que pasa en un tiempo dado o el tiempo necesario para mover un volumen:</p>
${chain([R`\Delta V=Q\,\Delta t`,'volumen que pasa'],[R`\Delta t=\frac{\Delta V}{Q}`,'tiempo para llenar o vaciar'])}
<h3>De la definición a Q = A·v</h3>
<p>Imaginá un “cilindro” de fluido que en un tiempo Δt avanza una distancia Δx por el tubo. Su volumen es base por altura: área de la sección por distancia recorrida.</p>
${figure(svgTube,'El tramo sombreado es el volumen que cruza la sección A en un tiempo Δt.')}
${chain([R`\Delta V=A\,\Delta x`,'volumen del tramo'],[R`Q=\frac{A\,\Delta x}{\Delta t}`,'reemplazo en la definición'],[R`v=\frac{\Delta x}{\Delta t}`,'Δx/Δt es la velocidad'],[R`Q=A\,v`,'resultado'])}
${key(R`Q=A\,v`,'Caudal en un conducto')}
${idea('¿Qué velocidad es v?',`<p>En un caño real el fluido no va igual de rápido en todos lados: frena junto a las paredes y va más rápido en el centro. Por eso, si el perfil de velocidades no es uniforme, <b>v es la velocidad media sobre la sección</b>. ${simple('Es el “promedio” que, multiplicado por el área, da el caudal correcto')}</p>`)}
<h3>Unidades</h3>
${chain(R`[Q]=\mathrm{\frac{m^3}{s}}\quad\text{(MKS)}`,R`[Q]=\mathrm{\frac{cm^3}{s}}\quad\text{(CGS)}`,R`1\ \mathrm{L}=10^{-3}\ \mathrm{m^3}`,R`1\ \mathrm{L}=1000\ \mathrm{cm^3}`)}
${note('Atajo para pasar áreas',`<p>1 m = 100 cm, entonces 1 m² = 100² cm² = 10 000 cm². ${simple('Al pasar áreas se eleva el factor al cuadrado; con volúmenes, al cubo')}</p>`)}
<h3>Sección circular</h3>
<p>La mayoría de los caños y mangueras son circulares. Con r el radio y d el diámetro:</p>
${chain([R`A=\pi r^2`,'área del círculo'],[R`r=\frac{d}{2}`,'radio = mitad del diámetro'],[R`A=\pi\left(\frac{d}{2}\right)^2=\frac{\pi d^2}{4}`,'en función del diámetro'],[R`Q=v\,\frac{\pi d^2}{4}`,'caudal con el diámetro'],[R`\Delta t=\frac{4\,\Delta V}{v\,\pi d^2}`,'tiempo de llenado'])}
${warn('Error típico',`<p>Usar el diámetro en ${m(R`\pi r^2`)}. Si te dan d, o pasás a radio, o usás ${m(R`\pi d^2/4`)}. Nunca ${m(R`\pi d^2`)}.</p>`)}
${example('Agua que ingresa por un tubo',
 `<p><b>Consigna:</b> por un tubo de sección 50 cm² ingresa agua a 2,5 m/s. Calcular el caudal y el volumen que ingresa en 45 minutos.</p>`,
 step('1. Datos y unidades coherentes',`<p>Paso todo a MKS para no mezclar cm² con m/s.</p>${chain(R`A=50\ \mathrm{cm^2}=\frac{50}{10\,000}\ \mathrm{m^2}=0{,}005\ \mathrm{m^2}`,R`v=2{,}5\ \mathrm{m/s}`)}`)+
 step('2. Caudal',chain(R`Q=A\,v`,R`Q=0{,}005\ \mathrm{m^2}\cdot2{,}5\ \mathrm{m/s}`,R`Q=0{,}0125\ \mathrm{m^3/s}`))+
 step('3. Tiempo en segundos',chain(R`\Delta t=45\cdot60\ \mathrm{s}`,R`\Delta t=2700\ \mathrm{s}`))+
 step('4. Volumen',chain(R`\Delta V=Q\,\Delta t`,R`\Delta V=0{,}0125\ \mathrm{m^3/s}\cdot2700\ \mathrm{s}`,R`\Delta V=33{,}75\ \mathrm{m^3}`,[R`\Delta V=33\,750\ \mathrm{L}`,'1 m³ = 1000 L']))+
 fix('Corrección respecto del apunte',`<p>El caudal se obtiene <b>multiplicando</b> área por velocidad, y sus unidades son volumen por tiempo (m³/s), no otra combinación.</p>`),
 `Q = 0,0125 m³/s · ΔV = 33,75 m³ = 33 750 L`)}
${example('Llenado de una pileta',
 `<p><b>Consigna:</b> una pileta de 300 L se llena con una manguera de diámetro 1,5 cm, de la que sale agua a 50 cm/s. Calcular el tiempo.</p>`,
 step('1. Área de la boca de la manguera',`<p>Trabajo en CGS porque d y v están en cm.</p>${chain(R`A=\frac{\pi d^2}{4}`,R`A=\frac{\pi(1{,}5\ \mathrm{cm})^2}{4}`,R`A\approx1{,}767\ \mathrm{cm^2}`)}`)+
 step('2. Caudal',chain(R`Q=A\,v`,R`Q\approx1{,}767\ \mathrm{cm^2}\cdot50\ \mathrm{cm/s}`,R`Q\approx88{,}36\ \mathrm{cm^3/s}`))+
 step('3. Volumen en cm³',chain([R`V=300\ \mathrm{L}=300\,000\ \mathrm{cm^3}`,'1 L = 1000 cm³']))+
 step('4. Tiempo',chain(R`\Delta t=\frac{V}{Q}`,R`\Delta t\approx\frac{300\,000\ \mathrm{cm^3}}{88{,}36\ \mathrm{cm^3/s}}`,R`\Delta t\approx3395\ \mathrm{s}`,[R`\Delta t\approx56{,}6\ \mathrm{min}`,'÷ 60'],[R`\Delta t\approx0{,}943\ \mathrm{h}`,'÷ 3600']))+
 fix('Sobre los resultados del apunte',`<p>El apunte tiene un valor cercano a 3404 s: la pequeña diferencia viene del redondeo del área o del caudal. También aparece algo que parece <b>9,44 h</b>, que es incorrecto: el tiempo correcto es <b>≈ 0,94 h</b> (menos de una hora). ${simple('Control rápido: 3395 s son unos 57 minutos, no 9 horas')}</p>`),
 `Δt ≈ 3395 s ≈ 56,6 min ≈ 0,94 h`)}
`);

  // ---------- 2. Conservación del caudal ----------
  add('continuidad','Conservación del caudal','ECUACIÓN DE CONTINUIDAD · 02',`
<p>Si un fluido <b>incompresible</b> circula en régimen <b>estacionario</b> por un conducto sin pérdidas ni entradas adicionales, todo el volumen que entra por una sección tiene que salir por la otra. ${simple('El agua no se “acumula” ni se “aprieta” en el medio del caño')}</p>
${sym([[R`Q_1,\ Q_2`,'caudal en la sección 1 y en la 2','m³/s'],[R`A_1,\ A_2`,'áreas de cada sección','m²'],[R`v_1,\ v_2`,'velocidades medias en cada sección','m/s'],[R`d_1,\ d_2`,'diámetros de cada sección','m']])}
${chain([R`Q_1=Q_2`,'conservación'],[R`A_1v_1=A_2v_2`,'porque Q = A·v'],[R`v_2=v_1\frac{A_1}{A_2}`,'despeje'])}
${figure(svgNarrow,'Mismo caudal: donde el caño es más angosto, el fluido va más rápido.')}
<h3>Conductos circulares: importa el cuadrado del diámetro</h3>
${chain([R`v_1\pi r_1^2=v_2\pi r_2^2`,'A = πr²'],[R`v_1r_1^2=v_2r_2^2`,'se cancela π'],[R`v_1d_1^2=v_2d_2^2`,'r = d/2: el 1/4 se cancela'],[R`v_2=v_1\left(\frac{d_1}{d_2}\right)^2`,'despeje'])}
${idea('Lectura de la fórmula',`<p>Al <b>disminuir la sección aumenta la velocidad media</b>. Y como el área depende del <b>cuadrado</b> del diámetro, si el diámetro se reduce a la mitad, la velocidad se multiplica por 2² = 4. ${simple('Es lo que hacés al apretar la punta de la manguera')}</p>`)}
${calc('continuity','Velocidad al cambiar el diámetro',field('d1','d₁',6)+field('d2','d₂',3)+field('v1','v₁',2),'d₁ y d₂ en la misma unidad; v₂ sale en la unidad de v₁.')}
${deep('Ampliación: conservación del caudal másico',`<p>Lo que realmente se conserva siempre es la <b>masa</b>. El caudal másico ${m(R`\dot m`)} es la masa transportada por unidad de tiempo (kg/s) y ρ es la densidad:</p>
${chain(R`\dot m=\rho A v`,R`\rho_1A_1v_1=\rho_2A_2v_2`)}
<p>Si el fluido es incompresible, ${m(R`\rho_1=\rho_2`)}, la densidad se cancela y se recupera ${m(R`A_1v_1=A_2v_2`)}. ${simple('Para gases que se comprimen, hay que usar esta versión con ρ')}</p>`)}
${example('Cambio de diámetro en pulgadas',
 `<p><b>Datos:</b> d₁ = 1 pulgada; d₂ = 1,5 pulgadas; v₁ = 10 cm/s. Hallar v₂.</p>`,
 step('1. ¿Hace falta convertir?',`<p>No: en ${m(R`(d_1/d_2)^2`)} las pulgadas se cancelan, porque es un cociente de dos longitudes en la misma unidad. Igual, las conversiones del apunte son:</p>${chain(R`1\ \mathrm{pulgada}=0{,}0254\ \mathrm{m}`,R`1{,}5\ \mathrm{pulgadas}=0{,}0381\ \mathrm{m}`)}`)+
 step('2. Continuidad',chain(R`v_2=v_1\left(\frac{d_1}{d_2}\right)^2`,R`v_2=10\ \mathrm{cm/s}\cdot\left(\frac{1}{1{,}5}\right)^2`,R`v_2=10\cdot0{,}444\ \mathrm{cm/s}`,R`v_2\approx4{,}44\ \mathrm{cm/s}`))+
 fix('Error del apunte',`<p>El resultado <b>6,67 cm/s</b> es incorrecto: sale de usar ${m(R`d_1/d_2`)} <b>sin elevarlo al cuadrado</b>. Como el tubo se ensancha, la velocidad baja, y baja con el cuadrado de la razón de diámetros.</p>`),
 `v₂ ≈ 4,44 cm/s`)}
${example('Reducción de sección',
 `<p><b>Datos:</b> d₁ = 6 cm; d₂ = 3 cm; v₁ = 2 m/s. Hallar v₂.</p>`,
 chain(R`v_2=v_1\left(\frac{d_1}{d_2}\right)^2`,R`v_2=2\ \mathrm{m/s}\cdot\left(\frac{6}{3}\right)^2`,R`v_2=2\cdot4\ \mathrm{m/s}`,R`v_2=8\ \mathrm{m/s}`)+
 fix('Corrección de unidad',`<p>El manuscrito escribe m/s². Una <b>velocidad</b> se mide en <b>m/s</b>; m/s² es aceleración.</p>`),
 `v₂ = 8 m/s`)}
`);

  // ---------- 3. Viscosidad y ley de Newton ----------
  add('viscosidad','Viscosidad y ley de Newton','VISCOSIDAD DINÁMICA · 03',`
<p>La <b>viscosidad dinámica η</b> describe la resistencia de un fluido a deformarse cuando sus capas se mueven una respecto de otra. ${simple('Es el “rozamiento interno” del fluido: la miel es muy viscosa, el agua poco')}</p>
${figure(svgLayers,'Modelo de capas: la placa de arriba se mueve, la pared de abajo está quieta; la velocidad cambia de capa en capa.')}
${sym([[R`\eta`,'viscosidad dinámica (letra eta)','Pa·s · P'],['F','módulo de la fuerza tangencial','N · dina'],['A','área de contacto entre capas','m² · cm²'],[R`\tau`,'tensión de corte = F/A (letra tau)','Pa'],[R`\Delta v`,'diferencia de velocidades entre capas','m/s'],[R`\Delta y`,'separación perpendicular entre las capas','m']])}
${chain([R`\Delta v=v_2-v_1`,'cuánto más rápido va una capa que la otra'],[R`\tau=\frac{F}{A}`,'fuerza tangencial por unidad de área'])}
<p>Para un <b>fluido newtoniano</b>, la tensión de corte es proporcional al gradiente de velocidad ${simple('qué tan rápido cambia la velocidad al moverse perpendicularmente al flujo')}:</p>
${key(R`\tau=\eta\,\frac{dv}{dy}`,'Ley de Newton de la viscosidad')}
<p>Si el gradiente es aproximadamente uniforme ${simple('la velocidad cambia de forma pareja entre capas')}, se reemplaza la derivada por un cociente de diferencias:</p>
${key(R`F=\eta\,A\,\frac{|\Delta v|}{\Delta y}`,'Fuerza viscosa (módulo)')}
${idea('Dirección vs. módulo',`<p>La fórmula da el <b>módulo</b> de la fuerza (por eso el valor absoluto). La <b>dirección</b> se razona aparte: la fuerza viscosa siempre se opone al deslizamiento relativo. La capa rápida es frenada por la lenta, y la lenta es arrastrada por la rápida.</p>`)}
<h3>Condición de no deslizamiento</h3>
<p>Junto a una pared inmóvil, la capa de fluido que la toca tiene <b>velocidad cero</b>. ${simple('El fluido “se pega” a la pared')} En un tubo con flujo laminar desarrollado, la velocidad crece desde cero en la pared hasta un máximo en el centro: el perfil es una parábola.</p>
${figure(svgProfile,'Perfil de velocidades en un tubo con flujo laminar desarrollado.')}
<h3>Unidades</h3>
${chain([R`[\eta]=\mathrm{Pa\cdot s}`,'MKS'],[R`[\eta]=\mathrm{\frac{N\cdot s}{m^2}}`,'porque Pa = N/m²'],[R`[\eta]=\mathrm{\frac{kg}{m\cdot s}}`,'porque N = kg·m/s²'])}
<p>En el sistema CGS la unidad se llama <b>poise</b> (P):</p>
${chain(R`1\ \mathrm{P}=1\ \mathrm{\frac{dina\cdot s}{cm^2}}`,R`1\ \mathrm{P}=1\ \mathrm{\frac{g}{cm\cdot s}}`,R`1\ \mathrm{P}=0{,}1\ \mathrm{Pa\cdot s}`)}
${deep('¿Por qué 1 P = 0,1 Pa·s?',chain([R`1\ \mathrm{P}=1\ \frac{\mathrm{g}}{\mathrm{cm\cdot s}}`],[R`1\ \mathrm{P}=\frac{10^{-3}\ \mathrm{kg}}{10^{-2}\ \mathrm{m}\cdot\mathrm{s}}`,'g → kg y cm → m'],[R`1\ \mathrm{P}=10^{-1}\ \mathrm{\frac{kg}{m\cdot s}}=0{,}1\ \mathrm{Pa\cdot s}`])+`<p>Dato útil: el agua a unos 20 °C tiene η ≈ 1 mPa·s = 0,01 P = 1 centipoise. ${simple('Por eso el centipoise es una unidad muy usada')}</p>`)}
`);

  // ---------- 4. Viscosidad cinemática ----------
  add('cinematica','Viscosidad cinemática','η vs ν · 04',`
<p>La <b>viscosidad cinemática ν</b> (letra “nu”) es la viscosidad dinámica dividida por la densidad del fluido. ${simple('Mide qué tan viscoso es el fluido “en relación con lo pesado” que es')}</p>
${sym([[R`\nu`,'viscosidad cinemática','m²/s · St'],[R`\eta`,'viscosidad dinámica','Pa·s'],[R`\rho`,'densidad','kg/m³']])}
${key(R`\nu=\frac{\eta}{\rho}`,'Definición')}
${chain([R`[\nu]=\frac{\mathrm{kg/(m\cdot s)}}{\mathrm{kg/m^3}}=\mathrm{\frac{m^2}{s}}`,'MKS'],[R`[\nu]=\mathrm{\frac{cm^2}{s}}`,'CGS'],[R`1\ \mathrm{St}=1\ \mathrm{cm^2/s}`,'stokes'])}
${table(['','Viscosidad dinámica','Viscosidad cinemática'],[
 ['Símbolo',m(R`\eta`),m(R`\nu`)],
 ['Qué mide','Resistencia a que las capas deslicen (fuerza por área y por gradiente)','Esa resistencia por unidad de densidad'],
 ['Fórmula',m(R`\tau=\eta\,\frac{dv}{dy}`),m(R`\nu=\eta/\rho`)],
 ['Unidad MKS','Pa·s','m²/s'],
 ['Unidad CGS','P (poise)','St (stokes)']
])}
${warn('No confundir η con ν',`<p>Fijate en las unidades: si aparece Pa·s o poise, es <b>η</b>; si aparece m²/s o stokes, es <b>ν</b>. ${simple('Una tiene “segundos” multiplicando; la otra, “área sobre segundos”')}</p>`)}
`);

  // ---------- 5. Regímenes y Reynolds ----------
  add('reynolds','Laminar, turbulento y Reynolds','REGÍMENES DE FLUJO · 05',`
<div class="twoCol">
 <div class="kitBox kitIdea"><b>Flujo laminar</b><p>Movimiento ordenado en capas que deslizan unas sobre otras, con poca mezcla transversal. ${simple('Como cartas de un mazo que se deslizan')}</p></div>
 <div class="kitBox kitWarn"><b>Flujo turbulento</b><p>Fluctuaciones de velocidad, remolinos y mezcla intensa. ${simple('Como el agua de un río torrentoso')}</p></div>
</div>
<h3>La experiencia de Reynolds</h3>
<p>Se inyecta un hilo fino de colorante en el centro de un tubo con agua circulando. Con caudal bajo, el colorante forma un <b>filamento</b> que se mantiene recto: régimen laminar. Al aumentar el caudal, el filamento empieza a ondular y finalmente <b>se dispersa</b> en todo el tubo: régimen turbulento.</p>
${figure(svgReynolds,'Experiencia del colorante.')}
${warn('Cuidado con una idea muy común',`<p>No es cierto que “velocidad baja siempre significa laminar”. El régimen depende también del <b>diámetro</b>, de la <b>densidad</b> y de la <b>viscosidad</b>. Por eso se usa un número que los combina a todos: el número de Reynolds.</p>`)}
${sym([[R`\mathrm{Re}`,'número de Reynolds','adimensional'],[R`\rho`,'densidad del fluido','kg/m³'],['v','velocidad media','m/s'],['d','diámetro del tubo','m'],[R`\eta`,'viscosidad dinámica','Pa·s'],[R`\nu`,'viscosidad cinemática','m²/s'],['Q','caudal','m³/s']])}
${key(R`\mathrm{Re}=\frac{\rho\,v\,d}{\eta}`,'Número de Reynolds en un tubo circular')}
${chain([R`\mathrm{Re}=\frac{v\,d}{\nu}`,'usando ν = η/ρ'],[R`v=\frac{Q}{A}=\frac{4Q}{\pi d^2}`,'velocidad media a partir del caudal'],[R`\mathrm{Re}=\frac{\rho d}{\eta}\cdot\frac{4Q}{\pi d^2}`,'reemplazo'],[R`\mathrm{Re}=\frac{4\rho Q}{\pi d\,\eta}`,'simplifico una d'])}
${deep('¿Por qué Re no tiene unidades?',chain(R`[\mathrm{Re}]=\frac{\mathrm{kg/m^3}\cdot\mathrm{m/s}\cdot\mathrm{m}}{\mathrm{kg/(m\cdot s)}}`,R`[\mathrm{Re}]=\frac{\mathrm{kg/(m\cdot s)}}{\mathrm{kg/(m\cdot s)}}=1`)+`<p>Es adimensional: da el mismo número en MKS o en CGS, siempre que todas las magnitudes estén en el mismo sistema. ${simple('Compara las fuerzas de inercia, que tienden a desordenar, con las viscosas, que tienden a ordenar')}</p>`)}
<h3>Valores de referencia</h3>
<p>Los apuntes usan <b>Re ≈ 2100</b> como valor orientativo para separar regímenes. La transición no ocurre siempre en un valor único: depende de la rugosidad, de la entrada al tubo y de las perturbaciones. Para tubos, la clasificación orientativa habitual es:</p>
${table(['Re','Régimen orientativo'],[['menor que ≈ 2300','Laminar'],['entre ≈ 2300 y ≈ 4000','Transición'],['mayor que ≈ 4000','Turbulento']])}
${calc('reynolds','Calculá el número de Reynolds',field('rho','ρ (kg/m³)',1000)+field('v','v (m/s)',0.1)+field('d','d (m)',0.02)+field('eta','η (Pa·s)',0.001),'Usá unidades MKS. Valores iniciales: agua a 0,1 m/s en un caño de 2 cm.')}
`);

  // ---------- 6. Presión de circulación ----------
  add('presion','Presión para la circulación','HAGEN–POISEUILLE Y DARCY · 06',`
<p>En un tramo horizontal, lo que “empuja” al fluido es una <b>diferencia de presión</b> entre la entrada y la salida. Esa diferencia también compensa la energía que se pierde por la viscosidad. ${simple('Si no empujás, el rozamiento interno frena el flujo')}</p>
${chain([R`\Delta p=p_a-p_b`,'presión a la entrada (a) menos presión a la salida (b)'])}
${note('Alcance de la frase del apunte',`<p>“Si no hay diferencia de presión, no hay circulación” vale para un <b>tramo horizontal con flujo impulsado por presión</b>. No es una ley universal: el flujo también puede deberse a la gravedad (un caño inclinado), a una bomba o al movimiento de las paredes.</p>`)}
<h3>Flujo laminar: ley de Hagen–Poiseuille</h3>
<p><b>Supuestos:</b> fluido newtoniano e incompresible; flujo estacionario y laminar desarrollado; tubo recto de sección circular constante; condición de no deslizamiento.</p>
${sym([['Q','caudal','m³/s'],['r','radio interior del tubo','m'],['d','diámetro interior','m'],[R`\ell`,'longitud del tubo','m'],[R`\eta`,'viscosidad dinámica','Pa·s'],[R`\Delta p`,'diferencia de presión','Pa']])}
${key(R`Q=\frac{\pi r^4}{8\eta\ell}\,\Delta p`,'Hagen–Poiseuille')}
${chain([R`\Delta p=\frac{8\eta\ell Q}{\pi r^4}`,'despejo Δp'],[R`r^4=\left(\frac{d}{2}\right)^4=\frac{d^4}{16}`,'paso a diámetro'],[R`\Delta p=\frac{8\cdot16\,\eta\ell Q}{\pi d^4}`,'reemplazo'],[R`\Delta p=\frac{128\,\eta\ell Q}{\pi d^4}`,'8·16 = 128'])}
${idea('La cuarta potencia del radio',`<p>El caudal depende de ${m('r^4')}. Al <b>duplicar el radio</b>, el caudal se multiplica por ${m(R`2^4=16`)} si se mantienen Δp, η y ℓ. ${simple('Un caño apenas más ancho deja pasar muchísimo más fluido; por eso una arteria un poco obstruida afecta tanto la circulación')}</p>`)}
${calc('poiseuille','¿Cuánto cambia el caudal si cambio el radio?',field('k','factor del radio (r nuevo / r viejo)',2),'Probá 2, 0,5 o 1,1.')}
<h3>Flujo turbulento: ecuación de Darcy</h3>
<p>En régimen turbulento la relación ya no es la de Poiseuille. Se usa una formulación con un <b>factor de fricción</b>:</p>
${sym([[R`f_D`,'factor de fricción de Darcy; depende de Re y de la rugosidad relativa','adimensional'],[R`\ell/d`,'longitud sobre diámetro','adimensional'],[R`\rho v^2/2`,'“presión dinámica” del flujo','Pa']])}
${key(R`\Delta p=f_D\,\frac{\ell}{d}\,\frac{\rho v^2}{2}`,'Darcy–Weisbach')}
${deep('Expresión con radio y caudal',chain([R`d=2r`],[R`v=\frac{Q}{\pi r^2}`,'v = Q/A'],[R`\Delta p=f_D\,\frac{\ell}{2r}\cdot\frac{\rho}{2}\cdot\frac{Q^2}{\pi^2r^4}`,'reemplazo'],[R`\Delta p=\frac{f_D\,\rho\,\ell\,Q^2}{4\pi^2r^5}`,'ordeno'])+`<p>Comparalo con el laminar: en turbulento Δp crece con <b>Q²</b> (no con Q) y depende de <b>r⁵</b>. ${simple('Duplicar el caudal en régimen turbulento cuesta aproximadamente cuatro veces más presión')}</p>`)}
${note('Nota del material original · pendiente de verificación',`<p>El apunte trae una fórmula de pérdida de presión poco legible y una correlación que parece</p>${M(R`f=0{,}0014+0{,}125\,\mathrm{Re}^{-0{,}32}`)}<p>No se incorpora como fórmula general validada: falta verificar su fuente, su rango de validez y si usa el factor de <b>Darcy</b> o el de <b>Fanning</b>. No hay que mezclar convenciones, porque difieren en un factor 4:</p>${M(R`f_D=4f_F`)}`)}
`);

  // ---------- 7. Potencia ----------
  add('potencia','Potencia de circulación','ENERGÍA POR SEGUNDO · 07',`
<p>Mover un fluido contra una diferencia de presión requiere entregar energía. La <b>potencia</b> es esa energía por unidad de tiempo. ${simple('Cuánto “trabaja” la bomba cada segundo')}</p>
${sym([['P','potencia','W'],['W','trabajo','J'],['F','fuerza que empuja al fluido','N'],['v','velocidad','m/s'],[R`\Delta p`,'diferencia de presión','Pa'],['Q','caudal','m³/s'],[R`\varepsilon`,'eficiencia de la bomba (entre 0 y 1)','adimensional']])}
<h3>Deducción paso a paso</h3>
${chain([R`P=\frac{W}{\Delta t}`,'definición de potencia'],[R`W=F\,\Delta x`,'trabajo de una fuerza constante'],[R`P=F\,\frac{\Delta x}{\Delta t}`,'reemplazo'],[R`P=F\,v`,'Δx/Δt = v'],[R`Q=A\,v\ \Rightarrow\ v=\frac{Q}{A}`,'uso el caudal'],[R`P=\frac{F\,Q}{A}`,'reemplazo v'],[R`\Delta p=\frac{F}{A}`,'presión = fuerza / área'],[R`P=\Delta p\,Q`,'resultado'])}
${key(R`P=\Delta p\,Q`,'Potencia hidráulica')}
${idea('¿Qué representa?',`<p>Es la <b>potencia hidráulica</b> asociada a esa diferencia de presión: la que efectivamente recibe el fluido. Una bomba real pierde parte de la energía (rozamientos, calor), así que consume más:</p>${M(R`P_{\mathrm{entrada}}=\frac{\Delta p\,Q}{\varepsilon}`)}<p>${simple('Con ε = 0,8, la bomba consume 1/0,8 = 1,25 veces la potencia hidráulica')}</p>`)}
<h3>Unidades</h3>
<div class="twoCol">
<div><b>MKS</b>${chain(R`[P]=\mathrm{Pa}\cdot\mathrm{\frac{m^3}{s}}`,R`[P]=\mathrm{\frac{N}{m^2}}\cdot\mathrm{\frac{m^3}{s}}`,R`[P]=\mathrm{\frac{N\cdot m}{s}}`,R`[P]=\mathrm{\frac{J}{s}}=\mathrm{W}`)}</div>
<div><b>CGS</b>${chain(R`[P]=\mathrm{Ba}\cdot\mathrm{\frac{cm^3}{s}}`,R`[P]=\mathrm{\frac{dina}{cm^2}}\cdot\mathrm{\frac{cm^3}{s}}`,R`[P]=\mathrm{\frac{dina\cdot cm}{s}}`,R`[P]=\mathrm{\frac{erg}{s}}`)}</div>
</div>
<p>${simple('Ba es la baria: 1 Ba = 1 dina/cm². Y 1 W = 10⁷ erg/s')}</p>
`);

  // ---------- 8. Stokes ----------
  add('stokes','Caída de una esfera y velocidad límite','LEY DE STOKES · 08',`
<p>Una esfera que cae dentro de un fluido soporta tres fuerzas: su <b>peso</b> hacia abajo, el <b>empuje</b> hacia arriba y la <b>fuerza viscosa</b>, opuesta al movimiento. ${simple('Pensá en una bolita que cae en un frasco de miel')}</p>
${figure(svgSphere,'Diagrama de cuerpo libre de la esfera mientras baja.')}
${sym([[R`\rho_c`,'densidad del cuerpo (esfera)','kg/m³'],[R`\rho_f`,'densidad del fluido','kg/m³'],[R`V_c`,'volumen de la esfera','m³'],['r','radio de la esfera','m'],[R`\eta`,'viscosidad dinámica del fluido','Pa·s'],['g','aceleración de la gravedad','m/s²'],['v','velocidad de la esfera','m/s']])}
${chain([R`P=\rho_c V_c\,g`,'peso = masa · g, con masa = ρ<sub>c</sub>·V<sub>c</sub>'],[R`E=\rho_f V_c\,g`,'empuje = peso del fluido desalojado'])}
<p><b>Ley de Stokes</b> — válida para flujo de Reynolds muy bajo alrededor de la esfera y sin efectos importantes de las paredes del recipiente:</p>
${key(R`F_{\mathrm{vis}}=6\pi\eta\,r\,v`,'Fuerza viscosa sobre una esfera')}
<h3>Planteo con Newton</h3>
<p>Tomando positivo hacia abajo (el sentido del movimiento):</p>
${M(R`P-E-F_{\mathrm{vis}}=m\,a`)}
<p>P y E son constantes si no cambian las condiciones; en cambio <b>F<sub>vis</sub> aumenta con la velocidad</b>. Al principio la esfera acelera; a medida que gana velocidad, la fuerza viscosa crece, hasta que las fuerzas se equilibran. Desde ahí la aceleración es cero.</p>
<h3>Velocidad límite</h3>
${chain([R`a=0`,'condición de velocidad límite'],[R`P-E-F_{\mathrm{vis}}=0`],[R`\rho_cV_cg-\rho_fV_cg=6\pi\eta r\,v_{\mathrm{lím}}`,'reemplazo cada fuerza'],[R`V_cg(\rho_c-\rho_f)=6\pi\eta r\,v_{\mathrm{lím}}`,'saco factor común V<sub>c</sub>·g'],[R`v_{\mathrm{lím}}=\frac{V_cg(\rho_c-\rho_f)}{6\pi\eta r}`,'despejo'],[R`V_c=\frac{4}{3}\pi r^3`,'volumen de la esfera'],[R`v_{\mathrm{lím}}=\frac{\frac{4}{3}\pi r^3g(\rho_c-\rho_f)}{6\pi\eta r}`,'reemplazo'],[R`v_{\mathrm{lím}}=\frac{4\,r^2g(\rho_c-\rho_f)}{18\,\eta}`,'cancelo π y una r'],[R`v_{\mathrm{lím}}=\frac{2r^2g(\rho_c-\rho_f)}{9\eta}`,'simplifico 4/18 = 2/9'])}
${key(R`v_{\mathrm{lím}}=\frac{2r^2g(\rho_c-\rho_f)}{9\eta}`,'Velocidad límite (Stokes)')}
${idea('Qué significa “velocidad límite”',`<p>No significa que el cuerpo se detiene: significa que <b>sigue moviéndose a velocidad constante</b>, porque la fuerza neta es cero. ${simple('Deja de acelerar, no deja de moverse')}</p>`)}
${warn('Si el cuerpo es menos denso que el fluido',`<p>Si ${m(R`\rho_c<\rho_f`)}, el paréntesis es negativo: el empuje gana y el cuerpo <b>asciende</b>. Hay que reinterpretar el signo: la velocidad límite sale negativa con “positivo hacia abajo”, es decir, el cuerpo sube, y la fuerza viscosa pasa a apuntar hacia abajo. ${simple('Una burbuja o un corcho en agua')}</p>`)}
${deep('Aplicación: viscosímetro de caída de bola',`<p>Si se mide la velocidad límite (cronometrando cuánto tarda la esfera en recorrer una distancia, ya en movimiento uniforme), se puede despejar la viscosidad:</p>${chain(R`\eta=\frac{2r^2g(\rho_c-\rho_f)}{9\,v_{\mathrm{lím}}}`)}<p>Hay que controlar que el Reynolds de la esfera sea muy bajo y que el recipiente sea ancho comparado con la esfera.</p>`)}
${calc('stokes','Velocidad límite de una esfera',field('r','r (mm)',1)+field('rc','ρ<sub>c</sub> (kg/m³)',7800)+field('rf','ρ<sub>f</sub> (kg/m³)',1260)+field('eta','η (Pa·s)',1.4),'Valores iniciales: bolita de acero de 1 mm de radio en glicerina.')}
`);

  // ---------- 9. Repaso ----------
  add('repaso','Tarjetas de repaso','CONCEPTOS · UNIDADES · ERRORES · 09',`
<p>Intentá responder en voz alta antes de dar vuelta cada tarjeta.</p>
<h3>Conceptos</h3>
${cards([
 ['Concepto','¿Qué es el caudal?','El volumen de fluido que atraviesa una sección por unidad de tiempo: Q = ΔV/Δt = A·v.'],
 ['Concepto','¿Qué velocidad es v en Q = A·v?','La velocidad media sobre la sección (el perfil real no es uniforme).'],
 ['Concepto','¿Qué dice la continuidad?','Fluido incompresible, estacionario, sin pérdidas ni entradas: A₁v₁ = A₂v₂. Si la sección baja, la velocidad sube.'],
 ['Concepto','¿Qué es la viscosidad dinámica?','La resistencia del fluido a que sus capas deslicen unas sobre otras. τ = η·dv/dy.'],
 ['Concepto','¿Qué es la condición de no deslizamiento?','El fluido en contacto con una pared quieta tiene velocidad cero.'],
 ['Concepto','¿Qué indica el número de Reynolds?','El régimen probable: compara inercia con viscosidad. Re = ρvd/η, adimensional.'],
 ['Concepto','¿Cuándo vale Hagen–Poiseuille?','Fluido newtoniano incompresible, flujo laminar estacionario desarrollado, tubo recto circular constante, no deslizamiento.'],
 ['Concepto','¿Qué es la velocidad límite?','La velocidad constante que alcanza el cuerpo cuando peso = empuje + fuerza viscosa (a = 0).']
])}
<h3>Unidades</h3>
${cards([
 ['Unidades','Caudal','m³/s (MKS) · cm³/s (CGS). 1 L = 10⁻³ m³ = 1000 cm³.'],
 ['Unidades','Viscosidad dinámica η','Pa·s = N·s/m² = kg/(m·s). CGS: poise. 1 P = 0,1 Pa·s.'],
 ['Unidades','Viscosidad cinemática ν','m²/s. CGS: stokes. 1 St = 1 cm²/s.'],
 ['Unidades','Número de Reynolds','Adimensional: no tiene unidades.'],
 ['Unidades','Potencia hidráulica','Pa·m³/s = W (MKS) · Ba·cm³/s = erg/s (CGS).']
])}
<h3>Errores frecuentes</h3>
${cards([
 ['Error','v₂ = v₁·(d₁/d₂)','Falta el cuadrado: v₂ = v₁·(d₁/d₂)². En el ejemplo de pulgadas da 4,44 cm/s, no 6,67.'],
 ['Error','A = π·d²','O usás A = πr², o A = πd²/4. Con el diámetro sin dividir por 4, el área sale 4 veces más grande.'],
 ['Error','Una velocidad en m/s²','La velocidad va en m/s; m/s² es aceleración.'],
 ['Error','“Velocidad baja siempre es laminar”','Falso: también importan d, ρ y η. Se decide con Re.'],
 ['Error','Duplicar el radio duplica el caudal (Poiseuille)','No: Q ∝ r⁴, se multiplica por 16.'],
 ['Error','Velocidad límite = el cuerpo se frena','No: sigue moviéndose, pero a velocidad constante.'],
 ['Error','Mezclar Darcy y Fanning','f<sub>D</sub> = 4 f<sub>F</sub>. Hay que saber qué factor usa cada tabla o fórmula.'],
 ['Error','Confundir η con ν','η en Pa·s (poise); ν = η/ρ en m²/s (stokes).']
])}
`);


  // Guías aportadas: consignas preservadas y soluciones separadas de la teoría.
  const exercises=[];
  const exercise=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  const continuity=sym([['Q','caudal volumétrico','m³/s'],['A','área de la sección','m²'],['d','diámetro interior','m'],['v','velocidad media','m/s']])+chain(R`Q=Av`,R`A=\frac{\pi d^2}{4}`,R`Q_1=Q_2`,R`\frac{\pi d_1^2}{4}v_1=\frac{\pi d_2^2}{4}v_2`,R`v_2=v_1\left(\frac{d_1}{d_2}\right)^2`);
  exercise('C1','Reducción de diámetro','Por un tubo cilíndrico de 6 cm de diámetro circula agua con velocidad media de 2 m/s. El tubo se estrecha hasta un diámetro de 3 cm. Pregunta: ¿Cuál es la velocidad del agua en la parte angosta?',
    step('1. Planteo',continuity+'<p>Agua incompresible, flujo estacionario y sin pérdidas de caudal.</p>')+step('2. Reemplazo',chain(R`v_2=2\left(\frac{6}{3}\right)^2`,R`v_2=8\ \mathrm{m/s}`)),'8 m/s');
  exercise('C2','Dos secciones consecutivas','Un tubo horizontal transporta agua desde una sección de diámetro 8 cm donde la velocidad es 1,5 m/s, hasta una sección de diámetro 4 cm. Preguntas: 1. ¿Qué velocidad alcanza el agua en la sección angosta? 2. ¿Cuál es el caudal volumétrico en m³/s?',
    step('1. Velocidad',continuity+chain(R`v_2=1{,}5\left(\frac{8}{4}\right)^2=6\ \mathrm{m/s}`))+step('2. Caudal en SI',chain(R`d_1=8\ \mathrm{cm}=0{,}08\ \mathrm{m}`,R`Q=\frac{\pi d_1^2}{4}v_1`,R`Q=\frac{\pi(0{,}08)^2}{4}\cdot1{,}5`,R`Q=0{,}007540\ \mathrm{m^3/s}`)),'6 m/s; 0,007540 m³/s');
  exercise('C3','Derivación en dos ramas','Un caño de 10 cm de diámetro transporta agua con velocidad 1,2 m/s. A cierta distancia se bifurca en dos ramas: - Rama A: diámetro 6 cm. - Rama B: diámetro 4 cm. Pregunta: ¿Cuál es la velocidad en cada rama, suponiendo que ambas transportan agua con el mismo caudal volumétrico?',
    step('1. Reparto del caudal',sym([['Q_0','caudal del caño principal','m³/s'],['Q_A,Q_B','caudales en las ramas','m³/s']])+chain(R`Q_0=Q_A+Q_B`,R`Q_A=Q_B=\frac{Q_0}{2}`,R`Q_0=\frac{\pi(0{,}10)^2}{4}\cdot1{,}2=0{,}009425\ \mathrm{m^3/s}`))+step('2. Velocidad en cada rama',chain(R`v_i=\frac{Q_i}{A_i}`,R`v_A=\frac{1{,}2}{2}\left(\frac{10}{6}\right)^2=1{,}667\ \mathrm{m/s}`,R`v_B=\frac{1{,}2}{2}\left(\frac{10}{4}\right)^2=3{,}75\ \mathrm{m/s}`)+'<p>Igual caudal no implica igual velocidad: la rama más angosta requiere mayor velocidad.</p>'),'Rama A: 1,667 m/s; rama B: 3,75 m/s');
  exercise('C4','Tubería en pendiente','Un tubo de 12 cm de diámetro transporta agua con velocidad 2 m/s. Más adelante se conecta con un tubo de 6 cm de diámetro, inclinado hacia abajo. Preguntas: 1. ¿Qué velocidad lleva el agua en el tramo angosto? 2. ¿Cuánto tiempo tarda en recorrer 15 m de ese tramo?',
    step('1. Continuidad',continuity+chain(R`v_2=2\left(\frac{12}{6}\right)^2=8\ \mathrm{m/s}`)+'<p>La inclinación modifica las condiciones de presión; con el caudal dado, la velocidad media se fija por la sección.</p>')+step('2. Tiempo',sym([['L','longitud recorrida por el tramo','m'],['t','tiempo de recorrido','s']])+chain(R`t=\frac{L}{v_2}`,R`t=\frac{15}{8}=1{,}875\ \mathrm{s}`)+'<p>Se usa la velocidad media constante del tramo, como aproximación de este ejercicio.</p>'),'8 m/s; 1,875 s');
  exercise('C5','Sistema de riego','Un sistema de riego utiliza un tubo principal de 20 cm de diámetro, por donde fluye agua con velocidad 0,8 m/s. El tubo alimenta simultáneamente 4 ramales idénticos de diámetro 5 cm cada uno. Preguntas: 1. ¿Cuál es la velocidad del agua en cada ramal? 2. ¿Cuál es el caudal total del sistema en litros por segundo?',
    step('1. Reparto uniforme','<p>Suponemos ramales con las mismas condiciones hidráulicas: cada uno recibe un cuarto del caudal.</p>'+chain(R`Q_0=4Q_r`,R`A_0v_0=4A_rv_r`,R`v_r=\frac{v_0}{4}\left(\frac{d_0}{d_r}\right)^2`,R`v_r=\frac{0{,}8}{4}\left(\frac{20}{5}\right)^2=3{,}2\ \mathrm{m/s}`))+step('2. Caudal total',chain(R`Q_0=\frac{\pi d_0^2}{4}v_0`,R`Q_0=\frac{\pi(0{,}20)^2}{4}\cdot0{,}8=0{,}025133\ \mathrm{m^3/s}`,R`1\ \mathrm{m^3}=1000\ \mathrm{L}`,R`Q_0=25{,}13\ \mathrm{L/s}`)),'3,2 m/s en cada ramal; 25,13 L/s en total');
  exercise('5.1','Volumen transportado','En una sección circular, de diámetro 1 pulgada, la velocidad media es 5 m/seg. ¿Qué volumen de fluido circula en 10 seg?',
    sym([['V','volumen transportado','m³'],['t','tiempo','s']])+chain(R`d=1\ \mathrm{pulg}=0{,}0254\ \mathrm{m}`,R`Q=Av=\frac{\pi d^2}{4}v`,R`V=Qt`,R`V=\frac{\pi(0{,}0254)^2}{4}\cdot5\cdot10=0{,}02534\ \mathrm{m^3}`),'0,02534 m³ ≈ 25,34 L');
  exercise('5.2','Cambio de sección y volumen','Por un tubo de diámetro de una pulgada, circula una corriente de fluido, con una velocidad media de 10 cm/seg. a)¿Cuál es la velocidad en la otra sección de diámetro de 1,5 pulgadas. b)¿Cuál es el volumen de fluido que circula en media hora?',
    step('a. Continuidad',continuity+chain(R`v_2=10\left(\frac{1}{1{,}5}\right)^2=4{,}44\ \mathrm{cm/s}`))+step('b. Volumen',chain(R`d_1=2{,}54\ \mathrm{cm}`,R`t=30\cdot60=1800\ \mathrm{s}`,R`V=\frac{\pi d_1^2}{4}v_1t`,R`V=\frac{\pi(2{,}54)^2}{4}\cdot10\cdot1800=91207\ \mathrm{cm^3}`)),'4,44 cm/s; aproximadamente 91 200 cm³');
  exercise('5.3','Diámetro reducido a la mitad','En una tubería el caudal es constante. ¿Cuánto varía la velocidad si se reduce su diámetro a la mitad?',continuity+chain(R`d_2=\frac{d_1}{2}`,R`v_2=v_1\left(\frac{d_1}{d_1/2}\right)^2=4v_1`),'La velocidad aumenta 4 veces.');
  exercise('5.4','Fuerza viscosa entre cilindros','El cilindro exterior de la figura es fijo,mientras que el cilindro interior gira a razón de 0,5 vueltas/seg. El radio del cilindro interior es de 10 cm. Se coloca entre ambos cilindros un aceite de viscosidad η = 10 poise.¿Cuál será la fuerza viscosa de Newton? Dato: 2.π.frec.r',
    '<p>Datos de la figura: altura 20 cm; separación entre cilindros 2 mm.</p>'+sym([['f','frecuencia de giro','s⁻¹'],['r','radio del cilindro interior','m'],['h','altura mojada','m'],['e','separación radial','m'],[R`\eta`,'viscosidad dinámica','Pa·s'],['S','superficie lateral','m²']])+step('1. Unidades',chain(R`\eta=10\ \mathrm{P}=1\ \mathrm{Pa\,s}`,R`r=0{,}10\ \mathrm{m},\quad h=0{,}20\ \mathrm{m},\quad e=0{,}002\ \mathrm{m}`))+step('2. Modelo de separación pequeña',chain(R`v=2\pi fr=2\pi\cdot0{,}5\cdot0{,}10=0{,}3142\ \mathrm{m/s}`,R`S=2\pi rh=0{,}12566\ \mathrm{m^2}`,R`F\simeq\eta S\frac{v}{e}`,R`F\simeq1\cdot0{,}12566\cdot\frac{0{,}3142}{0{,}002}=19{,}74\ \mathrm{N}`,R`F\simeq\frac{19{,}74}{9{,}80665}=2{,}01\ \mathrm{kgf}`)+'<p>Aproximamos el gradiente de velocidad por velocidad del cilindro dividida por la separación; se ignoran efectos de los extremos.</p>'),'19,74 N ≈ 2 kgf');
  exercise('5.5','Caudal máximo laminar de aire','Por un tubo circula aire, cuya viscosidad es 1,8·10⁻² cpoise. Se necesita que el aire fluya con un régimen laminar. Si el diámetro del tubo es 1 cm. ¿Cuál es el caudal máximo que se puede lograr? (δaire = 1,2 g/litro)',
    sym([[R`\mathrm{Re}`,'número de Reynolds','adimensional'],[R`\rho`,'densidad','g/cm³'],[R`\eta`,'viscosidad dinámica','P']])+chain(R`\eta=0{,}018\ \mathrm{cP}=1{,}8\cdot10^{-4}\ \mathrm{P}`,R`\rho=1{,}2\ \mathrm{g/L}=0{,}0012\ \mathrm{g/cm^3}`,R`\mathrm{Re}=\frac{\rho vd}{\eta}`,R`v_{\max}=\frac{\mathrm{Re}_{\mathrm{crit}}\eta}{\rho d}`)+'<p>Usamos el umbral de 2100 del apunte; es un criterio orientativo de régimen.</p>'+chain(R`v_{\max}=\frac{2100\cdot1{,}8\cdot10^{-4}}{0{,}0012\cdot1}=315\ \mathrm{cm/s}`,R`Q_{\max}=\frac{\pi d^2}{4}v_{\max}=247{,}4\ \mathrm{cm^3/s}`),'247,4 cm³/s (umbral Re = 2100)');
  exercise('5.6','Régimen, presión y potencia','Un líquido de η = 30 poise circula por un conducto recto de sección circular, de diámetro 1 pulg. con una velocidad media de 7,875 pulg/seg. La densidad del líquido es 76,16 Lb/pie³. a) Indicar si el régimen es laminar o turbulento. b) Si el conducto tiene una longitud de 15 cm, hallar la diferencia de presión en Pa. c) Calcular la potencia mínima de circulación en MKS.',
    step('1. Conversiones',chain(R`\eta=30\ \mathrm{P}=3\ \mathrm{Pa\,s}`,R`d=0{,}0254\ \mathrm{m}`,R`v=7{,}875\cdot0{,}0254=0{,}200025\ \mathrm{m/s}`,R`\rho=76{,}16\cdot16{,}01846=1219{,}97\ \mathrm{kg/m^3}`,R`\ell=0{,}15\ \mathrm{m}`))+step('a. Régimen',chain(R`\mathrm{Re}=\frac{\rho vd}{\eta}`,R`\mathrm{Re}=\frac{1219{,}97\cdot0{,}200025\cdot0{,}0254}{3}=2{,}07`)+'<p>Es laminar.</p>')+step('b. Diferencia de presión',chain(R`\Delta p=\frac{32\eta\ell v}{d^2}`,R`\Delta p=\frac{32\cdot3\cdot0{,}15\cdot0{,}200025}{(0{,}0254)^2}=4464{,}6\ \mathrm{Pa}`))+step('c. Potencia hidráulica',chain(R`Q=\frac{\pi d^2}{4}v=1{,}01354\cdot10^{-4}\ \mathrm{m^3/s}`,R`P=\Delta pQ=0{,}4525\ \mathrm{W}`))+warn('Inconsistencia en la respuesta impresa','<p>La hoja indica Re = 206; 44,6 Pa; 0,0045 W. Esos valores corresponden aproximadamente a <b>0,30 poise</b>, no a los 30 poise escritos. Aquí se resuelve con el dato de la consigna.</p>'),'Con 30 P: Re ≈ 2,07; Δp ≈ 4465 Pa; P ≈ 0,4525 W');
  exercise('5.7','Cambio de viscosidad y velocidad','Resolver el problema 6, si la viscosidad es 1 poise y la velocidad es 15,748 pulg/seg (Los demás datos tomarlos con los mismos valores)',
    step('1. Nuevos datos',chain(R`\eta=1\ \mathrm{P}=0{,}1\ \mathrm{Pa\,s}`,R`v=15{,}748\cdot0{,}0254=0{,}399999\ \mathrm{m/s}`))+step('2. Régimen',chain(R`\mathrm{Re}=\frac{1219{,}97\cdot0{,}399999\cdot0{,}0254}{0{,}1}=123{,}95`)+'<p>Con la viscosidad escrita, el régimen sigue siendo laminar.</p>')+step('3. Presión y potencia',chain(R`\Delta p=\frac{32\eta\ell v}{d^2}`,R`\Delta p=\frac{32\cdot0{,}1\cdot0{,}15\cdot0{,}399999}{(0{,}0254)^2}=297{,}60\ \mathrm{Pa}`,R`Q=\frac{\pi(0{,}0254)^2}{4}\cdot0{,}399999=2{,}02683\cdot10^{-4}\ \mathrm{m^3/s}`,R`P=\Delta pQ=0{,}06032\ \mathrm{W}`))+warn('Inconsistencia en la respuesta impresa','<p>La hoja indica Re = 12345; 17,32 Pa; 3,5·10⁻³ W. El Reynolds impreso requiere una viscosidad unas 100 veces menor (aproximadamente 0,01 P). En ese caso sería turbulento y habría que indicar el factor de fricción o una correlación válida para calcular la presión. No se usa Poiseuille en ese régimen.</p>'),'Con 1 P: laminar; Re ≈ 124; Δp ≈ 297,6 Pa; P ≈ 0,06032 W');
  exercise('5.8','Comparación de caudales laminares','Si el caudal de un líquido de viscosidad que circula por un tubo debido a una diferencia de presión de 2 atm, es de 3,05 pulg³/seg. ¿Qué caudal circulará por otro cuyo radio es 3 veces mayor, si recorre el mismo trayecto, siendo el líquido 4 veces más viscoso y la diferencia de presión es 1 atm? Suponer que el régimen es laminar',
    sym([['r','radio',''],[R`\eta`,'viscosidad dinámica',''],[R`\ell`,'longitud del conducto',''],[R`\Delta p`,'diferencia de presión','']])+chain(R`Q=\frac{\pi r^4\Delta p}{8\eta\ell}`,R`\frac{Q_2}{Q_1}=\left(\frac{r_2}{r_1}\right)^4\frac{\Delta p_2}{\Delta p_1}\frac{\eta_1}{\eta_2}\frac{\ell_1}{\ell_2}`,R`\frac{Q_2}{Q_1}=3^4\cdot\frac12\cdot\frac14\cdot1=10{,}125`,R`Q_2=3{,}05\cdot10{,}125=30{,}88125\ \mathrm{pulg^3/s}`,R`Q_2=30{,}88125\cdot(2{,}54)^3=506{,}05\ \mathrm{cm^3/s}`),'506 cm³/s');
  exercise('5.9','Viscosidad de la glicerina','Una esfera de bronce de 0,24 cm de diámetro, se deja caer en una probeta llena de glicerina. Cuando la velocidad de caída es uniforme, la esfera desciende 35 cm en 16 segundos. a) Calcular la viscosidad de la glicerina. b) Calcular la viscosidad cinemática de la glicerina. Datos: (δglicerina = 1,26 g/cm³; δbronce = 17,08 slug/pie³)',
    step('1. Datos y velocidad límite',chain(R`r=\frac{0{,}24}{2}=0{,}12\ \mathrm{cm}`,R`v=\frac{35}{16}=2{,}1875\ \mathrm{cm/s}`,R`\rho_c=17{,}08\cdot0{,}515379=8{,}8027\ \mathrm{g/cm^3}`))+step('a. Equilibrio y Stokes',sym([[R`\rho_c,\rho_f`,'densidades de la esfera y el fluido','g/cm³'],[R`\eta`,'viscosidad dinámica','P'],['g','gravedad','cm/s²']])+chain(R`P-E-F_{\mathrm{vis}}=0`,R`\frac43\pi r^3g(\rho_c-\rho_f)=6\pi\eta rv`,R`\eta=\frac{2r^2g(\rho_c-\rho_f)}{9v}`,R`\eta=\frac{2(0{,}12)^2\cdot980\cdot(8{,}8027-1{,}26)}{9\cdot2{,}1875}=10{,}81\ \mathrm{P}`))+step('b. Viscosidad cinemática',chain(R`\nu=\frac{\eta}{\rho_f}`,R`\nu=\frac{10{,}81}{1{,}26}=8{,}58\ \mathrm{St}`)+'<p>Con el redondeo de la hoja se obtiene 8,57 St. Se supone que las paredes no alteran apreciablemente la caída.</p>'),'η ≈ 10,8 P; ν ≈ 8,58 St');
  exercise('5.10','Tiempo de caída con otro radio','Una esfera tarda 20 segundos en recorrer con velocidad límite, una distancia entre dos marcas en un líquido de viscosidad η. ¿Cuánto tiempo tardará otra esfera de radio tres veces mayor, si recorre igual distancia en el mismo líquido?',
    '<p>Suponemos esferas del mismo material y que ambas cumplen el régimen de Stokes.</p>'+chain(R`v_{\mathrm{lím}}=\frac{2r^2g(\rho_c-\rho_f)}{9\eta}`,R`\frac{v_2}{v_1}=\left(\frac{r_2}{r_1}\right)^2=3^2=9`,R`t=\frac{L}{v}`,R`\frac{t_2}{t_1}=\frac{v_1}{v_2}=\frac19`,R`t_2=\frac{20}{9}=2{,}22\ \mathrm{s}`),'2,22 s');
  exercise('5.11','Comparación de fuerzas viscosas','La fuerza viscosa para una esfera de 8 cm³ de volumen es de 200 dinas, si cae en un líquido de viscosidad, teniendo velocidad límite = 3 cm/seg. ¿Cuál será la velocidad de otra esfera que cae en el mismo líquido, si su volumen es 1 cm³ y la fuerza viscosa de 600 dinas.',
    step('1. Relación de radios',chain(R`V=\frac43\pi r^3`,R`\frac{r_1}{r_2}=\sqrt[3]{\frac{V_1}{V_2}}=\sqrt[3]{8}=2`))+step('2. Comparación por Stokes',chain(R`F=6\pi\eta rv`,R`\frac{F_2}{F_1}=\frac{r_2v_2}{r_1v_1}`,R`v_2=v_1\frac{F_2}{F_1}\frac{r_1}{r_2}`,R`v_2=3\cdot\frac{600}{200}\cdot2=18\ \mathrm{cm/s}`)+'<p>Se usan las fuerzas dadas. Si las dos esferas fueran del mismo material, estos datos de fuerza a velocidad límite no serían compatibles: no se supone igual densidad.</p>'),'18 cm/s');
  add('ejercicios-caudal','Conservación de caudal · ejercicios','PRÁCTICA · 10','<div data-hidro-caudal></div>');
  add('guia','Unidad 5 · guía de Hidrodinámica','GUÍA ORIGINAL · 11','<div data-hidro-guide></div>');

  window.ET27_HIDRO={
    title:'Hidrodinámica y viscosidad',
    lead:'Del caudal a la velocidad límite: cómo circulan los fluidos, por qué frenan y cuánta presión y potencia hacen falta para moverlos.',
    sections, exercises
  };
})();

