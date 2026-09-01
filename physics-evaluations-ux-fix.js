// 27xSOLved · Física Aplicada — ajuste de índice + evaluación 1.1 con tres perfiles.
(function(){
  'use strict';

  const M=latex=>`<div class="deepAdminFormula eval11Formula" data-eval11-math="${encodeURIComponent(latex)}"></div>`;
  const P=t=>`<p>${t}</p>`;
  const H=(t,b)=>`<section class="deepAdminStep"><h4>${t}</h4>${b}</section>`;
  const DATA=rows=>`<div class="deepAdminData">${rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  const NOTE=t=>`<div class="deepAdminNote">${t}</div>`;
  const SAY=t=>`<div class="deepAdminSay"><b>🗣 Guion exacto para decir en clase</b><p>${t}</p></div>`;
  const ERROR=t=>`<div class="deepAdminError"><b>⚠ Error típico</b><p>${t}</p></div>`;
  const CHECK=t=>`<div class="deepAdminCheck"><b>✓ Control de coherencia</b><p>${t}</p></div>`;

  function adminEmailInStorage(storage){
    const target=String(window.CBCLASES_CONFIG?.adminEmail||'').trim().toLowerCase();
    if(!target)return false;
    try{
      for(let i=0;i<storage.length;i++){
        const k=storage.key(i),v=storage.getItem(k);
        if(v&&String(v).toLowerCase().includes(target))return true;
      }
    }catch(_){ }
    return false;
  }
  function isAdminPhysics(){
    const title=document.querySelector('.unitHero h1');
    if(!title||title.textContent.trim()!=='Física Aplicada')return false;
    const badge=[...document.querySelectorAll('.pill,.rolePill,.accountRole,.userRole,button,a')].some(el=>{
      const t=(el.textContent||'').trim().toLowerCase();
      return t==='administrador'||t==='panel de control'||t.includes('panel admin');
    });
    return badge||adminEmailInStorage(localStorage)||adminEmailInStorage(sessionStorage);
  }

  const profiles=`
    <div class="eval11Profiles" aria-label="Tres perfiles de chapa de aluminio">
      <figure class="eval11Profile">
        <svg viewBox="0 0 260 190" role="img" aria-label="Perfil A, chapa rectangular de cuatro por dos centímetros">
          <defs><marker id="arrA" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
          <rect x="50" y="42" width="160" height="80" rx="2" fill="none" stroke="currentColor" stroke-width="4"/>
          <line x1="50" y1="142" x2="210" y2="142" stroke="currentColor" stroke-width="1.8" marker-start="url(#arrA)" marker-end="url(#arrA)"/>
          <text x="130" y="162" text-anchor="middle">4,0 cm</text>
          <line x1="28" y1="42" x2="28" y2="122" stroke="currentColor" stroke-width="1.8" marker-start="url(#arrA)" marker-end="url(#arrA)"/>
          <text x="18" y="86" text-anchor="middle" transform="rotate(-90 18 86)">2,0 cm</text>
          <text x="130" y="28" text-anchor="middle" class="eval11Letter">A</text>
        </svg>
        <figcaption><b>A · Rectangular maciza</b><span>4,0 cm × 2,0 cm</span></figcaption>
      </figure>
      <figure class="eval11Profile">
        <svg viewBox="0 0 260 190" role="img" aria-label="Perfil B, chapa cuadrada de tres centímetros con agujero central de radio cero coma seis centímetros">
          <defs><marker id="arrB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
          <rect x="65" y="34" width="130" height="130" rx="2" fill="none" stroke="currentColor" stroke-width="4"/>
          <circle cx="130" cy="99" r="26" fill="none" stroke="currentColor" stroke-width="4"/>
          <line x1="130" y1="99" x2="156" y2="99" stroke="currentColor" stroke-width="1.8" marker-end="url(#arrB)"/>
          <text x="160" y="94">r = 0,60 cm</text>
          <line x1="65" y1="178" x2="195" y2="178" stroke="currentColor" stroke-width="1.8" marker-start="url(#arrB)" marker-end="url(#arrB)"/>
          <text x="130" y="188" text-anchor="middle">3,0 cm</text>
          <text x="130" y="24" text-anchor="middle" class="eval11Letter">B</text>
        </svg>
        <figcaption><b>B · Cuadrada perforada</b><span>Lado 3,0 cm · agujero r = 0,60 cm</span></figcaption>
      </figure>
      <figure class="eval11Profile">
        <svg viewBox="0 0 260 190" role="img" aria-label="Perfil C, corona circular de radio exterior uno coma ocho centímetros y radio interior cero coma siete centímetros">
          <defs><marker id="arrC" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
          <circle cx="130" cy="101" r="63" fill="none" stroke="currentColor" stroke-width="4"/>
          <circle cx="130" cy="101" r="25" fill="none" stroke="currentColor" stroke-width="4"/>
          <line x1="130" y1="101" x2="193" y2="101" stroke="currentColor" stroke-width="1.8" marker-end="url(#arrC)"/>
          <text x="166" y="94">R = 1,80 cm</text>
          <line x1="130" y1="101" x2="130" y2="76" stroke="currentColor" stroke-width="1.8" marker-end="url(#arrC)"/>
          <text x="78" y="72">r = 0,70 cm</text>
          <text x="130" y="25" text-anchor="middle" class="eval11Letter">C</text>
        </svg>
        <figcaption><b>C · Corona circular</b><span>R = 1,80 cm · r = 0,70 cm</span></figcaption>
      </figure>
    </div>`;

  const deepGuide=`
    <div class="deepAdminBody eval11DeepBody">
      <div class="deepAdminIntro"><b>Objetivo docente:</b> que quede clarísimo que los tres perfiles se resuelven con <b>la misma física</b>. No existen tres fórmulas distintas: primero se deduce una expresión general y después A, B y C cambian solamente en el área de material y en la longitud total de borde mojado.</div>
      ${H('1. Antes de hacer cuentas: traduzco la consigna a fuerzas',
        P('La chapa está apoyada sobre la superficie del agua. Su peso apunta hacia abajo y la tensión superficial aporta la fuerza que puede sostenerla. La palabra <b>máximo</b> indica el caso límite: si el espesor aumentara un poquito más, el peso superaría a la fuerza superficial y la chapa se hundiría.')+
        M(String.raw`F_{\gamma}=P`)+
        NOTE('Este es el punto conceptual más importante. Primero se decide qué fuerzas compiten; recién después se mira la geometría.'))}
      ${H('2. Unifico los datos comunes de las tres chapas',
        DATA([['Material','aluminio'],['Densidad','ρ = 2,70 g/cm³'],['Agua','γ = 72,8 dyn/cm'],['Gravedad','g = 980 cm/s²'],['Incógnita','eₘₐₓ para A, B y C']])+
        P('Como la tensión superficial está expresada en dyn/cm, conviene trabajar completamente en CGS para evitar conversiones innecesarias.'))}
      ${H('3. Construyo el peso desde la definición de densidad',
        P('Para cualquier chapa de área plana A y espesor e:')+
        M(String.raw`V=Ae`)+
        P('La masa es densidad por volumen:')+
        M(String.raw`m=\rho V`)+
        M(String.raw`m=\rho Ae`)+
        P('Y el peso resulta:')+
        M(String.raw`P=mg`)+
        M(String.raw`P=\rho Aeg`)+
        P('Esto explica por qué, para el peso, importa el <b>área de material</b>. Un agujero no pesa, por eso su área se resta.'))}
      ${H('4. Construyo la fuerza de tensión superficial',
        P('La tensión superficial γ tiene unidades de fuerza por longitud. Por eso la fuerza ideal que aporta la superficie se obtiene multiplicando γ por la longitud total de contacto L:')+
        M(String.raw`F_{\gamma}=\gamma L`)+
        P('Acá aparece la segunda idea geométrica: para la fuerza no importa el área sino el <b>borde mojado</b>. Si hay un agujero, su contorno interior también suma longitud de contacto.'))}
      ${H('5. Obtengo una sola fórmula general para A, B y C',
        P('En el espesor máximo igualo las dos fuerzas:')+
        M(String.raw`\gamma L=\rho Aeg`)+
        P('Despejo e antes de poner números:')+
        M(String.raw`e_{\max}=\frac{\gamma L}{\rho A g}`)+
        NOTE('A partir de acá no cambia más la física. Para cada perfil solamente tengo que calcular correctamente A y L.'))}
      ${H('6. Perfil A · rectángulo macizo de 4,0 cm × 2,0 cm',
        P('Primero calculo el área, porque esa es la cantidad de material que pesa:')+
        M(String.raw`A_A=4.0\cdot2.0`)+
        M(String.raw`A_A=8.0\;\mathrm{cm^2}`)+
        P('Ahora calculo la longitud efectiva, que en una chapa maciza es simplemente el perímetro exterior:')+
        M(String.raw`L_A=2(4.0+2.0)`)+
        M(String.raw`L_A=12.0\;\mathrm{cm}`)+
        P('Sustituyo en la fórmula general:')+
        M(String.raw`e_A=\frac{(72.8)(12.0)}{(2.70)(8.0)(980)}`)+
        M(String.raw`e_A=0.0412698\;\mathrm{cm}`)+
        P('Paso a milímetros multiplicando por 10:')+
        M(String.raw`e_A=0.412698\;\mathrm{mm}`)+
        M(String.raw`\boxed{e_A\approx0.413\;\mathrm{mm}}`))}
      ${H('7. Perfil B · cuadrado de 3,0 cm con agujero de radio 0,60 cm',
        P('Acá conviene separar explícitamente las dos geometrías. Para el peso, el agujero se <b>resta</b> del área:')+
        M(String.raw`A_B=(3.0)^2-\pi(0.60)^2`)+
        M(String.raw`A_B=9.0-0.36\pi`)+
        M(String.raw`A_B=7.8690\;\mathrm{cm^2}`)+
        P('Para la tensión superficial, en cambio, el agujero <b>suma</b> un nuevo borde. Entonces:')+
        M(String.raw`L_B=4(3.0)+2\pi(0.60)`)+
        M(String.raw`L_B=12.0+1.20\pi`)+
        M(String.raw`L_B=15.7699\;\mathrm{cm}`)+
        P('Reemplazo:')+
        M(String.raw`e_B=\frac{(72.8)(15.7699)}{(2.70)(7.8690)(980)}`)+
        M(String.raw`e_B=0.0551378\;\mathrm{cm}`)+
        M(String.raw`e_B=0.551378\;\mathrm{mm}`)+
        M(String.raw`\boxed{e_B\approx0.551\;\mathrm{mm}}`)+
        NOTE('Este perfil es muy útil para explicar la diferencia entre “área que pesa” y “borde que sostiene”: el mismo agujero resta en A pero suma en L.'))}
      ${H('8. Perfil C · corona circular con R = 1,80 cm y r = 0,70 cm',
        P('El área de material es círculo grande menos círculo chico:')+
        M(String.raw`A_C=\pi(R^2-r^2)`)+
        M(String.raw`A_C=\pi\left[(1.80)^2-(0.70)^2\right]`)+
        M(String.raw`A_C=\pi(3.24-0.49)`)+
        M(String.raw`A_C=2.75\pi`)+
        M(String.raw`A_C=8.6394\;\mathrm{cm^2}`)+
        P('La superficie tira tanto por la circunferencia exterior como por la interior:')+
        M(String.raw`L_C=2\pi R+2\pi r`)+
        M(String.raw`L_C=2\pi(1.80+0.70)`)+
        M(String.raw`L_C=5\pi`)+
        M(String.raw`L_C=15.7080\;\mathrm{cm}`)+
        P('Reemplazo:')+
        M(String.raw`e_C=\frac{(72.8)(15.7080)}{(2.70)(8.6394)(980)}`)+
        M(String.raw`e_C=0.0500241\;\mathrm{cm}`)+
        M(String.raw`e_C=0.500241\;\mathrm{mm}`)+
        M(String.raw`\boxed{e_C\approx0.500\;\mathrm{mm}}`))}
      ${H('9. Comparo los tres resultados y explico qué significa',
        M(String.raw`e_B>e_C>e_A`)+
        M(String.raw`0.551\;\mathrm{mm}>0.500\;\mathrm{mm}>0.413\;\mathrm{mm}`)+
        P('El perfil B permite el mayor espesor porque el agujero mejora mucho la relación entre longitud de contacto y área de material: agrega borde que sostiene y al mismo tiempo quita material que pesa.'))}
      ${H('10. Qué escribiría como respuesta final en una evaluación',
        M(String.raw`\boxed{A:\;e_{\max}\approx0.413\;\mathrm{mm}}`)+
        M(String.raw`\boxed{B:\;e_{\max}\approx0.551\;\mathrm{mm}}`)+
        M(String.raw`\boxed{C:\;e_{\max}\approx0.500\;\mathrm{mm}}`))}
      ${ERROR('Usar una fórmula distinta para cada forma; olvidar el borde interior de B o C; sumar el área del agujero en vez de restarla; confundir área con perímetro; o mezclar metros con centímetros mientras γ está en dyn/cm.')}
      ${CHECK('La fórmula general tiene la tendencia correcta: si aumenta γ, puede sostenerse una chapa más gruesa; si aumenta ρ, el espesor máximo baja. Además, los tres resultados quedan del orden de décimas de milímetro, coherente con una chapa de aluminio sostenida únicamente por tensión superficial.')}
      ${SAY('“Este ejercicio parece tres ejercicios, pero en realidad es uno solo. Primero saco la física una vez: peso igual a tensión superficial. El peso depende del área por el espesor; la superficie sostiene por longitud de borde. Entonces me queda e igual a gamma por L dividido rho por A por g. Después hago A, B y C cambiando solamente la geometría. En A tengo un rectángulo común. En B el agujero hace dos cosas distintas: le saca material al peso y le agrega borde a la tensión. En C pasa lo mismo con el borde interior del anillo. Por eso no quiero que memoricen fórmulas de figuras: quiero que sepan calcular qué área pesa y qué borde sostiene.”')}
    </div>`;

  function ensureStyles(){
    if(document.getElementById('eval11UxStyles'))return;
    const s=document.createElement('style');
    s.id='eval11UxStyles';
    s.textContent=`
      .eval11Profiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:18px 0 6px}
      .eval11Profile{margin:0;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--accent,#0f9f9a) 4%,var(--card,#fff));border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 22%,transparent)}
      .eval11Profile svg{display:block;width:100%;height:auto;color:var(--text,#1f3035)}
      .eval11Profile svg text{fill:currentColor;font:700 12px Nunito,system-ui,sans-serif}
      .eval11Profile svg .eval11Letter{font-size:22px;font-weight:900;fill:var(--accent,#0f9f9a)}
      .eval11Profile figcaption{display:grid;gap:3px;margin-top:8px;font-size:.88rem;line-height:1.35}
      .eval11Profile figcaption b{color:var(--accent,#0f9f9a)}
      .eval11Profile figcaption span{opacity:.76}
      .eval11Finals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:4px}
      .eval11Finals span{display:block;padding:9px 10px;border-radius:11px;background:color-mix(in srgb,var(--accent,#0f9f9a) 6%,var(--card,#fff));text-align:center;font-weight:800}
      .eval11DeepBody .deepAdminStep{scroll-margin-top:90px}
      @media(max-width:760px){.eval11Profiles,.eval11Finals{grid-template-columns:1fr}.eval11Profile{padding:10px}}
    `;
    document.head.appendChild(s);
  }

  function renderMath(root,attempt=0){
    const nodes=[...root.querySelectorAll('[data-eval11-math]')].filter(n=>!n.dataset.eval11Rendered);
    if(!nodes.length)return;
    if(!window.katex){if(attempt<50)setTimeout(()=>renderMath(root,attempt+1),100);return;}
    nodes.forEach(n=>{
      try{window.katex.render(decodeURIComponent(n.dataset.eval11Math||''),n,{displayMode:true,throwOnError:false,strict:'ignore'});n.dataset.eval11Rendered='1';}
      catch(_){n.textContent=decodeURIComponent(n.dataset.eval11Math||'');}
    });
  }

  function fixPhysicsMenu(){
    const toc=document.querySelector('.unitToc');
    if(!toc)return;
    const list=toc.querySelector(':scope > div')||toc.querySelector('div');
    if(!list)return;
    [...list.querySelectorAll('button')].forEach(btn=>{
      const txt=(btn.textContent||'').trim().toLowerCase();
      if(txt.includes('respuestas desarrolladas')||txt.includes('respuestas desordenadas'))btn.remove();
    });
    document.querySelector('#physics-answers')?.remove();
    let evalBtn=list.querySelector('[data-physics-scroll="model-evaluations"]');
    if(!evalBtn){
      evalBtn=document.createElement('button');
      evalBtn.type='button';
      evalBtn.dataset.physicsScroll='model-evaluations';
      evalBtn.innerHTML='<span>04</span>Evaluaciones modelo';
      const exerciseBtn=list.querySelector('[data-physics-scroll="exercises"]');
      if(exerciseBtn)exerciseBtn.insertAdjacentElement('afterend',evalBtn);else list.appendChild(evalBtn);
      evalBtn.addEventListener('click',()=>{
        document.querySelector('#physics-model-evaluations')?.scrollIntoView({behavior:'smooth',block:'start'});
        document.querySelector('.unitToc')?.classList.remove('open');
      });
    }
  }

  function fixEvaluation11(){
    const card=document.querySelector('.modelEvaluationCard[data-model-key="EV1.1"]');
    if(!card)return;
    card.querySelector('.exerciseHead h3').textContent='EV1.1 · Tres chapas de aluminio sostenidas por tensión superficial';
    const statement=card.querySelector('.exerciseStatement');
    if(statement){
      statement.innerHTML=`<p>Para cada uno de los tres perfiles de chapa de aluminio mostrados a continuación, calcular el espesor máximo ideal que puede tener para mantenerse en equilibrio sobre la superficie del agua por fuerzas de tensión superficial. Datos comunes: ρ<sub>Al</sub> = 2,70 g/cm³; γ<sub>agua</sub> = 72,8 dina/cm; g = 980 cm/s².</p>${profiles}`;
    }
    const answer=card.querySelector('.modelStudentAnswer');
    if(answer){
      answer.innerHTML='<b>Respuesta final · vista alumno</b><div class="eval11Finals"><span>A · 0,413 mm</span><span>B · 0,551 mm</span><span>C · 0,500 mm</span></div>';
    }
    const group=card.closest('.modelEvalGroup');
    if(group){
      const meta=group.querySelector('.modelEvalGroupHead p');
      if(meta)meta.textContent='Adaptación de la primera evaluación fotografiada, con tres perfiles completos A, B y C para resolver el ejercicio geométrico.';
      const note=group.querySelector('.modelEvalNote');
      if(note)note.textContent='En el problema 1 se reemplazó la referencia al dibujo del pizarrón por tres perfiles técnicos completos. Los tres comparten el mismo desarrollo físico general y se resuelven individualmente por geometría.';
    }

    card.querySelectorAll('.adminPhysicsSolution').forEach(x=>x.remove());
    let deep=card.querySelector('.modelDeepAdminSolution');
    if(isAdminPhysics()){
      if(!deep){
        deep=document.createElement('details');
        deep.className='modelDeepAdminSolution';
        deep.dataset.deepAdmin='EV1.1';
        card.appendChild(deep);
      }
      deep.open=true;
      if(deep.dataset.eval11Override!=='1'){
        deep.innerHTML='<summary>Resolución hiperdesarrollada · EV1.1 · perfiles A, B y C</summary>'+deepGuide;
        deep.dataset.eval11Override='1';
      }
      renderMath(deep);
    }else if(deep){
      deep.remove();
    }
  }

  let queued=false;
  function refresh(){
    queued=false;
    ensureStyles();
    const title=document.querySelector('.unitHero h1');
    if(!title||title.textContent.trim()!=='Física Aplicada')return;
    fixPhysicsMenu();
    fixEvaluation11();
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(refresh);}
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
  window.addEventListener('storage',schedule);
  setTimeout(schedule,300);setTimeout(schedule,900);setTimeout(schedule,1800);setTimeout(schedule,3200);
})();