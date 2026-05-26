import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Mode = '1' | '2' | '3';

export default function PorcentajeTool() {
  const [mode, setMode] = useState<Mode>('1');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      setResult(null);
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));

      if (mode === '1') {
        if (isNaN(na) || isNaN(nb)) throw new Error('Introduce números válidos en ambos campos.');
        const res = nb * na / 100;
        setResult(res);
        setDescription(`El ${formatNumber(na)} % de ${formatNumber(nb)} es ${formatNumber(res)}`);
      } else if (mode === '2') {
        if (isNaN(na) || isNaN(nb)) throw new Error('Introduce números válidos en ambos campos.');
        if (nb === 0) throw new Error('El número total no puede ser cero.');
        if (nb < 0) throw new Error('El número total debe ser mayor que cero.');
        const res = na / nb * 100;
        setResult(res);
        setDescription(`${formatNumber(na)} es el ${formatNumber(res)} % de ${formatNumber(nb)}`);
      } else {
        if (isNaN(na) || isNaN(nb)) throw new Error('Introduce números válidos en ambos campos.');
        if (nb === 0) throw new Error('El porcentaje no puede ser cero.');
        if (nb < 0) throw new Error('El porcentaje debe ser mayor que cero.');
        const res = na / (nb / 100);
        setResult(res);
        setDescription(`${formatNumber(na)} es el ${formatNumber(nb)} % de ${formatNumber(res)}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const modos: { value: Mode; label: string; labelA: string; labelB: string }[] = [
    { value: '1', label: '¿Cuánto es X% de N?', labelA: 'Porcentaje (X %)', labelB: 'Número (N)' },
    { value: '2', label: '¿Qué porcentaje es X de N?', labelA: 'Valor (X)', labelB: 'Total (N)' },
    { value: '3', label: 'X es el Y% de ¿qué número?', labelA: 'Valor (X)', labelB: 'Porcentaje (Y %)' },
  ];

  const modoActual = modos.find((m) => m.value === mode)!;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Modo de cálculo</legend>
        {modos.map((m) => (
          <label key={m.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="mode"
              value={m.value}
              checked={mode === m.value}
              onChange={() => { setMode(m.value); setResult(null); setError(''); }}
              className="accent-[var(--color-accent)] w-4 h-4"
            />
            <span className="text-sm text-[var(--color-text)]">{m.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modoActual.labelA}</label>
          <input
            type="number"
            value={a}
            onChange={(e) => { setA(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modoActual.labelB}</label>
          <input
            type="number"
            value={b}
            onChange={(e) => { setB(e.target.value); setResult(null); }}
            placeholder="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result)}{mode === '2' ? ' %' : ''}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        </div>
      )}
    </div>
  );
}
