---
titulo: "Precio sin IVA: cómo extraer la base imponible de un precio con IVA incluido"
descripcion: "Aprende a calcular el precio sin IVA correctamente. El error de restar el 21% directamente puede costarte dinero. Fórmulas, ejemplos y tipos de IVA en España."
categoria: "guias"
fecha: "2026-06-07"
keywords:
  - "precio sin IVA"
  - "base imponible"
  - "calcular IVA"
  - "extraer IVA precio"
  - "IVA 21%"
  - "IVA reducido"
  - "factura autónomo IVA"
  - "modelo 303 IVA"
autor: "Equipo Calzix"
publicado: true
---

## El error que comete casi todo el mundo al calcular el precio sin IVA

Imagina que tienes una factura por 242 € con IVA incluido al 21% y quieres saber cuál es la base imponible, es decir, el **precio sin IVA**. La reacción instintiva de la mayoría es hacer esto: 242 × 21% = 50,82 € y luego restar: 242 − 50,82 = 191,18 €.

Ese resultado está **mal**. Y la diferencia no es pequeña.

El precio sin IVA correcto de 242 € (IVA 21%) es **200 €**. El error asciende a 8,82 € en este ejemplo concreto. En facturas más grandes, o cuando se acumulan muchas operaciones a lo largo del año, ese error puede traducirse en cientos de euros de diferencia en las declaraciones fiscales.

Entender por qué falla ese cálculo intuitivo, y aprender la fórmula correcta, es el objetivo de esta guía.

## Por qué no puedes simplemente restar el porcentaje de IVA

El problema está en la base sobre la que se aplica el porcentaje. El IVA se calcula **sobre el precio sin IVA**, no sobre el precio final.

Cuando un comerciante fija un precio sin IVA de 200 € y aplica el 21%, el resultado es:

200 + (200 × 0,21) = 200 + 42 = **242 €** (precio con IVA)

Ahora fíjate: el 21% de 200 son 42 €. Pero si intentas calcular el 21% de 242 (el precio final), obtienes 50,82 €, que es una cifra diferente y errónea.

El error conceptual es confundir "el IVA es el 21% del precio final" con "el IVA es el 21% de la base imponible". Solo lo segundo es correcto. El porcentaje de IVA siempre se aplica sobre la base, y la base es menor que el precio final.

## La fórmula correcta para extraer la base imponible

La fórmula que debes usar cuando conoces el precio con IVA incluido y quieres obtener la base imponible es:

**base = precio_con_IVA / (1 + tipo_IVA / 100)**

Para IVA del 21%: base = precio / 1,21
Para IVA del 10%: base = precio / 1,10
Para IVA del 4%: base = precio / 1,04

Comprobemos con el ejemplo anterior: 242 / 1,21 = **200 €**. Ahora sí es correcto.

La cuota de IVA es simplemente la diferencia: 242 − 200 = **42 €**.

## Tipos de IVA en España y cuándo se aplica cada uno

España tiene tres tipos de IVA que se aplican a categorías de productos y servicios muy diferentes. Conocerlos es esencial tanto para consumidores como para autónomos y empresas.

### IVA general: 21%

Es el tipo que se aplica por defecto a la mayoría de bienes y servicios:
- Electrónica, ropa, calzado, muebles.
- Servicios profesionales (abogados, consultores, fontaneros).
- Restauración y hostelería.
- Vehículos, combustibles.
- Facturas de servicios de telecomunicaciones.

### IVA reducido: 10%

Aplica a productos y servicios considerados de primera necesidad o de acceso general:
- Alimentos en general (excepto los que tributan al 4%).
- Transporte de viajeros.
- Servicios de hostelería y restauración (comida para llevar, cafeterías).
- Entrada a espectáculos y eventos deportivos.
- Servicios de peluquería.
- Obras de renovación y reparación de vivienda habitual (si se cumplen ciertos requisitos).

### IVA superreducido: 4%

Solo para productos considerados de máxima necesidad:
- Pan, harina, leche, queso, huevos, frutas, verduras y legumbres frescas.
- Libros, periódicos y revistas (en papel).
- Medicamentos para uso humano.
- Vivienda de protección oficial.
- Prótesis e implantes para personas con discapacidad.

Esta tabla resume la fórmula de extracción para cada tipo:

| Tipo de IVA | Divisor | Ejemplo precio con IVA | Base imponible | Cuota de IVA |
|---|---|---|---|---|
| 21% (general) | 1,21 | 121,00 € | 100,00 € | 21,00 € |
| 10% (reducido) | 1,10 | 110,00 € | 100,00 € | 10,00 € |
| 4% (superreducido) | 1,04 | 104,00 € | 100,00 € | 4,00 € |

## Ejemplos reales de extracción de IVA

### Ticket de supermercado (IVA mixto)

En un supermercado es frecuente que distintos productos lleven tipos de IVA diferentes. Un litro de leche lleva IVA al 4%, un filete de pollo también (alimento básico no elaborado), pero una cerveza lleva IVA al 21%. El ticket suele desglosar las bases por tipo de IVA al final, pero si no lo hace, puedes calcularlo tú mismo.

Si has pagado 38 € por productos con IVA al 4% y 12 € por productos con IVA al 21%:

- Base al 4%: 38 / 1,04 = 36,54 €. Cuota: 38 − 36,54 = 1,46 €
- Base al 21%: 12 / 1,21 = 9,92 €. Cuota: 12 − 9,92 = 2,08 €
- Total IVA soportado: 1,46 + 2,08 = 3,54 €

### Factura de taller mecánico (IVA 21%)

Tu coche sale del taller con una factura de 363 €. ¿Cuánto es base y cuánto es IVA?

- Base: 363 / 1,21 = 300,00 €
- IVA 21%: 363 − 300 = 63,00 €

### Compra de un libro (IVA 4%)

Un libro de texto universitario cuesta 41,60 €.

- Base: 41,60 / 1,04 = 40,00 €
- IVA 4%: 41,60 − 40,00 = 1,60 €

## Para autónomos: IVA repercutido, soportado y el Modelo 303

Si eres autónomo o tienes una pequeña empresa, la gestión del IVA tiene una dimensión adicional. No solo pagas IVA como consumidor: también lo cobras en tus facturas y lo ingresas trimestralmente a Hacienda.

**IVA repercutido:** el IVA que tú cobras a tus clientes en tus facturas. Si emites una factura de 1.000 € + 21% de IVA, repercutes 210 €.

**IVA soportado:** el IVA que tú pagas en tus compras de bienes y servicios necesarios para la actividad. Si compras material de oficina por 121 € (IVA incluido), soportas 21 € de IVA.

**Resultado de la declaración trimestral (Modelo 303):**

Cuota a ingresar = IVA repercutido − IVA soportado deducible

Si en un trimestre has repercutido 1.800 € de IVA y has soportado 600 € en compras deducibles, la cuota a ingresar es 1.200 €.

Si el IVA soportado supera al repercutido (habitual en períodos de inversión o con muchos gastos), el resultado es negativo: tienes una devolución o un crédito a compensar en trimestres siguientes.

La correcta extracción de la base imponible de cada factura de gasto es fundamental para no deducir de más ni de menos. Usar el divisor incorrecto o restar el porcentaje directamente introduce errores acumulativos que pueden generar problemas en la revisión de Hacienda.

## Errores frecuentes en la gestión del IVA

**Aplicar el tipo equivocado.** Las dudas más comunes son: ¿las flores naturales llevan IVA al 4% o al 10%? (llevan 10%). ¿Los alimentos elaborados o preparados? Muchos llevan 10%, no 4%. ¿Las obras en casa llevan IVA reducido siempre? No: solo si cumples los requisitos de reforma de vivienda habitual establecidos por la AEAT.

**Deducir IVA de gastos no deducibles.** Los gastos de representación, ciertos vehículos y gastos personales tienen limitaciones en la deducción del IVA soportado. No todo el IVA pagado es automáticamente deducible.

**No conservar las facturas originales.** Sin la factura completa y correcta (con datos del emisor, número, base, tipo y cuota de IVA desglosados), no puedes deducir el IVA aunque hayas pagado el importe. Un simple recibo o ticket no siempre es suficiente.

**Confundir precio con IVA y precio más IVA en los presupuestos.** Cuando un profesional te da un presupuesto "más IVA", el precio final será mayor. Si pone el precio "IVA incluido", ya está todo dentro. Pedir siempre aclaración evita sorpresas al recibir la factura definitiva.

## Calcula la base imponible al instante

No hace falta hacer la división a mano cada vez. La [calculadora de IVA](/calculadora-iva) de Calzix te permite introducir el precio con IVA, seleccionar el tipo aplicable (4%, 10% o 21%) y obtener la base imponible y la cuota de IVA en un segundo.

También puedes usarla a la inversa: desde la base imponible, calcular el precio final con IVA incluido. Especialmente útil a la hora de preparar presupuestos o facturas.

Tener clara la diferencia entre base imponible y precio final no es solo cuestión de exactitud matemática: en contextos fiscales y comerciales, confundirlos puede tener consecuencias económicas reales.
