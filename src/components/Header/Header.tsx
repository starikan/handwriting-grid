import React from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Header.module.scss';
import { $currentDocument } from '../../models/document/document';
import { useStore } from 'effector-react';

export interface HeaderProps {}

export function Header() {
  const currentDocument = useStore($currentDocument);
  return (
    <div className={styles.Header}>
      <Container className={styles.title}>
        <Typography variant="h5">{currentDocument?.name ?? ''}</Typography>
      </Container>
      <Container className={styles.buttons}>
        <IconButton size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Container>
    </div>
  );
}
