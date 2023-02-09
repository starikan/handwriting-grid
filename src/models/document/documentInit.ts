import { DocumentType } from './document';

export const documentsInit = (): DocumentType[] => [];

export const generateRandomDocument = (): DocumentType => {
  const id = Math.floor(10000 * Math.random()).toString();
  return {
    id,
    pages: [],
    name: id,
  };
};
