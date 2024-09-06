import { ReactNode } from "react";
import './globals.css';
import ProductProvider from "./context/ProductsContext";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
            {children}
          </ProductProvider>
      </body>
    </html>
  );
}