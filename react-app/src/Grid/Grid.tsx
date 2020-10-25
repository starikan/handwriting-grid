import React, { useEffect, useState } from 'react';
import { Property } from 'csstype';

import './style.scss';

interface Border {
  borderRightWidth: Property.BorderRightWidth;
  borderRightColor: Property.BorderRightColor;
  borderRightStyle: Property.BorderRightStyle;
  width?: Property.Width;
  height?: Property.Height;
}

interface Stroke {
  strokeWidth: number;
  strokeColor: Property.BorderRightColor;
  strokeStyle: Property.BorderRightStyle;
  percent?: number;
}

interface Props {
  strokesStyle?: Stroke;
  vertical?: number[] | Stroke[];
  horizontal?: number[] | Stroke[];
  diagonalUp?: number[] | Stroke[];
  diagonalDown?: number[] | Stroke[];
  cell: {
    width: number;
    height: number;
  };
}

const Grid: React.FC<Props> = (props: Props) => {
  // const [strokesStyle, ] = useState(props.strokesStyle);
  const [mainStrokesStyle, setMainStrokesStyle] = useState({});

  useEffect(() => {
    const borderRight: Border = {
      borderRightWidth: `${props.strokesStyle?.strokeWidth}px`,
      borderRightColor: props.strokesStyle?.strokeColor || 'black',
      borderRightStyle: props.strokesStyle?.strokeStyle || 'dashed',
      width: `${props.cell.width}px`,
      height: `${props.cell.height}px`,
    };
    setMainStrokesStyle(borderRight);
  }, [props.strokesStyle, props.cell]);

  return (
    <>
      <span style={mainStrokesStyle} className="stroke stroke-vertical"></span>
      <span style={mainStrokesStyle} className="stroke stroke-horizontal"></span>
      <span style={mainStrokesStyle} className="stroke stroke-diagonal-up"></span>
      <span style={mainStrokesStyle} className="stroke stroke-diagonal-down"></span>
    </>
  );
};

Grid.defaultProps = {
  strokesStyle: {
    strokeWidth: 1,
    strokeColor: 'black',
    strokeStyle: 'dashed',
  },
  vertical: [0.25, 0.5, 0.75],
  horizontal: [0.25, 0.5, 0.75],
  diagonalUp: [0.25, 0.5, 0.75],
  diagonalDown: [0.25, 0.5, 0.75],
};

export default Grid;
