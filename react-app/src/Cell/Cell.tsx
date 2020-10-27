import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Property } from 'csstype';

import './Cell.scss';

import Grid from '../Grid';

interface BorderWidths {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface PropsType {
  borderWidth: number;
  borderWidthStrict?: BorderWidths;
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
  width: number;
  height: number;
  fontFamily: Property.FontFamily;
  fontSize: Property.FontSize;
  conture: boolean;
}

const resolveBorderWidth = (borderWidth: number, borderWidthStrict: BorderWidths): BorderWidths => {
  return {
    ...{
      top: borderWidth,
      left: borderWidth,
      right: borderWidth,
      bottom: borderWidth,
    },
    ...borderWidthStrict,
  } as BorderWidths;
};

function Cell(props: PropsType) {
  const {
    borderWidth = 1,
    borderWidthStrict = { top: borderWidth, left: borderWidth, right: borderWidth, bottom: borderWidth },
  } = props;

  const [borderWidthLocal, setBorderWidthStrict]: [BorderWidths, Dispatch<SetStateAction<BorderWidths>>] = useState(
    resolveBorderWidth(borderWidth, borderWidthStrict),
  );

  useEffect(() => {
    setBorderWidthStrict(resolveBorderWidth(borderWidth, borderWidthStrict));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.borderWidth, props.borderWidthStrict]);

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
    borderTopWidth: `${borderWidthLocal.top}px`,
    borderLeftWidth: `${borderWidthLocal.left}px`,
    borderRightWidth: `${borderWidthLocal.right}px`,
    borderBottomWidth: `${borderWidthLocal.bottom}px`,

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
      <Grid cell={{ width, height, border: borderWidthLocal }}></Grid>
      <p style={styleTextBlock}>T</p>
    </div>
  );
}

Cell.defaultProps = {
  borderWidth: 3,
  borderColor: 'black',
  borderStyle: 'solid',
  width: 100,
  height: 100,
  fontFamily: 'sans-serif',
  fontSize: 70,
  conture: true,
};

export default Cell;
