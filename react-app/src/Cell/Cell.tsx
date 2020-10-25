import React, { useEffect, useState } from 'react';
import { Property } from 'csstype';

import './Cell.scss';

import Grid from '../Grid';

interface PropsType {
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
}

const defaultBorderWidth = 1;
const defaultBorderColor = 'black';
const defaultBorderStyle = 'solid';
const defaultWidth = 100;
const defaultHeight = 100;

function Cell(props: PropsType) {
  const [borderWidth, setBorderWidth] = useState(props.borderWidth);
  const [borderWidthStrict, setBorderWidthStrict] = useState(props.borderWidthStrict);

  useEffect(() => {
    setBorderWidth(props.borderWidth);
  }, [props.borderWidth]);

  useEffect(() => {
    setBorderWidthStrict(props.borderWidthStrict);
  }, [props.borderWidthStrict]);

  const [borderColor, setBorderColor] = useState(props.borderColor);
  const [borderColorStrict, setBorderColorStrict] = useState(props.borderColorStrict);

  useEffect(() => {
    setBorderColor(props.borderColor);
  }, [props.borderColor]);

  useEffect(() => {
    setBorderColorStrict(props.borderColorStrict);
  }, [props.borderColorStrict]);

  const [borderStyle, setBorderStyle] = useState(props.borderStyle);
  const [borderStyleStrict, setBorderStyleStrict] = useState(props.borderStyleStrict);

  useEffect(() => {
    setBorderStyle(props.borderStyle);
  }, [props.borderStyle]);

  useEffect(() => {
    setBorderStyleStrict(props.borderStyleStrict);
  }, [props.borderStyleStrict]);

  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  useEffect(() => {
    setWidth(props.width);
  }, [props.width]);

  useEffect(() => {
    setHeight(props.height);
  }, [props.height]);

  const [fontFamily, setFontFamily] = useState(props.fontFamily);
  const [fontSize, setFontSize] = useState(props.fontSize);

  useEffect(() => {
    setFontFamily(props.fontFamily);
  }, [props.fontFamily]);

  useEffect(() => {
    setFontSize(props.fontSize);
  }, [props.fontSize]);

  const [conture, setConture] = useState(props.conture);

  useEffect(() => {
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
      <Grid cell={{ width, height }}></Grid>
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
