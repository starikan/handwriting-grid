import { createStore, createEvent, sample, combine } from 'effector';
import { DocumentType, PageType } from '../../global';
import { documentsInit, generatePage } from './documentInit';

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
export const addPage = createEvent<{ document: DocumentType; afterPage?: PageType; newPage?: PageType }>();

export const $currentPages = createStore<PageType[]>([]);
sample({
  source: $currentDocument,
  clock: [removePage, addPage, $currentDocument],
  fn: (src) => src?.pages ?? [],
  target: $currentPages,
});

export const selectPage = createEvent<PageType>();
export const $selectedPage = createStore<PageType | null>(null)
  .on(selectPage, (_, page) => page)
  .on(removePage, (data, { page }) => (data?.id === page.id ? null : data))
  .on(selectDocumentById, () => null);

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

sample({
  clock: selectDocumentById,
  target: $currentDocumentId,
});
