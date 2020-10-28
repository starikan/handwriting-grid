import React, { useState } from 'react';
import { Property } from 'csstype';

import './Cell.scss';

import CellGrid from '../CellGrid';
import { StrokesParams } from '../CellGrid/CellGrid';

type PropsType = {
  borderWidth?: number;
  borderWidthStrict?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  borderColor?: Property.Color;
  borderColorStrict?: {
    top: Property.Color;
    left: Property.Color;
    right: Property.Color;
    bottom: Property.Color;
  };
  borderStyle?: Property.BorderInlineStyle;
  borderStyleStrict?: {
    top: Property.BorderInlineStyle;
    left: Property.BorderInlineStyle;
    right: Property.BorderInlineStyle;
    bottom: Property.BorderInlineStyle;
  };
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  fontFamily?: Property.FontFamily;
  fontSize?: number;
  conture?: boolean;
  grid?: StrokesParams;
};

export type CellPropsType = PropsType;

function Cell(props: PropsType) {
  const [left] = useState(props.left || 0);
  const [top] = useState(props.top || 0);
  const [width] = useState(props.width || 50);
  const [height] = useState(props.height || 50);
  const [borderWidth] = useState(props.borderWidth || 1);
  const [borderWidthStrict] = useState(
    props.borderWidthStrict || { top: borderWidth, left: borderWidth, right: borderWidth, bottom: borderWidth },
  );

  const [borderColor] = useState(props.borderColor || 'black');
  const [borderColorStrict] = useState(
    props.borderColorStrict || { top: borderColor, left: borderColor, right: borderColor, bottom: borderColor },
  );

  const [borderStyle] = useState(props.borderStyle || 'solid');
  const [borderStyleStrict] = useState(
    props.borderStyleStrict || { top: borderStyle, left: borderStyle, right: borderStyle, bottom: borderStyle },
  );

  const [fontFamily] = useState(props.fontFamily || 'sans-serif');
  const [fontSize] = useState(props.fontSize || 70);

  const [conture] = useState(props.conture !== undefined ? props.conture : true);

  const [grid] = useState(props.grid || {});

  const style: React.CSSProperties = {
    borderTopWidth: `${borderWidthStrict.top}px`,
    borderLeftWidth: `${borderWidthStrict.left}px`,
    borderRightWidth: `${borderWidthStrict.right}px`,
    borderBottomWidth: `${borderWidthStrict.bottom}px`,

    borderTopColor: borderColorStrict?.top || borderColor,
    borderLeftColor: borderColorStrict?.left || borderColor,
    borderRightColor: borderColorStrict?.right || borderColor,
    borderBottomColor: borderColorStrict?.bottom || borderColor,

    borderTopStyle: borderStyleStrict?.top || borderStyle,
    borderLeftStyle: borderStyleStrict?.left || borderStyle,
    borderRightStyle: borderStyleStrict?.right || borderStyle,
    borderBottomStyle: borderStyleStrict?.bottom || borderStyle,

    width: `${width}px`,
    height: `${height}px`,

    left: `${left}px`,
    top: `${top}px`,

    fontFamily,
    fontSize: `${fontSize}px`,

    position: 'absolute',
  };

  if (conture) {
    style.color = 'white';
    style.WebkitTextStroke = '1px black';
  }

  const styleTextBlock: React.CSSProperties = {
    padding: 0,
    margin: 0,
    height: '100%',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  };

  return (
    <div style={style}>
      <CellGrid cell={{ width, height, border: borderWidthStrict, left, top }} {...grid}></CellGrid>
      <p style={styleTextBlock}>T</p>
    </div>
  );
}

export default Cell;
