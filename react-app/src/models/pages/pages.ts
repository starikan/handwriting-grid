import { Base64 } from 'js-base64';
import { createEvent } from 'effector';
import { PageType } from '../../Page/Page';

import { $pages } from './pagesInit';

const addPage = createEvent<PageType>();

$pages.on(addPage, (state, value) => [...state, value]);

$pages.watch((state) => {
  const dataHash = Base64.encode(JSON.stringify(state));
  window.location.hash = dataHash;
});

export { $pages };
