import { useState } from 'react';

function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

const CARAS: Record<number, string> = {
  4: 'D4', 6: 'D6', 8: 'D8', 10: 'D10', 12: 'D12', 20: 'D20', 100: 'D100',
};

export default function DadoVirtualTool() {
  const [caras, setCaras] = useState(6);
  const [cantidad, setCantidad] = useState(1);
  const [resultado, setResultado] = useState<number[] | null>(null);

  function lanzar() {
    const dados = Array.from({ length: cantidad }, () => randomInt(1, caras));
    setResultado(dados);
  }

  const suma = resultado?.reduce((a, b) => a + b, 0) ?? 0;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de dado</label>
          <select value={caras} onChange={(e) => { setCaras(parseInt(e.target.value)); setResultado(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {Object.entries(CARAS).map(([k, v]) => <option key={k} value={k}>{v} (1–{k})</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de dados</label>
          <select value={cantidad} onChange={(e) => { setCantidad(parseInt(e.target.value)); setResultado(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {[1,2,3,4,5,6,8,10].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <button onClick={lanzar} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Lanzar dados</button>
      {resultado !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="flex flex-wrap gap-3 justify-center">
            {resultado.map((r, i) => (
              <div key={i} className="w-12 h-12 rounded-xl bg-white border-2 border-[var(--color-border)] flex items-center justify-center text-xl font-extrabold text-[var(--color-text)] shadow">
                {r}
              </div>
            ))}
          </div>
          {resultado.length > 1 && <p className="text-center text-sm text-[var(--color-text-secondary)]">Suma total: <span className="font-extrabold text-[var(--color-text)]">{suma}</span></p>}
        </div>
      )}
    </div>
  );
}
