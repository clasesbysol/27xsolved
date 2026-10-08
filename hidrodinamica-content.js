// 27xSOLved · Física Aplicada · Tema 2: Circulación de fluidos (hidrodinámica y viscosidad).
// Basado en la «Actividad n.º 8 — Circulación de fluidos»: apunte manuscrito + guía de once ejercicios (5.1–5.11),
// más los ejercicios de práctica de conservación del caudal (C1–C5). Resultados recalculados; erratas explicitadas.
(function(){
  'use strict';
  const K=window.ET27Kit;if(!K)return;
  const {M,m,chain,key,sym,simple,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field}=K;
  const R=String.raw;

  // ---------- Esquemas ----------
  // ---------- Esquemas ----------
  const svgTube=`<svg viewBox="0 0 640 230" role="img" aria-label="Tubo con una sección de área S; el fluido avanza una distancia Δx a velocidad v durante Δt">
    <defs><marker id="hdArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="40" y="60" width="560" height="100" rx="10" class="svgSoft"/>
    <line x1="40" y1="60" x2="600" y2="60" class="svgLine"/><line x1="40" y1="160" x2="600" y2="160" class="svgLine"/>
    <rect x="200" y="62" width="190" height="96" class="svgVolume"/>
    <ellipse cx="200" cy="110" rx="18" ry="50" class="svgSection"/><ellipse cx="390" cy="110" rx="18" ry="50" class="svgSectionDash"/>
    <text x="200" y="40" text-anchor="middle" class="svgText">sección S</text>
    <text x="295" y="115" text-anchor="middle" class="svgText strong">V = S·Δx</text>
    <line x1="210" y1="190" x2="382" y2="190" class="svgArrow" marker-end="url(#hdArr)"/><text x="295" y="215" text-anchor="middle" class="svgText">Δx (recorre en t)</text>
    <line x1="460" y1="110" x2="560" y2="110" class="svgArrow" marker-end="url(#hdArr)"/><text x="510" y="98" text-anchor="middle" class="svgText strong">v</text>
    <text x="70" y="115" class="svgText">fluido →</text>
  </svg>`;

  const svgNarrow=`<svg viewBox="0 0 640 200" role="img" aria-label="Conducto que se angosta: en la parte ancha la velocidad es menor y en la angosta es mayor">
    <defs><marker id="hdArr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <path d="M30 40 H250 L370 75 H610 V125 H370 L250 160 H30 Z" class="svgSoft svgLineFill"/>
    <line x1="80" y1="100" x2="150" y2="100" class="svgArrow" marker-end="url(#hdArr2)"/>
    <line x1="430" y1="100" x2="580" y2="100" class="svgArrow thick" marker-end="url(#hdArr2)"/>
    <text x="115" y="88" text-anchor="middle" class="svgText strong">v₁ (lenta)</text><text x="505" y="90" text-anchor="middle" class="svgText strong">v₂ (rápida)</text>
    <text x="140" y="185" text-anchor="middle" class="svgText">S₁ grande</text><text x="490" y="150" text-anchor="middle" class="svgText">S₂ chica</text>
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


  const svgPressure=`<svg viewBox="0 0 640 210" role="img" aria-label="Tubo recto de radio r y longitud l; presión p1 a la entrada mayor que p2 a la salida; el caudal va de 1 a 2">
    <defs><marker id="hdArr6" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="110" y="60" width="420" height="80" rx="6" class="svgSoft svgLineFill"/>
    <text x="60" y="105" text-anchor="middle" class="svgText strong">p₁</text><text x="580" y="105" text-anchor="middle" class="svgText strong">p₂</text>
    <line x1="80" y1="100" x2="108" y2="100" class="svgArrow thick" marker-end="url(#hdArr6)"/>
    <line x1="250" y1="100" x2="390" y2="100" class="svgArrow" marker-end="url(#hdArr6)"/><text x="320" y="90" text-anchor="middle" class="svgText strong">Q</text>
    <line x1="500" y1="60" x2="500" y2="100" class="svgLine"/><text x="510" y="85" class="svgText">r</text>
    <line x1="110" y1="170" x2="530" y2="170" class="svgLine"/><line x1="110" y1="160" x2="110" y2="180" class="svgLine"/><line x1="530" y1="160" x2="530" y2="180" class="svgLine"/>
    <text x="320" y="196" text-anchor="middle" class="svgText">l (longitud del tramo)</text>
    <text x="320" y="40" text-anchor="middle" class="svgText strong">p₁ &gt; p₂ · Δp = p₁ − p₂</text>
  </svg>`;

  const svgProfiles=`<svg viewBox="0 0 640 200" role="img" aria-label="Tres perfiles: uniforme idealizado, laminar parabólico y turbulento con remolinos">
    <defs><marker id="hdArr7" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    ${[20,230,440].map(x=>`<line x1="${x}" y1="30" x2="${x+180}" y2="30" class="svgLine thickLine"/><line x1="${x}" y1="160" x2="${x+180}" y2="160" class="svgLine thickLine"/><line x1="${x+20}" y1="30" x2="${x+20}" y2="160" class="svgLayer"/>`).join('')}
    ${[45,65,85,105,125,145].map(y=>`<line x1="40" y1="${y}" x2="150" y2="${y}" class="svgArrow" marker-end="url(#hdArr7)"/>`).join('')}
    ${[40,58,76,95,114,132,150].map(y=>{const t=(y-95)/65,l=Math.max(4,130*(1-t*t));return `<line x1="250" y1="${y}" x2="${250+l}" y2="${y}" class="svgArrow" marker-end="url(#hdArr7)"/>`}).join('')}
    <path d="M460 60 C 490 40 510 80 540 60 S 590 40 610 70" class="svgCurve"/><path d="M460 95 C 480 120 520 70 550 100 S 590 125 615 95" class="svgCurve"/><path d="M460 130 C 495 110 515 150 545 128 S 595 110 612 140" class="svgCurve"/>
    <circle cx="520" cy="80" r="11" class="svgCurve"/><circle cx="575" cy="118" r="9" class="svgCurve"/>
    <text x="110" y="190" text-anchor="middle" class="svgText strong">uniforme (ideal)</text><text x="320" y="190" text-anchor="middle" class="svgText strong">laminar (parábola)</text><text x="530" y="190" text-anchor="middle" class="svgText strong">turbulento</text>
  </svg>`;

  const svgViscometer=`<svg viewBox="0 0 640 250" role="img" aria-label="Viscosímetro de dos cilindros: vista superior con la película de aceite y superficie lateral desplegada como rectángulo de base 2πr y altura h">
    <defs><marker id="hdArr8" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <circle cx="150" cy="120" r="95" class="svgLiquid svgLineFill"/>
    <circle cx="150" cy="120" r="78" class="svgSoft svgLineFill"/>
    <line x1="150" y1="120" x2="228" y2="120" class="svgLine"/><text x="180" y="112" class="svgText strong">r</text>
    <path d="M150 34 A 86 86 0 0 1 232 92" class="svgArrow" marker-end="url(#hdArr8)"/>
    <text x="150" y="235" text-anchor="middle" class="svgText">vista superior: interior gira, exterior fijo</text>
    <text x="246" y="62" class="svgText">aceite, e = Δx</text>
    <rect x="360" y="60" width="240" height="110" class="svgVolume svgLineFill"/>
    <text x="480" y="120" text-anchor="middle" class="svgText strong">A = 2πr·h</text>
    <line x1="360" y1="190" x2="600" y2="190" class="svgLine"/><text x="480" y="210" text-anchor="middle" class="svgText">base = 2πr (una vuelta)</text>
    <line x1="620" y1="60" x2="620" y2="170" class="svgLine"/><text x="608" y="45" class="svgText">h</text>
    <text x="480" y="235" text-anchor="middle" class="svgText">superficie lateral “desenrollada”</text>
  </svg>`;

  const svgThreeSpheres=`<svg viewBox="0 0 640 230" role="img" aria-label="Tres momentos de la esfera: al soltarla solo peso y empuje; mientras acelera aparece R; a velocidad límite P = E + R">
    <defs><marker id="hdArr9" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    ${[[110,'1 · al soltarla',0,'R = 0'],[320,'2 · acelerando',22,'R crece'],[530,'3 · velocidad límite',44,'P = E + R']].map(([x,t,rl,lab])=>`
      <circle cx="${x}" cy="110" r="26" class="svgBall"/>
      <line x1="${x}" y1="138" x2="${x}" y2="200" class="svgArrow thick" marker-end="url(#hdArr9)"/><text x="${x+8}" y="196" class="svgText strong">P</text>
      <line x1="${x-12}" y1="84" x2="${x-12}" y2="44" class="svgArrow" marker-end="url(#hdArr9)"/><text x="${x-40}" y="52" class="svgText strong">E</text>
      ${rl?`<line x1="${x+12}" y1="84" x2="${x+12}" y2="${84-rl}" class="svgArrow" marker-end="url(#hdArr9)"/><text x="${x+20}" y="${80-rl/2}" class="svgText strong">R</text>`:''}
      <text x="${x}" y="20" text-anchor="middle" class="svgText strong">${t}</text><text x="${x}" y="224" text-anchor="middle" class="svgText">${lab}</text>`).join('')}
  </svg>`;

  const svgVt=`<svg viewBox="0 0 640 230" role="img" aria-label="Gráfico cualitativo de rapidez en función del tiempo: crece desde cero con pendiente decreciente y se acerca a la velocidad límite">
    <defs><marker id="hdArr10" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="70" y1="190" x2="600" y2="190" class="svgLine" marker-end="url(#hdArr10)"/><line x1="70" y1="190" x2="70" y2="20" class="svgLine" marker-end="url(#hdArr10)"/>
    <line x1="70" y1="60" x2="590" y2="60" class="svgLayer"/><text x="480" y="50" class="svgText strong">v límite</text>
    <path d="M70 190 C 130 90 220 66 590 61" class="svgArrow thick"/>
    <text x="585" y="212" class="svgText">t</text><text x="30" y="30" class="svgText">v</text>
    <text x="110" y="120" class="svgText">pendiente grande</text><text x="330" y="88" class="svgText">pendiente → 0</text>
  </svg>`;

  const sections=[];
  const add=(key,label,kicker,html)=>sections.push({key:`hidro-${key}`,label,kicker,html});
  const goTo=(n,label)=>`<p class="guideLink">📝 En la guía: <b>Ejercicio ${n}</b> — ${label} (sección “Guía resuelta”).</p>`;

  // ---------- 1. Introducción ----------
  add('intro','Qué estudiamos y cómo resolver','CIRCULACIÓN DE FLUIDOS · 01',`
<p>Un <b>fluido</b> puede ser un líquido o un gas. En esta unidad nos interesa <b>cómo se mueve</b>: cuánto pasa por un conducto, qué velocidad tiene, qué resistencia encuentra y qué presión o potencia hace falta para mantener la circulación. También qué ocurre cuando un objeto cae dentro de un líquido. ${simple('Agua por una manguera, aire por un tubo, una bolita cayendo en un frasco de glicerina')}</p>
<div class="twoCol">
 <div class="kitBox kitIdea"><b>Situación 1 · Fluido que circula por un tubo</b><p>Buscamos caudal, velocidad, régimen, diferencia de presión o potencia.</p></div>
 <div class="kitBox kitNote"><b>Situación 2 · Esfera que se mueve en un fluido</b><p>Buscamos rozamiento viscoso, velocidad límite o viscosidad del líquido.</p></div>
</div>
<p>Las dos situaciones <b>no se resuelven con la misma fórmula</b>. Lo primero es reconocer cuál es.</p>
${idea('Orden para resolver cualquier ejercicio',`<ol class="kitList"><li><b>¿Qué me piden?</b></li><li><b>¿Qué fenómeno ocurre?</b> ${simple('caudal, continuidad, viscosidad entre capas, régimen, presión, potencia, esfera')}</li><li><b>¿Qué datos tengo?</b></li><li><b>¿Qué unidades necesito?</b> Todo en un mismo sistema (SI o CGS).</li><li><b>¿Qué ley corresponde y por qué?</b></li><li><b>Despeje</b> con letras, antes de poner números.</li><li><b>Reemplazo</b> y resultado con unidad.</li><li><b>Control físico:</b> ¿tienen sentido el signo, el tamaño y la unidad?</li></ol>`)}
<h3>Diccionario de símbolos</h3>
${sym([['Q','caudal volumétrico','m³/s'],['V','volumen de fluido o de la esfera, según el contexto','m³'],['t','tiempo','s'],['S','área de la sección transversal del conducto','m²'],['A','área de contacto entre láminas de fluido','m²'],[R`d\ \text{o}\ \varphi`,'diámetro del conducto o de la esfera','m'],['r','radio (mitad del diámetro)','m'],['v','velocidad media del flujo o velocidad de la esfera','m/s'],[R`\Delta x`,'separación transversal entre láminas (ley de Newton)','m'],[R`\eta`,'viscosidad dinámica (eta)','Pa·s'],[R`\rho\ \text{o}\ \delta`,'densidad','kg/m³'],[R`\nu`,'viscosidad cinemática (nu)','m²/s'],[R`\mathrm{Re}`,'número de Reynolds','sin unidad'],['l','longitud del conducto','m'],['h','altura del cilindro del viscosímetro','m'],[R`\Delta p`,'diferencia de presión entre extremos','Pa'],['f','factor de Fanning (en el giro, la misma letra es frecuencia)','sin unidad · s⁻¹'],[R`f_R\ \text{o}\ R`,'fuerza viscosa','N'],['P','peso de la esfera','N'],['E','empuje del fluido sobre la esfera','N'],[R`\mathrm{Pot}`,'potencia de circulación','W'],['g','aceleración de la gravedad','m/s²']])}
${note('Notación',`<p>Se usa ρ para la densidad y d para el diámetro; equivalen a <b>δ</b> y <b>φ</b> del manuscrito. La <b>v</b> latina (velocidad) y la <b>ν</b> griega (viscosidad cinemática) son magnitudes distintas. Para no confundir el peso P con la potencia, la potencia se escribe <b>Pot</b>.</p>`)}
`);

  // ---------- 2. Caudal ----------
  add('caudal','Caudal y velocidad','CAUDAL · 02',`
<p>El <b>caudal</b> indica <b>cuánto volumen atraviesa una sección por unidad de tiempo</b>. ${simple('Recogés en un balde el agua que sale de una manguera: el volumen juntado dividido por el tiempo es el caudal')}</p>
${key(R`Q=\frac{V}{t}`,'Definición')}
<p>Si la circulación es constante, también podemos despejar:</p>
${chain([R`Q\,t=V`,'paso t multiplicando'],[R`V=Q\,t`,'volumen que pasa en un tiempo'],[R`t=\frac{V}{Q}`,'tiempo para llenar o vaciar'])}
${warn('Velocidad y caudal no son lo mismo',`<p>La <b>velocidad</b> mide distancia recorrida por tiempo (m/s); el <b>caudal</b> mide volumen transportado por tiempo (m³/s). Para pasar de una a otra hace falta el <b>área</b> por la que pasa el fluido.</p>`)}
<h3>De la definición a Q = S·v (lectura del dibujo)</h3>
<p>Dos secciones delimitan un tramo de fluido. En un tiempo t ese tramo avanza una distancia Δx. El volumen barrido es un cilindro: <b>área de la base por longitud</b>. ${simple('Acá Δx es una distancia a lo largo del tubo; no es la separación entre capas que aparece en viscosidad')}</p>
${figure(svgTube,'El tramo sombreado es el volumen que cruza la sección S en el tiempo t.')}
${chain([R`V=S\,\Delta x`,'volumen del cilindro'],[R`Q=\frac{V}{t}`,'definición'],[R`Q=\frac{S\,\Delta x}{t}`,'reemplazo V'],[R`Q=S\,\frac{\Delta x}{t}`,'S no cambia'],[R`v=\frac{\Delta x}{t}`,'Δx/t es la velocidad'],[R`Q=S\,v`,'resultado'])}
${key(R`Q=S\,v`,'Caudal en un conducto')}
${idea('¿Qué velocidad es v?',`<p>Si el perfil de velocidades no es uniforme, la ecuación sigue valiendo usando la <b>velocidad media de la sección</b>, que se define como caudal sobre área:</p>${M(R`v_{\mathrm{media}}=\frac{Q}{S}`)}`)}
<h3>Control de unidades</h3>
${chain([R`\mathrm{m^2}\cdot\frac{\mathrm{m}}{\mathrm{s}}=\frac{\mathrm{m^3}}{\mathrm{s}}`,'SI'],[R`\mathrm{cm^2}\cdot\frac{\mathrm{cm}}{\mathrm{s}}=\frac{\mathrm{cm^3}}{\mathrm{s}}`,'CGS'],[R`1\ \mathrm{L}=1000\ \mathrm{cm^3}=10^{-3}\ \mathrm{m^3}`])}
<h3>Área circular y el origen del 4</h3>
<p>La <b>sección</b> es el círculo que verías al cortar el tubo perpendicularmente al flujo. No es la superficie lateral del tubo.</p>
${chain([R`S=\pi r^2`,'área del círculo'],[R`d=2r`],[R`r=\frac{d}{2}`],[R`S=\pi\left(\frac{d}{2}\right)^2`,'reemplazo'],[R`S=\frac{\pi d^2}{4}`,'el 2 al cuadrado da 4'],[R`Q=\frac{\pi d^2}{4}\,v`,'caudal con diámetro'],[R`t=\frac{4\,V}{v\,\pi d^2}`,'tiempo de llenado'])}
${warn('Error típico',`<p>El 4 aparece porque <b>todo el cociente d/2 se eleva al cuadrado</b>. Si te dan el diámetro y usás πr² poniendo d en lugar de r, el área queda <b>cuatro veces más grande</b>.</p>`)}
${goTo('5.1','volumen que circula en 10 s')}
${example('Agua que ingresa por un tubo',
 `<p><b>Consigna:</b> por un tubo de sección 50 cm² ingresa agua a 2,5 m/s. Calcular el caudal y el volumen que ingresa en 45 minutos.</p>`,
 step('1. Datos en SI',chain(R`S=50\ \mathrm{cm^2}=\frac{50}{10\,000}\ \mathrm{m^2}=0{,}005\ \mathrm{m^2}`,R`v=2{,}5\ \mathrm{m/s}`,R`t=45\cdot60=2700\ \mathrm{s}`))+
 step('2. Caudal',chain(R`Q=S\,v`,R`Q=0{,}005\cdot2{,}5`,R`Q=0{,}0125\ \mathrm{m^3/s}`))+
 step('3. Volumen',chain(R`V=Q\,t`,R`V=0{,}0125\cdot2700`,R`V=33{,}75\ \mathrm{m^3}`,[R`V=33\,750\ \mathrm{L}`,'1 m³ = 1000 L']))+
 fix('Corrección respecto del apunte',`<p>El caudal se obtiene <b>multiplicando</b> área por velocidad, y sus unidades son volumen por tiempo (m³/s).</p>`),
 `Q = 0,0125 m³/s · V = 33,75 m³ = 33 750 L`)}
${example('Llenado de una pileta',
 `<p><b>Consigna:</b> una pileta de 300 L se llena con una manguera de diámetro 1,5 cm, de la que sale agua a 50 cm/s. Calcular el tiempo.</p>`,
 step('1. Área de la boca (CGS)',chain(R`S=\frac{\pi d^2}{4}=\frac{\pi(1{,}5)^2}{4}`,R`S\approx1{,}767\ \mathrm{cm^2}`))+
 step('2. Caudal',chain(R`Q=S\,v\approx1{,}767\cdot50`,R`Q\approx88{,}36\ \mathrm{cm^3/s}`))+
 step('3. Tiempo',chain([R`V=300\ \mathrm{L}=300\,000\ \mathrm{cm^3}`],R`t=\frac{V}{Q}\approx\frac{300\,000}{88{,}36}`,R`t\approx3395\ \mathrm{s}`,[R`t\approx56{,}6\ \mathrm{min}\approx0{,}943\ \mathrm{h}`,'÷ 60 y ÷ 3600']))+
 fix('Sobre los resultados del apunte',`<p>Un valor cercano a 3404 s viene del redondeo. El valor que parece <b>9,44 h</b> es incorrecto: son <b>≈ 0,94 h</b> (menos de una hora).</p>`),
 `t ≈ 3395 s ≈ 56,6 min ≈ 0,94 h`)}
`);

  // ---------- 3. Continuidad ----------
  add('continuidad','Conservación del caudal (continuidad)','CONTINUIDAD · 03',`
<p>Si el conducto está cerrado, <b>no hay fugas ni ramificaciones</b>, el flujo es <b>estacionario</b> y la <b>densidad no cambia</b>, el volumen que entra por segundo tiene que salir por segundo. ${simple('El fluido no se acumula indefinidamente dentro del tubo')}</p>
${sym([[R`Q_1,\ Q_2`,'caudal en la sección 1 y en la 2','m³/s'],[R`S_1,\ S_2`,'áreas de cada sección','m²'],[R`v_1,\ v_2`,'velocidades medias','m/s'],[R`d_1,\ d_2`,'diámetros','m']])}
${chain([R`Q_1=Q_2`,'conservación'],[R`S_1v_1=S_2v_2`,'porque Q = S·v'])}
<p>La ecuación <b>no</b> dice que las velocidades sean iguales: dice que el producto <b>área × velocidad</b> es el mismo.</p>
${figure(svgNarrow,'Mismo caudal: donde el caño es más angosto, el fluido va más rápido.')}
<h3>Secciones circulares: manda el cuadrado del diámetro</h3>
${chain([R`\frac{\pi d_1^2}{4}v_1=\frac{\pi d_2^2}{4}v_2`,'S = πd²/4'],[R`d_1^2v_1=d_2^2v_2`,'se cancela π/4'],[R`v_2=\frac{d_1^2}{d_2^2}\,v_1`,'despejo v₂'],[R`v_2=\left(\frac{d_1}{d_2}\right)^2v_1`,'forma práctica'])}
${idea('Cómo leer el dibujo',`<p>En el conducto que <b>se ensancha</b>, la salida tiene mayor sección y <b>menor velocidad</b>. En el que <b>se estrecha</b>, la salida tiene menor sección y <b>mayor velocidad</b>. Mirá el diámetro y después <b>elevá su cambio al cuadrado</b>. ${simple('Apretar la punta de la manguera hace que el agua salga más rápido')}</p>`)}
${table(['Cambio del diámetro','Cambio del área','Cambio de la velocidad'],[['se reduce a la mitad (d/2)','÷ 4','× 4'],['se reduce a un tercio (d/3)','÷ 9','× 9'],['se reduce a un cuarto (d/4)','÷ 16','× 16'],['se duplica (2d)','× 4','÷ 4']])}
${calc('continuity','Velocidad al cambiar el diámetro',field('d1','d₁',6)+field('d2','d₂',3)+field('v1','v₁',2),'d₁ y d₂ en la misma unidad; v₂ sale en la unidad de v₁.')}
${example('Del manuscrito: diámetro reducido a la cuarta parte',
 `<p><b>Consigna:</b> «En una tubería, el caudal es constante. ¿Cuánto varía la velocidad, si el diámetro se reduce a la 1/4 parte?»</p><p><b>Lectura del dibujo:</b> conducto convergente. A la izquierda d₁, v₁ y Q₁; a la derecha d₂ = d₁/4, v₂ y Q₂. Las flechas del caudal apuntan en el sentido del flujo.</p>`,
 `<p>«Caudal constante» → <b>continuidad</b>. Ojo: se reduce el <b>diámetro</b>, no el área.</p>`+
 chain(R`d_2=\frac{d_1}{4}`,[R`d_2^2=\left(\frac{d_1}{4}\right)^2=\frac{d_1^2}{16}`,'elevo al cuadrado'],[R`d_1^2v_1=\frac{d_1^2}{16}\,v_2`,'reemplazo en d₁²v₁ = d₂²v₂'],[R`v_1=\frac{v_2}{16}`,'cancelo d₁²'],R`v_2=16\,v_1`)+
 `<p>El área quedó reducida a 1/16; para conservar el caudal, la velocidad se multiplica por 16.</p>`,
 `v₂ = 16·v₁`)}
${goTo('5.2','cambio de diámetro y volumen en media hora')}${goTo('5.3','diámetro reducido a la mitad')}
${deep('Cuándo no alcanza esta versión',`<p>En <b>gases</b> con cambios importantes de densidad se conserva el caudal de <b>masa</b>, no necesariamente el de volumen. La forma estacionaria general es:</p>${chain([R`\dot m=\rho\,S\,v`,'masa por segundo (kg/s)'],[R`\rho_1S_1v_1=\rho_2S_2v_2`])}<p>Si las densidades son iguales se cancelan y vuelve la fórmula del apunte.</p><p>En una <b>bifurcación</b> sin acumulación, los caudales de salida se suman:</p>${M(R`Q_{\mathrm{entrada}}=Q_A+Q_B`)}<p>Eso no obliga a que las ramas tengan la misma velocidad. Sin otra condición de reparto (por ejemplo, “ambas llevan el mismo caudal”), continuidad sola <b>no determina</b> las dos velocidades. ${simple('Ver práctica C3 y C5')}</p>`)}
`);

  // ---------- 4. Perfiles ----------
  add('perfiles','Velocidad media y perfiles','PERFILES DE VELOCIDAD · 04',`
<p>Las flechas de un perfil muestran <b>qué tan rápido</b> se mueve el fluido en cada punto de la sección. Una flecha más larga significa mayor velocidad local; no significa que el fluido “pase más tiempo” ahí.</p>
${figure(svgProfiles,'Perfil uniforme idealizado, perfil laminar desarrollado y mezcla turbulenta.')}
<ul class="kitList"><li><b>Uniforme:</b> todas las flechas iguales. Es una <b>idealización</b> que dibuja el apunte para el fluido ideal, no una definición universal.</li><li><b>Laminar desarrollado</b> (líquido newtoniano en tubo circular): <b>parábola</b>. Velocidad cero en la pared quieta y máxima en el eje.</li><li><b>Turbulento:</b> trazos ondulados y remolinos; el colorante se mezcla transversalmente.</li></ul>
${figure(svgProfile,'Perfil parabólico del flujo laminar desarrollado.')}
${warn('Velocidad media ≠ velocidad del centro',`<p>La velocidad media resume el transporte total (Q/S). <b>No</b> se reemplaza por la velocidad máxima del centro.</p>`)}
${deep('Aclaración complementaria: el factor 2 del perfil parabólico',`<p>Sólo para el perfil parabólico del flujo laminar desarrollado:</p>${M(R`v_{\max}=2\,v_{\mathrm{media}}`)}<p>No es un dato exigido por la guía, y en otros perfiles <b>no</b> se puede asumir ese factor 2.</p>`)}
`);

  // ---------- 5. Reynolds experiencia ----------
  add('regimenes','Experiencia de Reynolds y regímenes','LAMINAR Y TURBULENTO · 05',`
<h3>Qué se hace en la experiencia</h3>
<p>Se usa un conducto transparente y se regula la circulación. Un tanque exterior suministra <b>colorante</b> a unos picos ubicados en distintos niveles de una sección, para ver cómo se transporta el fluido.</p>
<ul class="kitList"><li><b>A baja velocidad:</b> aparecen filetes de color bien definidos. En el centro avanzan más rápido y, después del mismo intervalo, llegan más lejos.</li><li><b>Al aumentar suficientemente la velocidad:</b> los filetes se deforman y se mezclan; se ven remolinos y el color se distribuye por todo el conducto.</li></ul>
${figure(svgReynolds,'Experiencia del colorante.')}
<div class="twoCol">
 <div class="kitBox kitIdea"><b>Régimen laminar</b><p>Movimiento <b>ordenado en capas</b>, principalmente en la dirección del eje, con poca mezcla transversal. <b>Hay</b> rozamiento viscoso y se disipa energía: laminar no significa “sin rozamiento”.</p></div>
 <div class="kitBox kitWarn"><b>Régimen turbulento</b><p><b>Fluctuaciones de velocidad y remolinos</b> que favorecen la mezcla. Para el mismo caudal en el mismo conducto suele exigir <b>mayor pérdida de presión</b>. La energía mecánica se transforma principalmente en energía interna.</p></div>
</div>
${fix('Cómo entender “las partículas no se chocan”',`<p>El apunte lo dice del régimen laminar. Significa que <b>no hay el entremezclado desordenado de grandes porciones de fluido</b> propio de la turbulencia. No significa que desaparezcan las interacciones entre moléculas.</p>`)}
${warn('No hay una velocidad “mágica”',`<p>No existe una velocidad única que separe todos los flujos laminares de los turbulentos: también importan <b>diámetro, densidad y viscosidad</b>. Por eso se usa el <b>número de Reynolds</b>.</p>`)}
<h3>Pared quieta y capa próxima a la pared</h3>
<p>Con la condición de <b>no deslizamiento</b>, el fluido en contacto con la pared tiene la velocidad de la pared. Si la pared está quieta, ahí la velocidad del fluido es cero; al alejarse puede crecer.</p>
${M(R`v_{\mathrm{fluido\ en\ la\ pared}}=v_{\mathrm{pared}}`)}
${note('Sobre la “capa límite” del manuscrito',`<p>El manuscrito llama «capa límite» al espesor <b>e</b> próximo a la pared donde representa movimiento laminar. En un flujo turbulento conviene distinguir esa región cercana a la pared, donde la viscosidad es importante, del resto del conducto. La condición de no deslizamiento se aplica <b>en la superficie</b>: no exige que todas las partículas de una franja tengan exactamente la misma velocidad.</p>`)}
${deep('Ventilación y circulación sanguínea',`<p>El apunte usa estos ejemplos. El mensaje a conservar: la <b>turbulencia puede aumentar las pérdidas de presión y producir ruido</b>. En una instalación real de ventilación no siempre es posible o conveniente imponer flujo laminar en todos los tramos. La sangre suele circular de manera ordenada en muchos vasos, pero es un fluido complejo y el régimen puede cambiar según el vaso y las condiciones. No son reglas universales.</p>`)}
`);

  // ---------- 6. Viscosidad dinámica ----------
  add('viscosidad','Viscosidad dinámica y ley de Newton','VISCOSIDAD DINÁMICA · 06',`
<p>La <b>viscosidad dinámica η</b> mide la resistencia a que capas vecinas se deslicen a velocidades diferentes. ${simple('Es el “rozamiento interno”: un aceite espeso resiste más que uno liviano')} “Fluidez” se usa de manera cualitativa: más viscosidad suele significar menos facilidad para fluir.</p>
${warn('Viscosidad ≠ densidad',`<p>La <b>densidad</b> mide masa por volumen (${m(R`\rho=m/V`)}); la <b>viscosidad</b> mide resistencia al deslizamiento entre capas. Un líquido puede ser denso y poco viscoso, o al revés.</p>`)}
<h3>Leer las láminas del dibujo</h3>
${figure(svgLayers,'Dos láminas comparten un área de contacto A; una va más rápido que la otra; Δx es la separación transversal.')}
<p>Una capa se mueve a velocidad v y la vecina más rápido. La diferencia es Δv. La distancia que las separa, medida <b>transversalmente</b> al movimiento, es Δx. Ambas comparten un área de contacto A.</p>
${chain([R`\Delta v=v_{\mathrm{rápida}}-v_{\mathrm{lenta}}`],[R`\text{gradiente}\approx\frac{\Delta v}{\Delta x}`,'cuánto cambia v por cada unidad de distancia entre capas'])}
<p>Si la misma Δv ocurre en una separación más chica, el cambio es más brusco y la fuerza viscosa es mayor.</p>
${sym([[R`f_R`,'módulo de la fuerza viscosa','N · dyn'],[R`\eta`,'viscosidad dinámica','Pa·s · P'],['A','área de contacto entre capas','m² · cm²'],[R`\Delta v`,'diferencia de velocidades','m/s'],[R`\Delta x`,'separación entre capas','m']])}
${key(R`f_R=\eta\,A\,\frac{\Delta v}{\Delta x}`,'Ley de Newton de la viscosidad (fluido newtoniano)')}
<p>La versión con diferencias supone un gradiente aproximadamente uniforme; la versión local usa una derivada: ${m(R`\tau=\eta\,\frac{dv}{dy}`)}, con τ = f<sub>R</sub>/A la tensión de corte. La fuerza viscosa siempre se <b>opone al deslizamiento relativo</b>.</p>
${warn('A no es S',`<p>En un tubo, <b>S</b> es la sección transversal por la que pasa el caudal. En el viscosímetro, <b>A</b> es el área lateral de contacto con el aceite. Elegir el área equivocada cambia todo el resultado.</p>`)}
<h3>Despejar la viscosidad</h3>
${chain([R`f_R=\eta A\frac{\Delta v}{\Delta x}`],[R`f_R\,\Delta x=\eta\,A\,\Delta v`,'paso Δx multiplicando'],[R`\eta=\frac{f_R\,\Delta x}{A\,\Delta v}`,'despejo'])}
${note('La definición con valores unitarios',`<p>El apunte define η con área y gradiente unitarios: al fijar valores unitarios en un sistema coherente, el <b>valor numérico</b> de η coincide con el de la fuerza. Viscosidad y fuerza siguen siendo magnitudes distintas, con unidades distintas.</p>`)}
<h3>Unidades</h3>
${chain([R`[\eta]=\frac{\mathrm{N\cdot s}}{\mathrm{m^2}}=\mathrm{Pa\cdot s}`,'SI'],[R`[\eta]=\frac{\mathrm{kg}}{\mathrm{m\cdot s}}`,'N = kg·m/s²'],[R`1\ \mathrm{P}=1\ \frac{\mathrm{dyn\cdot s}}{\mathrm{cm^2}}=1\ \frac{\mathrm{g}}{\mathrm{cm\cdot s}}`,'poise (CGS)'],[R`1\ \mathrm{P}=0{,}1\ \mathrm{Pa\cdot s}`],[R`1\ \mathrm{cP}=0{,}01\ \mathrm{P}=10^{-3}\ \mathrm{Pa\cdot s}`,'centipoise'])}
<p>La <b>P</b> mayúscula de poise no es el peso P de una esfera. El manuscrito usa “p” y “cp”; acá se normalizan <b>P</b> y <b>cP</b>.</p>
${idea('Agua a 20 °C',`${M(R`\eta_{\mathrm{agua},\,20\,^\circ\mathrm{C}}\approx1\ \mathrm{cP}=0{,}01\ \mathrm{P}`)}<p>La temperatura importa: no es una constante del agua a cualquier temperatura.</p>`)}
<h3>Viscosímetro de dos cilindros</h3>
${figure(svgViscometer,'El cilindro interior gira y el exterior está fijo. El área de contacto es la superficie lateral: A = 2πr·h.')}
${chain([R`A=2\pi r\,h`,'superficie lateral (no 2πr solo)'],[R`v=2\pi r\,f`,'una vuelta = 2πr; f vueltas por segundo'],[R`\Delta v=v-0=v`,'la pared exterior está quieta'],[R`f_R=\eta\,A\,\frac{v}{e}`,'e = separación entre cilindros'])}
<p>La <b>altura</b> sirve para el área; la <b>separación</b> es la distancia entre capas. Son medidas distintas y no se intercambian.</p>
${goTo('5.4','fuerza viscosa entre cilindros')}
`);

  // ---------- 7. Cinemática ----------
  add('cinematica','Viscosidad cinemática','ν = η / ρ · 07',`
<p>La <b>viscosidad cinemática ν</b> combina la viscosidad dinámica con la densidad. Es una magnitud nueva; <b>no es una velocidad</b>. En el apunte el símbolo aparece acompañado por “mu”; acá se usa la notación habitual <b>ν</b> (“nu”).</p>
${sym([[R`\nu`,'viscosidad cinemática','m²/s · St'],[R`\eta`,'viscosidad dinámica','Pa·s · P'],[R`\rho`,'densidad','kg/m³ · g/cm³']])}
${key(R`\nu=\frac{\eta}{\rho}`,'Definición')}
${chain([R`\eta=\rho\,\nu`,'despeje'],[R`[\nu]=\frac{\mathrm{kg/(m\cdot s)}}{\mathrm{kg/m^3}}=\frac{\mathrm{m^2}}{\mathrm{s}}`,'SI'],[R`[\nu]=\frac{\mathrm{g/(cm\cdot s)}}{\mathrm{g/cm^3}}=\frac{\mathrm{cm^2}}{\mathrm{s}}`,'CGS'],[R`1\ \mathrm{St}=1\ \frac{\mathrm{cm^2}}{\mathrm{s}}=10^{-4}\ \frac{\mathrm{m^2}}{\mathrm{s}}`,'stokes'],[R`1\ \mathrm{cSt}=0{,}01\ \mathrm{St}=10^{-6}\ \frac{\mathrm{m^2}}{\mathrm{s}}`,'centistokes'])}
${idea('Regla práctica',`<p>η en <b>poise</b> y ρ en <b>g/cm³</b> → ν sale en <b>stokes</b>. Si η está en cP, pasala primero a P.</p>`)}
${table(['','Dinámica','Cinemática'],[['Símbolo',m(R`\eta`),m(R`\nu`)],['Qué mide','Resistencia al deslizamiento entre capas','Esa resistencia por unidad de densidad'],['SI','Pa·s','m²/s'],['CGS','P (poise)','St (stokes)']])}
${goTo('5.9','b · viscosidad cinemática de la glicerina')}
`);

  // ---------- 8. Reynolds ----------
  add('reynolds','Número de Reynolds','ELEGIR EL RÉGIMEN · 08',`
<p>Reynolds compara la importancia de los <b>efectos de inercia</b> ${simple('lo que tiende a desordenar')} con los <b>efectos viscosos</b> ${simple('lo que tiende a ordenar')}. Es <b>adimensional</b>. En estos ejercicios se usa la velocidad media y el <b>diámetro</b> del conducto.</p>
${sym([[R`\mathrm{Re}`,'número de Reynolds','sin unidad'],[R`\rho`,'densidad','kg/m³'],['v','velocidad media','m/s'],['d','diámetro del tubo','m'],[R`\eta`,'viscosidad dinámica','Pa·s'],[R`\nu`,'viscosidad cinemática','m²/s'],['Q','caudal','m³/s']])}
${key(R`\mathrm{Re}=\frac{\rho\,v\,d}{\eta}`,'Número de Reynolds en un tubo')}
<p>Más viscosidad → menor Re. Más velocidad → mayor Re. No reemplaces el diámetro por el radio sin ajustar la fórmula.</p>
${chain([R`[\mathrm{Re}]=\frac{(\mathrm{kg/m^3})(\mathrm{m/s})(\mathrm{m})}{\mathrm{kg/(m\cdot s)}}=1`,'se cancelan las unidades'])}
<h3>Forma con caudal</h3>
${chain([R`Q=\frac{\pi d^2}{4}\,v`],[R`4Q=\pi d^2v`],[R`v=\frac{4Q}{\pi d^2}`,'despejo v'],[R`\mathrm{Re}=\frac{\rho d}{\eta}\cdot\frac{4Q}{\pi d^2}`,'reemplazo'],[R`\mathrm{Re}=\frac{4\rho Q}{\pi d\,\eta}`,'se cancela UNA d'])}
<p>Una potencia de d se cancela (estaba multiplicando arriba y al cuadrado abajo). No desaparece todo el diámetro.</p>
<h3>Forma con viscosidad cinemática</h3>
${chain([R`\nu=\frac{\eta}{\rho}`],[R`\mathrm{Re}=\frac{4Q}{\pi d\,(\eta/\rho)}=\frac{4Q}{\pi d\,\nu}`],[R`\mathrm{Re}=\frac{v\,d}{\nu}`])}
<h3>Criterio que usa esta guía</h3>
${chain([R`\mathrm{Re}<2100\ \Longrightarrow\ \text{laminar}`],[R`2100\le\mathrm{Re}\le3000\ \Longrightarrow\ \text{transición (según el apunte)}`],[R`\mathrm{Re}>3000\ \Longrightarrow\ \text{turbulento (según el apunte)}`])}
${note('Valores aproximados',`<p>Para resolver la guía se usan los valores de la cátedra. Los límites dependen de las condiciones (rugosidad, entrada al tubo, perturbaciones); 3000 no es una frontera universal. En otros textos de tubos se usa como orientación &lt; 2300 laminar y &gt; 4000 turbulento.</p>`)}
<h3>Caudal máximo laminar</h3>
<p>Si piden el caudal máximo para mantener régimen laminar, se usa <b>Re<sub>crítico</sub> = 2100</b> como <b>frontera de cálculo</b> (no porque todo flujo con ese Re esté garantizado como laminar).</p>
${chain([R`\mathrm{Re}_{\mathrm{crít}}=\frac{4\rho Q_{\max}}{\pi d\,\eta}`],[R`\mathrm{Re}_{\mathrm{crít}}\,\pi d\,\eta=4\rho\,Q_{\max}`],[R`Q_{\max}=\frac{\mathrm{Re}_{\mathrm{crít}}\,\pi d\,\eta}{4\rho}`,'despejo'])}
${calc('reynolds','Calculá el número de Reynolds',field('rho','ρ (kg/m³)',1000)+field('v','v (m/s)',0.1)+field('d','d (m)',0.02)+field('eta','η (Pa·s)',0.001),'Unidades SI. Valores iniciales: agua a 0,1 m/s en un caño de 2 cm.')}
${goTo('5.5','caudal máximo laminar del aire')}${goTo('5.6 y 5.7','clasificar el régimen antes de elegir fórmula')}
`);

  // ---------- 9. Presión ----------
  add('presion','Diferencia de presión y circulación','Δp = p₁ − p₂ · 09',`
${figure(svgPressure,'El fluido entra por 1 y sale por 2. Para vencer el rozamiento, p₁ > p₂.')}
<p>Para vencer las pérdidas viscosas, la presión de entrada es mayor que la de salida. La presión empuja sobre una superficie; la <b>diferencia</b> entre las presiones produce el empuje neto. ${simple('Si no empujás más fuerte desde atrás, el rozamiento frena el flujo')}</p>
${key(R`\Delta p=p_1-p_2`,'Caída de presión del tramo')}
<p>La longitud <b>l</b> se mide entre esos extremos; <b>r</b> es el radio de la sección. La viscosidad pertenece al <b>fluido</b>, no al material del tubo.</p>
${note('Alcance de “si no hay diferencia de presión no hay caudal”',`<p>Vale para el <b>conducto resistivo de estos ejercicios, en circulación estacionaria y sin otros mecanismos de impulsión</b>. Un fluido puede moverse por gravedad, por paredes móviles o en situaciones transitorias; la frase no se extrapola a todo movimiento posible.</p>`)}
`);

  // ---------- 10. Poiseuille ----------
  add('poiseuille','Poiseuille (régimen laminar)','LAMINAR · 10',`
<p><b>Cuándo usarla:</b> conducto circular recto de radio uniforme; flujo <b>laminar</b>, estacionario y plenamente desarrollado; fluido newtoniano; densidad prácticamente constante. La versión del apunte considera la pérdida del tramo; no incluye codos, entradas ni cambios de altura.</p>
${sym([['Q','caudal','m³/s'],['r','radio','m'],[R`\Delta p`,'diferencia de presión','Pa'],[R`\eta`,'viscosidad dinámica','Pa·s'],['l','longitud','m']])}
${key(R`Q=\frac{\pi r^4\,\Delta p}{8\,\eta\,l}`,'Ley de Poiseuille')}
${warn('Ojo',`<p>Acá aparece el <b>radio a la cuarta</b>, no el diámetro al cuadrado.</p>`)}
<h3>Qué explica cada factor</h3>
${table(['Si sólo aumenta…','El caudal…','Por qué'],[['Δp','aumenta','hay más impulso'],['η','disminuye','más resistencia viscosa'],['l','disminuye','tramo resistivo más largo'],['r','aumenta muchísimo','cuarta potencia']])}
${chain([R`r_2=2r_1\ \Longrightarrow\ Q_2=2^4Q_1=16\,Q_1`],[R`r_2=3r_1\ \Longrightarrow\ Q_2=3^4Q_1=81\,Q_1`])}
${calc('poiseuille','¿Cuánto cambia el caudal si cambio el radio?',field('k','factor del radio (r nuevo / r viejo)',2),'Con la misma Δp, η y l.')}
${idea('No contradice continuidad',`<p>En <b>continuidad</b> comparamos secciones de <b>una misma circulación</b> con caudal fijo. En <b>Poiseuille</b> comparamos <b>conductos distintos</b> con la misma presión, viscosidad y longitud. Lo que se mantiene constante es diferente.</p>`)}
<h3>Despejar la presión</h3>
${chain([R`Q=\frac{\pi r^4\Delta p}{8\eta l}`],[R`8\eta l\,Q=\pi r^4\,\Delta p`,'paso el denominador'],[R`\Delta p=\frac{8\,\eta\,l\,Q}{\pi r^4}`,'despejo'])}
<h3>Forma con diámetro</h3>
${chain([R`r=\frac{d}{2}`],[R`r^4=\left(\frac{d}{2}\right)^4=\frac{d^4}{16}`],[R`Q=\frac{\pi d^4\,\Delta p}{128\,\eta\,l}`,'8 · 16 = 128'])}
<h3>Volumen que pasa en un tiempo</h3>
${chain([R`V=Q\,t`],[R`V=\frac{\pi r^4\,\Delta p\,t}{8\,\eta\,l}`,'fórmula de volumen del manuscrito'])}
<p>Las dos fórmulas dicen lo mismo cuando la circulación es constante: la de volumen tiene un factor t; la de caudal, no.</p>
${deep('Forma con velocidad media',`<p>Reemplazando ${m(R`Q=\pi r^2 v`)} en el despeje de Δp:</p>${chain([R`\Delta p=\frac{8\eta l\,\pi r^2v}{\pi r^4}=\frac{8\eta l\,v}{r^2}`],[R`\Delta p=\frac{32\,\eta\,l\,v}{d^2}`,'con r = d/2'])}<p>Es útil cuando el dato es la velocidad media y no el caudal.</p>`)}
${example('Del manuscrito: régimen, presión y potencia',
 `<p><b>Datos:</b> densidad 1,2 g/cm³; diámetro 1 cm; velocidad media 10 cm/s; viscosidad 0,01 P; longitud 50 cm. Clasificar el régimen y calcular caudal, caída de presión y potencia.</p>`,
 step('1. Primero el régimen',`<p>No elegimos Poiseuille sólo porque hay un tubo: hay que clasificar.</p>${chain(R`\mathrm{Re}=\frac{\rho\,v\,d}{\eta}`,R`\mathrm{Re}=\frac{1{,}2\cdot10\cdot1}{0{,}01}`,R`\mathrm{Re}=1200\ <\ 2100\ \Rightarrow\ \text{laminar}`)}`)+
 step('2. Caudal (CGS)',chain(R`r=\frac{d}{2}=0{,}5\ \mathrm{cm}`,R`Q=\pi r^2v=\pi(0{,}5)^2\cdot10`,R`Q\approx7{,}854\ \mathrm{cm^3/s}`))+
 step('3. Caída de presión (Poiseuille)',chain(R`\Delta p=\frac{8\eta lQ}{\pi r^4}`,R`\Delta p=\frac{8\cdot0{,}01\cdot50\cdot7{,}854}{\pi(0{,}5)^4}`,R`\Delta p=160\ \mathrm{ba}`,[R`\Delta p=16\ \mathrm{Pa}`,'1 Pa = 10 ba']))+
 step('4. Potencia (en SI)',chain([R`Q=7{,}854\cdot10^{-6}\ \mathrm{m^3/s}`,'1 cm³ = 10⁻⁶ m³'],R`\mathrm{Pot}=\Delta p\,Q=16\cdot7{,}854\cdot10^{-6}`,R`\mathrm{Pot}\approx1{,}257\cdot10^{-4}\ \mathrm{W}`))+
 idea('Control',`<p>Δp positiva: hace falta una caída de presión para vencer el rozamiento. Pa · m³/s da W.</p>`),
 `Re = 1200 (laminar) · Q ≈ 7,854 cm³/s · Δp = 160 ba = 16 Pa · Pot ≈ 1,26·10⁻⁴ W`)}
${goTo('5.6','Poiseuille con unidades inglesas')}${goTo('5.8','comparar caudales sin conocer los radios')}
`);

  // ---------- 11. Fanning ----------
  add('fanning','Fanning (régimen turbulento)','TURBULENTO · 11',`
<p>Si Reynolds indica régimen <b>turbulento</b>, la guía indica usar la ecuación de Fanning. Primero hace falta <b>Re</b> para calcular el factor <b>f</b>, que no tiene unidades. ${simple('No es la frecuencia del viscosímetro, aunque se escriba con la misma letra')}</p>
${sym([['f','factor de fricción de Fanning','sin unidad'],['Q','caudal','m³/s'],[R`\rho`,'densidad','kg/m³'],['l','longitud','m'],['r','radio','m']])}
${key(R`f=0{,}0014+0{,}125\,\mathrm{Re}^{-0{,}32}`,'Factor de Fanning (correlación de la guía)')}
${key(R`\Delta p=\frac{f\,Q^2\,\rho\,l}{\pi^2\,r^5}`,'Caída de presión turbulenta')}
${chain([R`\mathrm{Re}^{-0{,}32}=\frac{1}{\mathrm{Re}^{0{,}32}}`,'exponente negativo = dividir'])}
${idea('Procedimiento',`<p><b>convertir unidades → hallar Re → hallar f → hallar Q si falta → hallar Δp → hallar potencia</b>.</p>`)}
${calc('fanning','Factor de Fanning',field('re','Re',12395),'Probá con el Re del ejercicio 5.7.')}
${note('Alcance de la correlación',`<p>Es la correlación de Drew, Koo y McAdams para el factor de <b>Fanning</b> en tubos lisos, pensada para régimen turbulento (aprox. 3·10³ &lt; Re &lt; 3·10⁶). Se usa como modelo del material: <b>no incorpora la rugosidad</b> y no es una fórmula universal para cualquier cañería real.</p>`)}
${warn('Fanning ≠ Darcy',`<p>Son convenciones diferentes:</p>${M(R`f_D=4\,f_F`)}<p>Usar un factor de Darcy dentro de la ecuación escrita para Fanning <b>multiplica por cuatro</b> la pérdida de presión.</p>`)}
${deep('De dónde sale la forma con r⁵',`<p>La ecuación de Darcy–Weisbach es ${m(R`\Delta p=f_D\,\frac{l}{d}\,\frac{\rho v^2}{2}`)}. Con ${m(R`f_D=4f_F`)}, ${m(R`d=2r`)} y ${m(R`v=Q/(\pi r^2)`)}:</p>${chain([R`\Delta p=4f\cdot\frac{l}{2r}\cdot\frac{\rho}{2}\cdot\frac{Q^2}{\pi^2r^4}`],[R`\Delta p=\frac{f\,Q^2\,\rho\,l}{\pi^2r^5}`])}<p>En turbulento Δp crece con <b>Q²</b> y depende de <b>r⁵</b>. ${simple('Duplicar el caudal cuesta aproximadamente cuatro veces más presión')}</p>`)}
${goTo('5.7','régimen turbulento con Fanning')}
`);

  // ---------- 12. Potencia ----------
  add('potencia','Potencia mínima de circulación','Pot = Δp · Q · 12',`
<p>La potencia es energía transferida por unidad de tiempo. La <b>potencia hidráulica mínima</b> es la que se entrega al fluido para mantener el caudal frente a la caída de presión calculada. ${simple('Lo mínimo que tiene que dar la bomba cada segundo')}</p>
${sym([[R`\mathrm{Pot}`,'potencia','W'],[R`W_{\mathrm{tr}}`,'trabajo','J'],['F','fuerza neta de impulsión','N'],['x','desplazamiento','m'],['S','sección','m²']])}
<h3>Deducción</h3>
${chain([R`\mathrm{Pot}=\frac{W_{\mathrm{tr}}}{t}`,'definición'],[R`W_{\mathrm{tr}}=F\,x`,'trabajo de una fuerza constante'],[R`\mathrm{Pot}=F\,\frac{x}{t}`],[R`\mathrm{Pot}=F\,v`,'x/t = v'],[R`F=(p_1-p_2)\,S=\Delta p\,S`,'fuerza neta de presión'],[R`\mathrm{Pot}=\Delta p\,S\,v`],[R`S\,v=Q`],[R`\mathrm{Pot}=\Delta p\,Q`,'resultado'])}
${key(R`\mathrm{Pot}=\Delta p\,Q`,'Potencia hidráulica')}
<h3>Unidades</h3>
<div class="twoCol">
<div><b>SI</b>${chain(R`\mathrm{Pa}\cdot\frac{\mathrm{m^3}}{\mathrm{s}}=\frac{\mathrm{N}}{\mathrm{m^2}}\cdot\frac{\mathrm{m^3}}{\mathrm{s}}`,R`\frac{\mathrm{N\cdot m}}{\mathrm{s}}=\frac{\mathrm{J}}{\mathrm{s}}=\mathrm{W}`)}</div>
<div><b>CGS</b>${chain(R`\mathrm{ba}\cdot\frac{\mathrm{cm^3}}{\mathrm{s}}=\frac{\mathrm{erg}}{\mathrm{s}}`,R`1\ \mathrm{W}=10^7\ \frac{\mathrm{erg}}{\mathrm{s}}`)}</div>
</div>
${warn('No mezclar',`<p>Si Δp está en Pa, Q tiene que estar en <b>m³/s</b> para obtener watts. Pa × cm³/s <b>no</b> son watts.</p>`)}
${deep('Bomba real (complementario)',`<p>Una bomba con rendimiento ε (entre 0 y 1) consume más:</p>${M(R`\mathrm{Pot}_{\mathrm{entrada}}=\frac{\mathrm{Pot}_{\mathrm{hidráulica}}}{\varepsilon}`)}<p>La guía no da rendimiento: por eso pide la potencia <b>mínima</b> hidráulica.</p>`)}
`);

  // ---------- 13. Stokes ----------
  add('stokes','Stokes: esfera en un fluido viscoso','FUERZA DE RESISTENCIA · 13',`
<p>Si una esfera se mueve respecto del fluido, aparece una fuerza de resistencia <b>opuesta</b> a ese movimiento relativo. En el modelo de Stokes:</p>
${sym([['R','módulo de la fuerza viscosa (F_vis en otros textos)','N · dyn'],['r','radio de la esfera','m'],[R`\eta`,'viscosidad dinámica del fluido','Pa·s'],['v','rapidez de la esfera respecto del fluido','m/s']])}
${key(R`R=6\pi\,r\,\eta\,v`,'Ley de Stokes')}
<p>Si el líquido está quieto, esa rapidez coincide con la de la esfera respecto de la probeta.</p>
${note('Condiciones de la ley',`<p>Flujo <b>lento</b> alrededor de la esfera, con efectos viscosos dominantes. No alcanza con que el objeto sea esférico y el líquido viscoso: a velocidades altas la ley lineal deja de servir. También se supone que las <b>paredes</b> no alteran el movimiento.</p>`)}
<p>Duplicar la rapidez → la fuerza se duplica. Duplicar el radio (a igual v y η) → la fuerza se duplica. En cambio el <b>peso y el empuje</b> dependen del volumen, es decir, del <b>cubo</b> del radio.</p>
<h3>No confundir dos Reynolds</h3>
<p>El del <b>tubo</b> usa el diámetro del tubo y la velocidad media. Para la <b>esfera</b> se usa su diámetro y la rapidez relativa:</p>
${M(R`\mathrm{Re}_{\mathrm{esfera}}=\frac{\rho_L\,v\,(2r)}{\eta}`)}
<p>El régimen de Stokes requiere ${m(R`\mathrm{Re}_{\mathrm{esfera}}\ll1`)}. <b>No</b> se usa el límite 2100 de los tubos para justificar Stokes.</p>
`);

  // ---------- 14. Velocidad límite ----------
  add('limite','Peso, empuje y velocidad límite','VELOCIDAD LÍMITE · 14',`
<p>Tomamos <b>hacia abajo como positivo</b>. La esfera está completamente sumergida y el líquido quieto. El peso P apunta hacia abajo; el empuje E, hacia arriba; durante la caída, la resistencia R también hacia arriba.</p>
${figure(svgThreeSpheres,'Al soltarla, mientras acelera y a velocidad límite.')}
${sym([[R`\rho_C`,'densidad del cuerpo (esfera)','kg/m³'],[R`\rho_L`,'densidad del líquido','kg/m³'],['V','volumen de la esfera','m³'],[R`\gamma`,'peso específico (Pe del apunte)','N/m³']])}
${chain([R`m=\rho_C\,V`],[R`P=m\,g=\rho_C\,V\,g`,'peso'],[R`E=\rho_L\,V\,g`,'Arquímedes: peso del líquido desplazado'])}
${deep('Con peso específico',chain([R`\gamma=\rho\,g`],[R`P=\gamma_C\,V`],[R`E=\gamma_L\,V`]))}
<h3>1 · Al soltarla desde el reposo</h3>
${chain([R`v=0`],[R`R=6\pi r\eta\cdot0=0`],[R`\sum F=m\,a`],[R`P-E=m\,a`])}
<p>Si la esfera es más densa que el líquido, P &gt; E y acelera hacia abajo. No basta con decir “hay gravedad”: el empuje está desde el comienzo.</p>
<h3>2 · Durante la caída</h3>
${M(R`P-E-R=m\,a`)}
<p>Al aumentar v, aumenta R; P y E no cambian. La fuerza neta disminuye y también la aceleración. <b>La rapidez aumenta mientras la aceleración disminuye.</b> ${simple('No hay contradicción: la aceleración sigue siendo positiva, sólo que cada vez más chica')}</p>
<h3>3 · A velocidad límite</h3>
${chain([R`P=E+R`],[R`P-E-R=0`],[R`m\,a=0\ \Rightarrow\ a=0`])}
${idea('Fuerza neta cero ≠ velocidad cero',`<p>La esfera <b>sigue cayendo con velocidad constante</b>. Lo que se anula es el cambio de velocidad.</p>`)}
${figure(svgVt,'Gráfico cualitativo: rapidez en función del tiempo.')}
<p>La pendiente es la aceleración: al principio es grande y después tiende a cero. En el modelo lineal la velocidad límite se alcanza de forma asintótica; en el laboratorio se considera alcanzada cuando el movimiento es prácticamente uniforme. <b>Nunca</b> se dibuja una rapidez que vuelve a cero.</p>
<h3>Deducción completa</h3>
${chain([R`P-E-R=0`,'equilibrio'],[R`\rho_CVg-\rho_LVg-6\pi r\eta\,v_{\mathrm{lím}}=0`,'reemplazo cada fuerza'],[R`V\,g\,(\rho_C-\rho_L)=6\pi r\eta\,v_{\mathrm{lím}}`,'factor común Vg'],[R`V=\frac43\pi r^3`,'volumen de la esfera'],[R`\frac43\pi r^3g(\rho_C-\rho_L)=6\pi r\eta\,v_{\mathrm{lím}}`],[R`v_{\mathrm{lím}}=\frac{\frac43\pi r^3g(\rho_C-\rho_L)}{6\pi r\eta}`,'despejo'],[R`v_{\mathrm{lím}}=\frac{4}{3\cdot6}\cdot\frac{r^2g(\rho_C-\rho_L)}{\eta}`,'cancelo π y una r'],[R`\frac{4}{18}=\frac{2}{9}`],[R`v_{\mathrm{lím}}=\frac{2\,r^2\,g\,(\rho_C-\rho_L)}{9\,\eta}`])}
${key(R`v_{\mathrm{lím}}=\frac{2\,r^2\,g\,(\rho_C-\rho_L)}{9\,\eta}`,'Velocidad límite')}
${idea('Interpretar antes de reemplazar',`<ul class="kitList"><li>Radio mayor → velocidad límite mayor (con r²), mientras valga Stokes.</li><li>Más viscosidad → menor velocidad límite.</li><li>Mayor diferencia de densidades → mayor velocidad límite.</li><li><b>No olvides restar ρ<sub>L</sub></b>: esa resta es el efecto del empuje.</li></ul>`)}
${warn('Si las densidades son iguales o el cuerpo es más liviano',`<p>Con ρ<sub>C</sub> = ρ<sub>L</sub> el modelo da velocidad límite nula. Con ρ<sub>C</sub> &lt; ρ<sub>L</sub> el signo indica movimiento <b>ascendente</b> en el eje elegido: no corresponde describirlo como caída. ${simple('Un corcho o una burbuja suben')}</p>`)}
${calc('stokes','Velocidad límite de una esfera',field('r','r (mm)',1.2)+field('rc','ρ_C (kg/m³)',8803)+field('rf','ρ_L (kg/m³)',1260)+field('eta','η (Pa·s)',1.081),'Valores iniciales: la esfera de bronce en glicerina del ejercicio 5.9.')}
${goTo('5.10','esfera de radio triple')}${goTo('5.11','volumen, rozamiento y velocidad de dos esferas')}
`);

  // ---------- 15. Medir viscosidad ----------
  add('viscosimetro-bola','Medir viscosidad con una esfera','VISCOSÍMETRO DE CAÍDA · 15',`
<p>Se coloca una esfera de radio y densidad conocidos en un líquido de densidad conocida. Primero se deja que llegue a una zona de rapidez prácticamente constante. Después se mide la distancia <b>e</b> entre dos marcas y el tiempo <b>t</b> que tarda en atravesarlas.</p>
${chain([R`v_{\mathrm{lím}}=\frac{e}{t}`,'velocidad uniforme entre marcas'],[R`9\eta\,v_{\mathrm{lím}}=2r^2g(\rho_C-\rho_L)`,'paso 9η multiplicando'],[R`\eta=\frac{2r^2g(\rho_C-\rho_L)}{9\,v_{\mathrm{lím}}}`,'despejo η'],[R`\eta=\frac{2r^2g(\rho_C-\rho_L)}{9\,(e/t)}`],[R`\eta=\frac{2r^2g(\rho_C-\rho_L)\,t}{9\,e}`])}
${key(R`\eta=\frac{2\,r^2\,g\,(\rho_C-\rho_L)\,t}{9\,e}`,'Viscosidad por caída de esfera')}
${warn('Buenas prácticas',`<ul class="kitList"><li>No medir desde que se suelta: esa etapa es acelerada y e/t no sería la velocidad límite.</li><li>Una probeta demasiado angosta altera el resultado por efecto de las paredes.</li><li>Registrar la temperatura: modifica la viscosidad.</li><li>En CGS, g = 980 cm/s².</li></ul>`)}
${goTo('5.9','viscosidad de la glicerina')}
`);

  // ---------- 16. Conversiones ----------
  add('conversiones','Conversiones de la guía','UNIDADES · 16',`
<h3>Elegir un sistema coherente</h3>
${table(['Magnitud','SI (MKS)','CGS'],[['Longitud','m','cm'],['Masa','kg','g'],['Tiempo','s','s'],['Velocidad','m/s','cm/s'],['Volumen','m³','cm³'],['Densidad','kg/m³','g/cm³'],['Viscosidad dinámica','Pa·s','P'],['Viscosidad cinemática','m²/s','St'],['Fuerza','N','dyn'],['Presión','Pa','ba'],['Potencia','W','erg/s']])}
<p>Reynolds sale igual en ambos sistemas si todo se convierte de manera coherente. Las fórmulas <b>no</b> corrigen solas unidades mezcladas.</p>
<h3>Longitudes y volúmenes</h3>
${chain(R`1\ \mathrm{pulg}=2{,}54\ \mathrm{cm}=0{,}0254\ \mathrm{m}`,R`1\ \mathrm{pie}=30{,}48\ \mathrm{cm}=0{,}3048\ \mathrm{m}`,[R`1\ \mathrm{pulg^3}=(2{,}54)^3\ \mathrm{cm^3}=16{,}387064\ \mathrm{cm^3}`,'el factor se eleva al cubo'],R`1\ \mathrm{m^3}=(100\ \mathrm{cm})^3=10^6\ \mathrm{cm^3}`,R`1\ \mathrm{cm^3}=10^{-6}\ \mathrm{m^3}`,R`1\ \mathrm{L}=1000\ \mathrm{cm^3}=10^{-3}\ \mathrm{m^3}`)}
<p>Para volumen el factor de longitud se eleva al <b>cubo</b>. Para densidad el volumen está en el denominador, y eso invierte el efecto del factor.</p>
<h3>Densidades y unidades inglesas</h3>
${chain(R`1\ \frac{\mathrm{g}}{\mathrm{cm^3}}=1000\ \frac{\mathrm{kg}}{\mathrm{m^3}}`,R`1\ \mathrm{lb}=0{,}45359237\ \mathrm{kg}`,R`1\ \frac{\mathrm{lb}}{\mathrm{pie^3}}\approx16{,}01846\ \frac{\mathrm{kg}}{\mathrm{m^3}}`,R`1\ \mathrm{slug}\approx14{,}59390\ \mathrm{kg}`,R`1\ \frac{\mathrm{slug}}{\mathrm{pie^3}}\approx0{,}5153788\ \frac{\mathrm{g}}{\mathrm{cm^3}}`)}
<p>En el ejercicio 5.6, <b>lb</b> es unidad de <b>masa</b> (no libra fuerza).</p>
<h3>Fuerza, presión y tiempo</h3>
${chain(R`1\ \mathrm{dyn}=10^{-5}\ \mathrm{N}`,R`1\ \mathrm{kgf}=9{,}80665\ \mathrm{N}`,[R`1\ \mathrm{ba}=1\ \frac{\mathrm{dyn}}{\mathrm{cm^2}}=0{,}1\ \mathrm{Pa}`,'baria'],R`1\ \mathrm{Pa}=10\ \mathrm{ba}`,R`1\ \mathrm{atm}=101\,325\ \mathrm{Pa}`,R`1\ \mathrm{h}=3600\ \mathrm{s}\qquad\tfrac12\ \mathrm{h}=1800\ \mathrm{s}`,R`g=9{,}8\ \mathrm{m/s^2}=980\ \mathrm{cm/s^2}`)}
${warn('Confusiones típicas',`<p><b>Baria (ba) no es bar.</b> <b>Kilogramo fuerza no es kilogramo de masa.</b> Si usás cm, g y poise, la gravedad va en cm/s².</p>`)}
`);

  // ---------- 17 y 18. Ejercicios (resoluciones en app.js según permisos) ----------
  const exercises=[];
  const exercise=(n,title,statement,solution,answer)=>exercises.push({n,title,statement,solution,answer});
  const continuity=sym([['Q','caudal volumétrico','m³/s'],['S','área de la sección','m²'],['d','diámetro interior','m'],['v','velocidad media','m/s']])+chain(R`Q=S\,v`,R`S=\frac{\pi d^2}{4}`,R`Q_1=Q_2`,R`\frac{\pi d_1^2}{4}v_1=\frac{\pi d_2^2}{4}v_2`,R`v_2=v_1\left(\frac{d_1}{d_2}\right)^2`);
  const plan=(pide,fen,ley)=>`<div class="kitBox kitNote"><b>Antes de calcular</b><p><b>Piden:</b> ${pide}<br><b>Fenómeno:</b> ${fen}<br><b>Ley y por qué:</b> ${ley}</p></div>`;
  const control=t=>`<div class="kitBox kitIdea"><b>✓ Control</b><p>${t}</p></div>`;

  // Guía original: «Actividad n.º 8 — Circulación de fluidos» (numeración impresa 5.1–5.11).
  exercise('5.1','Volumen transportado','En una sección circular, de diámetro 1 pulgada, la velocidad media es 5 m/seg. ¿Qué volumen de fluido circula en 10 seg?',
    plan('un volumen en un tiempo.','un fluido pasa por una sección: caudal.','Q = S·v y luego V = Q·t; v es la velocidad media.')+
    step('1. Unidades (SI)',chain(R`d=1\ \mathrm{pulg}=0{,}0254\ \mathrm{m}`,R`v=5\ \mathrm{m/s}`,R`t=10\ \mathrm{s}`))+
    step('2. Sección',chain(R`S=\frac{\pi d^2}{4}=\frac{\pi(0{,}0254)^2}{4}`,R`S=5{,}0671\cdot10^{-4}\ \mathrm{m^2}`))+
    step('3. Caudal',chain(R`Q=S\,v=5{,}0671\cdot10^{-4}\cdot5`,R`Q=2{,}5335\cdot10^{-3}\ \mathrm{m^3/s}`))+
    step('4. Volumen',chain(R`V=Q\,t=2{,}5335\cdot10^{-3}\cdot10`,R`V=0{,}025335\ \mathrm{m^3}`,[R`V\approx25{,}34\ \mathrm{L}`,'× 1000']))+
    control('No se multiplica el diámetro por la velocidad: hace falta el área. La guía redondea a 0,025 m³.'),
    'V ≈ 0,0253 m³ ≈ 25,34 L (guía: 0,025 m³)');
  exercise('5.2','Cambio de sección y volumen','Por un tubo de diámetro de una pulgada, circula una corriente de fluido, con una velocidad media de 10 cm/seg. a)¿Cuál es la velocidad en la otra sección de diámetro de 1,5 pulgadas. b)¿Cuál es el volumen de fluido que circula en media hora?',
    plan('una velocidad nueva y un volumen.','mismo líquido, flujo estacionario, sin pérdidas: continuidad.','S₁v₁ = S₂v₂ y V = Q·t.')+
    step('a. Continuidad',continuity+'<p>Las pulgadas se cancelan en el cociente d₁/d₂: no hace falta convertir.</p>'+chain(R`v_2=10\left(\frac{1}{1{,}5}\right)^2`,R`v_2=10\cdot0{,}444`,R`v_2\approx4{,}44\ \mathrm{cm/s}`))+
    fix('Error frecuente (y del apunte)','<p>El valor <b>6,67 cm/s</b> sale de usar d₁/d₂ <b>sin elevar al cuadrado</b>. Es incorrecto.</p>')+
    step('b. Volumen en media hora',`<p>Uso una sección y <b>su</b> velocidad. Elijo la primera:</p>`+chain(R`d_1=2{,}54\ \mathrm{cm}`,R`Q=\frac{\pi(2{,}54)^2}{4}\cdot10=50{,}6707\ \mathrm{cm^3/s}`,R`t=\tfrac12\ \mathrm{h}=1800\ \mathrm{s}`,R`V=Q\,t=50{,}6707\cdot1800`,R`V\approx91\,207\ \mathrm{cm^3}\approx91{,}2\ \mathrm{L}`))+
    control('El tubo más ancho lleva menor velocidad, pero transporta el mismo volumen por segundo. Con la sección 2 y v₂ da lo mismo.'),
    'v₂ ≈ 4,44 cm/s · V ≈ 91 200 cm³ ≈ 91,2 L');
  exercise('5.3','Diámetro reducido a la mitad','En una tubería el caudal es constante. ¿Cuánto varía la velocidad si se reduce su diámetro a la mitad? JUSTIFICAR',
    plan('cómo cambia v.','caudal constante: continuidad.','v₂ = v₁(d₁/d₂)².')+continuity+chain(R`d_2=\frac{d_1}{2}`,R`v_2=v_1\left(\frac{d_1}{d_1/2}\right)^2`,R`v_2=2^2\,v_1`,R`v_2=4\,v_1`)+
    '<p><b>Justificación:</b> el área depende del cuadrado del diámetro; si d se reduce a la mitad, el área queda en 1/4 y, para que S·v sea igual, la velocidad se cuadruplica.</p>'+
    step('Comparación',chain([R`d_2=\frac{d_1}{3}\ \Rightarrow\ v_2=9\,v_1`],[R`d_2=\frac{d_1}{4}\ \Rightarrow\ v_2=16\,v_1`,'ejemplo del manuscrito'],[R`d_2=2\,d_1\ \Rightarrow\ v_2=\frac{v_1}{4}`])),
    'La velocidad se cuadruplica (v₂ = 4v₁).');
  exercise('5.4','Fuerza viscosa entre cilindros','El cilindro exterior de la figura es fijo, mientras que el cilindro interior gira a razón de 0,5 vueltas/seg. El radio del cilindro interior es de 10 cm. Se coloca entre ambos cilindros un aceite de viscosidad η = 10 poise. ¿Cuál será la fuerza viscosa de Newton? Dato: 2.π.frec.r',
    '<p><b>Datos de la figura:</b> altura del cilindro 20 cm; separación entre cilindros 2 mm.</p>'+figure(svgViscometer,'Vista superior y superficie lateral desplegada.')+
    plan('la fuerza de rozamiento viscoso.','capas de aceite deslizando entre una pared que gira y otra fija.','Newton: f<sub>R</sub> = ηA·Δv/Δx. Modelo del apunte: capa delgada, gradiente uniforme, sólo superficie lateral (sin bases).')+
    sym([['f','frecuencia de giro','vueltas/s'],['r','radio del cilindro interior','cm'],['h','altura','cm'],['e','separación (Δx)','cm'],[R`\eta`,'viscosidad','P'],['A','superficie lateral','cm²']])+
    step('1. Unidades (CGS)',chain(R`e=2\ \mathrm{mm}=0{,}2\ \mathrm{cm}`,R`r=10\ \mathrm{cm},\quad h=20\ \mathrm{cm},\quad\eta=10\ \mathrm{P}`))+
    step('2. Área de contacto',chain(R`A=2\pi r\,h=2\pi\cdot10\cdot20`,R`A=400\pi\approx1256{,}6\ \mathrm{cm^2}`))+
    step('3. Velocidad tangencial',`<p>Cada vuelta recorre una circunferencia: circunferencia × vueltas por segundo (es el “Dato” de la consigna).</p>`+chain(R`v=2\pi r\,f=2\pi\cdot10\cdot0{,}5`,R`v=10\pi\approx31{,}42\ \mathrm{cm/s}`,[R`\Delta v=v-0=v`,'la pared exterior está quieta']))+
    step('4. Ley de Newton',chain(R`f_R=\eta\,A\,\frac{\Delta v}{e}`,R`f_R=10\cdot400\pi\cdot\frac{10\pi}{0{,}2}`,R`f_R=200\,000\,\pi^2\ \mathrm{dyn}`,R`f_R\approx1\,973\,921\ \mathrm{dyn}`,[R`f_R\approx19{,}74\ \mathrm{N}`,'1 dyn = 10⁻⁵ N'],[R`f_R\approx\frac{19{,}74}{9{,}80665}\approx2{,}01\ \mathrm{kgf}`,'kgf es fuerza, no masa']))+
    fix('Correcciones de la cuenta manuscrita','<p>Con los intermedios escritos (A = 1256 cm² y v = 31,4 cm/s) la multiplicación da <b>1 971 920 dyn</b>; el manuscrito escribe 1 972 920 dyn: es una <b>errata aritmética</b> de 1000 dyn. Usando π sin redondear se obtiene 1 973 921 dyn: esa diferencia es de <b>redondeo</b>. Además, el desarrollo dibujado escribe A = 2πr sin h; el área lateral es <b>A = 2πr·h</b>, como se usa en la cuenta.</p>')+
    control('La altura da el área; la separación da el gradiente. No se intercambian.'),
    'f<sub>R</sub> ≈ 1,97·10⁶ dyn ≈ 19,74 N ≈ 2 kgf');
  exercise('5.5','Caudal máximo laminar de aire','Por un tubo circula aire, cuya viscosidad es 1,8·10⁻² cpoise. Se necesita que el aire fluya con un régimen laminar. Si el diámetro del tubo es 1 cm. ¿Cuál es el caudal máximo que se puede lograr? (δaire = 1,2 g/litro)',
    plan('el caudal máximo laminar.','régimen de circulación: Reynolds.','Re = 4ρQ/(πdη) con Re<sub>crít</sub> = 2100 como frontera de cálculo.')+
    step('1. Unidades (CGS)',chain([R`\eta=0{,}018\ \mathrm{cP}=0{,}00018\ \mathrm{P}`,'1 cP = 0,01 P'],[R`\rho=1{,}2\ \mathrm{g/L}=0{,}0012\ \mathrm{g/cm^3}`,'1 L = 1000 cm³'],R`d=1\ \mathrm{cm}`))+
    step('2. Despeje',chain(R`Q_{\max}=\frac{\mathrm{Re}_{\mathrm{crít}}\,\pi d\,\eta}{4\rho}`))+
    step('3. Reemplazo',chain(R`Q_{\max}=\frac{2100\cdot\pi\cdot1\cdot0{,}00018}{4\cdot0{,}0012}`,R`Q_{\max}\approx247{,}4\ \mathrm{cm^3/s}`))+
    step('Otra forma (por la velocidad)',chain(R`v_{\max}=\frac{\mathrm{Re}_{\mathrm{crít}}\,\eta}{\rho\,d}=\frac{2100\cdot0{,}00018}{0{,}0012\cdot1}=315\ \mathrm{cm/s}`,R`Q_{\max}=\frac{\pi d^2}{4}v_{\max}\approx247{,}4\ \mathrm{cm^3/s}`))+
    control('Para quedar por debajo de Re = 2100, el caudal debe ser menor que ese valor. La temperatura y la presión fijan las propiedades del aire; no se vuelven a multiplicar.'),
    'Q<sub>máx</sub> ≈ 247,4 cm³/s');
  exercise('5.6','Régimen, presión y potencia','Un líquido de η = 30 poise circula por un conducto recto de sección circular, de diámetro 1 pulg. con una velocidad media de 7,875 pulg/seg. La densidad del líquido es 76,16 Lb/pie³. a) Indicar si el régimen es laminar o turbulento. b) Si el conducto tiene una longitud de 15 cm, hallar la diferencia de presión en Pa. c) Calcular la potencia mínima de circulación en MKS.',
    note('Dato de viscosidad','<p>La consigna transcripta dice <b>30 poise</b>, pero el apunte y las respuestas de la guía (Re = 206; 44,6 Pa; 0,0045 W) corresponden a <b>30 cP</b>. Se resuelve con 30 cP; al final está el caso con 30 P literal. La velocidad figura como 7,874 pulg/s en el apunte (= 20 cm/s); la diferencia con 7,875 no cambia los resultados redondeados.</p>')+
    plan('régimen, Δp en Pa y potencia en W.','líquido viscoso por un tubo.','primero Reynolds; si es laminar, Poiseuille; potencia Pot = Δp·Q.')+
    step('1. Todo al SI',chain([R`\eta=30\ \mathrm{cP}=0{,}03\ \mathrm{Pa\cdot s}`],[R`d=0{,}0254\ \mathrm{m},\quad r=0{,}0127\ \mathrm{m},\quad l=0{,}15\ \mathrm{m}`],[R`v=7{,}874\cdot0{,}0254\approx0{,}2\ \mathrm{m/s}`],[R`\rho=76{,}16\cdot\frac{0{,}45359237}{(0{,}3048)^3}`,'lb → kg, pie³ → m³'],R`\rho\approx1219{,}97\ \mathrm{kg/m^3}`))+
    step('a. Régimen',chain(R`\mathrm{Re}=\frac{\rho\,v\,d}{\eta}=\frac{1219{,}97\cdot0{,}2\cdot0{,}0254}{0{,}03}`,R`\mathrm{Re}\approx206{,}6\ <\ 2100`)+'<p><b>Laminar</b> → Poiseuille.</p>')+
    step('b. Caída de presión',chain(R`Q=\frac{\pi d^2}{4}v=1{,}0134\cdot10^{-4}\ \mathrm{m^3/s}`,R`\Delta p=\frac{8\eta lQ}{\pi r^4}=\frac{8\cdot0{,}03\cdot0{,}15\cdot1{,}0134\cdot10^{-4}}{\pi(0{,}0127)^4}`,R`\Delta p\approx44{,}64\ \mathrm{Pa}`))+
    step('c. Potencia',chain(R`\mathrm{Pot}=\Delta p\,Q=44{,}64\cdot1{,}0134\cdot10^{-4}`,R`\mathrm{Pot}\approx4{,}52\cdot10^{-3}\ \mathrm{W}`))+
    deep('Si se tomara literalmente η = 30 poise',chain(R`\eta=3\ \mathrm{Pa\cdot s}`,R`\mathrm{Re}\approx2{,}07\ (\text{laminar})`,R`\Delta p=\frac{32\eta lv}{d^2}\approx4464\ \mathrm{Pa}`,R`\mathrm{Pot}\approx0{,}452\ \mathrm{W}`)+'<p>Esos valores no coinciden con la guía; por eso se interpreta cP.</p>'),
    'Re ≈ 207 (laminar) · Δp ≈ 44,6 Pa · Pot ≈ 0,0045 W (guía: Re = 206)');
  exercise('5.7','Cambio de viscosidad y velocidad','Resolver el problema 6, si la viscosidad es 1 poise y la velocidad es 15,748 pulg/seg (Los demás datos tomarlos con los mismos valores)',
    note('Dato de viscosidad','<p>Igual que en 5.6: el apunte y las respuestas de la guía (Re = 12 345; 17,32 Pa; 3,5·10⁻³ W) corresponden a <b>1 cP</b>. Al final está el caso con 1 P literal.</p>')+
    plan('régimen, Δp y potencia.','mismo tubo y líquido, menos viscosidad y más velocidad.','Reynolds; si es turbulento, Fanning (no Poiseuille).')+
    step('1. Nuevos datos',chain(R`\eta=1\ \mathrm{cP}=0{,}001\ \mathrm{Pa\cdot s}`,R`v=15{,}748\cdot0{,}0254\approx0{,}4\ \mathrm{m/s}`))+
    step('a. Régimen',chain(R`\mathrm{Re}=\frac{1219{,}97\cdot0{,}4\cdot0{,}0254}{0{,}001}`,R`\mathrm{Re}\approx12\,395\ >\ 3000`)+'<p><b>Turbulento</b> según la guía → Fanning.</p>')+
    step('b. Caudal y factor f',chain(R`Q=\frac{\pi d^2}{4}v=2{,}0268\cdot10^{-4}\ \mathrm{m^3/s}`,R`f=0{,}0014+\frac{0{,}125}{\mathrm{Re}^{0{,}32}}`,R`f=0{,}0014+\frac{0{,}125}{(12\,395)^{0{,}32}}`,R`f\approx0{,}007525`))+
    step('c. Caída de presión',chain(R`\Delta p=\frac{f\,Q^2\,\rho\,l}{\pi^2r^5}`,R`\Delta p=\frac{0{,}007525\cdot(2{,}0268\cdot10^{-4})^2\cdot1219{,}97\cdot0{,}15}{\pi^2(0{,}0127)^5}`,R`\Delta p\approx17{,}35\ \mathrm{Pa}`))+
    step('d. Potencia',chain(R`\mathrm{Pot}=17{,}35\cdot2{,}0268\cdot10^{-4}`,R`\mathrm{Pot}\approx3{,}52\cdot10^{-3}\ \mathrm{W}`))+
    note('Diferencia con la guía','<p>La guía escribe Re = 12 345; 17,32 Pa y 3,5·10⁻³ W. Con conversiones más precisas sale una diferencia pequeña; la clasificación no cambia. No se reemplaza el factor de Fanning por uno de Darcy.</p>')+
    deep('Si se tomara literalmente η = 1 poise',chain(R`\eta=0{,}1\ \mathrm{Pa\cdot s}`,R`\mathrm{Re}\approx124\ (\text{laminar})`,R`\Delta p=\frac{32\eta lv}{d^2}\approx297{,}6\ \mathrm{Pa}`,R`\mathrm{Pot}\approx0{,}0603\ \mathrm{W}`)+'<p>No coincide con la guía; por eso se interpreta cP.</p>'),
    'Re ≈ 12 395 (turbulento) · f ≈ 0,00752 · Δp ≈ 17,35 Pa · Pot ≈ 3,52·10⁻³ W');
  exercise('5.8','Comparación de caudales laminares','Si el caudal de un líquido de viscosidad que circula por un tubo debido a una diferencia de presión de 2 atm, es de 3,05 pulg³/seg. ¿Qué caudal circulará por otro cuyo radio es 3 veces mayor, si recorre el mismo trayecto, siendo el líquido 4 veces más viscoso y la diferencia de presión es 1 atm? Suponer que el régimen es laminar',
    '<p><b>Lectura del esquema:</b> dos conductos <b>independientes</b> de igual longitud. Tubo 1: r, η, Δp = 2 atm, Q₁ = 3,05 pulg³/s. Tubo 2: 3r, 4η, Δp = 1 atm, Q₂ = ?. No son tramos de un mismo caño: se comparan con el <b>cociente de Poiseuille</b>, no con continuidad.</p>'+
    step('1. Cociente (se cancelan π, 8 y l)',chain(R`Q=\frac{\pi r^4\Delta p}{8\eta l}`,R`\frac{Q_2}{Q_1}=\left(\frac{r_2}{r_1}\right)^4\frac{\Delta p_2}{\Delta p_1}\,\frac{\eta_1}{\eta_2}\,\frac{l_1}{l_2}`,R`\frac{Q_2}{Q_1}=3^4\cdot\frac12\cdot\frac14\cdot1=\frac{81}{8}=10{,}125`))+
    step('2. Caudal',chain([R`Q_1=3{,}05\cdot(2{,}54)^3\approx49{,}98\ \mathrm{cm^3/s}`,'pulg³ → cm³: el factor al cubo'],R`Q_2=10{,}125\cdot49{,}98`,R`Q_2\approx506{,}05\ \mathrm{cm^3/s}`,[R`Q_2\approx30{,}88\ \mathrm{pulg^3/s}`,'en las unidades de la consigna']))+
    note('Redondeo del manuscrito','<p>El manuscrito redondea Q₁ a 50 cm³/s y obtiene 506,25 cm³/s: la diferencia es sólo de redondeo.</p>')+
    control('El radio a la cuarta (×81) explica por qué el caudal aumenta aunque el líquido sea más viscoso y la presión menor.'),
    'Q₂ ≈ 506 cm³/s (≈ 30,9 pulg³/s)');
  exercise('5.9','Viscosidad de la glicerina','Una esfera de bronce de 0,24 cm de diámetro, se deja caer en una probeta llena de glicerina. Cuando la velocidad de caída es uniforme, la esfera desciende 35 cm en 16 segundos. a) Calcular la viscosidad de la glicerina. b) Calcular la viscosidad cinemática de la glicerina. Datos: (δglicerina = 1,26 g/cm³; δbronce = 17,08 slug/pie³)',
    plan('η y ν de la glicerina.','esfera a velocidad uniforme: velocidad límite.','equilibrio P = E + R con Stokes, despejando η; luego ν = η/ρ.')+
    step('1. Datos (CGS)',chain(R`r=\frac{0{,}24}{2}=0{,}12\ \mathrm{cm}`,[R`v_{\mathrm{lím}}=\frac{35}{16}=2{,}1875\ \mathrm{cm/s}`,'movimiento uniforme'],[R`\rho_C=17{,}08\cdot\frac{14{,}59390}{(0{,}3048)^3}\cdot\frac{1}{1000}`,'slug/pie³ → kg/m³ → g/cm³'],R`\rho_C\approx8{,}8027\ \mathrm{g/cm^3}`,R`g=980\ \mathrm{cm/s^2}`))+
    step('a. Viscosidad dinámica',chain(R`\eta=\frac{2r^2g(\rho_C-\rho_L)}{9\,v_{\mathrm{lím}}}`,R`\eta=\frac{2(0{,}12)^2\cdot980\cdot(8{,}8027-1{,}26)}{9\cdot2{,}1875}`,R`\eta\approx10{,}81\ \mathrm{P}`,[R`\eta\approx1{,}081\ \mathrm{Pa\cdot s}`,'1 P = 0,1 Pa·s']))+
    step('b. Viscosidad cinemática',chain(R`\nu=\frac{\eta}{\rho_L}=\frac{10{,}81}{1{,}26}`,R`\nu\approx8{,}58\ \mathrm{St}`,[R`\nu\approx8{,}58\cdot10^{-4}\ \mathrm{m^2/s}`,'1 St = 10⁻⁴ m²/s'])+'<p>La guía obtiene 8,57 St usando η ya redondeada a 10,8 P.</p>')+
    control('Reynolds de la esfera: Re = ρ<sub>L</sub>·v·(2r)/η ≈ 1,26·2,19·0,24/10,8 ≈ 0,061 ≪ 1. Compatible con Stokes; también hace falta que las paredes de la probeta no influyan.'),
    'η ≈ 10,8 P (1,08 Pa·s) · ν ≈ 8,58 St');
  exercise('5.10','Tiempo de caída con otro radio','Una esfera tarda 20 segundos en recorrer con velocidad límite, una distancia entre dos marcas en un líquido de viscosidad η. ¿Cuánto tiempo tardará otra esfera de radio tres veces mayor, si recorre igual distancia en el mismo líquido?',
    note('Supuesto','<p>La respuesta de la guía supone que las dos esferas tienen la <b>misma densidad</b> (mismo material). Si no, faltaría ese dato.</p>')+
    step('1. Cómo depende v del radio',chain(R`v_{\mathrm{lím}}=\frac{2g(\rho_C-\rho_L)}{9\eta}\,r^2`,R`\frac{v_2}{v_1}=\left(\frac{r_2}{r_1}\right)^2=3^2=9`))+
    step('2. Misma distancia: v y t son inversos',chain(R`v_1\,t_1=v_2\,t_2`,R`t_2=t_1\,\frac{v_1}{v_2}=\frac{20}{9}`,R`t_2\approx2{,}22\ \mathrm{s}`))+
    control('No se divide por 3: la velocidad límite depende del <b>cuadrado</b> del radio. Si la esfera grande deja de cumplir Stokes, la predicción no vale.'),
    't₂ ≈ 2,2 s');
  exercise('5.11','Comparación de fuerzas viscosas','La fuerza viscosa para una esfera de 8 cm³ de volumen es de 200 dinas, si cae en un líquido de viscosidad, teniendo velocidad límite = 3 cm/seg. ¿Cuál será la velocidad de otra esfera que cae en el mismo líquido, si su volumen es 1 cm³ y la fuerza viscosa de 600 dinas.',
    plan('la velocidad de la segunda esfera.','fuerza viscosa sobre esferas en el mismo líquido.','Stokes R = 6πrηv para las dos, con el mismo η. Se usan las fuerzas dadas: no hace falta suponer igual densidad.')+
    step('1. Relación de radios (desde los volúmenes)',chain(R`V=\frac43\pi r^3`,R`\frac{r_2}{r_1}=\left(\frac{V_2}{V_1}\right)^{1/3}=\left(\frac18\right)^{1/3}=\frac12`))+
    step('2. Cociente de Stokes',chain(R`\frac{R_2}{R_1}=\frac{r_2\,v_2}{r_1\,v_1}`,R`v_2=v_1\,\frac{R_2}{R_1}\,\frac{r_1}{r_2}`,R`v_2=3\cdot\frac{600}{200}\cdot2`,R`v_2=18\ \mathrm{cm/s}`))+
    note('Límite físico del ejemplo','<p>Volumen 8 veces menor → radio 2 veces menor: la fuerza viscosa depende del radio, no directamente del volumen. Los datos no informan la densidad del líquido, así que no se puede comprobar el Reynolds de las esferas; y si fueran del mismo material, estas fuerzas a velocidad límite no serían compatibles. El resultado es la solución del modelo, no una verificación experimental.</p>'),
    'v₂ = 18 cm/s');

  // Práctica adicional de conservación del caudal.
  exercise('C1','Reducción de diámetro','Por un tubo cilíndrico de 6 cm de diámetro circula agua con velocidad media de 2 m/s. El tubo se estrecha hasta un diámetro de 3 cm. Pregunta: ¿Cuál es la velocidad del agua en la parte angosta?',
    step('1. Planteo',continuity+'<p>Agua incompresible, flujo estacionario y sin pérdidas de caudal.</p>')+step('2. Reemplazo',chain(R`v_2=2\left(\frac{6}{3}\right)^2`,R`v_2=8\ \mathrm{m/s}`)+fix('Corrección de unidad','<p>El manuscrito escribe m/s². Una <b>velocidad</b> se mide en <b>m/s</b>; m/s² es aceleración.</p>')),'8 m/s');
  exercise('C2','Dos secciones consecutivas','Un tubo horizontal transporta agua desde una sección de diámetro 8 cm donde la velocidad es 1,5 m/s, hasta una sección de diámetro 4 cm. Preguntas: 1. ¿Qué velocidad alcanza el agua en la sección angosta? 2. ¿Cuál es el caudal volumétrico en m³/s?',
    step('1. Velocidad',continuity+chain(R`v_2=1{,}5\left(\frac{8}{4}\right)^2=6\ \mathrm{m/s}`))+step('2. Caudal en SI',chain(R`d_1=8\ \mathrm{cm}=0{,}08\ \mathrm{m}`,R`Q=\frac{\pi d_1^2}{4}v_1`,R`Q=\frac{\pi(0{,}08)^2}{4}\cdot1{,}5`,R`Q=0{,}007540\ \mathrm{m^3/s}`)),'6 m/s; 0,007540 m³/s');
  exercise('C3','Derivación en dos ramas','Un caño de 10 cm de diámetro transporta agua con velocidad 1,2 m/s. A cierta distancia se bifurca en dos ramas: - Rama A: diámetro 6 cm. - Rama B: diámetro 4 cm. Pregunta: ¿Cuál es la velocidad en cada rama, suponiendo que ambas transportan agua con el mismo caudal volumétrico?',
    step('1. Reparto del caudal',sym([['Q_0','caudal del caño principal','m³/s'],['Q_A,Q_B','caudales en las ramas','m³/s']])+chain(R`Q_0=Q_A+Q_B`,R`Q_A=Q_B=\frac{Q_0}{2}`,R`Q_0=\frac{\pi(0{,}10)^2}{4}\cdot1{,}2=0{,}009425\ \mathrm{m^3/s}`))+step('2. Velocidad en cada rama',chain(R`v_i=\frac{Q_i}{A_i}`,R`v_A=\frac{1{,}2}{2}\left(\frac{10}{6}\right)^2=1{,}667\ \mathrm{m/s}`,R`v_B=\frac{1{,}2}{2}\left(\frac{10}{4}\right)^2=3{,}75\ \mathrm{m/s}`)+'<p>Igual caudal no implica igual velocidad: la rama más angosta requiere mayor velocidad.</p>'),'Rama A: 1,667 m/s; rama B: 3,75 m/s');
  exercise('C4','Tubería en pendiente','Un tubo de 12 cm de diámetro transporta agua con velocidad 2 m/s. Más adelante se conecta con un tubo de 6 cm de diámetro, inclinado hacia abajo. Preguntas: 1. ¿Qué velocidad lleva el agua en el tramo angosto? 2. ¿Cuánto tiempo tarda en recorrer 15 m de ese tramo?',
    step('1. Continuidad',continuity+chain(R`v_2=2\left(\frac{12}{6}\right)^2=8\ \mathrm{m/s}`)+'<p>La inclinación modifica las condiciones de presión; con el caudal dado, la velocidad media se fija por la sección.</p>')+step('2. Tiempo',sym([['L','longitud recorrida por el tramo','m'],['t','tiempo de recorrido','s']])+chain(R`t=\frac{L}{v_2}`,R`t=\frac{15}{8}=1{,}875\ \mathrm{s}`)+'<p>Se usa la velocidad media constante del tramo, como aproximación de este ejercicio.</p>'),'8 m/s; 1,875 s');
  exercise('C5','Sistema de riego','Un sistema de riego utiliza un tubo principal de 20 cm de diámetro, por donde fluye agua con velocidad 0,8 m/s. El tubo alimenta simultáneamente 4 ramales idénticos de diámetro 5 cm cada uno. Preguntas: 1. ¿Cuál es la velocidad del agua en cada ramal? 2. ¿Cuál es el caudal total del sistema en litros por segundo?',
    step('1. Reparto uniforme','<p>Suponemos ramales con las mismas condiciones hidráulicas: cada uno recibe un cuarto del caudal.</p>'+chain(R`Q_0=4Q_r`,R`S_0v_0=4S_rv_r`,R`v_r=\frac{v_0}{4}\left(\frac{d_0}{d_r}\right)^2`,R`v_r=\frac{0{,}8}{4}\left(\frac{20}{5}\right)^2=3{,}2\ \mathrm{m/s}`))+step('2. Caudal total',chain(R`Q_0=\frac{\pi d_0^2}{4}v_0`,R`Q_0=\frac{\pi(0{,}20)^2}{4}\cdot0{,}8=0{,}025133\ \mathrm{m^3/s}`,R`1\ \mathrm{m^3}=1000\ \mathrm{L}`,R`Q_0=25{,}13\ \mathrm{L/s}`)),'3,2 m/s en cada ramal; 25,13 L/s en total');

  add('guia','Guía resuelta · Actividad n.º 8','GUÍA ORIGINAL · 17',`
<p>Los once ejercicios de la guía de <b>Circulación de fluidos</b>, con la numeración impresa. Cada resolución sigue el mismo orden: <b>qué piden → fenómeno → datos → unidades → ley → despeje → reemplazo → resultado → control</b>. Si un resultado difiere de la guía, se explica en el ejercicio.</p>
${table(['Ejercicio','Tema','Sección de teoría'],[['5.1','Caudal y volumen','Caudal y velocidad'],['5.2 · 5.3','Continuidad','Conservación del caudal'],['5.4','Viscosímetro de cilindros','Viscosidad dinámica'],['5.5','Caudal máximo laminar','Número de Reynolds'],['5.6','Laminar: Poiseuille y potencia','Poiseuille · Potencia'],['5.7','Turbulento: Fanning y potencia','Fanning · Potencia'],['5.8','Comparar caudales','Poiseuille'],['5.9','Viscosidad por caída de esfera','Medir viscosidad con una esfera'],['5.10 · 5.11','Velocidad límite y Stokes','Stokes · Velocidad límite']])}
<div data-hidro-guide></div>`);
  add('ejercicios-caudal','Práctica extra · conservación del caudal','PRÁCTICA · 18',`
<p>Cinco ejercicios más de continuidad, incluidas bifurcaciones y ramales.</p>
<div data-hidro-caudal></div>`);

  // ---------- 19. Repaso ----------
  add('repaso','Elegir el camino y repasar','ERRORES Y TARJETAS · 19',`
<h3>¿Por dónde empiezo?</h3>
${table(['Si el problema pide…','Empezá por…','Verificá…'],[['Volumen transportado','Caudal a partir de área y velocidad; luego × tiempo','Velocidad media y tiempo en unidades compatibles'],['Velocidad al cambiar el diámetro','Continuidad','Mismo flujo, sin acumulación ni ramificaciones; densidad constante'],['Fuerza entre capas o cilindros','Ley de Newton de viscosidad','Área de contacto, separación y diferencia de velocidades'],['Régimen en un tubo','Número de Reynolds','Diámetro y viscosidad dinámica (o cinemática bien diferenciada)'],['Presión en flujo laminar','Poiseuille','Tubo circular, flujo desarrollado, fluido newtoniano'],['Presión en flujo turbulento','Fanning con la correlación de la guía','Convención del factor y alcance de la correlación'],['Potencia comunicada al líquido','Caída de presión × caudal','Resultado en W si se usa SI'],['Velocidad límite o viscosidad por esfera','Equilibrio peso, empuje y Stokes','Radio, densidades y Re de la esfera pequeño'],['Comparar dos situaciones','Cociente de las fórmulas','Qué parámetros realmente se conservan']])}
${idea('Antes de cerrar una cuenta, comprobá tres cosas',`<p><b>las unidades</b>, <b>el sentido físico</b> y <b>las condiciones del modelo</b>. Un tubo más ancho con el mismo caudal debe dar menor velocidad; más viscosidad, a igual geometría y caudal, debe exigir más presión; una esfera a velocidad límite tiene fuerza neta cero aunque esté en movimiento.</p>`)}
<h3>Conceptos</h3>
${cards([
 ['Concepto','¿Qué es el caudal?','Volumen que atraviesa una sección por unidad de tiempo: Q = V/t = S·v.'],
 ['Concepto','¿Qué velocidad es v en Q = S·v?','La velocidad media de la sección (Q/S), no la máxima del centro.'],
 ['Concepto','¿Qué dice la continuidad?','Sin fugas, estacionario, densidad constante: S₁v₁ = S₂v₂. Si la sección baja, la velocidad sube.'],
 ['Concepto','Laminar vs. turbulento','Laminar: capas ordenadas, poca mezcla (igual hay rozamiento). Turbulento: remolinos, mezcla, más pérdida de presión.'],
 ['Concepto','¿Qué mide la viscosidad dinámica?','La resistencia a que capas vecinas deslicen: f_R = ηA·Δv/Δx.'],
 ['Concepto','No deslizamiento','El fluido en contacto con una pared quieta tiene velocidad cero.'],
 ['Concepto','¿Qué indica Reynolds?','Compara inercia con viscosidad. Guía: < 2100 laminar; 2100–3000 transición; > 3000 turbulento.'],
 ['Concepto','¿Cuándo vale Poiseuille?','Laminar, estacionario, desarrollado, tubo circular recto, fluido newtoniano, densidad constante.'],
 ['Concepto','¿Cuándo uso Fanning?','Cuando Re indica turbulento: f = 0,0014 + 0,125·Re^(−0,32) y Δp = fQ²ρl/(π²r⁵).'],
 ['Concepto','¿Qué es la velocidad límite?','La velocidad constante cuando P = E + R (a = 0). Sigue cayendo.'],
 ['Concepto','Dos Reynolds','Tubo: diámetro del tubo y velocidad media (2100). Esfera: diámetro de la esfera y Re ≪ 1 para Stokes.']
])}
<h3>Unidades</h3>
${cards([
 ['Unidades','Caudal','m³/s · cm³/s. 1 L = 10⁻³ m³ = 1000 cm³.'],
 ['Unidades','Viscosidad dinámica','Pa·s = kg/(m·s). 1 P = 0,1 Pa·s. 1 cP = 0,01 P = 10⁻³ Pa·s.'],
 ['Unidades','Viscosidad cinemática','m²/s · St. 1 St = 1 cm²/s = 10⁻⁴ m²/s.'],
 ['Unidades','Presión','1 ba = 0,1 Pa (baria, no bar). 1 atm = 101 325 Pa.'],
 ['Unidades','Potencia','Pa·m³/s = W · ba·cm³/s = erg/s. 1 W = 10⁷ erg/s.'],
 ['Unidades','Unidades inglesas','1 pulg = 2,54 cm · 1 pulg³ = 16,387 cm³ · 1 lb/pie³ ≈ 16,02 kg/m³ · 1 slug/pie³ ≈ 0,5154 g/cm³.']
])}
<h3>Errores frecuentes</h3>
${cards([
 ['Error','v₂ = v₁·(d₁/d₂)','Falta el cuadrado: v₂ = v₁(d₁/d₂)². Con 1 → 1,5 pulg da 4,44 cm/s, no 6,67.'],
 ['Error','Usar d donde va r','S = πr² o S = πd²/4; Poiseuille usa r⁴; Reynolds usa d.'],
 ['Error','Confundir S con A','S: sección por donde pasa el caudal. A: área de contacto entre capas (viscosímetro: 2πr·h).'],
 ['Error','No elevar el factor de conversión','Áreas: al cuadrado. Volúmenes: al cubo (1 pulg³ = 2,54³ cm³).'],
 ['Error','Mezclar P con cP','1 cP = 0,01 P. Revisá la unidad antes de calcular Re.'],
 ['Error','Poiseuille sin mirar el régimen','Primero Reynolds. Si es turbulento, Fanning.'],
 ['Error','Darcy en lugar de Fanning','f_D = 4f_F: multiplica la pérdida por 4.'],
 ['Error','Olvidar el empuje','En la velocidad límite va (ρ_C − ρ_L), no sólo ρ_C.'],
 ['Error','Confundir rozamiento con fuerza neta','A velocidad límite R = P − E, pero la fuerza neta es cero.'],
 ['Error','Velocidad en m/s²','Una velocidad va en m/s; m/s² es aceleración.']
])}
`);

  window.ET27_HIDRO={
    title:'Circulación de fluidos',
    lead:'Hidrodinámica y viscosidad: caudal, continuidad, regímenes, viscosidad, Reynolds, Poiseuille, Fanning, potencia, Stokes y velocidad límite, con la guía completa resuelta.',
    sections, exercises
  };
})();
