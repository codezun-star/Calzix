import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function DistanciaApieTool() {
  const [distancia, setDistancia] = useState('');
  const [peso, setPeso] = useState('70');
  const [velocidad, setVelocidad] = useState('5');
  const [result, setResult] = useState<{ minutos: number; horas: number; calorias: number; pasos: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia.replace(',', '.'));
      const p = parseFloat(peso.replace(',', '.'));
      const v = parseFloat(velocidad.replace(',', '.'));
      if (isNaN(d) || isNaN(p) || isNaN(v)) throw new Error('Introduce la distancia, tu peso y la velocidad.');
      if (d <= 0 || p <= 0 || v <= 0) throw new Error('Los valores deben ser positivos.');
      const horas = d / v;
      const minutos = horas * 60;
      const met = v <= 3 ? 2.5 : v <= 5 ? 3.5 : v <= 6 ? 4.5 : 5.5;
      const calorias = met * p * horas;
      const pasos = d * 1312;
      setResult({ minutos, horas, calorias, pasos });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia (km)</label><input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Peso corporal (kg)</label><input type="number" value={peso} onChange={(e) => { setPeso(e.target.value); setResult(null); }} placeholder="70" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad media (km/h)</label><input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo estimado</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.minutos, 0)} min</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Calorías quemadas</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.calorias, 0)} kcal</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Pasos aproximados</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.pasos, 0)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
