(function(){
  'use strict';

  const root=document.documentElement;
  const rail=document.querySelector('.formula-rail');
  const fab=document.getElementById('formulaFab');
  const search=document.getElementById('mathSearch');
  const empty=document.getElementById('emptyMathSearch');

  function readTheme(){
    let mode='system';
    try{mode=localStorage.getItem('cbc-theme')||JSON.parse(localStorage.getItem('27xsolved-theme')||'"system"')}catch(_){ }
    if(mode==='system')return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    return mode==='dark'?'dark':'light';
  }
  function applyTheme(){root.dataset.theme=readTheme()}
  applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{
    let mode='system';
    try{mode=localStorage.getItem('cbc-theme')||JSON.parse(localStorage.getItem('27xsolved-theme')||'"system"')}catch(_){ }
    if(mode==='system')applyTheme();
  });

  let mathAttempts=0;
  function renderMath(){
    if(!window.katex){
      mathAttempts+=1;
      if(mathAttempts<40)setTimeout(renderMath,150);
      return;
    }
    document.querySelectorAll('[data-latex]').forEach(node=>{
      if(node.dataset.rendered==='1')return;
      try{
        window.katex.render(node.dataset.latex,node,{throwOnError:false,displayMode:node.classList.contains('math-row')||node.classList.contains('math-step'),output:'htmlAndMathml'});
        node.dataset.rendered='1';
      }catch(err){console.warn('No se pudo renderizar una fórmula',err)}
    });
  }
  renderMath();

  if(rail){rail.id='formulaRail'}
  fab?.addEventListener('click',()=>{
    const open=rail?.classList.toggle('open')||false;
    fab.setAttribute('aria-expanded',String(open));
  });

  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function filterContent(){
    const query=normalize(search?.value.trim());
    const cards=[...document.querySelectorAll('.exam-card.search-target,.practice-card.search-target')];
    cards.forEach(card=>card.classList.toggle('search-hidden',Boolean(query)&&!normalize(card.textContent).includes(query)));

    const sections=[...document.querySelectorAll('.lesson-section.search-target')];
    let visible=0;
    sections.forEach(section=>{
      const ownText=normalize(section.textContent);
      const hasVisibleCard=[...section.querySelectorAll('.exam-card.search-target,.practice-card.search-target')].some(card=>!card.classList.contains('search-hidden'));
      const hasCards=section.querySelector('.exam-card.search-target,.practice-card.search-target');
      const match=!query||ownText.includes(query)||(hasCards&&hasVisibleCard);
      section.classList.toggle('search-hidden',!match);
      if(match)visible+=1;
    });
    empty?.classList.toggle('show',Boolean(query)&&visible===0);
  }
  search?.addEventListener('input',filterContent);
  search?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      search.value='';
      filterContent();
      search.blur();
    }
  });

  const links=[...document.querySelectorAll('.math-index a[href^="#"]')];
  const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+visible.target.id));
    },{rootMargin:'-18% 0px -68% 0px',threshold:[0,.15,.35,.6]});
    sections.forEach(section=>observer.observe(section));
  }

  links.forEach(link=>link.addEventListener('click',()=>{
    if(innerWidth<=820){
      const index=document.querySelector('.math-index');
      index?.scrollTo({left:Math.max(0,link.offsetLeft-24),behavior:'smooth'});
    }
  }));

  document.querySelectorAll('details.solution,details.hint').forEach(details=>details.addEventListener('toggle',()=>{
    if(details.open)renderMath();
  }));
})();