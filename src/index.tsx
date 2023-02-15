import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { createRoot } from 'react-dom/client';
import { DocumentAddButton, DocumentList, DocumentView, Header, MainLayout } from './components';
import { $currentDocument, $documents } from './models/document/document';
import { ThemeProvider } from '@mui/material/styles';
import { themeDark as theme } from './themes';
import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import './index.scss';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App rendered');
  });

  const documentCurrent = useStore($currentDocument);
  const documents = useStore($documents);

  const MainContent = documents.length ? documentCurrent ? <DocumentView /> : <DocumentList /> : <DocumentAddButton />;

  return (
    <div className="App">
      <ThemeProvider theme={theme.theme}>
        <CssVarsProvider theme={theme.vars}>
          <CssBaseline />
          <MainLayout MainContent={MainContent} TopPanel={<Header />}></MainLayout>
        </CssVarsProvider>
      </ThemeProvider>
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
