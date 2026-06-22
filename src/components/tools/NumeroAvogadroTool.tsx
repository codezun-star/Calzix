import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const NA = 6.02214076e23;
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function NumeroAvogadroTool() {
  const [mode, setMode] = useState<'molesToPart' | 'partToMoles'>('molesToPart');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const x = parseFloat(input);
      if (isNaN(x) || x < 0) throw new Error('Introduce una cantidad válida (admite notación como 3e23).');
      if (mode === 'molesToPart') setResult({ value: x * NA, unit: 'partículas' });
      else setResult({ value: x / NA, unit: 'mol' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Número de Avogadro: 1 mol = 6,022 × 10²³ partículas.</p>
      <div className="flex gap-2">
        {([['molesToPart', 'Moles → Partículas'], ['partToMoles', 'Partículas → Moles']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setInput(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{mode === 'molesToPart' ? 'Cantidad de sustancia (mol)' : 'Número de partículas'}</label>
        <input value={input} onChange={(e) => { setInput(e.target.value); setResult(null); }} placeholder={mode === 'molesToPart' ? 'Ej. 2.5' : 'Ej. 1.2e24'} className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)] break-all">{result.unit === 'mol' ? formatNumber(result.value, 6) : result.value.toExponential(4)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unit}</span></p>
        </div>
      )}
    </div>
  );
}
