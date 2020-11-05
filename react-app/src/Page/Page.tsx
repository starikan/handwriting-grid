import React, { useEffect, useState } from 'react';
import Block, { BlockProps } from '../Block/Block';
import './style.scss';

const sizes = {
  A3: {
    width: 29.7,
    height: 42,
  },
  A4: {
    width: 21,
    height: 29.7,
  },
  A5: {
    width: 14.8,
    height: 21,
  },
};

interface Props {
  blocks?: BlockProps[];
  type?: keyof typeof sizes;
  width?: number;
  height?: number;
  landscape?: boolean;
}

export type PageType = Props;

const Page: React.FC<Props> = (props: Props) => {
  const [blocks] = useState(props.blocks || []);
  const [landscape] = useState(props.landscape || false);
  const [type] = useState(props.type || 'A4');
  const [width, setWidth] = useState(props.width);
  const [height, setheight] = useState(props.height);

  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    const { width, height } = sizes[type];
    if (landscape) {
      setWidth(height);
      setheight(width);
    } else {
      setWidth(width);
      setheight(height);
    }
  }, [landscape, type]);

  const blocksTags = blocks.map((v: BlockProps, i: number) => {
    return <Block key={i} {...v}></Block>;
  });

  const stylePage: React.CSSProperties = {
    width: `${width}cm`,
    height: `${height}cm`,
  };

  const onPageMouse = (flag: boolean): void => {
    setShowEditButton(flag);
  };

  return (
    <>
      <div className="page-wrapper" onMouseOver={() => onPageMouse(true)} onMouseOut={() => onPageMouse(false)}>
        <div style={stylePage} className="page">
          {blocksTags}
        </div>
        <div style={{ display: showEditButton ? 'block' : 'none' }} className="right-menu">
          ✏️
        </div>
      </div>
    </>
  );
};

export default Page;
