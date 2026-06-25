import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function TiempoAudiolibroTool() {
  const [paginas, setPaginas] = useState('');
  const [palabrasPagina, setPalabrasPagina] = useState('280');
  const [velocidad, setVelocidad] = useState('150');
  const [factor, setFactor] = useState('1');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(paginas), wpp = parseFloat(palabrasPagina), v = parseFloat(velocidad), f = parseFloat(factor);
      if (isNaN(p) || p <= 0) throw new Error('Introduce el número de páginas.');
      if (isNaN(wpp) || wpp <= 0 || isNaN(v) || v <= 0) throw new Error('Revisa las palabras por página y la velocidad.');
      if (isNaN(f) || f <= 0) throw new Error('La velocidad de reproducción debe ser mayor que cero.');
      const minutos = (p * wpp) / (v * f);
      const h = Math.floor(minutos / 60);
      const m = Math.round(minutos % 60);
      setResult(`${h} h ${m.toString().padStart(2, '0')} min`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">La narración media de un audiolibro ronda las 150 palabras por minuto.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas del libro</label>
          <input type="number" value={paginas} onChange={(e) => { setPaginas(e.target.value); setResult(null); }} placeholder="Ej. 320" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Palabras por página</label>
          <input type="number" value={palabrasPagina} onChange={(e) => { setPalabrasPagina(e.target.value); setResult(null); }} placeholder="280" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Narración (palabras/min)</label>
          <input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="150" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad reproducción (×)</label>
          <input type="number" value={factor} onChange={(e) => { setFactor(e.target.value); setResult(null); }} placeholder="1" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular duración</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Duración estimada del audiolibro</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result}</p>
        </div>
      )}
    </div>
  );
}
