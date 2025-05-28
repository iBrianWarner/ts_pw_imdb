import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';
import { FilmCard } from '@/web_ui/components/Product/FilmCard';

export class HomePage extends BasePage {
  public readonly url = ROUTES.home;

  public readonly filmCard = new FilmCard(this.page);
}
