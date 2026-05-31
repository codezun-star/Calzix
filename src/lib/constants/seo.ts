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
    title: 'Calculadora de Porcentaje — Calzix',
    description: 'Calcula porcentajes, variaciones y proporciones al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/calculadora-porcentaje',
  },
  'ecuacion-lineal': {
    title: 'Calculadora de Ecuación Lineal — Calzix',
    description: 'Resuelve ecuaciones de primer grado ax + b = 0 al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/ecuacion-lineal',
  },
  'area-figuras': {
    title: 'Calculadora de Área de Figuras — Calzix',
    description: 'Calcula el área y perímetro de círculos, triángulos, rectángulos y más figuras geométricas.',
    canonical: 'https://calzix.com/area-figuras',
  },
  'media-mediana-moda': {
    title: 'Calculadora de Media, Mediana y Moda — Calzix',
    description: 'Calcula la media, mediana y moda de cualquier conjunto de datos al instante.',
    canonical: 'https://calzix.com/media-mediana-moda',
  },
  'seno-coseno': {
    title: 'Calculadora de Seno, Coseno y Tangente — Calzix',
    description: 'Calcula las razones trigonométricas de cualquier ángulo en grados o radianes.',
    canonical: 'https://calzix.com/seno-coseno',
  },
  'probabilidad-simple': {
    title: 'Calculadora de Probabilidad Simple — Calzix',
    description: 'Calcula la probabilidad de un evento como fracción, decimal y porcentaje al instante.',
    canonical: 'https://calzix.com/probabilidad-simple',
  },
  // ── Ciencias ─────────────────────────────────────────────────────────────
  'velocidad-distancia-tiempo': {
    title: 'Calculadora de Velocidad, Distancia y Tiempo — Calzix',
    description: 'Despeja velocidad, distancia o tiempo de la fórmula v = d / t al instante.',
    canonical: 'https://calzix.com/velocidad-distancia-tiempo',
  },
  'concentracion-molar': {
    title: 'Calculadora de Concentración Molar — Calzix',
    description: 'Calcula la molaridad, moles o volumen de disoluciones químicas al instante.',
    canonical: 'https://calzix.com/concentracion-molar',
  },
  // ── Conversión ───────────────────────────────────────────────────────────
  'conversor-longitud': {
    title: 'Conversor de Longitud — Calzix',
    description: 'Convierte metros, kilómetros, millas, pies, pulgadas y otras unidades de longitud.',
    canonical: 'https://calzix.com/conversor-longitud',
  },
  'conversor-peso': {
    title: 'Conversor de Peso — Calzix',
    description: 'Convierte kilogramos, libras, onzas, gramos y toneladas al instante.',
    canonical: 'https://calzix.com/conversor-peso',
  },
  'conversor-temperatura': {
    title: 'Conversor de Temperatura — Calzix',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin de forma inmediata.',
    canonical: 'https://calzix.com/conversor-temperatura',
  },
  'conversor-velocidad': {
    title: 'Conversor de Velocidad — Calzix',
    description: 'Convierte km/h, m/s, mph, nudos y más unidades de velocidad.',
    canonical: 'https://calzix.com/conversor-velocidad',
  },
  'conversor-area': {
    title: 'Conversor de Área — Calzix',
    description: 'Convierte m², hectáreas, km², acres, pies² y otras unidades de superficie.',
    canonical: 'https://calzix.com/conversor-area',
  },
  'conversor-volumen': {
    title: 'Conversor de Volumen — Calzix',
    description: 'Convierte litros, m³, galones, pintas, tazas y otras unidades de volumen.',
    canonical: 'https://calzix.com/conversor-volumen',
  },
  'conversor-energia': {
    title: 'Conversor de Energía — Calzix',
    description: 'Convierte julios, calorías, kWh, BTU y otras unidades de energía.',
    canonical: 'https://calzix.com/conversor-energia',
  },
  'conversor-presion': {
    title: 'Conversor de Presión — Calzix',
    description: 'Convierte pascales, bar, atm, psi y otras unidades de presión.',
    canonical: 'https://calzix.com/conversor-presion',
  },
  'conversor-tiempo': {
    title: 'Conversor de Tiempo — Calzix',
    description: 'Convierte segundos, minutos, horas, días, semanas, meses y años.',
    canonical: 'https://calzix.com/conversor-tiempo',
  },
  'conversor-datos': {
    title: 'Conversor de Datos Digitales — Calzix',
    description: 'Convierte bits, bytes, KB, MB, GB, TB y otras unidades de almacenamiento.',
    canonical: 'https://calzix.com/conversor-datos',
  },
  'conversor-angulos': {
    title: 'Conversor de Ángulos — Calzix',
    description: 'Convierte grados, radianes, gradianes y vueltas al instante.',
    canonical: 'https://calzix.com/conversor-angulos',
  },
  'conversor-monedas': {
    title: 'Conversor de Monedas — Calzix',
    description: 'Convierte entre EUR, USD, GBP, JPY y las principales monedas del mundo.',
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
    title: 'Calculadora de Factorial — Calzix',
    description: 'Calcula el factorial de cualquier número entero n! al instante.',
    canonical: 'https://calzix.com/calculadora-factorial',
  },
  'potencias-raices': {
    title: 'Calculadora de Potencias y Raíces — Calzix',
    description: 'Calcula potencias, raíces cuadradas, cúbicas y de orden n.',
    canonical: 'https://calzix.com/potencias-raices',
  },
  'mcm-mcd': {
    title: 'Calculadora de MCM y MCD — Calzix',
    description: 'Calcula el mínimo común múltiplo y máximo común divisor de dos números.',
    canonical: 'https://calzix.com/mcm-mcd',
  },
  'numero-primo': {
    title: 'Verificador de Número Primo — Calzix',
    description: 'Comprueba si un número es primo o compuesto al instante.',
    canonical: 'https://calzix.com/numero-primo',
  },
  'sistema-ecuaciones': {
    title: 'Calculadora de Sistema de Ecuaciones — Calzix',
    description: 'Resuelve sistemas de ecuaciones lineales 2x2 o 3x3 fácilmente.',
    canonical: 'https://calzix.com/sistema-ecuaciones',
  },
  'funcion-cuadratica': {
    title: 'Calculadora de Función Cuadrática — Calzix',
    description: 'Calcula raíces, vértice y propiedades de una parábola.',
    canonical: 'https://calzix.com/funcion-cuadratica',
  },
  'perimetro-figuras': {
    title: 'Calculadora de Perímetro de Figuras — Calzix',
    description: 'Calcula el perímetro de círculos, triángulos, rectángulos y más.',
    canonical: 'https://calzix.com/perimetro-figuras',
  },
  'volumen-solidos': {
    title: 'Calculadora de Volumen de Sólidos — Calzix',
    description: 'Calcula el volumen de esferas, cilindros, conos, cubos y más.',
    canonical: 'https://calzix.com/volumen-solidos',
  },
  'teorema-pitagoras': {
    title: 'Calculadora del Teorema de Pitágoras — Calzix',
    description: 'Calcula la hipotenusa o catetos de un triángulo rectángulo.',
    canonical: 'https://calzix.com/teorema-pitagoras',
  },
  'varianza-desviacion': {
    title: 'Calculadora de Varianza y Desviación Típica — Calzix',
    description: 'Calcula la varianza, desviación estándar y otros indicadores estadísticos.',
    canonical: 'https://calzix.com/varianza-desviacion',
  },
  'correlacion-datos': {
    title: 'Calculadora de Correlación de Pearson — Calzix',
    description: 'Calcula el coeficiente de correlación entre dos series de datos.',
    canonical: 'https://calzix.com/correlacion-datos',
  },
  'permutaciones-combinaciones': {
    title: 'Calculadora de Permutaciones y Combinaciones — Calzix',
    description: 'Calcula P(n,r) y C(n,r) para problemas de combinatoria.',
    canonical: 'https://calzix.com/permutaciones-combinaciones',
  },
  'distribucion-normal': {
    title: 'Calculadora de Distribución Normal — Calzix',
    description: 'Calcula probabilidades de la distribución normal estándar.',
    canonical: 'https://calzix.com/distribucion-normal',
  },
  'regla-tres': {
    title: 'Calculadora de Regla de Tres — Calzix',
    description: 'Resuelve reglas de tres simples y compuestas al instante.',
    canonical: 'https://calzix.com/regla-tres',
  },
};
