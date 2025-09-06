import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders key sections', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');

    await expect(page).toHaveTitle(/Chess Victoria/i);

    await expect(page.locator('a[href="/"]').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Welcome to Chess Victoria/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Our Events Scheduled/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Current Executive Committee Members/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Victorian chess clubs/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Latest updates in Chess Victoria/i })).toBeVisible();

    // Note: We collect console errors for debugging but do not fail the test on them
    if (consoleErrors.length) {
      console.warn('Console errors observed on homepage:\n' + consoleErrors.join('\n'));
    }
  });
});


