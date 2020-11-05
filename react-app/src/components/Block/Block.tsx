import React, { useState } from 'react';
import { Property } from 'csstype';

import Cell, { CellPropsType } from '../Cell/Cell';
import './style.scss';

type MultiplyType = {
  times: number;
  distance: number;
  direction: number;
};

type BlockStyle = {
  position: Property.Position;
  left: number;
  top: number;
};

interface Props {
  positionX?: number;
  positionY?: number;
  cells?: CellPropsType[];
  multiply?: MultiplyType[];
}

export type BlockProps = Props;

const Block: React.FC<Props> = (props) => {
  const [positionX] = useState(props.positionX || 0);
  const [positionY] = useState(props.positionY || 0);
  const [cells] = useState(props.cells || []);
  const [multiply] = useState(props.multiply || []);

  const blockStyle: BlockStyle = {
    position: 'absolute',
    left: positionX,
    top: positionY,
  };

  const cellsTags = cells.map((v: CellPropsType, i: number) => {
    return <Cell key={i} {...v}></Cell>;
  });

  const getBlock = (blockStyle: BlockStyle, i: number) => (
    <div key={i} style={blockStyle} className="block">
      {cellsTags}
    </div>
  );

  let blocks = [getBlock(blockStyle, 0)];

  multiply.forEach((multi) => {
    const styles: BlockStyle[] = blocks.map((v) => v.props.style);
    const newStyles = new Array(multi.times)
      .fill(0)
      .map((_, i) => {
        return styles.map((style) => {
          const X = multi.distance * Math.cos((multi.direction * Math.PI) / 180);
          const Y = multi.distance * Math.sin((multi.direction * Math.PI) / 180);
          return {
            ...style,
            ...{ left: style.left + X * i, top: style.top + Y * i },
          };
        });
      })
      .flat();

    const newBlocks = newStyles.map((style, i) => getBlock(style, i));
    blocks = newBlocks;
  });

  return <div className="block-busket">{blocks}</div>;
};

export default Block;
