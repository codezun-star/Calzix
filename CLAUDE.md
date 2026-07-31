# Calzix — Contexto del proyecto para Claude

## Descripción general

**Calzix** es una plataforma web de calculadoras online gratuitas.
- Dominio: https://calzix.com
- Carpeta: `C:\Users\Jose\calzix`
- Todos los cálculos se realizan 100% en el navegador. Sin backend, sin base de datos, sin autenticación.
- Contacto público: `codezun@gmail.com`

---

## Regla obligatoria: checklist al añadir una calculadora nueva

1. Añadir entrada en `src/lib/constants/calcs.ts` — objeto `CalcMeta` con `domain` correcto.
2. Añadir entrada en `src/lib/constants/seo.ts` — título, descripción y canonical.
3. Añadir el componente `src/components/tools/NombreCalcTool.tsx`.
4. Añadir la página `src/pages/slug.astro` con al menos 5 `faqs`.
5. Registrar los iconos Lucide nuevos en `src/components/ui/CalcCard.tsx` (import + ICONS record).
6. Actualizar el contador de páginas en la sección "Comandos" de este CLAUDE.md.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Astro 6 (`output: "static"`) |
| UI interactiva | React 19 (islands con `client:load`) |
| Lenguaje | TypeScript estricto — sin `any` |
| Estilos | Tailwind CSS v4 (vía `@tailwindcss/vite`, sin `tailwind.config.js`) |
| Iconos | Lucide React exclusivamente — cero emojis en la UI |
| Deploy | Cloudflare Pages (`@astrojs/cloudflare` adapter) |
| SEO | `@astrojs/sitemap` (sitemap automático) |

---

## Estructura de carpetas

```
calzix/
├── src/
│   ├── pages/                   # Páginas Astro (una por calculadora + legales)
│   │   ├── index.astro          # Homepage con tabs por dominio
│   │   ├── privacidad.astro / terminos.astro / cookies.astro
│   │   └── aviso-legal.astro / contacto.astro
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro          # Nav: Inicio + 5 categorías
│   │   │   ├── Footer.astro          # Links por categoría
│   │   │   ├── CalcLayout.astro      # Wrapper: SEO + breadcrumb + relacionadas + FAQs
│   │   │   └── LegalLayout.astro     # Wrapper páginas legales
│   │   ├── tools/               # Un componente React por calculadora
│   │   └── ui/
│   │       ├── HomeCalcs.tsx    # Tabs del home (finanzas/salud/matematicas/conversion/fecha)
│   │       └── CalcCard.tsx     # Card del home (registra iconos Lucide)
│   ├── lib/
│   │   ├── utils/
│   │   │   ├── format.ts        # formatNumber(), formatCurrency(), formatPercent(), formatScientific()
│   │   │   └── download.ts      # triggerDownload(), downloadText(), downloadCsv()
│   │   └── constants/
│   │       ├── calcs.ts         # Metadata de las calculadoras — CalcMeta + CalcDomain
│   │       └── seo.ts           # Títulos, descriptions, canonicals + SITE object
│   └── styles/
│       └── global.css           # @import "tailwindcss" + @theme con tokens de diseño
├── public/
│   ├── favicon.svg / robots.txt
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Los 9 dominios de UI

La navegación del home tiene **dos niveles**: 9 grupos (barra superior) y 48 categorías específicas (barra inferior, filtra por grupo activo).

| Grupo | CalcDomains que contiene |
|---|---|
| Matemáticas | `matematicas-basicas`, `algebra`, `geometria`, `estadistica`, `trigonometria`, `probabilidad` |
| Ciencias | `fisica`, `quimica` |
| Conversión | `longitud`, `peso`, `temperatura`, `velocidad`, `area`, `volumen`, `energia`, `presion`, `tiempo`, `datos`, `angulos`, `monedas` |
| Hogar | `construccion`, `pintura`, `electricidad`, `hipoteca`, `consumo`, `jardin` |
| Trabajo | `facturacion`, `descuentos`, `nomina`, `productividad`, `propinas` |
| Educación | `notas`, `becas`, `estudio`, `lectura` |
| Viaje | `combustible`, `distancia`, `zonas`, `equipaje`, `coste-viaje` |
| Naturaleza | `carbono`, `agua`, `solar`, `reciclaje` |
| Ocio | `amor`, `suerte`, `numerologia`, `sueno` |

El campo `domain` de `CalcMeta` usa el slug de la categoría específica (p.ej. `'geometria'`), no el grupo.

---

## Sistema de diseño

Tokens en `src/styles/global.css` con `@theme {}` de Tailwind v4.
Paleta verde-blanquiza animada:

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#F0FAF4` | Fondo general verde-blanquizo |
| `--color-surface` | `#FFFFFF` | Cards, paneles |
| `--color-border` | `#B8DAC7` | Bordes |
| `--color-text` | `#0D2118` | Texto principal |
| `--color-text-secondary` | `#35664A` | Texto secundario |
| `--color-text-muted` | `#7AAE90` | Placeholders |
| `--color-accent` | `#18A357` | Acento esmeralda — tabs activos, CTAs |
| `--color-accent-hover` | `#13894A` | Hover del acento |
| `--color-accent-bg` | `#DCF7E9` | Fondo hover suave |
| `--color-calcs-bg` | `#E4F7ED` | Fondo sección calculadoras |
| `--color-calcs-border` | `#A8CEBC` | Bordes de cards |
| `--color-calcs-icon` | `#239658` | Iconos en CalcCard |

---

## Reglas de código

### Reglas absolutas

1. **Sin `any` en TypeScript.** Siempre tipar correctamente.
2. **Sin emojis en la interfaz.** Solo iconos de Lucide React.
3. **Errores con mensajes en español** visibles al usuario.
4. **Cada calculadora es un componente React independiente** en `src/components/tools/`. Se monta con `client:load`.
5. **`formatNumber()`, `formatCurrency()`, `formatPercent()`** solo desde `src/lib/utils/format.ts`.
6. **`triggerDownload()` / `downloadText()` / `downloadCsv()`** solo desde `src/lib/utils/download.ts`.
7. **Todas las URLs sin trailing slash.** Nunca crear rutas ni enlaces con `/` al final. El sitio usa `trailingSlash: 'never'` en `astro.config.mjs` y `build.format: 'file'` (genera `page.html`, no `page/index.html`). Cloudflare Pages redirige automáticamente `/page/` → `/page` (301) vía `public/_redirects`. Cualquier enlace interno con slash final romperá el canonical y generará un redirect innecesario.

### Patrón estándar de calculadora

```tsx
// src/components/tools/MiCalculadoraTool.tsx
import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

export default function MiCalculadoraTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(input);
      if (isNaN(n)) throw new Error('Introduce un número válido.');
      setResult(/* lógica */);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      {/* inputs */}
      {/* botón */}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <span className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result)}</span>
        </div>
      )}
    </div>
  );
}
```

### Patrón de página de calculadora

```astro
---
// src/pages/mi-calculadora.astro
import CalcLayout from '@/components/layout/CalcLayout.astro';
import MiCalculadoraTool from '@/components/tools/MiCalculadoraTool';
---

<CalcLayout slug="mi-calculadora" faqs={[
  { q: '¿Qué es X?', a: 'Explicación clara...' },
  { q: '¿Cómo se usa?', a: 'Instrucciones...' },
  // mínimo 5 FAQs para generar JSON-LD FAQPage
]}>
  <MiCalculadoraTool client:load />
</CalcLayout>
```

### CalcMeta — campos obligatorios

```ts
{
  slug: 'mi-calculadora',           // URL: /mi-calculadora
  name: 'Mi Calculadora',
  description: 'Una línea para la card del home.',
  longDescription: 'Párrafo descriptivo para la cabecera de la página.',
  category: 'Finanzas',             // texto legible, para el breadcrumb
  domain: 'finanzas',              // filtra en qué tab del home aparece
  icon: 'TrendingUp',              // nombre de icono Lucide registrado en CalcCard.tsx
  related: ['otra-calc', 'otra'],  // slugs de calculadoras relacionadas
}
```

### Uso de `crypto` para resultados aleatorios

Si una calculadora genera valores aleatorios (simulaciones, muestras…): usar `crypto.getRandomValues()` nunca `Math.random()`.

### Conversión de unidades — patrón base unit

```ts
const units = {
  kg: { toBase: (v: number) => v,          fromBase: (v: number) => v },
  lb: { toBase: (v: number) => v * 0.4536, fromBase: (v: number) => v / 0.4536 },
};
// Conversión: units[to].fromBase(units[from].toBase(value))
```

---

## SEO — cómo funciona

`CalcLayout.astro` lee `PAGE_SEO[slug]` y `CALCS.find(c => c.slug === slug)` y genera automáticamente:
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- OpenGraph y Twitter Card
- JSON-LD `WebApplication` schema
- JSON-LD `FAQPage` schema (si se pasan `faqs`)

`LegalLayout.astro` añade `noindex, follow` automáticamente.

---

## AEO — optimización para motores de respuesta

El sitio está preparado para ser citado por ChatGPT, Perplexity, Claude, Google AI Overviews y asistentes similares.

| Pieza | Dónde vive | Notas |
|---|---|---|
| `llms.txt` | `src/pages/llms.txt.ts` | Endpoint estático. Se **genera en cada build** desde `CALCS` y la colección `blog`: nunca hay que mantenerlo a mano. URL: `https://calzix.com/llms.txt` |
| Reglas para bots de IA | `public/robots.txt` | `Allow: /` explícito para GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot y otros |
| JSON-LD unificado | `CalcLayout.astro` | Un solo `@graph` con `Organization`, `WebSite`, `WebPage`, `WebApplication`, `BreadcrumbList`, `HowTo` y `FAQPage` |
| Bloque de respuesta directa | `CalcLayout.astro` | El párrafo bajo el H1 lleva la clase `aeo-answer` y es el objetivo de `speakable` |
| Frescura | `SITE.dateModified` en `seo.ts` | Alimenta `dateModified` del schema, `<meta name="last-modified">` y la línea "Actualizado el…" visible |
| Serialización del JSON-LD | `src/lib/utils/jsonld.ts` | **Usar `jsonLd()` siempre, nunca `JSON.stringify()`** para JSON-LD (ver más abajo) |

### `jsonLd()` — regla obligatoria

Todo bloque `<script type="application/ld+json">` debe serializarse con `jsonLd()` de `@/lib/utils/jsonld`, que escapa `<`, `>` y `&` como secuencias unicode.

```astro
---
import { jsonLd } from '@/lib/utils/jsonld';
const graph = jsonLd({ '@context': 'https://schema.org', '@graph': [...] });
---
<script is:inline type="application/ld+json" set:html={graph} />
```

El JSON resultante parsea idéntico al original, pero evita dos problemas reales:
1. Un `</script>` dentro de cualquier texto (FAQ, descripción) cerraría el bloque antes de tiempo.
2. Los comparadores sueltos en las FAQs (`<86%`, `< 25 mmHg`) rompen los parsers de HTML.

### Imágenes Open Graph

`public/og/` contiene una imagen 1200×630 JPG por calculadora más `default.jpg`, generadas con `node scripts/generate-og.mjs`. El script importa `CALCS` directamente desde `calcs.ts` (Node elimina los tipos al vuelo), así que nunca se desincroniza del registro.

- `CalcLayout.astro` usa `/og/[slug].jpg`; el home y el resto de páginas usan `SITE.ogImage` (`/og/default.jpg`).
- **Regenerar tras añadir calculadoras nuevas** — si falta la imagen, la página queda sin previsualización.
- Con imagen propia, el `twitter:card` es `summary_large_image` en todo el sitio.

### Props AEO de `CalcLayout`

```astro
<CalcLayout
  slug="mi-calculadora"
  answer="Respuesta directa de 1-2 frases."   <!-- opcional: por defecto usa longDescription -->
  howTo={['Paso 1…', 'Paso 2…', 'Paso 3…']}   <!-- opcional: por defecto, los pasos del patrón estándar -->
  dateModified="2026-07-31"                    <!-- opcional: por defecto SITE.dateModified -->
  faqs={[…]}
>
```

### Reglas al añadir contenido

1. **No hace falta tocar `llms.txt`** — se regenera solo con cada `npm run build`.
2. Al revisar el contenido del sitio, actualizar `SITE.dateModified` en `seo.ts`.
3. Si una calculadora tiene una respuesta corta y concreta, pasarla en `answer`: es el texto que un motor de respuesta cita literalmente.
4. Mantener el mínimo de 5 FAQs — sin ellas no hay `FAQPage` y se pierde la vía principal de citación.

---

## Registro de calculadoras

El inventario está dividido en **48 archivos por categoría** en la carpeta `docs/`, siguiendo el patrón `docs/CALCULADORAS-[CATEGORIA].md`.
El índice general está en [CALCULADORAS.md](CALCULADORAS.md).

### Reglas obligatorias del registro

1. **Antes de crear cualquier calculadora nueva**, leer TODOS los archivos `CALCULADORAS-*.md` para evitar duplicados.
2. **Al crear una calculadora nueva**, actualizar dos archivos:
   - `CALCULADORAS.md` — incrementar el total global y el próximo número de serie.
   - El archivo de su categoría (`CALCULADORAS-[CATEGORIA].md`) — añadir la fila en la tabla.
3. **El número de serie es correlativo global** — no se reinicia por categoría.

### Columnas de la tabla de categoría

| Columna | Contenido |
|---|---|
| `#` | Número de serie global (ej. `#1`, `#2`…) |
| `Nombre` | Nombre legible de la calculadora |
| `Slug` | URL sin slash (ej. `calculadora-imc`) |
| `Componente` | Nombre del archivo TSX (ej. `ImcTool.tsx`) |
| `Estado` | `activa` / `borrador` / `deprecada` |

---

## Regla crítica: importar CSS en el frontmatter, nunca con `<link>`

En Astro, el CSS procesado por Vite (Tailwind v4) **nunca** se referencia con una etiqueta `<link>` en el `<head>`. La ruta `/src/styles/global.css` no existe en el build de producción.

**Correcto — en el frontmatter de cualquier layout:**
```astro
---
import '@/styles/global.css';
---
```

**Incorrecto — rompe los estilos en producción:**
```html
<link rel="stylesheet" href="/src/styles/global.css" />
```

Los 4 layouts que importan el CSS son:
- `src/pages/index.astro`
- `src/components/layout/CalcLayout.astro`
- `src/components/layout/GroupLayout.astro`
- `src/components/layout/LegalLayout.astro`

---

## Sitemap

El sitemap es **completamente automático** — generado por `@astrojs/sitemap` en cada build.

- Cada nueva calculadora (nuevo `.astro` en `src/pages/`) aparece automáticamente en el siguiente deploy.
- Las páginas de paginación (`/matematicas/2`, `/matematicas/3`…) también se incluyen solas.
- Las páginas legales están **excluidas** del sitemap (filtro en `astro.config.mjs`) porque tienen `noindex`.
- Límite: 50.000 URLs por archivo. Con 900+ calculadoras seguirá siendo un solo archivo.
- URL del sitemap: `https://calzix.com/sitemap-index.xml`

No hace falta tocar `astro.config.mjs` al añadir calculadoras.

---

## Repositorio y deploy

| Recurso | URL |
|---|---|
| GitHub | https://github.com/codezun-star/Calzix |
| Deploy | Cloudflare Pages — `calzix.pages.dev` |
| Dominio producción | https://calzix.com |

**Flujo de trabajo:**
1. Desarrollar en local con `npm run dev`
2. Verificar build con `npm run build` (debe terminar sin errores)
3. `git add` de los archivos modificados → `git commit` → `git push origin main`
4. Cloudflare Pages detecta el push y redespliega automáticamente (~1-2 min)

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo en localhost:4321
npm run build    # Build de producción → dist/
npm run preview  # Preview del build local
```

**El build genera actualmente 317 páginas HTML estáticas** (home + 5 legales + 9 categorías + 270 calculadoras + índice de blog + 31 artículos) más el endpoint `/llms.txt`.
Actualizar este contador al añadir calculadoras. El número real de calculadoras es siempre `CALCS.length` en `src/lib/constants/calcs.ts`.

---

## Registro de cambios

| Fecha | Acción |
|---|---|
| 2026-05-29 | SEO/URLs: `trailingSlash: 'never'` en `astro.config.mjs`. Canonical del home corregida en `seo.ts` (`calzix.com/` → `calzix.com`). URLs del filtro de sitemap actualizadas sin slash final. Redirect 301 `/*/→/:splat` en `public/_redirects` (Cloudflare Pages) para normalizar URLs con slash final. |
| 2026-06-25 | Ampliación masiva: +90 calculadoras (10 por cada uno de los 9 grupos: Matemáticas, Ciencias, Conversión, Hogar, Trabajo, Educación, Viaje, Naturaleza, Ocio) y +10 artículos de blog. Total: 284 calculadoras y 31 artículos (317 páginas). Sin duplicar slugs existentes; iconos Lucide reutilizados (sin cambios en `CalcCard.tsx`). |
| 2026-07-31 | Correcciones tras la auditoría AEO. (1) **Serialización segura del JSON-LD**: nuevo `src/lib/utils/jsonld.ts` con `jsonLd()`, que escapa `<`, `>` y `&` como unicode. 21 páginas publicaban comparadores sueltos (`<86%`, `< 25 mmHg`) sin escapar dentro del bloque JSON-LD; además de romper parsers, un `</script>` en cualquier texto cerraría el bloque antes de tiempo. Aplicado en `CalcLayout`, `index`, `blog/[slug]` y `blog/index`. (2) **Imágenes Open Graph**: nuevo `scripts/generate-og.mjs` (sharp, importa `CALCS` directamente del TS) que genera 270 imágenes 1200×630 + `default.jpg` en `public/og/`. `CalcLayout` e `index` ganan `og:image`, `og:image:width/height/alt`, `twitter:image` y `twitter:card` pasa de `summary` a `summary_large_image`. |
| 2026-07-31 | AEO (optimización para motores de respuesta). (1) Nuevo `src/pages/llms.txt.ts` — genera `/llms.txt` en cada build desde `CALCS` + blog, agrupado por los 9 grupos temáticos. (2) `public/robots.txt` con `Allow` explícito para GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent y otros. (3) `CalcLayout.astro`: los dos `<script>` sueltos de JSON-LD se unifican en un `@graph` que ahora incluye `Organization`, `WebSite`, `WebPage` (con `speakable`), `BreadcrumbList` (antes solo existía como HTML) y `HowTo`; el `WebApplication` gana `inLanguage`, `isAccessibleForFree`, `browserRequirements` y `dateModified`. Nuevos props opcionales `answer`, `howTo` y `dateModified`. (4) `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large…">` y `og:locale` en las páginas de calculadora y en el home. (5) Bloque de respuesta directa con clase `aeo-answer` bajo el H1 + línea visible "Actualizado el…". (6) Home: `@graph` con `Organization`, `WebSite`, `CollectionPage` e `ItemList` de las 9 categorías. (7) Contador de calculadoras corregido en este archivo: 270 reales (`CALCS.length`), no 284. |
| 2026-07-16 | SEO tras análisis de Search Console: refuerzo de las 7 páginas con más impresiones (`irpf-retencion`, `consumo-electrico`, `diferencia-horaria`, `calculadora-propina`, `mcm-mcd`, `velocidad-distancia-tiempo`, `ley-ohm`). Nuevo slot `extra` en `CalcLayout.astro` para contenido enriquecido (tablas y ejemplos resueltos). Títulos/descripciones reorientados a la audiencia real (España domina las impresiones) y año actualizado 2024 → 2026 en IRPF. H1 y `longDescription` reforzados en `calcs.ts`. |
