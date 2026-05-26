import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type ModoVelocidad = 'velocidad' | 'distancia' | 'tiempo';

interface ResultadoVelocidad {
  valor: number;
  unidad: string;
  extra?: { valor: number; unidad: string };
}

export default function VelocidadFisicaTool() {
  const [modo, setModo] = useState<ModoVelocidad>('velocidad');
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState<ResultadoVelocidad | null>(null);
  const [error, setError] = useState('');

  function parse(v: string, nombre: string): number {
    const n = parseFloat(v.replace(',', '.'));
    if (isNaN(n)) throw new Error(`Introduce un número válido para ${nombre}.`);
    if (n <= 0) throw new Error(`El valor de ${nombre} debe ser mayor que cero.`);
    return n;
  }

  function calcular() {
    try {
      setError('');
      setResult(null);

      if (modo === 'velocidad') {
        const d = parse(inputA, 'la distancia');
        const t = parse(inputB, 'el tiempo');
        setResult({ valor: d / t, unidad: 'km/h' });
      } else if (modo === 'distancia') {
        const v = parse(inputA, 'la velocidad');
        const t = parse(inputB, 'el tiempo');
        setResult({ valor: v * t, unidad: 'km' });
      } else {
        const v = parse(inputA, 'la velocidad');
        const d = parse(inputB, 'la distancia');
        const horas = d / v;
        setResult({
          valor: horas,
          unidad: 'h',
          extra: { valor: horas * 60, unidad: 'min' },
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const modos: { value: ModoVelocidad; label: string; labelA: string; labelB: string; placeholderA: string; placeholderB: string }[] = [
    { value: 'velocidad', label: 'Calcular velocidad', labelA: 'Distancia (km)', labelB: 'Tiempo (h)', placeholderA: 'ej. 150', placeholderB: 'ej. 2' },
    { value: 'distancia', label: 'Calcular distancia', labelA: 'Velocidad (km/h)', labelB: 'Tiempo (h)', placeholderA: 'ej. 90', placeholderB: 'ej. 3' },
    { value: 'tiempo', label: 'Calcular tiempo', labelA: 'Velocidad (km/h)', labelB: 'Distancia (km)', placeholderA: 'ej. 120', placeholderB: 'ej. 240' },
  ];

  const modoActual = modos.find((m) => m.value === modo)!;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">¿Qué quieres calcular?</legend>
        {modos.map((m) => (
          <label key={m.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="modo"
              value={m.value}
              checked={modo === m.value}
              onChange={() => { setModo(m.value); setResult(null); setError(''); setInputA(''); setInputB(''); }}
              className="accent-[var(--color-accent)] w-4 h-4"
            />
            <span className="text-sm text-[var(--color-text)]">{m.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modoActual.labelA}</label>
          <input
            type="number"
            value={inputA}
            onChange={(e) => { setInputA(e.target.value); setResult(null); }}
            placeholder={modoActual.placeholderA}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modoActual.labelB}</label>
          <input
            type="number"
            value={inputB}
            onChange={(e) => { setInputB(e.target.value); setResult(null); }}
            placeholder={modoActual.placeholderB}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">
            {formatNumber(result.valor, 4)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unidad}</span>
          </p>
          {result.extra && (
            <p className="text-lg font-bold text-[var(--color-text-secondary)]">
              = {formatNumber(result.extra.valor, 2)} <span className="text-sm font-medium">{result.extra.unidad}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
