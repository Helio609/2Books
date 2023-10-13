/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['open.6api.net'],
  },
}

module.exports = nextConfig
