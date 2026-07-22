import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["reshaped"],
  },
  transpilePackages: ["reshaped"],
  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: [
          {
            // Do not set SVGR `icon: true` — it forces 1em×1em and breaks
            // Reshaped Icon `autoWidth` for non-square assets (e.g. wordmark).
            loader: "@svgr/webpack",
          },
        ],
      },
    },
  },
};

export default nextConfig;
