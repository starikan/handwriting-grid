import React from 'react';
import { DocumentType, PageType } from '../../global';
import { Container } from '@mui/material';

import styles from './Page.module.scss';

export interface PageProps {
  page: PageType;
  document: DocumentType;
  className?: string;
}

export function Page({ page, document, className }: PageProps) {
  return (
    <div className={`${styles.Page} ${className}`}>
      <Container
        className={styles.page}
        fixed={true}
        sx={{ width: page.size.width, height: page.size.height }}
      ></Container>
    </div>
  );
}
