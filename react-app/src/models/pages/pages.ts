import { Base64 } from 'js-base64';
import { createEvent, createStore } from 'effector';
import { PageType } from '../../global';

const $pages = createStore<PageType[]>([]);
const addPage = createEvent<PageType>();
const dropAllPages = createEvent<void>();
const replaceAllPages = createEvent<PageType[]>();

$pages
  .on(addPage, (state, value) => [...state, value])
  .on(dropAllPages, () => [])
  .on(replaceAllPages, (_, value) => value);

$pages.watch((state) => {
  const dataHash = Base64.encode(JSON.stringify(state));
  window.location.hash = dataHash;
});

export { $pages, addPage, dropAllPages, replaceAllPages };
