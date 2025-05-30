import { PwProjectName } from '@/common/allure/allure.typedefs';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

const envFilesPath = './environment';
const envType = process.env.ENV_TYPE || '';
const isCi = envType === 'ci';

if (fs.existsSync(`${envFilesPath}/.env.${process.env.ENV_TYPE}`)) {
  dotenv.config({
    path: `${envFilesPath}/.env.${process.env.ENV_TYPE}`,
  });
} else {
  throw new Error(`
Missing config file ${envFilesPath}/.env.${process.env.ENV_TYPE}, create from sample if available.
`);
}

export default defineConfig({
  timeout: isCi ? 60000 : 30000,
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: isCi ? 1 : 0,
  workers: isCi ? 3 : 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-testid',
  },
  expect: { timeout: 10000 },
  snapshotPathTemplate:
    './resources/playwright-snapshots/{testFileDir}/{arg}.png',
  projects: [
    {
      name: PwProjectName.Chromium,
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [/mobile.spec.ts/],
    },
    {
      name: PwProjectName.Android,
      use: {
        ...devices['Pixel 5'],
      },
      testMatch: `**.android.mobile.spec.ts`,
      testIgnore: /ios.mobile.spec.ts/,
    },
    {
      name: PwProjectName.IOS,
      use: {
        ...devices['iPhone 13 Pro Max'],
        defaultBrowserType: 'chromium',
      },
      testMatch: '**.mobile.spec.ts',
      testIgnore: /android.mobile.spec.ts/,
    },
  ],
});
