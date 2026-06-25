import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function LiquidosAvionTool() {
  const [envases, setEnvases] = useState('');
  const [result, setResult] = useState<{ permitidos: number; rechazados: number; total: number; cabe: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const lista = envases.split(/[,\s]+/).filter(Boolean).map(Number);
      if (lista.length < 1 || lista.some((x) => isNaN(x) || x < 0)) throw new Error('Introduce los tamaños de los envases en ml, separados por comas.');
      const permitidosArr = lista.filter((x) => x <= 100);
      const total = permitidosArr.reduce((a, b) => a + b, 0);
      setResult({
        permitidos: permitidosArr.length,
        rechazados: lista.length - permitidosArr.length,
        total,
        cabe: total <= 1000,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Norma de cabina: envases de máximo 100 ml, todos dentro de una bolsa transparente de 1 litro.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tamaños de tus envases en ml (separados por comas)</label>
        <input value={envases} onChange={(e) => { setEnvases(e.target.value); setResult(null); }} placeholder="Ej. 100, 75, 50, 150, 30" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar líquidos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Envases permitidos (≤100 ml)</span><span className="font-bold text-[var(--color-text)]">{result.permitidos}</span></div>
          {result.rechazados > 0 && <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">No permitidos (&gt;100 ml)</span><span className="font-bold text-red-600">{result.rechazados}</span></div>}
          <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Volumen total permitido</span><span className="font-bold text-[var(--color-text)]">{formatNumber(result.total, 0)} ml</span></div>
          <p className="border-t border-[var(--color-calcs-border)] pt-2 font-semibold text-[var(--color-text)]">{result.cabe ? 'Cabe en la bolsa de 1 litro.' : 'Supera el litro: tendrás que dejar algún envase.'}</p>
        </div>
      )}
    </div>
  );
}
