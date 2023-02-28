import React from 'react';
import { Container } from '@mui/material';
import { useStore } from 'effector-react';

import styles from './Settings.module.scss';
import { $selectedPage } from '../../models';

export interface SettingsProps {}

export function Settings(props: SettingsProps) {
  const selectedPage = useStore($selectedPage);

  if (!selectedPage) {
    return <></>;
  }

  return <div className={styles.Settings}>
    <Container>
      <p>Page</p>
      id: {selectedPage.id}
    </Container>
    </div>;
}
