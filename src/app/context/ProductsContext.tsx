'use client';
import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  promotional: boolean;
  setPromotional: (promo: boolean) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [contextValue, setContextValue] = useState<ProductContextType>({
    searchQuery: '',
    setSearchQuery: () => {},
    promotional: false,
    setPromotional: () => {},
    active: false,
    setActive: () => {},
    page: 1,
    setPage: () => {},
    itemsPerPage: 8,
    setItemsPerPage: () => {},
  });

  useEffect(() => {
    const setUrlParam = (key: string, value: string | number | boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    };

    const getUrlParam = (key: string, defaultValue: string) => {
      return searchParams.get(key) || defaultValue;
    };

    setContextValue({
      searchQuery: getUrlParam('search', ''),
      setSearchQuery: (query) => setUrlParam('search', query),
      promotional: getUrlParam('promotional', 'false') === 'true',
      setPromotional: (promo) => setUrlParam('promotional', promo),
      active: getUrlParam('active', 'false') === 'true',
      setActive: (active) => setUrlParam('active', active),
      page: parseInt(getUrlParam('page', '1'), 10),
      setPage: (page) => setUrlParam('page', page),
      itemsPerPage: parseInt(getUrlParam('itemsPerPage', '8'), 10),
      setItemsPerPage: (items) => setUrlParam('itemsPerPage', items),
    });
  }, [searchParams, router]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};

export default ProductProvider;
