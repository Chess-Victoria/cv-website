/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: process.env.NEXT_RUN_LOCAL === 'true' ? '.next-local' : '.next',

};

export default nextConfig;
