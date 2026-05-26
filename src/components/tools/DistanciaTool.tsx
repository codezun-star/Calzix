import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Resultado {
  horasConduccion: number;
  totalHoras: number;
  horasEnteras: number;
  minutosRestantes: number;
  horaLlegada: string | null;
  diaSiguiente: boolean;
}

function formatHorasMin(horas: number): string {
  const h = Math.floor(horas);
  const m = Math.round((horas - h) * 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export default function DistanciaTool() {
  const [distancia, setDistancia] = useState('');
  const [velocidad, setVelocidad] = useState('90');
  const [paradas, setParadas] = useState('0');
  const [horaSalida, setHoraSalida] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const d = parseFloat(distancia.replace(',', '.'));
    const v = parseFloat(velocidad.replace(',', '.'));
    const p = parseFloat(paradas.replace(',', '.') || '0');

    if (isNaN(d) || d <= 0) { setError('Introduce una distancia válida en km.'); return; }
    if (isNaN(v) || v <= 0) { setError('Introduce una velocidad media válida en km/h.'); return; }
    if (isNaN(p) || p < 0) { setError('El tiempo de paradas no puede ser negativo.'); return; }

    const horasConduccion = d / v;
    const totalHoras = horasConduccion + p / 60;
    const horasEnteras = Math.floor(totalHoras);
    const minutosRestantes = Math.round((totalHoras - horasEnteras) * 60);

    let horaLlegada: string | null = null;
    let diaSiguiente = false;

    if (horaSalida) {
      const [hStr, mStr] = horaSalida.split(':');
      const hSalida = parseInt(hStr, 10);
      const mSalida = parseInt(mStr, 10);
      const totalMinSalida = hSalida * 60 + mSalida;
      const totalMinLlegada = totalMinSalida + Math.round(totalHoras * 60);
      const minDelDia = totalMinLlegada % (24 * 60);
      diaSiguiente = totalMinLlegada >= 24 * 60;
      const hLlegada = Math.floor(minDelDia / 60);
      const mLlegada = minDelDia % 60;
      horaLlegada = `${String(hLlegada).padStart(2, '0')}:${String(mLlegada).padStart(2, '0')}`;
    }

    setResultado({ horasConduccion, totalHoras, horasEnteras, minutosRestantes, horaLlegada, diaSiguiente });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Distancia (km)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="Ej. 450"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Velocidad media (km/h)
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={velocidad}
            onChange={(e) => setVelocidad(e.target.value)}
            placeholder="Ej. 90"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Tiempo de paradas (minutos)
          </label>
          <input
            type="number"
            min="0"
            step="5"
            value={paradas}
            onChange={(e) => setParadas(e.target.value)}
            placeholder="Ej. 30"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Hora de salida (opcional)
          </label>
          <input
            type="time"
            value={horaSalida}
            onChange={(e) => setHoraSalida(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular tiempo de viaje
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Tiempo conduciendo</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatHorasMin(resultado.horasConduccion)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Tiempo total</p>
              <p className="text-2xl font-extrabold text-[var(--color-accent)]">
                {formatHorasMin(resultado.totalHoras)}
              </p>
            </div>
          </div>

          {resultado.horaLlegada && (
            <div className="border-t border-[var(--color-border)] pt-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Hora estimada de llegada</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {resultado.horaLlegada}
                {resultado.diaSiguiente && (
                  <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
                    (día siguiente)
                  </span>
                )}
              </p>
            </div>
          )}

          <p className="text-xs text-[var(--color-text-muted)]">
            Velocidad media: {formatNumber(parseFloat(velocidad), 0)} km/h &middot; Distancia: {formatNumber(parseFloat(distancia), 0)} km
          </p>
        </div>
      )}
    </div>
  );
}
