// 27xSOLved · Química Inorgánica 4.º · BANCOS DE MULTIPLE CHOICE DE LOS TP
// Preguntas teóricas (observaciones, ecuaciones, propiedades, conceptos), sin cuentas.
// Formato: {t: tema, q: pregunta, o: [[opción, por qué está bien o mal], …], c: índice de la correcta,
//           r: qué repasar, k: key de la sección}. El orden de las opciones se mezcla al mostrarlas.
(function(){
  'use strict';
  const Z=window.ET27QIQuiz;if(!Z)return;

  // =====================================================================
  // TP 1 · REACCIONES QUÍMICAS
  // =====================================================================
  Z.add('tp1',{topics:{
    CL:{name:'Clasificación y ecuaciones',c:'#c2366f'},
    C1:{name:'Clase 1: combinación y descomposición',c:'#7957c8'},
    C2:{name:'Clase 2: desplazamiento',c:'#2e8a7c'},
    RX:{name:'Redox, electrolitos e indicadores',c:'#b07a10'}
  },questions:[
    {t:'CL',q:'¿Cuál de estas observaciones NO alcanza por sí sola para afirmar que hubo una reacción química?',o:[
      ['Un sólido amarillo que se disuelve al calentar y reaparece al enfriar','Es un cambio de solubilidad con la temperatura (PbI₂): un cambio físico, la sustancia es la misma.'],
      ['La aparición de un precipitado al mezclar dos soluciones transparentes','Un sólido nuevo que se forma al mezclar soluciones indica una sustancia nueva.'],
      ['Efervescencia al agregar un ácido a un sólido','El gas que se libera es una sustancia nueva (por ejemplo CO₂ o H₂).'],
      ['Un cambio de color permanente al agregar un reactivo','Un cambio de color suele indicar una especie nueva.']],c:0,r:'Transformaciones y ecuaciones',k:'qi-tp1-intro'},
    {t:'CL',q:'La reacción Zn + CuSO₄ → ZnSO₄ + Cu se clasifica como:',o:[
      ['Desplazamiento simple y redox','Un elemento desplaza a otro de su compuesto, y para eso hay transferencia de electrones.'],
      ['Doble desplazamiento','En el doble desplazamiento intercambian iones dos compuestos; acá reacciona un elemento.'],
      ['Combinación','La combinación une dos sustancias en una sola; acá hay dos productos.'],
      ['Neutralización','No hay ácido ni base.']],c:0,r:'Clasificación de las reacciones',k:'qi-tp1-clasificacion'},
    {t:'CL',q:'¿Qué afirmación sobre los desplazamientos es correcta?',o:[
      ['Los simples son siempre redox y los dobles nunca','En el simple un elemento pasa a ion (cambia su n.o.); en el doble sólo se intercambian iones.'],
      ['Los dobles son siempre redox','En el doble desplazamiento ningún elemento cambia su número de oxidación.'],
      ['Ninguno de los dos es redox','El simple lo es: Zn 0 → +2, Cu +2 → 0.'],
      ['Sólo son redox si se forma un gas','Zn + HCl forma un gas y es redox, pero Cu + AgNO₃ no forma gas y también lo es.']],c:0,r:'Clasificación de las reacciones',k:'qi-tp1-clasificacion'},
    {t:'CL',q:'En la ecuación Pb(NO₃)₂(ac) + 2 KI(ac) → PbI₂(s) + 2 KNO₃(ac), los iones espectadores son:',o:[
      ['K⁺ y NO₃⁻','Están disueltos igual antes y después: no participan.'],
      ['Pb²⁺ e I⁻','Son justamente los que reaccionan y forman el precipitado.'],
      ['Pb²⁺ y NO₃⁻','El Pb²⁺ pasa a formar parte del sólido.'],
      ['No hay espectadores','En toda doble sustitución en solución hay iones que quedan igual.']],c:0,r:'Ecuación molecular e iónica neta',k:'qi-tp1-intro'},
    {t:'CL',q:'¿Qué indica el símbolo (ac) al lado de una fórmula?',o:[
      ['Que la sustancia está disuelta en agua','“Acuoso”: es lo mismo que (aq) en los textos en inglés.'],
      ['Que es un ácido','Una base o una sal disuelta también llevan (ac).'],
      ['Que la sustancia es un gas','Para gas se usa (g).'],
      ['Que se calienta','El calor se indica con Δ sobre la flecha.']],c:0,r:'Transformaciones y ecuaciones',k:'qi-tp1-intro'},
    {t:'C1',q:'En el ensayo demostrativo, al acercar un gotero de amoníaco a uno de HCl concentrado se ve un humo blanco. ¿Qué es?',o:[
      ['Partículas sólidas de NH₄Cl formadas por la combinación de los dos gases','NH₃(g) + HCl(g) → NH₄Cl(s): el sólido finísimo queda suspendido en el aire.'],
      ['Vapor de agua que se condensa','No se forma agua en esta reacción.'],
      ['Cloro gaseoso','El cloro es amarillo verdoso y no se forma acá.'],
      ['Gotitas de los líquidos que se mezclan','La guía pide expulsar sólo los gases: los líquidos no se tocan.']],c:0,r:'Clase 1 · ensayo 1.1',k:'qi-tp1-c1'},
    {t:'C1',q:'Al calentar dicromato de amonio, ¿qué queda en el crisol?',o:[
      ['Un polvo verde muy voluminoso de Cr₂O₃','(NH₄)₂Cr₂O₇ → Cr₂O₃ + N₂ + 4 H₂O; los gases inflan el óxido verde.'],
      ['Un sólido blanco de NH₄Cl','Eso pasaría con cloruro de amonio, no con el dicromato.'],
      ['Cristales naranjas sin cambio','El naranja es el reactivo: se transforma por completo.'],
      ['Gotitas plateadas de cromo','El cromo no queda como metal: queda como óxido de cromo(III).']],c:0,r:'Clase 1 · ensayo 1.2',k:'qi-tp1-c1'},
    {t:'C1',q:'¿Por qué la descomposición del dicromato de amonio es además una redox?',o:[
      ['Porque el N del amonio se oxida (−3 → 0) y el Cr se reduce (+6 → +3)','Es una redox interna: oxidante y reductor están en el mismo compuesto.'],
      ['Porque interviene el oxígeno del aire','No hace falta el aire: el compuesto se descompone solo.'],
      ['Porque se forma agua','Formar agua no implica redox; el H sigue en +1.'],
      ['No es redox, es sólo descomposición','Hay cambios de número de oxidación en N y Cr.']],c:0,r:'Clase 1 · ensayo 1.2',k:'qi-tp1-c1'},
    {t:'C1',q:'El residuo de la combustión del magnesio, en agua con fenolftaleína, se pone fucsia porque:',o:[
      ['El MgO es un óxido básico que con agua forma Mg(OH)₂','Los OH⁻ del hidróxido ponen fucsia al indicador.'],
      ['El MgO es un óxido ácido','Los óxidos de metales son básicos.'],
      ['Quedó magnesio sin reaccionar','El Mg metálico no es lo que vira el indicador.'],
      ['La fenolftaleína se oxida con el calor','El residuo se enfría antes; el color depende del pH.']],c:0,r:'Clase 1 · ensayo 2.1',k:'qi-tp1-c1'},
    {t:'C1',q:'¿Por qué la guía indica NO mirar directamente el magnesio mientras arde?',o:[
      ['Porque emite una luz blanca muy intensa que puede dañar la vista','La combustión del Mg es muy exotérmica y libera mucha luz, incluso ultravioleta.'],
      ['Porque libera un gas tóxico','El producto es MgO, un sólido blanco.'],
      ['Porque puede explotar','Arde intensamente, pero no explota.'],
      ['Porque salpica ácido','No hay ácido en este ensayo.']],c:0,r:'Clase 1 · ensayo 2.1',k:'qi-tp1-c1'},
    {t:'C1',q:'Al calentar HgO, la astilla con punto de ignición se reaviva. ¿Qué demuestra?',o:[
      ['Que se desprende O₂, que es comburente','2 HgO → 2 Hg + O₂; el oxígeno aviva la combustión.'],
      ['Que se desprende H₂, que es combustible','No hay hidrógeno en el HgO; el H₂ “ladra”, no reaviva una brasa.'],
      ['Que el mercurio es inflamable','El mercurio se ve como gotitas plateadas; no arde.'],
      ['Que se forma CO₂','El CO₂ apagaría la astilla.']],c:0,r:'Clase 1 · ensayo 2.2',k:'qi-tp1-c1'},
    {t:'C1',q:'La descomposición del HgO es endotérmica. ¿Cómo se nota en el ensayo?',o:[
      ['Hay que calentar todo el tiempo: si se retira el mechero, se detiene','Necesita absorber calor para avanzar.'],
      ['El tubo se enfría solo','No: se calienta con el mechero.'],
      ['Se produce una llama brillante','Eso sería una reacción exotérmica como la del Mg.'],
      ['El sólido se pone rojo al calentar','Al calentar se oscurece; el rojo vuelve al enfriar.']],c:0,r:'Clasificación según la energía',k:'qi-tp1-clasificacion'},
    {t:'C2',q:'Al dejar un alambre de cobre en AgNO₃, ¿qué se observa?',o:[
      ['Cristales plateados sobre el alambre y la solución que se pone celeste','Se deposita Ag y pasa Cu²⁺ (celeste) a la solución.'],
      ['Burbujas de hidrógeno','No hay ácido: no se libera H₂.'],
      ['Un precipitado blanco de AgCl','No hay cloruro en el tubo.'],
      ['Nada: el cobre no reacciona con sales de plata','Sí reacciona: el Cu es más reductor que la Ag.']],c:0,r:'Clase 2 · ensayo 1.1',k:'qi-tp1-c2'},
    {t:'C2',q:'¿Por qué el cobre desplaza a la plata pero no reacciona con HCl?',o:[
      ['Porque su potencial de reducción (+0,34 V) está entre el del H⁺ (0 V) y el de la Ag⁺ (+0,80 V)','El Ag⁺ es mejor oxidante que el Cu²⁺; el H⁺ no alcanza a oxidar al cobre.'],
      ['Porque el HCl es un ácido débil','El HCl es un ácido fuerte; el problema es el potencial.'],
      ['Porque el cobre es más reductor que el zinc','Es al revés: el zinc es más reductor y por eso sí reacciona con HCl.'],
      ['Porque el AgNO₃ está más concentrado','La concentración no cambia cuál metal es más activo.']],c:0,r:'Desplazamiento simple: quién desplaza a quién',k:'qi-tp1-clasificacion'},
    {t:'C2',q:'La ecuación iónica neta de Zn + HCl es:',o:[
      ['Zn + 2 H⁺ → Zn²⁺ + H₂','Los Cl⁻ son espectadores.'],
      ['Zn + 2 Cl⁻ → ZnCl₂','El ZnCl₂ es soluble: queda como iones.'],
      ['Zn²⁺ + H₂ → Zn + 2 H⁺','Está escrita al revés.'],
      ['Zn + HCl → ZnH + Cl','No se forma hidruro de zinc.']],c:0,r:'Clase 2 · ensayo 1.2',k:'qi-tp1-c2'},
    {t:'C2',q:'En la neutralización con fenolftaleína, al agregar HCl el tubo se entibia. Eso indica que:',o:[
      ['La neutralización es exotérmica','H⁺ + OH⁻ → H₂O libera calor.'],
      ['La fenolftaleína se descompone','El indicador sólo cambia de color.'],
      ['Se desprende un gas','No hay burbujas en la neutralización.'],
      ['La reacción es endotérmica','En una endotérmica el tubo se enfriaría.']],c:0,r:'Clase 2 · ensayo 2.1',k:'qi-tp1-c2'},
    {t:'C2',q:'El precipitado amarillo que se forma con KI y Pb(NO₃)₂ es:',o:[
      ['PbI₂, ioduro plumboso','Pb²⁺ + 2 I⁻ → PbI₂(s).'],
      ['KNO₃','El nitrato de potasio es soluble y queda disuelto.'],
      ['I₂, iodo','No hay redox: el ioduro no se oxida.'],
      ['Pb metálico','El plomo no se reduce en esta reacción.']],c:0,r:'Clase 2 · ensayo 2.2',k:'qi-tp1-c2'},
    {t:'C2',q:'Al agregar HCl gota a gota al Na₂CO₃, las primeras gotas casi no producen burbujas. ¿Por qué?',o:[
      ['Porque primero el carbonato se transforma en bicarbonato, sin liberar gas','CO₃²⁻ + H⁺ → HCO₃⁻; recién después HCO₃⁻ + H⁺ → H₂O + CO₂.'],
      ['Porque el CO₂ es muy soluble y no se ve','El CO₂ sale en cuanto se forma ácido carbónico.'],
      ['Porque el HCl tiene que calentarse primero','La reacción ocurre en frío.'],
      ['Porque el gas que se forma es hidrógeno, que no burbujea','El gas es CO₂, y cualquier gas burbujea.']],c:0,r:'Clase 2 · ensayo 2.3',k:'qi-tp1-c2'},
    {t:'RX',q:'En Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag, el agente oxidante es:',o:[
      ['Ag⁺','Gana electrones (se reduce): por eso es el oxidante.'],
      ['Cu','El cobre se oxida: es el reductor.'],
      ['Cu²⁺','Es el producto de la oxidación.'],
      ['Ag','Es el producto de la reducción.']],c:0,r:'La tabla de una redox',k:'qi-tp1-clasificacion'},
    {t:'RX',q:'¿Cómo se escribe la disociación de un electrolito débil como el ácido acético?',o:[
      ['Con doble flecha ⇌, porque se disocia parcialmente','Coexisten moléculas sin disociar e iones.'],
      ['Con flecha simple →, porque se disocia totalmente','Eso es para los electrolitos fuertes, como el HCl.'],
      ['No se escribe: no forma iones','Eso corresponde a un no electrolito, como la glucosa.'],
      ['Con dos flechas hacia la derecha','No existe esa notación.']],c:0,r:'Electrolitos, ionización y flechas',k:'qi-tp1-electrolitos'},
    {t:'RX',q:'¿Qué diferencia hay entre disociación e ionización?',o:[
      ['En la disociación un compuesto iónico separa los iones que ya tenía; en la ionización una molécula forma iones al reaccionar con el agua','NaCl se disocia; HCl se ioniza (HCl + H₂O → H₃O⁺ + Cl⁻).'],
      ['Son sinónimos','Describen procesos distintos.'],
      ['La ionización sólo ocurre en gases','Ocurre en solución acuosa.'],
      ['La disociación es siempre parcial','Las sales solubles se disocian totalmente.']],c:0,r:'Electrolitos, ionización y flechas',k:'qi-tp1-electrolitos'},
    {t:'RX',q:'La fenolftaleína en una solución es incolora. ¿Qué se puede concluir?',o:[
      ['Que el pH es menor que ≈ 8: el medio es ácido o neutro (o apenas básico)','La fenolftaleína vira a fucsia recién entre pH 8 y 10.'],
      ['Que el medio es ácido, seguro','También es incolora en agua pura (neutra).'],
      ['Que el medio es básico','En medio básico es fucsia.'],
      ['Que no hay iones en la solución','El indicador no detecta iones en general.']],c:0,r:'Indicadores: la fenolftaleína',k:'qi-tp1-electrolitos'}
  ]});

  // =====================================================================
  // TP 2 · COMPLEJOS
  // =====================================================================
  Z.add('tp2',{topics:{
    ES:{name:'Estructura, carga y geometría',c:'#7957c8'},
    NO:{name:'Nomenclatura',c:'#c2366f'},
    EN:{name:'Ensayos del TP',c:'#2e8a7c'},
    EQ:{name:'Intercambio de ligandos y equilibrios',c:'#b07a10'}
  },questions:[
    {t:'ES',q:'En un complejo, el ligando actúa como:',o:[
      ['Base de Lewis: dona un par de electrones al metal','El enlace metal–ligando es covalente coordinado.'],
      ['Ácido de Lewis: acepta electrones del metal','Ese es el papel del ion metálico central.'],
      ['Oxidante del metal','No hay transferencia de electrones: se comparte un par.'],
      ['Espectador sin unión química','Está unido al metal: es parte del ion complejo.']],c:0,r:'¿Qué es un complejo?',k:'qi-tp2-que-es'},
    {t:'ES',q:'¿Cuál es la carga del ion [Fe(CN)₆] si el hierro es Fe³⁺?',o:[
      ['3−','+3 + 6·(−1) = −3.'],
      ['3+','Falta sumar la carga de los seis CN⁻.'],
      ['6−','Falta sumar la carga del hierro.'],
      ['0','Sólo sería neutro con tres ligandos de carga −1.']],c:0,r:'La carga del complejo',k:'qi-tp2-que-es'},
    {t:'ES',q:'El número de coordinación de un complejo es:',o:[
      ['La cantidad de enlaces que forma el metal central con los ligandos','En [Cu(NH₃)₄]²⁺ es 4; en [Co(H₂O)₆]²⁺, 6.'],
      ['El número de oxidación del metal','Son cosas distintas: en [Co(H₂O)₆]²⁺ el n.o. es +2 y la coordinación, 6.'],
      ['La carga total del complejo','La carga puede ser 0 aunque haya varios ligandos.'],
      ['La cantidad de complejos que se forman','No mide cantidad de sustancia.']],c:0,r:'¿Qué es un complejo?',k:'qi-tp2-que-es'},
    {t:'ES',q:'¿Qué geometría tienen el [Co(H₂O)₆]²⁺ y el [CoCl₄]²⁻, respectivamente?',o:[
      ['Octaédrica y tetraédrica','6 ligandos → octaedro; 4 Cl⁻ alrededor del Co²⁺ → tetraedro.'],
      ['Tetraédrica y octaédrica','Está invertido.'],
      ['Las dos octaédricas','El complejo con cloruro tiene sólo 4 ligandos.'],
      ['Lineal y cuadrado plana','Lineal es con 2 ligandos, como [Ag(NH₃)₂]⁺.']],c:0,r:'Ejercicio C3',k:'qi-tp2-resueltos'},
    {t:'ES',q:'¿Por qué una solución de CuSO₄ es celeste?',o:[
      ['Porque el Cu²⁺ está rodeado de agua: es el acuocomplejo [Cu(H₂O)₄]²⁺','El color depende de los ligandos; con NH₃ pasa a azul intenso.'],
      ['Por el ion sulfato','El sulfato es incoloro.'],
      ['Porque el cobre está como metal','El cobre metálico es rojizo y no se disuelve en agua.'],
      ['Porque tiene amoníaco disuelto','El celeste aparece sin amoníaco.']],c:0,r:'Ningún catión está “desnudo” en agua',k:'qi-tp2-que-es'},
    {t:'NO',q:'¿Cómo se nombra [Cu(NH₃)₄]SO₄?',o:[
      ['Sulfato de tetraammincobre(II)','Primero el anión (sulfato) y después el catión complejo.'],
      ['Tetraammincuprato(II) de sulfato','El “-ato” va sólo cuando el complejo es un anión.'],
      ['Sulfato cúprico amoniacal','Es un nombre tradicional, no el del complejo.'],
      ['Tetraamminsulfato de cobre(II)','El sulfato no es ligando en este compuesto: está fuera del corchete.']],c:0,r:'Ligandos y nomenclatura',k:'qi-tp2-nomenclatura'},
    {t:'NO',q:'¿En cuál de estos complejos el metal termina en “-ato”?',o:[
      ['[Zn(OH)₄]²⁻','Es un anión: tetrahidroxozincato(II).'],
      ['[Cu(NH₃)₄]²⁺','Es un catión: tetraammincobre(II).'],
      ['[Fe(SCN)₃]','Es neutro: tritiocianatohierro(III), sin “-ato”.'],
      ['[Ag(NH₃)₂]⁺','Es un catión: diamminplata(I).']],c:0,r:'Reglas para nombrar',k:'qi-tp2-nomenclatura'},
    {t:'NO',q:'K₃[Fe(CN)₆] se llama:',o:[
      ['Hexacianoferrato(III) de potasio','x − 6 = −3 → Fe(III); anión → “ferrato”.'],
      ['Hexacianoferrato(II) de potasio','Ese es el K₄[Fe(CN)₆].'],
      ['Cianuro de hierro y potasio','No indica la estructura del complejo.'],
      ['Hexacianohierro(III) de potasio','El complejo es un anión: debe terminar en “-ato”.']],c:0,r:'Ligandos y nomenclatura',k:'qi-tp2-nomenclatura'},
    {t:'NO',q:'¿Cuál es el nombre del ligando NH₃ dentro de un complejo?',o:[
      ['Ammin (en clase también “amin”)','tetraammincobre(II) o tetramincobre(II).'],
      ['Amonio','El amonio es NH₄⁺, que no tiene par libre para coordinar.'],
      ['Amino','“Amino” es el grupo –NH₂ en química orgánica.'],
      ['Nitro','Nitro es el ligando NO₂⁻.']],c:0,r:'Ligandos y nomenclatura',k:'qi-tp2-nomenclatura'},
    {t:'NO',q:'¿Cuál es la fórmula del tetraclorocuprato(II) de sodio?',o:[
      ['Na₂[CuCl₄]','+2 − 4 = −2: hacen falta 2 Na⁺.'],
      ['Na[CuCl₄]','La carga del complejo es 2−, no 1−.'],
      ['[CuCl₄]Na₂Cl','Sobra un cloruro.'],
      ['Na₄[CuCl₄]','Habría 4 cargas positivas para 2 negativas.']],c:0,r:'Ejercicio C2',k:'qi-tp2-resueltos'},
    {t:'NO',q:'¿Qué error tiene el nombre “trioxalatoferrato(III)” para [Fe(C₂O₄)₃]⁴⁻?',o:[
      ['El hierro es Fe(II): x − 6 = −4','Con carga 4−, el n.o. es +2: trioxalatoferrato(II).'],
      ['Debería terminar en “hierro” y no en “ferrato”','Es un anión, así que “ferrato” está bien.'],
      ['El oxalato no puede ser ligando','El oxalato es un ligando muy común.'],
      ['No tiene ningún error','La carga no cierra con Fe(III).']],c:0,r:'Correcciones a la lista de clase',k:'qi-tp2-intercambio'},
    {t:'EN',q:'Al agregar gotas de CuSO₄ sobre amoníaco concentrado, la solución se pone:',o:[
      ['Azul intenso, por el [Cu(NH₃)₄]²⁺','El NH₃ en exceso reemplaza al agua alrededor del Cu²⁺.'],
      ['Verde, por el [CuCl₄]²⁻','No hay cloruro: ese complejo es el del TP 4 con HCl.'],
      ['Rojo sangre','Ese es el color del complejo de hierro con tiocianato.'],
      ['Incolora','El complejo amoniacal de cobre tiene un color muy intenso.']],c:0,r:'Ensayos · tubo 1',k:'qi-tp2-ensayos'},
    {t:'EN',q:'¿Para qué sirve la reacción de FeCl₃ con KSCN?',o:[
      ['Para reconocer el ion Fe³⁺ por el color rojo sangre','Se usa también en el TP 4 para mostrar que el O₂ oxidó el Fe²⁺.'],
      ['Para reconocer el ion cloruro','El cloruro se reconoce con AgNO₃.'],
      ['Para obtener hierro metálico','No hay reducción del hierro.'],
      ['Para reconocer el potasio','El potasio se reconoce a la llama (violeta).']],c:0,r:'Ensayos · tubo 2',k:'qi-tp2-ensayos'},
    {t:'EN',q:'El precipitado que se forma al mezclar AgNO₃ con cromato de potasio es:',o:[
      ['Ag₂CrO₄, rojo ladrillo','2 Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s).'],
      ['AgCl, blanco','No hay cloruro en el tubo.'],
      ['KNO₃, blanco','El nitrato de potasio es soluble.'],
      ['Ag metálica, negra','No hay reducción de la plata.']],c:0,r:'Ensayos · experiencia 2',k:'qi-tp2-ensayos'},
    {t:'EN',q:'Al agregar NH₃ concentrado al Ag₂CrO₄, el precipitado se disuelve y la solución queda amarilla. El amarillo se debe a:',o:[
      ['El ion cromato que quedó libre en la solución','El [Ag(NH₃)₂]⁺ es incoloro; el CrO₄²⁻ es amarillo.'],
      ['El complejo diamminplata(I)','Es incoloro.'],
      ['Que se formó iodo','No hay ioduro en el tubo.'],
      ['Que la plata se oxidó','La plata sigue como Ag⁺.']],c:0,r:'Ejercicio C5',k:'qi-tp2-resueltos'},
    {t:'EN',q:'Una sal de cobalto(II) disuelta en HCl concentrado se ve azul. Al agregar agua se pone rosa. ¿Qué pasó?',o:[
      ['El agua desplazó al cloruro: [CoCl₄]²⁻ (azul) volvió a [Co(H₂O)₆]²⁺ (rosa)','Es un intercambio de ligandos en equilibrio.'],
      ['El cobalto se redujo','No cambia el n.o.: sigue siendo Co²⁺.'],
      ['Precipitó hidróxido de cobalto','No hay base que forme hidróxido.'],
      ['El HCl se evaporó','El cambio es inmediato y depende de cuánta agua se agrega.']],c:0,r:'Ensayos · experiencia 3',k:'qi-tp2-ensayos'},
    {t:'EQ',q:'¿Por qué un precipitado de AgCl o Ag₂CrO₄ se disuelve con amoníaco?',o:[
      ['El NH₃ captura el Ag⁺ en un complejo estable y el equilibrio de solubilidad se desplaza hacia la disolución','Le Chatelier: al bajar [Ag⁺] libre, el sólido sigue disolviéndose.'],
      ['El NH₃ es un ácido que disuelve sales','El NH₃ es una base.'],
      ['El NH₃ oxida a la plata','No hay cambio de n.o.'],
      ['Porque el amoníaco calienta la solución','No es un efecto de la temperatura.']],c:0,r:'Un precipitado que se disuelve por formar un complejo',k:'qi-tp2-intercambio'},
    {t:'EQ',q:'Si el Cl⁻ está después del H₂O en la tabla de prioridad, ¿cómo puede formar [CoCl₄]²⁻ en agua?',o:[
      ['Porque está en gran exceso (HCl concentrado) y desplaza el equilibrio','La concentración puede ganarle a la estabilidad; al diluir, gana el agua.'],
      ['Porque el HCl oxida al cobalto','El cobalto sigue siendo Co²⁺.'],
      ['Porque la tabla de prioridad está al revés','La tabla es correcta como regla general.'],
      ['Porque el agua se evapora','No se calienta ni se evapora agua.']],c:0,r:'Intercambio de ligandos',k:'qi-tp2-intercambio'},
    {t:'EQ',q:'La formación del [CoCl₄]²⁻ (azul) a partir del [Co(H₂O)₆]²⁺ (rosa) es endotérmica. Al calentar la solución violeta:',o:[
      ['Se pone más azul','Al calentar se favorece el sentido endotérmico.'],
      ['Se pone más rosa','Eso pasa al enfriar.'],
      ['Se decolora','Las dos especies tienen color.'],
      ['No cambia','La temperatura desplaza el equilibrio.']],c:0,r:'Ejercicio C6',k:'qi-tp2-resueltos'},
    {t:'EQ',q:'Según la tabla de la cátedra, ¿cuál de estos ligandos forma complejos más estables?',o:[
      ['CN⁻','Encabeza la lista: CN⁻ > NH₃ > F⁻ > SCN⁻ > OH⁻ > H₂O > Cl⁻.'],
      ['H₂O','Está casi al final: casi cualquier ligando lo desplaza.'],
      ['Cl⁻','Es el último de la lista.'],
      ['OH⁻','Está por debajo de CN⁻, NH₃, F⁻ y SCN⁻.']],c:0,r:'Intercambio de ligandos',k:'qi-tp2-intercambio'}
  ]});

  // =====================================================================
  // TP 4 · HIDRÓGENO, OXÍGENO Y GRUPOS 1 Y 2
  // =====================================================================
  Z.add('tp4',{topics:{
    H:{name:'Hidrógeno e hidruros',c:'#3f6aa8'},
    O:{name:'Oxígeno y agua oxigenada',c:'#c2366f'},
    M:{name:'Metales de los grupos 1 y 2',c:'#b07a10'},
    AG:{name:'Agua: hidratos, complejos, hidrólisis',c:'#2e8a7c'}
  },questions:[
    {t:'H',q:'¿Por qué el hidrógeno se recoge por desplazamiento de agua en la cuba hidroneumática?',o:[
      ['Porque es casi insoluble en agua','El gas desplaza el agua sin disolverse.'],
      ['Porque es más denso que el agua','Ningún gas es más denso que el agua líquida.'],
      ['Porque reacciona con el agua','Si reaccionara, no se podría recoger así.'],
      ['Porque es muy soluble en agua','Un gas muy soluble (como el NH₃) no se puede recoger sobre agua.']],c:0,r:'Hidrógeno',k:'qi-ho-hidrogeno'},
    {t:'H',q:'¿Cómo se reconoce el hidrógeno en el laboratorio?',o:[
      ['Al acercar el tubo a la llama se oye un pequeño estallido (“ladrido”)','La mezcla H₂ + aire arde explosivamente: 2 H₂ + O₂ → 2 H₂O.'],
      ['Reaviva una astilla con punto de ignición','Esa es la prueba del oxígeno.'],
      ['Enturbia el agua de barita','Esa es la prueba del CO₂.'],
      ['Pone azul el papel tornasol','El H₂ no tiene carácter ácido ni básico.']],c:0,r:'Clase 1 · Hidrógeno',k:'qi-tp4-c1-hidrogeno'},
    {t:'H',q:'En el ensayo de densidad, el “ladrido” aparece en el tubo de ARRIBA, que antes tenía aire. ¿Por qué?',o:[
      ['Porque el H₂, mucho menos denso que el aire, subió','δ(H₂)/δ(aire) ≈ 2/29: es unas 14 veces más liviano.'],
      ['Porque el aire es combustible','El aire tiene O₂ (comburente), pero sin H₂ no ladra.'],
      ['Porque el H₂ es más denso y bajó','Si fuera más denso, quedaría en el tubo de abajo.'],
      ['Porque el tubo de arriba estaba más caliente','La temperatura no tiene que ver: es la densidad.']],c:0,r:'Clase 1 · Hidrógeno',k:'qi-tp4-c1-hidrogeno'},
    {t:'H',q:'El hidruro de sodio (NaH) en agua con fenolftaleína produce burbujas y color fucsia. ¿Por qué?',o:[
      ['El H⁻ le saca un H⁺ al agua: se libera H₂ y queda NaOH','NaH + H₂O → NaOH + H₂: el H⁻ es una base muy fuerte.'],
      ['El NaH es un ácido','Pondría incolora la fenolftaleína.'],
      ['El sodio se reduce','El Na ya es Na⁺ en el hidruro y no cambia.'],
      ['Se libera O₂','El gas es H₂.']],c:0,r:'Hidruros',k:'qi-ho-hidruros'},
    {t:'H',q:'¿Qué número de oxidación tiene el hidrógeno en un hidruro metálico como NaH o KH?',o:[
      ['−1','El H es más electronegativo que el metal: es el ion hidruro H⁻.'],
      ['+1','Es su estado en el agua o en los ácidos, no en los hidruros metálicos.'],
      ['0','Es el del H₂.'],
      ['+2','El hidrógeno nunca tiene +2.']],c:0,r:'Hidruros',k:'qi-ho-hidruros'},
    {t:'O',q:'En la obtención de O₂ a partir de KClO₃, ¿qué papel cumple el MnO₂?',o:[
      ['Es catalizador: acelera la descomposición y queda igual al final','Por eso sigue negro al terminar.'],
      ['Es el que aporta el oxígeno','El O₂ sale del clorato.'],
      ['Es un reactivo que se consume','No se consume: se recupera sin cambios.'],
      ['Absorbe la humedad','No es un desecante.']],c:0,r:'Clase 1 · Oxígeno',k:'qi-tp4-c1-oxigeno'},
    {t:'O',q:'Al burbujear O₂ en KI acidificado y agregar cloroformo, la capa orgánica se pone violeta. ¿Qué demuestra?',o:[
      ['Que el O₂ oxidó el I⁻ a I₂, que se disuelve en el cloroformo','4 I⁻ + O₂ + 4 H⁺ → 2 I₂ + 2 H₂O.'],
      ['Que el cloroformo reacciona con el oxígeno','El cloroformo sólo extrae el I₂.'],
      ['Que se formó ioduro','El ioduro ya estaba; lo violeta es iodo (I₂).'],
      ['Que el O₂ es reductor','Acá el O₂ gana electrones: es oxidante.']],c:0,r:'Clase 1 · Oxígeno',k:'qi-tp4-c1-oxigeno'},
    {t:'O',q:'¿Por qué el azufre arde con más intensidad en un tubo con O₂ puro que en el aire?',o:[
      ['Porque el O₂ es comburente y en el aire está diluido (≈ 21 %)','Con más O₂ la combustión es más rápida y viva.'],
      ['Porque el O₂ es combustible','El O₂ no arde: hace arder a otros.'],
      ['Porque el tubo está más caliente','Lo que cambia es la cantidad de O₂.'],
      ['Porque se forma SO₃','Se forma SO₂.']],c:0,r:'Oxígeno: el gran comburente',k:'qi-ho-oxigeno'},
    {t:'O',q:'El H₂O₂ con KI en medio ácido da I₂. En esta reacción el agua oxigenada actúa como:',o:[
      ['Oxidante: su O pasa de −1 a −2','H₂O₂ + 2 I⁻ + 2 H⁺ → I₂ + 2 H₂O.'],
      ['Reductor: su O pasa de −1 a 0','Eso ocurre frente al permanganato.'],
      ['Catalizador','Se consume en la reacción.'],
      ['Base','No es una reacción ácido-base.']],c:0,r:'Agua oxigenada',k:'qi-ho-peroxido'},
    {t:'O',q:'El H₂O₂ decolora el permanganato con burbujeo. ¿Qué gas se libera y qué rol tiene el H₂O₂?',o:[
      ['O₂; el H₂O₂ es reductor (O: −1 → 0)','2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O.'],
      ['H₂; el H₂O₂ es oxidante','No se forma hidrógeno.'],
      ['O₂; el H₂O₂ es oxidante','Si libera O₂ en estado 0, su oxígeno se oxidó: es reductor.'],
      ['Cl₂; el H₂O₂ es reductor','No hay cloro en la reacción.']],c:0,r:'Agua oxigenada',k:'qi-ho-peroxido'},
    {t:'O',q:'La descomposición 2 H₂O₂ → 2 H₂O + O₂ es una dismutación porque:',o:[
      ['El mismo elemento (O, en −1) se oxida a 0 y se reduce a −2','Una parte del oxígeno gana electrones y otra los pierde.'],
      ['Necesita un catalizador','Que use catalizador no la hace dismutación.'],
      ['Libera calor','Ser exotérmica no define una dismutación.'],
      ['El H cambia de n.o.','El hidrógeno sigue en +1.']],c:0,r:'Agua oxigenada',k:'qi-ho-peroxido'},
    {t:'M',q:'¿Qué propiedad del óxido de sodio o de magnesio se ve con el tornasol?',o:[
      ['Son óxidos básicos: con agua dan hidróxidos y el tornasol rojo se pone azul','Na₂O + H₂O → 2 NaOH; MgO + H₂O → Mg(OH)₂.'],
      ['Son óxidos ácidos','Los óxidos ácidos son los de los no metales.'],
      ['Son anfóteros','Los de Na y Mg son básicos.'],
      ['Son neutros','Cambian el color del tornasol.']],c:0,r:'Reacción con oxígeno',k:'qi-al-oxigeno'},
    {t:'M',q:'¿Qué color da el sodio en el ensayo a la llama?',o:[
      ['Amarillo intenso','Es tan intenso que tapa a otros colores.'],
      ['Violeta / lila','Ese es el del potasio.'],
      ['Rojo carmín','Ese es el del litio.'],
      ['Verde','El verde es típico del bario o del cobre.']],c:0,r:'Colores a la llama',k:'qi-al-llama'},
    {t:'M',q:'¿Por qué cada metal da un color propio a la llama?',o:[
      ['El calor excita electrones que, al volver a su nivel, emiten luz de energía característica','Cada elemento tiene sus niveles de energía: su espectro es una “huella”.'],
      ['Porque el metal se quema y forma óxidos de colores','El color viene de la emisión de los átomos excitados.'],
      ['Porque cambia la temperatura de la llama','Todos los ensayos usan la misma llama.'],
      ['Porque el anión de la sal da el color','El color lo da el catión.']],c:0,r:'Colores a la llama',k:'qi-al-llama'},
    {t:'M',q:'El sodio disuelto en amoníaco líquido da una solución azul intensa. ¿A qué se debe?',o:[
      ['A electrones solvatados por el amoníaco: el Na cede su electrón con muchísima facilidad','Na → Na⁺(am) + e⁻(am).'],
      ['A que se forma NaOH','No hay agua: no se forma hidróxido.'],
      ['A un complejo de sodio con amoníaco','El color es de los electrones libres solvatados.'],
      ['A que se forma amida de sodio','Esa reacción es lenta y no explica el azul.']],c:0,r:'Metales alcalinos en amoníaco líquido',k:'qi-al-amoniaco'},
    {t:'M',q:'Ordená por reactividad frente al agua: Na, Mg y K.',o:[
      ['K > Na > Mg','En un grupo la reactividad aumenta hacia abajo; los alcalinotérreos son menos reactivos.'],
      ['Mg > Na > K','Está al revés.'],
      ['Na > K > Mg','El potasio es más reactivo que el sodio.'],
      ['Los tres reaccionan igual','La diferencia es muy notoria.']],c:0,r:'Reacción con agua y con ácidos',k:'qi-al-agua'},
    {t:'AG',q:'Al calentar CuSO₄·5H₂O, el sólido pasa de azul a blanco. ¿Qué pasó?',o:[
      ['Perdió el agua de hidratación; el color azul depende del agua unida al Cu²⁺','CuSO₄·5H₂O → CuSO₄ + 5 H₂O.'],
      ['El cobre se redujo a metal','El cobre metálico es rojizo, no blanco.'],
      ['Se formó óxido de cobre','El CuO es negro.'],
      ['Se descompuso el sulfato','A esa temperatura el sulfato no se descompone.']],c:0,r:'Hidratos y acuocomplejos',k:'qi-ho-agua'},
    {t:'AG',q:'Una solución verde de CuCl₂ en HCl se vuelve celeste al diluirla con agua porque:',o:[
      ['El agua desplaza a los Cl⁻ y se forma el acuocomplejo de cobre','[CuCl₄]²⁻ + 6 H₂O ⇌ [Cu(H₂O)₆]²⁺ + 4 Cl⁻.'],
      ['El cobre se oxida','Sigue siendo Cu²⁺.'],
      ['El HCl se neutraliza','El agua no neutraliza el ácido.'],
      ['Precipita CuCl','No se forma precipitado.']],c:0,r:'Hidratos y acuocomplejos',k:'qi-ho-agua'},
    {t:'AG',q:'Una solución de FeCl₃ en caliente se enturbia (pardo rojizo) y es ácida al tornasol. ¿Por qué?',o:[
      ['El Fe³⁺ hidroliza: Fe³⁺ + 3 H₂O ⇌ Fe(OH)₃ + 3 H⁺','Los cationes pequeños y muy cargados hidrolizan; el calor desplaza el equilibrio.'],
      ['El cloruro se oxida a cloro','No hay oxidante que lo haga.'],
      ['El hierro se reduce a Fe²⁺','No hay reductor.'],
      ['Se evapora el agua y precipita la sal','El precipitado es el hidróxido, no la sal.']],c:0,r:'Hidrólisis de sales',k:'qi-ho-agua'}
  ]});

  // =====================================================================
  // TP 5 · CARBONO Y NITRÓGENO
  // =====================================================================
  Z.add('tp5',{topics:{
    BP:{name:'Bloque p: térreos, carbonoides, nitrogenoides',c:'#7957c8'},
    C:{name:'Carbono, CO₂ y carbonatos',c:'#3f6aa8'},
    N:{name:'Nitrógeno y amoníaco',c:'#2e8a7c'},
    HN:{name:'Ácido nítrico',c:'#d0603a'}
  },questions:[
    {t:'BP',q:'¿Qué es el efecto del par inerte?',o:[
      ['La tendencia de los elementos pesados del bloque p a no usar sus electrones ns² y quedarse con el n.o. dos unidades menor','Por eso el Pb²⁺ es más estable que el Pb⁴⁺ y el Pb(IV) es oxidante.'],
      ['Que los gases nobles no reaccionan','Eso se debe a su capa completa, no al par inerte.'],
      ['Que el N₂ es poco reactivo','Eso se explica por su triple enlace.'],
      ['Que los metales alcalinos pierden un solo electrón','No tiene que ver con el bloque p.']],c:0,r:'El efecto del par inerte',k:'qi-pb-par-inerte'},
    {t:'BP',q:'Un hidróxido anfótero, como el Al(OH)₃:',o:[
      ['Se disuelve tanto en ácidos como en bases fuertes','Con ácido da Al³⁺; con NaOH da [Al(OH)₄]⁻.'],
      ['Sólo se disuelve en ácidos','Eso sería un hidróxido básico, como el Mg(OH)₂.'],
      ['No se disuelve en nada','Se disuelve en exceso de base.'],
      ['Sólo se disuelve en agua','Es insoluble en agua.']],c:0,r:'Aluminio, estaño y plomo',k:'qi-pb-al-sn-pb'},
    {t:'C',q:'¿Qué es la adsorción?',o:[
      ['La acumulación de partículas sobre la superficie de un sólido','ADsorción: en la superficie; ABsorción: en todo el volumen.'],
      ['La penetración de un líquido en todo el volumen de un sólido','Eso es absorción, como una esponja con agua.'],
      ['Una reacción química entre el carbón y el colorante','No es una reacción: es un fenómeno de superficie.'],
      ['La disolución del carbón en agua','El carbón es insoluble.']],c:0,r:'Adsorción',k:'qi-c-adsorcion'},
    {t:'C',q:'Al filtrar una solución de Pb(NO₃)₂ tratada con carbón activado y agregarle KI, casi no aparece precipitado amarillo. ¿Por qué?',o:[
      ['El carbón retuvo los iones Pb²⁺ en su superficie','Sin Pb²⁺ en el filtrado no se forma PbI₂.'],
      ['El carbón redujo el Pb²⁺ a plomo','No hay reacción redox.'],
      ['El KI no reacciona con el plomo','En el tubo testigo sí precipita PbI₂.'],
      ['El precipitado quedó blanco','El PbI₂ siempre es amarillo.']],c:0,r:'Clase 2 · Adsorción',k:'qi-tp5-c2-adsorcion'},
    {t:'C',q:'Al calentar CuO con carbón aparecen puntos rojizos y el agua de barita se enturbia. El carbono actúa como:',o:[
      ['Reductor: reduce el Cu(II) a Cu y se oxida a CO₂','2 CuO + C → 2 Cu + CO₂.'],
      ['Oxidante','El carbono pierde electrones (0 → +4).'],
      ['Catalizador','Se consume y forma CO₂.'],
      ['Adsorbente','Acá reacciona químicamente.']],c:0,r:'Carácter reductor del carbono',k:'qi-c-reductor'},
    {t:'C',q:'¿Cómo se reconoce el CO₂ en el laboratorio?',o:[
      ['Enturbia el agua de barita (precipita BaCO₃ blanco)','CO₂ + Ba(OH)₂ → BaCO₃ + H₂O.'],
      ['Reaviva una astilla con punto de ignición','Al contrario: apaga la llama.'],
      ['Hace “ladrar” la llama','Esa es la prueba del H₂.'],
      ['Pone violeta el cloroformo','Esa es la prueba del I₂.']],c:0,r:'El CO₂ en el laboratorio',k:'qi-c-co2-lab'},
    {t:'C',q:'En el ensayo de densidad del CO₂, la vela se apaga en el tubo de ABAJO. Eso indica que el CO₂:',o:[
      ['Es más denso que el aire y “se vuelca” hacia abajo','δ(CO₂)/δ(aire) ≈ 44/29 ≈ 1,5.'],
      ['Es menos denso que el aire','Si lo fuera, se habría ido al tubo de arriba.'],
      ['Es combustible','No arde: apaga la vela.'],
      ['Se disolvió en el aire','El aire y el CO₂ se mezclan lentamente, pero el CO₂ baja.']],c:0,r:'Clase 1 · CO₂',k:'qi-tp5-c1-co2'},
    {t:'C',q:'El magnesio sigue ardiendo dentro de un tubo con CO₂ y deja puntos negros. ¿Qué demuestra?',o:[
      ['Que un metal muy reductor puede reducir el CO₂ a carbono','2 Mg + CO₂ → 2 MgO + C: los puntos negros son carbono.'],
      ['Que el CO₂ es comburente para todo','Una vela se apaga en CO₂.'],
      ['Que el Mg es oxidante','El Mg se oxida a Mg²⁺: es reductor.'],
      ['Que el tubo tenía aire','Pasa aun en CO₂ puro.']],c:0,r:'Clase 1 · CO₂',k:'qi-tp5-c1-co2'},
    {t:'C',q:'¿Cómo se separan carbonato y bicarbonato en el TP?',o:[
      ['Con BaCl₂ precipita sólo el carbonato; el filtrado con NH₃ convierte el bicarbonato en carbonato, que precipita después','El BaCO₃ es insoluble y el Ba(HCO₃)₂, soluble.'],
      ['Con fenolftaleína: el carbonato queda fucsia','Los dos son básicos; no se separan así.'],
      ['Calentando hasta que se evapore el bicarbonato','El bicarbonato no se evapora.'],
      ['Con HCl: sólo el carbonato burbujea','Los dos liberan CO₂ con ácido.']],c:0,r:'Carbonatos y bicarbonatos',k:'qi-c-carbonatos'},
    {t:'C',q:'El CO₂ decolora la fenolftaleína alcalinizada. ¿Por qué?',o:[
      ['Es un óxido ácido: consume la base y el pH baja hasta ≈ 8','CO₂ + 2 NaOH → Na₂CO₃ + H₂O, y luego se forma bicarbonato.'],
      ['Es un óxido básico','Entonces el color sería más intenso.'],
      ['Oxida a la fenolftaleína','No hay reacción redox.'],
      ['Diluye la solución','El color depende del pH, no de la dilución.']],c:0,r:'Dióxido de carbono',k:'qi-c-co2'},
    {t:'N',q:'¿Por qué el tubo donde se recoge el amoníaco va boca abajo?',o:[
      ['Porque el NH₃ (17 g/mol) es menos denso que el aire (29 g/mol)','Sube y desplaza el aire hacia abajo.'],
      ['Porque el NH₃ es más denso que el aire','Si fuera más denso, el tubo iría boca arriba, como con el CO₂.'],
      ['Para que no se disuelva en agua','No se recoge sobre agua: es muy soluble.'],
      ['Porque reacciona con el vidrio','No reacciona con el vidrio.']],c:0,r:'Clase 1 · Amoníaco',k:'qi-tp5-c1-nh3'},
    {t:'N',q:'En la “fuente de amoníaco”, el agua sube por el tubo y se tiñe de fucsia. Esto demuestra que el NH₃:',o:[
      ['Es muy soluble en agua y básico','Al disolverse deja un vacío; NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.'],
      ['Es insoluble y ácido','Es justamente al revés.'],
      ['Es reductor','La fuente no muestra propiedades redox.'],
      ['Reacciona con la fenolftaleína','La fenolftaleína sólo indica el medio básico.']],c:0,r:'Amoníaco: propiedades',k:'qi-n-nh3'},
    {t:'N',q:'El NH₃ decolora el permanganato y aparece un precipitado pardo. ¿Qué papel cumple el amoníaco?',o:[
      ['Reductor: su N pasa de −3 a 0 y el MnO₄⁻ se reduce a MnO₂','En medio básico el permanganato da MnO₂ pardo.'],
      ['Oxidante','El N pierde electrones.'],
      ['Ligando del manganeso','No se forma un complejo amoniacal de Mn.'],
      ['Catalizador','Se consume.']],c:0,r:'Amoníaco como reductor',k:'qi-n-nh3-redox'},
    {t:'N',q:'Con poco NH₃, el CuSO₄ da un precipitado celeste; con exceso, una solución azul intensa. El precipitado es:',o:[
      ['Cu(OH)₂, porque el NH₃ primero actúa como base','Después, en exceso, actúa como ligando y forma [Cu(NH₃)₄]²⁺.'],
      ['[Cu(NH₃)₄]²⁺','El complejo es soluble: es la solución azul.'],
      ['CuSO₄ sin disolver','El CuSO₄ es soluble.'],
      ['Cu metálico','No hay reducción.']],c:0,r:'Amoníaco como ligando',k:'qi-n-ligando'},
    {t:'N',q:'¿Qué catión precipita con NH₃ y NO se redisuelve en exceso?',o:[
      ['Fe³⁺ (Fe(OH)₃ pardo rojizo)','El hierro(III) no forma complejo amoniacal estable.'],
      ['Cu²⁺','Se redisuelve como tetraammincobre(II).'],
      ['Ni²⁺','Se redisuelve como hexaamminníquel(II).'],
      ['Ag⁺','Se redisuelve como diamminplata(I).']],c:0,r:'Clase 2 · Amoníaco como ligando',k:'qi-tp5-c2-nh3'},
    {t:'N',q:'La obtención de N₂ con NH₄Cl y NaNO₂ es una comproporción porque:',o:[
      ['El N del amonio (−3) y el del nitrito (+3) terminan los dos en 0','NH₄⁺ + NO₂⁻ → N₂ + 2 H₂O.'],
      ['El nitrógeno se oxida y se reduce desde el mismo estado','Eso sería una dismutación.'],
      ['Interviene un catalizador','No define una comproporción.'],
      ['Se forma agua','Formar agua no tiene que ver.']],c:0,r:'Clase 2 · Obtención de N₂',k:'qi-tp5-c2-carbonatos-n2'},
    {t:'HN',q:'¿Por qué el HNO₃ se obtiene calentando NaNO₃ con H₂SO₄ concentrado?',o:[
      ['El H₂SO₄, poco volátil, desplaza al HNO₃, que es volátil y se destila','NaNO₃ + H₂SO₄ → NaHSO₄ + HNO₃(g).'],
      ['Porque el H₂SO₄ oxida al nitrato','No hay redox en la obtención.'],
      ['Porque el HNO₃ es menos volátil','Es al revés: por eso destila.'],
      ['Porque el sulfato de sodio es gaseoso','El NaHSO₄ queda como sólido en la retorta.']],c:0,r:'Ácido nítrico: obtención',k:'qi-n-hno3'},
    {t:'HN',q:'Los vapores pardo-rojizos que aparecen al obtener HNO₃ son de:',o:[
      ['NO₂, por descomposición parcial del ácido','4 HNO₃ → 4 NO₂ + O₂ + 2 H₂O; por eso el ácido sale amarillento.'],
      ['Cl₂','El cloro es amarillo verdoso y no se forma acá.'],
      ['Br₂','No hay bromo.'],
      ['NO','El NO es incoloro.']],c:0,r:'Clase 1 · Ácido nítrico',k:'qi-tp5-c1-hno3'},
    {t:'HN',q:'El HNO₃ concentrado disuelve al cobre con desprendimiento de un gas pardo. ¿Qué gas es y por qué no es H₂?',o:[
      ['NO₂: el oxidante es el nitrato (N +5 → +4), no el H⁺','Cu + 4 HNO₃ → Cu(NO₃)₂ + 2 NO₂ + 2 H₂O.'],
      ['H₂, como con cualquier ácido','El cobre no reduce al H⁺ (E° Cu > 0).'],
      ['NO, porque el ácido está concentrado','El NO (incoloro) se forma con el ácido diluido.'],
      ['O₂','No se libera oxígeno.']],c:0,r:'Ácido nítrico como oxidante',k:'qi-n-hno3-oxidante'},
    {t:'HN',q:'¿Qué producto de reducción da el HNO₃ diluido con metales como el cobre?',o:[
      ['NO, un gas incoloro que en el aire se pone pardo','3 Cu + 8 HNO₃(d) → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O.'],
      ['NO₂, igual que el concentrado','El concentrado da NO₂; el diluido, NO.'],
      ['H₂','El nitrato es mejor oxidante que el H⁺.'],
      ['N₂O₅','No es un producto de reducción.']],c:0,r:'Ácido nítrico como oxidante',k:'qi-n-hno3-oxidante'}
  ]});

  // =====================================================================
  // TP 6 · AZUFRE Y HALÓGENOS
  // =====================================================================
  Z.add('tp6',{topics:{
    S:{name:'SO₂: ácido, oxidante y reductor',c:'#b07a10'},
    SH:{name:'H₂S, sulfuros y H₂SO₄',c:'#d0603a'},
    I:{name:'Iodo',c:'#7957c8'},
    X:{name:'Cloro, bromo y HCl',c:'#2e8a7c'}
  },questions:[
    {t:'S',q:'El SO₂ en agua pone rojo el tornasol azul. Es un:',o:[
      ['Óxido ácido','SO₂ + H₂O ⇌ H₂SO₃ (o HSO₃⁻ + H⁺).'],
      ['Óxido básico','Pondría azul el tornasol rojo.'],
      ['Óxido neutro','Cambia el color del indicador.'],
      ['Hidruro','Es un óxido de un no metal.']],c:0,r:'Dióxido de azufre',k:'qi-s-so2'},
    {t:'S',q:'El SO₂ hace virar el dicromato acidificado de naranja a verde. ¿Qué papel cumple?',o:[
      ['Reductor: S +4 → +6, y el Cr +6 → +3 (verde)','Cr₂O₇²⁻ + 3 SO₂ + 2 H⁺ → 2 Cr³⁺ + 3 SO₄²⁻ + H₂O.'],
      ['Oxidante','El que se reduce es el dicromato.'],
      ['Ácido que neutraliza el dicromato','El cambio de color es por la redox.'],
      ['Catalizador','Se consume.']],c:0,r:'Clase 1 · SO₂',k:'qi-tp6-c1-so2'},
    {t:'S',q:'Frente al H₂S, el SO₂ forma azufre amarillo. En esa reacción el SO₂ es:',o:[
      ['Oxidante: S +4 → 0, mientras el S del H₂S va de −2 a 0','Es una comproporción: SO₂ + 2 H₂S → 3 S + 2 H₂O.'],
      ['Reductor','Frente al H₂S gana electrones.'],
      ['Base','No es ácido-base.'],
      ['Inerte','Reacciona dando azufre.']],c:0,r:'Dióxido de azufre',k:'qi-s-so2'},
    {t:'S',q:'¿Cómo se confirma que el SO₂ se oxidó a sulfato en los tubos?',o:[
      ['Agregando BaCl₂: precipita BaSO₄ blanco, insoluble aun en ácido','Ba²⁺ + SO₄²⁻ → BaSO₄.'],
      ['Con fenolftaleína','No distingue sulfito de sulfato.'],
      ['Con almidón','El almidón detecta iodo.'],
      ['Oliendo el tubo','No se huele y no confirma nada.']],c:0,r:'Clase 1 · SO₂',k:'qi-tp6-c1-so2'},
    {t:'SH',q:'El H₂S decolora el permanganato y aparece una turbidez amarilla. ¿Qué es lo amarillo?',o:[
      ['Azufre (S⁰), producto de la oxidación del H₂S','2 MnO₄⁻ + 5 H₂S + 6 H⁺ → 2 Mn²⁺ + 5 S + 8 H₂O.'],
      ['MnO₂','El MnO₂ es pardo y se forma en medio básico.'],
      ['Sulfato de manganeso','Es soluble y casi incoloro.'],
      ['Iodo','No hay ioduro en el tubo.']],c:0,r:'Clase 2 · H₂S',k:'qi-tp6-c2-h2s'},
    {t:'SH',q:'El CuS precipita aun en medio ácido, pero el NiS sólo en medio básico. ¿Por qué?',o:[
      ['El CuS es muchísimo más insoluble: precipita con el poco S²⁻ que hay en ácido','En medio básico hay más S²⁻ y precipitan también los sulfuros menos insolubles.'],
      ['Porque el níquel se oxida en ácido','No hay cambio redox.'],
      ['Porque el NiS es más insoluble que el CuS','Es al revés.'],
      ['Porque el cobre forma complejo con el ácido','No es lo que explica la diferencia.']],c:0,r:'Precipitación de los sulfuros',k:'qi-s-sulfuros'},
    {t:'SH',q:'El cobre reacciona con H₂SO₄ concentrado y caliente pero no con el diluido. ¿Por qué?',o:[
      ['El oxidante del concentrado es el sulfato (S +6 → +4, SO₂); en el diluido sólo actúa el H⁺, que no oxida al cobre','Cu + 2 H₂SO₄(c) → CuSO₄ + SO₂ + 2 H₂O.'],
      ['Porque el diluido es una base','Sigue siendo un ácido.'],
      ['Porque el concentrado libera H₂','Libera SO₂.'],
      ['Porque el cobre se pasiva en el diluido','No es pasivación: no tiene con qué oxidarse.']],c:0,r:'Ácido sulfúrico: concentrado vs. diluido',k:'qi-s-h2so4'},
    {t:'SH',q:'El H₂SO₄ concentrado pone blanco el CuSO₄·5H₂O y ennegrece el papel. Esto demuestra que es:',o:[
      ['Deshidratante','Le saca el agua de cristalización al sulfato y el H y O a la celulosa.'],
      ['Reductor','No se reduce en esos ensayos.'],
      ['Básico','Es un ácido.'],
      ['Catalizador','Se hidrata: no queda igual.']],c:0,r:'Clase 2 · H₂SO₄',k:'qi-tp6-c2-h2so4'},
    {t:'I',q:'¿Por qué el iodo es poco soluble en agua y muy soluble en cloroformo?',o:[
      ['Porque el I₂ es una molécula no polar, como el cloroformo… y a diferencia del agua','“Semejante disuelve a semejante”.'],
      ['Porque reacciona con el cloroformo','Sólo se disuelve: no hay reacción.'],
      ['Porque es iónico','El I₂ es covalente no polar.'],
      ['Porque el cloroformo es más caliente','La temperatura no es la causa.']],c:0,r:'Moléculas no polares: solubilidad',k:'qi-x-solubilidad'},
    {t:'I',q:'¿Cómo se reconoce el iodo aun en cantidades muy pequeñas?',o:[
      ['Con almidón: da un color azul intenso','Es la prueba más sensible del I₂.'],
      ['Con fenolftaleína','No reacciona con el iodo.'],
      ['Con agua de barita','Esa es la prueba del CO₂.'],
      ['Con una astilla encendida','No tiene relación.']],c:0,r:'Obtención e identificación del iodo',k:'qi-x-iodo'},
    {t:'I',q:'El tiosulfato decolora la solución azul de iodo y almidón porque:',o:[
      ['Reduce el I₂ a I⁻, que no da color con el almidón','I₂ + 2 S₂O₃²⁻ → 2 I⁻ + S₄O₆²⁻.'],
      ['Oxida el iodo a iodato','El tiosulfato es reductor.'],
      ['Destruye el almidón','El almidón sigue ahí: si se agrega iodo, vuelve el azul.'],
      ['Diluye la solución','Unas gotas no diluyen tanto.']],c:0,r:'Clase 1 · Iodo',k:'qi-tp6-c1-iodo'},
    {t:'I',q:'El iodo se disuelve mucho más en KI que en agua pura. ¿Por qué?',o:[
      ['Forma el ion triyoduro: I₂ + I⁻ ⇌ I₃⁻, que es soluble','No es redox: el I₂ sólo se asocia al I⁻.'],
      ['El KI oxida al iodo','No cambia ningún número de oxidación.'],
      ['El KI calienta la solución','No es por la temperatura.'],
      ['El potasio forma un complejo con el iodo','La especie que se forma es I₃⁻.']],c:0,r:'Clase 1 · Iodo',k:'qi-tp6-c1-iodo'},
    {t:'I',q:'En la obtención del iodo, el producto se separa por:',o:[
      ['Sublimación: pasa a vapor violeta y vuelve a sólido en la superficie fría','Se forman cristales negro-violáceos brillantes.'],
      ['Filtración','El iodo no queda como precipitado para filtrar.'],
      ['Destilación de una solución acuosa','No se destila.'],
      ['Decantación','No hay dos líquidos que separar.']],c:0,r:'Clase 1 · Iodo',k:'qi-tp6-c1-iodo'},
    {t:'X',q:'El iodo (o el bromo) se decolora con NaOH y el color vuelve al agregar ácido. En medio básico ocurre una:',o:[
      ['Dismutación: el halógeno (0) pasa a X⁻ (−1) y a XO₃⁻ (+5)','3 I₂ + 6 OH⁻ → 5 I⁻ + IO₃⁻ + 3 H₂O; con ácido, comproporción.'],
      ['Comproporción','Eso es lo que ocurre al acidificar.'],
      ['Precipitación','No se forma sólido.'],
      ['Sublimación','No hay calentamiento.']],c:0,r:'Dismutación y comproporción',k:'qi-x-dismutacion'},
    {t:'X',q:'El agua de cloro pone amarillo-naranja una solución de KBr. Esto demuestra que:',o:[
      ['El Cl₂ es mejor oxidante que el Br₂: oxida el Br⁻ a Br₂','Cl₂ + 2 Br⁻ → 2 Cl⁻ + Br₂.'],
      ['El Br₂ es mejor oxidante que el Cl₂','Entonces la reacción no ocurriría.'],
      ['El KBr reduce el agua','No hay reacción con el agua.'],
      ['Se forma un precipitado de KCl','El KCl es soluble.']],c:0,r:'Poder oxidante y poder reductor',k:'qi-x-oxidantes'},
    {t:'X',q:'¿Cuál es el orden de poder oxidante de los halógenos del TP?',o:[
      ['Cl₂ > Br₂ > I₂','Cada uno oxida a los haluros que están debajo en el grupo.'],
      ['I₂ > Br₂ > Cl₂','Está invertido: ese es el orden de poder reductor de los haluros.'],
      ['Br₂ > Cl₂ > I₂','El cloro es el más oxidante de los tres.'],
      ['Los tres son iguales','El ensayo con KBr y KI muestra la diferencia.']],c:0,r:'Poder oxidante y poder reductor',k:'qi-x-oxidantes'},
    {t:'X',q:'El papel de tornasol azul en contacto con cloro húmedo primero se pone rojo y después se blanquea. ¿Por qué?',o:[
      ['Cl₂ + H₂O ⇌ HCl + HClO: el HCl lo pone rojo y el HClO lo decolora','El ácido hipocloroso es oxidante y blanqueante.'],
      ['El cloro es básico','Pondría azul el tornasol rojo.'],
      ['El papel se quema','No hay combustión.'],
      ['El cloro sólo es ácido','Eso no explica el blanqueo.']],c:0,r:'Clase 2 · Cloro y bromo',k:'qi-tp6-c2-cloro'},
    {t:'X',q:'El HCl concentrado con KMnO₄ desprende un gas amarillo verdoso; con hierro, un gas incoloro. ¿Qué muestra?',o:[
      ['Que el HCl puede ser reductor (por el Cl⁻, da Cl₂) u oxidante (por el H⁺, da H₂)','Depende de con qué reaccione.'],
      ['Que el HCl es siempre oxidante','Frente al permanganato se oxida.'],
      ['Que el gas incoloro es Cl₂','El cloro es amarillo verdoso; el incoloro es H₂.'],
      ['Que el hierro es oxidante','El hierro se oxida a Fe²⁺.']],c:0,r:'Clase 2 · Propiedades redox del HCl',k:'qi-tp6-c2-hcl'},
    {t:'X',q:'¿Por qué el HCl se recoge con el tubo boca arriba?',o:[
      ['Porque es más denso que el aire (36,5 frente a 29 g/mol)','Desplaza al aire hacia arriba y queda en el tubo.'],
      ['Porque es menos denso que el aire','Entonces se recogería boca abajo, como el NH₃.'],
      ['Porque es insoluble en agua','Es muy soluble: por eso no se recoge sobre agua.'],
      ['Porque reacciona con el vidrio','No ataca al vidrio.']],c:0,r:'Ácido clorhídrico',k:'qi-x-hcl'},
    {t:'X',q:'El ion cloruro se reconoce en el TP con:',o:[
      ['AgNO₃: precipitado blanco de AgCl','Ag⁺ + Cl⁻ → AgCl(s).'],
      ['KSCN: color rojo','Esa es la prueba del Fe³⁺.'],
      ['Almidón: color azul','Esa es la prueba del iodo.'],
      ['BaCl₂: precipitado blanco','Esa es la prueba del sulfato (y ya trae cloruro).']],c:0,r:'Clase 1 · HCl y cloruros',k:'qi-tp6-c1-hcl'}
  ]});
})();
