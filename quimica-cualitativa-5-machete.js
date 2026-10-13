// 27xSOLved · Química Analítica Cualitativa 5.º — machete fijo de cada sección (debajo del índice).
// Ítems: [rótulo, latex] para fórmulas o [rótulo, {t:'texto'}] para datos.
(function(){
  'use strict';
  const data=window.ET27_QAC5;if(!data)return;
  const R=String.raw;
  const T=t=>({t});
  const criterios={title:'Criterios',items:[['Justificar desprecio',R`\frac{C}{K}>100`],['Verificar desprecio',T('≤ 5 % de la especie respecto de la cual se despreció')],['Precipitación completa',T('queda ≤ 10⁻⁵ M')]]};
  const agua={title:'Agua y pH (25 °C)',items:[['Kw',R`[\mathrm{H_3O^+}][\mathrm{HO^-}]=10^{-14}`],['pH',R`-\log[\mathrm{H_3O^+}]`],['Volver',R`[\mathrm{H_3O^+}]=10^{-\mathrm{pH}}`],['Suma',R`\mathrm{pH}+\mathrm{pOH}=\mathrm{p}K_w=14`],['Par conjugado',R`K_aK_b=K_w`],['pKb de una base',R`\mathrm{p}K_b=14-\mathrm{p}K_a`]]};
  data.machete={
    'acido-base':[
      agua,
      {title:'Fuertes (memorizar)',items:[['Ácidos',T('HCl, HBr, HI, HNO₃, HClO₄, HClO₃, H₂SO₄ (1.er H)')],['Bases',T('LiOH, NaOH, KOH, RbOH, CsOH, Ca(OH)₂, Sr(OH)₂, Ba(OH)₂')]]},
      {title:'Débiles · Ka y Kb',items:[['HAc (acético)',T('Ka 1,8·10⁻⁵ · pKa 4,74')],['HCOOH (fórmico)',T('Ka 1,8·10⁻⁴ · pKa 3,74')],['HF',T('Ka 6,8·10⁻⁴ · pKa 3,17')],['HNO₂',T('Ka 4,5·10⁻⁴ · pKa 3,35')],['HClO',T('Ka 3,0·10⁻⁸ · pKa 7,52')],['HCN',T('Ka 4,9·10⁻¹⁰ · pKa 9,31')],['NH₄⁺',T('Ka 5,6·10⁻¹⁰ · pKa 9,26')],['NH₃',T('Kb 1,8·10⁻⁵ · pKb 4,74')],['CH₃NH₂',T('Kb 4,4·10⁻⁴ · pKb 3,36')],['Piridina',T('Kb 1,7·10⁻⁹ · pKb 8,77')]]},
      {title:'Débiles',items:[['Ley de acción de masas',R`K_a=\frac{[\mathrm{A^-}][\mathrm{H_3O^+}]}{[\mathrm{HA}]}`],['Grado',R`\alpha=\frac{[\mathrm{A^-}]}{C}`],['Ostwald',R`K_a=\frac{\alpha^2C}{1-\alpha}`],['Cuadrática',R`x=\frac{-K+\sqrt{K^2+4KC}}{2}`],['Muy diluido',R`[\mathrm{H_3O^+}]=\sqrt{K_a[\mathrm{HA}]+K_w}`]]},
      criterios
    ],
    'acido-base-2':[
      {title:'Polipróticos · Ka',items:[['H₂S',T('9,5·10⁻⁸ · 1·10⁻¹⁹ (Tabla 1)')],['H₂CO₃',T('4,3·10⁻⁷ · 5,6·10⁻¹¹')],['H₃PO₄',T('7,5·10⁻³ · 6,2·10⁻⁸ · 4,2·10⁻¹³')],['H₃AsO₄',T('5,6·10⁻³ · 1,0·10⁻⁷ · 3,0·10⁻¹²')],['H₂SO₄',T('fuerte · 1,2·10⁻²')],['H₂SO₃',T('1,7·10⁻² · 6,4·10⁻⁸')],['Oxálico',T('5,9·10⁻² · 6,4·10⁻⁵')],['Ascórbico',T('8,0·10⁻⁵ · 1,6·10⁻¹²')]]},
      {title:'Especiación',items:[['Monoprótico',R`\alpha_{\mathrm{A^-}}=\frac{K_a}{K_a+[\mathrm{H_3O^+}]}`],['Diprótico',R`D=h^2+K_1h+K_1K_2`],['Fracciones',R`\alpha_0=\tfrac{h^2}{D}\ \ \alpha_1=\tfrac{K_1h}{D}\ \ \alpha_2=\tfrac{K_1K_2}{D}`],['Cruce',T('pH = pKa → α = 0,5')],['Dibujo',T('pKa ± 2 (≈ 1 %)')],['Regulación',T('pKa ± 1')]]},
      {title:'Polipróticos y sales',items:[['Constante total',R`K=K_{a1}K_{a2}`],['Sulfuro libre',R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}`],['Hidrólisis anión',R`K_h=\frac{K_w}{K_a}`],['Hidrólisis catión',R`K_h=\frac{K_w}{K_b}`],['Anfiprótico',R`\mathrm{pH}\approx\tfrac12(\mathrm{p}K_{a1}+\mathrm{p}K_{a2})`],['Sal débil-débil',R`\mathrm{pH}=\tfrac12(\mathrm{p}K_w+\mathrm{p}K_a-\mathrm{p}K_b)`]]},
      agua,criterios
    ],
    'buffer':[
      {title:'Henderson',items:[['Fórmula',R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{C_s}{C_a}`],['Con moles',R`\mathrm{pH}=\mathrm{p}K_a+\log\frac{n_{base}}{n_{ácido}}`],['Supone',T('[H₃O⁺], [HO⁻] bajas respecto de Cₐ y Cₛ (ion común)')],['Relación',R`\frac{C_s}{C_a}=10^{\,\mathrm{pH}-\mathrm{p}K_a}`],['Sin Henderson',R`K_a=\frac{h\,(C_s+h)}{C_a-h}`]]},
      {title:'Criterios',items:[['Rango útil',T('pH = pKa ± 1')],['Máxima capacidad',T('Cₐ = Cₛ → pH = pKa')],['Base débil',R`\mathrm{p}K_a(\mathrm{BH^+})=14-\mathrm{p}K_b`],['Agregados',T('1.º estequiometría, 2.º Henderson')]]},
      {title:'Pares frecuentes · pKa',items:[['HAc / Ac⁻',T('4,74')],['H₂CO₃ / HCO₃⁻',T('6,36')],['H₂PO₄⁻ / HPO₄²⁻',T('7,20')],['H₃BO₃ / H₂BO₃⁻',T('9,14')],['NH₄⁺ / NH₃',T('9,26')],['HCO₃⁻ / CO₃²⁻',T('10,25')]]},
      criterios
    ],
    'precipitacion':[
      {title:'Kps y solubilidad',items:[['Kps general',R`K_{ps}=[\mathrm{A}]^m[\mathrm{B}]^n`],['En agua',R`K_{ps}=m^mn^ns^{m+n}`],['AB',R`s=\sqrt{K_{ps}}`],['AB₂',R`s=\sqrt[3]{K_{ps}/4}`],['AB₃',R`s=\sqrt[4]{K_{ps}/27}`],['¿Precipita?',T('Q > Kps sí · Q < Kps no')],['Mezclas',R`C'=\frac{CV}{V_{total}}`]]},
      {title:'Con pH',items:[['Hidróxidos',R`[\mathrm{HO^-}]=\sqrt[n]{K_{ps}/[\mathrm{M}]}`],['Sulfuros',R`[\mathrm{S^{2-}}]=\frac{K_{a1}K_{a2}[\mathrm{H_2S}]}{[\mathrm{H_3O^+}]^2}`],['H₂S saturado',T('0,1 M')]]},
      {title:'Kps (25 °C)',items:[['AgCl',T('1,8·10⁻¹⁰')],['AgBr',T('5,0·10⁻¹³')],['AgI',T('8,3·10⁻¹⁷')],['Ag₂CrO₄',T('1,1·10⁻¹² (guía: 9·10⁻¹²)')],['PbCl₂',T('1,7·10⁻⁵')],['PbI₂',T('7,1·10⁻⁹')],['BaSO₄',T('1,1·10⁻¹⁰')],['CaF₂',T('3,9·10⁻¹¹')],['Mg(OH)₂',T('1,8·10⁻¹¹')],['Fe(OH)₃',T('4·10⁻³⁸')],['CuS',T('6,3·10⁻³⁶')],['FeS',T('6,3·10⁻¹⁸')]]},
      criterios
    ],
    'redox':[
      {title:'Pilas',items:[['Fórmula 1',R`E^\circ=E^\circ_{cát}-E^\circ_{án}`],['Fórmula 2',R`\Delta G^\circ=-nFE^\circ`],['F',T('96 500 C/mol')],['Espontánea',T('E° > 0 · ΔG° < 0')],['Ánodo / cátodo',T('oxidación (−) / reducción (+)')]]},
      {title:'Nernst y equilibrio',items:[['Hemirreacción',R`E=E^\circ-\frac{0{,}0592}{n}\log\frac{[\mathrm{Red}]}{[\mathrm{Ox}]}`],['Pila',R`E=E^\circ-\frac{0{,}0592}{n}\log Q`],['Equilibrio',T('E = 0 · E₁ = E₂ · Q = K')],['Despeje',R`\log K=\frac{nE^\circ}{0{,}0592}`],['0,0592',T('= 2,303 RT/F a 25 °C')]]},
      {title:'E° (V)',items:[['MnO₄⁻/Mn²⁺',T('+1,51')],['Ce⁴⁺/Ce³⁺',T('+1,61')],['Cl₂/Cl⁻',T('+1,36')],['Cr₂O₇²⁻/Cr³⁺',T('+1,33')],['Hg²⁺/Hg',T('+0,85')],['Ag⁺/Ag',T('+0,80')],['Fe³⁺/Fe²⁺',T('+0,77')],['I₂/I⁻',T('+0,54')],['Cu²⁺/Cu',T('+0,34')],['AgCl/Ag',T('+0,22')],['Sn⁴⁺/Sn²⁺',T('+0,15')],['H⁺/H₂',T('0,00')],['Pb²⁺/Pb',T('−0,13')],['Ni²⁺/Ni',T('−0,25')],['Fe²⁺/Fe',T('−0,44')],['Zn²⁺/Zn',T('−0,76')]]}
    ],
    'complejos':[
      {title:'Constantes',items:[['Formación',R`K_f=\frac{[\mathrm{ML_n}]}{[\mathrm{M}][\mathrm{L}]^n}`],['Inestabilidad',R`K_i=K_d=\frac{1}{K_f}`],['Metal libre',R`[\mathrm{M}]=\frac{[\mathrm{ML_n}]}{K_f[\mathrm{L}]^n}`],['Ligando libre',R`[\mathrm{L}]=C_L-nC_M`],['Ligando total',T('libre + n·(complejo)')],['Fracción libre',R`\alpha_{\mathrm{M}}=\frac{1}{1+K_f[\mathrm{L}]^n}`]]},
      {title:'Combinados',items:[['Sumar reacciones',T('se multiplican las K')],['Disolver precipitado',R`K=K_{ps}\cdot K_f`],['Romper con ácido',R`K=\frac{K_i}{K_a^{\,n}}`]]},
      {title:'Kf',items:[['[Ag(NH₃)₂]⁺',T('1,7·10⁷ (Ki 5,9·10⁻⁸)')],['[Cu(NH₃)₄]²⁺',T('1,1·10¹³')],['[Zn(NH₃)₄]²⁺',T('2,9·10⁹')],['[Ag(S₂O₃)₂]³⁻',T('2,9·10¹³')],['[Ag(CN)₂]⁻',T('1·10²¹')],['[Fe(SCN)]²⁺',T('1,4·10²')]]},
      criterios
    ]
  };
  data.machete['clase']=null;
})();
