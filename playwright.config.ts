import { PlaywrightTestConfig } from '@playwright/test';

const PORT = 3010;
const URL = `http://localhost:${PORT}`;
const COMMAND = process.env.TEST_ON_DEV === 'true' ? 'dev' : 'start';

const config: PlaywrightTestConfig = {
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: URL,
  },
  webServer: {
    command: `PORT=${PORT} yarn ${COMMAND}`,
    url: URL,
    env: {
      IS_TESTING: 'true',
    },
  },
};

export default config;
