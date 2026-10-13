// 27xSOLved · Química Analítica Cualitativa 5.º — orden final: numera los temas de teoría de cada sección
// (ÁCIDO-BASE · 01, 02…) y deja los bloques de ejercicios y evaluaciones al final.
(function(){
  'use strict';
  const data=window.ET27_QAC5;if(!data)return;
  const TOP={'acido-base':'ÁCIDO-BASE','buffer':'BUFFER','precipitacion':'PRECIPITACIÓN','redox':'REDOX','complejos':'COMPLEJOS'};
  data.units.forEach(u=>{
    const theory=u.sections.filter(s=>!s.exercises),ex=u.sections.filter(s=>s.exercises);
    let i=0;theory.forEach(s=>{const rep=/REPASO$/.test(s.kicker||'');s.kicker=`${TOP[u.id]||u.title.toUpperCase()} · ${rep?'REPASO':String(++i).padStart(2,'0')}`});
    u.sections=[...theory.filter(s=>!/REPASO/.test(s.kicker)),...theory.filter(s=>/REPASO/.test(s.kicker)),...ex];
  });
})();
