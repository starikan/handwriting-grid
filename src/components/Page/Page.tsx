import React from 'react';
import { DocumentType, PageType } from '../../global';
import styles from './Page.module.scss';
import Paper from '@mui/material/Paper';
import { selectPage } from '../../models';

export interface PageProps {
  page: PageType;
  document: DocumentType;
  className?: string;
}

export function Page({ page, document, className }: PageProps) {
  return (
    <div className={`${styles.Page} ${className}`}>
      <Paper
        onClick={() => selectPage(page)}
        className={styles.page}
        sx={{ width: page.size.width, height: page.size.height }}
      ></Paper>
    </div>
  );
}
