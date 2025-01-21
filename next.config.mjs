/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "passport-photo.online",
      },
    ],
  },
};

export default nextConfig;
