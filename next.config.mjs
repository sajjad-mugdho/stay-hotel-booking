/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["car-images.bauersecure.com", ""],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
