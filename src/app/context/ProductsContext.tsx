import React, { createContext, useState, ReactNode } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [promotional, setPromotional] = useState(false);
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  return (
    <ProductContext.Provider
      value={{ searchQuery, setSearchQuery, promotional, setPromotional, active, setActive, page, setPage, itemsPerPage, setItemsPerPage }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;

export const useProductContext = () => {
  const context = React.useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};