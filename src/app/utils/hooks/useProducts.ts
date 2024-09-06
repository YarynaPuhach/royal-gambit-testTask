import { useState, useEffect } from 'react';
import { filterProducts } from '../api';
import { useProductContext } from '../../context/ProductsContext';
import { Product } from '../types';
import { useSearchParams } from 'next/navigation';

interface ProductsState {
  products: Product[];
  hasMore: boolean;
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
}

export const useProducts = () => {
  const { searchQuery, promotional, active, page, itemsPerPage } = useProductContext();
  const searchParams = useSearchParams();
  const [state, setState] = useState<ProductsState>({
    products: [],
    hasMore: false,
    currentPage: 1,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await filterProducts({
          promotional,
          active,
          searchQuery,
          page,
          limit: itemsPerPage
        });
        setState({
          products: result.products,
          hasMore: result.hasMore,
          currentPage: result.currentPage,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({ ...prev, isLoading: false, error: error as Error }));
      }
    };

    fetchProducts();
  }, [searchParams]);

  return state;
};