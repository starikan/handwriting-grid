import React, { JSXElementConstructor, ReactElement } from 'react';

import styles from './MainLayout.module.scss';

export interface MainLayoutProps {
  MainContent?: ReactElement<any, string | JSXElementConstructor<any>> | null;
  TopPanel?: ReactElement<any, string | JSXElementConstructor<any>> | null;
  LeftPanel?: ReactElement<any, string | JSXElementConstructor<any>> | null;
  RightPanel?: ReactElement<any, string | JSXElementConstructor<any>> | null;
  FooterPanel?: ReactElement<any, string | JSXElementConstructor<any>> | null;
}

export function MainLayout({ MainContent, TopPanel, LeftPanel, RightPanel, FooterPanel }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      {TopPanel && <div className={styles['top-panel']}>{TopPanel}</div>}

      {LeftPanel && <div className={styles['left-panel']}>{LeftPanel}</div>}

      {RightPanel && <div className={styles['right-panel']}>{RightPanel}</div>}

      {FooterPanel && <div className={styles['footer-panel']}>{FooterPanel}</div>}

      {MainContent && <div className={styles['main-content']}>{MainContent}</div>}
    </div>
  );
}
