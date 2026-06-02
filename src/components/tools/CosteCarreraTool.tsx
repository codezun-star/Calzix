import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function CosteCarreraTool() {
  const [matricula, setMatricula] = useState('');
  const [libros, setLibros] = useState('');
  const [transporte, setTransporte] = useState('');
  const [alojamiento, setAlojamiento] = useState('0');
  const [comida, setComida] = useState('0');
  const [otros, setOtros] = useState('0');
  const [anios, setAnios] = useState('4');
  const [result, setResult] = useState<{ total: number; porAnio: number; porMes: number } | null>(null);
  const [error, setError] = useState('');

  function p(s: string) { return parseFloat(s.replace(',', '.')) || 0; }

  function calcular() {
    try {
      setError('');
      const a = parseFloat(anios.replace(',', '.'));
      if (isNaN(a) || a <= 0) throw new Error('Introduce el número de años.');
      const mat = p(matricula);
      const lib = p(libros);
      const tra = p(transporte);
      const alo = p(alojamiento);
      const com = p(comida);
      const otr = p(otros);
      if (mat < 0 || lib < 0 || tra < 0) throw new Error('Los valores no pueden ser negativos.');
      const anualFijo = mat + lib + tra;
      const mensual = alo + com + otr;
      const porAnio = anualFijo + mensual * 10;
      const total = porAnio * a;
      setResult({ total, porAnio, porMes: mensual });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Costes anuales fijos + costes mensuales (10 meses lectivos/año)</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Matrícula anual (€)</label><input type="number" value={matricula} onChange={(e) => { setMatricula(e.target.value); setResult(null); }} placeholder="Ej. 1500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Libros/material (€/año)</label><input type="number" value={libros} onChange={(e) => { setLibros(e.target.value); setResult(null); }} placeholder="Ej. 300" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Transporte (€/año)</label><input type="number" value={transporte} onChange={(e) => { setTransporte(e.target.value); setResult(null); }} placeholder="Ej. 600" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Alojamiento (€/mes)</label><input type="number" value={alojamiento} onChange={(e) => { setAlojamiento(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Manutención (€/mes)</label><input type="number" value={comida} onChange={(e) => { setComida(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Otros (€/mes)</label><input type="number" value={otros} onChange={(e) => { setOtros(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Duración de la carrera (años)</label><input type="number" value={anios} onChange={(e) => { setAnios(e.target.value); setResult(null); }} placeholder="4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste total</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Coste total de la carrera</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-[var(--color-text-secondary)]">Por año: <span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.porAnio)}</span></p>
            <p className="text-[var(--color-text-secondary)]">Gastos mes: <span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.porMes)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
