import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import '@/assets/styles/globals.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}