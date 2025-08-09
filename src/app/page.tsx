import Image from "next/image";

import CategorySelector from "@/components/common/categorySelector";
import ProductList from "@/components/common/ProductList";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();

  return (
    <div className="space-y-6">
      <Image
        src="/banner-1.png"
        alt="Leve uma vida com estilo"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />

      <ProductList title="Mais vendidos" products={products} />

      <CategorySelector categories={categories} />

      <Image
        src="/banner-2.png"
        alt="Seja autêntico"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />
    </div>
  );
};

export default Home;
