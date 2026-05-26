import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type TipoLadrillo = 'estandar' | 'perforado' | 'bloque';

interface ResultadoConstruccion {
  area: number;
  ladrillos: number;
  sacosCemento: number;
  sacosArena: number;
}

const TIPOS: Record<TipoLadrillo, { label: string; por_m2: number }> = {
  estandar:  { label: 'Estándar (24×11,5×7 cm)',   por_m2: 60 },
  perforado: { label: 'Perforado (24×11,5×9 cm)',  por_m2: 45 },
  bloque:    { label: 'Bloque (40×20×20 cm)',       por_m2: 12.5 },
};

export default function MaterialesConstruccionTool() {
  const [largo, setLargo] = useState('');
  const [alto, setAlto] = useState('');
  const [tipo, setTipo] = useState<TipoLadrillo>('estandar');
  const [result, setResult] = useState<ResultadoConstruccion | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    setResult(null);

    const l = parseFloat(largo);
    const a = parseFloat(alto);

    if (isNaN(l) || l <= 0) { setError('Introduce un largo de pared válido (mayor que 0).'); return; }
    if (isNaN(a) || a <= 0) { setError('Introduce un alto de pared válido (mayor que 0).'); return; }

    const area = l * a;
    const ladrillosBrutos = area * TIPOS[tipo].por_m2 * 1.05;
    const ladrillos = Math.ceil(ladrillosBrutos);
    const sacosCemento = Math.ceil(ladrillos / 50);
    const sacosArena = Math.ceil(ladrillos / 30);

    setResult({ area, ladrillos, sacosCemento, sacosArena });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo de la pared (m)</label>
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
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Alto de la pared (m)</label>
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

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de ladrillo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoLadrillo)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {(Object.keys(TIPOS) as TipoLadrillo[]).map((k) => (
            <option key={k} value={k}>{TIPOS[k].label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular materiales
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Superficie de la pared</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.area, 2)} m²</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Ladrillos necesarios</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ladrillos, 0)}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Incluye 5% de desperdicio</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--color-border)]">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Sacos de cemento</p>
              <p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.sacosCemento, 0)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Sacos de arena</p>
              <p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.sacosArena, 0)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
