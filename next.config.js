/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',

    runtimeCaching: [
        {
            urlPattern: /^https:\/\/img\.otruyenapi\.com\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "truyen-images",
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 60 * 60 * 24 * 7 // 7 day
                }
            }
        }
    ]
});

const nextConfig = {
    images: {
        // formats: ['image/avif', 'image/webp'],
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'img.otruyenapi.com',
        //         port: '',
        //         pathname: '/uploads/**',
        //     },
        //     {
        //         protocol: 'https',
        //         hostname: 'sv1.otruyencdn.com',
        //         port: '',
        //         pathname: '/uploads/**',
        //     },
        // ],
        unoptimized: true,
    },

    async rewrites() {
        return [
            {
                source: '/lich-su.html',
                destination: '/lich-su',
            },
        ];
    },

    experimental: {
        turbo: true,
    },
};

module.exports = withPWA(nextConfig);