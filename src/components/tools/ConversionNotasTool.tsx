import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Escala = 'esp10' | 'pct' | 'us' | 'eu5';

const ESCALAS: Record<Escala, { label: string; min: number; max: number }> = {
  esp10: { label: 'España (0–10)',          min: 0,   max: 10  },
  pct:   { label: 'Porcentaje (0–100)',     min: 0,   max: 100 },
  us:    { label: 'GPA de EE. UU. (0–4)',   min: 0,   max: 4   },
  eu5:   { label: 'Escala de 1 a 5',        min: 1,   max: 5   },
};

function toBase(valor: number, escala: Escala): number {
  switch (escala) {
    case 'esp10': return valor / 10;
    case 'pct':   return valor / 100;
    case 'us':    return valor / 4;
    case 'eu5':   return (valor - 1) / 4;
  }
}

function fromBase(base: number, escala: Escala): number {
  switch (escala) {
    case 'esp10': return base * 10;
    case 'pct':   return base * 100;
    case 'us':    return base * 4;
    case 'eu5':   return base * 4 + 1;
  }
}

function letraUS(gpa: number): string {
  // Cada letra se asigna al valor GPA más cercano (A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0…).
  if (gpa >= 3.85) return 'A';
  if (gpa >= 3.5) return 'A−';
  if (gpa >= 3.15) return 'B+';
  if (gpa >= 2.85) return 'B';
  if (gpa >= 2.5) return 'B−';
  if (gpa >= 2.15) return 'C+';
  if (gpa >= 1.85) return 'C';
  if (gpa >= 1.5) return 'C−';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

/** Calificación oficial en España (RD 1125/2003). */
function calificacionEs(nota: number): string {
  if (nota >= 9) return 'Sobresaliente';
  if (nota >= 7) return 'Notable';
  if (nota >= 5) return 'Aprobado';
  return 'Suspenso';
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
          <p className="text-xs text-[var(--color-text-secondary)]">
            Calificación en España: <strong className="text-[var(--color-text)]">{calificacionEs(result.esp10)}</strong> ({formatNumber(result.esp10, 2)} sobre 10)
          </p>
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
      <p className="text-xs text-[var(--color-text-muted)]">
        Conversión lineal orientativa. Para Erasmus y másteres, cada universidad aplica su propia tabla de equivalencias.
      </p>
    </div>
  );
}
