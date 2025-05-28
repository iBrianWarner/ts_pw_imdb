/* eslint-disable playwright/no-wait-for-timeout */
/* eslint-disable playwright/no-conditional-in-test */
import { expect, Page, test } from '@playwright/test';
import { Header } from '@/web_ui/components/Header/Header';
import { Drawer } from '@/web_ui/components/Header/Drawer';

export abstract class BasePage {
  abstract url: string;

  readonly page: Page;

  readonly header: Header;

  readonly drawer: Drawer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(this.page);
    this.drawer = new Drawer(this.page);
  }

  get pageName(): string {
    return this.constructor.name.replace('Page', '');
  }

  private generateUrlWithParameters(
    url: string,
    parameters: Record<string, string>,
  ): string {
    let newUrl = `${url}?`;

    newUrl += Object.keys(parameters).map(key => `${key}=${parameters[key]}&`);

    return newUrl.slice(0, -1).replace(',', '');
  }

  async goto(url?: string): Promise<void> {
    await test.step(`Go to ${this.pageName} page`, async () => {
      await this.page.goto(url || this.url);
    });
  }

  async visit(url?: string): Promise<void> {
    await test.step(`Visit ${this.pageName} page`, async () => {
      await this.goto(url || this.url);
      await this.assertOpened(url || this.url);
    });
  }

  async assertOpened(
    url?: string | RegExp,
    parameters?: Record<string, string>,
  ): Promise<void> {
    await test.step(`Assert ${this.pageName} page url is correct`, async () => {
      let urlToAssert = url ?? this.url;

      if (parameters && typeof urlToAssert === 'string') {
        urlToAssert = this.generateUrlWithParameters(urlToAssert, parameters);
      }

      await this.page.waitForURL(urlToAssert, { waitUntil: 'commit' });
      await expect(this.page).toHaveURL(urlToAssert ?? this.url);
    });
  }

  async assertUrlIncludes(expectedUrl: string): Promise<void> {
    await test.step('Assert page url includes expected url', () => {
      expect(this.page.url()).toContain(expectedUrl);
    });
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await test.step(`Wait for ${timeout}ms`, async () => {
      await this.page.waitForTimeout(timeout);
    });
  }
}
