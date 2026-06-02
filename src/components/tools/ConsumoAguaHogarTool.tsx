import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function ConsumoAguaHogarTool() {
  const [personas, setPersonas] = useState('4');
  const [duchas, setDuchas] = useState('4');
  const [minutosDucha, setMinutosDucha] = useState('8');
  const [cisternas, setCisternas] = useState('5');
  const [lavavajillas, setLavavajillas] = useState('1');
  const [lavadora, setLavadora] = useState('5');
  const [result, setResult] = useState<{ totalDia: number; totalMes: number; totalAnio: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(personas.replace(',', '.'));
      const d = parseFloat(duchas.replace(',', '.'));
      const md = parseFloat(minutosDucha.replace(',', '.'));
      const c = parseFloat(cisternas.replace(',', '.'));
      const lv = parseFloat(lavavajillas.replace(',', '.'));
      const la = parseFloat(lavadora.replace(',', '.'));
      if ([p,d,md,c,lv,la].some(isNaN)) throw new Error('Introduce todos los valores.');
      if (p <= 0) throw new Error('El número de personas debe ser positivo.');
      const litrosDucha = d * md * 9;
      const litrosCisterna = c * 9;
      const litrosLavavajillas = lv * 12;
      const litrosLavadora = (la / 7) * 50;
      const litrosBebida = p * 2;
      const totalDia = litrosDucha + litrosCisterna + litrosLavavajillas + litrosLavadora + litrosBebida;
      setResult({ totalDia, totalMes: totalDia * 30, totalAnio: totalDia * 365 });
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
        {inp('Personas en el hogar', personas, setPersonas, '4')}
        {inp('Duchas diarias (total hogar)', duchas, setDuchas, '4')}
        {inp('Minutos por ducha', minutosDucha, setMinutosDucha, '8')}
        {inp('Descargas WC diarias', cisternas, setCisternas, '5')}
        {inp('Ciclos lavavajillas/día', lavavajillas, setLavavajillas, '1')}
        {inp('Ciclos lavadora/semana', lavadora, setLavadora, '5')}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular consumo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por día</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.totalDia, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por mes</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.totalMes, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por año</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.totalAnio / 1000, 1)} m³</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center">Media española: ~130 L/persona/día</p>
        </div>
      )}
    </div>
  );
}
