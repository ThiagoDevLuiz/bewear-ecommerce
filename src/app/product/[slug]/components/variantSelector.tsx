import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
  productSlug?: string;
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
  productSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product/${productSlug}?variant=${variant.slug}`}
          className={cn(
            "rounded-xl border-2 border-transparent",
            selectedVariantSlug === variant.slug && "border-border",
          )}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
