import { MenuItems } from '@/common/typedefs/menuItems.typedefs';
import { test } from '@pw_tests/e2e/Films_Rating/fixtures';

test.describe('IMDb catalogue', () => {
  test('should provide ability to observe top 250 movies', async ({
    homePage,
    chartsPage,
    filmPage,
    filmTestData: { name, uuid, rating, year },
  }) => {
    await homePage.visit();
    await homePage.header.clickOnHamburgerMenu();
    await homePage.drawer.waitForVisible();
    await homePage.drawer.clickOnMenuItem(MenuItems.Top250Movies);

    await chartsPage.assertOpened();
    await chartsPage.clickOnFilmByTitleAndPosition({
      filmTitle: name,
      position: 1,
    });

    await filmPage.assertFilmTitleIsVisible(name);
    await filmPage.assertUrlIncludes(uuid);
    await filmPage.assertFilmRating(rating);
    await filmPage.assertReleaseYear(year);
  });
});
