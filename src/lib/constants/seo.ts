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
    title: 'Calculadora de Materiales de Construcción — Calzix',
    description: 'Estima la cantidad de cemento, ladrillos o azulejos para tu proyecto de construcción.',
    canonical: 'https://calzix.com/materiales-construccion',
  },
  'calculadora-pintura': {
    title: 'Calculadora de Pintura — Calzix',
    description: 'Calcula los litros de pintura necesarios para tus paredes y techos.',
    canonical: 'https://calzix.com/calculadora-pintura',
  },
  'consumo-electrico': {
    title: 'Calculadora de Consumo Eléctrico — Calzix',
    description: 'Calcula el coste eléctrico de tus electrodomésticos por día, mes y año.',
    canonical: 'https://calzix.com/consumo-electrico',
  },
  'calculadora-hipoteca': {
    title: 'Calculadora de Hipoteca — Calzix',
    description: 'Calcula tu cuota mensual, el total pagado y los intereses de tu hipoteca.',
    canonical: 'https://calzix.com/calculadora-hipoteca',
  },
  'ahorro-energetico': {
    title: 'Calculadora de Ahorro Energético — Calzix',
    description: 'Compara el consumo de dos aparatos y calcula cuánto ahorras al año.',
    canonical: 'https://calzix.com/ahorro-energetico',
  },
  'area-jardin': {
    title: 'Calculadora de Área del Jardín — Calzix',
    description: 'Calcula el área de tu jardín y estima el material necesario para cubrirlo.',
    canonical: 'https://calzix.com/area-jardin',
  },
  // ── Trabajo ──────────────────────────────────────────────────────────────
  'calculadora-iva': {
    title: 'Calculadora de IVA — Calzix',
    description: 'Añade o extrae el IVA de cualquier importe al instante. Tipos del 4%, 10% y 21%.',
    canonical: 'https://calzix.com/calculadora-iva',
  },
  'calculadora-descuento': {
    title: 'Calculadora de Descuentos — Calzix',
    description: 'Calcula el precio final tras aplicar uno o varios descuentos en porcentaje.',
    canonical: 'https://calzix.com/calculadora-descuento',
  },
  'calculadora-nomina': {
    title: 'Calculadora de Nómina — Calzix',
    description: 'Estima tu salario neto mensual a partir del salario bruto anual.',
    canonical: 'https://calzix.com/calculadora-nomina',
  },
  'calculadora-productividad': {
    title: 'Calculadora de Productividad — Calzix',
    description: 'Calcula tu tarifa horaria ideal y el valor de tu tiempo por tarea.',
    canonical: 'https://calzix.com/calculadora-productividad',
  },
  'calculadora-propina': {
    title: 'Calculadora de Propina — Calzix',
    description: 'Calcula la propina y divide la cuenta entre comensales fácilmente.',
    canonical: 'https://calzix.com/calculadora-propina',
  },
  // ── Educación ────────────────────────────────────────────────────────────
  'nota-media': {
    title: 'Calculadora de Nota Media — Calzix',
    description: 'Calcula tu nota media ponderada por créditos y descubre qué nota necesitas.',
    canonical: 'https://calzix.com/nota-media',
  },
  'calculadora-beca': {
    title: 'Calculadora de Beca — Calzix',
    description: 'Estima si cumples los requisitos de renta familiar para acceder a una beca.',
    canonical: 'https://calzix.com/calculadora-beca',
  },
  'tiempo-estudio': {
    title: 'Calculadora de Tiempo de Estudio — Calzix',
    description: 'Planifica las horas de estudio necesarias por tema para preparar tu examen.',
    canonical: 'https://calzix.com/tiempo-estudio',
  },
  'velocidad-lectura': {
    title: 'Calculadora de Velocidad de Lectura — Calzix',
    description: 'Mide tu velocidad lectora en ppm y estima cuánto tardas en terminar un libro.',
    canonical: 'https://calzix.com/velocidad-lectura',
  },
  // ── Viaje ────────────────────────────────────────────────────────────────
  'consumo-combustible': {
    title: 'Calculadora de Consumo de Combustible — Calzix',
    description: 'Calcula el gasto en gasolina o diésel de cualquier trayecto.',
    canonical: 'https://calzix.com/consumo-combustible',
  },
  'calculadora-distancia': {
    title: 'Calculadora de Distancia y Tiempo de Viaje — Calzix',
    description: 'Calcula el tiempo de viaje a partir de la distancia y la velocidad media.',
    canonical: 'https://calzix.com/calculadora-distancia',
  },
  'diferencia-horaria': {
    title: 'Calculadora de Diferencia Horaria — Calzix',
    description: 'Calcula la diferencia horaria entre dos zonas del mundo al instante.',
    canonical: 'https://calzix.com/diferencia-horaria',
  },
  'peso-equipaje': {
    title: 'Calculadora de Peso de Equipaje — Calzix',
    description: 'Comprueba si tu maleta cumple los límites de peso de la aerolínea.',
    canonical: 'https://calzix.com/peso-equipaje',
  },
  'coste-viaje': {
    title: 'Calculadora de Coste de Viaje — Calzix',
    description: 'Suma todos los gastos del viaje y calcula el coste total por persona.',
    canonical: 'https://calzix.com/coste-viaje',
  },
  // ── Naturaleza ───────────────────────────────────────────────────────────
  'huella-carbono': {
    title: 'Calculadora de Huella de Carbono — Calzix',
    description: 'Estima tu huella de CO₂ anual por transporte y consumo energético del hogar.',
    canonical: 'https://calzix.com/huella-carbono',
  },
  'consumo-agua': {
    title: 'Calculadora de Consumo de Agua — Calzix',
    description: 'Calcula tu consumo de agua diario y el coste mensual de tus hábitos.',
    canonical: 'https://calzix.com/consumo-agua',
  },
  'ahorro-solar': {
    title: 'Calculadora de Ahorro Solar — Calzix',
    description: 'Estima el ahorro anual y el retorno de inversión de tus paneles solares.',
    canonical: 'https://calzix.com/ahorro-solar',
  },
  'calculadora-reciclaje': {
    title: 'Calculadora de Reciclaje — Calzix',
    description: 'Calcula el impacto ambiental positivo de tus residuos reciclados cada mes.',
    canonical: 'https://calzix.com/calculadora-reciclaje',
  },
  // ── Ocio ─────────────────────────────────────────────────────────────────
  'test-compatibilidad': {
    title: 'Test de Compatibilidad de Pareja — Calzix',
    description: 'Descubre tu porcentaje de compatibilidad de pareja de forma lúdica.',
    canonical: 'https://calzix.com/test-compatibilidad',
  },
  'numeros-suerte': {
    title: 'Generador de Números de la Suerte — Calzix',
    description: 'Genera tus números de la suerte personalizados para lotería o primitiva.',
    canonical: 'https://calzix.com/numeros-suerte',
  },
  'numero-numerologia': {
    title: 'Calculadora de Numerología — Calzix',
    description: 'Calcula tu número de la vida y el número del destino según la numerología.',
    canonical: 'https://calzix.com/numero-numerologia',
  },
  'calculadora-sueno': {
    title: 'Calculadora de Sueño — Calzix',
    description: 'Calcula la hora ideal para despertar según los ciclos de sueño de 90 minutos.',
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
    title: 'Calculadora de Presupuesto de Obra — Calzix',
    description: 'Estima el coste total de tu proyecto de construcción. Calcula materiales, mano de obra y contingencias. Gratis, sin registro.',
    canonical: 'https://calzix.com/presupuesto-obra',
  },
  'cemento-mortero': {
    title: 'Calculadora de Cemento y Mortero — Calzix',
    description: 'Calcula cantidades exactas de cemento y mortero para tu obra. Estima materiales necesarios. Gratis, sin registro.',
    canonical: 'https://calzix.com/cemento-mortero',
  },
  'baldosas-suelo': {
    title: 'Calculadora de Baldosas de Suelo — Calzix',
    description: 'Calcula el número exacto de baldosas necesarias. Estima desperdicio y cobertura total. Gratis, sin registro.',
    canonical: 'https://calzix.com/baldosas-suelo',
  },
  'pintura-techos': {
    title: 'Calculadora de Pintura para Techos — Calzix',
    description: 'Calcula los litros de pintura necesarios para tus techos. Usa rendimiento real del producto. Gratis, sin registro.',
    canonical: 'https://calzix.com/pintura-techos',
  },
  'pintura-exterior': {
    title: 'Calculadora de Pintura Exterior — Calzix',
    description: 'Calcula pintura para fachadas y exteriores. Estima capas y cobertura total. Gratis, sin registro.',
    canonical: 'https://calzix.com/pintura-exterior',
  },
  'circuito-electrico': {
    title: 'Calculadora de Circuito Eléctrico — Calzix',
    description: 'Calcula voltaje, intensidad y resistencia. Resuelve circuitos con ley de Ohm. Gratis, sin registro.',
    canonical: 'https://calzix.com/circuito-electrico',
  },
  'cable-electrico': {
    title: 'Calculadora de Sección de Cable Eléctrico — Calzix',
    description: 'Calcula la sección exacta de cable necesaria. Determina grosor según potencia y distancia. Gratis, sin registro.',
    canonical: 'https://calzix.com/cable-electrico',
  },
  'instalacion-solar-hogar': {
    title: 'Calculadora de Instalación Solar para Hogar — Calzix',
    description: 'Calcula el sistema solar necesario para tu vivienda. Estima paneles y potencia requerida. Gratis, sin registro.',
    canonical: 'https://calzix.com/instalacion-solar-hogar',
  },
  'amortizacion-hipoteca': {
    title: 'Calculadora de Amortización de Hipoteca — Calzix',
    description: 'Calcula tu cuota mensual y tabla de amortización. Desglose de capital e intereses. Gratis, sin registro.',
    canonical: 'https://calzix.com/amortizacion-hipoteca',
  },
  'alquiler-vs-compra': {
    title: 'Calculadora de Alquiler vs Compra — Calzix',
    description: 'Compara la economía de alquilar versus comprar. Análisis financiero a largo plazo. Gratis, sin registro.',
    canonical: 'https://calzix.com/alquiler-vs-compra',
  },
  'factura-gas': {
    title: 'Calculadora de Factura de Gas — Calzix',
    description: 'Calcula el coste de tu consumo de gas. Estima gastos mensuales y anuales. Gratis, sin registro.',
    canonical: 'https://calzix.com/factura-gas',
  },
  'consumo-agua-hogar': {
    title: 'Calculadora de Consumo de Agua del Hogar — Calzix',
    description: 'Calcula tu consumo diario de agua. Estima gastos mensuales y anuales. Gratis, sin registro.',
    canonical: 'https://calzix.com/consumo-agua-hogar',
  },
  'riego-jardin': {
    title: 'Calculadora de Riego de Jardín — Calzix',
    description: 'Calcula el sistema de riego óptimo para tu jardín. Estima tiempo y cantidad de agua. Gratis, sin registro.',
    canonical: 'https://calzix.com/riego-jardin',
  },
  'fertilizante-jardin': {
    title: 'Calculadora de Fertilizante para Jardín — Calzix',
    description: 'Calcula la dosis exacta de fertilizante. Estima cantidad según área y tipo de planta. Gratis, sin registro.',
    canonical: 'https://calzix.com/fertilizante-jardin',
  },
  // ── Trabajo (nuevas) ─────────────────────────────────────────────
  'precio-hora': {
    title: 'Calculadora de Precio por Hora — Calzix',
    description: 'Calcula tu tarifa horaria ideal para freelancers. Estima precio según ingresos y horas anuales. Gratis, sin registro.',
    canonical: 'https://calzix.com/precio-hora',
  },
  'margen-beneficio': {
    title: 'Calculadora de Margen de Beneficio — Calzix',
    description: 'Calcula margen bruto y neto de tus productos. Determina rentabilidad al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/margen-beneficio',
  },
  'punto-equilibrio': {
    title: 'Calculadora de Punto de Equilibrio — Calzix',
    description: 'Calcula cuándo tu negocio comienza a ser rentable. Determina cantidad de venta necesaria. Gratis, sin registro.',
    canonical: 'https://calzix.com/punto-equilibrio',
  },
  'rentabilidad-roi': {
    title: 'Calculadora de ROI y Rentabilidad — Calzix',
    description: 'Calcula tu retorno de inversión en porcentaje. Mide rentabilidad de proyectos. Gratis, sin registro.',
    canonical: 'https://calzix.com/rentabilidad-roi',
  },
  'precio-coste-mas': {
    title: 'Calculadora de Precio Coste Plus — Calzix',
    description: 'Calcula el precio final con margen de beneficio. Añade porcentaje al coste automáticamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/precio-coste-mas',
  },
  'descuento-volumen': {
    title: 'Calculadora de Descuento por Volumen — Calzix',
    description: 'Calcula descuentos escalonados por cantidad. Estima precios finales por volumen. Gratis, sin registro.',
    canonical: 'https://calzix.com/descuento-volumen',
  },
  'precio-original-descuento': {
    title: 'Calculadora de Precio Original con Descuento — Calzix',
    description: 'Halla el precio original conociendo el descuento. Deshaz descuentos al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/precio-original-descuento',
  },
  'irpf-retencion': {
    title: 'Calculadora de IRPF y Retenciones — Calzix',
    description: 'Calcula IRPF y retenciones de tu salario. Estima impuestos directos. Gratis, sin registro.',
    canonical: 'https://calzix.com/irpf-retencion',
  },
  'finiquito': {
    title: 'Calculadora de Finiquito — Calzix',
    description: 'Calcula tu finiquito por despido o renuncia. Estima indemnización y prestaciones. Gratis, sin registro.',
    canonical: 'https://calzix.com/finiquito',
  },
  'vacaciones-proporcionales': {
    title: 'Calculadora de Vacaciones Proporcionales — Calzix',
    description: 'Calcula tus días de vacaciones proporcionales. Estima coste económico de vacaciones. Gratis, sin registro.',
    canonical: 'https://calzix.com/vacaciones-proporcionales',
  },
  'horas-extra': {
    title: 'Calculadora de Horas Extra — Calzix',
    description: 'Calcula el coste de tus horas extra. Estima pago adicional por trabajo extra. Gratis, sin registro.',
    canonical: 'https://calzix.com/horas-extra',
  },
  'pomodoro': {
    title: 'Calculadora Técnica Pomodoro — Calzix',
    description: 'Planifica tus sesiones de trabajo con Pomodoro. Organiza tiempo en bloques productivos. Gratis, sin registro.',
    canonical: 'https://calzix.com/pomodoro',
  },
  'coste-reunion': {
    title: 'Calculadora de Coste de Reunión — Calzix',
    description: 'Calcula cuánto cuesta realmente una reunión. Estima gasto según salarios. Gratis, sin registro.',
    canonical: 'https://calzix.com/coste-reunion',
  },
  'propina-grupo': {
    title: 'Calculadora de Propina para Grupo — Calzix',
    description: 'Divide la propina entre comensales automáticamente. Calcula cuota equitativa por persona. Gratis, sin registro.',
    canonical: 'https://calzix.com/propina-grupo',
  },
  'propina-porcentaje': {
    title: 'Calculadora de Propina por Porcentaje — Calzix',
    description: 'Calcula la propina automática en porcentaje. Estima cantidad exacta al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/propina-porcentaje',
  },
  // ── Educación (nuevas) ───────────────────────────────────────────
  'nota-necesaria': {
    title: 'Calculadora de Nota Necesaria — Calzix',
    description: 'Calcula qué nota necesitas para aprobar. Determina la calificación mínima requerida. Gratis, sin registro.',
    canonical: 'https://calzix.com/nota-necesaria',
  },
  'nota-ponderada': {
    title: 'Calculadora de Nota Ponderada — Calzix',
    description: 'Calcula tu nota media ponderada por créditos. Promedia notas con pesos diferentes. Gratis, sin registro.',
    canonical: 'https://calzix.com/nota-ponderada',
  },
  'nota-selectividad': {
    title: 'Calculadora de Nota de Selectividad — Calzix',
    description: 'Calcula tu nota de acceso a universidad. Combina notas de bachillerato y pruebas. Gratis, sin registro.',
    canonical: 'https://calzix.com/nota-selectividad',
  },
  'conversion-notas': {
    title: 'Conversor de Escala de Notas — Calzix',
    description: 'Convierte notas entre sistemas diferentes. Transforma escala de calificaciones al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversion-notas',
  },
  'simulador-beca': {
    title: 'Simulador de Elegibilidad de Beca — Calzix',
    description: 'Simula tu elegibilidad para becas educativas. Estima probabilidad de obtener ayuda. Gratis, sin registro.',
    canonical: 'https://calzix.com/simulador-beca',
  },
  'umbral-renta-beca': {
    title: 'Calculadora de Umbral de Renta para Beca — Calzix',
    description: 'Calcula el límite de renta para becas. Determina si cumples requisitos económicos. Gratis, sin registro.',
    canonical: 'https://calzix.com/umbral-renta-beca',
  },
  'coste-carrera': {
    title: 'Calculadora de Coste de Carrera Universitaria — Calzix',
    description: 'Calcula la inversión total en tus estudios. Estima gasto en matrícula y materiales. Gratis, sin registro.',
    canonical: 'https://calzix.com/coste-carrera',
  },
  'sesion-estudio': {
    title: 'Planificador de Sesión de Estudio — Calzix',
    description: 'Planifica sesiones de estudio óptimas. Organiza tiempo de aprendizaje efectivamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/sesion-estudio',
  },
  'aprendizaje-espaciado': {
    title: 'Calculadora de Aprendizaje Espaciado — Calzix',
    description: 'Planifica tu sistema de repaso espaciado. Organiza repasos efectivos con espacios. Gratis, sin registro.',
    canonical: 'https://calzix.com/aprendizaje-espaciado',
  },
  'horas-idioma': {
    title: 'Calculadora de Horas para Aprender Idioma — Calzix',
    description: 'Calcula las horas necesarias para aprender un idioma. Estima tiempo según nivel deseado. Gratis, sin registro.',
    canonical: 'https://calzix.com/horas-idioma',
  },
  'plan-estudio': {
    title: 'Generador de Plan de Estudio — Calzix',
    description: 'Crea un plan de estudios personalizado. Organiza calendario de aprendizaje. Gratis, sin registro.',
    canonical: 'https://calzix.com/plan-estudio',
  },
  'palabras-minuto': {
    title: 'Calculadora de Palabras por Minuto — Calzix',
    description: 'Mide tu velocidad de lectura en WPM. Calcula palabras por minuto al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/palabras-minuto',
  },
  'tiempo-terminar-libro': {
    title: 'Calculadora de Tiempo para Terminar Libro — Calzix',
    description: 'Estima cuánto tiempo tardas en leer un libro. Calcula fecha de finalización. Gratis, sin registro.',
    canonical: 'https://calzix.com/tiempo-terminar-libro',
  },
  'libros-al-ano': {
    title: 'Calculadora de Libros al Año — Calzix',
    description: 'Calcula cuántos libros puedes leer anualmente. Estima cantidad según hábito de lectura. Gratis, sin registro.',
    canonical: 'https://calzix.com/libros-al-ano',
  },
  'comprension-lectora': {
    title: 'Evaluador de Comprensión Lectora — Calzix',
    description: 'Evalúa tu comprensión de textos leídos. Mide nivel de retención. Gratis, sin registro.',
    canonical: 'https://calzix.com/comprension-lectora',
  },
  'paginas-por-dia': {
    title: 'Calculadora de Páginas por Día — Calzix',
    description: 'Planifica tu lectura diaria por páginas. Organiza progreso de lecturas. Gratis, sin registro.',
    canonical: 'https://calzix.com/paginas-por-dia',
  },
  // ── Viaje (nuevas) ───────────────────────────────────────────────
  'autonomia-electrico': {
    title: 'Calculadora de Autonomía de Coche Eléctrico — Calzix',
    description: 'Calcula el rango de tu vehículo eléctrico. Estima km posibles con carga. Gratis, sin registro.',
    canonical: 'https://calzix.com/autonomia-electrico',
  },
  'costo-gasolinera': {
    title: 'Calculadora de Coste en Gasolinera — Calzix',
    description: 'Calcula cuánto cuesta llenar el depósito. Estima gasto en combustible. Gratis, sin registro.',
    canonical: 'https://calzix.com/costo-gasolinera',
  },
  'litros-repostaje': {
    title: 'Calculadora de Litros de Repostaje — Calzix',
    description: 'Calcula los litros necesarios de combustible. Estima cantidad exacta de repostaje. Gratis, sin registro.',
    canonical: 'https://calzix.com/litros-repostaje',
  },
  'distancia-a-pie': {
    title: 'Calculadora de Tiempo Caminando — Calzix',
    description: 'Calcula el tiempo de caminata por distancia. Estima duración de paseos a pie. Gratis, sin registro.',
    canonical: 'https://calzix.com/distancia-a-pie',
  },
  'distancia-ciclismo': {
    title: 'Calculadora de Tiempo en Bicicleta — Calzix',
    description: 'Calcula el tiempo en bicicleta por distancia. Estima duración del recorrido. Gratis, sin registro.',
    canonical: 'https://calzix.com/distancia-ciclismo',
  },
  'ruta-senderismo': {
    title: 'Calculadora de Ruta de Senderismo — Calzix',
    description: 'Calcula el tiempo de senderismo. Estima duración de excursiones montañosas. Gratis, sin registro.',
    canonical: 'https://calzix.com/ruta-senderismo',
  },
  'jet-lag': {
    title: 'Calculadora de Jet Lag — Calzix',
    description: 'Calcula los efectos del cambio horario. Estima recuperación temporal al viajar. Gratis, sin registro.',
    canonical: 'https://calzix.com/jet-lag',
  },
  'duracion-vuelo': {
    title: 'Calculadora de Duración de Vuelo — Calzix',
    description: 'Calcula el tiempo de vuelo estimado. Determina hora de llegada automáticamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/duracion-vuelo',
  },
  'exceso-equipaje': {
    title: 'Calculadora de Exceso de Equipaje — Calzix',
    description: 'Calcula el coste de exceso de equipaje. Estima penalizaciones por peso. Gratis, sin registro.',
    canonical: 'https://calzix.com/exceso-equipaje',
  },
  'dimensions-maleta': {
    title: 'Calculadora de Dimensiones de Maleta — Calzix',
    description: 'Calcula el volumen de tu maleta. Verifica si cumple límites de aerolínea. Gratis, sin registro.',
    canonical: 'https://calzix.com/dimensions-maleta',
  },
  'presupuesto-viaje': {
    title: 'Calculadora de Presupuesto de Viaje — Calzix',
    description: 'Presupuesta todos los gastos de tu viaje. Suma alojamiento, comidas y transporte. Gratis, sin registro.',
    canonical: 'https://calzix.com/presupuesto-viaje',
  },
  'cambio-divisas': {
    title: 'Conversor de Divisas — Calzix',
    description: 'Convierte monedas de viaje al instante. Obtén tipos de cambio actuales. Gratis, sin registro.',
    canonical: 'https://calzix.com/cambio-divisas',
  },
  'seguro-viaje': {
    title: 'Calculadora de Seguro de Viaje — Calzix',
    description: 'Calcula el coste de seguro de viaje. Estima prima según duración y destino. Gratis, sin registro.',
    canonical: 'https://calzix.com/seguro-viaje',
  },
  'alojamiento-comparativa': {
    title: 'Comparador de Costes de Alojamiento — Calzix',
    description: 'Compara costes de alojamiento. Analiza opciones de hospedaje por precio. Gratis, sin registro.',
    canonical: 'https://calzix.com/alojamiento-comparativa',
  },
  'costo-peajes': {
    title: 'Calculadora de Coste de Peajes — Calzix',
    description: 'Calcula el coste de peajes en autopista. Estima gastos de carreteras de peaje. Gratis, sin registro.',
    canonical: 'https://calzix.com/costo-peajes',
  },
  // ── Naturaleza (nuevas) ─────────────────────────────────────────
  'co2-transporte': {
    title: 'Calculadora de Emisiones CO2 de Transporte — Calzix',
    description: 'Calcula la emisión de CO2 de tus viajes. Estima huella de carbono por desplazamiento. Gratis, sin registro.',
    canonical: 'https://calzix.com/co2-transporte',
  },
  'compensacion-co2': {
    title: 'Calculadora de Compensación de CO2 — Calzix',
    description: 'Calcula árboles a plantar para compensar. Estima ofsets necesarios. Gratis, sin registro.',
    canonical: 'https://calzix.com/compensacion-co2',
  },
  'huella-alimentaria': {
    title: 'Calculadora de Huella Alimentaria — Calzix',
    description: 'Calcula el CO2 de tu dieta. Estima impacto ambiental de alimentos. Gratis, sin registro.',
    canonical: 'https://calzix.com/huella-alimentaria',
  },
  'etiqueta-energetica': {
    title: 'Calculadora de Etiqueta Energética — Calzix',
    description: 'Calcula la clase energética de aparatos. Clasifica eficiencia A-G. Gratis, sin registro.',
    canonical: 'https://calzix.com/etiqueta-energetica',
  },
  'consumo-ducha': {
    title: 'Calculadora de Consumo de Agua en Ducha — Calzix',
    description: 'Calcula el agua consumida en ducha. Estima litros mensuales y anuales. Gratis, sin registro.',
    canonical: 'https://calzix.com/consumo-ducha',
  },
  'agua-alimentos': {
    title: 'Calculadora de Agua en Alimentos — Calzix',
    description: 'Calcula el agua virtual en alimentos. Estima huella hídrica de dieta. Gratis, sin registro.',
    canonical: 'https://calzix.com/agua-alimentos',
  },
  'calidad-agua': {
    title: 'Evaluador de Calidad de Agua — Calzix',
    description: 'Evalúa la pureza y calidad del agua. Determina nivel de contaminación. Gratis, sin registro.',
    canonical: 'https://calzix.com/calidad-agua',
  },
  'captacion-lluvia': {
    title: 'Calculadora de Captación de Lluvia — Calzix',
    description: 'Calcula agua disponible de lluvia. Estima litros recolectables anualmente. Gratis, sin registro.',
    canonical: 'https://calzix.com/captacion-lluvia',
  },
  'numero-placas-solar': {
    title: 'Calculadora de Número de Placas Solares — Calzix',
    description: 'Calcula las placas solares necesarias. Estima cantidad de paneles requeridos. Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-placas-solar',
  },
  'angulo-solar': {
    title: 'Calculadora de Ángulo Solar — Calzix',
    description: 'Calcula el ángulo óptimo de paneles. Determina inclinación ideal por latitud. Gratis, sin registro.',
    canonical: 'https://calzix.com/angulo-solar',
  },
  'bateria-solar': {
    title: 'Calculadora de Batería Solar — Calzix',
    description: 'Calcula capacidad de batería necesaria. Estima almacenamiento de energía. Gratis, sin registro.',
    canonical: 'https://calzix.com/bateria-solar',
  },
  'plastico-reciclado': {
    title: 'Calculadora de Impacto de Reciclaje de Plástico — Calzix',
    description: 'Calcula CO2 ahorrado reciclando plástico. Estima impacto ambiental positivo. Gratis, sin registro.',
    canonical: 'https://calzix.com/plastico-reciclado',
  },
  'papel-reciclado': {
    title: 'Calculadora de Reciclaje de Papel — Calzix',
    description: 'Calcula árboles salvados reciclando papel. Estima ahorro de agua. Gratis, sin registro.',
    canonical: 'https://calzix.com/papel-reciclado',
  },
  'residuos-electronicos': {
    title: 'Calculadora de Impacto de E-waste — Calzix',
    description: 'Calcula impacto de residuos electrónicos. Estima toxinas liberadas. Gratis, sin registro.',
    canonical: 'https://calzix.com/residuos-electronicos',
  },
  'compost-organico': {
    title: 'Calculadora de Compost Orgánico — Calzix',
    description: 'Calcula la cantidad de compost producido. Estima abono disponible anualmente. Gratis, sin registro.',
    canonical: 'https://calzix.com/compost-organico',
  },
  'eficiencia-energetica': {
    title: 'Calculadora de Eficiencia Energética — Calzix',
    description: 'Calcula la eficiencia energética de aparatos. Compara consumo de dispositivos. Gratis, sin registro.',
    canonical: 'https://calzix.com/eficiencia-energetica',
  },
  // ── Ocio (nuevas) ───────────────────────────────────────────────
  'compatibilidad-zodiacal': {
    title: 'Calculadora de Compatibilidad Zodiacal — Calzix',
    description: 'Calcula tu compatibilidad astrológica. Descubre porcentaje de afinidad por signos. Gratis, sin registro.',
    canonical: 'https://calzix.com/compatibilidad-zodiacal',
  },
  'dias-juntos': {
    title: 'Calculadora de Días Juntos — Calzix',
    description: 'Calcula cuánto tiempo llevan juntos. Estima aniversarios y fechas especiales. Gratis, sin registro.',
    canonical: 'https://calzix.com/dias-juntos',
  },
  'nombre-amor': {
    title: 'Generador de Nombre de Pareja — Calzix',
    description: 'Combina nombres para crear "nombre de pareja". Divertido generador lúdico. Gratis, sin registro.',
    canonical: 'https://calzix.com/nombre-amor',
  },
  'presupuesto-boda': {
    title: 'Calculadora de Presupuesto de Boda — Calzix',
    description: 'Presupuesta todos los gastos de boda. Suma catering, decoración, fotografía. Gratis, sin registro.',
    canonical: 'https://calzix.com/presupuesto-boda',
  },
  'ruleta-decision': {
    title: 'Ruleta de Decisión — Calzix',
    description: 'Genera decisiones aleatorias con ruleta. Resuelve dilemas al azar. Gratis, sin registro.',
    canonical: 'https://calzix.com/ruleta-decision',
  },
  'dado-virtual': {
    title: 'Dado Virtual — Calzix',
    description: 'Lanza un dado virtual de 6 caras. Genera números aleatorios. Gratis, sin registro.',
    canonical: 'https://calzix.com/dado-virtual',
  },
  'cara-o-cruz': {
    title: 'Cara o Cruz — Calzix',
    description: 'Lanza una moneda virtual al azar. Genera cara o cruz aleatoriamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/cara-o-cruz',
  },
  'generador-loteria': {
    title: 'Generador de Números Lotería — Calzix',
    description: 'Genera números aleatorios para loterías. Crea boletos de forma aleatoria. Gratis, sin registro.',
    canonical: 'https://calzix.com/generador-loteria',
  },
  'camino-vida': {
    title: 'Calculadora de Camino de Vida — Calzix',
    description: 'Calcula tu número de camino de vida. Interpretación numerológica personal. Gratis, sin registro.',
    canonical: 'https://calzix.com/camino-vida',
  },
  'numero-expresion': {
    title: 'Calculadora de Número de Expresión — Calzix',
    description: 'Calcula tu número de expresión. Descubre tus talentos numerológicamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-expresion',
  },
  'ciclos-personales': {
    title: 'Calculadora de Ciclos Personales — Calzix',
    description: 'Calcula tus ciclos personales numerológicos. Interpreta fases de vida. Gratis, sin registro.',
    canonical: 'https://calzix.com/ciclos-personales',
  },
  'compatibilidad-numerologica': {
    title: 'Calculadora de Compatibilidad Numerológica — Calzix',
    description: 'Calcula tu compatibilidad numerológica. Analiza afinidad por números. Gratis, sin registro.',
    canonical: 'https://calzix.com/compatibilidad-numerologica',
  },
  'ciclos-sueno': {
    title: 'Calculadora de Ciclos de Sueño — Calzix',
    description: 'Calcula ciclos de sueño de 90 minutos. Determina horas óptimas para dormir. Gratis, sin registro.',
    canonical: 'https://calzix.com/ciclos-sueno',
  },
  'deuda-sueno': {
    title: 'Calculadora de Deuda de Sueño — Calzix',
    description: 'Calcula tu privación de sueño acumulada. Estima deuda de descanso. Gratis, sin registro.',
    canonical: 'https://calzix.com/deuda-sueno',
  },
  'hora-melatonina': {
    title: 'Calculadora de Hora de Melatonina — Calzix',
    description: 'Calcula el pico de melatonina. Determina mejor hora para dormir. Gratis, sin registro.',
    canonical: 'https://calzix.com/hora-melatonina',
  },
  'siesta-optima': {
    title: 'Calculadora de Siesta Óptima — Calzix',
    description: 'Calcula la duración ideal de siesta. Estima time perfecto de descanso. Gratis, sin registro.',
    canonical: 'https://calzix.com/siesta-optima',
  },
};
