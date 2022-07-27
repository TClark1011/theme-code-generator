import { expect, test } from '@playwright/test';
import { CTA_BUTTON_TEXT } from './testConstants';

test('Page Loads', async ({ page }) => {
  await page.goto('/');
});

test('Page Has Basic Content', async ({ page }) => {
  await page.goto('/');

  const landingPageContainer = await page.locator('section:has(h1)');
  const mainHeading = await landingPageContainer.locator('h1');
  const description = await landingPageContainer.locator('p');
  const ctaButton = await landingPageContainer.locator('a');

  await expect(mainHeading).toHaveText('Design Variables');
  await expect(description).toHaveText(
    'Generate all the variables you need for your design system'
  );
  await expect(ctaButton).toHaveText(CTA_BUTTON_TEXT);

  const documentTitle = await page.title();
  expect(documentTitle).toBe('Design Variables');
});
