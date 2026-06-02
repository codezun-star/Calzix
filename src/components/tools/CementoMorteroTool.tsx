import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Tipo = 'mortero' | 'hormigon';

export default function CementoMorteroTool() {
  const [tipo, setTipo] = useState<Tipo>('mortero');
  const [volumen, setVolumen] = useState('');
  const [result, setResult] = useState<{ cemento: number; arena: number; agua: number; grava?: number } | null>(null);
  const [error, setError] = useState('');

  const tipos: { value: Tipo; label: string; proporcion: string }[] = [
    { value: 'mortero',   label: 'Mortero 1:3 (cemento:arena)',         proporcion: 'Para revocos y enfoscados' },
    { value: 'hormigon',  label: 'Hormigón 1:2:4 (cemento:arena:grava)', proporcion: 'Para estructuras ligeras' },
  ];

  function calcular() {
    try {
      setError('');
      const v = parseFloat(volumen.replace(',', '.'));
      if (isNaN(v) || v <= 0) throw new Error('Introduce el volumen en m³.');
      if (tipo === 'mortero') {
        const cemento = v * 350;
        const arena = v * 1050;
        const agua = v * 175;
        setResult({ cemento, arena, agua });
      } else {
        const cemento = v * 300;
        const arena = v * 600;
        const grava = v * 1200;
        const agua = v * 150;
        setResult({ cemento, arena, agua, grava });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de mezcla</legend>
        {tipos.map((t) => (
          <label key={t.value} className="flex items-start gap-3 cursor-pointer">
            <input type="radio" name="tipo" value={t.value} checked={tipo === t.value} onChange={() => { setTipo(t.value); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4 mt-0.5" />
            <span className="text-sm text-[var(--color-text)]">{t.label}<br /><span className="text-xs text-[var(--color-text-muted)]">{t.proporcion}</span></span>
          </label>
        ))}
      </fieldset>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Volumen de mezcla (m³)</label>
        <input type="number" value={volumen} onChange={(e) => { setVolumen(e.target.value); setResult(null); }} placeholder="Ej. 0.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular materiales</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Cemento</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.cemento, 1)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Arena</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.arena, 1)} kg</p></div>
            {result.grava && <div><p className="text-xs text-[var(--color-text-secondary)]">Grava</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.grava, 1)} kg</p></div>}
            <div><p className="text-xs text-[var(--color-text-secondary)]">Agua</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.agua, 1)} L</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
