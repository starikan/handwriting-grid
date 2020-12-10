import React from 'react';
import { useStore } from 'effector-react';

import './style.scss';

import { $pages, dropAllPages } from '../../models/pages/pages';

const MainMenu: React.FC = () => {
  const pagesStore = useStore($pages);
  return (
    <div style={{ display: pagesStore.length ? 'block' : 'none' }} className="remove-button" onClick={dropAllPages}>
      ❌
    </div>
  );
};

export default MainMenu;
