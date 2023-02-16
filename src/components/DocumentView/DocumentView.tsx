import React from 'react';
import { useList, useStore } from 'effector-react';
import { $currentDocument, $currentPages } from '../../models/document/document';

import styles from './DocumentView.module.scss';
import { Page } from '../Page';

export interface DocumentViewProps {}

export function DocumentView() {
  const document = useStore($currentDocument);

  const pages = useList($currentPages, (page) => {
    if (document) {
      return <Page key={page.id} document={document} page={page} />;
    }
  });

  if (!document) {
    return <></>;
  }

  return <div className={styles.DocumentView}>{pages}</div>;
}
