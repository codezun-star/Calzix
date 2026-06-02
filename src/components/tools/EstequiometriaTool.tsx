import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function EstequiometriaTool() {
  const [coefR, setCoefR] = useState('1');
  const [coefP, setCoefP] = useState('2');
  const [masaMolarR, setMasaMolarR] = useState('');
  const [masaMolarP, setMasaMolarP] = useState('');
  const [cantidadR, setCantidadR] = useState('');
  const [unidad, setUnidad] = useState<'g' | 'mol'>('g');
  const [result, setResult] = useState<{ molesR: number; molesP: number; masaP: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const cr = parseFloat(coefR.replace(',', '.'));
      const cp = parseFloat(coefP.replace(',', '.'));
      const mmr = parseFloat(masaMolarR.replace(',', '.'));
      const mmp = parseFloat(masaMolarP.replace(',', '.'));
      const qty = parseFloat(cantidadR.replace(',', '.'));
      if (isNaN(cr) || isNaN(cp) || isNaN(mmp) || isNaN(qty)) throw new Error('Introduce todos los valores.');
      if (cr <= 0 || cp <= 0 || mmp <= 0 || qty <= 0) throw new Error('Los valores deben ser positivos.');
      let molesR: number;
      if (unidad === 'g') {
        if (isNaN(mmr) || mmr <= 0) throw new Error('Introduce la masa molar del reactivo.');
        molesR = qty / mmr;
      } else {
        molesR = qty;
      }
      const molesP = molesR * (cp / cr);
      const masaP = molesP * mmp;
      setResult({ molesR, molesP, masaP });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula la masa de producto obtenido a partir de una cantidad conocida de reactivo.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Coeficiente del reactivo</label><input type="number" value={coefR} onChange={(e) => { setCoefR(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Coeficiente del producto</label><input type="number" value={coefP} onChange={(e) => { setCoefP(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molar del reactivo (g/mol)</label><input type="number" value={masaMolarR} onChange={(e) => { setMasaMolarR(e.target.value); setResult(null); }} placeholder="Ej. 2 (H₂)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molar del producto (g/mol)</label><input type="number" value={masaMolarP} onChange={(e) => { setMasaMolarP(e.target.value); setResult(null); }} placeholder="Ej. 18 (H₂O)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3 items-end">
        <div className="col-span-2 space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad de reactivo</label>
          <input type="number" value={cantidadR} onChange={(e) => { setCantidadR(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Unidad</label>
          <select value={unidad} onChange={(e) => { setUnidad(e.target.value as 'g' | 'mol'); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            <option value="g">gramos</option>
            <option value="mol">moles</option>
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Moles de reactivo</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.molesR, 4)} mol</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Moles de producto</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.molesP, 4)} mol</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Masa de producto</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.masaP, 4)} g</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
