# Cinética química

## Instrucciones de integración para Claude y 27xSOLved

Este archivo contiene material teórico aportado, consignas transcritas de las fotografías, desarrollos aportados y respuestas seleccionadas de la guía.

- Conservar íntegramente las consignas originales: no resumir, reformular, simplificar, sustituir ni omitir ninguna parte al integrarlas en la aplicación.
- Mantener las tablas, los incisos, los datos numéricos, las unidades y las opciones de respuesta.
- Presentar cada ejercicio con su consigna antes de cualquier explicación o resolución.
- El material de resolución que sigue fue proporcionado por el usuario: no es una resolución nueva.
- Renderizar las expresiones matemáticas y químicas correctamente; evitar mostrar comandos de marcado sin procesar.
- No agregar emojis.
- Mantener separadas las consignas, el material explicativo, las resoluciones aportadas y la clave de respuestas.
- Si se detecta una posible inconsistencia, señalarla por separado sin alterar el texto original de las consignas.

---

# Parte I. Material teórico aportado

## 1. ¿Cuál es la velocidad de reacción?

La velocidad de una reacción mide qué tan rápido cambian las concentraciones de reactivos o productos con el tiempo.

Se define como:

$$
v=\frac{\text{cambio de concentración}}{\text{cambio de tiempo}}
$$

Y siempre se expresa en M/s.

## 2. Expresiones de velocidad según la estequiometría

(De aquí salen los ejercicios 1, 2 y 3).

Para una reacción general:

$$
aA+bB\rightarrow cC+dD
$$

La velocidad de reacción es:

$$
v=-\frac{1}{a}\frac{d[A]}{dt}=-\frac{1}{b}\frac{d[B]}{dt}=\frac{1}{c}\frac{d[C]}{dt}=\frac{1}{d}\frac{d[D]}{dt}
$$

### ¿Por qué es así?

- Los reactivos disminuyen: signo negativo.
- Los productos aumentan: signo positivo.
- Se divide por el coeficiente estequiométrico porque la velocidad de la reacción es única, pero las concentraciones cambian en proporciones fijas según los coeficientes.

Esta es la fórmula más importante de toda la primera parte.

## 3. Velocidad instantánea vs. velocidad de desaparición

Velocidad de desaparición de un reactivo:

$$
v(A)=-\frac{d[A]}{dt}
$$

Velocidad de formación de un producto:

$$
v(P)=+\frac{d[P]}{dt}
$$

Son velocidades estequiométricas antes de dividir por los coeficientes.

## 4. Velocidad de reacción según la Ley de Velocidad

(Para los ejercicios 5, 7, 9.8, etc.).

La ley de velocidad es empírica (se determina con datos experimentales).

Para una reacción:

$$
aA+bB\rightarrow \text{productos}
$$

La velocidad puede ser:

$$
v=k[A]^m[B]^n
$$

Donde:

- \(k\): constante de velocidad.
- \(m,n\): órdenes parciales.
- \(m+n\): orden total.

Los órdenes NO se sacan de la ecuación química, se miden.

## 5. Cómo descubrir los órdenes de reacción (m y n)

(Usa el método de comparación de experimentos, como el ejercicio 7).

- Si duplicar \([A]\) duplica \(v\): orden 1.
- Si duplicar \([A]\) cuadruplica \(v\): orden 2.
- Si duplicar \([A]\) no cambia \(v\): orden 0.

## 6. Unidades de la constante k

Para una reacción:

$$
v=k[A]^{\text{orden total}}
$$

Sabemos que:

- \(v\): M/s.
- \([A]\): M.

### Orden total = 0

$$
v=k
$$

$$
[k]=\mathrm{M/s}
$$

### Orden total = 1

$$
v=k[A]
$$

$$
[k]=\mathrm{s}^{-1}
$$

### Orden total = 2

$$
v=k[A]^2
$$

$$
[k]=\mathrm{M}^{-1}\mathrm{s}^{-1}
$$

## 7. Cómo encontrar k

Si conocemos \(v\), \([A]\), \([B]\), etc.:

$$
k=\frac{v}{[A]^m[B]^n}
$$

## 8. Catalizadores (concepto clave del punto 6)

- No cambian la constante de equilibrio.
- Cambian la velocidad porque modifican el mecanismo.
- Disminuyen la energía de activación.

## 9. Diluciones y factores de dilución

(Para la segunda hoja).

La fórmula base:

$$
C_1V_1=C_2V_2
$$

Factor de dilución:

$$
FD=\frac{V_2}{V_1}
$$

## 10. Titulaciones (segunda hoja)

Punto esencial:

$$
n(\text{ácido})=n(\text{base})
$$

$$
n=M\cdot V
$$

NO siempre usan un indicador pH. A veces se usan electrodos, conductimetría, etc.

## Hoja de fórmulas (lista directa para imprimir)

**Velocidad estequiométrica general**

$$
v=-\frac{1}{a}\frac{d[A]}{dt}=-\frac{1}{b}\frac{d[B]}{dt}=\frac{1}{c}\frac{d[C]}{dt}=\frac{1}{d}\frac{d[D]}{dt}
$$

**Ley de velocidad**

$$
v=k[A]^m[B]^n
$$

**Orden total**

$$
m+n
$$

**Relación entre cinética y constantes**

$$
k=\frac{v}{[A]^m[B]^n}
$$

**Unidades de k**

- Orden 0: M/s.
- Orden 1: s⁻¹.
- Orden 2: M⁻¹ s⁻¹.

**Regla experimental para órdenes**

Duplicar \([A]\):

- \(v\) duplica: orden 1.
- \(v\) cuadruplica: orden 2.
- \(v\) no cambia: orden 0.

**Concentración-tiempo (solo por si lo piden)**

Orden 0:

$$
[A]=[A]_0-kt
$$

Orden 1:

$$
\ln[A]=\ln[A]_0-kt
$$

Orden 2:

$$
\frac{1}{[A]}=\frac{1}{[A]_0}+kt
$$

**Diluciones**

$$
C_1V_1=C_2V_2
$$

$$
FD=\frac{V_2}{V_1}
$$

**Titulaciones**

$$
M_1V_1=M_2V_2
$$

---

# Parte II. Ejercicios de cinética: consignas originales de las fotografías

> Las consignas de esta sección se mantienen separadas de los desarrollos aportados. Se conserva la numeración de la hoja, incluidas las etiquetas «iv.» y «v.» del ejercicio 7 y «9.11» de la última consigna.

## 1.

Escribir las expresiones de velocidad para las reacciones siguientes, en función del cambio de concentración de los reactivos y de los productos:

a) H₂ (g) + I₂ (g) → 2HI (g)

b) 5Br⁻ (ac) + BrO₃⁻ (ac) + 6H⁺ (ac) → 3Br₂ (ac) + 3H₂O (l)

c) 2 H₂ (g) + O₂ (g) → 2 H₂O (g)

d) 4NH₃ (g) + 5O₂ (g) → 4NO (g) + 6H₂O (g)

## 2.

Considerar la reacción

2NO (g) + O₂ (g) → 2NO₂ (g)

y suponer que, en un instante dado y a cierta temperatura, la vNO = −0,0660 M/s. Calcular:

a) vNO₂ ; b) vO₂ ; c) la velocidad de la reacción en tales condiciones.

## 3.

Considerar la reacción:

O₂ (g) + 2CO (g) → 2CO₂ (g)

y suponer que, en un instante dado y a cierta temperatura, la vO₂ = −0,0740 M/s. Calcular:

a) vCO₂ ; b) vCO; c) la velocidad de la reacción en tales condiciones.

## 4.

¿Cuáles son las unidades de la constante de velocidad si el tiempo se expresa en segundos y los órdenes totales son, respectivamente, cero, uno y dos?

## 5.

La reacción:

2NO (g) + 2H₂ (g) → N₂ (g) + 2H₂O (g)

es de primer orden con respecto a H₂ y de segundo orden con respecto a NO.

i. ¿Cuál es la ecuación de velocidad?

ii. Calcular k si la velocidad es 15,0 M/s y las concentraciones de los reactivos son: [NO] = 0,0500 M y [H₂] = 0,100 M.

## 6.

Indicar si cada una de las afirmaciones siguientes es correcta (C) o incorrecta (I):

i. “Si la reacción es de orden uno, la velocidad es constante”.

ii. “El orden de reacción respecto de cada reactivo es un parámetro experimental y suele ser un número entero o racional”.

iii. “Un catalizador modifica la velocidad de una reacción porque le provee un camino (mecanismo) alternativo con energía de activación diferente”.

## 7.

Se tienen los datos siguientes para la reacción del 2-bromometilpropano, (CH₃)₃CBr, con iones hidróxido a 55 °C:

(CH₃)₃CBr (l) + OH⁻ (aq) → (CH₃)₃COH (aq) + Br⁻ (aq)

| Experimento | [(CH₃)₃CBr]ₜ₌₀ | [OH⁻]ₜ₌₀ | Veloc. inicial / mol dm⁻³ s⁻¹ |
|---|---:|---:|---:|
| 1 | 0,10 | 0,10 | 0,0010 |
| 2 | 0,20 | 0,10 | 0,0020 |
| 3 | 0,30 | 0,10 | 0,0030 |
| 4 | 0,10 | 0,20 | 0,0010 |
| 5 | 0,10 | 0,30 | 0,0010 |

iv. Determinar la ecuación de velocidad.

v. Calcular la velocidad de la reacción si las concentraciones de los reactivos fueran ambas de 0,400 M.

## 8.

Se midieron los datos siguientes a 350 K para la reacción representada por la ecuación química:

BF₃(g) + NH₃(g) → BF₃NH₃(g)

| Experimento | [BF₃]ₜ₌₀ | [NH₃]ₜ₌₀ | Veloc. inicial / mol dm⁻³ min⁻¹ |
|---|---:|---:|---:|
| 1 | 0,500 | 0,500 | 0,8520 |
| 2 | 0,500 | 0,250 | 0,4260 |
| 3 | 0,400 | 0,200 | 0,2726 |
| 4 | 0,700 | 0,200 | 0,4771 |
| 5 | 0,350 | 0,200 | 0,2386 |

a) ¿Cuál es la ecuación de velocidad de esta reacción? ¿Y cuál es su orden total?

b) Calcular la velocidad de la reacción si las concentraciones de los reactivos fueran ambas 0,300 M.

## 9.

En una reacción del tipo A + B → C, se determinó experimentalmente que al duplicar [B], la velocidad aumentó 4 veces, mientras que al duplicar [A] la velocidad no tuvo variación alguna. Esto significa que la ecuación de velocidad es (elegir la opción que se considere correcta):

a) v = k[A]²; b) v = k[C]/[A][B]; c) v = k[B]²; d) v = k[A]; e) v = k[A][B].

## 10.

Para la reacción:

CH₃COOC₂H₅(aq) + OH⁻(aq) → CH₃COO⁻(aq) + CH₃CH₂OH(aq)

se determinó experimentalmente que si se aumenta al doble la concentración de CH₃COOC₂H₅, la velocidad se duplica y si se triplica la concentración de OH⁻ la velocidad se triplica. Elegir la opción que se considere correcta para la ecuación de velocidad entre las opciones siguientes:

i. v = k[CH₃COOC₂H₅][OH⁻]

ii. v = k[CH₃COOC₂H₅]¹ᐟ²[OH⁻]

iii. v = k[CH₃COOC₂H₅]²[OH⁻]

iv. v = k[CH₃COOC₂H₅][OH⁻]³

## 9.11

Explicar los hechos siguientes:

a) para evitar que el jugo de manzana se fermente y se convierta en sidra, debe mantenerse frío.

b) La madera se quema muy rápidamente en presencia de oxígeno puro, pero sólo lo hace lentamente en aire.

---

# Parte III. Resoluciones y explicaciones aportadas por el usuario

> Esta sección reproduce, ordena y corrige el marcado del material de resolución que ya acompañaba el mensaje. No se agregan resoluciones nuevas. El ejercicio 8 no tenía desarrollo aportado.

## Ejercicio 1

### a) H₂ (g) + I₂ (g) → 2HI (g)

Aplicamos la definición general de velocidad estequiométrica. Los reactivos llevan signo negativo porque su concentración disminuye.

$$
v=-\frac{d[H_2]}{dt}=-\frac{d[I_2]}{dt}=\frac{1}{2}\frac{d[HI]}{dt}
$$

### b) 5Br⁻ (ac) + BrO₃⁻ (ac) + 6H⁺ (ac) → 3Br₂ (ac) + 3H₂O (l)

Dividimos cada derivada por su coeficiente para que todas representen la misma velocidad de reacción.

$$
v=-\frac{1}{5}\frac{d[Br^-]}{dt}=-\frac{d[BrO_3^-]}{dt}=-\frac{1}{6}\frac{d[H^+]}{dt}=\frac{1}{3}\frac{d[Br_2]}{dt}=\frac{1}{3}\frac{d[H_2O]}{dt}
$$

### c) 2H₂ (g) + O₂ (g) → 2H₂O (g)

Misma lógica: signo negativo en reactivos, positivo en productos.

$$
v=-\frac{1}{2}\frac{d[H_2]}{dt}=-\frac{d[O_2]}{dt}=\frac{1}{2}\frac{d[H_2O]}{dt}
$$

### d) 4NH₃ (g) + 5O₂ (g) → 4NO (g) + 6H₂O (g)

Cada término se divide por su coeficiente estequiométrico.

$$
v=-\frac{1}{4}\frac{d[NH_3]}{dt}=-\frac{1}{5}\frac{d[O_2]}{dt}=\frac{1}{4}\frac{d[NO]}{dt}=\frac{1}{6}\frac{d[H_2O]}{dt}
$$

## Ejercicio 2

Primero convertimos la velocidad de desaparición de NO en velocidad de reacción usando su coeficiente 2.

$$
v=-\frac{1}{2}\frac{d[NO]}{dt}
$$

$$
v=-\frac{1}{2}(-0{,}0660)=0{,}0330\ \mathrm{M/s}
$$

c) Velocidad de reacción:

$$
v=0{,}0330\ \mathrm{M/s}
$$

a) Para NO₂ (coeficiente 2):

$$
v=\frac{1}{2}\frac{d[NO_2]}{dt}
$$

$$
\frac{d[NO_2]}{dt}=2v=0{,}0660\ \mathrm{M/s}
$$

b) Para O₂ (coeficiente 1):

$$
v=-\frac{d[O_2]}{dt}
$$

$$
\frac{d[O_2]}{dt}=-v=-0{,}0330\ \mathrm{M/s}
$$

## Ejercicio 3

Primero encontramos la velocidad de reacción usando el coeficiente de O₂ (que es 1):

$$
v=-\frac{d[O_2]}{dt}=-(-0{,}0740)=0{,}0740\ \mathrm{M/s}
$$

c) Velocidad de reacción:

$$
v=0{,}0740\ \mathrm{M/s}
$$

a) Para CO₂ (coeficiente 2):

$$
v=\frac{1}{2}\frac{d[CO_2]}{dt}
$$

$$
\frac{d[CO_2]}{dt}=2v=0{,}148\ \mathrm{M/s}
$$

b) Para CO (coeficiente 2):

$$
v=-\frac{1}{2}\frac{d[CO]}{dt}
$$

$$
\frac{d[CO]}{dt}=-2v=-0{,}148\ \mathrm{M/s}
$$

## Ejercicio 4

Usamos la relación:

$$
v=k[A]^n
$$

Recordamos que \(v\) se mide en M/s y \([A]\) en M.

Orden 0:

$$
v=k\qquad [k]=\mathrm{M/s}
$$

Orden 1:

$$
v=k[A]\qquad [k]=\mathrm{s}^{-1}
$$

Orden 2:

$$
v=k[A]^2\qquad [k]=\mathrm{M}^{-1}\mathrm{s}^{-1}
$$

## Ejercicio 5

i) Orden 2 en NO y 1 en H₂:

$$
v=k[NO]^2[H_2]
$$

ii) Despejamos \(k\):

$$
k=\frac{v}{[NO]^2[H_2]}
$$

$$
k=\frac{15{,}0}{(0{,}0500)^2(0{,}100)}
$$

$$
(0{,}0500)^2=0{,}00250
$$

$$
0{,}00250\times0{,}100=0{,}000250
$$

$$
k=\frac{15{,}0}{0{,}000250}=6{,}00\times10^4\ \mathrm{M}^{-2}\mathrm{s}^{-1}
$$

## Ejercicio 6

i) **Incorrecta.** En orden 1 la velocidad depende de la concentración y esta disminuye.

ii) **Correcta.** El orden siempre se obtiene experimentalmente.

iii) **Correcta.** Un catalizador cambia la energía de activación.

## Ejercicio 7

### iv. Determinar la ecuación de velocidad

#### 1) Determinar el orden respecto de (CH₃)₃CBr

Para esto comparamos experimentos donde solo cambia la concentración de (CH₃)₃CBr, mientras [OH⁻] permanece constante.

La mejor comparación es:

- Experimento 1: [(CH₃)₃CBr] = 0,10 M; v = 0,0010.
- Experimento 2: [(CH₃)₃CBr] = 0,20 M; v = 0,0020.

¿Qué cambia?

- (CH₃)₃CBr se duplica.
- La velocidad también se duplica.

Conclusión: orden 1 en (CH₃)₃CBr.

También lo confirma Exp. 1 → Exp. 3:

- 0,10 → 0,30 (×3).
- 0,0010 → 0,0030 (×3).

Consistente con primer orden.

#### 2) Determinar el orden respecto de OH⁻

Ahora comparamos experimentos donde cambia OH⁻ y se mantiene constante (CH₃)₃CBr.

- Experimento 1: [OH⁻] = 0,10 → v = 0,0010.
- Experimento 4: [OH⁻] = 0,20 → v = 0,0010.
- Experimento 5: [OH⁻] = 0,30 → v = 0,0010.

¿Qué observamos?

Aumentar OH⁻ al doble o al triple no cambia la velocidad.

Conclusión: orden 0 en OH⁻.

Este comportamiento es típico de reacciones SN1, donde la velocidad depende solo del sustrato.

#### 3) Ley de velocidad

Con los órdenes obtenidos:

- Orden 1 en (CH₃)₃CBr.
- Orden 0 en OH⁻.

$$
v=k[(CH_3)_3CBr]^1[OH^-]^0
$$

$$
v=k[(CH_3)_3CBr]
$$

#### 4) Calcular k

Usamos cualquier experimento; elegimos el 1:

$$
v=0{,}0010
$$

$$
[(CH_3)_3CBr]=0{,}10
$$

$$
0{,}0010=k(0{,}10)
$$

$$
k=\frac{0{,}0010}{0{,}10}
$$

$$
k=1{,}0\times10^{-2}\ \mathrm{s}^{-1}
$$

### v. Velocidad si ambas concentraciones fueran 0,400 M

Ley de velocidad:

$$
v=k[(CH_3)_3CBr]
$$

Sustituimos:

$$
v=(1{,}0\times10^{-2}\ \mathrm{s}^{-1})(0{,}400\ \mathrm{M})
$$

$$
v=4{,}0\times10^{-3}\ \mathrm{M/s}
$$

$$
v=0{,}0040\ \mathrm{mol\,dm}^{-3}\mathrm{s}^{-1}
$$

## Ejercicio 8

No se proporcionó una resolución desarrollada en el texto recibido. La consigna completa está en la Parte II y la respuesta seleccionada está en la Parte IV.

## Ejercicio 9

- Al duplicar [B], la velocidad aumenta 4 veces: orden 2 en B.
- Al duplicar [A], la velocidad no cambia: orden 0 en A.

La ley de velocidad es:

$$
v=k[B]^2
$$

La opción correcta es c).

Coincide con la hoja oficial de respuestas.

## Ejercicio 10

- Si duplicar [CH₃COOC₂H₅] duplica la velocidad: orden 1.
- Si triplicar [OH⁻] triplica la velocidad: orden 1.

Ecuación de velocidad:

$$
v=k[CH_3COOC_2H_5][OH^-]
$$

La opción correcta es i.

Coincide con la hoja oficial de respuestas.

## Ejercicio 11(a)

La fermentación es una reacción química catalizada por enzimas.

A menor temperatura:

- Baja la energía cinética.
- Baja la frecuencia de choques efectivos.
- Baja la velocidad de reacción.

Por eso, mantener frío el jugo de manzana detiene o reduce la fermentación y evita que se transforme en sidra.

Coincide con la hoja oficial de respuestas.

## Ejercicio 11(b)

La velocidad de combustión depende de la concentración de oxígeno.

Comparación:

- En el aire: \(x(O_2)\approx0{,}21\).
- Oxígeno puro: \(x(O_2)=1{,}00\).

Con presión parcial de oxígeno mucho mayor, la velocidad de combustión aumenta enormemente.

Por eso:

- En oxígeno puro: la madera se quema muy rápido.
- En aire: la combustión es mucho más lenta.

Coincide con la hoja de respuestas.

---

# Parte IV. Respuestas seleccionadas de la tercera fotografía

**9.2:** a) 0,0660 M/s; b) −0,0330 M/s; c) 0,0330 M/s.

**9.3:** a) 0,148 M/s; b) −0,148 M/s; c) 0,0740 M/s.

**9.4:** M/s, s⁻¹ y M⁻¹ s⁻¹, respectivamente.

**9.5:** a) \(v=k[NO]^2[H_2]\); b) \(k=6{,}00\cdot10^4\ \mathrm{M}^{-2}\mathrm{s}^{-1}\).

**9.6:** a) I; b) C; c) C.

**9.7:** a) \(v=1{,}0\times10^{-2}\ \mathrm{s}^{-1}[(CH_3)_3CBr]\); b) \(v=0{,}0040\ \mathrm{M/s}\).

**9.8:** a) \(v=3{,}41\ \mathrm{L\,mol}^{-1}\mathrm{min}^{-1}[BF_3][NH_3]\), orden total 2; b) \(v=0{,}308\ \mathrm{M/min}\).

**9.9:** c).

**9.10:** a).

**9.11:** a) a menor temperatura, también lo es la velocidad de fermentación; b) el orden respecto de la concentración de oxígeno debe ser distinto de cero (la proporción de oxígeno en el aire, \(x(O_2)\approx0{,}2\), es menor que en el oxígeno puro, \(x(O_2)=1\)).

---

# Nota editorial para integración

La numeración de la guía aparece como 1–10 y «9.11» en las fotografías, mientras que la hoja de respuestas usa 9.2–9.11. Conservar la referencia original y no modificar las consignas para forzar uniformidad.

El texto de explicaciones y resoluciones se mantiene en una sección independiente para no confundirlo con la transcripción literal de las consignas. Las fórmulas se han convertido a notación matemática Markdown compatible con renderizadores de LaTeX.
