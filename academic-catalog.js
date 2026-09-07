// Catálogo académico 27xSOLved · 4.º, 5.º y 6.º año.
window.ET27_ACADEMIC_CATALOG = {
  version: 1,
  years: [
    {
      year: 4,
      subjects: [
        { id: 'quimica-general-4', name: 'Química General', kind: 'Materia', status: 'Disponible', letter: 'QG', href: './?view=chemistry', existing: true },
        { id: 'quimica-inorganica-4', name: 'Química Inorgánica', kind: 'Materia', status: 'Esqueleto listo', letter: 'QI', href: './materia.html?subject=quimica-inorganica-4' },
        { id: 'procesos-operaciones-4', name: 'Procesos y Operaciones Químicas', kind: 'Materia', status: 'Unidad 4 cargada', letter: 'PO', href: './materia.html?subject=procesos-operaciones-4' },
        { id: 'fisica-aplicada-4', name: 'Física Aplicada', kind: 'Materia', status: 'Disponible', letter: 'FA', href: './?view=physics', existing: true },
        { id: 'matematica-4', name: 'Matemática de 4.º', kind: 'Materia', status: 'Esqueleto listo', letter: 'M4', href: './materia.html?subject=matematica-4' },
        { id: 'tp-quimica-general-4', name: 'TP / Laboratorio de Química General', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-general-4' },
        { id: 'tp-quimica-inorganica-4', name: 'TP / Laboratorio de Química Inorgánica', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-inorganica-4' },
        { id: 'tp-procesos-operaciones-4', name: 'TP / Laboratorio de Procesos y Operaciones Químicas', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-procesos-operaciones-4' }
      ]
    },
    {
      year: 5,
      subjects: [
        { id: 'matematica-5', name: 'Matemática de 5.º', kind: 'Materia', status: 'Esqueleto listo', letter: 'M5', href: './materia.html?subject=matematica-5' },
        { id: 'quimica-analitica-cualitativa-5', name: 'Química Analítica Cualitativa', kind: 'Materia', status: 'Esqueleto listo', letter: 'AC', href: './materia.html?subject=quimica-analitica-cualitativa-5' },
        { id: 'quimica-organica-1', name: 'Química Orgánica I', kind: 'Materia', status: 'Esqueleto listo', letter: 'O1', href: './materia.html?subject=quimica-organica-1' },
        { id: 'industrial-1', name: 'Industrial I', kind: 'Materia', status: 'Esqueleto listo', letter: 'I1', href: './materia.html?subject=industrial-1' },
        { id: 'quimica-industrial-1', name: 'Química Industrial I', kind: 'Materia', status: 'Esqueleto listo', letter: 'QI', href: './materia.html?subject=quimica-industrial-1' },
        { id: 'tp-quimica-analitica-cualitativa-5', name: 'TP / Laboratorio de Química Analítica Cualitativa', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-analitica-cualitativa-5' },
        { id: 'tp-quimica-organica-1', name: 'TP / Laboratorio de Química Orgánica I', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-organica-1' },
        { id: 'tp-quimica-industrial-1', name: 'TP / Laboratorio de Química Industrial I', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-industrial-1' }
      ]
    },
    {
      year: 6,
      subjects: [
        { id: 'quimica-analitica-cuantitativa-6', name: 'Química Analítica Cuantitativa', kind: 'Materia', status: 'Esqueleto listo', letter: 'AC', href: './materia.html?subject=quimica-analitica-cuantitativa-6' },
        { id: 'quimica-organica-2', name: 'Química Orgánica II', kind: 'Materia', status: 'Esqueleto listo', letter: 'O2', href: './materia.html?subject=quimica-organica-2' },
        { id: 'industrial-2', name: 'Industrial II', kind: 'Materia', status: 'Esqueleto listo', letter: 'I2', href: './materia.html?subject=industrial-2' },
        { id: 'tp-quimica-analitica-cuantitativa-6', name: 'TP / Laboratorio de Química Analítica Cuantitativa', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-analitica-cuantitativa-6' },
        { id: 'tp-quimica-organica-2', name: 'TP / Laboratorio de Química Orgánica II', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-quimica-organica-2' },
        { id: 'tp-industrial-2', name: 'TP / Laboratorio de Industrial II', kind: 'TP / Laboratorio', status: 'Esqueleto listo', letter: 'TP', href: './materia.html?subject=tp-industrial-2' }
      ]
    }
  ],
  content: {
    'procesos-operaciones-4': {
      sourceLabel: 'Guía de ejercitación · Unidad 4',
      sourceNote: 'Primer principio de la Termodinámica — conservación de energía.',
      summary: {
        title: 'Unidad 4 · Primer principio de la Termodinámica',
        lead: 'La unidad relaciona la primera ley de la Termodinámica con la ecuación general de los gases ideales y organiza las transformaciones según qué parámetro permanece constante.',
        stateFunctions: 'La energía interna U es función de estado: depende de los estados inicial y final. El calor Q y el trabajo L no son funciones de estado.',
        transformations: [
          { name: 'Isobárica', rule: 'Presión constante', dU: 'n C_v \\Delta T', q: 'n C_p \\Delta T', l: '-P\\,\\Delta V' },
          { name: 'Isocórica', rule: 'Volumen constante', dU: 'n C_v \\Delta T', q: 'n C_v \\Delta T', l: '0' },
          { name: 'Isotérmica', rule: 'Temperatura constante', dU: '0', q: 'nRT\\ln\\left(\\frac{V_f}{V_i}\\right)', l: '-nRT\\ln\\left(\\frac{V_f}{V_i}\\right)' },
          { name: 'Adiabática', rule: 'No hay intercambio de calor', dU: 'n C_v \\Delta T', q: '0', l: 'n C_v \\Delta T' },
          { name: 'Ciclo completo', rule: 'El sistema vuelve al estado inicial', dU: '0', q: '\\sum Q', l: '\\sum L' }
        ]
      },
      formulas: [
        { label: 'Primera ley', latex: '\\Delta U = Q + L' },
        { label: 'Isobárica · trabajo', latex: 'L=-P\\,\\Delta V' },
        { label: 'Isobárica · calor', latex: 'Q=nC_p\\Delta T' },
        { label: 'Isocórica', latex: 'L=0\\qquad Q=nC_v\\Delta T' },
        { label: 'Isotérmica', latex: '\\Delta U=0' },
        { label: 'Isotérmica · calor', latex: 'Q=nRT\\ln\\left(\\frac{V_f}{V_i}\\right)' },
        { label: 'Isotérmica · trabajo', latex: 'L=-nRT\\ln\\left(\\frac{V_f}{V_i}\\right)' },
        { label: 'Adiabática', latex: 'Q=0\\qquad \\Delta U=L=nC_v\\Delta T' },
        { label: 'Ciclo', latex: '\\Delta U_{ciclo}=0' }
      ],
      exercises: [
        {
          n: 1,
          title: 'Expansión isobárica + evolución isocórica',
          statement: 'Un recipiente contiene 2 moles de nitrógeno gas a 4,05·10⁵ Pa de presión y un volumen de 0,02 m³. Se realiza una expansión isobárica hasta 0,03 m³ y luego se disminuye la presión hasta 3,04·10⁵ Pa a volumen constante.',
          parts: ['Realizar la gráfica del proceso p=f(v) y explicarlo.', 'Calcular trabajo total, calor total y variación de energía interna.']
        },
        {
          n: 2,
          title: 'Compresión isotérmica de metano',
          statement: 'Un recipiente contiene 32 g de gas metano ocupando 24 dm³ a 6 atm. Se realiza un proceso a temperatura constante hasta un volumen final de 8 dm³.',
          parts: ['Calcular la temperatura del proceso.', 'Realizar la gráfica p=f(v) y explicar el proceso.', 'Calcular calor, trabajo y variación de energía interna, justificando cada respuesta.']
        },
        {
          n: 3,
          title: 'Variación de energía interna en distintos procesos',
          statement: 'Calcular la variación de energía interna de un sistema que contiene un gas ideal en cada caso.',
          parts: ['El sistema absorbe 500 cal y realiza trabajo de 40 kgm.', 'El sistema libera 1500 cal a volumen constante.', 'El sistema se expande adiabáticamente realizando 0,5 kgm de trabajo.', 'El sistema se comprime isotérmicamente recibiendo 80 J de trabajo.', 'El sistema se comprime adiabáticamente recibiendo 100 J de trabajo.']
        },
        {
          n: 4,
          title: 'Recipiente rígido con nitrógeno',
          statement: 'Un recipiente rígido contiene 1 mol de gas nitrógeno que recibe lentamente 2,0 kcal de calor.',
          parts: ['¿Cuál es el cambio en la energía interna del gas?', '¿Aumenta o disminuye?']
        },
        {
          n: 5,
          title: 'Expansión isobárica de hidrógeno',
          statement: 'Un mol de hidrógeno gas en CNPT se expande isobáricamente a 2,5 veces su volumen inicial.',
          parts: ['¿Qué trabajo realiza el gas?', '¿El gas recibe o libera calor? ¿Cuánto?', '¿Cuál es la variación de energía interna del gas?']
        },
        {
          n: 6,
          title: 'Ciclo reversible A–B–C',
          statement: 'Un milimol de gas ideal monoatómico evoluciona cíclicamente y reversiblemente entre A, B y C. En AB: Pₐ=2 kPa y Vₐ=2 L; la presión aumenta isocóricamente hasta 6 kPa. BC es una expansión isotérmica hasta 6 L y CA es isobárica.',
          parts: ['Indicar V o F y justificar: la energía interna aumenta 8 J durante BC.', 'Indicar V o F y justificar: la energía interna disminuye 8 J durante BC.', 'Indicar V o F y justificar: el gas entrega 8 J de calor durante CAB.', 'Indicar V o F y justificar: el gas realiza un trabajo de 12 J durante CAB.'],
          diagram: 'pv-abc'
        },
        {
          n: 7,
          title: 'Evolución A–B–C–D con calor cedido',
          statement: 'Un sistema realiza una evolución con Pₐ=1,25 atm, Pᵦ=0,5 atm, P𝑐=0,5 atm, P𝑑=1,25 atm; Vₐ=Vᵦ=1 L y V𝑐=V𝑑=3,5 L, entregando 500 J en forma de calor.',
          parts: ['¿Cuánto varía la energía interna en esa evolución?', 'Si el sistema vuelve al estado inicial isobáricamente, ¿qué cantidad de calor intercambia con el entorno al volver?']
        },
        {
          n: 8,
          title: 'Intercambio de calor en un ciclo',
          statement: 'Un sistema gaseoso ideal evoluciona según tres transformaciones. Estado A: P=0,1 atm, V=5 L. Estado B: P=0,1 atm, V=10 L, T=500 K. Estado C: P=0,2 atm, V=5 L.',
          parts: ['Calcular el intercambio de calor en un ciclo, aclarando si es recibido o cedido por el sistema gaseoso.']
        },
        {
          n: 9,
          title: 'Ciclo con oxígeno gaseoso',
          statement: 'Tres moles de oxígeno gaseoso están a 3,5 atm ocupando 110 dm³. Se los lleva a presión constante a un volumen doble, luego a volumen constante se disminuye la presión a 1 atm y por último se vuelve al estado inicial mediante un proceso adiabático.',
          parts: ['Graficar presión en función del volumen.', '¿Se trata de un ciclo? Justificar.', 'Calcular ΔU, Q y L en cada etapa y los totales. Aclarar si son ganados o cedidos por el gas.']
        },
        {
          n: 10,
          title: 'Proceso entre dos estados',
          statement: 'Un sistema gaseoso pasa de un estado inicial V=6 L y P=1 atm a un estado final V=1 L y P=6 atm.',
          parts: ['Graficar presión en función del volumen.', 'Calcular trabajo, variación de energía interna y calor para el proceso.']
        }
      ]
    }
  }
};
