import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { createRoot } from 'react-dom/client';
import { DocumentAddButton, DocumentsList, DocumentView, Header, Settings } from './components';
import { $currentDocument, $documents } from './models';
import { ThemeProvider } from '@mui/material/styles';
import { themeDark as theme } from './themes';
import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { MainLayout } from './generic/MainLayout';

import './index.scss';
import './models';
import './models/init';
import './models/_loggers/logger';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App rendered');
  });

  const documentCurrent = useStore($currentDocument);
  const documents = useStore($documents);

  const documentView = documentCurrent ? <DocumentView /> : <DocumentsList />;
  const MainContent = documents.length ? documentView : <DocumentAddButton />;

  return (
    <div className="App">
      <ThemeProvider theme={theme.theme}>
        <CssVarsProvider theme={theme.vars}>
          <CssBaseline />
          <MainLayout MainContent={MainContent} TopPanel={<Header />} RightPanel={<Settings />}></MainLayout>
        </CssVarsProvider>
      </ThemeProvider>
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
