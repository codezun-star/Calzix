import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Tipo = 'molar' | 'masaporc' | 'ppm';

export default function SolucionConcentracionTool() {
  const [tipo, setTipo] = useState<Tipo>('molar');
  const [soluto, setSoluto] = useState('');
  const [disolvente, setDisolvente] = useState('');
  const [masaMolar, setMasaMolar] = useState('');
  const [result, setResult] = useState<{ valor: number; unidad: string } | null>(null);
  const [error, setError] = useState('');

  const tipos: { value: Tipo; label: string }[] = [
    { value: 'molar',     label: 'Concentración molar (M = mol/L)' },
    { value: 'masaporc',  label: 'Concentración en masa (% m/m)' },
    { value: 'ppm',       label: 'Partes por millón (ppm = mg/L)' },
  ];

  function calcular() {
    try {
      setError('');
      const ms = parseFloat(soluto.replace(',', '.'));
      const vd = parseFloat(disolvente.replace(',', '.'));
      if (isNaN(ms) || isNaN(vd) || ms <= 0 || vd <= 0) throw new Error('Introduce valores positivos.');
      if (tipo === 'molar') {
        const mm = parseFloat(masaMolar.replace(',', '.'));
        if (isNaN(mm) || mm <= 0) throw new Error('Introduce la masa molar del soluto (g/mol).');
        const mol = ms / mm;
        const litros = vd / 1000;
        setResult({ valor: mol / litros, unidad: 'mol/L (M)' });
      } else if (tipo === 'masaporc') {
        const total = ms + vd;
        setResult({ valor: (ms / total) * 100, unidad: '% (m/m)' });
      } else {
        setResult({ valor: (ms / vd) * 1000, unidad: 'ppm (mg/L)' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de concentración</legend>
        {tipos.map((t) => (
          <label key={t.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="tipo" value={t.value} checked={tipo === t.value} onChange={() => { setTipo(t.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{t.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{tipo === 'ppm' ? 'Masa de soluto (mg)' : 'Masa de soluto (g)'}</label>
          <input type="number" value={soluto} onChange={(e) => { setSoluto(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{tipo === 'molar' ? 'Volumen (mL)' : tipo === 'ppm' ? 'Volumen (L)' : 'Masa de disolvente (g)'}</label>
          <input type="number" value={disolvente} onChange={(e) => { setDisolvente(e.target.value); setResult(null); }} placeholder="Ej. 250" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      {tipo === 'molar' && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molar del soluto (g/mol)</label>
          <input type="number" value={masaMolar} onChange={(e) => { setMasaMolar(e.target.value); setResult(null); }} placeholder="Ej. 58.44 (NaCl)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.valor, 4)} {result.unidad}</p>
        </div>
      )}
    </div>
  );
}
