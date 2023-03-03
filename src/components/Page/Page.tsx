import React from 'react';
import { DocumentType, PageType } from '../../global';
import styles from './Page.module.scss';
import Paper from '@mui/material/Paper';
import { $selectedPage, selectPage } from '../../models';
import { useStore } from 'effector-react';

export interface PageProps {
  page: PageType;
  document: DocumentType;
  className?: string;
}

export function Page({ page, document, className }: PageProps) {
  const selectedPage = useStore($selectedPage);

  return (
    <div className={`${styles.Page} ${className}`}>
      <Paper
        onClick={() => selectPage(page)}
        className={`${styles.page} ${selectedPage?.id === page.id ? styles.selected : ''}`}
        sx={{
          width: `${page.size.width}${page.size.dimension ?? 'px'}`,
          height: `${page.size.height}${page.size.dimension ?? 'px'}`,
        }}
      ></Paper>
    </div>
  );
}
