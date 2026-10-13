import {
  COTIZACION,
  ESCALA_RETENCION,
  REDUCCION_TRABAJO,
  OTROS_GASTOS_TRABAJO,
  MINIMOS,
  LIMITE_EXCLUYENTE_SIT3,
  TOPE_RETENCION,
  TIPO_MINIMO_TEMPORAL,
  DEDUCCION_SMI,
} from '@/lib/constants/espana';

/**
 * Cálculo orientativo de la nómina en España (2026) siguiendo el algoritmo de
 * retenciones de la Agencia Tributaria para un contribuyente en la situación
 * familiar 3 ("resto de casos"), sin discapacidad ni movilidad geográfica.
 */

export type TipoContrato = 'indefinido' | 'temporal';

export interface DatosNomina {
  /** Retribución bruta anual (€). */
  bruto: number;
  contrato?: TipoContrato;
  /** Hijos menores de 25 años a cargo. */
  hijos?: number;
  /** Cuántos de esos hijos son menores de 3 años. */
  hijosMenores3?: number;
  /** El mínimo por descendientes se reparte con el otro progenitor (lo habitual). */
  hijosCompartidos?: boolean;
  /** Edad del trabajador (incrementa el mínimo personal a partir de 65 años). */
  edad?: number;
}

export interface ResultadoNomina {
  bruto: number;
  cotizacion: number;
  tipoCotizacion: number;
  rendimientoNeto: number;
  reduccionTrabajo: number;
  baseRetencion: number;
  minimoPersonalFamiliar: number;
  cuotaRetencion: number;
  /** Tipo de retención en %, redondeado a dos decimales como en la nómina. */
  tipoRetencion: number;
  retencionAnual: number;
  netoAnual: number;
  /** Deducción SMI recuperable en la declaración de la Renta (no se aplica en la nómina). */
  deduccionSmiRenta: number;
}

/** Aplica la escala de retención a una base. */
export function cuotaEscala(base: number): number {
  let cuota = 0;
  let anterior = 0;
  for (const { hasta, tipo } of ESCALA_RETENCION) {
    if (base <= anterior) break;
    cuota += (Math.min(base, hasta) - anterior) * (tipo / 100);
    anterior = hasta;
  }
  return cuota;
}

/** Reducción por obtención de rendimientos del trabajo (art. 20 LIRPF). */
export function reduccionRendimientosTrabajo(rendimientoNeto: number): number {
  const r = REDUCCION_TRABAJO;
  if (rendimientoNeto <= r.umbral1) return r.maxima;
  if (rendimientoNeto <= r.umbral2) return Math.max(0, r.maxima - r.coef1 * (rendimientoNeto - r.umbral1));
  if (rendimientoNeto <= r.umbral3) return Math.max(0, r.base2 - r.coef2 * (rendimientoNeto - r.umbral2));
  return 0;
}

/** Tipo de cotización del trabajador (%). */
export function tipoCotizacionTrabajador(contrato: TipoContrato): number {
  const t = COTIZACION.trabajador;
  const desempleo = contrato === 'temporal' ? t.desempleoTemporal : t.desempleoIndefinido;
  return t.contingenciasComunes + desempleo + t.formacionProfesional + t.mei;
}

/** Mínimo por descendientes. */
function minimoDescendientes(hijos: number, menores3: number, compartidos: boolean): number {
  let total = 0;
  for (let i = 0; i < hijos; i++) {
    total += MINIMOS.descendientes[Math.min(i, MINIMOS.descendientes.length - 1)];
  }
  total += Math.min(menores3, hijos) * MINIMOS.descendienteMenor3;
  return compartidos ? total / 2 : total;
}

export function calcularNomina(datos: DatosNomina): ResultadoNomina {
  const {
    bruto,
    contrato = 'indefinido',
    hijos = 0,
    hijosMenores3 = 0,
    hijosCompartidos = true,
    edad = 40,
  } = datos;

  // 1. Cotizaciones del trabajador, con la base máxima anual como tope.
  const tipoCotizacion = tipoCotizacionTrabajador(contrato);
  const baseCotizacion = Math.min(bruto, COTIZACION.baseMaximaMensual * 12);
  const cotizacion = baseCotizacion * (tipoCotizacion / 100);

  // 2. Rendimiento neto y reducción por rendimientos del trabajo.
  const rendimientoNeto = Math.max(0, bruto - cotizacion);
  const reduccionTrabajo = reduccionRendimientosTrabajo(rendimientoNeto);
  const baseRetencion = Math.max(0, rendimientoNeto - OTROS_GASTOS_TRABAJO - reduccionTrabajo);

  // 3. Mínimo personal y familiar.
  const minimoPersonal =
    MINIMOS.personal + (edad >= 65 ? MINIMOS.mayor65 : 0) + (edad >= 75 ? MINIMOS.mayor75 : 0);
  const minimoPersonalFamiliar = minimoPersonal + minimoDescendientes(hijos, hijosMenores3, hijosCompartidos);

  // 4. Cuota de retención: escala sobre la base menos escala sobre el mínimo.
  let cuota = Math.max(0, cuotaEscala(baseRetencion) - cuotaEscala(Math.min(minimoPersonalFamiliar, baseRetencion)));

  // 5. Límite excluyente y tope del 43 %.
  const limite = LIMITE_EXCLUYENTE_SIT3[Math.min(hijos, 2) as 0 | 1 | 2];
  if (bruto <= limite) {
    cuota = 0;
  } else {
    cuota = Math.min(cuota, TOPE_RETENCION * (bruto - limite));
  }

  // 6. Tipo de retención truncado a dos decimales y mínimo de contratos temporales.
  let tipoRetencion = bruto > 0 ? Math.floor((cuota / bruto) * 10000) / 100 : 0;
  if (contrato === 'temporal' && bruto > limite) tipoRetencion = Math.max(tipoRetencion, TIPO_MINIMO_TEMPORAL);
  const retencionAnual = bruto * (tipoRetencion / 100);

  // Deducción SMI: se aplica en la Renta, no en la retención mensual.
  const d = DEDUCCION_SMI;
  const deduccionSmiRenta =
    bruto <= d.hasta ? d.maxima : bruto < d.limite ? Math.max(0, d.maxima - d.coef * (bruto - d.hasta)) : 0;

  return {
    bruto,
    cotizacion,
    tipoCotizacion,
    rendimientoNeto,
    reduccionTrabajo,
    baseRetencion,
    minimoPersonalFamiliar,
    cuotaRetencion: cuota,
    tipoRetencion,
    retencionAnual,
    netoAnual: bruto - cotizacion - retencionAnual,
    deduccionSmiRenta: Math.min(deduccionSmiRenta, retencionAnual),
  };
}
