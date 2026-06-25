import { useState } from 'react';

const LENGUAJES: { key: string; nombre: string; desc: string }[] = [
  { key: 'palabras', nombre: 'Palabras de afirmación', desc: 'Te sientes querido con elogios, mensajes cariñosos y palabras de aprecio.' },
  { key: 'tiempo', nombre: 'Tiempo de calidad', desc: 'Valoras la atención plena y los momentos compartidos sin distracciones.' },
  { key: 'regalos', nombre: 'Regalos', desc: 'Los detalles y obsequios, por pequeños que sean, te hacen sentir especial.' },
  { key: 'actos', nombre: 'Actos de servicio', desc: 'Aprecias que hagan cosas por ti: ayudar, facilitarte tareas, cuidar de ti.' },
  { key: 'contacto', nombre: 'Contacto físico', desc: 'Las caricias, abrazos y cercanía física son tu forma de sentir amor.' },
];
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function LenguajeAmorTool() {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ nombre: string; desc: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      let mejor = LENGUAJES[0]; let max = -1; let alguno = false;
      for (const l of LENGUAJES) {
        const v = parseFloat(valores[l.key] || '');
        if (isNaN(v)) continue;
        if (v < 0 || v > 10) throw new Error('Puntúa cada lenguaje del 0 al 10.');
        alguno = true;
        if (v > max) { max = v; mejor = l; }
      }
      if (!alguno) throw new Error('Puntúa al menos un lenguaje del amor.');
      setResult({ nombre: mejor.nombre, desc: mejor.desc });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Puntúa del 0 al 10 cuánto te importa cada forma de recibir amor.</p>
      <div className="space-y-3">
        {LENGUAJES.map((l) => (
          <div key={l.key} className="flex items-center gap-3">
            <label className="flex-1 text-sm text-[var(--color-text-secondary)]">{l.nombre}</label>
            <input type="number" min="0" max="10" value={valores[l.key] ?? ''} onChange={(e) => { setValores({ ...valores, [l.key]: e.target.value }); setResult(null); }} placeholder="0-10" className={`${INPUT} w-24`} />
          </div>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Descubrir mi lenguaje</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Tu lenguaje del amor principal</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.nombre}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.desc}</p>
        </div>
      )}
    </div>
  );
}
