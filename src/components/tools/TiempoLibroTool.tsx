import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function TiempoLibroTool() {
  const [paginas, setPaginas] = useState('');
  const [velocidad, setVelocidad] = useState('250');
  const [palabrasPagina, setPalabrasPagina] = useState('250');
  const [minutosDia, setMinutosDia] = useState('30');
  const [result, setResult] = useState<{ horas: number; dias: number; minutos: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(paginas.replace(',', '.'));
      const v = parseFloat(velocidad.replace(',', '.'));
      const wp = parseFloat(palabrasPagina.replace(',', '.'));
      const md = parseFloat(minutosDia.replace(',', '.'));
      if (isNaN(p) || isNaN(v) || isNaN(wp) || isNaN(md)) throw new Error('Introduce todos los valores.');
      if (p <= 0 || v <= 0 || wp <= 0 || md <= 0) throw new Error('Los valores deben ser positivos.');
      const totalPalabras = p * wp;
      const minutos = totalPalabras / v;
      const horas = minutos / 60;
      const dias = minutos / md;
      setResult({ horas, dias, minutos });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Páginas del libro</label><input type="number" value={paginas} onChange={(e) => { setPaginas(e.target.value); setResult(null); }} placeholder="Ej. 350" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Palabras por página</label><input type="number" value={palabrasPagina} onChange={(e) => { setPalabrasPagina(e.target.value); setResult(null); }} placeholder="250" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tu velocidad lectora (ppm)</label><input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="250" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos de lectura al día</label><input type="number" value={minutosDia} onChange={(e) => { setMinutosDia(e.target.value); setResult(null); }} placeholder="30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular tiempo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo total</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.horas, 1)}h</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">En minutos</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.minutos, 0)} min</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Días leyendo {minutosDia} min/día</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.dias, 1)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
