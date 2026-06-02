import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'moles_a_masa' | 'masa_a_moles';

export default function MolMasaTool() {
  const [modo, setModo] = useState<Modo>('moles_a_masa');
  const [moles, setMoles] = useState('');
  const [masaMolar, setMasaMolar] = useState('');
  const [masa, setMasa] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const mm = parseFloat(masaMolar.replace(',', '.'));
      if (isNaN(mm) || mm <= 0) throw new Error('Introduce la masa molar del compuesto (g/mol).');
      if (modo === 'moles_a_masa') {
        const n = parseFloat(moles.replace(',', '.'));
        if (isNaN(n) || n <= 0) throw new Error('Introduce la cantidad en moles.');
        setResult(n * mm);
      } else {
        const m = parseFloat(masa.replace(',', '.'));
        if (isNaN(m) || m <= 0) throw new Error('Introduce la masa en gramos.');
        setResult(m / mm);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">n = m / M</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Conversión</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="moles_a_masa" checked={modo === 'moles_a_masa'} onChange={() => { setModo('moles_a_masa'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Moles → Masa (g)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="masa_a_moles" checked={modo === 'masa_a_moles'} onChange={() => { setModo('masa_a_moles'); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Masa (g) → Moles</span>
        </label>
      </fieldset>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molar M (g/mol)</label>
        <input type="number" value={masaMolar} onChange={(e) => { setMasaMolar(e.target.value); setResult(null); }} placeholder="Ej. 18.015 (agua)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      {modo === 'moles_a_masa' ? (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad en moles (n)</label>
          <input type="number" value={moles} onChange={(e) => { setMoles(e.target.value); setResult(null); }} placeholder="Ej. 2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      ) : (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa en gramos (g)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); setResult(null); }} placeholder="Ej. 36.03" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} {modo === 'moles_a_masa' ? 'g' : 'mol'}</p>
        </div>
      )}
    </div>
  );
}
