---
titulo: "Precio sin impuesto: como extraer la base imponible de un precio con IVA incluido"
descripcion: "Aprende a calcular el precio sin IVA o IGV correctamente en LATAM. El error de restar el porcentaje directamente puede costarte dinero. Formulas, ejemplos con tasas de Mexico, Colombia, Chile y Peru."
categoria: "guias"
fecha: "2026-06-07"
modificado: "2026-06-12"
keywords:
  - "precio sin IVA"
  - "base imponible"
  - "extraer IVA precio"
  - "calcular IVA Mexico Colombia"
  - "IGV Peru base imponible"
  - "formula base imponible"
  - "precio sin impuesto LATAM"
autor: "Equipo Calzix"
publicado: true
---

## El error que comete casi todo el mundo al calcular el precio sin impuesto

Tienes una factura por $1,160 MXN con IVA incluido al 16 % y quieres saber cual es la base imponible, es decir, el **precio sin IVA**. La reaccion instintiva de la mayoria es hacer esto: $1,160 × 16 % = $185.60 y luego restar: $1,160 - $185.60 = $974.40.

Ese resultado esta **mal**. Y la diferencia no es pequena.

El precio sin IVA correcto de $1,160 MXN (IVA 16 %) es exactamente **$1,000 MXN**. El error asciende a $25.60 en este ejemplo concreto. En facturas mas grandes, o cuando se acumulan muchas operaciones a lo largo del mes, ese error puede traducirse en cientos o miles de pesos de diferencia en las declaraciones fiscales.

## Por que no puedes simplemente restar el porcentaje de impuesto

El problema esta en la base sobre la que se aplica el porcentaje. El IVA se calcula **sobre el precio sin IVA**, no sobre el precio final.

Cuando un comerciante fija un precio sin IVA de $1,000 y aplica el 16 %, el resultado es:

$1,000 + ($1,000 × 0.16) = $1,000 + $160 = **$1,160 (precio con IVA)**

Ahora fijate: el 16 % de $1,000 son $160. Pero si intentas calcular el 16 % de $1,160 (el precio final), obtienes $185.60, que es una cifra diferente y erronea.

El error conceptual es confundir "el IVA es el 16 % del precio final" con "el IVA es el 16 % de la base imponible". Solo lo segundo es correcto.

## La formula correcta para extraer la base imponible

La formula que debes usar cuando conoces el precio con IVA incluido y quieres obtener la base imponible es:

**base = precio_con_IVA / (1 + tasa / 100)**

Para cada tasa de LATAM:

| Tasa | Divisor | Formula |
|---|---|---|
| IVA 16 % (Mexico) | 1.16 | base = precio / 1.16 |
| IVA 19 % (Colombia, Chile) | 1.19 | base = precio / 1.19 |
| IGV 18 % (Peru) | 1.18 | base = precio / 1.18 |
| IVA 21 % (Argentina) | 1.21 | base = precio / 1.21 |
| IVA 15 % (Ecuador) | 1.15 | base = precio / 1.15 |

Comprobemos con el ejemplo anterior: $1,160 / 1.16 = **$1,000 MXN**. Correcto.

La cuota de impuesto es simplemente la diferencia: $1,160 - $1,000 = **$160 MXN**.

## Tabla de referencia: precios con y sin IVA/IGV

### Mexico (IVA 16 %)

| Precio con IVA | Base imponible | Cuota IVA |
|---|---|---|
| $116 MXN | $100 | $16 |
| $580 MXN | $500 | $80 |
| $1,160 MXN | $1,000 | $160 |
| $2,320 MXN | $2,000 | $320 |
| $11,600 MXN | $10,000 | $1,600 |

### Colombia (IVA 19 %)

| Precio con IVA | Base imponible | Cuota IVA |
|---|---|---|
| $119,000 COP | $100,000 | $19,000 |
| $595,000 COP | $500,000 | $95,000 |
| $1,190,000 COP | $1,000,000 | $190,000 |

### Peru (IGV 18 %)

| Precio con IGV | Base imponible | Cuota IGV |
|---|---|---|
| S/ 118 | S/ 100 | S/ 18 |
| S/ 590 | S/ 500 | S/ 90 |
| S/ 1,180 | S/ 1,000 | S/ 180 |

## Como funciona esto para negocios y autonomos en LATAM

Si tienes un negocio en cualquier pais de LATAM, el impuesto tiene dos caras que debes distinguir bien:

**IVA repercutido / debito fiscal:** el impuesto que cobras a tus clientes en tus facturas. No es tuyo: lo recaudas en nombre del fisco.

**IVA soportado / credito fiscal:** el impuesto que pagas a tus proveedores en sus facturas. Este lo puedes acreditar contra el IVA que debes pagar.

**Lo que pagas al fisco cada periodo:** IVA repercutido − IVA soportado deducible

### Periodos y declaraciones por pais

| Pais | Periodo | Tramite |
|---|---|---|
| Mexico | Mensual | Declaracion mensual via portal del SAT (sat.gob.mx) |
| Colombia | Bimestral o cuatrimestral | Formulario 300 via portal DIAN (dian.gov.co) |
| Chile | Mensual | Formulario 29 via portal SII (sii.cl) |
| Peru | Mensual | PDT 621 via portal SUNAT (sunat.gob.pe) |
| Argentina | Mensual | Declaracion via portal AFIP (afip.gob.ar) |

### Ejemplo practico para autonomos en Mexico

Un disenador freelance en Mexico factura $50,000 MXN + IVA a sus clientes en el mes. Sus gastos deducibles (software, internet, materiales) suman $10,000 MXN + IVA.

- IVA repercutido (cobrado a clientes): $50,000 × 16 % = **$8,000 MXN**
- IVA acreditable (pagado a proveedores): $10,000 × 16 % = **$1,600 MXN**
- **IVA a pagar al SAT ese mes: $8,000 − $1,600 = $6,400 MXN**

## Errores frecuentes al gestionar el IVA

**Aplicar la tasa equivocada.** En Mexico, los alimentos sin procesar y los medicamentos tributan al 0 % (no al 16 %). En Colombia, los servicios de educacion y salud son exentos. Cobrar IVA sobre actividades exentas o a tasa equivocada genera un pasivo fiscal incorrecto.

**Confundir exento con tasa 0 %.** En Mexico, la tasa 0 % (alimentos, medicamentos) permite al vendedor acreditar el IVA de sus compras y solicitar devolucion. Las actividades exentas no generan ni traslado de IVA ni derecho a acreditamiento — son categorias distintas con efectos fiscales diferentes.

**No desglosar base e impuesto en la factura.** Para que una factura (CFDI en Mexico, factura electronica en Colombia/Chile/Peru) sea valida a efectos fiscales, debe mostrar por separado: base imponible, tasa aplicada y cuota del impuesto. Una nota sin desglose no sirve para acreditar IVA.

**Cobrar IVA cuando la actividad esta exenta.** Servicios medicos, educacion reglada, exportaciones, servicios financieros — cobrar IVA sobre estas actividades genera obligaciones tributarias indebidas.

**No conservar los comprobantes originales.** Sin la factura electronica valida (con todos los datos del emisor y el desglose correcto), no puedes deducir el IVA aunque hayas pagado el importe.

## Calcula la base imponible al instante

No hace falta hacer la division a mano cada vez. La [calculadora de IVA](/calculadora-iva) de Calzix te permite introducir el precio con impuesto, seleccionar la tasa de tu pais (Mexico 16 %, Colombia 19 %, Chile 19 %, Peru 18 %, Argentina 21 %) y obtener la base imponible y la cuota de IVA en un segundo.

Tambien puedes usarla a la inversa: desde la base imponible, calcular el precio final con IVA incluido. Especialmente util a la hora de preparar presupuestos o facturas.

Tener clara la diferencia entre base imponible y precio final no es solo cuestion de exactitud matematica: en contextos fiscales y comerciales, confundirlos puede tener consecuencias economicas reales en tus declaraciones.
