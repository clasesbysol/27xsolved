// 27xSOLved · Inglés 2.º año · ejercicios interactivos (completar, elegir, ordenar, tarjetas).
(function(){
  'use strict';

  const CONTRACTIONS=[
    [/\bdoesn't\b/g,'does not'],[/\bdon't\b/g,'do not'],[/\bdidn't\b/g,'did not'],
    [/\bisn't\b/g,'is not'],[/\baren't\b/g,'are not'],[/\bwasn't\b/g,'was not'],[/\bweren't\b/g,'were not'],
    [/\bcan't\b/g,'cannot'],[/\bcan not\b/g,'cannot'],[/\bcouldn't\b/g,'could not'],[/\bmustn't\b/g,'must not'],
    [/\bi'm\b/g,'i am'],[/\byou're\b/g,'you are'],[/\bwe're\b/g,'we are'],[/\bthey're\b/g,'they are'],
    [/\bhe's\b/g,'he is'],[/\bshe's\b/g,'she is'],[/\bit's\b/g,'it is'],[/\bwhat's\b/g,'what is']
  ];
  function norm(v){
    let s=String(v||'').toLowerCase().replace(/[’‘´`]/g,"'").replace(/[.?!,;:]+/g,' ').replace(/\s+/g,' ').trim();
    CONTRACTIONS.forEach(([re,to])=>{s=s.replace(re,to)});
    return s.replace(/\s+/g,' ').trim();
  }
  const matches=(value,answers)=>{const n=norm(value);return!!n&&String(answers||'').split('|').some(a=>norm(a)===n)};
  const first=answers=>String(answers||'').split('|')[0];

  // ---------- Completar y elegir ----------
  function setupDrill(list){
    const bar=list.nextElementSibling?.classList.contains('drill-bar')?list.nextElementSibling:null;
    const items=[...list.children];
    items.forEach(li=>{
      li.querySelectorAll('.opts').forEach(group=>{
        group.querySelectorAll('.opt').forEach(btn=>{
          btn.type='button';
          btn.addEventListener('click',()=>{
            group.querySelectorAll('.opt').forEach(b=>b.classList.remove('sel','right','wrong'));
            btn.classList.add('sel');
            li.classList.remove('ok','no','shown');
          });
        });
      });
      li.querySelectorAll('input.gap').forEach(inp=>{
        inp.setAttribute('autocomplete','off');inp.setAttribute('autocapitalize','off');inp.setAttribute('spellcheck','false');
        inp.addEventListener('input',()=>li.classList.remove('ok','no','shown'));
        inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();checkItem(li);}});
      });
    });
    function feedback(li,text){
      let fb=li.querySelector('.fb');
      if(!fb){fb=document.createElement('div');fb.className='fb';(li.querySelector('.q')||li).appendChild(fb)}
      fb.innerHTML=text;
    }
    function expected(li){
      const parts=[...li.querySelectorAll('input.gap')].map(i=>first(i.dataset.a));
      li.querySelectorAll('.opts').forEach(g=>parts.push(first(g.dataset.a)));
      return parts.join(' · ');
    }
    function checkItem(li){
      const inputs=[...li.querySelectorAll('input.gap')],groups=[...li.querySelectorAll('.opts')];
      if(!inputs.length&&!groups.length)return null;
      let ok=true,answered=false;
      inputs.forEach(i=>{if(i.value.trim())answered=true;if(!matches(i.value,i.dataset.a))ok=false});
      groups.forEach(g=>{
        const sel=g.querySelector('.opt.sel');
        if(sel)answered=true;
        const good=sel&&matches(sel.textContent,g.dataset.a);
        if(sel)sel.classList.add(good?'right':'wrong');
        if(!good)ok=false;
      });
      if(!answered){li.classList.remove('ok','no');return false}
      li.classList.remove('shown');
      li.classList.toggle('ok',ok);li.classList.toggle('no',!ok);
      const why=li.dataset.why?` <span>${li.dataset.why}</span>`:'';
      feedback(li,ok?`✓ Correct!${why}`:`✗ Correct answer: <b>${expected(li)}</b>.${why}`);
      return ok;
    }
    if(!bar)return;
    const score=bar.querySelector('.score');
    bar.querySelector('[data-check]')?.addEventListener('click',()=>{
      let good=0,total=0;
      items.forEach(li=>{const r=checkItem(li);if(r!==null){total++;if(r)good++}});
      if(score)score.textContent=`${good} / ${total}`;
    });
    bar.querySelector('[data-show]')?.addEventListener('click',()=>{
      items.forEach(li=>{
        if(li.classList.contains('ok'))return;
        li.classList.remove('no');li.classList.add('shown');
        const why=li.dataset.why?` <span>${li.dataset.why}</span>`:'';
        feedback(li,`Respuesta: <b>${expected(li)}</b>.${why}`);
      });
    });
    bar.querySelector('[data-reset]')?.addEventListener('click',()=>{
      items.forEach(li=>{
        li.classList.remove('ok','no','shown');
        li.querySelectorAll('input.gap').forEach(i=>i.value='');
        li.querySelectorAll('.opt').forEach(b=>b.classList.remove('sel','right','wrong'));
      });
      if(score)score.textContent='';
    });
  }

  // ---------- Ordenar palabras ----------
  function setupOrder(li){
    const words=String(li.dataset.words||'').split('|').filter(Boolean);
    li.innerHTML=`<div class="line" aria-label="Tu oración"></div><div class="pool"></div><div class="chip-bar"><button type="button" data-undo>↶ Sacar la última</button><button type="button" data-clear>Empezar de nuevo</button><button type="button" data-solve>Ver la oración</button></div><div class="fb"></div>`;
    const line=li.querySelector('.line'),pool=li.querySelector('.pool'),fb=li.querySelector('.fb');
    const make=w=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=w;return b};
    words.forEach(w=>pool.appendChild(make(w)));
    const check=()=>{
      li.classList.remove('ok','no');
      if(pool.children.length)return;
      const said=[...line.children].map(c=>c.textContent).join(' ');
      const ok=matches(said,[li.dataset.order,li.dataset.alt].filter(Boolean).join('|'));
      li.classList.add(ok?'ok':'no');
      fb.innerHTML=ok?`✓ ¡Perfecto! ${li.dataset.why||''}`:`✗ Casi. Correcto: <b>${li.dataset.order}</b> ${li.dataset.why||''}`;
    };
    li.addEventListener('click',e=>{
      const chip=e.target.closest('.chip');
      if(chip){(chip.parentElement===pool?line:pool).appendChild(chip);check();return}
      if(e.target.closest('[data-undo]')){const last=line.lastElementChild;if(last)pool.appendChild(last);check()}
      if(e.target.closest('[data-clear]')){[...line.children].forEach(c=>pool.appendChild(c));check()}
      if(e.target.closest('[data-solve]')){li.classList.remove('ok');li.classList.add('no');fb.innerHTML=`Oración: <b>${li.dataset.order}</b> ${li.dataset.why||''}`}
    });
  }

  // ---------- Tarjetas de verbos ----------
  function setupFlip(card){
    const front=card.innerHTML,back=card.dataset.back||'';
    card.setAttribute('role','button');card.tabIndex=0;
    const toggle=()=>{const on=card.classList.toggle('on');card.innerHTML=on?back:front};
    card.addEventListener('click',toggle);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  }

  // ---------- Película de cuadros ----------
  function setupFilm(box){
    const frames=[...box.querySelectorAll('.fr')],count=box.querySelector('.film-count'),strip=box.querySelector('.film-strip');
    let i=0,timer=null;
    const show=k=>{i=(k+frames.length)%frames.length;frames.forEach((f,j)=>f.classList.toggle('on',j<=i));count.textContent=`${i+1} / ${frames.length}`;strip.scrollTo({left:Math.max(0,frames[i].offsetLeft-strip.offsetLeft-20),behavior:'smooth'})};
    const stop=()=>{clearInterval(timer);timer=null;box.querySelector('[data-film-play]').textContent='Play'};
    box.querySelector('[data-film-next]').addEventListener('click',()=>{stop();show(i+1)});
    box.querySelector('[data-film-prev]').addEventListener('click',()=>{stop();show(i-1)});
    box.querySelector('[data-film-play]').addEventListener('click',e=>{if(timer){stop();return}e.target.textContent='Pause';show(0);timer=setInterval(()=>{if(i>=frames.length-1){stop();return}show(i+1)},1600)});
    frames.forEach((f,j)=>f.addEventListener('click',()=>{stop();show(j)}));
    show(0);
  }
  function setupTaps(){
    document.querySelectorAll('.word-tap:not([data-ready])').forEach(b=>{b.dataset.ready='1';b.addEventListener('click',()=>{
      const box=document.getElementById('tap-box');if(!box)return;
      document.querySelectorAll('.word-tap').forEach(x=>x.classList.toggle('sel',x===b));
      box.innerHTML=`<span class="en">${b.dataset.def}</span><small class="tr">${b.dataset.tr}</small><p class="en" style="margin:8px 0 0">${b.dataset.ex}</p>`;
    })});
  }
  function init(){
    document.querySelectorAll('[data-film]:not([data-ready])').forEach(f=>{f.dataset.ready='1';setupFilm(f)});
    setupTaps();
    document.querySelectorAll('[data-drill]:not([data-ready])').forEach(l=>{l.dataset.ready='1';setupDrill(l)});
    document.querySelectorAll('.order li[data-words]:not([data-ready])').forEach(l=>{l.dataset.ready='1';setupOrder(l)});
    document.querySelectorAll('.flip:not([data-ready])').forEach(c=>{c.dataset.ready='1';setupFlip(c)});
    document.querySelectorAll('[data-mark]:not([data-ready])').forEach(b=>{
      b.dataset.ready='1';
      b.addEventListener('click',()=>{const r=document.getElementById(b.dataset.mark);if(!r)return;const on=r.classList.toggle('marked');b.textContent=on?'Ocultar colores':'Marcar los tiempos verbales con colores'});
    });
    document.querySelectorAll('[data-flip-all]:not([data-ready])').forEach(b=>{
      b.dataset.ready='1';
      b.addEventListener('click',()=>{const grid=document.getElementById(b.dataset.flipAll);grid?.querySelectorAll('.flip').forEach(c=>c.click())});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.ET27English={init,norm,matches};
})();
