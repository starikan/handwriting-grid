import React, { useEffect, useState } from 'react';
import { Property } from 'csstype';

import './style.scss';

interface Border {
  strokeWidth?: number;
  strokeColor?: Property.BorderRightColor;
  strokeStyle?: Property.BorderRightStyle;
  percent?: number;
  borderRightWidth?: Property.BorderRightWidth;
  borderRightColor?: Property.BorderRightColor;
  borderRightStyle?: Property.BorderRightStyle;
  width?: Property.Width;
  height?: Property.Height;
}

interface Props {
  strokesStyle?: Border;
  vertical?: number[] | Border[];
  horizontal?: number[] | Border[];
  diagonalUp?: number[] | Border[];
  diagonalDown?: number[] | Border[];
  cell: {
    width: Property.Width;
    height: Property.Height;
  };
}

const Grid: React.FC<Props> = (props: Props) => {
  const [strokesStyle, setStrokesStyle] = useState(props.strokesStyle);

  useEffect(() => {
    const borderRight: Border = {
      borderRightWidth: `${props.strokesStyle?.strokeWidth}px`,
      borderRightColor: props.strokesStyle?.strokeColor,
      borderRightStyle: props.strokesStyle?.strokeStyle,
      width: props.cell.width,
      height: props.cell.height,
    };
    setStrokesStyle(borderRight);
  }, [props.strokesStyle, props.cell]);

  return (
    <>
      <span style={strokesStyle} className="stroke stroke-vertical"></span>
      <span style={strokesStyle} className="stroke stroke-horizontal"></span>
      <span style={strokesStyle} className="stroke stroke-diagonal-up"></span>
      <span style={strokesStyle} className="stroke stroke-diagonal-down"></span>
    </>
  );
};

Grid.defaultProps = {
  strokesStyle: {
    strokeWidth: 5,
    strokeColor: 'black',
    strokeStyle: 'dashed',
  },
  vertical: [0.25, 0.5, 0.75],
  horizontal: [0.25, 0.5, 0.75],
  diagonalUp: [0.25, 0.5, 0.75],
  diagonalDown: [0.25, 0.5, 0.75],
};

export default Grid;
