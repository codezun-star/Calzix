/* Calzix — service worker.
 *
 * Objetivo: que el sitio se comporte como una app instalada y que las
 * calculadoras ya visitadas funcionen sin conexión (todos los cálculos se hacen
 * en el navegador, así que basta con tener la página y sus recursos guardados).
 *
 * Estrategias:
 *  - Páginas (navegación): primero la red, con la copia guardada como respaldo.
 *    Si la red tarda más de NETWORK_TIMEOUT y hay copia, se sirve la copia y la
 *    red la actualiza en segundo plano. Sin red ni copia: /offline.
 *  - /_astro/* (JS y CSS con hash en el nombre, inmutables): primero la caché.
 *  - Iconos, manifiesto e índice de búsqueda: caché y revalidación en segundo plano.
 *  - Cualquier otro origen (anuncios, terceros): no se toca, va directo a la red.
 *
 * Al cambiar la lógica de este archivo, subir VERSION: el navegador instala el
 * nuevo service worker y borra las cachés antiguas.
 */
const VERSION = 'v1';
const CORE = `calzix-core-${VERSION}`;
const PAGES = `calzix-pages-${VERSION}`;
const STATIC = `calzix-static-${VERSION}`;

const OFFLINE_URL = '/offline';
const CORE_URLS = [
  OFFLINE_URL,
  '/search-index.json',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/sprite.svg',
  '/icons/icon-192.png',
];
const MAX_PAGES = 60;
const MAX_STATIC = 300;
const NETWORK_TIMEOUT = 4000;

const sameOrigin = (url) => url.origin === self.location.origin;
const isStaticAsset = (url) => url.pathname.startsWith('/_astro/');
const isCoreAsset = (url) =>
  url.pathname.startsWith('/icons/') ||
  url.pathname === '/favicon.svg' ||
  url.pathname === '/manifest.webmanifest' ||
  url.pathname === '/search-index.json';

/** Clave de caché de una página: sin query ni hash, sin .html ni barra final. */
function pageKey(input) {
  const url = new URL(input, self.location.origin);
  const path = url.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  return `${url.origin}${path}`;
}

function cacheable(response) {
  return response && response.ok && response.type === 'basic';
}

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

/** Guarda los JS/CSS de /_astro que referencia un HTML o JS (y sus imports). */
async function cacheAssetsFrom(text, baseUrl, seen) {
  const found = new Set();
  const re = /["'(]((?:\.{1,2}\/|\/_astro\/)[^"'()\s]+?\.(?:js|css))["')]/g;
  let match;
  while ((match = re.exec(text))) {
    const url = new URL(match[1], baseUrl);
    if (sameOrigin(url) && isStaticAsset(url) && !seen.has(url.href)) found.add(url.href);
  }
  if (!found.size || seen.size > 60) return;

  const cache = await caches.open(STATIC);
  await Promise.all(
    [...found].map(async (href) => {
      seen.add(href);
      try {
        const hit = await cache.match(href);
        const res = hit || (await fetch(href));
        if (!hit && cacheable(res)) await cache.put(href, res.clone());
        if (href.endsWith('.js')) await cacheAssetsFrom(await res.text(), href, seen);
      } catch {
        // Un recurso que falla no debe impedir la instalación.
      }
    }),
  );
}

/** Descarga y guarda una página junto con sus recursos. */
async function cachePage(path, cacheName) {
  try {
    const res = await fetch(path, { credentials: 'same-origin' });
    if (!cacheable(res)) return;
    const cache = await caches.open(cacheName);
    await cache.put(pageKey(path), res.clone());
    await cacheAssetsFrom(await res.text(), self.location.origin + path, new Set());
  } catch {
    // Sin red durante la instalación: se reintentará en la próxima visita.
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const core = await caches.open(CORE);
      await Promise.all(CORE_URLS.filter((u) => u !== OFFLINE_URL).map((u) => core.add(u).catch(() => undefined)));
      await cachePage(OFFLINE_URL, CORE);
      await cachePage('/', PAGES);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([CORE, PAGES, STATIC]);
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n.startsWith('calzix-') && !keep.has(n)).map((n) => caches.delete(n)));
      if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
      await self.clients.claim();
    })(),
  );
});

// La primera página que abre el usuario se carga antes que el service worker:
// la propia página nos pasa su ruta y sus recursos para guardarlos (app-shell.ts).
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.type !== 'calzix:cache' || !Array.isArray(data.urls)) return;
  event.waitUntil(
    (async () => {
      const [page, ...assets] = data.urls.filter((u) => typeof u === 'string');
      if (page && page.startsWith('/') && !page.startsWith('//')) await cachePage(page, PAGES);
      const cache = await caches.open(STATIC);
      await Promise.all(
        assets.map(async (href) => {
          const url = new URL(href, self.location.origin);
          if (!sameOrigin(url) || !isStaticAsset(url) || (await cache.match(url.href))) return;
          try {
            const res = await fetch(url.href);
            if (cacheable(res)) await cache.put(url.href, res);
          } catch {
            // Se guardará en la próxima visita.
          }
        }),
      );
      await trim(PAGES, MAX_PAGES);
      await trim(STATIC, MAX_STATIC);
    })(),
  );
});

async function offlineFallback(key) {
  return (
    (await caches.match(key, { ignoreSearch: true })) ||
    (await caches.match(pageKey(OFFLINE_URL))) ||
    new Response('Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  );
}

function handleNavigation(event) {
  const key = pageKey(event.request.url);

  const network = (async () => {
    const preloaded = await event.preloadResponse;
    const res = preloaded || (await fetch(event.request));
    if (cacheable(res)) {
      const copy = res.clone();
      event.waitUntil(
        caches.open(PAGES).then((cache) => cache.put(key, copy)).then(() => trim(PAGES, MAX_PAGES)),
      );
    }
    return res;
  })();
  // Aunque se responda con la copia guardada, la red sigue actualizándola.
  event.waitUntil(network.catch(() => undefined));

  return (async () => {
    const cached = await caches.match(key, { ignoreSearch: true });
    if (!cached) {
      try {
        return await network;
      } catch {
        return offlineFallback(key);
      }
    }
    const timeout = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_TIMEOUT));
    try {
      return await Promise.race([network, timeout]);
    } catch {
      return cached;
    }
  })();
}

async function cacheFirst(request, cacheName, max) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (cacheable(res)) {
    const copy = res.clone();
    cache.put(request, copy).then(() => trim(cacheName, max));
  }
  return res;
}

async function staleWhileRevalidate(event, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(event.request, { ignoreSearch: true });
  const network = fetch(event.request).then((res) => {
    if (cacheable(res)) {
      const copy = res.clone();
      return cache.put(event.request, copy).then(() => res);
    }
    return res;
  });
  event.waitUntil(network.catch(() => undefined));
  return hit || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!sameOrigin(url)) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(event));
  } else if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC, MAX_STATIC));
  } else if (isCoreAsset(url)) {
    event.respondWith(staleWhileRevalidate(event, CORE));
  }
});
