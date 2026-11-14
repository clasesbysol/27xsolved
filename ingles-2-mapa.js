// 27xSOLved · Inglés 2.º año · mapa mental interactivo de los tiempos verbales.
(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const CLASS='./ingles-2.html';

  const F=(pos,neg,q,sa)=>`<div class="forms">
    <article class="f-pos"><small><i>+</i>AFIRMATIVA</small><div class="formula">${pos[0]}</div>${pos.slice(1).map(x=>`<p class="en">${x}</p>`).join('')}</article>
    <article class="f-neg"><small><i>−</i>NEGATIVA</small><div class="formula">${neg[0]}</div>${neg.slice(1).map(x=>`<p class="en">${x}</p>`).join('')}</article>
    <article class="f-q"><small><i>?</i>PREGUNTA</small><div class="formula">${q[0]}</div>${q.slice(1).map(x=>`<p class="en">${x}</p>`).join('')}</article>
    <article class="f-sa"><small><i>✓</i>RESPUESTA CORTA</small>${sa.map(x=>`<p class="en">${x}</p>`).join('')}</article></div>`;
  const sig=(cls,words)=>`<div class="signals ${cls}">${words.map(w=>`<span>${w}</span>`).join('')}</div>`;
  const rel=ids=>`<h3>Relacionado</h3><div class="related">${ids.map(([id,l])=>`<button type="button" data-open="${id}">${l}</button>`).join('')}</div>`;
  const go=(hash,label)=>`<a class="go-class" href="${CLASS}#${hash}">${label||'Ver la explicación completa en la clase'} →</a>`;

  const NODES={
    center:{c:'c-center',kicker:'MAPA MENTAL',title:'Los tiempos verbales de 2.º año',html:`
      <p>En el año viste <b>cuatro tiempos</b>: dos para hablar del <b>presente</b> y dos para el <b>pasado</b>. En cada par hay uno <b>simple</b> (hechos, rutinas) y uno <b>continuo</b> (algo en desarrollo, con <b>-ing</b>).</p>
      <div class="table-wrap"><table class="conj"><thead><tr><th></th><th>Simple</th><th>Continuous (-ing)</th></tr></thead><tbody>
      <tr><td>Presente</td><td><span class="tag ps">I play</span><br>rutina</td><td><span class="tag pc">I am playing</span><br>ahora</td></tr>
      <tr><td>Pasado</td><td><span class="tag pa">I played</span><br>hecho terminado</td><td><span class="tag pq">I was playing</span><br>estaba pasando</td></tr></tbody></table></div>
      <h3>El truco de los ayudantes</h3><p>Los <b>simples</b> usan la familia <b>DO</b> (do / does / did) para preguntar y negar. Los <b>continuos</b> (y el verbo <i>be</i>) usan la familia <b>BE</b> (am / is / are / was / were).</p>
      ${rel([['present','Presente'],['past','Pasado'],['q','Preguntas'],['pick','¿Cuál uso?']])}${go('inicio','Ir al comienzo de la clase')}`},
    present:{c:'c-present',kicker:'RAMA',title:'Presente',html:`
      <p>Dos formas de hablar del presente. La pregunta clave: <b>¿es algo que pasa siempre o algo que está pasando ahora?</b></p>
      <div class="forms"><article><small style="color:var(--ps)"><i style="background:var(--ps)">S</i>PRESENT SIMPLE</small><p class="en">Mark <b>usually wears</b> casual clothes.</p><p>rutina · always, usually, every day</p></article>
      <article><small style="color:var(--pc)"><i style="background:var(--pc)">C</i>PRESENT CONTINUOUS</small><p class="en">…but today he <b>is wearing</b> a tie.</p><p>ahora · now, today, at the moment</p></article></div>
      ${rel([['ps','Present simple'],['pc','Present continuous'],['past','Pasado']])}${go('presente-contraste','Ver el contraste en la clase')}`},
    past:{c:'c-past',kicker:'RAMA',title:'Pasado',html:`
      <p>Dos formas de hablar del pasado. La pregunta clave: <b>¿es un hecho que pasó, o una escena que estaba en desarrollo?</b></p>
      <div class="forms"><article><small style="color:var(--pa)"><i style="background:var(--pa)">S</i>PAST SIMPLE</small><p class="en">He <b>met</b> Tom Holland.</p><p>hecho · yesterday, in 2012, ago</p></article>
      <article><small style="color:var(--pq)"><i style="background:var(--pq)">C</i>PAST CONTINUOUS</small><p class="en">He <b>was walking</b> in the park.</p><p>escena · at 10:30 last night, while</p></article></div>
      <p>Juntos cuentan una historia: <span class="en">He <b>was walking</b> in the park <b>when</b> he <b>met</b> Tom Holland.</span></p>
      ${rel([['pas','Past simple'],['pac','Past continuous'],['ww','When / while']])}${go('past-simple','Ver el pasado en la clase')}`},
    ps:{c:'c-ps',kicker:'PRESENTE · SIMPLE',title:'Present simple',html:`
      <p><b>Para qué:</b> rutinas, costumbres, gustos y cosas que siempre son verdad. «Yo juego», «ella estudia».</p>
      ${sig('ps',['always','usually','often','sometimes','never','every day','once a week','twice a week'])}
      ${F(['sujeto + verbo (+s con he/she/it)','I <b>play</b> football.','She <b>plays</b> football.'],["don't / doesn't + verbo base","I <b>don't play</b>.","She <b>doesn't play</b>."],['Do / Does + sujeto + verbo base?','<b>Do</b> you <b>play</b>?','<b>Where does</b> Messi <b>live</b>?'],["Yes, I do. / No, I don't.","Yes, she does. / No, she doesn't."])}
      <h3>La -s de he / she / it</h3><p class="en">plays · wears · goes · watches · studies · has</p>
      <h3>Ejemplo de la carpeta</h3><p class="en">Mark gets up at 9:00. He has breakfast at 10:00 and at 11:00 he takes a nap.</p>
      <div class="warn"><b>Error típico</b><span class="en">Does she <s>plays</s>?</span> → <span class="en">Does she <b>play</b>?</span> · <span class="en">He never <s>doesn't</s> combs</span> → <span class="en">He never <b>combs</b></span></div>
      ${rel([['pc','Comparar con present continuous'],['q','Cómo preguntar']])}${go('present-simple')}`},
    pc:{c:'c-pc',kicker:'PRESENTE · CONTINUOUS',title:'Present continuous',html:`
      <p><b>Para qué:</b> lo que está pasando ahora, algo temporario (esta semana) y para describir una foto (qué hacen, qué tienen puesto).</p>
      ${sig('pc',['now','right now','at the moment','today','this week','Look!','Listen!'])}
      ${F(['am / is / are + verbo-ing','They <b>are wearing</b> costumes.','She <b>is listening</b> to music.'],["isn't / aren't / 'm not + -ing","Alice <b>isn't sitting</b> in her usual place."],['Am / Is / Are + sujeto + -ing?','<b>Are</b> the students <b>arriving</b>?','<b>What are</b> they <b>doing</b>?'],["Yes, they are. / No, they aren't.","Yes, she is. / No, she isn't."])}
      <h3>La -ing</h3><p class="en">play → playing · make → making · swim → swimming · sit → sitting · study → studying</p>
      <h3>Ejemplo de la carpeta</h3><p class="en">At Comic Con the fans are waiting to get in and they're wearing costumes.</p>
      <div class="warn"><b>Error típico</b><span class="en">They <s>wearing</s> costumes</span> → <span class="en">They <b>are</b> wearing costumes</span> (falta el am / is / are).</div>
      ${rel([['ps','Comparar con present simple'],['pac','Su «hermano» del pasado']])}${go('present-continuous')}`},
    pas:{c:'c-pas',kicker:'PASADO · SIMPLE',title:'Past simple',html:`
      <p><b>Para qué:</b> hechos terminados en el pasado. Biografías, fechas, lo que hiciste ayer.</p>
      ${sig('pa',['yesterday','last night','last year','two years ago','in 2012','on 13th March 1853','when I was ten'])}
      <h3>Con el verbo be: was / were</h3>
      ${F(['I/he/she/it was · you/we/they were','She <b>was born</b> in New York in 1905.'],["wasn't / weren't","His paintings <b>weren't</b> popular."],['Was / Were + sujeto…?','<b>Where were</b> you born?'],["Yes, she was. / No, they weren't."])}
      <h3>Con los demás verbos: did</h3>
      ${F(['verbo + ed / irregular','He <b>worked</b> in a shop.','Zuckerberg <b>bought</b> Instagram.'],["didn't + verbo base","They <b>didn't go</b> outside."],['Did + sujeto + verbo base?','<b>Who did</b> the boy <b>meet</b>?'],["Yes, he did. / No, he didn't."])}
      <h3>Irregulares que más aparecen</h3><p class="en">go → went · see → saw · meet → met · have → had · buy → bought · think → thought · win → won · teach → taught · make → made · get → got</p>
      <div class="warn"><b>Errores típicos</b><span class="en">She <s>born</s></span> → <span class="en">She <b>was born</b></span> · <span class="en">Did she <s>went</s>?</span> → <span class="en">Did she <b>go</b>?</span> · <span class="en">Where <s>did he be</s>?</span> → <span class="en">Where <b>was</b> he?</span></div>
      ${rel([['pac','Comparar con past continuous'],['ww','Usarlos juntos']])}${go('past-simple')}`},
    pac:{c:'c-pac',kicker:'PASADO · CONTINUOUS',title:'Past continuous',html:`
      <p><b>Para qué:</b> lo que <b>estaba pasando</b> en un momento del pasado, la escena de fondo de una historia, o una acción larga que algo interrumpió.</p>
      ${sig('pq',['at 10:30 last night','at this time yesterday','one hour ago','in 2012','while'])}
      ${F(['was / were + verbo-ing','In 2012, 13 people <b>were working</b> for Instagram.','At 10:30 pm my dad <b>was driving</b>.'],["wasn't / weren't + -ing","They <b>weren't taking</b> photos in the same way."],['Was / Were + sujeto + -ing?','<b>Was</b> he <b>travelling</b> with his daughter?','<b>What was</b> the boy <b>doing</b>?'],["Yes, he was. / No, he wasn't.","Yes, they were. / No, they weren't."])}
      <h3>¿Qué hizo o qué estaba haciendo?</h3><p class="en"><b>What did he do?</b> → He met Tom Holland. (hecho)</p><p class="en"><b>What was he doing?</b> → He was walking in the park. (escena)</p>
      <div class="warn"><b>Error típico</b>Acá no va <i>did</i>: <span class="en"><s>Did he was travelling?</s></span> → <span class="en"><b>Was</b> he travelling?</span> · <span class="en"><s>How the boy was moving?</s></span> → <span class="en">How <b>was</b> the boy moving?</span></div>
      ${rel([['pas','Comparar con past simple'],['ww','Usarlos juntos'],['pc','Su «hermano» del presente']])}${go('past-continuous')}`},
    ww:{c:'c-ww',kicker:'COMBINACIÓN',title:'When / while',html:`
      <p>Una acción <b>larga</b> (past continuous) interrumpida por una <b>corta</b> (past simple).</p>
      <div class="forms"><article><small style="color:var(--pq)"><i style="background:var(--pq)">1</i>WHILE + LARGA</small><p class="en"><b>While</b> Tom <b>was doing</b> his homework, his mum <b>arrived</b>.</p></article>
      <article><small style="color:var(--pa)"><i style="background:var(--pa)">2</i>WHEN + CORTA</small><p class="en">Tom <b>was doing</b> his homework <b>when</b> his mum <b>arrived</b>.</p></article></div>
      <h3>Receta</h3><ol class="recipe"><li>Encontrá las dos acciones.</li><li>La que dura más → <b>was/were + -ing</b>. La corta → <b>past simple</b>.</li><li><b>While</b> va con la larga, <b>when</b> con la corta. Si la oración empieza con while/when, coma en el medio.</li></ol>
      <h3>Ejemplos</h3><p class="en">He <b>had</b> the idea <b>while</b> he <b>was travelling</b> with his daughter.</p><p class="en">They <b>were practising</b> <b>when</b> the robot <b>broke</b>.</p><p class="en"><b>Where were</b> your parents <b>living when</b> they <b>met</b>?</p>
      ${rel([['pas','Past simple'],['pac','Past continuous']])}${go('when-while')}`},
    q:{c:'c-q',kicker:'HERRAMIENTA',title:'Cómo armar preguntas',html:`
      <p>Siempre el mismo orden: <b>Wh- + AUXILIAR + SUJETO + VERBO + resto?</b></p>
      <div class="table-wrap"><table class="conj"><thead><tr><th>Tiempo</th><th>Auxiliar</th><th>Ejemplo</th></tr></thead><tbody>
      <tr><td><span class="tag ps">present simple</span></td><td>do / does + base</td><td class="en">Where <b>does</b> she <b>live</b>?</td></tr>
      <tr><td><span class="tag pc">present continuous</span></td><td>am / is / are + -ing</td><td class="en">What <b>are</b> they <b>wearing</b>?</td></tr>
      <tr><td><span class="tag pa">was / were</span></td><td>was / were</td><td class="en">When <b>were</b> you born?</td></tr>
      <tr><td><span class="tag pa">past simple</span></td><td>did + base</td><td class="en">Who <b>did</b> the boy <b>meet</b>?</td></tr>
      <tr><td><span class="tag pq">past continuous</span></td><td>was / were + -ing</td><td class="en">What <b>was</b> he <b>doing</b>?</td></tr></tbody></table></div>
      <h3>Palabras para preguntar</h3><p>who (quién) · what (qué) · where (dónde) · when (cuándo) · why (por qué → <b>because</b>) · how (cómo) · how often · how long · how old · which</p>
      <div class="tip"><b>La respuesta corta repite el auxiliar</b><span class="en">Did he give up? → No, he didn't.</span> · <span class="en">Were the birds singing? → Yes, they were.</span></div>
      ${go('preguntas')}`},
    ex:{c:'c-ex',kicker:'TEMAS EXTRA',title:'Used to · can/could · comparativos · must',html:`
      <h3>Used to · antes sí, ahora no</h3><p class="en">I <b>used to</b> play tennis, but now I don't. · I <b>didn't use to</b> like comics.</p>
      <h3>Can / could · poder</h3><p class="en">Now I <b>can</b> drive, but when I was ten, I <b>couldn't</b>.</p>
      <h3>Comparativos y superlativos</h3><p class="en">cold → colder than → the coldest · hot → hotter → the hottest · interesting → more interesting → the most interesting · good → better → the best</p>
      <h3>Reglas: must · mustn't · can · can't</h3><p class="en">You <b>must</b> wear a uniform. · You <b>mustn't</b> use your phone. · You <b>can</b> go out. · You <b>can't</b> eat here.</p>
      ${go('extras')}`},
    pick:{c:'c-pick',kicker:'HERRAMIENTA',title:'¿Qué tiempo uso?',html:`<p>Contestá las preguntas y te digo qué tiempo verbal va.</p><div id="flow"></div>`}
  };

  // ---------- Decisor ----------
  const FLOW={
    start:{q:'¿Cuándo pasa lo que querés contar?',a:[['Ahora / en general (presente)','pres'],['En el pasado','past']]},
    pres:{q:'¿Es una rutina o algo que siempre es así, o está pasando justo ahora / hoy?',a:[['Rutina, costumbre, gusto (always, every day…)','=ps'],['Ahora, en este momento, esta semana, describo una foto','=pc']]},
    past:{q:'¿Es un hecho que pasó, o una acción que estaba en desarrollo?',a:[['Un hecho terminado (ayer, en 2012, nació…)','=pas'],['Estaba pasando en un momento (a las 10:30, la escena)','=pac'],['Las dos cosas: algo largo interrumpido por algo corto','=ww']]}
  };
  const RESULT={ps:'Present simple',pc:'Present continuous',pas:'Past simple',pac:'Past continuous',ww:'Past continuous + past simple (when / while)'};
  function renderFlow(step='start',path=[]){
    const box=$('#flow');if(!box)return;
    const crumbs=path.length?`<div class="flow-path">${path.map(p=>`<span>${p}</span>`).join('')}</div>`:'';
    if(step.startsWith('=')){
      const id=step.slice(1);
      box.innerHTML=`${crumbs}<div class="flow-q"><b>Usá: ${RESULT[id]}</b><div class="btns"><button type="button" data-open="${id}">Ver cómo se arma →</button><button type="button" data-flow="start">Empezar de nuevo</button></div></div>`;
      return;
    }
    const s=FLOW[step];
    box.innerHTML=`${crumbs}<div class="flow-q"><b>${s.q}</b><div class="btns">${s.a.map(([l,n])=>`<button type="button" data-flow="${n}" data-label="${l.replace(/"/g,'')}">${l}</button>`).join('')}</div></div>`;
    box._path=path;
  }

  // ---------- Panel ----------
  const drawer=$('#mmDrawer'),scrim=$('#mmScrim'),body=$('#mmBody');
  let lastFocus=null;
  function open(id){
    const n=NODES[id];if(!n||!drawer)return;
    lastFocus=document.activeElement;
    drawer.className=`mm-drawer open ${n.c}`;
    $('#mmKicker').textContent=n.kicker;$('#mmTitle').textContent=n.title;
    body.innerHTML=n.html;body.scrollTop=0;
    scrim.classList.add('open');
    $$('.mm-node').forEach(b=>b.classList.toggle('active',b.dataset.node===id));
    if(id==='pick')renderFlow();
    $('#mmClose').focus({preventScroll:true});
    history.replaceState(null,'',`#${id}`);
  }
  function close(){
    drawer?.classList.remove('open');scrim?.classList.remove('open');
    $$('.mm-node').forEach(b=>b.classList.remove('active'));
    history.replaceState(null,'',location.pathname+location.search);
    lastFocus?.focus?.({preventScroll:true});
  }
  document.addEventListener('click',e=>{
    const node=e.target.closest('[data-node]');if(node){open(node.dataset.node);return}
    const o=e.target.closest('[data-open]');if(o){open(o.dataset.open);return}
    const f=e.target.closest('[data-flow]');
    if(f){const box=$('#flow');const path=f.dataset.flow==='start'?[]:[...(box?._path||[]),f.dataset.label||''];renderFlow(f.dataset.flow,path);return}
    if(e.target.closest('#mmClose')||e.target===scrim)close();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer?.classList.contains('open'))close()});

  // ---------- Líneas del mapa ----------
  const LINKS=[['center','present'],['center','past'],['present','ps'],['present','pc'],['past','pas'],['past','pac'],['past','ww'],['center','q'],['center','ex'],['center','pick']];
  function drawLines(){
    const map=$('#mm'),svg=$('#mmLines');if(!map||!svg)return;
    if(getComputedStyle(svg).display==='none')return;
    const box=map.getBoundingClientRect();
    const at=id=>{const el=$(`[data-node="${id}"]`,map);if(!el)return null;const r=el.getBoundingClientRect();return{x:r.left-box.left+r.width/2,y:r.top-box.top+r.height/2,w:r.width/2,h:r.height/2,c:getComputedStyle(el).getPropertyValue('--c')}};
    svg.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);
    svg.innerHTML=LINKS.map(([a,b])=>{
      const p=at(a),q=at(b);if(!p||!q)return'';
      const dx=q.x-p.x,dy=q.y-p.y;
      const horiz=Math.abs(dx)>Math.abs(dy)*0.8;
      const s=horiz?{x:p.x+Math.sign(dx)*p.w,y:p.y}:{x:p.x,y:p.y+Math.sign(dy)*p.h};
      const t=horiz?{x:q.x-Math.sign(dx)*q.w,y:q.y}:{x:q.x,y:q.y-Math.sign(dy)*q.h};
      const c1=horiz?`${(s.x+t.x)/2} ${s.y}`:`${s.x} ${(s.y+t.y)/2}`,c2=horiz?`${(s.x+t.x)/2} ${t.y}`:`${t.x} ${(s.y+t.y)/2}`;
      return`<path d="M${s.x} ${s.y} C${c1} ${c2} ${t.x} ${t.y}" stroke="${q.c.trim()||'#18324A'}"/>`;
    }).join('');
  }
  let raf=0;const redraw=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(drawLines)};
  addEventListener('resize',redraw);
  if('ResizeObserver'in window&&$('#mm'))new ResizeObserver(redraw).observe($('#mm'));

  // ---------- Conjugador ----------
  const VERBS=[
    ['play','plays','playing','played','football','jugar'],['study','studies','studying','studied','English','estudiar'],
    ['watch','watches','watching','watched','TV','mirar'],['wear','wears','wearing','wore','a uniform','llevar puesto'],
    ['go','goes','going','went','to school','ir'],['have','has','having','had','breakfast','tomar (desayuno)'],
    ['swim','swims','swimming','swam','in the river','nadar'],['write','writes','writing','wrote','a story','escribir'],
    ['make','makes','making','made','dinner','hacer'],['live','lives','living','lived','in Buenos Aires','vivir'],
    ['work','works','working','worked','in a shop','trabajar'],['travel','travels','travelling','travelled','by bus','viajar'],
    ['run','runs','running','ran','in the park','correr'],['read','reads','reading','read','comics','leer'],
    ['listen','listens','listening','listened','to music','escuchar'],['meet','meets','meeting','met','friends','encontrarse con'],
    ['buy','buys','buying','bought','a comic','comprar'],['take','takes','taking','took','photos','sacar'],
    ['do','does','doing','did','homework','hacer'],['eat','eats','eating','ate','pizza','comer'],
    ['dance','dances','dancing','danced','at parties','bailar'],['try','tries','trying','tried','new food','probar']
  ];
  const isRegular=v=>v[3]===v[0]+'ed'||v[3]===v[0]+'d'||v[3]===v[0].replace(/y$/,'ied')||v[3]===v[0]+v[0].slice(-1)+'ed';
  let subj='she',verb=0;
  const third=s=>['he','she','it'].includes(s);
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  function mark(base,form){
    if(form.startsWith(base)&&form.length>base.length)return`${base}<span class="end">${form.slice(base.length)}</span>`;
    const stem=base.replace(/e$/,'').replace(/y$/,'');
    if(form.startsWith(stem)&&stem.length>1&&form!==base)return`${stem}<span class="end">${form.slice(stem.length)}</span>`;
    return form;
  }
  function conjugate(){
    const v=VERBS[verb],[base,s3,ing,past,obj]=v,s=subj,t=third(s);
    const be=s==='I'?'am':t?'is':'are',beN=s==='I'?'am not':t?"isn't":"aren't",was=(s==='I'||t)?'was':'were',wasN=(s==='I'||t)?"wasn't":"weren't";
    const doo=t?'does':'do',dooN=t?"doesn't":"don't";
    const sub=`<span class="s">${s}</span>`,Sub=`<span class="s">${s==='I'?'I':cap(s)}</span>`;
    const V=x=>`<span class="v">${x}</span>`,A=x=>`<span class="aux">${x}</span>`;
    const irr=isRegular(v)?'':'<span class="irr">IRREGULAR</span>';
    const block=(c,title,rows)=>`<article class="c-${c}"><h3>${title}</h3>${rows.map(([i,txt])=>`<p class="en"><i>${i}</i>${txt}</p>`).join('')}</article>`;
    const out=[
      block('ps','Present simple · every day',[['+',`${Sub} ${V(t?mark(base,s3):base)} ${obj} every day.`],['−',`${Sub} ${A(dooN)} ${V(base)} ${obj} every day.`],['?',`${A(cap(doo))} ${sub} ${V(base)} ${obj} every day?`],['✓',`Yes, ${s==='I'?'I':s} ${doo}. / No, ${s==='I'?'I':s} ${dooN}.`]]),
      block('pc','Present continuous · now',[['+',`${Sub} ${A(be)} ${V(mark(base,ing))} ${obj} now.`],['−',`${Sub} ${A(beN)} ${V(mark(base,ing))} ${obj} now.`],['?',`${A(cap(be))} ${sub} ${V(mark(base,ing))} ${obj} now?`],['✓',`Yes, ${s==='I'?'I':s} ${be}. / No, ${s==='I'?"I'm not":s+' '+beN}.`]]),
      block('pas',`Past simple · yesterday ${irr}`,[['+',`${Sub} ${V(isRegular(v)?mark(base,past):past)} ${obj} yesterday.`],['−',`${Sub} ${A("didn't")} ${V(base)} ${obj} yesterday.`],['?',`${A('Did')} ${sub} ${V(base)} ${obj} yesterday?`],['✓',`Yes, ${s==='I'?'I':s} did. / No, ${s==='I'?'I':s} didn't.`]]),
      block('pac','Past continuous · at 8 pm yesterday',[['+',`${Sub} ${A(was)} ${V(mark(base,ing))} ${obj} at 8 pm yesterday.`],['−',`${Sub} ${A(wasN)} ${V(mark(base,ing))} ${obj} at 8 pm yesterday.`],['?',`${A(cap(was))} ${sub} ${V(mark(base,ing))} ${obj} at 8 pm yesterday?`],['✓',`Yes, ${s==='I'?'I':s} ${was}. / No, ${s==='I'?'I':s} ${wasN}.`]])
    ];
    $('#conjOut').innerHTML=out.join('');
    $('#conjMeaning').textContent=`${base} = ${v[5]} · ${t?base+' → '+s3+' · ':''}-ing: ${ing} · pasado: ${past}`;
  }
  function setupConj(){
    const sel=$('#conjVerb');if(!sel)return;
    sel.innerHTML=VERBS.map((v,i)=>`<option value="${i}">${v[0]} (${v[5]})</option>`).join('');
    sel.addEventListener('change',()=>{verb=+sel.value;conjugate()});
    $$('#conjPron button').forEach(b=>b.addEventListener('click',()=>{subj=b.dataset.p;$$('#conjPron button').forEach(x=>x.classList.toggle('sel',x===b));conjugate()}));
    $$('#conjPron button').forEach(b=>b.classList.toggle('sel',b.dataset.p===subj));
    conjugate();
  }

  // ---------- Juego: ¿qué tiempo es? ----------
  const QUIZ=[
    ['ps','She <mark>usually</mark> wears jeans.','usually = rutina'],['ps','My dad watches TV <mark>every evening</mark>.','every evening = rutina'],
    ['ps','<mark>Do</mark> you play any sports?','do + verbo base'],['ps',"Kate <mark>doesn't</mark> wear a uniform at weekends.","doesn't + verbo base"],
    ['ps','He <mark>never</mark> combs his hair.','never = frecuencia'],['pc','<mark>Look!</mark> The fans are waiting outside.','Look! = está pasando ahora'],
    ['pc',"I'm studying for a test <mark>this week</mark>.",'am + -ing, algo temporario'],['pc','What <mark>are</mark> they <mark>wearing</mark>?','are + -ing'],
    ['pc',"Alice <mark>isn't sitting</mark> in her usual place.","isn't + -ing"],['pc','<mark>Listen!</mark> Someone is singing.','Listen! = ahora'],
    ['pas','Van Gogh <mark>was born</mark> in 1853.','was born + año'],['pas','Zuckerberg <mark>bought</mark> Instagram <mark>in 2012</mark>.','bought = pasado de buy'],
    ['pas','<mark>Did</mark> you see the film <mark>last night</mark>?','did + verbo base'],['pas',"They <mark>didn't go</mark> outside yesterday.","didn't + verbo base"],
    ['pas','She <mark>swam</mark> 22 extra kilometres.','swam = pasado de swim'],['pac','<mark>At 10:30 pm</mark> my dad <mark>was driving</mark>.','was + -ing en un momento del pasado'],
    ['pac','In 2012, 13 people <mark>were working</mark> for Instagram.','were + -ing'],['pac','What <mark>was</mark> the boy <mark>doing</mark>?','was + -ing'],
    ['pac','The birds <mark>were singing</mark>.','were + -ing'],['pac',"They <mark>weren't taking</mark> photos in the same way.","weren't + -ing"]
  ];
  const NAMES={ps:'Present simple',pc:'Present continuous',pas:'Past simple',pac:'Past continuous'};
  let order=[],qi=0,score=0,tries=0,answered=false;
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  function nextQ(){
    if(!order.length||qi>=order.length){order=shuffle([...QUIZ.keys()]);qi=0}
    const [ans,html]=QUIZ[order[qi]];answered=false;
    $('#quizSent').innerHTML=html.replace(/<\/?mark>/g,'');
    $('#quizFb').innerHTML='';
    $$('#quizOpts button').forEach(b=>{b.classList.remove('right','wrong');b.disabled=false});
    $('#quizSent').dataset.ans=ans;
  }
  function setupQuiz(){
    if(!$('#quizOpts'))return;
    $$('#quizOpts button').forEach(b=>b.addEventListener('click',()=>{
      if(answered)return;answered=true;tries++;
      const [ans,html,why]=QUIZ[order[qi]];
      const ok=b.dataset.t===ans;if(ok)score++;
      b.classList.add(ok?'right':'wrong');
      $$('#quizOpts button').forEach(x=>{if(x.dataset.t===ans)x.classList.add('right');x.disabled=true});
      $('#quizSent').innerHTML=html;
      $('#quizFb').innerHTML=`${ok?'✓ ¡Bien!':'✗ Era <b>'+NAMES[ans]+'</b>.'} La pista: ${why}. <button type="button" class="opt" data-open="${ans}" style="margin-left:6px">Repasar</button>`;
      $('#quizScore').textContent=`${score} / ${tries}`;
      qi++;
    }));
    $('#quizNext').addEventListener('click',nextQ);
    nextQ();
  }

  function init(){
    setupConj();setupQuiz();drawLines();setTimeout(drawLines,300);
    const h=location.hash.slice(1);if(NODES[h])open(h);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  addEventListener('load',redraw);
})();
