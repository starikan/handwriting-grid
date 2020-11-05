import { Base64 } from 'js-base64';

import { replaceAllPages } from './pages';
import { samplePages } from './samplePage';

try {
  const dataHash = JSON.parse(Base64.decode(window.location.hash));
  replaceAllPages(dataHash.length ? dataHash : samplePages);
} catch (error) {
  console.log(error);
  replaceAllPages(samplePages);
}
