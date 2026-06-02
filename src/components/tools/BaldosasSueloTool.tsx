import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function BaldosasSueloTool() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [baldosaLargo, setBaldosaLargo] = useState('0.6');
  const [baldosaAncho, setBaldosaAncho] = useState('0.6');
  const [merma, setMerma] = useState('10');
  const [result, setResult] = useState<{ areaSuelo: number; areaBaldosa: number; unidades: number; unidadesMerma: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(largo.replace(',', '.'));
      const a = parseFloat(ancho.replace(',', '.'));
      const bl = parseFloat(baldosaLargo.replace(',', '.'));
      const ba = parseFloat(baldosaAncho.replace(',', '.'));
      const m = parseFloat(merma.replace(',', '.')) || 0;
      if (isNaN(l) || isNaN(a) || isNaN(bl) || isNaN(ba)) throw new Error('Introduce las dimensiones del suelo y de la baldosa.');
      if (l <= 0 || a <= 0 || bl <= 0 || ba <= 0) throw new Error('Todos los valores deben ser positivos.');
      const areaSuelo = l * a;
      const areaBaldosa = bl * ba;
      const unidades = Math.ceil(areaSuelo / areaBaldosa);
      const unidadesMerma = Math.ceil(unidades * (1 + m / 100));
      setResult({ areaSuelo, areaBaldosa, unidades, unidadesMerma });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Dimensiones del suelo</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Largo (m)</label><input type="number" value={largo} onChange={(e) => { setLargo(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Ancho (m)</label><input type="number" value={ancho} onChange={(e) => { setAncho(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Dimensiones de la baldosa</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Largo (m)</label><input type="number" value={baldosaLargo} onChange={(e) => { setBaldosaLargo(e.target.value); setResult(null); }} placeholder="0.6" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Ancho (m)</label><input type="number" value={baldosaAncho} onChange={(e) => { setBaldosaAncho(e.target.value); setResult(null); }} placeholder="0.6" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Merma (%)</label><input type="number" value={merma} onChange={(e) => { setMerma(e.target.value); setResult(null); }} placeholder="10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular baldosas</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Área del suelo</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.areaSuelo, 2)} m²</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Área por baldosa</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.areaBaldosa, 4)} m²</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Sin merma</p><p className="text-xl font-extrabold text-[var(--color-text)]">{result.unidades} ud.</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Con merma ({merma}%)</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.unidadesMerma} ud.</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
