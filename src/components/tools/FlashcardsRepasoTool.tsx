import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function FlashcardsRepasoTool() {
  const [tarjetas, setTarjetas] = useState('');
  const [dias, setDias] = useState('');
  const [result, setResult] = useState<{ nuevasDia: number; repasoDia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const t = parseInt(tarjetas, 10), d = parseInt(dias, 10);
      if (isNaN(t) || t <= 0) throw new Error('Introduce el número de tarjetas a memorizar.');
      if (isNaN(d) || d <= 0) throw new Error('Introduce los días disponibles hasta el examen.');
      const nuevasDia = Math.ceil(t / d);
      setResult({ nuevasDia, repasoDia: nuevasDia * 3 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Reparte tus tarjetas de estudio (flashcards) en los días que tienes antes del examen.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de tarjetas</label>
          <input type="number" value={tarjetas} onChange={(e) => { setTarjetas(e.target.value); setResult(null); }} placeholder="Ej. 300" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días hasta el examen</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 20" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular plan</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Tarjetas nuevas al día</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.nuevasDia, 0)} tarjetas</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Con repaso espaciado, prevé revisar unas {formatNumber(result.repasoDia, 0)} tarjetas/día (nuevas + repasos de días anteriores).</p>
        </div>
      )}
    </div>
  );
}
