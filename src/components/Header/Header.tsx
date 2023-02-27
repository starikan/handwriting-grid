import React, { useState } from 'react';
import { Container, Tooltip, Typography } from '@mui/material';
import styles from './Header.module.scss';
import { $currentDocument } from '../../models/document/document';
import { useStore } from 'effector-react';
import { FormDocumentNameEdit, HeaderButtons } from './components';

export interface HeaderProps {}

export function Header() {
  const currentDocument = useStore($currentDocument);

  const [clicked, setClicked] = useState(false);

  const formEditName = <FormDocumentNameEdit onSubmitCallback={() => setClicked(false)} />;

  const nameSimpleText = (
    <Tooltip title="Click to edit document name">
      <Typography variant="h5">{currentDocument?.name ?? ''}</Typography>
    </Tooltip>
  );

  if (!currentDocument) {
    return <></>;
  }

  return (
    <div className={styles.Header}>
      <Container className={styles.title} onClick={() => setClicked(true)}>
        {clicked ? formEditName : nameSimpleText}
      </Container>
      <Container className={styles.buttons}>
        <HeaderButtons />
      </Container>
    </div>
  );
}
