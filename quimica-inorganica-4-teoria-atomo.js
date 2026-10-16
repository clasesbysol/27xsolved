// 27xSOLved · Química Inorgánica 4.º · TEORÍA · Unidad 1: Estructura atómica
// De la materia al átomo, los modelos atómicos (Demócrito → Schrödinger), números cuánticos,
// principios de Pauli, Aufbau y Hund, configuración electrónica, magnetismo y configuraciones estables.
// Fuente: diapositivas «Estructura atómica · Química Inorgánica» (51 páginas). Lo que no está en las
// diapositivas y se agrega para estudiar mejor se marca como ampliación o en recuadros ✎.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {chain,idea,warn,fix,note,deep,example,step,table,figure,cards,simple}=K;
  const {punch,facts,svg:qsvg}=Q;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qi-at-${k}`,label:l,kicker:`ESTRUCTURA ATÓMICA · ${kk}`,html:h});
  const ver=(id,label)=>`<p class="guideLink">🔗 Lo usamos en: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;
  const amp=t=>`<span class="qiAmp">ampliación</span>${t||''}`;
  const sup=n=>String(n).replace(/[0-9]/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  const chg=q=>q?(Math.abs(q)===1?'':sup(Math.abs(q)))+(q>0?'⁺':'⁻'):'';

  // =====================================================================
  // ESQUEMAS SVG (usan las clases del tema: se ven bien en claro y oscuro)
  // =====================================================================
  const defs=id=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>`;
  const T=(x,y,t,cls='strong',anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="svgText ${cls}">${t}</text>`;
  const e=(x,y,r=5)=>`<circle cx="${x}" cy="${y}" r="${r}" class="svgMolecule"/>`;
  const svg={};

  svg.escalera=`<svg viewBox="0 0 660 150" role="img" aria-label="La materia está formada por moléculas o iones, que están formados por átomos, que están formados por protones, neutrones y electrones">
    ${defs('atArrE')}
    ${[['Materia',['lo que vemos','y tocamos']],['Moléculas o iones',['H₂O · Na⁺ · Cl⁻']],['Átomos',['menor porción','de un elemento']],['p⁺ · n⁰ · e⁻',['partículas','subatómicas']]].map(([a,b],i)=>{const x=8+i*165;return `<rect x="${x}" y="30" width="150" height="82" rx="14" class="svgLineFill ${i===3?'svgSection':'svgSoft'}"/>${T(x+75,60,a)}${b.map((l,j)=>T(x+75,82+j*16,l,'qiSmall')).join('')}${i<3?`<line x1="${x+152}" y1="71" x2="${x+163}" y2="71" class="svgArrow" marker-end="url(#atArrE)"/>`:''}`}).join('')}
    ${T(330,22,'cada vez más chico →','qiSmall')}
    ${T(330,136,'Cada elemento químico se identifica por su número de protones: el número atómico Z','qiSmall')}
  </svg>`;

  svg.nucleo=`<svg viewBox="0 0 660 230" role="img" aria-label="Átomo con núcleo de protones y neutrones y nube de electrones alrededor">
    ${[100,80,60,40].map((r,i)=>`<circle cx="150" cy="115" r="${r}" class="qiCloud" opacity="${0.35+i*0.15}"/>`).join('')}
    ${[[136,108,'p'],[150,102,'n'],[164,110,'p'],[142,122,'n'],[158,124,'p'],[150,114,'n']].map(([x,y,k])=>`<circle cx="${x}" cy="${y}" r="7" class="${k==='p'?'svgAccentFill':'svgBall'}"/>`).join('')}
    ${e(80,70)}${e(222,92)}${e(110,190)}${e(205,170)}${e(60,140)}
    <line x1="175" y1="112" x2="300" y2="60" class="svgLayer"/><line x1="226" y1="92" x2="300" y2="150" class="svgLayer"/>
    ${T(310,48,'Núcleo','strong','start')}${T(310,68,'protones (+) y neutrones (sin carga)','qiSmall','start')}${T(310,86,'casi toda la masa · tamaño ≈ 10⁻¹⁵ m','qiSmall','start')}
    ${T(310,144,'Zona extranuclear','strong','start')}${T(310,164,'electrones (−) moviéndose alrededor','qiSmall','start')}${T(310,182,'casi todo el volumen · átomo ≈ 10⁻¹⁰ m','qiSmall','start')}
    ${T(330,226,'(el núcleo está dibujado gigante: a escala sería invisible)','qiSmall')}
  </svg>`;

  svg.modelos=`<svg viewBox="0 0 660 235" role="img" aria-label="Evolución de los modelos atómicos: Dalton, Thomson, Rutherford, Bohr y Schrödinger">
    ${defs('atArrM')}
    <!-- Dalton -->
    <circle cx="66" cy="92" r="40" class="svgBall"/>
    <!-- Thomson -->
    <circle cx="198" cy="92" r="44" class="svgSection"/>
    ${[[178,72],[214,70],[190,100],[220,108],[172,112],[204,128],[196,60]].map(([x,y])=>e(x,y,5)).join('')}
    ${[[200,86],[182,90],[214,92],[190,120]].map(([x,y])=>T(x,y+5,'+','strong')).join('')}
    <!-- Rutherford -->
    <ellipse cx="330" cy="92" rx="46" ry="20" class="svgCurve" transform="rotate(-25 330 92)"/>
    <ellipse cx="330" cy="92" rx="46" ry="20" class="svgCurve" transform="rotate(35 330 92)"/>
    <ellipse cx="330" cy="92" rx="44" ry="18" class="svgCurve" transform="rotate(95 330 92)"/>
    <circle cx="330" cy="92" r="5" class="svgAccentFill"/>${e(368,74,4)}${e(300,124,4)}${e(338,46,4)}
    <!-- Bohr -->
    ${[18,32,46].map(r=>`<circle cx="462" cy="92" r="${r}" class="svgLine"/>`).join('')}
    <circle cx="462" cy="92" r="6" class="svgAccentFill"/>${e(480,92,4)}${e(462,60,4)}${e(430,108,4)}${e(497,72,4)}
    <!-- Schrödinger -->
    ${[48,38,28,18].map((r,i)=>`<circle cx="594" cy="92" r="${r}" class="qiCloud" opacity="${0.3+i*0.18}"/>`).join('')}
    <circle cx="594" cy="92" r="5" class="svgAccentFill"/>
    ${[[66,'Dalton','1808','esfera maciza','indivisible'],[198,'Thomson','1904','budín de pasas','e⁻ en esfera +'],[330,'Rutherford','1911','núcleo + vacío','e⁻ “planetas”'],[462,'Bohr','1913','órbitas fijas','saltos de energía'],[594,'Schrödinger','1926','orbitales','nube de probabilidad']].map(([x,n,y,a,b])=>`${T(x,160,n)}${T(x,178,y,'qiSmall')}${T(x,198,a,'qiSmall')}${T(x,214,b,'qiSmall')}`).join('')}
    <line x1="20" y1="228" x2="640" y2="228" class="svgArrow" marker-end="url(#atArrM)"/>
  </svg>`;

  svg.democrito=`<svg viewBox="0 0 660 150" role="img" aria-label="Idea de Demócrito: dividir un material una y otra vez hasta llegar a una porción indivisible, el átomo">
    ${defs('atArrD')}
    <rect x="14" y="44" width="120" height="60" rx="6" class="svgSection"/>
    <line x1="140" y1="74" x2="172" y2="74" class="svgArrow" marker-end="url(#atArrD)"/>
    <rect x="178" y="44" width="56" height="60" rx="6" class="svgSection"/><rect x="240" y="44" width="56" height="60" rx="6" class="svgSection"/>
    <line x1="302" y1="74" x2="334" y2="74" class="svgArrow" marker-end="url(#atArrD)"/>
    ${[0,1,2,3].map(i=>`<rect x="${340+i*30}" y="44" width="26" height="60" rx="5" class="svgSection"/>`).join('')}
    <line x1="464" y1="74" x2="496" y2="74" class="svgArrow" marker-end="url(#atArrD)"/>${T(510,79,'…','strong')}
    <line x1="524" y1="74" x2="556" y2="74" class="svgArrow" marker-end="url(#atArrD)"/>
    <circle cx="600" cy="74" r="16" class="svgBall"/>
    ${T(74,128,'material','qiSmall')}${T(237,128,'2 mitades','qiSmall')}${T(398,128,'4 cuartos','qiSmall')}${T(600,128,'ÁTOMO','strong')}${T(600,144,'(a-tomo: “sin división”)','qiSmall')}
  </svg>`;

  svg.rutherford=`<svg viewBox="0 0 660 270" role="img" aria-label="Experimento de la lámina de oro: la mayoría de las partículas alfa atraviesa sin desviarse, unas pocas se desvían y muy pocas rebotan. En el zoom se ve que el átomo es casi todo vacío con un núcleo muy pequeño">
    ${defs('atArrR')}
    <circle cx="250" cy="128" r="104" class="svgLayer" fill="none"/>
    <rect x="8" y="110" width="84" height="36" rx="8" class="svgLineFill svgSoft"/>${T(50,133,'fuente α')}
    <line x1="92" y1="128" x2="244" y2="128" class="svgArrow thick"/>
    <rect x="245" y="40" width="9" height="176" rx="2" fill="#d4a72c"/>
    <line x1="256" y1="128" x2="346" y2="128" class="svgArrow" marker-end="url(#atArrR)"/>
    <line x1="256" y1="122" x2="346" y2="114" class="svgArrow" marker-end="url(#atArrR)"/>
    <line x1="256" y1="134" x2="346" y2="142" class="svgArrow" marker-end="url(#atArrR)"/>
    <line x1="256" y1="118" x2="320" y2="62" class="svgArrow" marker-end="url(#atArrR)"/>
    <line x1="256" y1="138" x2="314" y2="200" class="svgArrow" marker-end="url(#atArrR)"/>
    <path d="M244 124 L168 86" class="svgArrow" marker-end="url(#atArrR)"/>
    ${T(250,250,'lámina de oro muy fina','qiSmall')}${T(250,18,'pantalla que marca dónde llega cada α','qiSmall')}
    ${T(352,156,'la mayoría','qiSmall','start')}${T(330,58,'pocas se desvían','qiSmall','start')}${T(150,78,'muy pocas rebotan','qiSmall','end')}
    <!-- zoom -->
    <circle cx="546" cy="134" r="106" class="svgLineFill svgSoft"/>
    ${T(546,18,'Hagamos zoom en la lámina','strong')}
    ${[[504,90],[588,90],[504,178],[588,178],[546,134]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" class="svgAccentFill"/><circle cx="${x}" cy="${y}" r="40" class="svgLayer" fill="none"/>`).join('')}
    <line x1="446" y1="112" x2="648" y2="112" class="svgArrow" marker-end="url(#atArrR)"/>
    <line x1="446" y1="158" x2="648" y2="158" class="svgArrow" marker-end="url(#atArrR)"/>
    <path d="M446 128 L530 128 Q544 126 606 74" class="svgArrow" marker-end="url(#atArrR)"/>
    <path d="M446 90 L490 90" class="svgArrow"/><path d="M490 94 L450 108" class="svgArrow" marker-end="url(#atArrR)"/>
    ${T(546,262,'núcleo diminuto (+) y mucho vacío','qiSmall')}
  </svg>`;

  const wave=(x,y,len,amp=6,per=12)=>{let d=`M${x} ${y}`;for(let i=0;i<len/per;i++)d+=` q ${per/4} ${-amp} ${per/2} 0 q ${per/4} ${amp} ${per/2} 0`;return `<path d="${d}" stroke="#e08a2e" stroke-width="2.5" fill="none"/>`};
  svg.bohr=`<svg viewBox="0 0 660 250" role="img" aria-label="Modelo de Bohr: al absorber energía el electrón salta a una órbita más externa (excitación); al volver a una órbita interna emite un fotón (relajación)">
    ${defs('atArrB')}
    ${[[150,'EXCITACIÓN','absorbe energía y “salta”'],[480,'RELAJACIÓN','vuelve y emite luz (fotón)']].map(([cx,t,sub])=>`${[34,62,90].map((r,i)=>`<circle cx="${cx}" cy="120" r="${r}" class="svgLine"/>${T(cx+r*0.71+6,120-r*0.71-4,'n='+(i+1),'qiSmall','start')}`).join('')}<circle cx="${cx}" cy="120" r="8" class="svgAccentFill"/>${T(cx,232,t)}${T(cx,248,sub,'qiSmall')}`).join('')}
    ${e(116,120,6)}<path d="M112 128 Q 80 170 92 190" class="svgArrow" marker-end="url(#atArrB)"/>${e(97,187,6)}
    <path d="M20 40 L66 72" stroke="#e08a2e" stroke-width="3" marker-end="url(#atArrB)"/>${T(14,32,'energía (calor, luz)','qiSmall','start')}
    ${e(570,120,6)}<path d="M566 112 Q 540 100 518 116" class="svgArrow" marker-end="url(#atArrB)"/>${e(514,120,6)}
    ${wave(578,150,64)}<path d="M640 150 l-8 -5 v10z" fill="#e08a2e"/>${T(600,180,'fotón','qiSmall')}
  </svg>`;

  // Orbitales: lóbulos dibujados con elipses rotadas.
  const lobe=(cx,cy,a,alt=false,rx=22,ry=11)=>`<g transform="translate(${cx} ${cy}) rotate(${a})"><ellipse cx="${rx}" cy="0" rx="${rx}" ry="${ry}" class="qiLobe${alt?' alt':''}"/></g>`;
  const axes=(cx,cy)=>`<line x1="${cx-46}" y1="${cy}" x2="${cx+46}" y2="${cy}" class="svgLayer"/><line x1="${cx}" y1="${cy-46}" x2="${cx}" y2="${cy+46}" class="svgLayer"/><line x1="${cx-30}" y1="${cy+24}" x2="${cx+30}" y2="${cy-24}" class="svgLayer"/>`;
  svg.orbitales=`<svg viewBox="0 0 660 215" role="img" aria-label="Formas de los orbitales: s esférico; p con dos lóbulos sobre los ejes x, y, z; dos ejemplos de orbitales d">
    ${axes(60,92)}<circle cx="60" cy="92" r="32" class="qiLobe"/>
    ${axes(170,92)}${lobe(170,92,0)}${lobe(170,92,180,true)}
    ${axes(280,92)}${lobe(280,92,-39,false,20,10)}${lobe(280,92,141,true,20,10)}
    ${axes(390,92)}${lobe(390,92,-90)}${lobe(390,92,90,true)}
    ${axes(505,92)}${lobe(505,92,-45,false,20,10)}${lobe(505,92,135,false,20,10)}${lobe(505,92,45,true,20,10)}${lobe(505,92,-135,true,20,10)}
    ${axes(612,92)}${lobe(612,92,-90,false,24,10)}${lobe(612,92,90,false,24,10)}<ellipse cx="612" cy="92" rx="22" ry="7" class="qiLobe alt"/>
    ${[[60,'s','l = 0 · esférico'],[170,'p_x','sobre el eje x'],[280,'p_y','sobre el eje y'],[390,'p_z','sobre el eje z'],[505,'d_xy','l = 2 (ejemplo)'],[612,'d_z²','l = 2 (ejemplo)']].map(([x,a,b])=>`${T(x,166,a.replace(/_(.+)$/,'<tspan font-size="10" dy="4">$1</tspan>'))}${T(x,184,b,'qiSmall')}`).join('')}
    ${T(280,206,'l = 1 · tres orientaciones (m = −1, 0, +1)','qiSmall')}
  </svg>`;

  // Regla de las diagonales.
  const SUB=['s','p','d','f'],SUBC=['#3b8fd9','#2e9d6a','#e08a2e','#7d6bd6'];
  const maxL={1:0,2:1,3:2,4:3,5:3,6:2,7:1};
  const cellX=l=>36+l*76,cellY=n=>30+(n-1)*38;
  svg.aufbau=(()=>{
    let cells='',diag='',order=[];
    for(let n=1;n<=7;n++)for(let l=0;l<=maxL[n];l++)cells+=`<rect x="${cellX(l)}" y="${cellY(n)}" width="56" height="26" rx="8" class="svgSoft"/><rect x="${cellX(l)}" y="${cellY(n)}" width="56" height="26" rx="8" fill="${SUBC[l]}" fill-opacity=".22" stroke="${SUBC[l]}" stroke-width="1.5"/>${T(cellX(l)+28,cellY(n)+18,n+SUB[l])}`;
    for(let c=1;c<=8;c++){
      const list=[];for(let l=3;l>=0;l--){const n=c-l;if(n>=1&&n<=7&&l<=maxL[n])list.push([n,l])}
      if(!list.length)continue;list.forEach(([n,l])=>order.push(n+SUB[l]));
      const [n1,l1]=list[0],[n2,l2]=list[list.length-1];
      const x1=cellX(l1)+60,y1=cellY(n1)-6,x2=cellX(l2)-2,y2=cellY(n2)+32;
      diag+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="svgArrow" marker-end="url(#atArrA)" opacity=".85"/>`;
    }
    const cap={s:2,p:6,d:10,f:14};
    const chips=order.map((o,i)=>{const col=i%4,row=Math.floor(i/4),x=372+col*70,y=48+row*42,l=SUB.indexOf(o.slice(-1));return `<rect x="${x}" y="${y}" width="60" height="30" rx="9" fill="${SUBC[l]}" fill-opacity=".22" stroke="${SUBC[l]}" stroke-width="1.5"/>${T(x+30,y+20,o+sup(cap[o.slice(-1)]))}`}).join('');
    return `<svg viewBox="0 0 660 310" role="img" aria-label="Regla de las diagonales: orden de llenado 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p">
      ${defs('atArrA')}${diag}${cells}
      ${T(170,16,'Escribí la tabla y seguí las flechas','qiSmall')}
      ${T(510,30,'Orden de llenado (máximo de e⁻)','qiSmall')}${chips}
      ${T(510,298,'s 2 · p 6 · d 10 · f 14','qiSmall')}
    </svg>`;
  })();

  const boxes=(x,y,list,w=34)=>list.map((c,i)=>`<rect x="${x+i*w}" y="${y}" width="${w}" height="34" class="svgLineFill svgSoft"/>${c?T(x+i*w+w/2,y+24,c):''}`).join('');
  svg.hund=`<svg viewBox="0 0 660 205" role="img" aria-label="Regla de Hund para tres electrones en orbitales 2p: correcto un electrón por orbital con el mismo spin; incorrecto aparearlos o poner spines opuestos">
    ${[[20,['↑','↑','↑'],'✔ Correcto','uno por “asiento”, todos ↑','#2e9d6a'],[240,['↑↓','↑',''],'✘ Incorrecto','apareó antes de tiempo','#d6332a'],[460,['↑','↓','↑'],'✘ Incorrecto','spines no paralelos','#d6332a']].map(([x,l,t,sub,c])=>`<rect x="${x}" y="20" width="180" height="168" rx="16" class="svgLineFill svgSoft"/>${T(x+90,48,'2p³ (nitrógeno)','qiSmall')}${boxes(x+39,70,l)}${T(x+56,124,'m = −1','qiSmall')}${T(x+124,124,'+1','qiSmall')}<text x="${x+90}" y="154" text-anchor="middle" class="svgText strong" fill="${c}" style="fill:${c}">${t}</text>${T(x+90,174,sub,'qiSmall')}`).join('')}
  </svg>`;

  // Diagrama de energía del sodio.
  const level=(x,y,n,lab,fill)=>`${boxes(x,y,fill.slice(0,n),30)}${T(x-12,y+22,lab,'strong','end')}`;
  svg.energiaNa=`<svg viewBox="0 0 660 290" role="img" aria-label="Diagrama de energía del sodio: 1s2 2s2 2p6 3s1">
    ${defs('atArrN')}
    <line x1="40" y1="280" x2="40" y2="16" class="svgArrow" marker-end="url(#atArrN)"/>
    <text x="28" y="150" transform="rotate(-90 28 150)" text-anchor="middle" class="svgText qiSmall">energía</text>
    ${level(110,236,1,'1s',['↑↓'])}${level(110,176,1,'2s',['↑↓'])}${level(230,150,3,'2p',['↑↓','↑↓','↑↓'])}
    ${level(110,96,1,'3s',['↑'])}${level(230,72,3,'3p',['','',''])}${level(110,40,1,'4s',[''])}${level(360,26,5,'3d',['','','','',''])}
    ${T(545,110,'Na · Z = 11','strong')}${T(545,132,'1s² 2s² 2p⁶ 3s¹','strong')}${T(545,156,'11 electrones','qiSmall')}${T(545,176,'1 desapareado:','qiSmall')}${T(545,192,'paramagnético','qiSmall')}
    ${T(545,236,'Ojo: el 4s queda más abajo','qiSmall')}${T(545,254,'que el 3d: se llena antes','qiSmall')}
  </svg>`;

  // =====================================================================
  // WIDGETS: configuración electrónica y explorador de números cuánticos
  // =====================================================================
  const SYM='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
  const NAME='Hidrógeno,Helio,Litio,Berilio,Boro,Carbono,Nitrógeno,Oxígeno,Flúor,Neón,Sodio,Magnesio,Aluminio,Silicio,Fósforo,Azufre,Cloro,Argón,Potasio,Calcio,Escandio,Titanio,Vanadio,Cromo,Manganeso,Hierro,Cobalto,Níquel,Cobre,Cinc,Galio,Germanio,Arsénico,Selenio,Bromo,Kriptón,Rubidio,Estroncio,Itrio,Circonio,Niobio,Molibdeno,Tecnecio,Rutenio,Rodio,Paladio,Plata,Cadmio,Indio,Estaño,Antimonio,Teluro,Iodo,Xenón,Cesio,Bario,Lantano,Cerio,Praseodimio,Neodimio,Prometio,Samario,Europio,Gadolinio,Terbio,Disprosio,Holmio,Erbio,Tulio,Iterbio,Lutecio,Hafnio,Tantalio,Wolframio,Renio,Osmio,Iridio,Platino,Oro,Mercurio,Talio,Plomo,Bismuto,Polonio,Astato,Radón,Francio,Radio,Actinio,Torio,Protactinio,Uranio,Neptunio,Plutonio,Americio,Curio,Berkelio,Californio,Einstenio,Fermio,Mendelevio,Nobelio,Lawrencio,Rutherfordio,Dubnio,Seaborgio,Bohrio,Hasio,Meitnerio,Darmstatio,Roentgenio,Copernicio,Nihonio,Flerovio,Moscovio,Livermorio,Teneso,Oganesón'.split(',');
  const ORDER=['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
  const CAP={s:2,p:6,d:10,f:14},LV={s:0,p:1,d:2,f:3};
  const NOBLE=[[2,'He'],[10,'Ne'],[18,'Ar'],[36,'Kr'],[54,'Xe'],[86,'Rn']];
  // Configuraciones anómalas reales más conocidas (corrimientos respecto de Aufbau).
  const ANOM={24:{'4s':-1,'3d':1},29:{'4s':-1,'3d':1},41:{'5s':-1,'4d':1},42:{'5s':-1,'4d':1},44:{'5s':-1,'4d':1},45:{'5s':-1,'4d':1},46:{'5s':-2,'4d':2},47:{'5s':-1,'4d':1},78:{'6s':-1,'5d':1},79:{'6s':-1,'5d':1}};
  const aufbau=N=>{const o={};let left=N;for(const sh of ORDER){if(left<=0)break;const k=Math.min(CAP[sh.slice(-1)],left);o[sh]=k;left-=k}return o};
  const parseZ=v=>{v=String(v||'').trim();if(/^\d+$/.test(v))return Number(v);const i=SYM.findIndex(x=>x.toLowerCase()===v.toLowerCase());if(i>=0)return i+1;const j=NAME.findIndex(x=>x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')===v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''));return j>=0?j+1:NaN};
  const cfgStr=(o,keys)=>keys.filter(k=>o[k]>0).map(k=>`${k}${sup(o[k])}`).join(' ');
  const boxHtml=(sh,k)=>{const l=LV[sh.slice(-1)],nb=2*l+1,arr=[];for(let i=0;i<nb;i++)arr.push('');for(let i=0;i<k;i++){const j=i%nb;arr[j]+=i<nb?'↑':'↓'}return `<div class="qiSub"><div class="qiBoxes">${arr.map(a=>`<i>${a}</i>`).join('')}</div><small>${sh}</small></div>`};
  const unpaired=o=>Object.entries(o).reduce((acc,[sh,k])=>{const nb=2*LV[sh.slice(-1)]+1;return acc+(k<=nb?k:2*nb-k)},0);
  const lastElectron=(sh,k)=>{const l=LV[sh.slice(-1)],nb=2*l+1,i=k-1;const m=-l+(i%nb);const s=i<nb?'+½':'−½';return {n:Number(sh.slice(0,-1)),l,m,s}};
  K.calcs.atomCfg=root=>{
    const Z=parseZ(root.querySelector('[name="z"]').value),q=Math.round(Number(String(root.querySelector('[name="q"]').value||'0').replace(',','.'))||0);
    if(!(Z>=1&&Z<=118))return '<b>Escribí un número atómico (1 a 118), un símbolo (Na) o un nombre (sodio).</b>';
    const N=Z-q;if(N<0)return '<b>Con esa carga no le quedan electrones.</b>';
    if(N===0)return `<b>${SYM[Z-1]}${chg(q)}</b>: no le queda ningún electrón (es sólo el núcleo).`;
    // Neutro (con anomalías) y después ion.
    let o=aufbau(q<0?N:Z);const an=ANOM[Z];
    if(an&&q>=0)Object.entries(an).forEach(([k,d])=>{o[k]=(o[k]||0)+d});
    let removedNote='';
    if(q>0){
      let r=q;const byOut=Object.keys(o).filter(k=>o[k]>0).sort((a,b)=>(Number(b.slice(0,-1))-Number(a.slice(0,-1)))||(LV[b.slice(-1)]-LV[a.slice(-1)]));
      for(const k of byOut){if(r<=0)break;const t=Math.min(o[k],r);o[k]-=t;r-=t}
      if(Object.keys(an||{}).length||['3d','4d','5d'].some(k=>o[k]>0))removedNote='<br><small>En los cationes se sacan primero los electrones del nivel más alto (el ns), aunque en el llenado hayan entrado antes que los (n−1)d.</small>';
    }
    const keys=ORDER.filter(k=>o[k]>0);
    const full=cfgStr(o,keys);
    const ng=[...NOBLE].reverse().find(([n])=>n<N&&ORDER.slice(0,ORDER.indexOf(Object.keys(aufbau(n)).pop())+1).every(k=>(o[k]||0)===CAP[k.slice(-1)]));
    let abbr='';if(ng){const inner=Object.keys(aufbau(ng[0]));abbr=`[${ng[1]}] ${cfgStr(o,keys.filter(k=>!inner.includes(k)))}`}
    const nmax=Math.max(...keys.map(k=>Number(k.slice(0,-1))));
    const cee=keys.filter(k=>{const n=Number(k.slice(0,-1)),L=k.slice(-1);return n===nmax||(L==='d'&&n===nmax-1&&o[k]<10)||(L==='f'&&n===nmax-2&&o[k]<14)});
    const un=unpaired(o);
    const lastSh=q===0&&!an?ORDER.filter(k=>o[k]>0).pop():null;
    const le=lastSh?lastElectron(lastSh,o[lastSh]):null;
    const name=`${NAME[Z-1]} (${SYM[Z-1]}${chg(q)})`;
    const iso=q!==0?NOBLE.find(([n])=>n===N):null;
    const aufNote=an&&q===0?`<div class="qiAnom">⚠ <b>Configuración anómala.</b> Por la regla de las diagonales saldría <i>${cfgStr(aufbau(Z),ORDER.filter(k=>k in an))}</i>, pero en la realidad ${Object.values(an).some(d=>d===-2)?'los dos electrones del s pasan':'un electrón del s pasa'} al d ${(d=>d===10?'para dejarlo lleno: es más estable.':d===5?'para dejarlo semilleno: es más estable.':'porque el ns y el (n−1)d tienen energías muy parecidas.')(o[Object.keys(an).find(k=>k.endsWith('d'))])}</div>`:'';
    return `<div class="qiCfgHead"><b>${name}</b><span>Z = ${Z} · ${N} electrones${q?` (${q>0?'perdió':'ganó'} ${Math.abs(q)})`:''}</span></div>
      <div class="qiCfgLine"><small>Configuración electrónica</small><b>${full}</b></div>
      ${abbr?`<div class="qiCfgLine"><small>Abreviada (con gas noble)</small><b>${abbr}</b></div>`:''}
      <div class="qiCfgLine"><small>Configuración externa (CEE)</small><b>${cfgStr(o,cee)}</b></div>
      ${iso?`<div class="qiCfgLine"><small>Isoelectrónico con</small><b>${NAME[iso[0]-1].toLowerCase()} (${iso[1]}): misma configuración</b></div>`:''}
      ${aufNote}
      <div class="qiOrbRow">${keys.map(k=>boxHtml(k,o[k])).join('')}</div>
      <div class="qiCfgFacts"><span><small>Desapareados</small><b>${un}</b></span><span><small>Magnetismo</small><b>${un?'paramagnético':'diamagnético'}</b></span>${le?`<span><small>Último electrón (n, l, m, s)</small><b>${le.n}, ${le.l}, ${le.m>0?'+'+le.m:le.m<0?'−'+(-le.m):0}, ${le.s}</b></span>`:''}</div>
      <small class="qiCfgNote">Convención de clase para el último electrón: los orbitales se llenan de m = −l a +l y el primer electrón de cada orbital es +½.${removedNote}</small>`;
  };
  const cfgCalc=`<div class="miniCalc qiCfgCalc" data-calc="atomCfg"><div class="miniCalcHead"><span>PROBALO</span><b>Armá la configuración de cualquier átomo o ion</b><p>Escribí el número atómico, el símbolo o el nombre. Para un ion, poné la carga (Na⁺ → 1, Cl⁻ → −1).</p></div>
    <div class="miniCalcFields"><label><span>Elemento (Z, símbolo o nombre)</span><input name="z" type="text" value="Na" autocomplete="off" spellcheck="false"></label><label><span>Carga del ion</span><input name="q" type="number" step="1" value="0"></label></div>
    <div class="qiQuick">${[['Na',0],['N',0],['O',0],['Cl',0],['K',0],['Fe',0],['Cr',0],['Cu',0],['Br',0],['Na',1],['Cl',-1],['Fe',3]].map(([z,q])=>`<button type="button" data-qi-cfg="${z}|${q}">${z}${chg(q)}</button>`).join('')}</div>
    <output class="miniCalcOut" aria-live="polite"></output></div>`;
  if(!window.__qiCfgQuick){window.__qiCfgQuick=true;document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-qi-cfg]');if(!b)return;const box=b.closest('.miniCalc');if(!box)return;const [z,q]=b.dataset.qiCfg.split('|');box.querySelector('[name="z"]').value=z;const qi=box.querySelector('[name="q"]');qi.value=q;qi.dispatchEvent(new Event('input',{bubbles:true}))})}

  K.calcs.atomQn=root=>{
    const n=Math.round(Number(root.querySelector('[name="n"]').value));
    if(!(n>=1&&n<=7))return '<b>Probá con n entre 1 y 7.</b>';
    const rows=[];for(let l=0;l<n;l++){const ms=[];for(let m=-l;m<=l;m++)ms.push(m>0?'+'+m:m<0?'−'+(-m):'0');rows.push(`<tr><td><b>${n}${'spdfghi'[l]}</b></td><td>${l}</td><td>${ms.join(', ')}</td><td>${2*l+1}</td><td>${2*(2*l+1)}</td></tr>`)}
    return `<div class="kitTableWrap"><table class="kitTable"><thead><tr><th>Subnivel</th><th>l</th><th>m</th><th>Orb.</th><th>e⁻</th></tr></thead><tbody>${rows.join('')}</tbody></table></div><b>Nivel ${n}: ${n*n} orbitales · hasta ${2*n*n} electrones</b> (2n² = ${2*n*n})${n>4?'<br><small>Los subniveles con l ≥ 4 (g, h…) existen en la teoría, pero ningún átomo conocido los ocupa en su estado fundamental.</small>':''}`;
  };
  const qnCalc=K.calc('atomQn','Explorador de números cuánticos',K.field('n','Nivel n',3,1),'Elegí un nivel y mirá qué valores pueden tomar l y m.');

  // =====================================================================
  // SECCIONES
  // =====================================================================
  add('intro','Qué estudiamos en Química Inorgánica','00',`
<p>La Química Inorgánica es una materia <b>descriptiva</b>: estudia en profundidad a la materia y sus transformaciones. Describimos <b>cómo es</b> para entender <b>por qué</b> pasan los fenómenos que vemos.</p>
<h3>El recorrido del año: de lo más chico a lo más grande</h3>
${table(['#','Tema','La pregunta que responde'],[
 ['1','Los átomos, su composición y configuración electrónica','¿Cómo es un átomo por dentro y dónde están sus electrones?'],
 ['2','La tabla periódica','¿Por qué los elementos están ordenados así? (según su configuración electrónica)'],
 ['3','Propiedades de los elementos y su periodicidad','¿Por qué los elementos de un grupo se parecen?'],
 ['4','Uniones químicas','¿Cómo y por qué se unen los átomos? ¿Cómo lo representamos?'],
 ['5','Relaciones entre moléculas','¿Cómo las uniones explican las propiedades de las sustancias?']
])}
${punch('Una cadena de conocimientos: como el ADN, una molécula con forma de cadena formada por átomos unidos por uniones químicas, que a su vez se relaciona con otras cadenas.')}
${idea('Para dar la clase','<p>Empezá preguntando: <i>“¿Qué es lo que realmente cambia cuando quemamos papel?”</i>. La respuesta de toda la unidad es: <b>los electrones</b>. Todo lo que sigue explica dónde están y cómo se ordenan.</p>')}
`);

  add('materia','Cambios de la materia: los electrones son los protagonistas','01',`
<p>Antes de entrar al átomo, repasemos qué transformaciones sufre la materia.</p>
${table(['Tipo de cambio','¿Cambia la sustancia?','Ejemplos'],[
 ['<b>Físico</b>','No: la sustancia sigue siendo la misma','cambios de estado, romper un objeto, disolver azúcar'],
 ['<b>Químico</b>','Sí: se forman sustancias nuevas','quemar madera, explosiones, cocinar, putrefacción']
])}
<h3>¿Qué pasa en cada uno?</h3>
<ul class="kitList"><li><b>Cambios de estado:</b> las partículas se separan o se agrupan al recibir o perder energía. No cambia ni la composición de la sustancia ni el tipo de partículas.</li><li><b>Reacciones químicas:</b> entre todas las que estudiamos, las de <b>óxido-reducción</b> tienen algo especial: hay una <b>transferencia de electrones</b>.</li></ul>
${punch('Si en las redox lo que pasa de un lado a otro son electrones… entonces los electrones son los protagonistas de las reacciones químicas.')}
<h3>¿Dónde encontramos a los electrones?</h3>
${figure(svg.escalera,'La materia está formada por moléculas o iones; éstos, por átomos; y los átomos, por protones, neutrones y electrones.')}
<p>Los protones, neutrones y electrones son <b>indistinguibles entre sí</b> (un protón del sodio es igual a un protón del oro). Lo que distingue a cada <b>elemento químico</b> es <b>cuántos protones</b> tiene: su <b>número atómico (Z)</b>. Así, <b>el átomo es la menor porción de cada elemento</b>.</p>
`);

  add('particulas','Protones, neutrones, electrones y el número atómico','02',`
${figure(svg.nucleo,'')}
${table(['Partícula','Carga','Masa relativa','Dónde está'],[
 ['Protón (p⁺)','+1','≈ 1','núcleo'],
 ['Neutrón (n⁰)','0','≈ 1','núcleo'],
 ['Electrón (e⁻)','−1','≈ 1/1836 (casi nada)','zona extranuclear']
])}
<h3>El número atómico Z: la identidad del átomo</h3>
<p>El <b>número atómico</b> es la cantidad de <b>protones</b> del núcleo. Es lo que le da <b>identidad</b> al átomo: <b>si cambia el número de protones, cambia el elemento</b>. Z = 11 es sodio siempre; con 12 protones ya es magnesio.</p>
${punch('Átomo neutro → n.º de electrones = n.º de protones = Z.')}
${example('¿Cuántos electrones tiene un átomo de sodio?','<p>No hace falta Wikipedia: en clase se puede usar <b>la tabla periódica</b>.</p>',
 step('1. Buscar Z en la tabla','<p>El sodio (Na) tiene <b>Z = 11</b>: en su núcleo hay 11 protones.</p>')+
 step('2. Usar la neutralidad','<p>Los átomos son eléctricamente neutros: la carga + de los protones se compensa con la carga − de los electrones. Entonces hay <b>11 electrones</b>.</p>'),
 '11 electrones')}
${deep('Número másico, isótopos e iones '+amp(),`<ul class="kitList"><li><b>Número másico (A)</b> = protones + neutrones. Para el sodio más común, A = 23 → 23 − 11 = 12 neutrones.</li><li><b>Isótopos:</b> átomos del mismo elemento (mismo Z) con distinta cantidad de neutrones: ¹²C y ¹⁴C, ¹H y ²H (deuterio).</li><li><b>Iones:</b> si un átomo gana o pierde electrones queda con carga, pero <b>sigue siendo el mismo elemento</b> (Z no cambió). Na → Na⁺ + e⁻: 11 protones y 10 electrones.</li></ul>`)}
`);

  add('democrito-dalton','Demócrito y Dalton: el átomo indivisible','03',`
<p>Hoy la imagen de átomo que circula es la del logo de la remera de <i>Jimmy Neutrón</i>: un núcleo con electrones girando como planetas. Pero no es el único modelo: hubo toda una evolución, y recorrerla explica <b>por qué los electrones son los protagonistas</b> de las reacciones químicas.</p>
${figure(svg.modelos,'La línea de tiempo que vamos a recorrer. Cada modelo corrigió al anterior a partir de un experimento nuevo.')}
<h3>Érase una vez… en la Antigua Grecia</h3>
<p><b>Demócrito</b> fue uno de los pioneros: si partimos un material, cada mitad tiene las mismas propiedades que el conjunto. Repitiendo muchas veces, llegaríamos a <b>partículas indivisibles: los átomos</b>.</p>
${figure(svg.democrito,'Era una idea filosófica: no había experimentos que la respaldaran.')}
<h3>Dalton: el primer modelo científicamente comprobado</h3>
<p><b>John Dalton</b> (principios de 1800) fue el primero en proponer un modelo atómico <b>basado en evidencias científicas</b>. Su modelo tiene seis postulados:</p>
${table(['#','Postulado de Dalton','¿Sigue valiendo hoy? '+amp()],[
 ['1','Toda la materia está constituida por átomos.','✔ Sí'],
 ['2','Los átomos de un mismo elemento son iguales.','✘ Existen isótopos (distinta cantidad de neutrones)'],
 ['3','Los átomos son indivisibles.','✘ Tienen protones, neutrones y electrones'],
 ['4','Los compuestos tienen diferentes tipos de átomos.','✔ Sí'],
 ['5','Los átomos se combinan en proporciones estequiométricas fijas.','✔ Sí (H₂O siempre 2 H : 1 O)'],
 ['6','Las reacciones químicas son reordenamientos de átomos.','✔ Sí: en una reacción química los átomos no se crean ni se destruyen']
])}
${note('Dato de color','<p>A Dalton se le atribuye la primera descripción del <b>daltonismo</b>, una alteración de la visión de los colores que él mismo tenía.</p>')}
${punch('¿El modelo quedó fijo? NO. Los experimentos siguieron y aparecieron las fallas: el átomo sí se puede dividir.')}
`);

  add('thomson-rutherford','Thomson y Rutherford: el electrón y el núcleo','04',`
<h3>Thomson (1897): el postre de los modelos atómicos</h3>
<p>En su <b>experimento de los rayos catódicos</b>, J. J. Thomson hizo pasar una corriente de electrones por un tubo con dos electrodos cargados. Los rayos <b>se desviaban</b> → tenían carga. Así descubrió <b>el electrón</b>, una partícula que forma parte del átomo.</p>
<p>Propuso que el átomo es una <b>esfera uniforme positiva</b> con los electrones (negativos) incrustados: el <b>modelo del budín de pasas</b>. La masa del budín es la esfera positiva y las pasas son los electrones.</p>
${fix('Para afinar','<p>Las diapositivas dicen que los electrones estaban “en la superficie”. En el modelo de Thomson los electrones están <b>distribuidos en toda la esfera</b> (como las pasas, que están en todo el budín, no sólo en la cáscara).</p>')}
<h3>Rutherford (1911): el experimento de la lámina de oro</h3>
<p>Rutherford bombardeó una <b>lámina de oro muy fina</b> con <b>partículas alfa</b> (núcleos de helio, con carga +) y miró dónde llegaban.</p>
${figure(svg.rutherford,'Esquema didáctico del experimento. A la derecha, lo que “pasa” a escala atómica.')}
${table(['Lo que observó','Lo que concluyó'],[
 ['La gran mayoría de las α atravesaba la lámina sin desviarse (o casi)','El átomo es en su mayoría <b>espacio vacío</b>'],
 ['Unas pocas α se desviaban mucho o rebotaban','Casi toda la masa y la carga + están en un <b>núcleo</b> muy chico (los protones; los neutrones todavía no se conocían)'],
 ['—','Los electrones se mueven <b>alrededor del núcleo</b> como planetas, en trayectorias erráticas: el modelo <b>planetario</b>']
])}
${fix('Para afinar','<p>La diapositiva dice que “la mayoría se desviaba en ángulos muy pequeños”. La idea es la misma: casi todas pasaban <b>derecho o casi derecho</b>; la sorpresa fue que <b>muy pocas</b> (del orden de 1 cada varios miles) rebotaban.</p>')}
<h3>¿Y el tamaño?</h3>
${facts([['Según Rutherford','una partícula de polvo (núcleo) en una catedral (átomo)'],['Versión actual','un alfiler en el centro del estadio Maracaná'],['En números '+amp(),'el átomo es ≈ 100 000 veces más grande que su núcleo']])}
${idea('El de Jimmy Neutrón','<p>El dibujo de la remera es el <b>modelo de Rutherford</b> (o de Bohr): núcleo en el medio y electrones girando como planetas. Útil para empezar, pero ya veremos que no es así.</p>')}
${warn('¿Por qué falló?','<p>Según la física clásica (la de 2.º y 3.er año), una carga que gira alrededor de otra pierde energía continuamente: el electrón debería <b>caer en espiral sobre el núcleo</b> y el átomo colapsaría. Los átomos son estables, así que algo faltaba.</p>')}
`);

  add('bohr','Bohr: órbitas definidas y saltos de energía','05',`
<p><b>Niels Bohr</b>, estudiante de Rutherford, usó ideas de Einstein para ampliar el modelo de su maestro. <i>El estudiante supera al maestro.</i></p>
${table(['#','Postulado de Bohr'],[
 ['1','Los electrones se mueven en <b>órbitas definidas</b> alrededor del núcleo: no cualquier órbita está permitida, sólo algunas.'],
 ['2','En esas órbitas el electrón se mueve con <b>energía constante</b> (no pierde energía mientras no cambie de órbita).'],
 ['3','Si el electrón <b>absorbe energía</b>, “salta” a una órbita más externa: <b>estado excitado</b>.'],
 ['4','Cuando vuelve a una órbita de menor energía (<b>relajación</b>), libera esa energía como <b>fotones</b> (luz).']
])}
${figure(svg.bohr,'Excitación: entra energía y el electrón sube. Relajación: el electrón baja y sale un fotón.')}
${idea('Esto ya lo vieron en el laboratorio','<p>Los <b>colores a la llama</b> son exactamente esto: el mechero excita los electrones y, al relajarse, emiten luz de un color característico de cada elemento (Li carmín, Na amarillo, K lila).</p>'+figure(qsvg.llamas,''))}
${ver('grupos-1-2:qi-al-llama','Colores a la llama (material del TP 4)')}
${fix('Para afinar','<p>La diapositiva dice “no todas las órbitas están definidas”. Lo que quiere decir Bohr es que <b>sólo algunas órbitas están permitidas</b>: la energía del electrón está <b>cuantizada</b>, no puede tener cualquier valor.</p>')}
${warn('¿Por qué no alcanzó?','<p>Tampoco cumplía con la física clásica y se basaba en ideas de Einstein que todavía no estaban demostradas. Además, sólo funcionaba bien para el hidrógeno (un electrón). Hacían falta físicos teóricos y matemática nueva.</p>')}
`);

  add('actual','El modelo actual: Schrödinger y los orbitales','06',`
<p>La <b>mecánica cuántica</b> revolucionó la física del átomo, y <b>Erwin Schrödinger</b> la usó para darle forma al modelo actual.</p>
<ul class="kitList">
 <li>La energía está <b>cuantizada</b>: se intercambia en paquetes discretos llamados <b>cuantos</b>. Esas energías determinan los estados posibles de los electrones.</li>
 <li>Schrödinger propuso una <b>ecuación</b> para calcular esos estados. Sólo se resuelve exactamente para átomos de <b>un electrón</b> (hidrógeno); para los demás se hacen aproximaciones. <i>Tranquilos: no la vamos a resolver.</i></li>
 <li>De la ecuación sale que el electrón tiene cierta <b>probabilidad</b> de estar en una zona del espacio: el <b>orbital atómico</b>, definido por los <b>números cuánticos</b>.</li>
 <li><b>Principio de incertidumbre:</b> no se puede conocer al mismo tiempo la posición y la velocidad del electrón.</li>
</ul>
${table(['Órbita (Bohr)','Orbital (modelo actual)'],[
 ['camino definido, como un planeta','zona del espacio donde es <b>probable</b> encontrar al electrón'],
 ['se sabe dónde está el electrón','sólo se conoce la probabilidad'],
 ['es una línea (2D)','es un volumen (3D), con formas s, p, d, f']
])}
${punch('Órbita es un camino; orbital es una nube de probabilidad. No son sinónimos.')}
`);

  add('conclusiones','¿A dónde llegamos? Química vs. reacciones nucleares','07',`
<p>Cada modelo aporta algo nuevo. Mirándolos en conjunto, salen dos grandes ideas:</p>
${table(['Idea','Qué significa'],[
 ['1 · Ningún modelo es perfecto','Un modelo más simple no es “peor”: hay que tener criterio para saber cuándo conviene usar cada uno. (Para balancear una reacción, Dalton alcanza; para explicar colores, hace falta Bohr.)'],
 ['2 · Lo importante es la estructura electrónica','Cada vez es más complejo entender la estructura electrónica, y justamente los electrones son los que participan en las reacciones químicas, como vimos en las redox.']
])}
<h3>¿Qué cambia en una reacción química?</h3>
<p>Podemos modificar un átomo de dos maneras: tocando su <b>núcleo</b> o su <b>nube electrónica</b>.</p>
${table(['','Reacción nuclear','Reacción química'],[
 ['Qué cambia','el <b>núcleo</b>: un elemento se transforma en otro','la <b>estructura electrónica</b> o el reordenamiento de átomos por las uniones'],
 ['Energía','enorme (“explota todo”)','mucho menor'],
 ['Dónde ocurre','estrellas, bombas atómicas, reactores','a nuestro alrededor, en los seres vivos, en el laboratorio'],
 ['¿La estudia la química?','no (es física nuclear)','<b>sí</b>']
])}
${punch('La química estudia los cambios en los electrones. Por eso, a partir de ahora, nos concentramos en ellos.')}
`);

  add('n-l','Números cuánticos n y l: nivel y forma','08',`
<p>Cada electrón del átomo es único y tiene <b>4 “nombres”</b>: los <b>números cuánticos</b>. La combinación de los cuatro es irrepetible y nos cuenta <b>dónde se mueve</b> el electrón y <b>cuánta energía tiene</b>. Son los resultados de la ecuación de Schrödinger.</p>
<h3>n · número cuántico principal: el nivel de energía</h3>
<ul class="kitList"><li>Indica en qué <b>nivel de energía</b> está el electrón.</li><li>Toma valores naturales: <b>1, 2, 3, 4…</b> (los elementos conocidos llegan hasta el nivel 7 en su estado fundamental).</li><li>A mayor n, el electrón está <b>más lejos</b> del núcleo y tiene <b>más energía</b>: el 1s está más cerca y es de menor energía que el 2s.</li></ul>
<h3>l · número cuántico secundario (azimutal): la forma del orbital</h3>
<p>Depende de n: <b>l = 0, 1, 2… hasta n − 1</b>.</p>
${table(['Valor de l','Tipo de orbital','Forma'],[['0','s','esférica'],['1','p','dos lóbulos sobre un eje (x, y o z)'],['2','d','formas más complejas (cuatro lóbulos, “trébol”)'],['3','f','todavía más complejas']])}
${example('¿Qué valores de l hay en cada nivel?','',
 step('n = 1',chain('l = 0 \\ldots (1-1)','l = 0\\;\\Rightarrow\\;\\text{sólo } s'))+
 step('n = 2','<p>l = 0 o 1 → orbitales <b>s y p</b>.</p>')+
 step('n = 3','<p>l = 0, 1 o 2 → orbitales <b>s, p y d</b>.</p>'),
 'En el nivel n hay n tipos de subniveles: 1 → s · 2 → s, p · 3 → s, p, d · 4 → s, p, d, f')}
${figure(svg.orbitales,'Esquemas de las formas de los orbitales (la nube es más densa donde es más probable encontrar al electrón).')}
`);

  add('m-s','Números cuánticos m y s: orientación y spin','09',`
<h3>m (o mₗ) · número cuántico magnético: la orientación</h3>
<p>Depende de l: <b>m = −l … 0 … +l</b>. Cada valor de m es un orbital con una orientación distinta en el espacio.</p>
${example('¿Cuántos orbitales p hay?','',step('Para l = 1',chain(['m = -1,\\ 0,\\ +1','tres valores']))+'<p>Tres orientaciones: sobre el eje <b>x</b>, el <b>y</b> y el <b>z</b> → p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub>.</p>','3 orbitales p')}
${table(['Orbital','l','m (de −l a +l, con el 0)','N.º de orbitales','N.º máx. de e⁻'],[
 ['s','0','0','1','2'],['p','1','−1, 0, +1','3','6'],['d','2','−2, −1, 0, +1, +2','5','10'],['f','3','−3, −2, −1, 0, +1, +2, +3','7','14']
])}
<h3>s (o mₛ) · número cuántico de spin</h3>
<ul class="kitList"><li>Representa el <b>giro del electrón sobre sí mismo</b>: el sentido de rotación.</li><li>Es el único que <b>no depende de los demás</b> y no habla del orbital, sino del electrón.</li><li>Toma sólo dos valores: <b>+½</b> o <b>−½</b> (se dibujan como ↑ y ↓).</li></ul>
${fix('Para afinar','<p>“Giro sobre sí mismo” es una <b>imagen</b> útil, pero el electrón no es una pelotita que gira: el spin es una propiedad cuántica propia del electrón (como su carga). Para el colegio alcanza con la imagen.</p>')}
<h3>Resumen de los cuatro</h3>
${table(['N.º cuántico','Símbolo','Valores posibles','Qué informa'],[
 ['Principal','n','1, 2, 3… (naturales)','el nivel de energía'],
 ['Secundario','l','0 a n − 1','el subnivel (s, p, d, f): su energía y su forma'],
 ['Magnético','m o mₗ','−l a +l (pasando por 0)','el orbital y su orientación en el espacio'],
 ['De spin','s o mₛ','+½ o −½','el sentido de giro del electrón']
])}
${qnCalc}
`);

  add('principios','Pauli, Aufbau y Hund: cómo se acomodan los electrones','10',`
<p>Tres principios de la mecánica cuántica deciden cómo se distribuyen los electrones según sus números cuánticos.</p>
<h3>1 · Principio de exclusión de Pauli</h3>
<p>En un átomo <b>no puede haber dos electrones con los cuatro números cuánticos iguales</b> (dos electrones no pueden ocupar el mismo “lugar”). Si n, l y m son iguales (mismo orbital), sólo queda variar s: +½ o −½.</p>
${table(['','e⁻ 1','e⁻ 2','e⁻ 3'],[['n','1','1','2'],['l','0','0','0'],['m','0','0','0'],['s','−½','+½','+½']])}
<p>Los dos primeros comparten orbital (1s) con spines opuestos; el tercero ya no entra: tiene que ir al 2s.</p>
${punch('Consecuencia de Pauli: en cada orbital entran como máximo 2 electrones, con spines opuestos (↑↓).')}
<h3>2 · Principio de construcción (Aufbau)</h3>
<p>Establece el <b>orden de energía</b> de los orbitales: los electrones van ocupando primero los de <b>menor energía</b>. Se arma con los números cuánticos: el nivel 1 sólo tiene s (l = 0); el nivel 2 tiene s y p (l = 0 o 1); y así. De ese orden sale la <b>regla de las diagonales</b>, nuestro <b>“machete oficial”</b>:</p>
${figure(svg.aufbau,'La regla de las diagonales (de Moeller). Cada flecha se lee de arriba a la derecha hacia abajo a la izquierda.')}
${idea('Truco para acordarse '+amp(),'<p>Se llena primero el subnivel con <b>menor n + l</b>; si empatan, el de menor n. Por eso el 4s (4 + 0 = 4) va antes que el 3d (3 + 2 = 5).</p>')}
<h3>3 · Regla de Hund (o de máxima multiplicidad): “la regla del bondi”</h3>
<p>Los orbitales de un mismo subnivel tienen la <b>misma energía</b>: se llaman <b>degenerados</b>. Cuando hay que repartir electrones entre ellos:</p>
<ol><li>Primero se coloca <b>un electrón en cada orbital</b>, todos con el <b>mismo spin</b>.</li><li>Recién cuando todos tienen uno, se agrega el segundo, con <b>spin opuesto</b>.</li></ol>
${figure(svg.hund,'')}
${punch('Como en el colectivo: nadie se sienta al lado de un desconocido mientras queden asientos dobles vacíos. (Respetemos el distanciamiento social.)')}
`);

  add('configuracion','La configuración electrónica paso a paso','11',`
<p>La <b>configuración electrónica (C.E.)</b> dice cómo están distribuidos los electrones en los orbitales. Se escribe <b>nivel + tipo de orbital + electrones como superíndice</b>: <b>2p⁶</b> = 6 electrones en los orbitales p del nivel 2.</p>
${facts([['Orbital s','hasta 2 e⁻'],['Orbitales p','hasta 6 e⁻'],['Orbitales d','hasta 10 e⁻'],['Orbitales f','hasta 14 e⁻']])}
${example('Hagamos el sodio (Z = 11)','<p>Con el machete oficial (regla de las diagonales) hay que ubicar <b>11 electrones</b>.</p>',
 step('1s','<p>¿Cuántos entran? 2 como máximo → <b>1s²</b>. Quedan 9.</p>')+
 step('2s','<p>2 como máximo → <b>2s²</b>. Quedan 7.</p>')+
 step('2p','<p>6 como máximo → <b>2p⁶</b>. Queda 1.</p>')+
 step('3s','<p>Entrarían 2, pero sólo queda 1 → <b>3s¹</b>. ¡Listo!</p>')+
 step('Control','<p>2 + 2 + 6 + 1 = 11 ✓</p>'),
 'C.E. Na: 1s² 2s² 2p⁶ 3s¹ · C.E. externa: 3s¹')}
<h3>Configuración electrónica externa (CEE)</h3>
<p>Es la del <b>último nivel de energía</b>: para el sodio, <b>3s¹</b>. Ahí están los <b>electrones de valencia</b>, los que participan en las uniones químicas.</p>
<h3>El diagrama de energía</h3>
<p>Cada orbital se dibuja como una cajita y cada electrón como una flecha (↑ o ↓ según su spin), ordenados por energía:</p>
${figure(svg.energiaNa,'Diagrama de energía del sodio.')}
${note('Notación abreviada '+amp(),'<p>Para no escribir tanto, el “interior” se reemplaza por el <b>gas noble anterior</b> entre corchetes: Na = [Ne] 3s¹ · Cl = [Ne] 3s² 3p⁵ · Fe = [Ar] 4s² 3d⁶.</p>')}
${cfgCalc}
${idea('Para dar la clase','<p>Proyectá el “Probalo” y pedí que la clase prediga la configuración <b>antes</b> de tocar el botón. Probá Cr y Cu para abrir la discusión de las configuraciones anómalas.</p>')}
`);

  add('ultimo-electron','Los números cuánticos del último electrón','12',`
<p>El último electrón que entra (el <b>electrón diferenciador</b>) se puede “nombrar” con sus cuatro números cuánticos. La receta:</p>
${table(['N.º','De dónde sale'],[['n','el número del nivel del último subnivel'],['l','la letra: s → 0, p → 1, d → 2, f → 3'],['m','la cajita donde cayó, numerando de −l a +l (de izquierda a derecha)'],['s','+½ si es el primero de su cajita (↑); −½ si es el segundo (↓)']])}
${example('Sodio: ¿cuál es el conjunto correcto para el último electrón?','<p>CEE Na: 3s¹. Opciones:</p>'+table(['','n','l','m','s'],[['A','3','1','0','+½'],['B','2','0','0','+½'],['C','3','2','+2','−½'],['D','3','0','0','+½']]),
 step('Leer 3s¹','<p>n = 3 · s → l = 0 · un solo orbital → m = 0 · primer electrón → s = +½.</p>')+
 step('Descartar','<ul><li>A: l = 1 sería un orbital 3p.</li><li>B: n = 2 sería el 2s (ya lleno).</li><li>C: l = 2 sería un 3d.</li></ul>'),
 'D: (3, 0, 0, +½)')}
${example('Del revés: de los números cuánticos a la configuración','<p>Estos números cuánticos corresponden a los electrones del <b>último nivel</b> de un elemento. Determiná su configuración y dibujá el diagrama de energía.</p>'+table(['','e⁻ 1','e⁻ 2','e⁻ 3','e⁻ 4'],[['n','2','2','2','2'],['l','0','0','1','1'],['m','0','0','−1','0'],['s','+½','−½','+½','+½']]),
 step('1. Leer cada electrón','<p>Los dos primeros: n = 2, l = 0 → <b>2s²</b> (uno ↑ y otro ↓). Los otros dos: n = 2, l = 1 → <b>2p²</b>, en las cajitas m = −1 y m = 0, ambos ↑ (¡respetan Hund!).</p>')+
 step('2. Completar lo de adentro','<p>Si el último nivel es el 2, el nivel 1 está lleno: <b>1s²</b>.</p>')+
 step('3. Configuración y elemento','<p>1s² 2s² 2p² → 2 + 2 + 2 = 6 electrones → <b>Z = 6: carbono</b>.</p>')+
 step('4. Diagrama','<div class="qiOrbRow">'+boxHtml('1s',2)+boxHtml('2s',2)+boxHtml('2p',2)+'</div>'),
 '1s² 2s² 2p² · carbono (Z = 6) · 2 electrones desapareados')}
`);

  add('magnetismo','¿Hay evidencias? Para- y diamagnetismo','13',`
<p>¡Sí! Las <b>propiedades magnéticas</b> confirman que los electrones se acomodan como dicen Pauli y Hund.</p>
${table(['Tipo','Electrones','Frente a un imán','Ejemplos'],[
 ['<b>Paramagnética</b>','tiene al menos un electrón <b>desapareado</b>','es <b>atraída</b> por el campo magnético','Na (3s¹), N (2p³: 3 desapareados), O, Fe'],
 ['<b>Diamagnética</b>','todos sus electrones <b>apareados</b>','prácticamente no la afecta (incluso la repele un poco)','He (1s²), Be, Mg (3s²), Ne']
])}
${fix('Para afinar','<p>La diapositiva habla de un electrón desapareado “en su última capa”. En realidad alcanza con que haya <b>cualquier</b> electrón desapareado, esté donde esté (por ejemplo, en los orbitales 3d del hierro).</p>')}
${idea('Por qué es una evidencia de Hund','<p>Si los 3 electrones 2p del nitrógeno se aparearan (↑↓ ↑ _), quedaría <b>1</b> desapareado; según Hund quedan <b>3</b>. Midiendo cuánto lo atrae un imán se puede contar cuántos hay… y da 3.</p>')}
`);

  add('estables','Configuraciones estables y anómalas','14',`
<h3>Llena o semillena: más estable</h3>
<p>Experimentalmente, cuando la última capa de orbitales está <b>llena</b> o <b>semillena</b> el átomo es particularmente estable: las repulsiones entre electrones quedan compensadas, y agregar o quitar un electrón rompe ese equilibrio.</p>
<div class="qiOrbRow qiOrbCompare">
 <div><b>Be · 2s²</b>${boxHtml('2s',2)}<small>s lleno</small></div>
 <div><b>N · 2p³</b>${boxHtml('2p',3)}<small>p semilleno</small></div>
 <div><b>Ne · 2p⁶</b>${boxHtml('2p',6)}<small>p lleno (gas noble)</small></div>
</div>
<h3>Configuraciones anómalas</h3>
<p>Esa estabilidad extra explica que algunos elementos <b>no</b> sigan la regla de las diagonales. Los dos clásicos:</p>
${table(['Elemento','Por diagonales saldría…','En la realidad','¿Por qué?'],[
 ['Cromo (Z = 24)','[Ar] 4s² 3d⁴','<b>[Ar] 4s¹ 3d⁵</b>','un e⁻ del 4s pasa al 3d: quedan 4s y 3d <b>semillenos</b>'],
 ['Cobre (Z = 29)','[Ar] 4s² 3d⁹','<b>[Ar] 4s¹ 3d¹⁰</b>','un e⁻ del 4s pasa al 3d: 3d <b>lleno</b>']
])}
<p>Lo mismo pasa con los de abajo en la tabla: molibdeno y plata (como Cr y Cu), y oro.</p>
${note('Sobre la diapositiva 50','<p>Esa diapositiva sólo trae la imagen con las configuraciones anómalas, sin texto. Lo que está en este recuadro es el desarrollo de esa idea.</p>')}
${cards([['Predecí','¿Cr: 4s² 3d⁴ o 4s¹ 3d⁵?','4s¹ 3d⁵: dos subniveles semillenos son más estables.'],['Predecí','¿Cu: 4s² 3d⁹ o 4s¹ 3d¹⁰?','4s¹ 3d¹⁰: el 3d lleno compensa.'],['Pensá','¿Por qué el N cuesta más ionizarlo que el O?','El N tiene el 2p semilleno (muy estable); el O, al perder un e⁻, justamente llega a 2p³.']])}
`);

  add('valencia','Electrones de valencia y estados de oxidación','15',`
<p>Los átomos usan en sus uniones químicas sus <b>electrones de valencia</b>: los del <b>último nivel</b>, que leemos en la <b>configuración electrónica externa</b>. Mirando la CEE se pueden explicar los <b>estados de oxidación</b> más estables.</p>
${table(['Grupo','CEE','Qué le conviene','Estado de oxidación','Ejemplo'],[
 ['1 (alcalinos)','ns¹','perder 1 e⁻ y quedar como el gas noble anterior','+1','Na → Na⁺ ([Ne])'],
 ['2 (alcalinotérreos)','ns²','perder 2 e⁻','+2','Mg → Mg²⁺ ([Ne])'],
 ['13 '+amp(),'ns² np¹','perder 3 e⁻','+3','Al → Al³⁺'],
 ['16 '+amp(),'ns² np⁴','ganar 2 e⁻ (completa el p)','−2','O → O²⁻ · S → S²⁻'],
 ['17 '+amp(),'ns² np⁵','ganar 1 e⁻','−1','Cl → Cl⁻']
])}
${punch('El átomo pierde o gana electrones para llegar a una configuración más estable, casi siempre la del gas noble más cercano.')}
${ver('grupos-1-2:qi-al-quienes','Alcalinos y alcalinotérreos: los que regalan electrones')}
${ver('calcogenos:qi-s-grupo','Calcógenos y halógenos (TP 6)')}
${idea('Puente con la unidad de uniones','<p>Esto es lo que después explica la <b>regla del octeto</b> y por qué el Na y el Cl forman NaCl: uno regala el electrón que al otro le falta.</p>')}
${ver('uniones:qi-un-tipos','Los tres tipos de unión')}
`);

  add('repaso','Repaso: errores típicos y tarjetas','16',`
${warn('Errores típicos',`<ul>
 <li>Confundir <b>órbita</b> (Bohr) con <b>orbital</b> (zona de probabilidad).</li>
 <li>Poner l = n: el máximo es <b>n − 1</b> (no existe el “1p” ni el “2d”).</li>
 <li>Poner |m| mayor que l: con l = 1, m sólo puede ser −1, 0 o +1.</li>
 <li>Llenar el 3d antes que el 4s: por las diagonales, <b>4s va primero</b>.</li>
 <li>Aparear electrones antes de tiempo: Hund pide <b>uno por orbital</b> primero.</li>
 <li>En los cationes de transición, sacar los electrones del 3d: <b>se van primero los 4s</b> (Fe²⁺ = [Ar] 3d⁶).</li>
 <li>Olvidar que el átomo neutro tiene tantos electrones como Z; en un ion hay que sumar o restar la carga.</li>
</ul>`)}
${cards([
 ['Modelos','¿Qué descubrió Thomson?','El electrón (rayos catódicos). Modelo del budín de pasas.'],
 ['Modelos','¿Qué demostró la lámina de oro?','Que el átomo es casi todo vacío, con un núcleo chico, denso y positivo.'],
 ['Modelos','¿Qué agregó Bohr?','Órbitas permitidas de energía fija; excitación y relajación con emisión de fotones.'],
 ['Modelos','¿Qué es un orbital?','Zona del espacio donde es probable encontrar al electrón (Schrödinger).'],
 ['Cuánticos','¿Qué indica n?','El nivel de energía (1, 2, 3…).'],
 ['Cuánticos','¿Qué valores toma l si n = 3?','0, 1 y 2 → s, p y d.'],
 ['Cuánticos','¿Cuántos orbitales d hay?','5 (m = −2 a +2): hasta 10 electrones.'],
 ['Principios','¿Qué dice Pauli?','No hay dos e⁻ con los 4 números cuánticos iguales: máximo 2 por orbital.'],
 ['Principios','¿Qué dice Hund?','En orbitales degenerados, primero uno en cada uno con el mismo spin.'],
 ['C.E.','C.E. del cloro (Z = 17)','1s² 2s² 2p⁶ 3s² 3p⁵ → CEE 3s² 3p⁵, 1 desapareado.'],
 ['C.E.','¿Por qué el Na actúa con +1?','CEE 3s¹: pierde ese electrón y queda como el neón.'],
 ['Magnetismo','¿El Mg es para- o diamagnético?','Diamagnético: 3s², todo apareado.']
])}
`);

  add('ejercitacion','Ejercitación resuelta','17',`
<p>Los tres ejercicios de las diapositivas y más práctica del mismo estilo, resueltos paso a paso. Tené a mano la <b>tabla periódica</b> y la <b>regla de las diagonales</b>.</p>
<div data-qi-guide></div>
`);

  // =====================================================================
  // EJERCICIOS
  // =====================================================================
  const ob=(sh,k)=>boxHtml(sh,k);
  const row=(...a)=>`<div class="qiOrbRow">${a.join('')}</div>`;
  const ex=[
   {n:'A1',tag:'DE LA CLASE · A1',title:'Configuración electrónica del sodio',statement:'¿Cuál es la configuración electrónica del sodio? Indicá también su configuración electrónica externa.',
    solution:step('1. ¿Cuántos electrones?','<p>En la tabla periódica, Na tiene <b>Z = 11</b>: 11 protones y, como el átomo es neutro, <b>11 electrones</b>.</p>')+
     step('2. Seguir el machete','<p>1s² (quedan 9) → 2s² (quedan 7) → 2p⁶ (queda 1) → 3s¹.</p>')+
     step('3. Diagrama',row(ob('1s',2),ob('2s',2),ob('2p',6),ob('3s',1))),
    answer:'1s² 2s² 2p⁶ 3s¹ · CEE: 3s¹'},
   {n:'A2',tag:'DE LA CLASE · A2',title:'Números cuánticos del último electrón del sodio',statement:'Sabiendo que la CEE del sodio es 3s¹, indicá cuál de estos conjuntos (n, l, m, s) es correcto para su último electrón: a) 3, 1, 0, +½ · b) 2, 0, 0, +½ · c) 3, 2, +2, −½ · d) 3, 0, 0, +½.',
    solution:step('Traducir 3s¹','<p>n = 3; s → l = 0; con l = 0 sólo existe m = 0; es el primer electrón del orbital → s = +½.</p>')+
     step('Por qué no las otras',table(['Opción','Correspondería a…'],[['a) l = 1','un orbital 3p'],['b) n = 2','el 2s, que ya está lleno'],['c) l = 2','un orbital 3d']])),
    answer:'d) (3, 0, 0, +½)'},
   {n:'A3',tag:'DE LA CLASE · A3',title:'De los números cuánticos al elemento',statement:'Los electrones del último nivel de un elemento tienen estos números cuánticos (n, l, m, s): (2, 0, 0, +½) · (2, 0, 0, −½) · (2, 1, −1, +½) · (2, 1, 0, +½). Determiná la configuración electrónica del elemento y dibujá el diagrama de energía.',
    solution:step('1. Último nivel','<p>Todos tienen n = 2. Dos con l = 0 → <b>2s²</b>; dos con l = 1 → <b>2p²</b>.</p>')+
     step('2. Nivel interno','<p>El nivel 1 tiene que estar completo: <b>1s²</b>.</p>')+
     step('3. Diagrama',row(ob('1s',2),ob('2s',2),ob('2p',2))+'<p>Los dos 2p están en cajitas distintas (m = −1 y 0) y con el mismo spin: cumple Hund.</p>'),
    answer:'1s² 2s² 2p² · Z = 6: carbono'},
   {n:'A4',title:'¿Conjunto permitido o no?',statement:'Indicá si cada conjunto (n, l, m, s) es posible. Si lo es, decí a qué orbital corresponde: a) 2, 2, 0, +½ · b) 3, 1, −1, −½ · c) 1, 0, 0, +1 · d) 4, 3, −3, +½ · e) 2, 1, 2, +½ · f) 3, 0, 0, −½.',
    solution:table(['','¿Posible?','Por qué'],[['a','✘','l tiene que ser menor que n (máximo 1)'],['b','✔','orbital <b>3p</b>'],['c','✘','s sólo puede ser +½ o −½'],['d','✔','orbital <b>4f</b>'],['e','✘','con l = 1, m sólo vale −1, 0 o +1'],['f','✔','orbital <b>3s</b>']]),
    answer:'Posibles: b (3p), d (4f) y f (3s). Imposibles: a, c y e.'},
   {n:'A5',title:'Configuraciones de elementos de los TP',statement:'Escribí la configuración electrónica completa y abreviada, la CEE y la cantidad de electrones desapareados de: N (Z = 7), O (8), Cl (17), K (19), Ca (20), Fe (26) y Br (35). Indicá si cada uno es para- o diamagnético.',
    solution:table(['Elemento','C.E.','Abreviada','CEE','Desapareados'],[
     ['N','1s² 2s² 2p³','[He] 2s² 2p³','2s² 2p³','3 · para'],
     ['O','1s² 2s² 2p⁴','[He] 2s² 2p⁴','2s² 2p⁴','2 · para'],
     ['Cl','1s² 2s² 2p⁶ 3s² 3p⁵','[Ne] 3s² 3p⁵','3s² 3p⁵','1 · para'],
     ['K','1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹','[Ar] 4s¹','4s¹','1 · para'],
     ['Ca','1s² 2s² 2p⁶ 3s² 3p⁶ 4s²','[Ar] 4s²','4s²','0 · dia'],
     ['Fe','1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶','[Ar] 4s² 3d⁶','4s² 3d⁶','4 · para'],
     ['Br','1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁵','[Ar] 4s² 3d¹⁰ 4p⁵','4s² 4p⁵','1 · para']])+
     step('El hierro, con cajitas',row(ob('4s',2),ob('3d',6))+'<p>Seis electrones en cinco orbitales d: uno en cada uno (↑ ↑ ↑ ↑ ↑) y el sexto se aparea en el primero → <b>4 desapareados</b>.</p>'),
    answer:'Desapareados: N 3, O 2, Cl 1, K 1, Ca 0 (diamagnético), Fe 4, Br 1.'},
   {n:'A6',title:'Iones y gases nobles',statement:'Escribí la configuración de Na⁺, Mg²⁺, Cl⁻, O²⁻, Fe²⁺ y Fe³⁺. ¿Cuáles son isoelectrónicos con un gas noble? ¿Por qué el Fe³⁺ es tan estable?',
    solution:step('Iones de elementos representativos',table(['Ion','Electrones','C.E.','Igual a…'],[['Na⁺','11 − 1 = 10','1s² 2s² 2p⁶','Ne'],['Mg²⁺','12 − 2 = 10','1s² 2s² 2p⁶','Ne'],['O²⁻','8 + 2 = 10','1s² 2s² 2p⁶','Ne'],['Cl⁻','17 + 1 = 18','1s² 2s² 2p⁶ 3s² 3p⁶','Ar']]))+
     step('Iones del hierro','<p>Fe = [Ar] 4s² 3d⁶. Al formar cationes se van <b>primero los 4s</b>:</p>'+table(['Ion','C.E.'],[['Fe²⁺','[Ar] 3d⁶'],['Fe³⁺','[Ar] 3d⁵']])+row(ob('3d',5))+'<p>El Fe³⁺ queda con el 3d <b>semilleno</b>: 5 electrones desapareados, una configuración muy estable. Por eso el Fe²⁺ se oxida fácilmente a Fe³⁺ en el aire.</p>'),
    answer:'Na⁺, Mg²⁺, O²⁻ ≡ Ne · Cl⁻ ≡ Ar · Fe²⁺ [Ar] 3d⁶ · Fe³⁺ [Ar] 3d⁵ (semilleno, estable)'},
   {n:'A7',title:'Cromo y cobre',statement:'Por la regla de las diagonales, el cromo (Z = 24) sería [Ar] 4s² 3d⁴ y el cobre (Z = 29) [Ar] 4s² 3d⁹. Experimentalmente no es así. Escribí las configuraciones reales y explicá por qué.',
    solution:step('Cromo',row(ob('4s',1),ob('3d',5))+'<p>[Ar] <b>4s¹ 3d⁵</b>: un electrón del 4s pasa al 3d y quedan los dos subniveles <b>semillenos</b>, con 6 electrones desapareados.</p>')+
     step('Cobre',row(ob('4s',1),ob('3d',10))+'<p>[Ar] <b>4s¹ 3d¹⁰</b>: el 3d queda <b>lleno</b>.</p>')+
     step('La razón','<p>Los subniveles llenos o semillenos son especialmente estables (repulsiones compensadas). Como el 4s y el 3d tienen energías muy parecidas, al átomo le “conviene” mover un electrón.</p>'),
    answer:'Cr [Ar] 4s¹ 3d⁵ · Cu [Ar] 4s¹ 3d¹⁰ (subniveles semillenos o llenos: más estables)'},
   {n:'A8',title:'¿Cuánto entra en un nivel?',statement:'a) ¿Qué subniveles tiene el nivel n = 3? b) ¿Cuántos orbitales y cuántos electrones como máximo? c) Generalizá para cualquier n.',
    solution:step('a) Subniveles','<p>l = 0, 1, 2 → <b>3s, 3p, 3d</b>.</p>')+
     step('b) Orbitales y electrones',table(['Subnivel','Orbitales','e⁻ máx.'],[['3s','1','2'],['3p','3','6'],['3d','5','10'],['<b>Total</b>','<b>9</b>','<b>18</b>']]))+
     step('c) Fórmula',chain('\\text{orbitales}=n^2','\\text{electrones}=2n^2')),
    answer:'3s, 3p, 3d · 9 orbitales · 18 electrones · en general n² orbitales y 2n² electrones'},
   {n:'A9',title:'Verdadero o falso: modelos atómicos',statement:'a) Dalton propuso que el átomo tiene un núcleo. b) Thomson descubrió el electrón con los rayos catódicos. c) La lámina de oro mostró que la masa del átomo está repartida uniformemente. d) Según Bohr, un electrón excitado emite luz al volver a una órbita de menor energía. e) En el modelo actual se conoce la trayectoria exacta del electrón. f) Las reacciones químicas cambian el núcleo de los átomos.',
    solution:table(['','V/F','Justificación'],[
     ['a','F','para Dalton el átomo era una esfera maciza e indivisible; el núcleo lo propuso Rutherford'],
     ['b','V','los rayos se desviaban entre los electrodos: tenían carga negativa'],
     ['c','F','mostró lo contrario: casi toda la masa está en un núcleo diminuto'],
     ['d','V','la diferencia de energía sale como fotón (relajación)'],
     ['e','F','sólo se conoce la probabilidad (orbital); principio de incertidumbre'],
     ['f','F','cambian la estructura electrónica; cambiar el núcleo es una reacción nuclear']]),
    answer:'a F · b V · c F · d V · e F · f F'},
   {n:'A10',title:'¿Quién es quién?',statement:'a) Un elemento tiene CEE 4s² 4p⁵. ¿Cuál es? Indicá Z, grupo, período y su estado de oxidación más estable. b) El último electrón de un elemento tiene (n, l, m, s) = (3, 1, 0, −½). ¿Qué elemento es (con la convención de clase)?',
    solution:step('a) CEE 4s² 4p⁵','<p>Último nivel n = 4 → <b>período 4</b>. 2 + 5 = 7 electrones de valencia → <b>grupo 17</b> (halógenos). Configuración completa: [Ar] 4s² 3d¹⁰ 4p⁵ → 18 + 2 + 10 + 5 = <b>35 → bromo</b>. Le falta 1 e⁻ para el octeto → <b>−1</b>.</p>')+
     step('b) (3, 1, 0, −½)','<p>n = 3, l = 1 → está en un <b>3p</b>. Llenando de m = −1 a +1 con +½ primero:</p>'+table(['Electrón 3p','m','s'],[['1.º','−1','+½'],['2.º','0','+½'],['3.º','+1','+½'],['4.º','−1','−½'],['<b>5.º</b>','<b>0</b>','<b>−½</b>']])+'<p>Es el quinto: <b>3p⁵</b> → [Ne] 3s² 3p⁵ → 17 electrones → <b>cloro</b>.</p>'),
    answer:'a) Bromo: Z = 35, grupo 17, período 4, −1 · b) Cloro (3p⁵)'}
  ];

  window.ET27_QI4.units.push({id:'estructura-atomica',part:'teoria',n:1,title:'Estructura atómica',short:'Estructura atómica',lead:'De la materia al átomo: los modelos de Demócrito a Schrödinger, los números cuánticos, los principios de Pauli, Aufbau y Hund, la configuración electrónica y por qué los electrones explican toda la química. Con simulador de configuraciones y ejercitación resuelta.',sections:s,exercises:ex});
})();
