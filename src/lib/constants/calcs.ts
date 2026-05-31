export type CalcDomain =
  // Matemáticas
  | 'matematicas-basicas'
  | 'algebra'
  | 'geometria'
  | 'estadistica'
  | 'trigonometria'
  | 'probabilidad'
  // Ciencias
  | 'fisica'
  | 'quimica'
  // Conversión
  | 'longitud'
  | 'peso'
  | 'temperatura'
  | 'velocidad'
  | 'area'
  | 'volumen'
  | 'energia'
  | 'presion'
  | 'tiempo'
  | 'datos'
  | 'angulos'
  | 'monedas'
  // Hogar
  | 'construccion'
  | 'pintura'
  | 'electricidad'
  | 'hipoteca'
  | 'consumo'
  | 'jardin'
  // Trabajo
  | 'facturacion'
  | 'descuentos'
  | 'nomina'
  | 'productividad'
  | 'propinas'
  // Educación
  | 'notas'
  | 'becas'
  | 'estudio'
  | 'lectura'
  // Viaje
  | 'combustible'
  | 'distancia'
  | 'zonas'
  | 'equipaje'
  | 'coste-viaje'
  // Naturaleza
  | 'carbono'
  | 'agua'
  | 'solar'
  | 'reciclaje'
  // Ocio
  | 'amor'
  | 'suerte'
  | 'numerologia'
  | 'sueno';

export interface CalcMeta {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  domain: CalcDomain;
  icon: string; // nombre del icono Lucide
  related: string[];
}

export interface DomainMeta { id: CalcDomain; label: string }
export interface GroupMeta {
  id: string;
  slug: string;
  label: string;
  description: string;
  domains: DomainMeta[];
}

export const CALC_GROUPS: GroupMeta[] = [
  {
    id: 'matematicas', slug: 'matematicas', label: 'Matemáticas',
    description: 'Calculadoras de aritmética, álgebra, geometría, estadística, trigonometría y probabilidad.',
    domains: [
      { id: 'matematicas-basicas', label: 'Básicas' },
      { id: 'algebra',             label: 'Álgebra' },
      { id: 'geometria',           label: 'Geometría' },
      { id: 'estadistica',         label: 'Estadística' },
      { id: 'trigonometria',       label: 'Trigonometría' },
      { id: 'probabilidad',        label: 'Probabilidad' },
    ],
  },
  {
    id: 'ciencias', slug: 'ciencias', label: 'Ciencias',
    description: 'Calculadoras de física y química para estudiantes y profesionales.',
    domains: [
      { id: 'fisica',  label: 'Física' },
      { id: 'quimica', label: 'Química' },
    ],
  },
  {
    id: 'conversion', slug: 'conversion', label: 'Conversión',
    description: 'Convierte entre todas las unidades del sistema métrico e imperial: longitud, peso, temperatura, velocidad y más.',
    domains: [
      { id: 'longitud',    label: 'Longitud y distancia' },
      { id: 'peso',        label: 'Peso y masa' },
      { id: 'temperatura', label: 'Temperatura' },
      { id: 'velocidad',   label: 'Velocidad' },
      { id: 'area',        label: 'Área y superficie' },
      { id: 'volumen',     label: 'Volumen y capacidad' },
      { id: 'energia',     label: 'Energía y potencia' },
      { id: 'presion',     label: 'Presión' },
      { id: 'tiempo',      label: 'Tiempo y duración' },
      { id: 'datos',       label: 'Datos digitales' },
      { id: 'angulos',     label: 'Ángulos' },
      { id: 'monedas',     label: 'Monedas' },
    ],
  },
  {
    id: 'hogar', slug: 'hogar', label: 'Hogar',
    description: 'Calculadoras para construcción, pintura, electricidad, hipotecas y eficiencia energética del hogar.',
    domains: [
      { id: 'construccion', label: 'Construcción' },
      { id: 'pintura',      label: 'Pintura y superficies' },
      { id: 'electricidad', label: 'Electricidad del hogar' },
      { id: 'hipoteca',     label: 'Hipoteca y alquiler' },
      { id: 'consumo',      label: 'Consumo energético' },
      { id: 'jardin',       label: 'Jardín y terreno' },
    ],
  },
  {
    id: 'trabajo', slug: 'trabajo', label: 'Trabajo',
    description: 'Calculadoras de facturación, IVA, descuentos, nóminas, productividad y propinas.',
    domains: [
      { id: 'facturacion',   label: 'Facturación e IVA' },
      { id: 'descuentos',    label: 'Descuentos y márgenes' },
      { id: 'nomina',        label: 'Nómina y salario' },
      { id: 'productividad', label: 'Productividad' },
      { id: 'propinas',      label: 'Propinas y cuenta' },
    ],
  },
  {
    id: 'educacion', slug: 'educacion', label: 'Educación',
    description: 'Calculadoras de notas, becas, planificación de estudio y velocidad de lectura.',
    domains: [
      { id: 'notas',   label: 'Notas y promedios' },
      { id: 'becas',   label: 'Becas y financiamiento' },
      { id: 'estudio', label: 'Tiempo de estudio' },
      { id: 'lectura', label: 'Lectura y velocidad' },
    ],
  },
  {
    id: 'viaje', slug: 'viaje', label: 'Viaje',
    description: 'Calculadoras de combustible, distancia, zonas horarias, equipaje y coste de viaje.',
    domains: [
      { id: 'combustible', label: 'Combustible y ruta' },
      { id: 'distancia',   label: 'Distancia y ruta' },
      { id: 'zonas',       label: 'Zonas horarias' },
      { id: 'equipaje',    label: 'Equipaje y peso' },
      { id: 'coste-viaje', label: 'Coste de viaje' },
    ],
  },
  {
    id: 'naturaleza', slug: 'naturaleza', label: 'Naturaleza',
    description: 'Calculadoras de huella de carbono, consumo de agua, energía solar y reciclaje.',
    domains: [
      { id: 'carbono',   label: 'Huella de carbono' },
      { id: 'agua',      label: 'Consumo de agua' },
      { id: 'solar',     label: 'Energía solar' },
      { id: 'reciclaje', label: 'Reciclaje' },
    ],
  },
  {
    id: 'ocio', slug: 'ocio', label: 'Ocio',
    description: 'Calculadoras lúdicas de compatibilidad, números de la suerte, numerología y sueño.',
    domains: [
      { id: 'amor',        label: 'Amor y compatibilidad' },
      { id: 'suerte',      label: 'Suerte y probabilidad' },
      { id: 'numerologia', label: 'Numerología' },
      { id: 'sueno',       label: 'Sueño y descanso' },
    ],
  },
];

export function getGroupBySlug(slug: string): GroupMeta | undefined {
  return CALC_GROUPS.find((g) => g.slug === slug);
}

export function getDomainGroup(domain: CalcDomain): GroupMeta | undefined {
  return CALC_GROUPS.find((g) => g.domains.some((d) => d.id === domain));
}

// Registro de calculadoras — añadir una entrada por herramienta nueva
export const CALCS: CalcMeta[] = [
  // ── Matemáticas ──────────────────────────────────────────────────────────
  {
    slug: 'calculadora-porcentaje',
    name: 'Calculadora de Porcentaje',
    description: 'Calcula porcentajes, variaciones y proporciones al instante.',
    longDescription: 'Obtén el porcentaje de una cantidad, calcula qué porcentaje representa un número sobre otro o halla el valor original a partir de un porcentaje dado.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Percent',
    related: ['calculadora-descuento', 'calculadora-iva', 'nota-media'],
  },
  {
    slug: 'ecuacion-lineal',
    name: 'Ecuación Lineal',
    description: 'Resuelve ecuaciones de primer grado ax + b = 0.',
    longDescription: 'Introduce los coeficientes de tu ecuación lineal y obtén el valor de x en un solo paso, con los pasos de resolución explicados.',
    category: 'Álgebra',
    domain: 'algebra',
    icon: 'SquareFunction',
    related: ['calculadora-porcentaje', 'seno-coseno', 'probabilidad-simple'],
  },
  {
    slug: 'area-figuras',
    name: 'Área de Figuras',
    description: 'Calcula el área de círculos, triángulos, rectángulos y más.',
    longDescription: 'Selecciona la figura geométrica e introduce sus medidas para obtener el área y el perímetro de forma inmediata.',
    category: 'Geometría',
    domain: 'geometria',
    icon: 'Triangle',
    related: ['conversor-area', 'area-jardin', 'calculadora-pintura'],
  },
  {
    slug: 'media-mediana-moda',
    name: 'Media, Mediana y Moda',
    description: 'Obtén las medidas de tendencia central de tu conjunto de datos.',
    longDescription: 'Introduce una lista de números separados por comas y calcula automáticamente la media aritmética, la mediana y la moda.',
    category: 'Estadística',
    domain: 'estadistica',
    icon: 'BarChart2',
    related: ['probabilidad-simple', 'calculadora-porcentaje', 'nota-media'],
  },
  {
    slug: 'seno-coseno',
    name: 'Seno, Coseno y Tangente',
    description: 'Calcula las razones trigonométricas de cualquier ángulo.',
    longDescription: 'Introduce un ángulo en grados o radianes y obtén al instante su seno, coseno, tangente y las razones inversas.',
    category: 'Trigonometría',
    domain: 'trigonometria',
    icon: 'Sigma',
    related: ['conversor-angulos', 'area-figuras', 'ecuacion-lineal'],
  },
  {
    slug: 'probabilidad-simple',
    name: 'Probabilidad Simple',
    description: 'Calcula la probabilidad de un evento favorable sobre el total.',
    longDescription: 'Introduce el número de casos favorables y el total posible para obtener la probabilidad como fracción, decimal y porcentaje.',
    category: 'Probabilidad',
    domain: 'probabilidad',
    icon: 'Shuffle',
    related: ['media-mediana-moda', 'numeros-suerte', 'ecuacion-lineal'],
  },
  // ── Ciencias ─────────────────────────────────────────────────────────────
  {
    slug: 'velocidad-distancia-tiempo',
    name: 'Velocidad, Distancia y Tiempo',
    description: 'Despeja cualquier variable de la fórmula v = d / t.',
    longDescription: 'Introduce dos de las tres variables —velocidad, distancia o tiempo— y la calculadora despeja automáticamente la tercera.',
    category: 'Física',
    domain: 'fisica',
    icon: 'Zap',
    related: ['calculadora-distancia', 'consumo-combustible', 'conversor-velocidad'],
  },
  {
    slug: 'concentracion-molar',
    name: 'Concentración Molar',
    description: 'Calcula molaridad, moles y volumen de disoluciones.',
    longDescription: 'Introduce la masa del soluto, su masa molar y el volumen de la disolución para obtener la concentración molar en mol/L.',
    category: 'Química',
    domain: 'quimica',
    icon: 'FlaskConical',
    related: ['velocidad-distancia-tiempo', 'conversor-volumen', 'conversor-peso'],
  },
  // ── Conversión ───────────────────────────────────────────────────────────
  {
    slug: 'conversor-longitud',
    name: 'Conversor de Longitud',
    description: 'Convierte metros, kilómetros, millas, pies, pulgadas y más.',
    longDescription: 'Convierte al instante entre todas las unidades de longitud del sistema métrico e imperial: metros, kilómetros, centímetros, millas, yardas, pies y pulgadas.',
    category: 'Longitud y distancia',
    domain: 'longitud',
    icon: 'Ruler',
    related: ['conversor-peso', 'conversor-velocidad', 'calculadora-distancia'],
  },
  {
    slug: 'conversor-peso',
    name: 'Conversor de Peso',
    description: 'Convierte kilos, libras, onzas, gramos y toneladas.',
    longDescription: 'Transforma al instante entre unidades de peso y masa: kilogramos, gramos, miligramos, libras, onzas y toneladas métricas.',
    category: 'Peso y masa',
    domain: 'peso',
    icon: 'Weight',
    related: ['conversor-longitud', 'peso-equipaje', 'concentracion-molar'],
  },
  {
    slug: 'conversor-temperatura',
    name: 'Conversor de Temperatura',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin.',
    longDescription: 'Introduce cualquier temperatura en Celsius, Fahrenheit o Kelvin y obtén al instante la equivalencia en las otras dos escalas.',
    category: 'Temperatura',
    domain: 'temperatura',
    icon: 'Thermometer',
    related: ['conversor-longitud', 'conversor-velocidad', 'ahorro-energetico'],
  },
  {
    slug: 'conversor-velocidad',
    name: 'Conversor de Velocidad',
    description: 'Convierte km/h, m/s, mph, nudos y más.',
    longDescription: 'Transforma al instante entre unidades de velocidad: kilómetros por hora, metros por segundo, millas por hora, nudos y pies por segundo.',
    category: 'Velocidad',
    domain: 'velocidad',
    icon: 'Gauge',
    related: ['velocidad-distancia-tiempo', 'conversor-longitud', 'consumo-combustible'],
  },
  {
    slug: 'conversor-area',
    name: 'Conversor de Área',
    description: 'Convierte m², hectáreas, km², acres, pies² y más.',
    longDescription: 'Convierte entre unidades de superficie del sistema métrico e imperial: metros cuadrados, hectáreas, kilómetros cuadrados, acres y pies cuadrados.',
    category: 'Área y superficie',
    domain: 'area',
    icon: 'LayoutGrid',
    related: ['area-figuras', 'area-jardin', 'calculadora-pintura'],
  },
  {
    slug: 'conversor-volumen',
    name: 'Conversor de Volumen',
    description: 'Convierte litros, m³, galones, pinta, taza y más.',
    longDescription: 'Transforma al instante entre unidades de volumen y capacidad: litros, mililitros, metros cúbicos, galones, pintas y tazas.',
    category: 'Volumen y capacidad',
    domain: 'volumen',
    icon: 'Box',
    related: ['conversor-peso', 'concentracion-molar', 'consumo-agua'],
  },
  {
    slug: 'conversor-energia',
    name: 'Conversor de Energía',
    description: 'Convierte julios, calorías, kWh, BTU y más.',
    longDescription: 'Convierte entre unidades de energía y potencia: julios, kilojulios, calorías, kilocalorías, kilovatios hora y BTU.',
    category: 'Energía y potencia',
    domain: 'energia',
    icon: 'Battery',
    related: ['ahorro-energetico', 'ahorro-solar', 'consumo-electrico'],
  },
  {
    slug: 'conversor-presion',
    name: 'Conversor de Presión',
    description: 'Convierte pascales, bar, atm, psi y más.',
    longDescription: 'Transforma al instante entre unidades de presión: pascales, kilopascales, bar, atmósferas, milímetros de mercurio y PSI.',
    category: 'Presión',
    domain: 'presion',
    icon: 'Wind',
    related: ['velocidad-distancia-tiempo', 'conversor-temperatura', 'concentracion-molar'],
  },
  {
    slug: 'conversor-tiempo',
    name: 'Conversor de Tiempo',
    description: 'Convierte segundos, minutos, horas, días, semanas y años.',
    longDescription: 'Convierte al instante entre unidades de tiempo: segundos, minutos, horas, días, semanas, meses y años.',
    category: 'Tiempo y duración',
    domain: 'tiempo',
    icon: 'Clock',
    related: ['diferencia-horaria', 'tiempo-estudio', 'calculadora-productividad'],
  },
  {
    slug: 'conversor-datos',
    name: 'Conversor de Datos',
    description: 'Convierte bits, bytes, KB, MB, GB, TB y más.',
    longDescription: 'Transforma al instante entre unidades de almacenamiento digital: bits, bytes, kilobytes, megabytes, gigabytes y terabytes.',
    category: 'Datos digitales',
    domain: 'datos',
    icon: 'HardDrive',
    related: ['conversor-velocidad', 'calculadora-productividad'],
  },
  {
    slug: 'conversor-angulos',
    name: 'Conversor de Ángulos',
    description: 'Convierte grados, radianes, gradianes y vueltas.',
    longDescription: 'Convierte entre unidades angulares: grados sexagesimales, radianes, gradianes y vueltas completas.',
    category: 'Ángulos',
    domain: 'angulos',
    icon: 'Compass',
    related: ['seno-coseno', 'area-figuras', 'conversor-tiempo'],
  },
  {
    slug: 'conversor-monedas',
    name: 'Conversor de Monedas',
    description: 'Convierte entre las principales monedas del mundo.',
    longDescription: 'Introduce un importe y selecciona la moneda de origen y destino para obtener la conversión aproximada entre EUR, USD, GBP, JPY y más.',
    category: 'Monedas',
    domain: 'monedas',
    icon: 'DollarSign',
    related: ['calculadora-iva', 'calculadora-descuento', 'coste-viaje'],
  },
  // ── Hogar ────────────────────────────────────────────────────────────────
  {
    slug: 'materiales-construccion',
    name: 'Materiales de Construcción',
    description: 'Estima la cantidad de cemento, ladrillos o azulejos que necesitas.',
    longDescription: 'Introduce las dimensiones de tu proyecto y calcula automáticamente los materiales necesarios: cemento, arena, ladrillos o azulejos, con un margen de desperdicio incluido.',
    category: 'Construcción',
    domain: 'construccion',
    icon: 'Hammer',
    related: ['calculadora-pintura', 'area-jardin', 'conversor-area'],
  },
  {
    slug: 'calculadora-pintura',
    name: 'Calculadora de Pintura',
    description: 'Calcula los litros de pintura necesarios para tus paredes.',
    longDescription: 'Introduce las dimensiones de la habitación, descuenta puertas y ventanas, y obtén los litros de pintura necesarios con el rendimiento por litro.',
    category: 'Pintura y superficies',
    domain: 'pintura',
    icon: 'Paintbrush',
    related: ['materiales-construccion', 'conversor-area', 'area-figuras'],
  },
  {
    slug: 'consumo-electrico',
    name: 'Consumo Eléctrico',
    description: 'Calcula el coste eléctrico de tus electrodomésticos.',
    longDescription: 'Introduce la potencia en vatios, las horas de uso diarias y el precio del kWh para obtener el coste diario, mensual y anual de cualquier aparato.',
    category: 'Electricidad del hogar',
    domain: 'electricidad',
    icon: 'Zap',
    related: ['ahorro-energetico', 'ahorro-solar', 'conversor-energia'],
  },
  {
    slug: 'calculadora-hipoteca',
    name: 'Calculadora de Hipoteca',
    description: 'Calcula tu cuota mensual y el coste total de la hipoteca.',
    longDescription: 'Introduce el importe del préstamo, el tipo de interés anual y el plazo en años para obtener la cuota mensual, el total pagado y los intereses totales.',
    category: 'Hipoteca y alquiler',
    domain: 'hipoteca',
    icon: 'Home',
    related: ['calculadora-iva', 'calculadora-nomina', 'calculadora-beca'],
  },
  {
    slug: 'ahorro-energetico',
    name: 'Ahorro Energético',
    description: 'Compara el consumo de dos aparatos y calcula cuánto ahorras.',
    longDescription: 'Introduce la potencia y horas de uso de tu aparato actual frente al nuevo para calcular el ahorro energético anual y el tiempo de amortización.',
    category: 'Consumo energético',
    domain: 'consumo',
    icon: 'Leaf',
    related: ['consumo-electrico', 'ahorro-solar', 'conversor-energia'],
  },
  {
    slug: 'area-jardin',
    name: 'Área del Jardín',
    description: 'Calcula el área de tu jardín y estima el material necesario.',
    longDescription: 'Introduce las dimensiones de tu terreno para obtener el área total, y calcula la cantidad de césped, tierra o grava que necesitas.',
    category: 'Jardín y terreno',
    domain: 'jardin',
    icon: 'Sprout',
    related: ['materiales-construccion', 'conversor-area', 'calculadora-pintura'],
  },
  // ── Trabajo ──────────────────────────────────────────────────────────────
  {
    slug: 'calculadora-iva',
    name: 'Calculadora de IVA',
    description: 'Añade o extrae el IVA de cualquier importe al instante.',
    longDescription: 'Introduce el importe y el tipo de IVA para calcular el precio con IVA incluido, o extrae el IVA de un precio ya incluido.',
    category: 'Facturación e IVA',
    domain: 'facturacion',
    icon: 'Receipt',
    related: ['calculadora-descuento', 'calculadora-porcentaje', 'calculadora-nomina'],
  },
  {
    slug: 'calculadora-descuento',
    name: 'Calculadora de Descuentos',
    description: 'Calcula el precio final tras aplicar uno o varios descuentos.',
    longDescription: 'Introduce el precio original y el porcentaje de descuento para obtener el precio rebajado, el importe ahorrado y el margen comercial.',
    category: 'Descuentos y márgenes',
    domain: 'descuentos',
    icon: 'Tag',
    related: ['calculadora-iva', 'calculadora-porcentaje', 'calculadora-propina'],
  },
  {
    slug: 'calculadora-nomina',
    name: 'Calculadora de Nómina',
    description: 'Estima tu salario neto a partir del salario bruto anual.',
    longDescription: 'Introduce tu salario bruto anual, las retenciones de IRPF y las cotizaciones a la Seguridad Social para obtener una estimación del salario neto mensual.',
    category: 'Nómina y salario',
    domain: 'nomina',
    icon: 'Briefcase',
    related: ['calculadora-iva', 'calculadora-hipoteca', 'calculadora-productividad'],
  },
  {
    slug: 'calculadora-productividad',
    name: 'Productividad y Tiempo',
    description: 'Calcula tu tarifa horaria, rentabilidad y tiempo por tarea.',
    longDescription: 'Introduce tu salario objetivo y las horas trabajadas para obtener tu tarifa horaria ideal, o calcula cuánto vale tu tiempo en cada tarea.',
    category: 'Productividad',
    domain: 'productividad',
    icon: 'ListChecks',
    related: ['calculadora-nomina', 'tiempo-estudio', 'velocidad-lectura'],
  },
  {
    slug: 'calculadora-propina',
    name: 'Calculadora de Propina',
    description: 'Divide la cuenta y calcula la propina entre comensales.',
    longDescription: 'Introduce el importe total, el porcentaje de propina y el número de comensales para obtener cuánto debe pagar cada persona.',
    category: 'Propinas y cuenta',
    domain: 'propinas',
    icon: 'CreditCard',
    related: ['calculadora-descuento', 'calculadora-iva', 'coste-viaje'],
  },
  // ── Educación ────────────────────────────────────────────────────────────
  {
    slug: 'nota-media',
    name: 'Nota Media',
    description: 'Calcula tu nota media ponderada por créditos o porcentajes.',
    longDescription: 'Introduce tus notas y su peso o créditos para obtener la media ponderada, y calcula qué nota necesitas en el siguiente examen.',
    category: 'Notas y promedios',
    domain: 'notas',
    icon: 'GraduationCap',
    related: ['media-mediana-moda', 'calculadora-beca', 'tiempo-estudio'],
  },
  {
    slug: 'calculadora-beca',
    name: 'Calculadora de Beca',
    description: 'Estima si cumples los requisitos de renta para una beca.',
    longDescription: 'Introduce los ingresos familiares y el número de miembros del hogar para estimar el umbral de renta y tu elegibilidad para becas estatales.',
    category: 'Becas y financiamiento',
    domain: 'becas',
    icon: 'BookMarked',
    related: ['nota-media', 'calculadora-hipoteca', 'calculadora-nomina'],
  },
  {
    slug: 'tiempo-estudio',
    name: 'Tiempo de Estudio',
    description: 'Planifica cuántas horas necesitas estudiar para tu examen.',
    longDescription: 'Introduce el número de temas, las horas disponibles por día y los días hasta el examen para obtener un plan de estudio equilibrado.',
    category: 'Tiempo de estudio',
    domain: 'estudio',
    icon: 'Timer',
    related: ['nota-media', 'calculadora-productividad', 'velocidad-lectura'],
  },
  {
    slug: 'velocidad-lectura',
    name: 'Velocidad de Lectura',
    description: 'Mide tu velocidad lectora y estima cuánto tardas en un libro.',
    longDescription: 'Lee un texto de muestra durante un minuto, introduce las palabras leídas y obtén tu velocidad lectora en ppm y el tiempo estimado para cualquier libro.',
    category: 'Lectura y velocidad',
    domain: 'lectura',
    icon: 'BookOpen',
    related: ['tiempo-estudio', 'calculadora-productividad', 'nota-media'],
  },
  // ── Viaje ────────────────────────────────────────────────────────────────
  {
    slug: 'consumo-combustible',
    name: 'Consumo de Combustible',
    description: 'Calcula el gasto en gasolina o diésel de tu viaje.',
    longDescription: 'Introduce la distancia, el consumo del vehículo en L/100 km y el precio del combustible para obtener el coste total del trayecto.',
    category: 'Combustible y ruta',
    domain: 'combustible',
    icon: 'Car',
    related: ['calculadora-distancia', 'coste-viaje', 'huella-carbono'],
  },
  {
    slug: 'calculadora-distancia',
    name: 'Calculadora de Distancia',
    description: 'Convierte distancias y estima tiempos de viaje por velocidad.',
    longDescription: 'Introduce la distancia en kilómetros o millas y la velocidad media para calcular el tiempo de viaje, o convierte entre unidades de longitud.',
    category: 'Distancia y ruta',
    domain: 'distancia',
    icon: 'MapPin',
    related: ['consumo-combustible', 'conversor-longitud', 'velocidad-distancia-tiempo'],
  },
  {
    slug: 'diferencia-horaria',
    name: 'Diferencia Horaria',
    description: 'Calcula la diferencia horaria entre dos zonas del mundo.',
    longDescription: 'Selecciona dos zonas horarias y obtén la diferencia en horas, el horario equivalente y si se aplica el horario de verano.',
    category: 'Zonas horarias',
    domain: 'zonas',
    icon: 'Globe',
    related: ['conversor-tiempo', 'calculadora-distancia', 'coste-viaje'],
  },
  {
    slug: 'peso-equipaje',
    name: 'Calculadora de Equipaje',
    description: 'Comprueba si tu maleta cumple los límites de peso de la aerolínea.',
    longDescription: 'Introduce el peso de tu maleta, el límite de la aerolínea y el precio por kilo extra para saber si estás dentro del límite o cuánto te costará el exceso.',
    category: 'Equipaje y peso',
    domain: 'equipaje',
    icon: 'Package',
    related: ['conversor-peso', 'coste-viaje', 'calculadora-distancia'],
  },
  {
    slug: 'coste-viaje',
    name: 'Coste Total del Viaje',
    description: 'Suma todos los gastos de tu viaje y divídelos entre personas.',
    longDescription: 'Introduce los distintos gastos del viaje —vuelos, hotel, comida, transporte, actividades— y calcula el coste total y el coste por persona.',
    category: 'Coste de viaje',
    domain: 'coste-viaje',
    icon: 'Wallet',
    related: ['consumo-combustible', 'calculadora-propina', 'conversor-monedas'],
  },
  // ── Naturaleza ───────────────────────────────────────────────────────────
  {
    slug: 'huella-carbono',
    name: 'Huella de Carbono',
    description: 'Estima tu huella de CO₂ anual por transporte y hogar.',
    longDescription: 'Introduce tus hábitos de transporte y consumo energético doméstico para estimar tu huella de carbono anual en toneladas de CO₂ equivalente.',
    category: 'Huella de carbono',
    domain: 'carbono',
    icon: 'Leaf',
    related: ['consumo-electrico', 'ahorro-energetico', 'ahorro-solar'],
  },
  {
    slug: 'consumo-agua',
    name: 'Consumo de Agua',
    description: 'Calcula tu consumo diario de agua y su coste mensual.',
    longDescription: 'Introduce tus hábitos de consumo de agua —duchas, lavadora, lavavajillas, riego— para calcular el total de litros diarios y el coste mensual.',
    category: 'Consumo de agua',
    domain: 'agua',
    icon: 'Droplets',
    related: ['huella-carbono', 'ahorro-energetico', 'area-jardin'],
  },
  {
    slug: 'ahorro-solar',
    name: 'Ahorro con Paneles Solares',
    description: 'Estima el ahorro anual y el retorno de inversión de tu instalación solar.',
    longDescription: 'Introduce la potencia instalada, las horas de sol diarias y el precio del kWh para calcular la energía generada, el ahorro anual y los años de amortización.',
    category: 'Energía solar',
    domain: 'solar',
    icon: 'Sun',
    related: ['consumo-electrico', 'ahorro-energetico', 'conversor-energia'],
  },
  {
    slug: 'calculadora-reciclaje',
    name: 'Calculadora de Reciclaje',
    description: 'Calcula el impacto ambiental de tus residuos reciclados.',
    longDescription: 'Introduce los kilos de papel, plástico, vidrio y metal que reciclas al mes para estimar el CO₂ evitado, el agua ahorrada y los árboles equivalentes.',
    category: 'Reciclaje',
    domain: 'reciclaje',
    icon: 'Recycle',
    related: ['huella-carbono', 'consumo-agua', 'ahorro-energetico'],
  },
  // ── Ocio ─────────────────────────────────────────────────────────────────
  {
    slug: 'test-compatibilidad',
    name: 'Test de Compatibilidad',
    description: 'Descubre tu porcentaje de compatibilidad de pareja.',
    longDescription: 'Introduce los nombres de dos personas para obtener un índice de compatibilidad basado en un análisis lúdico de las letras y los números.',
    category: 'Amor y compatibilidad',
    domain: 'amor',
    icon: 'Heart',
    related: ['numeros-suerte', 'numero-numerologia', 'probabilidad-simple'],
  },
  {
    slug: 'numeros-suerte',
    name: 'Números de la Suerte',
    description: 'Genera tus números de la suerte personalizados.',
    longDescription: 'Obtén una combinación aleatoria de números de la suerte para lotería, primitiva o cualquier juego de azar, de forma completamente aleatoria.',
    category: 'Suerte y probabilidad',
    domain: 'suerte',
    icon: 'Star',
    related: ['probabilidad-simple', 'test-compatibilidad', 'numero-numerologia'],
  },
  {
    slug: 'numero-numerologia',
    name: 'Número de Numerología',
    description: 'Calcula tu número personal de la vida según la numerología.',
    longDescription: 'Introduce tu nombre completo o fecha de nacimiento para obtener tu número de la vida, número del destino y otros valores numerológicos.',
    category: 'Numerología',
    domain: 'numerologia',
    icon: 'Hash',
    related: ['test-compatibilidad', 'numeros-suerte', 'probabilidad-simple'],
  },
  {
    slug: 'calculadora-sueno',
    name: 'Calculadora de Sueño',
    description: 'Calcula la hora ideal para despertar según los ciclos de sueño.',
    longDescription: 'Introduce la hora a la que te vas a dormir y obtén las horas recomendadas para despertar de forma natural, respetando los ciclos de sueño de 90 minutos.',
    category: 'Sueño y descanso',
    domain: 'sueno',
    icon: 'Moon',
    related: ['tiempo-estudio', 'calculadora-productividad', 'test-compatibilidad'],
  },
  // ── Matemáticas (nuevas) ─────────────────────────────────────────────────
  {
    slug: 'calculadora-factorial',
    name: 'Calculadora de Factorial',
    description: 'Calcula el factorial de cualquier número entero.',
    longDescription: 'Introduce un número entero y obtén su factorial (n!), que es el producto de todos los enteros desde 1 hasta n.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Calculator',
    related: ['permutaciones-combinaciones', 'numero-primo', 'mcm-mcd'],
  },
  {
    slug: 'potencias-raices',
    name: 'Potencias y Raíces',
    description: 'Calcula potencias, raíces cuadradas y cúbicas.',
    longDescription: 'Introduce la base y el exponente para calcular cualquier potencia, o calcula raíces cuadradas, cúbicas y de orden n de un número.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Square',
    related: ['calculadora-factorial', 'numero-primo', 'ecuacion-lineal'],
  },
  {
    slug: 'mcm-mcd',
    name: 'MCM y MCD',
    description: 'Calcula el mínimo común múltiplo y el máximo común divisor.',
    longDescription: 'Introduce dos o más números y obtén el MCM (mínimo común múltiplo) y el MCD (máximo común divisor) al instante.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Divide',
    related: ['numero-primo', 'permutaciones-combinaciones', 'calculadora-factorial'],
  },
  {
    slug: 'numero-primo',
    name: 'Verificador de Número Primo',
    description: 'Comprueba si un número es primo o compuesto.',
    longDescription: 'Introduce un número entero positivo y obtén si es primo, además de sus divisores si es compuesto.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Hash',
    related: ['mcm-mcd', 'calculadora-factorial', 'media-mediana-moda'],
  },
  {
    slug: 'sistema-ecuaciones',
    name: 'Sistema de Ecuaciones Lineales',
    description: 'Resuelve sistemas de 2 o 3 ecuaciones lineales.',
    longDescription: 'Introduce los coeficientes de tu sistema de ecuaciones lineales (2x2 o 3x3) y obtén las soluciones de forma automática.',
    category: 'Álgebra',
    domain: 'algebra',
    icon: 'Grid3x3',
    related: ['ecuacion-lineal', 'funcion-cuadratica', 'seno-coseno'],
  },
  {
    slug: 'funcion-cuadratica',
    name: 'Función Cuadrática',
    description: 'Calcula raíces, vértice y propiedades de una parábola.',
    longDescription: 'Introduce los coeficientes a, b y c de una función cuadrática f(x)=ax²+bx+c y obtén las raíces, el vértice, el eje de simetría y más propiedades.',
    category: 'Álgebra',
    domain: 'algebra',
    icon: 'Parabola',
    related: ['sistema-ecuaciones', 'ecuacion-lineal', 'area-figuras'],
  },
  {
    slug: 'perimetro-figuras',
    name: 'Perímetro de Figuras',
    description: 'Calcula el perímetro de círculos, triángulos, rectángulos y más.',
    longDescription: 'Selecciona la figura geométrica, introduce sus dimensiones y obtén el perímetro de forma automática.',
    category: 'Geometría',
    domain: 'geometria',
    icon: 'Circle',
    related: ['area-figuras', 'volumen-solidos', 'teorema-pitagoras'],
  },
  {
    slug: 'volumen-solidos',
    name: 'Volumen de Sólidos',
    description: 'Calcula el volumen de esferas, cilindros, conos, cubos y más.',
    longDescription: 'Selecciona el sólido geométrico e introduce sus dimensiones para obtener el volumen automáticamente.',
    category: 'Geometría',
    domain: 'geometria',
    icon: 'Cube',
    related: ['perimetro-figuras', 'teorema-pitagoras', 'area-figuras'],
  },
  {
    slug: 'teorema-pitagoras',
    name: 'Teorema de Pitágoras',
    description: 'Calcula la hipotenusa o catetos de un triángulo rectángulo.',
    longDescription: 'Introduce dos lados de un triángulo rectángulo y obtén el tercero usando el teorema de Pitágoras (a² + b² = c²).',
    category: 'Geometría',
    domain: 'geometria',
    icon: 'Triangle',
    related: ['volumen-solidos', 'perimetro-figuras', 'seno-coseno'],
  },
  {
    slug: 'varianza-desviacion',
    name: 'Varianza y Desviación Típica',
    description: 'Calcula la varianza y la desviación estándar de tus datos.',
    longDescription: 'Introduce una serie de números separados por comas y obtén la varianza, la desviación estándar y otros indicadores de dispersión estadística.',
    category: 'Estadística',
    domain: 'estadistica',
    icon: 'TrendingUp',
    related: ['media-mediana-moda', 'correlacion-datos', 'distribucion-normal'],
  },
  {
    slug: 'correlacion-datos',
    name: 'Correlación de Datos',
    description: 'Calcula el coeficiente de correlación de Pearson entre dos variables.',
    longDescription: 'Introduce dos series de datos y obtén el coeficiente de correlación, que mide la relación lineal entre las variables.',
    category: 'Estadística',
    domain: 'estadistica',
    icon: 'LineChart',
    related: ['varianza-desviacion', 'media-mediana-moda', 'distribucion-normal'],
  },
  {
    slug: 'permutaciones-combinaciones',
    name: 'Permutaciones y Combinaciones',
    description: 'Calcula P(n,r) y C(n,r) para problemas de combinatoria.',
    longDescription: 'Introduce n y r para calcular permutaciones (importa el orden) y combinaciones (no importa el orden), también conocidas como variaciones.',
    category: 'Probabilidad',
    domain: 'probabilidad',
    icon: 'Layers',
    related: ['calculadora-factorial', 'probabilidad-simple', 'media-mediana-moda'],
  },
  {
    slug: 'distribucion-normal',
    name: 'Distribución Normal',
    description: 'Calcula probabilidades de la distribución normal estándar.',
    longDescription: 'Introduce el valor de z y obtén la probabilidad acumulada, la probabilidad entre dos valores y otros cálculos de la distribución normal.',
    category: 'Estadística',
    domain: 'estadistica',
    icon: 'Bell',
    related: ['varianza-desviacion', 'media-mediana-moda', 'probabilidad-simple'],
  },
  {
    slug: 'regla-tres',
    name: 'Calculadora de Regla de Tres',
    description: 'Resuelve reglas de tres simples y compuestas.',
    longDescription: 'Introduce tres valores conocidos en una proporción y obtén el valor desconocido usando la regla de tres.',
    category: 'Matemáticas básicas',
    domain: 'matematicas-basicas',
    icon: 'Ratio',
    related: ['calculadora-porcentaje', 'mcm-mcd', 'ecuacion-lineal'],
  },
];

export function getCalcsByDomain(domain: CalcDomain): CalcMeta[] {
  return CALCS.filter((c) => c.domain === domain);
}

export function getCalcBySlug(slug: string): CalcMeta | undefined {
  return CALCS.find((c) => c.slug === slug);
}

export function getRelatedCalcs(slug: string): CalcMeta[] {
  const calc = getCalcBySlug(slug);
  if (!calc) return [];
  return calc.related
    .map((s) => getCalcBySlug(s))
    .filter((c): c is CalcMeta => c !== undefined)
    .slice(0, 4);
}
