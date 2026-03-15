import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "imgur.com", "port-pressure.local"],
  },
  transpilePackages: ["@nextwp/core"],
};

export default nextConfig;
