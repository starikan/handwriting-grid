/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Property } from 'csstype';

import './style.scss';

interface Stroke {
  width: number;
  color: Property.BorderBottomColor;
  style: Property.BorderBottomStyle;
}

type StrokeExtend = Stroke & { percent: number };

interface CellParams {
  width: number;
  height: number;
  border: { top: number; left: number; right: number; bottom: number };
  left: number;
  top: number;
}

export interface StrokesParams {
  strokesStyle?: Stroke;
  vertical?: Array<number | StrokeExtend>;
  horizontal?: Array<number | StrokeExtend>;
  diagonalUp?: Array<number | StrokeExtend>;
  diagonalDown?: Array<number | StrokeExtend>;
}

type Props = StrokesParams & { cell: CellParams };

const CellGrid: React.FC<Props> = (props) => {
  const [cell] = useState(props.cell);
  const [strokesStyle] = useState(props.strokesStyle || ({ width: 1, color: 'black', style: 'dashed' } as Stroke));

  const [vertical] = useState(
    (props.vertical || []).map((v) =>
      typeof v === 'number' ? { ...strokesStyle, ...{ percent: Math.min(v, 1) } } : v,
    ),
  );

  const [horizontal] = useState(
    (props.horizontal || []).map((v) =>
      typeof v === 'number' ? { ...strokesStyle, ...{ percent: Math.min(v, 1) } } : v,
    ),
  );

  const [diagonalUp] = useState(
    (props.diagonalUp || []).map((v) =>
      typeof v === 'number' ? { ...strokesStyle, ...{ percent: Math.min(v, 1) } } : v,
    ),
  );

  const [diagonalDown] = useState(
    (props.diagonalDown || []).map((v) =>
      typeof v === 'number' ? { ...strokesStyle, ...{ percent: Math.min(v, 1) } } : v,
    ),
  );

  const verticalSpans = vertical.map((v: StrokeExtend, i: number) => {
    const verticalStyle = {
      width: `${cell.height}px`,
      borderBottomWidth: `${v.width}px`,
      borderBottomColor: v.color,
      borderBottomStyle: v.style,
      transform: `translateX(${cell.width * v.percent + v.width / 2}px) rotate(90deg)`,
      transformOrigin: 'left top',
    };
    return <span key={i} style={{ ...verticalStyle }} className="stroke stroke-vertical"></span>;
  });

  const horizontalSpans = horizontal.map((v: StrokeExtend, i: number) => {
    const horizontalStyle = {
      width: `${cell.width}px`,
      borderBottomWidth: `${v.width}px`,
      borderBottomColor: v.color,
      borderBottomStyle: v.style,
      transform: `translateY(${cell.height * v.percent}px)`,
    };
    return <span key={i} style={{ ...horizontalStyle }} className="stroke stroke-horizontal"></span>;
  });

  const diagonalUpSpans = diagonalUp.map((v: StrokeExtend, i: number) => {
    const { width, height } = cell;
    const coeff = v.percent;
    const angular = -(Math.atan(height / width) * 180) / Math.PI;
    const fullDiag = Math.sqrt(width ** 2 + height ** 2);
    const diagLength = coeff <= 0.5 ? fullDiag * 2 * coeff : fullDiag * 2 * (1 - coeff);
    const diagonalStyle = {
      width: `${diagLength}px`,
      borderBottomWidth: `${v.width}px`,
      borderBottomColor: v.color,
      borderBottomStyle: v.style,
      transform: '',
      transformOrigin: 'left top',
    };

    if (coeff <= 0.5) {
      diagonalStyle.transform = `translateY(${height * 2 * coeff - v.width / 2}px) rotate(${angular}deg)`;
    } else {
      diagonalStyle.transform = `translateX(${width * 2 * (1 - coeff)}px) translateY(${
        height - v.width / 2
      }px) rotate(${angular}deg)`;
    }

    return <span key={i} style={{ ...diagonalStyle }} className="stroke stroke-diagonal"></span>;
  });

  const diagonalDownSpans = diagonalDown.map((v: StrokeExtend, i: number) => {
    const { width, height } = cell;
    const coeff = v.percent;
    const angular = (Math.atan(height / width) * 180) / Math.PI;
    const fullDiag = Math.sqrt(width ** 2 + height ** 2);
    const diagLength = coeff <= 0.5 ? fullDiag * 2 * coeff : fullDiag * 2 * (1 - coeff);
    const diagonalStyle = {
      width: `${diagLength}px`,
      borderBottomWidth: `${v.width}px`,
      borderBottomColor: v.color,
      borderBottomStyle: v.style,
      transform: '',
      transformOrigin: 'left top',
    };

    if (coeff <= 0.5) {
      diagonalStyle.transform = `translateX(${width * 2 * (0.5 - coeff) + v.width / 2}px) rotate(${angular}deg)`;
    } else {
      diagonalStyle.transform = `translateY(${height * 2 * (1 - coeff) - v.width / 2}px) rotate(${angular}deg)`;
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
