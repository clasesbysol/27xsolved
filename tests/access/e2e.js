// Pruebas E2E del sistema de accesos de 27xSOLved contra un Supabase simulado (Auth + REST + RLS).
const H=require('./harness');const {test,assert}=H;
const ST='alumno@gmail.com',NEW='nuevo@gmail.com',OLD='legacy@gmail.com';
const day=864e5;
const profile=email=>({email,active:true,role:'student',access_starts_at:new Date(Date.now()-day).toISOString(),access_expires_at:null,max_unit:1});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function adminPanel(ctx,base){
  const p=await H.page(ctx,base+'/');
  await p.waitForSelector('[data-h27-admin]',{timeout:10000});
  await p.click('[data-h27-admin]');
  await p.waitForSelector('#xa-root [data-xa-email]',{timeout:10000});
  return p;
}
async function openStudent(p,email){
  await p.fill('[data-xa-email]',email);
  await p.click('#xa-root .xa-search button[type=submit]');
  await p.waitForSelector('#xa-root .xa-current',{timeout:10000});
}
async function openSubject(p,year,id){
  if(!await p.$(`[data-xa-subject="${id}"]`))await p.click(`[data-xa-year="${year}"]`);
  if(!await p.$(`[data-xa-node="${id}"][data-xa-path="*"]`))await p.click(`[data-xa-subject="${id}"]`);
}
async function expandTo(p,id,path){
  const parts=path.split('/');
  for(let i=1;i<parts.length;i++){
    const k=`${id}|${parts.slice(0,i).join('/')}`;
    const tw=await p.$(`[data-xa-tw="${k}"]`);
    if(tw&&await tw.getAttribute('aria-expanded')==='false')await tw.click();
  }
}
async function tick(p,id,path,on=true){
  await expandTo(p,id,path);
  const box=p.locator(`[data-xa-node="${id}"][data-xa-path="${path}"]`);
  if(on)await box.check();else await box.uncheck();
}
async function save(p){
  await p.click('[data-xa-save]');
  await p.waitForFunction(()=>/Guardado|No se pudo|No hay cambios/.test(document.querySelector('#xa-root .xa-msg')?.textContent||''),null,{timeout:10000});
  return p.$eval('#xa-root .xa-msg',n=>n.textContent);
}
const text=p=>p.evaluate(()=>document.body.innerText);
async function qgIndex(p){const all=await p.$('.unitSwitch button[data-qg-unit=""]');if(all&&!(await p.$('.units .unitCard'))){await all.click();await p.waitForSelector('.units .unitCard')}}
async function qgOpen(p,unit){await p.click(`.unitSwitch button[data-qg-unit="${unit}"]`);await p.waitForSelector(`.unitSwitch button.active[data-qg-unit="${unit}"]`)}
const html=p=>p.evaluate(()=>document.body.innerHTML);

(async()=>{
  const {base}=await H.start();
  const mock=new H.MockSupabase();
  mock.addUser(H.ADMIN);
  mock.addUser(ST);mock.db.access_profiles.push(profile(ST));
  mock.addUser(NEW,{provider:'email',password:'clave-nueva-27'});
  mock.addUser(OLD);mock.db.access_profiles.push(profile(OLD));
  // Permisos del sistema anterior (deben seguir funcionando):
  //  Química General nivel "teórica"; Matemática "teórica + evaluaciones"; Analítica "por sección".
  mock.db.access_grants.push(
    {email:OLD,subject:'chemistry',unit_no:1,grant_type:'resource',grant_key:'theory'},
    ...[...Array(13)].map((_,i)=>({email:OLD,subject:'chemistry',unit_no:i+1,grant_type:'unit',grant_key:'*'})),
    {email:OLD,subject:'matematica-1',unit_no:1,grant_type:'resource',grant_key:'theory'},
    {email:OLD,subject:'matematica-1',unit_no:1,grant_type:'evaluation',grant_key:'*'},
    {email:OLD,subject:'quimica-analitica-cualitativa-5',unit_no:1,grant_type:'chapter',grant_key:'acido-base'},
    {email:OLD,subject:'quimica-analitica-cualitativa-5',unit_no:1,grant_type:'practice',grant_key:'acido-base'},
    {email:OLD,subject:'physics_applied',unit_no:1,grant_type:'unit',grant_key:'*'},
    {email:OLD,subject:'physics_applied',unit_no:1,grant_type:'resource',grant_key:'answers'},
    {email:OLD,subject:'physics_applied',unit_no:1,grant_type:'evaluation',grant_key:'*'}
  );
  const admin=await H.context(mock,{email:H.ADMIN});
  let A;

  console.log('\n1 · Administrador');
  await test('1. El administrador ve los seis años y su panel de control',async()=>{
    const p=await H.page(admin,base+'/');
    await p.waitForSelector('.h27-admin .h27-year');
    const years=await p.$$eval('.h27-admin .h27-year',n=>n.map(x=>x.querySelector('b').textContent.trim()));
    assert(years.join()==='1º,2º,3º,4º,5º,6º','años: '+years);
    assert(await p.$('[data-h27-admin]'),'falta el botón Panel de control');
    await p.click('[data-h27-year="4"]');await p.waitForSelector('.h27-dialog');
    const subjects=await p.$$eval('.h27-dialog .h27-row',n=>n.map(x=>x.querySelector('strong').textContent));
    assert(subjects.includes('Química General')&&subjects.includes('Física Aplicada')&&subjects.length===5,'materias de 4.º: '+subjects);
    assert(!(await p.$$('.h27-dialog .h27-row.is-locked')).length,'el admin no debería ver materias bloqueadas');
    await p.close();
  });
  await test('1b. El administrador abre cualquier materia completa (QG, Matemática, Procesos)',async()=>{
    const p=await H.page(admin,base+'/?view=chemistry');
    assert(!(await p.$$('.unitCard.pendingUnit[aria-disabled]')).length,'unidades bloqueadas para el admin');
    const m=await H.page(admin,base+'/matematica-1-examen-1.html');
    assert(!(await m.$('[data-et27-section-lock]')),'el admin ve candados en Matemática');
    await p.close();await m.close();
  });

  console.log('\n2-4 · Alumno nuevo, año y Ajustes');
  const stc=await H.context(mock,{email:ST});
  await test('2. Un alumno nuevo elige su año y ve directamente las materias de ese año',async()=>{
    const p=await H.page(stc,base+'/');
    await p.waitForSelector('[data-h27-pick-year]');
    const h=await p.$eval('.h27-head p',n=>n.textContent);assert(/En qué año estás/.test(h),h);
    // el aviso de actividad aparece primero
    if(await p.$('[data-h27-ack]'))await p.click('[data-h27-ack]');
    await p.click('[data-h27-pick-year="4"]');
    await p.waitForSelector('.h27-sectionTitle h2');
    assert((await p.$eval('.h27-sectionTitle h2',n=>n.textContent))==='Materias de 4.º');
    const rows=await p.$$eval('.h27-rows .h27-row',n=>n.map(x=>({name:x.querySelector('strong').textContent,locked:x.classList.contains('is-locked')})));
    assert(rows.length>=4&&rows.every(r=>r.locked),'sin permisos todas bloqueadas: '+JSON.stringify(rows));
    await sleep(300);
    assert(mock.db.student_profiles.find(r=>r.email===ST)?.year===4,'año no guardado en Supabase');
    // una materia bloqueada no se abre
    await p.click('.h27-row.is-locked');await p.waitForSelector('.h27-dialog');
    assert(/no está habilitada/.test(await p.$eval('.h27-dialog',n=>n.textContent)));
    await p.close();
  });
  const grantsBefore=()=>JSON.stringify(mock.grants(ST));
  await test('3. El alumno cambia su año desde Ajustes / Configuración y persiste entre dispositivos',async()=>{
    const p=await H.page(stc,base+'/?view=settings');
    await p.waitForSelector('[data-et27-year-settings] [data-h27-pick-year="5"]');
    const before=grantsBefore();
    await p.click('[data-et27-year-settings] [data-h27-pick-year="5"]');
    await p.waitForFunction(()=>/5\.º/.test(document.querySelector('[data-et27-year-now]')?.textContent||''));
    await sleep(400);
    assert(mock.db.student_profiles.find(r=>r.email===ST).year===5,'no se guardó 5');
    assert(mock.db.student_year_changes.some(r=>r.email===ST&&r.to_year===5&&r.changed_by==='student'),'no quedó registrado el cambio');
    // "otro dispositivo": contexto nuevo, sin nada local
    const other=await H.context(mock,{email:ST});
    const q=await H.page(other,base+'/');
    await q.waitForSelector('.h27-sectionTitle h2',{timeout:10000});
    assert((await q.$eval('.h27-sectionTitle h2',n=>n.textContent))==='Materias de 5.º','otro dispositivo no ve 5.º');
    await other.close();
    assert(grantsBefore()===before,'4. cambiar de año modificó permisos');
    await p.close();
  });
  await test('4. Cambiar de año no otorga ni quita permisos',async()=>{
    assert(mock.grants(ST).length===0,'el alumno no debería tener permisos: '+grantsBefore());
    const p=await H.page(stc,base+'/');await p.waitForSelector('.h27-rows');
    const open=await p.$$eval('.h27-row:not(.is-locked)',n=>n.length);assert(open===0,'aparecieron materias habilitadas');
    await p.close();
  });

  console.log('\n5-9, 12 · Panel de control granular');
  await test('5. El administrador habilita una materia completa (Física Aplicada)',async()=>{
    A=await adminPanel(admin,base);await openStudent(A,ST);
    await openSubject(A,4,'fisica-aplicada-4');
    await A.locator('[data-xa-node="fisica-aplicada-4"][data-xa-path="*"]').check();
    const msg=await save(A);assert(/Guardado/.test(msg),msg);
    const rows=mock.grants(ST).filter(g=>g.subject==='physics_applied').map(g=>g.grant_type+'/'+g.grant_key).sort();
    assert(rows.join()==='evaluation/*,resource/answers,unit/*',rows.join());
    const p=await H.page(stc,base+'/?view=physics');
    assert(await p.$('#physics-theory article p'),'sin teoría');
    assert(!(await p.$('[data-et27-section-lock]')),'hay candados con materia completa');
    assert(await p.$('#physics-exercises .solutionCard'),'sin resoluciones con materia completa');
    await p.close();
  });
  await test('6. Habilita solamente un capítulo (Matemática · Potenciación)',async()=>{
    await openSubject(A,1,'matematica-1');
    await tick(A,'matematica-1','clases/ex1/potencias');
    const partial=await A.$eval('[data-xa-node="matematica-1"][data-xa-path="clases/ex1"]',i=>i.indeterminate);
    assert(partial,'el padre debería quedar en estado parcial');
    const msg=await save(A);assert(/Guardado/.test(msg),msg);
    const rows=mock.grants(ST).filter(g=>g.subject==='matematica-1');
    assert(rows.length===1&&rows[0].grant_type==='node'&&rows[0].grant_key==='clases/ex1/potencias',JSON.stringify(rows));
    const p=await H.page(stc,base+'/matematica-1-examen-1.html');
    const h=await html(p);
    assert(/Producto · igual base/.test(h),'Potenciación debería verse');
    assert(!/Separá en términos/.test(h),'Ruta desde cero NO debería estar en el DOM');
    assert(!/Raíz de producto/.test(h),'Radicación NO debería estar en el DOM');
    assert(!/Raíz \+ fracciones \+ potencia de potencia/.test(h),'los modelos NO deberían estar en el DOM');
    assert((await p.$$('[data-et27-section-lock]')).length>=7,'faltan avisos de bloqueo');
    // 12. reglas laterales siempre visibles
    assert(await p.$('.formula-rail h3'),'12. faltan las reglas laterales');
    assert(/Reglas rápidas/.test(await p.$eval('.formula-rail',n=>n.textContent)),'12. reglas laterales vacías');
    // examen 2 sin nada habilitado → página bloqueada
    const q=await H.page(stc,base+'/matematica-1.html');
    assert(/todavía no te habilitó/.test(await text(q)),'Examen 2 debería estar bloqueado');
    assert(!/Opuestos por el vértice/.test(await html(q)),'contenido del examen 2 en el DOM');
    // hub: el examen 2 aparece bloqueado
    const hub=await H.page(stc,base+'/matematica-1-inicio.html');
    const locked=await hub.$$eval('.et27-choice-locked',n=>n.map(x=>x.textContent.trim().slice(0,30)));
    assert(locked.some(t=>/Examen 2|Ángulos/.test(t))&&!locked.some(t=>/Examen 1/.test(t)),'hub: '+locked);
    await p.close();await q.close();await hub.close();
  });
  await test('7. Habilita solamente un bloque de ejercicios (QG · Cinética · Guía resuelta)',async()=>{
    await openSubject(A,4,'quimica-general-4');
    await tick(A,'quimica-general-4','teoria/cinetica/qg5-guia');
    const msg=await save(A);assert(/Guardado/.test(msg),msg);
    const p=await H.page(stc,base+'/?view=chemistry');await qgIndex(p);
    const cards=await p.$$eval('.units .unitCard',n=>n.map(x=>({t:x.textContent,locked:x.getAttribute('aria-disabled')==='true'})));
    assert(cards.filter(c=>!c.locked).length===1&&/Cinética/.test(cards.find(c=>!c.locked).t),'sólo Cinética abre: '+JSON.stringify(cards.map(c=>c.locked)));
    await qgOpen(p,'cinetica');await p.waitForSelector('#sec-qg5-guia');
    assert(await p.$('#sec-qg5-guia .exerciseCard .solutionCard'),'la guía debería tener resoluciones');
    assert(await p.$('#sec-qg5-ley [data-et27-section-lock]'),'la teoría de la unidad debería estar bloqueada');
    assert(!/Ley empírica de velocidad y órdenes de reacción<\/h2>/.test(await html(p))||await p.$('#sec-qg5-ley [data-et27-section-lock]'),'');
    await p.close();
  });
  await test('8. Combina selecciones de distintas unidades (QG U4 + U5) y de distintas secciones (QI teoría + TP)',async()=>{
    await tick(A,'quimica-general-4','teoria/coligativas/qg-vapor');
    await tick(A,'quimica-general-4','teoria/cinetica/qg5-ley');
    await openSubject(A,4,'quimica-inorganica-4');
    await tick(A,'quimica-inorganica-4','teoria/uniones');
    await tick(A,'quimica-inorganica-4','tp/tp5/qi-tp5-cuestionario');
    const msg=await save(A);assert(/Guardado/.test(msg),msg);
    const keys=mock.grants(ST).filter(g=>g.grant_type==='node').map(g=>g.subject+':'+g.grant_key).sort();
    assert(keys.includes('chemistry:teoria/coligativas/qg-vapor')&&keys.includes('chemistry:teoria/cinetica/qg5-ley')&&keys.includes('quimica-inorganica-4:teoria/uniones')&&keys.includes('quimica-inorganica-4:tp/tp5/qi-tp5-cuestionario'),keys.join());
    const p=await H.page(stc,base+'/?view=chemistry');
    await qgOpen(p,'coligativas');await p.waitForSelector('#sec-qg-vapor');
    assert(!(await p.$('#sec-qg-vapor [data-et27-section-lock]')),'Raoult debería verse');
    assert(await p.$('#sec-qg-crioscopico [data-et27-section-lock]'),'crioscópico debería estar bloqueado');
    assert(await p.$('#sec-qg-guia [data-et27-section-lock]'),'la guía de coligativas debería estar bloqueada');
    const q=await H.page(stc,base+'/?view=inorganic&tab=tp');
    await q.waitForSelector('.units');
    const open=await q.$$eval('.units button.unitCard',n=>n.map(x=>x.dataset.qiUnit));
    assert(open.sort().join()==='tp5,uniones','sólo TP 5 y Uniones abren: '+open);
    await q.click('button.unitCard[data-qi-unit="tp5"]');await q.waitForSelector('#sec-qi-tp5-cuestionario');
    assert(await q.$('#sec-qi-tp5-cuestionario .solutionCard'),'cuestionario con resoluciones');
    assert(await q.$('#sec-qi-tp5-intro [data-et27-section-lock]'),'intro del TP 5 bloqueada');
    await p.close();await q.close();
  });
  await test('9. Lo no habilitado sigue bloqueado: materias, TP aparte, URL y datos locales manipulados',async()=>{
    // Analítica (sin permisos) bloqueada
    const p=await H.page(stc,base+'/?view=cualitativa');
    assert(/no está habilitada|no tiene acceso/i.test(await text(p)),'Analítica debería estar bloqueada');
    // TP de Química General (entrada propia del catálogo) bloqueado
    const tp=await H.page(stc,base+'/materia.html?subject=tp-quimica-general-4');
    assert(/acceso/i.test(await text(tp))&&await tp.$('[data-et27-lock]'),'TP de QG debería estar bloqueado');
    // forzar en localStorage una unidad no habilitada
    const ctx2=await H.context(mock,{email:ST,storage:{'27xsolved-qg4-unit':'"coligativas"','27xsolved-qi4-unit':'"tp4"','27xsolved-qi4-part':'"tp"'}});
    const q=await H.page(ctx2,base+'/?view=chemistry');
    await q.waitForSelector('#sec-qg-vapor, .units');
    assert(await q.$('#sec-qg-crioscopico [data-et27-section-lock]'),'forzar la unidad no debería abrir capítulos bloqueados');
    const r=await H.page(ctx2,base+'/?view=inorganic&tab=tp');
    assert(!(await r.$('#sec-qi-tp4-intro'))||await r.$('#sec-qi-tp4-intro [data-et27-section-lock]'),'TP 4 forzado por localStorage');
    // un token falso con el mail del admin no da modo profe
    const fake=await H.context(mock,{storage:{'sb-rdfpugfthvfuqokecqwd-auth-token':JSON.stringify({access_token:'x.'+Buffer.from(JSON.stringify({email:H.ADMIN,exp:9999999999})).toString('base64url')+'.y',refresh_token:'nope',expires_at:9999999999,user:{email:H.ADMIN,id:'x'}}),'cualquier':H.ADMIN}});
    const f=await H.page(fake,base+'/?view=chemistry');
    const st=await f.evaluate(()=>ET27Access.state);
    assert(!st.admin&&!st.active,'token falso aceptado: '+JSON.stringify(st));
    assert(!(await f.$('button.unitCard[data-qg-unit]')),'token falso abre unidades');
    const fp=await H.page(fake,base+'/?view=physics');
    assert(!(await fp.$('#physics-admin-guide-access-marker'))&&!(await fp.$('.adminPhysicsSolution')),'guion docente visible con token falso');
    await ctx2.close();await fake.close();await p.close();await tp.close();
  });
  await test('12. Reglas laterales y machete disponibles con acceso parcial (Matemática, Física, Analítica)',async()=>{
    const p=await H.page(stc,base+'/matematica-1-examen-1.html');
    assert(await p.$('.formula-rail'),'Matemática sin reglas');
    const f=await H.page(stc,base+'/fisica-formulas-a4.html');
    assert(!(await f.$('[data-et27-lock]')),'hoja de fórmulas de Física bloqueada');
    await p.close();await f.close();
  });

  console.log('\n10-11, 13-14 · Persistencia, compatibilidad y cambios');
  await test('10. Los permisos persisten al cerrar sesión y volver a ingresar',async()=>{
    const p=await H.page(stc,base+'/?view=settings');
    const logout=await p.$('[data-a="logout"]');assert(logout,'sin botón de cerrar sesión');
    await Promise.all([p.waitForNavigation({timeout:10000}),logout.click()]);await p.waitForSelector('[data-a="google"]',{timeout:10000});
    // vuelve a ingresar (simula el regreso de Google con una sesión nueva)
    await p.evaluate(([k,s])=>localStorage.setItem(k,JSON.stringify(s)),[H.KEY,mock.session(ST)]);
    await p.goto(base+'/?view=chemistry');await p.waitForFunction(()=>window.ET27Access?.loaded);await sleep(500);await qgIndex(p);
    const open=await p.$$eval('.units button.unitCard',n=>n.map(x=>x.dataset.qgUnit).sort());
    assert(open.join()==='cinetica,coligativas','tras reingresar: '+open);
    await p.close();
  });
  await test('11. Los permisos de alumnos existentes (sistema anterior) siguen funcionando',async()=>{
    const old=await H.context(mock,{email:OLD});
    const p=await H.page(old,base+'/?view=chemistry');
    await qgOpen(p,'cinetica');await p.waitForSelector('#sec-qg5-ley');
    assert(!(await p.$('#sec-qg5-ley [data-et27-section-lock]')),'teoría visible con nivel "teórica"');
    assert(await p.$('#sec-qg5-guia .exerciseCard'),'las consignas siguen visibles');
    assert(!(await p.$('#sec-qg5-guia .solutionCard')),'sin resoluciones con nivel "teórica"');
    const m=await H.page(old,base+'/matematica-1-examen-1.html');
    assert(!(await m.$('#teoria [data-et27-section-lock]'))&&!(await m.$('#modelos [data-et27-section-lock]')),'teórica + evaluaciones: teoría y modelos visibles');
    assert(await m.$('#practica [data-et27-section-lock]'),'práctica bloqueada con teórica + evaluaciones');
    const q=await H.page(old,base+'/?view=cualitativa');
    const open=await q.$$eval('.units button.unitCard',n=>n.map(x=>x.dataset.qacUnit));
    assert(open.join()==='acido-base','Analítica por sección: '+open);
    await q.click('button.unitCard[data-qac-unit="acido-base"]');await q.waitForSelector('#sec-qac-ej-g1');
    assert(await q.$('#sec-qac-ej-g1 .solutionCard'),'ejercicios por sección con resolución');
    const f=await H.page(old,base+'/?view=physics');
    assert(await f.$('#physics-exercises .solutionCard'),'Física completa');
    // el panel los muestra traducidos
    await openStudent(A,OLD);
    await openSubject(A,4,'quimica-general-4');
    assert(/sistema anterior/.test(await A.$eval('.xa-treeBox',n=>n.textContent)),'aviso de permiso anterior');
    const chip=await A.$eval('[data-xa-subject="quimica-general-4"] .xa-chip',n=>n.textContent);assert(/Parcial/.test(chip),chip);
    await old.close();
  });
  await test('13. El administrador modifica y revoca permisos ya otorgados',async()=>{
    await openStudent(A,ST);
    await openSubject(A,4,'quimica-general-4');
    await tick(A,'quimica-general-4','teoria/cinetica/qg5-guia',false);
    await openSubject(A,1,'matematica-1');
    await A.click('[data-xa-quick="matematica-1|none"]');
    assert(/Sin acceso/.test(await A.$eval('[data-xa-subject="matematica-1"] .xa-chip',n=>n.textContent)),'chip de Matemática');
    const msg=await save(A);assert(/Guardado/.test(msg),msg);
    const keys=mock.grants(ST).map(g=>g.subject+':'+g.grant_key);
    assert(!keys.includes('chemistry:teoria/cinetica/qg5-guia'),'no se revocó la guía');
    assert(!keys.some(k=>k.startsWith('matematica-1')),'no se revocó Matemática');
    assert(keys.includes('chemistry:teoria/cinetica/qg5-ley'),'se perdió otro permiso');
  });
  await test('14. Los cambios se reflejan en la app abierta del alumno (sin reingresar)',async()=>{
    const p=await H.page(stc,base+'/?view=chemistry');
    await qgOpen(p,'cinetica');await p.waitForSelector('#sec-qg5-guia');
    assert(await p.$('#sec-qg5-guia [data-et27-section-lock]'),'la guía ya fue revocada');
    // el profe vuelve a habilitar la guía mientras el alumno tiene la app abierta
    await openSubject(A,4,'quimica-general-4');
    await tick(A,'quimica-general-4','teoria/cinetica/qg5-guia',true);
    assert(/Guardado/.test(await save(A)));
    await p.evaluate(()=>ET27Access.refresh()); // lo mismo que pasa al volver a la pestaña
    await p.waitForSelector('#sec-qg5-guia .solutionCard',{timeout:5000});
    await p.close();
  });
  await test('Procesos (materia.html): unidades 4 y 5 por separado',async()=>{
    await openSubject(A,4,'procesos-operaciones-4');
    await tick(A,'procesos-operaciones-4','u5/teoria');
    assert(/Guardado/.test(await save(A)));
    const p=await H.page(stc,base+'/materia.html?subject=procesos-operaciones-4');
    await sleep(800);
    assert(await p.$('#resumen [data-et27-section-lock]'),'U4 resumen bloqueado');
    assert(await p.$('#ejercicios [data-et27-section-lock]'),'U4 ejercicios bloqueados');
    assert(!(await p.$('#u5-teoria [data-et27-section-lock]'))&&await p.$('#u5-teoria .u5t-sec'),'U5 teoría visible');
    assert(await p.$('#u5-ejercicios [data-et27-section-lock]'),'U5 ejercicios bloqueados');
    assert(await p.$('#formulaSheet'),'hoja de fórmulas visible');
    await p.close();
  });
  await test('Sin la migración 20261020 el guardado parcial avisa y no borra nada',async()=>{
    mock.migration=false;
    const before=JSON.stringify(mock.grants(ST));
    await openSubject(A,4,'quimica-general-4');
    await tick(A,'quimica-general-4','teoria/coligativas/qg-osmotica');
    const msg=await save(A);
    mock.migration=true;
    assert(/migración/.test(msg)&&/No se modificó/.test(msg),msg);
    assert(JSON.stringify(mock.grants(ST))===before,'se modificaron permisos');
  });

  await test('Física: sólo teoría + un subtema de fluidos; métodos, guías y evaluaciones bloqueados',async()=>{
    await openSubject(A,4,'fisica-aplicada-4');
    await A.click('[data-xa-quick="fisica-aplicada-4|none"]');
    await tick(A,'fisica-aplicada-4','tension/teoria');
    await tick(A,'fisica-aplicada-4','hidro/hidro-caudal');
    assert(/Guardado/.test(await save(A)));
    const p=await H.page(stc,base+'/?view=physics&topic=tension');
    await p.waitForSelector('#physics-theory');await sleep(800);
    assert(!(await p.$('#physics-theory [data-et27-section-lock]')),'teoría visible');
    assert(await p.$('#physics-methods [data-et27-section-lock]'),'métodos bloqueados');
    assert(!(await p.$('#physics-exercises .solutionCard')),'sin resoluciones');
    assert((await p.$$('#physics-exercises [data-et27-section-lock]')).length>=2,'guía y práctica bloqueadas');
    const ev=await p.$('#physics-model-evaluations');
    assert(!ev||await p.$('#physics-model-evaluations [data-et27-section-lock]'),'evaluaciones bloqueadas');
    assert(!(await p.$('.modelStudentAnswer:not([hidden])')),'respuestas de evaluaciones visibles');
    await p.click('[data-physics-topic="hidro"]');await p.waitForSelector('#sec-hidro-caudal');
    assert(!(await p.$('#sec-hidro-caudal [data-et27-section-lock]')),'caudal visible');
    assert(await p.$('#sec-hidro-guia [data-et27-section-lock]'),'guía de fluidos bloqueada');
    await p.close();
  });
  await test('Analítica: sólo un bloque de ejercicios de Buffer; "Para la clase" y TP bloqueados',async()=>{
    await openSubject(A,5,'quimica-analitica-cualitativa-5');
    await tick(A,'quimica-analitica-cualitativa-5','teoria/buffer/qac-ej-bg2');
    assert(/Guardado/.test(await save(A)));
    const p=await H.page(stc,base+'/?view=cualitativa');
    await p.waitForSelector('.units');
    const open=await p.$$eval('.units button.unitCard',n=>n.map(x=>x.dataset.qacUnit));
    assert(open.join()==='buffer','sólo Buffer: '+open);
    assert(await p.$('[data-qac-part="clase"][disabled]')&&await p.$('[data-qac-part="tp"][disabled]'),'clase y TP deberían estar bloqueados');
    await p.click('button.unitCard[data-qac-unit="buffer"]');await p.waitForSelector('#sec-qac-ej-bg2');
    assert(await p.$('#sec-qac-ej-bg2 .solutionCard'),'bg2 con resoluciones');
    assert(await p.$('#sec-qac-bf-que-es [data-et27-section-lock]'),'teoría de buffer bloqueada');
    assert(await p.$('#sec-qac-ej-bg3 [data-et27-section-lock]'),'bg3 bloqueado');
    assert(await p.$('.qacRail, [data-a="openQacTables"]'),'machete/tablas disponibles');
    await p.close();
  });
  await test('Invitado: sigue viendo sólo la muestra gratis',async()=>{
    const g=await H.context(mock,{storage:{'cbc-mode':'guest'}});
    const p=await H.page(g,base+'/matematica-1-examen-1.html');await sleep(1500);
    assert(await p.$('[data-et27-preview-cta]'),'falta el corte de la muestra');
    assert(!/Ultra difíciles · nivel 1\.º año/.test(await html(p)),'la muestra no corta el contenido');
    const q=await H.page(g,base+'/?view=chemistry');
    assert(/no está habilitada|no tiene acceso|Ingresá/i.test(await text(q)),'QG bloqueada para invitados');
    await g.close();
  });

  console.log('\n15 · Registro y aviso de actividad');
  await test('15. Registro con correo y contraseña: textos, año, confirmación, ingreso y aviso',async()=>{
    const ctx=await H.context(mock,{});
    const p=await H.page(ctx,base+'/');
    assert(await p.$('[data-a="google"]'),'falta Ingresar con Google');
    assert(/no hace falta crear una contraseña/.test(await text(p)),'falta aclarar Google sin contraseña');
    await p.click('[data-auth-mode="signup"]');
    const t=await text(p);
    assert(/contraseña nueva, sólo para 27xSOLved/.test(t)&&/No escribas la contraseña de tu Gmail/.test(t),'falta el aviso de contraseña');
    assert(/no te da acceso a todas las materias/.test(t),'falta aclarar el acceso');
    assert(/En qué año estás/.test(t),'falta la pregunta del año');
    await p.fill('#emailAuthForm [name=email]','registro@hotmail.com');
    await p.fill('#emailAuthForm [name=password]','unaClave123');
    await p.fill('#emailAuthForm [name=password2]','otraClave123');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForSelector('.emailAuth .notice');
    assert(/no coinciden/.test(await p.$eval('.emailAuth .notice',n=>n.textContent)));
    await p.fill('#emailAuthForm [name=password2]','unaClave123');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForSelector('.emailAuth .notice');
    assert(/año/.test(await p.$eval('.emailAuth .notice',n=>n.textContent)),'debería pedir el año');
    await p.click('#emailAuthForm .authYear label:nth-child(4)');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForFunction(()=>/Te enviamos un correo/.test(document.querySelector('.emailAuth .notice')?.textContent||''));
    for(let i=0;i<20&&!mock.users.get('registro@hotmail.com');i++)await sleep(100);
    const u=mock.users.get('registro@hotmail.com');assert(u&&u.user_metadata.year===4,'usuario/año: '+JSON.stringify(u?.user_metadata)+' '+[...mock.users.keys()]+' '+mock.log.filter(x=>/signup/.test(x)));
    // sin confirmar no entra
    await p.fill('#emailAuthForm [name=password]','unaClave123');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForFunction(()=>/confirmaste/.test(document.querySelector('.emailAuth .notice')?.textContent||''));
    u.confirmed_at=new Date().toISOString();
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForSelector('[data-h27-ack]',{timeout:10000});
    const notice=await p.$eval('.h27-dialog',n=>n.textContent);
    assert(/Tu profesor puede ver cuándo ingresás a la aplicación y qué temas abrís, para administrar los accesos y acompañar el estudio\. Tus tareas y tu horario personal son privados\./.test(notice.replace(/\s+/g,' ')),'texto del aviso: '+notice);
    assert(mock.db.activity_events.filter(e=>e.email==='registro@hotmail.com').length===0,'no debe registrar actividad antes del aviso');
    await p.click('[data-h27-ack]');await sleep(500);
    assert(mock.db.activity_events.some(e=>e.email==='registro@hotmail.com'&&e.kind==='app_open'),'no registró el ingreso tras el aviso');
    assert(mock.db.student_profiles.find(r=>r.email==='registro@hotmail.com')?.year===4,'año del registro no guardado');
    await p.waitForSelector('.h27-sectionTitle h2');
    assert((await p.$eval('.h27-sectionTitle h2',n=>n.textContent))==='Materias de 4.º');
    assert(mock.grants('registro@hotmail.com').length===0,'crear la cuenta no debe dar permisos');
    // horario/tareas: el admin no los puede leer
    mock.db.student_planner.push({email:'registro@hotmail.com',schedule:[{d:1}],checklist:[],updated_at:new Date().toISOString()});
    const seen=await A.evaluate(async()=>{const r=await window.ET27Cloud.api('student_planner?select=*');return r.length});
    assert(seen===0,'el admin pudo leer horario/tareas');
    await ctx.close();
  });
  await test('15b. Ingreso con correo y contraseña existente + error claro con contraseña incorrecta',async()=>{
    const ctx=await H.context(mock,{});
    const p=await H.page(ctx,base+'/');
    await p.click('[data-auth-mode="login"]');
    await p.fill('#emailAuthForm [name=email]',NEW);
    await p.fill('#emailAuthForm [name=password]','mal');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForSelector('.emailAuth .notice');
    await p.fill('#emailAuthForm [name=password]','incorrecta-123');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForFunction(()=>/incorrectos/.test(document.querySelector('.emailAuth .notice')?.textContent||''));
    await p.fill('#emailAuthForm [name=password]','clave-nueva-27');
    await p.click('#emailAuthForm button[type=submit]');
    await p.waitForSelector('.h27-home',{timeout:20000});
    await ctx.close();
  });

  const errs=[admin,stc].flatMap(c=>c.errors).filter(e=>!/Failed to load resource|favicon|net::ERR/.test(e));
  await test('Sin errores de JavaScript en las páginas probadas',async()=>{assert(!errs.length,errs.join('\n'))});
  const s=H.summary();
  console.log(`\n${s.passed} pruebas OK · ${s.failed} con fallas`);
  await H.stop();
  process.exit(s.failed?1:0);
})().catch(async e=>{console.error(e);await H.stop();process.exit(2)});
