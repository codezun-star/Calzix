import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorTiempoDecimalTool() {
  const [mode, setMode] = useState<'toDecimal' | 'toHm'>('toDecimal');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (mode === 'toDecimal') {
        const h = parseInt(horas || '0', 10);
        const m = parseInt(minutos || '0', 10);
        if (isNaN(h) || isNaN(m)) throw new Error('Introduce horas y minutos.');
        if (m < 0 || m > 59) throw new Error('Los minutos deben estar entre 0 y 59.');
        setResult(`${formatNumber(h + m / 60, 4)} horas`);
      } else {
        const d = parseFloat(decimal);
        if (isNaN(d) || d < 0) throw new Error('Introduce las horas en formato decimal.');
        const h = Math.floor(d);
        const m = Math.round((d - h) * 60);
        const hh = m === 60 ? h + 1 : h;
        const mm = m === 60 ? 0 : m;
        setResult(`${hh} h ${mm.toString().padStart(2, '0')} min`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['toDecimal', 'Horas:min → Decimal'], ['toHm', 'Decimal → Horas:min']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setError(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'toDecimal' ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas</label>
            <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="Ej. 2" className={INPUT} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos</label>
            <input type="number" value={minutos} onChange={(e) => { setMinutos(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas en decimal</label>
          <input type="number" value={decimal} onChange={(e) => { setDecimal(e.target.value); setResult(null); }} placeholder="Ej. 2.5" className={INPUT} />
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result}</p>
        </div>
      )}
    </div>
  );
}
