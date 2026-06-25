import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AceiteUsadoTool() {
  const [litros, setLitros] = useState('');
  const [periodo, setPeriodo] = useState('30');
  const [result, setResult] = useState<{ anual: number; agua: number; biodiesel: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(litros), p = parseFloat(periodo);
      if (isNaN(l) || l < 0) throw new Error('Introduce los litros de aceite usado.');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el periodo en días.');
      const anual = (l / p) * 365;
      // 1 L de aceite puede contaminar ~1000 L de agua; rinde ~0,9 L de biodiésel
      setResult({ anual, agua: anual * 1000, biodiesel: anual * 0.9 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">No tires el aceite por el fregadero: un solo litro puede contaminar miles de litros de agua.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Aceite usado (litros)</label>
          <input type="number" value={litros} onChange={(e) => { setLitros(e.target.value); setResult(null); }} placeholder="Ej. 1" className={INPUT} />
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
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.anual, 1)} litros de aceite</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Evitas contaminar hasta {formatNumber(result.agua, 0)} litros de agua y permites producir unos {formatNumber(result.biodiesel, 1)} litros de biodiésel.</p>
        </div>
      )}
    </div>
  );
}
