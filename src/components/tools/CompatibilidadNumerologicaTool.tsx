import { useState } from 'react';
import { formatPercent } from '@/lib/utils/format';

function reducirNumero(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return n;
}

function numeroCamino(fecha: string): number {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return reducirNumero(reducirNumero(dia) + reducirNumero(mes) + reducirNumero(anio));
}

const COMPAT: Record<string, number> = {
  '1-1':95, '1-2':70, '1-3':85, '1-4':60, '1-5':80, '1-6':75, '1-7':65, '1-8':85, '1-9':70,
  '2-2':90, '2-3':75, '2-4':85, '2-5':65, '2-6':95, '2-7':80, '2-8':60, '2-9':85,
  '3-3':85, '3-4':55, '3-5':90, '3-6':70, '3-7':75, '3-8':65, '3-9':80,
  '4-4':90, '4-5':50, '4-6':80, '4-7':85, '4-8':90, '4-9':60,
  '5-5':75, '5-6':65, '5-7':80, '5-8':70, '5-9':85,
  '6-6':95, '6-7':70, '6-8':75, '6-9':90,
  '7-7':85, '7-8':65, '7-9':80,
  '8-8':90, '8-9':70,
  '9-9':95,
};

function getCompat(a: number, b: number): number {
  const key = [Math.min(a,b), Math.max(a,b)].join('-');
  return COMPAT[key] ?? 70;
}

export default function CompatibilidadNumerologicaTool() {
  const [fecha1, setFecha1] = useState('');
  const [fecha2, setFecha2] = useState('');
  const [result, setResult] = useState<{ num1: number; num2: number; pct: number; desc: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fecha1 || !fecha2) throw new Error('Introduce las dos fechas de nacimiento.');
      const n1 = numeroCamino(fecha1);
      const n2 = numeroCamino(fecha2);
      const pct = getCompat(n1 > 9 ? 11 : n1, n2 > 9 ? 11 : n2);
      const desc = pct >= 90 ? 'Compatibilidad excepcional.' : pct >= 75 ? 'Gran afinidad numerológica.' : pct >= 60 ? 'Compatibilidad moderada.' : 'Diferentes energías, puede funcionar con esfuerzo.';
      setResult({ num1: n1, num2: n2, pct, desc });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Compatibilidad basada en los números de camino de vida de cada persona.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento 1</label><input type="date" value={fecha1} onChange={(e) => { setFecha1(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento 2</label><input type="date" value={fecha2} onChange={(e) => { setFecha2(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular compatibilidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2 text-center">
          <p className="text-xs text-[var(--color-text-secondary)]">Número de camino: {result.num1} y {result.num2}</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{formatPercent(result.pct)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.desc}</p>
        </div>
      )}
    </div>
  );
}
