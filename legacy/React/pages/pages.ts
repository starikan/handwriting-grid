import crypto from 'crypto';

import { Base64 } from 'js-base64';
import { createEvent, createStore } from 'effector';
import { pagesInit } from './pagesInit';
import { PageType } from '../../global.d.legacy';

const defaultPage: PageType = {
  id: crypto.randomBytes(6).toString('hex'),
  width: 21,
  height: 29.7,
  visible: true,
  blocks: [],
};

const replaceHash = (data: PageType[]) => {
  const dataHash = Base64.encode(JSON.stringify(data));
  window.location.hash = dataHash;
};

export const $pages = createStore<PageType[]>(pagesInit());

export const addPage = createEvent<{ id?: string; pageData?: Partial<PageType> }>();
export const removePage = createEvent<string>();
export const dropAllPages = createEvent<unknown>();
export const replaceAllPages = createEvent<PageType[]>();
// export const changeOrderPage = createEvent<unknown>();
// export const setDimensionsPage = createEvent<unknown>();
// export const setColorPage = createEvent<unknown>();
// export const setBlockParamsPage = createEvent<unknown>();
// export const setShapePage = createEvent<unknown>();
// export const setVisiblePage = createEvent<unknown>();
// export const setRotatePage = createEvent<unknown>();
export const switchLandscapePortrait = createEvent<unknown>();
// export const printPage = createEvent<unknown>();
// export const savePageToImage = createEffect<unknown>();
// export const sharePage = createEffect<unknown>();
// export const postPageToURL = createEffect<unknown>();
// export const getPageFromURL = createEffect<unknown>();

$pages
  .on(addPage, (state, { pageData, id }) => [...state, { ...defaultPage, ...(pageData || {}) }])
  .on(removePage, (state, id) => state.filter((page) => page.id !== id))
  .on(dropAllPages, () => {
    replaceHash([]);
    return [];
  })
  .on(replaceAllPages, (_, value) => value)
  .on(switchLandscapePortrait, (state, id) => {
    return state.map((page) => {
      if (page.id === id) {
        const { width, height } = page;
        page.width = height;
        page.height = width;
      }
      return { ...page };
    });
  })
  .watch((state) => replaceHash(state));
