// app/admin/page.tsx

'use client';

import { useEffect, useState } from "react";
import axios from "axios";

interface AdminOrderResponse {
    orderId: number;
    customerEmail: string;
    orderItems: string[];
    totalPrice: number;
    orderState: string;
}

export default function AdminPage() {
    const [orders, setOrders] = useState<AdminOrderResponse[]>([]);

    useEffect(() => {
        axios.get<AdminOrderResponse[]>("/api/admin")
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-10 p-5">

            {/* 헤더 자리 */}

            <div className="grid grid-cols-[1fr_2fr_3fr_1.5fr_1.5fr] gap-3 py-2 px-4 mb-5 font-bold text-gray-900 text-sm">
                <span className="text-left">주문번호</span>
                <span className="text-left">고객명</span>
                <span className="text-left">상품</span>
                <span className="text-left">총 가격</span>
                <span className="text-center">주문상태</span>
            </div>

            <div className="space-y-3">
                {Array.isArray(orders) && orders.map(order => (
                    <div
                        key={order.orderId}
                        className="grid grid-cols-[1fr_2fr_3fr_1.5fr_1.5fr] gap-3 items-center bg-white p-4 border-b border-gray-200 last:border-b-0"
                    >
                        <span className="font-medium text-gray-700">
                            #{String(order.orderId).padStart(4, '0')}
                        </span>

                        <span className="text-gray-700 break-all">
                            {order.customerEmail}
                        </span>

                        <div className="text-sm text-gray-700 leading-relaxed">
                            {order.orderItems.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>

                        <span className="text-gray-700">
                            {order.totalPrice.toLocaleString()}원
                        </span>

                        <div className="flex justify-center">
                            <span className={`font-bold text-sm ${
                                order.orderState === '처리중' ? 'text-[#6DA382]' : 'text-gray-900'
                            }`}>
                                {order.orderState}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
