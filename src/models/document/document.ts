import { createStore, createEvent, sample, combine } from 'effector';
import { DocumentType, PageType } from '../../global';
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

export const removePage = createEvent<{ document: DocumentType; page: PageType }>();

export const $currentPages = createStore<PageType[]>([]);
sample({
  source: $currentDocument,
  clock: [removePage, $currentDocument],
  fn: (src) => src?.pages ?? [],
  target: $currentPages,
});

$documents
  .on(addDocument, (state, document) => {
    console.log(document);
    return [...state, document];
  })
  .on(removeDocument, (state, id) => state.filter((document) => document.id !== id))
  .on(modifyDocument, (state, { id, document }) => state.map((doc) => (doc.id === id ? { ...doc, ...document } : doc)))
  .on(removePage, (state, { document, page }) => {
    const targetDocument = state.find((doc) => doc.id === document.id);
    if (targetDocument) {
      targetDocument.pages = targetDocument.pages.filter((v) => v.id !== page.id);
      return state;
    }
  });

sample({
  clock: selectDocumentById,
  target: $currentDocumentId,
});
