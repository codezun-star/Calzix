import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PalabrasLibroTool() {
  const [paginas, setPaginas] = useState('');
  const [palabrasPagina, setPalabrasPagina] = useState('280');
  const [velocidad, setVelocidad] = useState('250');
  const [result, setResult] = useState<{ palabras: number; minutos: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(paginas), wpp = parseFloat(palabrasPagina), v = parseFloat(velocidad);
      if (isNaN(p) || p <= 0) throw new Error('Introduce el número de páginas.');
      if (isNaN(wpp) || wpp <= 0) throw new Error('Introduce las palabras por página.');
      if (isNaN(v) || v <= 0) throw new Error('Introduce tu velocidad de lectura.');
      const palabras = p * wpp;
      setResult({ palabras, minutos: palabras / v });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas</label>
          <input type="number" value={paginas} onChange={(e) => { setPaginas(e.target.value); setResult(null); }} placeholder="Ej. 350" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Palabras/página</label>
          <input type="number" value={palabrasPagina} onChange={(e) => { setPalabrasPagina(e.target.value); setResult(null); }} placeholder="280" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tu velocidad (ppm)</label>
          <input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="250" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Palabras totales del libro</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.palabras, 0)} palabras</p>
          <p className="text-sm text-[var(--color-text-secondary)]">A {velocidad} ppm tardarías unas {formatNumber(result.minutos / 60, 1)} horas en leerlo.</p>
        </div>
      )}
    </div>
  );
}
