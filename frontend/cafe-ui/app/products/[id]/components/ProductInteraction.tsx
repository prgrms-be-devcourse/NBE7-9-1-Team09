'use client';
import React, { useState, useMemo } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductInteraction({ product }: { product: Product }) {
  // 수량 상태 관리
  const [quantity, setQuantity] = useState(1);

  // 총 가격 계산
  const totalPrice = useMemo(() => product.price * quantity, [product.price, quantity]);

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change)); // 수량은 최소 1
  };

  // 장바구니 핸들러
  const handleAddToCart = () => {
    console.log(`${product.name} ${quantity}개를 장바구니에 담았습니다. 총 가격: ${totalPrice}원`);
    alert(`장바구니에 상품을 담았습니다.`);
    setQuantity(1); // 장바구니 담을 시 수량 초기화
  };

  // 구매하기  페이지 이동
  const handleBuyNow = () => {
    console.log(`${product.name} ${quantity}개를 바로 구매합니다.`);
    alert(`구매하기 페이지 개발중입니다.`);
    // 여기에  구매하기 페이지 이동 구현
  };

  return (
    <div className="space-y-6">

      {/* 품 수량 조절 섹션 */}
      <div className="flex justify-between items-center text-lg font-medium text-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">상품 수량</span>

          {/* 수량 조절 버튼 그룹 */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center border-l border-r border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/*총 가격 섹션 */}
      <div className="flex justify-fornt items-center space-x-4">
        <span className="text-xl font-semibold text-gray-800">총 가격</span>
        <span className="text-3xl font-bold text-gray-800">{totalPrice.toLocaleString()} 원</span>
      </div>

      <hr className="border-gray-200" />

      {/*구매/장바구니 버튼 */}
      <div className="flex space-x-4">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition duration-150 font-semibold"
        >
          구매하기
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition duration-150 font-semibold"
        >
          장바구니 담기
        </button>
      </div>

    </div>
  );
}