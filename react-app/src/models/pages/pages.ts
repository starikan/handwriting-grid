import { createEvent } from 'effector';
import { PageType } from '../../Page/Page';

import { $pages } from './pagesInit';

const addPage = createEvent<PageType>();

$pages.on(addPage, (state, value) => [...state, value]);

export { $pages };
