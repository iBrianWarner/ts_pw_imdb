import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';
import { Page, expect, test } from '@playwright/test';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class FilmPage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly getFilmTitle = (filmTitle: string) =>
    this.page.getByTestId('hero__primary-text').filter({ hasText: filmTitle });

  private readonly filmRating = this.page.getByTestId(
    'hero-rating-bar__aggregate-rating__score',
  );

  private readonly filmReleaseYear = this.page.locator('[href*="releaseinfo"]');

  constructor(page: Page, filmUUID: string) {
    super(page);
    this.url = ROUTES.film(filmUUID);
  }

  async assertFilmTitleIsVisible(filmTitle: string): Promise<void> {
    await test.step(`Assert film title is visible: ${filmTitle}`, async () => {
      await expect(this.getFilmTitle(filmTitle)).toBeVisible();
    });
  }

  async assertFilmRating(rating: string): Promise<void> {
    await test.step(`Assert film rating is: ${rating}`, async () => {
      await expect(this.filmRating.first()).toContainText(rating);
    });
  }

  async assertReleaseYear(year: string): Promise<void> {
    await test.step(`Assert film release year is: ${year}`, async () => {
      await expect(this.filmReleaseYear.first()).toContainText(year);
    });
  }
}
