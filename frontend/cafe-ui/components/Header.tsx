// components/Header.tsx

import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 로고 (텍스트) */}
          <div className="flex flex-col">
            <Link href="/" className="text-2xl font-bold text-stone-800">
              Grid & Circle
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              Premium Coffee • Artisan Roasted • Fresh Daily
            </p>
          </div>
          
          {/* 메뉴 */}
          {/* 현재는 리다이렉션이 걸려있지 않습니다 */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
              상품목록
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-stone-800 transition-colors">
              주문조회
            </Link>
            <Link href="#" className="hover:text-gray-500 transition-colors">
              <FiShoppingCart size={24} />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}