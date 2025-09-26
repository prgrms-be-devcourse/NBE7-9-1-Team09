"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


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
    const [emailInput, setEmailInput] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!emailInput.trim()) return;
        router.push(`/orders/result/${encodeURIComponent(emailInput)}`);
    };

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">주문 조회</h1>

            <div className="flex gap-2">
                <input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 border rounded-full px-4 py-3 outline-none"
                    placeholder="이메일을 입력해주세요"
                />
                <button
                    onClick={handleSearch}
                    className="px-5 py-3 rounded-full border hover:shadow"
                >
                    검색
                </button>
            </div>
        </main>
    );
}
