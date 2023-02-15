import React from 'react';
import { useStore } from 'effector-react';
import {
  $documents,
  addDocument,
  removeDocument,
  modifyDocument,
  selectDocumentById,
  $currentDocument,
} from '../../models/document/document';
import { generateRandomDocument } from '../../models/document/documentInit';
import { Button } from '@mui/material';

export const DocumentList = () => {
  const documents = useStore($documents);
  const documentCurrent = useStore($currentDocument);

  const handleAddDocument = () => {
    addDocument(generateRandomDocument());
  };

  const handleRemove = (id: string) => {
    removeDocument(id);
  };

  const handleUpdate = (id: string, document: Partial<DocumentType>) => {
    modifyDocument({ id, document });
  };

  const handleFindById = (id: string) => {
    selectDocumentById(id);
  };

  return (
    <div>
      <h2>Document List</h2>

      <Button variant="outlined" onClick={() => handleAddDocument()}>
        Create
      </Button>

      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <p>{doc.name}</p>
            <Button variant="outlined" onClick={() => handleRemove(doc.id)}>
              Remove
            </Button>
            <Button variant="outlined" onClick={() => handleUpdate(doc.id, { name: 'Updated Document' })}>
              Update
            </Button>
            <Button variant="outlined" onClick={() => handleFindById(doc.id)}>
              Use this
            </Button>
          </li>
        ))}
      </ul>

      {documentCurrent && (
        <div>
          <h3>Selected Document by ID</h3>
          <p>{JSON.stringify(documentCurrent)}</p>
        </div>
      )}
    </div>
  );
};
