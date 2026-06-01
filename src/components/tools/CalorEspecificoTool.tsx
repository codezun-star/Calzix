import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'calor' | 'masa' | 'especifico' | 'delta';

const MODOS: { value: Modo; label: string; unit: string; inputs: [string, string, string] }[] = [
  {
    value: 'calor',
    label: 'Calcular calor absorbido/cedido (Q)',
    unit: 'J',
    inputs: ['Masa m (kg)', 'Calor específico c (J/kg·°C)', 'Variación de temperatura ΔT (°C)'],
  },
  {
    value: 'masa',
    label: 'Calcular masa (m)',
    unit: 'kg',
    inputs: ['Calor Q (J)', 'Calor específico c (J/kg·°C)', 'Variación de temperatura ΔT (°C)'],
  },
  {
    value: 'especifico',
    label: 'Calcular calor específico (c)',
    unit: 'J/(kg·°C)',
    inputs: ['Calor Q (J)', 'Masa m (kg)', 'Variación de temperatura ΔT (°C)'],
  },
  {
    value: 'delta',
    label: 'Calcular variación de temperatura (ΔT)',
    unit: '°C',
    inputs: ['Calor Q (J)', 'Masa m (kg)', 'Calor específico c (J/kg·°C)'],
  },
];

export default function CalorEspecificoTool() {
  const [modo, setModo] = useState<Modo>('calor');
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const cfg = MODOS.find((m) => m.value === modo)!;

  function cambiarModo(m: Modo) {
    setModo(m);
    setV1('');
    setV2('');
    setV3('');
    setResult(null);
    setError('');
  }

  function calcular() {
    try {
      setError('');
      const a = parseFloat(v1.replace(',', '.'));
      const b = parseFloat(v2.replace(',', '.'));
      const c = parseFloat(v3.replace(',', '.'));
      if (isNaN(a) || isNaN(b) || isNaN(c)) throw new Error('Introduce los tres valores.');
      if (b === 0 || c === 0) throw new Error('Los factores no pueden ser cero.');
      setResult(modo === 'calor' ? a * b * c : a / (b * c));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">Q = m · c · ΔT</p>

      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        {MODOS.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="modo"
              value={md.value}
              checked={modo === md.value}
              onChange={() => cambiarModo(md.value)}
              className="accent-[var(--color-accent)] w-4 h-4"
            />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{cfg.inputs[0]}</label>
        <input type="number" value={v1} onChange={(e) => { setV1(e.target.value); setResult(null); }} placeholder="0" className={inputClass} />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{cfg.inputs[1]}</label>
        <input type="number" value={v2} onChange={(e) => { setV2(e.target.value); setResult(null); }} placeholder="0" className={inputClass} />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{cfg.inputs[2]}</label>
        <input type="number" value={v3} onChange={(e) => { setV3(e.target.value); setResult(null); }} placeholder="0" className={inputClass} />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">{cfg.label.replace('Calcular ', '')}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">
            {formatNumber(result, 4)} {cfg.unit}
          </p>
        </div>
      )}
    </div>
  );
}
