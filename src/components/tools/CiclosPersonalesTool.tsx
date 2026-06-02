import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

function biorhythm(nacimiento: Date, hoy: Date, period: number): number {
  const dias = Math.floor((hoy.getTime() - nacimiento.getTime()) / (1000 * 60 * 60 * 24));
  return Math.sin((2 * Math.PI * dias) / period);
}

export default function CiclosPersonalesTool() {
  const [fechaNac, setFechaNac] = useState('');
  const [result, setResult] = useState<{ fisico: number; emocional: number; intelectual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fechaNac) throw new Error('Introduce tu fecha de nacimiento.');
      const nacimiento = new Date(fechaNac);
      const hoy = new Date();
      if (nacimiento >= hoy) throw new Error('La fecha de nacimiento debe ser anterior a hoy.');
      setResult({
        fisico:      biorhythm(nacimiento, hoy, 23),
        emocional:   biorhythm(nacimiento, hoy, 28),
        intelectual: biorhythm(nacimiento, hoy, 33),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  function nivel(v: number): string {
    if (v > 0.5) return 'Alto';
    if (v > -0.5) return 'Neutro';
    return 'Bajo';
  }
  function color(v: number): string {
    if (v > 0.5) return 'text-green-600';
    if (v > -0.5) return 'text-amber-600';
    return 'text-red-600';
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Los biorritmos predicen tus ciclos físico (23 días), emocional (28 días) e intelectual (33 días). Solo orientativo.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento</label>
        <input type="date" value={fechaNac} onChange={(e) => { setFechaNac(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular biorritmos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          {[
            { label: 'Ciclo físico (23 días)', valor: result.fisico },
            { label: 'Ciclo emocional (28 días)', valor: result.emocional },
            { label: 'Ciclo intelectual (33 días)', valor: result.intelectual },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">{c.label}</span>
              <div className="text-right">
                <span className={`text-sm font-extrabold ${color(c.valor)}`}>{nivel(c.valor)}</span>
                <span className="text-xs text-[var(--color-text-muted)] ml-2">({formatNumber(c.valor * 100, 0)}%)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
