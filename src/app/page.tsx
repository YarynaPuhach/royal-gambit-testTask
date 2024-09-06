"use client";
import ProductCatalog from "./components/ProductCatalog/ProductCatalog";
import ProductProvider from "./context/ProductsContext";

export default function Home() {
  return (
    <ProductProvider>
      <ProductCatalog />
    </ProductProvider>
  );
}