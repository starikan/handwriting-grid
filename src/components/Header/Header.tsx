import React, { useState } from 'react';
import { Container, IconButton, Typography, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './Header.module.scss';
import { $currentDocument } from '../../models/document/document';
import { useStore } from 'effector-react';
// import TextField from '@mui/material/TextField';

export interface HeaderProps {}

export function Header() {
  const currentDocument = useStore($currentDocument);

  const [hover, setHover] = useState(false);

  // const formEditName = (
  //   <form>
  //     <TextField id="standard-basic" />
  //   </form>
  // );

  const buttonsMenu = (
    <Container className={styles.buttons}>
      <IconButton size="small">
        <SettingsIcon fontSize="small" />
      </IconButton>
    </Container>
  );

  const editButton = (
    <div className={styles.editButton}>
      {hover ? (
        <Tooltip title="Click to edit">
          <IconButton size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div className={styles.Header}>
      <Container className={styles.title} onMouseMove={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div></div>
        <Typography variant="h5">{currentDocument?.name ?? ''}</Typography>
        {editButton}
      </Container>
      {buttonsMenu}
    </div>
  );
}
