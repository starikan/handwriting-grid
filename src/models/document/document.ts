import { sample, combine } from 'effector';
import { DocumentType, PageType } from '../../global';
import { addPage, documentsDomain, removePage } from '..';
import { generatePage } from './documentUtils';
import { addDocument, modifyDocument, removeDocument, selectDocumentById } from './document.events';

// Create store to hold the array of DocumentType objects
export const $documents = documentsDomain.createStore<DocumentType[]>([])
  .on(addDocument, (state, document) => [document, ...state])
  .on(removeDocument, (state, id) => state.filter((document) => document.id !== id))
  .on(modifyDocument, (state, { id, document }) => state.map((doc) => (doc.id === id ? { ...doc, ...document } : doc)))
  .on(removePage, (state, { document, page }) => {
    const targetDocument = state.find((doc) => doc.id === document.id);
    if (targetDocument) {
      targetDocument.pages = targetDocument.pages.filter((v) => v.id !== page.id);
      return state;
    }
  })
  .on(addPage, (state, { document, afterPage, newPage }) => {
    const targetDocument = state.find((doc) => doc.id === document.id);
    if (!targetDocument) {
      return;
    }

    const newPageResolved = newPage ?? generatePage();

    if (afterPage) {
      const { id } = afterPage;
      const index = targetDocument.pages.findIndex((v) => v.id === id);
      targetDocument.pages = [
        ...targetDocument.pages.slice(0, index + 1),
        newPageResolved,
        ...targetDocument.pages.slice(index + 1),
      ];
    } else {
      targetDocument.pages = [newPageResolved, ...targetDocument.pages];
    }

    return state;
  });

export const $currentDocumentId = documentsDomain.createStore<string | null>(null);
export const $currentDocument = combine(
  $currentDocumentId,
  $documents,
  (id, docs) => docs.find((v) => v.id === id) ?? null,
);
export const $currentPages = documentsDomain.createStore<PageType[]>([]);

sample({
  clock: selectDocumentById,
  target: $currentDocumentId,
});

sample({
  source: $currentDocument,
  clock: [removePage, addPage, $currentDocument],
  fn: (src) => src?.pages ?? [],
  target: $currentPages,
});
