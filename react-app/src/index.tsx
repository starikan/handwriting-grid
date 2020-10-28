import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Block from './Block';
import { BlockProps } from './Block/Block';
import { CellPropsType } from './Cell/Cell';
import './index.css';

const App: React.FC = () => {
  const [sampleBlock] = useState({
    positionX: 100,
    positionY: 130,
    cells: [
      {
        left: 150,
        top: 10,
      } as CellPropsType,
    ],
  } as BlockProps);

  return (
    <div className="App">
      <Block {...sampleBlock}></Block>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById('root'));
