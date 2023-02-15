import React from 'react';
import { PageType } from '../../global';

import styles from './Page.module.scss';

export interface PageProps {
  page: PageType;
}

export function Page({ page }: PageProps) {
  return <div className={styles.Page}>{page.id}</div>;
}
