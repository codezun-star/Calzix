/**
 * Tipos de cambio orientativos frente al euro (unidades de divisa por 1 €).
 * Fuente: tipos de referencia del BCE del 5 de octubre de 2026, salvo el dírham
 * marroquí, que no publica el BCE (media de mercado de agosto de 2026).
 * Actualizar `DIVISAS_FECHA` al cambiar las cifras.
 */
export const DIVISAS_FECHA = '5 de octubre de 2026';

export interface Divisa {
  nombre: string;
  simbolo: string;
  /** Unidades de la divisa por 1 euro. */
  porEuro: number;
}

export const DIVISAS = {
  EUR: { nombre: 'Euro', simbolo: '€', porEuro: 1 },
  USD: { nombre: 'Dólar estadounidense', simbolo: '$', porEuro: 1.1204 },
  GBP: { nombre: 'Libra esterlina', simbolo: '£', porEuro: 0.8472 },
  CHF: { nombre: 'Franco suizo', simbolo: 'CHF', porEuro: 0.9311 },
  MAD: { nombre: 'Dírham marroquí', simbolo: 'DH', porEuro: 10.8 },
  JPY: { nombre: 'Yen japonés', simbolo: '¥', porEuro: 177.28 },
  CNY: { nombre: 'Yuan chino', simbolo: '¥', porEuro: 7.5118 },
  CAD: { nombre: 'Dólar canadiense', simbolo: 'C$', porEuro: 1.5969 },
  AUD: { nombre: 'Dólar australiano', simbolo: 'A$', porEuro: 1.6097 },
  MXN: { nombre: 'Peso mexicano', simbolo: '$', porEuro: 20.3348 },
  BRL: { nombre: 'Real brasileño', simbolo: 'R$', porEuro: 5.5849 },
  TRY: { nombre: 'Lira turca', simbolo: '₺', porEuro: 55.0755 },
  SEK: { nombre: 'Corona sueca', simbolo: 'kr', porEuro: 11.2525 },
  NOK: { nombre: 'Corona noruega', simbolo: 'kr', porEuro: 10.7575 },
  DKK: { nombre: 'Corona danesa', simbolo: 'kr', porEuro: 7.4745 },
  PLN: { nombre: 'Esloti polaco', simbolo: 'zł', porEuro: 4.3795 },
  CZK: { nombre: 'Corona checa', simbolo: 'Kč', porEuro: 24.456 },
  HUF: { nombre: 'Forinto húngaro', simbolo: 'Ft', porEuro: 367.8 },
} as const satisfies Record<string, Divisa>;

export type CodigoDivisa = keyof typeof DIVISAS;

export const CODIGOS_DIVISA = Object.keys(DIVISAS) as CodigoDivisa[];

/** Convierte un importe entre dos divisas pasando por el euro. */
export function convertirDivisa(importe: number, de: CodigoDivisa, a: CodigoDivisa): number {
  return (importe / DIVISAS[de].porEuro) * DIVISAS[a].porEuro;
}
