# Resumen de SEO Faltante

## Problema Identificado

**2 Categorías de páginas:**

### Categoría 1: Páginas CON SEO completo (2/180)
- ✅ `calculadora-porcentaje.astro` - whatIs + whyUse completo
- ✅ `calculadora-hipoteca.astro` - whatIs + whyUse completo

### Categoría 2: Páginas SIN SEO (178/180)
- ❌ Todas las demás 178 calculadoras
  - Tienen: H1 + descripción + calculadora + FAQs
  - Faltan: `whatIs` y `whyUse` props en CalcLayout

---

## Ejemplo de Página SIN SEO (Actual)

```astro
<CalcLayout slug="calculadora-imc" faqs={[
  { q: '¿Qué es IMC?', a: '...' },
  { q: '¿Cómo se calcula?', a: '...' },
]}>
  <ImcTool client:load />
</CalcLayout>
```

## Ejemplo de Página CON SEO (Objetivo)

```astro
<CalcLayout
  slug="calculadora-imc"
  whatIs="El IMC (Índice de Masa Corporal) es una medida que relaciona tu peso con tu altura para evaluar si tienes un peso saludable. Se calcula dividiendo el peso en kilogramos entre la altura en metros al cuadrado..."
  whyUse="Conocer tu IMC es importante para mantener la salud. Te ayuda a identificar si tu peso actual es saludable para tu altura y edad..."
  faqs={[
    { q: '¿Qué es IMC?', a: '...' },
    { q: '¿Cómo se calcula?', a: '...' },
  ]}
>
  <ImcTool client:load />
</CalcLayout>
```

---

## Qué Debe Hacerse

### PASO 1: Revisar qué páginas no tienen SEO
Revisar cada archivo `.astro` en `src/pages/` para verificar cuáles NO tienen los props `whatIs` y `whyUse` en `<CalcLayout>`

### PASO 2: Generar descripciones para TODAS
Para cada una de las 178 páginas faltantes:
- Crear descripción `whatIs` (150-250 palabras) explicando qué es la herramienta
- Crear descripción `whyUse` (150-250 palabras) explicando para qué sirve y beneficios

### PASO 3: Agregar a cada página
Actualizar cada página `.astro` para incluir los props en `<CalcLayout>`

### PASO 4: Compilar y validar
```bash
npm run build
```

---

## Estructura de whatIs (150-250 palabras)

**Estructura recomendada:**
1. Definición clara del concepto
2. Cómo funciona o qué es
3. Por qué es importante
4. Cómo la herramienta ayuda

**Ejemplo:**
> "El IMC (Índice de Masa Corporal) es una medida que relaciona tu peso con tu altura para evaluar si tienes un peso saludable. Se calcula dividiendo el peso en kilogramos entre la altura en metros al cuadrado. El resultado te ubica en categorías: peso insuficiente, peso normal, sobrepeso u obesidad. Es una herramienta simple de usar pero debe complementarse con evaluaciones médicas profesionales."

---

## Estructura de whyUse (150-250 palabras)

**Estructura recomendada:**
1. Situaciones donde lo necesitas
2. Beneficios prácticos
3. Casos de uso específicos
4. Cómo la herramienta te ayuda

**Ejemplo:**
> "Conocer tu IMC es importante para mantener la salud. Te ayuda a identificar si tu peso actual es saludable para tu altura y edad. Muchas personas usan esta calculadora como punto de partida para cambios en su estilo de vida, dieta o rutina de ejercicio. Sin embargo, recuerda que el IMC es solo un indicador y no reemplaza el consejo médico profesional."

---

## Prioridad

### URGENTE (mostradas en user):
- Revisar TODAS las 180 páginas
- Completar aquellas que tienen SEO incompleto o distorsionado
- Generar SEO para las 178 faltantes

### Estimado de tiempo:
- Si se automática (script): 1-2 horas
- Si se manual (copiar/pegar): 8-10 horas

---

## Checklist Final

- [ ] Revisar todas las 180 páginas `.astro`
- [ ] Identificar cuáles faltan `whatIs` y `whyUse`
- [ ] Generar descripciones de calidad para CADA una
- [ ] Agregar props a `<CalcLayout>` en cada página
- [ ] Ejecutar `npm run build` sin errores
- [ ] Verificar visualmente 5-10 páginas en navegador
- [ ] Confirmar que el SEO aparece en el orden correcto:
  - H1
  - Calculadora
  - Relacionadas
  - ¿Qué es?
  - ¿Para qué sirve?
  - FAQs
