import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const CATEGORIAS = [
  { key: 'venue', label: 'Salón / Catering', placeholder: '8000' },
  { key: 'catering', label: 'Comida y bebida extra', placeholder: '2000' },
  { key: 'flores', label: 'Flores y decoración', placeholder: '1500' },
  { key: 'musica', label: 'Música / DJ / Banda', placeholder: '2000' },
  { key: 'foto', label: 'Fotografía y vídeo', placeholder: '2500' },
  { key: 'vestidos', label: 'Vestidos y trajes', placeholder: '3000' },
  { key: 'joyeria', label: 'Joyería y anillos', placeholder: '2000' },
  { key: 'invitaciones', label: 'Invitaciones y papelería', placeholder: '500' },
  { key: 'luna', label: 'Luna de miel', placeholder: '4000' },
  { key: 'otros', label: 'Imprevistos y otros', placeholder: '1000' },
];

export default function PresupuestoBodaTool() {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [invitados, setInvitados] = useState('100');
  const [result, setResult] = useState<{ total: number; porInvitado: number; desglose: { label: string; valor: number }[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ni = parseFloat(invitados.replace(',', '.'));
      if (isNaN(ni) || ni <= 0) throw new Error('Introduce el número de invitados.');
      const desglose = CATEGORIAS.map((c) => ({ label: c.label, valor: parseFloat((vals[c.key] ?? '0').replace(',', '.')) || 0 }));
      const total = desglose.reduce((a, d) => a + d.valor, 0);
      setResult({ total, porInvitado: total / ni, desglose: desglose.filter((d) => d.valor > 0) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de invitados</label>
        <input type="number" value={invitados} onChange={(e) => { setInvitados(e.target.value); setResult(null); }} placeholder="100" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIAS.map((c) => (
          <div key={c.key} className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">{c.label} (€)</label>
            <input type="number" value={vals[c.key] ?? ''} onChange={(e) => { setVals((v) => ({ ...v, [c.key]: e.target.value })); setResult(null); }} placeholder={c.placeholder} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular presupuesto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Presupuesto total</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por invitado</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.porInvitado)}</p></div>
          </div>
          {result.desglose.map((d) => (
            <div key={d.label} className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">{d.label}</span>
              <span className="font-semibold">{formatCurrency(d.valor)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
