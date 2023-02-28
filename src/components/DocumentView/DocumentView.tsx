import React from 'react';
import { useList, useStore } from 'effector-react';
import { $currentDocument, $currentPages } from '../../models';
import styles from './DocumentView.module.scss';
import { Page } from '../Page';
import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { PageAdd } from '../PageAdd';
import { PageType } from '../../global';
import { removePage } from '../../models';

export interface DocumentViewProps {}

export function DocumentView() {
  const document = useStore($currentDocument);

  const pages = useList<PageType>($currentPages, (page) => {
    if (document) {
      return (
        <div className={styles.PageBox}>
          <div></div>
          <Page className={styles.page} key={page.id} document={document} page={page} />
          <ButtonGroup orientation="vertical" className={styles.buttons}>
            <Tooltip placement="right" title="Remove page">
              <IconButton onClick={() => removePage({ document, page })}>
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <PageAdd document={document} page={page} />
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
