import { expect, test } from '@playwright/test';

test('Page Loads', async ({ page }) => {
  await page.goto('/');
});

test('Page Has Basic Content', async ({ page }) => {
  await page.goto('/');

  const mainHeading = await page.locator('h1');
  await expect(mainHeading).toHaveText('Design Variables');

  const documentTitle = await page.title();
  expect(documentTitle).toBe('Design Variables');
});
