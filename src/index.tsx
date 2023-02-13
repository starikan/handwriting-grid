import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { MainLayout } from './components';

import './index.scss';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('App rendered');
  });

  return (
    <div className="App">
      <MainLayout></MainLayout>
    </div>
  );
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
