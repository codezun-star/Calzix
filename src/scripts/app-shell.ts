// Comportamiento de "app nativa" del sitio: hojas deslizables, buscador,
// calculadoras recientes, compartir, instalación como PWA, avisos breves,
// ocultación de la barra inferior con el teclado abierto y registro del
// service worker. Se carga una vez por página desde AppSheets.astro.
import type { SearchEntry } from '@/lib/constants/app';

interface IndexedEntry extends SearchEntry {
  /** Nombre normalizado, con un espacio delante para buscar inicios de palabra. */
  nameKey: string;
  /** Nombre sin el prefijo genérico ("calculadora de…", "conversor de…"). */
  coreKey: string;
  /** Nombre + descripción + categoría normalizados. */
  haystack: string;
}

interface RecentEntry {
  s: string;
  n: string;
  g: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const root = document.documentElement;
const RECENT_KEY = 'calzix:recent';
const RECENT_MAX = 8;
const MAX_RESULTS = 40;
const SLUG_RE = /^[a-z0-9-]+$/;
const CLOSE_MS = 200;

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Hojas ────────────────────────────────────────────────────────────────────

function getSheet(name: string): HTMLDialogElement | null {
  const el = document.getElementById(`app-sheet-${name}`);
  return el instanceof HTMLDialogElement ? el : null;
}

function sheetName(dialog: HTMLDialogElement): string {
  return dialog.id.replace('app-sheet-', '');
}

function openSheets(): HTMLDialogElement[] {
  return Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.app-sheet[open]'));
}

function setExpanded(name: string, expanded: boolean): void {
  document
    .querySelectorAll<HTMLElement>(`[data-app-open="${name}"]`)
    .forEach((el) => el.setAttribute('aria-expanded', String(expanded)));
}

function panelOf(dialog: HTMLDialogElement): HTMLElement | null {
  return dialog.querySelector<HTMLElement>('.app-sheet-panel');
}

function resetPanel(dialog: HTMLDialogElement): void {
  dialog.classList.remove('is-closing', 'is-dragged');
  const panel = panelOf(dialog);
  if (panel) {
    panel.style.translate = '';
    panel.style.transition = '';
  }
}

function openSheet(name: string): void {
  const dialog = getSheet(name);
  if (!dialog || dialog.open || typeof dialog.showModal !== 'function') return;
  openSheets().forEach((d) => closeSheet(d, true));
  resetPanel(dialog);
  dialog.showModal();
  root.classList.add('app-sheet-open');
  setExpanded(name, true);
  if (name === 'search') onSearchOpen();
}

function closeSheet(dialog: HTMLDialogElement, immediate = false): void {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (immediate || reducedMotion()) {
    dialog.close();
    return;
  }
  dialog.classList.add('is-closing');
  window.setTimeout(() => {
    if (dialog.open) dialog.close();
  }, CLOSE_MS);
}

function onSheetClosed(dialog: HTMLDialogElement): void {
  resetPanel(dialog);
  setExpanded(sheetName(dialog), false);
  if (openSheets().length === 0) root.classList.remove('app-sheet-open');
}

/** Arrastrar el asa o la cabecera hacia abajo cierra la hoja, como en iOS y Android. */
function enableDrag(dialog: HTMLDialogElement): void {
  const panel = panelOf(dialog);
  if (!panel) return;

  let startY = 0;
  let startTime = 0;
  let offset = 0;
  let dragging = false;

  const end = (): void => {
    if (!dragging) return;
    dragging = false;
    const velocity = offset / Math.max(1, performance.now() - startTime);
    panel.style.transition = 'translate 0.2s ease';
    if (offset > 110 || velocity > 0.6) {
      dialog.classList.add('is-dragged');
      panel.style.translate = '0 100%';
      closeSheet(dialog);
    } else {
      panel.style.translate = '';
    }
  };

  dialog.querySelectorAll<HTMLElement>('[data-sheet-drag]').forEach((handle) => {
    handle.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      dragging = true;
      offset = 0;
      startY = event.touches[0].clientY;
      startTime = performance.now();
      panel.style.transition = 'none';
    }, { passive: true });

    handle.addEventListener('touchmove', (event) => {
      if (!dragging) return;
      offset = Math.max(0, event.touches[0].clientY - startY);
      panel.style.translate = `0 ${offset}px`;
    }, { passive: true });

    handle.addEventListener('touchend', end);
    handle.addEventListener('touchcancel', end);
  });
}

document.querySelectorAll<HTMLDialogElement>('dialog.app-sheet').forEach((dialog) => {
  // Toque fuera del panel (sobre el fondo oscurecido).
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeSheet(dialog);
  });
  // Escape o gesto "atrás" de Android: se cierra con animación.
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeSheet(dialog);
  });
  dialog.addEventListener('close', () => onSheetClosed(dialog));
  enableDrag(dialog);
});

// ── Compartir y avisos ───────────────────────────────────────────────────────

let toastTimer = 0;

function toast(message: string): void {
  const el = document.querySelector<HTMLElement>('[data-app-toast]');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2600);
}

async function share(url: string, title: string): Promise<void> {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, url });
    } catch {
      // El usuario ha cerrado el panel de compartir: no es un error.
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    toast('Enlace copiado al portapapeles.');
  } catch {
    toast('No se ha podido copiar el enlace.');
  }
}

function canonicalUrl(): string {
  return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || location.href;
}

// ── Delegación de clics ──────────────────────────────────────────────────────

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const opener = target.closest<HTMLElement>('[data-app-open]');
  if (opener) {
    event.preventDefault();
    openSheet(opener.dataset.appOpen ?? '');
    return;
  }

  const closer = target.closest<HTMLElement>('[data-sheet-close]');
  if (closer) {
    const dialog = closer.closest('dialog');
    if (dialog instanceof HTMLDialogElement) closeSheet(dialog);
    return;
  }

  if (target.closest('[data-app-share]')) {
    void share(canonicalUrl(), document.title);
    return;
  }

  if (target.closest('[data-app-share-site]')) {
    openSheets().forEach((d) => closeSheet(d, true));
    void share(`${location.origin}/`, 'Calzix — Calculadoras online gratuitas');
  }
});

// Atajos de teclado del buscador: Ctrl/Cmd + K y "/".
function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

document.addEventListener('keydown', (event) => {
  // El autocompletado del navegador dispara keydown sin `key`.
  const key = typeof event.key === 'string' ? event.key : '';
  if ((event.metaKey || event.ctrlKey) && key.toLowerCase() === 'k') {
    event.preventDefault();
    openSheet('search');
  } else if (key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isEditable(event.target)) {
    event.preventDefault();
    openSheet('search');
  }
});

// ── Iconos y filas ───────────────────────────────────────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Icono del sprite compartido /icons/sprite.svg, igual que <Icon name="…" />. */
function spriteIcon(name: string, size: number, strokeWidth: number, className = ''): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `app-i ${className}`.trim());
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('stroke-width', String(strokeWidth));
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `/icons/sprite.svg#i-${name}`);
  svg.append(use);
  return svg;
}

function iconBox(groupId: string): HTMLSpanElement {
  const box = document.createElement('span');
  box.className = 'app-row-icon';
  box.append(spriteIcon(SLUG_RE.test(groupId) ? `g-${groupId}` : 'g-default', 18, 1.9));
  return box;
}

function buildRow(slug: string, title: string, subtitle: string, groupId: string): HTMLLIElement {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = `/${slug}`;
  link.className = 'app-row';

  const text = document.createElement('span');
  text.className = 'app-row-text';
  const titleEl = document.createElement('span');
  titleEl.className = 'app-row-title';
  titleEl.textContent = title;
  text.append(titleEl);
  if (subtitle) {
    const sub = document.createElement('span');
    sub.className = 'app-row-sub';
    sub.textContent = subtitle;
    text.append(sub);
  }

  link.append(iconBox(groupId), text, spriteIcon('chevron-right', 18, 2, 'app-row-chevron'));
  li.append(link);
  return li;
}

function buildChip(entry: RecentEntry): HTMLLIElement {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = `/${entry.s}`;
  link.className = 'app-chip app-press';
  const label = document.createElement('span');
  label.className = 'app-chip-label';
  label.textContent = entry.n;
  link.append(iconBox(entry.g), label);
  li.append(link);
  return li;
}

// ── Calculadoras recientes ───────────────────────────────────────────────────

function isRecent(value: unknown): value is RecentEntry {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.s === 'string' && SLUG_RE.test(v.s) && typeof v.n === 'string' && typeof v.g === 'string';
}

function readRecent(): RecentEntry[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isRecent).slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

function currentCalc(): RecentEntry | null {
  const el = document.querySelector<HTMLElement>('[data-calc-slug]');
  const entry = {
    s: el?.dataset.calcSlug ?? '',
    n: el?.dataset.calcName ?? '',
    g: el?.dataset.calcGroup ?? '',
  };
  return isRecent(entry) && entry.n ? entry : null;
}

function rememberCurrentCalc(): void {
  const entry = currentCalc();
  if (!entry) return;
  const list = [entry, ...readRecent().filter((r) => r.s !== entry.s)].slice(0, RECENT_MAX);
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    // Sin almacenamiento (modo privado): simplemente no hay recientes.
  }
}

/** Pinta las recientes en cada contenedor `[data-recent-section]` ("rows" o "chips"). */
function renderRecent(): void {
  const current = currentCalc()?.s;
  const items = readRecent().filter((r) => r.s !== current);
  document.querySelectorAll<HTMLElement>('[data-recent-section]').forEach((section) => {
    const list = section.querySelector<HTMLElement>('[data-recent-list]');
    if (!list) return;
    const chips = section.dataset.recentSection === 'chips';
    list.replaceChildren(...items.map((r) => (chips ? buildChip(r) : buildRow(r.s, r.n, '', r.g))));
    section.hidden = items.length === 0;
  });
}

rememberCurrentCalc();
renderRecent();

// ── Buscador ─────────────────────────────────────────────────────────────────

const searchSheet = getSheet('search');
const searchForm = searchSheet?.querySelector<HTMLFormElement>('[data-search-form]') ?? null;
const searchInput = searchSheet?.querySelector<HTMLInputElement>('[data-search-input]') ?? null;
const searchBody = searchSheet?.querySelector<HTMLElement>('[data-search-body]') ?? null;
const searchIdle = searchSheet?.querySelector<HTMLElement>('[data-search-idle]') ?? null;
const searchStatus = searchSheet?.querySelector<HTMLElement>('[data-search-status]') ?? null;
const searchResults = searchSheet?.querySelector<HTMLElement>('[data-search-results]') ?? null;
const searchClear = searchSheet?.querySelector<HTMLButtonElement>('[data-search-clear]') ?? null;

// Palabras que no ayudan a encontrar nada ("calcular el iva" = "iva").
const STOPWORDS = new Set([
  'a', 'al', 'como', 'con', 'cual', 'cuanto', 'cuanta', 'cuantos', 'cuantas', 'de', 'del',
  'el', 'en', 'la', 'las', 'lo', 'los', 'mi', 'para', 'por', 'que', 'se', 'un', 'una', 'y',
  'calcular', 'calculo', 'calculadora', 'calculadoras', 'online', 'gratis',
]);

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokenize(query: string): string[] {
  const all = normalize(query).split(' ').filter(Boolean);
  const useful = all.filter((t) => !STOPWORDS.has(t));
  // Plural sencillo: "hipotecas" también encuentra "hipoteca".
  return (useful.length ? useful : all).map((t) => (t.length > 4 && t.endsWith('s') ? t.slice(0, -1) : t));
}

let searchIndex: IndexedEntry[] | null = null;
let searchLoading: Promise<IndexedEntry[]> | null = null;

function loadIndex(): Promise<IndexedEntry[]> {
  if (searchIndex) return Promise.resolve(searchIndex);
  searchLoading ??= fetch('/search-index.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<SearchEntry[]>;
    })
    .then((data) => {
      searchIndex = data.map((e) => ({
        ...e,
        nameKey: ` ${normalize(e.n)}`,
        coreKey: ` ${normalize(e.n).replace(/^(calculadora|conversor|calculo) (de |del )?(la |el |los |las )?/, '')}`,
        haystack: ` ${normalize(`${e.n} ${e.d} ${e.c}`)}`,
      }));
      return searchIndex;
    })
    .catch((err: unknown) => {
      searchLoading = null;
      throw err;
    });
  return searchLoading;
}

function search(query: string, entries: IndexedEntry[]): IndexedEntry[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const scored: Array<{ entry: IndexedEntry; score: number }> = [];

  for (const entry of entries) {
    let score = 0;
    let matches = true;
    for (const token of tokens) {
      // "hipoteca" prefiere "Calculadora de Hipoteca" a "Amortización Hipoteca".
      if (entry.coreKey.startsWith(` ${token}`)) score += 2;
      if (entry.nameKey.includes(` ${token}`)) score += 4;
      else if (entry.nameKey.includes(token)) score += 2;
      else if (entry.haystack.includes(token)) score += 1;
      else {
        matches = false;
        break;
      }
    }
    if (matches) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score || a.entry.n.length - b.entry.n.length);
  return scored.slice(0, MAX_RESULTS).map((s) => s.entry);
}

function showIdle(): void {
  if (searchIdle) searchIdle.hidden = false;
  if (searchResults) {
    searchResults.hidden = true;
    searchResults.replaceChildren();
  }
  if (searchStatus) searchStatus.textContent = '';
}

async function runSearch(): Promise<void> {
  if (!searchInput || !searchResults || !searchStatus || !searchIdle) return;
  const query = searchInput.value.trim();
  if (!query) {
    showIdle();
    return;
  }

  let entries: IndexedEntry[];
  try {
    entries = await loadIndex();
  } catch {
    searchIdle.hidden = true;
    searchResults.hidden = true;
    searchStatus.textContent = 'No se ha podido cargar el buscador. Comprueba tu conexión e inténtalo de nuevo.';
    return;
  }
  // El usuario ha seguido escribiendo mientras cargaba el índice.
  if (searchInput.value.trim() !== query) return;

  const found = search(query, entries);
  searchIdle.hidden = true;
  searchResults.replaceChildren(...found.map((e) => buildRow(e.s, e.n, `${e.c} · ${e.d}`, e.g)));
  searchResults.hidden = found.length === 0;
  if (searchBody) searchBody.scrollTop = 0;

  if (found.length === 0) {
    searchStatus.textContent = `Sin resultados para «${query}». Prueba con otra palabra o explora las categorías.`;
  } else if (found.length === MAX_RESULTS) {
    searchStatus.textContent = `Los ${MAX_RESULTS} resultados más relevantes`;
  } else {
    searchStatus.textContent = found.length === 1 ? '1 resultado' : `${found.length} resultados`;
  }
}

function onSearchOpen(): void {
  renderRecent();
  if (searchInput) {
    searchInput.focus();
    searchInput.select();
    if (searchClear) searchClear.hidden = searchInput.value === '';
  }
  // Se descarga en cuanto se abre, para que la primera letra ya encuentre algo.
  loadIndex().catch(() => undefined);
}

searchInput?.addEventListener('input', () => {
  if (searchClear) searchClear.hidden = searchInput.value === '';
  void runSearch();
});

searchClear?.addEventListener('click', (event) => {
  event.preventDefault();
  if (!searchInput) return;
  searchInput.value = '';
  searchClear.hidden = true;
  showIdle();
  searchInput.focus();
});

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const first = searchResults && !searchResults.hidden ? searchResults.querySelector<HTMLAnchorElement>('a') : null;
  if (first) location.href = first.href;
  else searchInput?.blur();
});

// Flechas arriba/abajo para moverse por los resultados con el teclado.
searchSheet?.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  const links = Array.from(searchSheet.querySelectorAll<HTMLAnchorElement>('.app-sheet-body a')).filter(
    (a) => a.getClientRects().length > 0,
  );
  if (!links.length) return;
  event.preventDefault();
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === 'ArrowDown') (links[index + 1] ?? links[0]).focus();
  else if (index <= 0) searchInput?.focus();
  else links[index - 1].focus();
});

// Como en las apps: al desplazar la lista se esconde el teclado.
searchBody?.addEventListener('touchmove', () => {
  if (document.activeElement === searchInput) searchInput?.blur();
}, { passive: true });

// El buscador ocupa exactamente el área visible, también con el teclado abierto.
const viewport = window.visualViewport;
function syncViewport(): void {
  if (!viewport) return;
  root.style.setProperty('--app-vvh', `${Math.round(viewport.height)}px`);
  root.style.setProperty('--app-vvt', `${Math.round(viewport.offsetTop)}px`);
}
viewport?.addEventListener('resize', syncViewport);
viewport?.addEventListener('scroll', syncViewport);
syncViewport();

// Acceso directo del manifiesto: /#buscar abre el buscador.
if (location.hash === '#buscar') {
  history.replaceState(null, '', location.pathname + location.search);
  openSheet('search');
}

// ── Instalar como app ────────────────────────────────────────────────────────

const installBox = document.querySelector<HTMLElement>('[data-install]');
const installHelp = document.querySelector<HTMLElement>('[data-install-ios]');
let installEvent: BeforeInstallPromptEvent | null = null;

const isStandalone = (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIOS =
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);

function updateInstall(): void {
  if (installBox) installBox.hidden = isStandalone() || (!installEvent && !isIOS);
}

window.addEventListener('beforeinstallprompt', (event) => {
  installEvent = event as BeforeInstallPromptEvent;
  updateInstall();
});

window.addEventListener('appinstalled', () => {
  installEvent = null;
  updateInstall();
  toast('Calzix se ha instalado en tu dispositivo.');
});

document.querySelector<HTMLButtonElement>('[data-install-btn]')?.addEventListener('click', async () => {
  if (installEvent) {
    const prompt = installEvent;
    installEvent = null;
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch {
      // El navegador ha rechazado mostrar el diálogo.
    }
    updateInstall();
    return;
  }
  if (installHelp) installHelp.hidden = !installHelp.hidden;
});

updateInstall();

// ── Teclado en pantalla ──────────────────────────────────────────────────────
// Mientras se escribe en una calculadora, la barra inferior se retira para no
// tapar el campo, igual que en una app nativa.

const coarsePointer = window.matchMedia('(pointer: coarse)');
const NON_TEXT_INPUTS = new Set([
  'checkbox', 'radio', 'range', 'button', 'submit', 'reset', 'color', 'file', 'image', 'hidden',
  'date', 'time', 'datetime-local', 'month', 'week',
]);

function opensKeyboard(el: EventTarget | null): boolean {
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLInputElement) return !NON_TEXT_INPUTS.has(el.type);
  return el instanceof HTMLElement && el.isContentEditable;
}

document.addEventListener('focusin', (event) => {
  if (coarsePointer.matches && opensKeyboard(event.target)) root.classList.add('app-kb-open');
});

document.addEventListener('focusout', () => {
  window.setTimeout(() => {
    if (!opensKeyboard(document.activeElement)) root.classList.remove('app-kb-open');
  }, 80);
});

// ── Conexión ─────────────────────────────────────────────────────────────────

window.addEventListener('offline', () => toast('Sin conexión. Las calculadoras que ya abriste siguen funcionando.'));
window.addEventListener('online', () => toast('Conexión recuperada.'));

// Al volver con "atrás" desde la caché del navegador, la página reaparece tal
// cual se dejó: se cierran las hojas y se refrescan las recientes.
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  openSheets().forEach((d) => closeSheet(d, true));
  root.classList.remove('app-kb-open');
  renderRecent();
});

// ── Service worker (uso sin conexión) ────────────────────────────────────────

function warmCache(): void {
  // Primera visita: la página se cargó antes de que existiera el service worker,
  // así que se le pasan la página y sus recursos para que queden guardados.
  if (navigator.serviceWorker.controller) return;
  navigator.serviceWorker.ready
    .then((registration) => {
      const assets = performance
        .getEntriesByType('resource')
        .map((entry) => entry.name)
        .filter((url) => url.startsWith(`${location.origin}/_astro/`));
      registration.active?.postMessage({ type: 'calzix:cache', urls: [location.pathname, ...assets] });
    })
    .catch(() => undefined);
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const register = (): void => {
    navigator.serviceWorker.register('/sw.js').then(warmCache).catch(() => undefined);
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
