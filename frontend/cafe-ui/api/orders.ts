import api from "@/lib/axios";
import { OrderEditInfoRes, OrderEditReq } from "@/types";

export const fetchOrderEditInfo = async (orderId: number): Promise<OrderEditInfoRes> => {
  const res = await api.get<OrderEditInfoRes>(`/orders/${orderId}`);
  return res.data;
}

export const updateOrder = async (orderId: number, data: OrderEditReq): Promise<void> => {
  await api.put(`/orders/${orderId}`, data);
}