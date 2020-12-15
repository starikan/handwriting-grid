import React, { useState } from 'react';
// import Block from '../Block/Block';
import './style.scss';

import PageMenuButton from '../PageMenuButton';
import { useStore } from 'effector-react';
import { $pages } from '../../models/pages/pages';

interface Props {
  pageId: string;
}

const Page: React.FC<Props> = ({ pageId }) => {
  const pagesStore = useStore(
    $pages.map((pages) => {
      return pages.filter((page) => page.id === pageId)[0];
    }),
  );

  const [showEditButton, setShowEditButton] = useState(false);

  // const blocksTags = pagesStore.blocks.map((blockId: string) => {
  //   return <Block id={blockId}></Block>;
  // });

  const stylePage: React.CSSProperties = {
    width: `${pagesStore.width}cm`,
    height: `${pagesStore.height}cm`,
  };

  const onPageMouse = (flag: boolean): void => {
    setShowEditButton(flag);
  };

  return (
    <>
      <div
        className="page-wrapper"
        onClick={() => onPageMouse(true)}
        onMouseEnter={() => onPageMouse(true)}
        onMouseLeave={() => onPageMouse(false)}
      >
        <div style={stylePage} className="page">
          {/* {blocksTags} */}
        </div>
        {showEditButton && <PageMenuButton pageId={pagesStore.id}></PageMenuButton>}
      </div>
    </>
  );
};

export default Page;
