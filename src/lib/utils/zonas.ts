/**
 * Zonas horarias reales (IANA) con el horario de verano resuelto por el
 * navegador (Intl). España va primero: península y Baleares (Europe/Madrid) y
 * Canarias (Atlantic/Canary), una hora menos todo el año.
 */
export interface Zona {
  id: string;
  label: string;
}

export const ZONAS_ESPANA: readonly Zona[] = [
  { id: 'Europe/Madrid', label: 'España: Península, Baleares, Ceuta y Melilla' },
  { id: 'Atlantic/Canary', label: 'España: Canarias' },
];

export const ZONAS_MUNDO: readonly Zona[] = [
  { id: 'Europe/Lisbon', label: 'Portugal (Lisboa)' },
  { id: 'Europe/London', label: 'Reino Unido (Londres)' },
  { id: 'Europe/Dublin', label: 'Irlanda (Dublín)' },
  { id: 'Europe/Paris', label: 'Francia (París)' },
  { id: 'Europe/Berlin', label: 'Alemania (Berlín)' },
  { id: 'Europe/Rome', label: 'Italia (Roma)' },
  { id: 'Europe/Amsterdam', label: 'Países Bajos (Ámsterdam)' },
  { id: 'Europe/Zurich', label: 'Suiza (Zúrich)' },
  { id: 'Europe/Athens', label: 'Grecia (Atenas)' },
  { id: 'Europe/Istanbul', label: 'Turquía (Estambul)' },
  { id: 'Europe/Moscow', label: 'Rusia (Moscú)' },
  { id: 'Africa/Casablanca', label: 'Marruecos (Casablanca, Marrakech)' },
  { id: 'Africa/Cairo', label: 'Egipto (El Cairo)' },
  { id: 'Africa/Johannesburg', label: 'Sudáfrica (Johannesburgo)' },
  { id: 'Asia/Dubai', label: 'Emiratos Árabes (Dubái)' },
  { id: 'Asia/Kolkata', label: 'India (Nueva Delhi)' },
  { id: 'Asia/Bangkok', label: 'Tailandia (Bangkok)' },
  { id: 'Asia/Shanghai', label: 'China (Pekín, Shanghái)' },
  { id: 'Asia/Singapore', label: 'Singapur' },
  { id: 'Asia/Tokyo', label: 'Japón (Tokio)' },
  { id: 'Australia/Sydney', label: 'Australia (Sídney)' },
  { id: 'Pacific/Auckland', label: 'Nueva Zelanda (Auckland)' },
  { id: 'America/New_York', label: 'EE. UU. (Nueva York, Miami)' },
  { id: 'America/Chicago', label: 'EE. UU. (Chicago)' },
  { id: 'America/Los_Angeles', label: 'EE. UU. (Los Ángeles)' },
  { id: 'America/Toronto', label: 'Canadá (Toronto)' },
  { id: 'America/Mexico_City', label: 'México (Ciudad de México)' },
  { id: 'America/Cancun', label: 'México (Cancún)' },
  { id: 'America/Havana', label: 'Cuba (La Habana)' },
  { id: 'America/Santo_Domingo', label: 'República Dominicana (Santo Domingo)' },
  { id: 'America/Bogota', label: 'Colombia (Bogotá)' },
  { id: 'America/Lima', label: 'Perú (Lima)' },
  { id: 'America/Caracas', label: 'Venezuela (Caracas)' },
  { id: 'America/Santiago', label: 'Chile (Santiago)' },
  { id: 'America/Argentina/Buenos_Aires', label: 'Argentina (Buenos Aires)' },
  { id: 'America/Sao_Paulo', label: 'Brasil (São Paulo)' },
];

export const ZONAS: readonly Zona[] = [...ZONAS_ESPANA, ...ZONAS_MUNDO];

/** Desfase en minutos de una zona respecto a UTC en un instante dado. */
export function desfaseMinutos(zona: string, instante: Date): number {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: zona,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(instante);
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => Number(partes.find((p) => p.type === tipo)?.value ?? 0);
  const comoUtc = Date.UTC(valor('year'), valor('month') - 1, valor('day'), valor('hour'), valor('minute'), valor('second'));
  return Math.round((comoUtc - instante.getTime()) / 60000);
}

/** Convierte una fecha y hora "de reloj" en una zona al instante real. */
export function horaDeRelojAInstante(fecha: string, hora: string, zona: string): Date | null {
  const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
  const h = /^(\d{1,2}):(\d{2})$/.exec(hora);
  if (!f || !h) return null;
  const supuesto = Date.UTC(Number(f[1]), Number(f[2]) - 1, Number(f[3]), Number(h[1]), Number(h[2]));
  const d1 = desfaseMinutos(zona, new Date(supuesto));
  let instante = supuesto - d1 * 60000;
  const d2 = desfaseMinutos(zona, new Date(instante));
  if (d2 !== d1) instante = supuesto - d2 * 60000;
  return new Date(instante);
}

/** Formatea un instante en una zona con el formato español. */
export function formatearEnZona(instante: Date, zona: string, opciones: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('es-ES', { timeZone: zona, ...opciones }).format(instante);
}

/** "+7 h", "−5 h", "+3 h 30 min" o "Misma hora". */
export function textoDiferencia(minutos: number): string {
  if (minutos === 0) return 'Misma hora';
  const signo = minutos > 0 ? '+' : '−';
  const abs = Math.abs(minutos);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${signo}${h} h${m ? ` ${m} min` : ''}`;
}

/** Fecha de hoy (YYYY-MM-DD) en una zona. */
export function hoyEnZona(zona: string): string {
  const partes = new Intl.DateTimeFormat('en-CA', { timeZone: zona, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return partes;
}
