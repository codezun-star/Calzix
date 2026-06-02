import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function VarianzaDesviacionTool() {
  const [datos, setDatos] = useState('');
  const [tipo, setTipo] = useState<'poblacion' | 'muestra'>('poblacion');
  const [result, setResult] = useState<{ media: number; varianza: number; desviacion: number; n: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nums = datos.split(/[,;\s]+/).map((s) => parseFloat(s.replace(',', '.'))).filter((n) => !isNaN(n));
      if (nums.length < 2) throw new Error('Introduce al menos 2 valores separados por coma o espacio.');
      const n = nums.length;
      const media = nums.reduce((a, b) => a + b, 0) / n;
      const sumaDesv = nums.reduce((acc, x) => acc + (x - media) ** 2, 0);
      const divisor = tipo === 'poblacion' ? n : n - 1;
      const varianza = sumaDesv / divisor;
      setResult({ media, varianza, desviacion: Math.sqrt(varianza), n });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Datos (separados por coma o espacio)</label>
        <input type="text" value={datos} onChange={(e) => { setDatos(e.target.value); setResult(null); }} placeholder="Ej. 4, 8, 15, 16, 23, 42" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <fieldset className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="poblacion" checked={tipo === 'poblacion'} onChange={() => { setTipo('poblacion'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Población (÷ n)</span></label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="muestra" checked={tipo === 'muestra'} onChange={() => { setTipo('muestra'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Muestra (÷ n−1)</span></label>
      </fieldset>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">n (datos)</p><p className="text-lg font-extrabold text-[var(--color-text)]">{result.n}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Media (x̄)</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.media, 4)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Varianza</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.varianza, 4)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Desviación típica</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.desviacion, 4)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
