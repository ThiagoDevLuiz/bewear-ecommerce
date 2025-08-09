import Image from "next/image";

const brands = [
  {
    id: 1,
    name: "Nike",
    image: "/brands/nike.svg",
  },
  {
    id: 2,
    name: "Adidas",
    image: "/brands/adidas.svg",
  },
  {
    id: 3,
    name: "Puma",
    image: "/brands/puma.svg",
  },
  {
    id: 4,
    name: "New Balance",
    image: "/brands/newBalance.svg",
  },
  {
    id: 5,
    name: "Converse",
    image: "/brands/converse.svg",
  },
  {
    id: 6,
    name: "Polo",
    image: "/brands/polo.svg",
  },
  {
    id: 7,
    name: "Zara",
    image: "/brands/zara.svg",
  },
];

const BrandsPartners = () => {
  return (
    <div className="mb-10 space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>

      <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div key={brand.id} className="space-y-2">
            <div className="border-muted flex size-20 items-center justify-center rounded-3xl border-2 p-2">
              <Image
                src={brand.image}
                alt={brand.name}
                width={0}
                height={0}
                className="size-10"
              />
            </div>
            <h4 className="truncate text-center text-xs font-semibold">
              {brand.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPartners;
