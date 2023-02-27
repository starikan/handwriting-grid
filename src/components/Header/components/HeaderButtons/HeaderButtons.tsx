import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { selectDocumentById } from '../../../../models/document/document';

import styles from './HeaderButtons.module.scss';

export interface HeaderButtonsProps {}

export function HeaderButtons(props: HeaderButtonsProps) {
  return (
    <div className={styles.HeaderButtons}>
      <Tooltip title="Settings">
        <IconButton size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Close Document">
        <IconButton size="small" onClick={() => selectDocumentById('')}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
