/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily remove this to see the real build error
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
