import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    trailingSlash: true, // Required for static export with dynamic routes
    reactStrictMode: true,
    images: {
        unoptimized: true, // Required for static export with images
    },
};

export default nextConfig;
