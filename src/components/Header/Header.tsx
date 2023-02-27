import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import styles from './Header.module.scss';
import { $currentDocument, modifyDocument } from '../../models/document/document';
import { useStore } from 'effector-react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { HeaderButtons } from './components';

type FormData = { name: string };

export interface HeaderProps {}

export function Header() {
  const currentDocument = useStore($currentDocument);

  const [clicked, setClicked] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setClicked(false);
    modifyDocument({ id: currentDocument?.id ?? '', document: { name: data.name } });
  };

  const formEditName = (
    <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
      <TextField className='variant-centered' {...register('name')} />
    </form>
  );

  const nameSimpleText = <Typography variant="h5">{currentDocument?.name ?? ''}</Typography>;

  return (
    <div className={styles.Header}>
      <Container className={styles.title} onClick={() => setClicked(true)}>
        <div></div>
        {clicked ? formEditName : nameSimpleText}
        <div></div>
      </Container>
      <div className={styles.buttons}>
        <HeaderButtons />
      </div>
    </div>
  );
}
