import React from 'react';
import Button from '@mui/material/Button';
import { addDocument } from '../../models/document/document';
import { generateRandomDocument } from '../../models/document/documentInit';
// import styles from './DocumentAddButton.module.scss';

export interface DocumentAddButtonProps {}

export function DocumentAddButton() {
  return (
    <Button variant="outlined" onClick={() => addDocument(generateRandomDocument())}>
      Add new Document
    </Button>
  );
}
