import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function EscaleraPeldanosTool() {
  const [altura, setAltura] = useState('');
  const [result, setResult] = useState<{ n: number; ch: number; huella: number; largo: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const h = parseFloat(altura);
      if (isNaN(h) || h <= 0) throw new Error('Introduce la altura total a salvar en cm.');
      if (h > 600) throw new Error('Altura demasiado grande para un solo tramo. Revisa el valor.');
      const n = Math.max(1, Math.round(h / 18));
      const ch = h / n;
      const huella = 64 - 2 * ch; // regla de Blondel: 2·contrahuella + huella ≈ 64 cm
      setResult({ n, ch, huella, largo: (n - 1) * huella });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula los peldaños de una escalera según la regla de Blondel (contrahuella ideal ≈ 18 cm).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura total a salvar (cm)</label>
        <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); setResult(null); }} placeholder="Ej. 280" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular escalera</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-2 gap-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Número de peldaños</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.n}</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Contrahuella (alto)</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ch, 1)} cm</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Huella (fondo)</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.huella, 1)} cm</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Largo horizontal</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.largo / 100, 2)} m</p></div>
        </div>
      )}
    </div>
  );
}
