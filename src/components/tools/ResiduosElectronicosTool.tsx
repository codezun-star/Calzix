import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Dispositivo = 'movil' | 'portatil' | 'pc' | 'tablet' | 'tele' | 'nevera' | 'lavadora';

const DISPOSITIVOS: Record<Dispositivo, { label: string; pesoKg: number; materialesRecuperables: { nombre: string; gramos: number }[] }> = {
  movil:    { label: 'Smartphone', pesoKg: 0.18, materialesRecuperables: [{ nombre: 'Cobre', gramos: 15 }, { nombre: 'Oro', gramos: 0.03 }, { nombre: 'Plata', gramos: 0.15 }] },
  portatil: { label: 'Portátil',   pesoKg: 2.0,  materialesRecuperables: [{ nombre: 'Aluminio', gramos: 800 }, { nombre: 'Cobre', gramos: 100 }, { nombre: 'Litio', gramos: 40 }] },
  pc:       { label: 'PC de sobremesa', pesoKg: 8, materialesRecuperables: [{ nombre: 'Hierro', gramos: 4000 }, { nombre: 'Aluminio', gramos: 600 }, { nombre: 'Cobre', gramos: 300 }] },
  tablet:   { label: 'Tablet',     pesoKg: 0.5,  materialesRecuperables: [{ nombre: 'Aluminio', gramos: 180 }, { nombre: 'Cobre', gramos: 25 }, { nombre: 'Litio', gramos: 20 }] },
  tele:     { label: 'Televisión', pesoKg: 12,   materialesRecuperables: [{ nombre: 'Vidrio', gramos: 5000 }, { nombre: 'Plástico', gramos: 3000 }, { nombre: 'Cobre', gramos: 200 }] },
  nevera:   { label: 'Nevera',     pesoKg: 60,   materialesRecuperables: [{ nombre: 'Hierro', gramos: 30000 }, { nombre: 'Aluminio', gramos: 8000 }, { nombre: 'Cobre', gramos: 800 }] },
  lavadora: { label: 'Lavadora',   pesoKg: 75,   materialesRecuperables: [{ nombre: 'Hierro', gramos: 40000 }, { nombre: 'Plástico', gramos: 8000 }, { nombre: 'Cobre', gramos: 600 }] },
};

export default function ResiduosElectronicosTool() {
  const [dispositivo, setDispositivo] = useState<Dispositivo>('movil');
  const [cantidad, setCantidad] = useState('1');
  const [result, setResult] = useState<{ peso: number; materiales: { nombre: string; gramos: number }[] } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const q = parseFloat(cantidad.replace(',', '.'));
      if (isNaN(q) || q <= 0) throw new Error('Introduce una cantidad positiva.');
      const d = DISPOSITIVOS[dispositivo];
      setResult({
        peso: d.pesoKg * q,
        materiales: d.materialesRecuperables.map((m) => ({ nombre: m.nombre, gramos: m.gramos * q })),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Materiales recuperables al llevar tus dispositivos a un punto limpio de reciclaje electrónico.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Dispositivo</label>
          <select value={dispositivo} onChange={(e) => { setDispositivo(e.target.value as Dispositivo); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {(Object.entries(DISPOSITIVOS) as [Dispositivo, (typeof DISPOSITIVOS)[Dispositivo]][]).map(([k, v]) => <option key={k} value={k}>{v.label} (~{v.pesoKg} kg)</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad de unidades</label>
          <input type="number" min="1" step="1" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular materiales</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <p className="text-sm font-semibold text-[var(--color-text)]">Peso total: {formatNumber(result.peso, 2)} kg</p>
          <div className="space-y-1">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">Materiales recuperables:</p>
            {result.materiales.map((m) => (
              <div key={m.nombre} className="flex justify-between text-sm">
                <span className="text-[var(--color-text)]">{m.nombre}</span>
                <span className="font-semibold text-[var(--color-text)]">{m.gramos >= 1000 ? formatNumber(m.gramos / 1000, 2) + ' kg' : formatNumber(m.gramos, 1) + ' g'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
