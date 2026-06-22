import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const ESCALA: { max: number; n: number; nombre: string }[] = [
  { max: 1, n: 0, nombre: 'Calma' },
  { max: 5, n: 1, nombre: 'Ventolina' },
  { max: 11, n: 2, nombre: 'Brisa muy débil' },
  { max: 19, n: 3, nombre: 'Brisa débil' },
  { max: 28, n: 4, nombre: 'Brisa moderada' },
  { max: 38, n: 5, nombre: 'Brisa fresca' },
  { max: 49, n: 6, nombre: 'Brisa fuerte' },
  { max: 61, n: 7, nombre: 'Viento fuerte' },
  { max: 74, n: 8, nombre: 'Temporal' },
  { max: 88, n: 9, nombre: 'Temporal fuerte' },
  { max: 102, n: 10, nombre: 'Temporal duro' },
  { max: 117, n: 11, nombre: 'Borrasca' },
  { max: Infinity, n: 12, nombre: 'Huracán' },
];
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorVientoTool() {
  const [kmh, setKmh] = useState('');
  const [result, setResult] = useState<{ n: number; nombre: string; nudos: number; ms: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(kmh);
      if (isNaN(v) || v < 0) throw new Error('Introduce la velocidad del viento en km/h.');
      const e = ESCALA.find((x) => v < x.max) ?? ESCALA[ESCALA.length - 1];
      setResult({ n: e.n, nombre: e.nombre, nudos: v / 1.852, ms: v / 3.6 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce la velocidad del viento en km/h y obtén su grado en la escala de Beaufort.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad del viento (km/h)</label>
        <input type="number" value={kmh} onChange={(e) => { setKmh(e.target.value); setResult(null); }} placeholder="Ej. 45" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Escala de Beaufort</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">Grado {result.n} — {result.nombre}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-calcs-border)] pt-2">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Nudos</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.nudos, 1)} kn</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Metros/segundo</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.ms, 1)} m/s</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
