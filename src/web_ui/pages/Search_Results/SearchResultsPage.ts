import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';
import { Page, expect, test } from '@playwright/test';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class SearchResultsPage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly searchResults = this.page.getByTestId(
    'find-results-section-title',
  );

  private readonly getFilmByName = (filmName: string) =>
    this.elementsHelper
      .getElementByClass('ipc-metadata-list-summary-item__t')
      .filter({ hasText: filmName });

  constructor(page: Page, filmName: string) {
    super(page);
    this.url = ROUTES.searchResultsPage(filmName);
  }

  async assertSearchResultsVisible(): Promise<void> {
    await test.step('Assert search results are visible', async () => {
      await expect(this.searchResults).toBeVisible();
    });
  }

  async clickOnFilm(filmName: string): Promise<void> {
    await test.step(`Click on film: ${filmName}`, async () => {
      await this.getFilmByName(filmName).first().click();
    });
  }
}
