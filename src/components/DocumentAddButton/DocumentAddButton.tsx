import React from 'react';
import { addDocument } from '../../models/document/document';
import { generateRandomDocument } from '../../models/document/documentInit';

import styles from './DocumentAddButton.module.scss';

export interface DocumentAddButtonProps {}

export function DocumentAddButton() {
  return (
    <div className={styles.DocumentAddButton}>
      <button onClick={() => addDocument(generateRandomDocument())}>Add new Document</button>
    </div>
  );
}
