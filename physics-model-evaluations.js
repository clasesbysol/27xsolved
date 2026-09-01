// 27xSOLved · Física Aplicada — Evaluaciones modelo.
// Inyecta cuatro evaluaciones al final del libro de ejercicios.
// Alumno: consigna + respuesta final. Administrador: además, guion docente hiperdesarrollado.
(function(){
  'use strict';

  const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const M = latex => `<div class="adminFormula modelAdminFormula" data-model-math="${encodeURIComponent(latex)}"></div>`;
  const P = text => `<p>${text}</p>`;
  const H = (title,body) => `<section class="adminStep"><h4>${title}</h4>${body}</section>`;
  const NOTE = text => `<div class="adminNote">${text}</div>`;
  const SAY = text => `<div class="adminSay"><b>🗣 Cómo lo explicaría en clase</b><p>${text}</p></div>`;
  const CHECK = text => `<div class="adminCheck"><b>✓ Control final</b><p>${text}</p></div>`;
  const DATA = rows => `<div class="adminData">${rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  const GUIDE = (intro,sections,say,check) => `<div class="adminGuideBody"><div class="adminIntro">${intro}</div>${sections.join('')}${check?CHECK(check):''}${say?SAY(say):''}</div>`;

  const evaluations = [
    {
      id:'EV1',
      eyebrow:'EVALUACIÓN MODELO 1 · ORIGINAL',
      title:'Tensión superficial',
      meta:'Transcripción de la primera evaluación fotografiada.',
      note:'Se conserva la consigna original. En el problema 1 el perfil estaba dibujado en el pizarrón y no aparece en la foto. En el problema 3 se reconstruye la altura de referencia del agua con el mismo gráfico de la guía de cátedra: 6 mm.',
      problems:[
        {
          key:'EV1.1',
          title:'Chapa de aluminio sostenida por tensión superficial',
          statement:'Sea el perfil expuesto en el pizarrón, calcule el espesor máximo que puede tener una chapa de aluminio con ese perfil para mantenerse en equilibrio sobre la superficie del agua por fuerzas de tensión superficial. Datos: δaluminio = 2,7 kg/dm³; γagua = 72,8 dina/cm.',
          answer:'eₘₐₓ = γ·Lef/(ρ·A·g). Con los datos: eₘₐₓ = 0,02751·(Lef/A) cm. Falta la geometría del perfil para obtener un número único.'
        },
        {
          key:'EV1.2',
          title:'Cuentagotas con propagación de error',
          statement:'Se mide la tensión superficial con el método de cuentagotas, para un líquido de densidad (0,85 ± 0,3) g/cm³. Se cuentan 45 gotas de agua, y 90 de líquido. Hallar la tensión superficial del líquido. La densidad del agua y su tensión superficial son conocidas, pero a la densidad se le contempla un error del 5%.',
          answer:'γliq = 30,94 dina/cm. Tomando literalmente Δρliq = 0,30 g/cm³ y 5% para ρagua: γliq ≈ (30,9 ± 12,5) dina/cm.'
        },
        {
          key:'EV1.3',
          title:'Capilaridad: hallar la tensión superficial',
          statement:'Los capilares de la figura poseen el mismo radio e igual ángulo de contacto (θ₁ = θ₂). Suponga que el líquido incógnita alcanzó una altura de 9,3 mm, encuentre su tensión superficial con su error. Datos: γagua = 72,8 dina/cm; δliq = 1300 kg/m³.',
          answer:'Usando hagua = 6 mm del gráfico de la guía: γliq ≈ 146,7 dina/cm. El error queda sujeto a las incertidumbres de alturas/densidades que indique la figura original.'
        }
      ]
    },
    {
      id:'EV2',
      eyebrow:'EVALUACIÓN MODELO 2 · ORIGINAL',
      title:'Estática de fluidos y tensiómetro',
      meta:'Transcripción de la tercera evaluación fotografiada.',
      problems:[
        {
          key:'EV2.1',
          title:'Densidad con picnómetro',
          statement:'Se determina la densidad de un líquido con picnómetro. La masa del picnómetro vacío = 8,987 g, lleno con agua destilada tiene una masa = 58,767 g y lleno con el líquido incógnita = 62,522 g. ¿Cuál es su densidad? Explicar el desarrollo matemático.',
          answer:'ρliq = (62,522 − 8,987)/(58,767 − 8,987) = 1,0754 g/cm³ ≈ 1,075 g/cm³.'
        },
        {
          key:'EV2.2',
          title:'Balanza de Mohr y principio de Arquímedes',
          statement:'Se buscó de forma experimental con balanza de Mohr las densidades de las siguientes soluciones: sulfato cúprico 10% m/m δ = 1,095 g/cm³ y 15% m/m δ = 1,125 g/cm³. Por medio del principio de Arquímedes, realizar la justificación teórica y matemática, e indicar qué jinetillos y cómo fueron utilizados.',
          answer:'La balanza compensa el momento del empuje E = ρgV. Lecturas: 1,095 = 1,000 + 0,090 + 0,005; 1,125 = 1,000 + 0,100 + 0,020 + 0,005, según la escala decimal habitual de los jinetillos.'
        },
        {
          key:'EV2.3',
          title:'Du Noüy calibrado en divisiones',
          statement:'Se desea hallar la tensión superficial de las soluciones del ejercicio 2, para ello se utilizó un tensiómetro de Du Noüy el cual dio 77 y 84 divisiones respectivamente para cada solución. El mismo instrumento se calibró con una pesa fraccionada de 200 mg dando una división de referencia de 24. Calcular la tensión superficial de ambas soluciones. Dato: R. Anillo 0,72 cm.',
          answer:'γ10% ≈ 69,5 dina/cm; γ15% ≈ 75,8 dina/cm.'
        }
      ]
    },
    {
      id:'EV3',
      eyebrow:'EVALUACIÓN ESPEJO A',
      title:'Tensión superficial · práctica equivalente',
      meta:'Mismas competencias que la evaluación original, con mecanismos y datos distintos.',
      problems:[
        {
          key:'EV3.1',
          title:'Placa perforada de aluminio',
          statement:'Una placa cuadrada de aluminio de 3,0 cm de lado posee un orificio circular central de radio 0,60 cm. Se deposita horizontalmente sobre agua. Calcular el espesor máximo ideal para que pueda permanecer sostenida por tensión superficial. Datos: ρAl = 2,70 g/cm³; γagua = 72,8 dina/cm; g = 980 cm/s².',
          answer:'eₘₐₓ ≈ 0,05514 cm ≈ 0,551 mm.'
        },
        {
          key:'EV3.2',
          title:'Cuentagotas con incertidumbre',
          statement:'Con el mismo cuentagotas y el mismo volumen total se obtienen 40 gotas de agua y 64 gotas de un líquido de densidad (0,92 ± 0,02) g/cm³. Tomar γagua = 72,8 dina/cm, ρagua = 1,00 g/cm³ y un error relativo del 1% en ρagua. Hallar γ del líquido e informar la incertidumbre máxima debida a las densidades.',
          answer:'γliq = 41,86 dina/cm; Δγ ≈ 1,33 dina/cm; γliq ≈ (41,9 ± 1,3) dina/cm.'
        },
        {
          key:'EV3.3',
          title:'Comparación capilar',
          statement:'Dos capilares tienen el mismo radio y el mismo ángulo de contacto. El agua asciende 5,5 mm. Un líquido de densidad 1,15 g/cm³ asciende 8,2 mm. Si γagua = 72,8 dina/cm, hallar la tensión superficial del líquido.',
          answer:'γliq ≈ 124,8 dina/cm.'
        }
      ]
    },
    {
      id:'EV4',
      eyebrow:'EVALUACIÓN ESPEJO B',
      title:'Picnómetro, Mohr y Du Noüy · práctica equivalente',
      meta:'Versión paralela de laboratorio para practicar exactamente las mismas decisiones físicas.',
      problems:[
        {
          key:'EV4.1',
          title:'Picnómetro: cociente de masas netas',
          statement:'Un picnómetro vacío tiene una masa de 12,420 g. Lleno con agua destilada marca 62,100 g y lleno con un líquido incógnita marca 59,876 g. Tomando ρagua = 1,000 g/cm³, calcular la densidad del líquido.',
          answer:'ρliq ≈ 0,9552 g/cm³.'
        },
        {
          key:'EV4.2',
          title:'Mohr: lectura decimal de dos soluciones',
          statement:'En una balanza de Mohr se obtienen densidades 1,083 g/cm³ y 1,117 g/cm³ para dos soluciones. Justificar mediante Arquímedes por qué la posición de los jinetillos permite medir densidad e indicar una combinación decimal de jinetillos para cada lectura.',
          answer:'1,083 = 1,000 + 0,080 + 0,003; 1,117 = 1,000 + 0,100 + 0,010 + 0,007.'
        },
        {
          key:'EV4.3',
          title:'Du Noüy: calibrar y medir',
          statement:'Un tensiómetro de Du Noüy se calibra con una pesa de 250 mg que produce 30 divisiones. Dos líquidos producen 68 y 73 divisiones. El radio medio del anillo es 0,70 cm. Despreciando factores de corrección, hallar la tensión superficial de ambos líquidos.',
          answer:'γ1 ≈ 63,1 dina/cm; γ2 ≈ 67,8 dina/cm.'
        }
      ]
    }
  ];

  const guides = {};

  guides['EV1.1'] = GUIDE(
    '<b>Idea central:</b> este ejercicio no se resuelve memorizando una fórmula de una chapa concreta. Primero se arma el equilibrio general entre peso y tensión superficial, y recién después se mete la geometría del perfil. La foto no conserva ese dibujo, así que hay que ser explícitos y no inventarlo.',
    [
      H('1. Qué significa “espesor máximo”',
        P('Mientras la chapa está en equilibrio, la superficie del agua aporta una fuerza vertical capaz de sostenerla. Si aumentamos el espesor, aumenta la masa y por lo tanto el peso. El espesor máximo es el valor límite en el que ambas fuerzas quedan exactamente iguales.')+
        M(String.raw`F_{\gamma}=P`)),
      H('2. Unifico unidades en CGS',
        DATA([['Densidad del aluminio','ρ = 2,7 kg/dm³ = 2,7 g/cm³'],['Tensión superficial','γ = 72,8 dyn/cm'],['Gravedad','g = 980 cm/s²'],['Área del perfil','A, en cm²'],['Longitud efectiva de contacto','L_{ef}, en cm']])+
        NOTE('El perfil dibujado en el pizarrón determina A y Lₑf. Si tiene agujeros, el borde de cada agujero puede sumar longitud de contacto mientras su área se resta del material que pesa.')),
      H('3. Expreso el peso de la chapa',
        P('Si el área vista desde arriba es A y el espesor es e, el volumen es:')+
        M(String.raw`V=Ae`)+
        P('La masa vale densidad por volumen:')+
        M(String.raw`m=\rho Ae`)+
        P('Entonces el peso es:')+
        M(String.raw`P=\rho Aeg`)),
      H('4. Expreso la fuerza de tensión superficial',
        P('La tensión superficial es fuerza por unidad de longitud. En el modelo ideal del ejercicio, toda la longitud efectiva aporta su componente vertical máxima:')+
        M(String.raw`F_{\gamma}=\gamma L_{ef}`)),
      H('5. Impongo el equilibrio límite',
        M(String.raw`\rho Aeg=\gamma L_{ef}`)+
        P('Despejo el espesor:')+
        M(String.raw`e_{\max}=\frac{\gamma L_{ef}}{\rho Ag}`)),
      H('6. Sustituyo solamente los datos que sí aparecen',
        M(String.raw`e_{\max}=\frac{72.8\,L_{ef}}{(2.7)(980)A}\;\text{cm}`)+
        M(String.raw`e_{\max}=0.02751\,\frac{L_{ef}}{A}\;\text{cm}`)),
      H('7. Qué falta para cerrar el número',
        P('Falta leer del perfil del pizarrón el área A y la longitud total de contacto Lₑf. Sin esos dos datos no existe un resultado numérico único. Ésta es una limitación de la fotografía, no del método.'))
    ],
    '“Yo arrancaría diciendo: no me importa todavía qué forma tiene la chapa. El peso depende de cuánto material hay, o sea del área por el espesor. La tensión superficial, en cambio, sostiene por borde. Entonces escribo peso igual a tensión por longitud. Recién después miro el dibujo y calculo área y perímetro. Si no tengo el dibujo, puedo dejar perfectamente planteada la respuesta general, pero no debo inventar un número.”',
    'La dependencia tiene sentido: más tensión superficial permite mayor espesor; más densidad o más área para el mismo borde hacen que el espesor admisible disminuya.'
  );

  guides['EV1.2'] = GUIDE(
    '<b>Idea central:</b> en el método del cuentagotas comparamos el peso medio de una gota de dos líquidos usando el mismo gotero. El número de gotas aparece en el denominador porque, para el mismo volumen total, más gotas significa gotas más pequeñas.',
    [
      H('1. Ordeno los datos',
        DATA([['Líquido incógnita','ρₓ = (0,85 ± 0,30) g/cm³'],['Agua','ρₐ = 1,00 g/cm³'],['Agua','γₐ = 72,8 dyn/cm'],['Número de gotas de agua','nₐ = 45'],['Número de gotas del líquido','nₓ = 90'],['Error relativo de ρagua','5%']])),
      H('2. Derivo la relación para no memorizarla a ciegas',
        P('Si ambos ensayos descargan el mismo volumen total V, el volumen de una gota es V/n. La masa media de una gota es:')+
        M(String.raw`m_g=\rho\frac{V}{n}`)+
        P('En el mismo gotero, la fuerza de desprendimiento es proporcional a γ. Por comparación:')+
        M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{m_{g,x}}{m_{g,a}}`)+
        M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{\rho_x V/n_x}{\rho_a V/n_a}`)+
        P('Se cancela V:')+
        M(String.raw`\gamma_x=\gamma_a\frac{\rho_x n_a}{\rho_a n_x}`)),
      H('3. Calculo el valor central',
        M(String.raw`\gamma_x=72.8\frac{(0.85)(45)}{(1.00)(90)}`)+
        M(String.raw`\gamma_x=30.94\;\text{dyn/cm}`)),
      H('4. Paso las incertidumbres a errores relativos',
        P('Tomando literalmente la impresión de la evaluación:')+
        M(String.raw`\frac{\Delta\rho_x}{\rho_x}=\frac{0.30}{0.85}=0.3529`)+
        M(String.raw`\frac{\Delta\rho_a}{\rho_a}=0.05`)),
      H('5. Propagación conservadora',
        P('Para un producto/cociente, la estimación máxima suma errores relativos:')+
        M(String.raw`\frac{\Delta\gamma_x}{\gamma_x}\approx0.3529+0.05=0.4029`)+
        M(String.raw`\Delta\gamma_x=(30.94)(0.4029)=12.47\;\text{dyn/cm}`)),
      H('6. Resultado',
        M(String.raw`\boxed{\gamma_x=(30.9\pm12.5)\;\text{dyn/cm}}`)+
        NOTE('El ±0,30 g/cm³ representa un 35% de incertidumbre y por eso el error final es enorme. Si el original hubiese querido decir ±0,03, el resultado de incertidumbre cambiaría mucho. No conviene corregirlo silenciosamente.'))
    ],
    '“Primero explico por qué aparecen las gotas: si el mismo volumen se reparte en 90 gotas, cada gota pesa menos que si se repartiera en 45. Como la gota se desprende cuando su peso vence a la tensión superficial del mismo borde, puedo comparar ambos ensayos. Después hago el cálculo central y recién al final trato el error.”',
    'El valor central debe ser menor que el del agua: el líquido tiene menor densidad y además produce más gotas. El resultado 30,94 dyn/cm cumple esa intuición.'
  );

  guides['EV1.3'] = GUIDE(
    '<b>Idea central:</b> para capilares con el mismo radio y el mismo ángulo de contacto, todos los factores geométricos se cancelan al comparar los líquidos. Queda una relación muy simple entre h, γ y ρ.',
    [
      H('1. Parto de la ley de Jurin',
        M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Escribo una ecuación para cada líquido',
        M(String.raw`h_a=\frac{2\gamma_a\cos\theta}{\rho_a gr}`)+
        M(String.raw`h_x=\frac{2\gamma_x\cos\theta}{\rho_x gr}`)),
      H('3. Divido las ecuaciones',
        P('Como r y θ son iguales, y g obviamente también, se cancelan:')+
        M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)+
        P('Despejo γₓ:')+
        M(String.raw`\gamma_x=\gamma_a\frac{h_x\rho_x}{h_a\rho_a}`)),
      H('4. Datos reconstruidos',
        DATA([['Altura del líquido','hₓ = 9,3 mm'],['Altura de agua de la figura de la guía','hₐ = 6,0 mm'],['Densidad del líquido','ρₓ = 1300 kg/m³'],['Densidad del agua','ρₐ = 1000 kg/m³'],['Tensión del agua','γₐ = 72,8 dyn/cm']])+
        NOTE('La foto de la evaluación corta la figura. Se usa hₐ = 6 mm porque es el mismo gráfico de capilares empleado en la guía de la cátedra, de donde sale el ejercicio base 4.8/4.9.')),
      H('5. Sustituyo',
        M(String.raw`\gamma_x=72.8\frac{(9.3)(1300)}{(6.0)(1000)}`)+
        M(String.raw`\gamma_x=146.692\;\text{dyn/cm}`)),
      H('6. Resultado',
        M(String.raw`\boxed{\gamma_x\approx146.7\;\text{dyn/cm}}`)+
        P('Para calcular “su error” hacen falta las incertidumbres de h y/o ρ de la figura original. Como no están visibles en la fotografía, no corresponde inventarlas.'))
    ],
    '“La ventaja de comparar dos capilares iguales es que me saco de encima el radio, el coseno del ángulo y la gravedad. Me queda que h es proporcional a γ/ρ. Entonces despejo la tensión del líquido y trabajo todo como una razón; por eso incluso puedo dejar las alturas en milímetros en ambos lados.”',
    'Como el líquido es más denso que el agua pero alcanza una altura todavía mayor, su tensión superficial debe resultar considerablemente mayor que 72,8 dyn/cm. 146,7 dyn/cm es coherente con esa tendencia.'
  );

  guides['EV2.1'] = GUIDE(
    '<b>Idea central:</b> el picnómetro permite comparar masas de dos líquidos ocupando exactamente el mismo volumen. La masa del frasco se resta siempre; después el cociente de masas netas es el cociente de densidades.',
    [
      H('1. Datos',
        DATA([['Picnómetro vacío','m₀ = 8,987 g'],['Picnómetro + agua','mₐ = 58,767 g'],['Picnómetro + líquido','mₓ = 62,522 g'],['Agua','ρₐ = 1,000 g/cm³']])),
      H('2. Masa de agua realmente contenida',
        M(String.raw`m_{agua}=58.767-8.987`)+
        M(String.raw`m_{agua}=49.780\;\text{g}`)),
      H('3. Volumen del picnómetro',
        P('Como el agua tiene densidad 1 g/cm³:')+
        M(String.raw`V=\frac{m_{agua}}{\rho_{agua}}`)+
        M(String.raw`V=\frac{49.780}{1.000}=49.780\;\text{cm}^3`)),
      H('4. Masa del líquido incógnita',
        M(String.raw`m_x=62.522-8.987`)+
        M(String.raw`m_x=53.535\;\text{g}`)),
      H('5. Densidad',
        M(String.raw`\rho_x=\frac{m_x}{V}`)+
        M(String.raw`\rho_x=\frac{53.535}{49.780}`)+
        M(String.raw`\rho_x=1.07543\;\text{g/cm}^3`)),
      H('6. Forma corta equivalente',
        P('Como el volumen es el mismo en ambos llenados:')+
        M(String.raw`\rho_x=\rho_a\frac{m_x}{m_a}`)+
        M(String.raw`\rho_x=1.000\frac{62.522-8.987}{58.767-8.987}`)),
      H('7. Resultado',
        M(String.raw`\boxed{\rho_x\approx1.075\;\text{g/cm}^3}`))
    ],
    '“Lo más importante del picnómetro es entender qué cancela: el recipiente tiene el mismo volumen cuando lo lleno hasta la marca. Primero le saco la masa del frasco a las dos lecturas. Con el agua puedo obtener el volumen, o directamente comparar las masas netas.”',
    'El líquido incógnita pesa 53,535 g en el mismo volumen donde el agua pesa 49,780 g; necesariamente su densidad debe ser mayor que 1. El resultado 1,075 g/cm³ cumple eso.'
  );

  guides['EV2.2'] = GUIDE(
    '<b>Idea central:</b> la balanza de Mohr no “pesa el líquido”. Mide el empuje que el líquido ejerce sobre un inmersor de volumen fijo. Como E = ρgV y g,V permanecen constantes, el empuje es directamente proporcional a la densidad.',
    [
      H('1. Principio de Arquímedes',
        M(String.raw`E=\rho_{liq}\,g\,V_{desalojado}`)+
        P('El inmersor se introduce siempre hasta la misma condición, de modo que V desalojado es fijo.')),
      H('2. Qué hace la balanza',
        P('El empuje genera un momento que desequilibra el brazo. Los jinetillos se colocan a distintas distancias del punto de apoyo hasta producir un momento opuesto igual:')+
        M(String.raw`E\,d=\sum_i m_i g x_i`)+
        P('La escala está diseñada para que la combinación de masas y posiciones se lea directamente como densidad relativa.')),
      H('3. Solución de CuSO₄ al 10% m/m',
        P('La lectura pedida es 1,095 g/cm³. La descompongo decimalmente:')+
        M(String.raw`1.095=1.000+0.090+0.005`)+
        P('En la escala decimal habitual: un aporte unidad; un jinetillo de centésimas en posición 9 para 0,090; y el siguiente aporte milésimo en posición 5 para 0,005.')),
      H('4. Solución de CuSO₄ al 15% m/m',
        M(String.raw`1.125=1.000+0.100+0.020+0.005`)+
        P('Se arma la combinación correspondiente a 1,000; 0,100; 0,020 y 0,005.')),
      H('5. Qué debe quedar claro al explicar',
        NOTE('El nombre exacto o el tamaño físico de cada jinetillo puede variar según el modelo de balanza. Lo universal es la lectura decimal y el equilibrio de momentos. Por eso conviene explicar primero 1,095 = 1 + 0,09 + 0,005 y luego señalar las posiciones en el aparato real.'))
    ],
    '“Yo no empezaría nombrando jinetillos. Empezaría con Arquímedes: el cuerpo sumergido recibe un empuje proporcional a la densidad. Ese empuje hace torque sobre la balanza. Los jinetillos hacen el torque contrario. Como el aparato ya está calibrado, la suma decimal de sus posiciones me da directamente la densidad. Recién ahí muestro cómo construyo 1,095 y 1,125.”',
    'La solución al 15% debe resultar más densa que la del 10%, y efectivamente 1,125 > 1,095.'
  );

  guides['EV2.3'] = GUIDE(
    '<b>Idea central:</b> hay dos conversiones encadenadas: divisiones del aparato → fuerza, y fuerza → tensión superficial. Si se salta la calibración, las divisiones no tienen significado físico.',
    [
      H('1. Calibración con la pesa',
        DATA([['Masa patrón','m = 200 mg = 0,200 g'],['Lectura patrón','Nref = 24 divisiones'],['g','980 cm/s²'],['Radio del anillo','R = 0,72 cm']])+
        M(String.raw`F_{ref}=mg`)+
        M(String.raw`F_{ref}=(0.200)(980)=196\;\text{dyn}`)),
      H('2. Constante del instrumento',
        M(String.raw`k=\frac{F_{ref}}{N_{ref}}`)+
        M(String.raw`k=\frac{196}{24}=8.1667\;\frac{\text{dyn}}{\text{div}}`)),
      H('3. Fuerza para la solución al 10%',
        M(String.raw`F_1=kN_1`)+
        M(String.raw`F_1=(8.1667)(77)=628.83\;\text{dyn}`)),
      H('4. Fuerza para la solución al 15%',
        M(String.raw`F_2=kN_2`)+
        M(String.raw`F_2=(8.1667)(84)=686.00\;\text{dyn}`)),
      H('5. Longitud efectiva del anillo',
        P('Un anillo delgado tiene una línea de contacto interior y otra exterior. Usando el radio medio R:')+
        M(String.raw`L\approx4\pi R`)+
        M(String.raw`F=\gamma L=4\pi R\gamma`)+
        P('Por lo tanto:')+
        M(String.raw`\gamma=\frac{F}{4\pi R}`)),
      H('6. Primera tensión superficial',
        M(String.raw`\gamma_1=\frac{628.83}{4\pi(0.72)}`)+
        M(String.raw`\gamma_1=69.50\;\text{dyn/cm}`)),
      H('7. Segunda tensión superficial',
        M(String.raw`\gamma_2=\frac{686.00}{4\pi(0.72)}`)+
        M(String.raw`\gamma_2=75.82\;\text{dyn/cm}`)),
      H('8. Resultado',
        M(String.raw`\boxed{\gamma_{10\%}\approx69.5\;\text{dyn/cm}}`)+
        M(String.raw`\boxed{\gamma_{15\%}\approx75.8\;\text{dyn/cm}}`))
    ],
    '“Primero pregunto: ¿qué significa una división? Nada todavía. Le doy significado calibrando con una fuerza conocida. Como 200 mg pesan 196 dinas y eso son 24 divisiones, cada división vale 8,17 dinas. Después convierto 77 y 84 divisiones en fuerzas. Recién al final uso la geometría del anillo para convertir fuerza en tensión superficial.”',
    'La solución que marca más divisiones exige mayor fuerza de despegue y por lo tanto debe tener mayor γ. 84 divisiones produce 75,8 dyn/cm, mayor que 69,5 dyn/cm de 77 divisiones.'
  );

  guides['EV3.1'] = GUIDE(
    '<b>Idea central:</b> este espejo obliga a distinguir dos geometrías distintas: el área de material determina el peso y todos los contornos mojados determinan la fuerza de tensión superficial.',
    [
      H('1. Ecuación de equilibrio límite',
        M(String.raw`\rho Aeg=\gamma P`)+
        M(String.raw`e_{\max}=\frac{\gamma P}{\rho Ag}`)),
      H('2. Perímetro total de contacto',
        P('Contorno exterior del cuadrado:')+
        M(String.raw`P_{ext}=4(3.0)=12.0\;\text{cm}`)+
        P('Contorno del agujero:')+
        M(String.raw`P_{int}=2\pi(0.60)=1.20\pi\;\text{cm}`)+
        M(String.raw`P=12+1.20\pi=15.7699\;\text{cm}`)),
      H('3. Área de material',
        M(String.raw`A=(3.0)^2-\pi(0.60)^2`)+
        M(String.raw`A=9-0.36\pi=7.8690\;\text{cm}^2`)),
      H('4. Sustitución',
        M(String.raw`e_{\max}=\frac{(72.8)(15.7699)}{(2.70)(7.8690)(980)}`)+
        M(String.raw`e_{\max}=0.05514\;\text{cm}`)+
        M(String.raw`e_{\max}=0.551\;\text{mm}`)),
      H('5. Resultado',
        M(String.raw`\boxed{e_{\max}\approx0.551\;\text{mm}}`))
    ],
    '“Hago dos cuentas geométricas separadas. Para la fuerza superficial sumo bordes: borde cuadrado más borde del agujero. Para el peso cuento material: área del cuadrado menos el agujero. Esa separación evita casi todos los errores de este tipo.”',
    'El agujero aumenta la relación perímetro/área: agrega borde y quita material. Por eso puede aumentar el espesor que la superficie logra sostener.'
  );

  guides['EV3.2'] = GUIDE(
    '<b>Idea central:</b> mismo método de cuentagotas, pero ahora la incertidumbre está planteada de forma razonable y se pide explícitamente separar valor central de incertidumbre.',
    [
      H('1. Relación del cuentagotas',
        M(String.raw`\gamma_x=\gamma_a\frac{\rho_xn_a}{\rho_an_x}`)),
      H('2. Valor central',
        M(String.raw`\gamma_x=72.8\frac{(0.92)(40)}{(1.00)(64)}`)+
        M(String.raw`\gamma_x=41.86\;\text{dyn/cm}`)),
      H('3. Errores relativos de densidad',
        M(String.raw`e_{\rho_x}=\frac{0.02}{0.92}=0.021739`)+
        M(String.raw`e_{\rho_a}=0.010000`)),
      H('4. Error relativo máximo de γ',
        M(String.raw`e_\gamma\approx0.021739+0.010000=0.031739`)),
      H('5. Error absoluto',
        M(String.raw`\Delta\gamma=(41.86)(0.031739)=1.3286\;\text{dyn/cm}`)),
      H('6. Resultado',
        M(String.raw`\boxed{\gamma_x\approx(41.9\pm1.3)\;\text{dyn/cm}}`))
    ],
    '“Primero saco la tensión superficial como si los datos fueran exactos. Después pregunto cuánto se mueve ese resultado por las densidades. Como γ tiene ρx multiplicando y ρagua dividiendo, en una estimación conservadora sumo sus errores relativos.”',
    'El error relativo total es aproximadamente 3,17%; el 3,17% de 41,86 es cerca de 1,33. El orden de magnitud cierra.'
  );

  guides['EV3.3'] = GUIDE(
    '<b>Idea central:</b> al comparar capilares idénticos, hρ/γ debe permanecer constante.',
    [
      H('1. Relación comparativa',
        M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)),
      H('2. Despejo γx',
        M(String.raw`\gamma_x=\gamma_a\frac{h_x\rho_x}{h_a\rho_a}`)),
      H('3. Sustituyo',
        M(String.raw`\gamma_x=72.8\frac{(8.2)(1.15)}{(5.5)(1.00)}`)),
      H('4. Calculo',
        M(String.raw`\gamma_x=124.819\;\text{dyn/cm}`)),
      H('5. Resultado',
        M(String.raw`\boxed{\gamma_x\approx124.8\;\text{dyn/cm}}`))
    ],
    '“No necesito saber el radio del capilar ni el ángulo porque son iguales en los dos. Divido las dos ecuaciones de Jurin y todo eso desaparece. Me queda una comparación limpia entre altura, densidad y tensión superficial.”',
    'El líquido sube más que el agua pese a ser más denso; por eso necesariamente necesita una γ mayor. El resultado es mayor que 72,8 dyn/cm.'
  );

  guides['EV4.1'] = GUIDE(
    '<b>Idea central:</b> el volumen del picnómetro se elimina comparando las masas netas. Es una buena oportunidad para enseñar el “atajo” después de haber entendido el método largo.',
    [
      H('1. Masas netas',
        M(String.raw`m_a=62.100-12.420=49.680\;\text{g}`)+
        M(String.raw`m_x=59.876-12.420=47.456\;\text{g}`)),
      H('2. Relación de densidades',
        P('Ambos líquidos ocupan el mismo volumen:')+
        M(String.raw`\frac{\rho_x}{\rho_a}=\frac{m_x}{m_a}`)),
      H('3. Sustitución',
        M(String.raw`\rho_x=(1.000)\frac{47.456}{49.680}`)+
        M(String.raw`\rho_x=0.95523\;\text{g/cm}^3`)),
      H('4. Resultado',
        M(String.raw`\boxed{\rho_x\approx0.9552\;\text{g/cm}^3}`))
    ],
    '“Al frasco lo resto en las dos mediciones. Después tengo dos masas de líquidos que ocuparon exactamente el mismo volumen. Si uno pesa menos en ese mismo volumen, su densidad es menor. El cociente de masas netas ya me da el cociente de densidades.”',
    '47,456 g es menor que 49,680 g para el mismo volumen, por eso la densidad tiene que ser menor que 1. El resultado 0,9552 es coherente.'
  );

  guides['EV4.2'] = GUIDE(
    '<b>Idea central:</b> practicar la traducción entre una lectura decimal y una combinación de jinetillos sin perder de vista que detrás de la escala está el empuje de Arquímedes.',
    [
      H('1. Fundamento',
        M(String.raw`E=\rho gV`)+
        P('Como V y g son constantes, una mayor densidad genera mayor empuje y mayor momento a compensar.')),
      H('2. Equilibrio de momentos',
        M(String.raw`E\,d=\sum_i m_i g x_i`)+
        P('Las masas y posiciones de los jinetillos están calibradas para traducir esa compensación directamente a cifras decimales de densidad.')),
      H('3. Primera lectura',
        M(String.raw`1.083=1.000+0.080+0.003`)+
        P('Construyo un aporte unidad, un aporte de 0,08 y un aporte de 0,003.')),
      H('4. Segunda lectura',
        M(String.raw`1.117=1.000+0.100+0.010+0.007`)+
        P('Construyo aportes 1,000; 0,100; 0,010 y 0,007.')),
      H('5. Aclaración instrumental',
        NOTE('En clase conviene señalar físicamente qué jinetillo corresponde a cada orden decimal en la balanza concreta del laboratorio; algunos modelos distribuyen los jinetillos de manera diferente, pero la suma decimal de la lectura no cambia.'))
    ],
    '“La balanza está haciendo una traducción de torque a densidad. Yo leo 1,083 y lo pienso como 1 + 8 centésimas + 3 milésimas. Después pongo los jinetillos que generan exactamente esos aportes. Lo mismo con 1,117.”',
    'La segunda solución debe exigir una compensación ligeramente mayor porque su densidad 1,117 es mayor que 1,083.'
  );

  guides['EV4.3'] = GUIDE(
    '<b>Idea central:</b> repetir la cadena de calibración completa con números nuevos para verificar que se comprendió el método y no se memorizó el resultado anterior.',
    [
      H('1. Fuerza patrón',
        M(String.raw`m=250\;\text{mg}=0.250\;\text{g}`)+
        M(String.raw`F_{ref}=mg=(0.250)(980)=245\;\text{dyn}`)),
      H('2. Constante de calibración',
        M(String.raw`k=\frac{245}{30}=8.1667\;\frac{\text{dyn}}{\text{div}}`)),
      H('3. Fuerza del primer líquido',
        M(String.raw`F_1=(8.1667)(68)=555.33\;\text{dyn}`)),
      H('4. Fuerza del segundo líquido',
        M(String.raw`F_2=(8.1667)(73)=596.17\;\text{dyn}`)),
      H('5. Ecuación de Du Noüy ideal',
        M(String.raw`\gamma=\frac{F}{4\pi R}`)+
        P('con R = 0,70 cm.')),
      H('6. Primer líquido',
        M(String.raw`\gamma_1=\frac{555.33}{4\pi(0.70)}=63.13\;\text{dyn/cm}`)),
      H('7. Segundo líquido',
        M(String.raw`\gamma_2=\frac{596.17}{4\pi(0.70)}=67.77\;\text{dyn/cm}`)),
      H('8. Resultado',
        M(String.raw`\boxed{\gamma_1\approx63.1\;\text{dyn/cm}}`)+
        M(String.raw`\boxed{\gamma_2\approx67.8\;\text{dyn/cm}}`))
    ],
    '“La calibración vuelve a dar la misma constante por división que en el ejemplo original, pero no porque yo la recuerde: la calculo. Después cada lectura se transforma en fuerza y cada fuerza se divide por 4πR para obtener γ.”',
    '73 divisiones > 68 divisiones, por lo tanto F₂ > F₁ y debe salir γ₂ > γ₁. Los resultados cumplen esa relación.'
  );

  function isAdminPhysics(){
    const pill=document.querySelector('.pill');
    const title=document.querySelector('.unitHero h1');
    return Boolean(pill && pill.textContent.trim()==='Administrador' && title && title.textContent.trim()==='Física Aplicada');
  }

  function renderMath(root,attempt=0){
    const nodes=[...root.querySelectorAll('[data-model-math]')].filter(n=>!n.dataset.rendered);
    if(!nodes.length)return;
    if(!window.katex){
      if(attempt<40)setTimeout(()=>renderMath(root,attempt+1),100);
      return;
    }
    nodes.forEach(node=>{
      const latex=decodeURIComponent(node.dataset.modelMath||'');
      try{
        window.katex.render(latex,node,{displayMode:true,throwOnError:false,strict:'ignore'});
        node.dataset.rendered='1';
      }catch(_){
        node.textContent=latex;
      }
    });
  }

  function ensureStyles(){
    if(document.getElementById('physicsModelEvaluationStyles'))return;
    const style=document.createElement('style');
    style.id='physicsModelEvaluationStyles';
    style.textContent=`
      .modelEvaluations{margin-top:42px;padding-top:8px}
      .modelEvalIntro{margin:0 0 22px}
      .modelEvalGroup{margin:28px 0 46px;padding:22px;border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 22%,var(--line,#d9e5e4));border-radius:24px;background:color-mix(in srgb,var(--accent,#0f9f9a) 2%,var(--card,#fff))}
      .modelEvalGroupHead{display:grid;gap:5px;margin-bottom:18px}
      .modelEvalGroupHead small{font-weight:900;letter-spacing:.11em;color:var(--accent,#0f9f9a)}
      .modelEvalGroupHead h3{margin:0;font-size:1.45rem}
      .modelEvalGroupHead p{margin:0;opacity:.78}
      .modelEvalNote{padding:12px 14px;border-radius:14px;background:color-mix(in srgb,#f0a23a 12%,var(--card,#fff));border:1px solid color-mix(in srgb,#f0a23a 28%,transparent);font-size:.92rem;margin:12px 0 18px}
      .modelStudentAnswer{margin:14px 0 0;padding:13px 15px;border-radius:14px;background:color-mix(in srgb,var(--accent,#0f9f9a) 10%,var(--card,#fff));border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 24%,transparent);line-height:1.55}
      .modelStudentAnswer b{display:block;font-size:.78rem;letter-spacing:.09em;text-transform:uppercase;color:var(--accent,#0f9f9a);margin-bottom:5px}
      .modelEvaluations .exerciseCard{margin-bottom:16px}
      .modelEvalSourceTag{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:900;padding:5px 9px;border-radius:999px;background:color-mix(in srgb,var(--accent,#0f9f9a) 8%,var(--card,#fff));border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 20%,transparent);margin-bottom:8px}
      @media(max-width:700px){.modelEvalGroup{padding:14px;border-radius:19px}.modelEvalGroupHead h3{font-size:1.25rem}}
    `;
    document.head.appendChild(style);
  }

  function adminGuideFor(key){
    const body=guides[key];
    if(!body)return '';
    return `<details class="adminPhysicsSolution modelAdminSolution" open data-model-admin="${E(key)}"><summary>Guion docente hiperdesarrollado · ${E(key)}</summary>${body}</details>`;
  }

  function problemCard(problem,index,admin){
    return `<article class="exerciseCard modelEvaluationCard" data-model-key="${E(problem.key)}">
      <div class="exerciseHead"><span>PROBLEMA ${index+1}</span><h3>${E(problem.key)} · ${E(problem.title)}</h3></div>
      <div class="exerciseStatement"><p>${E(problem.statement)}</p></div>
      <div class="modelStudentAnswer"><b>Respuesta final · vista alumno</b><span>${problem.answer}</span></div>
      ${admin?adminGuideFor(problem.key):''}
    </article>`;
  }

  function buildSection(admin){
    return `<section class="modelEvaluations" id="physics-model-evaluations" data-model-evaluations="1">
      <div class="sectionHeading modelEvalIntro">
        <span>EVALUACIONES MODELO</span>
        <h2>Pruebas reales + dos evaluaciones espejo</h2>
        <p>Las dos primeras reproducen las evaluaciones fotografiadas. Las dos siguientes entrenan las mismas decisiones físicas con situaciones paralelas. En vista alumno se muestra solamente la respuesta final; el desarrollo docente aparece exclusivamente en modo Administrador.</p>
      </div>
      ${evaluations.map(ev=>`<section class="modelEvalGroup">
        <header class="modelEvalGroupHead"><small>${E(ev.eyebrow)}</small><h3>${E(ev.title)}</h3><p>${E(ev.meta)}</p></header>
        ${ev.note?`<div class="modelEvalNote">${E(ev.note)}</div>`:''}
        ${ev.problems.map((p,i)=>problemCard(p,i,admin)).join('')}
      </section>`).join('')}
    </section>`;
  }

  let scheduled=false;
  function refresh(){
    scheduled=false;
    ensureStyles();
    const book=document.querySelector('#physics-exercises.exerciseBook');
    if(!book)return;
    const admin=isAdminPhysics();
    const existing=book.querySelector('[data-model-evaluations]');
    if(existing){
      const currentAdmin=existing.dataset.adminMode==='1';
      if(currentAdmin!==admin)existing.remove();
      else{
        if(admin)renderMath(existing);
        return;
      }
    }
    const holder=document.createElement('div');
    holder.innerHTML=buildSection(admin).trim();
    const section=holder.firstElementChild;
    section.dataset.adminMode=admin?'1':'0';
    book.appendChild(section);
    if(admin)renderMath(section);
  }

  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(refresh);
  }

  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);
  else schedule();
})();
