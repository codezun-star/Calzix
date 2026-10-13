import { useState } from 'react';

interface Resultado {
  principales: number[];
  reintegro: number;
}

function generarNumeros(): Resultado {
  const set = new Set<number>();
  while (set.size < 6) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    const n = (arr[0] % 49) + 1;
    set.add(n);
  }
  const principales = Array.from(set).sort((a, b) => a - b);
  const r = new Uint32Array(1);
  crypto.getRandomValues(r);
  return { principales, reintegro: r[0] % 10 };
}

export default function NumerosSuerteTool() {
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function generar() {
    setResultado(generarNumeros());
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Genera 6 números distintos del 1 al 49 y un reintegro del 0 al 9 para La Primitiva o la Bonoloto
        de Loterías y Apuestas del Estado, con un generador criptográficamente seguro.
      </p>

      <button
        onClick={generar}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Generar números
      </button>

      {resultado !== null && (
        <div className="space-y-4">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-5">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3 text-center">
              Números principales
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {resultado.principales.map((n) => (
                <span
                  key={n}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white font-bold text-sm"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 flex flex-col items-center gap-2">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">
              Reintegro
            </p>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-surface)] font-bold text-sm text-[var(--color-accent)]">
              {resultado.reintegro}
            </span>
          </div>

          <p className="text-xs text-center text-[var(--color-text-muted)]">
            Los números se generan de forma aleatoria y segura. No aumentan la probabilidad de ganar: todas las combinaciones tienen la misma (1 entre 13.983.816 para la de 6 aciertos).
          </p>
        </div>
      )}
    </div>
  );
}
