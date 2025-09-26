export type ProductListRes = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export type OrderItemEditInfoRes = {
  orderItemId: number;
  orderItemQuantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
};

export type OrderEditInfoRes = {
  items: OrderItemEditInfoRes[];
};

export type OrderItemEditReq = {
  orderItemId: number;
  quantity: number;
};

export type OrderEditReq = {
  orderTotalPrice: number;
  items: OrderItemEditReq[];
};