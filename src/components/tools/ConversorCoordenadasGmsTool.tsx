import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorCoordenadasGmsTool() {
  const [mode, setMode] = useState<'toGms' | 'toDec'>('toGms');
  const [dec, setDec] = useState('');
  const [g, setG] = useState('');
  const [m, setM] = useState('');
  const [s, setS] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (mode === 'toGms') {
        const d = parseFloat(dec);
        if (isNaN(d)) throw new Error('Introduce los grados decimales.');
        const sign = d < 0 ? -1 : 1;
        const abs = Math.abs(d);
        const grados = Math.floor(abs);
        const minFloat = (abs - grados) * 60;
        const minutos = Math.floor(minFloat);
        const segundos = (minFloat - minutos) * 60;
        setResult(`${sign * grados}° ${minutos}' ${formatNumber(segundos, 2)}"`);
      } else {
        const gd = parseFloat(g), mn = parseFloat(m || '0'), sc = parseFloat(s || '0');
        if (isNaN(gd) || isNaN(mn) || isNaN(sc)) throw new Error('Introduce grados, minutos y segundos.');
        if (mn < 0 || mn >= 60 || sc < 0 || sc >= 60) throw new Error('Minutos y segundos deben estar entre 0 y 59,99.');
        const sign = gd < 0 ? -1 : 1;
        setResult(`${formatNumber(sign * (Math.abs(gd) + mn / 60 + sc / 3600), 6)}°`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['toGms', 'Decimal → GMS'], ['toDec', 'GMS → Decimal']] as const).map(([mm, label]) => (
          <button key={mm} onClick={() => { setMode(mm); setResult(null); setError(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === mm ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'toGms' ? (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Grados decimales</label>
          <input type="number" value={dec} onChange={(e) => { setDec(e.target.value); setResult(null); }} placeholder="Ej. 40.4168" className={INPUT} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Grados</label>
            <input type="number" value={g} onChange={(e) => { setG(e.target.value); setResult(null); }} placeholder="40" className={INPUT} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos</label>
            <input type="number" value={m} onChange={(e) => { setM(e.target.value); setResult(null); }} placeholder="25" className={INPUT} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Segundos</label>
            <input type="number" value={s} onChange={(e) => { setS(e.target.value); setResult(null); }} placeholder="0.5" className={INPUT} />
          </div>
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
