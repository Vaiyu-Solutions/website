import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/about/',
  '/academia/',
  '/announcements/',
  '/blog/',
  '/blog/20261119-three-questions-ai-scope/',
  '/contact/',
  '/crm/',
  '/energy-and-utilities/',
  '/hospitality/',
  '/services/',
  '/sovereign-ai/',
  '/work/',
  '/404.html',
];

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  for (const route of routes) {
    test(`${route} shows the nav inline, hides the menu trigger, and logs no errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      await page.goto(route);
      await expect(page.locator('#site-nav nav')).toBeVisible();
      await expect(page.locator('#nav-trigger')).toBeHidden();
      await expect(page.locator('#theme-toggle')).toBeVisible();
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflows).toBe(false);
      expect(errors).toEqual([]);
    });

    test(`${route} names every button and link`, async ({ page }) => {
      await page.goto(route);
      for (const button of await page.getByRole('button').all()) {
        await expect(button).toHaveAccessibleName(/\S/);
      }
      for (const link of await page.getByRole('link').all()) {
        await expect(link).toHaveAccessibleName(/^(?!.*[↗→]).*\S/);
      }
    });

    test(`${route} wraps every link in a ui-button`, async ({ page }) => {
      test.skip(route.startsWith('/announcements/'), 'redirect stub; its target is checked under /blog/');
      await page.goto(route);
      const unwrapped = await page.evaluate(() =>
        [...document.querySelectorAll('a[href]')]
          .filter((a) => !a.closest('ui-button'))
          .map((a) => a.outerHTML.slice(0, 120)),
      );
      expect(unwrapped).toEqual([]);
      const upgraded = await page.evaluate(() => customElements.get('ui-button') !== undefined);
      expect(upgraded).toBe(true);
    });

    test(`${route} gives every tab stop a visible focus ring`, async ({ page }) => {
      test.skip(route.startsWith('/announcements/'), 'redirect stub; its target is checked under /blog/');
      await page.goto(route);
      for (let i = 0; i < 80; i++) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          return {
            label: `${el.tagName} ${(el.textContent || '').trim().slice(0, 40)}`,
            isBody: el === document.body,
            focusVisible: el.matches(':focus-visible'),
            outlineStyle: getComputedStyle(el).outlineStyle,
          };
        });
        if (focused.isBody) break;
        expect(focused.focusVisible, focused.label).toBe(true);
        expect(focused.outlineStyle, focused.label).toBe('solid');
      }
    });

    test(`${route} changes every link and button on hover`, async ({ page }) => {
      test.skip(route.startsWith('/announcements/'), 'redirect stub; its target is checked under /blog/');
      await page.goto(route);
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
      const controls = page.locator('main a, header a, header button, footer a');
      const count = Math.min(await controls.count(), 12);
      const signature = (i: number) =>
        controls.nth(i).evaluate((el) => {
          const sig = (e: Element) => {
            const s = getComputedStyle(e);
            return [s.color, s.textDecorationColor, s.translate, s.transform, s.filter, s.textDecorationLine, s.backgroundColor, s.opacity, s.borderTopColor].join('|');
          };
          const group = el.closest('.group');
          const inside = [...el.querySelectorAll('*')].map(sig).join(';');
          return [sig(el), group ? sig(group) : '', inside].join('#');
        });
      for (let i = 0; i < count; i++) {
        const control = controls.nth(i);
        if (!(await control.isVisible())) continue;
        const before = await signature(i);
        await control.hover();
        const after = await signature(i);
        const label = (await control.textContent())?.trim().slice(0, 40);
        expect(after, `no hover change: ${label}`).not.toBe(before);
      }
    });
  }
});

test.describe('motion and touch', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('card lift is off under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/services/');
    const card = page.locator('div.group.border-t-2').first();
    await card.hover();
    await page.waitForTimeout(300);
    expect(await card.evaluate((el) => getComputedStyle(el).translate)).toBe('none');
  });

  test('card lift is on without reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/services/');
    const card = page.locator('div.group.border-t-2').first();
    await card.hover();
    await page.waitForTimeout(300);
    expect(await card.evaluate((el) => getComputedStyle(el).translate)).not.toBe('none');
  });

  test('links and buttons set touch action and tap highlight', async ({ page }) => {
    await page.goto('/');
    const values = await page.evaluate(() =>
      [...document.querySelectorAll('a, button')].map((el) => {
        const cs = getComputedStyle(el);
        return [cs.touchAction, cs.getPropertyValue('-webkit-tap-highlight-color')];
      }),
    );
    expect(values.length).toBeGreaterThan(0);
    for (const [touch, tap] of values) {
      expect(touch).toBe('manipulation');
      expect(tap).toBe('rgba(0, 0, 0, 0)');
    }
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const route of routes) {
    test(`${route} menu opens from the keyboard, Tab enters it, Escape closes it`, async ({ page }) => {
      await page.goto(route);
      const trigger = page.locator('#nav-trigger');
      await expect(page.locator('#site-nav')).toBeHidden();

      await trigger.focus();
      await page.keyboard.press('Enter');
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#site-nav')).toBeVisible();

      await page.keyboard.press('Tab');
      await expect(page.locator('#site-nav nav a').first()).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(trigger).toBeFocused();
      await expect(page.locator('#site-nav')).toBeHidden();
    });
  }

  test('theme toggle is pressed in dark, flips the theme, and persists', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const toggle = page.locator('#theme-toggle');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAccessibleName('Dark theme');

    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveClass(/theme-light/);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light');

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/theme-light/);
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('primary call to action', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('Enter follows the link', async ({ page }) => {
    await page.goto('/');
    await page.locator('main ui-button a').first().focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/contact\/$/);
  });

  test('Space does not follow the link', async ({ page }) => {
    await page.goto('/');
    await page.locator('main ui-button a').first().focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });

  test('the header renders its links, and the menu and theme controls stay hidden', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#site-nav nav')).toBeVisible();
    await expect(page.locator('#site-nav nav a').first()).toBeVisible();
    await expect(page.locator('#nav-trigger')).toBeHidden();
    await expect(page.locator('#theme-toggle')).toBeHidden();
    await expect(page.locator('main ui-button a').first()).toHaveAttribute('href', '/contact/');
  });
});

// WCAG contrast from computed colours, as ui-sdk's colour rule states it.
const luminance = ([r, g, b]: number[]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const parseRgb = (value: string) => (value.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
const contrast = (fg: string, bg: string) => {
  const [a, b] = [luminance(parseRgb(fg)), luminance(parseRgb(bg))].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
};

test.describe('ui-sdk contract on the header controls', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the trigger points at its panel and reports the panel state', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('#nav-trigger');
    await expect(trigger).toHaveAttribute('aria-controls', 'site-nav');
    await expect(page.locator('#site-nav')).toHaveAttribute('data-closed', '');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#site-nav')).toHaveAttribute('data-open', '');
  });

  test('a closed panel is out of the tab order', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-trigger').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#theme-toggle')).toBeFocused();
  });

  test('Space toggles the menu and the theme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.locator('#nav-trigger').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#nav-trigger')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#nav-trigger')).toBeFocused();
    await page.keyboard.press('Space');
    await expect(page.locator('#nav-trigger')).toHaveAttribute('aria-expanded', 'false');
    await page.locator('#theme-toggle').focus();
    await page.keyboard.press('Space');
    await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('interactive colour contrast', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('focus rings reach 3:1 against the page in light mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.locator('#theme-toggle').focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    const { outline, bg } = await page.evaluate(() => ({
      outline: getComputedStyle(document.activeElement as Element).outlineColor,
      bg: getComputedStyle(document.body).backgroundColor,
    }));
    expect(contrast(outline, bg)).toBeGreaterThanOrEqual(3);
  });

  test('hovered navigation text reaches 4.5:1 in light mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
    const link = page.locator('#site-nav nav a', { hasText: 'Work' });
    await link.hover();
    const { color, bg } = await page.evaluate(() => {
      const a = [...document.querySelectorAll('#site-nav nav a')].find((el) => el.textContent?.trim() === 'Work') as Element;
      return { color: getComputedStyle(a).color, bg: getComputedStyle(document.body).backgroundColor };
    });
    expect(contrast(color, bg)).toBeGreaterThanOrEqual(4.5);
  });

  test('the primary call to action keeps 4.5:1 text on hover', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
    const cta = page.locator('main ui-button a').first();
    await cta.hover();
    const { color, bg } = await cta.evaluate((el) => ({
      color: getComputedStyle(el).color,
      bg: getComputedStyle(el).backgroundColor,
    }));
    expect(contrast(color, bg)).toBeGreaterThanOrEqual(4.5);
  });
});

test.describe('menu focus rules', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Shift+Tab from the first link returns to the trigger and keeps the menu open', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-trigger').focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page.locator('#site-nav nav a').first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('#nav-trigger')).toBeFocused();
    await expect(page.locator('#nav-trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  test('focus leaving the open menu closes it', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-trigger').focus();
    await page.keyboard.press('Enter');
    const linkCount = await page.locator('#site-nav nav a').count();
    for (let i = 0; i <= linkCount; i++) await page.keyboard.press('Tab');
    await expect(page.locator('#nav-trigger')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#site-nav')).toHaveAttribute('data-closed', '');
  });
});

test.describe('text contrast sweep', () => {
  const sweep = () =>
    document.body
      ? (() => {
          const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
          // The browser converts any colour syntax (color-mix, oklab) to sRGB, so no string parsing.
          const parse = (c: string) => {
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = c;
            ctx.fillRect(0, 0, 1, 1);
            const d = ctx.getImageData(0, 0, 1, 1).data;
            return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
          };
          const lum = (c: { r: number; g: number; b: number }) => {
            const [R, G, B] = [c.r, c.g, c.b].map((v) => {
              const x = v / 255;
              return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
            });
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
          };
          const hidden = (el: Element) => !!el.closest('[aria-hidden="true"]');
          const opacityOf = (el: Element) => {
            let o = 1;
            for (let e: Element | null = el; e; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
            return o;
          };
          const backdrop = (el: Element) => {
            const layers: { r: number; g: number; b: number; a: number }[] = [];
            let base: { r: number; g: number; b: number } | null = null;
            for (let e: Element | null = el; e && !base; e = e.parentElement) {
              const c = parse(getComputedStyle(e).backgroundColor);
              if (c.a === 0) continue;
              if (c.a >= 1) base = c;
              else layers.push(c);
            }
            let out = base ?? { r: 248, g: 249, b: 251 };
            for (const l of layers.reverse()) {
              out = { r: l.a * l.r + (1 - l.a) * out.r, g: l.a * l.g + (1 - l.a) * out.g, b: l.a * l.b + (1 - l.a) * out.b };
            }
            return out;
          };
          const failures: { text: string; ratio: number; color: string }[] = [];
          for (const el of Array.from(document.querySelectorAll('body *'))) {
            if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName) || hidden(el)) continue;
            const ownText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? '').trim() !== '');
            if (!ownText) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width < 2 || rect.height < 2) continue;
            const fg = parse(getComputedStyle(el).color);
            const alpha = fg.a * opacityOf(el);
            if (alpha === 0) continue;
            const bg = backdrop(el);
            const mixed = { r: alpha * fg.r + (1 - alpha) * bg.r, g: alpha * fg.g + (1 - alpha) * bg.g, b: alpha * fg.b + (1 - alpha) * bg.b };
            const [a, b] = [lum(mixed), lum(bg)].sort((x, y) => y - x);
            const ratio = (a + 0.05) / (b + 0.05);
            if (ratio < 4.5) {
              failures.push({ text: (el.textContent ?? '').trim().slice(0, 50), ratio: Math.round(ratio * 100) / 100, color: getComputedStyle(el).color });
            }
          }
          return failures;
        })()
      : [];

  for (const scheme of ['light', 'dark'] as const) {
    for (const route of routes) {
      test(`${route} text meets 4.5:1 in ${scheme} mode`, async ({ page }) => {
        test.skip(route.startsWith('/announcements/'), 'redirect stub; its target is checked under /blog/');
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(route);
        const failures = await page.evaluate(sweep);
        expect(failures).toEqual([]);
      });
    }
  }
});
