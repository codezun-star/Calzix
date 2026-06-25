import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function SalarioPorHoraTool() {
  const [mode, setMode] = useState<'anualToHora' | 'horaToAnual'>('anualToHora');
  const [valor, setValor] = useState('');
  const [horasSemana, setHorasSemana] = useState('40');
  const [semanas, setSemanas] = useState('52');
  const [result, setResult] = useState<{ value: number; label: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(valor), h = parseFloat(horasSemana), s = parseFloat(semanas);
      if (isNaN(v) || v < 0) throw new Error('Introduce el salario.');
      if (isNaN(h) || h <= 0 || isNaN(s) || s <= 0) throw new Error('Introduce horas por semana y semanas al año válidas.');
      const horasAnuales = h * s;
      if (mode === 'anualToHora') setResult({ value: v / horasAnuales, label: 'Salario por hora' });
      else setResult({ value: v * horasAnuales, label: 'Salario anual' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['anualToHora', 'Anual → Hora'], ['horaToAnual', 'Hora → Anual']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setValor(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{mode === 'anualToHora' ? 'Salario anual' : 'Salario por hora'}</label>
          <input type="number" value={valor} onChange={(e) => { setValor(e.target.value); setResult(null); }} placeholder={mode === 'anualToHora' ? 'Ej. 24000' : 'Ej. 12'} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas/semana</label>
          <input type="number" value={horasSemana} onChange={(e) => { setHorasSemana(e.target.value); setResult(null); }} placeholder="40" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Semanas/año</label>
          <input type="number" value={semanas} onChange={(e) => { setSemanas(e.target.value); setResult(null); }} placeholder="52" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.label}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.value)}</p>
        </div>
      )}
    </div>
  );
}
