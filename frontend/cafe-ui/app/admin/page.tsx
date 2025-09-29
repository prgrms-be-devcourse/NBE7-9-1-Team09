// app/admin/page.tsx

'use client';

import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
    orderId: number;
    customerEmail: string;
    orderItems: string[];
    totalPrice: number;
    orderState: string;
};

type PageResponse = {
    content: Order[];
    totalPages: number;
    number: number;
    size: number;
}

export default function AdminOrderListPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const ORDERS_PER_PAGE = 15;

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/admin?page=${currentPage - 1}&size=${ORDERS_PER_PAGE}`);
                if (!response.ok) {
                    throw new Error("데이터를 불러오는데 실패했습니다.");
                }
                const data: PageResponse = await response.json();
                setOrders(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <div className="text-center p-10">로딩 중...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
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
                            <span className={`font-bold text-sm ${order.orderState === '상품준비중' ? 'text-[#6DA382]' : 'text-gray-900'
                                }`}>
                                {order.orderState}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 space-x-2">
                {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-1 py-2 text-sm transition-colors ${
                            currentPage === page
                                ? 'text-black font-bold'
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>


        </div>
    );
}
