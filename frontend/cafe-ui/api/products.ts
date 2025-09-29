import api from "@/lib/axios";
import { ProductListRes } from "@/types";


export const fetchProducts = async (): Promise<ProductListRes[]> => {
  const res = await api.get<ProductListRes[]>('/products');
  return res.data;
}
