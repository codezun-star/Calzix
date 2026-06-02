import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function CompostOrganicoTool() {
  const [residuos, setResiduos] = useState('');
  const [semanas, setSemanas] = useState('12');
  const [result, setResult] = useState<{ compostKg: number; co2Evitado: number; abono: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const r = parseFloat(residuos.replace(',', '.'));
      const s = parseFloat(semanas.replace(',', '.'));
      if (isNaN(r) || isNaN(s)) throw new Error('Introduce los kilogramos de residuos y las semanas.');
      if (r <= 0 || s <= 0) throw new Error('Los valores deben ser positivos.');
      const compostKg = r * s * 0.3;
      const co2Evitado = r * s * 0.5;
      const abono = compostKg * 0.2;
      setResult({ compostKg, co2Evitado, abono });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Estima el compost generado a partir de residuos orgánicos del hogar (eficiencia ~30%).</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Residuos orgánicos/semana (kg)</label>
          <input type="number" value={residuos} onChange={(e) => { setResiduos(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Semanas de compostaje</label>
          <input type="number" value={semanas} onChange={(e) => { setSemanas(e.target.value); setResult(null); }} placeholder="12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Compost producido</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.compostKg, 1)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ evitado</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2Evitado, 1)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Abono activo</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.abono, 1)} kg</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
