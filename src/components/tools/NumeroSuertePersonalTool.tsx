import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function reducir(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

export default function NumeroSuertePersonalTool() {
  const [fecha, setFecha] = useState('');
  const [result, setResult] = useState<{ numero: number; suma: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fecha) throw new Error('Introduce tu fecha de nacimiento.');
      const digitos = fecha.replace(/\D/g, '');
      if (digitos.length < 8) throw new Error('Fecha no válida.');
      const suma = digitos.split('').reduce((a, d) => a + Number(d), 0);
      setResult({ numero: reducir(suma), suma });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Tu número de la suerte se obtiene sumando todas las cifras de tu fecha de nacimiento.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento</label>
        <input type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); setResult(null); }} className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular mi número</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Tu número de la suerte</p>
          <p className="text-4xl font-extrabold text-[var(--color-text)]">{result.numero}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Suma de las cifras de tu fecha: {result.suma}.</p>
        </div>
      )}
    </div>
  );
}
