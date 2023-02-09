/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self'; connect-src 'self'; 
  child-src 'self' youtube.com;
  font-src 'self' ;
  img-src 'self' data:;
  ${process.env.Node_EVN !== 'production' ? `style-src 'self' 'unsafe-inline' 'unsafe-eval'` : `style-src 'self'`};
  ${
    process.env.Node_EVN !== 'production'
      ? `script-src 'self' 'unsafe-eval' 'unsafe-inline' apis.google.com`
      : `script-src 'self' apis.google.com`
  };
  upgrade-insecure-requests
  `;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(),  payment=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: process.env.NEXT_PUBLIC_HOST,
  },
];

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
    domains: process.env.Node_EVN !== 'production' ? ['images.unsplash.com', 'tailwindui.com'] : [''],
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
