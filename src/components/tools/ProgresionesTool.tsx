import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Tipo = 'aritmetica' | 'geometrica';
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ProgresionesTool() {
  const [tipo, setTipo] = useState<Tipo>('aritmetica');
  const [a1, setA1] = useState('');
  const [dr, setDr] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState<{ termino: number; suma: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const first = parseFloat(a1);
      const step = parseFloat(dr);
      const count = parseInt(n, 10);
      if (isNaN(first) || isNaN(step)) throw new Error('Introduce el primer término y la diferencia o razón.');
      if (isNaN(count) || count < 1) throw new Error('El número de términos (n) debe ser un entero positivo.');
      if (tipo === 'aritmetica') {
        const termino = first + (count - 1) * step;
        setResult({ termino, suma: (count * (first + termino)) / 2 });
      } else {
        const termino = first * Math.pow(step, count - 1);
        const suma = step === 1 ? first * count : first * (Math.pow(step, count) - 1) / (step - 1);
        setResult({ termino, suma });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['aritmetica', 'Aritmética'], ['geometrica', 'Geométrica']] as const).map(([t, label]) => (
          <button key={t} onClick={() => { setTipo(t); setResult(null); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${tipo === t ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">1.er término (a₁)</label>
          <input type="number" value={a1} onChange={(e) => { setA1(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{tipo === 'aritmetica' ? 'Diferencia (d)' : 'Razón (r)'}</label>
          <input type="number" value={dr} onChange={(e) => { setDr(e.target.value); setResult(null); }} placeholder={tipo === 'aritmetica' ? '3' : '2'} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">N.º términos (n)</label>
          <input type="number" min="1" step="1" value={n} onChange={(e) => { setN(e.target.value); setResult(null); }} placeholder="10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Término n (aₙ)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.termino, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Suma de los n términos (Sₙ)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.suma, 4)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
