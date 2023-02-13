import React, { useEffect } from 'react';
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

export const DocumentList = () => {
  const documents = useStore($documents);
  const documentCurrent = useStore($currentDocument);

  useEffect(() => {
    addDocument(generateRandomDocument());
    addDocument(generateRandomDocument());
  }, []);

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

      <button onClick={() => handleAddDocument()}>Create</button>

      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <p>{doc.name}</p>
            <button onClick={() => handleRemove(doc.id)}>Remove</button>
            <button onClick={() => handleUpdate(doc.id, { name: 'Updated Document' })}>Update</button>
            <button onClick={() => handleFindById(doc.id)}>Find by ID</button>
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
