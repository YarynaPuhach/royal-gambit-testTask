'use client';

import React from "react";
import Pagination from "../Pagination/Pagination";
import ProductList from "../ProductList/ProductList";
import Header from "../Header/Header";
import { useProducts } from "../../utils/hooks/useProducts";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from './ProductCatalog.module.scss';

const ProductCatalog = () => {
  const { isLoading, isError } = useProducts();
  return (
    <div className={styles.container}>
      <Header/>
      {isLoading && <Loader/>}
      {isError && <ErrorMessage/>}
      {!isLoading && !isError && 
      <>
        <ProductList/>
        <Pagination/>
      </>}
      
    </div>
  );
}

export default ProductCatalog;