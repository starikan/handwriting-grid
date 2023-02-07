import React from 'react';
import ReactDOM from 'react-dom';
import { useList, useStore } from 'effector-react';

import './index.scss';

import './models/init';

import { $pages } from './models/pages/pages';

import Page from './components/Page';
import AddFirstPageButton from './components/AddFirstPageButton';
import MainMenu from './components/MainMenu';

const App: React.FC = () => {
  const pagesTags = useList($pages, (page) => <Page pageId={page.id}></Page>);
  const pagesStore = useStore($pages);

  return (
    <div className="App">
      {!pagesStore.length && <AddFirstPageButton></AddFirstPageButton>}
      <MainMenu></MainMenu>
      <div className="pages">{pagesTags}</div>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
