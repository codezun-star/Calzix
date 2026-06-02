import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Tipo = 'directa' | 'inversa';

export default function ReglaTresTool() {
  const [tipo, setTipo] = useState<Tipo>('directa');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      const nc = parseFloat(c.replace(',', '.'));
      if (isNaN(na) || isNaN(nb) || isNaN(nc)) throw new Error('Introduce los tres valores conocidos.');
      if (na === 0) throw new Error('El primer valor (A) no puede ser cero.');
      if (tipo === 'directa') {
        setResult((nb * nc) / na);
      } else {
        if (nc === 0) throw new Error('C no puede ser cero en proporción inversa.');
        setResult((na * nb) / nc);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de proporcionalidad</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="tipo" value="directa" checked={tipo === 'directa'} onChange={() => { setTipo('directa'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Directa — Si A → B, ¿cuánto es C → X?</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="tipo" value="inversa" checked={tipo === 'inversa'} onChange={() => { setTipo('inversa'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Inversa — Si A tarda B, ¿cuánto tarda C?</span>
        </label>
      </fieldset>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A (conocido)</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">B (conocido)</label>
          <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">C (nuevo)</label>
          <input type="number" value={c} onChange={(e) => { setC(e.target.value); setResult(null); }} placeholder="Ej. 8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular X</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Resultado X</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 6)}</p>
        </div>
      )}
    </div>
  );
}
