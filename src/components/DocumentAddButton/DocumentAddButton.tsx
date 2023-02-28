import React from 'react';
import Button from '@mui/material/Button';
import { addDocument } from '../../models';
import { generateRandomDocument } from '../../models/document/documentUtils';
// import styles from './DocumentAddButton.module.scss';

export interface DocumentAddButtonProps {}

export function DocumentAddButton() {
  return (
    <Button variant="outlined" onClick={() => addDocument(generateRandomDocument())}>
      Add new Document
    </Button>
  );
}
