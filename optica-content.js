// 27xSOLved · Física Aplicada · Tema 3: Óptica física (ondas, polarización, refracción, actividad óptica y absorción).
// Basado en la carpeta de clase (ondas, interferencia, difracción, polarización, Malus, Snell, ángulo límite,
// Brewster, birrefringencia, ley de Biot, Lambert-Beer) y en la evaluación «Óptica física: Polarización · Tema 1»
// (4.º 4.ª/5.ª · Química · E.T. 27 · Prof. Fernando Giovannetti). Resultados recalculados; erratas explicitadas.
(function(){
  'use strict';
  const K=window.ET27Kit;if(!K)return;
  const {M,m,chain,key,sym,simple,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field,fmt}=K;
  const R=String.raw;

  // ---------- Calculadoras propias del tema ----------
  const num=(root,name)=>{const el=root.querySelector(`[name="${name}"]`);return el?Number(String(el.value).replace(',','.')):NaN};
  const rad=x=>x*Math.PI/180,deg=x=>x*180/Math.PI;
  Object.assign(K.calcs,{
    wave(root){
      const v=num(root,'v'),f=num(root,'f');
      return `<b>λ = v / f ≈ ${fmt(v/f,4)} m</b><br><small>Si λ te queda en nanómetros: ${fmt(v/f*1e9,1)} nm (1 nm = 10⁻⁹ m).</small>`;
    },
    malus(root){
      const I0=num(root,'I0'),a=num(root,'a'),nat=root.querySelector('[name="nat"]').value==='1';
      const I1=nat?I0/2:I0,I=I1*Math.cos(rad(a))**2;
      return `${nat?`Luz natural: después del primer filtro queda I₀/2 = ${fmt(I1,3)}<br>`:''}cos²α = ${fmt(Math.cos(rad(a))**2,4)}<br><b>I ≈ ${fmt(I,3)}</b> (misma unidad que I₀) · pasa el ${fmt(100*I/I0,1)} % de lo que llegó`;
    },
    snell(root){
      const n1=num(root,'n1'),n2=num(root,'n2'),ti=num(root,'ti');
      const s=n1*Math.sin(rad(ti))/n2;
      const lim=n1>n2?deg(Math.asin(n2/n1)):null;
      if(s>1)return `<b>No hay refracción: reflexión total.</b><br><small>sen θt daría ${fmt(s,4)} &gt; 1. El ángulo límite es ${fmt(lim,2)}° y θi = ${fmt(ti,2)}° lo supera.</small>`;
      return `sen θt = ${fmt(s,4)}<br><b>θt ≈ ${fmt(deg(Math.asin(s)),2)}°</b> · ${n1<n2?'se acerca a la normal':n1>n2?'se aleja de la normal':'no se desvía'}<br><small>${lim!==null?`Ángulo límite de este par: ${fmt(lim,2)}°.`:'Con n₁ ≤ n₂ nunca hay reflexión total.'}</small>`;
    },
    brewster(root){
      const n1=num(root,'n1'),n2=num(root,'n2'),b=deg(Math.atan(n2/n1));
      return `<b>θB ≈ ${fmt(b,2)}°</b><br>θt = 90° − θB ≈ ${fmt(90-b,2)}°<br><small>El rayo reflejado sale polarizado linealmente, con E paralelo a la superficie.</small>`;
    },
    biot(root){
      const s=num(root,'s'),l=num(root,'l'),c=num(root,'c');
      const a=s*l/10*c;
      return `l = ${fmt(l,3)} cm = ${fmt(l/10,3)} dm<br><b>α ≈ ${fmt(a,3)}°</b> · ${a>0?'dextrógira (sentido horario)':a<0?'levógira (sentido antihorario)':'no gira'}`;
    },
    beer(root){
      const e=num(root,'e'),c=num(root,'c'),d=num(root,'d'),A=e*c*d,T=10**(-A);
      return `<b>A = ε·c·d ≈ ${fmt(A,4)}</b><br>T = 10<sup>−A</sup> ≈ ${fmt(T,4)} → pasa el <b>${fmt(100*T,2)} %</b> de la luz`;
    }
  });

  // ---------- Esquemas ----------
  const arrow=id=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>`;
  const sine=(a,y0=100,w=600,hw=75,x0=20,ph=1)=>{let s=`M${x0} ${y0}`,x=x0,sg=-ph;const k=a*4/3;while(x<x0+w){s+=` C${x+hw*0.36} ${y0+sg*k} ${x+hw*0.64} ${y0+sg*k} ${x+hw} ${y0}`;x+=hw;sg=-sg}return s};

  const svgWave=`<svg viewBox="0 0 640 200" role="img" aria-label="Onda transversal: la distancia entre dos crestas es la longitud de onda; el campo E oscila perpendicular al avance">
    ${arrow('opA1')}
    <line x1="20" y1="110" x2="620" y2="110" class="svgLayer"/>
    <path d="${sine(55,110)}" class="svgCurve"/>
    <line x1="${20+75*0.5}" y1="38" x2="${20+75*2.5}" y2="38" class="svgArrow" marker-end="url(#opA1)"/><text x="${20+75*1.5}" y="28" text-anchor="middle" class="svgText strong">λ</text>
    <line x1="470" y1="110" x2="470" y2="60" class="svgArrow" marker-end="url(#opA1)"/><text x="480" y="70" class="svgText strong">E</text>
    <line x1="430" y1="185" x2="610" y2="185" class="svgArrow thick" marker-end="url(#opA1)"/><text x="430" y="175" class="svgText">avance (v)</text>
  </svg>`;

  const svgInterf=`<svg viewBox="0 0 640 250" role="img" aria-label="Arriba: dos ondas en fase se suman y la resultante es mayor. Abajo: dos ondas en oposición se restan y casi se cancelan">
    <text x="20" y="22" class="svgText strong">Constructiva: en fase (máximo con máximo)</text>
    <path d="${sine(22,70)}" class="svgLayer"/><path d="${sine(14,70)}" class="svgLayer"/><path d="${sine(36,70)}" class="svgCurve"/>
    <text x="20" y="148" class="svgText strong">Destructiva: desfase 180° (máximo con mínimo)</text>
    <path d="${sine(22,200)}" class="svgLayer"/><path d="${sine(14,200,600,75,20,-1)}" class="svgLayer"/><path d="${sine(8,200)}" class="svgCurve"/>
  </svg>`;

  const svgDiff=`<svg viewBox="0 0 640 220" role="img" aria-label="Izquierda: rendija de tamaño parecido a lambda, la onda sale circular. Derecha: abertura mucho mayor, la onda sigue casi recta">
    ${[30,60,90].map(x=>`<line x1="${x}" y1="30" x2="${x}" y2="190" class="svgArrow"/>`).join('')}
    <rect x="120" y="20" width="12" height="78" class="svgPlate"/><rect x="120" y="122" width="12" height="78" class="svgPlate"/>
    ${[30,60,90].map(r=>`<path d="M132 ${110-r} A${r} ${r} 0 0 1 132 ${110+r}" class="svgCurve"/>`).join('')}
    <text x="140" y="214" text-anchor="middle" class="svgText strong">a ≈ λ: mucha difracción</text>
    ${[360,390,420].map(x=>`<line x1="${x}" y1="30" x2="${x}" y2="190" class="svgArrow"/>`).join('')}
    <rect x="450" y="20" width="12" height="22" class="svgPlate"/><rect x="450" y="178" width="12" height="22" class="svgPlate"/>
    ${[490,525,560,595].map(x=>`<path d="M${x} 46 Q${x+8} 110 ${x} 174" class="svgCurve"/>`).join('')}
    <text x="490" y="214" text-anchor="middle" class="svgText strong">a ≫ λ: casi no se nota</text>
  </svg>`;

  const svgTypes=`<svg viewBox="0 0 640 230" role="img" aria-label="Tres tipos de polarización vistos de frente: lineal es una recta, circular un círculo y elíptica una elipse">
    ${[110,320,530].map(x=>`<line x1="${x-80}" y1="110" x2="${x+80}" y2="110" class="svgLayer"/><line x1="${x}" y1="30" x2="${x}" y2="190" class="svgLayer"/>`).join('')}
    <line x1="55" y1="165" x2="165" y2="55" class="svgCurve thick"/>
    <circle cx="320" cy="110" r="62" class="svgCurve"/>
    <ellipse cx="530" cy="110" rx="72" ry="34" transform="rotate(-35 530 110)" class="svgCurve"/>
    <text x="110" y="216" text-anchor="middle" class="svgText strong">lineal · desfase 0°</text>
    <text x="320" y="216" text-anchor="middle" class="svgText strong">circular · 90°, Ex = Ey</text>
    <text x="530" y="216" text-anchor="middle" class="svgText strong">elíptica · desfase cualquiera</text>
  </svg>`;

  const svgNatural=`<svg viewBox="0 0 640 210" role="img" aria-label="Luz natural con E en todas las direcciones atraviesa un polarizador y sale vibrando en una sola dirección, con la mitad de intensidad">
    ${arrow('opA2')}
    ${[0,30,60,90,120,150].map(a=>{const c=Math.cos(a*Math.PI/180)*55,s=Math.sin(a*Math.PI/180)*55;return `<line x1="${110-c}" y1="${105-s}" x2="${110+c}" y2="${105+s}" class="svgArrow"/>`}).join('')}
    <text x="110" y="198" text-anchor="middle" class="svgText strong">luz natural · I₀</text>
    <line x1="190" y1="105" x2="270" y2="105" class="svgArrow thick" marker-end="url(#opA2)"/>
    <rect x="280" y="25" width="70" height="160" rx="8" class="svgSoft svgLineFill"/><line x1="315" y1="40" x2="315" y2="170" class="svgCurve thick"/>
    <text x="315" y="18" text-anchor="middle" class="svgText">eje del polarizador</text>
    <line x1="360" y1="105" x2="440" y2="105" class="svgArrow thick" marker-end="url(#opA2)"/>
    <line x1="520" y1="50" x2="520" y2="160" class="svgArrow"/>
    <text x="520" y="198" text-anchor="middle" class="svgText strong">polarizada · I₀/2</text>
  </svg>`;

  const svgSnell=`<svg viewBox="0 0 640 300" role="img" aria-label="Rayo que incide desde el aire sobre el agua: se refleja con el mismo ángulo y se refracta acercándose a la normal">
    <rect x="20" y="150" width="600" height="140" class="svgLiquid"/>
    <line x1="20" y1="150" x2="620" y2="150" class="svgLine"/>
    <line x1="320" y1="20" x2="320" y2="290" class="svgLayer"/>
    <line x1="235" y1="3" x2="320" y2="150" class="svgArrow thick"/>
    <line x1="320" y1="150" x2="405" y2="3" class="svgArrow"/>
    <line x1="320" y1="150" x2="378" y2="290" class="svgArrow thick"/>
    <text x="30" y="40" class="svgText strong">medio 1 · n₁ (aire)</text><text x="30" y="275" class="svgText strong">medio 2 · n₂ (agua)</text>
    <text x="282" y="80" class="svgText strong">θi</text><text x="338" y="80" class="svgText strong">θr</text><text x="335" y="230" class="svgText strong">θt</text>
    <text x="420" y="40" class="svgText">reflejado</text><text x="390" y="270" class="svgText">refractado</text><text x="330" y="16" class="svgText">normal</text>
  </svg>`;

  const svgLimit=`<svg viewBox="0 0 640 260" role="img" aria-label="Desde el agua: un rayo sale refractado, otro en el ángulo límite sale rasante y otro mayor se refleja totalmente">
    <rect x="20" y="100" width="600" height="150" class="svgLiquid"/><line x1="20" y1="100" x2="620" y2="100" class="svgLine"/>
    <circle cx="140" cy="235" r="7" class="svgAccentFill"/>
    <line x1="140" y1="235" x2="190" y2="100" class="svgArrow"/><line x1="190" y1="100" x2="235" y2="10" class="svgArrow"/>
    <line x1="140" y1="235" x2="295" y2="100" class="svgArrow thick"/><line x1="295" y1="97" x2="470" y2="97" class="svgArrow thick"/>
    <line x1="140" y1="235" x2="420" y2="100" class="svgArrow"/><line x1="420" y1="100" x2="600" y2="190" class="svgArrow"/>
    <text x="30" y="40" class="svgText strong">aire (n₂ menor)</text><text x="30" y="160" class="svgText strong">agua (n₁ mayor)</text>
    <text x="245" y="30" class="svgText">θ &lt; θlím: sale</text><text x="330" y="88" class="svgText strong">θ = θlím: sale rasante (θt = 90°)</text><text x="470" y="160" class="svgText">θ &gt; θlím: reflexión total</text>
  </svg>`;

  const svgBrewster=`<svg viewBox="0 0 640 300" role="img" aria-label="En el ángulo de Brewster el rayo reflejado y el refractado forman 90 grados y el reflejado sale polarizado paralelo a la superficie">
    <rect x="20" y="150" width="600" height="140" class="svgLiquid"/><line x1="20" y1="150" x2="620" y2="150" class="svgLine"/>
    <line x1="320" y1="20" x2="320" y2="290" class="svgLayer"/>
    <line x1="175" y1="45" x2="320" y2="150" class="svgArrow thick"/>
    <line x1="320" y1="150" x2="465" y2="45" class="svgArrow thick"/>
    <line x1="320" y1="150" x2="390" y2="290" class="svgArrow"/>
    ${[[370,114],[400,92],[430,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" class="svgAccentFill"/>`).join('')}
    ${[[215,74],[255,103]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" class="svgAccentFill"/><line x1="${x-9}" y1="${y-12}" x2="${x+9}" y2="${y+12}" class="svgArrow"/>`).join('')}
    <path d="M352 127 L362 141 L348 151" class="svgLine"/><text x="372" y="166" class="svgText strong">90°</text>
    <text x="440" y="30" class="svgText strong">reflejado: polarizado</text><text x="110" y="30" class="svgText">luz natural</text>
    <text x="400" y="270" class="svgText">refractado (parcialmente polarizado)</text>
    <text x="30" y="200" class="svgText">● = E vibra perpendicular al plano del dibujo (paralelo a la superficie)</text>
  </svg>`;

  const svgNicol=`<svg viewBox="0 0 640 220" role="img" aria-label="Prisma de Nicol: dos prismas de calcita pegados con bálsamo de Canadá; el rayo ordinario se refleja totalmente y sale por un costado; el extraordinario sigue y sale polarizado">
    ${arrow('opA3')}
    <polygon points="160,40 460,40 480,180 180,180" class="svgSoft svgLineFill"/>
    <line x1="160" y1="40" x2="480" y2="180" class="svgLine"/>
    <line x1="40" y1="110" x2="190" y2="110" class="svgArrow thick" marker-end="url(#opA3)"/>
    <line x1="190" y1="110" x2="320" y2="104" class="svgArrow"/>
    <line x1="320" y1="104" x2="290" y2="20" class="svgArrow" marker-end="url(#opA3)"/>
    <line x1="190" y1="110" x2="600" y2="118" class="svgArrow thick" marker-end="url(#opA3)"/>
    <text x="40" y="96" class="svgText">luz natural</text>
    <text x="300" y="16" class="svgText">rayo ordinario: reflexión total en el bálsamo</text>
    <text x="490" y="145" class="svgText strong">extraordinario: polarizado</text>
    <text x="330" y="205" text-anchor="middle" class="svgText">bálsamo de Canadá (pegamento) en la diagonal</text>
  </svg>`;

  const svgPolarimeter=`<svg viewBox="0 0 640 200" role="img" aria-label="Polarímetro: fuente, polarizador, tubo con la solución que gira el plano de polarización un ángulo alfa, y analizador que se rota hasta ver la máxima intensidad">
    ${arrow('opA4')}
    <circle cx="40" cy="100" r="18" class="svgBall"/><text x="40" y="150" text-anchor="middle" class="svgText">fuente</text>
    <rect x="90" y="45" width="40" height="110" rx="6" class="svgSoft svgLineFill"/><line x1="110" y1="58" x2="110" y2="142" class="svgCurve thick"/><text x="110" y="175" text-anchor="middle" class="svgText">polarizador</text>
    <rect x="170" y="70" width="260" height="60" rx="30" class="svgLiquid svgLineFill"/><text x="300" y="105" text-anchor="middle" class="svgText strong">solución (SOA) · largo l</text>
    <line x1="140" y1="100" x2="165" y2="100" class="svgArrow" marker-end="url(#opA4)"/><line x1="435" y1="100" x2="465" y2="100" class="svgArrow" marker-end="url(#opA4)"/>
    <rect x="475" y="45" width="40" height="110" rx="6" class="svgSoft svgLineFill"/><line x1="480" y1="140" x2="510" y2="60" class="svgCurve thick"/><text x="495" y="175" text-anchor="middle" class="svgText">analizador</text>
    <line x1="590" y1="140" x2="590" y2="60" class="svgLayer"/><line x1="590" y1="140" x2="620" y2="62" class="svgArrow"/><text x="600" y="50" class="svgText strong">α</text>
  </svg>`;

  // ---------- Secciones ----------
  const sections=[];
  const add=(k,label,kicker,html)=>sections.push({key:`optica-${k}`,label,kicker,html});
  const evalTip=t=>`<div class="kitBox kitNote"><b>🎯 En la evaluación</b><p>${t}</p></div>`;

  // 1. Introducción
  add('intro','Qué estudiamos y cómo se evalúa','ÓPTICA FÍSICA · 01',`
<p>La <b>óptica física</b> estudia la luz como <b>onda electromagnética</b>. Pensamos la luz como una <b>perturbación del campo electromagnético que se propaga en forma de onda</b>: en cada punto, el vector campo eléctrico <b>E</b> oscila y esa oscilación avanza. ${simple('Como una ola, pero lo que “sube y baja” no es agua sino el campo eléctrico')}</p>
${figure(svgWave,'E oscila perpendicular a la dirección de avance: la luz es una onda transversal.')}
<p>El campo eléctrico es la fuerza por unidad de carga: ${m(R`[E]=\frac{[F]}{[q]}=\frac{\mathrm{N}}{\mathrm{C}}`)}. Toda la unidad gira alrededor de una pregunta: <b>¿cómo oscila E?</b> De ahí salen la polarización, los filtros, la reflexión que polariza y las sustancias que hacen girar la luz.</p>
<h3>Mapa del tema</h3>
${table(['Bloque','Idea central','Fórmula clave'],[
 ['Ondas','Toda onda cumple velocidad = longitud de onda × frecuencia',m(R`v=\lambda f`)],
 ['Interferencia y difracción','Las ondas se suman; bordean obstáculos parecidos a λ','—'],
 ['Polarización','Figura que dibuja el extremo de E: lineal, circular o elíptica','—'],
 ['Filtro polarizador','Pasa solo la componente paralela al eje',m(R`I=I_0\cos^2\alpha`)],
 ['Refracción','La luz cambia de dirección al cambiar de medio',m(R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}\,\theta_t`)],
 ['Ángulo límite','Desde el medio de mayor n, a partir de cierto ángulo no sale',m(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{n_2}{n_1}`)],
 ['Brewster','A ese ángulo el reflejo sale polarizado',m(R`\theta_B=\mathrm{tg}^{-1}\frac{n_2}{n_1}`)],
 ['Actividad óptica','Algunas soluciones giran el plano de polarización',m(R`\alpha=[\alpha]\,l\,c`)],
 ['Absorción','La luz se debilita al atravesar un material',m(R`A=\varepsilon\,c\,d`)]
])}
${evalTip('La evaluación de la cátedra (Tema 1) combina <b>cuatro preguntas de opción múltiple</b> (qué es la polarización, luz no polarizada, dos polarizadores, Brewster) con <b>dos problemas</b>: uno de ángulo límite + Brewster + índice de refracción, y otro de ley de Biot con polarímetro. Cada sección marca qué parte de la prueba prepara. La evaluación está resuelta completa al final, junto con cuatro modelos más.')}
<h3>Diccionario de símbolos</h3>
${sym([['v','velocidad de la onda','m/s'],['c','velocidad de la luz en el vacío: 3·10⁸','m/s'],[R`\lambda`,'longitud de onda','m · nm'],['f','frecuencia','Hz = 1/s'],['E','campo eléctrico','N/C'],[R`I,\ I_0`,'intensidad que sale y que llega','W/m²'],[R`\alpha`,'ángulo entre E y el eje del filtro · ángulo de rotación (Biot)','°'],['n','índice de refracción','sin unidad'],[R`\theta_i,\theta_r,\theta_t`,'ángulos de incidencia, reflexión y refracción (desde la normal)','°'],[R`[\alpha]`,'rotación específica','°·mL/(g·dm)'],['l','largo del tubo del polarímetro','dm'],['T','transmitancia I/I₀','sin unidad · %'],['A','absorbancia','sin unidad'],[R`\varepsilon`,'coeficiente de extinción molar','L/(mol·cm)']])}
`);

  // 2. Ondas
  add('ondas','Ondas: velocidad, λ y frecuencia','v = λ·f · 02',`
<p>Una onda transporta energía sin transportar materia. Se caracteriza por su <b>longitud de onda λ</b> (distancia entre dos crestas), su <b>frecuencia f</b> (oscilaciones por segundo) y su <b>velocidad v</b>.</p>
${key(R`v=\lambda\,f`,'Relación fundamental')}
${chain([R`\lambda=\frac{v}{f}`,'si piden la longitud de onda'],[R`f=\frac{v}{\lambda}`,'si piden la frecuencia'])}
${table(['Tipo de onda','¿Cómo oscila?','Ejemplos'],[['Electromagnética','Solo <b>transversal</b> (E perpendicular al avance)','luz, radio, wifi, rayos X'],['Mecánica','<b>Transversal o longitudinal</b>','cuerda (transversal), sonido (longitudinal)']])}
${warn('Unidades',`<p>1 nm = 10⁻⁹ m · 1 MHz = 10⁶ Hz · 1 GHz = 10⁹ Hz. En el vacío (y casi igual en el aire) la luz va a ${m(R`c=3\cdot10^8\ \mathrm{m/s}`)}; el sonido en el aire, a unos 340 m/s.</p>`)}
${calc('wave','Longitud de onda',field('v','v (m/s)',300000000)+field('f','f (Hz)',100000000),'Probá con el sonido: v = 340 y f = 440.')}
${example('Tarea de la carpeta: sonido de 440 Hz',`<p>Un sonido de 440 Hz viaja a 340 m/s. ¿Cuánto vale λ?</p>`,
 chain(R`\lambda=\frac{v}{f}=\frac{340\ \mathrm{m/s}}{440\ \mathrm{1/s}}`,R`\lambda\approx0{,}77\ \mathrm{m}`),'λ ≈ 0,77 m')}
${example('Tarea de la carpeta: onda de 10⁸ Hz',`<p>Una onda electromagnética de f = 10⁸ Hz viaja a 3·10⁸ m/s. ¿Cuánto vale λ?</p>`,
 chain(R`\lambda=\frac{3\cdot10^8\ \mathrm{m/s}}{10^8\ \mathrm{1/s}}`,R`\lambda=3\ \mathrm{m}`)+fix('Corrección respecto de la carpeta',`<p>En la carpeta quedó λ = 0,3 m. Al dividir potencias de igual exponente, 10⁸/10⁸ = 1, entonces queda 3 m.</p>`),'λ = 3 m')}
`);

  // 3. Interferencia y difracción
  add('interferencia','Interferencia y difracción','LAS ONDAS SE SUMAN · 03',`
<p>Cuando dos ondas llegan al mismo punto, <b>se suman</b>. El resultado depende de cómo están “acomodadas” una respecto de la otra.</p>
${figure(svgInterf,'Líneas finas: las dos ondas. Línea gruesa: la resultante.')}
<div class="twoCol">
 <div class="kitBox kitIdea"><b>Interferencia constructiva</b><p>Máximo con máximo y mínimo con mínimo: las ondas están <b>en fase</b> y las amplitudes se suman. ${simple('3 cm + 5 cm = 8 cm')}</p></div>
 <div class="kitBox kitWarn"><b>Interferencia destructiva</b><p>Máximo con mínimo: desfase de <b>180°</b>, las amplitudes se restan. Si son iguales, <b>se cancelan</b>.</p></div>
</div>
<h3>Difracción</h3>
<p>La <b>difracción</b> es la capacidad de una onda para <b>bordear un obstáculo</b> o abrirse al pasar por una rendija. Se nota mucho cuando la abertura <b>a</b> es parecida a la longitud de onda (${m(R`a\approx\lambda`)}); si ${m(R`a\gg\lambda`)}, la onda sigue casi recta.</p>
${figure(svgDiff,'La clave es comparar el tamaño de la abertura con λ.')}
${idea('Por qué escuchás pero no ves detrás de una puerta',`<p>Un sonido de 440 Hz tiene λ ≈ 0,77 m, parecida al ancho de la puerta: se difracta y dobla la esquina. La luz visible tiene λ ≈ 500 nm, millones de veces menor que la puerta: sigue derecho.</p>`)}
`);

  // 4. Polarización
  add('polarizacion','Polarización y luz natural','¿CÓMO OSCILA E? · 04',`
<p>La <b>polarización</b> de la luz es <b>la figura que dibuja el extremo del vector campo eléctrico</b> en su oscilación (vista de frente, mirando la onda que viene). Puede ser de tres formas distintas.</p>
${warn('La trampa de la pregunta 1 de la evaluación',`<p>La polarización <b>no</b> es la dirección de propagación de la luz ni su longitud de onda. Es la <b>trayectoria del extremo del vector E</b>. ${simple('La onda puede avanzar siempre hacia el mismo lado y, aun así, E puede oscilar en una recta, en un círculo o en una elipse')}</p>`)}
${figure(svgTypes,'Vistas de frente: lo que recorre la punta de E.')}
${table(['Tipo','Condición entre Ex y Ey','Qué dibuja E'],[['Lineal','En fase (desfase 0°). Si una componente es 0, también es lineal','una recta; el ángulo cumple '+m(R`\mathrm{tg}\,\alpha=\frac{E_{y,\text{máx}}}{E_{x,\text{máx}}}`)],['Circular','Desfase 90° <b>y</b> '+m(R`E_{x,\text{máx}}=E_{y,\text{máx}}`),'un círculo'],['Elíptica','Desfase arbitrario (0° &lt; desfase &lt; 90°), o 90° con amplitudes distintas','una elipse']])}
<h3>Luz natural: no polarizada</h3>
<p>La mayoría de las fuentes de luz (el Sol, una lámpara) irradian de forma <b>caótica</b>: emiten pulsos o frentes de onda muy cortos, del orden de <b>10⁻⁸ s</b>, cada uno con una polarización al azar. La suma resulta una onda luminosa que <b>vibra en todas las direcciones</b>: decimos que la luz <b>no está polarizada</b>. ${simple('Es la respuesta de la pregunta 2: E cambia aleatoriamente su plano de vibración cada 10⁻⁸ s')}</p>
${note('Solo se polarizan ondas transversales',`<p>Si la oscilación va en la misma dirección que el avance (onda longitudinal, como el sonido), no hay “orientación” que elegir: <b>el sonido no se puede polarizar</b>.</p>`)}
<h3>Formas de polarizar la luz</h3>
${table(['Método','Cómo funciona','Sección'],[['Filtro polarizador','Deja pasar solo la componente de E paralela a su eje','Ley de Malus'],['Reflexión','Con el ángulo de Brewster el reflejo sale totalmente polarizado','Brewster'],['Birrefringencia','Un cristal (calcita) separa la luz en dos rayos polarizados','Birrefringencia']])}
`);

  // 5. Malus
  add('malus','Filtro polarizador y ley de Malus','I = I₀·cos²α · 05',`
<p>Un <b>filtro polarizador</b> tiene un <b>eje</b>: deja pasar solo la componente de E paralela a ese eje. La luz que sale queda <b>polarizada linealmente</b>, alineada con el eje.</p>
${figure(svgNatural,'Luz natural: después del primer filtro queda la mitad de la intensidad.')}
${key(R`I=I_0\cos^2\alpha`,'Ley de Malus')}
${sym([[R`I_0`,'intensidad de la luz <b>ya polarizada</b> que llega al filtro','W/m²'],['I','intensidad que sale','W/m²'],[R`\alpha`,'ángulo relativo entre la polarización de la luz y el eje del filtro','°']])}
${deep('¿De dónde sale el coseno al cuadrado?',`<p>El filtro deja pasar la proyección de E sobre su eje: ${m(R`E=E_0\cos\alpha`)}. La intensidad es proporcional al <b>cuadrado</b> de la amplitud, entonces ${m(R`I\propto E^2=E_0^2\cos^2\alpha`)}. Para luz natural, α toma todos los valores al azar y el promedio de cos²α en una vuelta es ½: por eso sale ${m(R`I_0/2`)}.</p>`)}
${table(['α','cos²α','Pasa'],[['0°','1','100 % (ejes alineados)'],['30°','0,75','75 %'],['45°','0,5','50 %'],['60°','0,25','25 %'],['90°','0','0 % (ejes cruzados)']])}
<h3>Polarizador y analizador</h3>
<div class="twoCol">
 <div class="kitBox kitIdea"><b>Ejes alineados (α = 0°)</b><p>La luz sale del segundo filtro con <b>la misma intensidad</b> que salió del primero. ${simple('Respuesta de la pregunta 3 de la evaluación')}</p></div>
 <div class="kitBox kitWarn"><b>Ejes cruzados (α = 90°)</b><p>cos²90° = 0: <b>no sale luz</b>.</p></div>
</div>
${warn('Error típico',`<p>Aplicar Malus a la luz natural en el primer filtro. Con luz natural el primer filtro da <b>siempre I₀/2</b>, sin importar cómo esté girado. Malus se usa desde el segundo filtro en adelante.</p>`)}
${calc('malus','Intensidad después del filtro',field('I0','I₀',100)+field('a','α (°)',45)+`<label><span>La luz que llega es</span><select name="nat"><option value="1">natural (primer filtro)</option><option value="0">ya polarizada</option></select></label>`,'')}
${example('Desafío: tres polarizadores',`<p>Dos polarizadores cruzados (0° y 90°) no dejan pasar luz. Si se coloca uno a 45° entre ellos, ¿pasa luz? Luz natural de 100 W/m².</p>`,
 chain([R`I_1=\frac{100}{2}=50\ \mathrm{W/m^2}`,'primer filtro (luz natural)'],[R`I_2=50\cos^2 45^\circ=25\ \mathrm{W/m^2}`,'45° entre el 1.º y el 2.º'],[R`I_3=25\cos^2 45^\circ=12{,}5\ \mathrm{W/m^2}`,'45° entre el 2.º y el 3.º']),'Sí: pasan 12,5 W/m². El filtro del medio “gira” la polarización de a 45°.')}
`);

  // 6. Snell
  add('snell','Refracción: leyes de Snell','n₁·sen θi = n₂·sen θt · 06',`
<p>Cuando la luz llega a la superficie que separa dos medios, una parte se <b>refleja</b> y otra se <b>refracta</b> (pasa al otro medio cambiando de dirección). Todos los ángulos se miden <b>desde la normal</b>, la línea perpendicular a la superficie.</p>
${figure(svgSnell,'Incidente, reflejado y refractado están en el mismo plano.')}
${key(R`\theta_i=\theta_r`,'1.ª ley: reflexión')}
${key(R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}\,\theta_t`,'2.ª ley: refracción')}
${sym([[R`n_1`,'índice de refracción del medio en el que incide la luz',''],[R`n_2`,'índice del medio en el que se refracta',''],['n','cuánto más lenta va la luz que en el vacío: '+m(R`n=\frac{c}{v}`),'≥ 1']])}
${table(['Si…','entonces…','La luz…'],[[m(R`n_1<n_2`),m(R`\theta_t<\theta_i`),'se acerca a la normal'],[m(R`n_1>n_2`),m(R`\theta_t>\theta_i`),'se aleja de la normal'],[m(R`n_1=n_2`),m(R`\theta_t=\theta_i`),'no se desvía']])}
<p>Índices de referencia: aire 1 · agua 1,33 · vidrio común 1,5 · diamante 2,42.</p>
${calc('snell','Ángulo refractado',field('n1','n₁',1)+field('n2','n₂',1.33)+field('ti','θi (°)',30),'Si n₁ > n₂ y θi es grande, te avisa si hay reflexión total.')}
${example('Ejemplo de la carpeta: del aire al agua',`<p>n₁ = 1 (aire), n₂ = 1,33 (agua), θi = 30°. Calcular θt.</p>`,
 chain(R`1\cdot\mathrm{sen}\,30^\circ=1{,}33\cdot\mathrm{sen}\,\theta_t`,R`0{,}5=1{,}33\cdot\mathrm{sen}\,\theta_t`,R`\mathrm{sen}\,\theta_t=\frac{0{,}5}{1{,}33}=0{,}376`,R`\theta_t=\mathrm{sen}^{-1}(0{,}376)\approx22{,}1^\circ`)+fix('Corrección respecto de la carpeta',`<p>En la carpeta el numerador quedó como 1,05 y el resultado como 24,1°. Con sen 30° = 0,5 se obtiene <b>22,1°</b>. Control: θt &lt; θi, como corresponde al pasar a un medio de mayor n.</p>`),'θt ≈ 22,1°')}
`);

  // 7. Ángulo límite
  add('limite','Ángulo límite y reflexión total','θt = 90° · 07',`
<p>Si la luz va de un medio de <b>mayor</b> índice a uno de <b>menor</b> índice (${m(R`n_1>n_2`)}), se aleja de la normal. Aumentando θi llega un momento en que el refractado sale <b>rasante</b>: ${m(R`\theta_t=90^\circ`)}. Ese ángulo de incidencia es el <b>ángulo límite</b>.</p>
${figure(svgLimit,'Por encima del ángulo límite la luz no sale: se refleja toda.')}
${chain([R`n_1\,\mathrm{sen}\,\theta_{lim}=n_2\,\mathrm{sen}\,90^\circ`,'planteamos θt = 90°'],[R`n_1\,\mathrm{sen}\,\theta_{lim}=n_2`,'sen 90° = 1'],[R`\mathrm{sen}\,\theta_{lim}=\frac{n_2}{n_1}`,'despejamos'])}
${key(R`\theta_{lim}=\mathrm{sen}^{-1}\!\left(\frac{n_2}{n_1}\right)`,'Ángulo límite')}
<p>Si ${m(R`\theta_i>\theta_{lim}`)} hay <b>reflexión total</b>: toda la luz vuelve al primer medio. Así funcionan la fibra óptica y el brillo del diamante.</p>
${warn('Solo con n₁ > n₂',`<p>Si la luz pasa a un medio de mayor índice, n₂/n₁ &gt; 1 y el seno no puede valer más que 1: <b>no existe ángulo límite</b>.</p>`)}
${idea('Usar el ángulo límite como dato (problema 5 de la evaluación)',`<p>Si te dan el ángulo límite entre dos medios y uno de los índices, despejás el otro índice:</p>${chain(R`\mathrm{sen}\,\theta_{lim}=\frac{n_{menor}}{n_{mayor}}`,R`n_{mayor}=\frac{n_{menor}}{\mathrm{sen}\,\theta_{lim}}`)}<p>Ejemplo: vidrio–agua con θlím = 60° y n<sub>agua</sub> = 1,333 → ${m(R`n_{vidrio}=\frac{1{,}333}{\mathrm{sen}\,60^\circ}=1{,}539`)}.</p>`)}
${table(['Par de medios','θlím'],[['vidrio (1,5) → aire','41,8°'],['agua (1,33) → aire','48,8°'],['diamante (2,42) → aire','24,4°']])}
`);

  // 8. Brewster
  add('brewster','Polarización por reflexión: Brewster','tg θB = n₂/n₁ · 08',`
<p>Existe un ángulo de incidencia para el cual la luz <b>reflejada sale totalmente polarizada</b>, con E <b>paralelo a la superficie</b> (perpendicular a la normal y al plano del dibujo). Ese ángulo se llama <b>ángulo de Brewster</b>.</p>
${figure(svgBrewster,'En el ángulo de Brewster, reflejado y refractado forman 90°.')}
${key(R`\theta_t+\theta_r=90^\circ`,'Condición para que ocurra')}
<h3>Deducción con la ley de Snell</h3>
${chain([R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}\,\theta_t`,'Snell'],[R`\theta_t=90^\circ-\theta_r=90^\circ-\theta_i`,'condición y θr = θi'],[R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}(90^\circ-\theta_i)`,'reemplazo'],[R`n_1\,\mathrm{sen}\,\theta_i=n_2\cos\theta_i`,'sen(90° − x) = cos x'],[R`\frac{\mathrm{sen}\,\theta_i}{\cos\theta_i}=\frac{n_2}{n_1}`,'paso cos dividiendo'],[R`\mathrm{tg}\,\theta_B=\frac{n_2}{n_1}`,'sen/cos = tg'])}
${key(R`\theta_B=\mathrm{tg}^{-1}\!\left(\frac{n_2}{n_1}\right)`,'Ángulo de Brewster')}
${evalTip('Pregunta 4: con luz no polarizada reflejada en el ángulo de Brewster, <b>el haz reflejado tiene polarización lineal con plano de vibración paralelo a la superficie</b>. El refractado queda solo parcialmente polarizado.')}
${warn('El orden de los índices importa',`<p>n₁ es el medio de donde viene la luz. Aire → agua: ${m(R`\mathrm{tg}^{-1}(1{,}333)=53{,}12^\circ`)}. Agua → aire: ${m(R`\mathrm{tg}^{-1}(1/1{,}333)=36{,}88^\circ`)}. Los dos suman 90°.</p>`)}
${calc('brewster','Ángulo de Brewster',field('n1','n₁ (de donde viene)',1)+field('n2','n₂',1.5),'')}
${idea('Anteojos polarizados',`<p>El reflejo del sol en el agua o en el asfalto está polarizado <b>horizontalmente</b> (paralelo a la superficie). Los anteojos polarizados tienen el eje <b>vertical</b>: por Malus con α = 90°, bloquean el reflejo.</p>`)}
${note('Grados, minutos y segundos',`<p>Para pasar 53,1232° a grados sexagesimales: 0,1232·60 = 7,39′ → 7′; 0,39·60 ≈ 23″. Resultado: <b>53° 7′ 24″</b> (la calculadora lo hace con la tecla ° ′ ″).</p>`)}
`);

  // 9. Birrefringencia
  add('birrefringencia','Birrefringencia y prisma de Nicol','DOBLE REFRACCIÓN · 09',`
<p>Algunos cristales, como la <b>calcita</b> (CaCO₃), son <b>birrefringentes</b>: un rayo que entra se separa en <b>dos rayos</b> polarizados en direcciones perpendiculares. ${simple('Si ponés una calcita sobre una letra, ves la letra doble')}</p>
${table(['Rayo','¿Cumple la ley de Snell?','Polarización'],[['Ordinario','Sí','lineal'],['Extraordinario','No (su índice depende de la dirección)','lineal, perpendicular al ordinario']])}
<h3>Prisma de Nicol</h3>
<p>Son dos prismas de calcita cortados en diagonal y pegados con <b>bálsamo de Canadá</b>. En la unión, el <b>rayo ordinario</b> sufre <b>reflexión total</b> y sale por un costado; el <b>extraordinario</b> sigue derecho. Resultado: sale un único rayo <b>linealmente polarizado</b>.</p>
${figure(svgNicol,'El Nicol usa la reflexión total para descartar uno de los dos rayos.')}
${idea('Conexión con el ángulo límite',`<p>El bálsamo tiene un índice intermedio: para el ordinario el bálsamo es un medio “menos denso” y lo alcanza con un ángulo mayor que el límite. Para el extraordinario no, y lo atraviesa.</p>`)}
`);

  // 10. Biot
  add('biot','Actividad óptica: ley de Biot y polarímetro','α = [α]·l·c · 10',`
<p>Las <b>sustancias ópticamente activas</b> (SOA), como los azúcares, <b>hacen girar el plano de polarización</b> de la luz que las atraviesa.</p>
${table(['Tipo','Sentido de giro','Signo'],[['Dextrógira','horario (a la derecha)','+'],['Levógira','antihorario (a la izquierda)','−']])}
${key(R`\alpha=[\alpha]\cdot l\cdot c`,'Ley de Biot')}
${sym([[R`\alpha`,'ángulo que gira el plano de polarización','°'],[R`[\alpha]`,'rotación específica: propia de cada sustancia','°·mL/(g·dm)'],['l','largo del tubo','dm'],['c','concentración','g/mL']])}
<p>El ángulo depende de la <b>propia sustancia</b>, de la <b>longitud</b> que atraviesa la luz y de la <b>concentración</b>. Las unidades de [α] se arman para que α quede en grados: ${m(R`[\alpha]=\frac{1}{\mathrm{dm}\cdot[c]}`)} (en grados). En la carpeta también aparece c en mol/dm³; lo importante es usar la misma unidad de c que trae la rotación específica.</p>
${warn('Pasá la longitud a decímetros',`<p>1 dm = 10 cm. Un tubo de 10 cm mide 1 dm; uno de 20 cm, 2 dm. Es el error más frecuente en este problema.</p>`)}
<h3>Medición del ángulo de rotación: polarímetro</h3>
${figure(svgPolarimeter,'Se gira el analizador hasta volver a ver la máxima intensidad.')}
<ol class="kitList"><li>La luz atraviesa el <b>polarizador</b> y sale polarizada linealmente.</li><li>Atraviesa el tubo con la solución: el plano de polarización gira α.</li><li>Se <b>rota el analizador hasta ver la máxima intensidad</b>: el ángulo que hubo que girarlo es α.</li></ol>
${calc('biot','Ángulo de rotación',field('s','[α] (°·mL/(g·dm))',178.3)+field('l','l (cm)',10)+field('c','c (g/mL)',0.112),'La calculadora pasa l de cm a dm.')}
${example('Problema 6 de la evaluación: trehalosa',`<p>La rotación específica de la trehalosa en agua es 178,3 °·mL/(g·dm). ¿Cuál es la concentración de una solución acuosa cuyo giro en el polarímetro es de 20°? El tubo mide 10 cm.</p>`,
 chain([R`l=10\ \mathrm{cm}=1\ \mathrm{dm}`,'unidades'],[R`c=\frac{\alpha}{[\alpha]\,l}`,'despeje de Biot'],R`c=\frac{20^\circ}{178{,}3\ \frac{^\circ\mathrm{mL}}{\mathrm{g\,dm}}\cdot1\ \mathrm{dm}}`,R`c\approx0{,}112\ \mathrm{g/mL}=112\ \mathrm{g/L}`),'c ≈ 0,112 g/mL (112 g/L)')}
`);

  // 11. Lambert-Beer
  add('lambert','Absorción: leyes de Lambert y Beer','A = ε·c·d · 11',`
<p>Al atravesar un material, parte de la luz se <b>absorbe</b> y la intensidad baja. Dos magnitudes describen cuánto pasa:</p>
${chain([R`T=\frac{I}{I_0}`,'transmitancia: fracción que pasa (×100 da %)'],[R`A=-\log T=\log\frac{I_0}{I}`,'absorbancia'])}
<h3>Ley de Lambert (espesor)</h3>
<p>Cada capa delgada absorbe una fracción proporcional a la intensidad que le llega: ${m(R`dI=-k\,I\,dx`)}. Integrando a lo largo del espesor d:</p>
${key(R`\log T=-K\,d\qquad A=K\,d`,'Lambert')}
<p>K es una constante del material (mm⁻¹ o cm⁻¹). ${simple('El doble de espesor absorbe el doble en A, pero la luz que pasa no se reduce a la mitad: se eleva al cuadrado')}</p>
<h3>Ley de Beer (concentración) y Lambert-Beer</h3>
<p>En una solución, la absorbancia también es <b>proporcional a la concentración</b>: ${m(R`A\propto c`)}. Juntando las dos leyes (se usa en soluciones):</p>
${key(R`A=\varepsilon\cdot c\cdot d`,'Lambert-Beer')}
${sym([[R`\varepsilon`,'coeficiente de extinción molar: '+m(R`\frac{1}{[c]\,[d]}`),'L/(mol·cm)'],['c','concentración molar','mol/L'],['d','espesor de la cubeta','cm']])}
${table(['A','T','Pasa'],[['0','1','100 %'],['0,3','0,5','50 %'],['1','0,1','10 %'],['2','0,01','1 %']])}
${calc('beer','Absorbancia y transmitancia',field('e','ε (L/(mol·cm))',12000)+field('c','c (mol/L)',0.000025)+field('d','d (cm)',1),'')}
${example('Ejercicio 21 de la carpeta: lámina que transmite 16 %',`<p>Una lámina de 0,22 mm de espesor transmite el 16 % de la luz. Calcular K.</p>`,
 chain([R`T=0{,}16`,'16 % → 0,16'],[R`A=-\log0{,}16=0{,}796`],[R`K=\frac{A}{d}=\frac{0{,}796}{0{,}22\ \mathrm{mm}}`],R`K\approx3{,}62\ \mathrm{mm^{-1}}=36{,}2\ \mathrm{cm^{-1}}`),'K ≈ 3,62 mm⁻¹')}
${example('Ejercicio 22 de la carpeta: concentración de un colorante',`<p>Se disuelven 0,350 g de un colorante (M = 275 g/mol) hasta 100 mL de solución. En una cubeta de 1 cm, A = 0,60. Calcular c y ε.</p>`,
 chain([R`n=\frac{0{,}350\ \mathrm{g}}{275\ \mathrm{g/mol}}=1{,}27\cdot10^{-3}\ \mathrm{mol}`],[R`c=\frac{1{,}27\cdot10^{-3}\ \mathrm{mol}}{0{,}100\ \mathrm{L}}=1{,}27\cdot10^{-2}\ \mathrm{mol/L}`],[R`\varepsilon=\frac{A}{c\,d}=\frac{0{,}60}{1{,}27\cdot10^{-2}\cdot1}\approx47\ \mathrm{L/(mol\,cm)}`])+note('Sobre los datos',`<p>En la carpeta el volumen no se lee completo (aparece “100 g”). Se toma 100 mL de solución, que es lo habitual en este tipo de problema; con otro volumen solo cambia el divisor.</p>`),'c ≈ 1,27·10⁻² mol/L · ε ≈ 47 L/(mol·cm)')}
`);

  // 12–14. Ejercicios
  add('clase','★ Para la clase · 7 ejercicios (1 hora)','PARA LA CLASE · ★',`
<p>Siete ejercicios con estrella que, entre todos, recorren <b>todos los temas de la clase</b>. Están pensados para resolverlos en el pizarrón en <b>una hora</b>. Cada resolución sigue siempre el mismo orden: <b>qué vamos a hacer</b> (en una oración) → <b>fórmulas de las que partimos</b> → <b>qué significa cada cosa</b> → despeje → reemplazo → control.</p>
${table(['Ejercicio','Temas que cubre','Tiempo'],[
 ['★1','v = λ·f, difracción, interferencia constructiva y destructiva','7 min'],
 ['★2','Qué es la polarización, lineal / circular / elíptica, luz natural','7 min'],
 ['★3','Filtro polarizador, luz natural (I₀/2), ley de Malus, tres polarizadores','9 min'],
 ['★4','Ley de Snell, ángulo límite, reflexión total','9 min'],
 ['★5','Índice a partir del ángulo límite, ángulo de Brewster, polarización por reflexión','10 min'],
 ['★6','Birrefringencia y prisma de Nicol, ley de Biot, polarímetro','9 min'],
 ['★7','Ley de Lambert, ley de Lambert-Beer, absorbancia y transmitancia','9 min']
])}
${note('Cómo usarlos','<p>Si falta tiempo, los ítems marcados con “explicá” se pueden dejar de tarea: las cuentas son lo que más tiempo lleva en el pizarrón. ★5 y ★6 preparan directamente los problemas 5 y 6 de la evaluación.</p>')}
<div data-optica-ex="C"></div>`);
  add('practica','Práctica extra · 30 ejercicios','PRÁCTICA · 12',`
<p>Más ejercicios de todo el tema, para que practiquen solos. Cada resolución sigue el mismo orden que los de la clase: <b>qué vamos a hacer → fórmulas de partida → qué significa cada cosa → despeje y cuenta</b>.</p>
<div data-optica-ex="P"></div>`);
  add('evaluacion','Evaluación original resuelta','EVALUACIÓN · 13',`
<p><b>Física Aplicada · Evaluación · Óptica física: Polarización · Tema 1</b> (4.º 4.ª/5.ª · Química · E.T. 27 · Prof. Fernando Giovannetti). Se transcriben las seis consignas y se resuelven completas.</p>
${note('Sobre la consigna 6',`<p>El ángulo impreso está tapado y en la hoja figura escrito a mano <b>20°</b>. Se resuelve con ese valor; si el valor original es otro, solo cambia el numerador (c = α/178,3).</p>`)}
<div data-optica-ex="E1"></div>`);
  add('modelos','Modelos de evaluación · 4 temas','MODELOS · 14',`
<p>Cuatro evaluaciones con el mismo formato que la original (opción múltiple + problemas) que cubren el resto del tema: Malus, tipos de polarización, Snell, ángulo límite, birrefringencia, actividad óptica, ondas y absorción.</p>
<h3>Modelo 2 · Filtros y refracción</h3><div data-optica-ex="E2"></div>
<h3>Modelo 3 · Reflexión total, birrefringencia y absorción</h3><div data-optica-ex="E3"></div>
<h3>Modelo 4 · Ondas, Brewster y Lambert-Beer</h3><div data-optica-ex="E4"></div>
<h3>Modelo 5 · Integrador</h3><div data-optica-ex="E5"></div>`);

  // 15. Repaso
  add('repaso','Formulario, tarjetas y errores','REPASO · 15',`
<h3>Formulario</h3>
${table(['Tema','Fórmula','Cuándo'],[
 ['Ondas',m(R`v=\lambda f`),'λ o f de cualquier onda'],
 ['Malus',m(R`I=I_0\cos^2\alpha`),'luz ya polarizada que entra a un filtro'],
 ['Luz natural',m(R`I=I_0/2`),'primer filtro'],
 ['Snell',m(R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}\,\theta_t`),'cambio de medio'],
 ['Ángulo límite',m(R`\mathrm{sen}\,\theta_{lim}=n_2/n_1`),'solo si n₁ &gt; n₂'],
 ['Brewster',m(R`\mathrm{tg}\,\theta_B=n_2/n_1`),'reflejo polarizado; θt + θr = 90°'],
 ['Biot',m(R`\alpha=[\alpha]\,l\,c`),'polarímetro; l en dm'],
 ['Lambert',m(R`A=-\log T=K\,d`),'láminas'],
 ['Lambert-Beer',m(R`A=\varepsilon\,c\,d`),'soluciones']
])}
<h3>Conceptos</h3>
${cards([
 ['Concepto','¿Qué es la polarización?','La trayectoria (figura) que dibuja el extremo del vector campo eléctrico al oscilar.'],
 ['Concepto','Luz no polarizada','E cambia al azar su plano de vibración cada ~10⁻⁸ s: vibra en todas las direcciones.'],
 ['Concepto','Lineal, circular, elíptica','Desfase 0° → lineal. 90° con Ex = Ey → circular. Otro caso → elíptica.'],
 ['Concepto','Dos polarizadores alineados','Sale del segundo la misma intensidad que salió del primero.'],
 ['Concepto','Polarizadores cruzados','No sale luz: cos²90° = 0.'],
 ['Concepto','Reflejo en el ángulo de Brewster','Polarización lineal, vibración paralela a la superficie.'],
 ['Concepto','Condición de Brewster','Reflejado y refractado forman 90°: θt + θr = 90°.'],
 ['Concepto','¿Se puede polarizar el sonido?','No: es longitudinal. Solo se polarizan ondas transversales.'],
 ['Concepto','Rayo ordinario vs. extraordinario','El ordinario cumple Snell; el extraordinario no.'],
 ['Concepto','Dextrógira / levógira','Giro horario (+) / antihorario (−) del plano de polarización.']
])}
<h3>Errores frecuentes</h3>
${cards([
 ['Error','Medir ángulos desde la superficie','Siempre desde la normal.'],
 ['Error','Malus en el primer filtro con luz natural','El primero da I₀/2, sin cos².'],
 ['Error','Ángulo límite con n₁ &lt; n₂','No existe: el seno daría más que 1.'],
 ['Error','Invertir n₂/n₁ en Brewster','n₁ es el medio de donde viene la luz.'],
 ['Error','Tubo del polarímetro en cm','Pasar a dm: 10 cm = 1 dm.'],
 ['Error','Restar porcentajes en Lambert','Las transmitancias se multiplican; las absorbancias se suman.'],
 ['Error','Calculadora en radianes','Para sen, tg y sus inversas, modo DEG.']
])}
`);

  // ---------- Ejercicios ----------
  // Toda resolución sigue el mismo orden: qué vamos a hacer (una oración) → fórmulas de partida →
  // qué significa cada símbolo → despeje → reemplazo y cuenta → control.
  const exercises=[];
  const ex=(group,n,title,statement,solution,answer)=>exercises.push({group,n,title,statement,solution,answer});
  const mc=(q,opts)=>`<p>${q}</p><ol type="a">${opts.map(o=>`<li>${o}</li>`).join('')}</ol>`;
  const control=t=>`<div class="kitBox kitIdea"><b>✓ Control</b><p>${t}</p></div>`;
  const res=({plan,from=[],concept='',syms=[],steps=[],ctrl=''})=>
    `<div class="kitBox kitNote"><b>🧭 Qué vamos a hacer</b><p>${plan}</p></div>`+
    (from.length?`<div class="kitStep"><h4>Fórmulas de las que partimos</h4>${from.map(([l,lab])=>key(l,lab)).join('')}</div>`:'')+
    (concept?`<div class="kitStep"><h4>Idea de la que partimos</h4>${concept}</div>`:'')+
    (syms.length?`<div class="kitStep"><h4>Qué significa cada cosa</h4>${sym(syms)}</div>`:'')+
    steps.map(([t,h])=>step(t,h)).join('')+(ctrl?control(ctrl):'');
  const part=(label,body)=>`<h3 class="partTitle">${label}</h3>${body}`;
  const data=rows=>`<div class="kitBox kitIdea"><b>Datos</b><ul>${rows.map(r=>`<li>${r}</li>`).join('')}</ul></div>`;

  // Símbolos que se repiten
  const S={
    v:['v','velocidad de la onda','m/s'],lam:[R`\lambda`,'longitud de onda: distancia entre dos crestas','m'],f:['f','frecuencia: oscilaciones por segundo','Hz = 1/s'],c:['c','velocidad de la luz: 3·10⁸','m/s'],
    I0:[R`I_0`,'intensidad de la luz polarizada que llega al filtro','W/m²'],I:['I','intensidad que sale del filtro','W/m²'],al:[R`\alpha`,'ángulo entre la polarización que llega y el eje del filtro','°'],
    n1:[R`n_1`,'índice del medio de donde viene la luz','sin unidad'],n2:[R`n_2`,'índice del medio al que pasa','sin unidad'],ti:[R`\theta_i`,'ángulo de incidencia, medido desde la normal','°'],tt:[R`\theta_t`,'ángulo refractado, medido desde la normal','°'],tr:[R`\theta_r`,'ángulo reflejado (igual a θi)','°'],
    tl:[R`\theta_{lim}`,'ángulo límite: el θi que hace θt = 90°','°'],tB:[R`\theta_B`,'ángulo de Brewster: con él, el reflejo sale polarizado','°'],
    a:[R`\alpha`,'ángulo que gira el plano de polarización (+ horario, − antihorario)','°'],sa:[R`[\alpha]`,'rotación específica de la sustancia','°·mL/(g·dm)'],l:['l','largo del tubo del polarímetro','dm'],cc:['c','concentración de la sustancia activa','g/mL'],
    T:['T','transmitancia: fracción de luz que pasa (I/I₀)','sin unidad'],A:['A','absorbancia','sin unidad'],K:['K','constante de absorción del material','mm⁻¹'],d:['d','espesor que atraviesa la luz','mm o cm'],eps:[R`\varepsilon`,'coeficiente de extinción molar','L/(mol·cm)'],cm:['c','concentración molar','mol/L']
  };
  const F={
    onda:[R`v=\lambda\,f`,'Relación de toda onda'],malus:[R`I=I_0\cos^2\alpha`,'Ley de Malus'],nat:[R`I_1=\frac{I_0}{2}`,'Luz natural en el primer filtro'],
    snell:[R`n_1\,\mathrm{sen}\,\theta_i=n_2\,\mathrm{sen}\,\theta_t`,'Ley de Snell'],lim:[R`\mathrm{sen}\,\theta_{lim}=\frac{n_2}{n_1}`,'Ángulo límite (n₁ > n₂)'],brew:[R`\mathrm{tg}\,\theta_B=\frac{n_2}{n_1}`,'Ángulo de Brewster'],
    biot:[R`\alpha=[\alpha]\cdot l\cdot c`,'Ley de Biot'],lamb:[R`A=-\log T=K\,d`,'Lambert'],beer:[R`A=\varepsilon\,c\,d`,'Lambert-Beer'],mol:[R`n=\frac{m}{M}\qquad c=\frac{n}{V}`,'Moles y molaridad']
  };

  // ===== ★ Para la clase: 7 ejercicios que cubren todo el tema (≈ 1 hora) =====
  ex('C','★1','Ondas, difracción e interferencia en la radio y el láser',
    `<p>En el aula hay una radio sintonizada en una emisora FM de <b>100 MHz</b> y la profe usa un puntero láser rojo de <b>λ = 650 nm</b>. Por la puerta abierta, de <b>0,90 m</b> de ancho, se escucha a alguien que habla en el pasillo (su voz tiene unos <b>340 Hz</b>; el sonido viaja a 340 m/s).</p>
<ol type="a"><li>Calculá la longitud de onda de la emisora FM.</li><li>Calculá la frecuencia del láser.</li><li>Calculá la longitud de onda de la voz y explicá con la difracción por qué la voz “dobla” la puerta y la luz del pasillo no.</li><li>Dos ondas de 4 cm y 1,5 cm de amplitud se encuentran en un punto. ¿Qué amplitud resulta si llegan en fase? ¿Y si llegan desfasadas 180°? Nombrá cada tipo de interferencia.</li></ol>`,
    part('(a) Longitud de onda de la emisora',res({plan:'Vamos a usar la relación de toda onda y despejar λ, porque conocemos la velocidad (la de la luz) y la frecuencia.',from:[F.onda],syms:[S.v,S.lam,S.f],steps:[
      ['Despeje','<p>Pasamos f dividiendo para dejar λ sola:</p>'+chain(R`\lambda=\frac{v}{f}`)],
      ['Unidades','<p>La radio es una onda electromagnética: v = c = 3·10⁸ m/s. 1 MHz = 10⁶ Hz, entonces 100 MHz = 10⁸ Hz.</p>'],
      ['Reemplazo',chain(R`\lambda=\frac{3\cdot10^8\ \mathrm{m/s}}{10^8\ \mathrm{1/s}}=3\ \mathrm{m}`)]],ctrl:'Las ondas de radio miden metros: el resultado tiene sentido.'}))+
    part('(b) Frecuencia del láser',res({plan:'Usamos la misma relación, ahora despejando f, porque el dato es la longitud de onda.',from:[F.onda],syms:[S.c,S.lam,S.f],steps:[
      ['Despeje',chain(R`f=\frac{c}{\lambda}`)],['Unidades','<p>1 nm = 10⁻⁹ m → λ = 650·10⁻⁹ m.</p>'],
      ['Reemplazo',chain(R`f=\frac{3\cdot10^8}{650\cdot10^{-9}}\approx4{,}6\cdot10^{14}\ \mathrm{Hz}`)]],ctrl:'La luz visible tiene frecuencias de 10¹⁴ Hz: correcto.'}))+
    part('(c) Voz, puerta y difracción',res({plan:'Calculamos λ de la voz y la comparamos con el ancho de la puerta, porque la difracción depende de esa comparación.',from:[F.onda],concept:`<p>La difracción es la capacidad de una onda de bordear un obstáculo. Se nota mucho cuando la abertura <b>a</b> es parecida a λ y casi nada cuando ${m(R`a\gg\lambda`)}.</p>`,syms:[S.v,S.lam,S.f,['a','ancho de la abertura (la puerta)','m']],steps:[
      ['Cuenta',chain(R`\lambda_{voz}=\frac{340}{340}=1\ \mathrm{m}`)],
      ['Comparación','<p>Voz: λ = 1 m y a = 0,90 m → son parecidas: <b>hay mucha difracción</b> y el sonido se abre detrás de la puerta. Luz: λ ≈ 650·10⁻⁹ m, más de un millón de veces menor que la puerta → <b>casi no se difracta</b>, sigue derecho.</p>']]}))+
    part('(d) Interferencia',res({plan:'Sumamos las amplitudes teniendo en cuenta si las ondas están en fase o en oposición.',concept:'<p>Cuando dos ondas llegan al mismo punto se suman. <b>En fase</b> (máximo con máximo) las amplitudes se suman: constructiva. <b>Desfasadas 180°</b> (máximo con mínimo) se restan: destructiva.</p>',steps:[
      ['En fase',chain(R`A=4+1{,}5=5{,}5\ \mathrm{cm}`)],['Desfase 180°',chain(R`A=4-1{,}5=2{,}5\ \mathrm{cm}`)]],ctrl:'Si las dos amplitudes fueran iguales, la destructiva daría cero.'})),
    '(a) λ = 3 m · (b) f ≈ 4,6·10¹⁴ Hz · (c) λ<sub>voz</sub> = 1 m ≈ puerta → difracta; la luz no · (d) 5,5 cm (constructiva) y 2,5 cm (destructiva)');

  ex('C','★2','Tipos de polarización y luz natural',
    `<p>Con un osciloscopio se registran las dos componentes del campo eléctrico, E<sub>x</sub> y E<sub>y</sub>, de cuatro haces de luz:</p>
<div class="kitTableWrap"><table class="kitTable"><thead><tr><th>Haz</th><th>E<sub>x,máx</sub></th><th>E<sub>y,máx</sub></th><th>Desfase</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>2</td><td>0°</td></tr><tr><td>2</td><td>3</td><td>3</td><td>90°</td></tr><tr><td>3</td><td>1</td><td>1,73</td><td>0°</td></tr><tr><td>4</td><td>2</td><td>4</td><td>90°</td></tr></tbody></table></div>
<ol type="a"><li>Indicá qué tipo de polarización tiene cada haz y justificá.</li><li>Para los haces polarizados linealmente, calculá el ángulo que forma E con el eje x.</li><li>Explicá qué es la luz natural (no polarizada) y por qué el sonido no se puede polarizar.</li></ol>`,
    part('(a) Clasificación',res({plan:'Vamos a mirar el desfase y las amplitudes de cada haz y compararlos con las condiciones de cada tipo.',concept:`<p>La <b>polarización</b> es la figura que dibuja el extremo del vector E al oscilar.</p>${table(['Tipo','Condición'],[['Lineal','desfase 0° (en fase)'],['Circular','desfase 90° <b>y</b> E<sub>x,máx</sub> = E<sub>y,máx</sub>'],['Elíptica','cualquier otro caso']])}`,syms:[[R`E_x,\ E_y`,'componentes horizontal y vertical del campo eléctrico','N/C'],['desfase','cuánto “adelanta” una componente a la otra','°']],steps:[
      ['Haz por haz',table(['Haz','Tipo','Por qué'],[['1','Lineal','en fase'],['2','Circular','90° y amplitudes iguales (3 y 3)'],['3','Lineal','en fase'],['4','Elíptica','90° pero amplitudes distintas (2 y 4)']])]]}))+
    part('(b) Ángulo de las lineales',res({plan:'Como en la lineal E se mueve sobre una recta, el ángulo sale del cociente entre las amplitudes.',from:[[R`\mathrm{tg}\,\alpha=\frac{E_{y,\text{máx}}}{E_{x,\text{máx}}}`,'Ángulo de la recta']],syms:[[R`\alpha`,'ángulo entre E y el eje x','°']],steps:[
      ['Haz 1',chain(R`\mathrm{tg}\,\alpha=\frac{2}{2}=1\ \Rightarrow\ \alpha=45^\circ`)],['Haz 3',chain(R`\mathrm{tg}\,\alpha=\frac{1{,}73}{1}=1{,}73\ \Rightarrow\ \alpha\approx60^\circ`)]]}))+
    part('(c) Luz natural y sonido',res({plan:'Explicamos con el modelo de emisión de las fuentes y con el tipo de onda.',concept:'<p>Las fuentes comunes emiten pulsos muy cortos (≈ 10⁻⁸ s), cada uno con una polarización al azar. La suma vibra en <b>todas las direcciones</b>: luz no polarizada. Polarizar es quedarse con una dirección de oscilación perpendicular al avance; el sonido es <b>longitudinal</b> (oscila en la misma dirección en que avanza), así que no tiene esa dirección para elegir.</p>'})),
    '(a) 1 lineal · 2 circular · 3 lineal · 4 elíptica · (b) 45° y 60° · (c) ver explicación');

  ex('C','★3','Tres polarizadores',
    `<p>Una lámpara emite luz natural de <b>240 W/m²</b>. La luz atraviesa un polarizador con el eje vertical (0°) y después un analizador con el eje horizontal (90°).</p>
<ol type="a"><li>¿Qué intensidad sale del polarizador? ¿Y del analizador?</li><li>Entre los dos se coloca un tercer filtro con el eje a 30° del primero. Calculá la intensidad después de cada filtro.</li><li>¿Qué ocurre si el filtro del medio se pone a 45°? ¿Es más o menos luz que con 30°?</li><li>Si se saca el filtro del medio y se giran los otros dos hasta que sus ejes quedan alineados, ¿qué intensidad sale del segundo?</li></ol>`,
    part('(a) Polarizador y analizador cruzados',res({plan:'Primero aplicamos la regla de la luz natural y después Malus en el analizador.',from:[F.nat,F.malus],syms:[[R`I_0`,'intensidad de la luz natural que llega (240 W/m²)','W/m²'],[R`I_1`,'lo que sale del primer filtro','W/m²'],S.al,S.I],steps:[
      ['Primer filtro','<p>La luz natural vibra en todas las direcciones; el promedio de cos²α es ½, por eso sale la mitad:</p>'+chain(R`I_1=\frac{240}{2}=120\ \mathrm{W/m^2}`)],
      ['Analizador a 90°',chain(R`I_2=120\cos^2 90^\circ=120\cdot0=0`)]],ctrl:'Ejes cruzados: no sale luz.'}))+
    part('(b) Filtro del medio a 30°',res({plan:'Aplicamos Malus filtro por filtro, usando siempre el ángulo entre un filtro y el anterior.',from:[F.malus],syms:[S.I0,S.al,S.I],steps:[
      ['Ángulos relativos','<p>Del 1.º (0°) al del medio (30°): α = 30°. Del medio (30°) al analizador (90°): α = 60°.</p>'],
      ['Cuentas',chain([R`I_1=120\ \mathrm{W/m^2}`,'luz natural'],[R`I_2=120\cos^2 30^\circ=120\cdot0{,}75=90\ \mathrm{W/m^2}`],[R`I_3=90\cos^2 60^\circ=90\cdot0{,}25=22{,}5\ \mathrm{W/m^2}`])]],ctrl:'Agregar un filtro hizo que pase luz: el del medio “gira” la polarización de a poco.'}))+
    part('(c) Filtro del medio a 45°',res({plan:'Repetimos con 45° y 45° y comparamos.',from:[F.malus],steps:[
      ['Cuentas',chain(R`I_2=120\cos^2 45^\circ=60\ \mathrm{W/m^2}`,R`I_3=60\cos^2 45^\circ=30\ \mathrm{W/m^2}`)],
      ['Comparación','<p>30 W/m² &gt; 22,5 W/m²: a 45° pasa <b>más</b> luz. Es el máximo posible, porque reparte el giro de 90° en dos partes iguales.</p>']]}))+
    part('(d) Ejes alineados',res({plan:'Aplicamos Malus con ángulo cero.',from:[F.malus],steps:[['Cuenta',chain(R`I_2=120\cos^2 0^\circ=120\ \mathrm{W/m^2}`)]],ctrl:'Con ejes alineados sale del segundo la misma intensidad que salió del primero (pregunta 3 de la evaluación).'})),
    '(a) 120 y 0 W/m² · (b) 120 → 90 → 22,5 W/m² · (c) 30 W/m², más luz · (d) 120 W/m²');

  ex('C','★4','La lámpara de la pecera: Snell y reflexión total',
    `<p>En el fondo de una pecera con agua (<b>n = 1,33</b>) hay una lámpara. Sus rayos llegan a la superficie que separa el agua del aire (<b>n = 1</b>).</p>
<ol type="a"><li>Un rayo llega a la superficie con 30° respecto de la normal. ¿Con qué ángulo sale al aire? ¿Se acerca o se aleja de la normal?</li><li>Calculá el ángulo límite agua–aire.</li><li>Otro rayo llega con 55°. ¿Sale del agua? Justificá con una cuenta.</li><li>Ahora una linterna desde el aire ilumina el agua con 55°. ¿Con qué ángulo entra? ¿Por qué acá no puede haber reflexión total?</li></ol>`,
    part('(a) Rayo a 30°',res({plan:'Vamos a usar la ley de Snell para encontrar el ángulo refractado, porque la luz cambia de medio.',from:[F.snell],syms:[S.n1,S.ti,S.n2,S.tt],steps:[
      ['Despeje','<p>Pasamos n₂ dividiendo:</p>'+chain(R`\mathrm{sen}\,\theta_t=\frac{n_1\,\mathrm{sen}\,\theta_i}{n_2}`)],
      ['Reemplazo','<p>Viene del agua (n₁ = 1,33) y pasa al aire (n₂ = 1):</p>'+chain(R`\mathrm{sen}\,\theta_t=\frac{1{,}33\cdot\mathrm{sen}\,30^\circ}{1}=1{,}33\cdot0{,}5=0{,}665`,R`\theta_t=\mathrm{sen}^{-1}(0{,}665)\approx41{,}7^\circ`)]],ctrl:'41,7° &gt; 30°: se aleja de la normal, como corresponde al pasar a un medio de menor índice.'}))+
    part('(b) Ángulo límite',res({plan:'Planteamos Snell con el rayo refractado rasante (θt = 90°) y despejamos θi.',from:[F.snell],syms:[S.tl],steps:[
      ['Planteo',chain(R`n_1\,\mathrm{sen}\,\theta_{lim}=n_2\,\mathrm{sen}\,90^\circ=n_2`,R`\mathrm{sen}\,\theta_{lim}=\frac{n_2}{n_1}`)],
      ['Reemplazo',chain(R`\mathrm{sen}\,\theta_{lim}=\frac{1}{1{,}33}=0{,}752`,R`\theta_{lim}\approx48{,}8^\circ`)]]}))+
    part('(c) Rayo a 55°',res({plan:'Comparamos con el ángulo límite y lo confirmamos con Snell.',from:[F.snell],steps:[
      ['Comparación','<p>55° &gt; 48,8°: supera el ángulo límite.</p>'],
      ['Confirmación',chain(R`\mathrm{sen}\,\theta_t=1{,}33\cdot\mathrm{sen}\,55^\circ=1{,}09`)+'<p>Un seno no puede valer más que 1: no existe θt. <b>Hay reflexión total</b> y el rayo vuelve al agua.</p>']]}))+
    part('(d) Desde el aire',res({plan:'Usamos Snell con los medios invertidos: ahora n₁ = 1 y n₂ = 1,33.',from:[F.snell],steps:[
      ['Reemplazo',chain(R`\mathrm{sen}\,\theta_t=\frac{1\cdot\mathrm{sen}\,55^\circ}{1{,}33}=0{,}616`,R`\theta_t\approx38{,}0^\circ`)],
      ['¿Reflexión total?','<p>No: al pasar a un medio de <b>mayor</b> índice, n₂/n₁ &gt; 1 y no existe ángulo límite. Siempre entra algo de luz.</p>']]})),
    '(a) θt ≈ 41,7°, se aleja · (b) θlím ≈ 48,8° · (c) no sale: reflexión total · (d) θt ≈ 38,0°; no hay ángulo límite si n₁ &lt; n₂');

  ex('C','★5','Brewster y el índice de un vidrio',
    `<p>Se mide que el <b>ángulo límite entre un vidrio y el aire es 40°</b>. El índice del agua es <b>1,33</b>.</p>
<ol type="a"><li>Calculá el índice de refracción absoluto del vidrio.</li><li>Calculá el ángulo de Brewster para luz que va del aire al vidrio y el ángulo del rayo refractado en ese caso.</li><li>Calculá el ángulo de Brewster para luz que va del agua al vidrio.</li><li>¿Cómo está polarizado el haz reflejado en el ángulo de Brewster? ¿Por qué los anteojos polarizados eliminan el reflejo de una vidriera?</li></ol>`,
    part('(a) Índice del vidrio',res({plan:'Usamos la fórmula del ángulo límite al revés: conocemos el ángulo y despejamos el índice del medio más denso.',from:[F.lim],syms:[S.tl,[R`n_1`,'índice del vidrio (medio de mayor n, la incógnita)',''],[R`n_2`,'índice del aire = 1','']],steps:[
      ['Despeje',chain(R`n_1=\frac{n_2}{\mathrm{sen}\,\theta_{lim}}`)],['Reemplazo',chain(R`n_1=\frac{1}{\mathrm{sen}\,40^\circ}=\frac{1}{0{,}643}\approx1{,}556`)]],ctrl:'Un vidrio tiene n entre 1,5 y 1,9: razonable.'}))+
    part('(b) Brewster aire → vidrio',res({plan:'Aplicamos la fórmula de Brewster, que sale de Snell con la condición de que reflejado y refractado formen 90°.',from:[F.brew,[R`\theta_t+\theta_r=90^\circ`,'Condición de Brewster']],syms:[S.tB,S.n1,S.n2,S.tt,S.tr],steps:[
      ['Reemplazo',chain(R`\mathrm{tg}\,\theta_B=\frac{1{,}556}{1}`,R`\theta_B=\mathrm{tg}^{-1}(1{,}556)\approx57{,}3^\circ`)],
      ['Refractado',chain(R`\theta_t=90^\circ-\theta_r=90^\circ-57{,}3^\circ=32{,}7^\circ`)]]}))+
    part('(c) Brewster agua → vidrio',res({plan:'Misma fórmula, pero ahora la luz viene del agua: n₁ = 1,33.',from:[F.brew],steps:[['Reemplazo',chain(R`\mathrm{tg}\,\theta_B=\frac{1{,}556}{1{,}33}=1{,}170`,R`\theta_B\approx49{,}5^\circ`)]],ctrl:'Cuanto más parecidos los índices, más cerca de 45° queda θB.'}))+
    part('(d) Polarización del reflejo',res({plan:'Explicamos qué componente sobrevive en la reflexión y la relacionamos con Malus.',concept:'<p>En el ángulo de Brewster, la componente de E que vibra en el plano de incidencia no se refleja. El haz reflejado queda <b>polarizado linealmente, con vibración paralela a la superficie</b>. En una vidriera o en el agua, ese reflejo vibra horizontal; el anteojo tiene el eje vertical, así que α = 90° y por Malus I = I₀·cos²90° = 0.</p>'})),
    '(a) n ≈ 1,556 · (b) θB ≈ 57,3°, θt ≈ 32,7° · (c) θB ≈ 49,5° · (d) lineal, paralela a la superficie');

  ex('C','★6','El polarímetro: Nicol, Biot y una solución de azúcar',
    `<p>Un polarímetro tiene dos <b>prismas de Nicol</b> (uno como polarizador y otro como analizador) y un tubo de vidrio donde se coloca la solución. Se trabaja con sacarosa, cuya rotación específica es <b>[α] = +66,5 °·mL/(g·dm)</b>.</p>
<ol type="a"><li>Explicá cómo un prisma de Nicol produce luz polarizada (birrefringencia, rayo ordinario y extraordinario).</li><li>Con un tubo de <b>15 cm</b> y una solución de <b>0,20 g/mL</b>, ¿cuánto gira el plano de polarización? ¿La sacarosa es dextrógira o levógira?</li><li>Otra solución de sacarosa, en un tubo de <b>20 cm</b>, gira <b>+8°</b>. Calculá su concentración y cuántos gramos de sacarosa hay en <b>250 mL</b>.</li><li>¿Cómo se mide ese ángulo en el polarímetro?</li></ol>`,
    part('(a) Prisma de Nicol',res({plan:'Explicamos el fenómeno de la birrefringencia y cómo el Nicol descarta uno de los rayos.',concept:'<p>La <b>calcita</b> es birrefringente: separa la luz en dos rayos polarizados en direcciones perpendiculares. El <b>ordinario</b> cumple la ley de Snell; el <b>extraordinario</b> no. El Nicol son dos prismas de calcita pegados en diagonal con <b>bálsamo de Canadá</b>: el rayo ordinario llega al bálsamo con un ángulo mayor que el límite, sufre <b>reflexión total</b> y sale por un costado. Sigue solo el extraordinario: sale <b>luz linealmente polarizada</b>.</p>'}))+
    part('(b) Ángulo de rotación',res({plan:'Usamos la ley de Biot, que relaciona el giro con la sustancia, el largo del tubo y la concentración.',from:[F.biot],syms:[S.a,S.sa,S.l,S.cc],steps:[
      ['Unidades','<p>[α] está por decímetro: l = 15 cm = 1,5 dm.</p>'],
      ['Reemplazo',chain(R`\alpha=66{,}5\cdot1{,}5\cdot0{,}20\approx19{,}95^\circ`)]],ctrl:'El signo es +: la sacarosa es <b>dextrógira</b> (gira en sentido horario).'}))+
    part('(c) Concentración desconocida',res({plan:'Despejamos la concentración de la ley de Biot y después pasamos a masa con el volumen.',from:[F.biot,[R`m=c\cdot V`,'Masa a partir de la concentración']],syms:[S.cc,['V','volumen de solución','mL'],['m','masa de sacarosa','g']],steps:[
      ['Despeje',chain(R`c=\frac{\alpha}{[\alpha]\,l}`)],
      ['Reemplazo','<p>l = 20 cm = 2 dm:</p>'+chain(R`c=\frac{8}{66{,}5\cdot2}\approx0{,}0602\ \mathrm{g/mL}`)],
      ['Masa en 250 mL',chain(R`m=0{,}0602\cdot250\approx15{,}0\ \mathrm{g}`)]]}))+
    part('(d) Cómo se mide',res({plan:'Describimos el procedimiento con el analizador.',concept:'<p>Sin solución, se alinea el analizador hasta ver la máxima intensidad. Se coloca el tubo: la solución gira el plano de polarización y la luz se oscurece. Se <b>rota el analizador hasta volver a ver la máxima intensidad</b>: el ángulo que hubo que girarlo es α (si se giró en sentido horario, +).</p>'})),
    '(b) α ≈ +19,95°, dextrógira · (c) c ≈ 0,060 g/mL, ≈ 15,0 g en 250 mL');

  ex('C','★7','Absorción: un colorante y un filtro de vidrio',
    `<p>Se disuelven <b>0,250 g</b> de un colorante (<b>M = 320 g/mol</b>) hasta obtener <b>500 mL</b> de solución. Su coeficiente de extinción molar es <b>ε = 400 L/(mol·cm)</b>.</p>
<ol type="a"><li>Calculá la concentración molar.</li><li>Calculá la absorbancia en una cubeta de 1 cm y el porcentaje de luz que la atraviesa.</li><li>¿Qué pasa con A y con el porcentaje transmitido si se usa una cubeta de 2 cm?</li><li>Un filtro de vidrio de 0,5 mm transmite el 60 % de la luz. Calculá su constante K y el porcentaje que transmite un filtro de 1,5 mm del mismo vidrio.</li></ol>`,
    part('(a) Concentración',res({plan:'Pasamos la masa a moles y dividimos por el volumen en litros.',from:[F.mol],syms:[['m','masa de colorante','g'],['M','masa molar','g/mol'],['n','cantidad de sustancia','mol'],['V','volumen de solución','L'],S.cm],steps:[
      ['Moles',chain(R`n=\frac{0{,}250}{320}=7{,}81\cdot10^{-4}\ \mathrm{mol}`)],['Concentración','<p>V = 500 mL = 0,500 L:</p>'+chain(R`c=\frac{7{,}81\cdot10^{-4}}{0{,}500}=1{,}56\cdot10^{-3}\ \mathrm{mol/L}`)]]}))+
    part('(b) Absorbancia y transmitancia',res({plan:'Usamos Lambert-Beer para la absorbancia y después la definición de absorbancia para despejar T.',from:[F.beer,[R`A=-\log T\ \Rightarrow\ T=10^{-A}`,'Absorbancia y transmitancia']],syms:[S.A,S.eps,S.cm,['d','espesor de la cubeta','cm'],S.T],steps:[
      ['Absorbancia',chain(R`A=400\cdot1{,}56\cdot10^{-3}\cdot1=0{,}625`)],['Transmitancia',chain(R`T=10^{-0{,}625}\approx0{,}237`)+'<p>Pasa el <b>23,7 %</b> de la luz.</p>']]}))+
    part('(c) Cubeta de 2 cm',res({plan:'Como A es proporcional al espesor, duplicamos A y recalculamos T.',from:[F.beer],steps:[['Cuentas',chain(R`A=0{,}625\cdot2=1{,}25`,R`T=10^{-1{,}25}\approx0{,}056`)]],ctrl:'La absorbancia se duplica, pero la luz que pasa no se reduce a la mitad: queda T² (0,237² ≈ 0,056), un 5,6 %.'}))+
    part('(d) Filtro de vidrio',res({plan:'Con la ley de Lambert calculamos K a partir del dato de 0,5 mm y la usamos para el filtro más grueso.',from:[F.lamb],syms:[S.T,S.A,S.K,S.d],steps:[
      ['K',chain(R`A=-\log0{,}60=0{,}222`,R`K=\frac{A}{d}=\frac{0{,}222}{0{,}5\ \mathrm{mm}}\approx0{,}444\ \mathrm{mm^{-1}}`)],
      ['Filtro de 1,5 mm',chain(R`A=0{,}444\cdot1{,}5=0{,}666`,R`T=10^{-0{,}666}\approx0{,}216`)]],ctrl:'1,5 mm son tres filtros de 0,5 mm: 0,6³ = 0,216 → 21,6 %.'})),
    '(a) c ≈ 1,56·10⁻³ mol/L · (b) A = 0,625, pasa 23,7 % · (c) A = 1,25, pasa 5,6 % · (d) K ≈ 0,444 mm⁻¹, pasa 21,6 %');

  // ===== Práctica extra (P1–P30) =====
  const quick=(plan,from,syms,steps,ctrl)=>res({plan,from,syms,steps,ctrl});
  ex('P','P1','Luz verde','Un puntero láser verde emite luz de λ = 530 nm que viaja por el aire (c = 3·10⁸ m/s). ¿Cuál es su frecuencia?',
    quick('Despejamos f de la relación de toda onda.',[F.onda],[S.c,S.lam,S.f],[['Despeje y unidades',chain(R`f=\frac{c}{\lambda}`)+'<p>530 nm = 530·10⁻⁹ m.</p>'],['Cuenta',chain(R`f=\frac{3\cdot10^8}{530\cdot10^{-9}}\approx5{,}66\cdot10^{14}\ \mathrm{Hz}`)]]),'f ≈ 5,7·10¹⁴ Hz');
  ex('P','P2','Radio FM','Una radio FM transmite en 100,1 MHz. ¿Qué longitud de onda emite? (Es una onda electromagnética).',
    quick('Despejamos λ, porque conocemos la velocidad de la luz y la frecuencia.',[F.onda],[S.c,S.lam,S.f],[['Cuenta','<p>100,1 MHz = 100,1·10⁶ Hz.</p>'+chain(R`\lambda=\frac{3\cdot10^8}{100{,}1\cdot10^6}\approx3{,}0\ \mathrm{m}`)]]),'λ ≈ 3,0 m');
  ex('P','P3','Wifi','Un router wifi trabaja a 2,4 GHz. ¿Cuánto mide la longitud de onda, en centímetros?',
    quick('Despejamos λ y pasamos de metros a centímetros.',[F.onda],[S.c,S.lam,S.f],[['Cuenta',chain(R`\lambda=\frac{3\cdot10^8}{2{,}4\cdot10^9}=0{,}125\ \mathrm{m}=12{,}5\ \mathrm{cm}`)]]),'λ = 12,5 cm');
  ex('P','P4','Sonido grave','Un parlante emite un sonido de λ = 1,7 m en el aire, donde el sonido viaja a 340 m/s. ¿Cuál es su frecuencia?',
    quick('Despejamos f con la velocidad del sonido (no la de la luz).',[F.onda],[S.v,S.lam,S.f],[['Cuenta',chain(R`f=\frac{340}{1{,}7}=200\ \mathrm{Hz}`)]]),'f = 200 Hz');
  ex('P','P5','Suma de ondas','Dos ondas de 3 cm y 5 cm de amplitud se superponen en un punto. Calculá la amplitud resultante si están (a) en fase y (b) desfasadas 180°.',
    res({plan:'Sumamos o restamos amplitudes según el tipo de interferencia.',concept:'<p>En fase: constructiva, se suman. Desfase 180°: destructiva, se restan.</p>',steps:[['(a)',chain(R`3+5=8\ \mathrm{cm}`)],['(b)',chain(R`5-3=2\ \mathrm{cm}`)]]}),'(a) 8 cm · (b) 2 cm');
  ex('P','P6','Puerta abierta','Explicá, usando la difracción, por qué escuchás a alguien que habla detrás de una puerta abierta (de unos 0,8 m) pero no lo ves.',
    res({plan:'Comparamos la longitud de onda del sonido y de la luz con el ancho de la puerta.',concept:'<p>La difracción se nota cuando la abertura es parecida a λ.</p>',steps:[['Comparación','<p>Voz: λ ≈ 0,8–1 m ≈ ancho de la puerta → se difracta. Luz: λ ≈ 500 nm ≪ 0,8 m → no se difracta.</p>']]}),'El sonido se difracta (a ≈ λ); la luz no (a ≫ λ).');
  ex('P','P7','Identificar la polarización',mc('Clasificá cada caso según el tipo de polarización:',['Ex,máx = 3, Ey,máx = 3, desfase 0°','Ex,máx = 5, Ey,máx = 5, desfase 90°','Ex,máx = 2, Ey,máx = 5, desfase 90°','Ex,máx = 3, Ey,máx = 3, desfase 30°']),
    res({plan:'Comparamos cada caso con las condiciones de cada tipo.',concept:table(['Tipo','Condición'],[['Lineal','desfase 0°'],['Circular','90° y amplitudes iguales'],['Elíptica','otro caso']]),steps:[['Clasificación',table(['Caso','Tipo'],[['a','lineal a 45°'],['b','circular'],['c','elíptica'],['d','elíptica']])]]}),'a lineal · b circular · c y d elípticas');
  ex('P','P8','Ángulo de una lineal','Una luz polarizada linealmente tiene Ex,máx = 3 y Ey,máx = 4, oscilando en fase. ¿Qué ángulo forma E con el eje x?',
    quick('En la lineal E recorre una recta; su inclinación sale del cociente de amplitudes.',[[R`\mathrm{tg}\,\alpha=\frac{E_{y,\text{máx}}}{E_{x,\text{máx}}}`,'Ángulo de la recta']],[[R`\alpha`,'ángulo con el eje x','°']],[['Cuenta',chain(R`\mathrm{tg}\,\alpha=\frac{4}{3}\ \Rightarrow\ \alpha\approx53{,}1^\circ`)]]),'α ≈ 53,1°');
  ex('P','P9','Malus a 30°','Luz polarizada de 80 W/m² atraviesa un polarizador cuyo eje forma 30° con la dirección de polarización. ¿Qué intensidad sale?',
    quick('Aplicamos Malus directamente, porque la luz ya está polarizada.',[F.malus],[S.I0,S.al,S.I],[['Cuenta',chain(R`I=80\cos^2 30^\circ=80\cdot0{,}75=60\ \mathrm{W/m^2}`)]]),'60 W/m²');
  ex('P','P10','Malus a 60°','La misma luz polarizada de 80 W/m² atraviesa ahora un polarizador con el eje a 60°. ¿Qué intensidad sale?',
    quick('Aplicamos Malus con el nuevo ángulo.',[F.malus],[S.I0,S.al,S.I],[['Cuenta',chain(R`I=80\cos^2 60^\circ=80\cdot0{,}25=20\ \mathrm{W/m^2}`)]]),'20 W/m²');
  ex('P','P11','Luz natural y analizador','Luz natural de 120 W/m² atraviesa un polarizador y luego un analizador cuyo eje forma 45° con el del polarizador. ¿Intensidad final?',
    quick('Primero la regla de la luz natural y después Malus.',[F.nat,F.malus],[S.I0,S.al,S.I],[['Cuentas',chain([R`I_1=60\ \mathrm{W/m^2}`],[R`I_2=60\cos^2 45^\circ=30\ \mathrm{W/m^2}`])]]),'30 W/m²');
  ex('P','P12','Ángulo para el 25 %','¿Qué ángulo debe formar el eje de un analizador con la polarización de la luz para dejar pasar solo el 25 %?',
    quick('Despejamos α de Malus con I/I₀ = 0,25.',[F.malus],[S.al],[['Despeje',chain(R`\cos^2\alpha=\frac{I}{I_0}=0{,}25`,R`\cos\alpha=0{,}5\ \Rightarrow\ \alpha=60^\circ`)]]),'α = 60°');
  ex('P','P13','Ejes alineados','Luz natural de 90 W/m² atraviesa dos polarizadores con los ejes alineados. ¿Cuánto sale de cada uno?',
    quick('Luz natural en el primero y Malus con 0° en el segundo.',[F.nat,F.malus],[S.I],[['Cuentas',chain(R`I_1=45\ \mathrm{W/m^2}`,R`I_2=45\cos^2 0^\circ=45\ \mathrm{W/m^2}`)]]),'45 y 45 W/m²');
  ex('P','P14','Dos filtros a 30°','Luz natural de 90 W/m² pasa por dos polarizadores cuyos ejes forman 30°. ¿Intensidad final?',
    quick('Mitad en el primero y Malus a 30° en el segundo.',[F.nat,F.malus],[S.I],[['Cuenta',chain(R`I=45\cos^2 30^\circ=33{,}75\ \mathrm{W/m^2}`)]]),'≈ 33,8 W/m²');
  ex('P','P15','Aire → vidrio','Un rayo pasa del aire al vidrio (n = 1,5) con un ángulo de incidencia de 45°. Calculá el ángulo refractado.',
    quick('Usamos Snell y despejamos sen θt.',[F.snell],[S.n1,S.ti,S.n2,S.tt],[['Cuenta',chain(R`\mathrm{sen}\,\theta_t=\frac{1\cdot\mathrm{sen}\,45^\circ}{1{,}5}=0{,}471`,R`\theta_t\approx28{,}1^\circ`)]],'Se acerca a la normal: pasa a mayor n.'),'θt ≈ 28,1°');
  ex('P','P16','Agua → aire','Un rayo pasa del agua (n = 1,33) al aire con θi = 40°. Calculá θt.',
    quick('Snell con n₁ = 1,33 y n₂ = 1.',[F.snell],[S.n1,S.ti,S.n2,S.tt],[['Cuenta',chain(R`\mathrm{sen}\,\theta_t=1{,}33\cdot\mathrm{sen}\,40^\circ=0{,}855`,R`\theta_t\approx58{,}7^\circ`)]],'Se aleja de la normal: pasa a menor n.'),'θt ≈ 58,7°');
  ex('P','P17','Índice desconocido','Un rayo pasa del aire a un material: incide con 60° y se refracta con 35°. ¿Cuál es el índice del material?',
    quick('Despejamos n₂ de Snell.',[F.snell],[S.n2],[['Despeje y cuenta',chain(R`n_2=\frac{n_1\,\mathrm{sen}\,\theta_i}{\mathrm{sen}\,\theta_t}=\frac{0{,}866}{0{,}574}\approx1{,}51`)]]),'n ≈ 1,51');
  ex('P','P18','Aire → diamante','Un rayo pasa del aire al diamante (n = 2,42) con 50°. Calculá θt.',
    quick('Snell con n₂ = 2,42.',[F.snell],[S.tt],[['Cuenta',chain(R`\mathrm{sen}\,\theta_t=\frac{\mathrm{sen}\,50^\circ}{2{,}42}=0{,}317`,R`\theta_t\approx18{,}5^\circ`)]]),'θt ≈ 18,5°');
  ex('P','P19','Ángulo límite agua–aire','Calculá el ángulo límite para luz que va del agua (1,33) al aire.',
    quick('Aplicamos la fórmula del ángulo límite (Snell con θt = 90°).',[F.lim],[S.tl,S.n1,S.n2],[['Cuenta',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1}{1{,}33}\approx48{,}8^\circ`)]]),'48,8°');
  ex('P','P20','¿Sale del agua?','Un rayo dentro del agua llega a la superficie con 50°. ¿Sale al aire?',
    res({plan:'Comparamos el ángulo con el límite agua–aire (48,8°).',from:[F.lim],steps:[['Comparación','<p>50° &gt; 48,8°: hay reflexión total.</p>']]}),'No sale: reflexión total.');
  ex('P','P21','Vidrio → agua','Un rayo pasa de vidrio (1,5) a agua (1,33) con 50°. ¿Se refracta? Calculá θt o justificá la reflexión total.',
    quick('Calculamos primero el ángulo límite y, si el rayo no lo supera, aplicamos Snell.',[F.lim,F.snell],[S.tl,S.tt],[['Ángulo límite',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1{,}33}{1{,}5}\approx62{,}5^\circ`)+'<p>50° &lt; 62,5°: se refracta.</p>'],['Snell',chain(R`\mathrm{sen}\,\theta_t=\frac{1{,}5\,\mathrm{sen}\,50^\circ}{1{,}33}=0{,}864\ \Rightarrow\ \theta_t\approx59{,}8^\circ`)]]),'θt ≈ 59,8°');
  ex('P','P22','Índice a partir del límite','El ángulo límite entre un plástico y el aire es 42°. ¿Cuál es el índice del plástico?',
    quick('Despejamos el índice del medio más denso de la fórmula del ángulo límite.',[F.lim],[S.tl,S.n1],[['Cuenta',chain(R`n_1=\frac{1}{\mathrm{sen}\,42^\circ}\approx1{,}49`)]]),'n ≈ 1,49');
  ex('P','P23','Brewster aire–vidrio','Calculá el ángulo de Brewster para luz que va del aire al vidrio (n = 1,5) y el ángulo refractado.',
    quick('Aplicamos Brewster y la condición θt + θr = 90°.',[F.brew,[R`\theta_t+\theta_r=90^\circ`,'Condición']],[S.tB,S.tt],[['Cuentas',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}5\approx56{,}3^\circ`,R`\theta_t=90^\circ-56{,}3^\circ=33{,}7^\circ`)]]),'θB ≈ 56,3° · θt ≈ 33,7°');
  ex('P','P24','Índice desde Brewster','Se mide que el reflejo sale totalmente polarizado cuando la luz incide desde el aire con 58°. ¿Cuál es el índice del material?',
    quick('Ese ángulo es el de Brewster: despejamos n₂.',[F.brew],[S.tB,S.n2],[['Cuenta',chain(R`n_2=\mathrm{tg}\,58^\circ\approx1{,}60`)]]),'n ≈ 1,60');
  ex('P','P25','Brewster agua → vidrio','Calculá el ángulo de Brewster para luz que va del agua (1,33) al vidrio (1,5).',
    quick('Aplicamos Brewster con n₁ = 1,33.',[F.brew],[S.tB,S.n1,S.n2],[['Cuenta',chain(R`\theta_B=\mathrm{tg}^{-1}\frac{1{,}5}{1{,}33}\approx48{,}4^\circ`)]]),'θB ≈ 48,4°');
  ex('P','P26','Sacarosa','Una solución de sacarosa ([α] = +66,5 °·mL/(g·dm)) de 0,10 g/mL se coloca en un tubo de 20 cm. ¿Cuánto gira el plano de polarización y en qué sentido?',
    quick('Aplicamos Biot con l en decímetros.',[F.biot],[S.a,S.sa,S.l,S.cc],[['Cuenta','<p>l = 2 dm.</p>'+chain(R`\alpha=66{,}5\cdot2\cdot0{,}10=13{,}3^\circ`)]],'Signo +: dextrógira.'),'+13,3°, dextrógira');
  ex('P','P27','Concentración con polarímetro','Una solución de sacarosa en un tubo de 1 dm gira +10°. ¿Cuál es su concentración?',
    quick('Despejamos c de la ley de Biot.',[F.biot],[S.cc],[['Cuenta',chain(R`c=\frac{\alpha}{[\alpha]\,l}=\frac{10}{66{,}5\cdot1}\approx0{,}150\ \mathrm{g/mL}`)]]),'c ≈ 0,15 g/mL');
  ex('P','P28','Fructosa','La fructosa tiene [α] = −92 °·mL/(g·dm). Calculá α para un tubo de 1,5 dm y c = 0,20 g/mL.',
    quick('Aplicamos Biot respetando el signo.',[F.biot],[S.a],[['Cuenta',chain(R`\alpha=-92\cdot1{,}5\cdot0{,}20=-27{,}6^\circ`)]],'Signo −: levógira.'),'−27,6°, levógira');
  ex('P','P29','Lámina más gruesa','Una lámina de 0,22 mm transmite el 16 % de la luz. ¿Qué porcentaje transmite una lámina de 0,5 mm del mismo material?',
    quick('Con Lambert calculamos K y la usamos con el nuevo espesor.',[F.lamb],[S.T,S.A,S.K,S.d],[['K',chain(R`K=\frac{-\log0{,}16}{0{,}22}\approx3{,}62\ \mathrm{mm^{-1}}`)],['Nuevo espesor',chain(R`A=3{,}62\cdot0{,}5=1{,}81`,R`T=10^{-1{,}81}\approx0{,}016`)]]),'≈ 1,6 %');
  ex('P','P30','Duplicar la concentración','Una solución transmite el 40 % de la luz. Si se duplica la concentración (misma cubeta), ¿qué porcentaje transmite?',
    quick('Como A es proporcional a c, duplicamos A.',[F.beer,F.lamb],[S.A,S.T],[['Cuentas',chain(R`A_1=-\log0{,}40=0{,}398`,R`A_2=0{,}796\ \Rightarrow\ T_2=10^{-0{,}796}=0{,}16`)]],'Atajo: T₂ = T₁² = 0,16.'),'16 %');

  // ===== Evaluación original (E1) =====
  const why=(plan,concept,discard)=>res({plan,concept:`<p>${concept}</p>`,steps:discard?[['Por qué las otras no',`<p>${discard}</p>`]]:[]});
  ex('E1','1','Qué es la polarización',mc('En óptica física, a la luz la entendemos como las oscilaciones del campo eléctrico que se transmiten en forma de onda. En este contexto la polarización de la luz se puede entender como:',['La dirección de propagación de la luz','La trayectoria del extremo del vector “campo eléctrico”','La longitud de onda de la luz']),
    why('Recordamos la definición de polarización y descartamos las opciones que describen otra cosa.','La polarización describe <b>cómo oscila E</b>: la figura que recorre su extremo (recta, círculo o elipse).','La dirección de propagación es hacia dónde avanza la onda; la longitud de onda es la distancia entre crestas. Ninguna dice cómo oscila E.')+fix('Error de la hoja','<p>En la hoja se marcó la opción a (dirección de propagación): es incorrecta.</p>'),'b) La trayectoria del extremo del vector campo eléctrico.');
  ex('E1','2','Luz no polarizada',mc('Entendemos por luz no polarizada aquella que:',['Su vector campo eléctrico vibra en una sola dirección','Su vector campo eléctrico cambia aleatoriamente su plano de vibración cada 10⁻⁸ s (vibra en todas direcciones)','Su vector campo eléctrico sigue una trayectoria circular o elíptica']),
    why('Usamos el modelo de emisión de las fuentes de luz.','Las fuentes emiten pulsos cortos (~10⁻⁸ s), cada uno con polarización al azar: la suma vibra en todas direcciones.','La a es polarización lineal; la c, circular o elíptica.'),'b)');
  ex('E1','3','Dos polarizadores alineados',mc('Cuando la luz no polarizada atraviesa un polarizador lineal, sale polarizada alineada con el eje de polarización. Si tengo dos polarizadores con sus ejes alineados:',['La luz sale del segundo polarizador con la misma intensidad que salió del primero','La luz sale del segundo con la mitad de la intensidad que salió del primero','La luz sale del segundo con intensidad nula']),
    res({plan:'Aplicamos la ley de Malus al segundo polarizador con un ángulo de 0°.',from:[F.malus],syms:[S.I0,S.al,S.I],steps:[['Cuenta',chain(R`I_2=I_1\cos^2 0^\circ=I_1`)],['Por qué las otras no','<p>La mitad se pierde en el <b>primer</b> filtro; intensidad nula sería con ejes cruzados.</p>']]}),'a)');
  ex('E1','4','Reflexión en el ángulo de Brewster',mc('Cuando la luz no polarizada se refleja en una superficie con su ángulo de Brewster:',['El haz reflejado tiene polarización lineal cuyo plano de vibración es perpendicular a la superficie','El haz reflejado tiene polarización lineal cuyo plano de vibración es paralelo a la superficie','El haz reflejado no está polarizado']),
    why('Recordamos qué componente se refleja en el ángulo de Brewster (θt + θr = 90°).','En ese ángulo, la componente que vibra en el plano de incidencia no se refleja; el reflejo queda solo con E paralelo a la superficie.',''),'b)');
  ex('E1','5','Ángulo límite, Brewster e índice del vidrio','El ángulo límite entre el vidrio y el agua es 60° y el índice de refracción del agua es 1,333. (a) Calcular el ángulo de Brewster entre el agua y el vidrio. (b) Calcular el ángulo de Brewster entre el aire y el agua. (c) ¿Cuál es el índice de refracción absoluto del vidrio?',
    part('(c) primero: índice del vidrio',res({plan:'Empezamos por el índice del vidrio, porque lo necesitamos para (a); sale de la fórmula del ángulo límite.',from:[F.lim],syms:[S.tl,[R`n_1`,'índice del vidrio (medio más denso, incógnita)',''],[R`n_2`,'índice del agua = 1,333','']],steps:[['Despeje y cuenta',chain(R`n_{vidrio}=\frac{n_{agua}}{\mathrm{sen}\,60^\circ}=\frac{1{,}333}{0{,}866}\approx1{,}539`)]]}))+
    part('(a) Brewster agua → vidrio',res({plan:'Aplicamos Brewster con la luz viniendo del agua.',from:[F.brew],syms:[S.tB,S.n1,S.n2],steps:[['Cuenta',chain(R`\mathrm{tg}\,\theta_B=\frac{1{,}539}{1{,}333}=1{,}155`,R`\theta_B\approx49{,}1^\circ=49^\circ\,6'\,24''`)]]}))+
    part('(b) Brewster aire → agua',res({plan:'Aplicamos Brewster con n₁ = 1 (aire) y n₂ = 1,333.',from:[F.brew],steps:[['Cuenta',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}333\approx53{,}12^\circ=53^\circ\,7'\,24''`)]],ctrl:'Si la luz fuera de vidrio a agua, θB = 90° − 49,1° = 40,9°: conviene aclarar el sentido.'})),
    '(a) θB ≈ 49,1° · (b) θB ≈ 53,1° (53° 7′ 24″) · (c) n<sub>vidrio</sub> ≈ 1,539');
  ex('E1','6','Trehalosa en el polarímetro','La rotación específica de la trehalosa (isómero de la sacarosa) en agua es 178,3 °·mL/(g·dm). ¿Cuál es la concentración de una solución acuosa de trehalosa cuyo giro en un polarímetro es de 20°? (La longitud del tubo es 10 cm).',
    res({plan:'Despejamos la concentración de la ley de Biot, cuidando pasar el tubo a decímetros.',from:[F.biot],syms:[S.a,S.sa,S.l,S.cc],steps:[['Unidades','<p>l = 10 cm = 1 dm.</p>'],['Despeje y cuenta',chain(R`c=\frac{\alpha}{[\alpha]\,l}=\frac{20}{178{,}3\cdot1}\approx0{,}112\ \mathrm{g/mL}`)]]}),'c ≈ 0,112 g/mL = 112 g/L');

  // ===== Modelos 2 a 5 =====
  ex('E2','1','Polarización circular',mc('La luz está polarizada circularmente cuando sus componentes Ex y Ey:',['Oscilan en fase','Tienen un desfase de 90° y la misma amplitud máxima','Tienen un desfase arbitrario y distinta amplitud']),why('Comparamos con las condiciones de cada tipo.','Circular: desfase 90° <b>y</b> amplitudes iguales.','En fase es lineal; lo demás, elíptica.'),'b)');
  ex('E2','2','¿Qué ondas se polarizan?',mc('Se pueden polarizar:',['Solo las ondas transversales','Solo las ondas longitudinales','Todas las ondas mecánicas']),why('Pensamos qué significa elegir una dirección de oscilación.','Polarizar es elegir una dirección perpendicular al avance; las longitudinales oscilan en la dirección del avance.','El sonido es mecánico y longitudinal: no se polariza.'),'a)');
  ex('E2','3','Luz natural en un filtro',mc('Luz natural de intensidad I₀ atraviesa un polarizador. La intensidad que sale es:',['I₀','I₀/2','I₀·cos²α']),res({plan:'Usamos la regla del primer filtro con luz natural.',from:[F.nat],concept:'<p>El promedio de cos²α en todas las direcciones es ½.</p>'}),'b)');
  ex('E2','4','Analizador a 60°',mc('Luz polarizada atraviesa un analizador cuyo eje forma 60° con la polarización. Sale:',['El 50 %','El 25 %','El 75 %']),res({plan:'Aplicamos Malus con 60°.',from:[F.malus],steps:[['Cuenta',chain(R`\cos^2 60^\circ=0{,}25`)]]}),'b)');
  ex('E2','5','Tres polarizadores','Luz natural de 100 W/m² atraviesa tres polarizadores: el segundo a 30° del primero y el tercero a 30° del segundo. Calcular la intensidad después de cada uno.',
    quick('Aplicamos la regla de la luz natural y después Malus en cada filtro con el ángulo relativo.',[F.nat,F.malus],[S.I0,S.al,S.I],[['Cuentas',chain(R`I_1=50`,R`I_2=50\cos^2 30^\circ=37{,}5`,R`I_3=37{,}5\cos^2 30^\circ\approx28{,}1\ \mathrm{W/m^2}`)]]),'50 · 37,5 · ≈ 28,1 W/m²');
  ex('E2','6','Snell y Brewster en un plástico','Un rayo pasa del aire a un plástico con θi = 40° y θt = 23,7°. (a) Calcular el índice del plástico. (b) Calcular el ángulo de Brewster aire → plástico y el ángulo refractado en ese caso.',
    part('(a)',quick('Despejamos n₂ de Snell.',[F.snell],[S.n2],[['Cuenta',chain(R`n_2=\frac{\mathrm{sen}\,40^\circ}{\mathrm{sen}\,23{,}7^\circ}=\frac{0{,}643}{0{,}402}\approx1{,}60`)]]))+part('(b)',quick('Aplicamos Brewster y la condición θt + θr = 90°.',[F.brew],[S.tB],[['Cuentas',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}60\approx58{,}0^\circ`,R`\theta_t=32{,}0^\circ`)]])),'(a) n ≈ 1,60 · (b) θB ≈ 58,0°, θt ≈ 32,0°');
  ex('E2','7','Sacarosa en el polarímetro','Sacarosa: [α] = +66,5 °·mL/(g·dm). Se usa un tubo de 20 cm con una solución de 0,12 g/mL. ¿Cuánto gira el plano de polarización y en qué sentido?',
    quick('Aplicamos Biot con l = 2 dm.',[F.biot],[S.a,S.sa,S.l,S.cc],[['Cuenta',chain(R`\alpha=66{,}5\cdot2\cdot0{,}12\approx16{,}0^\circ`)]],'Positivo: dextrógira.'),'≈ +16,0°, dextrógira');

  ex('E3','1','Rayo ordinario',mc('En un cristal birrefringente como la calcita:',['El rayo ordinario cumple la ley de Snell y el extraordinario no','Los dos rayos cumplen la ley de Snell','Ninguno sale polarizado']),why('Recordamos cómo se comportan los dos rayos.','El ordinario tiene un solo índice y cumple Snell; el extraordinario no.','Los dos salen polarizados, en direcciones perpendiculares.'),'a)');
  ex('E3','2','Prisma de Nicol',mc('En el prisma de Nicol, el rayo ordinario:',['Sigue derecho y sale polarizado','Sufre reflexión total en el bálsamo de Canadá y se desvía','Se absorbe por completo en la calcita']),why('Recordamos para qué sirve el bálsamo de Canadá.','El ordinario llega al bálsamo con un ángulo mayor que el límite y se refleja totalmente; sigue solo el extraordinario, polarizado.',''),'b)');
  ex('E3','3','Reflexión total',mc('Puede haber reflexión total cuando la luz:',['Pasa de un medio de menor a uno de mayor índice','Pasa de un medio de mayor a uno de menor índice, con θi mayor que el ángulo límite','Incide perpendicular a la superficie']),res({plan:'Miramos cuándo existe el ángulo límite.',from:[F.lim],concept:'<p>Solo si n₁ &gt; n₂ el cociente n₂/n₁ es menor que 1 y existe θlím.</p>'}),'b)');
  ex('E3','4','Sustancia levógira',mc('Una sustancia levógira:',['Gira el plano de polarización en sentido horario','Gira el plano de polarización en sentido antihorario','No modifica la polarización']),why('Recordamos los nombres del sentido de giro.','Levógira = izquierda = antihorario, signo −.',''),'b)');
  ex('E3','5','Diamante','(a) Calcular el ángulo límite entre diamante (n = 2,42) y aire. (b) Un rayo dentro del diamante llega a la cara con 30°: ¿sale? (c) ¿Por qué brilla tanto un diamante tallado?',
    part('(a)',quick('Aplicamos la fórmula del ángulo límite.',[F.lim],[S.tl],[['Cuenta',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1}{2{,}42}\approx24{,}4^\circ`)]]))+part('(b) y (c)',res({plan:'Comparamos 30° con el límite y explicamos el brillo.',steps:[['Comparación','<p>30° &gt; 24,4°: reflexión total, no sale. Con un ángulo límite tan chico casi toda la luz rebota adentro antes de salir por arriba: por eso brilla.</p>']]})),'(a) 24,4° · (b) no: reflexión total · (c) θlím muy chico');
  ex('E3','6','Lámina absorbente','Una lámina de 0,4 mm transmite el 25 % de la luz. (a) Calcular K. (b) ¿Qué porcentaje transmite una lámina de 1 mm del mismo material?',
    quick('Calculamos K con Lambert y la usamos para el nuevo espesor.',[F.lamb],[S.T,S.A,S.K,S.d],[['(a)',chain(R`A=-\log0{,}25=0{,}602`,R`K=\frac{0{,}602}{0{,}4}\approx1{,}51\ \mathrm{mm^{-1}}`)],['(b)',chain(R`A=1{,}51\ \Rightarrow\ T=10^{-1{,}51}\approx0{,}031`)]]),'(a) K ≈ 1,51 mm⁻¹ · (b) ≈ 3,1 %');
  ex('E3','7','Fructosa en el polarímetro','Una solución de fructosa ([α] = −92 °·mL/(g·dm)) gira −39,8° en un tubo de 20 cm. Calcular la concentración.',
    quick('Despejamos c de Biot con l = 2 dm.',[F.biot],[S.a,S.sa,S.l,S.cc],[['Cuenta',chain(R`c=\frac{-39{,}8}{-92\cdot2}\approx0{,}216\ \mathrm{g/mL}`)]]),'c ≈ 0,216 g/mL');

  ex('E4','1','Interferencia destructiva',mc('Hay interferencia destructiva cuando se superponen:',['Máximo con máximo','Máximo con mínimo','Dos ondas en fase']),why('Recordamos cuándo las amplitudes se restan.','Desfase de 180° (máximo con mínimo): se restan.',''),'b)');
  ex('E4','2','Difracción',mc('La difracción se nota más cuando la abertura a es:',['Mucho mayor que λ','Parecida a λ','Siempre igual, no depende de λ']),why('Comparamos abertura y longitud de onda.','Con a ≈ λ la onda sale circular de la rendija.',''),'b)');
  ex('E4','3','Polarización elíptica',mc('Si Ex y Ey tienen un desfase de 40° y la misma amplitud, la polarización es:',['Lineal','Circular','Elíptica']),why('Comparamos con las condiciones de cada tipo.','Ni 0° (lineal) ni 90° con amplitudes iguales (circular): elíptica.',''),'c)');
  ex('E4','4','Condición de Brewster',mc('En el ángulo de Brewster se cumple:',['θi + θt = 90°','θt + θr = 90°','θi = θt']),why('Recordamos la condición de la carpeta.','Reflejado y refractado son perpendiculares: θt + θr = 90°. Como θr = θi, la a dice lo mismo.',''),'b) (equivalente a la a)');
  ex('E4','5','Luz naranja','(a) Calcular la frecuencia de una luz de 600 nm. (b) Esa luz incide desde el aire sobre un vidrio con el ángulo de Brewster y el rayo refractado sale a 33°. Calcular θB y el índice del vidrio.',
    part('(a)',quick('Despejamos f de v = λf.',[F.onda],[S.c,S.lam,S.f],[['Cuenta',chain(R`f=\frac{3\cdot10^8}{600\cdot10^{-9}}=5\cdot10^{14}\ \mathrm{Hz}`)]]))+part('(b)',quick('Usamos la condición θt + θr = 90° para hallar θB y después Brewster para n.',[[R`\theta_t+\theta_r=90^\circ`,'Condición'],F.brew],[S.tB,S.n2],[['Cuentas',chain(R`\theta_B=90^\circ-33^\circ=57^\circ`,R`n=\mathrm{tg}\,57^\circ\approx1{,}54`)]])),'(a) 5·10¹⁴ Hz · (b) θB = 57°, n ≈ 1,54');
  ex('E4','6','Lambert-Beer','Una solución tiene ε = 1,3·10⁴ L/(mol·cm). En una cubeta de 1 cm su absorbancia es 0,52. (a) Calcular la concentración. (b) ¿Qué porcentaje de la luz transmite?',
    quick('Despejamos c de Lambert-Beer y después T de la absorbancia.',[F.beer,[R`T=10^{-A}`,'Transmitancia']],[S.A,S.eps,S.cm,S.T],[['(a)',chain(R`c=\frac{0{,}52}{1{,}3\cdot10^4\cdot1}=4\cdot10^{-5}\ \mathrm{mol/L}`)],['(b)',chain(R`T=10^{-0{,}52}\approx0{,}302`)]]),'(a) 4·10⁻⁵ mol/L · (b) ≈ 30 %');
  ex('E4','7','Malus inverso','Luz natural de 200 W/m² atraviesa un polarizador y un analizador; a la salida se miden 25 W/m². ¿Qué ángulo forman los ejes?',
    quick('Calculamos lo que sale del primer filtro y despejamos α de Malus.',[F.nat,F.malus],[S.al],[['Cuentas',chain(R`I_1=100`,R`\cos^2\alpha=\frac{25}{100}=0{,}25\ \Rightarrow\ \alpha=60^\circ`)]]),'α = 60°');

  ex('E5','1','Anteojos polarizados',mc('Los anteojos polarizados eliminan el reflejo del agua porque el reflejo:',['No está polarizado','Está polarizado paralelo a la superficie y el filtro tiene el eje vertical','Está polarizado verticalmente']),why('Unimos Brewster con Malus.','Cerca de θB el reflejo vibra paralelo a la superficie (horizontal); con el eje vertical, α = 90° y no pasa.',''),'b)');
  ex('E5','2','Polarizadores cruzados',mc('Dos polarizadores cruzados (90°) reciben luz natural. A la salida:',['Sale la mitad','Sale un cuarto','No sale luz']),res({plan:'Mitad en el primero y Malus con 90°.',from:[F.malus],steps:[['Cuenta',chain(R`I=\frac{I_0}{2}\cos^2 90^\circ=0`)]]}),'c)');
  ex('E5','3','Polarización lineal',mc('La luz está polarizada linealmente cuando Ex y Ey:',['Oscilan en fase','Tienen desfase de 90°','Cambian al azar cada 10⁻⁸ s']),why('Comparamos con la definición.','En fase, la punta de E se mueve sobre una recta.','La c describe luz natural.'),'a)');
  ex('E5','4','Absorbancia',mc('Si una solución transmite el 10 % de la luz, su absorbancia es:',['0,1','1','10']),res({plan:'Aplicamos la definición de absorbancia.',from:[[R`A=-\log T`,'Absorbancia']],steps:[['Cuenta',chain(R`A=-\log0{,}1=1`)]]}),'b)');
  ex('E5','5','Vidrio, agua y aire','El ángulo límite entre un vidrio y el aire es 41,8°; el índice del agua es 1,33. (a) Calcular el índice del vidrio. (b) Ángulo de Brewster aire → vidrio. (c) Ángulo de Brewster agua → vidrio. (d) Ángulo límite vidrio → agua.',
    quick('Hallamos el índice del vidrio con el ángulo límite y lo usamos en Brewster y en el nuevo ángulo límite.',[F.lim,F.brew],[S.tl,S.tB],[['(a)',chain(R`n=\frac{1}{\mathrm{sen}\,41{,}8^\circ}\approx1{,}50`)],['(b)',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}50\approx56{,}3^\circ`)],['(c)',chain(R`\theta_B=\mathrm{tg}^{-1}\frac{1{,}50}{1{,}33}\approx48{,}4^\circ`)],['(d)',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1{,}33}{1{,}50}\approx62{,}4^\circ`)]]),'(a) 1,50 · (b) 56,3° · (c) 48,4° · (d) 62,4°');
  ex('E5','6','Largo del tubo','Una solución de fructosa ([α] = −92 °·mL/(g·dm)) de 0,25 g/mL gira −46°. ¿Cuánto mide el tubo, en cm?',
    quick('Despejamos l de Biot y pasamos a cm.',[F.biot],[S.l],[['Cuenta',chain(R`l=\frac{-46}{-92\cdot0{,}25}=2\ \mathrm{dm}=20\ \mathrm{cm}`)]]),'l = 20 cm');
  ex('E5','7','Compuesto en cubeta','Se disuelven 0,5 g de un compuesto (M = 180 g/mol) hasta 250 mL. Su ε es 150 L/(mol·cm) y la cubeta mide 1 cm. Calcular c, A y el porcentaje transmitido.',
    quick('Pasamos a molaridad, aplicamos Lambert-Beer y despejamos T.',[F.mol,F.beer],[S.cm,S.A,S.T],[['c',chain(R`n=\frac{0{,}5}{180}=2{,}78\cdot10^{-3}\ \mathrm{mol}`,R`c=\frac{2{,}78\cdot10^{-3}}{0{,}250}=1{,}11\cdot10^{-2}\ \mathrm{mol/L}`)],['A y T',chain(R`A=150\cdot1{,}11\cdot10^{-2}\approx1{,}67`,R`T=10^{-1{,}67}\approx0{,}022`)]]),'c ≈ 1,11·10⁻² mol/L · A ≈ 1,67 · ≈ 2,2 %');

  window.ET27_OPTICA={
    title:'Óptica física',
    lead:'Ondas, interferencia y difracción, polarización, ley de Malus, Snell, ángulo límite, Brewster, birrefringencia, ley de Biot y Lambert-Beer, con la evaluación original y cuatro modelos resueltos.',
    sections, exercises
  };
})();
