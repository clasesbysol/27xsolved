// 27xSOLved · Procesos y Operaciones Químicas 4.º · Trabajos prácticos · TP 1: Electroquímica.
// Contenido (teoría, esquemas y las dos guías resueltas). Lo monta procesos-tp-ui.js en materia.html?subject=tp-procesos-operaciones-4.
(function(){
  'use strict';
  if(new URLSearchParams(location.search).get('subject')!=='tp-procesos-operaciones-4')return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const enc=v=>encodeURIComponent(String(v||''));
  const R=String.raw;

  // ---------- Fórmulas matemáticas (KaTeX las dibuja procesos-tp-ui.js) ----------
  const M=latex=>`<div class="u5-math" data-tpx-math="${enc(latex)}">${esc(latex)}</div>`;
  const m=latex=>`<span class="tpx-im" data-tpx-math="${enc(latex)}" data-inline="1">${esc(latex)}</span>`;
  const Ms=(...xs)=>xs.map(M).join('');

  // ---------- Ecuaciones químicas en HTML ----------
  const formula=t=>{
    let charge='';
    const c=String(t).match(/^(.*)\^([0-9]*[+\-−])$/);
    if(c){t=c[1];charge=c[2].replace('-','−')}
    return esc(t).replace(/([A-Za-z\)\]])(\d+)/g,'$1<sub>$2</sub>')+(charge?`<sup>${charge}</sup>`:'');
  };
  const STATE=/^(s|l|g|ac|aq|c|conc\.?|dil\.?)$/;
  const species=raw=>{
    let s=String(raw).trim(),mark='',coef='',state='';
    if(/[↓↑]$/.test(s)){mark=s.slice(-1);s=s.slice(0,-1).trim()}
    const c=s.match(/^(\d+|½|\d+\/\d+)\s+(.+)$/);if(c){coef=c[1];s=c[2]}
    const st=s.match(/^(.*\S)\s*\(([^()]*)\)$/);
    if(st&&STATE.test(st[2].trim())){s=st[1];state=st[2].trim()}
    return `${coef?`<span class="tpx-coef">${coef}</span>`:''}<span class="tpx-sp">${formula(s)}${state?`<span class="tpx-state">(${esc(state)})</span>`:''}${mark?`<span class="tpx-mark">${mark}</span>`:''}</span>`;
  };
  const side=t=>t.trim().split(/\s\+\s/).map(species).join('<span class="tpx-plus">+</span>');
  const arrow=tok=>{const lab=tok.match(/\[([^\]]*)\]/);return `<span class="tpx-arrow">${lab?`<small>${esc(lab[1])}</small>`:''}<i>${tok.startsWith('<')?'⇌':'→'}</i></span>`};
  const eq=t=>{const parts=String(t).split(/\s*(<=>|->|=\[[^\]]*\]=>)\s*/);return `<span class="tpx-eq">${parts.map((p,i)=>i%2?arrow(p):side(p)).join('')}</span>`};
  const rx=(t,note)=>`<div class="tpx-rx">${eq(t)}${note?`<small class="tpx-note">${note}</small>`:''}</div>`;
  const rxs=(...items)=>`<div class="tpx-rxs">${items.map(x=>Array.isArray(x)?rx(x[0],x[1]):rx(x)).join('')}</div>`;
  const f=t=>`<span class="tpx-f">${species(t)}</span>`;
  // Notación de pila: "Zn(s) | Zn^2+ (1 M) || Cu^2+ (1 M) | Cu(s)" → se muestra con / y //.
  const cell=t=>`<div class="tpx-cell">${String(t).split(/\s*(\|\||\|)\s*/).map((p,i)=>i%2?`<span class="bar">${p==='||'?'//':'/'}</span>`:p.split(/,\s*(?![^()]*\))/).map(x=>{const k=x.match(/^(.*?)\s*(\([^()]*\))?$/);return formula(k[1])+(k[2]?` <small>${esc(k[2])}</small>`:'')}).join(', ')).join(' ')}</div>`;

  // ---------- Piezas de la página (mismas que la Unidad 5) ----------
  const ICONS={
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>',
    bolt:'<path d="M13 2 5 13.5h6L10 22l9-12h-6z"/>',
    alert:'<path d="M12 3 2.5 20h19zM12 10v4.5M12 17.2v.3"/>',
    check:'<path d="m4.5 12.5 4.5 4.5L19.5 7"/>',
    target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    star:'<path d="m12 2.6 2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8l-5.8 3.3 1.4-6.4-4.9-4.4 6.5-.7z"/>'
  };
  const icon=n=>`<svg class="u5t-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;
  const sec=(id,n,kicker,title,body)=>`<article class="u5t-sec" id="${id}"><header class="u5t-head"><span class="u5t-num">${String(n).padStart(2,'0')}</span><div><small>${kicker}</small><h3>${title}</h3></div></header>${body}</article>`;
  const key=(tone,label,html,ic='book')=>`<div class="tpx-key ${tone}">${icon(ic)}<div><b>${label}</b>${html}</div></div>`;
  const big=(label,latex)=>`<div class="tpx-formula"><span>${label}</span>${M(latex)}</div>`;
  const box=(tone,title,html)=>`<div class="u5t-box u5t-${tone}"><b>${title}</b>${html}</div>`;
  const grid2=(...xs)=>`<div class="u5t-grid2">${xs.join('')}</div>`;
  const grid3=(...xs)=>`<div class="u5t-grid3">${xs.join('')}</div>`;
  const table=(head,rows,cls='')=>`<div class="tpx-table ${cls}"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>Array.isArray(r)?`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`:`<tr class="${r.cls||''}">${r.cells.map(c=>`<td${/^[−+\-]?\d/.test(String(c))?' class="num"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const fig=(svg,cap)=>`<figure class="tpx-fig">${svg}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
  const step=(title,html)=>`<article class="u5-card u4-step"><h4>${title}</h4><div class="u5-flow">${html}</div></article>`;
  const data=pairs=>`<div class="tpx-data">${pairs.map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>`;
  const p=t=>`<p class="u5-line">${t}</p>`;

  // ---------- Esquemas SVG ----------
  const ar=(x1,y1,x2,y2,c='')=>{const a=Math.atan2(y2-y1,x2-x1),h=10,w=5.5,bx=x2-h*Math.cos(a),by=y2-h*Math.sin(a),px=-Math.sin(a)*w,py=Math.cos(a)*w;return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="arr${c?'-'+c:''}"/><path d="M${x2} ${y2}L${(bx+px).toFixed(1)} ${(by+py).toFixed(1)}L${(bx-px).toFixed(1)} ${(by-py).toFixed(1)}Z" class="tip${c?'-'+c:''}"/>`};
  const T=(x,y,t,c='t',a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="${c}">${t}</text>`;
  const beaker=(x0,x1,top,bottom,liq,liqTop)=>`<path d="M${x0+2} ${liqTop}V${bottom-12}Q${x0+2} ${bottom-2} ${x0+14} ${bottom-2}H${x1-14}Q${x1-2} ${bottom-2} ${x1-2} ${bottom-12}V${liqTop}Z" class="${liq}"/><path d="M${x0} ${top}V${bottom-12}Q${x0} ${bottom} ${x0+12} ${bottom}H${x1-12}Q${x1} ${bottom} ${x1} ${bottom-12}V${top}" class="glass"/>`;
  const bubbles=(pts)=>pts.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r||4}" class="bub"/>`).join('');

  const svgDaniell=`<svg viewBox="0 0 640 410" role="img" aria-label="Pila de Daniell: electrodo de zinc en sulfato de zinc y electrodo de cobre en sulfato cúprico, unidos por un cable con voltímetro y por un puente salino; los electrones van del zinc al cobre">
    <path d="M150 122V48H292" class="wire"/><path d="M348 48H490V122" class="wire"/>
    <circle cx="320" cy="48" r="27" class="meter"/>${T(320,55,'V','tb')}${T(354,80,'1,10 V','tacc','start')}
    ${ar(190,28,262,28)}${T(226,20,'e⁻','tacc')}${ar(378,28,450,28)}${T(414,20,'e⁻','tacc')}
    ${beaker(70,230,150,330,'liq',182)}${beaker(410,570,150,330,'liq-blue',182)}
    <path d="M202 302V132Q202 116 218 116H422Q438 116 438 132V302" class="bridge"/><path d="M202 302V132Q202 116 218 116H422Q438 116 438 132V302" class="bridge-in"/>
    ${T(320,121,'puente salino (KCl)','ts')}
    ${ar(300,152,232,152,'cold')}${T(266,170,'Cl⁻','tcold')}${ar(340,152,408,152,'hot')}${T(374,170,'K⁺','thot')}
    <rect x="140" y="122" width="20" height="172" rx="3" class="zn"/><rect x="480" y="122" width="20" height="172" rx="3" class="cu"/>
    ${T(126,214,'Zn','tb','end')}${T(514,214,'Cu','tb','start')}
    ${ar(138,248,112,260,'hot')}${T(108,280,'Zn²⁺','thot','end')}${ar(560,248,506,236,'cold')}${T(560,266,'Cu²⁺','tcold','end')}
    ${T(150,318,'ZnSO₄ (ac)','ts')}${T(490,318,'CuSO₄ (ac)','ts')}
    ${T(150,354,'ÁNODO (−) · oxidación','thot')}${T(150,378,'Zn → Zn²⁺ + 2 e⁻','t')}
    ${T(490,354,'CÁTODO (+) · reducción','tcold')}${T(490,378,'Cu²⁺ + 2 e⁻ → Cu','t')}
    ${T(320,402,'global: Zn + Cu²⁺ → Zn²⁺ + Cu','ts')}
  </svg>`;

  const svgEEH=`<svg viewBox="0 0 640 300" role="img" aria-label="Electrodo estándar de hidrógeno: una lámina de platino dentro de un tubo por el que burbujea hidrógeno a 1 atm, sumergida en ácido 1 M">
    ${beaker(50,270,110,285,'liq',150)}
    <path d="M138 30V232M182 30V232" class="glass"/><path d="M138 30H182" class="glass"/>
    <line x1="160" y1="12" x2="160" y2="202" class="wire"/>
    <rect x="147" y="202" width="26" height="40" rx="2" class="pt"/>
    ${ar(250,70,184,70)}${T(256,66,'H₂','tb','start')}${T(256,84,'1 atm','ts','start')}
    ${bubbles([[134,236,4],[188,238,5],[128,216,3.5],[194,214,4],[146,250,3.5],[176,252,3]])}
    ${T(205,226,'Pt','tb','start')}${T(160,276,'HCl · H⁺ 1 M','ts')}
    ${T(310,60,'ELECTRODO ESTÁNDAR DE HIDRÓGENO (EEH)','tacc','start')}
    ${T(310,96,'Pt (s) / H₂ (g, 1 atm) / H⁺ (1 M)','tb','start')}
    ${T(310,132,'2 H⁺ (ac) + 2 e⁻ ⇌ H₂ (g)','t','start')}
    ${T(310,170,'E° = 0,00 V','tb','start')}${T(310,190,'(valor asignado por convención)','ts','start')}
    ${T(310,228,'25 °C · 1 atm · concentraciones 1 M','ts','start')}
    ${T(310,250,'el Pt no reacciona: solo conduce los electrones','ts','start')}
  </svg>`;

  const Y=e=>40+(1.5-e)/4*250;
  const svgScale=(()=>{
    const pts=[['Cl₂ / Cl⁻',1.36],['Ag⁺ / Ag',0.80],['Cu²⁺ / Cu',0.34],['H⁺ / H₂',0],['Fe²⁺ / Fe',-0.44],['Zn²⁺ / Zn',-0.76],['Al³⁺ / Al',-1.66],['Mg²⁺ / Mg',-2.37]];
    const num=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(2).replace('.',',');
    return `<svg viewBox="0 0 640 320" role="img" aria-label="Escala de potenciales estándar de reducción: arriba los pares más oxidantes, abajo los más reductores; la pila de Daniell es la distancia entre Cu y Zn, 1,10 V">
      <line x1="200" y1="${Y(1.5)}" x2="200" y2="${Y(-2.5)}" class="scale"/>
      ${pts.map(([n,v])=>`<line x1="193" y1="${Y(v)}" x2="207" y2="${Y(v)}" class="scale"/>${T(216,Y(v)+5,`${n}`,v===0?'tacc':'t','start')}${T(336,Y(v)+5,`${num(v)} V`,'ts','end')}`).join('')}
      ${ar(150,Y(-0.76),150,Y(0.34)+3)}${ar(150,Y(0.34),150,Y(-0.76)-3)}
      ${T(140,(Y(0.34)+Y(-0.76))/2-4,'Daniell','tacc','end')}${T(140,(Y(0.34)+Y(-0.76))/2+14,'1,10 V','tb','end')}
      ${T(40,Y(1.5)+6,'más oxidante','thot','start')}${T(40,Y(1.5)+24,'(se reduce)','ts','start')}
      ${T(40,Y(-2.5)-18,'más reductor','tcold','start')}${T(40,Y(-2.5),'(se oxida)','ts','start')}
      <rect x="380" y="60" width="236" height="200" rx="14" class="soft"/>
      ${T(498,92,'CÓMO SE ARMA LA PILA','tacc')}
      ${T(398,126,'Cátodo: el par de más arriba','tcold','start')}${T(398,146,'(se reduce)','ts','start')}
      ${T(398,180,'Ánodo: el par de más abajo','thot','start')}${T(398,200,'(se oxida)','ts','start')}
      ${T(398,236,'E°pila = E°arriba − E°abajo','tb','start')}
    </svg>`;
  })();

  // Celda electrolítica genérica.
  const electro=o=>`<svg viewBox="0 0 640 412" role="img" aria-label="${esc(o.aria)}">
    <rect x="262" y="18" width="116" height="44" rx="9" class="soft"/>${T(320,45,'fuente (cc)','ts')}${T(278,47,'+','thot')}${T(362,47,'−','tcold')}
    <path d="M262 40H160V124" class="wire"/><path d="M378 40H480V124" class="wire"/>
    ${ar(160,112,160,68)}${T(146,96,'e⁻','tacc','end')}${ar(480,68,480,112)}${T(494,96,'e⁻','tacc','start')}
    ${beaker(80,560,108,332,o.liq,148)}
    <rect x="150" y="124" width="20" height="168" rx="3" class="${o.el||'gr'}"/><rect x="470" y="124" width="20" height="168" rx="3" class="${o.el||'gr'}"/>
    ${o.aBub?bubbles([[178,200,5],[186,176,4],[176,236,4.5],[188,256,3.5],[180,156,3.5]]):''}
    ${o.cBub?bubbles([[462,200,5],[454,176,4],[464,236,4.5],[452,256,3.5],[460,156,3.5]]):''}
    ${o.cDrops?`<ellipse cx="480" cy="300" rx="26" ry="7" fill="#c9ced3" stroke="#7d868c"/>`:''}
    ${T(200,138,o.aProd,'thot','start')}${T(440,138,o.cProd,'tcold','end')}
    ${ar(370,214,262,214,'cold')}${T(316,206,o.anion,'tcold')}${ar(270,262,378,262,'hot')}${T(324,254,o.cation,'thot')}
    ${T(320,318,o.liqLabel,'ts')}
    ${T(160,354,'ÁNODO (+) · oxidación','thot')}${T(160,378,o.aRx,'t')}
    ${T(480,354,'CÁTODO (−) · reducción','tcold')}${T(480,378,o.cRx,'t')}
    ${o.global?T(320,404,o.global,'ts'):''}
  </svg>`;
  const svgAgua=electro({aria:'Electrólisis del agua acidulada: en el ánodo positivo se desprende oxígeno y en el cátodo negativo hidrógeno, el doble de volumen',liq:'liq',el:'pt',aBub:true,cBub:true,aProd:'O₂ ↑',cProd:'H₂ ↑ (doble volumen)',anion:'SO₄²⁻',cation:'H⁺',liqLabel:'agua + H₂SO₄ (para que conduzca)',aRx:'2 H₂O → O₂ + 4 H⁺ + 4 e⁻',cRx:'4 H⁺ + 4 e⁻ → 2 H₂',global:'global: 2 H₂O → 2 H₂ + O₂'});
  const svgFundido=electro({aria:'Electrólisis del cloruro de sodio fundido: en el ánodo se desprende cloro gaseoso y en el cátodo se forma sodio metálico líquido',liq:'liq-melt',el:'gr',aBub:true,cDrops:true,aProd:'Cl₂ ↑',cProd:'Na (líquido)',anion:'Cl⁻',cation:'Na⁺',liqLabel:'NaCl fundido (≈ 801 °C)',aRx:'2 Cl⁻ → Cl₂ + 2 e⁻',cRx:'2 Na⁺ + 2 e⁻ → 2 Na',global:'global: 2 NaCl (l) → 2 Na (l) + Cl₂ (g)'});
  const svgAcuoso=electro({aria:'Electrólisis de cloruro de sodio en solución acuosa: en el ánodo se desprende cloro y en el cátodo hidrógeno; alrededor del cátodo queda la solución básica',liq:'liq',el:'gr',aBub:true,cBub:true,aProd:'Cl₂ ↑',cProd:'H₂ ↑ + OH⁻',anion:'Cl⁻',cation:'Na⁺',liqLabel:'NaCl (ac) concentrado',aRx:'2 Cl⁻ → Cl₂ + 2 e⁻',cRx:'2 H₂O + 2 e⁻ → H₂ + 2 OH⁻',global:'global: 2 NaCl + 2 H₂O → 2 NaOH + H₂ + Cl₂'});

  const svgCorrosion=`<svg viewBox="0 0 640 330" role="img" aria-label="Corrosión del hierro bajo una gota de agua: el centro de la gota es el ánodo donde el hierro se disuelve y el borde, con más oxígeno, es el cátodo. A la derecha, un caño de hierro protegido por un bloque de magnesio que se sacrifica">
    ${T(160,24,'CORROSIÓN BAJO UNA GOTA','tacc')}
    <rect x="20" y="210" width="280" height="40" rx="4" class="fe"/>${T(160,236,'hierro','t')}
    <path d="M58 210Q66 118 160 108Q254 118 262 210Z" class="liq"/><path d="M58 210Q66 118 160 108Q254 118 262 210" class="glass" style="stroke-width:2"/>
    <rect x="62" y="204" width="34" height="7" rx="3" class="rust"/><rect x="224" y="204" width="34" height="7" rx="3" class="rust"/>
    ${T(160,182,'Fe → Fe²⁺ + 2 e⁻','thot')}${T(160,164,'centro: ÁNODO','thot')}
    ${ar(150,222,92,222)}${ar(170,222,228,222)}
    ${T(24,58,'borde (más O₂): CÁTODO','tcold','start')}${T(24,76,'O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻','ts','start')}<path d="M70 82 L82 196" class="scale" style="stroke-dasharray:3 4"/>
    ${T(160,276,'Fe²⁺ + OH⁻ + O₂ → herrumbre','t')}${T(160,296,'(Fe₂O₃ · x H₂O, en el borde)','ts')}
    <line x1="330" y1="20" x2="330" y2="320" class="scale" style="stroke-dasharray:4 6"/>
    ${T(490,24,'ÁNODO DE SACRIFICIO','tacc')}
    <rect x="350" y="250" width="270" height="56" rx="4" class="soft"/>${T(485,298,'suelo húmedo','ts')}
    <rect x="364" y="258" width="150" height="24" rx="12" class="fe"/>${T(439,275,'caño de Fe','t')}
    <rect x="560" y="246" width="40" height="40" rx="5" class="mg"/>${T(580,271,'Mg','tb')}
    <path d="M500 258V200H580V246" class="wire"/>${ar(572,186,510,186)}${T(541,178,'e⁻','tacc')}
    ${T(612,124,'Mg → Mg²⁺ + 2 e⁻','thot','end')}${T(612,142,'el Mg se oxida (se gasta)','ts','end')}
    ${T(360,66,'el Fe recibe electrones:','tcold','start')}${T(360,84,'es CÁTODO, no se corroe','tcold','start')}
  </svg>`;

  // ---------- Teoría ----------
  const potRows=[
    ['F₂ (g) + 2 e⁻ → 2 F⁻','+2,87'],['H₂O₂ + 2 H⁺ + 2 e⁻ → 2 H₂O','+1,78'],['MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O','+1,51'],['Au³⁺ + 3 e⁻ → Au','+1,50'],['PbO₂ + 4 H⁺ + 2 e⁻ → Pb²⁺ + 2 H₂O','+1,46'],['Cl₂ (g) + 2 e⁻ → 2 Cl⁻','+1,36'],['Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O','+1,33'],['O₂ (g) + 4 H⁺ + 4 e⁻ → 2 H₂O','+1,23'],['ClO₄⁻ + 2 H⁺ + 2 e⁻ → ClO₃⁻ + H₂O','+1,19'],['Br₂ (l) + 2 e⁻ → 2 Br⁻','+1,07'],['NO₃⁻ + 4 H⁺ + 3 e⁻ → NO + 2 H₂O','+0,96'],['Ag⁺ + e⁻ → Ag','+0,80'],['Fe³⁺ + e⁻ → Fe²⁺','+0,77'],['I₂ (s) + 2 e⁻ → 2 I⁻','+0,54'],['Cu⁺ + e⁻ → Cu','+0,521'],['O₂ (g) + 2 H₂O + 4 e⁻ → 4 OH⁻','+0,40'],['Cu²⁺ + 2 e⁻ → Cu','+0,337'],['Sn⁴⁺ + 2 e⁻ → Sn²⁺','+0,15'],['Cu²⁺ + e⁻ → Cu⁺','+0,153'],
    {cls:'ref',cells:['2 H⁺ + 2 e⁻ → H₂ (g)','0,00']},
    ['Pb²⁺ + 2 e⁻ → Pb','−0,126'],['Sn²⁺ + 2 e⁻ → Sn','−0,136'],['Ni²⁺ + 2 e⁻ → Ni','−0,250'],['Co²⁺ + 2 e⁻ → Co','−0,28'],['Cd²⁺ + 2 e⁻ → Cd','−0,403'],['Fe²⁺ + 2 e⁻ → Fe','−0,440'],['Cr³⁺ + 3 e⁻ → Cr','−0,74'],['Zn²⁺ + 2 e⁻ → Zn','−0,763'],['2 H₂O + 2 e⁻ → H₂ (g) + 2 OH⁻','−0,83'],['Mn²⁺ + 2 e⁻ → Mn','−1,18'],['Al³⁺ + 3 e⁻ → Al','−1,66'],['Mg²⁺ + 2 e⁻ → Mg','−2,37'],['Na⁺ + e⁻ → Na','−2,71'],['Ca²⁺ + 2 e⁻ → Ca','−2,87'],['K⁺ + e⁻ → K','−2,93'],['Li⁺ + e⁻ → Li','−3,04']
  ];
  const potTable=`<div class="tpx-potwrap">${table(['Semirreacción de reducción','E° (V)'],potRows.map(r=>Array.isArray(r)?{cells:r}:r),'pot')}<div class="tpx-potbar" aria-hidden="true"><span class="top">más<br>oxidante</span><b>poder oxidante ↑ · poder reductor ↓</b><span class="bot">más<br>reductor</span></div></div>`;

  const theory=[];
  const add=(id,kicker,title,body,nav)=>theory.push({id:`tpx-t-${id}`,kicker,title,body,nav:nav||title});

  add('redox','PARA EMPEZAR','Electroquímica y reacciones redox',`
<p>La <b>electroquímica</b> estudia la relación entre la <b>electricidad</b> y las <b>reacciones químicas</b>. Tiene dos caras que son la misma reacción mirada desde lados opuestos:</p>
${grid2(box('green','Pilas (celdas galvánicas)','<p>Una reacción <b>espontánea</b> produce corriente eléctrica.</p>'),box('blue','Electrólisis (celdas electrolíticas)','<p>La corriente eléctrica fuerza una reacción <b>no espontánea</b>.</p>'))}
<p>En los dos casos hay <b>transferencia de electrones</b>: son reacciones <b>redox</b>.</p>
${table(['','Le pasa','Número de oxidación','Se lo llama'],[
 ['<b>Oxidación</b>','pierde electrones','aumenta','<b>reductor</b> (reduce al otro)'],
 ['<b>Reducción</b>','gana electrones','disminuye','<b>oxidante</b> (oxida al otro)']])}
${key('yellow','Regla para no confundirse','<p>El que <b>se oxida</b> es el <b>reductor</b>; el que <b>se reduce</b> es el <b>oxidante</b>. Siempre van cruzados: no puede haber oxidación sin reducción, porque los electrones que pierde uno los gana el otro.</p>','alert')}
<h4>Balanceo por el método del ion-electrón</h4>
<ol><li>Escribir las dos <b>hemirreacciones</b> (oxidación y reducción) con las especies que cambian.</li><li>Balancear los átomos distintos de O e H.</li><li>En medio ácido: balancear O con H₂O y H con H⁺.</li><li>Balancear la carga con electrones.</li><li>Multiplicar para que los electrones ganados y perdidos sean iguales, y sumar.</li></ol>
<p>Ejemplo sencillo (sin oxígeno):</p>
${rxs(['Zn -> Zn^2+ + 2 e^-','oxidación'],['Cu^2+ + 2 e^- -> Cu','reducción'],['Zn + Cu^2+ -> Zn^2+ + Cu','suma: los 2 e⁻ se cancelan'])}
<p>Ejemplo en medio ácido: permanganato con hierro(II).</p>
${rxs(['MnO4^- + 8 H^+ + 5 e^- -> Mn^2+ + 4 H2O','reducción (O con H₂O, H con H⁺)'],['5 Fe^2+ -> 5 Fe^3+ + 5 e^-','oxidación ×5'],['MnO4^- + 8 H^+ + 5 Fe^2+ -> Mn^2+ + 5 Fe^3+ + 4 H2O','global'])}
`,'Redox e ion-electrón');

  add('daniell','CELDAS VOLTAICAS','La pila de Daniell',`
<p>Una <b>pila</b> (celda voltaica o galvánica) es un dispositivo que obtiene <b>energía eléctrica</b> a partir de una <b>reacción redox espontánea</b>. El truco es <b>separar</b> a los reactivos en dos recipientes: así los electrones no pasan directamente de uno a otro, sino que se ven obligados a viajar <b>por un cable</b>, y eso es una corriente eléctrica que podemos usar.</p>
${fig(svgDaniell,'Pila de Daniell (Zn–Cu) en condiciones estándar.')}
${table(['Parte','Qué es','Para qué sirve'],[
 ['Electrodo de zinc','Barra de Zn en solución de ZnSO₄','El Zn se oxida y entrega electrones'],
 ['Electrodo de cobre','Barra de Cu en solución de CuSO₄','Los Cu²⁺ toman electrones y se depositan como Cu'],
 ['Hilo conductor','Cable que une las barras, con un voltímetro','Lleva los electrones y permite medir la diferencia de potencial'],
 ['Puente salino','Tubo con una sal inerte (KCl, KNO₃)','Cierra el circuito y mantiene neutras las soluciones']])}
${key('blue','Qué se ve después de un rato','<p>La barra de <b>zinc se gasta</b> (pierde masa), la de <b>cobre engorda</b> (se le deposita cobre) y la solución azul de Cu²⁺ se va <b>decolorando</b>.</p>','check')}
`,'Pila de Daniell');

  add('electrodos','CELDAS VOLTAICAS','Ánodo, cátodo y puente salino',`
${grid2(box('hot','ÁNODO · electrodo negativo (−)','<p>Ocurre la <b>oxidación</b>. En la pila de Daniell, el Zn → Zn²⁺. De acá <b>salen</b> los electrones.</p>'),box('cold','CÁTODO · electrodo positivo (+)','<p>Ocurre la <b>reducción</b>. En la pila de Daniell, el Cu²⁺ → Cu. Acá <b>llegan</b> los electrones.</p>'))}
${key('yellow','Truco para recordarlo','<p><b>AN</b>odo → <b>OX</b>idación · <b>CAT</b>odo → <b>RED</b>ucción (las dos vocales y las dos consonantes: «ánodo-oxidación», «cátodo-reducción»). Vale para pilas <b>y</b> para electrólisis; lo que cambia entre ellas es el signo.</p>','star')}
<h4>¿Por qué hace falta el puente salino?</h4>
<p>A medida que el Zn se oxida, en su recipiente <b>aparecen cargas positivas</b> (Zn²⁺). En el otro, al depositarse Cu²⁺ como cobre metálico, <b>quedan sobrando aniones</b> SO₄²⁻: esa solución se vuelve negativa. Una solución cargada positivamente frena la salida de más Zn²⁺, y en pocos instantes la pila se detendría.</p>
<p>El puente salino contiene un <b>electrolito inerte</b> (no participa de la redox) y resuelve el problema:</p>
<ul><li>aporta <b>aniones</b> (Cl⁻) al recipiente del ánodo, que se estaba cargando positivamente;</li><li>aporta <b>cationes</b> (K⁺) al recipiente del cátodo, que se estaba cargando negativamente.</li></ul>
${key('blue','Resumen del circuito','<p>Por el <b>cable</b> se mueven <b>electrones</b> (del ánodo al cátodo). Por el <b>puente salino y las soluciones</b> se mueven <b>iones</b>. Sin cualquiera de los dos, no hay corriente.</p>','bolt')}
`,'Ánodo, cátodo y puente salino');

  add('notacion','CELDAS VOLTAICAS','Cómo se escribe una pila',`
<p>En vez de dibujar la pila, se usa una notación abreviada:</p>
${cell('Zn(s) | Zn^2+ (ac, 1 M) || Cu^2+ (ac, 1 M) | Cu(s)')}
<ul><li>A la <b>izquierda</b> va el <b>ánodo</b> y a la <b>derecha</b> el <b>cátodo</b>.</li><li>La <b>barra simple</b> (/) separa dos <b>fases</b> distintas: el metal sólido y la solución.</li><li>La <b>doble barra</b> (//) representa el <b>puente salino</b>.</li><li>Entre paréntesis se aclaran el estado y la concentración.</li></ul>
<p>La <b>diferencia de potencial</b> entre los dos electrodos es la <b>fuerza electromotriz (fem)</b> de la pila. Es lo que mide el voltímetro y es lo que decide si la pila funciona.</p>
${key('yellow','Lectura rápida','<p>Leyendo de izquierda a derecha se ve el camino: el Zn pasa a Zn²⁺ (oxidación), cruza el puente, y el Cu²⁺ pasa a Cu (reducción).</p>','target')}
`,'Notación de la pila');

  add('tipos','CELDAS VOLTAICAS','Tipos de electrodos',`
${grid2(box('green','Electrodo de metal activo','<p>Una barra de metal sumergida en una solución de <b>sus propios iones</b>. El metal <b>participa</b> de la reacción: se gasta o crece. Ejemplos: Zn/Zn²⁺ y Cu/Cu²⁺ de la pila de Daniell.</p>'),box('blue','Electrodo de metal inerte','<p>La redox ocurre <b>entre iones de la solución</b> (o con un gas) y el metal solo <b>conduce los electrones</b>. Se usan <b>platino o grafito</b>, que no reaccionan. Ejemplos: Fe³⁺/Fe²⁺, Sn⁴⁺/Sn²⁺, Cl₂/Cl⁻, H⁺/H₂.</p>'))}
<p>Con un electrodo inerte la notación incluye el metal en el extremo:</p>
${cell('Zn(s) | Zn^2+ (1 M) || Fe^3+ (1 M), Fe^2+ (1 M) | Pt(s)')}
<p>Si cambiamos los metales, las soluciones o las concentraciones, la pila da otro voltaje. Lo interesante es que se puede <b>calcular de antemano</b> si una pila va a funcionar y qué voltaje va a dar, usando los <b>potenciales estándar de reducción</b>.</p>
`,'Tipos de electrodos');

  add('eeh','POTENCIALES','Potenciales estándar y el electrodo de hidrógeno',`
<p>No se puede medir el potencial de un electrodo solo: el voltímetro siempre mide una <b>diferencia</b> entre dos. Por eso se eligió un electrodo de referencia y se le asignó, por convención, el valor <b>0,00 V</b>: el <b>electrodo estándar de hidrógeno (EEH)</b>.</p>
${fig(svgEEH,'El electrodo de referencia. El agua destilada no conduce: por eso se usa un ácido (HCl o H₂SO₄) 1 M.')}
<p><b>Condiciones estándar:</b> 25 °C, 1 atm para los gases y concentración 1 M para los iones. El potencial medido en esas condiciones se escribe <b>E°</b>.</p>
<h4>Cobre frente al EEH</h4>
${cell('Pt(s) | H2 (g, 1 atm) | H^+ (ac, 1 M) || Cu^2+ (ac, 1 M) | Cu(s)')}
${rxs(['H2(g) -> 2 H^+(ac) + 2 e^-','ánodo: el H₂ se oxida'],['Cu^2+(ac) + 2 e^- -> Cu(s)','cátodo'])}
<p>El voltímetro marca <b>0,34 V</b> y el cobre es el polo positivo: ${m(R`E^\circ_{\mathrm{Cu^{2+}/Cu}}=+0{,}34\ \text{V}`)}. El Cu²⁺ tiene <b>más</b> tendencia a reducirse que el H⁺.</p>
<h4>Zinc frente al EEH</h4>
${cell('Zn(s) | Zn^2+ (ac, 1 M) || H^+ (ac, 1 M) | H2 (g, 1 atm) | Pt(s)')}
${rxs(['Zn(s) -> Zn^2+(ac) + 2 e^-','ánodo'],['2 H^+(ac) + 2 e^- -> H2(g)','cátodo: el H⁺ se reduce'])}
<p>Ahora el hidrógeno es el polo positivo y el voltímetro marca 0,76 V: ${m(R`E^\circ_{\mathrm{Zn^{2+}/Zn}}=-0{,}76\ \text{V}`)}. El Zn²⁺ tiene <b>menos</b> tendencia a reducirse que el H⁺ (el Zn prefiere oxidarse).</p>
`,'Potenciales estándar · EEH');

  add('tabla','POTENCIALES','Tabla de potenciales estándar de reducción',`
<p>Repitiendo la medición con cada par frente al EEH se arma la tabla. Todas las semirreacciones se escriben como <b>reducciones</b>.</p>
${grid2(box('hot','E° muy positivo','<p>Mucha tendencia a <b>reducirse</b>. La especie de la izquierda es un <b>buen oxidante</b> (F₂, MnO₄⁻, Cl₂).</p>'),box('cold','E° muy negativo','<p>Mucha tendencia a <b>oxidarse</b> (la reacción va al revés). La especie de la derecha es un <b>buen reductor</b> (Li, K, Mg, Zn).</p>'))}
${potTable}
<p class="u5-line"><small>Valores a 25 °C en solución acuosa 1 M. Por ejemplo: E° Cu⁺/Cu = 0,521 V; E° Fe²⁺/Fe = −0,440 V.</small></p>
${key('yellow','Ojo con el signo','<p>Si un par aparece escrito al revés (como oxidación), su potencial cambia de signo. Para no equivocarse, en los cálculos usá <b>siempre</b> los potenciales de reducción de la tabla, tal cual están, y la fórmula del próximo bloque.</p>','alert')}
`,'Tabla de potenciales');

  add('prediccion','POTENCIALES','Cómo predecir si una pila funciona',`
${big('Fuerza electromotriz estándar',R`\Delta E^\circ_{\text{pila}}=E^\circ_{\text{cátodo}}-E^\circ_{\text{ánodo}}`)}
${grid2(box('green','ΔE° > 0','<p>La reacción, tal como está escrita, es <b>espontánea</b>: la pila funciona.</p>'),box('red','ΔE° < 0','<p><b>No es espontánea</b> así escrita; la que ocurre sola es la <b>inversa</b>.</p>'))}
${fig(svgScale,'En la escala, el cátodo es siempre el par de más arriba.')}
<h4>Ejemplo: pila de Daniell</h4>
${Ms(R`\Delta E^\circ=E^\circ_{\mathrm{Cu^{2+}/Cu}}-E^\circ_{\mathrm{Zn^{2+}/Zn}}`,R`\Delta E^\circ=0{,}337\ \text{V}-(-0{,}763\ \text{V})=1{,}10\ \text{V}`)}
${key('yellow','El error más común','<p>Para igualar electrones se multiplican las hemirreacciones, pero los potenciales <b>no se multiplican</b>. El potencial es una propiedad intensiva (como la temperatura): no depende de cuánta sustancia reacciona.</p>','alert')}
<h4>Relación con la energía libre</h4>
${big('Espontaneidad',R`\Delta G^\circ=-n\,F\,\Delta E^\circ`)}
<p><b>n</b>: electrones intercambiados en la ecuación global; <b>F</b> = 96500 C/mol (constante de Faraday). Si ΔE° es positivo, ΔG° es negativo: es el mismo criterio de espontaneidad que se usa en termodinámica. En la pila de Daniell: ${m(R`\Delta G^\circ=-2\cdot96500\cdot1{,}10=-212\ \text{kJ}`)}.</p>
`,'Cómo predecir una pila');

  add('nernst','POTENCIALES','Pilas fuera de las condiciones estándar: ecuación de Nernst',`
<p>Si las concentraciones no son 1 M, la fem de la pila (<b>E</b>, sin el «°») cambia. Se calcula con la <b>ecuación de Nernst</b>:</p>
${big('Ecuación de Nernst',R`E=E^\circ-\frac{R\,T}{n\,F}\ln Q`)}
${big('A 25 °C (298 K)',R`E=E^\circ-\frac{0{,}0592}{n}\log Q`)}
<p><b>Q</b> es el cociente de reacción: concentraciones de los productos sobre las de los reactivos, elevadas a sus coeficientes. Los sólidos y el agua no se escriben.</p>
<h4>Ejemplo: Daniell con [Zn²⁺] = 0,10 M y [Cu²⁺] = 1,0 M</h4>
${rx('Zn(s) + Cu^2+(ac) -> Zn^2+(ac) + Cu(s)','n = 2')}
${Ms(R`Q=\frac{[\mathrm{Zn^{2+}}]}{[\mathrm{Cu^{2+}}]}=\frac{0{,}10}{1{,}0}=0{,}10`,R`E=1{,}10-\frac{0{,}0592}{2}\log0{,}10=1{,}10+0{,}03=1{,}13\ \text{V}`)}
${key('blue','Cómo interpretarlo','<p>Con <b>pocos productos</b> (Q &lt; 1) la pila empuja <b>más</b>: E aumenta. A medida que funciona, se acumula Zn²⁺, se consume Cu²⁺, Q crece y E baja. Cuando E llega a 0 la pila está <b>agotada</b>: la reacción alcanzó el equilibrio.</p>','bolt')}
`,'Ecuación de Nernst');

  add('corrosion','APLICACIONES','Corrosión y cómo se evita',`
<p>La <b>corrosión</b> es una reacción redox <b>espontánea</b> en la que un metal es atacado por sustancias de su ambiente (oxígeno, agua, sales) y se transforma en un compuesto no deseado. Es, literalmente, una <b>pila que nadie quería armar</b>.</p>
${fig(svgCorrosion,'Izquierda: una gota de agua sobre hierro funciona como una pila. Derecha: protección con ánodo de sacrificio.')}
${rxs(['2 Fe(s) + O2(g) + 2 H2O(l) -> 2 Fe(OH)2(s)','primera etapa'],['4 Fe(OH)2(s) + O2(g) + 2 H2O(l) -> 4 Fe(OH)3(s)','herrumbre: Fe₂O₃ · x H₂O'])}
<h4>Metales que se protegen solos: el aluminio</h4>
<p>Para casi todos los metales, oxidarse en el aire es termodinámicamente favorable. Por su potencial (E° Al³⁺/Al = −1,66 V), el aluminio debería corroerse muy rápido. Sin embargo dura años: se forma enseguida una <b>capa delgada de óxido hidratado (Al₂O₃)</b> que es <b>impermeable al O₂ y al agua</b> y protege al metal de abajo. A eso se lo llama <b>pasivación</b>. La herrumbre del hierro, en cambio, es porosa y se descascara, por eso el ataque sigue.</p>
<h4>Cómo se protege un metal</h4>
${grid3(box('blue','Recubrimientos','<p>Pintura, plástico, una capa de otro metal (estañado, cromado). Funcionan como barrera mientras no se rayen.</p>'),box('green','Ánodo de sacrificio','<p>Se une el metal a otro <b>más activo</b> (E° más negativo): ese se oxida en su lugar y el protegido queda como <b>cátodo</b>. Se usa Mg o Zn en caños, cascos de barcos y termotanques.</p>'),box('hot','Galvanizado','<p>Recubrir el hierro con <b>zinc</b>: es barrera y, si se raya, el Zn igual se sacrifica.</p>'))}
${key('yellow','Regla para elegir el ánodo de sacrificio','<p>Tiene que tener un <b>potencial de reducción menor</b> (más negativo) que el metal a proteger. Si se usa uno con potencial mayor, el que se oxida es el metal que se quería cuidar: la corrosión se acelera.</p>','target')}
`,'Corrosión y protección');

  add('electrolisis','ELECTRÓLISIS','Qué es la electrólisis',`
<p>La <b>electrólisis</b> es el proceso en el que el paso de corriente eléctrica a través de una solución o de un electrolito <b>fundido</b> produce una reacción química que <b>no era espontánea</b>. Una fuente de corriente continua «bombea» electrones: los saca de un electrodo y los mete en el otro.</p>
<div class="tpx-compare"><div class="g"><b>Pila (celda galvánica)</b><ul><li>Reacción espontánea, ΔE° &gt; 0</li><li>Química → electricidad</li><li><b>Ánodo (−)</b> · oxidación</li><li><b>Cátodo (+)</b> · reducción</li></ul></div><div class="e"><b>Electrólisis (celda electrolítica)</b><ul><li>Reacción no espontánea, ΔE° &lt; 0</li><li>Electricidad → química</li><li><b>Ánodo (+)</b> · oxidación</li><li><b>Cátodo (−)</b> · reducción</li></ul></div></div>
${key('yellow','Los signos se invierten, los procesos no','<p>En los dos tipos de celda el ánodo es donde ocurre la <b>oxidación</b> y el cátodo donde ocurre la <b>reducción</b>. Lo único que cambia es el <b>signo</b>: en la electrólisis el ánodo está conectado al polo positivo de la fuente, y por eso atrae a los <b>aniones</b>; el cátodo, negativo, atrae a los <b>cationes</b>.</p>','alert')}
<h4>Para qué se usa</h4>
<ul><li><b>Galvanoplastía (electrodeposición):</b> depositar una capa delgada de un metal sobre otro para mejorar su aspecto o su resistencia a la corrosión (cromado, niquelado, plateado). La pieza va en el cátodo.</li><li><b>Obtención de sustancias:</b> Cl₂, H₂, NaOH, sodio y aluminio metálicos.</li><li><b>Purificación de metales:</b> el cobre electrolítico de los cables.</li></ul>
`,'Qué es la electrólisis');

  add('agua','ELECTRÓLISIS','Electrólisis del agua',`
<p>El agua pura casi no conduce la corriente: se le agrega un poco de ácido (H₂SO₄) o una sal que no intervenga. Al pasar la corriente:</p>
${fig(svgAgua,'Los iones del ácido solo transportan la carga: el que se descompone es el agua.')}
${rxs(['2 H2O(l) -> O2(g) + 4 H^+(ac) + 4 e^-','ánodo (+): se forma oxígeno'],['4 H^+(ac) + 4 e^- -> 2 H2(g)','cátodo (−): se forma hidrógeno'],['2 H2O(l) -> 2 H2(g) + O2(g)','global'])}
${key('blue','Por qué hay el doble de hidrógeno','<p>Por la estequiometría: 2 mol de H₂ por cada 1 mol de O₂. Como los dos son gases en las mismas condiciones, el <b>volumen</b> de H₂ es el <b>doble</b> que el de O₂. Se ve claramente si se recogen los gases en tubos.</p>','check')}
`,'Electrólisis del agua');

  add('fundido','ELECTRÓLISIS','Electrólisis del NaCl fundido',`
<p>Se usa en la industria para obtener <b>cloro gaseoso</b> y <b>sodio metálico</b>. Al fundir el NaCl (≈ 801 °C) los iones Na⁺ y Cl⁻ quedan libres para moverse y no hay agua que compita.</p>
${fig(svgFundido,'El cloro se obtiene en el ánodo y el sodio en el cátodo.')}
${rxs(['2 Cl^- -> Cl2(g) + 2 e^-','ánodo (+): oxidación'],['2 Na^+ + 2 e^- -> 2 Na(l)','cátodo (−): reducción'],['2 NaCl(l) -> 2 Na(l) + Cl2(g)','global'])}
${Ms(R`\Delta E^\circ=E^\circ_{\text{cát}}-E^\circ_{\text{án}}=-2{,}71-1{,}36=-4{,}07\ \text{V}`)}
<p>Da negativo: la reacción no es espontánea y la fuente tiene que aplicar <b>al menos 4,07 V</b> (en la práctica, algo más).</p>
`,'NaCl fundido');

  add('acuoso','ELECTRÓLISIS','Electrólisis del NaCl en solución acuosa',`
<p>En solución, además de Na⁺ y Cl⁻ está el <b>agua</b>, que también puede oxidarse y reducirse. ¿Quién gana en cada electrodo? Se compara con los potenciales:</p>
${table(['Electrodo','Candidatos','E° de reducción','Gana'],[
 ['Cátodo (−): alguien se reduce','Na⁺ + e⁻ → Na<br>2 H₂O + 2 e⁻ → H₂ + 2 OH⁻','−2,71 V<br>−0,83 V','<b>el agua</b>: tiene E° mucho mayor, se reduce más fácil'],
 ['Ánodo (+): alguien se oxida','2 Cl⁻ → Cl₂ + 2 e⁻<br>2 H₂O → O₂ + 4 H⁺ + 4 e⁻','+1,36 V<br>+1,23 V','<b>el Cl⁻</b>, en soluciones concentradas (ver abajo)']])}
<p>En el cátodo la regla de la tabla funciona: se reduce la especie con el <b>mayor</b> E°, el agua. En el ánodo debería oxidarse la de <b>menor</b> E° (el agua), pero los potenciales están muy cerca y la formación de O₂ necesita un voltaje extra bastante grande, llamado <b>sobretensión</b>. Resultado: con NaCl concentrado en el ánodo se desprende <b>cloro</b>.</p>
${fig(svgAcuoso,'Electrólisis de salmuera: cloro en el ánodo, hidrógeno en el cátodo y la solución se vuelve básica.')}
${rxs(['2 Cl^-(ac) -> Cl2(g) + 2 e^-','ánodo (+)'],['2 H2O(l) + 2 e^- -> H2(g) + 2 OH^-(ac)','cátodo (−)'],['2 NaCl(ac) + 2 H2O(l) -> 2 NaOH(ac) + H2(g) + Cl2(g)','global'])}
${key('blue','La industria cloro-soda','<p>De una sola electrólisis salen tres productos valiosos: <b>cloro</b>, <b>hidrógeno</b> e <b>hidróxido de sodio</b> (soda cáustica). Si se agregan unas gotas de fenolftaleína, alrededor del cátodo la solución se pone <b>fucsia</b>: ahí se están formando los OH⁻.</p>','check')}
${key('yellow','Si la solución es muy diluida','<p>Con poco Cl⁻, en el ánodo empieza a oxidarse el agua y se desprende O₂ mezclado con Cl₂.</p>','alert')}
`,'NaCl acuoso');

  add('faraday','ELECTRÓLISIS','Aspectos cuantitativos: leyes de Faraday',`
<p>La cantidad de sustancia que se oxida o se reduce en cada electrodo es <b>directamente proporcional a la carga eléctrica</b> que pasa por la celda. Los electrones se cuentan igual que cualquier reactivo: en moles.</p>
${big('Carga que circula',R`q=I\cdot t`)}
<p><b>q</b> en coulomb (C), <b>I</b> en ampere (A), <b>t</b> en segundos (s).</p>
${big('Constante de Faraday: la carga de 1 mol de electrones',R`F=96500\ \tfrac{\text{C}}{\text{mol de }e^-}`)}
<h4>Primera ley</h4>
<p>La masa depositada o liberada en un electrodo es proporcional a la intensidad de corriente y al tiempo que dura la electrólisis:</p>
${big('1.ª ley de Faraday',R`m=E\cdot I\cdot t`)}
<p><b>E</b> es el <b>equivalente electroquímico</b>: la masa que deposita 1 coulomb.</p>
<h4>Segunda ley</h4>
<p>Para una misma carga, la masa depositada es directamente proporcional a la <b>masa molar</b> e inversamente proporcional al <b>número de electrones</b> que intercambia cada ion (<b>z</b>):</p>
${big('2.ª ley de Faraday',R`m=\frac{\mathcal{M}}{z\cdot F}\cdot q`)}
${key('blue','La misma cuenta, en tres pasos','<p>Casi todos los ejercicios se resuelven así, sin memorizar más:</p>'+Ms(R`q=I\cdot t`,R`n_{e^-}=\frac{q}{F}`,R`n_{\text{sustancia}}=\frac{n_{e^-}}{z}\quad\Rightarrow\quad m=n\cdot\mathcal{M}\ \ \text{o}\ \ V=\frac{nRT}{P}`),'target')}
<h4>Celdas en serie</h4>
<p>Si varias celdas están conectadas <b>en serie</b>, por todas pasa la <b>misma carga</b>: los moles de electrones son los mismos en cada una, aunque se depositen masas distintas.</p>
<h4>Ejemplo</h4>
<p>¿Qué masa de cobre se deposita con 2,0 A durante 30 min en una solución de Cu²⁺?</p>
${Ms(R`q=2{,}0\ \text{A}\cdot1800\ \text{s}=3600\ \text{C}`,R`n_{e^-}=\frac{3600}{96500}=0{,}0373\ \text{mol}`,R`n_{\mathrm{Cu}}=\frac{0{,}0373}{2}=0{,}0187\ \text{mol}\ \Rightarrow\ m=0{,}0187\cdot63{,}5=1{,}18\ \text{g}`)}
`,'Leyes de Faraday');

  add('metodo','PARA RESOLVER','Cómo encarar cada tipo de ejercicio',`
${grid2(box('green','Pilas','<ol><li>Buscar los dos E° en la tabla.</li><li>Cátodo = el de E° mayor; ánodo = el de E° menor.</li><li>Escribir las hemirreacciones (la del ánodo, invertida).</li><li>Igualar electrones y sumar.</li><li>ΔE° = E°cát − E°án (sin multiplicar).</li><li>Si piden si una reacción dada es espontánea: ver quién se reduce <b>en esa reacción</b>, ese es el cátodo.</li></ol>'),box('blue','Electrólisis','<ol><li>Pasar el tiempo a segundos.</li><li>q = I · t.</li><li>Moles de e⁻ = q / F.</li><li>Escribir la hemirreacción de cada electrodo para saber z.</li><li>Moles de sustancia = moles de e⁻ / z.</li><li>Masa (n · 𝓜) o volumen de gas (PV = nRT).</li></ol>'))}
${table(['Masas molares útiles (g/mol)',''],[['Zn 65,4 · Fe 55,85 · Cu 63,5 · Ag 107,9','Co 58,9 · Cr 52 · H₂ 2 · O₂ 32 · Cl₂ 71']])}
${table(['Gases',''],[['R = 0,082 atm·L/(mol·K)','CNPT: 0 °C y 1 atm → 1 mol de gas ocupa 22,4 L'],['T (K) = t (°C) + 273','1 atm = 760 mmHg = 1013 hPa']])}
`,'Método de resolución');

  // ---------- Guía de pilas ----------
  const pilas=[];
  const P=(o)=>pilas.push(o);

  P({n:1,title:'Pila de aluminio y cobre',
    plan:'Buscamos los dos potenciales en la tabla. El de mayor E° es el cátodo. Escribimos las hemirreacciones, igualamos electrones, sumamos y calculamos ΔE° restando, sin multiplicar los potenciales.',
    statement:'<p>1) ¿Cuál es la diferencia de potencial ∆E° de la pila en condiciones estándar de una pila compuesta por los pares Al<sup>3+</sup>/Al y Cu<sup>2+</sup>/Cu. Realice en diagrama de la pila, indicando cuál es el cátodo.</p>',
    steps:[
      ['1. Potenciales de la tabla',data([['E° Al³⁺/Al','−1,66 V'],['E° Cu²⁺/Cu','+0,337 V']])+p('El Cu²⁺/Cu tiene el E° mayor: el Cu²⁺ se reduce. Es el <b>cátodo</b>. El aluminio se oxida: es el <b>ánodo</b>.')],
      ['2. Hemirreacciones e igualación de electrones',rxs(['2 Al(s) -> 2 Al^3+(ac) + 6 e^-','ánodo (×2)'],['3 Cu^2+(ac) + 6 e^- -> 3 Cu(s)','cátodo (×3)'],['2 Al(s) + 3 Cu^2+(ac) -> 2 Al^3+(ac) + 3 Cu(s)','global'])],
      ['3. Diferencia de potencial',M(R`\Delta E^\circ=E^\circ_{\text{cát}}-E^\circ_{\text{án}}=0{,}337-(-1{,}66)=1{,}997\ \text{V}\approx2{,}00\ \text{V}`)+p('Los coeficientes 2 y 3 <b>no</b> multiplican a los potenciales.')],
      ['4. Diagrama de la pila',cell('Al(s) | Al^3+ (1 M) || Cu^2+ (1 M) | Cu(s)')+p('Ánodo (−) a la izquierda: aluminio. <b>Cátodo (+) a la derecha: cobre.</b> Los electrones van por el cable del Al al Cu.')]
    ],
    answer:'<p>ΔE° ≈ 2,00 V. Cátodo: Cu²⁺/Cu. Pila: Al / Al³⁺ (1 M) // Cu²⁺ (1 M) / Cu.</p>'});

  P({n:2,title:'¿Funcionan estas pilas tal como están escritas?',
    plan:'En la notación, el de la izquierda es el ánodo y el de la derecha el cátodo. Calculamos ΔE° = E°(derecha) − E°(izquierda): si da positivo, la pila funciona como está escrita.',
    statement:'<p>2) Calcule la diferencia de potencial de las siguientes pilas en condiciones estándar e indique si funciona tal como estás escritas.</p><ol type="i"><li>Cd(s)/Cd<sup>2+</sup>(1 M) // Ni<sup>2+</sup>(1 M)/Ni</li><li>Cr(s)/Cr<sup>3+</sup>(1 M) // Pb<sup>2+</sup>(1 M)/Pb</li></ol>',
    steps:[
      ['i. Cadmio y níquel',data([['Ánodo (izq.) Cd²⁺/Cd','−0,403 V'],['Cátodo (der.) Ni²⁺/Ni','−0,250 V']])+M(R`\Delta E^\circ=-0{,}250-(-0{,}403)=+0{,}153\ \text{V}`)+rx('Cd(s) + Ni^2+(ac) -> Cd^2+(ac) + Ni(s)')+p('Positivo: <b>funciona</b> tal como está escrita.')],
      ['ii. Cromo y plomo',data([['Ánodo (izq.) Cr³⁺/Cr','−0,74 V'],['Cátodo (der.) Pb²⁺/Pb','−0,126 V']])+M(R`\Delta E^\circ=-0{,}126-(-0{,}74)=+0{,}614\ \text{V}`)+rxs(['2 Cr(s) -> 2 Cr^3+ + 6 e^-','×2'],['3 Pb^2+ + 6 e^- -> 3 Pb(s)','×3'],['2 Cr(s) + 3 Pb^2+(ac) -> 2 Cr^3+(ac) + 3 Pb(s)','global'])+p('Positivo: <b>funciona</b>.')]
    ],
    answer:'<p>i. ΔE° = +0,153 V, funciona. ii. ΔE° = +0,614 V, funciona.</p>'});

  P({n:3,title:'¿Alguna de estas reacciones es espontánea?',
    plan:'En cada reacción identificamos quién gana electrones (ese es el cátodo) y quién los pierde (el ánodo). Calculamos ΔE° = E°cát − E°án y miramos el signo.',
    statement:'<p>3) Conociendo los potenciales de reducción estándar para las reacciones siguientes ¿Alguna de reacciones se producirá en forma espontánea?</p><ol type="a"><li>Mn<sup>2+</sup> + Cu → Mn + Cu<sup>2+</sup></li><li>Mn<sup>2+</sup> + Zn → Mn + Zn<sup>2+</sup></li><li>Zn<sup>2+</sup> + Cu → Zn + Cu<sup>2+</sup></li></ol>',
    steps:[
      ['Datos',data([['E° Mn²⁺/Mn','−1,18 V'],['E° Zn²⁺/Zn','−0,763 V'],['E° Cu²⁺/Cu','+0,337 V']])],
      ['a. Mn²⁺ + Cu → Mn + Cu²⁺',p('Se reduce el Mn²⁺ (cátodo) y se oxida el Cu (ánodo).')+M(R`\Delta E^\circ=-1{,}18-0{,}337=-1{,}52\ \text{V}`)+p('Negativo: <b>no espontánea</b>.')],
      ['b. Mn²⁺ + Zn → Mn + Zn²⁺',p('Se reduce el Mn²⁺ y se oxida el Zn.')+M(R`\Delta E^\circ=-1{,}18-(-0{,}763)=-0{,}42\ \text{V}`)+p('Negativo: <b>no espontánea</b>.')],
      ['c. Zn²⁺ + Cu → Zn + Cu²⁺',p('Se reduce el Zn²⁺ y se oxida el Cu.')+M(R`\Delta E^\circ=-0{,}763-0{,}337=-1{,}10\ \text{V}`)+p('Negativo: <b>no espontánea</b>.')],
      ['Conclusión',p('En las tres se pretende que el metal <b>menos activo</b> le quite electrones a uno <b>más activo</b>, y eso no ocurre solo. Las espontáneas son las <b>inversas</b>: por ejemplo, Zn + Cu²⁺ → Zn²⁺ + Cu, que es la pila de Daniell (+1,10 V).')]
    ],
    answer:'<p>Ninguna es espontánea (a: −1,52 V; b: −0,42 V; c: −1,10 V). Sí lo son las reacciones inversas.</p>'});

  P({n:4,title:'Pila de estaño y plata',
    plan:'Si el par Sn⁴⁺/Sn²⁺ es el ánodo, ahí ocurre la oxidación: el Sn²⁺ pasa a Sn⁴⁺. El cátodo siempre es el par de mayor potencial de reducción. Escribimos cada hemirreacción y la global.',
    statement:'<p>4) En una pila formada por los pares Sn<sup>4+</sup>/Sn<sup>2+</sup> y Ag<sup>+</sup>/Ag el primero de ellos actúa como ánodo y el segundo como cátodo. a) Indicar cuál de los dos pares tiene mayor potencial de reducción y b) Escribir las reacciones que se producen en el ánodo y el cátodo.</p>',
    steps:[
      ['a. Potenciales',data([['E° Sn⁴⁺/Sn²⁺','+0,15 V'],['E° Ag⁺/Ag','+0,80 V']])+p('El par <b>Ag⁺/Ag</b> tiene el mayor potencial de reducción; por eso es el cátodo. Coincide con lo que dice el enunciado.')],
      ['b. Hemirreacciones',rxs(['Sn^2+(ac) -> Sn^4+(ac) + 2 e^-','ánodo: oxidación'],['2 Ag^+(ac) + 2 e^- -> 2 Ag(s)','cátodo: reducción (×2)'],['Sn^2+(ac) + 2 Ag^+(ac) -> Sn^4+(ac) + 2 Ag(s)','global'])],
      ['Además: fem y notación',M(R`\Delta E^\circ=0{,}80-0{,}15=0{,}65\ \text{V}`)+cell('Pt(s) | Sn^2+ (1 M), Sn^4+ (1 M) || Ag^+ (1 M) | Ag(s)')+p('Las dos especies de estaño están disueltas: hace falta un electrodo inerte de platino.')]
    ],
    answer:'<p>a) Ag⁺/Ag. b) Ánodo: Sn²⁺ → Sn⁴⁺ + 2 e⁻; cátodo: Ag⁺ + e⁻ → Ag. (ΔE° = 0,65 V)</p>'});

  P({n:5,title:'El cloro oxida al cobre',
    plan:'Si la reacción es espontánea, el que se reduce es el cátodo y tiene el potencial mayor. Lo comprobamos con la tabla y escribimos las hemirreacciones.',
    statement:'<p>5) Sabiendo que el cloro oxida en forma espontánea al Cu a Cu (II) reduciéndose a cloruro, indicar qué par es el de mayor potencial de reducción. ¿Qué reacciones ocurren en el ánodo y en el cátodo?</p>',
    steps:[
      ['1. Quién es quién',p('El Cl₂ se reduce a Cl⁻ (gana electrones): es el <b>cátodo</b>. El Cu se oxida a Cu²⁺: es el <b>ánodo</b>. Como la reacción es espontánea, el par del cátodo, <b>Cl₂/Cl⁻</b>, tiene que tener el mayor potencial.')+data([['E° Cl₂/Cl⁻','+1,36 V'],['E° Cu²⁺/Cu','+0,337 V']])],
      ['2. Hemirreacciones',rxs(['Cu(s) -> Cu^2+(ac) + 2 e^-','ánodo'],['Cl2(g) + 2 e^- -> 2 Cl^-(ac)','cátodo (sobre Pt)'],['Cu(s) + Cl2(g) -> Cu^2+(ac) + 2 Cl^-(ac)','global'])],
      ['3. Comprobación',M(R`\Delta E^\circ=1{,}36-0{,}337=+1{,}02\ \text{V}>0`)]
    ],
    answer:'<p>Mayor potencial: Cl₂/Cl⁻ (1,36 V). Ánodo: Cu → Cu²⁺ + 2 e⁻. Cátodo: Cl₂ + 2 e⁻ → 2 Cl⁻.</p>'});

  P({n:6,title:'¿Cloro o iodo frente al Fe³⁺?',
    plan:'Reducir a otra especie es darle electrones. Primero vemos quién puede darlos: el Cl₂ y el I₂ solo pueden ganarlos. Después analizamos qué especies del cloro y del iodo sí pueden ceder electrones al Fe³⁺ y calculamos ΔE° en cada caso.',
    statement:'<p>6) Dados los siguientes potenciales estándar:</p><div class="tpx-givens">E° Cl<sub>2</sub>/Cl<sup>−</sup> = 1,36 volt, E° Fe<sup>3+</sup>/Fe<sup>2+</sup> = 0,77 volt, E° I<sub>2</sub>/I<sup>−</sup> = 0,54 volt</div><p>Indique si el cloro y/ó el iodo pueden reducir al Fe<sup>3+</sup></p>',
    steps:[
      ['1. Quién puede reducir',p('Para <b>reducir</b> al Fe³⁺ (llevarlo a Fe²⁺) hay que <b>cederle electrones</b>. El Cl₂ y el I₂ (elementos, número de oxidación 0) solo pueden <b>ganar</b> electrones y pasar a Cl⁻ e I⁻: son oxidantes. Por lo tanto, el Cl₂ y el I₂ <b>no pueden</b> reducir al Fe³⁺.')+p('Las especies que sí podrían ceder electrones son sus formas reducidas: los <b>iones cloruro e ioduro</b>. Veamos cada una.')],
      ['2. Ioduro frente a Fe³⁺',rx('2 Fe^3+ + 2 I^- -> 2 Fe^2+ + I2','el Fe³⁺ se reduce (cátodo)')+M(R`\Delta E^\circ=0{,}77-0{,}54=+0{,}23\ \text{V}`)+p('Positivo: el ioduro <b>sí</b> reduce al Fe³⁺.')],
      ['3. Cloruro frente a Fe³⁺',rx('2 Fe^3+ + 2 Cl^- -> 2 Fe^2+ + Cl2')+M(R`\Delta E^\circ=0{,}77-1{,}36=-0{,}59\ \text{V}`)+p('Negativo: el cloruro <b>no</b> reduce al Fe³⁺.')],
      ['4. Mirado al revés',p('El Cl₂ sí es capaz de <b>oxidar</b> al Fe²⁺ (1,36 − 0,77 = +0,59 V); el I₂ no (0,54 − 0,77 = −0,23 V). Es la misma información de la tabla leída desde el otro lado: el poder oxidante va Cl₂ &gt; Fe³⁺ &gt; I₂.')]
    ],
    answer:'<p>Ni el Cl₂ ni el I₂ pueden reducir al Fe³⁺ (solo pueden ganar electrones). De sus iones, el I⁻ sí lo reduce (ΔE° = +0,23 V) y el Cl⁻ no (−0,59 V).</p>'});

  P({n:7,title:'Armar pilas con cuatro electrodos',
    plan:'Con cuatro pares se pueden armar seis pilas. En cada una, el par de mayor potencial es el cátodo y el de menor, el ánodo. Calculamos ΔE° de todas y desarrollamos dos completas.',
    statement:'<p>7) Dados los potenciales normales de los siguientes electrodos, diagrame por lo menos dos pilas que puedan formarse indicando cual es el ánodo, el cátodo, las hemirreacciones que ocurren y la diferencia de potencial de cada una.</p><div class="tpx-givens">E° Co<sup>2+</sup>/Co = − 0,28 volt, E° Pb<sup>2+</sup>/Pb = − 0,126 volt, E° Ce<sup>3+</sup>/Ce = − 2,33 volt, E° Au<sup>3+</sup>/Au = 1,42 volt</div>',
    steps:[
      ['1. Ordenar de mayor a menor',p('Au³⁺/Au (+1,42) &gt; Pb²⁺/Pb (−0,126) &gt; Co²⁺/Co (−0,28) &gt; Ce³⁺/Ce (−2,33). El de más arriba es siempre el cátodo.')],
      ['2. Las seis pilas posibles',table(['Ánodo (−)','Cátodo (+)','ΔE° (V)'],[['Ce','Au','1,42 − (−2,33) = 3,75'],['Ce','Pb','−0,126 − (−2,33) = 2,20'],['Ce','Co','−0,28 − (−2,33) = 2,05'],['Co','Au','1,42 − (−0,28) = 1,70'],['Pb','Au','1,42 − (−0,126) = 1,55'],['Co','Pb','−0,126 − (−0,28) = 0,154']])],
      ['3. Pila Ce – Au (la de mayor voltaje)',cell('Ce(s) | Ce^3+ (1 M) || Au^3+ (1 M) | Au(s)')+rxs(['Ce(s) -> Ce^3+(ac) + 3 e^-','ánodo'],['Au^3+(ac) + 3 e^- -> Au(s)','cátodo'],['Ce(s) + Au^3+(ac) -> Ce^3+(ac) + Au(s)','global'])+M(R`\Delta E^\circ=1{,}42-(-2{,}33)=3{,}75\ \text{V}`)],
      ['4. Pila Co – Pb (la de menor voltaje)',cell('Co(s) | Co^2+ (1 M) || Pb^2+ (1 M) | Pb(s)')+rxs(['Co(s) -> Co^2+(ac) + 2 e^-','ánodo'],['Pb^2+(ac) + 2 e^- -> Pb(s)','cátodo'],['Co(s) + Pb^2+(ac) -> Co^2+(ac) + Pb(s)','global'])+M(R`\Delta E^\circ=-0{,}126-(-0{,}28)=0{,}154\ \text{V}`)]
    ],
    answer:'<p>Por ejemplo: Ce / Ce³⁺ // Au³⁺ / Au, ΔE° = 3,75 V; Co / Co²⁺ // Pb²⁺ / Pb, ΔE° = 0,154 V. Las otras: Ce–Pb 2,20 V; Ce–Co 2,05 V; Co–Au 1,70 V; Pb–Au 1,55 V.</p>'});

  P({n:8,title:'¿Son espontáneas? (Br₂, I₂, Fe²⁺, PbO₂)',
    plan:'En cada reacción buscamos quién se reduce (cátodo) y quién se oxida (ánodo), tomamos los E° de la tabla y calculamos ΔE°. En la d) primero balanceamos por ion-electrón en medio ácido.',
    statement:'<p>8) Indique si las siguientes reacciones son espontáneas (use la tabla de potenciales de reducción):</p><ol type="a"><li>Br<sub>2</sub> + 2Ag → 2AgBr</li><li>I<sub>2</sub> + 2Ag → 2 AgI</li><li>Fe<sup>2+</sup> + Ni<sup>2+</sup> → Fe<sup>3+</sup> + Ni</li><li>Pb<sup>+4</sup>O<sub>2</sub> + Mn<sup>2+</sup> (medio ácido) → Pb<sup>2+</sup> + MnO<sub>4</sub><sup>−</sup></li></ol>',
    steps:[
      ['a. Br₂ + 2 Ag → 2 AgBr',p('El Br₂ se reduce a Br⁻ (cátodo); la Ag se oxida a Ag⁺ (ánodo), que precipita con el bromuro.')+M(R`\Delta E^\circ=E^\circ_{\mathrm{Br_2/Br^-}}-E^\circ_{\mathrm{Ag^+/Ag}}=1{,}07-0{,}80=+0{,}27\ \text{V}`)+p('<b>Espontánea.</b>')],
      ['b. I₂ + 2 Ag → 2 AgI',p('Ahora se reduce el I₂ y se oxida la Ag.')+M(R`\Delta E^\circ=0{,}54-0{,}80=-0{,}26\ \text{V}`)+p('Con los pares de la tabla, <b>no espontánea</b>: el I₂ es un oxidante más débil que el Ag⁺.')+key('blue','Para profundizar','<p>El AgI es tan insoluble que, al precipitar, saca al Ag⁺ de la solución y corre el equilibrio. Usando el par AgI/Ag (E° = −0,15 V) el cálculo da 0,54 − (−0,15) = +0,69 V, y por eso la plata se oscurece en contacto con vapores de iodo. Con la tabla de pares iónicos simples, la respuesta es «no espontánea».</p>','book')],
      ['c. Fe²⁺ + Ni²⁺ → Fe³⁺ + Ni',rxs(['2 Fe^2+ -> 2 Fe^3+ + 2 e^-','ánodo (×2)'],['Ni^2+ + 2 e^- -> Ni','cátodo'],['2 Fe^2+ + Ni^2+ -> 2 Fe^3+ + Ni','balanceada'])+M(R`\Delta E^\circ=E^\circ_{\mathrm{Ni^{2+}/Ni}}-E^\circ_{\mathrm{Fe^{3+}/Fe^{2+}}}=-0{,}25-0{,}77=-1{,}02\ \text{V}`)+p('<b>No espontánea.</b> Ocurre la inversa: el Ni reduce al Fe³⁺.')],
      ['d. PbO₂ + Mn²⁺ en medio ácido',p('El +4 indica el número de oxidación del plomo: es el dióxido de plomo, PbO₂. El Pb pasa de +4 a +2 (se reduce) y el Mn de +2 a +7 (se oxida).')+rxs(['PbO2 + 4 H^+ + 2 e^- -> Pb^2+ + 2 H2O','reducción (×5)'],['Mn^2+ + 4 H2O -> MnO4^- + 8 H^+ + 5 e^-','oxidación (×2)'],['5 PbO2 + 2 Mn^2+ + 4 H^+ -> 5 Pb^2+ + 2 MnO4^- + 2 H2O','global (10 e⁻)'])+M(R`\Delta E^\circ=E^\circ_{\mathrm{PbO_2/Pb^{2+}}}-E^\circ_{\mathrm{MnO_4^-/Mn^{2+}}}=1{,}46-1{,}51=-0{,}05\ \text{V}`)+p('<b>No espontánea</b> en condiciones estándar, aunque por muy poco.')+key('blue','Un caso para la ecuación de Nernst','<p>Como ΔE° es apenas negativo, cambiando las condiciones (mucha acidez, calentamiento) la reacción ocurre. De hecho, en el laboratorio se usa PbO₂ con ácido nítrico concentrado y caliente para detectar manganeso: aparece el color violeta del MnO₄⁻.</p>','book')]
    ],
    answer:'<p>a) Sí (+0,27 V). b) No con los pares de la tabla (−0,26 V). c) No (−1,02 V). d) No en condiciones estándar (−0,05 V).</p>'});

  P({n:9,title:'Reacción espontánea entre dos pares',
    plan:'En cada caso el par de mayor E° se reduce (cátodo) y el de menor E° se oxida (ánodo). Escribimos las hemirreacciones, igualamos electrones (con H₂O y H⁺ cuando hay oxígeno) y calculamos ΔE°.',
    statement:'<p>9) Indique la reacción espontánea que se producirá en cada caso al mezclar los pares redox que se dan (use la tabla de potenciales de reducción); calcule el ∆E°pila (∆E°celda o fem) de los pares:</p><ol type="a"><li>Sn<sup>+4</sup>/Sn<sup>+2</sup> y Cd<sup>+2</sup>/Cd</li><li>Cu<sup>+2</sup>/Cu y H<sup>+</sup>/H<sub>2</sub></li><li>ClO<sub>4</sub><sup>−</sup>/ClO<sub>3</sub><sup>−</sup> y MnO<sub>4</sub><sup>−</sup>/Mn<sup>+2</sup></li><li>H<sub>2</sub>O<sub>2</sub>/H<sub>2</sub>O y Cl<sub>2</sub>/Cl<sup>−</sup></li></ol>',
    steps:[
      ['a. Sn⁴⁺/Sn²⁺ (+0,15) y Cd²⁺/Cd (−0,403)',rxs(['Sn^4+ + 2 e^- -> Sn^2+','cátodo'],['Cd -> Cd^2+ + 2 e^-','ánodo'],['Sn^4+ + Cd -> Sn^2+ + Cd^2+','espontánea'])+M(R`\Delta E^\circ=0{,}15-(-0{,}403)=0{,}55\ \text{V}`)],
      ['b. Cu²⁺/Cu (+0,337) y H⁺/H₂ (0,00)',rxs(['Cu^2+ + 2 e^- -> Cu','cátodo'],['H2 -> 2 H^+ + 2 e^-','ánodo'],['Cu^2+ + H2 -> Cu + 2 H^+','espontánea'])+M(R`\Delta E^\circ=0{,}337-0{,}00=0{,}337\ \text{V}`)+p('Por eso el cobre <b>no</b> se disuelve en HCl: la reacción inversa (Cu + 2 H⁺) no es espontánea.')],
      ['c. ClO₄⁻/ClO₃⁻ (+1,19) y MnO₄⁻/Mn²⁺ (+1,51)',p('El permanganato tiene mayor E°: se reduce. El clorato se oxida a perclorato.')+rxs(['2 MnO4^- + 16 H^+ + 10 e^- -> 2 Mn^2+ + 8 H2O','cátodo (×2)'],['5 ClO3^- + 5 H2O -> 5 ClO4^- + 10 H^+ + 10 e^-','ánodo (×5)'],['2 MnO4^- + 5 ClO3^- + 6 H^+ -> 2 Mn^2+ + 5 ClO4^- + 3 H2O','espontánea'])+M(R`\Delta E^\circ=1{,}51-1{,}19=0{,}32\ \text{V}`)],
      ['d. H₂O₂/H₂O (+1,78) y Cl₂/Cl⁻ (+1,36)',p('El agua oxigenada tiene mayor E°: se reduce. El cloruro se oxida a cloro.')+rxs(['H2O2 + 2 H^+ + 2 e^- -> 2 H2O','cátodo'],['2 Cl^- -> Cl2 + 2 e^-','ánodo'],['H2O2 + 2 H^+ + 2 Cl^- -> 2 H2O + Cl2','espontánea'])+M(R`\Delta E^\circ=1{,}78-1{,}36=0{,}42\ \text{V}`)]
    ],
    answer:'<p>a) Sn⁴⁺ + Cd → Sn²⁺ + Cd²⁺, 0,55 V. b) Cu²⁺ + H₂ → Cu + 2 H⁺, 0,337 V. c) 2 MnO₄⁻ + 5 ClO₃⁻ + 6 H⁺ → 2 Mn²⁺ + 5 ClO₄⁻ + 3 H₂O, 0,32 V. d) H₂O₂ + 2 H⁺ + 2 Cl⁻ → 2 H₂O + Cl₂, 0,42 V.</p>'});

  P({n:10,title:'Ánodos de sacrificio para Al, Cu y Fe',
    plan:'Un ánodo de sacrificio tiene que oxidarse antes que el metal protegido: necesita un E° más negativo. Elegimos uno para cada metal y escribimos la pila que se forma en aire húmedo, donde el que se reduce es el oxígeno.',
    statement:'<p>10) a) Elija metales que sirvan de ánodo de sacrificio para: a) Al (E° Al<sup>3+</sup>/Al = −1,67 V); b) Cu (E° Cu<sup>2+</sup>/Cu = + 0,337 V) y c) Fe (E° Fe<sup>2+</sup>/Fe = − 0,44 V), de la tabla de potenciales; b) Escriba las ecuaciones que ocurrirán en cada caso, c) Escriba las ecuaciones correspondientes, indicando cada caso el ánodo y el cátodo.</p>',
    steps:[
      ['1. Criterio',p('El metal de sacrificio debe tener <b>E° menor</b> que el protegido. Así, cuando los dos están en contacto, él es el <b>ánodo</b> (se oxida y se gasta) y el metal protegido queda como <b>cátodo</b>: sobre él solo se reduce el oxígeno del aire.')+rx('O2(g) + 2 H2O(l) + 4 e^- -> 4 OH^-(ac)','reducción en el cátodo, E° = +0,40 V')],
      ['a. Proteger aluminio (−1,67 V)',p('Sirve el <b>magnesio</b> (−2,37 V). Los metales alcalinos tienen E° aún menor, pero reaccionan violentamente con el agua: no sirven.')+rxs(['2 Mg -> 2 Mg^2+ + 4 e^-','ánodo: Mg'],['O2 + 2 H2O + 4 e^- -> 4 OH^-','cátodo: superficie de Al'],['2 Mg + O2 + 2 H2O -> 2 Mg(OH)2','global'])],
      ['b. Proteger cobre (+0,337 V)',p('Sirven muchos: <b>zinc</b> (−0,763 V), hierro (−0,44 V), níquel, estaño. El más usado es el zinc.')+rxs(['2 Zn -> 2 Zn^2+ + 4 e^-','ánodo: Zn'],['O2 + 2 H2O + 4 e^- -> 4 OH^-','cátodo: superficie de Cu'],['2 Zn + O2 + 2 H2O -> 2 Zn(OH)2','global'])],
      ['c. Proteger hierro (−0,44 V)',p('Sirven el <b>zinc</b> (−0,763 V) y el <b>magnesio</b> (−2,37 V).')+rxs(['2 Zn -> 2 Zn^2+ + 4 e^-','ánodo: Zn'],['O2 + 2 H2O + 4 e^- -> 4 OH^-','cátodo: superficie de Fe'],['2 Zn + O2 + 2 H2O -> 2 Zn(OH)2','global'])+M(R`\Delta E^\circ=0{,}40-(-0{,}763)=1{,}16\ \text{V}`)]
    ],
    answer:'<p>Al: Mg. Cu: Zn (o Fe, Ni, Sn). Fe: Zn o Mg. En todos los casos el metal de sacrificio es el ánodo (se oxida) y el metal protegido es el cátodo, donde se reduce el O₂: O₂ + 2 H₂O + 4 e⁻ → 4 OH⁻.</p>'});

  P({n:11,title:'¿Con qué metal se protege el hierro?',
    plan:'Comparamos el E° de cada metal con el del hierro (−0,44 V). Solo los que tienen E° más negativo se oxidan antes que el hierro. Escribimos la corrosión del hierro en aire y cómo cambia con el protector.',
    statement:'<p>11) Se busca proteger anódicamente al Fe, indique cuál/cuáles de los siguientes metales usaría con tal fin: Cu, Ni, Mg, Sn, Zn. Justifique con las ecuaciones correspondientes a la corrosión en aire.</p>',
    steps:[
      ['1. Comparar potenciales',table(['Metal','E° (V)','Frente al Fe (−0,44 V)','¿Sirve?'],[['Cu','+0,337','más noble','No'],['Ni','−0,250','más noble','No'],['Sn','−0,136','más noble','No'],['Zn','−0,763','más activo','<b>Sí</b>'],['Mg','−2,37','más activo','<b>Sí</b>']])+p('Se protege conectándolo a un metal que funcione como <b>ánodo</b>; el hierro pasa a ser el <b>cátodo</b> (por eso también se habla de protección catódica).')],
      ['2. Corrosión del hierro sin protección',rxs(['2 Fe -> 2 Fe^2+ + 4 e^-','ánodo'],['O2 + 2 H2O + 4 e^- -> 4 OH^-','cátodo'],['2 Fe + O2 + 2 H2O -> 2 Fe(OH)2','luego se oxida a Fe(OH)₃: herrumbre'])+M(R`\Delta E^\circ=0{,}40-(-0{,}44)=0{,}84\ \text{V}`)],
      ['3. Con Zn o Mg',rxs(['2 Zn + O2 + 2 H2O -> 2 Zn(OH)2','ΔE° = 0,40 − (−0,763) = 1,16 V'],['2 Mg + O2 + 2 H2O -> 2 Mg(OH)2','ΔE° = 0,40 − (−2,37) = 2,77 V'])+p('Estas pilas tienen mayor ΔE° que la del hierro: el Zn o el Mg se oxidan primero y le entregan electrones al hierro, que no se corroe mientras quede metal de sacrificio.')],
      ['4. ¿Y con Cu, Ni o Sn?',p('Si se conectan al hierro, el hierro es el ánodo de esa pila: <b>se corroe más rápido</b>. Por eso una lata de hojalata (hierro con estaño) se oxida enseguida donde se raya, y una chapa galvanizada (hierro con zinc), no.')]
    ],
    answer:'<p>Zn y Mg (E° menor que −0,44 V). Cu, Ni y Sn no sirven: harían que el hierro se corroa antes.</p>'});

  // ---------- Guía de electrólisis ----------
  const elec=[];
  const E=o=>elec.push(o);

  E({n:1,title:'Masa de cinc por mol de electrones',
    plan:'Calculamos la carga que circuló (q = I · t), la pasamos a moles de electrones dividiendo por F y vemos qué masa de cinc corresponde a un mol de electrones.',
    statement:'<p>1) Una corriente de 5 A que circula durante 30 minutos, deposita 3,048 g de cinc en el cátodo. Calcular la masa de cinc que se deposita por el pasaje de un mol de electrones o la carga equivalente de la constante de Faraday.</p>',
    steps:[
      ['1. Datos',data([['I','5 A'],['t','30 min = 1800 s'],['m de Zn','3,048 g'],['F','96500 C/mol e⁻']])],
      ['2. Carga y moles de electrones',Ms(R`q=I\cdot t=5\ \text{A}\cdot1800\ \text{s}=9000\ \text{C}`,R`n_{e^-}=\frac{9000\ \text{C}}{96500\ \text{C/mol}}=0{,}0933\ \text{mol}`)],
      ['3. Masa por mol de electrones',M(R`\frac{3{,}048\ \text{g}}{0{,}0933\ \text{mol }e^-}=32{,}68\ \tfrac{\text{g}}{\text{mol }e^-}`)+p('Es lo mismo que plantear la regla de tres «9000 C depositan 3,048 g; 96500 C depositan x».')],
      ['4. Comprobación',rx('Zn^2+ + 2 e^- -> Zn','cada mol de Zn necesita 2 mol de e⁻')+M(R`\frac{\mathcal{M}_{\mathrm{Zn}}}{2}=\frac{65{,}4}{2}=32{,}7\ \text{g}`)+p('Coincide: con un mol de electrones se deposita medio mol de cinc.')]
    ],
    answer:'<p>≈ 32,7 g de Zn por mol de electrones (32,68 g).</p>'});

  E({n:2,title:'Tres celdas en serie: Fe³⁺, Zn²⁺ y Cu⁺',
    plan:'En serie pasa la misma carga por las tres celdas: 1,5 mol de electrones en cada una. Para cada ion dividimos por su carga (z) para obtener los moles de metal y los pasamos a gramos.',
    statement:'<p>2) Se hacen pasar 1,5 moles de electrones (1,5 F, que corresponden a 1,5 veces la carga de la constante de Faraday ó 144750 C) a través de 3 celdas electrolíticas conectadas en serie. Una contiene ion hierro (III), la siguiente tiene ión Zn y la última cuproso Cu(I). ¿Cuántos gramos de metal se depositarán en cada celda? Considere que la única reacción catódica que se produce es la reducción de ion a metal.</p>',
    steps:[
      ['1. La misma carga en las tres',p('Por estar en serie, en cada celda circulan <b>1,5 mol de e⁻</b>.')],
      ['a. Hierro(III)',rx('Fe^3+ + 3 e^- -> Fe','z = 3')+Ms(R`n_{\mathrm{Fe}}=\frac{1{,}5}{3}=0{,}50\ \text{mol}`,R`m=0{,}50\cdot55{,}85=27{,}9\ \text{g}`)],
      ['b. Cinc',rx('Zn^2+ + 2 e^- -> Zn','z = 2')+Ms(R`n_{\mathrm{Zn}}=\frac{1{,}5}{2}=0{,}75\ \text{mol}`,R`m=0{,}75\cdot65{,}4=49{,}05\ \text{g}`)],
      ['c. Cobre(I)',rx('Cu^+ + e^- -> Cu','z = 1')+Ms(R`n_{\mathrm{Cu}}=1{,}5\ \text{mol}`,R`m=1{,}5\cdot63{,}5=95{,}25\ \text{g}`)],
      ['Conclusión',p('A igual carga, se deposita más masa cuanto <b>mayor</b> es la masa molar y <b>menor</b> la carga del ion: es la segunda ley de Faraday.')]
    ],
    answer:'<p>a) 27,9 g de Fe; b) 49,05 g de Zn; c) 95,25 g de Cu.</p>'});

  E({n:3,title:'Tiempo para depositar toda la plata',
    plan:'Calculamos los moles de Ag⁺ que hay en la solución. Como cada Ag⁺ toma un electrón, son los moles de electrones necesarios. Con F obtenemos la carga y con t = q / I, el tiempo.',
    statement:'<p>3) Calcule el tiempo que debe circular una corriente de 2,5 A para depositar toda la plata contenida en 1500 ml de una solución de AgNO<sub>3</sub> 1,3 M.</p>',
    steps:[
      ['1. Moles de plata',M(R`n_{\mathrm{Ag^+}}=1{,}3\ \tfrac{\text{mol}}{\text{L}}\cdot1{,}500\ \text{L}=1{,}95\ \text{mol}`)+rx('Ag^+ + e^- -> Ag','z = 1: 1,95 mol de e⁻')],
      ['2. Carga necesaria',M(R`q=1{,}95\ \text{mol}\cdot96500\ \tfrac{\text{C}}{\text{mol}}=188175\ \text{C}`)],
      ['3. Tiempo',Ms(R`t=\frac{q}{I}=\frac{188175\ \text{C}}{2{,}5\ \text{A}}=75270\ \text{s}`,R`75270\ \text{s}=20{,}91\ \text{h}=20\ \text{h}\ 54{,}5\ \text{min}`)]
    ],
    answer:'<p>≈ 75270 s ≈ 20 h 55 min.</p>'});

  E({n:4,title:'Dos celdas con la misma corriente: H₂ y Cu',
    plan:'Con el H₂ liberado calculamos los moles de electrones que circularon. La otra celda recibe la misma carga: con eso calculamos el cobre depositado en el cátodo y el oxígeno formado en el ánodo.',
    statement:'<p>4) Al efectuar la electrólisis de una solución de NaCl durante 5 hs se liberaron 1,30 g de H<sub>2</sub> (g). Por otra celda conteniendo una solución de Cu<sub>2</sub>SO<sub>4</sub> [sulfato (VI) de cobre (I)] circula la misma corriente durante el mismo tiempo. ¿Calcular cuántos gramos de cobre y de oxígeno se producen?</p>',
    steps:[
      ['1. Celda de NaCl: moles de electrones',rx('2 H2O + 2 e^- -> H2 + 2 OH^-','cátodo: 2 mol e⁻ por mol de H₂')+Ms(R`n_{\mathrm{H_2}}=\frac{1{,}30\ \text{g}}{2\ \text{g/mol}}=0{,}65\ \text{mol}`,R`n_{e^-}=2\cdot0{,}65=1{,}30\ \text{mol}`)],
      ['2. Celda de Cu₂SO₄: cobre en el cátodo',rx('Cu^+ + e^- -> Cu','z = 1')+Ms(R`n_{\mathrm{Cu}}=1{,}30\ \text{mol}`,R`m_{\mathrm{Cu}}=1{,}30\cdot63{,}5=82{,}55\ \text{g}`)],
      ['3. Oxígeno en el ánodo',p('El sulfato no se oxida; se oxida el agua.')+rx('2 H2O -> O2 + 4 H^+ + 4 e^-','4 mol e⁻ por mol de O₂')+Ms(R`n_{\mathrm{O_2}}=\frac{1{,}30}{4}=0{,}325\ \text{mol}`,R`m_{\mathrm{O_2}}=0{,}325\cdot32=10{,}40\ \text{g}`)],
      ['Además: la corriente',M(R`I=\frac{1{,}30\cdot96500\ \text{C}}{18000\ \text{s}}=6{,}97\ \text{A}`)]
    ],
    answer:'<p>82,55 g de Cu y 10,40 g de O₂.</p>'});

  E({n:5,title:'Masa de cobalto por mol de electrones',
    plan:'Igual que el ejercicio 1: carga, moles de electrones y masa por mol de electrones. Al final, comparando con la masa molar, deducimos la carga del ion cobalto.',
    statement:'<p>5) Una corriente de 2 A que circula durante 3 horas deposita 4,396 g de Co en el cátodo. Calcular cuántos gramos de Co se depositarán por cada mol de electrones que circulan (o sea cuando la carga es igual a la constante de Faraday).</p>',
    steps:[
      ['1. Carga y moles de electrones',Ms(R`q=2\ \text{A}\cdot10800\ \text{s}=21600\ \text{C}`,R`n_{e^-}=\frac{21600}{96500}=0{,}2238\ \text{mol}`)],
      ['2. Masa por mol de electrones',M(R`\frac{4{,}396\ \text{g}}{0{,}2238\ \text{mol }e^-}=19{,}64\ \tfrac{\text{g}}{\text{mol }e^-}`)],
      ['3. Qué ion de cobalto era',M(R`\frac{\mathcal{M}_{\mathrm{Co}}}{19{,}64}=\frac{58{,}93}{19{,}64}=3{,}0`)+p('Cada átomo de Co tomó 3 electrones: la sal era de <b>cobalto(III)</b>.')+rx('Co^3+ + 3 e^- -> Co')]
    ],
    answer:'<p>≈ 19,6 g de Co por mol de electrones (corresponde a Co³⁺).</p>'});

  E({n:6,title:'Volumen de H₂ con la misma corriente que depositó cromo',
    plan:'Con la masa de cromo calculamos los moles de electrones (el Cr³⁺ toma 3). La misma carga en agua acidulada libera H₂ (2 electrones por molécula). Con la ecuación de los gases obtenemos el volumen a 70 °C y 1200 hPa.',
    statement:'<p>6) Durante 2 hs se efectúa la electrólisis de una solución de sales de Cr (III) depositándose 1,1 g de Cr. ¿Qué volumen de H<sub>2</sub> (g) medido a 70 °C y 1200 HPa de presión, liberará esa corriente en el mismo tiempo, cuando circula por otra cuba que contiene agua acidulada?</p>',
    steps:[
      ['1. Moles de electrones con el cromo',rx('Cr^3+ + 3 e^- -> Cr','z = 3')+Ms(R`n_{\mathrm{Cr}}=\frac{1{,}1\ \text{g}}{52\ \text{g/mol}}=0{,}02115\ \text{mol}`,R`n_{e^-}=3\cdot0{,}02115=0{,}0635\ \text{mol}`)],
      ['2. Moles de H₂',rx('2 H^+ + 2 e^- -> H2','z = 2')+M(R`n_{\mathrm{H_2}}=\frac{0{,}0635}{2}=0{,}0317\ \text{mol}`)],
      ['3. Condiciones del gas',Ms(R`T=70+273=343\ \text{K}`,R`P=\frac{1200\ \text{hPa}}{1013\ \text{hPa/atm}}\approx1{,}18\ \text{atm}`)],
      ['4. Volumen',M(R`V=\frac{nRT}{P}=\frac{0{,}0317\cdot0{,}082\cdot343}{1{,}18}=0{,}76\ \text{L}`)]
    ],
    answer:'<p>≈ 0,76 L de H₂.</p>'});

  E({n:7,title:'Masa atómica del metal y volumen de cloro',
    plan:'Con la carga calculamos los moles de electrones; como el cloruro es MCl₂, el metal es M²⁺ y toma 2 electrones. Con los moles y la masa obtenemos la masa atómica. En el ánodo se forma Cl₂ (2 electrones por molécula) y su volumen sale de PV = nRT.',
    statement:'<p>7) Para obtener 3,08 g de un metal M por electrólisis, se pasa una corriente de 1,3 A a través de una solución de MCl<sub>2</sub> durante 2 horas. Calcular: a) La masa atómica relativa del metal, b) El volumen de cloro gaseoso producido medido a 40 °C y 800 mm de Hg de presión.</p>',
    steps:[
      ['1. Carga y moles de electrones',Ms(R`q=1{,}3\ \text{A}\cdot7200\ \text{s}=9360\ \text{C}`,R`n_{e^-}=\frac{9360}{96500}=0{,}0970\ \text{mol}`)],
      ['a. Masa atómica',rx('M^2+ + 2 e^- -> M','MCl₂ → el metal es M²⁺')+Ms(R`n_{\mathrm{M}}=\frac{0{,}0970}{2}=0{,}0485\ \text{mol}`,R`A_r=\frac{3{,}08\ \text{g}}{0{,}0485\ \text{mol}}=63{,}5`)+p('Es el <b>cobre</b>.')],
      ['b. Volumen de cloro',rx('2 Cl^- -> Cl2 + 2 e^-','ánodo')+Ms(R`n_{\mathrm{Cl_2}}=\frac{0{,}0970}{2}=0{,}0485\ \text{mol}`,R`T=313\ \text{K}\qquad P=\frac{800}{760}=1{,}053\ \text{atm}`,R`V=\frac{0{,}0485\cdot0{,}082\cdot313}{1{,}053}=1{,}18\ \text{L}`)]
    ],
    answer:'<p>a) A<sub>r</sub> = 63,5 (cobre). b) ≈ 1,18 L de Cl₂.</p>'});

  E({n:8,title:'Carga del catión y volumen de cloro',
    plan:'Comparamos los moles de electrones que circularon con los moles de metal depositados: el cociente es la carga del catión. Después calculamos el Cl₂ del ánodo con la misma carga.',
    statement:'<p>8) Al efectuar la electrólisis de una solución acuosa de un cloruro metálico durante 30 minutos con una intensidad de corriente de 2 A, se depositaron en el cátodo 0,97 gramos de metal: a) Calcule la carga del catión sabiendo que la Ar del elemento es 52 y b) ¿Qué volumen de Cl<sub>2</sub> (g) se obtuvo a 50 °C y 1,5 atm?</p>',
    steps:[
      ['1. Moles de electrones y de metal',Ms(R`q=2\ \text{A}\cdot1800\ \text{s}=3600\ \text{C}\ \Rightarrow\ n_{e^-}=\frac{3600}{96500}=0{,}0373\ \text{mol}`,R`n_{\text{metal}}=\frac{0{,}97\ \text{g}}{52\ \text{g/mol}}=0{,}01865\ \text{mol}`)],
      ['a. Carga del catión',M(R`z=\frac{n_{e^-}}{n_{\text{metal}}}=\frac{0{,}0373}{0{,}01865}=2{,}0`)+p('El catión es <b>+2</b> (con A<sub>r</sub> = 52, es el Cr²⁺).')],
      ['b. Volumen de cloro',rx('2 Cl^- -> Cl2 + 2 e^-')+Ms(R`n_{\mathrm{Cl_2}}=\frac{0{,}0373}{2}=0{,}01865\ \text{mol}`,R`V=\frac{0{,}01865\cdot0{,}082\cdot323}{1{,}5}=0{,}33\ \text{L}`)]
    ],
    answer:'<p>a) +2. b) ≈ 0,33 L de Cl₂.</p>'});

  E({n:9,title:'La carga de un electrón',
    plan:'Con el volumen de O₂ en CNPT obtenemos los moles de oxígeno y, con la hemirreacción del ánodo, los moles de electrones. Esa cantidad de electrones transportó una carga conocida; dividiéndola por el número de electrones obtenemos la carga de cada uno.',
    statement:'<p>9) Durante 3hs 40 minutos se efectúa la electrólisis de una solución de H<sub>2</sub>SO<sub>4</sub>. Si se producen 5,6 litros de O<sub>2</sub> (g) medidos en CNPT, calcular la carga de un electrón expresada en coulomb.</p>',
    steps:[
      ['1. Moles de O₂ y de electrones',M(R`n_{\mathrm{O_2}}=\frac{5{,}6\ \text{L}}{22{,}4\ \text{L/mol}}=0{,}25\ \text{mol}`)+rx('2 H2O -> O2 + 4 H^+ + 4 e^-','ánodo: 4 e⁻ por O₂')+M(R`n_{e^-}=4\cdot0{,}25=1{,}00\ \text{mol}`)],
      ['2. Carga que circuló',p('Circuló exactamente <b>1 mol de electrones</b>: su carga es la constante de Faraday.')+M(R`q=1{,}00\ \text{mol}\cdot96500\ \tfrac{\text{C}}{\text{mol}}=96500\ \text{C}`)+p('Con el tiempo se puede saber además la corriente que se usó:')+M(R`I=\frac{96500\ \text{C}}{13200\ \text{s}}=7{,}31\ \text{A}`)],
      ['3. Carga de un electrón',p('Un mol de electrones son 6,022 · 10²³ electrones (número de Avogadro):')+M(R`e=\frac{96500\ \text{C}}{6{,}022\cdot10^{23}}=1{,}60\cdot10^{-19}\ \text{C}`)]
    ],
    answer:'<p>e ≈ 1,6 · 10⁻¹⁹ C.</p>'});

  const errores=['ΔE° = E°cátodo − E°ánodo, con los potenciales de reducción tal cual figuran en la tabla.','Los potenciales no se multiplican por los coeficientes de la ecuación.','En la pila el ánodo es negativo; en la electrólisis es positivo. En las dos, ánodo = oxidación.','Si la reacción dada tiene ΔE° &lt; 0, la espontánea es la inversa.','Para elegir un ánodo de sacrificio: E° menor (más negativo) que el metal a proteger.','En electrólisis, el tiempo siempre en segundos y la carga en coulomb.','Los moles de sustancia salen de dividir los moles de electrones por los electrones de la hemirreacción.','Celdas en serie: la misma carga en todas.','Para gases: T en kelvin y P en atm con R = 0,082; en CNPT, 22,4 L/mol.','En NaCl acuoso el cátodo da H₂ (no Na) y el ánodo da Cl₂.'];

  const formulas=[
    ['Fem estándar',R`\Delta E^\circ=E^\circ_{\text{cát}}-E^\circ_{\text{án}}`],
    ['Espontaneidad',R`\Delta E^\circ>0\ \Leftrightarrow\ \Delta G^\circ<0`],
    ['Energía libre',R`\Delta G^\circ=-nF\Delta E^\circ`],
    ['Nernst',R`E=E^\circ-\frac{RT}{nF}\ln Q`],
    ['Nernst a 25 °C',R`E=E^\circ-\frac{0{,}0592}{n}\log Q`],
    ['Carga',R`q=I\cdot t`],
    ['Moles de electrones',R`n_{e^-}=\frac{q}{F}\qquad F=96500\ \text{C}`],
    ['1.ª ley de Faraday',R`m=E\cdot I\cdot t`],
    ['2.ª ley de Faraday',R`m=\frac{\mathcal{M}}{z\,F}\cdot q`],
    ['Gas producido',R`V=\frac{nRT}{P}`],
    ['Carga del electrón',R`e=\frac{F}{N_A}=1{,}60\cdot10^{-19}\ \text{C}`]
  ];

  window.ET27_PO_TP_ELECTRO={
    title:'Electroquímica: pilas, corrosión y electrólisis',
    lead:'Reacciones redox que producen corriente y corriente que produce reacciones: la pila de Daniell, los potenciales estándar, la ecuación de Nernst, la corrosión y cómo se evita, la electrólisis y las leyes de Faraday. Con las guías de pilas y de electrólisis resueltas paso a paso.',
    theory,pilas,elec,errores,formulas,sec,key,M,icon
  };
})();
