import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PinturaTechosTool() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [rendimiento, setRendimiento] = useState('10');
  const [manos, setManos] = useState('2');
  const [result, setResult] = useState<{ area: number; litros: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(largo.replace(',', '.'));
      const a = parseFloat(ancho.replace(',', '.'));
      const rend = parseFloat(rendimiento.replace(',', '.'));
      const m = parseFloat(manos.replace(',', '.'));
      if (isNaN(l) || isNaN(a) || isNaN(rend) || isNaN(m)) throw new Error('Introduce las dimensiones y el rendimiento.');
      if (l <= 0 || a <= 0 || rend <= 0 || m <= 0) throw new Error('Los valores deben ser positivos.');
      const area = l * a;
      const litros = (area * m) / rend;
      setResult({ area, litros });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo de la habitación (m)</label><input type="number" value={largo} onChange={(e) => { setLargo(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho de la habitación (m)</label><input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Rendimiento de la pintura (m²/L)</label><input type="number" value={rendimiento} onChange={(e) => { setRendimiento(e.target.value); setResult(null); }} placeholder="10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de manos</label><input type="number" value={manos} onChange={(e) => { setManos(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular pintura</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Área del techo</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.area, 2)} m²</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Litros de pintura necesarios</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litros, 2)} L</p></div>
        </div>
      )}
    </div>
  );
}
