const securityHeaders = require('./configs/securityHeaders');
const imageDomains = require('./configs/imageDomains');

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
    loader: 'custom',
    loaderFile: './app/lib/utils/imageLoader.utils.ts',
    domains: imageDomains,
  },
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'production' ? false : true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
});
