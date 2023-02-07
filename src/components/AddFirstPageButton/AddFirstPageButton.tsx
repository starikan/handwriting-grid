import React from 'react';
import { addPage } from '../../models/pages/pages';
import './style.scss';

const AddFirstPageButton: React.FC = () => {
  return (
    <div className="add-first-page-wrapper">
      <button className="add-first-page" onClick={() => addPage({})}>
        +
      </button>
    </div>
  );
};

export default AddFirstPageButton;
