import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'ph_a_poh' | 'conc_a_ph' | 'ph_a_conc';

const CLASIFICACION = [
  { max: 2,  label: 'Ácido muy fuerte' },
  { max: 4,  label: 'Ácido fuerte' },
  { max: 6,  label: 'Ácido débil' },
  { max: 7,  label: 'Neutro' },
  { max: 9,  label: 'Base débil' },
  { max: 12, label: 'Base fuerte' },
  { max: 14, label: 'Base muy fuerte' },
];

export default function PhTool() {
  const [modo, setModo] = useState<Modo>('ph_a_poh');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ ph: number; poh: number; h: number; oh: number; clase: string } | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; placeholder: string }[] = [
    { value: 'ph_a_poh',   label: 'Conoces el pH — calcular pOH y concentraciones',   placeholder: 'pH (0–14)' },
    { value: 'conc_a_ph',  label: 'Concentración de H⁺ (mol/L) → calcular pH',        placeholder: 'Ej. 0.001' },
    { value: 'ph_a_conc',  label: 'pOH → calcular pH y concentraciones',              placeholder: 'pOH (0–14)' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const v = parseFloat(input.replace(',', '.'));
      if (isNaN(v)) throw new Error('Introduce un valor numérico válido.');
      let ph: number;
      if (modo === 'ph_a_poh')  { ph = v; if (ph < 0 || ph > 14) throw new Error('El pH debe estar entre 0 y 14.'); }
      else if (modo === 'conc_a_ph') { if (v <= 0) throw new Error('La concentración debe ser positiva.'); ph = -Math.log10(v); }
      else { const poh = v; if (poh < 0 || poh > 14) throw new Error('El pOH debe estar entre 0 y 14.'); ph = 14 - poh; }
      const poh = 14 - ph;
      const h = Math.pow(10, -ph);
      const oh = Math.pow(10, -poh);
      const clase = CLASIFICACION.find((c) => ph <= c.max)?.label ?? 'Base muy fuerte';
      setResult({ ph, poh, h, oh, clase });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de cálculo</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); setInput(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor de entrada</label>
        <input type="number" value={input} onChange={(e) => { setInput(e.target.value); setResult(null); }} placeholder={m.placeholder} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <p className="text-sm font-semibold text-[var(--color-text)]">{result.clase}</p>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">pH</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ph, 4)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">pOH</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.poh, 4)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">[H⁺] (mol/L)</p><p className="font-extrabold text-[var(--color-text)]">{result.h.toExponential(3)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">[OH⁻] (mol/L)</p><p className="font-extrabold text-[var(--color-text)]">{result.oh.toExponential(3)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
