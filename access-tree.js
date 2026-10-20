// 27xSOLved · Árbol de contenidos para los permisos (un árbol propio por materia).
//
// Cada materia define su organización real: secciones principales → unidades o bloques →
// capítulos o temas → bloques de ejercicios. Los nodos se identifican con una ruta estable
// separada por "/" (por ejemplo "teoria/cinetica/qg5-ley"). La raíz de la materia es "*".
//
// Reglas de permisos (ver access-control.js):
//   · Tildar un nodo habilita ese nodo y TODO lo que tenga adentro, incluido el contenido que
//     se agregue después dentro de ese nodo (política "sección completa").
//   · Lo que no esté cubierto por una selección queda bloqueado. Un capítulo nuevo dentro de una
//     unidad con selección parcial NO se habilita solo.
//   · Las reglas, fórmulas y tablas de consulta laterales (machete) quedan disponibles para
//     cualquier alumno que tenga algún permiso dentro de la materia.
//
// Cómo agregar o editar una materia (sin tocar el panel):
//   · Si la materia vive en materia.html con las secciones estándar (Resumen, Mapa mental,
//     Ejercicios, Parciales) no hace falta nada: se usa el árbol por defecto.
//   · Si tiene otra organización, agregá una entrada en DEFS con `children` (estático) o
//     `build()` (generado a partir de los datos cargados) y, si la página es estática, el mapa
//     `pages` de id de sección del HTML → ruta del árbol.
//   · kind:'exercises' marca un bloque de ejercicios (con sus resoluciones).
(function(){
  'use strict';

  const node=(key,label,extra={})=>({key,label,...extra});
  const clean=s=>String(s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();

  // ---------- Matemática · 1.º año (páginas estáticas) ----------
  // Títulos tomados de los índices reales de matematica-1-examen-1.html y matematica-1.html.
  const MATH1={
    label:'Matemática',
    rules:'Las reglas y fórmulas del costado quedan siempre visibles para quien tenga acceso a Matemática.',
    children:[
      node('clases','Clases',{kind:'section',children:[
        node('ex1','01 · Cálculos combinados y ecuaciones',{kind:'unit',children:[
          node('teoria','01 · Ruta desde cero'),
          node('decimales','02 · Fracciones y decimales'),
          node('potencias','03 · Potenciación'),
          node('raices','04 · Radicación'),
          node('ecuaciones','05 · Ecuaciones'),
          node('machete','09 · Machete final')
        ]}),
        node('ex2','02 · Ángulos y triángulos',{kind:'unit',children:[
          node('ruta','01 · Ruta de clase'),
          node('base','02 · Base desde cero'),
          node('relaciones','03 · Relaciones entre ángulos'),
          node('paralelas','04 · Paralelas y transversal'),
          node('triangulos','05 · Triángulos'),
          node('metodo','06 · Método de resolución'),
          node('machete','09 · Machete final')
        ]})
      ]}),
      node('previas','Previas por parcial',{kind:'section',children:[
        node('ex1','Examen 1 · Cálculos y ecuaciones',{kind:'unit',children:[
          node('modelos','06 · Prueba de referencia (5 modelos)',{kind:'exercises',tags:['eval']}),
          node('practica','07 · Práctica nueva (10 cálculos + 10 ecuaciones)',{kind:'exercises'}),
          node('desafio','08 · Ultra difíciles',{kind:'exercises'})
        ]}),
        node('ex2','Examen 2 · Ángulos y triángulos',{kind:'unit',children:[
          node('modelos','07 · Modelos del examen (4 modelos)',{kind:'exercises',tags:['eval']}),
          node('practica','08 · Práctica nueva (12 ejercicios)',{kind:'exercises'})
        ]})
      ]})
    ],
    // id de <section> en cada página → ruta del árbol
    pages:{
      'matematica-1-examen-1.html':{teoria:'clases/ex1/teoria',decimales:'clases/ex1/decimales',potencias:'clases/ex1/potencias',raices:'clases/ex1/raices',ecuaciones:'clases/ex1/ecuaciones',machete:'clases/ex1/machete',modelos:'previas/ex1/modelos',practica:'previas/ex1/practica',desafio:'previas/ex1/desafio'},
      'matematica-1.html':{ruta:'clases/ex2/ruta',base:'clases/ex2/base',relaciones:'clases/ex2/relaciones',paralelas:'clases/ex2/paralelas',triangulos:'clases/ex2/triangulos',metodo:'clases/ex2/metodo',machete:'clases/ex2/machete',modelos:'previas/ex2/modelos',practica:'previas/ex2/practica'}
    }
  };

  // ---------- Química General · 4.º (datos de quimica-general-4-*.js) ----------
  function buildQG(){
    const units=window.ET27_QG4?.units||[];
    return [node('teoria','Teoría',{kind:'section',children:units.map(u=>node(u.id,`Unidad ${u.n} · ${clean(u.title)}`,{kind:'unit',pending:!!u.pending,children:(u.sections||[]).map(x=>node(x.key,clean(x.label),/data-qg-(guide|modelo)/.test(x.html||'')?{kind:'exercises'}:{}))}))})];
  }

  // ---------- Química Inorgánica · 4.º ----------
  const QI_PARTS=[['teoria','Teoría'],['tp','Trabajos prácticos'],['apoyo','Material teórico de los TP'],['elementos','Fichas de elementos']];
  function qiPart(u){return u.part==='tp'&&u.kind==='apoyo'?'apoyo':u.part}
  function qiUnitPath(u){const part=qiPart(u);return part==='elementos'?'elementos':`${part}/${u.id}`}
  function buildQI(){
    const units=[...(window.ET27_QI4?.units||[])].sort((a,b)=>a.n-b.n);
    const secs=u=>(u.sections||[]).map(x=>node(x.key,clean(x.label),/data-qi-guide/.test(x.html||'')?{kind:'exercises'}:{}));
    return QI_PARTS.map(([key,label])=>{
      const list=units.filter(u=>qiPart(u)===key);
      if(!list.length)return null;
      if(key==='elementos')return node('elementos',label,{kind:'section',children:list.flatMap(secs)});
      return node(key,label,{kind:'section',children:list.map(u=>node(u.id,key==='teoria'?`Unidad ${u.n} · ${clean(u.title)}`:clean(u.title),{kind:'unit',pending:!!u.pending,children:secs(u)}))});
    }).filter(Boolean);
  }

  // ---------- Química Analítica Cualitativa · 5.º ----------
  function buildQAC(){
    const d=window.ET27_QAC5||{};
    const units=[...(d.units||[])].sort((a,b)=>a.n-b.n),clase=[...(d.clase||[])].sort((a,b)=>a.n-b.n);
    const unit=(u,exercises)=>node(u.id,`Sección ${u.n} · ${clean(u.short||u.title)}`,{kind:'unit',children:(u.sections||[]).map(x=>node(x.key,clean(x.label),exercises&&x.exercises?{kind:'exercises'}:{}))});
    return [
      node('teoria','Teoría',{kind:'section',children:units.map(u=>unit(u,true))}),
      node('clase','Para la clase',{kind:'section',children:clase.map(u=>unit(u,false))}),
      node('tp','Trabajos prácticos',{kind:'section',pending:true})
    ];
  }

  // ---------- Física Aplicada · 4.º ----------
  function buildPhysics(){
    const p=window.ET27_PHYSICS||{guide:[],practice:[]};
    const h=window.ET27_HIDRO||{sections:[]};
    return [
      node('tension','Tema 1 · Tensión superficial',{kind:'unit',children:[
        node('teoria','Teoría ampliada · Tensión superficial'),
        node('metodos','Métodos de medición · Cómo se mide γ'),
        node('guia',`Guía original · ${p.guide?.length||0} consignas resueltas`,{kind:'exercises',legacyAnswers:true}),
        node('practica',`Práctica nueva · ${p.practice?.length||0} ejercicios`,{kind:'exercises',legacyAnswers:true}),
        node('evaluaciones','Modelos de evaluación',{kind:'exercises',tags:['eval']})
      ]}),
      node('hidro','Tema 2 · Circulación de fluidos',{kind:'unit',children:(h.sections||[]).map(x=>node(x.key,clean(x.label),['hidro-guia','hidro-ejercicios-caudal'].includes(x.key)?{kind:'exercises',legacyAnswers:true}:{}))})
    ];
  }

  // ---------- Procesos y Operaciones Químicas · 4.º (materia.html + unidades 4 y 5) ----------
  const PROCESOS={
    label:'Procesos y Operaciones Químicas',
    rules:'La hoja de fórmulas del costado queda siempre visible para quien tenga acceso a la materia.',
    children:[
      node('u4','Unidad 4 · Primer principio de la Termodinámica',{kind:'unit',children:[
        node('resumen','Resumen teórico'),
        node('mapa','Mapa mental'),
        node('ejercicios','Ejercicios de la guía (10)',{kind:'exercises'}),
        node('parciales','Evaluaciones (4 modelos)',{kind:'exercises',tags:['eval']})
      ]}),
      node('u5','Unidad 5 · Segundo principio — Entropía',{kind:'unit',children:[
        node('simbolos','Símbolos y unidades'),
        node('teoria','Teoría'),
        node('mapa','Mapa para elegir el camino'),
        node('ejercicios','Los nueve ejercicios de la guía',{kind:'exercises',legacyTheory:true}),
        node('original','Material original completo'),
        node('errores','Antes de entregar')
      ]})
    ],
    pages:{'materia.html':{resumen:'u4/resumen',mapa:'u4/mapa',ejercicios:'u4/ejercicios',parciales:'u4/parciales','u5-simbolos':'u5/simbolos','u5-teoria':'u5/teoria','u5-mapa':'u5/mapa','u5-ejercicios':'u5/ejercicios','u5-original':'u5/original','u5-errores':'u5/errores'}}
  };

  // ---------- Materias con la estructura estándar de materia.html ----------
  const STANDARD_CHILDREN=()=>[
    node('resumen','Resumen'),
    node('mapa','Mapa mental'),
    node('ejercicios','Ejercicios',{kind:'exercises'}),
    node('parciales','Parciales',{kind:'exercises',tags:['eval']})
  ];
  const STANDARD_PAGES={'materia.html':{resumen:'resumen',mapa:'mapa',ejercicios:'ejercicios',parciales:'parciales'}};

  const DEFS={
    'matematica-1':MATH1,
    'quimica-general-4':{label:'Química General',build:buildQG,legacyStatements:true,standalone:{'quimica-general.html':'*'}},
    'quimica-inorganica-4':{label:'Química Inorgánica',build:buildQI,legacyStatements:true,hasOwnTp:true},
    'quimica-analitica-cualitativa-5':{label:'Química Analítica Cualitativa',build:buildQAC,legacyStatements:true,hasOwnTp:true,rules:'El machete y las tablas de constantes quedan siempre disponibles para quien tenga acceso a la materia.'},
    'fisica-aplicada-4':{label:'Física Aplicada',build:buildPhysics,rules:'La hoja de fórmulas A4 queda siempre disponible para quien tenga acceso a la materia.',standalone:{'fisica-aplicada.html':'*','fisica-formulas-a4.html':'@rules'}},
    'procesos-operaciones-4':PROCESOS
  };

  // ---------- Catálogo ----------
  function catalog(){return (window.ET27_ACADEMIC_CATALOG?.years||[]).flatMap(y=>(y.subjects||[]).map(s=>({...s,year:y.year})))}
  const tpName=n=>String(n||'').replace(/^TP\s*\/\s*Laboratorio de\s*/i,'').trim().toLowerCase();
  // TP / Laboratorio aparece en el catálogo como entrada propia, pero sus permisos viven dentro
  // de la materia (sección "tp"). Devuelve {subject, prefix} para cualquier id del catálogo.
  function resolve(id){
    const all=catalog();
    const item=all.find(s=>s.id===id);
    if(item&&item.kind!=='Materia'){
      const parent=all.find(s=>s.kind==='Materia'&&s.year===item.year&&s.name.toLowerCase()===tpName(item.name));
      if(parent)return{subject:parent.id,prefix:'tp'};
    }
    return{subject:id,prefix:''};
  }
  function tpOf(subjectId){
    const all=catalog();const s=all.find(x=>x.id===subjectId);if(!s)return null;
    return all.find(x=>x.kind!=='Materia'&&x.year===s.year&&tpName(x.name)===s.name.toLowerCase())||null;
  }

  // ---------- Árbol ----------
  function withPaths(children,parent=''){
    return (children||[]).map(c=>{
      const path=parent?`${parent}/${c.key}`:c.key;
      return{...c,path,children:c.children?withPaths(c.children,path):undefined};
    });
  }
  const cache=new Map();
  function tree(subjectId){
    const def=DEFS[subjectId]||{};
    let children=def.build?def.build():def.children?def.children.map(x=>({...x})):STANDARD_CHILDREN();
    const tp=tpOf(subjectId);
    if(tp&&!def.hasOwnTp&&!children.some(c=>c.key==='tp'))children=[...children,node('tp',`TP / Laboratorio${tp.status?` · ${tp.status}`:''}`,{kind:'section',external:true})];
    const name=catalog().find(s=>s.id===subjectId)?.name||def.label||subjectId;
    const root={key:'*',path:'*',label:name,kind:'subject',children:withPaths(children),rules:def.rules||''};
    const sig=JSON.stringify(root);
    const hit=cache.get(subjectId);
    if(hit&&hit.sig===sig)return hit.root;
    cache.set(subjectId,{sig,root});
    return root;
  }
  function walk(n,fn,parent=null){fn(n,parent);(n.children||[]).forEach(c=>walk(c,fn,n))}
  function find(subjectId,path){let hit=null;walk(tree(subjectId),n=>{if(n.path===path)hit=n});return hit}
  function leaves(n){const out=[];walk(n,x=>{if(!x.children?.length)out.push(x)});return out}
  function pageMap(subjectId,file){
    const def=DEFS[subjectId];
    if(def?.pages)return def.pages[file]||null;
    return STANDARD_PAGES[file]||null;
  }

  // ---------- Conjuntos de rutas ----------
  const covers=(granted,path)=>granted.has('*')||[...granted].some(g=>path===g||path.startsWith(`${g}/`));
  const touches=(granted,path)=>path==='*'?granted.size>0:covers(granted,path)||[...granted].some(g=>g.startsWith(`${path}/`));

  // Compacta una selección: si todos los hijos de un nodo están cubiertos, se guarda el nodo
  // (sección completa, que incluye lo que se agregue después adentro). Las rutas que ya no
  // existen en el árbol actual se conservan para no perder permisos por un cambio de contenido.
  function compress(subjectId,granted){
    granted=new Set(granted);
    if(granted.has('*'))return['*'];
    const root=tree(subjectId);
    const known=new Set();walk(root,n=>known.add(n.path));
    const full=n=>covers(granted,n.path)||(!!n.children?.length&&n.children.every(full));
    if(root.children.length&&root.children.every(full))return['*'];
    const out=[];
    const collect=n=>{if(full(n)){out.push(n.path);return}(n.children||[]).forEach(collect)};
    root.children.forEach(collect);
    const kept=new Set(out);
    const unknown=[...granted].filter(g=>!known.has(g)&&!covers(kept,g));
    return[...new Set([...out,...unknown])].sort();
  }

  // Tilda o destilda un nodo y devuelve el nuevo conjunto (ya compactado).
  function toggle(subjectId,granted,path,on){
    const set=new Set(granted);
    if(on){set.add(path);return new Set(compress(subjectId,set))}
    if(path==='*')return new Set();
    const root=tree(subjectId);
    if(set.has('*')){set.delete('*');root.children.forEach(c=>set.add(c.path))}
    let n=root;
    while(n&&n.path!==path){
      const next=(n.children||[]).find(c=>path===c.path||path.startsWith(`${c.path}/`));
      if(!next)break;
      if(next.path!==path&&set.has(next.path)){set.delete(next.path);(next.children||[]).forEach(c=>set.add(c.path))}
      n=next;
    }
    [...set].forEach(g=>{if(g===path||g.startsWith(`${path}/`))set.delete(g)});
    return new Set(compress(subjectId,set));
  }

  // Estado visual de un nodo: 'on' | 'partial' | 'off'.
  function state(subjectId,granted,n){
    if(covers(granted,n.path))return'on';
    return touches(granted,n.path)?'partial':'off';
  }

  // ---------- Compatibilidad con los permisos anteriores ----------
  // Traduce las filas viejas de access_grants (unit/*, resource/theory, evaluation/*,
  // chapter/<unidad>, practice/<unidad>, resource/methods…) a rutas del árbol.
  function legacyLevel(rows){
    const legacy=rows.filter(g=>g.grant_type!=='node');
    if(!legacy.length)return null;
    if(legacy.some(g=>g.grant_type==='chapter'||g.grant_type==='practice'))return'custom';
    const theory=legacy.some(g=>g.grant_type==='resource'&&g.grant_key==='theory');
    if(!theory&&legacy.some(g=>g.grant_type==='unit'&&g.grant_key==='*'))return'full';
    if(theory)return legacy.some(g=>g.grant_type==='evaluation')?'theory_eval':'theory';
    // Sólo filas sueltas (por ejemplo resource/answers) sin nivel: no habilitan contenido.
    return null;
  }
  function legacyPaths(subjectId,rows){
    const level=legacyLevel(rows);
    if(!level)return[];
    if(level==='full')return['*'];
    const root=tree(subjectId);
    const out=new Set();
    if(level==='custom'&&subjectId==='quimica-analitica-cualitativa-5'){
      const ch=rows.filter(g=>g.grant_type==='chapter').map(g=>g.grant_key),pr=rows.filter(g=>g.grant_type==='practice').map(g=>g.grant_key);
      walk(root,n=>{
        const m=/^(teoria|clase)\/([^/]+)\/([^/]+)$/.exec(n.path);if(!m)return;
        const [,part,unit]=m;
        const theoryOk=ch.includes('*')||ch.includes(unit),practiceOk=pr.includes('*')||pr.includes(unit);
        if(n.kind==='exercises'?practiceOk&&theoryOk:theoryOk)out.add(n.path);
        if(part==='clase'&&theoryOk)out.add(n.path);
      });
      return compress(subjectId,out);
    }
    const evalOk=level==='theory_eval';
    const answers=rows.some(g=>g.grant_type==='resource'&&g.grant_key==='answers');
    walk(root,n=>{
      if(n.children?.length||n.path==='*'||n.external)return;
      const isEval=(n.tags||[]).includes('eval');
      if(n.kind==='exercises'){
        if((isEval&&evalOk)||n.legacyTheory||(n.legacyAnswers&&answers))out.add(n.path);
      }else out.add(n.path);
    });
    // Unidades pendientes sin capítulos (contenido futuro): el nivel "teórica" las incluía.
    walk(root,n=>{if(n.kind==='unit'&&!n.children?.length&&!n.external)out.add(n.path)});
    return compress(subjectId,out);
  }

  // Filas para guardar en access_grants a partir de una selección.
  // · Materia completa: se guardan las filas clásicas (unit/* + resource/answers + evaluation/*)
  //   para que sigan funcionando las políticas de Supabase y los permisos existentes.
  // · Selección parcial: una fila grant_type='node' por ruta (requiere la migración 20261020).
  function rowsFor(dbSubject,subjectId,granted){
    const list=[...granted];
    if(!list.length)return[];
    if(list.includes('*')){
      const units=dbSubject==='chemistry'?[...Array(13)].map((_,i)=>i+1):[1];
      return[...units.map(u=>({subject:dbSubject,unit_no:u,grant_type:'unit',grant_key:'*'})),{subject:dbSubject,unit_no:1,grant_type:'resource',grant_key:'answers'},{subject:dbSubject,unit_no:1,grant_type:'evaluation',grant_key:'*'}];
    }
    return list.map(p=>({subject:dbSubject,unit_no:1,grant_type:'node',grant_key:p}));
  }

  // Resumen legible de una selección (para la lista de alumnos).
  function describe(subjectId,granted){
    const set=new Set(granted);
    if(!set.size)return'';
    if(set.has('*'))return'Materia completa';
    const parts=[];
    const visit=n=>{
      if(covers(set,n.path)){parts.push(n.label);return}
      if(touches(set,n.path))(n.children||[]).forEach(visit);
    };
    tree(subjectId).children.forEach(visit);
    const known=new Set();walk(tree(subjectId),n=>known.add(n.path));
    const stale=[...set].filter(g=>!known.has(g)).length;
    return parts.join(' · ')+(stale?` · ${stale} permiso${stale>1?'s':''} de contenido que ya no está`:'');
  }

  window.ET27AccessTree={
    defs:DEFS,tree,find,walk,leaves,resolve,tpOf,pageMap,qiUnitPath,qiPart,
    covers,touches,compress,toggle,state,legacyLevel,legacyPaths,rowsFor,describe,
    legacyStatements:id=>!!DEFS[id]?.legacyStatements,
    standalone:(id,file)=>DEFS[id]?.standalone?.[file]||null,
    rules:id=>DEFS[id]?.rules||''
  };
})();
