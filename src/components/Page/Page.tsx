import React from 'react';
import { PageType } from '../../global';
import { Container } from '@mui/material';

import styles from './Page.module.scss';

export interface PageProps {
  page: PageType;
}

export function Page({ page }: PageProps) {
  return (
    <div className={styles.Page}>
      <Container
        fixed={true}
        sx={{ width: page.size.width, height: page.size.height }}
      ></Container>
    </div>
  );
}
