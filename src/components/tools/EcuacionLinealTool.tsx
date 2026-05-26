import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function EcuacionLinealTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      setResult(null);
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      const nc = parseFloat(c.replace(',', '.'));

      if (isNaN(na) || isNaN(nb) || isNaN(nc)) throw new Error('Introduce valores numéricos válidos en los tres campos.');
      if (na === 0) throw new Error('El coeficiente "a" no puede ser cero (no habría incógnita).');

      const x = (nc - nb) / na;
      setResult(x);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const na = parseFloat(a.replace(',', '.'));
  const nb = parseFloat(b.replace(',', '.'));
  const nc = parseFloat(c.replace(',', '.'));
  const showStep = result !== null && !isNaN(na) && !isNaN(nb) && !isNaN(nc);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Resuelve ecuaciones de la forma <strong className="text-[var(--color-text)]">ax + b = c</strong>
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coeficiente a</label>
          <input
            type="number"
            value={a}
            onChange={(e) => { setA(e.target.value); setResult(null); }}
            placeholder="ej. 2"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Término b</label>
          <input
            type="number"
            value={b}
            onChange={(e) => { setB(e.target.value); setResult(null); }}
            placeholder="ej. 3"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Resultado c</label>
          <input
            type="number"
            value={c}
            onChange={(e) => { setC(e.target.value); setResult(null); }}
            placeholder="ej. 7"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Resolver
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && showStep && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">x = {formatNumber(result, 6)}</p>
          <div className="text-sm text-[var(--color-text-secondary)] space-y-1 font-mono">
            <p>{formatNumber(na, 6)}x + {formatNumber(nb, 6)} = {formatNumber(nc, 6)}</p>
            <p>x = ({formatNumber(nc, 6)} − {formatNumber(nb, 6)}) / {formatNumber(na, 6)}</p>
            <p>x = {formatNumber(nc - nb, 6)} / {formatNumber(na, 6)} = <strong className="text-[var(--color-text)]">{formatNumber(result, 6)}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
