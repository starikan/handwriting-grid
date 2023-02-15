import React from 'react';
import { useStore } from 'effector-react';
import { $currentDocument } from '../../models/document/document';

import styles from './DocumentView.module.scss';
import { Page } from '../Page';

export interface DocumentViewProps {}

export function DocumentView() {
  const doc = useStore($currentDocument);

  if (!doc) {
    return <></>;
  }

  return (
    <div className={styles.DocumentView}>
      {doc.pages.map((page) => (
        <Page key={page.id} page={page} />
      ))}
    </div>
  );
}
