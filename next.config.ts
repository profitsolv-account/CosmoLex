import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        fileLoaderRule.exclude = /\.svg$/i

        return config
    },

    // rest settings
    output: 'standalone',
    trailingSlash: true,
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cosmonew1.wpenginepowered.com',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
    /*images: {
        unoptimized: true,
    },*/
    allowedDevOrigins: ['*', 'cl.com']
};

export default nextConfig;
