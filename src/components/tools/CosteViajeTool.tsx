import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

interface Resultado {
  transporte: number;
  alojamiento: number;
  comida: number;
  actividades: number;
  otros: number;
  total: number;
  porViajero: number;
}

export default function CosteViajeTool() {
  const [transporte, setTransporte] = useState('');
  const [alojNoche, setAlojNoche] = useState('');
  const [noches, setNoches] = useState('');
  const [comidaDia, setComidaDia] = useState('');
  const [dias, setDias] = useState('');
  const [actividades, setActividades] = useState('');
  const [otros, setOtros] = useState('');
  const [viajeros, setViajeros] = useState('1');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function parse(s: string): number {
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) || n < 0 ? 0 : n;
  }

  function calcular() {
    setError('');
    const v = parseFloat(viajeros.replace(',', '.'));
    if (isNaN(v) || v < 1 || !Number.isInteger(v)) {
      setError('El número de viajeros debe ser un entero mayor que 0.');
      return;
    }

    const subtTransporte = parse(transporte);
    const subtAloj = parse(alojNoche) * parse(noches);
    const subtComida = parse(comidaDia) * parse(dias);
    const subtActividades = parse(actividades);
    const subtOtros = parse(otros);
    const total = subtTransporte + subtAloj + subtComida + subtActividades + subtOtros;

    setResultado({
      transporte: subtTransporte,
      alojamiento: subtAloj,
      comida: subtComida,
      actividades: subtActividades,
      otros: subtOtros,
      total,
      porViajero: total / v,
    });
  }

  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>Transporte total (€) — vuelos, tren, etc.</label>
          <input type="number" min="0" step="0.01" value={transporte} onChange={(e) => setTransporte(e.target.value)} placeholder="Ej. 320" className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={labelClass}>Alojamiento por noche (€)</label>
            <input type="number" min="0" step="0.01" value={alojNoche} onChange={(e) => setAlojNoche(e.target.value)} placeholder="Ej. 80" className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Número de noches</label>
            <input type="number" min="0" step="1" value={noches} onChange={(e) => setNoches(e.target.value)} placeholder="Ej. 7" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className={labelClass}>Comida por día (€)</label>
            <input type="number" min="0" step="0.01" value={comidaDia} onChange={(e) => setComidaDia(e.target.value)} placeholder="Ej. 40" className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Número de días</label>
            <input type="number" min="0" step="1" value={dias} onChange={(e) => setDias(e.target.value)} placeholder="Ej. 7" className={inputClass} />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Actividades y entradas (€)</label>
          <input type="number" min="0" step="0.01" value={actividades} onChange={(e) => setActividades(e.target.value)} placeholder="Ej. 150" className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Otros gastos (€)</label>
          <input type="number" min="0" step="0.01" value={otros} onChange={(e) => setOtros(e.target.value)} placeholder="Ej. 50" className={inputClass} />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Número de viajeros</label>
          <input type="number" min="1" step="1" value={viajeros} onChange={(e) => setViajeros(e.target.value)} placeholder="Ej. 2" className={inputClass} />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular coste del viaje
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
            Desglose por categoría
          </p>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                { label: 'Transporte', valor: resultado.transporte },
                { label: 'Alojamiento', valor: resultado.alojamiento },
                { label: 'Comida', valor: resultado.comida },
                { label: 'Actividades', valor: resultado.actividades },
                { label: 'Otros', valor: resultado.otros },
              ].map(({ label, valor }) => (
                <tr key={label}>
                  <td className="py-1.5 text-[var(--color-text-secondary)]">{label}</td>
                  <td className="py-1.5 text-right font-medium text-[var(--color-text)]">
                    {formatCurrency(valor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t-2 border-[var(--color-border)] pt-3 flex justify-between items-center">
            <span className="font-bold text-[var(--color-text)]">Total</span>
            <span className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(resultado.total)}
            </span>
          </div>

          <div className="rounded-lg bg-white/60 px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-[var(--color-text-secondary)]">Por viajero</span>
            <span className="text-xl font-extrabold text-[var(--color-accent)]">
              {formatCurrency(resultado.porViajero)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
