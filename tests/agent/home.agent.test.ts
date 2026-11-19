import { readFileSync } from 'node:fs';
import { beforeAll, expect, test } from 'vitest';
import '@ui-sdk/web/button';
import '@ui-sdk/web/collapsible';
import '@ui-sdk/web/toggle';
import { createAgent } from '@ui-sdk/web/agent';

// One bridge per file, created before the markup renders so it hears each component as it upgrades.
const agent = createAgent();

beforeAll(() => {
  const html = readFileSync('dist/index.html', 'utf8');
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1];
  if (!body) throw new Error('body not found in dist/index.html; run the build first');
  document.body.innerHTML = body;
});

test('the homepage calls to action are named parts an agent can find', () => {
  const components = agent.snapshot().filter((entry) => entry.component !== 'more');
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy();
  }
  const labels = components.map((entry) => entry.label);
  expect(labels).toContain('Start with a 30-minute call');
});
