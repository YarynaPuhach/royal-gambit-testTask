'use client'
import React from 'react';
import styles from './Pagination.module.scss';
import { useProductContext } from '@/app/context/ProductsContext';
import { useProducts } from '@/app/utils/hooks/useProducts';

const Pagination: React.FC = () => {
  const { page, setPage } = useProductContext();
  const { hasMore } = useProducts();

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={styles.pageButton}
        >
          Prev
        </button>

        <span className={`${styles.pageButton} ${styles.active}`}>
          {page}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;