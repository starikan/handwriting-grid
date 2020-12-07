import React, { useEffect, useState } from 'react';
import Block from '../Block/Block';
import './style.scss';

import { PageType, BlockType } from '../../global';
import { useStore } from 'effector-react';
import { $sizes } from '../../models/pageSizes/pageSizes';

const Page: React.FC<PageType> = (props) => {
  const [blocks] = useState(props.blocks || []);
  const [landscape] = useState(props.landscape || false);
  const [type] = useState(props.type || 'A4');
  const [width, setWidth] = useState(props.width);
  const [height, setheight] = useState(props.height);

  const [showEditButton, setShowEditButton] = useState(false);
  const sizes = useStore($sizes);

  useEffect(() => {
    const { width, height } = sizes[type];
    if (landscape) {
      setWidth(height);
      setheight(width);
    } else {
      setWidth(width);
      setheight(height);
    }
  }, [landscape, type, sizes]);

  const blocksTags = blocks.map((v: BlockType, i: number) => {
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
        <div style={{ display: showEditButton ? 'block' : 'none' }} className="edit-button">
          ✏️
        </div>
        <div style={{ display: showEditButton ? 'block' : 'none' }} className="remove-button">
          ❌
        </div>
      </div>
    </>
  );
};

export default Page;
