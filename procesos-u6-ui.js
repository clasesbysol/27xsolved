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
function renderMath(root){
if(!window.katex){setTimeout(()=>renderMath(root),250);return}
root.querySelectorAll('[data-u6-tex]:not([data-ready])').forEach(n=>{try{window.katex.render(decodeURIComponent(n.dataset.u6Tex),n,{displayMode:true,throwOnError:false,strict:'ignore'});n.dataset.ready='1'}catch(e){n.textContent='Fórmula no disponible';}});
}
async function mount(){
const main=document.querySelector('.subject-main');if(!main||document.getElementById('u6-gibbs'))return;
const unit=document.createElement('section');unit.id='u6-gibbs';unit.className='subject-section u5-unit u6-unit';unit.dataset.searchable='';
unit.innerHTML='<div class="section-title"><div><small>PROCESOS · UNIDAD 6</small><h2>Tercer principio y energía libre de Gibbs</h2></div></div><p>Cargando teoría y ejercicios resueltos…</p>';
main.insertBefore(unit,document.getElementById('emptySearch'));
try{
const res=await fetch('./content/procesos/4to/unidad-6-gibbs.md?v=1.0.3',{cache:'no-store'});if(!res.ok)throw Error('HTTP '+res.status);
const md=await res.text();const split=md.indexOf('## Ejercicios resueltos');const theory=split<0?md:md.slice(0,split),exercises=split<0?'':md.slice(split);
unit.innerHTML='<div class="section-title"><div><small>PROCESOS · UNIDAD 6</small><h2>Tercer principio y energía libre de Gibbs</h2></div></div><p class="u6-lead">Espontaneidad, entalpía, entropía, temperatura de equilibrio y energía libre. Siete ejercicios de la guía resueltos paso por paso.</p><section class="u5-subsection" id="u6-teoria"><h2>Teoría completa</h2><div class="u6-reading">'+parse(theory)+'</div></section><section class="u5-subsection" id="u6-ejercicios"><h2>Ejercicios resueltos</h2><div class="u6-reading">'+parse(exercises)+'</div></section>';
renderMath(unit);
const index=document.querySelector('.subject-index.po-unit-index');
if(index&&!index.querySelector('[data-po-unit="6"]')){const nav=document.createElement('details');nav.className='po-unit';nav.dataset.poUnit='6';nav.innerHTML='<summary><span>Unidad 6 · Energía libre de Gibbs</span></summary><div class="po-unit-body"><a href="#u6-teoria">Teoría completa</a><a href="#u6-ejercicios">Ejercicios 1 a 7</a>'+Array.from({length:7},(_,i)=>'<a class="po-sub" href="#u6-ej-'+(i+1)+'">Ejercicio '+(i+1)+'</a>').join('')+'</div>';index.append(nav);}
const sheet=document.querySelector('#formulaSheet .po-formula-groups');if(sheet&&!sheet.querySelector('.u6-formula-unit')){const d=document.createElement('details');d.className='po-formula-unit u6-formula-unit';d.innerHTML='<summary>Unidad 6 · Gibbs</summary><div class="po-formula-item"><b>Energía libre</b><div data-u6-tex="'+encodeURIComponent('\\Delta G=\\Delta H-T\\Delta S')+'"></div></div><div class="po-formula-item"><b>Temperatura límite</b><div data-u6-tex="'+encodeURIComponent('T=\\frac{\\Delta H}{\\Delta S}')+'"></div></div>';sheet.append(d);renderMath(d)}
if(location.hash.startsWith('#u6-'))document.getElementById(location.hash.slice(1))?.scrollIntoView();
}catch(e){unit.innerHTML='<h2>Unidad 6 · Gibbs</h2><p>No se pudo cargar el contenido. Actualizá la página.</p>';console.error('U6:',e)}
}
let tries=0;const timer=setInterval(()=>{if(tries>=6&&document.getElementById('u5-entropia')&&document.querySelector('.subject-main')){clearInterval(timer);mount()}else if(++tries>70)clearInterval(timer)},150);
})();