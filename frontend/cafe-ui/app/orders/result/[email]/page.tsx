"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


type OrderDTO = {
    orderId: number;
    totalPrice: number;
    state: string;
    orderItems: OrderItemDTO[];
};

type OrderItemDTO = {
    productName: string;
    quantity: number;
};

export default function OrdersSearchPage() {
    const { email } = useParams<{ email: string }>();
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const router = useRouter();


    useEffect(() => {
        if (!email) return;

        fetch(`http://localhost:8080/orders/result/${email}`)
            .then((res) => {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then((data) => setOrders(Array.isArray(data) ? data : []))
            .catch(() => {
                alert("해당 이메일의 주문이 존재하지 않습니다.");
                router.replace("/orders/search");
            });
    }, [email, router]);

    const deleteOrder = (orderId: number) => {
        fetch(`http://localhost:8080/orders/${orderId}?email=${email}`, {
            method: "DELETE",
        })
            .then(() => {
                alert(`주문 #${orderId} 이(가) 취소되었습니다.`);
                setOrders(prev => prev.filter(o => o.orderId !== orderId));
            })
            .catch(() => alert("주문 취소 실패"));
    };

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">주문 결과</h1>
            <div className="mb-4 text-sm text-gray-600">이메일: {decodeURIComponent(email)}</div>

            {orders.length === 0 && (
                <div className="text-gray-500">주문이 없습니다.</div>
            )}

            {orders.length > 0 && (
                <div className="space-y-3">
                    <div className="grid grid-cols-5 font-semibold border-b pb-2">
                        <div>주문번호</div>
                        <div>상품</div>
                        <div>총 가격</div>
                        <div>주문상태</div>
                        <div>주문관리</div>
                    </div>

                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="grid grid-cols-5 items-center border rounded p-4"
                        >
                            <div>#{order.orderId}</div>

                            <div className="text-sm">
                                {order.orderItems.map((item, idx) => (
                                    <div key={idx}>
                                        {item.productName} : {item.quantity}개
                                    </div>
                                ))}
                            </div>

                            <div>{order.totalPrice.toLocaleString()}원</div>

                            {/* 주문상태 */}
                            <div>{order.state}</div>

                            {/* 주문관리 */}
                            <div className="flex flex-col gap-2">
                                {order.state === "상품준비중" ? (
                                    <>
                                        <button
                                            onClick={() => deleteOrder(order.orderId)}
                                            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                                        >
                                            주문 취소
                                        </button>
                                        <button
                                            onClick={() => alert("수정 페이지 이동 예정")}
                                            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                                        >
                                            주문 수정
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-400 text-sm">-</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}