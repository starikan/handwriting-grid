import React from 'react';
import './style.scss';

interface Props {}

const PageMenuButton: React.FC<Props> = (props) => {
  // debugger;
  return (
    <div>
      <div className="edit-button">✏️</div>
      <div className="remove-button">❌</div>
    </div>
  );
};

export default PageMenuButton;
