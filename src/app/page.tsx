import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import ProductList from "./components/ProductList/ProductList";
import PageSkeleton from './components/PageSkeleton/PageSkeleton';
import { Suspense } from 'react';

export default function Home() {


  return (
    <Suspense fallback={<PageSkeleton />}>
      <div>
        <Header />
        <ProductList />
        <Pagination />
      </div>
    </Suspense>

  );
}