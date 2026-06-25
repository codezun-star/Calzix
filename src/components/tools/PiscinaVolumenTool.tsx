import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PiscinaVolumenTool() {
  const [forma, setForma] = useState<'rectangular' | 'circular'>('rectangular');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [diametro, setDiametro] = useState('');
  const [profundidad, setProfundidad] = useState('');
  const [result, setResult] = useState<{ m3: number; litros: number; cloro: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const prof = parseFloat(profundidad);
      if (isNaN(prof) || prof <= 0) throw new Error('Introduce la profundidad media en metros.');
      let m3: number;
      if (forma === 'rectangular') {
        const l = parseFloat(largo), a = parseFloat(ancho);
        if (isNaN(l) || isNaN(a) || l <= 0 || a <= 0) throw new Error('Introduce largo y ancho.');
        m3 = l * a * prof;
      } else {
        const d = parseFloat(diametro);
        if (isNaN(d) || d <= 0) throw new Error('Introduce el diámetro.');
        m3 = Math.PI * Math.pow(d / 2, 2) * prof;
      }
      setResult({ m3, litros: m3 * 1000, cloro: m3 * 6 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['rectangular', 'Rectangular'], ['circular', 'Circular']] as const).map(([f, label]) => (
          <button key={f} onClick={() => { setForma(f); reset(); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${forma === f ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {forma === 'rectangular' ? (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo (m)</label>
              <input type="number" value={largo} onChange={(e) => { setLargo(e.target.value); reset(); }} placeholder="Ej. 8" className={INPUT} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (m)</label>
              <input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); reset(); }} placeholder="Ej. 4" className={INPUT} />
            </div>
          </>
        ) : (
          <div className="space-y-1 col-span-2">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Diámetro (m)</label>
            <input type="number" value={diametro} onChange={(e) => { setDiametro(e.target.value); reset(); }} placeholder="Ej. 4.5" className={INPUT} />
          </div>
        )}
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Profundidad media (m)</label>
          <input type="number" value={profundidad} onChange={(e) => { setProfundidad(e.target.value); reset(); }} placeholder="Ej. 1.5" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular volumen</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Volumen de la piscina</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litros, 0)} litros</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.m3, 2)} m³ · Cloración de choque inicial aprox.: {formatNumber(result.cloro, 0)} g de cloro.</p>
        </div>
      )}
    </div>
  );
}
