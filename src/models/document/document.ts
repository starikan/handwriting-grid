import { createStore, createEvent, sample, combine } from 'effector';
import { DocumentType } from '../../global';
import { documentsInit } from './documentInit';

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
