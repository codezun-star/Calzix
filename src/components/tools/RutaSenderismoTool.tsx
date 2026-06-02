import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function RutaSenderismoTool() {
  const [distancia, setDistancia] = useState('');
  const [desnivel, setDesnivel] = useState('0');
  const [peso, setPeso] = useState('70');
  const [result, setResult] = useState<{ duracion: number; calorias: number; dificultad: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia.replace(',', '.'));
      const dn = parseFloat(desnivel.replace(',', '.')) || 0;
      const p = parseFloat(peso.replace(',', '.'));
      if (isNaN(d) || isNaN(p)) throw new Error('Introduce la distancia y tu peso.');
      if (d <= 0 || p <= 0) throw new Error('Los valores deben ser positivos.');
      const velocidadBase = 4;
      const horasDesnivel = dn / 300;
      const horasDistancia = d / velocidadBase;
      const duracion = horasDistancia + horasDesnivel;
      const met = dn > 500 ? 7 : dn > 200 ? 6 : 5;
      const calorias = met * p * duracion;
      const puntos = d + dn / 100;
      const dificultad = puntos < 10 ? 'Muy fácil' : puntos < 20 ? 'Fácil' : puntos < 35 ? 'Moderada' : puntos < 55 ? 'Difícil' : 'Muy difícil';
      setResult({ duracion, calorias, dificultad });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia (km)</label><input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Desnivel acumulado (m)</label><input type="number" value={desnivel} onChange={(e) => { setDesnivel(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Peso con mochila (kg)</label><input type="number" value={peso} onChange={(e) => { setPeso(e.target.value); setResult(null); }} placeholder="70" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ruta</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Duración estimada</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.duracion, 1)}h</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Calorías</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.calorias, 0)} kcal</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Dificultad</p><p className="text-xl font-extrabold text-[var(--color-text)]">{result.dificultad}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
