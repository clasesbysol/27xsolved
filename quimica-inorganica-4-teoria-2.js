// 27xSOLved · Química Inorgánica 4.º · TEORÍA (2/2)
// Unidades: 4 Térreos, carbonoides y nitrogenoides · 5 Carbono · 6 Nitrógeno.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI;if(!K||!Q)return;
  const {m,chain,idea,warn,fix,note,deep,example,step,table,figure,cards,simple}=K;
  const {rx,rxs,f,vira,swatch,pic,pics,punch,facts,svg}=Q;
  const R=String.raw;

  // =====================================================================
  // UNIDAD 4 · TÉRREOS, CARBONOIDES Y NITROGENOIDES
  // =====================================================================
  const s4=[];const a4=(key,label,kicker,html)=>s4.push({key:`qi-pb-${key}`,label,kicker,html});

  a4('mapa','El mapa de los grupos 13, 14 y 15','BLOQUE p · 01',`
<p>Entramos en el <b>bloque p</b>: la zona de la tabla donde conviven metales, metaloides y no metales. En cada grupo, al bajar, el carácter metálico <b>aumenta</b>. Es como una escalera que va del mundo no metálico (arriba a la derecha) al metálico (abajo a la izquierda).</p>
${pic('tabla-grupos-13-14-15.webp','Tabla periódica con los grupos 13 (térreos), 14 (carbonoides) y 15 (nitrogenoides) señalados','Ubicación de los térreos, carbonoides y nitrogenoides.')}
${table(['','Grupo 13 · térreos','Grupo 14 · carbonoides','Grupo 15 · nitrogenoides'],[
 ['Elementos','B, Al, Ga, In, Tl','C, Si, Ge, Sn, Pb','N, P, As, Sb, Bi'],
 ['Configuración externa','ns² np¹ (3 e⁻)','ns² np² (4 e⁻)','ns² np³ (5 e⁻)'],
 ['Estados de oxidación típicos','+3 (Tl: +1)','+4 y +2 (Pb: +2)','−3, +3, +5 (N: de −3 a +5)'],
 ['No metales','—','C','N, P'],
 ['Metaloides','B','Si, Ge','As, Sb'],
 ['Metales','Al, Ga, In, Tl','Sn, Pb','Bi (metal “pobre”)']
])}
${punch('Arriba manda el no metal (óxidos ácidos); abajo, el metal (óxidos básicos o anfóteros).')}
${fix('Sobre el nombre “térreos”','<p>El apunte dice que el aluminio es “el elemento más abundante de la Tierra”. Más preciso: es el <b>metal</b> más abundante de la corteza (≈ 7,5–8 %). El elemento más abundante de la corteza es el <b>oxígeno</b>, y le sigue el silicio.</p>')}
${idea('El grupo 14 es el “punto medio”','<p>Sus electronegatividades y energías de ionización son intermedias entre metales y no metales. Por eso es el grupo donde el cambio es más dramático: el C es un no metal típico, el Si y el Ge semiconductores, y el Sn y el Pb metales hechos y derechos.</p>')}
`);

  a4('par-inerte','El efecto del par inerte','BLOQUE p · 02',`
<p>Si el grupo 14 tiene 4 electrones externos, uno esperaría siempre +4. Pero el plomo prefiere <b>+2</b>. ¿Por qué?</p>
${figure(svg.parInerte,'En los elementos pesados, el par ns² queda retenido: sólo se pierden los electrones np.')}
<p>Al bajar en la tabla aparecen niveles <b>d y f completos</b> entre el núcleo y los electrones externos. Esos electrones protegen mal la carga nuclear, y el par <b>ns²</b> queda “pegado” al núcleo: cuesta mucho sacarlo. Sólo se pierden los electrones <b>np</b>.</p>
${table(['Grupo','Estado “de par inerte”','Ejemplo'],[
 ['13','+1 (en vez de +3)','Tl⁺ es más estable que Tl³⁺'],
 ['14','+2 (en vez de +4)','Pb²⁺ es más estable que Pb⁴⁺'],
 ['15','+3 (en vez de +5)','Bi³⁺ es más estable que Bi⁵⁺']
])}
${idea('Consecuencia práctica: el Pb(IV) es oxidante','<p>Como el Pb⁴⁺ “quiere” volver a Pb²⁺, compuestos como el PbO₂ son <b>oxidantes</b> fuertes: le sacan electrones a otras especies para recuperar su estado cómodo.</p>')}
`);

  a4('diagonal','Boro y silicio: parientes en diagonal','BLOQUE p · 03',`
<p>El boro (grupo 13) se parece más al silicio (grupo 14, un período más abajo) que a su propio vecino de grupo, el aluminio. Es la <b>relación diagonal</b>: al moverse en diagonal, el aumento de tamaño y la disminución de carga se compensan.</p>
${table(['Propiedad','Boro','Silicio','En cambio…'],[
 ['Óxido','B₂O₃ sólido, ácido','SiO₂ sólido, ácido','Al₂O₃ es anfótero · CO₂ es un gas ácido'],
 ['Ácido','H₃BO₃ muy débil','H₄SiO₄ muy débil','Al(OH)₃ es anfótero'],
 ['Hidruros','varios, gaseosos e inflamables (boranos)','varios, gaseosos e inflamables (silanos)','el aluminio tiene uno solo, sólido'],
 ['Con oxígeno','redes –O–B–O– (poliboratos)','redes –O–Si–O– (polisilicatos)','—']
])}
${punch('Lo más icónico que comparten: enlaces B–O y Si–O fortísimos que forman redes covalentes gigantes.')}
`);

  a4('boro','Compuestos del boro: boratos y bórax','BLOQUE p · 04',`
<p>Los boratos son cadenas o anillos de boro y oxígeno. La unidad básica es el <b>BO₃</b>, un triángulo plano: se dibuja como un triángulo con un O en cada vértice. Dos triángulos unidos forman el diborato, tres el triborato, y así.</p>
${pic('diborato.webp','Ion diborato: dos unidades BO3 unidas por un oxígeno, dibujadas como triángulos','Ion diborato: dos unidades BO₃ que comparten un oxígeno.')}
<h3>El bórax, Na₂B₄O₇</h3>
<p>Es el borato más usado (tetraborato de disodio; “tetra” por sus cuatro átomos de boro). No es corrosivo y <b>neutraliza ácidos</b>, por eso se usó para tratar quemaduras con ácido:</p>
${pic('borax-estructura.webp','Estructura del ion tetraborato con dos iones sodio','Estructura del tetraborato: anillos B–O con dos cargas negativas.')}
${rx('Na2B4O7(ac) + 2 HCl(ac) + 5 H2O(l) -> 2 NaCl(ac) + 4 H3BO3(ac)')}
${fix('Corrección del apunte: 5 H₂O, no 7','<p>El apunte escribe 7 H₂O, pero entonces no cierran los H ni los O. Contemos con 5: <b>O</b> 7 + 5 = 12 = 4·3 ✓ · <b>H</b> 2 + 10 = 12 = 4·3 ✓. (Si se parte del bórax decahidratado, Na₂B₄O₇·10H₂O, el agua de cristalización ya aporta lo necesario.)</p>')}
<h3>Perlas de bórax</h3>
<p>El bórax funde a baja temperatura y se descompone. El óxido bórico fundido disuelve óxidos metálicos y forma un vidrio coloreado (una “perla” en la punta de un alambre): un ensayo clásico de identificación.</p>
${rxs(['Na2B4O7(s) =[Δ]=> Na2O(s) + 2 B2O3(l)','como lo plantea el apunte'],['B2O3(l) + CoO(s) -> Co(BO2)2(s)','metaborato de cobalto: perla azul intensa'])}
${idea('El ácido bórico es un ácido raro','<p>No libera un H⁺ propio: el boro tiene un orbital vacío y <b>acepta un OH⁻</b> del agua (ácido de Lewis), dejando libre un H⁺.</p>'+rx('B(OH)3(ac) + H2O(l) <=> [B(OH)4]^-(ac) + H^+(ac)'))}
${note('Dato de color','<p>El “slime” casero se hace con bórax: los boratos unen entre sí las cadenas del pegamento (alcohol polivinílico) y forman esa masa elástica.</p>')}
`);

  a4('silicio','Compuestos del silicio: sílice y silicatos','BLOQUE p · 05',`
<p>El <b>dióxido de silicio</b> es el compuesto más importante del silicio: la arena, el cuarzo y el vidrio. No existen moléculas de “SiO₂”: es un <b>sólido covalente</b> gigante, mejor escrito como (SiO₂)ₓ, hecho de tetraedros SiO₄ que comparten vértices. A temperatura ambiente, la red más estable es el <b>cuarzo</b>.</p>
${pic('silicatos.webp','Tipos de silicatos según cómo se unen los tetraedros SiO4: neso, soro, ciclo, tecto e inosilicatos','Los silicatos se clasifican según cuántos oxígenos comparte cada tetraedro.')}
${table(['Tipo','Cómo se unen los tetraedros','Unidad','Ejemplo'],[
 ['Nesosilicatos','aislados','(SiO₄)⁴⁻','olivino'],
 ['Sorosilicatos','de a dos','(Si₂O₇)⁶⁻','—'],
 ['Ciclosilicatos','en anillos','(Si₆O₁₈)¹²⁻','berilo (esmeralda)'],
 ['Inosilicatos','cadenas simples (piroxenos) o dobles (anfíboles)','(Si₂O₆)⁴⁻ · (Si₄O₁₁)⁶⁻','—'],
 ['Tectosilicatos','red tridimensional completa','(SiO₂)⁰','cuarzo, feldespatos']
])}
${idea('¿Y la carga negativa?','<p>Los oxígenos que <b>no</b> están compartidos entre dos silicios quedan con carga negativa. Los cationes metálicos que se meten en la red compensan esa carga y mantienen el sólido neutro.</p>')}
<h3>Vidrio líquido y el “jardín químico”</h3>
<p>El <b>metasilicato de sodio</b> (Na₂SiO₃) es uno de los pocos silicatos solubles: su solución saturada se llama <b>vidrio líquido</b>. Si se le tiran cristales de sales de metales de transición, los silicatos metálicos precipitan como una membrana que se rompe y vuelve a formar, y crecen <b>hacia arriba</b> como estalagmitas de colores (azules de cobre, verdes de níquel, pardos de hierro).</p>
${note('Historia','<p>Atrapar cationes metálicos en redes de silicato es la misma técnica que se usaba en la Edad Media para teñir los <b>vitrales</b> de las iglesias.</p>')}
`);

  a4('al-sn-pb','Aluminio, estaño y plomo: metales anfóteros','BLOQUE p · 06',`
<p>Al, Sn y Pb comparten un rasgo curioso: reaccionan <b>con ácidos y también con bases</b>, y en los dos casos liberan H₂. Son metales reductores (el Al mucho más que el Sn y el Pb).</p>
<h3>Con ácidos</h3>
${rxs(['2 Al(s) + 6 HCl(ac) -> 2 AlCl3(ac) + 3 H2(g)↑'],['Sn(s) + 2 HCl(ac) -> SnCl2(ac) + H2(g)↑'])}
${warn('El plomo y los ácidos','<p>Con HCl o H₂SO₄ el plomo casi no se disuelve: se forma una capa de <b>PbCl₂</b> o <b>PbSO₄</b>, poco solubles, que lo protege. Por eso al plomo se lo ataca con ácido nítrico.</p>')}
${fix('Corrección del apunte: el HNO₃ no libera H₂','<p>El apunte escribe Pb + 2 HNO₃ → Pb(NO₃)₂ + H₂, pero (como vamos a ver en la unidad de nitrógeno) el ácido nítrico <b>no libera hidrógeno</b>: se reduce el nitrato. Con HNO₃ diluido:</p>'+rx('3 Pb(s) + 8 HNO3(d) -> 3 Pb(NO3)2(ac) + 2 NO(g) + 4 H2O(l)'))}
<h3>Con bases</h3>
${rxs(['2 Al(s) + 2 NaOH(ac) + 6 H2O(l) -> 2 Na[Al(OH)4](ac) + 3 H2(g)↑','tetrahidroxoaluminato de sodio'],['Sn(s) + 2 NaOH(ac) -> Na2SnO2(ac) + H2(g)↑','estannito de sodio'],['Pb(s) + 2 NaOH(ac) -> Na2PbO2(ac) + H2(g)↑','plumbito de sodio'])}
<h3>¿Qué es ser anfótero?</h3>
${figure(svg.anfotero,'El mismo hidróxido se disuelve en ácido (actuando como base) y en base (actuando como ácido).')}
<p>Frente a un <b>ácido</b>, se rompe el enlace M–O: se liberan OH⁻ que forman agua y queda el catión en solución. Frente a una <b>base</b>, el metal <b>capta OH⁻</b> (como el ácido bórico) y forma un hidroxocomplejo soluble: ese es un comportamiento típico de un ácido.</p>
${rxs(['Al(OH)3(s) + 3 HCl(ac) -> AlCl3(ac) + 3 H2O(l)','como base'],['Al(OH)3(s) + NaOH(ac) -> Na[Al(OH)4](ac)','como ácido'],['Sn(OH)2(s) + 2 HCl(ac) -> SnCl2(ac) + 2 H2O(l)'],['Sn(OH)2(s) + 2 NaOH(ac) -> Na2[Sn(OH)4](ac)'],['Pb(OH)2(s) + 2 HNO3(ac) -> Pb(NO3)2(ac) + 2 H2O(l)','HNO₃: el nitrato de plomo es soluble'],['Pb(OH)2(s) + 2 NaOH(ac) -> Na2[Pb(OH)4](ac)'])}
${example('¿Cuánto H₂ da una lata?',`<p>Un trozo de 0,54 g de papel de aluminio se disuelve en NaOH en exceso. ¿Qué volumen de H₂ se obtiene a 25 °C y 1 atm?</p>`,
 step('1. Moles de Al',chain(R`n_{\mathrm{Al}}=\frac{0{,}54}{27}=0{,}020\ \mathrm{mol}`))+
 step('2. Moles de H₂',chain([R`n_{\mathrm{H_2}}=0{,}020\cdot\frac{3}{2}=0{,}030\ \mathrm{mol}`,'2 Al dan 3 H₂']))+
 step('3. Volumen',chain(R`V=0{,}030\cdot24{,}5=0{,}74\ \mathrm{L}`)),
 'V(H₂) ≈ 0,74 L')}
`);

  a4('repaso','Repaso del bloque p','BLOQUE p · REPASO',`
${cards([
 ['Grupos','Configuración externa del grupo 14','ns² np²: 4 electrones de valencia.'],
 ['Grupos','¿Qué estados de oxidación tiene el N?','Todos desde −3 hasta +5.'],
 ['Par inerte','¿Por qué el plomo prefiere +2?','Los electrones 6s² quedan retenidos (par inerte): sólo pierde los 6p².'],
 ['Par inerte','¿Por qué el PbO₂ es oxidante?','El Pb(IV) tiende a volver al Pb(II), más estable.'],
 ['Diagonal','¿A quién se parece el boro?','Al silicio: óxidos sólidos ácidos, ácidos muy débiles, hidruros gaseosos y redes con O.'],
 ['Bórax','Na₂B₄O₇ + 2 HCl + ? H₂O','+ 5 H₂O → 2 NaCl + 4 H₃BO₃.'],
 ['Silicatos','¿Qué es el vidrio líquido?','Una solución saturada de metasilicato de sodio, Na₂SiO₃.'],
 ['Anfóteros','¿Qué significa que el Al(OH)₃ sea anfótero?','Se disuelve en ácidos (da Al³⁺) y en bases (da [Al(OH)₄]⁻).'],
 ['Plomo','¿Por qué no se usa HCl para disolver plomo?','Se forma PbCl₂ poco soluble que recubre el metal.']
])}
`);

  // =====================================================================
  // UNIDAD 5 · CARBONO
  // =====================================================================
  const s5=[];const a5=(key,label,kicker,html)=>s5.push({key:`qi-c-${key}`,label,kicker,html});

  a5('alotropos','Los alótropos del carbono','CARBONO · 01',`
<p>El carbono puede ordenar sus átomos de varias maneras distintas: son sus <b>alótropos</b> ${simple('el mismo elemento, con estructuras y propiedades diferentes')}. Mismo átomo, personalidades opuestas: el grafito de la mina del lápiz y el diamante son <b>sólo carbono</b>.</p>
${pics([['grafito.webp','Estructura del grafito: láminas de hexágonos apiladas','Grafito'],['diamante.webp','Estructura del diamante: cada carbono unido a otros cuatro','Diamante'],['fullereno.webp','Fullereno C60: esfera de pentágonos y hexágonos','Fullereno']],'Las tres estructuras del material.')}
${table(['','Grafito','Diamante','Fullerenos'],[
 ['Aspecto','negro, brillante, blando, untuoso al tacto; en escamas','cristales transparentes (sistema regular, parecidos a octaedros)','sólidos muy coloreados, rojo-rosados'],
 ['Estructura','láminas de hexágonos débilmente unidas entre sí','cada C unido a otros 4 en una red tridimensional','pentágonos y hexágonos cerrados en esferas tipo pelota de fútbol'],
 ['Lo más característico','las capas se deslizan y dejan marca en el papel','la sustancia natural más dura (10 en la escala de Mohs)','se obtienen calentando grafito en atmósfera de He o Ar'],
 ['¿Conduce la electricidad?','<b>sí</b>','<b>no</b>','<b>sí</b>']
])}
${idea('¿Por qué el grafito conduce y el diamante no?','<p>En el grafito cada C usa sólo 3 electrones para unirse a sus vecinos de lámina; el cuarto queda <b>deslocalizado</b> y se mueve a lo largo de la capa. En el diamante los 4 electrones están “ocupados” en enlaces fijos: no hay cargas libres.</p>')}
`);

  a5('adsorcion','Adsorción: el carbón como esponja de superficie','CARBONO · 02',`
<p>El <b>carbón activado</b> es carbono con una cantidad gigantesca de poros microscópicos: un solo gramo puede tener una superficie interna de cientos de metros cuadrados. Sobre esa superficie se “pegan” moléculas e iones: eso es la <b>adsorción</b>.</p>
${punch('ADsorción: las partículas se acumulan sobre la superficie. ABsorción: penetran en todo el volumen (como el agua en una esponja).')}
${pic('adsorcion-absorcion.webp','Esquema comparando adsorción (partículas sobre la superficie) y absorción (partículas en todo el volumen)','Adsorción vs. absorción.')}
${figure(svg.adsorcion,'El colorante desaparece de la solución porque queda retenido en la superficie del carbón.')}
<h3>Cómo se demuestra en el laboratorio</h3>
${pic('azul-metileno-carbon.webp','Tubo con azul de metileno, tratamiento con carbón activado y tubo incoloro luego de eliminar el carbón','Azul de metileno → tratamiento con carbón → filtrado incoloro.')}
<ul class="kitList"><li><b>Pigmentos:</b> una solución de azul de metileno agitada con carbón activado y filtrada sale ${vira('azul','#2e57d6','incolora','transparent')}.</li><li><b>Iones Pb²⁺:</b> después de agitar con carbón, el filtrado ya no da el precipitado amarillo de PbI₂ con KI (ver TP 5).</li></ul>
${note('Usos reales','<p>Filtros de agua, máscaras antigás, decoloración de azúcar y aceites, y tratamiento de intoxicaciones (el carbón adsorbe el tóxico en el estómago).</p>')}
`);

  a5('reductor','Carácter reductor del carbono','CARBONO · 03',`
<p>El carbono se oxida con facilidad a CO o CO₂. Por eso es un <b>reductor</b>: le “roba” el oxígeno a otros compuestos. Esta propiedad sostiene dos industrias enteras: la energía (quemar carbón) y la metalurgia (sacar metales de sus óxidos).</p>
${rxs(['C(s) + ½ O2(g) =[Δ]=> CO(g)','con poco oxígeno'],['C(s) + O2(g) =[Δ]=> CO2(g)','combustión completa'],['2 CuO(s) + C(s) =[Δ]=> 2 Cu(s) + CO2(g)','el óxido negro se vuelve cobre rojizo'],['2 Ag2O(s) + C(s) =[Δ]=> 4 Ag(s) + CO2(g)','mismo esquema con óxido de plata'])}
${pic('carbon-reductor-kitasato.webp','Kitasato con carbón y óxido de plata calentados; el gas burbujea en hidróxido de bario','El gas que sale se burbujea en agua de barita para demostrar que es CO₂.')}
${rx('CO2(g) + Ba(OH)2(ac) -> BaCO3(s)↓ + H2O(l)','turbidez blanca: prueba del CO₂')}
${example('Rendimiento del ensayo del TP 5',`<p>En el kitasato se colocan 0,5 g de carbón y 0,4 g de CuO. ¿Qué masa de cobre puede formarse y qué volumen de CO₂ (25 °C, 1 atm) se desprende?</p>`,
 step('1. Moles',chain(R`n_{\mathrm{CuO}}=\frac{0{,}4}{79{,}5}=5{,}03\cdot10^{-3}\ \mathrm{mol}`,R`n_{\mathrm{C}}=\frac{0{,}5}{12}=4{,}17\cdot10^{-2}\ \mathrm{mol}`))+
 step('2. Limitante',chain([R`\text{C necesario}=\frac{5{,}03\cdot10^{-3}}{2}=2{,}52\cdot10^{-3}\ \mathrm{mol}`,'2 CuO por cada C'],[R`\Rightarrow\ \text{limita el CuO; el carbón está en gran exceso}`]))+
 step('3. Productos',chain(R`m_{\mathrm{Cu}}=5{,}03\cdot10^{-3}\cdot63{,}5=0{,}32\ \mathrm{g}`,R`V_{\mathrm{CO_2}}=2{,}52\cdot10^{-3}\cdot24{,}5=0{,}062\ \mathrm{L}`)),
 'm(Cu) ≈ 0,32 g · V(CO₂) ≈ 62 mL')}
${idea('¿Por qué tanto carbón de más?','<p>El exceso asegura que todo el óxido se reduzca y que el cobre recién formado no vuelva a oxidarse con el aire caliente.</p>')}
`);

  a5('co2','Dióxido de carbono: propiedades','CARBONO · 04',`
<p>El CO₂ es una molécula <b>lineal</b>: O=C=O, con dos dobles enlaces. Como los dos enlaces polares “tiran” en sentidos opuestos, la molécula es <b>no polar</b>.</p>
${facts([['Aspecto','gas incoloro, inodoro, insípido'],['Comburente','no: apaga la vela'],['Densidad','≈ 1,5 veces la del aire'],['Carácter','óxido ácido'],['Reconocimiento','enturbia el agua de barita']])}
${fix('Sobre la densidad “1,77”','<p>El apunte dice que su densidad es “1,77 mayor que la del aire”. Lo correcto: el CO₂ es unas <b>1,5 veces</b> más denso que el aire (44 / 29 ≈ 1,52). El valor 1,77 corresponde a su densidad en <b>g/L</b> a unos 30 °C.</p>')}
${example('Comparar la densidad del CO₂ con la del aire',`<p>Calcular la densidad del CO₂ y del aire a 25 °C y 1 atm.</p>`,
 step('1. Fórmula',chain(R`\delta=\frac{P\,M}{R\,T}`))+
 step('2. CO₂ y aire',chain(R`\delta_{\mathrm{CO_2}}=\frac{1\cdot44}{0{,}082\cdot298}=1{,}80\ \mathrm{g/L}`,R`\delta_{\text{aire}}=\frac{1\cdot29}{0{,}082\cdot298}=1{,}19\ \mathrm{g/L}`,R`\frac{\delta_{\mathrm{CO_2}}}{\delta_{\text{aire}}}=\frac{44}{29}=1{,}52`)),
 'El CO₂ es ≈ 1,5 veces más denso: se “vuelca” hacia abajo como un líquido invisible')}
<h3>Óxido ácido</h3>
${rxs(['CO2(g) + H2O(l) <=> H2CO3(ac)','ácido carbónico'],['H2CO3(ac) <=> H^+(ac) + HCO3^-(ac)','bicarbonato'],['HCO3^-(ac) <=> H^+(ac) + CO3^2-(ac)','carbonato'])}
<h3>¿Y si algo arde dentro del CO₂?</h3>
<p>Una vela se apaga, pero un <b>metal muy activo</b> encendido (Mg, Ca) sigue ardiendo: le arranca el oxígeno al CO₂ y deja carbono negro.</p>
${rxs(['2 Mg(s) + CO2(g) =[Δ]=> 2 MgO(s) + C(s)','polvo blanco con puntos negros'],['2 Ca(s) + CO2(g) =[Δ]=> 2 CaO(s) + C(s)'])}
${warn('Por eso no se apaga un incendio de magnesio con CO₂','<p>Los matafuegos de CO₂ sirven para casi todo, menos para metales activos: los alimentan.</p>')}
`);

  a5('co2-lab','El CO₂ en el laboratorio: obtención y ensayos','CARBONO · 05',`
<p>Se obtiene haciendo reaccionar un <b>carbonato o bicarbonato con un ácido</b>:</p>
${rxs(['Na2CO3(s) + 2 HCl(ac) -> 2 NaCl(ac) + CO2(g)↑ + H2O(l)'],['NaHCO3(s) + HCl(ac) -> NaCl(ac) + CO2(g)↑ + H2O(l)','el del TP 5'])}
${pic('generador-co2.webp','Generador de gases: tubo con bicarbonato, tubo de seguridad con embudo para el HCl, cierre hidráulico y tubo de salida','Aparato generador de CO₂ (TP 5).')}
${table(['Pieza','Para qué sirve'],[
 ['Tubo de seguridad (con embudo)','agregar el ácido <b>de a poco</b> y <b>regular la presión</b> interna: si la presión sube, el líquido sube por él en vez de hacer saltar el tapón'],
 ['Cierre hidráulico (tubo interno)','que el gas no se escape por el tubo de seguridad: el extremo queda sumergido en líquido'],
 ['Tubo de desprendimiento','lleva el gas a los tubos de ensayo']
])}
${warn('Precauciones','<ul><li>No deben quedar burbujas de aire en el tubo de seguridad: si sube la presión, el líquido podría proyectarse.</li><li>Si hay que calentar, hacerlo suave y flameando: más velocidad de reacción = más presión.</li></ul>')}
${example('Cuánto ácido hay que cargar (problema del material teórico)',`<p>Si el volumen del cierre hidráulico es de 7 mL, ¿qué volumen de HCl 36,5 % m/m (δ = 1,18 g/mL) hay que emplear para completar la reacción de 3 g de NaHCO₃ en el aparato?</p>`,
 step('1. Moles de bicarbonato',chain(R`M(\mathrm{NaHCO_3})=23+1+12+48=84\ \mathrm{g/mol}`,R`n=\frac{3}{84}=0{,}0357\ \mathrm{mol}`))+
 step('2. HCl puro',chain([R`n_{\mathrm{HCl}}=0{,}0357\ \mathrm{mol}`,'relación 1 : 1'],R`m_{\mathrm{HCl}}=0{,}0357\cdot36{,}5=1{,}304\ \mathrm{g}`))+
 step('3. Solución y volumen',chain(R`m_{\text{sc}}=1{,}304\cdot\frac{100}{36{,}5}=3{,}57\ \mathrm{g}`,R`V=\frac{3{,}57}{1{,}18}=3{,}03\ \mathrm{mL}`))+
 step('4. Sumar el cierre hidráulico',chain([R`V_{\text{total}}=3{,}03+7=10{,}03\ \mathrm{mL}`,'el ácido que llena el cierre no llega al bicarbonato'])),
 'Hay que cargar ≈ 10 mL de HCl (3,03 mL reaccionan + 7 mL del cierre)')}
<h3>Ensayos con indicadores</h3>
${table(['Burbujeo de CO₂ en…','Se observa','Por qué'],[
 ['agua con heliantina',vira('amarillo','#f2c200','rojo','#d6332a'),'se forma H₂CO₃: el medio se acidifica'],
 ['fenolftaleína alcalinizada (con NaOH)',vira('fucsia','#d63384','incoloro','transparent'),'el CO₂ neutraliza el NaOH'],
 ['agua de barita, Ba(OH)₂',vira('transparente','transparent','turbio blanco','#eeeeee'),'precipita BaCO₃']
])}
${rxs(['CO2(g) + 2 NaOH(ac) -> Na2CO3(ac) + H2O(l)','primero se consume el NaOH'],['Na2CO3(ac) + CO2(g) + H2O(l) -> 2 NaHCO3(ac)','con más gas: bicarbonato'])}
${deep('¿Por qué la fenolftaleína tarda en decolorarse?',`<p>La fenolftaleína es fucsia por encima de pH ≈ 8,2. Una solución de <b>Na₂CO₃</b> todavía es bastante básica (pH ≈ 11), así que el color se mantiene. Recién cuando el carbonato se transforma en <b>bicarbonato</b> (pH ≈ 8,3) el indicador pasa a incoloro. Por eso hay que burbujear un buen rato: el apunte muestra sólo la primera ecuación, pero el cambio de color lo da la segunda.</p>`)}
${note('Con mucho CO₂, la turbidez de la barita puede desaparecer','<p>El exceso transforma el carbonato insoluble en bicarbonato soluble:</p>'+rx('BaCO3(s) + CO2(g) + H2O(l) -> Ba(HCO3)2(ac)'))}
`);

  a5('carbonatos','Carbonatos y bicarbonatos','CARBONO · 06',`
<p>Los <b>carbonatos</b> (CO₃²⁻) son insolubles salvo los de metales alcalinos y amonio; en particular precipitan con los cationes del grupo 2 (Ca²⁺, Ba²⁺). Los <b>bicarbonatos</b> (HCO₃⁻) en cambio <b>no</b> precipitan con esos cationes. Esa diferencia permite separarlos.</p>
${figure(svg.carbonatos,'Separación de una mezcla de carbonato y bicarbonato (TP 5).')}
${rxs(['BaCl2(ac) + Na2CO3(ac) -> BaCO3(s)↓ + 2 NaCl(ac)','el carbonato precipita'],['BaCl2(ac) + NaHCO3(ac) -> no precipita','el bicarbonato queda en el filtrado'])}
<p>Al filtrado se le agrega amoníaco: es una base que le saca el H⁺ al bicarbonato y lo convierte en carbonato, que ahora sí precipita con el Ba²⁺:</p>
${rxs(['HCO3^-(ac) + NH3(ac) -> CO3^2-(ac) + NH4^+(ac)','ecuación iónica: lo esencial'],['2 NaHCO3(ac) + 2 NH4OH(ac) -> Na2CO3(ac) + (NH4)2CO3(ac) + 2 H2O(l)','escrita como en el apunte'],['BaCl2(ac) + (NH4)2CO3(ac) -> BaCO3(s)↓ + 2 NH4Cl(ac)'])}
${fix('Corrección del apunte: faltaba un H₂O','<p>El apunte escribe “… + H₂O” con coeficiente 1; así no cierran ni los H (12 contra 10) ni los O (8 contra 7). Con <b>2 H₂O</b> queda balanceada.</p>')}
<h3>Descomposición térmica</h3>
<p>Con calor, los carbonatos y bicarbonatos liberan CO₂:</p>
${rxs(['2 NaHCO3(s) =[Δ]=> Na2CO3(s) + CO2(g) + H2O(g)','fácil: por eso el bicarbonato leuda'],['CaCO3(s) =[Δ]=> CaO(s) + CO2(g)','fabricación de la cal'],['MgCO3(s) =[Δ]=> MgO(s) + CO2(g)'],['Na2CO3(s) =[Δ]=> Na2O(s) + CO2(g)','sólo a temperaturas muy altas'])}
${example('¿Cuánta masa pierde el bicarbonato al calentarlo?',`<p>Se calientan 8,40 g de NaHCO₃ hasta descomposición total. ¿Qué masa de sólido queda?</p>`,
 step('1. Moles',chain(R`n_{\mathrm{NaHCO_3}}=\frac{8{,}40}{84}=0{,}100\ \mathrm{mol}`))+
 step('2. Carbonato formado',chain([R`n_{\mathrm{Na_2CO_3}}=\frac{0{,}100}{2}=0{,}050\ \mathrm{mol}`,'2 a 1'],R`m=0{,}050\cdot106=5{,}30\ \mathrm{g}`))+
 step('3. Pérdida',chain([R`8{,}40-5{,}30=3{,}10\ \mathrm{g}`,'CO₂ + H₂O que se van como gas'])),
 'Quedan 5,30 g de Na₂CO₃ (se pierde el 37 % de la masa)')}
`);

  a5('repaso','Repaso del carbono','CARBONO · REPASO',`
${cards([
 ['Alótropos','¿Cuál conduce la electricidad: grafito o diamante?','El grafito (y los fullerenos): tiene un electrón deslocalizado por átomo.'],
 ['Adsorción','Adsorción vs. absorción','Adsorción: en la superficie. Absorción: en todo el volumen.'],
 ['Reductor','2 CuO + C → ?','2 Cu + CO₂. El negro pasa a rojizo y la barita se enturbia.'],
 ['CO₂','¿Es comburente?','No: apaga la vela. Pero el Mg encendido sigue ardiendo en CO₂.'],
 ['CO₂','¿Más o menos denso que el aire?','Más: unas 1,5 veces (44 vs 29 g/mol). Se recoge con el tubo boca arriba.'],
 ['CO₂','CO₂ + Ba(OH)₂ → ?','BaCO₃↓ (turbidez blanca) + H₂O.'],
 ['Aparato','Función del tubo de seguridad','Agregar el ácido de a poco y regular la presión interna.'],
 ['Aparato','Función del cierre hidráulico','Impedir que el gas salga por el tubo de seguridad.'],
 ['Carbonatos','¿Cómo se separa CO₃²⁻ de HCO₃⁻?','Con BaCl₂ precipita sólo el carbonato; al filtrado se le agrega NH₃ y precipita el resto como BaCO₃.']
])}
`);

  // =====================================================================
  // UNIDAD 6 · NITRÓGENO
  // =====================================================================
  const s6=[];const a6=(key,label,kicker,html)=>s6.push({key:`qi-n-${key}`,label,kicker,html});

  a6('n2','El nitrógeno y sus estados de oxidación','NITRÓGENO · 01',`
<p>El N₂ forma el 78 % del aire y es muy poco reactivo: sus dos átomos están unidos por un <b>triple enlace</b> (N≡N), uno de los más fuertes que existen. Pero en sus compuestos el nitrógeno es un todoterreno: recorre <b>todos los estados de oxidación desde −3 hasta +5</b>.</p>
${figure(svg.nitrogeno,'La escalera del nitrógeno. A la derecha: hasta dónde baja el HNO₃ según su concentración.')}
<h3>Obtención de N₂ en el laboratorio</h3>
<p>Se calienta suavemente una solución de <b>nitrito de sodio</b> con <b>cloruro de amonio</b>. Es una reacción redox muy elegante: el N del amonio (−3) y el N del nitrito (+3) se “encuentran a mitad de camino” en el N₂ (0).</p>
${rx('NaNO2(ac) + NH4Cl(ac) =[Δ]=> N2(g)↑ + NaCl(ac) + 2 H2O(l)')}
${example('Balanceo por ion-electrón',`<p>Balancear NH₄⁺ + NO₂⁻ → N₂ en medio ácido.</p>`,
 step('Oxidación (−3 → 0)',rx('2 NH4^+ -> N2 + 8 H^+ + 6 e^-')) +
 step('Reducción (+3 → 0)',rx('2 NO2^- + 8 H^+ + 6 e^- -> N2 + 4 H2O'))+
 step('Suma (ya tienen 6 e⁻ cada una)',rxs(['2 NH4^+ + 2 NO2^- -> 2 N2 + 4 H2O'],['NH4^+ + NO2^- -> N2 + 2 H2O','dividido por 2'])),
 'NH₄⁺ + NO₂⁻ → N₂ + 2 H₂O (comproporción)')}
`);

  a6('nh3','Amoníaco: propiedades y obtención','NITRÓGENO · 02',`
<p>El amoníaco es uno de los compuestos más importantes del nitrógeno (fertilizantes, limpieza, industria química).</p>
${facts([['Aspecto','gas incoloro'],['Olor','desagradable, picante, irritante'],['Solubilidad','muchísima en agua'],['Densidad','menor que el aire (17 vs 29 g/mol)'],['Carácter','básico y reductor']])}
<h3>Obtención: sal de amonio + base fuerte</h3>
${rx('NH4Cl(s) + NaOH(ac) =[Δ]=> NH3(g)↑ + NaCl(ac) + H2O(l)')}
<p>La base le saca un H⁺ al ion amonio. Como es <b>más liviano que el aire</b> y <b>muy soluble en agua</b>, no se recoge en la cuba: se junta en un tubo seco <b>boca abajo</b>.</p>
${figure(svg.gases,'El NH₃ se recoge en tubo invertido; el CO₂, en tubo boca arriba.')}
<h3>La fuente de amoníaco</h3>
${pic('fuente-amoniaco.webp','Tubo con amoníaco invertido en un cristalizador con agua y fenolftaleína: el agua sube y se pone fucsia','El agua entra al tubo y se tiñe de fucsia.')}
<p>Si se destapa bajo agua con fenolftaleína un tubo lleno de NH₃, el gas se disuelve tan rápido que el agua <b>sube por el tubo</b> (deja casi vacío). Y además se pone ${swatch('#d63384','fucsia')}: la solución es básica.</p>
${rx('NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)','base de Brønsted: capta un H⁺ del agua')}
${idea('El “hidróxido de amonio” no existe','<p>No hay moléculas de NH₄OH. “Hidróxido de amonio” es sólo el nombre comercial de la <b>solución acuosa de amoníaco</b>, que contiene NH₃ disuelto y un poco de NH₄⁺ y OH⁻.</p>')}
<h3>El humo blanco</h3>
<p>Si acercás una varilla o gotero con HCl concentrado a un tubo con NH₃, aparece un <b>humo blanco</b>: son partículas sólidas de cloruro de amonio que se forman en el aire.</p>
${rx('NH3(g) + HCl(g) -> NH4Cl(s)','humo blanco')}
${example('Amoníaco del TP 5: ¿quién limita?',`<p>Se usan 2 g de NH₄Cl y 4 a 5 mL de NaOH 6 M. ¿Qué volumen de NH₃ puede formarse (25 °C, 1 atm)?</p>`,
 step('1. Moles',chain(R`n_{\mathrm{NH_4Cl}}=\frac{2}{53{,}5}=0{,}0374\ \mathrm{mol}`,R`n_{\mathrm{NaOH}}=0{,}004\cdot6=0{,}024\ \mathrm{mol}\quad(\text{con 5 mL}:\ 0{,}030)`))+
 step('2. Limitante',chain([R`\text{relación }1:1\ \Rightarrow\ \text{limita el NaOH}`,'queda NH₄Cl sin reaccionar']))+
 step('3. Volumen',chain(R`V=0{,}024\cdot24{,}5=0{,}59\ \mathrm{L}\quad\text{a}\quad0{,}030\cdot24{,}5=0{,}74\ \mathrm{L}`)),
 'Limita el NaOH: entre 0,59 y 0,74 L de NH₃ (de sobra para llenar tres tubos)')}
${note('¿Por qué se calienta?','<p>Como el NH₃ es tan soluble, una parte queda disuelta en el agua de la solución. El calor disminuye su solubilidad y lo hace salir.</p>')}
`);

  a6('nh3-redox','Amoníaco como reductor','NITRÓGENO · 03',`
<p>En el NH₃ el nitrógeno está en su estado <b>más bajo</b> (−3): no puede ganar más electrones, sólo perderlos. Por eso el amoníaco sólo puede actuar como <b>reductor</b>.</p>
${rx('2 NH3(ac) + 6 OH^-(ac) -> N2(g) + 6 H2O(l) + 6 e^-','hemirreacción de oxidación')}
<p>Con permanganato y calor se forma un <b>precipitado pardo</b> (MnO₂) y se ve un <b>burbujeo</b> (N₂):</p>
${rx('2 NH3(ac) + 2 MnO4^-(ac) -> N2(g) + 2 MnO2(s)↓ + 2 OH^-(ac) + 2 H2O(l)')}
${fix('Corrección del apunte: faltan coeficientes','<p>El apunte escribe “2 NH₃ + MnO₄⁻ → MnO₂ + 2 OH⁻ + N₂ + 2 H₂O”, pero la hemirreacción del permanganato se multiplica por 2 (6 e⁻ en total). Así como está, no cierran el Mn ni los O. La correcta lleva <b>2 MnO₄⁻</b> y <b>2 MnO₂</b> (el balanceo completo está en la Caja de herramientas).</p>')}
${rx('2 NH3(ac) + 2 KMnO4(ac) -> N2(g) + 2 MnO2(s) + 2 KOH(ac) + 2 H2O(l)','ecuación molecular')}
`);

  a6('ligando','Amoníaco como ligando: complejos','NITRÓGENO · 04',`
<p>El N del amoníaco tiene un <b>par de electrones libre</b>. Puede “prestárselo” a un catión metálico y formar un enlace: el NH₃ actúa como <b>base de Lewis</b> (ligando) y el catión como <b>ácido de Lewis</b>. El resultado es un <b>ion complejo</b>.</p>
${rx('Ag^+(ac) + 2 NH3(ac) -> [Ag(NH3)2]^+(ac)','H₃N→Ag←NH₃')}
<h3>Gota a gota y en exceso: dos etapas</h3>
${figure(svg.amoniaco,'La secuencia que hay que saber leer en el TP 5 y en el cuestionario.')}
<ol class="kitList">
 <li><b>Una gota:</b> la solución de NH₃ tiene OH⁻, y con los cationes de los grupos 2, 13 y de transición precipita el <b>hidróxido</b> (u óxido).</li>
 <li><b>Exceso:</b> muchos hidróxidos (sobre todo de la segunda mitad de los metales de transición) se <b>redisuelven</b> porque se forma el complejo amoniacal. Otros, como Fe(OH)₃ y Al(OH)₃, no.</li>
 <li><b>Agregado de HCl:</b> el ácido convierte el NH₃ en NH₄⁺, que ya no tiene el par libre: el complejo <b>se destruye</b>. El Cl⁻ puede formar un clorocomplejo o precipitar el cloruro si es insoluble.</li>
</ol>
${table(['Catión','1 gota de NH₃','Exceso de NH₃'],[
 ['Cu²⁺ (celeste)','Cu(OH)₂ ↓ celeste','[Cu(NH₃)₄]²⁺ azul intenso'],
 ['Ni²⁺ (verde)','Ni(OH)₂ ↓ verde','[Ni(NH₃)₆]²⁺ azul violáceo'],
 ['Ag⁺ (incoloro)','Ag₂O ↓ pardo','[Ag(NH₃)₂]⁺ incoloro'],
 ['Fe³⁺ (amarillo)','Fe(OH)₃ ↓ pardo rojizo','sin cambios'],
 ['Al³⁺ (incoloro)','Al(OH)₃ ↓ blanco gelatinoso','sin cambios'],
 ['Mn²⁺ (incoloro)','Mn(OH)₂ ↓ blanco','sin cambios']
])}
${rxs(['CuSO4(ac) + 2 NH3(ac) + 2 H2O(l) -> Cu(OH)2(s)↓ + (NH4)2SO4(ac)','1 gota'],['Cu(OH)2(s) + 4 NH3(ac) -> [Cu(NH3)4]^2+(ac) + 2 OH^-(ac)','exceso'],['NiSO4(ac) + 2 NH3(ac) + 2 H2O(l) -> Ni(OH)2(s)↓ + (NH4)2SO4(ac)'],['Ni(OH)2(s) + 6 NH3(ac) -> [Ni(NH3)6]^2+(ac) + 2 OH^-(ac)'],['FeCl3(ac) + 3 NH3(ac) + 3 H2O(l) -> Fe(OH)3(s)↓ + 3 NH4Cl(ac)'],['AlCl3(ac) + 3 NH3(ac) + 3 H2O(l) -> Al(OH)3(s)↓ + 3 NH4Cl(ac)'])}
${fix('Corrección del apunte: nitrato, no cloruro','<p>Para la plata, el apunte escribe “AgNO₃ + NH₃ + H₂O → AgOH + NH₄Cl”. Si se parte de nitrato de plata, la sal de amonio que se forma es <b>NH₄NO₃</b>. Además, el AgOH se deshidrata enseguida a Ag₂O (pardo):</p>'+rxs(['2 AgNO3(ac) + 2 NH3(ac) + H2O(l) -> Ag2O(s)↓ + 2 NH4NO3(ac)'],['Ag2O(s) + H2O(l) + 4 NH3(ac) -> 2 [Ag(NH3)2]^+(ac) + 2 OH^-(ac)']))}
${deep('Cómo se nombra un complejo',`<ol class="kitList"><li>Se nombran los <b>ligandos</b> con prefijo de cantidad: NH₃ = <b>ammin</b> (o amin), H₂O = acuo, Cl⁻ = cloro, OH⁻ = hidroxo.</li><li>Después el <b>metal</b> con su número de oxidación en romanos.</li><li>Si el complejo es un <b>anión</b>, el metal termina en <b>-ato</b>.</li></ol>${table(['Complejo','Nombre'],[['[Cu(NH₃)₄]²⁺','ion tetraammincobre(II)'],['[Ni(NH₃)₆]²⁺','ion hexaamminníquel(II)'],['[Ag(NH₃)₂]⁺','ion diamminplata(I)'],['[CuCl₄]²⁻','ion tetraclorocuprato(II)'],['[Al(OH)₄]⁻','ion tetrahidroxoaluminato']])}`)}
<h3>Destrucción con ácido</h3>
${rxs(['[Cu(NH3)4]^2+(ac) + 4 HCl(ac) -> [CuCl4]^2-(ac) + 4 NH4^+(ac)','azul → verde'],['[Ag(NH3)2]^+(ac) + 2 HCl(ac) -> AgCl(s)↓ + 2 NH4^+(ac) + Cl^-(ac)','vuelve a precipitar: AgCl blanco'])}
`);

  a6('hno3','Ácido nítrico: propiedades y obtención','NITRÓGENO · 05',`
<p>El ácido nítrico es un <b>ácido fuerte</b>, corrosivo y <b>oxidante</b>. Se vende en soluciones al 63 %; es incoloro, pero con la luz se descompone un poco y toma color <b>amarillo a pardo</b> por el NO₂ que queda disuelto. Por eso se guarda en frascos color caramelo.</p>
${rx('4 HNO3(c) =[luz o Δ]=> 4 NO2(g) + O2(g) + 2 H2O(l)')}
<h3>Obtención en el laboratorio</h3>
<p>Se calienta un <b>nitrato</b> con <b>ácido sulfúrico concentrado</b>. El H₂SO₄ es mucho menos volátil, así que “empuja” al HNO₃ fuera de la mezcla, que destila y se condensa en un tubo con hielo.</p>
${rx('NaNO3(s) + H2SO4(c) =[Δ]=> NaHSO4(s) + HNO3(g)')}
${pic('retorta-hno3.webp','Retorta calentada sobre tela metálica con la salida dentro de un tubo sumergido en hielo','Aparato del TP 5: retorta y tubo colector en baño de hielo.')}
${idea('¿Por qué una retorta de vidrio?','<p>Porque el HNO₃ ataca los tapones de goma y las mangueras de plástico. La retorta es una sola pieza de vidrio: no tiene conexiones que se puedan corroer.</p>')}
<h3>El NO₂ también es ácido</h3>
<p>Los vapores pardos de NO₂ se disuelven en agua y regeneran ácido nítrico (dismutación: N +4 → +5 y +2):</p>
${rx('3 NO2(g) + H2O(l) -> 2 HNO3(ac) + NO(g)')}
${vira('tornasol azul','#2f6fd1','rojo','#d6332a')} <span class="simple">(así se comprueba el carácter ácido del NO₂)</span>
`);

  a6('hno3-oxidante','Ácido nítrico como oxidante','NITRÓGENO · 06',`
<p>Acá está la gran diferencia con el HCl: el HNO₃ <b>no libera hidrógeno</b> con los metales. El que se reduce no es el H⁺ sino el <b>nitrato</b>, y hasta dónde baja depende de la concentración.</p>
${rx('NO3^- + 2 H^+ + e^- -> NO2 + H2O','HNO₃ concentrado: N +5 → +4')}
<h3>Ácido concentrado → NO₂ (gas pardo)</h3>
${rxs(['Cu(s) + 4 HNO3(c) -> Cu(NO3)2(ac) + 2 NO2(g)↑ + 2 H2O(l)','solución azul-verdosa'],['Zn(s) + 4 HNO3(c) -> Zn(NO3)2(ac) + 2 NO2(g)↑ + 2 H2O(l)'])}
${example('Balanceo del cobre con HNO₃ concentrado',`<p>Cu + HNO₃ (c) → Cu(NO₃)₂ + NO₂ + H₂O</p>`,
 step('Oxidación',rx('Cu -> Cu^2+ + 2 e^-'))+
 step('Reducción (× 2)',rx('2 NO3^- + 4 H^+ + 2 e^- -> 2 NO2 + 2 H2O'))+
 step('Suma iónica',rx('Cu + 2 NO3^- + 4 H^+ -> Cu^2+ + 2 NO2 + 2 H2O'))+
 step('Molecular',`<p>Hacen falta 4 H⁺ (4 HNO₃): 2 nitratos se reducen y otros 2 quedan como espectadores en el Cu(NO₃)₂.</p>`+rx('Cu + 4 HNO3 -> Cu(NO3)2 + 2 NO2 + 2 H2O')),
 'Cu + 4 HNO₃ → Cu(NO₃)₂ + 2 NO₂ + 2 H₂O')}
<h3>Cuanto más diluido, más se reduce</h3>
${rxs(['Mg(s) + 4 HNO3(60 %) -> Mg(NO3)2(ac) + 2 NO2(g) + 2 H2O(l)','N: +4'],['3 Mg(s) + 8 HNO3(30 %) -> 3 Mg(NO3)2(ac) + 2 NO(g) + 4 H2O(l)','N: +2'],['4 Mg(s) + 10 HNO3(20 %) -> 4 Mg(NO3)2(ac) + N2O(g) + 5 H2O(l)','N: +1'],['5 Mg(s) + 12 HNO3(10 %) -> 5 Mg(NO3)2(ac) + N2(g) + 6 H2O(l)','N: 0'],['4 Mg(s) + 10 HNO3(3 %) -> 4 Mg(NO3)2(ac) + NH4NO3(ac) + 3 H2O(l)','N: −3'])}
${fix('Corrección del apunte: 3 Mg(NO₃)₂','<p>En la reacción al 30 % el apunte escribe “2 Mg(NO₃)₂”. Con 3 Mg a la izquierda tiene que haber <b>3 Mg(NO₃)₂</b>; así también cierran los N (8 = 6 + 2).</p>')}
${punch('Para el TP: ácido nítrico concentrado → NO₂ · ácido nítrico diluido → NH₄⁺.')}
<p>El amonio que se forma queda disuelto y no se ve. Para descubrirlo se agrega una base y se calienta: se desprende NH₃, que vuelve azul el papel tornasol rojo humedecido.</p>
${rxs(['NH4NO3(ac) + NaOH(ac) =[Δ]=> NH3(g)↑ + NaNO3(ac) + H2O(l)'],['NH3(ac) + H2O(l) <=> NH4^+(ac) + OH^-(ac)','tornasol → azul'])}
<h3>Casos especiales</h3>
${table(['Metal','Qué pasa con HNO₃'],[
 ['Au, Pt','no los ataca (hace falta agua regia: HNO₃ + 3 HCl)'],
 ['Al, Cr','se <b>pasivan</b>: se forma una capa de óxido protectora y el ataque es muy leve'],
 ['As, Sb, Sn','se convierten en <b>óxidos</b> (por ejemplo SnO₂), no en nitratos'],
 ['la mayoría (Cu, Zn, Mg, Fe, Pb…)','se convierten en <b>nitratos</b>']
])}
${example('Interpretar observaciones: hierro y ácido nítrico',`<p>El HNO₃ concentrado disuelve al hierro formando una solución amarilla y un gas pardo que vira el tornasol azul a rosa. Con HNO₃ diluido también se forma una solución amarilla, pero sin gas; si a esa solución se le agrega NaOH y se calienta, se desprende un gas que vira el tornasol a azul. ¿Cómo se interpreta?</p>`,
 step('Concentrado',`<p>La solución amarilla es Fe³⁺ (nitrato férrico); el gas pardo y ácido es NO₂.</p>`+rx('Fe(s) + 6 HNO3(c) -> Fe(NO3)3(ac) + 3 NO2(g)↑ + 3 H2O(l)'))+
 step('Diluido',`<p>No hay gas porque el nitrato se reduce hasta NH₄⁺, que queda en solución.</p>`+rx('8 Fe(s) + 30 HNO3(d) -> 8 Fe(NO3)3(ac) + 3 NH4NO3(ac) + 9 H2O(l)'))+
 step('Prueba del amonio',`<p>Con NaOH y calor el NH₄⁺ se transforma en NH₃ gaseoso, básico.</p>`+rx('NH4NO3(ac) + NaOH(ac) =[Δ]=> NH3(g)↑ + NaNO3(ac) + H2O(l)')),
 'Concentrado → NO₂ (pardo, ácido) · Diluido → NH₄⁺ (se detecta como NH₃ con base)')}
${note('Ojo con el hierro y el ácido muy concentrado','<p>El apunte toma que el Fe reacciona con el HNO₃ concentrado, y así se pide en el cuestionario. Vale saber que con ácido <b>muy</b> concentrado y en frío (fumante), el hierro también puede pasivarse, igual que el aluminio.</p>')}
`);

  a6('repaso','Repaso del nitrógeno','NITRÓGENO · REPASO',`
${cards([
 ['N₂','¿Por qué el N₂ es tan poco reactivo?','Por su triple enlace N≡N, muy fuerte.'],
 ['N₂','NaNO₂ + NH₄Cl → ?','N₂ + NaCl + 2 H₂O. El N −3 y el N +3 terminan en 0.'],
 ['NH₃','¿Cómo se recoge el amoníaco?','En un tubo seco boca abajo: es más liviano que el aire y muy soluble en agua.'],
 ['NH₃','¿Qué demuestra la fuente de amoníaco?','Que es muy soluble (el agua sube) y básico (la fenolftaleína se pone fucsia).'],
 ['NH₃','NH₃ + HCl → ?','NH₄Cl: humo blanco.'],
 ['NH₃','¿Por qué sólo puede ser reductor?','Porque su N está en −3, el estado más bajo.'],
 ['Complejos','¿Por qué el Cu(OH)₂ se disuelve en exceso de NH₃?','Se forma el complejo [Cu(NH₃)₄]²⁺, azul intenso.'],
 ['Complejos','¿Por qué el HCl destruye los complejos amoniacales?','Convierte el NH₃ en NH₄⁺, que ya no tiene par libre para unirse al metal.'],
 ['HNO₃','¿Por qué el HNO₃ no libera H₂ con metales?','Porque lo que se reduce es el nitrato, no el H⁺.'],
 ['HNO₃','¿Qué se forma con HNO₃ concentrado? ¿Y diluido?','Concentrado: NO₂ (gas pardo). Diluido (en el TP): NH₄⁺.'],
 ['HNO₃','¿Por qué se obtiene en una retorta?','Porque corroe las conexiones de goma o plástico.'],
 ['NO₂','3 NO₂ + H₂O → ?','2 HNO₃ + NO: el NO₂ tiene carácter ácido.']
])}
`);

  window.ET27_QI4.units.push(
    {id:'bloque-p',part:'teoria',n:4,title:'Térreos, carbonoides y nitrogenoides',lead:'Los grupos 13, 14 y 15: tendencias, el efecto del par inerte, la relación diagonal boro–silicio, boratos, silicatos y los metales anfóteros Al, Sn y Pb.',sections:s4},
    {id:'carbono',part:'teoria',n:5,title:'El carbono y sus compuestos',lead:'Alótropos, adsorción, poder reductor, el dióxido de carbono de punta a punta y cómo se distinguen carbonatos de bicarbonatos.',sections:s5},
    {id:'nitrogeno',part:'teoria',n:6,title:'El nitrógeno y sus compuestos',lead:'De −3 a +5: obtención de N₂, el amoníaco (base, reductor y ligando) y el ácido nítrico como oxidante según su concentración.',sections:s6}
  );
})();
