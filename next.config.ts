import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsc-projects-static.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
