import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function randomBool(): boolean {
  const arr = new Uint8Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % 2 === 0;
}

export default function CaraCruzTool() {
  const [result, setResult] = useState<string | null>(null);
  const [historial, setHistorial] = useState<string[]>([]);

  function lanzar() {
    const salida = randomBool() ? 'Cara' : 'Cruz';
    setResult(salida);
    setHistorial((prev) => [salida, ...prev].slice(0, 10));
  }

  const caras = historial.filter((h) => h === 'Cara').length;
  const cruces = historial.filter((h) => h === 'Cruz').length;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <button
        onClick={lanzar}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Lanzar moneda
      </button>
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center space-y-2">
          <div className="flex justify-center">
            {result === 'Cara'
              ? <Sun size={48} className="text-[var(--color-accent)]" />
              : <Moon size={48} className="text-[var(--color-text-secondary)]" />}
          </div>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result}</p>
        </div>
      )}
      {historial.length > 1 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">Últimos {historial.length} lanzamientos: Cara {caras} · Cruz {cruces}</p>
          <div className="flex flex-wrap gap-1">
            {historial.map((h, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-calcs-bg)] text-[var(--color-text)]">{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
