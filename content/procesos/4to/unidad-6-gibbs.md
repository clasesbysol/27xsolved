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
T_{\\mathrm{umbral}}=rac{\Delta H}{\Delta S}
\]
Solo tiene sentido físico si el cociente es positivo y si el modelo de ΔH y ΔS constantes resulta razonable en ese intervalo.

### 5. Propiedades de formación
Para cualquier propiedad de reacción X = H, G:
\[
\Delta X^\circ_{\\mathrm{rxn}}=\sum
u\Delta X^\circ_f(	ext{productos})-\sum
u\Delta X^\circ_f(	ext{reactivos})
\]
Para la entropía se usan **entropías molares estándar absolutas**:
\[
\Delta S^\circ_{\\mathrm{rxn}}=\sum
u S^\circ(	ext{productos})-\sum
u S^\circ(	ext{reactivos})
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
**a)** Ecuación balanceada, con agua líquida a temperatura ambiente:
\[
2,\\mathrm{C_8H_{18}(l)}+25,\\mathrm{O_2(g)}ightarrow16,\\mathrm{CO_2(g)}+18,\\mathrm{H_2O(l)}
\]
**b)** Se consumen 25 moles de gas y se forman 16 por la ecuación escrita; se espera ΔS° < 0. Por tanto:
\[
\Delta G^\circ=\Delta H^\circ-T\Delta S^\circ
\]
\[
\Delta S^\circ<0\Rightarrow -T\Delta S^\circ>0
\]
\[
oxed{\Delta G^\circ>\Delta H^\circ}
\]
Es decir, **ΔG° es menos negativo que ΔH°**. La reacción sigue siendo favorable porque la combustión es muy exotérmica. Advertencia: si se considera vapor de agua en vez de líquido, el análisis de entropía cambia; hay que respetar los estados físicos.

### Ejercicio 2 — Oxidación de NO
\[
2,\\mathrm{NO(g)}+\\mathrm{O_2(g)}ightarrow2,\\mathrm{NO_2(g)}
\]
Datos para la reacción escrita:
\[
\Delta H^\circ=-114,1 \\mathrm{kJ};\quad\Delta S^\circ=-146,54 \\mathrm{J/K}=-0,14654 \\mathrm{kJ/K}
\]
**a) A 298,15 K**
\[
\Delta G^\circ=-114,1-(298,15)(-0,14654)
\]
\[
oxed{\Delta G^\circ=-70,41 \\mathrm{kJ}}
\]
Espontánea en condiciones estándar.

**b) A 700 °C**
\[
T=700+273,15=973,15 \\mathrm{K}
\]
\[
\Delta G^\circ=-114,1-(973,15)(-0,14654)
\]
\[
oxed{\Delta G^\circ=28,51 \\mathrm{kJ}}
\]
No favorable en sentido directo bajo el modelo dado.

**c) A 50 °C y 2500 °C**
\[
T_{50}=323,15 \mathrm K;\quad\Delta G^\circ_{50}=-114,1+0,14654(323,15)=-66,74 \\mathrm{kJ}
\]
Favorece NO₂.
\[
T_{2500}=2773,15 \mathrm K;\quad\Delta G^\circ_{2500}=-114,1+0,14654(2773,15)=292,30 \\mathrm{kJ}
\]
Favorece NO respecto de NO₂. Son predicciones termodinámicas estándar; no describen por sí solas la velocidad de formación ni la composición real del escape.

### Ejercicio 3 — Temperatura de espontaneidad
\[
\Delta H^\circ=-60,0 \\mathrm{kJ};\quad\Delta S^\circ=-0,200 \\mathrm{kJ/K}
\]
\[
\Delta G^\circ=-60,0-T(-0,200)=-60,0+0,200T
\]
\[
0=-60,0+0,200T\Rightarrow T=300 \mathrm K
\]
\[
oxed{\Delta G^\circ<0	ext{ para }T<300 \mathrm K}
\]
Respuesta **d**. A 300 K está en equilibrio; a temperaturas superiores deja de ser favorable.

### Ejercicio 4 — Descomposición del bicarbonato
**a)**
\[
2,\\mathrm{NaHCO_3(s)}ightarrow\\mathrm{Na_2CO_3(s)}+\\mathrm{CO_2(g)}+\\mathrm{H_2O(g)}
\]
**b)** La aparición de dos productos gaseosos a partir de sólidos sugiere ΔS° positiva.

**c) Entropía:** usando S° en J/(mol·K):
\[
\Delta S^\circ=(136,0+213,6+188,7)-2(102,1)
\]
\[
oxed{\Delta S^\circ=334,1 \\mathrm{J/K}=0,3341 \\mathrm{kJ/K}}
\]
**d) Entalpía:** usando ΔH°f en kJ/mol:
\[
\Delta H^\circ=[-1131,0-393,5-241,8]-2(-947,7)
\]
\[
oxed{\Delta H^\circ=129,1 \\mathrm{kJ}}
\]
**e) Energía libre estándar**
\[
\Delta G^\circ=129,1-(298,15)(0,3341)
\]
\[
oxed{\Delta G^\circ=29,49 \\mathrm{kJ}}
\]
La descomposición no es favorable a 298,15 K según estos datos; el bicarbonato resulta termodinámicamente estable **frente a esta descomposición** bajo las condiciones consideradas.

**f) Temperatura umbral**
\[
0=129,1-T(0,3341)
\]
\[
T=rac{129,1}{0,3341}=oxed{386,41 \mathrm K}
\]
\[
t=386,41-273,15=oxed{113,26,^\circ\mathrm C}
\]
Se favorece la descomposición por encima del umbral, bajo la aproximación de propiedades constantes.

### Ejercicio 5 — Lluvia ácida y mármol
\[
\\mathrm{CaCO_3(s)}+\\mathrm{H_2SO_4(l)}ightarrow\\mathrm{CaSO_4(s)}+\\mathrm{H_2O(l)}+\\mathrm{CO_2(g)}
\]
**Entalpía**
\[
\Delta H^\circ=[-1433-285,85-393,5]-[-1207-814]
\]
\[
oxed{\Delta H^\circ=-91,35 \\mathrm{kJ}}
\]
**Entropía**
\[
\Delta S^\circ=(107+69,96+213,6)-(92,9+156,9)
\]
\[
oxed{\Delta S^\circ=140,76 \\mathrm{J/K}=0,14076 \\mathrm{kJ/K}}
\]
**Gibbs**
\[
\Delta G^\circ=-91,35-(298,15)(0,14076)
\]
\[
oxed{\Delta G^\circ=-133,32 \\mathrm{kJ}}
\]
Es termodinámicamente espontánea en condiciones estándar. La velocidad de deterioro depende de condiciones ambientales y cinéticas. **Nota:** la guía simplifica el proceso ambiental al representar ácido sulfúrico líquido y sulfato de calcio sólido.

### Ejercicio 6 — H₂ + CO₂
La guía imprime:
\[
\\mathrm{H_2(g)}+\\mathrm{CO_2(g)}ightarrow\\mathrm{H_2O(l)}+\\mathrm{CO(g)}
\]
**Inconsistencia de la fuente:** aunque dice H₂O(l), su tabla da ΔH°f = −241,8 kJ/mol y S° = 188,7 J/(mol·K), que corresponden aproximadamente a **H₂O(g)**. Para respetar los valores provistos y obtener resultados internamente coherentes, se resuelve con H₂O(g):
\[
\\mathrm{H_2(g)}+\\mathrm{CO_2(g)}ightarrow\\mathrm{H_2O(g)}+\\mathrm{CO(g)}
\]
**a)**
\[
\Delta H^\circ=[-241,8-110,5]-[0-393,5]=41,2 \\mathrm{kJ}
\]
\[
\Delta S^\circ=(188,7+197,9)-(130,5+213,8)=42,3 \\mathrm{J/K}
\]
\[
\Delta G^\circ=41,2-(298,15)(0,0423)=oxed{28,59 \\mathrm{kJ}}
\]
**b)**
\[
T_{\\mathrm{umbral}}=rac{41,2}{0,0423}=oxed{973,995 \mathrm K}
\]
Es favorable para T > 974 K, aproximadamente.

**c) A 1200 K con valores estándar constantes**
\[
\Delta G^\circ_{1200,\\mathrm{estimado}}=41,2-1200(0,0423)=oxed{-9,56 \\mathrm{kJ}}
\]
**d) A 1200 K con los valores reales que suministra la guía**
\[
\Delta G^\circ_{1200,\\mathrm{real}}=32,93-1200(0,0296)=oxed{-2,59 \\mathrm{kJ}}
\]
\[
	ext{Diferencia absoluta}=|-9,56-(-2,59)|=6,97 \\mathrm{kJ}
\]
Tomando el valor real como referencia:
\[
	ext{Error porcentual}=rac{6,97}{2,59}	imes100=oxed{269,1%}
\]
La aproximación predice correctamente el signo, pero exagera mucho la magnitud. **Nota:** el inciso d remite a «estimación en b», aunque la estimación de ΔG a 1200 K se realiza en **c**.

### Ejercicio 7 — Dos reacciones y sus temperaturas
**Inconsistencia de la fuente:** la tabla llama «ΔS°f en J/(mol·K)» a valores negativos como −1044,12 para Na₂CO₃; en realidad corresponden a **ΔG°f en kJ/mol**, como confirma el enunciado. Usamos ΔH°f y ΔG°f de la tabla y calculamos ΔS°rxn = (ΔH°rxn − ΔG°rxn)/298,15 K. Es una inferencia editorial explícita.

**Reacción I — Carbonato de sodio con agua**
\[
\\mathrm{Na_2CO_3(s)}+\\mathrm{H_2O(l)}ightarrow2,\\mathrm{NaOH(s)}+\\mathrm{CO_2(g)}
\]
**a) Entalpía**
\[
\Delta H^\circ=[2(-426,60)-393,51]-[-1127,42-285,5]
\]
\[
oxed{\Delta H^\circ=166,21 \\mathrm{kJ}}
\]
**b) Predicción:** aparece CO₂ gaseoso, por lo que se espera ΔS° > 0.

**c) Entropía a partir de ΔG°f**
\[
\Delta G^\circ=[2(-379,07)-394,38]-[-1044,12-237,19]
\]
\[
\Delta G^\circ=128,79 \\mathrm{kJ}
\]
\[
\Delta S^\circ=rac{166,21-128,79}{298,15}=oxed{0,12551 \\mathrm{kJ/K}}
\]
**d) A 650 °C**
\[
T=650+273,15=923,15 \mathrm K
\]
\[
\Delta G^\circ_{923,15}=166,21-923,15(0,12551)\approxoxed{50,35 \\mathrm{kJ}}
\]
No espontánea según el modelo.
\[
T_{\\mathrm{umbral}}=rac{166,21}{0,12551}\approxoxed{1324,3 \mathrm K}\approx1051,2,^\circ\mathrm C
\]

**Reacción II — Descomposición del carbonato de calcio**
\[
\\mathrm{CaCO_3(s)}ightarrow\\mathrm{CaO(s)}+\\mathrm{CO_2(g)}
\]
**a)**
\[
\Delta H^\circ=[-634,71-393,51]-(-1211,27)=oxed{183,05 \\mathrm{kJ}}
\]
**b)** Se genera un gas: ΔS° esperada positiva.

**c)**
\[
\Delta G^\circ=[-603,75-394,38]-(-1133,03)=134,90 \\mathrm{kJ}
\]
\[
\Delta S^\circ=rac{183,05-134,90}{298,15}=oxed{0,16150 \\mathrm{kJ/K}}
\]
**d)**
\[
\Delta G^\circ_{923,15}=183,05-923,15(0,16150)\approxoxed{33,96 \\mathrm{kJ}}
\]
No espontánea a 650 °C en condiciones estándar con la aproximación dada.
\[
T_{\\mathrm{umbral}}=rac{183,05}{0,16150}\approxoxed{1133,4 \mathrm K}\approx860,3,^\circ\mathrm C
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
