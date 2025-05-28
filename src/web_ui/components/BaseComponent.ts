import { test, expect, Locator, Page } from '@playwright/test';

export class BaseComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async pressKeyboardEnter(delay = 0): Promise<void> {
    await test.step('Press [Enter]', async () => {
      await this.page.keyboard.press('Enter', { delay });
    });
  }

  async assertLocatorHasScreenshot(
    locator: Locator,
    fileName: string,
  ): Promise<void> {
    await test.step('Assert locator screenshot', async () => {
      const isCi = process.env.ENV_TYPE === 'ci';

      await expect(locator).toHaveScreenshot(
        isCi ? `${fileName}-ci` : fileName,
        {
          omitBackground: true,
          maxDiffPixelRatio: 0.1,
        },
      );
    });
  }
}
