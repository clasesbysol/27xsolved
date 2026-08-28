// ET 27 · Física Aplicada — guiones hiperdesarrollados exclusivos de la vista admin.
// Este archivo NO reemplaza las resoluciones de alumnos. Solo agrega una capa visual cuando
// la propia app ya identificó la sesión como Administrador.
(function(){
  'use strict';

  const M = latex => `<div class="adminFormula" data-admin-math="${encodeURIComponent(latex)}"></div>`;
  const P = text => `<p>${text}</p>`;
  const H = (title, body) => `<section class="adminStep"><h4>${title}</h4>${body}</section>`;
  const NOTE = text => `<div class="adminNote">${text}</div>`;
  const SAY = text => `<div class="adminSay"><b>🗣 Cómo lo explicaría en clase</b><p>${text}</p></div>`;
  const CHECK = text => `<div class="adminCheck"><b>✓ Control final</b><p>${text}</p></div>`;
  const DATA = rows => `<div class="adminData">${rows.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;
  const GUIDE = (intro, sections, say, check) => `<div class="adminGuideBody"><div class="adminIntro">${intro}</div>${sections.join('')}${check?CHECK(check):''}${say?SAY(say):''}</div>`;

  const S = {};

  S['4.1'] = GUIDE(
    '<b>Idea central:</b> buscamos el espesor límite de una chapa circular que todavía puede ser sostenida por la tensión superficial. En el límite de flotación ideal, la fuerza superficial hacia arriba iguala exactamente al peso de la chapa.',
    [
      H('1. Antes de calcular: traduzco la consigna a un modelo físico',
        P('La chapa tiene densidad conocida, diámetro conocido y espesor desconocido. Su peso aumenta linealmente con el espesor. La superficie del agua puede aportar una fuerza proporcional al perímetro mojado. El “espesor máximo” aparece cuando ambas fuerzas se igualan.')+
        NOTE('Supuesto del ejercicio: tomamos la componente vertical máxima de la tensión superficial, por eso usamos Fγ = γ·P sin un factor coseno adicional.')),
      H('2. Ordeno los datos y unifico unidades',
        DATA([['Diámetro','d = 31 mm = 3,1 cm'],['Densidad del hierro','ρ = 7,85 kg/L = 7,85 g/cm³'],['Tensión superficial','γ = 72,8 dyn/cm'],['Gravedad','g = 980 cm/s²'],['Incógnita','e = espesor máximo']])+
        P('Trabajo en CGS porque γ ya está dada en dyn/cm. El valor 980 de la gravedad corresponde a cm/s²; escribir 980 m/s² sería una inconsistencia de unidades.')),
      H('3. Escribo la fuerza que tira hacia abajo: el peso',
        P('Primero calculo el volumen de la chapa. Como es un disco, el volumen es área de la base por espesor:')+
        M(String.raw`V=A\,e`)+
        P('La masa es densidad por volumen:')+
        M(String.raw`m=\rho V=\rho A e`)+
        P('Y el peso es masa por gravedad:')+
        M(String.raw`P_{\text{peso}}=mg=\rho Aeg`)),
      H('4. Escribo la fuerza que puede sostener la superficie',
        P('La tensión superficial γ es fuerza por unidad de longitud. Por eso, sobre un perímetro total P:')+
        M(String.raw`F_{\gamma}=\gamma P`)+
        P('Para una circunferencia de diámetro d:')+
        M(String.raw`P=\pi d`)),
      H('5. Condición de espesor máximo',
        P('En el límite exacto, el peso ya no puede aumentar sin hundir la chapa:')+
        M(String.raw`P_{\text{peso}}=F_{\gamma}`)+
        M(String.raw`\rho Aeg=\gamma P`)),
      H('6. Recién ahora reemplazo la geometría del círculo',
        M(String.raw`A=\frac{\pi d^2}{4}`)+
        M(String.raw`P=\pi d`)+
        P('Sustituyo ambas expresiones en la ecuación de equilibrio:')+
        M(String.raw`\rho\left(\frac{\pi d^2}{4}\right)e g=\gamma\left(\pi d\right)`)),
      H('7. Despejo e paso a paso, antes de poner números',
        P('Divido ambos miembros por ρ, g y A; o, equivalentemente, despejo directamente:')+
        M(String.raw`e=\frac{\gamma P}{\rho A g}`)+
        P('Ahora sustituyo P y A:')+
        M(String.raw`e=\frac{\gamma\pi d}{\rho\left(\frac{\pi d^2}{4}\right)g}`)+
        P('Cancelo π y simplifico una potencia de d:')+
        M(String.raw`e=\frac{4\gamma}{\rho g d}`)),
      H('8. Aplico los datos numéricos',
        M(String.raw`e=\frac{4\cdot72.8}{7.85\cdot980\cdot3.1}\;\text{cm}`)+
        M(String.raw`e=0.01221\;\text{cm}`)+
        P('Paso de centímetros a milímetros multiplicando por 10:')+
        M(String.raw`e=0.1221\;\text{mm}`)),
      H('9. Resultado que escribiría',
        M(String.raw`\boxed{e_{\max}\approx0.12\;\text{mm}}`))
    ],
    '“La superficie sostiene por perímetro, mientras que el peso depende del área y del espesor. Igualo ambas fuerzas en el límite, reemplazo la geometría del disco y despejo el espesor. El número da muy pequeño, del orden de una décima de milímetro, que es razonable porque el hierro es muy denso.”',
    'Las unidades terminan en longitud. Además, si aumentara γ el espesor máximo debería aumentar; si aumentara ρ o d debería disminuir. La fórmula e = 4γ/(ρgd) cumple esas tendencias.'
  );

  S['4.2'] = GUIDE(
    '<b>Idea central:</b> es el mismo equilibrio que en 4.1, pero cambia la geometría. No vuelvo a inventar una fórmula: uso la ecuación general e = γP/(ρAg) y calculo correctamente área y perímetro.',
    [
      H('1. Datos',DATA([['Lados','a = 3 cm, b = 1 cm'],['Hierro','ρ = 7,85 g/cm³'],['Agua','γ = 72,8 dyn/cm'],['Gravedad','g = 980 cm/s²'],['Incógnita','e máximo']])),
      H('2. Fórmula física de partida',P('En el espesor límite:')+M(String.raw`\rho Aeg=\gamma P`)+P('Despejo una sola vez:')+M(String.raw`e=\frac{\gamma P}{\rho A g}`)),
      H('3. Geometría del rectángulo',P('Área de material:')+M(String.raw`A=ab`)+M(String.raw`A=3\cdot1=3\;\text{cm}^2`)+P('Perímetro mojado:')+M(String.raw`P=2(a+b)`)+M(String.raw`P=2(3+1)=8\;\text{cm}`)),
      H('4. Reemplazo numérico',M(String.raw`e=\frac{72.8\cdot8}{7.85\cdot3\cdot980}\;\text{cm}`)+M(String.raw`e=0.02524\;\text{cm}`)+M(String.raw`e=0.2524\;\text{mm}`)),
      H('5. Resultado',M(String.raw`\boxed{e_{\max}\approx0.25\;\text{mm}}`))
    ],
    '“La física no cambió: peso contra tensión superficial. Lo único nuevo es que ahora el área es ab y el perímetro es 2(a+b). Calculo esos dos valores y los meto en la fórmula general.”',
    'El rectángulo tiene una relación perímetro/área mayor que el disco del ejercicio anterior, por eso puede sostener un espesor algo mayor. Esa comparación sirve como control conceptual.'
  );

  S['4.3'] = GUIDE(
    '<b>Idea central:</b> en una placa anular hay dos bordes que aportan tensión superficial —el exterior y el interior—, mientras que el agujero no aporta peso. Ése es el detalle que no hay que olvidar.',
    [
      H('1. Datos',DATA([['Radio exterior','rₑ = 3 cm'],['Radio interior','rᵢ = 1 cm'],['ρ hierro','7,85 g/cm³'],['γ agua','72,8 dyn/cm'],['g','980 cm/s²']])),
      H('2. Ecuación general',M(String.raw`\rho Aeg=\gamma P`)+M(String.raw`e=\frac{\gamma P}{\rho A g}`)),
      H('3. Perímetro total que tira',P('El líquido toca dos circunferencias. Las sumo:')+M(String.raw`P=2\pi r_e+2\pi r_i`)+M(String.raw`P=2\pi(3)+2\pi(1)=8\pi\;\text{cm}`)),
      H('4. Área de material que pesa',P('El área es disco grande menos agujero:')+M(String.raw`A=\pi r_e^2-\pi r_i^2`)+M(String.raw`A=\pi(3^2-1^2)=8\pi\;\text{cm}^2`)),
      H('5. Sustituyo y simplifico',M(String.raw`e=\frac{72.8\,(8\pi)}{7.85\,(8\pi)\,980}`)+P('Se cancelan exactamente 8π:')+M(String.raw`e=\frac{72.8}{7.85\cdot980}\;\text{cm}`)+M(String.raw`e=0.009463\;\text{cm}`)+M(String.raw`e=0.09463\;\text{mm}`)),
      H('6. Resultado',M(String.raw`\boxed{e_{\max}\approx0.0946\;\text{mm}}`))
    ],
    '“En el anillo tengo que contar el borde de afuera y el borde del agujero. El agujero ayuda porque agrega línea de contacto, pero al mismo tiempo quita material y por lo tanto quita peso. Acá área y perímetro quedan ambos en 8π y se cancelan.”',
    'El resultado vuelve a ser del orden de décimas de milímetro. Si olvidara el borde interior, subestimaría la fuerza superficial.'
  );

  S['4.4'] = GUIDE(
    '<b>Idea central:</b> esta placa tiene un contorno exterior cuadrado y un agujero circular. El contorno del agujero suma fuerza superficial; el área del agujero se resta del material que pesa.',
    [
      H('1. Leo la figura y convierto densidad',DATA([['Lado del cuadrado','L = 2 cm'],['Radio del agujero','r = 0,5 cm'],['Densidad','6000 kg/m³ = 6 g/cm³'],['γ agua','72,8 dyn/cm'],['g','980 cm/s²']])),
      H('2. Ecuación física',M(String.raw`e=\frac{\gamma P}{\rho A g}`)),
      H('3. Perímetro total mojado',P('Contorno exterior del cuadrado:')+M(String.raw`P_{ext}=4L=4\cdot2=8\;\text{cm}`)+P('Contorno del agujero:')+M(String.raw`P_{int}=2\pi r=2\pi\cdot0.5=\pi\;\text{cm}`)+P('Total:')+M(String.raw`P=8+\pi=11.1416\;\text{cm}`)),
      H('4. Área real de material',M(String.raw`A=L^2-\pi r^2`)+M(String.raw`A=2^2-\pi(0.5)^2`)+M(String.raw`A=4-0.7854=3.2146\;\text{cm}^2`)),
      H('5. Reemplazo',M(String.raw`e=\frac{72.8\cdot11.1416}{6\cdot3.2146\cdot980}\;\text{cm}`)+M(String.raw`e=0.04291\;\text{cm}`)+M(String.raw`e=0.4291\;\text{mm}`)),
      H('6. Resultado',M(String.raw`\boxed{e_{\max}\approx0.43\;\text{mm}}`))
    ],
    '“Acá hago dos listas mentales: qué bordes tiran y qué material pesa. Para la fuerza sumo perímetros; para el peso resto el área del agujero. Después uso exactamente la misma ecuación de equilibrio.”',
    'El agujero puede aumentar la relación P/A: agrega perímetro y quita área. Eso explica por qué el espesor admisible puede crecer bastante.'
  );

  S['4.5'] = GUIDE(
    '<b>Idea central:</b> el tensiómetro de Du Noüy mide la fuerza necesaria para despegar un anillo. La tensión superficial multiplicada por la longitud total de contacto da la fuerza ideal de despegue.',
    [
      H('1. Fórmula base',M(String.raw`\gamma=\frac{F}{L}`)+P('Despejo fuerza:')+M(String.raw`F=\gamma L`)),
      H('2. Longitud efectiva del anillo',P('La consigna da una circunferencia C = 1,02 in. El anillo tiene contacto por dos líneas equivalentes, por eso L = 2C.')+M(String.raw`C=1.02\;\text{in}\cdot2.54\;\frac{\text{cm}}{\text{in}}`)+M(String.raw`C=2.5908\;\text{cm}`)+M(String.raw`L=2C=5.1816\;\text{cm}`)),
      H('3. Convierto la tensión superficial',P('Necesito γ en dyn/cm para combinarla con L en cm. Uso 1 pdl = 0,138255 N y 1 ft = 0,3048 m:')+M(String.raw`\gamma=0.042\;\frac{\text{pdl}}{\text{ft}}\cdot\frac{0.138255\;\text{N}}{1\;\text{pdl}}\cdot\frac{1\;\text{ft}}{0.3048\;\text{m}}`)+M(String.raw`\gamma=0.0190509\;\text{N/m}`)+P('Y como 1 N/m = 1000 dyn/cm:')+M(String.raw`\gamma=19.0509\;\text{dyn/cm}`)),
      H('4. Calculo la fuerza',M(String.raw`F=\gamma L`)+M(String.raw`F=19.0509\cdot5.1816\;\text{dyn}`)+M(String.raw`F=98.71\;\text{dyn}`)),
      H('5. Resultado',M(String.raw`\boxed{F\approx98.7\;\text{dyn}}`))
    ],
    '“Primero convierto todo a un mismo sistema. Después cuento la longitud total de contacto del anillo y uso F = γL. En Du Noüy real hay factores de corrección, pero este ejercicio pide el modelo ideal.”',
    'dyn/cm multiplicado por cm da dyn, exactamente la unidad de fuerza esperada.'
  );

  S['4.6'] = GUIDE(
    '<b>Idea central:</b> con el mismo gotero, la gota se desprende cuando su peso alcanza una fuerza superficial característica. Comparando dos líquidos, la geometría del gotero se cancela.',
    [
      H('1. Qué relación uso',P('Para un volumen total fijo V, si se forman n gotas, el volumen de una gota es V/n. Su masa es ρV/n, y su peso es proporcional a ρ/n.')+M(String.raw`m_{gota}=\rho\frac{V}{n}`)+M(String.raw`P_{gota}=\rho\frac{V}{n}g`)),
      H('2. Comparo líquido incógnita con agua',P('Como el gotero y la gravedad son los mismos, la constante geométrica se cancela:')+M(String.raw`\frac{\gamma_x}{\gamma_a}=\frac{\rho_x/n_x}{\rho_a/n_a}`)+P('Reordeno:')+M(String.raw`\gamma_x=\gamma_a\frac{\rho_x n_a}{\rho_a n_x}`)),
      H('3. Datos',DATA([['Agua','γₐ = 72,8 dyn/cm; ρₐ = 1 g/cm³; nₐ = 35'],['Líquido','ρₓ = 0,8 g/cm³; nₓ = 80']])),
      H('4. Reemplazo',M(String.raw`\gamma_x=72.8\frac{0.8\cdot35}{1\cdot80}`)+M(String.raw`\gamma_x=25.48\;\text{dyn/cm}`)),
      H('5. Resultado',M(String.raw`\boxed{\gamma_x\approx25.5\;\text{dyn/cm}}`))
    ],
    '“No comparo solo cantidad de gotas: también entra la densidad. Ochenta gotas para el mismo volumen significa gotas más pequeñas, y la relación correcta es γ proporcional a ρ/n para un mismo gotero.”',
    'El líquido produce muchas más gotas que el agua y además es menos denso; es coherente que su tensión superficial resulte bastante menor que 72,8 dyn/cm.'
  );

  S['4.7'] = GUIDE(
    '<b>Idea central:</b> usamos la ley de Jurin, pero el líquido desciende. Eso obliga a poner h negativa; el coseno sale negativo y, por lo tanto, el ángulo de contacto debe ser mayor que 90°.',
    [
      H('1. Fórmula de Jurin',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho g r}`)),
      H('2. Identifico la incógnita y despejo',P('La incógnita es θ. Multiplico por ρgr y divido por 2γ:')+M(String.raw`h\rho gr=2\gamma\cos\theta`)+M(String.raw`\cos\theta=\frac{h\rho gr}{2\gamma}`)+M(String.raw`\theta=\arccos\left(\frac{h\rho gr}{2\gamma}\right)`)),
      H('3. Convierto los datos',DATA([['Diámetro','d = 1 mm'],['Radio','r = d/2 = 0,5 mm = 0,05 cm'],['Descenso','h = −6,3 mm = −0,63 cm'],['Tensión','γ = 0,05 N/m = 50 dyn/cm'],['Densidad','ρ = 1,1 kg/dm³ = 1,1 g/cm³'],['Gravedad','g = 980 cm/s²']])),
      H('4. Reemplazo en el coseno',M(String.raw`\cos\theta=\frac{(-0.63)(1.1)(980)(0.05)}{2(50)}`)+M(String.raw`\cos\theta=-0.33957`)),
      H('5. Aplico arco coseno',M(String.raw`\theta=\arccos(-0.33957)`)+M(String.raw`\theta=109.85^\circ`)),
      H('6. Resultado',M(String.raw`\boxed{\theta\approx110^\circ}`))
    ],
    '“Como el líquido baja, h tiene signo negativo. Eso me da cos θ negativo; un coseno negativo corresponde a un ángulo mayor que 90°, justo lo que espero para un líquido que no moja bien el capilar.”',
    'El signo es el control más importante. Si hubiéramos usado h positiva, obtendríamos un ángulo agudo y describiríamos ascenso, contradiciendo la consigna.'
  );

  S['4.8'] = GUIDE(
    '<b>Idea central:</b> ambos capilares tienen el mismo radio y el mismo ángulo. En la ley de Jurin, r, cosθ y g se cancelan al dividir una ecuación por la otra. Solo queda la relación γ/ρ.',
    [
      H('1. Escribo Jurin para cada líquido',M(String.raw`h_a=\frac{2\gamma_a\cos\theta}{\rho_a g r}`)+M(String.raw`h_x=\frac{2\gamma_x\cos\theta}{\rho_x g r}`)),
      H('2. Divido miembro a miembro',M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)+P('Despejo hₓ:')+M(String.raw`h_x=h_a\frac{\gamma_x\rho_a}{\gamma_a\rho_x}`)),
      H('3. Datos',DATA([['Altura del agua en la figura','hₐ = 6 mm'],['Agua','γₐ = 72,8 dyn/cm; ρₐ = 1000 kg/m³'],['Líquido','γₓ = 65 dyn/cm; ρₓ = 1300 kg/m³']])),
      H('4. Reemplazo',M(String.raw`h_x=6\frac{65\cdot1000}{72.8\cdot1300}\;\text{mm}`)+M(String.raw`h_x=4.1209\;\text{mm}`)),
      H('5. Resultado',M(String.raw`\boxed{h_x\approx4.1\;\text{mm}}`)+NOTE('La respuesta impresa “4,2 m” es una errata de unidad. La escala de la figura y el cálculo son milímetros.'))
    ],
    '“En vez de volver a calcular todo, comparo las dos ecuaciones. Como radio y ángulo son iguales, desaparecen. La altura depende de γ/ρ: más tensión la aumenta y más densidad la reduce.”',
    'El líquido tiene menor γ y mayor ρ que el agua, así que necesariamente debe alcanzar una altura menor que 6 mm. 4,1 mm cumple esa predicción.'
  );

  S['4.9'] = GUIDE(
    '<b>Idea central:</b> es la misma comparación de Jurin que en 4.8, pero ahora la incógnita es γ del líquido. Conviene partir de la razón y despejar antes de reemplazar.',
    [
      H('1. Relación comparativa',M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x/\rho_x}{\gamma_a/\rho_a}`)),
      H('2. Despejo γₓ',M(String.raw`\frac{h_x}{h_a}=\frac{\gamma_x\rho_a}{\gamma_a\rho_x}`)+M(String.raw`\gamma_x=\gamma_a\frac{h_x\rho_x}{h_a\rho_a}`)),
      H('3. Datos',DATA([['hₓ','7,4 mm'],['hₐ','6 mm'],['γₐ','72,8 dyn/cm'],['ρₓ','1300 kg/m³'],['ρₐ','1000 kg/m³']])),
      H('4. Reemplazo',M(String.raw`\gamma_x=72.8\frac{7.4\cdot1300}{6\cdot1000}`)+M(String.raw`\gamma_x=116.72\;\text{dyn/cm}`)),
      H('5. Resultado',M(String.raw`\boxed{\gamma_x\approx116.7\;\text{dyn/cm}}`))
    ],
    '“Como este líquido es más denso que el agua pero aun así sube más alto, necesita una tensión superficial bastante mayor. Eso ya me anticipa que γ tiene que salir por encima de 72,8 dyn/cm.”',
    'El resultado 116,7 dyn/cm es mayor que el del agua, coherente con la combinación de mayor altura y mayor densidad.'
  );

  S['P1'] = GUIDE(
    '<b>Objetivo:</b> convertir N/m a dyn/cm sin memorizar un número aislado. Derivo la equivalencia desde las unidades de fuerza y longitud.',
    [
      H('1. Equivalencias básicas',M(String.raw`1\;\text{N}=10^5\;\text{dyn}`)+M(String.raw`1\;\text{m}=100\;\text{cm}`)),
      H('2. Construyo la equivalencia de tensión superficial',M(String.raw`1\;\frac{\text{N}}{\text{m}}=\frac{10^5\;\text{dyn}}{100\;\text{cm}}`)+M(String.raw`1\;\frac{\text{N}}{\text{m}}=1000\;\frac{\text{dyn}}{\text{cm}}`)),
      H('3. Aplico a 0,073 N/m',M(String.raw`0.073\;\frac{\text{N}}{\text{m}}\cdot1000=73\;\frac{\text{dyn}}{\text{cm}}`)),
      H('4. Resultado',M(String.raw`\boxed{73\;\text{dyn/cm}}`))
    ],
    '“No cambio solo la fuerza: también cambia el metro del denominador. Por eso N/m a dyn/cm termina multiplicando por mil.”',
    'El agua a temperatura ambiente ronda 72–73 dyn/cm, así que 0,073 N/m → 73 dyn/cm es una conversión muy razonable.'
  );

  S['P2'] = GUIDE(
    '<b>Idea central:</b> una película jabonosa tiene dos superficies libres. Cada una tira sobre la varilla, por eso aparece un factor 2.',
    [
      H('1. Fórmula de tensión superficial',M(String.raw`F=\gamma L_{efectiva}`)),
      H('2. Cuento superficies',P('La varilla mide l = 5 cm. Como la película tiene cara anterior y posterior:')+M(String.raw`L_{efectiva}=2l`)+M(String.raw`L_{efectiva}=2\cdot5=10\;\text{cm}`)),
      H('3. Reemplazo',M(String.raw`F=30\;\frac{\text{dyn}}{\text{cm}}\cdot10\;\text{cm}`)+M(String.raw`F=300\;\text{dyn}`)),
      H('4. Paso opcional a newtons',M(String.raw`F=300\;\text{dyn}\cdot10^{-5}\;\frac{\text{N}}{\text{dyn}}`)+M(String.raw`F=3.00\times10^{-3}\;\text{N}`)),
      H('5. Resultado',M(String.raw`\boxed{F=300\;\text{dyn}=0.003\;\text{N}}`))
    ],
    '“El punto clave es no olvidar que una película tiene dos caras. Si pusiera solo γl me faltaría exactamente un factor dos.”',
    'dyn/cm × cm = dyn. El factor 2 aparece por física, no por conversión de unidades.'
  );

  S['P3'] = GUIDE(
    '<b>Idea central:</b> crear área superficial cuesta energía. Para una sola superficie, el trabajo es tensión superficial por aumento de área.',
    [
      H('1. Fórmula',M(String.raw`W=\gamma\Delta A`)),
      H('2. Datos',DATA([['γ','72 dyn/cm'],['ΔA','12 cm²']])),
      H('3. Reemplazo',M(String.raw`W=72\;\frac{\text{dyn}}{\text{cm}}\cdot12\;\text{cm}^2`)+P('Se simplifica un cm:')+M(String.raw`W=864\;\text{dyn}\cdot\text{cm}`)),
      H('4. Reconozco la unidad de energía CGS',M(String.raw`1\;\text{erg}=1\;\text{dyn}\cdot\text{cm}`)+M(String.raw`W=864\;\text{erg}`)),
      H('5. Paso a joules',M(String.raw`1\;\text{erg}=10^{-7}\;\text{J}`)+M(String.raw`W=864\times10^{-7}\;\text{J}=8.64\times10^{-5}\;\text{J}`)),
      H('6. Resultado',M(String.raw`\boxed{W=864\;\text{erg}=8.64\times10^{-5}\;\text{J}}`))
    ],
    '“La tensión superficial también puede leerse como energía por unidad de área. Por eso, si creo 12 cm² nuevos, multiplico γ por ese aumento de área.”',
    'La unidad dyn/cm × cm² = dyn·cm = erg confirma que estamos calculando energía.'
  );

  S['P4'] = GUIDE(
    '<b>Pregunta conceptual:</b> no hace falta una cuenta; hay que conectar tensión superficial, energía y geometría.',
    [
      H('1. Qué hace la tensión superficial',P('Las moléculas de la superficie tienen mayor energía que las del interior. El sistema tiende espontáneamente a reducir el área superficial para disminuir su energía.')),
      H('2. Relación energética',M(String.raw`E_s=\gamma A`)+P('Si γ es aproximadamente constante, minimizar la energía superficial equivale a minimizar A.')),
      H('3. Qué forma minimiza el área',P('Entre todas las formas que encierran un mismo volumen, la esfera posee el área superficial mínima.')),
      H('4. Conclusión',M(String.raw`\boxed{\text{volumen fijo}\;\Rightarrow\;A_{min}\;\Rightarrow\;\text{forma esférica}}`))
    ],
    '“La gota no ‘elige’ ser redonda por una fuerza hacia el centro como si fuera una pelota elástica. Lo que ocurre es que la tensión superficial reduce el área, y la esfera es la geometría que encierra un volumen con el área mínima.”',
    'La explicación debe mencionar simultáneamente energía superficial y minimización de área; decir solo “por cohesión” queda incompleto.'
  );

  S['P5'] = GUIDE(
    '<b>Idea central:</b> la aguja está sostenida por una sola línea efectiva. En equilibrio, la fuerza de tensión superficial iguala al peso.',
    [
      H('1. Peso de la aguja',DATA([['Masa','m = 0,2 g'],['g','980 cm/s²'],['Longitud efectiva','L = 4 cm']])+M(String.raw`P=mg`)+M(String.raw`P=0.2\cdot980=196\;\text{dyn}`)+NOTE('Si aparece 19.600 dyn para 0,2 g, hay un error de factor 100. En CGS, 1 g·cm/s² = 1 dyn.')),
      H('2. Equilibrio vertical',M(String.raw`F_\gamma=P`)+M(String.raw`\gamma L=mg`)),
      H('3. Despejo γ',M(String.raw`\gamma=\frac{mg}{L}`)),
      H('4. Reemplazo',M(String.raw`\gamma=\frac{196}{4}=49\;\text{dyn/cm}`)),
      H('5. Resultado',M(String.raw`\boxed{\gamma_{min}=49\;\text{dyn/cm}}`))
    ],
    '“Primero calculo el peso correcto en dinas. Como el ejercicio dice una sola línea efectiva, uso L = 4 cm, no 8. La tensión mínima es la que justo produce una fuerza igual a 196 dyn.”',
    'Si γ fuera menor de 49 dyn/cm, γL sería menor que el peso y la aguja no podría quedar sostenida en este modelo.'
  );

  S['P6'] = GUIDE(
    '<b>Idea central:</b> es P5 con dos lados efectivos. El peso no cambia; lo único que cambia es la longitud total sobre la que actúa γ.',
    [
      H('1. Peso',M(String.raw`P=mg=0.2\cdot980=196\;\text{dyn}`)),
      H('2. Longitud efectiva',M(String.raw`L_{efectiva}=2l=2\cdot4=8\;\text{cm}`)),
      H('3. Equilibrio',M(String.raw`\gamma L_{efectiva}=mg`)),
      H('4. Despeje y cálculo',M(String.raw`\gamma=\frac{mg}{L_{efectiva}}`)+M(String.raw`\gamma=\frac{196}{8}=24.5\;\text{dyn/cm}`)),
      H('5. Resultado',M(String.raw`\boxed{\gamma_{min}=24.5\;\text{dyn/cm}}`))
    ],
    '“Al duplicar la longitud que tira, cada centímetro necesita aportar la mitad de fuerza. Por eso la γ mínima se reduce exactamente a la mitad respecto de P5.”',
    'P5 dio 49 dyn/cm y ahora la longitud efectiva se duplicó; obtener 24,5 dyn/cm es el control proporcional inmediato.'
  );

  S['P7'] = GUIDE(
    '<b>Idea central:</b> placa cuadrada sostenida por tensión superficial. Uso la ecuación general de placas e = γP/(ρAg).',
    [
      H('1. Datos',DATA([['Lado','L = 2 cm'],['ρ Al','2,7 g/cm³'],['γ agua','72,8 dyn/cm'],['g','980 cm/s²']])),
      H('2. Geometría',M(String.raw`A=L^2=2^2=4\;\text{cm}^2`)+M(String.raw`P=4L=4\cdot2=8\;\text{cm}`)),
      H('3. Ecuación de equilibrio',M(String.raw`\rho Aeg=\gamma P`)+M(String.raw`e=\frac{\gamma P}{\rho Ag}`)),
      H('4. Reemplazo',M(String.raw`e=\frac{72.8\cdot8}{2.7\cdot4\cdot980}\;\text{cm}`)+M(String.raw`e=0.05503\;\text{cm}`)+M(String.raw`e=0.5503\;\text{mm}`)),
      H('5. Resultado',M(String.raw`\boxed{e_{max}\approx0.55\;\text{mm}}`))
    ],
    '“Calculo área y perímetro por separado: el área entra en el peso; el perímetro en la fuerza superficial. Después despejo el espesor.”',
    'Como el aluminio es mucho menos denso que el hierro, es lógico que pueda sostenerse una chapa más gruesa que en los ejercicios de hierro.'
  );

  S['P8'] = GUIDE(
    '<b>Idea central:</b> para un disco, la fórmula general se simplifica a e = 4γ/(ρgd). Conviene saber de dónde sale para no usarla fuera de contexto.',
    [
      H('1. Parto de la fórmula general',M(String.raw`e=\frac{\gamma P}{\rho Ag}`)),
      H('2. Reemplazo geometría circular',M(String.raw`P=\pi d`)+M(String.raw`A=\frac{\pi d^2}{4}`)+M(String.raw`e=\frac{\gamma\pi d}{\rho\left(\frac{\pi d^2}{4}\right)g}`)),
      H('3. Simplifico',M(String.raw`e=\frac{4\gamma}{\rho gd}`)),
      H('4. Reemplazo datos',M(String.raw`e=\frac{4\cdot40}{5\cdot980\cdot4}\;\text{cm}`)+M(String.raw`e=0.008163\;\text{cm}`)+M(String.raw`e=0.08163\;\text{mm}`)),
      H('5. Resultado',M(String.raw`\boxed{e_{max}\approx0.0816\;\text{mm}}`))
    ],
    '“Uso el atajo circular, pero primero sé que viene de reemplazar P = πd y A = πd²/4 en la ecuación de equilibrio.”',
    'Mayor densidad y menor γ que en el agua deben dar un espesor muy pequeño. El resultado confirma esa tendencia.'
  );

  S['P9'] = GUIDE(
    '<b>Idea central:</b> rectángulo perforado. Igual que en 4.4: el agujero suma perímetro y resta área.',
    [
      H('1. Datos',DATA([['Rectángulo','4 cm × 2 cm'],['Agujero','r = 0,5 cm'],['ρ','3 g/cm³'],['γ','60 dyn/cm'],['g','980 cm/s²']])),
      H('2. Perímetro exterior',M(String.raw`P_{rect}=2(4+2)=12\;\text{cm}`)),
      H('3. Perímetro del agujero',M(String.raw`P_{ag}=2\pi(0.5)=\pi=3.1416\;\text{cm}`)),
      H('4. Perímetro total',M(String.raw`P=12+\pi=15.1416\;\text{cm}`)),
      H('5. Área de material',M(String.raw`A=4\cdot2-\pi(0.5)^2`)+M(String.raw`A=8-0.7854=7.2146\;\text{cm}^2`)),
      H('6. Fórmula y reemplazo',M(String.raw`e=\frac{\gamma P}{\rho Ag}`)+M(String.raw`e=\frac{60\cdot15.1416}{3\cdot7.2146\cdot980}\;\text{cm}`)+M(String.raw`e=0.04283\;\text{cm}=0.4283\;\text{mm}`)),
      H('7. Resultado',M(String.raw`\boxed{e_{max}\approx0.428\;\text{mm}}`))
    ],
    '“No confundo área con perímetro: el hueco resta material, pero su borde sí está en contacto con el líquido y por eso suma fuerza superficial.”',
    'Si accidentalmente sumara el área del agujero o restara su perímetro, estaría modelando exactamente al revés el efecto físico del hueco.'
  );

  S['P10'] = GUIDE(
    '<b>Idea central:</b> ascenso capilar ideal con θ = 0°. Como cos 0° = 1, la fórmula de Jurin se simplifica.',
    [
      H('1. Fórmula de Jurin',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Ángulo de contacto',M(String.raw`\theta=0^\circ\Rightarrow\cos\theta=1`)),
      H('3. Reemplazo',M(String.raw`h=\frac{2\cdot72.8\cdot1}{1\cdot980\cdot0.04}\;\text{cm}`)),
      H('4. Opero denominador y numerador',M(String.raw`2\cdot72.8=145.6`)+M(String.raw`980\cdot0.04=39.2`)+M(String.raw`h=\frac{145.6}{39.2}=3.714\;\text{cm}`)),
      H('5. Resultado',M(String.raw`\boxed{h\approx3.71\;\text{cm}}`))
    ],
    '“En un líquido que moja completamente, θ = 0° y toda la componente de tensión superficial ayuda al ascenso. Aplico Jurin y me da unos 3,7 cm.”',
    'h sale positiva porque cos θ es positivo. Además, con un radio de solo 0,04 cm es razonable obtener varios centímetros de ascenso.'
  );

  S['P11'] = GUIDE(
    '<b>Idea central:</b> no hace falta repetir toda la cuenta. Jurin muestra directamente que, si todo lo demás permanece constante, h es inversamente proporcional al radio.',
    [
      H('1. Ley de Jurin',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Identifico qué permanece constante',P('γ, θ, ρ y g no cambian. Entonces:')+M(String.raw`h\propto\frac{1}{r}`)),
      H('3. El radio se reduce a la mitad',M(String.raw`r_2=\frac{r_1}{2}`)),
      H('4. Comparo alturas',M(String.raw`\frac{h_2}{h_1}=\frac{r_1}{r_2}`)+M(String.raw`\frac{h_2}{h_1}=\frac{r_1}{r_1/2}=2`)+M(String.raw`h_2=2h_1`)),
      H('5. Uso P10',M(String.raw`h_2=2(3.714)=7.428\;\text{cm}`)),
      H('6. Resultado',M(String.raw`\boxed{h_2\approx7.43\;\text{cm}}`))
    ],
    '“Capilar más angosto, ascenso mayor. Si el radio se reduce a la mitad, la altura se duplica exactamente, porque h depende de 1/r.”',
    'La proporcionalidad permite controlar el resultado sin calculadora: debía ser exactamente el doble de P10.'
  );

  S['P12'] = GUIDE(
    '<b>Idea central:</b> con θ = 90° la tensión superficial es horizontal respecto del ascenso neto; su componente vertical es cero.',
    [
      H('1. Jurin',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Evalúo el coseno',M(String.raw`\cos90^\circ=0`)),
      H('3. Sustituyo',M(String.raw`h=\frac{2\gamma(0)}{\rho gr}`)+M(String.raw`h=0`)),
      H('4. Resultado',M(String.raw`\boxed{h=0}`)+P('Idealmente no hay ni ascenso ni descenso capilar.'))
    ],
    '“El cambio de signo de la capilaridad ocurre justamente en 90°. Debajo de 90° asciende; encima de 90° desciende; en 90° la componente vertical es nula.”',
    'No depende de γ, ρ ni r en este caso porque el numerador completo queda multiplicado por cero.'
  );

  S['P13'] = GUIDE(
    '<b>Idea central:</b> el mercurio tiene θ = 140°, así que cos θ es negativo. Jurin debe dar h negativa: eso representa descenso capilar.',
    [
      H('1. Fórmula',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Signo antes de calcular',M(String.raw`\cos140^\circ\approx-0.7660`)+P('Por lo tanto ya sé que h < 0. Si la calculadora diera positivo, revisaría el modo angular o el signo.')),
      H('3. Reemplazo',M(String.raw`h=\frac{2(480)(-0.7660)}{(13.6)(980)(0.05)}\;\text{cm}`)),
      H('4. Numerador y denominador',M(String.raw`2(480)(-0.7660)=-735.36`)+M(String.raw`13.6(980)(0.05)=666.4`)+M(String.raw`h=\frac{-735.36}{666.4}=-1.104\;\text{cm}`)),
      H('5. Interpretación',P('El signo negativo significa descenso. La magnitud es 1,10 cm.')),
      H('6. Resultado',M(String.raw`\boxed{h\approx-1.10\;\text{cm}}`))
    ],
    '“No digo que la altura sea ‘menos un centímetro’ sin explicar: el signo menos codifica que el nivel dentro del capilar queda por debajo del nivel exterior.”',
    'θ > 90° implica cos θ < 0, por lo tanto h debe ser negativa. El resultado cumple el comportamiento conocido del mercurio en vidrio.'
  );

  S['P14'] = GUIDE(
    '<b>Idea central:</b> ahora Jurin se usa al revés: conocemos la altura y buscamos el radio. Despejar bien antes de reemplazar evita errores.',
    [
      H('1. Fórmula',M(String.raw`h=\frac{2\gamma\cos\theta}{\rho gr}`)),
      H('2. Despejo r paso a paso',M(String.raw`h\rho gr=2\gamma\cos\theta`)+M(String.raw`r=\frac{2\gamma\cos\theta}{\rho gh}`)),
      H('3. Evalúo el coseno',M(String.raw`\cos30^\circ=0.8660`)),
      H('4. Reemplazo',M(String.raw`r=\frac{2(50)(0.8660)}{(0.8)(980)(2)}\;\text{cm}`)),
      H('5. Calculo',M(String.raw`r=0.05523\;\text{cm}`)+P('Paso a milímetros:')+M(String.raw`r=0.5523\;\text{mm}`)),
      H('6. Resultado',M(String.raw`\boxed{r\approx0.552\;\text{mm}}`))
    ],
    '“Como me dan h y me piden r, no uso la fórmula de memoria con números metidos: primero hago el despeje algebraico. Después reemplazo.”',
    'Un radio de aproximadamente medio milímetro es compatible con un ascenso de 2 cm para esos valores de γ y densidad.'
  );

  S['P15'] = GUIDE(
    '<b>Idea central:</b> un anillo delgado de radio medio r tiene aproximadamente dos circunferencias de contacto: una interior y una exterior. La longitud total es 4πr.',
    [
      H('1. Longitud de una circunferencia',M(String.raw`C=2\pi r`)),
      H('2. Dos líneas de contacto',M(String.raw`L\approx2C=4\pi r`)),
      H('3. Fuerza superficial',M(String.raw`F=\gamma L`)+M(String.raw`F=4\pi r\gamma`)),
      H('4. Reemplazo',M(String.raw`F=4\pi(1.5)(40)\;\text{dyn}`)+M(String.raw`F=240\pi\;\text{dyn}`)+M(String.raw`F=753.98\;\text{dyn}`)),
      H('5. Resultado',M(String.raw`\boxed{F\approx754\;\text{dyn}}`))
    ],
    '“En el modelo ideal de Du Noüy cuento circunferencia interior más exterior. Eso da aproximadamente 4πr de longitud efectiva.”',
    'γ en dyn/cm por r en cm deja dyn. En un tensiómetro real se corrige la geometría del menisco, pero el ejercicio indica despreciar correcciones.'
  );

  S['P16'] = GUIDE(
    '<b>Idea central:</b> comparación con cuentagotas. Es el mismo razonamiento que 4.6, ahora con otros números.',
    [
      H('1. Relación',M(String.raw`\gamma_x=\gamma_a\frac{\rho_x n_a}{\rho_a n_x}`)),
      H('2. Datos',DATA([['Agua','γₐ = 72,8 dyn/cm; ρₐ = 1 g/cm³; nₐ = 30'],['Líquido','ρₓ = 0,9 g/cm³; nₓ = 50']])),
      H('3. Reemplazo',M(String.raw`\gamma_x=72.8\frac{0.9\cdot30}{1\cdot50}`)),
      H('4. Calculo el factor',M(String.raw`\frac{0.9\cdot30}{50}=0.54`)+M(String.raw`\gamma_x=72.8(0.54)=39.312\;\text{dyn/cm}`)),
      H('5. Resultado',M(String.raw`\boxed{\gamma_x\approx39.3\;\text{dyn/cm}}`))
    ],
    '“Cincuenta gotas frente a treinta, para el mismo volumen y con menor densidad, apunta a una tensión superficial menor que la del agua. La fórmula confirma 39,3 dyn/cm.”',
    'El resultado es menor que 72,8 dyn/cm, consistente con el mayor número de gotas y la menor densidad del líquido.'
  );

  S['P17'] = GUIDE(
    '<b>Idea central:</b> distinguir error absoluto, relativo y porcentual. El dato (72 ± 2) dyn/cm ya nos da directamente el error absoluto.',
    [
      H('1. Identifico valor y error absoluto',M(String.raw`\gamma=72\;\text{dyn/cm}`)+M(String.raw`\Delta\gamma=2\;\text{dyn/cm}`)),
      H('2. Fórmula de error relativo',M(String.raw`e_{rel}=\frac{\Delta\gamma}{\gamma}`)),
      H('3. Reemplazo',M(String.raw`e_{rel}=\frac{2}{72}=0.027777\ldots`)+M(String.raw`e_{rel}\approx0.0278`)),
      H('4. Error porcentual',M(String.raw`e_{\%}=100\,e_{rel}`)+M(String.raw`e_{\%}=100(0.027777\ldots)=2.7777\ldots\%`)),
      H('5. Resultado',M(String.raw`\boxed{e_{rel}\approx0.0278}`)+M(String.raw`\boxed{e_{\%}\approx2.78\%}`))
    ],
    '“El ±2 tiene unidades y es el error absoluto. Cuando lo divido por 72, las unidades se cancelan y obtengo el error relativo. Multiplicando por cien lo expreso como porcentaje.”',
    'El error relativo debe ser adimensional. Si quedaran dyn/cm después de dividir, la operación estaría mal interpretada.'
  );

  S['P18'] = GUIDE(
    '<b>Idea central:</b> para γ = F/L, una estimación conservadora de incertidumbre máxima suma los errores relativos de numerador y denominador.',
    [
      H('1. Datos medidos',DATA([['Fuerza','F = (300 ± 6) dyn'],['Longitud','L = (5,0 ± 0,1) cm']])),
      H('2. Valor central de γ',M(String.raw`\gamma=\frac{F}{L}`)+M(String.raw`\gamma=\frac{300}{5.0}=60.0\;\text{dyn/cm}`)),
      H('3. Error relativo de F',M(String.raw`e_F=\frac{\Delta F}{F}`)+M(String.raw`e_F=\frac{6}{300}=0.020`)),
      H('4. Error relativo de L',M(String.raw`e_L=\frac{\Delta L}{L}`)+M(String.raw`e_L=\frac{0.1}{5.0}=0.020`)),
      H('5. Incertidumbre relativa máxima del cociente',P('En la aproximación de peor caso para productos y cocientes:')+M(String.raw`e_\gamma\approx e_F+e_L`)+M(String.raw`e_\gamma=0.020+0.020=0.040`)),
      H('6. Paso de relativo a absoluto',M(String.raw`\Delta\gamma=e_\gamma\gamma`)+M(String.raw`\Delta\gamma=0.040(60.0)=2.4\;\text{dyn/cm}`)),
      H('7. Informo la medición completa',M(String.raw`\boxed{\gamma=(60.0\pm2.4)\;\text{dyn/cm}}`))
    ],
    '“Primero calculo el valor central. Después convierto cada incertidumbre a relativa. Como γ es un cociente y me piden una estimación máxima, sumo los errores relativos; al final vuelvo a error absoluto multiplicando por γ.”',
    'Ambas mediciones tienen 2% de error relativo; el peor caso da 4% en γ. El 4% de 60 es 2,4, así que el cierre es consistente.'
  );

  function isAdminPhysicsView(){
    const pill=document.querySelector('.pill');
    const title=document.querySelector('.unitHero h1');
    return Boolean(pill && pill.textContent.trim()==='Administrador' && title && title.textContent.trim()==='Física Aplicada');
  }

  function exerciseKey(card){
    const title=card.querySelector('.exerciseHead h3')?.textContent||'';
    return title.split('·')[0].trim();
  }

  function renderMath(root,attempt=0){
    const nodes=[...root.querySelectorAll('[data-admin-math]')].filter(n=>!n.dataset.rendered);
    if(!nodes.length)return;
    if(!window.katex){
      if(attempt<30)setTimeout(()=>renderMath(root,attempt+1),120);
      return;
    }
    nodes.forEach(node=>{
      const latex=decodeURIComponent(node.dataset.adminMath||'');
      try{
        window.katex.render(latex,node,{displayMode:true,throwOnError:false,strict:'ignore'});
        node.dataset.rendered='1';
      }catch(err){
        node.textContent=latex;
      }
    });
  }

  function ensureStyles(){
    if(document.getElementById('adminPhysicsGuideStyles'))return;
    const style=document.createElement('style');
    style.id='adminPhysicsGuideStyles';
    style.textContent=`
      html.adminPhysicsGuide .exerciseCard>.solutionCard{display:none!important}
      .adminPhysicsSolution{margin:18px 0 0;border:2px solid color-mix(in srgb,var(--accent,#0f9f9a) 52%,#ffffff);border-radius:20px;overflow:hidden;background:color-mix(in srgb,var(--accent,#0f9f9a) 4%,var(--card,#fff));box-shadow:0 10px 30px rgba(0,0,0,.04)}
      .adminPhysicsSolution>summary{cursor:pointer;list-style:none;padding:16px 18px;font-weight:900;display:flex;gap:10px;align-items:center;background:color-mix(in srgb,var(--accent,#0f9f9a) 10%,var(--card,#fff));border-bottom:1px solid color-mix(in srgb,var(--accent,#0f9f9a) 20%,transparent)}
      .adminPhysicsSolution>summary::-webkit-details-marker{display:none}
      .adminPhysicsSolution>summary:before{content:'ADMIN';font-size:10px;letter-spacing:.12em;padding:4px 7px;border-radius:999px;background:var(--accent,#0f9f9a);color:white}
      .adminGuideBody{padding:18px;display:grid;gap:14px}
      .adminIntro,.adminNote,.adminCheck,.adminSay{padding:14px 16px;border-radius:14px;line-height:1.55}
      .adminIntro{background:color-mix(in srgb,var(--accent,#0f9f9a) 8%,transparent)}
      .adminNote{background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.28)}
      .adminCheck{background:rgba(34,197,94,.09);border:1px solid rgba(34,197,94,.22)}
      .adminSay{background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.20)}
      .adminStep{padding:15px 16px;border:1px solid var(--line,#dceaea);border-radius:16px;background:var(--card,#fff)}
      .adminStep h4{margin:0 0 10px;font-size:15px}
      .adminStep p{margin:8px 0;line-height:1.6}
      .adminFormula{margin:10px 0;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent,#0f9f9a) 5%,var(--bg,#fff));overflow-x:auto;text-align:center}
      .adminFormula .katex-display{margin:.25em 0;overflow-x:auto;overflow-y:hidden}
      .adminData{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:10px 0}
      .adminData>div{padding:10px 12px;border-radius:12px;border:1px solid var(--line,#dceaea);display:grid;gap:3px}
      .adminData span{font-size:11px;opacity:.68;text-transform:uppercase;letter-spacing:.05em}
      .adminData b{font-size:14px}
      @media(max-width:680px){.adminGuideBody{padding:12px}.adminStep{padding:13px}.adminFormula{margin:8px -3px;padding:9px 6px}.adminData{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  let scheduled=false;
  function refresh(){
    scheduled=false;
    ensureStyles();
    const active=isAdminPhysicsView();
    document.documentElement.classList.toggle('adminPhysicsGuide',active);
    if(!active){
      document.querySelectorAll('[data-admin-guide]').forEach(x=>x.remove());
      return;
    }
    document.querySelectorAll('.exerciseCard').forEach(card=>{
      if(card.querySelector('[data-admin-guide]'))return;
      const key=exerciseKey(card);
      const body=S[key];
      if(!body)return;
      const details=document.createElement('details');
      details.className='adminPhysicsSolution';
      details.open=true;
      details.dataset.adminGuide=key;
      details.innerHTML=`<summary>Guion docente hiperdesarrollado · ${key}</summary>${body}`;
      card.appendChild(details);
      renderMath(details);
    });
  }

  function scheduleRefresh(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(refresh);
  }

  const observer=new MutationObserver(scheduleRefresh);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleRefresh);
  else scheduleRefresh();
})();
