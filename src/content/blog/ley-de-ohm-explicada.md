---
titulo: "Ley de Ohm: qué es, fórmula y cómo calcular voltaje, corriente y resistencia"
descripcion: "La ley de Ohm explicada con claridad: fórmula V=IR, las tres variantes, analogía del agua, tabla de resistencias domésticas y cálculo de potencia eléctrica."
categoria: "tutoriales"
fecha: "2026-06-07"
modificado: "2026-06-12"
keywords:
  - "ley de Ohm"
  - "fórmula ley de Ohm"
  - "voltaje corriente resistencia"
  - "V igual I por R"
  - "potencia eléctrica"
  - "calcular resistencia"
  - "electricidad básica"
  - "ohmio amperio voltio"
autor: "Equipo Calzix"
publicado: true
---

Cada vez que enchufas un cargador, enciendes una bombilla o pones el secador de pelo, hay una ley física que determina exactamente cuánta corriente fluye por ese cable y cuánta energía se consume. Esa ley, formulada por el físico alemán Georg Simon Ohm en 1827, es una de las piedras angulares de la electricidad y la electrónica, y se puede resumir en tres letras: **V = I × R**.

Comprender la **ley de Ohm** no requiere ser ingeniero. Con un poco de claridad sobre las tres magnitudes que relaciona — voltaje, corriente e intensidad — puedes entender cómo funciona cualquier circuito eléctrico, elegir el fusible correcto para un circuito doméstico o simplemente saber por qué el secador calienta más que el cargador del móvil.

## Qué miden voltaje, corriente y resistencia

Antes de entrar en la fórmula, aclaremos las tres magnitudes. La analogía más útil es la del agua en una tubería:

| Magnitud eléctrica | Símbolo | Unidad | Analogía con el agua |
|---|---|---|---|
| **Voltaje** (tensión) | V | Voltio (V) | Presión del agua en la tubería |
| **Corriente** (intensidad) | I | Amperio (A) | Caudal de agua que fluye |
| **Resistencia** | R | Ohmio (Ω) | Estrechamiento de la tubería |

Imagina una tubería conectada a un depósito elevado:
- La **presión** (altura del depósito) equivale al voltaje: cuanta más presión, más tendencia a fluir.
- El **caudal** (litros por segundo) equivale a la intensidad: cuánta electricidad pasa en cada instante.
- El **estrechamiento** de la tubería equivale a la resistencia: cuanto más estrecha, menos caudal pasa a igual presión.

Si aumentas la presión manteniendo el mismo tubo, fluye más agua. Si estrechas el tubo manteniendo la misma presión, fluye menos. La ley de Ohm funciona exactamente igual con la electricidad.

---

## La fórmula de la ley de Ohm y sus tres variantes

La ley de Ohm establece que la intensidad que circula por un conductor es **directamente proporcional al voltaje** aplicado e **inversamente proporcional a la resistencia**:

```
V = I × R
```

De esta ecuación se derivan otras dos, según la magnitud que necesites calcular:

```
I = V / R    →  Para calcular la corriente (amperios)
R = V / I    →  Para calcular la resistencia (ohmios)
```

### El triángulo mnemotécnico VIR

Un recurso clásico para recordar las tres variantes es el **triángulo VIR**: escribe V arriba, I abajo a la izquierda y R abajo a la derecha. Para obtener cualquier magnitud, tapa la letra que buscas y lee la operación que queda:

- Tapas V → I × R
- Tapas I → V / R
- Tapas R → V / I

---

## Ejemplos resueltos paso a paso

### Ejemplo 1: calcular la corriente de un dispositivo

Una bombilla conectada a 120 V tiene una resistencia de 144 Ω. ¿Cuánta corriente consume?

```
I = V / R = 120 / 144 ≈ 0,833 A
```

La bombilla consume **0,833 amperios**. A 120 V, eso equivale a una potencia de 100 W (0,833 × 120 = 100 W).

### Ejemplo 2: calcular la resistencia de un cargador

Un cargador de móvil trabaja a 5 V y suministra 1 A de corriente. ¿Cuál es su resistencia de carga?

```
R = V / I = 5 / 1 = 5 Ω
```

La resistencia del circuito de carga es **5 ohmios**. Es una resistencia baja porque trabaja a muy bajo voltaje.

### Ejemplo 3: calcular el voltaje necesario

Quieres hacer circular 2 A a través de una resistencia de 15 Ω. ¿Qué voltaje necesitas aplicar?

```
V = I × R = 2 × 15 = 30 V
```

Necesitas **30 voltios** para conseguir 2 amperios a través de esa resistencia.

---

## Tabla de resistencias en aparatos domésticos habituales

Esta tabla muestra la resistencia aproximada de varios electrodomésticos cotidianos. Los valores de corriente y resistencia varían según el voltaje de red de tu país: **120 V** (México, Colombia, Venezuela, Centroamérica) o **220 V** (Chile, Perú, Argentina, Bolivia, Uruguay).

**A 120 V** — aplica en México y Colombia:

| Aparato | Potencia | Corriente (I = P/120) | Resistencia (R = 120/I) |
|---|---|---|---|
| Bombilla LED 10 W | 10 W | 0,083 A | 1.440 Ω |
| Bombilla incandescente 100 W | 100 W | 0,833 A | 144 Ω |
| Refrigerador / nevera | 150 W | 1,25 A | 96 Ω |
| Televisor 55" | 100 W | 0,833 A | 144 Ω |
| Laptop (cargador) | 65 W | 0,54 A | 222 Ω |
| Lavadora (ciclo normal) | 2.000 W | 16,67 A | 7,2 Ω |
| Secador de pelo | 1.500 W | 12,50 A | 9,6 Ω |
| Horno eléctrico | 2.500 W | 20,83 A | 5,76 Ω |

**A 220 V** — aplica en Chile, Perú, Argentina:

| Aparato | Potencia | Corriente (I = P/220) | Resistencia (R = 220/I) |
|---|---|---|---|
| Bombilla LED 10 W | 10 W | 0,045 A | 4.840 Ω |
| Bombilla incandescente 100 W | 100 W | 0,455 A | 484 Ω |
| Refrigerador / nevera | 150 W | 0,68 A | 323 Ω |
| Televisor 55" | 100 W | 0,455 A | 484 Ω |
| Laptop (cargador) | 65 W | 0,30 A | 740 Ω |
| Lavadora (ciclo normal) | 2.000 W | 9,09 A | 24,2 Ω |
| Secador de pelo | 2.000 W | 9,09 A | 24,2 Ω |
| Horno eléctrico | 2.500 W | 11,36 A | 19,4 Ω |

Observa por qué los circuitos de 120 V requieren cables de mayor sección para la misma potencia: al tener menor voltaje, la corriente es mayor, y a mayor corriente se necesita un conductor más grueso para no sobrecalentarse.

---

## Potencia eléctrica: la cuarta magnitud

La **potencia eléctrica** (P) mide cuánta energía consume un dispositivo por unidad de tiempo. Se mide en vatios (W) y se relaciona con voltaje e intensidad así:

```
P = V × I
```

Combinando con la ley de Ohm (V = I × R y I = V / R), obtenemos tres formas equivalentes de calcular la potencia:

```
P = V × I          →  la más directa
P = I² × R         →  útil cuando conoces I y R
P = V² / R         →  útil cuando conoces V y R
```

**Ejemplo:** un secador de 2.000 W conectado a 220 V (Chile, Perú, Argentina).

- Corriente: I = P / V = 2.000 / 220 ≈ **9,09 A**
- Resistencia del elemento calefactor: R = V / I = 220 / 9,09 ≈ **24,2 Ω**
- Verificación: P = I² × R = 9,09² × 24,2 ≈ 82,6 × 24,2 ≈ **1.999 W** (correcto)

El mismo secador a 120 V (México, Colombia) requeriría casi el doble de corriente (16,67 A) para la misma potencia, de ahí que el calibre del cableado eléctrico sea diferente en ambos sistemas.

---

## Cómo elegir el fusible correcto para un circuito

Uno de los usos más prácticos de la ley de Ohm en el hogar es dimensionar correctamente la protección eléctrica de un circuito. Los fusibles y los interruptores magnetotérmicos se seleccionan en función de la **corriente máxima** que debe soportar el circuito.

**Regla práctica:**

1. Suma la potencia de todos los aparatos que pueden estar conectados al mismo circuito simultáneamente.
2. Divide entre el voltaje de red de tu país (120 V en México y Colombia; 220 V en Chile, Perú, Argentina) para obtener la corriente máxima.
3. Elige un magnetotérmico o breaker con un valor de disparo inmediatamente superior.

**Ejemplo en México (120 V):** un circuito de cocina con horno (2.500 W) + campana extractora (200 W) + pequeños electrodomésticos (500 W):

```
Potencia total = 2.500 + 200 + 500 = 3.200 W
Corriente a 120 V = 3.200 / 120 ≈ 26,7 A
```

Se debe instalar un breaker de **30 A**. Con 120 V la corriente es el doble que con 220 V para la misma potencia — por eso los circuitos de alta potencia en México (A/C, cocina) requieren cableado calibre mayor y breakers de mayor amperaje.

**El mismo circuito en Chile (220 V):**

```
Corriente a 220 V = 3.200 / 220 ≈ 14,5 A → breaker de 16 A
```

---

## Limitaciones de la ley de Ohm

La ley de Ohm es una herramienta poderosa, pero tiene sus límites. Funciona bien en **resistencias puras** — elementos en los que la resistencia no varía con la corriente ni con la temperatura. En la práctica, hay situaciones donde la ley no aplica directamente:

**Componentes no óhmicos:** los diodos, los transistores y los LEDs no tienen una relación lineal entre voltaje y corriente. La ley de Ohm no predice su comportamiento con precisión.

**Corriente alterna con bobinas y condensadores:** en circuitos de corriente alterna (como los de tu casa), las bobinas y los condensadores presentan **reactancia** — una resistencia aparente que depende de la frecuencia de la corriente. En estos casos, la magnitud que sustituye a la resistencia se llama **impedancia** (Z), y la ley generalizada es V = I × Z.

**Temperaturas extremas:** la resistencia de los conductores metálicos aumenta con la temperatura. Un filamento de tungsteno frío tiene mucha menos resistencia que cuando está al rojo vivo — por eso al encender una bombilla incandescente se produce un pico de corriente inicial.

**Semiconductores:** materiales como el silicio se comportan de forma compleja y no lineal. Sin embargo, en circuitos de electrónica digital, los diseñadores modelan bloques funcionales usando versiones simplificadas de la ley de Ohm.

---

## Calcula voltaje, corriente y resistencia al instante

Si tienes los valores y quieres el resultado sin hacer los cálculos a mano, nuestra **[calculadora de la ley de Ohm](/ley-ohm)** despeja cualquiera de las tres magnitudes automáticamente. Y si también necesitas saber cuántos vatios consume un circuito, usa la **[calculadora de potencia eléctrica](/potencia-electrica)** para obtener la respuesta en segundos.
