// 27xSOLved · Química Analítica Cualitativa 5.º — herramientas propias de la materia.
// Reutiliza el kit compartido (study-kit.js) y las ecuaciones químicas de Inorgánica (quimica-inorganica-4-kit.js).
// Agrega: cajas "Suponemos / Verificamos", diagramas de especiación calculados, el mapa de pasajes pH ⇄ [H⁺]
// y calculadoras (pH, ácido débil, buffer, Kps, ¿precipita?, Nernst).
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  // Formato con cifras significativas (las concentraciones chicas van en notación científica).
  const fmt=(x,d=3)=>{
    if(!Number.isFinite(x))return '—';
    const a=Math.abs(x);
    if(a!==0&&(a<1e-2||a>=1e5)){const [mant,exp]=x.toExponential(2).split('e');return `${mant.replace('.',',')}·10<sup>${Number(exp)}</sup>`}
    return Number(x.toFixed(Math.max(0,d))).toLocaleString('es-AR',{maximumFractionDigits:d,useGrouping:false});
  };

  // ---------- Cajas de razonamiento ----------
  // sup([['Qué suponemos','por qué lo podemos suponer'], ...])
  const sup=(items,title='Suponemos')=>`<div class="kitBox qacSup"><b>🧩 ${title}</b><ul>${items.map(([a,b])=>`<li><b>${a}</b>${b?`<span>${b}</span>`:''}</li>`).join('')}</ul></div>`;
  // ver(html, ok): ok=true la aproximación vale; ok=false hay que rehacer la cuenta sin aproximar.
  const ver=(html,ok=true)=>`<div class="kitBox qacVer ${ok?'ok':'bad'}"><b>${ok?'✔ Verificamos: la suposición vale':'✘ Verificamos: la suposición NO vale'}</b>${html}</div>`;
  // Receta numerada.
  const flow=list=>`<div class="qacFlow">${list.map(([t,d])=>`<div><b>${t}</b>${d||''}</div>`).join('')}</div>`;
  // Tarjetas para memorizar (strong / weak / neutro).
  const memo=list=>`<div class="qacMemo">${list.map(([tag,cls,html])=>`<div class="${cls||''}"><small>${tag}</small>${html}</div>`).join('')}</div>`;

  // ---------- Diagrama de especiación (calculado) ----------
  // spec([pKa1, pKa2...], ['H2A','HA⁻','A²⁻'], {band:[a,b], mark:[{pH,label}]})
  function fractions(pKas,pH){
    const h=Math.pow(10,-pH),n=pKas.length,Ka=pKas.map(p=>Math.pow(10,-p));
    const terms=[];let prod=1;
    for(let j=0;j<=n;j++){if(j>0)prod*=Ka[j-1];terms.push(Math.pow(h,n-j)*prod)}
    const D=terms.reduce((a,b)=>a+b,0);
    return terms.map(t=>t/D);
  }
  function spec(pKas,names,opt={}){
    const X=pH=>50+pH*(570/14),Y=a=>250-a*225;
    const pts=names.map(()=>[]);const best=names.map(()=>({a:-1,pH:0}));
    for(let i=0;i<=280;i++){const pH=i*0.05;const fr=fractions(pKas,pH);fr.forEach((a,j)=>{pts[j].push(`${X(pH).toFixed(1)},${Y(a).toFixed(1)}`);if(a>best[j].a+1e-9)best[j]={a,pH}})}
    const grid=[0,2,4,6,8,10,12,14].map(p=>`<line x1="${X(p)}" y1="25" x2="${X(p)}" y2="250" class="qacGrid"/><text x="${X(p)}" y="268" text-anchor="middle" class="qacTick">${p}</text>`).join('')+
      [0,0.5,1].map(a=>`<line x1="50" y1="${Y(a)}" x2="620" y2="${Y(a)}" class="qacGrid"/><text x="42" y="${Y(a)+4}" text-anchor="end" class="qacTick">${String(a).replace('.',',')}</text>`).join('');
    const band=opt.band?`<rect x="${X(opt.band[0])}" y="25" width="${X(opt.band[1])-X(opt.band[0])}" height="225" class="svgVolume" opacity=".45"/>`:'';
    const pk=pKas.map(p=>`<line x1="${X(p)}" y1="25" x2="${X(p)}" y2="250" class="qacPk"/><text x="${X(p)}" y="18" text-anchor="middle" class="qacTick">pKa = ${String(p).replace('.',',')}</text>`).join('');
    const curves=pts.map((p,j)=>`<polyline points="${p.join(' ')}" class="qacC${j%4}"/>`).join('');
    const labels=names.map((nm,j)=>{let x=X(best[j].pH);x=Math.min(Math.max(x,118),578);const anchor='middle';const y=Y(best[j].a)-10;return `<text x="${x}" y="${Math.max(y,40)}" text-anchor="${anchor}" class="svgText strong qacF${j%4}">${nm}</text>`}).join('');
    const marks=(opt.mark||[]).map(m=>`<line x1="${X(m.pH)}" y1="25" x2="${X(m.pH)}" y2="250" class="svgArrow"/><text x="${X(m.pH)+6}" y="${opt.markY||120}" class="svgText qiSmall">${m.label}</text>`).join('');
    return `<svg viewBox="0 0 640 290" role="img" aria-label="Diagrama de especiación: fracción de cada especie en función del pH">${band}${grid}<line x1="50" y1="250" x2="620" y2="250" class="qacAxis"/><line x1="50" y1="25" x2="50" y2="250" class="qacAxis"/>${pk}${curves}${labels}${marks}<text x="335" y="287" text-anchor="middle" class="qacTick">pH</text><text x="14" y="140" transform="rotate(-90 14 140)" text-anchor="middle" class="qacTick">fracción α</text></svg>`;
  }


  // ---------- Justificación corta (estilo parcial) ----------
  const jus=(html,title='Justificación')=>`<div class="kitBox qacJus"><b>📌 ${title}</b>${html}</div>`;
  // Descripción del sistema: lista de reacciones/expresiones con su rótulo.
  const desc=(html,title='Descripción del sistema')=>`<div class="kitBox qacDesc"><b>🧾 ${title}</b>${html}</div>`;
  // Respuesta impresa en la guía y comentario de cotejo.
  const rta=(txt,ok=true,nota='')=>`<p class="qacRta ${ok?'ok':'warn'}"><b>Rta. de la guía:</b> ${txt}${ok?' ✔ coincide':''}${nota?`<br><small>${nota}</small>`:''}</p>`;

  // ---------- Especiación en escala logarítmica: ninguna especie llega a 0 ----------
  function specLog(pKas,names,opt={}){
    const yMin=opt.yMin||-10,X=pH=>50+pH*(570/14),Y=l=>25+(0-l)*(225/(0-yMin));
    const pts=names.map(()=>[]);
    for(let i=0;i<=280;i++){const pH=i*0.05;fractions(pKas,pH).forEach((a,j)=>{const l=Math.max(Math.log10(a),yMin);pts[j].push(`${X(pH).toFixed(1)},${Y(l).toFixed(1)}`)})}
    const ys=[];for(let l=0;l>=yMin;l-=2)ys.push(l);
    const grid=[0,2,4,6,8,10,12,14].map(p=>`<line x1="${X(p)}" y1="25" x2="${X(p)}" y2="250" class="qacGrid"/><text x="${X(p)}" y="268" text-anchor="middle" class="qacTick">${p}</text>`).join('')+ys.map(l=>`<line x1="50" y1="${Y(l)}" x2="620" y2="${Y(l)}" class="qacGrid"/><text x="44" y="${Y(l)+4}" text-anchor="end" class="qacTick">${l===0?'1':'10'+(l<0?'⁻':'')+String(-l).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')}</text>`).join('');
    const pk=pKas.map(p=>`<line x1="${X(p)}" y1="25" x2="${X(p)}" y2="250" class="qacPk"/>`).join('');
    const lab=(opt.labels||[]).map(([nm,pH,l,j])=>`<text x="${X(pH)}" y="${Y(l)}" text-anchor="middle" class="svgText strong qacF${j%4}">${nm}</text>`).join('');
    return `<svg viewBox="0 0 640 290" role="img" aria-label="Diagrama de especiación en escala logarítmica: ninguna fracción llega a cero">${grid}<line x1="50" y1="250" x2="620" y2="250" class="qacAxis"/><line x1="50" y1="25" x2="50" y2="250" class="qacAxis"/>${pk}${pts.map((p,j)=>`<polyline points="${p.join(' ')}" class="qacC${j%4}"/>`).join('')}${lab}<text x="335" y="287" text-anchor="middle" class="qacTick">pH</text><text x="12" y="140" transform="rotate(-90 12 140)" text-anchor="middle" class="qacTick">α (escala log)</text></svg>`;
  }

  // ---------- Dibujos didácticos ----------
  const dot=(x,y,cls,t)=>`<circle cx="${x}" cy="${y}" r="11" class="${cls}"/><text x="${x}" y="${y+4}" text-anchor="middle" class="qacMol">${t}</text>`;
  const pair=(x,y)=>`<rect x="${x-16}" y="${y-11}" width="44" height="22" rx="11" class="qacHA"/><text x="${x+6}" y="${y+4}" text-anchor="middle" class="qacMol">HA</text>`;
  const draw={};
  draw.choques=`<svg viewBox="0 0 660 270" role="img" aria-label="Choques efectivos: en la solución concentrada los iones chocan más y se recombinan; en la diluida casi no se encuentran">
    <defs><marker id="qacArrC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="15" y="20" width="300" height="200" rx="16" class="svgLiquid strongLiquid"/>
    ${[[50,50],[110,48],[170,52],[230,46],[60,105],[200,110],[255,100],[80,165],[150,170],[250,175]].map(([x,y])=>pair(x,y)).join('')}
    ${dot(118,110,'qacHp','H⁺')}${dot(150,112,'qacAm','A⁻')}
    <path d="M130 136 q10 14 20 0" class="svgArrow" marker-end="url(#qacArrC)"/>
    <text x="165" y="245" text-anchor="middle" class="svgText strong">Concentrada: α chico</text>
    <text x="165" y="263" text-anchor="middle" class="svgText qiSmall">muchos choques: se rearma HA</text>
    <rect x="345" y="20" width="300" height="200" rx="16" class="svgLiquid"/>
    ${pair(395,60)}${pair(560,170)}
    ${dot(470,70,'qacHp','H⁺')}${dot(600,60,'qacAm','A⁻')}${dot(400,180,'qacAm','A⁻')}${dot(520,120,'qacHp','H⁺')}
    <text x="495" y="245" text-anchor="middle" class="svgText strong">Diluida: α grande</text>
    <text x="495" y="263" text-anchor="middle" class="svgText qiSmall">pocos choques: casi no se rearma</text>
  </svg>`;
  draw.buffer=`<svg viewBox="0 0 660 230" role="img" aria-label="Funcionamiento de un buffer: la base del par capta el H+ agregado y el ácido del par neutraliza el OH- agregado">
    <defs><marker id="qacArrB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="230" y="55" width="200" height="110" rx="18" class="qacBox"/>
    <text x="330" y="95" text-anchor="middle" class="qacBig">HA ⇌ A⁻</text><text x="330" y="122" text-anchor="middle" class="svgText qiSmall">las dos formas en cantidad apreciable</text><text x="330" y="145" text-anchor="middle" class="svgText strong">pH ≈ pKa ± 1</text>
    <rect x="12" y="20" width="170" height="70" rx="14" class="qacBoxAlt"/><text x="97" y="50" text-anchor="middle" class="svgText strong">agrego H⁺</text><text x="97" y="72" text-anchor="middle" class="svgText qiSmall">A⁻ + H⁺ → HA</text>
    <rect x="478" y="20" width="170" height="70" rx="14" class="qacBoxAlt"/><text x="563" y="50" text-anchor="middle" class="svgText strong">agrego OH⁻</text><text x="563" y="72" text-anchor="middle" class="svgText qiSmall">HA + OH⁻ → A⁻ + H₂O</text>
    <line x1="184" y1="62" x2="226" y2="90" class="svgArrow" marker-end="url(#qacArrB)"/><line x1="476" y1="62" x2="434" y2="90" class="svgArrow" marker-end="url(#qacArrB)"/>
    <text x="330" y="200" text-anchor="middle" class="svgText strong">Cambia un poco el cociente [A⁻]/[HA], no el pH</text>
    <text x="330" y="220" text-anchor="middle" class="svgText qiSmall">pH = pKa + log([A⁻]/[HA]): el log de un cociente cercano a 1 cambia muy poco</text>
  </svg>`;
  const beaker=(x,label,sub,solid,ppt)=>`<path d="M${x} 60 V170 H${x+120} V60" class="svgTube"/><rect x="${x+2}" y="90" width="116" height="78" class="svgLiquid"/>${solid?`<rect x="${x+20}" y="150" width="80" height="16" rx="5" class="qacSolid"/>`:''}${ppt?[...Array(9)].map((_,i)=>`<circle cx="${x+15+i*11}" cy="${105+((i*17)%45)}" r="4" class="qacSolid"/>`).join(''):''}<text x="${x+60}" y="195" text-anchor="middle" class="svgText strong">${label}</text><text x="${x+60}" y="214" text-anchor="middle" class="svgText qiSmall">${sub}</text>`;
  draw.qkps=`<svg viewBox="0 0 660 230" role="img" aria-label="Comparación del producto iónico Q con Kps: no saturada, saturada y sobresaturada">
    ${beaker(40,'Q < Kps','no saturada: se disuelve más',false,false)}${beaker(270,'Q = Kps','saturada: equilibrio con el sólido',true,false)}${beaker(500,'Q > Kps','precipita hasta Q = Kps',false,true)}
    <text x="330" y="30" text-anchor="middle" class="svgText strong">Q usa las concentraciones de AHORA · Kps, las del equilibrio</text>
  </svg>`;
  draw.complejo=`<svg viewBox="0 0 660 230" role="img" aria-label="Formación del complejo tetraamincobre(II): el Cu2+ acepta pares de electrones de cuatro moléculas de amoníaco">
    <defs><marker id="qacArrK" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <circle cx="330" cy="115" r="34" class="qacCu"/><text x="330" y="121" text-anchor="middle" class="qacBig" style="fill:#fff">Cu²⁺</text>
    ${[[230,50],[430,50],[230,180],[430,180]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="26" class="svgLineFill svgSoft"/><text x="${x}" y="${y+5}" text-anchor="middle" class="svgText strong">:NH₃</text><line x1="${x+(x<330?24:-24)}" y1="${y+(y<115?14:-14)}" x2="${330+(x<330?-30:30)}" y2="${115+(y<115?-16:16)}" class="svgArrow" marker-end="url(#qacArrK)"/>`).join('')}
    <text x="80" y="100" text-anchor="middle" class="svgText strong">Ligando</text><text x="80" y="120" text-anchor="middle" class="svgText qiSmall">base de Lewis:</text><text x="80" y="138" text-anchor="middle" class="svgText qiSmall">dona un par de e⁻</text>
    <text x="580" y="100" text-anchor="middle" class="svgText strong">Ion central</text><text x="580" y="120" text-anchor="middle" class="svgText qiSmall">ácido de Lewis:</text><text x="580" y="138" text-anchor="middle" class="svgText qiSmall">acepta pares</text>
    <text x="330" y="225" text-anchor="middle" class="svgText strong">[Cu(NH₃)₄]²⁺ · número de coordinación 4 · azul intenso</text>
  </svg>`;
  draw.fraccionada=`<svg viewBox="0 0 660 205" role="img" aria-label="Precipitación fraccionada: escala de concentración de plata a la que empieza a precipitar cada haluro">
    <defs><marker id="qacArrF" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <line x1="40" y1="110" x2="620" y2="110" class="svgArrow" marker-end="url(#qacArrF)"/><text x="330" y="158" text-anchor="middle" class="svgText qiSmall">[Ag⁺] en la solución (escala logarítmica)</text>
    ${[[-16,'10⁻¹⁶'],[-14,'10⁻¹⁴'],[-12,'10⁻¹²'],[-10,'10⁻¹⁰'],[-8,'10⁻⁸'],[-6,'10⁻⁶']].map(([l,t])=>{const x=60+(l+16)*50;return `<line x1="${x}" y1="104" x2="${x}" y2="116" class="svgTick"/><text x="${x}" y="134" text-anchor="middle" class="qacTick">${t}</text>`}).join('')}
    ${(()=>{const x1=60+(-14.08+16)*50,x2=60+(-7.74+16)*50;return `<rect x="${x1}" y="60" width="${x2-x1}" height="30" rx="8" class="svgVolume"/><text x="${(x1+x2)/2}" y="80" text-anchor="middle" class="svgText strong">precipita sólo AgI</text><line x1="${x1}" y1="50" x2="${x1}" y2="110" class="qacPk"/><text x="${x1}" y="44" text-anchor="middle" class="svgText qiSmall">empieza AgI</text><line x1="${x2}" y1="50" x2="${x2}" y2="110" class="qacPk"/><text x="${x2}" y="44" text-anchor="middle" class="svgText qiSmall">empieza AgCl</text>`})()}
    <text x="330" y="188" text-anchor="middle" class="svgText qiSmall">I⁻ y Cl⁻ 0,010 M: cuando aparece el AgCl, el I⁻ que queda es 4,6·10⁻⁹ M (separación completa)</text>
  </svg>`;

  // ---------- Mapa de pasajes [H⁺] ⇄ pH ⇄ pOH ⇄ [OH⁻] ----------
  const pasajes=`<svg viewBox="0 0 640 300" role="img" aria-label="Mapa de pasajes entre concentración de H+, pH, pOH y concentración de OH-">
    <defs><marker id="qacArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>
    <rect x="30" y="30" width="170" height="70" rx="14" class="qacBox"/><text x="115" y="73" text-anchor="middle" class="qacBig">[H⁺]</text>
    <rect x="440" y="30" width="170" height="70" rx="14" class="qacBox"/><text x="525" y="73" text-anchor="middle" class="qacBig">pH</text>
    <rect x="30" y="200" width="170" height="70" rx="14" class="qacBoxAlt"/><text x="115" y="243" text-anchor="middle" class="qacBig">[OH⁻]</text>
    <rect x="440" y="200" width="170" height="70" rx="14" class="qacBoxAlt"/><text x="525" y="243" text-anchor="middle" class="qacBig">pOH</text>
    <line x1="205" y1="52" x2="432" y2="52" class="svgArrow" marker-end="url(#qacArr)"/><text x="320" y="44" text-anchor="middle" class="qacLab">pH = −log [H⁺]</text>
    <line x1="435" y1="80" x2="208" y2="80" class="svgArrow" marker-end="url(#qacArr)"/><text x="320" y="100" text-anchor="middle" class="qacLab">[H⁺] = 10^(−pH)</text>
    <line x1="205" y1="222" x2="432" y2="222" class="svgArrow" marker-end="url(#qacArr)"/><text x="320" y="214" text-anchor="middle" class="qacLab alt">pOH = −log [OH⁻]</text>
    <line x1="435" y1="250" x2="208" y2="250" class="svgArrow" marker-end="url(#qacArr)"/><text x="320" y="270" text-anchor="middle" class="qacLab alt">[OH⁻] = 10^(−pOH)</text>
    <line x1="115" y1="104" x2="115" y2="194" class="svgArrow" marker-end="url(#qacArr)"/><line x1="135" y1="194" x2="135" y2="104" class="svgArrow" marker-end="url(#qacArr)"/>
    <text x="148" y="145" class="qacLab">[H⁺]·[OH⁻] = Kw</text><text x="148" y="163" class="svgText qiSmall">= 10⁻¹⁴ a 25 °C</text>
    <line x1="515" y1="104" x2="515" y2="194" class="svgArrow" marker-end="url(#qacArr)"/><line x1="535" y1="194" x2="535" y2="104" class="svgArrow" marker-end="url(#qacArr)"/>
    <text x="505" y="145" text-anchor="end" class="qacLab">pH + pOH = pKw</text><text x="505" y="163" text-anchor="end" class="svgText qiSmall">= 14 a 25 °C</text>
  </svg>`;

  // Escala de pH coloreada.
  const COLORS=['#d7263d','#e8492f','#f06a29','#f39b27','#f4c430','#d9d22f','#9fcb3a','#3fae49','#22a07d','#1c9aa3','#1f80c4','#2d5fbf','#4a47b3','#5d379f','#6a2a8a'];
  const scale=`<div class="qacScale" aria-hidden="true">${COLORS.map((c,i)=>`<span style="background:${c}">${i}</span>`).join('')}</div><div class="qacScaleLegend"><span>← más ácido · [H⁺] grande</span><b>7 neutro (25 °C)</b><span>más básico · [OH⁻] grande →</span></div>`;

  // ---------- Calculadoras ----------
  const num=(root,name)=>{const el=root.querySelector(`[name="${name}"]`);return el?Number(String(el.value).replace(',','.')):NaN};
  const sel=(root,name)=>root.querySelector(`[name="${name}"]`)?.value;
  const p=x=>-Math.log10(x);
  const C=K.calcs||{};
  C.qacPh=root=>{
    const t=sel(root,'t'),v=num(root,'v'),pKw=num(root,'pkw')||14;
    let pH;
    if(t==='pH')pH=v;else if(t==='pOH')pH=pKw-v;else if(t==='H')pH=p(v);else pH=pKw-p(v);
    const H=Math.pow(10,-pH),pOH=pKw-pH,OH=Math.pow(10,-pOH),neu=pKw/2;
    const tipo=Math.abs(pH-neu)<0.005?'neutra':pH<neu?'ácida':'básica';
    return `<b>pH = ${fmt(pH,2)}</b> · pOH = ${fmt(pOH,2)}<br>[H⁺] = ${fmt(H)} M · [OH⁻] = ${fmt(OH)} M<br><small>Con pKw = ${fmt(pKw,2)} el neutro es pH ${fmt(neu,2)}: la solución es <b>${tipo}</b>.</small>`;
  };
  C.qacWeak=root=>{
    const t=sel(root,'t'),Kx=num(root,'k'),c=num(root,'c');
    const ap=Math.sqrt(Kx*c),pct=ap/c*100,ex=(-Kx+Math.sqrt(Kx*Kx+4*Kx*c))/2;
    const toPH=x=>t==='a'?p(x):14-p(x);
    const ion=t==='a'?'[H⁺]':'[OH⁻]';
    const ok=pct<=5;
    return `Aproximado (x ≪ C): ${ion} = √(K·C) = ${fmt(ap)} M → <b>pH = ${fmt(toPH(ap),2)}</b><br>Verificación: x/C = ${fmt(pct,2)} % ${ok?'≤ 5 % ✔ la aproximación vale':'> 5 % ✘ hay que usar la cuadrática'}<br>Exacto (cuadrática): ${ion} = ${fmt(ex)} M → <b>pH = ${fmt(toPH(ex),2)}</b> · α = ${fmt(ex/c*100,2)} %<br><small>C/K = ${fmt(c/Kx,0)} ${c/Kx>=400?'(≥ 400: era esperable que la aproximación funcione)':'(< 400: era esperable que falle)'}</small>`;
  };
  C.qacBuffer=root=>{
    const pKa=num(root,'pka'),na=num(root,'na'),nb=num(root,'nb'),add=num(root,'add')||0;
    const pH0=pKa+Math.log10(nb/na);
    const na1=na+add,nb1=nb-add;
    let after;
    if(na1<=0||nb1<=0)after=`<b>Se agotó el buffer</b>: el agregado consumió todo el ${na1<=0?'ácido':'componente básico'}. Ya no vale Henderson; ahora manda el exceso de ácido o base fuerte.`;
    else{const pH1=pKa+Math.log10(nb1/na1);after=`Después del agregado: ácido ${fmt(na1,3)} mmol · base ${fmt(nb1,3)} mmol → <b>pH = ${fmt(pH1,2)}</b> (ΔpH = ${fmt(pH1-pH0,2)})`}
    return `Antes: <b>pH = ${fmt(pH0,2)}</b> (relación base/ácido = ${fmt(nb/na,3)})<br>${after}<br><small>Agregado positivo = ácido fuerte (mmol de H⁺); negativo = base fuerte (mmol de OH⁻). En Henderson podés usar moles en lugar de concentraciones porque el volumen se simplifica.</small>`;
  };
  C.qacKps=root=>{
    const a=num(root,'m'),b=num(root,'n'),Ks=num(root,'kps'),cc=num(root,'cc')||0;
    const s=Math.pow(Ks/(Math.pow(a,a)*Math.pow(b,b)),1/(a+b));
    let out=`En agua pura: Kps = ${fmt(Math.pow(a,a)*Math.pow(b,b),0)}·s^${a+b} → <b>s = ${fmt(s)} M</b>`;
    if(cc>0){const s2=Math.pow(Ks/(Math.pow(a,a)*Math.pow(cc,b)),1/a);const ok=b*s2<0.05*cc;out+=`<br>Con ${fmt(cc)} M de anión común: <b>s = ${fmt(s2)} M</b> (${fmt(s/s2,1)} veces menos)<br><small>Verificación: ${b}·s = ${fmt(b*s2)} frente a ${fmt(cc)} M → ${ok?'despreciable ✔':'NO es despreciable ✘ (resolver sin aproximar)'}</small>`}
    return out;
  };
  C.qacQ=root=>{
    const cm=num(root,'cm'),vm=num(root,'vm'),ca=num(root,'ca'),va=num(root,'va'),a=num(root,'m'),b=num(root,'n'),Ks=num(root,'kps');
    const V=vm+va,M=cm*vm/V,A=ca*va/V,Qv=Math.pow(M,a)*Math.pow(A,b);
    const r=Qv>Ks?'Q > Kps → <b>precipita</b>':Qv<Ks?'Q < Kps → <b>no precipita</b> (solución no saturada)':'Q = Kps → justo saturada';
    return `Después de mezclar (V total = ${fmt(V,1)} mL): [catión] = ${fmt(M)} M · [anión] = ${fmt(A)} M<br>Q = ${fmt(Qv)} frente a Kps = ${fmt(Ks)}<br>${r}`;
  };
  C.qacNernst=root=>{
    const E0=num(root,'e0'),n=num(root,'n'),Qv=num(root,'q'),t=num(root,'t');
    const T=t+273.15,f=2.303*8.314*T/96485;
    const E=E0-f/n*Math.log10(Qv);
    return `Factor 2,303·RT/F a ${fmt(t,1)} °C = <b>${fmt(f,4)} V</b> ${Math.abs(t-25)<0.01?'(el famoso 0,0592)':''}<br>E = E° − (${fmt(f,4)}/${n})·log Q = <b>${fmt(E,4)} V</b><br><small>Si E° es de la pila: log K = n·E°/${fmt(f,4)} = ${fmt(n*E0/f,2)} → K ≈ ${fmt(Math.pow(10,n*E0/f))}</small>`;
  };
  const opt=(name,list,label='Dato')=>`<label><span>${label}</span><select name="${name}">${list.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></label>`;


  // ---------- Ejercicios resueltos ----------
  // st(consigna, [incisos]) → HTML de la consigna.
  const st=(txt,parts)=>`<p>${txt}</p>${parts?`<ol type="a">${parts.map(p=>`<li>${p}</li>`).join('')}</ol>`:''}`;
  // addEx(unidad, {key,label,intro,group}, [ejercicios]) agrega la sección de ejercicios y sus tarjetas.
  function addEx(uid,sec,list){
    const u=(window.ET27_QAC5.units||[]).find(x=>x.id===uid);if(!u)return;
    u.exercises=(u.exercises||[]).concat(list.map(e=>({...e,group:sec.group})));
    if(!u.sections.some(x=>x.key===`qac-ej-${sec.group}`))u.sections.push({key:`qac-ej-${sec.group}`,label:sec.label,kicker:sec.kicker||'EJERCICIOS RESUELTOS',exercises:true,html:`${sec.intro||''}<div data-qac-guide="${sec.group}"></div>`});
  }

  window.ET27QAC={sup,ver,flow,memo,spec,specLog,fractions,pasajes,scale,opt,jus,desc,rta,draw,st,addEx};
  window.ET27_QAC5=window.ET27_QAC5||{subjectName:'Química Analítica Cualitativa',year:5,units:[]};
})();
