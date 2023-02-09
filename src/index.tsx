import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import DocumentList from './components/Document/DocumentList';

import './index.scss';

// import './models/init';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App rendered');
  });

  return (
    <div className="App">
      {/* {!pagesStore.length && <AddFirstPageButton></AddFirstPageButton>}
      <MainMenu></MainMenu>
      <div className="pages">{pagesTags}</div> */}
      <DocumentList></DocumentList>
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
