// 27xSOLved · Química Analítica Cualitativa 5.º — orden final de la teoría.
// Sigue el orden de enseñanza de la profesora (guía maestra): Primera prueba (introducción, electrolitos,
// Le Châtelier, teorías) → Segunda prueba (ley de acción de masas, pH, análisis sistemático, casos modelo,
// polipróticos, sales, reguladoras) → precipitación → complejos → redox al final.
// Numera los temas (ÁCIDO-BASE I · 1.ª PRUEBA · 01…) y deja los bloques de ejercicios y evaluaciones al final.
(function(){
  'use strict';
  const data=window.ET27_QAC5;
  if(data){
    const U=id=>data.units.find(u=>u.id===id);
    const ab1=U('acido-base'),ab2=U('acido-base-2');
    if(ab1&&ab2){
      const move=['qac-ab-debiles','qac-ab-kakb','qac-ab-alfa'];
      move.forEach(k=>{const i=ab2.sections.findIndex(s=>s.key===k);if(i>=0)ab1.sections.push(ab2.sections.splice(i,1)[0])});
    }
    const ORDER={
      'acido-base':['intro','electrolitos','lechatelier','teorias','lam','agua','ph','temperatura','magnitud','lista','fuerza','sistematico','metodo','justificar','descripcion','fuertes','caso-fuerte','diluidas','debiles','caso-debil','kakb','alfa','trampas'],
      'acido-base-2':['especiacion','ioncomun','polipro','sulfurico','mezclas','sales5','hidrolisis','kpkc','estrategia','repaso'],
      'buffer':['que-es','requisitos','criterios','henderson','capacidad','nh3','diseno','elegir','disenar','agregados','ejemplos','repaso'],
      'precipitacion':['solubilidad','kps','mezcla','datos','ag2cro4','comparar','ioncomun','precipita','fraccionada','factores','ph','precip-acido','agentes','repaso'],
      'complejos':['complejos','constantes','diamminplata','patron','sin-exceso','cuando-falla','limitante','complejo-acido','ligando','combinar','precip-complejo','condicional','usos','repaso'],
      'redox':['conceptos','acido','basico','oxidantes','pilas','notacion','potenciales','nernst','equilibrio','redox-otro','repaso']
    };
    const short=k=>k.replace(/^qac-[a-z]{2}-/,'');
    // Primera prueba: introducción, electrolitos, Le Châtelier y teorías. El resto de ácido-base y reguladoras: segunda prueba.
    const PRUEBA1=['intro','electrolitos','lechatelier','teorias'];
    // Redox al final (pedido): complejos pasa a ser la sección 5 y redox la 6.
    const cx=U('complejos'),rd=U('redox');if(cx&&rd){cx.n=5;rd.n=6}
    const TOP={'acido-base':'ÁCIDO-BASE I','acido-base-2':'ÁCIDO-BASE II','buffer':'BUFFER','precipitacion':'PRECIPITACIÓN','redox':'REDOX','complejos':'COMPLEJOS'};
    data.units.forEach(u=>{
      const keys=ORDER[u.id]||[];
      const rank=s=>{const i=keys.indexOf(short(s.key));return i<0?99:i};
      const theory=u.sections.filter(s=>!s.exercises),ex=u.sections.filter(s=>s.exercises);
      const rep=s=>/REPASO/.test(s.kicker||'')||/repaso$/.test(s.key);
      theory.sort((a,b)=>(rep(a)?1:0)-(rep(b)?1:0)||rank(a)-rank(b));
      let i=0;theory.forEach(s=>{
        const pr=(u.id==='acido-base'&&PRUEBA1.includes(short(s.key)))?' · 1.ª PRUEBA':(['acido-base','acido-base-2','buffer'].includes(u.id)?' · 2.ª PRUEBA':'');
        s.kicker=`${TOP[u.id]||u.title.toUpperCase()}${rep(s)?'':pr} · ${rep(s)?'REPASO':String(++i).padStart(2,'0')}`});
      u.sections=[...theory,...ex];
    });
    data.units.sort((a,b)=>a.n-b.n);
    if(data.clase){const c5=data.clase.find(c=>c.id==='complejos'),c6=data.clase.find(c=>c.id==='redox');if(c5&&c6){c5.n=5;c6.n=6}}
  }
  // Fin de Analítica Cualitativa: Q.rx / Q.rxs vuelven a la versión original (sin estados automáticos).
  const o=window.ET27QAC&&window.ET27QAC._rx;if(o&&window.ET27QI){window.ET27QI.rx=o.ORX;window.ET27QI.rxs=o.ORXS}
})();
