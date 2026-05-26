import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface ResultadoPintura {
  area: number;
  litrosExactos: number;
  litrosRedondeados: number;
}

export default function PinturaTool() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [manos, setManos] = useState('2');
  const [rendimiento, setRendimiento] = useState('12');
  const [result, setResult] = useState<ResultadoPintura | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    setResult(null);

    const l = parseFloat(largo);
    const an = parseFloat(ancho);
    const al = parseFloat(alto);
    const m = parseFloat(manos);
    const r = parseFloat(rendimiento);

    if (isNaN(l) || l <= 0) { setError('Introduce un largo válido (mayor que 0).'); return; }
    if (isNaN(an) || an <= 0) { setError('Introduce un ancho válido (mayor que 0).'); return; }
    if (isNaN(al) || al <= 0) { setError('Introduce un alto de techo válido (mayor que 0).'); return; }
    if (isNaN(m) || m < 1) { setError('El número de manos debe ser al menos 1.'); return; }
    if (isNaN(r) || r <= 0) { setError('El rendimiento de la pintura debe ser mayor que 0.'); return; }

    const area = 2 * (l + an) * al;
    const litrosExactos = (area * m) / r * 1.1;
    const litrosRedondeados = Math.ceil(litrosExactos);

    setResult({ area, litrosExactos, litrosRedondeados });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo (m)</label>
          <input
            type="number"
            value={largo}
            onChange={(e) => setLargo(e.target.value)}
            placeholder="5"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (m)</label>
          <input
            type="number"
            value={ancho}
            onChange={(e) => setAncho(e.target.value)}
            placeholder="4"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Alto de techo (m)</label>
          <input
            type="number"
            value={alto}
            onChange={(e) => setAlto(e.target.value)}
            placeholder="2.5"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de manos</label>
          <input
            type="number"
            value={manos}
            onChange={(e) => setManos(e.target.value)}
            placeholder="2"
            min="1"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Rendimiento (m²/L)</label>
          <input
            type="number"
            value={rendimiento}
            onChange={(e) => setRendimiento(e.target.value)}
            placeholder="12"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular pintura
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Área a pintar</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.area, 2)} m²</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Litros exactos</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosExactos, 2)} L</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Litros recomendados</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosRedondeados, 0)} L</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Con 10% extra</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
