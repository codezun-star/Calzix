import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function GastosCompraViviendaTool() {
  const [precio, setPrecio] = useState('');
  const [impuestos, setImpuestos] = useState('8');
  const [notaria, setNotaria] = useState('2');
  const [otros, setOtros] = useState('1');
  const [result, setResult] = useState<{ gastos: number; total: number; pct: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(precio);
      const imp = parseFloat(impuestos || '0'), not = parseFloat(notaria || '0'), ot = parseFloat(otros || '0');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el precio de la vivienda.');
      if ([imp, not, ot].some((x) => isNaN(x) || x < 0)) throw new Error('Los porcentajes deben ser positivos.');
      const gastos = p * (imp + not + ot) / 100;
      setResult({ gastos, total: p + gastos, pct: imp + not + ot });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Ajusta los porcentajes según tu país (impuestos de transmisión, notaría, registro y gestoría).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio de la vivienda</label>
        <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 150000" className={INPUT} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Impuestos (%)</label>
          <input type="number" value={impuestos} onChange={(e) => { setImpuestos(e.target.value); setResult(null); }} placeholder="8" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Notaría/registro (%)</label>
          <input type="number" value={notaria} onChange={(e) => { setNotaria(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Gestoría/otros (%)</label>
          <input type="number" value={otros} onChange={(e) => { setOtros(e.target.value); setResult(null); }} placeholder="1" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular gastos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Gastos de compra ({formatPercent(result.pct)})</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.gastos)}</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">Desembolso total (vivienda + gastos): <strong>{formatCurrency(result.total)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
