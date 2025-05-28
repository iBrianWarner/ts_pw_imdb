import { ChartType } from '@/common/typedefs/charts.typedefs';
import { ChartsPage } from '@/web_ui/pages/Charts/ChartsPage';
import { FilmPage } from '@/web_ui/pages/Film/FilmPage';
import { test as base } from '@pw_tests/fixtures/testScopeFixtures';

export const test = base.extend<{
  chartsPage: ChartsPage;
  filmPage: FilmPage;
  filmTestData: {
    name: string;
    uuid: string;
    rating: string;
    year: string;
  };
}>({
  chartsPage: [
    async ({ page }, use) => {
      const chartsPage = new ChartsPage(page, ChartType.Top250Movies);

      await use(chartsPage);
    },
    { scope: 'test' },
  ],
  filmPage: [
    async ({ page, filmTestData }, use) => {
      const filmPage = new FilmPage(page, filmTestData.uuid);

      await use(filmPage);
    },
    { scope: 'test' },
  ],
  filmTestData: [
    async ({}, use) => {
      const filmTestData = {
        name: 'The Shawshank Redemption',
        uuid: 'tt0111161',
        rating: '9.3',
        year: '1994',
      };

      await use(filmTestData);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
