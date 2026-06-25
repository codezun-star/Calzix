import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RepartoPropinasTool() {
  const [total, setTotal] = useState('');
  const [horas, setHoras] = useState('');
  const [result, setResult] = useState<{ reparto: number[]; porHora: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const t = parseFloat(total);
      if (isNaN(t) || t < 0) throw new Error('Introduce el total de propinas a repartir.');
      const lista = horas.split(/[,\s]+/).filter(Boolean).map(Number);
      if (lista.length < 1 || lista.some((h) => isNaN(h) || h < 0)) throw new Error('Introduce las horas de cada persona separadas por comas.');
      const suma = lista.reduce((a, b) => a + b, 0);
      if (suma === 0) throw new Error('La suma de horas no puede ser cero.');
      const porHora = t / suma;
      setResult({ reparto: lista.map((h) => h * porHora), porHora });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Reparte las propinas entre el equipo de forma proporcional a las horas trabajadas por cada persona.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de propinas</label>
        <input type="number" value={total} onChange={(e) => { setTotal(e.target.value); setResult(null); }} placeholder="Ej. 240" className={INPUT} />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de cada persona (separadas por comas)</label>
        <input value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="Ej. 8, 6, 8, 4" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Repartir propinas</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">A {formatCurrency(result.porHora)} por hora trabajada:</p>
          <div className="space-y-1">
            {result.reparto.map((r, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Persona {i + 1}</span>
                <span className="font-bold text-[var(--color-text)]">{formatCurrency(r)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
