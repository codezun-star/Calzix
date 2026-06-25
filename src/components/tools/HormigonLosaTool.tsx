import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HormigonLosaTool() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [espesor, setEspesor] = useState('');
  const [result, setResult] = useState<{ vol: number; volExtra: number; sacos: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(largo), a = parseFloat(ancho), e = parseFloat(espesor);
      if (isNaN(l) || isNaN(a) || isNaN(e)) throw new Error('Introduce largo, ancho y espesor.');
      if (l <= 0 || a <= 0 || e <= 0) throw new Error('Las medidas deben ser mayores que cero.');
      const vol = l * a * (e / 100);
      setResult({ vol, volExtra: vol * 1.1, sacos: Math.ceil(vol * 7) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula el hormigón para una losa, solera o cimiento rectangular.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo (m)</label>
          <input type="number" value={largo} onChange={(e) => { setLargo(e.target.value); setResult(null); }} placeholder="Ej. 4" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (m)</label>
          <input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); setResult(null); }} placeholder="Ej. 3" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Espesor (cm)</label>
          <input type="number" value={espesor} onChange={(e) => { setEspesor(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Volumen de hormigón</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.vol, 3)} m³</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">Con 10 % de desperdicio: <strong>{formatNumber(result.volExtra, 3)} m³</strong>. Si lo amasas tú, necesitarás unos <strong>{result.sacos} sacos de cemento de 50 kg</strong> (más arena y grava).</p>
        </div>
      )}
    </div>
  );
}
