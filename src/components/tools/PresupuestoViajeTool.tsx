import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function PresupuestoViajeTool() {
  const [vuelos, setVuelos] = useState('');
  const [alojamiento, setAlojamiento] = useState('');
  const [noches, setNoches] = useState('7');
  const [comida, setComida] = useState('');
  const [dias, setDias] = useState('7');
  const [transporte, setTransporte] = useState('');
  const [actividades, setActividades] = useState('');
  const [extras, setExtras] = useState('');
  const [personas, setPersonas] = useState('2');
  const [result, setResult] = useState<{ total: number; porPersona: number; porDia: number } | null>(null);
  const [error, setError] = useState('');

  function p(s: string) { return parseFloat(s.replace(',', '.')) || 0; }

  function calcular() {
    try {
      setError('');
      const np = parseFloat(personas.replace(',', '.'));
      const nd = parseFloat(dias.replace(',', '.'));
      if (isNaN(np) || np <= 0) throw new Error('Introduce el número de personas.');
      if (isNaN(nd) || nd <= 0) throw new Error('Introduce el número de días.');
      const total = p(vuelos) + p(alojamiento) * parseFloat(noches || '0') + p(comida) * nd * np + p(transporte) + p(actividades) + p(extras);
      setResult({ total, porPersona: total / np, porDia: total / nd });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inp = (label: string, val: string, set: (s: string) => void, ph: string) => (
    <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label><input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} placeholder={ph} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {inp('Personas', personas, setPersonas, '2')}
        {inp('Días del viaje', dias, setDias, '7')}
        {inp('Vuelos / tren (€ total)', vuelos, setVuelos, '300')}
        {inp('Alojamiento (€/noche)', alojamiento, setAlojamiento, '80')}
        {inp('Noches de alojamiento', noches, setNoches, '7')}
        {inp('Comida (€/persona/día)', comida, setComida, '25')}
        {inp('Transporte local (€ total)', transporte, setTransporte, '100')}
        {inp('Actividades / entradas (€ total)', actividades, setActividades, '150')}
        {inp('Extras y compras (€ total)', extras, setExtras, '200')}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular presupuesto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Presupuesto total del viaje</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.porPersona)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por día</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.porDia)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
