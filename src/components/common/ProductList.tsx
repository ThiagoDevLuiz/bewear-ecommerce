"use client";

import { productTable, productVariantTable } from "@/db/schema";

import FullScreen from "../ui/full-screen";
import ProductItem from "./ProductItem";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">{title}</h3>

      <FullScreen>
        <div className="flex w-full gap-4 overflow-x-auto px-5 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </FullScreen>
    </div>
  );
};

export default ProductList;
