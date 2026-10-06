import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.20"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mma.prnewswire.com" },
      { protocol: "https", hostname: "eccotechnologies.fr" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.kryptosphere.org" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
};

export default nextConfig;
