import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const PARAMETROS = [
  { key: 'ph',     label: 'pH',                  min: 6.5,  max: 8.5,  unidad: '' },
  { key: 'turbid', label: 'Turbidez (NTU)',       min: 0,    max: 4,    unidad: 'NTU' },
  { key: 'cloro',  label: 'Cloro libre (mg/L)',   min: 0.2,  max: 1.5,  unidad: 'mg/L' },
  { key: 'nitrat', label: 'Nitratos (mg/L)',      min: 0,    max: 50,   unidad: 'mg/L' },
  { key: 'conduct',label: 'Conductividad (µS/cm)', min: 0,   max: 2500, unidad: 'µS/cm' },
];

export default function CalidadAguaTool() {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ parametros: { label: string; valor: number; ok: boolean }[]; indice: number; estado: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const checks = PARAMETROS.map((p) => {
        const v = parseFloat((vals[p.key] ?? '').replace(',', '.'));
        if (isNaN(v)) throw new Error(`Introduce el valor de ${p.label}.`);
        return { label: p.label, valor: v, ok: v >= p.min && v <= p.max };
      });
      const okCount = checks.filter((c) => c.ok).length;
      const indice = Math.round((okCount / PARAMETROS.length) * 100);
      const estado = indice === 100 ? 'Excelente' : indice >= 80 ? 'Buena' : indice >= 60 ? 'Aceptable' : 'No apta';
      setResult({ parametros: checks, indice, estado });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce los valores de los parámetros analizados para evaluar la calidad del agua.</p>
      <div className="grid grid-cols-2 gap-3">
        {PARAMETROS.map((p) => (
          <div key={p.key} className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">{p.label}</label>
            <input type="number" value={vals[p.key] ?? ''} onChange={(e) => { setVals((v) => ({ ...v, [p.key]: e.target.value })); setResult(null); }} placeholder={`${p.min}–${p.max} ${p.unidad}`} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Evaluar calidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--color-text)]">Calidad: {result.estado}</span>
            <span className="text-2xl font-extrabold text-[var(--color-text)]">{result.indice}%</span>
          </div>
          <div className="space-y-1">
            {result.parametros.map((p) => (
              <div key={p.label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">{p.label}</span>
                <span className={`font-semibold ${p.ok ? 'text-green-600' : 'text-red-600'}`}>{formatNumber(p.valor, 2)} — {p.ok ? 'OK' : 'Fuera de rango'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
