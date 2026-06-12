---
titulo: "Como calcular la liquidacion laboral en LATAM: Mexico, Colombia y Chile"
descripcion: "Formula completa para calcular la liquidacion o finiquito en Mexico (90 dias + 20 dias/ano), Colombia (cesantias, prima, vacaciones) y Chile (mes por ano). Con ejemplos reales."
categoria: "finanzas"
fecha: "2026-06-07"
modificado: "2026-06-12"
keywords:
  - "calcular liquidacion Mexico"
  - "finiquito Colombia cesantias"
  - "liquidacion laboral Chile"
  - "indemnizacion despido LATAM"
  - "calculo finiquito"
  - "vacaciones pendientes liquidacion"
  - "como calcular finiquito"
autor: "Equipo Calzix"
publicado: true
---

Cuando una relacion laboral termina — por despido, renuncia, vencimiento de contrato o mutuo acuerdo — el trabajador tiene derecho a una liquidacion que recoge todas las prestaciones pendientes. En LATAM las reglas varian significativamente entre paises. Esta guia te explica como calcular la liquidacion en Mexico, Colombia y Chile con formulas y ejemplos numericos reales.

## Que incluye una liquidacion laboral (componentes comunes)

Independientemente del pais, una liquidacion laboral tiene dos grandes bloques:

1. **Partes proporcionales**: lo que te deben del periodo trabajado y no cobrado (dias de salario, vacaciones no disfrutadas, aguinaldo/prima proporcional, etc.)
2. **Indemnizacion**: cantidad adicional que la ley exige pagar en ciertos tipos de terminacion (despido sin causa justificada). No aplica cuando el trabajador renuncia voluntariamente.

---

## Mexico: liquidacion por despido injustificado

En Mexico, la **Ley Federal del Trabajo (LFT)** establece que el despido sin causa justificada genera derecho a dos tipos de pago: la liquidacion propiamente dicha y las partes proporcionales de fin de relacion.

### Componentes de la liquidacion mexicana

**1. Indemnizacion constitucional (3 meses):**
Tres meses de salario integrado. El **salario integrado** incluye el salario diario ordinario mas las partes proporcionales de prestaciones: aguinaldo, vacaciones y prima vacacional.

Formula del salario diario integrado (SDI):
```
SDI = Salario diario + (Aguinaldo/365) + (Vacaciones × Prima vacacional / 365)
```

Ejemplo con salario de $15,000 MXN mensuales, 15 dias de aguinaldo, 12 dias de vacaciones y 25 % de prima vacacional:
- Salario diario = $15,000 / 30 = $500
- Parte proporcional aguinaldo = (15 × $500) / 365 = $20.55/dia
- Parte proporcional vacaciones = (12 × $500 × 0.25) / 365 = $4.11/dia
- SDI = $500 + $20.55 + $4.11 = **$524.66/dia**
- 3 meses = 90 dias × $524.66 = **$47,219**

**2. Veinte dias por ano trabajado:**
Adicionalmente, 20 dias de salario integrado por cada ano completo trabajado.

Ejemplo con 3 anos de antiguedad:
20 dias × $524.66 × 3 anos = **$31,480**

**3. Prima de antiguedad (12 dias por ano, topada a 2 SMG):**
12 dias de salario por ano trabajado, con un tope de 2 salarios minimos generales diarios. Esta prestacion aplica tanto a despido como a renuncia voluntaria despues de 15 anos.

**4. Partes proporcionales (aplican en cualquier terminacion, incluida renuncia):**
- Aguinaldo proporcional: (15 dias / 365) × dias trabajados en el ano × salario diario
- Prima vacacional proporcional: (dias_vacaciones × 0.25 / 365) × dias trabajados
- Vacaciones no disfrutadas: dias_vacaciones_devengadas - dias_tomados × salario diario

### Resumen: que corresponde segun el motivo de la terminacion

| Componente | Renuncia voluntaria | Despido justificado | Despido injustificado |
|---|---|---|---|
| Partes proporcionales | Si | Si | Si |
| 3 meses de salario integrado | No | No | Si |
| 20 dias × ano | No | No | Si |
| Prima de antiguedad | Solo si > 15 anos | Si | Si |

---

## Colombia: liquidacion de prestaciones sociales

En Colombia la terminacion del contrato genera la obligacion de pagar las **prestaciones sociales pendientes** mas la **indemnizacion** si el despido es sin justa causa.

### Prestaciones sociales a liquidar

**1. Cesantias**
Un mes de salario por cada ano trabajado (o proporcional):
```
Cesantias = Salario mensual × dias_trabajados / 360
```

Si el trabajador gano $3,200,000 COP y trabajo 8 meses (240 dias):
Cesantias = $3,200,000 × 240 / 360 = **$2,133,333 COP**

**2. Intereses sobre cesantias**
12 % anual sobre el saldo de cesantias acumulado al 31 de diciembre o al corte:
Intereses = Cesantias × 0.12 × dias_del_periodo / 360

**3. Prima de servicios**
15 dias de salario por semestre (30 dias al ano), proporcional:
Prima = Salario mensual × dias_trabajados / 360

Con el mismo ejemplo de 8 meses: Prima = $3,200,000 × 240 / 360 = **$2,133,333 COP**

**4. Vacaciones pendientes**
15 dias habiles por ano, proporcional al tiempo trabajado:
Vacaciones = (Salario mensual / 30) × 15 × anos_trabajados

**5. Indemnizacion por despido sin justa causa (contratos a termino indefinido)**
- Salarios hasta 10 SMLMV: 30 dias de salario por el primer ano + 20 dias por cada ano adicional
- Salarios superiores a 10 SMLMV: 20 dias de salario por el primer ano + 15 dias por cada ano adicional

### Ejemplo completo Colombia

Empleado con 2 anos y 4 meses de servicio, salario de $3,500,000 COP, despedido sin justa causa:

| Concepto | Calculo | Valor |
|---|---|---|
| Cesantias (28 meses) | $3.5M × 840/360 | $8,166,667 |
| Intereses cesantias | $8.16M × 12 % × 120/360 | $326,667 |
| Prima servicios | $3.5M × 840/360 | $8,166,667 |
| Vacaciones pendientes | ~14 dias habiles | $1,633,333 |
| Indemnizacion (30 d + 20 d × 1 ano adicional) | 50 dias × $116,667 | $5,833,333 |
| **Total bruto** | | **$24,126,667 COP** |

---

## Chile: finiquito laboral

En Chile el **finiquito** es el documento legal que formaliza la terminacion del contrato. Debe firmarse ante notario o inspector del trabajo para ser valido.

### Componentes del finiquito chileno

**1. Remuneraciones pendientes**
Dias del mes en curso trabajados y no cobrados:
Salario pendiente = (Sueldo mensual / dias del mes) × dias trabajados no pagados

**2. Vacaciones proporcionales no disfrutadas**
La ley chilena otorga 15 dias habiles de vacaciones por ano trabajado, proporcionales al tiempo en la empresa actual:
Dias vacaciones = 15 × meses_trabajados / 12
Valor = (Sueldo mensual / 30) × dias_vacaciones

**3. Gratificacion proporcional**
Si la empresa paga gratificacion mensual garantizada (el 25 % del sueldo mensual topado a 4.75 IMM), ya esta incluida. Si paga la gratificacion anual del 30 % de las utilidades al final del ejercicio, corresponde la parte proporcional del periodo.

**4. Indemnizacion por anos de servicio (si aplica)**
Solo se paga cuando la causal de despido es "necesidades de la empresa" (articulo 161 del Codigo del Trabajo):
- 1 mes de ultimo sueldo por cada ano de servicio y fraccion superior a 6 meses
- Maximo: 11 meses
- La indemnizacion sustitutiva del aviso previo es 1 mes adicional si no se dio el mes de aviso

**Causales que NO dan derecho a indemnizacion por anos de servicio:**
- Renuncia voluntaria
- Mutuo acuerdo con finiquito que especifica la causal
- Termino del contrato a plazo fijo o por obra o faena

### Ejemplo finiquito Chile

Trabajadora con 3 anos y 4 meses de servicio, sueldo $1,200,000 CLP, despedida por necesidades de la empresa (Art. 161), sin aviso previo:

| Concepto | Calculo | Valor |
|---|---|---|
| Remuneracion pendiente (15 dias) | $1.2M / 30 × 15 | $600,000 |
| Vacaciones pendientes (8.3 dias) | $1.2M / 30 × 8.3 | $332,000 |
| Indemnizacion anos servicio (3 meses) | $1.2M × 3 | $3,600,000 |
| Indemnizacion sustitutiva aviso previo | $1,200,000 | $1,200,000 |
| **Total bruto finiquito** | | **$5,732,000 CLP** |

---

## Peru y Argentina: referencia rapida

**Peru:** la liquidacion incluye CTS (Compensacion por Tiempo de Servicios, depositada semestral en una cuenta bancaria del trabajador), vacaciones no tomadas (30 dias naturales por ano), gratificaciones proporcionales (julio y diciembre, cada una equivale a un mes de sueldo), y utilidades si la empresa tiene mas de 20 trabajadores. La indemnizacion por despido arbitrario es 1.5 remuneraciones ordinarias por mes calendario dejado de laborar hasta 12 remuneraciones.

**Argentina:** la indemnizacion por despido sin causa (Art. 245 LCT) equivale a 1 mes de salario por ano o fraccion mayor a 3 meses trabajados, con un minimo de 2 meses de salario, tope en 3 veces el promedio del convenio colectivo aplicable. Ademas corresponde: integracion del mes de despido, preaviso (1 mes si tiene mas de 5 anos, 2 meses si tiene mas), SAC (aguinaldo) proporcional y vacaciones proporcionales.

---

## Errores frecuentes al revisar la liquidacion

**No revisar el salario integrado usado.** En Mexico, si el empleador usa el salario base en lugar del salario integrado, la liquidacion queda subcalculada. Verifica que incluya la parte proporcional de todas las prestaciones.

**Aceptar sin revisar.** En todos los paises de LATAM puedes firmar el finiquito o liquidacion con la leyenda "no conforme" o "bajo protesta", lo que te permite cobrar el monto y reclamar la diferencia ante la autoridad laboral. No firmar significa no cobrar, firmar sin reserva generalmente cierra la posibilidad de reclamar.

**Confundir renuncia con despido.** Si renuncias, en Mexico y Colombia no tienes derecho a la indemnizacion. Si la empresa te presiona a renunciar, eso se llama despido encubierto y puede impugnarse.

---

## Calcula tu liquidacion sin errores

Usa la **[calculadora de finiquito](/finiquito)** de Calzix para Mexico: introduce tu salario, antiguedad, dias de aguinaldo y vacaciones, y obtendras el desglose completo de lo que te corresponde segun la LFT.

Tomarte 10 minutos para revisar la liquidacion antes de firmar puede significar la diferencia de varios meses de salario. Las autoridades laborales — PROFEDET en Mexico, Ministerio del Trabajo en Colombia, Inspeccion del Trabajo en Chile — atienden gratuitamente consultas y reclamaciones laborales.
