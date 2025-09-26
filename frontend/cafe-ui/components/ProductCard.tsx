import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({
  product
}: {
  product: Product
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
      <Link href={`/products/${product.id}`} className="w-full flex flex-col items-center">
        <div className="w-full h-48 relative mb-4">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{product.name}</h3>
        <p className="text-md text-gray-600 font-medium mb-2">{product.price.toLocaleString()}원</p>
      </Link>
    </div>
  );
}

export default ProductCard;