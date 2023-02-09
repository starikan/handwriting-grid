import { createStore, createEvent } from 'effector';
import { PageType } from '../../global';
import { documentsInit } from './documentInit';

// Define the structure of DocumentType
export interface DocumentType {
  // document ID, required field
  id: string;

  // document name, optional field
  name?: string;

  // an array of pages, required field
  pages: Array<string | PageType>;

  // short link to document, optional field
  shortLink?: string;
}

// Create store to hold the array of DocumentType objects
export const $documents = createStore<DocumentType[]>(documentsInit());

export const addDocument = createEvent<DocumentType>();
export const removeDocument = createEvent<string>();
export const modifyDocument = createEvent<{ id: string; document: Partial<DocumentType> }>();

$documents
  .on(addDocument, (state, document) => [...state, document])
  .on(removeDocument, (state, id) => state.filter((document) => document.id !== id))
  .on(modifyDocument, (state, { id, document }) =>
    state.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          ...document,
        };
      }
      return doc;
    }),
  );

// TODO: 2023-02-08 S.Starodubov реактивность
// Function to find a document in the store by its id
export const findDocumentById = (id: string) => {
  const result = $documents.map((documents) => documents.find(document => document.id === id)).getState();
  return result;
};

// Function to find a document in the store by its name
export const findDocumentByName = (name: string) => {
  const result = $documents.map((documents) => documents.find(document => document.name === name)).getState();
  return result;
};
