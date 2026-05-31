# Mapeo completo de slugs a metadata
$metadata = @{
    "energia-cinetica" = @{name="Energía Cinética"; desc="Calcula la energía cinética de movimiento"; domain="fisica"; cat="Física"; icon="Zap"; related=@("energia-potencial","segunda-ley-newton")}
    "energia-potencial" = @{name="Energía Potencial"; desc="Calcula la energía potencial gravitatoria"; domain="fisica"; cat="Física"; icon="Zap"; related=@("energia-cinetica","segunda-ley-newton")}
    "equilibrio-quimico" = @{name="Equilibrio Químico"; desc="Calcula constantes de equilibrio químico"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("solucion-concentracion","calculadora-ph")}
    "estequiometria" = @{name="Estequiometría"; desc="Calcula reactivos y productos en reacciones"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("formula-molecular","mol-masa-molar")}
    "etiqueta-energetica" = @{name="Etiqueta Energética"; desc="Calcula clase energética"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("eficiencia-energetica","compensacion-co2")}
    "exceso-equipaje" = @{name="Exceso Equipaje"; desc="Calcula coste de exceso"; domain="equipaje"; cat="Equipaje y peso"; icon="Package"; related=@("peso-equipaje","coste-viaje")}
    "factura-gas" = @{name="Factura de Gas"; desc="Calcula coste de consumo de gas"; domain="consumo"; cat="Consumo energético"; icon="Leaf"; related=@("ahorro-energetico","consumo-electrico")}
    "fertilizante-jardin" = @{name="Fertilizante Jardín"; desc="Calcula dosis de fertilizante"; domain="jardin"; cat="Jardín y terreno"; icon="Sprout"; related=@("riego-jardin","area-jardin")}
    "finiquito" = @{name="Finiquito"; desc="Calcula finiquito de despido"; domain="nomina"; cat="Nómina y salario"; icon="Briefcase"; related=@("irpf-retencion","calculadora-nomina")}
    "formula-molecular" = @{name="Fórmula Molecular"; desc="Determina fórmula a partir de composición"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("mol-masa-molar","estequiometria")}
    "frecuencia-onda" = @{name="Frecuencia de Onda"; desc="Calcula frecuencia y longitud de onda"; domain="fisica"; cat="Física"; icon="Zap"; related=@("velocidad-distancia-tiempo","conversor-velocidad")}
    "funcion-cuadratica" = @{name="Función Cuadrática"; desc="Calcula raíces y vértice de parábola"; domain="algebra"; cat="Álgebra"; icon="Grid3x3"; related=@("sistema-ecuaciones","ecuacion-lineal")}
    "gas-ideal" = @{name="Gas Ideal"; desc="Calcula propiedades usando ley gas ideal"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("calculadora-ph","mol-masa-molar")}
    "generador-loteria" = @{name="Generador Lotería"; desc="Genera números de lotería"; domain="suerte"; cat="Suerte y probabilidad"; icon="Star"; related=@("numeros-suerte","dado-virtual")}
    "hora-melatonina" = @{name="Hora Melatonina"; desc="Calcula pico de melatonina"; domain="sueno"; cat="Sueño y descanso"; icon="Moon"; related=@("ciclos-sueno","calculadora-sueno")}
    "horas-extra" = @{name="Horas Extra"; desc="Calcula coste de horas extra"; domain="productividad"; cat="Productividad"; icon="ListChecks"; related=@("coste-reunion","pomodoro")}
    "horas-idioma" = @{name="Horas Idioma"; desc="Calcula horas para aprender idioma"; domain="estudio"; cat="Tiempo de estudio"; icon="Timer"; related=@("aprendizaje-espaciado","tiempo-estudio")}
    "huella-alimentaria" = @{name="Huella Alimentaria"; desc="Calcula impacto CO2 de alimentos"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("co2-transporte","huella-carbono")}
    "huella-carbono" = @{name="Huella de Carbono"; desc="Estima huella CO2 anual"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("consumo-electrico","ahorro-energetico")}
    "irpf-retencion" = @{name="IRPF Retención"; desc="Calcula IRPF y retenciones"; domain="nomina"; cat="Nómina y salario"; icon="Briefcase"; related=@("calculadora-nomina","finiquito")}
    "ley-ohm" = @{name="Ley de Ohm"; desc="Calcula voltaje, corriente o resistencia"; domain="fisica"; cat="Física"; icon="Zap"; related=@("potencia-electrica","consumo-electrico")}
    "libros-al-ano" = @{name="Libros al Año"; desc="Calcula libros a leer anualmente"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("velocidad-lectura","tiempo-estudio")}
    "margen-beneficio" = @{name="Margen de Beneficio"; desc="Calcula margen y beneficio"; domain="descuentos"; cat="Descuentos y márgenes"; icon="TrendingUp"; related=@("precio-hora","punto-equilibrio")}
    "mcm-mcd" = @{name="MCM y MCD"; desc="Calcula mínimo común múltiplo y MCD"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Divide"; related=@("numero-primo","calculadora-factorial")}
    "mol-masa-molar" = @{name="Mol y Masa Molar"; desc="Calcula moles y masa molar"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("concentracion-molar","calculadora-ph")}
    "nota-media" = @{name="Nota Media"; desc="Calcula nota media ponderada"; domain="notas"; cat="Notas y promedios"; icon="GraduationCap"; related=@("media-mediana-moda","calculadora-beca")}
    "nota-necesaria" = @{name="Nota Necesaria"; desc="Calcula nota que necesitas"; domain="notas"; cat="Notas y promedios"; icon="GraduationCap"; related=@("nota-media","calculadora-beca")}
    "numero-primo" = @{name="Verificador Número Primo"; desc="Comprueba si es primo"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Hash"; related=@("mcm-mcd","calculadora-factorial")}
    "paginas-por-dia" = @{name="Páginas por Día"; desc="Planifica lectura diaria"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("velocidad-lectura","tiempo-estudio")}
    "palabras-minuto" = @{name="Palabras por Minuto"; desc="Mide velocidad lectora"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("velocidad-lectura","tiempo-estudio")}
    "perimetro-figuras" = @{name="Perímetro de Figuras"; desc="Calcula perímetro"; domain="geometria"; cat="Geometría"; icon="Circle"; related=@("area-figuras","volumen-solidos")}
    "permutaciones-combinaciones" = @{name="Permutaciones y Combinaciones"; desc="Calcula P(n,r) y C(n,r)"; domain="probabilidad"; cat="Probabilidad"; icon="Layers"; related=@("calculadora-factorial","probabilidad-simple")}
    "potencia-electrica" = @{name="Potencia Eléctrica"; desc="Calcula potencia eléctrica"; domain="fisica"; cat="Física"; icon="Zap"; related=@("ley-ohm","consumo-electrico")}
    "potencias-raices" = @{name="Potencias y Raíces"; desc="Calcula potencias y raíces"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Square"; related=@("calculadora-factorial","ecuacion-lineal")}
    "precio-coste-mas" = @{name="Precio Coste+"; desc="Calcula precio con margen"; domain="descuentos"; cat="Descuentos y márgenes"; icon="Tag"; related=@("margen-beneficio","calculadora-iva")}
    "precio-hora" = @{name="Precio por Hora"; desc="Calcula tarifa horaria"; domain="facturacion"; cat="Facturación e IVA"; icon="Receipt"; related=@("margen-beneficio","punto-equilibrio")}
    "presion-hidrostatica" = @{name="Presión Hidrostática"; desc="Calcula presión en fluido"; domain="fisica"; cat="Física"; icon="Wind"; related=@("conversor-presion","consumo-agua")}
    "presupuesto-boda" = @{name="Presupuesto Boda"; desc="Presupuesta gastos boda"; domain="amor"; cat="Amor y compatibilidad"; icon="Heart"; related=@("coste-viaje","calculadora-iva")}
    "presupuesto-obra" = @{name="Presupuesto de Obra"; desc="Estima coste proyecto"; domain="construccion"; cat="Construcción"; icon="Hammer"; related=@("materiales-construccion","conversor-area")}
    "presupuesto-viaje" = @{name="Presupuesto Viaje"; desc="Presupuesta gastos viaje"; domain="coste-viaje"; cat="Coste de viaje"; icon="Wallet"; related=@("coste-viaje","cambio-divisas")}
    "punto-equilibrio" = @{name="Punto de Equilibrio"; desc="Calcula punto equilibrio"; domain="facturacion"; cat="Facturación e IVA"; icon="BarChart2"; related=@("margen-beneficio","rentabilidad-roi")}
    "regla-tres" = @{name="Calculadora de Regla de Tres"; desc="Resuelve reglas de tres"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Ratio"; related=@("calculadora-porcentaje","calculadora-iva")}
    "rentabilidad-roi" = @{name="Rentabilidad ROI"; desc="Calcula retorno inversión"; domain="facturacion"; cat="Facturación e IVA"; icon="PieChart"; related=@("punto-equilibrio","margen-beneficio")}
    "segunda-ley-newton" = @{name="Segunda Ley de Newton"; desc="Calcula fuerzas aceleración"; domain="fisica"; cat="Física"; icon="Zap"; related=@("energia-cinetica","velocidad-distancia-tiempo")}
    "sistema-ecuaciones" = @{name="Sistema de Ecuaciones"; desc="Resuelve sistemas ecuaciones"; domain="algebra"; cat="Álgebra"; icon="Grid3x3"; related=@("ecuacion-lineal","funcion-cuadratica")}
    "teorema-pitagoras" = @{name="Teorema de Pitágoras"; desc="Calcula triángulo rectángulo"; domain="geometria"; cat="Geometría"; icon="Triangle"; related=@("area-figuras","volumen-solidos")}
    "tiempo-estudio" = @{name="Tiempo de Estudio"; desc="Planifica tiempo estudio"; domain="estudio"; cat="Tiempo de estudio"; icon="Timer"; related=@("nota-media","calculadora-productividad")}
    "tiempo-terminar-libro" = @{name="Tiempo Terminar Libro"; desc="Estima tiempo lectura"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("velocidad-lectura","palabras-minuto")}
    "varianza-desviacion" = @{name="Varianza y Desviación Típica"; desc="Calcula varianza desviación"; domain="estadistica"; cat="Estadística"; icon="TrendingUp"; related=@("media-mediana-moda","probabilidad-simple")}
    "velocidad-lectura" = @{name="Velocidad de Lectura"; desc="Mide velocidad lectora"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("tiempo-estudio","calculadora-productividad")}
    "volumen-solidos" = @{name="Volumen de Sólidos"; desc="Calcula volumen sólidos"; domain="geometria"; cat="Geometría"; icon="Cube"; related=@("perimetro-figuras","area-figuras")}
    # Resto de grupos...
    "agua-alimentos" = @{name="Agua en Alimentos"; desc="Calcula agua virtual"; domain="agua"; cat="Consumo de agua"; icon="Droplets"; related=@("consumo-agua","huella-alimentaria")}
    "alojamiento-comparativa" = @{name="Alojamiento Comparativa"; desc="Compara costes alojamiento"; domain="coste-viaje"; cat="Coste de viaje"; icon="Wallet"; related=@("coste-viaje","cambio-divisas")}
    "alquiler-vs-compra" = @{name="Alquiler vs Compra"; desc="Compara alquilar vs comprar"; domain="hipoteca"; cat="Hipoteca y alquiler"; icon="Home"; related=@("calculadora-hipoteca","rentabilidad-roi")}
    "amortizacion-hipoteca" = @{name="Amortización Hipoteca"; desc="Calcula cuota hipoteca"; domain="hipoteca"; cat="Hipoteca y alquiler"; icon="Home"; related=@("calculadora-hipoteca","alquiler-vs-compra")}
    "angulo-solar" = @{name="Ángulo Solar"; desc="Calcula ángulo óptimo"; domain="solar"; cat="Energía solar"; icon="Sun"; related=@("ahorro-solar","numero-placas-solar")}
    "aprendizaje-espaciado" = @{name="Aprendizaje Espaciado"; desc="Planifica repaso espaciado"; domain="estudio"; cat="Tiempo de estudio"; icon="Timer"; related=@("tiempo-estudio","sesion-estudio")}
    "autonomia-electrico" = @{name="Autonomía Eléctrico"; desc="Calcula rango batería"; domain="combustible"; cat="Combustible y ruta"; icon="Car"; related=@("consumo-combustible","coste-viaje")}
    "baldosas-suelo" = @{name="Baldosas de Suelo"; desc="Calcula baldosas necesarias"; domain="construccion"; cat="Construcción"; icon="Hammer"; related=@("materiales-construccion","conversor-area")}
    "bateria-solar" = @{name="Batería Solar"; desc="Calcula capacidad batería"; domain="solar"; cat="Energía solar"; icon="Sun"; related=@("ahorro-solar","numero-placas-solar")}
    "cable-electrico" = @{name="Cable Eléctrico"; desc="Calcula sección cable"; domain="electricidad"; cat="Electricidad del hogar"; icon="Zap"; related=@("circuito-electrico","potencia-electrica")}
    "caida-libre" = @{name="Caída Libre"; desc="Calcula caída libre"; domain="fisica"; cat="Física"; icon="Zap"; related=@("energia-potencial","velocidad-distancia-tiempo")}
    "calculadora-beca" = @{name="Calculadora de Beca"; desc="Estima elegibilidad beca"; domain="becas"; cat="Becas y financiamiento"; icon="BookMarked"; related=@("nota-media","calculadora-nomina")}
    "calculadora-descuento" = @{name="Calculadora de Descuentos"; desc="Calcula precio descuento"; domain="descuentos"; cat="Descuentos y márgenes"; icon="Tag"; related=@("calculadora-iva","calculadora-porcentaje")}
    "calculadora-distancia" = @{name="Calculadora de Distancia"; desc="Calcula distancia viaje"; domain="distancia"; cat="Distancia y ruta"; icon="MapPin"; related=@("consumo-combustible","conversor-longitud")}
    "calculadora-factorial" = @{name="Calculadora de Factorial"; desc="Calcula factorial"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Calculator"; related=@("permutaciones-combinaciones","numero-primo")}
    "calculadora-hipoteca" = @{name="Calculadora de Hipoteca"; desc="Calcula cuota hipoteca"; domain="hipoteca"; cat="Hipoteca y alquiler"; icon="Home"; related=@("calculadora-iva","calculadora-nomina")}
    "calculadora-iva" = @{name="Calculadora de IVA"; desc="Añade o extrae IVA"; domain="facturacion"; cat="Facturación e IVA"; icon="Receipt"; related=@("calculadora-descuento","calculadora-porcentaje")}
    "calculadora-nomina" = @{name="Calculadora de Nómina"; desc="Estima salario neto"; domain="nomina"; cat="Nómina y salario"; icon="Briefcase"; related=@("calculadora-iva","calculadora-hipoteca")}
    "calculadora-ph" = @{name="Calculadora de pH"; desc="Calcula pH"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("concentracion-molar","mol-masa-molar")}
    "calculadora-pintura" = @{name="Calculadora de Pintura"; desc="Calcula pintura necesaria"; domain="pintura"; cat="Pintura y superficies"; icon="Paintbrush"; related=@("materiales-construccion","conversor-area")}
    "calculadora-porcentaje" = @{name="Calculadora de Porcentaje"; desc="Calcula porcentajes"; domain="matematicas-basicas"; cat="Matemáticas básicas"; icon="Percent"; related=@("calculadora-descuento","calculadora-iva")}
    "calculadora-productividad" = @{name="Productividad y Tiempo"; desc="Calcula productividad"; domain="productividad"; cat="Productividad"; icon="ListChecks"; related=@("calculadora-nomina","tiempo-estudio")}
    "calculadora-propina" = @{name="Calculadora de Propina"; desc="Calcula propina"; domain="propinas"; cat="Propinas y cuenta"; icon="CreditCard"; related=@("calculadora-descuento","calculadora-iva")}
    "calculadora-reciclaje" = @{name="Calculadora de Reciclaje"; desc="Calcula impacto reciclaje"; domain="reciclaje"; cat="Reciclaje"; icon="Recycle"; related=@("huella-carbono","consumo-agua")}
    "calculadora-sueno" = @{name="Calculadora de Sueño"; desc="Calcula ciclos sueño"; domain="sueno"; cat="Sueño y descanso"; icon="Moon"; related=@("tiempo-estudio","calculadora-productividad")}
    "calidad-agua" = @{name="Calidad Agua"; desc="Evalúa pureza agua"; domain="agua"; cat="Consumo de agua"; icon="Droplets"; related=@("consumo-agua","captacion-lluvia")}
    "calor-especifico" = @{name="Calor Específico"; desc="Calcula calor específico"; domain="fisica"; cat="Física"; icon="Zap"; related=@("conversor-temperatura","conversor-energia")}
    "cambio-divisas" = @{name="Cambio Divisas"; desc="Convierte monedas"; domain="coste-viaje"; cat="Coste de viaje"; icon="Wallet"; related=@("conversor-monedas","coste-viaje")}
    "camino-vida" = @{name="Camino Vida"; desc="Calcula camino numerológico"; domain="numerologia"; cat="Numerología"; icon="Hash"; related=@("numero-numerologia","test-compatibilidad")}
    "capacitation-lluvia" = @{name="Captación Lluvia"; desc="Calcula agua recolectable"; domain="agua"; cat="Consumo de agua"; icon="Droplets"; related=@("consumo-agua","riego-jardin")}
    "cara-o-cruz" = @{name="Cara o Cruz"; desc="Simula lanzamiento moneda"; domain="suerte"; cat="Suerte y probabilidad"; icon="Star"; related=@("numeros-suerte","dado-virtual")}
    "cemento-mortero" = @{name="Cemento y Mortero"; desc="Calcula cemento mortero"; domain="construccion"; cat="Construcción"; icon="Hammer"; related=@("materiales-construccion","presupuesto-obra")}
    "ciclos-personales" = @{name="Ciclos Personales"; desc="Calcula ciclos vitales"; domain="numerologia"; cat="Numerología"; icon="Hash"; related=@("numero-numerologia","test-compatibilidad")}
    "ciclos-sueno" = @{name="Ciclos Sueño"; desc="Calcula ciclos sueño"; domain="sueno"; cat="Sueño y descanso"; icon="Moon"; related=@("calculadora-sueno","hora-melatonina")}
    "circuito-electrico" = @{name="Circuito Eléctrico"; desc="Calcula circuito eléctrico"; domain="electricidad"; cat="Electricidad del hogar"; icon="Zap"; related=@("ley-ohm","cable-electrico")}
    "co2-transporte" = @{name="CO2 Transporte"; desc="Calcula emisiones viaje"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("huella-carbono","consumo-combustible")}
    "compatibilidad-numerologica" = @{name="Compatibilidad Numerológica"; desc="Calcula compatibilidad números"; domain="numerologia"; cat="Numerología"; icon="Hash"; related=@("numero-numerologia","test-compatibilidad")}
    "compatibilidad-zodiacal" = @{name="Compatibilidad Zodiacal"; desc="Calcula compatibilidad signos"; domain="amor"; cat="Amor y compatibilidad"; icon="Heart"; related=@("test-compatibilidad","dias-juntos")}
    "compensacion-co2" = @{name="Compensación CO2"; desc="Calcula offsets CO2"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("huella-carbono","consumo-electrico")}
    "compost-organico" = @{name="Compost Orgánico"; desc="Calcula abono producido"; domain="reciclaje"; cat="Reciclaje"; icon="Recycle"; related=@("fertilizante-jardin","riego-jardin")}
    "comprension-lectora" = @{name="Comprensión Lectora"; desc="Evalúa comprensión lectura"; domain="lectura"; cat="Lectura y velocidad"; icon="BookOpen"; related=@("velocidad-lectura","tiempo-estudio")}
    "consumo-agua-hogar" = @{name="Consumo Agua Hogar"; desc="Calcula consumo agua"; domain="consumo"; cat="Consumo energético"; icon="Droplets"; related=@("consumo-agua","factura-gas")}
    "consumo-combustible" = @{name="Consumo de Combustible"; desc="Calcula gasto gasolina"; domain="combustible"; cat="Combustible y ruta"; icon="Car"; related=@("calculadora-distancia","coste-viaje")}
    "consumo-ducha" = @{name="Consumo Ducha"; desc="Calcula agua ducha"; domain="agua"; cat="Consumo de agua"; icon="Droplets"; related=@("consumo-agua","agua-alimentos")}
    "consumo-electrico" = @{name="Consumo Eléctrico"; desc="Calcula coste eléctrico"; domain="electricidad"; cat="Electricidad del hogar"; icon="Zap"; related=@("ahorro-energetico","conversor-energia")}
    "conversor-angulos" = @{name="Conversor de Ángulos"; desc="Convierte ángulos"; domain="angulos"; cat="Ángulos"; icon="Compass"; related=@("seno-coseno","area-figuras")}
    "conversor-area" = @{name="Conversor de Área"; desc="Convierte área"; domain="area"; cat="Área y superficie"; icon="LayoutGrid"; related=@("area-figuras","materiales-construccion")}
    "conversor-caudal" = @{name="Conversor de Caudal"; desc="Convierte caudal"; domain="volumen"; cat="Volumen y capacidad"; icon="Box"; related=@("conversor-volumen","conversor-velocidad")}
    "conversor-datos" = @{name="Conversor de Datos"; desc="Convierte datos"; domain="datos"; cat="Datos digitales"; icon="HardDrive"; related=@("conversor-velocidad","calculadora-productividad")}
    "conversor-densidad" = @{name="Conversor de Densidad"; desc="Convierte densidad"; domain="peso"; cat="Peso y masa"; icon="Weight"; related=@("conversor-peso","conversor-volumen")}
    "conversor-eficiencia" = @{name="Conversor de Eficiencia"; desc="Convierte eficiencia"; domain="velocidad"; cat="Velocidad"; icon="Gauge"; related=@("rentabilidad-roi","margen-beneficio")}
    "conversor-energia" = @{name="Conversor de Energía"; desc="Convierte energía"; domain="energia"; cat="Energía y potencia"; icon="Battery"; related=@("ahorro-energetico","consumo-electrico")}
    "conversor-frecuencia" = @{name="Conversor de Frecuencia"; desc="Convierte frecuencia"; domain="tiempo"; cat="Tiempo y duración"; icon="Clock"; related=@("conversor-tiempo","frecuencia-onda")}
    "conversor-fuerza" = @{name="Conversor de Fuerza"; desc="Convierte fuerza"; domain="presion"; cat="Presión"; icon="Wind"; related=@("conversor-presion","segunda-ley-newton")}
    "conversor-iluminacion" = @{name="Conversor de Iluminación"; desc="Convierte iluminación"; domain="datos"; cat="Datos digitales"; icon="HardDrive"; related=@("conversor-energia","consumo-electrico")}
    "conversor-longitud" = @{name="Conversor de Longitud"; desc="Convierte longitud"; domain="longitud"; cat="Longitud y distancia"; icon="Ruler"; related=@("conversor-peso","calculadora-distancia")}
    "conversor-monedas" = @{name="Conversor de Monedas"; desc="Convierte monedas"; domain="monedas"; cat="Monedas"; icon="DollarSign"; related=@("calculadora-iva","coste-viaje")}
    "conversor-par-motor" = @{name="Conversor de Par Motor"; desc="Convierte par motor"; domain="presion"; cat="Presión"; icon="Wind"; related=@("conversor-fuerza","potencia-electrica")}
    "conversor-peso" = @{name="Conversor de Peso"; desc="Convierte peso"; domain="peso"; cat="Peso y masa"; icon="Weight"; related=@("conversor-longitud","peso-equipaje")}
    "conversor-potencia" = @{name="Conversor de Potencia"; desc="Convierte potencia"; domain="energia"; cat="Energía y potencia"; icon="Battery"; related=@("conversor-energia","consumo-electrico")}
    "conversor-presion" = @{name="Conversor de Presión"; desc="Convierte presión"; domain="presion"; cat="Presión"; icon="Wind"; related=@("conversor-fuerza","velocidad-distancia-tiempo")}
    "conversor-temperatura" = @{name="Conversor de Temperatura"; desc="Convierte temperatura"; domain="temperatura"; cat="Temperatura"; icon="Thermometer"; related=@("conversor-longitud","ahorro-energetico")}
    "conversor-tiempo" = @{name="Conversor de Tiempo"; desc="Convierte tiempo"; domain="tiempo"; cat="Tiempo y duración"; icon="Clock"; related=@("diferencia-horaria","calculadora-productividad")}
    "conversor-velocidad" = @{name="Conversor de Velocidad"; desc="Convierte velocidad"; domain="velocidad"; cat="Velocidad"; icon="Gauge"; related=@("velocidad-distancia-tiempo","conversor-longitud")}
    "conversor-volumen" = @{name="Conversor de Volumen"; desc="Convierte volumen"; domain="volumen"; cat="Volumen y capacidad"; icon="Box"; related=@("conversor-peso","concentracion-molar")}
    "conversion-notas" = @{name="Conversión Notas"; desc="Convierte escalas notas"; domain="notas"; cat="Notas y promedios"; icon="GraduationCap"; related=@("nota-media","calculadora-beca")}
    "correlacion-datos" = @{name="Correlación de Datos"; desc="Calcula correlación"; domain="estadistica"; cat="Estadística"; icon="LineChart"; related=@("media-mediana-moda","varianza-desviacion")}
    "coste-carrera" = @{name="Coste Carrera"; desc="Calcula coste carrera"; domain="becas"; cat="Becas y financiamiento"; icon="BookMarked"; related=@("calculadora-beca","simulador-beca")}
    "coste-peajes" = @{name="Costo Peajes"; desc="Calcula coste peajes"; domain="coste-viaje"; cat="Coste de viaje"; icon="Wallet"; related=@("coste-viaje","consumo-combustible")}
    "coste-reunion" = @{name="Coste de Reunión"; desc="Calcula coste reunión"; domain="productividad"; cat="Productividad"; icon="ListChecks"; related=@("horas-extra","pomodoro")}
    "costo-gasolinera" = @{name="Costo Gasolinera"; desc="Calcula coste gasolinera"; domain="combustible"; cat="Combustible y ruta"; icon="Car"; related=@("consumo-combustible","coste-viaje")}
    "dado-virtual" = @{name="Dado Virtual"; desc="Simula tirada dado"; domain="suerte"; cat="Suerte y probabilidad"; icon="Star"; related=@("numeros-suerte","generador-loteria")}
    "deuda-sueno" = @{name="Deuda Sueño"; desc="Calcula falta sueño"; domain="sueno"; cat="Sueño y descanso"; icon="Moon"; related=@("ciclos-sueno","calculadora-sueno")}
    "descuento-volumen" = @{name="Descuento por Volumen"; desc="Calcula descuentos"; domain="descuentos"; cat="Descuentos y márgenes"; icon="Tag"; related=@("calculadora-descuento","precio-coste-mas")}
    "dias-juntos" = @{name="Días Juntos"; desc="Calcula días relación"; domain="amor"; cat="Amor y compatibilidad"; icon="Heart"; related=@("compatibilidad-zodiacal","test-compatibilidad")}
    "diferencia-horaria" = @{name="Diferencia Horaria"; desc="Calcula diferencia horaria"; domain="zonas"; cat="Zonas horarias"; icon="Globe"; related=@("conversor-tiempo","calculadora-distancia")}
    "diluciones-quimica" = @{name="Diluciones Química"; desc="Calcula diluciones"; domain="quimica"; cat="Química"; icon="FlaskConical"; related=@("calculadora-ph","concentracion-molar")}
    "dimensions-maleta" = @{name="Dimensiones Maleta"; desc="Calcula volumen maleta"; domain="equipaje"; cat="Equipaje y peso"; icon="Package"; related=@("peso-equipaje","conversor-volumen")}
    "distancia-a-pie" = @{name="Distancia a Pie"; desc="Calcula tiempo caminata"; domain="distancia"; cat="Distancia y ruta"; icon="MapPin"; related=@("calculadora-distancia","velocidad-distancia-tiempo")}
    "distancia-ciclismo" = @{name="Distancia Ciclismo"; desc="Calcula tiempo bicicleta"; domain="distancia"; cat="Distancia y ruta"; icon="MapPin"; related=@("calculadora-distancia","velocidad-distancia-tiempo")}
    "distribucion-normal" = @{name="Distribución Normal"; desc="Calcula distribución normal"; domain="estadistica"; cat="Estadística"; icon="Bell"; related=@("media-mediana-moda","varianza-desviacion")}
    "duracion-vuelo" = @{name="Duración Vuelo"; desc="Calcula duración vuelo"; domain="zonas"; cat="Zonas horarias"; icon="Globe"; related=@("diferencia-horaria","coste-viaje")}
    "ecuacion-lineal" = @{name="Ecuación Lineal"; desc="Resuelve ecuación lineal"; domain="algebra"; cat="Álgebra"; icon="SquareFunction"; related=@("calculadora-porcentaje","probabilidad-simple")}
    "eficiencia-energetica" = @{name="Eficiencia Energética"; desc="Calcula eficiencia"; domain="carbono"; cat="Huella de carbono"; icon="Leaf"; related=@("ahorro-energetico","consumo-electrico")}
    "electrodomesticos" = @{name="Electrodomésticos"; desc="Calcula consumo electrodoméstico"; domain="consumo"; cat="Consumo energético"; icon="Zap"; related=@("consumo-electrico","ahorro-energetico")}
}

Write-Host "Metadatos completados: $($metadata.Count) calculadoras"
Write-Host "Tipos de dominio: $($metadata.Values | Select-Object -ExpandProperty domain | Sort-Object -Unique | Count)"
