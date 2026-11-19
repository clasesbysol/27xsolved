// 27xSOLved · Química Inorgánica 4.º · ORDEN DE LOS TRABAJOS PRÁCTICOS
// Se carga después de todos los archivos de Inorgánica. Deja cada TP armado igual que los demás:
//   1 Antes del laboratorio · 2 Teoría del TP · 3 Ensayos · 4 Ejercicios resueltos · 5 Practicar
// La teoría de cada TP estaba en unidades sueltas de «Material teórico» (part 'tp', kind 'apoyo');
// acá se muda adentro de su TP. Los `key` de las secciones NO cambian; cambia la unidad que las
// contiene, así que se deja registrado en ET27_QI4.moved para traducir los permisos ya guardados
// (ver access-tree.js → migrate).
(function(){
  'use strict';
  const D=window.ET27_QI4;if(!D||!D.units)return;
  const unit=id=>D.units.find(u=>u.id===id);

  // Material teórico que pasa a ser la teoría de cada TP (en este orden).
  const THEORY={tp4:['hidrogeno-oxigeno','grupos-1-2'],tp5:['bloque-p','carbono','nitrogeno'],tp6:['calcogenos','halogenos']};
  const TABS={tp4:'Hidrógeno y oxígeno',tp5:'Carbono y nitrógeno',tp6:'Azufre y halógenos'};
  const BLOCKS=[
    ['antes','Antes del laboratorio','Qué se hace en el TP, seguridad y cómo se arma el informe.'],
    ['teoria','Teoría del TP','La química que hay que saber para entender cada ensayo.'],
    ['ensayos','Ensayos de laboratorio','La guía explicada ensayo por ensayo: qué se hace, qué se ve, qué reacción ocurre.'],
    ['resueltos','Ejercicios resueltos','Cuestionarios, evaluaciones y problemas de las guías, resueltos paso a paso.'],
    ['practicar','Practicar','Multiple choice para fijar los conceptos del TP.']
  ];
  D.blocks=BLOCKS;
  const ORDER=Object.fromEntries(BLOCKS.map(([k],i)=>[k,i]));

  const moved={};// 'apoyo/carbono' -> {to:'tp/tp5', keys:[...]}
  const relink={};// unidad vieja -> unidad nueva (para los botones data-result-go)

  for(const [tp,list] of Object.entries(THEORY)){
    const u=unit(tp);if(!u)continue;
    const theory=[];
    list.forEach(id=>{
      const src=unit(id);if(!src)return;
      (src.sections||[]).forEach(s=>theory.push({...s,block:'teoria',from:src.title}));
      moved[`apoyo/${id}`]={to:`tp/${tp}`,keys:(src.sections||[]).map(s=>s.key)};
      relink[id]=tp;
      D.units.splice(D.units.indexOf(src),1);
    });
    u.sections=[...theory,...u.sections];
  }

  const blockOf=(u,s)=>{
    if(s.block)return s.block;
    const k=s.key.replace(`qi-${u.id}-`,'');
    if(k==='intro'||k==='lab')return'antes';
    if(k==='metodo')return'teoria';
    if(/^(c\d|ensayo|resumen)/.test(k))return'ensayos';
    if(/(evaluacion|evaluaciones|cuestionario|practica|errores|resueltos)$/.test(k))return'resueltos';
    if(k==='practicar')return'practicar';
    return'teoria';
  };

  const tps=D.units.filter(u=>u.part==='tp'&&u.kind!=='apoyo');
  tps.forEach(u=>{
    u.kind='tp';
    // Práctica de multiple choice (el banco lo carga quimica-inorganica-4-mc.js).
    if(!u.sections.some(s=>s.key===`qi-${u.id}-practicar`))u.sections.push({key:`qi-${u.id}-practicar`,label:'Multiple choice del TP',kicker:'',block:'practicar',html:`<p>Preguntas teóricas del TP: observaciones, ecuaciones, propiedades y conceptos. Cada opción tiene su explicación, así que sirve tanto para practicar como para repasar. Tus respuestas quedan guardadas en este dispositivo.</p><div data-qi-quiz="${u.id}"></div>`});
    u.sections.forEach((s,i)=>{s.block=blockOf(u,s);s._i=/-metodo$/.test(s.key)?-1:i});
    u.sections.sort((a,b)=>(ORDER[a.block]-ORDER[b.block])||(a._i-b._i));
    const count={};
    u.sections.forEach(s=>{count[s.block]=(count[s.block]||0)+1;const name=BLOCKS[ORDER[s.block]][1].toUpperCase();s.kicker=`TP ${u.n} · ${name} · ${String(count[s.block]).padStart(2,'0')}`;delete s._i});
    u.numLabel=`TP ${u.n}`;
    u.tab=u.tab||TABS[u.id]||u.short;
  });

  // La caja de herramientas queda como material común de todos los TP.
  const tools=unit('herramientas');
  if(tools){tools.n=0;tools.short='Herramientas';tools.title='Caja de herramientas de los TP';tools.lead='Lo que se usa en todos los TP: leer y escribir reacciones, números de oxidación, ion-electrón y cálculos de laboratorio.'}

  // Los botones «Material teórico: …» apuntaban a la unidad vieja.
  const fix=h=>String(h).replace(/data-result-go="qi:([a-z0-9-]+)(:|")/g,(m,id,end)=>relink[id]?`data-result-go="qi:${relink[id]}${end}`:m);
  D.units.forEach(u=>(u.sections||[]).forEach(s=>{s.html=fix(s.html)}));
  D.units.forEach(u=>(u.exercises||[]).forEach(e=>{e.statement=fix(e.statement);e.solution=fix(e.solution)}));
  D.moved=moved;
  D.relink=relink;
})();
