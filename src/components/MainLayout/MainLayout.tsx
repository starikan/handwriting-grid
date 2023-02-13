import React from 'react';

import styles from './MainLayout.module.scss';

export interface MainLayoutProps {}

export function MainLayout({}: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles['top-panel']}>Top Panel</div>
      <div className={styles['left-panel']}>Left Panel</div>
      <div className={styles['right-panel']}>Right Panel</div>
      <div className={styles['footer-panel']}>Footer Panel</div>
      <div className={styles['main-content']}></div>
    </div>
  );
}
