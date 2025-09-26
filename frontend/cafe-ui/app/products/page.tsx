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
  

  return (<div>

    <div className="px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div> );
}
 
export default ProductListPage;