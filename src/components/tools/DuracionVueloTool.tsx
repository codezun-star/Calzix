import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function DuracionVueloTool() {
  const [distancia, setDistancia] = useState('');
  const [velocidad, setVelocidad] = useState('850');
  const [escala, setEscala] = useState('0');
  const [result, setResult] = useState<{ horas: number; minutos: number; h: number; m: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia.replace(',', '.'));
      const v = parseFloat(velocidad.replace(',', '.'));
      const e = parseFloat(escala.replace(',', '.')) || 0;
      if (isNaN(d) || isNaN(v)) throw new Error('Introduce la distancia y la velocidad del vuelo.');
      if (d <= 0 || v <= 0) throw new Error('Los valores deben ser positivos.');
      const horas = d / v + e;
      const h = Math.floor(horas);
      const m = Math.round((horas - h) * 60);
      setResult({ horas, minutos: horas * 60, h, m });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia del vuelo (km)</label><input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 2500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad crucero (km/h)</label><input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="850" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tiempo de escala (horas, opcional)</label><input type="number" value={escala} onChange={(e) => { setEscala(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular duración</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Duración estimada del vuelo</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.h}h {result.m}min</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result.horas, 2)} horas totales · {formatNumber(result.minutos, 0)} minutos</p>
        </div>
      )}
    </div>
  );
}
