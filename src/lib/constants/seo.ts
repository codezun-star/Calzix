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
  // ── Ciencias (nuevas) ───────────────────────────────────────────
  'segunda-ley-newton': {
    title: 'Calculadora de Segunda Ley de Newton — Calzix',
    description: 'Calcula fuerzas, aceleración y masa según F = m × a. Resuelve problemas de dinámica al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/segunda-ley-newton',
  },
  'energia-cinetica': {
    title: 'Calculadora de Energía Cinética — Calzix',
    description: 'Calcula la energía cinética con la fórmula Ec = ½mv². Encuentra masa, velocidad o energía al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/energia-cinetica',
  },
  'energia-potencial': {
    title: 'Calculadora de Energía Potencial — Calzix',
    description: 'Calcula energía potencial gravitatoria Ep = mgh. Resuelve masa, altura o gravedad instantáneamente. Gratis, sin registro.',
    canonical: 'https://calzix.com/energia-potencial',
  },
  'ley-ohm': {
    title: 'Calculadora de Ley de Ohm — Calzix',
    description: 'Calcula voltaje, corriente o resistencia usando V = I × R. Resuelve circuitos eléctricos en segundos. Gratis, sin registro.',
    canonical: 'https://calzix.com/ley-ohm',
  },
  'potencia-electrica': {
    title: 'Calculadora de Potencia Eléctrica — Calzix',
    description: 'Calcula potencia en vatios: P = V × I. Mide consumo de electrodomésticos al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/potencia-electrica',
  },
  'caida-libre': {
    title: 'Calculadora de Caída Libre — Calzix',
    description: 'Calcula tiempo, velocidad o altura en caída libre. Usa gravedad de 9.81 m/s². Resultados instantáneos. Gratis, sin registro.',
    canonical: 'https://calzix.com/caida-libre',
  },
  'presion-hidrostatica': {
    title: 'Calculadora de Presión Hidrostática — Calzix',
    description: 'Calcula presión en fluidos P = ρgh. Encuentra profundidad, densidad o presión. Gratis, sin registro.',
    canonical: 'https://calzix.com/presion-hidrostatica',
  },
  'frecuencia-onda': {
    title: 'Calculadora de Frecuencia de Onda — Calzix',
    description: 'Calcula frecuencia, longitud de onda o velocidad: v = f × λ. Resuelve problemas de ondas al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/frecuencia-onda',
  },
  'calor-especifico': {
    title: 'Calculadora de Calor Específico — Calzix',
    description: 'Calcula energía térmica Q = mcΔT. Encuentra masa, calor o temperatura. Gratis, sin registro.',
    canonical: 'https://calzix.com/calor-especifico',
  },
  'calculadora-ph': {
    title: 'Calculadora de pH — Calzix',
    description: 'Calcula pH a partir de concentración de H⁺. Clasifica ácidos, bases y neutros. Gratis, sin registro.',
    canonical: 'https://calzix.com/calculadora-ph',
  },
  'mol-masa-molar': {
    title: 'Calculadora de Mol y Masa Molar — Calzix',
    description: 'Convierte moles a gramos. Calcula masa molar y cantidad de sustancia. Gratis, sin registro.',
    canonical: 'https://calzix.com/mol-masa-molar',
  },
  'gas-ideal': {
    title: 'Calculadora de Gas Ideal — Calzix',
    description: 'Resuelve PV = nRT. Calcula presión, volumen, moles o temperatura de gases. Gratis, sin registro.',
    canonical: 'https://calzix.com/gas-ideal',
  },
  'formula-molecular': {
    title: 'Calculadora de Fórmula Molecular — Calzix',
    description: 'Determina fórmula molecular a partir de composición porcentual. Calcula proporciones atómicas. Gratis, sin registro.',
    canonical: 'https://calzix.com/formula-molecular',
  },
  'diluciones-quimica': {
    title: 'Calculadora de Diluciones Químicas — Calzix',
    description: 'Resuelve diluciones con M₁V₁ = M₂V₂. Calcula molaridad o volumen final. Gratis, sin registro.',
    canonical: 'https://calzix.com/diluciones-quimica',
  },
  'estequiometria': {
    title: 'Calculadora de Estequiometría — Calzix',
    description: 'Calcula moles de reactivos y productos. Resuelve reacciones químicas al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/estequiometria',
  },
  'solucion-concentracion': {
    title: 'Calculadora de Concentración — Calzix',
    description: 'Calcula molariedad, normalidad, PPM. Determina concentración de disoluciones. Gratis, sin registro.',
    canonical: 'https://calzix.com/solucion-concentracion',
  },
  'equilibrio-quimico': {
    title: 'Calculadora de Equilibrio Químico — Calzix',
    description: 'Calcula constante de equilibrio Kc. Determina concentraciones en equilibrio. Gratis, sin registro.',
    canonical: 'https://calzix.com/equilibrio-quimico',
  },
  'numero-oxidacion': {
    title: 'Calculadora de Número de Oxidación — Calzix',
    description: 'Asigna números de oxidación a elementos. Balancea reacciones redox. Gratis, sin registro.',
    canonical: 'https://calzix.com/numero-oxidacion',
  },
  // ── Conversión (nuevas) ──────────────────────────────────────────
  'conversor-potencia': {
    title: 'Conversor de Potencia — Calzix',
    description: 'Convierte W, kW, MW, HP, CV. Transforma entre unidades de potencia al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-potencia',
  },
  'conversor-fuerza': {
    title: 'Conversor de Fuerza — Calzix',
    description: 'Convierte Newton, dina, kgf, lbf. Transforma unidades de fuerza al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-fuerza',
  },
  'conversor-densidad': {
    title: 'Conversor de Densidad — Calzix',
    description: 'Convierte kg/m³, g/cm³, lb/ft³, g/ml. Transforma unidades de densidad al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-densidad',
  },
  'conversor-caudal': {
    title: 'Conversor de Caudal — Calzix',
    description: 'Convierte L/s, m³/h, ft³/s, gal/min. Transforma unidades de flujo volumétrico. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-caudal',
  },
  'conversor-par-motor': {
    title: 'Conversor de Par Motor — Calzix',
    description: 'Convierte N·m, kgf·m, lbf·ft. Transforma unidades de torque al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-par-motor',
  },
  'conversor-eficiencia': {
    title: 'Conversor de Eficiencia — Calzix',
    description: 'Convierte porcentaje, ratio, dB, decibelios. Transforma escalas de eficiencia. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-eficiencia',
  },
  'conversor-frecuencia': {
    title: 'Conversor de Frecuencia — Calzix',
    description: 'Convierte Hz, kHz, MHz, GHz. Transforma unidades de frecuencia al instante. Gratis, sin registro.',
    canonical: 'https://calzix.com/conversor-frecuencia',
  },
  'conversor-iluminacion': {
    title: 'Conversor de Iluminación — Calzix',
    description: 'Convierte lux, foot-candle, lm/m². Transforma unidades de luminancia al instante. Gratis, sin registro.',
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
