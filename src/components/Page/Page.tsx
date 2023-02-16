import React from 'react';
import { DocumentType, PageType } from '../../global';
import { ButtonGroup, Container, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removePage } from '../../models/document/document';

import styles from './Page.module.scss';

export interface PageProps {
  page: PageType;
  document: DocumentType;
}

export function Page({ page, document }: PageProps) {
  return (
    <div className={styles.Page}>
      <Container
        className={styles.page}
        fixed={true}
        sx={{ width: page.size.width, height: page.size.height }}
      ></Container>
      <ButtonGroup orientation="vertical" className={styles.buttons}>
        <IconButton onClick={() => removePage({ document, page })}>
          <HighlightOffIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <SettingsIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
