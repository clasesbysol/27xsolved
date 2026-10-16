// 27xSOLved · Química Inorgánica 4.º · TRABAJO PRÁCTICO N.º 6 · Azufre y halógenos
// Dos partes separadas, como en el resto de la materia:
//  · Material teórico del TP (diapositivas «TP N.º 6: Calcógenos y Halógenos», 22 páginas) → unidades
//    de apoyo «Azufre y calcógenos» y «Los halógenos».
//  · Guía de laboratorio (5 páginas) → unidad «TP 6», ensayo por ensayo, con cuestionario resuelto.
// Unifica el material parcial que estaba cargado como «TP · Halógenos y azufre (n.º a confirmar)».
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q||!window.ET27_QI4)return;
  const {chain,idea,warn,fix,note,deep,example,step,table,figure,cards}=K;
  const {rx,rxs,f,vira,swatch,ensayo,punch,facts}=Q;
  const R=String.raw;
  const amp=t=>`<span class="qiAmp">ampliación</span>${t||''}`;
  const verT=(id,label)=>`<p class="guideLink">📘 Material teórico: <button type="button" class="textButton" data-result-go="qi:${id}">${label} →</button></p>`;
  const verG=(id,label)=>`<p class="guideLink">🧪 En el laboratorio: <button type="button" class="textButton" data-result-go="qi:tp6:${id}">${label} →</button></p>`;

  // =====================================================================
  // COLORES Y ESQUEMAS SVG
  // =====================================================================
  const C={agua:'#bcdcf5',dicr:'#f28c28',cr3:'#3f9a5a',mno4:'#8e2a9e',iodo:'#a8641c',i3:'#7a3410',violeta:'#7b3fa8',almidon:'#1f2f8f',br:'#e07b1a',cl:'#c8d94a',negro:'#262626',naranja:'#e8731c',blanco:'#f1f1f1',azul:'#2f7fd0',celeste:'#79c1ec',verde:'#7cc47a',rojo:'#d6332a',rosa:'#e889a8',amarillo:'#f2d21b',hcl:'#dfe8ee'};
  const defs=id=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>`;
  const T=(x,y,t,cls='strong',anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" class="svgText ${cls}">${t}</text>`;
  // Tubo de ensayo: o = {x, top, h, w, liq, lvl, layers:[[color,frac desde abajo]], ppt, gas, label, sub}
  const tube=o=>{const {x,top=24,h=100,w=28}=o,r=w/2,bot=top+h;let out='';
    const ly=top+h*(1-(o.lvl??0.6));
    if(o.gas)out+=`<rect x="${x+2}" y="${top+2}" width="${w-4}" height="${ly-top-2}" fill="${o.gas}" opacity=".5"/>`;
    const liq=(y,color,op=.8)=>`<path d="M${x+2} ${y} V${bot} a${r-2} ${r-2} 0 0 0 ${w-4} 0 V${y} Z" fill="${color}" opacity="${op}"/>`;
    if(o.layers){const tot=bot+r-ly;let acc=0;o.layers.forEach(([c,fr],i)=>{const y=bot+r-tot*(acc+fr);out+=i===0?liq(y,c):`<rect x="${x+2}" y="${y}" width="${w-4}" height="${tot*fr}" fill="${c}" opacity=".8"/>`;acc+=fr})}
    else if(o.liq)out+=o.liq==='clear'?`<path d="M${x+2} ${ly} V${bot} a${r-2} ${r-2} 0 0 0 ${w-4} 0 V${ly} Z" class="svgLiquid"/>`:liq(ly,o.liq);
    if(o.ppt)out+=`<ellipse cx="${x+r}" cy="${bot+r-7}" rx="${r-5}" ry="6" fill="${o.ppt}" stroke="#0004"/>`;
    if(o.crystals)out+=[[-5,-6],[3,-9],[6,-4],[-2,-3]].map(([dx,dy])=>`<rect x="${x+r+dx-2}" y="${bot+r+dy-3}" width="5" height="5" fill="#222" transform="rotate(30 ${x+r+dx} ${bot+r+dy})"/>`).join('');
    out+=`<path d="M${x} ${top} V${bot} a${r} ${r} 0 0 0 ${w} 0 V${top}" class="svgTube"/>`;
    if(o.label)out+=T(x+r,bot+r+20,o.label);
    if(o.sub)out+=(Array.isArray(o.sub)?o.sub:[o.sub]).map((t,i)=>T(x+r,bot+r+36+i*15,t,'qiSmall')).join('');
    return out};
  const svg={};

  svg.estadosS=`<svg viewBox="0 0 660 220" role="img" aria-label="Estados de oxidación del azufre: −2 en el sulfuro de hidrógeno, 0 en el azufre, +4 en el dióxido de azufre y +6 en el ácido sulfúrico">
    ${defs('tp6ArrS')}
    <line x1="60" y1="180" x2="600" y2="180" class="svgLine thickLine"/>
    ${[[-2,'H₂S · S²⁻','sólo reductor',C.amarillo],[0,'S','azufre',C.amarillo],[4,'SO₂ · SO₃²⁻','oxidante o reductor',C.dicr],[6,'H₂SO₄ · SO₄²⁻','sólo oxidante',C.azul]].map(([o,sp,d])=>{const x=90+(o+2)*60;return `<circle cx="${x}" cy="180" r="9" class="svgAccentFill"/>${T(x,208,o>0?'+'+o:o<0?'−'+(-o):'0')}${T(x,150,sp)}${T(x,130,d,'qiSmall')}`}).join('')}
    <path d="M450 108 Q 510 62 566 108" class="svgArrow" marker-end="url(#tp6ArrS)"/>${T(520,66,'se oxida (reductor)','qiSmall')}
    <path d="M440 108 Q 330 44 216 108" class="svgArrow" marker-end="url(#tp6ArrS)"/>${T(330,58,'se reduce (oxidante)','qiSmall')}
    ${T(330,24,'El SO₂ está en el medio: puede subir o bajar','strong')}
  </svg>`;

  // Anillo S8 visto desde arriba (corona) + cristales + cadenas.
  const ring=(cx,cy,r)=>{const p=[...Array(8)].map((_,i)=>{const a=i*Math.PI/4,rr=i%2?r*0.72:r;return [cx+rr*Math.cos(a),cy+rr*Math.sin(a)]});return `<polygon points="${p.map(q=>q.join(',')).join(' ')}" class="svgLine thickLine"/>${p.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${C.amarillo}" stroke="#a88a00"/>`).join('')}`};
  svg.alotropos=`<svg viewBox="0 0 660 230" role="img" aria-label="Alótropos: dioxígeno y ozono; azufre S8 en anillo con sus formas rómbica y monoclínica; azufre plástico en cadenas">
    <circle cx="44" cy="80" r="14" fill="#e0503a"/><circle cx="68" cy="80" r="14" fill="#e0503a"/>${T(56,118,'O₂')}${T(56,134,'dioxígeno','qiSmall')}
    <circle cx="108" cy="90" r="14" fill="#e0503a"/><circle cx="128" cy="72" r="14" fill="#e0503a"/><circle cx="148" cy="90" r="14" fill="#e0503a"/>${T(128,118,'O₃')}${T(128,134,'ozono','qiSmall')}
    ${T(96,170,'2 O₃(g) ⇌ 3 O₂(g)','qiSmall')}
    <line x1="190" y1="20" x2="190" y2="210" class="svgLayer"/>
    ${ring(262,82,46)}${T(262,156,'S₈')}${T(262,172,'anillo “corona”','qiSmall')}
    <polygon points="352,82 382,42 412,82 382,122" fill="${C.amarillo}" fill-opacity=".55" stroke="#a88a00" stroke-width="2"/>${T(382,148,'rómbico')}${T(382,164,'(Sα) estable','qiSmall')}${T(382,180,'a temp. ambiente','qiSmall')}
    ${[0,1,2,3].map(i=>`<rect x="${466+i*12}" y="${46+i*4}" width="6" height="${72-i*6}" fill="${C.amarillo}" fill-opacity=".6" stroke="#a88a00" transform="rotate(${-12+i*8} ${469+i*12} 82)"/>`).join('')}${T(486,148,'monoclínico')}${T(486,164,'(Sβ) agujas','qiSmall')}
    <path d="M560 60 q12 -18 24 0 t24 0 t24 0 M556 92 q12 18 24 0 t24 0 t24 0 M566 120 q10 -14 20 0 t20 0 t20 0" stroke="#b9861a" stroke-width="5" fill="none" stroke-linecap="round"/>${T(596,148,'plástico')}${T(596,164,'(Sₓ) cadenas','qiSmall')}
    ${T(434,206,'S₈: dos poliformas','qiSmall')}${T(596,182,'amorfo','qiSmall')}
  </svg>`;

  const lp=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse cx="0" cy="0" rx="11" ry="6" class="qiLonePair"/><text x="0" y="4" text-anchor="middle" class="svgText strong">··</text></g>`;
  svg.enlace=`<svg viewBox="0 0 660 196" role="img" aria-label="En el enlace O–O los pares libres quedan muy cerca y se repelen; en el S–S, al ser átomos más grandes, quedan más lejos">
    <line x1="120" y1="95" x2="180" y2="95" class="svgLine thickLine"/>
    <circle cx="120" cy="95" r="22" fill="#e0503a" fill-opacity=".85"/><circle cx="180" cy="95" r="22" fill="#e0503a" fill-opacity=".85"/>${T(120,100,'O')}${T(180,100,'O')}
    ${lp(126,62,20)}${lp(174,62,-20)}${lp(126,128,-20)}${lp(174,128,20)}
    <path d="M136 60 q14 -10 28 0" stroke="#d6332a" stroke-width="2.5" fill="none"/><path d="M136 130 q14 10 28 0" stroke="#d6332a" stroke-width="2.5" fill="none"/>
    ${T(150,168,'O–O corto: pares libres muy cerca','qiSmall')}${T(150,184,'mucha repulsión → enlace débil','qiSmall')}
    <line x1="420" y1="95" x2="540" y2="95" class="svgLine thickLine"/>
    <circle cx="420" cy="95" r="34" fill="${C.amarillo}" fill-opacity=".8" stroke="#a88a00"/><circle cx="540" cy="95" r="34" fill="${C.amarillo}" fill-opacity=".8" stroke="#a88a00"/>${T(420,100,'S')}${T(540,100,'S')}
    ${lp(418,50,10)}${lp(542,50,-10)}${lp(418,140,-10)}${lp(542,140,10)}
    ${T(480,168,'S–S largo: pares libres lejos','qiSmall')}${T(480,184,'poca repulsión → forma cadenas','qiSmall')}
  </svg>`;

  // Generador de SO2 burbujeando en los cinco tubos (antes → después).
  svg.so2=`<svg viewBox="0 0 660 270" role="img" aria-label="El SO₂ se burbujea en cinco tubos: agua, dicromato acidificado que pasa de naranja a verde, permanganato que se decolora, iodo que se decolora y agua oxigenada sin cambio visible; al final una trampa con NaOH">
    ${defs('tp6ArrG')}
    <rect x="2" y="6" width="656" height="22" rx="8" class="qiMuted"/>${T(330,22,'BAJO CAMPANA · cada par de tubos: antes → después de burbujear SO₂','qiSmall')}
    ${tube({x:22,top:70,h:96,w:34,liq:'clear',lvl:.45,label:'gener.',sub:['Na₂SO₃','+ HCl']})}
    <path d="M39 70 V48 H630 V70" class="svgTube"/>
    ${[['1','agua','clear','clear',['agua','sulfurosa']],['2','Cr₂O₇²⁻ + H⁺',C.dicr,C.cr3,['naranja →','verde']],['3','MnO₄⁻',C.mno4,'clear',['violeta →','incoloro']],['4','I₂',C.iodo,'clear',['pardo →','incoloro']],['5','H₂O₂','clear','clear',['sin cambio','visible']]].map(([n,lab,a,b,obs],i)=>{const x=104+i*98;return `${tube({x,top:70,h:96,w:26,liq:a,lvl:.55})}${tube({x:x+34,top:70,h:96,w:26,liq:b,lvl:.55})}<line x1="${x+26}" y1="128" x2="${x+33}" y2="128" class="svgArrow" marker-end="url(#tp6ArrG)"/>${T(x+30,206,'Tubo '+n)}${T(x+30,222,lab,'qiSmall')}${obs.map((t,j)=>T(x+30,240+j*15,t,'qiSmall')).join('')}`}).join('')}
    
  </svg>`;

  // Aparato de obtención de iodo.
  svg.iodo=`<svg viewBox="0 0 660 270" role="img" aria-label="Obtención de iodo: vaso con KI, MnO₂ y H₂SO₄ calentado sobre tela metálica; encima un erlenmeyer con agua fría donde los vapores violetas se depositan como cristales">
    <path d="M150 230 V150 H350 V230 Z" class="qiFlask"/>
    <path d="M152 228 V200 H348 V228 Z" fill="#5a3a22" opacity=".75"/>
    ${[...Array(9)].map((_,i)=>`<circle cx="${170+i*22}" cy="${170+((i*13)%25)}" r="${6+(i%3)*2}" fill="${C.violeta}" opacity=".35"/>`).join('')}
    <path d="M200 150 L180 80 Q170 40 210 34 H290 Q330 40 320 80 L300 150 Z" class="qiFlask"/>
    <path d="M196 120 L186 82 Q178 50 212 46 H288 Q322 50 314 82 L304 120 Z" class="svgLiquid"/>
    <rect x="232" y="6" width="36" height="30" class="qiFlask"/>
    ${[[210,150],[228,146],[248,149],[266,146],[286,150],[238,152],[276,152]].map(([x,y])=>`<rect x="${x}" y="${y-4}" width="7" height="5" fill="#222" transform="rotate(25 ${x} ${y})"/>`).join('')}
    <line x1="130" y1="234" x2="370" y2="234" class="svgLine thickLine"/>
    <path d="M250 262 q-14 -14 0 -26 q14 12 0 26" fill="#3b8fd9" opacity=".7"/>
    ${T(470,58,'Erlenmeyer con agua fría','strong','start')}${T(470,76,'en su base fría el vapor','qiSmall','start')}${T(470,92,'vuelve a sólido: cristales','qiSmall','start')}
    ${T(470,140,'Vapores violetas de I₂','strong','start')}${T(470,158,'(sublimación)','qiSmall','start')}
    ${T(470,206,'KI + MnO₂ + H₂SO₄ (dil.)','strong','start')}${T(470,224,'sobre tela metálica, calor suave','qiSmall','start')}
    <line x1="330" y1="70" x2="462" y2="58" class="svgLayer"/><line x1="320" y1="168" x2="462" y2="144" class="svgLayer"/><line x1="350" y1="214" x2="462" y2="206" class="svgLayer"/>
  </svg>`;

  svg.solubilidadI=`<svg viewBox="0 0 660 250" role="img" aria-label="Iodo en agua: poco soluble y amarillo pálido; en cloroformo: muy soluble y violeta; al mezclar quedan dos fases y el iodo pasa al cloroformo, abajo; en ioduro de potasio: muy soluble y pardo; con almidón: azul">
    ${tube({x:40,liq:'#e8c77a',lvl:.6,crystals:true,label:'1 · agua',sub:['poco soluble','amarillo pálido']})}
    ${tube({x:160,liq:C.violeta,lvl:.6,label:'2 · CHCl₃ o CCl₄',sub:['muy soluble','violeta']})}
    ${tube({x:290,layers:[[C.violeta,.45],['#f3ead2',.55]],lvl:.75,label:'1 + 2',sub:['dos fases: el I₂','pasa al solvente']})}
    ${tube({x:420,liq:C.i3,lvl:.6,label:'4 · KI',sub:['muy soluble: I₃⁻','pardo rojizo']})}
    ${tube({x:540,liq:C.almidon,lvl:.6,label:'3 · + almidón',sub:['azul intenso','(reconoce el I₂)']})}
    ${T(326,78,'acuosa','qiSmall','start')}${T(326,122,'orgánica','qiSmall','start')}
  </svg>`;

  svg.sulfuros=`<svg viewBox="0 0 660 260" role="img" aria-label="Sulfuros con tioacetamida: el cobre da un precipitado negro; el níquel no precipita en medio ácido y precipita negro al agregar NaOH; el antimonio da un precipitado naranja que se disuelve en HCl">
    ${defs('tp6ArrP')}
    ${tube({x:40,liq:C.celeste,lvl:.55,ppt:C.negro,label:'Cu²⁺',sub:['CuS negro','no se disuelve en HCl']})}
    ${tube({x:200,liq:C.verde,lvl:.55,label:'Ni²⁺',sub:['ácido: no precipita']})}
    <line x1="236" y1="80" x2="280" y2="80" class="svgArrow" marker-end="url(#tp6ArrP)"/>${T(258,70,'NaOH','qiSmall')}
    ${tube({x:290,liq:'#9aa0a6',lvl:.55,ppt:C.negro,label:'+ NaOH',sub:['NiS negro']})}
    ${tube({x:450,liq:'clear',lvl:.55,ppt:C.naranja,label:'Sb³⁺',sub:['Sb₂S₃ naranja']})}
    <line x1="486" y1="80" x2="530" y2="80" class="svgArrow" marker-end="url(#tp6ArrP)"/>${T(508,70,'HCl 6 M','qiSmall')}
    ${tube({x:540,liq:'clear',lvl:.55,label:'+ HCl',sub:['se disuelve']})}
  </svg>`;

  svg.chatelier=`<svg viewBox="0 0 660 200" role="img" aria-label="El equilibrio H₂S ⇌ 2 H⁺ + S²⁻: si se agregan OH⁻ se consumen H⁺, aumenta el S²⁻ y el sulfuro precipita; si se agrega ácido, baja el S²⁻ y el sulfuro se disuelve">
    ${defs('tp6ArrL')}
    <rect x="210" y="70" width="240" height="56" rx="14" class="svgLineFill svgSection"/>${T(330,104,'H₂S ⇌ 2 H⁺ + S²⁻')}
    <path d="M200 98 H120" class="svgArrow" marker-end="url(#tp6ArrL)"/><path d="M460 98 H540" class="svgArrow" marker-end="url(#tp6ArrL)"/>
    <rect x="8" y="50" width="112" height="96" rx="12" class="svgLineFill svgSoft"/>${T(64,78,'+ H⁺ (HCl)')}${T(64,98,'baja el S²⁻','qiSmall')}${T(64,116,'el sulfuro','qiSmall')}${T(64,132,'se disuelve','qiSmall')}
    <rect x="540" y="50" width="112" height="96" rx="12" class="svgLineFill svgSoft"/>${T(596,78,'+ OH⁻ (NaOH)')}${T(596,98,'sube el S²⁻','qiSmall')}${T(596,116,'el sulfuro','qiSmall')}${T(596,132,'precipita','qiSmall')}
    ${T(330,40,'Le Chatelier decide cuánto S²⁻ hay','strong')}
    ${T(330,170,'Si [M²⁺]·[S²⁻] supera la solubilidad del sulfuro → precipita','qiSmall')}
  </svg>`;

  svg.halogenos=`<svg viewBox="0 0 660 230" role="img" aria-label="Los halógenos: flúor gas amarillo pálido, cloro gas amarillo verdoso, bromo líquido rojo pardo con vapores naranjas, iodo sólido negro violáceo con vapores violetas">
    ${[[60,'F₂','gas','amarillo pálido','#efe7a0',null],[220,'Cl₂','gas','amarillo verdoso',C.cl,null],[380,'Br₂','líquido fumante','rojo pardo','#e07b1a','#7a1f0e'],[540,'I₂','sólido que sublima','negro violáceo','#b48bd8','#1d1424']].map(([x,sym,st,col,gas,bottom])=>`
      <path d="M${x} 30 V150 Q${x} 168 ${x+18} 168 H${x+62} Q${x+80} 168 ${x+80} 150 V30" class="qiFlask"/>
      <rect x="${x+3}" y="34" width="74" height="${bottom?96:130}" fill="${gas}" opacity=".45"/>
      ${bottom&&sym==='Br₂'?`<path d="M${x+3} 130 H${x+77} V150 Q${x+77} 165 ${x+62} 165 H${x+18} Q${x+3} 165 ${x+3} 150 Z" fill="${bottom}"/>`:''}
      ${bottom&&sym==='I₂'?[...Array(7)].map((_,i)=>`<rect x="${x+10+i*9}" y="${152+(i%2)*5}" width="8" height="7" fill="${bottom}" transform="rotate(${i*17} ${x+14+i*9} ${155})"/>`).join(''):''}
      <rect x="${x+24}" y="18" width="32" height="14" rx="3" class="svgLineFill svgSoft"/>
      ${T(x+40,192,sym)}${T(x+40,208,st,'qiSmall')}${T(x+40,224,col,'qiSmall')}`).join('')}
  </svg>`;

  svg.oxidante=`<svg viewBox="0 0 660 230" role="img" aria-label="Poder oxidante de los halógenos: F₂ mayor que Cl₂ mayor que Br₂ mayor que I₂; poder reductor de los halogenuros: I⁻ mayor que Br⁻ mayor que Cl⁻ mayor que F⁻">
    ${defs('tp6ArrX')}
    ${[['F₂','F⁻'],['Cl₂','Cl⁻'],['Br₂','Br⁻'],['I₂','I⁻']].map(([x2,xm],i)=>{const y=40+i*44;return `<rect x="180" y="${y-22}" width="110" height="34" rx="10" class="svgLineFill svgSection"/>${T(235,y,x2)}<rect x="370" y="${y-22}" width="110" height="34" rx="10" class="svgLineFill svgSoft"/>${T(425,y,xm)}<line x1="292" y1="${y-5}" x2="366" y2="${y-5}" class="svgLine"/>${T(330,y-10,'+ 2 e⁻','qiSmall')}`}).join('')}
    <line x1="150" y1="190" x2="150" y2="22" class="svgArrow thick" marker-end="url(#tp6ArrX)"/>
    <text x="134" y="106" transform="rotate(-90 134 106)" text-anchor="middle" class="svgText strong">más oxidante</text>
    <line x1="510" y1="22" x2="510" y2="190" class="svgArrow thick" marker-end="url(#tp6ArrX)"/>
    <text x="530" y="106" transform="rotate(90 530 106)" text-anchor="middle" class="svgText strong">más reductor</text>
    ${T(330,218,'Un X₂ oxida a los X⁻ que están DEBAJO de él','strong')}
  </svg>`;

  svg.cloro=`<svg viewBox="0 0 660 290" role="img" aria-label="Secuencia del ensayo de cloro y bromo: en el tubo A el hipoclorito con HCl libera cloro; al volcarlo en el tubo B con bromuro aparece bromo naranja; el tubo I con cloroformo concentra el bromo abajo; el tubo II con NaOH se decolora y con HCl vuelve el color">
    ${defs('tp6ArrC')}
    ${tube({x:44,liq:'clear',lvl:.45,gas:C.cl,label:'A',sub:['NaClO + HCl (c)','→ Cl₂ ↑']})}
    <line x1="80" y1="70" x2="140" y2="70" class="svgArrow" marker-end="url(#tp6ArrC)"/>${T(110,60,'volcar','qiSmall')}
    ${tube({x:150,liq:C.br,lvl:.55,label:'B',sub:['KBr + Cl₂','→ Br₂ naranja']})}
    <path d="M182 64 L236 30" class="svgArrow" marker-end="url(#tp6ArrC)"/><path d="M182 90 L236 168" class="svgArrow" marker-end="url(#tp6ArrC)"/>
    ${tube({x:246,top:6,h:62,layers:[['#c4501a',.4],['#f7d6a8',.6]],lvl:.75})}${T(284,40,'I · + CHCl₃: el Br₂ pasa','qiSmall','start')}${T(284,56,'a la fase orgánica (abajo)','qiSmall','start')}
    ${tube({x:246,top:150,h:62,liq:'clear',lvl:.6})}${T(284,186,'II · + NaOH','strong','start')}${T(284,202,'se decolora (dismuta)','qiSmall','start')}
    <line x1="424" y1="190" x2="470" y2="190" class="svgArrow" marker-end="url(#tp6ArrC)"/>${T(447,180,'+ HCl','qiSmall')}
    ${tube({x:480,top:150,h:62,liq:C.br,lvl:.6})}${T(518,186,'vuelve el','strong','start')}${T(518,202,'color naranja','qiSmall','start')}${T(518,218,'(comproporción)','qiSmall','start')}
    <rect x="300" y="84" width="350" height="50" rx="12" class="qiMuted"/>${T(475,104,'Papeles en la boca de A y de B:','qiSmall')}${T(475,122,'KI → pardo (I₂) · tornasol azul → rojo y luego se blanquea','qiSmall')}
  </svg>`;

  svg.hcl=`<svg viewBox="0 0 660 230" role="img" aria-label="El HCl gaseoso se recoge en un tubo boca arriba porque es más denso que el aire; al invertir el tubo en agua, el agua sube porque el HCl es muy soluble">
    ${defs('tp6ArrH')}
    <path d="M40 200 V110 L60 70 V40 H90 V70 L110 110 V200 Z" class="qiFlask"/>
    <path d="M42 198 V160 H108 V198 Z" class="svgLiquid strongLiquid"/>
    <path d="M110 92 H150 V70" class="svgTube"/>${T(75,222,'NaCl + H₂SO₄ (c)','qiSmall')}
    ${tube({x:136,top:60,h:90,w:28,gas:C.hcl,lvl:.02})}
    <path d="M150 64 V140" class="svgTube" opacity=".6"/>
    ${T(180,160,'tubo derecho','strong','start')}${T(180,176,'HCl (36,5 g/mol) es más','qiSmall','start')}${T(180,192,'denso que el aire (29)','qiSmall','start')}
    <line x1="250" y1="110" x2="320" y2="110" class="svgArrow" marker-end="url(#tp6ArrH)"/>${T(285,100,'invertir en agua','qiSmall')}
    <path d="M360 140 V200 H560 V140" class="svgTube"/><rect x="362" y="150" width="196" height="48" class="svgLiquid"/>
    <path d="M444 186 V50 a16 16 0 0 1 32 0 V186" class="svgTube"/>
    <rect x="446" y="70" width="28" height="116" class="svgLiquid strongLiquid"/>
    <line x1="500" y1="140" x2="500" y2="84" class="svgArrow" marker-end="url(#tp6ArrH)"/>${T(510,104,'¡el agua sube!','qiSmall','start')}
    ${T(460,222,'el HCl se disuelve y deja lugar','qiSmall')}
  </svg>`;

  // =====================================================================
  // MATERIAL TEÓRICO · AZUFRE Y CALCÓGENOS
  // =====================================================================
  const sS=[];const aS=(k,l,kk,h)=>sS.push({key:`qi-s-${k}`,label:l,kicker:`CALCÓGENOS · ${kk}`,html:h});

  aS('grupo','El grupo 16: los calcógenos','01',`
<p>El grupo 16 (VI A) está formado por <b>oxígeno (O), azufre (S), selenio (Se), teluro (Te) y polonio (Po)</b>. Todos son no metales salvo el polonio, que es radiactivo.</p>
<p>Se llaman <b>calcógenos</b>, “formadores de minerales”: los <b>sulfuros</b> y los <b>óxidos</b> forman gran parte de los minerales de la Tierra y de otros planetas.</p>
${facts([['CEE','ns² np⁴'],['Estados de oxidación más estables','−2 · +4 · +6'],['Le faltan','2 e⁻ para el octeto'],['Sustancias simples','O₂, O₃ · S₈']])}
<h3>Oxígeno y azufre: parientes muy distintos</h3>
${table(['','Oxígeno','Azufre'],[['Tamaño','chico','más grande'],['Moléculas','pequeñas: O₂, O₃','grandes: anillos S₈, cadenas'],['Tipo de enlace preferido','covalentes <b>múltiples</b> (O=O, C=O)','covalentes <b>simples</b> (S–S)'],['¿Forma cadenas?','no','sí: puede <b>concatenar</b>'],['Estados de oxidación','casi siempre −2','−2, +4 y +6']])}
${idea('Cómo lo explico en una línea','<p>El oxígeno es chico y “aprieta” sus electrones: prefiere dobles enlaces. El azufre es grande y cómodo con enlaces simples: arma anillos y cadenas.</p>')}
${verG('qi-tp6-intro','Antes de entrar al laboratorio del TP 6')}
`);

  aS('alotropos','Las sustancias simples y sus formas','02',`
${figure(svg.alotropos,'Esquemas: O₂ y O₃; el S₈ y sus formas; el azufre plástico.')}
<h3>Oxígeno</h3>
<p>Sus alótropos principales son el <b>dioxígeno (O₂)</b> y el <b>trioxígeno u ozono (O₃)</b>. Los dos son gases y se interconvierten en procesos atmosféricos:</p>
${rx('2 O3(g) <=> 3 O2(g)')}
<h3>Azufre</h3>
${table(['Variedad','Cómo es'],[
 ['Azufre octoatómico (S₈)','anillos de 8 átomos; tiene <b>dos poliformas</b>: <b>rómbico (Sα)</b> y <b>monoclínico (Sβ)</b>'],
 ['Azufre amorfo o plástico (Sₓ)','cadenas cortas de azufre con una cantidad de átomos no definida']
])}
${deep('Cómo se pasa de una forma a otra '+amp(),'<ul class="kitList"><li>El <b>rómbico</b> es el estable a temperatura ambiente (cristales amarillos); por encima de ≈ 96 °C pasa a <b>monoclínico</b> (agujas).</li><li>Si se funde el azufre y se vuelca en agua fría, los anillos rotos quedan como cadenas desordenadas: <b>azufre plástico</b>, elástico como un chicle, que con los días vuelve a rómbico.</li></ul>')}
`);

  aS('enlace','Enlace O–O vs. S–S','03',`
${figure(svg.enlace,'')}
<p>El <b>pequeño tamaño</b> del oxígeno hace que los enlaces <b>simples</b> O–O sean <b>débiles</b>: los pares de electrones libres de los dos átomos quedan muy cerca y se repelen.</p>
<p>El azufre tiene un <b>radio atómico mayor</b>: la distancia de enlace es mayor, los pares libres quedan más alejados y la repulsión es menor. Por eso el enlace S–S simple es estable y el azufre puede formar anillos y cadenas.</p>
${punch('Por eso el agua oxigenada (H–O–O–H) se descompone fácil, y el azufre arma anillos S₈ sin problema.')}
`);

  aS('oxigeno','Obtención de oxígeno en el laboratorio','04',`
<p>El oxígeno se obtiene por <b>descomposición</b> de sustancias oxigenadas, por vía térmica o electroquímica:</p>
${rxs(['2 KClO3(s) =[MnO2, Δ]=> 2 KCl(s) + 3 O2(g)','el MnO₂ es catalizador'],['4 KMnO4(s) =[Δ]=> 2 K2O(s) + 4 MnO2(s) + 3 O2(g)','como aparece en la diapositiva'],['2 HgO(s) =[Δ]=> 2 Hg(g) + O2(g)'],['2 H2O2(ac) -> 2 H2O(l) + O2(g)'])}
${note('Cotejo con la diapositiva','<p>Estas ecuaciones estaban como imagen en el material. Están balanceadas; los estados de agregación se normalizaron (en la diapositiva el clorato aparece como “(l)”). Para el permanganato, muchos libros escriben <span class="rxInline">2 KMnO₄ → K₂MnO₄ + MnO₂ + O₂</span>; las dos ecuaciones están balanceadas.</p>')}
${verT('hidrogeno-oxigeno:qi-ho-oxigeno','El oxígeno (material del TP 4)')}
`);

  aS('compuestos','Los compuestos del azufre de un vistazo','05',`
${figure(svg.estadosS,'')}
${table(['Compuesto','E.O. del S','Propiedades físicas','Ácido-base','Redox','Otras'],[
 ['<b>Sulfuro de hidrógeno</b> H₂S','−2','gas de olor pútrido, <b>muy tóxico</b>; se disuelve parcialmente en agua','ácido','principalmente <b>reductor</b>: se oxida con facilidad a azufre','los sulfuros de metales de transición precipitan con facilidad en distintos medios'],
 ['<b>Dióxido de azufre</b> SO₂','+4','gas de olor picante y asfixiante (tóxico), muy soluble en agua','ácido','<b>oxidante</b> (se reduce a S) o <b>reductor</b> (se oxida a sulfato)','oxidado a sulfato, con Ba²⁺ precipita sulfato de bario blanco, muy insoluble'],
 ['<b>Ácido sulfúrico</b> H₂SO₄','+6','líquido viscoso, MUY corrosivo, concentrado al 98 %; su dilución es exotérmica','ácido','<b>oxidante</b>: concentrado reduce el sulfato a SO₂; diluido reduce el H⁺ a H₂','el sulfato precipita con sales de bario: BaSO₄ blanco, muy insoluble']
])}
${punch('Regla de oro: con el S en su mínimo (−2) sólo puede oxidarse; en su máximo (+6) sólo reducirse; en el medio (+4) puede hacer las dos cosas.')}
`);

  aS('obtencion','Cómo se obtienen H₂S, SO₂ y H₂SO₄','06',`
<h3>Sulfuro de hidrógeno</h3>
<p>Se suele obtener tratando sulfuros metálicos con ácidos minerales:</p>
${rx('FeS(s) + 2 HCl(ac) -> FeCl2(ac) + H2S(g)↑')}
${fix('Para afinar','<p>La diapositiva llama “pirita” al FeS. El FeS es el <b>sulfuro ferroso</b> (pirrotina); la <b>pirita</b> es el FeS₂.</p>')}
<p>Por su alta toxicidad, en el laboratorio se parte de <b>tioacetamida</b>, un compuesto orgánico que genera H₂S <i>in situ</i> al calentarlo en agua:</p>
${rx('CH3CSNH2 + H2O =[Δ]=> CH3CONH2 + H2S','tioacetamida → acetamida + H₂S')}
<h3>Dióxido de azufre</h3>
<p>Reacción de sulfitos con ácidos minerales:</p>
${rx('Na2SO3(s) + 2 HCl(ac) -> 2 NaCl(ac) + SO2(g)↑ + H2O(l)')}
<h3>Ácido sulfúrico</h3>
<p>Se obtiene “limpio” oxidando el SO₂ con agua oxigenada:</p>
${rx('SO2(g) + H2O2(ac) -> H2SO4(ac)')}
${verG('qi-tp6-c1-so2','Obtención del SO₂ en el TP')}
`);

  aS('interpretar','¿Cómo interpretamos los ensayos?','07',`
<p>Las diapositivas proponen leer cada observación como una propiedad. Las ecuaciones las agregamos para completar la interpretación.</p>
${table(['Lo que se observa','Interpretación','Ecuación'],[
 ['El H₂S decolora el KMnO₄ violeta (con HCl) y forma una <b>turbidez amarilla</b>','el H₂S es <b>reductor</b>: se oxida a azufre',rx('2 MnO4^- + 5 H2S + 6 H^+ -> 2 Mn^2+ + 5 S↓ + 8 H2O')],
 ['El SO₂ decolora el KMnO₄ y, con BaCl₂, da un <b>precipitado blanco</b>','el SO₂ es <b>reductor</b>: se oxida a sulfato',rx('2 MnO4^- + 5 SO2 + 2 H2O -> 2 Mn^2+ + 5 SO4^2- + 4 H^+')+rx('Ba^2+ + SO4^2- -> BaSO4↓')],
 ['El H₂SO₄ no cambia el color del KMnO₄','el H₂SO₄ <b>no es reductor</b> (el S ya está en +6)','—'],
 ['El H₂S y el agua sulfurosa se mezclan y dan un <b>precipitado amarillo</b>','el SO₂ es oxidante y el H₂S reductor: <b>comproporcionan</b> a azufre',rx('SO2 + 2 H2S -> 3 S↓ + 2 H2O')],
 ['El H₂SO₄ diluido con Zn libera un gas incoloro e insípido; el concentrado, un gas de olor picante que vira el tornasol a rosa','en ambos casos es <b>oxidante</b>: el diluido libera H₂ y el concentrado, SO₂',rx('Zn + H2SO4(d) -> ZnSO4 + H2↑')+rx('Zn + 2 H2SO4(c) -> ZnSO4 + SO2↑ + 2 H2O')]
])}
${idea('Comproporción','<p>Dos especies del mismo elemento con estados de oxidación distintos (−2 y +4) se encuentran en uno intermedio (0). Es lo contrario de la <b>dismutación</b>, que vamos a ver con los halógenos.</p>')}
`);

  aS('sulfuros','Precipitación de los sulfuros','08',`
<p>Que un sulfuro metálico precipite depende de las concentraciones del <b>catión metálico</b> y del <b>sulfuro (S²⁻)</b>. Y la concentración de sulfuro depende del <b>reactivo</b> que lo aporte y del <b>medio</b>.</p>
${rxs(['H2S(ac) <=> 2 H^+(ac) + S^2-(ac)','el H₂S es un ácido débil: aporta poco S²⁻'],['MS(s) <=> M^2+(ac) + S^2-(ac)','el sulfuro está parcialmente disociado'])}
${figure(svg.chatelier,'')}
${table(['Situación','Qué pasa','Por qué'],[
 ['Con H₂S o tioacetamida, muchos sulfuros <b>precipitan</b>','el S²⁻ aportado alcanza para superar la solubilidad de la sal','condición necesaria para que una sustancia precipite'],
 ['Algunos sulfuros <b>no precipitan</b> con tioacetamida','no se aporta suficiente S²⁻','—'],
 ['…pero <b>precipitan al agregar NaOH</b>','los OH⁻ neutralizan los H⁺ formando agua; por Le Chatelier el H₂S se ioniza más y aumenta el S²⁻','si el S²⁻ supera la solubilidad, precipita'],
 ['Algunos sulfuros de transición <b>se disuelven con HCl</b>','al aumentar el H⁺ disminuye el S²⁻ (Le Chatelier)','si baja lo suficiente, ya no se supera la solubilidad y el sulfuro se disuelve']
])}
${deep('Con números: el producto de solubilidad '+amp(),'<p>Cada sulfuro tiene su <b>K<sub>ps</sub></b>. Precipita si [M²⁺]·[S²⁻] &gt; K<sub>ps</sub>. El CuS tiene un K<sub>ps</sub> bajísimo (≈ 10⁻³⁶): precipita aun con el poquísimo S²⁻ del medio ácido. El NiS o el ZnS tienen K<sub>ps</sub> mucho mayores: necesitan el S²⁻ que se gana en medio básico. Así se separan cationes en Analítica Cualitativa.</p>')}
${verG('qi-tp6-c2-h2s','Precipitación de sulfuros en el TP')}
`);

  aS('so2','Dióxido de azufre: ácido, oxidante y reductor','09',`
<p>Gas incoloro, de olor penetrante y tóxico, formado por moléculas <b>polares</b>: se disuelve en agua formando una solución ácida, el <b>agua sulfurosa</b>.</p>
${rx('SO2(g) + H2O(l) <=> HSO3^-(ac) + H^+(ac)','bisulfito + catión hidrógeno')}
${fix('El “ácido sulfuroso”','<p>No hay evidencias experimentales de que exista la molécula H₂SO₃: en solución acuosa el SO₂ se ioniza formando bisulfito y liberando H⁺. Por costumbre se sigue escribiendo H₂SO₃, pero lo correcto es la ecuación de arriba.</p>')}
<h3>Con bases forma sulfitos</h3>
${rxs(['SO2(g) + 2 NaOH(ac) -> Na2SO3(ac) + H2O(l)','sulfito de sodio (así se atrapa el SO₂ sobrante en el TP)'],['SO2(g) + NaOH(ac) -> NaHSO3(ac)','con exceso de SO₂: bisulfito '+'(ampliación)'])}
<h3>Puede ser oxidante o reductor</h3>
<p>El azufre del SO₂ (+4) puede <b>oxidarse a +6</b> (sulfato) o <b>reducirse a 0</b> (azufre), e incluso a −2.</p>
${table(['Papel','Con quién','Ecuación'],[
 ['<b>Reductor</b>','KMnO₄, K₂Cr₂O₇, I₂, H₂O₂',rx('SO2 + 2 H2O -> SO4^2- + 4 H^+ + 2 e^-')],
 ['<b>Oxidante</b>','H₂S (un reductor más fuerte)',rx('SO2 + 4 H^+ + 4 e^- -> S + 2 H2O')]
])}
${figure(svg.estadosS,'')}
${verG('qi-tp6-c1-so2','Los cinco tubos con SO₂')}
`);

  aS('h2so4','Ácido sulfúrico: concentrado vs. diluido','10',`
<p>Es el ácido más importante de la industria química. El <b>concentrado</b> es una solución al <b>98 % m/m</b>, de densidad <b>1,84 g/cm³</b>, muy viscoso y muy corrosivo: ataca la piel y las mucosas destruyéndolas. Es muy soluble en agua y al disolverse desprende <b>muchísimo calor</b>.</p>
${warn('Siempre el ácido sobre el agua','<p>Nunca agregar agua al ácido concentrado: la dilución es tan exotérmica que el agua hierve de golpe y proyecta ácido. Se agrega el ácido, de a poco, sobre el agua.</p>')}
<p>Sus propiedades redox dependen de la <b>concentración</b>:</p>
${table(['','Diluido','Concentrado (y caliente)'],[
 ['Especie oxidante','el <b>H⁺</b> (como cualquier ácido mineral)','el <b>sulfato</b>'],
 ['Se reduce a…','H₂','SO₂'],
 ['Ataca a…','metales más activos que el H (Zn, Fe, Mg)','casi todos los metales, incluso Cu, Ag, Hg; y algunos no metales y aniones'],
 ['Fuerza como oxidante','menor','<b>mayor</b>']
])}
${rxs(['Zn(s) + H2SO4(d) -> ZnSO4(ac) + H2(g)↑','diluido: oxida el H⁺'],['Cu(s) + 2 H2SO4(c) -> CuSO4(ac) + SO2(g)↑ + 2 H2O(l)','concentrado: oxida el sulfato'],['2 KI(s) + 3 H2SO4(c) -> 2 KHSO4 + SO2(g)↑ + I2(s) + 2 H2O','oxida al ioduro'],['2 KBr(s) + 3 H2SO4(c) -> 2 KHSO4 + SO2(g)↑ + Br2 + 2 H2O','oxida al bromuro'],['C(s) + 2 H2SO4(c) -> CO2(g)↑ + 2 SO2(g)↑ + 2 H2O','oxida al carbono'])}
${fix('Corrección respecto del archivo de ecuaciones','<p>En la transcripción auxiliar, las ecuaciones con KI y KBr figuraban con <b>3 H₂O</b>; contando átomos, el balance correcto es con <b>2 H₂O</b> (H: 6 = 2 + 4; O: 12 = 8 + 2 + 2).</p>')}
<h3>Un ácido “fijo”: desplaza a otros ácidos de sus sales</h3>
<p>El H₂SO₄ casi no es volátil: calentado con sales de ácidos volátiles, los desplaza. (Por eso no se puede obtener el H₂SO₄ por este método.)</p>
${rxs(['NaCl(s) + H2SO4(c) -> NaHSO4(ac) + HCl(g)↑','así se obtiene el HCl en el TP 6'],['NaNO3(s) + H2SO4(c) -> NaHSO4(ac) + HNO3(g)↑','así se obtuvo el HNO₃ en el TP 5'])}
${deep('Acción deshidratante '+amp(),'<p>El ácido concentrado tiene tanta afinidad por el agua que se la “roba” a otras sustancias: deshidrata el CuSO₄·5H₂O (azul → blanco) y carboniza el papel, el azúcar y la madera, dejando carbono negro.</p>'+rxs(['CuSO4·5H2O(s) =[H2SO4 (c)]=> CuSO4(s) + 5 H2O','se pierde el color azul'],['C12H22O11(s) =[H2SO4 (c)]=> 12 C(s) + 11 H2O','sacarosa → carbón']))}
${verG('qi-tp6-c2-h2so4','Propiedades del H₂SO₄ en el TP')}
`);

  aS('repaso','Repaso del azufre','11',cards([
   ['Grupo 16','CEE y estados de oxidación de los calcógenos','ns² np⁴ · −2, +4, +6'],
   ['Alótropos','¿Cuáles son las formas del azufre?','S₈ rómbico (α) y monoclínico (β); azufre plástico (Sₓ, cadenas)'],
   ['Enlace','¿Por qué el S forma cadenas y el O no?','El S es más grande: los pares libres quedan lejos y el enlace simple S–S es estable.'],
   ['H₂S','¿Qué hace con el KMnO₄?','Lo decolora y da turbidez amarilla: reductor, se oxida a S.'],
   ['SO₂','¿Por qué puede ser oxidante y reductor?','Su S está en +4: puede subir a +6 o bajar a 0.'],
   ['SO₂','¿Cómo se reconoce que se oxidó a sulfato?','Con BaCl₂: precipitado blanco de BaSO₄.'],
   ['Sulfuros','¿Por qué el NaOH hace precipitar un sulfuro?','Consume H⁺, el H₂S se ioniza más y sube el S²⁻ (Le Chatelier).'],
   ['H₂SO₄','Diluido vs. concentrado frente al Cu','Diluido: nada. Concentrado y caliente: CuSO₄ + SO₂.'],
   ['H₂SO₄','¿Qué es un ácido fijo?','Poco volátil: desplaza a los ácidos volátiles (HCl, HNO₃) de sus sales.']
  ]));

  // =====================================================================
  // MATERIAL TEÓRICO · HALÓGENOS
  // =====================================================================
  const sX=[];const aX=(k,l,kk,h)=>sX.push({key:`qi-x-${k}`,label:l,kicker:`HALÓGENOS · ${kk}`,html:h});

  aX('grupo','El grupo 17: los halógenos','01',`
<p>El grupo 17 está formado por <b>flúor (F), cloro (Cl), bromo (Br), iodo (I) y astato (At)</b>, todos no metales. Se llaman <b>halógenos</b>: “productores de sal”.</p>
${facts([['CEE','ns² np⁵'],['Estado de oxidación más estable','−1'],['Con átomos más electronegativos (Cl, Br, I)','+1, +3, +5, +7'],['Sustancias simples','diatómicas X₂, tóxicas, casi todas corrosivas']])}
${figure(svg.halogenos,'El flúor y el cloro son gases, el bromo un líquido fumante y el iodo un sólido que volatiliza en un gas violeta.')}
<p>Presentan propiedades principalmente <b>ácidas</b> y <b>oxidantes</b>: les falta un solo electrón para el octeto, así que tienden a ganarlo (X₂ → 2 X⁻).</p>
${verG('qi-tp6-intro','Antes de entrar al laboratorio del TP 6')}
`);

  aX('solubilidad','Moléculas no polares: solubilidad','02',`
<p>Las moléculas X₂ son <b>no polares</b>. Eso explica su <b>baja solubilidad en agua</b> y su <b>alta solubilidad en solventes poco polares</b>, como el tetracloruro de carbono (CCl₄) o el cloroformo (CHCl₃).</p>
${punch('“Lo semejante disuelve a lo semejante”: no polar con no polar.')}
${figure(svg.solubilidadI,'El iodo en distintos solventes (esquema).')}
${deep('¿Por qué el iodo se disuelve tanto en KI? '+amp(),'<p>El I₂ se une al I⁻ formando el ion <b>triyoduro</b>, I₃⁻, que es iónico y muy soluble en agua (color pardo rojizo). Así se preparan las “soluciones de iodo” del laboratorio.</p>'+rx('I2(s) + I^-(ac) <=> I3^-(ac)'))}
<p>Todos los halógenos forman <b>soluciones acuosas ácidas</b>; con el cloro, por ejemplo:</p>
${rx('Cl2(g) + H2O(l) <=> HCl(ac) + HClO(ac)','el HClO (hipocloroso) es decolorante '+'· ampliación')}
`);

  aX('oxidantes','Poder oxidante y poder reductor','03',`
<p>Todos los dihalógenos son principalmente <b>oxidantes</b>: se transforman en halogenuros (X⁻). El <b>poder oxidante disminuye al aumentar Z</b>.</p>
${figure(svg.oxidante,'')}
${punch('Poder oxidante de los X₂: F₂ > Cl₂ > Br₂ > I₂ · Poder reductor de los X⁻: F⁻ < Cl⁻ < Br⁻ < I⁻')}
<p>El <b>flúor</b> es la sustancia más oxidante que existe: oxida al agua en cualquier medio.</p>
${rx('2 F2(g) + 2 H2O(l) -> 4 HF(ac) + O2(g)')}
<h3>¿Quién desplaza a quién?</h3>
${table(['','F⁻','Cl⁻','Br⁻','I⁻'],[['F₂','—','✔','✔','✔'],['Cl₂','✘','—','✔','✔'],['Br₂','✘','✘','—','✔'],['I₂','✘','✘','✘','—']])}
${rxs(['Cl2 + 2 Br^- -> 2 Cl^- + Br2','aparece el color naranja del bromo'],['Cl2 + 2 I^- -> 2 Cl^- + I2'],['Br2 + 2 I^- -> 2 Br^- + I2'])}
${fix('Erratas de la diapositiva','<p>Donde dice “redactor” debe leerse <b>reductor</b>: el fluoruro es el halogenuro <b>menos reductor</b> y el ioduro el <b>más reductor</b>.</p>')}
${verG('qi-tp6-c2-cloro','Cloro y bromo en el TP')}
`);

  aX('dismutacion','Dismutación y comproporción','04',`
<p>Los halógenos <b>dismutan en medio básico</b> (el X₂ se reduce y se oxida a la vez), mientras que sus iones <b>comproporcionan en medio ácido</b> (vuelven a X₂).</p>
<h3>Dismutación (medio básico)</h3>
${rxs(['Cl2(ac) + 2 OH^-(ac) -> Cl^-(ac) + ClO^-(ac) + H2O(l)','en frío: hipoclorito (la lavandina)'],['3 Cl2(ac) + 6 OH^-(ac) -> 5 Cl^-(ac) + ClO3^-(ac) + 3 H2O(l)','en caliente: clorato'],['3 Br2(ac) + 6 OH^-(ac) -> 5 Br^-(ac) + BrO3^-(ac) + 3 H2O(l)'],['3 I2(ac) + 6 OH^-(ac) -> 5 I^-(ac) + IO3^-(ac) + 3 H2O(l)'])}
<h3>Comproporción (medio ácido)</h3>
${rxs(['HClO(ac) + Cl^-(ac) + H^+(ac) -> Cl2(g) + H2O(l)'],['5 Cl^-(ac) + ClO3^-(ac) + 6 H^+(ac) -> 3 Cl2(g) + 3 H2O(l)'],['5 Br^- + BrO3^- + 6 H^+ -> 3 Br2 + 3 H2O'],['5 I^- + IO3^- + 6 H^+ -> 3 I2 + 3 H2O'])}
${note('Cotejo con la diapositiva','<p>En la diapositiva la comproporción del hipocloroso aparece sin el H⁺ (así no queda balanceada en cargas) y el Cl₂ de la última ecuación figura como “(l)”. Acá se escriben balanceadas y con el Cl₂ gaseoso.</p>')}
${idea('La lavandina y el ácido','<p>Por esto <b>nunca hay que mezclar lavandina con ácido</b> (por ejemplo, limpiadores con HCl): el hipoclorito y el cloruro comproporcionan y se libera <b>cloro gaseoso</b>, tóxico. Es justamente lo que se hace, controlado, en el TP.</p>')}
${verG('qi-tp6-c2-cloro','Ensayo con hipoclorito, bromuro, NaOH y HCl')}
`);

  aX('iodo','Obtención e identificación del iodo','05',`
${rx('MnO2(s) + 2 H2SO4(ac) + 2 KI(ac) -> MnSO4(ac) + I2(s) + K2SO4(ac) + 2 H2O(l)')}
${example('Balanceo por ion-electrón','',
 step('Reducción',rx('MnO2 + 4 H^+ + 2 e^- -> Mn^2+ + 2 H2O','Mn: +4 → +2'))+
 step('Oxidación',rx('2 I^- -> I2 + 2 e^-','I: −1 → 0'))+
 step('Suma (ya tienen 2 e⁻ cada una)',rx('MnO2 + 4 H^+ + 2 I^- -> I2 + Mn^2+ + 2 H2O'))+
 step('Molecular','<p>Los 4 H⁺ los aportan 2 H₂SO₄; los K⁺ y el sulfato sobrante quedan como K₂SO₄ y MnSO₄.</p>'),
 'MnO₂ + 2 H₂SO₄ + 2 KI → MnSO₄ + I₂ + K₂SO₄ + 2 H₂O')}
${figure(svg.iodo,'Esquema del aparato.')}
<p>El iodo formado en el vaso se separa por calentamiento: <b>se volatiliza</b> y, al tocar la base fría del erlenmeyer, <b>sublima</b> (pasa de gas a sólido) formando cristales.</p>
<p>Se identifica fácilmente porque con <b>almidón</b> forma soluciones de color <b>azul</b>.</p>
${deep('El tiosulfato: la “goma de borrar” del iodo '+amp(),'<p>El tiosulfato de sodio reduce el I₂ a I⁻ (incoloro). Si había azul de almidón, desaparece. Es la base de las titulaciones iodométricas.</p>'+rx('I2 + 2 S2O3^2- -> 2 I^- + S4O6^2-','tiosulfato → tetrationato'))}
${verG('qi-tp6-c1-iodo','Obtención y propiedades del iodo en el TP')}
`);

  aX('hcl','Ácido clorhídrico: obtención y reconocimiento','06',`
<p>Se obtiene haciendo reaccionar <b>cloruro de sodio</b> con <b>ácido sulfúrico concentrado</b>: se forma cloruro de hidrógeno gaseoso, que al disolverse en agua da el ácido clorhídrico.</p>
${rxs(['NaCl(s) + H2SO4(c) -> NaHSO4(ac) + HCl(g)↑'],['HCl(g) =[H2O]=> HCl(ac)'])}
<p>El gas se reconoce con <b>papel tornasol</b> por su carácter ácido:</p>
${rx('HCl(ac) -> H^+(ac) + Cl^-(ac)')}
<p>Y el ácido clorhídrico (en realidad, el Cl⁻) se reconoce porque forma un <b>precipitado blanco de cloruro de plata</b>:</p>
${rx('AgNO3(ac) + HCl(ac) -> AgCl(s)↓ + HNO3(ac)')}
${figure(svg.hcl,'')}
${verG('qi-tp6-c1-hcl','Obtención del HCl en el TP')}
`);

  aX('repaso','Repaso de los halógenos','07',cards([
   ['Grupo 17','CEE y estado de oxidación más estable','ns² np⁵ · −1 (y +1, +3, +5, +7 con elementos más electronegativos)'],
   ['Estados','¿Cómo son a temperatura ambiente?','F₂ y Cl₂ gases; Br₂ líquido rojo pardo; I₂ sólido violeta-negro que sublima.'],
   ['Solubilidad','¿Por qué el I₂ se disuelve en CCl₄ y no en agua?','Es no polar: se disuelve en solventes no polares.'],
   ['Redox','Ordená por poder oxidante','F₂ > Cl₂ > Br₂ > I₂'],
   ['Redox','¿El Br₂ oxida al Cl⁻?','No: sólo oxida al I⁻ (los que están debajo).'],
   ['Dismutación','Br₂ + NaOH: ¿qué pasa?','Se decolora: el Br₂ dismuta a Br⁻ y BrO₃⁻ (o BrO⁻).'],
   ['Comproporción','¿Y al agregar HCl?','Br⁻ + BrO₃⁻ + H⁺ vuelven a Br₂: regresa el color.'],
   ['Iodo','¿Cómo se reconoce?','Con almidón: azul. En CCl₄: violeta.'],
   ['HCl','¿Cómo se reconoce el Cl⁻?','Con AgNO₃: precipitado blanco de AgCl.']
  ]));

  // =====================================================================
  // GUÍA DE LABORATORIO · TP 6
  // =====================================================================
  const s=[];const add=(key,label,kicker,html)=>s.push({key:`qi-tp6-${key}`,label,kicker,html});
  const ver=(id,label)=>verT(id,label);

  add('intro','Antes de entrar al laboratorio','TP 6 · 00',`
<p>En este TP se trabajan el <b>azufre</b> (SO₂, H₂S y H₂SO₄) y los <b>halógenos</b> (iodo, ácido clorhídrico, cloro y bromo). El hilo conductor es la <b>redox</b>: quién oxida a quién y cómo se nota.</p>
${table(['Clase','Ensayos'],[
 ['Clase 1 · demostrativa (la hace el docente)','obtención y propiedades del SO₂ · obtención y propiedades del iodo · obtención del HCl y los cloruros'],
 ['Clase 2 · en grupos de 2 o 3','H₂S: reductor y precipitación de sulfuros · H₂SO₄ concentrado y diluido · obtención de cloro y bromo · propiedades redox del HCl']
])}
${warn('Seguridad','<ul><li>El <b>SO₂</b> es tóxico e irritante: se produce <b>bajo campana</b>, con el laboratorio bien ventilado. Al terminar, el sobrante se absorbe en un tubo con NaOH.</li><li>El <b>H₂S</b> es tóxico: goteros y frascos de tioacetamida, bajo campana.</li><li>El <b>iodo</b> mancha (el sólido y sus vapores): no tocarlo; usar varilla o espátula plástica.</li><li>El <b>H₂SO₄ concentrado</b> es muy corrosivo y produce quemaduras graves. <b>No agregar agua al ácido</b>: la dilución es exotérmica y proyecta líquido.</li><li>El <b>cloro</b> y el <b>bromo</b> son tóxicos: no oler directamente.</li><li>Descartar el contenido de los tubos <b>como indique el docente</b>.</li></ul>')}
${idea('Qué hay que registrar','<p>En la Clase 1: <b>cambios observados y aparatos empleados</b>, para después escribir las reacciones. En la Clase 2: lo observado, las <b>reacciones</b> y qué <b>propiedad química</b> se verifica.</p>')}
${ver('calcogenos:qi-s-compuestos','Los compuestos del azufre de un vistazo')}
${ver('halogenos:qi-x-oxidantes','Poder oxidante de los halógenos')}
`);

  // ---------------- CLASE 1 ----------------
  add('c1-so2','Clase 1 · Obtención y propiedades del dióxido de azufre','TP 6 · CLASE 1 · 01',`
${ver('calcogenos:qi-s-so2','Dióxido de azufre')}
${ensayo({n:'1',title:'Obtención del SO₂',
 hacemos:`<p>Un solo equipo, <b>bajo campana</b>: un aparato generador de gases como el del CO₂, con <b>≈ 5 g de sulfito de sodio</b> en el frasco de generación. Se agregan lentamente <b>15 mL de HCl concentrado</b>; si hace falta, se calienta suave y con cuidado.</p><p>El gas se burbujea directamente en tubos de hemólisis <b>ya preparados</b> (para no perder SO₂), con 3 mL de:</p>`+table(['Tubo','Contenido'],[['1','agua'],['2','dicromato de potasio con gotas de H₂SO₄ o HCl'],['3','permanganato de potasio'],['4','iodo'],['5','peróxido de hidrógeno']])+`<p>Al final, un tubo con <b>NaOH</b> absorbe el SO₂ remanente.</p>`,
 vemos:`<p>Efervescencia en el generador y olor picante (no olerlo directamente).</p>`,
 pasa:rxs(['Na2SO3(s) + 2 HCl(ac) -> 2 NaCl(ac) + SO2(g)↑ + H2O(l)'],['SO2(g) + 2 NaOH(ac) -> Na2SO3(ac) + H2O(l)','trampa de NaOH']),
 demuestra:'obtención de un gas ácido desplazándolo de su sal con un ácido más fuerte.'})}
${figure(svg.so2,'Lo esperable en cada tubo (esquema).')}
${ensayo({n:'1',tag:'TUBO',title:'Agua: carácter ácido y reacción con H₂S',
 hacemos:`<p>Con la solución obtenida (<b>agua sulfurosa</b>): se prueba con papel tornasol. Al resto se le agrega <b>1 mL de tioacetamida y 5 gotas de HCl 6 M</b>; si no hay cambios, a baño María.</p>`,
 vemos:`<ul><li>Tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}.</li><li>Con tioacetamida: <b>turbidez amarilla</b> de azufre.</li></ul>`,
 pasa:rxs(['SO2(g) + H2O(l) <=> HSO3^-(ac) + H^+(ac)','agua sulfurosa: ácida'],['SO2(ac) + 2 H2S(ac) -> 3 S(s)↓ + 2 H2O(l)','comproporción: S +4 y −2 → 0']),
 demuestra:'el SO₂ es un óxido ácido y, frente al H₂S, actúa como oxidante.'})}
${ensayo({n:'2',tag:'TUBO',title:'Dicromato de potasio acidificado',
 hacemos:`<p>Se burbujea SO₂ en 3 mL de K₂Cr₂O₇ con gotas de ácido.</p>`,
 vemos:`<p>${vira('naranja',C.dicr,'verde',C.cr3)}</p>`,
 pasa:rxs(['Cr2O7^2- + 3 SO2 + 2 H^+ -> 2 Cr^3+ + 3 SO4^2- + H2O','Cr: +6 → +3 · S: +4 → +6'],['K2Cr2O7 + 3 SO2 + H2SO4 -> Cr2(SO4)3 + K2SO4 + H2O','molecular (acidificado con H₂SO₄)']),
 demuestra:'el SO₂ es reductor.'})}
${ensayo({n:'3',tag:'TUBO',title:'Permanganato de potasio',
 hacemos:`<p>Se burbujea SO₂ en 3 mL de KMnO₄.</p>`,
 vemos:`<p>${vira('violeta',C.mno4,'incoloro','transparent')}</p>`,
 pasa:rxs(['2 MnO4^- + 5 SO2 + 2 H2O -> 2 Mn^2+ + 5 SO4^2- + 4 H^+','Mn: +7 → +2'],['2 KMnO4 + 5 SO2 + 2 H2O -> K2SO4 + 2 MnSO4 + 2 H2SO4','molecular']),
 demuestra:'el SO₂ es reductor (y el medio se acidifica solo).'})}
${ensayo({n:'4',tag:'TUBO',title:'Iodo',
 hacemos:`<p>Se burbujea SO₂ en 3 mL de solución de iodo.</p>`,
 vemos:`<p>${vira('pardo',C.iodo,'incoloro','transparent')}</p>`,
 pasa:rx('I2 + SO2 + 2 H2O -> 2 I^- + SO4^2- + 4 H^+','I: 0 → −1'),
 demuestra:'el SO₂ es reductor: reduce el I₂ a I⁻.'})}
${ensayo({n:'5',tag:'TUBO',title:'Peróxido de hidrógeno',
 hacemos:`<p>Se burbujea SO₂ en 3 mL de H₂O₂.</p>`,
 vemos:`<p>No hay un cambio de color visible: el cambio se descubre con BaCl₂.</p>`,
 pasa:rx('SO2(g) + H2O2(ac) -> H2SO4(ac)','O: −1 → −2 · S: +4 → +6'),
 demuestra:'el SO₂ se oxida a sulfato (obtención “limpia” de H₂SO₄).'})}
${ensayo({tag:'TUBOS',title:'Reconocimiento del sulfato con cloruro de bario',
 hacemos:`<p>La guía indica agregar gotas de <b>cloruro de bario</b> a los tubos “3 a 6”.</p>`,
 vemos:`<p><b>Precipitado blanco</b> en los tubos donde el SO₂ se oxidó.</p>`,
 pasa:rx('Ba^2+(ac) + SO4^2-(ac) -> BaSO4(s)↓','blanco, insoluble aun en ácido'),
 demuestra:'el SO₂ se oxidó a sulfato: confirma su carácter reductor.',
 extra:note('Sobre la consigna','<p>La guía dice “tubos 3 a 6”, pero el ensayo tiene cinco tubos. El sentido del ensayo es reconocer el <b>sulfato</b> donde el SO₂ se oxidó (tubos 2 a 5). Confirmá con tu docente en qué tubos se agrega.</p>')})}
${example('¿Alcanza el ácido? ¿Cuánto SO₂ se obtiene?','<p>5 g de Na₂SO₃ (126 g/mol) con 15 mL de HCl concentrado (36,5 % m/m, δ = 1,19 g/mL). Volumen de SO₂ a 25 °C y 1 atm.</p>',
 step('1. Moles de sulfito',chain(R`n_{\mathrm{Na_2SO_3}}=\frac{5}{126}=0{,}0397\ \mathrm{mol}`))+
 step('2. HCl necesario (relación 1 : 2)',chain(R`n_{\mathrm{HCl}}=2\cdot0{,}0397=0{,}0794\ \mathrm{mol}`,R`V=\frac{0{,}0794\cdot36{,}5\cdot\frac{100}{36{,}5}}{1{,}19}=6{,}7\ \mathrm{mL}`))+
 step('3. HCl disponible',chain(R`15\ \mathrm{mL}\cdot1{,}19\cdot0{,}365=6{,}52\ \mathrm{g}\ \Rightarrow\ 0{,}179\ \mathrm{mol}`,['\\text{hay más del doble: el HCl está en exceso}','el sulfito es el limitante']))+
 step('4. Volumen de SO₂',chain(R`V=\frac{nRT}{P}=\frac{0{,}0397\cdot0{,}082\cdot298}{1}=0{,}97\ \mathrm{L}`)),
 'Alcanza (hacen falta ≈ 6,7 mL) · se obtienen ≈ 0,97 L de SO₂')}
`);

  add('c1-iodo','Clase 1 · Obtención y propiedades del iodo','TP 6 · CLASE 1 · 02',`
${ver('halogenos:qi-x-iodo','Obtención e identificación del iodo')}
${figure(svg.iodo,'Imagen 1 de la guía: esquema del aparato empleado en la obtención de iodo (redibujado).')}
${ensayo({n:'2',title:'Obtención de iodo por sublimación',
 hacemos:`<p>Un solo equipo. En un vaso de 50 mL: <b>1,5 g de KI, 1,5 g de MnO₂ y 5 mL de H₂SO₄ diluido</b>; se mezcla agitando el vaso. Sobre la boca se coloca un <b>erlenmeyer lleno de agua fría</b>. Se calienta lentamente para que los vapores alcancen el fondo del erlenmeyer. Cuando hay suficiente depósito, se retira el mechero y se deja <b>enfriar sin destapar</b>. Los cristales se recogen con espátula plástica sobre un vidrio de reloj.</p>`,
 vemos:`<ul><li>Vapores ${swatch(C.violeta,'violetas')} dentro del vaso.</li><li>En la base fría del erlenmeyer se forman <b>cristales negro-violáceos brillantes</b>.</li></ul>`,
 pasa:rxs(['MnO2(s) + 2 H2SO4(ac) + 2 KI(ac) -> MnSO4(ac) + I2(s) + K2SO4(ac) + 2 H2O(l)'],['MnO2 + 4 H^+ + 2 I^- -> I2 + Mn^2+ + 2 H2O','iónica: el MnO₂ oxida al I⁻'],['I2(s) -> I2(g) -> I2(s)','se volatiliza y vuelve a sólido en la superficie fría']),
 demuestra:'el I⁻ es reductor (lo oxida el MnO₂ en medio ácido) y el iodo se separa por sublimación.',
 extra:warn('Cuidados de la guía','<ul><li>No tocar el iodo: mancha, tanto el sólido como sus vapores.</li><li>Dejar enfriar antes de retirar el erlenmeyer para que sublime todo el iodo volatilizado.</li><li>Recoger los cristales con varilla de vidrio o plástico.</li></ul>')+example('¿Cuánto iodo se puede obtener como máximo?','<p>1,5 g de KI (166 g/mol) y 1,5 g de MnO₂ (86,9 g/mol); el ácido en exceso.</p>',step('Limitante',chain(R`n_{\mathrm{KI}}=\frac{1{,}5}{166}=9{,}04\cdot10^{-3}\ \mathrm{mol}`,R`n_{\mathrm{MnO_2}}=\frac{1{,}5}{86{,}9}=1{,}73\cdot10^{-2}\ \mathrm{mol}`,['\\text{el KI necesita sólo }4{,}52\\cdot10^{-3}\\ \\mathrm{mol\\ de\\ MnO_2}','limitante: KI']))+step('Iodo',chain(R`n_{\mathrm{I_2}}=\frac{9{,}04\cdot10^{-3}}{2}=4{,}52\cdot10^{-3}\ \mathrm{mol}`,R`m=4{,}52\cdot10^{-3}\cdot253{,}8=1{,}15\ \mathrm{g}`)),'≈ 1,15 g de I₂ (el MnO₂ sobra)')})}
<h3>Propiedades del iodo: cinco tubos con unos pocos cristales</h3>
${figure(svg.solubilidadI,'Lo esperable en los tubos 1 a 4 (esquema).')}
${ensayo({n:'1 y 2',tag:'TUBOS',title:'Solubilidad en agua y en cloroformo',
 hacemos:`<p><b>Tubo 1:</b> 5 mL de agua, tapar y agitar enérgicamente. <b>Tubo 2:</b> 5 mL de cloroformo o tetracloruro de carbono, tapar y agitar. Comparar. Después mezclar el contenido de los dos tubos, agitar y observar.</p>`,
 vemos:`<ul><li>Tubo 1: casi no se disuelve; el agua queda ${swatch('#e8c77a','amarillo pálido')} y quedan cristales.</li><li>Tubo 2: se disuelve bien, ${swatch(C.violeta,'violeta')}.</li><li>Al mezclar: <b>dos fases</b> que no se mezclan; la orgánica (abajo, más densa) queda violeta intensa y la acuosa casi se decolora.</li></ul>`,
 pasa:`<p>El I₂ es <b>no polar</b>: se disuelve mucho mejor en un solvente no polar. Al poner los dos solventes en contacto, el iodo “se muda” a la fase orgánica: es una <b>extracción</b>.</p>`,
 demuestra:'el iodo es poco soluble en agua y muy soluble en solventes no polares.'})}
${ensayo({n:'3',tag:'TUBO',title:'Almidón y tiosulfato',
 hacemos:`<p>5 mL de agua, tapar y agitar. Si no se disolvió todo, decantar unos mililitros a otro tubo, agregar <b>dispersión de almidón</b> y luego gotas de <b>tiosulfato de sodio</b> agitando hasta ver cambios.</p>`,
 vemos:`<ul><li>Con almidón: ${swatch(C.almidon,'azul intenso')}.</li><li>Con tiosulfato: ${vira('azul',C.almidon,'incoloro','transparent')}.</li></ul>`,
 pasa:`<p>El almidón forma con el iodo un <b>complejo azul</b> intenso: es la prueba más sensible del I₂.</p>`+rx('I2(ac) + 2 S2O3^2-(ac) -> 2 I^-(ac) + S4O6^2-(ac)','el tiosulfato reduce el I₂ a I⁻: se va el azul'),
 demuestra:'el almidón reconoce al iodo (aun en trazas) y el tiosulfato lo reduce a ioduro.'})}
${ensayo({n:'4',tag:'TUBO',title:'Solubilidad en ioduro de potasio',
 hacemos:`<p>5 mL de KI, tapar y agitar. Pasar una pequeña gota a otro tubo, agregar agua hasta que casi no tenga color y luego gotas de almidón. Finalmente, a <b>ambos</b> tubos, tiosulfato gota a gota hasta ver cambios.</p>`,
 vemos:`<ul><li>El iodo se disuelve mucho más que en agua: solución ${swatch(C.i3,'pardo rojiza')}.</li><li>La gota diluida, casi incolora, con almidón se pone ${swatch(C.almidon,'azul')}.</li><li>Con tiosulfato, los dos tubos se <b>decoloran</b>.</li></ul>`,
 pasa:rxs(['I2(s) + I^-(ac) <=> I3^-(ac)','triyoduro: soluble'],['I3^- + 2 S2O3^2- -> 3 I^- + S4O6^2-']),
 demuestra:'el I₂ es muy soluble en KI (forma I₃⁻) y el almidón detecta cantidades muy pequeñas de iodo.'})}
${ensayo({n:'5',tag:'TUBO',title:'Hidróxido de sodio y después ácido',
 hacemos:`<p>5 mL de agua, tapar y agitar. Decantar unos mililitros a otro tubo y agregar gotas de <b>NaOH</b> hasta ver cambios. Luego, HCl o H₂SO₄ diluido hasta volver a ver cambios.</p>`,
 vemos:`<ul><li>Con NaOH: ${vira('amarillo',`#e8c77a`,'incoloro','transparent')}.</li><li>Con el ácido: <b>vuelve el color</b> pardo-amarillento del iodo.</li></ul>`,
 pasa:rxs(['3 I2 + 6 OH^- -> 5 I^- + IO3^- + 3 H2O','dismutación en medio básico'],['5 I^- + IO3^- + 6 H^+ -> 3 I2 + 3 H2O','comproporción en medio ácido']),
 demuestra:'los halógenos dismutan en medio básico y se regeneran por comproporción en medio ácido.'})}
`);

  add('c1-hcl','Clase 1 · Obtención y propiedades del ácido clorhídrico y los cloruros','TP 6 · CLASE 1 · 03',`
${ver('halogenos:qi-x-hcl','Ácido clorhídrico')}
${figure(svg.hcl,'')}
${ensayo({n:'3',title:'Obtención del HCl y solubilidad',
 hacemos:`<p>En un tubo Kitasato, <b>1 g de NaCl</b>. Se <b>calcula</b> el volumen de H₂SO₄ concentrado (98 % m/m, δ = 1,84 g/cm³) necesario, se agrega lentamente y se tapa enseguida. Se verifica el gas con <b>papel tornasol azul humedecido</b>. El gas se recoge en un tubo de hemólisis <b>derecho</b> y se ensaya su solubilidad sumergiendo el tubo <b>invertido</b> en un cristalizador con agua destilada.</p>`,
 vemos:`<ul><li>Desprendimiento de gas; tornasol ${vira('azul','#2f6fd1','rojo','#d6332a')}. En aire húmedo forma <b>humos blancos</b>.</li><li>Al invertir el tubo en agua, <b>el nivel del líquido sube</b> dentro del tubo.</li></ul>`,
 pasa:rxs(['NaCl(s) + H2SO4(c) -> NaHSO4(ac) + HCl(g)↑','el ácido fijo desplaza al volátil'],['HCl(g) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','muy soluble y ácido'])+`<p>Se recoge con el tubo <b>derecho</b> (boca arriba) porque el HCl (36,5 g/mol) es <b>más denso que el aire</b> (29 g/mol). Al disolverse tan rápido, deja lugar y la presión atmosférica empuja el agua hacia arriba (igual que la fuente de amoníaco del TP 5).</p>`,
 demuestra:'obtención de HCl por desplazamiento; el HCl es más denso que el aire, muy soluble en agua y ácido.'})}
${example('Cálculo de la guía: ¿cuánto H₂SO₄ hace falta para 1 g de NaCl?','<p>H₂SO₄ 98 % m/m, δ = 1,84 g/cm³; NaCl 58,5 g/mol; H₂SO₄ 98 g/mol. Relación 1 : 1 (se forma NaHSO₄).</p>',
 step('1. Moles de NaCl',chain(R`n=\frac{1\ \mathrm{g}}{58{,}5\ \mathrm{g/mol}}=0{,}0171\ \mathrm{mol}`))+
 step('2. Masa de H₂SO₄ puro',chain(R`m=0{,}0171\cdot98=1{,}68\ \mathrm{g}`))+
 step('3. Solución al 98 %',chain(R`m_{\text{sc}}=1{,}68\cdot\frac{100}{98}=1{,}71\ \mathrm{g}`,R`V=\frac{1{,}71\ \mathrm{g}}{1{,}84\ \mathrm{g/mL}}=0{,}93\ \mathrm{mL}`)),
 '≈ 0,93 mL de H₂SO₄ concentrado (en la práctica se usa un leve exceso)')}
${K.calc('reagent','Probalo con otras cantidades',K.field('ms','Masa de NaCl (g)',1)+K.field('Ms','M del sólido (g/mol)',58.5)+K.field('r','mol de ácido por mol de sólido',1)+K.field('Mr','M del ácido (g/mol)',98)+K.field('pct','% m/m del ácido',98)+K.field('d','Densidad (g/mL)',1.84),'La misma receta de siempre: sólido → moles → ácido puro → solución → volumen.')}
${ensayo({n:'3',tag:'TUBOS',title:'Reconocimiento de cloruros: nitrato de plata y nitrato plumboso',
 hacemos:`<p>Se recoge parte del líquido del cristalizador, se divide en dos tubos y se agregan gotas de <b>AgNO₃</b> a uno y de <b>Pb(NO₃)₂</b> al otro.</p>`,
 vemos:`<ul><li>AgNO₃: precipitado ${swatch(C.blanco,'blanco')} de AgCl.</li><li>Pb(NO₃)₂: precipitado ${swatch(C.blanco,'blanco')} de PbCl₂ (si la solución está muy diluida, puede verse sólo una turbidez).</li></ul>`,
 pasa:rxs(['AgNO3(ac) + HCl(ac) -> AgCl(s)↓ + HNO3(ac)','Ag⁺ + Cl⁻ → AgCl'],['Pb(NO3)2(ac) + 2 HCl(ac) -> PbCl2(s)↓ + 2 HNO3(ac)','Pb²⁺ + 2 Cl⁻ → PbCl₂']),
 demuestra:'el cloruro se reconoce precipitándolo con Ag⁺ o Pb²⁺.',
 extra:note('Diferencia útil '+amp(),'<p>El PbCl₂ es <b>bastante más soluble</b> que el AgCl y se disuelve en agua caliente; el AgCl no (pero sí en amoníaco, formando [Ag(NH₃)₂]⁺). Así se distinguen en Analítica.</p>')})}
`);

  // ---------------- CLASE 2 ----------------
  add('c2-h2s','Clase 2 · Ácido sulfhídrico: reductor y sulfuros metálicos','TP 6 · CLASE 2 · 01',`
${ver('calcogenos:qi-s-sulfuros','Precipitación de los sulfuros')}
<p>El H₂S se obtiene <b>in situ</b> a partir de <b>tioacetamida</b>, que en caliente reacciona con agua liberando sulfuro de hidrógeno. Como es tóxico, los goteros y frascos se mantienen <b>bajo campana</b>.</p>
${rx('CH3CSNH2 + H2O =[Δ]=> CH3CONH2 + H2S')}
${ensayo({n:'1.1',title:'Propiedades reductoras',
 hacemos:`<p>En un tubo de hemólisis, <b>20 gotas de KMnO₄</b>, <b>5 gotas de HCl o H₂SO₄</b> y gotas de tioacetamida hasta ver cambios (si no, baño María).</p>`,
 vemos:`<p>${vira('violeta',C.mno4,'incoloro','transparent')} y aparece una <b>turbidez amarilla</b>.</p>`,
 pasa:rxs(['2 MnO4^- + 5 H2S + 6 H^+ -> 2 Mn^2+ + 5 S(s)↓ + 8 H2O','Mn: +7 → +2 · S: −2 → 0'],['2 KMnO4 + 5 H2S + 3 H2SO4 -> K2SO4 + 2 MnSO4 + 5 S↓ + 8 H2O','molecular con H₂SO₄']),
 demuestra:'el H₂S es reductor: se oxida a azufre.'})}
${figure(svg.sulfuros,'Lo esperable con cada catión (esquema).')}
${ensayo({n:'1.2',title:'Precipitación y solubilidad de sulfuros metálicos',
 hacemos:`<p>Tres tubos con <b>20 gotas</b> de soluciones <b>0,1 M</b>:</p>`+table(['Paso','Qué se hace'],[['1','a cada tubo, <b>20 gotas de tioacetamida</b>; si no hay cambios, baño María'],['2','en los tubos donde <b>no</b> se formó precipitado (o sólo una ligera turbidez): gotas de <b>NaOH 6 M</b>; calentar si hace falta'],['3','en todos los tubos <b>con</b> precipitado: volcar el sobrenadante y agregar <b>HCl 6 M</b>; calentar si hace falta']]),
 vemos:table(['Tubo','Con tioacetamida','Con NaOH 6 M','Con HCl 6 M'],[
  ['1 · CuSO₄ '+swatch(C.celeste,''),'precipitado '+swatch(C.negro,'negro')+' (CuS)','—','no se disuelve'],
  ['2 · NiCl₂ '+swatch(C.verde,''),'no precipita (medio ácido)','precipitado '+swatch(C.negro,'negro')+' (NiS)','ver nota'],
  ['3 · SbCl₃','precipitado '+swatch(C.naranja,'naranja')+' (Sb₂S₃)','—','se disuelve (en caliente)']]),
 pasa:rxs(['Cu^2+(ac) + H2S(ac) -> CuS(s)↓ + 2 H^+(ac)','muy insoluble: precipita aun en ácido'],['H2S + 2 OH^- -> S^2- + 2 H2O','el NaOH aumenta el S²⁻'],['Ni^2+(ac) + S^2-(ac) -> NiS(s)↓','sólo en medio básico'],['2 Sb^3+(ac) + 3 H2S(ac) -> Sb2S3(s)↓ + 6 H^+(ac)','naranja'],['Sb2S3(s) + 6 HCl(ac) -> 2 SbCl3(ac) + 3 H2S(g)','con HCl concentrado y calor (en realidad queda como clorocomplejo)']),
 demuestra:'cada sulfuro precipita según cuánto S²⁻ necesita; el medio (ácido o básico) controla el S²⁻ por Le Chatelier. No son reacciones redox: son precipitaciones.',
 extra:note('Para afinar','<ul><li>Por la teoría, el NiS que precipitó en medio básico debería redisolverse con HCl. En la práctica, el NiS recién precipitado “envejece” rápido y se vuelve <b>muy difícil de disolver</b> en HCl 6 M: no te sorprendas si queda negro. Registrá lo que veas.</li><li>Las sales de Sb³⁺ se hidrolizan en agua y pueden dar una turbidez blanca (oxicloruro) antes de agregar la tioacetamida: no confundirla con el sulfuro naranja.</li></ul>')})}
`);

  add('c2-h2so4','Clase 2 · Ácido sulfúrico concentrado y diluido','TP 6 · CLASE 2 · 02',`
${ver('calcogenos:qi-s-h2so4','Ácido sulfúrico')}
${warn('Con extremo cuidado','<p>El H₂SO₄ concentrado es muy corrosivo y produce quemaduras graves. <b>No agregar agua al ácido</b>: la dilución es exotérmica y puede proyectar la mezcla. Descartar el contenido de los tubos <b>con sumo cuidado</b>, como indique el docente.</p>')}
${ensayo({n:'2.1',title:'Propiedades redox: cobre con ácido concentrado y diluido',
 hacemos:`<p>Dos tubos de hemólisis, cada uno con un <b>alambre de cobre</b>. Al primero, <b>2 mL de H₂SO₄ concentrado</b>; al segundo, H₂SO₄ <b>diluido</b>. Se calienta a baño María y se coloca en la boca de los tubos un <b>papel de filtro embebido en dicromato de potasio</b>.</p>`,
 vemos:`<ul><li><b>Concentrado:</b> se desprende un gas; el papel con dicromato ${vira('naranja',C.dicr,'verde',C.cr3)}. El cobre se ataca (puede quedar un sólido blanco-grisáceo o un tono azulado).</li><li><b>Diluido:</b> no se observa reacción.</li></ul>`,
 pasa:rxs(['Cu(s) + 2 H2SO4(c) =[Δ]=> CuSO4 + SO2(g)↑ + 2 H2O','el sulfato oxida al cobre'],['Cu(s) + H2SO4(d) -> no reacciona','el H⁺ no alcanza para oxidar al Cu'],['K2Cr2O7 + 3 SO2 + H2SO4 -> Cr2(SO4)3 + K2SO4 + H2O','en el papel: reconoce el SO₂'])+`<p>En el ácido concentrado el CuSO₄ casi no tiene agua para disolverse: por eso puede verse blanco (anhidro) en lugar de azul. Al diluir con cuidado aparece el azul.</p>`,
 demuestra:'el H₂SO₄ concentrado y caliente es un oxidante más fuerte que el diluido: el sulfato se reduce a SO₂.'})}
${ensayo({n:'2.2',title:'Acción deshidratante',
 hacemos:`<p>Dos tubos: 1) una punta de espátula de <b>CuSO₄·5H₂O</b>; 2) un <b>trozo de papel</b>. A ambos, <b>1 mL de H₂SO₄ concentrado</b>; si no hay cambios, calentar suave a baño María.</p>`,
 vemos:`<ul><li>Sulfato cúprico: ${vira('azul','#2f6fd1','blanco',C.blanco)}.</li><li>Papel: se <b>ennegrece</b> (se carboniza).</li></ul>`,
 pasa:rxs(['CuSO4·5H2O(s) -> CuSO4(s) + 5 H2O','el ácido le quita el agua de cristalización'],['(C6H10O5)n -> 6n C(s) + 5n H2O','la celulosa del papel pierde H y O como agua'])+`<p>No es una redox del ácido: el H₂SO₄ concentrado “atrapa” el agua porque se hidrata con muchísima afinidad (y libera calor).</p>`,
 demuestra:'el H₂SO₄ concentrado es deshidratante.'})}
`);

  add('c2-cloro','Clase 2 · Obtención y propiedades del cloro y el bromo','TP 6 · CLASE 2 · 03',`
${ver('halogenos:qi-x-dismutacion','Dismutación y comproporción')}
<p><b>Antes de empezar</b>, preparar: dos papeles embebidos en <b>KI</b>, dos papeles de <b>tornasol azul humedecidos</b> y un tubo con <b>2 mL de KBr</b> (rotulado <b>B</b>).</p>
${figure(svg.cloro,'La secuencia completa del ensayo (esquema).')}
${ensayo({n:'i–ii',title:'Obtención del cloro (tubo A)',
 hacemos:`<p>En un tubo rotulado <b>A</b>: <b>2 mL de hipoclorito de sodio</b> y HCl concentrado gota a gota hasta que se desprenda un gas. Acercar un papel con KI y un papel tornasol.</p>`,
 vemos:`<ul><li>Gas ${swatch(C.cl,'amarillo verdoso')} de olor irritante (no olerlo directamente).</li><li>Papel con KI: ${vira('blanco','#f4f4f4','pardo',C.iodo)}.</li><li>Tornasol azul: se pone <b>rojo</b> y después se <b>blanquea</b>.</li></ul>`,
 pasa:rxs(['NaClO(ac) + 2 HCl(ac) -> Cl2(g)↑ + NaCl(ac) + H2O(l)','comproporción: Cl +1 y −1 → 0'],['Cl2 + 2 KI -> 2 KCl + I2','el papel se pone pardo'],['Cl2 + H2O <=> HCl + HClO','ácido (rojo) y decolorante (blanquea)']),
 demuestra:'obtención de Cl₂ por comproporción en medio ácido; el cloro es oxidante, ácido y decolorante.'})}
${ensayo({n:'iii–iv',title:'Cloro con bromuro (tubo B)',
 hacemos:`<p>Volcar rápidamente el contenido de A en B. Acercar a B un papel con KI y un tornasol azul humedecido.</p>`,
 vemos:`<ul><li>La solución de B se pone ${swatch(C.br,'amarillo-naranja')}.</li><li>Papel con KI: <b>pardo</b>. Tornasol: <b>rojo</b>.</li></ul>`,
 pasa:rxs(['Cl2(ac) + 2 KBr(ac) -> 2 KCl(ac) + Br2(ac)','el Cl₂ oxida al Br⁻'],['Br2 + 2 KI -> 2 KBr + I2','el bromo (y el cloro que quede) oxidan al I⁻']),
 demuestra:'poder oxidante: Cl₂ > Br₂ > I₂.'})}
${ensayo({n:'v–vi',tag:'TUBO I',title:'Extracción con cloroformo',
 hacemos:`<p>Dividir el contenido de B en dos tubos (<b>I</b> y <b>II</b>). Al tubo I agregar <b>3 mL de cloroformo</b> y agitar con tapón.</p>`,
 vemos:`<p>Dos fases: la de <b>cloroformo (abajo)</b> queda ${swatch('#c4501a','naranja-rojiza')} y la acuosa se aclara.</p>`,
 pasa:`<p>El Br₂ es no polar: pasa del agua al solvente orgánico (extracción), igual que el iodo en la Clase 1.</p>`,
 demuestra:'el bromo es más soluble en solventes no polares que en agua.'})}
${ensayo({n:'vii',tag:'TUBO II',title:'Hidróxido de sodio y después HCl',
 hacemos:`<p>Al tubo II agregar NaOH hasta ver cambios; luego, HCl.</p>`,
 vemos:`<ul><li>Con NaOH: ${vira('naranja',C.br,'incoloro','transparent')}.</li><li>Con HCl: <b>vuelve el color</b> naranja.</li></ul>`,
 pasa:rxs(['3 Br2 + 6 OH^- -> 5 Br^- + BrO3^- + 3 H2O','dismutación (en frío también Br₂ + 2 OH⁻ → Br⁻ + BrO⁻ + H₂O)'],['5 Br^- + BrO3^- + 6 H^+ -> 3 Br2 + 3 H2O','comproporción en medio ácido']),
 demuestra:'el bromo dismuta en medio básico y se regenera en medio ácido.'})}
`);

  add('c2-hcl','Clase 2 · Propiedades redox del ácido clorhídrico','TP 6 · CLASE 2 · 04',`
${ensayo({n:'4',title:'HCl concentrado con permanganato y con hierro',
 hacemos:`<p>Dos tubos con <b>3 mL de HCl concentrado</b> (I y II). <b>Tubo I:</b> una punta de espátula de KMnO₄ y acercar un papel con KI. <b>Tubo II:</b> un clavo de hierro. Si no hay cambios, baño María.</p>`,
 vemos:`<ul><li><b>Tubo I:</b> gas ${swatch(C.cl,'amarillo verdoso')} de olor irritante; el violeta se va; papel con KI <b>pardo</b>.</li><li><b>Tubo II:</b> burbujeo de un gas <b>incoloro</b>; la solución toma color ${swatch('#a8d08d','verde claro')}.</li></ul>`,
 pasa:rxs(['2 KMnO4 + 16 HCl -> 2 KCl + 2 MnCl2 + 5 Cl2↑ + 8 H2O','el Cl⁻ es reductor: −1 → 0'],['2 MnO4^- + 16 H^+ + 10 Cl^- -> 2 Mn^2+ + 5 Cl2 + 8 H2O','iónica'],['Fe(s) + 2 HCl(ac) -> FeCl2(ac) + H2(g)↑','el H⁺ es oxidante: +1 → 0']),
 demuestra:'el HCl puede ser reductor (por su Cl⁻, frente a oxidantes fuertes) u oxidante (por su H⁺, frente a metales activos).'})}
${idea('El HCl, con dos caras','<p>En el tubo I el que trabaja es el <b>Cl⁻</b> (se oxida a Cl₂); en el tubo II, el <b>H⁺</b> (se reduce a H₂). Misma sustancia, distinto “compañero”.</p>')}
`);

  add('resumen','Cuadro resumen del TP 6','TP 6 · RESUMEN',`
${table(['Ensayo','Lo que se ve','Lo que demuestra'],[
 ['Na₂SO₃ + HCl','efervescencia, olor picante','obtención de SO₂'],
 ['SO₂ en agua + tornasol / + tioacetamida','tornasol rojo / turbidez amarilla','SO₂ ácido; oxidante frente al H₂S'],
 ['SO₂ en Cr₂O₇²⁻, MnO₄⁻, I₂','naranja → verde; violeta → incoloro; pardo → incoloro','SO₂ reductor'],
 ['SO₂ en H₂O₂ + BaCl₂','precipitado blanco','SO₂ → sulfato'],
 ['KI + MnO₂ + H₂SO₄, Δ','vapores violetas; cristales','obtención de I₂; sublimación'],
 ['I₂ en agua / CHCl₃ / KI','poco soluble / violeta / pardo','I₂ no polar; forma I₃⁻'],
 ['I₂ + almidón + tiosulfato','azul → incoloro','reconocimiento; I₂ oxidante'],
 ['I₂ + NaOH, luego ácido','se decolora y vuelve','dismutación / comproporción'],
 ['NaCl + H₂SO₄ (c)','gas, tornasol rojo, el agua sube','obtención de HCl; denso y muy soluble'],
 ['Cl⁻ + AgNO₃ / Pb(NO₃)₂','precipitados blancos','reconocimiento de cloruros'],
 ['KMnO₄ + H⁺ + tioacetamida','violeta → incoloro + turbidez amarilla','H₂S reductor'],
 ['Cu²⁺, Ni²⁺, Sb³⁺ + tioacetamida','CuS negro; NiS sólo con NaOH; Sb₂S₃ naranja','precipitación de sulfuros y pH'],
 ['Cu + H₂SO₄ (c) / (d)','gas que vira el dicromato a verde / nada','H₂SO₄ (c) oxidante más fuerte'],
 ['CuSO₄·5H₂O, papel + H₂SO₄ (c)','azul → blanco; papel negro','H₂SO₄ deshidratante'],
 ['NaClO + HCl','gas amarillo verdoso; KI pardo; tornasol rojo y se blanquea','obtención de Cl₂'],
 ['Cl₂ + KBr; + CHCl₃','naranja; fase orgánica naranja','Cl₂ > Br₂; extracción'],
 ['Br₂ + NaOH, luego HCl','se decolora y vuelve','dismutación / comproporción'],
 ['HCl (c) + KMnO₄ / + Fe','Cl₂ / H₂ y solución verde clara','HCl reductor (Cl⁻) u oxidante (H⁺)']
])}
`);

  add('cuestionario','Preguntas del TP resueltas','TP 6 · CUESTIONARIO',`
<p>Preguntas del estilo de las evaluaciones de TP, resueltas paso a paso: esquema u observación, <b>ecuación balanceada</b> y <b>propiedad</b> que se demuestra. Masas molares: Na₂SO₃ 126 · HCl 36,5 · NaCl 58,5 · H₂SO₄ 98 · KI 166 · MnO₂ 86,9 · I₂ 253,8 g/mol; R = 0,082 atm·L/(mol·K).</p>
<div data-qi-guide></div>
`);

  add('evaluaciones','Evaluaciones: halógenos y azufre','TP 6 · EVALUACIONES',`
<p>Las dos preguntas de evaluación que ya estaban cargadas en la app como “Halógenos y azufre (n.º de TP a confirmar)”: ahora sabemos que son del <b>TP 6</b>. Las respuestas están revisadas; cuando lo que circula tiene un error, se marca con <b>✎</b>.</p>
<div data-qi-guide="eval"></div>
`);

  // ---------------- CUESTIONARIO ----------------
  const exercises=[
   {n:1,title:'Obtención y propiedades del SO₂',
    statement:'a) Describí el aparato y escribí la ecuación de obtención del SO₂. b) ¿Alcanzan 15 mL de HCl concentrado (36,5 % m/m, δ = 1,19 g/mL) para 5 g de Na₂SO₃? c) ¿Qué volumen de SO₂ se obtiene a 25 °C y 1 atm? d) ¿Por qué al final se burbujea en NaOH?',
    solution:step('a) Aparato y ecuación','<p>Generador de gases (como el del CO₂): frasco con el sulfito, tubo de seguridad o embudo por donde se agrega el HCl y tubo de desprendimiento que lleva el gas a los tubos de hemólisis, todo <b>bajo campana</b>.</p>'+rx('Na2SO3(s) + 2 HCl(ac) -> 2 NaCl(ac) + SO2(g)↑ + H2O(l)'))+
     step('b) ¿Alcanza el HCl?',chain(R`n_{\mathrm{Na_2SO_3}}=\frac{5}{126}=0{,}0397\ \mathrm{mol}\ \Rightarrow\ n_{\mathrm{HCl}}=0{,}0794\ \mathrm{mol}`,R`V_{\text{nec}}=\frac{0{,}0794\cdot36{,}5/0{,}365}{1{,}19}=6{,}7\ \mathrm{mL}`)+'<p>Se usan 15 mL: el HCl está en <b>exceso</b> (más del doble).</p>')+
     step('c) Volumen de SO₂',chain(R`V=\frac{0{,}0397\cdot0{,}082\cdot298}{1}=0{,}97\ \mathrm{L}`))+
     step('d) Trampa de NaOH','<p>Para no liberar SO₂ (tóxico) al ambiente: el NaOH lo neutraliza.</p>'+rx('SO2 + 2 NaOH -> Na2SO3 + H2O')),
    answer:'b) sí, hacen falta ≈ 6,7 mL · c) ≈ 0,97 L · d) para absorber el SO₂ sobrante'},
   {n:2,title:'El SO₂ como reductor y como oxidante',
    statement:'Escribí, balanceadas por ion-electrón, las reacciones del SO₂ con: a) K₂Cr₂O₇ en medio ácido; b) KMnO₄; c) I₂; d) H₂O₂; e) H₂S. Indicá en cada caso si el SO₂ actúa como oxidante o reductor y qué se observa.',
    solution:note('Hemirreacción del SO₂ como reductor',rx('SO2 + 2 H2O -> SO4^2- + 4 H^+ + 2 e^-','S: +4 → +6'))+
     step('a) Dicromato · reductor',rxs(['Cr2O7^2- + 14 H^+ + 6 e^- -> 2 Cr^3+ + 7 H2O'],['3 SO2 + 6 H2O -> 3 SO4^2- + 12 H^+ + 6 e^-','× 3'],['Cr2O7^2- + 3 SO2 + 2 H^+ -> 2 Cr^3+ + 3 SO4^2- + H2O','naranja → verde']))+
     step('b) Permanganato · reductor',rxs(['2 MnO4^- + 16 H^+ + 10 e^- -> 2 Mn^2+ + 8 H2O','× 2'],['5 SO2 + 10 H2O -> 5 SO4^2- + 20 H^+ + 10 e^-','× 5'],['2 MnO4^- + 5 SO2 + 2 H2O -> 2 Mn^2+ + 5 SO4^2- + 4 H^+','violeta → incoloro']))+
     step('c) Iodo · reductor',rxs(['I2 + 2 e^- -> 2 I^-'],['I2 + SO2 + 2 H2O -> 2 I^- + SO4^2- + 4 H^+','pardo → incoloro']))+
     step('d) Agua oxigenada · reductor',rxs(['H2O2 + 2 H^+ + 2 e^- -> 2 H2O'],['SO2 + H2O2 -> SO4^2- + 2 H^+','sin cambio visible; con BaCl₂, precipitado blanco']))+
     step('e) Sulfuro de hidrógeno · oxidante',rxs(['SO2 + 4 H^+ + 4 e^- -> S + 2 H2O','S: +4 → 0'],['2 H2S -> 2 S + 4 H^+ + 4 e^-','S: −2 → 0'],['SO2 + 2 H2S -> 3 S + 2 H2O','turbidez amarilla (comproporción)'])),
    answer:'Reductor frente a Cr₂O₇²⁻, MnO₄⁻, I₂ y H₂O₂ (se oxida a SO₄²⁻); oxidante frente al H₂S (se reduce a S).'},
   {n:3,title:'Obtención del iodo',
    statement:'a) Escribí la ecuación de obtención del iodo y balanceala por ion-electrón. b) ¿Cuál es el reactivo limitante con 1,5 g de KI y 1,5 g de MnO₂? ¿Cuánto iodo se obtiene como máximo? c) ¿Por qué se coloca un erlenmeyer con agua fría sobre el vaso? ¿Qué cambio de estado ocurre?',
    solution:step('a) Ion-electrón',rxs(['MnO2 + 4 H^+ + 2 e^- -> Mn^2+ + 2 H2O','reducción'],['2 I^- -> I2 + 2 e^-','oxidación'],['MnO2 + 4 H^+ + 2 I^- -> I2 + Mn^2+ + 2 H2O'],['MnO2 + 2 H2SO4 + 2 KI -> MnSO4 + I2 + K2SO4 + 2 H2O','molecular']))+
     step('b) Limitante y masa',chain(R`n_{\mathrm{KI}}=9{,}04\cdot10^{-3}\ \mathrm{mol}\quad n_{\mathrm{MnO_2}}=1{,}73\cdot10^{-2}\ \mathrm{mol}`,['\\text{relación 1 MnO}_2:2\\text{ KI}\\Rightarrow\\text{limita el KI}','el MnO₂ sobra'],R`m_{\mathrm{I_2}}=\frac{9{,}04\cdot10^{-3}}{2}\cdot253{,}8=1{,}15\ \mathrm{g}`))+
     step('c) Sublimación','<p>Al calentar, el I₂ pasa a vapor (violeta). Al tocar la superficie fría del erlenmeyer, vuelve directamente a <b>sólido</b>: cristales. (Estrictamente, gas → sólido es <b>sublimación inversa</b> o deposición; en el material se la llama sublimación.) Así el iodo queda separado de la mezcla del vaso.</p>'),
    answer:'a) MnO₂ + 4 H⁺ + 2 I⁻ → I₂ + Mn²⁺ + 2 H₂O · b) limita el KI: ≈ 1,15 g de I₂ · c) para que el vapor se deposite como cristales'},
   {n:4,title:'Solubilidad y reacciones del iodo',
    statement:'Interpretá con ecuaciones lo que ocurre con el iodo en: a) agua y cloroformo (y al mezclarlos); b) KI; c) almidón y luego tiosulfato; d) NaOH y luego ácido.',
    solution:step('a) Agua y cloroformo','<p>El I₂ es no polar: muy poco soluble en agua (amarillo pálido) y muy soluble en cloroformo (violeta). Al mezclar, el iodo pasa a la fase orgánica (abajo): <b>extracción</b>.</p>')+
     step('b) KI',rx('I2 + I^- <=> I3^-','triyoduro: soluble, pardo rojizo'))+
     step('c) Almidón y tiosulfato','<p>Con almidón: azul intenso (reconocimiento). El tiosulfato reduce el iodo y el azul desaparece:</p>'+rx('I2 + 2 S2O3^2- -> 2 I^- + S4O6^2-'))+
     step('d) NaOH y ácido',rxs(['3 I2 + 6 OH^- -> 5 I^- + IO3^- + 3 H2O','dismutación: se decolora'],['5 I^- + IO3^- + 6 H^+ -> 3 I2 + 3 H2O','comproporción: vuelve el color'])),
    answer:'No polar (extracción a CHCl₃) · I₃⁻ en KI · azul con almidón, decolorado por S₂O₃²⁻ · dismuta en base y se regenera en ácido'},
   {n:5,title:'Ácido clorhídrico y cloruros',
    statement:'a) Calculá el volumen de H₂SO₄ concentrado (98 % m/m, δ = 1,84 g/cm³) necesario para 1 g de NaCl. b) ¿Por qué el HCl se recoge en un tubo derecho? c) ¿Qué se observa al invertir el tubo en agua? ¿Qué propiedad demuestra? d) Escribí las reacciones con AgNO₃ y con Pb(NO₃)₂.',
    solution:step('a) Volumen de H₂SO₄',rx('NaCl(s) + H2SO4(c) -> NaHSO4(ac) + HCl(g)')+chain(R`n=\frac{1}{58{,}5}=0{,}0171\ \mathrm{mol}`,R`m_{\text{sc}}=0{,}0171\cdot98\cdot\frac{100}{98}=1{,}71\ \mathrm{g}`,R`V=\frac{1{,}71}{1{,}84}=0{,}93\ \mathrm{mL}`))+
     step('b) Tubo derecho','<p>El HCl (36,5 g/mol) es <b>más denso que el aire</b> (29 g/mol): se acumula abajo y desplaza al aire hacia arriba.</p>')+
     step('c) Solubilidad','<p>El agua <b>sube</b> dentro del tubo: el HCl es <b>muy soluble</b> en agua; al disolverse deja un “vacío” que la presión atmosférica llena empujando el agua.</p>')+
     step('d) Cloruros',rxs(['AgNO3 + HCl -> AgCl↓ + HNO3','blanco'],['Pb(NO3)2 + 2 HCl -> PbCl2↓ + 2 HNO3','blanco'])),
    answer:'a) ≈ 0,93 mL · b) es más denso que el aire · c) el agua sube: muy soluble · d) AgCl y PbCl₂ blancos'},
   {n:6,title:'El H₂S: reductor y precipitante',
    statement:'a) ¿Qué se observa al agregar tioacetamida a KMnO₄ acidificado? Escribí la ecuación por ion-electrón. b) Explicá los resultados con CuSO₄, NiCl₂ y SbCl₃ (con tioacetamida, NaOH 6 M y HCl 6 M) usando el principio de Le Chatelier.',
    solution:step('a) Reductor',rxs(['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','× 2'],['H2S -> S + 2 H^+ + 2 e^-','× 5'],['2 MnO4^- + 5 H2S + 6 H^+ -> 2 Mn^2+ + 5 S↓ + 8 H2O','violeta → incoloro + turbidez amarilla']))+
     step('b) Sulfuros',figure(svg.chatelier,'')+table(['Catión','Qué pasa','Por qué'],[['Cu²⁺','CuS negro con tioacetamida; no se disuelve en HCl','es tan insoluble que el poco S²⁻ del medio ácido alcanza'],['Ni²⁺','no precipita en ácido; con NaOH, NiS negro','el NaOH consume H⁺ → el H₂S se ioniza más → sube el S²⁻ y se supera la solubilidad'],['Sb³⁺','Sb₂S₃ naranja; se disuelve en HCl 6 M caliente','el H⁺ baja el S²⁻ y el Cl⁻ forma clorocomplejos']])+rxs(['Cu^2+ + H2S -> CuS↓ + 2 H^+'],['Ni^2+ + S^2- -> NiS↓'],['2 Sb^3+ + 3 H2S -> Sb2S3↓ + 6 H^+'])),
    answer:'a) 2 MnO₄⁻ + 5 H₂S + 6 H⁺ → 2 Mn²⁺ + 5 S + 8 H₂O · b) el pH controla el S²⁻: CuS precipita siempre, NiS sólo en básico, Sb₂S₃ se redisuelve en HCl'},
   {n:7,title:'Ácido sulfúrico concentrado y diluido',
    statement:'a) Compará lo que ocurre al calentar cobre con H₂SO₄ concentrado y con H₂SO₄ diluido. ¿Para qué sirve el papel con dicromato? b) ¿Qué gas libera el Zn con H₂SO₄ diluido y cuál con concentrado? c) ¿Qué se observa con CuSO₄·5H₂O y con papel? ¿Qué propiedad demuestra?',
    solution:step('a) Cobre',rxs(['Cu + 2 H2SO4(c) -> CuSO4 + SO2↑ + 2 H2O','concentrado: el sulfato es el oxidante'],['Cu + H2SO4(d) -> no reacciona','el H⁺ no oxida al cobre'])+'<p>El papel con <b>dicromato</b> detecta el SO₂: pasa de naranja a verde (Cr⁶⁺ → Cr³⁺).</p>'+rx('K2Cr2O7 + 3 SO2 + H2SO4 -> Cr2(SO4)3 + K2SO4 + H2O'))+
     step('b) Zinc',rxs(['Zn + H2SO4(d) -> ZnSO4 + H2↑','gas incoloro e insípido'],['Zn + 2 H2SO4(c) -> ZnSO4 + SO2↑ + 2 H2O','gas de olor picante; tornasol a rosa']))+
     step('c) Deshidratante','<p>El CuSO₄·5H₂O pasa de <b>azul a blanco</b> (pierde el agua de cristalización) y el papel se <b>carboniza</b>: el H₂SO₄ concentrado es <b>deshidratante</b>.</p>'),
    answer:'a) concentrado: SO₂ (dicromato verde); diluido: nada · b) diluido H₂, concentrado SO₂ · c) deshidratante'},
   {n:8,title:'Cloro y bromo: la secuencia completa',
    statement:'Escribí las ecuaciones de cada paso del ensayo: a) NaClO + HCl; b) gas con papel de KI y tornasol; c) tubo A volcado en KBr; d) tubo I con cloroformo; e) tubo II con NaOH y luego HCl. ¿Qué orden de poder oxidante se deduce?',
    solution:step('a) Obtención del Cl₂',rx('NaClO + 2 HCl -> Cl2↑ + NaCl + H2O','comproporción'))+
     step('b) Papeles',rxs(['Cl2 + 2 KI -> 2 KCl + I2','KI pardo'],['Cl2 + H2O <=> HCl + HClO','tornasol rojo y luego blanqueado']))+
     step('c) KBr',rx('Cl2 + 2 KBr -> 2 KCl + Br2','naranja'))+
     step('d) Cloroformo','<p>El Br₂ (no polar) pasa a la fase orgánica: abajo, naranja-rojiza.</p>')+
     step('e) NaOH y HCl',rxs(['3 Br2 + 6 OH^- -> 5 Br^- + BrO3^- + 3 H2O','se decolora'],['5 Br^- + BrO3^- + 6 H^+ -> 3 Br2 + 3 H2O','vuelve el naranja']))+
     step('Conclusión','<p>El Cl₂ oxida al Br⁻ y al I⁻; el Br₂ oxida al I⁻: <b>Cl₂ &gt; Br₂ &gt; I₂</b>.</p>'),
    answer:'Cl₂ > Br₂ > I₂ (poder oxidante); el bromo dismuta en NaOH y se regenera con HCl'},
   {n:9,title:'El HCl: ¿oxidante o reductor?',
    statement:'Explicá con ecuaciones por qué el HCl concentrado libera Cl₂ con KMnO₄ y H₂ con un clavo de hierro. ¿Qué especie actúa en cada caso?',
    solution:step('Con KMnO₄: el Cl⁻ es reductor',rxs(['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','× 2'],['2 Cl^- -> Cl2 + 2 e^-','× 5'],['2 MnO4^- + 16 H^+ + 10 Cl^- -> 2 Mn^2+ + 5 Cl2 + 8 H2O'],['2 KMnO4 + 16 HCl -> 2 KCl + 2 MnCl2 + 5 Cl2 + 8 H2O','molecular']))+
     step('Con Fe: el H⁺ es oxidante',rxs(['Fe -> Fe^2+ + 2 e^-'],['2 H^+ + 2 e^- -> H2'],['Fe + 2 HCl -> FeCl2 + H2↑','solución verde clara']))+
     note('Por qué Fe²⁺ y no Fe³⁺','<p>El H⁺ es un oxidante moderado: lleva al hierro sólo hasta Fe²⁺. Para llegar a Fe³⁺ hace falta un oxidante más fuerte (o el O₂ del aire, con el tiempo).</p>'),
    answer:'Con KMnO₄ actúa el Cl⁻ (reductor → Cl₂); con Fe actúa el H⁺ (oxidante → H₂)'}
  ];

  // Las dos preguntas del material parcial «Halógenos y azufre», revisadas y unificadas acá.
  const ev=(n,title,statement,solution,answer)=>exercises.push({n,group:'eval',tag:`EVALUACIÓN · ${n}`,title,statement,solution,answer});
  ev('H1','Bromo con NaOH y luego HCl','Si a una solución acuosa de bromo (naranja) se le agrega NaOH, se decolora; al agregar HCl vuelve el color naranja. Indicá qué procesos ocurren y escribí las ecuaciones balanceadas.',
    step('1. Con NaOH: dismutación','<p>El Br₂ (n.o. 0) se reduce a Br⁻ (−1) y al mismo tiempo se oxida a BrO⁻ (+1, hipobromito) o, en caliente o en reposo, a BrO₃⁻ (+5, bromato). Las especies formadas son incoloras: la solución se decolora.</p>'+rxs(['Br2 + 2 e^- -> 2 Br^-','reducción'],['Br2 + 4 OH^- -> 2 BrO^- + 2 H2O + 2 e^-','oxidación (medio básico)'],['Br2 + 2 OH^- -> Br^- + BrO^- + H2O','suma ÷ 2'],['Br2 + 2 NaOH -> NaBr + NaBrO + H2O','molecular'],['3 Br2 + 6 OH^- -> 5 Br^- + BrO3^- + 3 H2O','la versión del material del TP 6']))+
    step('2. Con HCl: comproporción','<p>En medio ácido el proceso se invierte: el Br⁻ y el BrO⁻ (o BrO₃⁻) se encuentran en Br₂ (0) y vuelve el naranja.</p>'+rxs(['Br^- + BrO^- + 2 H^+ -> Br2 + H2O'],['5 Br^- + BrO3^- + 6 H^+ -> 3 Br2 + 3 H2O']))+
    idea('La clave','<p>El medio decide: en básico el bromo dismuta; en ácido se regenera. Es un equilibrio redox que se desplaza con el pH.</p>'),
    'NaOH: Br₂ + 2 OH⁻ → Br⁻ + BrO⁻ + H₂O (o 3 Br₂ + 6 OH⁻ → 5 Br⁻ + BrO₃⁻ + 3 H₂O) · HCl: la inversa, vuelve el naranja');
  ev('H2','Cationes con tioacetamida','Interpretá: Cu(NO₃)₂ + tioacetamida → precipitado negro (con NaOH y con HCl, sin cambios) · ZnSO₄ + tioacetamida → sin cambios; con NaOH, precipitado blanco; con HCl, se disuelve · SnCl₂ + tioacetamida → precipitado pardo; con HCl se disuelve.',
    step('Cobre','<p>El CuS es tan insoluble que precipita aun en medio ácido, y no se disuelve en HCl.</p>'+rx('Cu^2+ + H2S -> CuS(s)↓ + 2 H^+','negro'))+
    step('Zinc','<p>El ZnS es más soluble: en el medio ácido no alcanza el S²⁻ y no precipita. Al agregar NaOH aumenta el S²⁻ y precipita ZnS blanco; con HCl se redisuelve.</p>'+rxs(['Zn^2+ + S^2- -> ZnS(s)↓','blanco, en medio básico'],['ZnS(s) + 2 H^+ -> Zn^2+ + H2S','se disuelve en HCl']))+note('Otra lectura posible','<p>El precipitado blanco también podría ser Zn(OH)₂ (Zn²⁺ + 2 OH⁻ → Zn(OH)₂), que igualmente se disuelve en HCl. Con tioacetamida presente, lo esperable es ZnS.</p>')+
    step('Estaño','<p>Precipita SnS pardo, que se disuelve en HCl concentrado.</p>'+rxs(['Sn^2+ + H2S -> SnS(s)↓ + 2 H^+','pardo'],['SnS(s) + 2 H^+ -> Sn^2+ + H2S']))+
    fix('Lo que circula','<p>Presenta la formación de CuS como redox (“Cu²⁺ + 2e⁻ → Cu; S²⁻ → S + 2e⁻”). <b>No es redox</b>: el Cu sigue siendo +2 y el S sigue siendo −2 en el CuS. Es una reacción de <b>precipitación</b>.</p>'),
    'CuS negro (insoluble en HCl) · ZnS blanco sólo en medio básico, soluble en HCl · SnS pardo, soluble en HCl. Son precipitaciones, no redox.');

  window.ET27_QI4.units.push(
    {id:'calcogenos',part:'tp',kind:'apoyo',n:7,title:'Azufre y calcógenos',lead:'El grupo 16: alótropos del oxígeno y del azufre, enlace O–O vs. S–S, H₂S, SO₂ y H₂SO₄ (obtención y propiedades), precipitación de sulfuros y el ácido sulfúrico concentrado vs. diluido.',sections:sS},
    {id:'halogenos',part:'tp',kind:'apoyo',n:8,title:'Los halógenos',lead:'El grupo 17: estados y colores, solubilidad de moléculas no polares, poder oxidante (F₂ > Cl₂ > Br₂ > I₂), dismutación y comproporción, obtención del iodo y del ácido clorhídrico.',sections:sX},
    {id:'tp6',part:'tp',n:6,title:'TP 6 · Azufre y halógenos',short:'Azufre y halógenos',lead:'La guía de laboratorio del TP 6 explicada ensayo por ensayo: SO₂, iodo, HCl, H₂S y sulfuros, H₂SO₄, cloro y bromo. Con los cálculos de la guía, cuadro resumen y preguntas resueltas.',sections:s,exercises,exercisesLabel:'Preguntas resueltas'}
  );
})();
