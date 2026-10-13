// 27xSOLved · Química Analítica Cualitativa 5.º · UNIDAD 5 · Equilibrios simultáneos
// Cómo combinar equilibrios (sumar reacciones = multiplicar K), precipitación + ácido-base, precipitación + complejos,
// complejos + ácido-base, redox + precipitación o complejos. Siempre: suponer, justificar y verificar.
(function(){
  'use strict';
  const K=window.ET27Kit,Q=window.ET27QI,A=window.ET27QAC;if(!K||!Q||!A||!window.ET27_QAC5)return;
  const {M,m,chain,key,sym,simple,idea,warn,note,deep,example,step,table,figure,cards,calc,field}=K;
  const {rx,rxs,f,punch,facts}=Q;
  const {sup,ver,flow,memo,spec}=A;
  const R=String.raw;
  const s=[];const add=(k,l,kk,h)=>s.push({key:`qac-u5-${k}`,label:l,kicker:kk,html:h});

  // =====================================================================
  add('estrategia','Cómo se combinan los equilibrios','SIMULTÁNEOS · 01',`
<p>En la realidad del laboratorio los equilibrios no aparecen solos: un precipitado se disuelve en ácido, un complejo se rompe al acidificar, un potencial cambia porque el ion precipita. Esta unidad junta todo lo anterior con una sola herramienta nueva:</p>
${punch('Si una reacción es la suma de otras, su constante es el PRODUCTO de sus constantes. Si se invierte una reacción, su constante se invierte (1/K).')}
${table(['Operación con la reacción','Qué le pasa a K'],[['Sumar dos reacciones','K = K₁·K₂'],['Invertir la reacción','K → 1/K'],['Multiplicar la reacción por n','K → Kⁿ'],['Restar una reacción','dividir por su K']])}
${flow([
 ['Escribir la reacción GLOBAL que pide el problema','Por ejemplo: AgCl(s) + 2 NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻.'],
 ['Descomponerla en equilibrios de tabla','Kps, Ka, Kb, Kf (o Ki), Kw.'],
 ['Calcular K global','Multiplicando y dividiendo según corresponda.'],
 ['Interpretar K global','K ≫ 1: la reacción global ocurre (el precipitado se disuelve, el complejo se rompe…). K ≪ 1: no ocurre.'],
 ['Si piden concentraciones: tabla con la reacción global','Y las suposiciones de siempre (lo que es chico frente a lo grande), justificadas y verificadas.']
])}
${table(['Combinación','Ejemplo','K global'],[
 ['Precipitación + ácido-base','CaCO₃(s) + 2 H⁺ ⇌ Ca²⁺ + H₂CO₃','Kps / (Ka₁·Ka₂)'],
 ['Precipitación + complejo','AgCl(s) + 2 NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻','Kps · Kf'],
 ['Complejo + ácido-base','[Ag(NH₃)₂]⁺ + 2 H⁺ ⇌ Ag⁺ + 2 NH₄⁺','Ki / Ka(NH₄⁺)²'],
 ['Redox + precipitación','AgCl(s) + e⁻ ⇌ Ag(s) + Cl⁻','E° nuevo = E°(Ag⁺/Ag) + 0,0592·log Kps']
],'compareTable')}
`);

  // =====================================================================
  add('precip-acido','Precipitación + ácido-base','SIMULTÁNEOS · 02',`
<p>Si el anión del precipitado es la base conjugada de un ácido débil, el H⁺ se lo “roba” y el sólido se disuelve más. Si es un hidróxido, el pH fija directamente [OH⁻].</p>
${example('¿Se disuelve el CaCO₃ en ácido? (con K global)','<p>Kps CaCO₃ = 4,5·10⁻⁹ · Ka₁ = 4,3·10⁻⁷ · Ka₂ = 5,6·10⁻¹¹ del H₂CO₃.</p>',
 step('1. Reacción global y su descomposición',rxs(['CaCO3(s) <=> Ca^2+ + CO3^2-','Kps'],['CO3^2- + H^+ <=> HCO3^-','1/Ka₂'],['HCO3^- + H^+ <=> H2CO3','1/Ka₁'],['CaCO3(s) + 2 H^+ <=> Ca^2+ + H2CO3','suma']))+
 step('2. K global',chain(R`K=\frac{K_{ps}}{K_{a1}K_{a2}}=\frac{4{,}5\times10^{-9}}{4{,}3\times10^{-7}\cdot5{,}6\times10^{-11}}=1{,}9\times10^{8}`))+
 step('3. Interpretar',`<p>K ≫ 1: el carbonato se disuelve en ácido. Además el H₂CO₃ se descompone en CO₂ + H₂O y el gas se escapa, lo que tira todavía más el equilibrio hacia la derecha.</p>`),
 'K = 1,9·10⁸: el CaCO₃ se disuelve en ácidos (con efervescencia)')}
${example('Solubilidad del CaF₂ en una solución regulada a pH 2,00','<p>Kps CaF₂ = 3,9·10⁻¹¹ · Ka HF = 6,8·10⁻⁴. Comparar con la solubilidad en agua (2,1·10⁻⁴ M).</p>',
 step('1. Qué cambia respecto del agua',`<p>El F⁻ que se disuelve se reparte entre F⁻ y HF. Sólo el F⁻ libre entra en el Kps. Usamos la fracción del diagrama de especiación.</p>`)+
 step('2. Suponemos',sup([['[H⁺] = 1,0·10⁻² M constante','la solución está <b>regulada</b>: el buffer absorbe los H⁺ que consume el F⁻ al protonarse.']]))+
 step('3. Fracción de F⁻ libre',chain([R`\alpha_{\mathrm{F^-}}=\frac{K_a}{K_a+[\mathrm{H^+}]}=\frac{6{,}8\times10^{-4}}{6{,}8\times10^{-4}+10^{-2}}=0{,}064`,'sólo el 6,4 % del fluoruro queda como F⁻']))+
 step('4. Balance de masa y Kps',chain([R`[\mathrm{Ca^{2+}}]=s\qquad[\mathrm{F^-}]+[\mathrm{HF}]=2s\ \Rightarrow\ [\mathrm{F^-}]=2s\,\alpha_{\mathrm{F^-}}`,''],R`K_{ps}=s\,(2s\,\alpha)^2=4\alpha^2s^3`,R`s=\sqrt[3]{\frac{3{,}9\times10^{-11}}{4\cdot(0{,}064)^2}}=1{,}3\times10^{-3}\ \mathrm{M}`)),
 's = 1,3·10⁻³ M: unas 6 veces más soluble que en agua')}
${example('Mg(OH)₂ a pH 9,00 (regulado)','<p>¿Cuánto Mg²⁺ puede quedar en solución a pH 9 sin que precipite? Kps = 1,8·10⁻¹¹.</p>',
 step('Con el pH fijo, [OH⁻] es dato',chain(R`[\mathrm{OH^-}]=10^{-5}\ \mathrm{M}`,R`[\mathrm{Mg^{2+}}]_{\text{máx}}=\frac{1{,}8\times10^{-11}}{(10^{-5})^2}=0{,}18\ \mathrm{M}`)),
 'Hasta 0,18 M de Mg²⁺ a pH 9: por eso en el buffer amoniacal el Mg no precipita')}
${idea('Regla cualitativa para el laboratorio','<ul><li>Se disuelven en ácidos: carbonatos, sulfitos, sulfuros (los más solubles), fosfatos, fluoruros, oxalatos, cromatos, hidróxidos.</li><li>No se disuelven en ácidos (sus aniones vienen de ácidos fuertes): cloruros, bromuros, yoduros, sulfatos.</li></ul>')}
`);

  // =====================================================================
  add('precip-complejo','Precipitación + complejos','SIMULTÁNEOS · 03',`
<p>Si el catión del precipitado forma un complejo estable con un ligando, al agregar ese ligando baja el catión libre, Q cae por debajo del Kps y el sólido se disuelve.</p>
${rxs(['AgCl(s) <=> Ag^+ + Cl^-','Kps = 1,8·10⁻¹⁰'],['Ag^+ + 2 NH3 <=> [Ag(NH3)2]^+','Kf = 1,7·10⁷'],['AgCl(s) + 2 NH3 <=> [Ag(NH3)2]^+ + Cl^-','K = Kps·Kf = 3,1·10⁻³'])}
${example('Solubilidad del AgCl en NH₃ 1,0 M','<p>Calcular s y compararla con la del agua (1,34·10⁻⁵ M).</p>',
 step('1. Tabla con la reacción global',table(['M','NH₃','[Ag(NH₃)₂]⁺','Cl⁻'],[['Inicio','1,0','0','0'],['Se disuelve s','−2s','+s','+s'],['Equilibrio','1,0 − 2s','s','s']]))+
 step('2. Suponemos',sup([['Toda la plata disuelta está como complejo ([Ag(NH₃)₂⁺] = s)','Kf es grande y hay mucho NH₃: el Ag⁺ libre es despreciable (lo verificamos).']]))+
 step('3. Resolvemos',chain([R`3{,}06\times10^{-3}=\frac{s\cdot s}{(1{,}0-2s)^2}\ \Rightarrow\ \frac{s}{1{,}0-2s}=\sqrt{3{,}06\times10^{-3}}=0{,}0553`,'raíz cuadrada de los dos lados: no hace falta la cuadrática'],R`s=\frac{0{,}0553}{1+2\cdot0{,}0553}=0{,}050\ \mathrm{M}`))+
 step('4. Verificamos',ver('<p>'+m(R`[\mathrm{Ag^+}]=\frac{K_{ps}}{[\mathrm{Cl^-}]}=\frac{1{,}8\times10^{-10}}{0{,}050}=3{,}6\times10^{-9}\ \mathrm{M}`)+', despreciable frente a 0,050 M de complejo ✔. NH₃ libre = 0,90 M (sigue en exceso) ✔.</p>')),
 's = 0,050 M: unas 3700 veces más soluble que en agua')}
${table(['Haluro','Kps','K = Kps·Kf','s en NH₃ 1 M','¿Se disuelve?'],[['AgCl','1,8·10⁻¹⁰','3,1·10⁻³','5,0·10⁻² M','sí'],['AgBr','5,0·10⁻¹³','8,5·10⁻⁶','2,9·10⁻³ M','poco'],['AgI','8,3·10⁻¹⁷','1,4·10⁻⁹','3,8·10⁻⁵ M','prácticamente no']])}
${idea('Esto se usa en la marcha','<p>Con NH₃ se disuelve el AgCl del grupo I y queda el Hg₂Cl₂ (que con NH₃ se ennegrece). Y con la tabla se entiende por qué para disolver AgI hace falta un ligando mucho más fuerte, como el CN⁻ o el S₂O₃²⁻ (Kf enormes).</p>')}
${example('¿Cuánto amoníaco hace falta para disolver un precipitado?','<p>¿Qué concentración total de NH₃ se necesita para disolver 0,010 mol de AgCl en 1,0 L?</p>',
 step('1. Si se disuelve todo',chain(R`[\mathrm{Ag(NH_3)_2^+}]=[\mathrm{Cl^-}]=0{,}010\ \mathrm{M}`))+
 step('2. NH₃ libre necesario',chain(R`[\mathrm{NH_3}]=\frac{0{,}010}{\sqrt{3{,}06\times10^{-3}}}=0{,}18\ \mathrm{M}`))+
 step('3. Total',chain([R`C_{\mathrm{NH_3}}=0{,}18+2\cdot0{,}010=0{,}20\ \mathrm{M}`,'libre + el que está en el complejo'])),
 'Hace falta NH₃ 0,20 M en total (el mismo patrón que en la Unidad 3)')}
`);

  // =====================================================================
  add('complejo-acido','Complejos + ácido-base','SIMULTÁNEOS · 04',`
<p>Si el ligando es una base (NH₃, CN⁻, OH⁻, F⁻), el H⁺ compite con el metal por él. Al acidificar, el ligando se protona y el complejo se destruye.</p>
${rxs(['[Ag(NH3)2]^+ <=> Ag^+ + 2 NH3','Ki = 5,9·10⁻⁸'],['2 NH3 + 2 H^+ <=> 2 NH4^+','(1/Ka)², Ka(NH₄⁺) = 5,6·10⁻¹⁰'],['[Ag(NH3)2]^+ + 2 H^+ <=> Ag^+ + 2 NH4^+','K = Ki/Ka²'])}
${chain([R`K=\frac{K_i}{K_a^2}=\frac{5{,}9\times10^{-8}}{(5{,}6\times10^{-10})^2}=1{,}9\times10^{11}`,'≫ 1: el complejo se destruye en medio ácido'])}
${example('La prueba confirmatoria de la plata','<p>Al acidificar con HNO₃ la solución amoniacal del grupo I (que tiene [Ag(NH₃)₂]⁺ y Cl⁻), reaparece un precipitado blanco. Justificar con la constante global.</p>',
 step('1. Reacción global',rx('[Ag(NH3)2]^+ + Cl^- + 2 H^+ -> AgCl(s)↓ + 2 NH4^+'))+
 step('2. Descomposición',rxs(['[Ag(NH3)2]^+ + 2 H^+ <=> Ag^+ + 2 NH4^+','1,9·10¹¹'],['Ag^+ + Cl^- <=> AgCl(s)','1/Kps = 5,6·10⁹']))+
 step('3. K global',chain(R`K=\frac{1{,}9\times10^{11}}{1{,}8\times10^{-10}}=1{,}1\times10^{21}`)),
 'K ≈ 10²¹: la reprecipitación del AgCl es prácticamente completa — confirma la plata')}
${idea('Anfóteros: el otro lado de la misma idea','<p>Al(OH)₃, Zn(OH)₂, Pb(OH)₂ y Sn(OH)₂ se disuelven en exceso de OH⁻ porque forman hidroxocomplejos ('+f('[Al(OH)4]^-')+', '+f('[Zn(OH)4]^2-')+'). Con ácido se redisuelven como cationes. El Fe(OH)₃ no forma ese complejo: así se separa Fe de Al y Zn con NaOH en exceso.</p>')}
`);

  // =====================================================================
  add('redox-otro','Redox + precipitación y redox + complejos','SIMULTÁNEOS · 05',`
<p>Si el ion de un par redox precipita o forma un complejo, su concentración libre baja muchísimo y, por Nernst, <b>el potencial cambia</b>. Se puede calcular un “E° nuevo” para el par con el sólido o el complejo.</p>
${example('E° del electrodo AgCl/Ag','<p>Calcular el E° de AgCl(s) + e⁻ → Ag(s) + Cl⁻, sabiendo que E°(Ag⁺/Ag) = 0,80 V y Kps AgCl = 1,8·10⁻¹⁰.</p>',
 step('1. Nernst del par de la plata',chain(R`E=0{,}80-0{,}0592\log\frac{1}{[\mathrm{Ag^+}]}=0{,}80+0{,}0592\log[\mathrm{Ag^+}]`))+
 step('2. La plata libre la fija el Kps',chain(R`[\mathrm{Ag^+}]=\frac{K_{ps}}{[\mathrm{Cl^-}]}`,R`E=0{,}80+0{,}0592\log K_{ps}-0{,}0592\log[\mathrm{Cl^-}]`))+
 step('3. “Estándar” del nuevo par: [Cl⁻] = 1 M',chain(R`E^\circ(\mathrm{AgCl/Ag})=0{,}80+0{,}0592\log(1{,}8\times10^{-10})=0{,}80-0{,}577=0{,}22\ \mathrm{V}`))+
 ver('<p>El valor tabulado es 0,222 V ✔. Es el electrodo de referencia de plata–cloruro de plata que se usa en los pH-metros.</p>'),
 'E°(AgCl/Ag) = 0,22 V: la plata es mucho peor oxidante cuando está precipitada')}
${example('E° del complejo amoniacal de plata','<p>Calcular el E° de [Ag(NH₃)₂]⁺ + e⁻ → Ag + 2 NH₃ (Ki = 5,9·10⁻⁸).</p>',
 step('Mismo razonamiento, con el complejo',chain(R`[\mathrm{Ag^+}]=K_i\frac{[\mathrm{Ag(NH_3)_2^+}]}{[\mathrm{NH_3}]^2}\ \xrightarrow{\ \text{todo 1 M}\ }\ [\mathrm{Ag^+}]=K_i`,R`E^\circ=0{,}80+0{,}0592\log(5{,}9\times10^{-8})=0{,}37\ \mathrm{V}`)),
 'E° = 0,37 V (tabulado 0,373 V ✔)')}
${punch('Precipitar o complejar la forma OXIDADA baja el potencial (el par se vuelve peor oxidante). Hacerlo con la forma REDUCIDA lo sube.')}
${idea('Redox + ácido-base','<p>Ya lo viste en la Unidad 4: cuando hay H⁺ en la hemirreacción (MnO₄⁻, Cr₂O₇²⁻, NO₃⁻), el potencial depende del pH. Por eso los oxidantes oxigenados se usan en medio ácido.</p>')}
`);

  // =====================================================================
  add('repaso','Repaso de equilibrios simultáneos','SIMULTÁNEOS · REPASO',`
${cards([
 ['Regla','Si sumo dos reacciones, ¿qué hago con las K?','Las multiplico. Si invierto una reacción, uso 1/K.'],
 ['Prec. + ácido','K global de CaCO₃ + 2H⁺ ⇌ Ca²⁺ + H₂CO₃','Kps/(Ka₁·Ka₂) ≈ 1,9·10⁸: se disuelve.'],
 ['Prec. + ácido','¿Por qué el AgCl no se disuelve en HNO₃?','El Cl⁻ es base conjugada de un ácido fuerte: no se protona.'],
 ['Prec. + complejo','K de AgCl + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻','Kps·Kf ≈ 3·10⁻³.'],
 ['Prec. + complejo','¿Por qué el AgI no se disuelve en NH₃?','Su Kps es tan chico que Kps·Kf ≈ 10⁻⁹.'],
 ['Complejo + ácido','¿Qué pasa con [Ag(NH₃)₂]⁺ al agregar HNO₃?','El NH₃ pasa a NH₄⁺, el complejo se rompe (K ≈ 10¹¹) y, si hay Cl⁻, precipita AgCl.'],
 ['Redox + prec.','E° del par AgCl/Ag','0,80 + 0,0592·log Kps = 0,22 V.'],
 ['Redox + complejo','Complejar la forma oxidada… ¿sube o baja E?','Lo baja: el par se vuelve peor oxidante.']
])}
`);

  window.ET27_QAC5.units.push({id:'u5',n:5,title:'Equilibrios simultáneos',short:'Simultáneos',lead:'Todo junto: sumar reacciones es multiplicar constantes. Precipitados que se disuelven en ácido o con complejantes, complejos que se rompen al acidificar y potenciales que cambian cuando el ion precipita o se compleja.',sections:s});
})();
