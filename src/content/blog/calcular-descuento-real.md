---
titulo: "Como calcular el descuento real de una oferta: formulas, ejemplos y trampas"
descripcion: "Aprende a calcular el descuento correctamente en LATAM: precio final, descuentos en cadena, precio original y como detectar las trampas del Black Friday y las rebajas."
categoria: "tips"
fecha: "2026-06-07"
modificado: "2026-06-12"
keywords:
  - "calcular descuento"
  - "descuento porcentaje"
  - "precio final con descuento"
  - "descuentos en cadena"
  - "Black Friday trampas"
  - "precio original descuento"
  - "calcular descuento real"
  - "oferta precio rebajado"
autor: "Equipo Calzix"
publicado: true
---

## Saber calcular un descuento es mas util de lo que parece

Puede parecer algo basico, pero calcular un descuento correctamente genera confusion con mas frecuencia de la que deberia. El motivo principal es que hay tres tipos de preguntas distintas relacionadas con los descuentos, y cada una tiene su propia formula. Confundirlas lleva a errores que, en compras grandes, pueden suponer decenas de pesos de diferencia.

Ademas, las tecnicas de fijacion de precios en el comercio minorista estan disenadas para que no hagas bien las cuentas. Saber **calcular el descuento real** de una oferta es, literalmente, una habilidad que te protege de pagar mas de lo que crees que estas pagando.

## Las tres formulas esenciales de los descuentos

### 1. Precio final despues de aplicar un descuento

Esta es la mas usada: tienes un precio original y quieres saber cuanto pagaras tras aplicar un porcentaje de descuento.

**precio_final = precio_original × (1 − descuento / 100)**

Ejemplo: una chamarra que cuesta $890 MXN con un descuento del 30 %:

precio_final = $890 × (1 − 30/100) = $890 × 0.70 = **$623 MXN**

El error habitual aqui es calcular el 30 % de $890 (que da $267) y restar esa cifra. El resultado es el mismo: $890 − $267 = $623 MXN. Ambos metodos son equivalentes, asi que en este caso da igual cual uses.

### 2. Que porcentaje de descuento se ha aplicado realmente

Ves un producto con precio tachado y precio actual, pero no te dicen el porcentaje. ¿Como sabes si la oferta es buena o esta inflada?

**descuento% = (precio_original − precio_final) / precio_original × 100**

Ejemplo: una television que antes costaba $6,490 MXN y ahora esta a $5,190 MXN:

descuento% = (6,490 − 5,190) / 6,490 × 100 = 1,300 / 6,490 × 100 = **20.03 %**

Esto es especialmente util cuando un vendedor anuncia "precio rebajado" sin decir cuanto. Haz la cuenta tu mismo antes de decidir si es una buena oferta.

### 3. Recuperar el precio original desde el precio con descuento

Conoces el precio final y el descuento aplicado, pero quieres saber cual era el precio antes de la rebaja. Esto es util para verificar si el precio "original" es real o esta inflado artificialmente.

**precio_original = precio_final / (1 − descuento / 100)**

Ejemplo: un articulo en oferta a $750 MXN con un 25 % de descuento. ¿Cual era el precio original?

precio_original = $750 / (1 − 25/100) = $750 / 0.75 = **$1,000 MXN**

Puedes hacer la comprobacion inversa: $1,000 × 0.75 = $750. Correcto.

## Descuentos en cadena: el gran engano matematico

Aqui es donde la mayoria de la gente falla, y donde algunos vendedores se aprovechan de la confusion. Cuando te aplican dos descuentos seguidos, el resultado **no** es la suma de los dos porcentajes.

Un descuento del 30 % seguido de otro del 20 % **no** es un descuento del 50 %.

La formula correcta para descuentos en cadena es:

**descuento_total = 1 − (1 − d1/100) × (1 − d2/100)**

Para el ejemplo de 30 % + 20 %:

descuento_total = 1 − (1 − 0.30) × (1 − 0.20) = 1 − 0.70 × 0.80 = 1 − 0.56 = **0.44 = 44 %**

Es decir, obtienes un descuento real del 44 %, no del 50 %. Sobre un articulo de $2,000 MXN, la diferencia entre 44 % y 50 % son exactamente $120 MXN.

Esta tabla recoge las combinaciones de descuentos en cadena mas habituales y lo que significan realmente:

| Primer descuento | Segundo descuento | Descuento total real | Lo que crees que es |
|---|---|---|---|
| 10 % | 10 % | 19.0 % | 20 % |
| 20 % | 10 % | 28.0 % | 30 % |
| 20 % | 20 % | 36.0 % | 40 % |
| 30 % | 20 % | 44.0 % | 50 % |
| 40 % | 20 % | 52.0 % | 60 % |
| 50 % | 10 % | 55.0 % | 60 % |

Como puedes ver, siempre hay una diferencia. Cuanto mayores son los descuentos individuales, mayor es la diferencia entre el valor percibido y el real.

Los descuentos en cadena aparecen mucho en liquidaciones de temporada ("ya rebajado un 30 %, descuento adicional de socio 20 %") y en programas de fidelizacion. El vendedor puede comunicarlos como si fueran aditivos, pero matematicamente no lo son.

## Como detectar los precios de referencia inflados

Esta es la trampa mas frecuente del Buen Fin (Mexico), el Black Friday, el Cyber Monday y las rebajas de temporada en general: el precio "tachado" o "precio anterior" es una cifra que nunca fue el precio de venta real, o que estuvo vigente solo durante unos pocos dias para poder poner el cartel de descuento.

Algunas senyales de alerta:

**El precio tachado es exactamente el doble del precio de oferta.** Descuentos del 50 % perfectamente redondos en articulos de electronica son estadisticamente poco probables. Una television que "antes costaba" $10,000 MXN y ahora esta a $5,000 merece verificacion: busca el historial de precios del producto con herramientas como CamelCamelCamel (Amazon) o Keepa.

**El precio de referencia aparece solo unos dias antes de la promocion.** En Mexico, la PROFECO (Procuraduria Federal del Consumidor) establece que el precio de comparacion debe ser el precio habitual de venta, no uno inflado artificialmente. En Colombia, la SIC (Superintendencia de Industria y Comercio) tiene atribuciones similares. Algunos comercios suben el precio semanas antes de una campana para poder mostrar un "descuento mayor" que en realidad no existio. Si el producto estuvo a un precio normal durante meses y subio justo antes del Buen Fin o el Black Friday, el "descuento" es parcialmente ficticio.

**La oferta "termina esta noche" se renueva al dia siguiente.** Los temporizadores de cuenta atras en webs de comercio son una tecnica de presion artificial. Si el descuento "caduca" a medianoche y a las 00:01 vuelve a aparecer el mismo contador, la urgencia es ficticia y el precio de referencia tambien podria serlo.

## El costo de envio y el descuento real neto

Un detalle que se olvida con frecuencia: cuando compras en linea con envio de pago, el ahorro real del descuento hay que calcularlo sobre el costo total de la compra, no solo sobre el precio del producto.

Si un articulo tiene un precio normal de $500 MXN con envio gratuito, y en oferta esta a $380 MXN con $59 MXN de envio, el costo total en oferta es $439 MXN. El ahorro real no es $120 MXN (el 24 % que marca el cartel), sino $61 MXN, que representa un descuento neto del 12.2 % sobre lo que realmente pagas.

Formula del descuento neto con envio:

**descuento_neto% = (precio_normal_total − precio_oferta_total) / precio_normal_total × 100**

Donde precio_normal_total incluye el envio habitual y precio_oferta_total incluye el envio de la oferta.

## El descuento minimo para que compense cambiar de proveedor

Si consideras cambiar a un proveedor mas barato (seguro, servicio de streaming, proveedor de internet), hay un descuento minimo por debajo del cual el cambio no compensa el tiempo y el esfuerzo invertido.

Una regla practica util: si el ahorro anual no supera las 2 horas de tu tiempo a tu salario por hora, el cambio probablemente no merece la pena desde un punto de vista economico puro. Pero si el ahorro supera los $600–$1,200 MXN anuales (o equivalente en tu pais) con un proceso de cambio de 30 minutos, casi siempre compensa hacerlo.

## Calcula cualquier descuento sin errores

Tanto si quieres saber el precio final de una oferta, verificar que descuento real te han aplicado, calcular descuentos en cadena o recuperar el precio original de un articulo, la [calculadora de descuentos](/calculadora-descuento) de Calzix hace todas estas operaciones de forma instantanea.

No vuelvas a fiarte solo del cartel de la oferta. Haz tus propios numeros en segundos y compra siempre sabiendo exactamente cuanto estas ahorrando de verdad.
