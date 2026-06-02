import { useState } from 'react';
import { formatNumber, formatPercent } from '@/lib/utils/format';

export default function ComprensionLectoraTool() {
  const [palabrasLeidas, setPalabrasLeidas] = useState('');
  const [tiempoMin, setTiempoMin] = useState('');
  const [aciertos, setAciertos] = useState('');
  const [totalPreguntas, setTotalPreguntas] = useState('10');
  const [result, setResult] = useState<{ wpm: number; comprension: number; nivel: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(palabrasLeidas.replace(',', '.'));
      const t = parseFloat(tiempoMin.replace(',', '.'));
      const a = parseFloat(aciertos.replace(',', '.'));
      const tq = parseFloat(totalPreguntas.replace(',', '.'));
      if (isNaN(p) || isNaN(t) || isNaN(a) || isNaN(tq)) throw new Error('Introduce todos los valores.');
      if (p <= 0 || t <= 0 || tq <= 0) throw new Error('Los valores deben ser positivos.');
      if (a > tq) throw new Error('Los aciertos no pueden superar el total de preguntas.');
      const wpm = p / t;
      const comprension = (a / tq) * 100;
      const nivel = comprension >= 90 ? 'Excelente' : comprension >= 75 ? 'Buena' : comprension >= 60 ? 'Aceptable' : 'Necesita mejorar';
      setResult({ wpm, comprension, nivel });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Palabras leídas</label><input type="number" value={palabrasLeidas} onChange={(e) => { setPalabrasLeidas(e.target.value); setResult(null); }} placeholder="Ej. 500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tiempo de lectura (min)</label><input type="number" value={tiempoMin} onChange={(e) => { setTiempoMin(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Preguntas acertadas</label><input type="number" value={aciertos} onChange={(e) => { setAciertos(e.target.value); setResult(null); }} placeholder="Ej. 8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de preguntas</label><input type="number" value={totalPreguntas} onChange={(e) => { setTotalPreguntas(e.target.value); setResult(null); }} placeholder="10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular comprensión</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Velocidad lectora</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.wpm, 0)} ppm</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Comprensión</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatPercent(result.comprension)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Nivel</p><p className="text-xl font-extrabold text-[var(--color-text)]">{result.nivel}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
