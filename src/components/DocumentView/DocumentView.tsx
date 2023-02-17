import React from 'react';
import { useList, useStore } from 'effector-react';
import { $currentDocument, $currentPages } from '../../models/document/document';
import styles from './DocumentView.module.scss';
import { Page } from '../Page';
import { ButtonGroup, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removePage } from '../../models/document/document';
import { PageAdd } from '../PageAdd';

export interface DocumentViewProps {}

export function DocumentView() {
  const document = useStore($currentDocument);

  const pages = useList($currentPages, (page) => {
    if (document) {
      return (
        <div className={styles.PageBox}>
          <div></div>
          <Page className={styles.page} key={page.id} document={document} page={page} />
          <ButtonGroup orientation="vertical" className={styles.buttons}>
            <IconButton onClick={() => removePage({ document, page })}>
              <HighlightOffIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <PageAdd document={document} page={page}/>
          </ButtonGroup>
        </div>
      );
    }
  });

  if (!document) {
    return <></>;
  }

  if (!document.pages.length) {
    return <PageAdd document={document} isBig={true} />;
  }

  return <div className={styles.DocumentView}>{pages}</div>;
}
