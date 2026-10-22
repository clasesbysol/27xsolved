(function(){
'use strict';
if(new URLSearchParams(location.search).get('subject')!=='procesos-operaciones-4')return;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=s=>esc(s).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>');
function parse(md){
const lines=md.split(/\r?\n/),out=[];let inMath=false,tex=[],table=[],list=[];
const flushList=()=>{if(list.length){out.push('<ul>'+list.map(s=>'<li>'+inline(s)+'</li>').join('')+'</ul>');list=[]}};
const flushTable=()=>{if(table.length){out.push('<div class="u6-table-scroll"><table>'+table.filter(x=>!x.every(c=>/^[-:\s]+$/.test(c))).map((row,i)=>'<tr>'+row.map(c=>'<'+(i?'td':'th')+'>'+inline(c)+'</'+(i?'td':'th')+'>').join('')+'</tr>').join('')+'</table></div>');table=[]}};
for(const raw of lines){const t=raw.trim();
if(t==='\\['){flushList();flushTable();inMath=true;tex=[];continue}
if(t==='\\]'){out.push('<div class="u6-equation" data-u6-tex="'+encodeURIComponent(tex.join('\n'))+'"></div>');inMath=false;continue}
if(inMath){tex.push(t);continue}
if(t.startsWith('|')){flushList();table.push(t.split('|').slice(1,-1).map(x=>x.trim()));continue}
flushTable();
if(t.startsWith('- ')){list.push(t.slice(2));continue}
flushList();
if(!t)continue;
if(t==='---'){out.push('<hr>');continue}
const m=t.match(/^(#{1,4})\s+(.+)$/);
if(m){let level=Math.min(4,m[1].length+1);const heading=inline(m[2]);const ex=m[2].match(/^Ejercicio\s+(\d+)/i);out.push('<h'+level+(ex?' id="u6-ej-'+ex[1]+'"':'')+'>'+heading+'</h'+level+'>');continue}
out.push('<p>'+inline(t)+'</p>');
}
flushList();flushTable();return out.join('');
}

const glossary={
1:'Combustión completa: reacción con oxígeno que produce CO₂ y H₂O. Balancear: igualar la cantidad de átomos de cada elemento a ambos lados. Entropía: propiedad asociada a la dispersión de energía; comparar cantidad de gases sirve como primera estimación. Estado de agregación: (s) sólido, (l) líquido y (g) gaseoso.',
2:'Energía libre estándar: cambio de Gibbs calculado para estados estándar. Exotérmico: proceso que libera calor, con entalpía negativa. Temperatura absoluta: temperatura expresada en kelvin. Favorable: sentido de reacción con cambio de Gibbs negativo bajo las condiciones indicadas.',
3:'Espontaneidad: tendencia termodinámica, no rapidez. Temperatura umbral: valor para el cual la variación de Gibbs es cero, dentro de la aproximación de entalpía y entropía constantes. Por debajo o encima se analiza el signo de Gibbs.',
4:'Descomposición: una sustancia origina varias especies. Coeficiente estequiométrico: número que multiplica una fórmula en una reacción balanceada. Entalpía de formación: cambio de entalpía al formar un mol de sustancia desde sus elementos en estado estándar. Entropía molar estándar: entropía de un mol de sustancia en su estado estándar.',
5:'Productos y reactivos: sustancias a la derecha e izquierda de la flecha. Entalpía de reacción: suma de entalpías de formación de productos menos la de reactivos, multiplicadas por coeficientes. Espontánea: cambio de Gibbs negativo; no implica reacción rápida.',
6:'Aproximación: suposición utilizada para estimar. Error porcentual: diferencia absoluta entre valor estimado y valor de referencia, dividida por el valor absoluto de referencia y multiplicada por cien. Atención: el PDF indica agua líquida, pero sus datos numéricos corresponden al vapor.',
7:'Energía libre de formación: cambio de Gibbs al formar un mol desde elementos estándar. La tabla original rotula la última columna como entropía, pero sus valores corresponden a Gibbs de formación. La entropía de reacción se obtiene mediante la relación entre Gibbs, entalpía y temperatura.'
};

const methodology={
1:['Identificar el combustible (octano) y el comburente (oxígeno). En una combustión completa de hidrocarburos los productos son dióxido de carbono y agua.','Balancear primero carbono, después hidrógeno y por último oxígeno. Si aparecen fracciones, multiplicar toda la ecuación por dos.','Comparar los moles gaseosos de reactivos y productos para predecir el signo de la entropía. Aplicar la ecuación de Gibbs y explicar qué significa «más negativo».'],
2:['Copiar la reacción y los dos datos termodinámicos. Como la entropía está en joules y la entalpía en kilojoules, convertir la entropía dividiendo por mil.','Convertir cada temperatura Celsius a kelvin sumando 273,15. Sustituir en Gibbs con los signos originales, incluyendo el signo negativo de la entropía.','Comparar el resultado con cero: negativo favorece la reacción directa, positivo favorece la inversa bajo condiciones estándar. No confundir favorabilidad con rapidez.'],
3:['Reconocer que tanto la entalpía como la entropía son negativas: la reacción se favorece a bajas temperaturas.','Plantear Gibbs igual a cero para encontrar la temperatura límite; despejar sin cambiar signos arbitrariamente.','Probar el signo a cada lado de 300 K y elegir la opción que indique temperatura estrictamente menor.'],
4:['Balancear la descomposición y mantener los estados físicos porque influyen en la entropía.','Predecir cualitativamente el signo de la entropía por formación de gases. Después calcular productos menos reactivos con los coeficientes estequiométricos.','Repetir el procedimiento para la entalpía; convertir la entropía a kilojoules por kelvin y calcular Gibbs. Finalmente igualar Gibbs a cero y despejar la temperatura.'],
5:['Comprobar que la reacción esté balanceada y distinguir las sustancias iniciales de las finales.','Calcular entalpía y entropía por separado, sumando propiedades de los productos y restando las de los reactivos.','Pasar la entropía a kilojoules por kelvin, calcular Gibbs a temperatura estándar e interpretar su signo.'],
6:['Leer primero la advertencia: la guía dice agua líquida, pero los valores tabulados son de vapor. Mostrar ambos y explicar cuál se utiliza para el cálculo.','Obtener entalpía y entropía mediante productos menos reactivos. Calcular Gibbs a temperatura estándar y luego despejar la temperatura umbral.','Estimar Gibbs a 1200 K, recalcular con los valores reales y hallar el error porcentual tomando como referencia el valor real.'],
7:['Reconocer el error del encabezado: la última columna contiene energías libres de formación, no entropías molares.','Escribir y balancear ambas reacciones. Calcular la entalpía de cada una y predecir la entropía a partir de la formación de gas.','Calcular Gibbs de reacción desde la tabla; despejar la entropía de la ecuación de Gibbs. Evaluar a 650 °C y hallar la temperatura umbral de cada reacción.']
};
function renderExercises(md){
const chunks=md.split(/(?=^### Ejercicio \d+\s*[—-])/m).filter(x=>/^### Ejercicio \d+/.test(x.trim()));
return chunks.map((chunk,i)=>{
const item=window.ET27_PROCESOS_U6_ORIGINAL?.[i];if(!item)return parse(chunk);
const n=i+1,head='<article class="u6-exercise" id="u6-ej-'+n+'"><header><small>UNIDAD 6 · EJERCICIO '+n+'</small><h3>'+esc(item.title)+'</h3></header>';
const statement='<section class="u6-statement"><h4>Consigna original de la profesora</h4><div class="u6-original-text">'+esc(item.statement)+'</div></section>';
const explanation='<div class="u6-concepts"><h4>Conceptos que necesitamos entender</h4><p>'+esc(glossary[n])+'</p></div><div class="u6-method"><h4>Cómo vamos a resolverlo</h4><ol>'+methodology[n].map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div>';
const solution='<details class="u6-solution"><summary>Ver resolución completa paso a paso</summary><div class="u6-solution-body">'+explanation+'<div class="u6-reading">'+parse(chunk.replace(/^### Ejercicio [^\n]+\n/,''))+'</div></div></details>';
return head+statement+solution+'</article>';
}).join('');
}

function renderMath(root){
if(!window.katex){setTimeout(()=>renderMath(root),250);return}
root.querySelectorAll('[data-u6-tex]:not([data-ready])').forEach(n=>{try{window.katex.render(decodeURIComponent(n.dataset.u6Tex),n,{displayMode:true,throwOnError:true,strict:'ignore'});n.dataset.ready='1'}catch(e){n.textContent='Error de fórmula: '+decodeURIComponent(n.dataset.u6Tex);console.error('Fórmula U6 inválida:',e);}});
}
async function mount(){
const main=document.querySelector('.subject-main');if(!main||document.getElementById('u6-gibbs'))return;
const unit=document.createElement('section');unit.id='u6-gibbs';unit.className='subject-section u5-unit u6-unit';unit.dataset.searchable='';
unit.innerHTML='<div class="section-title"><div><small>PROCESOS · UNIDAD 6</small><h2>Tercer principio y energía libre de Gibbs</h2></div></div><p>Cargando teoría y ejercicios resueltos…</p>';
main.insertBefore(unit,document.getElementById('emptySearch'));
try{
const res=await fetch('./content/procesos/4to/unidad-6-gibbs.md?v=1.2.0',{cache:'no-store'});if(!res.ok)throw Error('HTTP '+res.status);
const md=await res.text();const split=md.indexOf('## Ejercicios resueltos');const theory=split<0?md:md.slice(0,split),exercises=split<0?'':md.slice(split);
unit.innerHTML='<div class="section-title"><div><small>PROCESOS · UNIDAD 6</small><h2>Tercer principio y energía libre de Gibbs</h2></div></div><p class="u6-lead">Espontaneidad, entalpía, entropía, temperatura de equilibrio y energía libre. Siete ejercicios de la guía resueltos paso por paso.</p><section class="u5-subsection" id="u6-teoria"><h2>Teoría completa</h2><div class="u6-reading">'+parse(theory)+'</div></section><section class="u5-subsection" id="u6-ejercicios"><h2>Ejercicios resueltos</h2><div class="u6-reading">'+renderExercises(exercises)+'</div></section>';
renderMath(unit);unit.addEventListener('toggle',()=>renderMath(unit),true);
const index=document.querySelector('.subject-index.po-unit-index');
if(index&&!index.querySelector('[data-po-unit="6"]')){const nav=document.createElement('details');nav.className='po-unit';nav.dataset.poUnit='6';nav.innerHTML='<summary><span>Unidad 6 · Energía libre de Gibbs</span></summary><div class="po-unit-body"><a href="#u6-teoria">Teoría completa</a><a href="#u6-ejercicios">Ejercicios 1 a 7</a>'+Array.from({length:7},(_,i)=>'<a class="po-sub" href="#u6-ej-'+(i+1)+'">Ejercicio '+(i+1)+'</a>').join('')+'</div>';index.append(nav);}
const sheet=document.querySelector('#formulaSheet .po-formula-groups');if(sheet&&!sheet.querySelector('.u6-formula-unit')){const d=document.createElement('details');d.className='po-formula-unit u6-formula-unit';d.innerHTML='<summary>Unidad 6 · Gibbs</summary><div class="po-formula-item"><b>Energía libre</b><div data-u6-tex="'+encodeURIComponent('\\Delta G=\\Delta H-T\\Delta S')+'"></div></div><div class="po-formula-item"><b>Temperatura límite</b><div data-u6-tex="'+encodeURIComponent('T=\\frac{\\Delta H}{\\Delta S}')+'"></div></div>';sheet.append(d);renderMath(d)}
if(location.hash.startsWith('#u6-'))document.getElementById(location.hash.slice(1))?.scrollIntoView();
}catch(e){unit.innerHTML='<h2>Unidad 6 · Gibbs</h2><p>No se pudo cargar el contenido. Actualizá la página.</p>';console.error('U6:',e)}
}
let tries=0;const timer=setInterval(()=>{if(tries>=6&&document.getElementById('u5-entropia')&&document.querySelector('.subject-main')){clearInterval(timer);mount()}else if(++tries>70)clearInterval(timer)},150);
})();