import type { ProductListRes } from "@/types";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({
  product
}: {
  product: ProductListRes
}) => {
  return (
    <div className="bg-stone-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container with White Background */}
        <div className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <div className="w-full h-48 relative">
            <Image
              src={product.imageUrl || '/placeholder-coffee.png'}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-lg font-bold text-gray-800">{product.price.toLocaleString()}원</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;