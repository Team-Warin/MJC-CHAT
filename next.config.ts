import type { NextConfig } from "next";

import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ["three", "next-mdx-remote"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"], // .md 파일도 페이지로 사용할 수 있음.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    
    config.externals = [
      ...config.externals,
      "hnswlib-node",
      "sharp",
      "onnxruntime-node",
      {
        "https://unpkg.com/@xenova/transformers@2.13.2": "transformers",
      },
    ];

    return config;
  },
  serverExternalPackages: ["hnswlib-node"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
