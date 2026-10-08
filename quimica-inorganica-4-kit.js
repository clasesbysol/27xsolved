// 27xSOLved · Química Inorgánica de 4.º — herramientas propias de la materia.
// Ecuaciones químicas en HTML (sin depender de KaTeX), tarjetas de ensayo de laboratorio,
// cambios de color y esquemas SVG. Usa las clases del kit compartido (study-topics.css).
(function(){
  'use strict';
  const K=window.ET27Kit;if(!K)return;
  const esc=K.esc;
  const IMG='./assets/quimica-inorganica/';

  // ---------- Fórmulas y ecuaciones ----------
  // Fórmula: "SO4^2-", "[Cu(NH3)4]^2+", "CuSO4·5H2O", "e^-".
  const formula=t=>{
    let charge='';
    const c=String(t).match(/^(.*)\^([0-9]*[+\-−])$/);
    if(c){t=c[1];charge=c[2].replace('-','−')}
    return esc(t).replace(/([A-Za-z\)\]])(\d+)/g,'$1<sub>$2</sub>')+(charge?`<sup>${charge}</sup>`:'');
  };
  const STATE=/^(s|l|g|ac|am|c|d|v|conc\.?|dil\.?|\d+(?:,\d+)?\s*%)$/;
  // Especie con coeficiente, estado y ↓/↑ opcionales: "2 Fe(OH)3(s)↓".
  const species=raw=>{
    let s=String(raw).trim(),mark='',coef='',state='';
    if(/[↓↑]$/.test(s)){mark=s.slice(-1);s=s.slice(0,-1).trim()}
    const c=s.match(/^(\d+|½|\d+\/\d+)\s+(.+)$/);if(c){coef=c[1];s=c[2]}
    const st=s.match(/^(.*\S)\s*\(([^()]*)\)$/);
    if(st&&STATE.test(st[2].trim())){s=st[1];state=st[2].trim()}
    return `${coef?`<span class="rxCoef">${coef}</span>`:''}<span class="rxSp">${formula(s)}${state?`<span class="rxState">(${esc(state)})</span>`:''}${mark?`<span class="rxMark">${mark}</span>`:''}</span>`;
  };
  const side=t=>t.trim()?t.split(/\s\+\s/).map(species).join('<span class="rxPlus">+</span>'):'<span class="rxBlank">…</span>';
  const arrow=tok=>{
    const lab=tok.match(/\[([^\]]*)\]/);const label=lab?`<small>${esc(lab[1]).replace(/([A-Za-z\)])(\d+)/g,'$1<sub>$2</sub>')}</small>`:'';
    const sym=tok.startsWith('<=')?'⇌':'→';
    return `<span class="rxArrow">${label}<i>${sym}</i></span>`;
  };
  // Ecuación completa: "Zn(s) + 2 HCl(ac) -> ZnCl2(ac) + H2(g)". Flechas: ->, <=>, =[Δ]=>, <=[cat]=>.
  const eq=t=>{
    const parts=String(t).split(/\s*(<=>|->|<?=\[[^\]]*\]=>)\s*/);
    let out='';
    parts.forEach((p,i)=>{out+=i%2?arrow(p==='<=>'?'<=':p):side(p)});
    return `<span class="rxEq">${out}</span>`;
  };
  const rx=(t,note)=>`<div class="rxRow">${eq(t)}${note?`<small class="rxNote">${note}</small>`:''}</div>`;
  // Bloque de ecuaciones: cada item es "ecuación" o ["ecuación","comentario"].
  const rxs=(...items)=>`<div class="rxBlock">${items.map(x=>Array.isArray(x)?rx(x[0],x[1]):rx(x)).join('')}</div>`;
  // Fórmula dentro del texto.
  const f=t=>`<span class="rxInline">${species(t)}</span>`;

  // ---------- Laboratorio ----------
  const swatch=(color,label)=>`<span class="qiSwatch"><i style="background:${color}"></i>${label}</span>`;
  // Cambio de color: vira('fucsia','#d63384','incoloro','transparent').
  const vira=(a,ca,b,cb)=>`<span class="qiChange">${swatch(ca,a)}<b>→</b>${swatch(cb,b)}</span>`;
  const ensayo=o=>`<article class="qiTest"${o.id?` id="${o.id}"`:''}>
    <header><span>${o.tag||'ENSAYO'}${o.n?` ${o.n}`:''}</span><h3>${o.title}</h3></header>
    <div class="qiTestGrid">
      <div class="qiDo"><b>🧪 Qué hacemos</b>${o.hacemos}</div>
      <div class="qiSee"><b>👀 Qué observamos</b>${o.vemos}</div>
    </div>
    <div class="qiWhy"><b>⚗️ Qué está pasando</b>${o.pasa}</div>
    ${o.demuestra?`<div class="qiProp"><b>✔ Qué demuestra</b><span>${o.demuestra}</span></div>`:''}
    ${o.extra||''}
  </article>`;
  // Imágenes del material original.
  const pic=(src,alt,caption,cls='')=>`<figure class="kitFigure qiPhoto ${cls}"><img src="${IMG}${src}" alt="${esc(alt)}" loading="lazy">${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
  const pics=(list,caption)=>`<figure class="kitFigure qiGallery"><div>${list.map(([src,alt,label])=>`<div><img src="${IMG}${src}" alt="${esc(alt)}" loading="lazy">${label?`<b>${label}</b>`:''}</div>`).join('')}</div>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
  // Tarjeta "en una línea": idea fuerza para decir en clase.
  const punch=(html)=>`<p class="qiPunch">${html}</p>`;
  // Fila de "fichas" (propiedades rápidas).
  const facts=list=>`<div class="qiFacts">${list.map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join('')}</div>`;

  // ---------- Esquemas SVG ----------
  const defs=id=>`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" class="svgAccentFill"/></marker></defs>`;
  const box=(x,y,w,h,lines,cls='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="svgLineFill svgSoft ${cls}"/>${lines.map((l,i)=>`<text x="${x+w/2}" y="${y+h/2+(i-(lines.length-1)/2)*17+5}" text-anchor="middle" class="svgText ${i===0?'strong':'qiSmall'}">${l}</text>`).join('')}`;
  const svg={};

  svg.gases=`<svg viewBox="0 0 660 285" role="img" aria-label="Tres formas de recoger un gas: desplazando agua, en un tubo boca abajo para gases livianos y en un tubo boca arriba para gases densos">
    ${defs('qiArrG')}
    <!-- 1 · desplazamiento de agua -->
    <path d="M20 150 V230 H200 V150" class="svgTube"/>
    <rect x="22" y="162" width="176" height="66" class="svgLiquid"/>
    <path d="M115 205 V57 a17 17 0 0 1 34 0 V205" class="svgTube"/>
    <rect x="117" y="122" width="30" height="83" class="svgLiquid"/>
    <rect x="117" y="44" width="30" height="78" class="qiGas"/>
    <path d="M0 100 H62 V218 H132 V196" class="svgTube"/>
    ${[[133,180],[129,160],[136,140]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" class="svgMolecule"/>`).join('')}
    <text x="110" y="255" text-anchor="middle" class="svgText strong">Desplazamiento de agua</text>
    <text x="110" y="274" text-anchor="middle" class="svgText qiSmall">H₂ y O₂: casi insolubles</text>
    <!-- 2 · tubo boca abajo -->
    <path d="M308 175 V57 a17 17 0 0 1 34 0 V175" class="svgTube"/>
    <rect x="310" y="44" width="30" height="80" class="qiGas"/>
    <path d="M240 228 H325 V100" class="svgTube"/>
    <line x1="360" y1="120" x2="360" y2="185" class="svgArrow" marker-end="url(#qiArrG)"/>
    <text x="368" y="160" class="svgText qiSmall">sale el aire</text>
    <text x="330" y="255" text-anchor="middle" class="svgText strong">Tubo boca abajo</text>
    <text x="330" y="274" text-anchor="middle" class="svgText qiSmall">NH₃ y H₂: más livianos que el aire</text>
    <!-- 3 · tubo boca arriba -->
    <path d="M528 60 V193 a17 17 0 0 0 34 0 V60" class="svgTube"/>
    <rect x="530" y="140" width="30" height="62" class="qiGas"/>
    <path d="M455 30 H545 V190" class="svgTube"/>
    <line x1="590" y1="140" x2="590" y2="75" class="svgArrow" marker-end="url(#qiArrG)"/>
    <text x="598" y="112" class="svgText qiSmall">sale</text><text x="598" y="128" class="svgText qiSmall">el aire</text>
    <text x="545" y="255" text-anchor="middle" class="svgText strong">Tubo boca arriba</text>
    <text x="545" y="274" text-anchor="middle" class="svgText qiSmall">CO₂: más denso que el aire</text>
  </svg>`;

  svg.nitrogeno=`<svg viewBox="0 0 660 330" role="img" aria-label="Escalera de estados de oxidación del nitrógeno, de −3 a +5, y producto de reducción del ácido nítrico según su concentración">
    ${defs('qiArrN')}
    <line x1="120" y1="20" x2="120" y2="300" class="svgLine thickLine"/>
    ${[[5,'HNO₃ · NO₃⁻','ácido nítrico, nitratos'],[4,'NO₂','gas pardo rojizo'],[3,'HNO₂ · NO₂⁻','ácido nitroso, nitritos'],[2,'NO','gas incoloro'],[1,'N₂O','gas hilarante'],[0,'N₂','nitrógeno del aire'],[-1,'NH₂OH','hidroxilamina'],[-2,'N₂H₄','hidracina'],[-3,'NH₃ · NH₄⁺','amoníaco, amonio']].map(([o,sp,d])=>{const y=20+(5-o)*35;return `<circle cx="120" cy="${y}" r="6" class="svgAccentFill"/><text x="100" y="${y+5}" text-anchor="end" class="svgText strong">${o>0?'+'+o:o<0?'−'+(-o):'0'}</text><text x="138" y="${y+5}" class="svgText strong">${sp}</text><text x="245" y="${y+5}" class="svgText qiSmall">${d}</text>`}).join('')}
    ${[[4,'HNO₃ concentrado (≈ 60 %)'],[2,'≈ 30 %'],[1,'≈ 20 %'],[0,'≈ 10 %'],[-3,'muy diluido (≈ 3 %)']].map(([o,t])=>{const y=20+(5-o)*35;return `<line x1="560" y1="${y}" x2="395" y2="${y}" class="svgCurve" marker-end="url(#qiArrN)"/><text x="650" y="${y-6}" text-anchor="end" class="svgText qiSmall">${t}</text>`}).join('')}
    <line x1="40" y1="40" x2="40" y2="290" class="svgArrow" marker-end="url(#qiArrN)"/>
    <text x="30" y="170" transform="rotate(-90 30 170)" text-anchor="middle" class="svgText qiSmall">más reducido</text>
  </svg>`;

  svg.amoniaco=`<svg viewBox="0 0 660 240" role="img" aria-label="Qué le pasa a un catión metálico al agregar amoníaco gota a gota, en exceso y luego ácido clorhídrico">
    ${defs('qiArrA')}
    ${box(8,90,118,62,['Mⁿ⁺ (ac)','sal del metal'])}
    <line x1="128" y1="121" x2="168" y2="121" class="svgArrow" marker-end="url(#qiArrA)"/>
    <text x="148" y="108" text-anchor="middle" class="svgText qiSmall">1 gota</text><text x="148" y="142" text-anchor="middle" class="svgText qiSmall">NH₃</text>
    ${box(172,90,130,62,['M(OH)ₙ ↓','hidróxido insoluble'])}
    <path d="M304 110 L366 58" class="svgArrow" marker-end="url(#qiArrA)"/>
    <path d="M304 132 L366 184" class="svgArrow" marker-end="url(#qiArrA)"/>
    <text x="340" y="126" text-anchor="middle" class="svgText qiSmall">exceso</text>
    ${box(370,18,154,80,['Se disuelve','complejo amoniacal','Cu²⁺ · Ni²⁺ · Ag⁺ · Zn²⁺'])}
    ${box(370,142,154,80,['Sin cambios','no forma complejo','Fe³⁺ · Al³⁺ · Mn²⁺'],'qiMuted')}
    <line x1="526" y1="58" x2="552" y2="58" class="svgArrow" marker-end="url(#qiArrA)"/>
    ${box(556,18,98,80,['+ HCl','NH₃ → NH₄⁺','se rompe'])}
  </svg>`;

  svg.anfotero=`<svg viewBox="0 0 660 170" role="img" aria-label="Un hidróxido anfótero se disuelve tanto en ácidos como en bases">
    ${defs('qiArrF')}
    ${box(6,50,176,70,['Mⁿ⁺ (ac)','sal soluble: AlCl₃, SnCl₂'])}
    ${box(232,50,196,70,['M(OH)ₙ ↓','Al(OH)₃ · Sn(OH)₂ · Pb(OH)₂'])}
    ${box(478,50,176,70,['[M(OH)₄]ⁿ⁻ (ac)','hidroxocomplejo: “-ato”'])}
    <line x1="230" y1="85" x2="186" y2="85" class="svgArrow" marker-end="url(#qiArrF)"/>
    <line x1="430" y1="85" x2="474" y2="85" class="svgArrow" marker-end="url(#qiArrF)"/>
    <text x="207" y="40" text-anchor="middle" class="svgText strong">+ ácido</text><text x="207" y="145" text-anchor="middle" class="svgText qiSmall">actúa como base</text>
    <text x="453" y="40" text-anchor="middle" class="svgText strong">+ base</text><text x="453" y="145" text-anchor="middle" class="svgText qiSmall">actúa como ácido</text>
  </svg>`;

  svg.carbonatos=`<svg viewBox="0 0 660 230" role="img" aria-label="Separación de carbonato y bicarbonato con cloruro de bario y amoníaco">
    ${defs('qiArrC')}
    ${box(8,82,130,66,['CO₃²⁻ + HCO₃⁻','mezcla en solución'])}
    <line x1="140" y1="115" x2="182" y2="115" class="svgArrow" marker-end="url(#qiArrC)"/>
    <text x="161" y="102" text-anchor="middle" class="svgText qiSmall">BaCl₂</text><text x="161" y="136" text-anchor="middle" class="svgText qiSmall">filtrar</text>
    <path d="M186 115 L222 56" class="svgArrow" marker-end="url(#qiArrC)"/>
    <path d="M186 115 L222 174" class="svgArrow" marker-end="url(#qiArrC)"/>
    ${box(226,18,200,74,['Sobre el papel: BaCO₃ ↓','precipitado blanco','(era el carbonato)'])}
    ${box(226,138,170,74,['Filtrado: HCO₃⁻','Ba(HCO₃)₂ es soluble'],'qiMuted')}
    <line x1="398" y1="175" x2="440" y2="175" class="svgArrow" marker-end="url(#qiArrC)"/>
    <text x="419" y="162" text-anchor="middle" class="svgText qiSmall">NH₃</text>
    ${box(444,138,208,74,['HCO₃⁻ → CO₃²⁻','y con Ba²⁺: BaCO₃ ↓','(era el bicarbonato)'])}
  </svg>`;

  const flame=(x,color)=>`<path d="M${x} 28 C ${x-8} 62, ${x-44} 92, ${x-32} 132 C ${x-24} 158, ${x+24} 158, ${x+32} 132 C ${x+44} 92, ${x+8} 62, ${x} 28 Z" fill="${color}"/><path d="M${x} 82 C ${x-6} 100, ${x-18} 116, ${x-12} 136 C ${x-8} 150, ${x+8} 150, ${x+12} 136 C ${x+18} 116, ${x+6} 100, ${x} 82 Z" fill="#ffffff" opacity=".42"/><rect x="${x-11}" y="158" width="22" height="22" rx="3" class="svgLineFill svgSoft"/>`;
  svg.llamas=`<svg viewBox="0 0 660 230" role="img" aria-label="Colores a la llama: litio carmín, sodio amarillo, potasio lila y estroncio rojo">
    ${[[90,'#c8173a','Li⁺','rojo carmín'],[250,'#f4b400','Na⁺','amarillo intenso'],[410,'#a77bd6','K⁺','violeta / lila'],[570,'#e0402a','Sr²⁺','rojo']].map(([x,c,ion,t])=>`${flame(x,c)}<text x="${x}" y="202" text-anchor="middle" class="svgText strong">${ion}</text><text x="${x}" y="222" text-anchor="middle" class="svgText qiSmall">${t}</text>`).join('')}
  </svg>`;

  svg.parInerte=`<svg viewBox="0 0 660 190" role="img" aria-label="Efecto del par inerte en el plomo: los electrones 6s quedan retenidos">
    ${defs('qiArrP')}
    <text x="20" y="34" class="svgText strong">Pb: … 4f¹⁴ 5d¹⁰</text>
    <rect x="40" y="70" width="44" height="44" rx="6" class="svgLineFill svgSoft"/><text x="62" y="99" text-anchor="middle" class="svgText strong">↑↓</text><text x="62" y="134" text-anchor="middle" class="svgText qiSmall">6s²</text>
    ${[0,1,2].map(i=>`<rect x="${110+i*46}" y="50" width="44" height="44" rx="6" class="svgLineFill svgSoft"/>`).join('')}
    <text x="132" y="79" text-anchor="middle" class="svgText strong">↑</text><text x="178" y="79" text-anchor="middle" class="svgText strong">↑</text><text x="178" y="114" text-anchor="middle" class="svgText qiSmall">6p²</text>
    <path d="M30 150 H210" class="svgLayer"/><text x="120" y="172" text-anchor="middle" class="svgText qiSmall">los 6s quedan “escondidos” y cuesta sacarlos</text>
    <line x1="250" y1="72" x2="330" y2="52" class="svgArrow" marker-end="url(#qiArrP)"/>
    <line x1="250" y1="96" x2="330" y2="128" class="svgArrow" marker-end="url(#qiArrP)"/>
    <text x="340" y="48" class="svgText strong">Pb²⁺ · pierde sólo los 2 e⁻ 6p</text><text x="340" y="68" class="svgText qiSmall">estado más estable del plomo</text>
    <text x="340" y="126" class="svgText strong">Pb⁴⁺ · pierde también el par 6s²</text><text x="340" y="146" class="svgText qiSmall">inestable → quiere volver a Pb²⁺:</text><text x="340" y="164" class="svgText qiSmall">por eso el Pb(IV) es oxidante</text>
  </svg>`;

  svg.adsorcion=`<svg viewBox="0 0 660 200" role="img" aria-label="Partículas de colorante que quedan pegadas en la superficie de los poros del carbón activado">
    <rect x="40" y="30" width="250" height="140" rx="16" class="svgLiquid"/>
    ${[...Array(14)].map((_,i)=>`<circle cx="${62+((i*53)%210)}" cy="${52+((i*37)%100)}" r="7" fill="#3559c7"/>`).join('')}
    <text x="165" y="192" text-anchor="middle" class="svgText strong">Antes: colorante disuelto</text>
    <path d="M318 100 H352" class="svgArrow"/><path d="M346 92 352 100 346 108" class="svgArrow"/>
    <rect x="370" y="30" width="250" height="140" rx="16" class="svgLiquid"/>
    <path d="M420 120 q10 -40 40 -30 q20 -40 50 -10 q30 -20 40 20 q20 30 -20 40 q-40 20 -70 0 q-40 10 -40 -20z" class="qiCarbon"/>
    ${[[438,92],[462,80],[500,70],[535,90],[548,120],[520,140],[470,140],[432,128]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#3559c7"/>`).join('')}
    <text x="495" y="192" text-anchor="middle" class="svgText strong">Después: pegado al carbón</text>
  </svg>`;

  window.ET27QI={formula,species,eq,rx,rxs,f,swatch,vira,ensayo,pic,pics,punch,facts,svg,IMG};
  window.ET27_QI4=window.ET27_QI4||{subjectName:'Química Inorgánica',year:4,units:[]};
})();
