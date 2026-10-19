// 27xSOLved · Química Analítica Cualitativa 5.º — herramientas para cargar las RESOLUCIONES de las guías.
// Cada resolución sigue el esquema de la cátedra (teoría: “Cómo se trabaja”, “Cómo se justifica”, “Análisis
// sistemático” y la plantilla de la guía maestra):
//   Estrategia → Datos y especies → Descripción del sistema (reacciones con estados y K abajo, BM, BC)
//   → Análisis cualitativo (justificación de cada desprecio “respecto de”) → Análisis cuantitativo
//   → Verificación (≤ 5 %) → Todas las especies → Justificación → Resultado.
// Constantes: las del enunciado; si el enunciado no las da, las de las tablas del apéndice (machete).
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,data=window.ET27_QAC5;if(!K||!Q||!A||!data)return;
  const find=id=>{for(const u of data.units){const e=(u.exercises||[]).find(x=>x.id===id);if(e)return e}return null};
  // S(id, solución, resultado): carga la resolución en la tarjeta de la guía.
  const S=(id,solution,answer)=>{const e=find(id);if(!e){console.warn('[QAC] falta el ejercicio',id);return}e.solution=solution;e.answer=answer||''};
  const box=(cls,icon,title,html)=>`<div class="kitBox ${cls}"><b>${icon} ${title}</b>${html}</div>`;
  const plan=html=>box('qacPlan','🧭','¿Qué vamos a hacer y por qué?',html);
  const fix=html=>box('qacFix','✏️','Corrección conceptual',html);
  const ilu=html=>box('kitNote','🔢','Con números (datos elegidos para ilustrar, no son del enunciado)',html);
  const tab=html=>`<p class="qacGuideNote">📋 ${html}</p>`;
  // Etapas con título fijo (se omiten las que no se pasan).
  const T={plan:'Estrategia',datos:'Datos y especies',sist:'Descripción del sistema',cuali:'Análisis cualitativo',cuanti:'Análisis cuantitativo',verif:'Verificación',esp:'Concentración de todas las especies',concl:'Conclusión'};
  const res=o=>{let i=0;const part=(k,h)=>h?K.step(`${++i} · ${T[k]}`,h):'';return (o.plan?plan(o.plan):'')+part('datos',o.datos)+part('sist',o.sist)+part('cuali',o.cuali)+part('cuanti',o.cuanti)+part('verif',o.verif)+part('esp',o.esp)+part('concl',o.concl)+(o.jus?A.jus(o.jus):'')+(o.extra||'')};
  // Inciso: título a), b)… con su resolución.
  const inc=(letra,titulo,html)=>`<div class="qacInciso"><h4><span>${letra})</span> ${titulo}</h4>${html}</div>`;
  const esp=rows=>K.table(['Especie','Concentración (M)'],rows);
  const W=['2 H2O(l) <=> H3O^+(ac) + HO^-(ac)',String.raw`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]=1{,}0\times10^{-14}`];
  window.ET27QACS={S,find,plan,fix,ilu,tab,res,inc,esp,W};
})();
