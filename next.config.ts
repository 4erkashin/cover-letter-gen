import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["reshaped"],
  },
  transpilePackages: ["reshaped"],
};

export default nextConfig;
