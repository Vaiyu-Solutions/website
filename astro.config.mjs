// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';

// Wraps every Markdown link in a ui-button, so ui-sdk sees each link as an interactive part.
const wrapLinks = {
  name: 'wrap-links-in-ui-button',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      ctx.wrapNode(node, { type: 'element', tagName: 'ui-button', properties: {}, children: [] });
    },
  },
};
export default defineConfig({
  site: 'https://vaiyu.solutions',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [wrapLinks] }),
  },
  // The section was called /announcements until 19 Nov 2026. Keep old links working.
  redirects: {
    '/announcements': '/blog',
    '/announcements/20260727-openai-select-partner': '/blog/20260727-openai-select-partner',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
