import { DocumentType, PageType } from '../../global';
import { sizes } from '../pages/pageSizes';

export const generateRandomDocument = (): DocumentType => {
  const id = Math.floor(100000000 * Math.random()).toString();
  return {
    id,
    apiVersion: 1,
    pages: [generatePage()],
    name: 'Give me a name!',
  };
};

export const generatePage = (): PageType => {
  const id = Math.floor(100000000 * Math.random()).toString();
  return {
    id,
    blocks: [],
    size: sizes.A4,
  };
};
