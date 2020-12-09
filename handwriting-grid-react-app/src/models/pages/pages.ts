import crypto from 'crypto';

import { Base64 } from 'js-base64';
import { createEvent, createStore } from 'effector';
import { pagesInit } from './pagesInit';

export interface PageType {
  id: string;
  width: number;
  height: number;
  visible: boolean;
  blocks: string[];
  color?: string;
  padding?: number;
  margin?: number;
  border?: number;
  shape?: unknown;
  angle?: number;
  externalUrl?: string;
}

const defaultPage: PageType = {
  id: crypto.randomBytes(6).toString('hex'),
  width: 500,
  height: 500,
  visible: true,
  blocks: [],
};

const replaceHash = (data: PageType[]) => {
  const dataHash = Base64.encode(JSON.stringify(data));
  window.location.hash = dataHash;
};

export const $pages = createStore<PageType[]>(pagesInit());

export const addPage = createEvent<Partial<PageType>>();
export const removePage = createEvent<unknown>();
export const dropAllPages = createEvent<unknown>();
export const replaceAllPages = createEvent<PageType[]>();

$pages
  .on(addPage, (state, value = {}) => [...state, { ...defaultPage, ...value }])
  .on(removePage, () => {})
  .on(dropAllPages, () => {
    replaceHash([]);
    return [];
  })
  .on(replaceAllPages, (_, value) => value)
  .watch((state) => replaceHash(state));
