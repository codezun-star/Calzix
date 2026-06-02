import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const LIMITES = [
  { aerolinea: 'Vueling / Iberia (cabina)', largo: 55, ancho: 40, alto: 20 },
  { aerolinea: 'Ryanair (cabina)',           largo: 40, ancho: 25, alto: 20 },
  { aerolinea: 'EasyJet (cabina)',           largo: 56, ancho: 45, alto: 25 },
  { aerolinea: 'IATA bodega estándar',       largo: 158, ancho: 158, alto: 158 },
];

export default function DimensionsMaletaTool() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [result, setResult] = useState<{ suma: number; checks: { aerolinea: string; ok: boolean }[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(largo.replace(',', '.'));
      const a = parseFloat(ancho.replace(',', '.'));
      const h = parseFloat(alto.replace(',', '.'));
      if (isNaN(l) || isNaN(a) || isNaN(h)) throw new Error('Introduce las tres dimensiones en centímetros.');
      if (l <= 0 || a <= 0 || h <= 0) throw new Error('Los valores deben ser positivos.');
      const suma = l + a + h;
      const checks = LIMITES.map((lim) => ({
        aerolinea: lim.aerolinea,
        ok: lim.largo === 158 ? suma <= lim.largo : (l <= lim.largo && a <= lim.ancho && h <= lim.alto),
      }));
      setResult({ suma, checks });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce las dimensiones de tu maleta en centímetros (sin ruedas ni asas).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo (cm)</label><input type="number" value={largo} onChange={(e) => { setLargo(e.target.value); setResult(null); }} placeholder="55" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (cm)</label><input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); setResult(null); }} placeholder="40" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Alto (cm)</label><input type="number" value={alto} onChange={(e) => { setAlto(e.target.value); setResult(null); }} placeholder="20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar dimensiones</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <p className="text-sm text-[var(--color-text-secondary)]">Suma total: <span className="font-bold text-[var(--color-text)]">{formatNumber(result.suma, 0)} cm</span></p>
          <div className="space-y-2">
            {result.checks.map((c) => (
              <div key={c.aerolinea} className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text)]">{c.aerolinea}</span>
                <span className={`text-sm font-bold ${c.ok ? 'text-green-600' : 'text-red-600'}`}>{c.ok ? 'OK' : 'Excede'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
