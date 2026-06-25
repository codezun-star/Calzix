import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

const SIGNIFICADOS: Record<string, string> = {
  '000': 'Conexión con el infinito y con lo divino. Estás ante un nuevo inicio lleno de posibilidades.',
  '111': 'Manifestación y nuevos comienzos. Tus pensamientos se están materializando: enfócalos en lo positivo.',
  '222': 'Equilibrio, armonía y confianza. Vas por buen camino; ten paciencia y mantén la fe.',
  '333': 'Apoyo de tus guías y creatividad. Es momento de expresarte y crecer con valentía.',
  '444': 'Protección y estabilidad. Estás rodeado de apoyo; sigue construyendo con bases sólidas.',
  '555': 'Cambios importantes en camino. Prepárate para una transformación que te hará crecer.',
  '666': 'Reequilibra lo material y lo espiritual. Cuida tus pensamientos y vuelve a tu centro.',
  '777': 'Buena suerte y crecimiento espiritual. Vas por el camino correcto: confía en el proceso.',
  '888': 'Abundancia y recompensas. El esfuerzo está dando frutos; se acerca la prosperidad.',
  '999': 'Cierre de ciclos. Algo termina para dejar espacio a algo nuevo. Suelta lo que ya no sirve.',
  '1111': 'Portal de manifestación y alineación. Pide un deseo: tus intenciones tienen mucha fuerza ahora.',
  '1212': 'Sigue tu propio camino. Estás en sintonía con tu propósito; avanza con confianza.',
};

export default function NumeroAngelTool() {
  const [numero, setNumero] = useState('');
  const [result, setResult] = useState<{ num: string; texto: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = numero.replace(/\D/g, '');
      if (!n) throw new Error('Introduce un número (por ejemplo 111 o 1212).');
      const texto = SIGNIFICADOS[n] ?? 'Este número repetido te invita a prestar atención a tus pensamientos y emociones en este momento. Los números ángel son señales para reconectar con tu intuición y tu propósito.';
      setResult({ num: n, texto });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce el número que ves repetido (en relojes, matrículas, recibos…) y descubre su significado.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número ángel</label>
        <input value={numero} onChange={(e) => { setNumero(e.target.value); setResult(null); }} placeholder="Ej. 1111" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Ver significado</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.num}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.texto}</p>
        </div>
      )}
    </div>
  );
}
