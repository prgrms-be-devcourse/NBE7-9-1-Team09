'use client'

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/api/products";

const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: fetchProducts
})

const ProductListPage = () => {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
      </div>
    </div>
  );
}
 
export default ProductListPage;