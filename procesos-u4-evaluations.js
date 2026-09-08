// 27xSOLved · Procesos y Operaciones Químicas · Evaluaciones de Primer Principio.
// La primera toma como base la evaluación real aportada; las tres siguientes cambian
// procesos, datos y estrategias de resolución para entrenar razonamiento y no memoria.
(function(){
  'use strict';

  const F = value => String.raw({raw:[value]});

  window.ET27_PROCESOS_EVALUATIONS = [
    {
      id:'EV-P1',
      eyebrow:'EVALUACIÓN 1 · BASADA EN EVALUACIÓN REAL',
      title:'Primer principio · procesos encadenados y ciclo',
      meta:'Conserva la lógica de la evaluación fotografiada: un proceso de dos etapas, verdadero/falso con justificación y un ciclo P–V.',
      problems:[
        {
          id:'EV-P1-1',
          title:'Argón: compresión isotérmica + calentamiento isocórico',
          statement:'Un mol de argón se encuentra a 1 atm y 25 °C. Se lo comprime isotérmicamente hasta la mitad de su volumen inicial y luego se lo calienta isocóricamente hasta duplicar la presión alcanzada al terminar la compresión.',
          parts:[
            'Representar el proceso en un diagrama P–V e indicar los estados A, B y C.',
            'Calcular Q, L y ΔU en cada etapa usando la convención ΔU = Q + L.',
            'Explicar qué cambiaría si en lugar de argón se tratara de un gas ideal diatómico.'
          ],
          answer:'A→B: ΔU = 0, L ≈ +1,72 kJ, Q ≈ −1,72 kJ. B→C para Ar: L = 0 y Q = ΔU ≈ +3,72 kJ. Para un gas diatómico la etapa isotérmica no cambia, pero B→C requiere más calor porque Cv es mayor.',
          teacher:'La idea fuerte es separar primero qué magnitud queda constante en cada tramo. En A→B no importa Cv porque T no cambia; recién en B→C aparece la diferencia monoatómico/diatómico.',
          steps:[
            {title:'1 · Estado inicial',text:'Paso 25 °C a kelvin y uso gas ideal para conocer el volumen inicial.',formulas:[F('T_A=25+273.15=298.15\\;\\mathrm{K}'),F('V_A=\\frac{nRT_A}{P_A}=\\frac{(1)(0.082057)(298.15)}{1}=24.47\\;\\mathrm{L}')]},
            {title:'2 · A→B es una compresión isotérmica',text:'La temperatura permanece constante y el volumen final es la mitad. Por Boyle, la presión se duplica.',formulas:[F('V_B=\\frac{V_A}{2}=12.23\\;\\mathrm{L}'),F('P_AV_A=P_BV_B\\Rightarrow P_B=2.00\\;\\mathrm{atm}'),F('\\Delta U_{AB}=0')]},
            {title:'3 · Trabajo y calor en A→B',text:'Con la convención de la materia, una compresión da L positivo porque el entorno realiza trabajo sobre el gas.',formulas:[F('L_{AB}=-nRT\\ln\\left(\\frac{V_B}{V_A}\\right)'),F('L_{AB}=-(1)(8.314)(298.15)\\ln(0.5)=+1.718\\;\\mathrm{kJ}'),F('0=Q_{AB}+L_{AB}\\Rightarrow Q_{AB}=-1.718\\;\\mathrm{kJ}')]},
            {title:'4 · B→C es isocórica',text:'Al quedar V constante, P es proporcional a T. Si la presión se duplica, la temperatura también.',formulas:[F('P_C=2P_B=4.00\\;\\mathrm{atm}'),F('T_C=2T_B=596.30\\;\\mathrm{K}'),F('\\Delta T_{BC}=298.15\\;\\mathrm{K}'),F('L_{BC}=0')]},
            {title:'5 · Energía interna y calor para argón',text:'El argón es monoatómico: Cv = 3R/2. Como no hay trabajo, todo el calor recibido aumenta U.',formulas:[F('C_v=\\frac{3}{2}R'),F('\\Delta U_{BC}=nC_v\\Delta T=(1)\\left(\\frac{3}{2}8.314\\right)(298.15)=3.718\\;\\mathrm{kJ}'),F('Q_{BC}=\\Delta U_{BC}=+3.718\\;\\mathrm{kJ}')]},
            {title:'6 · Si fuera diatómico',text:'La compresión isotérmica queda igual. En el tramo isocórico cambia Cv, por lo que cambia ΔU y Q.',formulas:[F('C_{v,diat}=\\frac{5}{2}R'),F('\\Delta U_{BC}=Q_{BC}=(1)\\left(\\frac{5}{2}8.314\\right)(298.15)=6.197\\;\\mathrm{kJ}')]}
          ]
        },
        {
          id:'EV-P1-2',
          title:'Verdadero o falso · justificar',
          statement:'Indicar V o F y justificar cada afirmación para un gas ideal y usando la convención ΔU = Q + L.',
          parts:[
            'La variación de energía interna depende sólo de ΔT.',
            'En una expansión isobárica, el trabajo L es positivo.'
          ],
          answer:'a) Verdadero para un gas ideal. b) Falso con esta convención: en una expansión ΔV > 0 y L = −PΔV < 0.',
          teacher:'Acá conviene insistir en que el signo del trabajo depende de la convención elegida. La app usa trabajo sobre el sistema: compresión positiva, expansión negativa.',
          steps:[
            {title:'a · Energía interna',text:'Para un gas ideal, U depende de T. Por eso entre dos estados la variación se calcula con Cv y ΔT, no con el camino P–V.',formulas:[F('\\Delta U=nC_v\\Delta T')]},
            {title:'b · Signo del trabajo isobárico',text:'En expansión el volumen aumenta. Con la convención usada en la materia el trabajo sobre el sistema es negativo.',formulas:[F('L=-P\\Delta V'),F('\\Delta V>0\\Rightarrow L<0')]}
          ]
        },
        {
          id:'EV-P1-3',
          title:'Ciclo A–B–C con datos de estado',
          statement:'Un sistema gaseoso ideal evoluciona en un ciclo A→B→C→A. Estado A: P = 0,1 atm, V = 5 L. Estado B: P = 0,1 atm, V = 10 L, T = 673 K. Estado C: P = 0,2 atm, V = 5 L. Calcular el intercambio neto de calor del ciclo e indicar si el sistema recibe o cede calor.',
          parts:['Reconocer qué transformación representa cada tramo a partir de los datos.', 'Usar que en un ciclo ΔUtotal = 0 para evitar calcular ΔU tramo por tramo.'],
          answer:'AB isobárica, BC isotérmica y CA isocórica. Ltotal ≈ +19,6 J, por lo tanto Qtotal ≈ −19,6 J: el sistema cede calor neto.',
          teacher:'Los estados B y C tienen el mismo producto PV; eso revela la isotérmica. Es más eficiente calcular el trabajo del ciclo y usar ΔUciclo = 0 que perseguir cada calor por separado.',
          steps:[
            {title:'1 · Identifico las transformaciones',text:'A y B tienen la misma presión: AB es isobárica. B y C tienen el mismo PV: BC es isotérmica. C y A tienen el mismo volumen: CA es isocórica.',formulas:[F('P_AV_A=0.5\\;\\mathrm{L\\,atm}'),F('P_BV_B=P_CV_C=1.0\\;\\mathrm{L\\,atm}')]},
            {title:'2 · Trabajo AB',text:'Es una expansión isobárica a 0,1 atm.',formulas:[F('L_{AB}=-P(V_B-V_A)=-(0.1)(10-5)=-0.5\\;\\mathrm{L\\,atm}'),F('L_{AB}=-50.66\\;\\mathrm{J}')]},
            {title:'3 · Trabajo BC',text:'En la isotérmica nRT = PV = 1 L·atm = 101,325 J. Como hay compresión, L resulta positivo.',formulas:[F('L_{BC}=-nRT\\ln\\left(\\frac{V_C}{V_B}\\right)'),F('L_{BC}=-(101.325)\\ln(0.5)=+70.24\\;\\mathrm{J}')]},
            {title:'4 · Trabajo CA',text:'Es isocórica, por lo tanto no hay trabajo de frontera.',formulas:[F('L_{CA}=0')]},
            {title:'5 · Cierro el ciclo',text:'La energía interna vuelve al mismo valor porque el estado final coincide con el inicial.',formulas:[F('L_{tot}=-50.66+70.24=+19.58\\;\\mathrm{J}'),F('\\Delta U_{ciclo}=0=Q_{tot}+L_{tot}'),F('Q_{tot}=-19.58\\;\\mathrm{J}')]}
          ]
        }
      ]
    },
    {
      id:'EV-P2',
      eyebrow:'EVALUACIÓN 2 · VARIANTE',
      title:'Adiabática reversible + calentamiento isobárico',
      meta:'Cambia el núcleo del problema: aparece γ, relaciones adiabáticas y un ciclo rectangular donde el área P–V permite resolver el calor neto.',
      problems:[
        {
          id:'EV-P2-1',
          title:'Nitrógeno: expansión adiabática y luego calentamiento',
          statement:'Dos moles de N₂ ideal están a 4,00 atm y 320 K. Se expanden reversible y adiabáticamente hasta 1,20 atm. Luego, manteniendo esa presión, se calientan hasta 360 K. Tomar γ = 1,40, Cv = 5R/2 y Cp = 7R/2.',
          parts:['Hallar V y T al terminar la etapa adiabática.', 'Calcular Q, L y ΔU en ambas etapas.', 'Explicar qué cambiaría cualitativamente si el gas fuera monoatómico.'],
          answer:'Después de la adiabática: T ≈ 226,9 K y V ≈ 31,0 L. Etapa 1: Q = 0 y L = ΔU ≈ −3,87 kJ. Etapa 2: ΔU ≈ +5,53 kJ, L ≈ −2,21 kJ y Q ≈ +7,75 kJ.',
          teacher:'Esta evaluación obliga a usar γ antes de entrar al primer principio. Es un camino distinto al de las isotérmicas: primero se resuelve el estado final de la adiabática y recién después las energías.',
          steps:[
            {title:'1 · Volumen inicial',text:'Uso PV = nRT con R en L·atm.',formulas:[F('V_1=\\frac{nRT_1}{P_1}=\\frac{(2)(0.082057)(320)}{4.00}=13.13\\;\\mathrm{L}')]},
            {title:'2 · Estado 2 por relación adiabática',text:'Para una adiabática reversible de gas ideal puedo relacionar directamente presiones y temperaturas.',formulas:[F('\\frac{T_2}{T_1}=\\left(\\frac{P_2}{P_1}\\right)^{(\\gamma-1)/\\gamma}'),F('T_2=320\\left(\\frac{1.20}{4.00}\\right)^{0.4/1.4}=226.86\\;\\mathrm{K}'),F('V_2=V_1\\left(\\frac{P_1}{P_2}\\right)^{1/\\gamma}=31.03\\;\\mathrm{L}')]},
            {title:'3 · Energías en 1→2',text:'Adiabático significa Q = 0. La caída de temperatura hace que ΔU sea negativa; por primera ley L toma el mismo valor.',formulas:[F('Q_{12}=0'),F('\\Delta U_{12}=nC_v(T_2-T_1)'),F('\\Delta U_{12}=(2)\\left(\\frac{5}{2}8.314\\right)(226.86-320)=-3.872\\;\\mathrm{kJ}'),F('L_{12}=\\Delta U_{12}=-3.872\\;\\mathrm{kJ}')]},
            {title:'4 · Estado 3 a presión constante',text:'Ahora P = 1,20 atm y T sube a 360 K.',formulas:[F('V_3=\\frac{nRT_3}{P_3}=49.23\\;\\mathrm{L}'),F('\\Delta T_{23}=360-226.86=133.14\\;\\mathrm{K}')]},
            {title:'5 · Energías en 2→3',text:'En un calentamiento isobárico el gas se expande: L es negativo. Q puede calcularse con Cp.',formulas:[F('\\Delta U_{23}=nC_v\\Delta T=+5.535\\;\\mathrm{kJ}'),F('L_{23}=-nR\\Delta T=-2.214\\;\\mathrm{kJ}'),F('Q_{23}=nC_p\\Delta T=+7.749\\;\\mathrm{kJ}')]},
            {title:'6 · Si fuera monoatómico',text:'Cambiarían γ y Cv. Para la misma caída de presión, la adiabática terminaría en otro T y V y por eso también cambiarían ΔU y L.',formulas:[F('\\gamma_{mono}=\\frac{5}{3}'),F('C_{v,mono}=\\frac{3}{2}R')]}
          ]
        },
        {
          id:'EV-P2-2',
          title:'Verdadero o falso · adiabáticas',
          statement:'Indicar V o F y justificar.',
          parts:['En una expansión adiabática reversible de un gas ideal, la temperatura disminuye.', 'Si Q = 0 entonces necesariamente ΔU = 0.', 'Para un gas ideal diatómico, Cp − Cv = R.'],
          answer:'a) V. b) F: en una adiabática ΔU = L. c) V para gas ideal.',
          teacher:'El error típico es confundir “sin calor” con “sin cambio de energía interna”. La energía puede cambiar por trabajo aunque Q sea cero.',
          steps:[
            {title:'a · Expansión adiabática',text:'El gas hace trabajo sin recibir calor; la energía sale de U y la temperatura baja.',formulas:[F('Q=0'),F('\\Delta U=L<0\\Rightarrow \\Delta T<0')]},
            {title:'b · Q = 0 no implica ΔU = 0',text:'La primera ley muestra que el trabajo puede modificar U aun sin intercambio térmico.',formulas:[F('\\Delta U=Q+L'),F('Q=0\\Rightarrow\\Delta U=L')]},
            {title:'c · Relación de Mayer',text:'Para gases ideales, la diferencia entre capacidades caloríficas molares es R.',formulas:[F('C_p-C_v=R')]}
          ]
        },
        {
          id:'EV-P2-3',
          title:'Ciclo rectangular: resolver por área',
          statement:'Un gas ideal recorre el ciclo A→B→C→D→A con A(4 L, 1 atm), B(4 L, 3 atm), C(10 L, 3 atm) y D(10 L, 1 atm). Calcular Q neto del ciclo e indicar si el gas recibe o cede calor.',
          parts:['Identificar qué tramos realizan trabajo.', 'Resolver primero el trabajo neto usando el área encerrada en el diagrama P–V.'],
          answer:'Ltotal = −12 L·atm ≈ −1,216 kJ y Qtotal ≈ +1,216 kJ. El sistema recibe calor neto.',
          teacher:'Este ejercicio se resuelve mucho más rápido mirando el rectángulo que calculando cuatro calores. El sentido horario implica trabajo neto hecho por el gas; con nuestra convención L sobre el sistema es negativo.',
          steps:[
            {title:'1 · Tramos verticales',text:'AB y CD son isocóricos. No desplazan frontera y no aportan trabajo.',formulas:[F('L_{AB}=L_{CD}=0')]},
            {title:'2 · Expansión BC',text:'A 3 atm el volumen aumenta 6 L.',formulas:[F('L_{BC}=-P\\Delta V=-(3)(10-4)=-18\\;\\mathrm{L\\,atm}')]},
            {title:'3 · Compresión DA',text:'A 1 atm el gas vuelve de 10 L a 4 L.',formulas:[F('L_{DA}=-(1)(4-10)=+6\\;\\mathrm{L\\,atm}')]},
            {title:'4 · Trabajo neto',text:'Es equivalente al área del rectángulo con signo.',formulas:[F('L_{tot}=-18+6=-12\\;\\mathrm{L\\,atm}'),F('L_{tot}=(-12)(101.325)=-1.216\\;\\mathrm{kJ}')]},
            {title:'5 · Calor neto',text:'En un ciclo ΔU total es cero.',formulas:[F('0=Q_{tot}+L_{tot}'),F('Q_{tot}=+1.216\\;\\mathrm{kJ}')]}
          ]
        }
      ]
    },
    {
      id:'EV-P3',
      eyebrow:'EVALUACIÓN 3 · VARIANTE',
      title:'Estado desconocido + isocórica + isotérmica',
      meta:'Acá no se entrega la temperatura inicial: hay que reconstruirla con PV = nRT y después decidir qué ecuación energética corresponde a cada tramo.',
      problems:[
        {
          id:'EV-P3-1',
          title:'Helio: calentamiento rígido y expansión isotérmica',
          statement:'0,75 mol de helio ideal ocupan 8,0 L a 2,0 atm. Primero se calientan a volumen constante hasta 400 K. Luego el gas se expande isotérmicamente a 400 K hasta que la presión cae a 1,0 atm.',
          parts:['Calcular T inicial, P al final del calentamiento y V final.', 'Calcular Q, L y ΔU en cada etapa.'],
          answer:'T1 ≈ 260 K. Después del calentamiento P2 ≈ 3,08 atm. Volumen final ≈ 24,62 L. Etapa isocórica: Q = ΔU ≈ +1,31 kJ. Etapa isotérmica: ΔU = 0, L ≈ −2,80 kJ y Q ≈ +2,80 kJ.',
          teacher:'La dificultad no está en la primera ley sino en ordenar los estados. Es buen ejercicio para obligar a calcular primero las variables de estado antes de entrar a Q, L y ΔU.',
          steps:[
            {title:'1 · Reconstruyo T1',text:'Conozco n, P y V.',formulas:[F('T_1=\\frac{P_1V_1}{nR}=\\frac{(2.0)(8.0)}{(0.75)(0.082057)}=259.98\\;\\mathrm{K}')]},
            {title:'2 · Calentamiento isocórico 1→2',text:'V es constante, por lo que P/T permanece constante.',formulas:[F('P_2=P_1\\frac{T_2}{T_1}=2.0\\frac{400}{259.98}=3.077\\;\\mathrm{atm}'),F('L_{12}=0')]},
            {title:'3 · Energía del helio en 1→2',text:'El helio es monoatómico, Cv = 3R/2.',formulas:[F('\\Delta U_{12}=nC_v(T_2-T_1)'),F('\\Delta U_{12}=(0.75)\\left(\\frac{3}{2}8.314\\right)(400-259.98)=1.310\\;\\mathrm{kJ}'),F('Q_{12}=+1.310\\;\\mathrm{kJ}')]},
            {title:'4 · Estado final de la isotérmica',text:'A 400 K y 1 atm obtengo el volumen final con gas ideal.',formulas:[F('V_3=\\frac{nRT}{P_3}=24.62\\;\\mathrm{L}')]},
            {title:'5 · Energías en 2→3',text:'En una isotérmica de gas ideal ΔU = 0. Como es expansión, L es negativo y el gas debe absorber calor para sostener T.',formulas:[F('\\Delta U_{23}=0'),F('L_{23}=-nRT\\ln\\left(\\frac{V_3}{V_2}\\right)=-2.804\\;\\mathrm{kJ}'),F('Q_{23}=+2.804\\;\\mathrm{kJ}')]}
          ]
        },
        {
          id:'EV-P3-2',
          title:'Verdadero o falso · isotérmicas e isocóricas',
          statement:'Indicar V o F y justificar.',
          parts:['En una transformación isotérmica de un gas ideal, ΔU = 0.', 'En una isotérmica, Q y L tienen el mismo signo.', 'A volumen constante, todo el calor intercambiado modifica la energía interna.'],
          answer:'a) V. b) F: Q = −L. c) V porque L = 0.',
          teacher:'La segunda afirmación detecta si el alumno entiende la convención de signos y no sólo memoriza “Q = L”.',
          steps:[
            {title:'a · Isotérmica ideal',text:'U depende de T; si T no cambia, ΔU tampoco.',formulas:[F('\\Delta T=0\\Rightarrow\\Delta U=0')]},
            {title:'b · Relación entre Q y L',text:'Al imponer ΔU = 0 en la primera ley, los términos deben cancelarse.',formulas:[F('0=Q+L\\Rightarrow Q=-L')]},
            {title:'c · Volumen constante',text:'Si ΔV = 0 no hay trabajo P–V.',formulas:[F('L=0\\Rightarrow\\Delta U=Q')]}
          ]
        },
        {
          id:'EV-P3-3',
          title:'Ciclo con una isotérmica reconocida por PV',
          statement:'Un gas ideal recorre A→B→C→A. A: P = 1 atm, V = 5 L. B: P = 2 atm, V = 5 L. C: P = 1 atm, V = 10 L. Calcular el calor neto del ciclo.',
          parts:['Detectar que BC es isotérmica sin que la consigna lo diga.', 'Determinar si el ciclo absorbe o libera calor.'],
          answer:'AB isocórica, BC isotérmica y CA isobárica. Ltotal ≈ −195,8 J, por lo tanto Qtotal ≈ +195,8 J: el gas recibe calor neto.',
          teacher:'El reconocimiento PV = constante evita inventar una transformación. Es el espejo conceptual del ciclo de la primera evaluación, pero con orden y sentido distintos.',
          steps:[
            {title:'1 · Reconozco cada tramo',text:'AB tiene V constante. En B y C, PV vale 10 L·atm: BC es isotérmica. C→A ocurre a 1 atm.',formulas:[F('P_BV_B=(2)(5)=10\\;\\mathrm{L\\,atm}'),F('P_CV_C=(1)(10)=10\\;\\mathrm{L\\,atm}')]},
            {title:'2 · Trabajos AB y BC',text:'AB no realiza trabajo. BC es expansión isotérmica.',formulas:[F('L_{AB}=0'),F('L_{BC}=-(10\\;\\mathrm{L\\,atm})\\ln(10/5)'),F('L_{BC}=-702.4\\;\\mathrm{J}')]},
            {title:'3 · Trabajo CA',text:'CA es una compresión isobárica de 10 L a 5 L.',formulas:[F('L_{CA}=-(1)(5-10)=+5\\;\\mathrm{L\\,atm}=+506.6\\;\\mathrm{J}')]},
            {title:'4 · Cierro el ciclo',text:'Sumo trabajos y uso ΔUciclo = 0.',formulas:[F('L_{tot}=-702.4+506.6=-195.8\\;\\mathrm{J}'),F('Q_{tot}=+195.8\\;\\mathrm{J}')]} 
          ]
        }
      ]
    },
    {
      id:'EV-P4',
      eyebrow:'EVALUACIÓN 4 · VARIANTE',
      title:'Compresión adiabática + enfriamiento isocórico',
      meta:'La cuarta cambia nuevamente el sentido físico: primero el entorno comprime y calienta al gas sin darle calor; después el sistema se enfría en un recipiente rígido.',
      problems:[
        {
          id:'EV-P4-1',
          title:'Oxígeno: compresión adiabática y enfriamiento rígido',
          statement:'Un mol de O₂ ideal está a 1,00 atm y 300 K. Se comprime reversible y adiabáticamente hasta que su volumen queda en el 60 % del volumen inicial. Luego se enfría a volumen constante hasta que la presión vuelve a 1,00 atm. Tomar γ = 1,40 y Cv = 5R/2.',
          parts:['Determinar V1, V2, T2, P2 y T3.', 'Calcular Q, L y ΔU en ambas etapas.', 'Explicar por qué volver a la presión inicial no significa volver al estado inicial.'],
          answer:'V1 ≈ 24,62 L, V2 ≈ 14,77 L, T2 ≈ 368,0 K, P2 ≈ 2,04 atm y T3 = 180 K. Adiabática: Q = 0 y L = ΔU ≈ +1,41 kJ. Isocórica: L = 0 y Q = ΔU ≈ −3,91 kJ.',
          teacher:'Es útil hacer una predicción de signos antes de calcular: compresión adiabática → T sube y L positivo; enfriamiento isocórico → Q y ΔU negativos.',
          steps:[
            {title:'1 · Volúmenes',text:'Calculo V1 por gas ideal y luego tomo el 60 %.',formulas:[F('V_1=\\frac{RT_1}{P_1}=24.62\\;\\mathrm{L}'),F('V_2=0.60V_1=14.77\\;\\mathrm{L}')]},
            {title:'2 · Estado 2 adiabático',text:'Uso TV^(γ−1) = constante y PV^γ = constante.',formulas:[F('T_2=T_1\\left(\\frac{V_1}{V_2}\\right)^{\\gamma-1}=300\\left(\\frac{1}{0.60}\\right)^{0.40}=368.01\\;\\mathrm{K}'),F('P_2=P_1\\left(\\frac{V_1}{V_2}\\right)^{\\gamma}=2.045\\;\\mathrm{atm}')]},
            {title:'3 · Energías en 1→2',text:'No entra ni sale calor; todo el aumento de U proviene del trabajo sobre el gas.',formulas:[F('Q_{12}=0'),F('\\Delta U_{12}=nC_v(T_2-T_1)=+1.414\\;\\mathrm{kJ}'),F('L_{12}=+1.414\\;\\mathrm{kJ}')]},
            {title:'4 · Estado 3 a volumen constante',text:'En el tramo 2→3 V no cambia. Al bajar de P2 a 1 atm, T baja en la misma proporción.',formulas:[F('T_3=T_2\\frac{P_3}{P_2}=180.0\\;\\mathrm{K}')]},
            {title:'5 · Energías en 2→3',text:'No hay trabajo de frontera. El gas pierde energía interna y cede calor.',formulas:[F('L_{23}=0'),F('\\Delta U_{23}=nC_v(T_3-T_2)=-3.908\\;\\mathrm{kJ}'),F('Q_{23}=-3.908\\;\\mathrm{kJ}')]},
            {title:'6 · ¿Volvió al estado inicial?',text:'No. Coincide la presión, pero el estado termodinámico necesita más de una variable independiente: V3 = V2 y T3 son distintos de V1 y T1.',formulas:[F('P_3=P_1'),F('V_3=0.60V_1\\neq V_1'),F('T_3=180\\;\\mathrm{K}\\neq300\\;\\mathrm{K}')]} 
          ]
        },
        {
          id:'EV-P4-2',
          title:'Verdadero o falso · estado y ciclo',
          statement:'Indicar V o F y justificar.',
          parts:['En una compresión adiabática de un gas ideal, L > 0 y ΔU > 0 con la convención usada.', 'Si la presión final coincide con la inicial, el sistema necesariamente volvió al mismo estado.', 'En cualquier ciclo completo, ΔUtotal = 0.'],
          answer:'a) V. b) F. c) V.',
          teacher:'El segundo ítem apunta a función de estado: una sola variable no alcanza para definir el estado de un gas simple.',
          steps:[
            {title:'a · Compresión adiabática',text:'El entorno hace trabajo sobre el gas y, como Q = 0, ese trabajo aumenta U.',formulas:[F('Q=0'),F('L>0\\Rightarrow\\Delta U=L>0')]},
            {title:'b · Misma presión no significa mismo estado',text:'Para fijar el estado hacen falta dos variables independientes; pueden cambiar V y T manteniendo P.',formulas:[F('PV=nRT')]},
            {title:'c · Ciclo',text:'Al final se vuelve exactamente al estado inicial, y U es función de estado.',formulas:[F('\\Delta U_{ciclo}=0')]}
          ]
        },
        {
          id:'EV-P4-3',
          title:'Camino oblicuo + retorno por dos tramos',
          statement:'Un gas pasa de A(4 L, 1 atm) a B(8 L, 3 atm) siguiendo una recta en el diagrama P–V. Luego vuelve a A mediante B→C a volumen constante hasta C(8 L, 1 atm) y C→A a presión constante. Calcular Q neto del ciclo.',
          parts:['Calcular el trabajo AB usando la presión media de una recta.', 'Comparar el resultado con el área geométrica encerrada.'],
          answer:'L_AB = −8 L·atm, L_BC = 0, L_CA = +4 L·atm. Ltotal = −4 L·atm ≈ −405 J, por lo tanto Qtotal ≈ +405 J.',
          teacher:'Este problema evita fórmulas de transformaciones “iso”. En un tramo recto P cambia linealmente, por eso la integral equivale a presión media por ΔV.',
          steps:[
            {title:'1 · Trabajo en la recta A→B',text:'Como P varía linealmente, la integral es el área de un trapecio: Pmedia por ΔV.',formulas:[F('P_{med}=\\frac{P_A+P_B}{2}=\\frac{1+3}{2}=2\\;\\mathrm{atm}'),F('L_{AB}=-P_{med}(V_B-V_A)=-(2)(8-4)=-8\\;\\mathrm{L\\,atm}')]},
            {title:'2 · B→C',text:'El volumen permanece en 8 L.',formulas:[F('L_{BC}=0')]},
            {title:'3 · C→A',text:'Compresión isobárica a 1 atm.',formulas:[F('L_{CA}=-(1)(4-8)=+4\\;\\mathrm{L\\,atm}')]},
            {title:'4 · Trabajo y calor netos',text:'El trabajo neto es el área triangular encerrada, con signo negativo porque el gas realiza trabajo neto.',formulas:[F('L_{tot}=-8+4=-4\\;\\mathrm{L\\,atm}'),F('L_{tot}=(-4)(101.325)=-405.3\\;\\mathrm{J}'),F('Q_{tot}=+405.3\\;\\mathrm{J}')]} 
          ]
        }
      ]
    }
  ];
})();