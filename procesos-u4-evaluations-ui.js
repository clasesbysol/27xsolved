// 27xSOLved · Procesos y Operaciones · interfaz de evaluaciones.
(function(){
  'use strict';

  if(!location.search.includes('procesos-operaciones-4'))return;
  const DATA=window.ET27_PROCESOS_EVALUATIONS||[];
  if(!DATA.length)return;

  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const math=latex=>`<div class="poEvalMath" data-po-eval-math="${encodeURIComponent(String(latex||''))}"></div>`;

  function access(){
    const api=window.ET27Access;
    const admin=Boolean(api?.state?.admin);
    return {
      admin,
      evaluations:admin||Boolean(api?.hasEvaluations?.('procesos-operaciones-4')),
      answers:admin||Boolean(api?.hasAnswers?.('procesos-operaciones-4'))
    };
  }

  function addStyles(){
    if(document.getElementById('po-evaluations-style'))return;
    const style=document.createElement('style');
    style.id='po-evaluations-style';
    style.textContent=`
      .poEvalIntro{margin:12px 0 18px;padding:15px 17px;border:1px solid var(--line);border-radius:17px;background:color-mix(in srgb,var(--accent) 6%,var(--panel));line-height:1.55}.poEvalIntro b{display:block;margin-bottom:4px}.poEvalIntro span{color:var(--muted)}
      .poEvalList{display:grid;gap:24px}.poEvaluation{border:1px solid var(--line);border-radius:22px;background:var(--panel);overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,.035)}
      .poEvalHead{padding:19px 20px 17px;background:color-mix(in srgb,var(--accent) 7%,var(--panel));border-bottom:1px solid var(--line)}.poEvalHead small{display:block;font-size:10px;letter-spacing:.11em;font-weight:950;color:var(--accent);margin-bottom:5px}.poEvalHead h3{margin:0;font-size:1.25rem}.poEvalHead p{margin:7px 0 0;color:var(--muted);line-height:1.5;font-size:.91rem}
      .poEvalProblems{display:grid;gap:14px;padding:16px}.poEvalProblem{border:1px solid var(--line);border-radius:17px;background:var(--panel-soft);overflow:hidden}.poEvalProblem>summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:11px;padding:14px 15px}.poEvalProblem>summary::-webkit-details-marker{display:none}.poEvalNum{width:32px;height:32px;border-radius:10px;background:var(--accent);color:white;display:grid;place-items:center;font-weight:950}.poEvalProblemTitle{display:grid;gap:2px}.poEvalProblemTitle small{font-size:10px;letter-spacing:.08em;font-weight:900;color:var(--muted)}.poEvalProblemTitle b{font-size:.96rem}.poEvalChevron{font-size:22px;color:var(--muted);transition:transform .2s}.poEvalProblem[open] .poEvalChevron{transform:rotate(90deg)}
      .poEvalBody{padding:0 15px 16px;border-top:1px solid var(--line)}.poEvalStatement{margin:14px 0 10px;line-height:1.62}.poEvalParts{margin:8px 0 4px;padding-left:22px;line-height:1.58}.poEvalParts li+li{margin-top:6px}
      .poEvalAnswer{margin-top:15px;border:2px solid color-mix(in srgb,var(--accent) 28%,var(--line));border-radius:16px;overflow:hidden;background:var(--panel)}.poEvalAnswer>summary{list-style:none;cursor:pointer;padding:13px 14px;font-weight:950;background:color-mix(in srgb,var(--accent) 8%,var(--panel));display:flex;align-items:center;gap:8px}.poEvalAnswer>summary::-webkit-details-marker{display:none}.poEvalAnswer>summary:before{content:'RESPUESTA';font-size:9px;letter-spacing:.1em;padding:4px 6px;border-radius:999px;background:var(--accent);color:white}.poEvalAnswer.admin>summary:before{content:'ADMIN'}
      .poEvalAnswerBody{padding:13px;display:grid;gap:10px}.poEvalFinal{padding:12px 13px;border-radius:12px;background:color-mix(in srgb,var(--accent) 7%,var(--panel-soft));line-height:1.55}.poEvalFinal b{display:block;font-size:10px;letter-spacing:.08em;color:var(--accent);margin-bottom:4px}
      .poEvalTeacher{padding:12px 13px;border-radius:12px;border:1px solid color-mix(in srgb,#f59e0b 35%,var(--line));background:color-mix(in srgb,#f59e0b 8%,var(--panel));line-height:1.55}.poEvalTeacher b{display:block;margin-bottom:4px;font-size:.8rem}.poEvalStep{padding:13px;border:1px solid var(--line);border-radius:13px;background:var(--panel-soft)}.poEvalStep h4{margin:0 0 7px;font-size:.88rem}.poEvalStep p{margin:0 0 8px;color:var(--muted);line-height:1.55}.poEvalMath{max-width:100%;overflow-x:auto;overflow-y:hidden;text-align:center;padding:7px 5px}.poEvalMath+.poEvalMath{margin-top:3px}.poEvalMath .katex-display{margin:.25em 0}.poEvalMath .katex{font-size:1em}
      .poEvalNoAnswer{margin-top:14px;padding:11px 13px;border:1px dashed var(--line);border-radius:12px;color:var(--muted);font-size:.82rem;line-height:1.45}
      @media(max-width:720px){.poEvalHead{padding:16px}.poEvalProblems{padding:11px}.poEvalProblem>summary{grid-template-columns:auto 1fr auto;padding:12px}.poEvalAnswerBody{padding:10px}.poEvalStep{padding:11px}.poEvalMath .katex{font-size:.91em}}
    `;
    document.head.appendChild(style);
  }

  function resolution(problem,mode){
    if(!mode.admin&&!mode.answers){
      return `<div class="poEvalNoAnswer">La resolución está protegida. El administrador puede habilitar respuestas para esta materia.</div>`;
    }
    return `<details class="poEvalAnswer ${mode.admin?'admin':''}" ${mode.admin?'open':''}>
      <summary>${mode.admin?'Resolución paso a paso · modo administrador':'Ver resolución paso a paso'}</summary>
      <div class="poEvalAnswerBody">
        <div class="poEvalFinal"><b>RESULTADO / CONTROL</b>${esc(problem.answer||'')}</div>
        ${mode.admin&&problem.teacher?`<div class="poEvalTeacher"><b>Cómo razonarlo / qué mirar como docente</b>${esc(problem.teacher)}</div>`:''}
        ${(problem.steps||[]).map(step=>`<section class="poEvalStep"><h4>${esc(step.title)}</h4>${step.text?`<p>${esc(step.text)}</p>`:''}${(step.formulas||[]).map(math).join('')}</section>`).join('')}
      </div>
    </details>`;
  }

  function problemMarkup(problem,index,mode){
    return `<details class="poEvalProblem" data-searchable>
      <summary><span class="poEvalNum">${index+1}</span><span class="poEvalProblemTitle"><small>${esc(problem.id)}</small><b>${esc(problem.title)}</b></span><span class="poEvalChevron">›</span></summary>
      <div class="poEvalBody"><p class="poEvalStatement">${esc(problem.statement)}</p>${problem.parts?.length?`<ol class="poEvalParts">${problem.parts.map(part=>`<li>${esc(part)}</li>`).join('')}</ol>`:''}${resolution(problem,mode)}</div>
    </details>`;
  }

  function evaluationMarkup(evaluation,mode){
    return `<article class="poEvaluation" id="${esc(evaluation.id)}">
      <header class="poEvalHead"><small>${esc(evaluation.eyebrow)}</small><h3>${esc(evaluation.title)}</h3><p>${esc(evaluation.meta)}</p></header>
      <div class="poEvalProblems">${(evaluation.problems||[]).map((p,i)=>problemMarkup(p,i,mode)).join('')}</div>
    </article>`;
  }

  function renderMath(root=document){
    root.querySelectorAll?.('[data-po-eval-math]:not([data-rendered])').forEach(node=>{
      const latex=decodeURIComponent(node.dataset.poEvalMath||'');
      if(!window.katex){node.textContent=latex;return;}
      try{
        window.katex.render(latex,node,{displayMode:true,throwOnError:false,strict:'ignore',output:'html'});
        node.dataset.rendered='1';
      }catch(_){node.textContent=latex}
    });
  }

  function mount(){
    addStyles();
    const section=document.querySelector('#parciales');
    if(!section)return;
    const mode=access();
    if(!mode.evaluations&&!mode.admin)return;
    const key=`${mode.admin?'admin':'student'}-${mode.answers?'answers':'locked'}`;
    if(section.dataset.poEvalMode===key&&section.querySelector('[data-po-evaluations]'))return;
    section.dataset.poEvalMode=key;
    section.querySelector('.evaluation-card')?.remove();
    section.querySelector('[data-po-evaluations]')?.remove();
    const holder=document.createElement('div');
    holder.dataset.poEvaluations='1';
    holder.innerHTML=`<div class="poEvalIntro"><b>4 evaluaciones · Primer principio de la Termodinámica</b><span>La primera está basada en la evaluación real aportada. Las otras tres cambian procesos y caminos de resolución para practicar decisiones, no plantillas.</span></div><div class="poEvalList">${DATA.map(ev=>evaluationMarkup(ev,mode)).join('')}</div>`;
    section.appendChild(holder);
    holder.querySelectorAll('.poEvalProblem,.poEvalAnswer').forEach(details=>details.addEventListener('toggle',()=>{if(details.open)requestAnimationFrame(()=>renderMath(details))}));
    renderMath(holder);
  }

  async function init(){
    try{await window.ET27Access?.ready}catch(_){}
    mount();
    document.addEventListener('et27-access-ready',mount);
    const observer=new MutationObserver(()=>requestAnimationFrame(mount));
    observer.observe(document.documentElement,{subtree:true,childList:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();