import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function DeudaSuenoTool() {
  const [horasIdeal, setHorasIdeal] = useState('8');
  const [dias, setDias] = useState([
    { dia: 'Lunes', dormido: '' },
    { dia: 'Martes', dormido: '' },
    { dia: 'Miércoles', dormido: '' },
    { dia: 'Jueves', dormido: '' },
    { dia: 'Viernes', dormido: '' },
    { dia: 'Sábado', dormido: '' },
    { dia: 'Domingo', dormido: '' },
  ]);
  const [result, setResult] = useState<{ deudaHoras: number; estado: string } | null>(null);
  const [error, setError] = useState('');

  function actualizar(idx: number, val: string) {
    setDias((prev) => prev.map((d, i) => i === idx ? { ...d, dormido: val } : d));
    setResult(null);
  }

  function calcular() {
    try {
      setError('');
      const ideal = parseFloat(horasIdeal.replace(',', '.'));
      if (isNaN(ideal) || ideal <= 0) throw new Error('Introduce las horas de sueño ideales.');
      const semana = dias.map((d) => parseFloat(d.dormido.replace(',', '.'))).filter((n) => !isNaN(n));
      if (semana.length === 0) throw new Error('Introduce las horas dormidas en al menos un día.');
      const totalDormido = semana.reduce((a, b) => a + b, 0);
      const totalIdeal = ideal * semana.length;
      const deudaHoras = totalIdeal - totalDormido;
      const estado = deudaHoras <= 0 ? 'Al día con el sueño' : deudaHoras <= 4 ? 'Deuda moderada' : deudaHoras <= 8 ? 'Deuda significativa' : 'Deuda severa';
      setResult({ deudaHoras, estado });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de sueño ideales por noche</label>
        <input type="number" value={horasIdeal} onChange={(e) => { setHorasIdeal(e.target.value); setResult(null); }} placeholder="8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Horas dormidas esta semana</p>
        <div className="grid grid-cols-2 gap-2">
          {dias.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-secondary)] w-16">{d.dia}</span>
              <input type="number" value={d.dormido} onChange={(e) => actualizar(i, e.target.value)} placeholder="h" min="0" max="24" step="0.5" className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular deuda</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-1 ${result.deudaHoras <= 0 ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          <p className="text-sm font-semibold text-[var(--color-text)]">{result.estado}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">
            {result.deudaHoras > 0 ? `-${formatNumber(result.deudaHoras, 1)}h de sueño` : `+${formatNumber(Math.abs(result.deudaHoras), 1)}h de superávit`}
          </p>
        </div>
      )}
    </div>
  );
}
