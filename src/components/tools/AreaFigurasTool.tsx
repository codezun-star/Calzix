import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Figura = 'cuadrado' | 'rectangulo' | 'circulo' | 'triangulo' | 'trapecio';

interface ResultadoArea {
  area: number;
  perimetro?: number;
  label?: string;
}

export default function AreaFigurasTool() {
  const [figura, setFigura] = useState<Figura>('cuadrado');
  const [lado, setLado] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [radio, setRadio] = useState('');
  const [base, setBase] = useState('');
  const [altura, setAltura] = useState('');
  const [base1, setBase1] = useState('');
  const [base2, setBase2] = useState('');
  const [result, setResult] = useState<ResultadoArea | null>(null);
  const [error, setError] = useState('');

  function resetResult() {
    setResult(null);
    setError('');
  }

  function parse(v: string, nombre: string): number {
    const n = parseFloat(v.replace(',', '.'));
    if (isNaN(n)) throw new Error(`Introduce un valor numérico válido para ${nombre}.`);
    if (n <= 0) throw new Error(`El valor de ${nombre} debe ser mayor que cero.`);
    return n;
  }

  function calcular() {
    try {
      setError('');
      setResult(null);
      if (figura === 'cuadrado') {
        const l = parse(lado, 'el lado');
        setResult({ area: l * l, perimetro: 4 * l, label: 'Perímetro' });
      } else if (figura === 'rectangulo') {
        const a = parse(ancho, 'el ancho');
        const h = parse(alto, 'el alto');
        setResult({ area: a * h, perimetro: 2 * (a + h), label: 'Perímetro' });
      } else if (figura === 'circulo') {
        const r = parse(radio, 'el radio');
        setResult({ area: Math.PI * r * r, perimetro: 2 * Math.PI * r, label: 'Circunferencia' });
      } else if (figura === 'triangulo') {
        const b = parse(base, 'la base');
        const h = parse(altura, 'la altura');
        setResult({ area: (b * h) / 2 });
      } else {
        const b1 = parse(base1, 'la base mayor');
        const b2 = parse(base2, 'la base menor');
        const h = parse(altura, 'la altura');
        setResult({ area: ((b1 + b2) * h) / 2 });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const figuras: { value: Figura; label: string }[] = [
    { value: 'cuadrado', label: 'Cuadrado' },
    { value: 'rectangulo', label: 'Rectángulo' },
    { value: 'circulo', label: 'Círculo' },
    { value: 'triangulo', label: 'Triángulo' },
    { value: 'trapecio', label: 'Trapecio' },
  ];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Figura geométrica</label>
        <select
          value={figura}
          onChange={(e) => { setFigura(e.target.value as Figura); resetResult(); }}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {figuras.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      {figura === 'cuadrado' && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Lado</label>
          <input type="number" value={lado} onChange={(e) => { setLado(e.target.value); resetResult(); }} placeholder="ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}

      {figura === 'rectangulo' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho</label>
            <input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); resetResult(); }} placeholder="ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Alto</label>
            <input type="number" value={alto} onChange={(e) => { setAlto(e.target.value); resetResult(); }} placeholder="ej. 6" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        </div>
      )}

      {figura === 'circulo' && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Radio</label>
          <input type="number" value={radio} onChange={(e) => { setRadio(e.target.value); resetResult(); }} placeholder="ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}

      {figura === 'triangulo' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base</label>
            <input type="number" value={base} onChange={(e) => { setBase(e.target.value); resetResult(); }} placeholder="ej. 8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura</label>
            <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); resetResult(); }} placeholder="ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        </div>
      )}

      {figura === 'trapecio' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base mayor</label>
            <input type="number" value={base1} onChange={(e) => { setBase1(e.target.value); resetResult(); }} placeholder="ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base menor</label>
            <input type="number" value={base2} onChange={(e) => { setBase2(e.target.value); resetResult(); }} placeholder="ej. 6" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura</label>
            <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); resetResult(); }} placeholder="ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        </div>
      )}

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-0.5">Area</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.area, 4)} u²</p>
          </div>
          {result.perimetro !== undefined && result.label && (
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-0.5">{result.label}</p>
              <p className="text-xl font-bold text-[var(--color-text)]">{formatNumber(result.perimetro, 4)} u</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
