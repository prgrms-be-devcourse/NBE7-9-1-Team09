'use client';

import type { OrderItemEditInfoRes } from '@/types';
import Image from 'next/image';

interface OrderItemEditCardProps {
  item: OrderItemEditInfoRes;
  onQuantityChange: (itemId: number, newQuantity: number) => void;
  onDelete: (itemId: number) => void;
}

const OrderItemEditCard = ({ item, onQuantityChange, onDelete }: OrderItemEditCardProps) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md gap-4">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.productImage || '/placeholder.png'} // Use productImage
          alt={item.productName}
          fill
          className="object-contain rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-bold">{item.productName}</h3>
        <p className="text-sm text-gray-500">커피 원두에 관한 상세</p>
        {/* Calculate price using new field names */}
        <p className="text-md font-semibold mt-1">
          {(item.productPrice * item.orderItemQuantity).toLocaleString()}원
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md">
          <button
            type="button"
            // Pass orderItemId and new quantity
            onClick={() => onQuantityChange(item.orderItemId, item.orderItemQuantity - 1)}
            className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-l-md"
            disabled={item.orderItemQuantity <= 1}
          >
            -
          </button>
          {/* Display orderItemQuantity */}
          <span className="px-4 py-1 text-center w-12">{String(item.orderItemQuantity).padStart(2, '0')}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.orderItemId, item.orderItemQuantity + 1)}
            className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-r-md"
          >
            +
          </button>
        </div>
        <button
          type="button"
          // Pass orderItemId to the delete handler
          onClick={() => onDelete(item.orderItemId)}
          className="px-4 py-2 bg-[#8B8370] text-white text-sm font-semibold rounded-md hover:bg-[#7a7261] transition"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default OrderItemEditCard;