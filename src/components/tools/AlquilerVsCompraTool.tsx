import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function AlquilerVsCompraTool() {
  const [precio, setPrecio] = useState('');
  const [entrada, setEntrada] = useState('20');
  const [interes, setInteres] = useState('3.5');
  const [anios, setAnios] = useState('30');
  const [alquiler, setAlquiler] = useState('');
  const [result, setResult] = useState<{ cuotaHipoteca: number; totalCompra: number; totalAlquiler: number; diferencia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pv = parseFloat(precio.replace(',', '.'));
      const en = parseFloat(entrada.replace(',', '.'));
      const r  = parseFloat(interes.replace(',', '.')) / 100 / 12;
      const n  = parseFloat(anios.replace(',', '.')) * 12;
      const aq = parseFloat(alquiler.replace(',', '.'));
      if (isNaN(pv) || isNaN(en) || isNaN(r) || isNaN(n) || isNaN(aq)) throw new Error('Introduce todos los valores.');
      if (pv <= 0 || aq <= 0) throw new Error('El precio y el alquiler deben ser positivos.');
      const capital = pv * (1 - en / 100);
      const cuota = r === 0 ? capital / n : capital * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const totalCompra = cuota * n + pv * en / 100;
      const totalAlquiler = aq * n;
      setResult({ cuotaHipoteca: cuota, totalCompra, totalAlquiler, diferencia: totalAlquiler - totalCompra });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del inmueble (€)</label><input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="200000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Entrada (%)</label><input type="number" value={entrada} onChange={(e) => { setEntrada(e.target.value); setResult(null); }} placeholder="20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Interés hipoteca (% anual)</label><input type="number" value={interes} onChange={(e) => { setInteres(e.target.value); setResult(null); }} placeholder="3.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo hipoteca (años)</label><input type="number" value={anios} onChange={(e) => { setAnios(e.target.value); setResult(null); }} placeholder="30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="col-span-2 space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Alquiler mensual equivalente (€)</label><input type="number" value={alquiler} onChange={(e) => { setAlquiler(e.target.value); setResult(null); }} placeholder="Ej. 900" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comparar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Cuota hipoteca/mes</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.cuotaHipoteca)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Alquiler/mes</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(parseFloat(alquiler))}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total compra ({anios} años)</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalCompra)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total alquiler ({anios} años)</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalAlquiler)}</p></div>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {result.diferencia > 0
              ? `Comprar cuesta ${formatCurrency(result.diferencia)} menos (sin contar revalorización ni IBI)`
              : `Alquilar cuesta ${formatCurrency(Math.abs(result.diferencia))} menos en ${anios} años`}
          </p>
        </div>
      )}
    </div>
  );
}
