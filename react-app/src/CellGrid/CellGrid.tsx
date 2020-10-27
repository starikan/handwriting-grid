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

const CellGrid: React.FC<Props> = (props) => {
  const {
    strokesStyle = {
      strokeWidth: 1,
      strokeColor: 'black',
      strokeStyle: 'dashed',
    },
    vertical = [0.25, 0.5, 0.75],
    horizontal = [0.25, 0.5, 0.75],
    diagonalUp = [0.25, 0.5, 0.75],
    diagonalDown = [0.25, 0.5, 0.75],
    cell,
  } = props;

  const verticalSpans = vertical.map((v: number | Stroke, i: number) => {
    console.log(typeof v);
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const strokeWidth = typeof v === 'number' ? strokesStyle.strokeWidth : v.strokeWidth;
    const verticalStyle = {
      width: `${cell.height}px`,
      borderBottomWidth: `${strokesStyle.strokeWidth}px`,
      borderBottomColor: strokesStyle.strokeColor || 'black',
      borderBottomStyle: strokesStyle.strokeStyle || 'dashed',
      transform: `translateX(${cell.width * coeff + strokeWidth / 2}px) rotate(90deg)`,
      transformOrigin: 'left top',
    };
    return <span key={i} style={{ ...verticalStyle }} className="stroke stroke-vertical"></span>;
  });

  const horizontalSpans = horizontal.map((v: number | Stroke, i: number) => {
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const horizontalStyle = {
      width: `${cell.width}px`,
      borderBottomWidth: `${strokesStyle.strokeWidth}px`,
      borderBottomColor: strokesStyle.strokeColor || 'black',
      borderBottomStyle: strokesStyle.strokeStyle || 'dashed',
      transform: `translateY(${cell.height * coeff}px)`,
    };
    return <span key={i} style={{ ...horizontalStyle }} className="stroke stroke-horizontal"></span>;
  });

  const diagonalUpSpans = diagonalUp.map((v: number | Stroke, i: number) => {
    const { width, height } = cell;
    const strokeWidth = typeof v === 'number' ? strokesStyle.strokeWidth : v.strokeWidth;
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const angular = -(Math.atan(height / width) * 180) / Math.PI;
    const fullDiag = Math.sqrt(width ** 2 + height ** 2);
    const diagLength = coeff <= 0.5 ? fullDiag * 2 * coeff : fullDiag * 2 * (1 - coeff);
    const diagonalStyle = {
      width: `${diagLength}px`,
      borderBottomWidth: `${strokesStyle.strokeWidth}px`,
      borderBottomColor: strokesStyle.strokeColor || 'black',
      borderBottomStyle: strokesStyle.strokeStyle || 'dashed',
      transform: '',
      transformOrigin: 'left top',
    };

    if (coeff <= 0.5) {
      diagonalStyle.transform = `translateY(${height * 2 * coeff - strokeWidth / 2}px) rotate(${angular}deg)`;
    } else {
      diagonalStyle.transform = `translateX(${width * 2 * (1 - coeff)}px) translateY(${
        height - strokeWidth / 2
      }px) rotate(${angular}deg)`;
    }

    return <span key={i} style={{ ...diagonalStyle }} className="stroke stroke-diagonal"></span>;
  });

  const diagonalDownSpans = diagonalDown.map((v: number | Stroke, i: number) => {
    const { width, height } = cell;
    const strokeWidth = typeof v === 'number' ? strokesStyle.strokeWidth : v.strokeWidth;
    const coeff = typeof v === 'number' ? Math.min(v, 1) : Math.min(v.percent || 1, 1);
    const angular = (Math.atan(height / width) * 180) / Math.PI;
    const fullDiag = Math.sqrt(width ** 2 + height ** 2);
    const diagLength = coeff <= 0.5 ? fullDiag * 2 * coeff : fullDiag * 2 * (1 - coeff);
    const diagonalStyle = {
      width: `${diagLength}px`,
      borderBottomWidth: `${strokesStyle.strokeWidth}px`,
      borderBottomColor: strokesStyle.strokeColor || 'black',
      borderBottomStyle: strokesStyle.strokeStyle || 'dashed',
      transform: '',
      transformOrigin: 'left top',
    };

    if (coeff <= 0.5) {
      diagonalStyle.transform = `translateX(${width * 2 * (0.5 - coeff) + strokeWidth / 2}px) rotate(${angular}deg)`;
    } else {
      diagonalStyle.transform = `translateY(${height * 2 * (1 - coeff) - strokeWidth / 2}px) rotate(${angular}deg)`;
    }

    return <span key={i} style={{ ...diagonalStyle }} className="stroke stroke-diagonal"></span>;
  });

  return (
    <>
      {verticalSpans}
      {horizontalSpans}
      {diagonalUpSpans}
      {diagonalDownSpans}
    </>
  );
};

export default CellGrid;
