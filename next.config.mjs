/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: process.env.NEXT_RUN_LOCAL === 'true' ? '.next-local' : '.next',

    async redirects() {
        return [
            {
                source: '/information',
                destination: '/documents',
                permanent: true,
            },
            {
                source: '/chess-clubs-in-victoria',
                destination: '/chess-clubs',
                permanent: true,
            },
            {
                source: '/cv-calendar',
                destination: '/events/2026-victorian-champion-tournaments',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
