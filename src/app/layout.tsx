import { ReactNode, Suspense } from "react";
import styles from './globals.module.scss';
import ProductProvider from "./context/ProductsContext";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Suspense fallback={<div>Loading...</div>}>
        <ProductProvider>
            {children}
          </ProductProvider>
        </Suspense>
      </body>
    </html>
  );
}