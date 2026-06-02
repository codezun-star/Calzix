import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PaginasPorDiaTool() {
  const [totalPaginas, setTotalPaginas] = useState('');
  const [diasDisponibles, setDiasDisponibles] = useState('');
  const [paginasLeidas, setPaginasLeidas] = useState('0');
  const [result, setResult] = useState<{ paginasDia: number; minutosEstimados: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const tp = parseFloat(totalPaginas.replace(',', '.'));
      const dd = parseFloat(diasDisponibles.replace(',', '.'));
      const pl = parseFloat(paginasLeidas.replace(',', '.')) || 0;
      if (isNaN(tp) || isNaN(dd)) throw new Error('Introduce el total de páginas y los días disponibles.');
      if (tp <= 0 || dd <= 0) throw new Error('Los valores deben ser positivos.');
      if (pl >= tp) throw new Error('Las páginas leídas no pueden ser iguales o mayores al total.');
      const pendientes = tp - pl;
      const paginasDia = pendientes / dd;
      const minutosEstimados = paginasDia * 2;
      setResult({ paginasDia, minutosEstimados });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de páginas del libro</label>
          <input type="number" value={totalPaginas} onChange={(e) => { setTotalPaginas(e.target.value); setResult(null); }} placeholder="Ej. 350" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días disponibles</label>
          <input type="number" value={diasDisponibles} onChange={(e) => { setDiasDisponibles(e.target.value); setResult(null); }} placeholder="Ej. 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas ya leídas (opcional)</label>
        <input type="number" value={paginasLeidas} onChange={(e) => { setPaginasLeidas(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Páginas por día</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.paginasDia, 1)}</p></div>
          <p className="text-sm text-[var(--color-text-secondary)]">Tiempo estimado: ~{formatNumber(result.minutosEstimados, 0)} min/día (a 2 min/página)</p>
        </div>
      )}
    </div>
  );
}
