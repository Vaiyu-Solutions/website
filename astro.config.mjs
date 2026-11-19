// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vaiyu.solutions',
  integrations: [sitemap()],
  // The section was called /announcements until 19 Nov 2026. Keep old links working.
  redirects: {
    '/announcements': '/blog',
    '/announcements/20260727-openai-select-partner': '/blog/20260727-openai-select-partner',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
