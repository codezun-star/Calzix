import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const SECCIONES = [
  { mm2: 1.5,  iMax: 15  },
  { mm2: 2.5,  iMax: 21  },
  { mm2: 4,    iMax: 27  },
  { mm2: 6,    iMax: 34  },
  { mm2: 10,   iMax: 46  },
  { mm2: 16,   iMax: 61  },
  { mm2: 25,   iMax: 80  },
  { mm2: 35,   iMax: 99  },
  { mm2: 50,   iMax: 119 },
  { mm2: 70,   iMax: 151 },
];

export default function CableElectricoTool() {
  const [potencia, setPotencia] = useState('');
  const [tension, setTension] = useState('230');
  const [longitud, setLongitud] = useState('');
  const [result, setResult] = useState<{ intensidad: number; seccion: number; caida: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(potencia.replace(',', '.'));
      const v = parseFloat(tension.replace(',', '.'));
      const l = parseFloat(longitud.replace(',', '.'));
      if (isNaN(p) || isNaN(v) || isNaN(l)) throw new Error('Introduce potencia, tensión y longitud.');
      if (p <= 0 || v <= 0 || l <= 0) throw new Error('Los valores deben ser positivos.');
      const intensidad = p / v;
      const seccion = SECCIONES.find((s) => s.iMax >= intensidad * 1.25)?.mm2 ?? 70;
      const rhoCopper = 0.0172;
      const caida = (2 * rhoCopper * l * intensidad) / seccion;
      setResult({ intensidad, seccion, caida });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia total (W)</label><input type="number" value={potencia} onChange={(e) => { setPotencia(e.target.value); setResult(null); }} placeholder="Ej. 2000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tensión (V)</label><input type="number" value={tension} onChange={(e) => { setTension(e.target.value); setResult(null); }} placeholder="230" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Longitud del cable (m)</label><input type="number" value={longitud} onChange={(e) => { setLongitud(e.target.value); setResult(null); }} placeholder="Ej. 20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular sección</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Intensidad</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.intensidad, 2)} A</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Sección mínima</p><p className="text-xl font-extrabold text-[var(--color-text)]">{result.seccion} mm²</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Caída de tensión</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.caida, 3)} V</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center">Cálculo monofásico con cobre (ρ = 0,0172 Ω·mm²/m). Con margen 25%.</p>
        </div>
      )}
    </div>
  );
}
