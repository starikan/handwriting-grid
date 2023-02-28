import { createEvent } from "effector";
import { DocumentType } from "../../global";

export const addDocument = createEvent<DocumentType>();
export const removeDocument = createEvent<string>();
export const modifyDocument = createEvent<{ id: string; document: Partial<DocumentType> }>();
export const selectDocumentById = createEvent<string>();