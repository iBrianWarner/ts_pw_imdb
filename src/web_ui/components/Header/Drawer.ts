import { test } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { MenuItems } from '@/common/typedefs/menuItems.typedefs';

export class Drawer extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly drawer = this.page.getByTestId('drawer');

  private readonly getMenuItemByText = (menuItem: MenuItems) =>
    this.drawer.locator('a').filter({ hasText: menuItem });

  async waitForVisible(): Promise<void> {
    await test.step('Wait for drawer to be visible', async () => {
      await this.drawer.first().waitFor();
    });
  }

  async clickOnMenuItem(menuItem: MenuItems): Promise<void> {
    await test.step(`Click on menu item: ${menuItem}`, async () => {
      await this.getMenuItemByText(menuItem).first().click();
    });
  }
}
