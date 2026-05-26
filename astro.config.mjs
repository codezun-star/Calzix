// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://calzix.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => ![
        'https://calzix.com/privacidad/',
        'https://calzix.com/terminos/',
        'https://calzix.com/cookies/',
        'https://calzix.com/aviso-legal/',
        'https://calzix.com/contacto/',
      ].includes(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
