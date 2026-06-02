import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function LibrosAnioTool() {
  const [paginasDia, setPaginasDia] = useState('');
  const [paginasLibro, setPaginasLibro] = useState('300');
  const [result, setResult] = useState<{ librosAnio: number; libros5anios: number; diasPorLibro: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pd = parseFloat(paginasDia.replace(',', '.'));
      const pl = parseFloat(paginasLibro.replace(',', '.'));
      if (isNaN(pd) || isNaN(pl)) throw new Error('Introduce las páginas por día y el promedio de páginas por libro.');
      if (pd <= 0 || pl <= 0) throw new Error('Los valores deben ser positivos.');
      const diasPorLibro = pl / pd;
      const librosAnio = 365 / diasPorLibro;
      setResult({ librosAnio, libros5anios: librosAnio * 5, diasPorLibro });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas que lees por día</label>
          <input type="number" value={paginasDia} onChange={(e) => { setPaginasDia(e.target.value); setResult(null); }} placeholder="Ej. 20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas por libro (promedio)</label>
          <input type="number" value={paginasLibro} onChange={(e) => { setPaginasLibro(e.target.value); setResult(null); }} placeholder="300" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Días por libro</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.diasPorLibro, 1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Libros al año</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.librosAnio, 1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">En 5 años</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.libros5anios, 0)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
