import { test, expect, Locator } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class FilmCard extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly addonCard =
    this.elementsHelper.getElementByClass('example-class');

  private getAddonCardByName(filmName: string | RegExp): Locator {
    return this.addonCard.filter({ hasText: filmName }).first();
  }

  async assertVisible(filmName: string | RegExp): Promise<void> {
    await test.step(`Assert film card for ${filmName} is visible`, async () => {
      await expect(this.getAddonCardByName(filmName)).toBeVisible();
    });
  }
}
