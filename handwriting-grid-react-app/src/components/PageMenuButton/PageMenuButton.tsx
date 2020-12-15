import React from 'react';
import { switchLandscapePortrait } from '../../models/pages/pages';
import './style.scss';

interface Props {
  pageId: string;
}

const PageMenuButton: React.FC<Props> = (props) => {
  return (
    <div className="page-menu-buttons">
      <div className="menu-button edit-button">✏️</div>
      <div className="menu-button remove-button">❌</div>
      <div
        className="menu-button landscape-portrait-button"
        onClick={() => {
          switchLandscapePortrait(props.pageId);
        }}
      >
        🔄
      </div>
    </div>
  );
};

export default PageMenuButton;
