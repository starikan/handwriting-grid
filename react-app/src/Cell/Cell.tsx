import React from 'react';

type PropsType = {
  borderWidth: number;
  borderWidthStrict?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
};

const defaultBorderWidth = 1;

function Cell(props: PropsType) {
  const [borderWidth, setBorderWidth] = React.useState(props.borderWidth);
  const [borderWidthStrict, setBorderWidthStrict] = React.useState(props.borderWidthStrict);

  React.useEffect(() => {
    setBorderWidth(props.borderWidth);
  }, [props.borderWidth]);

  React.useEffect(() => {
    setBorderWidthStrict(props.borderWidthStrict);
  }, [props.borderWidthStrict]);

  const style: React.CSSProperties = {
    borderTopWidth: borderWidthStrict?.top || borderWidth,
    borderLeftWidth: borderWidthStrict?.left || borderWidth,
    borderRightWidth: borderWidthStrict?.right || borderWidth,
    borderBottomWidth: borderWidthStrict?.bottom || borderWidth,

    borderTopColor: 'black',
    borderLeftColor: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',

    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',

    width: 100,
    height: 100,
  };

  return <div style={style}></div>;
}

Cell.defaultProps = {
  borderWidth: defaultBorderWidth,
};

export default Cell;
