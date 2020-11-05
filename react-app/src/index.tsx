import React from 'react';
import ReactDOM from 'react-dom';
import { useList } from 'effector-react';

import './index.scss';
import Page from './Page';

import './models/init';
import { $pages } from './models/pages/pages';

const App: React.FC = () => {
  const pagesTags = useList($pages, (page, i) => <Page key={i} {...page}></Page>);

  return (
    <div className="App">
      <div className="pages">{pagesTags}</div>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
