import React from 'react';
import ReactDOM from 'react-dom';
import { useList, useStore } from 'effector-react';

import './models/init';

import './index.scss';
import Page from './components/Page';
import { $pages, dropAllPages } from './models/pages/pages';
import AddFirstPageButton from './components/AddFirstPageButton';

const App: React.FC = () => {
  const pagesTags = useList($pages, (page, i) => <Page key={i} {...page}></Page>);
  const pagesStore = useStore($pages);

  return (
    <div className="App">
      {!pagesStore.length && <AddFirstPageButton></AddFirstPageButton>}
      <div style={{ display: pagesStore.length ? 'block' : 'none' }} className="remove-button" onClick={dropAllPages}>
        ❌
      </div>
      <div className="pages">{pagesTags}</div>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
