import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { selectDocumentById } from '../../../../models';

import styles from './HeaderButtons.module.scss';

export interface HeaderButtonsProps {}

export function HeaderButtons(props: HeaderButtonsProps) {
  return (
    <div className={styles.HeaderButtons}>
      <Tooltip title="Close Document">
        <IconButton size="small" onClick={() => selectDocumentById('')}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
