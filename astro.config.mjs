// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://calzix.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // Descarga la página de destino al pasar el ratón o enfocar un enlace:
  // al hacer clic, la navegación es instantánea, como en una app.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => ![
        'https://calzix.com/privacidad',
        'https://calzix.com/terminos',
        'https://calzix.com/cookies',
        'https://calzix.com/aviso-legal',
        'https://calzix.com/contacto',
        'https://calzix.com/offline',
      ].includes(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
