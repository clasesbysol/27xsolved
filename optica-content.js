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
  add('practica','Práctica resuelta · 30 ejercicios','PRÁCTICA · 12',`
<p>Ejercicios nuevos de todo el tema, del más directo al más integrador. Cada resolución sigue el orden: <b>qué piden → ley → despeje → cuenta → control</b>.</p>
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
  const exercises=[];
  const ex=(group,n,title,statement,solution,answer)=>exercises.push({group,n,title,statement,solution,answer});
  const mc=(q,opts)=>`<p>${q}</p><ol type="a">${opts.map(o=>`<li>${o}</li>`).join('')}</ol>`;
  const why=t=>`<div class="kitBox kitIdea"><b>Por qué</b><p>${t}</p></div>`;
  const control=t=>`<div class="kitBox kitIdea"><b>✓ Control</b><p>${t}</p></div>`;

  // Práctica (P1–P30)
  ex('P','P1','Luz verde','Luz verde de λ = 530 nm viaja por el aire. ¿Cuál es su frecuencia?',
    chain(R`f=\frac{c}{\lambda}=\frac{3\cdot10^8}{530\cdot10^{-9}}`,R`f\approx5{,}66\cdot10^{14}\ \mathrm{Hz}`),'f ≈ 5,7·10¹⁴ Hz');
  ex('P','P2','Radio FM','Una radio FM transmite en 100,1 MHz. ¿Qué longitud de onda emite?',
    chain(R`\lambda=\frac{3\cdot10^8}{100{,}1\cdot10^6}\approx3{,}0\ \mathrm{m}`),'λ ≈ 3,0 m');
  ex('P','P3','Wifi','El wifi trabaja a 2,4 GHz. ¿Cuánto mide λ en centímetros?',
    chain(R`\lambda=\frac{3\cdot10^8}{2{,}4\cdot10^9}=0{,}125\ \mathrm{m}=12{,}5\ \mathrm{cm}`),'λ = 12,5 cm');
  ex('P','P4','Sonido grave','Un sonido tiene λ = 1,7 m en el aire (v = 340 m/s). ¿Cuál es su frecuencia?',
    chain(R`f=\frac{340}{1{,}7}=200\ \mathrm{Hz}`),'f = 200 Hz');
  ex('P','P5','Suma de ondas','Dos ondas de 3 cm y 5 cm de amplitud se superponen. Calculá la amplitud resultante si están (a) en fase, (b) desfasadas 180°.',
    step('a) En fase','<p>Constructiva: las amplitudes se suman. 3 + 5 = 8 cm.</p>')+step('b) Oposición','<p>Destructiva: se restan. 5 − 3 = 2 cm.</p>'),'(a) 8 cm · (b) 2 cm');
  ex('P','P6','Puerta abierta','Explicá por qué escuchás a alguien que habla detrás de una puerta abierta pero no lo ves.',
    why('El sonido (λ ≈ 0,8 m) tiene longitud de onda parecida al ancho de la puerta y se difracta. La luz (λ ≈ 500 nm) es muchísimo menor que la abertura y casi no se difracta.'),'Difracción: a ≈ λ para el sonido, a ≫ λ para la luz.');
  ex('P','P7','Identificar la polarización',mc('Clasificá cada caso:',['Ex,máx = 3, Ey,máx = 3, desfase 0°','Ex,máx = 5, Ey,máx = 5, desfase 90°','Ex,máx = 2, Ey,máx = 5, desfase 90°','Ex,máx = 3, Ey,máx = 3, desfase 30°']),
    table(['Caso','Tipo','Por qué'],[['a','Lineal a 45°','en fase; tg α = 3/3'],['b','Circular','90° y amplitudes iguales'],['c','Elíptica','90° pero amplitudes distintas'],['d','Elíptica','desfase arbitrario']]),'a lineal · b circular · c y d elípticas');
  ex('P','P8','Ángulo de una lineal','Una onda tiene Ex,máx = 3 y Ey,máx = 4 en fase. ¿Qué ángulo forma E con el eje x?',
    chain(R`\mathrm{tg}\,\alpha=\frac{4}{3}`,R`\alpha=\mathrm{tg}^{-1}(1{,}333)\approx53{,}1^\circ`),'Lineal, α ≈ 53,1°');
  ex('P','P9','Malus a 30°','Luz polarizada de 80 W/m² atraviesa un polarizador cuyo eje forma 30° con la polarización. ¿Cuánto sale?',
    chain(R`I=80\cos^2 30^\circ=80\cdot0{,}75=60\ \mathrm{W/m^2}`),'60 W/m²');
  ex('P','P10','Malus a 60°','La misma luz de 80 W/m², con el eje a 60°.',chain(R`I=80\cos^2 60^\circ=80\cdot0{,}25=20\ \mathrm{W/m^2}`),'20 W/m²');
  ex('P','P11','Luz natural y analizador','Luz natural de 120 W/m² atraviesa un polarizador y luego un analizador a 45°. ¿Intensidad final?',
    chain([R`I_1=120/2=60\ \mathrm{W/m^2}`,'luz natural'],[R`I_2=60\cos^2 45^\circ=30\ \mathrm{W/m^2}`,'Malus']),'30 W/m²');
  ex('P','P12','Ángulo para el 25 %','¿Qué ángulo debe formar el analizador para dejar pasar el 25 % de la luz polarizada?',
    chain(R`\cos^2\alpha=0{,}25`,R`\cos\alpha=0{,}5`,R`\alpha=60^\circ`),'α = 60°');
  ex('P','P13','Ejes alineados','Luz natural de 90 W/m² atraviesa dos polarizadores con los ejes alineados. ¿Cuánto sale de cada uno?',
    chain([R`I_1=45\ \mathrm{W/m^2}`,'primer filtro'],[R`I_2=45\cos^2 0^\circ=45\ \mathrm{W/m^2}`,'misma intensidad']),'45 W/m² y 45 W/m²');
  ex('P','P14','Dos filtros a 30°','Luz natural de 90 W/m² pasa por dos polarizadores cuyos ejes forman 30°. ¿Intensidad final?',
    chain(R`I=45\cdot\cos^2 30^\circ=45\cdot0{,}75=33{,}75\ \mathrm{W/m^2}`),'≈ 33,8 W/m²');
  ex('P','P15','Aire → vidrio','Un rayo pasa del aire al vidrio (n = 1,5) con θi = 45°. Calculá θt.',
    chain(R`\mathrm{sen}\,\theta_t=\frac{1\cdot\mathrm{sen}\,45^\circ}{1{,}5}=0{,}471`,R`\theta_t\approx28{,}1^\circ`),'θt ≈ 28,1°');
  ex('P','P16','Agua → aire','Un rayo pasa del agua (1,33) al aire con θi = 40°. Calculá θt.',
    chain(R`\mathrm{sen}\,\theta_t=1{,}33\cdot\mathrm{sen}\,40^\circ=0{,}855`,R`\theta_t\approx58{,}7^\circ`)+control('Se aleja de la normal porque pasa a menor índice.'),'θt ≈ 58,7°');
  ex('P','P17','Índice desconocido','Un rayo pasa del aire a un material: θi = 60° y θt = 35°. ¿Cuál es el índice del material?',
    chain(R`n_2=\frac{\mathrm{sen}\,60^\circ}{\mathrm{sen}\,35^\circ}=\frac{0{,}866}{0{,}574}\approx1{,}51`),'n ≈ 1,51 (vidrio)');
  ex('P','P18','Aire → diamante','Aire → diamante (n = 2,42) con θi = 50°. Calculá θt.',
    chain(R`\mathrm{sen}\,\theta_t=\frac{\mathrm{sen}\,50^\circ}{2{,}42}=0{,}317`,R`\theta_t\approx18{,}5^\circ`),'θt ≈ 18,5°');
  ex('P','P19','Ángulo límite agua–aire','Calculá el ángulo límite entre agua (1,33) y aire.',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1}{1{,}33}\approx48{,}8^\circ`),'48,8°');
  ex('P','P20','¿Sale del agua?','Un rayo dentro del agua llega a la superficie con 50°. ¿Sale al aire?',
    why('50° &gt; 48,8° (ángulo límite agua–aire): hay reflexión total.'),'No sale: reflexión total.');
  ex('P','P21','Vidrio → agua','Un rayo pasa de vidrio (1,5) a agua (1,33) con 50°. ¿Se refracta? Calculá θt o el ángulo límite.',
    chain([R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1{,}33}{1{,}5}\approx62{,}5^\circ`,'50° &lt; 62,5°: se refracta'],[R`\mathrm{sen}\,\theta_t=\frac{1{,}5\,\mathrm{sen}\,50^\circ}{1{,}33}=0{,}864`],R`\theta_t\approx59{,}8^\circ`),'Se refracta: θt ≈ 59,8° (θlím ≈ 62,5°)');
  ex('P','P22','Índice a partir del límite','El ángulo límite entre un plástico y el aire es 42°. ¿Cuál es el índice del plástico?',
    chain(R`n=\frac{1}{\mathrm{sen}\,42^\circ}=\frac{1}{0{,}669}\approx1{,}49`),'n ≈ 1,49');
  ex('P','P23','Brewster aire–vidrio','Calculá el ángulo de Brewster aire → vidrio (n = 1,5) y el ángulo refractado.',
    chain(R`\theta_B=\mathrm{tg}^{-1}1{,}5\approx56{,}3^\circ`,R`\theta_t=90^\circ-56{,}3^\circ=33{,}7^\circ`),'θB ≈ 56,3° · θt ≈ 33,7°');
  ex('P','P24','Índice desde Brewster','Se mide un ángulo de Brewster de 58° (desde el aire). ¿Cuál es el índice del material?',
    chain(R`n=\mathrm{tg}\,58^\circ\approx1{,}60`),'n ≈ 1,60');
  ex('P','P25','Brewster agua → vidrio','Calculá el ángulo de Brewster para luz que va de agua (1,33) a vidrio (1,5).',
    chain(R`\theta_B=\mathrm{tg}^{-1}\frac{1{,}5}{1{,}33}=\mathrm{tg}^{-1}1{,}128\approx48{,}4^\circ`),'θB ≈ 48,4°');
  ex('P','P26','Sacarosa','Sacarosa: [α] = +66,5 °·mL/(g·dm). Tubo de 20 cm, c = 0,10 g/mL. ¿Cuánto gira y hacia dónde?',
    chain([R`l=20\ \mathrm{cm}=2\ \mathrm{dm}`],R`\alpha=66{,}5\cdot2\cdot0{,}10=13{,}3^\circ`),'+13,3° · dextrógira (horario)');
  ex('P','P27','Concentración con polarímetro','Una solución de sacarosa en un tubo de 1 dm gira +10°. ¿Cuál es su concentración?',
    chain(R`c=\frac{10}{66{,}5\cdot1}\approx0{,}150\ \mathrm{g/mL}`),'c ≈ 0,15 g/mL');
  ex('P','P28','Fructosa','Fructosa: [α] = −92 °·mL/(g·dm). l = 1,5 dm, c = 0,20 g/mL. Calculá α.',
    chain(R`\alpha=-92\cdot1{,}5\cdot0{,}20=-27{,}6^\circ`),'−27,6° · levógira (antihorario)');
  ex('P','P29','Lámina más gruesa','Un material de 0,22 mm transmite 16 % (K ≈ 3,62 mm⁻¹). ¿Qué porcentaje transmite una lámina de 0,5 mm?',
    chain(R`A=K\,d=3{,}62\cdot0{,}5\approx1{,}81`,R`T=10^{-1{,}81}\approx0{,}0155`),'≈ 1,6 %');
  ex('P','P30','Duplicar la concentración','Una solución transmite el 40 %. Si se duplica la concentración (misma cubeta), ¿qué porcentaje transmite?',
    chain([R`A_1=-\log0{,}40=0{,}398`],[R`A_2=2A_1=0{,}796`,'A ∝ c'],R`T_2=10^{-0{,}796}=0{,}16`)+control('Atajo: T₂ = T₁² = 0,4² = 0,16.'),'16 %');

  // Evaluación original (E1)
  ex('E1','1','Qué es la polarización',mc('En óptica física, a la luz la entendemos como las oscilaciones del campo eléctrico que se transmiten en forma de onda. En este contexto la polarización de la luz se puede entender como:',['La dirección de propagación de la luz','La trayectoria del extremo del vector “campo eléctrico”','La longitud de onda de la luz']),
    why('La polarización describe <b>cómo oscila E</b>: la figura que recorre su extremo (recta, círculo o elipse). La dirección de propagación es hacia dónde avanza la onda y no distingue entre una luz polarizada y una que no lo está.')+fix('Error de la hoja',`<p>En la hoja se marcó la opción a (dirección de propagación): es incorrecta.</p>`),'b) La trayectoria del extremo del vector campo eléctrico.');
  ex('E1','2','Luz no polarizada',mc('Entendemos por luz no polarizada aquella que:',['Su vector campo eléctrico vibra en una sola dirección','Su vector campo eléctrico cambia aleatoriamente su plano de vibración cada 10⁻⁸ s (vibra en todas direcciones)','Su vector campo eléctrico sigue una trayectoria circular o elíptica']),
    why('Las fuentes emiten pulsos muy cortos (~10⁻⁸ s) con polarización al azar. La opción a describe luz polarizada linealmente y la c, polarización circular o elíptica.'),'b)');
  ex('E1','3','Dos polarizadores alineados',mc('Cuando la luz no polarizada atraviesa un polarizador lineal, sale polarizada alineada con el eje de polarización. Si tengo dos polarizadores con sus ejes alineados:',['La luz sale del segundo polarizador con la misma intensidad que salió del primero','La luz sale del segundo con la mitad de la intensidad que salió del primero','La luz sale del segundo con intensidad nula']),
    chain([R`I_2=I_1\cos^2 0^\circ=I_1`,'Malus con α = 0°'])+why('La mitad se pierde en el <b>primer</b> filtro (luz natural). Intensidad nula sería con los ejes cruzados.'),'a)');
  ex('E1','4','Reflexión en el ángulo de Brewster',mc('Cuando la luz no polarizada se refleja en una superficie con su ángulo de Brewster:',['El haz reflejado tiene polarización lineal con plano de vibración perpendicular a la superficie','El haz reflejado tiene polarización lineal con plano de vibración paralelo a la superficie','El haz reflejado no está polarizado']),
    why('En el ángulo de Brewster (θt + θr = 90°) la componente que vibra en el plano de incidencia no se refleja; el reflejo queda solo con E paralelo a la superficie.'),'b)');
  ex('E1','5','Ángulo límite, Brewster e índice del vidrio','El ángulo límite entre el vidrio y el agua es 60° y el índice de refracción del agua es 1,333. (a) Calcular el ángulo de Brewster entre el agua y el vidrio. (b) Calcular el ángulo de Brewster entre el aire y el agua. (c) ¿Cuál es el índice de refracción absoluto del vidrio?',
    step('Primero el índice del vidrio (c)','<p>El ángulo límite existe del vidrio (mayor n) hacia el agua:</p>'+chain(R`\mathrm{sen}\,\theta_{lim}=\frac{n_{agua}}{n_{vidrio}}`,R`n_{vidrio}=\frac{1{,}333}{\mathrm{sen}\,60^\circ}=\frac{1{,}333}{0{,}866}`,R`n_{vidrio}\approx1{,}539`))+
    step('(a) Brewster agua → vidrio',chain(R`\mathrm{tg}\,\theta_B=\frac{n_{vidrio}}{n_{agua}}=\frac{1}{\mathrm{sen}\,60^\circ}=1{,}155`,R`\theta_B\approx49{,}1^\circ=49^\circ\,6'\,24''`))+
    step('(b) Brewster aire → agua',chain(R`\theta_B=\mathrm{tg}^{-1}\frac{1{,}333}{1}\approx53{,}12^\circ=53^\circ\,7'\,24''`))+
    control('Si la luz fuera de vidrio a agua, θB = 90° − 49,1° = 40,9°. Conviene aclarar el sentido en la respuesta.'),
    '(a) θB ≈ 49,1° · (b) θB ≈ 53,1° (53° 7′ 24″) · (c) n<sub>vidrio</sub> ≈ 1,539');
  ex('E1','6','Trehalosa en el polarímetro','La rotación específica de la trehalosa (isómero de la sacarosa) en agua es 178,3 °·mL/(g·dm). ¿Cuál es la concentración de una solución acuosa de trehalosa cuyo giro en un polarímetro es de 20°? (La longitud del tubo es 10 cm).',
    chain([R`l=10\ \mathrm{cm}=1\ \mathrm{dm}`],[R`c=\frac{\alpha}{[\alpha]\,l}=\frac{20}{178{,}3\cdot1}`],R`c\approx0{,}112\ \mathrm{g/mL}`),'c ≈ 0,112 g/mL = 112 g/L');

  // Modelo 2
  ex('E2','1','Polarización circular',mc('La luz está polarizada circularmente cuando sus componentes Ex y Ey:',['Oscilan en fase','Tienen un desfase de 90° y la misma amplitud máxima','Tienen un desfase arbitrario y distinta amplitud']),why('Desfase 90° con Ex,máx = Ey,máx: la punta de E recorre un círculo. En fase es lineal; lo demás, elíptica.'),'b)');
  ex('E2','2','¿Qué ondas se polarizan?',mc('Se pueden polarizar:',['Solo las ondas transversales','Solo las ondas longitudinales','Todas las ondas mecánicas']),why('Polarizar es elegir una dirección de oscilación perpendicular al avance; en una onda longitudinal (sonido) la oscilación va en la dirección del avance.'),'a)');
  ex('E2','3','Luz natural en un filtro',mc('Luz natural de intensidad I₀ atraviesa un polarizador. La intensidad que sale es:',['I₀','I₀/2','I₀·cos²α']),why('Promedio de cos²α en todas las direcciones = ½. Malus se usa a partir del segundo filtro.'),'b)');
  ex('E2','4','Analizador a 60°',mc('Luz polarizada atraviesa un analizador cuyo eje forma 60° con la polarización. Sale:',['El 50 %','El 25 %','El 75 %']),chain(R`\cos^2 60^\circ=0{,}25`),'b)');
  ex('E2','5','Tres polarizadores','Luz natural de 100 W/m² atraviesa tres polarizadores: el segundo a 30° del primero y el tercero a 30° del segundo. Calcular la intensidad después de cada uno.',
    chain([R`I_1=50\ \mathrm{W/m^2}`],[R`I_2=50\cos^2 30^\circ=37{,}5\ \mathrm{W/m^2}`],[R`I_3=37{,}5\cos^2 30^\circ\approx28{,}1\ \mathrm{W/m^2}`]),'50 · 37,5 · ≈ 28,1 W/m²');
  ex('E2','6','Snell y Brewster en un plástico','Un rayo pasa del aire a un plástico con θi = 40° y θt = 23,7°. (a) Calcular el índice del plástico. (b) Calcular el ángulo de Brewster aire → plástico y el ángulo refractado en ese caso.',
    step('(a)',chain(R`n=\frac{\mathrm{sen}\,40^\circ}{\mathrm{sen}\,23{,}7^\circ}=\frac{0{,}643}{0{,}402}\approx1{,}60`))+step('(b)',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}60\approx58{,}0^\circ`,R`\theta_t=90^\circ-58{,}0^\circ=32{,}0^\circ`)),'(a) n ≈ 1,60 · (b) θB ≈ 58,0° · θt ≈ 32,0°');
  ex('E2','7','Sacarosa en el polarímetro','Sacarosa: [α] = +66,5 °·mL/(g·dm). Se usa un tubo de 20 cm con una solución de 0,12 g/mL. ¿Cuánto gira el plano de polarización y en qué sentido?',
    chain([R`l=2\ \mathrm{dm}`],R`\alpha=66{,}5\cdot2\cdot0{,}12\approx16{,}0^\circ`),'≈ +16,0° · dextrógira (horario)');

  // Modelo 3
  ex('E3','1','Rayo ordinario',mc('En un cristal birrefringente como la calcita:',['El rayo ordinario cumple la ley de Snell y el extraordinario no','Los dos rayos cumplen la ley de Snell','Ninguno sale polarizado']),why('El ordinario tiene un único índice; el extraordinario, un índice que depende de la dirección. Los dos salen polarizados en direcciones perpendiculares.'),'a)');
  ex('E3','2','Prisma de Nicol',mc('En el prisma de Nicol, el rayo ordinario:',['Sigue derecho y sale polarizado','Sufre reflexión total en el bálsamo de Canadá y se desvía','Se absorbe por completo en la calcita']),why('Así el Nicol deja salir un único rayo (el extraordinario), linealmente polarizado.'),'b)');
  ex('E3','3','Reflexión total',mc('Puede haber reflexión total cuando la luz:',['Pasa de un medio de menor a uno de mayor índice','Pasa de un medio de mayor a uno de menor índice, con θi mayor que el ángulo límite','Incide perpendicular a la superficie']),why('Solo si n₁ &gt; n₂ existe θlím = sen⁻¹(n₂/n₁).'),'b)');
  ex('E3','4','Sustancia levógira',mc('Una sustancia levógira:',['Gira el plano de polarización en sentido horario','Gira el plano de polarización en sentido antihorario','No modifica la polarización']),why('Levógira = hacia la izquierda (antihorario), signo negativo.'),'b)');
  ex('E3','5','Diamante','(a) Calcular el ángulo límite entre diamante (n = 2,42) y aire. (b) Un rayo dentro del diamante llega a la cara con 30°: ¿sale? (c) ¿Por qué brilla tanto un diamante tallado?',
    step('(a)',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1}{2{,}42}\approx24{,}4^\circ`))+step('(b)','<p>30° &gt; 24,4°: reflexión total, no sale por esa cara.</p>')+step('(c)','<p>Con un ángulo límite tan chico, casi toda la luz que entra rebota varias veces adentro antes de salir por arriba.</p>'),'(a) 24,4° · (b) no: reflexión total · (c) θlím muy chico');
  ex('E3','6','Lámina absorbente','Una lámina de 0,4 mm transmite el 25 % de la luz. (a) Calcular K. (b) ¿Qué porcentaje transmite una lámina de 1 mm del mismo material?',
    step('(a)',chain(R`A=-\log0{,}25=0{,}602`,R`K=\frac{0{,}602}{0{,}4\ \mathrm{mm}}\approx1{,}51\ \mathrm{mm^{-1}}`))+step('(b)',chain(R`A=1{,}51\cdot1=1{,}51`,R`T=10^{-1{,}51}\approx0{,}031`)),'(a) K ≈ 1,51 mm⁻¹ · (b) ≈ 3,1 %');
  ex('E3','7','Fructosa en el polarímetro','Una solución de fructosa ([α] = −92 °·mL/(g·dm)) gira −39,8° en un tubo de 20 cm. Calcular la concentración.',
    chain([R`l=2\ \mathrm{dm}`],R`c=\frac{-39{,}8}{-92\cdot2}\approx0{,}216\ \mathrm{g/mL}`),'c ≈ 0,216 g/mL');

  // Modelo 4
  ex('E4','1','Interferencia destructiva',mc('Hay interferencia destructiva cuando se superponen:',['Máximo con máximo','Máximo con mínimo','Dos ondas en fase']),why('Desfase de 180°: las amplitudes se restan.'),'b)');
  ex('E4','2','Difracción',mc('La difracción se nota más cuando la abertura a es:',['Mucho mayor que λ','Parecida a λ','Siempre igual, no depende de λ']),why('Con a ≈ λ la onda sale de la rendija en forma circular.'),'b)');
  ex('E4','3','Polarización elíptica',mc('Si Ex y Ey tienen un desfase de 40° y la misma amplitud, la polarización es:',['Lineal','Circular','Elíptica']),why('Desfase distinto de 0° y de 90°: elíptica.'),'c)');
  ex('E4','4','Condición de Brewster',mc('En el ángulo de Brewster se cumple:',['θi + θt = 90°','θt + θr = 90°','θi = θt']),why('Reflejado y refractado son perpendiculares. Como θr = θi, también θi + θt = 90°; la forma de la carpeta es θt + θr = 90°.'),'b) (equivalente a la a, porque θr = θi)');
  ex('E4','5','Luz naranja','(a) Calcular la frecuencia de una luz de 600 nm. (b) Esa luz incide desde el aire sobre un vidrio con el ángulo de Brewster y el rayo refractado sale a 33°. Calcular θB y el índice del vidrio.',
    step('(a)',chain(R`f=\frac{3\cdot10^8}{600\cdot10^{-9}}=5\cdot10^{14}\ \mathrm{Hz}`))+step('(b)',chain([R`\theta_B=90^\circ-33^\circ=57^\circ`,'θt + θr = 90°'],R`n=\mathrm{tg}\,57^\circ\approx1{,}54`)),'(a) 5·10¹⁴ Hz · (b) θB = 57°, n ≈ 1,54');
  ex('E4','6','Lambert-Beer','Una solución tiene ε = 1,3·10⁴ L/(mol·cm). En una cubeta de 1 cm su absorbancia es 0,52. (a) Calcular la concentración. (b) ¿Qué porcentaje de la luz transmite?',
    step('(a)',chain(R`c=\frac{A}{\varepsilon\,d}=\frac{0{,}52}{1{,}3\cdot10^4\cdot1}=4\cdot10^{-5}\ \mathrm{mol/L}`))+step('(b)',chain(R`T=10^{-0{,}52}\approx0{,}302`)),'(a) 4·10⁻⁵ mol/L · (b) ≈ 30 %');
  ex('E4','7','Malus inverso','Luz natural de 200 W/m² atraviesa un polarizador y un analizador; a la salida se miden 25 W/m². ¿Qué ángulo forman los ejes?',
    chain([R`I_1=100\ \mathrm{W/m^2}`],R`\cos^2\alpha=\frac{25}{100}=0{,}25`,R`\alpha=60^\circ`),'α = 60°');

  // Modelo 5
  ex('E5','1','Plano de vibración del reflejo',mc('Los anteojos polarizados eliminan el reflejo del agua porque el reflejo:',['No está polarizado','Está polarizado paralelo a la superficie y el filtro tiene el eje vertical','Está polarizado verticalmente']),why('Cerca del ángulo de Brewster el reflejo vibra paralelo a la superficie (horizontal); con el eje del filtro vertical, α = 90° y no pasa.'),'b)');
  ex('E5','2','Polarizadores cruzados',mc('Dos polarizadores cruzados (90°) reciben luz natural. A la salida:',['Sale la mitad','Sale un cuarto','No sale luz']),chain(R`I=\frac{I_0}{2}\cos^2 90^\circ=0`),'c)');
  ex('E5','3','Polarización lineal',mc('La luz está polarizada linealmente cuando Ex y Ey:',['Oscilan en fase','Tienen desfase de 90°','Cambian al azar cada 10⁻⁸ s']),why('En fase, la punta de E se mueve sobre una recta.'),'a)');
  ex('E5','4','Absorbancia',mc('Si una solución transmite el 10 % de la luz, su absorbancia es:',['0,1','1','10']),chain(R`A=-\log0{,}1=1`),'b)');
  ex('E5','5','Vidrio, agua y aire','El ángulo límite entre un vidrio y el aire es 41,8°; el índice del agua es 1,33. (a) Calcular el índice del vidrio. (b) Ángulo de Brewster aire → vidrio. (c) Ángulo de Brewster agua → vidrio. (d) Ángulo límite vidrio → agua.',
    step('(a)',chain(R`n=\frac{1}{\mathrm{sen}\,41{,}8^\circ}\approx1{,}50`))+step('(b)',chain(R`\theta_B=\mathrm{tg}^{-1}1{,}50\approx56{,}3^\circ`))+step('(c)',chain(R`\theta_B=\mathrm{tg}^{-1}\frac{1{,}50}{1{,}33}\approx48{,}4^\circ`))+step('(d)',chain(R`\theta_{lim}=\mathrm{sen}^{-1}\frac{1{,}33}{1{,}50}\approx62{,}4^\circ`)),'(a) 1,50 · (b) 56,3° · (c) 48,4° · (d) 62,4°');
  ex('E5','6','Largo del tubo','Una solución de fructosa ([α] = −92 °·mL/(g·dm)) de 0,25 g/mL gira −46°. ¿Cuánto mide el tubo, en cm?',
    chain(R`l=\frac{\alpha}{[\alpha]\,c}=\frac{-46}{-92\cdot0{,}25}=2\ \mathrm{dm}`,R`l=20\ \mathrm{cm}`),'l = 2 dm = 20 cm');
  ex('E5','7','Glucosa en cubeta','Se disuelven 0,5 g de un compuesto (M = 180 g/mol) hasta 250 mL. Su ε es 150 L/(mol·cm) y la cubeta mide 1 cm. Calcular c, A y el porcentaje transmitido.',
    chain([R`n=\frac{0{,}5}{180}=2{,}78\cdot10^{-3}\ \mathrm{mol}`],[R`c=\frac{2{,}78\cdot10^{-3}}{0{,}250}=1{,}11\cdot10^{-2}\ \mathrm{mol/L}`],[R`A=150\cdot1{,}11\cdot10^{-2}\cdot1\approx1{,}67`],[R`T=10^{-1{,}67}\approx0{,}022`]),'c ≈ 1,11·10⁻² mol/L · A ≈ 1,67 · ≈ 2,2 %');

  window.ET27_OPTICA={
    title:'Óptica física',
    lead:'Ondas, interferencia y difracción, polarización, ley de Malus, Snell, ángulo límite, Brewster, birrefringencia, ley de Biot y Lambert-Beer, con la evaluación original y cuatro modelos resueltos.',
    sections, exercises
  };
})();
