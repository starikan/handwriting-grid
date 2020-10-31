import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BlockProps } from './Block/Block';
import './index.scss';
import Page from './Page';

const App: React.FC = () => {
  const [sampleBlock] = useState({
    positionX: 100,
    positionY: 130,
    cells: [
      {
        left: 150,
        top: 10,
        width: 100,
        height: 120,
        borderWidth: 4,
      },
      {
        left: 50,
        top: 50,
        width: 50,
        height: 30,
        borderWidth: 1,
        fontSize: 30,
        conture: false,
        grid: {
          vertical: [0.25, 0.75],
          horizontal: [0.25, 0.75],
          diagonalUp: [0.25, 0.75],
          diagonalDown: [0.25, 0.75],
        },
      },
    ],
    multiply: [
      {
        times: 3,
        direction: 90,
        distance: 200,
      },
      {
        times: 3,
        direction: 45,
        distance: 400,
      },
    ],
  } as BlockProps);

  const [pageSample] = useState({
    blocks: [sampleBlock],
  });

  const [pages] = useState([pageSample]);

  const pagesTags = pages.map((page) => <Page {...page}></Page>);

  return (
    <div className="App">
      <div className="pages">{pagesTags}</div>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
