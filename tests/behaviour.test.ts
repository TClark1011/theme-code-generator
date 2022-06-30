import test, { expect } from '@playwright/test';
import { isElementOnScreen } from './testUtils';
import { CTA_BUTTON_TEXT } from './testConstants';

test('CTA Button scrolls to main', async ({ page }) => {
  await page.emulateMedia({
    reducedMotion: 'reduce',
  }); //? We use reduced motion because the smooth scrolling links break the tests

  await page.goto('/');

  const landingPage = await page.locator('section:has(h1)');
  const coreContent = await page.locator('section:has(h2)');

  await expect(await landingPage.evaluate(isElementOnScreen)).toBeTruthy();
  await expect(await coreContent.evaluate(isElementOnScreen)).toBeFalsy();

  await landingPage.locator(`"${CTA_BUTTON_TEXT}"`).click();

  await expect(await landingPage.evaluate(isElementOnScreen)).toBeFalsy();
  await expect(await coreContent.evaluate(isElementOnScreen)).toBeTruthy();
});
