import React, { useState } from 'react';
import Block, { BlockProps } from '../Block/Block';
import './style.scss';

interface Props {
  blocks?: BlockProps[];
}

const Page: React.FC<Props> = (props: Props) => {
  const [blocks] = useState(props.blocks || []);

  const blocksTags = blocks.map((v: BlockProps, i: number) => {
    return <Block key={i} {...v}></Block>;
  });

  return <div className="page">{blocksTags}</div>;
};

export default Page;
