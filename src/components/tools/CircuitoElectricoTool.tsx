import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'serie' | 'paralelo';

export default function CircuitoElectricoTool() {
  const [modo, setModo] = useState<Modo>('serie');
  const [resistencias, setResistencias] = useState('10, 20, 30');
  const [tension, setTension] = useState('12');
  const [result, setResult] = useState<{ rt: number; it: number; valores: { r: number; v: number; i: number }[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const vs = parseFloat(tension.replace(',', '.'));
      const rs = resistencias.split(/[,;\s]+/).map((s) => parseFloat(s.replace(',', '.'))).filter((n) => !isNaN(n) && n > 0);
      if (rs.length < 1) throw new Error('Introduce al menos una resistencia positiva.');
      if (isNaN(vs) || vs <= 0) throw new Error('La tensión debe ser positiva.');
      let rt: number;
      if (modo === 'serie') {
        rt = rs.reduce((a, b) => a + b, 0);
      } else {
        rt = 1 / rs.reduce((a, b) => a + 1 / b, 0);
      }
      const it = vs / rt;
      const valores = rs.map((r) => {
        if (modo === 'serie') {
          const i = it;
          return { r, v: i * r, i };
        } else {
          const v = vs;
          return { r, v, i: v / r };
        }
      });
      setResult({ rt, it, valores });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="modo" value="serie" checked={modo === 'serie'} onChange={() => { setModo('serie'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Circuito en serie</span></label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="modo" value="paralelo" checked={modo === 'paralelo'} onChange={() => { setModo('paralelo'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Circuito en paralelo</span></label>
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Resistencias (Ω) — separadas por coma</label>
          <input type="text" value={resistencias} onChange={(e) => { setResistencias(e.target.value); setResult(null); }} placeholder="Ej. 10, 20, 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tensión total (V)</label>
          <input type="number" value={tension} onChange={(e) => { setTension(e.target.value); setResult(null); }} placeholder="12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular circuito</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Resistencia total</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.rt, 4)} Ω</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Intensidad total</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.it, 4)} A</p></div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">Por resistencia:</p>
            {result.valores.map((v, i) => (
              <p key={i} className="text-sm text-[var(--color-text)]">R{i+1} = {formatNumber(v.r)} Ω — V = {formatNumber(v.v, 3)} V — I = {formatNumber(v.i, 4)} A</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
