/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Property } from 'csstype';

import './style.scss';

interface Stroke {
  strokeWidth: number;
  strokeColor: Property.BorderRightColor;
  strokeStyle: Property.BorderRightStyle;
  percent?: number;
}

interface Props {
  strokesStyle?: Stroke;
  vertical?: Array<number | Stroke>;
  horizontal?: Array<number | Stroke>;
  diagonalUp?: Array<number | Stroke>;
  diagonalDown?: Array<number | Stroke>;
  cell: {
    width: number;
    height: number;
    border: { top: number; left: number; right: number; bottom: number };
  };
}

const Grid: React.FC<Props> = (props) => {
  const {
    strokesStyle = {
      strokeWidth: 1,
      strokeColor: 'black',
      strokeStyle: 'dashed',
    },
    vertical = [0.25, 0.5, 0.75],
    horizontal = [0.25, 0.5, 0.75],
    // diagonalUp = [0.25, 0.5, 0.75],
    // diagonalDown = [0.25, 0.5, 0.75],
    cell,
  } = props;

  const verticalSpans = vertical.map((v: number | Stroke, i: number) => {
    console.log(typeof v);
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const strokeWidth = typeof v === 'number' ? strokesStyle.strokeWidth : v.strokeWidth;
    const verticalStyle = {
      width: `${cell.width * coeff - cell.border.right / 2 + strokeWidth}px`,
      height: `${cell.height}px`,
      borderRightWidth: `${strokesStyle.strokeWidth}px`,
      borderRightColor: strokesStyle.strokeColor || 'black',
      borderRightStyle: strokesStyle.strokeStyle || 'dashed',
    };
    return <span key={i} style={{ ...verticalStyle }} className="stroke stroke-vertical"></span>;
  });

  const horizontalSpans = horizontal.map((v: number | Stroke, i: number) => {
    console.log(typeof v);
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const strokeWidth = typeof v === 'number' ? strokesStyle.strokeWidth : v.strokeWidth;
    const horizontalStyle = {
      width: `${cell.width}px`,
      height: `${cell.height * coeff - cell.border.right / 2 + strokeWidth}px`,
      borderBottomWidth: `${strokesStyle.strokeWidth}px`,
      borderBottomColor: strokesStyle.strokeColor || 'black',
      borderBottomStyle: strokesStyle.strokeStyle || 'dashed',
    };
    return <span key={i} style={{ ...horizontalStyle }} className="stroke stroke-horizontal"></span>;
  });

  return (
    <>
      {verticalSpans}
      {horizontalSpans}
    </>
  );
};

export default Grid;
