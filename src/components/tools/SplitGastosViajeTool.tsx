import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function SplitGastosViajeTool() {
  const [pagos, setPagos] = useState('');
  const [result, setResult] = useState<{ total: number; porPersona: number; balances: number[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const lista = pagos.split(/[,\s]+/).filter(Boolean).map(Number);
      if (lista.length < 2 || lista.some((x) => isNaN(x) || x < 0)) throw new Error('Introduce lo que ha pagado cada persona, separado por comas (mínimo 2).');
      const total = lista.reduce((a, b) => a + b, 0);
      const porPersona = total / lista.length;
      setResult({ total, porPersona, balances: lista.map((p) => p - porPersona) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce lo que ha pagado cada persona y descubre quién debe dinero y quién debe recibirlo.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Pagos de cada persona (separados por comas)</label>
        <input value={pagos} onChange={(e) => { setPagos(e.target.value); setResult(null); }} placeholder="Ej. 120, 0, 60, 220" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Dividir gastos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Total: <strong>{formatCurrency(result.total)}</strong> · Por persona: <strong>{formatCurrency(result.porPersona)}</strong></p>
          <div className="space-y-1 border-t border-[var(--color-calcs-border)] pt-2">
            {result.balances.map((b, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Persona {i + 1}</span>
                <span className={`font-bold ${b < -0.005 ? 'text-red-600' : 'text-[var(--color-text)]'}`}>
                  {b > 0.005 ? `recibe ${formatCurrency(b)}` : b < -0.005 ? `debe ${formatCurrency(-b)}` : 'en paz'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
