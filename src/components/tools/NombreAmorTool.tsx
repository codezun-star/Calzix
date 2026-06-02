import { useState } from 'react';
import { formatPercent } from '@/lib/utils/format';

function calcularCompatibilidad(nombre1: string, nombre2: string): number {
  const combinado = (nombre1 + nombre2).toLowerCase().replace(/[^a-záéíóúüñ]/gi, '');
  let hash = 0;
  for (let i = 0; i < combinado.length; i++) {
    hash = (hash * 31 + combinado.charCodeAt(i)) >>> 0;
  }
  return 50 + (hash % 50);
}

const MENSAJES: { min: number; text: string }[] = [
  { min: 90, text: '¡Conexión excepcional! Las estrellas os tienen destinados.' },
  { min: 75, text: '¡Gran compatibilidad! Tenéis mucho en común.' },
  { min: 60, text: 'Buena compatibilidad. Con esfuerzo puede funcionar.' },
  { min: 50, text: 'Compatibilidad media. Todo es posible con comunicación.' },
  { min: 0,  text: 'Los opuestos se atraen. Diferentes pero complementarios.' },
];

export default function NombreAmorTool() {
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!nombre1.trim() || !nombre2.trim()) throw new Error('Introduce los dos nombres.');
      setResult(calcularCompatibilidad(nombre1.trim(), nombre2.trim()));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const mensaje = result !== null ? MENSAJES.find((m) => result >= m.min)!.text : '';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Compatibilidad basada en los nombres — solo por diversión.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Nombre 1</label><input type="text" value={nombre1} onChange={(e) => { setNombre1(e.target.value); setResult(null); }} placeholder="Tu nombre" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Nombre 2</label><input type="text" value={nombre2} onChange={(e) => { setNombre2(e.target.value); setResult(null); }} placeholder="Su nombre" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular compatibilidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2 text-center">
          <p className="text-4xl font-extrabold text-[var(--color-text)]">{formatPercent(result)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{mensaje}</p>
        </div>
      )}
    </div>
  );
}
