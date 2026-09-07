(function(){
  'use strict';
  if(!location.search.includes('procesos-operaciones-4')) return;

  const hasRawLatex = text => /\\(?:frac|Delta|times|cdot|approx|propto|mathrm|text|ln|qquad|,|left|right)|C_[vp]/.test(text||'');

  function plainMath(text){
    let out=String(text||'');
    for(let i=0;i<4;i++){
      out=out.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g,'$1/$2');
    }
    out=out
      .replace(/\\left/g,'')
      .replace(/\\right/g,'')
      .replace(/\\qquad/g,'   ')
      .replace(/\\,/g,' ')
      .replace(/\\mathrm\{([^{}]*)\}/g,'$1')
      .replace(/\\text\{([^{}]*)\}/g,'$1')
      .replace(/\\times/g,'×')
      .replace(/\\cdot/g,'·')
      .replace(/\\Delta/g,'Δ')
      .replace(/\\approx/g,'≈')
      .replace(/\\propto/g,'∝')
      .replace(/\\ln/g,'ln')
      .replace(/C_v/g,'Cᵥ')
      .replace(/C_p/g,'Cₚ')
      .replace(/\\\s+/g,' ')
      .replace(/[{}]/g,'')
      .replace(/\s{2,}/g,' ')
      .trim();
    return out;
  }

  function cleanTextNodes(root){
    if(!root || root.closest?.('.katex')) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(node.parentElement?.closest('.katex')) return;
      if(hasRawLatex(node.nodeValue)) node.nodeValue=plainMath(node.nodeValue);
    });
  }

  function cleanAll(){
    document.querySelectorAll([
      '.u4-step li',
      '.exercise-body li',
      '.exercise-hint',
      '.topic-card p',
      '.topic-card li',
      '.u4-table td',
      '.u4-theory-card p',
      '.u4-theory-card li'
    ].join(',')).forEach(cleanTextNodes);
  }

  function schedule(){
    requestAnimationFrame(()=>requestAnimationFrame(cleanAll));
  }

  document.addEventListener('click',e=>{
    if(e.target?.closest?.('details,summary,.exercise-item')) setTimeout(schedule,40);
  },true);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',schedule,{once:true});
  else schedule();
  setTimeout(schedule,120);
  setTimeout(schedule,500);
  setTimeout(schedule,1200);
})();
