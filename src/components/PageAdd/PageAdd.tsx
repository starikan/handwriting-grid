import React from 'react';
import styles from './PageAdd.module.scss';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DocumentType, PageType } from '../../global';
import { Tooltip } from '@mui/material';
import { addPage } from '../../models';

export interface PageAddProps {
  document: DocumentType;
  page?: PageType;
  isBig?: boolean;
}

export function PageAdd({ document, page, isBig = false }: PageAddProps) {
  return (
    <div className={styles.PageAdd}>
      <Tooltip placement="right" title="Add page above">
        <IconButton onClick={() => addPage({ document, afterPage: page })}>
          <AddCircleOutlineIcon fontSize={isBig ? 'large' : 'inherit'}></AddCircleOutlineIcon>
        </IconButton>
      </Tooltip>
    </div>
  );
}
