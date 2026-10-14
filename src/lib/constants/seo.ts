export const SITE = {
  name: 'Calzix',
  url: 'https://calzix.com',
  description: 'Calculadoras online gratuitas para España: IRPF y nómina, IVA, hipoteca, factura de la luz, notas de la PAU, conversores y más. En euros, con la normativa española y resultados al instante.',
  email: 'codezun@gmail.com',
  twitterHandle: '@calzix',
  // Imagen OG por defecto (home, categorías, blog y legales).
  // Las calculadoras usan la suya: /og/[slug].jpg — ver scripts/generate-og.mjs
  ogImage: 'https://calzix.com/og/default.jpg',
  // Señales de frescura para buscadores y motores de respuesta.
  // Actualizar `dateModified` cuando se revise el contenido del sitio.
  datePublished: '2026-05-01',
  dateModified: '2026-10-14',
  // ── Mercado único: España ───────────────────────────────────────────────
  // Todo el sitio (textos, schema, metaetiquetas, ejemplos y datos) se dirige
  // exclusivamente a España. Ver la sección "Enfoque España" de CLAUDE.md.
  lang: 'es-ES',          // <html lang>, hreflang, inLanguage del schema
  ogLocale: 'es_ES',      // og:locale
  country: 'ES',          // ISO 3166-1 alfa-2 (geo.region, countriesSupported)
  countryName: 'España',
  currency: 'EUR',
  timeZone: 'Europe/Madrid',
} as const;

/**
 * Datos del titular para el aviso legal (art. 10 de la Ley 34/2002, LSSI-CE).
 * La ley exige identificar al responsable del sitio: nombre o razón social,
 * NIF y domicilio (y la inscripción registral si es una sociedad).
 * Mientras un campo esté vacío, el aviso legal no lo muestra.
 */
export const TITULAR: { nombre: string; nif: string; domicilio: string; registro: string } = {
  nombre: '',
  nif: '',
  domicilio: '',
  registro: '',
};

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
}

// Metadata SEO por página — slug como clave
export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Calzix — Calculadoras online gratis para España',
    description: 'Más de 270 calculadoras gratuitas para España: IRPF y nómina 2026, IVA, hipoteca, factura de la luz, finiquito, nota de la PAU y conversores. Sin registro.',
    canonical: 'https://calzix.com',
  },
  privacidad: {
    title: 'Política de privacidad — Calzix',
    description: 'Política de privacidad de Calzix conforme al RGPD y la LOPDGDD: qué datos se tratan, publicidad de terceros y tus derechos.',
    canonical: 'https://calzix.com/privacidad',
  },
  terminos: {
    title: 'Términos de uso — Calzix',
    description: 'Términos y condiciones de uso de Calzix, sitio de calculadoras online gratuitas para España.',
    canonical: 'https://calzix.com/terminos',
  },
  cookies: {
    title: 'Política de cookies — Calzix',
    description: 'Política de cookies de Calzix según el artículo 22.2 de la LSSI-CE: cookies técnicas, publicitarias de terceros y cómo bloquearlas.',
    canonical: 'https://calzix.com/cookies',
  },
  'aviso-legal': {
    title: 'Aviso legal — Calzix',
    description: 'Aviso legal de Calzix conforme a la Ley 34/2002 de servicios de la sociedad de la información (LSSI-CE).',
    canonical: 'https://calzix.com/aviso-legal',
  },
  contacto: {
    title: 'Contacto — Calzix',
    description: 'Contacta con Calzix para sugerencias, errores o nuevas calculadoras.',
    canonical: 'https://calzix.com/contacto',
  },
  // ── Páginas de categoría ─────────────────────────────────────────────────
  matematicas: {
    title: 'Calculadoras de Matemáticas online gratis — Calzix',
    description: 'Calculadoras gratuitas de aritmética, álgebra, geometría, estadística, trigonometría y probabilidad, con ejemplos para ESO, Bachillerato y la PAU.',
    canonical: 'https://calzix.com/matematicas',
  },
  ciencias: {
    title: 'Calculadoras de Física y Química online — Calzix',
    description: 'Calculadoras gratuitas de física y química con fórmulas y ejemplos resueltos para ESO, Bachillerato, la PAU y la universidad en España.',
    canonical: 'https://calzix.com/ciencias',
  },
  conversion: {
    title: 'Conversores de Unidades online gratis — Calzix',
    description: 'Convierte longitud, peso, temperatura, velocidad, área, volumen, energía, presión, tiempo, datos, ángulos y divisas frente al euro. Al instante.',
    canonical: 'https://calzix.com/conversion',
  },
  hogar: {
    title: 'Calculadoras del Hogar en España: hipoteca, luz, obra — Calzix',
    description: 'Calculadoras de hipoteca con Euríbor, gastos de compra de vivienda, factura de la luz y del gas, potencia contratada, pintura, reformas y jardín.',
    canonical: 'https://calzix.com/hogar',
  },
  trabajo: {
    title: 'Calculadoras laborales y fiscales España 2026 — Calzix',
    description: 'Calcula tu nómina neta, la retención de IRPF 2026, el IVA, el finiquito, las horas extra y el coste de un trabajador con la normativa española.',
    canonical: 'https://calzix.com/trabajo',
  },
  educacion: {
    title: 'Calculadoras de Educación: nota de la PAU, becas — Calzix',
    description: 'Calcula tu nota de acceso y de admisión a la universidad (PAU), la nota media, las becas del Ministerio 2026-2027, créditos ECTS y planes de estudio.',
    canonical: 'https://calzix.com/educacion',
  },
  viaje: {
    title: 'Calculadoras de Viaje: gasolina, peajes, horarios — Calzix',
    description: 'Calcula el gasto en gasolina y peajes por España, el tiempo de viaje, la diferencia horaria con Madrid y Canarias, el equipaje y el presupuesto.',
    canonical: 'https://calzix.com/viaje',
  },
  naturaleza: {
    title: 'Calculadoras de Naturaleza y sostenibilidad — Calzix',
    description: 'Calcula tu huella de carbono, el consumo de agua del hogar, el ahorro con placas solares y autoconsumo, y el impacto del reciclaje en España.',
    canonical: 'https://calzix.com/naturaleza',
  },
  ocio: {
    title: 'Calculadoras de Ocio: sueño, suerte, numerología — Calzix',
    description: 'Calculadoras lúdicas de compatibilidad, números para la Primitiva y el Euromillones, numerología, dados, sorteos y ciclos de sueño.',
    canonical: 'https://calzix.com/ocio',
  },
  // ── Matemáticas ──────────────────────────────────────────────────────────
  'calculadora-porcentaje': {
    title: 'Calculadora de Porcentajes online gratis — Calzix',
    description: 'Calcula el % de una cantidad, qué porcentaje representa un valor, aumentos y descuentos. Con ejemplos en euros: IVA del 21 %, rebajas y subidas de sueldo.',
    canonical: 'https://calzix.com/calculadora-porcentaje',
  },
  'ecuacion-lineal': {
    title: 'Calculadora de Ecuaciones de Primer Grado (ax+b=c) — Calzix',
    description: 'Resuelve ecuaciones de primer grado ax + b = c paso a paso y al instante. Muestra el procedimiento completo, ideal para ESO y Bachillerato. Gratis.',
    canonical: 'https://calzix.com/ecuacion-lineal',
  },
  'area-figuras': {
    title: 'Calculadora de Áreas de Figuras Geométricas — Calzix',
    description: 'Calcula el área y el perímetro de cuadrado, rectángulo, círculo, triángulo y trapecio al instante, con las fórmulas. Gratis y sin registro.',
    canonical: 'https://calzix.com/area-figuras',
  },
  'media-mediana-moda': {
    title: 'Calculadora de Media, Mediana y Moda online — Calzix',
    description: 'Calcula media, mediana, moda, mínimo, máximo, rango y desviación típica de cualquier conjunto de datos al instante. Estadística para ESO, Bachillerato y universidad.',
    canonical: 'https://calzix.com/media-mediana-moda',
  },
  'seno-coseno': {
    title: 'Calculadora de Seno, Coseno y Tangente online — Calzix',
    description: 'Calcula seno, coseno, tangente y sus funciones inversas de cualquier ángulo en grados o radianes, con 6 decimales. Trigonometría para Bachillerato y la PAU.',
    canonical: 'https://calzix.com/seno-coseno',
  },
  'probabilidad-simple': {
    title: 'Calculadora de Probabilidad Simple online — Calzix',
    description: 'Calcula la probabilidad de un suceso como fracción, decimal y porcentaje, y la de su contrario. Con ejemplos de dados, cartas y la Primitiva. Gratis.',
    canonical: 'https://calzix.com/probabilidad-simple',
  },
  // ── Ciencias ─────────────────────────────────────────────────────────────
  'velocidad-distancia-tiempo': {
    title: 'Calculadora de Velocidad, Distancia y Tiempo (v = d/t) — Calzix',
    description: 'Despeja velocidad (km/h), distancia (km) o tiempo de v = d/t al instante, con conversión de m/s a km/h. Para Física de ESO y Bachillerato y viajes por España.',
    canonical: 'https://calzix.com/velocidad-distancia-tiempo',
  },
  'concentracion-molar': {
    title: 'Calculadora de Concentración Molar (molaridad) — Calzix',
    description: 'Calcula molaridad (mol/L), moles y volumen de disoluciones con C = n/V y n = m/M paso a paso. Química para Bachillerato, la PAU y la universidad.',
    canonical: 'https://calzix.com/concentracion-molar',
  },
  // ── Conversión ───────────────────────────────────────────────────────────
  'conversor-longitud': {
    title: 'Conversor de Longitud: metros, pies, millas, pulgadas — Calzix',
    description: 'Convierte metros, kilómetros, cm, mm, millas, yardas, pies y pulgadas al instante. Útil para pantallas en pulgadas, obras, deporte y viajes.',
    canonical: 'https://calzix.com/conversor-longitud',
  },
  'conversor-peso': {
    title: 'Conversor de Peso: kg a libras, onzas y gramos — Calzix',
    description: 'Convierte kilogramos, libras, gramos, miligramos, onzas y toneladas al instante. Útil para recetas, compras en tiendas extranjeras, equipaje y deporte.',
    canonical: 'https://calzix.com/conversor-peso',
  },
  'conversor-temperatura': {
    title: 'Conversor de Temperatura: Celsius, Fahrenheit, Kelvin — Calzix',
    description: 'Convierte grados Celsius, Fahrenheit y Kelvin al instante, con las fórmulas explicadas. Para recetas, viajes, meteorología y Física. Gratis.',
    canonical: 'https://calzix.com/conversor-temperatura',
  },
  'conversor-velocidad': {
    title: 'Conversor de Velocidad: km/h a mph, m/s y nudos — Calzix',
    description: 'Convierte km/h, m/s, mph, pies por segundo y nudos al instante. Para conducir en el extranjero, navegación, aviación, meteorología y Física.',
    canonical: 'https://calzix.com/conversor-velocidad',
  },
  'conversor-area': {
    title: 'Conversor de Superficie: m², hectáreas, áreas, acres — Calzix',
    description: 'Convierte metros cuadrados, hectáreas, áreas, km², acres y pies cuadrados. Útil para viviendas, parcelas, fincas rústicas y el Catastro. Gratis.',
    canonical: 'https://calzix.com/conversor-area',
  },
  'conversor-volumen': {
    title: 'Conversor de Volumen: litros, m³, ml, galones — Calzix',
    description: 'Convierte litros, mililitros, metros cúbicos, galones, onzas líquidas, pintas y tazas. Para cocina, depósitos, piscinas y facturas de agua en m³.',
    canonical: 'https://calzix.com/conversor-volumen',
  },
  'conversor-energia': {
    title: 'Conversor de Energía: julios, kWh, kcal, BTU — Calzix',
    description: 'Convierte julios, kilojulios, calorías, kilocalorías, Wh, kWh y BTU al instante. Para la factura de la luz, nutrición, climatización y Física.',
    canonical: 'https://calzix.com/conversor-energia',
  },
  'conversor-presion': {
    title: 'Conversor de Presión: bar, atm, PSI, pascal, mmHg — Calzix',
    description: 'Convierte pascales, bares, atmósferas, PSI, mmHg y kPa al instante. Para la presión de los neumáticos, calderas, tensión arterial y Física.',
    canonical: 'https://calzix.com/conversor-presion',
  },
  'conversor-tiempo': {
    title: 'Conversor de Tiempo: segundos, horas, días, años — Calzix',
    description: 'Convierte milisegundos, segundos, minutos, horas, días, semanas, meses y años al instante. Para jornadas laborales, proyectos, programación y Física.',
    canonical: 'https://calzix.com/conversor-tiempo',
  },
  'conversor-datos': {
    title: 'Conversor de Datos: GB a MB, TB a GB, bytes — Calzix',
    description: 'Convierte bytes, KB, MB, GB y TB, y sus equivalentes binarios (KiB, MiB, GiB), al instante. Para almacenamiento, tarifas de datos móviles y fibra.',
    canonical: 'https://calzix.com/conversor-datos',
  },
  'conversor-angulos': {
    title: 'Conversor de Ángulos: grados a radianes y gradianes — Calzix',
    description: 'Convierte grados, radianes, gradianes y vueltas al instante. Para trigonometría de Bachillerato y la PAU, topografía, programación y Física.',
    canonical: 'https://calzix.com/conversor-angulos',
  },
  'conversor-monedas': {
    title: 'Conversor de Monedas: euro a dólar, libra y más — Calzix',
    description: 'Convierte euros a dólares, libras, francos suizos, yenes y otras divisas con tipos orientativos frente al euro. Para viajes, compras online y transferencias.',
    canonical: 'https://calzix.com/conversor-monedas',
  },
  // ── Hogar ────────────────────────────────────────────────────────────────
  'materiales-construccion': {
    title: 'Calculadora de Ladrillos, Cemento y Arena por m² — Calzix',
    description: 'Calcula ladrillos, sacos de cemento y arena para levantar tabiques y muros por metro cuadrado. Para obras y reformas en España. Gratis.',
    canonical: 'https://calzix.com/materiales-construccion',
  },
  'calculadora-pintura': {
    title: 'Calculadora de Pintura: litros por habitación — Calzix',
    description: 'Calcula los litros de pintura para paredes según medidas, número de manos y rendimiento del bote. Para pisos y casas en España. Gratis.',
    canonical: 'https://calzix.com/calculadora-pintura',
  },
  'consumo-electrico': {
    title: 'Calculadora de Consumo Eléctrico: kWh y euros al mes — Calzix',
    description: 'Calcula cuántos kWh gasta cada electrodoméstico y lo que cuesta al día, mes y año con el precio de la luz en España (PVPC o mercado libre).',
    canonical: 'https://calzix.com/consumo-electrico',
  },
  'calculadora-hipoteca': {
    title: 'Calculadora de Hipoteca 2026: cuota con Euríbor — Calzix',
    description: 'Calcula la cuota mensual de tu hipoteca fija, variable o mixta en España, los intereses totales y el capital pendiente. Con el Euríbor actualizado.',
    canonical: 'https://calzix.com/calculadora-hipoteca',
  },
  'ahorro-energetico': {
    title: 'Calculadora de Ahorro Energético: kWh, euros y CO₂ — Calzix',
    description: 'Calcula el ahorro en kWh, euros y CO₂ al mejorar la eficiencia energética de tu vivienda, con el precio de la luz en España. Gratis.',
    canonical: 'https://calzix.com/ahorro-energetico',
  },
  'area-jardin': {
    title: 'Calculadora de Área del Jardín: m², plantas y riego — Calzix',
    description: 'Calcula la superficie de tu jardín (rectángulo, círculo o triángulo), las plantas necesarias y el agua de riego semanal según el clima español.',
    canonical: 'https://calzix.com/area-jardin',
  },
  // ── Trabajo ──────────────────────────────────────────────────────────────
  'calculadora-iva': {
    title: 'Calculadora de IVA 2026: añadir o quitar el 21 %, 10 % y 4 % — Calzix',
    description: 'Añade o quita el IVA de cualquier importe con los tipos de España: 21 % general, 10 % reducido y 4 % superreducido. Base imponible, cuota y total al instante.',
    canonical: 'https://calzix.com/calculadora-iva',
  },
  'calculadora-descuento': {
    title: 'Calculadora de Descuentos y Rebajas: precio final — Calzix',
    description: 'Calcula el precio final y el ahorro de un descuento en porcentaje, con o sin IVA. Para rebajas, Black Friday y compras en España. Gratis.',
    canonical: 'https://calzix.com/calculadora-descuento',
  },
  'calculadora-nomina': {
    title: 'Calculadora de Nómina 2026: sueldo neto en España — Calzix',
    description: 'Pasa tu sueldo bruto a neto con la retención de IRPF 2026 y las cotizaciones a la Seguridad Social (6,50 %). Neto mensual en 12 o 14 pagas.',
    canonical: 'https://calzix.com/calculadora-nomina',
  },
  'calculadora-productividad': {
    title: 'Calculadora de Productividad: tareas por hora — Calzix',
    description: 'Mide tu productividad: tasa de tareas completadas, tareas por hora y tiempo medio por tarea. Para teletrabajo, autónomos y equipos. Gratis.',
    canonical: 'https://calzix.com/calculadora-productividad',
  },
  'calculadora-propina': {
    title: 'Calculadora de Propina: 5 %, 10 % y 15 % al instante — Calzix',
    description: '¿Cuánta propina dejar en España? Calcula la propina, el total y cuánto paga cada comensal al dividir la cuenta. Con tabla de referencia rápida.',
    canonical: 'https://calzix.com/calculadora-propina',
  },
  // ── Educación ────────────────────────────────────────────────────────────
  'nota-media': {
    title: 'Calculadora de Nota Media ponderada por créditos — Calzix',
    description: 'Calcula tu nota media simple y ponderada por créditos ECTS, en la escala española de 0 a 10. Para la universidad, el TFG, becas y másteres.',
    canonical: 'https://calzix.com/nota-media',
  },
  'calculadora-beca': {
    title: 'Calculadora de Nota para Becas del Ministerio 2026-27 — Calzix',
    description: 'Comprueba si tu nota cumple los requisitos de la beca general del Ministerio de Educación 2026-2027: matrícula, cuantías y excelencia académica.',
    canonical: 'https://calzix.com/calculadora-beca',
  },
  'tiempo-estudio': {
    title: 'Calculadora de Tiempo de Estudio por Temas — Calzix',
    description: 'Calcula cuántas horas necesitas para estudiar según temas, páginas y velocidad de lectura, y los días a 2, 4 o 6 horas. Para exámenes y oposiciones.',
    canonical: 'https://calzix.com/tiempo-estudio',
  },
  'velocidad-lectura': {
    title: 'Calculadora de Velocidad de Lectura (palabras por minuto) — Calzix',
    description: 'Mide tu velocidad lectora en palabras por minuto y estima cuánto tardas en terminar un libro. Clasificación: lenta, media o rápida. Gratis.',
    canonical: 'https://calzix.com/velocidad-lectura',
  },
  // ── Viaje ────────────────────────────────────────────────────────────────
  'consumo-combustible': {
    title: 'Calculadora de Gasolina por Trayecto: litros y euros — Calzix',
    description: 'Calcula los litros de gasolina o diésel y el coste de un viaje por España según km, consumo (l/100 km) y precio por litro. Divide entre ocupantes.',
    canonical: 'https://calzix.com/consumo-combustible',
  },
  'calculadora-distancia': {
    title: 'Calculadora de Tiempo de Viaje por Distancia — Calzix',
    description: 'Calcula el tiempo de conducción según los km y la velocidad media, con paradas y hora de llegada. Para viajes por carretera en España.',
    canonical: 'https://calzix.com/calculadora-distancia',
  },
  'diferencia-horaria': {
    title: 'Diferencia Horaria con España: hora en Madrid y Canarias — Calzix',
    description: 'Calcula la diferencia horaria entre España (Península, Baleares y Canarias) y cualquier país, con el horario de verano. Hora actual en tiempo real.',
    canonical: 'https://calzix.com/diferencia-horaria',
  },
  'peso-equipaje': {
    title: 'Calculadora de Peso del Equipaje de Mano y Bodega — Calzix',
    description: 'Comprueba si tu maleta supera el límite de peso de la aerolínea: suma cada artículo, elige el límite (10, 20, 23 o 32 kg) y mira el margen. Gratis.',
    canonical: 'https://calzix.com/peso-equipaje',
  },
  'coste-viaje': {
    title: 'Calculadora del Coste Total de un Viaje — Calzix',
    description: 'Suma los gastos del viaje: transporte, alojamiento, comida, actividades y extras. Coste total y por persona en euros, para escapadas y vacaciones.',
    canonical: 'https://calzix.com/coste-viaje',
  },
  // ── Naturaleza ───────────────────────────────────────────────────────────
  'huella-carbono': {
    title: 'Calculadora de Huella de Carbono personal anual — Calzix',
    description: 'Calcula tu huella de CO₂ anual por coche, vuelos, electricidad y dieta con factores de emisión de España, y los árboles para compensarla. Gratis.',
    canonical: 'https://calzix.com/huella-carbono',
  },
  'consumo-agua': {
    title: 'Calculadora de Consumo de Agua del Hogar — Calzix',
    description: 'Calcula los litros diarios y el coste mensual del agua en casa: ducha, lavadora, inodoro y riego. Precio por m³ en euros y media española. Gratis.',
    canonical: 'https://calzix.com/consumo-agua',
  },
  'ahorro-solar': {
    title: 'Calculadora de Ahorro con Placas Solares en España — Calzix',
    description: 'Calcula el ahorro mensual y anual de una instalación fotovoltaica según potencia, horas de sol de tu provincia y precio de la luz en España.',
    canonical: 'https://calzix.com/ahorro-solar',
  },
  'calculadora-reciclaje': {
    title: 'Calculadora de Impacto del Reciclaje por Material — Calzix',
    description: 'Calcula el CO₂ evitado al reciclar papel, envases, vidrio, metales y orgánico cada mes, contenedor a contenedor. Con árboles equivalentes.',
    canonical: 'https://calzix.com/calculadora-reciclaje',
  },
  // ── Ocio ─────────────────────────────────────────────────────────────────
  'test-compatibilidad': {
    title: 'Test de Compatibilidad de Pareja por Nombres — Calzix',
    description: 'Calcula el porcentaje de compatibilidad de pareja a partir de vuestros nombres. Juego para San Valentín y San Juan. Gratis y sin registro.',
    canonical: 'https://calzix.com/test-compatibilidad',
  },
  'numeros-suerte': {
    title: 'Generador de Números para la Primitiva y la Bonoloto — Calzix',
    description: 'Genera 6 números del 1 al 49 y el reintegro para la Primitiva o la Bonoloto con aleatoriedad criptográfica. Gratis y sin registro.',
    canonical: 'https://calzix.com/numeros-suerte',
  },
  'numero-numerologia': {
    title: 'Calculadora de Numerología: número de vida y destino — Calzix',
    description: 'Calcula tu número de camino de vida y tu número de expresión con la numerología pitagórica. Lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/numero-numerologia',
  },
  'calculadora-sueno': {
    title: 'Calculadora de Sueño: hora ideal para despertar — Calzix',
    description: 'Calcula la hora ideal para despertarte según ciclos de sueño de 90 minutos, o a qué hora acostarte. Basada en las recomendaciones del sueño. Gratis.',
    canonical: 'https://calzix.com/calculadora-sueno',
  },
  // ── Matemáticas (nuevas) ─────────────────────────────────────────────────
  'calculadora-factorial': {
    title: 'Calculadora de Factorial (n!) online — Calzix',
    description: 'Calcula el factorial exacto de cualquier número entero de 0 a 170, sin redondeos. Ideal para combinatoria, permutaciones y probabilidad. Gratis.',
    canonical: 'https://calzix.com/calculadora-factorial',
  },
  'potencias-raices': {
    title: 'Calculadora de Potencias y Raíces online — Calzix',
    description: 'Calcula potencias (base^exponente) y raíces n-ésimas de cualquier número real, con decimales y negativos. Resultado exacto, gratis y sin registro.',
    canonical: 'https://calzix.com/potencias-raices',
  },
  'mcm-mcd': {
    title: 'Calculadora de MCM y MCD: mínimo común múltiplo — Calzix',
    description: 'Calcula el mínimo común múltiplo (m.c.m.) y el máximo común divisor (m.c.d.) de dos números al instante, con ejemplos resueltos. Ideal para fracciones.',
    canonical: 'https://calzix.com/mcm-mcd',
  },
  'numero-primo': {
    title: 'Comprobar si un Número es Primo y Factorizar — Calzix',
    description: 'Comprueba si un número hasta 1.000.000.000 es primo o compuesto y obtén su descomposición en factores primos. Rápido, preciso y gratis.',
    canonical: 'https://calzix.com/numero-primo',
  },
  'sistema-ecuaciones': {
    title: 'Resolver Sistemas de Ecuaciones 2×2 online — Calzix',
    description: 'Resuelve sistemas de dos ecuaciones lineales con dos incógnitas por la regla de Cramer. Obtén x e y al instante con todos los pasos. Gratis.',
    canonical: 'https://calzix.com/sistema-ecuaciones',
  },
  'funcion-cuadratica': {
    title: 'Calculadora de Ecuaciones de Segundo Grado ax²+bx+c — Calzix',
    description: 'Calcula las raíces, el discriminante y el vértice de cualquier parábola. Indica si tiene soluciones reales o complejas. Fórmula paso a paso. Gratis.',
    canonical: 'https://calzix.com/funcion-cuadratica',
  },
  'perimetro-figuras': {
    title: 'Calculadora de Perímetro de Figuras Geométricas — Calzix',
    description: 'Calcula el perímetro de círculo, cuadrado, rectángulo, triángulo, rombo, pentágono y hexágono al instante, con fórmulas y ejemplos en metros y centímetros.',
    canonical: 'https://calzix.com/perimetro-figuras',
  },
  'volumen-solidos': {
    title: 'Calculadora de Volumen de Cuerpos Geométricos — Calzix',
    description: 'Calcula el volumen de cubo, esfera, cilindro, cono, prisma y pirámide al instante, en m³ y en litros. Para ESO, Bachillerato, obras y depósitos.',
    canonical: 'https://calzix.com/volumen-solidos',
  },
  'teorema-pitagoras': {
    title: 'Calculadora del Teorema de Pitágoras online — Calzix',
    description: 'Calcula la hipotenusa o un cateto de un triángulo rectángulo con a² + b² = c², con el procedimiento completo. Para ESO, obras y bricolaje. Gratis.',
    canonical: 'https://calzix.com/teorema-pitagoras',
  },
  'varianza-desviacion': {
    title: 'Calculadora de Varianza y Desviación Típica online — Calzix',
    description: 'Calcula la varianza y la desviación típica de una población (÷n) o de una muestra (÷n−1) al instante, con fórmulas claras. Gratis.',
    canonical: 'https://calzix.com/varianza-desviacion',
  },
  'correlacion-datos': {
    title: 'Calculadora de Correlación de Pearson online — Calzix',
    description: 'Calcula el coeficiente de correlación de Pearson (r) entre dos series de datos e interpreta si la relación es positiva, negativa, fuerte o débil. Gratis.',
    canonical: 'https://calzix.com/correlacion-datos',
  },
  'permutaciones-combinaciones': {
    title: 'Calculadora de Permutaciones y Combinaciones — Calzix',
    description: 'Calcula permutaciones P(n,r) y combinaciones C(n,r) al instante. Combinatoria aplicada a la Primitiva, el Euromillones, sorteos y contraseñas.',
    canonical: 'https://calzix.com/permutaciones-combinaciones',
  },
  'distribucion-normal': {
    title: 'Calculadora de Distribución Normal y puntuación Z — Calzix',
    description: 'Calcula la puntuación Z y las probabilidades P(X ≤ x) y P(X > x) de cualquier distribución normal, incluida la N(0,1). Para Bachillerato y universidad.',
    canonical: 'https://calzix.com/distribucion-normal',
  },
  'regla-tres': {
    title: 'Calculadora de Regla de Tres Simple e Inversa — Calzix',
    description: 'Resuelve reglas de tres directas e inversas en segundos: introduce tres valores y obtén el cuarto. Para recetas, escalas, mezclas y precios. Gratis.',
    canonical: 'https://calzix.com/regla-tres',
  },
  // ── Ciencias (nuevas) ───────────────────────────────────────────
  'segunda-ley-newton': {
    title: 'Calculadora de la Segunda Ley de Newton (F = m·a) — Calzix',
    description: 'Calcula fuerza (N), masa (kg) o aceleración (m/s²) con F = m·a al instante y paso a paso. Física de ESO, Bachillerato y la PAU. Gratis.',
    canonical: 'https://calzix.com/segunda-ley-newton',
  },
  'energia-cinetica': {
    title: 'Calculadora de Energía Cinética (Ec = ½mv²) — Calzix',
    description: 'Calcula la energía cinética al instante: introduce la masa en kg y la velocidad en m/s y obtén el resultado en julios y kJ. Física de Bachillerato.',
    canonical: 'https://calzix.com/energia-cinetica',
  },
  'energia-potencial': {
    title: 'Calculadora de Energía Potencial Gravitatoria (Ep = mgh) — Calzix',
    description: 'Calcula la energía potencial gravitatoria Ep = m·g·h al instante, con g = 9,8 m/s² o configurable. Física de ESO, Bachillerato y la PAU.',
    canonical: 'https://calzix.com/energia-potencial',
  },
  'ley-ohm': {
    title: 'Calculadora Ley de Ohm: fórmulas y tabla (V = I × R) — Calzix',
    description: 'Calcula tensión, intensidad o resistencia con la ley de Ohm al instante. Incluye la tabla de fórmulas V = I × R, I = V/R y R = V/I con ejemplos a 230 V.',
    canonical: 'https://calzix.com/ley-ohm',
  },
  'potencia-electrica': {
    title: 'Calculadora de Potencia Eléctrica (P = V × I) — Calzix',
    description: 'Calcula potencia (W, kW), tensión (V) o intensidad (A) con P = V × I al instante. Útil para electrodomésticos a 230 V y la potencia contratada.',
    canonical: 'https://calzix.com/potencia-electrica',
  },
  'caida-libre': {
    title: 'Calculadora de Caída Libre: tiempo, velocidad y altura — Calzix',
    description: 'Calcula tiempo, velocidad y altura en caída libre con g configurable y las fórmulas h = ½gt² y v = gt. Para problemas de Física de Bachillerato.',
    canonical: 'https://calzix.com/caida-libre',
  },
  'presion-hidrostatica': {
    title: 'Calculadora de Presión Hidrostática (P = ρgh) — Calzix',
    description: 'Calcula la presión de un fluido con P = ρ·g·h al instante, en Pa, kPa y atm. Densidades del agua dulce y del mar. Física e ingeniería. Gratis.',
    canonical: 'https://calzix.com/presion-hidrostatica',
  },
  'frecuencia-onda': {
    title: 'Calculadora de Frecuencia y Longitud de Onda — Calzix',
    description: 'Calcula velocidad (m/s), frecuencia (Hz) o longitud de onda (m) con v = f·λ al instante. Ondas de sonido, luz y radio. Física de Bachillerato.',
    canonical: 'https://calzix.com/frecuencia-onda',
  },
  'calor-especifico': {
    title: 'Calculadora de Calor Específico (Q = m·c·ΔT) — Calzix',
    description: 'Calcula el calor absorbido, la masa, el calor específico o la variación de temperatura con Q = m·c·ΔT. Con tabla de calores específicos. Gratis.',
    canonical: 'https://calzix.com/calor-especifico',
  },
  'calculadora-ph': {
    title: 'Calculadora de pH y pOH online — Calzix',
    description: 'Calcula pH, pOH y las concentraciones de H⁺ y OH⁻, y clasifica la disolución en ácida, neutra o básica. Química de Bachillerato y la PAU.',
    canonical: 'https://calzix.com/calculadora-ph',
  },
  'mol-masa-molar': {
    title: 'Calculadora de Moles y Masa Molar (n = m/M) — Calzix',
    description: 'Convierte moles a gramos y gramos a moles con n = m/M, y obtén la masa molar de compuestos al instante. Química de Bachillerato y la PAU.',
    canonical: 'https://calzix.com/mol-masa-molar',
  },
  'gas-ideal': {
    title: 'Calculadora de Gas Ideal PV = nRT online — Calzix',
    description: 'Despeja P, V, n o T de la ecuación de los gases ideales PV = nRT, con R = 0,082 atm·L/(mol·K) o 8,314 J/(mol·K). Física y Química de Bachillerato.',
    canonical: 'https://calzix.com/gas-ideal',
  },
  'formula-molecular': {
    title: 'Calculadora de Fórmula Molecular y Empírica — Calzix',
    description: 'Obtén la fórmula molecular a partir de la empírica y la masa molecular, con el factor n automático. Química de Bachillerato y universidad. Gratis.',
    canonical: 'https://calzix.com/formula-molecular',
  },
  'diluciones-quimica': {
    title: 'Calculadora de Diluciones C₁V₁ = C₂V₂ online — Calzix',
    description: 'Resuelve diluciones calculando C₁, C₂, V₁ o V₂ con la ecuación de dilución. Para prácticas de laboratorio y Química de Bachillerato. Gratis.',
    canonical: 'https://calzix.com/diluciones-quimica',
  },
  'estequiometria': {
    title: 'Calculadora de Estequiometría online — Calzix',
    description: 'Calcula moles y masa de productos y reactivos en reacciones químicas a partir de los coeficientes estequiométricos. Química de Bachillerato y la PAU.',
    canonical: 'https://calzix.com/estequiometria',
  },
  'solucion-concentracion': {
    title: 'Calculadora de Concentración de Disoluciones — Calzix',
    description: 'Calcula la molaridad (M), el porcentaje en masa (% m/m) y las ppm de una disolución al instante. Química analítica y de Bachillerato. Gratis.',
    canonical: 'https://calzix.com/solucion-concentracion',
  },
  'equilibrio-quimico': {
    title: 'Calculadora de Equilibrio Químico (Kc) online — Calzix',
    description: 'Calcula la constante de equilibrio Kc de aA + bB ⇌ cC + dD e indica si se favorecen reactivos o productos. Química de 2.º de Bachillerato.',
    canonical: 'https://calzix.com/equilibrio-quimico',
  },
  'numero-oxidacion': {
    title: 'Calculadora de Números de Oxidación online — Calzix',
    description: 'Consulta las reglas de los números de oxidación, con excepciones y ejemplos de compuestos. Para formulación, redox y Química de Bachillerato.',
    canonical: 'https://calzix.com/numero-oxidacion',
  },
  // ── Conversión (nuevas) ──────────────────────────────────────────
  'conversor-potencia': {
    title: 'Conversor de Potencia: vatios, kW, CV, hp y BTU/h — Calzix',
    description: 'Convierte vatios, kilovatios, caballos de vapor (CV), hp, kcal/h y BTU/h al instante. Para coches, motores y aires acondicionados. Gratis.',
    canonical: 'https://calzix.com/conversor-potencia',
  },
  'conversor-fuerza': {
    title: 'Conversor de Fuerza: newton, kgf, kN, lbf y dinas — Calzix',
    description: 'Convierte newtons, kilonewtons, kilopondios (kgf), libras-fuerza y dinas al instante. Para Física, mecánica e ingeniería estructural. Gratis.',
    canonical: 'https://calzix.com/conversor-fuerza',
  },
  'conversor-densidad': {
    title: 'Conversor de Densidad: kg/m³, g/cm³, g/L y lb/ft³ — Calzix',
    description: 'Convierte kg/m³, g/cm³, g/L, kg/L, lb/ft³ y lb/in³ al instante. Para Física, Química, materiales y construcción. Gratis.',
    canonical: 'https://calzix.com/conversor-densidad',
  },
  'conversor-caudal': {
    title: 'Conversor de Caudal: L/s, m³/h, L/min y gal/min — Calzix',
    description: 'Convierte L/s, m³/s, m³/h, L/min, galones/min y ft³/s al instante. Para fontanería, riego, bombas, piscinas e hidráulica. Gratis.',
    canonical: 'https://calzix.com/conversor-caudal',
  },
  'conversor-par-motor': {
    title: 'Conversor de Par Motor: N·m, kgf·m y lbf·ft — Calzix',
    description: 'Convierte newton·metro, kgf·m, kgf·cm y lbf·ft al instante. Para fichas técnicas de coches, manuales de taller y llaves dinamométricas.',
    canonical: 'https://calzix.com/conversor-par-motor',
  },
  'conversor-eficiencia': {
    title: 'Conversor de Consumo: l/100 km a km/l y mpg — Calzix',
    description: 'Convierte litros a los 100 km, km por litro y millas por galón (EE. UU. y Reino Unido). Compara el consumo de coches con la etiqueta española.',
    canonical: 'https://calzix.com/conversor-eficiencia',
  },
  'conversor-frecuencia': {
    title: 'Conversor de Frecuencia: Hz, kHz, MHz, GHz y RPM — Calzix',
    description: 'Convierte hercios, kilohercios, megahercios, gigahercios, RPM y rad/s al instante. Para electrónica, wifi y 5G, motores y Física. Gratis.',
    canonical: 'https://calzix.com/conversor-frecuencia',
  },
  'conversor-iluminacion': {
    title: 'Conversor de Iluminancia: lux, klux y pie-candela — Calzix',
    description: 'Convierte lux, kilolux, pie-candela y fot al instante. Para iluminación de viviendas y oficinas según la norma UNE-EN 12464-1 y fotografía.',
    canonical: 'https://calzix.com/conversor-iluminacion',
  },
  // ── Hogar (nuevas) ──────────────────────────────────────────────
  'presupuesto-obra': {
    title: 'Calculadora de Presupuesto de Reforma en España — Calzix',
    description: 'Estima el coste de una reforma integral, de baño, cocina, pintura o suelos por m², con precios orientativos en España y el IVA aplicable.',
    canonical: 'https://calzix.com/presupuesto-obra',
  },
  'cemento-mortero': {
    title: 'Calculadora de Cemento y Mortero por m³ — Calzix',
    description: 'Calcula cemento, arena, grava y agua para mortero 1:3 y hormigón 1:2:4 por volumen, en sacos de 25 kg. Para obras y reformas en España.',
    canonical: 'https://calzix.com/cemento-mortero',
  },
  'baldosas-suelo': {
    title: 'Calculadora de Baldosas y Azulejos con merma — Calzix',
    description: 'Calcula cuántas baldosas o azulejos necesitas para cualquier suelo o pared, con porcentaje de merma configurable y cajas por m². Gratis.',
    canonical: 'https://calzix.com/baldosas-suelo',
  },
  'pintura-techos': {
    title: 'Calculadora de Pintura para Techos: litros por m² — Calzix',
    description: 'Calcula los litros de pintura plástica para techos según la superficie, el número de manos y el rendimiento real del bote. Gratis.',
    canonical: 'https://calzix.com/pintura-techos',
  },
  'pintura-exterior': {
    title: 'Calculadora de Pintura para Fachadas y Exteriores — Calzix',
    description: 'Calcula la pintura para fachadas y muros exteriores descontando ventanas y puertas, con número de manos y rendimiento. Para casas y comunidades.',
    canonical: 'https://calzix.com/pintura-exterior',
  },
  'circuito-electrico': {
    title: 'Calculadora de Circuitos en Serie y Paralelo — Calzix',
    description: 'Calcula la resistencia total, la tensión y la intensidad en circuitos en serie y en paralelo con la ley de Ohm. Para Tecnología y Física.',
    canonical: 'https://calzix.com/circuito-electrico',
  },
  'cable-electrico': {
    title: 'Calculadora de Sección de Cable (mm²) según el REBT — Calzix',
    description: 'Calcula la sección mínima de cable de cobre (1,5 a 70 mm²) para instalaciones monofásicas a 230 V según potencia, longitud y caída de tensión.',
    canonical: 'https://calzix.com/cable-electrico',
  },
  'instalacion-solar-hogar': {
    title: 'Calculadora de Placas Solares para Casa: kWp y amortización — Calzix',
    description: 'Calcula cuántas placas necesitas, la potencia en kWp, el ahorro anual y la amortización según tu consumo y las horas de sol de tu zona de España.',
    canonical: 'https://calzix.com/instalacion-solar-hogar',
  },
  'amortizacion-hipoteca': {
    title: 'Calculadora de Amortización de Hipoteca y cuadro — Calzix',
    description: 'Calcula la cuota, los intereses y el capital amortizado de tu hipoteca con el sistema francés, el más usado por los bancos en España. Gratis.',
    canonical: 'https://calzix.com/amortizacion-hipoteca',
  },
  'alquiler-vs-compra': {
    title: 'Calculadora Alquilar o Comprar Vivienda en España — Calzix',
    description: 'Compara el coste total de alquilar y de comprar una vivienda a 20 o 30 años: entrada, gastos e impuestos, cuota de la hipoteca y renta mensual.',
    canonical: 'https://calzix.com/alquiler-vs-compra',
  },
  'factura-gas': {
    title: 'Calculadora de la Factura del Gas: TUR y mercado libre — Calzix',
    description: 'Calcula tu factura de gas natural con término fijo, término variable por kWh, impuesto de hidrocarburos e IVA. Con los precios de la TUR 2026.',
    canonical: 'https://calzix.com/factura-gas',
  },
  'consumo-agua-hogar': {
    title: 'Calculadora de Consumo de Agua en Casa: litros al día — Calzix',
    description: 'Estima el consumo diario, mensual y anual de agua de tu hogar (duchas, cisterna, lavavajillas y lavadora) y compáralo con la media española.',
    canonical: 'https://calzix.com/consumo-agua-hogar',
  },
  'riego-jardin': {
    title: 'Calculadora de Riego del Jardín: litros por sesión — Calzix',
    description: 'Calcula los litros de agua para regar tu jardín según tipo de planta, superficie en m² y riegos por semana, adaptado al clima de España.',
    canonical: 'https://calzix.com/riego-jardin',
  },
  'fertilizante-jardin': {
    title: 'Calculadora de Abono para el Jardín: gramos por m² — Calzix',
    description: 'Calcula la dosis de abono o fertilizante (g/m²) según el cultivo y la superficie: césped, huerto, frutales, flores y arbustos. Gratis.',
    canonical: 'https://calzix.com/fertilizante-jardin',
  },
  // ── Trabajo (nuevas) ─────────────────────────────────────────────
  'precio-hora': {
    title: 'Calculadora de Precio por Hora para Autónomos — Calzix',
    description: 'Calcula tu tarifa por hora y por día a partir de los ingresos que quieres, las horas y los días laborables. Para autónomos y freelance en España.',
    canonical: 'https://calzix.com/precio-hora',
  },
  'margen-beneficio': {
    title: 'Calculadora de Margen de Beneficio: precio y coste — Calzix',
    description: 'Calcula el margen de beneficio, el precio de venta o el coste a partir de dos datos, con y sin IVA. Para pymes, comercios y autónomos. Gratis.',
    canonical: 'https://calzix.com/margen-beneficio',
  },
  'punto-equilibrio': {
    title: 'Calculadora de Punto de Equilibrio (umbral de rentabilidad) — Calzix',
    description: 'Calcula las unidades y las ventas mínimas para cubrir costes fijos y variables. Herramienta esencial para emprendedores, autónomos y pymes.',
    canonical: 'https://calzix.com/punto-equilibrio',
  },
  'rentabilidad-roi': {
    title: 'Calculadora de ROI y Rentabilidad de una Inversión — Calzix',
    description: 'Calcula el ROI total y anualizado de cualquier inversión o proyecto. Compara con letras del Tesoro y depósitos y ten en cuenta la fiscalidad en el IRPF.',
    canonical: 'https://calzix.com/rentabilidad-roi',
  },
  'precio-coste-mas': {
    title: 'Calculadora de Precio con Markup (coste más margen) — Calzix',
    description: 'Calcula el precio de venta sumando un porcentaje de markup al coste y obtén el margen real y el beneficio. Para comercios y autónomos. Gratis.',
    canonical: 'https://calzix.com/precio-coste-mas',
  },
  'descuento-volumen': {
    title: 'Calculadora de Descuento por Volumen y Rappel — Calzix',
    description: 'Calcula descuentos por cantidad y precios escalonados: del 5 % desde 10 unidades al 20 % en grandes pedidos. Para mayoristas y distribuidores.',
    canonical: 'https://calzix.com/descuento-volumen',
  },
  'precio-original-descuento': {
    title: 'Calculadora del Precio Original antes del Descuento — Calzix',
    description: 'Calcula el precio original a partir del precio rebajado y el porcentaje de descuento, y cuánto ahorras realmente. Para rebajas y Black Friday.',
    canonical: 'https://calzix.com/precio-original-descuento',
  },
  'irpf-retencion': {
    title: 'Calculadora IRPF 2026: retención en nómina en España — Calzix',
    description: 'Calcula tu tipo de retención de IRPF 2026 con el algoritmo de la Agencia Tributaria: reducción por trabajo, mínimo personal e hijos. Gratis.',
    canonical: 'https://calzix.com/irpf-retencion',
  },
  'finiquito': {
    title: 'Calculadora de Finiquito 2026: vacaciones y pagas extra — Calzix',
    description: 'Calcula tu finiquito en España: salario de los días trabajados, vacaciones no disfrutadas, pagas extra proporcionales e indemnización por despido.',
    canonical: 'https://calzix.com/finiquito',
  },
  'vacaciones-proporcionales': {
    title: 'Calculadora de Vacaciones Proporcionales (30 días naturales) — Calzix',
    description: 'Calcula los días de vacaciones que te corresponden según el tiempo trabajado: 30 días naturales al año (2,5 por mes) según el Estatuto de los Trabajadores.',
    canonical: 'https://calzix.com/vacaciones-proporcionales',
  },
  'horas-extra': {
    title: 'Calculadora de Horas Extra en España: precio y límite — Calzix',
    description: 'Calcula el valor de tus horas extraordinarias según el salario y el recargo de tu convenio, con el límite legal de 80 horas al año del Estatuto.',
    canonical: 'https://calzix.com/horas-extra',
  },
  'pomodoro': {
    title: 'Calculadora de la Técnica Pomodoro: sesiones y descansos — Calzix',
    description: 'Planifica tu jornada con la técnica Pomodoro: cuántos pomodoros necesitas, bloques y descansos. Para teletrabajo, estudio y oposiciones.',
    canonical: 'https://calzix.com/pomodoro',
  },
  'coste-reunion': {
    title: 'Calculadora del Coste de una Reunión — Calzix',
    description: 'Calcula lo que cuesta una reunión según los asistentes, su salario por hora y la duración, incluido el coste de empresa. Para empresas en España.',
    canonical: 'https://calzix.com/coste-reunion',
  },
  'propina-grupo': {
    title: 'Calculadora de Propina para Grupos: dividir la cuenta — Calzix',
    description: 'Divide la cuenta y la propina a partes iguales entre varios comensales. Elige el porcentaje y calcula lo que paga cada uno. Gratis.',
    canonical: 'https://calzix.com/propina-grupo',
  },
  'propina-porcentaje': {
    title: 'Calculadora de Propina por Porcentaje — Calzix',
    description: 'Calcula la propina exacta aplicando un porcentaje a la cuenta, con atajos del 5, 10, 15 y 20 %. En España es voluntaria y suele rondar el 5-10 %.',
    canonical: 'https://calzix.com/propina-porcentaje',
  },
  // ── Educación (nuevas) ───────────────────────────────────────────
  'nota-necesaria': {
    title: 'Calculadora de Nota Necesaria para Aprobar — Calzix',
    description: 'Calcula qué nota necesitas en el examen final para aprobar con un 5 o llegar a la media que quieres. Para ESO, Bachillerato, FP y universidad.',
    canonical: 'https://calzix.com/nota-necesaria',
  },
  'nota-ponderada': {
    title: 'Calculadora de Nota Ponderada por Porcentajes — Calzix',
    description: 'Calcula tu nota final ponderada según el peso de cada examen, trabajo o práctica. Escala de 0 a 10 de ESO, Bachillerato, FP y universidad.',
    canonical: 'https://calzix.com/nota-ponderada',
  },
  'nota-selectividad': {
    title: 'Calculadora Nota PAU 2026 (Selectividad): acceso y admisión — Calzix',
    description: 'Calcula tu nota de acceso (60 % Bachillerato + 40 % fase general) y la de admisión hasta 14 con las ponderaciones de la fase específica de la PAU.',
    canonical: 'https://calzix.com/nota-selectividad',
  },
  'conversion-notas': {
    title: 'Conversor de Notas: escala española a GPA y otras — Calzix',
    description: 'Convierte notas de la escala española de 0 a 10 a porcentaje, GPA de EE. UU. y otras escalas europeas. Para Erasmus, másteres y convalidaciones.',
    canonical: 'https://calzix.com/conversion-notas',
  },
  'simulador-beca': {
    title: 'Simulador de Beca del Ministerio 2026-2027 — Calzix',
    description: 'Estima si puedes recibir la beca general del Ministerio de Educación 2026-2027 según tu nota y la renta familiar, y qué cuantías te corresponderían.',
    canonical: 'https://calzix.com/simulador-beca',
  },
  'umbral-renta-beca': {
    title: 'Umbrales de Renta Becas 2026-2027: ¿cumples? — Calzix',
    description: 'Comprueba si la renta de tu unidad familiar supera los umbrales 1, 2 y 3 de las becas del Ministerio 2026-2027 (Real Decreto 179/2026).',
    canonical: 'https://calzix.com/umbral-renta-beca',
  },
  'coste-carrera': {
    title: 'Calculadora del Coste de una Carrera Universitaria — Calzix',
    description: 'Estima lo que cuesta estudiar una carrera en España: matrícula por créditos, libros, transporte, alojamiento y manutención, curso a curso.',
    canonical: 'https://calzix.com/coste-carrera',
  },
  'sesion-estudio': {
    title: 'Planificador de Sesiones de Estudio con Descansos — Calzix',
    description: 'Calcula cuántos bloques de concentración y descansos caben en tu tiempo disponible. Para estudiantes de ESO, Bachillerato, universidad y opositores.',
    canonical: 'https://calzix.com/sesion-estudio',
  },
  'aprendizaje-espaciado': {
    title: 'Calculadora de Repaso Espaciado (curva del olvido) — Calzix',
    description: 'Genera tu calendario de repasos según la curva del olvido de Ebbinghaus: +1, +3, +7, +14, +30, +60 y +120 días. Para exámenes y oposiciones.',
    canonical: 'https://calzix.com/aprendizaje-espaciado',
  },
  'horas-idioma': {
    title: 'Calculadora de Horas para Aprender un Idioma (MCER) — Calzix',
    description: 'Calcula cuántas horas y meses necesitas para pasar de A1 a C2 según el Marco Común Europeo. Para inglés, francés o alemán y certificados de la EOI.',
    canonical: 'https://calzix.com/horas-idioma',
  },
  'plan-estudio': {
    title: 'Calculadora de Plan de Estudio Personalizado — Calzix',
    description: 'Calcula las horas diarias que necesitas para repasar todas las asignaturas antes del examen según las semanas y días disponibles. Gratis.',
    canonical: 'https://calzix.com/plan-estudio',
  },
  'palabras-minuto': {
    title: 'Calculadora de Palabras por Minuto de Lectura — Calzix',
    description: 'Mide tu velocidad lectora en palabras por minuto a partir de las palabras leídas y el tiempo, y descubre tu nivel: de principiante a experto. Gratis.',
    canonical: 'https://calzix.com/palabras-minuto',
  },
  'tiempo-terminar-libro': {
    title: 'Calculadora de Tiempo para Terminar un Libro — Calzix',
    description: 'Estima cuántos días tardarás en acabar un libro según sus páginas, tu velocidad lectora y los minutos que lees al día. Ideal para retos de lectura.',
    canonical: 'https://calzix.com/tiempo-terminar-libro',
  },
  'libros-al-ano': {
    title: 'Calculadora de Cuántos Libros Lees al Año — Calzix',
    description: 'Calcula cuántos libros puedes leer al año según las páginas diarias y la extensión media de un libro, con proyección a 5 años. Gratis.',
    canonical: 'https://calzix.com/libros-al-ano',
  },
  'comprension-lectora': {
    title: 'Test de Comprensión Lectora y Velocidad (PPM) — Calzix',
    description: 'Evalúa tu comprensión lectora respondiendo preguntas tras leer un texto, y mide tus palabras por minuto y tu nivel de retención. Gratis.',
    canonical: 'https://calzix.com/comprension-lectora',
  },
  'paginas-por-dia': {
    title: 'Calculadora de Páginas por Día para Acabar un Libro — Calzix',
    description: 'Calcula cuántas páginas debes leer al día para terminar tu libro en el plazo que quieres, descontando las ya leídas. Gratis y al instante.',
    canonical: 'https://calzix.com/paginas-por-dia',
  },
  // ── Viaje (nuevas) ───────────────────────────────────────────────
  'autonomia-electrico': {
    title: 'Calculadora de Autonomía de Coche Eléctrico (km) — Calzix',
    description: 'Calcula cuántos km puede recorrer tu coche eléctrico con la carga actual según la batería (kWh) y el consumo real, y cuándo parar a cargar.',
    canonical: 'https://calzix.com/autonomia-electrico',
  },
  'costo-gasolinera': {
    title: 'Calculadora de Repostaje: euros por litros — Calzix',
    description: 'Calcula cuánto pagas en la gasolinera según los litros y el precio de la gasolina 95 o el diésel en España, o cuántos litros te dan por un importe.',
    canonical: 'https://calzix.com/costo-gasolinera',
  },
  'litros-repostaje': {
    title: 'Calculadora de Litros de Combustible para un Viaje — Calzix',
    description: 'Calcula los litros de gasolina o diésel para un trayecto según la distancia y el consumo del coche, descontando lo que queda en el depósito.',
    canonical: 'https://calzix.com/litros-repostaje',
  },
  'distancia-a-pie': {
    title: 'Calculadora de Tiempo Caminando por Distancia — Calzix',
    description: 'Calcula cuánto tardas andando según la distancia y el ritmo, con calorías y pasos. Para paseos urbanos, el Camino de Santiago y senderismo.',
    canonical: 'https://calzix.com/distancia-a-pie',
  },
  'distancia-ciclismo': {
    title: 'Calculadora de Tiempo en Bicicleta — Calzix',
    description: 'Calcula cuánto tardas en bici según la distancia y la velocidad, con las calorías quemadas y el CO₂ evitado frente al coche. Gratis.',
    canonical: 'https://calzix.com/distancia-ciclismo',
  },
  'ruta-senderismo': {
    title: 'Calculadora de Rutas de Senderismo: tiempo y dificultad — Calzix',
    description: 'Calcula la duración, las calorías y la dificultad de una ruta según la distancia, el desnivel y tu peso. Para senderos GR, PR y rutas de montaña.',
    canonical: 'https://calzix.com/ruta-senderismo',
  },
  'jet-lag': {
    title: 'Calculadora de Jet Lag y Días de Recuperación — Calzix',
    description: 'Calcula cuántos días tardarás en recuperarte del jet lag según las horas de diferencia con España y la dirección del vuelo, con consejos.',
    canonical: 'https://calzix.com/jet-lag',
  },
  'duracion-vuelo': {
    title: 'Calculadora de Duración de un Vuelo — Calzix',
    description: 'Calcula el tiempo de vuelo según la distancia y la velocidad de crucero, con escalas. Ejemplos desde Madrid, Barcelona y otros aeropuertos españoles.',
    canonical: 'https://calzix.com/duracion-vuelo',
  },
  'exceso-equipaje': {
    title: 'Calculadora de Exceso de Equipaje: cuánto cuesta — Calzix',
    description: 'Calcula cuánto te cobra la aerolínea por los kilos de más según su tarifa por kg o por tramo. Para Iberia, Vueling, Ryanair, Air Europa y más.',
    canonical: 'https://calzix.com/exceso-equipaje',
  },
  'dimensions-maleta': {
    title: 'Medidas de Equipaje de Mano: ¿cabe tu maleta? — Calzix',
    description: 'Comprueba si tu maleta cumple las medidas de cabina o bodega de Ryanair, Vueling, Iberia, Air Europa y easyJet. Medidas en cm y peso en kg.',
    canonical: 'https://calzix.com/dimensions-maleta',
  },
  'presupuesto-viaje': {
    title: 'Calculadora de Presupuesto de Viaje por Persona y Día — Calzix',
    description: 'Planifica el presupuesto de tu viaje con desglose de transporte, alojamiento, comida y extras, y el coste por persona y día en euros.',
    canonical: 'https://calzix.com/presupuesto-viaje',
  },
  'cambio-divisas': {
    title: 'Calculadora de Cambio de Divisas desde el Euro — Calzix',
    description: 'Convierte euros a dólares, libras, francos suizos, yenes, pesos y otras divisas con tipos orientativos, y calcula la comisión del banco o la casa de cambio.',
    canonical: 'https://calzix.com/cambio-divisas',
  },
  'seguro-viaje': {
    title: 'Calculadora del Precio de un Seguro de Viaje — Calzix',
    description: 'Estima cuánto cuesta un seguro de viaje según el precio del viaje, los días y los viajeros, para Europa (con TSE) o el resto del mundo.',
    canonical: 'https://calzix.com/seguro-viaje',
  },
  'alojamiento-comparativa': {
    title: 'Calculadora del Coste de Alojamiento por Noche — Calzix',
    description: 'Calcula el coste total del alojamiento según precio por noche, noches y personas, con la tasa turística de Cataluña, Baleares o el País Vasco.',
    canonical: 'https://calzix.com/alojamiento-comparativa',
  },
  'costo-peajes': {
    title: 'Calculadora de Peajes por Trayecto y al Año en España — Calzix',
    description: 'Calcula cuánto gastas en peajes por trayecto, semana, mes y año según los peajes de tu ruta y su precio. Con las autopistas de pago que siguen en 2026.',
    canonical: 'https://calzix.com/costo-peajes',
  },
  // ── Naturaleza (nuevas) ─────────────────────────────────────────
  'co2-transporte': {
    title: 'Calculadora de Emisiones de CO₂ por Transporte — Calzix',
    description: 'Calcula el CO₂ emitido en coche, moto, autobús, tren (AVE) o avión según la distancia y compara el impacto de cada medio de transporte.',
    canonical: 'https://calzix.com/co2-transporte',
  },
  'compensacion-co2': {
    title: 'Calculadora de Compensación de CO₂ con Árboles — Calzix',
    description: 'Calcula cuántos árboles necesitas plantar para compensar tus emisiones de CO₂ y la superficie de bosque equivalente. Gratis.',
    canonical: 'https://calzix.com/compensacion-co2',
  },
  'huella-alimentaria': {
    title: 'Calculadora de Huella de Carbono de tu Dieta — Calzix',
    description: 'Calcula el CO₂ de tu alimentación semanal según el consumo de carne, lácteos, pescado, legumbres y frutas, y compáralo con la dieta mediterránea.',
    canonical: 'https://calzix.com/huella-alimentaria',
  },
  'etiqueta-energetica': {
    title: 'Calculadora de Etiqueta Energética de Electrodomésticos — Calzix',
    description: 'Clasifica tu electrodoméstico de la A a la G según su consumo anual en kWh con la escala europea de 2021, y calcula su coste con el precio de la luz.',
    canonical: 'https://calzix.com/etiqueta-energetica',
  },
  'consumo-ducha': {
    title: 'Calculadora de Consumo de Agua en la Ducha — Calzix',
    description: 'Calcula los litros de agua que gastas en la ducha según los minutos, el caudal y las personas, y su coste mensual y anual en euros.',
    canonical: 'https://calzix.com/consumo-ducha',
  },
  'agua-alimentos': {
    title: 'Calculadora de Agua Virtual de los Alimentos — Calzix',
    description: 'Calcula el agua virtual necesaria para producir carne, lácteos, cereales, aceite de oliva o café, con factores por kilo. Para entender tu huella hídrica.',
    canonical: 'https://calzix.com/agua-alimentos',
  },
  'calidad-agua': {
    title: 'Evaluador de Calidad del Agua de Consumo — Calzix',
    description: 'Evalúa la calidad del agua con pH, turbidez, cloro, nitratos y conductividad y compárala con los límites del Real Decreto 3/2023 de agua de consumo.',
    canonical: 'https://calzix.com/calidad-agua',
  },
  'captacion-lluvia': {
    title: 'Calculadora de Captación de Agua de Lluvia — Calzix',
    description: 'Calcula los litros de lluvia que puedes recoger según la superficie del tejado y la precipitación anual de tu ciudad española, con la eficiencia del sistema.',
    canonical: 'https://calzix.com/captacion-lluvia',
  },
  'numero-placas-solar': {
    title: 'Calculadora de Número de Placas Solares Necesarias — Calzix',
    description: 'Calcula cuántas placas solares necesitas según tu consumo anual en kWh, la potencia de cada panel y las horas de sol pico de tu provincia.',
    canonical: 'https://calzix.com/numero-placas-solar',
  },
  'angulo-solar': {
    title: 'Calculadora de Inclinación Óptima de Placas Solares — Calzix',
    description: 'Calcula la inclinación ideal de tus paneles solares según la latitud de tu ciudad (de 28° N en Canarias a 43° N en el norte peninsular) y la época del año.',
    canonical: 'https://calzix.com/angulo-solar',
  },
  'bateria-solar': {
    title: 'Calculadora de Batería Solar: capacidad en kWh y Ah — Calzix',
    description: 'Calcula la capacidad mínima de la batería de tu instalación solar según el consumo diario, los días de autonomía y la profundidad de descarga.',
    canonical: 'https://calzix.com/bateria-solar',
  },
  'plastico-reciclado': {
    title: 'Calculadora de CO₂ Evitado al Reciclar Plástico — Calzix',
    description: 'Calcula el petróleo, la energía y el CO₂ que ahorras al reciclar envases de plástico (PET, PEAD, PVC, PEBD, PP, PS) en el contenedor amarillo.',
    canonical: 'https://calzix.com/plastico-reciclado',
  },
  'papel-reciclado': {
    title: 'Calculadora de Árboles y Agua al Reciclar Papel — Calzix',
    description: 'Calcula cuántos árboles salvas, el agua que ahorras y el CO₂ que evitas al reciclar papel y cartón en el contenedor azul. Gratis.',
    canonical: 'https://calzix.com/papel-reciclado',
  },
  'residuos-electronicos': {
    title: 'Calculadora de Materiales en Residuos Electrónicos (RAEE) — Calzix',
    description: 'Calcula el cobre, oro, aluminio y litio recuperables al llevar móviles, portátiles, neveras o lavadoras a un punto limpio o a la tienda.',
    canonical: 'https://calzix.com/residuos-electronicos',
  },
  'compost-organico': {
    title: 'Calculadora de Compost Casero — Calzix',
    description: 'Calcula los kilos de compost que produces con tus residuos orgánicos semanales (contenedor marrón o compostera) y el CO₂ que evitas. Gratis.',
    canonical: 'https://calzix.com/compost-organico',
  },
  'eficiencia-energetica': {
    title: 'Calculadora de Eficiencia Energética: COP, EER y SCOP — Calzix',
    description: 'Calcula el COP de bombas de calor y aerotermia, el EER de aires acondicionados y el rendimiento de calderas. Para instaladores y hogares.',
    canonical: 'https://calzix.com/eficiencia-energetica',
  },
  // ── Ocio (nuevas) ───────────────────────────────────────────────
  'compatibilidad-zodiacal': {
    title: 'Calculadora de Compatibilidad Zodiacal — Calzix',
    description: 'Calcula vuestra compatibilidad astrológica por signos del zodiaco, con el porcentaje de afinidad de los 12 signos. Lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/compatibilidad-zodiacal',
  },
  'dias-juntos': {
    title: 'Calculadora de Días Juntos en Pareja — Calzix',
    description: 'Calcula cuántos días lleváis juntos y los años, meses y semanas exactos desde la fecha de inicio, con los próximos aniversarios. Gratis.',
    canonical: 'https://calzix.com/dias-juntos',
  },
  'nombre-amor': {
    title: 'Generador de Nombre de Pareja (shipname) — Calzix',
    description: 'Combina vuestros nombres para crear un nombre de pareja o shipname para redes sociales. Generador lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/nombre-amor',
  },
  'presupuesto-boda': {
    title: 'Calculadora de Presupuesto de Boda en España — Calzix',
    description: 'Presupuesta tu boda: finca o restaurante, menú por invitado, fotografía, vestido y decoración, con precios orientativos de España y el coste por invitado.',
    canonical: 'https://calzix.com/presupuesto-boda',
  },
  'ruleta-decision': {
    title: 'Ruleta de Decisiones Aleatoria online — Calzix',
    description: 'Toma decisiones al azar con una ruleta virtual: escribe las opciones y gírala. Aleatoriedad criptográfica, gratis y sin registro.',
    canonical: 'https://calzix.com/ruleta-decision',
  },
  'dado-virtual': {
    title: 'Dado Virtual de 6 Caras online — Calzix',
    description: 'Lanza un dado virtual de 6 caras para el parchís, la oca y cualquier juego de mesa. Aleatoriedad criptográfica, gratis y sin registro.',
    canonical: 'https://calzix.com/dado-virtual',
  },
  'cara-o-cruz': {
    title: 'Cara o Cruz: lanzar una Moneda online — Calzix',
    description: 'Lanza una moneda virtual de euro al azar: cara o cruz con probabilidad del 50 %. Aleatoriedad criptográfica, gratis y sin registro.',
    canonical: 'https://calzix.com/cara-o-cruz',
  },
  'generador-loteria': {
    title: 'Generador de Números de Lotería: Primitiva y Euromillones — Calzix',
    description: 'Genera combinaciones aleatorias para la Primitiva, la Bonoloto, el Euromillones y El Gordo de la Primitiva con aleatoriedad criptográfica. Gratis.',
    canonical: 'https://calzix.com/generador-loteria',
  },
  'camino-vida': {
    title: 'Calculadora del Número del Camino de Vida — Calzix',
    description: 'Calcula tu número del camino de vida según la numerología pitagórica y su significado, del 1 al 9 y los números maestros. Lúdico y gratis.',
    canonical: 'https://calzix.com/camino-vida',
  },
  'numero-expresion': {
    title: 'Calculadora del Número de Expresión (destino) — Calzix',
    description: 'Calcula tu número de expresión a partir de tu nombre completo con la tabla pitagórica. Talentos y destino según la numerología. Gratis.',
    canonical: 'https://calzix.com/numero-expresion',
  },
  'ciclos-personales': {
    title: 'Calculadora de Año Personal y Ciclos Numerológicos — Calzix',
    description: 'Calcula tu año personal y tus ciclos numerológicos del 1 al 9 e interpreta qué energía te acompaña este año. Lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/ciclos-personales',
  },
  'compatibilidad-numerologica': {
    title: 'Calculadora de Compatibilidad Numerológica — Calzix',
    description: 'Calcula la compatibilidad numerológica de dos personas a partir de sus números del camino de vida. Lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/compatibilidad-numerologica',
  },
  'ciclos-sueno': {
    title: 'Calculadora de Ciclos de Sueño de 90 minutos — Calzix',
    description: 'Calcula tus ciclos de sueño de 90 minutos y las mejores horas para acostarte y despertarte descansado. Gratis y sin registro.',
    canonical: 'https://calzix.com/ciclos-sueno',
  },
  'deuda-sueno': {
    title: 'Calculadora de Deuda de Sueño acumulada — Calzix',
    description: 'Calcula las horas de sueño que te faltan en la semana frente a las recomendadas para tu edad, y cómo recuperarlas. Gratis y sin registro.',
    canonical: 'https://calzix.com/deuda-sueno',
  },
  'hora-melatonina': {
    title: 'Calculadora de Hora para Tomar Melatonina — Calzix',
    description: 'Calcula el momento orientativo para tomar melatonina según tu hora deseada de dormir. Para jet lag, cambio de hora y turnos. Gratis.',
    canonical: 'https://calzix.com/hora-melatonina',
  },
  'siesta-optima': {
    title: 'Calculadora de la Siesta Perfecta — Calzix',
    description: 'Calcula cuánto debe durar tu siesta: siesta corta de 20 minutos o ciclo completo de 90. La siesta española, con base científica. Gratis.',
    canonical: 'https://calzix.com/siesta-optima',
  },
  'calculadora-fracciones': {
    title: 'Calculadora de Fracciones: suma, resta y simplifica — Calzix',
    description: 'Suma, resta, multiplica y divide fracciones online y obtén el resultado simplificado y en decimal. Ideal para Primaria y ESO. Gratis.',
    canonical: 'https://calzix.com/calculadora-fracciones',
  },
  'numeros-romanos': {
    title: 'Conversor de Números Romanos a Arábigos — Calzix',
    description: 'Convierte números romanos a arábigos y viceversa, del 1 al 3999, y comprueba si están bien escritos. Para siglos, fechas y monumentos. Gratis.',
    canonical: 'https://calzix.com/numeros-romanos',
  },
  'raiz-cuadrada': {
    title: 'Calculadora de Raíz Cuadrada, Cúbica y n-ésima — Calzix',
    description: 'Calcula la raíz cuadrada, cúbica o de cualquier índice de un número e identifica si es exacta. Gratis y sin registro.',
    canonical: 'https://calzix.com/raiz-cuadrada',
  },
  'redondeo': {
    title: 'Calculadora de Redondeo de Números — Calzix',
    description: 'Redondea números a los decimales que quieras: redondeo normal, por exceso y por defecto, como en los céntimos de euro. Gratis y al instante.',
    canonical: 'https://calzix.com/redondeo',
  },
  'notacion-cientifica': {
    title: 'Calculadora de Notación Científica — Calzix',
    description: 'Convierte cualquier número a notación científica (mantisa × 10ⁿ) y separa la mantisa y el exponente. Para Física y Química. Gratis.',
    canonical: 'https://calzix.com/notacion-cientifica',
  },
  'division-resto': {
    title: 'Calculadora de División con Resto: cociente y resto — Calzix',
    description: 'Calcula el cociente y el resto de una división entera y su valor decimal, con la prueba de la división. Ideal para Primaria y ESO. Gratis.',
    canonical: 'https://calzix.com/division-resto',
  },
  'logaritmo': {
    title: 'Calculadora de Logaritmos: base, ln y log₁₀ — Calzix',
    description: 'Calcula el logaritmo de un número en cualquier base, el logaritmo neperiano (ln) y el decimal (log₁₀). Para Bachillerato y la PAU. Gratis.',
    canonical: 'https://calzix.com/logaritmo',
  },
  'progresiones': {
    title: 'Calculadora de Progresiones Aritméticas y Geométricas — Calzix',
    description: 'Calcula el término general y la suma de los n primeros términos de una progresión aritmética o geométrica. Para ESO y Bachillerato. Gratis.',
    canonical: 'https://calzix.com/progresiones',
  },
  'distancia-dos-puntos': {
    title: 'Distancia entre Dos Puntos y Punto Medio — Calzix',
    description: 'Calcula la distancia entre dos puntos del plano y su punto medio con la fórmula derivada de Pitágoras. Geometría analítica. Gratis.',
    canonical: 'https://calzix.com/distancia-dos-puntos',
  },
  'percentiles-cuartiles': {
    title: 'Calculadora de Percentiles y Cuartiles (Q1, Q2, Q3) — Calzix',
    description: 'Calcula los cuartiles, el rango intercuartílico y cualquier percentil de un conjunto de datos, como los percentiles de peso infantil. Gratis.',
    canonical: 'https://calzix.com/percentiles-cuartiles',
  },
  'densidad': {
    title: 'Calculadora de Densidad (ρ = m/V) — Calzix',
    description: 'Calcula la densidad, la masa o el volumen de un cuerpo con ρ = m/V, despejando cualquier variable. Para Física y Química de ESO. Gratis.',
    canonical: 'https://calzix.com/densidad',
  },
  'trabajo-fisica': {
    title: 'Calculadora de Trabajo en Física (W = F·d·cos θ) — Calzix',
    description: 'Calcula el trabajo de una fuerza en julios a partir de la fuerza, la distancia y el ángulo. Física de ESO y Bachillerato. Gratis.',
    canonical: 'https://calzix.com/trabajo-fisica',
  },
  'cantidad-movimiento': {
    title: 'Calculadora de Cantidad de Movimiento (p = m·v) — Calzix',
    description: 'Calcula el momento lineal, la masa o la velocidad con p = m·v, despejando cualquier variable. Física de Bachillerato. Gratis.',
    canonical: 'https://calzix.com/cantidad-movimiento',
  },
  'peso-masa': {
    title: 'Calculadora de Peso y Masa en los Planetas (P = m·g) — Calzix',
    description: 'Calcula el peso de un objeto en la Tierra, la Luna, Marte y otros planetas con P = m·g, y entiende la diferencia entre peso y masa. Gratis.',
    canonical: 'https://calzix.com/peso-masa',
  },
  'aceleracion': {
    title: 'Calculadora de Aceleración (a = Δv/t) — Calzix',
    description: 'Calcula la aceleración a partir de la velocidad inicial, la final y el tiempo, e indica si acelera o frena. Física de ESO y Bachillerato.',
    canonical: 'https://calzix.com/aceleracion',
  },
  'presion-fuerza-area': {
    title: 'Calculadora de Presión (P = F/A) — Calzix',
    description: 'Calcula la presión, la fuerza o la superficie con P = F/A, despejando cualquier variable. Física de ESO y Bachillerato. Gratis.',
    canonical: 'https://calzix.com/presion-fuerza-area',
  },
  'ley-gases-combinada': {
    title: 'Calculadora de la Ley Combinada de los Gases — Calzix',
    description: 'Resuelve la ley combinada de los gases P₁V₁/T₁ = P₂V₂/T₂ despejando presión, volumen o temperatura en kelvin. Gratis.',
    canonical: 'https://calzix.com/ley-gases-combinada',
  },
  'numero-avogadro': {
    title: 'Calculadora con el Número de Avogadro — Calzix',
    description: 'Convierte moles a partículas y partículas a moles con el número de Avogadro (6,022 × 10²³). Química de ESO y Bachillerato. Gratis.',
    canonical: 'https://calzix.com/numero-avogadro',
  },
  'rendimiento-reaccion': {
    title: 'Calculadora de Rendimiento de una Reacción Química — Calzix',
    description: 'Calcula el rendimiento porcentual de una reacción a partir del rendimiento real y el teórico. Química de Bachillerato. Gratis.',
    canonical: 'https://calzix.com/rendimiento-reaccion',
  },
  'concentracion-ppm': {
    title: 'Calculadora de Concentración en ppm — Calzix',
    description: 'Calcula las partes por millón (ppm) de una disolución y su equivalente en porcentaje en masa. Para Química, agua y piscinas. Gratis.',
    canonical: 'https://calzix.com/concentracion-ppm',
  },
  'conversor-cocina': {
    title: 'Conversor de Medidas de Cocina: tazas, gramos y ml — Calzix',
    description: 'Convierte tazas, cucharadas, cucharaditas, mililitros, onzas y litros para adaptar recetas americanas a las medidas españolas. Gratis.',
    canonical: 'https://calzix.com/conversor-cocina',
  },
  'conversor-numeracion': {
    title: 'Conversor Binario, Decimal, Octal y Hexadecimal — Calzix',
    description: 'Convierte números entre binario, decimal, octal y hexadecimal al instante. Para programación, informática y Tecnología. Gratis.',
    canonical: 'https://calzix.com/conversor-numeracion',
  },
  'conversor-tiempo-decimal': {
    title: 'Conversor de Horas y Minutos a Horas Decimales — Calzix',
    description: 'Convierte horas y minutos a horas decimales y al revés, para el registro de jornada, las nóminas y la facturación por horas. Gratis.',
    canonical: 'https://calzix.com/conversor-tiempo-decimal',
  },
  'conversor-coordenadas-gms': {
    title: 'Conversor de Coordenadas: decimales a GMS — Calzix',
    description: 'Convierte coordenadas geográficas entre grados decimales y grados, minutos y segundos (GMS), como en el visor del IGN o el Catastro. Gratis.',
    canonical: 'https://calzix.com/conversor-coordenadas-gms',
  },
  'conversor-pendiente': {
    title: 'Conversor de Pendiente: porcentaje, grados y 1:n — Calzix',
    description: 'Convierte la pendiente entre porcentaje, grados y proporción 1:n. Útil para rampas accesibles (CTE), tejados, carreteras y rutas. Gratis.',
    canonical: 'https://calzix.com/conversor-pendiente',
  },
  'conversor-tallas-calzado': {
    title: 'Conversor de Tallas de Calzado: EU (España), US y UK — Calzix',
    description: 'Convierte tallas de zapatos entre la numeración europea que se usa en España, la de EE. UU. y la británica, con la longitud del pie en cm.',
    canonical: 'https://calzix.com/conversor-tallas-calzado',
  },
  'conversor-mah-wh': {
    title: 'Conversor de mAh a Wh (y de Wh a mAh) — Calzix',
    description: 'Convierte la capacidad de baterías entre mAh y Wh según el voltaje y comprueba el límite de 100 Wh para llevar powerbanks en el avión.',
    canonical: 'https://calzix.com/conversor-mah-wh',
  },
  'conversor-escala-mapa': {
    title: 'Conversor de Escala de Mapa: distancia real — Calzix',
    description: 'Calcula la distancia real a partir de la escala del mapa (1:25.000, 1:50.000 del IGN) y al revés. Ideal para senderismo y topografía.',
    canonical: 'https://calzix.com/conversor-escala-mapa',
  },
  'conversor-viento': {
    title: 'Escala de Beaufort: viento en km/h, nudos y m/s — Calzix',
    description: 'Convierte la velocidad del viento en km/h a su grado en la escala de Beaufort, en nudos y en m/s, como en los avisos de AEMET. Gratis.',
    canonical: 'https://calzix.com/conversor-viento',
  },
  'conversor-ritmo-velocidad': {
    title: 'Conversor de Ritmo (min/km) a Velocidad (km/h) — Calzix',
    description: 'Convierte entre ritmo de carrera (min/km) y velocidad (km/h) para running y ciclismo. Calcula tus tiempos para un 10K o un maratón.',
    canonical: 'https://calzix.com/conversor-ritmo-velocidad',
  },
  'hormigon-losa': {
    title: 'Calculadora de Hormigón para Losa o Solera (m³) — Calzix',
    description: 'Calcula los metros cúbicos de hormigón para una losa, solera o zapata, con margen de desperdicio y sacos de cemento. Gratis.',
    canonical: 'https://calzix.com/hormigon-losa',
  },
  'escalera-peldanos': {
    title: 'Calculadora de Escaleras: peldaños, huella y tabica — Calzix',
    description: 'Calcula el número de peldaños, la tabica (contrahuella) y la huella de una escalera cómoda con la regla de Blondel y los límites del CTE.',
    canonical: 'https://calzix.com/escalera-peldanos',
  },
  'papel-pintado': {
    title: 'Calculadora de Papel Pintado: rollos necesarios — Calzix',
    description: 'Calcula cuántos rollos de papel pintado necesitas según el perímetro, la altura de la pared y las medidas del rollo. Gratis.',
    canonical: 'https://calzix.com/papel-pintado',
  },
  'potencia-contratada': {
    title: 'Calculadora de Potencia de Luz a Contratar (kW) — Calzix',
    description: 'Estima la potencia eléctrica a contratar según tus electrodomésticos y la simultaneidad, con los tramos normalizados (3,45, 4,6, 5,75 kW…). Ahorra en la factura.',
    canonical: 'https://calzix.com/potencia-contratada',
  },
  'ahorro-led': {
    title: 'Calculadora de Ahorro con Bombillas LED — Calzix',
    description: 'Calcula cuánto dinero y energía ahorras al cambiar tus bombillas por LED según las horas de uso y el precio del kWh en España. Gratis.',
    canonical: 'https://calzix.com/ahorro-led',
  },
  'capacidad-endeudamiento': {
    title: 'Calculadora de Capacidad de Endeudamiento (regla del 35 %) — Calzix',
    description: 'Calcula cuánto puedes pedir al banco según tus ingresos netos con la regla del 30-35 %: cuota máxima e hipoteca asumible en España.',
    canonical: 'https://calzix.com/capacidad-endeudamiento',
  },
  'gastos-compra-vivienda': {
    title: 'Calculadora de Gastos de Compra de Vivienda en España — Calzix',
    description: 'Calcula los impuestos (ITP o IVA y AJD), notaría, registro y gestoría al comprar una casa en España, según tu comunidad autónoma. Gratis.',
    canonical: 'https://calzix.com/gastos-compra-vivienda',
  },
  'consumo-climatizacion': {
    title: 'Calculadora de Consumo de Aire Acondicionado y Calefacción — Calzix',
    description: 'Calcula el coste eléctrico del aire acondicionado o la calefacción por temporada según la potencia, las horas y el precio del kWh en España.',
    canonical: 'https://calzix.com/consumo-climatizacion',
  },
  'cesped-semillas': {
    title: 'Calculadora de Semillas de Césped por m² — Calzix',
    description: 'Calcula los kilos de semilla de césped que necesitas según la superficie y la dosis de siembra, con mezclas para clima mediterráneo. Gratis.',
    canonical: 'https://calzix.com/cesped-semillas',
  },
  'piscina-volumen': {
    title: 'Calculadora de Volumen de Piscina (litros y m³) — Calzix',
    description: 'Calcula los litros de agua de tu piscina rectangular o circular y la dosis inicial de cloro. Útil para tratamientos y para estimar el coste del llenado.',
    canonical: 'https://calzix.com/piscina-volumen',
  },
  'comision-ventas': {
    title: 'Calculadora de Comisión de Ventas — Calzix',
    description: 'Calcula la comisión de un comercial sobre las ventas y el total a cobrar con el salario base. Para empresas y agentes en España. Gratis.',
    canonical: 'https://calzix.com/comision-ventas',
  },
  'presupuesto-trabajo': {
    title: 'Calculadora de Presupuesto para Autónomos (con IVA) — Calzix',
    description: 'Elabora un presupuesto con materiales, mano de obra, margen e IVA del 21 % o del 10 % en reformas de vivienda. Ideal para autónomos y oficios.',
    canonical: 'https://calzix.com/presupuesto-trabajo',
  },
  'recargo-mora': {
    title: 'Calculadora de Intereses de Demora de Facturas 2026 — Calzix',
    description: 'Calcula los intereses de demora de una factura impagada con el tipo legal de la Ley 3/2004 (10,40 % en el 2.º semestre de 2026) y la indemnización de 40 €.',
    canonical: 'https://calzix.com/recargo-mora',
  },
  'descuento-sucesivo': {
    title: 'Calculadora de Descuentos Sucesivos y Equivalente — Calzix',
    description: 'Aplica varios descuentos encadenados y calcula el descuento único equivalente. Evita el error de sumar porcentajes en rebajas. Gratis.',
    canonical: 'https://calzix.com/descuento-sucesivo',
  },
  'descuento-pronto-pago': {
    title: 'Calculadora de Descuento por Pronto Pago — Calzix',
    description: 'Calcula el ahorro por pagar una factura antes de plazo y su rentabilidad anualizada frente al plazo legal de 60 días. Gratis.',
    canonical: 'https://calzix.com/descuento-pronto-pago',
  },
  'salario-por-hora': {
    title: 'Calculadora de Salario por Hora (anual a hora) — Calzix',
    description: 'Convierte tu sueldo anual en salario por hora y viceversa según tu jornada (1.826 h al año a 40 h semanales). Compara ofertas de empleo.',
    canonical: 'https://calzix.com/salario-por-hora',
  },
  'coste-empresa-trabajador': {
    title: 'Calculadora del Coste de un Trabajador para la Empresa 2026 — Calzix',
    description: 'Calcula lo que cuesta un empleado a la empresa en España: sueldo bruto más cotizaciones de 2026 (contingencias, desempleo, FOGASA, FP y MEI).',
    canonical: 'https://calzix.com/coste-empresa-trabajador',
  },
  'paga-extra': {
    title: 'Calculadora de Pagas Extra y Prorrateo — Calzix',
    description: 'Reparte tu salario anual entre 12 o 14 pagas y calcula el importe de cada paga extra y el prorrateo mensual en la nómina. Gratis.',
    canonical: 'https://calzix.com/paga-extra',
  },
  'objetivo-ventas': {
    title: 'Calculadora de Objetivo de Ventas Diario — Calzix',
    description: 'Reparte tu objetivo de ventas mensual en una meta diaria y recalcula el ritmo según lo ya vendido. Gratis y al instante.',
    canonical: 'https://calzix.com/objetivo-ventas',
  },
  'reparto-propinas': {
    title: 'Calculadora de Reparto del Bote de Propinas — Calzix',
    description: 'Reparte el bote de propinas del equipo de forma proporcional a las horas trabajadas por cada persona. Para bares y restaurantes. Gratis.',
    canonical: 'https://calzix.com/reparto-propinas',
  },
  'nota-curva': {
    title: 'Calculadora de Nota con Curva — Calzix',
    description: 'Aplica una curva de calificación lineal a tu nota y descubre cuánto sube. Gratis y al instante.',
    canonical: 'https://calzix.com/nota-curva',
  },
  'promedio-acumulado': {
    title: 'Calculadora de Nota Media Acumulada por Créditos — Calzix',
    description: 'Calcula tu nota media acumulada combinando la anterior con la del nuevo cuatrimestre, ponderada por créditos ECTS. Gratis.',
    canonical: 'https://calzix.com/promedio-acumulado',
  },
  'nota-letra': {
    title: 'Calculadora de Nota Numérica a Calificación — Calzix',
    description: 'Convierte una nota numérica en su calificación: suspenso, aprobado, notable, sobresaliente o matrícula de honor, y su equivalente en letra (A-F).',
    canonical: 'https://calzix.com/nota-letra',
  },
  'prestamo-estudiantil': {
    title: 'Calculadora de Préstamo para Estudios — Calzix',
    description: 'Calcula la cuota mensual, el total y los intereses de un préstamo para financiar un grado o un máster. Gratis y sin registro.',
    canonical: 'https://calzix.com/prestamo-estudiantil',
  },
  'beca-cobertura': {
    title: 'Calculadora de Cobertura de Beca (%) — Calzix',
    description: 'Calcula qué porcentaje de los costes de estudio cubre tu beca y cuánto tendrás que aportar tú. Gratis y al instante.',
    canonical: 'https://calzix.com/beca-cobertura',
  },
  'presupuesto-estudiante': {
    title: 'Calculadora de Presupuesto de Estudiante — Calzix',
    description: 'Suma tus gastos mensuales de estudiante (piso compartido o residencia, comida, transporte…) y calcula el coste del curso. Gratis.',
    canonical: 'https://calzix.com/presupuesto-estudiante',
  },
  'flashcards-repaso': {
    title: 'Calculadora de Flashcards por Día para Estudiar — Calzix',
    description: 'Reparte tus tarjetas de estudio entre los días que quedan hasta el examen con repetición espaciada. Para la PAU y oposiciones. Gratis.',
    canonical: 'https://calzix.com/flashcards-repaso',
  },
  'horas-ects': {
    title: 'Calculadora de Créditos ECTS a Horas de Estudio — Calzix',
    description: 'Convierte créditos ECTS en horas de trabajo del estudiante (25 h por crédito en España), en total y por semana. Gratis y al instante.',
    canonical: 'https://calzix.com/horas-ects',
  },
  'tiempo-audiolibro': {
    title: 'Calculadora de Duración de un Audiolibro — Calzix',
    description: 'Estima cuántas horas dura un audiolibro según las páginas, la narración y la velocidad de reproducción. Gratis.',
    canonical: 'https://calzix.com/tiempo-audiolibro',
  },
  'palabras-libro': {
    title: 'Calculadora de Palabras de un Libro y Tiempo de Lectura — Calzix',
    description: 'Calcula cuántas palabras tiene un libro a partir de sus páginas y estima el tiempo de lectura. Gratis y sin registro.',
    canonical: 'https://calzix.com/palabras-libro',
  },
  'coste-km': {
    title: 'Calculadora del Coste por Kilómetro del Coche — Calzix',
    description: 'Calcula lo que te cuesta cada km en coche sumando combustible y mantenimiento, y compáralo con la dieta de 0,26 €/km exenta en el IRPF.',
    canonical: 'https://calzix.com/coste-km',
  },
  'paradas-repostaje': {
    title: 'Calculadora de Paradas para Repostar en un Viaje — Calzix',
    description: 'Calcula cuántas veces tendrás que repostar en un viaje largo según la distancia y la autonomía de tu coche. Gratis.',
    canonical: 'https://calzix.com/paradas-repostaje',
  },
  'tiempo-llegada': {
    title: 'Calculadora de Hora de Llegada — Calzix',
    description: 'Estima tu hora de llegada según la hora de salida, la distancia, la velocidad media y las paradas. Gratis y al instante.',
    canonical: 'https://calzix.com/tiempo-llegada',
  },
  'paradas-descanso': {
    title: 'Calculadora de Paradas de Descanso en Carretera — Calzix',
    description: 'Calcula cuántas paradas hacer en un viaje largo: la DGT recomienda descansar cada 2 horas o 200 km. Conduce seguro. Gratis.',
    canonical: 'https://calzix.com/paradas-descanso',
  },
  'hora-llegada-zona': {
    title: 'Calculadora de Hora de Llegada de un Vuelo (husos horarios) — Calzix',
    description: 'Calcula la hora local de llegada de un vuelo desde España según su duración y la diferencia horaria con el destino. Gratis.',
    canonical: 'https://calzix.com/hora-llegada-zona',
  },
  'mejor-hora-llamar': {
    title: 'Mejor Hora para Llamar desde España a otro País — Calzix',
    description: 'Comprueba qué hora es en otro país antes de llamar desde España y evita despertar a nadie de madrugada. Gratis y sin registro.',
    canonical: 'https://calzix.com/mejor-hora-llamar',
  },
  'liquidos-avion': {
    title: 'Calculadora de Líquidos Permitidos en el Avión — Calzix',
    description: 'Comprueba si tus líquidos cumplen la norma de cabina en aeropuertos españoles: envases de 100 ml en una bolsa de 1 litro. Gratis.',
    canonical: 'https://calzix.com/liquidos-avion',
  },
  'reparto-equipaje': {
    title: 'Calculadora de Reparto de Peso del Equipaje — Calzix',
    description: 'Reparte el peso entre tus maletas y comprueba si quedan dentro del límite de la aerolínea. Evita recargos en el aeropuerto. Gratis.',
    canonical: 'https://calzix.com/reparto-equipaje',
  },
  'split-gastos-viaje': {
    title: 'Calculadora para Dividir Gastos de Viaje en Grupo — Calzix',
    description: 'Divide los gastos de un viaje en grupo y descubre quién debe pagar y quién debe cobrar, como un Bizum de cuentas claras. Gratis.',
    canonical: 'https://calzix.com/split-gastos-viaje',
  },
  'coste-alquiler-coche': {
    title: 'Calculadora del Coste de Alquilar un Coche — Calzix',
    description: 'Calcula el coste total de alquilar un coche sumando tarifa, seguro a todo riesgo, política de combustible y extras. Compara ofertas. Gratis.',
    canonical: 'https://calzix.com/coste-alquiler-coche',
  },
  'huella-vuelo': {
    title: 'Calculadora de Huella de Carbono de un Vuelo — Calzix',
    description: 'Calcula las emisiones de CO₂ de un vuelo desde España según distancia, tipo de trayecto y clase, y los árboles para compensarlo. Gratis.',
    canonical: 'https://calzix.com/huella-vuelo',
  },
  'huella-digital-co2': {
    title: 'Calculadora de Huella Digital de CO₂ — Calzix',
    description: 'Estima la huella de carbono de tu actividad digital: streaming, correos y búsquedas web. Gratis y al instante.',
    canonical: 'https://calzix.com/huella-digital-co2',
  },
  'huella-hidrica': {
    title: 'Calculadora de Huella Hídrica de los Alimentos — Calzix',
    description: 'Descubre el agua virtual que se necesita para producir los alimentos que comes, en litros por kilo. Gratis y sin registro.',
    canonical: 'https://calzix.com/huella-hidrica',
  },
  'ahorro-agua-grifo': {
    title: 'Calculadora de Ahorro de Agua con Aireadores — Calzix',
    description: 'Calcula el agua y los euros que ahorras al instalar aireadores en los grifos de casa, con el precio del agua en España. Gratis.',
    canonical: 'https://calzix.com/ahorro-agua-grifo',
  },
  'autoconsumo-solar': {
    title: 'Calculadora de Autoconsumo Solar y Excedentes — Calzix',
    description: 'Calcula tu tasa de autoconsumo, la autosuficiencia y los excedentes vertidos a la red con compensación simplificada en España. Gratis.',
    canonical: 'https://calzix.com/autoconsumo-solar',
  },
  'ahorro-co2-solar': {
    title: 'Calculadora de CO₂ Evitado con Placas Solares — Calzix',
    description: 'Calcula las emisiones de CO₂ que evitas con tu instalación fotovoltaica según el factor de emisión de la red eléctrica española. Gratis.',
    canonical: 'https://calzix.com/ahorro-co2-solar',
  },
  'dimension-inversor': {
    title: 'Calculadora para Dimensionar el Inversor Solar — Calzix',
    description: 'Calcula la potencia de inversor adecuada a la potencia pico de tus placas solares (kWp) y la potencia contratada. Gratis y sin registro.',
    canonical: 'https://calzix.com/dimension-inversor',
  },
  'latas-aluminio': {
    title: 'Calculadora de Impacto de Reciclar Latas de Aluminio — Calzix',
    description: 'Calcula la energía y el aluminio que recuperas al reciclar latas en el contenedor amarillo. Reciclar aluminio ahorra hasta un 95 % de energía.',
    canonical: 'https://calzix.com/latas-aluminio',
  },
  'aceite-usado': {
    title: 'Calculadora de Impacto de Reciclar Aceite de Cocina — Calzix',
    description: 'Calcula el agua que evitas contaminar y el biodiésel que se obtiene al llevar el aceite de cocina usado al punto limpio. Gratis.',
    canonical: 'https://calzix.com/aceite-usado',
  },
  'pilas-recicladas': {
    title: 'Calculadora de Impacto de Reciclar Pilas y Baterías — Calzix',
    description: 'Calcula el agua que evitas contaminar al depositar las pilas usadas en los contenedores de pilas en lugar de tirarlas a la basura. Gratis.',
    canonical: 'https://calzix.com/pilas-recicladas',
  },
  'lenguaje-amor': {
    title: 'Test de los 5 Lenguajes del Amor — Calzix',
    description: 'Descubre tu lenguaje del amor principal entre los cinco de Gary Chapman: palabras, tiempo, regalos, actos de servicio y contacto físico. Gratis.',
    canonical: 'https://calzix.com/lenguaje-amor',
  },
  'distancia-relacion': {
    title: 'Cuenta Atrás para una Relación a Distancia — Calzix',
    description: 'Cuenta los días que faltan para volver a ver a tu pareja en una relación a distancia. Gratis y al instante.',
    canonical: 'https://calzix.com/distancia-relacion',
  },
  'tirada-dados': {
    title: 'Tirada de Dados Virtual (NdM, d20, d6…) — Calzix',
    description: 'Lanza varios dados virtuales del número de caras que quieras, con modificador. Ideal para rol y juegos de mesa. Gratis.',
    canonical: 'https://calzix.com/tirada-dados',
  },
  'sorteo-nombres': {
    title: 'Sorteo de Nombres al Azar: elige un ganador — Calzix',
    description: 'Sortea un ganador aleatorio entre una lista de nombres: amigo invisible, rifas y concursos en redes. Justo e imparcial. Gratis.',
    canonical: 'https://calzix.com/sorteo-nombres',
  },
  'numero-aleatorio': {
    title: 'Generador de Números Aleatorios — Calzix',
    description: 'Genera números aleatorios en el rango que elijas, con o sin repetición, con aleatoriedad criptográfica. Gratis y al instante.',
    canonical: 'https://calzix.com/numero-aleatorio',
  },
  'numero-suerte-personal': {
    title: 'Calculadora del Número de la Suerte por Fecha de Nacimiento — Calzix',
    description: 'Descubre tu número de la suerte personal calculado a partir de tu fecha de nacimiento según la numerología. Lúdico y gratis.',
    canonical: 'https://calzix.com/numero-suerte-personal',
  },
  'numero-angel': {
    title: 'Significado de los Números Ángel (111, 222, 1111…) — Calzix',
    description: 'Descubre el significado de los números ángel que ves repetidos en relojes y matrículas. Lúdico, gratis y sin registro.',
    canonical: 'https://calzix.com/numero-angel',
  },
  'numero-dia-nacimiento': {
    title: 'Calculadora del Número del Día de Nacimiento — Calzix',
    description: 'Descubre tu número del día de nacimiento y el rasgo de personalidad que le asocia la numerología. Gratis y al instante.',
    canonical: 'https://calzix.com/numero-dia-nacimiento',
  },
  'cafeina-sueno': {
    title: 'Calculadora de Cafeína y Sueño: hora del último café — Calzix',
    description: 'Calcula a qué hora tomar el último café para que la cafeína no afecte a tu sueño según tu hora de dormir. Gratis y sin registro.',
    canonical: 'https://calzix.com/cafeina-sueno',
  },
  'horas-sueno-edad': {
    title: 'Horas de Sueño Recomendadas por Edad — Calzix',
    description: 'Descubre cuántas horas de sueño se recomiendan según la edad, de bebés a mayores, según la National Sleep Foundation y la Sociedad Española de Sueño.',
    canonical: 'https://calzix.com/horas-sueno-edad',
  },
  'interes-compuesto': {
    title: 'Calculadora de Interés Compuesto con Aportaciones — Calzix',
    description: 'Calcula cuánto crece tu ahorro con interés compuesto y aportaciones periódicas: capital final, intereses y evolución año a año en euros.',
    canonical: 'https://calzix.com/interes-compuesto',
  },
  'calculadora-edad': {
    title: 'Calculadora de Edad: años, meses y días exactos — Calzix',
    description: 'Calcula tu edad exacta en años, meses y días desde tu fecha de nacimiento y cuántos días faltan para tu cumpleaños. Gratis.',
    canonical: 'https://calzix.com/calculadora-edad',
  },
};
