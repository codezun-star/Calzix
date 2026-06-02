import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function BateriaSolarTool() {
  const [consumoDia, setConsumoDia] = useState('');
  const [diasAutonomia, setDiasAutonomia] = useState('2');
  const [tension, setTension] = useState('48');
  const [profDescarga, setProfDescarga] = useState('80');
  const [result, setResult] = useState<{ capacidadAh: number; capacidadKwh: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumoDia.replace(',', '.'));
      const d = parseFloat(diasAutonomia.replace(',', '.'));
      const v = parseFloat(tension.replace(',', '.'));
      const pd = parseFloat(profDescarga.replace(',', '.'));
      if (isNaN(c) || isNaN(d) || isNaN(v) || isNaN(pd)) throw new Error('Introduce todos los valores.');
      if (c <= 0 || d <= 0 || v <= 0 || pd <= 0 || pd > 100) throw new Error('Los valores deben ser positivos y la profundidad de descarga entre 1-100%.');
      const capacidadKwh = (c * d) / (pd / 100);
      const capacidadAh = (capacidadKwh * 1000) / v;
      setResult({ capacidadAh, capacidadKwh });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo diario (kWh/día)</label><input type="number" value={consumoDia} onChange={(e) => { setConsumoDia(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de autonomía</label><input type="number" value={diasAutonomia} onChange={(e) => { setDiasAutonomia(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tensión del banco (V)</label><input type="number" value={tension} onChange={(e) => { setTension(e.target.value); setResult(null); }} placeholder="48" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Profundidad de descarga (%)</label><input type="number" value={profDescarga} onChange={(e) => { setProfDescarga(e.target.value); setResult(null); }} placeholder="80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular batería necesaria</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Capacidad mínima</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.capacidadKwh, 2)} kWh</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">En amperios-hora</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.capacidadAh, 1)} Ah</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
