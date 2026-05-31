# Estructura SEO Completa para Páginas de Calculadoras

## Nueva Estructura Implementada

Cada página de calculadora ahora debe tener esta estructura SEO completa:

```
1. ¿Qué es? (whatIs) — Explicación de la herramienta
2. ¿Para qué sirve? (whyUse) — Beneficios y casos de uso
3. Calculadora interactiva (componente React)
4. Calculadoras relacionadas (automático)
5. Preguntas frecuentes (FAQs)
```

## Cómo Usar en las Páginas .astro

### Sintaxis Correcta

```astro
---
import CalcLayout from '@/components/layout/CalcLayout.astro';
import MiCalculadoraTool from '@/components/tools/MiCalculadoraTool';
---

<CalcLayout
  slug="mi-calculadora"
  whatIs="Texto que explica qué es la herramienta. Debe ser una descripción clara de 2-3 líneas sobre el concepto."
  whyUse="Texto que explica para qué sirve y qué beneficios tiene. Debe mencionar casos de uso y ventajas."
  faqs={[
    {
      q: '¿Pregunta 1?',
      a: 'Respuesta 1...'
    },
    {
      q: '¿Pregunta 2?',
      a: 'Respuesta 2...'
    },
    // ... más de 5 FAQs totales
  ]}
>
  <MiCalculadoraTool client:load />
</CalcLayout>
```

## Guía para Escribir "¿Qué es?"

- **Longitud:** 150-250 palabras aprox.
- **Contenido:** Explicación clara del concepto, qué significa, cómo funciona
- **Tono:** Educativo, accesible para usuarios sin especialización
- **Estructura:**
  1. Definición breve del concepto
  2. Explicación de cómo funciona
  3. Mención de cómo la calculadora ayuda

**Ejemplo:**
```
"Una hipoteca es un préstamo que solicitas al banco para comprar una vivienda. El banco te presta dinero y tú te comprometes a devolverlo en cuotas mensuales durante un período de tiempo (normalmente 20-30 años), pagando además intereses. Nuestra calculadora te muestra exactamente cuánto pagarás cada mes, el total de intereses y cómo se distribuye el dinero entre capital e intereses."
```

## Guía para Escribir "¿Para qué sirve?"

- **Longitud:** 150-250 palabras aprox.
- **Contenido:** Beneficios prácticos, casos de uso, por qué es importante
- **Tono:** Motivacional, práctico, orientado al usuario
- **Estructura:**
  1. Por qué es importante entender este concepto
  2. Casos de uso comunes
  3. Cómo esta herramienta ayuda específicamente

**Ejemplo:**
```
"Comprender los detalles de tu hipoteca es fundamental antes de solicitarla. Saber cuál será la cuota mensual, cuánto pagarás en total y cómo cambian los intereses a lo largo del tiempo te ayuda a tomar una decisión financiera inteligente. Esta herramienta te permite simular diferentes escenarios: cambiar el plazo, la cantidad prestada o la tasa de interés para encontrar la opción que mejor se adapte a tu presupuesto."
```

## FAQs (Preguntas Frecuentes)

- **Mínimo:** 5 FAQs por página
- **Máximo:** 10 FAQs
- **Contenido:** Preguntas y respuestas técnicas sobre cómo usar la calculadora o entender el concepto
- **Estructura de cada FAQ:**
  - `q`: Pregunta en formato natural (¿Cómo...?, ¿Qué..., ¿Por qué...?)
  - `a`: Respuesta completa y clara en 2-4 oraciones

## Páginas Ya Actualizadas (Plantillas)

- ✅ `src/pages/calculadora-porcentaje.astro` — Ejemplo completo
- ✅ `src/pages/calculadora-hipoteca.astro` — Ejemplo completo

## Cómo Completar el Resto

Para actualizar todas las 180 calculadoras:

1. **Paso 1:** Leer la página actual
2. **Paso 2:** Extraer las FAQs existentes
3. **Paso 3:** Escribir "¿Qué es?" basándose en `longDescription` en calcs.ts
4. **Paso 4:** Escribir "¿Para qué sirve?" basándose en el uso práctico
5. **Paso 5:** Agregar los parámetros `whatIs` y `whyUse` al `<CalcLayout>`

## Ejemplo de Conversión

### ANTES:
```astro
<CalcLayout slug="mi-calculadora" faqs={[...]}>
  <MiCalculadoraTool client:load />
</CalcLayout>
```

### DESPUÉS:
```astro
<CalcLayout
  slug="mi-calculadora"
  whatIs="..."
  whyUse="..."
  faqs={[...]}
>
  <MiCalculadoraTool client:load />
</CalcLayout>
```

## Beneficios SEO de Esta Estructura

1. **Explicación clara** para Google de qué trata la página
2. **Contenido único** diferenciado de otras calculadoras
3. **Palabras clave naturales** en contexto educativo
4. **Señales de calidad** de contenido completo y detallado
5. **Mejor UX** con navegación clara: ¿Qué es? → Para qué sirve → Herramienta → Preguntas

## Validación

Cada página debe pasar estas comprobaciones:

- [ ] Tiene sección "¿Qué es?" con 150+ palabras
- [ ] Tiene sección "¿Para qué sirve?" con 150+ palabras
- [ ] Tiene 5+ FAQs con preguntas naturales
- [ ] La calculadora se carga correctamente
- [ ] Build completa sin errores (`npm run build`)
