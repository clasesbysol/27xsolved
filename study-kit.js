// 27xSOLved · kit compartido para temas teóricos nuevos (Física Aplicada · Hidrodinámica, Química General 4.º).
// Sólo genera HTML y conecta widgets; el renderizado de fórmulas lo hace app.js (renderMath sobre [data-latex]).
(function(){
  'use strict';

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const enc=v=>encodeURIComponent(String(v||''));

  // Fórmula en bloque: un renglón propio. El texto plano queda como respaldo si KaTeX no carga.
  const M=(latex,note)=>`<div class="kitEqRow"><div class="kitEq" data-latex="${enc(latex)}" data-display="true">${esc(latex)}</div>${note?`<small class="kitEqNote">${note}</small>`:''}</div>`;
  // Fórmula dentro del texto.
  const m=latex=>`<span class="kitInline" data-latex="${enc(latex)}" data-display="false">${esc(latex)}</span>`;
  // Cadena de pasos: cada elemento es un latex o [latex, comentario corto].
  const chain=(...steps)=>`<div class="eqChain">${steps.map(s=>Array.isArray(s)?M(s[0],s[1]):M(s)).join('')}</div>`;
  // Fórmula destacada (la que hay que recordar).
  const key=(latex,label)=>`<div class="kitKeyFormula">${label?`<span>${label}</span>`:''}<div class="kitEq" data-latex="${enc(latex)}" data-display="true">${esc(latex)}</div></div>`;
  // Tabla de símbolos: [latex del símbolo, significado, unidad].
  const sym=rows=>`<div class="symbolGrid">${rows.map(([s,t,u])=>`<div><b>${m(s)}</b><span>${t}</span>${u?`<em>${u}</em>`:''}</div>`).join('')}</div>`;
  // Explicación simple entre paréntesis.
  const simple=t=>`<span class="simple">(${t})</span>`;
  const idea=(title,html)=>`<div class="kitBox kitIdea"><b>💡 ${title}</b>${html}</div>`;
  const warn=(title,html)=>`<div class="kitBox kitWarn"><b>⚠ ${title}</b>${html}</div>`;
  const fix=(title,html)=>`<div class="kitBox kitFix"><b>✎ ${title}</b>${html}</div>`;
  const note=(title,html)=>`<div class="kitBox kitNote"><b>${title}</b>${html}</div>`;
  // Teoría en bloque, para leer con calma.
  const deep=(title,html,open=false)=>`<details class="deepRead"${open?' open':''}><summary><span>📖 Para leer con calma</span><b>${title}</b></summary><div class="deepReadBody">${html}</div></details>`;
  // Ejemplo resuelto desplegable dentro de la teoría.
  const example=(title,statement,body,answer)=>`<details class="kitExample"><summary><span>EJEMPLO RESUELTO</span><b>${title}</b></summary><div class="kitExampleBody">${statement?`<div class="kitStatement">${statement}</div>`:''}${body}${answer?`<div class="finalAnswer"><b>Resultado</b> ${answer}</div>`:''}</div></details>`;
  // Paso numerado dentro de una resolución.
  const step=(title,html)=>`<div class="kitStep"><h4>${title}</h4>${html}</div>`;
  const table=(head,rows,cls='')=>`<div class="kitTableWrap"><table class="kitTable ${cls}"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const figure=(svg,caption)=>`<figure class="kitFigure">${svg}${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
  // Tarjetas de repaso que se dan vuelta (grilla, sin depender del mazo de Química CBC).
  const cards=list=>`<div class="flipGrid">${list.map(([tag,q,a])=>`<button type="button" class="flipCard" aria-pressed="false"><span class="flipTag">${tag}</span><span class="flipFront">${q}</span><span class="flipBack">${a}</span><small>Tocá para dar vuelta ↻</small></button>`).join('')}</div>`;

  // ---------- Calculadoras interactivas ----------
  const fmt=(x,d=3)=>{
    if(!Number.isFinite(x))return '—';
    const a=Math.abs(x);
    if(a!==0&&(a<1e-3||a>=1e6))return x.toExponential(2).replace('.',',');
    return x.toLocaleString('es-AR',{maximumFractionDigits:d,useGrouping:false});
  };
  const num=(root,name)=>{const el=root.querySelector(`[name="${name}"]`);return el?Number(String(el.value).replace(',','.')):NaN};
  const calcs={
    continuity(root){
      const d1=num(root,'d1'),d2=num(root,'d2'),v1=num(root,'v1');
      const ratio=(d1/d2)**2,v2=v1*ratio;
      return `<b>v₂ ≈ ${fmt(v2)}</b> (mismas unidades que v₁)<br><small>(d₁/d₂)² = ${fmt(ratio,4)} · ${ratio>1?'el tubo se angosta: el fluido acelera':ratio<1?'el tubo se ensancha: el fluido frena':'misma sección: misma velocidad'}</small>`;
    },
    reynolds(root){
      const rho=num(root,'rho'),v=num(root,'v'),d=num(root,'d'),eta=num(root,'eta');
      const re=rho*v*d/eta;
      const reg=re<2300?['Laminar','lam']:re<=4000?['Transición','tra']:['Turbulento','tur'];
      return `<b>Re ≈ ${fmt(re,0)}</b> <span class="regime ${reg[1]}">${reg[0]}</span><br><small>Referencia del apunte: 2100 · Clasificación habitual en tubos: &lt; 2300 laminar, 2300–4000 transición, &gt; 4000 turbulento (valores orientativos).</small>`;
    },
    poiseuille(root){
      const k=num(root,'k');
      return `<b>Q nuevo = ${fmt(k**4,2)} · Q</b><br><small>Si el radio se multiplica por ${fmt(k,2)}, el caudal se multiplica por ${fmt(k,2)}⁴ = ${fmt(k**4,2)} (con la misma Δp, η y ℓ).</small>`;
    },
    stokes(root){
      const r=num(root,'r')/1000,rc=num(root,'rc'),rf=num(root,'rf'),eta=num(root,'eta'),g=9.8;
      const v=2*r*r*g*(rc-rf)/(9*eta);
      const re=rf*Math.abs(v)*2*r/eta;
      const dir=v>0?'baja':'sube';
      return `<b>v<sub>lím</sub> ≈ ${fmt(Math.abs(v)*100,3)} cm/s</b> (la esfera ${dir})<br><small>Control: Re de la esfera ≈ ${fmt(re,3)} ${re<1?'(muy bajo: Stokes es aplicable)':'(no es muy bajo: Stokes deja de ser confiable)'}.</small>`;
    },
    colligative(root){
      const i=num(root,'i'),K=num(root,'K'),b=num(root,'b'),T0=num(root,'T0');
      const type=root.querySelector('[name="type"]').value;
      const dT=i*K*b,T=type==='f'?T0-dT:T0+dT;
      return `<b>ΔT = ${fmt(dT,3)} K</b><br><b>${type==='f'?'T<sub>f</sub>':'T<sub>b</sub>'} = ${fmt(T,3)} °C</b><br><small>${type==='f'?'Se resta: la solución congela a menor temperatura.':'Se suma: la solución hierve a mayor temperatura.'}</small>`;
    },
    raoult(root){
      const p0=num(root,'p0'),nst=num(root,'nst'),nsv=num(root,'nsv');
      const xsv=nsv/(nsv+nst),p=xsv*p0;
      return `<b>x<sub>sv</sub> = ${fmt(xsv,4)}</b> · x<sub>st</sub> = ${fmt(1-xsv,4)}<br><b>p<sub>sc</sub> = ${fmt(p,3)}</b> · Δp = ${fmt(p0-p,3)} (misma unidad que p⁰)`;
    },
    osmotic(root){
      const i=num(root,'i'),C=num(root,'C'),t=num(root,'t');
      const T=t+273.15,P=i*C*0.08206*T;
      return `<b>Π ≈ ${fmt(P,3)} atm</b> ≈ ${fmt(P*760,1)} mmHg<br><small>T = ${fmt(T,2)} K (siempre en kelvin).</small>`;
    }
  };
  const field=(name,label,value,step='any')=>`<label><span>${label}</span><input name="${name}" type="number" inputmode="decimal" step="${step}" value="${value}"></label>`;
  const calc=(id,title,fields,lead='')=>`<div class="miniCalc" data-calc="${id}"><div class="miniCalcHead"><span>PROBALO</span><b>${title}</b>${lead?`<p>${lead}</p>`:''}</div><div class="miniCalcFields">${fields}</div><output class="miniCalcOut" aria-live="polite"></output></div>`;

  function init(root=document){
    root.querySelectorAll('.miniCalc').forEach(box=>{
      const fn=calcs[box.dataset.calc];if(!fn)return;
      const run=()=>{try{box.querySelector('.miniCalcOut').innerHTML=fn(box)}catch(_){}};
      box.querySelectorAll('input,select').forEach(el=>el.oninput=run);
      run();
    });
    root.querySelectorAll('.flipCard').forEach(c=>c.onclick=()=>{c.classList.toggle('flipped');c.setAttribute('aria-pressed',String(c.classList.contains('flipped')))});
  }

  window.ET27Kit={esc,M,m,chain,key,sym,simple,idea,warn,fix,note,deep,example,step,table,figure,cards,calc,field,init};
})();
