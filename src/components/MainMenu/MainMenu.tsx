import React from 'react';
import { useStore } from 'effector-react';

import './style.scss';

import { $pages, dropAllPages } from '../../models/pages/pages';

const MainMenu: React.FC = () => {
  const pagesStore = useStore($pages);
  return (
    <div style={{ display: pagesStore.length ? 'block' : 'none' }}>
      <div onClick={dropAllPages}>
        ❌
      </div>
    </div>
  );
};

export default MainMenu;
