import { useState } from 'react';

export default function FactorialTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseInt(input, 10);
      if (isNaN(n) || !Number.isInteger(n)) throw new Error('Introduce un número entero.');
      if (n < 0) throw new Error('El factorial no está definido para negativos.');
      if (n > 170) throw new Error('El valor máximo es 170 (límite numérico).');
      let f = BigInt(1);
      for (let i = 2; i <= n; i++) f *= BigInt(i);
      setResult(f.toString());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número (n)</label>
        <input
          type="number"
          min="0"
          max="170"
          step="1"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          placeholder="Ej. 10"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">{input}! =</p>
          <p className="text-xl font-extrabold text-[var(--color-text)] break-all">{result}</p>
        </div>
      )}
    </div>
  );
}
