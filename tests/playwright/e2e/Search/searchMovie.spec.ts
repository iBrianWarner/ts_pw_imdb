import { test } from '@pw_tests/e2e/Search/fixtures';

test.describe('IMDb search', () => {
  test('should provide ability to search for a movie and open movie details page', async ({
    homePage,
    searchResultsPage,
    filmPage,
    filmTestData: { name, uuid },
  }) => {
    await homePage.visit();
    await homePage.header.searchField.assertVisible();
    await homePage.header.searchField.searchFilmAndPressEnter(name);

    await searchResultsPage.assertOpened();
    await searchResultsPage.assertSearchResultsVisible();
    await searchResultsPage.clickOnFilm(name);

    await filmPage.assertFilmTitleIsVisible(name);
    await filmPage.assertUrlIncludes(uuid);
  });
});
