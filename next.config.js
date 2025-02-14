// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    webpackBuildWorker: true,
    mdxRs: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/:path((?!_next|api|robots.txt|sitemap.xml|.well-known).*[^/]$)',
        destination: '/:path/',
        permanent: true
      }
    ];
  }
};

module.exports = withContentlayer(nextConfig);