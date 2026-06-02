import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'hipotenusa' | 'cateto';

export default function TeoremaPitagorasTool() {
  const [modo, setModo] = useState<Modo>('hipotenusa');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      if (isNaN(na) || isNaN(nb)) throw new Error('Introduce los dos valores.');
      if (na <= 0 || nb <= 0) throw new Error('Los valores deben ser positivos.');
      if (modo === 'hipotenusa') {
        setResult(Math.sqrt(na * na + nb * nb));
      } else {
        if (na <= nb) throw new Error('La hipotenusa debe ser mayor que el cateto conocido.');
        setResult(Math.sqrt(na * na - nb * nb));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">c² = a² + b²</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="hipotenusa" checked={modo === 'hipotenusa'} onChange={() => { setModo('hipotenusa'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Hipotenusa (conoces los dos catetos)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="cateto" checked={modo === 'cateto'} onChange={() => { setModo('cateto'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Cateto (conoces hipotenusa y un cateto)</span>
        </label>
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modo === 'hipotenusa' ? 'Cateto a' : 'Hipotenusa (c)'}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modo === 'hipotenusa' ? 'Cateto b' : 'Cateto conocido (a o b)'}</label>
          <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">{modo === 'hipotenusa' ? 'Hipotenusa (c)' : 'Cateto desconocido'}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 6)}</p>
        </div>
      )}
    </div>
  );
}
