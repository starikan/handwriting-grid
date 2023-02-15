import { DocumentType, PageType } from '../../global';

export const documentsInit = (): DocumentType[] => [];

export const generateRandomDocument = (): DocumentType => {
  const id = Math.floor(10000 * Math.random()).toString();
  return {
    id,
    apiVersion: 1,
    pages: [generateRandomPage(), generateRandomPage()],
    name: 'Give me a name!',
  };
};

export const generateRandomPage = (): PageType => {
  const id = Math.floor(10000 * Math.random()).toString();
  return {
    id,
    blocks: [],
    size: {
      width: 100,
      height: 100,
      dimension: 'px',
    },
  };
};
