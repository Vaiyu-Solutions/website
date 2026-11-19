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
        await expect(link).toHaveAccessibleName(/\S/);
      }
    });
  }
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
    await page.locator('ui-button a').first().focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/contact\/$/);
  });

  test('Space does not follow the link', async ({ page }) => {
    await page.goto('/');
    await page.locator('ui-button a').first().focus();
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
    await expect(page.locator('ui-button a').first()).toHaveAttribute('href', '/contact/');
  });
});
