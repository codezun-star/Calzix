/**
 * Parámetros oficiales de España para 2026. Fuente única de verdad para las
 * calculadoras fiscales y laborales: si cambia una cifra (nuevo SMI, orden de
 * cotización, escala del IRPF…), se actualiza aquí y en el texto de las
 * páginas que la citan. Revisado el 13-oct-2026.
 */

export const ANIO_FISCAL = 2026;

/** Salario mínimo interprofesional 2026 (RD 126/2026, BOE 19-feb-2026). */
export const SMI = {
  mensual14: 1221,
  anual: 17094,
  diario: 40.7,
} as const;

/** IPREM 2026 (congelado: PGE 2023 prorrogados). */
export const IPREM = { mensual: 600, anual12: 7200, anual14: 8400 } as const;

/** Cotización a la Seguridad Social 2026 (Orden PJC/297/2026). Porcentajes. */
export const COTIZACION = {
  baseMaximaMensual: 5101.2,
  baseMinimaMensual: 1424.4,
  trabajador: {
    contingenciasComunes: 4.7,
    desempleoIndefinido: 1.55,
    desempleoTemporal: 1.6,
    formacionProfesional: 0.1,
    mei: 0.15,
  },
  empresa: {
    contingenciasComunes: 23.6,
    desempleoIndefinido: 5.5,
    desempleoTemporal: 6.7,
    fogasa: 0.2,
    formacionProfesional: 0.6,
    mei: 0.75,
    /** Accidentes de trabajo y enfermedad profesional: depende de la actividad (CNAE). Valor orientativo de oficina. */
    atEpOrientativo: 1.5,
  },
} as const;

/** Escala de retención del IRPF (art. 85.1 RIRPF), sin cambios desde 2021. */
export const ESCALA_RETENCION: ReadonlyArray<{ hasta: number; tipo: number }> = [
  { hasta: 12450, tipo: 19 },
  { hasta: 20200, tipo: 24 },
  { hasta: 35200, tipo: 30 },
  { hasta: 60000, tipo: 37 },
  { hasta: 300000, tipo: 45 },
  { hasta: Infinity, tipo: 47 },
];

/** Reducción por obtención de rendimientos del trabajo (art. 20 LIRPF). */
export const REDUCCION_TRABAJO = {
  umbral1: 14852,
  maxima: 7302,
  umbral2: 17673.52,
  coef1: 1.75,
  base2: 2364.34,
  umbral3: 19747.5,
  coef2: 1.14,
} as const;

/** Gastos deducibles generales del trabajo (art. 19.2.f LIRPF). */
export const OTROS_GASTOS_TRABAJO = 2000;

/** Mínimo personal y familiar (arts. 57-58 LIRPF). */
export const MINIMOS = {
  personal: 5550,
  mayor65: 1150,
  mayor75: 1400,
  descendientes: [2400, 2700, 4000, 4500] as const,
  descendienteMenor3: 2800,
} as const;

/**
 * Límite excluyente de retención (art. 81.1 RIRPF), situación 3 ("resto de
 * casos"): por debajo de esta retribución no se practica retención.
 */
export const LIMITE_EXCLUYENTE_SIT3: Readonly<Record<0 | 1 | 2, number>> = {
  0: 15876,
  1: 16342,
  2: 16867,
};

/** Tope de retención: 43 % de la diferencia entre retribución y límite excluyente (art. 85.3 RIRPF). */
export const TOPE_RETENCION = 0.43;

/** Tipo mínimo de retención en contratos de duración inferior a un año (art. 86.2 RIRPF). */
export const TIPO_MINIMO_TEMPORAL = 2;

/** Deducción por obtención de rendimientos del trabajo para perceptores del SMI (RDL 5/2026). */
export const DEDUCCION_SMI = {
  maxima: 590.89,
  hasta: 17094,
  coef: 0.2,
  limite: 20048.45,
} as const;

/** IVA (Ley 37/1992) e IGIC (Canarias). */
export const IVA = { general: 21, reducido: 10, superreducido: 4 } as const;
export const IGIC_GENERAL = 7;

/** Interés legal del dinero y de demora 2026. */
export const INTERES = {
  legal: 3.25,
  demoraTributaria: 4.0625,
  /** Ley 3/2004, operaciones comerciales, 2.º semestre 2026 (BCE 2,40 % + 8). */
  demoraComercial: 10.4,
  /** Indemnización por costes de cobro (art. 8 Ley 3/2004). */
  costesCobro: 40,
} as const;

/** Euríbor a 12 meses: última media mensual publicada. */
export const EURIBOR = { valor: 3.251, mes: 'septiembre de 2026' } as const;

/** Gas natural: TUR del 4.º trimestre de 2026, sin impuestos. */
export const TUR_GAS = {
  periodo: 'octubre-diciembre de 2026',
  tur1: { hastaKwhAnual: 5000, fijoMes: 3.83, variableKwh: 0.0525 },
  tur2: { hastaKwhAnual: 15000, fijoMes: 8.17, variableKwh: 0.0504 },
  /** Impuesto especial sobre hidrocarburos, uso doméstico (0,65 €/GJ). */
  impuestoHidrocarburosKwh: 0.00234,
  /** Factor de conversión orientativo de m³ a kWh (PCS medio de la red). */
  kwhPorM3: 11.7,
} as const;

/** Precio medio PVPC 2026 (enero-octubre), con peajes y cargos, sin impuestos. */
export const PRECIO_LUZ_PVPC_MEDIO = 0.147;

/**
 * Becas del Ministerio de Educación, curso 2026-2027 (Real Decreto 179/2026).
 * Umbrales de renta familiar por número de miembros (1 a 8). Para el umbral 1
 * y el 3 el real decreto da una franja: se usa el extremo inferior (el más
 * prudente) y se guarda el superior para avisar de los casos dudosos.
 */
export const BECAS = {
  curso: '2026-2027',
  norma: 'Real Decreto 179/2026',
  umbral1: [8843, 13264, 17685, 22107, 25644, 29181, 32718, 36255],
  umbral1Sup: [9315, 13971, 18629, 23286, 27012, 30738, 34463, 38190],
  umbral2: [13898, 23724, 32201, 38242, 42743, 46142, 49503, 52850],
  umbral3: [14818, 25293, 34332, 40773, 45572, 49196, 52780, 56348],
  umbral3Sup: [15567, 26573, 36070, 42836, 47878, 51685, 55451, 59199],
  /** Incremento por cada miembro a partir del octavo. */
  extraMiembro: { umbral1: 3536, umbral2: 3340, umbral3: 3561 },
  cuantias: {
    renta: 1700,
    residencia: 2700,
    basica: 300,
    basicaGradoBasico: 350,
    variableMinima: 60,
    excelencia: { min: 50, max: 125 },
  },
  /** Nota mínima en 1.º de grado (nota de acceso sin fase específica). */
  notaMatricula: 5,
  notaCuantias: 6.5,
  notaExcelencia: 8,
} as const;

/** Umbral de renta de becas para N miembros (con el incremento a partir del octavo). */
export function umbralBeca(lista: readonly number[], extra: number, miembros: number): number {
  const n = Math.max(1, Math.round(miembros));
  if (n <= lista.length) return lista[n - 1];
  return lista[lista.length - 1] + (n - lista.length) * extra;
}

/**
 * Factor de emisión orientativo de la red eléctrica española (kg CO₂ por kWh
 * consumido). La generación de 2024-2025 se movió entre 0,10 y 0,13.
 */
export const FACTOR_EMISION_RED = 0.12;

/** Precios medios de los carburantes en España (Boletín Petrolero UE, 5-oct-2026), €/l. */
export const CARBURANTES = { gasolina95: 1.85, diesel: 1.92, fecha: 'octubre de 2026' } as const;
