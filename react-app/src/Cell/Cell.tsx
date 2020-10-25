import React from 'react';
import { Property } from 'csstype';

type PropsType = {
  borderWidth: number;
  borderWidthStrict?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  borderColor: string;
  borderColorStrict?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  borderStyle: Property.BorderInlineStyle;
  borderStyleStrict?: {
    top?: Property.BorderInlineStyle;
    left?: Property.BorderInlineStyle;
    right?: Property.BorderInlineStyle;
    bottom?: Property.BorderInlineStyle;
  };
  width: number;
  height: number;
};

const defaultBorderWidth = 1;
const defaultBorderColor = 'black';
const defaultBorderStyle = 'solid';
const defaultWidth = 100;
const defaultHeight = 100;

function Cell(props: PropsType) {
  const [borderWidth, setBorderWidth] = React.useState(props.borderWidth);
  const [borderWidthStrict, setBorderWidthStrict] = React.useState(props.borderWidthStrict);

  React.useEffect(() => {
    setBorderWidth(props.borderWidth);
  }, [props.borderWidth]);

  React.useEffect(() => {
    setBorderWidthStrict(props.borderWidthStrict);
  }, [props.borderWidthStrict]);

  const [borderColor, setBorderColor] = React.useState(props.borderColor);
  const [borderColorStrict, setBorderColorStrict] = React.useState(props.borderColorStrict);

  React.useEffect(() => {
    setBorderColor(props.borderColor);
  }, [props.borderColor]);

  React.useEffect(() => {
    setBorderColorStrict(props.borderColorStrict);
  }, [props.borderColorStrict]);

  const [borderStyle, setBorderStyle] = React.useState(props.borderStyle);
  const [borderStyleStrict, setBorderStyleStrict] = React.useState(props.borderStyleStrict);

  React.useEffect(() => {
    setBorderStyle(props.borderStyle);
  }, [props.borderStyle]);

  React.useEffect(() => {
    setBorderStyleStrict(props.borderStyleStrict);
  }, [props.borderStyleStrict]);

  const [width, setWidth] = React.useState(props.width);
  const [height, setHeight] = React.useState(props.height);

  React.useEffect(() => {
    setWidth(props.width);
  }, [props.width]);

  React.useEffect(() => {
    setHeight(props.height);
  }, [props.height]);

  const style: React.CSSProperties = {
    borderTopWidth: borderWidthStrict?.top || borderWidth,
    borderLeftWidth: borderWidthStrict?.left || borderWidth,
    borderRightWidth: borderWidthStrict?.right || borderWidth,
    borderBottomWidth: borderWidthStrict?.bottom || borderWidth,

    borderTopColor: borderColorStrict?.top || borderColor,
    borderLeftColor: borderColorStrict?.left || borderColor,
    borderRightColor: borderColorStrict?.right || borderColor,
    borderBottomColor: borderColorStrict?.bottom || borderColor,

    borderTopStyle: borderStyleStrict?.top || borderStyle,
    borderLeftStyle: borderStyleStrict?.left || borderStyle,
    borderRightStyle: borderStyleStrict?.right || borderStyle,
    borderBottomStyle: borderStyleStrict?.bottom || borderStyle,

    width,
    height,
  };

  return <div style={style}></div>;
}

Cell.defaultProps = {
  borderWidth: defaultBorderWidth,
  borderColor: defaultBorderColor,
  borderStyle: defaultBorderStyle,
  width: defaultWidth,
  height: defaultHeight,
};

export default Cell;
