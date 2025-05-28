import { test } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { SearchField } from '@/web_ui/components/Header/SearchField';

export class Header extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  public readonly searchField = new SearchField(this.page);

  private readonly hamburgerMenu = this.elementsHelper.getElementById(
    'imdbHeader-navDrawerOpen',
  );

  async clickOnHamburgerMenu(): Promise<void> {
    await test.step('Click on hamburger menu', async () => {
      await this.hamburgerMenu.click();
    });
  }
}
