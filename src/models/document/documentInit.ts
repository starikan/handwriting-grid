import { DocumentType } from '../../global';
import { addDocument } from './document.events';

export const documentsInit = (): DocumentType[] => [];

documentsInit().map(v => addDocument(v))