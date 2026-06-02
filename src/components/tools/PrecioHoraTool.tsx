import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function PrecioHoraTool() {
  const [salario, setSalario] = useState('');
  const [horas, setHoras] = useState('8');
  const [dias, setDias] = useState('22');
  const [meses, setMeses] = useState('12');
  const [result, setResult] = useState<{ hora: number; dia: number; mes: number; anio: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(salario.replace(',', '.'));
      const h = parseFloat(horas.replace(',', '.'));
      const d = parseFloat(dias.replace(',', '.'));
      const m = parseFloat(meses.replace(',', '.'));
      if (isNaN(s) || isNaN(h) || isNaN(d) || isNaN(m)) throw new Error('Introduce todos los valores.');
      if (s <= 0 || h <= 0 || d <= 0 || m <= 0) throw new Error('Todos los valores deben ser positivos.');
      const anio = s;
      const mes = s / m;
      const dia = s / (m * d);
      const hora = s / (m * d * h);
      setResult({ hora, dia, mes, anio });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual (€)</label>
        <input type="number" value={salario} onChange={(e) => { setSalario(e.target.value); setResult(null); }} placeholder="Ej. 30000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas/día</label>
          <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días laborales/mes</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="22" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Meses/año</label>
          <input type="number" value={meses} onChange={(e) => { setMeses(e.target.value); setResult(null); }} placeholder="12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por hora</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.hora)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por día</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.dia)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por mes</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.mes)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por año</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.anio)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
