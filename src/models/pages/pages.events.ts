import { createEvent } from "effector";
import { DocumentType, PageType } from "../../global";

export const removePage = createEvent<{ document: DocumentType; page: PageType }>();
export const addPage = createEvent<{ document: DocumentType; afterPage?: PageType; newPage?: PageType }>();
export const selectPage = createEvent<PageType>();