import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PapelPintadoTool() {
  const [perimetro, setPerimetro] = useState('');
  const [altura, setAltura] = useState('');
  const [largoRollo, setLargoRollo] = useState('10');
  const [anchoRollo, setAnchoRollo] = useState('0.53');
  const [result, setResult] = useState<{ rollos: number; tiras: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(perimetro), h = parseFloat(altura), lr = parseFloat(largoRollo), ar = parseFloat(anchoRollo);
      if ([p, h, lr, ar].some((x) => isNaN(x) || x <= 0)) throw new Error('Introduce todos los valores con números positivos.');
      const tirasPorRollo = Math.floor(lr / (h + 0.1)); // +10 cm de margen de corte por tira
      if (tirasPorRollo < 1) throw new Error('El rollo es más corto que la altura de la pared más el margen.');
      const tirasNecesarias = Math.ceil(p / ar);
      const rollos = Math.ceil(tirasNecesarias / tirasPorRollo);
      setResult({ rollos, tiras: tirasNecesarias });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Perímetro a empapelar (m)</label>
          <input type="number" value={perimetro} onChange={(e) => { setPerimetro(e.target.value); setResult(null); }} placeholder="Ej. 16" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura de pared (m)</label>
          <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); setResult(null); }} placeholder="Ej. 2.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo del rollo (m)</label>
          <input type="number" value={largoRollo} onChange={(e) => { setLargoRollo(e.target.value); setResult(null); }} placeholder="10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho del rollo (m)</label>
          <input type="number" value={anchoRollo} onChange={(e) => { setAnchoRollo(e.target.value); setResult(null); }} placeholder="0.53" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular rollos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Rollos necesarios</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.rollos} rollos</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Para {result.tiras} tiras verticales. Compra siempre 1 rollo extra para cuadrar dibujos y retoques.</p>
        </div>
      )}
    </div>
  );
}
