import { DocumentType, PageType } from '../../global';
import { addDocument } from './document.events';

export const documentsInit = (): DocumentType[] => [];

documentsInit().map(v => addDocument(v))