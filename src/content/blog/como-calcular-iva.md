---
titulo: "Como calcular el IVA en LATAM: tipos en Mexico, Colombia, Chile, Peru y Argentina"
descripcion: "Calcula el IVA o IGV en cualquier pais de LATAM: Mexico 16%, Colombia 19%, Chile 19%, Peru 18%, Argentina 21%. Formulas, ejemplos y diferencia entre IVA repercutido y soportado."
categoria: "finanzas"
fecha: "2026-06-07"
modificado: "2026-06-12"
keywords:
  - "calcular IVA Mexico"
  - "IVA Colombia IGV Peru"
  - "tipos IVA LATAM"
  - "formula calcular IVA"
  - "IVA repercutido soportado"
  - "calcular base imponible"
  - "IVA autónomos LATAM"
autor: "Equipo Calzix"
publicado: true
---

El IVA (o IGV en Peru) es el impuesto que mas afecta las transacciones cotidianas en toda America Latina: compras en el supermercado, facturas de servicios, ventas de tu negocio. Las tasas y categorias de exencion varian segun el pais, pero la logica matematica es identica en todos. Esta guia te explica los tipos vigentes en cada pais, las formulas para calcular el impuesto y como funciona para negocios y autonomos.

## Que es el IVA y como funciona

El **Impuesto al Valor Agregado** (IVA en la mayoria de paises, IGV en Peru) es un impuesto indirecto que grava el consumo. Cada vez que compras un bien o contratas un servicio, pagas el IVA incluido en el precio — aunque el vendedor lo recauda y lo transfiere al fisco.

En cada eslabon de la cadena productiva, el empresario paga IVA a sus proveedores (IVA soportado o credito fiscal) y cobra IVA a sus clientes (IVA repercutido o debito fiscal). Solo paga al fisco la diferencia entre lo que cobro y lo que pago. El consumidor final es quien absorbe el impuesto completo.

---

## Tasas de IVA por pais en LATAM

| Pais | Tasa general | Tasa reducida | Tasa 0 % / exento |
|---|---|---|---|
| Mexico | 16 % | — | Alimentos, medicamentos, libros |
| Colombia | 19 % | 5 % | Canasta basica, educacion, salud |
| Chile | 19 % | — | Exportaciones (0 %) |
| Peru (IGV) | 18 % | — | Alimentos, medicamentos, exportaciones |
| Argentina | 21 % | 10.5 % | Canasta basica, medicamentos |
| Ecuador | 15 % | — | Alimentos, medicamentos |
| Bolivia | 13 % | — | Servicios financieros |
| Uruguay | 22 % | 10 % | Canasta basica |

### Mexico: IVA del 16 %

En Mexico el IVA tiene **dos tasas**: 16 % general y 0 % para alimentos procesados y sin procesar, medicamentos, agua potable y libros. Las exportaciones tambien tributan a 0 %.

La tasa del 0 % no es exencion: el vendedor sigue presentando declaraciones y puede acreditar el IVA soportado en sus compras.

### Colombia: IVA del 19 % con tasa reducida del 5 %

Colombia tiene tasa general del 19 %, una tasa reducida del 5 % para bienes como computadores, tabletas, algunos alimentos procesados, vehiculos de trabajo agricola y medicamentos no esenciales, y un regimen de exencion que incluye carnes, huevos, frutas y verduras frescas, servicios de salud y educacion.

El sistema de devoluciones de IVA (DIAN) para personas naturales de bajos ingresos permite que ciertos hogares reciban una compensacion monetaria.

### Peru: IGV del 18 %

Peru llama al impuesto **IGV** (Impuesto General a las Ventas) y su tasa es del 18 % (compuesta por 16 % IGV + 2 % IPM — Impuesto de Promocion Municipal). Alimentos de la canasta basica, medicamentos y exportaciones estan exentos o en tasa 0 %.

### Argentina: IVA con multiples tasas

Argentina tiene tres tasas: 21 % (general), 10.5 % (reducida para construccion, medicina prepaga, algunos alimentos industrializados) y 0 % (canasta basica, medicamentos). La complejidad del sistema argentino es notable: la AFIP mantiene listados detallados de que aplica a cada categoria.

---

## Las dos formulas fundamentales

Estas formulas son identicas en todos los paises — solo cambia el porcentaje de la tasa.

### Añadir IVA a un precio base (base imponible conocida)

**Precio final = Base imponible × (1 + tasa / 100)**

Ejemplos con base de $1,000:

| Pais | Tasa | Precio final |
|---|---|---|
| Mexico | 16 % | $1,000 × 1.16 = **$1,160** |
| Colombia | 19 % | $1,000 × 1.19 = **$1,190** |
| Chile | 19 % | $1,000 × 1.19 = **$1,190** |
| Peru (IGV) | 18 % | $1,000 × 1.18 = **$1,180** |
| Argentina | 21 % | $1,000 × 1.21 = **$1,210** |

La cuota del impuesto es simplemente:
**Cuota IVA = Base imponible × (tasa / 100)**

### Extraer el IVA de un precio ya incluido (precio final conocido)

Este calculo es el que mas errores genera. **No** se puede restar directamente el porcentaje: eso da un resultado incorrecto.

**Base imponible = Precio final / (1 + tasa / 100)**

Ejemplo en Colombia con un articulo que cuesta $238,000 COP con IVA incluido al 19 %:

- Base imponible = $238,000 / 1.19 = **$200,000 COP**
- Cuota IVA = $238,000 - $200,000 = **$38,000 COP**

**El error frecuente:** $238,000 - ($238,000 × 0.19) = $238,000 - $45,220 = $192,780 → incorrecto, porque aplicas el 19 % sobre el precio con IVA incluido.

---

## IVA para autonomos y pequenas empresas

Si tienes un negocio en LATAM, el IVA tiene dos caras:

**IVA repercutido (debito fiscal):** el que cobras a tus clientes en tus facturas. No es tuyo — lo recaudas en nombre del fisco.

**IVA soportado (credito fiscal):** el que pagas a tus proveedores en sus facturas. Este lo puedes acreditar contra el IVA que debes pagar.

**Diferencia a pagar:** IVA repercutido − IVA soportado = lo que transfiers al fisco en cada periodo.

### Periodos de declaracion por pais

| Pais | Periodo | Formulario |
|---|---|---|
| Mexico | Mensual | Declaracion mensual SAT (portal SAT) |
| Colombia | Bimestral o cuatrimestral | Formulario 300 (DIAN) |
| Chile | Mensual | Formulario 29 (SII) |
| Peru | Mensual | PDT 621 (SUNAT) |
| Argentina | Mensual | Declaracion AFIP (aplicativo IVA) |

### Ejemplo practico para autonomos en Mexico

Un disenador freelance en Mexico factura $50,000 MXN + IVA a sus clientes en el mes. Sus gastos deducibles (software, internet, materiales) suman $10,000 MXN + IVA.

- IVA repercutido (cobrado a clientes): $50,000 × 16 % = **$8,000 MXN**
- IVA soportado (pagado a proveedores): $10,000 × 16 % = **$1,600 MXN**
- **IVA a pagar al SAT ese mes: $8,000 − $1,600 = $6,400 MXN**

---

## Errores frecuentes al calcular el IVA

**Aplicar la tasa equivocada.** En Mexico, los alimentos tributan al 0 % pero la ropa y servicios profesionales al 16 %. En Colombia, los libros estan exentos pero los libros digitales pueden tener tratamiento distinto. Consulta siempre la normativa especifica del producto o servicio.

**Incluir IVA en gastos no deducibles.** Si una compra no esta directamente vinculada a tu actividad economica, su IVA no es acreditable/deducible. Las reglas varian por pais pero el principio es universal.

**No desglosar base e impuesto en la factura.** Para que una factura sea valida a efectos fiscales en cualquier pais de LATAM, debe mostrar por separado: base imponible, tasa aplicada y cuota del impuesto. Un recibo sin desglose no sirve para acreditar IVA.

**Cobrar IVA cuando la actividad esta exenta.** Educacion, salud, exportaciones — cobrar IVA sobre actividades exentas genera un pasivo fiscal indebido.

---

## Calcula el IVA en segundos

Usa la **[calculadora de IVA](/calculadora-iva)** de Calzix para convertir instantaneamente entre precio con y sin impuesto para cualquier tasa de LATAM. Introduce la base imponible o el precio final, selecciona el porcentaje de tu pais y obtendras el desglose completo.

Entender el IVA no es solo cumplimiento fiscal: es la base para fijar precios correctamente, preparar presupuestos para clientes y gestionar la tesoreria de tu negocio sin sorpresas al cerrar el periodo.
