import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';
import { Page, test } from '@playwright/test';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { ChartType } from '@/common/typedefs/charts.typedefs';

export class ChartsPage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly getFilmByTitle = (filmTitle: string) =>
    this.elementsHelper
      .getElementByClass('ipc-title-link-wrapper')
      .filter({ hasText: filmTitle });

  constructor(page: Page, chart: ChartType) {
    super(page);
    this.url = ROUTES.charts(chart);
  }

  async clickOnFilmByTitleAndPosition(options: {
    filmTitle: string;
    position: number;
  }): Promise<void> {
    await test.step(`Click on film by title and position`, async () => {
      const { filmTitle, position } = options;
      const filmTitleWithPosition = `${position}. ${filmTitle}`;

      await this.getFilmByTitle(filmTitleWithPosition).click();
    });
  }
}
