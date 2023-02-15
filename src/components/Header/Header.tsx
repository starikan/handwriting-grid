import React from 'react';
import { Container, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Header.module.scss';

export interface HeaderProps {}

export function Header() {
  return (
    <div className={styles.Header}>
      <Container className={styles.buttons}>
        <IconButton aria-label="delete" size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Container>
    </div>
  );
}
