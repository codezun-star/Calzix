import { useState } from 'react';

function esPrimo(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function factoresPrimos(n: number): number[] {
  const factores: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) { factores.push(d); n = Math.floor(n / d); }
    d++;
  }
  if (n > 1) factores.push(n);
  return factores;
}

export default function NumeroPrimoTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ primo: boolean; factores: number[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseInt(input, 10);
      if (isNaN(n) || n < 1) throw new Error('Introduce un número entero positivo.');
      if (n > 1e9) throw new Error('El valor máximo es 1.000.000.000.');
      setResult({ primo: esPrimo(n), factores: factoresPrimos(n) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número entero</label>
        <input
          type="number"
          min="1"
          step="1"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          placeholder="Ej. 97"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-2 ${result.primo ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">
            {result.primo ? `${input} es primo` : `${input} NO es primo`}
          </p>
          {!result.primo && result.factores.length > 0 && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Factores primos: {result.factores.join(' × ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
