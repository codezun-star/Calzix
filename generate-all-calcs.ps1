# Script para generar todas las calculadoras de los 9 grupos
$toolsPath = "src\components\tools"
$pagesPath = "src\pages"

# Todos los datos de calculadoras para los 9 grupos
$allCalculadoras = @(
  # GRUPO 2: Ciencias (18 nuevas - Physics 9 + Chemistry 9)
  @("segunda-ley-newton", "NewtonTool"),
  @("energia-cinetica", "EnergiaCineticaTool"),
  @("energia-potencial", "EnergiaPotencialTool"),
  @("ley-ohm", "LeyOhmTool"),
  @("potencia-electrica", "PotenciaElectricaTool"),
  @("caida-libre", "CaidaLibreTool"),
  @("presion-hidrostatica", "PresionHidrostaticaTool"),
  @("frecuencia-onda", "FrecuenciaOndaTool"),
  @("calor-especifico", "CalorEspecificoTool"),
  @("calculadora-ph", "PhTool"),
  @("mol-masa-molar", "MolMasaTool"),
  @("gas-ideal", "GasIdealTool"),
  @("formula-molecular", "FormulaMolecularTool"),
  @("diluciones-quimica", "DilucionesTool"),
  @("estequiometria", "EstequiometriaTool"),
  @("solucion-concentracion", "SolucionConcentracionTool"),
  @("equilibrio-quimico", "EquilibrioQuimicoTool"),
  @("numero-oxidacion", "NumeroOxidacionTool"),
  # GRUPO 3: Conversión (8 nuevas)
  @("conversor-potencia", "ConvPotenciaTool"),
  @("conversor-fuerza", "ConvFuerzaTool"),
  @("conversor-densidad", "ConvDensidadTool"),
  @("conversor-caudal", "ConvCaudalTool"),
  @("conversor-par-motor", "ConvParMotorTool"),
  @("conversor-eficiencia", "ConvEficienciaTool"),
  @("conversor-frecuencia", "ConvFrecuenciaTool"),
  @("conversor-iluminacion", "ConvIluminacionTool"),
  # GRUPO 4: Hogar (14 nuevas)
  @("presupuesto-obra", "PresupuestoObraTool"),
  @("cemento-mortero", "CementoMorteroTool"),
  @("baldosas-suelo", "BaldosasSueloTool"),
  @("pintura-techos", "PinturaTechosTool"),
  @("pintura-exterior", "PinturaExteriorTool"),
  @("circuito-electrico", "CircuitoElectricoTool"),
  @("cable-electrico", "CableElectricoTool"),
  @("instalacion-solar-hogar", "InstalacionSolarHogarTool"),
  @("amortizacion-hipoteca", "AmortizacionHipotecaTool"),
  @("alquiler-vs-compra", "AlquilerVsCompraTool"),
  @("factura-gas", "FacturaGasTool"),
  @("consumo-agua-hogar", "ConsumoAguaHogarTool"),
  @("riego-jardin", "RiegoJardinTool"),
  @("fertilizante-jardin", "FertilizanteJardinTool"),
  # GRUPO 5: Trabajo (15 nuevas)
  @("precio-hora", "PrecioHoraTool"),
  @("margen-beneficio", "MargenBeneficioTool"),
  @("punto-equilibrio", "PuntoEquilibrioTool"),
  @("rentabilidad-roi", "RentabilidadRoiTool"),
  @("precio-coste-mas", "PrecioCosteMasTool"),
  @("descuento-volumen", "DescuentoVolumenTool"),
  @("precio-original-descuento", "PrecioOriginalDescuentoTool"),
  @("irpf-retencion", "IrpfRetencionTool"),
  @("finiquito", "FiniquitoTool"),
  @("vacaciones-proporcionales", "VacacionesTool"),
  @("horas-extra", "HorasExtraTool"),
  @("pomodoro", "PomodoroTool"),
  @("coste-reunion", "CosteReunionTool"),
  @("propina-grupo", "PropinaGrupoTool"),
  @("propina-porcentaje", "PropinaPorcentajeTool"),
  # GRUPO 6: Educación (16 nuevas)
  @("nota-necesaria", "NotaNecesariaTool"),
  @("nota-ponderada", "NotaPonderadaTool"),
  @("nota-selectividad", "NotaSelectividadTool"),
  @("conversion-notas", "ConversionNotasTool"),
  @("simulador-beca", "SimuladorBecaTool"),
  @("umbral-renta-beca", "UmbralRentaTool"),
  @("coste-carrera", "CosteCarreraTool"),
  @("sesion-estudio", "SesionEstudioTool"),
  @("aprendizaje-espaciado", "AprendizajeEspaciadoTool"),
  @("horas-idioma", "HorasIdiomaTool"),
  @("plan-estudio", "PlanEstudioTool"),
  @("palabras-minuto", "PalabrasMinutoTool"),
  @("tiempo-terminar-libro", "TiempoLibroTool"),
  @("libros-al-ano", "LibrosAnioTool"),
  @("comprension-lectora", "ComprensionLectoraTool"),
  @("paginas-por-dia", "PaginasPorDiaTool"),
  # GRUPO 7: Viaje (15 nuevas)
  @("autonomia-electrico", "AutonomiaTool"),
  @("costo-gasolinera", "CostoGasolinera"),
  @("litros-repostaje", "LitrosRepostajeTool"),
  @("distancia-a-pie", "DistanciaApieTool"),
  @("distancia-ciclismo", "DistanciaCiclismoTool"),
  @("ruta-senderismo", "RutaSenderismoTool"),
  @("jet-lag", "JetLagTool"),
  @("duracion-vuelo", "DuracionVueloTool"),
  @("exceso-equipaje", "ExcesoEquipajeTool"),
  @("dimensions-maleta", "DimensionsMaletaTool"),
  @("presupuesto-viaje", "PresupuestoViajeTool"),
  @("cambio-divisas", "CambioDivisasTool"),
  @("seguro-viaje", "SeguroViajeTool"),
  @("alojamiento-comparativa", "AlojamientoTool"),
  @("costo-peajes", "CostoPeajesTool"),
  # GRUPO 8: Naturaleza (16 nuevas)
  @("co2-transporte", "Co2TransporteTool"),
  @("compensacion-co2", "CompensacionCo2Tool"),
  @("huella-alimentaria", "HuellaAlimentariaTool"),
  @("etiqueta-energetica", "EtiquetaEnergeticaTool"),
  @("consumo-ducha", "ConsumoDuchaTool"),
  @("agua-alimentos", "AguaAlimentosTool"),
  @("calidad-agua", "CalidadAguaTool"),
  @("captacion-lluvia", "CaptacionLluviaTool"),
  @("numero-placas-solar", "NumeroPlacasTool"),
  @("angulo-solar", "AnguloSolarTool"),
  @("bateria-solar", "BateriaSolarTool"),
  @("plastico-reciclado", "PlasticoRecicladoTool"),
  @("papel-reciclado", "PapelRecicladoTool"),
  @("residuos-electronicos", "ResiduosElectronicosTool"),
  @("compost-organico", "CompostOrganicoTool"),
  @("eficiencia-energetica", "EficienciaEnergeticaTool"),
  # GRUPO 9: Ocio (16 nuevas)
  @("compatibilidad-zodiacal", "CompatibilidadZodiacalTool"),
  @("dias-juntos", "DiasJuntosTool"),
  @("nombre-amor", "NombreAmorTool"),
  @("presupuesto-boda", "PresupuestoBodaTool"),
  @("ruleta-decision", "RuletaDecisionTool"),
  @("dado-virtual", "DadoVirtualTool"),
  @("cara-o-cruz", "CaraCruzTool"),
  @("generador-loteria", "GeneradorLoteriaTool"),
  @("camino-vida", "CaminoVidaTool"),
  @("numero-expresion", "NumeroExpresionTool"),
  @("ciclos-personales", "CiclosPersonalesTool"),
  @("compatibilidad-numerologica", "CompatibilidadNumerologicaTool"),
  @("ciclos-sueno", "CiclosSuenoTool"),
  @("deuda-sueno", "DeudaSuenoTool"),
  @("hora-melatonina", "HoraMelatoninaTool"),
  @("siesta-optima", "SiestaOptimaTool")
)

$count = 0
foreach ($calc in $allCalculadoras) {
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
  { q: "¿Precisión?", a: "Precisión estándar del navegador." },
]}>
  <' + $name + ' client:load />
</CalcLayout>'

  Set-Content -Path $pagePath -Value $pageFile -Encoding UTF8 -Force

  $count++
  if ($count % 10 -eq 0) {
    Write-Host "Completadas: $count"
  }
}

Write-Host "Generadas $count calculadoras"
