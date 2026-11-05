import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 같은 Wi-Fi의 휴대폰 등에서 개발 서버(네트워크 주소)로 접속할 때 필요 (개발 모드 전용)
  allowedDevOrigins: ["172.30.1.48"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
