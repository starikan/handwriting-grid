import { DocumentType } from "../../global";
import { documentsDomain } from "./documents.domains";

export const addDocument = documentsDomain.createEvent<DocumentType>();
export const removeDocument = documentsDomain.createEvent<string>();
export const modifyDocument = documentsDomain.createEvent<{ id: string; document: Partial<DocumentType> }>();
export const selectDocumentById = documentsDomain.createEvent<string>();