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

## Fases pendientes

| Fase | Tools | Estado |
|---|---|---|
| Fase 2 | 21-40 (CaptacionLluvia → ConvMonedas) | Pendiente |
| Fase 3 | 41-60 | Pendiente |
| Fase 4 | 61-80 | Pendiente |
| Fase 5 | 81-100 | Pendiente |
| Fase 6 | 101-120 | Pendiente |
| Fase 7 | 121-140 | Pendiente |
| Fase 8 | 141-160 | Pendiente |
| Fase 9 | 161-180 | Pendiente |
