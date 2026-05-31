import { useState } from "react";
import { formatNumber } from "@/lib/utils/format";

export default function ConvEficiencia() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calcular() {
    try {
      setError("");
      const value = parseFloat(input.replace(",", "."));
      if (isNaN(value)) throw new Error("Introduce un nÃºmero vÃ¡lido.");
      setResult(value * 2);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al calcular.");
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor</label>
        <input
          type="number"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          placeholder="0"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <span className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result)}</span>
        </div>
      )}
    </div>
  );
}
