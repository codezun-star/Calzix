export const SITE = {
  name: 'Calzix',
  url: 'https://calzix.com',
  description: 'Calculadoras online gratuitas — finanzas, salud, matemáticas, conversiones y más. Resultados al instante.',
  email: 'codezun@gmail.com',
  twitterHandle: '@calzix',
} as const;

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
}

// Metadata SEO por página — slug como clave
export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Calzix — Calculadoras online gratuitas',
    description: 'Más de 50 calculadoras gratuitas: hipotecas, IMC, porcentajes, conversión de unidades y mucho más. Sin registro, al instante.',
    canonical: 'https://calzix.com',
  },
  privacidad: {
    title: 'Política de privacidad — Calzix',
    description: 'Política de privacidad de Calzix.',
    canonical: 'https://calzix.com/privacidad',
  },
  terminos: {
    title: 'Términos de uso — Calzix',
    description: 'Términos y condiciones de uso de Calzix.',
    canonical: 'https://calzix.com/terminos',
  },
  cookies: {
    title: 'Política de cookies — Calzix',
    description: 'Política de cookies de Calzix.',
    canonical: 'https://calzix.com/cookies',
  },
  'aviso-legal': {
    title: 'Aviso legal — Calzix',
    description: 'Aviso legal de Calzix.',
    canonical: 'https://calzix.com/aviso-legal',
  },
  contacto: {
    title: 'Contacto — Calzix',
    description: 'Contacta con el equipo de Calzix.',
    canonical: 'https://calzix.com/contacto',
  },
  // ── Páginas de categoría ─────────────────────────────────────────────────
  matematicas: {
    title: 'Calculadoras de Matemáticas — Calzix',
    description: 'Calculadoras gratuitas de aritmética, álgebra, geometría, estadística, trigonometría y probabilidad.',
    canonical: 'https://calzix.com/matematicas',
  },
  ciencias: {
    title: 'Calculadoras de Ciencias — Calzix',
    description: 'Calculadoras gratuitas de física y química para estudiantes y profesionales.',
    canonical: 'https://calzix.com/ciencias',
  },
  conversion: {
    title: 'Conversores de Unidades — Calzix',
    description: 'Convierte longitud, peso, temperatura, velocidad, área, volumen, energía, presión, tiempo, datos, ángulos y monedas.',
    canonical: 'https://calzix.com/conversion',
  },
  hogar: {
    title: 'Calculadoras del Hogar — Calzix',
    description: 'Calculadoras de construcción, pintura, electricidad, hipotecas, consumo energético y jardín.',
    canonical: 'https://calzix.com/hogar',
  },
  trabajo: {
    title: 'Calculadoras de Trabajo — Calzix',
    description: 'Calculadoras de IVA, descuentos, nómina, productividad y propinas para el trabajo diario.',
    canonical: 'https://calzix.com/trabajo',
  },
  educacion: {
    title: 'Calculadoras de Educación — Calzix',
    description: 'Calculadoras de notas, becas, tiempo de estudio y velocidad de lectura.',
    canonical: 'https://calzix.com/educacion',
  },
  viaje: {
    title: 'Calculadoras de Viaje — Calzix',
    description: 'Calculadoras de combustible, distancia, zonas horarias, equipaje y coste total del viaje.',
    canonical: 'https://calzix.com/viaje',
  },
  naturaleza: {
    title: 'Calculadoras de Naturaleza — Calzix',
    description: 'Calculadoras de huella de carbono, consumo de agua, energía solar y reciclaje.',
    canonical: 'https://calzix.com/naturaleza',
  },
  ocio: {
    title: 'Calculadoras de Ocio — Calzix',
    description: 'Calculadoras lúdicas de compatibilidad, números de la suerte, numerología y sueño.',
    canonical: 'https://calzix.com/ocio',
  },
  // ── Matemáticas ──────────────────────────────────────────────────────────
  'calculadora-porcentaje': {
    title: 'Calculadora de Porcentaje Online Gratis — Calzix',
    description: 'Calcula el % de un número, qué porcentaje es un valor sobre un total o el número original. Incluye ejemplos con IVA de México, Colombia, Chile y más países LATAM.',
    canonical: 'https://calzix.com/calculadora-porcentaje',
  },
  'ecuacion-lineal': {
    title: 'Calculadora de Ecuación Lineal ax+b=c Online — Calzix',
    description: 'Resuelve ecuaciones de primer grado ax + b = c paso a paso al instante. Muestra el procedimiento completo. Gratis, sin registro, para estudiantes de toda Latinoamérica.',
    canonical: 'https://calzix.com/ecuacion-lineal',
  },
  'area-figuras': {
    title: 'Calculadora de Área de Figuras Geométricas Online — Calzix',
    description: 'Calcula el área y perímetro de cuadrado, rectángulo, círculo, triángulo y trapecio al instante. Fórmulas precisas. Gratis y sin registro.',
    canonical: 'https://calzix.com/area-figuras',
  },
  'media-mediana-moda': {
    title: 'Calculadora de Media, Mediana y Moda Online Gratis — Calzix',
    description: 'Calcula la media aritmética, mediana, moda, mínimo, máximo, rango y desviación estándar de cualquier conjunto de datos al instante. Estadística descriptiva gratis para estudiantes y profesionales de toda Latinoamérica.',
    canonical: 'https://calzix.com/media-mediana-moda',
  },
  'seno-coseno': {
    title: 'Calculadora de Seno, Coseno y Tangente Online Gratis — Calzix',
    description: 'Calcula seno, coseno, tangente, arcoseno, arcocoseno y arcotangente de cualquier ángulo en grados o radianes al instante. Trigonometría precisa a 6 decimales para bachillerato y universidad en toda Latinoamérica.',
    canonical: 'https://calzix.com/seno-coseno',
  },
  'probabilidad-simple': {
    title: 'Calculadora de Probabilidad Simple Online Gratis — Calzix',
    description: 'Calcula la probabilidad de un evento como fracción, decimal y porcentaje. Incluye probabilidad del evento contrario (complemento). Ideal para estadística básica, combinatoria y exámenes escolares en LATAM.',
    canonical: 'https://calzix.com/probabilidad-simple',
  },
  // ── Ciencias ─────────────────────────────────────────────────────────────
  'velocidad-distancia-tiempo': {
    title: 'Calculadora de Velocidad, Distancia y Tiempo Online — Calzix',
    description: 'Despeja velocidad (km/h), distancia (km) o tiempo (h y min) de la fórmula v = d/t al instante. Incluye conversión m/s a km/h. Ideal para física, viajes y exámenes en toda Latinoamérica.',
    canonical: 'https://calzix.com/velocidad-distancia-tiempo',
  },
  'concentracion-molar': {
    title: 'Calculadora de Concentración Molar Online Gratis — Calzix',
    description: 'Calcula molaridad (mol/L), moles y volumen de disoluciones. Fórmulas C=n/V y n=m/M paso a paso. Química para bachillerato y universidad en toda Latinoamérica.',
    canonical: 'https://calzix.com/concentracion-molar',
  },
  // ── Conversión ───────────────────────────────────────────────────────────
  'conversor-longitud': {
    title: 'Conversor de Longitud: metros a pies, km a millas, cm a pulgadas — Calzix',
    description: 'Convierte metros, kilómetros, cm, mm, millas, yardas, pies y pulgadas al instante. Para construcción, topografía, física e ingeniería en México, Colombia y toda LATAM.',
    canonical: 'https://calzix.com/conversor-longitud',
  },
  'conversor-peso': {
    title: 'Conversor de Peso: kg a libras, gramos, onzas, toneladas — Calzix',
    description: 'Convierte kilogramos, libras, gramos, miligramos, onzas y toneladas métricas en segundos. Para nutrición, medicina, comercio y logística en toda América Latina.',
    canonical: 'https://calzix.com/conversor-peso',
  },
  'conversor-temperatura': {
    title: 'Conversor de Temperatura: Celsius a Fahrenheit y Kelvin — Calzix',
    description: 'Convierte Celsius, Fahrenheit y Kelvin al instante. Fórmulas explicadas paso a paso. Para cocina, meteorología, física e industria en México, Argentina y toda LATAM.',
    canonical: 'https://calzix.com/conversor-temperatura',
  },
  'conversor-velocidad': {
    title: 'Conversor de Velocidad: km/h a mph, m/s, nudos — Calzix',
    description: 'Convierte km/h, m/s, mph, pies/segundo y nudos al instante. Útil en automovilismo, aviación, meteorología y física en México, Argentina, Chile y toda América Latina.',
    canonical: 'https://calzix.com/conversor-velocidad',
  },
  'conversor-area': {
    title: 'Conversor de Área: m² a hectáreas, acres, km², pies² — Calzix',
    description: 'Convierte metros cuadrados, hectáreas, km², acres, cm², mm² y pulgadas cuadradas. Ideal para bienes raíces, agricultura, arquitectura y urbanismo en toda LATAM.',
    canonical: 'https://calzix.com/conversor-area',
  },
  'conversor-volumen': {
    title: 'Conversor de Volumen: litros a galones, m³, ml, tazas — Calzix',
    description: 'Convierte litros, mililitros, metros cúbicos, galones americanos, onzas líquidas, pintas y tazas. Para cocina, farmacia, industria y laboratorio en América Latina.',
    canonical: 'https://calzix.com/conversor-volumen',
  },
  'conversor-energia': {
    title: 'Conversor de Energía: julios a kWh, kcal, BTU, calorías — Calzix',
    description: 'Convierte julios, kilojulios, calorías, kilocalorías, Wh, kWh y BTU. Para nutrición, eficiencia energética, física y termodinámica en México, Brasil y toda LATAM.',
    canonical: 'https://calzix.com/conversor-energia',
  },
  'conversor-presion': {
    title: 'Conversor de Presión: pascal, bar, atm, PSI, mmHg — Calzix',
    description: 'Convierte pascales, bares, atmósferas, PSI, mmHg y kPa al instante. Para ingeniería industrial, medicina, neumáticos e hidrocarburos en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/conversor-presion',
  },
  'conversor-tiempo': {
    title: 'Conversor de Tiempo: segundos, minutos, horas, días, años — Calzix',
    description: 'Convierte milisegundos, segundos, minutos, horas, días, semanas, meses y años al instante. Para programación, física, gestión de proyectos y exámenes en toda LATAM.',
    canonical: 'https://calzix.com/conversor-tiempo',
  },
  'conversor-datos': {
    title: 'Conversor de Datos: GB a MB, TB a GB, KB a bytes — Calzix',
    description: 'Convierte bytes, KB, MB, GB, TB y sus equivalentes binarios (KiB, MiB, GiB) al instante. Para almacenamiento, redes y telecomunicaciones en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/conversor-datos',
  },
  'conversor-angulos': {
    title: 'Conversor de Ángulos: grados a radianes, gradianes — Calzix',
    description: 'Convierte grados, radianes, gradianes y vueltas completas al instante. Para trigonometría, física, topografía, programación y exámenes COMIPEMS, ICFES, PAES en LATAM.',
    canonical: 'https://calzix.com/conversor-angulos',
  },
  'conversor-monedas': {
    title: 'Conversor de Monedas: dólar, peso, real, euro — Calzix',
    description: 'Convierte USD, MXN, COP, CLP, BRL, EUR, GBP, JPY y más con tasas orientativas 2024. Para viajes, comercio y finanzas personales en México, Colombia, Chile y LATAM.',
    canonical: 'https://calzix.com/conversor-monedas',
  },
  // ── Hogar ────────────────────────────────────────────────────────────────
  'materiales-construccion': {
    title: 'Calculadora de Ladrillos y Materiales: cemento, arena, bloques — Calzix',
    description: 'Calcula ladrillos, sacos de cemento y arena para paredes de mampostería en metros cuadrados. Para albañilería en México, Colombia, Chile, Perú y toda LATAM.',
    canonical: 'https://calzix.com/materiales-construccion',
  },
  'calculadora-pintura': {
    title: 'Calculadora de Pintura de Paredes: litros por habitación — Calzix',
    description: 'Calcula los litros de pintura para paredes según dimensiones, número de manos y rendimiento del producto. Para casas y departamentos en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/calculadora-pintura',
  },
  'consumo-electrico': {
    title: 'Calculadora de Consumo Eléctrico: kWh y costo mensual — Calzix',
    description: 'Calcula los kWh y el costo en tu moneda local de cualquier electrodoméstico por día, mes y año. Para tarifas CFE, EPM, Enel, ENEE y más en toda LATAM.',
    canonical: 'https://calzix.com/consumo-electrico',
  },
  'calculadora-hipoteca': {
    title: 'Calculadora de Hipoteca: cuota mensual e intereses — Calzix',
    description: 'Calcula la cuota mensual, total pagado e intereses de tu crédito hipotecario. Sistema francés de amortización. Para bancos de México, Colombia, Chile, Perú y toda LATAM.',
    canonical: 'https://calzix.com/calculadora-hipoteca',
  },
  'ahorro-energetico': {
    title: 'Calculadora de Ahorro Energético: kWh y CO₂ ahorrado — Calzix',
    description: 'Calcula el ahorro en kWh, dinero y CO₂ al mejorar la eficiencia energética de tu hogar. Para tarifas CFE, EPM, Enel y distribuidoras eléctricas en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/ahorro-energetico',
  },
  'area-jardin': {
    title: 'Calculadora de Área del Jardín: m², plantas y riego — Calzix',
    description: 'Calcula el área de tu jardín (rectángulo, círculo o triángulo), las plantas necesarias y el agua de riego semanal. Para jardinería en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/area-jardin',
  },
  // ── Trabajo ──────────────────────────────────────────────────────────────
  'calculadora-iva': {
    title: 'Calculadora de IVA / IVA LATAM: añadir o extraer impuesto — Calzix',
    description: 'Añade o extrae el IVA/impuesto sobre ventas de cualquier importe. Configurable para el 16 % (México), 19 % (Colombia/Chile), 21 % (Argentina) y otros países de LATAM.',
    canonical: 'https://calzix.com/calculadora-iva',
  },
  'calculadora-descuento': {
    title: 'Calculadora de Descuentos: precio final y ahorro — Calzix',
    description: 'Calcula el precio final tras aplicar un descuento en porcentaje, con opción de incluir IVA. Para tiendas, e-commerce y rebajas en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/calculadora-descuento',
  },
  'calculadora-nomina': {
    title: 'Calculadora de Nómina: bruto a neto con IRPF y Seguridad Social — Calzix',
    description: 'Calcula tu salario neto mensual desde el bruto anual, con retención de IRPF y cotización a la Seguridad Social. Orientativo para España y LATAM.',
    canonical: 'https://calzix.com/calculadora-nomina',
  },
  'calculadora-productividad': {
    title: 'Calculadora de Productividad: tasa de completación y tareas por hora — Calzix',
    description: 'Mide tu productividad: tasa de completación, tareas por hora y tiempo medio por tarea. Para profesionales y equipos de trabajo en LATAM. Gratis.',
    canonical: 'https://calzix.com/calculadora-productividad',
  },
  'calculadora-propina': {
    title: 'Calculadora de Propina: total y división por comensales — Calzix',
    description: 'Calcula la propina en porcentaje, el total a pagar y la parte de cada comensal. Para restaurantes en México, Colombia, Chile, Perú y toda LATAM.',
    canonical: 'https://calzix.com/calculadora-propina',
  },
  // ── Educación ────────────────────────────────────────────────────────────
  'nota-media': {
    title: 'Calculadora de Nota Media Ponderada por Creditos — Calzix',
    description: 'Calcula tu media simple y ponderada por creditos en universidades de Mexico, Colombia, Chile, Peru y Argentina. Muestra si apruebas. Gratis.',
    canonical: 'https://calzix.com/nota-media',
  },
  'calculadora-beca': {
    title: 'Calculadora de Nota para Becas Universitarias — Calzix',
    description: 'Comprueba si tu nota media cumple los umbrales de beca general, rendimiento y excelencia. Equivalentes para Mexico, Colombia, Chile y Peru. Gratis.',
    canonical: 'https://calzix.com/calculadora-beca',
  },
  'tiempo-estudio': {
    title: 'Calculadora de Tiempo de Estudio por Temas — Calzix',
    description: 'Calcula cuantas horas necesitas para estudiar segun temas, paginas y velocidad de lectura. Estima dias a 2, 4 o 6 horas por dia. Gratis.',
    canonical: 'https://calzix.com/tiempo-estudio',
  },
  'velocidad-lectura': {
    title: 'Calculadora de Velocidad de Lectura en Palabras por Minuto — Calzix',
    description: 'Mide tu velocidad lectora en palabras por minuto y estima cuanto tardas en terminar un libro. Clasificacion lento, promedio, rapido. Gratis.',
    canonical: 'https://calzix.com/velocidad-lectura',
  },
  // ── Viaje ────────────────────────────────────────────────────────────────
  'consumo-combustible': {
    title: 'Calculadora de Consumo de Combustible por Trayecto — Calzix',
    description: 'Calcula litros de gasolina o diesel y costo total del viaje segun distancia, consumo L/100 km y precio por litro. Divide por personas y calcula CO2. Gratis.',
    canonical: 'https://calzix.com/consumo-combustible',
  },
  'calculadora-distancia': {
    title: 'Calculadora de Tiempo de Viaje por Distancia y Velocidad — Calzix',
    description: 'Calcula el tiempo de conduccion segun distancia en km y velocidad media. Incluye paradas y calcula hora de llegada. Para carretera, bicicleta o tren. Gratis.',
    canonical: 'https://calzix.com/calculadora-distancia',
  },
  'diferencia-horaria': {
    title: 'Calculadora de Diferencia Horaria entre Paises — Calzix',
    description: 'Calcula la hora actual en otro pais. Cubre todas las zonas de LATAM: Mexico UTC-6, Colombia UTC-5, Argentina UTC-3, Chile, Peru, Venezuela. Tiempo real. Gratis.',
    canonical: 'https://calzix.com/diferencia-horaria',
  },
  'peso-equipaje': {
    title: 'Calculadora de Peso de Equipaje de Mano y Bodega — Calzix',
    description: 'Comprueba si tu maleta supera el limite de peso de la aerolinea. Lista todos los articulos, elige el limite (20, 23 o 32 kg) y calcula el margen disponible. Gratis.',
    canonical: 'https://calzix.com/peso-equipaje',
  },
  'coste-viaje': {
    title: 'Calculadora de Costo Total del Viaje con Desglose — Calzix',
    description: 'Suma todos los gastos del viaje: vuelos, alojamiento, comida, actividades y extras. Calcula el total y el costo por persona. Para viajes desde LATAM. Gratis.',
    canonical: 'https://calzix.com/coste-viaje',
  },
  // ── Naturaleza ───────────────────────────────────────────────────────────
  'huella-carbono': {
    title: 'Calculadora de Huella de Carbono Anual Personal — Calzix',
    description: 'Calcula tu huella de CO2 anual por coche, vuelos, electricidad y dieta. Muestra cuantos arboles necesitas plantar para compensarla. Para LATAM. Gratis.',
    canonical: 'https://calzix.com/huella-carbono',
  },
  'consumo-agua': {
    title: 'Calculadora de Consumo de Agua del Hogar con Desglose — Calzix',
    description: 'Calcula los litros diarios y el costo mensual del agua en tu hogar. Incluye ducha, lavadora, inodoro y riego. Introduce el precio por m3 en MXN, COP o CLP. Gratis.',
    canonical: 'https://calzix.com/consumo-agua',
  },
  'ahorro-solar': {
    title: 'Calculadora de Ahorro con Paneles Solares por Mes y Ano — Calzix',
    description: 'Calcula el ahorro mensual y anual de una instalacion solar segun la potencia, las horas de sol y el precio de la electricidad. Para hogares de Mexico, Colombia y Chile. Gratis.',
    canonical: 'https://calzix.com/ahorro-solar',
  },
  'calculadora-reciclaje': {
    title: 'Calculadora de Impacto del Reciclaje por Material — Calzix',
    description: 'Calcula el CO2 evitado al reciclar papel, plastico, vidrio, metales y organicos cada mes. Muestra los arboles equivalentes. Para hogares y empresas de LATAM. Gratis.',
    canonical: 'https://calzix.com/calculadora-reciclaje',
  },
  // ── Ocio ─────────────────────────────────────────────────────────────────
  'test-compatibilidad': {
    title: 'Test de Compatibilidad de Pareja Online — Calzix',
    description: 'Calcula el porcentaje de compatibilidad de pareja por nombres. Herramienta ludica para San Valentin en Mexico, Colombia y Chile. Gratis, sin registro.',
    canonical: 'https://calzix.com/test-compatibilidad',
  },
  'numeros-suerte': {
    title: 'Generador de Numeros de la Suerte — Melate, Baloto, Loto — Calzix',
    description: 'Genera numeros de la suerte para Melate Mexico, Baloto Colombia, Loto Chile y La Tinka Peru. Aleatorio con crypto. Gratis, sin registro.',
    canonical: 'https://calzix.com/numeros-suerte',
  },
  'numero-numerologia': {
    title: 'Calculadora de Numerologia — Numero de Vida y Destino — Calzix',
    description: 'Calcula tu numero de camino de vida y numero de expresion segun la numerologia de Pitagoras. Sistema pitagorico. Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-numerologia',
  },
  'calculadora-sueno': {
    title: 'Calculadora de Sueno — Ciclos y Hora Ideal para Despertar — Calzix',
    description: 'Calcula la hora ideal para despertar segun ciclos de sueno de 90 minutos. Basado en ciencia NSF. Mexico, Colombia, Chile. Gratis.',
    canonical: 'https://calzix.com/calculadora-sueno',
  },
  // ── Matemáticas (nuevas) ─────────────────────────────────────────────────
  'calculadora-factorial': {
    title: 'Calculadora de Factorial n! Online Gratis — Calzix',
    description: 'Calcula el factorial exacto de cualquier número entero de 0 a 170. Resultado preciso sin redondeos. Ideal para combinatoria, permutaciones y probabilidad. Gratis.',
    canonical: 'https://calzix.com/calculadora-factorial',
  },
  'potencias-raices': {
    title: 'Calculadora de Potencias y Raíces Online — Calzix',
    description: 'Calcula potencias (base^exponente) y raíces n-ésimas de cualquier número real. Admite decimales y negativos. Muestra el resultado exacto. Gratis y sin registro.',
    canonical: 'https://calzix.com/potencias-raices',
  },
  'mcm-mcd': {
    title: 'Calculadora de MCM y MCD Online — Algoritmo de Euclides — Calzix',
    description: 'Calcula el mínimo común múltiplo (MCM) y el máximo común divisor (MCD) de dos números al instante. Imprescindible para fracciones y divisibilidad. Gratis.',
    canonical: 'https://calzix.com/mcm-mcd',
  },
  'numero-primo': {
    title: 'Verificador de Número Primo Online — Factores Primos — Calzix',
    description: 'Comprueba si un número hasta 1.000.000.000 es primo o compuesto. Muestra su descomposición en factores primos. Rápido, preciso y gratis.',
    canonical: 'https://calzix.com/numero-primo',
  },
  'sistema-ecuaciones': {
    title: 'Resolvedor de Sistema de Ecuaciones 2×2 Online — Calzix',
    description: 'Resuelve sistemas de dos ecuaciones lineales con dos incógnitas por el método de Cramer. Obtén x e y al instante con todos los pasos. Gratis y sin registro.',
    canonical: 'https://calzix.com/sistema-ecuaciones',
  },
  'funcion-cuadratica': {
    title: 'Calculadora de Función Cuadrática ax²+bx+c — Calzix',
    description: 'Calcula raíces, discriminante y vértice de cualquier parábola. Determina si tiene soluciones reales o complejas. Fórmula general paso a paso. Gratis.',
    canonical: 'https://calzix.com/funcion-cuadratica',
  },
  'perimetro-figuras': {
    title: 'Calculadora de Perímetro de Figuras Geométricas Online — Calzix',
    description: 'Calcula el perímetro de círculo, cuadrado, rectángulo, triángulo, rombo, pentágono y hexágono al instante. Fórmulas precisas con ejemplos en metros y centímetros. Gratis para geometría escolar y construcción LATAM.',
    canonical: 'https://calzix.com/perimetro-figuras',
  },
  'volumen-solidos': {
    title: 'Calculadora de Volumen de Sólidos Geométricos Online — Calzix',
    description: 'Calcula el volumen de cubo, esfera, cilindro, cono, prisma rectangular y pirámide cuadrada al instante. Muestra resultado en m³ y litros. Ideal para física, ingeniería y construcción en toda Latinoamérica.',
    canonical: 'https://calzix.com/volumen-solidos',
  },
  'teorema-pitagoras': {
    title: 'Calculadora del Teorema de Pitágoras Online Gratis — Calzix',
    description: 'Calcula la hipotenusa o cualquier cateto de un triángulo rectángulo al instante con a² + b² = c². Muestra el procedimiento completo. Ideal para geometría, construcción y exámenes de admisión en LATAM.',
    canonical: 'https://calzix.com/teorema-pitagoras',
  },
  'varianza-desviacion': {
    title: 'Calculadora de Varianza y Desviación Estándar Online — Calzix',
    description: 'Calcula varianza y desviación típica de una población (÷n) o muestra (÷n−1) al instante. Estadística descriptiva con fórmulas claras para estudiantes y profesionales de toda Latinoamérica. Gratis.',
    canonical: 'https://calzix.com/varianza-desviacion',
  },
  'correlacion-datos': {
    title: 'Calculadora de Correlación de Pearson Online Gratis — Calzix',
    description: 'Calcula el coeficiente de correlación de Pearson (r) entre dos series de datos al instante. Interpreta si la correlación es positiva, negativa, fuerte o débil. Estadística para estudiantes LATAM.',
    canonical: 'https://calzix.com/correlacion-datos',
  },
  'permutaciones-combinaciones': {
    title: 'Calculadora de Permutaciones y Combinaciones Online — Calzix',
    description: 'Calcula P(n,r) permutaciones (orden importa) y C(n,r) combinaciones (orden no importa) al instante. Combinatoria para lotería, sorteos, contraseñas y problemas de probabilidad en toda Latinoamérica.',
    canonical: 'https://calzix.com/permutaciones-combinaciones',
  },
  'distribucion-normal': {
    title: 'Calculadora de Distribución Normal Online Gratis — Calzix',
    description: 'Calcula la puntuación Z y las probabilidades P(X ≤ x) y P(X > x) de cualquier distribución normal. Incluye distribución estándar N(0,1) y curva de Gauss. Herramienta estadística para universitarios LATAM.',
    canonical: 'https://calzix.com/distribucion-normal',
  },
  'regla-tres': {
    title: 'Calculadora de Regla de Tres Simple e Inversa Online — Calzix',
    description: 'Resuelve reglas de tres directas e inversas en segundos. Introduce tres valores conocidos y obtén el cuarto. Ideal para recetas, escalas, mezclas y más. Gratis.',
    canonical: 'https://calzix.com/regla-tres',
  },
  // ── Ciencias (nuevas) ───────────────────────────────────────────
  'segunda-ley-newton': {
    title: 'Calculadora de Segunda Ley de Newton Online Gratis — Calzix',
    description: 'Calcula fuerza (N), masa (kg) o aceleración (m/s²) con F = m × a al instante. Muestra el paso a paso. Ideal para física de bachillerato y universidad en México, Colombia, Argentina, Chile y toda Latinoamérica.',
    canonical: 'https://calzix.com/segunda-ley-newton',
  },
  'energia-cinetica': {
    title: 'Calculadora de Energía Cinética Online Gratis — Calzix',
    description: 'Calcula la energía cinética Ec = ½mv² al instante. Introduce masa en kg y velocidad en m/s y obtén el resultado en Joules y kJ. Física de bachillerato y universidad para toda Latinoamérica.',
    canonical: 'https://calzix.com/energia-cinetica',
  },
  'energia-potencial': {
    title: 'Calculadora de Energía Potencial Gravitatoria Online — Calzix',
    description: 'Calcula energía potencial Ep = mgh al instante. Gravedad configurable por país (9,78 m/s² en Ecuador, 9,81 en México, 9,83 en Buenos Aires). Física de preparatoria y universidad LATAM.',
    canonical: 'https://calzix.com/energia-potencial',
  },
  'ley-ohm': {
    title: 'Calculadora de Ley de Ohm Online Gratis — Calzix',
    description: 'Calcula voltaje (V), intensidad (A) o resistencia (Ohm) con V = I × R al instante. Ideal para electricistas, técnicos y estudiantes de física y electrónica en toda Latinoamérica.',
    canonical: 'https://calzix.com/ley-ohm',
  },
  'potencia-electrica': {
    title: 'Calculadora de Potencia Eléctrica Online Gratis — Calzix',
    description: 'Calcula potencia (W, kW), tensión (V) o intensidad (A) con P = V × I al instante. Útil para calcular consumo de electrodomésticos y factura eléctrica en México, Colombia, Chile, Argentina y LATAM.',
    canonical: 'https://calzix.com/potencia-electrica',
  },
  'caida-libre': {
    title: 'Calculadora de Caída Libre Online Gratis — Calzix',
    description: 'Calcula tiempo, velocidad y altura en caída libre con g configurable. Fórmulas h = ½gt², v = gt. Ideal para problemas de física de bachillerato y universidad en México, Colombia, Argentina y LATAM.',
    canonical: 'https://calzix.com/caida-libre',
  },
  'presion-hidrostatica': {
    title: 'Calculadora de Presión Hidrostática Online Gratis — Calzix',
    description: 'Calcula presión de fluidos con P = rho × g × h al instante. Resultado en Pa, kPa y atm. Densidades del agua y otros fluidos. Ideal para física e ingeniería civil e hidráulica en Latinoamérica.',
    canonical: 'https://calzix.com/presion-hidrostatica',
  },
  'frecuencia-onda': {
    title: 'Calculadora de Frecuencia y Longitud de Onda Online — Calzix',
    description: 'Calcula velocidad (m/s), frecuencia (Hz) o longitud de onda (m) con v = f × lambda al instante. Ondas de sonido, luz y radio. Física de bachillerato y telecomunicaciones para toda Latinoamérica.',
    canonical: 'https://calzix.com/frecuencia-onda',
  },
  'calor-especifico': {
    title: 'Calculadora de Calor Específico Online Gratis — Calzix',
    description: 'Calcula calor absorbido Q = m × c × DeltaT, masa, calor específico o variación de temperatura al instante. Tablas de calores específicos del agua, hierro y más. Física y química LATAM.',
    canonical: 'https://calzix.com/calor-especifico',
  },
  'calculadora-ph': {
    title: 'Calculadora de pH Online Gratis — Calzix',
    description: 'Calcula pH, pOH y concentraciones de H⁺ y OH⁻. Clasifica ácidos fuertes, débiles y bases. COMIPEMS, ICFES, PAES, PSU. Química LATAM.',
    canonical: 'https://calzix.com/calculadora-ph',
  },
  'mol-masa-molar': {
    title: 'Calculadora de Mol y Masa Molar Online Gratis — Calzix',
    description: 'Convierte moles a gramos y gramos a moles con n=m/M. Masa molar de compuestos al instante. Química básica LATAM.',
    canonical: 'https://calzix.com/mol-masa-molar',
  },
  'gas-ideal': {
    title: 'Calculadora de Gas Ideal PV=nRT Online Gratis — Calzix',
    description: 'Despeja P, V, n o T de la ley PV=nRT. R=8,314 J/mol·K. Física y química para bachillerato y universidad en toda Latinoamérica.',
    canonical: 'https://calzix.com/gas-ideal',
  },
  'formula-molecular': {
    title: 'Calculadora de Fórmula Molecular Online Gratis — Calzix',
    description: 'Obtén la fórmula molecular desde la empírica y la masa molecular. Factor n automático. Química orgánica e inorgánica LATAM.',
    canonical: 'https://calzix.com/formula-molecular',
  },
  'diluciones-quimica': {
    title: 'Calculadora de Diluciones C₁V₁=C₂V₂ Online Gratis — Calzix',
    description: 'Resuelve diluciones: calcula C₁, C₂, V₁ o V₂ con la ecuación de dilución. Laboratorio y química analítica LATAM.',
    canonical: 'https://calzix.com/diluciones-quimica',
  },
  'estequiometria': {
    title: 'Calculadora de Estequiometría Online Gratis — Calzix',
    description: 'Calcula moles y masa de productos en reacciones químicas. Proporciones estequiométricas por coeficientes molares. Química LATAM.',
    canonical: 'https://calzix.com/estequiometria',
  },
  'solucion-concentracion': {
    title: 'Calculadora de Concentración de Soluciones Online — Calzix',
    description: 'Calcula molaridad (M), porcentaje masa/masa (% m/m) y ppm de disoluciones. Química analítica y ambiental LATAM.',
    canonical: 'https://calzix.com/solucion-concentracion',
  },
  'equilibrio-quimico': {
    title: 'Calculadora de Equilibrio Químico Kc Online — Calzix',
    description: 'Calcula la constante Kc de la reacción aA+bB⇌cC+dD. Determina si favorece reactivos o productos. Termodinámica química LATAM.',
    canonical: 'https://calzix.com/equilibrio-quimico',
  },
  'numero-oxidacion': {
    title: 'Calculadora de Número de Oxidación Online Gratis — Calzix',
    description: 'Consulta reglas de números de oxidación (NOx) con excepciones. Ejemplos de compuestos. Redox y química inorgánica LATAM.',
    canonical: 'https://calzix.com/numero-oxidacion',
  },
  // ── Conversión (nuevas) ──────────────────────────────────────────
  'conversor-potencia': {
    title: 'Conversor de Potencia: vatios a hp, kW, CV, BTU/h — Calzix',
    description: 'Convierte vatios, kilovatios, megavatios, caballos de fuerza (hp y CV), kcal/h y BTU/h al instante. Para ingeniería, automotriz y aire acondicionado en LATAM.',
    canonical: 'https://calzix.com/conversor-potencia',
  },
  'conversor-fuerza': {
    title: 'Conversor de Fuerza: newton a kgf, lbf, kN, dinas — Calzix',
    description: 'Convierte newtons, kilonewtons, lbf, kgf, dinas y meganewtons al instante. Para física, ingeniería estructural, aeronáutica y mecánica en México y toda LATAM.',
    canonical: 'https://calzix.com/conversor-fuerza',
  },
  'conversor-densidad': {
    title: 'Conversor de Densidad: kg/m³ a g/cm³, lb/ft³, g/L — Calzix',
    description: 'Convierte kg/m³, g/cm³, g/L, kg/L, lb/ft³ y lb/in³. Para ingeniería de materiales, minería, industria química y construcción en México, Chile y toda América Latina.',
    canonical: 'https://calzix.com/conversor-densidad',
  },
  'conversor-caudal': {
    title: 'Conversor de Caudal: L/s a m³/h, gal/min, ft³/s — Calzix',
    description: 'Convierte L/s, m³/s, m³/h, L/min, galones/min y ft³/s. Para hidráulica, obras civiles, riego agrícola, ríos y saneamiento en toda América Latina.',
    canonical: 'https://calzix.com/conversor-caudal',
  },
  'conversor-par-motor': {
    title: 'Conversor de Par Motor: N·m a lbf·ft, kgf·m, kgf·cm — Calzix',
    description: 'Convierte newton·metro, lbf·pie, kgf·metro y kgf·cm al instante. Para mecánica automotriz, manuales de taller y ajuste de tornillos en México, Argentina y LATAM.',
    canonical: 'https://calzix.com/conversor-par-motor',
  },
  'conversor-eficiencia': {
    title: 'Conversor de Consumo de Combustible: L/100km a km/L y mpg — Calzix',
    description: 'Convierte litros/100km, km/L, mpg americano y mpg británico. Calcula el rendimiento de tu auto en México, Argentina, Chile, Colombia y toda Latinoamérica.',
    canonical: 'https://calzix.com/conversor-eficiencia',
  },
  'conversor-frecuencia': {
    title: 'Conversor de Frecuencia: Hz a kHz, MHz, GHz, RPM — Calzix',
    description: 'Convierte hercios, kilohercios, megahercios, gigahercios, RPM y rad/s al instante. Para electrónica, telecomunicaciones, motores y física en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/conversor-frecuencia',
  },
  'conversor-iluminacion': {
    title: 'Conversor de Iluminancia: lux a pie-candela, klux, fot — Calzix',
    description: 'Convierte lux, kilolux, pie-candela, fot y nox al instante. Para diseño de iluminación, arquitectura, fotografía y cumplimiento de normas NOM/NTC en LATAM.',
    canonical: 'https://calzix.com/conversor-iluminacion',
  },
  // ── Hogar (nuevas) ──────────────────────────────────────────────
  'presupuesto-obra': {
    title: 'Calculadora de Presupuesto de Obra: reforma, baño, cocina — Calzix',
    description: 'Estima el costo de reformas integrales, baños, cocinas, pintura y pisos en m². Precios de referencia orientativos para obras en México, Colombia, Chile y LATAM.',
    canonical: 'https://calzix.com/presupuesto-obra',
  },
  'cemento-mortero': {
    title: 'Calculadora de Cemento y Mortero: kg por m³ de mezcla — Calzix',
    description: 'Calcula cemento, arena, grava y agua para mortero 1:3 y hormigón 1:2:4 por volumen en m³. Para construcción en México, Colombia, Argentina, Perú y toda LATAM.',
    canonical: 'https://calzix.com/cemento-mortero',
  },
  'baldosas-suelo': {
    title: 'Calculadora de Baldosas: cuántas necesito con merma — Calzix',
    description: 'Calcula el número de baldosas para cualquier tamaño de suelo con porcentaje de merma configurable. Para pisos en México, Colombia, Chile, Perú y toda LATAM.',
    canonical: 'https://calzix.com/baldosas-suelo',
  },
  'pintura-techos': {
    title: 'Calculadora de Pintura para Techos: litros por m² — Calzix',
    description: 'Calcula los litros de pintura blanca o de cielo raso según área, número de manos y rendimiento real del bote. Para viviendas en México, Colombia y toda LATAM.',
    canonical: 'https://calzix.com/pintura-techos',
  },
  'pintura-exterior': {
    title: 'Calculadora de Pintura Exterior: fachada y muros — Calzix',
    description: 'Calcula pintura para fachadas y muros exteriores descontando ventanas y puertas. Para casas en México, Colombia, Chile, Argentina, Perú y toda LATAM.',
    canonical: 'https://calzix.com/pintura-exterior',
  },
  'circuito-electrico': {
    title: 'Calculadora de Circuito Eléctrico: serie y paralelo — Calzix',
    description: 'Calcula resistencia total, tensión e intensidad en circuitos en serie y paralelo aplicando la ley de Ohm. Para estudiantes de física y electrónica en toda LATAM.',
    canonical: 'https://calzix.com/circuito-electrico',
  },
  'cable-electrico': {
    title: 'Calculadora de Sección de Cable: mm² según potencia — Calzix',
    description: 'Calcula la sección mínima de cable de cobre (1,5 a 70 mm²) para instalaciones monofásicas con caída de tensión. Para instalaciones en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/cable-electrico',
  },
  'instalacion-solar-hogar': {
    title: 'Calculadora de Paneles Solares para Casa: kWp y payback — Calzix',
    description: 'Calcula cuántos paneles solares necesitas, la potencia en kWp, el ahorro anual y el retorno de inversión según tu consumo y horas sol pico. Para México, Colombia, Chile y LATAM.',
    canonical: 'https://calzix.com/instalacion-solar-hogar',
  },
  'amortizacion-hipoteca': {
    title: 'Calculadora de Amortización de Hipoteca: cuota y total — Calzix',
    description: 'Calcula la cuota mensual de amortización, el total pagado y los intereses de tu crédito hipotecario con sistema francés. Para créditos Infonavit, BBVA, Bancolombia, BancoEstado y LATAM.',
    canonical: 'https://calzix.com/amortizacion-hipoteca',
  },
  'alquiler-vs-compra': {
    title: 'Calculadora Alquilar vs Comprar: ¿qué conviene más? — Calzix',
    description: 'Compara el costo total de alquilar versus comprar una vivienda en 20 o 30 años. Analiza cuota hipotecaria, enganche y renta mensual. Para México, Colombia, Chile, Perú y LATAM.',
    canonical: 'https://calzix.com/alquiler-vs-compra',
  },
  'factura-gas': {
    title: 'Calculadora de Factura de Gas Natural: consumo y cargo fijo — Calzix',
    description: 'Calcula el costo mensual de tu factura de gas por consumo (m³) y cargo fijo según tarifa y días de facturación. Referencia orientativa para distribuidoras en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/factura-gas',
  },
  'consumo-agua-hogar': {
    title: 'Calculadora de Consumo de Agua del Hogar: litros diarios — Calzix',
    description: 'Estima el consumo diario, mensual y anual de agua de tu hogar según duchas, WC, lavavajillas, lavadora y personas. Compara con medias de México, Colombia, Chile y LATAM.',
    canonical: 'https://calzix.com/consumo-agua-hogar',
  },
  'riego-jardin': {
    title: 'Calculadora de Riego de Jardín: litros por sesión y mes — Calzix',
    description: 'Calcula los litros de agua necesarios para regar tu jardín según el tipo de planta, el área en m² y los riegos por semana. Para jardines en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/riego-jardin',
  },
  'fertilizante-jardin': {
    title: 'Calculadora de Fertilizante para Jardín: gramos por m² — Calzix',
    description: 'Calcula la dosis exacta de fertilizante (g/m²) según tipo de cultivo y área: césped, hortalizas, frutales, flores y arbustos. Para huertos y jardines en México, Colombia y LATAM.',
    canonical: 'https://calzix.com/fertilizante-jardin',
  },
  // ── Trabajo (nuevas) ─────────────────────────────────────────────
  'precio-hora': {
    title: 'Calculadora de Precio por Hora: tarifa freelance y salario — Calzix',
    description: 'Calcula tu tarifa horaria y valor del día a partir de tu salario anual, horas diarias y días laborales. Para freelancers y empleados en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/precio-hora',
  },
  'margen-beneficio': {
    title: 'Calculadora de Margen de Beneficio: margen, precio o coste — Calzix',
    description: 'Calcula el margen de beneficio, el precio de venta o el coste a partir de dos datos. Ideal para PYMES y comercios en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/margen-beneficio',
  },
  'punto-equilibrio': {
    title: 'Calculadora de Punto de Equilibrio: unidades y ventas mínimas — Calzix',
    description: 'Calcula las unidades mínimas a vender para cubrir costos fijos y variables y no perder dinero. Herramienta esencial para emprendedores y PYMES en México, Colombia, Chile y LATAM.',
    canonical: 'https://calzix.com/punto-equilibrio',
  },
  'rentabilidad-roi': {
    title: 'Calculadora de ROI y Rentabilidad: retorno de inversión — Calzix',
    description: 'Calcula el ROI total y anualizado de cualquier inversión o proyecto. Mide rentabilidad en porcentaje. Para negocios, fondos e inversiones en México, Colombia, Chile y toda LATAM.',
    canonical: 'https://calzix.com/rentabilidad-roi',
  },
  'precio-coste-mas': {
    title: 'Calculadora de Precio Coste Plus: markup y margen real — Calzix',
    description: 'Calcula el precio de venta añadiendo un porcentaje de markup al coste. Obtén el margen real y el beneficio neto. Para negocios y comercios en LATAM.',
    canonical: 'https://calzix.com/precio-coste-mas',
  },
  'descuento-volumen': {
    title: 'Calculadora de Descuento por Volumen: precios escalonados — Calzix',
    description: 'Calcula descuentos automáticos por cantidad: 5 % desde 10 unidades hasta 20 % en pedidos grandes. Para mayoristas, distribuidores y comercios en LATAM.',
    canonical: 'https://calzix.com/descuento-volumen',
  },
  'precio-original-descuento': {
    title: 'Calculadora de Precio Original con Descuento: precio real — Calzix',
    description: 'Calcula el precio original a partir del precio final y el porcentaje de descuento. Descubre cuánto ahorraste realmente. Para compradores y vendedores en LATAM.',
    canonical: 'https://calzix.com/precio-original-descuento',
  },
  'irpf-retencion': {
    title: 'Calculadora de IRPF y Retención 2024: tipo efectivo por tramos — Calzix',
    description: 'Calcula tu retención de IRPF, tipo efectivo y cuota anual por tramos. Basado en la escala 2024. Equivalente ISR/Renta para México, Colombia y Chile.',
    canonical: 'https://calzix.com/irpf-retencion',
  },
  'finiquito': {
    title: 'Calculadora de Finiquito: indemnización por despido o renuncia — Calzix',
    description: 'Calcula el finiquito al terminar un contrato: salario pendiente, vacaciones no disfrutadas y partes proporcionales. Para trabajadores de México, Colombia y LATAM.',
    canonical: 'https://calzix.com/finiquito',
  },
  'vacaciones-proporcionales': {
    title: 'Calculadora de Vacaciones Proporcionales: días y costo — Calzix',
    description: 'Calcula los días de vacaciones proporcionales según meses trabajados. LFT México, Código del Trabajo Chile, Ley 50 Colombia y normas laborales de LATAM.',
    canonical: 'https://calzix.com/vacaciones-proporcionales',
  },
  'horas-extra': {
    title: 'Calculadora de Horas Extra: valor hora y pago con recargo — Calzix',
    description: 'Calcula el pago de tus horas extra con recargo legal. Aplica normas de la LFT (México 100 %), Ley 2101 (Colombia) y Código del Trabajo (Chile). Gratis.',
    canonical: 'https://calzix.com/horas-extra',
  },
  'pomodoro': {
    title: 'Calculadora Técnica Pomodoro: sesiones, bloques y descansos — Calzix',
    description: 'Planifica tu jornada con la Técnica Pomodoro: calcula cuántos pomodoros necesitas, bloques y tiempos de descanso. Ideal para trabajo remoto en LATAM.',
    canonical: 'https://calzix.com/pomodoro',
  },
  'coste-reunion': {
    title: 'Calculadora de Coste de Reunión: cuánto cuesta cada minuto — Calzix',
    description: 'Calcula el coste real de una reunión según asistentes, salario por hora y duración. Justifica o elimina reuniones improductivas en tu empresa. Gratis en LATAM.',
    canonical: 'https://calzix.com/coste-reunion',
  },
  'propina-grupo': {
    title: 'Calculadora de Propina para Grupo: división equitativa — Calzix',
    description: 'Divide la propina y el total de la cuenta de forma equitativa entre varias personas. Elige el porcentaje y calcula lo que paga cada comensal. Gratis en LATAM.',
    canonical: 'https://calzix.com/propina-grupo',
  },
  'propina-porcentaje': {
    title: 'Calculadora de Propina por Porcentaje: monto exacto — Calzix',
    description: 'Calcula la propina exacta aplicando un porcentaje a la cuenta. Presets del 5, 10, 15 y 20 %. Usos por país: México 10-15 %, Chile 10 %, Colombia voluntaria.',
    canonical: 'https://calzix.com/propina-porcentaje',
  },
  // ── Educación (nuevas) ───────────────────────────────────────────
  'nota-necesaria': {
    title: 'Calculadora de Nota Necesaria para Aprobar — Calzix',
    description: 'Calcula que nota necesitas en los examenes restantes para alcanzar el minimo de aprobacion. Util en UNAM, UBA, U. de Chile, UdeA y mas. Gratis.',
    canonical: 'https://calzix.com/nota-necesaria',
  },
  'nota-ponderada': {
    title: 'Calculadora de Nota Ponderada por Evaluaciones — Calzix',
    description: 'Calcula tu promedio ponderado segun el peso de cada evaluacion: parciales, finales y trabajos. Para universidades de toda LATAM. Gratis.',
    canonical: 'https://calzix.com/nota-ponderada',
  },
  'nota-selectividad': {
    title: 'Calculadora de Nota de Acceso a la Universidad — Calzix',
    description: 'Calcula la nota de acceso a la universidad combinando bachillerato y examen. Incluye EBAU, PAES Chile, ICFES Colombia y CENEVAL Mexico. Gratis.',
    canonical: 'https://calzix.com/nota-selectividad',
  },
  'conversion-notas': {
    title: 'Conversor de Notas entre Escalas de Calificacion — Calzix',
    description: 'Convierte notas entre el sistema 0-10, porcentaje 0-100, GPA americano A-F y escala colombiana 0-5. Para convalidaciones internacionales. Gratis.',
    canonical: 'https://calzix.com/conversion-notas',
  },
  'simulador-beca': {
    title: 'Simulador de Beca Universitaria por Nota y Renta — Calzix',
    description: 'Estima si eres elegible para beca universitaria segun nota media y renta familiar. Calcula cuantia fija y variable. Equivalentes en LATAM. Gratis.',
    canonical: 'https://calzix.com/simulador-beca',
  },
  'umbral-renta-beca': {
    title: 'Calculadora de Umbral de Renta para Becas — Calzix',
    description: 'Comprueba si la renta de tu unidad familiar supera el umbral de acceso a becas universitarias. Incluye comparativa con programas de LATAM. Gratis.',
    canonical: 'https://calzix.com/umbral-renta-beca',
  },
  'coste-carrera': {
    title: 'Calculadora de Coste Total de Carrera Universitaria — Calzix',
    description: 'Estima la inversion total de una carrera sumando matricula, libros, transporte, alojamiento y manutencion por ano. Para Mexico, Colombia, Chile y mas.',
    canonical: 'https://calzix.com/coste-carrera',
  },
  'sesion-estudio': {
    title: 'Planificador de Sesiones de Estudio con Descansos — Calzix',
    description: 'Calcula cuantos bloques de concentracion y descansos de 15 minutos caben en tu tiempo disponible. Para estudiantes de toda LATAM. Gratis.',
    canonical: 'https://calzix.com/sesion-estudio',
  },
  'aprendizaje-espaciado': {
    title: 'Calculadora de Aprendizaje Espaciado Ebbinghaus — Calzix',
    description: 'Genera el calendario de repasos basado en la curva del olvido: +1, +3, +7, +14, +30, +60 y +120 dias. Memoriza a largo plazo. Gratis.',
    canonical: 'https://calzix.com/aprendizaje-espaciado',
  },
  'horas-idioma': {
    title: 'Calculadora de Horas para Aprender un Idioma MCER — Calzix',
    description: 'Calcula cuantas horas y meses necesitas para pasar de A1 a C2 segun el Marco Europeo de Referencia. Popular en LATAM para ingles. Gratis.',
    canonical: 'https://calzix.com/horas-idioma',
  },
  'plan-estudio': {
    title: 'Calculadora de Plan de Estudio Personalizado — Calzix',
    description: 'Calcula las horas diarias necesarias para cubrir todas las asignaturas antes del examen segun semanas y dias disponibles. Para LATAM. Gratis.',
    canonical: 'https://calzix.com/plan-estudio',
  },
  'palabras-minuto': {
    title: 'Calculadora de Palabras por Minuto (WPM) de Lectura — Calzix',
    description: 'Mide tu velocidad lectora en palabras por minuto con palabras leidas y tiempo. Clasifica nivel: principiante, promedio, competente, avanzado o experto. Gratis.',
    canonical: 'https://calzix.com/palabras-minuto',
  },
  'tiempo-terminar-libro': {
    title: 'Calculadora de Tiempo para Terminar un Libro — Calzix',
    description: 'Estima cuantos dias tardas en terminar un libro segun paginas, velocidad lectora y minutos de lectura al dia. Ideal para retos de lectura en LATAM. Gratis.',
    canonical: 'https://calzix.com/tiempo-terminar-libro',
  },
  'libros-al-ano': {
    title: 'Calculadora de Cuantos Libros Puedes Leer al Ano — Calzix',
    description: 'Calcula cuantos libros lees al ano segun las paginas que lees por dia y el largo promedio del libro. Proyeccion a 5 anos incluida. Gratis.',
    canonical: 'https://calzix.com/libros-al-ano',
  },
  'comprension-lectora': {
    title: 'Evaluador de Comprension Lectora y WPM — Calzix',
    description: 'Evalua tu comprension lectora respondiendo preguntas tras la lectura. Mide palabras por minuto y nivel de retencion: excelente, buena, aceptable. Gratis.',
    canonical: 'https://calzix.com/comprension-lectora',
  },
  'paginas-por-dia': {
    title: 'Calculadora de Paginas por Dia para Terminar un Libro — Calzix',
    description: 'Calcula cuantas paginas debes leer por dia para terminar tu libro en el plazo que necesitas. Acepta paginas ya leidas y estima tiempo en minutos. Gratis.',
    canonical: 'https://calzix.com/paginas-por-dia',
  },
  // ── Viaje (nuevas) ───────────────────────────────────────────────
  'autonomia-electrico': {
    title: 'Calculadora de Autonomia de Vehiculo Electrico en km — Calzix',
    description: 'Calcula cuantos kilometros puede recorrer tu coche electrico con la carga actual segun bateria kWh y consumo real. Estima tiempo de viaje. Gratis.',
    canonical: 'https://calzix.com/autonomia-electrico',
  },
  'costo-gasolinera': {
    title: 'Calculadora de Costo en Gasolinera — Calzix',
    description: 'Calcula cuanto pagas en la gasolinera segun los litros que repostas y el precio del combustible. Para cualquier moneda: MXN, COP, CLP, PEN. Gratis.',
    canonical: 'https://calzix.com/costo-gasolinera',
  },
  'litros-repostaje': {
    title: 'Calculadora de Litros para Repostaje de un Trayecto — Calzix',
    description: 'Calcula los litros de combustible para un trayecto segun distancia y consumo del vehiculo. Descuenta nivel actual del deposito. Estima costo. Gratis.',
    canonical: 'https://calzix.com/litros-repostaje',
  },
  'distancia-a-pie': {
    title: 'Calculadora de Tiempo Caminando por Distancia — Calzix',
    description: 'Calcula cuanto tardas caminando segun distancia y velocidad. Estima calorias quemadas y pasos. Util para paseos urbanos y senderismo liviano en LATAM. Gratis.',
    canonical: 'https://calzix.com/distancia-a-pie',
  },
  'distancia-ciclismo': {
    title: 'Calculadora de Tiempo en Bicicleta — Calzix',
    description: 'Calcula el tiempo que tardas en bicicleta segun distancia y velocidad. Estima calorias y CO2 evitado frente al coche. Para ciclismo urbano y deportivo. Gratis.',
    canonical: 'https://calzix.com/distancia-ciclismo',
  },
  'ruta-senderismo': {
    title: 'Calculadora de Ruta de Senderismo con Dificultad — Calzix',
    description: 'Calcula duracion, calorias y nivel de dificultad de una ruta de trekking segun distancia, desnivel y peso. Para trails y excursiones en LATAM. Gratis.',
    canonical: 'https://calzix.com/ruta-senderismo',
  },
  'jet-lag': {
    title: 'Calculadora de Jet Lag y Dias de Recuperacion — Calzix',
    description: 'Calcula cuantos dias tardas en recuperarte del jet lag segun diferencia horaria y direccion del vuelo. Consejos personalizados para vuelos a LATAM y Asia. Gratis.',
    canonical: 'https://calzix.com/jet-lag',
  },
  'duracion-vuelo': {
    title: 'Calculadora de Duracion de Vuelo por Distancia y Velocidad — Calzix',
    description: 'Calcula el tiempo de vuelo segun distancia en km y velocidad crucero. Incluye escalas. Para rutas desde Mexico, Colombia, Chile, Peru y Argentina. Gratis.',
    canonical: 'https://calzix.com/duracion-vuelo',
  },
  'exceso-equipaje': {
    title: 'Calculadora de Exceso de Equipaje y Costo en Aerolinea — Calzix',
    description: 'Calcula cuanto te cobra la aerolinea por exceso de equipaje segun los kg de mas y la tarifa por kilo. Para Aeromexico, Avianca, LATAM, Volaris y mas. Gratis.',
    canonical: 'https://calzix.com/exceso-equipaje',
  },
  'dimensions-maleta': {
    title: 'Calculadora de Dimensiones de Maleta para Cabina o Bodega — Calzix',
    description: 'Verifica si tu maleta cumple los limites de dimensiones de la aerolinea en cm. Compara con Vueling, Ryanair, EasyJet e IATA bodega estandar. Gratis.',
    canonical: 'https://calzix.com/dimensions-maleta',
  },
  'presupuesto-viaje': {
    title: 'Calculadora de Presupuesto de Viaje por Persona y Dia — Calzix',
    description: 'Planifica el presupuesto de tu viaje con desglose por vuelos, alojamiento, comida y extras. Calcula el costo por persona y por dia. Para viajes desde LATAM. Gratis.',
    canonical: 'https://calzix.com/presupuesto-viaje',
  },
  'cambio-divisas': {
    title: 'Conversor de Divisas con MXN, ARS, COP y Monedas Globales — Calzix',
    description: 'Convierte entre peso mexicano, colombiano, argentino, real brasileno, dolar, euro y mas de 12 divisas. Tipos de cambio orientativos. Gratis.',
    canonical: 'https://calzix.com/cambio-divisas',
  },
  'seguro-viaje': {
    title: 'Calculadora de Costo de Seguro de Viaje por Dias y Destino — Calzix',
    description: 'Estima cuanto cuesta un seguro de viaje segun el valor del viaje, los dias y el numero de viajeros. Para destinos en Europa o el resto del mundo. Gratis.',
    canonical: 'https://calzix.com/seguro-viaje',
  },
  'alojamiento-comparativa': {
    title: 'Calculadora de Costo de Alojamiento por Noche y Persona — Calzix',
    description: 'Calcula el costo total de tu alojamiento segun precio por noche, noches y personas. Incluye tasas y extras. Para hoteles, Airbnb y hostales en LATAM. Gratis.',
    canonical: 'https://calzix.com/alojamiento-comparativa',
  },
  'costo-peajes': {
    title: 'Calculadora de Costo de Peajes por Trayecto y al Ano — Calzix',
    description: 'Calcula cuanto gastas en peajes por trayecto, semana, mes y ano segun el numero de casetas y su precio medio. Para autopistas de Mexico, Chile y Colombia. Gratis.',
    canonical: 'https://calzix.com/costo-peajes',
  },
  // ── Naturaleza (nuevas) ─────────────────────────────────────────
  'co2-transporte': {
    title: 'Calculadora de Emisiones CO2 por Medio de Transporte — Calzix',
    description: 'Calcula el CO2 emitido por coche, moto, autobus, tren o avion segun la distancia. Compara el impacto ambiental de cada medio de transporte en LATAM. Gratis.',
    canonical: 'https://calzix.com/co2-transporte',
  },
  'compensacion-co2': {
    title: 'Calculadora de Compensacion de CO2 con Arboles — Calzix',
    description: 'Calcula cuantos arboles necesitas plantar para compensar tus emisiones de CO2. Estima en hectareas de bosque. Para proyectos de reforestacion en LATAM. Gratis.',
    canonical: 'https://calzix.com/compensacion-co2',
  },
  'huella-alimentaria': {
    title: 'Calculadora de Huella de Carbono Alimentaria — Calzix',
    description: 'Calcula el CO2 de tu dieta semanal segun el consumo de carne, lacteos, pescado, cereales y frutas. Cuantifica el impacto ambiental de lo que comes. Gratis.',
    canonical: 'https://calzix.com/huella-alimentaria',
  },
  'etiqueta-energetica': {
    title: 'Calculadora de Etiqueta Energetica de Electrodomesticos — Calzix',
    description: 'Clasifica tu electrodomestico de A+++ a G segun su consumo anual en kWh. Escala EU 2021. Para neveras, lavadoras y electrodomesticos en LATAM. Gratis.',
    canonical: 'https://calzix.com/etiqueta-energetica',
  },
  'consumo-ducha': {
    title: 'Calculadora de Consumo de Agua en la Ducha por Mes y Ano — Calzix',
    description: 'Calcula los litros de agua que consumes en la ducha segun los minutos, el caudal y el numero de personas. Muestra el total mensual y anual. Para hogares de LATAM. Gratis.',
    canonical: 'https://calzix.com/consumo-ducha',
  },
  'agua-alimentos': {
    title: 'Calculadora de Huella Hidrica de los Alimentos — Calzix',
    description: 'Calcula el agua virtual necesaria para producir carne, lacteos, cereales o cafe. Con factores por kg para 10 alimentos. Para concienciar sobre el consumo en LATAM. Gratis.',
    canonical: 'https://calzix.com/agua-alimentos',
  },
  'calidad-agua': {
    title: 'Evaluador de Calidad del Agua por Parametros — Calzix',
    description: 'Evalua la calidad del agua introduciendo pH, turbidez, cloro, nitratos y conductividad. Muestra el indice de calidad y si es apta para consumo. Para LATAM. Gratis.',
    canonical: 'https://calzix.com/calidad-agua',
  },
  'captacion-lluvia': {
    title: 'Calculadora de Captacion de Agua de Lluvia en Tejado — Calzix',
    description: 'Calcula los litros de lluvia que puedes recolectar segun la superficie del tejado y la precipitacion anual de tu ciudad en LATAM. Incluye eficiencia del sistema. Gratis.',
    canonical: 'https://calzix.com/captacion-lluvia',
  },
  'numero-placas-solar': {
    title: 'Calculadora de Numero de Paneles Solares Necesarios — Calzix',
    description: 'Calcula cuantos paneles solares necesitas segun tu consumo anual en kWh, la potencia por panel y las horas de sol pico. Para instalaciones en Mexico, Chile y Colombia. Gratis.',
    canonical: 'https://calzix.com/numero-placas-solar',
  },
  'angulo-solar': {
    title: 'Calculadora de Angulo Optimo de Paneles Solares por Latitud — Calzix',
    description: 'Calcula la inclinacion ideal de tus paneles solares segun la latitud de tu ciudad y el mes del ano. Para Mexico (19-32 N), Colombia (0-12 N) y Chile (18-55 S). Gratis.',
    canonical: 'https://calzix.com/angulo-solar',
  },
  'bateria-solar': {
    title: 'Calculadora de Capacidad de Bateria Solar en kWh y Ah — Calzix',
    description: 'Calcula la capacidad minima de bateria para tu instalacion solar segun el consumo diario, los dias de autonomia y la profundidad de descarga. Para hogares de LATAM. Gratis.',
    canonical: 'https://calzix.com/bateria-solar',
  },
  'plastico-reciclado': {
    title: 'Calculadora de CO2 Evitado al Reciclar Plastico — Calzix',
    description: 'Calcula el petroleo ahorrado, el CO2 evitado y la energia ahorrada al reciclar PET, HDPE, PVC, LDPE, PP o PS. Para programas de reciclaje en LATAM. Gratis.',
    canonical: 'https://calzix.com/plastico-reciclado',
  },
  'papel-reciclado': {
    title: 'Calculadora de Arboles y Agua Ahorrada al Reciclar Papel — Calzix',
    description: 'Calcula cuantos arboles salvas, el agua ahorrada y el CO2 evitado al reciclar papel y carton. Factor: 60 kg de papel por arbol. Para empresas y hogares en LATAM. Gratis.',
    canonical: 'https://calzix.com/papel-reciclado',
  },
  'residuos-electronicos': {
    title: 'Calculadora de Materiales Recuperables en Residuos Electronicos — Calzix',
    description: 'Calcula los materiales recuperables (cobre, oro, aluminio, litio) al llevar smartphones, laptops, neveras o lavadoras a un punto limpio. Para LATAM. Gratis.',
    canonical: 'https://calzix.com/residuos-electronicos',
  },
  'compost-organico': {
    title: 'Calculadora de Compost Organico Producido en el Hogar — Calzix',
    description: 'Calcula los kg de compost que produces segun los residuos organicos semanales y las semanas de compostaje. Muestra el CO2 evitado. Para hogares de LATAM. Gratis.',
    canonical: 'https://calzix.com/compost-organico',
  },
  'eficiencia-energetica': {
    title: 'Calculadora de Eficiencia Energetica COP EER y Rendimiento — Calzix',
    description: 'Calcula el COP de bombas de calor, el EER de aires acondicionados y el rendimiento de calderas. Herramienta tecnica para instaladores y hogares de LATAM. Gratis.',
    canonical: 'https://calzix.com/eficiencia-energetica',
  },
  // ── Ocio (nuevas) ───────────────────────────────────────────────
  'compatibilidad-zodiacal': {
    title: 'Calculadora de Compatibilidad Zodiacal — Calzix',
    description: 'Calcula tu compatibilidad astrologica por signos del zodiaco. Porcentaje de afinidad para los 12 signos. Gratis, sin registro.',
    canonical: 'https://calzix.com/compatibilidad-zodiacal',
  },
  'dias-juntos': {
    title: 'Calculadora de Dias Juntos en Pareja — Calzix',
    description: 'Calcula cuantos dias llevan juntos. Aniversarios, meses y anos exactos desde la fecha de inicio. Gratis, sin registro.',
    canonical: 'https://calzix.com/dias-juntos',
  },
  'nombre-amor': {
    title: 'Generador de Shipname o Nombre de Pareja — Calzix',
    description: 'Combina nombres para crear tu shipname o nombre de pareja. Generador ludico para redes sociales LATAM. Gratis, sin registro.',
    canonical: 'https://calzix.com/nombre-amor',
  },
  'presupuesto-boda': {
    title: 'Calculadora de Presupuesto de Boda — Mexico, Colombia, Chile — Calzix',
    description: 'Presupuesta los gastos de boda: salon, catering, fotografia, decoracion. Costos referencia Mexico, Colombia y Chile. Gratis.',
    canonical: 'https://calzix.com/presupuesto-boda',
  },
  'ruleta-decision': {
    title: 'Ruleta de Decision Aleatoria Online — Calzix',
    description: 'Genera decisiones aleatorias con ruleta virtual. Resuelve dilemas al azar con crypto.getRandomValues. Gratis, sin registro.',
    canonical: 'https://calzix.com/ruleta-decision',
  },
  'dado-virtual': {
    title: 'Dado Virtual de 6 Caras — Juegos de Mesa — Calzix',
    description: 'Lanza un dado virtual de 6 caras. Numeros aleatorios para Ludo, Monopolio y juegos de mesa LATAM. Gratis, sin registro.',
    canonical: 'https://calzix.com/dado-virtual',
  },
  'cara-o-cruz': {
    title: 'Cara o Cruz — Moneda Virtual Online — Calzix',
    description: 'Lanza una moneda virtual al azar. Cara o cruz con probabilidad 50-50 usando crypto.getRandomValues. Gratis, sin registro.',
    canonical: 'https://calzix.com/cara-o-cruz',
  },
  'generador-loteria': {
    title: 'Generador de Numeros para Loteria — Melate, Baloto, Loto — Calzix',
    description: 'Genera numeros para Melate Mexico, Baloto Colombia, Loto Chile y La Tinka Peru. Aleatorio con crypto. Gratis, sin registro.',
    canonical: 'https://calzix.com/generador-loteria',
  },
  'camino-vida': {
    title: 'Calculadora de Numero de Camino de Vida — Numerologia — Calzix',
    description: 'Calcula tu numero de camino de vida segun la numerologia pitagorica. Significado de los numeros 1 al 9 y maestros. Gratis.',
    canonical: 'https://calzix.com/camino-vida',
  },
  'numero-expresion': {
    title: 'Calculadora de Numero de Expresion o Destino — Calzix',
    description: 'Calcula tu numero de expresion a partir del nombre completo segun tabla de Pitagoras. Talentos y destino. Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-expresion',
  },
  'ciclos-personales': {
    title: 'Calculadora de Ciclos Personales Numerologicos — Calzix',
    description: 'Calcula tus ciclos personales numerologicos anuales del 1 al 9. Interpreta tu ano personal segun numerologia. Gratis.',
    canonical: 'https://calzix.com/ciclos-personales',
  },
  'compatibilidad-numerologica': {
    title: 'Calculadora de Compatibilidad Numerologica — Calzix',
    description: 'Calcula compatibilidad numerologica por numeros de camino de vida. Afinidad entre dos personas segun Pitagoras. Gratis.',
    canonical: 'https://calzix.com/compatibilidad-numerologica',
  },
  'ciclos-sueno': {
    title: 'Calculadora de Ciclos de Sueno de 90 Minutos — Calzix',
    description: 'Calcula ciclos de sueno de 90 minutos segun tu horario. Horas optimas para dormir y despertar descansado. Gratis, sin registro.',
    canonical: 'https://calzix.com/ciclos-sueno',
  },
  'deuda-sueno': {
    title: 'Calculadora de Deuda de Sueno Acumulada — Calzix',
    description: 'Calcula tu privacion de sueno acumulada en la semana. Horas de descanso faltantes segun recomendacion NSF. Gratis, sin registro.',
    canonical: 'https://calzix.com/deuda-sueno',
  },
  'hora-melatonina': {
    title: 'Calculadora de Hora Optima de Melatonina — Calzix',
    description: 'Calcula el momento optimo para tomar melatonina segun hora deseada de dormir. Para jet lag, insomnio y turnos. Gratis.',
    canonical: 'https://calzix.com/hora-melatonina',
  },
  'siesta-optima': {
    title: 'Calculadora de Siesta Optima — Power Nap — Calzix',
    description: 'Calcula la duracion ideal de siesta segun ciencia del sueno. Power nap 20 min o ciclo completo 90 min. Gratis, sin registro.',
    canonical: 'https://calzix.com/siesta-optima',
  },
  'calculadora-fracciones': {
    title: 'Calculadora de Fracciones — Suma, Resta y Simplifica — Calzix',
    description: 'Suma, resta, multiplica y divide fracciones online y obtén el resultado simplificado y en decimal. Gratis, sin registro.',
    canonical: 'https://calzix.com/calculadora-fracciones',
  },
  'numeros-romanos': {
    title: 'Conversor de Números Romanos ↔ Arábigos — Calzix',
    description: 'Convierte números romanos a arábigos y viceversa, del 1 al 3999. Comprueba si están bien escritos. Gratis y al instante.',
    canonical: 'https://calzix.com/numeros-romanos',
  },
  'raiz-cuadrada': {
    title: 'Calculadora de Raíz Cuadrada y Enésima — Calzix',
    description: 'Calcula la raíz cuadrada, cúbica o de cualquier índice de un número e identifica si es exacta. Gratis, sin registro.',
    canonical: 'https://calzix.com/raiz-cuadrada',
  },
  'redondeo': {
    title: 'Calculadora de Redondeo de Números — Calzix',
    description: 'Redondea números a los decimales que quieras: redondeo normal, por exceso y por defecto. Gratis y al instante.',
    canonical: 'https://calzix.com/redondeo',
  },
  'notacion-cientifica': {
    title: 'Calculadora de Notación Científica — Calzix',
    description: 'Convierte cualquier número a notación científica (mantisa × 10ⁿ) y descompón mantisa y exponente. Gratis, sin registro.',
    canonical: 'https://calzix.com/notacion-cientifica',
  },
  'division-resto': {
    title: 'Calculadora de División con Resto — Cociente y Resto — Calzix',
    description: 'Calcula el cociente y el resto de una división entera y su valor decimal, con la prueba de la división. Gratis.',
    canonical: 'https://calzix.com/division-resto',
  },
  'logaritmo': {
    title: 'Calculadora de Logaritmos — base, ln y log₁₀ — Calzix',
    description: 'Calcula el logaritmo de un número en cualquier base, el logaritmo natural (ln) y el decimal (log₁₀). Gratis, sin registro.',
    canonical: 'https://calzix.com/logaritmo',
  },
  'progresiones': {
    title: 'Calculadora de Progresiones Aritmética y Geométrica — Calzix',
    description: 'Calcula el término n y la suma de los n primeros términos de una progresión aritmética o geométrica. Gratis.',
    canonical: 'https://calzix.com/progresiones',
  },
  'distancia-dos-puntos': {
    title: 'Distancia entre Dos Puntos y Punto Medio — Calzix',
    description: 'Calcula la distancia entre dos puntos del plano y su punto medio con la fórmula de Pitágoras. Gratis, sin registro.',
    canonical: 'https://calzix.com/distancia-dos-puntos',
  },
  'percentiles-cuartiles': {
    title: 'Calculadora de Percentiles y Cuartiles (Q1, Q2, Q3, IQR) — Calzix',
    description: 'Calcula cuartiles, rango intercuartílico y cualquier percentil de un conjunto de datos. Gratis y al instante.',
    canonical: 'https://calzix.com/percentiles-cuartiles',
  },
  'densidad': {
    title: 'Calculadora de Densidad (ρ = m/V) — masa y volumen — Calzix',
    description: 'Calcula la densidad, la masa o el volumen de un cuerpo con la fórmula ρ = m/V. Despeja cualquier variable. Gratis.',
    canonical: 'https://calzix.com/densidad',
  },
  'trabajo-fisica': {
    title: 'Calculadora de Trabajo Físico (W = F·d·cosθ) — Calzix',
    description: 'Calcula el trabajo de una fuerza en julios a partir de la fuerza, la distancia y el ángulo. Gratis, sin registro.',
    canonical: 'https://calzix.com/trabajo-fisica',
  },
  'cantidad-movimiento': {
    title: 'Calculadora de Cantidad de Movimiento (p = m·v) — Calzix',
    description: 'Calcula el momento lineal, la masa o la velocidad con p = m·v. Despeja cualquier variable. Gratis y al instante.',
    canonical: 'https://calzix.com/cantidad-movimiento',
  },
  'peso-masa': {
    title: 'Calculadora de Peso y Masa (P = m·g) en planetas — Calzix',
    description: 'Calcula el peso de un objeto en la Tierra, la Luna, Marte y otros planetas con P = m·g. Entiende peso vs masa. Gratis.',
    canonical: 'https://calzix.com/peso-masa',
  },
  'aceleracion': {
    title: 'Calculadora de Aceleración (a = Δv/t) — Calzix',
    description: 'Calcula la aceleración a partir de la velocidad inicial, la final y el tiempo. Indica si acelera o frena. Gratis.',
    canonical: 'https://calzix.com/aceleracion',
  },
  'presion-fuerza-area': {
    title: 'Calculadora de Presión (P = F/A) — fuerza y área — Calzix',
    description: 'Calcula la presión, la fuerza o el área con P = F/A. Despeja cualquier variable de la presión mecánica. Gratis.',
    canonical: 'https://calzix.com/presion-fuerza-area',
  },
  'ley-gases-combinada': {
    title: 'Calculadora Ley Combinada de los Gases (P₁V₁/T₁=P₂V₂/T₂) — Calzix',
    description: 'Resuelve la ley combinada de los gases despejando presión, volumen o temperatura. Temperatura en kelvin. Gratis.',
    canonical: 'https://calzix.com/ley-gases-combinada',
  },
  'numero-avogadro': {
    title: 'Calculadora del Número de Avogadro — moles y partículas — Calzix',
    description: 'Convierte moles a partículas y partículas a moles con el número de Avogadro (6,022×10²³). Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-avogadro',
  },
  'rendimiento-reaccion': {
    title: 'Calculadora de Rendimiento de una Reacción Química — Calzix',
    description: 'Calcula el rendimiento porcentual de una reacción a partir del rendimiento real y el teórico. Gratis y al instante.',
    canonical: 'https://calzix.com/rendimiento-reaccion',
  },
  'concentracion-ppm': {
    title: 'Calculadora de Concentración en ppm (partes por millón) — Calzix',
    description: 'Calcula las partes por millón (ppm) de una disolución y su equivalente en porcentaje en masa. Gratis, sin registro.',
    canonical: 'https://calzix.com/concentracion-ppm',
  },
  'conversor-cocina': {
    title: 'Conversor de Medidas de Cocina — tazas, ml, cucharadas — Calzix',
    description: 'Convierte tazas, cucharadas, cucharaditas, mililitros, onzas y litros para adaptar cualquier receta. Gratis y al instante.',
    canonical: 'https://calzix.com/conversor-cocina',
  },
  'conversor-numeracion': {
    title: 'Conversor de Bases: Binario, Decimal, Octal, Hexadecimal — Calzix',
    description: 'Convierte números entre binario, decimal, octal y hexadecimal. Ideal para programación e informática. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-numeracion',
  },
  'conversor-tiempo-decimal': {
    title: 'Conversor de Horas:Minutos a Decimal — Calzix',
    description: 'Convierte horas y minutos a horas decimales y al revés, ideal para nóminas y facturación por horas. Gratis y al instante.',
    canonical: 'https://calzix.com/conversor-tiempo-decimal',
  },
  'conversor-coordenadas-gms': {
    title: 'Conversor de Coordenadas: Grados Decimales ↔ GMS — Calzix',
    description: 'Convierte coordenadas geográficas entre grados decimales y grados, minutos y segundos (GMS). Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-coordenadas-gms',
  },
  'conversor-pendiente': {
    title: 'Conversor de Pendiente: % a Grados y Proporción — Calzix',
    description: 'Convierte la pendiente entre porcentaje, grados y proporción 1:n. Útil para carreteras, rampas y tejados. Gratis.',
    canonical: 'https://calzix.com/conversor-pendiente',
  },
  'conversor-tallas-calzado': {
    title: 'Conversor de Tallas de Calzado EU, US, UK — Calzix',
    description: 'Convierte tallas de zapatos entre los sistemas europeo, estadounidense y británico, con la longitud del pie en cm. Gratis.',
    canonical: 'https://calzix.com/conversor-tallas-calzado',
  },
  'conversor-mah-wh': {
    title: 'Conversor de mAh a Wh (y Wh a mAh) — Calzix',
    description: 'Convierte la capacidad de baterías entre mAh y Wh según el voltaje. Comprueba el límite de power banks en avión. Gratis.',
    canonical: 'https://calzix.com/conversor-mah-wh',
  },
  'conversor-escala-mapa': {
    title: 'Conversor de Escala de Mapa — distancia real — Calzix',
    description: 'Calcula la distancia real a partir de la escala del mapa (1:50000) y al revés. Ideal para senderismo y topografía. Gratis.',
    canonical: 'https://calzix.com/conversor-escala-mapa',
  },
  'conversor-viento': {
    title: 'Escala de Viento Beaufort — km/h, nudos y m/s — Calzix',
    description: 'Convierte la velocidad del viento en km/h a su grado en la escala de Beaufort, nudos y metros por segundo. Gratis.',
    canonical: 'https://calzix.com/conversor-viento',
  },
  'conversor-ritmo-velocidad': {
    title: 'Conversor de Ritmo (min/km) a Velocidad (km/h) — Calzix',
    description: 'Convierte entre ritmo de carrera (min/km) y velocidad (km/h) para running y ciclismo. Ajusta tu cinta de correr. Gratis.',
    canonical: 'https://calzix.com/conversor-ritmo-velocidad',
  },
  'hormigon-losa': {
    title: 'Calculadora de Hormigón para Losa o Solera (m³) — Calzix',
    description: 'Calcula los metros cúbicos de hormigón para una losa, solera o cimiento, con margen de desperdicio y sacos de cemento. Gratis.',
    canonical: 'https://calzix.com/hormigon-losa',
  },
  'escalera-peldanos': {
    title: 'Calculadora de Escalera: Peldaños, Huella y Contrahuella — Calzix',
    description: 'Calcula el número de peldaños, la contrahuella y la huella de una escalera cómoda con la regla de Blondel. Gratis.',
    canonical: 'https://calzix.com/escalera-peldanos',
  },
  'papel-pintado': {
    title: 'Calculadora de Papel Pintado: Rollos Necesarios — Calzix',
    description: 'Calcula cuántos rollos de papel pintado necesitas según el perímetro, la altura de la pared y las medidas del rollo. Gratis.',
    canonical: 'https://calzix.com/papel-pintado',
  },
  'potencia-contratada': {
    title: 'Calculadora de Potencia Eléctrica a Contratar (kW) — Calzix',
    description: 'Estima qué potencia eléctrica contratar según tus electrodomésticos y el factor de simultaneidad. Ahorra en la factura. Gratis.',
    canonical: 'https://calzix.com/potencia-contratada',
  },
  'ahorro-led': {
    title: 'Calculadora de Ahorro al Cambiar a Bombillas LED — Calzix',
    description: 'Calcula cuánto dinero y energía ahorras al sustituir tus bombillas por LED, según horas de uso y precio del kWh. Gratis.',
    canonical: 'https://calzix.com/ahorro-led',
  },
  'capacidad-endeudamiento': {
    title: 'Calculadora de Capacidad de Endeudamiento (regla 35%) — Calzix',
    description: 'Calcula cuánto puedes pedir prestado según tus ingresos con la regla del 35%. Cuota máxima y préstamo asumible. Gratis.',
    canonical: 'https://calzix.com/capacidad-endeudamiento',
  },
  'gastos-compra-vivienda': {
    title: 'Calculadora de Gastos de Compra de Vivienda — Calzix',
    description: 'Calcula los impuestos, notaría y gastos al comprar una casa, además del precio. Porcentajes ajustables a tu país. Gratis.',
    canonical: 'https://calzix.com/gastos-compra-vivienda',
  },
  'consumo-climatizacion': {
    title: 'Calculadora de Consumo de Aire Acondicionado y Calefacción — Calzix',
    description: 'Calcula el coste eléctrico del aire acondicionado o la calefacción por temporada según potencia, horas y precio del kWh. Gratis.',
    canonical: 'https://calzix.com/consumo-climatizacion',
  },
  'cesped-semillas': {
    title: 'Calculadora de Semillas de Césped por m² — Calzix',
    description: 'Calcula los kilos de semilla de césped que necesitas según la superficie y la dosis de siembra. Gratis y al instante.',
    canonical: 'https://calzix.com/cesped-semillas',
  },
  'piscina-volumen': {
    title: 'Calculadora de Volumen de Piscina (litros y m³) — Calzix',
    description: 'Calcula los litros de agua de tu piscina rectangular o circular y la dosis de cloro inicial. Gratis, sin registro.',
    canonical: 'https://calzix.com/piscina-volumen',
  },
  'comision-ventas': {
    title: 'Calculadora de Comisión de Ventas — Calzix',
    description: 'Calcula la comisión de un vendedor sobre las ventas y el total a cobrar con salario base. Gratis y al instante.',
    canonical: 'https://calzix.com/comision-ventas',
  },
  'presupuesto-trabajo': {
    title: 'Calculadora de Presupuesto de Trabajo (materiales, mano de obra, IVA) — Calzix',
    description: 'Elabora un presupuesto con materiales, mano de obra, margen e IVA. Ideal para autónomos y oficios. Gratis.',
    canonical: 'https://calzix.com/presupuesto-trabajo',
  },
  'recargo-mora': {
    title: 'Calculadora de Intereses de Demora por Factura Impagada — Calzix',
    description: 'Calcula el recargo por mora e intereses de demora de una factura pagada fuera de plazo. Gratis, sin registro.',
    canonical: 'https://calzix.com/recargo-mora',
  },
  'descuento-sucesivo': {
    title: 'Calculadora de Descuentos Sucesivos y Equivalente — Calzix',
    description: 'Aplica varios descuentos encadenados y calcula el descuento único equivalente. Evita el error de sumar porcentajes. Gratis.',
    canonical: 'https://calzix.com/descuento-sucesivo',
  },
  'descuento-pronto-pago': {
    title: 'Calculadora de Descuento por Pronto Pago — Calzix',
    description: 'Calcula el ahorro por pagar una factura antes de plazo y su rentabilidad anualizada. Gratis y al instante.',
    canonical: 'https://calzix.com/descuento-pronto-pago',
  },
  'salario-por-hora': {
    title: 'Calculadora de Salario por Hora (anual ↔ hora) — Calzix',
    description: 'Convierte tu salario anual en salario por hora y viceversa según tu jornada. Compara ofertas de empleo. Gratis.',
    canonical: 'https://calzix.com/salario-por-hora',
  },
  'coste-empresa-trabajador': {
    title: 'Calculadora del Coste de un Trabajador para la Empresa — Calzix',
    description: 'Calcula cuánto cuesta un empleado a la empresa: salario bruto más cotizaciones sociales. Gratis, sin registro.',
    canonical: 'https://calzix.com/coste-empresa-trabajador',
  },
  'paga-extra': {
    title: 'Calculadora de Pagas Extra y Prorrateo — Calzix',
    description: 'Reparte tu salario anual entre 12, 14, 15 o 16 pagas y calcula el importe de cada una y el prorrateo. Gratis.',
    canonical: 'https://calzix.com/paga-extra',
  },
  'objetivo-ventas': {
    title: 'Calculadora de Objetivo de Ventas Diario — Calzix',
    description: 'Reparte tu meta de ventas mensual en un objetivo diario y recalcula el ritmo según lo vendido. Gratis y al instante.',
    canonical: 'https://calzix.com/objetivo-ventas',
  },
  'reparto-propinas': {
    title: 'Calculadora de Reparto de Propinas por Horas — Calzix',
    description: 'Reparte las propinas del equipo de forma proporcional a las horas trabajadas por cada persona. Gratis, sin registro.',
    canonical: 'https://calzix.com/reparto-propinas',
  },
};
