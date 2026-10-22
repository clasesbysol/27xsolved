# Unidad 6 — Tercer principio de la termodinámica y energía libre de Gibbs
**Procesos y Operaciones Químicas · 4.º año · Teoría y ejercitación resuelta**

Fuente principal: guía «Unidad N.º 6: Tercer principio de la termodinámica – Energía libre de Gibbs», Prof. Gabriela López Rodríguez (4 páginas). Se conservan los siete ejercicios, con aclaraciones editoriales donde los datos son contradictorios.

## Teoría

### 1. Espontaneidad
Un proceso espontáneo es termodinámicamente favorable en el sentido considerado, pero **espontáneo no significa rápido**: la cinética determina la velocidad. Una reacción puede ser exotérmica y no espontánea a cierta temperatura, o endotérmica y espontánea.

### 2. Entalpía y entropía
- **Entalpía (H):** a presión constante, su variación representa el calor intercambiado cuando solo hay trabajo presión-volumen. ΔH < 0: exotérmico; ΔH > 0: endotérmico.
- **Entropía (S):** mide la dispersión de energía y la cantidad de configuraciones microscópicas disponibles. Más partículas gaseosas suele implicar mayor entropía; es una predicción cualitativa, no una regla absoluta.
- **Tercer principio:** la entropía de un cristal perfecto tiende a cero cuando la temperatura tiende a 0 K. Este principio permite establecer entropías absolutas; el criterio de espontaneidad que se usa aquí se obtiene de la energía de Gibbs y la segunda ley.

### 3. Energía libre de Gibbs
Para un proceso a temperatura y presión constantes:
\[
\Delta G=\Delta H-T\Delta S
\]
En condiciones estándar:
\[
\Delta G^\circ=\Delta H^\circ-T\Delta S^\circ
\]
- ΔG < 0: espontáneo en sentido directo, a T y P constantes.
- ΔG = 0: equilibrio.
- ΔG > 0: no espontáneo en sentido directo; el inverso es favorable.

**Unidades:** T siempre en kelvin; ΔH en kJ/mol y ΔS en kJ/(mol·K), o ambas magnitudes en J. Convertir: 1 kJ = 1000 J. La temperatura estándar se toma como 298,15 K salvo indicación contraria. El signo de ΔG° se refiere a condiciones estándar; fuera de ellas debe considerarse la composición y ΔG = ΔG° + RT ln Q.

### 4. Cuatro combinaciones de signos
| ΔH | ΔS | Resultado |
|---|---|---|
| − | + | ΔG < 0 a cualquier T positiva |
| + | − | ΔG > 0 a cualquier T positiva |
| − | − | espontánea a bajas T |
| + | + | espontánea a altas T |

Cuando ΔH y ΔS mantienen aproximadamente sus valores, el umbral se obtiene imponiendo ΔG = 0:
\[
T_{\mathrm{umbral}}=\frac{\Delta H}{\Delta S}
\]
Solo tiene sentido físico si el cociente es positivo y si el modelo de ΔH y ΔS constantes resulta razonable en ese intervalo.

### 5. Propiedades de formación
Para cualquier propiedad de reacción X = H, G:
\[
\Delta X^\circ_{\mathrm{rxn}}=\sum_{i}\nu_i \Delta X^\circ_{f,i}(\text{productos})-\sum_{i}\nu_i \Delta X^\circ_{f,i}(\text{reactivos})
\]
Para la entropía se usan **entropías molares estándar absolutas**:
\[
\Delta S^\circ_{\mathrm{rxn}}=\sum_{i}\nu_i S^\circ_i(\text{productos})-\sum_{i}\nu_i S^\circ_i(\text{reactivos})
\]
Los coeficientes estequiométricos multiplican cada valor. Los elementos en su estado estándar tienen ΔH°f = ΔG°f = 0, pero **no** S° = 0.

### 6. Procedimiento general para resolver
1. Balancear la reacción y escribir los estados de agregación.
2. Identificar si se solicitan predicciones cualitativas o cálculos.
3. Construir sumas de productos y reactivos con coeficientes.
4. Unificar unidades y convertir °C a K: T(K) = t(°C) + 273,15.
5. Calcular ΔG = ΔH − TΔS.
6. Interpretar el signo y, si corresponde, calcular T umbral.
7. Revisar si los datos de la tabla y los estados físicos son coherentes.

---

## Ejercicios resueltos

### Ejercicio 1 — Combustión del octano

#### Razonamiento completo: ¿de dónde sale cada conclusión?

**Inciso a. ¿Qué significa combustión completa?** El octano es un hidrocarburo: contiene carbono e hidrógeno. En una combustión completa con suficiente oxígeno, el carbono termina como dióxido de carbono y el hidrógeno como agua. Primero escribimos los productos, todavía sin coeficientes. El octano tiene ocho átomos de carbono, por lo que necesitamos ocho moléculas de dióxido de carbono; tiene dieciocho hidrógenos, por lo que necesitamos nueve moléculas de agua. Los productos reúnen veinticinco átomos de oxígeno, equivalentes a doce moléculas y media de oxígeno molecular. Multiplicamos toda la reacción por dos para evitar fracciones: de ahí salen los coeficientes 2, 25, 16 y 18. **Un coeficiente multiplica toda la fórmula**, mientras que un subíndice indica los átomos dentro de una molécula.

**Inciso b. ¿Por qué miramos los gases para predecir la entropía?** La entropía está relacionada con la cantidad de maneras microscópicas de distribuir materia y energía. En general, un gas tiene muchas más posibilidades de distribución espacial que un líquido o un sólido. Por eso, cuando una reacción reduce considerablemente la cantidad de gas, suele reducir la entropía. Aquí contamos solamente las especies marcadas como gaseosas: antes hay 25 moles de oxígeno gaseoso y después 16 moles de dióxido de carbono gaseoso. El octano y el agua se escriben líquidos y **no se cuentan como gases**. La reducción de 25 a 16 moles de gas es el fundamento de nuestra predicción de entropía negativa. Es una **regla orientativa**, no una prueba exacta: para comprobar el signo se necesitan entropías tabuladas.

**¿Por qué Gibbs queda mayor que entalpía?** La ecuación de Gibbs resta el producto de temperatura por variación de entropía. La temperatura absoluta es positiva. Si la entropía es negativa, el producto temperatura por entropía es negativo y restar ese número negativo equivale a sumar uno positivo. Por ejemplo, sumar 20 a −100 da −80. Como −80 está más cerca de cero que −100, se dice que es **menos negativo**, aunque matemáticamente es **mayor**. La desigualdad entre Gibbs y entalpía surge de los signos; no necesitamos inventar valores numéricos de la reacción.

**¿Por qué puede seguir siendo favorable?** Una combustión libera mucha energía: su entalpía suele ser fuertemente negativa. El aporte positivo de la entropía puede hacer que Gibbs sea menos negativo sin necesariamente volverlo positivo. Sin datos tabulados no calculamos aquí su valor exacto. Además, espontaneidad termodinámica no significa que la nafta se encienda sola: la rapidez y la energía de activación pertenecen a la cinética química.


**a)** Ecuación balanceada, con agua líquida a temperatura ambiente:
\[
2\,\mathrm{C_8H_{18}(l)}+25\,\mathrm{O_2(g)}\rightarrow16\,\mathrm{CO_2(g)}+18\,\mathrm{H_2O(l)}
\]
**b)** Se consumen 25 moles de gas y se forman 16 por la ecuación escrita; se espera ΔS° < 0. Por tanto:
\[
\Delta G^\circ=\Delta H^\circ-T\Delta S^\circ
\]
\[
\Delta S^\circ<0\Rightarrow -T\Delta S^\circ>0
\]
\[
\boxed{\Delta G^\circ>\Delta H^\circ}
\]
Es decir, **ΔG° es menos negativo que ΔH°**. La reacción sigue siendo favorable porque la combustión es muy exotérmica. Advertencia: si se considera vapor de agua en vez de líquido, el análisis de entropía cambia; hay que respetar los estados físicos.

### Ejercicio 2 — Oxidación de NO

#### Justificación de las decisiones

**¿Por qué se convierten las unidades?** En Gibbs, el producto de temperatura por entropía debe tener las mismas unidades de energía que la entalpía. Si una está en kilojoules y otra en joules, sumarlas sería como sumar metros y centímetros sin convertir. Dividimos la entropía expresada en joules por mil para obtener kilojoules. La temperatura se escribe en kelvin porque el producto termodinámico usa temperatura absoluta, no grados Celsius.

**¿Por qué cambia el signo de Gibbs con la temperatura?** La entalpía es negativa y favorece la reacción directa. La entropía también es negativa, así que el término que se resta se convierte en una cantidad positiva que **aumenta con la temperatura**. A baja temperatura domina la entalpía negativa; a alta temperatura puede dominar la penalización entrópica. No se elige el óxido favorecido por intuición: se calcula Gibbs para cada temperatura y se compara con cero.

**¿Qué significa favorecer NO₂ o NO?** Para la reacción escrita, Gibbs negativo indica que se favorece el sentido de formación de NO₂ bajo las condiciones termodinámicas consideradas. Gibbs positivo indica que el sentido inverso es más favorable. Esto no permite deducir por sí solo la velocidad ni la composición exacta del escape: también influyen las concentraciones y la cinética.


\[
2\,\mathrm{NO(g)}+\mathrm{O_2(g)}\rightarrow2\,\mathrm{NO_2(g)}
\]
Datos para la reacción escrita:
\[
\Delta H^\circ=-114,1 \mathrm{kJ};\quad\Delta S^\circ=-146,54 \mathrm{J/K}=-0,14654 \mathrm{kJ/K}
\]
**a) A 298,15 K**
\[
\Delta G^\circ=-114,1-(298,15)(-0,14654)
\]
\[
\boxed{\Delta G^\circ=-70,41 \mathrm{kJ}}
\]
Espontánea en condiciones estándar.

**b) A 700 °C**
\[
T=700+273,15=973,15 \mathrm{K}
\]
\[
\Delta G^\circ=-114,1-(973,15)(-0,14654)
\]
\[
\boxed{\Delta G^\circ=28,51 \mathrm{kJ}}
\]
No favorable en sentido directo bajo el modelo dado.

**c) A 50 °C y 2500 °C**
\[
T_{50}=323,15 \mathrm K;\quad\Delta G^\circ_{50}=-114,1+0,14654(323,15)=-66,74 \mathrm{kJ}
\]
Favorece NO₂.
\[
T_{2500}=2773,15 \mathrm K;\quad\Delta G^\circ_{2500}=-114,1+0,14654(2773,15)=292,30 \mathrm{kJ}
\]
Favorece NO respecto de NO₂. Son predicciones termodinámicas estándar; no describen por sí solas la velocidad de formación ni la composición real del escape.

### Ejercicio 3 — Temperatura de espontaneidad

#### Justificación de la temperatura límite

**¿Por qué igualamos Gibbs a cero?** Cero es la frontera entre un valor negativo, que favorece la reacción directa, y uno positivo, que no la favorece. Por eso buscamos la temperatura donde ambos aportes se compensan.

**¿Por qué la respuesta es menor que 300 K?** Como entalpía y entropía son negativas, Gibbs tiene la forma «constante negativa más término positivo proporcional a temperatura». A temperaturas bajas el término positivo es pequeño y el resultado sigue siendo negativo. En 300 K ambos términos se cancelan: no se incluye ese punto cuando preguntan por espontaneidad estricta. Por encima de 300 K, el término positivo supera al negativo y Gibbs resulta positivo. Esta comparación de signos justifica la opción, no solamente el despeje.


\[
\Delta H^\circ=-60,0 \mathrm{kJ};\quad\Delta S^\circ=-0,200 \mathrm{kJ/K}
\]
\[
\Delta G^\circ=-60,0-T(-0,200)=-60,0+0,200T
\]
\[
0=-60,0+0,200T\Rightarrow T=300 \mathrm K
\]
\[
\boxed{\Delta G^\circ<0\text{ para }T<300 \mathrm K}
\]
Respuesta **d**. A 300 K está en equilibrio; a temperaturas superiores deja de ser favorable.

### Ejercicio 4 — Descomposición del bicarbonato

#### Por qué se hace cada operación

**Balanceo.** El bicarbonato contiene sodio, hidrógeno, carbono y oxígeno. Se necesitan dos unidades de bicarbonato para obtener los dos sodios del carbonato de sodio. Así también quedan dos hidrógenos para el agua y dos carbonos distribuidos entre carbonato y dióxido de carbono. Se comprueba el oxígeno al final.

**Predicción entrópica.** Los reactivos son sólidos y los productos incluyen dos gases. Los gases ofrecen más posibilidades de distribución microscópica; por eso esperamos un aumento de entropía. Después lo verificamos numéricamente con la tabla. **Predecir** y **calcular** son dos pasos distintos.

**Productos menos reactivos.** La variación de una propiedad compara el estado final con el inicial. Los productos representan el final y los reactivos el inicio; por eso se restan en ese orden. Cada dato tabulado corresponde a una cantidad molar y debe multiplicarse por el coeficiente de la reacción: como hay dos bicarbonatos, su contribución se multiplica por dos.

**Interpretación de Gibbs.** La entalpía positiva indica que la descomposición requiere absorber calor; la entropía positiva favorece la descomposición, especialmente al aumentar temperatura. A temperatura ambiente domina la entalpía y Gibbs es positivo. Al subir temperatura crece el término favorable de entropía hasta compensar la entalpía. La temperatura límite se obtiene poniendo Gibbs igual a cero; no significa que la reacción se vuelva instantánea al cruzarla.


**a)**
\[
2\,\mathrm{NaHCO_3(s)}\rightarrow\mathrm{Na_2CO_3(s)}+\mathrm{CO_2(g)}+\mathrm{H_2O(g)}
\]
**b)** La aparición de dos productos gaseosos a partir de sólidos sugiere ΔS° positiva.

**c) Entropía:** usando S° en J/(mol·K):
\[
\Delta S^\circ=(136,0+213,6+188,7)-2(102,1)
\]
\[
\boxed{\Delta S^\circ=334,1 \mathrm{J/K}=0,3341 \mathrm{kJ/K}}
\]
**d) Entalpía:** usando ΔH°f en kJ/mol:
\[
\Delta H^\circ=[-1131,0-393,5-241,8]-2(-947,7)
\]
\[
\boxed{\Delta H^\circ=129,1 \mathrm{kJ}}
\]
**e) Energía libre estándar**
\[
\Delta G^\circ=129,1-(298,15)(0,3341)
\]
\[
\boxed{\Delta G^\circ=29,49 \mathrm{kJ}}
\]
La descomposición no es favorable a 298,15 K según estos datos; el bicarbonato resulta termodinámicamente estable **frente a esta descomposición** bajo las condiciones consideradas.

**f) Temperatura umbral**
\[
0=129,1-T(0,3341)
\]
\[
T=\frac{129,1}{0,3341}=\boxed{386,41 \mathrm K}
\]
\[
t=386,41-273,15=\boxed{113,26,^\circ\mathrm C}
\]
Se favorece la descomposición por encima del umbral, bajo la aproximación de propiedades constantes.

### Ejercicio 5 — Lluvia ácida y mármol

#### Justificación física y matemática

**¿Por qué puede aumentar la entropía?** En la reacción se libera dióxido de carbono gaseoso. Pasar de reactivos sin productos gaseosos a productos con un gas aumenta las posibilidades de distribución de materia y energía. Eso sugiere entropía positiva, pero la tabla es la que permite calcularla y confirmar el signo.

**¿Por qué usamos propiedades de formación?** La tabla informa propiedades de sustancias individuales; la pregunta pide el cambio de toda una reacción. Para construir ese cambio se suman las contribuciones de todos los productos y se resta la suma de todos los reactivos. Los signos negativos de los datos no se eliminan: restar una suma negativa puede dar un aporte positivo.

**¿Qué concluye Gibbs negativo?** Indica que el proceso directo es termodinámicamente favorable bajo las condiciones consideradas. No indica cuánto tarda en desgastarse el mármol: la velocidad depende de contacto con el ácido, superficie, transporte y otros factores. Tampoco implica que la reacción real ocurra exactamente como el modelo simplificado de la guía.


\[
\mathrm{CaCO_3(s)}+\mathrm{H_2SO_4(l)}\rightarrow\mathrm{CaSO_4(s)}+\mathrm{H_2O(l)}+\mathrm{CO_2(g)}
\]
**Entalpía**
\[
\Delta H^\circ=[-1433-285,85-393,5]-[-1207-814]
\]
\[
\boxed{\Delta H^\circ=-91,35 \mathrm{kJ}}
\]
**Entropía**
\[
\Delta S^\circ=(107+69,96+213,6)-(92,9+156,9)
\]
\[
\boxed{\Delta S^\circ=140,76 \mathrm{J/K}=0,14076 \mathrm{kJ/K}}
\]
**Gibbs**
\[
\Delta G^\circ=-91,35-(298,15)(0,14076)
\]
\[
\boxed{\Delta G^\circ=-133,32 \mathrm{kJ}}
\]
Es termodinámicamente espontánea en condiciones estándar. La velocidad de deterioro depende de condiciones ambientales y cinéticas. **Nota:** la guía simplifica el proceso ambiental al representar ácido sulfúrico líquido y sulfato de calcio sólido.

### Ejercicio 6 — H₂ + CO₂

#### Aclaraciones indispensables para interpretar el ejercicio

**Inconsistencia de estados físicos.** La consigna imprime agua líquida, pero los números de entalpía y entropía corresponden aproximadamente a agua gaseosa. No es válido mezclar el estado líquido escrito con datos del vapor sin advertirlo. Aquí conservamos la consigna visible y declaramos que el cálculo numérico sigue los datos tabulados, por lo tanto usa agua gaseosa.

**¿Por qué el hidrógeno tiene entalpía de formación cero?** Es un elemento en su estado estándar, y por convenio su entalpía estándar de formación es cero. Su entropía absoluta **no** es cero: por eso sí se utiliza el valor de entropía de hidrógeno que aparece en la tabla.

**¿Por qué Gibbs puede pasar de positivo a negativo al calentar?** La entalpía calculada es positiva, lo que desfavorece el sentido directo; la entropía calculada también es positiva, lo que lo favorece cada vez más a mayor temperatura. La temperatura umbral identifica dónde se equilibran esos efectos.

**¿Por qué comparamos porcentajes contra el valor real?** Un error porcentual necesita un denominador de referencia. Como el enunciado da un valor «real» a 1200 K, se usa su magnitud como referencia. El valor absoluto evita que el error porcentual resulte negativo por tratarse de energías negativas. La diferencia grande indica que suponer entalpía y entropía constantes introduce un error importante a esa temperatura.


La guía imprime:
\[
\mathrm{H_2(g)}+\mathrm{CO_2(g)}\rightarrow\mathrm{H_2O(l)}+\mathrm{CO(g)}
\]
**Inconsistencia de la fuente:** aunque dice H₂O(l), su tabla da ΔH°f = −241,8 kJ/mol y S° = 188,7 J/(mol·K), que corresponden aproximadamente a **H₂O(g)**. Para respetar los valores provistos y obtener resultados internamente coherentes, se resuelve con H₂O(g):
\[
\mathrm{H_2(g)}+\mathrm{CO_2(g)}\rightarrow\mathrm{H_2O(g)}+\mathrm{CO(g)}
\]
**a)**
\[
\Delta H^\circ=[-241,8-110,5]-[0-393,5]=41,2 \mathrm{kJ}
\]
\[
\Delta S^\circ=(188,7+197,9)-(130,5+213,8)=42,3 \mathrm{J/K}
\]
\[
\Delta G^\circ=41,2-(298,15)(0,0423)=\boxed{28,59 \mathrm{kJ}}
\]
**b)**
\[
T_{\mathrm{umbral}}=\frac{41,2}{0,0423}=\boxed{973,995 \mathrm K}
\]
Es favorable para T > 974 K, aproximadamente.

**c) A 1200 K con valores estándar constantes**
\[
\Delta G^\circ_{1200\,\mathrm{estimado}}=41,2-1200(0,0423)=\boxed{-9,56 \mathrm{kJ}}
\]
**d) A 1200 K con los valores reales que suministra la guía**
\[
\Delta G^\circ_{1200\,\mathrm{real}}=32,93-1200(0,0296)=\boxed{-2,59 \mathrm{kJ}}
\]
\[
\text{Diferencia absoluta}=|-9,56-(-2,59)|=6,97 \mathrm{kJ}
\]
Tomando el valor real como referencia:
\[
\text{Error porcentual}=\frac{6,97}{2,59}\times100=\boxed{269,1%}
\]
La aproximación predice correctamente el signo, pero exagera mucho la magnitud. **Nota:** el inciso d remite a «estimación en b», aunque la estimación de ΔG a 1200 K se realiza en **c**.

### Ejercicio 7 — Dos reacciones y sus temperaturas

#### Cómo interpretar correctamente las tablas y las dos reacciones

**¿Por qué la última columna no puede ser entropía?** El enunciado anuncia energías libres de formación, pero el encabezado impreso dice entropía. Los números grandes y negativos corresponden a energías libres de formación; además, las entropías molares absolutas de estas sustancias no se interpretan como esos valores negativos. Por eso se explicita la errata y se usan esos datos como Gibbs de formación, sin cambiar el PDF original.

**¿Por qué no calculamos entropía directamente de esa columna?** Porque no son entropías. Primero calculamos entalpía de reacción y Gibbs de reacción mediante «productos menos reactivos». Luego despejamos la entropía de la ecuación de Gibbs. El despeje es una consecuencia algebraica: si Gibbs es igual a entalpía menos temperatura por entropía, la diferencia entre entalpía y Gibbs equivale al producto temperatura por entropía; dividir por temperatura permite obtener entropía.

**¿Por qué esperamos entropía positiva en ambas?** Las dos reacciones producen dióxido de carbono gaseoso a partir de especies que inicialmente no incluyen gas. Generar un gas suele aumentar mucho las posibilidades de distribución de materia. El cálculo permite verificar esta expectativa.

**¿Por qué ninguna es favorable a 650 °C?** La temperatura en kelvin se sustituye por separado para cada reacción. En ambas, el valor calculado de Gibbs sigue siendo positivo: todavía no se alcanzó el punto en que el beneficio entrópico supera el costo entálpico. Comparar sus temperaturas umbral indica cuál reacción empieza a favorecerse primero al calentar. Son estimaciones porque las propiedades termodinámicas pueden cambiar con temperatura y las condiciones reales de gases también importan.


**Inconsistencia de la fuente:** la tabla llama «ΔS°f en J/(mol·K)» a valores negativos como −1044,12 para Na₂CO₃; en realidad corresponden a **ΔG°f en kJ/mol**, como confirma el enunciado. Usamos ΔH°f y ΔG°f de la tabla y calculamos ΔS°rxn = (ΔH°rxn − ΔG°rxn)/298,15 K. Es una inferencia editorial explícita.

**Reacción I — Carbonato de sodio con agua**
\[
\mathrm{Na_2CO_3(s)}+\mathrm{H_2O(l)}\rightarrow2\,\mathrm{NaOH(s)}+\mathrm{CO_2(g)}
\]
**a) Entalpía**
\[
\Delta H^\circ=[2(-426,60)-393,51]-[-1127,42-285,5]
\]
\[
\boxed{\Delta H^\circ=166,21 \mathrm{kJ}}
\]
**b) Predicción:** aparece CO₂ gaseoso, por lo que se espera ΔS° > 0.

**c) Entropía a partir de ΔG°f**
\[
\Delta G^\circ=[2(-379,07)-394,38]-[-1044,12-237,19]
\]
\[
\Delta G^\circ=128,79 \mathrm{kJ}
\]
\[
\Delta S^\circ=\frac{166,21-128,79}{298,15}=\boxed{0,12551 \mathrm{kJ/K}}
\]
**d) A 650 °C**
\[
T=650+273,15=923,15 \mathrm K
\]
\[
\Delta G^\circ_{923,15}=166,21-923,15(0,12551)\approx\boxed{50,35 \mathrm{kJ}}
\]
No espontánea según el modelo.
\[
T_{\mathrm{umbral}}=\frac{166,21}{0,12551}\approx\boxed{1324,3 \mathrm K}\approx1051,2,^\circ\mathrm C
\]

**Reacción II — Descomposición del carbonato de calcio**
\[
\mathrm{CaCO_3(s)}\rightarrow\mathrm{CaO(s)}+\mathrm{CO_2(g)}
\]
**a)**
\[
\Delta H^\circ=[-634,71-393,51]-(-1211,27)=\boxed{183,05 \mathrm{kJ}}
\]
**b)** Se genera un gas: ΔS° esperada positiva.

**c)**
\[
\Delta G^\circ=[-603,75-394,38]-(-1133,03)=134,90 \mathrm{kJ}
\]
\[
\Delta S^\circ=\frac{183,05-134,90}{298,15}=\boxed{0,16150 \mathrm{kJ/K}}
\]
**d)**
\[
\Delta G^\circ_{923,15}=183,05-923,15(0,16150)\approx\boxed{33,96 \mathrm{kJ}}
\]
No espontánea a 650 °C en condiciones estándar con la aproximación dada.
\[
T_{\mathrm{umbral}}=\frac{183,05}{0,16150}\approx\boxed{1133,4 \mathrm K}\approx860,3,^\circ\mathrm C
\]
**Conclusión:** a 650 °C ninguna de las dos reacciones es espontánea según estos datos. A mayor temperatura, primero se vuelve favorable la descomposición del CaCO₃. Las temperaturas calculadas son aproximadas: ΔH y ΔS reales varían con T, y la presión parcial de CO₂ también importa.

---

## Control didáctico y editorial
- Los siete ejercicios están desarrollados, incluidos sus incisos.
- Las reacciones se escriben balanceadas y con estados.
- Todas las temperaturas de sustitución se expresan en kelvin.
- Se mantienen visibles las discrepancias del material fuente en ejercicios 6 y 7.
- Se distinguen espontaneidad termodinámica, velocidad de reacción y condiciones estándar.
- Las fórmulas están escritas en LaTeX delimitado para que la interfaz matemática de la aplicación las renderice; verificar compatibilidad con el componente que ya utiliza 27xSOLved antes de publicarlo.
