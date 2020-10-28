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
        width: 100,
        height: 120,
        borderWidth: 4,
      } as CellPropsType,
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
