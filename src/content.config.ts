import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Announcements — the single public feed for press releases, partnerships, and
 * company news. One markdown file in `src/content/announcements/` becomes one
 * page at build time, and the URL is the filename verbatim:
 *
 *   20260727-openai-select-partner.md
 *   → vaiyu.solutions/announcements/20260727-openai-select-partner
 *
 * Files whose name starts with `_` (e.g. `_TEMPLATE.md`) are never published.
 */
const announcements = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/announcements',
    // Default behaviour also slugifies; do it literally so the URL is always
    // exactly what the file is called.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // `YYYY-MM-DD` (add a time to order same-day items: 2026-07-27T14:30:00Z).
    date: z.coerce.date(),
    author: z.string().default('Vaiyu Solutions'),
    // Shown on the index and used as the meta description + social preview text.
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    // Absolute path under `public/`, e.g. `/img/openai-select-partner.png`.
    cover: z.string().optional(),
    // Keeps the item out of production builds; still visible in `pnpm dev`.
    draft: z.boolean().default(false),
  }),
});

export const collections = { announcements };
