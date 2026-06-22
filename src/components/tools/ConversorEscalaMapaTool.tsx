import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorEscalaMapaTool() {
  const [mode, setMode] = useState<'mapToReal' | 'realToMap'>('mapToReal');
  const [escala, setEscala] = useState('');
  const [distancia, setDistancia] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(escala);
      const d = parseFloat(distancia);
      if (isNaN(n) || n <= 0) throw new Error('Introduce el denominador de la escala (ej. 50000).');
      if (isNaN(d) || d < 0) throw new Error('Introduce la distancia.');
      if (mode === 'mapToReal') {
        const realCm = d * n;
        const realM = realCm / 100;
        setResult(realM >= 1000 ? `${formatNumber(realM / 1000, 3)} km` : `${formatNumber(realM, 2)} m`);
      } else {
        const mapCm = (d * 100) / n;
        setResult(`${formatNumber(mapCm, 3)} cm en el mapa`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['mapToReal', 'Mapa → Real'], ['realToMap', 'Real → Mapa']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setDistancia(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Escala 1 :</label>
          <input type="number" value={escala} onChange={(e) => { setEscala(e.target.value); setResult(null); }} placeholder="Ej. 50000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{mode === 'mapToReal' ? 'Distancia en mapa (cm)' : 'Distancia real (m)'}</label>
          <input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder={mode === 'mapToReal' ? 'Ej. 4' : 'Ej. 2000'} className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Distancia equivalente</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result}</p>
        </div>
      )}
    </div>
  );
}
