import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { DocumentAddButton, DocumentList, DocumentView, MainLayout } from './components';

import './index.scss';
import { $currentDocument, $documents } from './models/document/document';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App rendered');
  });

  const documentCurrent = useStore($currentDocument);
  const documents = useStore($documents);

  const result = documents.length ? (
    <MainLayout MainContent={documentCurrent ? <DocumentView /> : <DocumentList />}></MainLayout>
  ) : (
    <DocumentAddButton />
  );

  return <div className="App">{result}</div>;
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
