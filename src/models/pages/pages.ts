import { createStore } from 'effector';
import { PageType } from '../../global';
import { selectDocumentById } from '../document/document.events';
import { removePage, selectPage } from './pages.events';

export const $selectedPage = createStore<PageType | null>(null)
  .on(selectPage, (_, page) => page)
  .on(removePage, (data, { page }) => (data?.id === page.id ? null : data));

  $selectedPage.on(selectDocumentById, () => null);
