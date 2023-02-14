/** @type {import('next').NextConfig} */
const securityHeaders = require('./securityHeaders');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
  //Run for analyze build: ANALYZE=true yarn build
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: process.env.NODE_ENV !== 'production' ? ['images.unsplash.com', 'tailwindui.com'] : [''],
  },
  output: 'standalone',
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
    ];
  },
});
