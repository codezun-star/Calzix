import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function randInt(n: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % n;
}

export default function SorteoNombresTool() {
  const [nombres, setNombres] = useState('');
  const [ganador, setGanador] = useState<string | null>(null);
  const [error, setError] = useState('');

  function sortear() {
    try {
      setError('');
      const lista = nombres.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);
      if (lista.length < 2) throw new Error('Introduce al menos dos nombres, separados por comas.');
      setGanador(lista[randInt(lista.length)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al sortear.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Sorteo justo y aleatorio entre los participantes que indiques.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nombres (separados por comas o saltos de línea)</label>
        <textarea value={nombres} onChange={(e) => { setNombres(e.target.value); setGanador(null); }} placeholder="Ana, Luis, María, Carlos…" rows={3} className={INPUT} />
      </div>
      <button onClick={sortear} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Sortear ganador</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {ganador !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">El ganador es</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{ganador}</p>
        </div>
      )}
    </div>
  );
}
