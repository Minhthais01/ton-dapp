/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gfjqzunwuzwdpeqqjqva.supabase.co',
        pathname: '/storage/v1/object/public/marketplace-on-ton/**',
      },
    ],
  },
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Đường dẫn proxy
          destination: 'https://marketplace-on-ton-6xpf.onrender.com/:path*', // Địa chỉ API gốc
        },
      ];
    },
  };

export default nextConfig;
