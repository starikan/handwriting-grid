import { Base64 } from 'js-base64';
import { createEvent, createStore } from 'effector';
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
  id: '111',
  width: 500,
  height: 500,
  visible: true,
  blocks: [],
};

export const $pages = createStore<PageType[]>([]);

export const addPage = createEvent<Partial<PageType>>();
export const removePage = createEvent<unknown>();
export const dropAllPages = createEvent<unknown>();
export const replaceAllPages = createEvent<PageType[]>();

$pages
  .on(addPage, (state, value = {}) => [...state, {...defaultPage, ...value}])
  .on(removePage, () => {})
  .on(dropAllPages, () => [])
  .on(replaceAllPages, (_, value) => value);

$pages.watch((state) => {
  const dataHash = Base64.encode(JSON.stringify(state));
  window.location.hash = dataHash;
});
