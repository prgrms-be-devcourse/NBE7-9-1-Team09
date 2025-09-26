import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Providers from "./providers";
import '@/assets/styles/globals.css'
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grid & Circle",
  description: "로컬 카페 Grid & Circle",
};

// 헤더 컴포넌트
function Header() {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* 헤더 좌측: 로고와 제목 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '30px' }}>☕️</span> {/* 로고 이미지 자리 */}
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Grid & Circle</span>
          <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Premium Coffee • Artisan Roasted • Fresh Daily</p>
        </div>
      </div>
      {/* 헤더 우측: 메뉴 및 장바구니 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="/products" style={{ textDecoration: 'none', color: '#333' }}>상품 목록</a>
        <a href="/order" style={{ textDecoration: 'none', color: '#333' }}>주문 조회</a>
        <span style={{ fontSize: '24px' }}>🛒</span> {/* 장바구니 아이콘 */}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}