'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

export default function ProductInteraction({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  // 수량 상태 관리
  const [quantity, setQuantity] = useState(1);
  
  console.log('ProductInteraction mounted, product:', product);
  console.log('useCart result:', { addToCart });

  // 총 가격 계산
  const totalPrice = useMemo(() => product.price * quantity, [product.price, quantity]);

  // 수량 변경
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change)); // 수량은 최소 1
  };

  // 장바구니 핸들러
  const handleAddToCart = () => {
    const cartProduct = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl || '/images/empty.png',
      description: product.description
    };
    
    console.log('Adding to cart:', cartProduct, 'quantity:', quantity);
    addToCart(cartProduct, quantity);
    alert(`장바구니에 상품을 담았습니다.`);
    setQuantity(1); // 장바구니 담을 시 수량 초기화
  };

  // 구매하기  페이지 이동
  const handleBuyNow = () => {
    const cartProduct = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl || '/images/empty.png',
      description: product.description
    };
    
    console.log('handleBuyNow: Adding to cart:', cartProduct, 'quantity:', quantity);
    addToCart(cartProduct, quantity);
    
    // 약간의 지연을 두고 페이지 이동 (상태 업데이트가 완료될 때까지 대기)
    setTimeout(() => {
      console.log('handleBuyNow: Navigating to cart');
      router.push('/cart');
    }, 100);
    
    alert(`${product.name} ${quantity}개가 장바구니에 담겼습니다.`);
    setQuantity(1); // 장바구니 담을 시 수량 초기화
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