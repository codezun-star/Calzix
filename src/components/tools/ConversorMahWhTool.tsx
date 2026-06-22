import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorMahWhTool() {
  const [mode, setMode] = useState<'mahToWh' | 'whToMah'>('mahToWh');
  const [valor, setValor] = useState('');
  const [voltaje, setVoltaje] = useState('3.7');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(valor);
      const volt = parseFloat(voltaje);
      if (isNaN(v) || v < 0) throw new Error('Introduce una capacidad válida.');
      if (isNaN(volt) || volt <= 0) throw new Error('Introduce un voltaje mayor que cero.');
      if (mode === 'mahToWh') setResult({ value: (v * volt) / 1000, unit: 'Wh' });
      else setResult({ value: (v * 1000) / volt, unit: 'mAh' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Wh = (mAh × V) / 1000. Voltaje típico: 3,7 V (li-ion), 1,2 V (NiMH).</p>
      <div className="flex gap-2">
        {([['mahToWh', 'mAh → Wh'], ['whToMah', 'Wh → mAh']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setValor(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{mode === 'mahToWh' ? 'Capacidad (mAh)' : 'Energía (Wh)'}</label>
          <input type="number" value={valor} onChange={(e) => { setValor(e.target.value); setResult(null); }} placeholder={mode === 'mahToWh' ? 'Ej. 10000' : 'Ej. 37'} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Voltaje (V)</label>
          <input type="number" value={voltaje} onChange={(e) => { setVoltaje(e.target.value); setResult(null); }} placeholder="3.7" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 2)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unit}</span></p>
        </div>
      )}
    </div>
  );
}
