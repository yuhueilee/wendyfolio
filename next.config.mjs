/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wendyfolio',
  sassOptions: {
    includePaths: ['./node_modules'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
