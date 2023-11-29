/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["static.vecteezy.com"],
  },
  compiler: {
    removeConsole: true
  },
}

module.exports = nextConfig
