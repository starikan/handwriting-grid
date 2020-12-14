import React, { useState } from 'react';
import Block from '../Block/Block';
import './style.scss';

import PageMenuButton from '../PageMenuButton';
import { useStore } from 'effector-react';
import { $pages } from '../../models/pages/pages';

const Page: React.FC<{id: string}> = (props) => {
  const pagesStore = useStore($pages.map(pages => {
    return pages.filter(page => page.id === props.id)[0]
  }));

  const [width] = useState(pagesStore.width);
  const [height] = useState(pagesStore.height);
  const [blocks] = useState(pagesStore.blocks);
  const [showEditButton, setShowEditButton] = useState(false);

  const blocksTags = blocks.map((blockId: string) => {
    return <Block id={blockId}></Block>;
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
      </div>
      {showEditButton && <PageMenuButton></PageMenuButton>}
    </>
  );
};

export default Page;
