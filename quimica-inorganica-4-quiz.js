// 27xSOLved · Química Inorgánica 4.º · MULTIPLE CHOICE DE LOS TP
// Mismo funcionamiento que Promo QB: pantalla fija de preguntas, explicación de cada opción,
// «No lo sé», modos «sin responder» y «para repasar», panel con el progreso por tema.
// Los bancos se cargan con ET27QIQuiz.add(unidad, {topics, questions}) (quimica-inorganica-4-mc.js).
// Se monta en <div data-qi-quiz="tp5"> (dentro del bloque Practicar de cada TP) y en
// <div data-qi-quiz-panel="tp1,tp2,…"> (inicio de los TP). Las respuestas quedan en este dispositivo.
(function(){
  'use strict';
  const KEY='qi4-mc-v1',NS=-1;
  const BANK={};// unidad -> {topics:{K:{name,c}}, qs:[...]}
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function hash(s){let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
  const all=()=>Object.values(BANK).flatMap(b=>b.qs);

  let st={answers:{},hist:{},per:0,seed:0};
  try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&typeof s==='object')st=Object.assign(st,s)}catch(e){}
  if(!st.seed)st.seed=Math.floor(Math.random()*1e9);
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
  const status=q=>{const a=st.answers[q.id];return a===undefined?'none':a===q.c?'ok':a===NS?'ns':'bad'};

  function add(unit,{topics,questions}){
    const b=BANK[unit]||(BANK[unit]={topics:{},qs:[]});
    Object.assign(b.topics,topics);
    questions.forEach(q=>{q.u=unit;q.id=`${unit}:${q.t}:${hash(q.q+'|'+q.o[0][0]).toString(36)}`;b.qs.push(q)});
  }
  const count=unit=>BANK[unit]?.qs.length||0;

  // ---------- sesión de preguntas ----------
  let ses=null;// {units, topics:Set, mode, order, pos, snap, retry}
  function tally(qs){const c={ok:0,bad:0,ns:0,none:0};qs.forEach(q=>c[status(q)]++);return c}
  function topicKey(q){return `${q.u}:${q.t}`}
  function topicList(units){return units.flatMap(u=>Object.entries(BANK[u]?.topics||{}).map(([k,v])=>({key:`${u}:${k}`,u,k,...v})))}
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  function takeSnap(){
    ses.retry={};
    ses.snap=ses.mode==='all'?null:new Set(all().filter(q=>ses.mode==='new'?status(q)==='none':(status(q)==='bad'||status(q)==='ns')).map(q=>q.id));
  }
  function pool(){return ses.order.map(id=>QID[id]).filter(q=>q&&ses.topics.has(topicKey(q))&&(ses.mode==='all'||ses.snap.has(q.id)))}
  let QID={};
  function open(units,topics,mode){
    QID=Object.fromEntries(all().map(q=>[q.id,q]));
    const qs=units.flatMap(u=>BANK[u]?.qs||[]);
    ses={units,topics:new Set(topics||topicList(units).map(t=>t.key)),mode:mode||'all',order:qs.map(q=>q.id),pos:0};
    takeSnap();
    if(!st.per)st.per=innerWidth>=1100?2:1;
    build();render();
    document.documentElement.classList.add('qxQuizOpen');
  }
  function close(){
    document.getElementById('qxQuiz')?.remove();document.documentElement.classList.remove('qxQuizOpen');ses=null;mount();
  }
  const answerOf=q=>ses.mode==='wrong'?ses.retry[q.id]:st.answers[q.id];
  function rng(seed){let x=seed>>>0||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return((x>>>0)%100000)/100000}}
  function optOrder(q){const a=q.o.map((_,i)=>i);const r=rng(hash(q.id)+st.seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

  function build(){
    document.getElementById('qxQuiz')?.remove();
    const el=document.createElement('div');el.id='qxQuiz';el.className='qxQuiz qx';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Multiple choice');
    el.innerHTML=`<div class="qxQTop"><button class="qxPill" type="button" data-q="back">← Volver</button><div class="qxScore" data-q-score></div><button class="qxPill" type="button" data-q="filters" aria-pressed="false">Filtros</button><button class="qxPill qxWide" type="button" data-q="per"></button></div>
<div class="qxQBar" data-q-bar><i class="ok"></i><i class="bad"></i></div>
<div class="qxQF" data-q-f hidden><div class="qxLbl">Temas</div><div class="qxChipRow" data-q-topics></div><div class="qxLbl">Qué mostrar</div><div class="qxChipRow" data-q-modes></div><div class="qxChipRow"><button class="qxChip" type="button" data-q="shuffle">Mezclar orden</button></div></div>
<div class="qxStage" data-q-stage></div>
<div class="qxQBot"><button class="qxBig" type="button" data-q="prev">← Anterior</button><span class="qxCnt" data-q-cnt></span><button class="qxBig primary" type="button" data-q="next">Siguiente →</button></div>`;
    document.body.appendChild(el);
    el.addEventListener('click',onClick);
    let tx=null,ty=null;const stage=el.querySelector('[data-q-stage]');
    stage.addEventListener('touchstart',e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY},{passive:true});
    stage.addEventListener('touchend',e=>{if(tx===null)return;const t=e.changedTouches[0];const dx=t.clientX-tx,dy=t.clientY-ty;tx=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6)step(dx<0?1:-1)},{passive:true});
  }
  const $=sel=>document.querySelector(`#qxQuiz ${sel}`);
  const per=()=>Math.min(st.per||1,innerWidth<760?1:2);
  function renderFilters(){
    $('[data-q-topics]').innerHTML=topicList(ses.units).map(t=>`<button class="qxChip" type="button" data-topic="${t.key}" style="--c:${t.c}" aria-pressed="${ses.topics.has(t.key)}"><span class="dot"></span>${ses.units.length>1?`TP ${t.u.replace('tp','')} · `:''}${esc(t.name)}<span class="n">${BANK[t.u].qs.filter(q=>q.t===t.k).length}</span></button>`).join('');
    $('[data-q-modes]').innerHTML=Object.entries({all:'Todas',new:'Sin responder',wrong:'Para repasar (mal o no sé)'}).map(([k,v])=>`<button class="qxChip" type="button" data-mode="${k}" aria-pressed="${ses.mode===k}">${v}</button>`).join('');
  }
  function renderScore(){
    const qs=ses.units.flatMap(u=>BANK[u].qs);const c=tally(qs);
    $('[data-q-score]').innerHTML=`<b>${c.ok}</b> bien · <b>${c.bad+c.ns}</b> a repasar · ${c.none} sin hacer`;
    const b=$('[data-q-bar]').children;b[0].style.width=(c.ok/qs.length*100)+'%';b[1].style.width=((c.bad+c.ns)/qs.length*100)+'%';
    $('[data-q="per"]').textContent=st.per===2?'2 por pantalla':'1 por pantalla';
  }
  function cardHTML(q,idx,total){
    const T=BANK[q.u].topics[q.t];const ans=answerOf(q);const done=ans!==undefined;
    const v=!done?'':ans===q.c?'<span class="qxVerdict ok">✓ Correcta</span>':ans===NS?'<span class="qxVerdict ns">? No lo sabías</span>':'<span class="qxVerdict bad">✗ Incorrecta</span>';
    let h=`<div class="qxMeta"><span class="qxTag" style="--c:${T.c}">${ses.units.length>1?`TP ${q.u.replace('tp','')} · `:''}${esc(T.name)}</span>${q.s?`<span class="qxSrc">${esc(q.s)}</span>`:''}${v}<span class="qxQn">${idx+1}/${total}</span></div><p class="qxQText">${q.q}</p><ol class="qxOpts">`;
    optOrder(q).forEach((oi,k)=>{const [txt,why]=q.o[oi];let cls='';if(done)cls=oi===q.c?'is-ok':(oi===ans?'is-bad':'dim');
      h+=`<li><button class="qxOpt ${cls}" type="button" data-qid="${q.id}" data-o="${oi}" ${done?'disabled':''}><span class="k">${'ABCD'[k]}</span><span><span class="lab">${txt}</span>${done&&why?`<span class="why">${why}</span>`:''}</span></button></li>`});
    h+=`</ol><div class="qxNsRow"><button class="qxOpt ns ${done&&ans===NS?'is-ns':''}" type="button" data-qid="${q.id}" data-o="${NS}" ${done?'disabled':''}><span class="k">?</span><span>No lo sé</span></button></div>`;
    if(q.k)h+=`<div class="qxRef">Repasar: <button type="button" class="qxLink" data-goto="qi:${q.u}:${q.k}">${esc(q.r||'la teoría del TP')} →</button></div>`;
    return h;
  }
  function render(keepScroll){
    if(!ses)return;renderFilters();renderScore();
    const p=pool(),n=per(),stage=$('[data-q-stage]');stage.style.setProperty('--per',n);
    if(!p.length){stage.innerHTML=`<p class="qxEmpty">${ses.mode==='wrong'?'No tenés preguntas para repasar en estos temas. 🎉':ses.mode==='new'?'Ya respondiste todas las de estos temas.':'Elegí al menos un tema en Filtros.'}</p>`;$('[data-q="prev"]').disabled=$('[data-q="next"]').disabled=true;$('[data-q-cnt]').textContent='';save();return}
    ses.pos=Math.max(0,Math.min(ses.pos,p.length-1));ses.pos-=ses.pos%n;
    const scrolls=keepScroll?[...stage.querySelectorAll('.qxCard')].map(c=>c.scrollTop):[];
    const items=p.slice(ses.pos,ses.pos+n);
    stage.innerHTML=items.map((q,i)=>{const a=answerOf(q);const cls=a===undefined?'':(a===q.c?'ok':'bad');return `<article class="qxCard ${cls}" data-card="${q.id}">${cardHTML(q,ses.pos+i,p.length)}</article>`}).join('');
    if(keepScroll)stage.querySelectorAll('.qxCard').forEach((c,i)=>{c.scrollTop=scrolls[i]||0;c.style.animation='none'});
    $('[data-q="prev"]').disabled=ses.pos===0;$('[data-q="next"]').disabled=ses.pos+n>=p.length;
    $('[data-q-cnt]').textContent=`${ses.pos+1}${n>1&&items.length>1?'–'+(ses.pos+items.length):''} de ${p.length}`;
    save();
  }
  function step(d){if(!ses)return;const p=pool();const np=ses.pos+d*per();if(np<0||np>=p.length)return;ses.pos=np;render();$('[data-q-stage]').scrollTop=0}
  function onClick(e){
    const t=e.target.closest('button');if(!t)return;
    if(t.dataset.qid!==undefined&&!t.disabled){
      const id=t.dataset.qid,val=+t.dataset.o,q=QID[id];
      if(ses.mode==='wrong')ses.retry[id]=val;st.answers[id]=val;
      const h=st.hist[id]||(st.hist[id]={n:0,miss:0});h.n++;if(val!==q.c)h.miss++;
      render(true);
      const card=$(`[data-card="${CSS.escape(id)}"]`),ok=card?.querySelector('.qxOpt.is-ok');
      if(card&&ok){const r=ok.getBoundingClientRect(),cr=card.getBoundingClientRect();if(r.bottom>cr.bottom||r.top<cr.top)card.scrollTo({top:card.scrollTop+(r.top-cr.top)-60,behavior:'smooth'})}
      return;
    }
    if(t.dataset.topic){const k=t.dataset.topic;ses.topics.has(k)?ses.topics.delete(k):ses.topics.add(k);ses.pos=0;render();return}
    if(t.dataset.mode){ses.mode=t.dataset.mode;ses.pos=0;takeSnap();render();return}
    if(t.dataset.goto){const k=t.dataset.goto;close();(window.ET27GoResult||(()=>{}))(k);return}
    const a=t.dataset.q;
    if(a==='back')close();
    else if(a==='prev')step(-1);
    else if(a==='next')step(1);
    else if(a==='per'){st.per=st.per===2?1:2;render()}
    else if(a==='filters'){const f=$('[data-q-f]');f.hidden=!f.hidden;t.setAttribute('aria-pressed',!f.hidden)}
    else if(a==='shuffle'){shuffle(ses.order);st.seed=Math.floor(Math.random()*1e9);ses.pos=0;render()}
  }
  document.addEventListener('keydown',e=>{
    if(!ses)return;
    if(e.key==='Escape')close();
    else if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1);
    else if(/^[0-4]$/.test(e.key)){const card=$('.qxCard');if(!card)return;const x=e.key==='0'?card.querySelector('.qxOpt.ns'):card.querySelectorAll('.qxOpts .qxOpt')[+e.key-1];if(x&&!x.disabled)x.click()}
  });
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>render(true),150)});

  // ---------- paneles dentro de la página ----------
  function rowHTML(label,c,total,units,topics,color){
    const d=total-c.none,w=x=>(total?x/total*100:0)+'%',tp=topics?` data-topics="${topics}"`:'';
    return `<div class="qxTRow" style="--c:${color}"><div class="nm"><i></i><span>${label}<span class="sub">${d}/${total} respondidas${d?` · ${Math.round(c.ok/d*100)} % bien`:''}</span></span></div><div class="qxSBar"><i class="ok" style="width:${w(c.ok)}"></i><i class="bad" style="width:${w(c.bad)}"></i><i class="ns" style="width:${w(c.ns)}"></i></div><div class="acts"><button class="qxMini hot" type="button" data-practice="${units}"${tp} data-mode="wrong" ${c.bad+c.ns?'':'disabled'}>Repasar ${c.bad+c.ns}</button><button class="qxMini" type="button" data-practice="${units}"${tp} data-mode="new" ${c.none?'':'disabled'}>Nuevas ${c.none}</button><button class="qxMini" type="button" data-practice="${units}"${tp} data-mode="all">Todas</button></div></div>`;
  }
  function tiles(qs){const c=tally(qs),done=qs.length-c.none;return `<div class="qxTiles"><div class="qxTile"><b>${done}<small> / ${qs.length}</small></b><span>respondidas</span></div><div class="qxTile ok"><b>${done?Math.round(c.ok/done*100)+' %':'—'}</b><span>de aciertos (${c.ok} bien)</span></div><div class="qxTile bad"><b>${c.bad+c.ns}</b><span>para repasar (${c.bad} mal · ${c.ns} no sé)</span></div><div class="qxTile"><b>${c.none}</b><span>sin responder</span></div></div>`}
  function unitPanel(u){
    const b=BANK[u];if(!b)return'<p class="qxEmptyNote">Este TP todavía no tiene preguntas cargadas.</p>';
    const rows=Object.entries(b.topics).map(([k,v])=>{const qs=b.qs.filter(q=>q.t===k);return rowHTML(esc(v.name),tally(qs),qs.length,u,`${u}:${k}`,v.c)}).join('');
    const c=tally(b.qs);
    return `${tiles(b.qs)}<div class="qxStart"><button class="qxGo" type="button" data-practice="${u}" data-mode="${c.none===b.qs.length?'all':c.none?'new':'all'}">${c.none===b.qs.length?'Empezar el multiple choice':c.none?`Seguir · ${c.none} sin responder`:'Hacer todas de nuevo'}</button>${c.bad+c.ns?`<button class="qxGo alt" type="button" data-practice="${u}" data-mode="wrong">Repasar las ${c.bad+c.ns} erradas</button>`:''}</div><p class="qxKicker" style="margin-top:22px">Por tema</p><div class="qxRows">${rows}</div>${hard([u])}`;
  }
  function hard(units){
    const qs=units.flatMap(u=>BANK[u]?.qs||[]).filter(q=>st.hist[q.id]?.miss>0).sort((a,b)=>st.hist[b.id].miss-st.hist[a.id].miss).slice(0,8);
    if(!qs.length)return'';
    return `<p class="qxKicker" style="margin-top:22px">Las que más te cuestan</p><ol class="qxHard">${qs.map(q=>{const s=status(q);return `<li><span class="cnt">✗ ${st.hist[q.id].miss}</span><span>${q.q}</span><span class="last">${s==='ok'?'ahora bien ✓':s==='ns'?'última: no sé':'última: mal'}</span></li>`}).join('')}</ol>`;
  }
  function multiPanel(units){
    units=units.filter(u=>BANK[u]);if(!units.length)return'';
    const qs=units.flatMap(u=>BANK[u].qs),c=tally(qs);
    const colors=['#c2366f','#7957c8','#2e8a7c','#3f6aa8','#b07a10','#d0603a'];
    const rows=units.map((u,i)=>{const T=window.ET27_QI4?.units?.find(x=>x.id===u);return rowHTML(`TP ${u.replace('tp','')} · ${esc(T?.short||u)}`,tally(BANK[u].qs),BANK[u].qs.length,u,'',colors[i%colors.length])}).join('');
    return `${tiles(qs)}<div class="qxRows">${rows}</div><div class="qxStart"><button class="qxGo" type="button" data-practice="${units.join(',')}" data-mode="wrong" ${c.bad+c.ns?'':'disabled'}>Repasar todas las erradas (${c.bad+c.ns})</button><button class="qxGo alt" type="button" data-practice="${units.join(',')}" data-mode="all">Mezclar todos los TP</button></div>${hard(units)}`;
  }
  function mount(){
    document.querySelectorAll('[data-qi-quiz]').forEach(el=>{el.className='qxPanel';el.innerHTML=unitPanel(el.dataset.qiQuiz)});
    document.querySelectorAll('[data-qi-quiz-panel]').forEach(el=>{el.className='qxPanel';el.innerHTML=multiPanel(el.dataset.qiQuizPanel.split(',').filter(Boolean))});
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-practice]');if(!b||b.closest('#qxQuiz'))return;
    const units=b.dataset.practice.split(',');open(units,b.dataset.topics?b.dataset.topics.split(','):null,b.dataset.mode||'all');
  });
  window.addEventListener('27x:rendered',mount);
  window.ET27QIQuiz={add,count,mount,open,close,bank:BANK};
})();
