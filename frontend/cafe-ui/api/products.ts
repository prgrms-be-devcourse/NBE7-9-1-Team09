import api from "@/lib/axios";
import { ProductListRes } from "@/types";


export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data as Product[];
}

export const fetchProducts2 = async (): Promise<ProductListRes[]> => {
  const res = await api.get<ProductListRes[]>('/products');
  return res.data;
}
