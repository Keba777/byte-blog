/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dexcvckq6/image/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
