import { readFileSync } from 'node:fs';
import { beforeAll, expect, test } from 'vitest';
import '@ui-sdk/web/button';
import '@ui-sdk/web/collapsible';
import '@ui-sdk/web/toggle';
import { createAgent } from '@ui-sdk/web/agent';

// One bridge per file, created before the markup renders so it hears each component as it upgrades.
const agent = createAgent();

beforeAll(() => {
  // The shipped markup, from the last build, so the test checks what ships.
  const html = readFileSync('dist/index.html', 'utf8');
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0];
  if (!header) throw new Error('header not found in dist/index.html; run the build first');
  document.body.innerHTML = header;
});

test('every header control has a name an agent can find', () => {
  const components = agent.snapshot().filter((entry) => entry.component !== 'more');
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy();
  }
  const labels = components.map((entry) => entry.label);
  for (const label of ['Menu', 'Dark theme', 'Vaiyu Solutions, home']) {
    expect(labels, `${label} is missing from the snapshot`).toContain(label);
  }
});

test('an agent can open and close the menu by its name', async () => {
  const opened = await agent.act({ steps: [{ ref: 'Menu', action: 'setOpen', args: [true] }] });
  expect(opened.ok, opened.error?.message).toBe(true);
  expect(document.getElementById('nav-trigger')?.getAttribute('aria-expanded')).toBe('true');

  const closed = await agent.act({ steps: [{ ref: 'Menu', action: 'setOpen', args: [false] }] });
  expect(closed.ok, closed.error?.message).toBe(true);
  expect(document.getElementById('nav-trigger')?.getAttribute('aria-expanded')).toBe('false');
});

test('an agent can flip the theme and the app sees the change as the agent\'s', async () => {
  const toggle = document.querySelector('ui-toggle') as HTMLElement & { pressed: boolean };
  const sources: unknown[] = [];
  toggle.addEventListener('pressedchange', (event) => {
    sources.push((event as CustomEvent<{ source?: unknown }>).detail.source);
  });

  const result = await agent.act({ steps: [{ ref: 'Dark theme', action: 'setPressed', args: [true] }] });
  expect(result.ok, result.error?.message).toBe(true);
  expect(toggle.pressed).toBe(true);
  expect(sources).toContain('agent');
});
