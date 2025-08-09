import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/ProductList";
import { Button } from "@/components/ui/button";
import FullScreen from "@/components/ui/full-screen";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantitySelector";
import VariantSelector from "./components/variantSelector";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { slug } = await params;
  const { variant } = await searchParams;

  let productVariant;

  if (variant) {
    productVariant = await db.query.productVariantTable.findFirst({
      where: eq(productVariantTable.slug, variant),
      with: {
        product: {
          with: {
            variants: true,
          },
        },
      },
    });
  }

  if (!productVariant) {
    const product = await db.query.productTable.findFirst({
      where: eq(productTable.slug, slug),
      with: {
        variants: true,
      },
    });

    if (product && product.variants.length > 0) {
      productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.productId, product.id),
        with: {
          product: {
            with: {
              variants: true,
            },
          },
        },
      });
    }
  }

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
    limit: 10,
  });

  return (
    <div className="flex flex-col space-y-6">
      <FullScreen>
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </FullScreen>

      <VariantSelector
        variants={productVariant.product.variants}
        selectedVariantSlug={productVariant.slug}
        productSlug={slug}
      />

      <div>
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <QuantitySelector />

      <div className="flex flex-col space-y-4">
        <Button className="rounded-full" size="lg" variant="outline">
          Adicionar ao carrinho
        </Button>
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>

      <p className="text-sm">{productVariant.product.description}</p>

      <ProductList title="Produtos relacionados" products={likelyProducts} />
    </div>
  );
};

export default ProductPage;
