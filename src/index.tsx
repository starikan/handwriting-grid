import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { createRoot } from 'react-dom/client';
import { DocumentAddButton, DocumentList, DocumentView, MainLayout } from './components';
import { $currentDocument, $documents } from './models/document/document';
import { ThemeProvider } from '@mui/material/styles';
import { themeDark } from './themes';

import './index.scss';


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

  return (
    <div className="App">
      <ThemeProvider theme={themeDark}>{result}</ThemeProvider>
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
