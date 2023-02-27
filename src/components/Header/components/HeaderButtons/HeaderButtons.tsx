import React from 'react';
import { Container, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import styles from './HeaderButtons.module.scss';

export interface HeaderButtonsProps {}

export function HeaderButtons(props: HeaderButtonsProps) {
  return (
    <div className={styles.HeaderButtons}>
      <Container>
        <IconButton size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Container>
    </div>
  );
}
