import { HomePage } from '@/web_ui/pages/Home/HomePage';
import { test as base } from '@pw_tests/fixtures/workerScopeFixtures';

export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: [
    async ({ page }, use) => {
      const storePage = new HomePage(page);

      await use(storePage);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
