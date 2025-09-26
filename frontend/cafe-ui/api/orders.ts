import api from "@/lib/axios";
import { OrderEditInfoRes, OrderEditReq } from "@/types";

export const fetchOrderEditInfo = async (orderId: number): Promise<OrderEditInfoRes> => {
  const res = await api.get<OrderEditInfoRes>(`/orders/${orderId}`);
  return res.data;
}

export const updateOrder = async (orderId: number, data: OrderEditReq): Promise<string> => {
  const res = await api.put<string>(`/orders/${orderId}`, data);
  return res.data;
}