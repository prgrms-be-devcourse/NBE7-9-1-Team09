"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

type Product = {
  id: number;
  name: string;
  price: number; 
  image: string;
};



type CartItem = {
  product: Product;
  qty: number;
};

type OrderItemRequest = {
  product: { id: number | string };
  quantity: number;
};

type OrderCreateRequest = {
  email: string;
  totalPrice: number;
  state?: string;
  address: string;
  addressNumber: string;
  items: OrderItemRequest[];
};

export default function Page() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  
  console.log('Cart page rendered, cart:', cart);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cart]
  );

  const fmt = (v: number) =>
    new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    })
      .format(v)
      .replace("₩", "") + " 원";

  const inc = (id: number) => {
    const item = cart.find(c => c.product.id === id);
    if (item) {
      updateQuantity(id, item.qty + 1);
    }
  };
  
  const dec = (id: number) => {
    const item = cart.find(c => c.product.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.qty - 1));
    }
  };
  
  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  const submit = async () => {
    if (!email || !address || !zipcode) {
      alert("이메일/주소/우편번호를 입력해 주세요.");
      return;
    }

    const payload: OrderCreateRequest = {
      email,
      totalPrice: total,
      state: "상품준비중",
      address,
      addressNumber: zipcode,
      items: cart.map((ci) => ({
        product: {
          id: ci.product.id,
        },
        quantity: ci.qty,
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      // 성공 시 주문조회로 이동 (이메일 기준 조회)
      alert(`주문 완료: 총 ${fmt(total)}`);
      clearCart(); // 결제 성공 후 장바구니 비우기
      router.push(`/orders/result/${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      alert("주문 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">장바구니가 비어있습니다</h2>
          <p className="text-gray-600 mb-6">상품을 장바구니에 담아보세요</p>
          <button 
            onClick={() => router.push('/products')}
            className="btn"
          >
            상품 보러가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <section className="container-card p-5 space-y-4">
        <h2 className="text-xl font-semibold mb-2">장바구니</h2>
        {cart.map((ci) => (
          <article
            key={ci.product.id}
            className="container-card p-4 !shadow-none border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={ci.product.image}
                  alt={ci.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{ci.product.name}</div>
                <div className="mt-2 font-semibold">{fmt(ci.product.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="qty-btn" onClick={() => dec(ci.product.id)}>
                  −
                </button>
                <div className="w-10 text-center select-none">
                  {ci.qty.toString().padStart(2, "0")}
                </div>
                <button className="qty-btn" onClick={() => inc(ci.product.id)}>
                  +
                </button>
              </div>
              <button className="btn-outline ml-3" onClick={() => removeItem(ci.product.id)}>
                삭제
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="container-card p-5 h-fit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-3"
        >
          <div className="space-y-1">
            <label className="text-sm text-gray-600">이메일</label>
            <input
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">주소</label>
            <input
              className="input"
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">우편번호</label>
            <input
              className="input"
              placeholder="우편번호"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-gray-600">총 금액</div>
            <div className="font-semibold">{fmt(total)}</div>
          </div>

          <p className="text-xs text-gray-500">
            당일 오후 2시 이후의 주문 건은 다음 날 배송이 시작됩니다
          </p>

          <button className="btn w-full" type="submit">
            결제하기
          </button>
        </form>
      </aside>
    </main>
  );
}


