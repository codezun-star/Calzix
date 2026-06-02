import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function AlojamientoTool() {
  const [precioNoche, setPrecioNoche] = useState('');
  const [noches, setNoches] = useState('');
  const [personas, setPersonas] = useState('2');
  const [tasas, setTasas] = useState('0');
  const [result, setResult] = useState<{ total: number; porNoche: number; porPersona: number; porPersonaNoche: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(precioNoche.replace(',', '.'));
      const n = parseFloat(noches.replace(',', '.'));
      const pe = parseFloat(personas.replace(',', '.'));
      const t = parseFloat(tasas.replace(',', '.')) || 0;
      if (isNaN(p) || isNaN(n) || isNaN(pe)) throw new Error('Introduce precio por noche, número de noches y personas.');
      if (p <= 0 || n <= 0 || pe <= 0) throw new Error('Los valores deben ser positivos.');
      const total = p * n + t;
      setResult({ total, porNoche: total / n, porPersona: total / pe, porPersonaNoche: total / (n * pe) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio por noche (€)</label><input type="number" value={precioNoche} onChange={(e) => { setPrecioNoche(e.target.value); setResult(null); }} placeholder="Ej. 80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de noches</label><input type="number" value={noches} onChange={(e) => { setNoches(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de personas</label><input type="number" value={personas} onChange={(e) => { setPersonas(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tasas / extras (€, opcional)</label><input type="number" value={tasas} onChange={(e) => { setTasas(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste total</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Total de la estancia</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por noche</p><p className="font-bold">{formatCurrency(result.porNoche)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona</p><p className="font-bold">{formatCurrency(result.porPersona)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona/noche</p><p className="font-bold">{formatCurrency(result.porPersonaNoche)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
