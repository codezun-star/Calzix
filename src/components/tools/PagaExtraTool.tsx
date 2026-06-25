import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PagaExtraTool() {
  const [bruto, setBruto] = useState('');
  const [pagas, setPagas] = useState('14');
  const [result, setResult] = useState<{ porPaga: number; prorrateado: number; extras: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const b = parseFloat(bruto), p = parseInt(pagas, 10);
      if (isNaN(b) || b < 0) throw new Error('Introduce el salario bruto anual.');
      if (![12, 14, 15, 16].includes(p)) throw new Error('Selecciona un número de pagas válido.');
      setResult({ porPaga: b / p, prorrateado: b / 12, extras: p - 12 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual</label>
          <input type="number" value={bruto} onChange={(e) => { setBruto(e.target.value); setResult(null); }} placeholder="Ej. 21000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de pagas</label>
          <select value={pagas} onChange={(e) => { setPagas(e.target.value); setResult(null); }} className={INPUT}>
            <option value="12">12 pagas</option>
            <option value="14">14 pagas</option>
            <option value="15">15 pagas</option>
            <option value="16">16 pagas</option>
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular pagas</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Importe de cada paga ({pagas} pagas)</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.porPaga)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {result.extras > 0
              ? `Tienes ${result.extras} paga(s) extra al año. Si las prorrateas en 12 meses, cobrarías ${formatCurrency(result.prorrateado)} al mes.`
              : 'El salario se reparte en 12 mensualidades iguales, sin pagas extra separadas.'}
          </p>
        </div>
      )}
    </div>
  );
}
