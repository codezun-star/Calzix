import { useState } from 'react';

function randomChoice<T>(arr: T[]): T {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return arr[buf[0] % arr.length];
}

export default function RuletaDecisionTool() {
  const [opciones, setOpciones] = useState(['Opción A', 'Opción B', 'Opción C']);
  const [nueva, setNueva] = useState('');
  const [ganadora, setGanadora] = useState<string | null>(null);

  function agregar() {
    const t = nueva.trim();
    if (!t) return;
    setOpciones((p) => [...p, t]);
    setNueva('');
    setGanadora(null);
  }

  function quitar(idx: number) {
    setOpciones((p) => p.filter((_, i) => i !== idx));
    setGanadora(null);
  }

  function girar() {
    if (opciones.length < 2) return;
    setGanadora(randomChoice(opciones));
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Opciones</p>
        {opciones.map((o, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex-1 text-sm text-[var(--color-text)] px-3 py-1.5 rounded-xl bg-[var(--color-calcs-bg)]">{o}</span>
            <button onClick={() => quitar(i)} className="text-xs text-red-500 hover:text-red-700 px-2">✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && agregar()}
          placeholder="Añadir opción..."
          className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
        <button onClick={agregar} className="rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]">+</button>
      </div>
      <button onClick={girar} disabled={opciones.length < 2} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50">Girar ruleta</button>
      {ganadora !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">La ruleta eligió:</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{ganadora}</p>
        </div>
      )}
    </div>
  );
}
