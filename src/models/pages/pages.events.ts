import { DocumentType, PageType } from "../../global";
import { pagesDomain } from "./pages.domains";

export const removePage = pagesDomain.createEvent<{ document: DocumentType; page: PageType }>();
export const addPage = pagesDomain.createEvent<{ document: DocumentType; afterPage?: PageType; newPage?: PageType }>();
export const selectPage = pagesDomain.createEvent<PageType>();