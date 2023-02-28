import { PageType } from '../../global';
import { selectDocumentById } from '../document/document.events';
import { removePage, selectPage } from './pages.events';

import { createDomain } from 'effector';
import { attachLogger } from 'effector-logger/attach';

const app = createDomain('pages');

export const $selectedPage = app
  .createStore<PageType | null>(null)
  .on(selectPage, (_, page) => page)
  .on(removePage, (data, { page }) => (data?.id === page.id ? null : data))
  .on(selectDocumentById, () => null);

attachLogger(app, {
  reduxDevtools: 'enabled',
  console: 'enabled',
  inspector: 'enabled',
});
