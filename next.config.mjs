/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gfjqzunwuzwdpeqqjqva.supabase.co',
        pathname: '/storage/v1/object/public/marketplace-on-ton/**',
      },
      {
        protocol: 'https',
        hostname: 'marketplace-on-ton-6xpf.onrender.com',
        pathname: '/images/**', // Cấu hình đường dẫn hình ảnh cho domain này
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
