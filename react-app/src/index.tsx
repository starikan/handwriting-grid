import React from 'react';
import ReactDOM from 'react-dom';
import { useList, useStore } from 'effector-react';

import './index.scss';
import Page from './Page';

import './models/init';
import { $pages, dropAllPages } from './models/pages/pages';

const App: React.FC = () => {
  const pagesTags = useList($pages, (page, i) => <Page key={i} {...page}></Page>);
  const pagesStore = useStore($pages);

  return (
    <div className="App">
      <div style={{ display: pagesStore.length ? 'block' : 'none' }} className="remove-button" onClick={dropAllPages}>
        ❌
      </div>
      <div className="pages">{pagesTags}</div>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
