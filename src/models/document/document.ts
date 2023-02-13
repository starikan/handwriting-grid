import { createStore, createEvent, sample, combine } from 'effector';
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
export const $currentDocumentId = createStore<string | null>(null);
export const $currentDocument = combine(
  $currentDocumentId,
  $documents,
  (id, docs) => docs.find((v) => v.id === id) ?? null,
);

export const addDocument = createEvent<DocumentType>();
export const removeDocument = createEvent<string>();
export const modifyDocument = createEvent<{ id: string; document: Partial<DocumentType> }>();
export const selectDocumentById = createEvent<string>();

$documents
  .on(addDocument, (state, document) => [...state, document])
  .on(removeDocument, (state, id) => state.filter((document) => document.id !== id))
  .on(modifyDocument, (state, { id, document }) => state.map((doc) => (doc.id === id ? { ...doc, ...document } : doc)));

sample({
  clock: selectDocumentById,
  target: $currentDocumentId,
});
