'use client'
import React, { useState } from 'react';
import { Product } from '../../utils/types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import { useProducts } from '../../utils/hooks/useProducts';
import Modal from '../Modal/Modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ProductListSkeleton from './Skeleton/Skeleton';

const ProductList: React.FC = () => {
  const { products, error, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (error) return <ErrorMessage />;
  if (isLoading) return <ProductListSkeleton />;

  return (
    <>
      <div className={styles.grid}>
        {products.map((product: Product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProductList;