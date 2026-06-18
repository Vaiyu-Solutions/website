// VerySafe brand-firewall lint — see PLAN.md §3.
// Fails if VerySafe.ai / SafeCompute product content leaks into the public Vaiyu
// site. Run after `pnpm build` (or via `pnpm lint:firewall` / `pnpm verify`).
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = 'dist';
const TEXT_EXT = new Set(['.html', '.xml', '.css', '.js', '.json', '.svg', '.txt']);

// Brand/product names — case-insensitive; distinctive enough not to false-positive.
const TERMS = /verysafe|safecompute|attestation/i;
// Product acronyms — case-sensitive AND word-boundaried, so legitimate terms like
// the BraTS benchmark (which contains "raTS") are never flagged.
const ACRONYMS = /\bRATS\b|\bSLSA\b|\bHSM\b/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (TEXT_EXT.has(extname(entry.name).toLowerCase())) yield p;
  }
}

try {
  await readdir(DIST);
} catch {
  console.error(`✗ ${DIST}/ not found — run \`pnpm build\` first.`);
  process.exit(1);
}

const hits = [];
let html = 0;
for await (const file of walk(DIST)) {
  if (extname(file).toLowerCase() === '.html') html++;
  const text = await readFile(file, 'utf8');
  text.split(/\r?\n/).forEach((line, i) => {
    for (const re of [TERMS, ACRONYMS]) {
      const m = line.match(re);
      if (m) {
        const ctx = line.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim();
        hits.push(`${file}:${i + 1}  «${m[0]}»  …${ctx}…`);
      }
    }
  });
}

if (html === 0) {
  console.error(`✗ no HTML found in ${DIST}/ — run \`pnpm build\` first.`);
  process.exit(1);
}
if (hits.length) {
  console.error(`✗ VerySafe firewall: ${hits.length} forbidden token(s) in ${DIST}/`);
  for (const h of hits) console.error('  ' + h);
  process.exit(1);
}
console.log(`✓ VerySafe firewall: clean — scanned ${html} HTML page(s), 0 forbidden tokens.`);
