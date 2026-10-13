// 27xSOLved · Química Analítica Cualitativa 5.º — orden final de la teoría.
// Reparte los temas de ácido-base entre la Parte I y la Parte II, ordena cada sección,
// numera los temas (ÁCIDO-BASE I · 01…) y deja los bloques de ejercicios y evaluaciones al final.
(function(){
  'use strict';
  const data=window.ET27_QAC5;if(!data)return;
  const U=id=>data.units.find(u=>u.id===id);
  const ab1=U('acido-base'),ab2=U('acido-base-2');
  if(ab1&&ab2){
    const move=['qac-ab-debiles','qac-ab-kakb','qac-ab-alfa'];
    move.forEach(k=>{const i=ab2.sections.findIndex(s=>s.key===k);if(i>=0)ab1.sections.push(ab2.sections.splice(i,1)[0])});
    const order=(u,keys)=>{const rank=k=>{const i=keys.indexOf(k.replace('qac-ab-',''));return i<0?99:i};u.sections.sort((a,b)=>(a.exercises?1:0)-(b.exercises?1:0)||rank(a.key)-rank(b.key))};
    order(ab1,['metodo','justificar','teorias','lechatelier','agua','ph','temperatura','lam','lista','fuerza','fuertes','diluidas','debiles','kakb','alfa','descripcion','trampas']);
    order(ab2,['especiacion','ioncomun','polipro','mezclas','hidrolisis','kpkc','estrategia','repaso']);
  }
  const TOP={'acido-base':'ÁCIDO-BASE I','acido-base-2':'ÁCIDO-BASE II','buffer':'BUFFER','precipitacion':'PRECIPITACIÓN','redox':'REDOX','complejos':'COMPLEJOS'};
  data.units.forEach(u=>{
    const theory=u.sections.filter(s=>!s.exercises),ex=u.sections.filter(s=>s.exercises);
    const rep=s=>/REPASO/.test(s.kicker||'')||/repaso$/.test(s.key);
    const ordered=[...theory.filter(s=>!rep(s)),...theory.filter(rep)];
    let i=0;ordered.forEach(s=>{s.kicker=`${TOP[u.id]||u.title.toUpperCase()} · ${rep(s)?'REPASO':String(++i).padStart(2,'0')}`});
    u.sections=[...ordered,...ex];
  });
  data.units.sort((a,b)=>a.n-b.n);
})();
