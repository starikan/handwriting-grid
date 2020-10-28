import React, { useState } from 'react';
import Cell, { CellPropsType } from '../Cell/Cell';
import './style.scss';

interface Props {
  positionX?: number;
  positionY?: number;
  cells?: CellPropsType[];
}

export type BlockProps = Props;

const Block: React.FC<Props> = (props) => {
  const [positionX] = useState(props.positionX || 0);
  const [positionY] = useState(props.positionY || 0);
  const [cells] = useState(props.cells || []);

  const blockStyle: React.CSSProperties = {
    position: 'absolute',
    left: positionX,
    top: positionY,
  };

  const cellsTags = cells.map((v: CellPropsType, i: number) => {
    return <Cell key={i} {...v}></Cell>;
  });

  return (
    <div className="block-busket">
      <div style={blockStyle} className="block">
        {cellsTags}
      </div>
    </div>
  );
};

export default Block;
