import { PageType } from '../../global';
import { selectDocumentById } from '../document/document.events';
import { pagesDomain } from './pages.domains';
import { removePage, selectPage } from './pages.events';

export const $selectedPage = pagesDomain
  .createStore<PageType | null>(null)
  .on(selectPage, (_, page) => page)
  .on(removePage, (data, { page }) => (data?.id === page.id ? null : data))
  .on(selectDocumentById, () => null);

