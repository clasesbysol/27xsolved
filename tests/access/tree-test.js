const L=require('./loadwin.js');const assert=require('assert');
const w=L([...L.indexFiles(),'access-tree.js']);const T=w.ET27AccessTree;
const show=(id,depth=9)=>{const r=T.tree(id);const out=[];const v=(n,d)=>{if(d>depth)return;out.push('  '.repeat(d)+n.path+'  ['+(n.kind||'')+'] '+n.label);(n.children||[]).forEach(c=>v(c,d+1))};v(r,0);return out.join('\n')};
if(process.argv[2]){console.log(show(process.argv[2],Number(process.argv[3]||9)));process.exit(0)}
const eq=(a,b)=>assert.equal(JSON.stringify(a),JSON.stringify(b));
const S='quimica-general-4';
let g=new Set();
g=T.toggle(S,g,'teoria/cinetica/qg5-ley',true);eq([...g],['teoria/cinetica/qg5-ley']);
assert(T.covers(g,'teoria/cinetica/qg5-ley'));assert(!T.covers(g,'teoria/cinetica/qg5-guia'));
assert.equal(T.state(S,g,T.find(S,'teoria/cinetica')),'partial');assert.equal(T.state(S,g,T.find(S,'teoria')),'partial');
// select whole unit
g=T.toggle(S,g,'teoria/cinetica',true);eq([...g],['teoria/cinetica']);
// uncheck one chapter → parent expanded
g=T.toggle(S,g,'teoria/cinetica/qg5-guia',false);assert(!g.has('teoria/cinetica'));assert(g.has('teoria/cinetica/qg5-ley'));assert(!T.covers(g,'teoria/cinetica/qg5-guia'));assert.equal(g.size,10);
// recheck → compress back
g=T.toggle(S,g,'teoria/cinetica/qg5-guia',true);eq([...g],['teoria/cinetica']);
// whole subject
g=T.toggle(S,g,'*',true);eq([...g],['*']);
g=T.toggle(S,g,'teoria/coligativas/qg-guia',false);assert(!g.has('*'));assert(T.covers(g,'teoria/cinetica/qg5-ley'));assert(!T.covers(g,'teoria/coligativas/qg-guia'));assert(T.covers(g,'tp'));
g=T.toggle(S,g,'*',false);assert.equal(g.size,0);
// unknown path preserved
g=T.compress(S,new Set(['teoria/vieja/x','teoria/cinetica/qg5-ley']));eq(g,['teoria/cinetica/qg5-ley','teoria/vieja/x']);
// combine units
g=new Set();g=T.toggle(S,g,'teoria/coligativas/qg-vapor',true);g=T.toggle(S,g,'teoria/cinetica/qg5-guia',true);assert.equal(g.size,2);
// legacy mapping
const R=(t,k,u=1)=>({subject:'chemistry',unit_no:u,grant_type:t,grant_key:k});
eq(T.legacyPaths(S,[R('unit','*'),R('resource','answers'),R('evaluation','*')]),['*']);
const th=new Set(T.legacyPaths(S,[R('resource','theory'),R('unit','*')]));
assert(T.covers(th,'teoria/cinetica/qg5-ley'));assert(!T.covers(th,'teoria/cinetica/qg5-guia'));assert(T.covers(th,'teoria/soluciones'));assert(!T.covers(th,'tp'));
eq(T.legacyPaths(S,[R('resource','answers')]),[]);
// math
const M='matematica-1';const mt=new Set(T.legacyPaths(M,[{grant_type:'resource',grant_key:'theory'},{grant_type:'unit',grant_key:'*'}]));
eq([...mt],['clases']);
const me=new Set(T.legacyPaths(M,[{grant_type:'resource',grant_key:'theory'},{grant_type:'evaluation',grant_key:'*'}]));
eq([...me],['clases','previas/ex1/modelos','previas/ex2/modelos']);
// QAC custom
const Q='quimica-analitica-cualitativa-5';const qc=new Set(T.legacyPaths(Q,[{grant_type:'chapter',grant_key:'acido-base'},{grant_type:'chapter',grant_key:'buffer'},{grant_type:'practice',grant_key:'buffer'}]));
assert(T.covers(qc,'teoria/acido-base/qac-ab-ph'));assert(!T.covers(qc,'teoria/acido-base/qac-ej-g1'));assert(T.covers(qc,'teoria/buffer/qac-ej-bg2'));assert(T.covers(qc,'clase/acido-base'));assert(!T.covers(qc,'teoria/redox'));
// rows
assert.equal(T.rowsFor('chemistry',S,new Set(['*'])).length,15);
eq(T.rowsFor('x','x',new Set(['a/b'])),[{subject:'x',unit_no:1,grant_type:'node',grant_key:'a/b'}]);
// tp resolve
eq(T.resolve('tp-quimica-general-4'),{subject:'quimica-general-4',prefix:'tp'});
eq(T.resolve('tp-quimica-inorganica-4'),{subject:'quimica-inorganica-4',prefix:'tp'});
eq(T.resolve('tp-industrial-2'),{subject:'industrial-2',prefix:'tp'});
console.log('tree tests ok');
for(const id of ['quimica-inorganica-4','fisica-aplicada-4','matematica-5','industrial-2']) console.log(show(id,1));
