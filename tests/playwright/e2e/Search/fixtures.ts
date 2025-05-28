import { FilmPage } from '@/web_ui/pages/Film/FilmPage';
import { SearchResultsPage } from '@/web_ui/pages/Search_Results/SearchResultsPage';
import { test as base } from '@pw_tests/fixtures/testScopeFixtures';

export const test = base.extend<{
  searchResultsPage: SearchResultsPage;
  filmPage: FilmPage;
  filmTestData: {
    name: string;
    uuid: string;
  };
}>({
  searchResultsPage: [
    async ({ page, filmTestData }, use) => {
      const searchResultsPage = new SearchResultsPage(page, filmTestData.name);

      await use(searchResultsPage);
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
        name: 'Inception',
        uuid: 'tt1375666',
      };

      await use(filmTestData);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
