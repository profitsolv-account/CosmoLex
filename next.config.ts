import type { NextConfig } from "next";
import dotenv from "dotenv";

// Load env variables from .env files
dotenv.config();

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

const nextConfig: NextConfig = {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ['@svgr/webpack'],
            },
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },

    trailingSlash: true,
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: new URL(WORDPRESS_API_URL!).hostname,
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
        minimumCacheTTL: 2678400,
    },

    allowedDevOrigins: ['*', 'cl.com'],
};

export default nextConfig;
