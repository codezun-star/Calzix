# Auditoría de Calidad — Calculadoras Calzix

Revisión por fases de los 180 componentes `Tool.tsx` para detectar bugs de lógica, errores de estado, inputs mal mapeados, y violaciones de las reglas del proyecto.

**Criterios evaluados por tool:**
- Tipado TypeScript correcto (sin `any`)
- Inputs y estados correctamente mapeados a la fórmula
- Validación y mensajes de error en español
- Uso de `formatNumber` / `formatCurrency` / `formatPercent` desde `@/lib/utils/format`
- Uso de `crypto.getRandomValues()` en lugar de `Math.random()` si genera valores aleatorios
- Lógica de cálculo matemáticamente correcta

---

## Fase 1 — Tools 1-20 (A–CaminoVida)

**Fecha:** 2026-06-01
**Estado:** ✅ Completada — 1 bug corregido

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 1 | AguaAlimentosTool | ✅ OK | |
| 2 | AhorroEnergeticoTool | ✅ OK | |
| 3 | AhorroSolarTool | ✅ OK | |
| 4 | AlojamientoTool | ✅ OK | |
| 5 | AlquilerVsCompraTool | ✅ OK | Maneja correctamente interés=0 (cuota=capital/n) |
| 6 | AmortizacionHipotecaTool | ✅ OK | |
| 7 | AnguloSolarTool | ✅ OK | |
| 8 | AprendizajeEspaciadoTool | ✅ OK | |
| 9 | AreaFigurasTool | ✅ OK | |
| 10 | AreaJardinTool | ✅ OK | |
| 11 | AutonomiaTool | ✅ OK | |
| 12 | BaldosasSueloTool | ✅ OK | |
| 13 | BateriaSolarTool | ✅ OK | |
| 14 | BecaTool | ✅ OK | |
| 15 | CableElectricoTool | ✅ OK | |
| 16 | CaidaLibreTool | ✅ OK | |
| 17 | CalidadAguaTool | ✅ OK | |
| 18 | CalorEspecificoTool | 🔴 **CORREGIDO** | Ver detalle abajo |
| 19 | CambioDivisasTool | ✅ OK | Tipos de cambio estáticos — aviso visible en UI |
| 20 | CaminoVidaTool | ✅ OK | |

### Bug #1 — CalorEspecificoTool

**Síntoma:** Solo el modo `calor` funcionaba. Los modos `masa`, `especifico` y `delta` nunca producían resultado.

**Causa raíz:**
- El código declaraba `const m = parseFloat(masa...)` al inicio del bloque, usando siempre el estado `masa` como masa (kg). Sin embargo, en los modos no-calor el estado `masa` representa Q (calor), no la masa. Esto hacía que `m === q` y la fórmula fuera incorrecta.
- El input de calor específico (`ce`) estaba oculto con `{modo !== 'masa' && ...}` pero la fórmula lo leía igualmente → `cv = NaN` → error siempre.
- El input de ΔT (`delta`) estaba oculto con `{modo !== 'delta' && ...}` pero era necesario en el modo `delta`.
- En modo `especifico`: `setResult(q / (m * dt))` con `q === m` → resultado = `1/dt`, fórmula incorrecta.

**Corrección aplicada:**
Reescritura completa del componente. Ahora muestra siempre los 3 inputs con labels dinámicos por modo (array `MODOS` con `inputs: [string, string, string]`), y usa una sola fórmula limpia:
- Modo `calor`: `a * b * c`
- Resto de modos: `a / (b * c)`

---

## Fase 2 — Tools 21-40 (CaptacionLluvia–ConvAngulos)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 3 bugs corregidos

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 21 | CaptacionLluviaTool | ✅ OK | |
| 22 | CaraCruzTool | 🔴 **CORREGIDO** | Ver Bug #2 |
| 23 | CementoMorteroTool | ✅ OK | |
| 24 | CiclosPersonalesTool | ✅ OK | |
| 25 | CiclosSuenoTool | 🔴 **CORREGIDO** | Ver Bug #3 |
| 26 | CircuitoElectricoTool | ✅ OK | |
| 27 | Co2TransporteTool | ✅ OK | |
| 28 | CompatibilidadNumerologicaTool | ✅ OK | Números maestros 22/33 se tratan como 11 por simplificación (aceptable) |
| 29 | CompatibilidadTool | ✅ OK | |
| 30 | CompatibilidadZodiacalTool | 🔴 **CORREGIDO** | Ver Bug #4 |
| 31 | CompensacionCo2Tool | ✅ OK | |
| 32 | CompostOrganicoTool | ✅ OK | |
| 33 | ComprensionLectoraTool | ✅ OK | |
| 34 | ConcentracionMolarTool | ✅ OK | Dos calculadoras independientes en un componente |
| 35 | ConsumoAguaHogarTool | ✅ OK | |
| 36 | ConsumoAguaTool | ✅ OK | |
| 37 | ConsumoCombustibleTool | ✅ OK | |
| 38 | ConsumoDuchaTool | ✅ OK | |
| 39 | ConsumoElectricoTool | ✅ OK | |
| 40 | ConvAngulosTool | ✅ OK | Patrón base-unit correcto |

### Bug #2 — CaraCruzTool

**Síntoma:** Emojis 🪙 y 🎰 en la interfaz, violando la regla del proyecto "sin emojis en la UI, solo iconos Lucide React".

**Corrección aplicada:** Sustituidos por `<Sun>` (Cara) y `<Moon>` (Cruz) de Lucide React.

### Bug #3 — CiclosSuenoTool

**Síntoma:** En el modo "despertar" (¿cuándo me acuesto?), las etiquetas de ciclos eran incorrectas. Mostraba "4 ciclos (6h)" para la hora correspondiente a 6 ciclos de sueño, y "6 ciclos (9h)" para la de 4 ciclos.

**Causa raíz:** El array se calculaba para ciclos [4, 5, 6] y luego se invertía con `.reverse()` para mostrar el bedtime más temprano primero. Pero el label `{4 + i}` asumía el orden original no invertido, dejando ciclos y horas desfasados.

**Corrección aplicada:** Cambiado a almacenar tuplas `{ ciclos, hora }` en lugar de solo strings. Modo "despertar" genera [6, 5, 4] en ese orden (ya cronológico), modo "dormir" genera [4, 5, 6]. El render usa `entry.ciclos` directamente, eliminando el error de índice.

### Bug #4 — CompatibilidadZodiacalTool

**Síntoma:** Fechas del 1 al 19 de enero devolvían signo Piscis en lugar de Capricornio.

**Causa raíz:** La función `getSigno` itera los signos hacia atrás buscando el primero cuyo `fechaInicio` sea anterior a la fecha dada. Capricornio empieza el 22 de diciembre, por lo que para enero (mes 1) no existe ningún signo con `mes <= 1` excepto Acuario (desde el 20), dejando el loop sin resultado. El fallback era `return SIGNOS[11]` (Piscis), que es incorrecto.

**Corrección aplicada:** El fallback cambiado a `return SIGNOS[9]` (Capricornio), que es el único signo que cubre fechas de enero anteriores al 20.

---

## Fase 3 — Tools 41-60 (ConvArea–ConversionNotas)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 0 bugs

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 41 | ConvAreaTool | ✅ OK | |
| 42 | ConvCaudalTool | ✅ OK | |
| 43 | ConvDatosTool | ✅ OK | Distinción correcta SI (×1000) vs binario (×1024) |
| 44 | ConvDensidadTool | ✅ OK | g/L = kg/m³ correctamente tratados como equivalentes |
| 45 | ConvEficienciaTool | ✅ OK | Escala inversa (L/100km ↔ km/L) correctamente implementada |
| 46 | ConvEnergiaTool | ✅ OK | |
| 47 | ConvFrecuenciaTool | ✅ OK | RPM→Hz (÷60) y rad/s→Hz (÷2π) correctos |
| 48 | ConvFuerzaTool | ✅ OK | |
| 49 | ConvIluminacionTool | ✅ OK | |
| 50 | ConvLongitudTool | ✅ OK | |
| 51 | ConvMonedasTool | ✅ OK | Tasas estáticas con aviso en UI |
| 52 | ConvParMotorTool | ✅ OK | |
| 53 | ConvPesoTool | ✅ OK | |
| 54 | ConvPotenciaTool | ✅ OK | |
| 55 | ConvPresionTool | ✅ OK | |
| 56 | ConvTemperaturaTool | ✅ OK | Conversión vía Celsius como base correcta |
| 57 | ConvTiempoTool | ✅ OK | Mes = 30.4375 días (365.25/12), año = 365.25 días |
| 58 | ConvVelocidadTool | ✅ OK | |
| 59 | ConvVolumenTool | ✅ OK | |
| 60 | ConversionNotasTool | ✅ OK | Escala eu5 (1–5) usa offset correcto en toBase/fromBase |

---

## Fase 4 — Tools 61-80 (CorrelacionDatos–EcuacionLineal)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 0 bugs

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 61 | CorrelacionDatosTool | ✅ OK | Pearson correcto, guarda de varianza cero |
| 62 | CosteCarreraTool | ✅ OK | Costes mensuales × 10 meses lectivos documentado en UI |
| 63 | CosteReunionTool | ✅ OK | |
| 64 | CosteViajeTool | ✅ OK | |
| 65 | CostoGasolinera | ✅ OK | Nombre sin sufijo `Tool` — inconsistencia menor, no afecta funcionamiento |
| 66 | CostoPeajesTool | ✅ OK | |
| 67 | DadoVirtualTool | ✅ OK | Usa `crypto.getRandomValues()` ✅ |
| 68 | DescuentoTool | ✅ OK | IVA opcional bien implementado |
| 69 | DescuentoVolumenTool | ✅ OK | |
| 70 | DeudaSuenoTool | ✅ OK | |
| 71 | DiasJuntosTool | ✅ OK | |
| 72 | DiferenciaHorariaTool | ✅ OK | Cruces de medianoche y día siguiente correctos |
| 73 | DilucionesTool | ✅ OK | C₁V₁=C₂V₂ — los 4 modos bien mapeados a la fórmula |
| 74 | DimensionsMaletaTool | ✅ OK | Límite IATA usa suma lineal (≤158 cm) correctamente |
| 75 | DistanciaApieTool | ✅ OK | |
| 76 | DistanciaCiclismoTool | ✅ OK | |
| 77 | DistanciaTool | ✅ OK | Hora de llegada con detección de día siguiente |
| 78 | DistribucionNormalTool | ✅ OK | Aproximación erf (Abramowitz & Stegun, error ≤1.5e-7) |
| 79 | DuracionVueloTool | ✅ OK | |
| 80 | EcuacionLinealTool | ✅ OK | Muestra pasos intermedios, buen UX |

---

## Fases pendientes

| Fase | Tools | Estado |
|---|---|---|
| Fase 5 | 81-100 | Pendiente |
| Fase 4 | 61-80 | Pendiente |
| Fase 5 | 81-100 | Pendiente |
| Fase 6 | 101-120 | Pendiente |
| Fase 7 | 121-140 | Pendiente |
| Fase 8 | 141-160 | Pendiente |
| Fase 9 | 161-180 | Pendiente |


