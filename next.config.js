/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    experimental: {
        appDir: true,
        fontLoaders: [
            { loader: "@next/font/google", options: { subsets: ["latin"] } },
        ],
    },
}

module.exports = nextConfig
