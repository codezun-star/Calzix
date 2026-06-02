import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const UMBRALES: Record<number, number> = { 1: 8422, 2: 14112, 3: 18780, 4: 23338, 5: 27024, 6: 30039, 7: 33252, 8: 36469 };

export default function UmbralRentaTool() {
  const [miembros, setMiembros] = useState('4');
  const [renta, setRenta] = useState('');
  const [result, setResult] = useState<{ umbral: number; diferencia: number; baja: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseInt(miembros, 10);
      const r = parseFloat(renta.replace(',', '.'));
      if (isNaN(n) || isNaN(r) || n <= 0 || r < 0) throw new Error('Introduce valores válidos.');
      const umbral = UMBRALES[n] ?? (UMBRALES[8] + (n - 8) * 3000);
      const diferencia = Math.abs(r - umbral);
      setResult({ umbral, diferencia, baja: r <= umbral });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Umbrales de renta familiar para becas MEC (España). Umbral 1 — el más restrictivo.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Miembros de la unidad familiar</label>
          <input type="number" min="1" step="1" value={miembros} onChange={(e) => { setMiembros(e.target.value); setResult(null); }} placeholder="4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Renta familiar anual (€)</label>
          <input type="number" value={renta} onChange={(e) => { setRenta(e.target.value); setResult(null); }} placeholder="Ej. 20000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar umbral</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-2 ${result.baja ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          <p className="text-sm text-[var(--color-text-secondary)]">Umbral de renta ({miembros} miembros): <span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.umbral)}</span></p>
          <p className="text-xl font-extrabold text-[var(--color-text)]">
            {result.baja ? 'Renta por debajo del umbral' : 'Renta supera el umbral'}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {result.baja
              ? `Margen de ${formatCurrency(result.diferencia)} por debajo`
              : `Excede en ${formatCurrency(result.diferencia)}`}
          </p>
        </div>
      )}
    </div>
  );
}
