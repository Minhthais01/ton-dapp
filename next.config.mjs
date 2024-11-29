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
};

export default nextConfig;
