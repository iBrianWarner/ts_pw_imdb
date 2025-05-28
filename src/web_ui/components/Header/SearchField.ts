import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class SearchField extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly searchField = this.page.getByTestId('suggestion-search');

  async assertVisible(): Promise<void> {
    await test.step('Assert search field is visible', async () => {
      await expect(this.searchField).toBeVisible();
    });
  }

  async fillSearchField(movieName: string): Promise<void> {
    await test.step(`Fill search field with movie name: ${movieName}`, async () => {
      await this.searchField.fill(movieName);
    });
  }

  async searchFilmAndPressEnter(movieName: string): Promise<void> {
    await this.fillSearchField(movieName);
    await this.pressKeyboardEnter();
  }
}
