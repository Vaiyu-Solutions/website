#!/usr/bin/env node
// Scaffold a new announcement:
//
//   pnpm new:announcement "Vaiyu Solutions Named an OpenAI Select Partner"
//
// Creates src/content/announcements/<YYYYMMDD>-<slug>.md with front matter filled
// in. Non-terminal alternative: copy src/content/announcements/_TEMPLATE.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(here, '../src/content/announcements');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: pnpm new:announcement "Your headline"');
  process.exit(1);
}

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const compact = date.replaceAll('-', '');
const slug =
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'announcement';

// The filename IS the public URL, date prefix included.
const name = `${compact}-${slug}`;
const filename = `${name}.md`;
const filepath = path.join(DIR, filename);
if (fs.existsSync(filepath)) {
  console.error(`Refusing to overwrite existing file: ${filename}`);
  process.exit(1);
}

const content = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
author: "Vaiyu Solutions"
excerpt: "TODO: one or two sentences for the index and social previews."
tags: [press release]
---

**Miami, FL, USA · ${new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(now)}** · Vaiyu Solutions today announced …
`;

fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(filepath, content);
console.log(`✓ Created src/content/announcements/${filename}`);
console.log(`  URL when published: https://vaiyu.solutions/announcements/${name}`);
