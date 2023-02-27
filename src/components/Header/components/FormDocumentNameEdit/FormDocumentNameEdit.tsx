import React from 'react';
import { TextField } from '@mui/material';
import { useStore } from 'effector-react';
import { $currentDocument, modifyDocument } from '../../../../models/document/document';
import { useForm } from 'react-hook-form';

import styles from './FormDocumentNameEdit.module.scss';

type FormData = { name: string };
type FormResult = { data: FormData };

export interface FormDocumentNameEditProps {
  onSubmitCallback: (payload?: FormResult) => unknown;
}

export function FormDocumentNameEdit({ onSubmitCallback }: FormDocumentNameEditProps) {
  const currentDocument = useStore($currentDocument);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onSubmitCallback({ data });
    modifyDocument({ id: currentDocument?.id ?? '', document: { name: data.name } });
  };

  const formEditName = (
    <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        autoFocus
        className="variant-centered"
        defaultValue={currentDocument?.name ?? ''}
        {...register('name')}
      />
    </form>
  );

  return <div className={styles.FormDocumentNameEdit}>{formEditName}</div>;
}
