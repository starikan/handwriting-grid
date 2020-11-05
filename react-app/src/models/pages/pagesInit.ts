import { createStore } from 'effector';
import { Base64 } from 'js-base64';

import { PageType } from '../../Page/Page';
import { samplePages } from './samplePage';

const hash = window.location.hash;
let dataHash = samplePages;
try {
  dataHash = JSON.parse(Base64.decode(hash));
} catch (error) {
  console.log(error)
  // Nothing
}

export const $pages = createStore<PageType[]>(dataHash);
