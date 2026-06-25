import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function BecaCoberturaTool() {
  const [coste, setCoste] = useState('');
  const [beca, setBeca] = useState('');
  const [result, setResult] = useState<{ pct: number; pagar: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(coste), b = parseFloat(beca);
      if (isNaN(c) || c <= 0) throw new Error('Introduce el coste total.');
      if (isNaN(b) || b < 0) throw new Error('Introduce el importe de la beca.');
      const pct = Math.min((b / c) * 100, 100);
      setResult({ pct, pagar: Math.max(c - b, 0) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coste total (matrícula + gastos)</label>
          <input type="number" value={coste} onChange={(e) => { setCoste(e.target.value); setResult(null); }} placeholder="Ej. 4000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe de la beca</label>
          <input type="number" value={beca} onChange={(e) => { setBeca(e.target.value); setResult(null); }} placeholder="Ej. 2500" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular cobertura</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">La beca cubre</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatPercent(result.pct)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Tendrás que aportar de tu bolsillo: <strong>{formatCurrency(result.pagar)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
