// 27xSOLved · Química Analítica Cualitativa 5.º — temas y ejemplos agregados según la guía maestra
// (orden de enseñanza de la profesora, revisado). Se suman a las secciones existentes; el orden final lo fija
// quimica-cualitativa-5-orden.js. Constantes: tablas del apéndice de la guía (machete), 25 °C.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC,data=window.ET27_QAC5;if(!K||!Q||!A||!data)return;
  const {M,m,chain,key,idea,warn,note,deep,example,step,table,figure}=K;
  const {rx,rxs,punch}=Q;
  const {sup,ver,flow,jus,desc,sys,lc,spec}=A;
  const R=String.raw;
  const U=id=>data.units.find(u=>u.id===id);
  const add=(uid,k,label,html)=>{const u=U(uid);if(u&&!u.sections.some(s=>s.key===k))u.sections.push({key:k,label,kicker:'',html})};
  const append=(uid,k,html)=>{const s=U(uid)?.sections.find(x=>x.key===k);if(s)s.html+=html};
  const fix=t=>`<div class="kitBox qacFix"><b>✏️ Corrección conceptual</b>${t}</div>`;
  const plan=t=>`<div class="kitBox qacPlan"><b>🧭 ¿Qué vamos a hacer y por qué?</b>${t}</div>`;
  { const sm=U('acido-base')?.sections.find(x=>x.key==='qac-ab-metodo');if(sm)sm.label='Cómo se trabaja y cómo corrige la profe: criterios para despreciar y verificar'; }
  const W=['2 H2O <=> H3O^+ + HO^-',R`K_w=[\mathrm{H_3O^+}][\mathrm{HO^-}]=1{,}0\times10^{-14}`];

  // =====================================================================
  // ÁCIDO-BASE I · PRIMERA PRUEBA
  // =====================================================================
  add('acido-base','qac-ab-intro','Reacciones y procesos químicos: termodinámica, cinética y equilibrio',`
<p>Antes de calcular cualquier pH conviene tener claro <b>qué es lo que estudiamos</b>: reacciones que ocurren en solución acuosa y llegan (o no) a un equilibrio. Esta sección ordena el vocabulario que se usa en toda la materia.</p>
<h3>Reacción y proceso químico</h3>
<p>Una <b>reacción química</b> es una transformación en la que unas sustancias (reactivos) se convierten en otras (productos): se rompen y se forman enlaces. Un <b>proceso químico</b> es el conjunto de cambios que sufre un sistema entre un estado inicial y uno final; puede incluir una o varias reacciones y también cambios físicos (disolución, cambio de estado).</p>
<p>La <b>ecuación química</b> es la representación simbólica: dice qué especies intervienen, en qué proporción (coeficientes estequiométricos), en qué estado de agregación están y si la reacción es total (→) o reversible (⇌).</p>
${rxs(['NH3(g) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','reversible: llega a un equilibrio (con su constante, Kb)'],['HCl(g) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','prácticamente completa: se escribe con flecha simple y sin constante'])}
${table(['Lo que se lee','Ejemplo en la primera ecuación'],[['Especies y fórmulas','NH₃, H₂O, NH₄⁺, HO⁻'],['Proporción (coeficientes)','1 : 1 → 1 : 1'],['Estados de agregación','(g) gas · (l) líquido · (s) sólido · (ac) en solución acuosa'],['Tipo de flecha','⇌: reacción reversible, hay equilibrio']])}
<h3>Termodinámica: ¿hacia dónde tiende el proceso?</h3>
<p>La termodinámica compara el <b>estado inicial</b> y el <b>estado final</b> de un sistema. Las <b>variables de estado</b> (presión, temperatura, volumen, cantidad de cada sustancia, energía interna, entalpía, entropía…) describen cada estado y su variación depende sólo de los estados inicial y final, no del camino. En cada proceso se mantienen constantes <b>algunas</b> condiciones según el caso (por ejemplo, en el laboratorio solemos trabajar a presión y temperatura constantes); no todas las variables de estado son constantes: si lo fueran, no habría ningún cambio que estudiar.</p>
${table(['Magnitud','Qué mide (idea intuitiva)','Unidad habitual','Signo'],[
 ['Entalpía, ΔH','calor intercambiado a presión constante','kJ/mol','ΔH &lt; 0 exotérmica (libera calor) · ΔH &gt; 0 endotérmica (absorbe)'],
 ['Entropía, ΔS','cuánto se “dispersan” la energía y la materia (número de configuraciones posibles)','J/(mol·K)','ΔS &gt; 0 aumenta el desorden (por ejemplo, un sólido que se disuelve)'],
 ['Energía libre de Gibbs, ΔG','balance entre ΔH y ΔS a T y P constantes: energía disponible para que el proceso ocurra','kJ/mol','ΔG &lt; 0 espontáneo · ΔG = 0 equilibrio · ΔG &gt; 0 no espontáneo (sí lo es el inverso)']])}
${key(R`\Delta G=\Delta H-T\,\Delta S\qquad\qquad \Delta G^\circ=-RT\ln K`,'Gibbs y la constante de equilibrio')}
<p>En la segunda fórmula, <b>R</b> = 8,314 J/(mol·K) es la constante de los gases, <b>T</b> la temperatura absoluta (K) y <b>K</b> la constante de equilibrio. Si ΔG° es muy negativo, K es muy grande (reacción prácticamente completa); si ΔG° es positivo, K &lt; 1.</p>
${warn('Espontáneo no quiere decir rápido',`<p>La termodinámica dice <b>si</b> un proceso puede ocurrir y hacia dónde, pero <b>no cuánto tarda</b>. El diamante se transforma espontáneamente en grafito (ΔG &lt; 0) y sin embargo no lo vemos ocurrir: es lentísimo. Una mezcla de H₂ y O₂ puede quedar años sin reaccionar hasta que una chispa la hace explotar. De ΔG <u>no</u> se puede concluir la velocidad, y de una velocidad alta <u>no</u> se puede concluir que el proceso sea favorable.</p>`)}
<h3>Cinética: ¿qué tan rápido?</h3>
<p>La <b>cinética química</b> estudia la <b>velocidad de reacción</b>: cuánto cambia la concentración de una especie por unidad de tiempo, y de qué depende (concentraciones, temperatura, catalizadores, superficie de contacto).</p>
<ul>
<li><b>Reacción irreversible</b> (en la práctica, “completa”): los productos prácticamente no se reconvierten en reactivos; avanza hasta que se agota el reactivo limitante. Se escribe →.</li>
<li><b>Reacción reversible</b>: ocurren a la vez la reacción directa (por ejemplo, la <b>disociación</b> HA → H⁺ + A⁻) y la inversa (la <b>asociación</b> H⁺ + A⁻ → HA). Se escribe ⇌.</li>
</ul>
<h3>Equilibrio dinámico</h3>
<p>En una reacción reversible, al principio la velocidad directa es grande y la inversa casi nula; a medida que se forman productos, la directa disminuye y la inversa aumenta, hasta que <b>las dos velocidades se igualan</b>. Desde ese momento las concentraciones no cambian, pero <b>las dos reacciones siguen ocurriendo</b>: por eso el equilibrio químico es <b>dinámico</b>.</p>
${M(R`v_{\text{directa}}=v_{\text{inversa}}\neq0\qquad\Rightarrow\qquad\text{concentraciones constantes}`,'condición de equilibrio')}
${fix(`<p>A veces se dice que “las reacciones irreversibles alcanzan un equilibrio estático”. No es así: una reacción idealmente irreversible <b>no se describe como un equilibrio</b>; simplemente avanza hasta que se consume un reactivo. Conviene distinguir tres situaciones:</p>`+table(['Situación','Qué pasa','Ejemplo'],[['Reacción prácticamente completa','se agotó el reactivo limitante; la inversa es despreciable','neutralización H₃O⁺ + HO⁻ → 2 H₂O (K = 10¹⁴)'],['Ausencia de cambio observable','no vemos cambios, pero puede ser porque la reacción es muy lenta (no hay equilibrio)','H₂ + O₂ guardados a temperatura ambiente'],['Equilibrio químico','v directa = v inversa ≠ 0; Q = K','NH₃ en agua, ácido acético en agua']]))}
${idea('Para el resto de la materia','<p>Todo lo que viene (ácido-base, precipitación, complejos y redox) son <b>equilibrios químicos</b> en solución acuosa: se describen con su constante (ley de acción de masas) y se predicen sus cambios con Le Châtelier.</p>')}
`);

  add('acido-base','qac-ab-electrolitos','Electrolitos fuertes y débiles: disolución, disociación e ionización',`
<p>Un <b>electrolito</b> es una sustancia que, disuelta en agua (o fundida), produce <b>iones</b> y por eso conduce la corriente eléctrica. La diferencia entre fuerte y débil está en <b>cuánto</b> de lo disuelto queda como iones.</p>
${table(['','Electrolito fuerte','Electrolito débil','No electrolito'],[
 ['Qué pasa en agua','lo disuelto queda prácticamente todo como iones','sólo una fracción pasa a iones; el resto queda sin disociar, en equilibrio','se disuelve como moléculas, sin formar iones'],
 ['Cómo se escribe','→ sin constante','⇌ con su constante (Ka, Kb)','—'],
 ['Ejemplos','HCl, HNO₃, NaOH, Ba(OH)₂ y casi todas las sales solubles (NaCl, NaAc, NH₄Cl)','HAc, HF, H₂S, NH₃, HSO₄⁻','glucosa, etanol, urea (prácticamente)']])}
${rxs(['NaCl(s) -> Na^+(ac) + Cl^-(ac)','disolución y disociación: electrolito fuerte'],['HCl(g) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','ionización completa: electrolito fuerte'],['HAc(ac) + H2O(l) <=> Ac^-(ac) + H3O^+(ac)','ionización parcial: electrolito débil · Ka = 1,8·10⁻⁵'])}
<h3>No confundir estas palabras</h3>
${table(['Término','Qué significa','Ejemplo'],[
 ['Disolución','el soluto se dispersa en el solvente','el NaCl sólido se disuelve en agua'],
 ['Disociación','un compuesto que ya tiene iones (iónico) los separa al disolverse','NaCl(s) → Na⁺(ac) + Cl⁻(ac)'],
 ['Ionización','una sustancia molecular forma iones al reaccionar con el agua','HCl + H₂O → H₃O⁺ + Cl⁻'],
 ['Hidrólisis','un ion de una sal reacciona con el agua (ácido-base)','Ac⁻ + H₂O ⇌ HAc + HO⁻'],
 ['Solubilidad','<b>cuánto</b> soluto se puede disolver como máximo (solución saturada)','AgCl: s = 1,3·10⁻⁵ M'],
 ['Grado de disociación (α)','qué <b>fracción</b> de lo disuelto está disociada','HAc 0,10 M: α = 1,3 %']])}
${fix(`<p>“Si una sal casi no se disuelve, es un electrolito débil” es <b>falso</b>. Solubilidad y fuerza del electrolito son cosas distintas: el AgCl es muy poco soluble, pero <b>lo poco que se disuelve está totalmente disociado</b> en Ag⁺ y Cl⁻ (es un electrolito fuerte). Al revés, el ácido acético es muy soluble y es un electrolito débil.</p>`)}
${warn('Sal de un ácido débil ≠ electrolito débil',`<p>El acetato de sodio es un electrolito <b>fuerte</b> (se disocia totalmente: NaAc → Na⁺ + Ac⁻). Lo que es débil es la reacción ácido-base del ion acetato con el agua. Conviene decir las dos cosas por separado.</p>`)}
`);

  add('acido-base','qac-ab-magnitud','Criterio de clase: magnitud de las constantes',`
<div class="kitBox qacMagnitud"><b>📐 ¿Una constante es alta, intermedia o baja? · criterio de la cursada</b>
${table(['Magnitud','Orden de K','Qué esperar (para Ka o Kb)'],[
 ['<b>Alta</b>','10⁻¹ a 10⁻²','se disocia una fracción importante: en general <b>no</b> se puede despreciar x frente a C (cuadrática)'],
 ['<b>Intermedia</b>','10⁻³ a 10⁻⁵','depende de la concentración: decidir con C/K &gt; 100 y verificar con el 5 %'],
 ['<b>Baja</b>','10⁻⁶, 10⁻⁷ o menor','se disocia muy poco: suele poder despreciarse lo disociado frente a C']])}
<p class="qacGuideNote">Es una <b>clasificación operativa de esta cursada</b> para orientarse rápido, no una regla universal: lo que decide siempre es comparar la constante con la concentración (C/K &gt; 100) y verificar al final (≤ 5 %). Depende además de qué constante se mire (no es lo mismo una Ka que un Kps o una Kf).</p></div>
${example('Aplicar el criterio a la Tabla 1','<p>Clasificar las Ka de HIO₃, HF, HAc y HCN.</p>',
 table(['Ácido','Ka (Tabla 1)','Magnitud'],[['HIO₃','1,7·10⁻¹','alta'],['HF','6,8·10⁻⁴','intermedia'],['HAc','1,8·10⁻⁵','intermedia'],['HCN','4,9·10⁻¹⁰','baja']])+
 jus('<p>El orden de la constante orienta, pero la decisión de despreciar se toma comparando con la concentración: HAc 0,10 M (C/Ka ≈ 5600) sí admite la aproximación; HAc 10⁻⁴ M (C/Ka ≈ 5,6) no.</p>'),'HIO₃ alta · HF y HAc intermedias · HCN baja')}
`);

  add('acido-base','qac-ab-sistematico','Análisis sistemático del equilibrio: las tres etapas',`
<p>Todos los ejercicios de la materia se resuelven con el mismo método. Primero se <b>describe</b> el sistema, después se <b>analiza cualitativamente</b> (qué pasa y qué se puede despreciar, con fundamento) y recién al final se <b>calcula</b>.</p>
${flow([
 ['Etapa 1 · Descripción del sistema','solvente, solutos, especies y estados de agregación; todas las reacciones con su constante abajo; balance de masa; balance de carga.'],
 ['Etapa 2 · Análisis cualitativo','qué hace cada soluto y el solvente, qué especies predominan, qué se desprecia y respecto de qué, con su justificación.'],
 ['Etapa 3 · Cálculo cuantitativo','despejes, reemplazos y verificación de cada aproximación.']])}
<h3>Etapa 1 · Descripción del sistema</h3>
<ol>
<li><b>Identificar</b> el solvente (agua), los solutos y las especies que aparecen, con su estado de agregación.</li>
<li><b>Escribir todas las reacciones relevantes</b>: disolución, disociación o ionización, hidrólisis, autoprotólisis del agua, precipitación, formación de complejos… Las totales con → y sin constante; las reversibles con ⇌ y <b>su constante debajo</b>.</li>
<li><b>Balance de masa</b> (conservación de la materia): la concentración analítica de cada componente es la suma de las concentraciones de todas las especies en que quedó repartido. Se escribe en <b>molaridad</b> (mol/L). No confundir con la fracción molar (moles de un componente / moles totales) ni con las fracciones de distribución α (fracción de un componente que está como una especie dada).</li>
<li><b>Balance de carga</b> (electroneutralidad): la solución no tiene carga neta, así que la suma de las cargas positivas es igual a la suma de las negativas, cada concentración multiplicada por la carga del ion. Hay <b>un solo</b> balance de carga para todo el sistema acuoso.</li>
</ol>
${M(R`\text{BM: }C_{\mathrm{HA}}=[\mathrm{HA}]+[\mathrm{A^-}]\qquad\qquad\text{BC: }\sum z_i[\text{cationes}]=\sum |z_j|[\text{aniones}]`)}
${fix(`<p>El balance de carga <b>no</b> sale de “que no se transfieran electrones”: en ácido-base se transfieren protones y en redox se transfieren electrones, y en los dos casos la solución sigue siendo eléctricamente neutra. El BC se basa en la <b>electroneutralidad</b>. Tampoco hay que justificar el balance de masa con la ley de acción de masas: el BM es <b>conservación de la materia</b>; la ley de acción de masas da las <b>expresiones de equilibrio</b> (K).</p>`)}
<p>A veces un balance <b>no se puede escribir completo en términos de especies conocidas</b>, porque falta información de composición (por ejemplo, no se sabe qué contraión acompaña a un catión). En ese caso se aclara el supuesto (“consideramos que se agregó como sal de sodio”) o se trabaja sólo con las ecuaciones que no lo necesitan.</p>
<h3>Etapa 2 · Análisis cualitativo: las preguntas guía</h3>
${table(['Pregunta','Para qué sirve'],[
 ['¿Qué soluto tengo?','define qué reacciones escribir'],
 ['¿Es electrolito fuerte o débil?','→ total o ⇌ con constante'],
 ['¿Cómo y cuánto se disocia o ioniza?','magnitud de K frente a la concentración (C/K &gt; 100)'],
 ['¿Qué hace el solvente?','autoprotólisis: siempre está; ¿está reprimida?'],
 ['¿Qué especies predominan?','pH del medio y diagrama de especiación'],
 ['¿Qué constantes y concentraciones conozco?','qué se puede calcular directamente'],
 ['¿Cómo afecta el pH?','protonación de aniones, hidrólisis, precipitación de hidróxidos'],
 ['¿Hay ion común?','Le Châtelier: reprime una disociación']])}
<h3>Las herramientas: qué aporta cada una y qué NO</h3>
${table(['Herramienta','Qué aporta','Qué no se puede deducir de ella sola'],[
 ['Ley de acción de masas (K)','la relación entre concentraciones en el equilibrio','las concentraciones (faltan BM y BC)'],
 ['Balance de masa','conservación: cuánto hay en total de cada componente','cómo se reparte entre especies'],
 ['Balance de carga (electroneutralidad)','una ecuación más que vincula todos los iones','qué ion predomina'],
 ['Le Châtelier','hacia dónde se desplaza un equilibrio perturbado','cuánto se desplaza (eso lo da el cálculo)'],
 ['Producto iónico Q','si un sistema está en equilibrio o hacia dónde va','la velocidad con que llega'],
 ['Diagrama de especiación','qué especie predomina a cada pH (fracciones α)','el pH real ni las concentraciones de una solución concreta'],
 ['Moles y dilución (C₁V₁ = C₂V₂)','concentraciones analíticas después de mezclar o diluir','el equilibrio que se establece después']])}
<h3>Etapa 3 · Cálculo cuantitativo</h3>
<p>Se reemplazan las aproximaciones justificadas en los balances, se despeja, se reemplaza en K y se resuelve. Se muestran todos los pasos y, al final, se <b>verifica</b> cada desprecio (≤ 5 % de la especie frente a la cual se despreció). Los casos modelo de las secciones siguientes (ácido fuerte y ácido débil) siguen este esquema completo.</p>
`);

  // ---------- Caso modelo A: ácido fuerte (HCl) ----------
  add('acido-base','qac-ab-caso-fuerte','Caso modelo A: ácido fuerte en agua (HCl)',`
${example('HCl 0,010 M, análisis sistemático completo','<p>Describir el sistema y calcular el pH y la concentración de todas las especies de una solución de HCl 0,010 M a 25 °C.</p>',
 plan('<p>Se pide el pH de un ácido fuerte. Vamos a describir el sistema (reacciones, BM y BC), justificar por qué el agua aporta poco y por qué no queda HCl sin disociar, y después resolver con el balance de carga. Al final se verifica.</p>')+
 step('1. Datos y especies','<p>Soluto: HCl, C = 0,010 M. Solvente: H₂O(l). Especies en solución: H₃O⁺(ac), Cl⁻(ac), HO⁻(ac) y H₂O(l).</p>')+
 step('2. Reacciones',sys({rx:[['HCl(ac) + H2O(l) -> H3O^+(ac) + Cl^-(ac)','','electrolito fuerte: total, sin constante'],W],bm:[R`C_{\mathrm{HCl}}=0{,}010\ \mathrm{M}=[\mathrm{Cl^-}]\quad(\text{el HCl sin disociar es despreciable})`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]}))+
 step('3. Análisis cualitativo',`<p><b>El soluto.</b> El HCl es un electrolito fuerte: en el modelo que usamos se ioniza por completo, así que la concentración de HCl molecular que queda sin ionizar es despreciable. Cada mol de HCl da un mol de H₃O⁺ y uno de Cl⁻.</p><p><b>El solvente.</b> La autoprotólisis del agua siempre está. Pero el H₃O⁺ que aporta el ácido es un <b>producto</b> de ese equilibrio:</p>`+
  lc('2 H2O(l) <=> H3O^+(ac) + HO^-(ac)','se agregan 0,010 M de H₃O⁺ (ion común)','←',[['[H₃O⁺]','↑'],['[HO⁻]','↓']],'Por Le Châtelier la autoprotólisis se desplaza hacia los reactivos: el agua aporta todavía menos que en agua pura (menos de 10⁻⁷ M).')+
  sup([['[HO⁻] es baja respecto de [Cl⁻] en el BC','la solución es ácida (concentración alta de ácido fuerte) y la autoprotólisis está reprimida por el H₃O⁺ del ácido.']]))+
 step('4. Cálculo',chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{Cl^-}]=0{,}010\ \mathrm{M}`,R`\mathrm{pH}=-\log(0{,}010)=2{,}00`,[R`[\mathrm{HO^-}]=\frac{K_w}{[\mathrm{H_3O^+}]}=\frac{1{,}0\times10^{-14}}{0{,}010}=1{,}0\times10^{-12}\ \mathrm{M}`,'de Kw: la especie “despreciada” existe y se calcula']))+
 step('5. Validación',ver(`<p>${m(R`\frac{[\mathrm{HO^-}]}{[\mathrm{Cl^-}]}\cdot100=\frac{10^{-12}}{0{,}010}\cdot100=10^{-8}\,\%\le5\,\%`)} ✔. BC: ${m(R`0{,}010=0{,}010+10^{-12}`)} ✔ (electroneutralidad).</p>`)+
  deep('Sin despreciar nada (resolución exacta)',`<p>Reemplazando ${m(R`[\mathrm{HO^-}]=K_w/[\mathrm{H_3O^+}]`)} en el BC: ${m(R`[\mathrm{H_3O^+}]^2-C[\mathrm{H_3O^+}]-K_w=0`)}, de donde ${m(R`[\mathrm{H_3O^+}]=\tfrac{C}{2}+\sqrt{\tfrac{C^2}{4}+K_w}`)}. Con C = 0,010 da 0,010 M: la aproximación no cambia el resultado. La diferencia aparece recién con C ≲ 10⁻⁶ M (sección de soluciones muy diluidas).</p>`))+
 jus('<p>El HCl es electrolito fuerte: ionización total, sin constante. Es razonable suponer [HO⁻] baja respecto de [Cl⁻] porque la solución es ácida y el H₃O⁺ del ácido reprime la autoprotólisis (Le Châtelier). Verificado: 10⁻⁸ %.</p>'),
 '[H₃O⁺] = [Cl⁻] = 0,010 M · [HO⁻] = 1,0·10⁻¹² M · pH = 2,00')}
${warn('Fuerte no es lo mismo que muy soluble','<p>“Electrolito fuerte” habla de la disociación de lo disuelto, no de cuánto se disuelve. Además, el modelo de disociación total y de concentraciones en lugar de actividades funciona bien en soluciones diluidas; en soluciones muy concentradas (varios molar) el comportamiento real se aparta de estas fórmulas.</p>')}
`);

  // ---------- Caso modelo B: ácido débil ----------
  add('acido-base','qac-ab-caso-debil','Caso modelo B: ácido débil en agua (ácido fórmico)',`
${example('HCOOH 0,050 M: con y sin aproximaciones','<p>Calcular el pH, la concentración de todas las especies y el grado de disociación de una solución de ácido fórmico 0,050 M. Ka = 1,8·10⁻⁴ (Tabla 1).</p>',
 plan('<p>Es un ácido débil: hay un equilibrio con su Ka. Planteamos el sistema, analizamos qué se puede despreciar (agua y fracción disociada), resolvemos primero aproximando, <b>verificamos</b>, y como la verificación va a fallar, resolvemos la cuadrática. Así se ve por qué siempre hay que verificar.</p>')+
 step('1. Datos y especies','<p>C = 0,050 M de HCOOH. Especies: HCOOH(ac), HCOO⁻(ac), H₃O⁺(ac), HO⁻(ac), H₂O(l).</p>')+
 step('2. Reacciones, constantes y balances',sys({rx:[['HCOOH(ac) + H2O(l) <=> HCOO^-(ac) + H3O^+(ac)',R`K_a=\frac{[\mathrm{HCOO^-}][\mathrm{H_3O^+}]}{[\mathrm{HCOOH}]}=1{,}8\times10^{-4}`],W],bm:[R`C=0{,}050=[\mathrm{HCOOH}]+[\mathrm{HCOO^-}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HCOO^-}]+[\mathrm{HO^-}]`]})+
  '<p>El BM sale de la conservación de la materia (todo el fórmico agregado está como ácido o como formiato); la Ka, de la ley de acción de masas; el BC, de la electroneutralidad. Son 4 incógnitas ([HCOOH], [HCOO⁻], [H₃O⁺], [HO⁻]) y 4 ecuaciones (Ka, Kw, BM, BC).</p>')+
 step('3. Análisis cualitativo',`<p><b>Soluto:</b> electrolito débil; Ka = 1,8·10⁻⁴ es de magnitud intermedia: hay que mirar la concentración. ${m(R`C/K_a=0{,}050/1{,}8\times10^{-4}=278>100`)}: el criterio sugiere que se disocia poco. <b>Solvente:</b> la autoprotólisis está reprimida por el H₃O⁺ del ácido.</p>`+
  sup([['[HO⁻] baja respecto de [HCOO⁻] (BC)','medio ácido: el agua aporta muy poco y está reprimida.'],['[HCOO⁻] baja respecto de C (BM)','C/Ka = 278 &gt; 100.']]))+
 step('4. Cálculo aproximado',chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{HCOO^-}]=x\qquad[\mathrm{HCOOH}]\approx C`,R`K_a=\frac{x^2}{C}\ \Rightarrow\ x=\sqrt{K_aC}=\sqrt{1{,}8\times10^{-4}\cdot0{,}050}=3{,}0\times10^{-3}\ \mathrm{M}`))+
 step('5. Verificación',ver(`<p>${m(R`\frac{x}{C}\cdot100=\frac{3{,}0\times10^{-3}}{0{,}050}\cdot100=6{,}0\,\%>5\,\%`)}: la fracción disociada no es despreciable frente a C. Aunque C/K &gt; 100, la verificación manda.</p>`,false))+
 step('6. Cálculo sin despreciar x frente a C (cuadrática)',chain(R`K_a=\frac{x^2}{C-x}\ \Rightarrow\ x^2+K_ax-K_aC=0`,[R`x=\frac{-K_a+\sqrt{K_a^2+4K_aC}}{2}=\frac{-1{,}8\times10^{-4}+\sqrt{3{,}24\times10^{-8}+3{,}6\times10^{-5}}}{2}=2{,}91\times10^{-3}\ \mathrm{M}`,'se toma la raíz positiva'],R`\mathrm{pH}=-\log(2{,}91\times10^{-3})=2{,}54`))+
 step('7. Todas las especies y validación',table(['Especie','Concentración (M)'],[['H₃O⁺','2,91·10⁻³'],['HCOO⁻','2,91·10⁻³'],['HCOOH','0,050 − 0,00291 = 4,71·10⁻²'],['HO⁻','10⁻¹⁴ / 2,91·10⁻³ = 3,4·10⁻¹²']])+
  ver(`<p>Desprecio del agua: ${m(R`3{,}4\times10^{-12}/2{,}91\times10^{-3}\ll5\,\%`)} ✔. Grado de disociación: ${m(R`\alpha=\frac{[\mathrm{HCOO^-}]}{C}=\frac{2{,}91\times10^{-3}}{0{,}050}=5{,}8\,\%`)}.</p>`))+
 jus('<p>El fórmico es un ácido débil (Ka intermedia). Es razonable suponer [HO⁻] baja respecto de [HCOO⁻] porque el medio es ácido y la autoprotólisis está reprimida. El desprecio de x frente a C no se verificó (6 %), así que se resolvió la cuadrática. La aproximación habría dado pH 2,52: error en el segundo decimal.</p>'),
 'pH = 2,54 · [HCOO⁻] = [H₃O⁺] = 2,91·10⁻³ M · [HCOOH] = 4,71·10⁻² M · α = 5,8 %')}
<h3>¿De qué depende el grado de disociación?</h3>
${table(['Factor','Efecto sobre α','Por qué'],[['Constante (Ka mayor)','α mayor','el equilibrio está más desplazado hacia los iones'],['Concentración (diluir)','α mayor','Le Châtelier: al diluir, el equilibrio se desplaza hacia el lado con más partículas disueltas (ley de dilución de Ostwald)'],['pH (agregar H₃O⁺ o una base)','agregar H₃O⁺ (ion común) baja α; consumir H₃O⁺ con una base sube α','Le Châtelier sobre el equilibrio de ionización']])}
${spec([3.74],['HCOOH','HCOO⁻'],{mark:[{pH:2.54,label:'pH de esta solución'}]})}
<p class="qacGuideNote">El diagrama muestra qué fracción de fórmico está como HCOOH y como HCOO⁻ <b>a cada pH</b>. Para saber en qué punto está esta solución hizo falta el cálculo: el diagrama por sí solo no da el pH.</p>
`);

  append('acido-base','qac-ab-lam',`
<h3>Concentraciones y actividades</h3>
<p>En rigor, la ley de acción de masas se escribe con <b>actividades</b> (concentraciones “efectivas”). En soluciones diluidas la actividad de cada ion es casi igual a su concentración molar, y por eso en la materia se usan concentraciones. Los <b>sólidos puros</b> y el <b>agua como solvente</b> tienen actividad 1: por eso no aparecen en la expresión de K.</p>
${table(['Constante','Equilibrio que describe','Ejemplo'],[['K (general)','cualquier equilibrio','aA + bB ⇌ cC + dD'],['Ka','ionización de un ácido débil','HAc + H₂O ⇌ Ac⁻ + H₃O⁺'],['Kb','reacción de una base débil con agua','NH₃ + H₂O ⇌ NH₄⁺ + HO⁻'],['Kw','autoprotólisis del agua','2 H₂O ⇌ H₃O⁺ + HO⁻'],['Kps','disolución de un sólido poco soluble en equilibrio con sus iones','AgCl(s) ⇌ Ag⁺ + Cl⁻']])}
${fix('<p>El <b>Kps sí es una constante de equilibrio</b>: es la constante del equilibrio heterogéneo entre un sólido poco soluble y sus iones en solución. El sólido no figura en la expresión porque su actividad es 1, no porque el Kps “no sea un equilibrio”.</p>')}
${idea('Ley de acción de masas y choques efectivos','<p>La ley de acción de masas es una relación <b>termodinámica</b> entre las concentraciones en el equilibrio (sale de ΔG° = −RT ln K). La teoría de <b>choques efectivos</b> es un modelo <b>cinético</b>: explica la velocidad de las reacciones (más concentración → más choques por segundo) y sirve como imagen para entender por qué, por ejemplo, un ácido concentrado se disocia en una fracción menor. Pero no reemplaza la explicación del equilibrio: la constante no se deduce de contar choques.</p>')}
`);

  append('acido-base','qac-ab-ph',fix('<p>A veces se dice que [H₃O⁺] y [HO⁻] no pueden superar 1 M y que el pH sólo existe entre 0 y 14. No es una regla: una solución de HCl 2 M tiene, con la definición en concentraciones, pH ≈ −0,3, y una de NaOH 2 M, pH ≈ 14,3. Lo que ocurre es que en soluciones tan concentradas las fórmulas simplificadas (con concentraciones en vez de actividades) dejan de ser exactas. La escala 0–14 es el rango habitual de trabajo, no un límite.</p>'));

  // =====================================================================
  // ÁCIDO-BASE II · polipróticos (H₂SO₄ y H₃PO₄) y las cinco sales
  // =====================================================================
  add('acido-base-2','qac-ab-sulfurico','Ejemplo principal de polipróticos: ácido sulfúrico (y fosfórico para comparar)',`
<p>Un ácido poliprótico cede sus protones <b>de a uno</b>, cada etapa con su constante, y aparecen especies intermedias (anfipróticas). El sulfúrico es especial: la <b>primera</b> etapa es fuerte y la <b>segunda</b> es débil pero con una Ka alta (10⁻²).</p>
${rxs(['H2SO4(ac) + H2O(l) -> HSO4^-(ac) + H3O^+(ac)','1.ª etapa: ácido fuerte, total'],['HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)','2.ª etapa: Ka₂ = 1,2·10⁻² (Tabla 1)'])}
${spec([1.92],['HSO₄⁻','SO₄²⁻'],{mark:[{pH:1.84,label:'H₂SO₄ 0,010 M'}]})}
<p class="qacGuideNote">Diagrama de la segunda etapa (pKa₂ = 1,92). El H₂SO₄ sin disociar no aparece: la primera etapa es total. A pH mayores que ≈ 4 prácticamente todo está como SO₄²⁻.</p>
${example('H₂SO₄ 0,010 M: todas las especies','<p>Calcular el pH y la concentración de todas las especies de una solución de ácido sulfúrico 0,010 M (Ka₂ = 1,2·10⁻²).</p>',
 plan('<p>La primera etapa se resuelve por estequiometría (fuerte). La segunda es un equilibrio con ion común (el H₃O⁺ de la primera). Como Ka₂ es del orden de C, vamos a ver que no se puede despreciar lo que se disocia en la segunda etapa.</p>')+
 step('1. Reacciones, constantes y balances',sys({rx:[['H2SO4(ac) + H2O(l) -> HSO4^-(ac) + H3O^+(ac)','','total'],['HSO4^-(ac) + H2O(l) <=> SO4^2-(ac) + H3O^+(ac)',R`K_{a2}=\frac{[\mathrm{SO_4^{2-}}][\mathrm{H_3O^+}]}{[\mathrm{HSO_4^-}]}=1{,}2\times10^{-2}`],W],bm:[R`C=0{,}010=[\mathrm{HSO_4^-}]+[\mathrm{SO_4^{2-}}]\quad([\mathrm{H_2SO_4}]\approx0)`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{HSO_4^-}]+2[\mathrm{SO_4^{2-}}]+[\mathrm{HO^-}]`]}))+
 step('2. Análisis cualitativo','<p>La 1.ª etapa aporta 0,010 M de H₃O⁺ y de HSO₄⁻. La 2.ª etapa está parcialmente reprimida por ese H₃O⁺ (ion común), pero Ka₂ es <b>alta</b> (criterio de la cursada) y C/Ka₂ = 0,83, muy lejos de 100: <b>no</b> se puede despreciar lo disociado frente a C. El agua sí: medio ácido.</p>'+sup([['[HO⁻] baja respecto de los demás términos del BC','medio claramente ácido; autoprotólisis reprimida.']]))+
 step('3. Cálculo',chain([R`\text{BM y BC con }x=[\mathrm{SO_4^{2-}}]:\ [\mathrm{HSO_4^-}]=0{,}010-x,\quad[\mathrm{H_3O^+}]=0{,}010+x`,'del BC: (0,010 − x) + 2x = 0,010 + x'],R`1{,}2\times10^{-2}=\frac{x\,(0{,}010+x)}{0{,}010-x}\ \Rightarrow\ x^2+0{,}022\,x-1{,}2\times10^{-4}=0`,R`x=\frac{-0{,}022+\sqrt{0{,}022^2+4\cdot1{,}2\times10^{-4}}}{2}=4{,}52\times10^{-3}\ \mathrm{M}`,R`[\mathrm{H_3O^+}]=0{,}01452\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=1{,}84`))+
 step('4. Todas las especies',table(['Especie','Concentración (M)'],[['H₂SO₄','≈ 0 (1.ª etapa total)'],['HSO₄⁻','5,48·10⁻³'],['SO₄²⁻','4,52·10⁻³'],['H₃O⁺','1,45·10⁻²'],['HO⁻','6,9·10⁻¹³']])+
  ver(`<p>BC: 5,48·10⁻³ + 2·4,52·10⁻³ = 1,452·10⁻² ✔. Agua: 6,9·10⁻¹³ frente a 1,45·10⁻² ✔. Con el diagrama: a pH 1,84, ${m(R`\alpha_{\mathrm{SO_4^{2-}}}=\frac{K_{a2}}{K_{a2}+[\mathrm{H_3O^+}]}=0{,}45`)}, que coincide con 4,52·10⁻³/0,010.</p>`))+
 jus('<p>La primera disociación es total (ácido fuerte). La segunda es débil, pero con Ka₂ del orden de C no es razonable suponer x baja respecto de 0,010: se resuelve la cuadrática. El H₃O⁺ de la primera etapa reprime en parte la segunda (ion común).</p>'),
 'pH = 1,84 · [HSO₄⁻] = 5,5·10⁻³ M · [SO₄²⁻] = 4,5·10⁻³ M · ni el “2·C” (pH 1,70) ni el “sólo 1.ª etapa” (pH 2,00) son correctos')}
${example('Para comparar: H₃PO₄ 0,10 M, todas las especies','<p>Calcular el pH y todas las especies (Tabla 1: Ka₁ = 7,5·10⁻³; Ka₂ = 6,2·10⁻⁸; Ka₃ = 4,2·10⁻¹³).</p>',
 step('1. Reacciones y balances',sys({rx:[['H3PO4(ac) + H2O(l) <=> H2PO4^-(ac) + H3O^+(ac)',R`K_{a1}=7{,}5\times10^{-3}`],['H2PO4^-(ac) + H2O(l) <=> HPO4^2-(ac) + H3O^+(ac)',R`K_{a2}=6{,}2\times10^{-8}`],['HPO4^2-(ac) + H2O(l) <=> PO4^3-(ac) + H3O^+(ac)',R`K_{a3}=4{,}2\times10^{-13}`],W],bm:[R`0{,}10=[\mathrm{H_3PO_4}]+[\mathrm{H_2PO_4^-}]+[\mathrm{HPO_4^{2-}}]+[\mathrm{PO_4^{3-}}]`],bc:[R`[\mathrm{H_3O^+}]=[\mathrm{H_2PO_4^-}]+2[\mathrm{HPO_4^{2-}}]+3[\mathrm{PO_4^{3-}}]+[\mathrm{HO^-}]`]}))+
 step('2. Análisis','<p>Ka₁ ≫ Ka₂ ≫ Ka₃ (separadas por más de 10⁴): el H₃O⁺ lo fija la 1.ª etapa y las otras están además reprimidas por ese H₃O⁺. Pero Ka₁ es intermedia-alta y C/Ka₁ = 13 &lt; 100: en la 1.ª etapa no se desprecia x frente a C.</p>'+sup([['[HPO₄²⁻], [PO₄³⁻] y [HO⁻] bajas en el BC','Ka₂ y Ka₃ muy chicas frente a Ka₁ y medio ácido.']]))+
 step('3. Cálculo',chain(R`7{,}5\times10^{-3}=\frac{x^2}{0{,}10-x}\ \Rightarrow\ x=\frac{-7{,}5\times10^{-3}+\sqrt{(7{,}5\times10^{-3})^2+4\cdot7{,}5\times10^{-3}\cdot0{,}10}}{2}=2{,}39\times10^{-2}\ \mathrm{M}`,R`\mathrm{pH}=1{,}62`,[R`[\mathrm{HPO_4^{2-}}]=K_{a2}\frac{[\mathrm{H_2PO_4^-}]}{[\mathrm{H_3O^+}]}\approx K_{a2}=6{,}2\times10^{-8}\ \mathrm{M}`,'[H₂PO₄⁻] ≈ [H₃O⁺]'],R`[\mathrm{PO_4^{3-}}]=K_{a3}\frac{[\mathrm{HPO_4^{2-}}]}{[\mathrm{H_3O^+}]}=\frac{4{,}2\times10^{-13}\cdot6{,}2\times10^{-8}}{2{,}39\times10^{-2}}=1{,}1\times10^{-18}\ \mathrm{M}`))+
 table(['Especie','Concentración (M)'],[['H₃PO₄','7,61·10⁻²'],['H₂PO₄⁻','2,39·10⁻²'],['HPO₄²⁻','6,2·10⁻⁸'],['PO₄³⁻','1,1·10⁻¹⁸'],['H₃O⁺','2,39·10⁻²'],['HO⁻','4,2·10⁻¹³']])+
 spec([2.12,7.21,12.38],['H₃PO₄','H₂PO₄⁻','HPO₄²⁻','PO₄³⁻'],{mark:[{pH:1.62,label:'H₃PO₄ 0,10 M'}]})+
 ver('<p>2·[HPO₄²⁻] = 1,2·10⁻⁷ frente a 2,39·10⁻² en el BC ✔.</p>')+
 jus('<p>Comparación con el sulfúrico: en el H₂SO₄ la 2.ª etapa importa (Ka₂ ≈ C); en el H₃PO₄ la 2.ª y la 3.ª son despreciables para el pH (Ka₂ y Ka₃ muy chicas) y sólo hay que cuidar la 1.ª, que no admite despreciar x frente a C.</p>'),
 'pH = 1,62 · [H₂PO₄⁻] = 2,4·10⁻² M · [HPO₄²⁻] = 6,2·10⁻⁸ M · [PO₄³⁻] = 1,1·10⁻¹⁸ M')}
`);

  const salt=(title,stmt,body,ans)=>example(title,stmt,body,ans);
  add('acido-base-2','qac-ab-sales5','Las sales en orden: NaCl, NaAc, NH₄Cl, NH₄Ac y NH₄NO₂',`
<p>Toda sal soluble es un electrolito fuerte: se disocia por completo. La pregunta ácido-base es otra: <b>¿alguno de sus iones reacciona con el agua?</b> Hay tres casos: ninguno reacciona, reacciona uno solo, o reaccionan los dos. Los vemos en este orden, todos 0,10 M a 25 °C.</p>
${table(['Sal','Catión','Anión','Qué reacciona','Medio'],[['NaCl','Na⁺ (de base fuerte)','Cl⁻ (de ácido fuerte)','ninguno','neutro'],['NaAc','Na⁺ (de base fuerte)','Ac⁻ (de ácido débil)','el anión','básico'],['NH₄Cl','NH₄⁺ (de base débil)','Cl⁻ (de ácido fuerte)','el catión','ácido'],['NH₄Ac','NH₄⁺','Ac⁻','los dos: Ka(NH₄⁺) = Kb(Ac⁻)','neutro'],['NH₄NO₂','NH₄⁺','NO₂⁻','los dos: Ka(NH₄⁺) &gt; Kb(NO₂⁻)','ácido']])}
${salt('1 · NaCl 0,10 M: ningún ion reacciona','',
 sys({rx:[['NaCl(s) -> Na^+(ac) + Cl^-(ac)','','sal soluble: electrolito fuerte'],W],bm:[R`[\mathrm{Na^+}]=[\mathrm{Cl^-}]=0{,}10\ \mathrm{M}`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]\ \Rightarrow\ [\mathrm{H_3O^+}]=[\mathrm{HO^-}]`]})+
 jus('<p>Na⁺ es el catión de una base fuerte y Cl⁻ el anión de un ácido fuerte: sus conjugados no tienen comportamiento ácido-base apreciable. Sólo queda la autoprotólisis: [H₃O⁺] = [HO⁻] = 10⁻⁷ M.</p>'),'pH = 7,00 (neutro)')}
${salt('2 · Acetato de sodio 0,10 M: reacciona el anión','',
 sys({rx:[['NaAc(s) -> Na^+(ac) + Ac^-(ac)','','electrolito fuerte'],['Ac^-(ac) + H2O(l) <=> HAc(ac) + HO^-(ac)',R`K_b=\frac{K_w}{K_a}=\frac{10^{-14}}{1{,}8\times10^{-5}}=5{,}6\times10^{-10}`],W],bm:[R`0{,}10=[\mathrm{HAc}]+[\mathrm{Ac^-}]\qquad[\mathrm{Na^+}]=0{,}10`],bc:[R`[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{Ac^-}]+[\mathrm{HO^-}]`]})+
 sup([['[HAc] baja respecto de [Ac⁻] (BM)','Kb baja (5,6·10⁻¹⁰) y C/Kb ≫ 100.'],['[H₃O⁺] baja respecto de [HO⁻]','medio básico.']])+
 chain(R`[\mathrm{HO^-}]\approx[\mathrm{HAc}]=\sqrt{K_bC}=\sqrt{5{,}6\times10^{-10}\cdot0{,}10}=7{,}5\times10^{-6}\ \mathrm{M}`,R`\mathrm{pOH}=5{,}13\ \Rightarrow\ \mathrm{pH}=8{,}87`)+
 ver('<p>7,5·10⁻⁶/0,10 = 0,0075 % ✔; [H₃O⁺] = 1,3·10⁻⁹ frente a [HO⁻] ✔.</p>'),'pH = 8,87 (básico)')}
${salt('3 · Cloruro de amonio 0,10 M: reacciona el catión','',
 sys({rx:[['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','','electrolito fuerte: se disocia prácticamente por completo'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a=\frac{K_w}{K_b}=\frac{10^{-14}}{1{,}8\times10^{-5}}=5{,}6\times10^{-10}`],W],bm:[R`0{,}10=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]\qquad[\mathrm{Cl^-}]=0{,}10`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]})+
 chain(R`[\mathrm{H_3O^+}]\approx[\mathrm{NH_3}]=\sqrt{5{,}6\times10^{-10}\cdot0{,}10}=7{,}5\times10^{-6}\ \mathrm{M}\ \Rightarrow\ \mathrm{pH}=5{,}13`)+
 fix('<p>El NH₄Cl <b>no</b> tiene “disociación baja”: como sal soluble se disocia prácticamente por completo en NH₄⁺ y Cl⁻. Lo débil es la reacción ácida del NH₄⁺ con el agua.</p>'),'pH = 5,13 (ácido)')}
${salt('4 · Acetato de amonio 0,10 M: reaccionan los dos (constantes iguales)','',
 rxs(['NH4Ac(s) -> NH4^+(ac) + Ac^-(ac)','electrolito fuerte'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','Ka(NH₄⁺) = 5,6·10⁻¹⁰'],['Ac^-(ac) + H2O(l) <=> HAc(ac) + HO^-(ac)','Kb(Ac⁻) = 5,6·10⁻¹⁰'])+
 key(R`[\mathrm{H_3O^+}]=\sqrt{\frac{K_w\,K_a(\text{ácido del anión})}{K_b(\text{base del catión})}}=\sqrt{\frac{10^{-14}\cdot1{,}8\times10^{-5}}{1{,}8\times10^{-5}}}=10^{-7}`,'sal de ácido débil y base débil')+
 jus('<p>Los dos iones hidrolizan con la misma constante: el H₃O⁺ que forma el amonio se neutraliza con el HO⁻ que forma el acetato. La fórmula supone que se hidroliza una fracción chica de cada ion y que [NH₃] ≈ [HAc]; por eso no depende de la concentración.</p>'),'pH = 7,00 (neutro, porque Ka = Kb; no se puede generalizar a otras sales de débil + débil)')}
${salt('5 · Nitrito de amonio 0,10 M: reaccionan los dos (constantes distintas)','<p>Ka (HNO₂) = 4,5·10⁻⁴ (Tabla 1) · Kb (NH₃) = 1,8·10⁻⁵ (Tabla 2).</p>',
 sys({rx:[['NH4NO2(s) -> NH4^+(ac) + NO2^-(ac)','','electrolito fuerte'],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a(\mathrm{NH_4^+})=5{,}6\times10^{-10}`],['NO2^-(ac) + H2O(l) <=> HNO2(ac) + HO^-(ac)',R`K_b(\mathrm{NO_2^-})=\frac{10^{-14}}{4{,}5\times10^{-4}}=2{,}2\times10^{-11}`],W],bm:[R`0{,}10=[\mathrm{NH_4^+}]+[\mathrm{NH_3}]=[\mathrm{NO_2^-}]+[\mathrm{HNO_2}]`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{NO_2^-}]+[\mathrm{HO^-}]`]})+
 '<p><b>Análisis:</b> Ka(NH₄⁺) = 5,6·10⁻¹⁰ es mayor que Kb(NO₂⁻) = 2,2·10⁻¹¹: el amonio genera más H₃O⁺ que el HO⁻ que genera el nitrito. Se espera un medio <b>levemente ácido</b>.</p>'+
 chain(R`[\mathrm{H_3O^+}]=\sqrt{\frac{K_wK_a(\mathrm{HNO_2})}{K_b(\mathrm{NH_3})}}=\sqrt{\frac{10^{-14}\cdot4{,}5\times10^{-4}}{1{,}8\times10^{-5}}}=5{,}0\times10^{-7}\ \mathrm{M}`,R`\mathrm{pH}=6{,}30`)+
 jus('<p>Cuando los dos iones reaccionan, el carácter lo decide la comparación entre la Ka del catión y la Kb del anión: gana el de mayor constante. Acá Ka(NH₄⁺) &gt; Kb(NO₂⁻): ácida.</p>'),'pH = 6,30 (levemente ácido)')}
${spec([9.26],['NH₄⁺','NH₃'],{band:[5.13,8.87]})}
<p class="qacGuideNote">Diagrama del par NH₄⁺/NH₃ (pKa 9,26). En toda la franja sombreada (pH de las sales de los ejemplos 2 a 5) el amonio predomina ampliamente: por eso en esas sales [NH₃] ≪ [NH₄⁺].</p>
`);

  // =====================================================================
  // BUFFER
  // =====================================================================
  add('buffer','qac-bf-requisitos','Los tres requisitos de una solución reguladora (en orden)',`
<p>Para que una solución <b>regule</b> el pH (que cambie muy poco al agregar pequeñas cantidades de ácido o base fuertes, o al diluir) tienen que cumplirse, en este orden:</p>
${flow([
 ['1 · Un par ácido-base conjugado','un ácido débil y su base conjugada (o una base débil y su ácido conjugado), los dos en cantidades apreciables. Conjugados = difieren en <b>un</b> protón: HAc/Ac⁻, NH₄⁺/NH₃, H₂PO₄⁻/HPO₄²⁻.'],
 ['2 · Concentraciones analíticas adecuadas','criterio de la cursada: cada componente entre <b>0,05 M y 1 M</b>. Más concentración = más capacidad reguladora (más moles para “absorber” lo que se agrega).'],
 ['3 · Relación de concentraciones adecuada','criterio de la cursada: el cociente base/ácido (o ácido/base) entre <b>0,1 y 10</b>. Fuera de ese rango una de las formas es escasa y ese lado se agota enseguida.']])}
<p class="qacGuideNote">Los límites 0,05–1 M y 0,1–10 son <b>criterios didácticos de diseño</b> de esta cursada, no fronteras universales: una solución algo más diluida también amortigua, pero con poca capacidad.</p>
<h3>Por qué los componentes van “concentrados”</h3>
<p>En una reguladora habitual las concentraciones de los dos componentes son mucho mayores que [H₃O⁺] y [HO⁻]. Por eso, al agregar un poco de ácido o base fuerte, lo agregado se transforma en el componente débil del par y el cociente cambia poco. No quiere decir que toda reguladora deba ser concentrada: depende de cuánto ácido o base tenga que soportar.</p>
<h3>De la relación 0,1–10 al rango pKa ± 1</h3>
${chain(R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_B}{C_A}`,R`\frac{C_B}{C_A}=10\ \Rightarrow\ \mathrm{pH}=\mathrm{p}K_a+1\qquad\frac{C_B}{C_A}=0{,}1\ \Rightarrow\ \mathrm{pH}=\mathrm{p}K_a-1`)}
<p>Con el criterio 0,1–10, el <b>rango de regulación</b> es pKa − 1 ≤ pH ≤ pKa + 1, y la capacidad es máxima en pH = pKa (relación 1). En el diagrama de especiación es la zona alrededor del cruce, donde las dos formas coexisten en cantidades apreciables. Ojo: que una especie predomine no alcanza; para amortiguar tienen que estar <b>las dos</b>.</p>
${spec([4.74],['HAc','Ac⁻'],{band:[3.74,5.74]})}
${example('Clasificar: ¿es o no es una reguladora?','<p>Para cada mezcla (concentraciones finales), decidir si cumple los tres requisitos.</p>',
 table(['Mezcla','¿Par conjugado?','¿0,05–1 M?','¿0,1–10?','Conclusión'],[
  ['HAc 0,10 M + NaAc 0,10 M','sí','sí','1','<b>regula</b> (pH = pKa = 4,74)'],
  ['HCl 0,10 M + NaCl 0,10 M','no: Cl⁻ no capta H⁺ (ácido fuerte)','—','—','no regula'],
  ['NH₃ 0,50 M + NH₄Cl 0,10 M','sí','sí','5','<b>regula</b> (pH = 9,26 + log 5 = 9,96)'],
  ['H₃PO₄ 0,10 M + Na₂HPO₄ 0,10 M','no: difieren en 2 H⁺ (reaccionan y dan H₂PO₄⁻)','—','—','no como está planteada'],
  ['HAc 0,001 M + NaAc 0,001 M','sí','no (&lt; 0,05)','1','fuera de criterio: capacidad muy baja'],
  ['HAc 0,10 M + NaAc 0,005 M','sí','no (base &lt; 0,05)','0,05','fuera de criterio: casi sin base'],
  ['NaAc 0,10 M sola','falta HAc apreciable','—','—','no regula (sólo hay hidrólisis)']])+
 jus('<p>Primero se mira si hay un par conjugado débil; si no lo hay, no es reguladora aunque las concentraciones sean grandes. Después, concentraciones y relación según el criterio de la cursada.</p>'),'Regulan: HAc/NaAc 0,10/0,10 y NH₃/NH₄Cl 0,50/0,10')}
`);

  add('buffer','qac-bf-nh3','Análisis sistemático de una reguladora: NH₃ + NH₄Cl',`
${example('NH₃ 0,10 M + NH₄Cl 0,20 M','<p>Describir el sistema, analizarlo y calcular el pH (Kb NH₃ = 1,8·10⁻⁵, Tabla 2).</p>',
 plan('<p>Vamos a escribir todas las reacciones y los balances exactos, analizar cada especie (NH₃, NH₄Cl, NH₄⁺ y el agua), justificar qué términos se pueden aproximar y recién ahí calcular. Es el modelo de cómo se resuelve cualquier reguladora.</p>')+
 step('1. Datos y especies','<p>Solutos: NH₃ (base débil) 0,10 M y NH₄Cl (sal soluble) 0,20 M. Especies: NH₃(ac), NH₄⁺(ac), Cl⁻(ac), H₃O⁺(ac), HO⁻(ac), H₂O(l).</p>')+
 step('2. Reacciones y balances exactos',sys({rx:[['NH4Cl(s) -> NH4^+(ac) + Cl^-(ac)','','electrolito fuerte: disociación prácticamente total'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)',R`K_b=\frac{[\mathrm{NH_4^+}][\mathrm{HO^-}]}{[\mathrm{NH_3}]}=1{,}8\times10^{-5}`],['NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)',R`K_a=\frac{K_w}{K_b}=5{,}6\times10^{-10}`],W],bm:[R`[\mathrm{NH_3}]+[\mathrm{NH_4^+}]=0{,}10+0{,}20=0{,}30\qquad[\mathrm{Cl^-}]=0{,}20`],bc:[R`[\mathrm{NH_4^+}]+[\mathrm{H_3O^+}]=[\mathrm{Cl^-}]+[\mathrm{HO^-}]`]})+
  '<p>Combinando BM y BC sin aproximar: '+m(R`[\mathrm{NH_4^+}]=0{,}20+[\mathrm{HO^-}]-[\mathrm{H_3O^+}]`)+' y '+m(R`[\mathrm{NH_3}]=0{,}10-[\mathrm{HO^-}]+[\mathrm{H_3O^+}]`)+'.</p>')+
 step('3. Análisis cualitativo',
  '<p><b>NH₃:</b> base débil; con agua forma NH₄⁺ y HO⁻. Pero ya hay mucho NH₄⁺ (ion común, aportado por la sal):</p>'+
  lc('NH3(ac) + H2O(l) <=> NH4^+(ac) + HO^-(ac)','se agrega NH₄⁺ (0,20 M, ion común)','←',[['[NH₄⁺]','↑'],['[HO⁻]','↓'],['[NH₃]','≈ C']],'La ionización del NH₃ queda reprimida: casi todo el amoníaco sigue como NH₃.')+
  '<p><b>NH₄Cl:</b> electrolito fuerte, se disocia por completo; el Cl⁻ (de ácido fuerte) no hidroliza. No confundir esta disociación total con la reacción ácida, débil, del NH₄⁺.</p><p><b>NH₄⁺:</b> ácido débil; su base conjugada NH₃ ya está presente en cantidad apreciable, así que su ionización ácida también está reprimida (Le Châtelier).</p>'+
  lc('NH4^+(ac) + H2O(l) <=> NH3(ac) + H3O^+(ac)','hay NH₃ (0,10 M, ion común)','←',[['[NH₃]','↑'],['[H₃O⁺]','↓']],'')+
  '<p><b>Solvente:</b> la autoprotólisis está; se espera un pH cercano al pKa (9,26), así que [H₃O⁺] y [HO⁻] son del orden de 10⁻⁹ y 10⁻⁵ M.</p>'+
  sup([['[HO⁻] y [H₃O⁺] bajas respecto de 0,10 y 0,20 en los balances','las dos ionizaciones están reprimidas por ion común. Siguen en el balance exacto: sólo se aproximan en esta suma.']])+
  note('Imagen de choques efectivos (complemento)','<p>Con mucho NH₄⁺ en solución, es más probable que un HO⁻ recién formado choque con un NH₄⁺ y se rearme NH₃ + H₂O. Es una imagen útil, pero lo que justifica el desplazamiento es el equilibrio (Le Châtelier), no el conteo de choques.</p>'))+
 step('4. Cálculo',chain(R`[\mathrm{NH_4^+}]\approx0{,}20\qquad[\mathrm{NH_3}]\approx0{,}10`,R`[\mathrm{HO^-}]=K_b\frac{[\mathrm{NH_3}]}{[\mathrm{NH_4^+}]}=1{,}8\times10^{-5}\cdot\frac{0{,}10}{0{,}20}=9{,}0\times10^{-6}\ \mathrm{M}`,R`\mathrm{pOH}=5{,}05\ \Rightarrow\ \mathrm{pH}=8{,}95\quad(=9{,}26+\log\tfrac{0{,}10}{0{,}20})`))+
 step('5. Validación',ver('<p>[HO⁻] = 9,0·10⁻⁶ frente a 0,10: 0,009 % ✔. [H₃O⁺] = 1,1·10⁻⁹ ✔. Requisitos de reguladora: par conjugado ✔, 0,10 y 0,20 M dentro de 0,05–1 ✔, relación 0,5 dentro de 0,1–10 ✔. pH 8,95 dentro de 9,26 ± 1 ✔.</p>'))+
 jus('<p>Es una reguladora: par NH₄⁺/NH₃ en concentraciones apreciables. Por ion común se reprimen la ionización del NH₃ y la del NH₄⁺, y es razonable suponer [HO⁻] y [H₃O⁺] bajas respecto de las concentraciones analíticas en los balances.</p>'),'pH = 8,95 · [NH₃] ≈ 0,10 M · [NH₄⁺] ≈ 0,20 M · [HO⁻] = 9,0·10⁻⁶ M')}
${fix('<p>Dos frases que conviene evitar: “en las reguladoras <b>nunca</b> se desprecia nada” y “<b>siempre</b> se desprecia el agua”. Las dos son absolutas e incorrectas. Se parte de las expresiones exactas y se aclara <b>qué término</b> se aproxima, <b>respecto de qué</b> y <b>por qué</b>; después se verifica. Tampoco conviene decir que el amoníaco tiene una disociación “intermedia” o “regular”: es una base débil, y en la reguladora su ionización está reprimida por el ion común.</p>')}
`);

  const cand=[
   ['H₂PO₄⁻ / HPO₄²⁻ (fosfórico, 2.ª)','6,2·10⁻⁸ → 7,21','sí (Δ 0,19)','sales sólidas estables, poco tóxicas, baratas','<b>elegido</b>'],
   ['H₂AsO₄⁻ / HAsO₄²⁻ (arsénico, 2.ª)','1,0·10⁻⁷ → 7,00','sí (Δ 0,40)','arsénico: muy tóxico','descartado'],
   ['HClO / ClO⁻ (oxoácido de cloro)','3,0·10⁻⁸ → 7,52','sí (Δ 0,12)','oxidante, se descompone; reacciona con muchas sustancias','descartado'],
   ['HClO₂ / ClO₂⁻ (oxoácido de cloro)','1,1·10⁻² → 1,96','no','además oxidante','descartado'],
   ['H₂S / HS⁻ (sulfhídrico)','9,5·10⁻⁸ → 7,02','sí (Δ 0,38)','gas tóxico y volátil (se pierde), reductor','descartado'],
   ['HSO₃⁻ / SO₃²⁻ (sulfito)','6,4·10⁻⁸ → 7,19','sí (Δ 0,21)','reductor: el O₂ del aire lo oxida a sulfato; puede liberar SO₂','descartado'],
   ['HSO₄⁻ / SO₄²⁻ (sulfato)','1,2·10⁻² → 1,92','no','—','descartado'],
   ['HCrO₄⁻ / CrO₄²⁻ (crómico)','3,0·10⁻⁷ → 6,52','apenas (Δ 0,88)','Cr(VI): tóxico y oxidante; equilibrio con dicromato','descartado'],
   ['H₂CO₃ / HCO₃⁻ (carbónico, 1.ª)','4,3·10⁻⁷ → 6,37','no (Δ 1,03)','el CO₂ escapa de un recipiente abierto (en la sangre lo regulan los pulmones)','descartado'],
   ['HONH₃⁺ / HONH₂ (hidroxilamina)','Ka = Kw/1,1·10⁻⁸ = 9,1·10⁻⁷ → 6,04','no (Δ 1,36)','inestable y tóxica','descartado']];
  add('buffer','qac-bf-diseno','Diseño de una reguladora paso a paso (ejemplo: fosfato a pH 7,4)',`
${flow([
 ['1 · Elegir el par por su pKa','dado el pH objetivo, buscar un par conjugado con pKa dentro de pH ± 1 (lo más cerca posible: más capacidad).'],
 ['2 · Evaluar la viabilidad química y práctica','disponibilidad, estabilidad, toxicidad, manejo y seguridad, reacciones secundarias (redox, precipitación, volatilidad), que la especie exista efectivamente en ese medio y que los pKa del sistema estén bien separados.'],
 ['3 · Comparar y descartar con fundamento','caso por caso, con el pKa de tabla y las condiciones del problema.'],
 ['4 · Calcular C_A y C_B','la relación sale de Henderson; para fijar las concentraciones absolutas hace falta un dato más (una concentración total, una capacidad o el criterio 0,05–1 M). La relación sola no alcanza.'],
 ['5 · Calcular las cantidades','moles = C·V; masas con la masa molar (y la pureza si corresponde) o volúmenes de soluciones; al preparar, ajustar el pH final con pHmetro.']])}
${example('Reguladora de fosfato de pH 7,40 (1,00 L)','<p class="qacGuideNote">Ejemplo elaborado para enseñar el método (pH del plasma); no es un ejercicio de la carpeta. Constantes de las Tablas 1 y 2.</p><p>Diseñar 1,00 L de una solución reguladora de pH 7,40, eligiendo entre los sistemas que se mencionan en clase.</p>',
 step('1 y 2 · Candidatos y evaluación',table(['Par','Ka → pKa','¿pH 7,4 en pKa ± 1?','Viabilidad','Decisión'],cand))+
 step('3 · Elección',jus('<p>El par H₂PO₄⁻/HPO₄²⁻ tiene el pKa más cercano entre los viables (7,21) y sus sales (NaH₂PO₄ y Na₂HPO₄) son sólidos estables, solubles y de bajo riesgo. Los pKa del fosfórico están bien separados (2,12 · 7,21 · 12,38): a pH 7,4 sólo importan esas dos especies. H₂CO₃ existe en equilibrio en solución acuosa (aunque es inestable y no se puede aislar), pero en un recipiente abierto pierde CO₂.</p>'))+
 step('4 · Relación y concentraciones',chain(R`\frac{C_B}{C_A}=\frac{[\mathrm{HPO_4^{2-}}]}{[\mathrm{H_2PO_4^-}]}=10^{\,7{,}40-7{,}21}=10^{0{,}19}=1{,}55`,['\\text{criterio 0,05–1 M: elegimos }C_A=0{,}100\\ \\mathrm{M}\\ \\Rightarrow\\ C_B=0{,}155\\ \\mathrm{M}','dato adicional fijado por quien diseña'])+
  ver('<p>0,100 y 0,155 M dentro de 0,05–1 M ✔; relación 1,55 dentro de 0,1–10 ✔; pH 7,40 dentro de 7,21 ± 1 ✔; [H₃O⁺] = 4·10⁻⁸ M y [HO⁻] = 2,5·10⁻⁷ M ≪ C_A, C_B ✔ (Henderson vale).</p>'))+
 step('5 · Cantidades para 1,00 L',chain(R`n_{\mathrm{NaH_2PO_4}}=0{,}100\ \mathrm{mol}\ \to\ 0{,}100\cdot119{,}98=12{,}0\ \mathrm{g}`,R`n_{\mathrm{Na_2HPO_4}}=0{,}155\ \mathrm{mol}\ \to\ 0{,}155\cdot141{,}96=22{,}0\ \mathrm{g}`)+
  deep('Otra forma: a partir de H₃PO₄ y NaOH (neutralización parcial)',`<p>El fósforo total es 0,255 mol: se parte de 0,255 mol de H₃PO₄. Con 0,255 mol de NaOH todo pasa a H₂PO₄⁻; con 0,155 mol más, esa cantidad pasa a HPO₄²⁻. Total: ${m(R`n_{\mathrm{NaOH}}=0{,}255+0{,}155=0{,}410\ \mathrm{mol}`)}. Si los reactivos no son puros, se divide por la pureza; si se usan soluciones, se pasa por % y densidad.</p>`)+
  '<p>Se disuelven los sólidos en menos agua, se ajusta el pH con pHmetro (la fuerza iónica corre un poco el pKa efectivo) y se lleva a 1,00 L.</p>'),
 'NaH₂PO₄ 12,0 g + Na₂HPO₄ 22,0 g en 1,00 L (C_A = 0,100 M; C_B = 0,155 M)')}
`);

  // =====================================================================
  // PRECIPITACIÓN
  // =====================================================================
  append('precipitacion','qac-pp-kps',fix('<p>El Kps <b>es</b> una constante de equilibrio: la del equilibrio heterogéneo entre el sólido y sus iones. La reacción de disolución se escribe con el <b>sólido a la izquierda</b> y los iones acuosos a la derecha, con doble flecha. Q &gt; Kps indica la <b>tendencia termodinámica</b> a precipitar; en la práctica, una solución apenas sobresaturada puede tardar en formar precipitado (hace falta que se formen núcleos sólidos), y en soluciones concentradas las actividades se apartan de las concentraciones.</p>'));

  add('precipitacion','qac-pp-mezcla','Ejercicio clave: ¿precipita AgCl al mezclar 10 mL + 10 mL?',`
${example('10 mL de Ag⁺ 10⁻⁵ M + 10 mL de Cl⁻ 10⁻⁵ M','<p>Se mezclan 10 mL de una solución 10⁻⁵ M de Ag⁺ con 10 mL de una solución 10⁻⁵ M de Cl⁻. ¿Precipita AgCl? Kps (AgCl) = 1,8·10⁻¹⁰ (Tabla 5, temperatura ambiente). Supuesto didáctico: la plata se agregó como AgNO₃ y el cloruro como NaCl.</p>',
 plan('<p>Para decidir si precipita hay que comparar el producto iónico Q con el Kps. El error clásico es usar las concentraciones de las soluciones originales: primero hay que calcular las concentraciones <b>después de mezclar</b> (dilución), y recién ahí Q.</p>')+
 step('1. Composición y volumen final','<p>V total = 10 + 10 = 20 mL. Antes de cualquier reacción, en la mezcla hay Ag⁺, NO₃⁻, Na⁺ y Cl⁻ (sales solubles: electrolitos fuertes), y el agua.</p>')+
 step('2. Dilución de cada ion',chain(R`[\mathrm{Ag^+}]=\frac{10^{-5}\cdot10}{20}=5{,}0\times10^{-6}\ \mathrm{M}\qquad[\mathrm{Cl^-}]=\frac{10^{-5}\cdot10}{20}=5{,}0\times10^{-6}\ \mathrm{M}`))+
 step('3. Equilibrio posible',rxs(['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','Kps = [Ag⁺][Cl⁻] = 1,8·10⁻¹⁰'])+M(R`\text{BC (supuesto AgNO}_3\text{ y NaCl): }[\mathrm{Ag^+}]+[\mathrm{Na^+}]+[\mathrm{H_3O^+}]=[\mathrm{NO_3^-}]+[\mathrm{Cl^-}]+[\mathrm{HO^-}]`,'no hace falta para decidir con Q, pero el sistema es neutro'))+
 step('4. Producto iónico y comparación',chain(R`Q=[\mathrm{Ag^+}][\mathrm{Cl^-}]=(5{,}0\times10^{-6})^2=2{,}5\times10^{-11}`,R`Q=2{,}5\times10^{-11}<K_{ps}=1{,}8\times10^{-10}`))+
 jus('<p>Con las concentraciones ya diluidas, Q es menor que Kps: la solución queda <b>no saturada</b> y no hay tendencia a precipitar. Si se hubieran usado las concentraciones originales (Q = 10⁻¹⁰) se habría llegado igual a “no precipita”, pero con el número mal planteado.</p>')+
 deep('Variante: con 10⁻⁴ M cada una',`<p>Diluidas: 5,0·10⁻⁵ M cada ion; Q = 2,5·10⁻⁹ &gt; Kps: <b>precipita</b> hasta que Q = Kps. Como precipitan cantidades iguales de Ag⁺ y Cl⁻ y estaban en igual concentración, en el equilibrio ${m(R`[\mathrm{Ag^+}]=[\mathrm{Cl^-}]=\sqrt{K_{ps}}=1{,}34\times10^{-5}\ \mathrm{M}`)}; precipitó ${m(R`5{,}0\times10^{-5}-1{,}34\times10^{-5}=3{,}7\times10^{-5}\ \mathrm{M}`)}.</p>`),
 'Q = 2,5·10⁻¹¹ &lt; Kps: no precipita AgCl')}
${warn('Sobre el balance de carga en precipitación','<p>No se omite “porque no hay pH”. El balance global siempre existe e incluye <b>todos</b> los iones (también los contraiones como NO₃⁻ y Na⁺). En los ejercicios que sólo piden Q o la solubilidad, puede no hacer falta escribirlo explícitamente porque no aporta una ecuación necesaria para la respuesta.</p>')}
`);

  add('precipitacion','qac-pp-ag2cro4','Solubilidad molar: cromato de plata (y con ion común)',`
${example('Ag₂CrO₄ en agua pura','<p>Calcular la solubilidad molar del Ag₂CrO₄ en agua y la concentración de cada ion. Kps = 1,1·10⁻¹² (Tabla 5).</p>',
 step('1. Reacción y Kps',rxs(['Ag2CrO4(s) <=> 2 Ag^+(ac) + CrO4^2-(ac)','Kps = [Ag⁺]²[CrO₄²⁻]']))+
 step('2. Balance de materia',M(R`\text{por cada } s \text{ mol/L disueltos: }[\mathrm{Ag^+}]=2s\qquad[\mathrm{CrO_4^{2-}}]=s`))+
 step('3. Supuestos',sup([['El CrO₄²⁻ no se protona apreciablemente','es la base conjugada del HCrO₄⁻ (Ka = 3,0·10⁻⁷): Kb = 3,3·10⁻⁸, chica; en agua pura su efecto sobre s es pequeño.'],['El Ag⁺ no forma otras especies','no hay ligandos ni pH extremo.']]))+
 step('4. Cálculo',chain(R`K_{ps}=(2s)^2\,s=4s^3`,R`s=\sqrt[3]{\frac{1{,}1\times10^{-12}}{4}}=6{,}5\times10^{-5}\ \mathrm{M}`,R`[\mathrm{Ag^+}]=1{,}3\times10^{-4}\ \mathrm{M}\qquad[\mathrm{CrO_4^{2-}}]=6{,}5\times10^{-5}\ \mathrm{M}`,R`s=6{,}5\times10^{-5}\cdot331{,}7=2{,}2\times10^{-2}\ \mathrm{g/L}`))+
 note('¿Y el balance de cargas?','<p>Existe: '+m(R`[\mathrm{Ag^+}]+[\mathrm{H_3O^+}]=2[\mathrm{CrO_4^{2-}}]+[\mathrm{HCrO_4^-}]+[\mathrm{HO^-}]`)+'. En este cálculo introductorio no se usa porque el balance de materia (2s y s) ya alcanza; el sistema es igualmente neutro.</p>'),
 's = 6,5·10⁻⁵ M (22 mg/L)')}
${example('Ag₂CrO₄ en K₂CrO₄ 0,010 M (ion común)','',
 chain(R`K_{ps}=(2s)^2(0{,}010+s)\approx4s^2\cdot0{,}010`,R`s=\sqrt{\frac{1{,}1\times10^{-12}}{0{,}040}}=5{,}2\times10^{-6}\ \mathrm{M}`)+
 ver('<p>s = 5,2·10⁻⁶ frente a 0,010: 0,05 % ✔.</p>')+
 jus('<p>El CrO₄²⁻ agregado es ion común: por Le Châtelier el equilibrio de disolución se desplaza hacia el sólido y la solubilidad baja unas 12 veces.</p>'),'s = 5,2·10⁻⁶ M (menor que en agua: 6,5·10⁻⁵ M)')}
`);

  add('precipitacion','qac-pp-factores','Factores que afectan la precipitación: ion común, pH y complejos',`
${table(['Factor','Qué hace','Efecto sobre la solubilidad'],[
 ['Ion común','aumenta la concentración de un ion del equilibrio de disolución','baja (Le Châtelier hacia el sólido)'],
 ['pH','protona el anión (si es base débil: S²⁻, CO₃²⁻, CrO₄²⁻, F⁻) o fija [HO⁻] en los hidróxidos','acidificar disuelve sales de aniones básicos; alcalinizar precipita hidróxidos'],
 ['Formación de complejos','el catión libre pasa a complejo (Ag⁺ → [Ag(NH₃)₂]⁺)','sube: baja el ion libre, Q &lt; Kps y se disuelve más sólido (ver Complejos)']])}
${example('Cloruro férrico: hidrólisis y precipitación de Fe(OH)₃','<p>El FeCl₃ es una sal <b>soluble</b> (no es un sólido poco soluble). ¿Por qué sus soluciones se enturbian si no se acidifican? FeCl₃ 0,010 M; Kps Fe(OH)₃ = 4·10⁻³⁸ (Tabla 5).</p>',
 rxs(['FeCl3(s) -> Fe^3+(ac) + 3 Cl^-(ac)','sal soluble: electrolito fuerte'],['[Fe(H2O)6]^3+(ac) + H2O(l) <=> [Fe(OH)(H2O)5]^2+(ac) + H3O^+(ac)','hidrólisis ácida del catión (Ka ≈ 6·10⁻³)'],['Fe(OH)3(s) <=> Fe^3+(ac) + 3 HO^-(ac)','Kps = 4·10⁻³⁸'])+
 chain(['[\\mathrm{HO^-}]_{\\text{inicio}}=\\sqrt[3]{\\frac{4\\times10^{-38}}{0{,}010}}=1{,}6\\times10^{-12}\\ \\mathrm{M}\\ \\Rightarrow\\ \\mathrm{pH}=2{,}2','pH a partir del cual Q supera el Kps'])+
 jus('<p>El Fe³⁺ es un catión ácido: su hidrólisis acidifica la solución, pero el pH que alcanza por sí sola (≈ 2,3 para 0,010 M) ya supera el pH de inicio de precipitación del Fe(OH)₃ (2,2): aparece turbidez. Por eso las soluciones de FeCl₃ se preparan agregando un poco de HCl. Según el pH, el hierro queda como Fe³⁺ (hidratado), como hidroxocomplejos o como Fe(OH)₃(s).</p>'),'Fe(OH)₃ empieza a precipitar a pH ≈ 2,2: hay que acidificar')}
${fix('<p>“Se disuelve por debajo del límite de solubilidad, entonces es un electrolito débil” mezcla dos ideas. La <b>cantidad disuelta</b> (solubilidad) no dice nada sobre el <b>grado de disociación de lo disuelto</b>: el AgCl, el BaSO₄ y el Fe(OH)₃ se disuelven muy poco, pero lo disuelto está disociado en sus iones.</p>')}
`);

  // =====================================================================
  // COMPLEJOS
  // =====================================================================
  add('complejos','qac-cx-diamminplata','El complejo diamminplata(I): Kf₁, Kf₂ y β₂',`
<p>El ion <b>Ag⁺</b> actúa como <b>ácido de Lewis</b> (acepta pares de electrones) y cada molécula de <b>NH₃</b> como <b>ligando</b>: dona su par libre del nitrógeno y forma un <b>enlace coordinado</b> con la plata. El complejo final, [Ag(NH₃)₂]⁺, tiene dos ligandos (número de coordinación 2, lineal).</p>
<h3>Los ligandos entran de a uno</h3>
${rxs(['Ag^+(ac) + NH3(ac) <=> [Ag(NH3)]^+(ac)','Kf₁ = [Ag(NH₃)⁺] / ([Ag⁺][NH₃]) ≈ 2,1·10³'],['[Ag(NH3)]^+(ac) + NH3(ac) <=> [Ag(NH3)2]^+(ac)','Kf₂ = [Ag(NH₃)₂⁺] / ([Ag(NH₃)⁺][NH₃]) ≈ 8,1·10³'],['Ag^+(ac) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac)','global: β₂ = Kf₁·Kf₂ ≈ 1,7·10⁷'])}
${key(R`\beta_2=\frac{[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{Ag^+}][\mathrm{NH_3}]^2}=K_{f1}\cdot K_{f2}\qquad\beta_n=K_{f1}K_{f2}\cdots K_{fn}\qquad\beta_1=K_{f1}`,'constantes acumulativas (globales)')}
${table(['Símbolo','Qué es'],[['Kf₁, Kf₂… (escalonadas)','la constante de cada paso: entra <b>un</b> ligando'],['βₙ (global o acumulativa)','la formación completa desde el metal libre con n ligandos: producto de las escalonadas'],['Kf “a secas”','en muchas tablas y en los ejercicios del curso, es la β global del complejo con más ligandos']])}
<p class="qacGuideNote">Valores típicos a 25 °C (log Kf₁ ≈ 3,3; log Kf₂ ≈ 3,9). Las tablas no usan todas la misma notación: antes de usar una constante, fijarse a qué reacción corresponde. Si el ejercicio da otra, se usa la del ejercicio.</p>
${example('Especies de plata en Ag⁺ 1,0·10⁻³ M + NH₃ 0,10 M','<p>Calcular [Ag⁺] libre, [Ag(NH₃)⁺] y [Ag(NH₃)₂⁺].</p>',
 sup([['Casi toda la plata está como [Ag(NH₃)₂]⁺','β₂ grande y NH₃ en exceso (0,10 frente a 2·10⁻³ que consume el complejo).'],['NH₃ libre ≈ 0,10 − 2·10⁻³ = 0,098 M','despreciando por ahora la pequeña fracción que se protona a NH₄⁺ (sección Complejos + ácido-base).']])+
 chain(R`[\mathrm{Ag^+}]=\frac{[\mathrm{Ag(NH_3)_2^+}]}{\beta_2[\mathrm{NH_3}]^2}=\frac{1{,}0\times10^{-3}}{1{,}7\times10^{7}\cdot0{,}098^2}=6{,}1\times10^{-9}\ \mathrm{M}`,R`[\mathrm{Ag(NH_3)^+}]=K_{f1}[\mathrm{Ag^+}][\mathrm{NH_3}]=2{,}1\times10^{3}\cdot6{,}1\times10^{-9}\cdot0{,}098=1{,}3\times10^{-6}\ \mathrm{M}`)+
 ver('<p>[Ag⁺] + [Ag(NH₃)⁺] = 1,3·10⁻⁶ M frente a 1,0·10⁻³: 0,13 % ✔. La plata está como diamminplata.</p>'),
 '[Ag(NH₃)₂⁺] ≈ 1,0·10⁻³ M · [Ag(NH₃)⁺] = 1,3·10⁻⁶ M · [Ag⁺] = 6,1·10⁻⁹ M')}
`);

  add('complejos','qac-cx-ligando','¿Alcanza el amoníaco? Disolver AgCl: estequiometría y equilibrio',`
<p>Para disolver un precipitado formando un complejo hay dos condiciones, y no son la misma:</p>
${flow([['Condición estequiométrica (necesaria)','tiene que haber moles de ligando suficientes para formar el complejo con toda la plata: 2 mol de NH₃ por mol de Ag.'],['Condición de equilibrio (suficiente)','además tiene que quedar ligando <b>libre</b> suficiente para que se cumpla la constante de la reacción global con todo disuelto.']])}
${example('AgCl 0,010 mol en 1 L: ¿cuánto NH₃ hace falta?','<p>Kps AgCl = 1,8·10⁻¹⁰ (Tabla 5); β₂ = 1,7·10⁷.</p>',
 rxs(['AgCl(s) <=> Ag^+(ac) + Cl^-(ac)','Kps'],['Ag^+(ac) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac)','β₂'],['AgCl(s) + 2 NH3(ac) <=> [Ag(NH3)2]^+(ac) + Cl^-(ac)','K = Kps·β₂'])+
 chain(R`K=1{,}8\times10^{-10}\cdot1{,}7\times10^{7}=3{,}1\times10^{-3}`,['\\text{todo disuelto: }[\\mathrm{Ag(NH_3)_2^+}]=[\\mathrm{Cl^-}]=0{,}010\\ \\mathrm{M}','balance de materia'],R`[\mathrm{NH_3}]_{\text{libre}}=\sqrt{\frac{0{,}010\cdot0{,}010}{3{,}1\times10^{-3}}}=0{,}18\ \mathrm{M}`,R`C_{\mathrm{NH_3}}\ge0{,}18+2\cdot0{,}010=0{,}20\ \mathrm{M}`)+
 jus('<p>La estequiometría sola pedía 0,020 M de NH₃; el equilibrio exige además 0,18 M de NH₃ libre. Con 0,020 M no se disolvería todo. A esto se suma que una pequeña parte del NH₃ se protona (NH₃ + H₂O ⇌ NH₄⁺ + HO⁻), lo que reduce el ligando libre disponible: si el medio fuera ácido, el NH₄⁺ formado no complejaría la plata.</p>'),'Hace falta NH₃ total ≥ 0,20 M (no alcanza con los 0,020 M estequiométricos)')}
`);
})();
