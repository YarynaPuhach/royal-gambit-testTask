import { useQuery } from '@tanstack/react-query';
import { filterProducts } from '../api';
import { useProductContext } from '@/app/context/ProductsContext';
import { Product } from '../types';

const STALE_TIME = 60000;

export const useProducts = () => {
  const { searchQuery, promotional, active, page, itemsPerPage } = useProductContext();

  return useQuery<{ products: Product[]; hasMore: boolean; currentPage: number }, Error>({
    queryKey: ['products', searchQuery, promotional, active, page, itemsPerPage],
    queryFn: () => {
      const result = filterProducts(
        {
          promotional,
          active,
          searchQuery,
          page,
          limit: itemsPerPage
        },
      );
      return result;
    },
    staleTime: STALE_TIME,
    select: ({ products, hasMore, currentPage }) => ({
      products,
      hasMore,
      productCount: products.length,
      currentPage,
    }),
  });
};