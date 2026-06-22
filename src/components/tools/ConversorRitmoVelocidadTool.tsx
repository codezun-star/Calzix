import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorRitmoVelocidadTool() {
  const [mode, setMode] = useState<'ritmoToVel' | 'velToRitmo'>('ritmoToVel');
  const [min, setMin] = useState('');
  const [seg, setSeg] = useState('');
  const [kmh, setKmh] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (mode === 'ritmoToVel') {
        const m = parseInt(min || '0', 10);
        const s = parseInt(seg || '0', 10);
        if (isNaN(m) || isNaN(s)) throw new Error('Introduce el ritmo en minutos y segundos por km.');
        const totalMin = m + s / 60;
        if (totalMin <= 0) throw new Error('El ritmo debe ser mayor que cero.');
        setResult(`${formatNumber(60 / totalMin, 2)} km/h`);
      } else {
        const v = parseFloat(kmh);
        if (isNaN(v) || v <= 0) throw new Error('Introduce una velocidad mayor que cero.');
        const minPerKm = 60 / v;
        const m = Math.floor(minPerKm);
        const s = Math.round((minPerKm - m) * 60);
        const mm = s === 60 ? m + 1 : m;
        const ss = s === 60 ? 0 : s;
        setResult(`${mm}:${ss.toString().padStart(2, '0')} min/km`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Convierte entre ritmo (min/km) y velocidad (km/h), ideal para running y ciclismo.</p>
      <div className="flex gap-2">
        {([['ritmoToVel', 'Ritmo → Velocidad'], ['velToRitmo', 'Velocidad → Ritmo']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setError(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'ritmoToVel' ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos / km</label>
            <input type="number" value={min} onChange={(e) => { setMin(e.target.value); setResult(null); }} placeholder="Ej. 5" className={INPUT} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Segundos / km</label>
            <input type="number" value={seg} onChange={(e) => { setSeg(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad (km/h)</label>
          <input type="number" value={kmh} onChange={(e) => { setKmh(e.target.value); setResult(null); }} placeholder="Ej. 12" className={INPUT} />
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
