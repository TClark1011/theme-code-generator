import { chromium } from '@playwright/test';
import { spawn } from 'child_process';

const PORT = '3010';

(async () => {
  const devServerInstance = await spawn('next', ['dev', '-p', PORT]);
  devServerInstance.on('spawn', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      screen: {
        height: 627,
        width: 1200,
      },
      viewport: {
        height: 627,
        width: 1200,
      },
    });

    await page.goto(`localhost:${PORT}`);

    await page.screenshot({
      path: 'public/og-image.jpg',
    });

    console.log('Generated Metadata Image');

    await browser.close();
    await devServerInstance.kill();
  });
})().then(() => 5);

export {};
