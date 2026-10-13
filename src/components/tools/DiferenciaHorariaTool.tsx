import { useEffect, useState } from 'react';
import {
  ZONAS_ESPANA,
  ZONAS_MUNDO,
  desfaseMinutos,
  formatearEnZona,
  horaDeRelojAInstante,
  hoyEnZona,
  textoDiferencia,
} from '@/lib/utils/zonas';

const SELECT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

function etiqueta(id: string): string {
  return [...ZONAS_ESPANA, ...ZONAS_MUNDO].find((z) => z.id === id)?.label ?? id;
}

function OpcionesZona() {
  return (
    <>
      <optgroup label="España">
        {ZONAS_ESPANA.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
      </optgroup>
      <optgroup label="Resto del mundo">
        {ZONAS_MUNDO.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
      </optgroup>
    </>
  );
}

export default function DiferenciaHorariaTool() {
  const [origen, setOrigen] = useState('Europe/Madrid');
  const [destino, setDestino] = useState('America/New_York');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('12:00');
  const [ahora, setAhora] = useState<Date | null>(null);

  // Reloj en vivo y fecha de hoy: solo en el navegador (evita desajustes de hidratación).
  useEffect(() => {
    setFecha(hoyEnZona('Europe/Madrid'));
    setAhora(new Date());
    const t = window.setInterval(() => setAhora(new Date()), 30000);
    return () => window.clearInterval(t);
  }, []);

  const instante = fecha ? horaDeRelojAInstante(fecha, hora, origen) : null;
  const diferencia = instante ? desfaseMinutos(destino, instante) - desfaseMinutos(origen, instante) : null;
  const zonaCorta = (zona: string, d: Date) => formatearEnZona(d, zona, { timeZoneName: 'short' }).split(' ').pop() ?? '';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>Origen</label>
          <select value={origen} onChange={(e) => setOrigen(e.target.value)} className={SELECT}><OpcionesZona /></select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Destino</label>
          <select value={destino} onChange={(e) => setDestino(e.target.value)} className={SELECT}><OpcionesZona /></select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Fecha en origen</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={SELECT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Hora en origen</label>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className={SELECT} />
        </div>
      </div>

      {instante && diferencia !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">{etiqueta(origen)}</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatearEnZona(instante, origen, { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatearEnZona(instante, origen, { weekday: 'long', day: 'numeric', month: 'long' })} · {zonaCorta(origen, instante)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">{etiqueta(destino)}</p>
              <p className="text-2xl font-extrabold text-[var(--color-accent)]">{formatearEnZona(instante, destino, { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatearEnZona(instante, destino, { weekday: 'long', day: 'numeric', month: 'long' })} · {zonaCorta(destino, instante)}</p>
            </div>
          </div>
          <div className="border-t border-[var(--color-border)] pt-3">
            <p className="text-xs text-[var(--color-text-secondary)]">Diferencia horaria del destino respecto al origen</p>
            <p className="text-xl font-extrabold text-[var(--color-text)]">{textoDiferencia(diferencia)}</p>
          </div>
        </div>
      )}

      {ahora && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Ahora mismo: {formatearEnZona(ahora, 'Europe/Madrid', { hour: '2-digit', minute: '2-digit' })} en la Península,{' '}
          {formatearEnZona(ahora, 'Atlantic/Canary', { hour: '2-digit', minute: '2-digit' })} en Canarias y{' '}
          {formatearEnZona(ahora, destino, { hour: '2-digit', minute: '2-digit' })} en {etiqueta(destino)}.
          El horario de verano se aplica automáticamente.
        </p>
      )}
    </div>
  );
}
