import React from 'react';
import { useStore } from 'effector-react';
import { $documents, removeDocument, selectDocumentById } from '../../models';
import { Container, IconButton, Tooltip, Typography } from '@mui/material';
import { DocumentAddButton } from '../DocumentAddButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import styles from './DocumentsList.module.scss';

export const DocumentsList = () => {
  const documents = useStore($documents);

  return (
    <div className={styles.DocumentsList}>
      <Container>
        <DocumentAddButton></DocumentAddButton>
      </Container>

      <Container>
        <Typography variant="h2">Documents List</Typography>

        {documents.map((doc) => (
          <div className={styles.docLine} key={doc.id} onClick={() => selectDocumentById(doc.id)}>
            <Typography variant="h5">{doc.name}</Typography>

            <Tooltip title="Remove Document">
              <IconButton onClick={() => removeDocument(doc.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </Container>
    </div>
  );
};
