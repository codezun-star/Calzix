import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function clasificar(n10: number): { letra: string; etiqueta: string } {
  if (n10 >= 9) return { letra: 'A', etiqueta: 'Sobresaliente' };
  if (n10 >= 7) return { letra: 'B', etiqueta: 'Notable' };
  if (n10 >= 6) return { letra: 'C', etiqueta: 'Bien' };
  if (n10 >= 5) return { letra: 'D', etiqueta: 'Suficiente (aprobado)' };
  return { letra: 'F', etiqueta: 'Insuficiente (suspenso)' };
}

export default function NotaLetraTool() {
  const [nota, setNota] = useState('');
  const [escala, setEscala] = useState('10');
  const [result, setResult] = useState<{ letra: string; etiqueta: string; n10: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(nota), esc = parseFloat(escala);
      if (isNaN(n)) throw new Error('Introduce la nota numérica.');
      if (n < 0 || n > esc) throw new Error(`La nota debe estar entre 0 y ${esc}.`);
      const n10 = (n / esc) * 10;
      setResult({ ...clasificar(n10), n10 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota numérica</label>
          <input type="number" value={nota} onChange={(e) => { setNota(e.target.value); setResult(null); }} placeholder="Ej. 7.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Escala</label>
          <select value={escala} onChange={(e) => { setEscala(e.target.value); setResult(null); }} className={INPUT}>
            <option value="10">Sobre 10</option>
            <option value="100">Sobre 100</option>
            <option value="5">Sobre 5</option>
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir a letra</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Calificación</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{result.letra} <span className="text-lg font-semibold text-[var(--color-text-secondary)]">— {result.etiqueta}</span></p>
        </div>
      )}
    </div>
  );
}
