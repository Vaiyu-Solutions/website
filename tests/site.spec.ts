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
