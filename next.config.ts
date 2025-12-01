import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
  },
};

export default nextConfig;
