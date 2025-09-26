import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
      // 다른 외부 도메인이 필요하면 추가 가능
    ],
  },
};

export default nextConfig;
