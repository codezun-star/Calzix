// Auditoría automatizada de todas las calculadoras de Calzix.
// Carga cada página, detecta errores de consola/runtime y verifica que el
// componente React monta y produce un resultado al interactuar.
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE_URL || 'http://localhost:4321';

const LEGAL = new Set(['privacidad', 'terminos', 'cookies', 'aviso-legal', 'contacto', 'index']);

// Descubre los slugs a partir de los .astro de src/pages.
const pagesDir = join(__dirname, '..', 'src', 'pages');
const slugs = readdirSync(pagesDir)
  .filter((f) => f.endsWith('.astro'))
  .map((f) => f.replace('.astro', ''))
  .filter((s) => !LEGAL.has(s))
  .sort();

const browser = await chromium.launch();
const results = { ok: [], consoleErrors: [], pageErrors: [], noResult: [], noTool: [] };

for (const slug of slugs) {
  const page = await browser.newContext().then((c) => c.newPage());
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => pageErrors.push(err.message));

  try {
    await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle', timeout: 20000 });

    // El tool React monta dentro de un contenedor con la card redondeada.
    const tool = page.locator('.rounded-2xl').first();
    const hasTool = await tool.count() > 0;
    if (!hasTool) { results.noTool.push(slug); }

    // Rellena cada input numérico/texto con un valor de prueba e interactúa.
    const numInputs = page.locator('input[type="number"]');
    const textInputs = page.locator('input[type="text"]');
    const dateInputs = page.locator('input[type="date"]');
    const nNum = await numInputs.count();
    for (let i = 0; i < nNum; i++) await numInputs.nth(i).fill('5').catch(() => {});
    const nText = await textInputs.count();
    for (let i = 0; i < nText; i++) await textInputs.nth(i).fill('3, 6, 9, 12').catch(() => {});
    const nDate = await dateInputs.count();
    for (let i = 0; i < nDate; i++) await dateInputs.nth(i).fill('2000-01-15').catch(() => {});

    // Pulsa el primer botón de acción si existe (Calcular / Lanzar / etc.).
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(150);
    }

    // Considera que hay resultado si aparece el panel de resultado o algún texto fuerte.
    const resultPanel = page.locator('.bg-\\[var\\(--color-calcs-bg\\)\\], .font-extrabold');
    const hasResult = await resultPanel.count() > 0;

    if (consoleErrors.length) results.consoleErrors.push({ slug, errors: consoleErrors.slice(0, 2) });
    if (pageErrors.length) results.pageErrors.push({ slug, errors: pageErrors.slice(0, 2) });
    if (!hasResult && hasTool) results.noResult.push(slug);
    if (hasTool && !consoleErrors.length && !pageErrors.length) results.ok.push(slug);
  } catch (e) {
    results.pageErrors.push({ slug, errors: [String(e.message).slice(0, 120)] });
  } finally {
    await page.context().close();
  }
}

await browser.close();

console.log(`\n=== AUDITORÍA CALZIX — ${slugs.length} calculadoras ===\n`);
console.log(`OK (montan sin errores):      ${results.ok.length}`);
console.log(`Sin tool detectado:           ${results.noTool.length}`);
console.log(`Errores de consola:           ${results.consoleErrors.length}`);
console.log(`Errores de runtime (pageerror): ${results.pageErrors.length}`);
console.log(`Sin resultado tras interactuar: ${results.noResult.length}`);

if (results.pageErrors.length) {
  console.log('\n--- ERRORES DE RUNTIME ---');
  for (const r of results.pageErrors) console.log(`  ${r.slug}: ${r.errors.join(' | ')}`);
}
if (results.consoleErrors.length) {
  console.log('\n--- ERRORES DE CONSOLA ---');
  for (const r of results.consoleErrors) console.log(`  ${r.slug}: ${r.errors.join(' | ')}`);
}
if (results.noTool.length) {
  console.log('\n--- SIN TOOL ---');
  console.log('  ' + results.noTool.join(', '));
}
if (results.noResult.length) {
  console.log('\n--- SIN RESULTADO TRAS INTERACTUAR (revisar manualmente) ---');
  console.log('  ' + results.noResult.join(', '));
}

const fail = results.pageErrors.length + results.consoleErrors.length;
process.exit(fail > 0 ? 1 : 0);
