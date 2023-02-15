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
  const width = Math.floor(700 * Math.random());
  return {
    id,
    blocks: [],
    size: {
      width,
      height: width * 1.5,
      dimension: 'px',
    },
  };
};
