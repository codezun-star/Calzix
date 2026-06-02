import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Escala = 'esp10' | 'pct' | 'us' | 'eu5' | 'col5';

const ESCALAS: Record<Escala, { label: string; min: number; max: number }> = {
  esp10: { label: 'España (0–10)',      min: 0,   max: 10  },
  pct:   { label: 'Porcentaje (0–100)', min: 0,   max: 100 },
  us:    { label: 'EE.UU. (A–F)',       min: 0,   max: 4   },
  eu5:   { label: 'Europa (1–5)',       min: 1,   max: 5   },
  col5:  { label: 'Colombia (0–5)',     min: 0,   max: 5   },
};

function toBase(valor: number, escala: Escala): number {
  switch (escala) {
    case 'esp10': return valor / 10;
    case 'pct':   return valor / 100;
    case 'us':    return valor / 4;
    case 'eu5':   return (valor - 1) / 4;
    case 'col5':  return valor / 5;
  }
}

function fromBase(base: number, escala: Escala): number {
  switch (escala) {
    case 'esp10': return base * 10;
    case 'pct':   return base * 100;
    case 'us':    return base * 4;
    case 'eu5':   return base * 4 + 1;
    case 'col5':  return base * 5;
  }
}

function letraUS(gpa: number): string {
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.3) return 'A−';
  if (gpa >= 3.0) return 'B+';
  if (gpa >= 2.7) return 'B';
  if (gpa >= 2.3) return 'B−';
  if (gpa >= 2.0) return 'C+';
  if (gpa >= 1.7) return 'C';
  if (gpa >= 1.3) return 'C−';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

export default function ConversionNotasTool() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState<Escala>('esp10');
  const [result, setResult] = useState<Record<Escala, number> | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(valor.replace(',', '.'));
      if (isNaN(v)) throw new Error('Introduce la nota a convertir.');
      const { min, max } = ESCALAS[de];
      if (v < min || v > max) throw new Error(`La nota debe estar entre ${min} y ${max} para ${ESCALAS[de].label}.`);
      const base = toBase(v, de);
      const res: Record<Escala, number> = {} as Record<Escala, number>;
      (Object.keys(ESCALAS) as Escala[]).forEach((e) => { res[e] = fromBase(base, e); });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Escala de origen</label>
          <select value={de} onChange={(e) => { setDe(e.target.value as Escala); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {(Object.entries(ESCALAS) as [Escala, (typeof ESCALAS)[Escala]][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota a convertir</label>
          <input type="number" value={valor} onChange={(e) => { setValor(e.target.value); setResult(null); }} placeholder={`${ESCALAS[de].min}–${ESCALAS[de].max}`} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          {(Object.entries(ESCALAS) as [Escala, (typeof ESCALAS)[Escala]][]).filter(([k]) => k !== de).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">{v.label}</span>
              <span className="font-extrabold text-[var(--color-text)]">
                {formatNumber(result[k], 2)}{k === 'us' ? ` (${letraUS(result[k])})` : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
