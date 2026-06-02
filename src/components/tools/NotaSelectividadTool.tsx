import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function NotaSelectividadTool() {
  const [notaBachillerato, setNotaBachillerato] = useState('');
  const [notaEBau, setNotaEBau] = useState('');
  const [sub1, setSub1] = useState('');
  const [sub2, setSub2] = useState('');
  const [peso1, setPeso1] = useState('0.1');
  const [peso2, setPeso2] = useState('0.1');
  const [result, setResult] = useState<{ nota: number; notaMaxima: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nb = parseFloat(notaBachillerato.replace(',', '.'));
      const ne = parseFloat(notaEBau.replace(',', '.'));
      if (isNaN(nb) || isNaN(ne)) throw new Error('Introduce la nota de bachillerato y la nota de la EvAU/EBAU.');
      if (nb < 0 || nb > 10 || ne < 0 || ne > 10) throw new Error('Las notas deben estar entre 0 y 10.');
      const notaBase = 0.6 * nb + 0.4 * ne;
      let bonus = 0;
      const p1 = parseFloat(peso1.replace(',', '.'));
      const p2 = parseFloat(peso2.replace(',', '.'));
      const s1 = parseFloat(sub1.replace(',', '.'));
      const s2 = parseFloat(sub2.replace(',', '.'));
      if (!isNaN(s1) && !isNaN(p1)) bonus += s1 * p1;
      if (!isNaN(s2) && !isNaN(p2)) bonus += s2 * p2;
      const nota = Math.min(notaBase + bonus, 14);
      const notaMaxima = Math.min(notaBase + 10 * (p1 + p2), 14);
      setResult({ nota, notaMaxima });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Nota = 0,6 × Bachillerato + 0,4 × EvAU + bonificaciones de materias de modalidad</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota media Bachillerato</label>
          <input type="number" step="0.01" value={notaBachillerato} onChange={(e) => { setNotaBachillerato(e.target.value); setResult(null); }} placeholder="Ej. 8.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota EvAU/EBAU (fase general)</label>
          <input type="number" step="0.01" value={notaEBau} onChange={(e) => { setNotaEBau(e.target.value); setResult(null); }} placeholder="Ej. 7.0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <p className="text-xs font-medium text-[var(--color-text-secondary)]">Bonificaciones (fase voluntaria) — opcional</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1 col-span-2"><label className="text-xs text-[var(--color-text-secondary)]">Materia 1 (nota)</label><input type="number" step="0.01" value={sub1} onChange={(e) => { setSub1(e.target.value); setResult(null); }} placeholder="0–10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Peso</label><select value={peso1} onChange={(e) => { setPeso1(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"><option value="0.1">0,1</option><option value="0.2">0,2</option></select></div>
        <div className="space-y-1 col-span-2"><label className="text-xs text-[var(--color-text-secondary)]">Materia 2 (nota)</label><input type="number" step="0.01" value={sub2} onChange={(e) => { setSub2(e.target.value); setResult(null); }} placeholder="0–10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Peso</label><select value={peso2} onChange={(e) => { setPeso2(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"><option value="0.1">0,1</option><option value="0.2">0,2</option></select></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular nota de acceso</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Nota de acceso a la universidad</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.nota, 3)}</p></div>
          <p className="text-xs text-[var(--color-text-muted)]">Nota máxima posible con estas materias: {formatNumber(result.notaMaxima, 3)}</p>
        </div>
      )}
    </div>
  );
}
