import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PalabrasMinutoTool() {
  const [palabras, setPalabras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [result, setResult] = useState<{ ppm: number; nivel: string; libroHoras: number } | null>(null);
  const [error, setError] = useState('');

  const NIVELES = [
    { max: 150, label: 'Lector principiante' },
    { max: 200, label: 'Lector promedio' },
    { max: 300, label: 'Lector competente' },
    { max: 500, label: 'Lector avanzado' },
    { max: Infinity, label: 'Lector experto' },
  ];

  function calcular() {
    try {
      setError('');
      const p = parseFloat(palabras.replace(',', '.'));
      const m = parseFloat(minutos.replace(',', '.'));
      if (isNaN(p) || isNaN(m) || p <= 0 || m <= 0) throw new Error('Introduce las palabras leídas y el tiempo en minutos.');
      const ppm = p / m;
      const nivel = NIVELES.find((n) => ppm <= n.max)!.label;
      const libroHoras = (90000 / ppm) / 60;
      setResult({ ppm, nivel, libroHoras });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Mide tu velocidad lectora leyendo un texto durante un tiempo fijo y contando las palabras.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Palabras leídas</label>
          <input type="number" value={palabras} onChange={(e) => { setPalabras(e.target.value); setResult(null); }} placeholder="Ej. 500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tiempo de lectura (min)</label>
          <input type="number" value={minutos} onChange={(e) => { setMinutos(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular velocidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Velocidad lectora</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ppm, 0)} ppm</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Nivel</p><p className="font-extrabold text-[var(--color-text)]">{result.nivel}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Libro típico (90k palabras)</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.libroHoras, 1)}h</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
