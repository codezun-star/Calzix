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

## Fase 5 — Tools 81-100 (EficienciaEnergetica–HorasIdioma)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 1 bug corregido

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 81 | EficienciaEnergeticaTool | ✅ OK | |
| 82 | EnergiaCineticaTool | ✅ OK | Ec = ½mv² |
| 83 | EnergiaPotencialTool | ✅ OK | Ep = mgh |
| 84 | EquilibrioQuimicoTool | ✅ OK | Kc = [C]^c[D]^d / [A]^a[B]^b |
| 85 | EstequiometriaTool | ✅ OK | |
| 86 | EtiquetaEnergeticaTool | ✅ OK | Estado `tipo` no se usa en cálculo (sin impacto funcional) |
| 87 | ExcesoEquipajeTool | ✅ OK | |
| 88 | FactorialTool | ✅ OK | Usa BigInt para resultados exactos hasta 170! |
| 89 | FacturaGasTool | ✅ OK | |
| 90 | FertilizanteJardinTool | ✅ OK | |
| 91 | FiniquitoTool | ✅ OK | |
| 92 | FormulaMolecularTool | ✅ OK | Normaliza subíndices Unicode antes de parsear |
| 93 | FrecuenciaOndaTool | ✅ OK | v=f·λ — 3 modos correctos |
| 94 | FuncionCuadraticaTool | ✅ OK | Discriminante, raíces y vértice correctos |
| 95 | GasIdealTool | ✅ OK | PV=nRT — 4 modos, R=8.314 J/(mol·K) |
| 96 | GeneradorLoteriaTool | ✅ OK | Usa `crypto.getRandomValues()` ✅ |
| 97 | HipotecaTool | ✅ OK | Maneja interés=0, misma fórmula que AmortizacionHipotecaTool |
| 98 | HoraMelatoninaTool | ✅ OK | `addMinutes` con manejo correcto de negativos |
| 99 | HorasExtraTool | ✅ OK | 1800 h/año = jornada laboral española estándar |
| 100 | HorasIdiomaTool | ✅ OK | Horas MCER bien establecidas |

### Bug #5 — CiclosSuenoTool (addMinutes)

**Detectado en:** Fase 5 (revisión de código de Fase 2)

**Síntoma:** En modo "despertar", horas de bedtime que cruzan medianoche hacia atrás (resultado negativo en minutos) se mostraban como valores inválidos, ej. `-3:-14` en vez de `21:46`.

**Causa raíz:** La función `addMinutes` original usaba `Math.floor(total / 60) % 24` y `total % 60`. El operador `%` en JavaScript conserva el signo del dividendo, por lo que valores negativos producían horas y minutos negativos. Para una hora de despertar a las 07:00, calcular 5 o 6 ciclos hacia atrás produce `total` negativo (-44, -134 min).

**Corrección aplicada:** Mismo patrón de `HoraMelatoninaTool` que ya lo resolvía correctamente:
- Horas: `Math.floor(((total % 1440) + 1440) % 1440 / 60)`
- Minutos: `((total % 60) + 60) % 60`

---

## Fases pendientes

| Fase | Tools | Estado |
|---|---|---|
| Fase 6 | 101-120 | Pendiente |
| Fase 4 | 61-80 | Pendiente |
## Fase 6 — Tools 101-120 (HuellaAlimentaria–NotaPonderada)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 0 bugs

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 101 | HuellaAlimentariaTool | ✅ OK | |
| 102 | HuellaCarbonTool | ✅ OK | |
| 103 | InstalacionSolarHogarTool | ✅ OK | Factor 0.8 eficiencia y 1.200€/kWp correctos |
| 104 | IrpfRetencionTool | ✅ OK | Tramos IRPF 2024 verificados (hasta 47% para >300k) |
| 105 | IvaTool | ✅ OK | Añadir y extraer IVA correctos |
| 106 | JetLagTool | ✅ OK | |
| 107 | LeyOhmTool | ✅ OK | V=IR — 3 modos correctos |
| 108 | LibrosAnioTool | ✅ OK | |
| 109 | LitrosRepostajeTool | ✅ OK | Campos opcionales bien manejados |
| 110 | MargenBeneficioTool | ✅ OK | Margen sobre precio (no markup) — fórmulas correctas |
| 111 | MaterialesConstruccionTool | ✅ OK | 5% de desperdicio documentado en UI |
| 112 | McmMcdTool | ✅ OK | Euclídeo correcto; MCM = (a/mcd)×b evita overflow |
| 113 | MediaMedianaTool | ✅ OK | Varianza poblacional (÷n), estadísticas completas |
| 114 | MolMasaTool | ✅ OK | |
| 115 | NewtonTool | ✅ OK | F=ma — 3 modos correctos |
| 116 | NombreAmorTool | ✅ OK | Hash unsigned con `>>> 0`; disclaimer visible |
| 117 | NominaTool | ✅ OK | SS 6,4% + IRPF progresivo sobre base neta SS |
| 118 | NotaMediaTool | ✅ OK | Media simple y ponderada en tiempo real (useMemo) |
| 119 | NotaNecesariaTool | ✅ OK | Fórmula `(min×total - actual×pasados) / restantes` correcta |
| 120 | NotaPonderadaTool | ✅ OK | |

---

## Fases pendientes

| Fase | Tools | Estado |
|---|---|---|
| Fase 7 | 121-140 | Pendiente |
## Fase 7 — Tools 121-140 (NotaSelectividad–Pomodoro)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 0 bugs

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 121 | NotaSelectividadTool | ✅ OK | Fórmula 0.6×Bach + 0.4×EvAU + bonificación, tope 14 correctos |
| 122 | NumeroExpresionTool | ✅ OK | Tabla pitagórica; filtra solo letras latinas |
| 123 | NumeroOxidacionTool | ✅ OK | Herramienta de referencia (no calcula) |
| 124 | NumeroPlacasTool | ✅ OK | Misma fórmula validada que InstalacionSolarHogarTool |
| 125 | NumeroPrimoTool | ✅ OK | Test primo O(√n); factorización correcta |
| 126 | NumerologiaTool | ✅ OK | |
| 127 | NumerosSuerteTool | ✅ OK | Usa `crypto.getRandomValues()` ✅; complementario = 7ª bola única |
| 128 | PaginasPorDiaTool | ✅ OK | |
| 129 | PalabrasMinutoTool | ✅ OK | |
| 130 | PapelRecicladoTool | ✅ OK | |
| 131 | PerimetroFigurasTool | ✅ OK | Rombo: `2√(d1²+d2²)` correcto |
| 132 | PermutacionesTool | ✅ OK | P=n!/(n-r)!, C=n!/(r!(n-r)!) correctos |
| 133 | PesoEquipajeTool | ✅ OK | Cálculo en tiempo real; iconos Lucide (Plus, Trash2) |
| 134 | PhTool | ✅ OK | pH, pOH, [H⁺], [OH⁻] — 3 modos correctos |
| 135 | PinturaExteriorTool | ✅ OK | Descuento ventana 1.5m², puerta 2m² |
| 136 | PinturaTechosTool | ✅ OK | |
| 137 | PinturaTool | ✅ OK | Área = 2×(l+an)×al; 10% buffer incluido |
| 138 | PlanEstudioTool | ✅ OK | |
| 139 | PlasticoRecicladoTool | ✅ OK | |
| 140 | PomodoroTool | ✅ OK | `(pomodoros-bloques)×mdc` = nº descansos cortos, verificado |

---

## Fases pendientes

| Fase | Tools | Estado |
|---|---|---|
## Fase 8 — Tools 141-160 (Porcentaje–ResiduosElectronicos)

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 1 bug corregido

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 141 | PorcentajeTool | ✅ OK | 3 modos correctos: X% de N, qué % es X de N, X es Y% de qué N |
| 142 | PotenciaElectricaTool | ✅ OK | P=V×I — 3 modos correctos |
| 143 | PotenciasRaicesTool | ✅ OK | Maneja bases negativas en raíces impares |
| 144 | PrecioCosteMasTool | ✅ OK | Markup sobre coste; muestra margen sobre venta además |
| 145 | PrecioHoraTool | ✅ OK | |
| 146 | PrecioOriginalDescuentoTool | ✅ OK | original = pf/(1-d/100) correcto |
| 147 | PresionHidrostaticaTool | ✅ OK | P=ρgh; permite h=0 |
| 148 | PresupuestoBodaTool | ✅ OK | |
| 149 | PresupuestoObraTool | ✅ OK | Cocina/baño = precio fijo; resto = €/m² |
| 150 | PresupuestoViajeTool | ✅ OK | comida×días×personas correcto |
| 151 | ProbabilidadTool | ✅ OK | |
| 152 | ProductividadTool | ✅ OK | |
| 153 | PropinaGrupoTool | ✅ OK | |
| 154 | PropinaPorcentajeTool | ✅ OK | |
| 155 | PropinaTool | ✅ OK | |
| 156 | PuntoEquilibrioTool | ✅ OK | Break-even = CF/(PV-CV) correcto |
| 157 | ReciclajeTool | ✅ OK | |
| 158 | ReglaTresTool | 🔴 **CORREGIDO** | Ver Bug #6 |
| 159 | RentabilidadRoiTool | ✅ OK | ROI simple (no compuesto), bien etiquetado |
| 160 | ResiduosElectronicosTool | ✅ OK | |

### Bug #6 — ReglaTresTool

**Síntoma:** En modo inversa, si el usuario introduce `C = 0`, la división `(na × nb) / 0` produce `Infinity` que se muestra en pantalla sin mensaje de error.

**Causa raíz:** La validación solo cubría `na === 0` (válida para ambos modos), pero no validaba `nc === 0` en el modo inversa, donde `nc` es el divisor.

**Corrección aplicada:** Añadida validación `if (nc === 0) throw new Error('C no puede ser cero en proporción inversa.')` dentro del bloque inversa.

---

## Fase 9 — Tools 161-180 (RiegoJardin–VolumenSolidos) — ÚLTIMA FASE

**Fecha:** 2026-06-02
**Estado:** ✅ Completada — 3 bugs corregidos (en 3 archivos)

| # | Componente | Estado | Observaciones |
|---|---|---|---|
| 161 | RiegoJardinTool | ✅ OK | |
| 162 | RuletaDecisionTool | ✅ OK | Usa `crypto.getRandomValues()` ✅ |
| 163 | RutaSenderismoTool | ✅ OK | Regla de Naismith: +1h por cada 300m desnivel |
| 164 | SeguroViajeTool | ✅ OK | Claramente etiquetado como orientativo |
| 165 | SesionEstudioTool | ✅ OK | |
| 166 | SiestaOptimaTool | ✅ OK | `addMinutes` con duraciones siempre positivas — `% 24` correcto |
| 167 | SimuladorBecaTool | 🔴 **CORREGIDO** | Ver Bug #8 (mismo patrón que UmbralRentaTool) |
| 168 | SinCosTanTool | 🔴 **CORREGIDO** | Ver Bug #7 |
| 169 | SistemaEcuacionesTool | ✅ OK | Regla de Cramer correcta; detecta determinante=0 |
| 170 | SolucionConcentracionTool | ✅ OK | Molar, masa% y ppm correctos |
| 171 | SuenoTool | ✅ OK | `minutosAHora` con manejo de negativos correcto desde origen |
| 172 | TeoremaPitagorasTool | ✅ OK | |
| 173 | TiempoEstudioTool | ✅ OK | |
| 174 | TiempoLibroTool | ✅ OK | |
| 175 | UmbralRentaTool | 🔴 **CORREGIDO** | Ver Bug #8 |
| 176 | VacacionesTool | ✅ OK | |
| 177 | VarianzaDesviacionTool | ✅ OK | Opción poblacional (÷n) y muestral (÷n-1) |
| 178 | VelocidadFisicaTool | ✅ OK | v=d/t — 3 modos correctos |
| 179 | VelocidadLecturaTool | ✅ OK | |
| 180 | VolumenSolidosTool | ✅ OK | 6 sólidos con fórmulas correctas |

### Bug #7 — SinCosTanTool

**Síntoma:** La fila `arctan` mostraba valores erróneos. Para 45°, mostraba 35,26° en vez de 45°.

**Causa raíz:** `Math.atan(senVal)` calcula arctan(sin(ángulo)) en lugar de arctan(tan(ángulo)). Para 45°: arctan(sin(45°)) = arctan(0.707) = 35.26° — incorrecto.

**Corrección aplicada:** Cambiado a `Math.atan2(senVal, cosVal)`, que equivale al ángulo original en el rango [-π, π] y es numéricamente estable (no divide por cero cuando cos=0).

### Bug #8 — UmbralRentaTool y SimuladorBecaTool

**Síntoma:** Familias con más de 8 miembros siempre recibían el umbral de 8 miembros en lugar del umbral extrapolado (umbral[8] + extras×3000).

**Causa raíz:** El patrón `UMBRALES[Math.min(n, 8)] ?? fallback` nunca activa el `??` porque `Math.min(n, 8)` siempre devuelve un índice válido (≤8 = definido en la tabla). El operador `??` solo se activa cuando el resultado es `null` o `undefined`.

**Corrección aplicada:** Eliminado el `Math.min`. Ahora: `UMBRALES[n] ?? (UMBRALES[8] + (n-8) × 3000)` — el `??` activa correctamente cuando n > 8 (índice no definido en la tabla).

---

## Resumen global de la auditoría

**Estado:** ✅ COMPLETADA — 9 fases, 180 tools

| Métrica | Valor |
|---|---|
| Tools auditados | 180 / 180 |
| Bugs corregidos | **8 bugs en 9 archivos** |
| Tools sin bugs | 171 |

### Bugs corregidos (resumen)

| # | Archivo | Descripción |
|---|---|---|
| 1 | CalorEspecificoTool | Modos masa/especifico/delta completamente rotos — inputs ocultos mal mapeados |
| 2 | CaraCruzTool | Emojis 🪙/🎰 en UI (violación regla "sin emojis") → Sun/Moon Lucide |
| 3 | CiclosSuenoTool | Labels ciclos invertidos tras `.reverse()` + `addMinutes` con negativos |
| 4 | CompatibilidadZodiacalTool | `getSigno` devolvía Piscis para 1-19 enero (correcto: Capricornio) |
| 5 | CiclosSuenoTool | `addMinutes` producía tiempos negativos al cruzar medianoche hacia atrás |
| 6 | ReglaTresTool | Modo inversa con C=0 producía Infinity sin mensaje de error |
| 7 | SinCosTanTool | `arctan` usaba `Math.atan(sin)` en vez de `Math.atan2(sin, cos)` |
| 8 | UmbralRentaTool + SimuladorBecaTool | `Math.min(n,8)` impedía el fallback `??` para familias >8 miembros |



