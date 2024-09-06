import React from 'react';
import styles from './PageSkeleton.module.scss';

const PageSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.search}></div>
      </div>
      <div className={styles.productList}>
      </div>
      <div className={styles.pagination}>
        <div className={styles.pageButton}></div>
        <div className={styles.pageButton}></div>
        <div className={styles.pageButton}></div>
      </div>
    </div>
  );
};

export default PageSkeleton;
