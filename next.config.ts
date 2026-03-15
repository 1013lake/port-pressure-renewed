import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "imgur.com" },
      { protocol: "http", hostname: "port-pressure.local" },
    ],
  },
  transpilePackages: ["@nextwp/core"],
};

export default nextConfig;
