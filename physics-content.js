// Física Aplicada — contenido revisado contra la teoría, la guía y el cuaderno entregados.
(function(){
const step=(title,body)=>`<li><b>${title}</b><span>${body}</span></li>`;
const ex=(n,title,statement,steps,answer,extra={})=>({n,title,statement,steps,answer,...extra});
const guide=[
 ex('4.1','Chapa circular de hierro','¿Qué espesor máximo podrá tener una chapa de hierro de forma circular, para mantenerse sobre la superficie del agua por las fuerzas de tensión? Datos: diámetro de la chapa: 31 mm; δFe = 7,85 kg/l; γ = 72,8 dina/cm, g = 980 m/seg²',[
  step('Unificamos unidades','d = 31 mm = 3,1 cm; ρ = 7,85 g/cm³; γ = 72,8 dyn/cm; g = 980 cm/s². (Trabajamos todo en CGS para no mezclar unidades).'),
  step('Planteamos el equilibrio','En el espesor máximo, el peso y la fuerza superficial se igualan: ρ·A·e·g = γ·P. (Si la chapa fuera más gruesa, su peso vencería a la superficie).'),
  step('Geometría y despeje','Para el círculo, A = πd²/4 y P = πd. Entonces e = γP/(ρAg) = 4γ/(ρgd).'),
  step('Calculamos','e = 4·72,8/(7,85·980·3,1) = 0,01220 cm = 0,122 mm.')],'<b>e<sub>máx</sub> ≈ 0,12 mm</b>'),
 ex('4.2','Chapa rectangular','Idem problema 4.1 para una chapa rectangular de lados, a = 3 cm, b = 1 cm.',[
  step('Perímetro y área','P = 2(a+b) = 2(3+1) = 8 cm; A = ab = 3·1 = 3 cm².'),
  step('Equilibrio','ρAeg = γP, por lo tanto e = γP/(ρAg).'),
  step('Calculamos','e = 72,8·8/(7,85·3·980) = 0,02523 cm = 0,252 mm.')],'<b>e<sub>máx</sub> ≈ 0,25 mm</b>'),
 ex('4.3','Chapa con forma de anillo','Idem problema 4.1 para una chapa con forma de anillo, siendo rext = 3 cm y rint = 1 cm.',[
  step('Bordes que tiran','P = 2πr<sub>ext</sub> + 2πr<sub>int</sub> = 8π cm. (El líquido toca el borde exterior y también el interior).'),
  step('Material que pesa','A = π(r²<sub>ext</sub> - r²<sub>int</sub>) = π(9-1) = 8π cm².'),
  step('Calculamos','e = γP/(ρAg) = 72,8/(7,85·980) = 0,00946 cm = 0,0946 mm.')],'<b>e<sub>máx</sub> ≈ 0,0946 mm</b>'),
 ex('4.4','Placa cuadrada perforada','Idem problema 4.1 para una chapa con forma y dimensiones de la figura (δchapa = 6000 kg/m³).',[
  step('Leemos el gráfico','Lado = 2 cm; radio del agujero = 0,5 cm; ρ = 6000 kg/m³ = 6 g/cm³.'),
  step('Perímetro total','P = 4·2 + 2π·0,5 = 11,1416 cm. (Sumamos el contorno cuadrado y el borde del agujero).'),
  step('Área de material','A = 2² - π·0,5² = 3,2146 cm². (El agujero no pesa, por eso su área se resta).'),
  step('Calculamos','e = 72,8·11,1416/(6·3,2146·980) = 0,04289 cm = 0,429 mm.')],'<b>e<sub>máx</sub> ≈ 0,43 mm</b>',{image:'./assets/fisica-aplicada/placa-perforada.png'}),
 ex('4.5','Tensiómetro de Du Noüy','¿Qué fuerza deberá ejercer un tensiómetro de Du Noüy, cuyo anillo tiene una circunferencia de 1,02 pulgadas, para despegarlo de la superficie de un líquido de γ = 0,042 pdl/pie?',[
  step('Longitud','C = 1,02 in·2,54 = 2,5908 cm. El anillo aporta dos líneas de contacto: L = 2C = 5,1816 cm.'),
  step('Tensión en CGS','0,042 pdl/ft ≈ 19,05 dyn/cm.'),
  step('Fuerza de despegue','F = γL = 19,05·5,1816 = 98,7 dyn.')],'<b>F ≈ 98 dyn</b>'),
 ex('4.6','Método del cuentagotas','Se mide la tensión superficial con el método del cuentagotas, para un líquido de densidad 0.8 g/cm³. Se cuentan 35 gotas de agua destilada y 80 gotas de líquido. Sabiendo que la tensión superficial del agua es 72,8 dinas/cm y su densidad 1g/cm³, hallar la tensión superficial del líquido.',[
  step('Relación de comparación','Para el mismo gotero y el mismo volumen total: γ<sub>x</sub>/γ<sub>a</sub> = (ρ<sub>x</sub>/n<sub>x</sub>)/(ρ<sub>a</sub>/n<sub>a</sub>).'),
  step('Sustituimos','γ<sub>x</sub> = 72,8·(0,8·35)/(1·80).'),
  step('Calculamos','γ<sub>x</sub> = 25,48 dyn/cm.')],'<b>γ<sub>x</sub> ≈ 25,5 dyn/cm</b>'),
 ex('4.7','Ángulo de contacto','¿Cuál es el ángulo de contacto que un líquido forma en un capilar de 1 mm de diámetro, sabiendo que desciende 6,3 mm por el mismo, siendo su tensión superficial de 0,05 N/m y su densidad 1,1 kg/dm³ (recuerde que g = 980 cm/seg²)',[
  step('Datos coherentes','r = 0,5 mm = 0,05 cm; h = -6,3 mm = -0,63 cm; γ = 0,05 N/m = 50 dyn/cm; ρ = 1,1 g/cm³. (h es negativa porque el líquido desciende).'),
  step('Despejamos','De h = 2γ cosθ/(ρgr), resulta cosθ = hρgr/(2γ).'),
  step('Calculamos','cosθ = (-0,63·1,1·980·0,05)/(2·50) = -0,3396; θ = arccos(-0,3396).')],'<b>θ ≈ 110°</b>'),
 ex('4.8','Altura del líquido incógnita','Los capilares de la figura poseen el mismo radio e igual ángulo de contacto (θ1 = θ2). ¿Qué altura alcanzará el líquido incógnita? Datos: γagua = 72,8 dina/cm; γliq = 65 dina/cm; δliq = 1300 kg/m³.',[
  step('Qué se mantiene','Como r, θ y g son iguales, h es proporcional a γ/ρ.'),
  step('Comparamos','h<sub>liq</sub>/h<sub>agua</sub> = (γ<sub>liq</sub>/ρ<sub>liq</sub>)/(γ<sub>agua</sub>/ρ<sub>agua</sub>). Del gráfico de la guía: h<sub>agua</sub> = 6 mm.'),
  step('Calculamos','h<sub>liq</sub> = 6·(65·1000)/(72,8·1300) = 4,12 mm.')],'<b>h<sub>liq</sub> ≈ 4,1 mm</b>',{sourceNote:'La respuesta impresa “4,2 m” tiene una errata de unidad: el gráfico y el cálculo dan milímetros.'}),
 ex('4.9','Tensión superficial del líquido','Repita el ejercicio anterior pero ahora suponga que el líquido incógnita alcanzó un altura de de 7,4 mm, encuentre su tensión superficial. (el resto de los datos son los mismos)',[
  step('Relación','γ<sub>liq</sub> = γ<sub>agua</sub>·h<sub>liq</sub>ρ<sub>liq</sub>/(h<sub>agua</sub>ρ<sub>agua</sub>).'),
  step('Calculamos','γ<sub>liq</sub> = 72,8·(7,4·1300)/(6·1000) = 116,72 dyn/cm.')],'<b>γ<sub>liq</sub> ≈ 116,7 dyn/cm</b>')
];
const practice=[
 ex('P1','Conversión de unidades','Convertir 0,073 N/m a dyn/cm.',[step('Equivalencia','1 N = 10⁵ dyn y 1 m = 100 cm; por eso 1 N/m = 10⁵/100 = 1000 dyn/cm.'),step('Cálculo','0,073·1000 = 73 dyn/cm.')],'<b>73 dyn/cm</b>'),
 ex('P2','Fuerza sobre una película','Una película jabonosa tiene una varilla móvil de 5 cm y γ = 30 dyn/cm. Hallar la fuerza.',[step('Dos superficies','Una película tiene cara anterior y posterior: L efectiva = 2l.'),step('Cálculo','F = 2γl = 2·30·5 = 300 dyn.')],'<b>300 dyn = 0,003 N</b>'),
 ex('P3','Energía superficial','¿Qué trabajo hace falta para aumentar 12 cm² el área de una superficie de agua con γ = 72 dyn/cm?',[step('Fórmula','W = γΔA. (Crear superficie requiere energía).'),step('Cálculo','W = 72·12 = 864 dyn·cm = 864 erg.')],'<b>864 erg = 8,64·10⁻⁵ J</b>'),
 ex('P4','Interpretación molecular','¿Por qué una gota libre tiende a ser esférica?',[step('Idea','La superficie posee energía; el sistema intenta reducirla.'),step('Geometría','Para un volumen dado, la esfera es la forma de menor área.')],'<b>Porque minimiza el área y la energía superficial.</b>'),
 ex('P5','Aguja del cuaderno corregida','Una aguja de masa 0,2 g y longitud 4 cm flota sostenida por una sola línea efectiva. Hallar γ mínima.',[step('Peso correcto','P = mg = 0,2·980 = 196 dyn. En el apunte figura 19.600 dyn: esa conversión está corrida por un factor 100.'),step('Cálculo','γ = F/L = 196/4 = 49 dyn/cm.')],'<b>γ mínima = 49 dyn/cm</b>'),
 ex('P6','Aguja con dos lados','Repetir P5 si la superficie tira a lo largo de ambos lados de la aguja.',[step('Longitud efectiva','L = 2l = 8 cm.'),step('Cálculo','γ = 196/8 = 24,5 dyn/cm.')],'<b>24,5 dyn/cm</b>'),
 ex('P7','Placa cuadrada','Una placa de aluminio (ρ=2,7 g/cm³) de 2 cm de lado flota en agua (γ=72,8 dyn/cm). Hallar e máximo.',[step('Geometría','P=8 cm; A=4 cm².'),step('Cálculo','e=γP/(ρAg)=72,8·8/(2,7·4·980)=0,0550 cm.')],'<b>e ≈ 0,55 mm</b>'),
 ex('P8','Disco con otro líquido','Disco de diámetro 4 cm, ρ=5 g/cm³, γ=40 dyn/cm. Hallar e máximo.',[step('Atajo circular','e=4γ/(ρgd).'),step('Cálculo','e=160/(5·980·4)=0,00816 cm.')],'<b>e ≈ 0,0816 mm</b>'),
 ex('P9','Rectángulo con hueco','Placa 4×2 cm con agujero circular r=0,5 cm; ρ=3 g/cm³; γ=60 dyn/cm. Hallar e máximo.',[step('Geometría','P=12+π=15,1416 cm; A=8-0,7854=7,2146 cm².'),step('Cálculo','e=60·15,1416/(3·7,2146·980)=0,04283 cm.')],'<b>e ≈ 0,428 mm</b>'),
 ex('P10','Ascenso capilar','Agua: γ=72,8 dyn/cm, ρ=1 g/cm³, θ=0°, r=0,04 cm. Hallar h.',[step('Jurin','h=2γcosθ/(ρgr).'),step('Cálculo','h=2·72,8/(1·980·0,04)=3,714 cm.')],'<b>h ≈ 3,71 cm</b>'),
 ex('P11','Capilar más angosto','¿Qué ocurre con P10 si el radio se reduce a la mitad?',[step('Proporción','h es inversamente proporcional a r.'),step('Resultado','Al reducir r a la mitad, h se duplica: 7,43 cm.')],'<b>h ≈ 7,43 cm</b>'),
 ex('P12','Menisco plano','Un líquido tiene θ=90°. ¿Cuál es la altura capilar ideal?',[step('Componente vertical','cos90°=0, entonces la tensión no tiene componente vertical neta.'),step('Resultado','h=0.')],'<b>No asciende ni desciende.</b>'),
 ex('P13','Descenso de mercurio','γ=480 dyn/cm, ρ=13,6 g/cm³, θ=140°, r=0,05 cm. Hallar h.',[step('Signo','cos140°=-0,766; el resultado será negativo.'),step('Cálculo','h=2·480·(-0,766)/(13,6·980·0,05)=-1,104 cm.')],'<b>Desciende ≈ 1,10 cm</b>'),
 ex('P14','Radio del capilar','Un líquido sube 2 cm, γ=50 dyn/cm, ρ=0,8 g/cm³, θ=30°. Hallar r.',[step('Despeje','r=2γcosθ/(ρgh).'),step('Cálculo','r=2·50·0,866/(0,8·980·2)=0,0552 cm.')],'<b>r ≈ 0,552 mm</b>'),
 ex('P15','Du Noüy','Anillo de radio medio 1,5 cm en líquido γ=40 dyn/cm. Despreciar correcciones y hallar F.',[step('Longitud efectiva','Interior + exterior ≈ 4πr.'),step('Cálculo','F=γ·4πr=40·4π·1,5=754 dyn.')],'<b>F ≈ 754 dyn</b>'),
 ex('P16','Cuentagotas inverso','Agua: 30 gotas; líquido: 50 gotas; ρliq=0,9 g/cm³. Hallar γliq.',[step('Relación','γliq=γagua·ρliq·nagua/(ρagua·nliq).'),step('Cálculo','γliq=72,8·0,9·30/50=39,31 dyn/cm.')],'<b>γ ≈ 39,3 dyn/cm</b>'),
 ex('P17','Error relativo','Se mide γ=(72±2) dyn/cm. Hallar error relativo y porcentual.',[step('Relativo','e<sub>rel</sub>=Δγ/γ=2/72=0,0278.'),step('Porcentual','100·e<sub>rel</sub>=2,78%.')],'<b>e<sub>rel</sub>=0,0278; error=2,78%</b>'),
 ex('P18','Propagación simple','En γ=F/L se mide F=(300±6) dyn y L=(5,0±0,1) cm. Estimar la incertidumbre máxima.',[step('Valor','γ=300/5=60 dyn/cm.'),step('Errores relativos','Para un cociente se suman en la estimación máxima: 6/300 + 0,1/5 = 0,04.'),step('Absoluto','Δγ=0,04·60=2,4 dyn/cm.')],'<b>γ=(60,0±2,4) dyn/cm</b>')
];
const theory=`
<div class="sourceAudit"><b>Resumen reconstruido desde las fuentes</b><p>Integra las 12 páginas teóricas, la guía y las 6 fotos del cuaderno. Las aclaraciones entre paréntesis traducen cada idea a lenguaje más simple.</p></div>
<h3>1. El fenómeno de superficie</h3>
<p>Una superficie líquida se comporta como una membrana elástica tensa, aunque no sea una película sólida. Las moléculas del interior son atraídas en todas las direcciones y la resultante es aproximadamente nula. Las moléculas superficiales no tienen líquido por encima: la atracción queda desbalanceada hacia adentro. Por eso el líquido intenta disminuir su área libre. (Dicho fácil: a las moléculas de arriba les “faltan vecinas”, entonces la superficie se contrae).</p>
<p>Para llevar una molécula desde el interior hasta la superficie hay que realizar trabajo. Esa energía queda almacenada como <b>energía superficial</b>. A temperatura constante, aumentar el área ΔA requiere <span class="math">W = γ·ΔA</span>. La tensión superficial disminuye al aumentar la temperatura y puede cambiar mucho si hay impurezas o tensioactivos. (El detergente, por ejemplo, debilita la “piel” del agua).</p>
<h3>2. Cohesión, adhesión y mojado</h3>
<p><b>Cohesión</b>: atracción entre moléculas de la misma sustancia. <b>Adhesión</b>: atracción entre sustancias distintas, por ejemplo líquido-vidrio. Si adhesión &gt; cohesión, el líquido moja la pared y forma menisco cóncavo; si cohesión &gt; adhesión, no la moja y forma menisco convexo. (El agua en vidrio “trepa”; el mercurio se aparta de la pared).</p>
<h3>3. Definición y unidades</h3>
<div class="formulaExplain"><div class="formulaBox">γ = F/L</div><ul><li><b>γ</b>: tensión superficial (N/m o dyn/cm).</li><li><b>F</b>: fuerza tangencial a la superficie.</li><li><b>L</b>: longitud total de contacto sobre la que actúa la fuerza.</li></ul><p>Equivalencia útil: <b>1 N/m = 1000 dyn/cm</b>. Si hay dos caras de una película, L=2l. (Siempre hay que contar cuántos bordes realmente tiran).</p></div>
<h3>4. Cuerpos sostenidos por la superficie</h3>
<p>Un objeto flota por tensión superficial cuando la componente vertical de la fuerza superficial equilibra su peso. En el modelo ideal y con contacto vertical máximo:</p>
<div class="formulaExplain"><div class="formulaBox">ρ·A·e·g = γ·P &nbsp; ⇒ &nbsp; e<sub>máx</sub> = γP/(ρAg)</div><ul><li><b>ρ</b>: densidad de la placa.</li><li><b>A</b>: área de material vista desde arriba.</li><li><b>e</b>: espesor.</li><li><b>g</b>: gravedad.</li><li><b>P</b>: perímetro total mojado, incluidos los agujeros.</li></ul><p>(A·e es el volumen; ρ·A·e·g es el peso. γ·P es lo que sostiene la superficie).</p></div>
<h3>5. Capilaridad y ley de Jurin</h3>
<p>En un tubo fino, la tensión actúa tangente al menisco. Su componente vertical es γcosθ. Al sumar todo el contorno 2πr y equilibrarlo con el peso de la columna ρπr²hg se obtiene:</p>
<div class="formulaExplain"><div class="formulaBox">h = 2γcosθ/(ρgr) = 4γcosθ/(ρgd)</div><ul><li><b>h</b>: altura; positiva si asciende y negativa si desciende.</li><li><b>θ</b>: ángulo de contacto medido dentro del líquido.</li><li><b>r o d</b>: radio o diámetro interior del capilar.</li></ul><p>θ&lt;90°: ascenso; θ=90°: h=0; θ&gt;90°: descenso. (Un tubo más angosto produce un efecto mayor porque h es proporcional a 1/r).</p></div>
<h3>6. Presión en superficies curvas</h3>
<p>Una interfaz curva sostiene una diferencia de presión. Para una gota líquida: <span class="math">Δp=2γ/r</span>. Para una burbuja de jabón, que tiene dos superficies: <span class="math">Δp=4γ/r</span>. (Cuanto más pequeña la gota o burbuja, mayor presión hace falta en su interior).</p>
<h3>7. Error de medición</h3>
<div class="formulaExplain"><div class="formulaBox">e<sub>rel</sub> = Δx/x &nbsp; · &nbsp; Δx = e<sub>rel</sub>x</div><p>Δx es el error absoluto y e<sub>rel</sub> el error relativo; multiplicado por 100 da el porcentaje. En productos y cocientes, una estimación conservadora suma los errores relativos. (Sirve para informar cuánto podemos confiar en el número).</p></div>`;
const methods=`
<h3>Tensiómetro de Du Noüy</h3><p>Se apoya un anillo limpio sobre el líquido y se mide la fuerza máxima necesaria para despegarlo. Para un anillo delgado de radio medio r, la longitud de contacto aproximada es la circunferencia interior más la exterior: <span class="math">L≈4πr</span>. Entonces <span class="math">γ=F/(4πr)</span>. En mediciones precisas se aplica un factor de corrección por la forma del menisco y el alambre. (La balanza mide cuánto “se aferra” el líquido al anillo).</p>
<h3>Método del cuentagotas</h3><p>Una gota se desprende cuando su peso alcanza la fuerza superficial del borde. Al comparar dos líquidos con el mismo gotero y el mismo volumen total:</p><div class="formulaBox">γ<sub>x</sub> = γ<sub>a</sub> · (ρ<sub>x</sub> n<sub>a</sub>)/(ρ<sub>a</sub> n<sub>x</sub>)</div><p>n es el número de gotas y ρ la densidad. Más gotas para el mismo volumen significa gotas más pequeñas. (No alcanza con contar: también hay que considerar la densidad).</p>
<h3>Buenas prácticas</h3><ul><li>Limpiar anillo, capilar o gotero: la grasa altera γ.</li><li>Controlar temperatura y evitar vibraciones.</li><li>Leer el menisco a la altura de los ojos.</li><li>Repetir y promediar; informar unidades e incertidumbre.</li></ul>`;
window.ET27_PHYSICS={theory,methods,guide,practice,total:guide.length+practice.length};
})();
