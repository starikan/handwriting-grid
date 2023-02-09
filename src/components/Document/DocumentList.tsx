import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import {
  $documents,
  addDocument,
  removeDocument,
  modifyDocument,
  findDocumentById,
  findDocumentByName,
} from '../../models/document/document';
import { generateRandomDocument } from '../../models/document/documentInit';

const DocumentList = () => {
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const documents = useStore($documents);

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
    setSelectedId(id);
  };

  const handleFindByName = (name?: string) => {
    if (name) {
      setSelectedName(name);
    }
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
            <button onClick={() => handleFindByName(doc.name)}>Find by Name</button>
          </li>
        ))}
      </ul>

      {selectedId && (
        <div>
          <h3>Selected Document by ID</h3>
          <p>{JSON.stringify(findDocumentById(selectedId))}</p>
        </div>
      )}

      {selectedName && (
        <div>
          <h3>Selected Document by Name</h3>
          <p>{JSON.stringify(findDocumentByName(selectedName))}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
