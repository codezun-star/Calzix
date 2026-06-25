import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function randInt(n: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % n;
}

export default function TiradaDadosTool() {
  const [cantidad, setCantidad] = useState('2');
  const [caras, setCaras] = useState('6');
  const [modificador, setModificador] = useState('0');
  const [result, setResult] = useState<{ tiradas: number[]; suma: number } | null>(null);
  const [error, setError] = useState('');

  function tirar() {
    try {
      setError('');
      const n = parseInt(cantidad, 10), c = parseInt(caras, 10), m = parseInt(modificador || '0', 10);
      if (isNaN(n) || n < 1 || n > 50) throw new Error('Tira entre 1 y 50 dados.');
      if (isNaN(c) || c < 2 || c > 1000) throw new Error('Los dados deben tener entre 2 y 1000 caras.');
      if (isNaN(m)) throw new Error('El modificador debe ser un número entero.');
      const tiradas = Array.from({ length: n }, () => randInt(c) + 1);
      setResult({ tiradas, suma: tiradas.reduce((a, b) => a + b, 0) + m });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al tirar.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nº de dados</label>
          <input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Caras por dado</label>
          <input type="number" value={caras} onChange={(e) => { setCaras(e.target.value); setResult(null); }} placeholder="6" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Modificador</label>
          <input type="number" value={modificador} onChange={(e) => { setModificador(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
      </div>
      <button onClick={tirar} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Tirar dados</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            {result.tiradas.map((t, i) => (
              <span key={i} className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-calcs-border)] px-2 text-sm font-bold text-[var(--color-text)]">{t}</span>
            ))}
          </div>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">Total: {result.suma}</p>
        </div>
      )}
    </div>
  );
}
