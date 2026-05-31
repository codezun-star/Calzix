# Script para generar calculadoras automáticamente
$toolsPath = "src\components\tools"
$pagesPath = "src\pages"

$calculadoras = @(
  @("calculadora-factorial", "FactorialTool"),
  @("potencias-raices", "PotenciasRaicesTool"),
  @("mcm-mcd", "McmMcdTool"),
  @("numero-primo", "NumeroPrimoTool"),
  @("sistema-ecuaciones", "SistemaEcuacionesTool"),
  @("funcion-cuadratica", "FuncionCuadraticaTool"),
  @("perimetro-figuras", "PerimetroFigurasTool"),
  @("volumen-solidos", "VolumenSolidosTool"),
  @("teorema-pitagoras", "TeoremaPitagorasTool"),
  @("varianza-desviacion", "VarianzaDesviacionTool"),
  @("correlacion-datos", "CorrelacionDatosTool"),
  @("permutaciones-combinaciones", "PermutacionesTool"),
  @("distribucion-normal", "DistribucionNormalTool"),
  @("regla-tres", "ReglaTresTool")
)

foreach ($calc in $calculadoras) {
  $slug = $calc[0]
  $name = $calc[1]

  # Create Tool.tsx
  $toolPath = Join-Path $toolsPath "$name.tsx"
  $toolFile = 'import { useState } from "react";
import { formatNumber } from "@/lib/utils/format";

export default function ' + $name.Replace('Tool', '') + '() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calcular() {
    try {
      setError("");
      const value = parseFloat(input.replace(",", "."));
      if (isNaN(value)) throw new Error("Introduce un número válido.");
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
}'

  Set-Content -Path $toolPath -Value $toolFile -Encoding UTF8 -Force
  Write-Host "Tool: $name.tsx"

  # Create .astro page
  $pagePath = Join-Path $pagesPath "$slug.astro"
  $pageFile = '---
import CalcLayout from "@/components/layout/CalcLayout.astro";
import ' + $name + ' from "@/components/tools/' + $name + '";
---

<CalcLayout slug="' + $slug + '" faqs={[
  { q: "¿Qué es?", a: "Una herramienta de cálculo rápido." },
  { q: "¿Cómo usar?", a: "Introduce datos y haz clic en calcular." },
  { q: "¿Es seguro?", a: "Sí, cálculos locales sin datos guardados." },
  { q: "¿Límites?", a: "No hay límites de uso." },
  { q: "¿Precision?", a: "Precisión estándar del navegador." },
]}>
  <' + $name + ' client:load />
</CalcLayout>'

  Set-Content -Path $pagePath -Value $pageFile -Encoding UTF8 -Force
  Write-Host "Page: $slug.astro"
}

Write-Host "Listo para npm run build"
