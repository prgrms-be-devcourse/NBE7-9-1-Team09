import api from "@/lib/axios";
import type { Product } from "@/types";


export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data as Product[];
}