import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'potencia' | 'raiz';

export default function PotenciasRaicesTool() {
  const [modo, setModo] = useState<Modo>('potencia');
  const [base, setBase] = useState('');
  const [exp, setExp] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const b = parseFloat(base.replace(',', '.'));
      const e = parseFloat(exp.replace(',', '.'));
      if (isNaN(b) || isNaN(e)) throw new Error('Introduce valores numéricos válidos.');
      if (modo === 'potencia') {
        if (b === 0 && e < 0) throw new Error('0 elevado a exponente negativo no está definido.');
        setResult(Math.pow(b, e));
      } else {
        if (e <= 0) throw new Error('El índice de la raíz debe ser positivo.');
        if (b < 0 && e % 2 === 0) throw new Error('La raíz par de un número negativo no es real.');
        const sign = b < 0 ? -1 : 1;
        setResult(sign * Math.pow(Math.abs(b), 1 / e));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Operación</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="potencia" checked={modo === 'potencia'} onChange={() => { setModo('potencia'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Potencia (base ^ exponente)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="raiz" checked={modo === 'raiz'} onChange={() => { setModo('raiz'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Raíz (raíz n-ésima de base)</span>
        </label>
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base</label>
          <input type="number" value={base} onChange={(e) => { setBase(e.target.value); setResult(null); }} placeholder="Ej. 2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modo === 'potencia' ? 'Exponente' : 'Índice (n)'}</label>
          <input type="number" value={exp} onChange={(e) => { setExp(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">{modo === 'potencia' ? `${base} ^ ${exp}` : `${exp}√${base}`} =</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 8)}</p>
        </div>
      )}
    </div>
  );
}
