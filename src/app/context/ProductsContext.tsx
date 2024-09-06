'use client';
import React, { createContext, useContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
const CARD_WIDTH = 288 + 16;

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

const calculateItemsPerPage = () => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024; // Дефолтне значення для SSR
  const cardsPerRow = Math.floor(windowWidth * 0.8 / CARD_WIDTH);
  return Math.max(6, cardsPerRow * 2);
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itemsPerPage, setItemsPerPageState] = useState(calculateItemsPerPage);

  const setUrlParam = useCallback((key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const getUrlParam = useCallback((key: string, defaultValue: string) => {
    return searchParams.get(key) || defaultValue;
  }, [searchParams]);

  const setItemsPerPage = useCallback((items: number) => {
    setItemsPerPageState(items);
    setUrlParam('itemsPerPage', items);
  }, [setUrlParam]);

  const updateItemsPerPage = useCallback(() => {
    const newItemsPerPage = calculateItemsPerPage();
    setItemsPerPage(newItemsPerPage);
  }, [setItemsPerPage]);

  useEffect(() => {
    const storedItemsPerPage = parseInt(getUrlParam('itemsPerPage', '0'), 10);
    if (storedItemsPerPage !== itemsPerPage) {
      updateItemsPerPage();
    }

    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, [getUrlParam, itemsPerPage, updateItemsPerPage]);

  const contextValue: ProductContextType = {
    searchQuery: getUrlParam('search', ''),
    setSearchQuery: (query) => setUrlParam('search', query),
    promotional: getUrlParam('promotional', 'false') === 'true',
    setPromotional: (promo) => setUrlParam('promotional', promo),
    active: getUrlParam('active', 'false') === 'true',
    setActive: (active) => setUrlParam('active', active),
    page: parseInt(getUrlParam('page', '1'), 10),
    setPage: (page) => setUrlParam('page', page),
    itemsPerPage,
    setItemsPerPage,
  };

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
