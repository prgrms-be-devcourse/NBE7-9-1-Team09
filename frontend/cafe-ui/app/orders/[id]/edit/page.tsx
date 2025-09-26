'use client'

import { useRouter, useParams } from "next/navigation";
import { useSuspenseQuery, queryOptions, useMutation } from "@tanstack/react-query";
import { fetchOrderEditInfo, updateOrder } from "@/api/orders";
import OrderItemEditCard from "@/components/OrderItemEditCard";
import { useState, useEffect, useMemo } from "react";
import { OrderItemEditInfoRes } from "@/types";

const orderEditQueryOption = (id: number) =>
  queryOptions({
    queryKey: ['orderEdit', id], 
    queryFn: () => fetchOrderEditInfo(id)
  });

const EditOrderPage = () => {
  const params = useParams();
  const orderId = Number(params.id); 
  const router = useRouter();
  const { data: initialOrder } = useSuspenseQuery(orderEditQueryOption(orderId));

  // State now holds the response type from the API
  const [orderItems, setOrderItems] = useState<OrderItemEditInfoRes[]>([]);

  useEffect(() => {
    if (initialOrder) {
      // The response has an 'items' property
      setOrderItems(initialOrder.items);
    }
  }, [initialOrder]);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const finalQuantity = Math.max(0, newQuantity);
    setOrderItems(currentItems =>
      currentItems.map(item =>
        // Match by 'orderItemId' and update 'orderItemQuantity'
        item.orderItemId === itemId ? { ...item, orderItemQuantity: finalQuantity } : item
      )
    );
  };

  const handleDeleteItem = (itemId: number) => {
    const visibleItemCount = orderItems.filter(item => item.orderItemQuantity > 0).length;

    if (visibleItemCount <= 1) {
      alert("주문의 마지막 상품은 삭제할 수 없습니다.");
      return;
    }
    handleQuantityChange(itemId, 0);
  };

  const totalPrice = useMemo(() => 
    // Calculate total using 'productPrice' and 'orderItemQuantity'
    orderItems.reduce((total, item) => total + (item.productPrice * item.orderItemQuantity), 0),
    [orderItems]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      // Map the state to match the OrderEditReq structure
      const itemsToUpdate = orderItems.map(item => ({
        orderItemId: item.orderItemId,
        quantity: item.orderItemQuantity
      }));
      // Pass the data in the correct format, now including totalPrice
      return updateOrder(orderId, {
        orderTotalPrice: totalPrice,
        items: itemsToUpdate
      });
    },
    onSuccess: () => {
      router.replace('/orders/search')
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">주문수정</h1>
        <p className="text-gray-500">shopping basket</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {/* Filter by 'orderItemQuantity' and use 'orderItemId' for the key */}
          {orderItems.filter(item => item.orderItemQuantity > 0).map(item => (
            <OrderItemEditCard
              key={item.orderItemId}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-md sticky top-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">총 금액</span>
            <span className="text-xl font-bold">{totalPrice.toLocaleString()}원</span>
          </div>
          <p className="text-xs text-gray-500 mb-6 text-center">
            당일 오후 2시 이후의 주문 건은 다음 날 배송이 시작됩니다
          </p>
          <button
            type="submit"
            disabled={isPending || totalPrice === 0}
            className="w-full bg-[#8B8370] text-white font-semibold py-3 rounded-md hover:bg-[#7a7261] transition disabled:opacity-50"
          >
            {isPending ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOrderPage;