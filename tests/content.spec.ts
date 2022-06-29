import { test, expect } from '@playwright/test';

test('Main Content Renders', async ({ page }) => {
  await page.goto('/');
  const coreContent = await page.locator('#theme-code-generation');
  await coreContent.scrollIntoViewIfNeeded();

  const nextButton = await coreContent.locator('text=Next');
  const spacingButton = await coreContent.locator('text=Spacing');
  const colorButton = await coreContent.locator('text=Color');

  await expect(nextButton).toBeVisible();
  await expect(spacingButton).toBeVisible();
  await expect(colorButton).toBeVisible();
});
