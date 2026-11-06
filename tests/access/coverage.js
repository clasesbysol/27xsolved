// Chequeo de cobertura del panel de accesos: ¿todo el contenido que existe en las páginas
// figura en el árbol de access-tree.js (y por lo tanto se puede habilitar desde el panel)?
//
//   npm run coverage
//
// Dos comprobaciones, para cada materia y TP del catálogo:
//  1. Estructura (como administrador): cada sección con id que aparece en la página tiene que
//     estar en el mapa `pages` de su materia, o ser un contenedor de secciones mapeadas.
//  2. Alumno con TODO tildado en el panel, pero nodo por nodo (sin "materia completa"): recorre
//     cada parte, unidad y tema de la materia y no tiene que aparecer ningún candado. Si aparece,
//     ese contenido existe en la página pero no está en el árbol, así que el profe no puede darlo.
//
// Sale con código 1 y lista lo que falta si encuentra algo.
const H=require('./harness');
const STUDENT='cobertura@gmail.com';
const LOCKS='[data-et27-section-lock],[data-et27-lock],.et27-locked-card,.lockedPage,.lockedAnswer,.pendingUnit[aria-disabled="true"]';
const IGNORE_IDS=/^(emptySearch|emptyMathSearch|formulaSheet|formulaRail)$/;
const problems=[];
const note=(where,msg)=>{problems.push(`${where}: ${msg}`);console.log('  ✗',where,'—',msg)};

async function locksIn(p){
  return p.evaluate(sel=>[...document.querySelectorAll(sel)].map(n=>(n.querySelector('b,h1,h3')?.textContent||n.textContent||'').replace(/\s+/g,' ').trim().slice(0,90)),LOCKS);
}
async function settle(p,ms=700){await p.waitForTimeout(ms)}

(async()=>{
  const {base}=await H.start();
  const mock=new H.MockSupabase();
  mock.addUser(H.ADMIN);
  mock.addUser(STUDENT);
  mock.db.access_profiles.push({email:STUDENT,active:true,role:'student',access_starts_at:new Date(Date.now()-864e5).toISOString(),access_expires_at:null,max_unit:1});

  const admin=await H.context(mock,{email:H.ADMIN});
  const probe=await H.page(admin,base+'/');
  const info=await probe.evaluate(()=>{
    const T=window.ET27AccessTree,A=window.ET27Access;
    const subjects=(window.ET27_ACADEMIC_CATALOG?.years||[]).flatMap(y=>(y.subjects||[]).map(s=>({...s,year:y.year})));
    return subjects.flatMap(s=>{
      const r=T.resolve(s.id);
      const root=T.tree(r.subject);
      const top=r.prefix?(T.find(r.subject,r.prefix)?[r.prefix]:[]):root.children.map(c=>c.path);
      const item={id:s.id,name:s.name,kind:s.kind,href:s.href,subject:r.subject,prefix:r.prefix,db:A.canonicalSubject(r.subject),top};
      if(r.prefix)return[item];
      // Otras páginas propias de la materia (por ejemplo los exámenes de Matemática de 1.º).
      // Las páginas `standalone` (versiones viejas sueltas, sólo con la materia completa) no cuentan.
      const def=T.defs[s.id]||{};
      const own=(s.href.replace(/^\.\//,'').split('?')[0]);
      const extra=Object.keys(def.pages||{}).filter(f=>!f.includes('#')&&f!==own&&f!=='materia.html');
      return[item,...[...new Set(extra)].map(f=>({...item,href:`./${f}`,name:`${s.name} · ${f}`}))];
    });
  });
  await probe.close();

  // Alumno: cada materia con todos sus nodos de primer nivel tildados (como lo guardaría el panel
  // si se tildara todo menos la raíz). Así lo que no esté en el árbol queda bloqueado.
  const seen=new Set();
  for(const s of info){
    if(s.kind!=='Materia'||seen.has(s.subject))continue;seen.add(s.subject);
    const all=info.filter(x=>x.subject===s.subject).flatMap(x=>x.top);
    for(const path of new Set(all))mock.db.access_grants.push({email:STUDENT,subject:s.db,unit_no:1,grant_type:'node',grant_key:path});
  }
  const student=await H.context(mock,{email:STUDENT});

  for(const s of info){
    const where=`${s.name}${s.kind==='Materia'?'':' (TP)'}`;
    console.log(`\n· ${where}`);
    const url=base+'/'+s.href.replace(/^\.\//,'');
    let checked=0;

    // 1 · Estructura de páginas estáticas y materia.html (como admin)
    const a=await H.page(admin,url);await settle(a,1500);
    const missing=await a.evaluate(({subject,prefix})=>{
      const T=window.ET27AccessTree;if(!T)return null;
      const file=location.pathname.split('/').pop()||'index.html';
      if(document.getElementById('app'))return null; // vistas de la app: se revisan en el paso 2
      if(T.standalone(subject,file))return [];
      // TP sin árbol propio: se habilita entero desde el nodo "TP / Laboratorio" de su materia.
      if(prefix&&!T.pageMap(subject,`${file}#${prefix}`)&&!T.find(subject,prefix)?.children?.length)return [];
      const map=(prefix?T.pageMap(subject,`${file}#${prefix}`):T.pageMap(subject,file))||{};
      const root=document.querySelector('.subject-main, .math-main, main');if(!root)return [];
      const ids=new Set(Object.keys(map));
      const out=[];
      root.querySelectorAll('section[id], .lesson-section[id]').forEach(el=>{
        if(ids.has(el.id))return;
        if([...ids].some(id=>el.querySelector(`#${CSS.escape(id)}`)))return; // contenedor
        if(el.parentElement.closest('[id]')&&[...ids].some(id=>el.parentElement.closest(`#${CSS.escape(id)}`)))return; // dentro de algo mapeado
        const isTop=el.parentElement===root;
        const parentId=el.parentElement.closest('section[id]')?.id;
        if(!isTop&&parentId&&!ids.has(parentId)&&![...ids].some(id=>document.getElementById(parentId)?.querySelector(`#${CSS.escape(id)}`)))return; // lo reporta el contenedor
        if(!isTop&&!el.querySelector(':scope > h2'))return; // anclas internas (ejercicios sueltos, pasos)
        if(/^(emptySearch|emptyMathSearch)$/.test(el.id))return;
        out.push(`#${el.id} «${(el.querySelector('h2,h3')?.textContent||'').trim().slice(0,70)}»`);
      });
      return out;
    },{subject:s.subject,prefix:s.prefix});
    if(missing)for(const m of missing)note(where,`sección ${m} no está en el panel`);
    await a.close();

    // 2 · Alumno con todo tildado: no debería ver candados
    const p=await H.page(student,url);await settle(p,1500);
    const visit=async label=>{checked++;const l=await locksIn(p);for(const t of l)note(where,`${label}: aparece bloqueado «${t}»`)};
    const isApp=await p.evaluate(()=>!!document.getElementById('app'));
    if(!isApp){await visit('página');console.log(`  ✓ revisada`);await p.close();continue}

    const clickAll=async(sel,label,inner)=>{
      const keys=await p.$$eval(sel,ns=>[...new Set(ns.map(n=>n.getAttribute(n.getAttributeNames().find(a=>a.startsWith('data-')&&/unit|part|tab|topic/.test(a)))).filter(Boolean))]);
      const attr=await p.$eval(sel,n=>n.getAttributeNames().find(a=>a.startsWith('data-')&&/unit|part|tab|topic/.test(a))).catch(()=>null);
      for(const k of keys){
        const b=await p.$(`[${attr}="${k}"]`);if(!b)continue;
        if(await b.isDisabled().catch(()=>false)){note(where,`${label} «${k}» deshabilitado para el alumno`);continue}
        await b.click().catch(()=>{});await settle(p);
        if(inner)await inner(k);else await visit(`${label} ${k}`);
      }
      return keys.length;
    };
    const units=async part=>{const n=await clickAll('[data-qg-unit]:not([data-qg-unit=""]),[data-qi-unit]:not([data-qi-unit=""]),[data-qac-unit]:not([data-qac-unit=""])',`${part?part+' · ':''}unidad`);if(!n)await visit(part||'vista')};
    const parts=await p.$$('[data-qg-part],[data-qac-part],[data-qi-part]');
    const topics=await p.$$('[data-physics-topic]');
    if(topics.length)await clickAll('[data-physics-topic]','tema');
    else if(parts.length)await clickAll('[data-qg-part],[data-qac-part],[data-qi-part]','parte',units);
    else await units('');
    // Química Inorgánica separa teoría / TP / elementos por pestaña de la URL
    if(s.subject==='quimica-inorganica-4'&&!s.prefix){
      for(const tab of ['tp','elementos']){await p.goto(url.replace(/tab=[a-z]+/,`tab=${tab}`));await p.waitForFunction(()=>window.ET27Access?.loaded===true);await settle(p,1200);await units(tab)}
    }
    if(!checked)note(where,'no encontré contenido para revisar');else console.log(`  ✓ ${checked} vista(s) revisada(s)`);
    await p.close();
  }

  await H.stop();
  const errs=[...new Set([...admin.errors,...student.errors])].filter(e=>!/supabase|fetch|Failed to load/i.test(e));
  if(errs.length)console.log('\nErrores de JavaScript:\n  '+errs.join('\n  '));
  console.log(problems.length?`\n${problems.length} contenido(s) fuera del panel de accesos. Agregalos en access-tree.js.`:'\nTodo el contenido está en el panel de accesos.');
  process.exit(problems.length?1:0);
})().catch(e=>{console.error(e);process.exit(2)});
