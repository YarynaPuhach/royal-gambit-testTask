/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
    },
    sassOptions: {
      includePaths: ['./src'],
  },
};

export default nextConfig;
