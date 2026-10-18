// 27xSOLved · Química Analítica Cualitativa 5.º — machete fijo lateral: tablas de constantes del apéndice.
// Las mismas tablas en todas las secciones (y en la vista Para la clase).
// Cada tabla: {id, chip, title, cols:[...], rows:[[...]], note}. Filas vacías = tabla pendiente de cargar.
(function(){
  'use strict';
  const data=window.ET27_QAC5;if(!data)return;
  const T=[
    {id:'t1',chip:'1 · Ácidos',title:'Tabla 1 · Constantes de disociación de ácidos a 25 °C',formula:true,cols:['Ácido','Fórmula','Ka₁','Ka₂','Ka₃'],rows:[]},
    {id:'t2',chip:'2 · Bases',title:'Tabla 2 · Constantes de disociación de bases a 25 °C',formula:true,cols:['Base','Fórmula','Kb'],rows:[]},
    {id:'t3',chip:'3 · Fuertes',title:'Tabla 3 · Ácidos y bases fuertes más frecuentes',formula:true,cols:['Especie','Tipo'],rows:[...['HCl','HBr','HI','HClO₄','HNO₃'].map(x=>[x,'ácido fuerte']),...['LiOH','NaOH','KOH','RbOH','CsOH','Ca(OH)₂','Sr(OH)₂','Ba(OH)₂'].map(x=>[x,'base fuerte'])]},
    {id:'t4',chip:'4 · Indicadores',title:'Tabla 4 · Indicadores ácido-base',cols:['Indicador','Forma ácida','Forma básica','pKa','Viraje (pH)'],rows:[
      ['Azul de timol','Rojo','Amarillo','1,65','1,2 – 2,8'],
      ['Amarillo de metilo','Rojo','Amarillo','3,2','2,9 – 4,0'],
      ['Anaranjado de metilo','Rojo','Amarillo','3,4','3,1 – 4,4'],
      ['Verde de bromocresol','Amarillo','Azul','4,9','3,8 – 5,4'],
      ['Rojo de metilo','Rojo','Amarillo','5,0','4,2 – 6,2'],
      ['Azul de bromotimol','Amarillo','Azul','7,3','6,0 – 7,6'],
      ['Rojo de fenol','Amarillo','Rojo','8,0','6,4 – 8,0'],
      ['Fenolftaleína','Incoloro','Púrpura','9,1','8,3 – 10,0'],
      ['Amarillo de alizarina','Amarillo','Violeta','11,0','10,1 – 12,0']]},
    {id:'t5',chip:'5 · Kps',title:'Tabla 5 · Sales poco solubles (Kps)',formula:true,cols:['Sal','Fórmula','Kps'],rows:[],note:'Datos a temperaturas próximas a la ambiente (18 a 25 °C). Sulfuros: para un equilibrio del tipo MS(s) + H₂O ⇌ M²⁺ + HS⁻ + OH⁻.'},
    {id:'t6',chip:'6 · E°',title:'Tabla 6 · Potenciales de reducción estándar',cols:['Hemirreacción','E° (V)'],rows:[],note:'Todos los iones en disolución acuosa y el H₂O líquida.'},
    {id:'t7',chip:'pKa ampliada',title:'Tabla ampliada · Ka y pKa de ácidos y bases conjugadas',formula:true,cols:['Ácido','Fórmula','Ka','pKa','Base conjugada'],rows:[]}
  ];
  data.tables=T;
  // Mismo machete (tablas) en todas las secciones.
  data.machete={};
  (data.units||[]).forEach(u=>{data.machete[u.id]='tablas'});
})();
