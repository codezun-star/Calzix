import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function CaptacionLluviaTool() {
  const [superficie, setSuperficie] = useState('');
  const [precipitacion, setPrecipitacion] = useState('');
  const [eficiencia, setEficiencia] = useState('80');
  const [result, setResult] = useState<{ litrosAnuales: number; litrosMes: number; litrosDia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(superficie.replace(',', '.'));
      const p = parseFloat(precipitacion.replace(',', '.'));
      const e = parseFloat(eficiencia.replace(',', '.')) / 100;
      if (isNaN(s) || isNaN(p) || isNaN(e)) throw new Error('Introduce todos los valores.');
      if (s <= 0 || p <= 0 || e <= 0) throw new Error('Los valores deben ser positivos.');
      const litrosAnuales = s * (p / 1000) * 1000 * e;
      setResult({ litrosAnuales, litrosMes: litrosAnuales / 12, litrosDia: litrosAnuales / 365 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula el agua de lluvia que puedes recoger de una cubierta o tejado.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Superficie de captación (m²)</label><input type="number" value={superficie} onChange={(e) => { setSuperficie(e.target.value); setResult(null); }} placeholder="Ej. 80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precipitación anual (mm)</label><input type="number" value={precipitacion} onChange={(e) => { setPrecipitacion(e.target.value); setResult(null); }} placeholder="Ej. 600" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Eficiencia del sistema (%)</label><input type="number" value={eficiencia} onChange={(e) => { setEficiencia(e.target.value); setResult(null); }} placeholder="80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular captación</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Agua captada al año</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosAnuales, 0)} L</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Promedio mensual</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosMes, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Promedio diario</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosDia, 1)} L</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
