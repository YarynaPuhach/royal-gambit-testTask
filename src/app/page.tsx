import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import ProductList from "./components/ProductList/ProductList";


export default function Home() {
  return (
      <div>
        <Header />
        <ProductList />
        <Pagination />
      </div>

  );
}