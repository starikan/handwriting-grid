import React from 'react';
import { Property } from 'csstype';

import './Cell.scss';

type PropsType = {
  borderWidth: Property.BorderWidth;
  borderWidthStrict?: {
    top?: Property.BorderWidth;
    left?: Property.BorderWidth;
    right?: Property.BorderWidth;
    bottom?: Property.BorderWidth;
  };
  borderColor: Property.Color;
  borderColorStrict?: {
    top?: Property.Color;
    left?: Property.Color;
    right?: Property.Color;
    bottom?: Property.Color;
  };
  borderStyle: Property.BorderInlineStyle;
  borderStyleStrict?: {
    top?: Property.BorderInlineStyle;
    left?: Property.BorderInlineStyle;
    right?: Property.BorderInlineStyle;
    bottom?: Property.BorderInlineStyle;
  };
  width: Property.Width;
  height: Property.Height;
  fontFamily: Property.FontFamily;
  fontSize: Property.FontSize;
  conture: boolean;
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

  const [fontFamily, setFontFamily] = React.useState(props.fontFamily);
  const [fontSize, setFontSize] = React.useState(props.fontSize);

  React.useEffect(() => {
    setFontFamily(props.fontFamily);
  }, [props.fontFamily]);

  React.useEffect(() => {
    setFontSize(props.fontSize);
  }, [props.fontSize]);

  const [conture, setConture] = React.useState(props.conture);

  React.useEffect(() => {
    setConture(props.conture);
  }, [props.conture]);

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

    fontFamily,
    fontSize,

    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  };

  if (conture) {
    style.color = 'white';
    style.WebkitTextStroke = '1px black';
  }

  const styleTextBlock: React.CSSProperties = {
    padding: 0,
    margin: 0,
  };

  return (
    <div style={style}>

      <span className="stroke stroke-vert"></span>
      <span className="stroke stroke-horiz"></span>
      <span className="stroke stroke-diag-right"></span>
      <span className="stroke stroke-diag-left"></span>
      <p style={styleTextBlock}>T</p>
    </div>
  );
}

Cell.defaultProps = {
  borderWidth: defaultBorderWidth,
  borderColor: defaultBorderColor,
  borderStyle: defaultBorderStyle,
  width: defaultWidth,
  height: defaultHeight,
  fontFamily: 'sans-serif',
  fontSize: 70,
  conture: true,
};

export default Cell;
