import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PilasRecicladasTool() {
  const [pilas, setPilas] = useState('');
  const [periodo, setPeriodo] = useState('30');
  const [result, setResult] = useState<{ anual: number; kg: number; agua: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(pilas), p = parseFloat(periodo);
      if (isNaN(n) || n < 0) throw new Error('Introduce el número de pilas.');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el periodo en días.');
      const anual = (n / p) * 365;
      // 1 pila ≈ 20 g; una pila puede contaminar hasta ~3000 L de agua
      setResult({ anual, kg: (anual * 20) / 1000, agua: anual * 3000 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Las pilas contienen metales pesados muy contaminantes: deposítalas siempre en puntos de reciclaje.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Pilas que reciclas</label>
          <input type="number" value={pilas} onChange={(e) => { setPilas(e.target.value); setResult(null); }} placeholder="Ej. 4" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cada (días)</label>
          <input type="number" value={periodo} onChange={(e) => { setPeriodo(e.target.value); setResult(null); }} placeholder="30" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular impacto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Reciclas al año</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.anual, 0)} pilas</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Unos {formatNumber(result.kg, 2)} kg de residuo peligroso, evitando contaminar hasta {formatNumber(result.agua, 0)} litros de agua. Valores orientativos.</p>
        </div>
      )}
    </div>
  );
}
