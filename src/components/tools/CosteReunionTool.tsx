import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function CosteReunionTool() {
  const [asistentes, setAsistentes] = useState('');
  const [salarioHora, setSalarioHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const [result, setResult] = useState<{ costePorMinuto: number; costeTotal: number; costePorPersona: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(asistentes.replace(',', '.'));
      const sh = parseFloat(salarioHora.replace(',', '.'));
      const d = parseFloat(duracion.replace(',', '.'));
      if (isNaN(n) || isNaN(sh) || isNaN(d)) throw new Error('Introduce todos los valores.');
      if (n <= 0 || sh <= 0 || d <= 0) throw new Error('Todos los valores deben ser positivos.');
      const costePorMinuto = (n * sh) / 60;
      const costeTotal = costePorMinuto * d;
      setResult({ costePorMinuto, costeTotal, costePorPersona: costeTotal / n });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de asistentes</label>
          <input type="number" value={asistentes} onChange={(e) => { setAsistentes(e.target.value); setResult(null); }} placeholder="Ej. 8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coste hora/persona (€)</label>
          <input type="number" value={salarioHora} onChange={(e) => { setSalarioHora(e.target.value); setResult(null); }} placeholder="Ej. 25" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Duración de la reunión (minutos)</label>
        <input type="number" value={duracion} onChange={(e) => { setDuracion(e.target.value); setResult(null); }} placeholder="Ej. 60" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Coste total de la reunión</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.costeTotal)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por minuto</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.costePorMinuto)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.costePorPersona)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
