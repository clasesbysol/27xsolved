// 27xSOLved · Física Aplicada — capa docente profunda para Evaluaciones Modelo.
// Solo se activa cuando la sesión corresponde al administrador.
(function(){
  'use strict';

  const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const M=latex=>`<div class="deepAdminFormula" data-deep-math="${encodeURIComponent(latex)}"></div>`;
  const P=t=>`<p>${t}</p>`;
  const H=(t,b)=>`<section class="deepAdminStep"><h4>${t}</h4>${b}</section>`;
  const DATA=rows=>`<div class="deepAdminData">${rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  const NOTE=t=>`<div class="deepAdminNote">${t}</div>`;
  const SAY=t=>`<div class="deepAdminSay"><b>🗣 Guion exacto para decir en clase</b><p>${t}</p></div>`;
  const ERROR=t=>`<div class="deepAdminError"><b>⚠ Error típico</b><p>${t}</p></div>`;
  const CHECK=t=>`<div class="deepAdminCheck"><b>✓ Control de coherencia</b><p>${t}</p></div>`;
  const WRAP=(intro,steps,say,errors,check)=>`<div class="deepAdminBody"><div class="deepAdminIntro">${intro}</div>${steps.join('')}${errors?ERROR(errors):''}${check?CHECK(check):''}${say?SAY(say):''}</div>`;

  function adminEmailInStorage(storage){
    const target=String(window.CBCLASES_CONFIG?.adminEmail||'').trim().toLowerCase();
    if(!target)return false;
    try{
      for(let i=0;i<storage.length;i++){
        const k=storage.key(i),v=storage.getItem(k);
        if(v&&String(v).toLowerCase().includes(target))return true;
      }
    }catch(_){ }
    return false;
  }
  function hasAdminBadge(){
    const selectors=['.pill','.rolePill','.accountRole','.userRole','button','a'];
    return selectors.some(sel=>[...document.querySelectorAll(sel)].some(el=>{
      const t=(el.textContent||'').trim().toLowerCase();
      return t==='administrador'||t==='panel de control'||t.includes('panel admin');
    }));
  }
  function isAdminPhysics(){
    const title=document.querySelector('.unitHero h1');
    if(!title||title.textContent.trim()!=='Física Aplicada')return false;
    return hasAdminBadge()||adminEmailInStorage(localStorage)||adminEmailInStorage(sessionStorage);
  }

  const G={};

  G['EV1.1']=WRAP(
    '<b>Objetivo docente:</b> que el alumno entienda que el espesor máximo sale de un equilibrio entre dos cosas geométricamente distintas: el peso depende del <b>área</b> y del espesor; la tensión superficial sostiene por <b>longitud de contacto</b>. La foto no conserva el perfil del pizarrón, así que el cierre correcto es una expresión general y no un número inventado.',
    [
      H('1. Leo la consigna y separo dato físico de dato geométrico',DATA([['Material','aluminio'],['Densidad','ρ = 2,7 kg/dm³'],['Líquido','agua'],['Tensión superficial','γ = 72,8 dyn/cm'],['Incógnita','espesor máximo e'],['Dato faltante','perfil geométrico del pizarrón']])+P('Antes de calcular, marco que el perfil determina dos magnitudes distintas: el área A de chapa que pesa y la longitud efectiva Lₑf sobre la que actúa la tensión superficial.')),
      H('2. Paso la densidad a un sistema compatible con γ',P('Como γ ya está en dina/cm, conviene trabajar en CGS.')+M(String.raw`2.7\;\frac{\mathrm{kg}}{\mathrm{dm}^3}=2.7\;\frac{\mathrm{g}}{\mathrm{cm}^3}`)+M(String.raw`g=980\;\frac{\mathrm{cm}}{\mathrm{s}^2}`)),
      H('3. Construyo el peso desde cero',P('No uso una fórmula memorizada de chapa. Empiezo por volumen, luego masa y luego peso:')+M(String.raw`V=Ae`)+M(String.raw`m=\rho V=\rho Ae`)+M(String.raw`P=mg=\rho Aeg`)+P('Esto muestra de dónde aparece el espesor: cuanto más gruesa la chapa, mayor el peso.')),
      H('4. Construyo la fuerza superficial',P('La tensión superficial es fuerza por unidad de longitud. En el modelo ideal de estos ejercicios tomamos la componente vertical máxima:')+M(String.raw`F_\gamma=\gamma L_{ef}`)+NOTE('Si el perfil tiene agujeros, cada borde mojado puede sumar longitud efectiva. El agujero, en cambio, resta área de material y por lo tanto resta peso.')),
      H('5. Interpreto “máximo” como condición límite',P('Si la chapa es más fina, la superficie todavía puede sostenerla. En el máximo, las fuerzas se igualan exactamente:')+M(String.raw`F_\gamma=P`)+M(String.raw`\gamma L_{ef}=\rho Aeg`)),
      H('6. Despejo antes de reemplazar números',M(String.raw`e_{\max}=\frac{\gamma L_{ef}}{\rho A g}`)+P('Este es el resultado físico general. Recién ahora pongo los datos conocidos.')),
      H('7. Sustituyo los datos que sí existen',M(String.raw`e_{\max}=\frac{72.8\,L_{ef}}{(2.7)(980)A}\;\mathrm{cm}`)+M(String.raw`e_{\max}=0.02751\,\frac{L_{ef}}{A}\;\mathrm{cm}`)),
      H('8. Explico por qué no cierro un número',P('Para obtener un valor numérico necesito A y Lₑf del perfil. Como el dibujo no quedó en la fotografía, cualquier número adicional sería inventado. La resolución correcta termina aquí y deja claro qué dato geométrico falta.')),
      H('9. Qué haría si me muestran el dibujo en clase',P('Calculo por separado el área de material y todos los contornos mojados; los reemplazo en la expresión general. Ese procedimiento vale para círculo, rectángulo, anillo o placa perforada.'))
    ],
    '“Primero no miro la forma. Pienso qué hace caer a la chapa y qué la sostiene. El peso depende del volumen, entonces aparece A por e. La tensión superficial, en cambio, tira por borde, entonces aparece una longitud. En el límite igualo ambas. Recién al final uso el dibujo para calcular A y L. Como en esta foto el perfil no está, no invento la geometría: dejo la fórmula general perfectamente resuelta.”',
    'Usar solamente el perímetro exterior aunque haya agujeros; confundir área con perímetro; o reemplazar números antes de tener unidades compatibles.',
    'La fórmula debe aumentar con γ y disminuir con ρ. Además L/A tiene unidad 1/longitud, de modo que γL/(ρAg) termina en longitud, como corresponde.'
  );

  G['EV1.2']=WRAP(
    '<b>Objetivo docente:</b> derivar la relación del cuentagotas desde masa de una gota y después tratar la incertidumbre como una segunda etapa. La clave conceptual es que, para el mismo volumen total, más gotas implica menor volumen y menor masa por gota.',
    [
      H('1. Ordeno todos los datos',DATA([['ρ líquido','(0,85 ± 0,30) g/cm³'],['ρ agua','1,00 g/cm³'],['γ agua','72,8 dyn/cm'],['gotas de agua','nₐ = 45'],['gotas del líquido','nₓ = 90'],['error de ρ agua','5 %']])),
      H('2. Explico qué compara el método',P('Si ambos líquidos ocupan el mismo volumen total V en el gotero, el volumen medio de una gota es:')+M(String.raw`V_{gota}=\frac{V}{n}`)+P('La masa media de una gota es densidad por ese volumen:')+M(String.raw`m_{gota}=\rho\frac{V}{n}`)),
      H('3. Relaciono masa de gota con tensión superficial',P('Para el mismo gotero, el factor geométrico de desprendimiento es el mismo. Por eso al comparar dos líquidos la tensión superficial queda proporcional a la masa de una gota:')+M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{m_x}{m_a}`)),
      H('4. Sustituyo las masas y cancelo lo común',M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{\rho_x(V/n_x)}{\rho_a(V/n_a)}`)+M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{\rho_x n_a}{\rho_a n_x}`)+M(String.raw`\gamma_x=\gamma_a\frac{\rho_x n_a}{\rho_a n_x}`)),
      H('5. Calculo el valor central',M(String.raw`\gamma_x=72.8\frac{(0.85)(45)}{(1.00)(90)}`)+M(String.raw`\gamma_x=72.8(0.425)`)+M(String.raw`\gamma_x=30.94\;\mathrm{dyn/cm}`)),
      H('6. Antes del error, interpreto el resultado',P('El líquido da el doble de gotas que el agua y además es menos denso. Ambas cosas empujan a que su tensión superficial sea menor que la del agua. El valor 30,94 dyn/cm respeta esa expectativa.')),
      H('7. Paso cada incertidumbre a error relativo',M(String.raw`e_{\rho_x}=\frac{0.30}{0.85}=0.35294`)+M(String.raw`e_{\rho_a}=0.05`)+P('El dato ±0,30 es muy grande: representa aproximadamente 35,3 % de incertidumbre relativa.')),
      H('8. Propago con el criterio conservador de la materia',P('Como γx es proporcional a ρx e inversamente proporcional a ρa, para una estimación máxima sumamos errores relativos:')+M(String.raw`e_{\gamma}=e_{\rho_x}+e_{\rho_a}`)+M(String.raw`e_{\gamma}=0.35294+0.05=0.40294`)),
      H('9. Vuelvo a error absoluto',M(String.raw`\Delta\gamma=e_{\gamma}\gamma_x`)+M(String.raw`\Delta\gamma=(0.40294)(30.94)=12.47\;\mathrm{dyn/cm}`)),
      H('10. Informo el resultado con sentido físico',M(String.raw`\boxed{\gamma_x=(30.9\pm12.5)\;\mathrm{dyn/cm}}`)+NOTE('Si el “±0,3” de la consigna fuera un error tipográfico, el resultado de incertidumbre cambiaría muchísimo. En una prueba conviene resolver literalmente y, si hace falta, dejar la observación aparte.'))
    ],
    '“Primero saco el valor de γ sin hablar de error. Imagino el mismo volumen repartido en gotas: si salen n gotas, cada una ocupa V/n. Multiplico por densidad y tengo la masa de una gota. Como el mismo gotero se desprende con la misma geometría, comparo masas de gota y obtengo la fórmula. Después, en una segunda parte, convierto las incertidumbres a relativas, las sumo por ser producto/cociente y vuelvo a error absoluto.”',
    'Invertir nₐ/nₓ; usar 90/45 en vez de 45/90; sumar errores absolutos de densidades directamente; o confundir 5 % con 5 unidades.',
    'γx debe ser menor que 72,8 dyn/cm. Además el error resultante tiene que ser grande porque uno de los datos trae una incertidumbre relativa de aproximadamente 35 %.'
  );

  G['EV1.3']=WRAP(
    '<b>Objetivo docente:</b> mostrar que al comparar dos capilares iguales se puede eliminar radio, gravedad y ángulo de contacto. El ejercicio se vuelve una relación entre altura, densidad y tensión superficial.',
    [
      H('1. Escribo Jurin para cada líquido',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho g r}`)+P('Para el agua:')+M(String.raw`h_a=\frac{2\gamma_a\cos\theta}{\rho_a g r}`)+P('Para el incógnita:')+M(String.raw`h_x=\frac{2\gamma_x\cos\theta}{\rho_x g r}`)),
      H('2. Uso la información “mismo radio e igual ángulo”',P('Divido una ecuación por la otra. Así desaparecen 2, cosθ, g y r:')+M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)),
      H('3. Despejo la tensión superficial incógnita',M(String.raw`\gamma_x=\gamma_a\frac{h_x\rho_x}{h_a\rho_a}`)),
      H('4. Unifico densidades',M(String.raw`1300\;\mathrm{kg/m^3}=1.300\;\mathrm{g/cm^3}`)+M(String.raw`\rho_a\approx1.000\;\mathrm{g/cm^3}`)),
      H('5. Tomo la referencia de altura del gráfico de la guía',DATA([['h agua','6,0 mm'],['h líquido','9,3 mm'],['γ agua','72,8 dyn/cm'],['ρ líquido','1,300 g/cm³'],['ρ agua','1,000 g/cm³']])+NOTE('La foto de la evaluación menciona una figura pero no la muestra completa. La referencia de 6 mm coincide con el mismo esquema capilar de la guía de cátedra ya usado en los ejercicios.')),
      H('6. Sustituyo manteniendo las alturas en la misma unidad',M(String.raw`\gamma_x=72.8\frac{(9.3)(1.300)}{(6.0)(1.000)}`)+M(String.raw`\gamma_x=72.8\frac{12.09}{6}`)+M(String.raw`\gamma_x=146.69\;\mathrm{dyn/cm}`)),
      H('7. Resultado central',M(String.raw`\boxed{\gamma_x\approx146.7\;\mathrm{dyn/cm}}`)),
      H('8. Qué pasa con el “con su error”',P('Para calcular un error numérico hacen falta las incertidumbres de hₓ, hₐ, ρₓ y, si corresponde, γₐ. La foto no las conserva. Sí puedo dejar escrita la propagación conservadora:')+M(String.raw`\frac{\Delta\gamma_x}{\gamma_x}\approx\frac{\Delta h_x}{h_x}+\frac{\Delta\rho_x}{\rho_x}+\frac{\Delta h_a}{h_a}+\frac{\Delta\rho_a}{\rho_a}+\frac{\Delta\gamma_a}{\gamma_a}`)+P('Cuando estén los errores de la figura, se reemplazan ahí.')),
      H('9. Interpreto físicamente',P('El líquido es más denso que el agua y aun así asciende más. Para lograr eso necesariamente debe tener una tensión superficial bastante mayor que la del agua, que es exactamente lo que da el cálculo.'))
    ],
    '“No calculo el radio ni el ángulo porque no me hacen falta. Escribo Jurin dos veces y divido. Todo lo que es igual se cancela. Me queda una comparación directa. Después observo algo muy útil: este líquido es más denso y además sube más, así que su γ tiene que salir mucho mayor que la del agua; si me diera menos de 72,8, sabría que invertí una razón.”',
    'Usar 1300 como si fuera g/cm³; invertir hₓ/hₐ; o inventar un error numérico cuando la figura no aporta las incertidumbres necesarias.',
    'El resultado debe ser mayor que 72,8 dyn/cm. Las unidades de altura se cancelan siempre que ambas estén expresadas en la misma unidad.'
  );

  G['EV2.1']=WRAP(
    '<b>Objetivo docente:</b> que se entienda que el picnómetro no “mide densidad” directamente: garantiza un mismo volumen. La densidad se obtiene comparando la masa neta del líquido incógnita con la masa neta de agua que ocupa exactamente ese mismo volumen.',
    [
      H('1. Identifico qué incluye cada pesada',DATA([['Picnómetro vacío','8,987 g'],['Picnómetro + agua','58,767 g'],['Picnómetro + incógnita','62,522 g'],['ρ agua','1,000 g/cm³']])+P('Las lecturas de 58,767 g y 62,522 g incluyen el vidrio. Primero hay que restarlo.')),
      H('2. Calculo la masa real de agua',M(String.raw`m_a=58.767-8.987`)+M(String.raw`m_a=49.780\;\mathrm{g}`)),
      H('3. Uso el agua para encontrar el volumen del picnómetro',M(String.raw`\rho_a=\frac{m_a}{V}`)+M(String.raw`V=\frac{m_a}{\rho_a}`)+M(String.raw`V=\frac{49.780}{1.000}=49.780\;\mathrm{cm^3}`)),
      H('4. Calculo la masa real del líquido incógnita',M(String.raw`m_x=62.522-8.987`)+M(String.raw`m_x=53.535\;\mathrm{g}`)),
      H('5. Aplico definición de densidad',M(String.raw`\rho_x=\frac{m_x}{V}`)+M(String.raw`\rho_x=\frac{53.535}{49.780}`)+M(String.raw`\rho_x=1.07543\;\mathrm{g/cm^3}`)),
      H('6. Muestro el atajo una vez entendido el método largo',P('Como ambos líquidos ocupan el mismo V, puedo escribir directamente:')+M(String.raw`\rho_x=\rho_a\frac{m_x}{m_a}`)+M(String.raw`\rho_x=1.000\frac{53.535}{49.780}`)+P('Da exactamente lo mismo. El atajo no es una fórmula mágica: sale de cancelar el mismo volumen.')),
      H('7. Resultado',M(String.raw`\boxed{\rho_x\approx1.075\;\mathrm{g/cm^3}}`)),
      H('8. Interpreto el número',P('En el mismo volumen, el líquido incógnita tiene mayor masa que el agua; por eso su densidad debe ser mayor que 1 g/cm³.'))
    ],
    '“El picnómetro me asegura que el agua y el líquido llenan exactamente el mismo volumen. Entonces primero saco el peso del frasco de ambas mediciones. El agua me sirve para saber cuánto volumen entra. Después divido la masa del incógnita por ese volumen. Cuando esto ya está claro, puedo mostrar que el volumen se cancela y queda el cociente de masas netas.”',
    'Dividir 62,522 por 58,767 sin restar el picnómetro; o tomar 62,522 g como masa del líquido.',
    'Como 53,535 g > 49,780 g para el mismo volumen, tiene que salir ρx > 1. El resultado 1,075 cumple.'
  );

  G['EV2.2']=WRAP(
    '<b>Objetivo docente:</b> unir tres ideas en una sola cadena: Arquímedes → empuje proporcional a densidad → momento sobre la balanza → jinetillos que generan el momento contrario. Recién al final se traduce la lectura decimal a posiciones.',
    [
      H('1. Empiezo por el principio físico, no por los jinetillos',P('El inmersor de la balanza se sumerge completamente. El líquido ejerce un empuje:')+M(String.raw`E=\rho_{liq}gV_{inmersor}`)+P('El volumen del inmersor y g son constantes, de modo que:')+M(String.raw`E\propto\rho_{liq}`)),
      H('2. Paso de fuerza a momento',P('Ese empuje actúa a una distancia del apoyo y produce un momento:')+M(String.raw`M_E=E\,d`)+P('Los jinetillos producen momentos opuestos:')+M(String.raw`M_J=\sum_i m_i g x_i`)),
      H('3. Condición de equilibrio de la balanza',M(String.raw`E\,d=\sum_i m_i g x_i`)+P('Como la geometría del instrumento y las masas de los jinetillos están calibradas, la posición de cada jinetillo corresponde a una cifra decimal de densidad.')),
      H('4. Relación con la calibración en agua',P('Si el agua de densidad aproximadamente 1 g/cm³ define la referencia, la balanza convierte el empuje relativo en una lectura de densidad específica. Por eso una mayor densidad exige mayor momento compensador.')),
      H('5. Construyo la lectura 1,095',M(String.raw`1.095=1.000+0.090+0.005`)+P('Interpretación: un aporte unidad; nueve centésimas; cinco milésimas. En el modelo habitual, se ubican los jinetillos correspondientes en las posiciones que generan esos aportes.')),
      H('6. Construyo la lectura 1,125',M(String.raw`1.125=1.000+0.100+0.020+0.005`)+P('Interpretación: un aporte unidad; una décima; dos centésimas; cinco milésimas.')),
      H('7. Comparo las dos soluciones antes de terminar',M(String.raw`1.125>1.095`)+P('La solución al 15 % m/m es más densa, por lo tanto genera mayor empuje y requiere una compensación mayor de los jinetillos.')),
      H('8. Aclaración importante sobre el aparato real',NOTE('El tamaño físico y el nombre de los jinetillos pueden variar según el modelo de Mohr-Westphal. En una explicación rigurosa conviene mostrar en la balanza real qué jinetillo corresponde a unidad, décima, centésima y milésima. La descomposición decimal es la parte universal.')),
      H('9. Qué tiene que quedar en una respuesta de examen',P('No alcanza con escribir “pongo los jinetillos”. Hay que justificar que su posición mide densidad porque compensa un momento originado por el empuje de Arquímedes, y que ese empuje es proporcional a ρ cuando V y g permanecen constantes.'))
    ],
    '“Primero imaginen el inmersor: cuanto más denso es el líquido, más fuerte lo empuja hacia arriba. Ese empuje hace girar la balanza. Yo corro masas conocidas —los jinetillos— hasta producir el torque contrario. Como el aparato fue calibrado, las posiciones ya vienen traducidas a cifras de densidad. Entonces 1,095 lo leo como 1 + 0,09 + 0,005; y 1,125 como 1 + 0,1 + 0,02 + 0,005.”',
    'Explicar la balanza como una simple “suma de pesitas” sin mencionar Arquímedes ni momentos; o confundir la lectura de densidad con masa.',
    'La solución al 15 % debe exigir una compensación mayor que la del 10 %. La lectura 1,125 es efectivamente mayor que 1,095.'
  );

  G['EV2.3']=WRAP(
    '<b>Objetivo docente:</b> hacer explícitas las dos calibraciones conceptuales del ejercicio: primero divisiones → fuerza; después fuerza → tensión superficial mediante la longitud efectiva del anillo.',
    [
      H('1. Leo qué es dato de calibración y qué es dato de muestra',DATA([['Masa patrón','200 mg'],['Lectura patrón','24 divisiones'],['Solución 10 %','77 divisiones'],['Solución 15 %','84 divisiones'],['Radio medio del anillo','0,72 cm'],['g','980 cm/s²']])),
      H('2. Paso la masa patrón a gramos',M(String.raw`200\;\mathrm{mg}=0.200\;\mathrm{g}`)),
      H('3. Convierto masa patrón en fuerza',P('En CGS, una masa en gramos multiplicada por g en cm/s² da dinas:')+M(String.raw`F_{ref}=mg`)+M(String.raw`F_{ref}=(0.200)(980)=196\;\mathrm{dyn}`)),
      H('4. Hallo cuánto vale una división',M(String.raw`k=\frac{F_{ref}}{N_{ref}}`)+M(String.raw`k=\frac{196}{24}=8.1667\;\frac{\mathrm{dyn}}{\mathrm{div}}`)+P('Ahora sí una división tiene significado físico.')),
      H('5. Convierto 77 divisiones en fuerza',M(String.raw`F_{10}=kN_{10}`)+M(String.raw`F_{10}=(8.1667)(77)=628.83\;\mathrm{dyn}`)),
      H('6. Convierto 84 divisiones en fuerza',M(String.raw`F_{15}=kN_{15}`)+M(String.raw`F_{15}=(8.1667)(84)=686.00\;\mathrm{dyn}`)),
      H('7. Explico la longitud efectiva del anillo',P('Un anillo fino tiene aproximadamente una circunferencia interior y otra exterior. Para un radio medio R:')+M(String.raw`L\approx2(2\pi R)=4\pi R`)+M(String.raw`F=\gamma L`)+M(String.raw`\gamma=\frac{F}{4\pi R}`)),
      H('8. Calculo γ de la solución al 10 %',M(String.raw`\gamma_{10}=\frac{628.83}{4\pi(0.72)}`)+M(String.raw`\gamma_{10}=69.50\;\mathrm{dyn/cm}`)),
      H('9. Calculo γ de la solución al 15 %',M(String.raw`\gamma_{15}=\frac{686.00}{4\pi(0.72)}`)+M(String.raw`\gamma_{15}=75.82\;\mathrm{dyn/cm}`)),
      H('10. Resultados finales',M(String.raw`\boxed{\gamma_{10\%}\approx69.5\;\mathrm{dyn/cm}}`)+M(String.raw`\boxed{\gamma_{15\%}\approx75.8\;\mathrm{dyn/cm}}`)),
      H('11. Interpreto la lectura instrumental',P('84 divisiones significan una fuerza de despegue mayor que 77 divisiones. Como el anillo es el mismo, una fuerza mayor implica una tensión superficial mayor.'))
    ],
    '“No puedo meter 77 en una fórmula de tensión porque 77 son divisiones, no fuerza. Primero calibro: 200 mg pesan 196 dinas y eso son 24 divisiones; entonces cada división vale 8,17 dinas. Convierto 77 y 84 a fuerzas. Después recién uso Du Noüy: la fuerza actúa sobre dos circunferencias, por eso la longitud efectiva es aproximadamente 4πR.”',
    'Usar 200 mg como 200 g; tomar 24 como fuerza; olvidar la segunda línea de contacto del anillo; o usar 2πR en lugar de 4πR.',
    'La muestra de 84 divisiones debe dar mayor γ. Además dyn dividido por cm deja dyn/cm, que es la unidad pedida.'
  );

  // Espejos: guiones con la misma profundidad metodológica, pero más compactos para no repetir texto literal.
  G['EV3.1']=WRAP('<b>Objetivo docente:</b> practicar la separación entre área que pesa y perímetro que sostiene en una placa perforada.',[
    H('1. Ecuación general',M(String.raw`\rho Aeg=\gamma P`)+M(String.raw`e_{\max}=\frac{\gamma P}{\rho Ag}`)),
    H('2. Perímetro exterior',M(String.raw`P_{ext}=4(3.0)=12.0\;\mathrm{cm}`)),
    H('3. Perímetro del agujero',M(String.raw`P_{int}=2\pi(0.60)=1.20\pi\;\mathrm{cm}`)),
    H('4. Perímetro total',M(String.raw`P=12+1.20\pi=15.7699\;\mathrm{cm}`)),
    H('5. Área de material',M(String.raw`A=3.0^2-\pi(0.60)^2`)+M(String.raw`A=7.8690\;\mathrm{cm^2}`)),
    H('6. Sustitución',M(String.raw`e=\frac{72.8(15.7699)}{2.70(7.8690)(980)}`)+M(String.raw`e=0.05514\;\mathrm{cm}`)),
    H('7. Conversión',M(String.raw`0.05514\;\mathrm{cm}=0.5514\;\mathrm{mm}`)),
    H('8. Resultado',M(String.raw`\boxed{e_{\max}\approx0.551\;\mathrm{mm}}`))
  ],'“Para sostener cuento bordes; para pesar cuento material. El agujero suma perímetro pero resta área. Después uso el mismo equilibrio de siempre.”','Restar el perímetro del agujero en vez de sumarlo, o sumar su área en vez de restarla.','El agujero aumenta P/A, por eso puede permitir un espesor relativamente mayor.' );

  G['EV3.2']=WRAP('<b>Objetivo docente:</b> repetir cuentagotas distinguiendo con claridad valor central e incertidumbre.',[
    H('1. Fórmula comparativa',M(String.raw`\gamma_x=\gamma_a\frac{\rho_xn_a}{\rho_an_x}`)),
    H('2. Valor central',M(String.raw`\gamma_x=72.8\frac{0.92(40)}{1.00(64)}`)+M(String.raw`\gamma_x=41.86\;\mathrm{dyn/cm}`)),
    H('3. Error relativo del líquido',M(String.raw`e_x=\frac{0.02}{0.92}=0.02174`)),
    H('4. Error relativo del agua',M(String.raw`e_a=0.01`)),
    H('5. Error relativo total máximo',M(String.raw`e_\gamma=0.02174+0.01=0.03174`)),
    H('6. Error absoluto',M(String.raw`\Delta\gamma=41.86(0.03174)=1.33\;\mathrm{dyn/cm}`)),
    H('7. Resultado',M(String.raw`\boxed{\gamma_x=(41.9\pm1.3)\;\mathrm{dyn/cm}}`)),
    H('8. Lectura física',P('64 gotas frente a 40, con densidad menor que el agua, es compatible con una γ bastante menor que 72,8 dyn/cm.'))
  ],'“Primero calculo γ como si los datos fueran exactos. Después convierto cada incertidumbre a relativa, las sumo porque tengo un producto/cociente y finalmente transformo ese porcentaje en un error absoluto.”','Sumar 0,02 + 0,01 como si fueran errores absolutos comparables.','El error relativo total es alrededor de 3,17 %; aplicado a 41,86 produce cerca de 1,33.' );

  G['EV3.3']=WRAP('<b>Objetivo docente:</b> usar la comparación de Jurin sin introducir datos innecesarios.',[
    H('1. Dos ecuaciones de Jurin',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
    H('2. Cancelo parámetros comunes',M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)),
    H('3. Despejo',M(String.raw`\gamma_x=\gamma_a\frac{h_x\rho_x}{h_a\rho_a}`)),
    H('4. Reemplazo',M(String.raw`\gamma_x=72.8\frac{8.2(1.15)}{5.5(1.00)}`)),
    H('5. Calculo numerador relativo',M(String.raw`8.2(1.15)=9.43`)),
    H('6. Cociente',M(String.raw`\frac{9.43}{5.5}=1.7145`)),
    H('7. Resultado',M(String.raw`\boxed{\gamma_x\approx124.8\;\mathrm{dyn/cm}}`)),
    H('8. Interpreto',P('El líquido es más denso y aun así asciende más: necesariamente debe tener γ mayor que el agua.'))
  ],'“Escribo Jurin dos veces y divido. Como r y θ son iguales, desaparecen. No necesito calcular ni radio ni coseno. Me queda una comparación directa y muy fácil de controlar físicamente.”','Invertir la razón de alturas o de densidades.','El resultado tiene que superar 72,8 dyn/cm porque el líquido más denso consigue además una mayor altura.' );

  G['EV4.1']=WRAP('<b>Objetivo docente:</b> resolver picnómetro por el método largo y luego mostrar el cociente de masas netas como atajo justificado.',[
    H('1. Masa de agua',M(String.raw`m_a=62.100-12.420=49.680\;\mathrm{g}`)),
    H('2. Volumen del picnómetro',M(String.raw`V=\frac{49.680}{1.000}=49.680\;\mathrm{cm^3}`)),
    H('3. Masa de incógnita',M(String.raw`m_x=59.876-12.420=47.456\;\mathrm{g}`)),
    H('4. Densidad',M(String.raw`\rho_x=\frac{47.456}{49.680}`)),
    H('5. Cálculo',M(String.raw`\rho_x=0.95523\;\mathrm{g/cm^3}`)),
    H('6. Resultado',M(String.raw`\boxed{\rho_x\approx0.9552\;\mathrm{g/cm^3}}`)),
    H('7. Atajo',M(String.raw`\rho_x=\rho_a\frac{m_x}{m_a}`)+P('El mismo volumen se cancela.')),
    H('8. Lectura física',P('La misma capacidad contiene menos masa de incógnita que de agua, por eso su densidad es menor que 1.'))
  ],'“Resto el frasco en ambas pesadas. El agua me dice cuánto volumen entra. Después divido la masa del incógnita por ese volumen. Si ya entendimos eso, vemos que el volumen se cancela y queda directamente el cociente de masas netas.”','Usar masas totales con el vidrio incluido.','47,456 g < 49,680 g para el mismo volumen, por lo tanto ρx < 1, tal como da la cuenta.' );

  G['EV4.2']=WRAP('<b>Objetivo docente:</b> practicar la lectura decimal de Mohr sin perder el fundamento de Arquímedes y momentos.',[
    H('1. Empuje',M(String.raw`E=\rho gV`)),
    H('2. Proporcionalidad',M(String.raw`V,g=\mathrm{cte}\Rightarrow E\propto\rho`)),
    H('3. Momento del empuje',M(String.raw`M_E=Ed`)),
    H('4. Momento de jinetillos',M(String.raw`M_J=\sum_i m_i g x_i`)),
    H('5. Equilibrio',M(String.raw`Ed=\sum_i m_i g x_i`)),
    H('6. Primera lectura',M(String.raw`1.083=1.000+0.080+0.003`)),
    H('7. Segunda lectura',M(String.raw`1.117=1.000+0.100+0.010+0.007`)),
    H('8. Interpretación',P('La segunda densidad es mayor, por lo que exige un momento compensador ligeramente mayor.')),
    H('9. Aparato real',NOTE('En la clase conviene señalar físicamente qué jinetillo representa cada orden decimal en el modelo disponible.'))
  ],'“La balanza no adivina densidad. Un líquido más denso empuja más al inmersor y genera más torque. Yo compenso ese torque con jinetillos calibrados. Sus posiciones traducen directamente ese equilibrio a cifras decimales.”','Nombrar posiciones sin explicar por qué tienen relación con densidad.','1,117 > 1,083, así que la segunda lectura debe requerir una compensación mayor.' );

  G['EV4.3']=WRAP('<b>Objetivo docente:</b> repetir Du Noüy completo: patrón → fuerza por división → fuerza de muestra → γ.',[
    H('1. Convierto la masa patrón',M(String.raw`250\;\mathrm{mg}=0.250\;\mathrm{g}`)),
    H('2. Fuerza patrón',M(String.raw`F_{ref}=0.250(980)=245\;\mathrm{dyn}`)),
    H('3. Constante por división',M(String.raw`k=\frac{245}{30}=8.1667\;\mathrm{dyn/div}`)),
    H('4. Fuerza del líquido 1',M(String.raw`F_1=8.1667(68)=555.33\;\mathrm{dyn}`)),
    H('5. Fuerza del líquido 2',M(String.raw`F_2=8.1667(73)=596.17\;\mathrm{dyn}`)),
    H('6. Geometría del anillo',M(String.raw`L\approx4\pi R=4\pi(0.70)`)+M(String.raw`\gamma=\frac{F}{4\pi R}`)),
    H('7. Primera tensión',M(String.raw`\gamma_1=\frac{555.33}{4\pi(0.70)}=63.13\;\mathrm{dyn/cm}`)),
    H('8. Segunda tensión',M(String.raw`\gamma_2=\frac{596.17}{4\pi(0.70)}=67.77\;\mathrm{dyn/cm}`)),
    H('9. Resultados',M(String.raw`\boxed{\gamma_1\approx63.1\;\mathrm{dyn/cm}}`)+M(String.raw`\boxed{\gamma_2\approx67.8\;\mathrm{dyn/cm}}`)),
    H('10. Lectura física',P('73 divisiones implica mayor fuerza de despegue que 68; con el mismo anillo, debe dar mayor γ.'))
  ],'“Calibro primero porque las divisiones solas no son una fuerza. El patrón me dice cuántas dinas vale cada división. Después convierto las lecturas a fuerza y, recién al final, divido por la longitud efectiva de las dos circunferencias del anillo.”','Saltar la calibración o usar 2πR en vez de 4πR.','73 divisiones debe producir γ mayor que 68 divisiones, y los resultados respetan esa relación.' );

  function ensureStyles(){
    if(document.getElementById('physicsModelDeepAdminStyles'))return;
    const s=document.createElement('style');
    s.id='physicsModelDeepAdminStyles';
    s.textContent=`
      .modelDeepAdminSolution{margin:18px 0 0;border:2px solid color-mix(in srgb,var(--accent,#0f9f9a) 58%,#fff);border-radius:22px;overflow:hidden;background:color-mix(in srgb,var(--accent,#0f9f9a) 3%,var(--card,#fff));box-shadow:0 14px 34px rgba(0,0,0,.06)}
      .modelDeepAdminSolution>summary{cursor:pointer;list-style:none;padding:17px 19px;font-weight:950;background:color-mix(in srgb,var(--accent,#0f9f9a) 12%,var(--card,#fff));display:flex;align-items:center;gap:10px}
      .modelDeepAdminSolution>summary::-webkit-details-marker{display:none}
      .modelDeepAdminSolution>summary:before{content:'ADMIN · GUION DOCENTE';font-size:10px;letter-spacing:.1em;padding:5px 8px;border-radius:999px;background:var(--accent,#0f9f9a);color:#fff}
      .deepAdminBody{padding:18px;display:grid;gap:14px}
      .deepAdminIntro,.deepAdminNote,.deepAdminSay,.deepAdminError,.deepAdminCheck{padding:14px 16px;border-radius:15px;line-height:1.6}
      .deepAdminIntro{background:color-mix(in srgb,var(--accent,#0f9f9a) 8%,var(--card,#fff))}
      .deepAdminStep{padding:16px;border-radius:16px;border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 18%,var(--line,#dce6e6));background:var(--card,#fff)}
      .deepAdminStep h4{margin:0 0 8px;color:var(--accent,#0f9f9a);font-size:1rem}
      .deepAdminStep p{margin:8px 0}
      .deepAdminData{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:10px 0}
      .deepAdminData>div{padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent,#0f9f9a) 5%,var(--card,#fff));border:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 13%,transparent)}
      .deepAdminData span,.deepAdminData b{display:block}.deepAdminData span{font-size:.75rem;opacity:.68}.deepAdminData b{margin-top:3px}
      .deepAdminFormula{overflow:auto;padding:10px 4px;text-align:center}
      .deepAdminNote{background:#fff7e8;border:1px solid #efc06f;color:#6d4b0d}
      .deepAdminSay{background:color-mix(in srgb,var(--accent,#0f9f9a) 10%,var(--card,#fff));border-left:5px solid var(--accent,#0f9f9a)}
      .deepAdminError{background:#fff0ed;border:1px solid #f0b6aa;color:#7b3024}
      .deepAdminCheck{background:#edf9f2;border:1px solid #a8dbc0;color:#245c3d}
      html.physicsDeepAdmin .modelEvaluationCard>.modelAdminSolution{display:none!important}
      @media(max-width:700px){.deepAdminBody{padding:12px}.deepAdminStep{padding:13px}.modelDeepAdminSolution>summary{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(s);
  }

  function renderMath(root,attempt=0){
    const nodes=[...root.querySelectorAll('[data-deep-math]')].filter(n=>!n.dataset.deepRendered);
    if(!nodes.length)return;
    if(!window.katex){if(attempt<50)setTimeout(()=>renderMath(root,attempt+1),100);return;}
    nodes.forEach(n=>{
      try{window.katex.render(decodeURIComponent(n.dataset.deepMath||''),n,{displayMode:true,throwOnError:false,strict:'ignore'});n.dataset.deepRendered='1';}
      catch(_){n.textContent=decodeURIComponent(n.dataset.deepMath||'');}
    });
  }

  let scheduled=false;
  function refresh(){
    scheduled=false;
    if(!document.querySelector('#physics-model-evaluations'))return;
    const admin=isAdminPhysics();
    document.documentElement.classList.toggle('physicsDeepAdmin',admin);
    if(!admin){document.querySelectorAll('.modelDeepAdminSolution').forEach(x=>x.remove());return;}
    ensureStyles();
    document.querySelectorAll('.modelEvaluationCard[data-model-key]').forEach(card=>{
      const key=card.dataset.modelKey;
      const guide=G[key];
      if(!guide)return;
      let details=card.querySelector('.modelDeepAdminSolution');
      if(!details){
        details=document.createElement('details');
        details.className='modelDeepAdminSolution';
        details.open=true;
        details.dataset.deepAdmin=key;
        details.innerHTML=`<summary>Resolución hiperdesarrollada · ${E(key)}</summary>${guide}`;
        card.appendChild(details);
      }
      details.open=true;
      renderMath(details);
    });
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(refresh);}
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','data-model-key']});
  window.addEventListener('storage',schedule);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
  setTimeout(schedule,400);setTimeout(schedule,1200);setTimeout(schedule,2500);
})();
